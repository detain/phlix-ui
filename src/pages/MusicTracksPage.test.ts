/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref } from 'vue';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import MusicTracksPage from './MusicTracksPage.vue';

const holder = vi.hoisted(() => ({ player: null as unknown }));
vi.mock('../composables/useMusicPlayer', () => ({
  useMusicPlayer: () => holder.player,
}));

function makeFakePlayer(over: Record<string, unknown> = {}) {
  return {
    queue: ref([]),
    currentTrack: ref(null),
    currentIndex: ref(-1),
    playing: ref(false),
    position: ref(0),
    duration: ref(0),
    loading: ref(false),
    error: ref(null),
    crossfading: ref(false),
    hasNext: ref(false),
    hasPrev: ref(false),
    loadTracks: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    toggle: vi.fn(),
    stop: vi.fn(),
    next: vi.fn(),
    previous: vi.fn(),
    seek: vi.fn(),
    dispose: vi.fn(),
    ...over,
  };
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

interface RawTrack { id: string; name: string; duration_secs: number; track_number: number | null; stream_url?: string; }

function rawTrack(id: string, name: string): RawTrack {
  return { id, name, duration_secs: 200, track_number: 1, stream_url: `/media/${id}/stream?sig=x` };
}

function stubFetch(opts: { tracks?: RawTrack[]; total?: number; error?: boolean; hang?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/music/tracks')) {
      if (opts.hang) return new Promise<Response>(() => {});
      if (opts.error) return Promise.reject(new Error('tracks down'));
      const tracks = opts.tracks ?? [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Paranoid Android')];
      return Promise.resolve(jsonResponse({ tracks, total: opts.total ?? tracks.length }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

function mountPage(): VueWrapper {
  return mount(MusicTracksPage, {
    global: {
      provide: { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
  holder.player = makeFakePlayer();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MusicTracksPage', () => {
  it('loads tracks from GET /api/v1/music/tracks and renders rows', async () => {
    const fetchFn = stubFetch();
    const w = mountPage();
    await flushPromises();
    const url = String(fetchFn.mock.calls[0][0]);
    expect(url).toContain('/api/v1/music/tracks');
    expect(url).toContain('limit=100');
    expect(url).toContain('offset=0');
    expect(w.findAll('.track-row')).toHaveLength(2);
    expect(w.find('.tracks-page__count').text()).toContain('2 tracks');
    w.unmount();
  });

  it('shows the loading skeleton while the first request is in flight', async () => {
    stubFetch({ hang: true });
    const w = mountPage();
    await Promise.resolve();
    expect(w.find('.tracks-page__loading').exists()).toBe(true);
    w.unmount();
  });

  it('shows the empty state when there are no tracks', async () => {
    stubFetch({ tracks: [], total: 0 });
    const w = mountPage();
    await flushPromises();
    expect(w.find('.tracks-page__empty').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state (no rows) when the load errors', async () => {
    stubFetch({ error: true });
    const w = mountPage();
    await flushPromises();
    expect(w.find('.track-row').exists()).toBe(false);
    expect(w.find('.tracks-page__empty').exists()).toBe(true);
    w.unmount();
  });

  it('filters the visible rows by the search query', async () => {
    stubFetch({ tracks: [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Paranoid Android')] });
    const w = mountPage();
    await flushPromises();
    await w.find('.search-box__input').setValue('paranoid');
    const rows = w.findAll('.track-row');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('Paranoid Android');
    w.unmount();
  });

  it('plays a track through the shared player when its play button is clicked', async () => {
    stubFetch();
    const w = mountPage();
    await flushPromises();
    await w.findAll('.track-row__play')[0].trigger('click');
    const player = holder.player as ReturnType<typeof makeFakePlayer>;
    expect(player.loadTracks).toHaveBeenCalled();
    expect(player.play).toHaveBeenCalledTimes(1);
    expect((player.play.mock.calls[0][0] as { id: string }).id).toBe('t1');
    w.unmount();
  });

  it('paginates: the next page refetches with a bumped offset', async () => {
    const fetchFn = stubFetch({ tracks: [rawTrack('t1', 'A'), rawTrack('t2', 'B')], total: 250 });
    const w = mountPage();
    await flushPromises();
    // total (250) > limit (100) → pagination controls render.
    expect(w.find('.pagination').exists()).toBe(true);
    // Second pagination button is "Next".
    await w.findAll('.pagination__btn')[1].trigger('click');
    await flushPromises();
    const lastUrl = String(fetchFn.mock.calls[fetchFn.mock.calls.length - 1][0]);
    expect(lastUrl).toContain('offset=100');
    w.unmount();
  });
});
