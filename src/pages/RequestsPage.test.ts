/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import RequestsPage from './RequestsPage.vue';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import { useToastStore } from '../stores/useToastStore';
import { api, type ApiClient } from '../api/client';

/** A raw request row from GET /api/v1/me/requests (snake_case, ISO dates). */
const movieReq = {
  id: 'r1',
  type: 'movie',
  tmdb_id: 550,
  title: 'Fight Club',
  poster_url: 'https://img/550.jpg',
  status: 'pending',
  created_at: '2026-05-01T00:00:00Z',
};
const seriesReq = {
  id: 'r2',
  type: 'series',
  tmdb_id: 1396,
  title: 'Breaking Bad',
  poster_url: null,
  season: 1,
  episode: 2,
  status: 'available',
  created_at: '2026-06-01T00:00:00Z',
};

interface Overrides {
  requests?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async () => ({ requests: over.requests ?? [movieReq], count: (over.requests ?? [movieReq]).length }));
  const post = vi.fn(async () => ({ request: {}, message: 'ok' }));
  const del = vi.fn(async () => ({}));
  const client = { get, post, delete: del } as unknown as ApiClient;
  return { client, get, post, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(RequestsPage, { props: { client }, attachTo: document.body });
}

function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}
function findBtnByLabel(w: VueWrapper, label: string) {
  return w.findAllComponents(Button).find((b) => b.attributes('aria-label') === label);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('RequestsPage — list + states', () => {
  it('loads requests on mount and renders a card', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/requests');
    expect(w.text()).toContain('Fight Club');
    expect(w.text()).toContain('TMDB 550');
    w.unmount();
  });

  it('shows a skeleton while loading, then the list', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const client = { get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.requests__skel').exists()).toBe(true);
    resolve({ requests: [movieReq] });
    await flushPromises();
    expect(w.find('.requests__skel').exists()).toBe(false);
    expect(w.text()).toContain('Fight Club');
    w.unmount();
  });

  it('shows the empty state when there are no requests', async () => {
    const { client } = makeClient({ requests: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No requests yet');
    w.unmount();
  });

  it('shows an error EmptyState + toasts when the load fails', async () => {
    const get = vi.fn().mockRejectedValue(new Error('requests down'));
    const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load requests");
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'requests down')).toBe(true);
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ requests: [] } as never);
    const w = mount(RequestsPage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/me/requests');
    expect(w.text()).toContain('No requests yet');
    w.unmount();
  });
});

describe('RequestsPage — badges', () => {
  it('renders type + status badges (Movie/Pending, Series/Available)', async () => {
    const { client } = makeClient({ requests: [movieReq, seriesReq] });
    const w = mountPage(client);
    await flushPromises();
    const labels = w.findAllComponents(Badge).map((b) => b.text().trim());
    expect(labels).toEqual(expect.arrayContaining(['Movie', 'Pending', 'Series', 'Available']));
    w.unmount();
  });
});

describe('RequestsPage — create', () => {
  it('submits a movie request with tmdb_id/title/poster_url in the POST body', async () => {
    const { client, post } = makeClient({ requests: [] });
    const w = mountPage(client);
    await flushPromises();

    await findBtnByText(w, 'New Request')!.trigger('click');
    await flushPromises();

    const form = document.querySelector('.request-form') as HTMLElement;
    const tmdb = form.querySelector('input[type="number"]') as HTMLInputElement;
    const title = form.querySelector('input[type="text"]') as HTMLInputElement;
    const poster = form.querySelectorAll('input[type="text"]')[1] as HTMLInputElement;
    tmdb.value = '550';
    tmdb.dispatchEvent(new Event('input'));
    title.value = 'Fight Club';
    title.dispatchEvent(new Event('input'));
    poster.value = 'https://img/550.jpg';
    poster.dispatchEvent(new Event('input'));
    await flushPromises();

    await findBtnByText(w, 'Submit Request')!.trigger('click');
    await flushPromises();

    expect(post).toHaveBeenCalledWith('/api/v1/me/requests', {
      type: 'movie',
      tmdb_id: 550,
      title: 'Fight Club',
      poster_url: 'https://img/550.jpg',
    });
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Request submitted.')).toBe(true);
    w.unmount();
  });

  it('does not POST when required fields are missing', async () => {
    const { client, post } = makeClient({ requests: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'New Request')!.trigger('click');
    await flushPromises();
    // No tmdb/title entered → submit is a no-op.
    await findBtnByText(w, 'Submit Request')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe('RequestsPage — delete', () => {
  it('Delete → DELETEs the request, toasts, and reloads', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.length;
    await findBtnByLabel(w, 'Delete request for Fight Club')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/me/requests/r1');
    expect(get.mock.calls.length).toBeGreaterThan(before);
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Request deleted.')).toBe(true);
    w.unmount();
  });

  it('toasts an error when delete fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('not yours'));
    const w = mountPage(client);
    await flushPromises();
    await findBtnByLabel(w, 'Delete request for Fight Club')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'not yours')).toBe(true);
    w.unmount();
  });
});
