<script setup lang="ts">
/**
 * Slider — accessible range control (R0.4b).
 *
 * Used for volume, card-size, and as the base interaction for the player
 * scrubber. Full keyboard (Arrow keys step, PageUp/Down jump by 10%, Home/End),
 * pointer drag, role="slider" with aria-valuemin/max/now/valuetext.
 *
 *   <Slider v-model="volume" :min="0" :max="1" :step="0.05" label="Volume" />
 */
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    label?: string;
    /** Maps the value to a spoken/aria string (e.g. percent, timecode). */
    formatValue?: (v: number) => string;
  }>(),
  { min: 0, max: 100, step: 1, disabled: false },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: number): void;
  (e: 'change', v: number): void;
}>();

const trackEl = ref<HTMLElement | null>(null);
const dragging = ref(false);

const percent = computed(() => {
  const span = props.max - props.min || 1;
  return Math.min(100, Math.max(0, ((props.modelValue - props.min) / span) * 100));
});

const valueText = computed(() =>
  props.formatValue ? props.formatValue(props.modelValue) : String(props.modelValue),
);

function clampStep(v: number): number {
  const clamped = Math.min(props.max, Math.max(props.min, v));
  const steps = Math.round((clamped - props.min) / props.step);
  const snapped = props.min + steps * props.step;
  // avoid float drift
  return Math.round(snapped * 1e6) / 1e6;
}

function setValue(v: number, fireChange = false) {
  const next = clampStep(v);
  if (next === props.modelValue) return; // no-op (e.g. arrow/End pressed at a rail)
  emit('update:modelValue', next);
  if (fireChange) emit('change', next);
}

function valueFromClientX(clientX: number): number {
  const el = trackEl.value;
  if (!el) return props.modelValue;
  const rect = el.getBoundingClientRect();
  const ratio = rect.width ? (clientX - rect.left) / rect.width : 0;
  return props.min + ratio * (props.max - props.min);
}

function onPointerdown(e: PointerEvent) {
  if (props.disabled) return;
  (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  dragging.value = true;
  setValue(valueFromClientX(e.clientX));
}
function onPointermove(e: PointerEvent) {
  if (!dragging.value) return;
  setValue(valueFromClientX(e.clientX));
}
function onPointerup(e: PointerEvent) {
  if (!dragging.value) return;
  dragging.value = false;
  (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  emit('change', props.modelValue);
}

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  const big = (props.max - props.min) / 10;
  let handled = true;
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp': setValue(props.modelValue + props.step, true); break;
    case 'ArrowLeft':
    case 'ArrowDown': setValue(props.modelValue - props.step, true); break;
    case 'PageUp': setValue(props.modelValue + big, true); break;
    case 'PageDown': setValue(props.modelValue - big, true); break;
    case 'Home': setValue(props.min, true); break;
    case 'End': setValue(props.max, true); break;
    default: handled = false;
  }
  if (handled) e.preventDefault();
}
</script>

<template>
  <div
    class="phlix-slider"
    :class="{ 'is-disabled': disabled }"
    role="slider"
    :tabindex="disabled ? -1 : 0"
    :aria-label="label"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="modelValue"
    :aria-valuetext="valueText"
    :aria-disabled="disabled || undefined"
    aria-orientation="horizontal"
    @keydown="onKeydown"
  >
    <div
      ref="trackEl"
      class="phlix-slider__track"
      @pointerdown="onPointerdown"
      @pointermove="onPointermove"
      @pointerup="onPointerup"
    >
      <div class="phlix-slider__fill" :style="{ width: percent + '%' }"></div>
      <div class="phlix-slider__thumb" :style="{ left: percent + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.phlix-slider {
  --_thumb: 14px;
  display: flex;
  align-items: center;
  padding-block: var(--space-2);
  touch-action: none;
}
.phlix-slider:focus-visible { outline: none; }
.phlix-slider.is-disabled { opacity: 0.5; pointer-events: none; }
.phlix-slider__track {
  position: relative;
  width: 100%;
  height: 5px;
  border-radius: var(--radius-full);
  background: var(--surface-3);
  cursor: pointer;
}
.phlix-slider__fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--accent);
}
.phlix-slider__thumb {
  position: absolute;
  top: 50%;
  width: var(--_thumb);
  height: var(--_thumb);
  border-radius: 50%;
  background: var(--accent);
  transform: translate(-50%, -50%);
  box-shadow: var(--shadow-2);
  transition: transform var(--dur-fast) var(--ease-spring), box-shadow var(--dur-base) var(--ease-out);
}
.phlix-slider:hover .phlix-slider__thumb { transform: translate(-50%, -50%) scale(1.1); }
.phlix-slider:focus-visible .phlix-slider__thumb {
  box-shadow: 0 0 0 4px var(--accent-ring), var(--shadow-2);
}
@media (prefers-reduced-motion: reduce) {
  .phlix-slider__thumb { transition: none; }
  .phlix-slider:hover .phlix-slider__thumb { transform: translate(-50%, -50%); }
}
</style>
