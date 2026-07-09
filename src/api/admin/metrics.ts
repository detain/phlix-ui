/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

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
  // The server emits this as a datetime STRING ("Y-m-d H:i:s" via FROM_UNIXTIME),
  // NOT epoch seconds — typing it as a number made asNumber() collapse every
  // bucket to 0 and stack the whole X axis on the 1970 epoch.
  bucket: string;
  bytes_in: number;
  bytes_out: number;
  requests: number;
  errors: number;
  p50_ms: number;
  p95_ms: number;
}

/**
 * An active server connection with per-client throughput rates. Field names
 * mirror the server row (MetricsRepository::liveConnections()): connection_id,
 * kind, remote_ip, user_id, bytes_*_rate, opened_at.
 */
export interface MetricsConnection {
  id: string;
  kind: string;
  remote_ip: string;
  user_id: string | null;
  bytes_in_rate: number;
  bytes_out_rate: number;
  opened_at: string;
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
    bucket: asString(r['bucket']),
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
    id: asString(r['connection_id']),
    kind: asString(r['kind'], 'http'),
    remote_ip: asString(r['remote_ip']),
    user_id: r['user_id'] != null ? asString(r['user_id']) : null,
    bytes_in_rate: asNumber(r['bytes_in_rate']),
    bytes_out_rate: asNumber(r['bytes_out_rate']),
    opened_at: asString(r['opened_at']),
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
