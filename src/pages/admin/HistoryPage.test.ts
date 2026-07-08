/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, RouterLinkStub, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import HistoryPage from './HistoryPage.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const sampleRow = {
  id: 'wh-1',
  media_item_id: 'media-1',
  media_name: 'Test Movie',
  media_type: 'movie',
  library_id: 'lib-1',
  user_id: 'u-1',
  username: 'alice',
  display_name: 'Alice Anderson',
  profile_name: '',
  last_watched_at: '2026-05-28T10:30:00Z',
  completed_at: '',
  playback_status: 'in_progress',
  progress_percent: 45.5,
};

interface Overrides {
  data?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/watch-history') {
      return { success: true, data: over.data ?? [sampleRow], count: (over.data ?? [sampleRow]).length };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(HistoryPage, {
    props: { client },
    attachTo: document.body,
    global: { stubs: { RouterLink: RouterLinkStub } },
  });
}

/** Find a Button by its trimmed text. */
function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin HistoryPage — all-users list', () => {
  it('loads from the admin endpoint and renders the media title, user label, and time', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/watch-history', undefined);
    const text = w.text();
    expect(text).toContain('Test Movie');
    expect(text).toContain('movie');
    expect(text).toContain('Watched by Alice Anderson');
    expect(text).toContain('Watched');
    w.unmount();
  });

  it('falls back to the username for the user label when display_name is empty', async () => {
    const { client } = makeClient({ data: [{ ...sampleRow, display_name: '' }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Watched by alice');
    w.unmount();
  });

  it('links each row title to the media detail page under /app', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const links = w.findAllComponents(RouterLinkStub);
    const titleLink = links.find((l) => l.text().includes('Test Movie'));
    expect(titleLink).toBeTruthy();
    expect(titleLink!.props('to')).toBe('/app/media/media-1');
    w.unmount();
  });

  it('falls back to the row id in the link when media_item_id is empty', async () => {
    const { client } = makeClient({ data: [{ ...sampleRow, media_item_id: '' }] });
    const w = mountPage(client);
    await flushPromises();
    const link = w.findAllComponents(RouterLinkStub).find((l) => l.text().includes('Test Movie'));
    expect(link!.props('to')).toBe('/app/media/wh-1');
    w.unmount();
  });

  it('shows a skeleton while loading then the list', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-history__skel').exists()).toBe(true);
    resolve({ success: true, data: [sampleRow] });
    await flushPromises();
    expect(w.find('.admin-history__list').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there is no history', async () => {
    const { client } = makeClient({ data: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No watch history yet');
    expect(w.text()).toContain('Items watched across all users will appear here.');
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the history fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('load boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain("Couldn't load watch history");
    expect(w.text()).toContain('load boom');
    expect(w.text()).not.toContain('No watch history yet');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'load boom')).toBe(true);
    w.unmount();
  });

  it('retries the history load from the error state', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('load boom'))
      .mockResolvedValue({ success: true, data: [sampleRow] });
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.text()).toContain('Test Movie');
    w.unmount();
  });

  it('falls back to a generic message for a non-Error rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(toasts.toasts.some((t) => t.message === 'Failed to load watch history.')).toBe(true);
    w.unmount();
  });

  it('renders a progressbar for in-progress items', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const bar = w.find('[role="progressbar"]');
    expect(bar.exists()).toBe(true);
    expect(bar.attributes('aria-valuenow')).toBe('45.5');
    expect(w.text()).toContain('46%');
    w.unmount();
  });

  it('hides the progressbar for completed items', async () => {
    const completed = { ...sampleRow, progress_percent: 100 };
    const { client } = makeClient({ data: [completed] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[role="progressbar"]').exists()).toBe(false);
    w.unmount();
  });

  it('shows the truncation note past 50 items', async () => {
    const many = Array.from({ length: 50 }, (_, i) => ({ ...sampleRow, id: `wh-${i}` }));
    const { client } = makeClient({ data: many });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Showing 50 items');
    w.unmount();
  });

  it('drops the per-user mutation actions (read-only admin view)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).not.toContain('Clear All');
    expect(findBtn(w, 'Remove')).toBeUndefined();
    expect(findBtn(w, 'Continue')).toBeUndefined();
    w.unmount();
  });
});

describe('Admin HistoryPage — relative time formatting', () => {
  it('formats every time-ago bucket', async () => {
    const now = new Date('2026-06-02T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);
    const iso = (msAgo: number) => new Date(now.getTime() - msAgo).toISOString();
    const data = [
      { ...sampleRow, id: 'a', last_watched_at: iso(10 * 1000) }, // just now
      { ...sampleRow, id: 'b', last_watched_at: iso(60 * 1000) }, // 1 minute ago
      { ...sampleRow, id: 'c', last_watched_at: iso(5 * 60 * 1000) }, // 5 minutes ago
      { ...sampleRow, id: 'd', last_watched_at: iso(60 * 60 * 1000) }, // 1 hour ago
      { ...sampleRow, id: 'e', last_watched_at: iso(3 * 60 * 60 * 1000) }, // 3 hours ago
      { ...sampleRow, id: 'f', last_watched_at: iso(24 * 60 * 60 * 1000) }, // 1 day ago
      { ...sampleRow, id: 'g', last_watched_at: iso(5 * 24 * 60 * 60 * 1000) }, // 5 days ago
      { ...sampleRow, id: 'h', last_watched_at: iso(60 * 24 * 60 * 60 * 1000) }, // 2 months ago
    ];
    const { client } = makeClient({ data });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('just now');
    expect(text).toContain('1 minute ago');
    expect(text).toContain('5 minutes ago');
    expect(text).toContain('1 hour ago');
    expect(text).toContain('3 hours ago');
    expect(text).toContain('1 day ago');
    expect(text).toContain('5 days ago');
    expect(text).toContain('2 months ago');
    w.unmount();
    vi.useRealTimers();
  });
});
