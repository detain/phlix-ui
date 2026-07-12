import type { MediaItem } from '../types/media-item';
type __VLS_Props = {
    /** Rail heading. */
    title: string;
    /** Items to render. */
    items: MediaItem[];
    /** Initial load — show skeleton cards instead of items. */
    loading?: boolean;
    /** Error message; renders an inline retry affordance. */
    error?: string | null;
    /** Optional count shown next to the title (e.g. total available). */
    count?: number | null;
    /** Skeleton cards shown during the initial load. */
    skeletonCount?: number;
    /** Empty-state copy when there is nothing to show. */
    emptyText?: string;
    /** Collapse the whole rail (render nothing) when settled + empty. */
    hideWhenEmpty?: boolean;
    /** Override the per-card link target prefix (default the player route). */
    cardTo?: (item: MediaItem) => string;
    /** Admin opt-in (U5): render each card's "Match" action + forward `match`. */
    canMatch?: boolean;
    /**
     * Hints the browser to prioritize loading the posters in this row (maps to
     * the HTML `fetchpriority` attribute on the underlying `<img>` elements).
     * Use `high` for the first visible row to improve LCP.
     */
    fetchPriority?: 'high' | 'low' | 'auto';
};
declare var __VLS_1: {}, __VLS_19: {};
type __VLS_Slots = {} & {
    action?: (props: typeof __VLS_1) => any;
} & {
    empty?: (props: typeof __VLS_19) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: import("../types/media-item").MediaDetail) => any;
    play: (item: import("../types/media-item").MediaDetail) => any;
    info: (item: import("../types/media-item").MediaDetail) => any;
    retry: () => any;
    watchlist: (item: import("../types/media-item").MediaDetail) => any;
    refresh: (item: import("../types/media-item").MediaDetail) => any;
    remove: (item: import("../types/media-item").MediaDetail) => any;
    "mark-watched": (item: import("../types/media-item").MediaDetail) => any;
    "choose-poster": (item: import("../types/media-item").MediaDetail) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onPlay?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onInfo?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRetry?: (() => any) | undefined;
    onWatchlist?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRefresh?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRemove?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onMark-watched"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onChoose-poster"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
}>, {
    error: string | null;
    loading: boolean;
    canMatch: boolean;
    count: number | null;
    skeletonCount: number;
    hideWhenEmpty: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
