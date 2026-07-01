import { ApiError, NetworkError, TimeoutError, isOffline } from './errors';
import { LocalStorageTokenStore, type TokenStore } from './tokenStore';
import type { MediaItem, PosterCandidatesResponse } from '../types/media-item';

/** Re-exported so `import { ApiError } from '.../api/client'` deep imports keep working. */
export { ApiError } from './errors';

/** Re-exported so `import type { TokenStore } from '.../api/client'` deep imports keep working. */
export type { TokenStore } from './tokenStore';

/**
 * Default token store: persist + read the session token from `localStorage` in
 * the browser, and a no-op when there is no `window` (SSR / unit construction).
 *
 * Historically the default was a pure no-op, so any `ApiClient` created WITHOUT
 * an explicit `tokenStore` (the exported {@link api} singleton, the media store,
 * the hub's My-Servers / Federation pages, …) silently sent NO `Authorization`
 * header — which read as "unauthorized" against an authed endpoint and left the
 * media listing readable without a token. Defaulting to the real store makes
 * every client send the logged-in user's Bearer token unless one is overridden.
 */
function defaultTokenStore(): TokenStore {
    if (typeof window === 'undefined') {
        return {
            getAccessToken: () => null,
            setAccessToken: () => {},
            getRefreshToken: () => null,
            setRefreshToken: () => {},
            getUser: () => null,
            setUser: () => {},
            clear: () => {},
        };
    }
    return new LocalStorageTokenStore();
}

/** Default per-request timeout (ms) before the client aborts with a `TimeoutError`. */
const DEFAULT_TIMEOUT_MS = 15000;

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
 * Headers merged into EVERY {@link ApiClient} request, set once at app boot
 * (e.g. the native-client device headers `X-Phlix-Device-*` / `X-Phlix-Session-ID`).
 * Module-level so the ~30 `new ApiClient(...)` call sites need no change — every
 * client constructed AFTER {@link setDefaultApiHeaders} picks these up. Falsy/empty
 * values are dropped on set so a not-yet-known header (e.g. an empty session id)
 * never emits a broken empty header.
 */
let defaultHeaders: Record<string, string> = {};

/** Drop falsy/empty-string header values so they never emit a broken empty header. */
function pruneHeaders(headers: Record<string, string>): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
        if (value) {
            out[key] = value;
        }
    }
    return out;
}

/**
 * Set the headers merged into EVERY `ApiClient` request (e.g. native-device
 * identity). Replaces any previously-set defaults. Falsy/empty values are
 * dropped. Call once early at app boot, before any client is constructed.
 */
export function setDefaultApiHeaders(headers: Record<string, string>): void {
    defaultHeaders = pruneHeaders(headers);
}

/** The current default headers (a copy; mainly for tests/debug). */
export function getDefaultApiHeaders(): Record<string, string> {
    return { ...defaultHeaders };
}

export function normalizeBool(value: unknown): boolean {
    return value === true || value === 1 || value === '1' || value === 'true';
}

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
export const TMDB_UNCONFIGURED_CODE = 'metadata.tmdb_unconfigured';

/**
 * True when a thrown error is the server's `422 metadata.tmdb_unconfigured`
 * response (no TMDB key) — lets the UI show a "configure TMDB" message instead
 * of a generic failure. Reads the parsed `code` off the {@link ApiError} body.
 */
export function isTmdbUnconfigured(e: unknown): boolean {
    if (!(e instanceof ApiError) || e.status !== 422) return false;
    const body = e.body;
    return (
        typeof body === 'object' &&
        body !== null &&
        (body as { code?: unknown }).code === TMDB_UNCONFIGURED_CODE
    );
}

export class ApiClient {
    private baseUrl: string;
    private readonly tokens: TokenStore;
    private readonly doFetch: typeof fetch;
    private readonly timeoutMs: number;
    private readonly instanceHeaders: Record<string, string>;
    private readonly loginPath: string;
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
    private refreshPromise: Promise<boolean> | null = null;

    constructor(options: ApiClientOptions = {}) {
        this.baseUrl = options.baseUrl ?? (typeof window !== 'undefined' ? window.location.origin : '');
        this.tokens = options.tokenStore ?? defaultTokenStore();
        this.doFetch = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
        this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
        this.instanceHeaders = pruneHeaders(options.headers ?? {});
        this.loginPath = options.loginPath ?? '/login';
    }

    /**
     * Re-point this client at a different API base after construction. Lets a
     * long-lived client (e.g. the one held by `useAuthStore`) follow a runtime
     * connection change — the native Connect screen sets the base AFTER the store
     * has already created its client, and consumers hold that same instance, so
     * mutating it in place keeps every reference valid rather than swapping it.
     */
    setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
    }

    async request<T = unknown>(
        method: string,
        endpoint: string,
        data: unknown = null,
        signal?: AbortSignal,
    ): Promise<T> {
        const build = (effectiveSignal: AbortSignal): RequestInit => {
            // Merge order: module defaults (device headers) < this instance's
            // headers < the fixed Content-Type — so Content-Type/Authorization
            // always win and a consumer header can never clobber them. `defaultHeaders`
            // and `instanceHeaders` are pre-pruned of falsy/empty values.
            const headers: Record<string, string> = {
                ...defaultHeaders,
                ...this.instanceHeaders,
                'Content-Type': 'application/json',
            };
            const token = this.tokens.getAccessToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const init: RequestInit = {
                method,
                headers,
                credentials: 'same-origin',
                signal: effectiveSignal,
            };
            if (data !== null && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
                init.body = JSON.stringify(data);
            }
            return init;
        };

        // Resolve the request URL against the configured base. Guard against a
        // double-prepend: several media helpers (`buildMediaUrl`) bake the base
        // INTO the endpoint and are then fetched through a client whose `baseUrl`
        // is that same base. When `baseUrl` is '' (same-origin media server) the
        // extra prefix is empty and harmless, but on the hub `baseUrl` is the
        // relay-proxy path (`/api/v1/servers/{id}/proxy`), so prepending it again
        // produced `…/proxy/api/v1/servers/{id}/proxy/api/v1/media` → 404. If the
        // endpoint already starts with the (non-empty) base, treat it as resolved.
        const url =
            this.baseUrl !== '' && endpoint.startsWith(this.baseUrl)
                ? endpoint
                : `${this.baseUrl}${endpoint}`;

        // Drive every request through our own controller so we can enforce a
        // timeout AND honour a caller's abort signal (e.g. a superseded media
        // request). The timeout sets `timedOut` before aborting so we can tell
        // it apart from a caller-initiated cancellation.
        const controller = new AbortController();
        let timedOut = false;
        const timer = setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, this.timeoutMs);
        const onCallerAbort = (): void => controller.abort();
        if (signal) {
            if (signal.aborted) {
                controller.abort();
            } else {
                signal.addEventListener('abort', onCallerAbort, { once: true });
            }
        }

        try {
            let response = await this.doFetch(url, build(controller.signal));

            if (response.status === 401) {
                const refreshed = await this.refreshToken();
                if (refreshed) {
                    response = await this.doFetch(url, build(controller.signal));
                }
            }

            return await this.handleResponse<T>(response);
        } catch (e) {
            if (timedOut) {
                throw new TimeoutError();
            }
            // A caller-initiated cancellation must stay an AbortError so the
            // store's supersede logic still recognises it.
            if (signal?.aborted) {
                throw e;
            }
            if (e instanceof ApiError) {
                throw e;
            }
            // fetch() rejects with a TypeError on a network failure (DNS,
            // connection refused, offline) — surface it as a friendly NetworkError.
            if (e instanceof TypeError || isOffline()) {
                throw new NetworkError();
            }
            throw e;
        } finally {
            clearTimeout(timer);
            if (signal) {
                signal.removeEventListener('abort', onCallerAbort);
            }
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('content-type') ?? '';
        const isJson = contentType.includes('application/json');
        const payload: unknown = isJson
            ? await response.json()
            : await response.text();

        if (!response.ok) {
            const message = this.extractError(payload);
            throw new ApiError(message, response.status, payload);
        }

        return payload as T;
    }

    private extractError(payload: unknown): string {
        if (payload && typeof payload === 'object') {
            const obj = payload as Record<string, unknown>;
            if (typeof obj['error'] === 'string') {
                return obj['error'];
            }
            if (typeof obj['message'] === 'string') {
                return obj['message'];
            }
        }
        return 'Request failed';
    }

    /**
     * Refresh the access token, single-flighted per instance. Concurrent callers
     * (e.g. several requests that all hit a 401 at once) share ONE in-flight
     * refresh rather than each POSTing `/api/v1/auth/refresh` — see
     * {@link refreshPromise}. The promise is cleared in `.finally()` so a later
     * expiry starts a fresh refresh. Returns `true` on success / `false` on any
     * failure (no refresh token, non-2xx, network error, missing access_token).
     */
    async refreshToken(): Promise<boolean> {
        if (this.refreshPromise !== null) {
            return this.refreshPromise;
        }
        this.refreshPromise = (async (): Promise<boolean> => {
            const refreshToken = this.tokens.getRefreshToken();
            if (!refreshToken) {
                return false;
            }
            try {
                const response = await this.doFetch(`${this.baseUrl}/api/v1/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify({ refresh_token: refreshToken }),
                });
                if (!response.ok) {
                    return false;
                }
                const data = (await response.json()) as {
                    access_token?: string;
                    refresh_token?: string;
                };
                if (typeof data.access_token !== 'string') {
                    return false;
                }
                this.tokens.setAccessToken(data.access_token);
                if (typeof data.refresh_token === 'string') {
                    this.tokens.setRefreshToken(data.refresh_token);
                }
                return true;
            } catch {
                return false;
            }
        })().finally(() => {
            this.refreshPromise = null;
        });
        return this.refreshPromise;
    }

    async get<T = unknown>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T> {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request<T>('GET', endpoint + query, null, signal);
    }

    async post<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>('POST', endpoint, data ?? null);
    }

    async put<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>('PUT', endpoint, data ?? null);
    }

    async patch<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>('PATCH', endpoint, data ?? null);
    }

    async delete<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>('DELETE', endpoint);
    }

    /**
     * Interactive per-item metadata match — search TMDB candidates for one item
     * (S5: `GET /api/v1/media/{id}/match/search`). All params are optional; the
     * server derives the query/year/type from the item itself when omitted. The
     * envelope (`{ results, query, type }`) is returned verbatim, with `results`
     * defended to an array so a malformed payload degrades to empty rather than
     * throwing on `.map`. A `422 metadata.tmdb_unconfigured` surfaces as an
     * `ApiError` the caller can detect with {@link isTmdbUnconfigured}.
     */
    async matchSearch(
        id: string,
        params: MatchSearchParams = {},
        signal?: AbortSignal,
    ): Promise<MatchSearchResult> {
        const query: Record<string, string> = {};
        if (params.query !== undefined && params.query !== '') query['query'] = params.query;
        if (params.year !== undefined && params.year !== '') query['year'] = String(params.year);
        if (params.type !== undefined) query['type'] = params.type;
        const res = await this.get<Partial<MatchSearchResult>>(
            `/api/v1/media/${encodeURIComponent(id)}/match/search`,
            Object.keys(query).length ? query : undefined,
            signal,
        );
        return {
            results: Array.isArray(res.results) ? res.results : [],
            query: typeof res.query === 'string' ? res.query : (params.query ?? ''),
            type: res.type === 'tv' || res.type === 'movie' ? res.type : (params.type ?? 'movie'),
            context: res.context,
        };
    }

    /**
     * Apply a chosen TMDB match to one item (S5:
     * `POST /api/v1/media/{id}/match/apply`). `type` defaults to the
     * item-derived mode server-side. Returns the re-shaped `{ item, applied }`
     * so the caller can refresh the card/detail in place. Non-2xx (400 bad
     * input, 404, 422 unconfigured/no-match, 502 TMDB unreachable) throw the
     * shared `ApiError`.
     */
    matchApply<TItem = unknown>(id: string, input: MatchApplyInput): Promise<MatchApplyResult<TItem>> {
        return this.post<MatchApplyResult<TItem>>(
            `/api/v1/media/${encodeURIComponent(id)}/match/apply`,
            input,
        );
    }

    /**
     * Mark a media item as a favorite for the authenticated user
     * (`POST /api/v1/media/{id}/favorite`). The backend persists the favorite
     * flag and returns a flat `{ message }`, which we surface verbatim. Non-2xx
     * (401 unauth, 404 unknown id) throw the shared {@link ApiError}.
     */
    addFavorite(id: string): Promise<{ message: string }> {
        return this.post<{ message: string }>(`/api/v1/media/${encodeURIComponent(id)}/favorite`);
    }

    /**
     * Remove a media item from the authenticated user's favorites
     * (`DELETE /api/v1/media/{id}/favorite`). Returns the server's flat
     * `{ message }`. Non-2xx (401, 404) throw the shared {@link ApiError}.
     */
     removeFavorite(id: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/api/v1/media/${encodeURIComponent(id)}/favorite`);
    }

    /**
     * Mark a media item as watched for the authenticated user
     * (`POST /api/v1/media/{id}/watched`). Stub — server endpoint is Step 11.6.
     * The server returns a flat `{ message }`. Non-2xx throw the shared
     * {@link ApiError}.
     */
    markWatched(id: string): Promise<{ message: string }> {
        return this.post<{ message: string }>(`/api/v1/media/${encodeURIComponent(id)}/watched`);
    }

    /**
     * Mark a media item as unwatched (clear watched state) for the authenticated
     * user (`POST /api/v1/media/{id}/unwatched`). Stub — server endpoint is
     * Step 11.6. The server returns a flat `{ message }`. Non-2xx throw the
     * shared {@link ApiError}.
     */
    markUnwatched(id: string): Promise<{ message: string }> {
        return this.post<{ message: string }>(`/api/v1/media/${encodeURIComponent(id)}/unwatched`);
    }

    /**
     * Delete a media item (`DELETE /api/v1/media/{id}`). Admin-only (server
     * enforces). Returns the deleted item id on success. Non-2xx throw the
     * shared {@link ApiError}.
     */
    deleteMediaItem(id: string): Promise<{ id: string }> {
        return this.delete<{ id: string }>(`/api/v1/media/${encodeURIComponent(id)}`);
    }

    /**
     * Set (or clear) the authenticated user's personal 1-10 rating for a media
     * item (`PUT /api/v1/media/{id}/rating`, body `{ rating }`). Pass `null` to
     * clear the rating. The server returns a flat `{ message }`. A non-integer /
     * out-of-range rating is a 400 → shared {@link ApiError}; 401/404 likewise.
     */
    setRating(id: string, rating: number | null): Promise<{ message: string }> {
        return this.put<{ message: string }>(
            `/api/v1/media/${encodeURIComponent(id)}/rating`,
            { rating },
        );
    }

    /**
     * Set the authenticated user's multi-level "love" level for a media item
     * (`PUT /api/v1/media/{id}/like`, body `{ level }`). `level` is the 0-3 Love
     * axis (0 = not loved … 3 = most), a SEPARATE axis from `rating`/`favorite`.
     * The server returns a flat `{ message }`. A non-integer / out-of-range level
     * is a 400 → shared {@link ApiError}; 401/404 likewise.
     */
    setLikeLevel(id: string, level: number): Promise<{ message: string }> {
        return this.put<{ message: string }>(
            `/api/v1/media/${encodeURIComponent(id)}/like`,
            { level },
        );
    }

    /**
     * List the authenticated user's favorited media items, most-recently
     * favorited first (`GET /api/v1/users/me/favorites`). Each returned item is a
     * fully shaped {@link MediaItem} carrying its add-only `user_data` block.
     * `limit` (default server-side 50, clamped 1-100) and `offset` (default 0)
     * mirror the browse list endpoint. The `{ items, limit, offset }` envelope is
     * returned verbatim, with `items` defended to an array so a malformed payload
     * degrades to empty rather than throwing downstream.
     */
    async listFavorites(
        params: { limit?: number; offset?: number } = {},
        signal?: AbortSignal,
    ): Promise<FavoritesResult> {
        const query: Record<string, string> = {};
        if (params.limit !== undefined) query['limit'] = String(params.limit);
        if (params.offset !== undefined) query['offset'] = String(params.offset);
        const res = await this.get<Partial<FavoritesResult>>(
            '/api/v1/users/me/favorites',
            Object.keys(query).length ? query : undefined,
            signal,
        );
        return {
            items: Array.isArray(res.items) ? res.items : [],
            limit: typeof res.limit === 'number' ? res.limit : (params.limit ?? 50),
            offset: typeof res.offset === 'number' ? res.offset : (params.offset ?? 0),
        };
    }

    /**
     * List available poster candidates for one media item
     * (`GET /api/v1/media/{id}/posters`). Returns `{ candidates, current_poster_url }`
     * with `candidates` defended to an array so a malformed payload degrades
     * gracefully. A `422 metadata.tmdb_unconfigured` surfaces as an `ApiError`
     * the caller can detect with {@link isTmdbUnconfigured}.
     */
    async listPosters(id: string, signal?: AbortSignal): Promise<PosterCandidatesResponse> {
        const res = await this.get<Partial<PosterCandidatesResponse>>(
            `/api/v1/media/${encodeURIComponent(id)}/posters`,
            undefined,
            signal,
        );
        return {
            candidates: Array.isArray(res.candidates) ? res.candidates : [],
            current_poster_url:
                typeof res.current_poster_url === 'string' ? res.current_poster_url : null,
        };
    }

    /**
     * Set (or clear) the poster for one media item
     * (`PUT /api/v1/media/{id}/poster`, body `{ poster_url }`). Pass an empty
     * string to clear the poster. Returns the updated {@link MediaItem}. A
     * `422 metadata.tmdb_unconfigured` surfaces as an `ApiError` the caller
     * can detect with {@link isTmdbUnconfigured}.
     */
    setPoster(id: string, posterUrl: string): Promise<MediaItem> {
        return this.put<MediaItem>(`/api/v1/media/${encodeURIComponent(id)}/poster`, {
            poster_url: posterUrl,
        });
    }

    /**
     * POST multipart/form-data to an endpoint. Used for file uploads like avatar
     * images. The Content-Type header is deliberately omitted so the browser
     * sets `Content-Type: multipart/form-data; boundary=...` with the correct
     * boundary automatically.
     */
    async postFormData(endpoint: string, body: FormData): Promise<unknown> {
        const headers: Record<string, string> = {
            ...defaultHeaders,
            ...this.instanceHeaders,
        };
        const token = this.tokens.getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        // NOTE: NOT setting Content-Type — browser must set it with boundary for multipart/form-data
        const response = await this.doFetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            credentials: 'same-origin',
            body,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }

    /**
     * Upload the authenticated user's avatar image (`POST /api/v1/users/me/avatar`).
     * The server returns `{ avatar_url }`. Non-2xx throws the shared {@link ApiError}.
     */
    async uploadAvatar(file: File): Promise<{ avatar_url: string }> {
        const formData = new FormData();
        formData.append('avatar', file);
        return this.postFormData('/api/v1/users/me/avatar', formData) as Promise<{ avatar_url: string }>;
    }

    /**
     * Delete the authenticated user's avatar (`DELETE /api/v1/users/me/avatar`).
     * Non-2xx throws the shared {@link ApiError}.
     */
    async deleteAvatar(): Promise<void> {
        const headers: Record<string, string> = {
            ...defaultHeaders,
            ...this.instanceHeaders,
        };
        const token = this.tokens.getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await this.doFetch(`${this.baseUrl}/api/v1/users/me/avatar`, {
            method: 'DELETE',
            headers,
            credentials: 'same-origin',
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
    }

    isLoggedIn(): boolean {
        return this.tokens.getAccessToken() !== null;
    }

    async getCurrentUser(): Promise<AuthUser> {
        const { user } = await this.get<{ user: Record<string, unknown> }>('/api/v1/auth/me');
        return { ...(user as AuthUser), is_admin: normalizeBool(user['is_admin']) };
    }

    logout(redirect = true): void {
        this.tokens.clear();
        if (redirect && typeof window !== 'undefined') {
            window.location.href = this.loginPath;
        }
    }
}

export const api = new ApiClient();
