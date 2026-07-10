/**
 * SyncPlay collaborative playback API client.
 *
 * Provides methods for creating/joining SyncPlay groups, managing sessions,
 * and synchronizing playback state across multiple users.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';
import { LocalStorageTokenStore } from './tokenStore';
import type {
  SyncPlayRoom,
  SyncPlaySession,
  SyncPlayUser,
  SyncPlayStateUpdate,
  SyncPlayPlaybackCommand,
} from '../types/syncplay';

/** Input for creating a new SyncPlay group. */
export interface CreateRoomInput {
  name: string;
  description?: string;
  isPublic: boolean;
}

/** Input for joining a SyncPlay group. */
export interface JoinRoomInput {
  groupId: string;
}

/** Response envelope for group operations. */
export interface SyncPlayRoomResponse {
  group: SyncPlayRoom;
}

/** Response envelope for session operations. */
export interface SyncPlaySessionResponse {
  session: SyncPlaySession;
}

/** Response envelope for members listing. */
export interface SyncPlayMembersResponse {
  members: SyncPlayUser[];
}

/**
 * SyncPlay API client for collaborative playback sessions.
 *
 * Hits the server's SyncPlay endpoints:
 *   - POST /api/v1/syncplay/groups — create a group
 *   - POST /api/v1/syncplay/groups/:id/join — join a group
 *   - POST /api/v1/syncplay/groups/:id/leave — leave a group
 *   - GET /api/v1/syncplay/groups — list all groups
 *   - GET /api/v1/syncplay/groups/:id — get group state
 *
 * Playback state synchronization (sendStateUpdate, sendCommand) is handled
 * via WebSocket on port 8097 using @phlix/syncplay, not REST.
 */
export class SyncPlayApi {
  private client: ApiClient;

  constructor(apiBase: string) {
    this.client = new ApiClient({
      baseUrl: apiBase,
      tokenStore: typeof window !== 'undefined' ? new LocalStorageTokenStore() : undefined,
    });
  }

  /**
   * Create a new SyncPlay group.
   * POST /api/v1/syncplay/groups
   */
  async createRoom(input: CreateRoomInput): Promise<SyncPlayRoom> {
    const res = await this.client.post<SyncPlayRoomResponse>('/api/v1/syncplay/groups', input);
    return res.group;
  }

  /**
   * Join an existing SyncPlay group.
   * POST /api/v1/syncplay/groups/:id/join
   */
  async joinRoom(groupId: string): Promise<SyncPlaySession> {
    const res = await this.client.post<SyncPlaySessionResponse>(
      `/api/v1/syncplay/groups/${encodeURIComponent(groupId)}/join`,
    );
    return res.session;
  }

  /**
   * Leave the current SyncPlay group.
   * POST /api/v1/syncplay/groups/:id/leave
   */
  async leaveRoom(groupId: string): Promise<void> {
    await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(groupId)}/leave`);
  }

  /**
   * Get the current session state.
   * GET /api/v1/syncplay/groups/:id
   */
  async getState(groupId: string): Promise<SyncPlaySession> {
    const res = await this.client.get<SyncPlaySessionResponse>(
      `/api/v1/syncplay/groups/${encodeURIComponent(groupId)}`,
    );
    return res.session;
  }

  /**
   * Get the list of members in a group.
   * GET /api/v1/syncplay/groups/:id
   */
  async getMembers(groupId: string): Promise<SyncPlayUser[]> {
    const res = await this.client.get<SyncPlayMembersResponse>(
      `/api/v1/syncplay/groups/${encodeURIComponent(groupId)}/members`,
    );
    return Array.isArray(res.members) ? res.members : [];
  }

  /**
   * List all available groups.
   * GET /api/v1/syncplay/groups
   */
  async listGroups(): Promise<SyncPlayRoom[]> {
    const res = await this.client.get<{ groups?: SyncPlayRoom[] }>('/api/v1/syncplay/groups');
    return Array.isArray(res.groups) ? res.groups : [];
  }

  /**
   * List public rooms available to join.
   * GET /api/v1/syncplay/groups
   * @deprecated Use listGroups() - the server does not distinguish public/private via endpoint
   */
  async listPublicRooms(): Promise<SyncPlayRoom[]> {
    return this.listGroups();
  }

  /**
   * Send a playback state update to the session.
   *
   * @deprecated State updates are sent via WebSocket using @phlix/syncplay SyncPlayClient.
   * This method is a no-op placeholder to maintain API compatibility.
   */
  async sendStateUpdate(sessionId: string, state: SyncPlayStateUpdate): Promise<void> {
    // State updates are handled via WebSocket using @phlix/syncplay SyncPlayClient.
    // This REST endpoint does not exist on the server.
    void sessionId;
    void state;
  }

  /**
   * Send a playback command (play/pause/seek/sync).
   *
   * @deprecated Commands are sent via WebSocket using @phlix/syncplay SyncPlayClient.
   * This method is a no-op placeholder to maintain API compatibility.
   */
  async sendCommand(sessionId: string, command: SyncPlayPlaybackCommand): Promise<void> {
    // Commands are handled via WebSocket using @phlix/syncplay SyncPlayClient.
    // This REST endpoint does not exist on the server.
    void sessionId;
    void command;
  }
}

/** Singleton instance for app-wide use. */
let syncPlayApiInstance: SyncPlayApi | null = null;

export function getSyncPlayApi(apiBase: string): SyncPlayApi {
  if (!syncPlayApiInstance) {
    syncPlayApiInstance = new SyncPlayApi(apiBase);
  }
  return syncPlayApiInstance;
}
