import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import DashboardPage from './DashboardPage.vue';
import Select from '../../components/ui/Select.vue';
import Button from '../../components/ui/Button.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

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
  last_seen: '',
};
const topMedia = {
  media_item_id: 'm1',
  media_title: 'Movie One',
  media_type: 'series',
  play_count: 42,
  total_duration_seconds: 7200,
  last_played_at: '',
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
  created_at: new Date().toISOString(),
  details: 'Started playback',
};

interface Overrides {
  nowPlaying?: unknown[];
  topUsers?: unknown[];
  topMedia?: unknown[];
  storage?: unknown[];
  activity?: unknown[];
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string, params?: Record<string, string>) => {
    if (endpoint === '/api/v1/admin/dashboard/now-playing') {
      return { success: true, data: over.nowPlaying ?? [nowPlaying] };
    }
    if (endpoint === '/api/v1/admin/dashboard/top-users') {
      return { success: true, data: over.topUsers ?? [topUser] };
    }
    if (endpoint === '/api/v1/admin/dashboard/top-media') {
      return { success: true, data: over.topMedia ?? [topMedia] };
    }
    if (endpoint === '/api/v1/admin/dashboard/storage') {
      return { success: true, data: { items: over.storage ?? [storageSummary] } };
    }
    if (endpoint === '/api/v1/admin/dashboard/activity') {
      const limit = Number(params?.limit ?? '20');
      // Return a full page (20) so "load more" stays enabled.
      const events = over.activity ?? Array.from({ length: limit }, (_, i) => ({ ...activityEvent, id: `evt-${i}` }));
      return { success: true, data: events };
    }
    throw new Error(`unexpected ${endpoint}`);
  });
  return { client: { get } as unknown as ApiClient, get };
}

function mountPage(client: ApiClient) {
  return mount(DashboardPage, {
    props: { client },
    attachTo: document.body,
    global: { stubs: { RouterLink: RouterLinkStub } },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Admin DashboardPage', () => {
  it('renders all five cards from the mocked data', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();

    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/now-playing');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/storage');

    const text = w.text();
    expect(text).toContain('Now Playing');
    expect(text).toContain('Top Users');
    expect(text).toContain('Top Media');
    expect(text).toContain('Storage');
    expect(text).toContain('Recent Activity');

    // Now Playing renders a progress bar + the session user.
    expect(w.find('[role="progressbar"]').exists()).toBe(true);
    expect(text).toContain('Alice');
    // Top users watch time formatted "1h 1m" (3661s).
    expect(text).toContain('1h 1m');
    // Storage formats bytes + item count.
    expect(text).toContain('150 items');
    w.unmount();
  });

  it('links each top-media row title to the media detail page', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const links = w.findAllComponents(RouterLinkStub);
    const mediaLink = links.find((l) => l.props('to') === `/app/media/${topMedia.media_item_id}`);
    expect(mediaLink).toBeTruthy();
    expect(mediaLink!.text()).toContain('Movie One');
    w.unmount();
  });

  it('requests top-users + top-media with the default 30-day range', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-users', { limit: '10', days: '30' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-media', { limit: '10', days: '30' });
    w.unmount();
  });

  it('refetches top users + media when the date range changes', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    w.findComponent(Select).vm.$emit('update:modelValue', 7);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-users', { limit: '10', days: '7' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/top-media', { limit: '10', days: '7' });
    w.unmount();
  });

  it('shows empty states when sections return no data', async () => {
    const { client } = makeClient({
      nowPlaying: [],
      topUsers: [],
      topMedia: [],
      storage: [],
      activity: [],
    });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('No active sessions');
    expect(text).toContain('No user data yet');
    expect(text).toContain('No media data yet');
    expect(text).toContain('No storage data');
    expect(text).toContain('No recent activity');
    w.unmount();
  });

  it('loads more activity when the button is clicked', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const activityCalls = () =>
      get.mock.calls.filter((c) => c[0] === '/api/v1/admin/dashboard/activity').length;
    const before = activityCalls();
    const loadMore = w.findAllComponents(Button).find((b) => b.text().includes('Load more'));
    expect(loadMore).toBeTruthy();
    await loadMore!.trigger('click');
    await flushPromises();
    expect(activityCalls()).toBeGreaterThan(before);
    // Second page requests a larger limit (existing length + page size).
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dashboard/activity', { limit: '40' });
    w.unmount();
  });

  it('auto-refreshes now playing on a 30s interval and stops on unmount', async () => {
    vi.useFakeTimers();
    const { client, get } = makeClient();
    const w = mountPage(client);
    await vi.advanceTimersByTimeAsync(0);
    const npCalls = () =>
      get.mock.calls.filter((c) => c[0] === '/api/v1/admin/dashboard/now-playing').length;
    const before = npCalls();
    await vi.advanceTimersByTimeAsync(30_000);
    expect(npCalls()).toBeGreaterThan(before);
    const afterOne = npCalls();
    w.unmount();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(npCalls()).toBe(afterOne);
  });

  it('shows an in-body error state per section (+ toasts) when sections fail to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    const text = w.text();
    // Each section renders its own in-body error (with the error message) instead
    // of falling through to the misleading empty state.
    expect(text).toContain("Couldn't load now playing");
    expect(text).toContain("Couldn't load top users");
    expect(text).toContain("Couldn't load top media");
    expect(text).toContain("Couldn't load storage");
    expect(text).toContain("Couldn't load activity");
    expect(text).toContain('boom');
    expect(text).not.toContain('No active sessions');
    expect(text).not.toContain('No recent activity');
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
    w.unmount();
  });

  it('raises a separate toast (and in-body error) for every failing section', async () => {
    // Reject with a non-Error so errMessage falls back to each section's copy
    // (an Error would surface its own message instead).
    const get = vi.fn().mockRejectedValue('boom');
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    const messages = toasts.toasts.map((t) => t.message);
    expect(messages).toContain('Failed to load now playing.');
    expect(messages).toContain('Failed to load top users.');
    expect(messages).toContain('Failed to load top media.');
    expect(messages).toContain('Failed to load storage.');
    expect(messages).toContain('Failed to load activity.');
    w.unmount();
  });

  it('retries a failed section from its in-body error state', async () => {
    let npCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/dashboard/now-playing') {
        npCalls += 1;
        if (npCalls === 1) throw new Error('np boom');
        return { success: true, data: [nowPlaying] };
      }
      if (endpoint === '/api/v1/admin/dashboard/storage') return { success: true, data: { items: [storageSummary] } };
      if (endpoint === '/api/v1/admin/dashboard/top-users') return { success: true, data: [topUser] };
      if (endpoint === '/api/v1/admin/dashboard/top-media') return { success: true, data: [topMedia] };
      if (endpoint === '/api/v1/admin/dashboard/activity') return { success: true, data: [activityEvent] };
      throw new Error(`unexpected ${endpoint}`);
    });
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    // Only Now Playing failed → one Retry button on the page.
    expect(w.text()).toContain("Couldn't load now playing");
    const retry = w.findAllComponents(Button).find((b) => b.text().trim() === 'Retry');
    expect(retry).toBeTruthy();
    await retry!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load now playing");
    expect(w.find('[role="progressbar"]').exists()).toBe(true);
    w.unmount();
  });

  it('keeps the loaded activity list (toast only, no in-body error) when load-more fails', async () => {
    let actCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/dashboard/activity') {
        actCalls += 1;
        if (actCalls === 1) {
          return { success: true, data: Array.from({ length: 20 }, (_, i) => ({ ...activityEvent, id: `a-${i}` })) };
        }
        throw new Error('more boom'); // the append (load-more) fails
      }
      if (endpoint === '/api/v1/admin/dashboard/now-playing') return { success: true, data: [nowPlaying] };
      if (endpoint === '/api/v1/admin/dashboard/storage') return { success: true, data: { items: [storageSummary] } };
      if (endpoint === '/api/v1/admin/dashboard/top-users') return { success: true, data: [topUser] };
      if (endpoint === '/api/v1/admin/dashboard/top-media') return { success: true, data: [topMedia] };
      throw new Error(`unexpected ${endpoint}`);
    });
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    const loadMore = w.findAllComponents(Button).find((b) => b.text().includes('Load more'));
    await loadMore!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'more boom')).toBe(true);
    // The already-loaded list is preserved; no in-body error wipes the activity card.
    expect(w.find('[aria-labelledby="act-heading"]').text()).not.toContain("Couldn't load activity");
    expect(w.find('.admin-dash__activity-list').exists()).toBe(true);
    w.unmount();
  });

  it('hides the load-more button when a short activity page returns', async () => {
    // A page shorter than ACTIVITY_PAGE_SIZE (20) ⇒ activityHasMore = false.
    const { client } = makeClient({
      activity: Array.from({ length: 5 }, (_, i) => ({ ...activityEvent, id: `evt-${i}` })),
    });
    const w = mountPage(client);
    await flushPromises();
    const loadMore = w.findAllComponents(Button).find((b) => b.text().includes('Load more'));
    expect(loadMore).toBeUndefined();
    w.unmount();
  });

  it('disables further loading once load-more returns a short page', async () => {
    // First page is full (20) so the button shows; the appended page is short,
    // which flips activityHasMore false and removes the button.
    let call = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/dashboard/activity') {
        call += 1;
        const len = call === 1 ? 20 : 3;
        return {
          success: true,
          data: Array.from({ length: len }, (_, i) => ({ ...activityEvent, id: `a${call}-${i}` })),
        };
      }
      if (endpoint === '/api/v1/admin/dashboard/storage') {
        return { success: true, data: { items: [storageSummary] } };
      }
      if (endpoint === '/api/v1/admin/dashboard/now-playing') return { success: true, data: [nowPlaying] };
      if (endpoint === '/api/v1/admin/dashboard/top-users') return { success: true, data: [topUser] };
      if (endpoint === '/api/v1/admin/dashboard/top-media') return { success: true, data: [topMedia] };
      throw new Error(`unexpected ${endpoint}`);
    });
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    const loadMore = w.findAllComponents(Button).find((b) => b.text().includes('Load more'));
    expect(loadMore).toBeTruthy();
    await loadMore!.trigger('click');
    await flushPromises();
    // After appending a short page the button is gone.
    expect(w.findAllComponents(Button).find((b) => b.text().includes('Load more'))).toBeUndefined();
    w.unmount();
  });

  it('swallows errors during the 30s auto-refresh without toasting', async () => {
    vi.useFakeTimers();
    let npCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/dashboard/now-playing') {
        npCalls += 1;
        // Initial mount load succeeds; the interval refresh rejects.
        if (npCalls > 1) throw new Error('refresh boom');
        return { success: true, data: [nowPlaying] };
      }
      if (endpoint === '/api/v1/admin/dashboard/storage') return { success: true, data: { items: [storageSummary] } };
      if (endpoint === '/api/v1/admin/dashboard/top-users') return { success: true, data: [topUser] };
      if (endpoint === '/api/v1/admin/dashboard/top-media') return { success: true, data: [topMedia] };
      if (endpoint === '/api/v1/admin/dashboard/activity') return { success: true, data: [activityEvent] };
      throw new Error(`unexpected ${endpoint}`);
    });
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(30_000);
    // The rejected refresh is swallowed: no "now playing" error toast.
    expect(toasts.toasts.some((t) => t.message === 'Failed to load now playing.')).toBe(false);
    w.unmount();
  });

  it('maps media_type values to distinct badge tones', async () => {
    const { client } = makeClient({
      topMedia: [
        { ...topMedia, media_item_id: 'm-movie', media_type: 'movie' },
        { ...topMedia, media_item_id: 'm-series', media_type: 'series' },
        { ...topMedia, media_item_id: 'm-photo', media_type: 'photo' },
        { ...topMedia, media_item_id: 'm-audio', media_type: 'audiobook' },
        { ...topMedia, media_item_id: 'm-other', media_type: 'podcast' },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    const html = w.html();
    expect(html).toContain('phlix-badge--accent'); // movie
    expect(html).toContain('phlix-badge--success'); // series
    expect(html).toContain('phlix-badge--warning'); // photo
    expect(html).toContain('phlix-badge--info'); // audiobook
    expect(html).toContain('phlix-badge--neutral'); // unknown ⇒ neutral
    w.unmount();
  });

  it('maps event_type values to distinct badge tones', async () => {
    const { client } = makeClient({
      activity: [
        { ...activityEvent, id: 'e-pb', event_type: 'playback' },
        { ...activityEvent, id: 'e-lib', event_type: 'library' },
        { ...activityEvent, id: 'e-misc', event_type: 'something_else' },
      ],
      // Empty the other cards so their badges don't pollute the assertion.
      nowPlaying: [],
      topUsers: [],
      topMedia: [],
      storage: [],
    });
    const w = mountPage(client);
    await flushPromises();
    const activitySection = w.find('[aria-labelledby="act-heading"]');
    const html = activitySection.html();
    expect(html).toContain('phlix-badge--accent'); // playback
    expect(html).toContain('phlix-badge--success'); // library
    expect(html).toContain('phlix-badge--neutral'); // default
    w.unmount();
  });

  it('formats minute-only and zero watch times in the top-users table', async () => {
    const { client } = makeClient({
      topUsers: [
        { ...topUser, user_id: 'u-min', total_watch_time_seconds: 300 }, // 5m, no hours
        { ...topUser, user_id: 'u-zero', total_watch_time_seconds: 0 }, // dash glyph
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('5m');
    expect(text).toContain('—');
    w.unmount();
  });

  it('formats storage byte sizes across units including the zero and small cases', async () => {
    const { client } = makeClient({
      storage: [
        { media_type: 'movie', item_count: 1, total_bytes: 0, transcode_cache_bytes: 0 }, // 0 B
        { media_type: 'series', item_count: 2, total_bytes: 2048, transcode_cache_bytes: 0 }, // KB
        { media_type: 'photo', item_count: 3, total_bytes: 5 * 1024 * 1024, transcode_cache_bytes: 0 }, // MB
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toContain('0 B');
    expect(text).toContain('2.0 KB');
    expect(text).toContain('5.0 MB');
    // All transcode caches are 0 ⇒ the cache note is omitted (v-if false branch).
    expect(text).not.toContain('Transcode cache:');
    w.unmount();
  });

  it('clamps oversized byte values to the TB unit', async () => {
    const { client } = makeClient({
      storage: [
        // Beyond PB; log clamps the unit index to the last entry (TB).
        { media_type: 'movie', item_count: 1, total_bytes: 1024 ** 6, transcode_cache_bytes: 0 },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('TB');
    w.unmount();
  });

  it('shows the transcode-cache note when any cache bytes are present', async () => {
    const { client } = makeClient({
      storage: [
        { media_type: 'movie', item_count: 1, total_bytes: 1024, transcode_cache_bytes: 3 * 1024 * 1024 },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Transcode cache:');
    w.unmount();
  });

  it('renders relative activity times across the second/minute/hour/day buckets', async () => {
    const now = Date.now();
    const iso = (msAgo: number) => new Date(now - msAgo).toISOString();
    const { client } = makeClient({
      activity: [
        { ...activityEvent, id: 'r-sec', created_at: iso(5_000) }, // "Xs ago"
        { ...activityEvent, id: 'r-min', created_at: iso(5 * 60_000) }, // "Xm ago"
        { ...activityEvent, id: 'r-hr', created_at: iso(3 * 3_600_000) }, // "Xh ago"
        { ...activityEvent, id: 'r-day', created_at: iso(2 * 86_400_000) }, // "Xd ago"
        { ...activityEvent, id: 'r-bad', created_at: 'not-a-date' }, // NaN ⇒ ''
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    const text = w.text();
    expect(text).toMatch(/\ds ago/);
    expect(text).toMatch(/5m ago/);
    expect(text).toContain('3h ago');
    expect(text).toContain('2d ago');
    w.unmount();
  });
});
