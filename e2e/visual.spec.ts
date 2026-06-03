import { test, expect } from '@playwright/test';

/**
 * R6.4a — Visual regression baselines for the `@phlix/ui` primitive Gallery.
 *
 * The Gallery (`src/dev/gallery.html` → `Gallery.vue`) renders every design-system
 * primitive (Button, Badge, Slider, Switch, Chip, Select, Combobox, Tabs, Skeleton,
 * Spinner, EmptyState, Kbd, …) so a single full-page screenshot per theme captures
 * the whole primitive surface. Captured at desktop (1280) + mobile (390) widths via
 * the two Playwright projects, across all three built-in themes.
 *
 * Per-surface harnesses (Browse / MediaDetail / Player / Auth / Settings / shell) and
 * the MCP acceptance sweep vs the locked `src/dev/mockups/*.html` land in R6.4b.
 */

const THEMES = ['nocturne', 'daylight', 'midnight'] as const;

test.describe('visual — primitive gallery', () => {
    for (const theme of THEMES) {
        test(`gallery · ${theme}`, async ({ page }) => {
            await page.goto('/src/dev/gallery.html', { waitUntil: 'load' });
            // Wait for the Vue app to mount.
            await page.locator('.g-shell').waitFor({ state: 'visible' });
            // The Gallery owns `data-theme`/`data-density` through its own switcher (it
            // does not use the `useTheme` composable) and only re-applies them on a button
            // click — so setting the attributes directly is stable and won't be overwritten.
            // Pin density explicitly too, so the baseline stays "comfortable" regardless of
            // any future change to the Gallery's internal `compact` default.
            await page.evaluate((t) => {
                document.documentElement.setAttribute('data-theme', t);
                document.documentElement.setAttribute('data-density', 'comfortable');
            }, theme);
            // Self-hosted fonts must be loaded before snapshotting or text metrics shift.
            await page.evaluate(() => document.fonts.ready);
            await expect(page).toHaveScreenshot(`gallery-${theme}.png`, { fullPage: true });
        });
    }
});
