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
import { useSyncPlayStore } from './useSyncPlayStore';
import { closeSyncPlayConnection } from '../api/syncplay';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../api/test/syncplayServer';

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

        expect(store.members.map((m) => m.name)).toEqual(['Alice', 'Bob']);
        expect(store.onlineMembers).toHaveLength(2);
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
        expect(store.members).toHaveLength(2);
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

describe('useSyncPlayStore.refreshMembers / refreshState — against the registered routes only', () => {
    it('refreshMembers reads the group-state route and yields members', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 2 };
        store.members = [];

        await expect(store.refreshMembers(BASE)).resolves.toBeUndefined();
        expect(store.members.map((m) => m.name)).toEqual(['Alice', 'Bob']);
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
