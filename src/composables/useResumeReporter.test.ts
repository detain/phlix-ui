/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

const { post, state } = vi.hoisted(() => ({ post: vi.fn(), state: { loggedIn: true } }));
vi.mock('../stores/useAuthStore', () => ({
  useAuthStore: () => ({
    get isLoggedIn() {
      return state.loggedIn;
    },
    client: { post },
  }),
}));

import { useResumeReporter } from './useResumeReporter';
import { usePlayerStore } from '../stores/usePlayerStore';
import type { MediaItem } from '../types/media-item';

function media(id = 'm1'): MediaItem {
  return {
    id,
    name: `Movie ${id}`,
    type: 'movie',
    poster_url: null,
    genres: [],
    year: 2024,
    rating: 'PG-13',
    runtime: 120,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
  };
}

/** Put the store in a "meaningfully watching" state (past the 30s resume floor). */
function watching(position = 120, duration = 600) {
  const player = usePlayerStore();
  player.setCurrent(media('m1'));
  player.updateProgress(position, duration);
  player.play();
  return player;
}

beforeEach(() => {
  localStorage.clear();
  state.loggedIn = true;
  post.mockReset();
  post.mockResolvedValue({}); // default; session-create overridden per test
  vi.stubGlobal(
    'matchMedia',
    vi.fn((q: string) => ({
      matches: false,
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
  setActivePinia(createPinia());
});

describe('useResumeReporter', () => {
  it('creates a session then reports position in ticks', async () => {
    post.mockResolvedValueOnce({ session_id: 'sess-1' }); // POST /api/v1/sessions
    watching(120, 600);

    await useResumeReporter().report(true);

    expect(post).toHaveBeenCalledWith('/api/v1/sessions', expect.objectContaining({ device_id: expect.any(String) }));
    expect(post).toHaveBeenCalledWith('/api/v1/sessions/sess-1/progress', {
      media_item_id: 'm1',
      position_ticks: 120 * 10_000_000,
      duration_ticks: 600 * 10_000_000,
      is_paused: false,
    });
  });

  it('reuses the session for subsequent reports (creates it only once)', async () => {
    post.mockResolvedValueOnce({ session_id: 'sess-1' });
    watching(120, 600);
    const { report } = useResumeReporter();

    await report(true);
    await report(true);

    expect(post.mock.calls.filter((c) => c[0] === '/api/v1/sessions')).toHaveLength(1);
    expect(post.mock.calls.filter((c) => c[0] === '/api/v1/sessions/sess-1/progress')).toHaveLength(2);
  });

  it('is a no-op when logged out', async () => {
    state.loggedIn = false;
    watching(120, 600);
    await useResumeReporter().report(true);
    expect(post).not.toHaveBeenCalled();
  });

  it('does not report below the resume threshold or without media', async () => {
    const reporter = useResumeReporter();
    watching(20, 600); // 20s ≤ 30s floor
    await reporter.report(true);
    expect(post).not.toHaveBeenCalled();

    setActivePinia(createPinia()); // fresh store with no current media
    await useResumeReporter().report(true);
    expect(post).not.toHaveBeenCalled();
  });

  it('throttles un-forced reports within the window', async () => {
    post.mockResolvedValueOnce({ session_id: 'sess-1' });
    watching(120, 600);
    const { report } = useResumeReporter();
    await report(); // first proceeds
    await report(); // immediately after → throttled
    expect(post.mock.calls.filter((c) => c[0] === '/api/v1/sessions/sess-1/progress')).toHaveLength(1);
  });

  it('swallows request failures', async () => {
    post.mockRejectedValue(new Error('offline'));
    watching(120, 600);
    await expect(useResumeReporter().report(true)).resolves.toBeUndefined();
  });

  it('reports automatically when playback position advances', async () => {
    post.mockResolvedValueOnce({ session_id: 'sess-1' });
    const player = watching(120, 600);
    useResumeReporter(); // registers the position watch
    player.updateProgress(135, 600); // advance → watch fires report()
    await nextTick();
    await flushPromises();
    expect(post).toHaveBeenCalledWith(
      '/api/v1/sessions/sess-1/progress',
      expect.objectContaining({ position_ticks: 135 * 10_000_000 }),
    );
  });
});
