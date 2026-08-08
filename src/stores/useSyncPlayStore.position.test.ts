/**
 * S287 — this client reports its playback position to the group, at a CADENCE.
 *
 * `sendSyncPlayStateUpdate()` was implemented, exported and unit-tested, and had
 * **no production caller**: every member received commands and reported nothing,
 * which is exactly the telemetry phlix-server's `handlePlaybackSync()` is built
 * around. This file proves the wiring, and — because a cadence stated only in a
 * comment rots — proves the cadence itself.
 *
 * ⚠ The interval is advanced by LITERAL milliseconds here, never by
 * `POSITION_REPORT_INTERVAL_MS`. A test that advanced by the constant it is
 * checking would self-adjust to any change of that constant and could never fail;
 * the constant is separately pinned to its literal value below.
 *
 * The assertion target is the FRAME ON THE SOCKET, decoded from the bytes the
 * transport was handed — not a spy on `sendSyncPlayStateUpdate`, which would pass
 * against a sender that dropped everything.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSyncPlayStore, POSITION_REPORT_INTERVAL_MS } from './useSyncPlayStore';
import { closeSyncPlayConnection } from '../api/syncplay';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../api/test/syncplayServer';

const BASE = 'https://media.example.com';
const GROUP_ID = 'sp_abc123';

let server: FakeSyncPlayServer | null = null;

globalThis.fetch = ((url: string, init?: RequestInit): Promise<Response> => {
    if (!server) return Promise.reject(new Error('no fake SyncPlay server installed'));
    return server.fetch(url, init);
}) as unknown as typeof fetch;

/** A WebSocket that records what was written and can deliver inbound frames. */
class FakeWebSocket {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;

    static instances: FakeWebSocket[] = [];

    readyState: number = FakeWebSocket.OPEN;
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
        this.readyState = FakeWebSocket.CLOSED;
    }

    /** Push one inbound frame through the module's `onmessage`. */
    deliver(frame: unknown): void {
        this.onmessage?.({ data: JSON.stringify(frame) } as MessageEvent);
    }
}

globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;

function socket(): FakeWebSocket {
    const s = FakeWebSocket.instances.at(-1);
    expect(s, 'no WebSocket was constructed').toBeDefined();
    return s!;
}

/** The `syncplay_playback_sync` frames written to the socket so far. */
function positionFrames(): Array<{ position: number; is_playing: boolean; member_id: string }> {
    return socket()
        .sent.map((raw) => JSON.parse(raw) as Record<string, unknown>)
        .filter((f) => f['type'] === 'syncplay_playback_sync') as unknown as Array<{
        position: number;
        is_playing: boolean;
        member_id: string;
    }>;
}

/**
 * Join, handshake, and let the server confirm the group.
 *
 * ⚠ The `syncplay_group_state` frame is load-bearing, not decoration:
 * `SyncPlayClient.reportPosition()` is guarded by `this.group !== null`, and only
 * `handleGroupState()` sets that. A fixture that skipped it would make every
 * report silently no-op, and `expect(positionFrames()).toHaveLength(0)` would
 * then pass for entirely the wrong reason. The server does send it — phlix-server
 * `SyncPlayManager::handleJoinGroup()` answers a join with
 * `sendFlat(TYPE_GROUP_STATE, ...)`.
 */
function confirmGroup(): void {
    socket().onopen?.();
    socket().deliver({
        type: 'syncplay_group_state',
        group: {
            group_id: GROUP_ID,
            group_name: 'Movie Night',
            members: [{ id: 'm1', name: 'Alice', joined_at: 1_700_000_000 }],
            member_count: 1,
            host_id: 'm1',
            playback_position: 123,
            playback_state: 'playing',
        },
    });
    socket().sent.length = 0;
}

beforeEach(() => {
    setActivePinia(createPinia());
    server = makeSyncPlayServer(BASE);
    FakeWebSocket.instances = [];
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.useFakeTimers();
});

afterEach(() => {
    closeSyncPlayConnection();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('S287 — the position report cadence', () => {
    it('is 5000 ms — pinned to the literal, not read back off itself', () => {
        // The rationale lives on the constant's docblock: the report is a PULL
        // (`handlePlaybackSync()` discards the payload position and re-broadcasts
        // the group's own), the server answers it with a group-wide broadcast so
        // the cost is quadratic in members, and 5 s is well inside the 2000 ms
        // `DEFAULT_POSITION_TOLERANCE`. Changing the number is a decision; this
        // line makes it a deliberate one.
        expect(POSITION_REPORT_INTERVAL_MS).toBe(5000);
    });

    it('sends NOTHING before the interval elapses, then exactly one report', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();
        store.updateLocalPosition(42);

        // 4999 ms — one millisecond short. This is the half that fails if the
        // report were wired to `timeupdate`, to a watcher, or to a shorter timer.
        vi.advanceTimersByTime(4999);
        expect(positionFrames()).toHaveLength(0);

        vi.advanceTimersByTime(1);
        expect(positionFrames()).toHaveLength(1);
        expect(positionFrames()[0]!.position).toBe(42);
        expect(positionFrames()[0]!.is_playing).toBe(true);
    });

    it('repeats — one report per interval, not one and done', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();
        store.updateLocalPosition(10);

        vi.advanceTimersByTime(5000);
        expect(positionFrames()).toHaveLength(1);
        vi.advanceTimersByTime(5000);
        expect(positionFrames()).toHaveLength(2);
        // 30 s of playback is 6 reports, not 120 (`timeupdate`) and not 30 (1 Hz).
        vi.advanceTimersByTime(20_000);
        expect(positionFrames()).toHaveLength(6);
    });

    it('reports the position the PLAYER last fed in, not a constant', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();

        // `updateLocalPosition` is what `Player.vue`'s `timeupdate` handler calls;
        // the value has to survive all the way onto the wire or the report is a
        // heartbeat carrying a fixed number.
        store.updateLocalPosition(11.5);
        vi.advanceTimersByTime(5000);
        store.updateLocalPosition(16.5);
        vi.advanceTimersByTime(5000);

        expect(positionFrames().map((f) => f.position)).toEqual([11.5, 16.5]);
    });

    it('CONTROL — reports nothing while the session is PAUSED', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();
        store.updateLocalPosition(42);

        // Same store, same socket, same 15 s: the ONLY difference is the state.
        // Beside the passing playing-case above, this cannot be a vacuous zero.
        store.currentSession = { ...store.currentSession!, state: 'paused' };
        vi.advanceTimersByTime(15_000);
        expect(positionFrames()).toHaveLength(0);

        store.currentSession = { ...store.currentSession!, state: 'playing' };
        vi.advanceTimersByTime(5000);
        expect(positionFrames()).toHaveLength(1);
    });

    it('reports PLAYING even when the rate was left at 0 by a remote play command', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();

        // `onRemoteStateUpdate({type:'play'})` sets the state and leaves the rate
        // alone, so a session can be `playing` at rate 0. The frame's `is_playing`
        // is derived from the rate, so forwarding that 0 verbatim would report
        // this member as paused while it plays.
        store.currentSession = { ...store.currentSession!, state: 'playing', playbackRate: 0 };
        store.updateLocalPosition(7);
        vi.advanceTimersByTime(5000);

        expect(positionFrames()).toHaveLength(1);
        expect(positionFrames()[0]!.is_playing).toBe(true);
    });

    it('the CREATOR reports too — the create path starts the timer, not just the join path', async () => {
        const store = useSyncPlayStore();
        await store.createAndJoinRoom(BASE, { name: 'Movie Night', isPublic: true });
        confirmGroup();
        store.updateLocalPosition(3);

        vi.advanceTimersByTime(5000);
        expect(positionFrames()).toHaveLength(1);
        expect(positionFrames()[0]!.position).toBe(3);
    });

    it('stops on leaveRoom — a left room must not keep broadcasting', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();
        store.updateLocalPosition(42);

        vi.advanceTimersByTime(5000);
        expect(positionFrames()).toHaveLength(1);

        const beforeLeave = socket();
        // CONTROL: a timer really is live at this point, so the 0 below is not a
        // number this harness produces regardless.
        expect(vi.getTimerCount()).toBe(1);

        await store.leaveRoom(BASE);

        // ⚠ Asserted WITHOUT advancing the clock, and this is the whole point.
        // `leaveRoom()` also closes the socket and nulls the session, so a timer
        // left running would emit nothing anyway (the sender no-ops on a closed
        // socket) and would clear itself on its first tick — an assertion made
        // after `advanceTimersByTime` therefore passes with the stop removed.
        // It survived exactly that mutation until this line was added. Leaving
        // a room must not leave a live interval behind at all.
        expect(vi.getTimerCount()).toBe(0);

        vi.advanceTimersByTime(60_000);
        // Read the SAME socket object the reports landed on: `leaveRoom()` also
        // closes the connection, so re-resolving it would be reading a corpse and
        // any count would look like a pass.
        const after = beforeLeave.sent
            .map((raw) => JSON.parse(raw) as Record<string, unknown>)
            .filter((f) => f['type'] === 'syncplay_playback_sync');
        expect(after).toHaveLength(1);
    });

    it('stops itself when the session is gone, so a stray timer cannot tick forever', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();

        // No `leaveRoom()` — this is the "navigated away, session dropped" shape.
        store.currentSession = null;
        vi.advanceTimersByTime(5000);
        // The tick that found no session clears the interval, so the store is no
        // longer holding a live timer at all.
        expect(vi.getTimerCount()).toBe(0);
    });
});
