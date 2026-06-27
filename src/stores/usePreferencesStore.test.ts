import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePreferencesStore, readStoredPreferences, DEFAULT_PREFERENCES, DEFAULT_CAPTION_STYLE } from './usePreferencesStore';

function mockMatchMedia(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: reduce && q.includes('reduce'),
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  localStorage.clear();
  mockMatchMedia(false);
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('usePreferencesStore', () => {
  it('starts from defaults when storage is empty', () => {
    const s = usePreferencesStore();
    expect(s.theme).toBe(DEFAULT_PREFERENCES.theme);
    expect(s.accent).toBeNull();
    expect(s.density).toBe('comfortable');
  });

  it('persists changes to localStorage', async () => {
    const s = usePreferencesStore();
    s.theme = 'daylight';
    s.accent = '#3366ff';
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 0));
    const raw = JSON.parse(localStorage.getItem('phlix.prefs')!);
    expect(raw.theme).toBe('daylight');
    expect(raw.accent).toBe('#3366ff');
  });

  it('readStoredPreferences merges stored over defaults and survives bad JSON', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'midnight', cardSize: 240 }));
    const p = readStoredPreferences();
    expect(p.theme).toBe('midnight');
    expect(p.cardSize).toBe(240);
    expect(p.autoplay).toBe(DEFAULT_PREFERENCES.autoplay); // default kept
    localStorage.setItem('phlix.prefs', '{not json');
    expect(readStoredPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it('hydrates from existing storage on init', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'midnight', density: 'compact' }));
    setActivePinia(createPinia());
    const s = usePreferencesStore();
    expect(s.theme).toBe('midnight');
    expect(s.density).toBe('compact');
  });

  it('effectiveReducedMotion resolves auto against the OS and respects on/off override', () => {
    mockMatchMedia(true);
    setActivePinia(createPinia());
    const s = usePreferencesStore();
    expect(s.reducedMotion).toBe('auto');
    expect(s.effectiveReducedMotion).toBe(true); // auto + OS reduce
    s.reducedMotion = 'off';
    expect(s.effectiveReducedMotion).toBe(false); // forced off beats OS
    s.reducedMotion = 'on';
    expect(s.effectiveReducedMotion).toBe(true);
  });

  it('reset() returns to defaults', () => {
    const s = usePreferencesStore();
    s.theme = 'daylight';
    s.cardSize = 300;
    s.reset();
    expect(s.theme).toBe('nocturne');
    expect(s.cardSize).toBe(DEFAULT_PREFERENCES.cardSize);
  });

  describe('tv (TV mode flag)', () => {
    it('defaults to false', () => {
      expect(DEFAULT_PREFERENCES.tv).toBe(false);
      expect(usePreferencesStore().tv).toBe(false);
    });

    it('persists into the prefs blob', async () => {
      const s = usePreferencesStore();
      s.tv = true;
      await Promise.resolve();
      await new Promise((r) => setTimeout(r, 0));
      const raw = JSON.parse(localStorage.getItem('phlix.prefs')!);
      expect(raw.tv).toBe(true);
    });

    it('hydrates from storage', () => {
      localStorage.setItem('phlix.prefs', JSON.stringify({ tv: true }));
      setActivePinia(createPinia());
      const s = usePreferencesStore();
      expect(s.tv).toBe(true);
    });

    it('is included in snapshot()', () => {
      const s = usePreferencesStore();
      s.tv = true;
      expect(s.snapshot().tv).toBe(true);
    });

    it('reset() clears it back to false', () => {
      const s = usePreferencesStore();
      s.tv = true;
      s.reset();
      expect(s.tv).toBe(false);
    });
  });

  describe('subtitlePreferenceSet (U4 — explicit Off vs no-preference)', () => {
    it('defaults to false (no caption choice made yet)', () => {
      expect(DEFAULT_PREFERENCES.subtitlePreferenceSet).toBe(false);
      expect(usePreferencesStore().subtitlePreferenceSet).toBe(false);
    });

    it('is persisted into the prefs blob', async () => {
      const s = usePreferencesStore();
      s.subtitlePreferenceSet = true;
      await Promise.resolve();
      await new Promise((r) => setTimeout(r, 0));
      const raw = JSON.parse(localStorage.getItem('phlix.prefs')!);
      expect(raw.subtitlePreferenceSet).toBe(true);
    });

    it('hydrates from storage (an explicit Off survives a reload)', () => {
      // defaultSubtitleLang null + the flag true == an explicit Off.
      localStorage.setItem(
        'phlix.prefs',
        JSON.stringify({ defaultSubtitleLang: null, subtitlePreferenceSet: true }),
      );
      setActivePinia(createPinia());
      const s = usePreferencesStore();
      expect(s.defaultSubtitleLang).toBeNull();
      expect(s.subtitlePreferenceSet).toBe(true);
    });

    it('reset() clears the flag back to false', () => {
      const s = usePreferencesStore();
      s.subtitlePreferenceSet = true;
      s.reset();
      expect(s.subtitlePreferenceSet).toBe(false);
    });
  });

  describe('filter presets', () => {
    it('saves a preset, persists it, and overwrites by name (stable id)', async () => {
      const s = usePreferencesStore();
      const p = s.saveFilterPreset('Sci-Fi Nights', { genres: ['Sci-Fi'], ratings: ['R'] });
      expect(p.id).toBe('sci-fi-nights');
      expect(s.filterPresets).toHaveLength(1);
      expect(s.filterPresets[0].query).toEqual({ genres: ['Sci-Fi'], ratings: ['R'] });

      // persisted into the prefs blob
      await Promise.resolve();
      await new Promise((r) => setTimeout(r, 0));
      const stored = JSON.parse(localStorage.getItem('phlix.prefs') as string);
      expect(stored.filterPresets[0].name).toBe('Sci-Fi Nights');

      // re-saving the same name overwrites rather than duplicating
      s.saveFilterPreset('Sci-Fi Nights', { genres: ['Sci-Fi'] });
      expect(s.filterPresets).toHaveLength(1);
      expect(s.filterPresets[0].query).toEqual({ genres: ['Sci-Fi'] });
    });

    it('removes a preset by id', () => {
      const s = usePreferencesStore();
      s.saveFilterPreset('A', { genres: ['Action'] });
      s.saveFilterPreset('B', { genres: ['Drama'] });
      expect(s.filterPresets).toHaveLength(2);
      s.removeFilterPreset('a');
      expect(s.filterPresets.map((p) => p.name)).toEqual(['B']);
    });

    it('reset() clears saved presets', () => {
      const s = usePreferencesStore();
      s.saveFilterPreset('Keep?', { genres: ['Action'] });
      s.reset();
      expect(s.filterPresets).toEqual([]);
    });

    it('hydrates presets from storage', () => {
      localStorage.setItem(
        'phlix.prefs',
        JSON.stringify({ filterPresets: [{ id: 'x', name: 'X', query: { genres: ['Sci-Fi'] } }] }),
      );
      const fresh = readStoredPreferences();
      expect(fresh.filterPresets).toHaveLength(1);
      setActivePinia(createPinia());
      const s = usePreferencesStore();
      expect(s.filterPresets[0].name).toBe('X');
    });
  });

  describe('caption style (R3.5)', () => {
    it('defaults to DEFAULT_CAPTION_STYLE', () => {
      const s = usePreferencesStore();
      expect(s.captionStyle).toEqual(DEFAULT_CAPTION_STYLE);
    });

    it('persists caption-style changes to localStorage', async () => {
      const s = usePreferencesStore();
      s.captionStyle = { ...s.captionStyle, size: 'xl', textColor: '#ffd400' };
      await Promise.resolve();
      await new Promise((r) => setTimeout(r, 0));
      const raw = JSON.parse(localStorage.getItem('phlix.prefs') as string);
      expect(raw.captionStyle.size).toBe('xl');
      expect(raw.captionStyle.textColor).toBe('#ffd400');
    });

    it('merges a stored PARTIAL caption style over the defaults (no dropped keys)', () => {
      localStorage.setItem('phlix.prefs', JSON.stringify({ captionStyle: { size: 'lg' } }));
      setActivePinia(createPinia());
      const s = usePreferencesStore();
      expect(s.captionStyle.size).toBe('lg'); // stored wins
      expect(s.captionStyle.textColor).toBe(DEFAULT_CAPTION_STYLE.textColor); // default kept
      expect(s.captionStyle.background).toBe(DEFAULT_CAPTION_STYLE.background);
      expect(s.captionStyle.edge).toBe(DEFAULT_CAPTION_STYLE.edge);
    });

    it('reset() restores the default caption style', () => {
      const s = usePreferencesStore();
      s.captionStyle = { ...s.captionStyle, size: 'sm', edge: 'outline' };
      s.reset();
      expect(s.captionStyle).toEqual(DEFAULT_CAPTION_STYLE);
    });

    it('never mutates the shared DEFAULT_CAPTION_STYLE through the store', () => {
      const s = usePreferencesStore();
      s.captionStyle.size = 'xl'; // direct mutation of the ref object
      expect(DEFAULT_CAPTION_STYLE.size).toBe('md'); // shared default untouched
    });
  });
});
