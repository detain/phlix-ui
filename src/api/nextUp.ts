/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';
import type { MediaItem } from '../types/media-item';

/**
 * The viewer's "Next Up" rail (`GET /api/v1/users/me/next-up`, S36). For each
 * series the active profile has STARTED (an in-progress or recently-completed
 * episode, on the `playback_state`-only watched signal), the backend resolves the
 * NEXT unwatched episode in `(season, episode)` order and returns those picks,
 * most-recently-touched series first. This is a PER-USER list scoped to the active
 * profile (mirroring Continue Watching), NOT a global aggregate. This helper keeps
 * the fetch + envelope-unwrap in one place for the Browse "Next Up" rail (S37).
 *
 * Like the Most Watched helper (and unlike recommendations), the server shapes
 * each row through `MediaItemShaper::shape()` (the SAME shape as
 * `GET /api/v1/media` / the Continue Watching rail — the response is a superset
 * adding `series_id` / `series_name`, with `position_ticks` / `duration_ticks`
 * = 0 because a Next-Up pick is a fresh episode), so the items arrive already in
 * the `MediaItem` shape and need NO field remapping — only the
 * `{ items }` envelope is unwrapped.
 *
 * IMPORTANT: the shaped rows carry NO per-user `user_data` block
 * (`shapeNextEpisode()` passes no `user_data` key to the shaper), so the Browse
 * rail must `remember()` them for admin match/poster reconciliation ONLY and must
 * NOT `userItemData.hydrate()` them (hydrate would REPLACE store entries with
 * all-false defaults, racing the Favorites / Continue-Watching loaders and
 * transiently wiping favorite/watched/rating badges — the S32 state-wipe lesson).
 */

/**
 * Fetch the viewer's Next Up picks from the `GET /api/v1/users/me/next-up`
 * endpoint (S36). The rows are already shaped as `MediaItem`s server-side (poster
 * / artwork signed URLs re-minted at response time), so this just unwraps the
 * `{ items }` envelope, defending a malformed payload to `[]` rather than throwing
 * downstream. Optionally honours an `AbortSignal`.
 */
export async function fetchNextUp(
  client: ApiClient,
  params: { limit?: number } = {},
  signal?: AbortSignal,
): Promise<MediaItem[]> {
  const query: Record<string, string> = { limit: String(params.limit ?? 20) };
  const data = await client.get<{ items?: MediaItem[] }>(
    '/api/v1/users/me/next-up',
    query,
    signal,
  );
  return Array.isArray(data.items) ? data.items : [];
}
