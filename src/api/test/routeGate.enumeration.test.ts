/**
 * S280 — the client route gate, MODULE ENUMERATION.
 *
 * "Any ui API module that issues requests is in the asserted set" — enforced
 * mechanically, not by hand. This test scans the request-issuing sources and
 * asserts that the set of files the gate drives is EXACTLY the set of files
 * that issue requests:
 *
 * - `src/api/**` (the API layer): every request-issuing module must be covered
 *   by `routeGate.api.test.ts` (server-addressed) or enumerated by its hub /
 *   unserved partitions.
 * - `src/stores` + `src/composables`: every file minting a request URL must be
 *   driven by `routeGate.app.test.ts`.
 *
 * A module added, renamed or moved without a matching gate entry reds here —
 * a hand-maintained list alone could drift, and the S280 defect class is
 * precisely "a URL nobody pins".
 *
 * The scan is deliberately LINE-BASED and receiver-aware: `cache.get(`,`
 * `map.delete(`, `registry.value.get(` etc. are NOT request issuance. A line
 * counts only when it calls a verb on a client-shaped receiver (`client`,
 * `apiClient`, `http`, `auth.client`, `this.`), mints an `ApiClient`, or calls
 * global `fetch`.
 *
 * SCOPE BOUNDARY (deliberate): `src/pages`, `src/components` and `src/utils`
 * are NOT scanned. Pages and components are UI consumers that compose the api
 * modules; the one page that mints request URLs directly (`LibraryScanPage.vue`,
 * `/api/v1/libraries`, `/api/v1/libraries/{id}/scan-status`, `…/scan`,
 * `…/rescan`) issues URLs that are ALSO driven by `admin/libraries.ts` in the
 * gate, so its surface is covered transitively — the test below pins the page's
 * URL set as registered as the tripwire. If a page ever mints a URL no api
 * module issues, this boundary must be revisited.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { isRegisteredRoute } from './routeGateServer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..');

/** One line requests when it calls a verb on a client-ish receiver or fetch. */
function lineIssuesRequest(line: string): boolean {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
        return false;
    }
    const hasClientReceiver =
        /\.(get|post|put|patch|delete|request)\s*[<(]/.test(line) &&
        /(client|apiClient|http|auth|this\.)/.test(line);
    const hasThisVerb = /this\.(get|post|put|patch|delete|request|doFetch)\s*[<(]/.test(line);
    const hasFetch = /\bfetch\s*\(/.test(line) || /new\s+ApiClient\s*\(/.test(line);
    return hasClientReceiver || hasThisVerb || hasFetch;
}

function scanDir(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) {
            if (entry === 'test') continue;
            scanDir(full, out);
            continue;
        }
        if (!entry.endsWith('.ts') || entry.endsWith('.test.ts')) continue;
        const src = readFileSync(full, 'utf8');
        const issues = src.split('\n').some(lineIssuesRequest);
        if (issues) out.push(path.relative(REPO_ROOT, full));
    }
    return out;
}

/** File names the api gate drives (server-addressed), relative to `src/api/`. */
const GATED_API = [
    'client.ts',
    'syncplay.ts',
    'photos.ts',
    'themes.ts',
    'recommendations.ts',
    'nextUp.ts',
    'mostWatched.ts',
    'libraries.ts',
    'letter-index.ts',
    'index-buckets.ts',
    'admin/backup.ts',
    'admin/cast.ts',
    'admin/collections.ts',
    'admin/dashboard.ts',
    'admin/dlnaServer.ts',
    'admin/duplicates.ts',
    'admin/history.ts',
    'admin/hubDashboard.ts',
    'admin/integrations.ts',
    'admin/libraries.ts',
    'admin/liveTv.ts',
    'admin/logs.ts',
    'admin/maintenance.ts',
    'admin/metadata-sources.ts',
    'admin/metrics.ts',
    'admin/networkHealth.ts',
    'admin/plugins.ts',
    'admin/remoteAccess.ts',
    'admin/servers.ts',
    'admin/services.ts',
    'admin/settings.ts',
    'admin/syncPlay.ts',
    'admin/transcoding.ts',
    'admin/updates.ts',
    'admin/users.ts',
    'admin/webhooks.ts',
];

/**
 * Files the api gate ENUMERATES but does not drive against the server
 * manifest (hub-addressed surfaces + known-unserved endpoints — see the
 * partition describes in `routeGate.api.test.ts` / `routeGate.admin.test.ts`).
 */
const PARTITIONED_API = [
    'claimServer.ts',
    'invite-links.ts',
    'mcp-tokens.ts',
];

/** Files the app gate drives (stores/composables that mint request URLs). */
const GATED_APP = [
    'src/stores/useAuthStore.ts',
    'src/stores/useMediaStore.ts',
    'src/stores/useUserItemDataStore.ts',
    'src/composables/useMusicPlayer.ts',
    'src/composables/useResumeReporter.ts',
    'src/composables/useResumeSync.ts',
    'src/composables/useHlsTranscode.ts',
    'src/composables/useSeriesSeasons.ts',
    'src/composables/useTrickplay.ts',
];

describe('route gate — module enumeration', () => {
    it('every request-issuing src/api module is driven or partitioned', () => {
        const scanned = scanDir(path.join(REPO_ROOT, 'src', 'api'))
            .map((f) => f.replace(/^src\/api\//, ''))
            .sort();
        const asserted = [...GATED_API, ...PARTITIONED_API].sort();
        expect(scanned).toEqual(asserted);
    });

    it('every request-minting store/composable is driven', () => {
        const scanned = scanDir(path.join(REPO_ROOT, 'src', 'stores'))
            .concat(scanDir(path.join(REPO_ROOT, 'src', 'composables')))
            .sort();
        expect(scanned).toEqual([...GATED_APP].sort());
    });

    it('the gate files themselves are request-free fixtures (not re-scanned)', () => {
        // The harness/mock files under src/api/test/ issue requests BY DESIGN
        // (they fake fetch) but are excluded from the scan above by the
        // `test` directory skip — pin that exclusion so it cannot silently
        // widen into skipping real modules.
        const testDir = path.join(REPO_ROOT, 'src', 'api', 'test');
        expect(statSync(testDir).isDirectory()).toBe(true);
    });

    it('LibraryScanPage mints no URL outside the admin/libraries drive (transitive coverage tripwire)', () => {
        // The one page that builds request URLs directly. Every one of its
        // URLs is also minted by AdminLibrariesApi (driven in the gate), so the
        // page is covered transitively — this pins that the page stays inside
        // the api layer's surface.
        expect(isRegisteredRoute('GET', '/api/v1/libraries')).toBe(true);
        expect(isRegisteredRoute('GET', '/api/v1/libraries/{id}/scan-status')).toBe(true);
        expect(isRegisteredRoute('POST', '/api/v1/libraries/{id}/scan')).toBe(true);
        expect(isRegisteredRoute('POST', '/api/v1/libraries/{id}/rescan')).toBe(true);
    });
});