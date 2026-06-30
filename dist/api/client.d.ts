import { type TokenStore } from './tokenStore';
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
/** Envelope returned by {@link ApiClient.matchSearch}. */
export interface MatchSearchResult {
    results: MatchCandidate[];
    /** The effective query the server searched (the resolved/echoed term). */
    query: string;
    /** The effective TMDB type the server searched. */
    type: MatchType;
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
    isLoggedIn(): boolean;
    getCurrentUser(): Promise<AuthUser>;
    logout(redirect?: boolean): void;
}
export declare const api: ApiClient;
