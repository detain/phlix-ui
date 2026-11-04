/**
 * useUserItemDataStore — per-item favorite/rating/thumbs state, cached client-side.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { ApiClient } from '../api/client';
import { errMessage } from '../api/errors';
import { useToastStore } from './useToastStore';
import { useProfileStore } from './useProfileStore';
import { useMessages } from '../composables/useMessages';
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

  // S82 — the favorite/watched/like flags on an item are PER PROFILE (the server
  // scopes them by the JWT profile claim, S79-S81). On any active-profile change
  // (`useProfileStore.epoch` bumps only on real scope swaps — see the store) the
  // whole map drops: every card re-reads after the next hydrate, which the
  // favorites/history/browse fetches feed under the NEW profile's token. A cache
  // keyed by item id alone cannot outlive the scope it was written in.
  const profiles = useProfileStore();
  watch(
    () => profiles.epoch,
    () => {
      entries.value = new Map();
      // UI-m48: the last-known-server values were recorded under the OLD
      // profile's scope — S82 law says they cannot outlive it either.
      serverTruth.clear();
    },
  );

  // UI-m49 (review ui__webux): the failure toasts speak the catalog — the same
  // seam useAuthStore adopted under M-UI-10 (PhlixAppConfig.messages honored
  // inside an app context, English defaults outside one).
  const { t } = useMessages();

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
   * UI-m48 (review ui__webux): the last value the SERVER confirmed per item —
   * fed by `hydrate` (server payload) and by every successful write. On a
   * failed optimistic write the rollback restores THIS, never the flip's own
   * pre-op snapshot: with overlapping toggles that snapshot can be two writes
   * stale (the review's "cache true while server is false" class). Deliberately
   * NOT reactive — it is consulted only on the failure path; the map above
   * remains the rendered state. With no server record yet the rollback falls
   * back to the old snapshot (the server has never contradicted it).
   */
  const serverTruth = new Map<string, UserItemData>();

  function recordServerTruth(id: string, patch: Partial<UserItemData>): void {
    const current = serverTruth.get(id) ?? { ...DEFAULT_ENTRY };
    serverTruth.set(id, { ...current, ...patch });
  }

  /**
   * Seed the cache entry for an item from its server `user_data` block. Safe to
   * call repeatedly (e.g. on each detail open). `user_data` is optional/nullable
   * — when absent the entry defaults to favorite=false, rating=null, like_level=0.
   */
  function hydrate(item: MediaDetail | MediaListItem | null | undefined): void {
    if (!item || typeof item.id !== 'string') return;
    const ud = (item as MediaDetail).user_data;
    const seeded: UserItemData = {
      favorite: ud?.favorite ?? false,
      rating: ud?.rating ?? null,
      like_level: ud?.like_level ?? 0,
      watched: ud?.watched ?? false,
    };
    entries.value.set(item.id, seeded);
    serverTruth.set(item.id, { ...seeded });
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
      recordServerTruth(id, { favorite: next }); // UI-m48: the server just confirmed it
    } catch (e) {
      // Roll back to the last value the SERVER confirmed — never this flip's
      // own pre-op snapshot, which overlapping writes can make stale (UI-m48);
      // with no server record yet the snapshot is the best-known fallback.
      // UI-m49: the action context rides the catalog ('my list' worded, both
      // arms); the appended error detail stays the raw errMessage channel.
      const truth = serverTruth.get(id);
      setEntry(id, { favorite: truth ? truth.favorite : previous });
      const copy = next ? t('itemActions.favoriteAddError') : t('itemActions.favoriteRemoveError');
      useToastStore().error(`${copy}: ${errMessage(e)}`);
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
      recordServerTruth(id, { watched: next }); // UI-m48
    } catch (e) {
      // UI-m48: roll back to server truth (snapshot fallback when unseen);
      // UI-m49: catalog copy both arms (see toggleFavorite).
      const truth = serverTruth.get(id);
      setEntry(id, { watched: truth ? truth.watched : previous });
      const copy = next ? t('itemActions.markWatchedError') : t('itemActions.markUnwatchedError');
      useToastStore().error(`${copy}: ${errMessage(e)}`);
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
      recordServerTruth(id, { like_level: next }); // UI-m48
    } catch (e) {
      // Roll back to the last level the SERVER confirmed (UI-m48; the prior
      // level is the fallback only when the server never spoke about the
      // item). UI-m49: the action context rides the catalog; errMessage
      // detail stays on the raw channel (INFO-UI-33's own wave).
      const truth = serverTruth.get(id);
      setEntry(id, { like_level: truth ? truth.like_level : previous });
      useToastStore().error(`${t('itemActions.ratingSaveError')}: ${errMessage(e)}`);
    }
  }

  /** Discard the cached client so the next call rebuilds it (e.g. on logout). */
  function reset(): void {
    entries.value = new Map();
    serverTruth.clear(); // UI-m48: stale server records die with the cache
    apiClient = null;
  }

  return { entries, isFavorite, likeLevel, isWatched, get, hydrate, toggleFavorite, toggleWatched, setLike, reset };
});
