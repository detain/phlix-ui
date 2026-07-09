/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { ApiClient } from '../client';

/** Current DLNA CDS server status. */
export interface DlnaServerStatus {
  enabled: boolean;
  running: boolean;
  serverId: string | null;
  friendlyName: string | null;
  port: number | null;
  baseUrl: string | null;
  message?: string;
}

/** Result of a start/stop action. */
export interface DlnaServerActionResult {
  success: boolean;
  message?: string;
}

/**
 * AdminDlnaServerApi (RA.9) — typed wrapper over the DLNA CDS server admin
 * endpoints (`/api/v1/admin/dlna/*`), ported 1:1 from the deleted React
 * `DlnaServerApi`. Reads the current server status and starts/stops the UPnP
 * MediaServer. Defensively normalises the status payload so a malformed
 * response degrades to a safe, fully-typed shape rather than leaking holes.
 */
export class AdminDlnaServerApi {
  constructor(private readonly client: ApiClient) {}

  /** `GET /api/v1/admin/dlna/status` → normalised {@link DlnaServerStatus}. */
  async getStatus(): Promise<DlnaServerStatus> {
    const res = await this.client.get<Partial<DlnaServerStatus>>('/api/v1/admin/dlna/status');
    return {
      enabled: res.enabled === true,
      running: res.running === true,
      serverId: typeof res.serverId === 'string' ? res.serverId : null,
      friendlyName: typeof res.friendlyName === 'string' ? res.friendlyName : null,
      port: typeof res.port === 'number' ? res.port : null,
      baseUrl: typeof res.baseUrl === 'string' ? res.baseUrl : null,
      ...(typeof res.message === 'string' ? { message: res.message } : {}),
    };
  }

  /** `POST /api/v1/admin/dlna/start` → {@link DlnaServerActionResult}. */
  async start(): Promise<DlnaServerActionResult> {
    const res = await this.client.post<Partial<DlnaServerActionResult>>('/api/v1/admin/dlna/start');
    return {
      success: res.success === true,
      ...(typeof res.message === 'string' ? { message: res.message } : {}),
    };
  }

  /** `POST /api/v1/admin/dlna/stop` → {@link DlnaServerActionResult}. */
  async stop(): Promise<DlnaServerActionResult> {
    const res = await this.client.post<Partial<DlnaServerActionResult>>('/api/v1/admin/dlna/stop');
    return {
      success: res.success === true,
      ...(typeof res.message === 'string' ? { message: res.message } : {}),
    };
  }
}
