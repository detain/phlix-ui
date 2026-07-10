/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { LibraryQueryParams } from '../types/library-query';
/** One bucket of the A-Z jump index: a letter (or `#`), the absolute item
 *  offset of its first title, and how many titles fall under it. */
export interface LetterBucket {
    letter: string;
    offset: number;
    count: number;
}
/**
 * Fetch the A-Z jump index for the media list under the SAME filters as the grid
 * (`GET /api/v1/media/letter-index`). Paging params in `query` are harmless — the
 * server ignores them. Goes through {@link ApiClient} so the logged-in user's
 * Bearer token is sent (the endpoint is auth-gated). Returns `[]` on any error
 * (including 401) so the rail simply doesn't show.
 */
export declare function fetchLetterIndex(apiBase: string, query?: Partial<LibraryQueryParams>, signal?: AbortSignal): Promise<LetterBucket[]>;
