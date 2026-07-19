/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiError, NetworkError, TimeoutError, isOffline } from './errors';
import { LocalStorageTokenStore, type TokenStore } from './tokenStore';
import type { MediaItem, PosterCandidatesResponse } from '../types/media-item';
import type { MusicArtist, MusicAlbum, MusicTrack } from '../types/music';

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

/** Narrow an unknown to a trimmed string (numbers stringify), else null. */
function musicStr(value: unknown): string | null {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return String(value);
    }
    return null;
}

/** Narrow an unknown to a finite number (numeric strings parse), else null. */
function musicNum(value: unknown): number | null {
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return value;
    }
    if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) {
        return Number(value);
    }
    return null;
}

/**
 * Normalize one raw artist row from `GET /api/v1/music/artists` (snake_case,
 * grouped by artist name — the server has no artist PK, so the display `name`
 * doubles as the drill-down key/`mbid`) into the camelCase {@link MusicArtist}.
 */
function normalizeMusicArtist(raw: unknown): MusicArtist {
    const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
    const name = musicStr(r['name']) ?? 'Unknown Artist';
    const albumCount = musicNum(r['album_count']);
    return {
        id: name,
        name,
        imageUrl: musicStr(r['image_url']),
        albumCount: albumCount ?? undefined,
    };
}

/**
 * Normalize one raw track — accepts either the flat formatted shape from
 * `GET /api/v1/music/tracks` (`{ id, name, duration_secs, track_number }`) or a
 * raw scanner item embedded in an album (`{ id, metadata: { title, ... } }`).
 * Track ids are server UUID strings.
 */
function normalizeMusicTrack(raw: unknown): MusicTrack {
    const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
    const meta = (r['metadata'] && typeof r['metadata'] === 'object'
        ? r['metadata']
        : {}) as Record<string, unknown>;
    const title = musicStr(meta['title']) ?? musicStr(r['name']) ?? musicStr(r['title']) ?? 'Unknown Track';
    return {
        id: musicStr(r['id']) ?? '',
        title,
        durationSecs: musicNum(meta['duration_secs']) ?? musicNum(r['duration_secs']) ?? 0,
        trackNumber: musicNum(meta['track_number']) ?? musicNum(r['track_number']),
        // Signed direct-play URL from `formatTrack` (/tracks[/{id}]). Raw items
        // embedded in an album carry no `stream_url`, so this stays null there —
        // useMusicPlayer resolves it lazily via getTrack at play time.
        streamUrl: musicStr(r['stream_url']),
    };
}

/**
 * Normalize one raw album row from `GET /api/v1/music/albums` (snake_case,
 * grouped by album name with embedded raw track items) into the camelCase
 * {@link MusicAlbum}. The server groups by album `name` (no album PK), so `name`
 * doubles as the drill-down key/`mbid`; embedded `tracks` are normalized so the
 * album carries a ready track list (browse fast-path — no separate track fetch).
 */
function normalizeMusicAlbum(raw: unknown): MusicAlbum {
    const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
    const title = musicStr(r['name']) ?? musicStr(r['title']) ?? 'Unknown Album';
    const rawTracks = Array.isArray(r['tracks']) ? r['tracks'] : [];
    return {
        id: title,
        title,
        artist: musicStr(r['artist']),
        albumArtUrl: musicStr(r['album_art_url']),
        year: musicNum(r['year']),
        totalTracks: musicNum(r['track_count']) ?? rawTracks.length,
        tracks: rawTracks.map(normalizeMusicTrack),
    };
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
        // Empty-body success responses (204 No Content / 205 Reset Content) have
        // no JSON to parse — calling `response.json()` on them throws. Some
        // endpoints (e.g. certain DELETEs) return 204, so short-circuit here so
        // the caller's success path runs instead of surfacing a bogus parse error.
        if (response.status === 204 || response.status === 205) {
            return undefined as T;
        }
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

    async post<T = unknown>(endpoint: string, data?: unknown, signal?: AbortSignal): Promise<T> {
        return this.request<T>('POST', endpoint, data ?? null, signal);
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
     * (`POST /api/v1/media/{id}/watched`). The server returns a flat
     * `{ message }`. Non-2xx throw the shared {@link ApiError}.
     */
    markWatched(id: string): Promise<{ message: string }> {
        return this.post<{ message: string }>(`/api/v1/media/${encodeURIComponent(id)}/watched`);
    }

    /**
     * Mark a media item as unwatched (clear watched state) for the authenticated
     * user (`POST /api/v1/media/{id}/unwatched`). The server returns a flat
     * `{ message }`. Non-2xx throw the shared {@link ApiError}.
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
     * Set the authenticated user's thumbs rating for a media item
     * (`PUT /api/v1/media/{id}/like`, body `{ level }`). `level` is the −2..2
     * thumbs axis (−2 strongly dislike … 0 not set … 2 love), a SEPARATE axis
     * from `rating`/`favorite`. The server returns a flat `{ message }`. A
     * non-integer / out-of-range level is a 400 → shared {@link ApiError};
     * 401/404 likewise.
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
     * @param signal     Optional AbortSignal to cancel the request
     */
    async searchByMarker(
        type: 'intro' | 'outro' | 'credits' | 'ad',
        positionMs: number,
        aroundSec = 30,
        limit = 20,
        signal?: AbortSignal,
    ): Promise<{ items: MediaItem[]; marker_type: string; around: number; position: number }> {
        const params: Record<string, string> = {
            type,
            position: String(positionMs),
            around: String(aroundSec),
            limit: String(limit),
        };
        return this.get('/api/v1/media/search/by-marker', params, signal);
    }

    /**
     * Get trickplay (sprite preview) data for a media item.
     *
     * Calls `GET /api/v1/media/{id}/trickplay`. Returns the sprite sheet URL and
     * timeline mapping for thumbnail previews during scrubbing.
     *
     * @param id Media item ID
     * @param signal Optional AbortSignal to cancel the request
     */
    async getTrickplay(id: string, signal?: AbortSignal): Promise<{
        sprite_url: string | null;
        timeline: Array<{ seconds: number; frame: number }>;
    }> {
        return this.get(`/api/v1/media/${encodeURIComponent(id)}/trickplay`, undefined, signal);
    }

    /**
     * Create a new playlist, optionally adding a media item to it
     * (`POST /api/v1/playlists`, body `{ name: string, media_id?: string }`).
     * Returns the created playlist object. Non-2xx throws the shared {@link ApiError}.
     */
    createPlaylist(name: string, mediaId?: string): Promise<{ id: string; name: string }> {
        const body: { name: string; media_id?: string } = { name };
        if (mediaId) body.media_id = mediaId;
        return this.post<{ id: string; name: string }>('/api/v1/playlists', body);
    }

    /**
     * Add a media item to an existing playlist
     * (`POST /api/v1/playlists/{playlistId}/items`, body `{ media_id: string }`).
     * Non-2xx throws the shared {@link ApiError}.
     */
    addToPlaylist(playlistId: string, mediaId: string): Promise<{ message: string }> {
        return this.post<{ message: string }>(
            `/api/v1/playlists/${encodeURIComponent(playlistId)}/items`,
            { media_id: mediaId },
        );
    }

    /**
     * Get a download URL for a media item (`GET /api/v1/media/{id}/download`).
     * Returns `{ url: string }`. Non-2xx throws the shared {@link ApiError}.
     */
    getDownloadUrl(id: string): Promise<{ url: string }> {
        return this.get<{ url: string }>(`/api/v1/media/${encodeURIComponent(id)}/download`);
    }

    /**
     * Get the missing-episode report for a series media item
     * (`GET /api/v1/media/{id}/missing-episodes`).
     *
     * The server returns an ENVELOPE (snake_case, matching
     * `MediaItemController::getMissingEpisodes`), NOT a bare array:
     *   `{ total_expected, total_existing, missing_episodes: [{ episode_number }] }`.
     * `total_expected`/`total_existing` are omitted on the degraded branches
     * (item has no `metadata_json` or no positive `episode_count`), which still
     * return `{ missing_episodes: [] }` — hence both totals are optional and the
     * canonical count is always `missing_episodes.length`. Non-2xx throws the
     * shared {@link ApiError}.
     */
    getMissingEpisodes(id: string): Promise<{
        total_expected?: number;
        total_existing?: number;
        missing_episodes: Array<{ episode_number: number }>;
    }> {
        return this.get<{
            total_expected?: number;
            total_existing?: number;
            missing_episodes: Array<{ episode_number: number }>;
        }>(`/api/v1/media/${encodeURIComponent(id)}/missing-episodes`);
    }

    /**
     * Shuffle-play a media item (`POST /api/v1/shuffle`, body `{ media_id: string }`).
     * Returns a message. Non-2xx throws the shared {@link ApiError}.
     */
    shufflePlay(id: string): Promise<{ message: string }> {
        return this.post<{ message: string }>('/api/v1/shuffle', { media_id: id });
    }

    /**
     * Update metadata fields for a media item
     * (`PATCH /api/v1/media/{id}/metadata`, body is a partial media item).
     * Returns the updated media item. Non-2xx throws the shared {@link ApiError}.
     */
    updateMetadata(id: string, metadata: Record<string, unknown>): Promise<MediaItem> {
        return this.patch<MediaItem>(`/api/v1/media/${encodeURIComponent(id)}/metadata`, metadata);
    }

    /**
     * List all music artists (`GET /api/v1/music/artists`). The server groups
     * tracks by artist name across every music library and returns
     * `{ artists: [...] }` in snake_case; each row is normalized to a camelCase
     * {@link MusicArtist} (the display `name` doubles as the drill-down key).
     * A malformed payload degrades to an empty array.
     */
    async listArtists(signal?: AbortSignal): Promise<MusicArtist[]> {
        const res = await this.get<{ artists?: unknown }>('/api/v1/music/artists', undefined, signal);
        const raw = Array.isArray(res.artists) ? res.artists : [];
        return raw.map(normalizeMusicArtist);
    }

    /**
     * Fetch one artist by name (`GET /api/v1/music/artists/{mbid}` — the server
     * keys artists by name, so `mbid` here is the artist name). Returns a
     * normalized {@link MusicArtist}. A non-2xx (404 unknown artist) throws the
     * shared {@link ApiError}.
     */
    async getArtist(mbid: string, signal?: AbortSignal): Promise<MusicArtist> {
        const res = await this.get<{ artist?: unknown }>(
            `/api/v1/music/artists/${encodeURIComponent(mbid)}`,
            undefined,
            signal,
        );
        return normalizeMusicArtist(res.artist);
    }

    /**
     * List albums (`GET /api/v1/music/albums`). The server returns every album
     * across music libraries (no server-side artist filter), so when `artist`
     * is supplied the list is filtered client-side by the album's `artist` name
     * before normalizing. Each album carries its embedded (normalized) track
     * list. A malformed payload degrades to an empty array.
     */
    async listAlbums(artist?: string, signal?: AbortSignal): Promise<MusicAlbum[]> {
        const res = await this.get<{ albums?: unknown }>('/api/v1/music/albums', undefined, signal);
        const raw = Array.isArray(res.albums) ? res.albums : [];
        const filtered = artist === undefined || artist === ''
            ? raw
            : raw.filter(
                (a) => musicStr((a && typeof a === 'object' ? a : {} as Record<string, unknown>)['artist']) === artist,
            );
        return filtered.map(normalizeMusicAlbum);
    }

    /**
     * Fetch one album by name (`GET /api/v1/music/albums/{mbid}` — the server
     * keys albums by name, so `mbid` here is the album name). Returns a
     * normalized {@link MusicAlbum} with its embedded track list. A non-2xx
     * (404 unknown album) throws the shared {@link ApiError}.
     */
    async getAlbum(mbid: string, signal?: AbortSignal): Promise<MusicAlbum> {
        const res = await this.get<{ album?: unknown }>(
            `/api/v1/music/albums/${encodeURIComponent(mbid)}`,
            undefined,
            signal,
        );
        return normalizeMusicAlbum(res.album);
    }

    /**
     * List tracks (`GET /api/v1/music/tracks`). The server returns formatted
     * tracks across music libraries (no server-side album filter), so when
     * `album` is supplied the list is filtered client-side by the track's
     * `album` name before normalizing. Used as the fallback when an album has no
     * embedded tracks. A malformed payload degrades to an empty array.
     */
    async listTracks(album?: string, signal?: AbortSignal): Promise<MusicTrack[]> {
        const res = await this.get<{ tracks?: unknown }>('/api/v1/music/tracks', undefined, signal);
        const raw = Array.isArray(res.tracks) ? res.tracks : [];
        const filtered = album === undefined || album === ''
            ? raw
            : raw.filter(
                (t) => musicStr((t && typeof t === 'object' ? t : {} as Record<string, unknown>)['album']) === album,
            );
        return filtered.map(normalizeMusicTrack);
    }

    /**
     * Fetch one track by id (`GET /api/v1/music/tracks/{id}` → `{ track }`).
     * Unlike the raw items embedded in an album, this formatted track carries a
     * server-minted signed `stream_url`, so `useMusicPlayer` calls it to resolve
     * a playable URL for tracks browsed via the album fast-path. Returns a
     * normalized {@link MusicTrack}; a non-2xx (404 unknown track) throws the
     * shared {@link ApiError}.
     */
    async getTrack(id: string, signal?: AbortSignal): Promise<MusicTrack> {
        const res = await this.get<{ track?: unknown }>(
            `/api/v1/music/tracks/${encodeURIComponent(id)}`,
            undefined,
            signal,
        );
        return normalizeMusicTrack(res.track);
    }

    logout(redirect = true): void {
        this.tokens.clear();
        if (redirect && typeof window !== 'undefined') {
            window.location.href = this.loginPath;
        }
    }
}

export const api = new ApiClient();
