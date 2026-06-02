import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import MediaRow from './MediaRow.vue';
import MediaCard from './MediaCard.vue';
import EmptyState from './ui/EmptyState.vue';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi'],
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

describe('MediaRow', () => {
  it('renders the title and one MediaCard per item', () => {
    const items = [media({ id: 'a' }), media({ id: 'b' }), media({ id: 'c' })];
    const w = mount(MediaRow, { props: { title: 'Recently Added', items } });
    expect(w.find('.media-row__title').text()).toBe('Recently Added');
    expect(w.findAllComponents(MediaCard)).toHaveLength(3);
  });

  it('shows a formatted count next to the title when given', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [media()], count: 1284 } });
    expect(w.find('.media-row__count').text()).toBe('1,284');
  });

  it('renders skeleton cells (no MediaCard) on the initial load', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], loading: true, skeletonCount: 4 } });
    const rail = w.find('.media-row__rail');
    expect(rail.attributes('aria-busy')).toBe('true');
    expect(w.findAll('.media-row__skel-poster')).toHaveLength(4);
    expect(w.findComponent(MediaCard).exists()).toBe(false);
  });

  it('renders an EmptyState when settled with no items', () => {
    const w = mount(MediaRow, { props: { title: 'My List', items: [], emptyText: 'Nothing saved.' } });
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(w.text()).toContain('Nothing saved.');
  });

  it('collapses entirely when hideWhenEmpty + settled empty', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], hideWhenEmpty: true } });
    expect(w.find('.media-row').exists()).toBe(false);
    expect(w.findComponent(EmptyState).exists()).toBe(false);
  });

  it('still renders skeletons while loading even with hideWhenEmpty', () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], loading: true, hideWhenEmpty: true } });
    expect(w.find('.media-row').exists()).toBe(true);
  });

  it('renders an error with a retry button that emits retry', async () => {
    const w = mount(MediaRow, { props: { title: 'X', items: [], error: 'Boom' } });
    const alert = w.find('[role="alert"]');
    expect(alert.text()).toContain('Boom');
    await w.find('.media-row__retry').trigger('click');
    expect(w.emitted('retry')).toHaveLength(1);
  });

  it('forwards play/watchlist/info from a card', async () => {
    const item = media({ id: 'z' });
    const w = mount(MediaRow, { props: { title: 'X', items: [item] } });
    const card = w.findComponent(MediaCard);
    card.vm.$emit('play', item);
    card.vm.$emit('watchlist', item);
    card.vm.$emit('info', item);
    expect(w.emitted('play')?.[0]).toEqual([item]);
    expect(w.emitted('watchlist')?.[0]).toEqual([item]);
    expect(w.emitted('info')?.[0]).toEqual([item]);
  });

  it('passes a custom card link target via cardTo', () => {
    const item = media({ id: 'q' });
    const w = mount(MediaRow, {
      props: { title: 'X', items: [item], cardTo: (i: MediaItem) => `/x/${i.id}` },
    });
    expect(w.findComponent(MediaCard).props('to')).toBe('/x/q');
  });

  it('renders the #action slot in the head', () => {
    const w = mount(MediaRow, {
      props: { title: 'X', items: [media()] },
      slots: { action: '<a class="seeall">See all</a>' },
    });
    expect(w.find('.media-row__action .seeall').exists()).toBe(true);
  });
});
