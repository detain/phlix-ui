<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * EmptyState (R0.4e) — empty / error / no-results surface. icon + title +
 * description (prop or default slot) + optional #actions slot.
 */
import Icon, { type IconName } from '../Icon.vue';

withDefaults(
  defineProps<{ icon?: IconName; title: string; description?: string }>(),
  { icon: 'film' },
);
</script>

<template>
  <div class="phlix-empty" role="status">
    <span class="phlix-empty__icon"><Icon :name="icon" /></span>
    <h3 class="phlix-empty__title">{{ title }}</h3>
    <p v-if="description || $slots.default" class="phlix-empty__desc"><slot>{{ description }}</slot></p>
    <div v-if="$slots.actions" class="phlix-empty__actions"><slot name="actions" /></div>
  </div>
</template>

<style scoped>
.phlix-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
  padding: var(--space-12) var(--space-6);
  color: var(--text-muted);
}
.phlix-empty__icon {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-full);
  background: var(--surface-2);
  color: var(--text-subtle);
  font-size: 1.6rem;
}
.phlix-empty__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.phlix-empty__desc { max-width: 42ch; font-size: var(--text-sm); }
.phlix-empty__actions { margin-top: var(--space-2); display: flex; gap: var(--space-3); }
</style>
