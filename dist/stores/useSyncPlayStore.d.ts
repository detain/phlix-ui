/**
 * SyncPlay collaborative playback state management.
 *
 * Manages the current SyncPlay room session, member list, and playback
 * synchronization state for the local user.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { SyncPlayRoom, SyncPlaySession, SyncPlayUser, SyncPlayPlaybackCommand } from '../types/syncplay';
import type { PendingPlayMediaCommand } from '../api/hubRelay';
/** Drift threshold in seconds beyond which we mark out-of-sync and seek. */
export declare const SYNC_DRIFT_THRESHOLD_SECONDS = 2;
/**
 * How often, in milliseconds, this client reports its playback position to the
 * group over the SyncPlay WebSocket.
 *
 * ## Why 5 s, and why a fixed interval at all
 *
 * S287: `sendSyncPlayStateUpdate()` existed, worked, and had **no production
 * caller** — this client never told the group where it was. The cadence was
 * chosen against what phlix-server actually does with the frame, not invented:
 *
 * 1. **The report is a PULL, not a PUSH.** `reportPosition()` emits
 *    `syncplay_playback_sync`. `SyncPlayManager::handlePlaybackSync()`
 *    (phlix-server `src/Session/SyncPlay/SyncPlayManager.php:988`) **ignores the
 *    position on the payload entirely** — it reads `$group->getPlaybackPosition()`
 *    and broadcasts THAT. So a report can never move the group's position and
 *    therefore cannot fight the drift correction the server already applies; it
 *    asks the group to re-state where it is. Reporting faster buys only a faster
 *    re-anchor, never a more accurate group position.
 * 2. **The cost is quadratic in group size.** That handler answers with
 *    `broadcastToGroup()`, not a direct reply, so one member's report costs N
 *    outbound frames in an N-member group. At the browser's `timeupdate` rate
 *    (~4 Hz) a five-person room would generate ~100 frames/s; at 5 s it is 1/s.
 * 3. **5 s is well inside the tolerance that defines "out of sync".**
 *    `SyncPlayManager::DEFAULT_POSITION_TOLERANCE` is 2000 ms and the UI's own
 *    {@link SYNC_DRIFT_THRESHOLD_SECONDS} is the same 2 s. Between anchors the
 *    UI does not guess: `driftAmount` extrapolates from `_lastDriftCaptureMs` at
 *    the known playback rate, and the only error that accumulates over a 5 s
 *    window is clock skew — orders of magnitude below 2 s. What the anchor
 *    prevents is the extrapolation window growing without bound, which is
 *    exactly what happened with no caller at all: `_lastDriftCaptureMs` was set
 *    at join and then only on a remote seek, so after ten minutes of playback
 *    `syncStatus` was extrapolating over ten minutes and meant nothing.
 *
 * Reporting is skipped while paused — `driftAmount` is defined as 0 while paused
 * or waiting, and the group's position does not advance either, so a paused
 * report is pure fan-out with no consumer.
 *
 * ⚠ This value is asserted by name AND by literal in
 * `useSyncPlayStore.position.test.ts`; a test that only advanced timers by this
 * constant would self-adjust to any change of it.
 */
export declare const POSITION_REPORT_INTERVAL_MS = 5000;
/**
 * The signed-in account's display name, or `undefined` when there is no usable
 * one.
 *
 * S285: this is the whole of "every SyncPlay member renders as Anonymous". The
 * name a member appears under is decided by whoever joins — `memberName` on the
 * REST join/create body (`SyncPlayController` defaults it to the literal
 * `'Guest'`/`'Host'`) and `member_name` on the WebSocket `GROUP_JOIN` frame
 * (@phlix/syncplay, defaulted to `'Anonymous'` by `api/syncplay.ts`). Nothing
 * ever supplied either, so every member in every room was a placeholder.
 *
 * `undefined` rather than a made-up string when signed out: a caller that sends
 * nothing gets the SERVER's default, which is the honest answer for an
 * unauthenticated joiner. Emitting our own placeholder here would look like a
 * real name on the wire.
 *
 * `/auth/me` is not guaranteed to carry a `name` — it is `AuthUser`'s optional
 * field — so `username` and then `email` back it up, in decreasing order of how
 * much the user would recognise it as themselves.
 */
export declare function resolveMemberName(): string | undefined;
export declare const useSyncPlayStore: import("pinia").StoreDefinition<"phlix-syncplay", Pick<{
    currentRoom: import("vue").Ref<{
        id: string;
        name: string;
        description?: string | undefined;
        isPublic: boolean;
        currentSession?: {
            id: string;
            roomId: string;
            serverId: string;
            createdBy: string;
            createdAt: string;
            state: "waiting" | "playing" | "paused" | "ended";
            currentMediaId: string | null;
            playbackPosition: number;
            playbackRate: number;
            serverTime: number;
            lastSync: string;
            activeUsers: {
                id: string;
                name: string;
                profileId: number;
                role: import("../types/syncplay").SyncPlayRole;
                isOnline: boolean;
                lastSeen: string;
            }[];
            roles: Record<string, import("../types/syncplay").SyncPlayRole>;
            permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
        } | undefined;
        memberCount: number;
        roomId?: string | undefined;
        serverId?: string | undefined;
        hostUserId?: string | undefined;
        createdAt?: string | undefined;
        participants?: {
            userId: string;
            username: string;
            role: import("../types/syncplay").SyncPlayRole;
            isSynced: boolean;
            lastPosition: number;
            latency: number;
        }[] | undefined;
    } | null, SyncPlayRoom | {
        id: string;
        name: string;
        description?: string | undefined;
        isPublic: boolean;
        currentSession?: {
            id: string;
            roomId: string;
            serverId: string;
            createdBy: string;
            createdAt: string;
            state: "waiting" | "playing" | "paused" | "ended";
            currentMediaId: string | null;
            playbackPosition: number;
            playbackRate: number;
            serverTime: number;
            lastSync: string;
            activeUsers: {
                id: string;
                name: string;
                profileId: number;
                role: import("../types/syncplay").SyncPlayRole;
                isOnline: boolean;
                lastSeen: string;
            }[];
            roles: Record<string, import("../types/syncplay").SyncPlayRole>;
            permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
        } | undefined;
        memberCount: number;
        roomId?: string | undefined;
        serverId?: string | undefined;
        hostUserId?: string | undefined;
        createdAt?: string | undefined;
        participants?: {
            userId: string;
            username: string;
            role: import("../types/syncplay").SyncPlayRole;
            isSynced: boolean;
            lastPosition: number;
            latency: number;
        }[] | undefined;
    } | null>;
    currentSession: import("vue").Ref<{
        id: string;
        roomId: string;
        serverId: string;
        createdBy: string;
        createdAt: string;
        state: "waiting" | "playing" | "paused" | "ended";
        currentMediaId: string | null;
        playbackPosition: number;
        playbackRate: number;
        serverTime: number;
        lastSync: string;
        activeUsers: {
            id: string;
            name: string;
            profileId: number;
            role: import("../types/syncplay").SyncPlayRole;
            isOnline: boolean;
            lastSeen: string;
        }[];
        roles: Record<string, import("../types/syncplay").SyncPlayRole>;
        permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
    } | null, SyncPlaySession | {
        id: string;
        roomId: string;
        serverId: string;
        createdBy: string;
        createdAt: string;
        state: "waiting" | "playing" | "paused" | "ended";
        currentMediaId: string | null;
        playbackPosition: number;
        playbackRate: number;
        serverTime: number;
        lastSync: string;
        activeUsers: {
            id: string;
            name: string;
            profileId: number;
            role: import("../types/syncplay").SyncPlayRole;
            isOnline: boolean;
            lastSeen: string;
        }[];
        roles: Record<string, import("../types/syncplay").SyncPlayRole>;
        permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
    } | null>;
    members: import("vue").Ref<{
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[], SyncPlayUser[] | {
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[]>;
    error: import("vue").Ref<string | null, string | null>;
    isLoading: import("vue").Ref<boolean, boolean>;
    localPlaybackPosition: import("vue").Ref<number, number>;
    pendingPlayMedia: import("vue").Ref<{
        type: "pending_command";
        command: "play_media";
        serverId: string;
        mediaId: string;
        title: string;
        issuedAt: number;
        source: string;
    } | null, PendingPlayMediaCommand | {
        type: "pending_command";
        command: "play_media";
        serverId: string;
        mediaId: string;
        title: string;
        issuedAt: number;
        source: string;
    } | null>;
    isInRoom: import("vue").ComputedRef<boolean>;
    isSynced: import("vue").ComputedRef<boolean>;
    onlineMembers: import("vue").ComputedRef<{
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[]>;
    syncStatus: import("vue").ComputedRef<"synced" | "outOfSync" | "re-syncing">;
    driftAmount: import("vue").ComputedRef<number>;
    createAndJoinRoom: (apiBase: string, input: {
        name: string;
        description?: string;
        isPublic: boolean;
    }) => Promise<void>;
    joinRoom: (apiBase: string, roomId: string) => Promise<void>;
    leaveRoom: (apiBase: string) => Promise<void>;
    onRemoteStateUpdate: (command: SyncPlayPlaybackCommand) => void;
    sendCommand: (_apiBase: string, type: SyncPlayPlaybackCommand["type"], options?: {
        position?: number;
        rate?: number;
    }) => void;
    refreshState: (apiBase: string) => Promise<void>;
    refreshMembers: (apiBase: string) => Promise<void>;
    clearError: () => void;
    updateLocalPosition: (position: number) => void;
    applyPendingPlayMedia: (command: PendingPlayMediaCommand) => void;
    consumePendingPlayMedia: () => void;
}, "error" | "members" | "currentSession" | "currentRoom" | "isLoading" | "localPlaybackPosition" | "pendingPlayMedia">, Pick<{
    currentRoom: import("vue").Ref<{
        id: string;
        name: string;
        description?: string | undefined;
        isPublic: boolean;
        currentSession?: {
            id: string;
            roomId: string;
            serverId: string;
            createdBy: string;
            createdAt: string;
            state: "waiting" | "playing" | "paused" | "ended";
            currentMediaId: string | null;
            playbackPosition: number;
            playbackRate: number;
            serverTime: number;
            lastSync: string;
            activeUsers: {
                id: string;
                name: string;
                profileId: number;
                role: import("../types/syncplay").SyncPlayRole;
                isOnline: boolean;
                lastSeen: string;
            }[];
            roles: Record<string, import("../types/syncplay").SyncPlayRole>;
            permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
        } | undefined;
        memberCount: number;
        roomId?: string | undefined;
        serverId?: string | undefined;
        hostUserId?: string | undefined;
        createdAt?: string | undefined;
        participants?: {
            userId: string;
            username: string;
            role: import("../types/syncplay").SyncPlayRole;
            isSynced: boolean;
            lastPosition: number;
            latency: number;
        }[] | undefined;
    } | null, SyncPlayRoom | {
        id: string;
        name: string;
        description?: string | undefined;
        isPublic: boolean;
        currentSession?: {
            id: string;
            roomId: string;
            serverId: string;
            createdBy: string;
            createdAt: string;
            state: "waiting" | "playing" | "paused" | "ended";
            currentMediaId: string | null;
            playbackPosition: number;
            playbackRate: number;
            serverTime: number;
            lastSync: string;
            activeUsers: {
                id: string;
                name: string;
                profileId: number;
                role: import("../types/syncplay").SyncPlayRole;
                isOnline: boolean;
                lastSeen: string;
            }[];
            roles: Record<string, import("../types/syncplay").SyncPlayRole>;
            permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
        } | undefined;
        memberCount: number;
        roomId?: string | undefined;
        serverId?: string | undefined;
        hostUserId?: string | undefined;
        createdAt?: string | undefined;
        participants?: {
            userId: string;
            username: string;
            role: import("../types/syncplay").SyncPlayRole;
            isSynced: boolean;
            lastPosition: number;
            latency: number;
        }[] | undefined;
    } | null>;
    currentSession: import("vue").Ref<{
        id: string;
        roomId: string;
        serverId: string;
        createdBy: string;
        createdAt: string;
        state: "waiting" | "playing" | "paused" | "ended";
        currentMediaId: string | null;
        playbackPosition: number;
        playbackRate: number;
        serverTime: number;
        lastSync: string;
        activeUsers: {
            id: string;
            name: string;
            profileId: number;
            role: import("../types/syncplay").SyncPlayRole;
            isOnline: boolean;
            lastSeen: string;
        }[];
        roles: Record<string, import("../types/syncplay").SyncPlayRole>;
        permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
    } | null, SyncPlaySession | {
        id: string;
        roomId: string;
        serverId: string;
        createdBy: string;
        createdAt: string;
        state: "waiting" | "playing" | "paused" | "ended";
        currentMediaId: string | null;
        playbackPosition: number;
        playbackRate: number;
        serverTime: number;
        lastSync: string;
        activeUsers: {
            id: string;
            name: string;
            profileId: number;
            role: import("../types/syncplay").SyncPlayRole;
            isOnline: boolean;
            lastSeen: string;
        }[];
        roles: Record<string, import("../types/syncplay").SyncPlayRole>;
        permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
    } | null>;
    members: import("vue").Ref<{
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[], SyncPlayUser[] | {
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[]>;
    error: import("vue").Ref<string | null, string | null>;
    isLoading: import("vue").Ref<boolean, boolean>;
    localPlaybackPosition: import("vue").Ref<number, number>;
    pendingPlayMedia: import("vue").Ref<{
        type: "pending_command";
        command: "play_media";
        serverId: string;
        mediaId: string;
        title: string;
        issuedAt: number;
        source: string;
    } | null, PendingPlayMediaCommand | {
        type: "pending_command";
        command: "play_media";
        serverId: string;
        mediaId: string;
        title: string;
        issuedAt: number;
        source: string;
    } | null>;
    isInRoom: import("vue").ComputedRef<boolean>;
    isSynced: import("vue").ComputedRef<boolean>;
    onlineMembers: import("vue").ComputedRef<{
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[]>;
    syncStatus: import("vue").ComputedRef<"synced" | "outOfSync" | "re-syncing">;
    driftAmount: import("vue").ComputedRef<number>;
    createAndJoinRoom: (apiBase: string, input: {
        name: string;
        description?: string;
        isPublic: boolean;
    }) => Promise<void>;
    joinRoom: (apiBase: string, roomId: string) => Promise<void>;
    leaveRoom: (apiBase: string) => Promise<void>;
    onRemoteStateUpdate: (command: SyncPlayPlaybackCommand) => void;
    sendCommand: (_apiBase: string, type: SyncPlayPlaybackCommand["type"], options?: {
        position?: number;
        rate?: number;
    }) => void;
    refreshState: (apiBase: string) => Promise<void>;
    refreshMembers: (apiBase: string) => Promise<void>;
    clearError: () => void;
    updateLocalPosition: (position: number) => void;
    applyPendingPlayMedia: (command: PendingPlayMediaCommand) => void;
    consumePendingPlayMedia: () => void;
}, "syncStatus" | "isInRoom" | "isSynced" | "onlineMembers" | "driftAmount">, Pick<{
    currentRoom: import("vue").Ref<{
        id: string;
        name: string;
        description?: string | undefined;
        isPublic: boolean;
        currentSession?: {
            id: string;
            roomId: string;
            serverId: string;
            createdBy: string;
            createdAt: string;
            state: "waiting" | "playing" | "paused" | "ended";
            currentMediaId: string | null;
            playbackPosition: number;
            playbackRate: number;
            serverTime: number;
            lastSync: string;
            activeUsers: {
                id: string;
                name: string;
                profileId: number;
                role: import("../types/syncplay").SyncPlayRole;
                isOnline: boolean;
                lastSeen: string;
            }[];
            roles: Record<string, import("../types/syncplay").SyncPlayRole>;
            permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
        } | undefined;
        memberCount: number;
        roomId?: string | undefined;
        serverId?: string | undefined;
        hostUserId?: string | undefined;
        createdAt?: string | undefined;
        participants?: {
            userId: string;
            username: string;
            role: import("../types/syncplay").SyncPlayRole;
            isSynced: boolean;
            lastPosition: number;
            latency: number;
        }[] | undefined;
    } | null, SyncPlayRoom | {
        id: string;
        name: string;
        description?: string | undefined;
        isPublic: boolean;
        currentSession?: {
            id: string;
            roomId: string;
            serverId: string;
            createdBy: string;
            createdAt: string;
            state: "waiting" | "playing" | "paused" | "ended";
            currentMediaId: string | null;
            playbackPosition: number;
            playbackRate: number;
            serverTime: number;
            lastSync: string;
            activeUsers: {
                id: string;
                name: string;
                profileId: number;
                role: import("../types/syncplay").SyncPlayRole;
                isOnline: boolean;
                lastSeen: string;
            }[];
            roles: Record<string, import("../types/syncplay").SyncPlayRole>;
            permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
        } | undefined;
        memberCount: number;
        roomId?: string | undefined;
        serverId?: string | undefined;
        hostUserId?: string | undefined;
        createdAt?: string | undefined;
        participants?: {
            userId: string;
            username: string;
            role: import("../types/syncplay").SyncPlayRole;
            isSynced: boolean;
            lastPosition: number;
            latency: number;
        }[] | undefined;
    } | null>;
    currentSession: import("vue").Ref<{
        id: string;
        roomId: string;
        serverId: string;
        createdBy: string;
        createdAt: string;
        state: "waiting" | "playing" | "paused" | "ended";
        currentMediaId: string | null;
        playbackPosition: number;
        playbackRate: number;
        serverTime: number;
        lastSync: string;
        activeUsers: {
            id: string;
            name: string;
            profileId: number;
            role: import("../types/syncplay").SyncPlayRole;
            isOnline: boolean;
            lastSeen: string;
        }[];
        roles: Record<string, import("../types/syncplay").SyncPlayRole>;
        permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
    } | null, SyncPlaySession | {
        id: string;
        roomId: string;
        serverId: string;
        createdBy: string;
        createdAt: string;
        state: "waiting" | "playing" | "paused" | "ended";
        currentMediaId: string | null;
        playbackPosition: number;
        playbackRate: number;
        serverTime: number;
        lastSync: string;
        activeUsers: {
            id: string;
            name: string;
            profileId: number;
            role: import("../types/syncplay").SyncPlayRole;
            isOnline: boolean;
            lastSeen: string;
        }[];
        roles: Record<string, import("../types/syncplay").SyncPlayRole>;
        permissions: Record<string, import("../types/syncplay").SyncPlayPermission[]>;
    } | null>;
    members: import("vue").Ref<{
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[], SyncPlayUser[] | {
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[]>;
    error: import("vue").Ref<string | null, string | null>;
    isLoading: import("vue").Ref<boolean, boolean>;
    localPlaybackPosition: import("vue").Ref<number, number>;
    pendingPlayMedia: import("vue").Ref<{
        type: "pending_command";
        command: "play_media";
        serverId: string;
        mediaId: string;
        title: string;
        issuedAt: number;
        source: string;
    } | null, PendingPlayMediaCommand | {
        type: "pending_command";
        command: "play_media";
        serverId: string;
        mediaId: string;
        title: string;
        issuedAt: number;
        source: string;
    } | null>;
    isInRoom: import("vue").ComputedRef<boolean>;
    isSynced: import("vue").ComputedRef<boolean>;
    onlineMembers: import("vue").ComputedRef<{
        id: string;
        name: string;
        profileId: number;
        role: import("../types/syncplay").SyncPlayRole;
        isOnline: boolean;
        lastSeen: string;
    }[]>;
    syncStatus: import("vue").ComputedRef<"synced" | "outOfSync" | "re-syncing">;
    driftAmount: import("vue").ComputedRef<number>;
    createAndJoinRoom: (apiBase: string, input: {
        name: string;
        description?: string;
        isPublic: boolean;
    }) => Promise<void>;
    joinRoom: (apiBase: string, roomId: string) => Promise<void>;
    leaveRoom: (apiBase: string) => Promise<void>;
    onRemoteStateUpdate: (command: SyncPlayPlaybackCommand) => void;
    sendCommand: (_apiBase: string, type: SyncPlayPlaybackCommand["type"], options?: {
        position?: number;
        rate?: number;
    }) => void;
    refreshState: (apiBase: string) => Promise<void>;
    refreshMembers: (apiBase: string) => Promise<void>;
    clearError: () => void;
    updateLocalPosition: (position: number) => void;
    applyPendingPlayMedia: (command: PendingPlayMediaCommand) => void;
    consumePendingPlayMedia: () => void;
}, "joinRoom" | "leaveRoom" | "createAndJoinRoom" | "onRemoteStateUpdate" | "sendCommand" | "refreshState" | "refreshMembers" | "clearError" | "updateLocalPosition" | "applyPendingPlayMedia" | "consumePendingPlayMedia">>;
