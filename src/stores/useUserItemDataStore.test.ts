/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { nextTick } from 'vue';
import { useUserItemDataStore } from './useUserItemDataStore';
import { useProfileStore } from './useProfileStore';
import { useToastStore } from './useToastStore';
import { DEFAULT_MESSAGES } from '../i18n/messages';
import type { MediaDetail } from '../types/media-item';
import { isRoute } from '../test/route-match';

/**
 * The four per-item write routes this store posts to.
 *
 * S193: asserted with {@link isRoute} — the pathname must END WITH the route — rather
 * than `toContain('/api/v1/media/m1/favorite')`, which is also satisfied by
 * `/api/v1/media/m1/favorite-MUTATED`. `endsWith`, not `===`: the media base
 * legitimately prefixes the path on the hub.
 */
const favoritePath = (id: string): string => `/api/v1/media/${encodeURIComponent(id)}/favorite`;
const watchedPath = (id: string): string => `/api/v1/media/${encodeURIComponent(id)}/watched`;
const unwatchedPath = (id: string): string => `/api/v1/media/${encodeURIComponent(id)}/unwatched`;
const likePath = (id: string): string => `/api/v1/media/${encodeURIComponent(id)}/like`;

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
      store.hydrate(detail('m1', { favorite: true, rating: 7, like_level: 2, watched: true }));
      expect(store.isFavorite('m1')).toBe(true);
      expect(store.isWatched('m1')).toBe(true);
      expect(store.get('m1')).toEqual({ favorite: true, rating: 7, like_level: 2, watched: true });
    });

    it('defaults favorite=false, rating=null, like_level=0 when user_data is absent', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m2'));
      expect(store.isFavorite('m2')).toBe(false);
      expect(store.get('m2')).toEqual({ favorite: false, rating: null, like_level: 0, watched: false });
    });

    it('defaults when user_data is null', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m3', null));
      expect(store.get('m3')).toEqual({ favorite: false, rating: null, like_level: 0, watched: false });
    });

    it('defaults missing like_level to 0 while keeping favorite/rating', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m4', { favorite: true, rating: null }));
      expect(store.get('m4')).toEqual({ favorite: true, rating: null, like_level: 0, watched: false });
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
      expect(isRoute(url, favoritePath('m1'))).toBe(true);
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
      expect(isRoute(url, favoritePath('m1'))).toBe(true);
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
      // UI-m49 (review ui__webux): the action context speaks the catalog — the
      // exact English default plus the preserved error-detail suffix (the raw
      // `Failed to …` literals shipped untranslated to all six locales).
      expect(toastSpy.mock.calls[0]![0]).toBe(`${DEFAULT_MESSAGES.itemActions.favoriteAddError}: network down`);
    });

    it('rolls back a remove (back to favorited) and toasts on failure', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));
      const toasts = useToastStore();
      const toastSpy = vi.spyOn(toasts, 'error');
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: true, rating: null, like_level: 0 }));

      await store.toggleFavorite('m1', '');

      expect(store.isFavorite('m1')).toBe(true);
      // UI-m49 rotated (bug-encoding): exact catalog string, remove arm.
      expect(toastSpy.mock.calls[0]![0]).toBe(`${DEFAULT_MESSAGES.itemActions.favoriteRemoveError}: boom`);
    });

    it('preserves rating and like_level across a toggle', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })));
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: 9, like_level: 3 }));

      await store.toggleFavorite('m1', '');

      expect(store.get('m1')).toEqual({ favorite: true, rating: 9, like_level: 3, watched: false });
    });

    it('toggles an unknown id (defaulted entry → favorited)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })));
      const store = useUserItemDataStore();

      await store.toggleFavorite('fresh', '');

      expect(store.isFavorite('fresh')).toBe(true);
    });
  });

  describe('isWatched', () => {
    it('returns false for an unknown id', () => {
      const store = useUserItemDataStore();
      expect(store.isWatched('nope')).toBe(false);
    });

    it('reflects a hydrated watched flag', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: null, like_level: 0, watched: true }));
      expect(store.isWatched('m1')).toBe(true);
    });
  });

  describe('toggleWatched', () => {
    it('flips the getter synchronously (optimistic) before the API resolves', () => {
      const fetchMock = vi.fn().mockReturnValue(
        new Promise<Response>(() => {
          /* never resolves — proves the flip is synchronous */
        }),
      );
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      const p = store.toggleWatched('m1', '');
      expect(store.isWatched('m1')).toBe(true);
      void p;
    });

    it('POSTs /watched when marking watched and keeps the flag on success', async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' }));
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      await store.toggleWatched('m1', '');

      expect(store.isWatched('m1')).toBe(true);
      const [url, init] = fetchMock.mock.calls[0]!;
      expect(isRoute(url, watchedPath('m1'))).toBe(true);
      expect((init as RequestInit).method).toBe('POST');
    });

    it('POSTs /unwatched when clearing watched', async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' }));
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: null, like_level: 0, watched: true }));

      await store.toggleWatched('m1', '');

      expect(store.isWatched('m1')).toBe(false);
      const [url, init] = fetchMock.mock.calls[0]!;
      expect(isRoute(url, unwatchedPath('m1'))).toBe(true);
      expect((init as RequestInit).method).toBe('POST');
    });

    it('rolls back the optimistic flip and toasts on API failure', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
      const toasts = useToastStore();
      const toastSpy = vi.spyOn(toasts, 'error');
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      await store.toggleWatched('m1', '');

      expect(store.isWatched('m1')).toBe(false);
      expect(toastSpy).toHaveBeenCalledTimes(1);
      // UI-m49 rotated (loose containment → exact catalog string): mark-watched arm.
      expect(toastSpy.mock.calls[0]![0]).toBe(`${DEFAULT_MESSAGES.itemActions.markWatchedError}: network down`);
    });

    it('toasts the catalog unwatched-failure copy (UI-m49, new arm)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
      const toasts = useToastStore();
      const toastSpy = vi.spyOn(toasts, 'error');
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: null, like_level: 0, watched: true }));

      await store.toggleWatched('m1', '');

      expect(store.isWatched('m1')).toBe(true);
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy.mock.calls[0]![0]).toBe(`${DEFAULT_MESSAGES.itemActions.markUnwatchedError}: network down`);
    });

    it('preserves favorite/rating/like_level across a watched toggle', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })));
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: true, rating: 9, like_level: 3 }));

      await store.toggleWatched('m1', '');

      expect(store.get('m1')).toEqual({ favorite: true, rating: 9, like_level: 3, watched: true });
    });
  });

  describe('likeLevel', () => {
    it('returns 0 for an unknown id', () => {
      const store = useUserItemDataStore();
      expect(store.likeLevel('nope')).toBe(0);
    });

    it('reflects a hydrated like_level', () => {
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: null, like_level: 2 }));
      expect(store.likeLevel('m1')).toBe(2);
    });
  });

  describe('setLike', () => {
    it('sets the level synchronously (optimistic) before the API resolves', () => {
      const fetchMock = vi.fn().mockReturnValue(
        new Promise<Response>(() => {
          /* never resolves — proves the set is synchronous */
        }),
      );
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      const p = store.setLike('m1', 1, '');
      expect(store.likeLevel('m1')).toBe(1);
      void p;
    });

    it('PUTs the requested level exactly once', async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: 'Rating saved' }));
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      await store.setLike('m1', 2, '');

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0]!;
      expect(isRoute(url, likePath('m1'))).toBe(true);
      expect((init as RequestInit).method).toBe('PUT');
      expect((init as RequestInit).body).toBe(JSON.stringify({ level: 2 }));
      expect(store.likeLevel('m1')).toBe(2);
    });

    it('accepts the full −2..2 axis (like, love, dislike, strongly dislike, clear)', async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' }));
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      for (const level of [1, 2, -1, -2, 0]) {
        await store.setLike('m1', level, '');
        expect(store.likeLevel('m1')).toBe(level);
      }
      expect((fetchMock.mock.calls[2]![1] as RequestInit).body).toBe(JSON.stringify({ level: -1 }));
      expect((fetchMock.mock.calls[3]![1] as RequestInit).body).toBe(JSON.stringify({ level: -2 }));
    });

    it('clamps out-of-range levels into −2..2 before caching + persisting', async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' }));
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1'));

      await store.setLike('m1', 9, '');
      expect(store.likeLevel('m1')).toBe(2);
      expect((fetchMock.mock.calls[0]![1] as RequestInit).body).toBe(JSON.stringify({ level: 2 }));

      await store.setLike('m1', -9, '');
      expect(store.likeLevel('m1')).toBe(-2);
      expect((fetchMock.mock.calls[1]![1] as RequestInit).body).toBe(JSON.stringify({ level: -2 }));
    });

    it('rolls back to the prior level and toasts on API failure', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
      const toasts = useToastStore();
      const toastSpy = vi.spyOn(toasts, 'error');
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: null, like_level: 2 }));

      await store.setLike('m1', -1, '');

      // 2 → −1 optimistically, then rolled back to 2 on the rejected write.
      expect(store.likeLevel('m1')).toBe(2);
      expect(toastSpy).toHaveBeenCalledTimes(1);
      // UI-m49 rotated (loose containment → exact catalog string): rating arm.
      expect(toastSpy.mock.calls[0]![0]).toBe(`${DEFAULT_MESSAGES.itemActions.ratingSaveError}: network down`);
    });

    it('preserves favorite and rating across a rating change', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })));
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: true, rating: 9, like_level: 1 }));

      await store.setLike('m1', 2, '');

      expect(store.get('m1')).toEqual({ favorite: true, rating: 9, like_level: 2, watched: false });
    });

    it('rates an unknown id from the default 0', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })));
      const store = useUserItemDataStore();

      await store.setLike('fresh', -1, '');

      expect(store.likeLevel('fresh')).toBe(-1);
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

  // S82 — per-item favorite/watched flags are scoped to the ACTIVE PROFILE
  // server-side, so a real profile swap must drop the whole cache. This proves
  // the `useProfileStore.epoch` wiring end-to-end: a completed switch (which
  // bumps `epoch` only on an id→different-id change) clears entries, and the
  // same-profile no-op switch does NOT needlessly wipe it.
  describe('profile-scope invalidation (S82)', () => {
    beforeEach(() => {
      localStorage.setItem('access_token', 'AT');
      localStorage.setItem('refresh_token', 'RT');
    });

    function profilesFetch(activeId: string) {
      return vi.fn(async (rawUrl: unknown, init?: { method?: string }) => {
        const url = String(rawUrl);
        const method = (init?.method ?? 'GET').toUpperCase();
        if (method === 'POST' && isRoute(url, '/api/v1/profiles/p2/switch')) {
          return jsonResponse({
            access_token: 'AT2',
            refresh_token: 'RT2',
            profile_id: 'p2',
            token_type: 'Bearer',
            expires_in: 3600,
            user: { id: 'u1', is_admin: false },
          });
        }
        if (method === 'GET' && isRoute(url, '/api/v1/profiles')) {
          return jsonResponse({
            profiles: [
              { id: 'p1', name: 'Alice', is_active: activeId === 'p1' },
              { id: 'p2', name: 'Kids', is_active: activeId === 'p2' },
            ],
          });
        }
        throw new Error(`unstubbed: ${method} ${url}`);
      });
    }

    it('a completed profile switch clears the item-data cache', async () => {
      const profiles = useProfileStore();
      const store = useUserItemDataStore();
      vi.stubGlobal('fetch', profilesFetch('p1'));
      await profiles.load();
      store.hydrate(detail('m1', { favorite: true, rating: 8, like_level: 1 }));
      expect(store.isFavorite('m1')).toBe(true);

      // Pre-switch, the SAME-profile no-op must NOT clear (epoch unchanged).
      expect(await profiles.switchTo('p1')).toBe(true);
      expect(store.isFavorite('m1')).toBe(true);

      // The real p1 → p2 swap bumps epoch → the watcher drops the map (the
      // pre-flush watcher runs within the awaited switch's microtask turn).
      expect(await profiles.switchTo('p2')).toBe(true);
      await nextTick();
      expect(store.entries.size).toBe(0);
      expect(store.isFavorite('m1')).toBe(false);
    });
  });

  // UI-m48 (review ui__webux): each toggle snapshotted its OWN pre-flip value
  // for rollback. With overlapping writes that snapshot can be two commits
  // stale — the cache lands on a value the server never held. The cure keeps a
  // per-item last-known-SERVER record (hydrate + every successful write feed
  // it) and rolls back to it, falling back to the old snapshot only when the
  // server has never spoken about the item.
  describe('UI-m48 — rollback lands on server truth, not a stale snapshot', () => {
    it('a late failure after two successful overlapping toggles restores the SERVER value', async () => {
      let lateReject: (reason: unknown) => void = () => {};
      const slow = new Promise<Response>((_resolve, reject) => {
        lateReject = reject;
      });
      const fetchMock = vi
        .fn()
        .mockImplementationOnce(() => slow) // A: false→true — hangs, will fail last
        .mockResolvedValueOnce(jsonResponse({ message: 'ok' })) // B: true→false — lands
        .mockResolvedValueOnce(jsonResponse({ message: 'ok' })); // C: false→true — lands
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: null, like_level: 0 }));

      const pending = store.toggleFavorite('m1', ''); // A (its snapshot: false)
      await store.toggleFavorite('m1', ''); // B → server false
      await store.toggleFavorite('m1', ''); // C → server true
      expect(store.isFavorite('m1')).toBe(true);

      lateReject(new Error('network down'));
      await pending; // A's rollback fires now

      // Server truth is TRUE (C). The old code restored A's stale snapshot
      // (false) — cache diverging from the server until the next hydrate.
      expect(store.isFavorite('m1')).toBe(true);
    });

    it('a late like_level failure rolls back to the server-confirmed level', async () => {
      let lateReject: (reason: unknown) => void = () => {};
      const slow = new Promise<Response>((_resolve, reject) => {
        lateReject = reject;
      });
      const fetchMock = vi
        .fn()
        .mockImplementationOnce(() => slow) // A: 0→2 — will fail last
        .mockResolvedValueOnce(jsonResponse({ message: 'ok' })); // B: 2→1 — lands
      vi.stubGlobal('fetch', fetchMock);
      const store = useUserItemDataStore();
      store.hydrate(detail('m1', { favorite: false, rating: null, like_level: 0 }));

      const pending = store.setLike('m1', 2, ''); // A (its snapshot: 0)
      await store.setLike('m1', 1, ''); // B → server 1

      lateReject(new Error('network down'));
      await pending; // A's rollback fires now

      // Server truth is 1; the old code restored A's stale snapshot (0).
      expect(store.likeLevel('m1')).toBe(1);
    });

    it('with no server record yet, rollback falls back to the pre-flip snapshot (old law held)', async () => {
      // Never hydrated: the server has never spoken about this item, so the
      // pre-flip snapshot IS the best-known value — the cure must not invent a
      // phantom default beyond it. GREEN at parent by design (fallback arm).
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
      const toasts = useToastStore();
      vi.spyOn(toasts, 'error');
      const store = useUserItemDataStore();

      await store.toggleFavorite('m1', '');

      expect(store.isFavorite('m1')).toBe(false);
    });
  });
});
