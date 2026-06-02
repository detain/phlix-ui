import type { MediaItem } from '../types/media-item';
import type { HomeRow as HomeRowConfig } from '../app/types';
type __VLS_Props = {
    row: HomeRowConfig;
    apiBase: string;
    /** Items fetched for the rail. */
    limit?: number;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    play: (item: MediaItem) => any;
    info: (item: MediaItem) => any;
    watchlist: (item: MediaItem) => any;
    "items-loaded": (items: MediaItem[]) => any;
    "see-all": (row: HomeRowConfig) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPlay?: ((item: MediaItem) => any) | undefined;
    onInfo?: ((item: MediaItem) => any) | undefined;
    onWatchlist?: ((item: MediaItem) => any) | undefined;
    "onItems-loaded"?: ((items: MediaItem[]) => any) | undefined;
    "onSee-all"?: ((row: HomeRowConfig) => any) | undefined;
}>, {
    limit: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
