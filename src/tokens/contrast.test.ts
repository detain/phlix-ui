/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/**
 * R6.5b — static WCAG 2.1 color-contrast lock for the Nocturne token system.
 *
 * Reads the SHIPPED `colors.css` (the single source of truth — same fs-read
 * pattern as `reduced-motion.test.ts`, because `?raw` is swallowed by the CSS
 * plugin under vitest) and asserts the audited foreground/background token pairs
 * meet WCAG AA across all three themes:
 *   - body/label text (`--text-subtle`, `--accent-text`): ≥ 4.5:1 vs `--bg` + `--surface`
 *   - status tones used as Badge text: ≥ 4.5:1 vs `--bg`, `--surface`, AND their own
 *     translucent `*-bg` tile composited over each (the real `.phlix-badge--<tone>`
 *     pattern: `background: var(--<tone>-bg); color: var(--<tone>)`)
 *   - the focus ring `--accent-ring` (non-text UI component, 1.4.11): ≥ 3:1 vs
 *     `--bg`, `--surface`, `--surface-2`
 *   - the on-accent ink (`--accent-contrast` on the `--accent` fill): ≥ 4.5:1
 *
 * Thresholds are bound to the RESTING content backgrounds (`--bg`, `--surface`,
 * `--surface-2` — text/badges/captions rest on all three; surface-2 binding was
 * added after a real-Chromium pass found MediaCard meta captions render on it).
 * Glass/atmosphere and the transient `--surface-3` (active/pressed) borderlines are
 * verified in a real browser (chrome-devtools MCP) as the R6.5b spec directs —
 * out of scope for this static lock. `--text-faint` (placeholder/disabled,
 * WCAG-exempt) and `--border*` (decorative) are NOT tested.
 *
 * If any token hex regresses below AA this test fails — every other unit test
 * would still pass, so this is the only guard against a silent contrast regression.
 */

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'colors.css'), 'utf8');

/* ----------------------------- WCAG 2.1 math ----------------------------- */
type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relativeLuminance(rgb: Rgb): number {
  return 0.2126 * srgbToLinear(rgb[0]) + 0.7152 * srgbToLinear(rgb[1]) + 0.0722 * srgbToLinear(rgb[2]);
}
function contrast(a: Rgb, b: Rgb): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}
/** alpha-composite an rgba color literal over an opaque background (sRGB, gamma-naive — matches browser <img>/box compositing well enough for contrast) */
function compositeOver(fg: Rgb, alpha: number, bg: Rgb): Rgb {
  return [
    fg[0] * alpha + bg[0] * (1 - alpha),
    fg[1] * alpha + bg[1] * (1 - alpha),
    fg[2] * alpha + bg[2] * (1 - alpha),
  ];
}

/* ----------------------------- colors.css parser ----------------------------- */
// theme-invariant amber ramp (declared once in the top :root block)
const ramp: Record<string, string> = {};
for (const m of css.matchAll(/--amber-(\d+):\s*(#[0-9a-fA-F]{6})/g)) ramp[m[1]] = m[2];
const accentContrastHex = css.match(/--accent-contrast:\s*(#[0-9a-fA-F]{6})/)?.[1];

/** slice a theme block's declaration body via brace-depth (robust if a nested @media/:is() is ever added) */
function themeBody(selector: string): string {
  const at = css.indexOf(selector);
  if (at < 0) throw new Error(`theme selector not found: ${selector}`);
  const open = css.indexOf('{', at);
  let depth = 1;
  let i = open + 1;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  if (depth !== 0) throw new Error(`unclosed block for: ${selector}`);
  return css.slice(open + 1, i - 1);
}
const bodies: Record<string, string> = {
  nocturne: themeBody("[data-theme='nocturne']"),
  daylight: themeBody("[data-theme='daylight']"),
  midnight: themeBody("[data-theme='midnight']"),
};

/**
 * raw token value within a theme body. The `(?![-\w])` boundary stops a prefix
 * token (`--accent`) from greedily matching a longer one (`--accent-text`) if the
 * CSS declaration order ever changes; legacy `--color-*` aliases never collide
 * (they're preceded by a single dash, not `--`).
 */
function rawToken(body: string, name: string): string {
  const m = body.match(new RegExp(name.replace(/[-]/g, '\\-') + '(?![-\\w]):\\s*([^;]+);'));
  if (!m) throw new Error(`token ${name} not found in theme body`);
  return m[1].trim();
}
/** resolve a token to a hex string, following a single var(--amber-N) indirection */
function tokenHex(body: string, name: string): string {
  const v = rawToken(body, name);
  const vm = v.match(/var\(--amber-(\d+)\)/);
  if (vm) {
    const hex = ramp[vm[1]];
    if (!hex) throw new Error(`unknown amber ramp step in ${name}: ${v}`);
    return hex;
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(v)) throw new Error(`token ${name} is not a hex: ${v}`);
  return v;
}
/** parse an rgba()/rgb() token to { rgb, a } */
function tokenRgba(body: string, name: string): { rgb: Rgb; a: number } {
  const v = rawToken(body, name);
  const nums = v.match(/rgba?\(([^)]+)\)/)?.[1].split(',').map((x) => parseFloat(x.trim()));
  if (!nums || nums.length < 3) throw new Error(`token ${name} is not rgba: ${v}`);
  return { rgb: [nums[0], nums[1], nums[2]], a: nums[3] ?? 1 };
}

const THEMES = ['nocturne', 'daylight', 'midnight'] as const;
const TONES = ['error', 'success', 'warning', 'info'] as const;
const AA_TEXT = 4.5;
const AA_UI = 3.0;

/* --------------------------------- specs --------------------------------- */
describe('WCAG AA color-contrast lock (tokens/colors.css)', () => {
  it('parses the amber ramp and three theme blocks', () => {
    expect(ramp['500']).toBe('#f5a524');
    expect(ramp['800']).toBeDefined();
    expect(accentContrastHex).toMatch(/^#[0-9a-fA-F]{6}$/);
    for (const t of THEMES) expect(bodies[t].length).toBeGreaterThan(100);
  });

  for (const theme of THEMES) {
    describe(`[${theme}]`, () => {
      const body = bodies[theme];
      const bg = () => hexToRgb(tokenHex(body, '--bg'));
      const surface = () => hexToRgb(tokenHex(body, '--surface'));
      const surface2 = () => hexToRgb(tokenHex(body, '--surface-2'));

      it('--text-subtle ≥ 4.5:1 on --bg, --surface, --surface-2', () => {
        // surface-2 is a RESTING content surface (e.g. the MediaCard meta caption sits on it,
        // confirmed in real Chromium), so subtle text must clear AA there too — not just bg/surface.
        const fg = hexToRgb(tokenHex(body, '--text-subtle'));
        for (const b of [bg(), surface(), surface2()]) {
          expect(contrast(fg, b)).toBeGreaterThanOrEqual(AA_TEXT);
        }
      });

      it('--accent-text ≥ 4.5:1 on --bg, --surface, --surface-2 (amber as foreground)', () => {
        const fg = hexToRgb(tokenHex(body, '--accent-text'));
        for (const b of [bg(), surface(), surface2()]) {
          expect(contrast(fg, b)).toBeGreaterThanOrEqual(AA_TEXT);
        }
      });

      for (const tone of TONES) {
        it(`--${tone} ≥ 4.5:1 as Badge text on --bg, --surface, and its --${tone}-bg tile`, () => {
          const fg = hexToRgb(tokenHex(body, `--${tone}`));
          const tile = tokenRgba(body, `--${tone}-bg`);
          const tileOverBg = compositeOver(tile.rgb, tile.a, bg());
          const tileOverSurface = compositeOver(tile.rgb, tile.a, surface());
          for (const b of [bg(), surface(), tileOverBg, tileOverSurface]) {
            expect(contrast(fg, b)).toBeGreaterThanOrEqual(AA_TEXT);
          }
        });
      }

      it('--accent-ring ≥ 3:1 (non-text UI) on --bg, --surface, --surface-2', () => {
        const ring = tokenRgba(body, '--accent-ring');
        for (const b of [bg(), surface(), surface2()]) {
          expect(contrast(compositeOver(ring.rgb, ring.a, b), b)).toBeGreaterThanOrEqual(AA_UI);
        }
      });

      it('--accent fill carries readable ink (--accent-contrast ≥ 4.5:1)', () => {
        const fill = hexToRgb(tokenHex(body, '--accent'));
        const ink = hexToRgb(accentContrastHex!);
        expect(contrast(ink, fill)).toBeGreaterThanOrEqual(AA_TEXT);
      });
    });
  }
});
