import type { MusicAlbum } from '../types/music';
type __VLS_Props = {
    album: MusicAlbum;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (album: MusicAlbum) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((album: MusicAlbum) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
