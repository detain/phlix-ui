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
});
