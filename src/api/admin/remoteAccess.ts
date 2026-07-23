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

/**
 * Shape of the `GET /api/v1/admin/remote/relay/status` response (S39 reframe).
 *
 * The tunnel runs in a separate fork with no live control channel, so this
 * surfaces the relay fork's PERSISTED state (`relay-tunnel.state.json`) plus the
 * two REAL levers the honest UI reframe exposes: `enrolled` (a paired hub is
 * required for the tunnel to connect) and `disabled` (the effective kill-switch —
 * the operator toggle OR the `PHLIX_RELAY_DISABLED` env — reflecting what takes
 * effect on the next server reload). `lastConnectError`/`lastConnectErrorAt`
 * surface the persisted "why it's down" reason.
 */
export interface RelayStatus {
  connected: boolean;
  active: boolean;
  /** Automatic reconnection attempts since the last successful connect. */
  reconnectAttempts?: number;
  /** Count of relay-forwarded sessions currently active. */
  activeSessions?: number;
  /** ISO timestamp of the last disconnect, or null when never disconnected. */
  lastDisconnectTime?: string | null;
  /** Human-readable reason the tunnel last failed to connect (persisted), or null. */
  lastConnectError?: string | null;
  /** ISO timestamp of the last connect error, or null. */
  lastConnectErrorAt?: string | null;
  /** Effective kill-switch (operator disable OR `PHLIX_RELAY_DISABLED`); what takes effect on reload. */
  disabled?: boolean;
  /** Whether this server is paired/enrolled with a hub (a real lever for the tunnel). */
  enrolled?: boolean;
  /** ISO timestamp the relay fork last wrote state (staleness signal); null if it never ran. */
  updatedAt?: string | null;
  /** @deprecated back-compat only; the state file carries no endpoint. */
  endpoint?: string | null;
  /** @deprecated back-compat alias of `updatedAt`. */
  establishedAt?: string | null;
}

/**
 * Shape of the `POST /api/v1/admin/remote/relay/{enable,disable}` responses
 * (S39 reframe). These are "takes effect on reload" levers, NOT an instant
 * start/stop: they persist the operator kill-switch that the relay fork reads at
 * boot. `disabled` is the effective state AFTER the change — it can stay `true`
 * even after Enable when `PHLIX_RELAY_DISABLED` is still set in the environment
 * (`message` explains this honestly).
 */
export interface RelayControlResponse {
  success: boolean;
  /** Effective disabled state after the change (env-forced true if the env kill-switch is set). */
  disabled: boolean;
  /** Whether this server is paired with a hub. */
  enrolled: boolean;
  /** Always true — the change persists and applies on the next server reload, not instantly. */
  takesEffectOnReload: boolean;
  /** Human-readable outcome to surface to the operator. */
  message: string;
}

/**
 * Shape of a SUCCESSFUL `POST /api/v1/admin/remote/relay/ping` (200) response
 * (S39 reframe). `latencyMs` is the last PERSISTED hub round-trip
 * (`hub-heartbeat.state.json`), so it is `null` until a heartbeat has been
 * recorded — honest "not measured yet" rather than a fabricated timing. It stays
 * `null` until the S40 heartbeat-fork writes land. `latencySource` signals the
 * value is a persisted measurement, not a live probe fired by this request.
 */
export interface RelayPingResponse {
  success: boolean;
  connected: boolean;
  active: boolean;
  /** Last persisted round-trip latency (ms), or null when none has been recorded yet. */
  latencyMs: number | null;
  /** ISO timestamp of the last successful heartbeat, or null. */
  lastHeartbeatAt?: string | null;
  /** Provenance of `latencyMs` — currently always `'persisted'`. */
  latencySource?: string;
}

/**
 * Body of a `409` `POST /api/v1/admin/remote/relay/ping` response (S39) — the
 * tunnel is not connected. The client surfaces this via the shared `ApiError`
 * (`ApiError.body`), showing the message + the persisted last-connect reason.
 */
export interface RelayPingNotConnected {
  success: false;
  connected: false;
  active: boolean;
  message: string;
  lastConnectError?: string | null;
  lastConnectErrorAt?: string | null;
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

  /**
   * `POST /api/v1/admin/remote/relay/enable` → clear the persisted relay
   * kill-switch. HONEST lever (S39): takes effect on the next server reload, and
   * `disabled` may remain `true` when `PHLIX_RELAY_DISABLED` is still set.
   */
  async relayEnable(): Promise<RelayControlResponse> {
    return this.client.post<RelayControlResponse>('/api/v1/admin/remote/relay/enable');
  }

  /**
   * `POST /api/v1/admin/remote/relay/disable` → persist the relay kill-switch.
   * HONEST lever (S39): takes effect on the next server reload, not instantly.
   */
  async relayDisable(): Promise<RelayControlResponse> {
    return this.client.post<RelayControlResponse>('/api/v1/admin/remote/relay/disable');
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
