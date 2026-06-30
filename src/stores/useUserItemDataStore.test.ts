import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserItemDataStore } from './useUserItemDataStore';
import { useToastStore } from './useToastStore';
import type { MediaDetail } from '../types/media-item';

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/** Minimal MediaDetail factory — only the fields the store reads. */
function detail(id: string, user_data?: MediaDetail['user_data']): MediaDetail {
  return { id, user_data } as unknown as MediaDetail;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('useUserItemDataStore', () => {
  describe('hydrate', () => {
    it('seeds the entry from the item user_data', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: true, rating: 7, like_level: 2 }));
      expect(store.isFavorite('m1')).toBe(true);
      expect(store.get('m1')).toEqual({ favorite: true, rating: 7, like_level: 2 });
    });

    it('defaults favorite=false, rating=null, like_level=0 when user_data is absent', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m2'));
      expect(store.isFavorite('m2')).toBe(false);
      expect(store.get('m2')).toEqual({ favorite: false, rating: null, like_level: 0 });
    });

    it('defaults when user_data is null', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m3', null));
      expect(store.get('m3')).toEqual({ favorite: false, rating: null, like_level: 0 });
    });

    it('defaults missing like_level to 0 while keeping favorite/rating', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m4', { favorite: true, rating: null }));
      expect(store.get('m4')).toEqual({ favorite: true, rating: null, like_level: 0 });
    });

    it('ignores a null/undefined item', () => {
      const store = useUserItemDataStore();
      expect(() => store.hydrate(null)).not.toThrow();
      expect(() => store.hydrate(undefined)).not.toThrow();
      expect(store.entries.size).toBe(0);
    });
  });

  describe('isFavorite', () => {
    it('returns false for an unknown id', () => {
      const store = useUserItemDataStore();
      expect(store.isFavorite('nope')).toBe(false);
    });
  });

  describe('toggleFavorite', () => {
    it('flips the getter synchronously (optimistic) before the API resolves', () => {
      const fetchMock = vi.fn().mockReturnValue(
        new Promise<Response>(() => {
          /* never resolves — proves the flip is synchronous */
        }),
      );
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      const p = store.toggleFavorite('m1', '');
      // Synchronously visible, before awaiting the promise.
      expect(store.isFavorite('m1')).toBe(true);
      void p;
    });

    it('calls addFavorite (POST) when favoriting and keeps the flag on success', async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: 'Added to favorites' }));
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      await store.toggleFavorite('m1', '');

      expect(store.isFavorite('m1')).toBe(true);
      const [url, init] = fetchMock.mock.calls[0]!;
      expect(url).toContain('/api/v1/media/m1/favorite');
      expect((init as RequestInit).method).toBe('POST');
    });

    it('calls removeFavorite (DELETE) when un-favoriting', async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: 'Removed from favorites' }));
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: true, rating: null, like_level: 0 }));

      await store.toggleFavorite('m1', '');

      expect(store.isFavorite('m1')).toBe(false);
      const [url, init] = fetchMock.mock.calls[0]!;
      expect(url).toContain('/api/v1/media/m1/favorite');
      expect((init as RequestInit).method).toBe('DELETE');
    });

    it('rolls back the optimistic flip and surfaces a toast on API failure', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
      const toasts = useToastStore();
      const toastSpy = vi.spyOn(toasts, 'error');
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      await store.toggleFavorite('m1', '');

      // Rolled back to the original (false) state.
      expect(store.isFavorite('m1')).toBe(false);
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy.mock.calls[0]![0]).toContain('add to favorites');
    });

    it('rolls back a remove (back to favorited) and toasts on failure', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));
      const toasts = useToastStore();
      const toastSpy = vi.spyOn(toasts, 'error');
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: true, rating: null, like_level: 0 }));

      await store.toggleFavorite('m1', '');

      expect(store.isFavorite('m1')).toBe(true);
      expect(toastSpy.mock.calls[0]![0]).toContain('remove from favorites');
    });

    it('preserves rating and like_level across a toggle', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })));
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: 9, like_level: 3 }));

      await store.toggleFavorite('m1', '');

      expect(store.get('m1')).toEqual({ favorite: true, rating: 9, like_level: 3 });
    });

    it('toggles an unknown id (defaulted entry → favorited)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })));
      const store = useUserItemDataStore();

      await store.toggleFavorite('fresh', '');

      expect(store.isFavorite('fresh')).toBe(true);
    });
  });

  describe('reset', () => {
    it('clears the cache', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: true, rating: null, like_level: 0 }));
      store.reset();
      expect(store.entries.size).toBe(0);
      expect(store.isFavorite('m1')).toBe(false);
    });
  });
});
