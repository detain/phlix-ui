/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import ServerDetailPage from './ServerDetailPage.vue';
import Button from '../components/ui/Button.vue';
import { api, type ApiClient } from '../api/client';

const NOW = Math.floor(Date.now() / 1000);

function makeDetail(over: Record<string, unknown> = {}) {
  return {
    server: {
      id: 'srv-1',
      server_name: 'Home Theater',
      version: '1.2.3',
      status: 'online',
      last_seen_at: NOW - 30,
      hostname_candidates: ['home.local'],
      relay_active: true,
      subdomain: 'home',
      fqdn: 'home.phlix.tv',
    },
    relay_session: {
      id: 'rs1',
      worker_node: 'edge-1',
      opened_at: '2026-05-01T00:00:00Z',
      bytes_in: 2 * 1024 * 1024,
      bytes_out: 512 * 1024,
      last_frame_at: NOW - 5,
    },
    heartbeat_history: Array.from({ length: 7 }, (_, i) => ({
      id: `hb${i}`,
      version: '1.2.3',
      uptime_seconds: 3600 * (i + 1),
      active_sessions: i,
      active_transcodes: 0,
      received_at: NOW - i * 60,
    })),
    tls_status: {
      provisioned: true,
      cert_path: '/etc/tls/cert.pem',
      key_path: '/etc/tls/key.pem',
      needs_renewal: false,
      expiry_days_remaining: 60,
      fqdn: 'home.phlix.tv',
    },
    ...over,
  };
}

function makeClient(detail: unknown = makeDetail()) {
  const get = vi.fn(async () => detail);
  return { client: { get } as unknown as ApiClient, get };
}

function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/servers', name: 'my-servers', component: { template: '<div/>' } },
      { path: '/app/servers/:id', name: 'server-detail', component: { template: '<div/>' } },
    ],
  });
}

async function mountPage(client: ApiClient, id = 'srv-1'): Promise<{ w: VueWrapper; router: Router }> {
  setActivePinia(createPinia());
  const router = makeRouter();
  await router.push(`/app/servers/${id}`);
  await router.isReady();
  const w = mount(ServerDetailPage, {
    props: { client, id },
    attachTo: document.body,
    global: { plugins: [router] },
  });
  return { w, router };
}

function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('ServerDetailPage — load + render', () => {
  it('loads GET /me/servers/{id} on mount and renders info/relay/TLS sections', async () => {
    const { client, get } = makeClient();
    const { w } = await mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/servers/srv-1');
    expect(w.text()).toContain('Home Theater');
    expect(w.text()).toContain('1.2.3');
    expect(w.text()).toContain('Relay Session');
    expect(w.text()).toContain('edge-1'); // relay worker node
    expect(w.text()).toContain('TLS Status');
    expect(w.text()).toContain('home.phlix.tv');
    w.unmount();
  });

  it('honours the :id route param in the request URL', async () => {
    const { client, get } = makeClient();
    const { w } = await mountPage(client, 'other-server');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/me/servers/other-server');
    w.unmount();
  });

  it('shows a skeleton while loading', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => (resolve = r)));
    const { w } = await mountPage({ get } as unknown as ApiClient);
    expect(w.find('.server-detail__skeleton').exists()).toBe(true);
    resolve(makeDetail());
    await flushPromises();
    expect(w.find('.server-detail__skeleton').exists()).toBe(false);
    w.unmount();
  });

  it('shows a "no active relay session" card when relay_session is null', async () => {
    const { client } = makeClient(makeDetail({ relay_session: null }));
    const { w } = await mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No active relay session');
    w.unmount();
  });

  it('shows an error EmptyState with a Retry that re-loads', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('server down'))
      .mockResolvedValueOnce(makeDetail());
    const { w } = await mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load server details");
    expect(w.text()).toContain('server down');
    await findBtnByText(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Home Theater');
    w.unmount();
  });

  it('falls back to the shared api singleton when no client prop is given', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue(makeDetail() as never);
    setActivePinia(createPinia());
    const router = makeRouter();
    await router.push('/app/servers/srv-1');
    await router.isReady();
    const w = mount(ServerDetailPage, {
      props: { id: 'srv-1' },
      attachTo: document.body,
      global: { plugins: [router] },
    });
    await flushPromises();
    expect(spy).toHaveBeenCalledWith('/api/v1/me/servers/srv-1');
    w.unmount();
  });
});

describe('ServerDetailPage — heartbeat collapse', () => {
  it('shows only 5 of 7 heartbeats until expanded, then all 7', async () => {
    const { client } = makeClient();
    const { w } = await mountPage(client);
    await flushPromises();
    expect(w.findAll('.server-detail__table tbody tr')).toHaveLength(5);
    const toggle = findBtnByText(w, 'Show all (7)')!;
    expect(toggle).toBeTruthy();
    await toggle.trigger('click');
    await flushPromises();
    expect(w.findAll('.server-detail__table tbody tr')).toHaveLength(7);
    expect(findBtnByText(w, 'Show less')).toBeTruthy();
    w.unmount();
  });

  it('shows an empty message when there is no heartbeat history', async () => {
    const { client } = makeClient(makeDetail({ heartbeat_history: [] }));
    const { w } = await mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No heartbeat history available');
    w.unmount();
  });
});

describe('ServerDetailPage — navigation', () => {
  it('Back to My Servers navigates to /app/servers', async () => {
    const { client } = makeClient();
    const { w, router } = await mountPage(client);
    await flushPromises();
    const push = vi.spyOn(router, 'push');
    await findBtnByText(w, 'Back to My Servers')!.trigger('click');
    expect(push).toHaveBeenCalledWith('/app/servers');
    w.unmount();
  });
});
