/**
 * virtual-grid (R2.2) — pure windowing math for `MediaGrid.vue`.
 *
 * These helpers contain no DOM access so they can be unit-tested directly
 * (jsdom has no layout, so the component gates measurement and delegates the
 * arithmetic here). The component feeds them measured pixel values and renders
 * only the rows the window selects.
 */
/** Layout constants mirrored from `MediaGrid.vue`'s scoped CSS (px). */
export declare const COL_GAP = 20;
export declare const ROW_GAP = 24;
/** Poster is 2:3, so its height is the card width × this factor. */
export declare const POSTER_RATIO: number;
/** Title + meta block under the poster (px). */
export declare const LABEL_HEIGHT = 56;
/**
 * Number of auto-fit columns for a container width — mirrors CSS
 * `repeat(auto-fill, minmax(cardSize, 1fr))`, which packs
 * `floor((width + gap) / (cardSize + gap))` tracks. Always ≥ 1.
 */
export declare function computeColumns(containerWidth: number, cardSize: number, gap?: number): number;
/** Rendered width (px) of a single card once `columns` share the row. */
export declare function computeCardWidth(containerWidth: number, columns: number, gap?: number): number;
/**
 * Height (px) of one grid row including the row gap beneath it: poster (2:3) +
 * label block + row gap. Used to map scroll offset → row index.
 */
export declare function computeRowHeight(cardWidth: number, labelHeight?: number, rowGap?: number): number;
export interface WindowInput {
    /** How far the grid's top has scrolled above the viewport top (≥ 0). */
    scrollTop: number;
    /** Visible viewport height (px). */
    viewportHeight: number;
    /** Height of one row including its gap (px). */
    rowHeight: number;
    /** Columns per row (≥ 1). */
    columns: number;
    /** Total item count. */
    itemCount: number;
    /** Extra rows rendered above and below the visible band. */
    overscan: number;
}
export interface WindowResult {
    /** First rendered row (inclusive). */
    startRow: number;
    /** Last rendered row (exclusive). */
    endRow: number;
    /** First rendered item index (inclusive). */
    startIndex: number;
    /** Last rendered item index (exclusive). */
    endIndex: number;
    /** Total rows for the full item set. */
    rowCount: number;
    /** Spacer height above the rendered rows (px). */
    padTop: number;
    /** Full scrollable content height (px). */
    totalHeight: number;
}
/**
 * Select the slice of rows to render for the current scroll position. With a
 * fixed `rowHeight` this is O(1): only the rows intersecting the viewport (plus
 * `overscan` above/below) are returned, so the DOM never holds more than a
 * windowful regardless of `itemCount`.
 */
/**
 * The item count the grid should size itself to. When a server `total` is known
 * it wins (so the page is the FINAL length up front and the scrollbar is
 * accurate before every page has loaded); otherwise we fall back to the loaded
 * count. Never returns less than what's already loaded.
 */
export declare function effectiveItemCount(loadedCount: number, total?: number | null): number;
/**
 * Whether the grid should request the next page. True once the rendered window
 * reaches (or passes) the loaded edge — i.e. it wants items that haven't been
 * fetched yet — and no fetch is already in flight. Drives on-demand paging when
 * the grid is pre-sized to `total`, since the bottom sentinel then sits at the
 * full height and can't fire until the very end.
 */
export declare function shouldLoadMore(endIndex: number, loadedCount: number, state: {
    hasMore: boolean;
    loading: boolean;
    loadingMore: boolean;
}): boolean;
export declare function computeWindow(input: WindowInput): WindowResult;
