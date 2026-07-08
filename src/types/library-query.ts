/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

export interface LibraryQuery {
    search?: string;
    genres?: string[];
    yearFrom?: number;
    yearTo?: number;
    ratings?: ('G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'X' | 'UNRATED')[];
    actors?: string[];
    /** Filter by metadata-match status: items that have ('matched') or have not
     *  ('unmatched') been through metadata matching. */
    match?: 'matched' | 'unmatched';
    sort?: 'name' | 'year' | 'rating' | 'date_added' | 'runtime';
    order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    /** Scope the query to a single library (its `id`). Drives the per-library
     *  Browse rails and the dedicated library page. */
    libraryId?: string;
    /** Scope to the direct children (seasons/episodes) of one item — drives the
     *  series detail drill-down. */
    parentId?: string;
    /** Return only top-level items (no parent: movies + series), excluding
     *  seasons/episodes — Browse rails/library grids set this so a series library
     *  shows shows, not a flat dump of every episode. Ignored server-side when a
     *  `search` is set so search still spans the whole library. */
    topLevel?: boolean;
}

export interface LibraryQueryParams extends Omit<LibraryQuery, 'ratings' | 'sort' | 'order'> {
    search?: string;
    genres?: string[];
    yearFrom?: number;
    yearTo?: number;
    ratings?: string[];
    actors?: string[];
    /** Filter by production company / studio name — drives the clickable studio
     *  chips on the detail page. */
    companies?: string[];
    match?: 'matched' | 'unmatched';
    types?: string[];
    sort?: string;
    order?: string;
    limit?: number;
    offset?: number;
    /** Scope the query to a single library (its `id`). */
    libraryId?: string;
}
