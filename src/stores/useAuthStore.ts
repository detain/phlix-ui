import { defineStore } from 'pinia';
import { ref, computed, watch, inject, type ComputedRef } from 'vue';
import { ApiClient, type AuthUser } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';
import { useApiBase } from '../composables/useApiBase';

/** The login path injected by the app (e.g. '/app/login'). Falls back to '/login'. */
type InjectedLoginPath = string | ComputedRef<string> | undefined;
function resolveLoginPath(injected: InjectedLoginPath): string {
    return typeof injected === 'string' ? injected : injected?.value ?? '/login';
}

export const useAuthStore = defineStore('auth', () => {
    const tokenStore = new LocalStorageTokenStore();
    // The app's own API base, resolved reactively (a native client picks it at
    // runtime on the Connect screen, so it can change after this store — and its
    // client — already exist). The single `client` instance is kept (consumers
    // hold the reference); we re-point it in place whenever the base changes.
    const apiBase = useApiBase();
    // loginPath is set once at app boot (from config.routerBase) and never changes
    // after, but we watch it in case a native client ever supplies it as a ref.
    const injectedLoginPath = inject<InjectedLoginPath>('loginPath', '/login');
    const loginPath = computed(() => resolveLoginPath(injectedLoginPath));
    const client = new ApiClient({ tokenStore, baseUrl: apiBase.value, loginPath: loginPath.value });
    watch(apiBase, (base) => client.setBaseUrl(base));

    const user = ref<AuthUser | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    // Reactive mirror of the persisted token — localStorage reads aren't reactive,
    // so a plain computed over getAccessToken() would go stale after login/logout.
    const accessToken = ref<string | null>(tokenStore.getAccessToken());
    // Has the one-shot boot session check (init()) run yet? `isLoggedIn` is only a
    // token-PRESENCE flag; on a reload we must validate that token against the back
    // end before any guard trusts it. Memoised so concurrent navigations share one
    // /auth/me round-trip.
    const initialized = ref(false);
    let initPromise: Promise<void> | null = null;

    const isLoggedIn = computed(() => accessToken.value !== null);
    const isAdmin = computed(() => user.value?.is_admin === true);

    function setTokens(access: string, refresh: string): void {
        tokenStore.setAccessToken(access);
        tokenStore.setRefreshToken(refresh);
        accessToken.value = access;
    }

    /**
     * Authenticate with a single identifier that may be EITHER a username or an
     * email. The value is always sent as `username`; it's ALSO sent as `email`
     * only when it looks like one (contains `@`). phlix-server reads `username`
     * (and falls back to an email lookup) and phlix-hub reads `username` then
     * `email`, so this satisfies both — while keeping a plain username out of any
     * `email` field a back end might format-validate up front.
     */
    async function login(identifier: string, password: string): Promise<boolean> {
        loading.value = true;
        error.value = null;
        try {
            const body: Record<string, string> = { username: identifier, password };
            if (identifier.includes('@')) {
                body['email'] = identifier;
            }
            const data = await client.post<{
                access_token: string;
                refresh_token: string;
            }>('/api/v1/auth/login', body);

            setTokens(data.access_token, data.refresh_token);
            await fetchUser();
            // fetchUser() clears the tokens if it can't establish the user, so
            // report success only when the session actually stuck — a back end that
            // accepts the password but 404s/401s on /auth/me is treated as a failure.
            return isLoggedIn.value;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Login failed';
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function signup(email: string, username: string, password: string): Promise<boolean> {
        loading.value = true;
        error.value = null;
        try {
            const data = await client.post<{
                access_token: string;
                refresh_token: string;
            }>('/api/v1/auth/register', { email, username, password });

            setTokens(data.access_token, data.refresh_token);
            await fetchUser();
            // Same as login(): only report success if the session survived fetchUser().
            return isLoggedIn.value;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Registration failed';
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function fetchUser(): Promise<void> {
        if (!isLoggedIn.value) return;
        try {
            user.value = await client.getCurrentUser();
        } catch {
            user.value = null;
            tokenStore.clear();
            accessToken.value = null;
        }
    }

    /**
     * One-shot session bootstrap, run once from the router guard before the first
     * protected route resolves. A token restored from localStorage only makes
     * `isLoggedIn` true by its mere presence — it is NOT proof the session is still
     * valid. So if a token was restored, validate it against the back end exactly
     * once via {@link fetchUser}: a valid token populates `user` (so `isAdmin` and
     * the account badge are correct after a reload), and an invalid/expired token
     * is cleared by fetchUser() — which flips `isLoggedIn` to false so the guard
     * redirects to login instead of rendering protected/admin pages off a stale
     * token. Memoised: the work runs at most once per app instance, and concurrent
     * callers await the same in-flight promise.
     */
    async function init(): Promise<void> {
        if (initialized.value) return;
        if (initPromise === null) {
            // fetchUser() is a no-op when there is no token, and otherwise either
            // populates `user` or clears the tokens on any failure.
            initPromise = fetchUser().finally(() => {
                initialized.value = true;
            });
        }
        return initPromise;
    }

    function logout(): void {
        // Delegate to the client so the loginPath-aware redirect is exercised.
        // Pass redirect=false so we handle navigation ourselves (consistent with
        // how fetchUser clears state on failure — the store owns the reactive vars).
        client.logout(false);
        accessToken.value = null;
        user.value = null;
        if (typeof window !== 'undefined') {
            window.location.href = loginPath.value;
        }
    }

    return {
        user,
        loading,
        error,
        isLoggedIn,
        isAdmin,
        client,
        login,
        signup,
        fetchUser,
        init,
        logout,
    };
});
