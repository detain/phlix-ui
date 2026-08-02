/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useTheme, applyStoredThemeEarly } from './useTheme';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import { useThemesStore } from '../stores/useThemesStore';
import { THEME_CACHE_KEY, THEME_TOKEN_ALLOWLIST } from './themeTokens';
import { ACCESS_TOKEN_KEY } from '../api/tokenStore';

/**
 * S86 — the SPA leg of server/plugin theme rendering, end to end on `<html>`.
 *
 * `useTheme.test.ts` covers the pre-S86 behaviour (built-in reflect, accent,
 * density, reduced motion, TV, reload round-trip) and must keep passing
 * untouched: that file IS the "built-ins unaffected" regression net. This file
 * adds the plugin-theme leg and the no-FOUC boot cache.
 */

const DUSK = {
  id: 'sample-dusk', name: 'Sample Dusk', dark: true, extends: 'midnight',
  tokens: { '--bg': '#05060a', '--text': '#e6ecf5', '--accent': '#6ea8fe' },
  source: 'sample-theme', builtIn: false,
};
/** The list endpoint really ships a full token map for a built-in — see themeTokens. */
const MIDNIGHT = {
  id: 'midnight', name: 'Midnight', dark: true, extends: null,
  tokens: Object.fromEntries(THEME_TOKEN_ALLOWLIST.map((k) => [k, k === '--grain-opacity' ? '0.02' : '#010101'])),
  source: null, builtIn: true,
};

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function stubCatalogue(themes: unknown[] = [MIDNIGHT, DUSK]) {
  const f = vi.fn().mockResolvedValue(jsonResponse({ themes }));
  vi.stubGlobal('fetch', f);
  return f;
}

/** `useTheme` only fetches when there is a session — mint one. */
function signIn() {
  localStorage.setItem(ACCESS_TOKEN_KEY, 'test-access-token');
}

const el = () => document.documentElement;
const wrappers: VueWrapper[] = [];

function mountHost(apiBase = 'https://media.example') {
  const Host = defineComponent({ setup: () => { useTheme(); return () => null; } });
  const w = mount(Host, { global: { provide: { apiBase } } });
  wrappers.push(w);
  return w;
}

/** Every allowlisted custom property currently set INLINE on <html>. */
function inlineThemeTokens(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of THEME_TOKEN_ALLOWLIST) {
    const v = el().style.getPropertyValue(key);
    if (v !== '') out[key] = v;
  }
  return out;
}

beforeEach(() => {
  localStorage.clear();
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: false, media: q,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
  setActivePinia(createPinia());
  for (const a of ['data-theme', 'data-density', 'data-reduced-motion', 'data-tv', 'style']) {
    el().removeAttribute(a);
  }
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('AC: existing built-in themes are UNAFFECTED', () => {
  it.each(['nocturne', 'daylight', 'midnight'])(
    'applies %s with data-theme alone and ZERO inline custom properties',
    async (id) => {
      stubCatalogue();
      signIn();
      mountHost();
      const prefs = usePreferencesStore();
      prefs.theme = id;
      await nextTick();
      // Let the catalogue land too — a built-in must be unaffected before AND
      // after the plugin catalogue arrives.
      await new Promise((r) => setTimeout(r, 0));
      await nextTick();

      expect(el().getAttribute('data-theme')).toBe(id);
      expect(inlineThemeTokens()).toEqual({});
      // Nothing at all on the inline style — not one property.
      expect(el().getAttribute('style')).toBeNull();
    },
  );

  it('does not fetch the catalogue when signed OUT', async () => {
    const f = stubCatalogue();
    mountHost(); // no ACCESS_TOKEN_KEY
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    expect(f).not.toHaveBeenCalled();
    expect(el().getAttribute('data-theme')).toBe('nocturne');
  });

  it('does not fetch the catalogue when there is no apiBase (standalone mount)', async () => {
    const f = stubCatalogue();
    signIn();
    mountHost('');
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    expect(f).not.toHaveBeenCalled();
  });

  it('leaves the built-ins working when the catalogue fetch FAILS', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    signIn();
    mountHost();
    const prefs = usePreferencesStore();
    prefs.theme = 'daylight';
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();

    expect(el().getAttribute('data-theme')).toBe('daylight');
    expect(el().getAttribute('style')).toBeNull();
    expect(useThemesStore().error).toBe('offline');
  });
});

describe('AC: a plugin theme is selectable and renders', () => {
  it('points data-theme at the BASE built-in and sets the plugin tokens inline', async () => {
    stubCatalogue();
    signIn();
    mountHost();
    const prefs = usePreferencesStore();
    prefs.theme = 'sample-dusk';
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();

    // The base supplies the 50 tokens the plugin does not set, through the
    // stylesheet's [data-theme='midnight'] block.
    expect(el().getAttribute('data-theme')).toBe('midnight');
    expect(inlineThemeTokens()).toEqual({
      '--bg': '#05060a', '--text': '#e6ecf5', '--accent': '#6ea8fe',
    });
  });

  it('applies tokens through CSSOM setProperty and adds no <style> element', async () => {
    // CSP posture. jsdom does NOT enforce CSP, so this pins the MECHANISM (a
    // CSSOM write, which `style-src` does not govern) rather than a browser's
    // verdict on the header.
    const spy = vi.spyOn(CSSStyleDeclaration.prototype, 'setProperty');
    const stylesBefore = document.querySelectorAll('style').length;
    stubCatalogue();
    signIn();
    mountHost();
    usePreferencesStore().theme = 'sample-dusk';
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();

    expect(spy).toHaveBeenCalledWith('--bg', '#05060a');
    expect(document.querySelectorAll('style').length).toBe(stylesBefore);
  });

  it('switching BACK to a built-in removes every plugin token — no stale override', async () => {
    stubCatalogue();
    signIn();
    mountHost();
    const prefs = usePreferencesStore();
    prefs.theme = 'sample-dusk';
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();
    expect(inlineThemeTokens()['--bg']).toBe('#05060a');

    prefs.theme = 'nocturne';
    await nextTick();

    expect(el().getAttribute('data-theme')).toBe('nocturne');
    expect(inlineThemeTokens()).toEqual({});
    // Not `getAttribute('style') === null`: once a property has been set, the
    // attribute survives as an EMPTY string after removeProperty (in jsdom and
    // in real browsers alike). What matters is that no declaration is left.
    expect(el().style.cssText).toBe('');
    expect(el().style.length).toBe(0);
  });

  it('an explicit user accent still beats the plugin theme\'s accent', async () => {
    stubCatalogue();
    signIn();
    mountHost();
    const prefs = usePreferencesStore();
    prefs.theme = 'sample-dusk';
    prefs.accent = '#3366ff';
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();

    expect(el().style.getPropertyValue('--accent')).toBe('#3366ff'); // not #6ea8fe
    expect(el().style.getPropertyValue('--bg')).toBe('#05060a'); // theme still applied
  });

  it('an id the server no longer serves degrades instead of breaking', async () => {
    stubCatalogue([MIDNIGHT]); // the plugin was uninstalled
    signIn();
    mountHost();
    usePreferencesStore().theme = 'sample-dusk';
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();

    // data-theme still SAYS what is selected; it matches no rule, so :root
    // (nocturne) paints. No tokens applied, nothing thrown.
    expect(el().getAttribute('data-theme')).toBe('sample-dusk');
    expect(inlineThemeTokens()).toEqual({});
  });
});

describe('AC: no FOUC — the plugin theme paints before any fetch', () => {
  it('applyStoredThemeEarly repaints a cached plugin theme SYNCHRONOUSLY, with no network call', () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'sample-dusk' }));
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify({
      id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a', '--text': '#e6ecf5' },
    }));

    // No await anywhere: this is the whole point. `/api/v1/themes` is an
    // AUTHENTICATED async fetch and can never inform the first paint.
    applyStoredThemeEarly();

    expect(el().getAttribute('data-theme')).toBe('midnight');
    expect(el().style.getPropertyValue('--bg')).toBe('#05060a');
    expect(f).not.toHaveBeenCalled();
  });

  it('the live app WRITES that cache, so the next boot can read it (write ↔ read agree)', async () => {
    stubCatalogue();
    signIn();
    mountHost();
    usePreferencesStore().theme = 'sample-dusk';
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();

    const cached = JSON.parse(localStorage.getItem(THEME_CACHE_KEY)!);
    expect(cached).toEqual({
      id: 'sample-dusk', base: 'midnight',
      tokens: { '--bg': '#05060a', '--text': '#e6ecf5', '--accent': '#6ea8fe' },
    });

    // SIMULATE A RELOAD: drop the DOM state and the store, keep localStorage.
    while (wrappers.length) wrappers.pop()?.unmount();
    for (const a of ['data-theme', 'style']) el().removeAttribute(a);
    setActivePinia(createPinia());
    await new Promise((r) => setTimeout(r, 300)); // past the prefs persist debounce

    applyStoredThemeEarly();
    expect(el().getAttribute('data-theme')).toBe('midnight');
    expect(inlineThemeTokens()['--bg']).toBe('#05060a');
  });

  it('ignores a cache entry for a DIFFERENT theme than the one selected', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'daylight' }));
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify({
      id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a' },
    }));

    applyStoredThemeEarly();

    expect(el().getAttribute('data-theme')).toBe('daylight');
    expect(inlineThemeTokens()).toEqual({});
  });

  it('CLEARS the cache when a built-in is chosen, so the next boot cannot repaint a stale theme', async () => {
    stubCatalogue();
    signIn();
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify({
      id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a' },
    }));
    mountHost();
    usePreferencesStore().theme = 'midnight';
    await nextTick();

    expect(localStorage.getItem(THEME_CACHE_KEY)).toBeNull();
  });

  it('does NOT delete the cache while the catalogue is still loading', async () => {
    // The window between boot and the catalogue landing: `styleFor` returns null
    // for a plugin id, but the cached entry is the very thing the NEXT boot
    // needs. Deleting it here would reintroduce the flash it exists to prevent.
    const cache = JSON.stringify({ id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a' } });
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'sample-dusk' }));
    localStorage.setItem(THEME_CACHE_KEY, cache);
    let resolveFetch: (r: Response) => void = () => {};
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise<Response>((r) => { resolveFetch = r; })));
    signIn();

    mountHost();
    await nextTick();

    expect(localStorage.getItem(THEME_CACHE_KEY)).toBe(cache);
    resolveFetch(jsonResponse({ themes: [MIDNIGHT, DUSK] }));
  });

  it('re-validates the cache rather than trusting it — hostile tokens never reach the DOM', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'sample-dusk' }));
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify({
      id: 'sample-dusk', base: 'midnight',
      tokens: { '--bg': 'url(//evil/x.png)', '--evil': '#fff', '--text': '#eee' },
    }));

    applyStoredThemeEarly();

    expect(el().style.getPropertyValue('--bg')).toBe('');
    expect(el().style.getPropertyValue('--evil')).toBe('');
    expect(el().style.getPropertyValue('--text')).toBe('#eee');
  });

  it('a cache naming a NON-built-in base is refused outright', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'sample-dusk' }));
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify({
      id: 'sample-dusk', base: 'evil-base', tokens: { '--bg': '#05060a' },
    }));

    applyStoredThemeEarly();

    expect(el().getAttribute('data-theme')).toBe('sample-dusk'); // verbatim, no base swap
    expect(inlineThemeTokens()).toEqual({});
  });
});

describe('a persisted plugin theme id survives hydration', () => {
  it('is NOT rewritten to a built-in by the preferences store', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'sample-dusk' }));
    setActivePinia(createPinia());
    // TYPECHECK-relevant too: assigning a plugin id to `prefs.theme` is only
    // legal because S86 widened `ThemeName` from a closed union to `string`.
    const prefs = usePreferencesStore();
    expect(prefs.theme).toBe('sample-dusk');
    prefs.theme = 'another-plugin-theme';
    expect(prefs.theme).toBe('another-plugin-theme');
  });
});
