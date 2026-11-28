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
import { useSyncPlayStore, SyncPlayCommandNotDeliveredError, shouldBroadcastSyncPlayCommand, SYNC_ECHO_TOLERANCE_SECONDS } from './useSyncPlayStore';
import { closeSyncPlayConnection, sendSyncPlayCommand, setSyncPlayLogger } from '../api/syncplay';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../api/test/syncplayServer';
import type { SyncPlaySession, SyncPlayUser, SyncPlayPlaybackCommand } from '../types/syncplay';
import type { PendingPlayMediaCommand } from '../api/hubRelay';

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
        createdBy: 'm1',
        createdAt: '2026-01-01T00:00:00Z',
        state: 'playing',
        currentMediaId: null,
        playbackPosition: 100,
        playbackRate: 1,
        serverTime: 0,
        lastSync: '2026-01-01T00:00:00Z',
        activeUsers: [],
        roles: {},
        ...over,
    };
}

function makeUser(over: Partial<SyncPlayUser> = {}): SyncPlayUser {
    return {
        id: 'u1',
        name: 'Ada',
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
        //
        // S-contracts-21 — v0.1.8 grouped-delivery law (LW-044): playback fan-out
        // is refused while the client holds no group. The real server answers the
        // join with a GROUP_STATE ack; the fake HTTP server does not push it, so
        // the fixture must deliver the ack before the command, exactly as a live
        // session receives it.
        socket().deliver({
            type: 'syncplay_group_state',
            group: {
                group_id: GROUP_ID,
                group_name: 'Movie Night',
                members: [{ id: 'someone-else', name: 'Other', joined_at: 1_700_000_000 }],
                member_count: 1,
                host_id: 'someone-else',
                playback_position: 0,
            },
        });
        socket().deliver({ type: 'syncplay_playback_pause', member_id: 'someone-else', position: 7_000 });
        expect(store.currentSession!.state).toBe('paused');
    });

    it('a remote seek frame moves the joined session position', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);

        // S-contracts-21 — v0.1.8 LW-044: seed the join-ack first (see pause test).
        socket().deliver({
            type: 'syncplay_group_state',
            group: {
                group_id: GROUP_ID,
                group_name: 'Movie Night',
                members: [{ id: 'someone-else', name: 'Other', joined_at: 1_700_000_000 }],
                member_count: 1,
                host_id: 'someone-else',
                playback_position: 0,
            },
        });

        // S441 — the frame speaks the wire unit (MILLISECONDS); the session
        // position speaks seconds. The decode happens once, in `api/syncplay.ts`.
        socket().deliver({
            type: 'syncplay_playback_seek',
            member_id: 'someone-else',
            from_position: 1,
            to_position: 456_000,
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

        await expect(store.createAndJoinRoom(BASE, { name: 'x' })).rejects.toThrow();
        expect(store.error).not.toBeNull();
        expect(store.isLoading).toBe(false);
        expect(store.currentRoom).toBeNull();
        expect(store.currentSession).toBeNull();
    });

    it('createAndJoinRoom that fails at the JOIN keeps the created room but no session', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/join'] });
        const store = useSyncPlayStore();

        await expect(store.createAndJoinRoom(BASE, { name: 'x' })).rejects.toThrow();
        // The room WAS created server-side, so the store keeps it — a partial
        // failure, distinct from the create-failed case above.
        expect(store.currentRoom!.id).toBe(GROUP_ID);
        expect(store.currentSession).toBeNull();
        expect(store.error).not.toBeNull();
    });

    /**
     * M6 (fedev review) — this used to pin the trap: a failed REST leave
     * rethrew and left `currentRoom` populated, so the UI stayed "in group"
     * with a live socket and position-reporting interval and the user could
     * not leave without a reload. New law: the REST call is BEST-EFFORT (the
     * server reaps membership on socket close); local teardown runs in a
     * `finally` regardless, the failure is recorded through `error`, and the
     * call resolves so the two UI callers (which have no catch) stay clean.
     */
    it('leaveRoom records the REST failure but tears down local state anyway', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/leave'] });
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { ...room };

        await expect(store.leaveRoom(BASE)).resolves.toBeUndefined();
        expect(store.error).not.toBeNull();
        expect(store.isLoading).toBe(false);
        // Local group state is gone even though the server never confirmed:
        // the user is free to leave; a stale room was the original bug.
        expect(store.currentRoom).toBeNull();
        expect(store.currentSession).toBeNull();
        expect(store.isInRoom).toBe(false);
        expect(store.members).toEqual([]);
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
        expect(store.error).toBe('Couldn’t join the room.');
    });
});

// ── sendCommand ───────────────────────────────────────────────────────────────

describe('useSyncPlayStore.sendCommand', () => {
    // (joinedRoom05 — module-level below the S-ui-player-05 heading)
    it('sends nothing when there is no session', () => {
        const store = useSyncPlayStore();
        // M-UI-12 law: the no-session arm is the "room vanished" early exit —
        // NOT a failed user command. It stays a silent return: no throw, no
        // error record, no toast surface. The throw belongs to the delivery
        // failure below, where a user was IN a room and nothing reached them.
        expect(() => store.sendCommand(BASE, 'play')).not.toThrow();
        expect(FakeWebSocket.instances).toHaveLength(0);
        expect(store.error).toBeNull();
    });

    it('puts a play frame on the wire', async () => {
        const store = await joinedRoom05();
        store.sendCommand(BASE, 'play', { position: 12 });

        const frames = socket().sent.map((raw) => JSON.parse(raw) as Record<string, unknown>);
        expect(frames.map((f) => f['type'])).toEqual(['syncplay_playback_play']);
        // S293: the wire unit is MILLISECONDS (SPEC.md:91) — 12 s → 12_000 ms.
        expect(frames[0]!['position']).toBe(12_000);
    });

    it('puts a seek frame on the wire with the target position', async () => {
        const store = await joinedRoom05();
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
        const store = await joinedRoom05();
        store.sendCommand(BASE, 'seek', { position: 123.25 });

        const frames = socket().sent.map((raw) => JSON.parse(raw) as Record<string, unknown>);
        expect(frames.map((f) => f['type'])).toEqual(['syncplay_playback_seek']);
        expect(frames[0]!['to_position']).toBe(123_250);
    });

    it('stamps the command with the session creator, not a placeholder', async () => {
        const store = await joinedRoom05();
        expect(store.currentSession!.createdBy).toBe('m1');
        store.sendCommand(BASE, 'pause', { position: 1 });
        expect(socket().sent).toHaveLength(1);
    });

    /**
     * M-UI-12 — THE silent-drop cure at the store boundary. A live session
     * whose socket is not OPEN (the window every reconnect ladder is climbed
     * through) used to return from `sendCommand()` exactly like a delivered
     * command: no throw, no record, the caller emitting optimistic transport
     * events to a group that heard nothing. `sendSyncPlayCommand()` now
     * reports delivery, and the store turns a non-delivery into a typed throw
     * plus a record on its honest `error` channel.
     */
    it('throws SyncPlayCommandNotDeliveredError when the socket is not OPEN', async () => {
        const store = await joinedRoom05();
        socket().close(); // readyState 3 — the guard tripwire in api/syncplay.ts
        socket().sent.length = 0;

        expect(() => store.sendCommand(BASE, 'play')).toThrow(SyncPlayCommandNotDeliveredError);
        expect(socket().sent).toHaveLength(0);
        expect(store.error).toBe('Couldn’t deliver the SyncPlay command to the group.');
    });

    it('the throw carries the command type, not a placeholder string', async () => {
        const store = await joinedRoom05();
        socket().close();
        try {
            store.sendCommand(BASE, 'seek', { position: 42 });
            expect.unreachable('sendCommand must throw when the wire is down');
        } catch (e) {
            expect(e).toBeInstanceOf(SyncPlayCommandNotDeliveredError);
            expect((e as SyncPlayCommandNotDeliveredError).commandType).toBe('seek');
        }
    });

    it('a delivered command leaves the error channel untouched', async () => {
        const store = await joinedRoom05();
        store.sendCommand(BASE, 'play', { position: 5 });
        expect(store.error).toBeNull();
    });
});

// ── S298: the hub-relay pending_command consumer pair ─────────────────────────

describe('useSyncPlayStore — hub-relay pending_command consumer (S298)', () => {
    const cmd = {
        type: 'pending_command' as const,
        command: 'play_media' as const,
        serverId: 'srv-1',
        mediaId: 'media-9',
        title: 'Inception',
        issuedAt: 1_700_000_000,
        source: 'alexa',
    };

    it('holds the delivered command for the Player load path', () => {
        const store = useSyncPlayStore();
        expect(store.pendingPlayMedia).toBeNull();
        store.applyPendingPlayMedia(cmd);
        expect(store.pendingPlayMedia).toEqual(cmd);
    });

    it('writes currentMediaId into a live session — the paired caller for the carry-through', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession();
        expect(store.currentSession!.currentMediaId).toBeNull();
        store.applyPendingPlayMedia(cmd);
        expect(store.currentSession!.currentMediaId).toBe('media-9');
        expect(store.pendingPlayMedia).toEqual(cmd);
    });

    it('works with NO session — the primary "Alexa, play X" case has no room', () => {
        const store = useSyncPlayStore();
        expect(store.currentSession).toBeNull();
        store.applyPendingPlayMedia(cmd);
        expect(store.pendingPlayMedia).toEqual(cmd);
        // No session → nothing to mutate; the Player consumes pendingPlayMedia.
        expect(store.currentSession).toBeNull();
    });

    it('consumePendingPlayMedia clears the slot so a session update cannot re-trigger the load', () => {
        const store = useSyncPlayStore();
        store.applyPendingPlayMedia(cmd);
        store.consumePendingPlayMedia();
        expect(store.pendingPlayMedia).toBeNull();
    });
});

// ── S-ui-player-28 — findings phlix-ui-player-038 / phlix-ui-player-040 ─────────
//
// The outbound frame builders used to FABRICATE wire state: a seek always
// reported `from_position: 0` ("We don't track from position" — the cached
// group does), and a sync always reported `is_playing: true` (a paused member
// asking to sync announced itself as playing). Finding 040 is the receive-side
// sibling: malformed inbound JSON vanished into an empty catch. Every pin here
// asserts the FRAME ON THE WIRE (S287 doctrine), and the sync control pin
// stays green on both sides of the fix so the reds cannot be vacuous.

function framesOfType(type: string): Array<Record<string, unknown>> {
    return socket()
        .sent.map((raw) => JSON.parse(raw) as Record<string, unknown>)
        .filter((frame) => frame['type'] === type);
}

function ackFor(over: Record<string, unknown>): Record<string, unknown> {
    return {
        type: 'syncplay_group_state',
        group: {
            group_id: GROUP_ID,
            group_name: 'Movie Night',
            members: [{ id: 'm1', name: 'Ada', joined_at: 1_700_000_000 }],
            member_count: 1,
            host_id: 'm1',
            playback_position: 0,
            ...over,
        },
    };
}

/** Join, deliver the join-ack (v0.1.8 LW-044 law, see the remote-frame tests), clear the wire. */
async function joinAckedRoom(ack: Record<string, unknown>): Promise<ReturnType<typeof useSyncPlayStore>> {
    const store = useSyncPlayStore();
    await store.joinRoom(BASE, GROUP_ID);
    socket().deliver(ack as never);
    socket().sent.length = 0;
    return store;
}

describe('phlix-ui-player-038 — frame builders carry the caller real state', () => {
    it('a seek frame origin is the cached group position, not the fabricated zero', async () => {
        await joinAckedRoom(ackFor({ playback_position: 5_678, playback_state: 'playing' }));

        expect(sendSyncPlayCommand(cmd({ type: 'seek', position: 1_234 }))).toBe(true);

        const seek = framesOfType('syncplay_playback_seek');
        expect(seek).toHaveLength(1);
        // The line this pin exists to kill: `const fromPos = 0;`.
        expect(seek[0]!['from_position']).toBe(5_678);
        expect(seek[0]!['to_position']).toBe(1_234);
    });

    it('a seek with no cached group sends NOTHING — unknown origin is a refusal, not a zero', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        socket().sent.length = 0;

        // No group_state ack: the client knows no origin. M-UI-12 makes that
        // observable — false means no frame reached the wire — instead of the
        // old shape: a frame asserting playback started at 0 (and a `true`
        // claiming it was the cached group's own position).
        expect(sendSyncPlayCommand(cmd({ type: 'seek', position: 1_234 }))).toBe(false);
        expect(framesOfType('syncplay_playback_seek')).toHaveLength(0);
        void store;
    });

    it('a sync with rate 0 reports is_playing false — the forced true does not survive to the frame', async () => {
        await joinAckedRoom(ackFor({ playback_position: 1_000, playback_state: 'playing' }));

        expect(sendSyncPlayCommand(cmd({ type: 'sync', position: 9_000, rate: 0 }))).toBe(true);

        const sync = framesOfType('syncplay_playback_sync');
        expect(sync).toHaveLength(1);
        expect(sync[0]!['position']).toBe(9_000);
        // rate governs when present: 0 is a paused member, whatever the group says.
        expect(sync[0]!['is_playing']).toBe(false);
    });

    it('a sync with no rate derives is_playing from the cached group state — paused is false, never a fabricated true', async () => {
        await joinAckedRoom(ackFor({ playback_position: 2_000, playback_state: 'paused' }));

        expect(sendSyncPlayCommand(cmd({ type: 'sync', position: 4_000 }))).toBe(true);

        const sync = framesOfType('syncplay_playback_sync');
        expect(sync).toHaveLength(1);
        expect(sync[0]!['is_playing']).toBe(false);
    });

    it('CONTROL — a sync with no rate while the group IS playing still reports is_playing true', async () => {
        await joinAckedRoom(ackFor({ playback_position: 2_000, playback_state: 'playing' }));

        expect(sendSyncPlayCommand(cmd({ type: 'sync', position: 4_000 }))).toBe(true);

        const sync = framesOfType('syncplay_playback_sync');
        expect(sync).toHaveLength(1);
        expect(sync[0]!['is_playing']).toBe(true);
    });
});

describe('phlix-ui-player-040 — malformed inbound JSON warns once and counts', () => {
    afterEach(() => {
        setSyncPlayLogger(null);
    });

    it('two broken frames produce ONE warn, a count of 2, and a connection that survives', async () => {
        const warnSpy = vi.fn();
        setSyncPlayLogger({ log: vi.fn(), warn: warnSpy, error: vi.fn() });

        const store = await joinAckedRoom(ackFor({ playback_state: 'playing' }));

        socket().onmessage?.({ data: 'not-json' } as MessageEvent);
        socket().onmessage?.({ data: '{"broken":' } as MessageEvent);

        // The empty catch made this exact assertion impossible: zero warns,
        // zero signal, zero count.
        expect(warnSpy).toHaveBeenCalledTimes(1);

        // The counter is this fix's new export; a static import of a name that
        // does not exist yet would error the whole suite at load, so the pin
        // reaches it dynamically and the red points at the export itself.
        const mod = (await import('../api/syncplay')) as Record<string, unknown>;
        expect(typeof mod['getSyncPlayParseErrorCount']).toBe('function');
        const counter = mod['getSyncPlayParseErrorCount'] as () => number;
        expect(counter()).toBe(2);

        // Connection survives — a following VALID frame flows through the real
        // chain untouched (the socket is healthy; only the bad frame is junk).
        socket().deliver({ type: 'syncplay_playback_pause', member_id: 'someone-else', position: 3_000 });
        expect(store.currentSession!.state).toBe('paused');

        // Never spams: the third failure counts, it does not re-warn.
        socket().onmessage?.({ data: '}' } as MessageEvent);
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(counter()).toBe(3);
    });
});

// ── S-ui-player-19 — findings phlix-ui-player-023 / phlix-ui-player-037 ────────
//
// 023: a create-and-join whose JOIN leg failed used to abandon the freshly
// created room — the user was told "failed to join" while the group stayed
// alive server-side with only them in it. New law: the catch issues a
// best-effort leave for the just-created id; a rollback that itself fails is
// swallowed (the ORIGINAL error must still surface — one error, never two)
// and never blocks the user-facing error path.
// 037: leaving a room tore down room/session/members but left the local
// playback position and the unconsumed hub pending-play command behind — a
// rejoin saw a flash of the stale position, and a command the user never
// meant to replay could autoplay into the new room.

describe('phlix-ui-player-023 — a failed create-and-join rolls the created room back', () => {
    it('join failure issues a best-effort leave for the just-created room id', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/join'] });
        const store = useSyncPlayStore();

        await expect(store.createAndJoinRoom(BASE, { name: 'x' })).rejects.toThrow();

        // create → join(404) → leave: the rollback really goes out, against
        // THE CREATED ID (retry-safe: the room is not left to orphan), and the
        // original join error still surfaces below.
        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            'POST /api/v1/syncplay/groups',
            `POST /api/v1/syncplay/groups/${GROUP_ID}/join`,
            `POST /api/v1/syncplay/groups/${GROUP_ID}/leave`,
        ]);
        expect(store.error).not.toBeNull();
        expect(store.isLoading).toBe(false);
    });

    it('a SUCCESSFUL create-and-join issues NO rollback leave', async () => {
        const store = useSyncPlayStore();
        await store.createAndJoinRoom(BASE, { name: 'Movie Night' });

        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            'POST /api/v1/syncplay/groups',
            `POST /api/v1/syncplay/groups/${GROUP_ID}/join`,
        ]);
        expect(store.currentRoom!.id).toBe(GROUP_ID);
    });

    it('a REJECTING rollback still surfaces the ORIGINAL join error', async () => {
        // Both legs unserved: the join 404s, the rollback 404s too. The
        // rollback failure must not mask the first error nor throw from the
        // catch — the user gets the join failure, the store gets its error,
        // and isLoading still clears.
        server = makeSyncPlayServer(BASE, {
            omit: ['POST /api/v1/syncplay/groups/{id}/join', 'POST /api/v1/syncplay/groups/{id}/leave'],
        });
        const store = useSyncPlayStore();

        await expect(store.createAndJoinRoom(BASE, { name: 'x' })).rejects.toThrow();
        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            'POST /api/v1/syncplay/groups',
            `POST /api/v1/syncplay/groups/${GROUP_ID}/join`,
            `POST /api/v1/syncplay/groups/${GROUP_ID}/leave`,
        ]);
        expect(store.error).not.toBeNull();
        expect(store.isLoading).toBe(false);
        // The half-joined shape is preserved exactly as before: no extra
        // teardown was smuggled in under the banner of "rollback".
        expect(store.currentRoom!.id).toBe(GROUP_ID);
        expect(store.currentSession).toBeNull();
    });

    it('a CREATE failure has no room to roll back — no leave is issued', async () => {
        server = makeSyncPlayServer(BASE, { omit: ['POST /api/v1/syncplay/groups'] });
        const store = useSyncPlayStore();

        await expect(store.createAndJoinRoom(BASE, { name: 'x' })).rejects.toThrow();
        expect(server!.requests.some((r) => r.path.endsWith('/leave'))).toBe(false);
    });
});

describe('phlix-ui-player-037 — leaveRoom clears the local playback residue', () => {
    const pending: PendingPlayMediaCommand = {
        type: 'pending_command',
        command: 'play_media',
        serverId: 'srv-1',
        mediaId: 'media-9',
        title: 'Inception',
        issuedAt: 1_700_000_000,
        source: 'alexa',
    };

    it('leaveRoom resets localPlaybackPosition — a rejoin must not inherit the stale value', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { ...room };

        store.updateLocalPosition(42);
        // SET-THEN-LEAVE-THEN-ASSERT: the 42 is observable BEFORE the leave,
        // so the 0 below cannot pass vacuously.
        expect(store.localPlaybackPosition).toBe(42);

        await store.leaveRoom(BASE);
        expect(store.localPlaybackPosition).toBe(0);
    });

    it('leaveRoom drops an unconsumed pendingPlayMedia — no autoplay into the next room', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        store.currentRoom = { ...room };

        store.applyPendingPlayMedia(pending);
        expect(store.pendingPlayMedia).toEqual(pending);

        await store.leaveRoom(BASE);
        expect(store.pendingPlayMedia).toBeNull();
    });
});

// ── S-ui-player-05 — echo-suppressed, store-owned transport ──────────────────

/** S-ui-player-05 twin of the sendCommand-suite local helper (describe-scoped there). */
async function joinedRoom05(): Promise<ReturnType<typeof useSyncPlayStore>> {
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

// phlix-ui-player-007/008: Player-local transport must drive the room through the
// STORE (so an unmounted Player behind the dock keeps broadcasting), and the
// sender must COMMIT its own intent on a successful send so the server's verbatim
// echo (SPEC.md: play/pause/seek echo FALLBACK) is recognised as redundant and
// never re-broadcast. The guard is the pure shouldBroadcastSyncPlayCommand;
// sendCommand commits through the same applier the inbound path uses.

describe('S-ui-player-05 — shouldBroadcastSyncPlayCommand (pure echo guard)', () => {
    const playing = { state: 'playing' as const, playbackPosition: 100 };
    const paused = { state: 'paused' as const, playbackPosition: 100 };
    const waiting = { state: 'waiting' as const, playbackPosition: 0 };

    it('has no opinion outside a room (the isInRoom arm stays with the caller)', () => {
        expect(shouldBroadcastSyncPlayCommand(null, 'play')).toBe(true);
    });

    it('suppresses a play that repeats the committed PLAYING state', () => {
        expect(shouldBroadcastSyncPlayCommand(playing, 'play')).toBe(false);
        expect(shouldBroadcastSyncPlayCommand(paused, 'play')).toBe(true);
        expect(shouldBroadcastSyncPlayCommand(waiting, 'play')).toBe(true);
    });

    it('suppresses a pause that repeats the committed PAUSED state', () => {
        expect(shouldBroadcastSyncPlayCommand(paused, 'pause')).toBe(false);
        expect(shouldBroadcastSyncPlayCommand(playing, 'pause')).toBe(true);
    });

    it('suppresses a seek that lands within tolerance of the committed position', () => {
        expect(shouldBroadcastSyncPlayCommand(playing, 'seek', 100)).toBe(false);
        expect(shouldBroadcastSyncPlayCommand(playing, 'seek', 100 + SYNC_ECHO_TOLERANCE_SECONDS / 2)).toBe(false);
        expect(shouldBroadcastSyncPlayCommand(playing, 'seek', 140)).toBe(true);
        expect(shouldBroadcastSyncPlayCommand(playing, 'seek')).toBe(true); // no position = full re-sync
    });

    it('never broadcasts a sync frame outbound — sync is an inbound-only shape', () => {
        expect(shouldBroadcastSyncPlayCommand(playing, 'sync', 100)).toBe(false);
    });
});

describe('S-ui-player-05 — sendCommand commits its own intent on a delivered send', () => {
    it('a delivered play advances the LOCAL session state, making the echo redundant', async () => {
        const store = await joinedRoom05();
        // Park the group in a known PAUSED state (inbound frames never hit the wire).
        store.onRemoteStateUpdate(cmd({ type: 'pause' }));
        expect(store.currentSession!.state).toBe('paused');
        socket().sent.length = 0;

        store.sendCommand(BASE, 'play');

        expect(socket().sent.length, 'one play frame on the wire').toBe(1);
        // THE CURE: the sender's own session commits immediately — before any echo
        // could arrive — so echo-triggered re-applies see the state they caused.
        expect(store.currentSession!.state).toBe('playing');
    });

    it('a delivered seek commits SECONDS into the session (never the ms wire scale)', async () => {
        const store = await joinedRoom05();
        socket().sent.length = 0;

        store.sendCommand(BASE, 'seek', { position: 900 });

        expect(socket().sent.length).toBe(1); // wire carries 900000 ms (pinned upstream)
        expect(store.currentSession!.playbackPosition, 'session scale stays seconds').toBe(900);
    });

    it('a FAILED send commits nothing (no lie to the local session)', async () => {
        const store = await joinedRoom05();
        store.onRemoteStateUpdate(cmd({ type: 'pause' }));
        socket().sent.length = 0;
        closeSyncPlayConnection(); // next sendSyncPlayCommand returns false

        expect(() => store.sendCommand(BASE, 'play')).toThrow(SyncPlayCommandNotDeliveredError);
        expect(store.currentSession!.state, 'failed delivery must not mutate the session').toBe('paused');
        expect(store.error).toBe('Couldn’t deliver the SyncPlay command to the group.');
    });
});

describe('S-ui-player-05 — notifyTransportCommand (transport-event entry)', () => {
    it('is completely inert outside a room — local playback is untouched by sync', async () => {
        const store = useSyncPlayStore();
        expect(() => store.notifyTransportCommand(BASE, 'play')).not.toThrow();
        expect(FakeWebSocket.instances).toHaveLength(0);
        expect(store.error).toBeNull();
        expect(store.currentSession).toBeNull();
    });

    it('broadcasts a genuine user action, then swallows its own echo', async () => {
        const store = await joinedRoom05();
        store.onRemoteStateUpdate(cmd({ type: 'pause' }));
        socket().sent.length = 0;

        store.notifyTransportCommand(BASE, 'play'); // the user hit play on a paused group
        expect(socket().sent.length).toBe(1);

        // The server echoes the play verbatim; the dock/@play path reacting to it
        // calls notify again — the committed state now suppresses it.
        store.onRemoteStateUpdate(cmd({ type: 'play', position: undefined }));
        store.notifyTransportCommand(BASE, 'play');
        expect(socket().sent.length, 'echo re-broadcast suppressed').toBe(1);
    });

    it('a repeated in-tolerance seek does not re-broadcast; a real move does', async () => {
        const store = await joinedRoom05();
        socket().sent.length = 0;

        store.notifyTransportCommand(BASE, 'seek', { position: 42.5 });
        expect(socket().sent.length).toBe(1);
        store.notifyTransportCommand(BASE, 'seek', { position: 42.5 }); // echo/repeat
        expect(socket().sent.length).toBe(1);
        expect(store.error).toBeNull();
        store.notifyTransportCommand(BASE, 'seek', { position: 90 }); // genuine move
        // The client's 250 ms seek-coalescing window queues the frame (it never
        // swallows it) — the guard decision is observable IMMEDIATELY in the
        // store commit: a suppressed call would leave the anchor at 42.5.
        expect(store.currentSession!.playbackPosition).toBe(90);
        await new Promise((r) => setTimeout(r, 300)); // past seekThrottleMs
        expect(socket().sent.length, 'the real move reaches the wire once the coalescing window flushes').toBe(2);
    });

    it('swallows a delivery failure — a transport event handler must never die over it', async () => {
        const store = await joinedRoom05();
        store.onRemoteStateUpdate(cmd({ type: 'pause' }));
        closeSyncPlayConnection();

        expect(() => store.notifyTransportCommand(BASE, 'play')).not.toThrow();
        expect(store.error).toBe('Couldn’t deliver the SyncPlay command to the group.');
    });
});
