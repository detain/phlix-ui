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
import { computed } from 'vue';
import type { MediaItem } from '../types/media-item';
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
  (e: 'retry'): void;
}>();

const isEmpty = computed(() => !props.loading && !props.error && props.items.length === 0);
const collapsed = computed(() => props.hideWhenEmpty && isEmpty.value);
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

    <ul v-else class="media-row__rail" :aria-label="title">
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
        />
      </li>
    </ul>
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
}
</style>
