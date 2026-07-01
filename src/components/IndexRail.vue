<script setup lang="ts">
import type { IndexBucket } from '../api/index-buckets';

withDefaults(
  defineProps<{
    buckets: IndexBucket[];
    cssPrefix?: string;
    navLabel?: string;
  }>(),
  {
    cssPrefix: 'index-rail',
    navLabel: 'Jump to a bucket',
  },
);
const emit = defineEmits<{ (e: 'jump', offset: number): void }>();
</script>

<template>
  <nav class="index-rail" :aria-label="navLabel">
    <button
      v-for="b in buckets"
      :key="b.key"
      type="button"
      :class="[`${cssPrefix}__btn`, { 'is-empty': b.count === 0 }]"
      :disabled="b.count === 0"
      :aria-label="b.ariaLabel ?? `Jump to ${b.label} (${b.count})`"
      @click="emit('jump', b.offset)"
    >
      <span class="index-rail__label">{{ b.label }}</span>
      <!-- Revealed on hover/focus: the FULL label as a pill sliding out to the
           left, so labels wider than the rail (years, genres, runtime ranges)
           are readable without permanently widening the rail. -->
      <span class="index-rail__full" aria-hidden="true">{{ b.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.index-rail {
  position: fixed;
  right: var(--space-1);
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
  padding: var(--space-2) 2px;
  border-radius: var(--radius-lg);
  background: var(--surface-glass, rgba(20, 20, 20, 0.4));
  backdrop-filter: blur(8px);
  font-size: var(--text-2xs, 0.7rem);
  font-weight: var(--font-semibold);
  font-variant-numeric: tabular-nums;
  user-select: none;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: visible;
}
.index-rail__btn,
[class$="__btn"] {
  position: relative;
  min-width: 1.5em;
  /* Fit short labels (letters, 4-digit years, ratings) fully; longer labels
     (genres, "1-30min") truncate here and reveal in full on hover/focus. */
  max-width: 5em;
  height: 1.4em;
  padding: 0 3px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition:
    color var(--dur-fast) var(--ease-out),
    background var(--dur-fast) var(--ease-out);
}
.index-rail__label {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.index-rail__btn:hover:not(:disabled),
[class$="__btn"]:hover:not(:disabled) {
  color: var(--accent-text);
  background: var(--surface-2, rgba(255, 255, 255, 0.08));
}
.index-rail__btn:focus-visible,
[class$="__btn"]:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}
.index-rail__btn.is-empty,
[class$="__btn"].is-empty {
  color: var(--text-faint, rgba(255, 255, 255, 0.25));
  cursor: default;
}

/* The full-label pill: hidden by default, slides out to the left on hover/focus
   so the complete text is readable even when the button clips it. */
.index-rail__full {
  position: absolute;
  right: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  background: var(--surface-3, rgba(20, 20, 20, 0.92));
  color: var(--text);
  white-space: nowrap;
  box-shadow: var(--shadow-2);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-fast) var(--ease-out);
}
.index-rail__btn:hover:not(:disabled) .index-rail__full,
.index-rail__btn:focus-visible .index-rail__full {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .index-rail__btn,
  [class$="__btn"],
  .index-rail__full {
    transition: none;
  }
}
@media (max-width: 640px) {
  .index-rail {
    display: none;
  }
}
</style>
