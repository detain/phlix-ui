/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from '../api/client';
import { buildMediaUrl } from '../api/media-query';
import type { MediaItem } from '../types/media-item';
import {
    groupEpisodesBySeason,
    hasSeasonRows,
    type SeasonGroup,
} from '../components/series-grouping';

/**
 * useSeriesSeasons (U3) — the shared "fetch a series' children and group them
 * into seasons" routine used by both the series detail page (the season grid)
 * and the per-season page (filter to one season). Factored out of
 * MediaDetailPage so the two pages share ONE fetch+group implementation rather
 * than duplicating the season-row flattening logic.
 *
 * Given a series id it fetches the direct children
 * (`GET /api/v1/media?parentId=<id>`); when the server models seasons as their
 * own `type: 'season'` rows it fetches each season's episodes and flattens them,
 * then groups by season number — passing the original season container rows
 * through so each {@link SeasonGroup} carries the season poster/overview.
 */
export interface MediaListResponse {
    items: MediaItem[];
    total: number;
}

const CHILDREN_LIMIT = 100; // the browse API caps at 100 per page

/** Fetch one parent's direct children (a single browse page). */
export async function fetchChildren(
    client: ApiClient,
    apiBase: string,
    parentId: string,
    signal?: AbortSignal,
): Promise<MediaItem[]> {
    const url = buildMediaUrl(apiBase, { parentId, limit: CHILDREN_LIMIT, sort: 'name', order: 'asc' });
    const res = await client.get<MediaListResponse>(url, undefined, signal);
    return res.items ?? [];
}

/**
 * Fetch a series' children and group them into ordered seasons. When the server
 * uses `type: 'season'` container rows it fetches each season's episodes and
 * flattens them, retaining the container rows so the groups carry season
 * metadata (poster/overview). Returns the grouped seasons (possibly empty).
 */
export async function loadSeriesSeasons(
    client: ApiClient,
    apiBase: string,
    seriesId: string,
    signal?: AbortSignal,
): Promise<SeasonGroup[]> {
    let children = await fetchChildren(client, apiBase, seriesId, signal);
    let seasonRows: MediaItem[] | undefined;
    if (hasSeasonRows(children)) {
        seasonRows = children.filter((c) => c.type === 'season');
        const lists = await Promise.all(
            seasonRows.map((s) => fetchChildren(client, apiBase, s.id, signal).catch(() => [] as MediaItem[])),
        );
        const directEpisodes = children.filter((c) => c.type !== 'season');
        children = [...directEpisodes, ...lists.flat()];
    }
    return groupEpisodesBySeason(children, seasonRows);
}
