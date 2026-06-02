import type { LibraryQueryParams } from '../types/library-query';
/**
 * buildMediaQuery (R2.4) — serialize a (partial) library query into a URL query
 * string for `GET /api/v1/media`. Mirrors `useMediaStore`'s param building, but
 * tolerant of a partial query (omits `limit`/`offset` when not supplied) so it
 * can drive query-scoped home rows independently of the singleton store.
 *
 * Returns the encoded query string WITHOUT a leading `?`.
 */
export declare function buildMediaQuery(params?: Partial<LibraryQueryParams>): string;
/** Full endpoint URL for a media query against `apiBase`. */
export declare function buildMediaUrl(apiBase: string, params?: Partial<LibraryQueryParams>): string;
