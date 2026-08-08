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
  SyncPlayGroupResponse,
  SyncPlayGroupsResponse,
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

/**
 * The envelopes describe the SERVER's wire shape (snake_case `{ group }` /
 * `{ groups }`), NOT the UI's own types. The previous `SyncPlaySessionResponse`
 * / `SyncPlayMembersResponse` described a `{ session }` and a `{ members }`
 * envelope the server has never sent — a type that lied, next to a url
 * (`/groups/{id}/members`) that was never served (S276).
 *
 * Route-level and mapping-level behaviour is proved in `syncplay.routes.test.ts`
 * against a fake server that 404s any unregistered url.
 */
describe('SyncPlayApi — Response envelope interfaces', () => {
  it('SyncPlayGroupResponse carries the raw snake_case group state', () => {
    const response: SyncPlayGroupResponse = {
      group: {
        group_id: 'sp_abc123',
        group_name: 'Movie Night',
        member_count: 2,
        members: {
          m1: { id: 'm1', name: 'Alice', is_host: true, joined_at: 1_700_000_000 },
        },
        host_id: 'm1',
        playback_position: 123,
        playback_state: 'playing',
      },
    };
    expect(response.group!.group_id).toBe('sp_abc123');
    expect(response.group!.playback_state).toBe('playing');
  });

  it('SyncPlayGroupsResponse carries the reduced listing rows', () => {
    const response: SyncPlayGroupsResponse = {
      groups: [
        { id: 'sp_abc123', name: 'Movie Night', member_count: 2, has_password: false, is_playing: true },
      ],
    };
    expect(response.groups).toHaveLength(1);
    expect(response.groups![0]!.id).toBe('sp_abc123');
  });
});
