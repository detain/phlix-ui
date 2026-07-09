/**
 * SyncPlay collaborative playback API client.
 *
 * Provides methods for creating/joining SyncPlay rooms, managing sessions,
 * and synchronizing playback state across multiple users.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
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

/** Input for creating a new SyncPlay room. */
export interface CreateRoomInput {
  name: string;
  description?: string;
  isPublic: boolean;
}

/** Input for joining a SyncPlay room. */
export interface JoinRoomInput {
  roomId: string;
}

/** Response envelope for room operations. */
export interface SyncPlayRoomResponse {
  room: SyncPlayRoom;
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
 *   - POST /api/v1/syncplay/rooms — create a room
 *   - POST /api/v1/syncplay/rooms/:id/join — join a room
 *   - POST /api/v1/syncplay/rooms/:id/leave — leave a room
 *   - PUT /api/v1/syncplay/sessions/:id/state — send state update
 *   - GET /api/v1/syncplay/sessions/:id — get current session state
 *   - GET /api/v1/syncplay/rooms/:id/members — list room members
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
   * Create a new SyncPlay room.
   * POST /api/v1/syncplay/rooms
   */
  async createRoom(input: CreateRoomInput): Promise<SyncPlayRoom> {
    const res = await this.client.post<SyncPlayRoomResponse>('/api/v1/syncplay/rooms', input);
    return res.room;
  }

  /**
   * Join an existing SyncPlay room.
   * POST /api/v1/syncplay/rooms/:id/join
   */
  async joinRoom(roomId: string): Promise<SyncPlaySession> {
    const res = await this.client.post<SyncPlaySessionResponse>(
      `/api/v1/syncplay/rooms/${encodeURIComponent(roomId)}/join`,
    );
    return res.session;
  }

  /**
   * Leave the current SyncPlay room.
   * POST /api/v1/syncplay/rooms/:id/leave
   */
  async leaveRoom(roomId: string): Promise<void> {
    await this.client.post(`/api/v1/syncplay/rooms/${encodeURIComponent(roomId)}/leave`);
  }

  /**
   * Send a playback state update to the session.
   * PUT /api/v1/syncplay/sessions/:id/state
   */
  async sendStateUpdate(sessionId: string, state: SyncPlayStateUpdate): Promise<void> {
    await this.client.put(`/api/v1/syncplay/sessions/${encodeURIComponent(sessionId)}/state`, state);
  }

  /**
   * Send a playback command (play/pause/seek/sync).
   * POST /api/v1/syncplay/sessions/:id/command
   */
  async sendCommand(sessionId: string, command: SyncPlayPlaybackCommand): Promise<void> {
    await this.client.post(`/api/v1/syncplay/sessions/${encodeURIComponent(sessionId)}/command`, command);
  }

  /**
   * Get the current session state.
   * GET /api/v1/syncplay/sessions/:id
   */
  async getState(sessionId: string): Promise<SyncPlaySession> {
    const res = await this.client.get<SyncPlaySessionResponse>(
      `/api/v1/syncplay/sessions/${encodeURIComponent(sessionId)}`,
    );
    return res.session;
  }

  /**
   * Get the list of members in a room.
   * GET /api/v1/syncplay/rooms/:id/members
   */
  async getMembers(roomId: string): Promise<SyncPlayUser[]> {
    const res = await this.client.get<SyncPlayMembersResponse>(
      `/api/v1/syncplay/rooms/${encodeURIComponent(roomId)}/members`,
    );
    return Array.isArray(res.members) ? res.members : [];
  }

  /**
   * List public rooms available to join.
   * GET /api/v1/syncplay/rooms/public
   */
  async listPublicRooms(): Promise<SyncPlayRoom[]> {
    const res = await this.client.get<{ rooms?: SyncPlayRoom[] }>('/api/v1/syncplay/rooms/public');
    return Array.isArray(res.rooms) ? res.rooms : [];
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
