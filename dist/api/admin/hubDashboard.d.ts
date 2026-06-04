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
export declare class AdminHubDashboardApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/dashboard/summary` → unwraps `{ data: { … } }`. */
    getSummary(): Promise<HubSummary>;
    /**
     * `GET /api/v1/admin/dashboard/activity?limit=` → unwraps `{ data: [...] }`.
     * @param limit Max events (server default 20).
     */
    getRecentActivity(limit?: number): Promise<HubAuditEvent[]>;
}
