/**
 * SyncPlay REST API client tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SyncPlayApi, getSyncPlayApi, groupToSession, normalizeMembers } from './syncplay';
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
  // S288: this suite used to "accept" `isPublic` and `description` — fields with
  // NO server counterpart, whose only documented fate was being discarded on
  // arrival. A type that admits lies and a UI that tells them are the same bug
  // twice removed; the fields are gone, so the type now states exactly what the
  // create endpoint consumes.
  // M-UI-14: `password` USED to be rejected here ("the admin path's field,
  // never the modal's") — but `createGroup()` always read it; the rejection
  // pinned the UI's inability, not the server's contract. It is now a first
  // class field, and the two true-orphans stay rejected.
  it('is exactly { name, password?, memberName? } — no other key is assignable', () => {
    const input: CreateRoomInput = { name: 'Test Room' };
    expect(input).toEqual({ name: 'Test Room' });

    const withName: CreateRoomInput = { name: 'Test Room', memberName: 'Ada Lovelace' };
    expect(withName.memberName).toBe('Ada Lovelace');

    const withPassword: CreateRoomInput = { name: 'x', password: 'hunter2' };
    expect(withPassword.password).toBe('hunter2');

    // @ts-expect-error isPublic has no server counterpart (S288).
    const withPublic: CreateRoomInput = { name: 'x', isPublic: true };
    // @ts-expect-error description has no server counterpart (S288).
    const withDescription: CreateRoomInput = { name: 'x', description: 'A description' };
    expect([withPublic, withDescription].length).toBe(2);
  });
});

describe('SyncPlayApi — JoinRoomInput interface', () => {
  it('accepts an object with groupId', () => {
    const input: JoinRoomInput = {
      groupId: 'room-123',
    };
    expect(input.groupId).toBe('room-123');
  });

  // M-UI-14: the join gate field, matching the REST rail's plaintext arm.
  it('accepts the M-UI-14 password arm', () => {
    const input: JoinRoomInput = { groupId: 'room-123', password: 'hunter2' };
    expect(input.password).toBe('hunter2');
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

// CU-095 (review ui__fedev #1/#2/#3): the wire vocabulary belongs to
// @phlix/contracts (S415 golden-vector gate); this adapter maps it and NOTHING
// else. These pins are the tripwires for the three fiction classes the review
// convicted: the stale "mirroring contracts v0.3.6" header, the verbatim
// re-declared unions, and the fabricated fields the adapter hardcoded.
describe('CU-095 — contracts is the SSOT, view-model carries no wire phantoms', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const typesSrc = readFileSync(join(here, '../types/syncplay.ts'), 'utf8');
  const apiSrc = readFileSync(join(here, './syncplay.ts'), 'utf8');

  it('the types file no longer claims to mirror a stale contracts version', () => {
    expect(typesSrc).not.toMatch(/mirroring @phlix\/contracts/i);
    expect(typesSrc).not.toContain('v0.3.6');
  });

  it('role/permission vocabularies are re-exported from contracts, never re-declared', () => {
    expect(typesSrc).toMatch(/import type \{[^}]*SyncPlayRole[^}]*\} from '@phlix\/contracts'/);
    expect(typesSrc).toMatch(/export type \{[^}]*SyncPlayRole[^}]*\}/);
    // A literal union here would drift from the golden vectors silently.
    expect(typesSrc).not.toMatch(/export type SyncPlayRole = '/);
    expect(typesSrc).not.toMatch(/export type SyncPlayPermission = '/);
  });

  it('RawSyncPlayGroup derives its keys from the contracts group shapes', () => {
    expect(apiSrc).toMatch(/Omit<Partial<SyncPlayGroup & SyncPlayGroupListItem>/);
    // The hand-rolled vocabulary must not creep back in (fedev #2 convicted
    // the listing key `current_media` being missing from the local restatement).
    expect(apiSrc).not.toMatch(/group_id\?: string;\s*\n\s*group_name\?:/);
    expect(apiSrc).not.toMatch(/has_password\?: boolean;/);
  });

  it('groupToSession fabricates no serverId/permissions and normalizeMembers no profileId', () => {
    const session = groupToSession({ group_id: 'g1', playback_state: 'paused' });
    expect(session).not.toHaveProperty('serverId');
    expect(session).not.toHaveProperty('permissions');
    const members = normalizeMembers({ members: { u1: { id: 'u1', name: 'Ann', is_host: true, joined_at: 1 } } });
    expect(members[0]).not.toHaveProperty('profileId');
    expect(members[0]!.role).toBe('owner');
  });
});
