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
    getSyncPlayApi,
} from './syncplay';
import { ACCESS_TOKEN_KEY } from './tokenStore';
import type { SyncPlayStateUpdate } from '../types/syncplay';

const ROOM = 'sp_abc123';

// ── the fake socket ───────────────────────────────────────────────────────────

/**
 * RFC 6455 §1.9 `token` production — the alphabet WHATWG requires of every
 * `protocols` entry. The constructor (§3.1 step 9, verified against Chrome 153
 * and undici) throws `SyntaxError` when any entry is the empty string, a
 * duplicate, or contains a character outside this set (separators like `/`,
 * `=` and whitespace). The fake enforces the same law, so an illegal carrier
 * offer cannot dial silently here the way it explodes in a real browser.
 */
const WS_PROTOCOL_TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

/** Throw the DOMException-shaped `SyntaxError` the platform throws. */
function assertLegalProtocolOffer(protocols: string | string[] | undefined): void {
    if (protocols === undefined) return; // WebIDL: omitted argument, no offer.
    const values = typeof protocols === 'string' ? [protocols] : protocols;
    for (const value of values) {
        if (!WS_PROTOCOL_TOKEN.test(value)) {
            throw new DOMException(
                `FakeWebSocket: protocol entry ${JSON.stringify(value)} is not an RFC 6455 token ` +
                `(empty string or character outside tchar) — the platform throws SyntaxError here.`,
                'SyntaxError',
            );
        }
    }
    if (new Set(values).size !== values.length) {
        throw new DOMException('FakeWebSocket: duplicated protocol entry.', 'SyntaxError');
    }
}

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

    constructor(readonly url: string, readonly protocols?: string | string[]) {
        // Validate BEFORE recording: a refused construction leaves no instance
        // for `socket()` to find. That is the class-level shield — a regression
        // to the throwing `['bearer','']` offer turns every dial pin red (with
        // the module's try/catch in place the throw is otherwise swallowed into
        // the ladder and the test would silently see zero sockets).
        assertLegalProtocolOffer(protocols);
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
    if (!s) {
        throw new Error(
            'no socket was constructed — either the dial never opened one, or the ' +
            'protocols offer was illegal and FakeWebSocket\'s WHATWG shield refused ' +
            'it (the module then routes the failure to its reconnect ladder)',
        );
    }
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

// ── carrier law (shared prose for the two describes below) ───────────────────
//
// Estate policy WEBSOCKET_URL_QUERY_REFUSED, implemented by phlix-server
// 424c14d0 on :8097: the JWT rides the TWO-ENTRY bearer subprotocol
// `['bearer', <jwt>]` — never the query string. Same vocabulary as the hub
// relay (`hubRelay.ts:233`, tests pinned in `hubRelay.test.ts`). The server
// answers an offer with `Sec-WebSocket-Protocol: bearer` (marker only), which
// is what lets a browser socket offer subprotocols without failing 1006.
// Signed out there is NO offer at all — `undefined`, not `['bearer','']`,
// because the WHATWG constructor throws SyntaxError on an empty entry (§3.1
// step 9). Server consequence either way matches the legacy empty `?token=`:
// no offer → no echo → secret-configured rejects pre-101, dev anonymous dials
// through.

describe('WebSocket constructor refusal — routed into the reconnect ladder', () => {
    // Rework guard: pre-fix, the signed-out `['bearer','']` offer threw out of
    // the unguarded constructor — breaking the join for every signed-out user
    // and, when re-dialled from the ladder's setTimeout, killing the whole
    // reconnect chain with no onclose ever armed. Two halves pin that shut.
    beforeEach(() => {
        vi.useFakeTimers();
    });

    it('the signed-out dial is CONSTRUCTABLE — zero throw, single socket, no ladder churn', () => {
        localStorage.clear();
        expect(() => openSyncPlayConnection(ROOM)).not.toThrow();
        expect(FakeWebSocket.instances).toHaveLength(1);
        expect(socket().protocols).toBeUndefined();
        expect(errorSpy).not.toHaveBeenCalled();
        // The dial behaves like any other: onclose still arms the ladder.
        socket().onclose?.();
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('reconnecting in 1000ms'));
    });

    it('a corrupt token outside the RFC 6455 token production: ctor throws, catch arms the ladder', () => {
        // Space and `/` are RFC 2616 separators — a real browser rejects this
        // offer synchronously, before any socket exists. The module must absorb
        // that and reconnect anyway, never let the throw escape the join call.
        localStorage.setItem(ACCESS_TOKEN_KEY, 'bad token/with separators');
        expect(() => openSyncPlayConnection(ROOM)).not.toThrow();
        expect(FakeWebSocket.instances).toHaveLength(0); // the shield refused the offer…
        expect(errorSpy).toHaveBeenCalledWith(
            '[SyncPlay] WebSocket constructor refused the handshake',
            expect.anything(),
        );
        // …and the refusal entered the same close-driven path: first rung armed.
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('reconnecting in 1000ms'));

        vi.advanceTimersByTime(1000);
        // The retry re-reads the same corrupt token and is refused again — the
        // SECOND escape from inside the timer callback (the pre-fix crash
        // vector) is caught too, arming the next rung instead of dying silent.
        expect(FakeWebSocket.instances).toHaveLength(0);
        expect(errorSpy).toHaveBeenCalledTimes(2);
    });

    it('refusal ladder gives up at the cap without leaking a throw', () => {
        localStorage.setItem(ACCESS_TOKEN_KEY, 'corrupt token');
        openSyncPlayConnection(ROOM);
        // 1 caller dial + MAX_RECONNECT_ATTEMPTS (5) ladder rungs all refuse;
        // the 6th entry into handleWsClose hits the cap and takes the give-up
        // branch (state cleared) instead of scheduling another rung.
        vi.advanceTimersByTime(60_000);
        expect(errorSpy).toHaveBeenCalledTimes(6);
        // Budget/room reset by the give-up branch: a further timer advance
        // must not produce more dials.
        const before = errorSpy.mock.calls.length;
        vi.advanceTimersByTime(120_000);
        expect(errorSpy).toHaveBeenCalledTimes(before);
    });

    it('duplicate protocol entries are illegal too (shield self-test, WHATWG §3.1 step 9)', () => {
        // Browsers throw a DOMException whose NAME is "SyntaxError" (it is not
        // an instanceof the SyntaxError class — the discriminator is `.name`),
        // so the shield matches that shape and the assertions check that shape.
        const nameOfThrow = (fn: () => unknown): string => {
            try {
                fn();
                return 'no-throw';
            } catch (e) {
                return (e as { name?: string })?.name ?? 'anonymous-throw';
            }
        };
        expect(nameOfThrow(() => new FakeWebSocket('ws://x', ['bearer', 'bearer']))).toBe('SyntaxError'); // duplicate
        expect(nameOfThrow(() => new FakeWebSocket('ws://x', ['bearer', '']))).toBe('SyntaxError'); // empty entry
        expect(nameOfThrow(() => new FakeWebSocket('ws://x', ['bearer', 'a b']))).toBe('SyntaxError'); // space (separator)
        expect(nameOfThrow(() => new FakeWebSocket('ws://x', ['bearer', 'a/b']))).toBe('SyntaxError'); // slash (separator)
        expect(nameOfThrow(() => new FakeWebSocket('ws://x', undefined))).toBe('no-throw'); // omitted ≡ absent offer
        expect(nameOfThrow(() => new FakeWebSocket('ws://x', ['bearer', 'jwt.abc-1_2']))).toBe('no-throw'); // real JWT shape
    });
});

describe('openSyncPlayConnection — the WebSocket url and bearer carrier', () => {
    it('dials :8097 with the room, token-free url, bearer-carried token', () => {
        // Fixture is a REAL-JWT-shaped token: base64url segments (`-`, `_`) and
        // dots — every character inside the RFC 6455 token production the
        // subprotocol requires. An earlier fixture used `/` and `+`, which no
        // JWT ever contains and which the WHATWG constructor throws on; the
        // shield at the top of this file now enforces that law for real.
        const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1MSJ9.sig-4_2xQr';
        localStorage.setItem(ACCESS_TOKEN_KEY, jwt);
        openSyncPlayConnection(ROOM);

        const url = new URL(socket().url);
        expect(url.port).toBe('8097');
        expect(url.hostname).toBe(window.location.hostname);
        // Credential-free URL: no `token` param anywhere (server log-hygiene
        // rationale — query carriers leak into access/proxy logs).
        expect(socket().url).not.toContain('token');
        expect(url.searchParams.get('token')).toBeNull();
        // `room` stays: NON-credential query param, kept for byte-compatible
        // dial shape; the room itself is negotiated by the GROUP_JOIN frame.
        expect(url.searchParams.get('room')).toBe(ROOM);
        // The JWT rides the subprotocol instead — raw, unencoded (it never
        // crosses url-encoding again; percent-encoding was a query-carrier need).
        expect(socket().protocols).toEqual(['bearer', jwt]);
    });

    it('carrier shape is TWO-ENTRY ["bearer", jwt] — never the dotted single entry', () => {
        localStorage.setItem(ACCESS_TOKEN_KEY, 'jwt.abc.def');
        openSyncPlayConnection(ROOM);
        expect(socket().protocols).toEqual(['bearer', 'jwt.abc.def']);
        expect(socket().protocols).toHaveLength(2);
        expect((socket().protocols as string[])[0]).toBe('bearer');
    });

    it('offers NO protocols argument at all when no credential is stored — never the throwing ["bearer",""]', () => {
        openSyncPlayConnection(ROOM);
        expect(socket().url).not.toContain('token=');
        // The signed-out dial must be CONSTRUCTABLE. WHATWG §3.1 step 9 throws
        // SyntaxError on an empty protocol entry — the old `['bearer','']`
        // offer never reached the wire in any browser. FakeWebSocket enforces
        // that, so simply reaching `socket()` proves the offer was legal; the
        // recorded value proves it was absent (WebIDL: `undefined` second arg
        // is identical to omitting the argument).
        expect(socket().protocols).toBeUndefined();
        // Kept pins: the absent credential never materialises as the literal
        // string "null", nor as the retired empty-entry shape.
        expect(socket().protocols).not.toEqual(['bearer', 'null']);
        expect(socket().protocols).not.toEqual(['bearer', '']);
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

    it('dials with NO protocols argument when the token store throws', () => {
        // `getWsToken()` wraps the read in try/catch precisely because a
        // Storage access can throw (Safari private mode, disabled cookies).
        const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('SecurityError: storage disabled');
        });
        openSyncPlayConnection(ROOM);
        expect(getItem).toHaveBeenCalled();
        expect(socket().url).not.toContain('token');
        // A failed read is the signed-out case: dial anonymous, offer nothing.
        expect(socket().protocols).toBeUndefined();
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
//
// S441 — these fixtures cross the protocol boundary: every frame is delivered in
// the WIRE unit (MILLISECONDS, SPEC.md:91) and every assertion expects the
// UI-internal unit (SECONDS) that reaches the store. The values are
// 1000×-sensitive both ways: dropping the boundary decode leaves the raw ms
// value in place (42 500 ≠ 42.5, red); doubling it yields 0.0425 (≠ 42.5, red).

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
            position: 42_500, // wire ms
            server_time: 1_700_000_000_000,
        });
        expect(messages).toEqual([{ type: 'play', position: 42.5, roomId: ROOM }]); // store seconds
    });

    it('surfaces a remote pause command', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_pause', member_id: 'someone-else', position: 7_000 });
        expect(messages).toEqual([{ type: 'pause', position: 7, roomId: ROOM }]);
    });

    it('surfaces a remote seek, reading `to_position`', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_seek', member_id: 'someone-else', from_position: 1_000, to_position: 99_000 });
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
        socket().deliver({ type: 'syncplay_playback_sync', member_id: 'me', position: 88_000, is_playing: true });
        expect(messages).toEqual([{ type: 'play', position: 88, roomId: ROOM }]);
        // The distinction stays: a self-echoed COMMAND is still dropped (the
        // invariant pinned by the test above — repeated here so the two halves
        // of the S294 decision live in one readable pair).
        socket().deliver({ type: 'syncplay_playback_play', member_id: 'me', position: 99_000 });
        expect(messages).toEqual([{ type: 'play', position: 88, roomId: ROOM }]);
    });

    it('maps a playback_sync frame onto play/pause by `is_playing`', () => {
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_sync', member_id: 'peer', position: 12_000, is_playing: true });
        socket().deliver({ type: 'syncplay_playback_sync', member_id: 'peer', position: 34_000, is_playing: false });
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
        socket().deliver({ type: 'syncplay_playback_play', member_id: 'peer', position: 3_000 });
        expect(messages).toEqual([{ type: 'play', position: 3, roomId: ROOM }]);
    });

    it('S441 — every inbound position decodes ms→s exactly once at this boundary (S441MSBOUNDARYX7J3)', () => {
        // The relay/syncplay wire speaks milliseconds; the store speaks seconds.
        // A frame missing the decode lands 1000× high; a double decode lands
        // 1000× low — this pins both red with 1_000×-sensitive values.
        const { messages } = connect();
        socket().deliver({ type: 'syncplay_playback_sync', member_id: 'peer', position: 42_500, is_playing: true });
        socket().deliver({ type: 'syncplay_playback_seek', member_id: 'peer', from_position: 42_500, to_position: 90_000 });
        expect(messages).toEqual([
            { type: 'play', position: 42.5, roomId: ROOM },
            { type: 'seek', position: 90, roomId: ROOM },
        ]);
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

// ── regressions: socket identity + api-base singleton ─────────────────────────

describe('room switch — the old socket cannot clobber the new one (audit #3)', () => {
    it('detaches the old handlers before close and ignores a late close aimed at it', () => {
        vi.useFakeTimers();
        const handler = vi.fn();
        openSyncPlayConnection(ROOM, handler, 'me', 'Me');
        const old = socket();
        old.onopen?.();
        // Capture the shared close handler BEFORE the switch detaches it — this
        // simulates the old socket's close event still landing afterwards.
        const lateClose = old.onclose as (e: unknown) => void;
        expect(typeof lateClose).toBe('function');

        openSyncPlayConnection('sp_other999', handler, 'me', 'Me');
        const fresh = socket();
        expect(fresh).not.toBe(old);
        // The switch closed the stale socket AND detached it first, so the
        // browser-fired close has nowhere to land on the old socket itself…
        expect(old.closeCalls).toBe(1);
        expect(old.onclose).toBeNull();
        expect(old.onmessage).toBeNull();

        // …and even a close delivered through the captured reference must be
        // dropped by the `event.target !== syncPlayWs` guard: it must NOT null
        // the new socket, fire onDisconnect for it, or arm a second ladder.
        lateClose({ target: old });
        vi.advanceTimersByTime(60_000);
        expect(FakeWebSocket.instances).toHaveLength(2); // zero reconnect sockets

        // The new socket is still THE connection: inbound frames flow to the handler.
        fresh.onopen?.();
        fresh.deliver({
            type: 'syncplay_playback_sync',
            member_id: 'peer',
            position: 12_000,
            is_playing: true,
        });
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ type: 'play' }));
    });
});

describe('getSyncPlayApi — base changes rebuild the singleton (audit #13)', () => {
    it('reuses the instance for the same base and re-creates it for a new one', () => {
        const one = getSyncPlayApi('https://server-one');
        expect(getSyncPlayApi('https://server-one')).toBe(one); // stable for same base
        const two = getSyncPlayApi('https://server-two');
        expect(two).not.toBe(one); // later base is honored, not silently ignored
        expect(getSyncPlayApi('https://server-two')).toBe(two);
    });
});
