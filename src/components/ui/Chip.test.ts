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

describe('Chip — remove-button label through the catalog (S-ui-design-23 / design-051)', () => {
  function mountChip(props: Record<string, unknown> = {}, messages: Record<string, unknown> | null = null) {
    return mount(Chip, {
      props: { removable: true, ...props },
      slots: { default: 'Sci-Fi' },
      global: { provide: { phlixConfig: messages ? { messages } : null } },
    });
  }

  it('default label renders the English catalog value byte-identically', () => {
    expect(mountChip().find('.phlix-chip__remove').attributes('aria-label')).toBe('Remove');
  });

  it('the default is resolved through the catalog at render time, not a frozen prop default', () => {
    // design-051: an eager withDefaults removeLabel:'Remove' outranks the
    // consumer catalog (prop default wins before t() is consulted); with the
    // default undefined the template's `removeLabel ?? t('itemActions.remove')`
    // resolves per render, so a consumer override reaches the aria-label.
    const w = mountChip({}, { itemActions: { remove: 'Entfernen' } });
    expect(w.find('.phlix-chip__remove').attributes('aria-label')).toBe('Entfernen');
  });

  it('a locale-switched catalog still names the button (fresh mount reads the live catalog)', () => {
    // The translator snapshots config at setup; "runtime" here means every
    // render re-evaluates `removeLabel ?? t(...)` instead of freezing a string
    // at module/prop-default time — a mount made after the consumer swaps
    // locales must never carry the previous locale's label.
    const first = mountChip();
    expect(first.find('.phlix-chip__remove').attributes('aria-label')).toBe('Remove');
    first.unmount();
    const after = mountChip({}, { itemActions: { remove: 'Excluir' } });
    expect(after.find('.phlix-chip__remove').attributes('aria-label')).toBe('Excluir');
    after.unmount();
  });

  it('an explicit removeLabel prop still wins over the catalog', () => {
    const w = mountChip({ removeLabel: 'Delete tag' }, { itemActions: { remove: 'Entfernen' } });
    expect(w.find('.phlix-chip__remove').attributes('aria-label')).toBe('Delete tag');
  });
});
