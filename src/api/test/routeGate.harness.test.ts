/**
 * S280 — harness controls for the client route gate.
 *
 * A route-driven fake that 200s everything would pass every gate assertion
 * below while proving nothing, so prove it discriminates FIRST — with a
 * SUCCEEDING control beside each 404, not with a second 404.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import {
    SERVER_ROUTE_MANIFEST,
    SERVER_ROUTE_MANIFEST_PROVENANCE,
    makeRouteGateServer,
    isRegisteredRoute,
} from './routeGateServer';

const BASE = 'https://media.example.com';

describe('route gate server — control', () => {
    it('serves a registered route with 200', async () => {
        const server = makeRouteGateServer(BASE);
        const res = await server.fetch(`${BASE}/api/v1/media/most-watched`, { method: 'GET' });
        expect(res.status).toBe(200);
        expect(server.requests[0]!.template).toBe('/api/v1/media/most-watched');
    });

    it('404s an unserved sibling — a url that never existed', async () => {
        const server = makeRouteGateServer(BASE);
        const res = await server.fetch(`${BASE}/api/v1/media/abc/non-existent`, { method: 'GET' });
        expect(res.status).toBe(404);
        // The recorded template is the RAW path — the failure output names the
        // exact url the client emitted, never a folded approximation.
        expect(server.requests[0]!.template).toBe('/api/v1/media/abc/non-existent');
        // Control: the registered two-segment sibling still resolves.
        const ok = await server.fetch(`${BASE}/api/v1/media/abc/markers`, { method: 'GET' });
        expect(ok.status).toBe(200);
    });

    it('a renamed static route is ABSORBED by {id} and therefore still 200s — the tuple-exact layer catches it', async () => {
        // The S31 mutation (`most-watched-MUTATED` is a strict SUPERSTRING of
        // `most-watched`) is a REAL registered route: it dispatches to the
        // generic `GET /api/v1/media/{id}` handler. The 404 layer cannot see
        // it, by construction — which is exactly why the gate asserts
        // TUPLE-EXACT membership on the recorded template, not just 200s.
        const server = makeRouteGateServer(BASE);
        const res = await server.fetch(`${BASE}/api/v1/media/most-watched-MUTATED`, { method: 'GET' });
        expect(res.status).toBe(200);
        expect(server.requests[0]!.template).toBe('/api/v1/media/{id}');
        expect(isRegisteredRoute('GET', server.requests[0]!.template)).toBe(true);
        expect(isRegisteredRoute('GET', '/api/v1/media/most-watched-MUTATED')).toBe(false);
    });

    it('404s a right-path/wrong-method request (GET on a POST-only route)', async () => {
        const server = makeRouteGateServer(BASE);
        const res = await server.fetch(`${BASE}/api/v1/auth/login`, { method: 'GET' });
        expect(res.status).toBe(404);
        // Control: the same path with the registered verb succeeds.
        const ok = await server.fetch(`${BASE}/api/v1/auth/login`, { method: 'POST', body: '{}' });
        expect(ok.status).toBe(200);
    });

    it('does not let {param} absorb an extra segment (sibling-wildcard guard)', async () => {
        const server = makeRouteGateServer(BASE);
        // `/api/v1/media/{id}` matches ONE segment — it cannot absorb a sibling.
        const res = await server.fetch(`${BASE}/api/v1/media/abc/def`, { method: 'GET' });
        expect(res.status).toBe(404);
        // The S276 defect shape, restated against the general harness.
        const members = await server.fetch(`${BASE}/api/v1/syncplay/groups/x/members`, { method: 'GET' });
        expect(members.status).toBe(404);
        // Control: the two-segment path that IS registered still resolves.
        const ok = await server.fetch(`${BASE}/api/v1/media/abc/markers`, { method: 'GET' });
        expect(ok.status).toBe(200);
    });

    it('strips the base URL and the query string before matching', async () => {
        const server = makeRouteGateServer(BASE);
        const res = await server.fetch(`${BASE}/api/v1/media?limit=100&offset=0`, { method: 'GET' });
        expect(res.status).toBe(200);
        expect(server.requests[0]!.path).toBe('/api/v1/media');
        expect(server.requests[0]!.template).toBe('/api/v1/media');
    });

    it('pins the manifest size — 400 tuples, no more', () => {
        expect(SERVER_ROUTE_MANIFEST).toHaveLength(400);
    });

    it('pins the manifest provenance — server sha + generator, never hand-edited', () => {
        // Canonical contracts export vendored at contracts 09161041 (full-literal
        // sha + md5 pins live in routeGate.api.test.ts's currency block).
        expect(SERVER_ROUTE_MANIFEST_PROVENANCE.serverSha).toMatch(/^[0-9a-f]{40}$/);
        expect(SERVER_ROUTE_MANIFEST_PROVENANCE.generator).toBe(
            'scripts/generate-server-route-manifest.mjs',
        );
        expect(SERVER_ROUTE_MANIFEST_PROVENANCE.total).toBe(400);
        expect(SERVER_ROUTE_MANIFEST_PROVENANCE.shared).toBe(11);
        // The union source split — 364 Application + 47 WebPortal, 11 shared.
        expect(SERVER_ROUTE_MANIFEST_PROVENANCE.sources).toEqual([
            { file: 'tests/Unit/Server/Core/ApplicationRouterWirePathGuardTest.php', count: 364 },
            { file: 'tests/Unit/Server/WebPortal/WebPortalRouterWirePathGuardTest.php', count: 47 },
        ]);
    });

    it('isRegisteredRoute is tuple-exact — never a substring', () => {
        expect(isRegisteredRoute('GET', '/api/v1/media/most-watched')).toBe(true);
        // The S31 mutation: a SUPERSTRING of a real path is NOT registered.
        expect(isRegisteredRoute('GET', '/api/v1/media/most-watched-MUTATED')).toBe(false);
        // Right path, wrong verb is NOT registered.
        expect(isRegisteredRoute('POST', '/api/v1/media/most-watched')).toBe(false);
    });

    it('the omit seam un-registers a route the client legitimately calls', async () => {
        // `POST /api/v1/auth/login` has no wildcard sibling, so un-registering
        // it makes the request truly unrouted (a static route shadowed by a
        // `{param}` sibling would still 200 — see the absorption control above).
        const server = makeRouteGateServer(BASE, { omit: ['POST /api/v1/auth/login'] });
        const res = await server.fetch(`${BASE}/api/v1/auth/login`, { method: 'POST', body: '{}' });
        expect(res.status).toBe(404);
        expect(server.served).not.toContain(['POST', '/api/v1/auth/login']);
        // Everything else is unaffected — a hollowed harness would 404 ALL.
        const other = await server.fetch(`${BASE}/api/v1/auth/login`, { method: 'GET' });
        expect(other.status).toBe(404);
        const still = await server.fetch(`${BASE}/api/v1/auth/refresh`, { method: 'POST', body: '{}' });
        expect(still.status).toBe(200);
    });
});