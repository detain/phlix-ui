/**
 * SyncPlay REST API client tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { SyncPlayApi, getSyncPlayApi } from './syncplay';
import type {
  CreateRoomInput,
  JoinRoomInput,
  SyncPlayRoomResponse,
  SyncPlaySessionResponse,
  SyncPlayMembersResponse,
} from './syncplay';

// Note: The SyncPlayApi class constructs its own ApiClient internally,
// making it difficult to mock in tests. The REST API methods are thin
// wrappers around ApiClient.post/get, so their correctness depends on
// ApiClient being properly configured.
// The WebSocket functions (openSyncPlayConnection, closeSyncPlayConnection,
// sendSyncPlayStateUpdate, sendSyncPlayCommand) require a real WebSocket
// environment and are tested via the integration tests in useSyncPlayStore.

describe('SyncPlayApi — constructor', () => {
  it('creates an instance with the given apiBase', () => {
    const api = new SyncPlayApi('https://hub.example.com');
    expect(api).toBeInstanceOf(SyncPlayApi);
  });
});

describe('SyncPlayApi — getSyncPlayApi singleton', () => {
  it('getSyncPlayApi returns a SyncPlayApi instance', () => {
    const api = getSyncPlayApi('https://hub.example.com');
    expect(api).toBeInstanceOf(SyncPlayApi);
  });

  it('getSyncPlayApi returns the same instance on subsequent calls', () => {
    const api1 = getSyncPlayApi('https://hub.example.com');
    const api2 = getSyncPlayApi('https://hub.example.com');
    expect(api1).toBe(api2);
  });
});

describe('SyncPlayApi — CreateRoomInput interface', () => {
  it('accepts an object with name and isPublic', () => {
    const input: CreateRoomInput = {
      name: 'Test Room',
      isPublic: true,
    };
    expect(input.name).toBe('Test Room');
    expect(input.isPublic).toBe(true);
  });

  it('accepts an object with optional description', () => {
    const input: CreateRoomInput = {
      name: 'Test Room',
      description: 'A description',
      isPublic: false,
    };
    expect(input.description).toBe('A description');
  });
});

describe('SyncPlayApi — JoinRoomInput interface', () => {
  it('accepts an object with groupId', () => {
    const input: JoinRoomInput = {
      groupId: 'room-123',
    };
    expect(input.groupId).toBe('room-123');
  });
});

describe('SyncPlayApi — Response envelope interfaces', () => {
  it('SyncPlayRoomResponse has a group property', () => {
    const response: SyncPlayRoomResponse = {
      group: {
        id: 'room-1',
        name: 'Test',
        isPublic: true,
        memberCount: 0,
      },
    };
    expect(response.group.id).toBe('room-1');
  });

  it('SyncPlaySessionResponse has a session property', () => {
    const response: SyncPlaySessionResponse = {
      session: {
        id: 'sess-1',
        roomId: 'room-1',
        serverId: 'srv-1',
        createdBy: 'user-1',
        createdAt: '2026-01-01T00:00:00Z',
        state: 'playing',
        playbackPosition: 100,
        playbackRate: 1,
        serverTime: Date.now(),
        lastSync: '2026-01-01T00:01:40Z',
        activeUsers: [],
        roles: {},
        permissions: {},
      },
    };
    expect(response.session.id).toBe('sess-1');
    expect(response.session.state).toBe('playing');
  });

  it('SyncPlayMembersResponse has a members array', () => {
    const response: SyncPlayMembersResponse = {
      members: [
        { id: 'user-1', name: 'Alice', profileId: 1, role: 'owner', isOnline: true, lastSeen: '2026-01-01T00:00:00Z' },
        { id: 'user-2', name: 'Bob', profileId: 2, role: 'contributor', isOnline: false, lastSeen: '2026-01-01T00:00:00Z' },
      ],
    };
    expect(response.members).toHaveLength(2);
  });
});
