/**
 * virtual-grid (R2.2) — pure windowing math for `MediaGrid.vue`.
 *
 * These helpers contain no DOM access so they can be unit-tested directly
 * (jsdom has no layout, so the component gates measurement and delegates the
 * arithmetic here). The component feeds them measured pixel values and renders
 * only the rows the window selects.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/** Layout constants mirrored from `MediaGrid.vue`'s scoped CSS (px). */
export const COL_GAP = 20; // var(--space-5)
export const ROW_GAP = 24; // var(--space-6)
/** Poster is 2:3, so its height is the card width × this factor. */
export const POSTER_RATIO = 3 / 2;
/** Title + meta block under the poster (px). */
export const LABEL_HEIGHT = 56;

/**
 * Width (px) of the `list` view mode's poster column (S68). FIXED — unlike the
 * poster grid, a list row's thumbnail does not grow with the row width.
 *
 * What 120px actually does to the composed `MediaCard`'s hover overlay. This is
 * arithmetic against `MediaCard.vue`'s stylesheet, not a rendered observation
 * (jsdom has no layout and the visual suite is out of bounds here) — re-do the
 * sums if either stylesheet changes:
 *   - The overlay's content box is `120 - 2 * var(--space-4)` = 88px, which the
 *     action row alone widens to 104px via its `margin-inline: -8px`.
 *   - `.media-card__actions`' `max-width: calc(4 * 32px + 3 * var(--space-1))` =
 *     140px therefore NEVER binds at this width, so the 8 quick-actions do NOT
 *     lay out as the "2 rows of 4" that cap was written for: they pack 2-3 per
 *     row and wrap to 3 rows = `3 * 32 + 2 * 8` = 112px, +12px `margin-top` =
 *     ~124px.
 *   - ~124px fits the `180 - 2 * var(--space-4)` = 148px of overlay content box,
 *     but ONLY because a list row also passes `hide-caption`, which suppresses
 *     the overlay's title + meta + genre chips (~124px more at this width). With
 *     that block present the overlay wants ~248px and, being
 *     `justify-content: flex-end`, overflows the TOP — where
 *     `.media-card__poster { overflow: hidden }` slices it mid-glyph. (The
 *     buttons themselves survive: they are the last flex child.)
 * So for any new fixed-thumbnail renderer (S69/S70): pass `hide-caption`, and do
 * not shrink this below ~120px without redoing the sums above — the WRAPPED
 * action rows set the floor, not the (inert here) 4-per-row cap.
 */
export const LIST_ROW_POSTER_WIDTH = 120;

/**
 * Height (px) of one `list` view mode row, EXCLUDING the row gap beneath it
 * (S68). A list row is exactly as tall as its fixed-width 2:3 poster, so the
 * ratio applies to `LIST_ROW_POSTER_WIDTH` — never to the full row width.
 * `MediaListRow.vue` writes this onto the DOM as an inline height read from this
 * same constant, so the rendered row and the windowing math cannot drift.
 */
export const LIST_ROW_HEIGHT = LIST_ROW_POSTER_WIDTH * POSTER_RATIO;

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

/**
 * Row height (px) for a renderer whose rows are a FIXED height — the row's own
 * content height plus the row gap beneath it. Feed the result to `MediaGrid`'s
 * `rowHeight` prop.
 *
 * `computeRowHeight()` above derives its height from the CARD WIDTH because a
 * poster grid's 2:3 posters grow with the column width. A list row (S68) is not
 * a poster: its height is intrinsic, and applying `POSTER_RATIO` to the full row
 * width would compute a row several times too tall — which, once virtualization
 * is on, mis-computes `startIndex`/`endIndex`/`padTop`/`totalHeight` (blank
 * bands, mis-positioned rows and wrong `need-range` pages). Parameterizing the
 * height here is the sanctioned way to keep the rendered layout and the
 * windowing math on the same numbers; a CSS override is not (`MediaGrid` writes
 * an INLINE `grid-template-columns` from the same `columns` value it windows on).
 *
 * The row gap is deliberately NOT a parameter: `.media-grid`'s CSS gap is fixed
 * at `var(--space-6)` (mirrored by `ROW_GAP` above) and `MediaGrid` has to
 * SUBTRACT that same value again to size its row tracks and placeholder cells
 * (`fixedRowContentHeight()` below). A caller-supplied gap could therefore only
 * ever disagree with the CSS — it would return a plausible `rowHeight` with
 * mis-sized cells. One gap constant, added in one place and removed in one place.
 */
export function computeFixedRowHeight(contentHeight: number): number {
  if (contentHeight <= 0) return 0;
  return contentHeight + ROW_GAP;
}

/**
 * Exact inverse of `computeFixedRowHeight()`: the CELL height inside a pinned
 * row, i.e. the row height minus the gap beneath it. `MediaGrid` uses this for
 * BOTH its `grid-auto-rows` track height and its not-yet-loaded placeholder
 * cells, so no consumer re-derives the gap and the two cannot drift.
 */
export function fixedRowContentHeight(rowHeight: number): number {
  return Math.max(0, rowHeight - ROW_GAP);
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
