import type { MediaItem } from '../types/media-item';
type __VLS_Props = {
    /** Items to render (the already-loaded page set). */
    items: MediaItem[];
    /** Full server result count. When set, the grid is sized to this up front so
     *  the page length is final immediately and not-yet-loaded rows render as
     *  skeletons until scrolled into view (on-demand paging fills them in). */
    total?: number | null;
    /** Initial load — show skeleton rows instead of cards. */
    loading?: boolean;
    /** Appending a further page (controls the bottom loading row). */
    loadingMore?: boolean;
    /** More items remain — enables the infinite-scroll sentinel. */
    hasMore?: boolean;
    /** Min card width (px). Overrides the `cardSize` preference when set. */
    cardSize?: number;
    /** Skeleton cards shown during the initial load. */
    skeletonCount?: number;
    /** Extra rows rendered above/below the visible band. */
    overscan?: number;
    /** Admin opt-in (U5): render each card's "Match" action + forward `match`. */
    canMatch?: boolean;
};
type __VLS_Slots = {
    /** Override the per-item card. Receives the item + its absolute index. */
    card?: (props: {
        item: MediaItem;
        index: number;
    }) => unknown;
    /** Replace the empty state. */
    empty?: () => unknown;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: MediaItem) => any;
    play: (item: MediaItem) => any;
    info: (item: MediaItem) => any;
    watchlist: (item: MediaItem) => any;
    "load-more": () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: MediaItem) => any) | undefined;
    onPlay?: ((item: MediaItem) => any) | undefined;
    onInfo?: ((item: MediaItem) => any) | undefined;
    onWatchlist?: ((item: MediaItem) => any) | undefined;
    "onLoad-more"?: (() => any) | undefined;
}>, {
    loading: boolean;
    canMatch: boolean;
    skeletonCount: number;
    hasMore: boolean;
    overscan: number;
    loadingMore: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
