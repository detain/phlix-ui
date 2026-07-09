/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { ApiClient } from '../client';

// ── Hub pairing types ─────────────────────────────────────────────────────────

/** Shape of the `GET /api/v1/admin/remote/hub/status` response. */
export interface HubStatus {
  paired: boolean;
  serverId?: string;
  hubUrl?: string;
  enrolledAt?: string;
  lastHeartbeat?: string;
}

/** Shape of the `POST /api/v1/admin/remote/hub/pair` response (initiate pairing). */
export interface HubPairResponse {
  success: boolean;
  serverId: string;
  hubUrl: string;
  claimCode?: string;
  claimId?: string;
  expiresIn?: number;
}

/** Shape of the `POST /api/v1/admin/remote/hub/poll` response. */
export interface HubPollResponse {
  success: boolean;
  token?: string;
  serverId?: string;
  message?: string;
}

/** Shape of the `POST /api/v1/admin/remote/hub/heartbeat` response. */
export interface HubHeartbeatResponse {
  success: boolean;
  receivedAt: string;
}

// ── Subdomain types ────────────────────────────────────────────────────────────

/** Shape of the `GET /api/v1/admin/remote/subdomain/status` response. */
export interface SubdomainStatus {
  claimed: boolean;
  subdomain?: string;
  fqdn?: string;
  certPath?: string;
  keyPath?: string;
}

/** Shape of the `POST /api/v1/admin/remote/subdomain/claim` response. */
export interface SubdomainClaimResponse {
  success: boolean;
  subdomain: string;
  fqdn: string;
}

// ── Relay tunnel types ──────────────────────────────────────────────────────────

/** Shape of the `GET /api/v1/admin/remote/relay/status` response. */
export interface RelayStatus {
  connected: boolean;
  active: boolean;
  endpoint?: string;
  establishedAt?: string;
}

/** Shape of the `POST /api/v1/admin/remote/relay/ping` response. */
export interface RelayPingResponse {
  success: boolean;
  latencyMs: number;
}

// ── Port forward types ───────────────────────────────────────────────────────────

/** Shape of the `GET /api/v1/admin/remote/portforward/status` response. */
export interface PortForwardStatus {
  enabled: boolean;
  method?: string;
  externalIp?: string;
  externalPort?: number;
  hostname?: string;
}

/** A hostname candidate offered by the port-forward discovery probe. */
export interface HostnameCandidate {
  hostname: string;
  externalIp: string;
  port: number;
}

/** Shape of the `GET /api/v1/admin/remote/portforward/candidates` response. */
export interface PortForwardCandidatesResponse {
  candidates: HostnameCandidate[];
}

/** A generic `{ success }` mutation acknowledgement. */
export interface RemoteAccessAck {
  success: boolean;
}

/**
 * AdminRemoteAccessApi (RA.10) — typed wrapper over the admin remote-access
 * endpoints (`/api/v1/admin/remote/...`), ported 1:1 from the deleted React
 * `RemoteAccessApi`. Covers hub pairing, subdomain claim/release, the relay
 * tunnel, and port-forward configuration. List unwraps degrade to `[]` rather
 * than throwing on a malformed payload.
 */
export class AdminRemoteAccessApi {
  constructor(private readonly client: ApiClient) {}

  // ── Hub pairing ───────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/remote/hub/status` → current enrollment status. */
  async hubStatus(): Promise<HubStatus> {
    return this.client.get<HubStatus>('/api/v1/admin/remote/hub/status');
  }

  /** `POST /api/v1/admin/remote/hub/pair` → initiate pairing. */
  async hubPair(hubUrl: string, serverName: string): Promise<HubPairResponse> {
    return this.client.post<HubPairResponse>('/api/v1/admin/remote/hub/pair', {
      hubUrl,
      serverName,
    });
  }

  /** `POST /api/v1/admin/remote/hub/poll` → poll for claim completion. */
  async hubPoll(claimId: string, hubUrl: string): Promise<HubPollResponse> {
    return this.client.post<HubPollResponse>('/api/v1/admin/remote/hub/poll', {
      claimId,
      hubUrl,
    });
  }

  /** `POST /api/v1/admin/remote/hub/complete` → store the enrollment. */
  async hubComplete(
    enrollmentJwt: string,
    hubJwksUrl: string,
    serverId: string,
    hubUrl: string,
  ): Promise<RemoteAccessAck> {
    return this.client.post<RemoteAccessAck>('/api/v1/admin/remote/hub/complete', {
      enrollmentJwt,
      hubJwksUrl,
      serverId,
      hubUrl,
    });
  }

  /** `POST /api/v1/admin/remote/hub/unenroll` → unenroll from the hub. */
  async hubUnenroll(): Promise<RemoteAccessAck> {
    return this.client.post<RemoteAccessAck>('/api/v1/admin/remote/hub/unenroll');
  }

  /** `POST /api/v1/admin/remote/hub/heartbeat` → send a heartbeat to the hub. */
  async hubHeartbeat(): Promise<HubHeartbeatResponse> {
    return this.client.post<HubHeartbeatResponse>('/api/v1/admin/remote/hub/heartbeat');
  }

  // ── Subdomain ─────────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/remote/subdomain/status` → current subdomain status. */
  async subdomainStatus(): Promise<SubdomainStatus> {
    return this.client.get<SubdomainStatus>('/api/v1/admin/remote/subdomain/status');
  }

  /** `POST /api/v1/admin/remote/subdomain/claim` → claim a subdomain from the hub. */
  async subdomainClaim(): Promise<SubdomainClaimResponse> {
    return this.client.post<SubdomainClaimResponse>('/api/v1/admin/remote/subdomain/claim');
  }

  /** `POST /api/v1/admin/remote/subdomain/release` → release the claimed subdomain. */
  async subdomainRelease(): Promise<RemoteAccessAck> {
    return this.client.post<RemoteAccessAck>('/api/v1/admin/remote/subdomain/release');
  }

  // ── Relay tunnel ──────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/remote/relay/status` → current relay tunnel status. */
  async relayStatus(): Promise<RelayStatus> {
    return this.client.get<RelayStatus>('/api/v1/admin/remote/relay/status');
  }

  /** `POST /api/v1/admin/remote/relay/enable` → enable the relay tunnel. */
  async relayEnable(): Promise<RemoteAccessAck> {
    return this.client.post<RemoteAccessAck>('/api/v1/admin/remote/relay/enable');
  }

  /** `POST /api/v1/admin/remote/relay/disable` → disable the relay tunnel. */
  async relayDisable(): Promise<RemoteAccessAck> {
    return this.client.post<RemoteAccessAck>('/api/v1/admin/remote/relay/disable');
  }

  /** `POST /api/v1/admin/remote/relay/ping` → ping the relay tunnel. */
  async relayPing(): Promise<RelayPingResponse> {
    return this.client.post<RelayPingResponse>('/api/v1/admin/remote/relay/ping');
  }

  // ── Port forward ──────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/remote/portforward/status` → current port-forward status. */
  async portForwardStatus(): Promise<PortForwardStatus> {
    return this.client.get<PortForwardStatus>('/api/v1/admin/remote/portforward/status');
  }

  /** `POST /api/v1/admin/remote/portforward/enable` → enable port forwarding. */
  async portForwardEnable(): Promise<RemoteAccessAck> {
    return this.client.post<RemoteAccessAck>('/api/v1/admin/remote/portforward/enable');
  }

  /** `POST /api/v1/admin/remote/portforward/disable` → disable port forwarding. */
  async portForwardDisable(): Promise<RemoteAccessAck> {
    return this.client.post<RemoteAccessAck>('/api/v1/admin/remote/portforward/disable');
  }

  /**
   * `GET /api/v1/admin/remote/portforward/candidates` → hostname candidates.
   * Defensively returns an empty `candidates` array on a malformed payload.
   */
  async portForwardCandidates(): Promise<PortForwardCandidatesResponse> {
    const res = await this.client.get<Partial<PortForwardCandidatesResponse>>(
      '/api/v1/admin/remote/portforward/candidates',
    );
    return { candidates: Array.isArray(res.candidates) ? res.candidates : [] };
  }
}
