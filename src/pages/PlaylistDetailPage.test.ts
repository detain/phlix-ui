/**
 * PlaylistDetailPage (R13-01) — one playlist over GET /api/v1/collections/{id}.
 *
 * Pins the raw-row truth: the envelope's items are unshaped DB rows, so the
 * page paints {id,name,type} tiles immediately and ENRICHES each through
 * GET /api/v1/media/{id} (bounded); a failed enrichment keeps the raw tile so
 * the remove affordance stays reachable. Also pins remove-item and the
 * delete-playlist confirm (R13-10 cleanup path on the member surface), and the
 * Option-A MANAGEABILITY law: visibility ≠ modifiability — foreign-owned and
 * legacy NULL-owner rows render read-only for members (the write endpoints
 * 404 for them server-side), while admins manage every row.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import PlaylistDetailPage from './PlaylistDetailPage.vue';
import type { ApiClient } from '../api/client';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { clearMediaItemCache } from '../composables/useMediaItemCache';
import type { MediaItem } from '../types/media-item';

function shaped(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: null,
    genres: [],
    year: 2021,
    rating: null,
    runtime: 155,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    library_id: 'lib-1',
    ...over,
  };
}

const detail = {
  collection: {
    id: 'pl1',
    name: 'Faves',
    library_id: 'lib-1',
    smart_playlist_id: null,
    created_at: '2026-10-01 10:00:00',
    updated_at: '2026-10-02 10:00:00',
    created_by: 'u1',
  },
  items: [
    { id: 'm1', name: 'Dune', type: 'movie' },
    { id: 'm2', name: 'Arrival', type: 'movie' },
  ],
  total: 2,
};

function fakeClient(
  opts: { detailError?: Error; detailFetchFails?: boolean; createdBy?: string | null } = {},
) {
  const collection =
    'createdBy' in opts
      ? { ...detail.collection, created_by: opts.createdBy }
      : detail.collection;
  return {
    getPlaylist: vi.fn().mockImplementation(() =>
      opts.detailError
        ? Promise.reject(opts.detailError)
        : Promise.resolve({ ...detail, collection }),
    ),
    get: vi.fn().mockImplementation((url: string) => {
      if (opts.detailFetchFails) return Promise.reject(new Error('media down'));
      const id = url.split('/').pop() ?? '';
      return Promise.resolve({ item: shaped({ id, name: id === 'm2' ? 'Arrival' : 'Dune' }) });
    }),
    removeFromPlaylist: vi.fn().mockResolvedValue({ message: 'Item removed from collection' }),
    deletePlaylist: vi.fn().mockResolvedValue({ message: 'ok' }),
    addToPlaylist: vi.fn().mockResolvedValue({ message: 'ok' }),
  } as unknown as ApiClient;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/playlists', name: 'playlists', component: stub },
      { path: '/app/playlists/:id', name: 'playlist', component: stub },
      { path: '/app/media/:id', name: 'media', component: stub },
      { path: '/app/player/:id', name: 'player', component: stub },
    ],
  });
}

const MediaCardStub = {
  name: 'MediaCard',
  props: ['item'],
  template: '<div class="media-card-stub">{{ item.name }}</div>',
};

async function mountPage(client: ApiClient, router: Router): Promise<VueWrapper> {
  await router.push('/app/playlists/pl1');
  await router.isReady();
  return mount(PlaylistDetailPage, {
    props: { client },
    attachTo: document.body,
    global: {
      plugins: [router],
      provide: { apiBase: '', mediaApiBase: '' },
      stubs: { MediaCard: MediaCardStub },
    },
  });
}

/** Seed the auth session BEFORE mount — the page reads `auth.user?.id` and
 *  `auth.isAdmin` through useAuthStore (pinia must already be active). */
function signIn(user: { id: string; is_admin?: boolean }): void {
  useAuthStore().user = user;
}

describe('PlaylistDetailPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.body.innerHTML = '';
    clearMediaItemCache();
    // Default session is the fixture's OWNER (created_by 'u1'): the delete and
    // remove affordances pin the manageable path. The manageability law tests
    // below re-sign-in per case.
    signIn({ id: 'u1' });
  });

  it('paints raw rows instantly, then enriches each through GET /api/v1/media/:id', async () => {
    const client = fakeClient();
    const w = await mountPage(client, makeRouter());
    // While the collection request is in flight the page shows the spinner,
    // not a false-empty grid.
    expect(w.findAll('.media-card-stub').length).toBe(0);
    await flushPromises();

    expect(w.findAll('.media-card-stub').length).toBe(2);
    expect(client.get).toHaveBeenCalledTimes(2);
    expect(String((client.get as ReturnType<typeof vi.fn>).mock.calls[0][0])).toContain(
      '/api/v1/media/',
    );
    // Enriched item carries the shaped year (raw row does not) — tile re-rendered.
    expect(w.text()).toContain('Dune');
    expect(w.text()).toContain('Arrival');
  });

  it('a failed detail fetch keeps the raw tile (remove affordance stays reachable)', async () => {
    const client = fakeClient({ detailFetchFails: true });
    const w = await mountPage(client, makeRouter());
    await flushPromises();

    expect(w.findAll('.media-card-stub').length).toBe(2);
    expect(w.findAll('.playlist-detail__remove').length).toBe(2);
  });

  it('remove → DELETE items route, tile drops out, success toast', async () => {
    const client = fakeClient();
    const w = await mountPage(client, makeRouter());
    await flushPromises();

    await w.findAll('.playlist-detail__remove')[0].trigger('click');
    await flushPromises();

    expect(client.removeFromPlaylist).toHaveBeenCalledWith('pl1', 'm1');
    expect(w.findAll('.media-card-stub').length).toBe(1);
  });

  it('remove toast carries Undo that re-adds via addToPlaylist and restores the tile in place (UI-56)', async () => {
    const client = fakeClient();
    const w = await mountPage(client, makeRouter());
    await flushPromises();
    const toasts = useToastStore();

    await w.findAll('.playlist-detail__remove')[0].trigger('click');
    await flushPromises();
    expect(w.findAll('.media-card-stub').length).toBe(1);
    const toast = toasts.toasts.find((x) => x.tone === 'success' && x.action !== undefined);
    expect(toast?.action?.label).toBe('Undo');

    toast?.action?.onClick();
    await flushPromises();
    expect(client.addToPlaylist).toHaveBeenCalledWith('pl1', 'm1');
    expect(w.findAll('.media-card-stub').length).toBe(2);
    expect(w.findAllComponents(MediaCardStub)[0].props('item').id).toBe('m1');
  });

  it('delete playlist → confirm modal names the playlist; confirm hits DELETE and routes back to the list', async () => {
    const client = fakeClient();
    const router = makeRouter();
    const w = await mountPage(client, router);
    await flushPromises();

    await w.findAll('button').find((b) => b.text() === 'Delete playlist')!.trigger('click');
    await flushPromises();
    // Modal teleports to body; the confirm names the target.
    expect(document.body.textContent).toContain('Delete playlist');
    expect(document.body.textContent).toContain('Faves');

    const confirm = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Delete',
    );
    (confirm as HTMLButtonElement).click();
    await flushPromises();

    expect(client.deletePlaylist).toHaveBeenCalledWith('pl1');
    expect(router.currentRoute.value.name).toBe('playlists');
    expect(w.findAll('.media-card-stub').length).toBe(2); // no optimistic list purge
  });

  it('load failure surfaces the reason instead of an empty playlist', async () => {
    const client = fakeClient({ detailError: new Error('playlist vanished') });
    const w = await mountPage(client, makeRouter());
    await flushPromises();
    expect(w.text()).toContain('Couldn’t load this playlist');
    expect(w.text()).toContain('playlist vanished');
  });

  // ── Option-A manageability law (visibility ≠ modifiability) ────────────────
  // Server CollectionController gates update/delete/item-add/item-remove on
  // {created_by = actor} ∪ admin; NULL-owner rows are admin-manage-only. These
  // mount real pages and assert the AFFORDANCES track that law — an ungated
  // Delete/Remove on a row the server would 404 is a guaranteed dead-end click.

  it('NULL-owner (legacy shared) row: member sees no delete, no per-item remove', async () => {
    signIn({ id: 'u1' });
    const client = fakeClient({ createdBy: null });
    const w = await mountPage(client, makeRouter());
    await flushPromises();

    expect(w.text()).toContain('Faves'); // readable — the row still renders
    expect(w.findAll('.playlist-detail__remove').length).toBe(0);
    const deletePlaylistBtn = w.findAll('button').find((b) => b.text() === 'Delete playlist');
    expect(deletePlaylistBtn).toBeUndefined();
    expect(w.text()).toContain('Shared playlist');
  });

  it('foreign-owned row: member sees no delete and no per-item remove', async () => {
    signIn({ id: 'someone-else' });
    const client = fakeClient({ createdBy: 'u1' });
    const w = await mountPage(client, makeRouter());
    await flushPromises();

    expect(w.text()).toContain('Faves');
    expect(w.findAll('.playlist-detail__remove').length).toBe(0);
    const deletePlaylistBtn = w.findAll('button').find((b) => b.text() === 'Delete playlist');
    expect(deletePlaylistBtn).toBeUndefined();
  });

  it('foreign-owned row: ADMIN sees delete + per-item remove and can use them', async () => {
    signIn({ id: 'admin-1', is_admin: true });
    const client = fakeClient({ createdBy: 'u1' });
    const w = await mountPage(client, makeRouter());
    await flushPromises();

    expect(w.findAll('.playlist-detail__remove').length).toBe(2);
    await w.findAll('.playlist-detail__remove')[0].trigger('click');
    await flushPromises();
    expect(client.removeFromPlaylist).toHaveBeenCalledWith('pl1', 'm1');

    const deletePlaylistBtn = w.findAll('button').find((b) => b.text() === 'Delete playlist');
    expect(deletePlaylistBtn).toBeDefined();
  });

  it('own row: owner sees delete + per-item remove (regression pin)', async () => {
    signIn({ id: 'u1' });
    const client = fakeClient({ createdBy: 'u1' });
    const w = await mountPage(client, makeRouter());
    await flushPromises();

    expect(w.findAll('.playlist-detail__remove').length).toBe(2);
    const deletePlaylistBtn = w.findAll('button').find((b) => b.text() === 'Delete playlist');
    expect(deletePlaylistBtn).toBeDefined();
  });

  // CU-090 (ui__enduser #2): the grid rendered a BARE <MediaCard :item> — its
  // Play/info/watchlist/watched affordances emitted into the void. These pins
  // prove the page now answers the member protocol. RED AT PARENT: the stub
  // card's $emit reached no listener; the route never changed.
  it('card Play navigates to the player (movies resolve to themselves)', async () => {
    const client = fakeClient();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(client, router);
    await flushPromises();

    w.findAllComponents(MediaCardStub)[0].vm.$emit('play', shaped({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm1' } });
  });

  it('card Info navigates to the media detail route', async () => {
    const client = fakeClient();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(client, router);
    await flushPromises();

    w.findAllComponents(MediaCardStub)[0].vm.$emit('info', shaped({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'media', params: { id: 'm1' } });
  });

  it('card watchlist re-emit toasts the persisted state without a second toggle', async () => {
    const client = fakeClient();
    const w = await mountPage(client, makeRouter());
    await flushPromises();
    const userItemData = useUserItemDataStore();
    const toasts = useToastStore();
    // The card already flipped the store (favorite ON) before re-emitting.
    userItemData.hydrate(shaped({ id: 'm1', user_data: { favorite: true, rating: null } }));

    w.findAllComponents(MediaCardStub)[0].vm.$emit('watchlist', shaped({ id: 'm1', name: 'Dune' }));
    expect(
      toasts.toasts.some(
        (t) => t.tone === 'success' && t.message.includes('Dune') && /my list/i.test(t.message),
      ),
    ).toBe(true);
    expect(userItemData.isFavorite('m1')).toBe(true); // no double-flip
  });

  it('card mark-watched re-emit reports the resulting watched state', async () => {
    const client = fakeClient();
    const w = await mountPage(client, makeRouter());
    await flushPromises();
    const userItemData = useUserItemDataStore();
    const toasts = useToastStore();
    userItemData.hydrate(
      shaped({ id: 'm1', user_data: { favorite: false, watched: true, rating: null } }),
    );

    w.findAllComponents(MediaCardStub)[0]
      .vm.$emit('mark-watched', shaped({ id: 'm1', name: 'Dune' }));
    expect(
      toasts.toasts.some((t) => t.tone === 'success' && t.message === 'Marked “Dune” as watched.'),
    ).toBe(true);
  });

  // CU-091 (ui__enduser #6): a playlist you assembled for a viewing sequence
  // could not be STARTED from its own page. The header Play begins the list at
  // its first title through the same resolve path as a card Play.
  it('header Play opens the player at the first item (CU-091)', async () => {
    const client = fakeClient();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(client, router);
    await flushPromises();

    const play = w.findAll('button').find((b) => b.text() === 'Play');
    expect(play).toBeDefined();
    await play!.trigger('click');
    await flushPromises();

    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm1' } });
  });

  it('read-only shared playlist still offers header Play — manageability gates writes, not watching (CU-091)', async () => {
    signIn({ id: 'someone-else' });
    const client = fakeClient({ createdBy: 'u1' });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(client, router);
    await flushPromises();

    // The write affordance is gone for members…
    expect(w.findAll('button').find((b) => b.text() === 'Delete playlist')).toBeUndefined();
    // …but the list is still WATCHABLE — hiding Play here would gate reading
    // behavior through a manageability control.
    const play = w.findAll('button').find((b) => b.text() === 'Play');
    expect(play).toBeDefined();
    await play!.trigger('click');
    await flushPromises();

    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm1' } });
  });

  // Banked w11L9 minor: BrowsePage pins the supersede law, but the SAME
  // playController/stale machinery lives on each page — a per-page clone so a
  // regression on THIS page reddens a test on THIS page.
  it('a rapid second Play supersedes the first (stale series resolve is discarded)', async () => {
    let release!: (eps: MediaItem[]) => void;
    const gate = new Promise<MediaItem[]>((res) => {
      release = res;
    });
    const client = fakeClient();
    const get = client.get as unknown as ReturnType<typeof vi.fn>;
    get.mockImplementation((url: string) => {
      // The series child-fetch hangs until the test releases it; a QUERY key,
      // not a path suffix — the enrichment URL has no query.
      if (String(url).includes('parentId=')) {
        return gate.then((eps) => ({ items: eps, total: eps.length }));
      }
      const id = String(url).split('/').pop() ?? '';
      return Promise.resolve({ item: shaped({ id, name: id === 'm2' ? 'Arrival' : 'Dune' }) });
    });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(client, router);
    await flushPromises();

    const card = w.findAllComponents(MediaCardStub)[0].vm;
    card.$emit('play', shaped({ id: 's1', name: 'Slow Series', type: 'series' }));
    await Promise.resolve();
    card.$emit('play', shaped({ id: 'm1', name: 'Dune' }));
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'player', params: { id: 'm1' } });

    release([shaped({ id: 'e1', name: 'Pilot', type: 'episode', season_number: 1, episode_number: 1 })]);
    await flushPromises();
    expect(push).not.toHaveBeenCalledWith({ name: 'player', params: { id: 'e1' } });
  });
});
