/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type TokenStore } from './tokenStore';
import type { MediaItem, PosterCandidatesResponse } from '../types/media-item';
import type { MusicArtist, MusicAlbum, MusicTrack } from '../types/music';
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
/**
 * The page size this client asks for on every music listing, and the largest the
 * server will honour: `PageLimit::MAX` on `phlix-server`
 * (`MusicController::listArtists/listAlbums/listTracks` clamp `?limit=` to it).
 *
 * ⚠ Raising this is NOT how you reach the rest of the library — page instead. The
 * server embeds each album's tracks in its list row and mints ONE HMAC-signed
 * `stream_url` per embedded track on the event loop, so a whole-library album page
 * would carry 29,245 embedded tracks (S99 HIGH-1 at full scale). `offset` is the
 * cheap axis: an artist-filtered album page measured 0.95 ms on production against
 * 134 ms unfiltered.
 */
export declare const MUSIC_PAGE_SIZE = 100;
/** `?limit=`/`?offset=` accepted by every music listing endpoint. */
export interface MusicPageParams {
    limit?: number;
    offset?: number;
}
/**
 * One page of `GET /api/v1/music/artists`. `total` is the server's
 * `SELECT COUNT(*)` over `music_artists` — the TRUE library size, independent of
 * how many rows this page carries — so a UI can both size a pager and show the
 * real count. `limit`/`offset` are the values the server actually APPLIED (it
 * clamps), not the ones requested.
 *
 * Named `…Result`, not `…Page`, for two reasons: it matches the existing
 * {@link FavoritesResult} (the same shape from the same client), and `…Page` would
 * collide with the `MusicArtistsPage` / `MusicTracksPage` *components* the package
 * index already exports — those are public API, so the new types yield the name.
 */
export interface MusicArtistsResult {
    artists: MusicArtist[];
    total: number;
    limit: number;
    offset: number;
}
/**
 * One page of `GET /api/v1/music/albums`. `artist` echoes the server-applied
 * `?artist=` filter (`null` when unfiltered), which is how a client can tell a
 * filtering server from one that silently ignored the parameter; `total` honours
 * the filter.
 */
export interface MusicAlbumsResult {
    albums: MusicAlbum[];
    total: number;
    limit: number;
    offset: number;
    artist: string | null;
}
/** One page of `GET /api/v1/music/tracks`. `total` is the whole-library count. */
export interface MusicTracksResult {
    tracks: MusicTrack[];
    total: number;
    limit: number;
    offset: number;
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
export declare const TMDB_UNCONFIGURED_CODE = "metadata.tmdb_unconfigured";
/**
 * True when a thrown error is the server's `422 metadata.tmdb_unconfigured`
 * response (no TMDB key) — lets the UI show a "configure TMDB" message instead
 * of a generic failure. Reads the parsed `code` off the {@link ApiError} body.
 */
export declare function isTmdbUnconfigured(e: unknown): boolean;
/**
 * One subtitle search candidate from
 * `GET /api/v1/media/{id}/subtitles/search` — mirrors the server contract's
 * ranking signals verbatim (camelCase on the wire). `fps` is null when the
 * provider reports no frame-rate.
 */
export interface SubtitleCandidate {
    provider: string;
    language: string;
    /** Provider-scoped id passed back to the download endpoint. */
    downloadId: string;
    releaseName: string;
    format: string;
    /** How the provider matched (e.g. `hash`, `imdb`, `name`). */
    matchedBy: string;
    /** Provider rating (higher is better); 0 when unknown. */
    rating: number;
    /** Provider download count (popularity); 0 when unknown. */
    downloadCount: number;
    hearingImpaired: boolean;
    /** Frame rate the sub is timed for, or null when unreported. */
    fps: number | null;
}
/** Request body for `POST /api/v1/media/{id}/subtitles/download`. */
export interface SubtitleDownloadPayload {
    provider: string;
    downloadId: string;
    language: string;
    format?: string;
    releaseName?: string;
    hearingImpaired?: boolean;
}
/**
 * The downloaded-track envelope from
 * `POST /api/v1/media/{id}/subtitles/download`. The `track` surfaces through the
 * existing player `subtitle_tracks[]` contract (signed WebVTT url), so callers
 * can feed it straight into `parseSubtitleTracks`.
 */
export interface SubtitleDownloadResult {
    track: Record<string, unknown>;
}
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
    post<T = unknown>(endpoint: string, data?: unknown, signal?: AbortSignal): Promise<T>;
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
     * (`POST /api/v1/media/{id}/watched`). The server returns a flat
     * `{ message }`. Non-2xx throw the shared {@link ApiError}.
     */
    markWatched(id: string): Promise<{
        message: string;
    }>;
    /**
     * Mark a media item as unwatched (clear watched state) for the authenticated
     * user (`POST /api/v1/media/{id}/unwatched`). The server returns a flat
     * `{ message }`. Non-2xx throw the shared {@link ApiError}.
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
     * @param signal     Optional AbortSignal to cancel the request
     */
    searchByMarker(type: 'intro' | 'outro' | 'credits' | 'ad', positionMs: number, aroundSec?: number, limit?: number, signal?: AbortSignal): Promise<{
        items: MediaItem[];
        marker_type: string;
        around: number;
        position: number;
    }>;
    /**
     * Get trickplay (sprite preview) data for a media item.
     *
     * Calls `GET /api/v1/media/{id}/trickplay`. Returns the sprite sheet URL and
     * timeline mapping for thumbnail previews during scrubbing.
     *
     * @param id Media item ID
     * @param signal Optional AbortSignal to cancel the request
     */
    getTrickplay(id: string, signal?: AbortSignal): Promise<{
        sprite_url: string | null;
        timeline: Array<{
            seconds: number;
            frame: number;
        }>;
    }>;
    /**
     * Create a new playlist, optionally adding a media item to it
     * (`POST /api/v1/playlists`, body `{ name: string, media_id?: string }`).
     * Returns the created playlist object. Non-2xx throws the shared {@link ApiError}.
     */
    createPlaylist(name: string, mediaId?: string): Promise<{
        id: string;
        name: string;
    }>;
    /**
     * Add a media item to an existing playlist
     * (`POST /api/v1/collections/{id}/items/{mediaItemId}`).
     *
     * ⚠ S280: the server's playlist alias is `POST /api/v1/playlists`
     * (`CollectionController::create` — a playlist IS a collection), and
     * `createPlaylist` returns the collection id. Item-add is therefore the
     * collection route; the old `POST /api/v1/playlists/{playlistId}/items` was
     * never registered anywhere and 404ed against every real server (the S280
     * route gate caught it).
     */
    addToPlaylist(playlistId: string, mediaId: string): Promise<{
        message: string;
    }>;
    /**
     * Get a download URL for a media item (`GET /api/v1/media/{id}/download`).
     * Returns `{ url: string }`. Non-2xx throws the shared {@link ApiError}.
     */
    getDownloadUrl(id: string): Promise<{
        url: string;
    }>;
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
        missing_episodes: Array<{
            episode_number: number;
        }>;
    }>;
    /**
     * Shuffle-play a media item (`POST /api/v1/shuffle`, body `{ media_id: string }`).
     * Returns a message. Non-2xx throws the shared {@link ApiError}.
     */
    shufflePlay(id: string): Promise<{
        message: string;
    }>;
    /**
     * Update metadata fields for a media item
     * (`PATCH /api/v1/media/{id}/metadata`, body is a partial media item).
     * Returns the updated media item. Non-2xx throws the shared {@link ApiError}.
     */
    updateMetadata(id: string, metadata: Record<string, unknown>): Promise<MediaItem>;
    /**
     * Search external subtitle providers for a media item (Wave 3 F3).
     *
     * Calls `GET /api/v1/media/{id}/subtitles/search?lang=en[,es]`. `langs` is a
     * list of BCP-47 codes joined into the `lang` query param; an empty list omits
     * it (server default). The server returns `{ candidates: [...] }` (empty when
     * the registry is empty or nothing matched) — each row is normalized to a typed
     * {@link SubtitleCandidate}. A malformed payload degrades to an empty array.
     * Non-2xx throws the shared {@link ApiError}.
     */
    searchSubtitles(id: string, langs: string[], signal?: AbortSignal): Promise<SubtitleCandidate[]>;
    /**
     * Download a chosen subtitle candidate and attach it as an external track
     * (Wave 3 F3).
     *
     * Calls `POST /api/v1/media/{id}/subtitles/download` with the candidate's
     * `{ provider, downloadId, language, format?, releaseName?, hearingImpaired? }`.
     * Returns `{ track }` on `200` — the track surfaces through the existing player
     * `subtitle_tracks[]` contract on the item's next fetch. Non-2xx throws the
     * shared {@link ApiError}: `400` missing fields, `404` unknown item/provider,
     * `429` quota exhausted (body carries `downloadsRemaining`/`resetTimeUtc`),
     * `502` other provider failure. The caller inspects `ApiError.status`/`.body`.
     */
    downloadSubtitle(id: string, payload: SubtitleDownloadPayload): Promise<SubtitleDownloadResult>;
    /**
     * List ONE PAGE of music artists (`GET /api/v1/music/artists`), newest server
     * contract: `{ artists, total, limit, offset }` in snake_case, each row
     * normalized to a camelCase {@link MusicArtist} (the display `name` doubles as
     * the drill-down key). A malformed payload degrades to an empty page.
     *
     * ⚠ This is a PAGE, not the library. The endpoint clamps `?limit=` to
     * {@link MUSIC_PAGE_SIZE}, so a caller that ignores `total` shows the first 100
     * of 2,197 artists with no hint the rest exist — which is exactly the S110 bug
     * this signature exists to make impossible to write by accident.
     */
    listArtists(params?: MusicPageParams, signal?: AbortSignal): Promise<MusicArtistsResult>;
    /**
     * Fetch one artist by name (`GET /api/v1/music/artists/{mbid}` — the server
     * keys artists by name, so `mbid` here is the artist name). Returns a
     * normalized {@link MusicArtist}. A non-2xx (404 unknown artist) throws the
     * shared {@link ApiError}.
     */
    getArtist(mbid: string, signal?: AbortSignal): Promise<MusicArtist>;
    /**
     * List ONE PAGE of albums (`GET /api/v1/music/albums`), optionally filtered to
     * one artist SERVER-SIDE via `?artist=` (exact, case-insensitive, trimmed —
     * S99). Returns `{ albums, total, limit, offset, artist }`; `total` and the
     * `artist` echo both honour the filter. Each album carries its embedded
     * (normalized) track list, capped and flagged — see
     * {@link MusicAlbum.tracksTruncated}.
     *
     * ⚠ Do NOT filter by artist client-side over this page. `/albums` is ordered
     * globally by artist then title, so its first 100 rows span only ~23 of the
     * library's 2,197 artists: filtering page 1 in the browser made 77 of the 100
     * visible artists drill down to an EMPTY album list (the S110 bug). The
     * server-side filter is also ~140× cheaper (0.95 ms vs 134 ms, measured on
     * production) because it resolves through `music_albums.idx_artist`.
     */
    listAlbums(params?: MusicPageParams & {
        artist?: string;
    }, signal?: AbortSignal): Promise<MusicAlbumsResult>;
    /**
     * Fetch one album by name (`GET /api/v1/music/albums/{mbid}` — the server keys
     * albums by name, so `mbid` here is the album name), with the whole track list
     * embedded (the detail route exempts itself from the list route's per-album
     * track cap). Pass `artist` to disambiguate: 2,622 of production's 5,091 album
     * titles are shared by more than one artist, while ZERO titles repeat WITHIN an
     * artist — so `?artist=` makes this lookup exact instead of "first by artist
     * name, then lowest id". A non-2xx (404 unknown album) throws {@link ApiError}.
     */
    getAlbum(mbid: string, artist?: string, signal?: AbortSignal): Promise<MusicAlbum>;
    /**
     * List ONE PAGE of tracks (`GET /api/v1/music/tracks`) → `{ tracks, total,
     * limit, offset }`, each row a formatted {@link MusicTrack} carrying a signed
     * `stream_url`. A malformed payload degrades to an empty page.
     *
     * ⚠ There is deliberately no `album` argument. The endpoint has NO server-side
     * album filter, and filtering a 100-row page of 29,245 tracks in the browser
     * returns nothing for any album outside page 1 — the same defect as the album
     * drill-down. Use {@link getAlbum} (which embeds the album's whole track list)
     * to get one album's tracks.
     */
    listTracks(params?: MusicPageParams, signal?: AbortSignal): Promise<MusicTracksResult>;
    /**
     * Fetch one track by id (`GET /api/v1/music/tracks/{id}` → `{ track }`).
     * Unlike the raw items embedded in an album, this formatted track carries a
     * server-minted signed `stream_url`, so `useMusicPlayer` calls it to resolve
     * a playable URL for tracks browsed via the album fast-path. Returns a
     * normalized {@link MusicTrack}; a non-2xx (404 unknown track) throws the
     * shared {@link ApiError}.
     */
    getTrack(id: string, signal?: AbortSignal): Promise<MusicTrack>;
    logout(redirect?: boolean): void;
}
export declare const api: ApiClient;
