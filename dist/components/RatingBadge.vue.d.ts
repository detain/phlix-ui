type __VLS_Props = {
    /** 0-10 rating score, or null if unrated */
    rating: number | null;
    /** Number of stars to display (default 5) */
    maxStars?: number;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    size: "sm" | "md" | "lg";
    maxStars: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
