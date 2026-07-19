/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import PhotoAlbumPage from './PhotoAlbumPage.vue';
import type { PhotoAlbum, Photo } from '../types/photo';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function photo(over: Partial<Photo> = {}): Photo {
  return {
    id: 'p1',
    name: 'p1.jpg',
    path: '/p1.jpg',
    thumbnail_url: 'thumb.jpg',
    full_url: 'full.jpg',
    ...over,
  };
}

function album(over: Partial<PhotoAlbum> = {}): PhotoAlbum {
  return {
    id: 'alb1',
    date: '2024-03-15',
    photo_count: 2,
    photos: [photo({ id: 'p1' }), photo({ id: 'p2', name: 'p2.jpg' })],
    ...over,
  };
}

function stubFetch(opts: { album?: PhotoAlbum; error?: boolean; hang?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/photo/albums/')) {
      if (opts.hang) return new Promise<Response>(() => {});
      if (opts.error) return Promise.reject(new Error('album down'));
      return Promise.resolve(jsonResponse({ album: opts.album ?? album() }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/photo/albums', name: 'photo-albums', component: stub },
      { path: '/app/photo/album/:id', name: 'photo-album', component: stub },
      { path: '/app/photo/photo/:id', name: 'photo-view', component: stub },
    ],
  });
}

async function mountPage(router: Router, id = 'alb1', query: Record<string, string> = { library_id: 'lib1' }): Promise<VueWrapper> {
  await router.push({ path: `/app/photo/album/${id}`, query });
  await router.isReady();
  return mount(PhotoAlbumPage, {
    props: { id },
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('PhotoAlbumPage', () => {
  it('loads the album by :id (+library_id) and renders a photo grid', async () => {
    const fetchFn = stubFetch({ album: album() });
    const w = await mountPage(makeRouter());
    await flushPromises();

    const url = String(fetchFn.mock.calls[0][0]);
    expect(url).toContain('/api/v1/photo/albums/alb1');
    expect(url).toContain('library_id=lib1');
    expect(w.findAll('.photo-card')).toHaveLength(2);
    w.unmount();
  });

  it('shows the loading spinner while the album is in flight', async () => {
    stubFetch({ hang: true });
    const w = await mountPage(makeRouter());
    await Promise.resolve();
    expect(w.find('.loading-state').exists()).toBe(true);
    w.unmount();
  });

  it('shows the empty state for an album with no photos', async () => {
    stubFetch({ album: album({ photos: [], photo_count: 0 }) });
    const w = await mountPage(makeRouter());
    await flushPromises();
    expect(w.text()).toContain('No Photos');
    w.unmount();
  });

  it('shows the error state when the load fails', async () => {
    stubFetch({ error: true });
    const w = await mountPage(makeRouter());
    await flushPromises();
    expect(w.text()).toContain('album down');
    w.unmount();
  });

  it('navigates to the photo view when a photo is clicked', async () => {
    stubFetch({ album: album() });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(router);
    await flushPromises();

    await w.findAll('.photo-card')[1].trigger('click');
    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/app/photo/photo/p2' }),
    );
    w.unmount();
  });

  it('the back button returns to the albums listing', async () => {
    stubFetch({ album: album() });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(router);
    await flushPromises();

    await w.find('.back-button').trigger('click');
    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/app/photo/albums' }),
    );
    w.unmount();
  });

  it('the slideshow button navigates to the slideshow scoped to this album', async () => {
    stubFetch({ album: album() });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(router);
    await flushPromises();

    await w.find('.slideshow-button').trigger('click');
    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/app/photo/slideshow' }),
    );
    w.unmount();
  });
});
