import type { MediaItem } from '../types/media-item';
/**
 * series-grouping (R-series) — pure helpers that turn the flat child list the
 * browse API returns for a series (`GET /api/v1/media?parentId=<seriesId>`) into
 * an ordered season → episode tree for the series detail page.
 *
 * The grouping is by `season_number` (sourced from metadata) regardless of
 * whether the server models seasons as their own `type: 'season'` rows or parents
 * episodes straight onto the series — the detail page flattens any season rows to
 * their episodes first, so this only ever groups episodes. Season 0 / a missing
 * number bucket into "Specials", which always sorts last.
 */
export interface SeasonGroup {
    /** Stable key for `v-for` / `<details>` (`season-1` or `specials`). */
    key: string;
    /** The season number (>= 1), or null for the Specials bucket. */
    seasonNumber: number | null;
    /** Display label, e.g. "Season 1" or "Specials". */
    label: string;
    /** True when this is the Specials bucket (season 0 / missing number). */
    isSpecials: boolean;
    /** Episodes in this season, ordered by episode number (missing last) then title. */
    episodes: MediaItem[];
    /**
     * Season-level poster, when the server modelled the season as its own
     * `type: 'season'` row carrying one — null otherwise (the series detail page
     * falls back to the series poster for the season card). U3.
     */
    seasonPoster?: string | null;
    /**
     * The `type: 'season'` container row this group came from, when present.
     * Carries the season overview/name for the per-season page header. U3.
     */
    seasonItem?: MediaItem | null;
}
/**
 * Group a series' (already flattened) child list into ordered seasons. Real
 * seasons ascend by number; the Specials bucket (season 0 / missing) sorts last.
 * Non-episode rows (the series itself, season containers) are ignored for the
 * episode buckets, but any `type: 'season'` container rows in `items` (or the
 * optional `seasonRows`) contribute the season poster/name/overview to each
 * group (U3 — used by the series-page season grid + per-season header).
 */
export declare function groupEpisodesBySeason(items: MediaItem[], seasonRows?: MediaItem[]): SeasonGroup[];
/** Whether a child list contains any `type: 'season'` container rows. */
export declare function hasSeasonRows(items: MediaItem[]): boolean;
/** The first playable episode across all seasons in display order, or null. */
export declare function firstEpisode(groups: SeasonGroup[]): MediaItem | null;
/**
 * The route `:season` param for a season group: the season number, or `0` for
 * the Specials bucket (so it round-trips through `/app/media/:id/season/:season`).
 * U3.
 */
export declare function seasonRouteParam(group: SeasonGroup): string;
/**
 * Find the season group matching a route `:season` param. `0` (or a non-numeric
 * value) maps to the Specials bucket (seasonNumber null); any positive integer
 * matches that season. Returns null when no such season exists. U3.
 */
export declare function findSeasonByParam(groups: SeasonGroup[], seasonParam: string | number | null | undefined): SeasonGroup | null;
