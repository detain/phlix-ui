<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MediaBackdropRow (S69) — the `backdrop` view-mode renderer for the library
 * surface: one full-width HERO STRIP per item, with the poster on the left and the
 * title, meta strip and overview on the right.
 *
 * ── WHICH WASH YOU ACTUALLY GET (read this before "fixing" the strip) ──────────
 * The strip has TWO wash states and both are real, supported renderings:
 *   1. `data-wash="backdrop"` — the item carries backdrop data, so its WIDE
 *      backdrop image fills the strip behind a legibility scrim. This is the
 *      reference treatment the step was written for.
 *   2. `data-wash="ambient"` — the item has NO backdrop, so the strip paints a
 *      deliberate poster-derived COLOUR WASH instead (see the `__ambient` CSS for
 *      why it is mirrored/zoomed/heavily blurred rather than a recognisable copy
 *      of the poster beside it).
 * With neither a backdrop nor a poster, no wash layer is rendered at all and the
 * strip is a plain `--surface` panel.
 *
 * ⚠ STATE 2 IS NOT A RARE EDGE CASE, so do not "simplify" either branch away. The
 * only host is `LibraryPage`, which lists `GET /api/v1/media`. That response carries
 * a backdrop only as of the companion server step S101 — and then only TWO keys,
 * `backdrop_url` (a TMDB `/w780` URL) and `backdrop_srcset` (`w780` + `w1280`), both
 * emitted always but `null` for the seven backdrop-less types (`track`, `music`,
 * `album`, `artist`, `photo`, `book`, `audiobook`) and for unmatched titles. Those
 * rows take state 2, as does EVERY row against a server older than S101. Equally, do
 * not hand-populate backdrop fields in a page-level fixture and conclude state 1 is
 * universal: `LibraryPage.test.ts` pins which branch each payload takes, in both
 * directions, for exactly that reason.
 *
 * Visual reference is `MediaDetailPage`'s hero (`MediaDetail.vue`), reduced from a
 * full-bleed page background to one clipped row:
 *   - The server `srcset` is passed through as-is, and `sizes` states the strip's
 *     real rendered width so the browser picks `w780` on a narrow viewport instead
 *     of always taking `w1280`. The `src` preference is deliberately the INVERSE of
 *     the detail hero's, and `backdrop_url_large` (`/original`) is not read here at
 *     all — see `backdropSrc` below.
 *   - Same two-axis scrim (top→bottom + left→right dark bias) plus the same 2px of
 *     soft focus, so the text stays readable over ANY image in both themes — but the
 *     soft focus is a `filter` on the image rather than the hero's
 *     `backdrop-filter` on the scrim, because a compositor readback per RENDERED ROW
 *     is not the same purchase as one per page (S69 review r2, finding 4).
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
 * rendered layout and the windowing arithmetic cannot drift. That inline `height`
 * is the WHOLE virtualization contract, and it is the only thing left in the
 * inline style. Never restyle the row height — or the grid's column count — from
 * CSS: `MediaGrid` writes an INLINE `grid-template-columns` from the same
 * `columns` value it windows on. The grid ALSO pins the row track with
 * `grid-auto-rows` whenever `rowHeight` is set, and this strip is
 * `overflow: hidden`, so growing content is clipped instead of silently
 * desyncing `padTop`/`totalHeight`.
 *
 * The strip's OWN internal two-track layout is a different thing and does live in
 * the stylesheet, on purpose (S69 review, finding 2): the poster column has to
 * narrow below 720px — a 200px track starves the body to ~76px at a 360px
 * viewport — and it could not be media-queried while it sat in the inline style
 * (a `@media` rule would have needed `!important` to beat it). Both widths are
 * still handed down from `virtual-grid.ts` as the `--backdrop-row-poster` /
 * `--backdrop-row-poster-narrow` custom properties, so the stylesheet holds the
 * BREAKPOINT and the constants stay the single source of the numbers. The two
 * `var(--backdrop-row-poster*, …px)` FALLBACKS are the stylesheet's only px
 * literals; they exist because the failure mode of a missing custom property is
 * structural (see the `grid-template-columns` comment) and a test pins them to the
 * same constants, so they cannot drift either. The strip HEIGHT stays
 * viewport-independent: a per-breakpoint height would have to travel through
 * `MediaGrid`'s `rowHeight` prop, never through CSS.
 *
 * A11y semantics: mirrors S68's pattern — a NAMED `<article>` (role `article`,
 * accessible name = the item title) so assistive tech gets an item boundary + a
 * name instead of a flat run of links and buttons, and EXACTLY ONE heading per item
 * (the strip's own `<h3>`; `hideCaption` `v-if`s the card's caption AND its overlay
 * title/meta away, because the overlay is hidden only by `opacity: 0` — which does
 * not remove content from the accessibility tree). It is deliberately NOT
 * `role="listitem"`: that requires a `list`/`group` ancestor, and the only
 * candidate is `MediaGrid`'s `.media-grid`, shared with the poster grid whose cells
 * are `<article>` MediaCards — a `role="list"` there would have non-`listitem`
 * children, i.e. invalid ARIA. See `MediaListRow`'s docblock for the grid-level
 * change ("item 12 of 200") a later step would need.
 *
 * ONE boundary, not two (S69 review, finding 6): `MediaCard`'s root is itself an
 * `<article>`, so composing it nested a second, unnamed article inside this one and
 * AT announced two item boundaries per strip. The composed card is therefore given
 * `role="presentation"` — it is a presentational poster column inside a strip that
 * already IS the item boundary; presentation is not inherited, so the card's link
 * and its whole action overlay keep their own roles. What is NOT fixed here, and
 * must not be patched around from this file, is the duplicate accessible NAME: the
 * card's stretched `.media-card__link` carries `:aria-label="item.name"` plus a
 * `.visually-hidden` copy of it (`MediaCard.vue`), so the title is still uttered by
 * both the poster link and the heading link. That is `MediaCard`'s to fix, for
 * every host at once — and it is the same grid-level `role="list"` +
 * `aria-posinset`/`aria-setsize` work S68 deferred. `MediaListRow` (S68) still
 * nests an article for the same reason; it needs the identical one-line
 * `role="presentation"`, and S70's renderer should ship with it from the start.
 */
import { computed, inject, onMounted, ref, watch } from 'vue';
import { RouterLink, routerKey } from 'vue-router';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import {
  BACKDROP_ROW_HEIGHT,
  BACKDROP_ROW_NARROW_POSTER_WIDTH,
  BACKDROP_ROW_POSTER_WIDTH,
} from './virtual-grid';

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
 * `src` for the strip's wash layer — the LIST-shape backdrop only, which is the
 * deliberate INVERSE of `MediaDetail.vue`'s hero (S69 review, finding 3).
 *
 * The detail hero prefers `backdrop_url_large` because it paints ONE full-bleed
 * image per page and that field is TMDB `/original`. This renderer is a VIRTUALIZED
 * list: scrolling a 200-item library mounts 200 strips, each decoding its own wash
 * into a 300px-tall box, and `/original` is a 1.5–4 MB JPEG — so `backdrop_url_large`
 * is NOT read here at all, not even as a last resort, and no `/original` URL is
 * reconstructed from the others. The server enforces the same rule on its side (the
 * list `backdrop_srcset` deliberately tops out at `w1280`).
 *
 * What the list shape supplies (companion server step S101) is exactly two keys:
 *   - `backdrop_srcset` (below) — two candidates, `"<w780> 780w, <w1280> 1280w"`.
 *     When present the browser selects from it by `sizes` and ignores this `src`
 *     entirely, which is the normal case.
 *   - `backdrop_url` — a `/w780` URL, used as the `src` for a browser with no
 *     srcset support and for a pre-S101 / non-TMDB payload that has only this key.
 * Both are `null` (present, but null) for the seven backdrop-less types
 * (`track`, `music`, `album`, `artist`, `photo`, `book`, `audiobook`) and for
 * unmatched titles — so this guards on null, never on key existence, and those rows
 * take the ambient wash below.
 */
const backdropSrc = computed<string | null>(() => props.item.backdrop_url || null);
/** Responsive `srcset` for the backdrop `<img>`; passed through as-is (already a
 *  ready-made `url w780, url w1280` string from the server). When present the
 *  browser selects from it and `backdropSrc` above is only the no-srcset fallback. */
const backdropSrcset = computed<string | null>(() => props.item.backdrop_srcset || null);

/**
 * Whether the item carries usable backdrop data AT ALL — a `srcset` on its own is
 * enough (with `w` descriptors the browser selects from it and never needs `src`),
 * and a `src` on its own is enough too, so the strip renders its wide backdrop for
 * either half of the pair rather than requiring both.
 */
const hasBackdrop = computed(() => backdropSrc.value !== null || backdropSrcset.value !== null);

/**
 * No backdrop but a poster → the poster-derived colour wash instead (see the
 * `__ambient` CSS for the treatment, and the docblock for why this is the state the
 * library surface actually renders today).
 */
const ambientSrc = computed<string | null>(() =>
  hasBackdrop.value ? null : props.item.poster_url || null,
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
const hasWash = computed(() => hasBackdrop.value || ambientSrc.value !== null);
/**
 * Which of the two supported wash states this strip is in, reflected onto the DOM
 * so the distinction is inspectable (and assertable) rather than implied by which
 * child element happens to exist. `null` → no wash layer at all.
 */
const washKind = computed<'backdrop' | 'ambient' | null>(() =>
  hasBackdrop.value ? 'backdrop' : ambientSrc.value ? 'ambient' : null,
);

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
// on-demand page fill can replace the item behind a rendered index). Watches the
// srcset too, since with a srcset-only payload that is what the browser resolves.
watch([backdropSrc, backdropSrcset], () => {
  backdropLoaded.value = false;
});

/**
 * Strip geometry. Only the HEIGHT is an inline declaration, because only the height
 * is the virtualization contract — it has to be literally the same number
 * `MediaGrid`'s windowing math is fed (see docblock).
 *
 * The two poster-column widths ride along as custom properties for the stylesheet's
 * `grid-template-columns` (wide) and its 720px arm (narrow) to consume: the
 * BREAKPOINT belongs in CSS, but the numbers still come from `virtual-grid.ts`, so
 * the stylesheet never re-states a width the constants own. (Its two `var()`
 * FALLBACKS do repeat them as px — deliberately, see the docblock — and
 * `MediaBackdropRow.test.ts` asserts they equal the constants.) Not a computed
 * object literal per breakpoint, and NOT an inline `grid-template-columns` — an
 * inline one cannot be media-queried without `!important`, which is what left this
 * renderer with no narrow-viewport handling at all (S69 review, finding 2).
 */
const rowStyle = computed(() => ({
  height: `${BACKDROP_ROW_HEIGHT}px`,
  '--backdrop-row-poster': `${BACKDROP_ROW_POSTER_WIDTH}px`,
  '--backdrop-row-poster-narrow': `${BACKDROP_ROW_NARROW_POSTER_WIDTH}px`,
}));

/**
 * `sizes` for the composed card's poster: the poster column is a FIXED width, so
 * tell the browser exactly that instead of letting it use the generic
 * `DEFAULT_POSTER_SIZES` desktop hint and over-fetch.
 */
const posterSizes = `${BACKDROP_ROW_POSTER_WIDTH}px`;

/**
 * `sizes` for the WASH image. The strip is a grid cell inside `.shell__main`, whose
 * `padding: var(--space-6) var(--space-5)` puts a 20px gutter on each side at every
 * breakpoint (its 720px arm touches only the nav) and whose `max-width` is `none`;
 * `IndexRail` is `position: fixed` and consumes no width. So the strip's rendered
 * width is the viewport minus 40px — NOT `100vw`, which is only correct for
 * `MediaDetail`'s hero because that one genuinely is `position: fixed; inset: 0`
 * (S69 review, finding 4). Overstating it by 40px pushes the browser one candidate
 * up on every strip near a `srcset` boundary.
 *
 * Honest about the ceiling rather than papering over it: the list srcset's top
 * candidate is `w1280`, and TMDB's ladder jumps straight from `w1280` to `original`
 * with nothing in between. So a ~1400 CSS px strip on a 2x display wants ~2800 device
 * px and gets 1280 — under-resolved, though only visibly so where the scrim is
 * lightest. That is an accepted limitation, not an oversight: the alternative is a
 * 1.5–4 MB `/original` per rendered row (×100 rows a page). The durable fix is the
 * generic image resizer (S71–S73), which does not exist yet. In the meantime a
 * truthful `sizes` at least stops a 360px phone fetching `w1280` for a 320px strip.
 *
 * ── AND YES, `SHELL_GUTTER_PX` IS A PX MIRROR OF A REM TOKEN ──────────────────
 * `var(--space-5)` is 1.25rem, so this constant re-introduces exactly the pattern the
 * `.media-grid` gap fix set out to remove — a contradiction flagged by S69 review r2
 * (finding 2c), recorded here honestly instead of behind a claim that the file
 * contains no such literal. It cannot be a `var()`: a `sizes` value is resolved
 * without element context (the preload scanner reads it before any style is computed),
 * so a custom property in it never resolves — the number has to be a literal, and
 * `AppLayout` owns the real declaration.
 *
 * Why that is acceptable HERE and was not acceptable for the gap: `sizes` is a
 * FETCH HINT. If it drifts (a viewer with a 20px root really has 25px gutters, so
 * the hint understates the strip by 10px) the only consequence is that the browser
 * may pick a neighbouring `srcset` candidate — the two candidates are `w780` and
 * `w1280`, and a 10px error only matters within 10px of the switch-over width. It
 * can never move a pixel of layout, and it can never desync the windowing math,
 * which is exactly what the gap literal could do. The strip's own
 * `column-gap: var(--space-5)` stays a token for the same reason: it is decoration
 * inside a box whose height is pinned, so it has no arithmetic to agree with (the
 * narrow-arm comment's "20 (gap)" is a worked example at the default root, not a
 * contract).
 */
const SHELL_GUTTER_PX = 20; // AppLayout `.shell__main` padding-inline (var(--space-5))
const BACKDROP_SIZES = `calc(100vw - ${2 * SHELL_GUTTER_PX}px)`;

/** Up to three genres, matching the list row's chip treatment. */
const genres = computed(() => props.item.genres?.slice(0, 3) ?? []);
</script>

<template>
  <!-- `<article>` + aria-label: one named item boundary per strip for assistive
       tech (see the a11y note in the docblock for why not `role="listitem"`). -->
  <article class="media-backdrop-row" :style="rowStyle" :aria-label="item.name">
    <!-- Decorative wash: the wide backdrop (preferred) or the poster-derived
         colour wash, plus the legibility scrim. Rendered only when the item
         actually has an image — no empty layer otherwise. `data-wash` names which
         of the two supported states this is; the `--ambient` modifier is what makes
         the fallback a designed treatment rather than a faint copy of the poster
         beside it (see the CSS). -->
    <div
      v-if="hasWash"
      class="media-backdrop-row__wash"
      :class="`media-backdrop-row__wash--${washKind}`"
      :data-wash="washKind"
      aria-hidden="true"
    >
      <!-- No native `loading="lazy"` on this image: MediaGrid's JS virtualization
           already keeps only near-viewport rows in the DOM, and layering native
           lazy-load over cells repositioned by `transform` in the same reactive
           flush is a known browser-timing stall (S35) — which is exactly why
           MediaGrid passes `:lazy="false"` to its cards. -->
      <img
        v-if="hasBackdrop"
        ref="imgEl"
        class="media-backdrop-row__img"
        :class="{ 'is-loaded': backdropLoaded }"
        :src="backdropSrc || undefined"
        :srcset="backdropSrcset || undefined"
        :sizes="BACKDROP_SIZES"
        alt=""
        decoding="async"
        @load="onBackdropLoad"
      />
      <div v-else class="media-backdrop-row__ambient" :style="ambientStyle" />
      <div class="media-backdrop-row__scrim" />
    </div>

    <div class="media-backdrop-row__poster">
      <!-- `role="presentation"` falls through onto MediaCard's root `<article>`:
           the strip above is ALREADY the named item boundary, so a second (unnamed)
           article inside it just makes AT announce two boundaries per item (S69
           review, finding 6). Presentation is not inherited, so the card's link,
           badges and the whole action overlay keep their own roles — and the card
           root carries no aria-* attributes and is not focusable, which is what
           makes the role honoured rather than ignored. -->
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
  /* `height` comes from the inline style (see rowStyle) — THAT is the
     virtualization contract, and it stays viewport-independent. The two-track
     layout is decoration and lives here so the narrow arm below can change it; both
     widths are still the virtual-grid.ts constants, handed in as custom
     properties.

     The fallback is not decorative (S69 review r2, finding 5): if the custom
     property is ever absent the WHOLE declaration is invalid at computed-value time,
     which means `grid-template-columns: none` — poster and body stack in one column
     and the body's text is clipped by the pinned 300px overflow:hidden box. Every
     other token in this file carries a fallback for cosmetic failures; this is the
     one whose failure is structural. MediaBackdropRow.test.ts pins the fallback to
     BACKDROP_ROW_POSTER_WIDTH so the literal cannot drift from the constant. */
  grid-template-columns: var(--backdrop-row-poster, 200px) minmax(0, 1fr);
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
  /* A defined panel edge, in BOTH wash states — this is what makes a strip read as
     a deliberate card rather than as an image bleeding into the page, which matters
     most in the ambient state (see `__ambient`). `box-shadow: inset`, never
     `border`: a border would eat 2px of the pinned 300px content box. */
  box-shadow: inset 0 0 0 1px var(--border-subtle, rgba(255, 255, 255, 0.06));
  /* Per-row cost control (S69 review r2, finding 4). Unlike the named visual
     reference — MediaDetail's hero, ONE per page — this strip repeats per RENDERED
     ROW, so paint containment is worth the one declaration: the row's paint is
     isolated to its own (already clipped) box, so an off-screen or overscan row does
     not participate in the rest of the page's paint work, and nothing inside it can
     invalidate outside it. Same treatment `AppBackdrop.vue`'s ambient layer already
     uses. Deliberately NOT `will-change`/`transform: translateZ(0)`: that promotes
     EVERY windowed row to its own compositor layer, trading raster time for GPU
     memory ~15 times over. */
  contain: layout paint;
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
  /* Bled 3px past the strip on every side (and clipped back by the row's
     overflow/containment) so the soft-focus filter below cannot fade the image out
     at the visible edge — a blur on an `inset: 0` box makes its own outline
     translucent. All four insets AND an explicit size, because an absolutely
     positioned REPLACED element with `width: auto` falls back to its intrinsic
     width and simply ignores `right`/`bottom`. */
  inset: -3px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  object-fit: cover;
  object-position: center;
  /* The soft focus behind the text, moved here OFF the scrim's `backdrop-filter`
     (S69 review r2, finding 4). Visually the same thing — the only thing painted
     behind the scrim is this image — but an element filter rasters the image once,
     whereas a `backdrop-filter` makes the compositor snapshot and re-blur the region
     behind the scrim, per row, again whenever that backdrop moves relative to the
     viewport (i.e. every frame of a scroll). MediaDetail's hero can afford the
     readback because it paints ONE per page; a virtualized strip list cannot. */
  filter: blur(2px) saturate(1.05);
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-out);
}
.media-backdrop-row__img.is-loaded {
  opacity: 1;
}
/* --- the no-backdrop fallback, as a DELIBERATE treatment ---------------------
   This is not a spare branch: until the list endpoint carries backdrop data
   (companion server step S101) it is what every strip on the library surface
   renders, so it has to look designed rather than like a failed image load.

   S19's page-level ambient is a faint blurred poster, which works full-bleed behind
   a whole detail page. Reused verbatim in a 300px strip it read as a BUG: a smeared,
   dark-haloed duplicate of the very poster sitting 20px to its left, at the same
   scale and orientation. So the layer is kept (the per-item colour is the point —
   it is what makes a hero strip feel like the item rather than a grey panel) but it
   is rendered as an abstract COLOUR FIELD instead of a picture:
     - mirrored and zoomed so it can never align with, or be read as a copy of, the
       poster beside it;
     - blurred far past recognisability — 121.6px of visual radius, 3x the S19 page
       ambient's 40px — and the zoom is also what removes the transparent edge-bleed
       a large blur produces, that dark vignette frame being itself half of why it
       looked broken;
     - a touch more presence (0.34) than the page ambient, since the scrim sits on
       top and carries the text contrast anyway.
   The `--ambient` wash modifier then adds a left-anchored surface plinth under the
   poster column (see `__wash--ambient .media-backdrop-row__scrim`), so the strip
   reads as a tinted panel with the poster mounted on it.

   ── AND IT IS PAID PER RENDERED ROW, so the geometry is chosen for cost (S69 review
   r2, finding 4). Until S101 deploys this is the state 100% of rows take, and the
   naive spelling of the same picture — `inset: 0` + `blur(64px)` + `scale(1.9)` —
   asks the browser to blur the FULL strip area (~1360x300) with a 64px kernel once
   per row. Filters apply in the element's own coordinate space and the transform
   scales the RESULT, so a quarter-size source box with a quarter of the radius and 4x
   the zoom is the identical image: 16px x 7.6 = 121.6px = the old 64px x 1.9, and
   `background-size: cover` crops the same because the box keeps the strip's aspect
   ratio. What changes is the work: ~1/16 of the pixels through a 1/4 radius kernel.
   `inset: 37.5%` leaves exactly 25% x 25%, centred, so the 1.9x-of-strip coverage and
   the off-strip position of the blur's translucent edge are both unchanged. */
.media-backdrop-row__ambient {
  position: absolute;
  inset: 37.5%; /* a centred 25% x 25% source box — see the cost note above */
  background-size: cover;
  background-position: center;
  opacity: 0.34;
  transform: scale(-7.6, 7.6);
  filter: blur(16px) saturate(1.5);
}
/* Scrim: the same two-axis dark bias MediaDetail uses, so the title/meta/overview
   stay legible over ANY image in both themes. Bottoms out into the app surface
   rather than a fixed black.

   GRADIENTS ONLY — no `backdrop-filter` here, by design (S69 review r2, finding 4).
   MediaDetail's hero scrim blurs its backdrop with one `backdrop-filter` per PAGE;
   copying that into a per-ROW renderer buys the same 2px of softness for a
   compositor readback of every strip on screen, re-evaluated as each one moves
   through the viewport. In the backdrop state that softness now lives on the image
   itself (`__img`'s `filter`), which is cheaper and looks the same since the image is
   the only thing behind this element. In the ambient state it is not needed at all:
   the layer underneath is already a 121.6px-blurred colour field, so blurring the
   composite by a further 2px is invisible. The contrast the text actually depends on
   is carried entirely by the two gradients below. */
.media-backdrop-row__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 35%, var(--bg, rgba(0, 0, 0, 0.9)) 100%),
    linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 70%);
}
/* In the ambient state there is no photographic detail to protect — the layer under
   the scrim is already an abstract colour field — so the scrim lightens and its
   left-hand bias tightens. The point is that the strip then reads as a TINTED PANEL
   (the item's colour, the plinth edge on the strip itself, the poster mounted on
   top) rather than as a photo that failed to load. Deliberately NOT an opaque
   surface plinth: that would cover the colour the wash exists to show. */
.media-backdrop-row__wash--ambient .media-backdrop-row__scrim {
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.18) 40%, var(--bg, rgba(0, 0, 0, 0.9)) 100%),
    linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 62%);
}

.media-backdrop-row__poster {
  position: relative;
  z-index: 1;
  /* The card is width:100% of this column, so at the WIDE track its 2:3 poster ends
     up exactly BACKDROP_ROW_HEIGHT tall and fills the strip. Below 720px the track
     narrows and the poster is shorter than the strip — the height is pinned by the
     inline style and MediaGrid's `grid-auto-rows` either way, never by this. */
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

/* --- narrow viewports (S69 review, finding 2) --------------------------------
   720px is the same breakpoint the visual reference collapses at
   (`MediaDetail.vue`'s `.media-detail__hero` → `1fr` + a 220px poster).

   Why it is needed: `.shell__main` keeps its 20px inline padding on mobile and
   `IndexRail` is `position: fixed` (and hidden below 640px), so a 360px viewport
   gives the grid a 320px content box. With the wide 200px poster track the strip
   body got `320 − 200 − 20 (gap) − 24 (padding)` = 76px — the `nowrap` title
   ellipsised to a 2-3 character stub and the 4-line overview was unreadable.
   Narrowing the track to `--backdrop-row-poster-narrow` and tightening the gap and
   the body padding gives ≈168px back; the title switches to two clamped lines
   because 168px would still ellipsise most titles on the first word.

   What is NOT touched here: the strip HEIGHT. It stays at the inline
   `BACKDROP_ROW_HEIGHT` at every viewport, because that is the number MediaGrid's
   windowing math is fed (and which MediaGrid re-pins as `grid-auto-rows`). The
   narrower poster therefore renders 180px tall inside a 300px strip — some dead
   space under it, in exchange for keeping virtualization exact. A height that
   varied per breakpoint would have to be routed through the `rowHeight` prop. */
@media (max-width: 720px) {
  .media-backdrop-row {
    /* Fallback for the same reason as the wide rule above: a missing custom property
       invalidates the whole declaration → `none` → a one-column collapse with clipped
       text. Pinned to BACKDROP_ROW_NARROW_POSTER_WIDTH by a test. */
    grid-template-columns: var(--backdrop-row-poster-narrow, 120px) minmax(0, 1fr);
    column-gap: var(--space-4);
  }
  .media-backdrop-row__body {
    padding: var(--space-4) var(--space-4) var(--space-4) 0;
  }
  .media-backdrop-row__title {
    font-size: var(--text-lg);
    /* Two clamped lines instead of one ellipsised one — see the note above. */
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .media-backdrop-row__overview {
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
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
