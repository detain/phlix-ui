import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SeriesSeasons from './SeriesSeasons.vue';
import { groupEpisodesBySeason } from './series-grouping';
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

const seasons = groupEpisodesBySeason([
  ep({ id: 's1e1', season_number: 1, episode_number: 1, episode_title: 'Pilot', runtime: 48 }),
  ep({ id: 's1e2', season_number: 1, episode_number: 2, episode_title: 'Cat in the Bag' }),
  ep({ id: 's2e1', season_number: 2, episode_number: 1, episode_title: 'Seven Thirty-Seven' }),
  ep({ id: 'sp1', season_number: 0, episode_number: 1, episode_title: 'Behind the Scenes' }),
]);

describe('SeriesSeasons', () => {
  it('renders one collapsible section per season with Specials last', () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    const labels = w.findAll('.series-seasons__season-label').map((n) => n.text());
    expect(labels).toEqual(['Season 1', 'Season 2', 'Specials']);
  });

  it('shows the episode count per season (pluralized)', () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    const counts = w.findAll('.series-seasons__season-count').map((n) => n.text());
    expect(counts[0]).toContain('2 episodes');
    expect(counts[1]).toContain('1 episode');
  });

  it('lists episodes with their number and title', () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    const titles = w.findAll('.series-seasons__episode-title').map((n) => n.text());
    expect(titles).toContain('1. Pilot');
    expect(titles).toContain('2. Cat in the Bag');
  });

  it('renders the runtime when present', () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    expect(w.html()).toContain('48m');
  });

  it('opens only the first season by default', () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    const details = w.findAll('details');
    expect(details[0].attributes('open')).toBeDefined();
    expect(details[1].attributes('open')).toBeUndefined();
  });

  it('opens every season when openFirstOnly is false', () => {
    const w = mount(SeriesSeasons, { props: { seasons, openFirstOnly: false } });
    w.findAll('details').forEach((d) => expect(d.attributes('open')).toBeDefined());
  });

  it('emits play with the episode when an episode play button is clicked', async () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    await w.find('.series-seasons__play').trigger('click');
    const emitted = w.emitted('play');
    expect(emitted).toBeTruthy();
    expect((emitted?.[0]?.[0] as MediaItem).id).toBe('s1e1');
  });

  it('emits play when the episode title row is clicked', async () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    await w.find('.series-seasons__episode-main').trigger('click');
    expect((w.emitted('play')?.[0]?.[0] as MediaItem).id).toBe('s1e1');
  });

  it('renders nothing extra for an empty season list', () => {
    const w = mount(SeriesSeasons, { props: { seasons: [] } });
    expect(w.findAll('.series-seasons__season')).toHaveLength(0);
  });
});
