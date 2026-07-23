/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { ApiClient } from './client';
import type { MediaItem } from '../types/media-item';
/**
 * The server-wide "Most Watched" trending rail (`GET /api/v1/media/most-watched`,
 * S31). This is a GLOBAL, all-time aggregate — the media items most-watched
 * across the WHOLE server (StatsCollector::getTopMedia), the SAME cross-user list
 * the admin Top Media report reads — NOT a per-user history. This helper keeps the
 * fetch + envelope-unwrap in one place for the Browse "Most Watched" rail (S32);
 * NO backend change — the endpoint already exists.
 *
 * Unlike the recommendations helper, the server shapes each row through
 * `MediaItemShaper::shape()` (exactly like `GET /api/v1/media`), so the items
 * arrive already in the `MediaItem` shape and need NO field remapping — only the
 * `{ items, total, limit, offset }` envelope is unwrapped.
 */
/**
 * Fetch the server-wide most-watched media from the existing
 * `GET /api/v1/media/most-watched` endpoint. The rows are already shaped as
 * `MediaItem`s server-side (poster / artwork signed URLs re-minted at response
 * time), so this just unwraps the `{ items }` envelope, defending a malformed
 * payload to `[]` rather than throwing downstream. Optionally honours an
 * `AbortSignal`.
 */
export declare function fetchMostWatched(client: ApiClient, params?: {
    limit?: number;
}, signal?: AbortSignal): Promise<MediaItem[]>;
