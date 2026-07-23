type __VLS_Props = {
    modelValue: boolean;
    title?: string;
    /** Allow closing via Esc / backdrop. Default true. */
    dismissible?: boolean;
    /** Hide the built-in close button. */
    hideClose?: boolean;
    /**
     * Panel max-width. `sm` 24rem · `md` 32rem (default) · `lg` 48rem · `xl` min(90vw, 72rem).
     * `xl` is used by the admin plugin Configure modal for its wide schema-driven form.
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';
};
declare var __VLS_20: {}, __VLS_22: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_20) => any;
} & {
    footer?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: () => any;
    "update:modelValue": (v: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((v: boolean) => any) | undefined;
}>, {
    size: "sm" | "md" | "lg" | "xl";
    dismissible: boolean;
    hideClose: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
