<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Input — accessible text/number input field (R0.4).
 *
 *   <Input v-model="name" label="Name" placeholder="e.g. Weekday Evenings" />
 *   <Input v-model="count" type="number" min="1" max="10" />
 */
import { useId } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    label?: string;
    placeholder?: string;
    type?: string;
    min?: string | number;
    max?: string | number;
    disabled?: boolean;
  }>(),
  { type: 'text', disabled: false },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>();

const id = useId();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value);
}
</script>

<template>
  <div class="phlix-input" :class="{ 'is-disabled': disabled }">
    <label v-if="label" :for="id" class="phlix-input__label">{{ label }}</label>
    <input
      :id="id"
      class="phlix-input__field"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.phlix-input { display: inline-flex; flex-direction: column; gap: var(--space-1); }
.phlix-input.is-disabled { opacity: 0.5; }
.phlix-input__label { font-size: var(--text-sm); font-weight: var(--font-medium); color: var(--text); }
.phlix-input__field {
  display: block;
  width: 100%;
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.phlix-input__field::placeholder { color: var(--text-subtle); }
.phlix-input__field:hover:not(:disabled) { border-color: var(--border-strong); }
.phlix-input__field:focus-visible { outline: none; border-color: var(--accent-ring); box-shadow: 0 0 0 3px var(--accent-soft); }
.phlix-input__field:disabled { cursor: not-allowed; }
/* Suppress number spinners while keeping keyboard arrows functional */
.phlix-input__field[type='number']::-webkit-outer-spin-button,
.phlix-input__field[type='number']::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.phlix-input__field[type='number'] { -moz-appearance: textfield; }
@media (prefers-reduced-motion: reduce) {
  .phlix-input__field { transition: none; }
}
</style>
