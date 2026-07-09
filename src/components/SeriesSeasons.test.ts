/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import SeriesSeasons from './SeriesSeasons.vue';
import { groupEpisodesBySeason } from './series-grouping';
import type { MediaItem } from '../types/media-item';
import { api } from '../api/client';

vi.mock('../api/client', () => ({
  api: {
    get: vi.fn(),
  },
}));

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

function mountAdmin(seasonsToUse = seasons, apiBase = 'https://server.test') {
  return mount(SeriesSeasons, {
    props: { seasons: seasonsToUse, apiBase },
    global: {
      provide: {
        auth: { isAdmin: true },
      },
    },
  });
}

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

  it('emits open (episode detail) when the episode title row is clicked', async () => {
    const w = mount(SeriesSeasons, { props: { seasons } });
    await w.find('.series-seasons__episode-main').trigger('click');
    // The row body opens the episode's info page; the play button still plays.
    expect((w.emitted('open')?.[0]?.[0] as MediaItem).id).toBe('s1e1');
    expect(w.emitted('play')).toBeFalsy();
  });

  it('renders nothing extra for an empty season list', () => {
    const w = mount(SeriesSeasons, { props: { seasons: [] } });
    expect(w.findAll('.series-seasons__season')).toHaveLength(0);
  });

  describe('admin file info', () => {
    it('does not show files button when user is not admin', () => {
      const w = mount(SeriesSeasons, { props: { seasons, apiBase: 'https://server.test' } });
      expect(w.find('.series-seasons__files-btn').exists()).toBe(false);
    });

    it('shows files button when admin and apiBase is provided', () => {
      const w = mountAdmin();
      expect(w.find('.series-seasons__files-btn').exists()).toBe(true);
    });

    it('files button has correct aria-label and title when collapsed', () => {
      const w = mountAdmin();
      const btn = w.find('.series-seasons__files-btn');
      expect(btn.attributes('aria-label')).toContain('Files info');
      expect(btn.attributes('title')).toBe('Expand files');
    });

    it('shows loading state when files button is clicked', async () => {
      vi.mocked(api.get).mockReturnValue(new Promise(() => {}));
      const w = mountAdmin();
      await w.find('.series-seasons__files-btn').trigger('click');
      expect(w.find('.series-seasons__files-detail').exists()).toBe(true);
      expect(w.find('.series-seasons__files-loading').exists()).toBe(true);
    });

    it('shows file info after successful fetch', async () => {
      vi.useFakeTimers();
      vi.mocked(api.get).mockResolvedValue({
        id: 's1e1',
        name: 'Pilot',
        type: 'episode',
        files: [
          { path: '/data/video.mkv', size_bytes: 25600000000, container: 'mkv', codec: 'h264', resolution: '1920x1080' },
        ],
      } as MediaItem);
      const w = mountAdmin();
      await w.find('.series-seasons__files-btn').trigger('click');
      await vi.advanceTimersByTime(0);
      await flushPromises();
      await nextTick();
      expect(w.find('.series-seasons__file-path').text()).toBe('/data/video.mkv');
      expect(w.find('.series-seasons__file-meta').text()).toContain('23.8 GB');
      expect(w.find('.series-seasons__file-meta').text()).toContain('mkv');
      expect(w.find('.series-seasons__file-meta').text()).toContain('1920x1080');
      vi.useRealTimers();
    });

    it('shows "No files" when episode has no files', async () => {
      vi.useFakeTimers();
      vi.mocked(api.get).mockResolvedValue({ id: 's1e1', name: 'Pilot', type: 'episode', files: [] } as unknown as MediaItem);
      const w = mountAdmin();
      await w.find('.series-seasons__files-btn').trigger('click');
      await vi.advanceTimersByTime(0);
      await flushPromises();
      await nextTick();
      expect(w.find('.series-seasons__files-empty').text()).toBe('No files');
      vi.useRealTimers();
    });

    it('shows "No files" when fetch fails', async () => {
      vi.useFakeTimers();
      vi.mocked(api.get).mockRejectedValue(new Error('Network error'));
      const w = mountAdmin();
      await w.find('.series-seasons__files-btn').trigger('click');
      await vi.advanceTimersByTime(0);
      await flushPromises();
      await nextTick();
      expect(w.find('.series-seasons__files-empty').text()).toBe('No files');
      vi.useRealTimers();
    });

    it('button title changes to "Collapse files" when expanded', async () => {
      vi.useFakeTimers();
      vi.mocked(api.get).mockResolvedValue({ id: 's1e1', name: 'Pilot', type: 'episode', files: [] } as unknown as MediaItem);
      const w = mountAdmin();
      await w.find('.series-seasons__files-btn').trigger('click');
      await vi.advanceTimersByTime(0);
      await flushPromises();
      await nextTick();
      expect(w.find('.series-seasons__files-btn').attributes('title')).toBe('Collapse files');
      vi.useRealTimers();
    });
  });
});
