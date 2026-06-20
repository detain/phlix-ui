export type MediaType = 'movie' | 'series' | 'season' | 'episode' | 'audio' | 'image';
/**
 * One responsive poster candidate (R6.2b): a URL, optionally tagged with a width
 * (`w`) or pixel-density (`x`) descriptor for `srcset`. A bare string is the URL
 * with no descriptor.
 */
export type PosterSource = string | {
    url: string;
    width?: number;
    density?: number;
};
/**
 * Optional responsive poster sources for `srcset` (R6.2b). Either a ready-made
 * `srcset` string (e.g. `"poster-200.jpg 200w, poster-400.jpg 400w"`) or an
 * array of sized candidates. Absent/empty → the card uses the single
 * `poster_url`. Populated by an image proxy / responsive-poster hook when one
 * exists (`phlix_ui_redo.md` §Optional#6); the client degrades gracefully now.
 */
export type PosterSrcsetInput = string | PosterSource[] | null | undefined;
export interface MediaItem {
    id: string;
    name: string;
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
    /** Owning library id — present on the single-item detail shape; lets the
     *  detail page link a clicked actor to that library's actor-filtered grid. */
    library_id?: string | null;
}
