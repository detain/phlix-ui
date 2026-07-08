/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Modal from './Modal.vue';
import Sheet from './Sheet.vue';
import Tooltip from './Tooltip.vue';

afterEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

describe('Modal', () => {
  it('renders a labelled modal dialog when open, nothing when closed', () => {
    const closed = mount(Modal, { props: { modelValue: false }, attachTo: document.body });
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
    closed.unmount();

    const w = mount(Modal, { props: { modelValue: true, title: 'Confirm' }, slots: { default: 'Body' }, attachTo: document.body });
    const dlg = document.body.querySelector('[role="dialog"]')!;
    expect(dlg).not.toBeNull();
    expect(dlg.getAttribute('aria-modal')).toBe('true');
    const labelledby = dlg.getAttribute('aria-labelledby')!;
    expect(document.getElementById(labelledby)?.textContent).toBe('Confirm');
    expect(dlg.textContent).toContain('Body');
    w.unmount();
  });

  it('locks body scroll while open and restores on unmount', () => {
    const w = mount(Modal, { props: { modelValue: true }, attachTo: document.body });
    expect(document.body.style.overflow).toBe('hidden');
    w.unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('Escape closes (emits update:modelValue false + close)', async () => {
    const w = mount(Modal, { props: { modelValue: true, title: 'X' }, attachTo: document.body });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([false]);
    expect(w.emitted('close')).toBeTruthy();
    w.unmount();
  });

  it('does not close on Escape when not dismissible', async () => {
    const w = mount(Modal, { props: { modelValue: true, dismissible: false }, attachTo: document.body });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(w.emitted('update:modelValue')).toBeFalsy();
    w.unmount();
  });

  it('built-in close button closes', async () => {
    const w = mount(Modal, { props: { modelValue: true, title: 'X' }, attachTo: document.body });
    const closeBtn = document.body.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([false]);
    w.unmount();
  });

  it('traps Tab focus within the dialog (wraps last → first)', async () => {
    const w = mount(Modal, {
      props: { modelValue: true, title: 'X', hideClose: true },
      slots: { footer: '<button class="a">A</button><button class="b">B</button>' },
      attachTo: document.body,
    });
    const a = document.body.querySelector('.a') as HTMLButtonElement;
    const b = document.body.querySelector('.b') as HTMLButtonElement;
    b.focus();
    expect(document.activeElement).toBe(b);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(document.activeElement).toBe(a); // wrapped to first
    a.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
    expect(document.activeElement).toBe(b); // shift+tab wrapped to last
    w.unmount();
  });

  it('does not refcount-leak body scroll across stacked overlays', async () => {
    const a = mount(Modal, { props: { modelValue: true }, attachTo: document.body });
    const b = mount(Sheet, { props: { modelValue: true }, attachTo: document.body });
    expect(document.body.style.overflow).toBe('hidden');
    a.unmount(); // close first (non-LIFO)
    expect(document.body.style.overflow).toBe('hidden'); // still locked by the sheet
    b.unmount();
    expect(document.body.style.overflow).toBe(''); // fully released
  });

  it('renders footer slot', () => {
    const w = mount(Modal, { props: { modelValue: true }, slots: { footer: '<button>OK</button>' }, attachTo: document.body });
    expect(document.body.querySelector('.phlix-modal__footer')?.textContent).toContain('OK');
    w.unmount();
  });
});

describe('Sheet', () => {
  it('renders a side dialog and closes on Escape', async () => {
    const w = mount(Sheet, { props: { modelValue: true, side: 'right', title: 'Filters' }, attachTo: document.body });
    expect(document.body.querySelector('.phlix-sheet--right')).not.toBeNull();
    expect(document.body.querySelector('[role="dialog"]')?.getAttribute('aria-modal')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(w.emitted('update:modelValue')!.at(-1)).toEqual([false]);
    w.unmount();
  });
});

describe('Tooltip', () => {
  it('shows after delay on focus and wires aria-describedby onto the trigger', async () => {
    vi.useFakeTimers();
    const w = mount(Tooltip, {
      props: { text: 'Add to watchlist', delay: 200 },
      slots: { default: '<button class="trg">+</button>' },
      attachTo: document.body,
    });
    const trigger = w.find('.trg');
    await trigger.trigger('focusin');
    expect(document.querySelector('[role="tooltip"]')).toBeNull(); // not yet (delay)
    vi.advanceTimersByTime(200);
    await w.vm.$nextTick();
    const tip = document.querySelector('[role="tooltip"]')!;
    expect(tip.textContent).toContain('Add to watchlist');
    expect(trigger.attributes('aria-describedby')).toBe(tip.id);
    // hide on blur
    await trigger.trigger('focusout');
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    expect(trigger.attributes('aria-describedby')).toBeUndefined();
    vi.useRealTimers();
    w.unmount();
  });

  it('does not show when disabled', async () => {
    vi.useFakeTimers();
    const w = mount(Tooltip, {
      props: { text: 'Nope', disabled: true, delay: 0 },
      slots: { default: '<button class="trg">+</button>' },
      attachTo: document.body,
    });
    await w.find('.trg').trigger('mouseenter');
    vi.advanceTimersByTime(50);
    await w.vm.$nextTick();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    vi.useRealTimers();
    w.unmount();
  });
});
