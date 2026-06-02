<script setup lang="ts">
/**
 * Tooltip — hover/focus description (R0.4d).
 *
 *   <Tooltip text="Add to watchlist"><IconButton name="plus" label="Add" /></Tooltip>
 *
 * Shows on hover and keyboard focus (focusin), hides on leave/blur/Esc, with a
 * small open delay. role="tooltip"; on show it wires aria-describedby onto the
 * actual trigger element (first child) so screen readers announce it. CSS-placed
 * (top/bottom/left/right). Reduced-motion aware.
 *
 * Contract: the default slot must have a SINGLE element root (the trigger) —
 * aria-describedby is wired onto that element. A text/multi-root slot still shows
 * the tooltip visually but cannot receive the description.
 */
import { ref, useId, onBeforeUnmount } from 'vue';

const props = withDefaults(
  defineProps<{
    text?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    disabled?: boolean;
  }>(),
  { placement: 'top', delay: 300, disabled: false },
);

const id = useId();
const shown = ref(false);
const wrapEl = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

function triggerEl(): HTMLElement | null {
  return (wrapEl.value?.firstElementChild as HTMLElement) ?? null;
}
function show() {
  if (props.disabled) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    shown.value = true;
    triggerEl()?.setAttribute('aria-describedby', id);
  }, props.delay);
}
function hide() {
  clearTimeout(timer);
  shown.value = false;
  triggerEl()?.removeAttribute('aria-describedby');
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <span
    ref="wrapEl"
    class="phlix-tooltip-wrap"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
    @keydown.esc="hide"
  >
    <slot />
    <Transition name="phlix-tooltip">
      <span
        v-if="shown && (text || $slots.content)"
        :id="id"
        role="tooltip"
        class="phlix-tooltip"
        :class="`phlix-tooltip--${placement}`"
      >
        <slot name="content">{{ text }}</slot>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.phlix-tooltip-wrap { position: relative; display: inline-flex; }
.phlix-tooltip {
  position: absolute;
  z-index: 1100;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--surface-glass-strong);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-3);
  backdrop-filter: blur(8px);
  color: var(--text);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  white-space: nowrap;
  pointer-events: none;
}
.phlix-tooltip--top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.phlix-tooltip--bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.phlix-tooltip--left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.phlix-tooltip--right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }

.phlix-tooltip-enter-active, .phlix-tooltip-leave-active { transition: opacity var(--dur-fast) var(--ease-out); }
.phlix-tooltip-enter-from, .phlix-tooltip-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .phlix-tooltip-enter-active, .phlix-tooltip-leave-active { transition: none; }
}
</style>
