<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Switch — accessible on/off toggle (R0.4b).
 *
 *   <Switch v-model="autoplay" label="Autoplay" />
 *
 * role="switch" + aria-checked. It is a native <button>, so the browser handles
 * Space/Enter activation (→ click) for free — no manual keydown handler, which
 * also avoids any double-toggle. The optional visible label toggles on click and
 * names the control via aria-labelledby. Reduced-motion aware.
 */
import { useId } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    label?: string;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

const id = useId();

// L5: without `label` the control announces itself only as the generic "Toggle"
// fallback below — the visible text disappears but the accessible name must not.
// Loud in dev (house ToastHost guard), silent in prod; the fallback stays so an
// existing consumer never renders an UNNAMED switch.
if (!props.label && import.meta.env?.DEV) {
  console.warn(
    '[phlix/ui] <Switch> rendered without a `label` — screen readers will only hear ' +
      'the generic "Toggle" fallback. Pass `label` (or an explicit accessible name).',
  );
}

function toggle() {
  if (props.disabled) return;
  emit('update:modelValue', !props.modelValue);
}
</script>

<template>
  <span class="phlix-switch" :class="{ 'is-disabled': disabled }">
    <button
      type="button"
      role="switch"
      class="phlix-switch__control"
      :class="{ 'is-on': modelValue }"
      :aria-checked="modelValue"
      :aria-label="label ? undefined : 'Toggle'"
      :aria-labelledby="label ? id : undefined"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="phlix-switch__thumb"></span>
    </button>
    <label v-if="label" :id="id" class="phlix-switch__label" @click="toggle">{{ label }}</label>
  </span>
</template>

<style scoped>
.phlix-switch { display: inline-flex; align-items: center; gap: var(--space-3); }
.phlix-switch.is-disabled { opacity: 0.5; }
.phlix-switch__control {
  --_w: 40px; --_h: 24px; --_pad: 3px;
  position: relative;
  width: var(--_w);
  height: var(--_h);
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background: var(--surface-3);
  border: 1px solid var(--border-strong);
  cursor: pointer;
  transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.phlix-switch__control:disabled { cursor: not-allowed; }
.phlix-switch__control.is-on { background: var(--accent); border-color: transparent; }
.phlix-switch__control:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); }
.phlix-switch__thumb {
  position: absolute;
  top: var(--_pad);
  left: var(--_pad);
  width: calc(var(--_h) - 2 * var(--_pad) - 2px);
  height: calc(var(--_h) - 2 * var(--_pad) - 2px);
  border-radius: 50%;
  background: var(--text);
  box-shadow: var(--shadow-1);
  transition: transform var(--dur-base) var(--ease-spring);
}
.phlix-switch__control.is-on .phlix-switch__thumb {
  transform: translateX(calc(var(--_w) - var(--_h)));
  background: var(--text-on-accent);
}
.phlix-switch__label { font-size: var(--text-sm); color: var(--text); cursor: pointer; user-select: none; }
@media (prefers-reduced-motion: reduce) {
  .phlix-switch__control, .phlix-switch__thumb { transition: none; }
}
</style>
