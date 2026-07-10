/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
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
/**
 * AdminMetricsApi — typed wrapper over the admin metrics endpoints
 * (`/api/v1/admin/metrics/*`). Provides snapshot, history, live connections,
 * and slow-route data consumed by `MetricsPage`. Defensively unwraps `{ data }`
 * and normalises field names so a malformed payload degrades to empty rather
 * than throwing.
 */
export declare class AdminMetricsApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/admin/metrics/snapshot?window=60` → `{ data: MetricsSnapshot }`.
     * @param window Seconds to aggregate over (default 60).
     */
    getSnapshot(window?: number): Promise<MetricsSnapshot>;
    /**
     * `GET /api/v1/admin/metrics/history?minutes=&resolution=` → `{ data: [...] }`.
     * @param minutes Lookback window in minutes (default 60).
     * @param resolution Bucket size in seconds (default 60).
     */
    getHistory(minutes?: number, resolution?: number): Promise<MetricsHistoryBucket[]>;
    /**
     * `GET /api/v1/admin/metrics/connections?ttl=15` → `{ data: [...] }`.
     * @param ttl Seconds a connection must be idle before being dropped (default 15).
     */
    getConnections(ttl?: number): Promise<MetricsConnection[]>;
    /**
     * `GET /api/v1/admin/metrics/routes?minutes=&limit=` → `{ data: [...] }`.
     * @param minutes Lookback window in minutes (default 15).
     * @param limit Max results (default 20).
     */
    getRoutes(minutes?: number, limit?: number): Promise<MetricsRoute[]>;
}
