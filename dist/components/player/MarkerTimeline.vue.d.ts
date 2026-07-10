/** A skip marker from `GET /api/v1/media/:id/markers` (also exported by SkipControls). */
export interface Marker {
    id: string;
    type: 'intro' | 'outro' | 'credits' | 'ad';
    startMs: number;
    endMs: number;
    label: string;
}
type __VLS_Props = {
    /** Current playback position, in seconds. */
    position: number;
    /** Total duration, in seconds. */
    duration: number;
    /** All available markers for the current media. */
    markers?: Marker[];
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    seek: (targetSeconds: number) => any;
    similar: (type: "intro" | "outro" | "credits" | "ad", startMs: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSeek?: ((targetSeconds: number) => any) | undefined;
    onSimilar?: ((type: "intro" | "outro" | "credits" | "ad", startMs: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
