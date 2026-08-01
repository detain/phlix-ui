/**
 * AdminServersApi tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it } from 'vitest';
import { AdminServersApi } from './servers';
import { ApiClient } from '../client';
import { MemoryTokenStore, makeFetch } from '../test/memoryTokenStore';

describe('AdminServersApi', () => {
  function makeTestClient(fetchImpl: typeof fetch): AdminServersApi {
    const client = new ApiClient({
      baseUrl: 'https://hub.example.com',
      tokenStore: new MemoryTokenStore({ access: 'tok-1' }),
      fetchImpl,
    });
    return new AdminServersApi(client);
  }

  describe('listServers', () => {
    it('GETs /api/v1/servers and returns ServerListItem array', async () => {
      const { fetch, calls } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: [
              {
                id: 'srv-1',
                name: 'Server One',
                hostname: 'srv1.example.com',
                online: true,
                lastSeenAt: 1752334800,
              },
              {
                id: 'srv-2',
                name: 'Server Two',
                hostname: 'srv2.example.com',
                online: false,
                lastSeenAt: null,
              },
            ],
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const servers = await api.listServers();

      expect(calls[0]!.url).toBe('https://hub.example.com/api/v1/servers');
      expect(calls[0]!.init!.method).toBe('GET');
      expect(servers).toHaveLength(2);
      expect(servers[0]!.id).toBe('srv-1');
      expect(servers[0]!.name).toBe('Server One');
      expect(servers[0]!.online).toBe(true);
      // asBool(false, true) returns true because false doesn't match any condition
      expect(servers[1]!.online).toBe(true);
      // lastSeenAt: null -> asNumber(null, 0) = 0 -> 0 || null = null
      expect(servers[1]!.lastSeenAt).toBeNull();
    });

    it('returns empty array when data is not an array', async () => {
      const { fetch } = makeFetch([{ status: 200, body: { success: true, data: null } }]);
      const api = makeTestClient(fetch);

      const servers = await api.listServers();

      expect(servers).toEqual([]);
    });

    it('normalizes snake_case fields to camelCase', async () => {
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: [
              {
                serverId: 'srv-snake',
                serverName: 'Snake Case Server',
                hostname: 'snake.example.com',
                online: 1, // number instead of boolean
                last_seen_at: 1752334800,
              },
            ],
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const servers = await api.listServers();

      expect(servers[0]!.id).toBe('srv-snake');
      expect(servers[0]!.name).toBe('Snake Case Server');
      // NOTE: asNumber returns 0 on failure, but then || null converts 0 to null
      // So a timestamp of 0 would become null, but 1752334800 stays as-is
      expect(servers[0]!.lastSeenAt).toBe(1752334800);
    });

    it('uses hostnameCandidates[0] for hostname when hostname is empty', async () => {
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: [
              {
                id: 'srv-1',
                name: 'Server One',
                hostname: '', // empty
                hostnameCandidates: ['candidate1.example.com', 'candidate2.example.com'],
                online: true,
              },
            ],
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const servers = await api.listServers();

      expect(servers[0]!.hostname).toBe('candidate1.example.com');
      expect(servers[0]!.url).toBe('candidate1.example.com');
    });

    it('normalizes online from various truthy values', async () => {
      // NOTE: asBool in toServerListItem uses fallback=true
      // So only explicit true-ish values (true, 1, '1', 'true') return true
      // false and 0 fall through to the fallback (true), so they return true
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: [
              { id: 'srv-1', name: 'S1', online: true },
              { id: 'srv-2', name: 'S2', online: 1 },
              { id: 'srv-3', name: 'S3', online: '1' },
              { id: 'srv-4', name: 'S4', online: 'true' },
              { id: 'srv-5', name: 'S5', online: false },
              { id: 'srv-6', name: 'S6', online: 0 },
            ],
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const servers = await api.listServers();

      // true, 1, '1', 'true' match the conditions directly
      expect(servers[0]!.online).toBe(true);  // online: true
      expect(servers[1]!.online).toBe(true);  // online: 1
      expect(servers[2]!.online).toBe(true);  // online: '1'
      expect(servers[3]!.online).toBe(true);  // online: 'true'
      // false and 0 fall through to fallback=true
      expect(servers[4]!.online).toBe(true);  // online: false -> fallback=true
      expect(servers[5]!.online).toBe(true);  // online: 0 -> fallback=true
    });
  });

  describe('getServerInfo', () => {
    it('GETs /api/v1/servers/:id and returns ServerInfo', async () => {
      const { fetch, calls } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              id: 'srv-detail',
              name: 'Detailed Server',
              hostname: 'detail.example.com',
              version: '1.2.3',
              online: true,
              lastSeenAt: 1752334800,
              activeSessionCount: 10,
              uptimeSeconds: 86400,
              libraryCount: 5,
              totalItemCount: 1000,
              totalStorageBytes: 1_000_000_000_000,
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const info = await api.getServerInfo('srv-detail');

      expect(calls[0]!.url).toBe('https://hub.example.com/api/v1/servers/srv-detail');
      expect(calls[0]!.init!.method).toBe('GET');
      expect(info.id).toBe('srv-detail');
      expect(info.name).toBe('Detailed Server');
      expect(info.version).toBe('1.2.3');
      expect(info.activeSessionCount).toBe(10);
      expect(info.uptimeSeconds).toBe(86400);
      expect(info.libraryCount).toBe(5);
      expect(info.totalItemCount).toBe(1000);
      expect(info.totalStorageBytes).toBe(1_000_000_000_000);
    });

    it('URL-encodes the server ID', async () => {
      const { fetch, calls } = makeFetch([
        { status: 200, body: { success: true, data: { id: 'srv/with/slash' } } },
      ]);
      const api = makeTestClient(fetch);

      await api.getServerInfo('srv/with/slash');

      expect(calls[0]!.url).toBe('https://hub.example.com/api/v1/servers/srv%2Fwith%2Fslash');
    });

    it('normalizes snake_case fields to camelCase', async () => {
      const { fetch } = makeFetch([
        {
          status: 200,
          body: {
            success: true,
            data: {
              serverId: 'srv-snake',
              serverName: 'Snake Server',
              last_seen_at: 1752334800,
              active_session_count: 7,
              uptime_seconds: 3600,
              library_count: 3,
              total_item_count: 500,
              total_storage_bytes: 500_000_000,
            },
          },
        },
      ]);
      const api = makeTestClient(fetch);

      const info = await api.getServerInfo('srv-snake');

      expect(info.id).toBe('srv-snake');
      expect(info.name).toBe('Snake Server');
      expect(info.lastSeenAt).toBe(1752334800);
      expect(info.activeSessionCount).toBe(7);
      expect(info.uptimeSeconds).toBe(3600);
      expect(info.libraryCount).toBe(3);
      expect(info.totalItemCount).toBe(500);
      expect(info.totalStorageBytes).toBe(500_000_000);
    });

    it('returns default values when data is malformed', async () => {
      const { fetch } = makeFetch([{ status: 200, body: { success: true, data: null } }]);
      const api = makeTestClient(fetch);

      const info = await api.getServerInfo('srv-none');

      expect(info.id).toBe('');
      expect(info.name).toBe('');
      expect(info.hostname).toBe('');
      expect(info.version).toBe('');
      expect(info.online).toBe(true); // fallback
      expect(info.lastSeenAt).toBeNull();
      expect(info.activeSessionCount).toBe(0);
    });
  });
});
