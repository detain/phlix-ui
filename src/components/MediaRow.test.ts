/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Stub `window.matchMedia` so a query matches iff `predicate(query)` is true. */
function stubMatchMedia(predicate: (query: string) => boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: predicate(query),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

/**
 * Make a rail element report a fixed, overflowing geometry — jsdom does not lay
 * out, so `scrollWidth`/`clientWidth` are otherwise 0. Returns a setter for the
 * current `scrollLeft` (to simulate paging to the end).
 */
function simulateOverflow(
  el: HTMLElement,
  opts: { scrollWidth: number; clientWidth: number },
): (scrollLeft: number) => void {
  let scrollLeft = 0;
  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => opts.clientWidth });
  Object.defineProperty(el, 'scrollWidth', { configurable: true, get: () => opts.scrollWidth });
  Object.defineProperty(el, 'scrollLeft', { configurable: true, get: () => scrollLeft });
  return (v: number) => {
    scrollLeft = v;
  };
}

/**
 * Whether an arrow (matched by `selector`) is currently suppressed. `v-show`
 * toggles the inline `display: none`, which is deterministic in jsdom — unlike
 * `isVisible()`, which walks computed layout and is unreliable here.
 */
function arrowHidden(w: ReturnType<typeof mount>, selector: string): boolean {
  return (w.find(selector).attributes('style') ?? '').includes('display: none');
}

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

  // S15: the admin ⋯-menu "Edit metadata" / "Explore item data" actions must
  // bubble up so the host page (Browse rails) can open the match modal / inspector.
  it('forwards edit-metadata/explore-data from a card (S15)', () => {
    const item = media({ id: 'z' });
    const w = mount(MediaRow, { props: { title: 'X', items: [item] } });
    const card = w.findComponent(MediaCard);
    card.vm.$emit('edit-metadata', item);
    card.vm.$emit('explore-data', item);
    expect(w.emitted('edit-metadata')?.[0]).toEqual([item]);
    expect(w.emitted('explore-data')?.[0]).toEqual([item]);
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

  // S21 — prev/next scroll arrows.
  describe('scroll arrows (S21)', () => {
    const many = [media({ id: 'a' }), media({ id: 'b' }), media({ id: 'c' })];

    it('does not show either arrow when the rail does not overflow', () => {
      // jsdom does not lay out, so scrollWidth == clientWidth == 0 → no overflow.
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('shows the next arrow (prev hidden) at the start, and flips at the end', async () => {
      stubMatchMedia(() => false); // fine pointer, motion allowed
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      const setScrollLeft = simulateOverflow(rail.element as HTMLElement, {
        scrollWidth: 1000,
        clientWidth: 300,
      });

      // At the left extreme: prev useless (hidden), next available.
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(false);

      // Paged to the right extreme: next useless (hidden), prev available.
      setScrollLeft(700);
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(false);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('calls scrollBy by ~90% of the visible width when an arrow is clicked', async () => {
      stubMatchMedia(() => false);
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      simulateOverflow(rail.element as HTMLElement, { scrollWidth: 1000, clientWidth: 300 });
      const scrollBy = vi.fn();
      (rail.element as unknown as { scrollBy: unknown }).scrollBy = scrollBy;

      await rail.trigger('scroll');
      await w.find('.media-row__arrow--next').trigger('click');
      expect(scrollBy).toHaveBeenCalledWith({ left: 300 * 0.9, behavior: 'smooth' });

      await w.find('.media-row__arrow--prev').trigger('click');
      expect(scrollBy).toHaveBeenLastCalledWith({ left: -300 * 0.9, behavior: 'smooth' });
    });

    it('hides the arrows on a coarse-pointer / no-hover device even when overflowing', async () => {
      stubMatchMedia((q) => q.includes('coarse') || q.includes('hover'));
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      simulateOverflow(rail.element as HTMLElement, { scrollWidth: 1000, clientWidth: 300 });
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('hides the arrows under prefers-reduced-motion even when overflowing', async () => {
      stubMatchMedia((q) => q.includes('reduced-motion'));
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      const rail = w.find('.media-row__rail');
      simulateOverflow(rail.element as HTMLElement, { scrollWidth: 1000, clientWidth: 300 });
      await rail.trigger('scroll');
      expect(arrowHidden(w, '.media-row__arrow--prev')).toBe(true);
      expect(arrowHidden(w, '.media-row__arrow--next')).toBe(true);
    });

    it('exposes accessible labels on the arrow buttons', () => {
      const w = mount(MediaRow, { props: { title: 'X', items: many } });
      expect(w.find('.media-row__arrow--prev').attributes('aria-label')).toBe('Scroll left');
      expect(w.find('.media-row__arrow--next').attributes('aria-label')).toBe('Scroll right');
    });
  });
});
