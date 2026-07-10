/**
 * SyncPlay collaborative playback API client.
 *
 * Provides methods for creating/joining SyncPlay groups, managing sessions,
 * and synchronizing playback state across multiple users.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { SyncPlayRoom, SyncPlaySession, SyncPlayUser, SyncPlayStateUpdate, SyncPlayPlaybackCommand } from '../types/syncplay';
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
export declare class SyncPlayApi {
    private client;
    constructor(apiBase: string);
    /**
     * Create a new SyncPlay group.
     * POST /api/v1/syncplay/groups
     */
    createRoom(input: CreateRoomInput): Promise<SyncPlayRoom>;
    /**
     * Join an existing SyncPlay group.
     * POST /api/v1/syncplay/groups/:id/join
     */
    joinRoom(groupId: string): Promise<SyncPlaySession>;
    /**
     * Leave the current SyncPlay group.
     * POST /api/v1/syncplay/groups/:id/leave
     */
    leaveRoom(groupId: string): Promise<void>;
    /**
     * Get the current session state.
     * GET /api/v1/syncplay/groups/:id
     */
    getState(groupId: string): Promise<SyncPlaySession>;
    /**
     * Get the list of members in a group.
     * GET /api/v1/syncplay/groups/:id
     */
    getMembers(groupId: string): Promise<SyncPlayUser[]>;
    /**
     * List all available groups.
     * GET /api/v1/syncplay/groups
     */
    listGroups(): Promise<SyncPlayRoom[]>;
    /**
     * List public rooms available to join.
     * GET /api/v1/syncplay/groups
     * @deprecated Use listGroups() - the server does not distinguish public/private via endpoint
     */
    listPublicRooms(): Promise<SyncPlayRoom[]>;
    /**
     * Send a playback state update to the session.
     *
     * @deprecated State updates are sent via WebSocket using @phlix/syncplay SyncPlayClient.
     * This method is a no-op placeholder to maintain API compatibility.
     */
    sendStateUpdate(sessionId: string, state: SyncPlayStateUpdate): Promise<void>;
    /**
     * Send a playback command (play/pause/seek/sync).
     *
     * @deprecated Commands are sent via WebSocket using @phlix/syncplay SyncPlayClient.
     * This method is a no-op placeholder to maintain API compatibility.
     */
    sendCommand(sessionId: string, command: SyncPlayPlaybackCommand): Promise<void>;
}
export declare function getSyncPlayApi(apiBase: string): SyncPlayApi;
