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
/**
 * Layout constants mirrored from `MediaGrid.vue`'s scoped CSS (px).
 *
 * These MUST be absolute px, not a token reference: the windowing math is pure
 * arithmetic that runs before (and without) layout — jsdom has no layout, SSR has
 * no CSSOM, and the first paint has no measured gap — so `computeWindow` needs a
 * number at module scope. There is no way to make it read `var(--space-6)`.
 *
 * That means the CSS side has to agree with THESE numbers rather than the other
 * way round (S69 review, finding 7). `--space-6`/`--space-5` are `1.5rem`/`1.25rem`,
 * so a viewer whose browser root font-size is not 16px used to get a real gap of
 * e.g. 30px/25px against an assumed 24/20 — a per-row error that ACCUMULATES
 * through `padTop`/`totalHeight` (≈1200px of drift over 200 rows at a 20px root)
 * and is worst for the fixed-height renderers, whose entire row height is
 * constants. `.media-grid` therefore now writes these same px literals instead of
 * the rem tokens, and `virtual-grid.test.ts` reads EVERY `.media-grid` gap
 * declaration in `src/` back (base rule, `@media` arms and `:deep()` overrides
 * alike) and asserts each one still equals these numbers, so the pair cannot drift
 * again.
 *
 * ⚠ THE DELIBERATE TRADE THIS MAKES (S69 review r2, finding 2b). Pinning px means
 * the grid gap no longer follows `--space-5`/`--space-6`, so:
 *   - it does NOT grow with a viewer's larger browser root font size, and
 *   - a host or theme that overrides `--space-5`/`--space-6` no longer changes it.
 * That reaches every `MediaGrid` mount — `LibraryPage`, `ExplorePage`,
 * `RecommendationsPage`, `SearchPage`, the `--skeleton` grid and every downstream
 * consumer of the public `MediaGrid` export. It is accepted rather than accidental:
 * the arithmetic already assumed 24/20 unconditionally, so the token form did not
 * really give a host a working override — it gave a gap the windowing math was
 * wrong about. The supported way to change the grid gap is now to change THESE
 * constants (the stylesheet-readback test then forces the CSS to move with them),
 * and the durable way to give the tokens back is to measure the gap once via
 * `getComputedStyle` at mount and feed the measurement into
 * `computeColumns`/`computeRowHeight`.
 *
 * The label block, which is the OTHER root-font-size input to `computeRowHeight`,
 * is handled the other way round — it stays rem-valued and is SCALED at runtime,
 * see {@link labelHeightForRootFontSize}.
 */
export declare const COL_GAP = 20;
export declare const ROW_GAP = 24;
/** Poster is 2:3, so its height is the card width × this factor. */
export declare const POSTER_RATIO: number;
/**
 * Title + meta block under the poster (px), at the default 16px root font size.
 *
 * DERIVED, not guessed — `MediaCard.vue`'s `.media-card__caption` block is exactly
 * two single-line rows and its vertical metrics are all tokens:
 *   - `.media-card__caption` `padding: var(--space-3) … 0`   → 0.75rem   = 12.0px
 *   - `.media-card__caption-title` `var(--text-base)` × `var(--leading-snug)`
 *                                                          → 0.9375rem × 1.3 = 19.5px
 *   - `.media-card__caption-sub` `var(--text-xs)` × inherited `var(--leading-normal)`
 *                                                          → 0.75rem × 1.55  = 18.6px
 *   - `.media-card__caption-sub` `margin-top: 2px`          → {@link LABEL_HEIGHT_FIXED_PX}
 * = 52.1px, so this constant carries ~4px of deliberate slack. Over-reserving is the
 * safe direction (a hair of extra room under the caption); UNDER-reserving is what
 * overlaps rows. `virtual-grid.test.ts` reads those caption rules back and fails if
 * any of the four inputs changes, so a restyle cannot silently invalidate the number.
 *
 * ⚠ Only {@link LABEL_HEIGHT_FIXED_PX} of this is real px — the rest is rem, so it
 * GROWS with the viewer's root font size. Do not consume this constant directly in
 * a rendered path; call {@link labelHeightForRootFontSize} (`MediaGrid` does).
 *
 * ⚠ THE ONE INPUT THIS ARITHMETIC CANNOT SEE (S69 review r3, LOW-3): a browser
 * MINIMUM FONT SIZE setting raises `--text-xs`/`--text-base` INDEPENDENTLY of the
 * root, so the caption is then taller than any function of the root font size can
 * predict. Measured with `minimumFontSize=12`: at a 12px root the real caption is
 * 45.19px against 42.5 reserved, i.e. −2.7px per row (≈540px of `padTop`/
 * `totalHeight` drift over 200 rows), in the UNSAFE direction. The class is
 * pre-existing and axis-independent — the flat 56 fails the same way at a 16px root
 * with `minimumFontSize=16` (real 56.6–59.6 vs 56) — and the bound is ≤ ~3px/row,
 * so it is recorded rather than compensated: padding the arithmetic to cover it
 * would trade this small under-reserve for a permanent over-reserve at every normal
 * setting. The real fix is the same one named above and in
 * {@link labelHeightForRootFontSize} — measure the rendered caption once at mount —
 * because a measurement sees the minimum-font-size floor and a derivation never can.
 */
export declare const LABEL_HEIGHT = 56;
/**
 * The px basis every rem-valued token above is quoted against — i.e. the browser
 * default root font size that {@link LABEL_HEIGHT} was derived at.
 */
export declare const REM_BASIS_PX = 16;
/**
 * The only part of {@link LABEL_HEIGHT} that is real px and therefore does NOT
 * scale with the root font size: `.media-card__caption-sub`'s `margin-top: 2px`.
 */
export declare const LABEL_HEIGHT_FIXED_PX = 2;
/**
 * {@link LABEL_HEIGHT} corrected for the viewer's actual root font size (S69 review
 * r2, finding 2a).
 *
 * The gap constants above solved their half of the root-font-size problem by pinning
 * px in the stylesheet. The label block cannot be solved that way: it is TEXT, and
 * pinning its height would clip a viewer's larger type while pinning its font sizes
 * would opt card captions out of font scaling altogether — a worse trade than a
 * spacing value. So the caption stays rem-valued and the MATH scales instead: the
 * rem-derived part moves with the root font size, the one px part does not.
 *
 * At the default 16px root this returns exactly `LABEL_HEIGHT`, so nothing about the
 * default rendering or the existing arithmetic changes. At a 20px root it returns
 * `54 × 1.25 + 2` = 69.5px instead of 56px, which is what stops the POSTER GRID (the
 * default view mode, and the one renderer whose row height is not caller-pinned)
 * under-reserving ~8px per row and accumulating that through
 * `padTop`/`totalHeight`.
 *
 * Non-finite / non-positive input (jsdom reports the root font size as `"medium"`,
 * SSR has no CSSOM at all) falls back to `LABEL_HEIGHT` unchanged.
 *
 * ⚠ BOUND OF THE MODEL, deliberately not compensated (S69 review r3, LOW-3): the
 * result over-reserves at every root size — measured 12→32px in Chrome, slack a
 * constant +7.5% (+2.9px at a 12px root, +7.8px at 32px), monotonic, never clipping —
 * EXCEPT under a browser minimum-font-size setting, which raises the caption's type
 * without touching the root and is therefore invisible to this function (−2.7px/row
 * at `minimumFontSize=12` + a 12px root). Do not "fix" that by inflating the
 * arithmetic: it converts a harmless over-reserve at every ordinary setting into
 * guaranteed slack nobody asked for, and the honest fix is to measure the caption at
 * mount instead — see {@link LABEL_HEIGHT}'s docblock for the full derivation and the
 * measured table.
 */
export declare function labelHeightForRootFontSize(rootFontSizePx?: number | null): number;
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
export declare const LIST_ROW_POSTER_WIDTH = 120;
/**
 * Height (px) of one `list` view mode row, EXCLUDING the row gap beneath it
 * (S68). A list row is exactly as tall as its fixed-width 2:3 poster, so the
 * ratio applies to `LIST_ROW_POSTER_WIDTH` — never to the full row width.
 * `MediaListRow.vue` writes this onto the DOM as an inline height read from this
 * same constant, so the rendered row and the windowing math cannot drift.
 */
export declare const LIST_ROW_HEIGHT: number;
/**
 * Width (px) of the `backdrop` view mode's poster column (S69). FIXED, exactly
 * like `LIST_ROW_POSTER_WIDTH` — a hero strip's poster does not grow with the row
 * width either; the WIDE part of the strip is the backdrop image behind it.
 *
 * 200px, i.e. the poster-grid `cardSize` default. Two things fall out of that
 * choice, and both are the reason it is not simply "bigger than the list row":
 *   - It re-does the `LIST_ROW_POSTER_WIDTH` arithmetic in the composed
 *     `MediaCard`'s favour instead of merely inheriting it. The overlay content
 *     box is `200 - 2 * var(--space-4)` = 168px, which the action row widens to
 *     184px via its `margin-inline: calc(-1 * var(--space-2))`. So
 *     `.media-card__actions`' `max-width: calc(4 * 32px + 3 * var(--space-1))` =
 *     140px DOES bind here (unlike at 120px), and the 8 quick-actions lay out as
 *     the designed 2 rows of 4: `2 * 32 + var(--space-2)` = 72px, +12px
 *     `margin-top` = 84px — comfortably inside the `300 - 2 * var(--space-4)` =
 *     268px of overlay content box. A hero strip still passes `hide-caption`
 *     (the strip body owns the title), so nothing competes for that room.
 *   - It matches `DEFAULT_POSTER_SIZES`' desktop hint (`200px`) exactly, so the
 *     composed card's responsive `srcset` picks the right candidate rather than
 *     over-fetching. `MediaBackdropRow` still passes `poster-sizes` explicitly
 *     so the two cannot drift.
 * As with the list row: this is stylesheet arithmetic, not a rendered
 * observation (jsdom has no layout and the visual suite is out of bounds) —
 * re-do the sums if `MediaCard.vue`'s overlay CSS changes.
 */
export declare const BACKDROP_ROW_POSTER_WIDTH = 200;
/**
 * Width (px) of the `backdrop` strip's poster column on a NARROW viewport (S69
 * review, finding 2) — below `MediaBackdropRow`'s 720px arm, which is the same
 * breakpoint the visual reference (`MediaDetail`'s hero) collapses at.
 *
 * At a 360px viewport the grid content box is 320px, so a 200px poster track left
 * the strip body `320 − 200 − gap − padding` ≈ 76px: the title ellipsised to a
 * 2-3 character stub and the overview was unreadable. Dropping the track to the
 * LIST row's width restores ≈168px of body.
 *
 * Deliberately `LIST_ROW_POSTER_WIDTH` rather than a third number: that width's
 * effect on the composed `MediaCard`'s hover overlay is already worked out above
 * (it needs `hide-caption`, which this renderer already passes), so the narrow
 * arm inherits a known-good poster width instead of inventing an unaudited one.
 * The strip HEIGHT does not change with it — see the note on
 * `BACKDROP_ROW_HEIGHT`: a viewport-dependent row height would desync the
 * windowing math, so the narrower poster simply renders 180px tall inside the
 * still-pinned 300px strip.
 */
export declare const BACKDROP_ROW_NARROW_POSTER_WIDTH = 120;
/**
 * Height (px) of one `backdrop` view mode hero strip, EXCLUDING the row gap
 * beneath it (S69). Derived from the FIXED poster width via the 2:3 ratio, so the
 * composed `MediaCard`'s poster fills the strip's full height and the strip never
 * scales with the viewport. `MediaBackdropRow.vue` writes this onto the DOM as an
 * inline height read from this same constant, and `LibraryPage` feeds
 * `computeFixedRowHeight(BACKDROP_ROW_HEIGHT)` to `MediaGrid`'s `rowHeight` prop,
 * so the rendered strip and the windowing arithmetic cannot drift.
 *
 * NOTE the ratio is applied to the POSTER WIDTH, never to the row width: a
 * `backdrop` row is one full-width column, so `computeRowHeight()` would reserve
 * ~2100px for a 300px strip. See `computeFixedRowHeight()` below.
 *
 * NOTE ALSO that this height is VIEWPORT-INDEPENDENT and must stay that way. The
 * narrow-viewport arm (`BACKDROP_ROW_NARROW_POSTER_WIDTH`) narrows the poster
 * COLUMN from CSS only; it deliberately does not derive a second height from that
 * width, because the height is what `MediaGrid`'s windowing math is fed. Any
 * renderer that genuinely needs a different height per breakpoint has to route it
 * through the `rowHeight` prop (so the math changes with it), never through CSS.
 */
export declare const BACKDROP_ROW_HEIGHT: number;
/**
 * Width (px) of the `table` view mode's poster column (S70).
 *
 * Deliberately `LIST_ROW_POSTER_WIDTH` rather than a fourth number, and — unlike
 * `BACKDROP_ROW_NARROW_POSTER_WIDTH`, which reuses it for room — reused here
 * because 120px is the audited FLOOR for a renderer that composes a full-action
 * `MediaCard`, and S70's row does. Read `LIST_ROW_POSTER_WIDTH`'s docblock: the
 * wrapped action rows need ≈124px of overlay content box, which only a ≥180px-tall
 * poster provides, and the overlay is `position: absolute; inset: 0` on
 * `.media-card__poster` (which is `overflow: hidden`) so it cannot spill out of a
 * shorter one.
 *
 * ⚠ THIS IS WHY THE TABLE ROW IS NOT SHORTER THAN THE LIST ROW, and the constraint
 * is real rather than conservative. At a 64px poster the same arithmetic wraps the
 * eight quick-actions into eight ~32px rows (≈312px) inside ~64px of content box:
 * `justify-content: flex-end` keeps the row pinned to the bottom, so the viewer
 * would see roughly the last two of eight actions and the rest would be clipped
 * away. A genuinely SHORTER compact row therefore cannot compose a full-action
 * card — it would need `MediaCard`'s ~90-line ⋯-menu dispatcher lifted out of
 * `MediaCard`/`MediaDetail` into a shared composable so the row could own a
 * compact actions cell. That refactor is out of S70's scope; until it happens the
 * table view's density comes from its COLUMNS (aligned tracks under a real header,
 * no overview paragraph), not from a shorter row.
 *
 * As with the other two: this is stylesheet arithmetic, not a rendered observation
 * (jsdom has no layout and the visual suite is out of bounds in this program), so
 * do not shrink it without redoing the sums in `LIST_ROW_POSTER_WIDTH`.
 */
export declare const TABLE_ROW_POSTER_WIDTH = 120;
/**
 * Height (px) of one `table` view mode row, EXCLUDING the row gap beneath it
 * (S70). Derived from the FIXED poster width via the 2:3 ratio exactly like
 * `LIST_ROW_HEIGHT`/`BACKDROP_ROW_HEIGHT` — never from the row width, which is one
 * full-width column and would reserve a row several times too tall.
 * `MediaTableRow.vue` writes this onto the DOM as an inline height read from this
 * same constant, and `LibraryPage` feeds `computeFixedRowHeight(TABLE_ROW_HEIGHT)`
 * to `MediaGrid`'s `rowHeight` prop, so the rendered row and the windowing
 * arithmetic cannot drift.
 */
export declare const TABLE_ROW_HEIGHT: number;
/** One column of the `table` view mode (S70). */
export interface TableColumn {
    /**
     * The column's header text — and, for the poster column, its VISUALLY HIDDEN
     * accessible name. Every `role="columnheader"` needs a name; an empty one is a
     * bare `role="columnheader"` that announces nothing.
     */
    readonly label: string;
    /** The column's CSS grid track. */
    readonly track: string;
}
/**
 * The `table` view's columns, in DOM order — the SINGLE source for both the header
 * row (`LibraryPage.vue`, rendered OUTSIDE the grid) and the body rows
 * (`MediaTableRow.vue`, rendered one per `#card` slot invocation).
 *
 * They have to share one definition because they are two SEPARATE grids: the
 * `#card` slot yields one detached cell per item inside `MediaGrid`'s
 * `display: grid` container, so the header physically cannot be a sibling row of
 * the body rows and can only be kept in alignment by writing the identical
 * `grid-template-columns` in both places. `MediaTableRow.test.ts` asserts the row
 * renders exactly `TABLE_COLUMNS.length` cells, so adding a column here without
 * adding its cell to the row (which would silently shear every row against the
 * header) fails.
 */
export declare const TABLE_COLUMNS: readonly TableColumn[];
/**
 * `grid-template-columns` for BOTH the table header row and every table body row,
 * DERIVED from {@link TABLE_COLUMNS} so the two can never be edited apart.
 *
 * Written as an inline style in both places, like the other renderers' geometry:
 * `MediaGrid` writes an INLINE `grid-template-columns` on `.media-grid` itself, so
 * a stylesheet rule for the row's own tracks would sit in the same specificity
 * conversation as that inline style — and, for the header, the two would then be
 * two independent declarations that drift.
 */
export declare const TABLE_ROW_TEMPLATE_COLUMNS: string;
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
 *
 * `labelHeight` defaults to {@link LABEL_HEIGHT}, which is only correct at a 16px
 * root font size — a rendered caller should pass
 * `labelHeightForRootFontSize(<measured root font size>)` instead (`MediaGrid`
 * does). The default is kept so pure unit tests and any non-DOM caller stay on the
 * documented 16px-root arithmetic.
 */
export declare function computeRowHeight(cardWidth: number, labelHeight?: number, rowGap?: number): number;
/**
 * Row height (px) for a renderer whose rows are a FIXED height — the row's own
 * content height plus the row gap beneath it. Feed the result to `MediaGrid`'s
 * `rowHeight` prop.
 *
 * `computeRowHeight()` above derives its height from the CARD WIDTH because a
 * poster grid's 2:3 posters grow with the column width. A list row (S68) or a
 * backdrop hero strip (S69) is not a poster: its height is intrinsic, and applying
 * `POSTER_RATIO` to the full row width would compute a row several times too
 * tall — which, once virtualization is on, mis-computes
 * `startIndex`/`endIndex`/`padTop`/`totalHeight` (blank bands, mis-positioned rows
 * and wrong `need-range` pages). Parameterizing the
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
export declare function computeFixedRowHeight(contentHeight: number): number;
/**
 * Exact inverse of `computeFixedRowHeight()`: the CELL height inside a pinned
 * row, i.e. the row height minus the gap beneath it. `MediaGrid` uses this for
 * BOTH its `grid-auto-rows` track height and its not-yet-loaded placeholder
 * cells, so no consumer re-derives the gap and the two cannot drift.
 */
export declare function fixedRowContentHeight(rowHeight: number): number;
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
