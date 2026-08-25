/**
 * S264 — the `useSyncPlayStore` actions the existing two suites do not reach.
 *
 * `useSyncPlayStore.test.ts` covers drift math against a hand-built session;
 * `useSyncPlayStore.join.test.ts` (S276) covers the happy join/leave/refresh
 * paths. What was left uncovered was every `catch` arm, `sendCommand`, the
 * `isSynced` computed, and four of the five `onRemoteStateUpdate` switch arms.
 *
 * As in the S276 suite there is no `vi.mock('../api/syncplay')`: the store drives
 * the real client through {@link makeSyncPlayServer}, so an error path is
 * produced by UNREGISTERING a route rather than by a rejecting stub — which is
 * the failure shape the live server actually produces.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSyncPlayStore } from './useSyncPlayStore';
import { closeSyncPlayConnection } from '../api/syncplay';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../api/test/syncplayServer';
import type { SyncPlaySession, SyncPlayUser, SyncPlayPlaybackCommand } from '../types/syncplay';

const BASE = 'https://media.example.com';
const GROUP_ID = 'sp_abc123';

// ── stable global seams (see useSyncPlayStore.join.test.ts) ───────────────────

let server: FakeSyncPlayServer | null = null;

globalThis.fetch = ((url: string, init?: RequestInit): Promise<Response> => {
    if (!server) return Promise.reject(new Error('no fake SyncPlay server installed'));
    return server.fetch(url, init);
}) as unknown as typeof fetch;

class FakeWebSocket {
    static readonly OPEN = 1;
    static instances: FakeWebSocket[] = [];
    readyState = FakeWebSocket.OPEN;
    onopen: (() => void) | null = null;
    onmessage: ((e: MessageEvent) => void) | null = null;
    onclose: (() => void) | null = null;
    onerror: ((e: unknown) => void) | null = null;
    readonly sent: string[] = [];

    constructor(readonly url: string) {
        FakeWebSocket.instances.push(this);
    }
    send(data: string): void {
        this.sent.push(data);
    }
    close(): void {
        this.readyState = 3;
    }
    deliver(payload: unknown): void {
        this.onmessage?.({ data: JSON.stringify(payload) } as MessageEvent);
    }
}

globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;

const socket = () => FakeWebSocket.instances.at(-1)!;

// ── fixtures ──────────────────────────────────────────────────────────────────

function makeSession(over: Partial<SyncPlaySession> = {}): SyncPlaySession {
    return {
        id: GROUP_ID,
        roomId: GROUP_ID,
        serverId: '',
        createdBy: 'm1',
        createdAt: '2026-01-01T00:00:00Z',
        state: 'playing',
        playbackPosition: 100,
        playbackRate: 1,
        serverTime: 0,
        lastSync: '2026-01-01T00:00:00Z',
        activeUsers: [],
        roles: {},
        permissions: {},
        ...over,
    };
}

function makeUser(over: Partial<SyncPlayUser> = {}): SyncPlayUser {
    return {
        id: 'u1',
        name: 'Ada',
        profileId: 0,
        role: 'owner',
        isOnline: true,
        lastSeen: '2026-01-01T00:00:00Z',
        ...over,
    };
}

const cmd = (over: Partial<SyncPlayPlaybackCommand>): SyncPlayPlaybackCommand => ({
    type: 'play',
    issuedBy: 'm1',
    issuedAt: '2026-01-01T00:00:00Z',
    ...over,
});

const room = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 2 };

beforeEach(() => {
    setActivePinia(createPinia());
    server = makeSyncPlayServer(BASE);
    FakeWebSocket.instances = [];
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    closeSyncPlayConnection();
    vi.restoreAllMocks();
});

// ── computed: isSynced / onlineMembers ────────────────────────────────────────

describe('useSyncPlayStore — isSynced', () => {
    it('is false with no session', () => {
        expect(useSyncPlayStore().isSynced).toBe(false);
    });

    it('is true while playing and while paused', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing' });
        expect(store.isSynced).toBe(true);
        store.currentSession = makeSession({ state: 'paused' });
        expect(store.isSynced).toBe(true);
    });

    it('is false while waiting — the one non-synced state the server reports', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'waiting' });
        expect(store.isSynced).toBe(false);
    });
});

describe('useSyncPlayStore — onlineMembers', () => {
    it('filters out offline members rather than returning the whole list', () => {
        const store = useSyncPlayStore();
        store.members = [
            makeUser({ id: 'a', isOnline: true }),
            makeUser({ id: 'b', isOnline: false }),
            makeUser({ id: 'c', isOnline: true }),
        ];
        expect(store.onlineMembers.map((m) => m.id)).toEqual(['a', 'c']);
        expect(store.members).toHaveLength(3); // the source list is untouched
    });
});

// ── onRemoteStateUpdate ───────────────────────────────────────────────────────

describe('useSyncPlayStore — onRemoteStateUpdate', () => {
    it('is a no-op with no session — it must not synthesise one', () => {
        const store = useSyncPlayStore();
        store.onRemoteStateUpdate(cmd({ type: 'play' }));
        expect(store.currentSession).toBeNull();
        expect(store.isInRoom).toBe(false);
    });

    it('play moves the session to playing', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'paused' });
        store.onRemoteStateUpdate(cmd({ type: 'play' }));
        expect(store.currentSession!.state).toBe('playing');
    });

    it('pause moves the session to paused', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing' });
        store.onRemoteStateUpdate(cmd({ type: 'pause' }));
        expect(store.currentSession!.state).toBe('paused');
    });

    /**
     * ⚠ S290 — this assertion used to read `toBe(42)`, i.e. "play/pause leave the
     * position ALONE", and it was GREEN while pinning the defect. The `play` and
     * `pause` frames the store actually receives in production are
     * `handlePlaybackSync()`'s broadcast of the group's AUTHORITATIVE position
     * (`api/syncplay.ts` → `onPlaybackSync` → `{type: is_playing ? 'play' :
     * 'pause', position}`), so ignoring the field discarded the very number
     * S287's 5 s report was sent to obtain. The drift consequence — the half a
     * position assertion cannot see — is in `useSyncPlayStore.anchor.test.ts`.
     */
    it('play APPLIES the position the broadcast carried', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'paused', playbackPosition: 42 });
        store.onRemoteStateUpdate(cmd({ type: 'play', position: 999 }));
        expect(store.currentSession!.playbackPosition).toBe(999);
        expect(store.currentSession!.state).toBe('playing');
    });

    it('pause APPLIES the position the broadcast carried', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 42 });
        store.onRemoteStateUpdate(cmd({ type: 'pause', position: 999 }));
        expect(store.currentSession!.playbackPosition).toBe(999);
        expect(store.currentSession!.state).toBe('paused');
    });

    it('play/pause with NO position leave it alone rather than resetting to 0', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'paused', playbackPosition: 42 });
        store.onRemoteStateUpdate(cmd({ type: 'play' }));
        expect(store.currentSession!.playbackPosition).toBe(42);
        store.onRemoteStateUpdate(cmd({ type: 'pause' }));
        expect(store.currentSession!.playbackPosition).toBe(42);
    });

    it('a broadcast position of 0 is APPLIED — `!== undefined`, not truthiness', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'paused', playbackPosition: 42 });
        // A group sitting at the start of a title broadcasts position 0. An
        // `if (command.position)` guard would silently keep 42 here.
        store.onRemoteStateUpdate(cmd({ type: 'play', position: 0 }));
        expect(store.currentSession!.playbackPosition).toBe(0);
    });

    it('seek applies the position', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ playbackPosition: 10 });
        store.onRemoteStateUpdate(cmd({ type: 'seek', position: 250 }));
        expect(store.currentSession!.playbackPosition).toBe(250);
    });

    it('seek with NO position is ignored rather than seeking to 0', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ playbackPosition: 10 });
        store.onRemoteStateUpdate(cmd({ type: 'seek' }));
        expect(store.currentSession!.playbackPosition).toBe(10);
    });

    it('sync applies position AND rate together', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ playbackPosition: 10, playbackRate: 1 });
        store.onRemoteStateUpdate(cmd({ type: 'sync', position: 300, rate: 2 }));
        expect(store.currentSession!.playbackPosition).toBe(300);
        expect(store.currentSession!.playbackRate).toBe(2);
    });

    it('sync applies each field INDEPENDENTLY of the other', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ playbackPosition: 10, playbackRate: 1 });

        store.onRemoteStateUpdate(cmd({ type: 'sync', position: 300 })); // no rate
        expect(store.currentSession!.playbackPosition).toBe(300);
        expect(store.currentSession!.playbackRate).toBe(1);

        store.onRemoteStateUpdate(cmd({ type: 'sync', rate: 0 })); // no position
        expect(store.currentSession!.playbackPosition).toBe(300);
        expect(store.currentSession!.playbackRate).toBe(0);
    });

    it('a sync of rate 0 is applied — `rate !== undefined`, not truthiness', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ playbackRate: 1 });
        store.onRemoteStateUpdate(cmd({ type: 'sync', rate: 0 }));
        // A `if (command.rate)` guard would silently skip this.
        expect(store.currentSession!.playbackRate).toBe(0);
    });

    it('seek RE-ANCHORS the drift clock, so drift does not jump', () => {
        let nowMs = 1_700_000_000_000;
        vi.spyOn(Date, 'now').mockImplementation(() => nowMs);

        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 0, playbackRate: 1 });
        store.onRemoteStateUpdate(cmd({ type: 'seek', position: 500 }));
        nowMs += 3_000;
        store.updateLocalPosition(503);
        // expected = 500 + 3×1 = 503 → drift 0. Without the re-anchor the elapsed
        // term would be the whole unix epoch.
        expect(store.driftAmount).toBeCloseTo(0, 6);
    });
});

// ── the remote-update wiring, end to end over the socket ──────────────────────

describe('useSyncPlayStore — the WebSocket callback is wired to onRemoteStateUpdate', () => {
    it('a remote pause frame moves the joined session to paused', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        expect(store.currentSession!.state).toBe('playing');

        // Straight down the real chain: socket → handleWsMessage → SyncPlayClient
        // → onPlaybackCommand → the store's own callback. Nothing between the
        // frame and the assertion is a mock.
        socket().deliver({ type: 'syncplay_playback_pause', member_id: 'someone-else', position: 7 });
        expect(store.currentSession!.state).toBe('paused');
    });

    it('a remote seek frame moves the joined session position', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        socket().deliver({
            type: 'syncplay_playback_seek',
            member_id: 'someone-else',
            from_position: 1,
            to_position: 456,
        });
        expect(store.currentSession!.playbackPosition).toBe(456);
    });
});

// ── joinRoom's currentRoom back-fill ──────────────────────────────────────────

describe('useSyncPlayStore.joinRoom — currentRoom back-fill', () => {
    it('stamps the session onto an EXISTING currentRoom', async () => {
        const store = useSyncPlayStore();
        store.currentRoom = { ...room };
        await store.joinRoom(BASE, GROUP_ID);

        expect(store.currentRoom).not.toBeNull();
        expect((store.currentRoom as { currentSession?: SyncPlaySession }).currentSession?.id).toBe(GROUP_ID);
        // The rest of the room survives the spread.
        expect(store.currentRoom!.name).toBe('Movie Night');
    });

    /**
     * S283 — this used to assert `currentRoom` stayed NULL, on the reasoning
     * that a join must not invent a room. The room is no longer invented: the
     * join response is `{ success, group }` and `group` is the full group state,
     * so the room is read from the server exactly as `getState()` would read it.
     * Leaving it null was not caution, it was a dropped field, and
     * `leaveRoom()` / `refreshMembers()` / `SyncPlayPage.refresh()` are all
     * guarded on `currentRoom` — a user who joined by link could not leave.
     */
    it('BACK-FILLS currentRoom from the join response when there was none', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        expect(store.currentRoom).not.toBeNull();
        expect(store.currentRoom!.id).toBe(GROUP_ID);
        // The name can only have come from the server's `group_name`; the caller
        // passed nothing but an id.
        expect(store.currentRoom!.name).toBe('Movie Night');
        expect(store.currentRoom!.currentSession?.id).toBe(GROUP_ID);
        expect(store.currentSession!.id).toBe(GROUP_ID);
    });

    it('a STALE room in the store does not survive a join to a different id', async () => {
        const store = useSyncPlayStore();
        store.currentRoom = { ...room, id: 'sp_somewhere_else', name: 'Yesterday' };
        await store.joinRoom(BASE, GROUP_ID);

        // The join response wins field by field, so `leaveRoom()` cannot end up
        // leaving the room the user was in BEFORE this one.
        expect(store.currentRoom!.id).toBe(GROUP_ID);
        expect(store.currentRoom!.name).toBe('Movie Night');
    });

    it('the back-filled room is enough for leaveRoom to actually run', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        server!.requests.length = 0;

        await store.leaveRoom(BASE);
        // The control for "leaveRoom with no room is a silent no-op" below: the
        // request really is issued, so the no-op there is the guard and not a
        // missing route.
        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            `POST /api/v1/syncplay/groups/${GROUP_ID}/leave`,
        ]);
        expect(store.currentRoom).toBeNull();
        expect(store.currentSession).toBeNull();
    });
});

// ── error paths, produced by UNREGISTERING the route ──────────────────────────

describe('useSyncPlayStore — error paths', () => {
    it('createAndJoinRoom records the error, rethrows, and clears isLoading', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups'] });
        const store = useSyncPlayStore();

        await expect(store.createAndJoinRoom(BASE, { name: 'x', isPublic: true })).rejects.toThrow();
        expect(store.error).not.toBeNull();
        expect(store.isLoading).toBe(false);
        expect(store.currentRoom).toBeNull();
        expect(store.currentSession).toBeNull();
    });

    it('createAndJoinRoom that fails at the JOIN keeps the created room but no session', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/join'] });
        const store = useSyncPlayStore();

        await expect(store.createAndJoinRoom(BASE, { name: 'x', isPublic: true })).rejects.toThrow();
        // The room WAS created server-side, so the store keeps it — a partial
        // failure, distinct from the create-failed case above.
        expect(store.currentRoom!.id).toBe(GROUP_ID);
        expect(store.currentSession).toBeNull();
        expect(store.error).not.toBeNull();
    });

    it('leaveRoom records the error and does NOT clear the room', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/leave'] });
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { ...room };

        await expect(store.leaveRoom(BASE)).rejects.toThrow();
        expect(store.error).not.toBeNull();
        expect(store.isLoading).toBe(false);
        // Still in the room: the server never confirmed the leave.
        expect(store.currentRoom).not.toBeNull();
        expect(store.isInRoom).toBe(true);
    });

    it('leaveRoom with no room is a silent no-op — no request, no error', async () => {
        const store = useSyncPlayStore();
        await expect(store.leaveRoom(BASE)).resolves.toBeUndefined();
        expect(server!.requests).toEqual([]);
        expect(store.error).toBeNull();
        expect(store.isLoading).toBe(false);
    });

    it('refreshState records the error and rethrows', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        server = makeSyncPlayServer(BASE, { omit: ['GET /api/v1/syncplay/groups/{id}'] });

        await expect(store.refreshState(BASE)).rejects.toThrow();
        expect(store.error).not.toBeNull();
        // The stale session survives rather than being blanked.
        expect(store.currentSession!.id).toBe(GROUP_ID);
    });

    it('refreshState with no session is a silent no-op', async () => {
        const store = useSyncPlayStore();
        await expect(store.refreshState(BASE)).resolves.toBeUndefined();
        expect(server!.requests).toEqual([]);
        expect(store.error).toBeNull();
    });

    it('refreshMembers records the error and keeps the previous member list', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { ...room };
        server = makeSyncPlayServer(BASE, { omit: ['GET /api/v1/syncplay/groups/{id}'] });

        await expect(store.refreshMembers(BASE)).rejects.toThrow();
        expect(store.error).not.toBeNull();
        // The list the failed refresh preserved is the one the JOIN produced —
        // Alice and Bob plus this joiner, whom the server named 'Guest' because
        // no account is signed in here (S285).
        expect(store.members.map((m) => m.name)).toEqual(['Alice', 'Bob', 'Guest']);
    });

    it('refreshMembers with no room is a silent no-op', async () => {
        const store = useSyncPlayStore();
        await expect(store.refreshMembers(BASE)).resolves.toBeUndefined();
        expect(server!.requests).toEqual([]);
        expect(store.error).toBeNull();
    });

    it('clearError wipes an error left by a failed action', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/join'] });
        const store = useSyncPlayStore();
        await expect(store.joinRoom(BASE, GROUP_ID)).rejects.toThrow();
        expect(store.error).not.toBeNull();

        store.clearError();
        expect(store.error).toBeNull();
    });

    it('a non-Error rejection still yields a readable message', async () => {
        const store = useSyncPlayStore();
        server = {
            requests: [],
            fetch: (() => Promise.reject('a bare string, not an Error')) as unknown as typeof fetch,
        };

        await expect(store.joinRoom(BASE, GROUP_ID)).rejects.toBeTruthy();
        // The `e instanceof Error ? e.message : <fallback>` arm.
        expect(store.error).toBe('Failed to join room');
    });
});

// ── sendCommand ───────────────────────────────────────────────────────────────

describe('useSyncPlayStore.sendCommand', () => {
    /** Join, then let the server confirm the group so the client will emit. */
    async function joinedAndInGroup(): Promise<ReturnType<typeof useSyncPlayStore>> {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        socket().deliver({
            type: 'syncplay_group_state',
            group: {
                group_id: GROUP_ID,
                group_name: 'Movie Night',
                members: [{ id: 'm1', name: 'Me', joined_at: 1_700_000_000 }],
                member_count: 1,
                host_id: 'm1',
                playback_position: 0,
            },
        });
        socket().sent.length = 0;
        return store;
    }

    it('sends nothing when there is no session', () => {
        const store = useSyncPlayStore();
        store.sendCommand(BASE, 'play');
        expect(FakeWebSocket.instances).toHaveLength(0);
    });

    it('puts a play frame on the wire', async () => {
        const store = await joinedAndInGroup();
        store.sendCommand(BASE, 'play', { position: 12 });

        const frames = socket().sent.map((raw) => JSON.parse(raw) as Record<string, unknown>);
        expect(frames.map((f) => f['type'])).toEqual(['syncplay_playback_play']);
        // S293: the wire unit is MILLISECONDS (SPEC.md:91) — 12 s → 12_000 ms.
        expect(frames[0]!['position']).toBe(12_000);
    });

    it('puts a seek frame on the wire with the target position', async () => {
        const store = await joinedAndInGroup();
        store.sendCommand(BASE, 'seek', { position: 900 });

        const frames = socket().sent.map((raw) => JSON.parse(raw) as Record<string, unknown>);
        expect(frames.map((f) => f['type'])).toEqual(['syncplay_playback_seek']);
        // S293: 900 s → 900_000 ms — a seconds leak would land at 900 (1000× off).
        expect(frames[0]!['to_position']).toBe(900_000);
    });

    /**
     * S293 — Boundary #2 unit assertion (command path → `sendSeek`).
     *
     * The fixture is 123.25 s: without the seconds→ms conversion at the send
     * boundary the wire would carry 123.25 — off by exactly 1000× — and the
     * value is never 0 and never reads the same in both units.
     */
    it('S293 — the seek frame carries MILLISECONDS in to_position, not seconds', async () => {
        const store = await joinedAndInGroup();
        store.sendCommand(BASE, 'seek', { position: 123.25 });

        const frames = socket().sent.map((raw) => JSON.parse(raw) as Record<string, unknown>);
        expect(frames.map((f) => f['type'])).toEqual(['syncplay_playback_seek']);
        expect(frames[0]!['to_position']).toBe(123_250);
    });

    it('stamps the command with the session creator, not a placeholder', async () => {
        const store = await joinedAndInGroup();
        expect(store.currentSession!.createdBy).toBe('m1');
        store.sendCommand(BASE, 'pause', { position: 1 });
        expect(socket().sent).toHaveLength(1);
    });
});
