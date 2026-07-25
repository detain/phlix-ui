<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MediaBackdropRow (S69) — the `backdrop` view-mode renderer for the library
 * surface: one full-width HERO STRIP per item. The item's wide backdrop fills the
 * strip behind a legibility scrim, with the poster on the left and the title, meta
 * strip and overview on the right.
 *
 * Visual reference is `MediaDetailPage`'s hero (`MediaDetail.vue`), reduced from a
 * full-bleed page background to one clipped row:
 *   - Source preference `backdrop_url_large` → `backdrop_url`, `srcset` passed
 *     through as-is (the server ships a ready-made `url w780, url w1280, …`).
 *   - Same two-axis scrim (top→bottom + left→right dark bias, 2px blur) so the
 *     text stays readable over ANY image, in both themes.
 *   - Same poster-derived ambient wash (S19) as the no-backdrop fallback: a
 *     faint, heavily-blurred poster, and the scrim on top of it — a bright poster
 *     would otherwise wash out the strip text.
 *   - Same cross-fade on decode, reduced-motion-safe.
 * Both wash layers are decorative: `aria-hidden` + `alt=""`.
 *
 * Composed, NOT re-implemented — same call as `MediaListRow` (S68). The poster
 * column is a real `MediaCard` (with `hideCaption`, since the strip body owns the
 * title), so the strip inherits the blur-up poster + `srcset`, the NEW/quality
 * badges, the resume bar, the stretched navigation link and the WHOLE hover/focus
 * action overlay — Play, thumbs rating, favorite, watched, More info, the ⋯ menu
 * (playlist / download / missing episodes / shuffle / admin metadata + images +
 * inspector + remove) and the admin Match action. That ⋯ dispatcher is ~90 lines
 * that already exist verbatim in TWO places (`MediaCard` and `MediaDetail`);
 * composing the card is what keeps this renderer from being a third copy.
 * It is also why every one of `MediaCard`'s ten host events is re-emitted below:
 * the moment a host fills `MediaGrid`'s `#card` slot, MediaGrid's own default
 * wiring is bypassed, so a dropped event here is a button that silently does
 * nothing.
 *
 * Fixed height (load-bearing for virtualization): the strip is pinned to
 * `BACKDROP_ROW_HEIGHT` through an inline style read from the SAME constant the
 * host feeds `MediaGrid`'s `rowHeight` prop (via `computeFixedRowHeight`), so the
 * rendered layout and the windowing arithmetic cannot drift. Never restyle the row
 * height — or the grid's column count — from CSS: `MediaGrid` writes an INLINE
 * `grid-template-columns` from the same `columns` value it windows on. The grid
 * ALSO pins the row track with `grid-auto-rows` whenever `rowHeight` is set, and
 * this strip is `overflow: hidden`, so growing content is clipped instead of
 * silently desyncing `padTop`/`totalHeight`.
 *
 * A11y semantics: mirrors S68's pattern exactly — a NAMED `<article>` (role
 * `article`, accessible name = the item title) so assistive tech gets an item
 * boundary + a name instead of a flat run of links and buttons, and EXACTLY ONE
 * heading per item (the strip's own `<h3>`; `hideCaption` `v-if`s the card's
 * caption AND its overlay title/meta away, because the overlay is hidden only by
 * `opacity: 0` — which does not remove content from the accessibility tree). It is
 * deliberately NOT `role="listitem"`: that requires a `list`/`group` ancestor, and
 * the only candidate is `MediaGrid`'s `.media-grid`, shared with the poster grid
 * whose cells are `<article>` MediaCards — a `role="list"` there would have
 * non-`listitem` children, i.e. invalid ARIA. See `MediaListRow`'s docblock for
 * the grid-level change ("item 12 of 200") a later step would need.
 */
import { computed, inject, onMounted, ref, watch } from 'vue';
import { RouterLink, routerKey } from 'vue-router';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import { BACKDROP_ROW_HEIGHT, BACKDROP_ROW_POSTER_WIDTH } from './virtual-grid';

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
 * in `MediaBackdropRow.test.ts` instead.
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
 * Backdrop source for the strip's wash layer: prefer the full-res `/original`
 * (`backdrop_url_large`), fall back to the w500 `backdrop_url`. `null` when the
 * item has neither — the strip then falls back to the poster-derived ambient.
 */
const backdropSrc = computed<string | null>(
  () => props.item.backdrop_url_large || props.item.backdrop_url || null,
);
/** Responsive `srcset` for the backdrop `<img>`; passed through as-is (already a
 *  ready-made `url w780, url w1280, …` string from the server). */
const backdropSrcset = computed<string | null>(() => props.item.backdrop_srcset || null);

/** No backdrop but a poster → the S19 ambient wash (blurred poster) instead. */
const ambientSrc = computed<string | null>(() =>
  backdropSrc.value ? null : props.item.poster_url || null,
);
/**
 * Bound via `:style` (a real `style.backgroundImage` assignment), never
 * interpolated into markup — a hostile URL cannot escape the property value, and
 * this mirrors `MediaDetail`'s existing ambient layer.
 */
const ambientStyle = computed(() =>
  ambientSrc.value ? { backgroundImage: `url(${ambientSrc.value})` } : {},
);

/** Whether ANY wash layer is rendered (no empty layer when the item has neither). */
const hasWash = computed(() => backdropSrc.value !== null || ambientSrc.value !== null);

// Cross-fade the backdrop in once it decodes (CSS honours reduced-motion). The
// `complete` check matters for a cached image, whose `load` may fire before the
// listener is attached — without it the strip would keep a decoded image at
// opacity 0. Same guard MediaCard uses for its poster.
const backdropLoaded = ref(false);
const imgEl = ref<HTMLImageElement | null>(null);
function onBackdropLoad(): void {
  backdropLoaded.value = true;
}
onMounted(() => {
  if (imgEl.value?.complete) backdropLoaded.value = true;
});
// Reset the fade when the source changes (the grid recycles nothing, but an
// on-demand page fill can replace the item behind a rendered index).
watch(backdropSrc, () => {
  backdropLoaded.value = false;
});

/**
 * Strip geometry, written inline rather than in the scoped CSS so the DOM height
 * and `MediaGrid`'s windowing math are literally the same numbers (see docblock).
 */
const rowStyle = computed(() => ({
  height: `${BACKDROP_ROW_HEIGHT}px`,
  gridTemplateColumns: `${BACKDROP_ROW_POSTER_WIDTH}px minmax(0, 1fr)`,
}));

/**
 * `sizes` for the composed card's poster: the poster column is a FIXED width, so
 * tell the browser exactly that instead of letting it use the generic
 * `DEFAULT_POSTER_SIZES` desktop hint and over-fetch.
 */
const posterSizes = `${BACKDROP_ROW_POSTER_WIDTH}px`;

/** Up to three genres, matching the list row's chip treatment. */
const genres = computed(() => props.item.genres?.slice(0, 3) ?? []);
</script>

<template>
  <!-- `<article>` + aria-label: one named item boundary per strip for assistive
       tech (see the a11y note in the docblock for why not `role="listitem"`). -->
  <article class="media-backdrop-row" :style="rowStyle" :aria-label="item.name">
    <!-- Decorative wash: the wide backdrop (preferred) or the blurred-poster
         ambient, plus the legibility scrim. Rendered only when the item actually
         has an image — no empty layer otherwise. -->
    <div v-if="hasWash" class="media-backdrop-row__wash" aria-hidden="true">
      <!-- No native `loading="lazy"` on this image: MediaGrid's JS virtualization
           already keeps only near-viewport rows in the DOM, and layering native
           lazy-load over cells repositioned by `transform` in the same reactive
           flush is a known browser-timing stall (S35) — which is exactly why
           MediaGrid passes `:lazy="false"` to its cards. -->
      <img
        v-if="backdropSrc"
        ref="imgEl"
        class="media-backdrop-row__img"
        :class="{ 'is-loaded': backdropLoaded }"
        :src="backdropSrc"
        :srcset="backdropSrcset || undefined"
        sizes="100vw"
        alt=""
        decoding="async"
        @load="onBackdropLoad"
      />
      <div v-else class="media-backdrop-row__ambient" :style="ambientStyle" />
      <div class="media-backdrop-row__scrim" />
    </div>

    <div class="media-backdrop-row__poster">
      <MediaCard
        :item="item"
        :can-match="canMatch"
        :lazy="false"
        :poster-sizes="posterSizes"
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

    <div class="media-backdrop-row__body">
      <!-- The title is the strip's primary affordance, so it is a real link
           (visible text = its accessible name) and not just a heading. RouterLink
           `custom` keeps the raw href for middle-click / copy-link, and `@click`
           (not `.prevent`) lets vue-router decide — a .prevent would set
           defaultPrevented before navigate() and dead-click the link. -->
      <h3 class="media-backdrop-row__title">
        <RouterLink v-if="router" :to="href" custom v-slot="{ navigate }">
          <a :href="href" class="media-backdrop-row__link" @click="navigate">{{ item.name }}</a>
        </RouterLink>
        <a v-else :href="href" class="media-backdrop-row__link">{{ item.name }}</a>
      </h3>

      <div class="media-backdrop-row__meta">
        <span v-if="item.year" class="numeric">{{ item.year }}</span>
        <span v-if="item.year && (item.rating || item.runtime)" class="media-backdrop-row__dot" />
        <span v-if="item.rating" class="media-backdrop-row__cert">{{ item.rating }}</span>
        <span v-if="item.rating && item.runtime" class="media-backdrop-row__dot" />
        <span v-if="item.runtime" class="numeric">{{ item.runtime }}m</span>
        <span v-for="g in genres" :key="g" class="media-backdrop-row__genre">{{ g }}</span>
      </div>

      <p v-if="item.overview" class="media-backdrop-row__overview">{{ item.overview }}</p>
      <p v-else class="media-backdrop-row__overview media-backdrop-row__overview--empty">
        No description yet.
      </p>
    </div>
  </article>
</template>

<style scoped>
.media-backdrop-row {
  position: relative;
  display: grid;
  /* height + grid-template-columns come from the inline style (see rowStyle) —
     they are the virtualization contract, not decoration. */
  align-items: stretch;
  column-gap: var(--space-5);
  border-radius: var(--radius-lg);
  /* ENFORCES that height instead of merely asserting it, and clips the wash to
     the strip's rounded box. Without it, anything that made the content taller
     would overflow the pinned box and overlap the next row while the windowing
     math stayed on BACKDROP_ROW_HEIGHT + gap. MediaGrid pins the row TRACK too
     (`grid-auto-rows`), so the clip happens on both sides. */
  overflow: hidden;
  /* Base under the wash, and the whole strip surface for an item with neither a
     backdrop nor a poster. */
  background: var(--surface);
}

/* --- wash: the wide backdrop (or blurred poster) + its legibility scrim ------
   A strip-local copy of MediaDetail's full-bleed page backdrop: the fixed layer
   becomes an absolute one inside the (position: relative) strip, and the
   bottom-fade mask is dropped because the strip has no content below the hero. */
.media-backdrop-row__wash {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.media-backdrop-row__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-out);
}
.media-backdrop-row__img.is-loaded {
  opacity: 1;
}
/* S19's poster-derived ambient, as the no-backdrop fallback. */
.media-backdrop-row__ambient {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
  opacity: 0.28;
  filter: blur(40px) saturate(1.3);
}
/* Scrim: the same two-axis dark bias + slight blur MediaDetail uses, so the
   title/meta/overview stay legible over ANY image in both themes. Bottoms out
   into the app surface rather than a fixed black. */
.media-backdrop-row__scrim {
  position: absolute;
  inset: 0;
  -webkit-backdrop-filter: blur(2px) saturate(1.05);
  backdrop-filter: blur(2px) saturate(1.05);
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 35%, var(--bg, rgba(0, 0, 0, 0.9)) 100%),
    linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 70%);
}

.media-backdrop-row__poster {
  position: relative;
  z-index: 1;
  /* The card is width:100% of this column, and its 2:3 poster therefore ends up
     exactly BACKDROP_ROW_HEIGHT tall — which is what pins the strip height. */
  min-width: 0;
}

/* MediaCard's browse-grid hover lift (translateY(-8px) scale(1.025)) reads as the
   poster jumping out of its strip here, and the strip clips it. Suppressed for
   this renderer only; the card's focus ring and poster zoom are deliberately
   kept. Same call as MediaListRow. */
.media-backdrop-row__poster :deep(.media-card:hover),
.media-backdrop-row__poster :deep(.media-card:focus-within) {
  transform: none;
}

.media-backdrop-row__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-3);
  /* min-width:0 lets the title ellipsis inside a grid track; overflow:hidden is
     what guarantees a long overview can never push the strip past its fixed
     height (which would desync the rendered layout from the window math). */
  min-width: 0;
  overflow: hidden;
  padding: var(--space-5) var(--space-6) var(--space-5) 0;
}

.media-backdrop-row__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold, 600);
  /* The hero note of the strip — a step up from the list row's --text-lg, but
     below MediaDetail's --text-3xl page title (this repeats once per item). */
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  /* Legible over a bright backdrop even where the scrim is lightest (S19). */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  /* One line, ellipsised — a wrapped title would eat the overview's room. */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.media-backdrop-row__link {
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color var(--dur-base, 0.18s) var(--ease-out, ease);
}
.media-backdrop-row__link:hover {
  color: var(--accent);
}
.media-backdrop-row__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

.media-backdrop-row__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.media-backdrop-row__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}
.media-backdrop-row__cert {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  font-weight: 600;
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  padding: 0 4px;
  line-height: 1.5;
}
.media-backdrop-row__genre {
  font-size: var(--text-2xs);
  color: var(--text-muted);
  background: var(--surface-glass, var(--surface-2));
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
}

.media-backdrop-row__overview {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  /* Clamped so the paragraph cannot outgrow the fixed strip height. */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  overflow: hidden;
  /* The strip is wide; a full-bleed measure is unreadable. */
  max-width: 72ch;
}
.media-backdrop-row__overview--empty {
  color: var(--text-subtle);
  font-style: italic;
}

@media (prefers-reduced-motion: reduce) {
  .media-backdrop-row__img {
    transition: none;
    opacity: 1;
  }
  .media-backdrop-row__link {
    transition: none;
  }
}
</style>
