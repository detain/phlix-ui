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
import { type OwnProfile } from '../api/admin/users';
/**
 * localStorage mirror of the active profile id — a UI hint so the first paint
 * after reload marks the right tile, NOT the authority: every `load()` adopts
 * the server row whose `is_active` is true (that column is what the backend
 * actually enforces via the JWT claim).
 */
export declare const ACTIVE_PROFILE_KEY = "phlix.active_profile";
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
}, "error" | "loading" | "profiles" | "loaded" | "activeProfileId" | "switchingId" | "choiceMade" | "epoch">, Pick<{
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
