<script setup lang="ts">
/**
 * ShortcutsHelp (R3.3) — the player's keyboard-shortcut overlay (toggled by `?`).
 *
 * Lists `PLAYER_SHORTCUTS` using the `Kbd` primitive in a dialog over the player.
 * Esc or the close button / backdrop dismiss it; focus moves to the panel on open
 * so it is fully reachable without a mouse. Ports the locked mockup's `.help` grid.
 */
import { ref, toRef } from 'vue';
import Icon, { type IconName } from '../Icon.vue';
import IconButton from '../ui/IconButton.vue';
import { useFocusTrap } from '../ui/useFocusTrap';
import { PLAYER_SHORTCUTS, ARROW_ICONS, ARROW_LABELS, type ShortcutRow } from './shortcuts';

const props = withDefaults(
  defineProps<{ open: boolean; shortcuts?: ShortcutRow[] }>(),
  { shortcuts: () => PLAYER_SHORTCUTS },
);

const emit = defineEmits<{ (e: 'close'): void }>();

const panelEl = ref<HTMLElement | null>(null);

// Real modal semantics: trap Tab inside the panel, focus it on open, Esc closes.
// No body scroll-lock (this overlay lives inside the player, incl. fullscreen).
useFocusTrap(panelEl, toRef(props, 'open'), {
  lockScroll: false,
  onEscape: () => {
    emit('close');
    return true;
  },
});
</script>

<template>
  <div v-if="open" class="shortcuts" @click.self="emit('close')">
    <div
      ref="panelEl"
      class="shortcuts__panel"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      tabindex="-1"
    >
      <div class="shortcuts__head">
        <h3 class="shortcuts__title">Keyboard</h3>
        <IconButton name="x" label="Close" size="sm" @click="emit('close')" />
      </div>
      <ul class="shortcuts__grid">
        <li v-for="row in shortcuts" :key="row.id" class="shortcuts__row">
          <span class="shortcuts__keys">
            <template v-for="(k, i) in row.keys" :key="i">
              <span v-if="k === '–'" class="shortcuts__sep" aria-hidden="true">–</span>
              <kbd v-else class="shortcuts__key">
                <Icon v-if="ARROW_ICONS[k]" :name="(ARROW_ICONS[k] as IconName)" :label="ARROW_LABELS[k] ?? k" />
                <template v-else>{{ k }}</template>
              </kbd>
            </template>
          </span>
          <span class="shortcuts__label">{{ row.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.shortcuts {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: var(--space-6);
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
}
.shortcuts__panel {
  width: min(560px, 100%);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: var(--surface-glass, var(--surface-1));
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-4);
  outline: none;
}
.shortcuts__panel:focus-visible {
  box-shadow: var(--shadow-4), 0 0 0 3px var(--accent-ring);
}
.shortcuts__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}
.shortcuts__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.shortcuts__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: var(--space-3) var(--space-6);
  margin: 0;
  list-style: none;
}
.shortcuts__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.shortcuts__keys {
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
}
.shortcuts__key {
  display: inline-grid;
  place-items: center;
  min-width: 1.7em;
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
.shortcuts__sep {
  color: var(--text-subtle);
}
</style>
