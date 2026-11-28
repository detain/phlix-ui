/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import MiniPlayer from './MiniPlayer.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useSyncPlayStore } from '../stores/useSyncPlayStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

/** jsdom has no <video> playback — stub play/pause + readable/writable props. */
function stubVideo(el: HTMLVideoElement, props: Partial<Record<'currentTime' | 'duration' | 'volume' | 'muted' | 'playbackRate' | 'paused', number | boolean>> = {}) {
  const state = { currentTime: 0, duration: 0, volume: 1, muted: false, playbackRate: 1, paused: true, ...props } as Record<string, number | boolean>;
  stubStates.set(el, state);
  for (const k of Object.keys(state)) {
    Object.defineProperty(el, k, { configurable: true, get: () => state[k], set: (v) => (state[k] = v as number | boolean) });
  }
  el.play = vi.fn(() => {
    state.paused = false;
    return Promise.resolve();
  }) as unknown as HTMLVideoElement['play'];
  el.pause = vi.fn(() => {
    state.paused = true;
  }) as unknown as HTMLVideoElement['pause'];
  return state;
}

const mounted: VueWrapper[] = [];
function mountMini() {
  const w = mount(MiniPlayer, { attachTo: document.body, global: { stubs: { transition: true } } });
  mounted.push(w);
  return w;
}

/** Activate the dock (current + streamUrl + miniPlayer) then mount + stub the video. */
function mountActive(over: Partial<MediaItem> = {}) {
  const store = usePlayerStore();
  store.setCurrent(media(over), { streamUrl: 'http://x/stream' });
  store.showMiniPlayer();
  const w = mountMini();
  const video = w.find('video').element as HTMLVideoElement;
  const state = stubVideo(video);
  return { w, store, video, state };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (mounted.length) mounted.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('MiniPlayer — visibility', () => {
  it('renders nothing until activated', () => {
    const w = mountMini();
    expect(w.find('.mini').exists()).toBe(false);
  });

  it('stays hidden when there is a current media but no streamUrl', async () => {
    const store = usePlayerStore();
    store.setCurrent(media()); // no streamUrl
    store.showMiniPlayer();
    const w = mountMini();
    await nextTick();
    expect(w.find('.mini').exists()).toBe(false);
  });

  it('docks with the title + stream/poster when activated', () => {
    const { w } = mountActive();
    expect(w.find('.mini').exists()).toBe(true);
    expect(w.find('.mini__title').text()).toBe('Dune: Part Two');
    const v = w.find('video');
    expect(v.attributes('src')).toBe('http://x/stream');
    expect(v.attributes('poster')).toBe('https://img/dune.jpg');
  });
});

describe('MiniPlayer — continuity (survives navigation)', () => {
  it('resumes the stored position + selections on loadedmetadata', async () => {
    const { store, video, state } = mountActive();
    store.updateProgress(42, 200);
    store.setVolume(0.6);
    store.setRate(1.25);
    await nextTick();
    state.duration = 200;
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(state.currentTime).toBe(42); // continues where the full player left off
    expect(state.volume).toBeCloseTo(0.6);
    expect(state.playbackRate).toBe(1.25);
  });

  it('auto-plays on load when the store is already playing', async () => {
    const { store, video } = mountActive();
    store.play();
    await nextTick();
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(video.play).toHaveBeenCalled();
  });

  it('mirrors a store play/pause (e.g. OS media keys) onto the element', async () => {
    const { store, video } = mountActive();
    store.play();
    await nextTick();
    expect(video.play).toHaveBeenCalled();
    store.pause();
    await nextTick();
    expect(video.pause).toHaveBeenCalled();
  });
});

describe('MiniPlayer — transport + store sync', () => {
  it('toggles playback via the button and reflects element events into the store', async () => {
    const { w, store, video, state } = mountActive();
    state.paused = true;
    await w.find('.mini__btn').trigger('click'); // first btn = play/pause
    expect(video.play).toHaveBeenCalled();
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(store.playing).toBe(true);
    // clicking again while playing pauses the element
    await w.find('.mini__btn').trigger('click');
    expect(video.pause).toHaveBeenCalled();
    video.dispatchEvent(new Event('pause'));
    await nextTick();
    expect(store.playing).toBe(false);
  });

  it('syncs timeupdate into the store progress', async () => {
    const { store, video, state } = mountActive();
    state.currentTime = 30;
    state.duration = 120;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    expect(store.position).toBe(30);
    expect(store.duration).toBe(120);
  });

  it('reflects store progress in the progress fill', async () => {
    const { w, store } = mountActive();
    store.updateProgress(60, 120); // 50%
    await nextTick();
    expect(w.find('.mini__progress-fill').attributes('style')).toContain('scaleX(0.5)');
  });
});

describe('MiniPlayer — external command bus (seek seam)', () => {
  it('applies an absolute store.seekTo to its element + syncs the store position', async () => {
    const { store, state } = mountActive();
    state.duration = 200;
    store.seekTo(45);
    await nextTick();
    expect(state.currentTime).toBe(45);
    expect(store.position).toBe(45);
  });

  it('applies store.seekBy relative to the current store position', async () => {
    const { store, video, state } = mountActive();
    state.currentTime = 30;
    state.duration = 200;
    video.dispatchEvent(new Event('timeupdate')); // store.position → 30
    await nextTick();
    store.seekBy(10);
    await nextTick();
    expect(state.currentTime).toBe(40);
    expect(store.position).toBe(40);
  });

  it('clamps an over-long seek to the element duration', async () => {
    const { store, state } = mountActive();
    state.duration = 100;
    store.seekTo(999);
    await nextTick();
    expect(state.currentTime).toBe(100);
  });

  it('falls back to the store duration when the element duration is unknown', async () => {
    const { store, state } = mountActive();
    state.duration = 0;
    store.updateProgress(0, 120); // store knows the length
    store.seekTo(150);
    await nextTick();
    expect(state.currentTime).toBe(120); // clamped to store duration
  });
});

describe('MiniPlayer — expand + close', () => {
  it('emits expand with the media id from the video and the expand button', async () => {
    const { w } = mountActive();
    await w.find('video').trigger('click');
    await w.find('[aria-label="Expand to full player"]').trigger('click');
    expect(w.emitted('expand')).toEqual([['m1'], ['m1']]);
  });

  it('closes via the store (clears current + hides the dock)', async () => {
    const { w, store } = mountActive();
    await w.find('[aria-label="Close player"]').trigger('click');
    expect(store.current).toBeNull();
    expect(store.miniPlayer).toBe(false);
    await nextTick();
    expect(w.find('.mini').exists()).toBe(false);
  });

  it('has no emoji glyphs (anti-slop)', () => {
    const { w } = mountActive();
    expect(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u.test(w.html())).toBe(false);
  });
});

describe('MiniPlayer — favorite toggle (Feature 16.2)', () => {
  const FAV = '[aria-label="Add to my list"], [aria-label="Remove from my list"]';

  /** Activate the dock and provide a phlixConfig apiBase via global.provide. */
  function mountActiveWithConfig(apiBase = '/api-host', over: Partial<MediaItem> = {}) {
    const store = usePlayerStore();
    store.setCurrent(media(over), { streamUrl: 'http://x/stream' });
    store.showMiniPlayer();
    const w = mount(MiniPlayer, {
      attachTo: document.body,
      global: { stubs: { transition: true }, provide: { phlixConfig: { apiBase }, apiBase } },
    });
    mounted.push(w);
    stubVideo(w.find('video').element as HTMLVideoElement);
    return { w, store };
  }

  it('renders the favorite button only when there is a current item', async () => {
    // No current item → the whole dock (and the favorite button) is absent.
    const idle = mountMini();
    await nextTick();
    expect(idle.find(FAV).exists()).toBe(false);

    // With a current item docked → the favorite button renders.
    const { w } = mountActiveWithConfig();
    expect(w.find(FAV).exists()).toBe(true);
  });

  it('reflects store.isFavorite via aria-pressed + icon, reactively', async () => {
    const userData = useUserItemDataStore();
    const { w } = mountActiveWithConfig();
    const btn = w.find(FAV);
    // not favorited initially
    expect(btn.attributes('aria-pressed')).toBe('false');
    expect(btn.attributes('aria-label')).toBe('Add to my list');

    // seed the store as favorited → the button reflects it after a tick
    userData.hydrate({ ...media(), user_data: { favorite: true, rating: null } } as MediaItem);
    await nextTick();
    const onBtn = w.find(FAV);
    expect(onBtn.attributes('aria-pressed')).toBe('true');
    expect(onBtn.attributes('aria-label')).toBe('Remove from my list');
  });

  it('calls toggleFavorite(id, apiBase) exactly once on click', async () => {
    const userData = useUserItemDataStore();
    const spy = vi.spyOn(userData, 'toggleFavorite').mockResolvedValue();
    const { w } = mountActiveWithConfig('/api-host');
    await w.find(FAV).trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('m1', '/api-host');
  });

  it('threads an empty apiBase when no phlixConfig is provided', async () => {
    const { store } = mountActive(); // mountActive provides no phlixConfig
    const userData = useUserItemDataStore();
    const spy = vi.spyOn(userData, 'toggleFavorite').mockResolvedValue();
    // re-find the dock from the last mounted wrapper
    const w = mounted[mounted.length - 1];
    await w.find(FAV).trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('m1', '');
    expect(store.current?.id).toBe('m1');
  });
});

describe('MiniPlayer — HLS support (UI-1.8)', () => {
  /** Build a mock HlsHandle for attachHls to return. */
  function mockHlsHandle(destroy = vi.fn()) {
    return {
      destroy,
      levels: [],
      getCurrentLevel: () => -1,
      setCurrentLevel: vi.fn(),
      setNextLevel: vi.fn(),
      autoLevelEnabled: true,
      bandwidthEstimate: 0,
      onLevelSwitched: () => vi.fn(),
      audioTracks: [],
      getCurrentAudioTrack: () => -1,
      setAudioTrack: () => {},
      onAudioTrackSwitched: () => () => {},
      onLevelLoaded: () => () => {},
      hasAudio: () => false,
      loadSource: () => {},
    };
  }

  /**
   * Activate the dock the way PRODUCTION does for a transcoded session
   * (phlix-ui-player-002 rewrite of a hand-fabricated fixture).
   *
   * Production truth: PlayerPage.setCurrent ALWAYS carries a direct streamUrl
   * (its streamUrlFor yields one for every playable item), and
   * useHlsTranscode.start PERSISTS the master URL over the store afterwards
   * (useHlsTranscode.ts:451 `playerStore.hlsMasterUrl = masterUrl.value!;`)
   * WITHOUT touching streamUrl — so a live HLS dock has BOTH set. The old
   * fixture fabricated `store.setCurrent(media(), { streamUrl: '' })` next to a
   * master: a state no production path can reach. That fiction is exactly what
   * let the broken `hlsMasterUrl && !streamUrl` attach-gate pass every test —
   * in production the gate could never fire and the `:src` ternary blanked the
   * element to a black frame for every HLS session. The fixture now mirrors the
   * real pair (direct URL + persisted master); every law in this block stays.
   * attachHls is spied so tests can assert it was called with the right URL.
   */
  function mountTranscoded(attachHlsSpy: ReturnType<typeof vi.spyOn>, masterUrl = 'http://h:8096/hls/job-1/master.m3u8') {
    const store = usePlayerStore();
    store.setCurrent(media(), { streamUrl: 'http://x/stream' });
    store.hlsMasterUrl = masterUrl;
    store.showMiniPlayer();
    const w = mount(MiniPlayer, {
      attachTo: document.body,
      global: { stubs: { transition: true } },
    });
    mounted.push(w);
    return { w, store, attachHlsSpy };
  }

  /**
   * Activate the dock with a direct-play streamUrl and no hlsMasterUrl.
   * attachHls should NOT be called.
   */
  function mountDirectPlay() {
    const store = usePlayerStore();
    store.setCurrent(media(), { streamUrl: 'http://x/stream' });
    store.hlsMasterUrl = '';
    store.showMiniPlayer();
    const w = mount(MiniPlayer, {
      attachTo: document.body,
      global: { stubs: { transition: true } },
    });
    mounted.push(w);
    return { w, store };
  }

  it('visible shows the dock for the production transcoded state (master persisted over a direct URL)', async () => {
    // Title re-honesty (002): the old name recited the fabricated state
    // ('even if streamUrl is empty'); the production shape this fixture now
    // mounts carries BOTH — `visible`'s master alternative stays a live law.
    const attachHls = vi.fn(async () => mockHlsHandle());
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { w } = mountTranscoded(attachHls);
    await nextTick();
    expect(w.find('.mini').exists()).toBe(true);
    expect(w.find('.mini__title').text()).toBe('Dune: Part Two');
  });

  it('attachHls is called with the correct URL when the dock becomes visible with hlsMasterUrl', async () => {
    const attachHls = vi.fn(async (_video: HTMLVideoElement, _url: string) => mockHlsHandle());
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    mountTranscoded(attachHls);
    await nextTick();
    // attachHls should have been called on mount (onMounted hook in MiniPlayer.vue).
    expect(attachHls).toHaveBeenCalledTimes(1);
    expect(attachHls.mock.calls[0][1]).toBe('http://h:8096/hls/job-1/master.m3u8');
  });

  it('attachHls is NOT called when hlsMasterUrl is empty (direct play) and raw video src is used', async () => {
    const attachHls = vi.fn(async () => mockHlsHandle());
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { w } = mountDirectPlay();
    await nextTick();
    expect(attachHls).not.toHaveBeenCalled();
    // Raw video src should be set.
    const v = w.find('video');
    expect(v.attributes('src')).toBe('http://x/stream');
  });

  it('HLS handle is destroyed when the dock is hidden', async () => {
    const destroy = vi.fn();
    const attachHls = vi.fn(async () => mockHlsHandle(destroy));
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { store } = mountTranscoded(attachHls);
    await nextTick();
    expect(destroy).not.toHaveBeenCalled();
    // Hide the dock.
    store.hideMiniPlayer();
    await nextTick();
    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('HLS handle is destroyed on unmount', async () => {
    const destroy = vi.fn();
    const attachHls = vi.fn(async () => mockHlsHandle(destroy));
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { w } = mountTranscoded(attachHls);
    await nextTick();
    expect(destroy).not.toHaveBeenCalled();
    // Unmount the component.
    w.unmount();
    await nextTick();
    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('hide→show with two attaches in flight leaves exactly one live handle (setup generation guard)', async () => {
    // Held-promise attachHls: every call parks its resolver so the test controls
    // the settle ORDER of the overlapping runs (the concurrent window R-2 flags).
    type Handle = ReturnType<typeof mockHlsHandle>;
    const handles: Handle[] = [];
    const resolvers: Array<(h: Handle) => void> = [];
    const attachHls = vi.fn(
      () =>
        new Promise<Handle>((resolve) => {
          const h = mockHlsHandle(vi.fn());
          handles.push(h);
          resolvers.push(resolve);
        }),
    );
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { w, store } = mountTranscoded(attachHls);
    await nextTick();
    expect(attachHls).toHaveBeenCalledTimes(1); // mount-time setup #1 is in flight

    // Hide (destroys nothing — #1 has not installed yet) then re-show: setup #2
    // spawns and overtakes #1 in the generation counter.
    store.hideMiniPlayer();
    await nextTick();
    store.showMiniPlayer();
    await nextTick();
    expect(attachHls).toHaveBeenCalledTimes(2);

    // Both manifests resolve. Pre-fix, #1 passed the (visible, same-URL) re-check
    // and installed, then #2 overwrote `hlsHandle` — orphaning #1 alive forever.
    resolvers.forEach((resolve, i) => resolve(handles[i]));
    await flushPromises();

    expect(handles[0].destroy).toHaveBeenCalledTimes(1); // superseded run self-destroyed
    expect(handles[1].destroy).not.toHaveBeenCalled(); // newest run owns the live handle

    // …and #2 is genuinely the handle the dock holds: hiding now tears IT down.
    store.hideMiniPlayer();
    await nextTick();
    expect(handles[1].destroy).toHaveBeenCalledTimes(1);
    w.unmount();
  });

  it('an attach still in flight at unmount destroys its own handle instead of installing', async () => {
    type Handle = ReturnType<typeof mockHlsHandle>;
    let resolveAttach!: (h: Handle) => void;
    const handle = mockHlsHandle(vi.fn());
    const attachHls = vi.fn(
      () =>
        new Promise<Handle>((resolve) => {
          resolveAttach = resolve;
        }),
    );
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { w } = mountTranscoded(attachHls);
    await nextTick();
    expect(attachHls).toHaveBeenCalledTimes(1);

    // Teardown fires while the manifest load is pending; the store keeps `visible`
    // true, so the old re-check would happily install onto the dead dock.
    w.unmount();
    resolveAttach(handle);
    await flushPromises();

    expect(handle.destroy).toHaveBeenCalledTimes(1); // stale run discarded its own handle
  });

  it('catches a rejected attach instead of leaking an unhandled rejection (phlix-ui-player-051)', async () => {
    // Red-first pin: setupHls() awaited attachHls WITHOUT a catch, so a rejection
    // (hls-playback.ts:269 rejects when the browser has neither MSE nor native
    // HLS) escaped the async watch/onMounted callbacks as an UNHANDLED promise
    // rejection. The caught path must settle silently: the attach is attempted
    // exactly once, zero unhandled rejections surface, and the dock stays mounted.
    const unhandled: unknown[] = [];
    const onWindowRejection = (event: PromiseRejectionEvent) => unhandled.push(event.reason);
    const onNodeRejection = (reason: unknown) => unhandled.push(reason);
    window.addEventListener('unhandledrejection', onWindowRejection);
    process.on('unhandledRejection', onNodeRejection);
    try {
      const attachHls = vi.fn(async (): Promise<never> => {
        throw new Error('HLS is not supported on this browser');
      });
      vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
      const { w } = mountTranscoded(attachHls);
      await nextTick();
      await flushPromises();
      await new Promise<void>((resolve) => setTimeout(resolve, 0)); // let the host-check for unhandled rejections fire

      expect(attachHls).toHaveBeenCalledTimes(1);
      expect(unhandled).toEqual([]);
      expect(w.find('.mini').exists()).toBe(true);
    } finally {
      window.removeEventListener('unhandledrejection', onWindowRejection);
      process.off('unhandledRejection', onNodeRejection);
    }
  });

  it('the raw video binding KEEPS the direct URL while HLS attaches — never forced to src="" (phlix-ui-player-002)', async () => {
    // Red-first (002): the old ternary `:src="player.hlsMasterUrl ? '' :
    // player.streamUrl"` blanked the element the instant a master existed — a
    // dead black dock even had the gate ever fired, and no fallback when the
    // attach is rejected or degraded. Single-src-owner law: the raw binding
    // stays the honest direct URL; hls.js takes over the element itself.
    const attachHls = vi.fn(async () => mockHlsHandle());
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { w } = mountTranscoded(attachHls);
    await nextTick();
    expect(attachHls).toHaveBeenCalledTimes(1); // attach really happened (002 gate)
    expect(w.find('video').attributes('src')).toBe('http://x/stream'); // src never blanked
  });

  it('queue advance tears the live handle down and does NOT re-attach the previous item master (phlix-ui-player-003)', async () => {
    // Red-first compound (003 only became observable once 002 makes the dock
    // genuinely attach on the production pair): next() with a failed/absent
    // resolver changes the media id with no fresh URL. The store now clears the
    // stale master (setCurrent id-change law), and the dock watcher — keyed on
    // the master ITSELF, not just `visible` — must destroy the live handle and
    // spawn no new attach. Old code: watcher never re-fired (visible unchanged),
    // so a stale segment-fetcher bled across the queue advance.
    const destroy = vi.fn();
    const attachHls = vi.fn(async () => mockHlsHandle(destroy));
    vi.spyOn(await import('../components/player/hls-playback'), 'attachHls').mockImplementation(attachHls);
    const { store } = mountTranscoded(attachHls);
    await nextTick();
    expect(attachHls).toHaveBeenCalledTimes(1);
    expect(destroy).not.toHaveBeenCalled();

    store.setQueue([media({ id: 'm2', name: 'Interstellar' })]);
    store.next(); // no resolver — the 003 stale-master bleed path
    await nextTick();

    expect(store.hlsMasterUrl).toBe(''); // store leg: the id change cleared the bleed
    expect(store.streamUrl).toBe(''); //  no fresh URL resolved for m2
    expect(destroy).toHaveBeenCalledTimes(1); // dock leg: the live handle is gone
    expect(attachHls).toHaveBeenCalledTimes(1); // and nothing re-attached the old master
  });
});

describe('MiniPlayer — finish signal (S30)', () => {
  /**
   * Activate the dock and provide the shared resume reporter via global.provide.
   * `reportFinal` snapshots `store.current` at the INSTANT it is invoked (into
   * `flushSawLive`) so a test can pin the ORDER of the dock's close: the flush must
   * read a still-live item (before `closePlayer()` nulls it), not a cleared store.
   */
  function mountActiveWithReporter(
    finish = vi.fn().mockResolvedValue(undefined),
    over: Partial<MediaItem> = {},
  ) {
    const store = usePlayerStore();
    store.setCurrent(media(over), { streamUrl: 'http://x/stream' });
    store.showMiniPlayer();
    // Order-sensitive capture: push the live `current` at call time. The reporter's own
    // retained fallback would post a valid payload whether or not the store is already
    // cleared, so call-count / final-state asserts cannot detect a flush-vs-close swap —
    // only what the store held at the exact moment `reportFinal` ran can.
    const flushSawLive: Array<MediaItem | null> = [];
    const reportFinal = vi.fn(async () => {
      flushSawLive.push(store.current);
    });
    const w = mount(MiniPlayer, {
      attachTo: document.body,
      global: { stubs: { transition: true }, provide: { resumeReporter: { report: vi.fn(), finish, reportFinal } } },
    });
    mounted.push(w);
    const video = w.find('video').element as HTMLVideoElement;
    stubVideo(video);
    return { w, store, video, finish, reportFinal, flushSawLive };
  }

  it('calls the resume reporter finish() once when the dock video ends', async () => {
    const { video, finish } = mountActiveWithReporter();
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    expect(finish).toHaveBeenCalledTimes(1);
    // A re-dispatched `ended` on the same item must NOT double-finish.
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    expect(finish).toHaveBeenCalledTimes(1);
  });

  it('re-arms the finish latch when the docked item changes', async () => {
    const { store, video, finish } = mountActiveWithReporter();
    video.dispatchEvent(new Event('ended'));
    await nextTick();
    expect(finish).toHaveBeenCalledTimes(1);
    // Swap the docked item (replay / another title) → latch re-arms so the new item finishes.
    store.setCurrent(media({ id: 'm2', name: 'Arrival' }), { streamUrl: 'http://x/stream2' });
    await nextTick();
    video.dispatchEvent(new Event('ended')); // <video> is reused (no :key) — same element
    await nextTick();
    expect(finish).toHaveBeenCalledTimes(2);
  });

  it('does not crash on end when no resume reporter is provided', async () => {
    const { video } = mountActive(); // mountActive provides no resumeReporter
    expect(() => video.dispatchEvent(new Event('ended'))).not.toThrow();
  });

  // ---- reportFinal() flush on quit / teardown (W109 S506) ---------------------
  it('flushes on close reading a LIVE store — order-sensitive pin (S506)', async () => {
    const { w, store, reportFinal, flushSawLive } = mountActiveWithReporter();
    await w.find('.mini__btn--close').trigger('click'); // the quit affordance
    await nextTick();
    // ORDER TRIPWIRE: MiniPlayer.close() calls reportFinal() THEN closePlayer(). At the
    // instant the flush fired the store was still populated. If close() were reordered
    // (closePlayer() first, then flush) `flushSawLive[0]` would be null and this reddens —
    // the previous final-state-only assertions could not see the swap because the reporter
    // falls back to a retained checkpoint when the store is already nulled.
    expect(reportFinal).toHaveBeenCalledTimes(1);
    expect(flushSawLive).toHaveLength(1);
    expect(flushSawLive[0]).not.toBeNull();
    expect(flushSawLive[0]?.id).toBe('m1');
    // ...and the close still completes its original contract afterwards.
    expect(store.current).toBeNull();
  });

  it('flushes the final position when the dock component unmounts (app teardown)', async () => {
    const { w, reportFinal } = mountActiveWithReporter();
    w.unmount();
    expect(reportFinal).toHaveBeenCalledTimes(1);
  });

  it('does not crash on close/unmount when no resume reporter is provided', async () => {
    const { w } = mountActive(); // no provider → resumeReporter is null
    expect(() => w.find('.mini__btn--close').trigger('click')).not.toThrow();
    expect(() => w.unmount()).not.toThrow();
  });
});

// ── S-ui-player-05 — the dock is a live SyncPlay surface (phlix-ui-player-007) ──
// When Player unmounts behind the dock, room membership and the 5s report timer
// stay alive — but nothing fed the dock's <video> position into the store and
// nothing applied inbound commands, so the group saw a frozen anchor and remote
// play/pause/seek never reached the visible element. The dock must FEED and APPLY.

const stubStates = new WeakMap<HTMLVideoElement, Record<string, number | boolean>>();
function state_of(el: HTMLVideoElement): Record<string, number | boolean> {
  const s = stubStates.get(el);
  if (!s) throw new Error('video element was never stubbed by stubVideo()');
  return s;
}

describe('MiniPlayer — SyncPlay dock liveness (S-ui-player-05)', () => {
  /** Mirror of Player.test's U-I1 session shape (jsdom can't join a real room). */
  function syncSession(over: Partial<{ state: 'playing' | 'paused' | 'waiting'; playbackPosition: number; playbackRate: number }> = {}) {
    return {
      id: 'sess-1',
      roomId: 'room-1',
      createdBy: 'user-1',
      createdAt: '2026-07-12T00:00:00Z',
      state: over.state ?? 'playing',
      currentMediaId: null,
      playbackPosition: over.playbackPosition ?? 500,
      playbackRate: over.playbackRate ?? 1,
      serverTime: 0,
      lastSync: '2026-07-12T00:00:00Z',
      activeUsers: [],
      roles: {},
    } as unknown as import('../types/syncplay').SyncPlaySession;
  }

  it('feeds the SyncPlay store its local position on timeupdate — while in a room', async () => {
    const { video, store } = mountActive();
    const syncPlay = useSyncPlayStore();
    syncPlay.currentSession = syncSession({ state: 'playing', playbackPosition: 30 });
    expect(syncPlay.isInRoom).toBe(true);
    void store;

    state_of(video).currentTime = 30;
    state_of(video).duration = 1000;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();

    // Before the cure the dock fed ONLY usePlayerStore — the report timer then
    // broadcast a frozen anchor for the rest of the session (finding 007).
    expect(syncPlay.localPlaybackPosition).toBe(30);

    // And it must KEEP following: the watcher's one-shot apply could mask a
    // dead feed for the first tick, but the finding is about the timer running
    // for minutes against a frozen anchor.
    state_of(video).currentTime = 45;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    expect(syncPlay.localPlaybackPosition, 'the feed is continuous, not one-shot').toBe(45);
  });

  it('CONTROL — does NOT feed the SyncPlay store while not in a room', async () => {
    const { video } = mountActive();
    const syncPlay = useSyncPlayStore();
    expect(syncPlay.isInRoom).toBe(false);

    state_of(video).currentTime = 30;
    state_of(video).duration = 1000;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();

    expect(syncPlay.localPlaybackPosition).toBe(0);
    expect(usePlayerStore().position).toBe(30); // the ordinary feed still happens
  });

  it('applies an inbound PLAY command to the dock element (drift-corrected seek included)', async () => {
    const { state, store } = mountActive();
    const syncPlay = useSyncPlayStore();

    // Group is playing far ahead of the parked dock element.
    syncPlay.currentSession = syncSession({ state: 'playing', playbackPosition: 500 });
    state.currentTime = 120;
    state.duration = 1000;
    await nextTick(); // session watcher run: dock must seek + play

    expect(state.currentTime, 'drift beyond threshold corrects onto the group anchor').toBe(500);
    expect(state.paused, 'playing group plays the dock element').toBe(false);
    expect(store.playing).toBe(true); // mirrored into the shared player store
  });

  it('applies an inbound PAUSE command to the dock element', async () => {
    const { state } = mountActive();
    const syncPlay = useSyncPlayStore();
    state.paused = false;

    syncPlay.currentSession = syncSession({ state: 'paused', playbackPosition: 500 });
    await nextTick();

    expect(state.paused, 'paused group pauses the dock element').toBe(true);
  });

  it('a dock-local user pause while in a room attempts a group broadcast (delivery attempt is observable)', async () => {
    const { video, state } = mountActive();
    const syncPlay = useSyncPlayStore();
    syncPlay.currentSession = syncSession({ state: 'playing', playbackPosition: 100 });
    state.paused = false;
    await nextTick();

    // No realtime connection exists in jsdom: sendSyncPlayCommand returns false,
    // so a BROADCAST ATTEMPT surfaces exactly one observable — the delivery error
    // the store records (never thrown at the transport handler). Silence here
    // means the dock is deaf to the room (the finding); the attempt means live.
    video.dispatchEvent(new Event('pause'));
    await nextTick();

    expect(syncPlay.error).toBe('Couldn’t deliver the SyncPlay command to the group.');
  });

  it('CONTROL — a dock pause outside any room records no syncplay error', async () => {
    const { video, state } = mountActive();
    const syncPlay = useSyncPlayStore();
    state.paused = false;

    video.dispatchEvent(new Event('pause'));
    await nextTick();

    expect(syncPlay.isInRoom).toBe(false);
    expect(syncPlay.error).toBeNull();
  });
});
