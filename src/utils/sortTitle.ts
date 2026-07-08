/**
 * Article-aware title sorting — the client mirror of the server's
 * `Phlix\Media\Library\SortTitle`.
 *
 * Listings sort/group by a title with its leading article ignored, so "The Plot"
 * files under **P** (not T) while the title still DISPLAYS as "The Plot". The
 * server already orders the media grid + A-Z rail this way and exposes the
 * derived key as `MediaItem.sort_title`; this helper lets any *client-side* sort
 * (e.g. the library rails, which the SPA sorts locally) agree with it.
 *
 * The article set + matching rule are kept byte-for-byte in step with the server:
 * the same articles, only stripped when the article is a whole word (immediately
 * followed by a space), matched case-insensitively but ACCENT-sensitively (so
 * "Thé Café" is not treated as the article "the"), and trimmed of spaces only —
 * mirroring the server's `LOWER(...) COLLATE utf8mb4_bin` test and space-only SQL
 * `TRIM()`.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/**
 * Leading articles ignored when sorting/grouping, lowercased, WITHOUT the
 * trailing space. English (the/a/an) plus the common Romance and German articles
 * — kept identical to the server's `SortTitle::ARTICLES`.
 */
export const SORT_TITLE_ARTICLES = [
  'the', 'a', 'an',
  'el', 'la', 'le', 'les', 'los', 'las',
  'die', 'der', 'das',
] as const;

/** Trim spaces (U+0020) only, mirroring the server's space-only SQL `TRIM()`. */
function trimSpaces(value: string): string {
  return value.replace(/^ +/, '').replace(/ +$/, '');
}

/**
 * Returns the sort key for a title: strips a single leading article (case-
 * insensitive, whole word) and trims spaces. Returns the space-trimmed title
 * unchanged when it carries no leading article.
 *
 * @example stripLeadingArticle('The Plot') // 'Plot'
 * @example stripLeadingArticle('Theory')   // 'Theory'  (not a whole-word article)
 */
export function stripLeadingArticle(title: string): string {
  for (const article of SORT_TITLE_ARTICLES) {
    const prefix = `${article} `;
    if (title.length >= prefix.length && title.slice(0, prefix.length).toLowerCase() === prefix) {
      return trimSpaces(title.slice(prefix.length));
    }
  }
  return trimSpaces(title);
}

/**
 * Case-insensitive comparator over article-stripped titles, for `Array.sort`.
 * Uses `localeCompare` with `sensitivity: 'base'` (matching the existing library
 * sort) so it stays locale-aware.
 */
export function compareByStrippedTitle(a: string, b: string): number {
  return stripLeadingArticle(a).localeCompare(stripLeadingArticle(b), undefined, { sensitivity: 'base' });
}
