import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import LibraryScanPage from './LibraryScanPage.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import { api, type ApiClient } from '../api/client';

const lib = {
  id: 'lib-1',
  name: 'Movies',
  type: 'movie',
  paths: ['/media/movies'],
  item_count: 42,
  last_scan_at: '2026-05-27T00:00:00Z',
  created_at: '2026-05-01T00:00:00Z',
};

function job(overrides: Record<string, unknown> = {}) {
  return {
    id: 'job-1',
    library_id: 'lib-1',
    status: 'running',
    queued_at: '2026-05-27T00:00:00Z',
    started_at: '2026-05-27T00:00:01Z',
    completed_at: null,
    error: null,
    ...overrides,
  };
}

interface Overrides {
  libraries?: unknown[];
  /** scan-status `job` returned for the per-library status fetch. */
  scanStatus?: unknown;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/libraries') return { libraries: over.libraries ?? [lib] };
    if (endpoint.endsWith('/scan-status')) return { job: over.scanStatus ?? null };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (_endpoint: string): Promise<Record<string, unknown>> => ({}));
  const client = { get, post } as unknown as ApiClient;
  return { client, get, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(LibraryScanPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, label: string) {
  return w.findAllComponents(Button).find((b) => b.attributes('aria-label') === label);
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

describe('LibraryScanPage — list + states', () => {
  it('renders a row with name, paths, type, items, last scan, and an idle status', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/libraries');
    const text = w.text();
    expect(text).toContain('Movies');
    expect(text).toContain('/media/movies');
    expect(text).toContain('movie');
    expect(text).toContain('42');
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Idle');
    w.unmount();
  });

  it('shows a skeleton while loading, then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const client = { get, post: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.library-scan__skel').exists()).toBe(true);
    resolve({ libraries: [lib] });
    await flushPromises();
    expect(w.find('.library-scan__skel').exists()).toBe(false);
    expect(w.find('.library-scan__table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there are no libraries', async () => {
    const { client } = makeClient({ libraries: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No libraries configured');
    expect(w.find('.library-scan__table').exists()).toBe(false);
    w.unmount();
  });

  it('renders "Never" for a library that has never been scanned and "—" for unknown item count', async () => {
    const { client } = makeClient({
      libraries: [{ id: 'lib-2', name: 'Shows', type: 'series', paths: [], created_at: '2026-05-01T00:00:00Z' }],
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Never');
    expect(w.text()).toContain('—');
    // No paths → the monospace path sub-line is not rendered.
    expect(w.find('.library-scan__paths').exists()).toBe(false);
    w.unmount();
  });

  it('treats a response with no `libraries` key as empty', async () => {
    const get = vi.fn(async () => ({}));
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('No libraries configured');
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ libraries: [] } as never);
    const w = mount(LibraryScanPage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/libraries');
    expect(w.text()).toContain('No libraries configured');
    w.unmount();
  });
});

describe('LibraryScanPage — load errors', () => {
  it('shows an error EmptyState + toasts when the list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('DB down'));
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load libraries");
    expect(w.text()).toContain('DB down');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'DB down')).toBe(true);
    w.unmount();
  });

  it('uses a generic message for a non-Error rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain('Failed to load libraries.');
    expect(toasts.toasts.some((t) => t.message === 'Failed to load libraries.')).toBe(true);
    w.unmount();
  });

  it('Retry re-loads after a failure', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('DB down'))
      .mockResolvedValueOnce({ libraries: [lib] })
      .mockResolvedValue({ job: null });
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load libraries");
    await findBtnByText(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.find('.library-scan__table').exists()).toBe(true);
    expect(w.text()).toContain('Movies');
    w.unmount();
  });

  it('ignores a per-library scan-status failure on load (no toast, idle badge)', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      if (endpoint.endsWith('/scan-status')) throw new Error('status boom');
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('Movies');
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Idle');
    expect(useToastStore().toasts.length).toBe(0);
    w.unmount();
  });
});

describe('LibraryScanPage — status badges', () => {
  it('shows a Running badge for an in-flight scan (legacy `job` wire shape)', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'running' }) });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Running');
    w.unmount();
  });

  it('reads the live server `scan_status` wire shape', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      if (endpoint.endsWith('/scan-status')) return { scan_status: job({ status: 'running' }) };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Running');
    w.unmount();
  });

  it('shows a Completed badge', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'completed', completed_at: '2026-05-27T00:01:00Z' }) });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Completed');
    w.unmount();
  });

  it('shows a Queued badge', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'queued' }) });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Queued');
    w.unmount();
  });

  it('shows a Failed badge with the server error string', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'failed', error: 'ffprobe missing' }) });
    const w = mountPage(client);
    await flushPromises();
    const badge = w.find('[data-testid="status-lib-1"]');
    expect(badge.text()).toContain('Failed');
    expect(badge.text()).toContain('ffprobe missing');
    w.unmount();
  });

  it('renders an unknown status string verbatim', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'paused' }) });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('paused');
    w.unmount();
  });
});

describe('LibraryScanPage — scan / rescan', () => {
  it('scan → POSTs /scan, toasts success, and refetches status', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const statusCallsBefore = get.mock.calls.filter((c) => String(c[0]).endsWith('/scan-status')).length;
    await findBtn(w, 'Scan Movies')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/scan');
    const statusCallsAfter = get.mock.calls.filter((c) => String(c[0]).endsWith('/scan-status')).length;
    expect(statusCallsAfter).toBeGreaterThan(statusCallsBefore);
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Scan queued.')).toBe(true);
    w.unmount();
  });

  it('rescan → POSTs /rescan and toasts success', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Rescan Movies')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/rescan');
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Rescan queued.')).toBe(true);
    w.unmount();
  });

  it('toasts when the scan POST fails (Error)', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('Worker offline'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Scan Movies')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'Worker offline')).toBe(true);
    w.unmount();
  });

  it('toasts a generic message when the scan POST fails (non-Error)', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce('nope');
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Scan Movies')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'Failed to trigger scan.')).toBe(true);
    w.unmount();
  });

  it('toasts when the rescan POST fails (non-Error fallback)', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce('nope');
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Rescan Movies')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'Failed to trigger rescan.')).toBe(true);
    w.unmount();
  });

  it('disables Scan/Rescan while a scan is running', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'running' }) });
    const w = mountPage(client);
    await flushPromises();
    expect((findBtn(w, 'Scan Movies')!.element as HTMLButtonElement).disabled).toBe(true);
    expect((findBtn(w, 'Rescan Movies')!.element as HTMLButtonElement).disabled).toBe(true);
    w.unmount();
  });

  it('disables Scan/Rescan while a scan is queued', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'queued' }) });
    const w = mountPage(client);
    await flushPromises();
    expect((findBtn(w, 'Scan Movies')!.element as HTMLButtonElement).disabled).toBe(true);
    w.unmount();
  });

  it('leaves Scan/Rescan enabled when idle or completed', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'completed' }) });
    const w = mountPage(client);
    await flushPromises();
    expect((findBtn(w, 'Scan Movies')!.element as HTMLButtonElement).disabled).toBe(false);
    w.unmount();
  });
});
