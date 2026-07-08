/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { claimServer, ClaimError } from './claimServer';
import { ACCESS_TOKEN_KEY } from './tokenStore';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
});

function res(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response;
}

describe('claimServer', () => {
  it('rejects an empty code without hitting the network', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(claimServer('', '   ')).rejects.toMatchObject({ kind: 'empty' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the claim code with the Bearer token and the hub protocol header', async () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'tok-9');
    const fetchMock = vi.fn().mockResolvedValue(res(200, { server_id: 'srv-1' }));
    vi.stubGlobal('fetch', fetchMock);

    const out = await claimServer('https://hub', '  ABC-123 ');

    expect(out).toEqual({ serverId: 'srv-1' });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://hub/api/v1/server-claims/claim');
    expect(init.method).toBe('POST');
    const headers = init.headers as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer tok-9');
    expect(headers['Accept-Phlix-Protocol']).toBe('v1');
    expect(JSON.parse(init.body as string)).toEqual({ claim_code: 'ABC-123' }); // trimmed
  });

  it.each<[number, ClaimError['kind']]>([
    [401, 'unauthorized'],
    [404, 'not_found'],
    [410, 'expired'],
    [409, 'already_claimed'],
    [400, 'invalid'],
    [500, 'invalid'],
  ])('maps HTTP %i to kind %s', async (status, kind) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res(status, { message: 'x' })));
    await expect(claimServer('', 'code')).rejects.toMatchObject({ kind });
  });

  it('maps a fetch rejection to a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('boom')));
    await expect(claimServer('', 'code')).rejects.toMatchObject({ kind: 'network' });
  });
});
