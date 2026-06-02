import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import HistoryPage from './HistoryPage.vue';
import Button from '../../components/ui/Button.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const sampleItem = {
  id: 'wh-1',
  media_item_id: 'media-1',
  name: 'Test Movie',
  title: 'Test Movie',
  media_type: 'movie',
  type: 'movie',
  progress_percent: 45.5,
  last_watched_at: '2026-05-28T10:30:00Z',
  thumbnail_url: 'https://example.com/thumb.jpg',
  poster_url: 'https://example.com/poster.jpg',
};

interface Overrides {
  items?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/users/me/recently-watched') {
      return { items: over.items ?? [sampleItem] };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const del = vi.fn(async () => ({ message: 'ok' }));
  const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(HistoryPage, { props: { client }, attachTo: document.body });
}

/** Find a Button by its trimmed text. */
function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

/** Find a Button by trimmed text whose root element is inside `root`. */
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}

/** The currently-open modal panel teleported to body. */
function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1];
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin HistoryPage — list', () => {
  it('loads and renders the history rows', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/users/me/recently-watched');
    const text = w.text();
    expect(text).toContain('Test Movie');
    expect(text).toContain('movie');
    expect(text).toContain('Watched');
    w.unmount();
  });

  it('shows a skeleton while loading then the list', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-history__skel').exists()).toBe(true);
    resolve({ items: [sampleItem] });
    await flushPromises();
    expect(w.find('.admin-history__list').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there is no history', async () => {
    const { client } = makeClient({ items: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No watch history yet');
    // No "Clear All" button when empty.
    expect(findBtn(w, 'Clear All')).toBeUndefined();
    w.unmount();
  });

  it('toasts when the history fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('load boom'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'load boom')).toBe(true);
    w.unmount();
  });

  it('renders a progressbar + Continue for in-progress items', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const bar = w.find('[role="progressbar"]');
    expect(bar.exists()).toBe(true);
    expect(bar.attributes('aria-valuenow')).toBe('45.5');
    expect(w.text()).toContain('46%');
    expect(findBtn(w, 'Continue')).toBeTruthy();
    w.unmount();
  });

  it('hides the progressbar + Continue for completed items', async () => {
    const completed = { ...sampleItem, progress_percent: 100 };
    const { client } = makeClient({ items: [completed] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[role="progressbar"]').exists()).toBe(false);
    expect(findBtn(w, 'Continue')).toBeUndefined();
    w.unmount();
  });

  it('falls back to a placeholder + id-based title when fields are missing', async () => {
    const bare = { id: 'only-id', progress_percent: 0 };
    const { client } = makeClient({ items: [bare] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('only-id');
    expect(w.text()).toContain('media');
    // No thumbnail → placeholder icon, no <img>, no time line.
    expect(w.find('.admin-history__img').exists()).toBe(false);
    expect(w.find('.admin-history__placeholder').exists()).toBe(true);
    w.unmount();
  });

  it('shows the truncation note past 50 items', async () => {
    const many = Array.from({ length: 50 }, (_, i) => ({ ...sampleItem, id: `wh-${i}` }));
    const { client } = makeClient({ items: many });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Showing 50 items');
    w.unmount();
  });
});

describe('Admin HistoryPage — remove + continue', () => {
  it('removes an item and refetches the list', async () => {
    const { client, get, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/users/me/history/media-1');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/users/me/recently-watched').length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('Removed'))).toBe(true);
    w.unmount();
  });

  it('toasts when removing an item fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('remove boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'remove boom')).toBe(true);
    w.unmount();
  });

  it('emits continue with the media id', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Continue')!.trigger('click');
    await flushPromises();
    expect(w.emitted('continue')?.[0]).toEqual(['media-1']);
    w.unmount();
  });

  it('emits continue with the bare id when media_item_id is absent', async () => {
    const noMediaId = { ...sampleItem, media_item_id: undefined };
    const { client } = makeClient({ items: [noMediaId] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Continue')!.trigger('click');
    await flushPromises();
    expect(w.emitted('continue')?.[0]).toEqual(['wh-1']);
    w.unmount();
  });
});

describe('Admin HistoryPage — clear all', () => {
  it('opens the confirm modal from the header', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clear All')!.trigger('click');
    await flushPromises();
    expect(modalPanel()).toBeTruthy();
    expect(document.body.textContent).toContain('cannot be undone');
    w.unmount();
  });

  it('clears history after confirmation and refetches', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clear All')!.trigger('click');
    await flushPromises();
    // Scope to the modal — the header also has a "Clear All" button.
    await findBtnIn(w, modalPanel(), 'Clear All')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/users/me/history');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/users/me/recently-watched').length).toBeGreaterThan(1);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('cleared'))).toBe(true);
    w.unmount();
  });

  it('toasts when clearing fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('clear boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clear All')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Clear All')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'clear boom')).toBe(true);
    w.unmount();
  });

  it('cancels the clear confirm without mutating', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clear All')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe('Admin HistoryPage — relative time formatting', () => {
  it('formats every time-ago bucket', async () => {
    const now = new Date('2026-06-02T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);
    const iso = (msAgo: number) => new Date(now.getTime() - msAgo).toISOString();
    const items = [
      { ...sampleItem, id: 'a', last_watched_at: iso(10 * 1000) }, // just now
      { ...sampleItem, id: 'b', last_watched_at: iso(60 * 1000) }, // 1 minute ago
      { ...sampleItem, id: 'c', last_watched_at: iso(5 * 60 * 1000) }, // 5 minutes ago
      { ...sampleItem, id: 'd', last_watched_at: iso(60 * 60 * 1000) }, // 1 hour ago
      { ...sampleItem, id: 'e', last_watched_at: iso(3 * 60 * 60 * 1000) }, // 3 hours ago
      { ...sampleItem, id: 'f', last_watched_at: iso(24 * 60 * 60 * 1000) }, // 1 day ago
      { ...sampleItem, id: 'g', last_watched_at: iso(5 * 24 * 60 * 60 * 1000) }, // 5 days ago
      { ...sampleItem, id: 'h', last_watched_at: iso(60 * 24 * 60 * 60 * 1000) }, // 2 months ago
    ];
    const { client } = makeClient({ items });
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
