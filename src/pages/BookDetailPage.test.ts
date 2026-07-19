/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import BookDetailPage from './BookDetailPage.vue';
import Button from '../components/ui/Button.vue';
import type { BookDetail } from '../types/book';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function bookDetail(over: Partial<BookDetail> = {}): BookDetail {
  return {
    id: 'b1',
    name: 'Snow Crash',
    type: 'book',
    metadata: {
      author: 'Neal Stephenson',
      publisher: 'Bantam Books',
      language: 'English',
      pub_date: '1992',
      page_count: 480,
      isbn: '978-0553380958',
      description: 'A pizza-delivering hacker in a cyberpunk future.',
    },
    cover_url: null,
    download_url: 'https://dl/snow-crash.epub',
    ...over,
  };
}

function stubFetch(opts: { book?: BookDetail | null; error?: boolean; hang?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (opts.hang) return new Promise<Response>(() => {});
    if (u.includes('/api/v1/books/')) {
      if (opts.error) return Promise.reject(new Error('detail down'));
      return Promise.resolve(jsonResponse({ book: opts.book === undefined ? bookDetail() : opts.book }));
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
      { path: '/app/books/:id/read', name: 'book-reader', component: stub },
    ],
  });
}

async function mountAt(router: Router, id = 'b1'): Promise<VueWrapper> {
  await router.push(`/app/books/${id}`);
  await router.isReady();
  return mount(BookDetailPage, {
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

describe('BookDetailPage — load + render', () => {
  it('loads by :id from GET /api/v1/books/{id} and renders metadata', async () => {
    const fetchFn = stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(fetchFn.mock.calls[0][0]).toContain('/api/v1/books/b1');
    expect(w.find('.book-title').text()).toBe('Snow Crash');
    expect(w.text()).toContain('Neal Stephenson');
    expect(w.text()).toContain('Bantam Books');
    expect(w.text()).toContain('978-0553380958');
    expect(w.text()).toContain('480');
    w.unmount();
  });

  it('shows the error state when the book is not found (null book)', async () => {
    stubFetch({ book: null });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.book-detail-page__error').text()).toContain('Book not found');
    w.unmount();
  });

  it('shows the error state when the request fails', async () => {
    stubFetch({ error: true });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.book-detail-page__error').text()).toContain('Could not load book');
    w.unmount();
  });
});

describe('BookDetailPage — actions', () => {
  it('Read button navigates to book-reader with the book id', async () => {
    stubFetch();
    const router = makeRouter();
    const push = vi.spyOn(router, 'push');
    const w = await mountAt(router);
    await flushPromises();
    await findBtnByText(w, 'Start Reading')!.trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'book-reader', params: { id: 'b1' } });
    w.unmount();
  });

  it('Download opens the book download_url in a new tab', async () => {
    stubFetch({ book: bookDetail({ download_url: 'https://dl/x.epub' }) });
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const w = await mountAt(makeRouter());
    await flushPromises();
    await findBtnByText(w, 'Download')!.trigger('click');
    expect(open).toHaveBeenCalledWith('https://dl/x.epub', '_blank');
    w.unmount();
  });
});
