/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import AuditLogsPage from './AuditLogsPage.vue';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import { useToastStore } from '../stores/useToastStore';
import { api, type ApiClient } from '../api/client';

// Matches the page's PAGE_SIZE constant.
const PAGE_SIZE = 50;

// Raw entry shape from GET /api/v1/me/audit-logs (snake_case). `actor` is the
// hub-enriched display name; `event` is always present, `action` is finer-grained.
const hubLog = {
  id: 'l1',
  event: 'library.create',
  action: 'library.create',
  actor: 'alice',
  user_id: 'u-alice',
  resource: 'Movies',
  reason: 'Created the Movies library',
  ip_address: '10.0.0.1',
  created_at: '2026-05-27T00:00:00Z',
};

interface Overrides {
  logs?: unknown[];
  /** Drives total_pages = ceil(total / PAGE_SIZE). */
  total?: number;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string, params?: Record<string, string>) => {
    if (endpoint === '/api/v1/me/audit-logs') {
      return {
        logs: over.logs ?? [hubLog],
        total: over.total ?? 1,
        limit: PAGE_SIZE,
        offset: Number(params?.offset ?? 0),
      };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const client = { get } as unknown as ApiClient;
  return { client, get };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(AuditLogsPage, { props: { client }, attachTo: document.body });
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

describe('AuditLogsPage — list + states', () => {
  it('renders a log row with action, actor, target, details, ip, time', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/audit-logs', { limit: '50', offset: '0' });
    const text = w.text();
    expect(text).toContain('library.create');
    expect(text).toContain('alice');
    expect(text).toContain('Movies');
    expect(text).toContain('Created the Movies library');
    expect(text).toContain('10.0.0.1');
    w.unmount();
  });

  it('falls back to the user id when the actor name is absent', async () => {
    const { client } = makeClient({ logs: [{ ...hubLog, actor: null, user_id: 'u-xyz' }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('u-xyz');
    w.unmount();
  });

  it('shows a skeleton while loading, then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const client = { get } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.audit__skel').exists()).toBe(true);
    resolve({ logs: [hubLog], total: 1, limit: PAGE_SIZE });
    await flushPromises();
    expect(w.find('.audit__skel').exists()).toBe(false);
    expect(w.find('.audit__table').exists()).toBe(true);
    w.unmount();
  });

  it('shows an empty state when there are no logs', async () => {
    const { client } = makeClient({ logs: [], total: 0 });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No audit logs');
    expect(w.find('.audit__table').exists()).toBe(false);
    w.unmount();
  });

  it('treats a response with no logs key as empty', async () => {
    const get = vi.fn(async () => ({}));
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('No audit logs');
    expect(w.find('.audit__pagination').exists()).toBe(false);
    w.unmount();
  });

  it('shows "—" for missing target / details / ip', async () => {
    const { client } = makeClient({
      logs: [{ id: 'l2', event: 'media.view', actor: 'bob', created_at: '2026-05-27T00:00:00Z' }],
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('—');
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ logs: [], total: 0 } as never);
    const w = mount(AuditLogsPage, { attachTo: document.body });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/me/audit-logs', { limit: '50', offset: '0' });
    expect(w.text()).toContain('No audit logs');
    w.unmount();
  });
});

describe('AuditLogsPage — load errors', () => {
  it('shows an error EmptyState + toasts when logs fail to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('audit db down'));
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(w.text()).toContain("Couldn't load audit logs");
    expect(w.text()).toContain('audit db down');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'audit db down')).toBe(true);
    w.unmount();
  });

  it('uses a generic message for a non-Error rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain('Failed to load audit logs.');
    w.unmount();
  });

  it('Retry reloads after a failure', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValueOnce({ logs: [hubLog], total: 1, limit: PAGE_SIZE });
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load audit logs");
    await findBtnByText(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.find('.audit__table').exists()).toBe(true);
    w.unmount();
  });
});

describe('AuditLogsPage — action tones', () => {
  it.each([
    ['library.create', 'success'],
    ['user.delete', 'error'],
    ['settings.update', 'info'],
    ['auth.login', 'accent'],
    ['media.view', 'neutral'],
  ])('tones the "%s" action badge as %s', async (action, tone) => {
    const { client } = makeClient({ logs: [{ ...hubLog, action, event: action }] });
    const w = mountPage(client);
    await flushPromises();
    const badge = w.findAllComponents(Badge).find((b) => b.text().trim() === action);
    expect(badge).toBeTruthy();
    expect(badge!.props('tone')).toBe(tone);
    w.unmount();
  });
});

describe('AuditLogsPage — pagination (limit/offset)', () => {
  it('hides pagination when there is a single page', async () => {
    const { client } = makeClient({ total: 1 });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.audit__pagination').exists()).toBe(false);
    w.unmount();
  });

  it('Next then Previous fetch the right offsets, with correct disabled states', async () => {
    const { client, get } = makeClient({ total: 120 }); // ceil(120/50) = 3 pages
    const w = mountPage(client);
    await flushPromises();
    expect((findBtnByText(w, 'Previous')!.element as HTMLButtonElement).disabled).toBe(true);
    expect((findBtnByText(w, 'Next')!.element as HTMLButtonElement).disabled).toBe(false);
    await findBtnByText(w, 'Next')!.trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/audit-logs', { limit: '50', offset: '50' });
    expect((findBtnByText(w, 'Previous')!.element as HTMLButtonElement).disabled).toBe(false);
    await findBtnByText(w, 'Previous')!.trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/audit-logs', { limit: '50', offset: '0' });
    w.unmount();
  });

  it('disables Next on the last page', async () => {
    const { client } = makeClient({ total: 120 }); // 3 pages
    const w = mountPage(client);
    await flushPromises();
    await findBtnByText(w, 'Next')!.trigger('click');
    await flushPromises();
    await findBtnByText(w, 'Next')!.trigger('click');
    await flushPromises();
    expect((findBtnByText(w, 'Next')!.element as HTMLButtonElement).disabled).toBe(true);
    expect((findBtnByText(w, 'Previous')!.element as HTMLButtonElement).disabled).toBe(false);
    w.unmount();
  });
});
