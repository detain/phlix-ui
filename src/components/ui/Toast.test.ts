/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from '../../stores/useToastStore';
import ToastHost from './ToastHost.vue';

beforeEach(() => {
  setActivePinia(createPinia());
});
afterEach(() => {
  document.body.innerHTML = '';
});

describe('useToastStore', () => {
  it('show() adds a toast with defaults and returns its id', () => {
    const s = useToastStore();
    const id = s.show({ message: 'Hello' });
    expect(s.toasts).toHaveLength(1);
    expect(s.toasts[0]).toMatchObject({ id, message: 'Hello', tone: 'neutral', duration: 5000 });
  });

  it('convenience helpers set the right tone (error is sticky-longer)', () => {
    const s = useToastStore();
    s.success('ok');
    s.error('boom');
    expect(s.toasts[0].tone).toBe('success');
    expect(s.toasts[1]).toMatchObject({ tone: 'error', duration: 8000 });
  });

  it('auto-dismisses after duration; 0 stays sticky', () => {
    vi.useFakeTimers();
    const s = useToastStore();
    s.show({ message: 'temp', duration: 1000 });
    s.show({ message: 'sticky', duration: 0 });
    expect(s.toasts).toHaveLength(2);
    vi.advanceTimersByTime(1000);
    expect(s.toasts.map((t) => t.message)).toEqual(['sticky']);
    vi.useRealTimers();
  });

  it('dismiss(id) and clear() remove toasts', () => {
    const s = useToastStore();
    const a = s.show({ message: 'a', duration: 0 });
    s.show({ message: 'b', duration: 0 });
    s.dismiss(a);
    expect(s.toasts.map((t) => t.message)).toEqual(['b']);
    s.clear();
    expect(s.toasts).toHaveLength(0);
  });
});

describe('ToastHost', () => {
  it('renders toasts; error uses role=alert, others role=status; dismiss button works', async () => {
    const s = useToastStore();
    mount(ToastHost, { attachTo: document.body });
    s.show({ message: 'Saved', tone: 'success', duration: 0 });
    s.error('Failed');
    await new Promise((r) => setTimeout(r, 0));
    const toasts = document.body.querySelectorAll('.phlix-toast');
    expect(toasts).toHaveLength(2);
    expect(document.body.querySelector('.phlix-toast--error')?.getAttribute('role')).toBe('alert');
    expect(document.body.querySelector('.phlix-toast--success')?.getAttribute('role')).toBe('status');

    const dismiss = document.body.querySelector('.phlix-toast button[aria-label="Dismiss"]') as HTMLButtonElement;
    dismiss.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(1);
  });

  it('runs the action and dismisses', async () => {
    const s = useToastStore();
    const onClick = vi.fn();
    mount(ToastHost, { attachTo: document.body });
    s.show({ message: 'Deleted', duration: 0, action: { label: 'Undo', onClick } });
    await new Promise((r) => setTimeout(r, 0));
    const action = document.body.querySelector('.phlix-toast__action') as HTMLButtonElement;
    action.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClick).toHaveBeenCalledOnce();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(0);
  });
});

describe('ToastHost — announcement channel truth (ui__webux UI-m22)', () => {
  it('the wrapper is a labeled region with NO aria-live — the per-toast roles are the live channel', async () => {
    const s = useToastStore();
    mount(ToastHost, { attachTo: document.body });
    s.show({ message: 'Saved', tone: 'success', duration: 0 });
    await new Promise((r) => setTimeout(r, 0));
    const region = document.body.querySelector('.phlix-toasts') as HTMLElement;
    expect(region.getAttribute('aria-live')).toBeNull();
    expect(region.getAttribute('role')).toBe('region');
    expect(region.getAttribute('aria-label')).toBe('Notifications');
    // The docblock now states what the DOM does: this toast speaks through its
    // own status role — the region never announces.
    expect(document.body.querySelector('.phlix-toast')?.getAttribute('role')).toBe('status');
  });
});
// UI-M18 (review ui__webux): ToastHost must wire the pointer and keyboard into
// the store's hold/resume pause — WCAG 2.2.1 Timing Adjustable. These pins
// drive the REAL events on the REAL toast element; the countdown pausing is
// the store's own law (pinned in useToastStore.test.ts), the wiring is here.
describe('ToastHost — hover/focus pause the countdown (UI-M18)', () => {
  const flush = () => vi.advanceTimersByTimeAsync(0);
  const toastEl = () => document.body.querySelector('.phlix-toast') as HTMLElement;

  it('pointerenter freezes dismissal; the toast survives its whole window', async () => {
    vi.useFakeTimers();
    const s = useToastStore();
    mount(ToastHost, { attachTo: document.body });
    s.show({ message: 'reading', duration: 2000 });
    await flush();
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(1);

    toastEl().dispatchEvent(new Event('pointerenter'));
    await vi.advanceTimersByTimeAsync(5000); // hovered through (and past) its window
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(1);

    toastEl().dispatchEvent(new Event('pointerleave'));
    await vi.advanceTimersByTimeAsync(1999); // full original window resumes
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(0);
    vi.useRealTimers();
  });

  it('focus inside the toast freezes dismissal too (keyboard user on the action)', async () => {
    vi.useFakeTimers();
    const s = useToastStore();
    mount(ToastHost, { attachTo: document.body });
    s.show({ message: 'tabbed', duration: 2000 });
    await flush();

    toastEl().dispatchEvent(new Event('focusin'));
    await vi.advanceTimersByTimeAsync(5000);
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(1);

    toastEl().dispatchEvent(new Event('focusout'));
    await vi.advanceTimersByTimeAsync(2000);
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(0);
    vi.useRealTimers();
  });

  it('both sources hold at once — leaving the pointer while focus stays inside keeps the toast up', async () => {
    vi.useFakeTimers();
    const s = useToastStore();
    mount(ToastHost, { attachTo: document.body });
    s.show({ message: 'both', duration: 2000 });
    await flush();

    const el = toastEl();
    el.dispatchEvent(new Event('pointerenter'));
    el.dispatchEvent(new Event('focusin'));
    el.dispatchEvent(new Event('pointerleave')); // mouse leaves, caret still inside
    await vi.advanceTimersByTimeAsync(9000);
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(1);

    el.dispatchEvent(new Event('focusout'));
    await vi.advanceTimersByTimeAsync(2000);
    expect(document.body.querySelectorAll('.phlix-toast')).toHaveLength(0);
    vi.useRealTimers();
  });

  it('an actionable toast renders past any timer — the Undo button cannot evaporate mid-interaction', async () => {
    vi.useFakeTimers();
    const s = useToastStore();
    mount(ToastHost, { attachTo: document.body });
    s.show({ message: 'Deleted', duration: 1000, action: { label: 'Undo', onClick: vi.fn() } });
    await flush();

    await vi.advanceTimersByTimeAsync(60000); // ten windows with nobody hovering
    expect(document.body.querySelectorAll('.phlix-toast__action')).toHaveLength(1);
    vi.useRealTimers();
  });
});
