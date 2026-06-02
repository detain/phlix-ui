import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tabs from './Tabs.vue';
import Skeleton from './Skeleton.vue';
import Spinner from './Spinner.vue';
import EmptyState from './EmptyState.vue';
import Kbd from './Kbd.vue';

const tabs = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta', disabled: true },
  { value: 'c', label: 'Gamma' },
];

describe('Tabs', () => {
  it('renders a tablist with roving tabindex and the active panel', () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs }, slots: { a: 'Panel A', c: 'Panel C' } });
    expect(w.find('[role="tablist"]').exists()).toBe(true);
    const tabEls = w.findAll('[role="tab"]');
    expect(tabEls).toHaveLength(3);
    expect(tabEls[0].attributes('aria-selected')).toBe('true');
    expect(tabEls[0].attributes('tabindex')).toBe('0');
    expect(tabEls[2].attributes('tabindex')).toBe('-1');
    const panel = w.find('[role="tabpanel"]');
    expect(panel.text()).toContain('Panel A');
    expect(panel.attributes('aria-labelledby')).toBe(tabEls[0].attributes('id'));
  });

  it('selects on click and emits update:modelValue', async () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs } });
    await w.findAll('[role="tab"]')[2].trigger('click');
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['c']);
  });

  it('does not select a disabled tab', async () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs } });
    await w.findAll('[role="tab"]')[1].trigger('click');
    expect(w.emitted('update:modelValue')).toBeFalsy();
  });

  it('ArrowRight skips disabled and wraps; Home/End jump', async () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs } });
    const list = w.find('[role="tablist"]');
    await list.trigger('keydown', { key: 'ArrowRight' }); // a -> (skip b) -> c
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['c']);
    await w.setProps({ modelValue: 'c' });
    await list.trigger('keydown', { key: 'ArrowRight' }); // c -> wrap -> a
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['a']);
    await w.setProps({ modelValue: 'c' });
    await list.trigger('keydown', { key: 'Home' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['a']);
  });
});

describe('Skeleton / Spinner / EmptyState / Kbd', () => {
  it('Skeleton text renders N lines and is decorative', () => {
    const w = mount(Skeleton, { props: { variant: 'text', lines: 3 } });
    expect(w.findAll('.phlix-skel--text')).toHaveLength(3);
    expect(w.find('.phlix-skel-text').attributes('aria-hidden')).toBe('true');
  });

  it('Skeleton rect/circle apply variant class + inline size', () => {
    const r = mount(Skeleton, { props: { variant: 'rect', width: '120px', height: '20px' } });
    expect(r.find('.phlix-skel--rect').attributes('style')).toContain('width: 120px');
    const c = mount(Skeleton, { props: { variant: 'circle' } });
    expect(c.find('.phlix-skel--circle').exists()).toBe(true);
  });

  it('Spinner is a labelled status', () => {
    const w = mount(Spinner, { props: { label: 'Fetching' } });
    expect(w.find('[role="status"]').attributes('aria-label')).toBe('Fetching');
    expect(w.find('svg').exists()).toBe(true);
  });

  it('EmptyState renders icon + title + description + actions slot', () => {
    const w = mount(EmptyState, {
      props: { icon: 'search', title: 'No results', description: 'Try another search' },
      slots: { actions: '<button>Reset</button>' },
    });
    expect(w.find('.phlix-empty__title').text()).toBe('No results');
    expect(w.find('.phlix-empty__desc').text()).toBe('Try another search');
    expect(w.find('.phlix-empty__actions').text()).toContain('Reset');
    expect(w.find('svg').exists()).toBe(true);
  });

  it('Kbd renders keys from prop and from slot', () => {
    const arr = mount(Kbd, { props: { keys: ['Ctrl', 'K'] } });
    expect(arr.findAll('.phlix-kbd__key').map((k) => k.text())).toEqual(['Ctrl', 'K']);
    const slot = mount(Kbd, { slots: { default: 'Esc' } });
    expect(slot.find('.phlix-kbd__key').text()).toBe('Esc');
  });
});
