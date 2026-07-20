export interface HelpLink {
    text: string;
    url: string;
}
type __VLS_Props = {
    /** The help paragraph text. Rendered as escaped plain text. */
    text: string;
    /** Optional inline reference links rendered below the text. */
    links?: readonly HelpLink[];
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    links: readonly HelpLink[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
