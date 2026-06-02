<script setup lang="ts">
/**
 * Modal — accessible centered dialog (R0.4d).
 *
 *   <Modal v-model="open" title="Confirm">…<template #footer>…</template></Modal>
 *
 * role="dialog" aria-modal; focus-trap + scroll-lock + Esc + backdrop-click to
 * close (Teleported to <body>). Focus returns to the opener on close. Title wires
 * aria-labelledby; an optional close button is built in. Reduced-motion aware.
 */
import { ref, useId, watch } from 'vue';
import IconButton from './IconButton.vue';
import { useFocusTrap } from './useFocusTrap';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    /** Allow closing via Esc / backdrop. Default true. */
    dismissible?: boolean;
    /** Hide the built-in close button. */
    hideClose?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }>(),
  { dismissible: true, hideClose: false, size: 'md' },
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
    <Transition name="phlix-modal">
      <div v-if="modelValue" class="phlix-modal" @pointerdown.self="onBackdrop">
        <div
          ref="panelEl"
          class="phlix-modal__panel"
          :class="`phlix-modal__panel--${size}`"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          tabindex="-1"
        >
          <header v-if="title || !hideClose" class="phlix-modal__header">
            <h2 v-if="title" :id="titleId" class="phlix-modal__title">{{ title }}</h2>
            <IconButton
              v-if="!hideClose"
              name="x"
              label="Close"
              size="sm"
              class="phlix-modal__close"
              @click="close"
            />
          </header>
          <div class="phlix-modal__body"><slot /></div>
          <footer v-if="$slots.footer" class="phlix-modal__footer"><slot name="footer" /></footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.phlix-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: var(--space-6);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}
.phlix-modal__panel {
  width: 100%;
  max-width: 32rem;
  max-height: calc(100vh - 2 * var(--space-6));
  display: flex;
  flex-direction: column;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-4);
  outline: none;
}
.phlix-modal__panel--sm { max-width: 24rem; }
.phlix-modal__panel--lg { max-width: 48rem; }
.phlix-modal__header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}
.phlix-modal__title {
  flex: 1;
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
}
.phlix-modal__close { margin: calc(-1 * var(--space-2)) calc(-1 * var(--space-2)) calc(-1 * var(--space-2)) auto; }
.phlix-modal__body { padding: var(--space-6); overflow-y: auto; color: var(--text-muted); }
.phlix-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--border-subtle);
}

.phlix-modal-enter-active, .phlix-modal-leave-active { transition: opacity var(--dur-base) var(--ease-out); }
.phlix-modal-enter-active .phlix-modal__panel, .phlix-modal-leave-active .phlix-modal__panel {
  transition: transform var(--dur-slow) var(--ease-spring), opacity var(--dur-base) var(--ease-out);
}
.phlix-modal-enter-from, .phlix-modal-leave-to { opacity: 0; }
.phlix-modal-enter-from .phlix-modal__panel, .phlix-modal-leave-to .phlix-modal__panel {
  transform: translateY(12px) scale(0.97);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .phlix-modal-enter-active, .phlix-modal-leave-active,
  .phlix-modal-enter-active .phlix-modal__panel, .phlix-modal-leave-active .phlix-modal__panel { transition: none; }
  .phlix-modal-enter-from .phlix-modal__panel, .phlix-modal-leave-to .phlix-modal__panel { transform: none; }
}
</style>
