/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 *
 * M-UI-29 tripwire — the three phantom design tokens found by the webux review
 * (--text-primary / --text-secondary / --color-destructive-subtle) render as
 * transparent inheritance because no stylesheet defines them (defs=0 measured
 * against dist/style.css). The real shipped names are --text,
 * --color-text-secondary and --error-bg. This test pins that no fallback-less
 * use of the phantom names returns to src/, and that the replacement names are
 * genuinely defined in the built bundle.
 *
 * phlix-ui-player-028 extension — the exact-name arm above let the BARE
 * `--color-destructive` slip through (SyncPlayPage.vue :319/:325 used it as a
 * foreground color while the guard only knew the `-subtle` member). The whole
 * `--color-destructive*` family is phantom (grep census at be650b6a: usages
 * `--color-destructive` + `--color-destructive-subtle`, definitions 0 anywhere
 * in src/ or dist/style.css), so the family is now guarded by a suffix-aware
 * arm: any future `--color-destructive-<anything>` fallback-less use reddens
 * too. The defined status colour for these sites is `--error`
 * (src/composables/themeTokens.ts:100-101), pinned in REAL below.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Exact phantom names not covered by any family arm.
const PHANTOMS = ['--text-primary', '--text-secondary'];
// Phantom families: `var(--FAMILY)` and any `var(--FAMILY-suffix)` offend.
const PHANTOM_FAMILIES = ['--color-destructive'];
const REAL = ['--text', '--color-text-secondary', '--error-bg', '--error'];

// Raw text of every stylesheet-bearing source file (relative glob from this
// file's directory resolves inside src/).
const files = import.meta.glob('../**/*.{vue,css,ts}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

describe('phantom design tokens (M-UI-29)', () => {
  it('has zero fallback-less uses of the phantom names in src/', () => {
    const offenders: string[] = [];
    for (const [rel, text] of Object.entries(files)) {
      if (rel.includes('.test.')) continue; // this file names them in prose
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        for (const name of PHANTOMS) {
          if (new RegExp(`var\\(\\s*${name}\\s*\\)`).test(line)) {
            offenders.push(`${rel}:${i + 1} ${name}`);
          }
        }
        for (const family of PHANTOM_FAMILIES) {
          // suffix-aware: the bare member and every --family-* variant offend;
          // a fallback-bearing var(...) stays exempt per the M-UI-29 posture.
          if (new RegExp(`var\\(\\s*${family}[\\w-]*\\s*\\)`).test(line)) {
            offenders.push(`${rel}:${i + 1} ${family}*`);
          }
        }
      });
    }
    expect(offenders).toEqual([]);
  });

  it('defines the replacement token names in the shipped bundle', () => {
    // path via a VARIABLE: a static-literal `new URL(...)` in a test file is
    // Vite-rewritten to an http: URL (asset-rewrite hazard, recorded W-min188).
    const rel = '../../dist/style.css';
    const css = readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8');
    for (const name of REAL) {
      expect(css).toContain(`${name}:`);
    }
  });
});
