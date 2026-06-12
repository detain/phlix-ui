/** Re-exported so `import { ApiError } from '.../api/client'` deep imports keep working. */
export { ApiError } from './errors';
export interface AuthUser {
    id: string;
    email?: string;
    username?: string;
    name?: string;
    is_admin?: boolean;
    [key: string]: unknown;
}
export interface TokenStore {
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getRefreshToken(): string | null;
    setRefreshToken(token: string): void;
    getUser(): unknown | null;
    setUser(user: unknown): void;
    clear(): void;
}
export interface ApiClientOptions {
    baseUrl?: string;
    tokenStore?: TokenStore;
    fetchImpl?: typeof fetch;
    /** Per-request timeout in ms before aborting with a `TimeoutError` (default 15000). */
    timeoutMs?: number;
}
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
    private readonly baseUrl;
    private readonly tokens;
    private readonly doFetch;
    private readonly timeoutMs;
    constructor(options?: ApiClientOptions);
    request<T = unknown>(method: string, endpoint: string, data?: unknown, signal?: AbortSignal): Promise<T>;
    private handleResponse;
    private extractError;
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
