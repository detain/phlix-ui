import type { MusicTrack } from '../types/music';
type __VLS_Props = {
    tracks: MusicTrack[];
    playingTrackId?: number | null;
    loading?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    play: (track: MusicTrack) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPlay?: ((track: MusicTrack) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
