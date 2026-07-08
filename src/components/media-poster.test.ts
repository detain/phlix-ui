/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import {
  buildSrcset,
  srcsetHasWidthDescriptor,
  resolvePosterSources,
  DEFAULT_POSTER_SIZES,
} from './media-poster';

describe('buildSrcset', () => {
  it('returns undefined for null/undefined input', () => {
    expect(buildSrcset(null)).toBeUndefined();
    expect(buildSrcset(undefined)).toBeUndefined();
  });

  it('passes a ready-made srcset string through, trimmed', () => {
    expect(buildSrcset('poster-200.jpg 200w, poster-400.jpg 400w')).toBe(
      'poster-200.jpg 200w, poster-400.jpg 400w',
    );
    expect(buildSrcset('  poster.jpg 2x  ')).toBe('poster.jpg 2x');
  });

  it('returns undefined for an empty or whitespace-only string', () => {
    expect(buildSrcset('')).toBeUndefined();
    expect(buildSrcset('   ')).toBeUndefined();
  });

  it('returns undefined for a non-string, non-array value (defensive)', () => {
    // The MediaItem field is typed, but runtime data from a backend can be junk.
    expect(buildSrcset(42 as unknown as string)).toBeUndefined();
    expect(buildSrcset({} as unknown as string)).toBeUndefined();
  });

  it('returns undefined for an empty array', () => {
    expect(buildSrcset([])).toBeUndefined();
  });

  it('builds width descriptors from {url,width}', () => {
    expect(
      buildSrcset([
        { url: 'a.jpg', width: 200 },
        { url: 'b.jpg', width: 400 },
      ]),
    ).toBe('a.jpg 200w, b.jpg 400w');
  });

  it('rounds fractional widths to an integer', () => {
    expect(buildSrcset([{ url: 'a.jpg', width: 200.6 }])).toBe('a.jpg 201w');
  });

  it('builds density descriptors from {url,density}, trimming trailing zeros', () => {
    expect(
      buildSrcset([
        { url: 'a.jpg', density: 1 },
        { url: 'b.jpg', density: 2.0 },
        { url: 'c.jpg', density: 1.5 },
      ]),
    ).toBe('a.jpg 1x, b.jpg 2x, c.jpg 1.5x');
  });

  it('prefers width over density when both are present', () => {
    expect(buildSrcset([{ url: 'a.jpg', width: 300, density: 2 }])).toBe('a.jpg 300w');
  });

  it('emits a bare URL when no descriptor is given', () => {
    expect(buildSrcset([{ url: 'a.jpg' }])).toBe('a.jpg');
    expect(buildSrcset(['a.jpg'])).toBe('a.jpg');
  });

  it('trims URLs and skips empty/invalid entries', () => {
    expect(
      buildSrcset([
        '  a.jpg  ',
        '',
        '   ',
        null as unknown as string,
        { url: '   ', width: 200 },
        { url: '', width: 400 },
        { url: 42 as unknown as string, width: 600 }, // non-string url → skipped
        { url: 'b.jpg', width: 800 },
      ]),
    ).toBe('a.jpg, b.jpg 800w');
  });

  it('skips non-positive / non-finite descriptors, falling back to a bare URL', () => {
    expect(buildSrcset([{ url: 'a.jpg', width: 0 }])).toBe('a.jpg');
    expect(buildSrcset([{ url: 'a.jpg', width: -10 }])).toBe('a.jpg');
    expect(buildSrcset([{ url: 'a.jpg', density: 0 }])).toBe('a.jpg');
    expect(buildSrcset([{ url: 'a.jpg', width: Infinity }])).toBe('a.jpg');
    expect(buildSrcset([{ url: 'a.jpg', width: NaN }])).toBe('a.jpg');
  });

  it('de-duplicates identical candidates', () => {
    expect(
      buildSrcset([
        { url: 'a.jpg', width: 200 },
        { url: 'a.jpg', width: 200 },
        { url: 'b.jpg', width: 400 },
      ]),
    ).toBe('a.jpg 200w, b.jpg 400w');
  });

  it('returns undefined when every entry is invalid', () => {
    expect(buildSrcset(['', '   ', { url: '' }])).toBeUndefined();
  });
});

describe('srcsetHasWidthDescriptor', () => {
  it('detects width descriptors', () => {
    expect(srcsetHasWidthDescriptor('a.jpg 200w')).toBe(true);
    expect(srcsetHasWidthDescriptor('a.jpg 200w, b.jpg 400w')).toBe(true);
    expect(srcsetHasWidthDescriptor('  a.jpg 200w  ')).toBe(true);
  });

  it('returns false for density-only or descriptor-less srcsets', () => {
    expect(srcsetHasWidthDescriptor('a.jpg 1x, b.jpg 2x')).toBe(false);
    expect(srcsetHasWidthDescriptor('a.jpg')).toBe(false);
    expect(srcsetHasWidthDescriptor('')).toBe(false);
  });

  it('is not fooled by a "w" inside the URL or a malformed descriptor', () => {
    expect(srcsetHasWidthDescriptor('https://cdn/img.jpg?w=200 400w')).toBe(true);
    expect(srcsetHasWidthDescriptor('https://cdn/img.jpg?w=200')).toBe(false);
    expect(srcsetHasWidthDescriptor('a.jpg 200w300')).toBe(false);
  });
});

describe('resolvePosterSources', () => {
  it('omits both attributes when there are no usable sources', () => {
    expect(resolvePosterSources(null)).toEqual({});
    expect(resolvePosterSources('')).toEqual({});
    expect(resolvePosterSources([])).toEqual({});
  });

  it('emits the default sizes alongside a width-descriptor srcset', () => {
    expect(resolvePosterSources([{ url: 'a.jpg', width: 200 }])).toEqual({
      srcset: 'a.jpg 200w',
      sizes: DEFAULT_POSTER_SIZES,
    });
  });

  it('honors an explicit sizes over the default', () => {
    expect(resolvePosterSources([{ url: 'a.jpg', width: 200 }], '300px')).toEqual({
      srcset: 'a.jpg 200w',
      sizes: '300px',
    });
  });

  it('falls back to the default when explicit sizes is blank/null', () => {
    expect(resolvePosterSources('a.jpg 200w', '   ')).toEqual({
      srcset: 'a.jpg 200w',
      sizes: DEFAULT_POSTER_SIZES,
    });
    expect(resolvePosterSources('a.jpg 200w', null)).toEqual({
      srcset: 'a.jpg 200w',
      sizes: DEFAULT_POSTER_SIZES,
    });
  });

  it('does not manufacture a sizes for a density-only srcset', () => {
    expect(resolvePosterSources([{ url: 'a.jpg', density: 2 }])).toEqual({
      srcset: 'a.jpg 2x',
    });
  });

  it('still honors an explicit sizes for a density srcset', () => {
    expect(resolvePosterSources('a.jpg 2x', '180px')).toEqual({
      srcset: 'a.jpg 2x',
      sizes: '180px',
    });
  });

  it('does not add sizes to a descriptor-less srcset', () => {
    expect(resolvePosterSources(['a.jpg'])).toEqual({ srcset: 'a.jpg' });
  });
});
