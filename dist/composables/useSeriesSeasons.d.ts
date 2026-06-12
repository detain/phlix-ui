import { ApiClient } from '../api/client';
import type { MediaItem } from '../types/media-item';
import { type SeasonGroup } from '../components/series-grouping';
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
/** Fetch one parent's direct children (a single browse page). */
export declare function fetchChildren(client: ApiClient, apiBase: string, parentId: string, signal?: AbortSignal): Promise<MediaItem[]>;
/**
 * Fetch a series' children and group them into ordered seasons. When the server
 * uses `type: 'season'` container rows it fetches each season's episodes and
 * flattens them, retaining the container rows so the groups carry season
 * metadata (poster/overview). Returns the grouped seasons (possibly empty).
 */
export declare function loadSeriesSeasons(client: ApiClient, apiBase: string, seriesId: string, signal?: AbortSignal): Promise<SeasonGroup[]>;
