// @vitest-environment node
/**
 * S231 — the theater-mode geometry gate.
 *
 * S34's third acceptance criterion is that theater mode FILLS THE VIEWPORT. Every
 * assertion S34 shipped for it is a regex over raw SFC text (`AppLayout.test.ts`,
 * `Player.test.ts`, `PlayerPage.test.ts`) or a jsdom class-list check
 * (`PhlixApp.test.ts`). None of those can observe the claim, because:
 *   - jsdom never applies an SFC's compiled `<style>`, so `display:none` on
 *     `.shell.shell--flush .shell__bar` has no effect there and the element stays
 *     "visible"; and
 *   - jsdom has no layout engine and no `dvh` unit, so `height:100dvh` measures 0.
 * S232 then proved the source-text suite is blind by construction: commenting out
 * AppLayout's whole non-scoped `<style>` block left 11/11 green.
 *
 * This file closes that gap by rendering the REAL shell on the REAL player route in
 * headless chromium and measuring `getBoundingClientRect()`. It runs inside the plain
 * `vitest run` suite — i.e. inside `ui-ci.yml`'s BLOCKING `test` job, on every push and
 * every pull request. It is deliberately NOT a Playwright spec under `e2e/`: that suite
 * runs only in the `visual` job, which is `workflow_dispatch`-only AND
 * `continue-on-error: true`, so an assertion placed there could never fail a PR.
 *
 * ⚠ It must NEVER be softened into a skip when chromium is missing. A gate that
 * silently opts out is the `skipped`-counts-as-SUCCESS failure this estate has already
 * been bitten by; CI installs the browser explicitly (see the `test` job).
 *
 * SCOPE BOUNDARY, recorded honestly: this drives the Vite DEV server, so it measures
 * the SOURCE stylesheet, not the minified `dist/style.css`. The build-time deletion
 * class of defect (S232) is pinned separately by `src/test/builtCss.ts`; the two
 * together cover "the rule is correct" and "the rule survives the build".
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from '@playwright/test';
import { createServer, type ViteDevServer } from 'vite';
import { resolve } from 'node:path';

/**
 * A viewport with a height that is NOT a multiple of the 16:9 stage width, so a
 * "fills the viewport" pass can never be an accident of the default aspect ratio:
 * at 1280 wide the untoggled 16:9 player is 720 tall, 80px short of this 800.
 */
const VIEWPORT = { width: 1280, height: 800 } as const;

const ROOT = resolve(__dirname, '../..');

/** Timeouts: a cold Vite dev server + a chromium launch are both slow, once. */
const BOOT_TIMEOUT_MS = 180_000;

let server: ViteDevServer;
let browser: Browser;
let page: Page;
let origin: string;

/** Class tokens on the shell root — an ARRAY, so assertions compare tokens EXACTLY.
 *  A substring test on `className` would pass for `shell--flush-MUTATED`. */
async function shellClasses(): Promise<string[]> {
    return page.locator('.shell').first().evaluate((el) => Array.from(el.classList));
}

/** Rendered height of the first match, from the live layout box. */
async function heightOf(selector: string): Promise<number> {
    const box = await page.locator(selector).first().boundingBox();
    if (!box) throw new Error(`no layout box for "${selector}" — it is not rendered`);
    return box.height;
}

/** The browser's own inner viewport height (the number "fills the viewport" means). */
async function viewportHeight(): Promise<number> {
    return page.evaluate(() => window.innerHeight);
}

beforeAll(async () => {
    server = await createServer({
        configFile: resolve(ROOT, 'vite.config.ts'),
        root: ROOT,
        logLevel: 'error',
        server: { port: 5191, strictPort: false, host: '127.0.0.1' },
    });
    await server.listen();
    const url = server.resolvedUrls?.local?.[0];
    if (!url) throw new Error('vite dev server reported no local url');
    origin = url.replace(/\/$/, '');

    browser = await chromium.launch();
    page = await browser.newPage({ viewport: { ...VIEWPORT }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/src/dev/visual/theater.html`, { waitUntil: 'load' });
    // The player mounts once the stubbed by-id fetch resolves.
    await page.locator('.player').first().waitFor({ state: 'visible' });
    await page.locator('button[aria-label="Theater mode"]').waitFor({ state: 'visible' });
}, BOOT_TIMEOUT_MS);

afterAll(async () => {
    await browser?.close();
    await server?.close();
});

/** Click the player's real theater toggle and wait for the shell to settle. */
async function toggleTheater(): Promise<void> {
    const label = (await shellClasses()).includes('shell--flush') ? 'Exit theater mode' : 'Theater mode';
    await page.locator(`button[aria-label="${label}"]`).click();
    // One rAF + a transition-free settle; motion is reduced in both the prefs store
    // and the browser context, so nothing is mid-animation.
    await page.evaluate(() => new Promise<void>((r) => requestAnimationFrame(() => r())));
}

describe('S231 — theater mode fills the viewport (real browser layout)', () => {
    it('renders the harness at the pinned viewport', async () => {
        // Pins the control below: 800 is not 1280/16*9, so a 16:9 player cannot
        // coincidentally measure "full height".
        expect(await viewportHeight()).toBe(VIEWPORT.height);
    });

    it('CONTROL — before theater the shell keeps its chrome and the player is SHORTER than the viewport', async () => {
        expect(await shellClasses()).not.toContain('shell--flush');
        expect(await page.locator('.shell__bar').first().isVisible()).toBe(true);

        const vh = await viewportHeight();
        const playerHeight = await heightOf('.player');
        expect(playerHeight).toBeLessThan(vh);
        // The default 16:9 lock at 1280 wide, minus the shell's own gutter.
        expect(playerHeight).toBeGreaterThan(0);
    });

    it('entering theater flushes the shell chrome and grows the stage to EXACTLY the viewport height', async () => {
        await toggleTheater();

        // (1) the shell carries the flush flag as an EXACT class token
        expect(await shellClasses()).toContain('shell--flush');

        // (2) `.shell.shell--flush .shell__bar { display: none }` actually applied
        expect(await page.locator('.shell__bar').first().isVisible()).toBe(false);

        // (3) `.shell.shell--flush .shell__main { padding: 0 }` actually applied
        const mainPadding = await page
            .locator('main.shell__main')
            .first()
            .evaluate((el) => {
                const cs = getComputedStyle(el);
                return [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft];
            });
        expect(mainPadding).toEqual(['0px', '0px', '0px', '0px']);

        // (4) the numbers S34 claimed: stage AND player both fill the viewport
        const vh = await viewportHeight();
        expect(vh).toBe(VIEWPORT.height);
        expect(await heightOf('.player-page__stage')).toBe(vh);
        expect(await heightOf('.player')).toBe(vh);

        // (5) …and it starts at the very top, which is only true once the sticky bar
        //     is gone AND the main gutter is zeroed.
        const top = (await page.locator('.player').first().boundingBox())?.y;
        expect(top).toBe(0);
    });

    it('leaving theater restores the chrome and releases the full-height stage', async () => {
        await toggleTheater();

        expect(await shellClasses()).not.toContain('shell--flush');
        expect(await page.locator('.shell__bar').first().isVisible()).toBe(true);
        expect(await heightOf('.player')).toBeLessThan(await viewportHeight());
    });
});
