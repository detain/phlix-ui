/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import type { LibraryQueryParams } from '../types/library-query';

/**
 * buildMediaQuery (R2.4) — serialize a (partial) library query into a URL query
 * string for `GET /api/v1/media`. Mirrors `useMediaStore`'s param building, but
 * tolerant of a partial query (omits `limit`/`offset` when not supplied) so it
 * can drive query-scoped home rows independently of the singleton store.
 *
 * Returns the encoded query string WITHOUT a leading `?`.
 */
export function buildMediaQuery(params: Partial<LibraryQueryParams> = {}): string {
  const sp = new URLSearchParams();
  // Scope to a single library when set — the server confines both the items and
  // the `total` to that library (an absent/blank value is an all-libraries query).
  if (params.libraryId) sp.set('libraryId', params.libraryId);
  // Hierarchy scope: `parentId` fetches a series' direct children (seasons/
  // episodes) for the detail drill-down; `topLevel` restricts a rail/grid to
  // parent-less items (movies + series). The server treats `topLevel=1` as the
  // flag and ignores it when a search is present.
  if (params.parentId) sp.set('parentId', params.parentId);
  if (params.topLevel) sp.set('topLevel', '1');
  if (params.search) sp.set('search', params.search);
  // Array params use the `key[]=` form so PHP parses them into arrays; a bare
  // repeated `genres=` collapses to the last value (a string) and the server drops it.
  params.genres?.forEach((g) => sp.append('genres[]', g));
  if (params.yearFrom !== undefined) sp.set('yearFrom', String(params.yearFrom));
  if (params.yearTo !== undefined) sp.set('yearTo', String(params.yearTo));
  params.ratings?.forEach((r) => sp.append('ratings[]', r));
  params.types?.forEach((t) => sp.append('types[]', t));
  params.actors?.forEach((a) => sp.append('actors[]', a));
  params.companies?.forEach((c) => sp.append('companies[]', c));
  if (params.match) sp.set('match', params.match);
  if (params.minRating !== undefined) sp.set('minRating', String(params.minRating));
  if (params.maxRating !== undefined) sp.set('maxRating', String(params.maxRating));
  if (params.sort) sp.set('sort', params.sort);
  if (params.order) sp.set('order', params.order);
  if (params.limit !== undefined) sp.set('limit', String(params.limit));
  if (params.offset !== undefined) sp.set('offset', String(params.offset));
  return sp.toString();
}

/** Full endpoint URL for a media query against `apiBase`. */
export function buildMediaUrl(apiBase: string, params: Partial<LibraryQueryParams> = {}): string {
  return `${apiBase}/api/v1/media?${buildMediaQuery(params)}`;
}
