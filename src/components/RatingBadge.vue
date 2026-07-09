<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * RatingBadge — star-based rating display (P1-S7).
 *
 * Shows a 0-10 rating as filled/empty stars (default 5-star display).
 * Example: 7.5/10 → ★★★★☆ (4.5 filled out of 5)
 *
 * When `rating` is null, shows "No rating" in gray italic.
 *
 * Props:
 *   rating    — 0-10 score, or null for no rating
 *   maxStars  — number of stars to display (default 5)
 *   size      — 'sm' | 'md' | 'lg' (default 'md')
 */
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    /** 0-10 rating score, or null if unrated */
    rating: number | null;
    /** Number of stars to display (default 5) */
    maxStars?: number;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
  }>(),
  { maxStars: 5, size: 'md' },
);

/** Number of filled stars (0 to maxStars) */
const filledStars = computed(() => {
  if (props.rating === null) return 0;
  // Convert 0-10 scale to 0-maxStars scale
  return Math.round((props.rating / 10) * props.maxStars!);
});

/** Whether we have a rating to display */
const hasRating = computed(() => props.rating !== null);

/** Size class mapping */
const sizeClass = computed(() => `rating-badge--${props.size}`);

/** Accessibility label */
const ariaLabel = computed(() => {
  if (props.rating === null) return 'No rating';
  return `${props.rating.toFixed(1)} out of 10`;
});
</script>

<template>
  <div
    class="rating-badge"
    :class="[sizeClass, { 'is-unrated': !hasRating }]"
    :aria-label="ariaLabel"
    :role="hasRating ? 'img' : undefined"
  >
    <template v-if="hasRating">
      <Icon
        v-for="n in maxStars"
        :key="n"
        name="star"
        class="rating-badge__star"
        :class="{ 'is-filled': n <= filledStars }"
      />
    </template>
    <span v-else class="rating-badge__no-rating">No rating</span>
  </div>
</template>

<style scoped>
.rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.rating-badge__star {
  color: var(--text-subtle);
  transition: color var(--dur-base) var(--ease-out),
              transform var(--dur-fast) var(--ease-spring);
}

.rating-badge__star.is-filled {
  color: var(--accent);
}

.rating-badge__star.is-filled :deep(svg) {
  fill: currentColor;
}

/* Size variants */
.rating-badge--sm :deep(.phlix-icon) {
  font-size: 0.75rem;
}

.rating-badge--md :deep(.phlix-icon) {
  font-size: 1rem;
}

.rating-badge--lg :deep(.phlix-icon) {
  font-size: 1.25rem;
}

/* Unrated state */
.rating-badge.is-unrated .rating-badge__no-rating {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  font-style: italic;
}

@media (prefers-reduced-motion: reduce) {
  .rating-badge__star {
    transition: none;
  }
}
</style>
