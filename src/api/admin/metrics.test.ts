import { describe, it, expect, vi } from 'vitest';
import { AdminMetricsApi } from './metrics';
import type { ApiClient } from '../client';

function clientWith(get: ReturnType<typeof vi.fn>): ApiClient {
  return { get } as unknown as ApiClient;
}

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
  bucket: 1_725_782_400,
  bytes_in: 2_000_000_000,
  bytes_out: 10_000_000_000,
  requests: 5000,
  errors: 3,
  p50_ms: 10,
  p95_ms: 75,
};

const connection = {
  id: 'conn-1',
  remote_addr: '192.168.1.100',
  user_id: 'u1',
  user_name: 'Alice',
  started_at: '2026-07-01T10:00:00Z',
  bytes_in_rate: 50_000,
  bytes_out_rate: 500_000,
  requests: 120,
};

const route = {
  method: 'GET',
  route: '/api/v1/media',
  request_count: 10_000,
  error_count: 5,
  avg_ms: 45,
  max_ms: 320,
};

describe('AdminMetricsApi', () => {
  // -------------------------------------------------------------------------
  // getSnapshot
  // -------------------------------------------------------------------------

  it('getSnapshot() GETs snapshot with window param and unwraps { data }', async () => {
    const get = vi.fn().mockResolvedValue({ data: snapshot });
    const api = new AdminMetricsApi(clientWith(get));
    const res = await api.getSnapshot(60);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/snapshot', { window: '60' });
    expect(res).toEqual(snapshot);
  });

  it('getSnapshot() uses window=60 by default', async () => {
    const get = vi.fn().mockResolvedValue({ data: snapshot });
    const api = new AdminMetricsApi(clientWith(get));
    await api.getSnapshot();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/snapshot', { window: '60' });
  });

  it('getSnapshot() degrades to zeroed snapshot on missing data', async () => {
    const api = new AdminMetricsApi(clientWith(vi.fn().mockResolvedValue({ data: null })));
    const res = await api.getSnapshot();
    expect(res.bytes_in_per_sec).toBe(0);
    expect(res.p99_ms).toBe(0);
  });

  // -------------------------------------------------------------------------
  // getHistory
  // -------------------------------------------------------------------------

  it('getHistory() GETs history with minutes + resolution params', async () => {
    const get = vi.fn().mockResolvedValue({ data: [historyBucket] });
    const api = new AdminMetricsApi(clientWith(get));
    const res = await api.getHistory(30, 30);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/history', {
      minutes: '30',
      resolution: '30',
    });
    expect(res).toEqual([historyBucket]);
  });

  it('getHistory() defaults to minutes=60, resolution=60', async () => {
    const get = vi.fn().mockResolvedValue({ data: [historyBucket] });
    const api = new AdminMetricsApi(clientWith(get));
    await api.getHistory();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/history', {
      minutes: '60',
      resolution: '60',
    });
  });

  it('getHistory() degrades to [] when data is not an array', async () => {
    const api = new AdminMetricsApi(clientWith(vi.fn().mockResolvedValue({ data: null })));
    expect(await api.getHistory()).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // getConnections
  // -------------------------------------------------------------------------

  it('getConnections() GETs connections with ttl param and unwraps { data }', async () => {
    const get = vi.fn().mockResolvedValue({ data: [connection] });
    const api = new AdminMetricsApi(clientWith(get));
    const res = await api.getConnections(30);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/connections', { ttl: '30' });
    expect(res).toEqual([connection]);
  });

  it('getConnections() defaults to ttl=15', async () => {
    const get = vi.fn().mockResolvedValue({ data: [connection] });
    const api = new AdminMetricsApi(clientWith(get));
    await api.getConnections();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/connections', { ttl: '15' });
  });

  it('getConnections() degrades to [] when data is not an array', async () => {
    const api = new AdminMetricsApi(clientWith(vi.fn().mockResolvedValue({ data: 'not-array' })));
    expect(await api.getConnections()).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // getRoutes
  // -------------------------------------------------------------------------

  it('getRoutes() GETs routes with minutes + limit params and unwraps { data }', async () => {
    const get = vi.fn().mockResolvedValue({ data: [route] });
    const api = new AdminMetricsApi(clientWith(get));
    const res = await api.getRoutes(60, 10);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/routes', {
      minutes: '60',
      limit: '10',
    });
    expect(res).toEqual([route]);
  });

  it('getRoutes() defaults to minutes=15, limit=20', async () => {
    const get = vi.fn().mockResolvedValue({ data: [route] });
    const api = new AdminMetricsApi(clientWith(get));
    await api.getRoutes();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metrics/routes', {
      minutes: '15',
      limit: '20',
    });
  });

  it('getRoutes() degrades to [] when data is not an array', async () => {
    const api = new AdminMetricsApi(clientWith(vi.fn().mockResolvedValue({ data: {} })));
    expect(await api.getRoutes()).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Field normalisation
  // -------------------------------------------------------------------------

  it('getSnapshot() normalises string numerics', async () => {
    const get = vi.fn().mockResolvedValue({
      data: {
        bytes_in_per_sec: '1234567',
        bytes_out_per_sec: 9_876_543,
        active_connections: '42',
        requests_per_sec: 128.5,
        error_rate: 0.002,
        p50_ms: '12',
        p95_ms: 85,
        p99_ms: '210',
      },
    });
    const api = new AdminMetricsApi(clientWith(get));
    const res = await api.getSnapshot();
    expect(res.bytes_in_per_sec).toBe(1234567);
    expect(res.p50_ms).toBe(12);
    expect(res.active_connections).toBe(42);
  });

  it('getConnections() handles null user_id / user_name', async () => {
    const get = vi.fn().mockResolvedValue({
      data: [{ ...connection, user_id: null, user_name: null }],
    });
    const api = new AdminMetricsApi(clientWith(get));
    const res = await api.getConnections();
    expect(res[0].user_id).toBeNull();
    expect(res[0].user_name).toBeNull();
  });
});
