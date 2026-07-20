<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * HelpPopover — a (?) icon button that reveals help text in a small popover (R0.4).
 *
 *   <HelpPopover help-text="Choose a strong password" title="Password help" />
 *
 * The popover is dismissible by: Escape key, clicking outside, or the close button.
 * On open it traps focus inside the panel; on close focus returns to the trigger.
 * Uses `useFocusTrap` for accessibility. Reduced-motion aware.
 */
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import Icon from '../Icon.vue';
import IconButton from './IconButton.vue';
import HelpText, { type HelpLink } from './HelpText.vue';
import { useFocusTrap } from './useFocusTrap';
import { useMessages } from '../../composables/useMessages';

const { t } = useMessages();

const props = withDefaults(
  defineProps<{
    /** The help text to display inside the popover. */
    helpText: string;
    /** Optional reference links shown below the help text. */
    helpLinks?: readonly HelpLink[];
    /** Optional label for the popover header. */
    title?: string;
    /**
     * Name of the field this help belongs to. Used to build a distinct
     * accessible name for the trigger ("Help for Discovery port") so a screen
     * reader user on a tab with a dozen fields can tell the (?) buttons apart.
     */
    fieldLabel?: string;
  }>(),
  { helpLinks: undefined, title: undefined, fieldLabel: undefined },
);

const id = `phlix-help-popover-${useId()}`;

/** Accessible name for the (?) trigger — names its field whenever we know it. */
const triggerLabel = computed(() =>
  props.fieldLabel ? `Help for ${props.fieldLabel}` : 'Help',
);

const open = ref(false);
const triggerEl = ref<HTMLButtonElement | null>(null);
const panelEl = ref<HTMLElement | null>(null);
const panelStyle = ref<Record<string, string>>({});

function openPopover() {
  if (open.value) return;
  open.value = true;
  nextTick(() => {
    updatePosition();
    panelEl.value?.querySelector<HTMLElement>('button,[contenteditable]')?.focus?.();
  });
}

function closePopover() {
  open.value = false;
  triggerEl.value?.focus();
}

function togglePopover() {
  open.value ? closePopover() : openPopover();
}

/** Anchor the popover to the trigger. Similar to Menu.vue positioning. */
function updatePosition() {
  if (!triggerEl.value) return;
  const r = triggerEl.value.getBoundingClientRect();
  const gap = 6;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const panelW = panelEl.value?.offsetWidth ?? 320;
  const panelH = panelEl.value?.offsetHeight ?? 200;

  // Prefer positioning below the trigger; flip above if not enough room.
  const spaceBelow = vh - r.bottom;
  const flipped = spaceBelow < panelH + gap && r.top > spaceBelow;

  // Align left edge with trigger, clamped to viewport.
  let left = r.left;
  if (left + panelW > vw - 8) left = vw - panelW - 8;
  if (left < 8) left = 8;

  const top = flipped ? Math.max(8, r.top - panelH - gap) : r.bottom + gap;
  panelStyle.value = { left: `${Math.round(left)}px`, top: `${Math.round(top)}px` };
}

function onDocPointer(e: PointerEvent) {
  if (open.value && triggerEl.value && panelEl.value &&
    !triggerEl.value.contains(e.target as Node) &&
    !panelEl.value.contains(e.target as Node)) {
    closePopover();
  }
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('pointerdown', onDocPointer, true);
  } else {
    document.removeEventListener('pointerdown', onDocPointer, true);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer, true);
});

useFocusTrap(panelEl, open, {
  onEscape: () => {
    closePopover();
    return true;
  },
});
</script>

<template>
  <span class="phlix-help-popover">
    <button
      ref="triggerEl"
      type="button"
      class="phlix-help-popover__trigger"
      :aria-expanded="open"
      :aria-controls="open ? id : undefined"
      :aria-label="triggerLabel"
      @click="togglePopover"
    >
      <Icon name="info" :size="0.9" />
      <span class="phlix-help-popover__badge">?</span>
    </button>

    <Teleport to="body">
      <Transition name="phlix-help-popover">
        <div
          v-if="open"
          :id="id"
          ref="panelEl"
          class="phlix-help-popover__panel"
          :style="panelStyle"
          role="dialog"
          aria-modal="false"
        >
          <header class="phlix-help-popover__header">
            <span class="phlix-help-popover__title">{{ title ?? 'Help' }}</span>
            <IconButton
              name="x"
              :label="t('common.close')"
              size="sm"
              class="phlix-help-popover__close"
              @click="closePopover"
            />
          </header>
          <div class="phlix-help-popover__body">
            <HelpText :text="helpText" :links="helpLinks" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<style scoped>
.phlix-help-popover {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.phlix-help-popover__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-subtle);
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-out);
  position: relative;
}

.phlix-help-popover__trigger:hover {
  color: var(--text-muted);
}

.phlix-help-popover__trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}

.phlix-help-popover__badge {
  position: absolute;
  top: -4px;
  right: -6px;
  font-size: 0.6rem;
  font-weight: var(--font-bold);
  line-height: 1;
  color: var(--text-muted);
  pointer-events: none;
}

.phlix-help-popover__panel {
  position: fixed;
  z-index: 500;
  width: 320px;
  max-width: calc(100vw - 16px);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-4);
  overflow: hidden;
}

.phlix-help-popover__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}

.phlix-help-popover__title {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text);
}

.phlix-help-popover__close {
  margin: calc(-1 * var(--space-1));
}

.phlix-help-popover__body {
  padding: var(--space-4);
}

/* Transition */
.phlix-help-popover-enter-active,
.phlix-help-popover-leave-active {
  transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.phlix-help-popover-enter-from,
.phlix-help-popover-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .phlix-help-popover__trigger,
  .phlix-help-popover-enter-active,
  .phlix-help-popover-leave-active {
    transition: none;
  }
  .phlix-help-popover-enter-from,
  .phlix-help-popover-leave-to {
    transform: none;
  }
}
</style>
