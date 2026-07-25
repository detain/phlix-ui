type __VLS_Props = {
    /** Album name — router `props: true` passes `:name` as a prop. */
    name: string;
    /**
     * Album artist, to disambiguate a shared title. Accepted as a prop for a
     * consumer that maps it from its own route, and otherwise read off the
     * `?artist=` query (which is how `MusicArtistPage` navigates here).
     */
    artist?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
