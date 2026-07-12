type __VLS_Props = {
    /** Current playback position in seconds (from parent player). */
    position: number;
    /** Current playback duration in seconds (from parent player). */
    duration: number;
    /** Whether the local video is currently playing. */
    isPlaying: boolean;
    /** Whether the local video is buffering. */
    isBuffering?: boolean;
    /** Optional API base URL override; falls back to useMediaApiBase(). */
    apiBase?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    play: () => any;
    pause: () => any;
    seek: (position: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPlay?: (() => any) | undefined;
    onPause?: (() => any) | undefined;
    onSeek?: ((position: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
