import type { ApiClient } from '../client';
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
export declare class AdminRemoteAccessApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/remote/hub/status` → current enrollment status. */
    hubStatus(): Promise<HubStatus>;
    /** `POST /api/v1/admin/remote/hub/pair` → initiate pairing. */
    hubPair(hubUrl: string, serverName: string): Promise<HubPairResponse>;
    /** `POST /api/v1/admin/remote/hub/poll` → poll for claim completion. */
    hubPoll(claimId: string, hubUrl: string): Promise<HubPollResponse>;
    /** `POST /api/v1/admin/remote/hub/complete` → store the enrollment. */
    hubComplete(enrollmentJwt: string, hubJwksUrl: string, serverId: string, hubUrl: string): Promise<RemoteAccessAck>;
    /** `POST /api/v1/admin/remote/hub/unenroll` → unenroll from the hub. */
    hubUnenroll(): Promise<RemoteAccessAck>;
    /** `POST /api/v1/admin/remote/hub/heartbeat` → send a heartbeat to the hub. */
    hubHeartbeat(): Promise<HubHeartbeatResponse>;
    /** `GET /api/v1/admin/remote/subdomain/status` → current subdomain status. */
    subdomainStatus(): Promise<SubdomainStatus>;
    /** `POST /api/v1/admin/remote/subdomain/claim` → claim a subdomain from the hub. */
    subdomainClaim(): Promise<SubdomainClaimResponse>;
    /** `POST /api/v1/admin/remote/subdomain/release` → release the claimed subdomain. */
    subdomainRelease(): Promise<RemoteAccessAck>;
    /** `GET /api/v1/admin/remote/relay/status` → current relay tunnel status. */
    relayStatus(): Promise<RelayStatus>;
    /** `POST /api/v1/admin/remote/relay/enable` → enable the relay tunnel. */
    relayEnable(): Promise<RemoteAccessAck>;
    /** `POST /api/v1/admin/remote/relay/disable` → disable the relay tunnel. */
    relayDisable(): Promise<RemoteAccessAck>;
    /** `POST /api/v1/admin/remote/relay/ping` → ping the relay tunnel. */
    relayPing(): Promise<RelayPingResponse>;
    /** `GET /api/v1/admin/remote/portforward/status` → current port-forward status. */
    portForwardStatus(): Promise<PortForwardStatus>;
    /** `POST /api/v1/admin/remote/portforward/enable` → enable port forwarding. */
    portForwardEnable(): Promise<RemoteAccessAck>;
    /** `POST /api/v1/admin/remote/portforward/disable` → disable port forwarding. */
    portForwardDisable(): Promise<RemoteAccessAck>;
    /**
     * `GET /api/v1/admin/remote/portforward/candidates` → hostname candidates.
     * Defensively returns an empty `candidates` array on a malformed payload.
     */
    portForwardCandidates(): Promise<PortForwardCandidatesResponse>;
}
