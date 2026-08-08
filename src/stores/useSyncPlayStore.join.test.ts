/**
 * S276 — `useSyncPlayStore.joinRoom()` end-to-end against the REAL route set.
 *
 * There is no `vi.mock('../api/syncplay')` here on purpose. The store drives the
 * real `SyncPlayApi`, which drives the real `ApiClient`, which fetches through
 * {@link makeSyncPlayServer} — a fake that serves ONLY the five routes
 * phlix-server registers and 404s everything else. `ApiClient` throws on any
 * non-ok response, so if any awaited call in the join path names an unserved url
 * the join rejects and these tests red.
 *
 * That is the whole point: the pre-existing SyncPlay tests stubbed
 * `getMembers()` into success, which is exactly how a join path that could never
 * complete against a live server stayed green.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSyncPlayStore, resolveMemberName } from './useSyncPlayStore';
import { useAuthStore } from './useAuthStore';
import { closeSyncPlayConnection } from '../api/syncplay';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../api/test/syncplayServer';
import type { AuthUser } from '../api/client';

const BASE = 'https://media.example.com';
const GROUP_ID = 'sp_abc123';

// ── stable global seams ───────────────────────────────────────────────────────
//
// `getSyncPlayApi()` memoises ONE `SyncPlayApi` per module instance, and
// `ApiClient` binds `globalThis.fetch` at CONSTRUCTION. So the global must be a
// stable function installed before the first `joinRoom()` — it delegates to a
// per-test server rather than being swapped, or the memoised client would keep
// whichever fetch the first test happened to install.

let server: FakeSyncPlayServer | null = null;

globalThis.fetch = ((url: string, init?: RequestInit): Promise<Response> => {
    if (!server) return Promise.reject(new Error('no fake SyncPlay server installed'));
    return server.fetch(url, init);
}) as unknown as typeof fetch;

/** A WebSocket that connects to nothing — jsdom would otherwise dial :8097 for real. */
const sockets: FakeWebSocket[] = [];

class FakeWebSocket {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;

    readyState = FakeWebSocket.OPEN;
    onopen: (() => void) | null = null;
    onmessage: ((e: MessageEvent) => void) | null = null;
    onclose: (() => void) | null = null;
    onerror: ((e: unknown) => void) | null = null;
    readonly sent: string[] = [];

    constructor(readonly url: string) {
        sockets.push(this);
    }

    send(data: string): void {
        this.sent.push(data);
    }

    close(): void {
        this.readyState = FakeWebSocket.CLOSED;
    }
}

globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;

beforeEach(() => {
    setActivePinia(createPinia());
    server = makeSyncPlayServer(BASE);
    sockets.length = 0;
    vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
    closeSyncPlayConnection();
    vi.restoreAllMocks();
});

describe('useSyncPlayStore.joinRoom — against the registered routes only', () => {
    it('completes the join with no stubbed /members response', async () => {
        const store = useSyncPlayStore();

        // Must not reject. Before S276 this threw `ApiError: Not found` from the
        // pre-join `getMembers()`, and the assertions below were unreachable.
        await expect(store.joinRoom(BASE, GROUP_ID)).resolves.toBeUndefined();

        expect(store.error).toBeNull();
        expect(store.isLoading).toBe(false);
        expect(store.isInRoom).toBe(true);
        expect(store.currentSession).not.toBeNull();
        expect(store.currentSession!.id).toBe(GROUP_ID);
        expect(store.currentSession!.state).toBe('playing');
        expect(store.currentSession!.playbackPosition).toBe(123);
    });

    it('issues exactly one request — the join — and nothing else', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        // Denominator stated: 1. The vestigial pre-join member fetch is gone, so
        // re-adding it would make this 2 and red the test.
        expect(server!.requests).toHaveLength(1);
        expect(server!.requests[0]).toMatchObject({
            method: 'POST',
            path: `/api/v1/syncplay/groups/${GROUP_ID}/join`,
            status: 200,
        });
        // No request 404'd — a 404 anywhere in the path would have thrown.
        expect(server!.requests.filter((r) => r.status !== 200)).toEqual([]);
    });

    it('populates members from the joined group state', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        // Alice and Bob were already in the room; the third entry is US. Nobody
        // is signed in in this test, so no `memberName` goes on the body and the
        // server's own `'Guest'` fallback names the joiner — which is exactly
        // what every real user saw before S285 (see the signed-in case below).
        expect(store.members.map((m) => m.name)).toEqual(['Alice', 'Bob', 'Guest']);
        expect(store.onlineMembers).toHaveLength(3);
    });

    it('opens the WebSocket — which never happened while the join threw', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        expect(sockets).toHaveLength(1);
        expect(sockets[0]!.url).toContain(`room=${GROUP_ID}`);
        expect(sockets[0]!.url).toContain(':8097');
    });

    /**
     * The non-inertness control. "The join resolved" must be able to FAIL, or
     * every assertion above would pass against a store that swallowed errors and
     * `resolves.toBeUndefined()` would be worthless.
     *
     * Note the id cannot be the seam: `encodeURIComponent` means even `'a/b'`
     * goes out as `a%2Fb`, one legal segment. So the SERVER is the seam — the
     * join route is unregistered, which is exactly the shape of the S276 defect
     * (an awaited call to a route nobody serves).
     */
    it('still rejects when the awaited route is not served', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/join'] });
        const store = useSyncPlayStore();

        await expect(store.joinRoom(BASE, GROUP_ID)).rejects.toThrow();
        expect(store.isInRoom).toBe(false);
        expect(store.error).not.toBeNull();
        expect(store.isLoading).toBe(false);
        expect(server.requests.some((r) => r.status === 404)).toBe(true);
        expect(sockets).toHaveLength(0);
    });
});

describe('useSyncPlayStore.createAndJoinRoom — against the registered routes only', () => {
    it('creates then joins with a real group id', async () => {
        const store = useSyncPlayStore();
        await expect(
            store.createAndJoinRoom(BASE, { name: 'Movie Night', isPublic: true }),
        ).resolves.toBeUndefined();

        expect(store.currentRoom!.id).toBe(GROUP_ID);
        expect(store.currentSession!.id).toBe(GROUP_ID);
        // A group you just CREATED holds only you: `createGroup()` adds the
        // creator and nobody else, and the join that immediately follows is the
        // same member joining their own group. Alice and Bob belong to the
        // pre-existing room the join-by-id tests use, not to this one.
        expect(store.members).toHaveLength(1);
        // Two requests: POST /groups then POST /groups/{id}/join. If `createRoom`
        // returned a room with an undefined id, the join would have gone to
        // `/groups/undefined/join` — which the fake server still MATCHES (it is a
        // legal `{id}`), so the id is asserted directly above rather than inferred
        // from the absence of a 404.
        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            'POST /api/v1/syncplay/groups',
            `POST /api/v1/syncplay/groups/${GROUP_ID}/join`,
        ]);
    });
});

/**
 * S287 — the host of a room got no realtime sync at all.
 *
 * ⚠ Read the assertions, not the titles. `createAndJoinRoom()` **already
 * resolved** before this step: it created the group, joined it, and populated
 * `members` — every REST-level assertion in the describe above passed against
 * the broken code. What it never did was call `openSyncPlayConnection()`, so the
 * one member guaranteed to be in the room received no remote play/pause, no
 * `playback_sync` broadcasts and no reconnect ladder until they left and
 * re-joined by bare id. "It resolved" is therefore worthless here; the only
 * statement worth making is about the SOCKET.
 *
 * The two paths are asserted SIDE BY SIDE and both must be 1. `sockets` is
 * populated by a `FakeWebSocket` constructor; a harness where that seam has come
 * loose records nothing, and a create-only `toHaveLength(1)` would then read as a
 * failure of the fix rather than of the harness — while a create-only
 * `not.toHaveLength(0)` would read as a PASS for both. The rejecting cases below
 * are the other half: they prove `sockets` can hold 0 on this same harness, so
 * `toHaveLength(1)` is not something every run produces regardless.
 */
describe('S287 — BOTH join-performing paths open the realtime WebSocket', () => {
    it('CONTROL — joinRoom (the path that always worked) opens it', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        expect(sockets).toHaveLength(1);
        expect(sockets[0]!.url).toContain(`room=${GROUP_ID}`);
        expect(sockets[0]!.url).toContain(':8097');
    });

    it('createAndJoinRoom opens it too — for the room it just created', async () => {
        const store = useSyncPlayStore();
        await store.createAndJoinRoom(BASE, { name: 'Movie Night', isPublic: true });

        expect(sockets).toHaveLength(1);
        // Not merely "a socket": the socket for the CREATED group. A connection
        // dialled with an empty or `undefined` room id would satisfy a bare
        // length check and sync the host to nothing.
        expect(sockets[0]!.url).toContain(`room=${GROUP_ID}`);
        expect(sockets[0]!.url).toContain(':8097');
    });

    it('…and the creator gets the drift anchor a joiner gets', async () => {
        const store = useSyncPlayStore();
        await store.createAndJoinRoom(BASE, { name: 'Movie Night', isPublic: true });

        // `driftAmount` extrapolates from the moment of the last server anchor.
        // The create path never set one, so it extrapolated from epoch 0 — over
        // fifty years of "elapsed" playback, putting `syncStatus` permanently at
        // `outOfSync` and making Player.vue seek on the first session change.
        expect(store.currentSession!.state).toBe('playing');
        // Sit exactly where the group says it is; with the anchor set, drift is
        // then the elapsed test time (~0 s). Without it, `Date.now() - 0` makes
        // the extrapolated "expected position" ~1.7e9 seconds and drift is 1.7e9.
        store.updateLocalPosition(store.currentSession!.playbackPosition);
        expect(Math.abs(store.driftAmount)).toBeLessThan(1);
        expect(store.syncStatus).toBe('synced');
    });

    it('NEGATIVE CONTROL — a failed create opens no socket', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups'] });
        const store = useSyncPlayStore();

        await expect(
            store.createAndJoinRoom(BASE, { name: 'Movie Night', isPublic: true }),
        ).rejects.toThrow();
        expect(sockets).toHaveLength(0);
    });

    it('NEGATIVE CONTROL — a create whose JOIN is unserved opens no socket', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/join'] });
        const store = useSyncPlayStore();

        await expect(
            store.createAndJoinRoom(BASE, { name: 'Movie Night', isPublic: true }),
        ).rejects.toThrow();
        // The create succeeded, so this is not "nothing happened" — the room is
        // in the store and the socket still must not be open.
        expect(server.requests.map((r) => r.status)).toEqual([200, 404]);
        expect(store.currentRoom!.id).toBe(GROUP_ID);
        expect(sockets).toHaveLength(0);
    });
});

describe('useSyncPlayStore.refreshMembers / refreshState — against the registered routes only', () => {
    it('refreshMembers reads the group-state route and yields members', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 2 };
        store.members = [];

        await expect(store.refreshMembers(BASE)).resolves.toBeUndefined();
        // The join above put us in the group, so a later refresh reads us back
        // out of it — a member who disappeared on the next refresh would be a
        // fake nobody has to write.
        expect(store.members.map((m) => m.name)).toEqual(['Alice', 'Bob', 'Guest']);
        expect(server!.requests.at(-1)).toMatchObject({
            method: 'GET',
            path: `/api/v1/syncplay/groups/${GROUP_ID}`,
            status: 200,
        });
    });

    it('refreshState reads the group-state route', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        await expect(store.refreshState(BASE)).resolves.toBeUndefined();
        expect(server!.requests.at(-1)).toMatchObject({
            method: 'GET',
            path: `/api/v1/syncplay/groups/${GROUP_ID}`,
            status: 200,
        });
        expect(store.currentSession!.playbackPosition).toBe(123);
    });

    it('leaveRoom posts the leave route and clears the session', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 2 };

        await expect(store.leaveRoom(BASE)).resolves.toBeUndefined();
        expect(server!.requests.at(-1)).toMatchObject({
            method: 'POST',
            path: `/api/v1/syncplay/groups/${GROUP_ID}/leave`,
            status: 200,
        });
        expect(store.isInRoom).toBe(false);
        expect(store.members).toEqual([]);
    });
});

// ── S285: the signed-in account's name reaches the room ───────────────────────

/** Put a user in the auth store without going near `/auth/me`. */
function signIn(user: Partial<AuthUser>): void {
    useAuthStore().user = { id: 'u-1', ...user } as AuthUser;
}

/**
 * The `member_name` field of the `GROUP_JOIN` frame the socket actually sent.
 *
 * @phlix/syncplay serializes flat — `{ type, group_id, member_id, member_name }` —
 * so this reads the shipped wire shape, not a re-derivation of it.
 */
function joinFrameMemberName(): unknown {
    const frames = sockets.flatMap((s) => s.sent.map((raw) => JSON.parse(raw) as Record<string, unknown>));
    const join = frames.find((f) => f['type'] === 'syncplay_group_join');
    expect(join, 'no GROUP_JOIN frame was sent').toBeDefined();
    return join!['member_name'];
}

describe('useSyncPlayStore — the joining member carries the account name', () => {
    it('sends the account name on the REST body AND gets it back as a member', async () => {
        signIn({ name: 'Ada Lovelace', username: 'ada', email: 'ada@example.com' });
        const store = useSyncPlayStore();

        await store.joinRoom(BASE, GROUP_ID);

        // 1. On the wire.
        expect(server!.requests[0]!.body).toEqual({ memberName: 'Ada Lovelace' });
        // 2. Back out of the server's response, into the store the UI renders.
        //    'Ada Lovelace' is not in the fixture — it can only have arrived by
        //    the round trip.
        expect(store.members.map((m) => m.name)).toEqual(['Alice', 'Bob', 'Ada Lovelace']);
        expect(store.members.some((m) => m.name === 'Guest')).toBe(false);
    });

    /**
     * ⚠ These two are a PAIR and must stay one. `api/syncplay.ts` remembers the
     * member name in a module-level singleton that `closeSyncPlayConnection()`
     * deliberately does not clear (it is a tab identity), so a single test that
     * asserts one name cannot tell "the account name was passed" from "some name
     * was left over". Two different accounts, two different frames, same module.
     */
    it('sends the same name on the WebSocket GROUP_JOIN frame', async () => {
        signIn({ name: 'Ada Lovelace' });
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        // The socket only joins once `onopen` fires.
        sockets[0]!.onopen?.();

        // The WS worker keeps its OWN member table, so a name that travelled only
        // on the REST body would still leave the realtime side calling this member
        // 'Anonymous'.
        expect(joinFrameMemberName()).toBe('Ada Lovelace');
    });

    it('…and it TRACKS the account rather than being a constant', async () => {
        signIn({ name: 'Grace Hopper' });
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        sockets[0]!.onopen?.();

        expect(joinFrameMemberName()).toBe('Grace Hopper');
    });

    it('CONTROL — signed out, nothing is sent and the SERVER names the member', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        expect(server!.requests[0]!.body).toBeNull();
        expect(store.members.map((m) => m.name)).toEqual(['Alice', 'Bob', 'Guest']);
        // The WS frame is NOT asserted here: `syncPlayMemberName` survives across
        // tests in this file, so a signed-out join can legitimately still carry
        // the previous tab identity. The `'Anonymous'` fallback is proved against
        // a freshly imported module in `api/syncplay.ws.test.ts`.
    });

    it('createAndJoinRoom names the creator on the create body too', async () => {
        signIn({ name: 'Ada Lovelace' });
        const store = useSyncPlayStore();

        await store.createAndJoinRoom(BASE, { name: 'Movie Night', isPublic: true });

        expect(server!.requests.map((r) => r.body)).toEqual([
            { name: 'Movie Night', isPublic: true, memberName: 'Ada Lovelace' },
            { memberName: 'Ada Lovelace' },
        ]);
        // The creator is the host of the group `createRoom` returned — proving the
        // name reached the CREATE call, not only the join that followed it.
        expect(store.members.some((m) => m.name === 'Ada Lovelace')).toBe(true);
    });

    describe('resolveMemberName — which field of the account is used', () => {
        it('prefers name, then username, then email', () => {
            signIn({ name: 'Ada Lovelace', username: 'ada', email: 'ada@example.com' });
            expect(resolveMemberName()).toBe('Ada Lovelace');

            useAuthStore().user = { id: 'u-1', username: 'ada', email: 'ada@example.com' } as AuthUser;
            expect(resolveMemberName()).toBe('ada');

            useAuthStore().user = { id: 'u-1', email: 'ada@example.com' } as AuthUser;
            expect(resolveMemberName()).toBe('ada@example.com');
        });

        it('skips blank fields rather than sending whitespace as a display name', () => {
            signIn({ name: '   ', username: '', email: 'ada@example.com' });
            expect(resolveMemberName()).toBe('ada@example.com');
        });

        it('trims, so a padded name does not render padded', () => {
            signIn({ name: '  Ada Lovelace  ' });
            expect(resolveMemberName()).toBe('Ada Lovelace');
        });

        it('is undefined with no user, and with a user carrying nothing usable', () => {
            expect(resolveMemberName()).toBeUndefined();
            signIn({});
            expect(resolveMemberName()).toBeUndefined();
        });
    });
});
