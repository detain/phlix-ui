/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Guards for the admin per-page help corpus (plan_settings.md Phase 9).
 *
 * The plan records "no owner for the 80+ help links going stale" as an
 * unaddressed gap, and the server-settings schema already has a `@group network`
 * liveness test for its own links. This is the SPA-side equivalent, plus the
 * structural checks that catch the two failure modes a liveness probe cannot:
 *
 *  - a routed admin page with **no** help entry (the Phase 9 gap re-opening), and
 *  - a help entry that exists but **nothing renders** — class (g) in the plan's
 *    read-path taxonomy, the failure mode that survives every grep-based review.
 *
 * The liveness probe is opt-in (`PHLIX_NETWORK_TESTS=1`) so the default suite
 * stays hermetic and offline, mirroring the PHPUnit `@group network` split.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import { adminPageHelp, DOCS_BASE, type PageHelp } from './helpLinks';

const here = dirname(fileURLToPath(import.meta.url));
const adminTs = readFileSync(join(here, '../../app/admin.ts'), 'utf8');

/**
 * Every admin route whose component lives in `src/pages/admin/`, read from the
 * route table itself rather than from a hand-maintained list — so adding a page
 * without help fails here instead of shipping silently.
 *
 * `admin-audit-logs` is excluded automatically: its component is
 * `../pages/AuditLogsPage.vue`, outside this directory.
 */
function routedAdminPages(): Array<{ key: string; file: string }> {
  // The gap between `name:` and `component:` must not span another `name:`.
  // A plain lazy `[\s\S]*?` is WRONG here and silently mispairs: `admin-audit-logs`
  // imports `../pages/AuditLogsPage.vue`, which is outside this directory, so a
  // lazy gap skips over it and marries that route to the NEXT page's import —
  // stealing `requests` and inventing an `audit-logs` entry that owns
  // RequestsPage.vue. Caught only because the coverage assertions below name the
  // page they expect.
  const re =
    /name:\s*'admin-([^']+)'(?:(?!name:)[\s\S])*?component:\s*\(\)\s*=>\s*import\('\.\.\/pages\/admin\/([^']+)'\)/g;
  const out: Array<{ key: string; file: string }> = [];
  for (const m of adminTs.matchAll(re)) out.push({ key: m[1]!, file: m[2]! });
  return out;
}

const pages = routedAdminPages();

describe('admin help — route coverage', () => {
  it('finds the routed admin pages (the parser itself works)', () => {
    // A weak version of this assertion (length >= 20, contains 'dashboard') let a
    // mispairing bug through: the parser had married `admin-audit-logs` to
    // RequestsPage.vue and dropped `requests` entirely, and every downstream
    // assertion still passed. Pin the exact pairings that bug got wrong.
    const byKey = new Map(pages.map((p) => [p.key, p.file]));
    expect(pages).toHaveLength(22);
    expect(byKey.get('dashboard')).toBe('DashboardPage.vue');
    expect(byKey.get('requests')).toBe('RequestsPage.vue');
    expect(byKey.get('hub-dashboard')).toBe('HubDashboardPage.vue');
    // `admin-audit-logs` renders ../pages/AuditLogsPage.vue, outside this
    // directory, so it must not appear at all.
    expect(byKey.has('audit-logs')).toBe(false);
    expect(pages.map((p) => p.file)).not.toContain('AuditLogsPage.vue');
    // No page may be claimed twice.
    expect(new Set(pages.map((p) => p.file)).size).toBe(pages.length);
  });

  it('gives every routed admin page a help entry', () => {
    const missing = pages.filter((p) => !(p.key in adminPageHelp)).map((p) => p.key);
    expect(missing, `routed admin pages with no help entry: ${missing.join(', ')}`).toEqual([]);
  });

  it('has no help entry for a page that is not routed', () => {
    const routed = new Set(pages.map((p) => p.key));
    const orphans = Object.keys(adminPageHelp).filter((k) => !routed.has(k));
    expect(orphans, `help entries for unrouted pages: ${orphans.join(', ')}`).toEqual([]);
  });

  it('does not document WebhookLogsPage, which nothing routes', () => {
    // Deliberate exclusion, asserted so a future pass does not "helpfully" add
    // it back. The page is unreachable and all three of its API calls target
    // endpoints the server does not implement.
    expect(Object.keys(adminPageHelp)).not.toContain('webhook-logs');
    expect(adminTs).not.toContain('WebhookLogsPage.vue');
  });
});

describe('admin help — every entry is actually rendered', () => {
  it.each(pages)('$file renders its help entry', ({ key, file }) => {
    const src = readFileSync(join(here, file), 'utf8');
    const accessor = key.includes('-') ? `adminPageHelp['${key}']` : `adminPageHelp.${key}`;
    // Both slots must be bound, not just imported — an import with no binding
    // is exactly the "resolvable but not consumed" shape this plan keeps hitting.
    expect(src, `${file} does not bind :links`).toContain(`:links="${accessor}.links"`);
    expect(src, `${file} does not bind :details`).toContain(`:details="${accessor}.details"`);
  });
});

describe('admin help — content shape', () => {
  const entries = Object.entries(adminPageHelp) as Array<[string, PageHelp]>;

  it.each(entries)('%s has a substantive details panel', (_key, help) => {
    expect(help.details.length).toBeGreaterThan(80);
    // `details` is interpolated with {{ }}, so markup would render literally.
    expect(help.details).not.toMatch(/<[a-z/]/i);
  });

  it.each(entries)('%s links are well-formed docs URLs', (_key, help) => {
    for (const link of help.links) {
      expect(link.text.trim()).not.toBe('');
      expect(link.url.startsWith(`${DOCS_BASE}/`), `${link.url} is not under ${DOCS_BASE}`).toBe(true);
      // VitePress emits one .html per page and the site has no extensionless rewrite.
      expect(link.url.endsWith('.html'), `${link.url} must end in .html`).toBe(true);
    }
  });

  it('has no duplicate link text within a page', () => {
    for (const [key, help] of entries) {
      const texts = help.links.map((l) => l.text);
      expect(new Set(texts).size, `${key} repeats a link label`).toBe(texts.length);
    }
  });

  it('documents why Cast Devices has no links', () => {
    // An empty `links` array is a deliberate outcome, not an oversight: there is
    // no user-facing casting doc, and the developer discovery page documents a
    // Roku service string that cannot work. Asserted so the intent survives.
    expect(adminPageHelp.cast.links).toEqual([]);
    expect(adminPageHelp.cast.details.length).toBeGreaterThan(80);
  });
});

/**
 * Opt-in liveness probe. Run with `PHLIX_NETWORK_TESTS=1 npm run test:run`.
 *
 * Mirrors `ServerSettingsSchemaTest::test_help_links_resolve()` in phlix-shared.
 */
describe.runIf(process.env.PHLIX_NETWORK_TESTS === '1')('admin help — links resolve', () => {
  /**
   * Probe a URL with `node:https` rather than `fetch`.
   *
   * `src/test/setup.ts:10` does `globalThis.fetch = vi.fn()`, so a `fetch`-based
   * probe here measures the STUB, not the network — it resolves `undefined` and
   * every URL reports as dead. That is a test-double artifact, not a finding.
   * `node:https` is untouched by the setup file and needs no extra dependency.
   */
  function status(url: string, depth = 0): Promise<number> {
    return new Promise((resolve, reject) => {
      if (depth > 5) return resolve(310);
      https
        .get(url, { headers: { 'user-agent': 'phlix-ui-link-check' } }, (res) => {
          const code = res.statusCode ?? 0;
          res.resume();
          if (code >= 300 && code < 400 && res.headers.location) {
            resolve(status(new URL(res.headers.location, url).toString(), depth + 1));
            return;
          }
          resolve(code);
        })
        .on('error', reject)
        .setTimeout(20_000, function (this: { destroy: () => void }) {
          this.destroy();
          reject(new Error('timeout'));
        });
    });
  }

  // Verify the verifier before trusting it. A probe that cannot fail proves
  // nothing — and this exact check is what exposed the stubbed-`fetch` problem
  // above, where all 40 URLs "failed" and a bogus one would have too.
  it('the probe discriminates: a nonexistent docs page 404s', async () => {
    expect(await status(`${DOCS_BASE}/admin/definitely-not-a-real-page.html`)).toBe(404);
    expect(await status(`${DOCS_BASE}/admin/dashboard.html`)).toBe(200);
  }, 60_000);

  it(
    'every documentation URL returns a success status',
    async () => {
      const urls = [...new Set(Object.values(adminPageHelp).flatMap((h) => h.links.map((l) => l.url)))];
      expect(urls.length).toBeGreaterThan(0);

      const dead: string[] = [];
      for (const url of urls) {
        try {
          const code = await status(url);
          if (code !== 200) dead.push(`${url} -> ${code}`);
        } catch (e) {
          dead.push(`${url} -> ${(e as Error).message}`);
        }
      }
      expect(dead, `dead documentation links:\n${dead.join('\n')}`).toEqual([]);
    },
    180_000,
  );
});
