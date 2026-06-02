import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import MediaDetail from './MediaDetail.vue';
import MediaRow from './MediaRow.vue';
import Chip from './ui/Chip.vue';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi', 'Adventure'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: 'Paul unites with the Fremen.',
    actors: ['Timothée Chalamet', 'Zendaya'],
    director: 'Denis Villeneuve',
    created_at: null,
    updated_at: null,
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('MediaDetail — rendering', () => {
  it('renders title, meta, overview, genres, director and cast', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    expect(w.find('.media-detail__title').text()).toBe('Dune: Part Two');
    const meta = w.find('.media-detail__meta').text();
    expect(meta).toContain('2024');
    expect(meta).toContain('166m');
    expect(w.find('.media-detail__cert').text()).toBe('PG-13');
    expect(w.find('.media-detail__overview').text()).toBe('Paul unites with the Fremen.');
    // genre chips + cast chips
    const chipTexts = w.findAllComponents(Chip).map((c) => c.text());
    expect(chipTexts).toContain('Sci-Fi');
    expect(chipTexts).toContain('Zendaya');
    expect(w.text()).toContain('Denis Villeneuve');
  });

  it('renders the poster image with the title as alt', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const img = w.find('.media-detail__img');
    expect(img.attributes('src')).toBe('https://img/dune.jpg');
    expect(img.attributes('alt')).toBe('Dune: Part Two');
  });

  it('fades the poster in on the load event', async () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const img = w.find('.media-detail__img');
    expect(img.classes()).not.toContain('is-loaded');
    await img.trigger('load');
    expect(w.find('.media-detail__img').classes()).toContain('is-loaded');
  });

  it('treats an already-cached (complete) poster as loaded on mount', async () => {
    const spy = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    const w = mount(MediaDetail, { props: { item: media() } });
    await nextTick();
    expect(w.find('.media-detail__img').classes()).toContain('is-loaded');
    spy.mockRestore();
  });
});

describe('MediaDetail — sparse metadata (degrades)', () => {
  it('shows an icon fallback when there is no poster', () => {
    const w = mount(MediaDetail, { props: { item: media({ poster_url: null }) } });
    expect(w.find('.media-detail__img').exists()).toBe(false);
    expect(w.find('.media-detail__fallback').exists()).toBe(true);
  });

  it('shows a fallback line when there is no overview', () => {
    const w = mount(MediaDetail, { props: { item: media({ overview: null }) } });
    expect(w.find('.media-detail__overview').text()).toBe('No overview available.');
  });

  it('omits genres / credits sections when absent', () => {
    const w = mount(MediaDetail, { props: { item: media({ genres: [], actors: [], director: null }) } });
    expect(w.find('.media-detail__genres').exists()).toBe(false);
    expect(w.find('.media-detail__credits').exists()).toBe(false);
  });

  it('does not render an ambient layer without a poster', () => {
    const w = mount(MediaDetail, { props: { item: media({ poster_url: null }) } });
    expect(w.find('.media-detail__ambient').exists()).toBe(false);
  });
});

describe('MediaDetail — resume', () => {
  it('hides the Resume action when there is no resume position', () => {
    const w = mount(MediaDetail, { props: { item: media(), resumeSeconds: null } });
    expect(w.text()).not.toContain('Resume');
  });

  it('shows Resume with a formatted timecode (m:ss)', () => {
    const w = mount(MediaDetail, { props: { item: media(), resumeSeconds: 90 } });
    const resumeAt = w.find('.media-detail__resume-at');
    expect(resumeAt.exists()).toBe(true);
    expect(resumeAt.text()).toBe('1:30');
  });

  it('formats hours for long resume positions (h:mm:ss)', () => {
    const w = mount(MediaDetail, { props: { item: media(), resumeSeconds: 3700 } });
    expect(w.find('.media-detail__resume-at').text()).toBe('1:01:40');
  });
});

describe('MediaDetail — actions & similar', () => {
  it('emits play / resume / watchlist from the hero actions', async () => {
    const item = media();
    const w = mount(MediaDetail, { props: { item, resumeSeconds: 120 } });
    const buttons = w.findAll('.media-detail__actions button');
    await buttons[0].trigger('click'); // Play
    await buttons[1].trigger('click'); // Resume
    await buttons[2].trigger('click'); // Watchlist
    expect(w.emitted('play')?.[0]).toEqual([item]);
    expect(w.emitted('resume')?.[0]).toEqual([item]);
    expect(w.emitted('watchlist')?.[0]).toEqual([item]);
  });

  it('emits back from the back affordance, hidden when showBack=false', async () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    await w.find('.media-detail__bar button').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);

    const w2 = mount(MediaDetail, { props: { item: media(), showBack: false } });
    expect(w2.find('.media-detail__bar button').exists()).toBe(false);
  });

  it('renders the "More like this" rail and forwards its card events', () => {
    const similar = [media({ id: 's1' }), media({ id: 's2' })];
    const w = mount(MediaDetail, { props: { item: media(), similar } });
    const row = w.findComponent(MediaRow);
    expect(row.exists()).toBe(true);
    expect(row.props('title')).toBe('More like this');
    row.vm.$emit('play', similar[0]);
    row.vm.$emit('watchlist', similar[1]);
    row.vm.$emit('info', similar[0]);
    expect(w.emitted('play')?.[0]).toEqual([similar[0]]);
    expect(w.emitted('watchlist')?.[0]).toEqual([similar[1]]);
    expect(w.emitted('info')?.[0]).toEqual([similar[0]]);
  });

  it('shows the similar rail while it is loading even with no items yet', () => {
    const w = mount(MediaDetail, { props: { item: media(), similar: [], similarLoading: true } });
    expect(w.findComponent(MediaRow).exists()).toBe(true);
  });
});
