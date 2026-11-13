type __VLS_Props = {
    panel?: 'appearance' | 'playback';
    /** Subtitle languages discovered from the library/account (BCP-47 codes or
     *  `{ language, label }`). When absent/empty the static fallback list is used. */
    subtitleLanguages?: ReadonlyArray<string | {
        language: string;
        label?: string;
    }>;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    panel: "playback" | "appearance";
    subtitleLanguages: readonly (string | {
        language: string;
        label?: string;
    })[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
