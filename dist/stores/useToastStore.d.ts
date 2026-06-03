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
export declare const useToastStore: import("pinia").StoreDefinition<"phlix-toast", Pick<{
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
    success: (message: string, opts?: Partial<ToastInput>) => number;
    error: (message: string, opts?: Partial<ToastInput>) => number;
    warning: (message: string, opts?: Partial<ToastInput>) => number;
    info: (message: string, opts?: Partial<ToastInput>) => number;
}, "toasts">, Pick<{
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
    success: (message: string, opts?: Partial<ToastInput>) => number;
    error: (message: string, opts?: Partial<ToastInput>) => number;
    warning: (message: string, opts?: Partial<ToastInput>) => number;
    info: (message: string, opts?: Partial<ToastInput>) => number;
}, never>, Pick<{
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
    success: (message: string, opts?: Partial<ToastInput>) => number;
    error: (message: string, opts?: Partial<ToastInput>) => number;
    warning: (message: string, opts?: Partial<ToastInput>) => number;
    info: (message: string, opts?: Partial<ToastInput>) => number;
}, "info" | "success" | "error" | "clear" | "dismiss" | "warning" | "show">>;
