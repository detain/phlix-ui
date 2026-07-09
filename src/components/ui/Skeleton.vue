<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Skeleton (R0.4e) — loading placeholder. variant text|rect|circle; `lines` for
 * multi-line text. Decorative (aria-hidden); shimmer disabled under reduced-motion.
 */
withDefaults(
  defineProps<{
    variant?: 'text' | 'rect' | 'circle';
    width?: string;
    height?: string;
    radius?: string;
    lines?: number;
  }>(),
  { variant: 'rect', lines: 1 },
);
</script>

<template>
  <div v-if="variant === 'text'" class="phlix-skel-text" aria-hidden="true">
    <span
      v-for="n in lines"
      :key="n"
      class="phlix-skel phlix-skel--text"
      :style="{ width: n === lines && lines > 1 ? '60%' : width }"
    />
  </div>
  <span
    v-else
    class="phlix-skel"
    :class="`phlix-skel--${variant}`"
    aria-hidden="true"
    :style="{ width, height, borderRadius: radius }"
  />
</template>

<style scoped>
.phlix-skel {
  display: block;
  background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 37%, var(--surface-2) 63%);
  background-size: 400% 100%;
  animation: phlix-skel-shimmer 1.4s ease infinite;
  border-radius: var(--radius-md);
}
.phlix-skel--rect { width: 100%; height: 1rem; }
.phlix-skel--circle { border-radius: var(--radius-full); aspect-ratio: 1; width: 2.5rem; }
.phlix-skel--text { height: 0.85em; border-radius: var(--radius-sm); margin-block: 0.25em; }
.phlix-skel-text { width: 100%; }
@keyframes phlix-skel-shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
@media (prefers-reduced-motion: reduce) {
  .phlix-skel { animation: none; background: var(--surface-2); }
}
</style>
