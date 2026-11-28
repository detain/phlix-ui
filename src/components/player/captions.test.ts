/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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
  languageLabel,
  localizeCaptionOptions,
  trackDisplayLabel,
} from './captions';
import type { TextTrackInfo } from './captions';
import { parsePlaybackAudioTracks } from './playback';
import { DEFAULT_MESSAGES, createTranslator } from '../../i18n/messages';
import { DE_MESSAGES } from '../../i18n/locales/de';
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
    expect(CAPTION_COLOR_OPTIONS[0]).toEqual({ value: '#ffffff', label: 'White', key: 'player.captionColorWhite' });
    expect(CAPTION_BACKGROUND_OPTIONS.map((o) => o.value)).toEqual(['none', 'semi', 'solid']);
    expect(CAPTION_EDGE_OPTIONS.map((o) => o.value)).toEqual(['none', 'drop-shadow', 'outline', 'raised']);
  });
});

// ---- catalog-keyed option labels (S-ui-player-07 / phlix-ui-player-018) ------

describe('captions — catalog-keyed option labels (S-ui-player-07)', () => {
  const en = createTranslator();

  it('every menu option carries a catalog key that resolves to its label', () => {
    const all = [
      ...CAPTION_SIZE_OPTIONS,
      ...CAPTION_COLOR_OPTIONS,
      ...CAPTION_BACKGROUND_OPTIONS,
      ...CAPTION_EDGE_OPTIONS,
    ];
    for (const option of all) {
      expect(typeof option.key).toBe('string');
      expect(option.key.startsWith('player.')).toBe(true);
      expect(en(option.key)).toBe(option.label);
    }
  });

  it('option labels come from the English catalog defaults (no raw literals)', () => {
    expect(CAPTION_SIZE_OPTIONS.map((o) => o.label)).toEqual([
      DEFAULT_MESSAGES.player.captionSizeSmall,
      DEFAULT_MESSAGES.player.captionSizeMedium,
      DEFAULT_MESSAGES.player.captionSizeLarge,
      DEFAULT_MESSAGES.player.captionSizeExtraLarge,
    ]);
    expect(CAPTION_COLOR_OPTIONS.map((o) => o.label)).toEqual([
      DEFAULT_MESSAGES.player.captionColorWhite,
      DEFAULT_MESSAGES.player.captionColorYellow,
      DEFAULT_MESSAGES.player.captionColorCyan,
      DEFAULT_MESSAGES.player.captionColorGreen,
    ]);
    expect(CAPTION_EDGE_OPTIONS.map((o) => o.label)).toEqual([
      DEFAULT_MESSAGES.player.captionEdgeNone,
      DEFAULT_MESSAGES.player.captionEdgeDropShadow,
      DEFAULT_MESSAGES.player.captionEdgeOutline,
      DEFAULT_MESSAGES.player.captionEdgeRaised,
    ]);
    expect(CAPTION_BACKGROUND_OPTIONS[0].key).toBe('player.off');
  });

  it('localizeCaptionOptions re-labels options through the active translator', () => {
    const de = createTranslator(DE_MESSAGES);
    expect(localizeCaptionOptions(CAPTION_COLOR_OPTIONS, de).map((o) => o.label)).toEqual(['Weiß', 'Gelb', 'Zyan', 'Grün']);
    expect(localizeCaptionOptions(CAPTION_SIZE_OPTIONS, de).map((o) => o.label)).toEqual(['Klein', 'Mittel', 'Groß', 'Sehr groß']);
  });

  it('localizeCaptionOptions output stays plain SelectOption shape', () => {
    for (const o of localizeCaptionOptions(CAPTION_EDGE_OPTIONS, en)) {
      expect(Object.keys(o).sort()).toEqual(['label', 'value']);
    }
  });
});

describe('captions — language names follow the message locale (S-ui-player-07)', () => {
  it('defaults to English names when no locale is given', () => {
    expect(languageLabel('de')).toBe('German');
    expect(languageLabel('en')).toBe('English');
    expect(languageLabel('')).toBe('');
    expect(languageLabel(undefined)).toBe('');
  });

  it('renders names in the requested message locale (was hardcoded English)', () => {
    expect(languageLabel('de', 'de')).toBe('Deutsch');
    expect(languageLabel('de', 'ja')).toBe('ドイツ語');
    expect(languageLabel('pt', 'pt_BR')).toBe('português');
    expect(languageLabel('en', 'de')).toBe('Englisch');
  });

  it('falls back to English for an unknown locale tag', () => {
    expect(languageLabel('de', 'zz')).toBe('German');
  });

  it('invalid language codes fall back to the raw code', () => {
    expect(languageLabel('xx-!@#', 'de')).toBe('xx-!@#');
  });
});

describe('captions — track label provenance + display-time resolution (S-ui-player-07)', () => {
  const en = createTranslator();
  const de = createTranslator(DE_MESSAGES);

  it('enumeration marks how each label was derived (labelKind)', () => {
    const v = videoWith({
      text: [
        fakeTrack({ kind: 'subtitles', language: 'de', label: '' }),
        fakeTrack({ kind: 'captions', language: '', label: '' }),
        fakeTrack({ kind: 'subtitles', language: 'en', label: 'Forced EN' }),
      ],
      audio: [{ language: 'fr', label: '', id: 'a0' }, { language: '', label: '', id: 'a1' }],
    });
    const subs = listSubtitleTracks(v);
    expect(subs[0]).toMatchObject({ label: 'German', labelKind: 'language' });
    expect(subs[1]).toMatchObject({ label: 'Track 2', labelKind: 'generated' });
    expect(subs[2]).toMatchObject({ label: 'Forced EN', labelKind: 'title' });
    const auds = listAudioTracks(v);
    expect(auds[0]).toMatchObject({ label: 'French', labelKind: 'language' });
    expect(auds[1]).toMatchObject({ label: 'Audio 2', labelKind: 'generated' });
  });

  it('generated fallbacks resolve through the catalog with {number}', () => {
    const sub = { index: 1, language: 'track-1', label: 'Track 2', kind: 'subtitles', labelKind: 'generated' } as TextTrackInfo;
    expect(trackDisplayLabel(sub, de)).toBe('Spur 2');
    expect(trackDisplayLabel(sub, en)).toBe('Track 2');
    const aud = { index: 0, language: 'audio-0', label: 'Audio 1', kind: 'audio', labelKind: 'generated' } as TextTrackInfo;
    expect(trackDisplayLabel(aud, de)).toBe('Tonspur 1');
    expect(trackDisplayLabel(aud, en)).toBe('Audio 1');
  });

  it('language-derived labels re-resolve in the active locale at display time', () => {
    const t = { index: 0, language: 'de', label: 'German', kind: 'subtitles', labelKind: 'language' } as TextTrackInfo;
    expect(trackDisplayLabel(t, en, 'de')).toBe('Deutsch');
    expect(trackDisplayLabel(t, en, 'ja')).toBe('ドイツ語');
    expect(trackDisplayLabel(t, en, null)).toBe('German');
  });

  it('author-provided titles pass through verbatim; unmarked labels too', () => {
    const t = { index: 0, language: 'en', label: 'Director commentary', kind: 'subtitles', labelKind: 'title' } as TextTrackInfo;
    expect(trackDisplayLabel(t, de, 'de')).toBe('Director commentary');
    const plain = { index: 0, language: 'en', label: 'English', kind: 'subtitles' } as TextTrackInfo;
    expect(trackDisplayLabel(plain, de, 'de')).toBe('English');
  });
});

describe('playback — parsed audio tracks mark label provenance (S-ui-player-07)', () => {
  it('title → "title", no title and no language → "generated"', () => {
    const [commentary] = parsePlaybackAudioTracks([{ index: 0, title: 'Commentary', language: 'en' }]);
    expect(commentary.label).toBe('Commentary');
    expect(commentary.labelKind).toBe('title');
    const [orphan] = parsePlaybackAudioTracks([{ index: 1, title: '', language: '' }]);
    expect(orphan.label).toBe('Audio 2');
    expect(orphan.labelKind).toBe('generated');
  });

  it('language-only entries keep the raw code display and no marker', () => {
    const [t] = parsePlaybackAudioTracks([{ index: 0, title: '', language: 'de' }]);
    expect(t.label).toBe('de');
    expect(t.labelKind).toBeUndefined();
  });
});
