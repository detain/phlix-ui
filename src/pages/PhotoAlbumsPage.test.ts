/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import PhotoAlbumsPage from './PhotoAlbumsPage.vue';
import type { PhotoAlbum } from '../types/photo';

// ---------------------------------------------------------------------------
// Test data + fetch stub
// ---------------------------------------------------------------------------

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function album(over: Partial<PhotoAlbum> = {}): PhotoAlbum {
  return {
    id: 'alb1',
    date: '2024-03-15',
    photo_count: 5,
    cover_photo: {
      id: 'p1',
      name: 'p1.jpg',
      path: '/p1.jpg',
      thumbnail_url: 'thumb.jpg',
      full_url: 'full.jpg',
    },
    photos: [],
    ...over,
  };
}

/**
 * Stub fetch for BOTH the libraries read endpoint (the store loads first) and
 * the photo albums endpoint. `error`/`hang` scope the albums response only.
 */
function stubFetch(opts: {
  libraries?: Array<{ id: string; name: string; type: string }>;
  albums?: PhotoAlbum[];
  error?: boolean;
  hang?: boolean;
} = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/libraries')) {
      return Promise.resolve(jsonResponse({
        libraries: opts.libraries ?? [{ id: 'lib1', name: 'My Photos', type: 'photo' }],
      }));
    }
    if (u.includes('/api/v1/photo/albums')) {
      if (opts.hang) return new Promise<Response>(() => {});
      if (opts.error) return Promise.reject(new Error('albums down'));
      return Promise.resolve(jsonResponse({ albums: opts.albums ?? [album()] }));
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
    ],
  });
}

function mountPage(router: Router): VueWrapper {
  return mount(PhotoAlbumsPage, {
    global: {
      plugins: [router, createPinia()],
      provide: { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

beforeEach(() => {
  setActivePinia(createPinia());
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('PhotoAlbumsPage', () => {
  it('loads libraries then albums on mount and renders album cards', async () => {
    const fetchFn = stubFetch({ albums: [album({ id: 'a1', date: '2024-03-15' })] });
    const w = mountPage(makeRouter());
    await flushPromises();

    expect(fetchFn.mock.calls.some((c) => String(c[0]).includes('/api/v1/libraries'))).toBe(true);
    expect(fetchFn.mock.calls.some((c) => String(c[0]).includes('/api/v1/photo/albums'))).toBe(true);
    const cards = w.findAll('.album-card');
    expect(cards).toHaveLength(1);
    expect(cards[0].text()).toContain('2024-03-15');
    expect(cards[0].text()).toContain('5 photos');
    w.unmount();
  });

  it('shows the loading spinner while albums are in flight', async () => {
    stubFetch({ hang: true });
    const w = mountPage(makeRouter());
    // Let the libraries load resolve so libraryId is set and loadAlbums starts.
    await flushPromises();
    expect(w.find('.loading-state').exists()).toBe(true);
    expect(w.find('.album-card').exists()).toBe(false);
    w.unmount();
  });

  it('shows the empty state when the library has no albums', async () => {
    stubFetch({ albums: [] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.text()).toContain('No Albums Yet');
    expect(w.find('.album-card').exists()).toBe(false);
    w.unmount();
  });

  it('shows the error state when the albums load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.text()).toContain('albums down');
    w.unmount();
  });

  it('navigates to the path-based album route when a card is clicked', async () => {
    stubFetch({ albums: [album({ id: 'alb42', date: '2024-05-01' })] });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router);
    await flushPromises();

    await w.find('.album-card').trigger('click');
    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/app/photo/album/alb42' }),
    );
    w.unmount();
  });
});
