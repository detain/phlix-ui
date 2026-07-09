<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Card (R0.4e) — generic card container. Controls padding via the `padding`
 * prop (default true). Content goes in the default slot. Any `class` passed
 * by the parent is merged onto the root element via Vue 3 attribute inheritance.
 */
withDefaults(
  defineProps<{
    /** When false, padding is removed from the card. */
    padding?: boolean;
  }>(),
  { padding: true },
);
</script>

<template>
  <div class="phlix-card" :class="{ 'phlix-card--no-padding': !padding }">
    <slot />
  </div>
</template>

<style scoped>
.phlix-card {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}
.phlix-card--no-padding {
  padding: 0;
}
</style>
