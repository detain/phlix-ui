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
export class AdminServicesApi {
  constructor(private readonly client: ApiClient) {}

  // ─── Trakt.tv ──────────────────────────────────────────────────────────────

  /**
   * `GET /api/v1/admin/services/trakt/status` → `{ connected, username, configured? }`.
   */
  async getTraktStatus(): Promise<TraktStatus> {
    const res = await this.client.get<Partial<TraktStatus>>('/api/v1/admin/services/trakt/status');
    const status: TraktStatus = {
      connected: res.connected === true,
      username: typeof res.username === 'string' ? res.username : null,
    };
    if (typeof res.configured === 'boolean') status.configured = res.configured;
    return status;
  }

  /** `POST /api/v1/admin/services/trakt/disconnect` → `{ message }`. */
  async disconnectTrakt(): Promise<TraktDisconnectResult> {
    const res = await this.client.post<Partial<TraktDisconnectResult>>(
      '/api/v1/admin/services/trakt/disconnect',
    );
    return { message: typeof res.message === 'string' ? res.message : '' };
  }

  /**
   * Navigate the browser to the Trakt OAuth authorisation URL.
   * This is NOT a fetch call — it triggers a full-page redirect.
   */
  navigateToTraktAuthorize(): void {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/v1/oauth/trakt';
    }
  }

  // ─── Last.fm ───────────────────────────────────────────────────────────────

  /**
   * `GET /api/v1/admin/services/lastfm/status` → `{ connected, username, api_key_set }`.
   */
  async getLastfmStatus(): Promise<LastfmStatus> {
    const res = await this.client.get<Partial<LastfmStatus>>('/api/v1/admin/services/lastfm/status');
    return {
      connected: res.connected === true,
      username: typeof res.username === 'string' ? res.username : null,
      api_key_set: res.api_key_set === true,
    };
  }

  /** `POST /api/v1/admin/services/lastfm/disconnect` → `{ message }`. */
  async disconnectLastfm(): Promise<LastfmDisconnectResult> {
    const res = await this.client.post<Partial<LastfmDisconnectResult>>(
      '/api/v1/admin/services/lastfm/disconnect',
    );
    return { message: typeof res.message === 'string' ? res.message : '' };
  }

  /**
   * Navigate the browser to the existing Last.fm OAuth page (`/admin/lastfm`).
   * This is NOT a fetch call — it triggers a full-page redirect.
   */
  navigateToLastfmConnect(): void {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/lastfm';
    }
  }
}
