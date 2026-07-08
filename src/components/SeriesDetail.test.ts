/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router, RouterLink } from 'vue-router';
import { nextTick } from 'vue';
import { computed } from 'vue';
import SeriesDetail from './SeriesDetail.vue';
import MediaDetail from './MediaDetail.vue';
import { groupEpisodesBySeason } from './series-grouping';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'sh1',
    name: 'Breaking Bad',
    type: 'series',
    poster_url: 'series-poster.jpg',
    genres: ['Drama'],
    year: 2008,
    rating: 'R',
    runtime: null,
    overview: 'A chemistry teacher.',
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/media/:id', name: 'media', component: stub },
      { path: '/app/media/:id/season/:season', name: 'season', component: stub },
    ],
  });
}

const seasons = groupEpisodesBySeason([
  media({ id: 's1e1', type: 'episode', season_number: 1, episode_number: 1 }),
  media({ id: 's1e2', type: 'episode', season_number: 1, episode_number: 2 }),
  media({ id: 's2e1', type: 'episode', season_number: 2, episode_number: 1 }),
  media({ id: 'sp1', type: 'episode', season_number: 0, episode_number: 1 }),
]);

let router: Router;
beforeEach(async () => {
  setActivePinia(createPinia());
  localStorage.clear();
  router = makeRouter();
  router.push('/app/media/sh1');
  await router.isReady();
});
afterEach(() => {
  vi.restoreAllMocks();
});

function mountIt(
  props: Record<string, unknown> = {},
  provide: Record<string, unknown> = {},
  opts: Record<string, unknown> = {},
) {
  return mount(SeriesDetail, {
    props: { item: media(), seasons, ...props },
    global: {
      plugins: [router],
      components: { RouterLink },
      provide: {
        phlixConfig: { app: 'server', apiBase: '' },
        apiBase: '',
        mediaApiBase: computed(() => ''),
        mediaDirectBase: computed(() => ''),
        ...provide,
      },
    },
    ...opts,
  });
}

describe('SeriesDetail (U3)', () => {
  it('renders the series hero via MediaDetail', () => {
    const w = mountIt();
    expect(w.findComponent(MediaDetail).exists()).toBe(true);
    expect((w.findComponent(MediaDetail).props('item') as MediaItem).name).toBe('Breaking Bad');
  });

  it('renders one season card per season with correct labels and counts (Specials last)', () => {
    const w = mountIt();
    const labels = w.findAll('.media-card__caption-title').map((n) => n.text());
    expect(labels).toEqual(['Season 1', 'Season 2', 'Specials']);
    const counts = w.findAll('.media-card__caption-sub').map((n) => n.text());
    expect(counts[0]).toContain('2 episodes');
    expect(counts[1]).toContain('1 episode');
  });

  it('links each season card to its per-season route (Specials → 0)', () => {
    const w = mountIt();
    const hrefs = w.findAll('.media-card__link').map((a) => a.attributes('href'));
    expect(hrefs).toEqual([
      '/app/media/sh1/season/1',
      '/app/media/sh1/season/2',
      '/app/media/sh1/season/0',
    ]);
  });

  it('honors a custom routerBase in the season links', () => {
    const w = mountIt({ routerBase: '/app' });
    expect(w.findAll('.media-card__link')[0].attributes('href')).toBe('/app/media/sh1/season/1');
  });

  it('falls back to the series poster for a season with no own poster', () => {
    const w = mountIt();
    const img = w.find('.media-card__img');
    expect(img.attributes('src')).toBe('series-poster.jpg');
  });

  it('uses the season poster when the season row carries one', () => {
    const withPoster = groupEpisodesBySeason(
      [media({ id: 's1e1', type: 'episode', season_number: 1, episode_number: 1 })],
      [media({ id: 'se1', type: 'season', season_number: 1, poster_url: 'season1.jpg' })],
    );
    const w = mountIt({ seasons: withPoster });
    expect(w.find('.media-card__img').attributes('src')).toBe('season1.jpg');
  });

  it('shows a busy region while loading and no cards', () => {
    const w = mountIt({ seasons: [], loading: true });
    expect(w.find('[role="status"][aria-busy="true"]').exists()).toBe(true);
    expect(w.findAll('.media-card__link')).toHaveLength(0);
  });

  it('shows an empty message when there are no seasons', () => {
    const w = mountIt({ seasons: [] });
    expect(w.findAll('.media-card__link')).toHaveLength(0);
    expect(w.text()).toContain('no seasons available');
  });

  it('re-emits the hero actions to the parent', () => {
    const w = mountIt();
    const detail = w.findComponent(MediaDetail);
    detail.vm.$emit('play', media());
    detail.vm.$emit('watchlist', media());
    detail.vm.$emit('back');
    expect(w.emitted('play')).toBeTruthy();
    expect(w.emitted('watchlist')).toBeTruthy();
    expect(w.emitted('back')).toBeTruthy();
  });
});

// Theme-music playback + the mute/stop control now live in MediaDetail (U4);
// SeriesDetail delegates to it (the series hero IS a MediaDetail). These tests
// assert the delegation renders through — the exhaustive theme behavior
// (mute persistence, cleanup, re-arm on navigation) is covered in
// MediaDetail.test.ts.
describe('SeriesDetail — theme audio (delegated to MediaDetail)', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined as unknown as void);
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  });

  it('does not render an audio element when theme_audio_url is absent', () => {
    const w = mountIt({ item: media({ theme_audio_url: undefined }) });
    expect(w.find('audio').exists()).toBe(false);
  });

  it('renders the delegated MediaDetail theme audio + control when a theme is present', () => {
    const w = mountIt({ item: media({ theme_audio_url: '/api/v1/media/sh1/theme-audio?sig=abc' }) });
    const audio = w.find('audio');
    expect(audio.exists()).toBe(true);
    expect(audio.classes()).toContain('media-detail__theme-audio');
    expect(audio.attributes('loop')).not.toBe(undefined);
    expect(w.find('[aria-label="Unmute theme music"]').exists()).toBe(true);
  });

  it('uses absolute theme_audio_url directly when provided as an absolute URL', () => {
    const absoluteUrl = 'https://media.example.com/api/v1/media/sh1/theme-audio?sig=xyz';
    const w = mountIt({ item: media({ theme_audio_url: absoluteUrl }) });
    expect(w.find('audio').attributes('src')).toBe(absoluteUrl);
  });

  it('resolves relative theme_audio_url against the mediaApiBase', () => {
    const w = mountIt(
      { item: media({ theme_audio_url: '/api/v1/media/sh1/theme-audio?sig=abc' }) },
      { mediaApiBase: computed(() => 'https://server.test') },
    );
    expect(w.find('audio').attributes('src')).toBe('https://server.test/api/v1/media/sh1/theme-audio?sig=abc');
  });

  it('unmounting the component removes the audio element from the DOM', async () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const w = mountIt(
      { item: media({ theme_audio_url: '/api/v1/media/sh1/theme-audio?sig=abc' }) },
      {},
      { attachTo: host },
    );
    expect(document.querySelector('.media-detail__theme-audio')).not.toBeNull();
    w.unmount();
    await nextTick();
    expect(document.querySelector('.media-detail__theme-audio')).toBeNull();
    host.remove();
  });
});
