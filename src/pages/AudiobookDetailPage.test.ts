/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import AudiobookDetailPage from './AudiobookDetailPage.vue';
import Button from '../components/ui/Button.vue';
import type { AudiobookDetail } from '../types/audiobook';

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
    name: 'The Three-Body Problem',
    type: 'audiobook',
    metadata: {
      author: 'Liu Cixin',
      narrator: 'Luke Daniels',
      language: 'English',
      duration_ms: 46800_000,
      description: 'First contact with a doomed civilization.',
    },
    cover_url: null,
    stream_url: '/media/a1/stream',
    chapters: [
      { index: 0, title: 'Prologue', start_ms: 0, end_ms: 600_000, duration_ms: 600_000 },
      { index: 1, title: 'The Madness Years', start_ms: 600_000, end_ms: 1_800_000, duration_ms: 1_200_000 },
    ],
    ...over,
  };
}

function stubFetch(opts: { audiobook?: AudiobookDetail | null; error?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/audiobooks/')) {
      if (opts.error) return Promise.reject(new Error('detail down'));
      return Promise.resolve(jsonResponse({ audiobook: opts.audiobook === undefined ? detail() : opts.audiobook }));
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
      { path: '/app/audiobooks', name: 'audiobooks', component: stub },
      { path: '/app/audiobooks/:id', name: 'audiobook-detail', component: stub },
      { path: '/app/audiobooks/:id/read', name: 'audiobook-player', component: stub },
    ],
  });
}

async function mountAt(router: Router, id = 'a1'): Promise<VueWrapper> {
  await router.push(`/app/audiobooks/${id}`);
  await router.isReady();
  return mount(AudiobookDetailPage, {
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

function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim().includes(text));
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('AudiobookDetailPage — load + render', () => {
  it('loads by :id from GET /api/v1/audiobooks/{id} and renders metadata + chapters', async () => {
    const fetchFn = stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(fetchFn.mock.calls[0][0]).toContain('/api/v1/audiobooks/a1');
    expect(w.find('.audiobook-title').text()).toBe('The Three-Body Problem');
    expect(w.text()).toContain('Liu Cixin');
    expect(w.text()).toContain('Luke Daniels');
    const chapters = w.findAll('.chapter-item');
    expect(chapters).toHaveLength(2);
    expect(chapters[0].text()).toContain('Prologue');
    w.unmount();
  });

  it('shows the error state when the audiobook is not found', async () => {
    stubFetch({ audiobook: null });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.audiobook-detail-page__error').text()).toContain('Audiobook not found');
    w.unmount();
  });

  it('shows the error state when the request fails', async () => {
    stubFetch({ error: true });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.audiobook-detail-page__error').text()).toContain('Could not load audiobook');
    w.unmount();
  });
});

describe('AudiobookDetailPage — actions', () => {
  it('Play navigates to the audiobook-player with the id', async () => {
    stubFetch();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountAt(router);
    await flushPromises();
    await findBtnByText(w, 'Play')!.trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'audiobook-player', params: { id: 'a1' } });
    w.unmount();
  });
});
