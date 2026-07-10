type __VLS_Props = {
    /** Current user rating (0-10), or null if not rated */
    modelValue: number | null;
    /** Media item ID for the rating API */
    mediaId: string;
    /** Number of stars to display (default 5) */
    size?: number;
    /** Disable interaction */
    readonly?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (rating: number | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((rating: number | null) => any) | undefined;
}>, {
    size: number;
    readonly: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
