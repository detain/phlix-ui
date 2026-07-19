/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import PhotoSlideshowPage from './PhotoSlideshowPage.vue';
import type { SlideshowItem } from '../types/photo';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function slide(id: string, over: Partial<SlideshowItem> = {}): SlideshowItem {
  return {
    id,
    url: `full-${id}.jpg`,
    thumbnail_url: `thumb-${id}.jpg`,
    caption: `Caption ${id}`,
    interval: 5,
    ...over,
  };
}

function stubFetch(opts: { slides?: SlideshowItem[]; interval?: number; error?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/photo/slideshow')) {
      if (opts.error) return Promise.reject(new Error('slideshow down'));
      return Promise.resolve(jsonResponse({
        slideshow: opts.slides ?? [slide('s1'), slide('s2'), slide('s3')],
        interval: opts.interval ?? 5,
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
      { path: '/app/photo/albums', name: 'photo-albums', component: stub },
      { path: '/app/photo/album/:id', name: 'photo-album', component: stub },
      { path: '/app/photo/slideshow', name: 'photo-slideshow', component: stub },
    ],
  });
}

async function mountPage(
  router: Router,
  query: Record<string, string> = { library_id: 'lib1', album: 'alb1', interval: '5' },
): Promise<VueWrapper> {
  await router.push({ path: '/app/photo/slideshow', query });
  await router.isReady();
  return mount(PhotoSlideshowPage, {
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('PhotoSlideshowPage', () => {
  beforeEach(() => localStorage.clear());

  it('reads the query params and requests the slideshow scoped to the album', async () => {
    const fetchFn = stubFetch();
    const w = await mountPage(makeRouter());
    await flushPromises();
    const url = String(fetchFn.mock.calls[0][0]);
    expect(url).toContain('/api/v1/photo/slideshow');
    expect(url).toContain('library_id=lib1');
    expect(url).toContain('album_id=alb1');
    expect(url).toContain('interval=5');
    w.unmount();
  });

  it('renders the counter, the current slide, and the thumbnail strip', async () => {
    stubFetch({ slides: [slide('s1'), slide('s2'), slide('s3')] });
    const w = await mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.slide-counter').text()).toContain('1 / 3');
    expect(w.find('.slide-image').attributes('src')).toBe('full-s1.jpg');
    expect(w.findAll('.thumbnail')).toHaveLength(3);
    w.unmount();
  });

  it('advances with the next button and steps back with prev', async () => {
    stubFetch();
    const w = await mountPage(makeRouter());
    await flushPromises();

    await w.findAll('.main-controls button')[2].trigger('click'); // next
    expect(w.find('.slide-counter').text()).toContain('2 / 3');

    await w.findAll('.main-controls button')[0].trigger('click'); // prev
    expect(w.find('.slide-counter').text()).toContain('1 / 3');
    w.unmount();
  });

  it('toggles play/pause via the center transport button', async () => {
    stubFetch();
    const w = await mountPage(makeRouter());
    await flushPromises();
    const playBtn = () => w.findAll('.main-controls button')[1];
    // Starts playing → shows the pause glyph.
    expect(playBtn().find('.icon').attributes('data-icon')).toBe('pause');
    await playBtn().trigger('click');
    expect(playBtn().find('.icon').attributes('data-icon')).toBe('play');
    w.unmount();
  });

  it('exits back to the album when the exit control is clicked', async () => {
    stubFetch();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountPage(router);
    await flushPromises();
    // The exit button is the last control in the row.
    const controls = w.findAll('.controls-row button');
    await controls[controls.length - 1].trigger('click');
    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/app/photo/album/alb1' }),
    );
    w.unmount();
  });

  it('auto-advances on the interval timer while playing', async () => {
    vi.useFakeTimers();
    stubFetch({ slides: [slide('s1'), slide('s2'), slide('s3')], interval: 5 });
    const w = await mountPage(makeRouter());
    await flushPromises(); // resolve the fetch and arm the interval timer
    expect(w.find('.slide-counter').text()).toContain('1 / 3');

    vi.advanceTimersByTime(5000);
    await flushPromises();
    expect(w.find('.slide-counter').text()).toContain('2 / 3');

    vi.advanceTimersByTime(5000);
    await flushPromises();
    expect(w.find('.slide-counter').text()).toContain('3 / 3');
    w.unmount();
  });

  it('shows the error state and stays interactive on failure', async () => {
    stubFetch({ error: true });
    const w = await mountPage(makeRouter());
    await flushPromises();
    expect(w.text()).toContain('slideshow down');
    w.unmount();
  });
});
