import { type Ref, type ComputedRef } from 'vue';
/**
 * Set the app name used as the title suffix (e.g. from `branding.wordmark`).
 * Called once by `createPhlixApp` at boot. A blank value falls back to the
 * default so the suffix is never empty.
 */
export declare function setAppName(name: string | null | undefined): void;
/**
 * Format a page title into the canonical `"<title> · <appName>"` shape. A
 * null/empty/whitespace `title` yields just the app name. Exported so callers
 * (and tests) can compute the exact string the document will receive without a
 * DOM write.
 */
export declare function formatPageTitle(title: string | null | undefined): string;
/**
 * Set `document.title` to `"<title> · <appName>"` (or just the app name when
 * `title` is null/empty). No-op when `document` is unavailable (SSR/tests
 * without a DOM).
 */
export declare function setPageTitle(title: string | null | undefined): void;
/**
 * Watch a reactive source (a `ref`, a `computed`, or a plain getter) and keep
 * the document title in sync with it for the lifetime of the calling reactive
 * scope (a component `setup()` or an `effectScope`). Use this on pages whose
 * title depends on async-loaded data — the title updates the moment the data
 * resolves, not only on navigation.
 *
 * Navigating away is handled by the router `afterEach` hook, which resets the
 * title to the next route's default; this composable therefore does not need to
 * restore a previous title on unmount.
 *
 * @param source A ref/computed of the title string (or null), or a getter.
 */
export declare function usePageTitle(source: Ref<string | null | undefined> | ComputedRef<string | null | undefined> | (() => string | null | undefined)): void;
