import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLibrariesStore } from './useLibrariesStore';
import type { LibrarySummary } from '../api/libraries';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

const LIBS: LibrarySummary[] = [
  { id: 'mv', name: 'Movies', type: 'movie', display_order: 0 },
  { id: 'tv', name: 'TV', type: 'series', display_order: 1 },
];

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('useLibrariesStore', () => {
  it('loads and exposes the sorted libraries', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ libraries: LIBS })));
    const store = useLibrariesStore();
    await store.load('');
    expect(store.loaded).toBe(true);
    expect(store.items.map((l) => l.id)).toEqual(['mv', 'tv']);
  });

  it('is idempotent — a second load() does not refetch unless forced', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ libraries: LIBS }));
    vi.stubGlobal('fetch', fetchMock);
    const store = useLibrariesStore();
    await store.load('');
    await store.load('');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await store.load('', true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('dedupes a concurrent in-flight load', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ libraries: LIBS }));
    vi.stubGlobal('fetch', fetchMock);
    const store = useLibrariesStore();
    await Promise.all([store.load(''), store.load('')]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('records an error and leaves items empty on failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));
    const store = useLibrariesStore();
    await store.load('');
    expect(store.items).toEqual([]);
    expect(store.error).toContain('boom');
    expect(store.loaded).toBe(false);
  });

  it('looks up a loaded library by id', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ libraries: LIBS })));
    const store = useLibrariesStore();
    await store.load('');
    expect(store.byId('tv')?.name).toBe('TV');
    expect(store.byId('missing')).toBeUndefined();
  });
});
