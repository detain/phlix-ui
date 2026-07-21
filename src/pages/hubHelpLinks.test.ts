/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Guards for the user-facing hub page help corpus (plan_settings.md Phase 9).
 *
 * The structural checks catch the two failure modes a liveness probe cannot:
 *
 *  - a target hub page with **no** help entry, and
 *  - a help entry that exists but **nothing renders** — class (g) in the plan's
 *    read-path taxonomy, the failure mode that survives every grep-based review.
 *
 * The liveness probe is opt-in (`PHLIX_NETWORK_TESTS=1`) so the default suite
 * stays hermetic, and it asserts its OWN discrimination (a fake URL must 404)
 * because a probe that cannot fail proves nothing — the exact trap that made a
 * `fetch`-based probe report all URLs dead while `curl` said they were fine
 * (`src/test/setup.ts:10` stubs `globalThis.fetch`).
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import { hubPageHelp, DOCS_BASE, type HubPageHelp } from './hubHelpLinks';

const here = dirname(fileURLToPath(import.meta.url));

/**
 * The hub management pages this corpus covers, mapped to their `.vue` file.
 * A hand-maintained list is acceptable here (unlike the admin corpus, which
 * walks a route table) because these pages are routed from OUTSIDE this
 * library — in the consuming web-ui trees — so there is no in-repo route table
 * to read. The binding test below still catches an entry nothing renders.
 */
const PAGES: Array<{ key: string; file: string }> = [
  { key: 'my-servers', file: 'MyServersPage.vue' },
  { key: 'server-detail', file: 'ServerDetailPage.vue' },
  { key: 'federation', file: 'FederationPage.vue' },
  { key: 'federation-shares', file: 'FederationSharesPage.vue' },
  { key: 'manage-shares', file: 'ManageSharesPage.vue' },
  { key: 'shared-with-me', file: 'SharedWithMePage.vue' },
  { key: 'invite-links', file: 'InviteLinksPage.vue' },
  { key: 'requests', file: 'RequestsPage.vue' },
];

describe('hub help — coverage', () => {
  it.each(PAGES)('$key has a help entry', ({ key }) => {
    expect(key in hubPageHelp, `no hub help entry for ${key}`).toBe(true);
  });

  it('has no help entry for an unknown page', () => {
    const known = new Set(PAGES.map((p) => p.key));
    const orphans = Object.keys(hubPageHelp).filter((k) => !known.has(k));
    expect(orphans, `hub help entries for unknown pages: ${orphans.join(', ')}`).toEqual([]);
  });
});

describe('hub help — every entry is actually rendered', () => {
  it.each(PAGES)('$file binds its help entry', ({ key, file }) => {
    const src = readFileSync(join(here, file), 'utf8');
    const accessor = key.includes('-') ? `hubPageHelp['${key}']` : `hubPageHelp.${key}`;
    // Both slots must be bound, not merely imported — an import with no binding
    // is exactly the "resolvable but not consumed" shape this plan keeps hitting.
    expect(src, `${file} does not bind :links`).toContain(`:links="${accessor}.links"`);
    expect(src, `${file} does not bind :details`).toContain(`:details="${accessor}.details"`);
  });
});

describe('hub help — content shape', () => {
  const entries = Object.entries(hubPageHelp) as Array<[string, HubPageHelp]>;

  it.each(entries)('%s has a substantive details panel', (_key, help) => {
    expect(help.details.length).toBeGreaterThan(120);
    // details is interpolated with {{ }}, so markup would render literally.
    expect(help.details).not.toMatch(/<[a-z/]/i);
  });

  it.each(entries)('%s links are well-formed docs URLs', (_key, help) => {
    for (const link of help.links) {
      expect(link.text.trim()).not.toBe('');
      expect(link.url.startsWith(`${DOCS_BASE}/`), `${link.url} is not under ${DOCS_BASE}`).toBe(true);
      expect(link.url.endsWith('.html'), `${link.url} must end in .html`).toBe(true);
    }
  });

  it('federation pages carry no links deliberately', () => {
    // No user-facing federation documentation exists; the only coverage is the
    // operator-facing hub-admin/federation-policy page. Asserted so a future
    // pass does not "helpfully" link it. Both still need a substantive details
    // panel, which the shape test above enforces.
    expect(hubPageHelp.federation.links).toEqual([]);
    expect(hubPageHelp['federation-shares']!.links).toEqual([]);
  });
});

/**
 * Opt-in liveness probe. Run with `PHLIX_NETWORK_TESTS=1 npm run test:run`.
 * Mirrors the admin corpus probe and phlix-shared's `@group network` test.
 */
describe.runIf(process.env.PHLIX_NETWORK_TESTS === '1')('hub help — links resolve', () => {
  function status(url: string, depth = 0): Promise<number> {
    return new Promise((resolve, reject) => {
      if (depth > 5) return resolve(310);
      https
        .get(url, { headers: { 'user-agent': 'phlix-ui-hub-link-check' } }, (res) => {
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

  it('the probe discriminates: a nonexistent docs page 404s', async () => {
    expect(await status(`${DOCS_BASE}/hub/definitely-not-a-real-page.html`)).toBe(404);
    expect(await status(`${DOCS_BASE}/hub/invite-links.html`)).toBe(200);
  }, 60_000);

  it(
    'every documentation URL returns a success status',
    async () => {
      const urls = [...new Set(Object.values(hubPageHelp).flatMap((h) => h.links.map((l) => l.url)))];
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
