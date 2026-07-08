/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import {
  listSubtitleTracks,
  listAudioTracks,
  resolveTextTrack,
  hasActiveCaptions,
  applyTrackModes,
  applyAudioTrack,
  activeAudioIndex,
  cleanCueText,
  readActiveCueLines,
  edgeShadow,
  captionStyleVars,
  CAPTION_SIZE_SCALE,
  CAPTION_SIZE_OPTIONS,
  CAPTION_COLOR_OPTIONS,
  CAPTION_BACKGROUND_OPTIONS,
  CAPTION_EDGE_OPTIONS,
} from './captions';
import type { CaptionStyle } from '../../stores/usePreferencesStore';

/** array-like factory (mirrors a live TextTrackList / AudioTrackList). */
function listOf<T>(items: T[]): ArrayLike<T> {
  const o: Record<number, T> & { length: number } = { length: items.length };
  items.forEach((it, i) => (o[i] = it));
  return o as unknown as ArrayLike<T>;
}

interface FakeTrack {
  kind: string;
  label: string;
  language: string;
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
    label: '',
    language: '',
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

function videoWith(opts: { text?: FakeTrack[]; audio?: { language?: string; label?: string; id?: string; enabled?: boolean }[] }) {
  return {
    textTracks: opts.text ? listOf(opts.text) : listOf([]),
    audioTracks: opts.audio ? listOf(opts.audio) : undefined,
  } as unknown as HTMLVideoElement;
}

describe('captions — track enumeration', () => {
  it('lists only subtitle/caption tracks with index/language/label', () => {
    const v = videoWith({
      text: [
        fakeTrack({ kind: 'subtitles', language: 'en', label: 'English' }),
        fakeTrack({ kind: 'metadata', language: 'xx', label: 'chapters' }),
        fakeTrack({ kind: 'captions', language: 'es', label: '' }),
      ],
    });
    const tracks = listSubtitleTracks(v);
    expect(tracks).toHaveLength(2);
    expect(tracks[0]).toMatchObject({ index: 0, language: 'en', label: 'English', kind: 'subtitles' });
    // no label → language display name (Intl) or the code; either way non-empty
    expect(tracks[1].language).toBe('es');
    expect(tracks[1].label.length).toBeGreaterThan(0);
  });

  it('falls back to a stable key/label when a track has no language', () => {
    const v = videoWith({ text: [fakeTrack({ kind: 'subtitles', language: '', label: '' })] });
    const [t] = listSubtitleTracks(v);
    expect(t.language).toBe('track-0');
    expect(t.label).toBe('Track 1');
  });

  it('returns [] for a null video and an empty list', () => {
    expect(listSubtitleTracks(null)).toEqual([]);
    expect(listSubtitleTracks(videoWith({ text: [] }))).toEqual([]);
  });

  it('lists audio tracks only when audioTracks is exposed', () => {
    expect(listAudioTracks(videoWith({}))).toEqual([]);
    const v = videoWith({ audio: [{ language: 'en', label: 'English', enabled: true }, { id: 'commentary', label: '' }] });
    const audio = listAudioTracks(v);
    expect(audio).toHaveLength(2);
    expect(audio[0]).toMatchObject({ index: 0, language: 'en', label: 'English' });
    expect(audio[1].language).toBe('commentary'); // id fallback
  });
});

describe('captions — track resolution + modes', () => {
  it('resolves a track by language key (or null)', () => {
    const en = fakeTrack({ language: 'en' });
    const es = fakeTrack({ language: 'es' });
    const v = videoWith({ text: [en, es] });
    expect(resolveTextTrack(v, 'es')).toBe(es);
    expect(resolveTextTrack(v, 'fr')).toBeNull();
    expect(resolveTextTrack(v, null)).toBeNull();
    expect(resolveTextTrack(null, 'en')).toBeNull();
  });

  it('hasActiveCaptions reflects whether the language matches a track', () => {
    const v = videoWith({ text: [fakeTrack({ language: 'en' })] });
    expect(hasActiveCaptions(v, 'en')).toBe(true);
    expect(hasActiveCaptions(v, 'de')).toBe(false);
    expect(hasActiveCaptions(v, null)).toBe(false);
  });

  it('applyTrackModes hides the selected track and disables the rest', () => {
    const en = fakeTrack({ language: 'en', mode: 'disabled' });
    const es = fakeTrack({ language: 'es', mode: 'showing' });
    const v = videoWith({ text: [en, es] });
    applyTrackModes(v, 'en');
    expect(en.mode).toBe('hidden');
    expect(es.mode).toBe('disabled');
    // turning captions off disables all
    applyTrackModes(v, null);
    expect(en.mode).toBe('disabled');
    expect(es.mode).toBe('disabled');
  });

  it('applyTrackModes tolerates a read-only mode setter', () => {
    const ro = fakeTrack({ language: 'en' });
    Object.defineProperty(ro, 'mode', {
      get: () => 'disabled',
      set: () => {
        throw new Error('read-only');
      },
    });
    const v = videoWith({ text: [ro] });
    expect(() => applyTrackModes(v, 'en')).not.toThrow();
  });

  it('applyAudioTrack enables one and disables the rest; activeAudioIndex reports it', () => {
    const audio = [{ enabled: true }, { enabled: false }, { enabled: false }];
    const v = videoWith({ audio });
    applyAudioTrack(v, 2);
    expect(audio.map((a) => a.enabled)).toEqual([false, false, true]);
    expect(activeAudioIndex(v)).toBe(2);
    expect(activeAudioIndex(videoWith({}))).toBe(-1);
  });
});

describe('captions — cue text', () => {
  it('strips VTT/HTML tags and timestamp tags, splits + trims lines', () => {
    expect(cleanCueText('<v Bob><c.loud>Hello</c></v>\n  <i>there</i>  ')).toEqual(['Hello', 'there']);
    expect(cleanCueText('<00:00:01.000>tick')).toEqual(['tick']);
  });

  it('drops empty lines and handles null/empty', () => {
    expect(cleanCueText('\n\n   \n')).toEqual([]);
    expect(cleanCueText('')).toEqual([]);
    expect(cleanCueText(null)).toEqual([]);
    expect(cleanCueText(undefined)).toEqual([]);
  });

  it('decodes named + numeric + hex entities (rendered as text, never markup)', () => {
    expect(cleanCueText('Tom &amp; Jerry')).toEqual(['Tom & Jerry']);
    expect(cleanCueText('caf&#233;')).toEqual(['café']);
    expect(cleanCueText('&#x26;')).toEqual(['&']);
    // an unknown entity is left as-is
    expect(cleanCueText('&bogus;')).toEqual(['&bogus;']);
    // an out-of-range numeric code point falls back to the literal (no crash)
    expect(cleanCueText('&#x110000;')).toEqual(['&#x110000;']);
    // a decoded "<" is plain text (the tag-strip already ran), not a new tag
    expect(cleanCueText('&lt;b&gt;')).toEqual(['<b>']);
  });

  it('readActiveCueLines reads the active cues (or [])', () => {
    const track = fakeTrack({ activeCues: [{ text: 'Line A' }, { text: 'Line B\nB2' }] });
    expect(readActiveCueLines(track as unknown as TextTrack)).toEqual(['Line A', 'Line B', 'B2']);
    expect(readActiveCueLines(null)).toEqual([]);
    expect(readActiveCueLines(fakeTrack({ activeCues: null }) as unknown as TextTrack)).toEqual([]);
  });
});

describe('captions — styling', () => {
  const base: CaptionStyle = { size: 'md', textColor: '#ffffff', background: 'none', edge: 'drop-shadow' };

  it('maps each edge to its text-shadow', () => {
    expect(edgeShadow('none')).toBe('none');
    expect(edgeShadow('drop-shadow')).toContain('rgba(0, 0, 0, 0.85)');
    expect(edgeShadow('outline')).toContain('-1px -1px 0 #000');
    expect(edgeShadow('raised')).toContain('1px 1px 0 rgba(0, 0, 0, 0.9)');
  });

  it('captionStyleVars produces the overlay custom properties', () => {
    const vars = captionStyleVars(base);
    expect(vars['--cap-scale']).toBe('1');
    expect(vars['--cap-color']).toBe('#ffffff');
    expect(vars['--cap-bg']).toBe('transparent');
    expect(vars['--cap-pad']).toBe('0'); // no padding when background is off
    expect(vars['--cap-shadow']).toBe(edgeShadow('drop-shadow'));
  });

  it('scales font + pads + fills the box per size/background', () => {
    expect(captionStyleVars({ ...base, size: 'xl' })['--cap-scale']).toBe(String(CAPTION_SIZE_SCALE.xl));
    expect(captionStyleVars({ ...base, background: 'semi' })['--cap-bg']).toBe('rgba(0, 0, 0, 0.6)');
    const solid = captionStyleVars({ ...base, background: 'solid' });
    expect(solid['--cap-bg']).toBe('#000000');
    expect(solid['--cap-pad']).not.toBe('0'); // padded when a box is shown
  });

  it('exposes the menu option lists', () => {
    expect(CAPTION_SIZE_OPTIONS.map((o) => o.value)).toEqual(['sm', 'md', 'lg', 'xl']);
    expect(CAPTION_COLOR_OPTIONS[0]).toEqual({ value: '#ffffff', label: 'White' });
    expect(CAPTION_BACKGROUND_OPTIONS.map((o) => o.value)).toEqual(['none', 'semi', 'solid']);
    expect(CAPTION_EDGE_OPTIONS.map((o) => o.value)).toEqual(['none', 'drop-shadow', 'outline', 'raised']);
  });
});
