/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

// Mock the auth store so we control isLoggedIn + the client.get response. The real
// usePlayerStore is used so we assert the merge reaches the actual resume map.
const { get, state } = vi.hoisted(() => ({ get: vi.fn(), state: { loggedIn: true } }));
vi.mock('../stores/useAuthStore', () => ({
  useAuthStore: () => ({
    get isLoggedIn() {
      return state.loggedIn;
    },
    client: { get },
  }),
}));

import { useResumeSync } from './useResumeSync';
import { usePlayerStore } from '../stores/usePlayerStore';

beforeEach(() => {
  localStorage.clear();
  state.loggedIn = true;
  get.mockReset();
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

describe('useResumeSync', () => {
  it('fetches continue-watching, converts ticks→seconds, and merges into the resume map', async () => {
    get.mockResolvedValue({
      items: [
        { id: 'm1', position_ticks: 1_200_000_000 }, // 120s
        { id: 'm2', position_ticks: 45_000_000 }, // 4.5s → floor 4
      ],
    });
    const player = usePlayerStore();
    await useResumeSync().syncResume();

    expect(get).toHaveBeenCalledWith('/api/v1/users/me/continue-watching');
    expect(player.resumePositionFor('m1')).toBe(120);
    expect(player.resumePositionFor('m2')).toBe(4);
  });

  it('is a no-op (no request) when logged out', async () => {
    state.loggedIn = false;
    const player = usePlayerStore();
    await useResumeSync().syncResume();
    expect(get).not.toHaveBeenCalled();
    expect(player.resumeMap).toEqual({});
  });

  it('swallows a request failure and leaves the local map untouched', async () => {
    get.mockRejectedValue(new Error('offline'));
    const player = usePlayerStore();
    player.saveResume('local', 90, 600);
    await expect(useResumeSync().syncResume()).resolves.toBeUndefined();
    expect(player.resumePositionFor('local')).toBe(90);
  });

  it('skips rows missing an id, missing ticks, or with non-positive ticks', async () => {
    get.mockResolvedValue({
      items: [
        { position_ticks: 100_000_000 }, // no id
        { id: 'no-ticks' }, // no ticks
        { id: 'zero', position_ticks: 0 },
        { id: 'ok', position_ticks: 600_000_000 }, // 60s
      ],
    });
    const player = usePlayerStore();
    await useResumeSync().syncResume();
    expect(player.resumePositionFor('no-ticks')).toBeNull();
    expect(player.resumePositionFor('zero')).toBeNull();
    expect(player.resumePositionFor('ok')).toBe(60);
  });

  it('tolerates a response with no items array', async () => {
    get.mockResolvedValue({});
    const player = usePlayerStore();
    await expect(useResumeSync().syncResume()).resolves.toBeUndefined();
    expect(player.resumeMap).toEqual({});
  });
});
