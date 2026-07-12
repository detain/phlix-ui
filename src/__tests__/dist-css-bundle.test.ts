/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/**
 * UI-3.3 [U-B2] — shipped-CSS bundle guard.
 *
 * phlix-ui is a LIBRARY that commits its prebuilt `dist/`. Its two production
 * consumers (`phlix-server/web-ui`, `phlix-hub/web-ui`) resolve `@phlix/ui`
 * to the prebuilt `dist/phlix-ui.js` and import EXACTLY ONE stylesheet —
 * `@phlix/ui/style.css` (→ `dist/style.css`) — plus `@phlix/ui/fonts.css`.
 *
 * In Vite *library* mode, async-chunk CSS is NOT injected at runtime: split
 * chunks get inert "empty css" markers and no dist JS references them. So any
 * code-split CSS (`cssCodeSplit: true`) is INERT in the consumers — admin AND
 * every lazy page would render UNSTYLED. That was the UI-3.3 regression: the
 * shipped `style.css` shrank to ~35 KB and ~70 orphaned `*.css` chunks (incl.
 * `admin.css`) were emitted that nothing loads.
 *
 * This test locks the fix: the ONE stylesheet the consumers load must contain
 * ALL of the app's CSS (base + every page + admin), and the build must NOT emit
 * orphaned per-page CSS chunks. It also guards the `npm run build` output
 * completeness (the player build must not wipe the main entry).
 */

const distDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const styleCssPath = join(distDir, 'style.css');

describe('UI-3.3 shipped CSS bundle (dist/style.css)', () => {
  it('ships the single aggregated stylesheet the consumers import', () => {
    expect(existsSync(styleCssPath)).toBe(true);
  });

  const css = existsSync(styleCssPath) ? readFileSync(styleCssPath, 'utf8') : '';

  it('is a real monolith, not the shrunken split-out stub (regression guard)', () => {
    // Post-split-regression style.css was ~35 KB; the correct aggregate is ~283 KB.
    // Anything under 150 KB means CSS was code-split back out into inert chunks.
    expect(css.length).toBeGreaterThan(150_000);
  });

  it('contains the ADMIN styles the consumers would otherwise never load', () => {
    // AdminLayout shell + an admin page (DashboardPage → `.admin-dash`).
    expect(css).toContain('admin__sidebar');
    expect(css).toContain('admin-dash');
  });

  it('contains the core app + lazy-page styles (not just base tokens)', () => {
    for (const sel of [
      'media-card',
      'media-grid',
      'browse',
      'modal',
      'login',
      'metrics',
      'webhook',
      'admin-livetv',
    ]) {
      expect(css, `expected "${sel}" styles in dist/style.css`).toContain(sel);
    }
  });

  it('emits NO orphaned per-page CSS chunks (cssCodeSplit must stay off)', () => {
    // The only CSS files in dist/ should be the aggregate `style.css`, the
    // separate player-entry `ui.css`, and the copied `fonts/fonts.css`.
    const stray = readdirSync(distDir).filter(
      (f) => f.endsWith('.css') && f !== 'style.css' && f !== 'ui.css',
    );
    expect(stray, `unexpected split CSS chunks: ${stray.join(', ')}`).toEqual([]);
  });

  it('ships a complete build: main entry survives the player build', () => {
    // The player build (2nd in `npm run build`) must not empty dist/ and wipe
    // the main entry + its stylesheet.
    for (const f of ['phlix-ui.js', 'phlix-ui.umd.cjs', 'style.css']) {
      expect(existsSync(join(distDir, f)), `missing dist/${f}`).toBe(true);
    }
  });
});
