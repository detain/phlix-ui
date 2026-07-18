/**
 * Hub media-request types (D-HUB-1).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** Raw hub request shape returned by `GET /api/v1/me/requests` (snake_case ISO dates). */
export interface HubRequest {
    id: string;
    user_id: string;
    type: 'movie' | 'series';
    tmdb_id: number;
    title: string;
    poster_url: string | null;
    season: number | null;
    episode: number | null;
    status: 'pending' | 'approved' | 'available' | 'rejected';
    rejection_reason: string | null;
    created_at: string;
    updated_at: string;
}
/** Normalized display type used internally by the page component. */
export interface Request {
    id: string;
    type: 'movie' | 'series';
    tmdbId: number;
    title: string;
    posterUrl: string | null;
    season: number | null;
    episode: number | null;
    status: 'pending' | 'approved' | 'available' | 'rejected';
    rejectionReason: string | null;
    createdAt: string;
    updatedAt: string;
}
/** Body sent to `POST /api/v1/me/requests`. */
export interface CreateRequestInput {
    type: 'movie' | 'series';
    tmdb_id: number;
    title: string;
    poster_url?: string;
    season?: number;
    episode?: number;
}
/** Envelope returned by `POST /api/v1/me/requests`. */
export interface CreateRequestResponse {
    request: HubRequest;
    message: string;
}
