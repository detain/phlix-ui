/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MediaItem } from '../types/media-item';
/**
 * Shared stale-while-revalidate (SWR) cache for single media items (UI-2.1, finding U-N2).
 *
 * A genuinely module-level `Map<id, { item, ts }>` that survives page remounts across the
 * whole SPA session, so `browse → detail → player → back → detail` all hit ONE cache.
 *
 * IMPORTANT: this lives in its own module (not inside a component's `<script setup>`).
 * A `const map = new Map()` written at the top of `<script setup>` is compiled into the
 * component's `setup()` function and is therefore recreated on every mount — it is
 * per-instance, NOT module-level, so it caches nothing across route navigations (each
 * route change remounts the page with a fresh empty map). Extracting the cache here makes
 * it a real process-lifetime singleton shared by MediaDetailPage and PlayerPage.
 *
 * Semantics (identical for every consumer):
 *  - Fresh entry (age < TTL): render it instantly, NO network request.
 *  - Miss / stale entry: fetch, then re-cache (a stale entry may still be shown first).
 *  - Refresh fetch fails: serve the stale entry as a fallback (don't error out).
 *
 * Lifetime = the SPA session. The map is small (one entry per distinct title opened) and
 * naturally bounded by how many titles a user visits; UI-2.2 covers unbounded-growth
 * concerns for the separate list-store cache.
 */
export interface CachedMediaItem {
    /** The cached media item payload as returned by `GET /api/v1/media/:id`. */
    item: MediaItem;
    /** `Date.now()` at cache time — used to compute freshness against the TTL. */
    ts: number;
}
/** How long a cached item is considered fresh (no background refresh needed). */
export declare const MEDIA_CACHE_TTL_MS = 60000;
/** Return the raw cache entry (fresh OR stale) for `id`, or `undefined` if absent. */
export declare function getMediaItemCacheEntry(id: string): CachedMediaItem | undefined;
/** True when `entry` exists and is younger than the TTL relative to `now`. */
export declare function isMediaItemCacheFresh(entry: CachedMediaItem | undefined, now?: number): boolean;
/** Store/refresh `item` under `id`, stamping the cache time (`ts`). */
export declare function cacheMediaItem(id: string, item: MediaItem, ts?: number): void;
/**
 * Clear the entire cache. Primarily for test isolation (the singleton persists across
 * tests in a file) and for explicit invalidation (e.g. on logout / server switch).
 */
export declare function clearMediaItemCache(): void;
