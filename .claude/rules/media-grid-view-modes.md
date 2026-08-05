---
description: How to add or change a per-viewMode row renderer for the virtualized MediaGrid (S68 list / S69 backdrop / S70 table seam).
paths:
  - src/components/MediaGrid.vue
  - src/components/MediaListRow.vue
  - src/components/MediaBackdropRow.vue
  - src/components/MediaTableRow.vue
  - src/components/virtual-grid.ts
  - src/pages/LibraryPage.vue
---

# `MediaGrid` view-mode renderers

- `usePreferencesStore.viewMode` (`ViewMode` = `'grid' | 'list' | 'backdrop' | 'table'`, default
  `'grid'`) is the single source of truth; the `FilterBar` toggle writes it.
- A view mode is rendered by filling `MediaGrid`'s `#card` slot from `src/pages/LibraryPage.vue`.
  ALL FOUR modes now render: `src/components/MediaListRow.vue` is the `'list'` renderer,
  `src/components/MediaBackdropRow.vue` the `'backdrop'` one and
  `src/components/MediaTableRow.vue` the `'table'` one (S70, shipped 2026-08-05 in
  `a50fa37e` + follow-ups `424c3c3b`, released v0.98.36). The `#card` chain in
  `LibraryPage.vue` is four arms: `v-if="listMode"` → `v-else-if="backdropMode"` →
  `v-else-if="tableMode"` → the unconditional `MediaCard v-else`. `tableMode` is
  `prefs.viewMode === 'table'` (`LibraryPage.vue:85`); strict `===`, never `.includes()`, or a
  mutated mode string still selects the renderer and reports a false green (S191/S193).
- Change layout via the `columns` / `rowHeight` props only, through the `gridColumns` /
  `gridRowHeight` computeds in `LibraryPage.vue` (`undefined` in poster-grid mode). They feed BOTH
  the inline `grid-template-columns` and the windowing arithmetic, so layout and virtualization
  stay on the same numbers; a CSS `grid-template-columns` override desyncs them.
- EVERY alternate mode is virtualized, table included: `LibraryPage.vue` passes
  `columns: 1` (`FULL_WIDTH_COLUMNS`, `:117`) plus `computeFixedRowHeight(TABLE_ROW_HEIGHT)`
  (`:120`, `:126-134`). There is no non-virtualized fallback for any mode.
- Row geometry + windowing math are pure exports in `src/components/virtual-grid.ts`
  (`LIST_ROW_POSTER_WIDTH`, `LIST_ROW_HEIGHT`, `BACKDROP_ROW_POSTER_WIDTH`, `BACKDROP_ROW_HEIGHT`,
  `TABLE_ROW_POSTER_WIDTH`, `TABLE_ROW_HEIGHT`, `TABLE_COLUMNS`, `TABLE_ROW_TEMPLATE_COLUMNS`,
  `computeFixedRowHeight`, `fixedRowContentHeight`).
  Add new math there as a pure function with its own test — jsdom has no layout.
  Pin new constants with LITERALS: a test that derives its expectation from the constant under
  test self-adjusts and cannot see that constant change (S70 found `TABLE_ROW_HEIGHT` mutating
  to only 1 red; literals took it to 7).
- Filling `#card` moves event wiring to the host: every branch must re-emit the same ten host events
  `MediaGrid` wires for its own default card, or a button is silently dead.
- Keep the final grid branch an unconditional `v-else`, never another `v-else-if`: an all-false
  chain yields only a comment vnode, which Vue's `renderSlot` treats as EMPTY and falls back to
  `MediaGrid`'s default card — items still render, so the bug hides.
- COMPOSE `MediaCard` for the poster column (pass `hide-caption`, so the item has exactly ONE
  heading — the card's overlay title is only `opacity: 0`, which does not leave the a11y tree —
  plus `role="presentation"`, so the composed card's root `<article>` does not nest a second,
  unnamed item boundary inside the row's own one — a named `<article>` for `MediaListRow`/
  `MediaBackdropRow`, the `role="row"` itself for `MediaTableRow`, where the row role REPLACES
  the article rather than nesting inside it).
  Never copy its ~90-line ⋯-menu dispatcher: it already exists verbatim in `MediaCard` AND
  `MediaDetail`, so a third copy is a defect.
- `MediaBackdropRow` paints from the LIST shape's `backdrop_url` (`/w780`) + `backdrop_srcset`
  (`w780` + `w1280`), with a poster-derived fallback when both are `null` (the seven
  backdrop-less types, unmatched titles, older servers). Both states are live traffic and pinned
  by `LibraryPage.test.ts` — don't "fix" the renderer by deleting a branch, and never reach for
  the detail-only `/original` `backdrop_url_large` from a per-row renderer.
- The `'table'` view is NOT a semantic `<table>`, and cannot be. The `#card` slot yields ONE
  DETACHED CELL per item inside `MediaGrid`'s `display: grid` container, and only a virtualized
  WINDOW of those cells exists at a time, so nothing can open a `<tbody>` before the first row and
  close it after the last. The semantics are therefore roles on divs: `role="table"` on
  `LibraryPage`'s `.library-table` wrapper (`:520-525`), `role="rowgroup"` on the header block
  (`:530`) and on `.media-grid`, `role="row"` on `MediaTableRow`'s root (`:163`) and `role="cell"`
  on its children.
- That ownership is what `MediaGrid`'s `gridRole` prop exists for (`MediaGrid.vue:120`) — it is the
  component's ONLY ARIA-role prop, added by S70. ARIA's `table` must own its rows, but the DOM chain
  is `.media-grid-root` > `.media-grid-sizer` > `.media-grid` > the slot cell and a plain `<div>`
  maps to `generic` rather than disappearing, so a host's `role="table"` ends up two generic boxes
  away from its rows. Setting `gridRole="rowgroup"` marks both intermediate boxes
  `role="presentation"` (`wrapperRole`, `:462`) and puts the role on `.media-grid` itself. `aria-owns`
  is deliberately NOT used: the cell set remounts on every scroll tick, so the id list would need
  rewriting continuously. Absent, the prop emits no attribute anywhere — grid/list/backdrop render
  byte-identically to before.
- Assert the table roles only while there are ROWS. `LibraryPage`'s `tableSemantics` (`:97`) is
  `tableMode && store.items.length > 0`, because with nothing loaded `MediaGrid` renders its skeleton
  or empty state (both `role="status"`) and a `table` owning a status and no rows is invalid. The
  LAYOUT props are deliberately NOT gated the same way — the skeletons must already be row-sized or
  the first paint shifts.
- The header row is rendered OUTSIDE `<MediaGrid>` (`LibraryPage.vue:530-541`): inside, a
  `translateY`-offset virtualized container would scroll it away and consume a row slot. Header and
  body are therefore TWO SEPARATE CSS grids, and the only thing keeping their columns aligned is that
  both write the one `TABLE_ROW_TEMPLATE_COLUMNS` string (`virtual-grid.ts:344`), itself DERIVED from
  `TABLE_COLUMNS` (`:318-332`). Never let either side write its own track list. `MediaTableRow.test.ts`
  pins the cell count at `TABLE_COLUMNS.length` AND at the literal `6`, so adding a column without
  adding its cell goes red instead of silently shearing every row.
- Row indices are PUBLISHED, not counted. A virtualized rowgroup holds only a window, so AT would
  otherwise announce "row 3 of 7" in a 4,000-title library. `LibraryPage` passes the slot's ABSOLUTE
  `index` to `MediaTableRow`, which emits `aria-rowindex = index + 2` (`MediaTableRow.vue:133`; the
  header is row 1), and the wrapper carries `aria-rowcount = total + 1` (`:100`).
- ⚠ `TABLE_ROW_HEIGHT === LIST_ROW_HEIGHT` (both 180) is DELIBERATE, not copy-paste — they are
  literally the same arithmetic on the same constant (`TABLE_ROW_POSTER_WIDTH = LIST_ROW_POSTER_WIDTH`,
  `virtual-grid.ts:278`). Composing a full-action `MediaCard` pins a 120px poster FLOOR: the hover/focus
  overlay is `position: absolute; inset: 0` inside an `overflow: hidden` `.media-card__poster`, and the
  wrapped action rows need ≈124px of content box, which only a ≥180px-tall poster provides (at 64px the
  eight quick-actions wrap to ≈312px and `justify-content: flex-end` clips all but the last two). This
  view's density comes from its COLUMNS — aligned tracks under a real header, no overview paragraph —
  not from a shorter row. A genuinely shorter compact row would first need `MediaCard`'s ⋯-menu
  dispatcher lifted into a shared composable. Do not "optimise" the constant down.
- ⚠ Because of that equality, list↔table is the ONE transition that moves `MediaGrid`'s sizer WITHOUT
  resizing it: `columns` (1) and `rowHeight` (204) are identical across the flip, `totalHeight` and the
  sizer's box are byte-identical and the element does not remount, so the ResizeObserver never fires —
  yet the header row has just appeared above it. The cached `sizerTop` goes stale by the header height
  and an A-Z rail jump lands ~25px off. Fixed by a watcher keyed on `gridRole` ALONE
  (`MediaGrid.vue:607-610`) — the only prop by which a host announces it restructured around us. Do NOT
  re-key it to `[columns, rowHeight]`; those always change the sizer's height with them, and the
  mutation that re-keys it leaves the two proof tests red.
- ⚠ The `Cert` column renders `item.rating`, which is the CONTENT/PARENTAL certificate
  (`'G'|'PG'|'PG-13'|…|'TV-MA'`, `MediaTableRow.vue:221-224`), NOT a score. It was headed "Rating"
  until the S70 follow-up renamed it: `src/types/media-item.ts` warns twice (`:65-70`, `:270-280`)
  never to conflate `rating` with the per-user 1-10 `user_data.rating`, and a header reading "Rating"
  over `PG-13` invites exactly that. `Cert` is what the rest of the codebase already calls it
  (`.media-card__cert`, `.media-list-row__cert`, `.media-backdrop-row__cert`, `.media-table-row__cert`).
  Do not "restore" the old label.
- ⚠ KNOWN, REVIEWED AND ACCEPTED ARIA wart — do not re-litigate it as a new discovery. Because
  `.media-grid-root` is `role="presentation"` in table mode, `MediaGrid`'s `loadingMore`
  `role="status"` box and its back-to-top `<button>` re-parent onto the `role="table"`, so a validator
  (e.g. an axe `aria-required-children` rule) can flag a non-`row`/`rowgroup` child. It is a validator
  violation, not an AT breakage: nothing becomes unreachable, a live region announces regardless of
  ancestry, and row navigation does not depend on DOM child counting because `aria-rowindex`/
  `aria-rowcount` are published explicitly. The PERMANENT case (no items) is gated by `tableSemantics`.
  Caveat recorded by the reviewer: the back-to-top button is only "transient" in the sense that it needs
  >1.5 viewports of scroll — it can be present for most of a long browsing session. The correct fix is
  `MediaGrid` owning its own `role="table"` box around just the sizer plus a header slot; that is a
  breaking change to a public exported component and was correctly out of S70's scope. If the a11y
  suite is ever pointed at a SCROLLED table view, expect this to be the failure and treat it as the
  trigger for that refactor.
- Do NOT re-export renderers from `src/index.ts`. They are `LibraryPage` internals that only make
  sense inside a `MediaGrid` whose `columns`/`rowHeight` match them (`MediaTableRow` included — see
  the note at `src/index.ts:126-127`).
