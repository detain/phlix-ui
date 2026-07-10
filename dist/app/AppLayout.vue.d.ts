declare var __VLS_6: {}, __VLS_8: {}, __VLS_10: {}, __VLS_19: {}, __VLS_21: {}, __VLS_29: {};
type __VLS_Slots = {} & {
    logo?: (props: typeof __VLS_6) => any;
} & {
    nav?: (props: typeof __VLS_8) => any;
} & {
    actions?: (props: typeof __VLS_10) => any;
} & {
    default?: (props: typeof __VLS_19) => any;
} & {
    footer?: (props: typeof __VLS_21) => any;
} & {
    nav?: (props: typeof __VLS_29) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
