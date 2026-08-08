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
/** Drift threshold in seconds beyond which we mark out-of-sync and seek. */
export declare const SYNC_DRIFT_THRESHOLD_SECONDS = 2;
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
}, "error" | "members" | "currentSession" | "currentRoom" | "isLoading">, Pick<{
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
}, "joinRoom" | "leaveRoom" | "createAndJoinRoom" | "onRemoteStateUpdate" | "sendCommand" | "refreshState" | "refreshMembers" | "clearError" | "updateLocalPosition">>;
