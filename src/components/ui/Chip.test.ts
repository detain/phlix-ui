/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Chip from './Chip.vue';

/**
 * Disabled-guard pins (S320).
 *
 * The `trigger()` short-circuit post-mortem lives in `MusicPager.test.ts`
 * ("disabled — the in-flight gate MusicLibraryPage depends on"): VTU refuses to
 * deliver events to disabled controls, so a trigger-driven "does nothing when
 * disabled" test is a green no-op that pins nothing. Every disabled drive below
 * dispatches RAW instead — deleting `if (props.disabled) return;` from
 * `Chip.vue`'s `onMain` reddens the pin test (mutation-checked).
 */

/** A click VTU's `trigger()` refuses to deliver to a disabled control. */
async function rawClick(el: Element): Promise<void> {
  el.dispatchEvent(new Event('click'));
  await nextTick();
}

describe('Chip', () => {
  it('renders slot text and toggles aria-pressed from the selected prop', () => {
    const w = mount(Chip, { props: { selected: true }, slots: { default: 'Sci-Fi' } });
    expect(w.text()).toContain('Sci-Fi');
    expect(w.find('.phlix-chip__main').attributes('aria-pressed')).toBe('true');
    const off = mount(Chip, { props: { selected: false }, slots: { default: 'HD' } });
    expect(off.find('.phlix-chip__main').attributes('aria-pressed')).toBe('false');
  });

  it('a selected chip emits update:selected=false and click on main activation', async () => {
    const w = mount(Chip, { props: { selected: true }, slots: { default: 'Sci-Fi' } });
    await w.find('.phlix-chip__main').trigger('click');
    expect(w.emitted('update:selected')!.at(-1)).toEqual([false]);
    expect(w.emitted('click')).toBeTruthy();
  });

  it('emits remove from the trailing ✕', async () => {
    const w = mount(Chip, { props: { removable: true }, slots: { default: 'Sci-Fi' } });
    await w.find('.phlix-chip__remove').trigger('click');
    expect(w.emitted('remove')).toBeTruthy();
  });
});

describe('Chip — disabled guard (S320)', () => {
  it('raw click on the ENABLED main button still emits — the raw route is not inert', async () => {
    const w = mount(Chip, { props: { selected: false }, slots: { default: 'HD' } });
    await rawClick(w.find('.phlix-chip__main').element);
    // If this is ever silent, the disabled pin below proves nothing.
    expect(w.emitted('update:selected')!.at(-1)).toEqual([true]);
  });

  it('raw click on the disabled main button emits nothing — pins onMain()', async () => {
    // `ariaLabel` doubles as the survival token carrier for S320.
    const w = mount(Chip, {
      props: { selected: false, disabled: true, ariaLabel: 'S320DISABLEDPINX6T1' },
      slots: { default: 'HD' },
    });
    expect(w.find('.phlix-chip__main').attributes('aria-label')).toBe('S320DISABLEDPINX6T1');
    expect(w.find('.phlix-chip__main').attributes('disabled')).toBeDefined();
    await rawClick(w.find('.phlix-chip__main').element);
    expect(w.emitted('update:selected')).toBeUndefined();
    expect(w.emitted('click')).toBeUndefined();
  });
});
