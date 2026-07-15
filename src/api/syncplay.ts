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
import { SyncPlayClient, serializeMessage } from '@phlix/syncplay';

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

// ── P8: SyncPlay WebSocket connection using @phlix/syncplay ───────────────────
/** Active WebSocket connection for SyncPlay real-time sync. */
let syncPlayWs: WebSocket | null = null;

/** Current room ID for the active connection. */
let syncPlayRoomId: string | null = null;

/** Reconnect attempt count for exponential backoff. */
let syncPlayReconnectAttempts = 0;

/** Maximum reconnect attempts before giving up. */
const MAX_RECONNECT_ATTEMPTS = 5;

/** Base delay in ms for exponential backoff. */
const RECONNECT_BASE_DELAY_MS = 1000;

/** @phlix/syncplay SyncPlayClient instance for protocol handling. */
let syncPlayClient: SyncPlayClient | null = null;

/** Current member ID for the SyncPlay session. */
let syncPlayMemberId: string | null = null;

/** Current member name for the SyncPlay session. */
let syncPlayMemberName: string | null = null;

/** Callback invoked when the server sends a SyncPlay message over the WebSocket. */
type SyncPlayMessageHandler = (msg: { type: string; position?: number; roomId?: string }) => void;

/** Message handler registered by the consumer (useSyncPlayStore). */
let messageHandler: SyncPlayMessageHandler | null = null;

/**
 * Get the JWT token for WebSocket authentication.
 * Returns null if no token is available (e.g., SSR context).
 */
function getWsToken(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    const store = new LocalStorageTokenStore();
    return store.getAccessToken();
  } catch {
    return null;
  }
}

/**
 * Build the WebSocket URL for SyncPlay.
 * Connects to port 8097 on the current host with the JWT token as a query param.
 */
function buildWsUrl(roomId: string): string {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const token = getWsToken() ?? '';
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${hostname}:8097?token=${encodeURIComponent(token)}&room=${encodeURIComponent(roomId)}`;
}

/**
 * Handle an incoming WebSocket message from the server.
 * Uses @phlix/syncplay decodeMessage for proper protocol handling.
 */
function handleWsMessage(event: MessageEvent): void {
  if (!syncPlayClient) return;
  try {
    const raw = JSON.parse(event.data as string);
    syncPlayClient.handleIncoming(raw);
  } catch {
    /* malformed JSON — ignore */
  }
}

/**
 * Handle WebSocket close event with exponential backoff reconnect.
 */
function handleWsClose(): void {
  syncPlayWs = null;
  if (syncPlayClient) {
    syncPlayClient.onDisconnect();
  }
  if (syncPlayRoomId && syncPlayReconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    const delay = RECONNECT_BASE_DELAY_MS * Math.pow(2, syncPlayReconnectAttempts);
    syncPlayReconnectAttempts++;
    console.log(`[SyncPlay] WebSocket closed, reconnecting in ${delay}ms (attempt ${syncPlayReconnectAttempts})`);
    setTimeout(() => {
      if (syncPlayRoomId) openSyncPlayConnection(syncPlayRoomId);
    }, delay);
  } else if (syncPlayReconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.warn('[SyncPlay] Max reconnect attempts reached, giving up');
    syncPlayRoomId = null;
    syncPlayReconnectAttempts = 0;
    syncPlayClient = null;
  }
}

/**
 * Open a WebSocket connection to the SyncPlay server for the given room.
 * If a connection is already open for a different room, it is closed first.
 *
 * @param roomId - The SyncPlay room/group ID to connect to.
 * @param onMessage - Callback invoked for each server-to-client SyncPlay message.
 * @param memberId - The member ID for this client.
 * @param memberName - The member name for this client.
 */
export function openSyncPlayConnection(
  roomId: string,
  onMessage?: SyncPlayMessageHandler,
  memberId?: string,
  memberName?: string,
): void {
  // Register or update the message handler.
  if (onMessage) messageHandler = onMessage;

  // Close any existing connection that was for a different room.
  if (syncPlayWs && syncPlayRoomId !== roomId) {
    syncPlayWs.close();
    syncPlayWs = null;
    syncPlayRoomId = null;
    syncPlayReconnectAttempts = 0;
    syncPlayClient = null;
  }

  // If already connected to this room, nothing to do.
  if (syncPlayWs && syncPlayRoomId === roomId) return;

  syncPlayRoomId = roomId;
  syncPlayReconnectAttempts = 0;

  // Generate member ID if not provided
  const mid = memberId ?? syncPlayMemberId ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const mname = memberName ?? syncPlayMemberName ?? 'Anonymous';
  syncPlayMemberId = mid;
  syncPlayMemberName = mname;

  // Create SyncPlayClient with proper protocol handling
  syncPlayClient = new SyncPlayClient({
    send: (message) => {
      if (syncPlayWs && syncPlayWs.readyState === WebSocket.OPEN) {
        syncPlayWs.send(serializeMessage(message));
      }
    },
    now: () => Date.now(),
    memberId: mid,
    memberName: mname,
    onPlaybackCommand: (command) => {
      if (!messageHandler) return;
      // Convert to the format expected by useSyncPlayStore
      messageHandler({
        type: command.type,
        position: command.position,
        roomId: syncPlayRoomId ?? undefined,
      });
    },
    onPlaybackSync: (memberId, position, isPlaying, serverTime) => {
      if (!messageHandler) return;
      messageHandler({
        type: isPlaying ? 'play' : 'pause',
        position,
        roomId: syncPlayRoomId ?? undefined,
      });
      void memberId;
      void serverTime;
    },
    onDisconnect: () => {
      /* handled by handleWsClose */
    },
    onError: (code, message) => {
      console.error(`[SyncPlay] Error: ${code} - ${message}`);
    },
    onInfo: (message) => {
      console.log(`[SyncPlay] Info: ${message}`);
    },
  });

  const url = buildWsUrl(roomId);
  console.log(`[SyncPlay] Opening WebSocket to ${url}`);
  syncPlayWs = new WebSocket(url);

  syncPlayWs.onopen = () => {
    console.log('[SyncPlay] WebSocket connected');
    syncPlayReconnectAttempts = 0;
    // Re-join the group after reconnect
    if (syncPlayClient && syncPlayRoomId) {
      syncPlayClient.joinGroup(syncPlayRoomId);
    }
  };

  syncPlayWs.onmessage = handleWsMessage;

  syncPlayWs.onclose = handleWsClose;

  syncPlayWs.onerror = (err) => {
    console.error('[SyncPlay] WebSocket error', err);
  };
}

/**
 * Close the current SyncPlay WebSocket connection.
 */
export function closeSyncPlayConnection(): void {
  if (syncPlayWs) {
    syncPlayWs.close();
    syncPlayWs = null;
  }
  if (syncPlayClient) {
    syncPlayClient.leaveGroup();
    syncPlayClient.onDisconnect();
    syncPlayClient = null;
  }
  syncPlayRoomId = null;
  syncPlayReconnectAttempts = 0;
}

/**
 * Send a playback state update over the SyncPlay WebSocket using @phlix/syncplay protocol.
 * No-op if the WebSocket is not connected.
 *
 * @param state - The current playback state to broadcast to other room members.
 */
export function sendSyncPlayStateUpdate(state: SyncPlayStateUpdate): void {
  if (!syncPlayClient || !syncPlayWs || syncPlayWs.readyState !== WebSocket.OPEN) return;
  syncPlayClient.reportPosition(state.playbackPosition, state.playbackRate > 0);
}

/**
 * Send a playback command (play/pause/seek/sync) over the SyncPlay WebSocket
 * using @phlix/syncplay protocol.
 * No-op if the WebSocket is not connected.
 *
 * @param command - The playback command to broadcast to other room members.
 */
export function sendSyncPlayCommand(command: SyncPlayPlaybackCommand): void {
  if (!syncPlayClient || !syncPlayWs || syncPlayWs.readyState !== WebSocket.OPEN) return;

  switch (command.type) {
    case 'play':
      syncPlayClient.sendPlay(command.position ?? 0);
      break;
    case 'pause':
      syncPlayClient.sendPause(command.position ?? 0);
      break;
    case 'seek':
      if (command.position !== undefined) {
        const fromPos = 0; // We don't track from position, use 0
        syncPlayClient.sendSeek(fromPos, command.position);
      }
      break;
    case 'sync':
      // Full sync - send current position
      if (command.position !== undefined) {
        syncPlayClient.reportPosition(command.position, true);
      }
      break;
  }
}
