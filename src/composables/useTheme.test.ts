import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useTheme, applyStoredThemeEarly } from './useTheme';
import { usePreferencesStore } from '../stores/usePreferencesStore';

function mockMatchMedia(reduce = false) {
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

const Host = defineComponent({ setup: () => { useTheme(); return () => null; } });

beforeEach(() => {
  localStorage.clear();
  mockMatchMedia(false);
  setActivePinia(createPinia());
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.removeAttribute('data-density');
  document.documentElement.removeAttribute('data-reduced-motion');
  document.documentElement.removeAttribute('data-tv');
  document.documentElement.removeAttribute('style');
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('applyStoredThemeEarly', () => {
  it('sets <html> attributes from persisted prefs before mount', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'daylight', density: 'compact', accent: '#3366ff' }));
    applyStoredThemeEarly();
    const el = document.documentElement;
    expect(el.getAttribute('data-theme')).toBe('daylight');
    expect(el.getAttribute('data-density')).toBe('compact');
    expect(el.style.getPropertyValue('--accent')).toBe('#3366ff');
  });
});

describe('useTheme', () => {
  it('reflects the store onto <html> and updates live', async () => {
    const w = mount(Host);
    await nextTick();
    const el = document.documentElement;
    expect(el.getAttribute('data-theme')).toBe('nocturne');
    expect(el.getAttribute('data-density')).toBe('comfortable');

    const prefs = usePreferencesStore();
    prefs.theme = 'midnight';
    prefs.density = 'compact';
    await nextTick();
    expect(el.getAttribute('data-theme')).toBe('midnight');
    expect(el.getAttribute('data-density')).toBe('compact');
    w.unmount();
  });

  it('applies + clears the accent override', async () => {
    const w = mount(Host);
    const el = document.documentElement;
    const prefs = usePreferencesStore();
    prefs.accent = '#3366ff';
    await nextTick();
    expect(el.style.getPropertyValue('--accent')).toBe('#3366ff');
    expect(el.style.getPropertyValue('--accent-ring')).toMatch(/rgba\(51, 102, 255/);
    prefs.accent = null; // back to theme amber
    await nextTick();
    expect(el.style.getPropertyValue('--accent')).toBe('');
    w.unmount();
  });

  it('sets data-reduced-motion when reducedMotion is forced on', async () => {
    const w = mount(Host);
    const el = document.documentElement;
    const prefs = usePreferencesStore();
    prefs.reducedMotion = 'on';
    await nextTick();
    expect(el.getAttribute('data-reduced-motion')).toBe('true');
    prefs.reducedMotion = 'off';
    await nextTick();
    expect(el.hasAttribute('data-reduced-motion')).toBe(false);
    w.unmount();
  });

  it('sets + clears data-tv when TV mode toggles', async () => {
    const w = mount(Host);
    const el = document.documentElement;
    const prefs = usePreferencesStore();
    expect(el.hasAttribute('data-tv')).toBe(false); // default off
    prefs.tv = true;
    await nextTick();
    expect(el.getAttribute('data-tv')).toBe('true');
    prefs.tv = false;
    await nextTick();
    expect(el.hasAttribute('data-tv')).toBe(false);
    w.unmount();
  });
});

describe('applyStoredThemeEarly — TV mode', () => {
  it('seeds data-tv for a first-time visitor when defaultTv is true', () => {
    applyStoredThemeEarly(undefined, true);
    expect(document.documentElement.getAttribute('data-tv')).toBe('true');
  });

  it('does not set data-tv when defaultTv is omitted (default off)', () => {
    applyStoredThemeEarly();
    expect(document.documentElement.hasAttribute('data-tv')).toBe(false);
  });

  it('lets a stored tv:false preference win over defaultTv:true', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ tv: false }));
    applyStoredThemeEarly(undefined, true);
    expect(document.documentElement.hasAttribute('data-tv')).toBe(false);
  });
});

// R6.4c GAP-3 (spec-named, cross-cutting): the individual pieces — live reflect (useTheme), store persistence,
// and the early bootstrap (applyStoredThemeEarly) — are each tested in isolation, but nothing chains the
// live WRITE path to the reload READ path. A storage key/shape drift between usePreferencesStore's persist
// and applyStoredThemeEarly's read would pass every unit test yet flash/reset the theme on a real reload.
// This locks that what the live theme switch persists is exactly what a fresh bootstrap re-applies.
describe('theme persists across a reload (write-path ↔ read-path agree)', () => {
  it('a live theme change is persisted and re-applied by a fresh applyStoredThemeEarly', async () => {
    // 1) LIVE: a useTheme-bound app changes theme/density/accent
    const w = mount(Host);
    const prefs = usePreferencesStore();
    prefs.theme = 'midnight';
    prefs.density = 'compact';
    prefs.accent = '#3366ff';
    await nextTick();
    const el = document.documentElement;
    expect(el.getAttribute('data-theme')).toBe('midnight'); // live reflected onto <html>
    expect(el.getAttribute('data-density')).toBe('compact');
    expect(el.style.getPropertyValue('--accent')).toBe('#3366ff');

    // let the store's debounced persistence flush to localStorage
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 0));
    expect(JSON.parse(localStorage.getItem('phlix.prefs')!).theme).toBe('midnight');

    w.unmount();

    // 2) SIMULATE A RELOAD: discard the live DOM + the in-memory store; only localStorage survives
    el.removeAttribute('data-theme');
    el.removeAttribute('data-density');
    el.removeAttribute('style');
    setActivePinia(createPinia()); // the live store is gone — applyStoredThemeEarly reads storage, not it

    // 3) the no-flash bootstrap (runs before mount on the fresh load) must re-apply the persisted choice
    applyStoredThemeEarly();
    expect(el.getAttribute('data-theme')).toBe('midnight');
    expect(el.getAttribute('data-density')).toBe('compact');
    expect(el.style.getPropertyValue('--accent')).toBe('#3366ff');
  });
});
