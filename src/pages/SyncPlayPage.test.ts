/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S160 — `src/pages/SyncPlayPage.vue`, the USER-facing group-watch page routed at
 * `/app/syncplay` by `createPhlixApp.ts`. It shipped with no test file at all and
 * measured 0/65 lines the moment S139 replaced the coverage allow-list with a
 * whole-tree glob.
 *
 * ⚠ There are TWO files named `SyncPlayPage.vue`. This suite covers the one under
 * `src/pages/`; `src/pages/admin/SyncPlayPage.vue` is a DIFFERENT component with
 * its own `src/pages/admin/SyncPlayPage.test.ts` and sat at ~97% the whole time.
 * Testing the admin one here would look green and prove nothing, so the first
 * describe block below pins the identity of the import as a real assertion rather
 * than a comment.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import SyncPlayPage from './SyncPlayPage.vue';
import AdminSyncPlayPage from './admin/SyncPlayPage.vue';
import Button from '../components/ui/Button.vue';
import Icon from '../components/Icon.vue';
import { useSyncPlayStore } from '../stores/useSyncPlayStore';
import { useToastStore } from '../stores/useToastStore';
import type { SyncPlaySession, SyncPlayUser } from '../types/syncplay';

// `getSyncPlayApi` is what every store action reaches the network through, so the
// page's own `refresh()` / `leaveRoom()` calls are observable here without a fetch.
const getState = vi.fn();
const getMembers = vi.fn();
const leaveRoomApi = vi.fn(async (_roomId: string) => undefined);
const closeConnection = vi.fn();

vi.mock('../api/syncplay', () => ({
  getSyncPlayApi: vi.fn(() => ({
    getState: (sessionId: string) => getState(sessionId),
    getMembers: (roomId: string) => getMembers(roomId),
    leaveRoom: (roomId: string) => leaveRoomApi(roomId),
  })),
  openSyncPlayConnection: vi.fn(),
  closeSyncPlayConnection: () => closeConnection(),
  sendSyncPlayCommand: vi.fn(),
  sendSyncPlayStateUpdate: vi.fn(),
}));

const API_BASE = 'https://media.test';

function makeSession(over: Partial<SyncPlaySession> = {}): SyncPlaySession {
  return {
    id: 'sess-1',
    roomId: 'room-1',
    serverId: 'srv-1',
    createdBy: 'user-1',
    createdAt: '2026-01-01T00:00:00Z',
    state: 'paused',
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

function makeUser(over: Partial<SyncPlayUser> = {}): SyncPlayUser {
  return {
    id: 'u1',
    name: 'Ada',
    profileId: 1,
    role: 'owner',
    isOnline: true,
    lastSeen: '2026-01-01T00:00:00Z',
    ...over,
  };
}

function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/app/syncplay', name: 'syncplay', component: { template: '<div/>' } }],
  });
}

/**
 * `SyncPlayModal` is stubbed rather than rendered: its `modelValue` watcher fires
 * `loadPublicRooms()` against a `new SyncPlayApi(...)` it constructs itself, which
 * is not the seam this page owns. What the page IS responsible for is the two
 * props it hands down — `modelValue` and `prefilledRoomId` — so the stub declares
 * them and the tests read them back.
 */
const ModalStub = {
  name: 'SyncPlayModal',
  props: ['modelValue', 'prefilledRoomId'],
  emits: ['update:modelValue', 'joined'],
  template: '<div class="modal-stub" />',
};

async function mountPage(
  opts: {
    query?: string;
    session?: SyncPlaySession | null;
    room?: { id: string; name: string; isPublic: boolean; memberCount: number } | null;
    members?: SyncPlayUser[];
    error?: string | null;
    isLoading?: boolean;
    /**
     * Runs after the store is seeded but BEFORE `mount()`. `refresh()` fires from
     * `onMounted`, so a spy installed after mounting would always observe zero
     * calls and pass vacuously — anything asserting on the mount-time refresh must
     * hook in here.
     */
    beforeMount?: (store: ReturnType<typeof useSyncPlayStore>) => void;
  } = {},
): Promise<{ w: VueWrapper; store: ReturnType<typeof useSyncPlayStore>; router: Router }> {
  setActivePinia(createPinia());
  const store = useSyncPlayStore();
  // Seed store state BEFORE mount — `onMounted` reads `isInRoom`/`currentRoom`.
  if (opts.session !== undefined) store.currentSession = opts.session;
  if (opts.room !== undefined) store.currentRoom = opts.room as never;
  if (opts.members !== undefined) store.members = opts.members;
  if (opts.error !== undefined) store.error = opts.error;
  if (opts.isLoading !== undefined) store.isLoading = opts.isLoading;

  // `onMounted` → `refresh()` → `refreshState()`/`refreshMembers()` OVERWRITE the
  // seeded session and member list with whatever the API returns, so the mocks
  // have to echo the seed back or every "active room" assertion would be reading
  // the `beforeEach` defaults instead of the fixture. (`refreshState` also
  // re-anchors the drift clock to `Date.now()`.)
  //
  // The echo must be a fresh OBJECT, not `opts.session` itself: assigning a ref
  // its own current value does not trigger, and `driftAmount` closes over a plain
  // `let _lastDriftCaptureMs` (not a ref) that nothing can invalidate on its own —
  // so re-using the identity leaves `syncStatus` cached from the pre-refresh
  // evaluation, when the anchor was still 0.
  if (opts.session) getState.mockResolvedValue({ ...opts.session });
  if (opts.members) getMembers.mockResolvedValue([...opts.members]);

  opts.beforeMount?.(store);

  const router = makeRouter();
  await router.push(`/app/syncplay${opts.query ?? ''}`);
  await router.isReady();

  const w = mount(SyncPlayPage, {
    attachTo: document.body,
    global: {
      plugins: [router],
      provide: { apiBase: API_BASE },
      stubs: { SyncPlayModal: ModalStub },
    },
  });
  await flushPromises();
  return { w, store, router };
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

const modalStub = (w: VueWrapper) => w.findComponent(ModalStub);

beforeEach(() => {
  localStorage.clear();
  getState.mockReset().mockResolvedValue(makeSession());
  getMembers.mockReset().mockResolvedValue([]);
  leaveRoomApi.mockReset().mockResolvedValue(undefined);
  closeConnection.mockReset();
});
afterEach(() => {
  vi.restoreAllMocks();
});

/* ────────────────────────────────────────────────────────────────────────── */

describe('SyncPlayPage — identity of the component under test (S160)', () => {
  it('is src/pages/SyncPlayPage.vue and NOT src/pages/admin/SyncPlayPage.vue', async () => {
    // Two different modules, so a stray `./admin/SyncPlayPage.vue` import above
    // would be caught here rather than passing silently at ~97% pre-existing
    // coverage.
    expect(SyncPlayPage).not.toBe(AdminSyncPlayPage);

    const { w } = await mountPage();
    // Root markers: this page renders `div.syncplay-page`; the admin page renders
    // `section.admin-syncplay` with `h1#syncplay-heading`. Assert both directions.
    expect(w.find('.syncplay-page').exists()).toBe(true);
    expect(w.find('.admin-syncplay').exists()).toBe(false);
    expect(w.find('#syncplay-heading').exists()).toBe(false);
    // …and the admin component really does carry those markers, so the negative
    // assertions above are discriminating rather than trivially true.
    expect(AdminSyncPlayPage.__file ?? '').toContain('pages/admin/SyncPlayPage.vue');
    expect((SyncPlayPage as { __file?: string }).__file ?? '').toContain('pages/SyncPlayPage.vue');
    expect((SyncPlayPage as { __file?: string }).__file ?? '').not.toContain('admin');
  });
});

describe('SyncPlayPage — empty state (not in a room)', () => {
  it('renders the heading and the "not in a room" empty state', async () => {
    const { w } = await mountPage();
    expect(w.find('.syncplay-page__title').text()).toBe('SyncPlay');
    expect(w.find('.syncplay-page__empty').exists()).toBe(true);
    expect(w.text()).toContain("You're not in a SyncPlay room");
    expect(w.text()).toContain('Create or join a room to watch together with others.');
    expect(w.find('.syncplay-page__section').exists()).toBe(false);
  });

  it('does not refresh anything when there is no room to refresh', async () => {
    await mountPage();
    expect(getState).not.toHaveBeenCalled();
    expect(getMembers).not.toHaveBeenCalled();
  });

  it('opens the modal from the header Create room button', async () => {
    const { w } = await mountPage();
    expect(modalStub(w).props('modelValue')).toBe(false);
    // The header button and the empty-state button are both "Create room".
    const buttons = w.findAllComponents(Button).filter((b) => b.text().trim() === 'Create room');
    expect(buttons.length).toBe(2);
    await buttons[0]!.trigger('click');
    expect(modalStub(w).props('modelValue')).toBe(true);
  });

  it('opens the modal from the empty-state Create room button', async () => {
    const { w } = await mountPage();
    const buttons = w.findAllComponents(Button).filter((b) => b.text().trim() === 'Create room');
    await buttons[1]!.trigger('click');
    expect(modalStub(w).props('modelValue')).toBe(true);
  });

  it('passes no prefilled room id when the URL carries no ?room=', async () => {
    const { w } = await mountPage();
    expect(modalStub(w).props('prefilledRoomId')).toBeUndefined();
    expect(modalStub(w).props('modelValue')).toBe(false);
  });

  it('closes when the modal emits update:modelValue false (the v-model round-trip)', async () => {
    // The page binds `v-model="showModal"`, so the child closing itself must flow
    // back into the parent — otherwise the modal could never be dismissed.
    const { w } = await mountPage();
    await findBtn(w, 'Create room')!.trigger('click');
    expect(modalStub(w).props('modelValue')).toBe(true);

    modalStub(w).vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(modalStub(w).props('modelValue')).toBe(false);
  });

  it('closes a join-by-link modal the same way, keeping the prefilled id', async () => {
    const { w } = await mountPage({ query: '?room=room-xyz' });
    expect(modalStub(w).props('modelValue')).toBe(true);
    modalStub(w).vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(modalStub(w).props('modelValue')).toBe(false);
    expect(modalStub(w).props('prefilledRoomId')).toBe('room-xyz');
  });
});

describe('SyncPlayPage — loading and error states', () => {
  it('shows the spinner with aria-busy while the store is loading', async () => {
    const { w } = await mountPage({ isLoading: true });
    const loading = w.find('.syncplay-page__loading');
    expect(loading.exists()).toBe(true);
    expect(loading.attributes('role')).toBe('status');
    expect(loading.attributes('aria-busy')).toBe('true');
    // Loading wins over every other branch.
    expect(w.find('.syncplay-page__empty').exists()).toBe(false);
    expect(w.find('.syncplay-page__error').exists()).toBe(false);
  });

  it('shows the error alert with the store message, above the empty state', async () => {
    const { w } = await mountPage({ error: 'relay unreachable' });
    const err = w.find('.syncplay-page__error');
    expect(err.exists()).toBe(true);
    expect(err.attributes('role')).toBe('alert');
    expect(w.find('.syncplay-page__error-text').text()).toBe('relay unreachable');
    expect(w.find('.syncplay-page__empty').exists()).toBe(false);
  });

  it('dismisses the error and falls back to the empty state', async () => {
    const { w, store } = await mountPage({ error: 'relay unreachable' });
    await findBtn(w, 'Dismiss')!.trigger('click');
    await flushPromises();
    expect(store.error).toBeNull();
    expect(w.find('.syncplay-page__error').exists()).toBe(false);
    expect(w.find('.syncplay-page__empty').exists()).toBe(true);
  });

  it('prefers loading over error when both are set', async () => {
    const { w } = await mountPage({ isLoading: true, error: 'boom' });
    expect(w.find('.syncplay-page__loading').exists()).toBe(true);
    expect(w.find('.syncplay-page__error').exists()).toBe(false);
  });
});

describe('SyncPlayPage — join by link (?room=)', () => {
  it('pre-fills the room id and auto-opens the modal', async () => {
    const { w } = await mountPage({ query: '?room=room-xyz' });
    expect(modalStub(w).props('prefilledRoomId')).toBe('room-xyz');
    expect(modalStub(w).props('modelValue')).toBe(true);
  });

  it('trims surrounding whitespace off the room id', async () => {
    const { w } = await mountPage({ query: '?room=%20%20room-xyz%20%20' });
    expect(modalStub(w).props('prefilledRoomId')).toBe('room-xyz');
    expect(modalStub(w).props('modelValue')).toBe(true);
  });

  it('ignores a whitespace-only ?room= and leaves the modal closed', async () => {
    // `roomParam.trim()` is the guard: '   ' is truthy as a string but empty once
    // trimmed, and must NOT open a join modal against an empty room id.
    const { w } = await mountPage({ query: '?room=%20%20%20' });
    expect(modalStub(w).props('prefilledRoomId')).toBeUndefined();
    expect(modalStub(w).props('modelValue')).toBe(false);
  });

  it('ignores an empty ?room= and leaves the modal closed', async () => {
    const { w } = await mountPage({ query: '?room=' });
    expect(modalStub(w).props('prefilledRoomId')).toBeUndefined();
    expect(modalStub(w).props('modelValue')).toBe(false);
  });
});

describe('SyncPlayPage — active room', () => {
  const room = { id: 'room-1', name: 'Movie Night', isPublic: true, memberCount: 2 };

  it('refreshes state and members on mount when already in a room', async () => {
    getMembers.mockResolvedValue([makeUser()]);
    await mountPage({ session: makeSession(), room, members: [] });
    expect(getState).toHaveBeenCalledWith('sess-1');
    expect(getMembers).toHaveBeenCalledWith('room-1');
  });

  /**
   * `refresh()` is guarded on `syncPlay.isInRoom && syncPlay.currentRoom` — and the
   * two halves read DIFFERENT refs. `isInRoom` is
   * `computed(() => currentSession.value !== null)` (useSyncPlayStore.ts:34), while
   * `currentRoom` is its own ref (`:21`). So `isInRoom === true` with
   * `currentRoom === null` is a real, expressible state.
   *
   * It is also the NORMAL state after a join-by-link, which is this page's own
   * feature: `?room=<id>` opens SyncPlayModal in join mode, the modal calls
   * `syncPlay.joinRoom()` (SyncPlayModal.vue:113), and `joinRoom` assigns
   * `currentSession` unconditionally (`:111`) but only touches `currentRoom` INSIDE
   * `if (currentRoom.value)` (`:114`). Joining a room you were not already in
   * therefore leaves `currentRoom` null with a live session. (`createAndJoinRoom`
   * is the other path and DOES set both, at `:85`/`:87`.)
   *
   * The two tests below pin each half of the `&&` separately, and they spy on the
   * STORE ACTIONS rather than on the HTTP mocks on purpose: `refreshMembers` opens
   * with its own `if (!currentRoom.value) return`, so asserting "the network was
   * not touched" would be satisfied by the store's guard and would survive deleting
   * the page's. Spying the action makes the PAGE the subject.
   */
  it('does NOT refresh when a session exists but currentRoom is null', async () => {
    let stateSpy!: ReturnType<typeof vi.spyOn>;
    let membersSpy!: ReturnType<typeof vi.spyOn>;
    const { w } = await mountPage({
      session: makeSession(),
      room: null,
      beforeMount: (store) => {
        stateSpy = vi.spyOn(store, 'refreshState');
        membersSpy = vi.spyOn(store, 'refreshMembers');
      },
    });

    // Precondition: this really IS the isInRoom=true / currentRoom=null state, so
    // the assertions below cannot pass merely because the page never got a session.
    const store = useSyncPlayStore();
    expect(store.isInRoom).toBe(true);
    expect(store.currentRoom).toBeNull();
    expect(w.find('.syncplay-page__section').exists()).toBe(true);

    expect(stateSpy).not.toHaveBeenCalled();
    expect(membersSpy).not.toHaveBeenCalled();
    expect(getState).not.toHaveBeenCalled();
    expect(getMembers).not.toHaveBeenCalled();
  });

  it('DOES refresh when both a session and a currentRoom are present', async () => {
    // Non-inertness control for the test above: the same two spies must FIRE on the
    // happy path, or "not called" would pass for the wrong reason.
    let stateSpy!: ReturnType<typeof vi.spyOn>;
    let membersSpy!: ReturnType<typeof vi.spyOn>;
    await mountPage({
      session: makeSession(),
      room,
      beforeMount: (store) => {
        stateSpy = vi.spyOn(store, 'refreshState');
        membersSpy = vi.spyOn(store, 'refreshMembers');
      },
    });
    expect(stateSpy).toHaveBeenCalledTimes(1);
    expect(stateSpy).toHaveBeenCalledWith(API_BASE);
    expect(membersSpy).toHaveBeenCalledTimes(1);
    expect(membersSpy).toHaveBeenCalledWith(API_BASE);
  });

  it('does NOT refresh when currentRoom is present but there is no session', async () => {
    // The OTHER half of the `&&`. This state is reachable in the store too:
    // `createAndJoinRoom` assigns `currentRoom` at :85 and only then awaits
    // `api.joinRoom()` before assigning `currentSession` at :87, so a failure in
    // between leaves a room with no session.
    let stateSpy!: ReturnType<typeof vi.spyOn>;
    let membersSpy!: ReturnType<typeof vi.spyOn>;
    const { w } = await mountPage({
      session: null,
      room,
      beforeMount: (store) => {
        stateSpy = vi.spyOn(store, 'refreshState');
        membersSpy = vi.spyOn(store, 'refreshMembers');
      },
    });
    const store = useSyncPlayStore();
    expect(store.isInRoom).toBe(false);
    expect(store.currentRoom).not.toBeNull();
    // …and with no session the page shows the empty state, not the room card.
    expect(w.find('.syncplay-page__empty').exists()).toBe(true);

    expect(stateSpy).not.toHaveBeenCalled();
    expect(membersSpy).not.toHaveBeenCalled();
    expect(getState).not.toHaveBeenCalled();
    expect(getMembers).not.toHaveBeenCalled();
  });

  it('renders the room card and name', async () => {
    const { w } = await mountPage({
      session: makeSession(),
      room,
      members: [makeUser(), makeUser({ id: 'u2', name: 'Grace', role: 'contributor' })],
    });
    expect(w.find('.syncplay-page__section').exists()).toBe(true);
    expect(w.find('.syncplay-page__room-name').text()).toBe('Movie Night');
    expect(w.find('.syncplay-page__empty').exists()).toBe(false);
  });

  /**
   * ✅ FIXED in S134 — this was S160's deliberate tripwire, now flipped.
   *
   * `syncplay.members` is authored as `'{count} member | {count} members'`.
   * `createTranslator` used to ONLY interpolate, with no knowledge of the `|`
   * separator, so both call sites on this page rendered the separator and BOTH
   * forms to the user — the literal on-screen text `2 member | 2 members`. S160
   * pinned that with `.toContain('|')` precisely so the fix could not land
   * silently, and it duly went red the moment plural selection was implemented.
   *
   * The tripwire is KEPT, inverted rather than removed: `.not.toContain('|')` is
   * still a real assertion (a regression that reinstates raw-template output goes
   * straight back to red), and the exact-text `toBe` assertions below still pin
   * which form was chosen — `.not.toContain('|')` alone would pass on an empty
   * string or on the wrong number form.
   *
   * Selection runs through `Intl.PluralRules` (src/utils/plural.ts), not `=== 1`.
   */
  it('selects the plural form for the member count and emits no separator', async () => {
    const { w } = await mountPage({
      session: makeSession(),
      room,
      members: [makeUser(), makeUser({ id: 'u2', name: 'Grace', role: 'contributor' })],
    });
    expect(w.find('.syncplay-page__room-meta').text()).toBe('2 members');
    expect(w.find('.syncplay-page__members-title').text()).toBe('2 members');
    // Inverted tripwire: a correctly-pluralised string can never contain the
    // separator, so this fails again if raw-template output ever comes back.
    expect(w.find('.syncplay-page__room-meta').text()).not.toContain('|');
    expect(w.find('.syncplay-page__members-title').text()).not.toContain('|');
  });

  it('selects the singular form for exactly one member', async () => {
    const { w } = await mountPage({ session: makeSession(), room, members: [makeUser()] });
    expect(w.find('.syncplay-page__room-meta').text()).toBe('1 member');
    expect(w.find('.syncplay-page__room-meta').text()).not.toContain('|');
  });

  /**
   * Zero is the `other` category in English, so it takes the PLURAL form. This is
   * the case a `count === 1 ? …` hand-roll also happens to get right, and it is
   * here so the helper's behaviour is pinned at the boundary rather than assumed.
   */
  it('selects the plural form for zero members', async () => {
    const { w } = await mountPage({ session: makeSession(), room, members: [] });
    expect(w.find('.syncplay-page__members-title').text()).toBe('0 members');
  });

  it('renders one row per member with an uppercased initial avatar', async () => {
    const { w } = await mountPage({
      session: makeSession(),
      room,
      members: [makeUser({ name: 'ada' }), makeUser({ id: 'u2', name: 'Grace' })],
    });
    const rows = w.findAll('.syncplay-page__member');
    expect(rows.length).toBe(2);
    expect(rows[0]!.find('.syncplay-page__member-avatar').text()).toBe('A');
    expect(rows[0]!.find('.syncplay-page__member-name').text()).toBe('ada');
    expect(rows[1]!.find('.syncplay-page__member-avatar').text()).toBe('G');
  });

  it.each([
    ['owner', 'Owner'],
    ['editor', 'Moderator'],
    ['contributor', 'Member'],
    ['none', 'Member'],
  ] as const)('maps the %s role to the label %s', async (role, label) => {
    const { w } = await mountPage({
      session: makeSession(),
      room,
      members: [makeUser({ role })],
    });
    expect(w.find('.syncplay-page__member-role').text()).toBe(label);
  });

  it('falls back to the raw role string for a value outside the union', async () => {
    const { w } = await mountPage({
      session: makeSession(),
      room,
      members: [makeUser({ role: 'archivist' as never })],
    });
    expect(w.find('.syncplay-page__member-role').text()).toBe('archivist');
  });
});

describe('SyncPlayPage — sync status badge', () => {
  const room = { id: 'room-1', name: 'Movie Night', isPublic: true, memberCount: 1 };

  /** The `name` the badge's own Icon was rendered with (the `statusIcon` computed). */
  function badgeIconName(w: VueWrapper): string | undefined {
    const badge = w.find('.syncplay-page__status-badge').element;
    return w
      .findAllComponents(Icon)
      .find((i) => badge.contains(i.element))
      ?.props('name') as string | undefined;
  }

  it('shows Synced with a check icon while paused (drift is 0 by definition)', async () => {
    const { w, store } = await mountPage({ session: makeSession({ state: 'paused' }), room });
    expect(store.syncStatus).toBe('synced');
    const badge = w.find('.syncplay-page__status-badge');
    expect(badge.classes()).toContain('syncplay-page__status-badge--synced');
    expect(badge.text()).toContain('Synced');
    expect(badgeIconName(w)).toBe('check');
  });

  it('shows Re-syncing… with a spinner icon while the session is waiting', async () => {
    const { w, store } = await mountPage({ session: makeSession({ state: 'waiting' }), room });
    expect(store.syncStatus).toBe('re-syncing');
    const badge = w.find('.syncplay-page__status-badge');
    expect(badge.classes()).toContain('syncplay-page__status-badge--re-syncing');
    expect(badge.text()).toContain('Re-syncing');
    expect(badgeIconName(w)).toBe('spinner');
  });

  it('shows Out of sync with an alert icon once drift exceeds the threshold', async () => {
    // `refreshState()` on mount re-anchors the drift clock to `Date.now()`, so
    // elapsed ≈ 0 and the expected server position is ≈ `playbackPosition` (0).
    // Reporting a local position of 100 s therefore yields a deterministic drift
    // of ≈ 100 s, far past SYNC_DRIFT_THRESHOLD_SECONDS (2) — no wall-clock
    // dependence, and it moves the SAME `driftAmount` the badge reads.
    const { w, store } = await mountPage({ session: makeSession({ state: 'playing' }), room });
    expect(store.syncStatus).toBe('synced');

    store.updateLocalPosition(100);
    await flushPromises();

    expect(store.driftAmount).toBeGreaterThan(2);
    expect(store.syncStatus).toBe('outOfSync');
    const badge = w.find('.syncplay-page__status-badge');
    expect(badge.classes()).toContain('syncplay-page__status-badge--outOfSync');
    expect(badge.text()).toContain('Out of sync');
    expect(badgeIconName(w)).toBe('alert');
  });
});

describe('SyncPlayPage — leaving a room', () => {
  const room = { id: 'room-1', name: 'Movie Night', isPublic: true, memberCount: 1 };

  it('leaves through the store against the media API base and clears the room', async () => {
    const { w, store } = await mountPage({ session: makeSession(), room, members: [makeUser()] });
    const { getSyncPlayApi } = await import('../api/syncplay');
    (getSyncPlayApi as unknown as ReturnType<typeof vi.fn>).mockClear();

    await findBtn(w, 'Leave room')!.trigger('click');
    await flushPromises();

    expect(leaveRoomApi).toHaveBeenCalledWith('room-1');
    // The page must hand the MEDIA api base down, not '' — on the hub this is the
    // relay-proxy base and leaving against '' would hit the wrong origin.
    expect(getSyncPlayApi).toHaveBeenCalledWith(API_BASE);
    expect(closeConnection).toHaveBeenCalled();
    expect(store.currentRoom).toBeNull();
    expect(store.currentSession).toBeNull();
    expect(store.members).toEqual([]);
    // …and the view falls back to the empty state.
    expect(w.find('.syncplay-page__empty').exists()).toBe(true);
  });

  it('does not even dispatch the leave action when there is no current room', async () => {
    // `handleLeaveRoom` is guarded on `currentRoom`; with a session but no room the
    // button IS rendered (the `v-if` is `isInRoom`, which keys off the SESSION) and
    // must still not issue a leave.
    //
    // The store's own `leaveRoom` opens with the SAME `if (!currentRoom) return`,
    // so asserting only "the network was not touched" cannot tell the page's guard
    // apart from the store's — a mutation that deletes the page guard survives that
    // assertion. Spying on the action makes the PAGE the subject.
    const { w, store } = await mountPage({ session: makeSession(), room: null });
    const leaveSpy = vi.spyOn(store, 'leaveRoom');
    expect(w.find('.syncplay-page__section').exists()).toBe(true);

    await findBtn(w, 'Leave room')!.trigger('click');
    await flushPromises();

    expect(leaveSpy).not.toHaveBeenCalled();
    expect(leaveRoomApi).not.toHaveBeenCalled();
  });

  it('dispatches the leave action exactly once when a room IS present', async () => {
    // The non-inertness control for the test above: the same spy must FIRE on the
    // happy path, otherwise "not called" would pass for the wrong reason.
    const { w, store } = await mountPage({ session: makeSession(), room });
    const leaveSpy = vi.spyOn(store, 'leaveRoom');
    await findBtn(w, 'Leave room')!.trigger('click');
    await flushPromises();
    expect(leaveSpy).toHaveBeenCalledTimes(1);
    expect(leaveSpy).toHaveBeenCalledWith(API_BASE);
  });
});

// ── S285: the modal's `joined` event is CONSUMED here ─────────────────────────
//
// `SyncPlayModal` has declared a `joined` emit since it was written, and no
// mount site anywhere in the repo listened for it — this page and `Player.vue`
// both mounted the modal with only `v-model`. S283 made the emit reachable and
// correct on both the create and the join arm; it still fed nothing. These tests
// assert what the page now DOES with it, not that the event fires (that is the
// modal's own suite).

describe('SyncPlayPage — consuming the modal\'s `joined` event (S285)', () => {
  const joinedRoom = { id: 'room-xyz', name: 'Movie Night', isPublic: true, memberCount: 3 };

  it('is wired at all — the mounted modal has a `joined` listener', async () => {
    const { w } = await mountPage();
    // Vue exposes a listener as an `onJoined` prop on the child vnode. Without
    // `@joined` on the template this is undefined, which is precisely the state
    // the page shipped in.
    expect(modalStub(w).vm.$.vnode.props?.['onJoined']).toBeTypeOf('function');
  });

  it('announces the joined room BY NAME, from the event payload', async () => {
    const { w } = await mountPage();
    const toasts = useToastStore();
    expect(toasts.toasts).toHaveLength(0);

    modalStub(w).vm.$emit('joined', joinedRoom);
    await flushPromises();

    expect(toasts.toasts).toHaveLength(1);
    expect(toasts.toasts[0]!.message).toBe('Joined Movie Night');
    expect(toasts.toasts[0]!.tone).toBe('success');
  });

  it('CONTROL — a different room produces a different message', async () => {
    // Guards the assertion above against a hard-coded string: the name must come
    // from the payload, so a payload change must change the output.
    const { w } = await mountPage();
    modalStub(w).vm.$emit('joined', { ...joinedRoom, name: 'Book Club' });
    await flushPromises();
    expect(useToastStore().toasts[0]!.message).toBe('Joined Book Club');
  });

  it('retires the join-link: `?room=` is stripped and the prefill cleared', async () => {
    // Without this, reloading the page (or navigating back to it) re-opens the
    // join dialog for a room the user is already in — `onMounted` reads the same
    // query param every time.
    const { w, router } = await mountPage({ query: '?room=room-xyz' });
    expect(modalStub(w).props('prefilledRoomId')).toBe('room-xyz');
    expect(router.currentRoute.value.query['room']).toBe('room-xyz');

    modalStub(w).vm.$emit('joined', joinedRoom);
    await flushPromises();

    expect(router.currentRoute.value.query['room']).toBeUndefined();
    expect(modalStub(w).props('prefilledRoomId')).toBeUndefined();
  });

  it('keeps every OTHER query param while stripping `room`', async () => {
    // `router.replace({ query: rest })` replaces the whole query object, so a
    // spread that dropped the siblings would silently lose them.
    const { w, router } = await mountPage({ query: '?room=room-xyz&t=42' });
    modalStub(w).vm.$emit('joined', joinedRoom);
    await flushPromises();

    expect(router.currentRoute.value.query['room']).toBeUndefined();
    expect(router.currentRoute.value.query['t']).toBe('42');
  });

  it('does not touch the URL when there was no `?room=` to consume', async () => {
    const { w, router } = await mountPage({ query: '?t=42' });
    const replaceSpy = vi.spyOn(router, 'replace');
    modalStub(w).vm.$emit('joined', joinedRoom);
    await flushPromises();

    expect(replaceSpy).not.toHaveBeenCalled();
    expect(router.currentRoute.value.query['t']).toBe('42');
    // …but the join was still announced, so "did nothing" is not the outcome.
    expect(useToastStore().toasts).toHaveLength(1);
  });
});
