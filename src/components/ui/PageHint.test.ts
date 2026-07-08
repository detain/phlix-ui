/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PageHint from './PageHint.vue';

describe('PageHint', () => {
  it('renders slotted body (including markup)', () => {
    const w = mount(PageHint, { slots: { default: 'Use <strong>Scan</strong> to add files.' } });
    expect(w.text()).toContain('Use Scan to add files.');
    expect(w.find('.phlix-page-hint__text strong').text()).toBe('Scan');
  });

  it('is a role="note" landmark with a decorative icon', () => {
    const w = mount(PageHint, { slots: { default: 'Body' } });
    const root = w.find('.phlix-page-hint');
    expect(root.attributes('role')).toBe('note');
    // Icon has no label → aria-hidden decorative.
    expect(w.find('.phlix-page-hint__icon svg').attributes('aria-hidden')).toBe('true');
  });

  it('renders a title heading only when the title prop is provided', () => {
    const without = mount(PageHint, { slots: { default: 'Body' } });
    expect(without.find('.phlix-page-hint__title').exists()).toBe(false);

    const withTitle = mount(PageHint, {
      props: { title: 'About this page' },
      slots: { default: 'Body' },
    });
    expect(withTitle.find('.phlix-page-hint__title').text()).toBe('About this page');
  });

  it('defaults to the info tone', () => {
    const w = mount(PageHint, { slots: { default: 'Body' } });
    expect(w.find('.phlix-page-hint').classes()).toContain('phlix-page-hint--info');
  });

  it('applies the accent tone class when tone="accent"', () => {
    const w = mount(PageHint, { props: { tone: 'accent' }, slots: { default: 'Body' } });
    const root = w.find('.phlix-page-hint');
    expect(root.classes()).toContain('phlix-page-hint--accent');
    expect(root.classes()).not.toContain('phlix-page-hint--info');
  });
});
