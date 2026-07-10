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
}, "syncStatus" | "isInRoom" | "isSynced" | "onlineMembers">, Pick<{
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
}, "joinRoom" | "leaveRoom" | "createAndJoinRoom" | "onRemoteStateUpdate" | "sendCommand" | "refreshState" | "refreshMembers" | "clearError">>;
