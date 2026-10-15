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
  } as unknown as ApiClient;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/playlists', name: 'playlists', component: stub },
      { path: '/app/playlists/:id', name: 'playlist', component: stub },
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
});
