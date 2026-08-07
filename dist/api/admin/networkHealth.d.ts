/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/**
 * Shape of the `GET /api/v1/health/relay` response.
 *
 * Both `stale` flags (S40, phlix-server PR #647) mark a state file whose owning
 * fork has stopped refreshing it. They are derived server-side from a
 * writer-declared `staleAfterSeconds` (clamped 30–3600 s, default 180), so the
 * reader never guesses a fork's cadence. When `relay.stale` is set the liveness
 * fields have ALREADY been forced down server-side — the flag says "these
 * zeroes are a staleness verdict", not "the tunnel reported itself idle".
 */
export interface RelayHealth {
    relay: {
        connected: boolean;
        active: boolean;
        reconnectAttempts: number;
        lastDisconnectTime: string | null;
        activeSessions: number;
        /** True when the relay fork stopped refreshing `relay-tunnel.state.json`. */
        stale: boolean;
    };
    hub: {
        lastSuccessfulHeartbeat: string | null;
        consecutiveFailures: number;
        isEnrolled: boolean;
        enrollmentExpiresAt: string | null;
        /** True when the hub-heartbeat fork stopped refreshing `hub-heartbeat.state.json`. */
        stale: boolean;
    };
}
/** Network health status derived from latency. */
export type NetworkHealthStatus = 'healthy' | 'degraded' | 'offline';
/**
 * Shape of the `GET /api/v1/health/network` response.
 *
 * `measuredAt` is the hub-heartbeat fork's own write time, NOT the time of this
 * request — the endpoint is a cheap read of a persisted snapshot, not a live
 * probe. Two requests inside one 60 s heartbeat cadence therefore return the
 * SAME `measuredAt` describing the SAME measurement (see S251).
 *
 * `stale` (S40) is present on the wire only in the stale branch, hence the
 * `false` default in the mapper: absent means fresh.
 */
export interface NetworkHealth {
    latencyMs: number | null;
    status: NetworkHealthStatus;
    measuredAt: string;
    /** True when the snapshot is older than the heartbeat fork's declared cadence. */
    stale: boolean;
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
