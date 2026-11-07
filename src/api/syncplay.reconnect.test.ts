/**
 * S283 — the SyncPlay reconnect ladder, measured rather than read.
 *
 * S264 proved the WebSocket plumbing but deliberately did NOT pin the ladder:
 * `handleWsClose()` computes `RECONNECT_BASE_DELAY_MS * 2 ** attempts`, which is
 * correct on its face, yet its reconnect timer re-entered
 * `openSyncPlayConnection()`, whose `syncPlayReconnectAttempts = 0` zeroed the
 * very counter the delay is computed from. The formula was never wrong; a
 * DIFFERENT function on the same path reset its input. A unit test of the
 * formula passed against the broken code, which is exactly why there is no unit
 * test of the formula here.
 *
 * Everything below is an END-TO-END probe. The delay is not read off the
 * `setTimeout` argument and not read off the module's own log line — both of
 * those are the same variable the code already believed in. It is measured by
 * advancing the fake clock ONE MILLISECOND AT A TIME and recording the tick on
 * which a new socket is actually constructed. A test that merely counted
 * reconnects, or that asserted `setTimeout` was called, passes against a flat
 * 1 Hz ladder.
 *
 * Observed sequences, same probe, same eight closes:
 *   BEFORE (0f7bcebc):  [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
 *   AFTER  (this step): [1000, 2000, 4000, 8000, 16000, 'gave-up', 'idle', 'idle']
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  openSyncPlayConnection,
  closeSyncPlayConnection,
  setSyncPlayLogger,
  setSyncPlayReconnectListener,
  isSyncPlayReconnectExhausted,
  retrySyncPlayConnection,
} from './syncplay';

const ROOM = 'sp_backoff';

// ── the fake socket ───────────────────────────────────────────────────────────

/** Same shape as the one in `syncplay.ws.test.ts`; jsdom would dial :8097 for real. */
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
    closeCalls = 0;

    constructor(readonly url: string) {
        FakeWebSocket.instances.push(this);
    }

    send(data: string): void {
        this.sent.push(data);
    }

    close(): void {
        this.closeCalls++;
        this.readyState = FakeWebSocket.CLOSED;
    }
}

/** The most recently constructed socket. */
function socket(): FakeWebSocket {
    const s = FakeWebSocket.instances.at(-1);
    if (!s) throw new Error('no socket was constructed');
    return s;
}

const makeRecorder = () => vi.fn((..._args: unknown[]) => {});
let warnSpy: ReturnType<typeof makeRecorder>;

beforeEach(() => {
    FakeWebSocket.instances = [];
    globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;
    localStorage.clear();
    // R12-07: record the module's lifecycle voice through its injectable logger
    // instead of spying on the host console (which it no longer writes to).
    warnSpy = makeRecorder();
    setSyncPlayLogger({ log: () => {}, warn: warnSpy, error: () => {} });
    vi.useFakeTimers();
});

afterEach(() => {
    closeSyncPlayConnection();
    setSyncPlayLogger(null);
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.clear();
});

// ── the probe ─────────────────────────────────────────────────────────────────

/** What one close produced: the measured reconnect delay, or why there was none. */
type Rung = number | 'gave-up' | 'idle';

/** How far the probe will wait for a reconnect before calling the rung dead. */
const PROBE_LIMIT_MS = 40_000;

/**
 * Fire one unexpected close on the live socket and MEASURE, in virtual
 * milliseconds, when the module actually builds the replacement socket.
 *
 * The clock is advanced 1 ms at a time, so the returned number is the tick on
 * which the reconnect really happened — not a number the production code handed
 * us. Returns `'gave-up'` if the module logged its give-up instead, and
 * `'idle'` if it neither reconnected nor gave up within {@link PROBE_LIMIT_MS}.
 */
function closeAndMeasure(): Rung {
    const socketsBefore = FakeWebSocket.instances.length;
    const warnsBefore = warnSpy.mock.calls.length;

    socket().onclose?.();

    for (let elapsed = 1; elapsed <= PROBE_LIMIT_MS; elapsed++) {
        vi.advanceTimersByTime(1);
        if (FakeWebSocket.instances.length > socketsBefore) return elapsed;
    }
    const gaveUp = warnSpy.mock.calls
        .slice(warnsBefore)
        .some((args: unknown[]) => String(args[0]).includes('Max reconnect attempts reached'));
    return gaveUp ? 'gave-up' : 'idle';
}

describe('handleWsClose — the exponential ladder, measured over 8 consecutive closes', () => {
    it('the delays GROW: each rung is double its predecessor until the cap fires', () => {
        openSyncPlayConnection(ROOM);
        const observed: Rung[] = [];
        for (let i = 0; i < 8; i++) observed.push(closeAndMeasure());

        // Printed deliberately: the acceptance evidence for S283 is the observed
        // sequence itself, and before the fix this line read
        // [1000,1000,1000,1000,1000,1000,1000,1000].
        console.info(`[S283] OBSERVED RECONNECT DELAYS (ms): ${JSON.stringify(observed)}`);

        // MAX_RECONNECT_ATTEMPTS is 5, so five rungs are climbed and the sixth
        // close gives up; the ladder PARKS (CU-077: the room is remembered, but
        // a parked ladder is inert), so closes 7 and 8 do nothing.
        expect(observed).toEqual([1000, 2000, 4000, 8000, 16_000, 'gave-up', 'idle', 'idle']);

        // Stated independently of the literals above, so a future change to the
        // base delay or the cap cannot turn this into a flat ladder unnoticed.
        const climbed = observed.filter((r): r is number => typeof r === 'number');
        expect(climbed.length).toBeGreaterThan(1);
        for (let i = 1; i < climbed.length; i++) {
            expect(climbed[i]).toBe(climbed[i - 1]! * 2);
        }
    });
});

describe('handleWsClose — the give-up cap, beside a reconnect that SUCCEEDS', () => {
    /**
     * Both arms run here on purpose. A give-up on its own cannot distinguish
     * "the cap fired" from "the reconnect broke for some other reason": the
     * observable in both cases is the absence of a new socket. The succeeding
     * arm is the control — same module, same fake socket, same clock — and it
     * proves the machinery still reconnects when the server comes back.
     */
    it('a reconnect that succeeds never reaches the cap; one that never succeeds does', () => {
        // ── ARM 1 (control): the server answers on the third attempt ──────────
        openSyncPlayConnection(ROOM);
        expect(closeAndMeasure()).toBe(1000);
        expect(closeAndMeasure()).toBe(2000);
        const reconnected = socket();
        reconnected.onopen?.(); // the connection actually came up

        // A successful open is a DIFFERENT event from "a reconnect attempt
        // started", and only the former clears the budget. So the next drop
        // starts again at the base delay rather than continuing at 4000.
        expect(closeAndMeasure()).toBe(1000);
        expect(closeAndMeasure()).toBe(2000);
        expect(closeAndMeasure()).toBe(4000);
        expect(closeAndMeasure()).toBe(8000);
        // Six closes so far in this arm, one more than the cap, and it is still
        // climbing: the give-up branch has NOT run.
        expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('Max reconnect attempts reached'));
        const socketsInArm1 = FakeWebSocket.instances.length;
        expect(socketsInArm1).toBeGreaterThan(1);

        closeSyncPlayConnection();

        // ── ARM 2: the server never comes back ───────────────────────────────
        openSyncPlayConnection('sp_dead');
        const socketsBeforeArm2 = FakeWebSocket.instances.length;
        const arm2: Rung[] = [];
        for (let i = 0; i < 6; i++) arm2.push(closeAndMeasure());

        expect(arm2).toEqual([1000, 2000, 4000, 8000, 16_000, 'gave-up']);
        expect(warnSpy).toHaveBeenCalledWith('[SyncPlay] Max reconnect attempts reached, giving up');
        // Five reconnect sockets were built, and then no more.
        expect(FakeWebSocket.instances.length).toBe(socketsBeforeArm2 + 5);
    });

    /**
     * The give-up branch is asserted statement by statement below, because it
     * was DEAD at runtime before S283 — an unreachable block accumulates
     * whatever it likes and nothing contradicts it. CU-077 changed its shape:
     * it still warns once, tears down the client and clears the budget, but it
     * REMEMBERS the room (parked, not forgotten) so a wake signal can retry.
     */
    it('the give-up branch warns ONCE, parks the room, tears down the client, and clears the budget', () => {
        const messages: unknown[] = [];
        openSyncPlayConnection(ROOM, (m) => messages.push(m), 'me', 'Me');
        for (let i = 0; i < 6; i++) closeAndMeasure();

        // (1) `console.warn(...)`
        expect(warnSpy).toHaveBeenCalledWith('[SyncPlay] Max reconnect attempts reached, giving up');

        const after = FakeWebSocket.instances.length;
        const dead = socket();

        // (3) `syncPlayClient = null` — an inbound frame now has nothing to
        // decode it, so it cannot reach the handler that is still registered.
        dead.onmessage?.({
            data: JSON.stringify({ type: 'syncplay_playback_play', member_id: 'peer', position: 5 }),
        } as MessageEvent);
        expect(messages).toEqual([]);

        // (2) CU-077 parked state — nothing further is scheduled even though
        // the room is remembered: a parked ladder is inert to stray closes…
        dead.onclose?.();
        vi.advanceTimersByTime(120_000);
        expect(FakeWebSocket.instances.length).toBe(after);

        // (4) `syncPlayReconnectAttempts = 0` — …and that extra close does NOT
        // re-enter the give-up branch. Left at MAX, every subsequent close would
        // warn again, so a dropped tab would log forever.
        expect(warnSpy.mock.calls.filter((a: unknown[]) => String(a[0]).includes('giving up'))).toHaveLength(1);

        // …but a caller-initiated connect gets a whole new budget, which is the
        // only reason the cap is safe to enforce at all.
        openSyncPlayConnection(ROOM);
        expect(FakeWebSocket.instances.length).toBe(after + 1);
        expect(closeAndMeasure()).toBe(1000);
    });
});

describe('openSyncPlayConnection — a caller-initiated connect resets the budget', () => {
    it('re-opening mid-ladder restarts the delays at the base', () => {
        openSyncPlayConnection(ROOM);
        expect(closeAndMeasure()).toBe(1000);
        expect(closeAndMeasure()).toBe(2000);

        // The user re-joins by hand while the ladder is at rung three.
        closeSyncPlayConnection();
        openSyncPlayConnection(ROOM);
        expect(closeAndMeasure()).toBe(1000);
    });

    it('switching to a DIFFERENT room restarts the delays at the base', () => {
        openSyncPlayConnection(ROOM);
        expect(closeAndMeasure()).toBe(1000);
        expect(closeAndMeasure()).toBe(2000);

        // `syncPlayWs` is live again at this point (the rung-two reconnect built
        // it), so this takes the different-room branch.
        openSyncPlayConnection('sp_elsewhere');
        expect(closeAndMeasure()).toBe(1000);
    });
});

describe('room switch — a stale socket close is inert (audit #3)', () => {
    it('detach-before-close plus the target guard leave the new socket and ladder untouched', () => {
        openSyncPlayConnection(ROOM);
        const old = socket();
        // Capture the shared close handler BEFORE the switch detaches it, to
        // simulate the old socket's close event still landing afterwards.
        const lateClose = old.onclose as unknown as (e: { target: unknown }) => void;
        expect(typeof old.onclose).toBe('function');

        openSyncPlayConnection('sp_second');
        // The switch must have detached the old handlers BEFORE closing it…
        expect(old.onclose).toBeNull();
        expect(old.onmessage).toBeNull();
        expect(old.closeCalls).toBe(1);

        // …and even a close still queued from the old socket must be dropped by
        // the `event.target !== syncPlayWs` guard: no nulling of the live
        // socket, no onDisconnect, no SECOND reconnect ladder.
        const before = FakeWebSocket.instances.length; // 2
        lateClose({ target: old });
        vi.advanceTimersByTime(40_000);
        expect(FakeWebSocket.instances.length).toBe(before);

        // The live socket still behaves: its OWN close arms rung one as usual.
        socket().onclose?.();
        expect(closeAndMeasure()).toBe(1000);
    });

    it('a no-arg close (synthetic teardown) still reconnects — the guard only fires with an event', () => {
        openSyncPlayConnection(ROOM);
        expect(closeAndMeasure()).toBe(1000);
    });
});

// ── CU-077 (review ui__crossfe #2) — the park, the wake, and the retry ─────
//
// The old give-up branch nulled `syncPlayRoomId` and stopped: a ~31 s outage
// permanently orphaned the member, and only a manual leave-and-rejoin could
// rebuild the realtime half of a live-looking watch-party. The cure keeps the
// room, makes exhaustion store-visible, and re-dials from a FRESH budget on
// `online`, on wake-to-visible, and on the host's Reconnect door. Same
// end-to-end measurement discipline as S283: the observable is socket
// construction, never a spy on internal state.

describe('CU-077 — the ladder parks instead of dying', () => {
    afterEach(() => setSyncPlayReconnectListener(null));

    /** Open, climb the full ladder into the parked state; records transitions. */
    function climbToPark(): boolean[] {
        const states: boolean[] = [];
        setSyncPlayReconnectListener((exhausted) => states.push(exhausted));
        openSyncPlayConnection(ROOM);
        for (let i = 0; i < 6; i++) closeAndMeasure();
        return states;
    }

    it('give-up parks: getter true, listener told ONCE, stray closes stay inert', () => {
        const states = climbToPark();
        expect(states).toEqual([true]);
        expect(isSyncPlayReconnectExhausted()).toBe(true);
        const before = FakeWebSocket.instances.length;
        socket().onclose?.(); // synthetic late close from the last dead socket
        vi.advanceTimersByTime(120_000);
        expect(FakeWebSocket.instances.length).toBe(before); // parked ⇒ schedules nothing
    });

    it('an `online` wake re-dials the remembered room with a FRESH budget', () => {
        climbToPark();
        const before = FakeWebSocket.instances.length;
        window.dispatchEvent(new Event('online'));
        expect(FakeWebSocket.instances.length).toBe(before + 1);
        // Fresh budget: the next drop starts again at rung one, not past the cap.
        expect(closeAndMeasure()).toBe(1000);
    });

    it('wake fires only on VISIBLE and only when PARKED — never racing the live ladder', () => {
        const vis = (v: string) =>
            Object.defineProperty(document, 'visibilityState', { value: v, configurable: true });
        try {
            vis('visible');
            openSyncPlayConnection(ROOM);
            const midLadder = FakeWebSocket.instances.length;
            document.dispatchEvent(new Event('visibilitychange')); // not parked ⇒ inert
            expect(FakeWebSocket.instances.length).toBe(midLadder);
            expect(closeAndMeasure()).toBe(1000);
            for (let i = 0; i < 5; i++) closeAndMeasure(); // finish the ladder ⇒ parked
            const parked = FakeWebSocket.instances.length;
            vis('hidden');
            document.dispatchEvent(new Event('visibilitychange')); // hidden ⇒ still parked
            expect(FakeWebSocket.instances.length).toBe(parked);
            vis('visible');
            document.dispatchEvent(new Event('visibilitychange')); // the tab returns ⇒ re-dial
            expect(FakeWebSocket.instances.length).toBe(parked + 1);
        } finally {
            vis('prerender'); // leave the jsdom default intact for later files
        }
    });

    it('retrySyncPlayConnection is the host door: inert un-parked, re-dials parked', () => {
        openSyncPlayConnection(ROOM);
        expect(retrySyncPlayConnection()).toBe(false); // nothing parked — no second dial
        expect(closeAndMeasure()).toBe(1000);
        for (let i = 0; i < 5; i++) closeAndMeasure(); // climb to the cap ⇒ parked
        expect(isSyncPlayReconnectExhausted()).toBe(true);
        const before = FakeWebSocket.instances.length;
        expect(retrySyncPlayConnection()).toBe(true);
        expect(FakeWebSocket.instances.length).toBe(before + 1);
        expect(isSyncPlayReconnectExhausted()).toBe(false); // park dissolved by the retry
    });

    it('the wake re-dial re-joins with the HELD gate digest (M-UI-14 continuity)', () => {
        openSyncPlayConnection(ROOM, undefined, 'me', 'Me', 'deadbeef-hash');
        for (let i = 0; i < 6; i++) closeAndMeasure();
        const before = FakeWebSocket.instances.length;
        window.dispatchEvent(new Event('online'));
        expect(FakeWebSocket.instances.length).toBe(before + 1);
        socket().onopen?.();
        const join = socket()
            .sent.map((s) => JSON.parse(s) as Record<string, unknown>)
            .find((m) => String(m.type ?? '').includes('group_join'));
        expect(join, 'the wake retry must still carry the GROUP_JOIN').toBeDefined();
        expect(join!.password_hash).toBe('deadbeef-hash'); // NOT demoted to a locked-out stranger
    });

    it('an explicit close dissolves the park: listener told false, wake has nothing to retry', () => {
        const states = climbToPark();
        closeSyncPlayConnection();
        expect(states).toEqual([true, false]);
        expect(isSyncPlayReconnectExhausted()).toBe(false);
        const before = FakeWebSocket.instances.length;
        window.dispatchEvent(new Event('online'));
        expect(FakeWebSocket.instances.length).toBe(before); // left room ⇒ no re-dial, ever
    });
});
