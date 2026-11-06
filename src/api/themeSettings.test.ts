/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { fetchThemeSetting, putThemeSetting } from './themeSettings';
import { ApiError } from './client';

/**
 * The per-user THEME setting client — the narrow seam over
 * `GET/PUT /api/v1/users/me/settings`.
 *
 * The server (phlix-server `WebPortalRouter`) accepts a FLAT body and writes
 * only the supplied columns, so `PUT {theme}` is a complete request — every
 * other settings field stays untouched. A theme the server does not know
 * answers `400 {"error": …}` (flat envelope, no wire code). The hub serves
 * neither route, so `404` is the expected hub answer on both verbs and must
 * stay a caller-visible rejection that the sync store swallows silently.
 */

function res(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

describe('fetchThemeSetting', () => {
  it('returns the server-saved theme id', async () => {
    const f = vi.fn().mockResolvedValue(res({ settings: { theme: 'sample-dusk' } }));
    vi.stubGlobal('fetch', f);
    await expect(fetchThemeSetting('')).resolves.toBe('sample-dusk');
    expect(String(f.mock.calls[0][0])).toBe('/api/v1/users/me/settings');
    const init = f.mock.calls[0][1] as RequestInit;
    expect(init.method ?? 'GET').toBe('GET');
    vi.unstubAllGlobals();
  });

  it('returns null when the server has no theme saved yet', async () => {
    // Fresh account: the settings envelope exists without a `theme` key —
    // the server merges it only when user_profiles.active_theme_id is set.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res({ settings: { volume: 0.8 } })));
    await expect(fetchThemeSetting('')).resolves.toBeNull();
    vi.unstubAllGlobals();
  });

  it('returns null for a non-string or empty theme instead of guessing', async () => {
    for (const body of [{ settings: { theme: 42 } }, { settings: { theme: '' } }, {}, { settings: null }]) {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res(body)));
      await expect(fetchThemeSetting('')).resolves.toBeNull();
      vi.unstubAllGlobals();
    }
  });

  it('PROPAGATES a 404 (the hub serves no such route) — the silent path is the store\'s', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res({ error: 'not found' }, 404)));
    await expect(fetchThemeSetting('')).rejects.toBeInstanceOf(ApiError);
    vi.unstubAllGlobals();
  });

  it('PROPAGATES a transport failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    await expect(fetchThemeSetting('')).rejects.toThrow('offline');
    vi.unstubAllGlobals();
  });
});

describe('putThemeSetting', () => {
  it('PUTs the flat single-field body the server whitelist accepts', async () => {
    const f = vi.fn().mockResolvedValue(res({ settings: { theme: 'daylight' } }));
    vi.stubGlobal('fetch', f);
    await putThemeSetting('', 'daylight');
    expect(String(f.mock.calls[0][0])).toBe('/api/v1/users/me/settings');
    const init = f.mock.calls[0][1] as RequestInit;
    expect(init.method).toBe('PUT');
    expect(JSON.parse(String(init.body))).toEqual({ theme: 'daylight' });
    vi.unstubAllGlobals();
  });

  it('rejects when the server refuses an unknown theme (400 flat error)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(res({ error: 'Unknown theme' }, 400)));
    await expect(putThemeSetting('', 'phlix-dark')).rejects.toBeInstanceOf(ApiError);
    vi.unstubAllGlobals();
  });
});
