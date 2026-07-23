/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { ApiClient } from './client';
import type { MediaItem } from '../types/media-item';
/**
 * The viewer's personalized recommendations from the "because you watched"
 * engine (`GET /api/v1/me/recommendations`, P4-S2). This helper is shared by the
 * standalone RecommendationsPage and the Browse "Recommended" rail (S26) so the
 * fetch + `MediaItem` mapping live in one place rather than being duplicated —
 * NO backend change; both surfaces reuse the same existing endpoint.
 */
/** One recommendation as the because-you-watched engine returns it. */
export interface UserRecommendation {
    id: string;
    title: string;
    posterUrl: string | null;
    year: number | null;
    score: number;
    reason: 'because_you_watched';
    computedAt: string;
}
/**
 * Convert a {@link UserRecommendation} to a {@link MediaItem} so it can render in
 * the shared media components (MediaCard / MediaRow / MediaGrid). The engine only
 * returns identity + poster + year, so the remaining list-row fields degrade to
 * their empty defaults.
 */
export declare function recommendationToMediaItem(r: UserRecommendation): MediaItem;
/**
 * Fetch the viewer's recommendations from the existing
 * `GET /api/v1/me/recommendations` endpoint and map them to `MediaItem`s. Unwraps
 * the `{ recommendations }` envelope, defending a malformed payload to `[]` rather
 * than throwing downstream. Optionally honours an `AbortSignal`.
 */
export declare function fetchRecommendations(client: ApiClient, params?: {
    limit?: number;
}, signal?: AbortSignal): Promise<MediaItem[]>;
