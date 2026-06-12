import { describe, it, expect } from 'vitest';
import {
  groupEpisodesBySeason,
  hasSeasonRows,
  firstEpisode,
  seasonRouteParam,
  findSeasonByParam,
} from './series-grouping';
import type { MediaItem } from '../types/media-item';

function ep(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'e',
    name: 'Episode',
    type: 'episode',
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

describe('groupEpisodesBySeason', () => {
  it('groups episodes by season number and orders seasons ascending', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 's2e1', season_number: 2, episode_number: 1 }),
      ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
      ep({ id: 's1e2', season_number: 1, episode_number: 2 }),
    ]);
    expect(groups.map((g) => g.label)).toEqual(['Season 1', 'Season 2']);
    expect(groups[0].episodes.map((e) => e.id)).toEqual(['s1e1', 's1e2']);
    expect(groups[1].episodes.map((e) => e.id)).toEqual(['s2e1']);
  });

  it('orders episodes within a season by episode number regardless of input order', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 'e3', season_number: 1, episode_number: 3 }),
      ep({ id: 'e1', season_number: 1, episode_number: 1 }),
      ep({ id: 'e2', season_number: 1, episode_number: 2 }),
    ]);
    expect(groups[0].episodes.map((e) => e.id)).toEqual(['e1', 'e2', 'e3']);
  });

  it('buckets season 0 and missing season numbers into Specials, placed last', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 'sp1', season_number: 0, episode_number: 1 }),
      ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
      ep({ id: 'spX', season_number: null, episode_number: 2 }),
    ]);
    expect(groups.map((g) => g.label)).toEqual(['Season 1', 'Specials']);
    const specials = groups[groups.length - 1];
    expect(specials.isSpecials).toBe(true);
    expect(specials.seasonNumber).toBeNull();
    // both the season-0 and the null-season episode land in Specials
    expect(specials.episodes.map((e) => e.id).sort()).toEqual(['sp1', 'spX']);
  });

  it('orders episodes with a missing episode number last, then by title', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 'none', season_number: 1, episode_number: null, episode_title: 'Zeta' }),
      ep({ id: 'e1', season_number: 1, episode_number: 1 }),
    ]);
    expect(groups[0].episodes.map((e) => e.id)).toEqual(['e1', 'none']);
  });

  it('ignores series and season container rows (they are grouping, not content)', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 'series', type: 'series' }),
      ep({ id: 'season', type: 'season', season_number: 1 }),
      ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].episodes.map((e) => e.id)).toEqual(['s1e1']);
  });

  it('treats an item carrying an episode_number as an episode even if type is unset (movie)', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 'x', type: 'movie', season_number: 1, episode_number: 4 }),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].episodes.map((e) => e.id)).toEqual(['x']);
  });

  it('reports a singular/plural-friendly count via episodes length', () => {
    const groups = groupEpisodesBySeason([ep({ season_number: 1, episode_number: 1 })]);
    expect(groups[0].episodes).toHaveLength(1);
  });

  it('returns an empty list when there are no episodes', () => {
    expect(groupEpisodesBySeason([])).toEqual([]);
    expect(groupEpisodesBySeason([ep({ type: 'series' })])).toEqual([]);
  });
});

describe('hasSeasonRows', () => {
  it('detects explicit season-type rows', () => {
    expect(hasSeasonRows([ep({ type: 'season' }), ep()])).toBe(true);
    expect(hasSeasonRows([ep(), ep({ type: 'episode' })])).toBe(false);
  });
});

describe('firstEpisode', () => {
  it('returns the first episode across seasons in display order', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 's2e1', season_number: 2, episode_number: 1 }),
      ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
    ]);
    expect(firstEpisode(groups)?.id).toBe('s1e1');
  });

  it('returns null when no season has episodes', () => {
    expect(firstEpisode([])).toBeNull();
  });
});

describe('season metadata (U3)', () => {
  it('attaches the season poster/overview from season container rows passed as seasonRows', () => {
    const seasonRows = [
      ep({ id: 'se1', type: 'season', season_number: 1, poster_url: 'p1.jpg', overview: 'S1 overview' }),
    ];
    const groups = groupEpisodesBySeason(
      [ep({ id: 's1e1', season_number: 1, episode_number: 1 })],
      seasonRows,
    );
    expect(groups[0].seasonPoster).toBe('p1.jpg');
    expect(groups[0].seasonItem?.overview).toBe('S1 overview');
  });

  it('picks up season container rows present in the items list too', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 'se1', type: 'season', season_number: 1, poster_url: 'p1.jpg' }),
      ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
    ]);
    expect(groups[0].seasonPoster).toBe('p1.jpg');
  });

  it('leaves seasonPoster null when there is no container row', () => {
    const groups = groupEpisodesBySeason([ep({ id: 's1e1', season_number: 1, episode_number: 1 })]);
    expect(groups[0].seasonPoster).toBeNull();
    expect(groups[0].seasonItem).toBeNull();
  });
});

describe('seasonRouteParam', () => {
  it('uses the season number, and 0 for Specials', () => {
    const groups = groupEpisodesBySeason([
      ep({ id: 's2e1', season_number: 2, episode_number: 1 }),
      ep({ id: 'sp1', season_number: 0, episode_number: 1 }),
    ]);
    expect(seasonRouteParam(groups[0])).toBe('2'); // Season 2
    expect(seasonRouteParam(groups[1])).toBe('0'); // Specials
  });
});

describe('findSeasonByParam', () => {
  const groups = groupEpisodesBySeason([
    ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
    ep({ id: 's2e1', season_number: 2, episode_number: 1 }),
    ep({ id: 'sp1', season_number: 0, episode_number: 1 }),
  ]);

  it('finds a season by its numeric param', () => {
    expect(findSeasonByParam(groups, '2')?.seasonNumber).toBe(2);
    expect(findSeasonByParam(groups, 1)?.seasonNumber).toBe(1);
  });

  it('maps 0 to the Specials bucket', () => {
    expect(findSeasonByParam(groups, '0')?.isSpecials).toBe(true);
  });

  it('returns null for a season number that does not exist', () => {
    expect(findSeasonByParam(groups, '99')).toBeNull();
  });

  it('maps a non-numeric / empty param to the Specials bucket (target null)', () => {
    // A non-numeric param parses to NaN → target null → the Specials bucket
    // (when one exists); a series with no Specials yields null instead, which
    // the page renders as a "season not found" empty state.
    expect(findSeasonByParam(groups, 'abc')?.isSpecials).toBe(true);
    const noSpecials = groupEpisodesBySeason([ep({ id: 's1e1', season_number: 1, episode_number: 1 })]);
    expect(findSeasonByParam(noSpecials, 'abc')).toBeNull();
  });
});
