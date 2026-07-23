<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * MediaRow (R2.4) — a horizontal, scroll-snapping rail of poster cards for the
 * Browse surface's hero/home-row strips (ports the `browse-grid.html` rail).
 *
 * Presentational only: it renders a section-head (title + count + `#action`
 * slot, e.g. a "See all" link) above a rail of `MediaCard`s. It shows skeleton
 * cards during the initial load, an inline error with a retry affordance, and an
 * `EmptyState` (or `#empty` slot) when there is nothing to show. Card events are
 * forwarded as `play` / `watchlist` / `info`. The whole rail is keyboard
 * scrollable and reduced-motion safe (snap/animation only enhance).
 *
 * Fetching/lazy-loading is the container's job (see `HomeRow.vue`); this
 * component is driven purely by props so it is trivial to test and reuse (e.g.
 * the resume-map "Continue Watching" rail).
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { MediaItem } from '../types/media-item';
import Icon from './Icon.vue';
import MediaCard from './MediaCard.vue';
import EmptyState from './ui/EmptyState.vue';
import Skeleton from './ui/Skeleton.vue';

const props = withDefaults(
  defineProps<{
    /** Rail heading. */
    title: string;
    /** Items to render. */
    items: MediaItem[];
    /** Initial load — show skeleton cards instead of items. */
    loading?: boolean;
    /** Error message; renders an inline retry affordance. */
    error?: string | null;
    /** Optional count shown next to the title (e.g. total available). */
    count?: number | null;
    /** Skeleton cards shown during the initial load. */
    skeletonCount?: number;
    /** Empty-state copy when there is nothing to show. */
    emptyText?: string;
    /** Collapse the whole rail (render nothing) when settled + empty. */
    hideWhenEmpty?: boolean;
    /** Override the per-card link target prefix (default the player route). */
    cardTo?: (item: MediaItem) => string;
    /** Admin opt-in (U5): render each card's "Match" action + forward `match`. */
    canMatch?: boolean;
    /**
     * Hints the browser to prioritize loading the posters in this row (maps to
     * the HTML `fetchpriority` attribute on the underlying `<img>` elements).
     * Use `high` for the first visible row to improve LCP.
     */
    fetchPriority?: 'high' | 'low' | 'auto';
  }>(),
  { loading: false, error: null, count: null, skeletonCount: 6, hideWhenEmpty: false, canMatch: false },
);

const emit = defineEmits<{
  (e: 'play', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
  (e: 'match', item: MediaItem): void;
  (e: 'mark-watched', item: MediaItem): void;
  (e: 'refresh', item: MediaItem): void;
  (e: 'choose-poster', item: MediaItem): void;
  (e: 'remove', item: MediaItem): void;
  /** Admin ⋯-menu "Edit metadata" — host opens the metadata-match modal. */
  (e: 'edit-metadata', item: MediaItem): void;
  /** Admin ⋯-menu "Explore item data" — host opens the read-only inspector. */
  (e: 'explore-data', item: MediaItem): void;
  (e: 'retry'): void;
}>();

const isEmpty = computed(() => !props.loading && !props.error && props.items.length === 0);
const collapsed = computed(() => props.hideWhenEmpty && isEmpty.value);

/* ---------------------------------------------------------------------------
 * S21 — prev/next scroll arrows (pointer/hover devices only).
 *
 * The arrows overlay the LEFT/RIGHT edges of the item rail and page it by ~90%
 * of the visible width. They are rendered as siblings of `.media-row__rail`
 * inside a dedicated positioned wrapper (`.media-row__viewport`) — never nested
 * inside the rail — because the rail is a horizontally-scrolling grid and its
 * ancestor `.media-row` sets `content-visibility: auto` (paint/layout
 * containment); positioning the arrows in a plain, un-contained wrapper keeps
 * them from being scrolled with the content or clipped by containment.
 * ------------------------------------------------------------------------- */

/** The scrollable item rail (`<ul>`). Only bound in the populated branch. */
const railEl = ref<HTMLElement | null>(null);

/** Rail overflows its viewport (i.e. there is something to scroll to). */
const hasOverflow = ref(false);
/** Rail is scrolled to its left extreme (prev arrow not useful). */
const atStart = ref(true);
/** Rail is scrolled to its right extreme (next arrow not useful). */
const atEnd = ref(false);
/** OS "reduce motion" — arrows are a motion affordance, so we suppress them. */
const prefersReducedMotion = ref(false);
/** Coarse pointer / no-hover (touch): native swipe is better than tap targets. */
const isCoarsePointer = ref(false);

/**
 * Whether the arrows are usable at all. They only make sense on a hover-capable
 * fine pointer, when the rail actually overflows, and when the user has not
 * asked to reduce motion.
 */
const canScroll = computed(
  () => hasOverflow.value && !prefersReducedMotion.value && !isCoarsePointer.value,
);
const showPrev = computed(() => canScroll.value && !atStart.value);
const showNext = computed(() => canScroll.value && !atEnd.value);

/**
 * Recompute overflow + edge flags from the rail's live geometry. Guarded so it
 * is a harmless no-op before layout (jsdom / SSR report 0 for every metric).
 */
function updateScrollState(): void {
  const el = railEl.value;
  if (!el) {
    hasOverflow.value = false;
    return;
  }
  const { scrollLeft, scrollWidth, clientWidth } = el;
  // 1px tolerance absorbs sub-pixel rounding so the edge flags don't flicker.
  hasOverflow.value = scrollWidth - clientWidth > 1;
  atStart.value = scrollLeft <= 1;
  atEnd.value = scrollLeft >= scrollWidth - clientWidth - 1;
}

/** Page the rail by ~90% of the visible width (-1 = left, +1 = right). */
function scrollByPage(dir: 1 | -1): void {
  const el = railEl.value;
  if (!el) return;
  el.scrollBy({
    left: dir * el.clientWidth * 0.9,
    // Arrows are hidden under reduced-motion, but guard the edge case (e.g. the
    // preference flips while an arrow is mid-click) with an instant jump.
    behavior: prefersReducedMotion.value ? 'auto' : 'smooth',
  });
}

// --- matchMedia + resize wiring (all listeners cleaned up on unmount) ---
let reducedMotionMq: MediaQueryList | null = null;
let coarsePointerMq: MediaQueryList | null = null;
let resizeObserver: ResizeObserver | null = null;

function onReducedMotionChange(e: MediaQueryListEvent): void {
  prefersReducedMotion.value = e.matches;
}
function onCoarsePointerChange(e: MediaQueryListEvent): void {
  isCoarsePointer.value = e.matches;
}

onMounted(() => {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = reducedMotionMq.matches;
    reducedMotionMq.addEventListener('change', onReducedMotionChange);

    coarsePointerMq = window.matchMedia('(pointer: coarse), (hover: none)');
    isCoarsePointer.value = coarsePointerMq.matches;
    coarsePointerMq.addEventListener('change', onCoarsePointerChange);
  }

  // The rail's own box rarely changes size on content changes (its width is the
  // viewport), but a container/window resize can flip overflow — observe both.
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => updateScrollState());
    if (railEl.value) resizeObserver.observe(railEl.value);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateScrollState, { passive: true });
  }
  updateScrollState();
});

onBeforeUnmount(() => {
  reducedMotionMq?.removeEventListener('change', onReducedMotionChange);
  coarsePointerMq?.removeEventListener('change', onCoarsePointerChange);
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateScrollState);
  }
});

// The rail only exists in the populated branch, so (re)observe + recompute when
// its element appears/changes (e.g. skeleton → items).
watch(
  () => railEl.value,
  (el, prev) => {
    if (resizeObserver) {
      if (prev) resizeObserver.unobserve(prev);
      if (el) resizeObserver.observe(el);
    }
    if (el) void nextTick(updateScrollState);
  },
);

// Appending/replacing items changes scrollWidth (not the rail's own box, so the
// ResizeObserver won't fire) — recompute after the DOM settles.
watch(
  () => props.items.length,
  () => void nextTick(updateScrollState),
);
</script>

<template>
  <section v-if="!collapsed" class="media-row" :aria-label="title">
    <div class="media-row__head">
      <h2 class="media-row__title">{{ title }}</h2>
      <span v-if="count != null" class="media-row__count numeric">{{ count.toLocaleString() }}</span>
      <div class="media-row__action"><slot name="action" /></div>
    </div>

    <div v-if="error" class="media-row__error" role="alert">
      <span>{{ error }}</span>
      <button type="button" class="media-row__retry" @click="emit('retry')">Retry</button>
    </div>

    <div
      v-else-if="loading && items.length === 0"
      class="media-row__rail"
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      <div v-for="n in skeletonCount" :key="n" class="media-row__cell" aria-hidden="true">
        <div class="media-row__skel-poster"><Skeleton variant="rect" radius="var(--radius-lg)" height="100%" /></div>
        <Skeleton variant="text" width="80%" />
      </div>
    </div>

    <EmptyState v-else-if="isEmpty" :title="title" :description="emptyText ?? 'Nothing here yet.'">
      <slot name="empty" />
    </EmptyState>

    <div v-else class="media-row__viewport">
      <!-- Arrows are SIBLINGS of the rail (not children): the rail is a
           horizontally-scrolling grid whose ancestor sets content-visibility. -->
      <button
        v-show="showPrev"
        type="button"
        class="media-row__arrow media-row__arrow--prev"
        aria-label="Scroll left"
        @click="scrollByPage(-1)"
      >
        <Icon name="chevron-left" :size="24" />
      </button>

      <ul ref="railEl" class="media-row__rail" :aria-label="title" @scroll="updateScrollState">
        <li v-for="item in items" :key="item.id" class="media-row__cell">
          <MediaCard
            :item="item"
            :to="cardTo ? cardTo(item) : undefined"
            :can-match="canMatch"
            :fetch-priority="fetchPriority"
            @play="emit('play', $event)"
            @watchlist="emit('watchlist', $event)"
            @info="emit('info', $event)"
            @match="emit('match', $event)"
            @mark-watched="emit('mark-watched', $event)"
            @refresh="emit('refresh', $event)"
            @choose-poster="emit('choose-poster', $event)"
            @remove="emit('remove', $event)"
            @edit-metadata="emit('edit-metadata', $event)"
            @explore-data="emit('explore-data', $event)"
          />
        </li>
      </ul>

      <button
        v-show="showNext"
        type="button"
        class="media-row__arrow media-row__arrow--next"
        aria-label="Scroll right"
        @click="scrollByPage(1)"
      >
        <Icon name="chevron-right" :size="24" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.media-row {
  /* Tightened from --space-8 → --space-6 to reduce the vertical gap between home
     rails (updates.md #9). Margins sit OUTSIDE the contain-intrinsic-size box, so
     this does not change the reserved height and introduces no first-paint jump. */
  margin-block: var(--space-6);
  /* R6.2a — skip rendering + layout for off-screen home rails. The Browse home
     page stacks many rails; content-visibility lets the browser bypass the
     off-screen ones (paint/layout work scales with what's near the viewport, not
     the rail count). contain-intrinsic-size reserves an approximate box (≈ head +
     a 2:3 poster rail) so the scrollbar/scroll position stay stable — no CLS, no
     scroll jank — and the `auto` keyword lets the browser remember each rail's
     real height after it first renders. `auto` (not `hidden`) keeps the content
     in the a11y tree + find-in-page; containment only applies while off-screen,
     so the cards' on-screen hover lift/shadow spill is unaffected. */
  content-visibility: auto;
  contain-intrinsic-size: auto var(--media-row-intrinsic-h, 380px);
}
.media-row__head {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.media-row__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.media-row__count {
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.media-row__action {
  margin-left: auto;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}

.media-row__rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(160px, 180px);
  gap: var(--space-5);
  overflow-x: auto;
  padding-bottom: var(--space-3);
  scroll-snap-type: x mandatory;
  list-style: none;
  margin: 0;
}
.media-row__cell {
  scroll-snap-align: start;
}
.media-row__skel-poster {
  position: relative;
  aspect-ratio: 2 / 3;
  margin-bottom: var(--space-2);
}

.media-row__rail::-webkit-scrollbar {
  height: 6px;
}
.media-row__rail::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: var(--radius-full);
}

/* S21 — the positioned wrapper that overlays the prev/next arrows on the rail.
   It carries NO containment (unlike the .media-row section), so the absolutely
   positioned arrows are neither scrolled with the rail content nor clipped. */
.media-row__viewport {
  position: relative;
}
.media-row__arrow {
  position: absolute;
  /* Centre on the poster band; the extra scroll gutter below is negligible. */
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  box-shadow: var(--shadow-2);
  cursor: pointer;
  transition:
    background-color 120ms ease,
    border-color 120ms ease;
}
.media-row__arrow--prev {
  left: var(--space-1);
}
.media-row__arrow--next {
  right: var(--space-1);
}
.media-row__arrow:hover {
  background: var(--surface);
  border-color: var(--accent-ring);
  color: var(--accent-text);
}
.media-row__arrow:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

.media-row__error {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-2);
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.media-row__retry {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
}
.media-row__retry:hover {
  border-color: var(--accent-ring);
  color: var(--accent-text);
}
.media-row__retry:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

@media (prefers-reduced-motion: reduce) {
  .media-row__rail {
    scroll-behavior: auto;
    scroll-snap-type: none;
  }
  /* Belt-and-suspenders: the arrows are already suppressed by JS under
     reduced-motion, but drop their hover transition too if one ever renders. */
  .media-row__arrow {
    transition: none;
  }
}
</style>
