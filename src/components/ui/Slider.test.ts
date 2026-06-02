import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Slider from './Slider.vue';
import Switch from './Switch.vue';
import Chip from './Chip.vue';

describe('Slider', () => {
  it('exposes slider role with aria-value* and label', () => {
    const w = mount(Slider, { props: { modelValue: 40, min: 0, max: 100, label: 'Volume' } });
    const s = w.find('[role="slider"]');
    expect(s.attributes('aria-label')).toBe('Volume');
    expect(s.attributes('aria-valuemin')).toBe('0');
    expect(s.attributes('aria-valuemax')).toBe('100');
    expect(s.attributes('aria-valuenow')).toBe('40');
    expect(s.attributes('tabindex')).toBe('0');
  });

  it('steps with ArrowRight/ArrowLeft, emits change, and clamps at bounds', async () => {
    const w = mount(Slider, { props: { modelValue: 50, step: 5 } });
    await w.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([55]);
    expect(w.emitted('change')!.at(-1)).toEqual([55]); // keyboard is a commit
    await w.setProps({ modelValue: 100 });
    const before = w.emitted('update:modelValue')!.length;
    await w.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });
    // clamped at max — no further emit
    expect(w.emitted('update:modelValue')!.length).toBe(before);
  });

  it('PageUp/PageDown jump by 10% of the range', async () => {
    const w = mount(Slider, { props: { modelValue: 50, min: 0, max: 100, step: 1 } });
    await w.find('[role="slider"]').trigger('keydown', { key: 'PageUp' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([60]);
    await w.setProps({ modelValue: 60 });
    await w.find('[role="slider"]').trigger('keydown', { key: 'PageDown' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([50]);
  });

  it('pointer-drag sets the value from the pointer position', async () => {
    const w = mount(Slider, { props: { modelValue: 0, min: 0, max: 100, step: 1 }, attachTo: document.body });
    const track = w.find('.phlix-slider__track').element as HTMLElement;
    track.getBoundingClientRect = () =>
      ({ left: 0, width: 200, top: 0, right: 200, bottom: 5, height: 5, x: 0, y: 0, toJSON() {} }) as DOMRect;
    const ev = new Event('pointerdown', { bubbles: true });
    Object.defineProperty(ev, 'clientX', { value: 100 });
    Object.defineProperty(ev, 'pointerId', { value: 1 });
    track.dispatchEvent(ev);
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([50]); // 100/200 → 50%
    w.unmount();
  });

  it('pointer drag (down → move → up) updates while dragging and commits on release', async () => {
    const w = mount(Slider, { props: { modelValue: 0, min: 0, max: 100, step: 1 }, attachTo: document.body });
    const track = w.find('.phlix-slider__track').element as HTMLElement;
    track.getBoundingClientRect = () =>
      ({ left: 0, width: 200, top: 0, right: 200, bottom: 5, height: 5, x: 0, y: 0, toJSON() {} }) as DOMRect;
    const fire = (type: string, clientX: number) => {
      const ev = new Event(type, { bubbles: true });
      Object.defineProperty(ev, 'clientX', { value: clientX });
      Object.defineProperty(ev, 'pointerId', { value: 1 });
      track.dispatchEvent(ev);
    };
    fire('pointerdown', 20); // 10%
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([10]);
    fire('pointermove', 160); // 80% while dragging
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([80]);
    await w.setProps({ modelValue: 80 });
    fire('pointerup', 160);
    expect(w.emitted('change')!.at(-1)).toEqual([80]); // commit on release
    // move after release does nothing
    const n = w.emitted('update:modelValue')!.length;
    fire('pointermove', 40);
    expect(w.emitted('update:modelValue')!.length).toBe(n);
    w.unmount();
  });

  it('Home/End jump to min/max and emit change', async () => {
    const w = mount(Slider, { props: { modelValue: 50, min: 0, max: 200 } });
    await w.find('[role="slider"]').trigger('keydown', { key: 'Home' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([0]);
    await w.find('[role="slider"]').trigger('keydown', { key: 'End' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([200]);
    expect(w.emitted('change')).toBeTruthy();
  });

  it('uses formatValue for aria-valuetext', () => {
    const w = mount(Slider, {
      props: { modelValue: 0.5, min: 0, max: 1, formatValue: (v: number) => `${Math.round(v * 100)}%` },
    });
    expect(w.find('[role="slider"]').attributes('aria-valuetext')).toBe('50%');
  });

  it('is non-interactive when disabled', async () => {
    const w = mount(Slider, { props: { modelValue: 50, disabled: true } });
    expect(w.find('[role="slider"]').attributes('tabindex')).toBe('-1');
    await w.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });
    expect(w.emitted('update:modelValue')).toBeFalsy();
  });
});

describe('Switch', () => {
  it('exposes switch role + aria-checked, names via aria-labelledby, toggles once on activation', async () => {
    const w = mount(Switch, { props: { modelValue: false, label: 'Autoplay' } });
    const ctrl = w.find('[role="switch"]');
    expect(ctrl.attributes('aria-checked')).toBe('false');
    // visible label provides the accessible name (no redundant aria-label)
    expect(ctrl.attributes('aria-labelledby')).toBeTruthy();
    expect(ctrl.attributes('aria-label')).toBeUndefined();
    // native <button> turns Space/Enter into a click; one activation = one emit
    await ctrl.trigger('click');
    expect(w.emitted('update:modelValue')).toHaveLength(1);
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([true]);
  });

  it('label click toggles, and disabled blocks activation', async () => {
    const w = mount(Switch, { props: { modelValue: false, label: 'Autoplay' } });
    await w.find('.phlix-switch__label').trigger('click');
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([true]);

    const d = mount(Switch, { props: { modelValue: false, disabled: true } });
    await d.find('[role="switch"]').trigger('click');
    expect(d.emitted('update:modelValue')).toBeFalsy();
  });
});

describe('Chip', () => {
  it('toggle mode exposes aria-pressed and emits update:selected', async () => {
    const w = mount(Chip, { props: { selected: false }, slots: { default: 'R' } });
    const main = w.find('.phlix-chip__main');
    expect(main.attributes('aria-pressed')).toBe('false');
    await main.trigger('click');
    expect(w.emitted('update:selected')!.at(-1)).toEqual([true]);
  });

  it('non-toggle chip omits aria-pressed', () => {
    const w = mount(Chip, { slots: { default: 'All' } });
    expect(w.find('.phlix-chip__main').attributes('aria-pressed')).toBeUndefined();
  });

  it('removable shows a labelled remove button that emits remove', async () => {
    const w = mount(Chip, { props: { removable: true, removeLabel: 'Remove Sci-Fi' }, slots: { default: 'Sci-Fi' } });
    const rm = w.find('.phlix-chip__remove');
    expect(rm.exists()).toBe(true);
    expect(rm.attributes('aria-label')).toBe('Remove Sci-Fi');
    await rm.trigger('click');
    expect(w.emitted('remove')).toHaveLength(1);
  });

  it('renders a leading icon when given', () => {
    const w = mount(Chip, { props: { icon: 'star' }, slots: { default: 'Top' } });
    expect(w.find('svg').exists()).toBe(true);
  });
});
