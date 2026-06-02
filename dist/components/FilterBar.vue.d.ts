type __VLS_Props = {
    /** Debounce (ms) before a typed search refetches. */
    searchDebounce?: number;
    /** Stick the bar to the top of the scroll container and condense on scroll. */
    sticky?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: (() => any) | undefined;
}>, {
    sticky: boolean;
    searchDebounce: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
