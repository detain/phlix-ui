export interface Chapter {
    /** Chapter start, in seconds. */
    start: number;
    title?: string;
}
type __VLS_Props = {
    position: number;
    duration: number;
    buffered?: number;
    /** Chapter markers — rendered as ticks when present. */
    chapters?: Chapter[];
    /** Optional preview-thumbnail source for a given time (VTT sprite / server hint). */
    thumbnailAt?: (seconds: number) => string | null | undefined;
    /** Seconds the arrow keys nudge by. */
    step?: number;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {
    playedRatio: import("vue").ComputedRef<number>;
    previewActive: import("vue").ComputedRef<boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    seek: (seconds: number) => any;
    "scrub-start": () => any;
    "scrub-end": () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSeek?: ((seconds: number) => any) | undefined;
    "onScrub-start"?: (() => any) | undefined;
    "onScrub-end"?: (() => any) | undefined;
}>, {
    step: number;
    buffered: number;
    chapters: Chapter[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
