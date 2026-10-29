/**
 * S264 — `SyncPlayControls.vue`, which shipped with NO test file at all
 * (17/44 lines, 2/10 functions; 8 of its 10 functions had never been entered).
 *
 * Nothing here is `vi.mock`ed. The component drives the real
 * `useSyncPlayStore`, which drives the real `sendSyncPlayCommand()` in
 * `src/api/syncplay.ts`, which drives the real `@phlix/syncplay`
 * `SyncPlayClient` — only the WebSocket itself is faked, because jsdom would
 * otherwise dial `:8097`. So a button click is asserted at the far end of the
 * chain, as a FRAME ON THE WIRE, rather than as a spy call on a stub. Mocking
 * that seam is exactly how S276 survived at 11.8% coverage.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SyncPlayControls from './SyncPlayControls.vue';
import { useSyncPlayStore } from '../../stores/useSyncPlayStore';
import { useToastStore } from '../../stores/useToastStore';
import { openSyncPlayConnection, closeSyncPlayConnection } from '../../api/syncplay';
import type { SyncPlaySession } from '../../types/syncplay';

const API_BASE = 'https://media.test';
const ROOM = 'sp_abc123';
const ME = 'm1';

// ── the fake socket ───────────────────────────────────────────────────────────

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

    deliver(payload: unknown): void {
        this.onmessage?.({ data: JSON.stringify(payload) } as MessageEvent);
    }
}

function socket(): FakeWebSocket {
    const s = FakeWebSocket.instances.at(-1);
    if (!s) throw new Error('no socket was constructed');
    return s;
}

/** The frames the component actually put on the wire, decoded. */
function frames(): Array<Record<string, unknown>> {
    return socket().sent.map((raw) => JSON.parse(raw) as Record<string, unknown>);
}

function frameTypes(): string[] {
    return frames().map((f) => f['type'] as string);
}

// ── fixtures ──────────────────────────────────────────────────────────────────

function makeSession(over: Partial<SyncPlaySession> = {}): SyncPlaySession {
    return {
        id: ROOM,
        roomId: ROOM,
        serverId: '',
        createdBy: ME,
        createdAt: '2026-01-01T00:00:00Z',
        state: 'playing',
        currentMediaId: null,
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

/**
 * Bring the module-level SyncPlay connection up to the point where outbound
 * senders actually emit.
 *
 * The `syncplay_group_state` frame is load-bearing: every sender on
 * `SyncPlayClient` is guarded by `this.group !== null`, and only a group_state
 * frame sets it. Without this the whole suite would assert on an empty wire and
 * "no frame was sent" would be indistinguishable from "the button did nothing".
 */
function bringUpConnection(): void {
    openSyncPlayConnection(ROOM, undefined, ME, 'Me');
    socket().onopen?.();
    socket().deliver({
        type: 'syncplay_group_state',
        group: {
            group_id: ROOM,
            group_name: 'Movie Night',
            members: [{ id: ME, name: 'Me', joined_at: 1_700_000_000 }],
            member_count: 1,
            host_id: ME,
            playback_position: 100,
        },
    });
    socket().sent.length = 0; // drop the join frame; only clicks matter below
}

interface MountOpts {
    position?: number;
    duration?: number;
    isPlaying?: boolean;
    isBuffering?: boolean;
    /** `null` means "not in a room". */
    session?: SyncPlaySession | null;
    /** Skip the WebSocket handshake, to prove the "not connected" path. */
    connect?: boolean;
}

function mountControls(opts: MountOpts = {}): {
    w: VueWrapper;
    store: ReturnType<typeof useSyncPlayStore>;
} {
    const store = useSyncPlayStore();
    store.currentSession = opts.session === undefined ? makeSession() : opts.session;
    if (opts.connect !== false && store.currentSession) bringUpConnection();

    const w = mount(SyncPlayControls, {
        props: {
            position: opts.position ?? 100,
            duration: opts.duration ?? 7200,
            isPlaying: opts.isPlaying ?? false,
            isBuffering: opts.isBuffering ?? false,
        },
        global: { provide: { apiBase: API_BASE } },
    });
    mountedWrappers.push(w);
    return { w, store };
}

const btn = (w: VueWrapper, label: string) => w.get(`button[aria-label="${label}"]`);

/**
 * M-UI-12: every mounted wrapper is torn down between tests. The wire-error
 * listener the component registers is a MODULE-level slot (last writer wins),
 * so a wrapper left mounted would keep answering `syncplay_error` frames in
 * later tests and the assertion below of "no listener → no toast" could not be
 * trusted.
 */
const mountedWrappers: VueWrapper[] = [];

/** The toast state as the user would see it (ToastHost renders this array). */
function visibleToasts() {
  return useToastStore().toasts;
}

beforeEach(() => {
    FakeWebSocket.instances = [];
    globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;
    setActivePinia(createPinia());
    localStorage.clear();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    while (mountedWrappers.length > 0) mountedWrappers.pop()!.unmount();
    closeSyncPlayConnection();
    vi.restoreAllMocks();
});

// ── the harness is not vacuous ────────────────────────────────────────────────

describe('SyncPlayControls — control', () => {
    it('a frame really can reach the wire (succeeding control)', async () => {
        const { w } = mountControls();
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();
        // If this were empty, every "no frame" assertion below would be vacuous.
        expect(frameTypes()).toEqual(['syncplay_playback_play']);
        // M-UI-12: the happy path stays silent — no failure toast on success.
        expect(visibleToasts()).toHaveLength(0);
    });
});

// ── visibility ────────────────────────────────────────────────────────────────

describe('SyncPlayControls — visibility', () => {
    it('renders nothing when not in a room', () => {
        const { w } = mountControls({ session: null });
        expect(w.find('.syncplay-controls').exists()).toBe(false);
        expect(w.findAll('button')).toHaveLength(0);
    });

    it('renders the three transport buttons when in a room', () => {
        const { w } = mountControls();
        expect(w.find('.syncplay-controls').exists()).toBe(true);
        expect(w.findAll('button')).toHaveLength(3);
        expect(w.find('button[aria-label="Rewind"]').exists()).toBe(true);
        expect(w.find('button[aria-label="Fast forward"]').exists()).toBe(true);
    });

    it('labels the primary button Play when paused and Pause when playing', async () => {
        const { w } = mountControls({ isPlaying: false });
        expect(w.find('button[aria-label="Play for everyone"]').exists()).toBe(true);

        await w.setProps({ isPlaying: true });
        expect(w.find('button[aria-label="Pause for everyone"]').exists()).toBe(true);
        expect(w.find('button[aria-label="Play for everyone"]').exists()).toBe(false);
    });
});

// ── synced transport → frames on the wire ─────────────────────────────────────

describe('SyncPlayControls — synced transport', () => {
    it('the primary button PLAYS for everyone when locally paused', async () => {
        const { w } = mountControls({ isPlaying: false });
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();

        expect(frameTypes()).toEqual(['syncplay_playback_play']);
        expect(w.emitted('play')).toHaveLength(1);
        expect(w.emitted('pause')).toBeUndefined();
    });

    it('the primary button PAUSES for everyone when locally playing', async () => {
        const { w } = mountControls({ isPlaying: true });
        await btn(w, 'Pause for everyone').trigger('click');
        await flushPromises();

        expect(frameTypes()).toEqual(['syncplay_playback_pause']);
        expect(w.emitted('pause')).toHaveLength(1);
        expect(w.emitted('play')).toBeUndefined();
    });

    it('rewind seeks back exactly 10s and broadcasts it', async () => {
        const { w } = mountControls({ position: 100 });
        await btn(w, 'Rewind').trigger('click');
        await flushPromises();

        expect(frameTypes()).toEqual(['syncplay_playback_seek']);
        // S293: 90 s → 90_000 ms on the wire (SPEC.md:91). The local `seek`
        // event below stays in the ui's internal seconds unit.
        expect(frames()[0]!['to_position']).toBe(90_000);
        expect(w.emitted('seek')).toEqual([[90]]);
    });

    it('rewind CLAMPS at 0 rather than seeking negative', async () => {
        const { w } = mountControls({ position: 4 });
        await btn(w, 'Rewind').trigger('click');
        await flushPromises();

        expect(frames()[0]!['to_position']).toBe(0);
        // (0 is unit-invariant: 0 s = 0 ms, so it carries no unit signal — the
        // 1000× assertions live in the nonzero seek tests.)
        expect(w.emitted('seek')).toEqual([[0]]);
    });

    it('fast-forward seeks on exactly 10s and broadcasts it', async () => {
        const { w } = mountControls({ position: 100, duration: 7200 });
        await btn(w, 'Fast forward').trigger('click');
        await flushPromises();

        expect(frameTypes()).toEqual(['syncplay_playback_seek']);
        // S293: 110 s → 110_000 ms on the wire.
        expect(frames()[0]!['to_position']).toBe(110_000);
        expect(w.emitted('seek')).toEqual([[110]]);
    });

    it('fast-forward CLAMPS at the duration rather than seeking past the end', async () => {
        const { w } = mountControls({ position: 7195, duration: 7200 });
        await btn(w, 'Fast forward').trigger('click');
        await flushPromises();

        // S293: 7200 s → 7_200_000 ms on the wire.
        expect(frames()[0]!['to_position']).toBe(7_200_000);
        expect(w.emitted('seek')).toEqual([[7200]]);
    });

    it('a seek frame carries this member id, so the sender ignores its own echo', async () => {
        const { w } = mountControls({ position: 100 });
        await btn(w, 'Rewind').trigger('click');
        await flushPromises();
        expect(frames()[0]!['member_id']).toBe(ME);
        expect(frames()[0]!['group_id']).toBe(ROOM);
    });
});

// ── the not-in-a-room guard ───────────────────────────────────────────────────

describe('SyncPlayControls — guards', () => {
    it('emits nothing and sends nothing when the session disappears mid-life', async () => {
        const { w, store } = mountControls();
        // The buttons are still mounted for this tick; drop the session and click.
        store.currentSession = null;
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();

        expect(socket().sent).toEqual([]);
        expect(w.emitted('play')).toBeUndefined();
    });

    it('does not emit `seek` when the room guard rejects the command', async () => {
        const { w, store } = mountControls({ position: 100 });
        store.currentSession = null;
        await btn(w, 'Rewind').trigger('click');
        await flushPromises();

        expect(socket().sent).toEqual([]);
        expect(w.emitted('seek')).toBeUndefined();
    });
});

// ── transport failure surfaces to the USER, not the console ───────────────────

describe('SyncPlayControls — a transport throw surfaces honestly (M-UI-12)', () => {
    /**
     * Make the write itself fail. This is one of the two failure shapes the
     * three `catch` arms exist for: `WebSocket.send()` is specified to throw
     * `InvalidStateError` when the socket is not ready, and the readyState
     * check one frame earlier cannot rule that out. The failure is injected at
     * the SOCKET, not by mocking the store — so the whole component→store→api
     * →client chain runs for real and only the far end refuses.
     *
     * Before M-UI-12 the arm was reached by this synthetic throw ALONE, the
     * user saw nothing but a console line, and the UI went on claiming the
     * transport state the click had implied. Now the arm is a toast.
     */
    function breakTheWire(): void {
        socket().send = () => {
            throw new DOMException('InvalidStateError', 'InvalidStateError');
        };
    }

    it('a failed play does not emit `play` and toasts the failure', async () => {
        const { w } = mountControls({ isPlaying: false });
        breakTheWire();
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();

        expect(w.emitted('play')).toBeUndefined();
        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.tone).toBe('error');
        expect(visibleToasts()[0]!.message).toBe(
            'That control did not reach the group. Check your connection and try again.',
        );
    });

    it('a failed pause does not emit `pause` and toasts the failure', async () => {
        const { w } = mountControls({ isPlaying: true });
        breakTheWire();
        await btn(w, 'Pause for everyone').trigger('click');
        await flushPromises();

        expect(w.emitted('pause')).toBeUndefined();
        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.tone).toBe('error');
    });

    it('a failed seek does not emit `seek` and toasts the failure', async () => {
        const { w } = mountControls({ position: 100 });
        breakTheWire();
        await btn(w, 'Rewind').trigger('click');
        await flushPromises();

        expect(w.emitted('seek')).toBeUndefined();
        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.tone).toBe('error');
    });

    it('the component survives the throw and stays interactive', async () => {
        const { w } = mountControls({ isPlaying: false });
        breakTheWire();
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();

        // Repair the wire; the next click must work, proving nothing latched.
        socket().send = function (this: FakeWebSocket, data: string) {
            this.sent.push(data);
        };
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();
        expect(frameTypes()).toEqual(['syncplay_playback_play']);
        expect(w.emitted('play')).toHaveLength(1);
        // The recovery click leaves only the one earlier failure toast behind.
        expect(visibleToasts()).toHaveLength(1);
    });
});

// ── the REAL transport failure: the socket is not OPEN ────────────────────────

describe('SyncPlayControls — a command that cannot reach the wire fails loudly (M-UI-12)', () => {
    /**
     * THE headline M-UI-12 leg. This is the production failure shape the
     * console.error arm NEVER caught: `sendSyncPlayCommand()` used to no-op
     * when `readyState !== OPEN` (mid-reconnect, room-switch race, dead
     * socket), so `sendCommand()` returned normally, the catch stayed
     * unreachable, `emit('play')` fired anyway and the local transport danced
     * while the group never heard a thing — the false "synced" state.
     *
     * Mounted WITHOUT the socket handshake on purpose: the session is live in
     * the store, the wire is not, which is exactly the outage window a
     * reconnect ladder climbs through.
     */
    it('play: no wire, no local emit, one honest toast', async () => {
        const { w } = mountControls({ isPlaying: false, connect: false });
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();

        expect(FakeWebSocket.instances).toHaveLength(0); // nothing was dialed
        expect(w.emitted('play')).toBeUndefined();
        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.tone).toBe('error');
        expect(visibleToasts()[0]!.message).toBe(
            'That control did not reach the group. Check your connection and try again.',
        );
    });

    it('pause: no wire, no local emit, one honest toast', async () => {
        const { w } = mountControls({ isPlaying: true, connect: false });
        await btn(w, 'Pause for everyone').trigger('click');
        await flushPromises();

        expect(w.emitted('pause')).toBeUndefined();
        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.tone).toBe('error');
    });

    it('seek: no wire, no local emit, one honest toast', async () => {
        const { w } = mountControls({ position: 100, connect: false });
        await btn(w, 'Rewind').trigger('click');
        await flushPromises();

        expect(w.emitted('seek')).toBeUndefined();
        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.tone).toBe('error');
    });

    it('the store records the undelivered command on its honest error channel', async () => {
        const { w, store } = mountControls({ isPlaying: false, connect: false });
        expect(store.error).toBeNull();
        await btn(w, 'Play for everyone').trigger('click');
        await flushPromises();

        expect(store.error).toBe('SyncPlay command was not delivered to the group');
    });
});

// ── server-refused commands: the async leg of the same finding ────────────────

describe('SyncPlayControls — a syncplay_error frame from the server is surfaced (M-UI-12)', () => {
    /**
     * The second delivery truth the finding names: a frame CAN reach the wire
     * and still be refused — phlix-server `SyncPlayManager` answers
     * play/pause/seek from a non-host with `sendError(:1071/:1123/:1169)` —
     * legacy SCREAMING codes, `NOT_HOST` et al. The vendored `@phlix/syncplay`
     * client hands each one to `onError(code, message)`; before M-UI-12 that
     * callback only wrote the (injectable, host-silent) lifecycle logger and
     * the refusal died there.
     *
     * Localization goes through the EXISTING error-code catalog
     * (`src/i18n/errors.ts`, W4 doctrine): registered code → 7-locale catalog
     * text; unknown code → the localized generic. The server's English text is
     * never echoed (sanitized surface, per the contracts access order).
     */
    it('NOT_HOST renders the catalog message, not the server text', async () => {
        mountControls();
        socket().deliver({
            type: 'syncplay_error',
            error_code: 'NOT_HOST',
            message: 'Only the host can control playback',
        });
        await flushPromises();

        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.tone).toBe('error');
        expect(visibleToasts()[0]!.message).toBe('Only the group host can do that.');
        // The raw server debug string must not leak onto the user surface.
        expect(visibleToasts()[0]!.message).not.toContain('Only the host can control playback');
    });

    it('NOT_IN_GROUP renders its catalog message', async () => {
        mountControls();
        socket().deliver({ type: 'syncplay_error', code: 'NOT_IN_GROUP', message: 'You are not in a group' });
        await flushPromises();

        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.message).toBe('You are not in a watch group right now.');
    });

    it('an unregistered code falls back to the localized generic, never to server text', async () => {
        mountControls();
        socket().deliver({ type: 'syncplay_error', error_code: 'FUTURE_CODE', message: 'English debug detail' });
        await flushPromises();

        expect(visibleToasts()).toHaveLength(1);
        expect(visibleToasts()[0]!.message).toBe('The watch group refused that action.');
    });

    it('the listener is scoped to the component: after unmount a frame toasts nothing', async () => {
        const { w } = mountControls();
        w.unmount();
        socket().deliver({ type: 'syncplay_error', error_code: 'NOT_HOST', message: 'x' });
        await flushPromises();

        // This is the R12-07 posture restored: with no consumer installed the
        // frame degrades to the injectable logger, which the library keeps
        // silent by default — it does NOT toast from beyond the grave.
        expect(visibleToasts()).toHaveLength(0);
    });

    it('a frame while NOT mounted toasts nothing and does not throw', async () => {
        // Connection up, no component: the module-level listener slot is empty.
        useSyncPlayStore().currentSession = makeSession();
        bringUpConnection();
        expect(() =>
            socket().deliver({ type: 'syncplay_error', error_code: 'NOT_HOST', message: 'x' }),
        ).not.toThrow();
        expect(visibleToasts()).toHaveLength(0);
    });
});

// ── buffer-wait indicator and sync status ─────────────────────────────────────

describe('SyncPlayControls — sync status indicator', () => {
    it('reads SYNCED and shows no buffer-wait banner while in sync', () => {
        const { w } = mountControls({ session: makeSession({ state: 'paused' }) });
        expect(w.get('.syncplay-controls__status').classes()).toContain('syncplay-controls__status--synced');
        expect(w.get('.syncplay-controls__status-label').text()).toBe('Synced');
        expect(w.find('.syncplay-controls__wait').exists()).toBe(false);
    });

    it('reads RE-SYNCING and raises the buffer-wait banner while waiting', () => {
        const { w } = mountControls({ session: makeSession({ state: 'waiting' }) });
        expect(w.get('.syncplay-controls__status').classes()).toContain('syncplay-controls__status--re-syncing');
        expect(w.get('.syncplay-controls__status-label').text()).toBe('Re-syncing…');

        const wait = w.get('.syncplay-controls__wait');
        expect(wait.attributes('role')).toBe('status');
        expect(wait.attributes('aria-label')).toBe('Waiting for members…');
    });

    it('reads OUT OF SYNC when the drift exceeds the threshold', () => {
        const store = useSyncPlayStore();
        store.currentSession = makeSession({ state: 'playing', playbackPosition: 100, playbackRate: 1 });
        // The store's drift anchor is 0 (never anchored), so `elapsedSec` is the
        // whole unix epoch — comfortably past the 2s threshold in either direction.
        store.updateLocalPosition(100);
        bringUpConnection();

        const w = mount(SyncPlayControls, {
            props: { position: 100, duration: 7200, isPlaying: true },
            global: { provide: { apiBase: API_BASE } },
        });
        expect(store.syncStatus).toBe('outOfSync');
        expect(w.get('.syncplay-controls__status').classes()).toContain('syncplay-controls__status--outOfSync');
        expect(w.get('.syncplay-controls__status-label').text()).toBe('Out of sync');
    });

    /**
     * ⚠ The banner has TWO independent causes:
     * `isWaitingForBuffer = waitingForMembers || syncStatus === 're-syncing'`.
     * Mounting straight into `waiting` raises it via the SECOND disjunct without
     * the watcher ever running, so a suite that starts there proves nothing
     * about the latch. Every latch test below therefore mounts SYNCED and
     * transitions in, which is the only way the watcher fires.
     */
    it('the watcher LATCHES the wait banner on re-syncing and clears it on synced', async () => {
        const { w, store } = mountControls({ session: makeSession({ state: 'paused' }) });
        expect(w.find('.syncplay-controls__wait').exists()).toBe(false);

        store.currentSession = makeSession({ state: 'waiting' });
        await flushPromises();
        expect(w.find('.syncplay-controls__wait').exists()).toBe(true);

        // …and back: 'paused' reads 'synced', which must clear the latch.
        store.currentSession = makeSession({ state: 'paused' });
        await flushPromises();
        expect(w.find('.syncplay-controls__wait').exists()).toBe(false);
    });

    /**
     * S283 — the banner used to carry a `__wait-members` span listing who was
     * still buffering. Nothing ever populated the ref behind it, so the span was
     * unreachable markup; it was removed rather than filled because no
     * per-member buffering signal exists on the wire. The control here is the
     * FIRST assertion: the banner really is up, so the absence below is the
     * span's absence and not the whole block's.
     */
    it('the raised banner carries the label and NOTHING that names members', async () => {
        const { w, store } = mountControls({ session: makeSession({ state: 'paused' }) });
        store.currentSession = makeSession({ state: 'waiting' });
        await flushPromises();

        const banner = w.get('.syncplay-controls__wait');
        expect(banner.get('.syncplay-controls__wait-label').text()).toBe('Waiting for members…');
        expect(banner.findAll('span')).toHaveLength(1);
    });

    it('the wait latch SURVIVES a transition to outOfSync (only `synced` clears it)', async () => {
        const { w, store } = mountControls({ session: makeSession({ state: 'paused' }) });

        // Latch it for real, through the watcher.
        store.currentSession = makeSession({ state: 'waiting' });
        await flushPromises();
        expect(w.find('.syncplay-controls__wait').exists()).toBe(true);

        // 'playing' with an unanchored drift clock reads outOfSync, which is
        // neither 're-syncing' nor 'synced' — the watcher must leave the latch
        // alone, so the banner stays up on `waitingForMembers` alone.
        store.updateLocalPosition(0);
        store.currentSession = makeSession({ state: 'playing' });
        await flushPromises();
        expect(store.syncStatus).toBe('outOfSync');
        expect(w.find('.syncplay-controls__wait').exists()).toBe(true);
    });
});
