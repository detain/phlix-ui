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

function asBool(value: unknown, fallback = false): boolean {
  return value === true || value === 1 || value === '1' || value === 'true' || fallback;
}

function isRecord(v: unknown): v is Raw {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function toServerInfo(r: Raw): ServerInfo {
  return {
    id: asString(r['id'] ?? r['serverId']),
    name: asString(r['name'] ?? r['serverName']),
    hostname: asString(r['hostname']),
    version: asString(r['version']),
    online: asBool(r['online'], true),
    lastSeenAt: asNumber(r['lastSeenAt'] ?? r['last_seen_at'], 0) || null,
    activeSessionCount: asNumber(r['activeSessionCount'] ?? r['active_session_count']),
    uptimeSeconds: asNumber(r['uptimeSeconds'] ?? r['uptime_seconds']),
    libraryCount: asNumber(r['libraryCount'] ?? r['library_count']),
    totalItemCount: asNumber(r['totalItemCount'] ?? r['total_item_count']),
    totalStorageBytes: asNumber(r['totalStorageBytes'] ?? r['total_storage_bytes']),
  };
}

function toServerListItem(r: Raw): ServerListItem {
  const hostnameCandidates = Array.isArray(r['hostnameCandidates'])
    ? r['hostnameCandidates']
    : [];
  const firstHostname = hostnameCandidates[0] as string | undefined;
  return {
    id: asString(r['id'] ?? r['serverId']),
    name: asString(r['name'] ?? r['serverName']),
    hostname: asString(r['hostname']) || firstHostname || '',
    online: asBool(r['online'], true),
    lastSeenAt: asNumber(r['lastSeenAt'] ?? r['last_seen_at'], 0) || null,
    url: firstHostname,
  };
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
export class AdminServersApi {
  constructor(private readonly client: ApiClient) {}

  /**
   * `GET /api/v1/servers` → list of servers in the fleet.
   * Returns the `data` array from `{ success, data: [...] }`.
   */
  async listServers(): Promise<ServerListItem[]> {
    const { data } = await this.client.get<{ success?: boolean; data?: unknown }>(
      '/api/v1/servers',
    );
    if (!Array.isArray(data)) return [];
    return (data as Raw[]).map(toServerListItem);
  }

  /**
   * `GET /api/v1/servers/{id}` → detailed server info.
   * Returns the `data` object from `{ success, data: {...} }`.
   */
  async getServerInfo(id: string): Promise<ServerInfo> {
    const { data } = await this.client.get<{ success?: boolean; data?: Raw }>(
      `/api/v1/servers/${encodeURIComponent(id)}`,
    );
    return toServerInfo(isRecord(data) ? data : {});
  }
}