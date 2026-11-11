/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { fetchDeviceSessions, revokeDeviceSession } from './deviceSessions';
import { ApiError } from './client';

/**
 * The device-session client — `GET /api/v1/auth/sessions` +
 * `DELETE /api/v1/auth/sessions/{id}`, the exact pair phlix-server 413765b6
 * ships (hub twin c0ed2c28 serves the same wire). Fixtures below are the
 * server's VERBATIM row shape: id/created_at/last_used_at as TIMESTAMP text
 * on the server clock, nullable UNTRUSTED client strings, and the
 * controller-computed `current` flag.
 */

const LIST_PATH = '/api/v1/auth/sessions';

function res(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/** True 204: no body to parse — `.json()` THROWING here proves the client
 *  short-circuits before touching it (the server's revoke success shape). */
function noContent(): Response {
  return {
    ok: true,
    status: 204,
    headers: { get: () => null },
    json: async () => {
      throw new Error('204 body must never be parsed');
    },
    text: async () => '',
  } as unknown as Response;
}

function row(over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'sess-a1b2c3',
    current: false,
    created_at: '2026-11-01 08:15:22',
    last_used_at: '2026-11-10 22:04:07',
    device_type: 'tv',
    device_name: 'Living Room TV',
    ...over,
  };
}

describe('fetchDeviceSessions', () => {
  it('GETs the sessions endpoint and maps the server rows verbatim', async () => {
    const f = vi.fn().mockResolvedValue(res({ sessions: [row(), row({ id: 'sess-d4e5', current: true })] }));
    vi.stubGlobal('fetch', f);
    const out = await fetchDeviceSessions('');
    expect(String(f.mock.calls[0][0])).toBe(LIST_PATH);
    expect((f.mock.calls[0][1] as RequestInit).method ?? 'GET').toBe('GET');
    expect(out).toHaveLength(2);
    expect(out[0]).toEqual({
      id: 'sess-a1b2c3',
      current: false,
      created_at: '2026-11-01 08:15:22',
      last_used_at: '2026-11-10 22:04:07',
      device_type: 'tv',
      device_name: 'Living Room TV',
    });
    expect(out[1]!.current).toBe(true);
    vi.unstubAllGlobals();
  });

  it('preserves the SERVER order (last_used_at DESC) — no client re-sort', async () => {
    const old = row({ id: 'old', last_used_at: '2026-01-01 00:00:00' });
    const fresh = row({ id: 'fresh', last_used_at: '2026-11-11 00:00:00' });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res({ sessions: [fresh, old] })));
    const out = await fetchDeviceSessions('');
    expect(out.map((r) => r.id)).toEqual(['fresh', 'old']);
    vi.unstubAllGlobals();
  });

  it('coerces the honest nulls: missing/empty device fields → null, non-string dates → null', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(res({ sessions: [row({ device_type: null, device_name: '', created_at: 1700000000, last_used_at: null })] })),
    );
    const [r] = await fetchDeviceSessions('');
    expect(r).toEqual({
      id: 'sess-a1b2c3',
      current: false,
      created_at: null,
      last_used_at: null,
      device_type: null,
      device_name: null,
    });
    vi.unstubAllGlobals();
  });

  it('drops malformed rows at the parse boundary (non-object, missing/empty id)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(res({ sessions: [null, 'x', {}, { id: 42 }, { id: '' }, row({ id: 'keeper' })] })),
    );
    const out = await fetchDeviceSessions('');
    expect(out.map((r) => r.id)).toEqual(['keeper']);
    vi.unstubAllGlobals();
  });

  it('degrades a malformed envelope to [] instead of throwing', async () => {
    for (const body of [{}, { sessions: null }, { sessions: 'nope' }, null]) {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res(body)));
      await expect(fetchDeviceSessions('')).resolves.toEqual([]);
      vi.unstubAllGlobals();
    }
  });

  it('PROPAGATES a 401 wire envelope untouched (the page owns disclosure)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res({ error: 'Unauthorized', code: 'auth.required' }, 401)));
    await expect(fetchDeviceSessions('')).rejects.toBeInstanceOf(ApiError);
    vi.unstubAllGlobals();
  });

  it('PROPAGATES a transport failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    await expect(fetchDeviceSessions('')).rejects.toThrow('offline');
    vi.unstubAllGlobals();
  });
});

describe('revokeDeviceSession', () => {
  it('DELETEs the id-addressed route and resolves on the true 204', async () => {
    const f = vi.fn().mockResolvedValue(noContent());
    vi.stubGlobal('fetch', f);
    await expect(revokeDeviceSession('', 'sess-a1b2c3')).resolves.toBeUndefined();
    expect(String(f.mock.calls[0][0])).toBe(`${LIST_PATH}/sess-a1b2c3`);
    expect((f.mock.calls[0][1] as RequestInit).method).toBe('DELETE');
    vi.unstubAllGlobals();
  });

  it('URL-encodes the id — path-parameter injection is structurally impossible', async () => {
    const f = vi.fn().mockResolvedValue(noContent());
    vi.stubGlobal('fetch', f);
    await revokeDeviceSession('', '../evil id');
    expect(String(f.mock.calls[0][0])).toBe(`${LIST_PATH}/${encodeURIComponent('../evil id')}`);
    vi.unstubAllGlobals();
  });

  it('rejects with the untouched ApiError on the uniform 404 (unknown == foreign)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res({ error: 'Session not found' }, 404)));
    await expect(revokeDeviceSession('', 'gone')).rejects.toBeInstanceOf(ApiError);
    vi.unstubAllGlobals();
  });

  it('propagates a transport failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('cable out')));
    await expect(revokeDeviceSession('', 'x')).rejects.toThrow('cable out');
    vi.unstubAllGlobals();
  });
});
