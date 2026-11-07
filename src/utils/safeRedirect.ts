/**
 * Open-redirect guard for post-auth `?redirect=` hops.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Validate a `?redirect=` query value as a SAFE INTERNAL SPA path.
 *
 * Only paths under the CONFIGURED SPA root are honoured — everything else
 * (absolute URLs `https://evil`, protocol-relative `//evil.com`, backslash
 * tricks `/\evil`, or any path outside the app root) is rejected to prevent
 * an open redirect. The caller falls back to its normal home when this
 * returns `null`.
 *
 * CU-112: the root used to be the hardcoded `'/app'`; every host that mounts
 * elsewhere (hub console, custom routerBase) now passes its own base, so the
 * guard checks the same prefix the routes are actually registered under.
 * The default keeps the old `'/app'` behavior byte-identical.
 *
 * A value must start with `${base}/` (so `//host` and `/\host` already fail
 * for any base); the extra explicit checks are defence-in-depth. An empty
 * base means "mounted at the document root": any `/…` path qualifies (the
 * protocol-relative and backslash traps still reject before that arm).
 *
 * @param value The raw `route.query.redirect` (may be a string, array, or undefined).
 * @param base The SPA root the app is mounted under (`config.routerBase`, default '/app').
 * @return The path when it is a safe internal route under `base`, else `null`.
 */
export function safeRedirect(value: unknown, base = '/app'): string | null {
  if (typeof value !== 'string' || value === '') {
    return null;
  }
  if (value.startsWith('//') || value.startsWith('/\\')) {
    return null;
  }
  const inside = base === '' ? value.startsWith('/') : value.startsWith(`${base}/`);
  if (!inside) {
    return null;
  }
  return value;
}
