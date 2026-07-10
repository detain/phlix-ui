type __VLS_Props = {
    /** Called when the timer expires — the Player pauses playback. */
    onExpire: () => void;
};
declare function toggleOpen(): void;
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {
    toggleOpen: typeof toggleOpen;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
