/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref } from 'vue';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import MusicTracksPage from './MusicTracksPage.vue';
import { isRoute } from '../test/route-match';

/**
 * The exact list route `ApiClient#listTracks` builds (`api/client.ts:1240`).
 *
 * S193: matched with {@link isRoute} — the pathname (query stripped) must END WITH
 * this — because `u.includes('/api/v1/music/tracks')` also matches
 * `/api/v1/music/tracks-MUTATED`, so the stub answered a route that would 404 and
 * the endpoint assertion agreed. `endsWith`, not `===`: the media base legitimately
 * prefixes the path on the hub.
 */
const TRACKS_PATH = '/api/v1/music/tracks';
import MusicPager from '../components/MusicPager.vue';

const holder = vi.hoisted(() => ({ player: null as unknown }));
vi.mock('../composables/useMusicPlayer', () => ({
  useMusicPlayer: () => holder.player,
}));

function makeFakePlayer(over: Record<string, unknown> = {}) {
  return {
    queue: ref([]),
    currentTrack: ref(null),
    currentIndex: ref(-1),
    playing: ref(false),
    position: ref(0),
    duration: ref(0),
    loading: ref(false),
    error: ref(null),
    crossfading: ref(false),
    hasNext: ref(false),
    hasPrev: ref(false),
    loadTracks: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    toggle: vi.fn(),
    stop: vi.fn(),
    next: vi.fn(),
    previous: vi.fn(),
    seek: vi.fn(),
    dispose: vi.fn(),
    ...over,
  };
}

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

interface RawTrack { id: string; name: string; duration_secs: number; track_number: number | null; stream_url?: string; }

function rawTrack(id: string, name: string): RawTrack {
  return { id, name, duration_secs: 200, track_number: 1, stream_url: `/media/${id}/stream?sig=x` };
}

function stubFetch(opts: { tracks?: RawTrack[]; total?: number; error?: boolean; hang?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, TRACKS_PATH)) {
      if (opts.hang) return new Promise<Response>(() => {});
      if (opts.error) return Promise.reject(new Error('tracks down'));
      const tracks = opts.tracks ?? [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Paranoid Android')];
      return Promise.resolve(jsonResponse({ tracks, total: opts.total ?? tracks.length }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

function mountPage(messages?: Record<string, Record<string, string>>): VueWrapper {
  return mount(MusicTracksPage, {
    global: {
      provide: messages ? { apiBase: '', phlixConfig: { messages } } : { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
  holder.player = makeFakePlayer();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MusicTracksPage', () => {
  it('loads tracks from GET /api/v1/music/tracks and renders rows', async () => {
    const fetchFn = stubFetch();
    const w = mountPage();
    await flushPromises();
    const url = String(fetchFn.mock.calls[0][0]);
    expect(isRoute(url, TRACKS_PATH)).toBe(true);
    expect(url).toContain('limit=100');
    expect(url).toContain('offset=0');
    expect(w.findAll('.track-row')).toHaveLength(2);
    expect(w.find('.tracks-page__count').text()).toContain('2 tracks');
    w.unmount();
  });

  it('shows the loading skeleton while the first request is in flight', async () => {
    stubFetch({ hang: true });
    const w = mountPage();
    await Promise.resolve();
    expect(w.find('.tracks-page__loading').exists()).toBe(true);
    w.unmount();
  });

  it('shows the empty state when there are no tracks', async () => {
    stubFetch({ tracks: [], total: 0 });
    const w = mountPage();
    await flushPromises();
    expect(w.find('.tracks-page__empty').exists()).toBe(true);
    w.unmount();
  });

  it('states the error (never a false empty state) when the FIRST load fails', async () => {
    stubFetch({ error: true });
    const w = mountPage();
    await flushPromises();
    expect(w.find('.track-row').exists()).toBe(false);
    expect(w.find('.tracks-page__error').exists(), 'the failure must be stated').toBe(true);
    expect(
      w.find('.tracks-page__empty').exists(),
      'a failure must never read as "No tracks" — that is a lie about the library',
    ).toBe(false);
    w.unmount();
  });

  it('filters the visible rows by the search query', async () => {
    stubFetch({ tracks: [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Paranoid Android')] });
    const w = mountPage();
    await flushPromises();
    await w.find('.search-box__input').setValue('paranoid');
    const rows = w.findAll('.track-row');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('Paranoid Android');
    w.unmount();
  });

  it('plays a track through the shared player when its play button is clicked', async () => {
    stubFetch();
    const w = mountPage();
    await flushPromises();
    await w.findAll('.track-row__play')[0].trigger('click');
    const player = holder.player as ReturnType<typeof makeFakePlayer>;
    expect(player.loadTracks).toHaveBeenCalled();
    expect(player.play).toHaveBeenCalledTimes(1);
    expect((player.play.mock.calls[0][0] as { id: string }).id).toBe('t1');
    w.unmount();
  });

  // ---- S110 LOW-10: the SHARED pager, not a second bespoke prev/next --------

  it('paginates: the next page refetches with a bumped offset', async () => {
    const fetchFn = stubFetch({ tracks: [rawTrack('t1', 'A'), rawTrack('t2', 'B')], total: 250 });
    const w = mountPage();
    await flushPromises();
    // total (250) > limit (100) → the shared MusicPager renders.
    expect(w.find('.music-pager').exists()).toBe(true);
    await w.find('[data-nav="next"]').trigger('click');
    await flushPromises();
    const lastUrl = String(fetchFn.mock.calls[fetchFn.mock.calls.length - 1][0]);
    expect(lastUrl).toContain('offset=100');
    w.unmount();
  });

  it('uses the shared MusicPager, so the 293rd page of a real library is one click away', async () => {
    // 29,245 tracks = 293 pages. The old bespoke pager had prev/next ONLY, so the
    // last page was 292 sequential clicks away and there was no jump control at all.
    const fetchFn = stubFetch({ tracks: [rawTrack('t1', 'A')], total: 29245 });
    const w = mountPage();
    await flushPromises();

    expect(w.find('[data-nav="info"]').text()).toContain('Page 1 of 293');
    expect(w.find('[data-count="tracks"]').text()).toContain('29,245 tracks');
    // Controls the old pager did not have.
    expect(w.find('[data-nav="first"]').exists()).toBe(true);
    expect(w.find('[data-nav="last"]').exists()).toBe(true);
    expect(w.find('[data-nav="jump"]').exists()).toBe(true);
    expect(w.find('[data-nav="jump"]').attributes('aria-controls')).toBe('music-tracks-table');

    await w.find('[data-nav="last"]').trigger('click');
    await flushPromises();
    expect(String(fetchFn.mock.calls[fetchFn.mock.calls.length - 1][0])).toContain('offset=29200');

    await w.find('[data-nav="jump"]').setValue('42');
    await flushPromises();
    expect(String(fetchFn.mock.calls[fetchFn.mock.calls.length - 1][0])).toContain('offset=4100');
    w.unmount();
  });

  it('sends limit + offset through the shared client on first load', async () => {
    const fetchFn = stubFetch();
    mountPage();
    await flushPromises();
    expect(String(fetchFn.mock.calls[0][0])).toBe('/api/v1/music/tracks?limit=100&offset=0');
  });

  it('shows the DB total while browsing and the match count while searching', async () => {
    stubFetch({ tracks: [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Bodysnatchers')], total: 29245 });
    const w = mountPage();
    await flushPromises();
    // Browsing: the library total, not the 2 rows on screen.
    expect(w.find('[data-count="tracks"]').text()).toContain('29,245 tracks');

    await w.find('.search-box__input').setValue('airbag');
    expect(w.find('[data-count="tracks"]').text()).toContain('1 track');
    expect(w.find('[data-count="tracks"]').text()).toContain('matching');
    w.unmount();
  });

  it('qualifies the search count as PAGE-LOCAL, in the same words as the code comment', async () => {
    // The filter runs over the 100 loaded rows, so a match count phrased exactly like
    // the library total ("2 tracks") claims a page-local answer is the whole answer —
    // the same defect shape as showing a page length where the DB total belongs.
    stubFetch({ tracks: [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Bodysnatchers')], total: 29245 });
    const w = mountPage();
    await flushPromises();
    await w.find('.search-box__input').setValue('a');
    expect(w.findAll('.track-row'), 'both rows match, so the count is really 2').toHaveLength(2);
    expect(w.find('[data-count="tracks"]').text()).toContain('2 tracks on this page');
    // Singular, and never "1 tracks".
    await w.find('.search-box__input').setValue('airbag');
    expect(w.find('[data-count="tracks"]').text()).toContain('1 track on this page');
    expect(w.find('[data-count="tracks"]').text()).not.toContain('1 tracks');
    w.unmount();

    // …and it resolves through the message catalog: a consumer override reaches it,
    // which a hardcoded string could never satisfy.
    stubFetch({ tracks: [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Bodysnatchers')], total: 29245 });
    const over = mountPage({ music: { tracksOnPage: '{count} Titel auf dieser Seite' } });
    await flushPromises();
    await over.find('.search-box__input').setValue('a');
    expect(over.find('[data-count="tracks"]').text()).toContain('2 Titel auf dieser Seite');
    over.unmount();
  });

  it('renders the singular count for a one-track library, never "1 tracks"', async () => {
    stubFetch({ tracks: [rawTrack('t1', 'Only One')], total: 1 });
    const w = mountPage();
    await flushPromises();
    expect(w.findAll('.track-row'), 'the row really is on screen').toHaveLength(1);
    expect(w.find('[data-count="tracks"]').text()).toBe('1 track');
    expect(w.find('[data-count="tracks"]').text()).not.toBe('1 tracks');
    w.unmount();
  });

  it('re-selecting the page already on screen refetches nothing', async () => {
    // Same rule as the sibling listings: the pager is controlled and emits the offset
    // for whatever page is committed, including the current one, so rejecting the
    // no-op is the page's job. Otherwise every re-commit costs a request.
    const fetchFn = stubFetch({ tracks: [rawTrack('t1', 'A')], total: 250 });
    const w = mountPage();
    await flushPromises();
    expect(fetchFn, 'only the mount request so far').toHaveBeenCalledTimes(1);

    await w.find('[data-nav="jump"]').setValue('1');
    await flushPromises();

    // PRECONDITION — the select really committed and the pager really emitted offset 0.
    expect(
      w.findComponent(MusicPager).emitted('go'),
      'the select really did commit and emit',
    ).toEqual([[0]]);
    expect(fetchFn, 'the page on screen must not be refetched').toHaveBeenCalledTimes(1);
    expect(w.findAll('.track-row'), 'and the row is untouched').toHaveLength(1);
    w.unmount();
  });

  it('a failed page keeps the rows, the count and the pager — the user is not stranded', async () => {
    stubFetch({ tracks: [rawTrack('t1', 'A')], total: 250 });
    const w = mountPage();
    await flushPromises();
    expect(w.find('.music-pager').exists()).toBe(true);
    expect(w.findAll('.track-row')).toHaveLength(1);

    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('down'))));
    await w.find('[data-nav="next"]').trigger('click');
    await flushPromises();

    expect(w.find('.tracks-page__error').exists(), 'the failure must be stated').toBe(true);
    expect(w.findAll('.track-row'), 'the loaded page must stay on screen').toHaveLength(1);
    expect(
      w.find('.music-pager').exists(),
      'the pager must survive: zeroing total removed it and left no way back',
    ).toBe(true);
    expect(
      w.find('.tracks-page__empty').exists(),
      'a failure must never render as the "No tracks" empty state',
    ).toBe(false);
    expect(w.find('[data-count="tracks"]').text()).toContain('250 tracks');

    // Navigation still works from the failed state.
    const good = stubFetch({ tracks: [rawTrack('t9', 'Z')], total: 250 });
    await w.find('[data-nav="last"]').trigger('click');
    await flushPromises();
    expect(String(good.mock.calls[0][0])).toContain('offset=200');
    expect(w.find('.tracks-page__error').exists(), 'the banner clears on success').toBe(false);
    w.unmount();
  });

  it('keeps the aria-controls IDREF resolvable when the search matches nothing', async () => {
    // ⚠ This page has NO mid-load swap to test — its skeleton is gated on
    // `loading && tracks.length === 0`, so once rows are loaded the table stays put
    // and a "freeze a page in flight" pin (the shape used on `MusicArtistsPage` and
    // `MusicLibraryPage`) cannot fail here: it passed even with the id back inside the
    // `v-if` chain. The state that DOES swap the table out on this page is a no-match
    // search — the pager is still on screen advertising `aria-controls`, and before the
    // always-rendered wrapper that IDREF resolved to nothing (axe
    // `aria-valid-attr-value`), which is exactly when an AT user is being told where
    // the control leads.
    stubFetch({ tracks: [rawTrack('t1', 'Airbag')], total: 250 });
    const w = mountPage();
    await flushPromises();
    const target = w.find('[data-nav="jump"]').attributes('aria-controls');
    expect(target).toBe('music-tracks-table');

    await w.find('.search-box__input').setValue('no such track anywhere');

    // Preconditions, so this cannot pass for the wrong reason: the table really is
    // gone, the empty state really is up, and the pager really is still there.
    expect(w.find('.track-table').exists(), 'the table must really be swapped out').toBe(false);
    expect(
      w.find('.tracks-page__empty').exists(),
      'must really be showing the no-match empty state',
    ).toBe(true);
    expect(
      w.find('.music-pager').exists(),
      'the pager must still be on screen, still advertising the IDREF',
    ).toBe(true);

    expect(
      w.find(`#${target}`).exists(),
      'aria-controls must not dangle when the search matches nothing',
    ).toBe(true);
    w.unmount();
  });

  // ---- Playback surface (PRE-EXISTING code in a file S110 rewrote) -----------
  // These close coverage gaps that predate S110 — the transport bar, Play All and
  // the play/pause toggle had no test at all, so the whole now-playing footer could
  // be deleted with every test still green. Recorded as such: they are not part of
  // S110's delta, they are the rest of the file the step took ownership of.

  describe('now-playing surface', () => {
    /** A MusicTrack as the page's own normaliser would produce it. */
    function playing(id = 't1') {
      return { id, title: 'Airbag', durationSecs: 200, trackNumber: 1, streamUrl: `/media/${id}` };
    }

    it('renders the transport bar and drives the shared player from it', async () => {
      holder.player = makeFakePlayer({
        currentTrack: ref(playing()),
        playing: ref(true),
        position: ref(65),
        duration: ref(200),
        hasPrev: ref(true),
        hasNext: ref(true),
      });
      stubFetch({ tracks: [rawTrack('t1', 'Airbag')], total: 1 });
      const w = mountPage();
      await flushPromises();
      const player = holder.player as ReturnType<typeof makeFakePlayer>;

      // PRECONDITION — the bar is on screen at all (it is gated on currentTrack).
      expect(w.find('.music-bar').exists(), 'the transport bar must really render').toBe(true);
      expect(w.find('.music-bar__title').text()).toBe('Airbag');

      // `formatTime` on both ends: 65s → 1:05, 200s → 3:20 (zero-padded seconds).
      expect(w.findAll('.music-bar__time').map((e) => e.text())).toEqual(['1:05', '3:20']);

      const btns = w.findAll('.music-bar__btn');
      expect(btns, 'prev / toggle / next').toHaveLength(3);
      await btns[0]!.trigger('click');
      await btns[1]!.trigger('click');
      await btns[2]!.trigger('click');
      expect(player.previous).toHaveBeenCalledTimes(1);
      expect(player.toggle).toHaveBeenCalledTimes(1);
      expect(player.next).toHaveBeenCalledTimes(1);

      // The seek slider hands the raw numeric value to the player.
      await w.find('.music-bar__seek').setValue('42');
      expect(player.seek).toHaveBeenCalledWith(42);
      w.unmount();
    });

    it('marks the playing row with the pause affordance, and only that row', async () => {
      holder.player = makeFakePlayer({ currentTrack: ref(playing('t1')), playing: ref(true) });
      stubFetch({ tracks: [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Bodysnatchers')], total: 2 });
      const w = mountPage();
      await flushPromises();

      const rows = w.findAll('.track-row');
      expect(rows, 'both rows rendered, so the two branches are really compared').toHaveLength(2);
      expect(rows[0]!.classes()).toContain('is-playing');
      expect(rows[1]!.classes()).not.toContain('is-playing');
      // The playing row swaps its track number for the pulsing pause glyph…
      expect(rows[0]!.find('.track-row__playing-icon').exists()).toBe(true);
      expect(rows[0]!.find('.col-num').text()).toBe('');
      // …and its play button announces Pause rather than Play.
      expect(rows[0]!.find('.track-row__play').attributes('aria-label')).toBe('Pause');
      expect(rows[0]!.find('.track-row__play-icon').attributes('data-icon')).toBe('pause');
      // The idle row keeps its number and its Play label.
      expect(rows[1]!.find('.col-num').text()).toBe('1');
      expect(rows[1]!.find('.track-row__play').attributes('aria-label')).toBe('Play');
      expect(rows[1]!.find('.track-row__play-icon').attributes('data-icon')).toBe('play');
      w.unmount();
    });

    it('pauses the current row instead of restarting it, and resumes without re-queuing', async () => {
      // Three distinct outcomes from one button, and the page picks between them by
      // reading the player rather than tracking its own state.
      holder.player = makeFakePlayer({ currentTrack: ref(playing('t1')), playing: ref(true) });
      stubFetch({ tracks: [rawTrack('t1', 'Airbag')], total: 1 });
      const w = mountPage();
      await flushPromises();
      const player = holder.player as ReturnType<typeof makeFakePlayer>;

      // Playing + same row ⇒ pause. Never play(), never re-queue.
      await w.find('.track-row__play').trigger('click');
      expect(player.pause).toHaveBeenCalledTimes(1);
      expect(player.play).not.toHaveBeenCalled();
      expect(player.loadTracks).not.toHaveBeenCalled();

      // Paused + same row ⇒ resume, with NO argument (so the position is kept) and
      // still no re-queue.
      player.playing.value = false;
      await w.vm.$nextTick();
      await w.find('.track-row__play').trigger('click');
      expect(player.play).toHaveBeenCalledTimes(1);
      expect(player.play.mock.calls[0]).toEqual([]);
      expect(player.loadTracks).not.toHaveBeenCalled();
      w.unmount();
    });

    it('Play All queues the loaded page and starts at its first row', async () => {
      stubFetch({ tracks: [rawTrack('t1', 'Airbag'), rawTrack('t2', 'Bodysnatchers')], total: 2 });
      const w = mountPage();
      await flushPromises();
      const player = holder.player as ReturnType<typeof makeFakePlayer>;

      const playAll = w.find('.btn--primary');
      expect(playAll.attributes('disabled'), 'the button must really be enabled').toBeUndefined();
      await playAll.trigger('click');

      expect(player.loadTracks).toHaveBeenCalledTimes(1);
      expect((player.loadTracks.mock.calls[0]![0] as { id: string }[]).map((t) => t.id))
        .toEqual(['t1', 't2']);
      expect((player.play.mock.calls[0]![0] as { id: string }).id).toBe('t1');
      w.unmount();
    });

    it('renders 0:00 for a nonsensical duration rather than a negative clock', async () => {
      stubFetch({ tracks: [{ ...rawTrack('t1', 'Airbag'), duration_secs: -5 }], total: 1 });
      const w = mountPage();
      await flushPromises();
      expect(w.findAll('.track-row'), 'the row really rendered').toHaveLength(1);
      expect(w.find('.track-row__duration').text()).toBe('0:00');
      w.unmount();
    });
  });
});
