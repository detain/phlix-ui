import type { CaptionStyle } from '../../stores/usePreferencesStore';
type __VLS_Props = {
    /** The `<video>` whose text tracks are read (may be null before mount). */
    video: HTMLVideoElement | null;
    /** Active subtitle language key (from the player store); null = off. */
    language: string | null;
    /** Persisted caption appearance. */
    styleConfig: CaptionStyle;
    /** Raise the captions above the control bar while the chrome is visible. */
    lifted?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {
    lines: import("vue").Ref<string[], string[]>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
