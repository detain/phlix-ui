/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import MediaGrid from './MediaGrid.vue';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';

function media(id: number, over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: `m${id}`,
    name: `Title ${id}`,
    type: 'movie',
    poster_url: `https://img/${id}.jpg`,
    genres: ['Sci-Fi'],
    year: 2024,
    rating: 'PG-13',
    runtime: 120,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}
function makeItems(n: number): MediaItem[] {
  return Array.from({ length: n }, (_, i) => media(i));
}

/** Mutable fake layout for the measured sizer element. */
const rect = { width: 0, top: 0, height: 0 };
function mockLayout(width: number, top = 0, height = 20000): void {
  rect.width = width;
  rect.top = top;
  rect.height = height;
}

// --- IntersectionObserver stub (jsdom has none) ---
class IOStub {
  static instances: IOStub[] = [];
  cb: IntersectionObserverCallback;
  observed: Element[] = [];
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
    IOStub.instances.push(this);
  }
  observe(el: Element): void {
    this.observed.push(el);
  }
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  trigger(isIntersecting: boolean): void {
    this.cb(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  static last(): IOStub | undefined {
    return IOStub.instances[IOStub.instances.length - 1];
  }
}

// --- ResizeObserver stub (jsdom has none) ---
class ROStub {
  static instances: ROStub[] = [];
  observed: Element[] = [];
  constructor(_cb: ResizeObserverCallback) {
    ROStub.instances.push(this);
  }
  observe(el: Element): void {
    this.observed.push(el);
  }
  unobserve(): void {}
  disconnect(): void {}
  static observedEls(): Element[] {
    return ROStub.instances.flatMap((i) => i.observed);
  }
}

let gbcrSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  IOStub.instances = [];
  ROStub.instances = [];
  mockLayout(0, 0, 0); // unmeasured by default → non-virtualized fallback

  gbcrSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
    () =>
      ({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: 0,
        right: rect.width,
        bottom: rect.top + rect.height,
        x: 0,
        y: rect.top,
        toJSON: () => ({}),
      }) as DOMRect,
  );

  window.innerHeight = 768;
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  // Run rAF synchronously so scroll-driven re-measure is deterministic. Return
  // 0 (not a truthy id) so the component's `if (frame) return` coalescing guard
  // is clear again after the synchronous callback resets `frame` to 0 — a
  // truthy return would be assigned *after* the callback and wedge the guard.
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  });
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IOStub;
  (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ROStub;
});

afterEach(() => {
  gbcrSpy.mockRestore();
  vi.unstubAllGlobals();
  delete (globalThis as unknown as { IntersectionObserver?: unknown }).IntersectionObserver;
  delete (globalThis as unknown as { ResizeObserver?: unknown }).ResizeObserver;
});

describe('MediaGrid — states', () => {
  it('shows skeleton rows (matching the final layout) on the initial load', () => {
    const w = mount(MediaGrid, { props: { items: [], loading: true, skeletonCount: 12 } });
    const skel = w.find('.media-grid--skeleton');
    expect(skel.exists()).toBe(true);
    expect(skel.attributes('aria-busy')).toBe('true');
    expect(skel.attributes('role')).toBe('status');
    expect(w.findAll('.skel-card')).toHaveLength(12);
    expect(w.findComponent(MediaCard).exists()).toBe(false);
  });

  it('re-attaches the ResizeObserver to the sizer once items render after the skeleton', async () => {
    const w = mount(MediaGrid, { props: { items: [], loading: true } });
    // skeleton branch: no sizer yet, so nothing is observed
    expect(ROStub.observedEls()).toHaveLength(0);

    await w.setProps({ items: makeItems(6), loading: false });
    await nextTick();

    const sizer = w.find('.media-grid-sizer').element;
    expect(ROStub.observedEls()).toContain(sizer);
  });

  it('shows the empty state when there are no items and not loading', () => {
    const w = mount(MediaGrid, { props: { items: [] } });
    expect(w.find('.media-grid-empty').exists()).toBe(true);
    expect(w.find('.media-grid-empty__title').text()).toBe('No media found');
  });

  it('renders a custom #empty slot', () => {
    const w = mount(MediaGrid, {
      props: { items: [] },
      slots: { empty: '<p class="custom-empty">nada</p>' },
    });
    expect(w.find('.custom-empty').exists()).toBe(true);
    expect(w.find('.media-grid-empty__title').exists()).toBe(false);
  });
});

describe('MediaGrid — non-virtualized fallback (no layout / jsdom)', () => {
  it('renders every item when the container is unmeasured', () => {
    const w = mount(MediaGrid, { props: { items: makeItems(40) } });
    expect(w.findAllComponents(MediaCard)).toHaveLength(40);
  });

  it('uses an auto-fill template when not virtualized', () => {
    const w = mount(MediaGrid, { props: { items: makeItems(6), cardSize: 200 } });
    const grid = w.find('.media-grid');
    expect(grid.attributes('style')).toContain('auto-fill');
    expect(grid.attributes('style')).toContain('200px');
  });
});

describe('MediaGrid — #card slot', () => {
  it('lets the host override the per-item card and exposes item + index', () => {
    const w = mount(MediaGrid, {
      props: { items: makeItems(3) },
      slots: {
        card: `<template #card="{ item, index }"><span class="ic">{{ index }}:{{ item.name }}</span></template>`,
      },
    });
    const cells = w.findAll('.ic');
    expect(cells).toHaveLength(3);
    expect(cells[0].text()).toBe('0:Title 0');
    expect(w.findComponent(MediaCard).exists()).toBe(false);
  });
});

describe('MediaGrid — virtualization', () => {
  // Note: These tests use vi.useFakeTimers which can interfere with other parallel tests.
  // They pass when run individually or with other MediaGrid/FilterBar/createPhlixApp tests.
  // jsdom does not properly simulate scrolling, so these tests verify the component
  // logic works correctly when scroll position is manually controlled.

  it('renders only the visible window of rows for a large list', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      mockLayout(1000, 0); // 5 columns at cardSize 180; rowHeight ~356; vh 768
      const w = mount(MediaGrid, { props: { items: makeItems(200), cardSize: 180 } });
      await vi.runAllTimersAsync();
      await nextTick();
      const cards = w.findAllComponents(MediaCard);
      // window at the top = ~6 rows * 5 cols = 30; far fewer than 200
      expect(cards.length).toBeGreaterThan(0);
      expect(cards.length).toBeLessThanOrEqual(35);
      expect(cards.length).toBeLessThan(200);
    } finally {
      vi.useRealTimers();
    }
  });

  it('uses an explicit column count and a full-height sizer when virtualized', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      mockLayout(1000, 0);
      const w = mount(MediaGrid, { props: { items: makeItems(200), cardSize: 180 } });
      await vi.runAllTimersAsync();
      await nextTick();
      const grid = w.find('.media-grid');
      expect(grid.attributes('style')).toContain('repeat(5,');
      // sizer reserves the full scroll height (40 rows * 356 = 14240px)
      const sizer = w.find('.media-grid-sizer');
      expect(sizer.attributes('style')).toContain('height: 14240px');
    } finally {
      vi.useRealTimers();
    }
  });

  it('slides the window and reveals "back to top" once scrolled past the fold', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      mockLayout(1000, 0);
      const w = mount(MediaGrid, { props: { items: makeItems(200), cardSize: 180 } });
      await vi.runAllTimersAsync();
      await nextTick();
      expect(w.find('.media-grid-top').exists()).toBe(false);

      // scroll 2000px into the grid (> 1.5 * viewportHeight)
      // Set window.scrollY so measure() picks up the correct scrollTop
      Object.defineProperty(window, 'scrollY', { value: 2000, configurable: true });
      mockLayout(1000, -2000);
      window.dispatchEvent(new Event('scroll'));
      await vi.runAllTimersAsync();
      await nextTick();

      // padTop offsets the rendered slice
      const inner = w.find('.media-grid');
      expect(inner.attributes('style')).toContain('translateY(');
      expect(inner.attributes('style')).not.toContain('translateY(0px)');

      // the slice starts at the CORRECT item, not just "few nodes":
      // width 1000 → 5 cols, cardWidth 184, rowHeight 356; scrollTop 2000 →
      // firstVisible 5, startRow 3 (overscan 2), startIndex 15.
      const cards = w.findAllComponents(MediaCard);
      expect(cards[0].props('item').name).toBe('Title 15');

      // back-to-top now visible and scrolls to the top on click
      const top = w.find('.media-grid-top');
      expect(top.exists()).toBe(true);
      await top.trigger('click');
      expect(window.scrollTo).toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it('advances the window synchronously on scroll even when rAF never fires (Firefox throttle freeze)', async () => {
    mockLayout(1000, 0);
    const w = mount(MediaGrid, { props: { items: makeItems(200), cardSize: 180 } });
    await nextTick();
    await nextTick();

    // Simulate the browser throttling requestAnimationFrame during scroll (it
    // returns an id but never invokes the callback). The old rAF-deferred
    // measurement would freeze here — the same titles would stay on screen.
    vi.stubGlobal('requestAnimationFrame', () => 0);

    mockLayout(1000, -2000); // scrolled 2000px into the grid
    window.dispatchEvent(new Event('scroll'));
    await nextTick();
    await nextTick();

    const inner = w.find('.media-grid');
    // The window tracked the scroll despite rAF never firing.
    expect(inner.attributes('style')).not.toContain('translateY(0px)');
    expect(w.findAllComponents(MediaCard)[0].props('item').name).toBe('Title 15');
  });

  it('back-to-top honors reduced-motion: smooth normally, instant ("auto") when reduced (R6.5a)', async () => {
    mockLayout(1000, -2000); // already scrolled past the fold so the button is shown
    const w = mount(MediaGrid, { props: { items: makeItems(200), cardSize: 180 } });
    await nextTick();
    await nextTick();
    const top = w.get('.media-grid-top');
    const scrollTo = window.scrollTo as unknown as ReturnType<typeof vi.fn>;

    // reduced-motion ON → instant jump (no smooth animation)
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
    await top.trigger('click');
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'auto' });

    // reduced-motion OFF → smooth scroll
    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
    await top.trigger('click');
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' });
  });
});

describe('MediaGrid — infinite scroll', () => {
  it('emits load-more when the sentinel intersects and more remain', async () => {
    const w = mount(MediaGrid, { props: { items: makeItems(24), hasMore: true } });
    await nextTick();
    expect(w.find('.media-grid-sentinel').exists()).toBe(true);
    IOStub.last()!.trigger(true);
    expect(w.emitted('load-more')).toHaveLength(1);
  });

  it('does not emit load-more when nothing intersects', async () => {
    const w = mount(MediaGrid, { props: { items: makeItems(24), hasMore: true } });
    await nextTick();
    IOStub.last()!.trigger(false);
    expect(w.emitted('load-more')).toBeUndefined();
  });

  it('hides the sentinel (and never emits) while a further page is loading', async () => {
    const w = mount(MediaGrid, {
      props: { items: makeItems(24), hasMore: true, loadingMore: true },
    });
    await nextTick();
    expect(w.find('.media-grid-sentinel').exists()).toBe(false);
    expect(w.find('.media-grid-more').exists()).toBe(true);
  });

  it('renders no sentinel when there is nothing more to load', async () => {
    const w = mount(MediaGrid, { props: { items: makeItems(24), hasMore: false } });
    await nextTick();
    expect(w.find('.media-grid-sentinel').exists()).toBe(false);
  });
});

describe('MediaGrid — random-access paging (need-range)', () => {
  it('emits need-range for the visible window once measured (drives A-Z jump paging)', async () => {
    vi.useFakeTimers();
    try {
      mockLayout(1000, 0); // real width → virtualized
      window.innerHeight = 768;
      // Pre-sized to a big total with only the first page loaded — the rest are
      // skeletons the host must fill via need-range.
      const w = mount(MediaGrid, { props: { items: makeItems(24), total: 5000 } });
      await nextTick();
      await vi.advanceTimersByTimeAsync(150); // clear the 120ms debounce

      const ev = w.emitted('need-range') as [number, number][] | undefined;
      expect(ev).toBeTruthy();
      const [start, end] = ev![ev!.length - 1];
      expect(start).toBe(0);
      expect(end).toBeGreaterThan(0);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('MediaGrid — event forwarding', () => {
  it('re-emits play/watchlist/info from the default card', async () => {
    const w = mount(MediaGrid, { props: { items: makeItems(1) } });
    const card = w.findComponent(MediaCard);
    card.vm.$emit('play', w.props('items')[0]);
    card.vm.$emit('watchlist', w.props('items')[0]);
    card.vm.$emit('info', w.props('items')[0]);
    await nextTick();
    expect(w.emitted('play')).toHaveLength(1);
    expect(w.emitted('watchlist')).toHaveLength(1);
    expect(w.emitted('info')).toHaveLength(1);
  });
});
