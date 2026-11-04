/**
 * Pinia toast store — the notification queue, tones and auto-dismiss.
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
 * UI-M18 (review ui__webux) law 1 — the stack is BOUNDED. A failing poll loop
 * or offline-retry storm used to stack toasts without limit; at most this many
 * are kept, and the OLDEST is evicted first.
 */
export const MAX_VISIBLE_TOASTS = 5;

/**
 * UI-M18 law 2 — the two interaction channels that can freeze a countdown:
 * the pointer hovering the toast, and keyboard focus resting inside it.
 */
export type ToastHoldSource = 'pointer' | 'focus';

/** One toast's auto-dismiss state: banked time, arm start, live timer handle. */
interface Countdown {
  /** ms left to run as of the most recent arm (or freeze, where it was banked). */
  remaining: number;
  /** when the current arm began; null while frozen by a hold. */
  startedAt: number | null;
  /** live timer handle; null while frozen (or never armed). */
  handle: ReturnType<typeof setTimeout> | null;
}

/**
 * useToastStore (R0.4e) — transient notifications surfaced by <ToastHost>.
 *
 *   const toasts = useToastStore();
 *   toasts.error('Failed to load library');
 *   toasts.show({ message: 'Saved', tone: 'success', action: { label: 'Undo', onClick } });
 *
 * UI-M18 (review ui__webux, WCAG 2.2.1 Timing Adjustable) ships three laws:
 * the visible stack is bounded ({@link MAX_VISIBLE_TOASTS}, oldest evicted);
 * {@link hold}/{@link release} freeze and resume a toast's countdown refcounted
 * per source, so <ToastHost> can pause on pointerenter/focusin without racing
 * two channels against each other; and a toast carrying an action REFUSES
 * auto-dismiss entirely — its button must never evaporate mid-interaction.
 */
export const useToastStore = defineStore('phlix-toast', () => {
  const toasts = ref<Toast[]>([]);
  const countdowns = new Map<number, Countdown>();
  const holds = new Map<number, Set<ToastHoldSource>>();
  let seq = 0;

  function dismiss(id: number) {
    const countdown = countdowns.get(id);
    if (countdown && countdown.handle !== null) {
      clearTimeout(countdown.handle);
    }
    countdowns.delete(id);
    holds.delete(id);
    toasts.value = toasts.value.filter((x) => x.id !== id);
  }

  /** Arm (or re-arm) the countdown for `remaining` ms from now. */
  function arm(id: number, remaining: number) {
    countdowns.set(id, {
      remaining,
      startedAt: Date.now(),
      handle: setTimeout(() => dismiss(id), remaining),
    });
  }

  /**
   * Freeze a toast's countdown for one interaction source. Refcounted: while
   * ANY source holds, the countdown stays frozen; the second hold is additive
   * and releasing one channel keeps the other's freeze.
   */
  function hold(id: number, source: ToastHoldSource): void {
    const sources = holds.get(id) ?? new Set<ToastHoldSource>();
    holds.set(id, sources);
    if (sources.has(source)) return;
    sources.add(source);
    if (sources.size > 1) return; // already frozen by the other channel
    const countdown = countdowns.get(id);
    if (!countdown || countdown.handle === null) return; // sticky/actionable: nothing to freeze
    clearTimeout(countdown.handle);
    const elapsed = Math.max(0, Date.now() - (countdown.startedAt ?? Date.now()));
    countdown.handle = null;
    countdown.startedAt = null;
    countdown.remaining = Math.max(0, countdown.remaining - elapsed);
  }

  /**
   * Lift one source's freeze; the countdown resumes ONLY when the last holder
   * leaves, for exactly the time the hold consumed. Inert without a prior
   * hold, and never resurrects a dismissed toast (dismiss clears the ledger).
   */
  function release(id: number, source: ToastHoldSource): void {
    const sources = holds.get(id);
    if (!sources || !sources.has(source)) return;
    sources.delete(source);
    if (sources.size > 0) return; // the other channel still holds
    const countdown = countdowns.get(id);
    if (!countdown || countdown.handle !== null) return; // never frozen / never armed
    arm(id, countdown.remaining);
  }

  function show(input: ToastInput): number {
    const id = ++seq;
    const toast: Toast = { tone: 'neutral', duration: 5000, ...input, id };
    toasts.value.push(toast);
    // UI-M18 law 3: actionable toasts never time out (the 0-duration sticky
    // law stays); plain toasts arm their countdown.
    if (toast.duration > 0 && toast.action === undefined) {
      arm(id, toast.duration);
    }
    // UI-M18 law 1: bounded stack, oldest evicted first (dismiss also drops
    // the evicted toast's timer, so it can never fire against a survivor).
    while (toasts.value.length > MAX_VISIBLE_TOASTS) {
      dismiss(toasts.value[0]!.id);
    }
    return id;
  }

  function clear() {
    countdowns.forEach((countdown) => {
      if (countdown.handle !== null) clearTimeout(countdown.handle);
    });
    countdowns.clear();
    holds.clear();
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

  return { toasts, show, dismiss, clear, hold, release, success, error, warning, info };
});
