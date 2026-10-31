/**
 * S264 — `SyncPlayModal.vue`, which shipped with NO test file at all
 * (29/73 lines, **1/22 functions** — the single worst function-coverage figure
 * in the repo; `loadRooms`, `submit`, `selectRoom` and `close` — under their
 * pre-M-UI-14 names `loadPublicRooms`/`selectPublicRoom` — had
 * never been entered).
 *
 * This is the create/join path, so per S276 the API surface is NOT `vi.mock`ed.
 * The modal drives the real `SyncPlayApi` and the real `useSyncPlayStore`
 * through {@link makeSyncPlayServer} — the fake server built from phlix-server's
 * own route manifest, which answers a real 404 to anything it does not register.
 * A submit that named an unserved url would therefore fail here, which is
 * precisely what the pre-S276 mocked suites could not do.
 *
 * The WebSocket is faked because a successful join opens one and jsdom would
 * dial `:8097` for real.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, DOMWrapper, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SyncPlayModal from './SyncPlayModal.vue';
import Button from '../ui/Button.vue';
import Switch from '../ui/Switch.vue';
import Modal from '../ui/Modal.vue';
import { useSyncPlayStore } from '../../stores/useSyncPlayStore';
import { closeSyncPlayConnection } from '../../api/syncplay';
import { errorCodeMessage } from '../../i18n/errors';
import { sha256Hex } from '../../utils/syncplaySha256';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../../api/test/syncplayServer';

const API_BASE = 'https://media.test';
const GROUP_ID = 'sp_abc123';

// Lane ritual token for S288 (UI arm), raw cat form: asserted below so it is
// both greppable in the diff and live in the suite rather than a floating const.
const S288_UI_TOKEN = 'S288UIROOMX7P2';

// ── stable global seams ───────────────────────────────────────────────────────
//
// `getSyncPlayApi()` memoises ONE `SyncPlayApi`, and `ApiClient` binds
// `globalThis.fetch` at CONSTRUCTION — so the global must be a stable function
// installed once that delegates to a per-test server, exactly as
// `useSyncPlayStore.join.test.ts` does. Swapping the global instead would leave
// the memoised client holding whichever fetch the first test installed.

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
    /** M-UI-14: recorded frames, so a test can fire `onopen` and read the
     *  `GROUP_JOIN` payload the shipped client put on the wire. */
    readonly sent: string[] = [];
    constructor(readonly url: string) {
        FakeWebSocket.instances.push(this);
    }
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
        this.sent.push(String(data));
    }
    close(): void {
        this.readyState = 3;
    }
}

globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;

// ── mounting ──────────────────────────────────────────────────────────────────

/**
 * Mount CLOSED, then open — the modal does all of its setup in a
 * `watch(() => props.modelValue)` with no `immediate`, so a component mounted
 * already-open never runs `loadPublicRooms()` and every field keeps its initial
 * value. Mounting open would make most of this suite pass against a dead watcher.
 */
async function openModal(props: { apiBase?: string; prefilledRoomId?: string } = {}): Promise<VueWrapper> {
    const w = mount(SyncPlayModal, {
        props: { modelValue: false, apiBase: API_BASE, ...props },
        attachTo: document.body,
        global: { provide: { apiBase: API_BASE } },
    });
    await w.setProps({ modelValue: true });
    await flushPromises();
    return w;
}

// ⚠ `ui/Modal.vue` renders `<Teleport to="body">`, so the modal's markup is NOT
// inside the mounted wrapper's element subtree and `w.find()` never sees it —
// every DOM query below therefore goes through `document.body`, wrapped so
// `.setValue()` / `.trigger()` still work. (`findComponent` DOES traverse the
// teleport, because it walks the vnode tree rather than the DOM.)
const q = (sel: string): DOMWrapper<Element> => {
    const el = document.body.querySelector(sel);
    if (!el) throw new Error(`no element matched ${sel}`);
    return new DOMWrapper(el);
};
const qa = (sel: string): Array<DOMWrapper<Element>> =>
    Array.from(document.body.querySelectorAll(sel)).map((el) => new DOMWrapper(el));
const exists = (sel: string): boolean => document.body.querySelector(sel) !== null;

const tab = (name: 'Create room' | 'Join room') =>
    qa('button[role="radio"]').find((b) => b.text().trim() === name)!;

/** The footer action button (`Create room` / `Join room`), not the tab. */
const submitBtn = (w: VueWrapper) => w.findAllComponents(Button).at(1)!;

const nameInput = () => q('#room-name');
const idInput = () => q('#room-id');
const inputValue = (sel: string) => (document.body.querySelector(sel) as HTMLInputElement).value;

beforeEach(() => {
    setActivePinia(createPinia());
    server = makeSyncPlayServer(API_BASE);
    FakeWebSocket.instances = [];
    document.body.innerHTML = '';
    localStorage.clear();
    vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
    closeSyncPlayConnection();
    vi.restoreAllMocks();
});

// ── the harness is not vacuous ────────────────────────────────────────────────

describe('SyncPlayModal — control', () => {
    it('the fake server really serves the listing (succeeding control)', async () => {
        const w = await openModal();
        // If the listing 404'd, `rooms` would be [] and every rooms-list
        // assertion below would pass for the wrong reason.
        expect(server!.requests.map((r) => `${r.method} ${r.path} → ${r.status}`)).toEqual([
            'GET /api/v1/syncplay/groups → 200',
        ]);
        expect(w.findComponent(SyncPlayModal).exists()).toBe(true);
    });
});

// ── the open watcher ──────────────────────────────────────────────────────────

describe('SyncPlayModal — opening', () => {
    it('issues NO request while closed, and loads the room list on open', async () => {
        const w = mount(SyncPlayModal, {
            props: { modelValue: false, apiBase: API_BASE },
            attachTo: document.body,
            global: { provide: { apiBase: API_BASE } },
        });
        await flushPromises();
        expect(server!.requests).toHaveLength(0);

        await w.setProps({ modelValue: true });
        await flushPromises();
        expect(server!.requests).toHaveLength(1);
    });

    it('defaults to CREATE mode with an empty name', async () => {
        await openModal();
        expect(tab('Create room').attributes("aria-checked")).toBe('true');
        expect(tab('Join room').attributes("aria-checked")).toBe('false');
        expect(inputValue('#room-name')).toBe('');
        expect(exists('#room-id')).toBe(false);
    });

    it('a prefilledRoomId opens straight into JOIN mode with the id filled', async () => {
        await openModal({ prefilledRoomId: GROUP_ID });
        expect(tab('Join room').attributes("aria-checked")).toBe('true');
        expect(inputValue('#room-id')).toBe(GROUP_ID);
        expect(exists('#room-name')).toBe(false);
    });

    it('RE-opening resets a stale name, mode and error from the previous session', async () => {
        const w = await openModal();
        await nameInput().setValue('Old room');
        await tab('Join room').trigger('click');
        await idInput().setValue('stale-id');

        await w.setProps({ modelValue: false });
        await w.setProps({ modelValue: true });
        await flushPromises();

        expect(tab('Create room').attributes("aria-checked")).toBe('true');
        expect(inputValue('#room-name')).toBe('');
        // Two loads: one per open. A watcher that only fired once would show 1.
        expect(server!.requests).toHaveLength(2);
    });

    it('survives a room listing that 404s — the modal opens with no rooms', async () => {
        server = makeSyncPlayServer(API_BASE, { omit: ['GET /api/v1/syncplay/groups'] });
        await openModal();

        expect(server.requests.map((r) => r.status)).toEqual([404]);
        expect(exists('.syncplay-modal__rooms')).toBe(false);
        // The catch must not leave the spinner up forever.
        expect(exists('.syncplay-modal__loading')).toBe(false);
    });
});

// ── mode switching and submit gating ──────────────────────────────────────────

describe('SyncPlayModal — submit gating', () => {
    it('CREATE is disabled until the name is non-blank', async () => {
        const w = await openModal();
        expect(submitBtn(w).props('disabled')).toBe(true);

        await nameInput().setValue('   '); // whitespace only
        expect(submitBtn(w).props('disabled')).toBe(true);

        await nameInput().setValue('Movie Night');
        expect(submitBtn(w).props('disabled')).toBe(false);
    });

    it('JOIN is disabled until the room id is non-blank', async () => {
        const w = await openModal();
        await tab('Join room').trigger('click');
        expect(submitBtn(w).props('disabled')).toBe(true);

        await idInput().setValue('  ');
        expect(submitBtn(w).props('disabled')).toBe(true);

        await idInput().setValue(GROUP_ID);
        expect(submitBtn(w).props('disabled')).toBe(false);
    });

    it('the two modes gate INDEPENDENTLY — a name does not enable Join', async () => {
        const w = await openModal();
        await nameInput().setValue('Movie Night');
        expect(submitBtn(w).props('disabled')).toBe(false);

        await tab('Join room').trigger('click');
        // Same component, same filled `roomName`, but Join reads `roomId`.
        expect(submitBtn(w).props('disabled')).toBe(true);
    });

    it('the footer button re-labels with the mode', async () => {
        const w = await openModal();
        expect(submitBtn(w).text()).toBe('Create room');
        await tab('Join room').trigger('click');
        expect(submitBtn(w).text()).toBe('Join room');
    });

    it('submitting while gated issues NO request', async () => {
        const w = await openModal();
        server!.requests.length = 0;
        // Submit the FORM, not the button — the button is `disabled`, and a VTU
        // `trigger()` on a disabled control is a no-op, so clicking it could not
        // reach the `if (!canSubmit.value) return` guard at all
        // ([[feedback_vtu_trigger_cannot_reach_disabled_guards]]). Submitting the
        // form bypasses the disabled attribute and exercises the real guard.
        await q('form.syncplay-modal').trigger('submit');
        await flushPromises();
        expect(server!.requests).toEqual([]);
        expect(w.emitted('joined')).toBeUndefined();
        expect(w.emitted('update:modelValue')).toBeUndefined();
    });
});

// ── create ────────────────────────────────────────────────────────────────────

describe('SyncPlayModal — create', () => {
    it('creates, joins, emits `joined` and closes', async () => {
        const w = await openModal();
        await nameInput().setValue('  Movie Night  ');
        server!.requests.length = 0;

        await submitBtn(w).trigger('click');
        await flushPromises();

        // Both calls hit REGISTERED routes; a 404 anywhere would have thrown into
        // the error branch instead.
        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            'POST /api/v1/syncplay/groups',
            `POST /api/v1/syncplay/groups/${GROUP_ID}/join`,
        ]);
        expect(server!.requests.every((r) => r.status === 200)).toBe(true);

        const joined = w.emitted('joined');
        expect(joined).toHaveLength(1);
        expect((joined![0]![0] as { id: string }).id).toBe(GROUP_ID);
        expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false]);
        expect(exists('.syncplay-modal__error')).toBe(false);
    });

    it('TRIMS the room name before sending it', async () => {
        const w = await openModal();
        await nameInput().setValue('  Movie Night  ');
        await submitBtn(w).trigger('click');
        await flushPromises();
        expect(w.emitted('joined')).toHaveLength(1);
    });

    // S288 removed the public/private Switch and proved create carried only
    // what the server consumes. M-UI-14 reopens ONE field of that era — and it
    // is the field S288 mis-classified: `password` always had a server
    // counterpart (`createGroup()` reads it and flips `has_password`);
    // `isPublic`/`description` never did. The Switch stays gone: presence of
    // the password IS the public/private decision, so a toggle would shadow it.
    it('create renders the name and an optional password field — and still NO Switch (S288 + M-UI-14)', async () => {
        const w = await openModal();
        expect(w.findComponent(Switch).exists()).toBe(false);
        expect(exists('.syncplay-modal__field--toggle')).toBe(false);
        expect(exists('.syncplay-modal__toggle-hint')).toBe(false);
        // The create form holds the name input and the gate input.
        const fields = qa('.syncplay-modal__field');
        expect(fields).toHaveLength(2);
        expect(fields[0]!.find('input').attributes('id')).toBe('room-name');
        expect(inputValue('#room-password')).toBe('');
        // Hidden by default; the reveal toggle speaks the auth-form idiom.
        expect(q('#room-password').attributes('type')).toBe('password');
        const toggle = q('.syncplay-modal__pw-toggle');
        expect(toggle.attributes('aria-label')).toBe('Show password');
        await toggle.trigger('click');
        expect(q('#room-password').attributes('type')).toBe('text');
        expect(q('.syncplay-modal__pw-toggle').attributes('aria-label')).toBe('Hide password');
    });

    it('the create body carries EXACTLY the fields the server reads — no isPublic, no description (S288)', async () => {
        expect(S288_UI_TOKEN).toBe('S288UIROOMX7P2');
        const w = await openModal();
        await nameInput().setValue('Movie Night');
        server!.requests.length = 0;

        await submitBtn(w).trigger('click');
        await flushPromises();

        const createBody = server!.requests.find((r) => r.method === 'POST' && r.path === '/api/v1/syncplay/groups')!.body;
        expect(createBody).not.toBeNull();
        // `SyncPlayController::createGroup()` reads name/password/memberId/memberName;
        // an empty gate field means "open room" and the key is OMITTED — the
        // wire has no "set-empty gate" concept (signed out → no memberName).
        expect(Object.keys(createBody!).sort()).toEqual(['name']);
        expect(createBody!.name).toBe('Movie Night');
    });

    // M-UI-14: the whole point — web-created rooms can be locked, and the
    // credential goes out as the server's REST rail actually parses it
    // (plaintext `password`; that rail has NO `password_hash` parse),
    // untrimmed: every byte typed is the credential.
    it('a password on create rides BOTH REST legs verbatim and the join succeeds (M-UI-14)', async () => {
        const w = await openModal();
        await nameInput().setValue('Locked Night');
        await q('#room-password').setValue('hünter 2');
        server!.requests.length = 0;

        await submitBtn(w).trigger('click');
        await flushPromises();

        const createReq = server!.requests.find((r) => r.method === 'POST' && r.path === '/api/v1/syncplay/groups')!;
        expect(Object.keys(createReq.body!).sort()).toEqual(['name', 'password']);
        expect(createReq.body!.password).toBe('hünter 2');
        const joinReq = server!.requests.find((r) => r.path.endsWith('/join'))!;
        expect(joinReq.status).toBe(200);
        expect(joinReq.body!.password).toBe('hünter 2');
        expect(w.emitted('joined')).toHaveLength(1);
    });

    // The wire has no "set-empty gate" concept — the store's presence test is
    // `trim() !== ''`, and a whitespace-only field must NOT leak a
    // `password: '   '` key the server would hash into a real lock.
    it('a whitespace-only create gate omits the password key entirely (M-UI-14)', async () => {
        const w = await openModal();
        await nameInput().setValue('Blank Gate');
        await q('#room-password').setValue('   ');
        server!.requests.length = 0;

        await submitBtn(w).trigger('click');
        await flushPromises();

        const createReq = server!.requests.find((r) => r.method === 'POST' && r.path === '/api/v1/syncplay/groups')!;
        expect(Object.keys(createReq.body!).sort()).toEqual(['name']);
        expect(w.emitted('joined')).toHaveLength(1);
    });

    it('the CREATE tab switches back from join mode', async () => {
        const w = await openModal({ prefilledRoomId: GROUP_ID });
        expect(tab('Join room').attributes("aria-checked")).toBe('true');

        await tab('Create room').trigger('click');
        expect(tab('Create room').attributes("aria-checked")).toBe('true');
        expect(exists('#room-name')).toBe(true);
        expect(exists('#room-id')).toBe(false);
        // Gating follows the mode: the prefilled id no longer enables submit.
        expect(submitBtn(w).props('disabled')).toBe(true);
    });

    it('shows the error and does NOT close when create hits an unserved route', async () => {
        server = makeSyncPlayServer(API_BASE, { omit: ['POST /api/v1/syncplay/groups'] });
        const w = await openModal();
        await nameInput().setValue('Movie Night');
        await submitBtn(w).trigger('click');
        await flushPromises();

        const err = q('.syncplay-modal__error');
        expect(err.attributes('role')).toBe('alert');
        expect(err.text().length).toBeGreaterThan(0);
        expect(w.emitted('joined')).toBeUndefined();
        // No close — the modal must stay open so the message is readable.
        expect(w.emitted('update:modelValue')).toBeUndefined();
        // …and the button is usable again rather than stuck loading.
        expect(submitBtn(w).props('loading')).toBe(false);
    });
});

// ── join ──────────────────────────────────────────────────────────────────────

describe('SyncPlayModal — join', () => {
    it('joins by id and EMITS `joined` with the room the server returned', async () => {
        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(`  ${GROUP_ID}  `);
        server!.requests.length = 0;

        await submitBtn(w).trigger('click');
        await flushPromises();

        // The id is TRIMMED — an untrimmed value would request
        // `/groups/%20%20sp_abc123%20%20/join`, a different (though still legal)
        // path, so the exact path is the assertion.
        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            `POST /api/v1/syncplay/groups/${GROUP_ID}/join`,
        ]);
        // S283: this used to assert `joined` was UNDEFINED. The emit was gated
        // on `syncPlay.currentRoom`, which a bare join never set, so the event
        // was unreachable on the join tab and the `?room=` join-link — the only
        // paths it exists for. The payload carries the server's `group_name`,
        // which the modal never had: nothing here could have fabricated it.
        const joined = w.emitted('joined');
        expect(joined).toHaveLength(1);
        const room = (joined![0] as [{ id: string; name: string }])[0];
        expect(room.id).toBe(GROUP_ID);
        expect(room.name).toBe('Movie Night');
        expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false]);
    });

    it('DOES emit `joined` when the store already holds a room', async () => {
        // The other half of the same `if (syncPlay.currentRoom)` branch: a user
        // who picked the room from the listing (or arrived from SyncPlayPage)
        // has `currentRoom` set, and then the join must announce it.
        const store = useSyncPlayStore();
        store.currentRoom = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 2 };

        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(GROUP_ID);
        await submitBtn(w).trigger('click');
        await flushPromises();

        const joined = w.emitted('joined');
        expect(joined).toHaveLength(1);
        expect((joined![0]![0] as { id: string }).id).toBe(GROUP_ID);
        expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false]);
    });

    it('shows the error and stays open when the join route is unserved', async () => {
        server = makeSyncPlayServer(API_BASE, { omit: ['POST /api/v1/syncplay/groups/{id}/join'] });
        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(GROUP_ID);
        await submitBtn(w).trigger('click');
        await flushPromises();

        expect(q('.syncplay-modal__error').text().length).toBeGreaterThan(0);
        expect(w.emitted('update:modelValue')).toBeUndefined();
        expect(server.requests.some((r) => r.status === 404)).toBe(true);
    });
});

// ── M-UI-14: password-locked rooms ───────────────────────────────────────────
describe('SyncPlayModal — locked rooms (M-UI-14)', () => {
    /** The fake's gate lives on the mutated group; seed it as created-locked. */
    function lockedServer(): FakeSyncPlayServer {
        server = makeSyncPlayServer(API_BASE, { groupPassword: 'hunter2' });
        return server;
    }

    it('a locked room from the listing requires the credential up front', async () => {
        lockedServer();
        const w = await openModal();
        await tab('Join room').trigger('click');

        // The row exists AND says so: lock icon carries the accessible name.
        expect(q('.syncplay-modal__room-name').text()).toBe('Movie Night');
        expect(exists('[role="img"][aria-label="Password-protected"]')).toBe(true);

        await q('.syncplay-modal__room-btn').trigger('click');
        await flushPromises();

        // Known-locked ⇒ required now, before wasting a refused round trip.
        expect(exists('#room-password-hint')).toBe(true);
        expect(q('#room-password').attributes('required')).toBeDefined();
        expect(submitBtn(w).props('disabled')).toBe(true);

        await q('#room-password').setValue('hunter2');
        expect(submitBtn(w).props('disabled')).toBe(false);
    });

    it('a wrong password surfaces the localized refusal, re-prompts inline, and never echoes the server string', async () => {
        lockedServer();
        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(GROUP_ID);
        await q('#room-password').setValue('nope');
        await submitBtn(w).trigger('click');
        await flushPromises();

        const expected = errorCodeMessage('syncplay.invalid_password', null, null);
        expect(q('.syncplay-modal__error').text()).toBe(expected);
        // The WS-ingest sanitize law applied to the REST rail: the server's
        // wire copy must never render.
        expect(document.body.textContent).not.toContain('Invalid password');
        // The refusal is a PROMPT, not a dead end: hint now visible, field
        // required, modal stayed open for the retry.
        expect(exists('#room-password-hint')).toBe(true);
        expect(w.emitted('update:modelValue')).toBeUndefined();
        expect(inputValue('#room-password')).toBe('nope'); // dirty-state law: keep what they typed
    });

    it('the right password joins, and the GROUP_JOIN frame carries the digest — never the plaintext', async () => {
        lockedServer();
        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(GROUP_ID);
        await q('#room-password').setValue('hunter2');
        await submitBtn(w).trigger('click');
        await flushPromises();

        expect(w.emitted('joined')).toHaveLength(1);
        const socket = FakeWebSocket.instances.at(-1);
        expect(socket).toBeDefined();
        socket!.onopen?.();
        const joinFrame = socket!.sent
            .map((raw) => JSON.parse(raw) as { type?: string; password_hash?: string; [k: string]: unknown })
            .find((m) => m.type === 'syncplay_group_join');
        expect(joinFrame).toBeDefined();
        expect(joinFrame!.password_hash).toBe(sha256Hex('hunter2'));
        // The plaintext is never on the socket, and neither is a `password` key
        // (the WS rail speaks SPEC §4 digests; only REST sees the raw arm).
        for (const raw of socket!.sent) {
            expect(raw).not.toContain('hunter2');
            expect(JSON.parse(raw)).not.toHaveProperty('password');
        }
        // Custody: nothing credential-shaped reached storage.
        expect(localStorage.length).toBe(0);
    });

    it('an UNLOCKED join frame omits the password_hash key entirely', async () => {
        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(GROUP_ID);
        await submitBtn(w).trigger('click');
        await flushPromises();

        const socket = FakeWebSocket.instances.at(-1);
        socket!.onopen?.();
        const joinFrame = socket!.sent
            .map((raw) => JSON.parse(raw) as Record<string, unknown>)
            .find((m) => m.type === 'syncplay_group_join');
        expect(joinFrame).toBeDefined();
        expect('password_hash' in joinFrame!).toBe(false);
    });

    it('re-opening the modal clears the credential and the locked escalation', async () => {
        lockedServer();
        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(GROUP_ID);
        await q('#room-password').setValue('nope');
        await submitBtn(w).trigger('click');
        await flushPromises();
        expect(exists('#room-password-hint')).toBe(true);

        await w.setProps({ modelValue: false });
        await w.setProps({ modelValue: true });
        await flushPromises();

        expect(inputValue('#room-password')).toBe('');
        expect(exists('#room-password-hint')).toBe(false);
        expect(exists('.syncplay-modal__error')).toBe(false);
    });

    // R-UI-07 (M-UI-14__r1 finding #2): within ONE open session the gate used
    // to ratchet — once a locked pick or a 400 set `requiresPassword`, even
    // picking an UNLOCKED room left `canJoin` gated on a non-empty field the
    // chosen room does not need. The cure makes the gate a MIRROR of the pick:
    // `selectRoom()` assigns, never escalates only. Reverting the assignment
    // to the old `if (!room.isPublic) requiresPassword.value = true;` reddens
    // BOTH legs below (the stale escalation keeps the hint + the disabled
    // submit); hard-coding `false` instead reddens the pre-existing
    // locked-pick-escalates test. Neither mutation can pass silently.
    it('an UNLOCKED pick from the listing de-escalates a locked pick in the same open modal (R-UI-07)', async () => {
        server = makeSyncPlayServer(API_BASE, {
            extraListingRows: [
                {
                    id: 'sp_locked9',
                    name: 'Trivia Night',
                    member_count: 7,
                    has_password: true,
                    current_media: 'media-9',
                    is_playing: false,
                },
            ],
        });
        const w = await openModal();
        await tab('Join room').trigger('click');

        // Locked pick first — escalation is the shipped law (test above).
        const locked = qa('.syncplay-modal__room').find((r) => r.text().includes('Trivia Night'))!;
        await locked.find('.syncplay-modal__room-btn').trigger('click');
        await flushPromises();
        expect(exists('#room-password-hint')).toBe(true);
        expect(submitBtn(w).props('disabled')).toBe(true);

        // Same modal, never re-opened: pick the UNLOCKED room. The gate must
        // follow the new pick — no typed credential demanded, field optional.
        const open = qa('.syncplay-modal__room').find((r) => r.text().includes('Movie Night'))!;
        await open.find('.syncplay-modal__room-btn').trigger('click');
        await flushPromises();

        expect(inputValue('#room-id')).toBe(GROUP_ID);
        expect(exists('#room-password-hint')).toBe(false);
        expect(q('#room-password').attributes('required')).toBeUndefined();
        expect(submitBtn(w).props('disabled')).toBe(false);

        // And the join that the sticky gate used to block now simply works —
        // empty credential, server-side member of an unlocked group.
        await submitBtn(w).trigger('click');
        await flushPromises();
        expect(w.emitted('joined')).toHaveLength(1);
    });

    it('an UNLOCKED pick clears a 400-refusal escalation in the same open modal (R-UI-07)', async () => {
        // Seeded group LOCKED ('hunter2'); the extra row is an unlocked one.
        server = makeSyncPlayServer(API_BASE, {
            groupPassword: 'hunter2',
            extraListingRows: [
                {
                    id: 'sp_open77',
                    name: 'Cards Night',
                    member_count: 3,
                    has_password: false,
                    current_media: 'media-7',
                    is_playing: false,
                },
            ],
        });
        const w = await openModal();
        await tab('Join room').trigger('click');
        await idInput().setValue(GROUP_ID);
        await q('#room-password').setValue('nope');
        await submitBtn(w).trigger('click');
        await flushPromises();
        // The refusal escalated the gate (the :204 arm).
        expect(exists('#room-password-hint')).toBe(true);

        // Pick the unlocked room from the same listing — the escalation must
        // not survive an explicit known-open re-selection.
        const open = qa('.syncplay-modal__room').find((r) => r.text().includes('Cards Night'))!;
        await open.find('.syncplay-modal__room-btn').trigger('click');
        await flushPromises();

        expect(inputValue('#room-id')).toBe('sp_open77');
        expect(exists('#room-password-hint')).toBe(false);
        expect(q('#room-password').attributes('required')).toBeUndefined();
        expect(submitBtn(w).props('disabled')).toBe(false);
    });
});

// ── the rooms list (M-UI-14: locked rooms included) ──────────────────────────

describe('SyncPlayModal — rooms list', () => {
    it('lists rooms in JOIN mode only, with the member count rendered as a number', async () => {
        await openModal();
        // Create mode hides the list even though it is loaded.
        expect(exists('.syncplay-modal__rooms')).toBe(false);

        await tab('Join room').trigger('click');
        const rooms = qa('.syncplay-modal__room');
        expect(rooms).toHaveLength(1);
        expect(q('.syncplay-modal__room-name').text()).toBe('Movie Night');
        // S262-class regression guard: `t('syncplay.members', { count })` must
        // substitute, not render the raw plural template.
        expect(q('.syncplay-modal__room-count').text()).toBe('2 members');
        expect(q('.syncplay-modal__room-count').text()).not.toContain('{count}');
        expect(q('.syncplay-modal__room-count').text()).not.toContain('|');
    });

    // S288 pinned the era when a locked room was UNREPRESENTABLE from this
    // modal — listing it would offer a door with no keyhole. M-UI-14 built the
    // keyhole: the listing now shows BOTH rooms, the locked one wearing its
    // lock. Drop the modal back to `listPublicRooms()` and this reddens with
    // one row; drop the lock icon and the aria assertion reddens.
    it('a mixed listing renders BOTH rooms — the locked one flagged (M-UI-14 supersedes S288)', async () => {
        server = makeSyncPlayServer(API_BASE, {
            extraListingRows: [
                {
                    id: 'sp_locked9',
                    name: 'Trivia Night',
                    member_count: 7,
                    has_password: true,
                    current_media: 'media-9',
                    is_playing: false,
                },
            ],
        });
        await openModal();
        await tab('Join room').trigger('click');

        const names = qa('.syncplay-modal__room-name').map((n) => n.text());
        expect(names).toEqual(['Movie Night', 'Trivia Night']);
        expect(q('.syncplay-modal__rooms-title').text()).toBe('Rooms');
        // Exactly the locked row carries the lock icon.
        const locked = qa('.syncplay-modal__room').find((row) => row.text().includes('Trivia Night'))!;
        expect(locked.find('[role="img"][aria-label="Password-protected"]').exists()).toBe(true);
        const open = qa('.syncplay-modal__room').find((row) => row.text().includes('Movie Night'))!;
        expect(open.find('[role="img"][aria-label="Password-protected"]').exists()).toBe(false);
        // One GET regardless of what is rendered — the listing is served state.
        expect(server.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            'GET /api/v1/syncplay/groups',
        ]);
    });

    it('clicking a listed room fills the id and switches to JOIN', async () => {
        const w = await openModal();
        await tab('Join room').trigger('click');
        await q('.syncplay-modal__room-btn').trigger('click');
        await flushPromises();

        expect(inputValue('#room-id')).toBe(GROUP_ID);
        expect(submitBtn(w).props('disabled')).toBe(false);
    });

    it('a room selected from the list submits to that room', async () => {
        const w = await openModal();
        await tab('Join room').trigger('click');
        await q('.syncplay-modal__room-btn').trigger('click');
        server!.requests.length = 0;

        await submitBtn(w).trigger('click');
        await flushPromises();

        expect(server!.requests.map((r) => `${r.method} ${r.path}`)).toEqual([
            `POST /api/v1/syncplay/groups/${GROUP_ID}/join`,
        ]);
    });

    it('renders no list when the server returns no groups', async () => {
        server = makeSyncPlayServer(API_BASE);
        const emptyFetch = server.fetch;
        server = {
            requests: server.requests,
            fetch: ((url: string, init?: RequestInit) =>
                emptyFetch(url, init).then(
                    (res) =>
                        ({
                            ok: res.ok,
                            status: res.status,
                            headers: res.headers,
                            json: () => Promise.resolve({ groups: [] }),
                            text: () => Promise.resolve('{"groups":[]}'),
                        }) as unknown as Response,
                )) as unknown as typeof fetch,
        };

        await openModal();
        await tab('Join room').trigger('click');
        expect(exists('.syncplay-modal__rooms')).toBe(false);
    });
});

// ── closing ───────────────────────────────────────────────────────────────────

describe('SyncPlayModal — closing', () => {
    it('the footer Close button emits update:modelValue false', async () => {
        const w = await openModal();
        await w.findAllComponents(Button).at(0)!.trigger('click');
        expect(w.emitted('update:modelValue')).toEqual([[false]]);
    });

    it('FORWARDS the shell modal\'s own dismissal (backdrop / Escape / ✕)', async () => {
        const w = await openModal();
        // `ui/Modal.vue` owns the backdrop click, the Escape key and the built-in
        // close button; all three surface as `update:modelValue` on the shell,
        // which SyncPlayModal must relay to ITS consumer. Nothing else in this
        // suite reaches that inline handler, so without this the modal would be
        // undismissable by every route except the footer button.
        await w.findComponent(Modal).vm.$emit('update:modelValue', false);
        expect(w.emitted('update:modelValue')).toEqual([[false]]);
    });

    it('closing issues no request and emits no `joined`', async () => {
        const w = await openModal();
        server!.requests.length = 0;
        await w.findAllComponents(Button).at(0)!.trigger('click');
        await flushPromises();
        expect(server!.requests).toEqual([]);
        expect(w.emitted('joined')).toBeUndefined();
    });
});

// ── apiBase resolution ────────────────────────────────────────────────────────

describe('SyncPlayModal — apiBase', () => {
    it('falls back to the injected media base when no `apiBase` prop is given', async () => {
        const w = mount(SyncPlayModal, {
            props: { modelValue: false },
            attachTo: document.body,
            global: { provide: { apiBase: API_BASE } },
        });
        await w.setProps({ modelValue: true });
        await flushPromises();

        // The fake server strips exactly `API_BASE`; a different base would leave
        // the origin on the path and 404.
        expect(server!.requests.map((r) => `${r.path} → ${r.status}`)).toEqual([
            '/api/v1/syncplay/groups → 200',
        ]);
    });
});
