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
      {{ b.label }}
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
  align-items: center;
  gap: 1px;
  padding: var(--space-2) 2px;
  border-radius: var(--radius-full);
  background: var(--surface-glass, rgba(20, 20, 20, 0.4));
  backdrop-filter: blur(8px);
  font-size: var(--text-2xs, 0.7rem);
  font-weight: var(--font-semibold);
  font-variant-numeric: tabular-nums;
  user-select: none;
  max-height: 80vh;
  overflow-y: auto;
}
.index-rail__btn,
[class$="__btn"] {
  width: 1.5em;
  height: 1.4em;
  display: grid;
  place-items: center;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition:
    color var(--dur-fast) var(--ease-out),
    background var(--dur-fast) var(--ease-out);
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
@media (max-width: 640px) {
  .index-rail {
    display: none;
  }
}
</style>
