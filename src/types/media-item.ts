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
    rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'X' | 'UNRATED' | null;
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
}

/**
 * Full detail shape (GET /api/v1/media/{id}). Extends the list shape with
 * fields that are only populated on the single-item detail response.
 * All detail-only fields remain optional so the type is assignable from
 * list-item contexts (back-compat + synthetic items like local files).
 */
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
    /** Backdrop image URL; detail only. */
    backdrop_url?: string | null;
    /**
     * Per-user state for the authenticated viewer, an ADD-ONLY block the server
     * attaches to the detail (`GET /api/v1/media/{id}`) and favorites
     * (`GET /api/v1/users/me/favorites`) responses — NOT to plain list rows. It
     * is therefore a detail-only field (and optional, so list-context items still
     * type-check). `favorite` is the bookmark/favorite flag; `rating` is the
     * personal 1-10 score (null when unrated); `like_level` is the 4-state Love
     * axis (0-3, added in a later W1 step — optional so older servers that omit
     * it keep working). `null` means the request was unauthenticated / the store
     * is not wired. Distinct from the list-level `rating` (the content/parental
     * rating like "PG-13") — never conflate the two.
     */
    user_data?: { favorite: boolean; rating: number | null; like_level?: number } | null;
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
