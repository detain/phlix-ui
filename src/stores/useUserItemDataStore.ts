/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ApiClient } from '../api/client';
import { errMessage } from '../api/errors';
import { useToastStore } from './useToastStore';
import type { MediaDetail, MediaListItem } from '../types/media-item';

/**
 * Per-item, per-user interaction state (favorite flag, personal rating, and the
 * thumbs up/down rating level) cached client-side so the bookmark/thumbs on a
 * card can flip *immediately* on click while the write goes out in the background.
 *
 * Shape note: `like_level` (−2..2) is carried in the map — the thumbs axis
 * (−2 strongly dislike … 0 not set … 2 love). `setLike` writes it directly with
 * the same optimistic+rollback pattern as the favorite toggle.
 */
export interface UserItemData {
  favorite: boolean;
  rating: number | null;
  /** Thumbs rating on the −2..2 axis (0 = not set). */
  like_level: number;
  /** Whether the authenticated user has marked this item watched (the eye toggle). */
  watched: boolean;
}

const DEFAULT_ENTRY: Readonly<UserItemData> = Object.freeze({
  favorite: false,
  rating: null,
  like_level: 0,
  watched: false,
});

export const useUserItemDataStore = defineStore('user-item-data', () => {
  /** Reactive cache of per-item user state, keyed by media item id. */
  const entries = ref<Map<string, UserItemData>>(new Map());

  /**
   * Lazily-constructed, long-lived ApiClient — reused across all calls (mirrors
   * the useMediaStore convention). When `apiBase` changes between calls we call
   * `setBaseUrl()` rather than rebuilding the client.
   */
  let apiClient: ApiClient | null = null;
  function client(apiBase: string): ApiClient {
    if (!apiClient) {
      apiClient = new ApiClient({ baseUrl: apiBase });
    } else {
      apiClient.setBaseUrl(apiBase);
    }
    return apiClient;
  }

  /** Current favorite state for an id (false when the item is unknown). */
  function isFavorite(id: string): boolean {
    return entries.value.get(id)?.favorite ?? false;
  }

  /** Current thumbs rating (−2..2) for an id (0 when the item is unknown). */
  function likeLevel(id: string): number {
    return entries.value.get(id)?.like_level ?? 0;
  }

  /** Current watched state for an id (false when the item is unknown). */
  function isWatched(id: string): boolean {
    return entries.value.get(id)?.watched ?? false;
  }

  /** Read the full cached entry (defaulted) for an id. */
  function get(id: string): UserItemData {
    return entries.value.get(id) ?? { ...DEFAULT_ENTRY };
  }

  /**
   * Seed the cache entry for an item from its server `user_data` block. Safe to
   * call repeatedly (e.g. on each detail open). `user_data` is optional/nullable
   * — when absent the entry defaults to favorite=false, rating=null, like_level=0.
   */
  function hydrate(item: MediaDetail | MediaListItem | null | undefined): void {
    if (!item || typeof item.id !== 'string') return;
    const ud = (item as MediaDetail).user_data;
    entries.value.set(item.id, {
      favorite: ud?.favorite ?? false,
      rating: ud?.rating ?? null,
      like_level: ud?.like_level ?? 0,
      watched: ud?.watched ?? false,
    });
  }

  function setEntry(id: string, patch: Partial<UserItemData>): void {
    const current = entries.value.get(id) ?? { ...DEFAULT_ENTRY };
    entries.value.set(id, { ...current, ...patch });
  }

  /**
   * Toggle the favorite flag for an item. The map is flipped SYNCHRONOUSLY
   * (optimistic) so the UI reflects the new state immediately; the matching
   * `addFavorite`/`removeFavorite` write goes out in the background. On API
   * error the optimistic change is rolled back and an error toast is surfaced.
   */
  async function toggleFavorite(id: string, apiBase: string): Promise<void> {
    const previous = isFavorite(id);
    const next = !previous;
    setEntry(id, { favorite: next });

    try {
      const api = client(apiBase);
      if (next) {
        await api.addFavorite(id);
      } else {
        await api.removeFavorite(id);
      }
    } catch (e) {
      // Roll back the optimistic flip and tell the user. We keep the action
      // context ("add to"/"remove from favorites") in the toast and append the
      // underlying error detail, since errMessage() prefers the Error's own
      // (often opaque) message over any fallback.
      setEntry(id, { favorite: previous });
      const verb = next ? 'add to' : 'remove from';
      useToastStore().error(`Failed to ${verb} favorites: ${errMessage(e)}`);
    }
  }

  /**
   * Toggle the watched flag for an item. The map is flipped SYNCHRONOUSLY
   * (optimistic) so the eye icon reflects the new state immediately; the matching
   * `markWatched`/`markUnwatched` write goes out in the background. On API error
   * the optimistic change is rolled back and an error toast is surfaced (mirrors
   * `toggleFavorite`).
   */
  async function toggleWatched(id: string, apiBase: string): Promise<void> {
    const previous = isWatched(id);
    const next = !previous;
    setEntry(id, { watched: next });

    try {
      const api = client(apiBase);
      if (next) {
        await api.markWatched(id);
      } else {
        await api.markUnwatched(id);
      }
    } catch (e) {
      setEntry(id, { watched: previous });
      const verb = next ? 'watched' : 'unwatched';
      useToastStore().error(`Failed to mark ${verb}: ${errMessage(e)}`);
    }
  }

  /**
   * Set the thumbs rating for an item to an explicit `level` on the −2..2 axis
   * (the caller — the ThumbRating widget — computes the next level itself). The
   * incoming level is clamped/validated into range, then the map is mutated
   * SYNCHRONOUSLY (optimistic) so the widget reflects it immediately while the
   * `setLikeLevel` write goes out in the background. On API error the optimistic
   * change is rolled back to the prior level and an error toast is surfaced
   * (mirrors `toggleFavorite`).
   */
  async function setLike(id: string, level: number, apiBase: string): Promise<void> {
    // Clamp/validate the requested level into the −2..2 integer axis so a stray
    // out-of-range value can never be persisted or cached.
    let next = Math.trunc(Number(level));
    if (!Number.isFinite(next)) next = 0;
    if (next < -2) next = -2;
    if (next > 2) next = 2;

    const previous = likeLevel(id);
    setEntry(id, { like_level: next });

    try {
      await client(apiBase).setLikeLevel(id, next);
    } catch (e) {
      // Roll back the optimistic change to the precise prior level and tell the
      // user. errMessage() prefers the Error's own message, so we prepend the
      // action context ourselves.
      setEntry(id, { like_level: previous });
      useToastStore().error(`Failed to set rating: ${errMessage(e)}`);
    }
  }

  /** Discard the cached client so the next call rebuilds it (e.g. on logout). */
  function reset(): void {
    entries.value = new Map();
    apiClient = null;
  }

  return { entries, isFavorite, likeLevel, isWatched, get, hydrate, toggleFavorite, toggleWatched, setLike, reset };
});
