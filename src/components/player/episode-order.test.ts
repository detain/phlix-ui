/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import type { MediaItem } from '../../types/media-item';
import { orderEpisodes, orderEpisodesForPlayback, previousEpisode, nextEpisode } from './episode-order';

function ep(over: Partial<MediaItem> & { id: string }): MediaItem {
  return {
    name: over.id,
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
  } as MediaItem;
}

// A two-season series in scrambled input order (+ a special + a non-episode row).
const items: MediaItem[] = [
  ep({ id: 's2e2', season_number: 2, episode_number: 2 }),
  ep({ id: 's1e2', season_number: 1, episode_number: 2 }),
  ep({ id: 'sp1', season_number: 0, episode_number: 1 }), // Specials → last
  ep({ id: 's2e1', season_number: 2, episode_number: 1 }),
  ep({ id: 's1e1', season_number: 1, episode_number: 1 }),
  { ...ep({ id: 'series-row' }), type: 'series' }, // dropped by the grouping
];

describe('episode-order', () => {
  it('flattens to a whole-series order: seasons ascend, specials last, episodes by number', () => {
    expect(orderEpisodes(items).map((e) => e.id)).toEqual(['s1e1', 's1e2', 's2e1', 's2e2', 'sp1']);
  });

  it('Next rolls over from the last episode of a season into the first of the next', () => {
    const ordered = orderEpisodes(items);
    expect(nextEpisode(ordered, 's1e2')?.id).toBe('s2e1'); // cross-season rollover
  });

  it('Prev rolls back from the first episode of a season to the last of the previous', () => {
    const ordered = orderEpisodes(items);
    expect(previousEpisode(ordered, 's2e1')?.id).toBe('s1e2');
  });

  it('Prev is null on the very first episode, Next is null on the very last', () => {
    const ordered = orderEpisodes(items);
    expect(previousEpisode(ordered, 's1e1')).toBeNull();
    expect(nextEpisode(ordered, 'sp1')).toBeNull(); // sp1 is last (specials)
  });

  it('returns null for an id not in the ordered list', () => {
    const ordered = orderEpisodes(items);
    expect(previousEpisode(ordered, 'nope')).toBeNull();
    expect(nextEpisode(ordered, 'nope')).toBeNull();
  });
});

describe('orderEpisodesForPlayback (U2 — auto-advance chain excludes Specials)', () => {
  it('excludes season 0 / Specials and keeps numbered-season (season, episode) order', () => {
    // Same scrambled input, including the special sp1 (season 0) — playback drops it.
    expect(orderEpisodesForPlayback(items).map((e) => e.id)).toEqual(['s1e1', 's1e2', 's2e1', 's2e2']);
  });

  it('cross-season rollover holds for numbered seasons', () => {
    const ordered = orderEpisodesForPlayback(items);
    expect(nextEpisode(ordered, 's1e2')?.id).toBe('s2e1'); // last of S1 → first of S2
    expect(previousEpisode(ordered, 's2e1')?.id).toBe('s1e2');
  });

  it('Next off the series finale is disabled (Specials are NOT in the playback chain)', () => {
    const ordered = orderEpisodesForPlayback(items);
    expect(nextEpisode(ordered, 's2e2')).toBeNull(); // would have been sp1 in the display order
  });

  it('a Special is absent from the playback order entirely', () => {
    const ordered = orderEpisodesForPlayback(items);
    expect(ordered.some((e) => e.id === 'sp1')).toBe(false);
    // a Special has no prev/next in the playback chain (only reachable from the series page)
    expect(previousEpisode(ordered, 'sp1')).toBeNull();
    expect(nextEpisode(ordered, 'sp1')).toBeNull();
  });

  it('the DISPLAY ordering (orderEpisodes) is unchanged — still includes Specials last', () => {
    expect(orderEpisodes(items).map((e) => e.id)).toEqual(['s1e1', 's1e2', 's2e1', 's2e2', 'sp1']);
  });
});
