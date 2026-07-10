/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/** Server info returned by `GET /api/v1/servers/{id}` or the fleet list. */
export interface ServerInfo {
    id: string;
    name: string;
    hostname: string;
    version: string;
    /** Whether the server is reachable and responding. */
    online: boolean;
    /** Unix timestamp (seconds) of the last heartbeat. */
    lastSeenAt: number | null;
    /** Number of currently active playback sessions. */
    activeSessionCount: number;
    /** Server uptime in seconds. */
    uptimeSeconds: number;
    /** Library count. */
    libraryCount: number;
    /** Total item count across all libraries. */
    totalItemCount: number;
    /** Total storage used in bytes. */
    totalStorageBytes: number;
}
/** A server in the fleet list with connection status. */
export interface ServerListItem {
    id: string;
    name: string;
    hostname: string;
    online: boolean;
    lastSeenAt: number | null;
    /** First hostname candidate for the server's public URL. */
    url?: string;
}
/**
 * AdminServersApi — typed wrapper over the admin servers endpoints.
 *
 * `GET /api/v1/servers` → fleet list with online/offline status.
 * `GET /api/v1/servers/{id}` → single server detailed info.
 *
 * Both verbs defensively unwrap the shared `{ success, data }` envelope and
 * normalise field names (camelCase ↔ snake_case), so a malformed or partial
 * payload degrades to zeros / empty values rather than throwing.
 */
export declare class AdminServersApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/servers` → list of servers in the fleet.
     * Returns the `data` array from `{ success, data: [...] }`.
     */
    listServers(): Promise<ServerListItem[]>;
    /**
     * `GET /api/v1/servers/{id}` → detailed server info.
     * Returns the `data` object from `{ success, data: {...} }`.
     */
    getServerInfo(id: string): Promise<ServerInfo>;
}
