<script setup lang="ts">
/**
 * MediaGrid (R2.2) — virtualized poster grid for the Browse surface.
 *
 * Ports the locked R0 art direction (`src/dev/mockups/browse-grid.html`): an
 * auto-fit poster grid whose column count is driven by the user's `cardSize`
 * preference, with a 2:3 rhythm and the Nocturne gaps.
 *
 * Virtualization: only the rows intersecting the viewport (plus an overscan
 * band) are ever in the DOM, so a library of thousands of items stays at 60fps.
 * The windowing arithmetic lives in `./virtual-grid.ts` (pure, unit-tested);
 * this component only measures (guarded — jsdom has no layout) and renders the
 * selected slice, offsetting it with a `translateY` spacer inside a full-height
 * sizer so the native scrollbar stays accurate.
 *
 * When measurement is unavailable (SSR / jsdom / zero-width container) it
 * degrades gracefully to rendering every item — virtualization is a pure
 * progressive enhancement.
 *
 * Infinite scroll: an `IntersectionObserver` sentinel near the end emits
 * `load-more`; a "back to top" affordance appears once scrolled well past the
 * fold. Skeleton rows on the initial load match the final layout (no shift).
 */
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
import type { MediaItem } from '../types/media-item';
import MediaCard from './MediaCard.vue';
import Icon from './Icon.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import {
  COL_GAP,
  computeCardWidth,
  computeColumns,
  computeRowHeight,
  computeWindow,
  effectiveItemCount,
  shouldLoadMore,
} from './virtual-grid';

const props = withDefaults(
  defineProps<{
    /** Items to render (the already-loaded page set). */
    items: MediaItem[];
    /** Full server result count. When set, the grid is sized to this up front so
     *  the page length is final immediately and not-yet-loaded rows render as
     *  skeletons until scrolled into view (on-demand paging fills them in). */
    total?: number | null;
    /** Initial load — show skeleton rows instead of cards. */
    loading?: boolean;
    /** Appending a further page (controls the bottom loading row). */
    loadingMore?: boolean;
    /** More items remain — enables the infinite-scroll sentinel. */
    hasMore?: boolean;
    /** Min card width (px). Overrides the `cardSize` preference when set. */
    cardSize?: number;
    /** Skeleton cards shown during the initial load. */
    skeletonCount?: number;
    /** Extra rows rendered above/below the visible band. */
    overscan?: number;
    /** Admin opt-in (U5): render each card's "Match" action + forward `match`. */
    canMatch?: boolean;
  }>(),
  { loading: false, loadingMore: false, hasMore: false, skeletonCount: 18, overscan: 2, canMatch: false },
);

const emit = defineEmits<{
  (e: 'load-more'): void;
  /** The absolute index window now in view (incl. overscan). The host loads any
   *  pages covering it — this is what fills the pre-sized grid after an A-Z jump,
   *  where `load-more` (append-at-end) can't reach the jumped-to offset. */
  (e: 'need-range', startIndex: number, endIndex: number): void;
  (e: 'play', item: MediaItem): void;
  (e: 'watchlist', item: MediaItem): void;
  (e: 'info', item: MediaItem): void;
  (e: 'match', item: MediaItem): void;
  (e: 'mark-watched', item: MediaItem): void;
  (e: 'refresh', item: MediaItem): void;
  (e: 'choose-poster', item: MediaItem): void;
  (e: 'remove', item: MediaItem): void;
}>();

defineSlots<{
  /** Override the per-item card. Receives the item + its absolute index. */
  card?: (props: { item: MediaItem; index: number }) => unknown;
  /** Replace the empty state. */
  empty?: () => unknown;
}>();

const prefs = usePreferencesStore();
const cardSize = computed(() => props.cardSize ?? prefs.cardSize ?? 200);

const sizerEl = ref<HTMLElement | null>(null);
const sentinelEl = ref<HTMLElement | null>(null);

// --- measurement (all guarded; stays at defaults under jsdom/SSR) ---
const containerWidth = ref(0);
const viewportHeight = ref(0);
const scrollTop = ref(0); // grid-top scrolled above viewport top (≥ 0)

// Throttle scroll measurements to avoid calling getBoundingClientRect on every
// scroll event (which can fire hundreds of times per second). We use a timestamp
// check rather than rAF because Firefox aggressively throttles rAF during
// scrolling, causing the window position to "freeze" visually.
let lastScrollMeasureTime = 0;
let trailingScrollTimer: ReturnType<typeof setTimeout> | null = null;
const SCROLL_MEASURE_THROTTLE_MS = 16;

function measure(): void {
  const el = sizerEl.value;
  if (!el || typeof el.getBoundingClientRect !== 'function') return;
  const rect = el.getBoundingClientRect();
  if (rect.width > 0) containerWidth.value = rect.width;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
  if (vh > 0) viewportHeight.value = vh;
  scrollTop.value = Math.max(0, -rect.top);
}

// Throttled scroll handler — at most one measure() per SCROLL_MEASURE_THROTTLE_MS,
// leading-edge. A trailing-edge measure() is also scheduled so the FINAL scroll
// position within (or right after) a throttle window is never dropped — without
// this, a scroll event that lands inside the throttle window and is the last one
// fired (e.g. scrolling stops immediately after) would never get measured, leaving
// the virtualization window stale/frozen at an intermediate position.
function throttledMeasure(): void {
  const now = performance.now();
  if (now - lastScrollMeasureTime >= SCROLL_MEASURE_THROTTLE_MS) {
    lastScrollMeasureTime = now;
    if (trailingScrollTimer !== null) {
      clearTimeout(trailingScrollTimer);
      trailingScrollTimer = null;
    }
    measure();
    return;
  }
  // Inside the throttle window — schedule (or refresh) a trailing call so the
  // last position still gets measured once the window elapses.
  if (trailingScrollTimer !== null) clearTimeout(trailingScrollTimer);
  const remaining = SCROLL_MEASURE_THROTTLE_MS - (now - lastScrollMeasureTime);
  trailingScrollTimer = setTimeout(
    () => {
      trailingScrollTimer = null;
      lastScrollMeasureTime = performance.now();
      measure();
    },
    Math.max(0, remaining),
  );
}

// rAF-coalesced scroll/resize so we measure at most once per frame.
let frame = 0;
function scheduleMeasure(): void {
  if (frame) return;
  const raf =
    typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb: FrameRequestCallback) => setTimeout(() => cb(0), 16) as unknown as number;
  frame = raf(() => {
    frame = 0;
    measure();
  });
}

// --- derived layout ---
const columns = computed(() => computeColumns(containerWidth.value, cardSize.value, COL_GAP));
const rowHeight = computed(() =>
  computeRowHeight(computeCardWidth(containerWidth.value, columns.value, COL_GAP)),
);

/** Virtualize only once we have real measurements; otherwise render everything. */
const virtualized = computed(() => containerWidth.value > 0 && rowHeight.value > 0);

/** Sizing count: the server `total` when known (so the page is its final length
 *  up front), else the loaded count. */
const effectiveCount = computed(() => effectiveItemCount(props.items.length, props.total));

const windowResult = computed(() =>
  computeWindow({
    scrollTop: scrollTop.value,
    viewportHeight: viewportHeight.value,
    rowHeight: rowHeight.value,
    columns: columns.value,
    itemCount: effectiveCount.value,
    overscan: props.overscan,
  }),
);

const visibleItems = computed(() => {
  if (!virtualized.value) {
    return props.items.map((item, index) => ({ item: item as MediaItem | null, index }));
  }
  const { startIndex, endIndex } = windowResult.value;
  const out: { item: MediaItem | null; index: number }[] = [];
  // Indices past the loaded set render as skeletons (pre-sized grid); they fill
  // in once on-demand paging fetches them.
  for (let i = startIndex; i < endIndex; i++) out.push({ item: props.items[i] ?? null, index: i });
  return out;
});

// On-demand paging for the pre-sized grid: when the rendered window reaches the
// loaded edge, ask the host for the next page. The bottom sentinel can't drive
// this once the sizer is the full `total` height (it only fires at the very end).
watch(
  () =>
    [windowResult.value.endIndex, props.items.length, props.hasMore, props.loading, props.loadingMore] as const,
  ([endIndex, loaded, hasMore, loading, loadingMore]) => {
    if (virtualized.value && shouldLoadMore(endIndex, loaded, { hasMore, loading, loadingMore })) {
      emit('load-more');
    }
  },
);

// Random-access paging: emit the visible window so the host can load whatever
// pages it covers — works for both scrolling AND the A-Z jump (load-more only
// appends at the end and can't fill a jumped-to offset). Debounced so a fast
// scroll/jump fetches the SETTLED window, not every page flown past.
let needRangeTimer: ReturnType<typeof setTimeout> | undefined;
watch(
  () => [virtualized.value, windowResult.value.startIndex, windowResult.value.endIndex] as const,
  ([isVirtual, startIndex, endIndex]) => {
    if (!isVirtual || endIndex <= startIndex) return;
    clearTimeout(needRangeTimer);
    needRangeTimer = setTimeout(() => emit('need-range', startIndex, endIndex), 120);
  },
  { immediate: true },
);

const gridStyle = computed(() => ({
  gridTemplateColumns: virtualized.value
    ? `repeat(${columns.value}, minmax(0, 1fr))`
    : `repeat(auto-fill, minmax(${cardSize.value}px, 1fr))`,
}));

const sizerStyle = computed(() =>
  virtualized.value ? { height: `${windowResult.value.totalHeight}px` } : {},
);

const innerStyle = computed(() =>
  virtualized.value
    ? { position: 'absolute' as const, top: '0', left: '0', right: '0', transform: `translateY(${windowResult.value.padTop}px)` }
    : {},
);

const skeletonStyle = computed(() => ({
  gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize.value}px, 1fr))`,
}));

// --- back to top ---
const showBackToTop = computed(() => virtualized.value && scrollTop.value > viewportHeight.value * 1.5);
function backToTop(): void {
  if (typeof window === 'undefined') return;
  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo?.({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}

/**
 * Scroll the window so the row containing `index` sits at the top — the A-Z
 * jump rail drives this with a letter's offset. Works for any index in the
 * pre-sized grid (on-demand paging fills the destination once it's in view).
 */
function scrollToIndex(index: number): void {
  if (typeof window === 'undefined' || !sizerEl.value) return;
  const cols = Math.max(1, columns.value);
  const rowY = Math.floor(Math.max(0, index) / cols) * rowHeight.value;
  const sizerTop = window.scrollY + sizerEl.value.getBoundingClientRect().top;
  // Instant, not smooth: an A-Z jump can span thousands of rows — animating
  // through them is janky and would fetch every page flown past. Jump straight
  // to the target so a single settled-window `need-range` loads that letter.
  window.scrollTo?.({ top: Math.max(0, sizerTop + rowY), behavior: 'auto' });
}
defineExpose({ scrollToIndex });

// --- infinite scroll ---
let io: IntersectionObserver | null = null;
function attachSentinel(): void {
  if (io || typeof IntersectionObserver === 'undefined') return;
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting) && props.hasMore && !props.loading && !props.loadingMore) {
        emit('load-more');
      }
    },
    { rootMargin: '400px 0px' },
  );
  if (sentinelEl.value) io.observe(sentinelEl.value);
}
function detachSentinel(): void {
  io?.disconnect();
  io = null;
}

// Re-observe when the sentinel mounts/unmounts (it only exists while hasMore).
watch(
  () => sentinelEl.value,
  (el) => {
    detachSentinel();
    if (el) {
      attachSentinel();
      scheduleMeasure();
    }
  },
);

// --- ResizeObserver on the sizer (re-attached when it mounts) ---
let ro: ResizeObserver | null = null;
function attachResizeObserver(): void {
  if (ro || typeof ResizeObserver === 'undefined' || !sizerEl.value) return;
  ro = new ResizeObserver(scheduleMeasure);
  ro.observe(sizerEl.value);
}
function detachResizeObserver(): void {
  ro?.disconnect();
  ro = null;
}

// The sizer only exists once items render (the skeleton/empty branches have
// none), so re-attach the RO + remeasure whenever it mounts — without this a
// container-width change that isn't a window resize would never re-window.
watch(
  () => sizerEl.value,
  (el) => {
    detachResizeObserver();
    if (el) {
      attachResizeObserver();
      scheduleMeasure();
    }
  },
);

onMounted(() => {
  measure();
  if (typeof window !== 'undefined') {
    // Throttle scroll measurements to avoid calling getBoundingClientRect on
    // every scroll event. The throttle uses a timestamp (not rAF) because
    // Firefox aggressively throttles rAF during scrolling, which caused the
    // window to visually "freeze". Resize stays rAF-coalesced (it can fire in
    // bursts and isn't latency-critical).
    window.addEventListener('scroll', throttledMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure, { passive: true });
  }
  attachResizeObserver();
  attachSentinel();
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', throttledMeasure);
    window.removeEventListener('resize', scheduleMeasure);
  }
  if (trailingScrollTimer !== null) {
    clearTimeout(trailingScrollTimer);
    trailingScrollTimer = null;
  }
  if (frame) {
    if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(frame);
    else clearTimeout(frame);
    frame = 0;
  }
  clearTimeout(needRangeTimer);
  detachResizeObserver();
  detachSentinel();
});

// Item-count changes (a new page appended) can shift total height — remeasure.
watch(
  () => props.items.length,
  () => nextTick(scheduleMeasure),
);
</script>

<template>
  <div class="media-grid-root">
    <!-- initial load -->
    <div
      v-if="loading && items.length === 0"
      class="media-grid media-grid--skeleton"
      :style="skeletonStyle"
      role="status"
      aria-busy="true"
      aria-label="Loading media"
    >
      <div v-for="n in skeletonCount" :key="n" class="skel-card" aria-hidden="true">
        <div class="skel-poster" />
        <div class="skel-title" />
        <div class="skel-sub" />
      </div>
    </div>

    <!-- empty -->
    <div v-else-if="items.length === 0" class="media-grid-empty" role="status">
      <slot name="empty">
        <Icon name="film" class="media-grid-empty__icon" />
        <p class="media-grid-empty__title">No media found</p>
        <p class="media-grid-empty__hint">Try adjusting your filters.</p>
      </slot>
    </div>

    <!-- virtualized grid -->
    <template v-else>
      <div ref="sizerEl" class="media-grid-sizer" :style="sizerStyle">
        <div class="media-grid" :style="[gridStyle, innerStyle]">
          <template v-for="entry in visibleItems" :key="entry.item?.id ?? `skel-${entry.index}`">
            <slot v-if="entry.item" name="card" :item="entry.item" :index="entry.index">
              <MediaCard
                :item="entry.item"
                :can-match="canMatch"
                @play="emit('play', entry.item)"
                @watchlist="emit('watchlist', entry.item)"
                @info="emit('info', entry.item)"
                @match="emit('match', entry.item)"
                @mark-watched="emit('mark-watched', entry.item)"
                @refresh="emit('refresh', entry.item)"
                @choose-poster="emit('choose-poster', entry.item)"
                @remove="emit('remove', entry.item)"
              />
            </slot>
            <!-- not-yet-loaded index in the pre-sized grid -->
            <div v-else class="skel-card" aria-hidden="true">
              <div class="skel-poster" />
              <div class="skel-title" />
              <div class="skel-sub" />
            </div>
          </template>
        </div>
      </div>

      <div
        v-if="loadingMore"
        class="media-grid-more"
        role="status"
        aria-live="polite"
      >
        <span class="media-grid-more__spinner" aria-hidden="true" />
        Loading more…
      </div>

      <div v-if="hasMore && !loadingMore" ref="sentinelEl" class="media-grid-sentinel" aria-hidden="true" />
    </template>

    <Transition name="media-grid-fade">
      <button
        v-if="showBackToTop"
        type="button"
        class="media-grid-top"
        aria-label="Back to top"
        @click="backToTop"
      >
        <Icon name="arrow-up" />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.media-grid-root {
  position: relative;
  width: 100%;
}

.media-grid-sizer {
  position: relative;
  width: 100%;
}

.media-grid {
  display: grid;
  /* ROW_GAP / COL_GAP in virtual-grid.ts mirror these tokens (24px / 20px). */
  gap: var(--space-6, 24px) var(--space-5, 20px);
  width: 100%;
}

/* --- skeleton rows: same rhythm as real cards, no layout shift --- */
.skel-card {
  display: block;
}
.skel-poster {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg, 12px);
  background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 37%, var(--surface-2) 63%);
  background-size: 400% 100%;
  animation: media-grid-shimmer 1.4s ease infinite;
}
.skel-title,
.skel-sub {
  height: 0.85em;
  margin-top: var(--space-3, 12px);
  border-radius: var(--radius-sm, 6px);
  background: var(--surface-2);
  animation: media-grid-shimmer 1.4s ease infinite;
  background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 37%, var(--surface-2) 63%);
  background-size: 400% 100%;
}
.skel-title { width: 75%; }
.skel-sub { width: 45%; margin-top: var(--space-2, 8px); height: 0.7em; }

@keyframes media-grid-shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}

/* --- empty state --- */
.media-grid-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  padding: var(--space-16, 64px) var(--space-6, 24px);
  color: var(--text-subtle, #a1a1aa);
  text-align: center;
}
.media-grid-empty__icon {
  width: 40px;
  height: 40px;
  opacity: 0.5;
  margin-bottom: var(--space-2, 8px);
}
.media-grid-empty__title {
  font-family: var(--font-display, inherit);
  font-weight: 600;
  font-size: var(--text-md, 1.05rem);
  color: var(--text-muted, #cbd5e1);
}
.media-grid-empty__hint {
  font-size: var(--text-sm, 0.875rem);
  opacity: 0.8;
}

/* --- load-more row --- */
.media-grid-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  padding: var(--space-6, 24px);
  color: var(--text-subtle, #a1a1aa);
  font-size: var(--text-sm, 0.875rem);
}
.media-grid-more__spinner {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full, 999px);
  border: 2px solid var(--border, #27272a);
  border-top-color: var(--accent, #f5a524);
  animation: media-grid-spin 0.7s linear infinite;
}
@keyframes media-grid-spin {
  to { transform: rotate(360deg); }
}

.media-grid-sentinel {
  height: 1px;
  width: 100%;
}

/* --- back to top --- */
.media-grid-top {
  position: fixed;
  right: var(--space-6, 24px);
  bottom: var(--space-6, 24px);
  z-index: 30;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full, 999px);
  background: var(--surface-glass-strong, rgba(20, 20, 28, 0.85));
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-strong, #3f3f46);
  color: var(--text, #e4e4e7);
  box-shadow: var(--shadow-3, 0 8px 24px rgba(0, 0, 0, 0.4));
  cursor: pointer;
  transition: transform var(--dur-base, 0.18s) var(--ease-out, ease), background var(--dur-base, 0.18s);
}
.media-grid-top:hover {
  background: var(--accent, #f5a524);
  color: var(--accent-contrast, #1a1205);
  transform: translateY(-2px);
}
.media-grid-top:focus-visible {
  outline: none;
  box-shadow: var(--shadow-3, 0 8px 24px rgba(0, 0, 0, 0.4)), 0 0 0 3px var(--accent-ring);
}
.media-grid-top :deep(svg) {
  width: 20px;
  height: 20px;
}

.media-grid-fade-enter-active,
.media-grid-fade-leave-active {
  transition: opacity var(--dur-base, 0.18s) var(--ease-out, ease), transform var(--dur-base, 0.18s);
}
.media-grid-fade-enter-from,
.media-grid-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .skel-poster,
  .skel-title,
  .skel-sub,
  .media-grid-more__spinner {
    animation: none;
  }
  .media-grid-fade-enter-active,
  .media-grid-fade-leave-active {
    transition: none;
  }
}
</style>
