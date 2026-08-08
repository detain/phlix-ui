/**
 * S285 — the member name, END TO END: signed-in account → wire → rendered row.
 *
 * The AC for "every SyncPlay member renders as Anonymous" is that a member's
 * REAL name renders, proved end to end rather than by stubbing the name into the
 * component. So this file deliberately mocks nothing in the middle:
 *
 *   `useAuthStore().user`
 *     → `useSyncPlayStore.joinRoom()`
 *       → the real `SyncPlayApi` → the real `ApiClient`
 *         → {@link makeSyncPlayServer}, which models `SyncPlayController` well
 *           enough to record `memberName` and echo it back inside `group.members`
 *           → `normalizeMembers()` → `store.members`
 *             → `src/pages/SyncPlayPage.vue`'s rendered member list.
 *
 * The page's OWN suite (`SyncPlayPage.test.ts`) mocks `../api/syncplay` wholesale
 * and seeds `store.members` by hand — which is exactly the shape that could not
 * see this defect: a fixture that already contains the right name proves nothing
 * about who put it there. Nothing here writes a member name; the only place
 * 'Ada Lovelace' is typed is the auth store.
 *
 * Only the WebSocket is faked, because jsdom would otherwise dial `:8097`.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import SyncPlayPage from './SyncPlayPage.vue';
import { useSyncPlayStore } from '../stores/useSyncPlayStore';
import { useAuthStore } from '../stores/useAuthStore';
import { closeSyncPlayConnection } from '../api/syncplay';
import { makeSyncPlayServer, type FakeSyncPlayServer } from '../api/test/syncplayServer';
import type { AuthUser } from '../api/client';

const BASE = 'https://media.example.com';
const GROUP_ID = 'sp_abc123';

// `getSyncPlayApi()` memoises ONE client per module instance and `ApiClient`
// binds `globalThis.fetch` at construction, so the global has to be a stable
// function that delegates to whichever server the current test built.
let server: FakeSyncPlayServer | null = null;
globalThis.fetch = ((url: string, init?: RequestInit): Promise<Response> => {
  if (!server) return Promise.reject(new Error('no fake SyncPlay server installed'));
  return server.fetch(url, init);
}) as unknown as typeof fetch;

class FakeWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;
  readyState = FakeWebSocket.OPEN;
  onopen: (() => void) | null = null;
  onmessage: ((e: MessageEvent) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((e: unknown) => void) | null = null;
  readonly sent: string[] = [];
  constructor(readonly url: string) {}
  send(data: string): void {
    this.sent.push(data);
  }
  close(): void {
    this.readyState = FakeWebSocket.CLOSED;
  }
}
globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;

const wrappers: VueWrapper[] = [];

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  server = makeSyncPlayServer(BASE);
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  closeSyncPlayConnection();
  vi.restoreAllMocks();
});

/** Mount the page against the store as it stands, with a real router. */
async function mountPage(): Promise<VueWrapper> {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/app/syncplay', name: 'syncplay', component: { template: '<div/>' } }],
  });
  await router.push('/app/syncplay');
  await router.isReady();

  const w = mount(SyncPlayPage, {
    attachTo: document.body,
    global: { plugins: [router], provide: { apiBase: BASE } },
  });
  wrappers.push(w);
  await flushPromises();
  return w;
}

/** The member names as the page actually paints them. */
function renderedNames(w: VueWrapper): string[] {
  return w.findAll('.syncplay-page__member-name').map((n) => n.text());
}

describe('S285 — a member renders under the signed-in account name', () => {
  it('renders the account name, having never been told it', async () => {
    // The ONLY place a display name is written in this test.
    useAuthStore().user = { id: 'u-1', name: 'Ada Lovelace' } as AuthUser;

    const store = useSyncPlayStore();
    await store.joinRoom(BASE, GROUP_ID);
    store.currentRoom = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 3 };

    // Mount AFTER the join: `onMounted` → `refresh()` → `refreshMembers()`
    // re-reads the group from `GET /groups/{id}`, so what renders below is the
    // list the SERVER holds, not the one the join response happened to return.
    const w = await mountPage();

    expect(renderedNames(w)).toEqual(['Alice', 'Bob', 'Ada Lovelace']);
    expect(renderedNames(w)).not.toContain('Anonymous');
    expect(renderedNames(w)).not.toContain('Guest');

    // The refresh really did happen — otherwise "the server holds it" would be
    // an unearned claim about a list the join alone could have produced.
    expect(server!.requests.map((r) => `${r.method} ${r.template}`)).toContain(
      'GET /api/v1/syncplay/groups/{id}',
    );

    // And the avatar initial is derived from the same string.
    expect(w.findAll('.syncplay-page__member-avatar').map((n) => n.text())).toEqual(['A', 'B', 'A']);
  });

  it('CONTROL — signed out, the SAME page renders the server default', async () => {
    // No user in the auth store. This is what every user saw before S285: the
    // client sent no name, so the server's own `'Guest'` placeholder is what
    // came back. Identical setup otherwise, so the test above cannot be passing
    // because of the fixture, the mount, or the refresh.
    const store = useSyncPlayStore();
    await store.joinRoom(BASE, GROUP_ID);
    store.currentRoom = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 3 };

    const w = await mountPage();

    expect(renderedNames(w)).toEqual(['Alice', 'Bob', 'Guest']);
    expect(renderedNames(w)).not.toContain('Ada Lovelace');
  });

  it('a DIFFERENT account renders a different row — the name is not a constant', async () => {
    useAuthStore().user = { id: 'u-2', username: 'grace.hopper' } as AuthUser;

    const store = useSyncPlayStore();
    await store.joinRoom(BASE, GROUP_ID);
    store.currentRoom = { id: GROUP_ID, name: 'Movie Night', isPublic: true, memberCount: 3 };

    const w = await mountPage();
    // `username` because this account carries no `name` — the fallback chain is
    // observable from the rendered page, not only from the resolver's unit test.
    expect(renderedNames(w)).toEqual(['Alice', 'Bob', 'grace.hopper']);
  });
});
