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
/**
 * One group as the server actually puts it on the wire.
 *
 * This is `GroupState::getState()` (phlix-server
 * `src/Session/SyncPlay/GroupState.php`) verbatim — snake_case, `members` as a
 * DICTIONARY keyed by member id — plus the reduced row shape
 * `SyncPlaySnapshotService::listGroups()` emits for the listing (`id`/`name`
 * instead of `group_id`/`group_name`, no `members` at all). Every field is
 * optional because the two shapes overlap only partially and the
 * `getRawSnapshot()` fallback path drops `members` entirely.
 *
 * ⚠ There is no `session` envelope and no camelCase anywhere in the SyncPlay
 * REST contract. Modelling the response as the UI's own `SyncPlaySession` is
 * what made `joinRoom()` read `res.session` (always `undefined`) — so the raw
 * shape is named honestly here and mapped by {@link groupToSession}.
 */
export interface RawSyncPlayGroup {
    group_id?: string;
    group_name?: string;
    /** Listing rows use the short spelling. */
    id?: string;
    name?: string;
    member_count?: number;
    /** Dict keyed by member id from `getState()`; `[]` from the raw-snapshot fallback. */
    members?: Record<string, RawSyncPlayMember> | RawSyncPlayMember[];
    host_id?: string | null;
    has_password?: boolean;
    current_media_id?: string | null;
    current_media_duration?: number;
    playback_position?: number;
    /** `playing` | `paused` | `buffering` | `stopped` (GroupState::STATE_*). */
    playback_state?: string;
    is_playing?: boolean;
    queue?: unknown[];
    /** Unix seconds. */
    created_at?: number;
    /** Unix seconds. */
    last_activity_at?: number;
}
/** One member inside {@link RawSyncPlayGroup.members}. */
export interface RawSyncPlayMember {
    id?: string;
    name?: string;
    is_host?: boolean;
    /** Unix seconds. */
    joined_at?: number;
}
/** `{ group }` — returned by create / get / join. */
export interface SyncPlayGroupResponse {
    group?: RawSyncPlayGroup;
}
/** `{ groups }` — returned by the group listing. */
export interface SyncPlayGroupsResponse {
    groups?: RawSyncPlayGroup[];
}
/**
 * Both views of the group a join returned.
 *
 * The join response is `{ success, group }` and that `group` is the FULL
 * `GroupState::getState()` payload, so it answers both "which room am I in"
 * (`SyncPlayRoom` — the name, the member count, the host) and "what is playing"
 * (`SyncPlaySession`). Returning only the session threw the room half away, and
 * every caller then had a null `currentRoom` after a successful join: leaving,
 * refreshing and the room-name header are all guarded on it.
 */
export interface JoinedGroup {
    room: SyncPlayRoom;
    session: SyncPlaySession;
}
/**
 * Normalize the server's `members` — a dict keyed by member id from
 * `GroupState::getState()`, or `[]` from the raw-snapshot fallback — into the
 * UI's `SyncPlayUser[]`.
 *
 * The server carries no per-member online flag (membership IS presence: a
 * disconnected member is removed from the group), so `isOnline` is `true` for
 * every returned member, and `profileId` has no server counterpart at all.
 */
export declare function normalizeMembers(raw: RawSyncPlayGroup | undefined): SyncPlayUser[];
/**
 * Map a raw server group onto the UI's `SyncPlayRoom`.
 *
 * `isPublic` is derived from `has_password` (the only public/private signal the
 * server emits, and only on the listing rows); a group state with no password
 * field reads as public, which matches the listing default.
 */
export declare function normalizeGroup(raw: RawSyncPlayGroup | undefined): SyncPlayRoom;
/**
 * Map a raw server group onto the UI's `SyncPlaySession`.
 *
 * The server has no separate session entity — the GROUP is the session — so the
 * session id IS the group id. `playbackRate` has no server field either; a
 * playing group is 1× and anything else is 0, which is what `driftAmount`'s
 * extrapolation needs (a paused group must not extrapolate).
 */
export declare function groupToSession(raw: RawSyncPlayGroup | undefined): SyncPlaySession;
/**
 * SyncPlay API client for collaborative playback sessions.
 *
 * Hits the server's SyncPlay endpoints — and ONLY these, which are the exact
 * five `SyncPlayController` routes registered in phlix-server
 * `src/Server/Core/Application.php`:
 *   - GET  /api/v1/syncplay/groups — list all groups
 *   - POST /api/v1/syncplay/groups — create a group
 *   - GET  /api/v1/syncplay/groups/{id} — get group state (INCLUDING members)
 *   - POST /api/v1/syncplay/groups/{id}/join — join a group
 *   - POST /api/v1/syncplay/groups/{id}/leave — leave a group
 *
 * ⚠ `GET /api/v1/syncplay/groups/{id}/members` does NOT exist and never did —
 * there is no controller action and no wildcard that could absorb it. Because
 * `ApiClient` throws on any non-ok response, calling it made every join fail
 * before it started (S276). The member list comes from the group state.
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
     *
     * The server answers `{ success, group }` (the post-join group state), NOT a
     * `session` envelope — the group IS the session.
     *
     * Returns BOTH views of that one payload; see {@link JoinedGroup}.
     */
    joinRoom(groupId: string): Promise<JoinedGroup>;
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
     *
     * ⚠ Reads the SAME served route as {@link getState}. There is no
     * `/groups/{id}/members` endpoint; the members dictionary is a field of the
     * group state (`GroupState::getState()['members']`), so that is where the
     * list is read from.
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
/** Callback invoked when the server sends a SyncPlay message over the WebSocket. */
type SyncPlayMessageHandler = (msg: {
    type: string;
    position?: number;
    roomId?: string;
}) => void;
/**
 * Open a WebSocket connection to the SyncPlay server for the given room.
 * If a connection is already open for a different room, it is closed first.
 *
 * This is the CALLER-INITIATED entry point — a user joining, re-joining or
 * switching rooms — and it therefore starts a fresh reconnect budget. The
 * automatic reconnect deliberately does not come through here; see
 * {@link connectSyncPlaySocket}.
 *
 * @param roomId - The SyncPlay room/group ID to connect to.
 * @param onMessage - Callback invoked for each server-to-client SyncPlay message.
 * @param memberId - The member ID for this client.
 * @param memberName - The member name for this client.
 */
export declare function openSyncPlayConnection(roomId: string, onMessage?: SyncPlayMessageHandler, memberId?: string, memberName?: string): void;
/**
 * Close the current SyncPlay WebSocket connection.
 */
export declare function closeSyncPlayConnection(): void;
/**
 * Send a playback state update over the SyncPlay WebSocket using @phlix/syncplay protocol.
 * No-op if the WebSocket is not connected.
 *
 * @param state - The current playback state to broadcast to other room members.
 */
export declare function sendSyncPlayStateUpdate(state: SyncPlayStateUpdate): void;
/**
 * Send a playback command (play/pause/seek/sync) over the SyncPlay WebSocket
 * using @phlix/syncplay protocol.
 * No-op if the WebSocket is not connected.
 *
 * @param command - The playback command to broadcast to other room members.
 */
export declare function sendSyncPlayCommand(command: SyncPlayPlaybackCommand): void;
export {};
