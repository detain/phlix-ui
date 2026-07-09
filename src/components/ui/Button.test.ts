/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';
import IconButton from './IconButton.vue';
import Badge from './Badge.vue';

describe('Button', () => {
  it('renders slot content in a button with default variant/size', () => {
    const w = mount(Button, { slots: { default: 'Play' } });
    const btn = w.find('button');
    expect(btn.text()).toContain('Play');
    expect(btn.attributes('type')).toBe('button');
    expect(btn.classes()).toContain('phlix-btn--solid');
    expect(btn.classes()).toContain('phlix-btn--md');
  });

  it('emits click when enabled', async () => {
    const w = mount(Button);
    await w.find('button').trigger('click');
    expect(w.emitted('click')).toHaveLength(1);
  });

  it('is disabled and aria-busy while loading, showing a spinner', () => {
    const w = mount(Button, { props: { loading: true } });
    const btn = w.find('button');
    expect(btn.attributes('disabled')).toBeDefined();
    expect(btn.attributes('aria-busy')).toBe('true');
    expect(w.find('.phlix-btn__spinner').exists()).toBe(true);
  });

  it('does not emit click when disabled', async () => {
    const w = mount(Button, { props: { disabled: true } });
    await w.find('button').trigger('click');
    expect(w.emitted('click')).toBeFalsy();
  });

  it('renders left and right icons', () => {
    const w = mount(Button, { props: { leftIcon: 'play', rightIcon: 'chevron-down' } });
    expect(w.findAll('svg').length).toBe(2);
  });

  it('applies variant, size, and block modifiers', () => {
    const w = mount(Button, { props: { variant: 'outline', size: 'lg', block: true } });
    const c = w.find('button').classes();
    expect(c).toContain('phlix-btn--outline');
    expect(c).toContain('phlix-btn--lg');
    expect(c).toContain('phlix-btn--block');
  });
});

describe('IconButton', () => {
  it('requires a label exposed as aria-label + title', () => {
    const w = mount(IconButton, { props: { name: 'play', label: 'Play' } });
    const btn = w.find('button');
    expect(btn.attributes('aria-label')).toBe('Play');
    expect(btn.attributes('title')).toBe('Play');
    expect(w.find('svg').exists()).toBe(true);
  });

  it('omits aria-pressed unless pressed is defined; sets it for toggles', () => {
    const off = mount(IconButton, { props: { name: 'volume', label: 'Mute' } });
    expect(off.find('button').attributes('aria-pressed')).toBeUndefined();
    const on = mount(IconButton, { props: { name: 'mute', label: 'Unmute', pressed: true } });
    expect(on.find('button').attributes('aria-pressed')).toBe('true');
    expect(on.find('button').classes()).toContain('is-pressed');
  });

  it('shows spinner + aria-busy while loading and disables', () => {
    const w = mount(IconButton, { props: { name: 'play', label: 'Play', loading: true } });
    expect(w.find('button').attributes('aria-busy')).toBe('true');
    expect(w.find('button').attributes('disabled')).toBeDefined();
    expect(w.find('.phlix-iconbtn__spin').exists()).toBe(true);
  });
});

describe('Badge', () => {
  it('renders slot with tone + size classes', () => {
    const w = mount(Badge, { props: { tone: 'accent', size: 'md' }, slots: { default: 'New' } });
    const el = w.find('.phlix-badge');
    expect(el.text()).toContain('New');
    expect(el.classes()).toContain('phlix-badge--accent');
    expect(el.classes()).toContain('phlix-badge--md');
  });

  it('renders mono variant + optional icon, and exposes label when given', () => {
    const w = mount(Badge, { props: { mono: true, icon: 'star', label: '4K HDR' }, slots: { default: '4K' } });
    const el = w.find('.phlix-badge');
    expect(el.classes()).toContain('phlix-badge--mono');
    expect(el.attributes('role')).toBe('img');
    expect(el.attributes('aria-label')).toBe('4K HDR');
    expect(w.find('svg').exists()).toBe(true);
  });
});
