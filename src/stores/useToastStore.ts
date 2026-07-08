/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
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

  const success = (message: string, opts?: Partial<ToastInput>) => show({ message, tone: 'success', ...opts });
  const error = (message: string, opts?: Partial<ToastInput>) => show({ message, tone: 'error', duration: 8000, ...opts });
  const warning = (message: string, opts?: Partial<ToastInput>) => show({ message, tone: 'warning', ...opts });
  const info = (message: string, opts?: Partial<ToastInput>) => show({ message, tone: 'info', ...opts });

  return { toasts, show, dismiss, clear, success, error, warning, info };
});
