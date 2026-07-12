import type { HlsLevel } from './hls-playback';
import type { Variant } from './transcode';
type __VLS_Props = {
    /** The live hls.js quality ladder (empty on native-HLS / before manifest parse). */
    levels?: HlsLevel[];
    /** Server-provided quality ladder from the transcode start/status response.
     *  Used as fallback when hls.js levels are insufficient (e.g. manifest only
     *  has one quality but the server knows about more). */
    variants?: Variant[] | null;
    /** Pinned hls.js level index, or `-1` when ABR ("Auto") is choosing. */
    currentLevel?: number;
    /** True while ABR owns the choice — the reliable "is Auto" signal (E2). */
    autoEnabled?: boolean;
    /** Height (px) of the level ABR is currently playing, for the "Auto (720p)" label. */
    activeHeight?: number | null;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (level: number | "auto") => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((level: number | "auto") => any) | undefined;
}>, {
    levels: HlsLevel[];
    variants: Variant[] | null;
    currentLevel: number;
    autoEnabled: boolean;
    activeHeight: number | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
