import { describe, it, expect, vi } from 'vitest';
import { AdminDashboardApi } from './dashboard';
import type { ApiClient } from '../client';

function clientWith(get: ReturnType<typeof vi.fn>): ApiClient {
  return { get } as unknown as ApiClient;
}

const nowPlaying = {
  session_id: 'sess-1',
  user_id: 'u1',
  user_name: 'Alice',
  media_item_id: 'm1',
  media_title: 'Movie One',
  media_type: 'movie',
  progress_percent: 45,
  started_at: '2026-05-28T10:00:00Z',
};

const topUser = {
  user_id: 'u1',
  user_name: 'Alice',
  total_watch_time_seconds: 3661,
  play_count: 12,
  last_seen: '2026-05-28T10:00:00Z',
};

const topMedia = {
  media_item_id: 'm1',
  media_title: 'Movie One',
  media_type: 'movie',
  play_count: 42,
  total_duration_seconds: 7200,
  last_played_at: '2026-05-28T09:00:00Z',
};

const storageSummary = {
  media_type: 'movie',
  item_count: 150,
  total_bytes: 1_000_000_000_000,
  transcode_cache_bytes: 5_000_000_000,
};

const activityEvent = {
  id: 'evt-1',
  event_type: 'playback',
  user_id: 'u1',
  user_name: 'Alice',
  media_item_id: 'm1',
  media_title: 'Movie One',
  created_at: '2026-05-28T10:00:00Z',
  details: 'Started playback',
};

describe('AdminDashboardApi', () => {
  // -------------------------------------------------------------------------
  // Endpoints + unwrap
  // -------------------------------------------------------------------------

  it('getNowPlaying() GETs now-playing and unwraps { success, data }', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [nowPlaying] });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getNowPlaying();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/now-playing');
    expect(res).toEqual([nowPlaying]);
  });

  it('getNowPlaying() degrades to [] when data is not an array', async () => {
    const api = new AdminDashboardApi(clientWith(vi.fn().mockResolvedValue({ success: true })));
    expect(await api.getNowPlaying()).toEqual([]);
  });

  it('getTopUsers() passes limit + days query params', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [topUser] });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getTopUsers(5, 7);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-users', { limit: '5', days: '7' });
    expect(res).toEqual([topUser]);
  });

  it('getTopUsers() omits params when none are provided', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [topUser] });
    const api = new AdminDashboardApi(clientWith(get));
    await api.getTopUsers();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-users', undefined);
  });

  it('getTopMedia() passes limit + days query params', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [topMedia] });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getTopMedia(10, 30);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-media', { limit: '10', days: '30' });
    expect(res).toEqual([topMedia]);
  });

  it('getTopMedia() omits params when none are provided', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [topMedia] });
    const api = new AdminDashboardApi(clientWith(get));
    await api.getTopMedia();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-media', undefined);
  });

  it('getStorage() unwraps a bare data array', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [storageSummary] });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getStorage();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/storage');
    expect(res).toEqual([storageSummary]);
  });

  it('getStorage() unwraps the real server shape { data: { items: [...] } }', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: {
        movie_bytes: 1_000_000_000_000,
        transcode_cache_bytes: 5_000_000_000,
        items: [storageSummary],
        formatted_transcode_cache: '5 GB',
      },
    });
    const api = new AdminDashboardApi(clientWith(get));
    expect(await api.getStorage()).toEqual([storageSummary]);
  });

  it('getStorage() falls back to [] when the payload has no items array', async () => {
    const api = new AdminDashboardApi(clientWith(vi.fn().mockResolvedValue({ success: true, data: {} })));
    expect(await api.getStorage()).toEqual([]);
  });

  it('getActivity() passes the limit param', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [activityEvent] });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getActivity(20);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/activity', { limit: '20' });
    expect(res).toEqual([activityEvent]);
  });

  it('getActivity() omits the limit param when not provided', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [activityEvent] });
    const api = new AdminDashboardApi(clientWith(get));
    await api.getActivity();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/activity', undefined);
  });

  // -------------------------------------------------------------------------
  // Server→SPA field normalisation (DashboardService uses different names)
  // -------------------------------------------------------------------------

  it('getNowPlaying() normalises stream_id→session_id and username→user_name', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: [
        {
          stream_id: 'sess-1',
          user_id: 'u1',
          username: 'Alice',
          media_item_id: 'm1',
          media_title: 'Movie One',
          media_type: 'movie',
          progress_percent: 45,
        },
      ],
    });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getNowPlaying();
    expect(res[0]).toMatchObject({
      session_id: 'sess-1',
      user_name: 'Alice',
      media_title: 'Movie One',
      progress_percent: 45,
      started_at: '',
    });
  });

  it('getTopUsers() normalises username + total_watch_time and stringifies numeric input', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: [{ user_id: 'u1', username: 'Alice', total_watch_time: '3661', play_count: 12 }],
    });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getTopUsers();
    expect(res).toEqual([
      { user_id: 'u1', user_name: 'Alice', total_watch_time_seconds: 3661, play_count: 12, last_seen: '' },
    ]);
  });

  it('getTopMedia() normalises title→media_title, type→media_type, total_duration', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: [{ media_item_id: 'm1', title: 'Movie One', type: 'movie', play_count: 42, total_duration: 7200 }],
    });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getTopMedia();
    expect(res).toEqual([
      {
        media_item_id: 'm1',
        media_title: 'Movie One',
        media_type: 'movie',
        play_count: 42,
        total_duration_seconds: 7200,
        last_played_at: '',
      },
    ]);
  });

  it('getActivity() normalises occurred_at→created_at and pulls media fields out of details', async () => {
    const get = vi.fn().mockResolvedValue({
      success: true,
      data: [
        {
          id: 'e1',
          event_type: 'playback_completed',
          user_id: 'u1',
          username: 'Alice',
          occurred_at: '2026-05-28T10:00:00Z',
          details: { media_item_id: 'm9', media_title: 'Movie One', duration_seconds: 100 },
        },
      ],
    });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getActivity();
    expect(res[0]).toMatchObject({
      id: 'e1',
      user_name: 'Alice',
      media_item_id: 'm9',
      media_title: 'Movie One',
      created_at: '2026-05-28T10:00:00Z',
      details: '',
    });
  });

  it('getActivity() keeps a string details field verbatim', async () => {
    const get = vi.fn().mockResolvedValue({ success: true, data: [activityEvent] });
    const api = new AdminDashboardApi(clientWith(get));
    const res = await api.getActivity();
    expect(res[0].details).toBe('Started playback');
  });
});
