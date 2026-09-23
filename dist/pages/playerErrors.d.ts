import type { PhlixErrorLocale } from '../i18n/errors';
/** Legacy pseudo-code texts the server emits in `error` until W2 (do not remove yet). */
export declare const LEGACY_ACCESS_SCHEDULE_TEXT = "AccessSchedule";
export declare const LEGACY_STREAM_LIMIT_TEXT = "StreamLimitExceeded";
/**
 * Resolve a hard playback block from an `ApiError` body, or `null` when the
 * body carries neither a registered code nor a legacy pseudo-code text.
 */
export declare function playbackBlockingMessage(body: unknown, locale?: PhlixErrorLocale | null): string | null;
