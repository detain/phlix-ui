type __VLS_Props = {
    /** The <video> to sample (null until mounted / between media). */
    video?: HTMLVideoElement | null;
    /** Master on/off — the host passes prefs.atmosphere. */
    enabled?: boolean;
    /** Whether playback is running (drives the loop + the interval fallback). */
    playing?: boolean;
    /** Resolved (OS-aware) reduced-motion preference — disables sampling. */
    reducedMotion?: boolean;
    /** Glow brightness multiplier (theater mode boosts it). */
    intensity?: number;
};
/** Sample the current video frame once and update the live gradient. */
declare function sampleNow(): void;
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {
    sampleNow: typeof sampleNow;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    video: HTMLVideoElement | null;
    playing: boolean;
    reducedMotion: boolean;
    enabled: boolean;
    intensity: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
