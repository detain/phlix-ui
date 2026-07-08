/**
 * virtual-grid (R2.2) — pure windowing math for `MediaGrid.vue`.
 *
 * These helpers contain no DOM access so they can be unit-tested directly
 * (jsdom has no layout, so the component gates measurement and delegates the
 * arithmetic here). The component feeds them measured pixel values and renders
 * only the rows the window selects.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/** Layout constants mirrored from `MediaGrid.vue`'s scoped CSS (px). */
export const COL_GAP = 20; // var(--space-5)
export const ROW_GAP = 24; // var(--space-6)
/** Poster is 2:3, so its height is the card width × this factor. */
export const POSTER_RATIO = 3 / 2;
/** Title + meta block under the poster (px). */
export const LABEL_HEIGHT = 56;

/**
 * Number of auto-fit columns for a container width — mirrors CSS
 * `repeat(auto-fill, minmax(cardSize, 1fr))`, which packs
 * `floor((width + gap) / (cardSize + gap))` tracks. Always ≥ 1.
 */
export function computeColumns(containerWidth: number, cardSize: number, gap = COL_GAP): number {
  if (containerWidth <= 0 || cardSize <= 0) return 1;
  return Math.max(1, Math.floor((containerWidth + gap) / (cardSize + gap)));
}

/** Rendered width (px) of a single card once `columns` share the row. */
export function computeCardWidth(containerWidth: number, columns: number, gap = COL_GAP): number {
  if (columns <= 0 || containerWidth <= 0) return 0;
  return (containerWidth - gap * (columns - 1)) / columns;
}

/**
 * Height (px) of one grid row including the row gap beneath it: poster (2:3) +
 * label block + row gap. Used to map scroll offset → row index.
 */
export function computeRowHeight(
  cardWidth: number,
  labelHeight = LABEL_HEIGHT,
  rowGap = ROW_GAP,
): number {
  if (cardWidth <= 0) return 0;
  return cardWidth * POSTER_RATIO + labelHeight + rowGap;
}

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
export function effectiveItemCount(loadedCount: number, total?: number | null): number {
  if (typeof total !== 'number' || !Number.isFinite(total)) return loadedCount;
  return Math.max(loadedCount, Math.trunc(total));
}

/**
 * Whether the grid should request the next page. True once the rendered window
 * reaches (or passes) the loaded edge — i.e. it wants items that haven't been
 * fetched yet — and no fetch is already in flight. Drives on-demand paging when
 * the grid is pre-sized to `total`, since the bottom sentinel then sits at the
 * full height and can't fire until the very end.
 */
export function shouldLoadMore(
  endIndex: number,
  loadedCount: number,
  state: { hasMore: boolean; loading: boolean; loadingMore: boolean },
): boolean {
  return state.hasMore && !state.loading && !state.loadingMore && endIndex >= loadedCount;
}

export function computeWindow(input: WindowInput): WindowResult {
  const { scrollTop, viewportHeight, rowHeight, columns, itemCount, overscan } = input;
  const cols = Math.max(1, columns);
  const rowCount = Math.ceil(itemCount / cols);
  const totalHeight = rowCount * rowHeight;

  if (rowCount === 0 || rowHeight <= 0) {
    return {
      startRow: 0,
      endRow: rowCount,
      startIndex: 0,
      endIndex: itemCount,
      rowCount,
      padTop: 0,
      totalHeight,
    };
  }

  const firstVisible = Math.floor(Math.max(0, scrollTop) / rowHeight);
  const visibleRows = Math.ceil(Math.max(0, viewportHeight) / rowHeight) + 1;
  const startRow = Math.max(0, firstVisible - overscan);
  const endRow = Math.min(rowCount, firstVisible + visibleRows + overscan);

  return {
    startRow,
    endRow,
    startIndex: startRow * cols,
    endIndex: Math.min(itemCount, endRow * cols),
    rowCount,
    padTop: startRow * rowHeight,
    totalHeight,
  };
}
