/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { watch, onScopeDispose, type Ref, type ComputedRef } from 'vue';

/**
 * usePageTitle (U1) — centralized `document.title` management for the SPA.
 *
 * The site sets no document title on its own; this module is the single place
 * that formats and writes it. Titles read `"<title> · Phlix"` (or just the app
 * name when the page-specific part is empty), so the separator + suffix + app
 * name live in exactly one spot.
 *
 * Two entry points:
 * - {@link setPageTitle} — imperative, used by the router `afterEach` hook (for
 *   static/route-default titles) and by pages that resolve their title from
 *   async-loaded data (media/series name, library name, the playing item).
 * - {@link usePageTitle} — a small composable that watches a ref/getter and
 *   keeps the document title in sync while the owning component is mounted.
 *
 * SSR-safe: every `document` access is guarded behind `typeof document`, so
 * importing/using this in a non-browser context is a no-op rather than a throw.
 */

/** The separator between the page-specific part and the app-name suffix. */
const SEPARATOR = ' · ';

/** Default app name (wordmark) for the title suffix. Overridable per app via
 *  {@link setAppName} (the host's `branding.wordmark`). */
const DEFAULT_APP_NAME = 'Phlix';

/** Module-level app name used as the title suffix. Mutable so a host app can set
 *  its own wordmark once at boot (createPhlixApp) without threading it through
 *  every `setPageTitle` call site. */
let appName = DEFAULT_APP_NAME;

/**
 * Set the app name used as the title suffix (e.g. from `branding.wordmark`).
 * Called once by `createPhlixApp` at boot. A blank value falls back to the
 * default so the suffix is never empty.
 */
export function setAppName(name: string | null | undefined): void {
  appName = name && name.trim() ? name.trim() : DEFAULT_APP_NAME;
}

/**
 * Format a page title into the canonical `"<title> · <appName>"` shape. A
 * null/empty/whitespace `title` yields just the app name. Exported so callers
 * (and tests) can compute the exact string the document will receive without a
 * DOM write.
 */
export function formatPageTitle(title: string | null | undefined): string {
  const part = typeof title === 'string' ? title.trim() : '';
  return part ? `${part}${SEPARATOR}${appName}` : appName;
}

/**
 * Set `document.title` to `"<title> · <appName>"` (or just the app name when
 * `title` is null/empty). No-op when `document` is unavailable (SSR/tests
 * without a DOM).
 */
export function setPageTitle(title: string | null | undefined): void {
  if (typeof document === 'undefined') return;
  document.title = formatPageTitle(title);
}

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
export function usePageTitle(
  source: Ref<string | null | undefined> | ComputedRef<string | null | undefined> | (() => string | null | undefined),
): void {
  const get = typeof source === 'function' ? source : () => source.value;
  watch(
    get,
    (value) => {
      // Only claim the title once there's a meaningful value; a null/empty
      // source leaves whatever default the route's afterEach hook set (so a
      // still-loading detail page keeps showing e.g. "Browse · Phlix" rather
      // than flashing a bare "Phlix").
      const part = typeof value === 'string' ? value.trim() : '';
      if (part) setPageTitle(part);
    },
    { immediate: true },
  );
  // The afterEach default + the next page's own usePageTitle take over on
  // navigation, so there's nothing to restore here. Registering an (empty)
  // scope-dispose keeps the symmetry obvious and is harmless.
  onScopeDispose(() => {
    /* title hand-off is owned by the router afterEach hook */
  });
}
