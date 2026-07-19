/**
 * Open-redirect guard for post-auth `?redirect=` hops.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Validate a `?redirect=` query value as a SAFE INTERNAL SPA path.
 *
 * Only same-origin app paths under `/app/` are honoured — everything else
 * (absolute URLs `https://evil`, protocol-relative `//evil.com`, backslash
 * tricks `/\evil`, or any path not under the SPA root) is rejected to prevent
 * an open redirect. The caller falls back to its normal home when this returns
 * `null`.
 *
 * A value must start with `/app/` (so `//host` and `/\host` already fail); the
 * extra explicit checks are defence-in-depth in case the prefix ever changes.
 *
 * @param value The raw `route.query.redirect` (may be a string, array, or undefined).
 * @return The path when it is a safe internal `/app/` route, else `null`.
 */
export function safeRedirect(value: unknown): string | null {
  if (typeof value !== 'string' || value === '') {
    return null;
  }
  if (value.startsWith('//') || value.startsWith('/\\')) {
    return null;
  }
  if (!value.startsWith('/app/')) {
    return null;
  }
  return value;
}
