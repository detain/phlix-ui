/** Named sizes (UI-27). Numbers are px; other strings pass through as a CSS length. */
export type SpinnerSize = 'xs' | 'sm' | 'md';
type __VLS_Props = {
    size?: SpinnerSize | number | (string & {});
    label?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
