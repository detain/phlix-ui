<script setup lang="ts">
/**
 * LetterRail (P6) — a vertical A-Z (+ `#`) jump rail for long listings, pinned
 * to the right edge. Each bucket carries the absolute item `offset` of its first
 * title (from `GET /api/v1/media/letter-index`); clicking a non-empty letter
 * emits `jump(offset)` and the host scrolls the pre-sized grid there. Empty
 * buckets render but are disabled, so the full alphabet stays as a stable map.
 */
import type { LetterBucket } from '../api/letter-index';

defineProps<{ letters: LetterBucket[] }>();
const emit = defineEmits<{ (e: 'jump', offset: number): void }>();

function label(letter: string): string {
  return letter === '#' ? 'non-alphabetic titles' : `titles starting with ${letter}`;
}
</script>

<template>
  <nav class="letter-rail" aria-label="Jump to a letter">
    <button
      v-for="b in letters"
      :key="b.letter"
      type="button"
      class="letter-rail__btn"
      :class="{ 'is-empty': b.count === 0 }"
      :disabled="b.count === 0"
      :aria-label="`Jump to ${label(b.letter)} (${b.count})`"
      @click="emit('jump', b.offset)"
    >
      {{ b.letter }}
    </button>
  </nav>
</template>

<style scoped>
.letter-rail {
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
}
.letter-rail__btn {
  width: 1.5em;
  height: 1.4em;
  display: grid;
  place-items: center;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition:
    color var(--dur-fast) var(--ease-out),
    background var(--dur-fast) var(--ease-out);
}
.letter-rail__btn:hover:not(:disabled) {
  color: var(--accent-text);
  background: var(--surface-2, rgba(255, 255, 255, 0.08));
}
.letter-rail__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}
.letter-rail__btn.is-empty {
  color: var(--text-faint, rgba(255, 255, 255, 0.25));
  cursor: default;
}

/* The rail is a power-user affordance; hide it where there's no room. */
@media (max-width: 640px) {
  .letter-rail {
    display: none;
  }
}
</style>
