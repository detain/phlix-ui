<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * LetterRail (P6) — a vertical A-Z (+ `#`) jump rail for long listings, pinned
 * to the right edge. A thin wrapper around IndexRail that maps LetterBucket[]
 * to IndexBucket[]. Each bucket carries the absolute item `offset` of its first
 * title (from `GET /api/v1/media/letter-index`); clicking a non-empty letter
 * emits `jump(offset)` and the host scrolls the pre-sized grid there. Empty
 * buckets render but are disabled, so the full alphabet stays as a stable map.
 */
import { computed } from 'vue';
import IndexRail from './IndexRail.vue';
import type { LetterBucket } from '../api/letter-index';

const props = defineProps<{ letters: LetterBucket[] }>();
const emit = defineEmits<{ (e: 'jump', offset: number): void }>();

function label(letter: string): string {
  return letter === '#' ? 'non-alphabetic titles' : `titles starting with ${letter}`;
}

const buckets = computed(() =>
  props.letters.map((l) => ({
    key: l.letter,
    label: l.letter,
    offset: l.offset,
    count: l.count,
    ariaLabel: `Jump to ${label(l.letter)} (${l.count})`,
  })),
);
</script>

<template>
  <IndexRail
    :buckets="buckets"
    css-prefix="letter-rail"
    nav-label="Jump to a letter"
    @jump="(offset) => emit('jump', offset)"
  />
</template>
