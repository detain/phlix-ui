import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * R6.5 — Accessibility (axe) conformance for `@phlix/ui`.
 *
 * The R6.5 acceptance criterion is "axe clean; keyboard-only walkthrough of every
 * surface passes." This spec is the committable, reproducible *axe-clean* proof: it
 * runs axe-core (via `@axe-core/playwright`) against the SAME deterministic offline
 * surface harnesses the R6.4b visual suite uses — the REAL shipped SFCs, not mockups
 * — across all three built-in themes, and asserts ZERO WCAG 2.0 / 2.1 A+AA
 * violations. (The interactive half of the AC — focus order, focus-ring visibility,
 * skip-link, focus-trap, no keyboard traps — is covered by the live chrome-devtools
 * MCP keyboard walkthrough recorded in `steps/R6-perf-rollout.worklog.md`, plus the
 * gating vitest interaction tests from R6.4c / R6.5a.)
 *
 * Sequenced last in R6.5 (after R6.5a structure/focus rings, R6.5b contrast AA,
 * R6.5c i18n strings) so axe runs against the FINAL colors and strings.
 *
 * ON-DEMAND only (`npm run test:a11y`), exactly like the visual suite — it needs the
 * bundled, version-pinned Chromium + the Vite dev-harness server, and is NOT part of
 * the blocking vitest / build / vue-tsc gate (no CI runner is wired to this repo yet;
 * see playwright.config.ts). The dev server is booted/reused by the `webServer` block.
 *
 * Rule scope: the WCAG 2.0 / 2.1 **A + AA** conformance tags — the standard "axe
 * clean" bar, and the bar the R6.5 audit was written against. This deliberately
 * EXCLUDES axe's `best-practice` page-structure rules (`region`,
 * `landmark-one-main`, `page-has-heading-one`, `heading-order`), which would fire as
 * *harness artifacts*: every per-surface harness isolates a single component (the
 * Auth card, the Player, a MediaDetail …) rather than a full page — in the real apps
 * the shell supplies the `<main>` / nav landmarks and the page heading. The one
 * full-page surface, the `shell` harness (AppLayout: skip-link → `<main id="main">`
 * + banner/nav landmarks + an `<h1>`), is additionally asserted clean under those
 * landmark best-practice rules below.
 */

const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const THEMES = ['nocturne', 'daylight', 'midnight'] as const;

const SURFACES: { name: string; path: string; ready: string }[] = [
  { name: 'gallery', path: '/src/dev/gallery.html', ready: '.g-shell' },
  { name: 'browse', path: '/src/dev/visual/browse.html', ready: '.vh-browse' },
  { name: 'media-detail', path: '/src/dev/visual/media-detail.html', ready: '.media-detail' },
  { name: 'player', path: '/src/dev/visual/player.html', ready: '.player' },
  { name: 'auth', path: '/src/dev/visual/auth.html', ready: '.authcard' },
  { name: 'settings', path: '/src/dev/visual/settings.html', ready: '.vh-settings' },
  { name: 'shell', path: '/src/dev/visual/shell.html', ready: '.shell' },
];

/**
 * Pin theme + density on <html>, wait for fonts, then GUARANTEE the entrance
 * animation has settled before axe samples colors. The `Reveal` primitive starts at
 * `opacity:0` and fades in over a staggered delay; a first run flagged `color-contrast`
 * on the gallery's `Reveal` demo badges because axe sampled a last, longest-delayed
 * reveal mid-fade and read a blended (sub-AA) ratio — an animation artifact, not a
 * defect (the badge is ~7.6:1 at rest, identical across themes).
 *
 * The load-bearing guard is the final `waitForFunction`: it blocks until EVERY
 * `.phlix-reveal` is at `opacity:1`, so axe never samples a mid-transition color.
 * (Only the gallery mounts `Reveal`; the six per-surface harnesses have none, so the
 * wait resolves immediately there and the `ready`-selector wait above is their guard.)
 * Playwright's global `reducedMotion:'reduce'` (playwright.config.ts) already makes
 * the gallery's reveals settle synchronously on mount, and `data-reduced-motion='true'`
 * activates the CSS kill-switch besides (matching what the per-surface harnesses set
 * via `mountVisual`) — but the `waitForFunction` is what makes correctness independent
 * of either, so it can't go falsely-green or flaky-red on the animation.
 */
async function settle(page: Page, theme: string, ready: string): Promise<void> {
  await page.locator(ready).first().waitFor({ state: 'visible' });
  await page.evaluate((t) => {
    const el = document.documentElement;
    el.setAttribute('data-theme', t);
    el.setAttribute('data-density', 'comfortable');
    el.setAttribute('data-reduced-motion', 'true');
  }, theme);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.phlix-reveal')].every(
      (el) => getComputedStyle(el).opacity === '1',
    ),
  );
}

/** Compact, triage-friendly view of any axe violations for the failure message. */
function summarize(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.map((n) => ({ target: n.target, html: n.html.slice(0, 160) })),
  }));
}

test.describe('a11y — WCAG 2.1 AA (axe)', () => {
  for (const surface of SURFACES) {
    for (const theme of THEMES) {
      test(`${surface.name} · ${theme}`, async ({ page }) => {
        await page.goto(`${surface.path}?theme=${theme}`, { waitUntil: 'load' });
        await settle(page, theme, surface.ready);
        const results = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze();
        const summary = summarize(results.violations);
        expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
      });
    }
  }
});

/**
 * The shell is the one harness that renders a full page (AppLayout). Assert it is
 * ALSO clean under axe's page-structure landmark best-practice rules, which ARE
 * meaningful here: exactly one main, all content within a landmark, a level-one
 * heading, and a logical heading order.
 */
test.describe('a11y — shell landmarks (best-practice)', () => {
  for (const theme of THEMES) {
    test(`shell landmarks · ${theme}`, async ({ page }) => {
      await page.goto(`/src/dev/visual/shell.html?theme=${theme}`, { waitUntil: 'load' });
      await settle(page, theme, '.shell');
      const results = await new AxeBuilder({ page })
        .withRules(['region', 'landmark-one-main', 'page-has-heading-one', 'heading-order'])
        .analyze();
      const summary = summarize(results.violations);
      expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
    });
  }
});
