/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import BookReaderPage from './BookReaderPage.vue';
import Button from '../components/ui/Button.vue';
import type { BookDetail, BookProgress } from '../types/book';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function bookDetail(): BookDetail {
  return {
    id: 'b1',
    name: 'Hyperion',
    type: 'book',
    metadata: { author: 'Dan Simmons', publisher: 'Doubleday', page_count: 482, isbn: '111', description: 'Pilgrims.' },
    cover_url: null,
  };
}

function progress(): BookProgress {
  return {
    book_id: 'b1',
    user_id: 'u1',
    position_ms: 0,
    current_page: 1,
    total_pages: 5,
    percent_complete: 20,
    last_read_at: null,
  };
}

interface ReadOpts {
  totalPages?: number;
  currentPage?: number;
  withProgress?: boolean;
  error?: boolean;
}

function stubFetch(opts: ReadOpts = {}) {
  const post = vi.fn((_url: unknown, _init: RequestInit) => Promise.resolve(jsonResponse({ progress: progress() })));
  const fn = vi.fn((url: unknown, init?: RequestInit) => {
    const u = typeof url === 'string' ? url : '';
    if (init && init.method === 'POST') return post(url, init);
    if (u.includes('/read')) {
      if (opts.error) return Promise.reject(new Error('reader down'));
      return Promise.resolve(jsonResponse({
        book: bookDetail(),
        chapters: [
          { index: 0, title: 'Chapter One', start_ms: 0, end_ms: 1000, href: '' },
          { index: 1, title: 'Chapter Two', start_ms: 1000, end_ms: 2000, href: '' },
        ],
        current_page: opts.currentPage ?? 1,
        total_pages: opts.totalPages ?? 5,
        progress: opts.withProgress === false ? null : progress(),
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
      { path: '/app/books', name: 'books', component: stub },
      { path: '/app/books/:id', name: 'book-detail', component: stub },
      { path: '/app/books/:id/read', name: 'book-reader', component: stub },
    ],
  });
}

async function mountAt(router: Router, id = 'b1'): Promise<VueWrapper> {
  await router.push(`/app/books/${id}/read`);
  await router.isReady();
  return mount(BookReaderPage, {
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
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}
function findCtrlByTitle(w: VueWrapper, title: string) {
  return w.findAll('button').find((b) => b.attributes('title') === title)!;
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('BookReaderPage — load', () => {
  it('loads via GET /api/v1/books/{id}/read and renders the book', async () => {
    const { fn } = stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(fn.mock.calls[0][0]).toContain('/api/v1/books/b1/read');
    expect(w.find('.reader-toolbar__title').text()).toBe('Hyperion');
    expect(w.text()).toContain('About this Book');
    w.unmount();
  });

  it('shows the error state when the load fails', async () => {
    stubFetch({ error: true });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.reader-error').text()).toContain('Could not load book');
    w.unmount();
  });
});

describe('BookReaderPage — pagination', () => {
  it('disables Previous on the first page and advances with Next', async () => {
    stubFetch({ currentPage: 1, totalPages: 5 });
    const w = await mountAt(makeRouter());
    await flushPromises();

    expect(w.find('.reader-pagination__indicator').text()).toContain('Page 1');
    expect(w.find('.reader-pagination__indicator').text()).toContain('/ 5');
    expect(findBtnByText(w, 'Previous')!.props('disabled')).toBe(true);

    await findBtnByText(w, 'Next')!.trigger('click');
    await flushPromises();
    expect(w.find('.reader-pagination__indicator').text()).toContain('Page 2');
    expect(findBtnByText(w, 'Previous')!.props('disabled')).toBe(false);
    w.unmount();
  });

  it('disables Next on the last page', async () => {
    stubFetch({ currentPage: 5, totalPages: 5 });
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(findBtnByText(w, 'Next')!.props('disabled')).toBe(true);
    w.unmount();
  });
});

describe('BookReaderPage — reader controls', () => {
  it('increases and decreases the font size within bounds', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    const content = () => w.find('.reader-page-content');
    expect(content().attributes('style')).toContain('font-size: 16px');

    await findCtrlByTitle(w, 'Increase font size').trigger('click');
    expect(content().attributes('style')).toContain('font-size: 18px');

    await findCtrlByTitle(w, 'Decrease font size').trigger('click');
    await findCtrlByTitle(w, 'Decrease font size').trigger('click');
    expect(content().attributes('style')).toContain('font-size: 14px');
    w.unmount();
  });

  it('switches the reader theme between light, sepia and dark', async () => {
    stubFetch();
    const w = await mountAt(makeRouter());
    await flushPromises();
    expect(w.find('.reader-page').classes()).toContain('reader-page--theme-light');

    await findCtrlByTitle(w, 'Sepia mode').trigger('click');
    expect(w.find('.reader-page').classes()).toContain('reader-page--theme-sepia');
    expect(findCtrlByTitle(w, 'Sepia mode').classes()).toContain('reader-btn--active');

    await findCtrlByTitle(w, 'Dark mode').trigger('click');
    expect(w.find('.reader-page').classes()).toContain('reader-page--theme-dark');
    w.unmount();
  });
});

describe('BookReaderPage — progress persistence', () => {
  it('POSTs progress (debounced) after turning the page', async () => {
    vi.useFakeTimers();
    const { post } = stubFetch({ currentPage: 1, totalPages: 5 });
    const w = await mountAt(makeRouter());
    await flushPromises();

    await findBtnByText(w, 'Next')!.trigger('click');
    expect(post).not.toHaveBeenCalled(); // debounced, not immediate
    await vi.advanceTimersByTimeAsync(2000);

    expect(post).toHaveBeenCalledTimes(1);
    const [url, init] = post.mock.calls[0];
    expect(String(url)).toContain('/api/v1/books/b1/progress');
    const body = JSON.parse(init.body as string);
    expect(body.current_page).toBe(2);
    expect(body.total_pages).toBe(5);
    w.unmount();
  });
});
