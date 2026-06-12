import type { MediaItem, PosterSrcsetInput } from '../types/media-item';
type __VLS_Props = {
    item: MediaItem;
    /** Primary link target for the poster (default: the player route). */
    to?: string;
    /** Optional quality tag rendered as a badge, e.g. "4K · HDR" (not on MediaItem). */
    quality?: string;
    /** Days within which a freshly-added item shows the NEW badge. */
    newWithinDays?: number;
    /**
     * Opt-in responsive poster sources for `srcset` (R6.2b) — a ready-made
     * `srcset` string or an array of sized candidates. Overrides the item's own
     * `poster_srcset`; absent → the card uses the single `poster_url`.
     */
    posterSrcset?: PosterSrcsetInput;
    /**
     * `sizes` hint paired with a width-descriptor `srcset`. Defaults to the
     * poster's rendered width when omitted; ignored without responsive sources.
     */
    posterSizes?: string;
    /**
     * Admin opt-in (U5): render a "Match" quick-action that emits `match` so the
     * host can open the interactive metadata-match modal for this item. Off by
     * default; the host gates it on `isAdmin`. Keeps the card layout intact.
     */
    canMatch?: boolean;
};
declare var __VLS_6: {
    item: MediaItem;
}, __VLS_28: {
    item: MediaItem;
};
type __VLS_Slots = {} & {
    badges?: (props: typeof __VLS_6) => any;
} & {
    actions?: (props: typeof __VLS_28) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: MediaItem) => any;
    play: (item: MediaItem) => any;
    info: (item: MediaItem) => any;
    watchlist: (item: MediaItem) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: MediaItem) => any) | undefined;
    onPlay?: ((item: MediaItem) => any) | undefined;
    onInfo?: ((item: MediaItem) => any) | undefined;
    onWatchlist?: ((item: MediaItem) => any) | undefined;
}>, {
    newWithinDays: number;
    canMatch: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
