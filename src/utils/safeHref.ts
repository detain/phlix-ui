/**
 * Allow-list sanitizer for wire-supplied link destinations.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Admit only `http:`/`https:` URLs and relative references from an untrusted
 * link destination; everything else returns `undefined`.
 *
 * This is an ALLOW-LIST (M-UI-15 [review ui__secaudit m2]): the accepted set is
 * enumerated — the two web schemes plus relative forms (`/path`, `./p`, `../p`,
 * `path.html`, `#anchor`, `?query`, and the empty string) — and any value whose
 * scheme is not exactly `http` or `https` (case-insensitive) fails closed. The
 * previous shape was a blocklist over `javascript:`/`data:`/`vbscript:`, which
 * passed `blob:`/`file:`/`about:`/`ftp:`/`mailto:`/`tel:` and protocol-relative
 * `//host` purely because nobody had enumerated them. Parse-don't-validate
 * inverts that: the spellings nobody listed are the default-deny case, so the
 * guard cannot be lapped by a scheme being invented after the code shipped.
 * This mirrors the estate's own direction of travel — the token-value guard in
 * `composables/themeTokens.ts` is "a grammar, not a blocklist", and tizen's
 * `discovery/lanDiscovery.ts` already REJECTS `file://`/`//host` rows by
 * allow-list on the same data class.
 *
 * The scheme probe strips ALL control and whitespace characters first (L6):
 * browsers ignore embedded control chars like `\x01` or newlines when parsing
 * a URL, so a raw anchored classifier would happily let `ht\0ps://…` be judged
 * by its broken spelling. Classification runs on the stripped probe; the
 * ORIGINAL bytes are what gets returned (identity, never a rewrite — signed
 * query strings must survive byte-for-byte).
 *
 * `//host` is deliberately NOT a relative form: a protocol-relative reference
 * silently inherits the page's scheme and re-points at any host, which is
 * exactly the row class tizen's discovery allow-list refuses. A schemeless
 * value that only LOOKS like one (`https` with no colon, `java%09script:`) is
 * a relative path per RFC 3986 and passes as one — the browser agrees.
 *
 * Behavior change disclosed (M13-era dist cascade, phase-3 re-vendor):
 * `mailto:`/`tel:` now return `undefined` where they previously passed. The
 * estate-wide census for this conversion (2026-11-03: `@phlix/shared` settings
 * schema, server/hub help-link data, every vendored `/app` and widget bundle,
 * and all consumer sources) found zero producers of either scheme at any
 * `:href`/`window.open` sink, and zero call sites of this function outside
 * this package; pass-through was documented capability, not used capability.
 *
 * Returns `undefined` for a rejected value so callers bind it straight into a
 * `:href` (Vue removes an `undefined` attribute — the anchor renders inert) and
 * can short-circuit `window.open` with the same truthiness check.
 *
 * Home of this law was `PhlixApp.vue`'s private helper, applied only to the
 * config menu; M-UI-11 [review ui__seceng MAJ-1] promotes it to THE shared
 * sink guard for every anchor/window.open whose value originates from
 * wire/remote data (plugin catalogs, settings-schema helpLinks, photo
 * metadata, peer-advertised server URLs). Published from the package barrel
 * since the r2 rework so host apps guard their own sinks with the same
 * primitive rather than re-deriving weaker lists per client.
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
 * @return The href unchanged when its scheme is admitted, `undefined` otherwise.
 */
export function safeHref(href: string): string | undefined {
  // The control chars ARE the point (L6): browsers ignore them inside URL
  // schemes, so the classifier must strip them before the scheme test.
  // eslint-disable-next-line no-control-regex
  const probe = href.replace(/[\x00-\x20]/g, '');
  // Empty, fragment, and query references are same-document by construction.
  if (probe === '' || probe.startsWith('#') || probe.startsWith('?')) return href;
  const scheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.exec(probe);
  if (scheme === null) {
    // Schemeless: relative, unless it is the protocol-relative authority form.
    return probe.startsWith('//') ? undefined : href;
  }
  const name = scheme[0].slice(0, -1).toLowerCase();
  return name === 'http' || name === 'https' ? href : undefined;
}
