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
}

/** True for the series/season container rows that group content but are not episodes. */
function isContainer(item: MediaItem): boolean {
    return item.type === 'series' || item.type === 'season';
}

/**
 * The episodes in a child list: explicitly-typed `episode` rows plus any item
 * carrying an `episode_number` (covers servers that leave `type` unset on parsed
 * episodes). Series/season container rows are never episodes.
 */
function episodesOf(items: MediaItem[]): MediaItem[] {
    return items.filter(
        (i) => !isContainer(i) && (i.type === 'episode' || (i.episode_number ?? null) !== null),
    );
}

/** The Specials bucket sentinel: season 0 or a missing/negative number → null. */
function seasonKeyOf(item: MediaItem): number | null {
    const n = item.season_number;
    return typeof n === 'number' && n > 0 ? n : null;
}

/** Order episodes by episode number (missing → last), then by title/name. */
function compareEpisodes(a: MediaItem, b: MediaItem): number {
    const na = typeof a.episode_number === 'number' ? a.episode_number : Number.POSITIVE_INFINITY;
    const nb = typeof b.episode_number === 'number' ? b.episode_number : Number.POSITIVE_INFINITY;
    if (na !== nb) return na - nb;
    return (a.episode_title ?? a.name).localeCompare(b.episode_title ?? b.name);
}

/**
 * Group a series' (already flattened) child list into ordered seasons. Real
 * seasons ascend by number; the Specials bucket (season 0 / missing) sorts last.
 * Non-episode rows (the series itself, season containers) are ignored.
 */
export function groupEpisodesBySeason(items: MediaItem[]): SeasonGroup[] {
    const buckets = new Map<number | null, MediaItem[]>();
    for (const ep of episodesOf(items)) {
        const key = seasonKeyOf(ep);
        const list = buckets.get(key);
        if (list) {
            list.push(ep);
        } else {
            buckets.set(key, [ep]);
        }
    }

    const groups: SeasonGroup[] = [];
    buckets.forEach((eps, seasonNumber) => {
        eps.sort(compareEpisodes);
        groups.push({
            key: seasonNumber === null ? 'specials' : `season-${seasonNumber}`,
            seasonNumber,
            label: seasonNumber === null ? 'Specials' : `Season ${seasonNumber}`,
            isSpecials: seasonNumber === null,
            episodes: eps,
        });
    });

    // Real seasons ascending by number; Specials always last.
    groups.sort((a, b) => {
        if (a.seasonNumber === null) return 1;
        if (b.seasonNumber === null) return -1;
        return a.seasonNumber - b.seasonNumber;
    });
    return groups;
}

/** Whether a child list contains any `type: 'season'` container rows. */
export function hasSeasonRows(items: MediaItem[]): boolean {
    return items.some((i) => i.type === 'season');
}

/** The first playable episode across all seasons in display order, or null. */
export function firstEpisode(groups: SeasonGroup[]): MediaItem | null {
    for (const g of groups) {
        if (g.episodes.length) return g.episodes[0];
    }
    return null;
}
