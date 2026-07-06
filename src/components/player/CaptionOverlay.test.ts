import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, markRaw } from 'vue';
import CaptionOverlay from './CaptionOverlay.vue';
import { DEFAULT_CAPTION_STYLE, type CaptionStyle } from '../../stores/usePreferencesStore';

interface FakeTrack {
  kind: string;
  language: string;
  label: string;
  mode: string;
  activeCues: { text: string }[] | null;
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
 *  exposes, so the overlay's load-time re-read can be exercised. */
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

function mountOverlay(props: Partial<{ video: HTMLVideoElement | null; language: string | null; styleConfig: CaptionStyle; lifted: boolean }>) {
  return mount(CaptionOverlay, {
    props: { video: null, language: null, styleConfig: { ...DEFAULT_CAPTION_STYLE }, lifted: false, ...props },
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
});
