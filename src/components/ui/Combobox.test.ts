/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Combobox from './Combobox.vue';

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
