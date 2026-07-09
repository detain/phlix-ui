/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

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

// ---------------------------------------------------------------------------
// Admin all-users watch-history normalisers
//
// Mirrors the `asString`/`asNumber`/`asArray` idiom in `dashboard.ts` so a
// malformed payload coerces to a stable shape (empties → '', progress → number)
// rather than surfacing raw `undefined`s to the page.
// ---------------------------------------------------------------------------

type Raw = Record<string, unknown>;

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return fallback;
}

function asArray(value: unknown): Raw[] {
  return Array.isArray(value) ? (value as Raw[]) : [];
}

function toAdminWatchHistoryItem(r: Raw): AdminWatchHistoryItem {
  return {
    id: asString(r['id']),
    media_item_id: asString(r['media_item_id']),
    media_name: asString(r['media_name']),
    media_type: asString(r['media_type']),
    library_id: asString(r['library_id']),
    user_id: asString(r['user_id']),
    username: asString(r['username']),
    display_name: asString(r['display_name']),
    profile_name: asString(r['profile_name']),
    last_watched_at: asString(r['last_watched_at']),
    completed_at: asString(r['completed_at']),
    playback_status: asString(r['playback_status']),
    progress_percent: asNumber(r['progress_percent']),
  };
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
export class AdminHistoryApi {
  constructor(private readonly client: ApiClient) {}

  /** `GET /api/v1/users/me/recently-watched` → unwraps `{ items }`. */
  async getRecentlyWatched(): Promise<RecentlyWatchedItem[]> {
    const { items } = await this.client.get<RecentlyWatchedResponse>(
      '/api/v1/users/me/recently-watched',
    );
    return Array.isArray(items) ? items : [];
  }

  /** `DELETE /api/v1/users/me/history/{mediaItemId}` → `{ message }`. */
  async removeFromHistory(mediaItemId: string): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/users/me/history/${encodeURIComponent(mediaItemId)}`,
    );
  }

  /** `DELETE /api/v1/users/me/history` → `{ message }`. */
  async clearHistory(): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>('/api/v1/users/me/history');
  }

  /** `GET /api/v1/admin/watch-history?limit=&userId=&libraryId=` → unwraps `{ success, data }` (all users, admin-only). */
  async getAllWatchHistory(opts?: { limit?: number; userId?: string; libraryId?: string }): Promise<AdminWatchHistoryItem[]> {
    const params: Record<string, string> = {};
    if (opts?.limit !== undefined) params['limit'] = String(opts.limit);
    if (opts?.userId) params['userId'] = opts.userId;
    if (opts?.libraryId) params['libraryId'] = opts.libraryId;
    const { data } = await this.client.get<{ success: boolean; data: unknown }>(
      '/api/v1/admin/watch-history',
      Object.keys(params).length ? params : undefined,
    );
    return asArray(data).map(toAdminWatchHistoryItem);
  }
}
