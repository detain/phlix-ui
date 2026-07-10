/**
 * SyncPlay collaborative playback API client.
 *
 * Provides methods for creating/joining SyncPlay rooms, managing sessions,
 * and synchronizing playback state across multiple users.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { SyncPlayRoom, SyncPlaySession, SyncPlayUser, SyncPlayStateUpdate, SyncPlayPlaybackCommand } from '../types/syncplay';
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
export declare class SyncPlayApi {
    private client;
    constructor(apiBase: string);
    /**
     * Create a new SyncPlay room.
     * POST /api/v1/syncplay/rooms
     */
    createRoom(input: CreateRoomInput): Promise<SyncPlayRoom>;
    /**
     * Join an existing SyncPlay room.
     * POST /api/v1/syncplay/rooms/:id/join
     */
    joinRoom(roomId: string): Promise<SyncPlaySession>;
    /**
     * Leave the current SyncPlay room.
     * POST /api/v1/syncplay/rooms/:id/leave
     */
    leaveRoom(roomId: string): Promise<void>;
    /**
     * Send a playback state update to the session.
     * PUT /api/v1/syncplay/sessions/:id/state
     */
    sendStateUpdate(sessionId: string, state: SyncPlayStateUpdate): Promise<void>;
    /**
     * Send a playback command (play/pause/seek/sync).
     * POST /api/v1/syncplay/sessions/:id/command
     */
    sendCommand(sessionId: string, command: SyncPlayPlaybackCommand): Promise<void>;
    /**
     * Get the current session state.
     * GET /api/v1/syncplay/sessions/:id
     */
    getState(sessionId: string): Promise<SyncPlaySession>;
    /**
     * Get the list of members in a room.
     * GET /api/v1/syncplay/rooms/:id/members
     */
    getMembers(roomId: string): Promise<SyncPlayUser[]>;
    /**
     * List public rooms available to join.
     * GET /api/v1/syncplay/rooms/public
     */
    listPublicRooms(): Promise<SyncPlayRoom[]>;
}
export declare function getSyncPlayApi(apiBase: string): SyncPlayApi;
