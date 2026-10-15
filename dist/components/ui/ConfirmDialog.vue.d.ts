type __VLS_Props = {
    /** Dialog visibility (v-model:open). */
    open: boolean;
    /** Dialog title; defaults to the generic "Are you sure?" caption. */
    title?: string;
    /** The scenario text — REQUIRED: a confirm with nothing to confirm is theater. */
    message: string;
    /** Affirmative caption; defaults to "Confirm". */
    confirmLabel?: string;
    /** Style the affirmative button as destructive (R13-13 pairs this with truth). */
    danger?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    cancel: () => any;
    confirm: () => any;
    "update:open": (v: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onCancel?: (() => any) | undefined;
    onConfirm?: (() => any) | undefined;
    "onUpdate:open"?: ((v: boolean) => any) | undefined;
}>, {
    title: string;
    danger: boolean;
    confirmLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
