import type { PhlixErrorLocale } from '../i18n/errors';
/** Legacy pseudo-code texts the server emits in `error` (kept for pre-W2 servers). */
export declare const LEGACY_ACCESS_SCHEDULE_TEXT = "AccessScheduled";
export declare const LEGACY_STREAM_LIMIT_TEXT = "StreamLimitExceeded";
/**
 * Resolve a hard playback block from an `ApiError` body, or `null` when the
 * body carries neither a registered code nor a legacy pseudo-code text.
 *
 * phlix-ui-player-029: when only the legacy SCREAMING text matches, the copy
 * is no longer an English literal embedded here — it routes through the
 * localized catalog for the canonical code that text stands for.
 */
export declare function playbackBlockingMessage(body: unknown, locale?: PhlixErrorLocale | null): string | null;
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
export declare function localizedFailureMessage(e: unknown, locale: PhlixErrorLocale | null | undefined, localized: string): string;
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
export declare function mediaLoadErrorMessage(e: unknown, locale?: PhlixErrorLocale | null): string;
