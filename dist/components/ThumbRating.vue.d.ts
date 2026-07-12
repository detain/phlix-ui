type __VLS_Props = {
    /** Current rating level, −2..+2. Out-of-range values are clamped for display. */
    level?: number;
    /** Disable interaction (e.g. while a persist is in flight). */
    disabled?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    cycle: (next: number) => any;
    "update:level": (next: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onCycle?: ((next: number) => any) | undefined;
    "onUpdate:level"?: ((next: number) => any) | undefined;
}>, {
    disabled: boolean;
    level: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
