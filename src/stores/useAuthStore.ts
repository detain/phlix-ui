import { defineStore } from 'pinia';
import { ref, computed, inject } from 'vue';
import { ApiClient, type AuthUser } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';

export const useAuthStore = defineStore('auth', () => {
    const tokenStore = new LocalStorageTokenStore();
    const apiBase = inject<string>('apiBase', '');
    const client = new ApiClient({ tokenStore, baseUrl: apiBase });

    const user = ref<AuthUser | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    // Reactive mirror of the persisted token — localStorage reads aren't reactive,
    // so a plain computed over getAccessToken() would go stale after login/logout.
    const accessToken = ref<string | null>(tokenStore.getAccessToken());

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

    function logout(): void {
        tokenStore.clear();
        accessToken.value = null;
        user.value = null;
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
        logout,
    };
});
