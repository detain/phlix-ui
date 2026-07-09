/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import type { ApiClient } from '../client';

// ── Relay health types ─────────────────────────────────────────────────────────

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

// ── Network health types ───────────────────────────────────────────────────────

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

type Raw = Record<string, unknown>;

function asBool(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return fallback;
}

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return fallback;
  return fallback;
}

function isRecord(v: unknown): v is Raw {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function toRelayHealth(raw: Raw): RelayHealth['relay'] {
  return {
    connected: asBool(raw['connected']),
    active: asBool(raw['active']),
    reconnectAttempts: asNumber(raw['reconnectAttempts']),
    lastDisconnectTime: asString(raw['lastDisconnectTime'] ?? null),
    activeSessions: asNumber(raw['activeSessions']),
  };
}

function toHubHealth(raw: Raw): RelayHealth['hub'] {
  return {
    lastSuccessfulHeartbeat: asString(raw['lastSuccessfulHeartbeat'] ?? null),
    consecutiveFailures: asNumber(raw['consecutiveFailures']),
    isEnrolled: asBool(raw['isEnrolled']),
    enrollmentExpiresAt: asString(raw['enrollmentExpiresAt'] ?? null),
  };
}

function toNetworkHealth(raw: Raw): NetworkHealth {
  const status = asString(raw['status'], 'offline');
  if (status !== 'healthy' && status !== 'degraded' && status !== 'offline') {
    return {
      latencyMs: null,
      status: 'offline',
      measuredAt: asString(raw['measuredAt'], new Date().toISOString()),
      error: asString(raw['error'], 'Unknown status'),
    };
  }
  return {
    latencyMs: asNumber(raw['latencyMs'] ?? null),
    status: status as NetworkHealthStatus,
    measuredAt: asString(raw['measuredAt'], new Date().toISOString()),
    error: asString(raw['error'] ?? null),
  };
}

/**
 * AdminNetworkHealthApi (P3B-S7) — typed wrapper over the network health
 * endpoints (`/api/v1/health/*`), consumed by `NetworkHealthIndicator`.
 *
 * Provides relay tunnel status, hub heartbeat metrics, and network latency
 * measurements for the admin panel health dashboard and UI indicators.
 */
export class AdminNetworkHealthApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/health/relay` → relay tunnel and hub heartbeat status.
   */
  async getRelayHealth(): Promise<RelayHealth> {
    const { data } = await this.client.get<Raw>('/api/v1/health/relay');
    const d = isRecord(data) ? data : {};
    return {
      relay: toRelayHealth(d['relay'] as Raw ?? {}),
      hub: toHubHealth(d['hub'] as Raw ?? {}),
    };
  }

  /**
   * `GET /api/v1/health/network` → network latency to hub.
   */
  async getNetworkHealth(): Promise<NetworkHealth> {
    const { data } = await this.client.get<Raw>('/api/v1/health/network');
    const d = isRecord(data) ? data : {};
    return toNetworkHealth(d);
  }

  /**
   * `GET /api/v1/health/relay` + `GET /api/v1/health/network` → combined snapshot.
   */
  async getHealthSnapshot(): Promise<HealthSnapshot> {
    const [relay, network] = await Promise.all([
      this.getRelayHealth(),
      this.getNetworkHealth(),
    ]);
    return {
      relay: relay.relay,
      hub: relay.hub,
      network,
    };
  }
}
