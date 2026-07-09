<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script lang="ts">
// Module-scoped across all instances — see the mount-once guard below.
let hostCount = 0;
</script>

<script setup lang="ts">
/**
 * ToastHost (R0.4e) — renders toasts from useToastStore. Mount ONCE near the app
 * root. Teleports to <body>; the region is aria-live=polite so additions are
 * announced. Each toast has a tone icon, optional title/action, and a dismiss
 * button. Reduced-motion aware.
 */
import { onMounted, onBeforeUnmount } from 'vue';
import Icon, { type IconName } from '../Icon.vue';
import IconButton from './IconButton.vue';
import { useToastStore, type ToastTone } from '../../stores/useToastStore';
import { useMessages } from '../../composables/useMessages';

withDefaults(defineProps<{ position?: 'top' | 'bottom' }>(), { position: 'bottom' });

// Aliased to avoid colliding with the `t` toast loop variable in the template below.
const { t: translate } = useMessages();

const toasts = useToastStore();

const toneIcon: Record<ToastTone, IconName> = {
  neutral: 'info',
  success: 'success',
  warning: 'alert',
  error: 'error',
  info: 'info',
};
const iconFor = (t: { tone: ToastTone; icon?: IconName }) => t.icon ?? toneIcon[t.tone];

// Mount-once guard: a second host would duplicate every toast (single store).
onMounted(() => {
  hostCount++;
  if (hostCount > 1 && import.meta.env?.DEV) {
    console.warn('[phlix/ui] More than one <ToastHost> is mounted — render it exactly once near the app root.');
  }
});
onBeforeUnmount(() => {
  hostCount--;
});
</script>

<template>
  <Teleport to="body">
    <div class="phlix-toasts" :class="`phlix-toasts--${position}`" role="region" :aria-label="translate('common.notifications')">
      <TransitionGroup name="phlix-toast">
        <div
          v-for="t in toasts.toasts"
          :key="t.id"
          class="phlix-toast"
          :class="`phlix-toast--${t.tone}`"
          :role="t.tone === 'error' ? 'alert' : 'status'"
        >
          <Icon :name="iconFor(t)" class="phlix-toast__icon" />
          <div class="phlix-toast__content">
            <p v-if="t.title" class="phlix-toast__title">{{ t.title }}</p>
            <p class="phlix-toast__message">{{ t.message }}</p>
          </div>
          <button v-if="t.action" type="button" class="phlix-toast__action" @click="t.action.onClick(); toasts.dismiss(t.id)">
            {{ t.action.label }}
          </button>
          <IconButton name="x" :label="translate('common.dismiss')" size="sm" class="phlix-toast__close" @click="toasts.dismiss(t.id)" />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.phlix-toasts {
  position: fixed;
  z-index: 1200;
  right: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: min(24rem, calc(100vw - 2 * var(--space-6)));
  pointer-events: none;
}
.phlix-toasts--bottom { bottom: var(--space-6); }
.phlix-toasts--top { top: var(--space-6); flex-direction: column-reverse; }
.phlix-toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface-glass-strong);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-3);
  backdrop-filter: blur(12px);
  pointer-events: auto;
}
.phlix-toast__icon { font-size: 1.2em; margin-top: 0.1em; flex-shrink: 0; }
.phlix-toast--success .phlix-toast__icon { color: var(--success); }
.phlix-toast--warning .phlix-toast__icon { color: var(--warning); }
.phlix-toast--error .phlix-toast__icon { color: var(--error); }
.phlix-toast--info .phlix-toast__icon { color: var(--info); }
.phlix-toast--neutral .phlix-toast__icon { color: var(--text-muted); }
.phlix-toast__content { flex: 1; min-width: 0; }
.phlix-toast__title { font-weight: var(--font-semibold); font-size: var(--text-sm); color: var(--text); }
.phlix-toast__message { font-size: var(--text-sm); color: var(--text-muted); overflow-wrap: anywhere; }
.phlix-toast__action {
  flex-shrink: 0;
  align-self: center;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--accent-text);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.phlix-toast__action:hover { background: var(--accent-soft); }
.phlix-toast__action:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); }
.phlix-toast__close { flex-shrink: 0; margin: calc(-1 * var(--space-1)) calc(-1 * var(--space-2)) 0 0; }

.phlix-toast-enter-active, .phlix-toast-leave-active { transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
.phlix-toast-enter-from, .phlix-toast-leave-to { opacity: 0; transform: translateX(16px); }
.phlix-toast-leave-active { position: absolute; right: 0; width: 100%; }
@media (prefers-reduced-motion: reduce) {
  .phlix-toast-enter-active, .phlix-toast-leave-active { transition: opacity var(--dur-fast) var(--ease-out); }
  .phlix-toast-enter-from, .phlix-toast-leave-to { transform: none; }
}
</style>
