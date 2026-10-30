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
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PHANTOMS = ['--text-primary', '--text-secondary', '--color-destructive-subtle'];
const REAL = ['--text', '--color-text-secondary', '--error-bg'];

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
