/**
 * S276 — the SyncPlay client's url set, compared TUPLE-EXACT against the five
 * routes phlix-server actually registers.
 *
 * Every request here goes through {@link makeSyncPlayServer}, which answers a
 * real 404 to anything outside the server manifest. Nothing is stubbed per-call,
 * so a client method that names an unserved url cannot pass.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SyncPlayApi } from './syncplay';
import {
    SERVER_ROUTES,
    makeSyncPlayServer,
    templatize,
    type FakeSyncPlayServer,
    type ObservedRequest,
} from './test/syncplayServer';

const BASE = 'https://media.example.com';
const GROUP_ID = 'sp_abc123';

/** Tuple-exact membership: `[method, template]` compared as one joined string. */
function isRegistered(req: ObservedRequest): boolean {
    const key = `${req.method} ${req.template}`;
    return SERVER_ROUTES.some(([method, template]) => `${method} ${template}` === key);
}

let server: FakeSyncPlayServer;

beforeEach(() => {
    server = makeSyncPlayServer(BASE);
    vi.stubGlobal('fetch', server.fetch);
});

afterEach(() => {
    vi.unstubAllGlobals();
});

// ── the harness is not vacuous ────────────────────────────────────────────────
//
// A route-driven fake that 200s everything would pass every assertion below
// while proving nothing, so prove it discriminates FIRST — and prove it with a
// SUCCEEDING control beside the 404, not with a second 404.

describe('fake server — control', () => {
    it('serves the registered GET /groups/{id} with 200', async () => {
        const res = await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}`, { method: 'GET' });
        expect(res.status).toBe(200);
    });

    it('404s the unserved GET /groups/{id}/members', async () => {
        const res = await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}/members`, { method: 'GET' });
        expect(res.status).toBe(404);
    });

    it('404s a right-path/wrong-method request (GET on the join route)', async () => {
        const res = await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}/join`, { method: 'GET' });
        expect(res.status).toBe(404);
    });

    it('does not let {id} absorb an extra segment', () => {
        // `{id}` is `[^/]+` on the server. If the harness compiled it to `.+`,
        // `/groups/x/members` would match `/groups/{id}` and the whole suite
        // would pass on the broken url.
        expect(templatize('/api/v1/syncplay/groups/x/members')).toBe('/api/v1/syncplay/groups/{id}/members');
        expect(SERVER_ROUTES.map(([m, t]) => `${m} ${t}`)).not.toContain('GET /api/v1/syncplay/groups/{id}/members');
    });

    it('pins the manifest size — five routes, no more', () => {
        expect(SERVER_ROUTES).toHaveLength(5);
    });
});

// ── the audit ─────────────────────────────────────────────────────────────────

describe('SyncPlayApi — every url is a registered server route', () => {
    /**
     * Drive EVERY REST method on the client. `sendStateUpdate`/`sendCommand` are
     * deliberately included: they are documented as no-op WebSocket placeholders,
     * and calling them here proves they issue no HTTP request rather than taking
     * that on trust.
     */
    async function driveEveryMethod(api: SyncPlayApi): Promise<void> {
        await api.listGroups();
        await api.listPublicRooms();
        await api.createRoom({ name: 'Movie Night', isPublic: true });
        await api.getState(GROUP_ID);
        await api.getMembers(GROUP_ID);
        await api.joinRoom(GROUP_ID);
        await api.leaveRoom(GROUP_ID);
        await api.sendStateUpdate('sess-1', {
            sessionId: 'sess-1',
            playbackPosition: 1,
            playbackRate: 1,
            serverTime: 0,
            timestamp: '2026-01-01T00:00:00Z',
        });
        await api.sendCommand('sess-1', {
            type: 'play',
            issuedBy: 'u1',
            issuedAt: '2026-01-01T00:00:00Z',
        });
    }

    it('issues only registered routes, and every call succeeds', async () => {
        const api = new SyncPlayApi(BASE);
        await driveEveryMethod(api);

        // Denominator, stated: 7 REST calls (listGroups, listPublicRooms→listGroups,
        // createRoom, getState, getMembers, joinRoom, leaveRoom) and 0 from the two
        // WebSocket placeholders. A zero-length `requests` would otherwise make
        // every assertion below vacuously true.
        expect(server.requests).toHaveLength(7);

        const unregistered = server.requests.filter((r) => !isRegistered(r));
        expect(unregistered.map((r) => `${r.method} ${r.template}`)).toEqual([]);

        const notOk = server.requests.filter((r) => r.status !== 200);
        expect(notOk.map((r) => `${r.method} ${r.path} → ${r.status}`)).toEqual([]);
    });

    it('touches four of the five registered routes, and never /members', async () => {
        const api = new SyncPlayApi(BASE);
        await driveEveryMethod(api);

        const distinct = [...new Set(server.requests.map((r) => `${r.method} ${r.template}`))].sort();
        expect(distinct).toEqual([
            'GET /api/v1/syncplay/groups',
            'GET /api/v1/syncplay/groups/{id}',
            'POST /api/v1/syncplay/groups',
            'POST /api/v1/syncplay/groups/{id}/join',
            'POST /api/v1/syncplay/groups/{id}/leave',
        ]);
        // `POST /groups/{id}/leave` is the fifth; all five are reached, so the
        // list above is the whole manifest and nothing outside it.
        expect(distinct).toHaveLength(SERVER_ROUTES.length);
    });

    it('getMembers reads the group-state route, not a members route', async () => {
        const api = new SyncPlayApi(BASE);
        const members = await api.getMembers(GROUP_ID);

        expect(server.requests).toHaveLength(1);
        expect(server.requests[0]!.path).toBe(`/api/v1/syncplay/groups/${GROUP_ID}`);
        expect(server.requests[0]!.status).toBe(200);
        // …and it really does yield the members, so "no 404" is not a pass by omission.
        expect(members.map((m) => m.name)).toEqual(['Alice', 'Bob']);
        expect(members.find((m) => m.name === 'Alice')!.role).toBe('owner');
        expect(members.find((m) => m.name === 'Bob')!.role).toBe('contributor');
    });
});

// ── the wire shape is the SERVER's, not the UI's ──────────────────────────────

describe('SyncPlayApi — maps the real snake_case wire shape', () => {
    it('joinRoom builds a session from `{ success, group }`', async () => {
        const api = new SyncPlayApi(BASE);
        const session = await api.joinRoom(GROUP_ID);

        // The server sends NO `session` key at all. Reading `res.session` yielded
        // `undefined`, and `session.activeUsers` then threw in the store.
        expect(session).toBeDefined();
        expect(session.id).toBe(GROUP_ID);
        expect(session.roomId).toBe(GROUP_ID);
        expect(session.state).toBe('playing');
        expect(session.playbackPosition).toBe(123);
        expect(session.playbackRate).toBe(1);
        expect(session.createdBy).toBe('m1');
        expect(session.activeUsers).toHaveLength(2);
    });

    it('a paused group gets rate 0 so drift is not extrapolated', async () => {
        const api = new SyncPlayApi(BASE);
        const session = await api.getState(GROUP_ID);
        expect(session.playbackRate).toBe(1);

        // Re-serve with a paused state via a fresh server whose fixture differs.
        const paused = makeSyncPlayServer(BASE);
        const original = paused.fetch;
        vi.stubGlobal('fetch', ((url: string, init?: RequestInit) =>
            original(url, init).then(async (res) => {
                const body = (await res.json()) as { group?: Record<string, unknown> };
                if (body.group) body.group['playback_state'] = 'paused';
                return {
                    ok: res.ok,
                    status: res.status,
                    headers: res.headers,
                    json: () => Promise.resolve(body),
                    text: () => Promise.resolve(JSON.stringify(body)),
                } as unknown as Response;
            })) as unknown as typeof fetch);

        const pausedApi = new SyncPlayApi(BASE);
        const pausedSession = await pausedApi.getState(GROUP_ID);
        expect(pausedSession.state).toBe('paused');
        expect(pausedSession.playbackRate).toBe(0);
    });

    it('listGroups maps the reduced listing row (`id`/`name`, not `group_id`)', async () => {
        const api = new SyncPlayApi(BASE);
        const groups = await api.listGroups();

        expect(groups).toHaveLength(1);
        expect(groups[0]!.id).toBe(GROUP_ID);
        expect(groups[0]!.name).toBe('Movie Night');
        expect(groups[0]!.memberCount).toBe(2);
        expect(groups[0]!.isPublic).toBe(true);
    });

    it('createRoom maps `{ success, group }` onto a room with a usable id', async () => {
        const api = new SyncPlayApi(BASE);
        const room = await api.createRoom({ name: 'Movie Night', isPublic: true });
        // `room.id` feeds straight into `joinRoom(room.id)`; an undefined id would
        // request `/groups/undefined/join`.
        expect(room.id).toBe(GROUP_ID);
        expect(room.name).toBe('Movie Night');
        expect(room.memberCount).toBe(2);
    });
});
