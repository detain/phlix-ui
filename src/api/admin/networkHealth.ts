/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { ApiClient } from '../client';

// ── Relay health types ─────────────────────────────────────────────────────────

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

// ── Network health types ───────────────────────────────────────────────────────

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

/**
 * Number-or-null normaliser (S257) — for wire fields the server declares
 * `int|null` and can genuinely not know.
 *
 * ⚠ Deliberately NOT `asNumber(x, 0)`. A `0` fallback turns "never measured"
 * into the best possible latency, and this repo shipped exactly that bug: the
 * declared `number | null` could never hold `null`, so the display could not
 * distinguish "no data" from "perfect data". Mirrors the server's
 * `HealthController::nullableInt()` — including its `is_numeric` acceptance of
 * a numeric STRING, which the state files have historically carried.
 */
function asNullableNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

/**
 * String-or-null normaliser (S257) — for wire fields declared `string | null`.
 *
 * ⚠ Deliberately NOT `asString(x, '')`. `''` and `null` are both falsy, so the
 * old mapper's behaviour happened to be right, but the DECLARED `string | null`
 * was untrue and any future `!== null` check would have been permanently true —
 * the same trap `latencyMs` fell into for real. Mirrors the server's
 * `HealthController::nullableString()`, which is itself "non-empty string, or
 * null", so `''` on the wire means the same absence `null` does.
 */
function asNullableString(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null;
}

function isRecord(v: unknown): v is Raw {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function toRelayHealth(raw: Raw): RelayHealth['relay'] {
  return {
    connected: asBool(raw['connected']),
    active: asBool(raw['active']),
    reconnectAttempts: asNumber(raw['reconnectAttempts']),
    lastDisconnectTime: asNullableString(raw['lastDisconnectTime']),
    activeSessions: asNumber(raw['activeSessions']),
    lastConnectError: asNullableString(raw['lastConnectError']),
    lastConnectErrorAt: asNullableString(raw['lastConnectErrorAt']),
    stale: asBool(raw['stale']),
  };
}

function toHubHealth(raw: Raw): RelayHealth['hub'] {
  return {
    lastSuccessfulHeartbeat: asNullableString(raw['lastSuccessfulHeartbeat']),
    consecutiveFailures: asNumber(raw['consecutiveFailures']),
    lastLatencyMs: asNullableNumber(raw['lastLatencyMs']),
    isEnrolled: asBool(raw['isEnrolled']),
    enrollmentExpiresAt: asNullableString(raw['enrollmentExpiresAt']),
    stale: asBool(raw['stale']),
  };
}

function toNetworkHealth(raw: Raw): NetworkHealth {
  const status = asString(raw['status'], 'offline');
  if (status !== 'healthy' && status !== 'degraded' && status !== 'offline') {
    return {
      latencyMs: null,
      status: 'offline',
      measuredAt: asString(raw['measuredAt'], new Date().toISOString()),
      stale: asBool(raw['stale']),
      error: asString(raw['error'], 'Unknown status'),
    };
  }
  return {
    latencyMs: asNullableNumber(raw['latencyMs']),
    status: status as NetworkHealthStatus,
    measuredAt: asString(raw['measuredAt'], new Date().toISOString()),
    stale: asBool(raw['stale']),
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
