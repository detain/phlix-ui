<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MediaTableRow (S70) — the `table` view-mode renderer for the library surface: one
 * ARIA table ROW per item, with the poster, title, year, certificate, runtime and
 * genres in the aligned columns declared once in `TABLE_COLUMNS`.
 *
 * WHY THIS IS ARIA-ON-DIVS AND NOT A REAL `<table>` (settle this before changing
 * the shape). `MediaGrid`'s `#card` slot renders ONE DETACHED CELL PER ITEM inside a
 * `display: grid` container, and the grid is virtualized — only the window of rows
 * intersecting the viewport is in the DOM at all, offset by a `translateY` spacer
 * inside a full-height sizer. There is no point in that chain at which a component
 * could emit `<table><thead>…</thead><tbody><tr>…` : the slot is invoked per item,
 * it has no way to open a `<tbody>` before the first row and close it after the
 * last, and `<tr>` outside a table ancestor is re-parented by the HTML parser
 * anyway. So the semantics are carried by roles on divs — `role="table"` (the
 * wrapper in `LibraryPage`), `role="rowgroup"` (the header block there, and
 * `.media-grid` itself via `MediaGrid`'s `grid-role` prop), `role="row"` (this
 * component) and `role="cell"` (its children). If a later step genuinely needs real
 * `<table>` elements, `#card` is the WRONG SEAM and the whole view has to move out
 * of `MediaGrid` — do not try to force it from here.
 *
 * VIRTUALIZATION IS WHY THE ROW INDEX IS EXPLICIT. A virtualized rowgroup only ever
 * holds a windowful, so assistive tech left to count DOM children would announce
 * "row 3 of 7" in a 4,000-title library. The `index` prop is the item's ABSOLUTE
 * index from the slot, and this row publishes `aria-rowindex = index + 2` (the
 * header row is 1); `LibraryPage` publishes the matching `aria-rowcount` on the
 * table. That is the concrete form of the grid-level fix `MediaListRow`'s docblock
 * deferred ("item 12 of 200") — done here as `aria-rowindex` rather than
 * `aria-posinset`/`aria-setsize` because inside a `table` the row index IS the
 * position, and it needs no `role="list"` on the shared `.media-grid` (which would
 * be invalid for the poster grid's `<article>` cells).
 *
 * Composed, NOT re-implemented — same as S68/S69. The poster column is a real
 * `MediaCard` (with `hideCaption`, since the row body owns the title, and
 * `role="presentation"`, so the card's own `<article>` does not nest a second,
 * unnamed item boundary inside this row), so the row inherits the blur-up poster
 * and its `srcset`, the NEW/quality badges, the resume-progress bar, the stretched
 * navigation link, and the FULL hover/focus action overlay — Play, thumbs rating,
 * favorite, watched, More info, the ⋯ menu and the admin Match action. That ⋯
 * dispatcher is ~90 lines that already exist verbatim in TWO places (`MediaCard`
 * and `MediaDetail`); composing the card is what keeps this renderer from being a
 * third copy. It is also why every one of `MediaCard`'s ten host events is
 * re-emitted below: the moment a host fills `MediaGrid`'s `#card` slot, MediaGrid's
 * own default wiring is bypassed, so a dropped event here is a button that silently
 * does nothing.
 *
 * ⚠ WHY A "COMPACT" ROW IS NOT SHORTER THAN THE LIST ROW. Composing a full-action
 * card pins the floor: the overlay lives inside `.media-card__poster`, which is
 * `overflow: hidden`, and the wrapped action rows need ≈124px of its content box —
 * see the measured arithmetic in `TABLE_ROW_POSTER_WIDTH`. This view's density is
 * therefore COLUMNAR (aligned tracks under a real header, and no four-line overview
 * paragraph), not vertical. Shortening the row means giving up the composed
 * overlay, which means lifting the ⋯ dispatcher into a shared composable first.
 *
 * Fixed height (load-bearing for virtualization): the row is pinned to
 * `TABLE_ROW_HEIGHT` through an inline style read from the SAME constant the host
 * feeds `MediaGrid`'s `rowHeight` prop (via `computeFixedRowHeight`), so the
 * rendered layout and the windowing arithmetic cannot drift. Never restyle the row
 * height — or the grid's column count — from CSS: `MediaGrid` writes an INLINE
 * `grid-template-columns` from the same `columns` value it windows on, and pins the
 * row track with `grid-auto-rows` whenever `rowHeight` is set. This row is
 * `overflow: hidden`, so growing content is clipped instead of silently desyncing
 * `padTop`/`totalHeight`.
 *
 * The row's OWN `grid-template-columns` is also inline, and is the SAME
 * `TABLE_ROW_TEMPLATE_COLUMNS` string the header in `LibraryPage` writes. The
 * header and the body are two separate CSS grids (the header sits outside
 * `MediaGrid` entirely — a virtualized `translateY`-offset container would scroll
 * it away and consume a row slot), so one shared constant is the only thing keeping
 * the columns aligned.
 */
import { computed, inject } from 'vue';
import { RouterLink, routerKey } from 'vue-router';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import {
  TABLE_ROW_HEIGHT,
  TABLE_ROW_POSTER_WIDTH,
  TABLE_ROW_TEMPLATE_COLUMNS,
} from './virtual-grid';

const props = withDefaults(
  defineProps<{
    item: MediaItem;
    /**
     * The item's ABSOLUTE index in the full result set, straight from
     * `MediaGrid`'s `#card` slot — NOT its position in the rendered window. Drives
     * `aria-rowindex`; see the virtualization note in the docblock.
     */
    index?: number;
    /** Admin opt-in (U5) — forwarded to the card's "Match" quick-action. */
    canMatch?: boolean;
  }>(),
  { index: 0, canMatch: false },
);

/**
 * The exact host-event surface of `MediaCard`, re-emitted 1:1. Keep this list in
 * lockstep with `MediaCard`'s `defineEmits` — an omission here cannot be caught by
 * the type checker (the card would simply have no listener) so it is asserted in
 * `MediaTableRow.test.ts` instead.
 */
const emit = defineEmits<{
  (e: 'play', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
  (e: 'match', item: MediaItem): void;
  (e: 'mark-watched', item: MediaItem): void;
  (e: 'refresh', item: MediaItem): void;
  (e: 'choose-poster', item: MediaItem): void;
  (e: 'remove', item: MediaItem): void;
  (e: 'edit-metadata', item: MediaItem): void;
  (e: 'explore-data', item: MediaItem): void;
}>();

// Router instance for SPA navigation (null on standalone mounts) — same pattern as
// MediaCard, so the title link behaves identically to the poster link.
const router = inject(routerKey, null);

/** Detail page for this item — the same target the card's stretched link uses. */
const href = computed(() => `/app/media/${props.item.id}`);

/**
 * 1-based ARIA row index. The header row `LibraryPage` renders outside the grid is
 * row 1, so the first ITEM (absolute index 0) is row 2. Clamped at the header so a
 * negative/garbage index can never claim the header's own index.
 */
const ariaRowIndex = computed(() => Math.max(0, Math.trunc(props.index)) + 2);

/**
 * Row geometry, written inline rather than in the scoped CSS so the DOM height and
 * `MediaGrid`'s windowing math are literally the same numbers, and so the columns
 * are the same string the header writes (see the docblock).
 */
const rowStyle = computed(() => ({
  height: `${TABLE_ROW_HEIGHT}px`,
  gridTemplateColumns: TABLE_ROW_TEMPLATE_COLUMNS,
}));

/**
 * `sizes` hint for the composed card's responsive poster, pinned to the column's
 * real rendered width so the browser picks that candidate instead of over-fetching
 * against `DEFAULT_POSTER_SIZES`' 200px desktop hint.
 */
const posterSizes = `${TABLE_ROW_POSTER_WIDTH}px`;

/** Up to three genres, matching the list row's chip treatment. */
const genres = computed(() => props.item.genres?.slice(0, 3) ?? []);
</script>

<template>
  <!-- `role="row"` + aria-label: one named item boundary per row, mirroring S68's
       named `<article>` (a `table`'s rows are its item boundaries here, so the row
       role replaces the article rather than nesting inside one). `aria-rowindex` is
       what survives virtualization — see the docblock. -->
  <div
    class="media-table-row"
    role="row"
    :aria-label="item.name"
    :aria-rowindex="ariaRowIndex"
    :style="rowStyle"
  >
    <div class="media-table-row__cell media-table-row__cell--poster" role="cell">
      <!-- `role="presentation"` falls through onto MediaCard's root `<article>`:
           this row is ALREADY the named item boundary, so a second (unnamed)
           article inside it just makes AT announce two boundaries per item.
           Presentation is not inherited, so the card's link, badges and the whole
           action overlay keep their own roles. -->
      <MediaCard
        :item="item"
        :can-match="canMatch"
        :lazy="false"
        :poster-sizes="posterSizes"
        hide-caption
        role="presentation"
        @play="emit('play', item)"
        @watchlist="emit('watchlist', item)"
        @info="emit('info', item)"
        @match="emit('match', item)"
        @mark-watched="emit('mark-watched', item)"
        @refresh="emit('refresh', item)"
        @choose-poster="emit('choose-poster', item)"
        @remove="emit('remove', item)"
        @edit-metadata="emit('edit-metadata', item)"
        @explore-data="emit('explore-data', item)"
      />
    </div>

    <div class="media-table-row__cell media-table-row__cell--title" role="cell">
      <!-- The title is the row's primary affordance, so it is a real link (visible
           text = its accessible name) and not just a heading: keyboard users reach
           it with Tab and activate it with Enter exactly like the poster link.
           RouterLink `custom` keeps the raw href for middle-click / copy-link, and
           `@click` (not `.prevent`) lets vue-router decide — a .prevent would set
           defaultPrevented before navigate() and dead-click the link. Exactly ONE
           heading per item, like the list row: the composed card's overlay title is
           suppressed by `hide-caption` (it is only `opacity: 0` otherwise, which
           does NOT remove it from the accessibility tree). -->
      <h3 class="media-table-row__title">
        <RouterLink v-if="router" :to="href" custom v-slot="{ navigate }">
          <a :href="href" class="media-table-row__link" @click="navigate">{{ item.name }}</a>
        </RouterLink>
        <a v-else :href="href" class="media-table-row__link">{{ item.name }}</a>
      </h3>
    </div>

    <!-- The scalar columns. They carry NO `aria-label`: inside a `table` the
         column header supplies the meaning and the cell's own text is the value —
         labelling each cell "Year 2024" would double-announce it. An absent value
         renders an em dash rather than nothing, so every row has the identical cell
         count and therefore the identical column alignment. -->
    <div class="media-table-row__cell media-table-row__cell--year numeric" role="cell">
      {{ item.year ?? '—' }}
    </div>

    <div class="media-table-row__cell media-table-row__cell--rating" role="cell">
      <span v-if="item.rating" class="media-table-row__cert">{{ item.rating }}</span>
      <template v-else>—</template>
    </div>

    <div class="media-table-row__cell media-table-row__cell--runtime numeric" role="cell">
      {{ item.runtime ? `${item.runtime}m` : '—' }}
    </div>

    <div class="media-table-row__cell media-table-row__cell--genres" role="cell">
      <span v-for="g in genres" :key="g" class="media-table-row__genre">{{ g }}</span>
      <template v-if="genres.length === 0">—</template>
    </div>
  </div>
</template>

<style scoped>
.media-table-row {
  display: grid;
  /* height + grid-template-columns come from the inline style (see rowStyle) —
     they are the virtualization contract AND the header-alignment contract, not
     decoration. */
  align-items: center;
  column-gap: var(--space-5);
  /* ENFORCES that height instead of merely asserting it: without this, anything
     that made the content taller (vertical chrome on MediaCard, a different poster
     ratio) would overflow the pinned box and overlap the next row while the
     windowing math stayed on TABLE_ROW_HEIGHT + gap. MediaGrid pins the row TRACK
     too (`grid-auto-rows`), so the clip happens on both sides. */
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

.media-table-row__cell {
  /* min-width:0 lets the text ellipsis inside a grid track; overflow:hidden is what
     guarantees a long value can never push the row past its fixed height. */
  min-width: 0;
  overflow: hidden;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.media-table-row__cell--poster {
  /* The card is width:100% of this column, and its 2:3 poster therefore ends up
     exactly TABLE_ROW_HEIGHT tall — which is what pins the row height. */
  align-self: stretch;
}

/* MediaCard's browse-grid hover lift (translateY(-8px) scale(1.025)) reads as the
   thumbnail jumping out of its row here, and would visually collide with the rows
   above/below. Suppressed for the table renderer only; the card's focus ring and
   poster zoom are deliberately kept. */
.media-table-row__cell--poster :deep(.media-card:hover),
.media-table-row__cell--poster :deep(.media-card:focus-within) {
  transform: none;
}

.media-table-row__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-md, 1.05rem);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-snug);
  color: var(--text);
  /* One line, ellipsised — the whole point of a table row is that every column
     keeps its track. */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.media-table-row__link {
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color var(--dur-base, 0.18s) var(--ease-out, ease);
}
.media-table-row__link:hover {
  color: var(--accent);
}
.media-table-row__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

.media-table-row__cert {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  font-weight: 600;
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  padding: 0 4px;
  line-height: 1.5;
}

.media-table-row__cell--genres {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
}
.media-table-row__genre {
  font-size: var(--text-2xs);
  color: var(--text-muted);
  background: var(--surface-2);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .media-table-row__link {
    transition: none;
  }
}
</style>
