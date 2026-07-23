/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
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

  it('ArrowUp/ArrowDown also move, End jumps to last, unrelated keys are no-ops', async () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs } });
    const list = w.find('[role="tablist"]');
    await list.trigger('keydown', { key: 'ArrowDown' }); // a -> c (skip disabled b)
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['c']);
    await w.setProps({ modelValue: 'c' });
    await list.trigger('keydown', { key: 'ArrowUp' }); // c -> a
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['a']);
    await w.setProps({ modelValue: 'a' });
    await list.trigger('keydown', { key: 'End' }); // -> last enabled (c)
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['c']);
    const before = w.emitted('update:modelValue')!.length;
    await list.trigger('keydown', { key: 'x' }); // no-op
    expect(w.emitted('update:modelValue')!.length).toBe(before);
  });

  it('renders the default slot when no per-value panel slot exists', () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs }, slots: { default: 'fallback panel' } });
    expect(w.find('[role="tabpanel"]').text()).toContain('fallback panel');
  });
});

describe('Tabs — tab row wrapping (S23)', () => {
  const sfcSource = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), 'Tabs.vue'),
    'utf8',
  );

  it('the tablist wraps to a second row instead of overflowing horizontally', () => {
    // A wide set of tabs must wrap, not push its row (and the sibling Advanced
    // switch on the Settings page) off-screen. jsdom does not apply scoped CSS,
    // so assert the declaration is present in the component's <style> source.
    const flat = sfcSource.replace(/\s+/g, ' ');
    const start = flat.indexOf('.phlix-tabs__list {');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = flat.slice(start, flat.indexOf('}', start) + 1);
    expect(block).toContain('display: flex');
    expect(block).toContain('flex-wrap: wrap');
  });
});

describe('Tabs — muted (not disabled) tab (S24)', () => {
  const mutedTabs = [
    { value: 'a', label: 'Alpha' },
    { value: 'm', label: 'Muted', muted: true },
    { value: 'c', label: 'Gamma' },
  ];

  it('dims the muted tab (is-muted) with NO disabled/aria-disabled and NO extra tabindex change', () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs: mutedTabs } });
    const mutedEl = w.findAll('[role="tab"]')[1];
    expect(mutedEl.classes()).toContain('is-muted');
    // NOT disabled — the tab stays fully interactive.
    expect(mutedEl.attributes('disabled')).toBeUndefined();
    expect(mutedEl.attributes('aria-disabled')).toBeUndefined();
    // Roving tabindex ONLY: an inactive muted tab is -1, exactly like a normal
    // inactive tab — muted introduces no tabindex change of its own.
    expect(mutedEl.attributes('tabindex')).toBe('-1');
  });

  it('the muted tab is focusable (tabindex 0) once selected — still not disabled', () => {
    const w = mount(Tabs, { props: { modelValue: 'm', tabs: mutedTabs } });
    const mutedEl = w.findAll('[role="tab"]')[1];
    expect(mutedEl.attributes('tabindex')).toBe('0');
    expect(mutedEl.attributes('disabled')).toBeUndefined();
  });

  it('a muted tab is still selectable by click', async () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs: mutedTabs } });
    await w.findAll('[role="tab"]')[1].trigger('click');
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['m']);
  });

  it('a muted tab is still reachable by keyboard nav (ArrowRight lands on it, not skipped like disabled)', async () => {
    const w = mount(Tabs, { props: { modelValue: 'a', tabs: mutedTabs } });
    await w.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' });
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual(['m']);
  });

  it('the is-muted rule adds ONLY opacity — no pointer-events, no cursor, no disabled', () => {
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'Tabs.vue'), 'utf8');
    const flat = src.replace(/\s+/g, ' ');
    const start = flat.indexOf('.phlix-tabs__tab.is-muted {');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = flat.slice(start, flat.indexOf('}', start) + 1);
    expect(block).toContain('opacity: 0.5');
    expect(block).not.toContain('pointer-events');
    expect(block).not.toContain('cursor');
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

  it('Spinner sizes: number→px, string verbatim, none→no inline size', () => {
    expect(mount(Spinner, { props: { size: 24 } }).find('[role="status"]').attributes('style')).toContain('font-size: 24px');
    expect(mount(Spinner, { props: { size: '2rem' } }).find('[role="status"]').attributes('style')).toContain('font-size: 2rem');
    const none = mount(Spinner).find('[role="status"]').attributes('style');
    expect(none === undefined || !none.includes('font-size')).toBe(true);
  });

  it('EmptyState renders the default slot as description and omits desc/actions when absent', () => {
    const slotted = mount(EmptyState, { props: { title: 'Empty' }, slots: { default: 'slot copy' } });
    expect(slotted.find('.phlix-empty__desc').text()).toBe('slot copy');
    const bare = mount(EmptyState, { props: { title: 'Empty' } });
    expect(bare.find('.phlix-empty__desc').exists()).toBe(false);
    expect(bare.find('.phlix-empty__actions').exists()).toBe(false);
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
