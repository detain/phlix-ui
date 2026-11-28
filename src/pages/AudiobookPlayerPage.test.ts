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
import { isRoute } from '../test/route-match';
import { ApiError } from '../api/client';
import { playbackBlockingMessage } from './playerErrors';
import { errorCodeMessage } from '../i18n/errors';
import type { AudiobookDetail, AudiobookProgress } from '../types/audiobook';

/**
 * The audiobook every test here mounts against, and the two exact routes the page
 * builds for it: `AudiobookPlayerPage.vue:83` (read) and `:195` (progress).
 *
 * S193: matched with {@link isRoute} (pathname must END WITH the route) rather
 * than `u.includes('/read')`, which also matches `/api/v1/audiobooks/a1/read-MUTATED`
 * — and, being only a fragment, would equally have matched a request to an
 * unrelated `/read` route. `endsWith`, not `===`, because the media base
 * legitimately prefixes the path on the hub.
 */
const AUDIOBOOK_ID = 'a1';
const READ_PATH = `/api/v1/audiobooks/${AUDIOBOOK_ID}/read`;
const PROGRESS_PATH = `/api/v1/audiobooks/${AUDIOBOOK_ID}/progress`;

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

function stubFetch(opts: { audiobook?: AudiobookDetail | null; progress?: AudiobookProgress | null; error?: boolean; rejectWith?: unknown } = {}) {
  const post = vi.fn((_url: unknown, _init: RequestInit) => Promise.resolve(jsonResponse({ ok: true })));
  const fn = vi.fn((url: unknown, init?: RequestInit) => {
    const u = typeof url === 'string' ? url : '';
    if (init && init.method === 'POST') return post(url, init);
    if (isRoute(u, READ_PATH)) {
      if (opts.rejectWith !== undefined) return Promise.reject(opts.rejectWith);
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
    expect(isRoute(fn.mock.calls[0][0], READ_PATH)).toBe(true);
    expect(w.find('.player-title').text()).toBe('Children of Time');
    expect(w.find('audio').exists()).toBe(true);
    w.unmount();
  });

  it('shows the error state when the load fails', async () => {
    stubFetch({ error: true });
    const w = await mountAt(makeRouter());
    await flushPromises();
    // phlix-ui-player-019: a plain (non-ApiError) rejection must land on the
    // catalog's curated copy — never the thrown string, never a hardcoded literal.
    expect(w.find('.player-error').text()).toBe("Couldn’t load the audiobook. Please try again.");
    expect(w.find('.player-error').text()).not.toContain('read down');
    w.unmount();
  });

  it('renders the back link in sentence case', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.player-header__back').text()).toBe('Back to audiobook');
    w.unmount();
  });
});

describe('AudiobookPlayerPage — i18n adoption and error rail (phlix-ui-player-019)', () => {
  it('routes a 403 hard block through playerErrors (access schedule)', async () => {
    // Legacy pseudo-code text body (pre-W2 server shape): ONLY the
    // playbackBlockingMessage rail turns this into the access-schedule sentence —
    // the generic ApiError arm would surface the thrown 'gone' debug text instead.
    stubFetch({ rejectWith: new ApiError('gone', 403, { error: 'AccessScheduled' }) });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.player-error').text()).toBe(
      playbackBlockingMessage({ error: 'AccessScheduled' }, undefined),
    );
    w.unmount();
  });

  it("localizes an ApiError carrying a registered wire code (errorCodeMessage rail)", async () => {
    stubFetch({ rejectWith: new ApiError('gone', 503, { code: 'server.offline' }) });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.player-error').text()).toBe(errorCodeMessage('server.offline', undefined));
    w.unmount();
  });

  it('keeps an unregistered-403 ApiError on the rail, not on raw thrown text', async () => {
    stubFetch({ rejectWith: new ApiError('mystery-text', 403, { code: 'not.a.registered.code' }) });
    const w = await mountAt(makeRouter());
    await flushPromises();
    // playbackBlockingMessage returns null (unknown code, no legacy text match);
    // mediaLoadErrorMessage surfaces the ApiError's own message — PlayerPage's
    // documented server-text posture. What must NOT appear is the base page's
    // swallow-everything 'Could not load audiobook'.
    expect(w.find('.player-error').text()).toBe('mystery-text');
    w.unmount();
  });

  it('renders the author line through the byAuthor catalog key', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.player-author').text()).toBe('by Adrian Tchaikovsky');
    w.unmount();
  });

  it('falls back to the numbered-chapter key when a chapter title is empty', async () => {
    stubFetch({ audiobook: detail({ chapters: [{ index: 0, title: '', start_ms: 0, end_ms: 600_000, duration_ms: 600_000 }] }) });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.player-chapter').text()).toBe('Chapter 1');
    expect(w.findAll('.chapter-item')[0].find('.chapter-title').text()).toBe('Chapter 1');
    w.unmount();
  });

  it('labels the play control and skip buttons from the catalog', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.control-btn--play').attributes('aria-label')).toBe('Play');
    const titles = w.findAll('.control-btn').map((b) => b.attributes('title'));
    expect(titles).toContain('Skip back 30 seconds');
    expect(titles).toContain('Skip forward 30 seconds');
    expect(w.find('.extra-btn').attributes('aria-label')).toBe('Playback speed: 1x');
    expect(w.find('.volume-slider').attributes('aria-label')).toBe('Volume');
    expect(w.find('.player-chapters__title').text()).toBe('Chapters');
    w.unmount();
  });

  it('reuses the Scrubber primitive for the seek rail (phlix-ui-player-019)', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();

    // The hand-rolled bar is gone; the shared player primitive owns the rail.
    expect(w.find('.progress-bar').exists()).toBe(false);
    expect(w.find('.progress-seek').exists()).toBe(false);
    const scrub = w.find('.scrubber');
    expect(scrub.exists()).toBe(true);
    expect(scrub.attributes('role')).toBe('slider');
    expect(scrub.attributes('aria-label')).toBe('Seek');

    // The primitive's keyboard contract (ArrowRight = +step) seeks the audio.
    const audioEl = w.find('audio').element as HTMLMediaElement;
    Object.defineProperty(audioEl, 'duration', { configurable: true, value: 3600 });
    await w.find('audio').trigger('loadedmetadata'); // duration ref -> 3600
    await scrub.trigger('keydown', { key: 'ArrowRight' });
    expect(audioEl.currentTime).toBe(5);
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
    expect(isRoute(String(url), PROGRESS_PATH)).toBe(true);
    const body = JSON.parse(init.body as string);
    expect(body).toHaveProperty('position_ms');
    expect(body).toHaveProperty('current_chapter_index');
    w.unmount();
  });
});

describe('AudiobookPlayerPage — progress save debounce (phlix-ui-player-020)', () => {
  it('advancing past the debounce window fires exactly one progress POST', async () => {
    const { post } = stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();

    // Real timers only until the load has settled (flushPromises itself rides a
    // setTimeout); from here the page's debounce is the only clock under test.
    vi.useFakeTimers();
    try {
      await w.find('audio').trigger('timeupdate');
      // Single-stage contract: the 2s debounce IS the save — nothing further
      // re-arms. The base code's outer timer only armed a SECOND same-handle
      // 2s timer here, so at +2.1s the real save had not (and during playback
      // never would) fire.
      vi.advanceTimersByTime(2_100);
      expect(post).toHaveBeenCalledTimes(1);
      expect(isRoute(String(post.mock.calls[0][0]), PROGRESS_PATH)).toBe(true);
    } finally {
      vi.useRealTimers();
    }
    w.unmount();
  });
});

describe('AudiobookPlayerPage — route currency (phlix-ui-player-021)', () => {
  it('navigating to a different :id reloads the new audiobook and stops the old one', async () => {
    const bookB = detail({ id: 'a2', name: 'Dune', stream_url: '/media/a2/stream' });
    const reads: string[] = [];
    const posts: Array<{ url: string; body: Record<string, unknown> }> = [];
    const fn = vi.fn((url: unknown, init?: RequestInit) => {
      const u = typeof url === 'string' ? url : '';
      if (init && init.method === 'POST') {
        posts.push({ url: u, body: JSON.parse(String(init.body)) });
        return Promise.resolve(jsonResponse({ ok: true }));
      }
      if (isRoute(u, '/api/v1/audiobooks/a1/read')) {
        reads.push('a1');
        return Promise.resolve(jsonResponse({ audiobook: detail(), progress: null }));
      }
      if (isRoute(u, '/api/v1/audiobooks/a2/read')) {
        reads.push('a2');
        return Promise.resolve(jsonResponse({ audiobook: bookB, progress: null }));
      }
      return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
    });
    vi.stubGlobal('fetch', fn);

    const router = makeRouter();
    const w = await mountAt(router);
    await flushPromises();
    expect(w.find('.player-title').text()).toBe('Children of Time');

    // The shell renders a keyless <RouterView/> (src/PhlixApp.vue:65): same-route,
    // new-param navigation REUSES this instance. The page must hand itself over.
    // Mid-book position first (phlix-ui-player-021 data-integrity half, round-1
    // Minor): A's playhead must be PERSISTED on the hand-off — the watch's flush
    // leg (AudiobookPlayerPage.vue:162-164) POSTs it synchronously BEFORE the
    // state reset below nulls the ref, with the id captured at payload-build
    // time (:240) so the request can never chase book B's endpoint.
    const audioEl = w.find('audio').element as HTMLMediaElement;
    audioEl.currentTime = 42;
    await w.find('audio').trigger('timeupdate'); // currentTime ref -> 42

    await router.push('/app/audiobooks/a2/read');
    await flushPromises();

    expect(reads).toEqual(['a1', 'a2']);
    // Exactly ONE progress POST: the flush. A's debounce armed by the timeupdate
    // above is cancelled by the watch (:158-160), and the post-reset unmount sees
    // a zeroed playhead — neither may add a second save.
    expect(posts).toHaveLength(1);
    // Captured-id pin: the flush addressed A'S endpoint with A's real position;
    // a post-await id read would hit the nulled ref (swallowed throw -> no POST)
    // or, after a2 lands, B's endpoint.
    expect(isRoute(posts[0].url, PROGRESS_PATH)).toBe(true);
    expect(posts[0].body.position_ms).toBe(42_000);
    expect(w.find('.player-title').text()).toBe('Dune');
    // Book A's element is paused before the state flips (no ghost narrator).
    expect(pauseSpy).toHaveBeenCalled();
    w.unmount();
  });
});
