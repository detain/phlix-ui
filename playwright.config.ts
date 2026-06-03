import { defineConfig } from '@playwright/test';

/**
 * R6.4 — Visual regression suite for `@phlix/ui`.
 *
 * This is an ON-DEMAND suite (`npm run test:visual`), deliberately NOT part of the
 * blocking `build` / `vitest` / `vue-tsc` gate:
 *   - there is no CI runner wired to this repo yet (the `.github/workflows/ui-ci.yml`
 *     artifact is ready-to-enable but dormant), and
 *   - PNG baselines are environment-fragile (font hinting / GPU rasterization), so a
 *     visual diff must never be able to go flaky-red inside the deterministic gate.
 *
 * Baselines are committed under `e2e/__screenshots__/` and are reproducible because
 * `@playwright/test@1.60` pins Chromium build v1223 (Chrome-for-Testing 148) — run
 * `npx playwright install chromium` and the bundled, version-locked browser is used
 * (no system Chrome, which would auto-update and drift the baselines).
 *
 * Surfaces are rendered from the Vite dev server's dev harness pages (e.g.
 * `src/dev/gallery.html`); R6.4a covers the primitive Gallery, R6.4b adds per-surface
 * harnesses. The dev server is booted/torn-down by Playwright's `webServer` block.
 */

const PORT = 5188;

export default defineConfig({
    testDir: './e2e',
    // Commit baselines under a tidy, project-grouped, platform-tagged path so a Linux
    // baseline can never be silently compared against a macOS/Windows render.
    snapshotPathTemplate: 'e2e/__screenshots__/{projectName}/{arg}-{platform}{ext}',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    // One worker keeps screenshots deterministic (no GPU contention between pages) and
    // is plenty for the handful of surface×theme combinations.
    workers: 1,
    reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
    expect: {
        toHaveScreenshot: {
            // Small tolerance absorbs sub-pixel anti-aliasing noise without hiding real
            // regressions; `animations: 'disabled'` freezes CSS animations/transitions
            // (film-grain, Reveal entrances) at a stable frame.
            maxDiffPixelRatio: 0.01,
            animations: 'disabled',
            caret: 'hide',
            scale: 'css',
        },
    },
    use: {
        baseURL: `http://localhost:${PORT}`,
        reducedMotion: 'reduce',
        colorScheme: 'dark',
        deviceScaleFactor: 1,
        // Explicit `chromium` (NOT a system `channel`) → the bundled, version-pinned
        // v1223 build, so baselines stay reproducible.
        browserName: 'chromium',
    },
    projects: [
        { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
        { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    ],
    webServer: {
        command: `npm run dev -- --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}/src/dev/gallery.html`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
        stdout: 'ignore',
        stderr: 'pipe',
    },
});
