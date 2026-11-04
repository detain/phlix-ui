/**
 * wireErrors.ts — the SHARED wire-error classifier. The one shape
 * `browseErrors.ts` and `searchErrors.ts` each cloned (review ui__webux
 * survivor class: "promote the shared shape at the 3rd adopter") generalized
 * for every error surface in the package, card or single-line.
 *
 * DOCTRINE (same law as `src/i18n/errors.ts`): the wire carries stable machine
 * codes in the contracts `{error, code}` envelope; CLIENTS localize by code;
 * the server's `error` text is a debug fallback that must never be user-facing
 * copy — it can carry `SQLSTATE[...]`-style prose from the hub relay proxy or
 * from the server it fronts.
 *
 * THE THREE ARMS of {@link wireErrorLine} (the law the survivor rails, toasts
 * and card descriptions adopted):
 *   1. a thrown `ApiError` whose body carries a REGISTERED code → the
 *      contracts error catalog MESSAGE, at the app-configured locale (via
 *      `errorCodeMessage`'s locale → en → caller-fallback chain, so codes
 *      without an EmptyState title still route their catalog copy);
 *   2. a thrown `ApiError` with NO registered code → the caller's generic
 *      line. The raw server text is dropped here — this is the arm the
 *      survivor surfaces previously rendered verbatim;
 *   3. any other throw (`NetworkError` / `TimeoutError` / plain `Error`) →
 *      its own message via `errMessage`, exactly as those surfaces behaved
 *      before. The typed client errors carry friendly, client-written copy;
 *      only SERVER text is untrusted.
 *
 * {@link wireErrorInfo} is the code-keyed CARD arm the Browse/Search pages
 * keep: a code with a catalog title localizes {title, description}; anything
 * else gets the caller's generic card verbatim (their pinned fallbacks thread
 * their own description through it — their documented pre-existing behavior).
 *
 * Pure + side-effect free, like both predecessors, so surfaces are testable
 * without mounting heavy SFCs.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { ApiError, errMessage } from '../api/errors';
import { errorCodeMessage, errorCodeTitle } from '../i18n/errors';
import type { PhlixErrorLocale } from '../i18n/errors';

/** The `{title, description}` pair an EmptyState-style card renders. */
export interface WireErrorCard {
  title: string;
  description: string;
}

/**
 * The wire error code carried by a thrown value, or `null` when there is none
 * (promoted verbatim from `searchErrorCode` — the contracts-law `{error,
 * code}` envelope carried in `ApiError.body`, the same slot
 * `useAuthStore.parseErrorCode` and `isTmdbUnconfigured` read).
 */
export function wireErrorCode(e: unknown): string | null {
  if (e instanceof ApiError) {
    const body = e.body;
    if (body !== null && typeof body === 'object' && typeof (body as { code?: unknown }).code === 'string') {
      return (body as { code: string }).code;
    }
  }
  return null;
}

/**
 * Classify a parsed code into a card: a code with a catalog title localizes
 * {title, message} through `src/i18n/errors.ts`; anything else returns the
 * caller's `generic` card verbatim.
 */
export function wireErrorInfo(
  code: string | null,
  generic: WireErrorCard,
  locale?: PhlixErrorLocale | null,
): WireErrorCard {
  const title = errorCodeTitle(code, locale);
  if (title !== null) {
    return { title, description: errorCodeMessage(code, locale) };
  }
  return generic;
}

/**
 * One line of classified copy for surfaces with a single text slot (rails,
 * toast bodies, card descriptions under a static title). For `ApiError`
 * throws the code routes through the catalog message chain and an
 * unregistered code yields the `generic` line — raw server debug text never
 * survives. Non-`ApiError` throws keep their own (client-written) message,
 * the `errMessage` law.
 */
export function wireErrorLine(e: unknown, generic: string, locale?: PhlixErrorLocale | null): string {
  if (e instanceof ApiError) {
    return errorCodeMessage(wireErrorCode(e), locale, generic);
  }
  return errMessage(e, generic);
}
