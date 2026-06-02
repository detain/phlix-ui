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
 * AdminHistoryApi (RA.13) — typed wrapper over the watch-history endpoints
 * (`/api/v1/users/me/recently-watched`, `/api/v1/users/me/history*`), ported
 * 1:1 from the deleted React `HistoryApi`. Lists the recently-watched items and
 * removes one or clears them all. The list unwrap is defended with an
 * `Array.isArray` guard so a malformed payload degrades to empty rather than
 * throwing downstream.
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
}
