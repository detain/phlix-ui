/**
 * Blocklist sanitizer for wire-supplied link destinations.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Drop script-y URL schemes from an untrusted link destination.
 *
 * This is a BLOCKLIST, not an allowlist: it returns `undefined` only for
 * `javascript:`/`data:`/`vbscript:` (after control/space stripping); everything
 * else passes through unchanged — including `blob:`/`file:`/`about:`, which
 * are practically inert for the wire-supplied anchors this guards (no anchor
 * navigation to them executes script; a hostile value reaching them is a
 * server already fully trusted for that payload).
 *
 * The scheme probe strips ALL control and whitespace characters first (L6):
 * browsers ignore embedded control chars like `\x01` or newlines when parsing
 * a URL, so a raw anchored regex would happily ship `java\x09script:` past
 * the blocklist.
 *
 * Returns `undefined` for a blocked value so callers bind it straight into a
 * `:href` (Vue removes an `undefined` attribute — the anchor renders inert) and
 * can short-circuit `window.open` with the same truthiness check.
 *
 * Home of this law was `PhlixApp.vue`'s private helper, applied only to the
 * config menu; M-UI-11 [review ui__seceng MAJ-1] promotes it to THE shared
 * sink guard for every anchor/window.open whose value originates from
 * wire/remote data (plugin catalogs, settings-schema helpLinks, photo
 * metadata, peer-advertised server URLs). Published from the package barrel
 * since the r2 rework so host apps guard their own sinks with the same
 * primitive rather than re-deriving weaker blocklists per client.
 *
 * Census law: every dynamic `:href`/`window.open` site in src/ either binds
 * through this function or carries an `EXPLICITLY TRUSTED` census comment at
 * its definition site (the audited trust classes: literal-prefix relative
 * routes, constant-scheme builder templates, integrator API surfaces).
 * Mechanically enforced since the r2 rework by
 * `eslint-rules/no-raw-wire-href.cjs` (registered in eslint.config.js over
 * src/**, teeth pinned by its rule-test sibling). A separate, narrower class
 * sits OUTSIDE the `:href`/`window.open` surface this law enumerates and is
 * reviewed as config data, not wire data: the `location.href = loginPath`
 * full-page redirects (useAuthStore, api/client) and the constant-path
 * `location.href` OAuth navigations (api/admin/services).
 *
 * @param href The raw, untrusted URL string.
 * @return The href unchanged when safe, `undefined` when the scheme is blocked.
 */
export function safeHref(href: string): string | undefined {
  // The control chars ARE the point (L6): browsers ignore them inside URL
  // schemes, so the sanitizer must strip them before the scheme test.
  // eslint-disable-next-line no-control-regex
  const probe = href.replace(/[\x00-\x20]/g, '');
  return /^(javascript|data|vbscript):/i.test(probe) ? undefined : href;
}
