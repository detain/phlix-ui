/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';

/**
 * InviteLink — shape returned by GET /api/v1/me/invite-links.
 * Note: server_name and library_name are NOT included — must look up separately.
 */
export interface InviteLink {
  id: string;
  owner_user_id: string;
  server_id: string;
  /** Library id, or null if the link grants access to all libraries on the server. */
  library_id: string | null;
  permission: 'read' | 'readwrite';
  /** 0 means unlimited uses. */
  max_uses: number;
  use_count: number;
  /** Unix timestamp (seconds), or null if the link never expires. */
  expires_at: number | null;
  /** Unix timestamp (seconds). */
  created_at: number;
  url: string;
}

/** Input for creating an invite link. */
export interface CreateInviteLinkInput {
  server_id: string;
  /** null means access to all libraries on the server. */
  library_id?: string | null;
  permission?: 'read' | 'readwrite';
  /** 0 means unlimited. */
  max_uses?: number;
  /** Seconds until expiry. 0/null = never. 604800=7d, 2592000=30d, 7776000=90d, 31536000=1y */
  expires_in?: number;
}

/** Response from POST /api/v1/me/invite-links. */
export interface CreateInviteLinkResponse {
  url: string;
  expires_at: number;
  id: string;
}

/**
 * Server shape from GET /api/v1/me/servers.
 *
 * The hub returns `ServerInfoDto::toPayload()`, which is **camelCase** — this is the
 * established server↔hub wire convention and `MyServersPage.vue` already depends on
 * it. Fields are optional because older hubs may omit them.
 */
export interface Server {
  serverId?: string;
  serverName?: string;
  status?: string;
}

/**
 * Library shape from GET /api/v1/me/libraries?server_id={id}.
 *
 * `LibraryController::listLibraries()` returns ONLY `{ id, name }` — there is no
 * `server_id` on the wire (the server is already scoped by the query parameter).
 */
export interface Library {
  id: string;
  name: string;
}

/**
 * InviteLinksApi — thin typed wrapper around the invite-links endpoints.
 */
export class InviteLinksApi {
  constructor(private client: ApiClient) {}

  /** List all invite links for the current user. */
  list() {
    return this.client.get<{ invite_links: InviteLink[] }>('/api/v1/me/invite-links');
  }

  /** Create a new invite link. */
  create(input: CreateInviteLinkInput) {
    return this.client.post<CreateInviteLinkResponse>('/api/v1/me/invite-links', input);
  }

  /** Revoke (delete) an invite link by id. */
  revoke(id: string) {
    return this.client.delete(`/api/v1/me/invite-links/${id}`);
  }
}

/**
 * ServersApi — thin typed wrapper around the servers endpoint for dropdown population.
 */
export class ServersApi {
  constructor(private client: ApiClient) {}

  list() {
    return this.client.get<{ servers: Server[] }>('/api/v1/me/servers');
  }
}

/**
 * LibrariesApi — thin typed wrapper around the libraries endpoint for dropdown population.
 */
export class LibrariesApi {
  constructor(private client: ApiClient) {}

  listByServer(serverId: string) {
    return this.client.get<{ libraries: Library[] }>(`/api/v1/me/libraries?server_id=${encodeURIComponent(serverId)}`);
  }
}
