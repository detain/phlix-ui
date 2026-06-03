export type MediaType = 'movie' | 'series' | 'episode' | 'audio' | 'image';
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
}
