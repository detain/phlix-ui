/** A skip marker from `GET /api/v1/media/{id}/markers`. */
export interface SkipMarker {
    id: string;
    type: 'intro' | 'outro' | 'credits' | 'ad';
    startMs: number;
    endMs: number;
    label: string;
}
type __VLS_Props = {
    /** Current playback position, in seconds. */
    position: number;
    /** All available skip markers for the current media. */
    markers?: SkipMarker[];
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    skip: (targetSeconds: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSkip?: ((targetSeconds: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
