<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Sheet — accessible edge drawer (R0.4d).
 *
 *   <Sheet v-model="open" side="right" title="Filters">…</Sheet>
 *
 * Same a11y machinery as Modal (focus-trap + scroll-lock + Esc + backdrop-click,
 * Teleport, focus return) but slides in from an edge. side: right|left|bottom.
 */
import { ref, useId, watch } from 'vue';
import IconButton from './IconButton.vue';
import { useFocusTrap } from './useFocusTrap';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    side?: 'right' | 'left' | 'bottom';
    dismissible?: boolean;
    hideClose?: boolean;
  }>(),
  { side: 'right', dismissible: true, hideClose: false },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'close'): void }>();

const open = ref(props.modelValue);
watch(() => props.modelValue, (v) => (open.value = v));

const panelEl = ref<HTMLElement | null>(null);
const titleId = useId();

function close() {
  emit('update:modelValue', false);
  emit('close');
}
function onBackdrop() {
  if (props.dismissible) close();
}

useFocusTrap(panelEl, open, {
  onEscape: () => {
    if (!props.dismissible) return false;
    close();
    return true;
  },
});
</script>

<template>
  <Teleport to="body">
    <Transition :name="`phlix-sheet-${side}`">
      <div v-if="modelValue" class="phlix-sheet" :class="`phlix-sheet--${side}`" @pointerdown.self="onBackdrop">
        <aside
          ref="panelEl"
          class="phlix-sheet__panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          tabindex="-1"
        >
          <header v-if="title || !hideClose" class="phlix-sheet__header">
            <h2 v-if="title" :id="titleId" class="phlix-sheet__title">{{ title }}</h2>
            <IconButton v-if="!hideClose" name="x" label="Close" size="sm" @click="close" />
          </header>
          <div class="phlix-sheet__body"><slot /></div>
          <footer v-if="$slots.footer" class="phlix-sheet__footer"><slot name="footer" /></footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.phlix-sheet {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}
.phlix-sheet--right { justify-content: flex-end; }
.phlix-sheet--left { justify-content: flex-start; }
.phlix-sheet--bottom { align-items: flex-end; }
.phlix-sheet__panel {
  display: flex;
  flex-direction: column;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-4);
  outline: none;
}
.phlix-sheet--right .phlix-sheet__panel,
.phlix-sheet--left .phlix-sheet__panel {
  width: min(28rem, 100%);
  height: 100%;
  border-radius: var(--radius-xl) 0 0 var(--radius-xl);
}
.phlix-sheet--left .phlix-sheet__panel { border-radius: 0 var(--radius-xl) var(--radius-xl) 0; }
.phlix-sheet--bottom .phlix-sheet__panel {
  width: 100%;
  max-height: 85vh;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
}
.phlix-sheet__header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}
.phlix-sheet__title {
  flex: 1;
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
}
.phlix-sheet__body { padding: var(--space-6); overflow-y: auto; flex: 1; color: var(--text-muted); }
.phlix-sheet__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--border-subtle);
}

/* transitions — backdrop fade + panel slide */
.phlix-sheet-right-enter-active, .phlix-sheet-right-leave-active,
.phlix-sheet-left-enter-active, .phlix-sheet-left-leave-active,
.phlix-sheet-bottom-enter-active, .phlix-sheet-bottom-leave-active { transition: opacity var(--dur-base) var(--ease-out); }
.phlix-sheet-right-enter-active .phlix-sheet__panel, .phlix-sheet-right-leave-active .phlix-sheet__panel,
.phlix-sheet-left-enter-active .phlix-sheet__panel, .phlix-sheet-left-leave-active .phlix-sheet__panel,
.phlix-sheet-bottom-enter-active .phlix-sheet__panel, .phlix-sheet-bottom-leave-active .phlix-sheet__panel {
  transition: transform var(--dur-slow) var(--ease-out);
}
.phlix-sheet-right-enter-from, .phlix-sheet-right-leave-to,
.phlix-sheet-left-enter-from, .phlix-sheet-left-leave-to,
.phlix-sheet-bottom-enter-from, .phlix-sheet-bottom-leave-to { opacity: 0; }
.phlix-sheet-right-enter-from .phlix-sheet__panel, .phlix-sheet-right-leave-to .phlix-sheet__panel { transform: translateX(100%); }
.phlix-sheet-left-enter-from .phlix-sheet__panel, .phlix-sheet-left-leave-to .phlix-sheet__panel { transform: translateX(-100%); }
.phlix-sheet-bottom-enter-from .phlix-sheet__panel, .phlix-sheet-bottom-leave-to .phlix-sheet__panel { transform: translateY(100%); }
@media (prefers-reduced-motion: reduce) {
  .phlix-sheet [class*='-enter-active'], .phlix-sheet [class*='-leave-active'],
  .phlix-sheet__panel { transition: none !important; }
}
</style>
