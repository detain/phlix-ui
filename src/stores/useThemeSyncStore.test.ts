/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeSyncStore } from './useThemeSyncStore';
import { usePreferencesStore } from './usePreferencesStore';
import { ACCESS_TOKEN_KEY } from '../api/tokenStore';

/**
 * The theme SYNC store — the law of one server-side copy of `theme`.
 *
 * Three laws, each pinned below:
 *  1. Adoption is silent and server-wins (cross-device unification, including
 *     console-client choices); anything unreadable — hub 404s, offline,
 *     malformed envelopes — degrades to local-only with zero UI noise.
 *  2. An adopted value never echoes back as a PUT (the loop guard is
 *     `serverTheme`, written BEFORE the preference it triggers).
 *  3. User selections coalesce: a burst of choices costs ONE debounced PUT of
 *     the final value; a failed PUT repaints nothing and rolls nothing back —
 *     it only raises the `putFailed` disclosure flag.
 */

const DUSK = {
  id: 'sample-dusk', name: 'Sample Dusk', dark: true, extends: 'midnight',
  tokens: { '--bg': '#05060a' }, source: 'sample-theme', builtIn: false,
};

function res(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/** Route the two endpoints the sync store may touch; record every call. */
function router(stub: {
  themes?: unknown[] | 'fail' | 404;
  settings?: { body?: unknown; status?: number } | 'fail';
  put?: { status?: number };
}) {
  const calls: { url: string; method: string; body?: unknown }[] = [];
  const f = vi.fn(async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? 'GET';
    calls.push({ url, method, body: init?.body ? JSON.parse(String(init.body)) : undefined });
    if (url.includes('/api/v1/themes')) {
      if (stub.themes === 'fail') throw new Error('offline');
      if (stub.themes === 404) return res({ error: 'not found' }, 404);
      return res({ themes: stub.themes ?? [DUSK] });
    }
    if (url.includes('/api/v1/users/me/settings')) {
      if (method === 'PUT') {
        if (stub.put?.status && stub.put.status >= 400) return res({ error: 'nope' }, stub.put.status);
        return res({ settings: {} });
      }
      if (stub.settings === 'fail') throw new Error('offline');
      if (typeof stub.settings === 'object' && stub.settings !== null) {
        return res(stub.settings.body ?? {}, stub.settings.status ?? 200);
      }
      return res({ settings: {} });
    }
    throw new Error(`unexpected ${method} ${url}`);
  });
  vi.stubGlobal('fetch', f);
  return { f, calls, get: (m: string) => calls.filter((c) => c.method === m) };
}

/**
 * Build the store graph for one test. A signed-in setup must call `signIn()`
 * BEFORE any store instantiates, because `useAuthStore` hydrates its token ref
 * once at creation — a later `localStorage` write would not be seen.
 */
function stores(signedIn = false) {
  if (signedIn) localStorage.setItem(ACCESS_TOKEN_KEY, 'test-access-token');
  return { sync: useThemeSyncStore(), prefs: usePreferencesStore() };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('syncFromServer — adoption is silent and server-wins', () => {
  it('adopts a known plugin theme over a stale local choice, and never echoes a PUT', async () => {
    const { sync, prefs } = stores();
    const r = router({ settings: { body: { settings: { theme: 'sample-dusk' } } } });
    prefs.theme = 'nocturne';
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('sample-dusk');
    expect(sync.serverTheme).toBe('sample-dusk');
    // The loop guard: an adoption is not a user selection.
    vi.useFakeTimers();
    await vi.advanceTimersByTimeAsync(3000);
    expect(r.get('PUT')).toEqual([]);
  });

  it('adopts a different server value than the local one (server wins on conflict)', async () => {
    const { sync, prefs } = stores();
    router({ settings: { body: { settings: { theme: 'nocturne' } } } });
    prefs.theme = 'daylight';
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('nocturne');
  });

  it('leaves everything alone when the server agrees', async () => {
    const { sync, prefs } = stores();
    const r = router({ settings: { body: { settings: { theme: 'sample-dusk' } } } });
    prefs.theme = 'sample-dusk';
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('sample-dusk');
    expect(sync.serverTheme).toBe('sample-dusk');
    expect(r.get('PUT')).toEqual([]);
  });

  it('refuses to adopt a theme id this server does not serve (fossil/unknown)', async () => {
    const { sync, prefs } = stores();
    router({ settings: { body: { settings: { theme: 'phlix-dark' } } } });
    prefs.theme = 'daylight';
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('daylight');
    expect(sync.serverTheme).toBeNull();
  });

  it('treats built-in ids as known even with an empty catalogue', async () => {
    const { sync, prefs } = stores();
    router({ themes: [], settings: { body: { settings: { theme: 'midnight' } } } });
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('midnight');
  });

  it('is silent when the server has no theme saved (fresh account)', async () => {
    const { sync, prefs } = stores();
    router({ settings: { body: { settings: {} } } });
    prefs.theme = 'daylight';
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('daylight');
    expect(sync.serverTheme).toBeNull();
  });

  it('swallows a 404 on BOTH endpoints — the hub serves neither (silent degrade law)', async () => {
    const { sync, prefs } = stores();
    const r = router({ themes: 404 });
    prefs.theme = 'daylight';
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('daylight');
    // A dead catalogue means the settings route is dead too (same hub): the
    // sync must stop before spending a second request, and stay silent.
    expect(r.calls.filter((c) => c.url.includes('me/settings'))).toEqual([]);
  });

  it('swallows a settings-endpoint failure without touching local state', async () => {
    const { sync, prefs } = stores();
    router({ settings: 'fail' });
    prefs.theme = 'daylight';
    await sync.syncFromServer('');
    expect(prefs.theme).toBe('daylight');
    expect(sync.serverTheme).toBeNull();
  });

  it('runs ONCE per login and re-arms only after the session ends', async () => {
    const { sync } = stores();
    const r = router({ settings: { body: { settings: { theme: 'midnight' } } } });
    await sync.syncFromServer('');
    await sync.syncFromServer('');
    expect(r.calls.filter((c) => c.method === 'GET' && c.url.includes('me/settings'))).toHaveLength(1);
    sync.endSession();
    await sync.syncFromServer('');
    expect(r.calls.filter((c) => c.method === 'GET' && c.url.includes('me/settings'))).toHaveLength(2);
  });
});

describe('queuePut — coalescing, echo guard, failure posture', () => {
  it('fires exactly ONE debounced PUT of the FINAL value from a rapid burst', async () => {
    const { sync } = stores(true);
    const r = router({});
    vi.useFakeTimers();
    sync.queuePut('', 'daylight');
    await vi.advanceTimersByTimeAsync(400);
    sync.queuePut('', 'midnight');
    await vi.advanceTimersByTimeAsync(400);
    sync.queuePut('', 'sample-dusk');
    await vi.advanceTimersByTimeAsync(2000);
    const puts = r.get('PUT');
    expect(puts).toHaveLength(1);
    expect(puts[0].body).toEqual({ theme: 'sample-dusk' });
  });

  it('suppresses the value that came from the server (no echo)', async () => {
    const { sync } = stores(true);
    const r = router({});
    sync.serverTheme = 'midnight';
    vi.useFakeTimers();
    sync.queuePut('', 'midnight');
    await vi.advanceTimersByTimeAsync(3000);
    expect(r.get('PUT')).toEqual([]);
  });

  it('advances the guard only on a durable save and flags failure', async () => {
    const { sync, prefs } = stores(true);
    router({ put: { status: 500 } });
    vi.useFakeTimers();
    sync.queuePut('', 'daylight');
    await vi.advanceTimersByTimeAsync(1500);
    expect(sync.putFailed).toBe(true);
    expect(sync.serverTheme).toBeNull(); // nothing became durable
    expect(prefs.theme).toBe('nocturne'); // no rollback, no repaint — local stands

    vi.unstubAllGlobals();
    router({});
    sync.queuePut('', 'midnight');
    await vi.advanceTimersByTimeAsync(1500);
    expect(sync.putFailed).toBe(false);
    expect(sync.serverTheme).toBe('midnight');
  });

  it('does nothing while signed out (an anonymous selection is local-only by definition)', async () => {
    const { sync } = stores(false);
    const r = router({});
    vi.useFakeTimers();
    sync.queuePut('', 'daylight');
    await vi.advanceTimersByTimeAsync(3000);
    expect(r.get('PUT')).toEqual([]);
  });

  it('returning to the server-confirmed value cancels a pending PUT', async () => {
    const { sync } = stores(true);
    const r = router({});
    sync.serverTheme = 'nocturne';
    vi.useFakeTimers();
    sync.queuePut('', 'daylight');
    sync.queuePut('', 'nocturne'); // user changed their mind back
    await vi.advanceTimersByTimeAsync(3000);
    expect(r.get('PUT')).toEqual([]);
  });

  it('endSession drops pending work and disclosure state', async () => {
    const { sync } = stores(true);
    router({ put: { status: 500 } });
    vi.useFakeTimers();
    sync.queuePut('', 'daylight');
    await vi.advanceTimersByTimeAsync(1500);
    expect(sync.putFailed).toBe(true);
    vi.clearAllTimers();
    sync.endSession();
    expect(sync.putFailed).toBe(false);
    expect(sync.serverTheme).toBeNull();
  });
});
