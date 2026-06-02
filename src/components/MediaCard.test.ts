import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import MediaCard from './MediaCard.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi', 'Adventure', 'Drama', 'Action'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('MediaCard — rendering', () => {
  it('renders the poster image lazily with an aspect-ratio box (no CLS)', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    const img = w.find('.media-card__img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('src')).toBe('https://img/dune.jpg');
    // the poster reserves a 2:3 box regardless of load state
    expect(w.find('.media-card__poster').exists()).toBe(true);
  });

  it('renders title, meta and up to three genres in the overlay', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    expect(w.find('.media-card__title').text()).toBe('Dune: Part Two');
    expect(w.find('.media-card__cert').text()).toBe('PG-13');
    expect(w.find('.media-card__meta').text()).toContain('2024');
    expect(w.find('.media-card__meta').text()).toContain('166m');
    const genres = w.findAll('.media-card__genres span');
    expect(genres).toHaveLength(3); // capped at 3 of 4
  });

  it('links the poster to the player route by default and honors `to`', () => {
    const def = mount(MediaCard, { props: { item: media() } });
    expect(def.find('.media-card__link').attributes('href')).toBe('/app/player/m1');
    const custom = mount(MediaCard, { props: { item: media(), to: '/app/media/m1' } });
    expect(custom.find('.media-card__link').attributes('href')).toBe('/app/media/m1');
  });

  it('falls back to a real SVG icon (never emoji) when no poster', () => {
    const w = mount(MediaCard, { props: { item: media({ poster_url: null, type: 'series' }) } });
    expect(w.find('.media-card__img').exists()).toBe(false);
    const fallback = w.find('.media-card__fallback');
    expect(fallback.exists()).toBe(true);
    expect(fallback.find('svg').exists()).toBe(true);
    expect(w.html()).not.toMatch(/🎬|🎵|🖼/);
  });

  it('marks the image loaded on the load event (fade-in)', async () => {
    const w = mount(MediaCard, { props: { item: media() } });
    const img = w.find('.media-card__img');
    expect(img.classes()).not.toContain('is-loaded');
    await img.trigger('load');
    expect(w.find('.media-card__img').classes()).toContain('is-loaded');
  });

  it('treats an already-cached (complete) image as loaded on mount (no hidden poster)', async () => {
    const spy = vi
      .spyOn(HTMLImageElement.prototype, 'complete', 'get')
      .mockReturnValue(true);
    const w = mount(MediaCard, { props: { item: media() } });
    await nextTick(); // onMounted sets loaded → flush the reactive class
    expect(w.find('.media-card__img').classes()).toContain('is-loaded');
    spy.mockRestore();
  });
});

describe('MediaCard — badges', () => {
  it('shows the NEW badge for a recently-added item', () => {
    const recent = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const w = mount(MediaCard, { props: { item: media({ created_at: recent }) } });
    expect(w.find('.media-card__badge--new').exists()).toBe(true);
  });

  it('hides the NEW badge for an old item or unparseable date', () => {
    const old = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
    expect(mount(MediaCard, { props: { item: media({ created_at: old }) } }).find('.media-card__badge--new').exists()).toBe(false);
    expect(mount(MediaCard, { props: { item: media({ created_at: 'not-a-date' }) } }).find('.media-card__badge--new').exists()).toBe(false);
    expect(mount(MediaCard, { props: { item: media({ created_at: null }) } }).find('.media-card__badge--new').exists()).toBe(false);
  });

  it('renders a quality badge only when the prop is given', () => {
    expect(mount(MediaCard, { props: { item: media() } }).find('.media-card__badge--quality').exists()).toBe(false);
    const w = mount(MediaCard, { props: { item: media(), quality: '4K · HDR' } });
    expect(w.find('.media-card__badge--quality').text()).toBe('4K · HDR');
  });
});

describe('MediaCard — resume progress', () => {
  it('renders a progressbar at resumePosition ÷ runtime', () => {
    const player = usePlayerStore();
    player.resumeMap['m1'] = 83 * 60; // half of 166m, in seconds
    const w = mount(MediaCard, { props: { item: media() } });
    const bar = w.find('.media-card__progress');
    expect(bar.exists()).toBe(true);
    expect(bar.attributes('aria-valuenow')).toBe('50');
    expect((bar.find('i').element as HTMLElement).style.width).toBe('50%');
  });

  it('shows no progressbar without a resume position', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    expect(w.find('.media-card__progress').exists()).toBe(false);
  });

  it('clamps the ratio to 1 when resume exceeds runtime', () => {
    const player = usePlayerStore();
    player.resumeMap['m1'] = 999 * 60;
    const w = mount(MediaCard, { props: { item: media() } });
    expect(w.find('.media-card__progress').attributes('aria-valuenow')).toBe('100');
  });

  it('shows no progressbar when runtime is missing', () => {
    const player = usePlayerStore();
    player.resumeMap['m1'] = 600;
    const w = mount(MediaCard, { props: { item: media({ runtime: null }) } });
    expect(w.find('.media-card__progress').exists()).toBe(false);
  });
});

describe('MediaCard — quick actions + slots', () => {
  it('emits play/watchlist/info from the quick-action buttons', async () => {
    const w = mount(MediaCard, { props: { item: media() } });
    await w.find('.media-card__iconbtn--play').trigger('click');
    await w.find('[aria-label="Add to watchlist"]').trigger('click');
    await w.find('[aria-label="More info"]').trigger('click');
    expect(w.emitted('play')![0][0]).toMatchObject({ id: 'm1' });
    expect(w.emitted('watchlist')).toHaveLength(1);
    expect(w.emitted('info')).toHaveLength(1);
  });

  it('renders #badges and #actions slot content with the item', () => {
    const w = mount(MediaCard, {
      props: { item: media() },
      slots: {
        badges: '<span class="app-badge">HUB</span>',
        actions: '<button class="app-action">x</button>',
      },
    });
    expect(w.find('.app-badge').text()).toBe('HUB');
    expect(w.find('.app-action').exists()).toBe(true);
  });
});
