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
     * Hint to the browser about the relative loading priority of this poster
     * (maps directly to the HTML `fetchpriority` attribute). `high` is
     * appropriate for above-the-fold or first-row posters to improve LCP.
     */
    fetchPriority?: 'high' | 'low' | 'auto';
    /**
     * Admin opt-in (U5): render a "Match" quick-action that emits `match` so the
     * host can open the interactive metadata-match modal for this item. Off by
     * default; the host gates it on `isAdmin`. Keeps the card layout intact.
     */
    canMatch?: boolean;
    /**
     * Suppress the hover action row (Play/Watched/Favorite/Rating/Info/Menu).
     * Used when the card is purely navigational — e.g. the season grid on the
     * series page, where per-item favorite/rating/watched don't apply and the
     * card just links to the season. The poster, badges, hover-lift, title
     * overlay and caption are unchanged, so it stays visually the library card.
     */
    hideActions?: boolean;
    /**
     * Render ONLY the Play quick-action in the hover row (no rating/favorite/
     * watched/info/menu). Used by the season grid on the series page: the card
     * stays purely navigational (poster → season page) but gains a Play button
     * that starts whole-season playback via the `play` emit. Ignored when
     * `hideActions` is set (that suppresses the row entirely).
     */
    playOnly?: boolean;
    /**
     * Override the caption sub-line (defaults to year · runtime). Used by the
     * season grid to show "N episodes" while reusing this exact card design.
     */
    subtitle?: string | null;
    /**
     * Apply the native `loading="lazy"` attribute to the poster `<img>`.
     * Default `true` — every standalone/rail host keeps native lazy-loading.
     * `MediaGrid` passes `false` (S35): its JS virtualization already guarantees
     * only near-viewport cards exist in the DOM, so native lazy-load is redundant
     * there and layering it over cards repositioned via `transform` in the same
     * reactive flush is a known browser-timing stall trigger.
     */
    lazy?: boolean;
};
declare var __VLS_12: {
    item: import("../types/media-item").MediaDetail;
}, __VLS_97: {
    item: import("../types/media-item").MediaDetail;
};
type __VLS_Slots = {} & {
    badges?: (props: typeof __VLS_12) => any;
} & {
    actions?: (props: typeof __VLS_97) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: import("../types/media-item").MediaDetail) => any;
    play: (item: import("../types/media-item").MediaDetail) => any;
    info: (item: import("../types/media-item").MediaDetail) => any;
    refresh: (item: import("../types/media-item").MediaDetail) => any;
    watchlist: (item: import("../types/media-item").MediaDetail) => any;
    remove: (item: import("../types/media-item").MediaDetail) => any;
    "mark-watched": (item: import("../types/media-item").MediaDetail) => any;
    "choose-poster": (item: import("../types/media-item").MediaDetail) => any;
    "edit-metadata": (item: import("../types/media-item").MediaDetail) => any;
    "explore-data": (item: import("../types/media-item").MediaDetail) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onPlay?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onInfo?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRefresh?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onWatchlist?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRemove?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onMark-watched"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onChoose-poster"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onEdit-metadata"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onExplore-data"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
}>, {
    subtitle: string | null;
    newWithinDays: number;
    canMatch: boolean;
    hideActions: boolean;
    playOnly: boolean;
    lazy: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
