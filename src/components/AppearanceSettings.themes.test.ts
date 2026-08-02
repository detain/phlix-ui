/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import AppearanceSettings from './AppearanceSettings.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';

/**
 * S86 — the theme PICKER surfaces plugin themes alongside the three built-ins.
 *
 * `AppearanceSettings.test.ts` keeps asserting the built-in-only picker has
 * exactly three entries (no apiBase is provided there, so no catalogue is
 * fetched). That file is the regression net for "built-ins unaffected"; this
 * one adds the plugin leg.
 */

const DUSK = {
  id: 'sample-dusk', name: 'Sample Dusk', dark: true, extends: 'midnight',
  tokens: { '--bg': '#05060a', '--text': '#e6ecf5' }, source: 'sample-theme', builtIn: false,
};
const CONTRAST = {
  id: 'sample-dusk-high-contrast', name: 'Sample Dusk (High Contrast)', dark: true,
  extends: 'sample-dusk', tokens: { '--text': '#ffffff' }, source: 'sample-theme', builtIn: false,
};
const MIDNIGHT = {
  id: 'midnight', name: 'Midnight', dark: true, extends: null,
  tokens: { '--bg': '#000000' }, source: null, builtIn: true,
};

function jsonResponse(body: unknown): Response {
  return {
    ok: true, status: 200,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

const wrappers: VueWrapper[] = [];
async function mountPicker(apiBase = 'https://media.example') {
  const w = mount(AppearanceSettings, {
    props: { panel: 'appearance' as const },
    global: { provide: { apiBase } },
  });
  wrappers.push(w);
  await nextTick();
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
  return w;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ themes: [MIDNIGHT, DUSK, CONTRAST] })));
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('AC: the sample plugin\'s theme is SELECTABLE in the picker', () => {
  it('appends the plugin themes after the three built-ins', async () => {
    const w = await mountPicker();
    const swatches = w.findAll('.aps__theme');
    expect(swatches).toHaveLength(5);
    expect(swatches.map((s) => s.text())).toEqual([
      'Nocturne', 'Daylight', 'Midnight', 'Sample Dusk', 'Sample Dusk (High Contrast)',
    ]);
  });

  it('selecting a plugin swatch writes its id to the preferences store', async () => {
    const w = await mountPicker();
    const prefs = usePreferencesStore();

    await w.findAll('.aps__theme')[3].trigger('click');

    expect(prefs.theme).toBe('sample-dusk');
    expect(w.findAll('.aps__theme')[3].attributes('aria-checked')).toBe('true');
    expect(w.findAll('.aps__theme')[0].attributes('aria-checked')).toBe('false');
  });

  it('previews each plugin swatch against its resolved BASE with its own tokens on top', async () => {
    const w = await mountPicker();
    const swatches = w.findAll('.aps__theme');

    // Built-in swatches re-scope [data-theme] to themselves and add nothing.
    expect(swatches[0].attributes('data-theme')).toBe('nocturne');
    expect(swatches[2].attributes('data-theme')).toBe('midnight');

    // A plugin swatch scopes to its base built-in and layers its own tokens, so
    // the preview is the real palette rather than the base's.
    expect(swatches[3].attributes('data-theme')).toBe('midnight');
    const duskStyle = swatches[3].attributes('style') ?? '';
    expect(duskStyle).toContain('--bg: #05060a');
    expect(duskStyle).toContain('--text: #e6ecf5');

    // Two hops: the variant previews on midnight with dusk's --bg inherited and
    // its own --text winning.
    expect(swatches[4].attributes('data-theme')).toBe('midnight');
    const contrastStyle = swatches[4].attributes('style') ?? '';
    expect(contrastStyle).toContain('--bg: #05060a');
    expect(contrastStyle).toContain('--text: #ffffff');
  });

  it('never inline-styles a BUILT-IN swatch — those render from the stylesheet alone', async () => {
    const w = await mountPicker();
    for (const i of [0, 1, 2]) {
      expect(w.findAll('.aps__theme')[i].attributes('style')).toBeUndefined();
    }
  });

  it('arrow-key navigation reaches the plugin entries', async () => {
    const w = await mountPicker();
    const prefs = usePreferencesStore();
    const group = w.find('.aps__themes');

    await group.trigger('keydown', { key: 'End' });
    expect(prefs.theme).toBe('sample-dusk-high-contrast'); // last entry, not 'midnight'

    await group.trigger('keydown', { key: 'Home' });
    expect(prefs.theme).toBe('nocturne');

    // ArrowLeft from the first entry wraps to the LAST — which is now a plugin.
    await group.trigger('keydown', { key: 'ArrowLeft' });
    expect(prefs.theme).toBe('sample-dusk-high-contrast');
  });

  it('keeps the roving tabindex on the selected PLUGIN entry', async () => {
    const w = await mountPicker();
    usePreferencesStore().theme = 'sample-dusk';
    await nextTick();

    const tabindexes = w.findAll('.aps__theme').map((s) => s.attributes('tabindex'));
    expect(tabindexes).toEqual(['-1', '-1', '-1', '0', '-1']);
  });

  it('degrades to the three built-ins when the catalogue cannot be fetched', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const w = await mountPicker();
    expect(w.findAll('.aps__theme')).toHaveLength(3);
  });

  it('shows only the built-ins with no apiBase, making NO request', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    const w = await mountPicker('');
    expect(w.findAll('.aps__theme')).toHaveLength(3);
    expect(f).not.toHaveBeenCalled();
  });
});
