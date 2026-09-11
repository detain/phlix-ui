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
import { type OwnProfile } from '../api/admin/users';
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
export declare const ACTIVE_PROFILE_KEY = "phlix.active_profile";
/**
 * S464 lane marker — code-resident literal for the merge ritual (namespacing
 * of the active-profile storage key per account, with the legacy-key reset
 * above).
 */
export declare const S464ACCTNSKEYX9K5 = "active-profile-account-namespace";
/** The localStorage key carrying {@link accountId}'s active-profile hint. */
export declare function activeProfileStorageKey(accountId: string): string;
/**
 * S463 lane marker — code-resident literal for the merge ritual. The change it
 * tags: when `removeProfile` deletes the ACTIVE row and the re-list ADOPTS a
 * replacement, that adoption (null → surviving id) deliberately bumps `epoch`
 * outside the id watcher — the watcher skips null → id transitions by design
 * (boot adoption is not a switch), so without the explicit bump, epoch-scoped
 * re-read listeners would never see the healed scope.
 */
export declare const S463EPOCHBUMPX9K4 = "remove-adopt-epoch-bump";
export declare const useProfileStore: import("pinia").StoreDefinition<"profile", Pick<{
    profiles: import("vue").Ref<{
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    }[], OwnProfile[] | {
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    activeProfileId: import("vue").Ref<string | null, string | null>;
    switchingId: import("vue").Ref<string | null, string | null>;
    choiceMade: import("vue").Ref<boolean, boolean>;
    arming: import("vue").Ref<boolean, boolean>;
    epoch: import("vue").Ref<number, number>;
    hasMultipleProfiles: import("vue").ComputedRef<boolean>;
    activeProfile: import("vue").ComputedRef<{
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    } | null>;
    gateOpen: import("vue").ComputedRef<boolean>;
    scopeKey: import("vue").ComputedRef<string>;
    load: (force?: boolean) => Promise<void>;
    retry: () => Promise<void>;
    switchTo: (profileId: string) => Promise<boolean>;
    createProfile: (name: string) => Promise<boolean>;
    rename: (profileId: string, name: string) => Promise<boolean>;
    removeProfile: (profileId: string) => Promise<boolean>;
    acknowledgeChoice: () => void;
    openGate: () => void;
    reset: () => void;
}, "error" | "loading" | "profiles" | "loaded" | "activeProfileId" | "switchingId" | "choiceMade" | "arming" | "epoch">, Pick<{
    profiles: import("vue").Ref<{
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    }[], OwnProfile[] | {
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    activeProfileId: import("vue").Ref<string | null, string | null>;
    switchingId: import("vue").Ref<string | null, string | null>;
    choiceMade: import("vue").Ref<boolean, boolean>;
    arming: import("vue").Ref<boolean, boolean>;
    epoch: import("vue").Ref<number, number>;
    hasMultipleProfiles: import("vue").ComputedRef<boolean>;
    activeProfile: import("vue").ComputedRef<{
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    } | null>;
    gateOpen: import("vue").ComputedRef<boolean>;
    scopeKey: import("vue").ComputedRef<string>;
    load: (force?: boolean) => Promise<void>;
    retry: () => Promise<void>;
    switchTo: (profileId: string) => Promise<boolean>;
    createProfile: (name: string) => Promise<boolean>;
    rename: (profileId: string, name: string) => Promise<boolean>;
    removeProfile: (profileId: string) => Promise<boolean>;
    acknowledgeChoice: () => void;
    openGate: () => void;
    reset: () => void;
}, "hasMultipleProfiles" | "activeProfile" | "gateOpen" | "scopeKey">, Pick<{
    profiles: import("vue").Ref<{
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    }[], OwnProfile[] | {
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    }[]>;
    loading: import("vue").Ref<boolean, boolean>;
    loaded: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    activeProfileId: import("vue").Ref<string | null, string | null>;
    switchingId: import("vue").Ref<string | null, string | null>;
    choiceMade: import("vue").Ref<boolean, boolean>;
    arming: import("vue").Ref<boolean, boolean>;
    epoch: import("vue").Ref<number, number>;
    hasMultipleProfiles: import("vue").ComputedRef<boolean>;
    activeProfile: import("vue").ComputedRef<{
        id: string;
        user_id: string;
        name: string;
        avatar_url: string | null;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        rating?: number | undefined;
        settings?: {
            content_rating: string;
            pin_required_for_admin: boolean;
            max_daily_watch_time: number;
            allow_unrated: boolean;
            allowed_genres?: string[] | undefined;
            blocked_genres?: string[] | undefined;
        } | undefined;
    } | null>;
    gateOpen: import("vue").ComputedRef<boolean>;
    scopeKey: import("vue").ComputedRef<string>;
    load: (force?: boolean) => Promise<void>;
    retry: () => Promise<void>;
    switchTo: (profileId: string) => Promise<boolean>;
    createProfile: (name: string) => Promise<boolean>;
    rename: (profileId: string, name: string) => Promise<boolean>;
    removeProfile: (profileId: string) => Promise<boolean>;
    acknowledgeChoice: () => void;
    openGate: () => void;
    reset: () => void;
}, "reset" | "load" | "retry" | "rename" | "switchTo" | "createProfile" | "removeProfile" | "acknowledgeChoice" | "openGate">>;
