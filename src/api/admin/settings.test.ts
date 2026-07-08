/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminSettingsApi } from './settings';
import type { ApiClient } from '../client';

function clientWith(over: Partial<Record<'get' | 'put', ReturnType<typeof vi.fn>>>): {
  client: ApiClient;
  get: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
} {
  const get = over.get ?? vi.fn();
  const put = over.put ?? vi.fn();
  return { client: { get, put } as unknown as ApiClient, get, put };
}

describe('AdminSettingsApi', () => {
  it('get() issues GET /api/v1/admin/settings and unwraps the data envelope', async () => {
    const settings = { 'hwaccel.enabled': true, 'tmdb.api_key': 'secret' };
    const { client, get } = clientWith({
      get: vi.fn().mockResolvedValue({
        data: {
          settings,
          overridden: ['hwaccel.enabled'],
          types: { 'hwaccel.enabled': 'bool', 'tmdb.api_key': 'string' },
        },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/settings');
    expect(res.settings).toEqual(settings);
    expect(res.overridden).toEqual(['hwaccel.enabled']);
    expect(res.types).toEqual({ 'hwaccel.enabled': 'bool', 'tmdb.api_key': 'string' });
  });

  it('get() degrades every field to empty when the payload is malformed', async () => {
    const { client } = clientWith({ get: vi.fn().mockResolvedValue({}) });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(res).toEqual({ settings: {}, overridden: [], types: {} });
  });

  it('get() degrades non-object/array fields defensively', async () => {
    const { client } = clientWith({
      get: vi.fn().mockResolvedValue({
        data: { settings: ['not', 'a', 'record'], overridden: 'nope', types: 42 },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(res).toEqual({ settings: {}, overridden: [], types: {} });
  });

  it('save() issues PUT with the { settings } body and unwraps data', async () => {
    const { client, put } = clientWith({
      put: vi.fn().mockResolvedValue({
        data: { settings: { 'hwaccel.enabled': false }, overridden: ['hwaccel.enabled'] },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.save({ 'hwaccel.enabled': false });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/settings', {
      settings: { 'hwaccel.enabled': false },
    });
    expect(res.settings).toEqual({ 'hwaccel.enabled': false });
    expect(res.overridden).toEqual(['hwaccel.enabled']);
  });

  it('save() degrades to empty on a malformed payload', async () => {
    const { client } = clientWith({ put: vi.fn().mockResolvedValue({ data: {} }) });
    const api = new AdminSettingsApi(client);
    const res = await api.save({ x: 1 });
    expect(res).toEqual({ settings: {}, overridden: [] });
  });

  it('save() propagates an ApiError thrown by the client', async () => {
    const { client } = clientWith({
      put: vi.fn().mockRejectedValue(new Error('Validation failed')),
    });
    const api = new AdminSettingsApi(client);
    await expect(api.save({ 'discovery.discovery_port': 0 })).rejects.toThrow('Validation failed');
  });

  it('get() propagates an ApiError thrown by the client', async () => {
    const { client } = clientWith({
      get: vi.fn().mockRejectedValue(new Error('Internal server error')),
    });
    const api = new AdminSettingsApi(client);
    await expect(api.get()).rejects.toThrow('Internal server error');
  });
});
