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
    createdBy: string;
    createdAt: string;
    state: 'waiting' | 'playing' | 'paused' | 'ended';
    playbackPosition: number;
    playbackRate: number;
    serverTime: number;
    lastSync: string;
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
    lastSeen: string;
}
export interface SyncPlayRoom {
    id: string;
    name: string;
    description?: string;
    isPublic: boolean;
    currentSession?: SyncPlaySession;
    memberCount: number;
    roomId?: string;
    serverId?: string;
    hostUserId?: string;
    createdAt?: string;
    participants?: SyncPlayParticipant[];
}
export interface SyncPlayChatMessage {
    id: string;
    roomId: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
}
/**
 * A participant in a SyncPlay room, including sync state and latency.
 */
export interface SyncPlayParticipant {
    userId: string;
    username: string;
    role: SyncPlayRole;
    isSynced: boolean;
    lastPosition: number;
    latency: number;
}
/**
 * A SyncPlay wire protocol message for playback synchronization.
 * Carried over the signal channel (WebSocket / SSE) to synchronize
 * play / pause / seek / sync events across all participants.
 */
export interface SyncPlayMessage {
    type: 'play' | 'pause' | 'seek' | 'sync';
    timestamp: string;
    position: number;
    roomId: string;
}
export interface SyncPlayStateUpdate {
    sessionId: string;
    playbackPosition: number;
    playbackRate: number;
    serverTime: number;
    timestamp: string;
}
export interface SyncPlayPlaybackCommand {
    type: 'play' | 'pause' | 'seek' | 'sync';
    position?: number;
    rate?: number;
    issuedBy: string;
    issuedAt: string;
}
