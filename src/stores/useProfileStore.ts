/**
 * S82 — the self-service profile store: the client's single source of truth for
 * "which profile is this session acting as".
 *
 * ## Why the store exists
 *
 * The server re-mints the JWT pair on every switch (`ProfilesController::
 * switchProfile` → `AuthManager::buildAuthResponse`) and the profile claim
 * inside that token scopes favorites / history / resume server-side. So a
 * switch is only honest when the client BOTH stores the new tokens AND tells
 * every cached read that the scope changed — a local-only flag next to a stale
 * token would render the old profile's favorites under the new name. This store
 * owns both halves: the token handoff goes through `useAuthStore`, and every
 * active-profile change bumps `epoch`, the invalidation signal profile-scoped
 * caches key on.
 *
 * ## The Who's-watching gate
 *
 * `gateOpen` is the screen's only condition: loaded + MORE THAN ONE profile +
 * no choice made yet this session. One-profile accounts never see it (the
 * server already activated their sole profile); an account whose list fails to
 * load never sees it either — a gate nobody can pass is a lockout, so the
 * screen owns its error state and the gate stays closed.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { ApiClient } from '../api/client';
import { errMessage } from '../api/errors';
import { AdminUsersApi, type OwnProfile } from '../api/admin/users';
import { useApiBase } from '../composables/useApiBase';
import { useAuthStore } from './useAuthStore';

/**
 * localStorage mirror of the active profile id — a UI hint so the first paint
 * after reload marks the right tile, NOT the authority: every `load()` adopts
 * the server row whose `is_active` is true (that column is what the backend
 * actually enforces via the JWT claim).
 */
export const ACTIVE_PROFILE_KEY = 'phlix.active_profile';

function readStoredActiveProfileId(): string | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(ACTIVE_PROFILE_KEY);
  return typeof raw === 'string' && raw !== '' ? raw : null;
}

function persistActiveProfileId(id: string | null): void {
  if (typeof localStorage === 'undefined') return;
  if (id === null) localStorage.removeItem(ACTIVE_PROFILE_KEY);
  else localStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore();
  // The APP'S own base (profiles are an AuthMiddleware surface of this app's
  // backend — never the hub relay-proxy base), same resolution as useAuthStore.
  const apiBase = useApiBase();

  /** Hydrated rows from `GET /api/v1/profiles` (server order: active first). */
  const profiles = ref<OwnProfile[]>([]);
  const loading = ref(false);
  /** Has the list read completed at least once since boot / after `reset()`? */
  const loaded = ref(false);
  const error = ref<string | null>(null);
  /** The session's active profile id (server `is_active` once loaded). */
  const activeProfileId = ref<string | null>(readStoredActiveProfileId());
  /** Id of the profile whose switch request is in flight (per-tile busy flag). */
  const switchingId = ref<string | null>(null);
  /**
   * Was the Who's-watching choice already made this session? Set on a
   * successful switch or an explicit acknowledge; cleared by `reset()` (logout).
   * Session-scoped on purpose: a reload re-asks, matching the post-login intent.
   */
  const choiceMade = ref(false);

  // Bump on every REAL profile-scope change (id → different id). null → id is
  // boot adoption of the server-active row, not a switch — caches written under
  // the login token already carry that scope, so a clear there would be noise.
  const epoch = ref(0);

  /**
   * Lazily-constructed, long-lived ApiClient (the `useUserItemDataStore`
   * convention — `setBaseUrl` in place instead of rebuilding), wrapped by the
   * typed `AdminUsersApi` profile client.
   */
  let apiClient: ApiClient | null = null;
  function api(base: string): AdminUsersApi {
    if (!apiClient) apiClient = new ApiClient({ baseUrl: base });
    else apiClient.setBaseUrl(base);
    return new AdminUsersApi(apiClient);
  }

  // ---- derived state ----------------------------------------------------------

  const hasMultipleProfiles = computed(() => profiles.value.length > 1);
  const activeProfile = computed(
    () => profiles.value.find((p) => p.id === activeProfileId.value) ?? null,
  );
  /** The Who's-watching screen's visibility — see the file docblock for why
   *  exactly these three terms and no more. */
  const gateOpen = computed(
    () => loaded.value && profiles.value.length > 1 && !choiceMade.value,
  );
  /**
   * The cache-scope fragment every profile-scoped read keys on — favorites,
   * watch history, media-store pages. `'account'` is the pre-load / no-profile
   * state: the account-wide scope the login token carries.
   */
  const scopeKey = computed(() => activeProfileId.value ?? 'account');

  // ---- actions ----------------------------------------------------------------

  /**
   * Fetch the caller's profiles (`GET /api/v1/profiles`). Concurrent-safe: a
   * second call while one is in flight awaits the same outcome via `loading`.
   * On success the row with `is_active` true becomes `activeProfileId` — the
   * server is the authority; the localStorage mirror only pre-fills the very
   * first paint.
   */
  async function load(force = false): Promise<void> {
    if (loading.value) return;
    if (loaded.value && !force) return;
    loading.value = true;
    error.value = null;
    try {
      const rows = await api(apiBase.value).listOwnProfiles();
      profiles.value = rows;
      loaded.value = true;
      const serverActive = rows.find((p) => p.is_active)?.id ?? null;
      if (serverActive !== null && serverActive !== activeProfileId.value) {
        activeProfileId.value = serverActive;
        persistActiveProfileId(serverActive);
      }
    } catch (e) {
      error.value = errMessage(e, 'Could not load your profiles.');
    } finally {
      loading.value = false;
    }
  }

  /** Retry after a failed list read (the screen's Retry button). */
  function retry(): Promise<void> {
    loaded.value = false;
    return load();
  }

  /**
   * Switch the session to `profileId` via the REAL endpoint
   * (`POST /api/v1/profiles/{id}/switch`) and adopt everything it returns:
   * the re-minted token pair (through `useAuthStore` so the reactive
   * `accessToken` mirror moves with it), the `user` payload, and the active id.
   *
   * Returns `true` only after the server accepted the switch — on any failure
   * the session stays on the old profile with `error` set, never optimistically
   * flipped. Re-activating the ALREADY-active profile is the one honest local
   * no-op: it closes the gate without a round-trip, because the server state
   * already equals the requested state.
   */
  async function switchTo(profileId: string): Promise<boolean> {
    if (profileId === '') {
      error.value = 'Cannot switch to an unknown profile.';
      return false;
    }
    if (profileId === activeProfileId.value) {
      choiceMade.value = true;
      return true;
    }
    switchingId.value = profileId;
    error.value = null;
    try {
      const result = await api(apiBase.value).switchProfile(profileId);
      // The switch response IS the new session (S81 blocker record: tokens are
      // re-minted because the profile claim lives in the JWT). Persist them the
      // same way login does.
      auth.setTokens(result.access_token, result.refresh_token);
      if (result.user && typeof result.user === 'object') auth.user = result.user;
      activeProfileId.value = result.profile_id ?? profileId;
      persistActiveProfileId(activeProfileId.value);
      choiceMade.value = true;
      // Keep the cached list's flags truthful so tiles re-render without refetch.
      profiles.value = profiles.value.map((p) => ({ ...p, is_active: p.id === activeProfileId.value }));
      return true;
    } catch (e) {
      error.value = errMessage(e, 'Could not switch profiles.');
      return false;
    } finally {
      switchingId.value = null;
    }
  }

  /**
   * Close the gate WITHOUT switching — the user accepts the server-active
   * profile (or an account with no usable row) and proceeds into the app.
   */
  function acknowledgeChoice(): void {
    choiceMade.value = true;
  }

  /**
   * Re-open the Who's-watching gate on purpose (UserMenu → "Switch Profile").
   * The gate's own condition (loaded + >1 profile) decides whether anything
   * actually shows — with a single profile there is nothing to switch to, so
   * this is correctly a no-op visual. When a boot-time list read FAILED (no
   * `loaded`, gate never opened — by design, so nobody is locked out), this is
   * also the user-initiated retry: fetching now lets an explicit request reach
   * the picker a passive boot failure deliberately withheld.
   */
  function openGate(): void {
    choiceMade.value = false;
    if (!loaded.value && !loading.value) void retry();
  }

  // ── Self-service mutations (Manage Profiles surface) ─────────────────────────
  // Each write goes to the real endpoint, then RE-LISTS: the row set the UI
  // shows is always the server's, never a locally-patched guess. `error`
  // carries the server's refusal (400 name, 409 last-profile, …) verbatim via
  // errMessage so the page can surface it inline.

  /** `POST /api/v1/profiles` → re-lists on success. Resolves true when created. */
  async function createProfile(name: string): Promise<boolean> {
    error.value = null;
    try {
      await api(apiBase.value).createOwnProfile({ name });
      await load(true);
      return true;
    } catch (e) {
      error.value = errMessage(e, 'Could not create the profile.');
      return false;
    }
  }

  /** `PUT /api/v1/profiles/{id}` (rename only — activation is switch-only). */
  async function rename(profileId: string, name: string): Promise<boolean> {
    error.value = null;
    try {
      await api(apiBase.value).updateOwnProfile(profileId, { name });
      await load(true);
      return true;
    } catch (e) {
      error.value = errMessage(e, 'Could not rename the profile.');
      return false;
    }
  }

  /**
   * `DELETE /api/v1/profiles/{id}` → re-lists on success. Refusing the LAST
   * profile is the SERVER's rule (409 `profile.last_profile`); the store just
   * surfaces it. Deleting the active-but-not-last row is allowed — the next
   * load adopts whatever `is_active` row remains, healing the scope.
   */
  async function removeProfile(profileId: string): Promise<boolean> {
    error.value = null;
    try {
      await api(apiBase.value).removeOwnProfile(profileId);
      if (profileId === activeProfileId.value) {
        // The deleted row can no longer be the scope; drop the mirror and let
        // the re-list adopt the surviving active profile (null until it does).
        activeProfileId.value = null;
        persistActiveProfileId(null);
      }
      await load(true);
      return true;
    } catch (e) {
      error.value = errMessage(e, 'Could not delete the profile.');
      return false;
    }
  }

  /**
   * Drop every trace of the account's profile state — call on logout so the
   * next session's gate decisions and cache scopes start clean.
   */
  function reset(): void {
    profiles.value = [];
    loading.value = false;
    loaded.value = false;
    error.value = null;
    switchingId.value = null;
    choiceMade.value = false;
    activeProfileId.value = null;
    persistActiveProfileId(null);
  }

  // The invalidation signal: any real change of active profile — a completed
  // switch here, or a server row that turns out to be active on load — bumps
  // `epoch`. Profile-scoped consumers (`useUserItemDataStore`, the media grid
  // cache, the favorites/history screens) watch THIS number, never the id, so a
  // scope→scope swap always clears even when an id repeats after a delete.
  watch(activeProfileId, (next, prev) => {
    if (prev !== null && next !== prev) epoch.value += 1;
  });

  // Sign-out clears every trace of the account's profile state (list, gate
  // decision, active mirror) — the next session re-asks from the server. A
  // hard-reload logout makes this moot, but an SPA-side transition must not
  // leave a stale gate decision or cache scope behind.
  watch(
    () => auth.isLoggedIn,
    (loggedIn) => {
      if (!loggedIn) reset();
    },
  );

  return {
    profiles,
    loading,
    loaded,
    error,
    activeProfileId,
    switchingId,
    choiceMade,
    epoch,
    hasMultipleProfiles,
    activeProfile,
    gateOpen,
    scopeKey,
    load,
    retry,
    switchTo,
    createProfile,
    rename,
    removeProfile,
    acknowledgeChoice,
    openGate,
    reset,
  };
});
