/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { ApiClient } from '../api/client';
import type { MediaItem } from '../types/media-item';
import { type SeasonGroup } from '../components/series-grouping';
/**
 * useResolvePlayable (Feature 9, Step 9.1) — turn the item a "Play" button was
 * pressed on into the item the player route should actually open.
 *
 * The Play button itself emits the item it sits on, but a *series* (and a
 * *season*) isn't directly playable: pressing Play on a series should start the
 * viewer's next-up / resume-in-progress episode — or the very first episode when
 * they've never watched it — NOT navigate to the detail page or blindly play
 * "episode 1". This composable centralises that resolution so every host page
 * (Browse / Library / Detail — wired in Steps 9.2–9.4) shares ONE implementation.
 *
 * Directly-playable types (movie / episode / audio / image) resolve to
 * themselves. Containers (series / season) are resolved by fetching + grouping
 * the episodes (reusing {@link loadSeriesSeasons}) and picking via the pure
 * {@link pickPlayableEpisode}. Nothing playable → `null` (the caller toasts).
 */
/**
 * Resume positions keyed by item id (seconds), as exposed by
 * `usePlayerStore.resumeMap`. An entry with a positive value means that episode
 * was started and not finished (the store deletes entries that finish / are too
 * early), so its presence marks a "resume-in-progress" episode.
 */
export type ResumeMap = Record<string, number>;
/**
 * PURE picker: given a series' already-grouped/ordered seasons and the resume
 * map, return the episode to play — the first resume-in-progress episode in
 * whole-series playback order (so the viewer's furthest-along in-progress
 * episode that the ordering reaches first), else the very first episode, else
 * `null` when there are no episodes.
 *
 * Playback order reuses {@link orderEpisodesForPlayback}: numbered seasons in
 * (season, episode) order, Specials excluded — the same sequence prev/next +
 * auto-advance use, so "resume / next-up" never lands on a Special.
 *
 * No I/O — unit-testable without mocking the client.
 */
export declare function pickPlayableEpisode(groups: SeasonGroup[], resumeMap: ResumeMap): MediaItem | null;
/**
 * PURE single-season picker: the episode to play when Play is pressed on ONE
 * season (a season card on the series page, or the season page's top Play).
 * Prefers the season's first resume-in-progress episode in playback order, else
 * its first episode. Unlike {@link pickPlayableEpisode}, a SPECIALS season falls
 * back to its first special (orderEpisodesForPlayback excludes season 0, but an
 * explicit Play on the Specials bucket must still play a special); `null` only
 * when the season has no episodes at all. Auto-advance from the picked episode
 * is the player's existing whole-series chain.
 */
export declare function pickSeasonPlayable(group: SeasonGroup, resumeMap: ResumeMap): MediaItem | null;
/**
 * Resolve the playable item for a Play action. Returns the item whose `.id` the
 * player route should use, or `null` when nothing is playable.
 *
 * - movie / episode / audio / image → the item itself.
 * - season → the first resume-in-progress episode in that season, else its first
 *   episode (fetched + grouped via {@link loadSeriesSeasons}).
 * - series → the next-up / resume episode across the whole series, else the
 *   first episode.
 * - a series/season with no episodes → `null`.
 *
 * The optional {@link AbortSignal} is threaded through every client fetch; an
 * aborted fetch rejects with an `AbortError` which propagates to the caller (the
 * host page's in-flight token discards a superseded resolve) — matching the
 * codebase's abort convention.
 */
export declare function resolvePlayable(client: ApiClient, apiBase: string, item: MediaItem, resumeMap: ResumeMap, signal?: AbortSignal): Promise<MediaItem | null>;
