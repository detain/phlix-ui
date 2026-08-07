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
        /**
         * Why the tunnel last failed to connect, or null when it never has (S257).
         * The server has always emitted this; the mapper used to drop it, which is
         * why the Network Health panel could not say WHY the relay was down while
         * the Relay Tunnel section (fed by `/relay/status`) could.
         */
        lastConnectError: string | null;
        /** When `lastConnectError` was recorded, or null (S257). */
        lastConnectErrorAt: string | null;
        /** True when the relay fork stopped refreshing `relay-tunnel.state.json`. */
        stale: boolean;
    };
    hub: {
        lastSuccessfulHeartbeat: string | null;
        consecutiveFailures: number;
        /**
         * The heartbeat fork's last recorded hub round-trip, or null when nothing
         * has been measured yet (S257). Same wire value `/health/network` derives
         * `latencyMs` from; previously discarded by this mapper.
         */
        lastLatencyMs: number | null;
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
    /**
     * The last persisted hub round-trip in milliseconds, or **null when nothing
     * has been measured** — which the server genuinely emits (not enrolled, no
     * successful heartbeat yet, or no latency sample; `HealthController.php:185,
     * 194, 219`).
     *
     * ⚠ Until S257 the mapper ran this through `asNumber(… ?? null)`, whose
     * fallback is `0`, so an honest `null` arrived as `0` — the FASTEST possible
     * reading. The chart drew the relay's best-ever bar at exactly the moment
     * nothing had been measured, and every `!== null` guard downstream was
     * always true. The declared type was the truth; the mapper was the lie.
     */
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
