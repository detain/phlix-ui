/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/** Shape of the `GET /api/v1/health/relay` response. */
export interface RelayHealth {
    relay: {
        connected: boolean;
        active: boolean;
        reconnectAttempts: number;
        lastDisconnectTime: string | null;
        activeSessions: number;
    };
    hub: {
        lastSuccessfulHeartbeat: string | null;
        consecutiveFailures: number;
        isEnrolled: boolean;
        enrollmentExpiresAt: string | null;
    };
}
/** Network health status derived from latency. */
export type NetworkHealthStatus = 'healthy' | 'degraded' | 'offline';
/** Shape of the `GET /api/v1/health/network` response. */
export interface NetworkHealth {
    latencyMs: number | null;
    status: NetworkHealthStatus;
    measuredAt: string;
    error?: string;
}
/** Combined health snapshot for the UI indicator. */
export interface HealthSnapshot {
    relay: RelayHealth['relay'];
    hub: RelayHealth['hub'];
    network: NetworkHealth;
}
/**
 * AdminNetworkHealthApi (P3B-S7) — typed wrapper over the network health
 * endpoints (`/api/v1/health/*`), consumed by `NetworkHealthIndicator`.
 *
 * Provides relay tunnel status, hub heartbeat metrics, and network latency
 * measurements for the admin panel health dashboard and UI indicators.
 */
export declare class AdminNetworkHealthApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/health/relay` → relay tunnel and hub heartbeat status.
     */
    getRelayHealth(): Promise<RelayHealth>;
    /**
     * `GET /api/v1/health/network` → network latency to hub.
     */
    getNetworkHealth(): Promise<NetworkHealth>;
    /**
     * `GET /api/v1/health/relay` + `GET /api/v1/health/network` → combined snapshot.
     */
    getHealthSnapshot(): Promise<HealthSnapshot>;
}
