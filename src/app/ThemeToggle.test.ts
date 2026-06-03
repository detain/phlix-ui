import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ThemeToggle from './ThemeToggle.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';

const wrappers: VueWrapper[] = [];
function mountToggle() {
  const w = mount(ThemeToggle);
  wrappers.push(w);
  return w;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('ThemeToggle', () => {
  it('labels the current + next theme', () => {
    const w = mountToggle();
    const label = w.get('button').attributes('aria-label')!;
    expect(label).toContain('Nocturne'); // current
    expect(label).toContain('Daylight'); // next
  });

  it('cycles nocturne -> daylight -> midnight -> nocturne on click', async () => {
    const w = mountToggle();
    const prefs = usePreferencesStore();
    const btn = w.get('button');
    expect(prefs.theme).toBe('nocturne');
    await btn.trigger('click');
    expect(prefs.theme).toBe('daylight');
    await btn.trigger('click');
    expect(prefs.theme).toBe('midnight');
    await btn.trigger('click');
    expect(prefs.theme).toBe('nocturne'); // wraps
  });

  it('updates its label as the theme changes', async () => {
    const w = mountToggle();
    await w.get('button').trigger('click'); // -> daylight
    expect(w.get('button').attributes('aria-label')).toContain('Daylight');
  });

  it('renders icon-only (no emoji)', () => {
    const w = mountToggle();
    expect(/[🌙☀️🖥️🙈👁]/u.test(w.html())).toBe(false);
  });
});
