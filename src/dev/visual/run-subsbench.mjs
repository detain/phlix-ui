#!/usr/bin/env node
/**
 * W114 S533 — TN-6 subtitle-budget bench driver (DEV-ONLY, never bundled).
 *
 * Boots the repo's own Vite dev server (the same toolchain that serves every
 * other src/dev/visual harness), drives subsBench.html in headless Chromium
 * via Playwright, waits for the scripted run to publish
 * window.__SUBSBENCH_RESULTS__, and prints/persists the JSON.
 *
 * Honesty clauses baked into the output:
 *  - These are LOCAL CHROMIUM numbers. The machine identity is stamped in
 *    results.meta.machine. They are NOT Tizen numbers.
 *  - The Tizen 6.5 emulator and entry-level real-TV legs are UNREACHABLE at
 *    this venue (no SDK, no device on this network); the artifact says so in
 *    plain words. Nothing is fabricated.
 *
 * Usage:  node src/dev/visual/run-subsbench.mjs
 * Env:    SUBSBENCH_DURATION  run length per mode in ms (default 60000;
 *         smoke it with e.g. 8000 — the harness floors it at 2000)
 *         SUBSBENCH_OUT       write the JSON here as well as stdout
 */
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const durationMs = Number(process.env.SUBSBENCH_DURATION ?? 60_000);
const outFile = process.env.SUBSBENCH_OUT ?? null;

const server = await createServer({ root: repoRoot, logLevel: 'warn' });
await server.listen();
const origin = server.resolvedUrls?.local[0];
if (!origin) throw new Error('vite dev server did not report a local URL');

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const url = `${origin}src/dev/visual/subsBench.html?duration=${Math.round(durationMs / 1000)}`;
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForSelector('#run-bench');
  await page.click('#run-bench');
  // Three sequential modes + cooldowns: allow 3x the scripted run plus boot slack.
  await page.waitForFunction(() => window.__SUBSBENCH_RESULTS__?.done === true, null, {
    timeout: 3 * durationMs + 180_000,
  });
  const results = await page.evaluate(() => window.__SUBSBENCH_RESULTS__);
  const artifact = {
    ...results,
    venue: {
      runBy: 'src/dev/visual/run-subsbench.mjs',
      engine: 'headless chromium on the dev workstation',
      tizenEmulator: 'UNREACHABLE at this venue — no Tizen 6.5 SDK on this box; numbers are NOT entry-Tizen',
      entryLevelRealTv: 'UNREACHABLE at this venue — no paired TV; reported honestly per AC2, never fabricated',
      rawAssDeliveryGap:
        'server normalizes sidecar ASS to WebVTT (SubtitleFetchService), so production never ships raw ASS to the renderer; this bench prices the raw-ASS main-thread cost anyway — that is the AD-7 decision surface',
    },
  };
  process.stdout.write(`${JSON.stringify(artifact, null, 2)}\n`);
  if (outFile) {
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, `${JSON.stringify(artifact, null, 2)}\n`);
  }
} finally {
  await browser.close();
  await server.close();
}
