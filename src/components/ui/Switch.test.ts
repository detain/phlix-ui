/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Switch from './Switch.vue';

/**
 * Disabled-guard pins (S320).
 *
 * See the `trigger()` short-circuit post-mortem in `MusicPager.test.ts`: VTU
 * never delivers events to disabled controls, so disabled pins here dispatch
 * RAW. `Switch.vue` is the sharpest case of the whole nine: its `<label>` also
 * carries `@click="toggle"` and a label has NO `disabled` attribute — for the
 * label route the JS guard is the ONLY barrier between a user click and an
 * update, so the label pin below is not defence-in-depth, it is the defence.
 */

/** A click VTU's `trigger()` refuses to deliver to a disabled control. */
async function rawClick(el: Element): Promise<void> {
  el.dispatchEvent(new Event('click'));
  await nextTick();
}

describe('Switch', () => {
  it('exposes role=switch with aria-checked mirroring modelValue', () => {
    const on = mount(Switch, { props: { modelValue: true, label: 'Autoplay' } });
    expect(on.find('[role="switch"]').attributes('aria-checked')).toBe('true');
    expect(on.text()).toContain('Autoplay');
    const off = mount(Switch, { props: { modelValue: false, label: 'Autoplay' } });
    expect(off.find('[role="switch"]').attributes('aria-checked')).toBe('false');
  });

  it('clicking the control emits the inverted modelValue', async () => {
    const w = mount(Switch, { props: { modelValue: false, label: 'Autoplay' } });
    await w.find('[role="switch"]').trigger('click');
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([true]);
  });
});

describe('Switch — disabled guard (S320)', () => {
  it('raw click on the ENABLED control still emits — the raw route is not inert', async () => {
    const w = mount(Switch, { props: { modelValue: false, disabled: false } });
    await rawClick(w.find('[role="switch"]').element);
    // If this is ever silent, the two disabled pins below prove nothing.
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([true]);
  });

  it('raw click on the disabled control emits nothing — pins toggle()', async () => {
    const w = mount(Switch, { props: { modelValue: false, label: 'Autoplay', disabled: true } });
    expect(w.find('[role="switch"]').attributes('disabled')).toBeDefined();
    await rawClick(w.find('[role="switch"]').element);
    expect(w.emitted('update:modelValue')).toBeUndefined();
  });

  it('raw click on the LABEL while disabled emits nothing — guard is the only barrier there', async () => {
    const w = mount(Switch, { props: { modelValue: false, label: 'Autoplay', disabled: true } });
    const label = w.find('.phlix-switch__label');
    // The label is NOT itself a disabled control — a real browser delivers this
    // click to the handler; only `if (props.disabled) return;` stops the toggle.
    expect(label.attributes('disabled')).toBeUndefined();
    await rawClick(label.element);
    expect(w.emitted('update:modelValue')).toBeUndefined();
  });
});

describe('Switch — generic accessible name through the catalog (S-ui-design-23 / design-052)', () => {
  function mountSwitch(props: Record<string, unknown> = {}, messages: Record<string, unknown> | null = null) {
    return mount(Switch, {
      props: { modelValue: false, ...props },
      global: { provide: { phlixConfig: messages ? { messages } : null } },
    });
  }

  it('label-less switch takes the English toggle name byte-identically', () => {
    expect(mountSwitch().find('.phlix-switch__control').attributes('aria-label')).toBe('Toggle');
  });

  it('a consumer catalog names the fallback (renders through the catalog, not a literal)', () => {
    const w = mountSwitch({}, { common: { toggle: 'Umschalten' } });
    expect(w.find('.phlix-switch__control').attributes('aria-label')).toBe('Umschalten');
  });

  it('a visible label still suppresses the catalog name (aria-labelledby path unchanged)', () => {
    const w = mountSwitch({ label: 'Autoplay' }, { common: { toggle: 'Umschalten' } });
    expect(w.find('.phlix-switch__control').attributes('aria-label')).toBeUndefined();
  });
});
