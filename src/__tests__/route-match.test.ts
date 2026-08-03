/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { pathnameOf, searchOf, isRoute, hasQuery } from '../test/route-match';

// NOTE: this file lives in `src/__tests__/`, NOT beside `src/test/route-match.ts`.
// `src/test/**` is excluded from coverage (it is test harness, not shipped source), and
// `src/__tests__/vitest-coverage-include.test.ts` fails any source file that has a
// COLOCATED `*.test.ts` yet is excluded from the report — a colocated
// `src/test/route-match.test.ts` reds that guard with
// `expected [ 'src/test/route-match.ts' ] to deeply equal []`.

/**
 * S193 — the matcher's own tests.
 *
 * Every fetch double in this suite now decides "is this request for the route I
 * stub?" through {@link isRoute}. That makes this file the one place the RULE is
 * pinned, so the three properties that matter each have a test that would fail if
 * the rule regressed to either of the two wrong answers:
 *
 *  1. `.includes()` — self-matches a suffix-appended path (the S193 defect).
 *  2. `===` — stops matching under a hub relay-proxy base (the S193 landmine).
 */
describe('S193 route matching — suffix-exact, prefix-tolerant', () => {
  const NEXT_UP = '/api/v1/users/me/next-up';
  const HUB_BASE = '/api/v1/servers/srv-1/proxy';

  it('matches the plain route', () => {
    expect(isRoute(NEXT_UP, NEXT_UP)).toBe(true);
  });

  it('REJECTS a suffix-appended route — the defect `.includes()` could not see', () => {
    // The literal measurement from PR #291, as an assertion.
    expect(`${NEXT_UP}-MUTATED`.includes(NEXT_UP)).toBe(true);
    expect(isRoute(`${NEXT_UP}-MUTATED`, NEXT_UP)).toBe(false);
    expect(isRoute(`${NEXT_UP}x`, NEXT_UP)).toBe(false);
    expect(isRoute(`${NEXT_UP}/extra`, NEXT_UP)).toBe(false);
  });

  it('STILL matches under a hub relay-proxy base — the landmine `===` walks into', () => {
    const hub = `${HUB_BASE}${NEXT_UP}`;
    expect(isRoute(hub, NEXT_UP)).toBe(true);
    // …and the wrong fix, spelled out, so the reason this is `endsWith` is legible.
    expect(pathnameOf(hub) === NEXT_UP).toBe(false);
  });

  it('ignores the query string and an absolute origin', () => {
    expect(isRoute(`${NEXT_UP}?limit=20`, NEXT_UP)).toBe(true);
    expect(isRoute(`http://localhost:8096${NEXT_UP}?limit=20`, NEXT_UP)).toBe(true);
    expect(isRoute(`https://hub.example${HUB_BASE}${NEXT_UP}`, NEXT_UP)).toBe(true);
  });

  it('does not confuse a sibling route that merely shares a prefix', () => {
    expect(isRoute('/api/v1/media/most-watched', '/api/v1/media')).toBe(false);
    expect(isRoute('/api/v1/media', '/api/v1/media/most-watched')).toBe(false);
    expect(isRoute('/api/v1/music/albums/Blue', '/api/v1/music/albums')).toBe(false);
  });

  it('treats a non-string, an unparseable value and a missing URL as no match', () => {
    expect(isRoute(undefined, NEXT_UP)).toBe(false);
    expect(isRoute(null, NEXT_UP)).toBe(false);
    expect(isRoute(42, NEXT_UP)).toBe(false);
    expect(isRoute(new Request(`http://localhost${NEXT_UP}`), NEXT_UP)).toBe(false);
    expect(pathnameOf(undefined)).toBe('');
    expect(pathnameOf('')).toBe('/');
  });

  it('refuses a relative path rather than matching sloppily', () => {
    // A bare segment would match `/api/v1/other-libraries`, which is the very
    // looseness S193 removed — so it is a programming error, not a soft no-match.
    expect(() => isRoute('/api/v1/libraries', 'libraries')).toThrow(TypeError);
    expect(() => isRoute('/api/v1/libraries', 'api/v1/libraries')).toThrow(/absolute path/);
  });
});

describe('S193 query matching', () => {
  it('reads a parsed parameter, not a substring of the whole URL', () => {
    expect(hasQuery('/api/v1/media?parentId=s1', 'parentId')).toBe(true);
    expect(hasQuery('/api/v1/media?parentId=s1', 'parentId', 's1')).toBe(true);
    expect(hasQuery('/api/v1/media?parentId=s1', 'parentId', 's2')).toBe(false);
    expect(hasQuery('/api/v1/media?limit=20', 'parentId')).toBe(false);
    // `url.includes('parentId')` says true for all three of these; a parsed
    // parameter says false, which is the point.
    expect('/api/v1/media?xparentId=1'.includes('parentId')).toBe(true);
    expect(hasQuery('/api/v1/media?xparentId=1', 'parentId')).toBe(false);
    expect('/api/v1/media?sort=parentId'.includes('parentId')).toBe(true);
    expect(hasQuery('/api/v1/media?sort=parentId', 'parentId')).toBe(false);
    expect('/api/v1/media/parentId'.includes('parentId')).toBe(true);
    expect(hasQuery('/api/v1/media/parentId', 'parentId')).toBe(false);
  });

  it('survives a non-string and an empty query', () => {
    expect(searchOf(undefined).has('parentId')).toBe(false);
    expect(searchOf('/api/v1/media').has('parentId')).toBe(false);
    expect(hasQuery(null, 'parentId')).toBe(false);
    expect([...searchOf('/api/v1/media?a=1&b=2').keys()]).toEqual(['a', 'b']);
  });
});
