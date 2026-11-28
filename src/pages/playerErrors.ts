/**
 * Player-side hard-block decoding for the media-load 403/429 responses
 * (PlayerPage W4 of the error-code doctrine).
 *
 * phlix-server places pseudo-codes in the human `error` TEXT field
 * (`'AccessScheduled'`, `'StreamLimitExceeded'`); server wave W2 added the
 * machine `code` channel (`access.scheduled`, `stream.limit_exceeded`) while
 * keeping those legacy texts verbatim. This helper reads BOTH so it works
 * against pre-W2 and post-W2 servers:
 *   1. `body.code` — when it holds a registered contracts code, the message is
 *      resolved from the localized error catalog (`src/i18n/errors.ts`), e.g.
 *      `access.scheduled` → the locale's scheduled-hours sentence.
 *   2. `body.error` — legacy text match, kept for client releases facing
 *      servers that predate the `code` field.
 *
 * A code the catalog doesn't know is NOT a hard block here — it degrades to
 * `null` and the caller keeps its existing SWR/generic error path, matching
 * pre-W4 behavior for every non-matching 403/429 body.
 *
 * Pure + side-effect free (apart from the developer console echo documented on
 * {@link localizedFailureMessage}) so the rails are unit-testable without
 * mounting PlayerPage.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { ApiError } from '../api/errors';
import { errorCodeMessage, isRegisteredErrorCode } from '../i18n/errors';
import type { PhlixErrorLocale } from '../i18n/errors';

/** Legacy pseudo-code texts the server emits in `error` (kept for pre-W2 servers). */
export const LEGACY_ACCESS_SCHEDULE_TEXT = 'AccessScheduled';
export const LEGACY_STREAM_LIMIT_TEXT = 'StreamLimitExceeded';

/**
 * True only for a genuine key/value record — a non-null object that is NOT an
 * array. Arrays are `typeof 'object'` too, and the old bare guard plus a cast
 * let a wire body shaped like an array slip through and still be indexed;
 * anything that is not a record is refused outright.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readWireString(body: unknown, key: 'code' | 'error'): string | null {
  if (!isRecord(body)) return null;
  const value = body[key];
  return typeof value === 'string' && value !== '' ? value : null;
}

/**
 * Resolve a hard playback block from an `ApiError` body, or `null` when the
 * body carries neither a registered code nor a legacy pseudo-code text.
 *
 * phlix-ui-player-029: when only the legacy SCREAMING text matches, the copy
 * is no longer an English literal embedded here — it routes through the
 * localized catalog for the canonical code that text stands for.
 */
export function playbackBlockingMessage(
  body: unknown,
  locale?: PhlixErrorLocale | null,
): string | null {
  const wireCode = readWireString(body, 'code');
  if (wireCode !== null && isRegisteredErrorCode(wireCode)) {
    // W2 pairs `stream.limit_exceeded` with the legacy StreamLimitExceeded text
    // and `access.scheduled` with AccessScheduled; `auth.*`/`dlna.*`-style 403s
    // ride the same catalog rail.
    return errorCodeMessage(wireCode, locale);
  }
  const legacyText = readWireString(body, 'error');
  if (legacyText === LEGACY_ACCESS_SCHEDULE_TEXT) {
    return errorCodeMessage('access.scheduled', locale);
  }
  if (legacyText === LEGACY_STREAM_LIMIT_TEXT) {
    return errorCodeMessage('stream.limit_exceeded', locale);
  }
  return null;
}

/**
 * The shared error-rail inversion (phlix-ui-player-015): members read
 * localized text, developers read the raw detail — never the other way round.
 *
 * Order:
 *   1. An `ApiError` whose body carries a REGISTERED wire `code` resolves
 *      through the contracts catalog for `locale` (server English debug text
 *      is doctrine-ineligible for member-facing copy) and logs nothing.
 *   2. Anything else returns the CALLER's `localized` fallback string. When
 *      the throw is an Error with a real message, that raw text is echoed to
 *      `console.error` (the developer channel) instead of into the DOM;
 *      non-Error throws and message-less Errors carry nothing dev-useful, so
 *      they stay silent.
 *
 * Pure of behavior beyond the console echo; side-effect-testable without
 * mounting any page.
 */
export function localizedFailureMessage(
  e: unknown,
  locale: PhlixErrorLocale | null | undefined,
  localized: string,
): string {
  if (e instanceof ApiError) {
    const wireCode = readWireString(e.body, 'code');
    if (wireCode !== null && isRegisteredErrorCode(wireCode)) {
      return errorCodeMessage(wireCode, locale);
    }
  }
  if (e instanceof Error && e.message !== '') {
    console.error('[phlix-ui] unlocalized error detail:', e.message);
  }
  return localized;
}

/**
 * Copy for the GENERIC media-load failure card (the non-403/429 arm of
 * PlayerPage's by-id catch). Error-code doctrine (W4 + phlix-ui-player-015):
 * a REGISTERED wire `code` localizes through the contracts catalog — the
 * server's English debug text is never what a member reads — and every other
 * shape now rides the inverted rail: the member gets the localized generic
 * label from the catalog, while any raw Error message (unregistered proxy
 * debug strings, `TypeError('fetch failed')`, …) is console-only instead of
 * leaking into the DOM. The pre-inversion fallback was the page's own
 * 'Failed to load media' string; the catalog generic ('Something went
 * wrong.') replaces it so the copy follows the locale.
 * Like {@link playbackBlockingMessage}, pure apart from the developer echo.
 */
export function mediaLoadErrorMessage(
  e: unknown,
  locale?: PhlixErrorLocale | null,
): string {
  return localizedFailureMessage(e, locale, errorCodeMessage(null, locale));
}
