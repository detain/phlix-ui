/**
 * PlaylistsPage (R13-01) — member playlist list over GET /api/v1/collections.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import PlaylistsPage from './PlaylistsPage.vue';
import type { ApiClient, PlaylistSummary } from '../api/client';

function playlist(over: Partial<PlaylistSummary> = {}): PlaylistSummary {
  return {
    id: 'pl1',
    name: 'Faves',
    library_id: 'lib-1',
    smart_playlist_id: null,
    created_at: '2026-10-01 10:00:00',
    updated_at: '2026-10-02 10:00:00',
    created_by: 'u1',
    ...over,
  };
}

function fakeClient(list: PlaylistSummary[] | Error): ApiClient {
  return {
    getPlaylists: vi.fn().mockImplementation(() =>
      list instanceof Error ? Promise.reject(list) : Promise.resolve(list),
    ),
  } as unknown as ApiClient;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/playlists', name: 'playlists', component: stub },
      { path: '/app/playlists/:id', name: 'playlist', component: stub },
    ],
  });
}

async function mountPage(
  client: ApiClient,
  router: Router,
): Promise<VueWrapper> {
  await router.push('/app/playlists');
  await router.isReady();
  return mount(PlaylistsPage, {
    props: { client },
    attachTo: document.body,
    global: { plugins: [router], provide: { apiBase: '', mediaApiBase: '' } },
  });
}

describe('PlaylistsPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.body.innerHTML = '';
  });

  it('renders newest-updated first and links each tile to the detail route', async () => {
    const router = makeRouter();
    const w = await mountPage(
      fakeClient([
        playlist({ id: 'old', name: 'Older', updated_at: '2026-09-01 09:00:00' }),
        playlist({ id: 'new', name: 'Newest', updated_at: '2026-10-09 09:00:00' }),
      ]),
      router,
    );
    await flushPromises();

    const names = w.findAll('.playlist-tile__name').map((n) => n.text());
    expect(names).toEqual(['Newest', 'Older']);

    w.findAll('.playlist-tile')[1].trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.name).toBe('playlist');
    expect(router.currentRoute.value.params.id).toBe('old');
  });

  it('empty account → honest “No playlists yet” state', async () => {
    const w = await mountPage(fakeClient([]), makeRouter());
    await flushPromises();
    expect(w.text()).toContain('No playlists yet');
  });

  it('failed load → error state carries the reason (no silent empty list)', async () => {
    const w = await mountPage(fakeClient(new Error('collections down')), makeRouter());
    await flushPromises();
    expect(w.text()).toContain('Couldn’t load playlists');
    expect(w.text()).toContain('collections down');
  });
});
