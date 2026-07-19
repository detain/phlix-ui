/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import MusicArtistPage from './MusicArtistPage.vue';

interface ServerAlbum {
  name: string;
  artist: string;
  year?: number | null;
  track_count?: number;
}

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function stubFetch(opts: { artistName?: string; albums?: ServerAlbum[]; error?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    // Order matters: the more specific /artists/{name} check first.
    if (u.includes('/api/v1/music/artists/')) {
      if (opts.error) return Promise.reject(new Error('artist down'));
      return Promise.resolve(jsonResponse({ artist: { name: opts.artistName ?? 'Radiohead', album_count: 2 } }));
    }
    if (u.includes('/api/v1/music/albums')) {
      return Promise.resolve(jsonResponse({
        albums: opts.albums ?? [
          { name: 'OK Computer', artist: 'Radiohead', track_count: 12 },
          { name: 'Homework', artist: 'Daft Punk', track_count: 16 },
        ],
      }));
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
      { path: '/app/music/artists', name: 'music-artists', component: stub },
      { path: '/app/music/artist/:name', name: 'music-artist', component: stub },
      { path: '/app/music/album/:name', name: 'music-album', component: stub },
    ],
  });
}

function mountPage(router: Router, name = 'Radiohead'): VueWrapper {
  return mount(MusicArtistPage, {
    props: { name },
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: {
        Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' },
        MusicAlbumCard: {
          props: ['album'],
          emits: ['click'],
          template: '<button class="album-card" @click="$emit(\'click\', album)">{{ album.title }}</button>',
        },
      },
    },
  });
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MusicArtistPage', () => {
  it('loads the artist and its albums (filtered client-side by name)', async () => {
    const fetchFn = stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();

    expect(fetchFn.mock.calls.some((c) => String(c[0]).includes('/api/v1/music/artists/'))).toBe(true);
    expect(fetchFn.mock.calls.some((c) => String(c[0]).includes('/api/v1/music/albums'))).toBe(true);
    expect(w.find('.artist-header__name').text()).toBe('Radiohead');
    // Only the Radiohead album survives the client-side artist filter.
    const cards = w.findAll('.album-card');
    expect(cards).toHaveLength(1);
    expect(cards[0].text()).toContain('OK Computer');
    w.unmount();
  });

  it('shows the error state when the artist load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.artist-page__error').exists()).toBe(true);
    w.unmount();
  });

  it('shows the albums empty state when the artist has none', async () => {
    stubFetch({ albums: [{ name: 'Discovery', artist: 'Daft Punk', track_count: 14 }] });
    const w = mountPage(makeRouter());
    await flushPromises();
    // No album matches "Radiohead" → the section empty state renders.
    expect(w.find('.artist-albums__empty').exists()).toBe(true);
    expect(w.find('.album-card').exists()).toBe(false);
    w.unmount();
  });

  it('navigates to the music-album route with the album title on click', async () => {
    stubFetch();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router);
    await flushPromises();
    await w.find('.album-card').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'music-album', params: { name: 'OK Computer' } });
    w.unmount();
  });

  it('renders a back link to the artists listing', async () => {
    stubFetch();
    const w = mountPage(makeRouter());
    await flushPromises();
    const back = w.find('a.artist-page__back-link');
    expect(back.exists()).toBe(true);
    expect(back.attributes('href')).toContain('/app/music/artists');
    w.unmount();
  });
});
