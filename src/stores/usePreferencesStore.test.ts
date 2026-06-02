import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePreferencesStore, readStoredPreferences, DEFAULT_PREFERENCES } from './usePreferencesStore';

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
});
