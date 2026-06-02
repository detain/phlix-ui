<script setup lang="ts">
/**
 * Kbd (R0.4e) — keyboard key hint. Pass `keys` (string | string[]) or default
 * slot. Each key renders as a styled <kbd> (mono, raised). Multiple keys are
 * shown as a chord/sequence.
 */
import { computed } from 'vue';

const props = defineProps<{ keys?: string | string[] }>();
const list = computed(() => (props.keys === undefined ? [] : Array.isArray(props.keys) ? props.keys : [props.keys]));
</script>

<template>
  <span class="phlix-kbd">
    <template v-if="list.length"><kbd v-for="(k, i) in list" :key="i" class="phlix-kbd__key">{{ k }}</kbd></template>
    <kbd v-else class="phlix-kbd__key"><slot /></kbd>
  </span>
</template>

<style scoped>
.phlix-kbd { display: inline-flex; align-items: center; gap: 0.25em; }
.phlix-kbd__key {
  display: inline-grid;
  place-items: center;
  min-width: 1.6em;
  height: 1.7em;
  padding: 0 0.45em;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: 1;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-bottom-width: 2px;
  border-radius: var(--radius-sm);
}
</style>
