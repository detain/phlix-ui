/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, markRaw } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import CaptionOverlay from './CaptionOverlay.vue';
import { DEFAULT_CAPTION_STYLE, type CaptionStyle } from '../../stores/usePreferencesStore';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { captionRenderTime, readCueLinesAt } from './captions';

interface FakeCue {
  start: number;
  end: number;
  text: string;
}

interface FakeTrack {
  kind: string;
  language: string;
  label: string;
  mode: string;
  activeCues: { text: string }[] | null;
  /** Full cue list exposed on the track (the offset render path reads this;
   *  absent = unavailable, like a still-loading sidecar). */
  cues?: ArrayLike<FakeCue> | null;
  handlers: Record<string, Array<() => void>>;
  addEventListener(type: string, cb: () => void): void;
  removeEventListener(type: string, cb: () => void): void;
}

function fakeTrack(over: Partial<FakeTrack> = {}): FakeTrack {
  const handlers: Record<string, Array<() => void>> = {};
  return {
    kind: 'subtitles',
    language: 'en',
    label: 'English',
    mode: 'disabled',
    activeCues: null,
    handlers,
    addEventListener(type, cb) {
      (handlers[type] ??= []).push(cb);
    },
    removeEventListener(type, cb) {
      handlers[type] = (handlers[type] ?? []).filter((h) => h !== cb);
    },
    ...over,
  };
}

function videoWith(tracks: FakeTrack[]): HTMLVideoElement {
  const list: Record<number, FakeTrack> & { length: number } = { length: tracks.length };
  tracks.forEach((t, i) => (list[i] = t));
  return { textTracks: list } as unknown as HTMLVideoElement;
}

/** A fake `<track>` element backing a FakeTrack, mirroring the identity link
 *  (`el.track === track`) + `readyState` + `load` event a real HTMLTrackElement
 *  exposes, so the overlay's load-time re-read can be exercised.
 *
 *  ⚠️ THIS DOUBLE IS THE ONLY WAY THAT BRANCH IS EVER REACHED. Measured on jsdom
 *  29.1.1 (pinned in `captions-jsdom-reachability.test.ts`): a real
 *  `HTMLTrackElement` reports `track === undefined` and `readyState === 0`
 *  forever, and a real `<video>` reports `textTracks.length === 0` even with
 *  `<track>` children. So `trackElementFor`'s `el.track === track` match cannot
 *  succeed against the DOM, and the whole `load`-listener block in `rebind()` —
 *  its `readyState !== 2` guard included — is unreachable from any real-DOM
 *  mount. A green run here is evidence about THIS FIXTURE, not about a browser;
 *  the sidecar load path still has to be checked by hand. (The S13
 *  `scheduleModeRecheck` is different: it runs unconditionally and IS exercised
 *  through a full Player mount in `Player.test.ts`.) */
interface FakeTrackEl {
  track: FakeTrack;
  readyState: number;
  handlers: Record<string, Array<() => void>>;
  addEventListener(type: string, cb: () => void): void;
  removeEventListener(type: string, cb: () => void): void;
}

function fakeTrackEl(track: FakeTrack, readyState = 1 /* LOADING */): FakeTrackEl {
  const handlers: Record<string, Array<() => void>> = {};
  return {
    track,
    readyState,
    handlers,
    addEventListener(type, cb) {
      (handlers[type] ??= []).push(cb);
    },
    removeEventListener(type, cb) {
      handlers[type] = (handlers[type] ?? []).filter((h) => h !== cb);
    },
  };
}

/** A fake video that also answers `querySelectorAll('track')` with the given
 *  `<track>` elements (the real overlay uses this to find the loading sidecar).
 *  `markRaw` mirrors reality — Vue never proxies a real HTMLVideoElement, so the
 *  `el.track === resolvedTextTrack` identity check holds (a proxied fake would
 *  wrap the two references separately and never match). */
function videoWithEls(tracks: FakeTrack[], els: FakeTrackEl[]): HTMLVideoElement {
  const list: Record<number, FakeTrack> & { length: number } = { length: tracks.length };
  tracks.forEach((t, i) => (list[i] = t));
  return markRaw({
    textTracks: list,
    querySelectorAll: (sel: string) => (sel === 'track' ? els : []),
  }) as unknown as HTMLVideoElement;
}

function fireCue(track: FakeTrack): void {
  (track.handlers.cuechange ?? []).forEach((h) => h());
}

function fireLoad(el: FakeTrackEl): void {
  (el.handlers.load ?? []).forEach((h) => h());
}

/** A fake control cluster exposing only the `offsetHeight` the S504 lift measures.
 *  `markRaw` keeps Vue from proxying it (identity is irrelevant, but it mirrors a
 *  real element, which is never a reactive proxy). */
function fakeControls(offsetHeight: number): HTMLElement {
  return markRaw({ offsetHeight }) as unknown as HTMLElement;
}

/** A controllable ResizeObserver stub: records every registered callback so a test
 *  can fire a resize by hand after mutating `offsetHeight`, exactly as a browser
 *  would when the observed box changes size. */
function stubResizeObserver(): { fire: () => void } {
  const cbs: Array<() => void> = [];
  class FakeRO {
    constructor(cb: () => void) {
      cbs.push(cb);
    }
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  vi.stubGlobal('ResizeObserver', FakeRO);
  return { fire: () => cbs.forEach((cb) => cb()) };
}

function mountOverlay(
  props: Partial<{ video: HTMLVideoElement | null; language: string | null; styleConfig: CaptionStyle; lifted: boolean; controlsRoot: HTMLElement | null }>,
) {
  // S-ui-once-16: the overlay reads the player store's caption delay; a fresh
  // pinia per mount mirrors production (singleton store, default offsets 0 —
  // every pre-existing pin here runs at delay 0 exactly as before).
  setActivePinia(createPinia());
  return mount(CaptionOverlay, {
    props: { video: null, language: null, styleConfig: { ...DEFAULT_CAPTION_STYLE }, lifted: false, controlsRoot: null, ...props },
  });
}

beforeEach(() => {
  /* nothing global */
});

describe('CaptionOverlay', () => {
  it('renders nothing when captions are off (language null)', () => {
    const w = mountOverlay({ video: videoWith([fakeTrack()]), language: null });
    expect(w.find('.player__captions').exists()).toBe(false);
  });

  it('renders nothing when the language matches no track', () => {
    const w = mountOverlay({ video: videoWith([fakeTrack({ language: 'en' })]), language: 'fr' });
    expect(w.find('.player__captions').exists()).toBe(false);
  });

  it('renders the active cue lines and puts the chosen track in hidden mode', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [{ text: 'Hello there' }] });
    const es = fakeTrack({ language: 'es', mode: 'showing' });
    const w = mountOverlay({ video: videoWith([en, es]), language: 'en' });
    await nextTick();
    expect(w.find('.player__captions').exists()).toBe(true);
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Hello there']);
    expect(en.mode).toBe('hidden'); // parsed, not painted natively
    expect(es.mode).toBe('disabled');
  });

  it('updates the lines on cuechange', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [] });
    const w = mountOverlay({ video: videoWith([en]), language: 'en' });
    await nextTick();
    expect(w.find('.player__captions').exists()).toBe(false); // no cues yet
    en.activeCues = [{ text: 'Now speaking' }, { text: 'second line' }];
    fireCue(en);
    await nextTick();
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Now speaking', 'second line']);
  });

  it('applies the caption-style custom properties and the lifted class', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
    const w = mountOverlay({
      video: videoWith([en]),
      language: 'en',
      styleConfig: { size: 'xl', textColor: '#ffd400', background: 'solid', edge: 'outline' },
      lifted: true,
    });
    await nextTick();
    const box = w.find('.player__captions');
    const style = box.attributes('style') ?? '';
    expect(style).toContain('--cap-color: #ffd400');
    expect(style).toContain('--cap-bg: #000000');
    expect(box.classes()).toContain('is-lifted');
  });

  // ---- S504: ResizeObserver-measured subtitle lift ---------------------------
  describe('measured lift (S504)', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('binds --phlix-sub-offset to the control cluster height while lifted', async () => {
      stubResizeObserver();
      const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
      const w = mountOverlay({ video: videoWith([en]), language: 'en', lifted: true, controlsRoot: fakeControls(132) });
      await nextTick();
      const style = w.find('.player__captions').attributes('style') ?? '';
      expect(style).toContain('--phlix-sub-offset: 132px');
      expect(w.find('.player__captions').classes()).toContain('is-lifted');
    });

    it('re-measures when the ResizeObserver fires (taller control rows)', async () => {
      const { fire } = stubResizeObserver();
      const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
      const controls = fakeControls(88);
      const w = mountOverlay({ video: videoWith([en]), language: 'en', lifted: true, controlsRoot: controls });
      await nextTick();
      expect(w.find('.player__captions').attributes('style')).toContain('--phlix-sub-offset: 88px');
      // A marker timeline / quality row appears → the bar grows and the RO re-reads.
      (controls as unknown as { offsetHeight: number }).offsetHeight = 176;
      fire();
      await nextTick();
      expect(w.find('.player__captions').attributes('style')).toContain('--phlix-sub-offset: 176px');
    });

    it('resets the offset to 0 when the chrome hides, even with a measured bar', async () => {
      stubResizeObserver();
      const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
      const w = mountOverlay({ video: videoWith([en]), language: 'en', lifted: true, controlsRoot: fakeControls(132) });
      await nextTick();
      expect(w.find('.player__captions').attributes('style')).toContain('--phlix-sub-offset: 132px');
      await w.setProps({ lifted: false });
      await nextTick();
      const box = w.find('.player__captions');
      expect(box.classes()).not.toContain('is-lifted');
      expect(box.attributes('style')).toContain('--phlix-sub-offset: 0px');
    });

    it('seats the captions without throwing when the control cluster has no layout box (jsdom/SSR)', async () => {
      // A host with no measured height (an SSR/nonelement, or a jsdom node whose
      // offsetHeight is not a number) must degrade to a `0` offset — and must never
      // throw, whether or not ResizeObserver exists in the environment.
      const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
      const w = mountOverlay({ video: videoWith([en]), language: 'en', lifted: true, controlsRoot: markRaw({}) as unknown as HTMLElement });
      await nextTick();
      expect(w.find('.player__captions').attributes('style')).toContain('--phlix-sub-offset: 0px');
    });

    it('seats the captions when there is no control cluster at all', async () => {
      const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
      const w = mountOverlay({ video: videoWith([en]), language: 'en', lifted: true, controlsRoot: null });
      await nextTick();
      expect(w.find('.player__captions').attributes('style')).toContain('--phlix-sub-offset: 0px');
    });

    it('disconnects the observer on unmount (no leaked ResizeObserver)', async () => {
      let disconnected = 0;
      class FakeRO {
        observe(): void {}
        unobserve(): void {}
        disconnect(): void {
          disconnected++;
        }
      }
      vi.stubGlobal('ResizeObserver', FakeRO);
      const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
      const w = mountOverlay({ video: videoWith([en]), language: 'en', lifted: true, controlsRoot: fakeControls(100) });
      await nextTick();
      expect(disconnected).toBe(0);
      w.unmount();
      expect(disconnected).toBe(1);
    });
  });

  it('rebinds when the language switches and unbinds the old track', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [{ text: 'EN' }] });
    const es = fakeTrack({ language: 'es', activeCues: [{ text: 'ES' }] });
    const w = mountOverlay({ video: videoWith([en, es]), language: 'en' });
    await nextTick();
    expect(en.handlers.cuechange).toHaveLength(1);

    await w.setProps({ language: 'es' });
    await nextTick();
    expect(en.handlers.cuechange).toHaveLength(0); // old listener removed
    expect(es.handlers.cuechange).toHaveLength(1);
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['ES']);
    expect(es.mode).toBe('hidden');
    expect(en.mode).toBe('disabled');
  });

  it('paints the initially-active cue once the sidecar <track> finishes loading (server-default captions)', async () => {
    // Captions start enabled (server default) but the VTT cues have not loaded
    // yet — activeCues is empty at bind, so nothing paints and the engine does
    // not fire cuechange for the cue already active at load. This is the blank
    // state the user saw before toggling off/on.
    const en = fakeTrack({ language: 'en', activeCues: [] });
    const el = fakeTrackEl(en, 1 /* LOADING */);
    const w = mountOverlay({ video: videoWithEls([en], [el]), language: 'en' });
    await nextTick();
    expect(w.find('.player__captions').exists()).toBe(false); // blank until loaded
    expect(el.handlers.load).toHaveLength(1); // a load listener was attached
    // The sidecar finishes loading with a cue already active at the current time.
    en.activeCues = [{ text: 'It has begun' }];
    fireLoad(el);
    await nextTick();
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['It has begun']);
  });

  it('does not attach a load listener when the track cues are already available', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [{ text: 'ready' }] });
    const el = fakeTrackEl(en, 2 /* LOADED */);
    const w = mountOverlay({ video: videoWithEls([en], [el]), language: 'en' });
    await nextTick();
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['ready']);
    expect(el.handlers.load ?? []).toHaveLength(0); // synchronous read sufficed
  });

  it('does not attach a load listener to a still-LOADING track whose cue already surfaced', async () => {
    // The load-listener block is gated on TWO independent halves:
    //   (a) `!lines.value.length`  — the synchronous read found nothing, and
    //   (b) `el.readyState !== 2`  — the sidecar is still LOADING.
    // Half (b) is pinned by the S13 deferred-re-check test below (readyState 2 →
    // NO listener). Half (a) was pinned by NOTHING: the test above holds BOTH
    // halves false at once, so deleting `!lines.value.length` left the whole
    // suite green. This is the case that isolates (a) — readyState 1, so (b) is
    // TRUE and only (a) can suppress the listener. Control for non-vacuity: the
    // "paints the initially-active cue once the sidecar <track> finishes loading"
    // test above uses the same readyState 1 with NO cues and DOES get a listener.
    const en = fakeTrack({ language: 'en', activeCues: [{ text: 'already here' }] });
    const el = fakeTrackEl(en, 1 /* LOADING */);
    const w = mountOverlay({ video: videoWithEls([en], [el]), language: 'en' });
    await nextTick();
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['already here']);
    expect(el.handlers.load ?? []).toHaveLength(0); // suppressed by the cues-present half alone
  });

  it('removes the <track> load listener on unmount', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [] });
    const el = fakeTrackEl(en, 1 /* LOADING */);
    const w = mountOverlay({ video: videoWithEls([en], [el]), language: 'en' });
    await nextTick();
    expect(el.handlers.load).toHaveLength(1);
    w.unmount();
    expect(el.handlers.load).toHaveLength(0);
  });

  it('removes the cuechange listener on unmount', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [{ text: 'x' }] });
    const w = mountOverlay({ video: videoWith([en]), language: 'en' });
    await nextTick();
    expect(en.handlers.cuechange).toHaveLength(1);
    w.unmount();
    expect(en.handlers.cuechange).toHaveLength(0);
  });

  it('survives a null video (no crash, renders nothing)', () => {
    const w = mountOverlay({ video: null, language: 'en' });
    expect(w.find('.player__captions').exists()).toBe(false);
  });

  // ---- S13: unconditional deferred mode re-check (scheduleModeRecheck) ---------
  // Covers the readyState-2 / no-cuechange gap directly. `rebind()` schedules a
  // single `setTimeout(0)` re-check that re-asserts `applyTrackModes` and re-reads
  // the (now-available) active cues even when NO `<track>` load listener was
  // attached (the guard only attaches one while `readyState !== 2`). Driven with
  // vitest fake timers since it is a `setTimeout(0)`.
  describe('scheduleModeRecheck (S13 deferred re-check)', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('re-asserts the default track mode and paints its cue on the deferred re-check for an already-LOADED (readyState 2) track that never fired cuechange', async () => {
      vi.useFakeTimers();
      // Server-default subtitle: the sidecar <track> is already LOADED (readyState
      // 2) but its cues are not surfaced synchronously at bind (activeCues empty),
      // and the engine never fires cuechange for the cue already active at load.
      // The `readyState !== 2` load-listener guard is skipped for a LOADED track,
      // so before S13 this stayed blank until a manual off/on toggle.
      const en = fakeTrack({ language: 'en', activeCues: [] });
      const el = fakeTrackEl(en, 2 /* LOADED */);
      const w = mountOverlay({ video: videoWithEls([en], [el]), language: 'en' });
      await nextTick();
      expect(w.find('.player__captions').exists()).toBe(false); // blank at bind
      expect(el.handlers.load ?? []).toHaveLength(0); // no load listener (readyState 2)
      // A competing owner flips the track to `showing` (the native-default fight
      // S13 removes) and the cue is now active — but no cuechange ever fires.
      en.mode = 'showing';
      en.activeCues = [{ text: 'Deferred paint' }];
      vi.runAllTimers(); // fire the setTimeout(0) deferred re-check
      await nextTick();
      expect(en.mode).toBe('hidden'); // applyTrackModes re-settled the mode
      expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Deferred paint']);
    });

    it('does not blank an already-painted cue when the deferred re-check reads no active cues', async () => {
      vi.useFakeTimers();
      const en = fakeTrack({ language: 'en', activeCues: [] });
      const el = fakeTrackEl(en, 2 /* LOADED */);
      const w = mountOverlay({ video: videoWithEls([en], [el]), language: 'en' });
      await nextTick();
      // A real cuechange paints a line before the deferred re-check fires.
      en.activeCues = [{ text: 'Painted by cuechange' }];
      fireCue(en);
      await nextTick();
      expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Painted by cuechange']);
      // Playhead now sits between cues → activeCues empty when the re-check runs.
      en.activeCues = [];
      vi.runAllTimers();
      await nextTick();
      // The re-check overwrites `lines` only when cues are present, so it must NOT
      // blank the line the cuechange painted.
      expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Painted by cuechange']);
    });

    it('cancels the pending deferred re-check on unmount (no leaked timer)', async () => {
      vi.useFakeTimers();
      const en = fakeTrack({ language: 'en', activeCues: [] });
      const el = fakeTrackEl(en, 2 /* LOADED */);
      const w = mountOverlay({ video: videoWithEls([en], [el]), language: 'en' });
      await nextTick();
      expect(vi.getTimerCount()).toBe(1); // exactly one deferred re-check pending
      w.unmount(); // onBeforeUnmount → unbind → clearRecheck
      expect(vi.getTimerCount()).toBe(0); // cancelled — no leak
    });

    it('keeps at most one deferred re-check pending across a rapid rebind (language switch)', async () => {
      vi.useFakeTimers();
      const en = fakeTrack({ language: 'en', activeCues: [] });
      const es = fakeTrack({ language: 'es', activeCues: [] });
      const w = mountOverlay({ video: videoWith([en, es]), language: 'en' });
      await nextTick();
      expect(vi.getTimerCount()).toBe(1);
      await w.setProps({ language: 'es' }); // rebind → unbind clears the stale timer, reschedules
      await nextTick();
      expect(vi.getTimerCount()).toBe(1); // still one — the previous timer was cancelled
    });
  });
});

// ---- render timing offset (S-ui-once-16 / phlix-ui-once-020) -----------------

/** A fake video that additionally carries a readable `currentTime` and records
 *  `timeupdate` listeners (the overlay's offset ticker attaches one only when a
 *  delay is active and the element answers `addEventListener`). `markRaw` mirrors
 *  a real element never being a reactive proxy. */
function videoClock(
  tracks: FakeTrack[],
  currentTime = 0,
): { video: HTMLVideoElement; handlers: Record<string, Array<() => void>>; setTime: (t: number) => void } {
  const list: Record<number, FakeTrack> & { length: number } = { length: tracks.length };
  tracks.forEach((t, i) => (list[i] = t));
  const handlers: Record<string, Array<() => void>> = {};
  const raw = markRaw({
    textTracks: list,
    currentTime,
    addEventListener(type: string, cb: () => void) {
      (handlers[type] ??= []).push(cb);
    },
    removeEventListener(type: string, cb: () => void) {
      handlers[type] = (handlers[type] ?? []).filter((h) => h !== cb);
    },
  });
  const setTime = (t: number) => {
    (raw as { currentTime: number }).currentTime = t;
  };
  return { video: raw as unknown as HTMLVideoElement, handlers, setTime };
}

function fireTimeupdate(handlers: Record<string, Array<() => void>>): void {
  (handlers.timeupdate ?? []).forEach((h) => h());
}

const CUES: FakeCue[] = [
  { start: 1, end: 2, text: 'First' },
  { start: 3, end: 4, text: 'Second' },
];

describe('render timing offset (S-ui-once-16)', () => {
  it('paints the cues of the DELAYED render position, not the engine activeCues', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [], cues: CUES });
    const { video, handlers, setTime } = videoClock([en], 2.5);
    const w = mountOverlay({ video, language: 'en' });
    await nextTick();
    // delay 0 → engine path: activeCues empty, nothing painted (pre-fix law).
    expect(w.find('.player__captions').exists()).toBe(false);

    const player = usePlayerStore();
    player.setSubtitleOffset(1); // "captions 1 s later" → paint the cues of t-1
    await nextTick();
    expect(handlers.timeupdate?.length).toBe(1); // the ticker is now attached
    // render position 2.5 - 1.0 = 1.5 ∈ [1,2) → 'First' even though the engine's
    // activeCues are empty: this is the offset-applied-to-render-timing pin.
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['First']);

    setTime(4.5); // engine ticks → recompute at 4.5 - 1.0 = 3.5 ∈ [3,4)
    fireTimeupdate(handlers);
    await nextTick();
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Second']);

    // end-exclusive boundary at the overlay level: 4.5 - 2.5 = 2.0 sits OUT of
    // [1,2) and before [3,4) → between cues → nothing painted.
    player.setSubtitleOffset(2.5);
    await nextTick();
    fireTimeupdate(handlers);
    await nextTick();
    expect(w.find('.player__captions').exists()).toBe(false);
  });

  it('applies the audio delay as a paired compensation delta (sum with subtitle delay)', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [], cues: CUES });
    const { video, handlers } = videoClock([en], 4.0);
    const w = mountOverlay({ video, language: 'en' });
    await nextTick();
    const player = usePlayerStore();
    player.setAudioOffset(0.5);
    player.setSubtitleOffset(0.5);
    await nextTick();
    // total 1.0 → render 3.0: cue [3,4) is start-INCLUSIVE → 'Second'.
    expect(handlers.timeupdate?.length).toBe(1);
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Second']);
  });

  it('detaches the timeupdate ticker on unmount (no listener leak on the shared element)', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [], cues: CUES });
    const { video, handlers } = videoClock([en], 2.5);
    const w = mountOverlay({ video, language: 'en' });
    const player = usePlayerStore();
    player.setSubtitleOffset(1);
    await nextTick();
    expect(handlers.timeupdate?.length).toBe(1);
    w.unmount();
    expect(handlers.timeupdate?.length).toBe(0);
  });

  it('degrades to the engine activeCues when track.cues are unavailable (delay inert, documented)', async () => {
    // videoWith() fake has NO addEventListener and the track has no `cues` —
    // the documented degradation surface (loading sidecar / exotic engine).
    const en = fakeTrack({ language: 'en', activeCues: [{ text: 'Engine cue' }] });
    const w = mountOverlay({ video: videoWith([en]), language: 'en' });
    await nextTick();
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Engine cue']);
    const player = usePlayerStore();
    player.setSubtitleOffset(5);
    await nextTick();
    fireCue(en);
    await nextTick();
    // offset inert: the raw activeCues still paint rather than a blank screen.
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Engine cue']);
  });

  it('at delay 0 keeps the untouched engine path (cuechange reads activeCues)', async () => {
    const en = fakeTrack({ language: 'en', activeCues: [] });
    const { video, handlers } = videoClock([en], 1.5);
    const w = mountOverlay({ video, language: 'en' });
    await nextTick();
    expect(Object.keys(handlers)).toEqual([]); // no ticker attached at delay 0
    en.activeCues = [{ text: 'Now speaking' }];
    fireCue(en);
    await nextTick();
    expect(w.findAll('.player__caption-line').map((p) => p.text())).toEqual(['Now speaking']);
  });
});

describe('offset helpers (S-ui-once-16)', () => {
  it('captionRenderTime reads back into the past for a positive delay', () => {
    expect(captionRenderTime(2.5, 1)).toBe(1.5);
    expect(captionRenderTime(2.5, -0.5)).toBe(3); // leading delay reads ahead
  });

  it('captionRenderTime refuses a non-finite delay to the raw media time', () => {
    expect(captionRenderTime(2.5, Number.NaN)).toBe(2.5);
    expect(captionRenderTime(2.5, Infinity)).toBe(2.5);
  });

  it('readCueLinesAt windows are start-inclusive, end-exclusive', () => {
    const track = { cues: CUES } as unknown as TextTrack;
    expect(readCueLinesAt(track, 1.5)).toEqual(['First']);
    expect(readCueLinesAt(track, 1)).toEqual(['First']); // start inclusive
    expect(readCueLinesAt(track, 2)).toEqual([]); // end exclusive
    expect(readCueLinesAt(track, 3)).toEqual(['Second']);
    expect(readCueLinesAt(track, 4)).toEqual([]);
    expect(readCueLinesAt(track, 10)).toEqual([]);
  });

  it('readCueLinesAt degrades to [] for null tracks, missing cues, bad positions', () => {
    expect(readCueLinesAt(null, 1)).toEqual([]);
    expect(readCueLinesAt({ } as unknown as TextTrack, 1)).toEqual([]);
    expect(readCueLinesAt({ cues: [{ start: Number.NaN, end: 2, text: 'x' }] } as unknown as TextTrack, 1)).toEqual([]);
    expect(readCueLinesAt({ cues: CUES } as unknown as TextTrack, Number.NaN)).toEqual([]);
  });
});
