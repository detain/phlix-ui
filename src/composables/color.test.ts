/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseHex,
  toHex,
  lighten,
  darken,
  luminance,
  deriveAccentVars,
  ACCENT_KEYS,
  ACCENT_INK_DARK,
  ACCENT_INK_LIGHT,
} from '@phlix/tokens';

// [S-tokens-16 / phlix-tokens-002] The local fork (src/composables/color.ts)
// is DELETED: the accent derivation is consumed from @phlix/tokens, the single
// source of truth. These cases read the package surface, not a copy — if the
// fork is ever resurrected, the extinction pin below convicts first.

describe('accent derivation (consumed from @phlix/tokens)', () => {
  it('the fork is extinct — src/composables/color.ts no longer exists', () => {
    // House idiom (see src/__tests__/dist-version-stamp.test.ts): NEVER write
    // new URL('<literal>', import.meta.url) — Vite rewrites it into a
    // dev-server asset URL at transform time. dirname(fileURLToPath(...)) is
    // the cwd-proof, transform-proof location source.
    expect(existsSync(join(dirname(fileURLToPath(import.meta.url)), 'color.ts'))).toBe(false);
  });

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

  it('deriveAccentVars returns the package role set, measured literals', () => {
    const v = deriveAccentVars('#f5a524')!;
    // Amber (the picker default): every value pinned to the package's measured
    // output. The contrast leg is the era-leg correction — the fork shipped
    // '#1a1205' here; the package ink is '#2a1804', which is ALSO what
    // colors.css already declares as the --accent-contrast default, so the
    // inline override now agrees with the stylesheet it overrides.
    expect(v).toEqual({
      '--accent': '#f5a524',
      '--accent-hover': '#f6b03e',
      '--accent-active': '#d89120',
      '--accent-soft': 'rgba(245, 165, 36, 0.14)',
      '--accent-ring': 'rgba(245, 165, 36, 0.55)',
      '--accent-contrast': '#2a1804',
    });
    // a dark accent → light ink (unchanged by the fork→package move)
    expect(deriveAccentVars('#1a3d8f')!['--accent-contrast']).toBe('#fff8ec');
  });

  it('the role roster equals the package ACCENT_KEYS (anti-fork-resurrection)', () => {
    const v = deriveAccentVars('#4c6ef5')!;
    expect(Object.keys(v).sort()).toEqual([...ACCENT_KEYS].sort());
  });

  it('contrast is always one of the package ink constants', () => {
    for (const hex of ['#f5a524', '#1a3d8f', '#e5484d', '#d6409f', '#8e4ec6', '#0fa3a3', '#6cc04a', '#ffffff', '#000000']) {
      const c = deriveAccentVars(hex)!['--accent-contrast'];
      expect([ACCENT_INK_DARK, ACCENT_INK_LIGHT]).toContain(c);
    }
  });

  it('deriveAccentVars returns null for bad input', () => {
    expect(deriveAccentVars('xyz')).toBeNull();
  });
});
