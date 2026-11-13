<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Spinner (R0.4e) — indeterminate progress. role=status + aria-label; spin slows
 * (not stops) under reduced-motion so it stays perceivable.
 */
import { computed } from 'vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';

/** Named sizes (UI-27). Numbers are px; other strings pass through as a CSS length. */
export type SpinnerSize = 'xs' | 'sm' | 'md';
const SIZE_MAP: Record<SpinnerSize, string> = { xs: '0.75rem', sm: '1rem', md: '1.5rem' };

const props = defineProps<{ size?: SpinnerSize | number | (string & {}); label?: string }>();
const { t } = useMessages();
const sizeValue = computed(() =>
  props.size === undefined
    ? undefined
    : typeof props.size === 'number'
      ? `${props.size}px`
      : (SIZE_MAP as Record<string, string>)[props.size] ?? props.size,
);
</script>

<template>
  <span class="phlix-spinner" role="status" :aria-label="label ?? t('common.loading')" :style="sizeValue ? { fontSize: sizeValue } : undefined">
    <Icon name="spinner" class="phlix-spinner__icon" />
  </span>
</template>

<style scoped>
.phlix-spinner { display: inline-flex; color: var(--accent-text); }
.phlix-spinner__icon { animation: phlix-spin 0.7s linear infinite; }
@keyframes phlix-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .phlix-spinner__icon { animation-duration: 1.6s; }
}
</style>
