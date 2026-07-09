/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { parseHex, toHex, lighten, darken, luminance, deriveAccentVars } from './color';

describe('color util', () => {
  it('parses #rgb and #rrggbb (with/without #)', () => {
    expect(parseHex('#f5a524')).toEqual({ r: 245, g: 165, b: 36 });
    expect(parseHex('f5a524')).toEqual({ r: 245, g: 165, b: 36 });
    expect(parseHex('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHex('not-a-color')).toBeNull();
    expect(parseHex('#12')).toBeNull();
  });

  it('lighten/darken move toward white/black', () => {
    expect(toHex(lighten({ r: 0, g: 0, b: 0 }, 0.5))).toBe('#808080');
    expect(toHex(darken({ r: 255, g: 255, b: 255 }, 0.5))).toBe('#808080');
  });

  it('luminance is higher for light colors', () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeGreaterThan(luminance({ r: 0, g: 0, b: 0 }));
  });

  it('deriveAccentVars returns the full role set with readable contrast', () => {
    const v = deriveAccentVars('#f5a524')!;
    expect(v['--accent']).toBe('#f5a524');
    expect(v).toHaveProperty('--accent-hover');
    expect(v).toHaveProperty('--accent-active');
    expect(v['--accent-soft']).toMatch(/^rgba\(245, 165, 36, /);
    expect(v['--accent-ring']).toMatch(/^rgba\(245, 165, 36, /);
    // amber is light-ish → dark ink contrast
    expect(v['--accent-contrast']).toBe('#1a1205');
    // a dark accent → light ink
    expect(deriveAccentVars('#1a3d8f')!['--accent-contrast']).toBe('#fff8ec');
  });

  it('deriveAccentVars returns null for bad input', () => {
    expect(deriveAccentVars('xyz')).toBeNull();
  });
});
