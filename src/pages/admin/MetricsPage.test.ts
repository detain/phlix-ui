/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import MetricsPage from './MetricsPage.vue';
import Button from '../../components/ui/Button.vue';
import type { ApiClient } from '../../api/client';

// jsdom does not implement ResizeObserver — stub it globally so ApexCharts
// (which is stubbed in the component mounts below) never calls a real one.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const snapshot = {
  bytes_in_per_sec: 1_234_567,
  bytes_out_per_sec: 9_876_543,
  active_connections: 42,
  requests_per_sec: 128.5,
  error_rate: 0.002,
  p50_ms: 12,
  p95_ms: 85,
  p99_ms: 210,
};

const historyBucket = {
  bucket: '2026-09-08 08:00:00', // server datetime STRING (not epoch)
  bytes_in: 2_000_000_000,
  bytes_out: 10_000_000_000,
  requests: 5000,
  errors: 3,
  p50_ms: 10,
  p95_ms: 75,
};

// Raw server connection row (the component's AdminMetricsApi maps it via toConnection).
const connection = {
  connection_id: 'conn-1',
  kind: 'websocket',
  user_id: 'user-alice',
  remote_ip: '192.168.1.100',
  session_id: null,
  media_item_id: null,
  bytes_in: 1_000,
  bytes_out: 2_000,
  bytes_in_rate: 50_000,
  bytes_out_rate: 500_000,
  opened_at: '2026-07-01 10:00:00',
  last_seen_at: '2026-07-01 10:05:00',
};

const route = {
  method: 'GET',
  route: '/api/v1/media',
  request_count: 10_000,
  error_count: 5,
  avg_ms: 45,
  max_ms: 320,
};

interface Overrides {
  snapshot?: object;
  history?: object[];
  connections?: object[];
  routes?: object[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string, _params?: Record<string, string>) => {
    if (endpoint === '/api/v1/admin/metrics/snapshot') {
      return { data: over.snapshot ?? snapshot };
    }
    if (endpoint === '/api/v1/admin/metrics/history') {
      return { data: over.history ?? [historyBucket] };
    }
    if (endpoint === '/api/v1/admin/metrics/connections') {
      return { data: over.connections ?? [connection] };
    }
    if (endpoint === '/api/v1/admin/metrics/routes') {
      return { data: over.routes ?? [route] };
    }
    throw new Error(`unexpected ${endpoint}`);
  });
  return { client: { get } as unknown as ApiClient, get };
}

// Stub ApexCharts so it renders nothing and never touches ResizeObserver.
const ApexChartsStub = {
  template: '<div class="apexcharts-stub" />',
};

function mountPage(client: ApiClient) {
  return mount(MetricsPage, {
    props: { client },
    attachTo: document.body,
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
        VueApexCharts: ApexChartsStub,
      },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Admin MetricsPage', () => {
  it('renders all chart cards + tables from the mocked data', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await nextTick();

    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/snapshot', { window: '60' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/history', { minutes: '60', resolution: '60' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/connections', { ttl: '15' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/routes', { minutes: '15', limit: '20' });

    const text = w.text();
    expect(text).toContain('Server Traffic');
    expect(text).toContain('Bandwidth');
    expect(text).toContain('Latency');
    expect(text).toContain('Request Rate');
    expect(text).toContain('Live Connections');
    expect(text).toContain('Top Routes by Latency');
    expect(text).toContain('user-alice'); // connection user_id (no user_name from the server)
    expect(text).toContain('/api/v1/media'); // route path
    w.unmount();
  });

  it('shows connection count + snapshot stats in the header', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await nextTick();

    const text = w.text();
    expect(text).toContain('42 active connections');
    expect(text).toContain('9.88 Mbps'); // bytes_in_per_sec (1_234_567 B/s ×8 ÷1e6)
    expect(text).toContain('79.01 Mbps'); // bytes_out_per_sec (9_876_543 B/s ×8 ÷1e6)
    expect(text).toContain('128.5 req/s');
    expect(text).toContain('p50 12ms');
    w.unmount();
  });

  it('renders connections table with throughput bars', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await nextTick();

    // Target the connections table specifically by aria-label.
    const connTable = w.find('table[aria-label="Live connections"]');
    const rows = connTable!.findAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].text()).toContain('192.168.1.100'); // remote_ip
    expect(rows[0].text()).toContain('user-alice'); // user_id
    expect(rows[0].text()).toContain('websocket'); // kind badge
    // Throughput bars render as divs
    expect(rows[0].find('.metrics__bar--in').exists()).toBe(true);
    expect(rows[0].find('.metrics__bar--out').exists()).toBe(true);
    w.unmount();
  });

  it('renders routes table with latency badges', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await nextTick();

    // Target the routes table specifically by aria-label.
    const routesTable = w.find('table[aria-label="Top routes by latency"]');
    const routeRows = routesTable!.findAll('tbody tr');
    expect(routeRows.length).toBe(1);
    expect(routeRows[0].text()).toContain('GET');
    expect(routeRows[0].text()).toContain('/api/v1/media');
    expect(routeRows[0].text()).toContain('10,000'); // request_count formatted
    expect(routeRows[0].text()).toContain('45ms'); // avg_ms
    expect(routeRows[0].text()).toContain('320ms'); // max_ms
    w.unmount();
  });

  it('shows empty states when sections return no data', async () => {
    const { client } = makeClient({
      snapshot: { bytes_in_per_sec: 0, bytes_out_per_sec: 0, active_connections: 0, requests_per_sec: 0, error_rate: 0, p50_ms: 0, p95_ms: 0, p99_ms: 0 },
      history: [],
      connections: [],
      routes: [],
    });
    const w = mountPage(client);
    await flushPromises();
    await nextTick();

    const text = w.text();
    expect(text).toContain('No bandwidth data yet');
    expect(text).toContain('No active connections');
    expect(text).toContain('No route data yet');
    w.unmount();
  });

  it('shows error empty states when sections throw', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/metrics/snapshot') return { data: snapshot };
      if (endpoint === '/api/v1/admin/metrics/history') throw new Error('server error');
      if (endpoint === '/api/v1/admin/metrics/connections') return { data: [connection] };
      if (endpoint === '/api/v1/admin/metrics/routes') return { data: [route] };
      throw new Error(`unexpected ${endpoint}`);
    });
    const client = { get } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    await nextTick();

    const text = w.text();
    expect(text).toContain("Couldn't load bandwidth history");
    expect(w.findComponent(Button).exists()).toBe(true); // retry button
    w.unmount();
  });

  it('snapshot shows 0 active connections when loading', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    // Before flushPromises, loadingSnapshot is true and snapshot is null
    expect(w.find('.metrics__snapshot').exists()).toBe(false);
    await flushPromises();
    await nextTick();
    // After load, header shows active connections
    expect(w.find('.metrics__snapshot').exists()).toBe(true);
    w.unmount();
  });
});
