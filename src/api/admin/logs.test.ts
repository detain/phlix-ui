/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { AdminLogsApi, ALL_LOGS } from './logs';
import type { ApiClient } from '../client';

function clientWith(get: ReturnType<typeof vi.fn>): ApiClient {
  return { get } as unknown as ApiClient;
}

describe('AdminLogsApi', () => {
  it('lists files, unwrapping { files }', async () => {
    const get = vi.fn().mockResolvedValue({ files: [{ name: 'app.log', size: 10, modified_at: 't' }] });
    const api = new AdminLogsApi(clientWith(get));
    const files = await api.list();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/logs');
    expect(files).toEqual([{ name: 'app.log', size: 10, modified_at: 't' }]);
  });

  it('degrades to [] when the list payload is malformed', async () => {
    const api = new AdminLogsApi(clientWith(vi.fn().mockResolvedValue({})));
    expect(await api.list()).toEqual([]);
  });

  it('tails a file with the file + lines query', async () => {
    const get = vi.fn().mockResolvedValue({ file: 'app.log', lines: ['a', 'b'], truncated: true });
    const api = new AdminLogsApi(clientWith(get));
    const res = await api.tail('app.log', 500);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/logs/tail', { file: 'app.log', lines: '500' });
    expect(res).toEqual({ file: 'app.log', lines: ['a', 'b'], truncated: true });
  });

  it('defends tail against a malformed payload (keeps the requested file, empty lines)', async () => {
    const api = new AdminLogsApi(clientWith(vi.fn().mockResolvedValue({})));
    const res = await api.tail('x.log');
    expect(res).toEqual({ file: 'x.log', lines: [], truncated: false });
  });

  it('tails all files merged', async () => {
    const get = vi.fn().mockResolvedValue({ files: ['a.log'], lines: ['x'], truncated: false });
    const api = new AdminLogsApi(clientWith(get));
    const res = await api.tailAll(1000);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/logs/tail-all', { lines: '1000' });
    expect(res).toEqual({ files: ['a.log'], lines: ['x'], truncated: false });
  });

  it('exposes the ALL_LOGS sentinel', () => {
    expect(ALL_LOGS).toBe('__all__');
  });
});
