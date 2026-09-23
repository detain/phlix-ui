/**
 * Maps a library-load failure `code` (from `useLibrariesStore.errorCode`, sourced
 * from the hub relay proxy's 503 `ApiError` body) to an actionable EmptyState
 * `{title, description}` for the Browse surface.
 *
 * On the hub, `apiBase` resolves to the selected server's relay proxy, so a browse
 * of a server whose tunnel isn't connected propagates one of these codes:
 *   - `server.relay_unavailable` / `server.no_tunnel` — the server is online but
 *     its secure relay tunnel isn't connected yet, so its libraries can't be
 *     loaded over the hub (it should reconnect automatically).
 *   - `server.offline` — the server is offline.
 * Those three codes localize through the contracts error catalog
 * (`src/i18n/errors.ts` — title via `errorCodeTitle`, body via
 * `errorCodeMessage`), so every locale the package ships reads the card in its
 * own language instead of the English this file used to hardcode. The English
 * catalog strings are kept byte-identical to the former literals.
 * Any other/unknown code (or a direct-server failure with no code) keeps the
 * pre-existing behavior: the generic "Couldn't load your libraries" title with
 * the store's own message as the description.
 *
 * Pure + side-effect free so it is trivially unit-testable without mounting the
 * heavy BrowsePage SFC.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { errorCodeMessage, errorCodeTitle } from '../i18n/errors';
import type { PhlixErrorLocale } from '../i18n/errors';

export function libraryLoadErrorInfo(
  code: string | null,
  fallbackDescription: string,
  locale?: PhlixErrorLocale | null,
): { title: string; description: string } {
  const title = errorCodeTitle(code, locale);
  if (title !== null) {
    return { title, description: errorCodeMessage(code, locale) };
  }
  return { title: "Couldn't load your libraries", description: fallbackDescription };
}
