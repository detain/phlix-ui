type __VLS_Props = {
    /** Stored resume position, in seconds. */
    seconds: number;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    resume: () => any;
    restart: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onResume?: (() => any) | undefined;
    onRestart?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
