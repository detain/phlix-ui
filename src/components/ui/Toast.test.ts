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
