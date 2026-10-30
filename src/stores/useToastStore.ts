/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IconName } from '../components/Icon.vue';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastInput {
  message: string;
  title?: string;
  tone?: ToastTone;
  /** ms before auto-dismiss; 0 = sticky. Default 5000. */
  duration?: number;
  icon?: IconName;
  action?: ToastAction;
}

export interface Toast extends ToastInput {
  id: number;
  tone: ToastTone;
  duration: number;
}

/**
 * useToastStore (R0.4e) — transient notifications surfaced by <ToastHost>.
 *
 *   const toasts = useToastStore();
 *   toasts.error('Failed to load library');
 *   toasts.show({ message: 'Saved', tone: 'success', action: { label: 'Undo', onClick } });
 */
export const useToastStore = defineStore('phlix-toast', () => {
  const toasts = ref<Toast[]>([]);
  const timers = new Map<number, ReturnType<typeof setTimeout>>();
  let seq = 0;

  function dismiss(id: number) {
    const t = timers.get(id);
    if (t) {
      clearTimeout(t);
      timers.delete(id);
    }
    toasts.value = toasts.value.filter((x) => x.id !== id);
  }

  function show(input: ToastInput): number {
    const id = ++seq;
    const toast: Toast = { tone: 'neutral', duration: 5000, ...input, id };
    toasts.value.push(toast);
    if (toast.duration > 0) {
      timers.set(id, setTimeout(() => dismiss(id), toast.duration));
    }
    return id;
  }

  function clear() {
    timers.forEach((t) => clearTimeout(t));
    timers.clear();
    toasts.value = [];
  }

  /**
   * M-UI-28: the helpers used to spread `opts` after the positional message, so
   * `error('Download failed', { message: raw })` silently DROPPED the label —
   * only the raw error string ever rendered. Ten call sites had written exactly
   * that shape, because it is what the caller MEANS: a contextual title over a
   * body. The shape is now parsed as the intent it expresses: when `opts`
   * carries its own `message`, the positional becomes the `title` (an explicit
   * `opts.title` still wins); otherwise the positional is the message, as
   * always. Nothing a caller passes is ever discarded on the way in.
   */
  function withLabel(message: string, opts: Partial<ToastInput> | undefined, base: Partial<ToastInput>): ToastInput {
    if (opts === undefined) return { ...base, message };
    const { message: body, ...rest } = opts;
    if (body !== undefined) {
      // An explicit opts.title always wins over the positional label.
      return { ...base, title: rest.title ?? message, ...rest, message: body };
    }
    return { ...base, ...rest, message };
  }

  const success = (message: string, opts?: Partial<ToastInput>) => show(withLabel(message, opts, { tone: 'success' }));
  const error = (message: string, opts?: Partial<ToastInput>) => show(withLabel(message, opts, { tone: 'error', duration: 8000 }));
  const warning = (message: string, opts?: Partial<ToastInput>) => show(withLabel(message, opts, { tone: 'warning' }));
  const info = (message: string, opts?: Partial<ToastInput>) => show(withLabel(message, opts, { tone: 'info' }));

  return { toasts, show, dismiss, clear, success, error, warning, info };
});
