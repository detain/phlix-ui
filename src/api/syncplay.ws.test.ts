/**
 * S264 — the WebSocket half of `src/api/syncplay.ts`.
 *
 * The REST half is proved in `syncplay.routes.test.ts` against the S276 fake
 * server. Everything from `getWsToken()` down was the remaining hole: 13 of the
 * module's 39 functions had never been entered, including the whole reconnect
 * ladder and every `SyncPlayClient` callback.
 *
 * These tests drive the REAL `@phlix/syncplay` `SyncPlayClient` — no
 * `vi.mock('@phlix/syncplay')` — so an inbound frame really is decoded and
 * dispatched by the shipped protocol implementation. Only the socket itself is
 * faked, because jsdom would otherwise dial `:8097` for real.
 *
 * ⚠ This module holds its connection in MODULE-LEVEL singletons
 * (`syncPlayWs`, `syncPlayRoomId`, `syncPlayReconnectAttempts`,
 * `syncPlayClient`, `messageHandler`, `syncPlayMemberId`, `syncPlayMemberName`).
 * They survive between tests in the same file, so every test tears down with
 * `closeSyncPlayConnection()` and re-establishes what it needs. A test that
 * relies on leftover state from its predecessor is order-dependent and will lie
 * under `--sequence.shuffle`.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    openSyncPlayConnection,
    closeSyncPlayConnection,
    sendSyncPlayStateUpdate,
    sendSyncPlayCommand,
} from './syncplay';
import { ACCESS_TOKEN_KEY } from './tokenStore';
import type { SyncPlayStateUpdate } from '../types/syncplay';

const ROOM = 'sp_abc123';

// ── the fake socket ───────────────────────────────────────────────────────────

/**
 * A WebSocket that connects to nothing but records everything, and lets a test
 * fire `onopen` / `onmessage` / `onclose` / `onerror` deliberately. jsdom's own
 * WebSocket would attempt a real TCP connection to `:8097`.
 */
class FakeWebSocket {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;

    /** Every socket ever constructed in the current test. */
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

    /** Deliver one server frame as the module's `onmessage` would see it. */
    deliver(payload: unknown): void {
        this.onmessage?.({ data: JSON.stringify(payload) } as MessageEvent);
    }

    /** Deliver a raw (possibly malformed) body. */
    deliverRaw(data: string): void {
        this.onmessage?.({ data } as MessageEvent);
    }
}

/** The most recently constructed socket. */
function socket(): FakeWebSocket {
    const s = FakeWebSocket.instances.at(-1);
    if (!s) throw new Error('no socket was constructed');
    return s;
}

/** Parsed frames the client pushed through the transport sink. */
function sentTypes(s: FakeWebSocket): string[] {
    return s.sent.map((raw) => (JSON.parse(raw) as { type: string }).type);
}

let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
    FakeWebSocket.instances = [];
    globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;
    localStorage.clear();
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    // Reset the module-level singletons so the next test starts disconnected.
    closeSyncPlayConnection();
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.clear();
});

// ── url construction ──────────────────────────────────────────────────────────

describe('openSyncPlayConnection — the WebSocket url', () => {
    it('dials :8097 with the room and the stored access token', () => {
        localStorage.setItem(ACCESS_TOKEN_KEY, 'tok+1/2');
        openSyncPlayConnection(ROOM);

        const url = new URL(socket().url);
        expect(url.port).toBe('8097');
        expect(url.hostname).toBe(window.location.hostname);
        // Both values are percent-encoded, so a token with `+` and `/` survives
        // intact rather than becoming a space and a path separator.
        expect(url.searchParams.get('token')).toBe('tok+1/2');
        expect(url.searchParams.get('room')).toBe(ROOM);
    });

    it('sends an EMPTY token when none is stored — not the literal "null"', () => {
        openSyncPlayConnection(ROOM);
        const url = new URL(socket().url);
        expect(url.searchParams.get('token')).toBe('');
        expect(socket().url).not.toContain('token=null');
    });

    it('encodes a room id containing url-significant characters', () => {
        openSyncPlayConnection('a b&c=d');
        const url = new URL(socket().url);
        expect(url.searchParams.get('room')).toBe('a b&c=d');
    });

    it('uses ws: on an http page (the jsdom default origin)', () => {
        openSyncPlayConnection(ROOM);
        expect(window.location.protocol).toBe('http:');
        expect(socket().url.startsWith('ws://')).toBe(true);
    });

    it('falls back to an empty token when the token store throws', () => {
        // `getWsToken()` wraps the read in try/catch precisely because a
        // Storage access can throw (Safari private mode, disabled cookies).
        const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('SecurityError: storage disabled');
        });
        openSyncPlayConnection(ROOM);
        expect(getItem).toHaveBeenCalled();
        expect(new URL(socket().url).searchParams.get('token')).toBe('');
    });
});

// ── connection lifecycle ──────────────────────────────────────────────────────

describe('openSyncPlayConnection — lifecycle', () => {
    it('is idempotent for the SAME room — one socket, not two', () => {
        openSyncPlayConnection(ROOM);
        openSyncPlayConnection(ROOM);
        expect(FakeWebSocket.instances).toHaveLength(1);
    });

    it('closes the old socket and opens a new one for a DIFFERENT room', () => {
        openSyncPlayConnection(ROOM);
        const first = socket();
        openSyncPlayConnection('sp_other');

        expect(first.closeCalls).toBe(1);
        expect(FakeWebSocket.instances).toHaveLength(2);
        expect(new URL(socket().url).searchParams.get('room')).toBe('sp_other');
    });

    it('joins the group over the socket once it opens', () => {
        openSyncPlayConnection(ROOM);
        expect(sentTypes(socket())).toEqual([]); // nothing before onopen

        socket().onopen?.();
        expect(sentTypes(socket())).toEqual(['syncplay_group_join']);
        const frame = JSON.parse(socket().sent[0]!) as { group_id: string; member_id: string };
        expect(frame.group_id).toBe(ROOM);
        expect(frame.member_id).toBeTruthy();
    });

    it('uses the supplied member id and name on the join frame', () => {
        openSyncPlayConnection(ROOM, undefined, 'member-7', 'Alice');
        socket().onopen?.();
        const frame = JSON.parse(socket().sent[0]!) as { member_id: string; member_name?: string };
        expect(frame.member_id).toBe('member-7');
        expect(frame.member_name).toBe('Alice');
    });

    it('generates a member id when none is supplied', async () => {
        // A FRESH module instance is required: `syncPlayMemberId` /
        // `syncPlayMemberName` are module-level and are NOT cleared by
        // `closeSyncPlayConnection()`, so in a long-lived module they persist
        // from whichever call last supplied them. Testing generation against the
        // shared instance would silently assert the previous test's id.
        vi.resetModules();
        const fresh = await import('./syncplay');
        fresh.openSyncPlayConnection(ROOM);
        socket().onopen?.();
        const frame = JSON.parse(socket().sent[0]!) as { member_id: string; member_name?: string };
        expect(frame.member_id).toMatch(/^member_\d+_[a-z0-9]+$/);
        expect(frame.member_name).toBe('Anonymous');
        fresh.closeSyncPlayConnection();
    });

    it('REUSES the remembered member id on a later call that omits one', () => {
        openSyncPlayConnection(ROOM, undefined, 'sticky-id', 'Sticky');
        socket().onopen?.();
        closeSyncPlayConnection();

        openSyncPlayConnection('sp_other');
        socket().onopen?.();
        const frame = JSON.parse(socket().sent[0]!) as { member_id: string; member_name?: string };
        // `closeSyncPlayConnection()` clears the socket, the room and the client
        // but deliberately not the identity, so the same browser tab keeps one
        // member id across rooms.
        expect(frame.member_id).toBe('sticky-id');
        expect(frame.member_name).toBe('Sticky');
    });

    it('drops frames written while the socket is not OPEN', () => {
        openSyncPlayConnection(ROOM, undefined, 'm1');
        socket().readyState = FakeWebSocket.CONNECTING;
        socket().onopen?.(); // joinGroup runs, but the sink must refuse to write
        expect(socket().sent).toEqual([]);
    });

    it('closeSyncPlayConnection closes the socket and forgets the room', () => {
        openSyncPlayConnection(ROOM);
        const s = socket();
        closeSyncPlayConnection();

        expect(s.closeCalls).toBe(1);
        // A fresh open for the SAME room must now build a NEW socket — if the
        // room id had survived the close, this would be a no-op.
        openSyncPlayConnection(ROOM);
        expect(FakeWebSocket.instances).toHaveLength(2);
    });

    it('closeSyncPlayConnection is safe when nothing is connected', () => {
        expect(() => closeSyncPlayConnection()).not.toThrow();
        expect(FakeWebSocket.instances).toHaveLength(0);
    });

    it('reports a socket error without throwing', () => {
        openSyncPlayConnection(ROOM);
        socket().onerror?.(new Error('boom'));
        expect(errorSpy).toHaveBeenCalledWith('[SyncPlay] WebSocket error', expect.anything());
    });
});

// ── inbound frames → the consumer's message handler ───────────────────────────

describe('handleWsMessage — real protocol decoding', () => {
    /** Open a connection with a recording handler and fire `onopen`. */
    function connect(): { messages: Array<{ type: string; position?: number; roomId?: string }> } {
        const messages: Array<{ type: string; position?: number; roomId?: string }> = [];
        openSyncPlayConnection(ROOM, (m) => messages.push(m), 'me', 'Me');
        socket().onopen?.();
        return { messages };
    }

    it('surfaces a remote play command with its position and room', () => {
        const { messages } = connect();
        socket().deliver({
            type: 'syncplay_playback_play',
            member_id: 'someone-else',
            position: 42,
            server_time: 1_700_000_000_000,
        });
        expect(messages).toEqual([{ type: 'play', position: 42, roomId: ROOM }]);
    });

    it('surfaces a remote pause command', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_pause', member_id: 'someone-else', position: 7 });
        expect(messages).toEqual([{ type: 'pause', position: 7, roomId: ROOM }]);
    });

    it('surfaces a remote seek, reading `to_position`', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_seek', member_id: 'someone-else', from_position: 1, to_position: 99 });
        expect(messages).toEqual([{ type: 'seek', position: 99, roomId: ROOM }]);
    });

    it('IGNORES the echo of our own command (member_id === ours)', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_play', member_id: 'me', position: 42 });
        expect(messages).toEqual([]);
    });

    it('consumes our own echoed playback_sync (S294) while still dropping our own command echo', () => {
        // S294 (lib v0.1.4): `playback_sync` is a server-echoed STATE REPORT
        // re-broadcast to EVERY member (SyncPlayManager::handlePlaybackSync
        // excludes nobody) — the host's own frame coming back is its only
        // re-anchor source in a one-member room, so the self-echo is consumed.
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_sync', member_id: 'me', position: 88, is_playing: true });
        expect(messages).toEqual([{ type: 'play', position: 88, roomId: ROOM }]);
        // The distinction stays: a self-echoed COMMAND is still dropped (the
        // invariant pinned by the test above — repeated here so the two halves
        // of the S294 decision live in one readable pair).
        socket().deliver({ type: 'syncplay_playback_play', member_id: 'me', position: 99 });
        expect(messages).toEqual([{ type: 'play', position: 88, roomId: ROOM }]);
    });

    it('maps a playback_sync frame onto play/pause by `is_playing`', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_sync', member_id: 'peer', position: 12, is_playing: true });
        socket().deliver({ type: 'syncplay_playback_sync', member_id: 'peer', position: 34, is_playing: false });
        expect(messages).toEqual([
            { type: 'play', position: 12, roomId: ROOM },
            { type: 'pause', position: 34, roomId: ROOM },
        ]);
    });

    it('logs a server info frame', () => {
        connect();
        socket().deliver({ type: 'syncplay_info', message: 'Bob joined' });
        expect(logSpy).toHaveBeenCalledWith('[SyncPlay] Info: Bob joined');
    });

    it('logs a server error frame with its code', () => {
        connect();
        socket().deliver({ type: 'syncplay_error', error_code: 'GROUP_FULL', message: 'Group is full' });
        expect(errorSpy).toHaveBeenCalledWith('[SyncPlay] Error: GROUP_FULL - Group is full');
    });

    it('swallows malformed JSON instead of throwing out of the socket callback', () => {
        const { messages } = connect();
        expect(() => socket().deliverRaw('{not json')).not.toThrow();
        expect(messages).toEqual([]);
    });

    it('ignores an unknown frame type', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_not_a_real_type', position: 1 });
        expect(messages).toEqual([]);
    });

    it('drops inbound frames once the connection has been closed', () => {
        const { messages } = connect();
        const s = socket();
        closeSyncPlayConnection();
        // `syncPlayClient` is null now, so `handleWsMessage` returns immediately.
        expect(() => s.deliver({ type: 'syncplay_playback_play', member_id: 'peer', position: 5 })).not.toThrow();
        expect(messages).toEqual([]);
    });

    it('keeps delivering to the handler registered on the FIRST open', () => {
        const { messages } = connect();
        // Re-opening for the same room without a handler must not clear the one
        // already registered — `if (onMessage) messageHandler = onMessage`.
        openSyncPlayConnection(ROOM);
        socket().deliver({ type: 'syncplay_playback_play', member_id: 'peer', position: 3 });
        expect(messages).toEqual([{ type: 'play', position: 3, roomId: ROOM }]);
    });
});

// ── the reconnect ladder ──────────────────────────────────────────────────────

/**
 * 🛑 **DELIBERATELY NOT PINNED: the exponential ladder and the give-up cap.**
 *
 * `handleWsClose()` computes `RECONNECT_BASE_DELAY_MS * 2 ** attempts` and caps
 * at `MAX_RECONNECT_ATTEMPTS`, but its reconnect timer calls
 * `openSyncPlayConnection()`, whose line `syncPlayReconnectAttempts = 0` zeroes
 * the counter the delay is computed from. Measured over 8 consecutive closes the
 * observed delays are `[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]` — flat,
 * never doubling — and the cap is therefore unreachable, so the reconnect runs
 * at 1 Hz forever and the `giving up` branch is dead at runtime.
 *
 * Filed rather than pinned. Only assertions that hold under BOTH the current
 * behaviour and the intended exponential one appear below; a test asserting
 * "the 2nd reconnect waits 1000 ms" would make the defect permanent and make the
 * ladder read as verified, which is the failure mode this whole cluster exists
 * to avoid.
 */
describe('handleWsClose — reconnect (only what is true either way)', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    it('reconnects after the base delay on the FIRST unexpected close', () => {
        // 1000 ms is `BASE * 2**0` — the first rung is the same number whether or
        // not the ladder climbs, so this assertion survives the fix.
        openSyncPlayConnection(ROOM);
        socket().onclose?.();

        expect(FakeWebSocket.instances).toHaveLength(1); // not yet
        vi.advanceTimersByTime(999);
        expect(FakeWebSocket.instances).toHaveLength(1);
        vi.advanceTimersByTime(1);
        expect(FakeWebSocket.instances).toHaveLength(2);
    });

    it('re-joins the group over the reconnected socket', () => {
        openSyncPlayConnection(ROOM, undefined, 'm1', 'Me');
        socket().onclose?.();
        vi.advanceTimersByTime(1000);

        socket().onopen?.();
        const frame = JSON.parse(socket().sent[0]!) as { group_id: string; member_id: string };
        expect(frame.group_id).toBe(ROOM);
        // The identity survives the reconnect — a new random id would make the
        // server see a second member rather than the same one returning.
        expect(frame.member_id).toBe('m1');
    });

    it('does NOT reconnect after a deliberate closeSyncPlayConnection()', () => {
        openSyncPlayConnection(ROOM);
        const s = socket();
        closeSyncPlayConnection();
        s.onclose?.(); // a real socket still fires onclose after close()

        vi.advanceTimersByTime(60_000);
        expect(FakeWebSocket.instances).toHaveLength(1);
    });

    it('logs each reconnect attempt with the delay it will wait', () => {
        openSyncPlayConnection(ROOM);
        socket().onclose?.();
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('WebSocket closed, reconnecting in 1000ms'));
        vi.advanceTimersByTime(1000);
    });
});

// ── outbound: state updates and commands ──────────────────────────────────────

function stateUpdate(position: number, rate: number): SyncPlayStateUpdate {
    return {
        sessionId: 'sess-1',
        playbackPosition: position,
        playbackRate: rate,
        serverTime: 0,
        timestamp: '2026-01-01T00:00:00Z',
    };
}

/**
 * Open, handshake, and let the server confirm the group.
 *
 * The `syncplay_group_state` frame is NOT decoration: every outbound sender on
 * `SyncPlayClient` (`sendPlay`/`sendPause`/`sendSeek`/`reportPosition`) is
 * guarded by `this.group !== null`, which only `handleGroupState()` sets. A
 * "connected" fixture that skips it makes every send silently no-op, and an
 * assertion of the form `expect(sent).toEqual([])` would then pass for the wrong
 * reason.
 */
function connectedInGroup(): FakeWebSocket {
    openSyncPlayConnection(ROOM, undefined, 'm1', 'Me');
    socket().onopen?.();
    socket().deliver({
        type: 'syncplay_group_state',
        group: {
            group_id: ROOM,
            group_name: 'Movie Night',
            members: [{ id: 'm1', name: 'Me', joined_at: 1_700_000_000 }],
            member_count: 1,
            host_id: 'm1',
            playback_position: 0,
        },
    });
    socket().sent.length = 0;
    return socket();
}

describe('sendSyncPlayStateUpdate', () => {
    it('reports the position as PLAYING when the rate is positive', () => {
        const s = connectedInGroup();
        sendSyncPlayStateUpdate(stateUpdate(55, 1));

        expect(sentTypes(s)).toEqual(['syncplay_playback_sync']);
        const frame = JSON.parse(s.sent[0]!) as { position: number; is_playing: boolean };
        expect(frame.position).toBe(55);
        expect(frame.is_playing).toBe(true);
    });

    it('reports the position as PAUSED when the rate is 0', () => {
        const s = connectedInGroup();
        sendSyncPlayStateUpdate(stateUpdate(55, 0));

        const frame = JSON.parse(s.sent[0]!) as { is_playing: boolean };
        expect(frame.is_playing).toBe(false);
    });

    it('is a no-op when nothing is connected', () => {
        expect(() => sendSyncPlayStateUpdate(stateUpdate(1, 1))).not.toThrow();
        expect(FakeWebSocket.instances).toHaveLength(0);
    });

    it('is a no-op while the socket is not OPEN', () => {
        const s = connectedInGroup();
        s.readyState = FakeWebSocket.CONNECTING;

        sendSyncPlayStateUpdate(stateUpdate(55, 1));
        expect(s.sent).toEqual([]);
    });
});

describe('sendSyncPlayCommand', () => {
    const connected = connectedInGroup;

    const base = { issuedBy: 'm1', issuedAt: '2026-01-01T00:00:00Z' } as const;

    it('play → syncplay_playback_play at the given position', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'play', position: 10, ...base });
        expect(sentTypes(s)).toEqual(['syncplay_playback_play']);
        expect((JSON.parse(s.sent[0]!) as { position: number }).position).toBe(10);
    });

    it('play with no position defaults to 0', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'play', ...base });
        expect((JSON.parse(s.sent[0]!) as { position: number }).position).toBe(0);
    });

    it('pause → syncplay_playback_pause at the given position', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'pause', position: 20, ...base });
        expect(sentTypes(s)).toEqual(['syncplay_playback_pause']);
        expect((JSON.parse(s.sent[0]!) as { position: number }).position).toBe(20);
    });

    it('pause with no position defaults to 0', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'pause', ...base });
        expect((JSON.parse(s.sent[0]!) as { position: number }).position).toBe(0);
    });

    it('seek → syncplay_playback_seek with from=0 and the target', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'seek', position: 300, ...base });
        expect(sentTypes(s)).toEqual(['syncplay_playback_seek']);
        const frame = JSON.parse(s.sent[0]!) as { from_position: number; to_position: number };
        expect(frame.from_position).toBe(0);
        expect(frame.to_position).toBe(300);
    });

    it('seek with NO position sends nothing at all', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'seek', ...base });
        expect(s.sent).toEqual([]);
    });

    it('sync → a playback_sync position report marked playing', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'sync', position: 77, ...base });
        expect(sentTypes(s)).toEqual(['syncplay_playback_sync']);
        const frame = JSON.parse(s.sent[0]!) as { position: number; is_playing: boolean };
        expect(frame.position).toBe(77);
        expect(frame.is_playing).toBe(true);
    });

    it('sync with NO position sends nothing at all', () => {
        const s = connected();
        sendSyncPlayCommand({ type: 'sync', ...base });
        expect(s.sent).toEqual([]);
    });

    it('is a no-op when nothing is connected', () => {
        expect(() => sendSyncPlayCommand({ type: 'play', position: 1, ...base })).not.toThrow();
        expect(FakeWebSocket.instances).toHaveLength(0);
    });

    it('is a no-op while the socket is not OPEN', () => {
        const s = connected();
        s.readyState = FakeWebSocket.CLOSING;
        sendSyncPlayCommand({ type: 'play', position: 1, ...base });
        expect(s.sent).toEqual([]);
    });
});
