/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import AudiobooksPage from './AudiobooksPage.vue';
import type { AudiobookListItem } from '../types/audiobook';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function audiobook(over: Partial<AudiobookListItem> = {}): AudiobookListItem {
  return {
    id: 'a1',
    name: 'Project Hail Mary',
    type: 'audiobook',
    metadata: { author: 'Andy Weir', narrator: 'Ray Porter', duration_ms: 3600_000 },
    cover_url: null,
    ...over,
  };
}

function stubFetch(opts: { audiobooks?: AudiobookListItem[]; error?: boolean; hang?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (opts.hang) return new Promise<Response>(() => {});
    if (u.includes('/api/v1/audiobooks')) {
      if (opts.error) return Promise.reject(new Error('audiobooks down'));
      return Promise.resolve(jsonResponse({ audiobooks: opts.audiobooks ?? [audiobook()] }));
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
    ],
  });
}

function mountPage(router: Router): VueWrapper {
  return mount(AudiobooksPage, {
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: { Icon: { template: '<span class="icon" />' } },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('AudiobooksPage — states', () => {
  it('loads audiobooks on mount from GET /api/v1/audiobooks and renders a card', async () => {
    const fetchFn = stubFetch({ audiobooks: [audiobook({ name: 'The Martian' })] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(fetchFn.mock.calls[0][0]).toContain('/api/v1/audiobooks');
    const cards = w.findAll('.audiobook-card');
    expect(cards).toHaveLength(1);
    expect(cards[0].text()).toContain('The Martian');
    w.unmount();
  });

  it('shows the loading skeleton while the request is in flight', async () => {
    stubFetch({ hang: true });
    const w = mountPage(makeRouter());
    await Promise.resolve();
    expect(w.find('.audiobooks-page__loading').exists()).toBe(true);
    expect(w.find('.audiobook-card').exists()).toBe(false);
    w.unmount();
  });

  it('shows the empty state when there are no audiobooks', async () => {
    stubFetch({ audiobooks: [] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.audiobooks-page__empty').exists()).toBe(true);
    expect(w.text()).toContain('No audiobooks found');
    w.unmount();
  });

  it('shows the error state when the load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    const err = w.find('.audiobooks-page__error');
    expect(err.exists()).toBe(true);
    expect(err.text()).toContain('Could not load audiobooks');
    w.unmount();
  });
});

describe('AudiobooksPage — navigation', () => {
  it('navigates to audiobook-detail with the id when a card is clicked', async () => {
    stubFetch({ audiobooks: [audiobook({ id: 'a42', name: 'Recursion' })] });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router);
    await flushPromises();
    await w.find('.audiobook-card').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'audiobook-detail', params: { id: 'a42' } });
    w.unmount();
  });
});
