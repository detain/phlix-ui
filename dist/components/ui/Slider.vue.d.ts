type __VLS_Props = {
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    label?: string;
    /** Maps the value to a spoken/aria string (e.g. percent, timecode). */
    formatValue?: (v: number) => string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (v: number) => any;
    "update:modelValue": (v: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((v: number) => any) | undefined;
    "onUpdate:modelValue"?: ((v: number) => any) | undefined;
}>, {
    disabled: boolean;
    step: number;
    min: number;
    max: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
