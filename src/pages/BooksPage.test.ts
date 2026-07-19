/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import BooksPage from './BooksPage.vue';
import type { BookListItem } from '../types/book';

// ---------------------------------------------------------------------------
// The page constructs `new ApiClient({ baseUrl })` internally and calls
// `GET /api/v1/books` through the browser `fetch`. We stub global fetch (the
// same seam MusicLibraryPage/ExplorePage tests use) and route by URL.
// ---------------------------------------------------------------------------

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function book(over: Partial<BookListItem> = {}): BookListItem {
  return {
    id: 'b1',
    name: 'The Left Hand of Darkness',
    type: 'book',
    metadata: { author: 'Ursula K. Le Guin', page_count: 304 },
    cover_url: null,
    ...over,
  };
}

function stubFetch(opts: { books?: BookListItem[]; error?: boolean; hang?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (opts.hang) return new Promise<Response>(() => {});
    if (u.includes('/api/v1/books')) {
      if (opts.error) return Promise.reject(new Error('books down'));
      return Promise.resolve(jsonResponse({ books: opts.books ?? [book()] }));
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
      { path: '/app/books', name: 'books', component: stub },
      { path: '/app/books/:id', name: 'book-detail', component: stub },
    ],
  });
}

function mountPage(router: Router): VueWrapper {
  return mount(BooksPage, {
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

describe('BooksPage — states', () => {
  it('loads books on mount from GET /api/v1/books and renders a card', async () => {
    const fetchFn = stubFetch({ books: [book({ name: 'Dune' })] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(fetchFn.mock.calls[0][0]).toContain('/api/v1/books');
    const cards = w.findAll('.book-card');
    expect(cards).toHaveLength(1);
    expect(cards[0].text()).toContain('Dune');
    w.unmount();
  });

  it('shows the loading skeleton while the request is in flight', async () => {
    stubFetch({ hang: true });
    const w = mountPage(makeRouter());
    // onMounted set loading=true synchronously before the promise resolves.
    await Promise.resolve();
    expect(w.find('.books-page__loading').exists()).toBe(true);
    expect(w.find('.book-card').exists()).toBe(false);
    w.unmount();
  });

  it('shows the empty state when the library has no books', async () => {
    stubFetch({ books: [] });
    const w = mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.books-page__empty').exists()).toBe(true);
    expect(w.text()).toContain('No books found');
    w.unmount();
  });

  it('shows the error state when the load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage(makeRouter());
    await flushPromises();
    const err = w.find('.books-page__error');
    expect(err.exists()).toBe(true);
    expect(err.text()).toContain('Could not load books');
    w.unmount();
  });
});

describe('BooksPage — navigation', () => {
  it('navigates to book-detail with the id when a card is clicked', async () => {
    stubFetch({ books: [book({ id: 'b42', name: 'Neuromancer' })] });
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = mountPage(router);
    await flushPromises();
    await w.find('.book-card').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'book-detail', params: { id: 'b42' } });
    w.unmount();
  });
});
