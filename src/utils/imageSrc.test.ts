/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { resolveImageSrc, resolveImageSrcset, isRewritableImagePath } from './imageSrc';

/**
 * S241 — the resolution rule itself.
 *
 * Every assertion here reads the RESOLVED STRING, never "the helper was called":
 * a no-op helper (`return url`) passes a call-count assertion and fails every one
 * of these.
 */

/** The relay-proxy base the hub provides for a selected server. */
const RELAY = 'https://hub.example/api/v1/servers/srv-7/proxy';

describe('resolveImageSrc — root-relative artwork resolves against the relay base', () => {
  it('prefixes a signed artwork path and preserves the query byte-for-byte', () => {
    const signed = '/api/v1/artwork/abc-123?size=w500&exp=1785000000&sig=deadbeefcafe';
    expect(resolveImageSrc(RELAY, signed)).toBe(
      'https://hub.example/api/v1/servers/srv-7/proxy/api/v1/artwork/abc-123?size=w500&exp=1785000000&sig=deadbeefcafe',
    );
  });

  it('leaves the signed query EXACTLY as it arrived (order, casing, encoding)', () => {
    // phlix-server signs the PATH only (`SignedUrl::canonicalResource()` strips
    // from the first `?`), so `size` is not signed material. What must survive
    // is the `sig` VALUE: a URL round-trip re-encodes it (`%2F`→`/`, `+`↔`%20`)
    // and the signature then fails, so the image silently 401s. Assert the tail
    // is untouched — the ordering assertions below stand as a cheap proof that
    // no round-trip happened at all.
    const query = '?size=w500&exp=1785000000&sig=aB%2FcD%2B9%3D';
    const out = String(resolveImageSrc(RELAY, `/api/v1/artwork/x${query}`));
    expect(out.endsWith(`/api/v1/artwork/x${query}`)).toBe(true);
    expect(out).toBe(`${RELAY}/api/v1/artwork/x${query}`);
    // Nothing was percent-decoded, re-encoded or re-ordered.
    expect(out).toContain('sig=aB%2FcD%2B9%3D');
    expect(out.indexOf('size=')).toBeLessThan(out.indexOf('exp='));
    expect(out.indexOf('exp=')).toBeLessThan(out.indexOf('sig='));
  });

  it('resolves an avatar path', () => {
    expect(resolveImageSrc(RELAY, '/api/v1/users/u-1/avatar')).toBe(
      'https://hub.example/api/v1/servers/srv-7/proxy/api/v1/users/u-1/avatar',
    );
  });

  it('resolves photo and book paths', () => {
    expect(resolveImageSrc(RELAY, '/api/v1/photo/photos/p1/thumbnail?exp=1&sig=2')).toBe(
      `${RELAY}/api/v1/photo/photos/p1/thumbnail?exp=1&sig=2`,
    );
    expect(resolveImageSrc(RELAY, '/api/v1/books/b1/cover?exp=1&sig=2')).toBe(
      `${RELAY}/api/v1/books/b1/cover?exp=1&sig=2`,
    );
  });

  it('trims trailing slashes on the base so the join never doubles them', () => {
    expect(resolveImageSrc('https://hub.example/proxy/', '/api/v1/artwork/x')).toBe(
      'https://hub.example/proxy/api/v1/artwork/x',
    );
    expect(resolveImageSrc('https://hub.example/proxy///', '/api/v1/artwork/x')).toBe(
      'https://hub.example/proxy/api/v1/artwork/x',
    );
  });
});

describe('resolveImageSrc — THE CONTROL: an absolute URL passes through byte-identical', () => {
  it.each([
    ['https://image.tmdb.org/t/p/w500/aBcDeF.jpg'],
    ['http://assets.fanart.tv/fanart/movies/1/moviebackground/x.jpg'],
    ['https://image.tmdb.org/t/p/w500/x.jpg?a=1&b=2#frag'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=='],
    ['blob:https://hub.example/9f0c-4a1b'],
    // Protocol-relative: absolute (inherits the page scheme), NOT a server path.
    ['//cdn.example.com/poster.jpg'],
    // `/\` folds to `//` in the WHATWG parser, so it is protocol-relative too.
    ['/\\cdn.example.com/poster.jpg'],
  ])('%s is returned unchanged', (url) => {
    expect(resolveImageSrc(RELAY, url)).toBe(url);
  });

  it('an absolute URL is unchanged even under a base that WOULD rewrite a path', () => {
    // The media server relies on this: it serves every relative path itself and a
    // mangled absolute CDN link would break posters that render correctly today.
    const cdn = 'https://image.tmdb.org/t/p/w500/x.jpg';
    expect(resolveImageSrc(RELAY, cdn)).toBe(cdn);
    expect(resolveImageSrc('', cdn)).toBe(cdn);
    expect(resolveImageSrc('/api', cdn)).toBe(cdn);
  });
});

describe('resolveImageSrc — no base, no rewrite (the media-server no-op)', () => {
  it('returns a root-relative path unchanged when the base is empty', () => {
    // On the media server `mediaApiBase` is the app's own `apiBase`, normally ''.
    expect(resolveImageSrc('', '/api/v1/artwork/x?size=w500')).toBe('/api/v1/artwork/x?size=w500');
    expect(resolveImageSrc('/', '/api/v1/artwork/x')).toBe('/api/v1/artwork/x');
  });

  it('passes null / undefined / empty through without coercing to a string', () => {
    // Vue drops a null/undefined :src; coercing to '' would make the browser
    // re-request the current document as an image.
    expect(resolveImageSrc(RELAY, null)).toBeNull();
    expect(resolveImageSrc(RELAY, undefined)).toBeUndefined();
    expect(resolveImageSrc(RELAY, '')).toBe('');
  });

  it('does not rewrite a bare "/"', () => {
    expect(resolveImageSrc(RELAY, '/')).toBe('/');
  });
});

describe('isRewritableImagePath', () => {
  it.each([
    ['/api/v1/artwork/x', true],
    ['/a', true],
    ['//cdn/x', false],
    ['/\\cdn/x', false],
    ['/', false],
    ['', false],
    ['https://cdn/x', false],
    ['relative/x', false],
  ])('%s → %s', (url, expected) => {
    expect(isRewritableImagePath(url)).toBe(expected);
  });
});

describe('resolveImageSrcset', () => {
  it('resolves every candidate and keeps its descriptor', () => {
    const srcset = '/api/v1/artwork/x?size=w200&sig=a 200w, /api/v1/artwork/x?size=w500&sig=b 500w';
    expect(resolveImageSrcset(RELAY, srcset)).toBe(
      `${RELAY}/api/v1/artwork/x?size=w200&sig=a 200w, ${RELAY}/api/v1/artwork/x?size=w500&sig=b 500w`,
    );
  });

  it('leaves absolute candidates alone while resolving relative ones beside them', () => {
    const srcset = 'https://image.tmdb.org/t/p/w200/x.jpg 200w, /api/v1/artwork/x?size=w500 500w';
    expect(resolveImageSrcset(RELAY, srcset)).toBe(
      `https://image.tmdb.org/t/p/w200/x.jpg 200w, ${RELAY}/api/v1/artwork/x?size=w500 500w`,
    );
  });

  it('handles density descriptors and a single descriptor-less candidate', () => {
    expect(resolveImageSrcset(RELAY, '/api/v1/artwork/x 2x')).toBe(`${RELAY}/api/v1/artwork/x 2x`);
    expect(resolveImageSrcset(RELAY, '/api/v1/artwork/x')).toBe(`${RELAY}/api/v1/artwork/x`);
  });

  it('is a no-op with no base, and passes null/undefined/blank through', () => {
    expect(resolveImageSrcset('', '/a 1x, /b 2x')).toBe('/a 1x, /b 2x');
    expect(resolveImageSrcset(RELAY, null)).toBeNull();
    expect(resolveImageSrcset(RELAY, undefined)).toBeUndefined();
    expect(resolveImageSrcset(RELAY, '   ')).toBe('   ');
  });
});
