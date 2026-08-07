/**
 * S223 — the Network/Performance capture driver for `library-lazy.html`.
 *
 * Boots the Vite dev server, drives headless chromium at 1280x800 over the real
 * `LibraryPage` and reports, per view mode:
 *   - firstPaintRequests — distinct poster/backdrop URLs requested with NO scrolling.
 *     This is the number the `loading` attribute actually moves, because
 *     `MediaGrid.vue`'s `virtualized` computed is FALSE until the ResizeObserver
 *     fires, so the first render mounts EVERY loaded item.
 *   - lazyAttr — how many of those images carry `loading="lazy"` (the control: a run
 *     reporting 0 here is measuring the opt-out, one reporting N the native default).
 *   - blankSamples / maxBlankInView — over 134 sampled animation frames of a
 *     continuous 60 px/frame scroll to y=8000 with a 250 ms-throttled image origin,
 *     how often an IN-VIEWPORT poster was unpainted. This is the user-visible
 *     symptom the S35 rationale predicted; it did not move.
 *
 * Run it once per view mode, once with the tree as-is and once with the `:lazy`
 * overrides removed, and compare. The numbers this produced are recorded in
 * MediaCard.vue's `lazy` prop docblock and in the S223 worklog.
 *
 * Usage: node src/dev/visual/measure-poster-loading.mjs <label> <grid|list|backdrop|table>
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { createServer } from 'vite';
import { chromium } from 'playwright';

const ROOT = '/home/sites/phlix/phlix-ui';
const LABEL = process.argv[2] ?? 'run';
const VIEW = process.argv[3] ?? 'grid';

const server = await createServer({
    configFile: `${ROOT}/vite.config.ts`,
    root: ROOT,
    logLevel: 'error',
    server: { port: 5199, strictPort: false, host: '127.0.0.1' },
});
await server.listen();
const origin = server.resolvedUrls.local[0].replace(/\/$/, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const issued = new Set();
page.on('request', (req) => {
    if (req.url().includes('poster.svg')) issued.add(req.url());
});

await page.goto(`${origin}/src/dev/visual/library-lazy.html?view=${VIEW}`, { waitUntil: 'load' });
await page.waitForTimeout(4000);
const firstPaint = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).filter((i) => i.src.includes("poster.svg"));
    const vh = window.innerHeight;
    return {
        domImgs: imgs.length,
        inView: imgs.filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < vh; }).length,
        painted: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
        lazyAttr: imgs.filter((i) => i.getAttribute('loading') === 'lazy').length,
    };
});
const firstPaintRequests = issued.size;

// Scroll pass with a throttled image origin.
await page.route('**/poster.svg**', async (route) => {
    await new Promise((r) => setTimeout(r, 250));
    await route.continue();
});
const scroll = await page.evaluate(async () => {
    const samples = [];
    let y = 0;
    await new Promise((resolve) => {
        function frame() {
            y = Math.min(8000, y + 60);
            window.scrollTo(0, y);
            const imgs = Array.from(document.querySelectorAll('img')).filter((i) => i.src.includes("poster.svg"));
            const vh = window.innerHeight;
            let inView = 0;
            let blank = 0;
            for (const img of imgs) {
                const r = img.getBoundingClientRect();
                if (r.bottom > 0 && r.top < vh) {
                    inView++;
                    if (!(img.complete && img.naturalWidth > 0)) blank++;
                }
            }
            samples.push({ inView, blank });
            if (y >= 8000) resolve();
            else requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    });
    return {
        samples: samples.length,
        blankSamples: samples.filter((s) => s.blank > 0).length,
        maxBlankInView: samples.reduce((a, s) => Math.max(a, s.blank), 0),
        totalBlank: samples.reduce((a, s) => a + s.blank, 0),
    };
});

console.log(JSON.stringify({ label: LABEL, view: VIEW, firstPaintRequests, ...firstPaint, ...scroll, totalRequests: issued.size }));

await browser.close();
await server.close();
