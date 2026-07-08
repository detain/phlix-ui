/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import HubDashboardPage from './HubDashboardPage.vue';
import Button from '../../components/ui/Button.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const summary = {
  servers: { total: 5, online: 3, offline: 2 },
  activeRelaySessions: 4,
  pendingRequests: 7,
  userCount: 12,
};

const auditEvent = {
  id: 'evt-1',
  action: 'server.enrolled',
  actor: 'alice',
  target: 'media-box-1',
  created_at: new Date().toISOString(),
};

interface Overrides {
  summary?: unknown;
  activity?: unknown[];
  failSummary?: boolean;
  failActivity?: boolean;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/dashboard/summary') {
      if (over.failSummary) throw new Error('boom');
      return { success: true, data: over.summary ?? summary };
    }
    if (endpoint === '/api/v1/admin/dashboard/activity') {
      if (over.failActivity) throw new Error('boom');
      return { success: true, data: over.activity ?? [auditEvent] };
    }
    throw new Error(`unexpected ${endpoint}`);
  });
  return { client: { get } as unknown as ApiClient, get };
}

function mountPage(client: ApiClient) {
  return mount(HubDashboardPage, { props: { client }, attachTo: document.body });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('HubDashboardPage', () => {
  it('fetches the summary + activity on mount', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/summary');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/activity', { limit: '20' });
    w.unmount();
  });

  it('renders the five metric cards from the summary', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('Servers');
    expect(text).toContain('Online');
    expect(text).toContain('Active Relays');
    expect(text).toContain('Pending Requests');
    expect(text).toContain('Users');
    // The headline counts render.
    expect(text).toContain('5');
    expect(text).toContain('12');
    w.unmount();
  });

  it('shows an "offline" badge on the servers card when some are offline', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('2 offline');
    w.unmount();
  });

  it('omits the offline badge when all servers are online', async () => {
    const { client } = makeClient({ summary: { ...summary, servers: { total: 3, online: 3, offline: 0 } } });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).not.toContain('offline');
    w.unmount();
  });

  it('renders the recent activity feed', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('Recent Activity');
    expect(text).toContain('server.enrolled');
    expect(text).toContain('alice');
    expect(text).toContain('media-box-1');
    w.unmount();
  });

  it('formats relative timestamps across the second/minute/hour/day boundaries', async () => {
    const now = Date.now();
    const mk = (id: string, msAgo: number) => ({
      id,
      action: 'x',
      actor: 'a',
      target: '',
      created_at: new Date(now - msAgo).toISOString(),
    });
    const { client } = makeClient({
      activity: [
        mk('s', 5_000), // 5s ago
        mk('m', 5 * 60_000), // 5m ago
        mk('h', 5 * 3_600_000), // 5h ago
        mk('d', 3 * 86_400_000), // 3d ago
        { id: 'bad', action: 'x', actor: 'a', target: '', created_at: 'not-a-date' }, // unparseable → ''
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('5s ago');
    expect(text).toContain('5m ago');
    expect(text).toContain('5h ago');
    expect(text).toContain('3d ago');
    w.unmount();
  });

  it('shows an empty state when there is no recent activity', async () => {
    const { client } = makeClient({ activity: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No recent activity');
    w.unmount();
  });

  it('surfaces a summary load failure as a recoverable empty state, then retries', async () => {
    const { client, get } = makeClient({ failSummary: true });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load hub summary");
    // The failure was reported to the toast store.
    expect(useToastStore().toasts.length).toBeGreaterThan(0);

    // Retry button re-issues the summary request.
    get.mockImplementationOnce(async () => ({ success: true, data: summary }));
    const retry = w.findAllComponents(Button).find((b) => b.text() === 'Retry');
    expect(retry).toBeTruthy();
    await retry!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Servers');
    w.unmount();
  });

  it('surfaces an activity load failure independently of the summary', async () => {
    const { client } = makeClient({ failActivity: true });
    const w = mountPage(client);
    await flushPromises();
    // Summary still renders; only the activity card shows its error.
    expect(w.text()).toContain('Servers');
    expect(w.text()).toContain("Couldn't load activity");
    w.unmount();
  });
});
