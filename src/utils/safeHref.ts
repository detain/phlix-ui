/**
 * Blocklist sanitizer for wire-supplied link destinations.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Drop script-y URL schemes from an untrusted link destination.
 *
 * Allows `http(s)`/`mailto`/`tel`/relative/hash paths; blocks
 * `javascript:`/`data:`/`vbscript:`. The scheme probe strips ALL control and
 * whitespace characters first (L6): browsers ignore embedded control chars like
 * `\x01` or newlines when parsing a URL, so a raw anchored regex would happily
 * ship `java\x09script:` past the blocklist.
 *
 * Returns `undefined` for a blocked value so callers bind it straight into a
 * `:href` (Vue removes an `undefined` attribute — the anchor renders inert) and
 * can short-circuit `window.open` with the same truthiness check.
 *
 * Home of this law was `PhlixApp.vue`'s private helper, applied only to the
 * config menu; M-UI-11 [review ui__seceng MAJ-1] promotes it to THE shared
 * sink guard for every anchor/window.open whose value originates from
 * wire/remote data (plugin catalogs, settings-schema helpLinks, photo
 * metadata, peer-advertised server URLs).
 *
 * Census law established by this commit, mechanically checkable: every
 * dynamic `:href`/`window.open` site in src/ either binds through this
 * function or carries an `EXPLICITLY TRUSTED` census comment at its
 * definition site (literal-prefix relative routes, constant-scheme builder
 * templates, integrator API surfaces, and img/media `:src` — elements that
 * never execute script schemes).
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
