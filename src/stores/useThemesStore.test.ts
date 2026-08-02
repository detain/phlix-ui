/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemesStore } from './useThemesStore';

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

const DUSK = {
  id: 'sample-dusk', name: 'Sample Dusk', dark: true, extends: 'midnight',
  tokens: { '--bg': '#05060a' }, source: 'sample-theme', builtIn: false,
};
const MIDNIGHT = {
  id: 'midnight', name: 'Midnight', dark: true, extends: null,
  tokens: { '--bg': '#000000', '--surface': '#0a0a0a' }, source: null, builtIn: true,
};

function stubThemes(themes: unknown[] = [MIDNIGHT, DUSK]) {
  const f = vi.fn().mockResolvedValue(jsonResponse({ themes }));
  vi.stubGlobal('fetch', f);
  return f;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('useThemesStore.load', () => {
  it('loads the catalogue and flips `loaded`', async () => {
    stubThemes();
    const store = useThemesStore();
    expect(store.loaded).toBe(false);

    await store.load('https://media.example');

    expect(store.loaded).toBe(true);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.items.map((t) => t.id)).toEqual(['midnight', 'sample-dusk']);
  });

  it('makes NO request at all without an apiBase (host app / unit test)', async () => {
    const f = stubThemes();
    const store = useThemesStore();
    await store.load('');
    expect(f).not.toHaveBeenCalled();
    expect(store.loaded).toBe(false);
    expect(store.items).toEqual([]);
  });

  it('is idempotent — a second load is a no-op until forced', async () => {
    const f = stubThemes();
    const store = useThemesStore();
    await store.load('https://media.example');
    await store.load('https://media.example');
    expect(f).toHaveBeenCalledTimes(1);

    await store.load('https://media.example', true);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it('dedupes concurrent callers onto ONE in-flight request', async () => {
    // `useTheme` and `AppearanceSettings` both call load() on the same tick.
    const f = stubThemes();
    const store = useThemesStore();
    await Promise.all([
      store.load('https://media.example'),
      store.load('https://media.example'),
      store.load('https://media.example'),
    ]);
    expect(f).toHaveBeenCalledTimes(1);
    expect(store.items).toHaveLength(2);
  });

  it('RECORDS a failure instead of throwing — an unreachable endpoint is a non-event', async () => {
    // The three built-ins are in the SPA's own stylesheet and already painted,
    // so a 401/offline just means the picker shows three entries, not four.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ error: 'Unauthorized' }, 401)));
    const store = useThemesStore();

    await expect(store.load('https://media.example')).resolves.toBeUndefined();

    expect(store.error).toBeTruthy();
    expect(store.loaded).toBe(false);
    expect(store.loading).toBe(false);
    expect(store.items).toEqual([]);
  });

  it('can retry after a failure — a failed load does not latch `loaded`', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const store = useThemesStore();
    await store.load('https://media.example');
    expect(store.error).toBe('offline');

    stubThemes();
    await store.load('https://media.example');
    expect(store.error).toBeNull();
    expect(store.items).toHaveLength(2);
  });
});

describe('useThemesStore selectors', () => {
  it('pluginThemes excludes the built-ins — those are the picker\'s static entries', async () => {
    stubThemes();
    const store = useThemesStore();
    await store.load('https://media.example');
    expect(store.pluginThemes.map((t) => t.id)).toEqual(['sample-dusk']);
  });

  it('byId finds a theme, or undefined', async () => {
    stubThemes();
    const store = useThemesStore();
    await store.load('https://media.example');
    expect(store.byId('sample-dusk')?.name).toBe('Sample Dusk');
    expect(store.byId('nope')).toBeUndefined();
  });

  it('styleFor gives the applicable <html> style for a plugin theme', async () => {
    stubThemes();
    const store = useThemesStore();
    await store.load('https://media.example');
    expect(store.styleFor('sample-dusk')).toEqual({
      id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a' },
    });
  });

  it('styleFor is null for a built-in and for an unknown id', async () => {
    stubThemes();
    const store = useThemesStore();
    await store.load('https://media.example');
    expect(store.styleFor('midnight')).toBeNull();
    expect(store.styleFor('nocturne')).toBeNull();
    expect(store.styleFor('uninstalled')).toBeNull();
  });

  it('styleFor is null before the catalogue lands', () => {
    const store = useThemesStore();
    expect(store.styleFor('sample-dusk')).toBeNull();
  });
});
