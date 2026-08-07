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
     * Suppress the title/meta this card would print for a host that already
     * renders them itself: BOTH the caption block under the poster (title +
     * sub-line) AND the hover overlay's title / year·cert·runtime / genre chips.
     * The poster, badges, resume bar, stretched link and the overlay's ACTION
     * row are untouched.
     *
     * Used by `MediaListRow` (S68), which composes this card as its poster column
     * and owns the title/meta in the row body. The overlay half matters for more
     * than tidiness: the overlay is hidden only by `opacity: 0` +
     * `pointer-events: none`, and NEITHER removes content from the accessibility
     * tree — so leaving it in place emitted a second `<h3>` (plus a duplicate
     * meta strip) per row, and a screen-reader user navigating a 200-item list by
     * heading heard every title twice. Dropping it also frees the whole overlay
     * content box for the wrapped action rows at a narrow fixed poster width (see
     * `LIST_ROW_POSTER_WIDTH` in `virtual-grid.ts` for that arithmetic).
     * Sibling of `hideActions`/`playOnly`.
     */
    hideCaption?: boolean;
    /**
     * Apply the native `loading="lazy"` attribute to the poster `<img>`.
     * Default `true` — and as of S223 **no host in this repo overrides it**.
     *
     * S35 introduced this prop so `MediaGrid` could pass `false`, on the stated
     * rationale that "native lazy-load over cards repositioned via `transform` in
     * the same reactive flush is a known browser-timing stall trigger". S35's own
     * acceptance criterion required a live-browser Network/Performance repro before
     * that shipped; only a jsdom repro was ever run, and **jsdom ignores the
     * `loading` attribute entirely**, so the claim was never observed.
     *
     * S223 ran the capture (headless chromium 1280x800 over the real `LibraryPage`,
     * `src/dev/visual/library-lazy.ts`; 400-item catalogue, distinct poster URLs, a
     * 250 ms-throttled image origin, a continuous 60 px/frame scroll to y=8000).
     * The timeline blames the `loading` attribute for **nothing**, and the opt-out
     * measurably COSTS requests. First-paint poster requests, `:lazy="false"` vs
     * the native default, 4 runs each, zero variance:
     *
     *   list view      24 → 7    table view     24 → 7
     *   backdrop view  48 → 12   grid view      25 → 25
     *
     * The cause is `MediaGrid.vue`'s own non-virtualized first render (`virtualized`
     * is `containerWidth > 0 && effectiveRowHeight > 0`, so it is FALSE until the
     * ResizeObserver fires, and `visibleItems` then returns EVERY loaded item). With
     * the native attribute the browser skips the off-screen ones; without it every
     * poster of the first page is fetched. Grid view ties only because 25 poster
     * cells still fall inside Chrome's lazy-load distance threshold.
     *
     * Against that cost there was no measured benefit: over 134 sampled animation
     * frames per run the count of in-viewport-but-unpainted posters was
     * indistinguishable (grid 5 vs 4 frames, list 63±1 vs 63±1, table 62±1 vs 62±1,
     * backdrop 23 vs 26; worst-case blank count identical in every view), and the
     * post-scroll request total was identical (48/24/24/48) — native lazy DEFERS
     * work, it never drops work that is needed.
     *
     * The prop is kept because it is part of a published component's API, but
     * setting it `false` needs a fresh measurement, not this history.
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
    hideCaption: boolean;
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
