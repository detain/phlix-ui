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
export declare function wireErrorCode(e: unknown): string | null;
/**
 * Classify a parsed code into a card: a code with a catalog title localizes
 * {title, message} through `src/i18n/errors.ts`; anything else returns the
 * caller's `generic` card verbatim.
 */
export declare function wireErrorInfo(code: string | null, generic: WireErrorCard, locale?: PhlixErrorLocale | null): WireErrorCard;
/**
 * One line of classified copy for surfaces with a single text slot (rails,
 * toast bodies, card descriptions under a static title). For `ApiError`
 * throws the code routes through the catalog message chain and an
 * unregistered code yields the `generic` line — raw server debug text never
 * survives. Non-`ApiError` throws keep their own (client-written) message,
 * the `errMessage` law.
 */
export declare function wireErrorLine(e: unknown, generic: string, locale?: PhlixErrorLocale | null): string;
