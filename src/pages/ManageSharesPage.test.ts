import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ManageSharesPage from './ManageSharesPage.vue';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import { useToastStore } from '../stores/useToastStore';
import { api, type ApiClient } from '../api/client';

const share = {
  id: 's1',
  library_id: 'lib-1',
  library_name: 'Movies',
  shared_with: 'bob@example.com',
  permissions: 'read',
  created_at: '2026-05-01T00:00:00Z',
  expires_at: '2099-01-01T00:00:00Z',
};

interface Overrides {
  shares?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/shares') return { shares: over.shares ?? [share] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const del = vi.fn(async (): Promise<Record<string, unknown>> => ({}));
  const client = { get, delete: del } as unknown as ApiClient;
  return { client, get, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(ManageSharesPage, { props: { client }, attachTo: document.body });
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

describe('ManageSharesPage — list + states', () => {
  it('renders a share row with library, recipient, permission, and dates', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/shares');
    const text = w.text();
    expect(text).toContain('Movies');
    expect(text).toContain('bob@example.com');
    expect(text).toContain('read');
    w.unmount();
  });

  it('shows a skeleton while loading, then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const client = { get, delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.shares__skel').exists()).toBe(true);
    resolve({ shares: [share] });
    await flushPromises();
    expect(w.find('.shares__skel').exists()).toBe(false);
    expect(w.find('.shares__table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there are no shares', async () => {
    const { client } = makeClient({ shares: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No library shares');
    expect(w.find('.shares__table').exists()).toBe(false);
    w.unmount();
  });

  it('treats a response with no `shares` key as empty', async () => {
    const get = vi.fn(async () => ({}));
    const w = mountPage({ get, delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('No library shares');
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ shares: [] } as never);
    const w = mount(ManageSharesPage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/shares');
    expect(w.text()).toContain('No library shares');
    w.unmount();
  });
});

describe('ManageSharesPage — load errors', () => {
  it('shows an error EmptyState + toasts when shares fail to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('shares down'));
    const w = mountPage({ get, delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load shares");
    expect(w.text()).toContain('shares down');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'shares down')).toBe(true);
    w.unmount();
  });

  it('uses a generic message for a non-Error rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get, delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('Failed to load shares.');
    w.unmount();
  });

  it('Retry re-loads after a failure', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValueOnce({ shares: [share] });
    const w = mountPage({ get, delete: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load shares");
    await findBtnByText(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.find('.shares__table').exists()).toBe(true);
    w.unmount();
  });
});

describe('ManageSharesPage — permissions + expiry', () => {
  it.each([
    ['read', 'read', 'info'],
    ['write', 'write', 'success'],
    ['admin', 'admin', 'neutral'],
  ])('renders the %s permission as a "%s" badge with tone %s', async (permissions, label, tone) => {
    // Use a future expiry so the only Badge in the row is the permission badge.
    const { client } = makeClient({ shares: [{ ...share, permissions, expires_at: '2099-01-01T00:00:00Z' }] });
    const w = mountPage(client);
    await flushPromises();
    const badge = w.findAllComponents(Badge).find((b) => b.text().trim() === label);
    expect(badge).toBeTruthy();
    expect(badge!.props('tone')).toBe(tone);
    w.unmount();
  });

  it('shows an Expired badge when expires_at is in the past', async () => {
    const { client } = makeClient({ shares: [{ ...share, expires_at: '2020-01-01T00:00:00Z' }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="expires-s1"]').text()).toContain('Expired');
    w.unmount();
  });

  it('does not show Expired for a future expiry', async () => {
    const { client } = makeClient(); // expires_at = 2099
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="expires-s1"]').text()).not.toContain('Expired');
    w.unmount();
  });

  it('shows "—" and no Expired badge when there is no expiry', async () => {
    const { client } = makeClient({ shares: [{ ...share, expires_at: undefined }] });
    const w = mountPage(client);
    await flushPromises();
    const cell = w.find('[data-testid="expires-s1"]');
    expect(cell.text()).toContain('—');
    expect(cell.text()).not.toContain('Expired');
    w.unmount();
  });
});

describe('ManageSharesPage — revoke', () => {
  it('revoke → DELETEs the share, toasts, and reloads', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const before = get.mock.calls.length;
    await findBtn(w, 'Revoke share of Movies with bob@example.com')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/shares/s1');
    expect(get.mock.calls.length).toBeGreaterThan(before);
    expect(useToastStore().toasts.some((t) => t.tone === 'success' && t.message === 'Share revoked.')).toBe(true);
    w.unmount();
  });

  it('toasts when revoke fails (Error)', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('not allowed'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Revoke share of Movies with bob@example.com')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.tone === 'error' && t.message === 'not allowed')).toBe(true);
    w.unmount();
  });

  it('toasts a generic message when revoke fails (non-Error)', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce('nope');
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Revoke share of Movies with bob@example.com')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'Failed to revoke share.')).toBe(true);
    w.unmount();
  });
});
