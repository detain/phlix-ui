import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Select from './Select.vue';
import Combobox from './Combobox.vue';
import { normalizeOptions, nextEnabledIndex, edgeEnabledIndex } from './listbox';

const opts = [
  { value: 'name', label: 'Name' },
  { value: 'year', label: 'Year' },
  { value: 'rating', label: 'Rating', disabled: true },
  { value: 'runtime', label: 'Runtime' },
];

describe('listbox helpers', () => {
  it('normalizes strings/numbers to options', () => {
    expect(normalizeOptions(['a', 2])).toEqual([
      { value: 'a', label: 'a' },
      { value: 2, label: '2' },
    ]);
  });
  it('nextEnabledIndex skips disabled and wraps', () => {
    expect(nextEnabledIndex(opts, 1, 1)).toBe(3); // year -> (skip rating) -> runtime
    expect(nextEnabledIndex(opts, 0, -1)).toBe(3); // name -> wrap -> runtime
  });
  it('edgeEnabledIndex finds first/last enabled', () => {
    expect(edgeEnabledIndex(opts, 'first')).toBe(0);
    expect(edgeEnabledIndex(opts, 'last')).toBe(3);
  });
});

describe('Select', () => {
  it('shows placeholder when nothing selected and the label when selected', () => {
    const empty = mount(Select, { props: { modelValue: null, options: opts, placeholder: 'Sort…' } });
    expect(empty.find('.phlix-select__value').text()).toBe('Sort…');
    const sel = mount(Select, { props: { modelValue: 'year', options: opts } });
    expect(sel.find('.phlix-select__value').text()).toBe('Year');
  });

  it('defaults to the app tone (no is-glass) and opts into glass only when asked', () => {
    const def = mount(Select, { props: { modelValue: 'year', options: opts } });
    expect(def.classes()).not.toContain('is-glass'); // unchanged everywhere else
    const glass = mount(Select, { props: { modelValue: 'year', options: opts, tone: 'glass' } });
    expect(glass.classes()).toContain('is-glass');
  });

  it('is a select-only combobox: role=combobox so aria-activedescendant/-controls are valid ARIA', async () => {
    // Regression guard (axe aria-allowed-attr): the trigger sets aria-activedescendant
    // + aria-controls when open, which are only allowed on a combobox-role element, not
    // a plain button. Surfaced by the QualityMenu open-state a11y harness (E4).
    const w = mount(Select, { props: { modelValue: 'year', options: opts } });
    const trigger = w.find('.phlix-select__trigger');
    expect(trigger.attributes('role')).toBe('combobox');
    expect(trigger.attributes('aria-haspopup')).toBe('listbox');
    await trigger.trigger('click');
    expect(trigger.attributes('aria-activedescendant')).toBeTruthy();
    expect(trigger.attributes('aria-controls')).toBeTruthy();
  });

  it('opens on click with listbox + aria-expanded', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts } });
    const trigger = w.find('.phlix-select__trigger');
    expect(trigger.attributes('aria-expanded')).toBe('false');
    await trigger.trigger('click');
    expect(trigger.attributes('aria-expanded')).toBe('true');
    expect(w.find('[role="listbox"]').exists()).toBe(true);
    expect(w.findAll('[role="option"]').length).toBe(4);
  });

  it('selects an option on click and emits value + change', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts } });
    await w.find('.phlix-select__trigger').trigger('click');
    await w.findAll('[role="option"]')[1].trigger('click');
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['year']);
    expect(w.emitted('change')!.at(-1)).toEqual(['year']);
  });

  it('keyboard: ArrowDown opens, moves past disabled, Enter selects', async () => {
    const w = mount(Select, { props: { modelValue: 'name', options: opts } });
    const trigger = w.find('.phlix-select__trigger');
    await trigger.trigger('keydown', { key: 'ArrowDown' }); // open, active=name(0)
    await trigger.trigger('keydown', { key: 'ArrowDown' }); // -> year(1)
    await trigger.trigger('keydown', { key: 'ArrowDown' }); // skip rating(2,disabled) -> runtime(3)
    await trigger.trigger('keydown', { key: 'Enter' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['runtime']);
  });

  it('aria-activedescendant points at the active option id after ArrowDown', async () => {
    const w = mount(Select, { props: { modelValue: 'name', options: opts } });
    const trigger = w.find('.phlix-select__trigger');
    await trigger.trigger('keydown', { key: 'ArrowDown' }); // open, active=name(0)
    await trigger.trigger('keydown', { key: 'ArrowDown' }); // -> year(1)
    const activeId = trigger.attributes('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(w.find(`#${activeId}`).classes()).toContain('is-active');
    expect(w.find(`#${activeId}`).text()).toContain('Year');
  });

  it('type-to-jump highlights the matching option', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts } });
    const trigger = w.find('.phlix-select__trigger');
    await trigger.trigger('click');
    await trigger.trigger('keydown', { key: 'r' }); // -> "Runtime" (rating is disabled)
    const activeId = trigger.attributes('aria-activedescendant');
    expect(w.find(`#${activeId}`).text()).toContain('Runtime');
  });

  it('Tab closes the listbox', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts } });
    await w.find('.phlix-select__trigger').trigger('click');
    await w.find('.phlix-select__trigger').trigger('keydown', { key: 'Tab' });
    expect(w.find('.phlix-select__trigger').attributes('aria-expanded')).toBe('false');
  });

  it('Escape closes without selecting', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts } });
    await w.find('.phlix-select__trigger').trigger('click');
    await w.find('.phlix-select__trigger').trigger('keydown', { key: 'Escape' });
    expect(w.find('.phlix-select__trigger').attributes('aria-expanded')).toBe('false');
    expect(w.emitted('update:modelValue')).toBeFalsy();
  });

  it('does not open when disabled', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts, disabled: true } });
    await w.find('.phlix-select__trigger').trigger('click');
    expect(w.find('.phlix-select__trigger').attributes('aria-expanded')).toBe('false');
  });

  it('Space opens; Home/End move to first/last enabled; pointermove sets active', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts } });
    const trigger = w.find('.phlix-select__trigger');
    await trigger.trigger('keydown', { key: ' ' }); // open
    expect(trigger.attributes('aria-expanded')).toBe('true');
    await trigger.trigger('keydown', { key: 'End' });
    expect(w.find(`#${trigger.attributes('aria-activedescendant')}`).text()).toContain('Runtime');
    await trigger.trigger('keydown', { key: 'Home' });
    expect(w.find(`#${trigger.attributes('aria-activedescendant')}`).text()).toContain('Name');
    await w.findAll('[role="option"]')[3].trigger('pointermove');
    expect(w.findAll('[role="option"]')[3].classes()).toContain('is-active');
  });

  it('clicking a disabled option does not select', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts } });
    await w.find('.phlix-select__trigger').trigger('click');
    await w.findAll('[role="option"]')[2].trigger('click'); // rating (disabled)
    expect(w.emitted('update:modelValue')).toBeFalsy();
  });

  it('click outside closes the listbox', async () => {
    const w = mount(Select, { props: { modelValue: null, options: opts }, attachTo: document.body });
    await w.find('.phlix-select__trigger').trigger('click');
    expect(w.find('.phlix-select__trigger').attributes('aria-expanded')).toBe('true');
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await w.vm.$nextTick();
    expect(w.find('.phlix-select__trigger').attributes('aria-expanded')).toBe('false');
    w.unmount();
  });
});

describe('Combobox — keyboard + dismissal', () => {
  it('ArrowDown opens when closed; ArrowDown/Up move skipping disabled; Enter selects', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('keydown', { key: 'ArrowDown' }); // opens
    expect(input.attributes('aria-expanded')).toBe('true');
    await input.trigger('keydown', { key: 'ArrowDown' }); // move down (skips disabled)
    await input.trigger('keydown', { key: 'ArrowUp' }); // move up
    await input.trigger('keydown', { key: 'Enter' }); // select active
    expect(w.emitted('update:modelValue')).toBeTruthy();
  });

  it('Tab reverts the query and closes', async () => {
    const w = mount(Combobox, { props: { modelValue: 'name', options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus');
    await input.setValue('zz');
    await input.trigger('keydown', { key: 'Tab' });
    expect((input.element as HTMLInputElement).value).toBe('Name');
    expect(input.attributes('aria-expanded')).toBe('false');
  });

  it('click outside reverts + closes', async () => {
    const w = mount(Combobox, { props: { modelValue: 'name', options: opts }, attachTo: document.body });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus');
    await input.setValue('zz');
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await w.vm.$nextTick();
    expect((input.element as HTMLInputElement).value).toBe('Name');
    expect(input.attributes('aria-expanded')).toBe('false');
    w.unmount();
  });
});

describe('Combobox', () => {
  it('opens on focus and lists all options', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus');
    expect(input.attributes('aria-expanded')).toBe('true');
    expect(w.findAll('[role="option"]').length).toBe(4);
  });

  it('filters options as the user types', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus');
    await input.setValue('ru');
    const labels = w.findAll('[role="option"]').map((o) => o.text());
    expect(labels).toEqual(['Runtime']);
  });

  it('selects a filtered option and reflects the label', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus');
    await input.setValue('year');
    await w.findAll('[role="option"]')[0].trigger('click');
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['year']);
    expect((input.element as HTMLInputElement).value).toBe('Year');
  });

  it('shows an empty state when nothing matches', async () => {
    const w = mount(Combobox, { props: { modelValue: null, options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus');
    await input.setValue('zzz');
    expect(w.findAll('[role="option"]').length).toBe(0);
    expect(w.find('.phlix-combobox__empty').exists()).toBe(true);
  });

  it('Escape reverts the query to the selected label', async () => {
    const w = mount(Combobox, { props: { modelValue: 'name', options: opts } });
    const input = w.find('input[role="combobox"]');
    await input.trigger('focus');
    await input.setValue('zzz');
    await input.trigger('keydown', { key: 'Escape' });
    expect((input.element as HTMLInputElement).value).toBe('Name');
    expect(input.attributes('aria-expanded')).toBe('false');
  });
});
