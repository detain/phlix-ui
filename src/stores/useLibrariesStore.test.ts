/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLibrariesStore } from './useLibrariesStore';
import { ApiError } from '../api/errors';
import * as librariesApi from '../api/libraries';
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

describe('useLibrariesStore — errorCode (relay 503 codes)', () => {
  it('captures the ApiError body `code` alongside the message', async () => {
    // The hub relay proxy returns 503s whose body carries `{error, code}`;
    // `extractError` keeps only `error` as the message, so the store surfaces the
    // `code` separately for the page to map to an actionable string.
    vi.spyOn(librariesApi, 'fetchLibraries').mockRejectedValue(
      new ApiError('Relay tunnel unavailable', 503, { code: 'server.relay_unavailable' }),
    );
    const store = useLibrariesStore();
    await store.load('');
    expect(store.error).toBe('Relay tunnel unavailable');
    expect(store.errorCode).toBe('server.relay_unavailable');
  });

  it('leaves errorCode null for a plain (non-ApiError) failure', async () => {
    vi.spyOn(librariesApi, 'fetchLibraries').mockRejectedValue(new Error('boom'));
    const store = useLibrariesStore();
    await store.load('');
    expect(store.error).toContain('boom');
    expect(store.errorCode).toBeNull();
  });

  it('leaves errorCode null for an ApiError whose body has no code', async () => {
    vi.spyOn(librariesApi, 'fetchLibraries').mockRejectedValue(
      new ApiError('Server error', 500, { message: 'oops' }),
    );
    const store = useLibrariesStore();
    await store.load('');
    expect(store.errorCode).toBeNull();
  });

  it('resets errorCode to null on a subsequent successful (forced) load', async () => {
    const spy = vi.spyOn(librariesApi, 'fetchLibraries');
    spy.mockRejectedValueOnce(
      new ApiError('Server offline', 503, { code: 'server.offline' }),
    );
    const store = useLibrariesStore();
    await store.load('');
    expect(store.errorCode).toBe('server.offline');

    spy.mockResolvedValueOnce(LIBS);
    await store.load('', true);
    expect(store.errorCode).toBeNull();
    expect(store.error).toBeNull();
    expect(store.loaded).toBe(true);
  });
});
