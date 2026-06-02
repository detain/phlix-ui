type __VLS_Props = {
    modelValue: boolean;
    title?: string;
    /** Allow closing via Esc / backdrop. Default true. */
    dismissible?: boolean;
    /** Hide the built-in close button. */
    hideClose?: boolean;
    size?: 'sm' | 'md' | 'lg';
};
declare var __VLS_16: {}, __VLS_18: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_16) => any;
} & {
    footer?: (props: typeof __VLS_18) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: boolean) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: boolean) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    size: "sm" | "md" | "lg";
    dismissible: boolean;
    hideClose: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
