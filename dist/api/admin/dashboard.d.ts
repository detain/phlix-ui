import type { ApiClient } from '../client';
/** A currently-playing playback session. */
export interface NowPlayingItem {
    session_id: string;
    user_id: string;
    user_name: string;
    media_item_id: string;
    media_title: string;
    media_type: string;
    progress_percent: number;
    started_at: string;
}
/** A user leaderboard entry. */
export interface TopUser {
    user_id: string;
    user_name: string;
    total_watch_time_seconds: number;
    play_count: number;
    last_seen: string;
}
/** A media ranking entry. */
export interface TopMedia {
    media_item_id: string;
    media_title: string;
    media_type: string;
    play_count: number;
    total_duration_seconds: number;
    last_played_at: string;
}
/** Storage summary per media type. */
export interface StorageSummary {
    media_type: string;
    item_count: number;
    total_bytes: number;
    transcode_cache_bytes: number;
}
/** An event in the activity feed. */
export interface ActivityEvent {
    id: string;
    event_type: string;
    user_id: string;
    user_name: string;
    media_item_id: string;
    media_title: string;
    created_at: string;
    details: string;
}
/**
 * AdminDashboardApi (RA.2) — typed wrapper over the admin dashboard endpoints
 * (`/api/v1/admin/dashboard/*`), ported from the deleted React `DashboardApi`.
 * Wraps now-playing sessions, the top-user leaderboard, top-media ranking, the
 * storage breakdown, and the activity feed — all consumed by `DashboardPage`.
 * Defensively unwraps `{ success, data }` and normalises the server's drifted
 * field names so a malformed payload degrades to empty rather than throwing.
 */
export declare class AdminDashboardApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/dashboard/now-playing` → unwraps `{ success, data }`. */
    getNowPlaying(): Promise<NowPlayingItem[]>;
    /**
     * `GET /api/v1/admin/dashboard/top-users?limit=&days=` → `{ success, data }`.
     * @param limit Max results (server default 10).
     * @param days Lookback window in days (server default 30).
     */
    getTopUsers(limit?: number, days?: number): Promise<TopUser[]>;
    /**
     * `GET /api/v1/admin/dashboard/top-media?limit=&days=` → `{ success, data }`.
     * @param limit Max results (server default 10).
     * @param days Lookback window in days (server default 30).
     */
    getTopMedia(limit?: number, days?: number): Promise<TopMedia[]>;
    /**
     * `GET /api/v1/admin/dashboard/storage`.
     *
     * The server's `DashboardService::getStorageSummary()` returns an OBJECT —
     * `{ movie_bytes, …, items: StorageSummary[], formatted_transcode_cache }` —
     * NOT a bare list. The per-media-type rows the UI renders live under
     * `data.items`; unwrap that (and default to `[]`) so callers always get the
     * array they expect. Returning `data` verbatim would hand the page an object
     * and crash the storage card with "items.reduce is not a function".
     */
    getStorage(): Promise<StorageSummary[]>;
    /**
     * `GET /api/v1/admin/dashboard/activity?limit=` → `{ success, data }`.
     * @param limit Max results (server default 20).
     */
    getActivity(limit?: number): Promise<ActivityEvent[]>;
}
