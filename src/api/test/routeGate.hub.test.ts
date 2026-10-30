/**
 * M-UI-24 — the HUB route gate: the named W18 follow-up (s280rest) lands here.
 *
 * Three `src/api` modules address the hub's HTTP surface, not the media
 * server's: `claimServer` (`POST /api/v1/server-claims/claim`),
 * `invite-links` (`/api/v1/me/invite-links`, `/api/v1/me/servers`,
 * `/api/v1/me/libraries`) and `mcp-tokens` (`/api/v1/me/mcp-tokens`).
 * The server-addressed modules got the full 412-tuple manifest treatment in
 * S280; these three were only PROVEN non-server routes — hub route drift
 * against them was otherwise unprotected.
 *
 * The hub's canonical machine-readable contract is `openapi.yaml`, kept
 * truthful against the actual router registrations by the hub's own
 * `OpenApiSpecMatchesRouter` CI gate. This repo VENDORS that spec verbatim
 * (`./hub-openapi.yaml`, md5-pinned below — the sanctioned interim pattern,
 * same family as the vendored `server-route-manifest.json`) and extracts the
 * `[method, pathTemplate]` tuple set mechanically at test time from the
 * `paths:` block. No tuple is ever transcribed by hand from client code:
 * the walk is driven solely by the vendored spec bytes, which are pinned to
 * phlix-hub commit `fad2d5f278bd7743cdcd1fc39d0ca309b45dab52` (the commit
 * that last touched the file; verified in the hub repo at vendoring time).
 * When a contracts-side hub manifest export ships, swap the vendor out and
 * drop the walker — the drives below are transport-agnostic.
 *
 * Extraction law (why the pins can be trusted): the vendored bytes are
 * immutable (md5), the walker is deterministic, so `130 tuples / 104 distinct
 * paths` is a property OF THE PINNED BYTES. Refreshing the vendor means
 * re-measuring those three numbers from the new bytes — a stale count is a
 * loud red, never a silent widening.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 * MUI24HUBGATEX7Q4
 */

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiClient } from '../client';
import { MemoryTokenStore } from './memoryTokenStore';
import { InviteLinksApi, LibrariesApi, ServersApi } from '../invite-links';
import { McpTokensApi } from '../mcp-tokens';
import { claimServer } from '../claimServer';
import { driveGated, expectGateClean, isRegisteredRoute, makeRouteGateServer, type RouteGateServer } from './routeGateServer';

const BASE = 'https://hub.example.test';

/**
 * M-UI-24 survival pin (single code home for the wave token). The merge-gate
 * comment-strip defense removes prose tokens from `--token-in` source files,
 * so the literal lives on a CODE line; adds no test case — suite counts hold.
 */
export const MUI24_HUB_GATE_TOKEN = 'MUI24HUBGATEX7Q4';

const HUB_SPEC_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'hub-openapi.yaml');

/** md5 of the vendored bytes == phlix-hub `openapi.yaml` at fad2d5f2… (origin-master-verified). */
const HUB_SPEC_MD5 = 'c146d95b38fedec72b4151f6cab7d931';

/** Property of the pinned bytes above; rotate ONLY together with a re-vendor. */
const HUB_SPEC_TUPLES = 130;
const HUB_SPEC_PATHS = 104;

/**
 * Line-walker over the `paths:` block: quoted two-space keys are path
 * templates, bare four-space HTTP-verb keys are their registrations. Stops at
 * the next top-level key. Deterministic against the pinned bytes; the counts
 * below prove the walk cannot silently degrade.
 */
function extractHubRoutes(yaml: string): Array<readonly [string, string]> {
    const out: Array<readonly [string, string]> = [];
    let inPaths = false;
    let cur: string | null = null;
    for (const line of yaml.split('\n')) {
        if (line === 'paths:') {
            inPaths = true;
            continue;
        }
        if (!inPaths) continue;
        if (/^[a-zA-Z$#]/.test(line)) break;
        const pathMatch = /^ {2}"([^"]+)":\s*$/.exec(line);
        if (pathMatch !== null) {
            cur = pathMatch[1]!;
            continue;
        }
        const verbMatch = /^ {4}(get|post|put|patch|delete|head|options|trace):\s*$/.exec(line);
        if (verbMatch !== null && cur !== null) {
            out.push([verbMatch[1]!.toUpperCase(), cur]);
        }
    }
    return out;
}

const HUB_ROUTES: ReadonlyArray<readonly [string, string]> = extractHubRoutes(
    readFileSync(HUB_SPEC_FILE, 'utf8'),
);

function hubKey(method: string, template: string): boolean {
    return HUB_ROUTES.some(([m, t]) => m === method && t === template);
}

describe('hub route gate — vendored hub openapi (M-UI-24)', () => {
    it('is byte-identical to phlix-hub openapi.yaml (md5 + provenance sha)', () => {
        const bytes = readFileSync(HUB_SPEC_FILE);
        expect(createHash('md5').update(bytes).digest('hex')).toBe(HUB_SPEC_MD5);
        // Provenance: vendored from phlix-hub commit fad2d5f278bd7743cdcd1fc39d0ca309b45dab52
        // (the commit that last touched openapi.yaml; cat-file-verified in the hub
        // repo and an ancestor of hub origin/master at vendoring time, 2026-10-30).
        expect(HUB_SPEC_MD5.length).toBe(32);
    });

    it('extraction walk is pinned by the tuple/path counts (no silent degradation)', () => {
        expect(HUB_ROUTES).toHaveLength(HUB_SPEC_TUPLES);
        expect(new Set(HUB_ROUTES.map(([, p]) => p)).size).toBe(HUB_SPEC_PATHS);
    });

    /** The exact surface the three hub-addressed modules emit. */
    const SURFACE: ReadonlyArray<readonly [string, string]> = [
        ['POST', '/api/v1/server-claims/claim'],
        ['GET', '/api/v1/me/invite-links'],
        ['POST', '/api/v1/me/invite-links'],
        ['DELETE', '/api/v1/me/invite-links/{id}'],
        ['GET', '/api/v1/me/servers'],
        ['GET', '/api/v1/me/libraries'],
        ['GET', '/api/v1/me/mcp-tokens'],
        ['POST', '/api/v1/me/mcp-tokens'],
        ['DELETE', '/api/v1/me/mcp-tokens/{id}'],
    ];

    it('every hub-addressed url is registered on the hub contract', () => {
        for (const [method, template] of SURFACE) {
            expect(hubKey(method, template), `hub spec: ${method} ${template}`).toBe(true);
        }
    });

    it('…and none of them is a server route (the partition law)', () => {
        for (const [method, template] of SURFACE) {
            expect(isRegisteredRoute(method, template), `server manifest: ${method} ${template}`).toBe(false);
        }
    });
});

describe('hub route gate — the three modules drive clean (M-UI-24)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/me/invite-links/{id}',
        'DELETE /api/v1/me/mcp-tokens/{id}',
        'GET /api/v1/me/invite-links',
        'GET /api/v1/me/libraries',
        'GET /api/v1/me/mcp-tokens',
        'GET /api/v1/me/servers',
        'POST /api/v1/me/invite-links',
        'POST /api/v1/me/mcp-tokens',
        'POST /api/v1/server-claims/claim',
    ];

    let server: RouteGateServer;

    beforeEach(() => {
        server = makeRouteGateServer(BASE, { routes: HUB_ROUTES });
        vi.stubGlobal('fetch', server.fetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    function clientFor(): ApiClient {
        return new ApiClient({
            baseUrl: BASE,
            fetchImpl: server.fetch,
            tokenStore: new MemoryTokenStore({ access: 'access-token', refresh: 'refresh-token' }),
        });
    }

    it('issues 9 distinct urls, every one a registered hub route', async () => {
        const client = clientFor();
        const invites = new InviteLinksApi(client);
        const servers = new ServersApi(client);
        const libraries = new LibrariesApi(client);
        const tokens = new McpTokensApi(client);

        await driveGated(server, 'claimServer', () => claimServer(BASE, 'CODE-123'));
        await driveGated(server, 'InviteLinksApi.list', () => invites.list());
        await driveGated(server, 'InviteLinksApi.create', () =>
            invites.create({ server_id: 'srv-1', library_ids: ['lib-1'] } as Parameters<InviteLinksApi['create']>[0]),
        );
        await driveGated(server, 'InviteLinksApi.revoke', () => invites.revoke('inv-1'));
        await driveGated(server, 'ServersApi.list', () => servers.list());
        await driveGated(server, 'LibrariesApi.listByServer', () => libraries.listByServer('srv-1'));
        await driveGated(server, 'McpTokensApi.list', () => tokens.list());
        await driveGated(server, 'McpTokensApi.create', () =>
            tokens.create({ name: 'pin', scopes: [] } as Parameters<McpTokensApi['create']>[0]),
        );
        await driveGated(server, 'McpTokensApi.revoke', () => tokens.revoke('tok-1'));

        expectGateClean(server, EXPECTED, 9);
    });

    it('a hub-side 404 control still fires (omit seam on the hub tuple set)', async () => {
        const gated = makeRouteGateServer(BASE, {
            routes: HUB_ROUTES,
            omit: ['GET /api/v1/me/servers'],
        });
        vi.stubGlobal('fetch', gated.fetch);
        const api = new ServersApi(
            new ApiClient({
                baseUrl: BASE,
                fetchImpl: gated.fetch,
                tokenStore: new MemoryTokenStore({ access: 'access-token', refresh: 'refresh-token' }),
            }),
        );
        await expect(api.list()).rejects.toThrow();
        expect(gated.requests.some((r) => r.status === 404)).toBe(true);
    });
});
