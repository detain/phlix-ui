/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminIntegrationsApi } from './integrations';
import type { ApiClient } from '../client';

function clientWith(over: Partial<Record<'get' | 'post' | 'put', ReturnType<typeof vi.fn>>>): {
  api: AdminIntegrationsApi;
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
} {
  const get = over.get ?? vi.fn();
  const post = over.post ?? vi.fn();
  const put = over.put ?? vi.fn();
  const client = { get, post, put, patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { api: new AdminIntegrationsApi(client), get, post, put };
}

describe('AdminIntegrationsApi — Arr sync', () => {
  it('GETs /api/v1/admin/sync/status', async () => {
    const get = vi.fn().mockResolvedValue({
      enabled: true,
      last_sync_at: '2026-05-28T00:00:00Z',
      last_sync_timestamp: 1716864000,
    });
    const { api } = clientWith({ get });
    const res = await api.getSyncStatus();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/sync/status');
    expect(res.enabled).toBe(true);
    expect(res.last_sync_timestamp).toBe(1716864000);
  });

  it('returns null sync timestamps when never synced', async () => {
    const get = vi.fn().mockResolvedValue({ enabled: false, last_sync_at: null, last_sync_timestamp: null });
    const { api } = clientWith({ get });
    const res = await api.getSyncStatus();
    expect(res.last_sync_at).toBeNull();
    expect(res.last_sync_timestamp).toBeNull();
    expect(res.enabled).toBe(false);
  });

  it('POSTs /api/v1/admin/sync/trash-guides', async () => {
    const post = vi.fn().mockResolvedValue({ success: true, message: 'Sync complete', data: {} });
    const { api } = clientWith({ post });
    const res = await api.triggerSync();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/sync/trash-guides');
    expect(res.success).toBe(true);
    expect(res.message).toBe('Sync complete');
  });

  it('propagates a rejection from triggerSync', async () => {
    const post = vi.fn().mockRejectedValue(new Error('Sync failed'));
    const { api } = clientWith({ post });
    await expect(api.triggerSync()).rejects.toThrow('Sync failed');
  });

  it('PUTs /api/v1/admin/sync/enable with { enabled: true }', async () => {
    const put = vi.fn().mockResolvedValue({ message: 'Sync enabled' });
    const { api } = clientWith({ put });
    const res = await api.setSyncEnabled(true);
    expect(put).toHaveBeenCalledWith('/api/v1/admin/sync/enable', { enabled: true });
    expect(res.message).toBe('Sync enabled');
  });

  it('PUTs /api/v1/admin/sync/enable with { enabled: false }', async () => {
    const put = vi.fn().mockResolvedValue({ message: 'Sync disabled' });
    const { api } = clientWith({ put });
    await api.setSyncEnabled(false);
    expect(put).toHaveBeenCalledWith('/api/v1/admin/sync/enable', { enabled: false });
  });
});

describe('AdminIntegrationsApi — auth providers', () => {
  it('GETs /api/v1/admin/auth-providers and unwraps { providers }', async () => {
    const get = vi.fn().mockResolvedValue({
      providers: [
        { name: 'oidc', supports_authentication: true },
        { name: 'ldap', supports_authentication: true },
      ],
    });
    const { api } = clientWith({ get });
    const res = await api.listProviders();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/auth-providers');
    expect(res).toHaveLength(2);
    expect(res[0]!.name).toBe('oidc');
  });

  it('degrades to [] when the providers payload is malformed', async () => {
    const get = vi.fn().mockResolvedValue({});
    const { api } = clientWith({ get });
    expect(await api.listProviders()).toEqual([]);
  });

  it('POSTs /api/v1/admin/auth-providers/{name}/enable', async () => {
    const post = vi.fn().mockResolvedValue({ name: 'oidc', enabled: true, message: 'OIDC enabled' });
    const { api } = clientWith({ post });
    const res = await api.enableProvider('oidc');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/enable');
    expect(res.name).toBe('oidc');
    expect(res.enabled).toBe(true);
  });

  it('encodes the provider name in the enable path', async () => {
    const post = vi.fn().mockResolvedValue({ name: 'a/b', enabled: true, message: 'ok' });
    const { api } = clientWith({ post });
    await api.enableProvider('a/b');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/a%2Fb/enable');
  });

  it('POSTs /api/v1/admin/auth-providers/{name}/disable', async () => {
    const post = vi.fn().mockResolvedValue({ name: 'ldap', enabled: false, message: 'LDAP disabled' });
    const { api } = clientWith({ post });
    const res = await api.disableProvider('ldap');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/ldap/disable');
    expect(res.name).toBe('ldap');
    expect(res.enabled).toBe(false);
  });

  it('encodes the provider name in the disable path', async () => {
    const post = vi.fn().mockResolvedValue({ name: 'a b', enabled: false, message: 'ok' });
    const { api } = clientWith({ post });
    await api.disableProvider('a b');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/a%20b/disable');
  });
});

describe('AdminIntegrationsApi — OIDC', () => {
  it('GETs /api/v1/admin/auth-providers/oidc/config', async () => {
    const get = vi.fn().mockResolvedValue({
      provider_url: 'https://idp.example.com',
      client_id: 'client-123',
      scopes: 'openid profile email',
      configured: true,
    });
    const { api } = clientWith({ get });
    const res = await api.getOidcSettings();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/config');
    expect(res.provider_url).toBe('https://idp.example.com');
    expect(res.configured).toBe(true);
  });

  it('POSTs /api/v1/admin/auth-providers/oidc/config with full body', async () => {
    const post = vi.fn().mockResolvedValue({ message: 'OIDC settings saved' });
    const { api } = clientWith({ post });
    const res = await api.saveOidcSettings({
      provider_url: 'https://idp.example.com',
      client_id: 'client-123',
      client_secret: 'secret-value',
      scopes: 'openid profile',
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/config', {
      provider_url: 'https://idp.example.com',
      client_id: 'client-123',
      client_secret: 'secret-value',
      scopes: 'openid profile',
    });
    expect(res.message).toBe('OIDC settings saved');
  });

  it('saveOidcSettings can omit client_secret', async () => {
    const post = vi.fn().mockResolvedValue({ message: 'Saved' });
    const { api } = clientWith({ post });
    await api.saveOidcSettings({
      provider_url: 'https://idp.example.com',
      client_id: 'client-123',
      scopes: 'openid',
    });
    const body = post.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('client_secret');
  });

  it('propagates a rejection from saveOidcSettings', async () => {
    const post = vi.fn().mockRejectedValue(new Error('Invalid provider URL'));
    const { api } = clientWith({ post });
    await expect(
      api.saveOidcSettings({ provider_url: '', client_id: '', scopes: '' }),
    ).rejects.toThrow('Invalid provider URL');
  });

  it('GETs /api/v1/admin/auth-providers/oidc/schema', async () => {
    const get = vi.fn().mockResolvedValue({ schema: { type: 'object', properties: {} } });
    const { api } = clientWith({ get });
    const res = await api.getOidcSchema();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/auth-providers/oidc/schema');
    expect(res.schema).toEqual({ type: 'object', properties: {} });
  });
});

describe('AdminIntegrationsApi — LDAP', () => {
  it('GETs /api/v1/admin/auth-providers/ldap/config', async () => {
    const get = vi.fn().mockResolvedValue({
      host: 'ldap.example.com',
      port: 636,
      ssl: true,
      base_dn: 'dc=example,dc=com',
      bind_dn: 'cn=admin,dc=example,dc=com',
      user_filter: '(uid=%s)',
      admin_group: 'cn=admins,dc=example,dc=com',
      configured: true,
    });
    const { api } = clientWith({ get });
    const res = await api.getLdapSettings();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/auth-providers/ldap/config');
    expect(res.host).toBe('ldap.example.com');
    expect(res.port).toBe(636);
    expect(res.ssl).toBe(true);
  });

  it('POSTs /api/v1/admin/auth-providers/ldap/config with bind_pw', async () => {
    const post = vi.fn().mockResolvedValue({ message: 'LDAP settings saved' });
    const { api } = clientWith({ post });
    const res = await api.saveLdapSettings({
      host: 'ldap.example.com',
      port: 636,
      ssl: true,
      base_dn: 'dc=example,dc=com',
      bind_dn: 'cn=admin,dc=example,dc=com',
      bind_pw: 'secret',
      user_filter: '(uid=%s)',
      admin_group: 'cn=admins,dc=example,dc=com',
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/ldap/config', expect.anything());
    const body = post.mock.calls[0]![1] as Record<string, unknown>;
    expect(body.host).toBe('ldap.example.com');
    expect(body.bind_pw).toBe('secret');
    expect(res.message).toBe('LDAP settings saved');
  });

  it('saveLdapSettings can omit bind_pw', async () => {
    const post = vi.fn().mockResolvedValue({ message: 'Saved' });
    const { api } = clientWith({ post });
    await api.saveLdapSettings({
      host: 'ldap.example.com',
      port: 389,
      ssl: false,
      base_dn: 'dc=example,dc=com',
      bind_dn: 'cn=admin,dc=example,dc=com',
      user_filter: '(uid=%s)',
      admin_group: '',
    });
    const body = post.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('bind_pw');
  });

  it('POSTs /api/v1/admin/auth-providers/ldap/test', async () => {
    const post = vi.fn().mockResolvedValue({ success: true, message: 'Connection OK' });
    const { api } = clientWith({ post });
    const res = await api.testLdapConnection({
      host: 'ldap.example.com',
      port: 636,
      ssl: true,
      base_dn: 'dc=example,dc=com',
      bind_dn: 'cn=admin,dc=example,dc=com',
      bind_pw: 'secret',
      user_filter: '(uid=%s)',
      admin_group: 'cn=admins,dc=example,dc=com',
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/auth-providers/ldap/test', expect.anything());
    expect(res.success).toBe(true);
    expect(res.message).toBe('Connection OK');
  });

  it('returns a failure result when the connection fails', async () => {
    const post = vi.fn().mockResolvedValue({ success: false, message: 'Connection refused' });
    const { api } = clientWith({ post });
    const res = await api.testLdapConnection({
      host: 'ldap.example.com',
      port: 636,
      ssl: true,
      base_dn: 'dc=example,dc=com',
      bind_dn: 'cn=admin,dc=example,dc=com',
      user_filter: '(uid=%s)',
      admin_group: '',
    });
    expect(res.success).toBe(false);
    expect(res.message).toBe('Connection refused');
  });

  it('propagates a rejection from testLdapConnection', async () => {
    const post = vi.fn().mockRejectedValue(new Error('Invalid LDAP configuration'));
    const { api } = clientWith({ post });
    await expect(
      api.testLdapConnection({
        host: '',
        port: 0,
        ssl: false,
        base_dn: '',
        bind_dn: '',
        user_filter: '',
        admin_group: '',
      }),
    ).rejects.toThrow('Invalid LDAP configuration');
  });

  it('GETs /api/v1/admin/auth-providers/ldap/schema', async () => {
    const get = vi.fn().mockResolvedValue({ schema: { type: 'object', properties: {} } });
    const { api } = clientWith({ get });
    const res = await api.getLdapSchema();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/auth-providers/ldap/schema');
    expect(res.schema).toEqual({ type: 'object', properties: {} });
  });
});
