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
import Button from '../../components/ui/Button.vue';
import { useToastStore } from '../../stores/useToastStore';
import { api, type ApiClient } from '../../api/client';

const pendingRow = {
  id: 'a1',
  user_id: 'u1',
  type: 'movie',
  tmdb_id: 550,
  title: 'Fight Club',
  poster_url: null,
  season: null,
  episode: null,
  status: 'pending',
  rejection_reason: null,
  created_at: '2026-05-01T00:00:00Z',
  updated_at: '2026-05-01T00:00:00Z',
};

function makeClient(rows: unknown[] = [pendingRow]) {
  const get = vi.fn(async () => ({ requests: rows, count: rows.length }));
  const post = vi.fn(async () => ({ message: 'ok', request_id: 'a1' }));
  const client = { get, post } as unknown as ApiClient;
  return { client, get, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(RequestsPage, { props: { client }, attachTo: document.body });
}

function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('admin/RequestsPage — list + states', () => {
  it('loads the pending queue on mount with ?status=pending', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/requests', { status: 'pending' });
    expect(w.text()).toContain('Fight Club');
    w.unmount();
  });

  it('shows the empty state when the queue is empty', async () => {
    const { client } = makeClient([]);
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No requests');
    w.unmount();
  });

  it('shows an error EmptyState + toasts on a load failure', async () => {
    const get = vi.fn().mockRejectedValue(new Error('queue down'));
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load requests");
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'queue down')).toBe(true);
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ requests: [], count: 0 } as never);
    const w = mount(RequestsPage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/admin/requests', { status: 'pending' });
    w.unmount();
  });
});

describe('admin/RequestsPage — tab switch', () => {
  it('clicking Available re-queries with ?status=available and hides the action buttons', async () => {
    const { client, get } = makeClient([
      { ...pendingRow, status: 'available' },
    ]);
    const w = mountPage(client);
    await flushPromises();

    const availableTab = w.findAll('[role="tab"]').find((t) => t.text().trim() === 'Available')!;
    await availableTab.trigger('click');
    await flushPromises();

    expect(get).toHaveBeenLastCalledWith('/api/v1/admin/requests', { status: 'available' });
    // On the available tab there are no Approve/Deny buttons.
    expect(findBtnByText(w, 'Approve')).toBeFalsy();
    expect(findBtnByText(w, 'Deny')).toBeFalsy();
    w.unmount();
  });
});

describe('admin/RequestsPage — approve', () => {
  it('Approve → POSTs the approve endpoint, toasts, and reloads', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.length;
    await findBtnByText(w, 'Approve')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/requests/a1/approve');
    expect(get.mock.calls.length).toBeGreaterThan(before);
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Request approved.')).toBe(true);
    w.unmount();
  });

  it('toasts a 403 error message when approve is forbidden', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('Forbidden'));
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Approve')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'Forbidden')).toBe(true);
    w.unmount();
  });
});

describe('admin/RequestsPage — deny with reason', () => {
  it('Deny prompts for a reason and POSTs it in the body', async () => {
    const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue('Not available anywhere');
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Deny')!.trigger('click');
    await flushPromises();
    expect(promptSpy).toHaveBeenCalled();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/requests/a1/deny', { reason: 'Not available anywhere' });
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Request denied.')).toBe(true);
    w.unmount();
  });

  it('Deny with an empty reason POSTs an empty body', async () => {
    vi.spyOn(window, 'prompt').mockReturnValue('');
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Deny')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/requests/a1/deny', {});
    w.unmount();
  });

  it('Cancelling the deny prompt does not POST', async () => {
    vi.spyOn(window, 'prompt').mockReturnValue(null);
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Deny')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });
});
