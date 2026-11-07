/**
 * CU-076 (review ui__crossfe #1) — the CSS feature floor.
 *
 * The declared browser floor is the JS baseline (Chrome/Edge 85+, README
 * “Compatibility”); `color-mix()` needs Chrome/Edge 111 and Tizen 6.5's
 * Chromium predates it. The ratified cure follows the repo's own `dvh`
 * doctrine (Player.vue): every shipped rule that uses `color-mix()` carries
 * a static fallback in an `@supports not (color: color-mix(...))` block —
 * NOT a duplicate declaration pair, which minification may collapse.
 *
 * This test is the CSS twin of the JS floor pins: a new `color-mix()` site
 * without a fallback block reddens it, exactly like lowering the browser
 * baseline in code would.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..');
const FLOOR_TEST = '@supports not (color: color-mix';

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(vue|css|html)$/.test(entry)) out.push(p);
  }
  return out;
}

/**
 * AppBackdrop interpolates `color-mix()` into a JS-bound inline style, where
 * no @supports block can reach it. It is exempt for a documented, verified
 * reason (pinned below): an engine that cannot parse `color-mix()` discards
 * the whole inline `background` declaration at parse time, and the component's
 * own scoped `.phlix-backdrop__ambient` rule — built from the STATIC rgba
 * `--ambient` token — shows instead. Old engines lose the second gradient
 * layer; they never lose the glow.
 */
const JS_GATED_ALLOWLIST = ['components/AppBackdrop.vue'];

/** dev scratch surfaces compiled out of every shipped bundle. */
function isNonShipped(rel: string): boolean {
  return rel.startsWith('dev/');
}

describe('CU-076 — color-mix() sites carry @supports fallbacks at the CSS floor', () => {
  const users = walk(SRC).filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.d.ts'));
  const offenders: string[] = [];
  const covered: string[] = [];

  for (const file of users) {
    const rel = relative(SRC, file).split('\\').join('/');
    if (isNonShipped(rel) || JS_GATED_ALLOWLIST.includes(rel)) continue;
    const src = readFileSync(file, 'utf8');
    if (!src.includes('color-mix(')) continue;
    if (src.includes(FLOOR_TEST)) covered.push(rel);
    else offenders.push(rel);
  }

  it('no shipped surface uses color-mix() without an @supports fallback block', () => {
    expect(offenders, `missing '${FLOOR_TEST}…' block: ${offenders.join(', ')}`).toEqual([]);
    // The fourteen shipped files CU-076 cured (register counted ~15 components
    // at its commit; the measured set at f03447d3 is these) — a silent SHRINK
    // of the covered set means a fallback was deleted, which reddens here too.
    expect(covered.length).toBeGreaterThanOrEqual(14);
  });

  it('the JS-gated exception stays justified (AppBackdrop cascade fallback)', () => {
    const src = readFileSync(join(SRC, 'components/AppBackdrop.vue'), 'utf8');
    expect(src).toContain('color-mix('); // the inline interpolation exists
    expect(src).not.toContain(FLOOR_TEST); // …and it is NOT block-covered
    // Its safety rests on the scoped static fallback; if that rule goes away,
    // the exemption is a lie and this reddens.
    expect(src).toMatch(/\.phlix-backdrop__ambient\s*\{[^}]*background:\s*radial-gradient\([^)]*var\(--ambient\)[^)]*\)/);
    expect(src).toContain('the scoped'); // the code comment documenting the drop-through
  });

  it('token-default var() fallbacks are static, never color-mix() (AcceptInvitePage law)', () => {
    // `var(--x, color-mix(...))` only evaluates its default when the token is
    // missing — an invisible-on-Tizen coin flip. CU-076 swapped the one shipped
    // site to a floor-independent rgba default. It must not creep back.
    for (const file of users) {
      const rel = relative(SRC, file);
      if (isNonShipped(rel)) continue;
      const src = readFileSync(file, 'utf8');
      expect(src, `${rel}: var() default must be floor-safe`).not.toMatch(/var\(--[a-z-]+,\s*color-mix\(/);
    }
  });
});
