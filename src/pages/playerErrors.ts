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
 * Pure + side-effect free so it is unit-testable without mounting PlayerPage.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { errorCodeMessage, isRegisteredErrorCode } from '../i18n/errors';
import type { PhlixErrorLocale } from '../i18n/errors';

/** Legacy pseudo-code texts the server emits in `error` (kept for pre-W2 servers). */
export const LEGACY_ACCESS_SCHEDULE_TEXT = 'AccessScheduled';
export const LEGACY_STREAM_LIMIT_TEXT = 'StreamLimitExceeded';

function readWireString(body: unknown, key: 'code' | 'error'): string | null {
  if (typeof body !== 'object' || body === null) return null;
  const value = (body as Record<string, unknown>)[key];
  return typeof value === 'string' && value !== '' ? value : null;
}

/**
 * Resolve a hard playback block from an `ApiError` body, or `null` when the
 * body carries neither a registered code nor a legacy pseudo-code text.
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
    return 'Playback blocked by access schedule. Try again during allowed hours.';
  }
  if (legacyText === LEGACY_STREAM_LIMIT_TEXT) {
    return 'Stream limit reached. Stop another stream to continue watching.';
  }
  return null;
}
