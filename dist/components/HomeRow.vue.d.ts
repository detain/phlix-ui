import type { MediaItem } from '../types/media-item';
import type { HomeRow as HomeRowConfig } from '../app/types';
type __VLS_Props = {
    row: HomeRowConfig;
    apiBase: string;
    /** Items fetched for the rail. */
    limit?: number;
    /** Show the "See all" affordance. Off for query-only shelves that have no
     *  navigable target (e.g. a configured genre row) so the button isn't dead. */
    showSeeAll?: boolean;
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
    showSeeAll: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
