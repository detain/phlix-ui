/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type TokenStore } from './tokenStore';
import type { MediaItem, PosterCandidatesResponse } from '../types/media-item';
/** Re-exported so `import { ApiError } from '.../api/client'` deep imports keep working. */
export { ApiError } from './errors';
/** Re-exported so `import type { TokenStore } from '.../api/client'` deep imports keep working. */
export type { TokenStore } from './tokenStore';
export interface AuthUser {
    id: string;
    email?: string;
    username?: string;
    name?: string;
    is_admin?: boolean;
    avatar_url?: string | null;
    [key: string]: unknown;
}
export interface ApiClientOptions {
    baseUrl?: string;
    tokenStore?: TokenStore;
    fetchImpl?: typeof fetch;
    /** Per-request timeout in ms before aborting with a `TimeoutError` (default 15000). */
    timeoutMs?: number;
    /** Extra headers merged into every request from THIS instance (e.g. native-device
     *  identity headers). `Content-Type`/`Authorization` always win; a falsy/empty
     *  value is omitted rather than sent as an empty header. */
    headers?: Record<string, string>;
    /**
     * Path (relative or absolute) the {@link ApiClient.logout} redirect target is
     * prepended with. Defaults to `'/login'`. On the hub where the SPA lives under
     * `/app` this would be set to `'/app/login'` so a logout redirect does not 404.
     */
    loginPath?: string;
}
/**
 * Set the headers merged into EVERY `ApiClient` request (e.g. native-device
 * identity). Replaces any previously-set defaults. Falsy/empty values are
 * dropped. Call once early at app boot, before any client is constructed.
 */
export declare function setDefaultApiHeaders(headers: Record<string, string>): void;
/** The current default headers (a copy; mainly for tests/debug). */
export declare function getDefaultApiHeaders(): Record<string, string>;
export declare function normalizeBool(value: unknown): boolean;
/** TMDB match type — series/season/episode resolve as `tv`, everything else `movie`. */
export type MatchType = 'tv' | 'movie';
/**
 * One TMDB search candidate as shaped by the server's interactive match API
 * (S5: `GET /api/v1/media/{id}/match/search`). The server caps the list at 20
 * and drops entries with no usable `tmdb_id`. `year` is parsed from the TMDB
 * release/first-air date (null when absent); the image URLs are absolute (w500)
 * or null. Exported from the package index so consumers can type the candidate.
 */
export interface MatchCandidate {
    tmdb_id: number | string;
    type: MatchType;
    title: string;
    year: number | null;
    overview: string | null;
    poster_url: string | null;
    backdrop_url: string | null;
    vote_average?: number;
    [key: string]: unknown;
}
/** Context block attached to each match candidate when the server has metadata. */
export interface MatchContext {
    original_filename?: string | null;
    path?: string | null;
    parsed_title?: string | null;
    year?: number | null;
    tags?: Record<string, unknown>;
}
/** Envelope returned by {@link ApiClient.matchSearch}. */
export interface MatchSearchResult {
    results: MatchCandidate[];
    /** The effective query the server searched (the resolved/echoed term). */
    query: string;
    /** The effective TMDB type the server searched. */
    type: MatchType;
    context?: MatchContext;
}
/** Optional manual overrides for {@link ApiClient.matchSearch}. */
export interface MatchSearchParams {
    /** Search term; the server derives it from the item's title when omitted. */
    query?: string;
    /** Release/first-air year filter; derived from the item when omitted. */
    year?: number | string;
    /** Force `tv`/`movie`; the server derives it from the item type when omitted. */
    type?: MatchType;
}
/** Body for {@link ApiClient.matchApply}. */
export interface MatchApplyInput {
    tmdb_id: number | string;
    type?: MatchType;
}
/** Envelope returned by {@link ApiClient.matchApply} — the re-shaped item + a summary. */
export interface MatchApplyResult<TItem = unknown> {
    /** The freshly re-shaped media item (so the UI can refresh the card/detail). */
    item: TItem;
    applied: {
        item_id: string;
        mode: MatchType;
        tmdb_id: number | string;
        matched: boolean;
        children_enriched: number;
        [key: string]: unknown;
    };
}
/**
 * Envelope returned by {@link ApiClient.listFavorites}
 * (`GET /api/v1/users/me/favorites`). Mirrors the server's paginated list shape:
 * fully shaped media items (each carrying its add-only `user_data` block), plus
 * the effective `limit`/`offset` the server applied. `total` is NOT sent by this
 * endpoint (unlike the browse list) so it is intentionally absent here.
 */
export interface FavoritesResult {
    items: MediaItem[];
    limit: number;
    offset: number;
}
/** The server error `code` returned (422) when no TMDB API key is configured. */
export declare const TMDB_UNCONFIGURED_CODE = "metadata.tmdb_unconfigured";
/**
 * True when a thrown error is the server's `422 metadata.tmdb_unconfigured`
 * response (no TMDB key) — lets the UI show a "configure TMDB" message instead
 * of a generic failure. Reads the parsed `code` off the {@link ApiError} body.
 */
export declare function isTmdbUnconfigured(e: unknown): boolean;
export declare class ApiClient {
    private baseUrl;
    private readonly tokens;
    private readonly doFetch;
    private readonly timeoutMs;
    private readonly instanceHeaders;
    private readonly loginPath;
    /**
     * In-flight token refresh, single-flighted per `ApiClient` instance. When an
     * access token expires, every concurrent request gets a 401 and calls
     * {@link refreshToken} at once; without coordination each would POST
     * `/api/v1/auth/refresh` with the same refresh token. The hub rotates
     * refresh tokens one-time-use, so the second+ POST presents an
     * already-consumed token, fails, and spuriously logs the user out
     * mid-session. Memoising the promise (cleared in `.finally()`) makes the N
     * callers await the SAME refresh — exactly one POST, one rotation.
     */
    private refreshPromise;
    constructor(options?: ApiClientOptions);
    /**
     * Re-point this client at a different API base after construction. Lets a
     * long-lived client (e.g. the one held by `useAuthStore`) follow a runtime
     * connection change — the native Connect screen sets the base AFTER the store
     * has already created its client, and consumers hold that same instance, so
     * mutating it in place keeps every reference valid rather than swapping it.
     */
    setBaseUrl(baseUrl: string): void;
    request<T = unknown>(method: string, endpoint: string, data?: unknown, signal?: AbortSignal): Promise<T>;
    private handleResponse;
    private extractError;
    /**
     * Refresh the access token, single-flighted per instance. Concurrent callers
     * (e.g. several requests that all hit a 401 at once) share ONE in-flight
     * refresh rather than each POSTing `/api/v1/auth/refresh` — see
     * {@link refreshPromise}. The promise is cleared in `.finally()` so a later
     * expiry starts a fresh refresh. Returns `true` on success / `false` on any
     * failure (no refresh token, non-2xx, network error, missing access_token).
     */
    refreshToken(): Promise<boolean>;
    get<T = unknown>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T>;
    post<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    put<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    patch<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
    delete<T = unknown>(endpoint: string): Promise<T>;
    /**
     * Interactive per-item metadata match — search TMDB candidates for one item
     * (S5: `GET /api/v1/media/{id}/match/search`). All params are optional; the
     * server derives the query/year/type from the item itself when omitted. The
     * envelope (`{ results, query, type }`) is returned verbatim, with `results`
     * defended to an array so a malformed payload degrades to empty rather than
     * throwing on `.map`. A `422 metadata.tmdb_unconfigured` surfaces as an
     * `ApiError` the caller can detect with {@link isTmdbUnconfigured}.
     */
    matchSearch(id: string, params?: MatchSearchParams, signal?: AbortSignal): Promise<MatchSearchResult>;
    /**
     * Apply a chosen TMDB match to one item (S5:
     * `POST /api/v1/media/{id}/match/apply`). `type` defaults to the
     * item-derived mode server-side. Returns the re-shaped `{ item, applied }`
     * so the caller can refresh the card/detail in place. Non-2xx (400 bad
     * input, 404, 422 unconfigured/no-match, 502 TMDB unreachable) throw the
     * shared `ApiError`.
     */
    matchApply<TItem = unknown>(id: string, input: MatchApplyInput): Promise<MatchApplyResult<TItem>>;
    /**
     * Mark a media item as a favorite for the authenticated user
     * (`POST /api/v1/media/{id}/favorite`). The backend persists the favorite
     * flag and returns a flat `{ message }`, which we surface verbatim. Non-2xx
     * (401 unauth, 404 unknown id) throw the shared {@link ApiError}.
     */
    addFavorite(id: string): Promise<{
        message: string;
    }>;
    /**
     * Remove a media item from the authenticated user's favorites
     * (`DELETE /api/v1/media/{id}/favorite`). Returns the server's flat
     * `{ message }`. Non-2xx (401, 404) throw the shared {@link ApiError}.
     */
    removeFavorite(id: string): Promise<{
        message: string;
    }>;
    /**
     * Mark a media item as watched for the authenticated user
     * (`POST /api/v1/media/{id}/watched`). Stub — server endpoint is Step 11.6.
     * The server returns a flat `{ message }`. Non-2xx throw the shared
     * {@link ApiError}.
     */
    markWatched(id: string): Promise<{
        message: string;
    }>;
    /**
     * Mark a media item as unwatched (clear watched state) for the authenticated
     * user (`POST /api/v1/media/{id}/unwatched`). Stub — server endpoint is
     * Step 11.6. The server returns a flat `{ message }`. Non-2xx throw the
     * shared {@link ApiError}.
     */
    markUnwatched(id: string): Promise<{
        message: string;
    }>;
    /**
     * Delete a media item (`DELETE /api/v1/media/{id}`). Admin-only (server
     * enforces). Returns the deleted item id on success. Non-2xx throw the
     * shared {@link ApiError}.
     */
    deleteMediaItem(id: string): Promise<{
        id: string;
    }>;
    /**
     * Set (or clear) the authenticated user's personal 1-10 rating for a media
     * item (`PUT /api/v1/media/{id}/rating`, body `{ rating }`). Pass `null` to
     * clear the rating. The server returns a flat `{ message }`. A non-integer /
     * out-of-range rating is a 400 → shared {@link ApiError}; 401/404 likewise.
     */
    setRating(id: string, rating: number | null): Promise<{
        message: string;
    }>;
    /**
     * Set the authenticated user's thumbs rating for a media item
     * (`PUT /api/v1/media/{id}/like`, body `{ level }`). `level` is the −2..2
     * thumbs axis (−2 strongly dislike … 0 not set … 2 love), a SEPARATE axis
     * from `rating`/`favorite`. The server returns a flat `{ message }`. A
     * non-integer / out-of-range level is a 400 → shared {@link ApiError};
     * 401/404 likewise.
     */
    setLikeLevel(id: string, level: number): Promise<{
        message: string;
    }>;
    /**
     * List the authenticated user's favorited media items, most-recently
     * favorited first (`GET /api/v1/users/me/favorites`). Each returned item is a
     * fully shaped {@link MediaItem} carrying its add-only `user_data` block.
     * `limit` (default server-side 50, clamped 1-100) and `offset` (default 0)
     * mirror the browse list endpoint. The `{ items, limit, offset }` envelope is
     * returned verbatim, with `items` defended to an array so a malformed payload
     * degrades to empty rather than throwing downstream.
     */
    listFavorites(params?: {
        limit?: number;
        offset?: number;
    }, signal?: AbortSignal): Promise<FavoritesResult>;
    /**
     * List available poster candidates for one media item
     * (`GET /api/v1/media/{id}/posters`). Returns `{ candidates, current_poster_url }`
     * with `candidates` defended to an array so a malformed payload degrades
     * gracefully. A `422 metadata.tmdb_unconfigured` surfaces as an `ApiError`
     * the caller can detect with {@link isTmdbUnconfigured}.
     */
    listPosters(id: string, signal?: AbortSignal): Promise<PosterCandidatesResponse>;
    /**
     * Set (or clear) the poster for one media item
     * (`PUT /api/v1/media/{id}/poster`, body `{ poster_url }`). Pass an empty
     * string to clear the poster. Returns the updated {@link MediaItem}. A
     * `422 metadata.tmdb_unconfigured` surfaces as an `ApiError` the caller
     * can detect with {@link isTmdbUnconfigured}.
     */
    setPoster(id: string, posterUrl: string): Promise<MediaItem>;
    /**
     * POST multipart/form-data to an endpoint. Used for file uploads like avatar
     * images. The Content-Type header is deliberately omitted so the browser
     * sets `Content-Type: multipart/form-data; boundary=...` with the correct
     * boundary automatically.
     */
    postFormData(endpoint: string, body: FormData): Promise<unknown>;
    /**
     * Upload the authenticated user's avatar image (`POST /api/v1/users/me/avatar`).
     * The server returns `{ avatar_url }`. Non-2xx throws the shared {@link ApiError}.
     */
    uploadAvatar(file: File): Promise<{
        avatar_url: string;
    }>;
    /**
     * Delete the authenticated user's avatar (`DELETE /api/v1/users/me/avatar`).
     * Non-2xx throws the shared {@link ApiError}.
     */
    deleteAvatar(): Promise<void>;
    isLoggedIn(): boolean;
    getCurrentUser(): Promise<AuthUser>;
    /**
     * Search for media items with markers near a specific playhead position (P3B-S8).
     *
     * Calls `GET /api/v1/media/search/by-marker?type={type}&around={around}&position={position}&limit={limit}`.</a>
     * Returns media items that have a marker of the specified type within $around seconds
     * of the given position, excluding already-watched items.
     *
     * @param type       Marker type: 'intro' | 'outro' | 'credits' | 'ad'
     * @param positionMs Current playhead position in milliseconds
     * @param aroundSec  Search window in seconds (default: 30)
     * @param limit      Maximum results (default: 20)
     */
    searchByMarker(type: 'intro' | 'outro' | 'credits' | 'ad', positionMs: number, aroundSec?: number, limit?: number): Promise<{
        items: MediaItem[];
        marker_type: string;
        around: number;
        position: number;
    }>;
    logout(redirect?: boolean): void;
}
export declare const api: ApiClient;
