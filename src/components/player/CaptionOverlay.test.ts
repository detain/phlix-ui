import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
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

function fireCue(track: FakeTrack): void {
  (track.handlers.cuechange ?? []).forEach((h) => h());
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
