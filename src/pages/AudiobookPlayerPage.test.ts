/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import AudiobookPlayerPage from './AudiobookPlayerPage.vue';
import type { AudiobookDetail, AudiobookProgress } from '../types/audiobook';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function detail(over: Partial<AudiobookDetail> = {}): AudiobookDetail {
  return {
    id: 'a1',
    name: 'Children of Time',
    type: 'audiobook',
    metadata: { author: 'Adrian Tchaikovsky', narrator: 'Mel Hudson', duration_ms: 3600_000 },
    cover_url: null,
    stream_url: '/media/a1/stream',
    chapters: [
      { index: 0, title: 'Chapter One', start_ms: 0, end_ms: 600_000, duration_ms: 600_000 },
      { index: 1, title: 'Chapter Two', start_ms: 600_000, end_ms: 1_800_000, duration_ms: 1_200_000 },
    ],
    ...over,
  };
}

function stubFetch(opts: { audiobook?: AudiobookDetail | null; progress?: AudiobookProgress | null; error?: boolean } = {}) {
  const post = vi.fn((_url: unknown, _init: RequestInit) => Promise.resolve(jsonResponse({ ok: true })));
  const fn = vi.fn((url: unknown, init?: RequestInit) => {
    const u = typeof url === 'string' ? url : '';
    if (init && init.method === 'POST') return post(url, init);
    if (u.includes('/read')) {
      if (opts.error) return Promise.reject(new Error('read down'));
      return Promise.resolve(jsonResponse({
        audiobook: opts.audiobook === undefined ? detail() : opts.audiobook,
        progress: opts.progress ?? null,
      }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return { fn, post };
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/audiobooks', name: 'audiobooks', component: stub },
      { path: '/app/audiobooks/:id', name: 'audiobook-detail', component: stub },
      { path: '/app/audiobooks/:id/read', name: 'audiobook-player', component: stub },
    ],
  });
}

async function mountAt(router: Router, id = 'a1'): Promise<VueWrapper> {
  await router.push(`/app/audiobooks/${id}/read`);
  await router.isReady();
  return mount(AudiobookPlayerPage, {
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: {
        Icon: { template: '<span class="icon" />' },
        Skeleton: { template: '<div class="skeleton" />' },
      },
    },
  });
}

// jsdom does not implement HTMLMediaElement playback — provide controllable
// play/pause/currentTime so the transport controls can be exercised.
const ctMap = new WeakMap<object, number>();
let playSpy: ReturnType<typeof vi.fn>;
let pauseSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  localStorage.clear();
  playSpy = vi.fn(() => Promise.resolve());
  pauseSpy = vi.fn();
  HTMLMediaElement.prototype.play = playSpy as unknown as HTMLMediaElement['play'];
  HTMLMediaElement.prototype.pause = pauseSpy as unknown as HTMLMediaElement['pause'];
  Object.defineProperty(HTMLMediaElement.prototype, 'currentTime', {
    configurable: true,
    get(this: object) { return ctMap.get(this) ?? 0; },
    set(this: object, v: number) { ctMap.set(this, v); },
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('AudiobookPlayerPage — load', () => {
  it('loads via GET /api/v1/audiobooks/{id}/read and renders the player', async () => {
    const { fn } = stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(fn.mock.calls[0][0]).toContain('/api/v1/audiobooks/a1/read');
    expect(w.find('.player-title').text()).toBe('Children of Time');
    expect(w.find('audio').exists()).toBe(true);
    w.unmount();
  });

  it('shows the error state when the load fails', async () => {
    stubFetch({ error: true });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.player-error').text()).toContain('Could not load audiobook');
    w.unmount();
  });
});

describe('AudiobookPlayerPage — transport controls', () => {
  it('toggles play/pause via the play button', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();

    const playBtn = w.find('.control-btn--play');
    expect(playBtn.attributes('aria-label')).toBe('Play');

    await playBtn.trigger('click');
    await flushPromises();
    expect(playSpy).toHaveBeenCalled();
    expect(w.find('.control-btn--play').attributes('aria-label')).toBe('Pause');

    await w.find('.control-btn--play').trigger('click');
    expect(pauseSpy).toHaveBeenCalled();
    expect(w.find('.control-btn--play').attributes('aria-label')).toBe('Play');
    w.unmount();
  });

  it('skips forward by 30 seconds clamped to the duration', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();

    const audioEl = w.find('audio').element as HTMLMediaElement;
    Object.defineProperty(audioEl, 'duration', { configurable: true, value: 3600 });
    await w.find('audio').trigger('loadedmetadata'); // duration ref -> 3600
    audioEl.currentTime = 100;

    // The +30 skip button is the one titled "Skip forward 30 seconds".
    const fwd = w.findAll('.control-btn').find((b) => b.attributes('title') === 'Skip forward 30 seconds')!;
    await fwd.trigger('click');
    expect(audioEl.currentTime).toBe(130);

    const back = w.findAll('.control-btn').find((b) => b.attributes('title') === 'Skip back 30 seconds')!;
    await back.trigger('click');
    expect(audioEl.currentTime).toBe(100);
    w.unmount();
  });

  it('marks the selected chapter active and seeks to its start', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();

    const chapterBtns = w.findAll('.player-chapters .chapter-item');
    expect(chapterBtns).toHaveLength(2);
    expect(chapterBtns[0].classes()).toContain('is-active');

    await chapterBtns[1].trigger('click');
    const after = w.findAll('.player-chapters .chapter-item');
    expect(after[1].classes()).toContain('is-active');
    expect(after[0].classes()).not.toContain('is-active');
    // Seeked to chapter two start (600_000 ms -> 600 s).
    expect((w.find('audio').element as HTMLMediaElement).currentTime).toBe(600);
    w.unmount();
  });
});

describe('AudiobookPlayerPage — progress save', () => {
  it('POSTs progress to /api/v1/audiobooks/{id}/progress when playback ends', async () => {
    const { post } = stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();

    await w.find('audio').trigger('ended');
    await flushPromises();

    expect(post).toHaveBeenCalled();
    const [url, init] = post.mock.calls[0];
    expect(String(url)).toContain('/api/v1/audiobooks/a1/progress');
    const body = JSON.parse(init.body as string);
    expect(body).toHaveProperty('position_ms');
    expect(body).toHaveProperty('current_chapter_index');
    w.unmount();
  });
});
