/**
 * SyncPlay collaborative playback types.
 *
 * Local fallback definitions mirroring @phlix/contracts v0.3.6 until the
 * npm package is updated. These match the server-side SyncPlay session/room DTOs
 * for coordinated multi-user playback with roles, permissions, and chat.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

export type SyncPlayRole = 'none' | 'contributor' | 'editor' | 'owner';

export type SyncPlayPermission = 'play' | 'pause' | 'seek' | 'chat' | 'control';

export interface SyncPlaySession {
  id: string;
  roomId: string;
  serverId: string;
  createdBy: string; // userId
  createdAt: string; // ISO 8601
  state: 'waiting' | 'playing' | 'paused' | 'ended';
  /** Media item id the group is (or last was) playing — carried through from
   *  the wire's `current_media_id` (S298). The server emits it in
   *  `GroupState::getState()`; `null` when no media has been selected yet.
   *  The hub-relay pending_command consumer (S298) writes it into the live
   *  session, and Player.vue's load-a-new-title path consumes it. */
  currentMediaId: string | null;
  playbackPosition: number; // seconds
  playbackRate: number;
  serverTime: number; // unix timestamp of server
  lastSync: string; // ISO 8601
  activeUsers: SyncPlayUser[];
  roles: Record<string, SyncPlayRole>;
  permissions: Record<string, SyncPlayPermission[]>;
}

export interface SyncPlayUser {
  id: string;
  name: string;
  profileId: number;
  role: SyncPlayRole;
  isOnline: boolean;
  lastSeen: string; // ISO 8601
}

export interface SyncPlayRoom {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  currentSession?: SyncPlaySession;
  memberCount: number;
  // Wire protocol fields (server-to-client full room state)
  roomId?: string;
  serverId?: string;
  hostUserId?: string;
  createdAt?: string; // ISO 8601
  participants?: SyncPlayParticipant[];
}

export interface SyncPlayChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string; // ISO 8601
}

/**
 * A participant in a SyncPlay room, including sync state and latency.
 */
export interface SyncPlayParticipant {
  userId: string;
  username: string;
  role: SyncPlayRole;
  isSynced: boolean;
  lastPosition: number; // seconds
  latency: number; // ms
}

/**
 * A SyncPlay wire protocol message for playback synchronization.
 * Carried over the signal channel (WebSocket / SSE) to synchronize
 * play / pause / seek / sync events across all participants.
 */
export interface SyncPlayMessage {
  type: 'play' | 'pause' | 'seek' | 'sync';
  timestamp: string; // ISO 8601
  position: number; // seconds
  roomId: string;
}

export interface SyncPlayStateUpdate {
  sessionId: string;
  /** Position in MILLISECONDS — the wire unit (phlix-syncplay SPEC.md:91).
   *  S293: converted from ui-internal seconds by
   *  `useSyncPlayStore.reportLocalPosition()` at the send boundary. */
  playbackPosition: number;
  playbackRate: number;
  serverTime: number;
  timestamp: string;
}

export interface SyncPlayPlaybackCommand {
  type: 'play' | 'pause' | 'seek' | 'sync';
  /** Position in MILLISECONDS — the wire unit (phlix-syncplay SPEC.md:91).
   *  Outbound commands are converted from ui-internal seconds by
   *  `useSyncPlayStore.sendCommand()` (S293); inbound commands carry the raw
   *  wire value. */
  position?: number;
  rate?: number;
  issuedBy: string; // userId
  issuedAt: string; // ISO 8601
}
