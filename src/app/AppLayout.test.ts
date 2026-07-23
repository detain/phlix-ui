/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import AppLayout from './AppLayout.vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';

const wrappers: VueWrapper[] = [];
function mountLayout() {
  const w = mount(AppLayout, {
    slots: {
      logo: '<span class="L">brand</span>',
      nav: '<a class="N" href="#">Browse</a>',
      actions: '<button class="A">act</button>',
      default: '<div class="M">page</div>',
      footer: '<span class="F">foot</span>',
    },
  });
  wrappers.push(w);
  return w;
}

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('AppLayout', () => {
  it('renders the logo / nav / actions / default / footer slots', () => {
    const w = mountLayout();
    expect(w.find('.shell__brand .L').exists()).toBe(true);
    expect(w.find('.shell__nav .N').exists()).toBe(true);
    expect(w.find('.shell__actions .A').exists()).toBe(true);
    expect(w.find('.shell__main .M').exists()).toBe(true);
    expect(w.find('.shell__footer .F').exists()).toBe(true);
  });

  it('exposes a skip-to-content link that targets the labelled <main> (R6.5a)', () => {
    const w = mountLayout();
    const skip = w.find('a.shell__skip');
    expect(skip.exists()).toBe(true);
    expect(skip.attributes('href')).toBe('#main');
    expect(skip.text()).toBe('Skip to content');
    const main = w.find('main.shell__main');
    expect(main.attributes('id')).toBe('main'); // the skip target resolves
    expect(main.attributes('tabindex')).toBe('-1'); // programmatically focusable, not a tab stop
  });

  it('mounts the AppBackdrop atmosphere gated on prefs.atmosphere', async () => {
    const w = mountLayout();
    const prefs = usePreferencesStore();
    expect(w.findComponent(AppBackdrop).props('enabled')).toBe(true);
    prefs.atmosphere = false;
    await flushPromises();
    expect(w.findComponent(AppBackdrop).props('enabled')).toBe(false);
  });

  it('opens a keyboard-trappable drawer from the hamburger, mirroring the nav slot', async () => {
    const w = mountLayout();
    expect(document.body.querySelector('.shell__drawer')).toBeNull(); // closed initially
    await w.get('.shell__hamburger').trigger('click');
    await flushPromises();
    const drawer = document.body.querySelector('.shell__drawer');
    expect(drawer).not.toBeNull();
    expect(drawer!.querySelector('.N')).not.toBeNull(); // same nav slot in the drawer
  });

  it('closes the drawer when a nav item inside it is clicked', async () => {
    const w = mountLayout();
    await w.get('.shell__hamburger').trigger('click');
    await flushPromises();
    const link = document.body.querySelector('.shell__drawer .N') as HTMLElement;
    expect(link).not.toBeNull();
    link.dispatchEvent(new Event('click', { bubbles: true }));
    await flushPromises();
    expect(document.body.querySelector('.shell__drawer')).toBeNull();
  });

  it('renders no footer element when no footer slot is provided', () => {
    const w = mount(AppLayout, { slots: { default: '<div />' } });
    wrappers.push(w);
    expect(w.find('.shell__footer').exists()).toBe(false);
    // no nav slot -> no hamburger
    expect(w.find('.shell__hamburger').exists()).toBe(false);
  });

  it('lands a fallthrough `shell--flush` class on the root shell (S34 full-bleed)', () => {
    const w = mount(AppLayout, { slots: { default: '<div class="M" />' }, attrs: { class: 'shell--flush' } });
    wrappers.push(w);
    const shell = w.find('.shell');
    expect(shell.exists()).toBe(true);
    expect(shell.classes()).toContain('shell'); // its own class is preserved…
    expect(shell.classes()).toContain('shell--flush'); // …plus the flag
  });
});

describe('AppLayout — full-bleed (`shell--flush`) CSS is gated + non-leaking (S34)', () => {
  // Read the raw SFC source: jsdom does not apply an SFC's compiled <style>, so we
  // pin the CSS contract by asserting the rules exist and are strictly anchored
  // under `.shell.shell--flush` (present only on the fullBleed player route) — which
  // is what proves the default (no-flush) layout for every other page is untouched.
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), './AppLayout.vue'), 'utf8');

  it('hides the sticky bar only under `.shell.shell--flush`', () => {
    expect(src).toMatch(/\.shell\.shell--flush\s+\.shell__bar\s*\{\s*display:\s*none;\s*\}/);
  });

  it('zeroes the main gutter only under `.shell.shell--flush`', () => {
    expect(src).toMatch(/\.shell\.shell--flush\s+\.shell__main\s*\{\s*padding:\s*0;\s*\}/);
  });

  it('anchors EVERY flush rule under `.shell--flush` (no bare selector can leak)', () => {
    // Grab the non-scoped <style> block that carries the flush overrides…
    const blocks = [...src.matchAll(/<style(?![^>]*scoped)[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
    const flushBlock = blocks.find((b) => b.includes('shell--flush'));
    expect(flushBlock, 'a non-scoped style block carries the flush rules').toBeTruthy();
    // …and assert every selector (the text before each `{`) mentions `.shell--flush`.
    const selectors = [...flushBlock!.matchAll(/([^{}]+)\{/g)]
      .map((m) => m[1].trim())
      .filter((s) => s.length > 0 && !s.startsWith('@') && !s.startsWith('/*'));
    expect(selectors.length).toBeGreaterThan(0);
    for (const sel of selectors) {
      expect(sel, `selector "${sel}" must be gated under .shell--flush`).toContain('.shell--flush');
    }
  });

  it('leaves the scoped default `.shell__main` gutter intact (the normal layout)', () => {
    // The DEFAULT main still carries its `var(--space-6) var(--space-5)` gutter in
    // the scoped block — the flush rule only overrides it under the flag.
    expect(src).toMatch(/\.shell__main\s*\{[\s\S]*?padding:\s*var\(--space-6\)\s+var\(--space-5\);/);
  });
});
