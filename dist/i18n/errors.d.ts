/**
 * errors.ts — the client-side ERROR-CODE message catalog (UI W4 of the
 * error-code doctrine).
 *
 * DOCTRINE: the wire carries stable machine codes (the registry lives in
 * `@phlix/contracts`); CLIENTS localize by code; the server's English
 * `message`/`error` text is a debug fallback, never the primary string. This
 * module is the code→message half of that contract for every locale this
 * package ships.
 *
 * WHY A SEPARATE LAYER AND NOT `errors.*` KEYS IN `DEFAULT_MESSAGES`:
 * every `src/i18n/locales/*.ts` bundle is `satisfies PhlixMessages` with exact
 * key-identity against the 412-key UI-chrome catalog, and downstream clients
 * (tizen, windows) PIN bundle↔installed equality at the release tag. Folding
 * ~147 registry-adjacent error strings into the main catalog would force churn
 * in every equality pin on each registry edit. The error catalog is instead a
 * SEPARATE layer keyed by the contracts wire strings, complete for all seven
 * locales, and validated against `ERROR_CODES` by `errors.test.ts` — adding a
 * registry code becomes an explicit catalog edit here, not a `PhlixMessages`
 * version-break everywhere.
 *
 * SHAPE: one flat `Record<ErrorCode, string>` per locale — the compiler makes
 * missing/extra keys a COMPILE error (same discipline as the locale bundles).
 * Messages carry NO `{placeholder}` tokens (error strings are static advice;
 * per-request detail rides the server `error` text through the fallback).
 * Titles exist only for the small set of codes rendered as an EmptyState
 * headline (see `ERROR_TITLES`).
 *
 * ACCESS ORDER of {@link errorCodeMessage}: locale catalog → `en` catalog →
 * caller fallback (typically the server's text) → generic error label.
 * Unknown/empty/non-string codes degrade through that chain; nothing throws.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type ErrorCode } from '@phlix/contracts';
import type { PhlixLocaleCode } from './locales';
/** Every locale the error catalog is complete for (English plus the six bundles). */
export type PhlixErrorLocale = 'en' | PhlixLocaleCode;
/** One locale's complete code→message map, keyed by the contracts wire strings. */
export type PhlixErrorCatalog = Record<ErrorCode, string>;
/**
 * Headline strings for the codes rendered as an EmptyState TITLE (Browse's
 * library-load failure card). Sparse by design: most codes only need a body.
 */
export declare const ERROR_TITLES: Record<PhlixErrorLocale, Partial<Record<ErrorCode, string>>>;
/** Last-resort label when a code is unknown AND the caller has no fallback. */
export declare const GENERIC_ERROR_MESSAGE: Record<PhlixErrorLocale, string>;
/** Is `value` an exact wire code from the contracts registry? */
export declare function isRegisteredErrorCode(value: unknown): value is ErrorCode;
/** All complete catalogs, keyed by locale tag. */
export declare const ERROR_MESSAGES: Record<PhlixErrorLocale, PhlixErrorCatalog>;
/**
 * Localize a wire error code.
 *
 * Order: locale catalog → English catalog → caller `fallback` (typically the
 * server's debug text) → generic error label. Registered codes always resolve
 * from a catalog (completeness is compile-enforced), so the fallback path is
 * exactly the "unknown wire string" path. Never throws.
 */
export declare function errorCodeMessage(code: string | null | undefined, locale?: PhlixErrorLocale | null, fallback?: string | null): string;
/**
 * EmptyState headline for codes that have one (see `ERROR_TITLES`); `null`
 * when the code carries no title (the caller keeps its own generic title).
 */
export declare function errorCodeTitle(code: string | null | undefined, locale?: PhlixErrorLocale | null): string | null;
