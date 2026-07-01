import type { ApiClient } from '../client';

// ---------------------------------------------------------------------------
// Server→SPA normalisers (mirrors the pattern in dashboard.ts)
// ---------------------------------------------------------------------------

type Raw = Record<string, unknown>;

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return fallback;
}

function asArray(value: unknown): Raw[] {
  return Array.isArray(value) ? (value as Raw[]) : [];
}

// ---------------------------------------------------------------------------
// Data shapes
// ---------------------------------------------------------------------------

/** Snapshot of current server metrics (per-second rates + latency percentiles). */
export interface MetricsSnapshot {
  bytes_in_per_sec: number;
  bytes_out_per_sec: number;
  active_connections: number;
  requests_per_sec: number;
  error_rate: number;
  p50_ms: number;
  p95_ms: number;
  p99_ms: number;
}

/** One time-bucket from the history series. */
export interface MetricsHistoryBucket {
  bucket: number; // Unix timestamp (seconds)
  bytes_in: number;
  bytes_out: number;
  requests: number;
  errors: number;
  p50_ms: number;
  p95_ms: number;
}

/** An active server connection with per-client throughput rates. */
export interface MetricsConnection {
  id: string;
  remote_addr: string;
  user_id: string | null;
  user_name: string | null;
  started_at: string;
  bytes_in_rate: number;
  bytes_out_rate: number;
  requests: number;
}

/** A route entry with aggregated request stats. */
export interface MetricsRoute {
  method: string;
  route: string;
  request_count: number;
  error_count: number;
  avg_ms: number;
  max_ms: number;
}

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

function toSnapshot(r: Raw): MetricsSnapshot {
  return {
    bytes_in_per_sec: asNumber(r['bytes_in_per_sec']),
    bytes_out_per_sec: asNumber(r['bytes_out_per_sec']),
    active_connections: asNumber(r['active_connections']),
    requests_per_sec: asNumber(r['requests_per_sec']),
    error_rate: asNumber(r['error_rate']),
    p50_ms: asNumber(r['p50_ms']),
    p95_ms: asNumber(r['p95_ms']),
    p99_ms: asNumber(r['p99_ms']),
  };
}

function toHistoryBucket(r: Raw): MetricsHistoryBucket {
  return {
    bucket: asNumber(r['bucket']),
    bytes_in: asNumber(r['bytes_in']),
    bytes_out: asNumber(r['bytes_out']),
    requests: asNumber(r['requests']),
    errors: asNumber(r['errors']),
    p50_ms: asNumber(r['p50_ms']),
    p95_ms: asNumber(r['p95_ms']),
  };
}

function toConnection(r: Raw): MetricsConnection {
  return {
    id: asString(r['id']),
    remote_addr: asString(r['remote_addr']),
    user_id: r['user_id'] != null ? asString(r['user_id']) : null,
    user_name: r['user_name'] != null ? asString(r['user_name']) : null,
    started_at: asString(r['started_at']),
    bytes_in_rate: asNumber(r['bytes_in_rate']),
    bytes_out_rate: asNumber(r['bytes_out_rate']),
    requests: asNumber(r['requests']),
  };
}

function toRoute(r: Raw): MetricsRoute {
  return {
    method: asString(r['method']),
    route: asString(r['route']),
    request_count: asNumber(r['request_count']),
    error_count: asNumber(r['error_count']),
    avg_ms: asNumber(r['avg_ms']),
    max_ms: asNumber(r['max_ms']),
  };
}

// ---------------------------------------------------------------------------
// AdminMetricsApi
// ---------------------------------------------------------------------------

/**
 * AdminMetricsApi — typed wrapper over the admin metrics endpoints
 * (`/api/v1/admin/metrics/*`). Provides snapshot, history, live connections,
 * and slow-route data consumed by `MetricsPage`. Defensively unwraps `{ data }`
 * and normalises field names so a malformed payload degrades to empty rather
 * than throwing.
 */
export class AdminMetricsApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/admin/metrics/snapshot?window=60` → `{ data: MetricsSnapshot }`.
   * @param window Seconds to aggregate over (default 60).
   */
  async getSnapshot(window = 60): Promise<MetricsSnapshot> {
    const { data } = await this.client.get<{ data: Raw }>(
      '/api/v1/admin/metrics/snapshot',
      { window: String(window) },
    );
    return toSnapshot(data ?? {});
  }

  /**
   * `GET /api/v1/admin/metrics/history?minutes=&resolution=` → `{ data: [...] }`.
   * @param minutes Lookback window in minutes (default 60).
   * @param resolution Bucket size in seconds (default 60).
   */
  async getHistory(minutes = 60, resolution = 60): Promise<MetricsHistoryBucket[]> {
    const { data } = await this.client.get<{ data: unknown }>(
      '/api/v1/admin/metrics/history',
      { minutes: String(minutes), resolution: String(resolution) },
    );
    return asArray(data).map(toHistoryBucket);
  }

  /**
   * `GET /api/v1/admin/metrics/connections?ttl=15` → `{ data: [...] }`.
   * @param ttl Seconds a connection must be idle before being dropped (default 15).
   */
  async getConnections(ttl = 15): Promise<MetricsConnection[]> {
    const { data } = await this.client.get<{ data: unknown }>(
      '/api/v1/admin/metrics/connections',
      { ttl: String(ttl) },
    );
    return asArray(data).map(toConnection);
  }

  /**
   * `GET /api/v1/admin/metrics/routes?minutes=&limit=` → `{ data: [...] }`.
   * @param minutes Lookback window in minutes (default 15).
   * @param limit Max results (default 20).
   */
  async getRoutes(minutes = 15, limit = 20): Promise<MetricsRoute[]> {
    const { data } = await this.client.get<{ data: unknown }>(
      '/api/v1/admin/metrics/routes',
      { minutes: String(minutes), limit: String(limit) },
    );
    return asArray(data).map(toRoute);
  }
}
