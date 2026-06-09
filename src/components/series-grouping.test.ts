import { describe, it, expect } from 'vitest';
import { groupEpisodesBySeason, hasSeasonRows, firstEpisode } from './series-grouping';
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
