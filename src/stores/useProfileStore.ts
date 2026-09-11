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
 * `gateOpen` is the PASSIVE screen condition: loaded + MORE THAN ONE profile +
 * no choice made yet this session. One-profile accounts never see it (the
 * server already activated their sole profile); a failed list read never opens
 * a gate nobody can pass — no passive lockout. The user can still ASK for the
 * picker: `openGate()` sets `arming`, and PhlixApp additionally mounts the
 * screen while `arming && !loaded`, so the loading/error panes with their
 * Retry button are reachable — the read that failed passively at boot gets a
 * surface to retry from, never a dead click.
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
 *
 * S464 — this constant is the per-account namespace PREFIX: the storage key in
 * use is `phlix.active_profile.<account-id>` ({@link activeProfileStorageKey}).
 * The old single global key leaked one account's hint onto every other account
 * sharing the browser (wrong tile painted, wrong seed until `load()` corrected
 * scope). Census at implementation time: this module, its test file and the
 * `src/index.ts` re-export were the ONLY readers/writers in the estate — zero
 * hits for the literal in phlix-server / phlix-hub sources (read-only check),
 * so nothing outside phlix-ui is coupled to the key.
 *
 * COMPAT — DOCUMENTED RESET (not migration): a pre-existing un-namespaced
 * `phlix.active_profile` value is DISCARDED (removed on store boot) and never
 * fallback-read. Justification: the value is a non-authoritative paint hint —
 * `load()` adopts the server-active row within a request of boot anyway — while
 * a fallback-read would re-import the exact cross-account leak this key change
 * fixes (whose account owns a bare, unlabelled id? reading it for account A can
 * paint account B's tile). Users lose at most a one-frame stale tile highlight.
 */
export const ACTIVE_PROFILE_KEY = 'phlix.active_profile';

/**
 * S464 lane marker — code-resident literal for the merge ritual (namespacing
 * of the active-profile storage key per account, with the legacy-key reset
 * above).
 */
export const S464ACCTNSKEYX9K5 = 'active-profile-account-namespace';

/** The pre-S464 global key (no account suffix). Removed on boot, never read. */
const LEGACY_ACTIVE_PROFILE_KEY = ACTIVE_PROFILE_KEY;

/** The localStorage key carrying {@link accountId}'s active-profile hint. */
export function activeProfileStorageKey(accountId: string): string {
  return `${ACTIVE_PROFILE_KEY}.${accountId}`;
}

/**
 * S463 lane marker — code-resident literal for the merge ritual. The change it
 * tags: when `removeProfile` deletes the ACTIVE row and the re-list ADOPTS a
 * replacement, that adoption (null → surviving id) deliberately bumps `epoch`
 * outside the id watcher — the watcher skips null → id transitions by design
 * (boot adoption is not a switch), so without the explicit bump, epoch-scoped
 * re-read listeners would never see the healed scope.
 */
export const S463EPOCHBUMPX9K4 = 'remove-adopt-epoch-bump';

function readStoredActiveProfileId(accountId: string | null): string | null {
  if (typeof localStorage === 'undefined' || accountId === null) return null;
  const raw = localStorage.getItem(activeProfileStorageKey(accountId));
  return typeof raw === 'string' && raw !== '' ? raw : null;
}

function persistActiveProfileId(accountId: string | null, id: string | null): void {
  if (typeof localStorage === 'undefined' || accountId === null) return;
  const key = activeProfileStorageKey(accountId);
  if (id === null) localStorage.removeItem(key);
  else localStorage.setItem(key, id);
}

/** Drop the pre-S464 global key if an old build left one behind (documented reset). */
function discardLegacyActiveProfileKey(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(LEGACY_ACTIVE_PROFILE_KEY);
}

export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore();
  // The APP'S own base (profiles are an AuthMiddleware surface of this app's
  // backend — never the hub relay-proxy base), same resolution as useAuthStore.
  const apiBase = useApiBase();

  // ---- S464 account plumbing for the namespaced storage mirror ---------------
  // The account whose key we read/write. `auth.user` is hydrated asynchronously
  // (`init()` → `fetchUser()`), so at boot this may be null until the account
  // arrives; it survives a logout long enough for `reset()` to clear the right
  // key, and the arrival watch re-seeds for the next account.
  function currentAccountId(): string | null {
    const id = auth.user?.id;
    return typeof id === 'string' && id !== '' ? id : null;
  }
  let mirrorAccount = currentAccountId();
  discardLegacyActiveProfileKey();

  /** Hydrated rows from `GET /api/v1/profiles` (server order: active first). */
  const profiles = ref<OwnProfile[]>([]);
  const loading = ref(false);
  /** Has the list read completed at least once since boot / after `reset()`? */
  const loaded = ref(false);
  const error = ref<string | null>(null);
  /** The session's active profile id (server `is_active` once loaded). */
  const activeProfileId = ref<string | null>(readStoredActiveProfileId(mirrorAccount));
  /** Id of the profile whose switch request is in flight (per-tile busy flag). */
  const switchingId = ref<string | null>(null);
  /**
   * Was the Who's-watching choice already made this session? Set on a
   * successful switch or an explicit acknowledge; cleared by `reset()` (logout).
   * Session-scoped on purpose: a reload re-asks, matching the post-login intent.
   */
  const choiceMade = ref(false);
  /**
   * Did the user EXPLICITLY ask for the picker (UserMenu → "Switch Profile")?
   * While `arming` and the list is still not `loaded`, PhlixApp mounts the
   * screen anyway so its loading/error + Retry panes are reachable — without
   * this, `gateOpen`'s `loaded` term would make a post-failure "Switch Profile"
   * a dead click. Cleared the moment a choice exists (switch accepted,
   * acknowledged) or by `reset()`; it never outlives the surface it armed.
   */
  const arming = ref(false);

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
   * second call while one is in flight returns immediately WITHOUT issuing a
   * request — it does not await the in-flight outcome; the flight in progress
   * writes the shared state, so nobody needs a second copy of it.
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
        persistActiveProfileId(mirrorAccount, serverActive);
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
      arming.value = false;
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
      persistActiveProfileId(mirrorAccount, activeProfileId.value);
      choiceMade.value = true;
      arming.value = false;
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
    arming.value = false;
  }

  /**
   * Re-open the Who's-watching gate on purpose (UserMenu → "Switch Profile").
   * `gateOpen` alone still decides the visible case (loaded + >1 profile) — but
   * `arming` additionally mounts the screen while a re-read is pending or has
   * failed, so this click is never dead: after a failed boot load, "Switch
   * Profile" IS the user-initiated retry, and its loading/error+Retry panes are
   * reachable. With a single profile the list arrives and the surface closes
   * itself — nothing to switch to, correctly a no-op visual.
   */
  function openGate(): void {
    choiceMade.value = false;
    arming.value = true;
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
   * load adopts whatever `is_active` row remains, healing the scope, and that
   * adoption bumps `epoch` explicitly (S463) so scoped caches re-read from the
   * survivor rather than staying pinned to the dropped row's scope.
   */
  async function removeProfile(profileId: string): Promise<boolean> {
    error.value = null;
    try {
      await api(apiBase.value).removeOwnProfile(profileId);
      const wasActive = profileId === activeProfileId.value;
      if (wasActive) {
        // The deleted row can no longer be the scope; drop the mirror and let
        // the re-list adopt the surviving active profile (null until it does).
        activeProfileId.value = null;
        persistActiveProfileId(mirrorAccount, null);
      }
      await load(true);
      if (wasActive && activeProfileId.value !== null) {
        // S463 — the healing ADOPTION is a real scope change (the interim null
        // above, if it fired at all, left listeners on an anonymous scope, and
        // the id watcher never bumps null → id). Land the replacement explicitly
        // so every epoch-scoped re-read runs against the surviving profile.
        epoch.value += 1;
      }
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
    arming.value = false;
    activeProfileId.value = null;
    persistActiveProfileId(mirrorAccount, null);
  }

  // The invalidation signal: any real change of active profile — a completed
  // switch here, or a server row that turns out to be active on load — bumps
  // `epoch`. Profile-scoped consumers (`useUserItemDataStore`, the media grid
  // cache, the favorites/history screens) watch THIS number, never the id, so a
  // scope→scope swap always clears even when an id repeats after a delete.
  // The one transition deliberately NOT bumped here is null → id (boot/first
  // adoption); `removeProfile` compensates with an explicit bump when a delete
  // heals into a replacement scope (S463), because THAT null → id is a change.
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

  // S464 — the account can arrive AFTER this store was constructed (boot with a
  // stored token: `fetchUser()` resolves async) or REPLACE the previous one
  // (re-login as another user on the same browser). Adopt the newcomer's own
  // namespaced key, and only into a null mirror — never overwriting a live
  // session scope, and null → id does not bump epoch (boot-adoption rule).
  watch(currentAccountId, (account, prev) => {
    if (account === null || account === prev) return;
    mirrorAccount = account;
    if (activeProfileId.value === null) {
      activeProfileId.value = readStoredActiveProfileId(account);
    }
  });

  return {
    profiles,
    loading,
    loaded,
    error,
    activeProfileId,
    switchingId,
    choiceMade,
    arming,
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
