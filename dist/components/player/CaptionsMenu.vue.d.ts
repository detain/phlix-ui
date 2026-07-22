import { type TextTrackInfo } from './captions';
type __VLS_Props = {
    /** Subtitle/caption tracks enumerated from the `<video>` (Player owns it). */
    tracks?: TextTrackInfo[];
    /** Audio tracks (only rendered when more than one is present). */
    audioTracks?: TextTrackInfo[];
    /** Index of the active audio track (-1 = none/unknown). */
    activeAudio?: number;
    /** Popover open state (v-model:open). */
    open?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:open": (v: boolean) => any;
    "select-audio": (index: number) => any;
    "add-subtitles": () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:open"?: ((v: boolean) => any) | undefined;
    "onSelect-audio"?: ((index: number) => any) | undefined;
    "onAdd-subtitles"?: (() => any) | undefined;
}>, {
    open: boolean;
    tracks: TextTrackInfo[];
    audioTracks: TextTrackInfo[];
    activeAudio: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
