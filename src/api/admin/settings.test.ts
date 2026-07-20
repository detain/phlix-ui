/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminSettingsApi } from './settings';
import type { SettingMeta } from './settings';
import type { ApiClient } from '../client';

/** One `meta` entry in the exact 13-field shape the server emits. */
const TMDB_META: SettingMeta = {
  label: 'TMDb API key',
  helpText: 'Required for posters, cast and ratings.',
  helpLinks: [{ text: 'TMDb API', url: 'https://developer.themoviedb.org/docs' }],
  tier: 'standard',
  group: 'metadata',
  enum: null,
  enumLabels: null,
  optionHelp: null,
  minimum: null,
  maximum: null,
  default: '',
  secret: true,
  restart: false,
};

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
          meta: { 'tmdb.api_key': TMDB_META },
        },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/settings');
    expect(res.settings).toEqual(settings);
    expect(res.overridden).toEqual(['hwaccel.enabled']);
    expect(res.types).toEqual({ 'hwaccel.enabled': 'bool', 'tmdb.api_key': 'string' });
    expect(res.meta).toEqual({ 'tmdb.api_key': TMDB_META });
  });

  it('get() passes the full 13-field meta block through untouched', async () => {
    const { client } = clientWith({
      get: vi.fn().mockResolvedValue({ data: { meta: { 'tmdb.api_key': TMDB_META } } }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(Object.keys(res.meta['tmdb.api_key']!).sort()).toEqual(
      [
        'default',
        'enum',
        'enumLabels',
        'group',
        'helpLinks',
        'helpText',
        'label',
        'maximum',
        'minimum',
        'optionHelp',
        'restart',
        'secret',
        'tier',
      ].sort(),
    );
    expect(res.meta['tmdb.api_key']!.secret).toBe(true);
    expect(res.meta['tmdb.api_key']!.tier).toBe('standard');
  });

  it('get() degrades every field to empty when the payload is malformed', async () => {
    const { client } = clientWith({ get: vi.fn().mockResolvedValue({}) });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(res).toEqual({ settings: {}, overridden: [], types: {}, meta: {}, secretStatus: {} });
  });

  it('get() degrades non-object/array fields defensively', async () => {
    const { client } = clientWith({
      get: vi.fn().mockResolvedValue({
        data: { settings: ['not', 'a', 'record'], overridden: 'nope', types: 42, meta: 'nope' },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(res).toEqual({ settings: {}, overridden: [], types: {}, meta: {}, secretStatus: {} });
  });

  it('get() degrades a MISSING meta block to {} (older server, no metadata)', async () => {
    const { client } = clientWith({
      get: vi.fn().mockResolvedValue({
        data: { settings: { 'tmdb.api_key': 'k' }, overridden: [], types: { 'tmdb.api_key': 'string' } },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(res.meta).toEqual({});
    expect(res.types).toEqual({ 'tmdb.api_key': 'string' });
  });

  it('get() surfaces the secretStatus map keyed by secret key', async () => {
    const { client } = clientWith({
      get: vi.fn().mockResolvedValue({
        data: {
          // What the server really sends: the mask, never the value.
          settings: { 'tmdb.api_key': '***', 'trakt.client_secret': '***' },
          overridden: [],
          types: { 'tmdb.api_key': 'string', 'trakt.client_secret': 'string' },
          meta: { 'tmdb.api_key': TMDB_META },
          secretStatus: {
            'tmdb.api_key': { set: true, length: 32 },
            'trakt.client_secret': { set: false, length: 0 },
          },
        },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(res.secretStatus).toEqual({
      'tmdb.api_key': { set: true, length: 32 },
      'trakt.client_secret': { set: false, length: 0 },
    });
  });

  it('get() degrades a MISSING secretStatus to {} (older server)', async () => {
    const { client } = clientWith({
      get: vi.fn().mockResolvedValue({
        data: { settings: { 'tmdb.api_key': '***' }, overridden: [], types: {}, meta: {} },
      }),
    });
    const api = new AdminSettingsApi(client);
    expect((await api.get()).secretStatus).toEqual({});
  });

  it('get() treats a malformed secretStatus entry as NOT configured', async () => {
    // Claiming "Configured" off a garbage payload would be the dangerous
    // failure: an admin could believe a credential is stored when it is not.
    const { client } = clientWith({
      get: vi.fn().mockResolvedValue({
        data: {
          settings: {},
          overridden: [],
          types: {},
          meta: {},
          secretStatus: {
            'a.key': { set: 'yes', length: '32' },
            'b.key': 'not-a-record',
            'c.key': { set: true, length: Number.NaN },
            'd.key': { set: true },
          },
        },
      }),
    });
    const api = new AdminSettingsApi(client);
    const res = await api.get();
    expect(res.secretStatus).toEqual({
      'a.key': { set: false, length: 0 },
      'c.key': { set: true, length: 0 },
      'd.key': { set: true, length: 0 },
    });
    expect(res.secretStatus).not.toHaveProperty('b.key');
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
