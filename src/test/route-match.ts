/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S193 — route matching for the suite's `fetch` doubles.
 *
 * House style used to branch a stub on `url.includes('/api/v1/…')`, which CANNOT
 * distinguish the real route from a suffix-appended one:
 * `'…/users/me/next-up-MUTATED'.includes('…/users/me/next-up')` is **`true`**. So
 * the double answered a request for a route that does not exist, and an
 * "it hit the endpoint" assertion written the same way agreed with it. Measured
 * 2026-08-03 (PR #291): pointing `api/nextUp.ts` at
 * `/api/v1/users/me/next-up-MUTATED` left the WHOLE suite green — 239 files,
 * 4478 tests — with the rail served from a 404 route.
 *
 * ⚠ The obvious fix is wrong. `pathname === path` breaks the moment a media base
 * is set: on the hub `useMediaApiBase` resolves to the relay-proxy base and the
 * real request is `/api/v1/servers/{id}/proxy/api/v1/users/me/next-up`. Exact
 * equality silently stops matching, the request falls through to the stub's
 * default payload, and the feature under test hides FOR THE WRONG REASON. Every
 * pre-existing test mounts with base `''`, so no existing test can catch that
 * regression — {@link isRoute} is therefore suffix-exact but prefix-tolerant.
 *
 * @see src/test/route-match.test.ts — the matcher's own tests, including the
 *      base-prefixed case and the suffix-append case that motivate it.
 */

/**
 * The pathname of a stubbed fetch URL: origin and query string removed.
 *
 * Accepts `unknown` because that is what a `vi.fn((url: unknown) => …)` double
 * receives, and returns `''` for anything that is not a parseable URL string so a
 * matcher can never throw inside a stub.
 */
export function pathnameOf(url: unknown): string {
  if (typeof url !== 'string') return '';
  try {
    return new URL(url, 'http://localhost').pathname;
  } catch {
    return '';
  }
}

/** The query string of a stubbed fetch URL, as `URLSearchParams`. */
export function searchOf(url: unknown): URLSearchParams {
  if (typeof url !== 'string') return new URLSearchParams();
  try {
    return new URL(url, 'http://localhost').searchParams;
  } catch {
    return new URLSearchParams();
  }
}

/**
 * Whether a stubbed fetch URL addresses exactly `path` — **suffix-exact, prefix-
 * tolerant**.
 *
 * The URL's pathname (query stripped) must END WITH `path`, so
 * `/api/v1/servers/s1/proxy/api/v1/libraries` matches `/api/v1/libraries` (the hub
 * relay-proxy base) while `/api/v1/libraries-MUTATED` does not.
 *
 * `path` must be absolute: a bare `'libraries'` would match
 * `/api/v1/other-libraries` and reintroduce exactly the looseness this replaces,
 * so it throws rather than matching sloppily.
 */
export function isRoute(url: unknown, path: string): boolean {
  if (!path.startsWith('/')) {
    throw new TypeError(`isRoute() needs an absolute path, got ${JSON.stringify(path)}`);
  }
  const pathname = pathnameOf(url);
  return pathname !== '' && pathname.endsWith(path);
}

/**
 * Whether a stubbed fetch URL carries query parameter `name` — optionally with a
 * specific `value`.
 *
 * Some stubs branch on a QUERY parameter rather than a path (`parentId=` selects
 * the series-children fetch on the same `/api/v1/media` route), which is not a
 * path suffix and must not be forced through {@link isRoute}. Reading it as a
 * parsed parameter is still tighter than `url.includes('parentId')`, which also
 * fires on `?notParentId=`, on `?x=parentId` and on a path segment of that name.
 */
export function hasQuery(url: unknown, name: string, value?: string): boolean {
  const params = searchOf(url);
  if (value === undefined) return params.has(name);
  return params.get(name) === value;
}
