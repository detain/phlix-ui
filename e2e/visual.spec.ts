import { test, expect, type Page } from '@playwright/test';

/**
 * Visual regression baselines for `@phlix/ui`.
 *
 * R6.4a — the primitive Gallery (every design-system primitive in one page).
 * R6.4b — per-surface harnesses (Browse / MediaDetail / Player / Auth / Settings
 *         / app shell), mounting the REAL SFCs with deterministic offline mock
 *         data. Each harness reads `?theme=` and forces atmosphere + motion off
 *         for a stable capture (see `src/dev/visual/harness.ts`).
 *
 * Every surface is captured at desktop (1280) + mobile (390) via the two
 * Playwright projects, across all three built-in themes. ON-DEMAND only
 * (`npm run test:visual`) — never in the blocking gate (see playwright.config.ts).
 */

const THEMES = ['nocturne', 'daylight', 'midnight'] as const;

/** Pin theme + density on <html> and wait for fonts so text metrics are stable. */
async function settle(page: Page, theme: string, ready: string): Promise<void> {
  await page.locator(ready).first().waitFor({ state: 'visible' });
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.setAttribute('data-density', 'comfortable');
  }, theme);
  await page.evaluate(() => document.fonts.ready);
}

test.describe('visual — primitive gallery', () => {
  for (const theme of THEMES) {
    test(`gallery · ${theme}`, async ({ page }) => {
      await page.goto(`/src/dev/gallery.html?theme=${theme}`, { waitUntil: 'load' });
      await settle(page, theme, '.g-shell');
      await expect(page).toHaveScreenshot(`gallery-${theme}.png`, { fullPage: true });
    });
  }
});

/**
 * Per-surface harnesses. `ready` is a stable root selector to await before the
 * theme override + screenshot.
 */
const SURFACES: { name: string; path: string; ready: string }[] = [
  { name: 'browse', path: 'browse', ready: '.vh-browse' },
  { name: 'media-detail', path: 'media-detail', ready: '.media-detail' },
  { name: 'player', path: 'player', ready: '.player' },
  { name: 'auth', path: 'auth', ready: '.authcard' },
  { name: 'settings', path: 'settings', ready: '.vh-settings' },
  { name: 'shell', path: 'shell', ready: '.shell' },
];

test.describe('visual — surfaces', () => {
  for (const surface of SURFACES) {
    for (const theme of THEMES) {
      test(`${surface.name} · ${theme}`, async ({ page }) => {
        await page.goto(`/src/dev/visual/${surface.path}.html?theme=${theme}`, { waitUntil: 'load' });
        await settle(page, theme, surface.ready);
        await expect(page).toHaveScreenshot(`${surface.name}-${theme}.png`, { fullPage: true });
      });
    }
  }
});
