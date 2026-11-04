import type { PhlixErrorLocale } from '../i18n/errors';
/** Legacy pseudo-code texts the server emits in `error` (kept for pre-W2 servers). */
export declare const LEGACY_ACCESS_SCHEDULE_TEXT = "AccessScheduled";
export declare const LEGACY_STREAM_LIMIT_TEXT = "StreamLimitExceeded";
/**
 * Resolve a hard playback block from an `ApiError` body, or `null` when the
 * body carries neither a registered code nor a legacy pseudo-code text.
 */
export declare function playbackBlockingMessage(body: unknown, locale?: PhlixErrorLocale | null): string | null;
/**
 * Copy for the GENERIC media-load failure card (the non-403/429 arm of
 * PlayerPage's by-id catch). Error-code doctrine (W4): a REGISTERED wire
 * `code` localizes through the contracts catalog — the server's English
 * debug text is never what a member reads. Anything the catalog doesn't
 * name (unregistered code, plain network `TypeError`, or a non-Error throw)
 * keeps the page's pre-existing behavior verbatim: the Error's own message
 * when it has one, else the page's own 'Failed to load media' string.
 * Pure, like {@link playbackBlockingMessage}, so the rail is unit-testable
 * without mounting the heavy SFC.
 */
export declare function mediaLoadErrorMessage(e: unknown, locale?: PhlixErrorLocale | null): string;
