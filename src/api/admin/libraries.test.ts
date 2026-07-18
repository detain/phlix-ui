/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AdminLibrariesApi, LIBRARY_TYPES } from './libraries';
import type { ApiClient } from '../client';

const sampleLibrary = {
  id: 'lib-1',
  name: 'Movies',
  type: 'movie',
  paths: ['/media/movies'],
  options: {},
  created_at: '2026-05-27T00:00:00Z',
};

const sampleJob = {
  id: 'job-1',
  library_id: 'lib-1',
  type: 'scan' as const,
  status: 'running' as const,
  items_found: 0,
  items_added: 0,
  items_updated: 0,
  items_removed: 0,
  current_path: null,
  error: null,
  queued_at: '2026-05-27T00:00:00Z',
  started_at: '2026-05-27T00:00:01Z',
  completed_at: null,
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
  return { api: new AdminLibrariesApi(client), get, post, put, del };
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('AdminLibrariesApi', () => {
  it('exposes only the 5 DB-valid types (no `book`)', () => {
    expect(LIBRARY_TYPES).toEqual(['movie', 'series', 'music', 'photo', 'video']);
    expect(LIBRARY_TYPES).not.toContain('book');
  });

  it('list() GETs /api/v1/libraries and unwraps { libraries }', async () => {
    const { api, get } = makeApi({ get: () => ({ libraries: [sampleLibrary] }) });
    const result = await api.list();
    expect(get).toHaveBeenCalledWith('/api/v1/libraries');
    expect(result).toEqual([sampleLibrary]);
  });

  it('list() falls back to [] on a malformed payload', async () => {
    const { api } = makeApi({ get: () => ({ libraries: null }) });
    await expect(api.list()).resolves.toEqual([]);
  });

  it('get(id) GETs /api/v1/libraries/{id} and unwraps { library }', async () => {
    const { api, get } = makeApi({ get: () => ({ library: sampleLibrary }) });
    const result = await api.get('lib-1');
    expect(get).toHaveBeenCalledWith('/api/v1/libraries/lib-1');
    expect(result).toEqual(sampleLibrary);
  });

  it('create() POSTs the full body and parses 201 { library_id, message }', async () => {
    const { api, post } = makeApi({ post: () => ({ library_id: 'lib-9', message: 'created' }) });
    const result = await api.create({ name: 'Shows', type: 'series', paths: ['/media/tv'] });
    expect(post).toHaveBeenCalledWith('/api/v1/libraries', {
      name: 'Shows',
      type: 'series',
      paths: ['/media/tv'],
    });
    expect(result).toEqual({ library_id: 'lib-9', message: 'created' });
  });

  it('update() PUTs only editable fields and NEVER sends `type`', async () => {
    const { api, put } = makeApi({ put: () => ({ message: 'updated' }) });
    const result = await api.update('lib-1', { name: 'Renamed', paths: ['/m'] });
    expect(put).toHaveBeenCalledWith('/api/v1/libraries/lib-1', {
      name: 'Renamed',
      paths: ['/m'],
    });
    const body = put.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('type');
    expect(result).toEqual({ message: 'updated' });
  });

  it('remove() DELETEs /api/v1/libraries/{id}', async () => {
    const { api, del } = makeApi({ del: () => ({ message: 'deleted' }) });
    const result = await api.remove('lib-1');
    expect(del).toHaveBeenCalledWith('/api/v1/libraries/lib-1');
    expect(result).toEqual({ message: 'deleted' });
  });

  it('scan() POSTs /scan and parses 202 { job_id, status, message }', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-1', status: 'queued', message: 'ok' }),
    });
    const result = await api.scan('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/scan');
    expect(result).toEqual({ job_id: 'job-1', status: 'queued', message: 'ok' });
  });

  it('rescan() POSTs /rescan with the same 202 shape', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-2', status: 'queued', message: 'ok' }),
    });
    const result = await api.rescan('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/rescan');
    expect(result.status).toBe('queued');
  });

  it('matchMetadata() POSTs /match-metadata with the 202 shape', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-m', status: 'queued', message: 'ok' }),
    });
    const result = await api.matchMetadata('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/match-metadata');
    expect(result.job_id).toBe('job-m');
  });

  it('refreshMetadata() POSTs /refresh-metadata with the 202 shape', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-r', status: 'queued', message: 'ok' }),
    });
    const result = await api.refreshMetadata('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/refresh-metadata');
    expect(result.job_id).toBe('job-r');
  });

  it('prune() POSTs /prune with the 202 shape', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-p', status: 'queued', message: 'ok' }),
    });
    const result = await api.prune('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/prune');
    expect(result.job_id).toBe('job-p');
  });

  it('clearMetadata() POSTs /clear-metadata with the 202 shape', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-cm', status: 'queued', message: 'ok' }),
    });
    const result = await api.clearMetadata('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/clear-metadata');
    expect(result.job_id).toBe('job-cm');
  });

  it('clearArtwork() POSTs /clear-artwork with the 202 shape', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-ca', status: 'queued', message: 'ok' }),
    });
    const result = await api.clearArtwork('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/clear-artwork');
    expect(result.job_id).toBe('job-ca');
  });

  it('deleteAll() POSTs /delete-all with confirm=true in BOTH the query and body', async () => {
    const { api, post } = makeApi({
      post: () => ({ job_id: 'job-d', status: 'queued', message: 'ok' }),
    });
    const result = await api.deleteAll('lib-1');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/delete-all?confirm=true', {
      confirm: true,
    });
    expect(result.job_id).toBe('job-d');
  });

  it('deleteAll() encodes a path-unsafe id before the ?confirm=true query', async () => {
    const { api, post } = makeApi({ post: () => ({ job_id: 'j', status: 'queued', message: 'ok' }) });
    await api.deleteAll('a/b');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/a%2Fb/delete-all?confirm=true', {
      confirm: true,
    });
  });

  it('scanStatus() unwraps { scan_status } (job)', async () => {
    const { api, get } = makeApi({ get: () => ({ scan_status: sampleJob }) });
    const result = await api.scanStatus('lib-1');
    expect(get).toHaveBeenCalledWith('/api/v1/libraries/lib-1/scan-status');
    expect(result).toEqual(sampleJob);
  });

  it('scanStatus() returns null when there is no job', async () => {
    const { api } = makeApi({ get: () => ({ scan_status: null }) });
    await expect(api.scanStatus('lib-1')).resolves.toBeNull();
  });

  it('scanHistory() unwraps { history } and omits limit when undefined', async () => {
    const { api, get } = makeApi({ get: () => ({ history: [sampleJob] }) });
    const result = await api.scanHistory('lib-1');
    expect(get).toHaveBeenCalledWith('/api/v1/libraries/lib-1/scan-history', undefined);
    expect(result).toEqual([sampleJob]);
  });

  it('scanHistory() passes { limit: "N" } when provided', async () => {
    const { api, get } = makeApi({ get: () => ({ history: [] }) });
    await api.scanHistory('lib-1', 5);
    expect(get).toHaveBeenCalledWith('/api/v1/libraries/lib-1/scan-history', { limit: '5' });
  });

  it('scanHistory() falls back to [] on a malformed payload', async () => {
    const { api } = makeApi({ get: () => ({ history: null }) });
    await expect(api.scanHistory('lib-1')).resolves.toEqual([]);
  });

  it('propagates an error thrown by the client (e.g. a 4xx)', async () => {
    const { api } = makeApi({
      post: () => {
        throw new Error('Invalid type');
      },
    });
    await expect(api.create({ name: 'X', type: 'movie', paths: ['/p'] })).rejects.toThrow(
      'Invalid type',
    );
  });

  it('encodes path-unsafe ids in the URL', async () => {
    const { api, get } = makeApi({ get: () => ({ library: sampleLibrary }) });
    await api.get('a/b c');
    expect(get).toHaveBeenCalledWith('/api/v1/libraries/a%2Fb%20c');
  });
});
