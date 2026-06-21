import type { LibraryQueryParams } from '../types/library-query';
import { buildMediaQuery } from './media-query';

/** One bucket of the A-Z jump index: a letter (or `#`), the absolute item
 *  offset of its first title, and how many titles fall under it. */
export interface LetterBucket {
  letter: string;
  offset: number;
  count: number;
}

function toBucket(value: unknown): LetterBucket | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  if (typeof v.letter !== 'string') return null;
  return {
    letter: v.letter,
    offset: typeof v.offset === 'number' ? v.offset : 0,
    count: typeof v.count === 'number' ? v.count : 0,
  };
}

/**
 * Fetch the A-Z jump index for the media list under the SAME filters as the grid
 * (`GET /api/v1/media/letter-index`). Paging params in `query` are harmless — the
 * server ignores them. Returns `[]` on any error so the rail simply doesn't show.
 */
export async function fetchLetterIndex(
  apiBase: string,
  query: Partial<LibraryQueryParams> = {},
  signal?: AbortSignal,
): Promise<LetterBucket[]> {
  try {
    const res = await fetch(`${apiBase}/api/v1/media/letter-index?${buildMediaQuery(query)}`, { signal });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    const letters = (data as { letters?: unknown })?.letters;
    if (!Array.isArray(letters)) return [];
    return letters.map(toBucket).filter((b): b is LetterBucket => b !== null);
  } catch {
    return [];
  }
}
