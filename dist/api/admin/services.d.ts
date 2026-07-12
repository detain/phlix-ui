/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/**
 * Response shape from `GET /api/v1/admin/services/trakt/status`.
 *
 * Ported 1:1 from the deleted React `TraktStatus`.
 */
export interface TraktStatus {
    connected: boolean;
    username: string | null;
    /**
     * Whether the operator has supplied Trakt application credentials
     * (client_id + client_secret). When false, the Connect button would
     * dead-end on the "not configured" page, so the UI shows setup guidance
     * instead. Optional for backward-compatibility with older server builds.
     */
    configured?: boolean;
}
/** Response shape from `POST /api/v1/admin/services/trakt/disconnect`. */
export interface TraktDisconnectResult {
    message: string;
}
/** Response shape from `GET /api/v1/admin/services/lastfm/status`. */
export interface LastfmStatus {
    connected: boolean;
    username: string | null;
    api_key_set: boolean;
}
/** Response shape from `POST /api/v1/admin/services/lastfm/disconnect`. */
export interface LastfmDisconnectResult {
    message: string;
}
/**
 * AdminServicesApi (RA.5) — typed wrapper over the admin "Services" endpoints
 * (`/api/v1/admin/services/*`), consolidating the deleted React `TraktApi` +
 * `LastfmApi` into one class. Covers Trakt.tv and Last.fm connect/disconnect +
 * status. OAuth connect is a full-page browser redirect (not a fetch call);
 * disconnect/status are real API calls. Status payloads are normalised so a
 * malformed response degrades gracefully rather than throwing.
 */
export declare class AdminServicesApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/admin/services/trakt/status` → `{ connected, username, configured? }`.
     */
    getTraktStatus(): Promise<TraktStatus>;
    /** `POST /api/v1/admin/services/trakt/disconnect` → `{ message }`. */
    disconnectTrakt(): Promise<TraktDisconnectResult>;
    /**
     * Navigate the browser to the Trakt OAuth authorisation URL.
     * This is NOT a fetch call — it triggers a full-page redirect.
     */
    navigateToTraktAuthorize(): void;
    /**
     * `GET /api/v1/admin/services/lastfm/status` → `{ connected, username, api_key_set }`.
     */
    getLastfmStatus(): Promise<LastfmStatus>;
    /** `POST /api/v1/admin/services/lastfm/disconnect` → `{ message }`. */
    disconnectLastfm(): Promise<LastfmDisconnectResult>;
    /**
     * Navigate the browser to the Last.fm OAuth authorisation URL
     * (`/api/v1/oauth/lastfm`). The server either 302s to Last.fm or, when the
     * API key is unset, 302s back to `/app/admin/services?lastfm=not_configured`.
     * This is NOT a fetch call — it triggers a full-page redirect.
     */
    navigateToLastfmConnect(): void;
}
