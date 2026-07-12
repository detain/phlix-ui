/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

/**
 * UI-3.4 [U-B4] — ApexCharts dedupe build-output guard.
 *
 * The ONLY apex consumer is `src/pages/admin/MetricsPage.vue`. It imports the
 * `vue3-apexcharts/core` wrapper (browser build via `apexcharts/core`), NOT the
 * default `vue3-apexcharts` entry.
 *
 * The default entry carries a DYNAMIC `import("./apexcharts.ssr.esm-*.js")` — a
 * self-contained ~626 KB SSR copy of ApexCharts for the onServerPrefetch/SSR
 * path — that Rollup always emits as a chunk regardless of `external`. Phlix is a
 * client-only SPA that never server-prefetches, so before UI-3.4 apex
 * DOUBLE-SHIPPED: the SSR copy bundled in dist AND a browser copy the consumer
 * had to provide (the prior `external: ['apexcharts']` only removed the tiny
 * static `import "apexcharts/core"`, and relied on npm transitive hoisting — the
 * UI-3.3 consumer-risk class).
 *
 * This test asserts the dedupe holds in the BUILD OUTPUT:
 *   1. NO `apexcharts.ssr.esm-*` chunk exists (the 626 KB dead SSR copy is gone).
 *   2. Exactly ONE apex chunk ships (a single browser copy, self-contained in
 *      dist — consumers no longer need to provide apexcharts).
 *
 * WHY THIS BUILDS FRESH (like dist-player-split.test.ts, unlike
 * dist-css-bundle.test.ts which reads the committed dist/): the committed `dist/`
 * is only rebuilt at release time, so it can lag `src/`. Building fresh into a
 * throwaway outDir asserts the CURRENT source's output under every run mode
 * without committing `dist/` (a release-time gate).
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const outDir = join(root, 'node_modules', '.cache', 'ui-3.4-apex-dist');
const viteBin = join(root, 'node_modules', '.bin', 'vite');

/**
 * A distinctive marker string that the ApexCharts LIBRARY injects (a CSS class it
 * creates on the chart root). It is present only in the bundled apex library
 * code, NOT in the ~5 KB vue3-apexcharts wrapper nor in MetricsPage — so counting
 * `.js` chunks that contain it counts distinct bundled apex copies.
 */
const APEX_LIB_MARKER = 'apexcharts-canvas';

/** The old dead SSR copy shipped at 626 KB; the single browser copy is smaller. */
const OLD_SSR_CHUNK_BYTES = 626_615;

describe('UI-3.4 apexcharts dedupe (dist build output)', () => {
  let jsFiles: string[] = [];
  let allFiles: string[] = [];

  beforeAll(() => {
    rmSync(outDir, { recursive: true, force: true });
    // Only the main entry can pull apex in (MetricsPage is a lazy route in the
    // main graph; the player entry never touches apex). One build is enough.
    execFileSync(viteBin, ['build', '--outDir', outDir, '--emptyOutDir'], {
      cwd: root,
      stdio: 'pipe',
    });
    allFiles = readdirSync(outDir);
    // Scope apex-copy counting to the ES `.js` chunks (the lib emits both `.js`
    // and `.cjs` — one copy per format — so counting `.js` alone counts copies).
    jsFiles = allFiles.filter((f) => f.endsWith('.js') && !f.endsWith('.map'));
  }, 300_000);

  afterAll(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it('emits NO apexcharts.ssr.esm-* chunk (the ~626 KB dead SSR copy is gone)', () => {
    const ssr = allFiles.filter((f) => /apexcharts\.ssr\.esm/i.test(f));
    expect(
      ssr,
      `dead SSR apex copy still shipped (MetricsPage must import 'vue3-apexcharts/core', not 'vue3-apexcharts'): ${ssr.join(', ')}`,
    ).toEqual([]);
  });

  it('ships exactly ONE apex chunk (a single, self-contained browser copy)', () => {
    const apexChunks = jsFiles.filter((f) =>
      readFileSync(join(outDir, f), 'utf8').includes(APEX_LIB_MARKER),
    );
    expect(
      apexChunks.length,
      `expected exactly one bundled apex copy, found chunks: ${apexChunks.join(', ')}`,
    ).toBe(1);
  });

  it('the single apex chunk is materially smaller than the old SSR copy', () => {
    const apexChunk = jsFiles.find((f) =>
      readFileSync(join(outDir, f), 'utf8').includes(APEX_LIB_MARKER),
    );
    expect(apexChunk, 'no apex chunk found').toBeTruthy();
    const bytes = statSync(join(outDir, apexChunk as string)).size;
    // Browser core build (~458 KB) < the old 626 KB SSR chunk — and that SSR copy
    // is now gone entirely, so the net apex payload dropped by well over half.
    expect(
      bytes,
      `apex chunk ${apexChunk} is ${bytes} B; expected < ${OLD_SSR_CHUNK_BYTES} B`,
    ).toBeLessThan(OLD_SSR_CHUNK_BYTES);
  });
});
