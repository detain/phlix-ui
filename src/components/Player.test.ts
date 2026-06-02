import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import Player from './Player.vue';
import Scrubber from './player/Scrubber.vue';
import AmbientCanvas from './player/AmbientCanvas.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi', 'Adventure'],
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

/** jsdom doesn't implement <video> playback — stub play/pause + readable props. */
function stubVideo(el: HTMLVideoElement, props: Partial<Record<'currentTime' | 'duration' | 'volume' | 'muted' | 'playbackRate' | 'paused', number | boolean>> = {}) {
  const state = { currentTime: 0, duration: 0, volume: 1, muted: false, playbackRate: 1, paused: true, ...props } as Record<string, number | boolean>;
  for (const k of Object.keys(state)) {
    Object.defineProperty(el, k, {
      configurable: true,
      get: () => state[k],
      set: (v) => {
        state[k] = v as number | boolean;
      },
    });
  }
  Object.defineProperty(el, 'buffered', {
    configurable: true,
    get: () => ({ length: 1, end: () => 50 }),
  });
  el.play = vi.fn(() => {
    state.paused = false;
    return Promise.resolve();
  }) as unknown as HTMLVideoElement['play'];
  el.pause = vi.fn(() => {
    state.paused = true;
  }) as unknown as HTMLVideoElement['pause'];
  return state;
}

const mounted: ReturnType<typeof mount>[] = [];
function mountPlayer(
  props: Partial<{ media: MediaItem; streamUrl: string; idleTimeout: number; chapters: { start: number; title?: string }[] }> = {},
) {
  const w = mount(Player, {
    props: { media: media(), streamUrl: 'http://x/stream', ...props },
    attachTo: document.body,
  });
  mounted.push(w);
  const video = w.find('video').element as HTMLVideoElement;
  const state = stubVideo(video);
  return { w, video, state };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  // unmount so the document-level keyboard listener is removed (no cross-test bleed)
  while (mounted.length) mounted.pop()?.unmount();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Player — rendering & anti-slop', () => {
  it('renders metadata (eyebrow, title, cert, sub parts) and no emoji glyphs', () => {
    const { w } = mountPlayer();
    expect(w.find('.player__eyebrow').text()).toBe('Now playing');
    expect(w.find('.player__title').text()).toBe('Dune: Part Two');
    expect(w.find('.player__cert').text()).toBe('PG-13');
    const sub = w.find('.player__sub').text();
    expect(sub).toContain('2024');
    expect(sub).toContain('166m');
    expect(sub).toContain('Sci-Fi');
    expect(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u.test(w.html())).toBe(false);
  });

  it('orders the sub-row year · cert · runtime · genre (cert hugs the year, per the locked mockup)', () => {
    const { w } = mountPlayer();
    const segs = w.find('.player__sub').findAll('span').map((s) => s.text());
    // first non-dot segment is the year, the cert follows it (no dot between)
    expect(segs[0]).toBe('2024');
    expect(w.find('.player__sub .player__cert').text()).toBe('PG-13');
    const text = w.find('.player__sub').text().replace(/\s+/g, ' ');
    expect(text.indexOf('2024')).toBeLessThan(text.indexOf('PG-13'));
    expect(text.indexOf('PG-13')).toBeLessThan(text.indexOf('166m'));
  });

  it('binds the stream url and poster to the <video>', () => {
    const { w } = mountPlayer();
    const v = w.find('video');
    expect(v.attributes('src')).toBe('http://x/stream');
    expect(v.attributes('poster')).toBe('https://img/dune.jpg');
  });

  it('registers the current media with the store on mount', () => {
    const { w } = mountPlayer();
    expect(usePlayerStore().current?.id).toBe('m1');
    w.unmount();
  });
});

describe('Player — transport ↔ store', () => {
  it('reflects video play/pause into the store', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(store.playing).toBe(true);
    video.dispatchEvent(new Event('pause'));
    await nextTick();
    expect(store.playing).toBe(false);
  });

  it('syncs position/duration/buffered on timeupdate', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.currentTime = 30;
    state.duration = 100;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    expect(store.position).toBe(30);
    expect(store.duration).toBe(100);
    expect(store.buffered).toBe(50);
  });

  it('pushes the store selections onto the element at loadedmetadata', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    store.setVolume(0.4);
    store.setRate(1.5);
    await nextTick();
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(state.volume).toBeCloseTo(0.4);
    expect(state.playbackRate).toBe(1.5);
  });

  it('toggles play via the center button (calls video.play when paused)', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = true;
    await w.find('.player__bigplay').trigger('click');
    expect(video.play).toHaveBeenCalled();
  });

  it('toggles mute through the store, mirrored onto the element', async () => {
    const { w, video } = mountPlayer();
    const store = usePlayerStore();
    await w.find('.volume__btn').trigger('click'); // VolumeControl mute button
    expect(store.muted).toBe(true);
    await nextTick();
    expect(video.muted).toBe(true);
  });
});

describe('Player — store → video sync', () => {
  it('applies a store volume/rate change onto the element', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    store.setVolume(0.3);
    store.setRate(2);
    await nextTick();
    expect(video.volume).toBeCloseTo(0.3);
    expect(video.playbackRate).toBe(2);
  });

  it('mirrors a store mute change onto the element', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    store.toggleMute();
    await nextTick();
    expect(video.muted).toBe(true);
  });

  it('syncs a native volumechange (muted + volume) back into the store', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.muted = true;
    state.volume = 0.5;
    video.dispatchEvent(new Event('volumechange'));
    await nextTick();
    expect(store.muted).toBe(true);
    expect(store.volume).toBeCloseTo(0.5);
  });

  it('updates buffered on the progress event', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.duration = 100;
    video.dispatchEvent(new Event('progress'));
    await nextTick();
    expect(store.buffered).toBe(50);
  });

  it('pauses the video when toggling play while playing', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = false;
    await w.find('.player__bigplay').trigger('click');
    expect(video.pause).toHaveBeenCalled();
  });

  it('syncs a native ratechange back into the store', async () => {
    const { video, state } = mountPlayer();
    const store = usePlayerStore();
    state.playbackRate = 1.5;
    video.dispatchEvent(new Event('ratechange'));
    await nextTick();
    expect(store.rate).toBe(1.5);
  });
});

describe('Player — Scrubber integration', () => {
  it('applies a Scrubber seek to video.currentTime (and never toggles play)', async () => {
    const { w, video, state } = mountPlayer();
    state.duration = 200;
    video.dispatchEvent(new Event('timeupdate')); // propagate duration to store
    await nextTick();
    w.findComponent(Scrubber).vm.$emit('seek', 50);
    expect(state.currentTime).toBe(50);
    expect(video.play).not.toHaveBeenCalled();
  });

  it('passes store transport + props through to the Scrubber', async () => {
    const chapters = [{ start: 30 }, { start: 90 }];
    const { w, video, state } = mountPlayer({ chapters });
    state.currentTime = 40;
    state.duration = 200;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    const scrub = w.findComponent(Scrubber);
    expect(scrub.props('position')).toBe(40);
    expect(scrub.props('duration')).toBe(200);
    expect(scrub.props('chapters')).toEqual(chapters);
  });

  it('suspends chrome auto-hide while scrubbing', async () => {
    vi.useFakeTimers();
    const { w, video } = mountPlayer({ idleTimeout: 500 });
    video.dispatchEvent(new Event('play'));
    await nextTick();
    const scrub = w.findComponent(Scrubber);
    scrub.vm.$emit('scrub-start');
    await nextTick();
    vi.advanceTimersByTime(1000); // would normally hide
    await nextTick();
    expect(w.classes()).not.toContain('is-chrome-hidden'); // held open while scrubbing
    scrub.vm.$emit('scrub-end');
    await nextTick();
    vi.advanceTimersByTime(600);
    await nextTick();
    expect(w.classes()).toContain('is-chrome-hidden'); // hides again after scrub ends
  });
});

describe('Player — chrome auto-hide', () => {
  it('hides the chrome after the idle timeout while playing, reveals on pointer move', async () => {
    vi.useFakeTimers();
    const { w, video } = mountPlayer({ idleTimeout: 1000 });
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(w.classes()).not.toContain('is-chrome-hidden');
    vi.advanceTimersByTime(1100);
    await nextTick();
    expect(w.classes()).toContain('is-chrome-hidden');

    await w.trigger('pointermove');
    expect(w.classes()).not.toContain('is-chrome-hidden');
  });

  it('always shows the chrome while paused (never hides)', async () => {
    vi.useFakeTimers();
    const { w, video } = mountPlayer({ idleTimeout: 500 });
    video.dispatchEvent(new Event('pause'));
    await nextTick();
    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(w.classes()).not.toContain('is-chrome-hidden');
  });
});

describe('Player — keyboard shortcuts', () => {
  function key(k: string, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  }

  it('toggles play with the k key (global, while mounted)', async () => {
    const { video, state } = mountPlayer();
    state.paused = true;
    key('k');
    await nextTick();
    expect(video.play).toHaveBeenCalled();
  });

  it('opens the help overlay with ?', async () => {
    const { w } = mountPlayer();
    expect(w.find('[role="dialog"]').exists()).toBe(false);
    key('?');
    await nextTick();
    expect(w.find('[role="dialog"]').exists()).toBe(true);
  });

  it('emits captions/theater/pip for c/t/i', async () => {
    const { w } = mountPlayer();
    key('c');
    key('t');
    key('i');
    await nextTick();
    expect(w.emitted('captions')).toHaveLength(1);
    expect(w.emitted('theater')).toHaveLength(1);
    expect(w.emitted('pip')).toHaveLength(1);
  });

  it('steps playback speed up the ladder with >', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    expect(store.rate).toBe(1);
    key('>');
    await nextTick();
    expect(store.rate).toBe(1.25);
    expect(video.playbackRate).toBe(1.25); // mirrored onto the element
  });

  it('does not fire shortcuts while typing in an input', async () => {
    const { video } = mountPlayer();
    const input = document.createElement('input');
    document.body.appendChild(input);
    key('k', input);
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
    input.remove();
  });

  it('seeks ±5s with the arrow keys and to % with a digit', async () => {
    const { video, state } = mountPlayer();
    state.duration = 200;
    state.currentTime = 100;
    video.dispatchEvent(new Event('timeupdate')); // store.position = 100
    await nextTick();
    key('ArrowLeft');
    expect(state.currentTime).toBe(95);
    key('5'); // 50% of 200
    expect(state.currentTime).toBe(100);
  });

  it('frame-steps only while paused', async () => {
    const { video, state } = mountPlayer();
    state.duration = 200;
    state.currentTime = 100;
    video.dispatchEvent(new Event('timeupdate'));
    await nextTick();
    key(','); // paused by default → steps back ~1/30s
    expect(state.currentTime).toBeCloseTo(100 - 1 / 30, 4);

    video.dispatchEvent(new Event('play')); // now playing
    await nextTick();
    const before = state.currentTime;
    key('.');
    expect(state.currentTime).toBe(before); // no frame-step while playing
  });

  it('nudges volume with the up arrow', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    store.setVolume(0.5);
    await nextTick();
    key('ArrowUp');
    await nextTick();
    expect(store.volume).toBeCloseTo(0.55);
    expect(video.volume).toBeCloseTo(0.55);
  });

  it('suppresses player shortcuts while the help overlay is open', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = true;
    key('?'); // open help
    await nextTick();
    expect(w.find('[role="dialog"]').exists()).toBe(true);
    key('k'); // should be ignored while the modal is open
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
  });

  it('opens the help overlay from the control-bar button too', async () => {
    const { w } = mountPlayer();
    const helpBtn = w.findAll('.player__btnrow .player__iconbtn').find((b) => b.attributes('aria-label') === 'Keyboard shortcuts');
    expect(helpBtn).toBeTruthy();
    await helpBtn!.trigger('click');
    expect(w.find('[role="dialog"]').exists()).toBe(true);
  });
});

describe('Player — captions (R3.5)', () => {
  function key(k: string, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  }

  /** Shadow the real (empty) jsdom textTracks with a fake subtitle list. */
  function injectSubtitleTracks(video: HTMLVideoElement, defs: { lang: string; label: string }[]) {
    const tracks = defs.map((d) => ({
      kind: 'subtitles',
      language: d.lang,
      label: d.label,
      mode: 'disabled',
      activeCues: null as { text: string }[] | null,
      addEventListener() {},
      removeEventListener() {},
    }));
    const list: Record<number, unknown> & { length: number } = { length: tracks.length };
    tracks.forEach((t, i) => (list[i] = t));
    Object.defineProperty(video, 'textTracks', { configurable: true, get: () => list });
    return tracks;
  }

  /** Shadow the real jsdom audioTracks with a fake list of enable-able tracks. */
  function injectAudioTracks(video: HTMLVideoElement, count: number) {
    const tracks = Array.from({ length: count }, (_, i) => ({ language: `a${i}`, label: `Audio ${i + 1}`, id: `a${i}`, enabled: i === 0 }));
    const list: Record<number, unknown> & { length: number } = { length: count };
    tracks.forEach((t, i) => (list[i] = t));
    Object.defineProperty(video, 'audioTracks', { configurable: true, get: () => list });
    return tracks;
  }

  it('renders the captions menu button in the control row', () => {
    const { w } = mountPlayer();
    expect(w.find('.capmenu__btn').exists()).toBe(true);
  });

  it('captions are ON at load when defaultSubtitleLang matches an available track', async () => {
    usePreferencesStore().defaultSubtitleLang = 'en'; // before the player store seeds from it
    const { w, video } = mountPlayer();
    const tracks = injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    tracks[0].activeCues = [{ text: 'Fear is the mind-killer' }];
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBe('en'); // seeded from the default
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (on)');
    expect(w.find('.player__caption-line').text()).toBe('Fear is the mind-killer');
  });

  it('captions stay OFF at load when the default matches no track', async () => {
    // default is null (storage cleared in beforeEach) → off even though a track exists
    const { w, video } = mountPlayer();
    injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    expect(usePlayerStore().subtitleLang).toBeNull();
    expect(w.find('.capmenu__btn').attributes('aria-label')).toBe('Captions (off)');
    expect(w.find('.player__captions').exists()).toBe(false);
  });

  it('the c key toggles captions on/off when a track is available', async () => {
    const { video } = mountPlayer();
    const store = usePlayerStore();
    injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    video.dispatchEvent(new Event('loadedmetadata')); // refreshes the track list
    await nextTick();
    expect(store.subtitleLang).toBeNull(); // off by default (no defaultSubtitleLang)
    key('c');
    await nextTick();
    expect(store.subtitleLang).toBe('en'); // turned on (first/only track)
    key('c');
    await nextTick();
    expect(store.subtitleLang).toBeNull(); // toggled back off
  });

  it('the c key is a no-op (still emits) when there are no tracks', async () => {
    const { w } = mountPlayer();
    const store = usePlayerStore();
    key('c');
    await nextTick();
    expect(store.subtitleLang).toBeNull();
    expect(w.emitted('captions')).toHaveLength(1); // host hook still fires
  });

  it('suppresses transport shortcuts while the captions menu is open', async () => {
    const { w, video, state } = mountPlayer();
    state.paused = true;
    await w.find('.capmenu__btn').trigger('click'); // v-model:open → captionsMenuOpen = true
    await nextTick();
    expect(w.find('.capmenu__panel').exists()).toBe(true);
    key('k'); // would normally toggle play
    await nextTick();
    expect(video.play).not.toHaveBeenCalled();
  });

  it('renders caption cues in the overlay for the active track', async () => {
    const { w, video } = mountPlayer();
    const store = usePlayerStore();
    const tracks = injectSubtitleTracks(video, [{ lang: 'en', label: 'English' }]);
    tracks[0].activeCues = [{ text: 'Spice flows' }];
    video.dispatchEvent(new Event('loadedmetadata'));
    store.setSubtitle('en');
    await nextTick();
    expect(w.find('.player__captions').exists()).toBe(true);
    expect(w.find('.player__caption-line').text()).toBe('Spice flows');
  });

  it('switches the audio track via the menu (applyAudioTrack + activeAudio)', async () => {
    const { w, video } = mountPlayer();
    const audio = injectAudioTracks(video, 2);
    video.dispatchEvent(new Event('loadedmetadata'));
    await nextTick();
    await w.find('.capmenu__btn').trigger('click'); // open the menu
    await nextTick();
    const group = w.find('[aria-label="Audio track"]');
    expect(group.exists()).toBe(true); // shown only because there are 2 audio tracks
    await group.findAll('[role="radio"]')[1].trigger('click');
    await nextTick();
    expect(audio[1].enabled).toBe(true);
    expect(audio[0].enabled).toBe(false);
  });
});

describe('Player — fullscreen & back', () => {
  it('emits back from the back button', async () => {
    const { w } = mountPlayer();
    await w.find('.player__back').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);
  });

  it('requests fullscreen on the container', async () => {
    const req = vi.fn(() => Promise.resolve());
    Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', { configurable: true, value: req });
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => null });
    const { w } = mountPlayer();
    await w.findAll('.player__btnrow .player__iconbtn').at(-1)!.trigger('click'); // fullscreen button
    expect(req).toHaveBeenCalled();
  });

  it('tracks the fullscreenchange event into the button label', async () => {
    let fsEl: Element | null = null;
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => fsEl });
    const { w } = mountPlayer();
    const fsBtn = () => w.findAll('.player__btnrow .player__iconbtn').at(-1)!;
    expect(fsBtn().attributes('aria-label')).toBe('Fullscreen');
    fsEl = document.body;
    document.dispatchEvent(new Event('fullscreenchange'));
    await nextTick();
    expect(fsBtn().attributes('aria-label')).toBe('Exit fullscreen');
  });
});

describe('Player — ambient & theater (R3.6)', () => {
  function key(k: string, target: EventTarget = document) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  }
  const theaterBtn = (w: ReturnType<typeof mountPlayer>['w']) =>
    w.findAll('.player__btnrow .player__iconbtn').find((b) => (b.attributes('aria-label') ?? '').toLowerCase().includes('theater'));

  it('renders the ambient layer behind a framed stage', () => {
    const { w } = mountPlayer();
    expect(w.find('.player__stage').exists()).toBe(true);
    expect(w.findComponent(AmbientCanvas).exists()).toBe(true);
    // the stage holds the video; the ambient layer is its sibling (behind it)
    expect(w.find('.player__stage video').exists()).toBe(true);
  });

  it('drives the ambient from prefs.atmosphere, reduced-motion and playing', async () => {
    const { w, video } = mountPlayer();
    const amb = w.findComponent(AmbientCanvas);
    expect(amb.props('enabled')).toBe(true); // atmosphere defaults on
    expect(amb.props('playing')).toBe(false);
    video.dispatchEvent(new Event('play'));
    await nextTick();
    expect(amb.props('playing')).toBe(true);
    usePreferencesStore().atmosphere = false;
    await nextTick();
    expect(amb.props('enabled')).toBe(false); // fully disable-able via the pref
  });

  it('toggles theater via the control-bar button (class + aria-pressed + emit payload)', async () => {
    const { w } = mountPlayer();
    const btn = theaterBtn(w)!;
    expect(btn).toBeTruthy();
    expect(btn.attributes('aria-pressed')).toBe('false');
    expect(w.classes()).not.toContain('is-theater');

    await btn.trigger('click');
    expect(w.classes()).toContain('is-theater');
    expect(btn.attributes('aria-pressed')).toBe('true');
    expect(btn.attributes('aria-label')).toBe('Exit theater mode');
    expect(w.emitted('theater')).toEqual([[true]]);

    await btn.trigger('click');
    expect(w.classes()).not.toContain('is-theater');
    expect(w.emitted('theater')).toEqual([[true], [false]]);
  });

  it('the t key toggles theater and boosts the ambient intensity', async () => {
    const { w } = mountPlayer();
    const amb = w.findComponent(AmbientCanvas);
    expect(amb.props('intensity')).toBe(1);
    key('t');
    await nextTick();
    expect(w.classes()).toContain('is-theater');
    expect(w.emitted('theater')!.at(-1)).toEqual([true]);
    expect(amb.props('intensity')).toBeCloseTo(1.35);
  });

  it('keeps the fullscreen button last in the control row (after theater)', () => {
    const { w } = mountPlayer();
    const last = w.findAll('.player__btnrow .player__iconbtn').at(-1)!;
    expect(last.attributes('aria-label')).toBe('Fullscreen');
  });
});
