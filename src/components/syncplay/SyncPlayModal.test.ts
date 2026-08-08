/**
 * S264 — `SyncPlayModal.vue`, which shipped with NO test file at all
 * (29/73 lines, **1/22 functions** — the single worst function-coverage figure
 * in the repo; `loadPublicRooms`, `submit`, `selectPublicRoom` and `close` had
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
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../../api/test/syncplayServer';

const API_BASE = 'https://media.test';
const GROUP_ID = 'sp_abc123';

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
    constructor(readonly url: string) {
        FakeWebSocket.instances.push(this);
    }
    send(): void {}
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
    qa('button[role="tab"]').find((b) => b.text().trim() === name)!;

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
        // If the listing 404'd, `publicRooms` would be [] and every rooms-list
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
        expect(tab('Create room').attributes('aria-selected')).toBe('true');
        expect(tab('Join room').attributes('aria-selected')).toBe('false');
        expect(inputValue('#room-name')).toBe('');
        expect(exists('#room-id')).toBe(false);
    });

    it('a prefilledRoomId opens straight into JOIN mode with the id filled', async () => {
        await openModal({ prefilledRoomId: GROUP_ID });
        expect(tab('Join room').attributes('aria-selected')).toBe('true');
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

        expect(tab('Create room').attributes('aria-selected')).toBe('true');
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

    it('sends the public/private toggle as `isPublic`', async () => {
        const w = await openModal();
        await nameInput().setValue('Movie Night');
        // The hint text is driven by the same ref the payload reads.
        expect(q('.syncplay-modal__toggle-hint').text()).toBe('Anyone can join with the room ID');
        expect(w.findComponent(Switch).props('modelValue')).toBe(true);
    });

    it('the public/private Switch flips the hint, and re-opening resets it', async () => {
        const w = await openModal();
        await w.findComponent(Switch).vm.$emit('update:modelValue', false);
        await flushPromises();
        expect(q('.syncplay-modal__toggle-hint').text()).toBe('Only people with the room ID can join');

        // The open watcher forces `isPublic` back to true, so a private choice
        // does not silently persist into the next room the user creates.
        await w.setProps({ modelValue: false });
        await w.setProps({ modelValue: true });
        await flushPromises();
        expect(q('.syncplay-modal__toggle-hint').text()).toBe('Anyone can join with the room ID');
    });

    it('the CREATE tab switches back from join mode', async () => {
        const w = await openModal({ prefilledRoomId: GROUP_ID });
        expect(tab('Join room').attributes('aria-selected')).toBe('true');

        await tab('Create room').trigger('click');
        expect(tab('Create room').attributes('aria-selected')).toBe('true');
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

// ── the public rooms list ─────────────────────────────────────────────────────

describe('SyncPlayModal — public rooms', () => {
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
