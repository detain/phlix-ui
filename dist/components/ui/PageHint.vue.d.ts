type __VLS_Props = {
    /** Optional small heading rendered above the body text. */
    title?: string;
    /** Accent colour of the left border + icon. */
    tone?: 'info' | 'accent';
    /** Optional external links rendered below the main text. */
    links?: Array<{
        text: string;
        url: string;
    }>;
    /** Optional longer explanation rendered as a collapsible details element. */
    details?: string;
};
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    details: string;
    title: string;
    tone: "info" | "accent";
    links: Array<{
        text: string;
        url: string;
    }>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
