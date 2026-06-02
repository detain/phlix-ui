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
};
declare var __VLS_1: {}, __VLS_19: {};
type __VLS_Slots = {} & {
    action?: (props: typeof __VLS_1) => any;
} & {
    empty?: (props: typeof __VLS_19) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    play: (item: MediaItem) => any;
    info: (item: MediaItem) => any;
    watchlist: (item: MediaItem) => any;
    retry: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPlay?: ((item: MediaItem) => any) | undefined;
    onInfo?: ((item: MediaItem) => any) | undefined;
    onWatchlist?: ((item: MediaItem) => any) | undefined;
    onRetry?: (() => any) | undefined;
}>, {
    error: string | null;
    loading: boolean;
    skeletonCount: number;
    count: number | null;
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
