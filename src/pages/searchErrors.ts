/**
 * Search's error-classification wrapper over the shared wire layer
 * (src/utils/wireErrors.ts — the promoted shape of this file and
 * `browseErrors.ts`, review ui__webux survivor class).
 *
 * Maps a search-request failure to an actionable EmptyState `{title,
 * description}` — the SearchPage half of the error-classification law Browse
 * follows through `browseErrors.ts` (review ui__webux M6).
 *
 * On the hub, `apiBase` resolves to the selected server's relay proxy, so a
 * search whose server tunnel isn't connected propagates one of these codes
 * (same three as Browse — see `browseErrors.ts` for the wire story):
 *   - `server.relay_unavailable` / `server.no_tunnel` — the server is online
 *     but its secure relay tunnel isn't connected yet.
 *   - `server.offline` — the server is offline.
 * Those codes localize through the contracts error catalog
 * (`src/i18n/errors.ts` — title via `errorCodeTitle`, body via
 * `errorCodeMessage`), so every locale the package ships reads the card in its
 * own language instead of the raw English `Error.message` the page used to
 * assign verbatim (an `ApiError` body may carry `SQLSTATE[...]: …` text —
 * server-side debug prose that must never be the user's headline).
 * Any other/unknown code (or a direct-server failure with no code) keeps the
 * pre-existing behavior: the generic "Search failed" title with the thrown
 * error's own message as the description.
 *
 * {@link searchErrorCode} is the shared `wireErrorCode` parse kept under this
 * file's name (contracts-law envelope `{error, code}` carried in
 * `ApiError.body`, mirroring how `useAuthStore.parseErrorCode` and
 * `isTmdbUnconfigured` read the same slot).
 *
 * Pure + side-effect free so it is trivially unit-testable without mounting
 * the SearchPage SFC.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { wireErrorInfo } from '../utils/wireErrors';
import type { PhlixErrorLocale } from '../i18n/errors';

export { wireErrorCode as searchErrorCode } from '../utils/wireErrors';

export function searchErrorInfo(
  code: string | null,
  fallbackDescription: string,
  locale?: PhlixErrorLocale | null,
): { title: string; description: string } {
  return wireErrorInfo(code, { title: 'Search failed', description: fallbackDescription }, locale);
}
