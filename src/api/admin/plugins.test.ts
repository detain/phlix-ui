/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  AdminPluginsApi,
  PLUGIN_SECRET_MASK,
  pluginErrorCode,
  pluginValidationErrors,
} from './plugins';
import { ApiError } from '../client';
import type { ApiClient } from '../client';

const samplePlugin = {
  id: 'anidb',
  name: 'anidb',
  version: '1.2.0',
  type: 'metadata',
  enabled: true,
  installed_at: '2026-06-12T00:00:00Z',
};

const sampleDetail = {
  ...samplePlugin,
  settings_schema: {
    api_key: { type: 'string', required: true, secret: true, label: 'API Key', description: 'Your AniDB key' },
    page_size: { type: 'int', required: false, secret: false, label: 'Page size', description: '', default: 25 },
    enabled_extra: { type: 'bool', required: false, secret: false, label: 'Extras', description: '' },
  },
  settings: { api_key: PLUGIN_SECRET_MASK, page_size: 25, enabled_extra: false },
};

function makeApi(handlers: {
  get?: (endpoint: string, params?: Record<string, string>) => unknown;
  post?: (endpoint: string, data?: unknown) => unknown;
  put?: (endpoint: string, data?: unknown) => unknown;
  del?: (endpoint: string) => unknown;
} = {}) {
  const get = vi.fn(async (endpoint: string, params?: Record<string, string>) =>
    handlers.get ? handlers.get(endpoint, params) : {},
  );
  const post = vi.fn(async (endpoint: string, data?: unknown) =>
    handlers.post ? handlers.post(endpoint, data) : {},
  );
  const put = vi.fn(async (endpoint: string, data?: unknown) =>
    handlers.put ? handlers.put(endpoint, data) : {},
  );
  const del = vi.fn(async (endpoint: string) => (handlers.del ? handlers.del(endpoint) : {}));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { api: new AdminPluginsApi(client), get, post, put, del };
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('AdminPluginsApi — list / get', () => {
  it('GET /plugins unwraps { plugins } and defends to []', async () => {
    const { api, get } = makeApi({ get: () => ({ plugins: [samplePlugin] }) });
    const plugins = await api.list();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins');
    expect(plugins).toHaveLength(1);
    expect(plugins[0].name).toBe('anidb');
    expect(plugins[0].enabled).toBe(true);
  });

  it('list() degrades to [] on a malformed payload', async () => {
    const { api } = makeApi({ get: () => ({ plugins: null }) });
    expect(await api.list()).toEqual([]);
  });

  it('GET /plugins/{name} unwraps { plugin } with schema + masked settings', async () => {
    const { api, get } = makeApi({ get: () => ({ plugin: sampleDetail }) });
    const detail = await api.get('anidb');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb');
    expect(detail.settings_schema.api_key.secret).toBe(true);
    expect(detail.settings_schema.page_size.default).toBe(25);
    expect(detail.settings.api_key).toBe(PLUGIN_SECRET_MASK);
  });

  it('get() defends missing schema/settings to empty objects', async () => {
    const { api } = makeApi({ get: () => ({ plugin: { ...samplePlugin } }) });
    const detail = await api.get('anidb');
    expect(detail.settings_schema).toEqual({});
    expect(detail.settings).toEqual({});
    expect(detail.secret_status).toEqual({});
  });

  it('get() passes through the secret_status map', async () => {
    const detail = { ...sampleDetail, secret_status: { api_key: { set: true, length: 24 } } };
    const { api } = makeApi({ get: () => ({ plugin: detail }) });
    const got = await api.get('anidb');
    expect(got.secret_status?.api_key).toEqual({ set: true, length: 24 });
  });

  it('encodes the plugin name in the URL', async () => {
    const { api, get } = makeApi({ get: () => ({ plugin: sampleDetail }) });
    await api.get('my plugin');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/plugins/my%20plugin');
  });
});

describe('AdminPluginsApi — install / enable / disable / uninstall', () => {
  it('POST /plugins/install sends { url }', async () => {
    const { api, post } = makeApi({ post: () => ({ manifest: {} }) });
    await api.install('https://example.com/p.zip');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/install', {
      url: 'https://example.com/p.zip',
    });
  });

  it('POST /plugins/{name}/enable', async () => {
    const { api, post } = makeApi();
    await api.enable('anidb');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/enable');
  });

  it('POST /plugins/{name}/disable', async () => {
    const { api, post } = makeApi();
    await api.disable('anidb');
    expect(post).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/disable');
  });

  it('DELETE /plugins/{name} uninstalls', async () => {
    const { api, del } = makeApi();
    await api.uninstall('anidb');
    expect(del).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb');
  });
});

describe('AdminPluginsApi — updateSettings', () => {
  it('PUT /plugins/{name}/settings wraps the body in { settings } and returns refreshed detail', async () => {
    const { api, put } = makeApi({ put: () => ({ plugin: sampleDetail }) });
    const detail = await api.updateSettings('anidb', { page_size: 50 });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/plugins/anidb/settings', {
      settings: { page_size: 50 },
    });
    expect(detail.settings.api_key).toBe(PLUGIN_SECRET_MASK);
  });
});

describe('pluginErrorCode', () => {
  it('extracts the install error { code } from an ApiError body', () => {
    const err = new ApiError('Install failed', 400, { code: 'plugin.install_failed' });
    expect(pluginErrorCode(err)).toBe('plugin.install_failed');
  });

  it('returns null for a non-ApiError or codeless body', () => {
    expect(pluginErrorCode(new Error('boom'))).toBeNull();
    expect(pluginErrorCode(new ApiError('x', 400, {}))).toBeNull();
  });
});

describe('pluginValidationErrors', () => {
  it('extracts the per-field { errors } map from a 400 validation_failed', () => {
    const err = new ApiError('invalid', 400, {
      code: 'plugin.settings.validation_failed',
      errors: { api_key: 'required', page_size: 'must be an integer' },
    });
    expect(pluginValidationErrors(err)).toEqual({
      api_key: 'required',
      page_size: 'must be an integer',
    });
  });

  it('returns {} when the error has no errors map', () => {
    expect(pluginValidationErrors(new Error('boom'))).toEqual({});
    expect(pluginValidationErrors(new ApiError('x', 400, { code: 'x' }))).toEqual({});
  });
});
