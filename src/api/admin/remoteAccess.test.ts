/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminRemoteAccessApi } from './remoteAccess';
import type { ApiClient } from '../client';

function clientWith(over: Partial<Record<'get' | 'post', ReturnType<typeof vi.fn>>> = {}): {
  client: ApiClient;
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
} {
  const get = over.get ?? vi.fn(async () => ({}));
  const post = over.post ?? vi.fn(async () => ({ success: true }));
  const client = { get, post } as unknown as ApiClient;
  return { client, get, post };
}

describe('AdminRemoteAccessApi — hub pairing', () => {
  it('hubStatus() issues GET and returns the status', async () => {
    const { client, get } = clientWith({
      get: vi.fn(async () => ({ paired: true, serverId: 'srv-123', hubUrl: 'https://hub.example.com' })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.hubStatus();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/hub/status');
    expect(res.paired).toBe(true);
    expect(res.serverId).toBe('srv-123');
  });

  it('hubPair() POSTs the hubUrl + serverName body', async () => {
    const { client, post } = clientWith({
      post: vi.fn(async () => ({ success: true, claimCode: 'CODE123', claimId: 'id-456', serverId: '', hubUrl: 'h' })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.hubPair('https://hub.example.com', 'Test Server');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/pair', {
      hubUrl: 'https://hub.example.com',
      serverName: 'Test Server',
    });
    expect(res.claimCode).toBe('CODE123');
  });

  it('hubPoll() POSTs the claimId + hubUrl body', async () => {
    const { client, post } = clientWith({
      post: vi.fn(async () => ({ success: true, token: 'jwt-abc', serverId: 'srv-456' })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.hubPoll('claim-123', 'https://hub.example.com');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/poll', {
      claimId: 'claim-123',
      hubUrl: 'https://hub.example.com',
    });
    expect(res.token).toBe('jwt-abc');
  });

  it('hubComplete() POSTs the enrollment body', async () => {
    const { client, post } = clientWith();
    const api = new AdminRemoteAccessApi(client);
    const res = await api.hubComplete('jwt', 'https://hub/jwks.json', 'srv-123', 'https://hub');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/complete', {
      enrollmentJwt: 'jwt',
      hubJwksUrl: 'https://hub/jwks.json',
      serverId: 'srv-123',
      hubUrl: 'https://hub',
    });
    expect(res.success).toBe(true);
  });

  it('hubUnenroll() POSTs with no body', async () => {
    const { client, post } = clientWith();
    const api = new AdminRemoteAccessApi(client);
    const res = await api.hubUnenroll();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/unenroll');
    expect(res.success).toBe(true);
  });

  it('hubHeartbeat() POSTs and returns receivedAt', async () => {
    const { client, post } = clientWith({
      post: vi.fn(async () => ({ success: true, receivedAt: '2024-01-15T10:05:00+00:00' })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.hubHeartbeat();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/hub/heartbeat');
    expect(res.receivedAt).toBe('2024-01-15T10:05:00+00:00');
  });
});

describe('AdminRemoteAccessApi — subdomain', () => {
  it('subdomainStatus() issues GET', async () => {
    const { client, get } = clientWith({
      get: vi.fn(async () => ({ claimed: true, subdomain: 'myserver', fqdn: 'myserver.hub.example.com' })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.subdomainStatus();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/subdomain/status');
    expect(res.subdomain).toBe('myserver');
  });

  it('subdomainClaim() POSTs', async () => {
    const { client, post } = clientWith({
      post: vi.fn(async () => ({ success: true, subdomain: 'myserver', fqdn: 'myserver.hub.example.com' })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.subdomainClaim();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/subdomain/claim');
    expect(res.subdomain).toBe('myserver');
  });

  it('subdomainRelease() POSTs', async () => {
    const { client, post } = clientWith();
    const api = new AdminRemoteAccessApi(client);
    const res = await api.subdomainRelease();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/subdomain/release');
    expect(res.success).toBe(true);
  });
});

describe('AdminRemoteAccessApi — relay tunnel', () => {
  it('relayStatus() issues GET', async () => {
    const { client, get } = clientWith({
      get: vi.fn(async () => ({ connected: true, active: true })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.relayStatus();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/relay/status');
    expect(res.connected).toBe(true);
    expect(res.active).toBe(true);
  });

  it('relayEnable() POSTs', async () => {
    const { client, post } = clientWith();
    const api = new AdminRemoteAccessApi(client);
    await api.relayEnable();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/enable');
  });

  it('relayDisable() POSTs', async () => {
    const { client, post } = clientWith();
    const api = new AdminRemoteAccessApi(client);
    await api.relayDisable();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/disable');
  });

  it('relayPing() POSTs and returns latency', async () => {
    const { client, post } = clientWith({
      post: vi.fn(async () => ({ success: true, latencyMs: 42 })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.relayPing();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/relay/ping');
    expect(res.latencyMs).toBe(42);
  });
});

describe('AdminRemoteAccessApi — port forward', () => {
  it('portForwardStatus() issues GET', async () => {
    const { client, get } = clientWith({
      get: vi.fn(async () => ({ enabled: true, method: 'upnp', externalIp: '203.0.113.50', externalPort: 32400 })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.portForwardStatus();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/status');
    expect(res.enabled).toBe(true);
    expect(res.method).toBe('upnp');
  });

  it('portForwardEnable() POSTs', async () => {
    const { client, post } = clientWith();
    const api = new AdminRemoteAccessApi(client);
    await api.portForwardEnable();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/enable');
  });

  it('portForwardDisable() POSTs', async () => {
    const { client, post } = clientWith();
    const api = new AdminRemoteAccessApi(client);
    await api.portForwardDisable();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/disable');
  });

  it('portForwardCandidates() issues GET and unwraps candidates', async () => {
    const { client, get } = clientWith({
      get: vi.fn(async () => ({
        candidates: [{ hostname: 'http://192.168.1.100:32400', externalIp: '192.168.1.100', port: 32400 }],
      })),
    });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.portForwardCandidates();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/remote/portforward/candidates');
    expect(res.candidates).toHaveLength(1);
    expect(res.candidates[0].hostname).toBe('http://192.168.1.100:32400');
  });

  it('portForwardCandidates() degrades to [] on a malformed payload', async () => {
    const { client } = clientWith({ get: vi.fn(async () => ({})) });
    const api = new AdminRemoteAccessApi(client);
    const res = await api.portForwardCandidates();
    expect(res.candidates).toEqual([]);
  });
});
