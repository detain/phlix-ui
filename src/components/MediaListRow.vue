<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MediaListRow (S68) — the `list` view-mode renderer for the library surface: a
 * full-width row with the item's poster on the left and its title, meta strip
 * (year · certificate · runtime · genres) and overview on the right.
 *
 * Composed, NOT re-implemented. The poster column is a real `MediaCard` (with the
 * S68 `hideCaption` prop, since the row body owns the title), so the row inherits
 * — for free, and without a second copy of the logic — the blur-up poster and its
 * `srcset`, the NEW/quality badges, the resume-progress bar, the stretched
 * navigation link, and the FULL hover/focus action overlay: Play, thumbs rating,
 * favorite, watched, More info, the ⋯ menu (playlist / download / missing
 * episodes / shuffle / admin metadata + images + inspector + remove) and the
 * admin Match action. That is also why every one of `MediaCard`'s ten host events
 * is re-emitted verbatim below: the moment a host fills `MediaGrid`'s `#card`
 * slot, MediaGrid's own default wiring is bypassed, so a dropped event here is a
 * button that silently does nothing.
 *
 * Fixed height (load-bearing for virtualization): the row is pinned to
 * `LIST_ROW_HEIGHT` through an inline style read from the SAME constant the host
 * feeds `MediaGrid`'s `rowHeight` prop (via `computeFixedRowHeight`), so the
 * rendered layout and the windowing arithmetic cannot drift. Never restyle the
 * row height — or the grid's column count — from CSS: `MediaGrid` writes an
 * INLINE `grid-template-columns` from the same `columns` value it windows on.
 * The grid ALSO pins the row track with `grid-auto-rows` whenever `rowHeight` is
 * set, and this row is `overflow: hidden`, so growing content is clipped instead
 * of silently desyncing `padTop`/`totalHeight` (S68 review, finding 3).
 *
 * A11y semantics: the row is a NAMED `<article>` (role `article`, accessible name
 * = the item title) so assistive tech gets an item boundary + a name instead of a
 * flat run of links and buttons. It is deliberately NOT `role="listitem"`:
 * `listitem` requires a `list`/`group` ancestor, and the only candidate is
 * `MediaGrid`'s `.media-grid` container, which is shared with the poster grid
 * whose cells are `<article>` MediaCards (also mounted outside any list) — a
 * `role="list"` there would have non-`listitem` children, i.e. invalid ARIA. The
 * complete fix, if a later step wants "item 12 of 200", is grid-level: give
 * `.media-grid` `role="list"` (or `role="feed"`, which is the pattern for a
 * virtualized incrementally-loaded set) AND have EVERY renderer emit
 * `aria-posinset`/`aria-setsize` from the slot's `index` plus the grid's item
 * count — because a virtualized container only ever holds a window, so an AT
 * would otherwise announce 7 items in a 200-item library. S69/S70 should mirror
 * the named-`<article>` pattern until that grid-level change is made.
 */
import { computed, inject } from 'vue';
import { RouterLink, routerKey } from 'vue-router';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import { LIST_ROW_HEIGHT, LIST_ROW_POSTER_WIDTH } from './virtual-grid';

const props = withDefaults(
  defineProps<{
    item: MediaItem;
    /** Admin opt-in (U5) — forwarded to the card's "Match" quick-action. */
    canMatch?: boolean;
  }>(),
  { canMatch: false },
);

/**
 * The exact host-event surface of `MediaCard`, re-emitted 1:1. Keep this list in
 * lockstep with `MediaCard`'s `defineEmits` — an omission here cannot be caught
 * by the type checker (the card would simply have no listener) so it is asserted
 * in `MediaListRow.test.ts` instead.
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

// Router instance for SPA navigation (null on standalone mounts) — same pattern
// as MediaCard, so the title link behaves identically to the poster link.
const router = inject(routerKey, null);

/** Detail page for this item — the same target the card's stretched link uses. */
const href = computed(() => `/app/media/${props.item.id}`);

/**
 * Row geometry, written inline rather than in the scoped CSS so the DOM height and
 * `MediaGrid`'s windowing math are literally the same numbers (see the docblock).
 */
const rowStyle = computed(() => ({
  height: `${LIST_ROW_HEIGHT}px`,
  gridTemplateColumns: `${LIST_ROW_POSTER_WIDTH}px minmax(0, 1fr)`,
}));

/** Up to three genres, matching the card overlay's chip treatment. */
const genres = computed(() => props.item.genres?.slice(0, 3) ?? []);
</script>

<template>
  <!-- `<article>` + aria-label: one named item boundary per row for assistive
       tech (see the a11y note in the docblock for why not `role="listitem"`). -->
  <article class="media-list-row" :style="rowStyle" :aria-label="item.name">
    <div class="media-list-row__poster">
      <MediaCard
        :item="item"
        :can-match="canMatch"
        :lazy="false"
        hide-caption
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

    <div class="media-list-row__body">
      <!-- The title is the row's primary affordance, so it is a real link (visible
           text = its accessible name) and not just a heading: keyboard users reach
           it with Tab and activate it with Enter exactly like the poster link.
           RouterLink `custom` keeps the raw href for middle-click / copy-link, and
           `@click` (not `.prevent`) lets vue-router decide — a .prevent would set
           defaultPrevented before navigate() and dead-click the link. -->
      <h3 class="media-list-row__title">
        <RouterLink v-if="router" :to="href" custom v-slot="{ navigate }">
          <a :href="href" class="media-list-row__link" @click="navigate">{{ item.name }}</a>
        </RouterLink>
        <a v-else :href="href" class="media-list-row__link">{{ item.name }}</a>
      </h3>

      <div class="media-list-row__meta">
        <span v-if="item.year" class="numeric">{{ item.year }}</span>
        <span v-if="item.year && (item.rating || item.runtime)" class="media-list-row__dot" />
        <span v-if="item.rating" class="media-list-row__cert">{{ item.rating }}</span>
        <span v-if="item.rating && item.runtime" class="media-list-row__dot" />
        <span v-if="item.runtime" class="numeric">{{ item.runtime }}m</span>
        <span v-for="g in genres" :key="g" class="media-list-row__genre">{{ g }}</span>
      </div>

      <p v-if="item.overview" class="media-list-row__overview">{{ item.overview }}</p>
      <p v-else class="media-list-row__overview media-list-row__overview--empty">
        No description yet.
      </p>
    </div>
  </article>
</template>

<style scoped>
.media-list-row {
  display: grid;
  /* height + grid-template-columns come from the inline style (see rowStyle) —
     they are the virtualization contract, not decoration. */
  align-items: stretch;
  column-gap: var(--space-5);
  /* ENFORCES that height instead of merely asserting it: without this, anything
     that made the content taller (vertical chrome on MediaCard, a different
     poster ratio) would overflow the pinned box and overlap the next row while
     the windowing math stayed on LIST_ROW_HEIGHT + gap. MediaGrid pins the row
     TRACK too (`grid-auto-rows`), so the clip happens on both sides. */
  overflow: hidden;
}

.media-list-row__poster {
  /* The card is width:100% of this column, and its 2:3 poster therefore ends up
     exactly LIST_ROW_HEIGHT tall — which is what pins the row height. */
  min-width: 0;
}

/* MediaCard's browse-grid hover lift (translateY(-8px) scale(1.025)) reads as the
   thumbnail jumping out of its row here, and would visually collide with the rows
   above/below. Suppressed for the list renderer only; the card's focus ring and
   poster zoom are deliberately kept. */
.media-list-row__poster :deep(.media-card:hover),
.media-list-row__poster :deep(.media-card:focus-within) {
  transform: none;
}

.media-list-row__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  /* min-width:0 lets the title ellipsis inside a grid track; overflow:hidden is
     what guarantees a long overview can never push the row past its fixed
     height (which would desync the rendered layout from the window math). */
  min-width: 0;
  overflow: hidden;
  padding-top: var(--space-1);
}

.media-list-row__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-lg, 1.15rem);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-snug);
  color: var(--text);
  /* One line, ellipsised — a two-line title would eat the overview's room. */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.media-list-row__link {
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color var(--dur-base, 0.18s) var(--ease-out, ease);
}
.media-list-row__link:hover {
  color: var(--accent);
}
.media-list-row__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

.media-list-row__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.media-list-row__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}
.media-list-row__cert {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  font-weight: 600;
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  padding: 0 4px;
  line-height: 1.5;
}
.media-list-row__genre {
  font-size: var(--text-2xs);
  color: var(--text-muted);
  background: var(--surface-2);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
}

.media-list-row__overview {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
  /* Clamped so the paragraph cannot outgrow the fixed row height. */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  overflow: hidden;
}
.media-list-row__overview--empty {
  color: var(--text-subtle);
  font-style: italic;
}

@media (prefers-reduced-motion: reduce) {
  .media-list-row__link {
    transition: none;
  }
}
</style>
