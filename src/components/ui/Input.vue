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
import { computed, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    label?: string;
    placeholder?: string;
    type?: string;
    min?: string | number;
    max?: string | number;
    disabled?: boolean;
    /**
     * ui__webux M19 — inline validation message. When set, the field renders
     * invalid and the message is wired to the input via aria-invalid +
     * aria-describedby and announced through an aria-live region. Same channel
     * AuthField ships; pages can now fail a field in place instead of routing
     * the failure to the toast stack.
     */
    error?: string | null;
  }>(),
  { type: 'text', disabled: false, error: null },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>();

const id = useId();
const msgId = computed(() => `${id}-msg`);

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (props.type !== 'number') {
    emit('update:modelValue', target.value);
    return;
  }
  // UI-m23 — clearing the field must stay "no value": an empty number input
  // emits '' rather than Number('') = 0, so optional caps (bandwidth), the
  // page-side `!== ''` guards and the placeholder all behave as written.
  // Consumers already parse '' as null — see parseNumericInput.
  emit('update:modelValue', target.value === '' ? '' : Number(target.value));
}
</script>

<template>
  <div class="phlix-input" :class="{ 'is-disabled': disabled, 'is-invalid': !!error }">
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
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error ? msgId : undefined"
      @input="onInput"
    />
    <p :id="msgId" class="phlix-input__error" aria-live="polite">{{ error || '' }}</p>
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
.phlix-input.is-invalid .phlix-input__field { border-color: color-mix(in srgb, var(--error) 60%, var(--border)); }
.phlix-input.is-invalid .phlix-input__field:focus-visible { box-shadow: 0 0 0 3px var(--error-bg); }
.phlix-input__error {
  min-height: 1em;
  margin: 0;
  font-size: var(--text-xs);
  line-height: 1.2;
  color: var(--error);
}
/* Suppress number spinners while keeping keyboard arrows functional */
.phlix-input__field[type='number']::-webkit-outer-spin-button,
.phlix-input__field[type='number']::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.phlix-input__field[type='number'] { -moz-appearance: textfield; }
@media (prefers-reduced-motion: reduce) {
  .phlix-input__field { transition: none; }
}
  /* CU-076 (review ui__crossfe): color-mix() needs Chrome/Edge 111+ (2023);
     Tizen 6.5's Chromium and other declared-floor engines predate it, where the
     declaration would be DROPPED and the surface degrade to the initial value.
     Static approximations from the default (Nocturne) palette, per the repo's
     own @supports-not doctrine (cf. the dvh block in Player.vue). Themed
     consumers get the default-palette approximation on older engines. */
@supports not (color: color-mix(in srgb, red, blue)) {
  .phlix-input.is-invalid .phlix-input__field { border-color: rgb(160, 71, 62); }
}

</style>
