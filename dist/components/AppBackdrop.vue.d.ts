type __VLS_Props = {
    enabled?: boolean;
    grain?: boolean;
    vignette?: boolean;
    ambient?: boolean;
    /** CSS color for the ambient glow (e.g. a poster's dominant color). */
    ambientColor?: string;
    /** Poster URL — a blurred, scaled copy becomes the ambient glow. */
    ambientImage?: string;
    /** 0–1 multiplier over the theme grain/ambient intensity. */
    intensity?: number;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    enabled: boolean;
    grain: boolean;
    vignette: boolean;
    ambient: boolean;
    intensity: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
