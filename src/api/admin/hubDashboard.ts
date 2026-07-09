/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { ApiClient } from '../client';

/** Server fleet summary — totals split by heartbeat-derived online/offline state. */
export interface HubServersSummary {
  total: number;
  online: number;
  offline: number;
}

/**
 * The hub admin dashboard summary. Aggregated hub-scoped counters drawn from the
 * `servers`/`server_heartbeats`/`relay_sessions`/`requests`/`users` tables.
 */
export interface HubSummary {
  servers: HubServersSummary;
  /** Currently-open reverse-tunnel relay sessions. */
  activeRelaySessions: number;
  /** Library/access requests awaiting an admin decision. */
  pendingRequests: number;
  /** Registered hub user accounts. */
  userCount: number;
}

/** A recent hub audit-log event (the dashboard's activity feed). */
export interface HubAuditEvent {
  id: string;
  /** Audit action key, e.g. `server.enrolled`, `request.approved`. */
  action: string;
  /** Who performed it (username when known, else the actor id, else "system"). */
  actor: string;
  /** What it acted on (free-form target label; may be empty). */
  target: string;
  created_at: string;
}

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

function isRecord(v: unknown): v is Raw {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function toServersSummary(value: unknown): HubServersSummary {
  const r = isRecord(value) ? value : {};
  return {
    total: asNumber(r['total']),
    online: asNumber(r['online']),
    offline: asNumber(r['offline']),
  };
}

function toAuditEvent(r: Raw): HubAuditEvent {
  return {
    id: asString(r['id']),
    action: asString(r['action'] ?? r['event_type']),
    // Accept both the camelCase and snake_case the controllers might emit.
    actor: asString(r['actor'] ?? r['actor_name'] ?? r['username'] ?? r['user_name'], 'system'),
    target: asString(r['target'] ?? r['target_label'] ?? r['resource']),
    created_at: asString(r['created_at'] ?? r['occurred_at']),
  };
}

/**
 * AdminHubDashboardApi (H0) — typed wrapper over the hub admin dashboard
 * endpoints (`/api/v1/admin/dashboard/*`), consumed by `HubDashboardPage`.
 *
 * The hub backend (H1.4) aggregates hub-scoped metrics — server fleet health,
 * active relay sessions, pending requests, user count — plus a recent audit
 * feed. Both verbs defensively unwrap the shared `{ success, data }` envelope and
 * normalise field names (camelCase ↔ snake_case), so a malformed or partial
 * payload degrades to zeros / an empty list rather than throwing.
 */
export class AdminHubDashboardApi {
  constructor(private readonly client: ApiClient) {}

  /** `GET /api/v1/admin/dashboard/summary` → unwraps `{ data: { … } }`. */
  async getSummary(): Promise<HubSummary> {
    const { data } = await this.client.get<{ success?: boolean; data?: Raw }>(
      '/api/v1/admin/dashboard/summary',
    );
    const d = isRecord(data) ? data : {};
    return {
      servers: toServersSummary(d['servers']),
      activeRelaySessions: asNumber(d['activeRelaySessions'] ?? d['active_relay_sessions']),
      pendingRequests: asNumber(d['pendingRequests'] ?? d['pending_requests']),
      userCount: asNumber(d['userCount'] ?? d['user_count']),
    };
  }

  /**
   * `GET /api/v1/admin/dashboard/activity?limit=` → unwraps `{ data: [...] }`.
   * @param limit Max events (server default 20).
   */
  async getRecentActivity(limit?: number): Promise<HubAuditEvent[]> {
    const params = limit !== undefined ? { limit: String(limit) } : undefined;
    const { data } = await this.client.get<{ success?: boolean; data?: unknown }>(
      '/api/v1/admin/dashboard/activity',
      params,
    );
    return asArray(data).map(toAuditEvent);
  }
}
