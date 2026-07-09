/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import MiniPlayer from './MiniPlayer.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
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
  const FAV = '[aria-label="Add to favorites"], [aria-label="Remove from favorites"]';

  /** Activate the dock and provide a phlixConfig apiBase via global.provide. */
  function mountActiveWithConfig(apiBase = '/api-host', over: Partial<MediaItem> = {}) {
    const store = usePlayerStore();
    store.setCurrent(media(over), { streamUrl: 'http://x/stream' });
    store.showMiniPlayer();
    const w = mount(MiniPlayer, {
      attachTo: document.body,
      global: { stubs: { transition: true }, provide: { phlixConfig: { apiBase } } },
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
    expect(btn.attributes('aria-label')).toBe('Add to favorites');

    // seed the store as favorited → the button reflects it after a tick
    userData.hydrate({ ...media(), user_data: { favorite: true, rating: null } } as MediaItem);
    await nextTick();
    const onBtn = w.find(FAV);
    expect(onBtn.attributes('aria-pressed')).toBe('true');
    expect(onBtn.attributes('aria-label')).toBe('Remove from favorites');
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
