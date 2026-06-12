import type { MediaItem } from '../../types/media-item';
/**
 * episode-order (U2) — pure helpers that turn a series' flat child list into a
 * single ordered playback sequence spanning every season, then resolve the
 * Previous / Next episode relative to the one currently playing.
 *
 * Ordering reuses `groupEpisodesBySeason` (the same season → episode grouping the
 * series detail page uses): seasons ascend by number, the Specials bucket sorts
 * last, and within a season episodes ascend by episode number (missing last).
 * Flattening that grouping yields the whole-series order, so the last episode of
 * a season is immediately followed by the first episode of the next season.
 */
/**
 * Flatten a series' (already season-grouped-capable) child list into a single
 * ordered episode sequence across all seasons. Non-episode rows (the series
 * itself, season containers) are dropped by the grouping.
 */
export declare function orderEpisodes(items: MediaItem[]): MediaItem[];
/**
 * The ordered episode sequence used for PLAYBACK prev/next + auto-advance (U2).
 *
 * Unlike `orderEpisodes` (which mirrors the display grouping and sorts the
 * Specials bucket last), this EXCLUDES season 0 / Specials entirely: numbered
 * seasons (>= 1) only, in (season, episode) order. So "Next" off a series
 * finale is disabled rather than jumping into a Special, and Specials are
 * reached only from the series page — never auto-advanced into. The display
 * grouping (`groupEpisodesBySeason`) is unchanged.
 */
export declare function orderEpisodesForPlayback(items: MediaItem[]): MediaItem[];
/** The previous episode before `currentId` in the ordered list, or null at the start. */
export declare function previousEpisode(ordered: MediaItem[], currentId: string): MediaItem | null;
/** The next episode after `currentId` in the ordered list, or null at the end. */
export declare function nextEpisode(ordered: MediaItem[], currentId: string): MediaItem | null;
