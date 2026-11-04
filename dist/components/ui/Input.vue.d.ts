type __VLS_Props = {
    modelValue: string | number;
    label?: string;
    placeholder?: string;
    type?: string;
    min?: string | number;
    max?: string | number;
    disabled?: boolean;
    /**
     * ui__webux M19 — inline validation message. When set, the field renders
     * invalid and the message is wired to the input via aria-invalid +
     * aria-describedby and announced through an aria-live region. Same channel
     * AuthField ships; pages can now fail a field in place instead of routing
     * the failure to the toast stack.
     */
    error?: string | null;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: string | number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: string | number) => any) | undefined;
}>, {
    type: string;
    error: string | null;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
