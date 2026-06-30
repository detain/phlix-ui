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
/**
 * Scroll the window so the row containing `index` sits at the top — the A-Z
 * jump rail drives this with a letter's offset. Works for any index in the
 * pre-sized grid (on-demand paging fills the destination once it's in view).
 */
declare function scrollToIndex(index: number): void;
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {
    scrollToIndex: typeof scrollToIndex;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: import("../types/media-item").MediaDetail) => any;
    play: (item: import("../types/media-item").MediaDetail) => any;
    info: (item: import("../types/media-item").MediaDetail) => any;
    watchlist: (item: import("../types/media-item").MediaDetail) => any;
    "load-more": () => any;
    "need-range": (startIndex: number, endIndex: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onPlay?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onInfo?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onWatchlist?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onLoad-more"?: (() => any) | undefined;
    "onNeed-range"?: ((startIndex: number, endIndex: number) => any) | undefined;
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
