/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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

  // Regression [audit #15]: the server's machine code must ride along on the
  // ClaimError so consumers can localize via errorCodeMessage — previously the
  // status-guess alone survived and the raw code was discarded, pinning every
  // message to hardcoded English.
  it('carries the server machine code and prefers its mapping over the status guess', async () => {
    // A hub that answers 400 (generic status) but names the real failure as
    // expired — the CODE wins, and it is exposed on `error.code`.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(res(400, { code: 'claim.code_expired', message: 'raw server text' })),
    );
    const err = await claimServer('', 'code').catch((e) => e);
    expect(err).toBeInstanceOf(ClaimError);
    expect(err.kind).toBe('expired');
    expect(err.code).toBe('claim.code_expired');
    // Known kinds keep the curated legacy copy byte-identical.
    expect(err.message).toBe('That claim code has expired. Generate a new one on your server.');
  });

  it('exposes an unmapped server code while falling back to the server message', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(res(400, { code: 'weird.code', message: 'Server says hi' })),
    );
    const err = await claimServer('', 'code').catch((e) => e);
    expect(err.kind).toBe('invalid');
    expect(err.code).toBe('weird.code');
    expect(err.message).toBe('Server says hi');
  });

  it('leaves code null when the server sends no machine code (legacy reply)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res(404, { message: 'gone' })));
    const err = await claimServer('', 'code').catch((e) => e);
    expect(err.kind).toBe('not_found');
    expect(err.code).toBeNull();
  });
});
