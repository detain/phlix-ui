type __VLS_Props = {
    tag?: string;
    /** delay in ms before the reveal transition starts (use for staggering). */
    delay?: number;
    /** initial vertical offset in px. */
    y?: number;
    /** reveal only once it scrolls into view. */
    whenVisible?: boolean;
};
declare var __VLS_11: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_11) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    y: number;
    delay: number;
    tag: string;
    whenVisible: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
