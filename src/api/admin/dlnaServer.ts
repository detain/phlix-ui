/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { ApiClient } from '../client';

/**
 * Current DLNA CDS server status.
 *
 * ⚠ S28 CHANGED WHAT `enabled` MEANS — read this before touching the page.
 * Pre-S28 it meant "a `CdsServer` is wired in this worker". Post-S28 it is the
 * PERSISTED INTENT (`dlna.cds_enabled`), which ships **false**, while `running`
 * is whether THIS worker actually registered the ContentDirectory routes at its
 * `onWorkerStart`. The two therefore disagree for the whole window between the
 * setting being written and the graceful worker reload landing.
 *
 * `enabled === false` is a **stopped** server, not an unconfigured one, and it
 * is the stock-install state. See `AdminDlnaServerController::status()`.
 */
export interface DlnaServerStatus {
  /** Persisted intent (`dlna.cds_enabled`). Ships false on a stock install. */
  enabled: boolean;
  /** Whether the worker that answered has the CDS routes registered right now. */
  running: boolean;
  /**
   * S214: the server's own `enabled !== running` verdict — a persisted change
   * that no worker has applied yet.
   *
   * Taken VERBATIM from the payload and deliberately NOT recomputed here: a
   * client-side `enabled !== running` would agree with the server by
   * construction and could never detect the server changing its mind about what
   * "pending" means. Older servers omit it, which normalises to `false`.
   */
  reloadPending: boolean;
  serverId: string | null;
  friendlyName: string | null;
  port: number | null;
  baseUrl: string | null;
  message?: string;
}

/** Result of a start/stop action. */
export interface DlnaServerActionResult {
  success: boolean;
  /** The intent the server persisted (omitted by older servers). */
  enabled?: boolean;
  /**
   * S214: whether the server managed to schedule the graceful worker reload.
   * `false` means the change is persisted but INERT until someone restarts the
   * process — the case where the UI used to claim plain success.
   */
  reloadScheduled?: boolean;
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
      reloadPending: res.reloadPending === true,
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
    return this.normaliseAction(res);
  }

  /** `POST /api/v1/admin/dlna/stop` → {@link DlnaServerActionResult}. */
  async stop(): Promise<DlnaServerActionResult> {
    const res = await this.client.post<Partial<DlnaServerActionResult>>('/api/v1/admin/dlna/stop');
    return this.normaliseAction(res);
  }

  /**
   * Normalise a start/stop payload, keeping the server's own `message` and
   * `reloadScheduled` rather than dropping them (S214).
   *
   * `enabled` / `reloadScheduled` are only carried through when the server
   * actually sent a boolean, so "older server, field absent" stays
   * distinguishable from "server said false".
   */
  private normaliseAction(res: Partial<DlnaServerActionResult>): DlnaServerActionResult {
    return {
      success: res.success === true,
      ...(typeof res.enabled === 'boolean' ? { enabled: res.enabled } : {}),
      ...(typeof res.reloadScheduled === 'boolean' ? { reloadScheduled: res.reloadScheduled } : {}),
      ...(typeof res.message === 'string' ? { message: res.message } : {}),
    };
  }
}
