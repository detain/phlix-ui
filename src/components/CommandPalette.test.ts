/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia, type Pinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import CommandPalette from './CommandPalette.vue';
import { useCommandStore, type Command } from '../stores/useCommandStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';

function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'browse', component: { template: '<div />' } },
      { path: '/settings', name: 'settings', component: { template: '<div />' } },
    ],
  });
}

let pinia: Pinia;
let router: Router;
let wrapper: VueWrapper | null = null;

async function mountPalette(commands: Command[] = []) {
  const w = mount(CommandPalette, {
    global: {
      plugins: [pinia, router],
      provide: { phlixCommands: commands },
    },
  });
  await router.isReady();
  await flushPromises();
  return w;
}

function panel() {
  return document.body.querySelector('.phlix-cmdk');
}
function options() {
  return Array.from(document.body.querySelectorAll<HTMLElement>('.phlix-cmdk__option'));
}
function input() {
  return document.body.querySelector<HTMLInputElement>('.phlix-cmdk__input')!;
}

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
  pinia = createPinia();
  setActivePinia(pinia);
  router = makeRouter();
  vi.stubGlobal(
    'matchMedia',
    vi.fn((q: string) => ({
      matches: false,
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
  vi.unstubAllGlobals();
});

describe('CommandPalette — open/close', () => {
  it('is hidden until opened', async () => {
    wrapper = await mountPalette();
    expect(panel()).toBeNull();
  });

  // The global ⌘K / Ctrl-K hotkey moved to the `useCommandPaletteHotkey` composable
  // (R6.1b) so the shell can lazy-load this UI on first open; that hotkey + its
  // modifier guard are covered by useCommandPaletteHotkey.test.ts. Here we just verify
  // the panel renders whenever the store is opened (by any means).
  it('renders the panel when the store opens it', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    expect(panel()).toBeNull();
    store.openPalette();
    await nextTick();
    expect(panel()).not.toBeNull();
  });

  it('closes on Escape', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    await nextTick();
    expect(panel()).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nextTick();
    expect(panel()).toBeNull();
  });

  it('closes on a backdrop pointerdown', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    await nextTick();
    const backdrop = document.body.querySelector<HTMLElement>('.phlix-cmdk')!;
    backdrop.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    await nextTick();
    expect(panel()).toBeNull();
  });
});

describe('CommandPalette — built-in commands', () => {
  it('registers the built-in commands on mount', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    const ids = store.all.map((c) => c.id);
    expect(ids).toContain('nav.browse');
    expect(ids).toContain('theme.daylight');
    expect(ids).toContain('pref.reset');
  });

  it('runs a theme command and flips the preference', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    const prefs = usePreferencesStore();
    expect(prefs.theme).toBe('nocturne');
    store.openPalette();
    store.setQuery('daylight');
    await nextTick();
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await flushPromises();
    expect(prefs.theme).toBe('daylight');
    expect(panel()).toBeNull(); // running closes the palette
  });

  it('runs a navigation command via mouse click', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    await router.push('/settings');
    store.openPalette();
    store.setQuery('browse');
    await nextTick();
    options()[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(router.currentRoute.value.name).toBe('browse');
  });

  it('each preference/theme built-in performs its side effect', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    const prefs = usePreferencesStore();

    await store.runId('theme.midnight');
    expect(prefs.theme).toBe('midnight');
    await store.runId('theme.nocturne');
    expect(prefs.theme).toBe('nocturne');

    expect(prefs.density).toBe('comfortable');
    await store.runId('pref.density');
    expect(prefs.density).toBe('compact');

    await store.runId('pref.motion');
    expect(prefs.reducedMotion).toBe('off');

    const atmoBefore = prefs.atmosphere;
    await store.runId('pref.atmosphere');
    expect(prefs.atmosphere).toBe(!atmoBefore);

    prefs.theme = 'daylight';
    await store.runId('pref.reset');
    expect(prefs.theme).toBe('nocturne'); // reset restores defaults
  });

  it('the Settings nav command pushes the settings route', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    await store.runId('nav.settings');
    await flushPromises();
    expect(router.currentRoute.value.name).toBe('settings');
  });

  it('unregisters its commands on unmount', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    expect(store.all.length).toBeGreaterThan(0);
    wrapper.unmount();
    wrapper = null;
    expect(store.all).toHaveLength(0);
  });
});

describe('CommandPalette — injected commands', () => {
  it('surfaces and runs an app-injected command', async () => {
    const run = vi.fn();
    wrapper = await mountPalette([
      { id: 'app.custom', title: 'Frobnicate the widget', group: 'App', run },
    ]);
    const store = useCommandStore();
    expect(store.all.some((c) => c.id === 'app.custom')).toBe(true);
    store.openPalette();
    store.setQuery('frob');
    await nextTick();
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await flushPromises();
    expect(run).toHaveBeenCalledOnce();
  });
});

describe('CommandPalette — keyboard navigation', () => {
  it('Arrow keys move the active option; Enter runs it', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    await nextTick();
    const before = document.body.querySelector('.phlix-cmdk__option.is-active');
    const firstActiveId = before?.id;
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await nextTick();
    const after = document.body.querySelector('.phlix-cmdk__option.is-active');
    expect(after?.id).not.toBe(firstActiveId);
    expect(input().getAttribute('aria-activedescendant')).toBe(after?.id);
  });

  it('ArrowUp from the top wraps to the last option', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    await nextTick();
    const total = options().length;
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await nextTick();
    const active = document.body.querySelector('.phlix-cmdk__option.is-active');
    expect(active?.id).toBe(`${input().getAttribute('aria-controls')}-opt-${total - 1}`);
  });

  it('Home and End jump to the first and last options', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    await nextTick();
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await nextTick();
    const last = options().length - 1;
    const controls = input().getAttribute('aria-controls');
    expect(input().getAttribute('aria-activedescendant')).toBe(`${controls}-opt-${last}`);
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await nextTick();
    expect(input().getAttribute('aria-activedescendant')).toBe(`${controls}-opt-0`);
  });

  it('typing updates the store query', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    await nextTick();
    const el = input();
    el.value = 'sett';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(store.query).toBe('sett');
  });
});

describe('CommandPalette — search + sections + empty state', () => {
  it('shows a synthetic "Search library" item while typing', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    store.setQuery('inception');
    await nextTick();
    expect(options()[0].textContent).toContain('Search library');
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await flushPromises();
    expect(router.currentRoute.value.name).toBe('browse');
    expect(router.currentRoute.value.query.search).toBe('inception');
  });

  it('renders a Recent section header when a command was run before', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.pushRecent('pref.reset');
    store.openPalette();
    await nextTick();
    const headers = Array.from(document.body.querySelectorAll('.phlix-cmdk__group')).map((h) => h.textContent?.trim());
    expect(headers).toContain('Recent');
  });

  it('renders grouped section headers (Navigation, Theme, …)', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.openPalette();
    await nextTick();
    const headers = Array.from(document.body.querySelectorAll('.phlix-cmdk__group')).map((h) => h.textContent?.trim());
    expect(headers).toContain('Navigation');
    expect(headers).toContain('Theme');
  });

  it('shows the empty state when there are no options', async () => {
    wrapper = await mountPalette();
    const store = useCommandStore();
    store.unregister(store.all.map((c) => c.id));
    store.openPalette();
    await nextTick();
    expect(document.body.querySelector('.phlix-cmdk__empty')).not.toBeNull();
  });
});
