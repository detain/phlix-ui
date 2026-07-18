/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

export type MediaType = 'movie' | 'series' | 'season' | 'episode' | 'audio' | 'image';

/**
 * One responsive poster candidate (R6.2b): a URL, optionally tagged with a width
 * (`w`) or pixel-density (`x`) descriptor for `srcset`. A bare string is the URL
 * with no descriptor.
 */
export type PosterSource =
    | string
    | { url: string; width?: number; density?: number };

/**
 * Optional responsive poster sources for `srcset` (R6.2b). Either a ready-made
 * `srcset` string (e.g. `"poster-200.jpg 200w, poster-400.jpg 400w"`) or an
 * array of sized candidates. Absent/empty → the card uses the single
 * `poster_url`. Populated by an image proxy / responsive-poster hook when one
 * exists (`phlix_ui_redo.md` §Optional#6); the client degrades gracefully now.
 */
export type PosterSrcsetInput = string | PosterSource[] | null | undefined;

/**
 * Shape returned by list endpoints (GET /api/v1/media). These fields are always
 * populated on every item regardless of context.
 */
export interface MediaListItem {
    id: string;
    name: string;
    /**
     * Article-stripped sort key the server derives from `name` ("The Plot" →
     * "Plot") so listings file the title under its real letter while `name` still
     * displays in full. The server already orders the media grid + A-Z rail by
     * this; exposed here so any client-side sort/grouping can agree (mirror the
     * derivation with `stripLeadingArticle` from `utils/sortTitle`). Optional so
     * older servers that don't send it keep working.
     */
    sort_title?: string | null;
    type: MediaType;
    path?: string;
    poster_url: string | null;
    /** Optional responsive poster sources (R6.2b); falls back to `poster_url`. */
    poster_srcset?: PosterSrcsetInput;
    genres: string[];
    year: number | null;
    /**
     * Content / parental rating. Movie ratings (MPAA) plus the US TV rating
     * vocabulary (TV-Y … TV-MA) the server now emits. Distinct from the per-user
     * `user_data.rating` score — never conflate the two. Optional TV values are
     * additive; older servers only ever send the movie subset.
     */
    rating:
        | 'G'
        | 'PG'
        | 'PG-13'
        | 'R'
        | 'NC-17'
        | 'X'
        | 'UNRATED'
        | 'TV-Y'
        | 'TV-Y7'
        | 'TV-G'
        | 'TV-PG'
        | 'TV-14'
        | 'TV-MA'
        | null;
    runtime: number | null;
    overview: string | null;
    actors: string[];
    director: string | null;
    created_at: string | null;
    updated_at: string | null;
    /**
     * Series→season→episode hierarchy (R-series). `parent_id` links an item to
     * its parent (episode→season→series); null/absent for top-level items
     * (movies, series). `season_number`/`episode_number` come from metadata and
     * drive grouping/ordering on the series detail page; `season_number` 0 (or a
     * null number on a series episode) denotes Specials. `episode_title` is the
     * per-episode title, distinct from `name`. All optional so existing flat
     * (movie) data and older servers keep working.
     */
    parent_id?: string | null;
    season_number?: number | null;
    episode_number?: number | null;
    episode_title?: string | null;
    /**
     * Original air/release date (YYYY-MM-DD) — populated for episodes (and dated
     * items) from the matched metadata. Optional; absent on older servers or
     * unmatched items. Shown alongside the runtime/description on episode rows.
     */
    air_date?: string | null;
    /**
     * Episode still frame image URL (a representative frame from the episode),
     * populated for episodes from the matched metadata. Optional; absent on
     * movies/series and older servers. Distinct from `poster_url`.
     */
    still_url?: string | null;
}

/**
 * Full detail shape (GET /api/v1/media/{id}). Extends the list shape with
 * fields that are only populated on the single-item detail response.
 * All detail-only fields remain optional so the type is assignable from
 * list-item contexts (back-compat + synthetic items like local files).
 */
export type MediaFile = {
    path: string;
    size_bytes: number;
    container?: string | null;
    codec?: string | null;
    resolution?: string | null;
};

export interface MediaDetail extends MediaListItem {
    /** Short-lived signed direct-play URL; list rows / local files omit this. */
    stream_url?: string | null;
    /** Duration in seconds; list rows / local files omit this. */
    duration?: number | null;
    /** Rich cast; falls back to `actors` when absent. Detail shape only. */
    cast?: Array<{ name: string; role?: string | null; profile_url?: string | null }>;
    /** Rich crew; falls back to `director` when absent. Detail shape only. */
    crew?: Array<{ name: string; job?: string | null; profile_url?: string | null }>;
    /** Production companies; used for clickable filter chips. Detail shape only. */
    production_companies?: Array<{ name: string; logo_url?: string | null; origin_country?: string | null }>;
    /** Primary studio name; fallback when production_companies absent. Detail shape only. */
    studio?: string | null;
    /** Owning library id. Detail shape only. */
    library_id?: string | null;
    /** Backdrop image URL (TMDB w500); detail only. Used as the fallback source
     *  for the full-bleed page background when `backdrop_url_large` is absent. */
    backdrop_url?: string | null;
    /** Full-resolution (/original) backdrop for the full-bleed page background;
     *  detail only. Preferred over `backdrop_url` when present. */
    backdrop_url_large?: string | null;
    /** Responsive `srcset` string for the backdrop, e.g.
     *  `"url w780, url w1280, url original"`; detail only + optional. When present
     *  the backdrop `<img>` uses it so the browser fetches an appropriately-sized
     *  image; degrades to the single `backdrop_url_large`/`backdrop_url` src. */
    backdrop_srcset?: string | null;
    /** Theme music audio URL (signed, short-lived, streamable MP3); detail only.
     *  When present the detail hero renders an unobtrusive mute/stop control and
     *  plays it muted+looping (autoplay), unmutable by the viewer. Absent → no
     *  control, no audio. */
    theme_audio_url?: string | null;
    /**
     * Trailer video URL (detail only). When present the detail hero renders a
     * "Play Trailer" action. Prefer an in-app embed when {@link trailer_site} is
     * `YouTube` and {@link trailer_key} is a valid id; otherwise this URL opens
     * in a new tab. Absent → no trailer control.
     */
    trailer_url?: string | null;
    /**
     * Provider video key for the trailer (e.g. a YouTube video id). Combined with
     * {@link trailer_site} to build a safe in-app embed URL. Optional.
     */
    trailer_key?: string | null;
    /**
     * Trailer host/site (e.g. `YouTube`). Only `YouTube` currently yields an
     * in-app embed; anything else falls back to opening {@link trailer_url}.
     */
    trailer_site?: string | null;
    /**
     * Title-logo image URL (detail only) — either a signed local PNG
     * (`/api/v1/artwork/{id}?size=logo`) or a remote SVG. When present the detail
     * hero shows this logo in place of the plain text title, falling back to the
     * text title when absent or on image load error. A plain `<img>` handles both
     * PNG and SVG. Optional.
     */
    logo_url?: string | null;
    /**
     * Per-user state for the authenticated viewer, an ADD-ONLY block the server
     * attaches to the detail (`GET /api/v1/media/{id}`) and favorites
     * (`GET /api/v1/users/me/favorites`) responses — NOT to plain list rows. It
     * is therefore a detail-only field (and optional, so list-context items still
     * type-check). `favorite` is the bookmark/favorite flag; `rating` is the
     * personal 1-10 score (null when unrated); `like_level` is the thumbs rating
     * axis (−2..2 — −2 strongly dislike, −1 dislike, 0 not set, 1 like, 2 love;
     * optional so older servers that omit it keep working). `null` means the
     * request was unauthenticated / the store
     * is not wired. Distinct from the list-level `rating` (the content/parental
     * rating like "PG-13") — never conflate the two. `watched` is the per-user
     * watched flag (the eye toggle on cards + the detail hero); optional so older
     * servers that don't send it default to not-watched.
     */
    user_data?: { favorite: boolean; rating: number | null; like_level?: number; watched?: boolean } | null;
    /**
     * External metadata-provider IDs the item is matched to, keyed by provider
     * (`tmdb`, `imdb`, `tvdb`, `anidb`, …). Detail-only + optional; the detail
     * page renders these as outbound "Links" to each provider's page. Values are
     * strings; absent/empty when the item is unmatched or on older servers.
     */
    external_ids?: Record<string, string> | null;
    /**
     * Per-file metadata (container, codec, resolution, size) for each physical
     * file backing this item. Only populated on the detail response; absent on
     * list rows. Full `path` is admin-gated (non-admin sees basename only).
     */
    files?: MediaFile[];
}

/**
 * Back-compat alias — all existing code uses `MediaItem`. Retained so native
 * clients and any deep-import consumers keep compiling without changes.
 * New code should prefer `MediaListItem` (list context) or `MediaDetail` (detail
 * context) for clarity.
 */
export type MediaItem = MediaDetail;

/**
 * Type guard: returns true when the item has at least one detail-only field
 * populated, indicating it is a true detail response (not just a list row or
 * synthetic item). Use this to narrow `MediaItem` → `MediaDetail` at call sites
 * that may receive either shape.
 */
/**
 * One poster candidate returned by {@link ApiClient.listPosters}
 * (`GET /api/v1/media/{id}/posters`). `provider` identifies the source
 * (e.g. `"tmdb"`, `"fanart.tv"`, `"tvdb"`). `poster_url` is the absolute
 * URL; `width`/`height` are hints for the img element when available.
 * Optional fields are defended so a missing field degrades gracefully.
 */
export interface PosterCandidate {
    provider: string;
    poster_url: string;
    width?: number | null;
    height?: number | null;
    votes?: number | null;
    vote_average?: number | null;
    tmdb_id?: number | string | null;
    [key: string]: unknown;
}

/** Envelope returned by {@link ApiClient.listPosters}. */
export interface PosterCandidatesResponse {
    candidates: PosterCandidate[];
    /** The server's current `poster_url` for this item at the time of the call. */
    current_poster_url: string | null;
}

export function isMediaDetail(item: MediaItem): item is MediaDetail {
    return (
        item.stream_url !== undefined ||
        item.duration !== undefined ||
        item.cast !== undefined ||
        item.crew !== undefined ||
        item.production_companies !== undefined ||
        item.studio !== undefined ||
        item.library_id !== undefined
    );
}
