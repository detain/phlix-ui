/**
 * S290 — the SyncPlay return leg: an inbound play/pause RE-ANCHORS the drift clock.
 *
 * S287 gave this client a 5 s position report for one reason: to obtain a fresh
 * anchor from the group. `SyncPlayManager::handlePlaybackSync()` answers each
 * report with a group-wide `syncplay_playback_sync` broadcast carrying the
 * group's AUTHORITATIVE position, `api/syncplay.ts`'s `onPlaybackSync` maps that
 * onto `{type: is_playing ? 'play' : 'pause', position}` — and
 * `onRemoteStateUpdate()`'s `play`/`pause` arms set only `state`. The answer
 * arrived every 5 s and was thrown away.
 *
 * ⚠ **Why this file measures DRIFT and not `playbackPosition`.** Asserting that
 * the arms read `command.position` proves only that a field was copied; a fix
 * that stored the position and left `_lastDriftCaptureMs` alone would pass such
 * an assertion while leaving `driftAmount` extrapolating over the whole
 * elapsed-since-join window — which is the defect S287 filed this step to close.
 * So every claim here is a drift value read BEFORE and AFTER an inbound frame.
 *
 * ⚠ **The falsifiability lever** (S287's technique): `_lastDriftCaptureMs`
 * starts at 0, so an unanchored `driftAmount` extrapolates from the unix epoch
 * and lands in the BILLIONS of seconds. A correct anchor lands within a
 * microsecond of 0. The two are not confusable, and each `toBeCloseTo(0)` below
 * sits beside a control in which the same expression is asserted to be a
 * billion-second number or a specific non-zero one — so a harness that has come
 * loose and measures nothing cannot read as a pass.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSyncPlayStore } from './useSyncPlayStore';
import { closeSyncPlayConnection } from '../api/syncplay';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../api/test/syncplayServer';
import type { SyncPlaySession, SyncPlayPlaybackCommand } from '../types/syncplay';

const BASE = 'https://media.example.com';
const GROUP_ID = 'sp_abc123';

/** A fixed wall clock, chosen so `T0 / 1000` is a round 1.786e9 seconds. */
const T0 = 1_786_000_000_000;

// ── seams (same shape as useSyncPlayStore.position.test.ts) ───────────────────

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

// ── fixtures ─────────────────────────────────────────────────────────────────

function makeSession(over: Partial<SyncPlaySession> = {}): SyncPlaySession {
    return {
        id: GROUP_ID,
        roomId: GROUP_ID,
        serverId: '',
        createdBy: 'm1',
        createdAt: '2026-01-01T00:00:00Z',
        state: 'playing',
        currentMediaId: null,
        playbackPosition: 0,
        playbackRate: 1,
        serverTime: 0,
        lastSync: '2026-01-01T00:00:00Z',
        activeUsers: [],
        roles: {},
        permissions: {},
        ...over,
    };
}

const cmd = (over: Partial<SyncPlayPlaybackCommand>): SyncPlayPlaybackCommand => ({
    type: 'play',
    issuedBy: 'm1',
    issuedAt: '2026-01-01T00:00:00Z',
    ...over,
});

/**
 * Join the group and let the server confirm it over the socket.
 *
 * The `syncplay_group_state` frame is load-bearing for the same reason it is in
 * `useSyncPlayStore.position.test.ts`: `SyncPlayClient.reportPosition()` is
 * guarded on `this.group !== null` and only `handleGroupState()` sets that.
 */
async function joinedAndConfirmed(): Promise<ReturnType<typeof useSyncPlayStore>> {
    const store = useSyncPlayStore();
    await store.joinRoom(BASE, GROUP_ID);
    socket().onopen?.();
    socket().deliver({
        type: 'syncplay_group_state',
        group: {
            group_id: GROUP_ID,
            group_name: 'Movie Night',
            members: [{ id: 'm1', name: 'Alice', joined_at: 1_700_000_000 }],
            member_count: 2,
            host_id: 'm1',
            playback_position: 123,
            playback_state: 'playing',
        },
    });
    // `sent` is deliberately NOT cleared: `sent[0]` is the `syncplay_group_join`
    // frame, and it is the only honest source of this tab's own member id (minted
    // inside `api/syncplay.ts` from `Date.now()` + `Math.random()`).
    return store;
}

/** This tab's member id, read off the join frame it emitted. */
function ownMemberId(): string {
    const joinFrame = JSON.parse(socket().sent[0] ?? '{}') as Record<string, unknown>;
    const id = joinFrame['member_id'];
    expect(joinFrame['type'], 'sent[0] is not the group-join frame').toBe('syncplay_group_join');
    expect(typeof id).toBe('string');
    return id as string;
}

/**
 * The exact frame `SyncPlayManager::handlePlaybackSync()` broadcasts
 * (`src/Session/SyncPlay/SyncPlayManager.php:1014`).
 *
 * ⚠ `member_id` is the HOST's id, not the reporting member's — the server stamps
 * `$group->getHostId()`. Under lib v0.1.2 this also decided whether the frame
 * was delivered at all: `handlePlaybackSync()` dropped any frame whose
 * `member_id` equalled its own. S294 (lib v0.1.4) removed exactly that drop —
 * a `playback_sync` echoed to the sender IS the host's only re-anchor source in
 * a one-member room — so the stamp no longer gates delivery. The fixture keeps
 * the host id because it mirrors the real emitter, and the own-id case is
 * pinned honestly in its own test below.
 */
function playbackSyncFrame(position: number, isPlaying = true): Record<string, unknown> {
    return {
        type: 'syncplay_playback_sync',
        member_id: 'm1',
        group_id: GROUP_ID,
        current_media_id: 'media-1',
        position,
        is_playing: isPlaying,
        server_time: Math.floor(T0 / 1000),
    };
}

beforeEach(() => {
    setActivePinia(createPinia());
    server = makeSyncPlayServer(BASE);
    FakeWebSocket.instances = [];
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.useFakeTimers();
    vi.setSystemTime(T0);
});

afterEach(() => {
    closeSyncPlayConnection();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

// ── the measurement, at unit level ───────────────────────────────────────────

describe('S290 — an inbound play/pause re-anchors the drift clock', () => {
    it('play: drift goes from a BILLION seconds to zero across one command', () => {
        const store = useSyncPlayStore();
        // Never joined, so `_lastDriftCaptureMs` is still its initial 0 and the
        // extrapolation runs from the unix epoch.
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 0, playbackRate: 1 });
        store.updateLocalPosition(500);

        // BEFORE — exact, not merely "large": 500 − (0 + 1.786e9 × 1).
        const before = store.driftAmount;
        expect(before).toBeCloseTo(500 - T0 / 1000, 3);
        expect(before).toBeLessThan(-1e9);

        store.onRemoteStateUpdate(cmd({ type: 'play', position: 500 }));

        // AFTER — the group says 500 at this instant; three seconds later a local
        // player tracking it is at 503, so the drift is zero.
        vi.setSystemTime(T0 + 3000);
        store.updateLocalPosition(503);
        // A fix that stored the position but skipped the re-anchor reads
        // 503 − (500 + 1.786e9) here; one that re-anchored without reading the
        // position reads 503 − (0 + 3) = 500. Neither is close to 0.
        expect(store.driftAmount).toBeCloseTo(0, 6);
    });

    it('pause: same, measured after resuming so the 0 is not the paused-by-definition 0', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 0, playbackRate: 1 });
        store.updateLocalPosition(500);
        expect(store.driftAmount).toBeLessThan(-1e9);

        store.onRemoteStateUpdate(cmd({ type: 'pause', position: 500 }));
        expect(store.currentSession!.state).toBe('paused');

        // ⚠ `driftAmount` returns a hard 0 while paused, so reading it HERE would
        // be vacuous — see the control below, where an unanchored paused session
        // reads 0 as well. Resume by writing `state` directly: that is the one
        // path into `playing` that does NOT run any of the store's own anchoring
        // code, so what is measured afterwards is the anchor the PAUSE arm left.
        vi.setSystemTime(T0 + 3000);
        store.updateLocalPosition(503);
        store.currentSession = { ...store.currentSession!, state: 'playing' };
        expect(store.driftAmount).toBeCloseTo(0, 6);
    });

    it('a broadcast position of 0 re-anchors too — the guard is `!== undefined`', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 400, playbackRate: 1 });
        store.updateLocalPosition(0);
        expect(store.driftAmount).toBeLessThan(-1e9);

        // A group restarted at the head of a title broadcasts position 0. An
        // `if (command.position)` guard would skip both the store and the anchor.
        store.onRemoteStateUpdate(cmd({ type: 'play', position: 0 }));
        vi.setSystemTime(T0 + 3000);
        store.updateLocalPosition(3);
        expect(store.driftAmount).toBeCloseTo(0, 6);
    });
});

// ── controls: the same expression, asserted to a KNOWN-WRONG value ───────────
//
// Each of these runs the identical measurement on the identical harness and
// asserts a value that is NOT zero. Together they rule out the two ways a drift
// assertion can be a fake pass: a `driftAmount` that is hardwired to 0, and a
// delivery seam that has come loose so nothing at all was measured.

describe('S290 CONTROL — the drift assertion can fail', () => {
    it('a play command with NO position does NOT re-anchor: drift stays in the billions', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 0, playbackRate: 1 });
        store.updateLocalPosition(500);
        expect(store.driftAmount).toBeLessThan(-1e9);

        // Byte-for-byte the subject test above, minus `position`. If
        // `toBeCloseTo(0, 6)` there were a value this harness produces
        // regardless, it would produce it here too.
        store.onRemoteStateUpdate(cmd({ type: 'play' }));
        vi.setSystemTime(T0 + 3000);
        store.updateLocalPosition(503);
        expect(store.driftAmount).toBeLessThan(-1e9);
        expect(store.currentSession!.state).toBe('playing'); // the arm DID run
    });

    it('a re-anchored client that is genuinely 7 s ahead measures 7, not 0', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 0, playbackRate: 1 });

        store.onRemoteStateUpdate(cmd({ type: 'play', position: 500 }));
        vi.setSystemTime(T0 + 3000);
        // The group is at 503; this player has run ahead to 510.
        store.updateLocalPosition(510);
        // `driftAmount` is not clamped, not rounded and not zeroed by the
        // re-anchor — it reports the real offset.
        expect(store.driftAmount).toBeCloseTo(7, 6);
    });

    it('a PAUSED session reads drift 0 even with the anchor never set — why the resume above is load-bearing', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'paused', playbackPosition: 0, playbackRate: 1 });
        store.updateLocalPosition(500);
        // Unanchored, 1.786e9 s of notional elapse, and still exactly 0. A pause
        // test that measured here would pass against the unfixed store.
        expect(store.driftAmount).toBe(0);
    });
});

// ── the return leg, end to end over the real socket ──────────────────────────

describe('S290 — the return leg, end to end', () => {
    /**
     * The whole S287 loop: join, play for ten minutes while the group's own
     * position diverges from our extrapolation, then receive the broadcast the
     * report was sent to elicit.
     *
     * Divergence is what makes a stale anchor observable at all: while nothing
     * unexpected happens, extrapolating from an old anchor gives the right
     * answer. Here the group stalled (host buffering, a pause, a seek back) and
     * is at 300 after 600 s of wall clock, while our extrapolation still claims
     * 123 + 600 = 723.
     */
    it('an inbound playback_sync collapses a 423 s drift to zero', async () => {
        const store = await joinedAndConfirmed();

        // Guards: with `playbackRate` 0 the elapsed term vanishes and every drift
        // assertion below would be vacuously satisfiable.
        expect(store.currentSession!.playbackRate).toBe(1);
        expect(store.currentSession!.playbackPosition).toBe(123);
        expect(store.currentSession!.state).toBe('playing');

        // Ten minutes. `joinRoom()` anchored at T0 and nothing since has moved it.
        vi.advanceTimersByTime(600_000);
        store.updateLocalPosition(300);
        expect(store.driftAmount).toBeCloseTo(300 - (123 + 600), 6); // −423

        // The frame S287's report elicits, straight down the real chain: socket →
        // handleWsMessage → SyncPlayClient.handlePlaybackSync → onPlaybackSync →
        // the store's own callback. Nothing between the bytes and the assertion
        // is a mock.
        socket().deliver(playbackSyncFrame(300, true));

        // ⚠ Read IMMEDIATELY, with no clock advance. S287's M9 survived because
        // every assertion sat after an `advanceTimersByTime` that had already
        // erased the difference between mutant and fix; this is the moment the
        // anchor either lands or does not.
        expect(store.currentSession!.playbackPosition).toBe(300);
        expect(store.driftAmount).toBeCloseTo(0, 6);

        // And the ANCHOR specifically, not just the position: four more seconds of
        // playback tracked exactly. With the position stored but the anchor left
        // at T0 this reads 304 − (300 + 604) = −600.
        vi.advanceTimersByTime(4000);
        store.updateLocalPosition(304);
        expect(store.driftAmount).toBeCloseTo(0, 6);
    });

    it('CONTROL — with NO inbound frame the same store stays 423 s adrift', async () => {
        const store = await joinedAndConfirmed();

        vi.advanceTimersByTime(600_000);
        store.updateLocalPosition(300);
        expect(store.driftAmount).toBeCloseTo(-423, 6);

        // Identical to the subject test except that the frame is never delivered.
        // The `toBeCloseTo(0, 6)` above is therefore caused by the broadcast and
        // not by the passage of time, the timer ticks, or the join itself.
        vi.advanceTimersByTime(4000);
        store.updateLocalPosition(304);
        expect(store.driftAmount).toBeCloseTo(-423, 6);
        expect(store.currentSession!.playbackPosition).toBe(123);
    });

    it("CONTROL — the frame's TYPE is the seam S294 left: own-stamped playback_sync LANDS, own-stamped play COMMAND still drops", async () => {
        // S418 pin update (lib v0.1.2 → v0.1.4). This control was written against
        // `handlePlaybackSync()`'s own-id early-return: flipping `member_id` to
        // this tab's own id made the same frame deliver nothing, proving the
        // subject test's anchor was caused by the frame. S294 deliberately
        // REMOVED that drop for `playback_sync` — the echo back to the sender is
        // the authoritative state report the host itself needs (one-member room)
        // — so `member_id` is no longer the falsifiable field on a state report.
        // The distinction S294 keeps lives in the frame TYPE, and the control
        // moved to that axis: the same own id still cannot round-trip a COMMAND.
        const store = await joinedAndConfirmed();
        vi.advanceTimersByTime(600_000);
        store.updateLocalPosition(300);
        expect(store.driftAmount).toBeCloseTo(-423, 6);

        const ownId = ownMemberId();
        expect(ownId).not.toBe('m1');

        // Half one (S294): own-stamped playback_sync is CONSUMED — position
        // adopts 300 and the drift clock re-anchors, exactly like the host-stamped
        // frame in the subject test.
        socket().deliver({ ...playbackSyncFrame(300, true), member_id: ownId });
        expect(store.currentSession!.playbackPosition).toBe(300);
        expect(store.driftAmount).toBeCloseTo(0, 6);

        // Half two (the drop that remains): an own-stamped PLAY COMMAND echo
        // must not move the store — position stays at the value the sync frame
        // just landed, not the command's 777.
        socket().deliver({ type: 'syncplay_playback_play', member_id: ownId, position: 777 });
        expect(store.currentSession!.playbackPosition).toBe(300);

        // And the seam stays live in the other direction: a REMOTE play command
        // does land, so the assertion above measured a drop, not a dead path.
        socket().deliver({ type: 'syncplay_playback_play', member_id: 'someone-else', position: 777 });
        expect(store.currentSession!.playbackPosition).toBe(777);
    });

    it('a paused broadcast re-anchors as well — the return leg is not play-only', async () => {
        const store = await joinedAndConfirmed();

        vi.advanceTimersByTime(600_000);
        store.updateLocalPosition(300);
        expect(store.driftAmount).toBeCloseTo(-423, 6);

        // `is_playing: false` maps to a `pause` command.
        socket().deliver(playbackSyncFrame(300, false));
        expect(store.currentSession!.state).toBe('paused');
        expect(store.currentSession!.playbackPosition).toBe(300);

        // Measured after resuming, for the reason given in the unit test above:
        // a paused `driftAmount` is 0 regardless of the anchor.
        vi.advanceTimersByTime(4000);
        store.updateLocalPosition(304);
        store.currentSession = { ...store.currentSession!, state: 'playing' };
        expect(store.driftAmount).toBeCloseTo(0, 6);
    });
});
