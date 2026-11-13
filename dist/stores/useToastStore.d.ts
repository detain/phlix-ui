/**
 * Pinia toast store — the notification queue, tones and auto-dismiss.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
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
export declare const MAX_VISIBLE_TOASTS = 5;
/**
 * UI-M18 law 2 — the two interaction channels that can freeze a countdown:
 * the pointer hovering the toast, and keyboard focus resting inside it.
 */
export type ToastHoldSource = 'pointer' | 'focus';
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
export declare const useToastStore: import("pinia").SetupStoreDefinition<"phlix-toast", {
    toasts: import("vue").Ref<{
        id: number;
        tone: ToastTone;
        duration: number;
        message: string;
        title?: string | undefined;
        icon?: IconName | undefined;
        action?: {
            label: string;
            onClick: () => void;
        } | undefined;
    }[], Toast[] | {
        id: number;
        tone: ToastTone;
        duration: number;
        message: string;
        title?: string | undefined;
        icon?: IconName | undefined;
        action?: {
            label: string;
            onClick: () => void;
        } | undefined;
    }[]>;
    show: (input: ToastInput) => number;
    dismiss: (id: number) => void;
    clear: () => void;
    hold: (id: number, source: ToastHoldSource) => void;
    release: (id: number, source: ToastHoldSource) => void;
    success: (message: string, opts?: Partial<ToastInput>) => number;
    error: (message: string, opts?: Partial<ToastInput>) => number;
    warning: (message: string, opts?: Partial<ToastInput>) => number;
    info: (message: string, opts?: Partial<ToastInput>) => number;
}>;
