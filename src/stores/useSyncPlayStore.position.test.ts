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
import { closeSyncPlayConnection, openSyncPlayConnection } from '../api/syncplay';
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
        // S293: the wire unit is MILLISECONDS (SPEC.md:91) — 42 s leaves the
        // send boundary as 42_000 ms, never as 42.
        expect(positionFrames()[0]!.position).toBe(42_000);
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

        // S293: seconds in, milliseconds on the wire (SPEC.md:91).
        expect(positionFrames().map((f) => f.position)).toEqual([11_500, 16_500]);
    });

    /**
     * S293 — Boundary #1 unit assertion (periodic report → `reportPosition`).
     *
     * The fixture is 42.5 s: without the seconds→ms conversion at the send
     * boundary the wire would carry 42.5 — off by exactly 1000× — and the
     * value is never 0 and never reads the same in both units.
     */
    it('S293 — the report carries MILLISECONDS on the wire, not seconds', async () => {
        const store = useSyncPlayStore();
        await store.joinRoom(BASE, GROUP_ID);
        confirmGroup();

        store.updateLocalPosition(42.5);
        vi.advanceTimersByTime(5000);

        expect(positionFrames()).toHaveLength(1);
        expect(positionFrames()[0]!.position).toBe(42_500);
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
        await store.createAndJoinRoom(BASE, { name: 'Movie Night' });
        confirmGroup();
        store.updateLocalPosition(3);

        vi.advanceTimersByTime(5000);
        expect(positionFrames()).toHaveLength(1);
        // S293: 3 s → 3_000 ms on the wire.
        expect(positionFrames()[0]!.position).toBe(3_000);
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

// ── S-ui-player-28 — finding phlix-ui-player-039 (the untracked reconnect rung) ─
//
// The reconnect rung was scheduled as a bare `setTimeout` whose handle nobody
// kept: a caller-initiated JOIN to a new room left the OLD room's rung armed,
// and when the new room's socket happened to be momentarily down the stray rung
// dialed it PREMATURELY (off the old rung's clock, ahead of the budget the new
// session had just started). The handle is now tracked, cleared on join, and a
// re-schedule REPLACES instead of stacking. Fake timers are live per this file's
// beforeEach; the file-level afterEach `closeSyncPlayConnection()` tears every
// session down.

const roomAck = (roomId: string): Record<string, unknown> => ({
    type: 'syncplay_group_state',
    group: {
        group_id: roomId,
        group_name: `Room ${roomId}`,
        members: [{ id: 'm1', name: 'Ada', joined_at: 1_700_000_000 }],
        member_count: 1,
        host_id: 'm1',
        playback_position: 0,
        playback_state: 'paused',
    },
});

describe('phlix-ui-player-039 — reconnect rungs are tracked and owned by their room', () => {
    it('joining a second room kills the pending rung the first room scheduled', () => {
        openSyncPlayConnection('sp_room_a', undefined, 'm1', 'Ada');
        socket().deliver(roomAck('sp_room_a'));
        socket().onclose?.(); // arms rung #1 at +1000 (fresh budget)

        vi.advanceTimersByTime(100);
        openSyncPlayConnection('sp_room_b', undefined, 'm1', 'Ada'); // caller join: rung #1 must die

        vi.advanceTimersByTime(100); // t=200
        socket().onclose?.(); // B drops: ITS rung at +1000 (openSyncPlayConnection reset the budget)

        vi.advanceTimersByTime(800); // t=1000 — the stale A rung would ring HERE untracked
        expect(FakeWebSocket.instances).toHaveLength(2);

        vi.advanceTimersByTime(200); // t=1200 — B rung fires ON SCHEDULE
        expect(FakeWebSocket.instances).toHaveLength(3);
        expect(FakeWebSocket.instances[2]!.url).toContain('room=sp_room_b');
    });

    it('a second close while a rung is pending neither stacks a second rung nor skips the next step', () => {
        // phlix-ui-player-039: with a tracked rung the close ladder escalates per
        // DIAL-AND-DIE, never per close event. A second close with a rung already
        // in flight is inert — the pending rung keeps both its slot and its step.
        // Untracked, the second close armed a parallel rung two steps deep: the
        // extra timer deduped into silence at fire time, but the attempt counter
        // had ALREADY skipped, doubling the delay the next real outage pays.
        openSyncPlayConnection('sp_room_a', undefined, 'm1', 'Ada');
        socket().deliver(roomAck('sp_room_a'));
        socket().onclose?.(); // rung #1 at t=1000 (attempt 1)

        vi.advanceTimersByTime(500);
        socket().onclose?.(); // a second close must NOT arm a parallel rung

        vi.advanceTimersByTime(500); // t=1000 — rung #1 dials, ON TIME, exactly once
        expect(FakeWebSocket.instances).toHaveLength(2);

        vi.advanceTimersByTime(500); // t=1500 — the dialed socket drops too
        socket().onclose?.();

        // t=2500 — the moment the t=500 close's PARALLEL rung (the untracked old
        // code armed one at step two) would have dialed. Tracked rungs: silence.
        vi.advanceTimersByTime(1_000);
        expect(FakeWebSocket.instances).toHaveLength(2);

        vi.advanceTimersByTime(1_000); // t=3500 — rung #2, +2000 (never +4000)
        expect(FakeWebSocket.instances).toHaveLength(3);
        expect(FakeWebSocket.instances[2]!.url).toContain('room=sp_room_a');
    });

    it('a rung dials the room it was SCHEDULED for and the re-dialed socket re-joins it', () => {
        openSyncPlayConnection('sp_room_a', undefined, 'm1', 'Ada');
        socket().deliver(roomAck('sp_room_a'));
        socket().onclose?.();

        vi.advanceTimersByTime(999);
        expect(FakeWebSocket.instances).toHaveLength(1);
        vi.advanceTimersByTime(1);
        expect(FakeWebSocket.instances).toHaveLength(2);
        expect(FakeWebSocket.instances[1]!.url).toContain('room=sp_room_a');

        // The rung carries its scheduled room end to end — the socket it dialed
        // announces the SAME group in its GROUP_JOIN, not state re-read later.
        socket().onopen?.();
        const join = socket()
            .sent.map((raw) => JSON.parse(raw) as Record<string, unknown>)
            .find((frame) => frame['type'] === 'syncplay_group_join');
        expect(join).toBeDefined();
        expect(join!['group_id']).toBe('sp_room_a');
    });
});
