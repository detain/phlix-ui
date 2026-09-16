import type { CaptionStyle } from '../../stores/usePreferencesStore';
/**
 * W109 S504 — code-resident survival sentinel for the ResizeObserver-driven
 * subtitle lift. Exported so it is genuine shipped module surface (not a comment
 * that a future build could strip), mirroring the estate's token convention.
 */
export declare const S504_SUBOFFSET_TOKEN = "S504SUBOFFSETX9P2";
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<{
    /** The `<video>` whose text tracks are read (may be null before mount). */
    video: HTMLVideoElement | null;
    /** Active subtitle language key (from the player store); null = off. */
    language: string | null;
    /** Persisted caption appearance. */
    styleConfig: CaptionStyle;
    /** Raise the captions above the control bar while the chrome is visible. */
    lifted?: boolean;
    /** The control cluster whose real height the captions must clear (S504). When
     *  present its height is measured with a ResizeObserver and bound to
     *  `--phlix-sub-offset`; null (standalone/test, or before the Player mounts its
     *  ref) simply yields a `0` offset. */
    controlsRoot?: HTMLElement | null;
}, {
    lines: import("vue").Ref<string[], string[]>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    /** The `<video>` whose text tracks are read (may be null before mount). */
    video: HTMLVideoElement | null;
    /** Active subtitle language key (from the player store); null = off. */
    language: string | null;
    /** Persisted caption appearance. */
    styleConfig: CaptionStyle;
    /** Raise the captions above the control bar while the chrome is visible. */
    lifted?: boolean;
    /** The control cluster whose real height the captions must clear (S504). When
     *  present its height is measured with a ResizeObserver and bound to
     *  `--phlix-sub-offset`; null (standalone/test, or before the Player mounts its
     *  ref) simply yields a `0` offset. */
    controlsRoot?: HTMLElement | null;
}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
