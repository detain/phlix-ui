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

  it('stays focusable while loading: aria-disabled + aria-busy, no native disabled, spinner shown (CU-117)', () => {
    // The old shape set the NATIVE disabled attribute during loading, which
    // makes a focused button unfocusable — browsers blur it the moment the
    // attribute lands and focus falls to <body>, stranding the keyboard user
    // for the whole request (ui__webux #13). The focus-retain law is pinned
    // mechanically here because this suite's jsdom provably does NOT blur a
    // focused element when it becomes disabled (probe: focus survives the
    // attr flip, and focus() even succeeds ON a disabled button) — so the
    // only honest teeth are the attribute-contract pins below: absence of
    // the native attribute (the browser's blur trigger) plus the ARIA
    // announcement of the same blocked state.
    const w = mount(Button, { props: { loading: true } });
    const btn = w.find('button');
    expect(btn.attributes('disabled')).toBeUndefined();
    expect(btn.attributes('aria-disabled')).toBe('true');
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

  // CU-117 companions: focusability gained must not trade away the two jobs
  // native disabled also did — swallow activation, and never submit the form
  // as the default submitter while pending (Enter-in-field double-submit).
  it('does not route clicks to consumers while loading', async () => {
    const w = mount(Button, { props: { loading: true } });
    await w.find('button').trigger('click');
    expect(w.emitted('click')).toBeFalsy();
  });

  it('a loading submit button blocks form submission it would originate, but not others (CU-117)', async () => {
    const form = document.createElement('form');
    document.body.appendChild(form);
    const w = mount(Button, { props: { type: 'submit', loading: true }, attachTo: form });
    const other = document.createElement('button');
    other.type = 'submit';
    form.appendChild(other);
    let submits = 0;
    form.addEventListener('submit', () => { submits += 1; });

    const ours = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(ours, 'submitter', { value: w.find('button').element });
    form.dispatchEvent(ours);
    expect(ours.defaultPrevented).toBe(true);
    // stopImmediatePropagation in the capture guard also starves the form's
    // own listeners — the submission is dead, not just cancelled.
    expect(submits).toBe(0);

    const theirs = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(theirs, 'submitter', { value: other });
    form.dispatchEvent(theirs);
    expect(theirs.defaultPrevented).toBe(false);
    expect(submits).toBe(1);

    w.unmount();
    form.remove();
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
