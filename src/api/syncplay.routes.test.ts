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

    it('records a JSON body, and survives one that is not JSON', async () => {
        // The body is what the S285 assertions read, so the recorder itself needs
        // a control: a well-formed body is parsed…
        await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}/join`, {
            method: 'POST',
            body: JSON.stringify({ memberName: 'Ada Lovelace' }),
        });
        expect(server.requests[0]!.body).toEqual({ memberName: 'Ada Lovelace' });

        // …and a malformed one is recorded as "no body" rather than throwing out
        // of the fetch and failing the test for the wrong reason.
        const res = await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}/join`, {
            method: 'POST',
            body: 'not json at all',
        });
        expect(res.status).toBe(200);
        expect(server.requests[1]!.body).toBeNull();
        // A JSON scalar is not an object either.
        await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}/join`, { method: 'POST', body: '42' });
        expect(server.requests[2]!.body).toBeNull();
    });

    it('serves a text() view of the same body it serves as JSON', async () => {
        const res = await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}`, { method: 'GET' });
        const asText = await res.text();
        expect(JSON.parse(asText)).toEqual(await server.fetch(`${BASE}/api/v1/syncplay/groups/${GROUP_ID}`, { method: 'GET' }).then((r) => r.json()));
    });
});

// ── the audit ─────────────────────────────────────────────────────────────────

describe('SyncPlayApi — every url is a registered server route', () => {
    /**
     * Drive EVERY REST method on the client.
     *
     * S285: `sendStateUpdate`/`sendCommand` used to be driven here too, with the
     * rationale that calling them proved they issued no HTTP request. They did
     * prove that — but "issues no request" was the whole of their behaviour:
     * both were `async` bodies that did nothing and resolved. The assertion was
     * therefore pinning a no-op as if it were a feature. They are gone (there is
     * no REST route for playback transport, and the WebSocket senders in
     * `api/syncplay.ts` do the job for real), and their absence is now asserted
     * in its own right below rather than by driving them.
     */
    async function driveEveryMethod(api: SyncPlayApi): Promise<void> {
        await api.listGroups();
        await api.listPublicRooms();
        await api.createRoom({ name: 'Movie Night', isPublic: true });
        await api.getState(GROUP_ID);
        await api.getMembers(GROUP_ID);
        await api.joinRoom(GROUP_ID);
        await api.leaveRoom(GROUP_ID);
    }

    it('issues only registered routes, and every call succeeds', async () => {
        const api = new SyncPlayApi(BASE);
        await driveEveryMethod(api);

        // Denominator, stated: 7 REST calls (listGroups, listPublicRooms→listGroups,
        // createRoom, getState, getMembers, joinRoom, leaveRoom). A zero-length
        // `requests` would otherwise make every assertion below vacuously true.
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

    /**
     * S285 — the placeholder guard.
     *
     * `sendStateUpdate()` and `sendCommand()` were `async` methods whose entire
     * body was `void sessionId; void state;`. They resolved, so a caller could
     * not tell a delivered command from a discarded one — the one failure shape
     * no test can catch by observing the caller. There is no REST route to point
     * them at (the manifest above is the whole SyncPlay HTTP surface, and
     * inventing an endpoint is the S276 defect), so they were removed.
     *
     * The method list is pinned EXACTLY and by hand, not filtered for "send"-ish
     * names: a substring check would pass a placeholder called `pushState`, and a
     * list derived from the class itself could never fail. Re-adding any method —
     * placeholder or otherwise — reds this until it is listed and justified.
     */
    it('exposes no playback-transport methods — every method is a registered route', () => {
        const methods = Object.getOwnPropertyNames(SyncPlayApi.prototype)
            .filter((name) => name !== 'constructor')
            .sort();

        expect(methods).toEqual([
            'createRoom',
            'getMembers',
            'getState',
            'joinRoom',
            'leaveRoom',
            'listGroups',
            'listPublicRooms',
        ]);

        // Stated separately from the list above so the intent survives a future
        // edit to it: these two names in particular must not come back.
        const api = new SyncPlayApi(BASE) as unknown as Record<string, unknown>;
        expect(api['sendStateUpdate']).toBeUndefined();
        expect(api['sendCommand']).toBeUndefined();
        // Control: a method that IS supposed to exist resolves off the same
        // instance, so `toBeUndefined()` above is not passing because the lookup
        // itself is broken.
        expect(typeof api['joinRoom']).toBe('function');
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
    it('joinRoom builds BOTH a room and a session from `{ success, group }`', async () => {
        const api = new SyncPlayApi(BASE);
        const { room, session } = await api.joinRoom(GROUP_ID);

        // The server sends NO `session` key at all. Reading `res.session` yielded
        // `undefined`, and `session.activeUsers` then threw in the store.
        expect(session).toBeDefined();
        expect(session.id).toBe(GROUP_ID);
        expect(session.roomId).toBe(GROUP_ID);
        expect(session.state).toBe('playing');
        expect(session.playbackPosition).toBe(123);
        expect(session.playbackRate).toBe(1);
        expect(session.createdBy).toBe('m1');
        // Alice, Bob — and the joiner the fake server just added, exactly as the
        // real `joinGroup()` does (S285).
        expect(session.activeUsers).toHaveLength(3);

        // S283: the ROOM half of the same payload used to be discarded, which
        // left every caller with a null `currentRoom` after a successful join.
        // The name proves it came from the server's `group_name` rather than
        // being reconstructed from the id the caller already had.
        expect(room.id).toBe(GROUP_ID);
        expect(room.name).toBe('Movie Night');
        expect(room.memberCount).toBe(3);
        expect(room.hostUserId).toBe('m1');
    });

    // ── S285: the member NAME travels on the join body ────────────────────────
    //
    // "Every member renders as Anonymous" is not a rendering bug — the name a
    // member appears under is chosen by the joining client and echoed back by the
    // server inside the very same response. These two tests are a matched pair:
    // the second is the control that shows the first can fail.

    it('joins under a supplied name, and the server echoes it back as a member', async () => {
        const api = new SyncPlayApi(BASE);
        const { room, session } = await api.joinRoom(GROUP_ID, 'Ada Lovelace');

        // On the wire.
        expect(server.requests).toHaveLength(1);
        expect(server.requests[0]!.body).toEqual({ memberName: 'Ada Lovelace' });

        // …and back out of the response, which is where the UI reads members
        // from. The name is NOT in the base fixture, so it can only have come
        // from the request.
        expect(session.activeUsers.map((m) => m.name).sort()).toEqual(['Ada Lovelace', 'Alice', 'Bob']);
        expect(room.memberCount).toBe(3);
        // The joiner is not the host — a name must not silently promote anyone.
        expect(session.activeUsers.find((m) => m.name === 'Ada Lovelace')!.role).toBe('contributor');
    });

    it('CONTROL — omitting the name lands the member under the server default', async () => {
        const api = new SyncPlayApi(BASE);
        const { session } = await api.joinRoom(GROUP_ID);

        // No body at all: `ApiClient.post` sends `null` when nothing is passed.
        expect(server.requests[0]!.body).toBeNull();
        // `SyncPlayController::joinGroup()`'s literal fallback. This is what every
        // member in every room got before S285.
        expect(session.activeUsers.map((m) => m.name).sort()).toEqual(['Alice', 'Bob', 'Guest']);
    });

    it('an empty name is treated as absent rather than sent as an empty string', async () => {
        const api = new SyncPlayApi(BASE);
        await api.joinRoom(GROUP_ID, '');
        // The server's own guard is `is_string(...) && !== ''`, so an empty
        // string would fall back anyway — but sending one advertises a name we
        // do not have. Assert the body, not just the outcome.
        expect(server.requests[0]!.body).toBeNull();
    });

    it('createRoom carries the creator name — the group is created WITH its host', async () => {
        const api = new SyncPlayApi(BASE);
        const room = await api.createRoom({ name: 'Movie Night', isPublic: true, memberName: 'Ada Lovelace' });

        expect(server.requests[0]!.body).toMatchObject({ name: 'Movie Night', memberName: 'Ada Lovelace' });
        // A brand-new group holds exactly its creator, who is the host.
        expect(room.memberCount).toBe(1);
        expect(room.hostUserId).toBe('me');

        // And the creator really is named — read back through getState, which
        // maps the same `members` dictionary.
        const { session } = await api.joinRoom(GROUP_ID, 'Ada Lovelace');
        expect(session.activeUsers.some((m) => m.name === 'Ada Lovelace')).toBe(true);
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
        // The name is the one the request asked for, not a fixture constant — the
        // fake echoes `name` back as `group_name` the way `createGroup()` does.
        expect(room.name).toBe('Movie Night');
        // One member: the creator. S285 — a created group is not a populated one.
        expect(room.memberCount).toBe(1);
    });
});
