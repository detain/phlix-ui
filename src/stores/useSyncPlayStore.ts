/**
 * SyncPlay collaborative playback state management.
 *
 * Manages the current SyncPlay room session, member list, and playback
 * synchronization state for the local user.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { SyncPlayRoom, SyncPlaySession, SyncPlayUser, SyncPlayPlaybackCommand } from '../types/syncplay';
import { getSyncPlayApi } from '../api/syncplay';

export const useSyncPlayStore = defineStore('phlix-syncplay', () => {
  // ---- state --------------------------------------------------------------
  const currentRoom = ref<SyncPlayRoom | null>(null);
  const currentSession = ref<SyncPlaySession | null>(null);
  const members = ref<SyncPlayUser[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  // ---- computed -----------------------------------------------------------
  const isInRoom = computed(() => currentSession.value !== null);

  const isSynced = computed(() => {
    if (!currentSession.value) return false;
    return currentSession.value.state === 'playing' || currentSession.value.state === 'paused';
  });

  const onlineMembers = computed(() => members.value.filter((m) => m.isOnline));

  const syncStatus = computed<'synced' | 'outOfSync' | 're-syncing'>(() => {
    if (!currentSession.value) return 'outOfSync';
    // TODO: Implement actual sync drift detection based on server time vs local time
    return isSynced.value ? 'synced' : 're-syncing';
  });

  // ---- actions -----------------------------------------------------------
  /**
   * Create a new SyncPlay room and join it.
   */
  async function createAndJoinRoom(
    apiBase: string,
    input: { name: string; description?: string; isPublic: boolean },
  ): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const api = getSyncPlayApi(apiBase);
      const room = await api.createRoom(input);
      currentRoom.value = room;
      const session = await api.joinRoom(room.id);
      currentSession.value = session;
      // Refresh members list
      members.value = session.activeUsers;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create room';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Join an existing SyncPlay room by ID.
   */
  async function joinRoom(apiBase: string, roomId: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const api = getSyncPlayApi(apiBase);
      // First fetch room info
      const membersList = await api.getMembers(roomId);
      members.value = membersList;
      // Then join the room
      const session = await api.joinRoom(roomId);
      currentSession.value = session;
      // Update room with session info
      if (currentRoom.value) {
        currentRoom.value = {
          ...currentRoom.value,
          currentSession: session,
        };
      }
      // Refresh members from session
      members.value = session.activeUsers;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to join room';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Leave the current SyncPlay room.
   */
  async function leaveRoom(apiBase: string): Promise<void> {
    if (!currentRoom.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      const api = getSyncPlayApi(apiBase);
      await api.leaveRoom(currentRoom.value.id);
      currentRoom.value = null;
      currentSession.value = null;
      members.value = [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to leave room';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Handle a remote state update from another user in the room.
   * Applies the playback command to synchronize playback.
   */
  function onRemoteStateUpdate(command: SyncPlayPlaybackCommand): void {
    if (!currentSession.value) return;

    // Update session state based on command
    switch (command.type) {
      case 'play':
        currentSession.value = {
          ...currentSession.value,
          state: 'playing',
        };
        break;
      case 'pause':
        currentSession.value = {
          ...currentSession.value,
          state: 'paused',
        };
        break;
      case 'seek':
        if (command.position !== undefined) {
          currentSession.value = {
            ...currentSession.value,
            playbackPosition: command.position,
          };
        }
        break;
      case 'sync':
        // Full state sync - update all fields
        if (command.position !== undefined) {
          currentSession.value = {
            ...currentSession.value,
            playbackPosition: command.position,
          };
        }
        if (command.rate !== undefined) {
          currentSession.value = {
            ...currentSession.value,
            playbackRate: command.rate,
          };
        }
        break;
    }

    // Update members list if included
    // (Server may send updated active users in some responses)
  }

  /**
   * Send a local playback command to the server.
   */
  async function sendCommand(
    apiBase: string,
    type: SyncPlayPlaybackCommand['type'],
    options?: { position?: number; rate?: number },
  ): Promise<void> {
    if (!currentSession.value) return;
    try {
      const api = getSyncPlayApi(apiBase);
      const command: SyncPlayPlaybackCommand = {
        type,
        position: options?.position,
        rate: options?.rate,
        issuedBy: currentSession.value.createdBy,
        issuedAt: new Date().toISOString(),
      };
      await api.sendCommand(currentSession.value.id, command);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to send command';
      throw e;
    }
  }

  /**
   * Refresh the current session state from the server.
   */
  async function refreshState(apiBase: string): Promise<void> {
    if (!currentSession.value) return;
    try {
      const api = getSyncPlayApi(apiBase);
      const session = await api.getState(currentSession.value.id);
      currentSession.value = session;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to refresh state';
      throw e;
    }
  }

  /**
   * Refresh the members list from the server.
   */
  async function refreshMembers(apiBase: string): Promise<void> {
    if (!currentRoom.value) return;
    try {
      const api = getSyncPlayApi(apiBase);
      const membersList = await api.getMembers(currentRoom.value.id);
      members.value = membersList;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to refresh members';
      throw e;
    }
  }

  /**
   * Clear any error state.
   */
  function clearError(): void {
    error.value = null;
  }

  return {
    // state
    currentRoom,
    currentSession,
    members,
    error,
    isLoading,
    // computed
    isInRoom,
    isSynced,
    onlineMembers,
    syncStatus,
    // actions
    createAndJoinRoom,
    joinRoom,
    leaveRoom,
    onRemoteStateUpdate,
    sendCommand,
    refreshState,
    refreshMembers,
    clearError,
  };
});
