import type { ApiClient } from '../client';
/** A recently-watched item as returned by `GET /api/v1/users/me/recently-watched`. */
export interface RecentlyWatchedItem {
    id: string;
    media_item_id?: string;
    name?: string;
    title?: string;
    media_type?: string;
    type?: string;
    progress_percent?: number;
    last_watched_at?: string;
    thumbnail_url?: string;
    poster_url?: string;
    [k: string]: unknown;
}
/** Response envelope for the recently-watched list. */
export interface RecentlyWatchedResponse {
    items: RecentlyWatchedItem[];
}
/**
 * A single row from the admin **all-users** watch-history endpoint
 * (`GET /api/v1/admin/watch-history`). Unlike {@link RecentlyWatchedItem} (which
 * is the current user's own list), this is a flat, fully-populated admin row
 * with the watching user's identity (`user_id`/`username`/`display_name`/
 * `profile_name`) attached. Every field is a scalar; empties arrive as `''`.
 */
export interface AdminWatchHistoryItem {
    id: string;
    media_item_id: string;
    media_name: string;
    media_type: string;
    library_id: string;
    user_id: string;
    username: string;
    display_name: string;
    profile_name: string;
    last_watched_at: string;
    completed_at: string;
    playback_status: string;
    progress_percent: number;
}
/**
 * AdminHistoryApi (RA.13) — typed wrapper over the watch-history endpoints
 * (`/api/v1/users/me/recently-watched`, `/api/v1/users/me/history*`), ported
 * 1:1 from the deleted React `HistoryApi`. Lists the recently-watched items and
 * removes one or clears them all. The list unwrap is defended with an
 * `Array.isArray` guard so a malformed payload degrades to empty rather than
 * throwing downstream.
 *
 * Also exposes {@link getAllWatchHistory} over the admin **all-users** endpoint
 * `GET /api/v1/admin/watch-history` (read-only oversight of who watched what &
 * when), whose `{ success, data }` envelope is unwrapped and normalised to
 * {@link AdminWatchHistoryItem}.
 */
export declare class AdminHistoryApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/users/me/recently-watched` → unwraps `{ items }`. */
    getRecentlyWatched(): Promise<RecentlyWatchedItem[]>;
    /** `DELETE /api/v1/users/me/history/{mediaItemId}` → `{ message }`. */
    removeFromHistory(mediaItemId: string): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/users/me/history` → `{ message }`. */
    clearHistory(): Promise<{
        message: string;
    }>;
    /** `GET /api/v1/admin/watch-history?limit=&userId=&libraryId=` → unwraps `{ success, data }` (all users, admin-only). */
    getAllWatchHistory(opts?: {
        limit?: number;
        userId?: string;
        libraryId?: string;
    }): Promise<AdminWatchHistoryItem[]>;
}
