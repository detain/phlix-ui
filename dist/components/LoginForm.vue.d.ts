declare var __VLS_29: {};
type __VLS_Slots = {} & {
    oauth?: (props: typeof __VLS_29) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    success: () => any;
}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{
    onSuccess?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
