<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * UserRatingPicker — interactive star rating input (P1-S7).
 *
 * Allows users to set a 0-10 star rating (displayed as 5 stars by default).
 *
 * Features:
 *   - Hover preview: hovering over star N sets a temporary value
 *   - Mouse leave reverts to the current saved rating
 *   - Click to confirm and persist the rating
 *   - Calls POST /api/v1/media/{id}/ratings when rating is set
 *   - Shows lock icon + "Sign in to rate" when not authenticated
 *
 * Props:
 *   modelValue — current rating (0-10) or null if unrated
 *   mediaId   — the media item ID to submit ratings for
 *   size      — number of stars to display (default 5)
 *   readonly  — disable interaction (default false)
 *
 * Emits:
 *   update:modelValue — when user confirms a rating
 */
import { ref, computed, inject } from 'vue';
import Icon from './Icon.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { ApiClient } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';
import type { PhlixAppConfig } from '../app/types';

const props = withDefaults(
  defineProps<{
    /** Current user rating (0-10), or null if not rated */
    modelValue: number | null;
    /** Media item ID for the rating API */
    mediaId: string;
    /** Number of stars to display (default 5) */
    size?: number;
    /** Disable interaction */
    readonly?: boolean;
  }>(),
  { size: 5, readonly: false },
);

const emit = defineEmits<{
  (e: 'update:modelValue', rating: number | null): void;
}>();

const auth = useAuthStore();
const toast = useToastStore();
const phlixConfig = inject<PhlixAppConfig | null>('phlixConfig', null);

/** Temporary hover rating (null means show current rating) */
const hoverRating = ref<number | null>(null);

/** Whether the user is currently hovering */
const isHovering = ref(false);

/** API client for rating submissions */
const ratingClient = new ApiClient({
  baseUrl: phlixConfig?.apiBase ?? '',
  tokenStore: new LocalStorageTokenStore(),
});

/**
 * The rating to display:
 * - If hovering, show the hover rating (converted to 0-10 scale)
 * - Otherwise, show the saved modelValue
 */
const displayRating = computed(() => {
  if (!isHovering.value || hoverRating.value === null) {
    return props.modelValue;
  }
  // Convert star index (1 to size) to 0-10 scale
  return (hoverRating.value / props.size!) * 10;
});

/** Number of filled stars to display */
const filledStars = computed(() => {
  if (displayRating.value === null) return 0;
  return Math.round((displayRating.value / 10) * props.size!);
});

/** Whether the user is authenticated */
const isAuthenticated = computed(() => auth.isLoggedIn);

/** Whether we're currently submitting a rating */
const isSubmitting = ref(false);

/**
 * Handle mouse enter on a star - sets the hover preview
 */
function onStarEnter(starIndex: number): void {
  if (props.readonly || !isAuthenticated.value) return;
  isHovering.value = true;
  // starIndex is 1-based (hovering over star N)
  hoverRating.value = starIndex;
}

/**
 * Handle mouse leave - reverts to saved rating
 */
function onMouseLeave(): void {
  isHovering.value = false;
  hoverRating.value = null;
}

/**
 * Handle click on a star - confirms the rating
 */
async function onStarClick(starIndex: number): Promise<void> {
  if (props.readonly || !isAuthenticated.value || isSubmitting.value) return;

  // Convert star index to 0-10 rating
  const rating = Math.round((starIndex / props.size!) * 10 * 10) / 10;

  isSubmitting.value = true;
  try {
    await ratingClient.post(`/api/v1/media/${encodeURIComponent(props.mediaId)}/ratings`, {
      source: 'user',
      type: 'user',
      score: rating,
    });
    emit('update:modelValue', rating);
    toast.success('Rating saved');
  } catch {
    toast.error('Failed to save rating');
  } finally {
    isSubmitting.value = false;
    isHovering.value = false;
    hoverRating.value = null;
  }
}
</script>

<template>
  <div
    class="user-rating-picker"
    :class="{ 'is-readonly': readonly }"
    @mouseleave="onMouseLeave"
  >
    <!-- Not authenticated state -->
    <template v-if="!isAuthenticated">
      <Icon name="lock" class="user-rating-picker__lock" />
      <span class="user-rating-picker__signin">Sign in to rate</span>
    </template>

    <!-- Rating stars -->
    <template v-else>
      <button
        v-for="n in size"
        :key="n"
        type="button"
        class="user-rating-picker__star"
        :class="{
          'is-filled': n <= filledStars,
          'is-hovered': isHovering && n <= hoverRating!,
        }"
        :disabled="readonly || isSubmitting"
        :aria-label="`Rate ${n} out of ${size} stars`"
        @mouseenter="onStarEnter(n)"
        @click="onStarClick(n)"
      >
        <Icon name="star" />
      </button>

      <!-- Loading indicator -->
      <Icon
        v-if="isSubmitting"
        name="spinner"
        class="user-rating-picker__spinner"
      />
    </template>
  </div>
</template>

<style scoped>
.user-rating-picker {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.user-rating-picker__star {
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: var(--text-subtle);
  transition: color var(--dur-base) var(--ease-out),
              transform var(--dur-fast) var(--ease-spring);
}

.user-rating-picker__star:disabled {
  cursor: default;
  opacity: 0.6;
}

.user-rating-picker__star:not(:disabled):hover {
  transform: scale(1.15);
}

.user-rating-picker__star.is-filled {
  color: var(--accent);
}

.user-rating-picker__star.is-filled :deep(svg) {
  fill: currentColor;
}

.user-rating-picker__star.is-hovered {
  color: var(--accent);
}

.user-rating-picker__star.is-hovered :deep(svg) {
  fill: currentColor;
}

.user-rating-picker__lock {
  font-size: 0.875rem;
  color: var(--text-subtle);
  margin-right: 4px;
}

.user-rating-picker__signin {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  font-style: italic;
}

.user-rating-picker__spinner {
  font-size: 0.875rem;
  color: var(--accent);
  animation: spin 1s linear infinite;
  margin-left: 4px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.is-readonly .user-rating-picker__star {
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .user-rating-picker__star,
  .user-rating-picker__spinner {
    transition: none;
  }
  .user-rating-picker__spinner {
    animation: none;
  }
}
</style>
