import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { MediaItem } from '../types/media-item';
import type { SeasonGroup } from '../components/series-grouping';
import { resolvePlayable, pickPlayableEpisode, type ResumeMap } from './useResolvePlayable';

function item(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'x',
    name: 'Item',
    type: 'movie',
    poster_url: null,
    genres: [],
    year: null,
    rating: null,
    runtime: null,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

function ep(over: Partial<MediaItem> = {}): MediaItem {
  return item({ type: 'episode', name: 'Episode', ...over });
}

/** Minimal fake ApiClient.get that returns a flat children list for parentId. */
function fakeClient(children: MediaItem[]) {
  const get = vi.fn(
    async (_endpoint: string, _params?: Record<string, string>, _signal?: AbortSignal) => ({
      items: children,
      total: children.length,
    }),
  );
  // The composable types `client` as ApiClient; only `.get` is exercised.
  return { client: { get } as unknown as Parameters<typeof resolvePlayable>[0], get };
}

const apiBase = 'https://example.test';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('pickPlayableEpisode (pure)', () => {
  function group(seasonNumber: number, episodes: MediaItem[]): SeasonGroup {
    return {
      key: `season-${seasonNumber}`,
      seasonNumber,
      label: `Season ${seasonNumber}`,
      isSpecials: false,
      episodes,
    };
  }

  it('returns null when there are no episodes', () => {
    expect(pickPlayableEpisode([], {})).toBeNull();
    expect(pickPlayableEpisode([group(1, [])], {})).toBeNull();
  });

  it('returns the first episode in playback order when nothing is in progress', () => {
    const groups = [
      group(2, [ep({ id: 's2e1', season_number: 2, episode_number: 1 })]),
      group(1, [
        ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
        ep({ id: 's1e2', season_number: 1, episode_number: 2 }),
      ]),
    ];
    expect(pickPlayableEpisode(groups, {})?.id).toBe('s1e1');
  });

  it('returns the resume-in-progress episode when one is recorded', () => {
    const groups = [
      group(1, [
        ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
        ep({ id: 's1e2', season_number: 1, episode_number: 2 }),
        ep({ id: 's1e3', season_number: 1, episode_number: 3 }),
      ]),
    ];
    const resume: ResumeMap = { s1e2: 600 };
    expect(pickPlayableEpisode(groups, resume)?.id).toBe('s1e2');
  });

  it('ignores zero/negative resume positions (treats them as not-in-progress)', () => {
    const groups = [
      group(1, [
        ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
        ep({ id: 's1e2', season_number: 1, episode_number: 2 }),
      ]),
    ];
    expect(pickPlayableEpisode(groups, { s1e2: 0 })?.id).toBe('s1e1');
  });

  it('excludes Specials from the playback order', () => {
    const groups: SeasonGroup[] = [
      { key: 'specials', seasonNumber: null, label: 'Specials', isSpecials: true, episodes: [ep({ id: 'sp1', season_number: 0, episode_number: 1 })] },
      group(1, [ep({ id: 's1e1', season_number: 1, episode_number: 1 })]),
    ];
    // Even with a resume on the special, only numbered seasons are playable order.
    expect(pickPlayableEpisode(groups, { sp1: 500 })?.id).toBe('s1e1');
  });
});

describe('resolvePlayable', () => {
  it('movie resolves to itself without fetching', async () => {
    const { client, get } = fakeClient([]);
    const m = item({ id: 'm1', type: 'movie' });
    await expect(resolvePlayable(client, apiBase, m, {})).resolves.toBe(m);
    expect(get).not.toHaveBeenCalled();
  });

  it('episode resolves to itself without fetching', async () => {
    const { client, get } = fakeClient([]);
    const e = ep({ id: 'e9', type: 'episode' });
    await expect(resolvePlayable(client, apiBase, e, {})).resolves.toBe(e);
    expect(get).not.toHaveBeenCalled();
  });

  it('audio resolves to itself', async () => {
    const { client } = fakeClient([]);
    const a = item({ id: 'a1', type: 'audio' });
    await expect(resolvePlayable(client, apiBase, a, {})).resolves.toBe(a);
  });

  it('image resolves to itself', async () => {
    const { client } = fakeClient([]);
    const im = item({ id: 'i1', type: 'image' });
    await expect(resolvePlayable(client, apiBase, im, {})).resolves.toBe(im);
  });

  it('series with a resume entry resolves to that episode', async () => {
    const children = [
      ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
      ep({ id: 's1e2', season_number: 1, episode_number: 2 }),
      ep({ id: 's1e3', season_number: 1, episode_number: 3 }),
    ];
    const { client } = fakeClient(children);
    const series = item({ id: 'sr1', type: 'series' });
    const resolved = await resolvePlayable(client, apiBase, series, { s1e2: 900 });
    expect(resolved?.id).toBe('s1e2');
  });

  it('series with no resume resolves to the first episode', async () => {
    const children = [
      ep({ id: 's1e2', season_number: 1, episode_number: 2 }),
      ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
    ];
    const { client } = fakeClient(children);
    const series = item({ id: 'sr1', type: 'series' });
    const resolved = await resolvePlayable(client, apiBase, series, {});
    expect(resolved?.id).toBe('s1e1');
  });

  it('empty series resolves to null', async () => {
    const { client } = fakeClient([]);
    const series = item({ id: 'sr1', type: 'series' });
    await expect(resolvePlayable(client, apiBase, series, {})).resolves.toBeNull();
  });

  it('season resolves to its first resume-in-progress episode, else its first', async () => {
    const children = [
      ep({ id: 's2e1', season_number: 2, episode_number: 1 }),
      ep({ id: 's2e2', season_number: 2, episode_number: 2 }),
    ];
    const { client } = fakeClient(children);
    const season = item({ id: 'se2', type: 'season' });

    // resume-in-progress wins
    await expect(
      resolvePlayable(client, apiBase, season, { s2e2: 120 }),
    ).resolves.toHaveProperty('id', 's2e2');

    // else first episode
    await expect(
      resolvePlayable(client, apiBase, season, {}),
    ).resolves.toHaveProperty('id', 's2e1');
  });

  it('threads the AbortSignal through to the client fetch', async () => {
    const { client, get } = fakeClient([ep({ id: 's1e1', season_number: 1, episode_number: 1 })]);
    const controller = new AbortController();
    const series = item({ id: 'sr1', type: 'series' });
    await resolvePlayable(client, apiBase, series, {}, controller.signal);
    expect(get).toHaveBeenCalled();
    // ApiClient.get(endpoint, params, signal) — the signal is the 3rd arg.
    expect(get.mock.calls[0][2]).toBe(controller.signal);
  });
});
