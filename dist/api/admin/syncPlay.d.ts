/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/**
 * AdminSyncPlayApi (RA.14) — typed wrapper over the SyncPlay group-watching
 * endpoints (`/api/v1/syncplay/*`), ported 1:1 from the deleted React
 * `SyncPlayApi`. Lists groups, creates a group (optionally password-protected),
 * fetches full group state, and joins / leaves a group.
 *
 * Every method maps 1:1 to an endpoint shipped by `SyncPlayController` and
 * unwraps the single-key envelopes that controller returns (`{ groups }`,
 * `{ group }`, `{ success }`). The list unwrap is defensively guarded so a
 * malformed payload degrades to `[]` rather than throwing; non-2xx responses
 * surface `ApiError` via the shared client. Path id segments are
 * `encodeURIComponent`-escaped.
 */
/** A SyncPlay group summary as returned by the API. */
export interface SyncPlayGroup {
    /** Unique group identifier (format: sp_*). */
    id: string;
    /** Display name of the group. */
    name: string;
    /** Number of members currently in the group. */
    member_count: number;
    /** Whether the group requires a password to join. */
    has_password: boolean;
    /** Currently playing media ID, or null if nothing is playing. */
    current_media: string | null;
    /** Whether playback is currently active. */
    is_playing: boolean;
}
/** A member within a SyncPlay group. */
export interface SyncPlayMember {
    id: string;
    name: string;
    is_host: boolean;
    joined_at: number;
}
/** Playback state within a SyncPlay group. */
export interface SyncPlayPlaybackState {
    state: 'playing' | 'paused' | 'stopped';
    position: number;
    server_time: number;
}
/** A queued media item in a SyncPlay group. */
export interface SyncPlayQueueItem {
    media_id: string;
    media_info: Record<string, unknown>;
    added_by: string;
    added_at: number;
}
/** Full group state as returned by {@link AdminSyncPlayApi.getGroup}. */
export interface SyncPlayGroupState {
    id: string;
    name: string;
    host_id: string;
    has_password: boolean;
    members: SyncPlayMember[];
    playback_state: SyncPlayPlaybackState;
    queue: SyncPlayQueueItem[];
    created_at: number;
    last_activity: number;
}
/** Body accepted by {@link AdminSyncPlayApi.createGroup}. */
export interface CreateGroupInput {
    name: string;
    password?: string;
}
/** Body accepted by {@link AdminSyncPlayApi.joinGroup}. */
export interface JoinGroupInput {
    password?: string;
}
/** Typed client for the SyncPlay endpoints. */
export declare class AdminSyncPlayApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/syncplay/groups` → unwraps `{ groups }`. */
    listGroups(): Promise<SyncPlayGroup[]>;
    /** `POST /api/v1/syncplay/groups` → `{ success, group }`. */
    createGroup(input: CreateGroupInput): Promise<{
        success: boolean;
        group: SyncPlayGroupState;
    }>;
    /** `GET /api/v1/syncplay/groups/{id}` → `{ group }`. */
    getGroup(id: string): Promise<{
        group: SyncPlayGroupState;
    }>;
    /** `POST /api/v1/syncplay/groups/{id}/join` → `{ success, group }`. */
    joinGroup(id: string, input?: JoinGroupInput): Promise<{
        success: boolean;
        group: SyncPlayGroupState;
    }>;
    /** `POST /api/v1/syncplay/groups/{id}/leave` → `{ success, message? }`. */
    leaveGroup(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
}
