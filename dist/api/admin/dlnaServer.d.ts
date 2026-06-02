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
export declare class AdminDlnaServerApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/dlna/status` → normalised {@link DlnaServerStatus}. */
    getStatus(): Promise<DlnaServerStatus>;
    /** `POST /api/v1/admin/dlna/start` → {@link DlnaServerActionResult}. */
    start(): Promise<DlnaServerActionResult>;
    /** `POST /api/v1/admin/dlna/stop` → {@link DlnaServerActionResult}. */
    stop(): Promise<DlnaServerActionResult>;
}
