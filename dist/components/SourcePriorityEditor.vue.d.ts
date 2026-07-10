type __VLS_Props = {
    /** The current ordered list of source names. */
    modelValue: string[];
    /** The full set of selectable source names (built-ins + plugin sources). */
    available?: string[];
    /** Optional accessible label describing what this list orders. */
    label?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
}>, {
    label: string;
    available: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
