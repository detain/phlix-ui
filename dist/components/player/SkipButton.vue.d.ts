import type { TimeMarker } from './playback';
type __VLS_Props = {
    /** Current playback position, in seconds. */
    position: number;
    /** Intro range — shows "Skip intro" while the playhead is inside it. */
    introMarker?: TimeMarker | null;
    /** Outro range — shows "Skip outro" while the playhead is inside it. */
    outroMarker?: TimeMarker | null;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    skip: (targetSeconds: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSkip?: ((targetSeconds: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
