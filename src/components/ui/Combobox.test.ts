/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Combobox from './Combobox.vue';

/** Component style text, comments stripped — same source-structure read as media-card-hover-guards.test.ts (the house precedent for this shape). */
const comboboxCss = (() => {
  const here = dirname(fileURLToPath(import.meta.url));
  const sfc = readFileSync(join(here, 'Combobox.vue'), 'utf8');
  const style = sfc.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  if (!style) throw new Error('Combobox.vue: no <style> block found');
  return style[1].replace(/\/\*[\s\S]*?\*\//g, '');
})();

const opts = [
  { value: 'name', label: 'Name' },
  { value: 'year', label: 'Year' },
  { value: 'rating', label: 'Rating', disabled: true },
  { value: 'runtime', label: 'Runtime' },
];

/**
 * Disabled-guard pins (S320).
 *
 * Post-mortem lives in `MusicPager.test.ts`: VTU's `trigger()` short-circuits on
 * disabled controls, so trigger-driven "nothing happens when disabled" tests
 * pin nothing. Every disabled drive below dispatches RAW.
 *
 * Combobox carries TWO guards and they must be pinned independently — deleting
 * only one of them still leaves real behaviour intact, so a test that merely
 * asserts "the list does not open" cannot see the `onKeydown` guard (its
 * ArrowDown would be caught by `openList`'s own guard). The `onKeydown` pin
 * therefore reaches the handler with the list ALREADY open on a component that
 * was disabled afterwards — the Escape/Enter arms of the switch never re-enter
 * `openList`, and `move()` mutates `active` directly, so only the `props.disabled`
 * early-return at the top of `onKeydown` stands between that event and state.
 */

/** A focus event VTU's `trigger()` refuses to deliver to a disabled control. */
async function rawFocus(el: Element): Promise<void> {
  el.dispatchEvent(new Event('focus'));
  await nextTick();
}

/** Dispatches a cancelable keydown RAW; returns it so callers can read defaultPrevented. */
async function rawKeydown(el: Element, key: string): Promise<KeyboardEvent> {
  const ev = new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true });
  el.dispatchEvent(ev);
  await nextTick();
  return ev;
}

describe('Combobox — disabled guards (S320)', () => {
  it('raw focus on the ENABLED input opens — the raw route is not inert', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await rawFocus(input.element);
    // If this is ever silent, the openList pin below proves nothing.
    expect(input.attributes('aria-expanded')).toBe('true');
  });

  it('raw focus on the disabled input does not open — pins openList()', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts, disabled: true } });
    const input = w.find('input[role="combobox"]');
    expect(input.attributes('disabled')).toBeDefined();
    await rawFocus(input.element);
    expect(input.attributes('aria-expanded')).toBe('false');
  });

  it('raw keydown on the ENABLED open list still acts — control for the onKeydown pin', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus'); // open, enabled
    const before = input.attributes('aria-activedescendant');
    const ev = await rawKeydown(input.element, 'ArrowDown');
    expect(ev.defaultPrevented).toBe(true);
    expect(input.attributes('aria-activedescendant')).not.toBe(before);
  });

  it('raw keydown while disabled-open moves, selects and closes nothing — pins onKeydown()', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus'); // open while ENABLED (openList's own guard stays intact)
    await w.setProps({ disabled: true }); // disabled AFTER opening — the only route to an open+disabled listbox
    const before = input.attributes('aria-activedescendant');

    // ArrowDown: `move(1)` must not run and the switch must not even claim the key.
    const down = await rawKeydown(input.element, 'ArrowDown');
    expect(down.defaultPrevented).toBe(false);
    expect(input.attributes('aria-activedescendant')).toBe(before);

    // Enter: `selectIndex()` must not emit.
    const enter = await rawKeydown(input.element, 'Enter');
    expect(enter.defaultPrevented).toBe(false);
    expect(w.emitted('update:modelValue')).toBeUndefined();
    expect(w.emitted('change')).toBeUndefined();

    // Escape: `revertAndClose()` must not run; the list stays open.
    const esc = await rawKeydown(input.element, 'Escape');
    expect(esc.defaultPrevented).toBe(false);
    expect(input.attributes('aria-expanded')).toBe('true');
  });
});

/**
 * Focus-ring keyboard-gating pin (S-ui-design-43).
 *
 * The input ring must ride `:focus-visible`, not `:focus`. The element is a
 * `type="text"` input, and per the Selectors-4 focus-visible heuristic focused
 * text inputs ALWAYS match `:focus-visible` — so click-to-type keeps its ring
 * exactly as before, while pointer-only focus on non-text interactions (and
 * any future arm sharing this selector) no longer paints the accent ring.
 * This mirrors the estate convention already shipped on the admin surfaces
 * (`.admin-settings__input`, `.admin-plugins__input`, `.admin-syncplay__input`
 * all key their identical `--accent-ring`/`--accent-soft` rule on
 * `:focus-visible`). Pinned as a source-structure read because jsdom applies
 * no style resolution — the media-card hover-gate is the house precedent.
 */
describe('Combobox — input ring is :focus-visible (S-ui-design-43)', () => {
  it('the ring rule keys on :focus-visible with its exact declarations', () => {
    expect(comboboxCss).toMatch(
      /\.phlix-combobox__input:focus-visible\s*\{\s*border-color:\s*var\(--accent-ring\);\s*box-shadow:\s*0 0 0 3px var\(--accent-soft\);\s*\}/,
    );
  });

  it('no bare :focus ring rule remains on the input (reverting the selector reddens this)', () => {
    expect(comboboxCss).not.toMatch(/\.phlix-combobox__input:focus\s*[,{]/);
  });
});
