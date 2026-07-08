<script setup lang="ts">
/**
 * Chip — compact toggle / filter pill (R0.4b).
 *
 * Two roles, composable:
 *  · Toggle (rating filters): pass `:selected` → exposes aria-pressed, click emits
 *    `update:selected`.   <Chip :selected="on" @update:selected="on=$event">R</Chip>
 *  · Removable (active-filter pills): pass `removable` → trailing ✕ emits `remove`.
 *    <Chip removable @remove="drop">Sci-Fi</Chip>
 * Optional leading icon. Keyboard-operable, :focus-visible, reduced-motion aware.
 */
import Icon, { type IconName } from '../Icon.vue';

const props = withDefaults(
  defineProps<{
    /** When defined the chip is a toggle and reflects aria-pressed. */
    selected?: boolean;
    removable?: boolean;
    icon?: IconName;
    size?: 'sm' | 'md';
    disabled?: boolean;
    /** aria-label for the remove button; defaults to "Remove". */
    removeLabel?: string;
    /** Overrides the main button's accessible name; defaults to the slot content. */
    ariaLabel?: string;
  }>(),
  { selected: undefined, removable: false, size: 'sm', disabled: false, removeLabel: 'Remove' },
);

const emit = defineEmits<{
  (e: 'update:selected', v: boolean): void;
  (e: 'click'): void;
  (e: 'remove'): void;
}>();

function onMain() {
  if (props.disabled) return;
  if (props.selected !== undefined) emit('update:selected', !props.selected);
  emit('click');
}
</script>

<template>
  <span class="phlix-chip" :class="[`phlix-chip--${size}`, { 'is-selected': selected, 'is-disabled': disabled }]">
    <button
      type="button"
      class="phlix-chip__main"
      :disabled="disabled"
      :aria-label="ariaLabel"
      :aria-pressed="selected === undefined ? undefined : selected"
      @click="onMain"
    >
      <Icon v-if="icon" :name="icon" class="phlix-chip__icon" />
      <span class="phlix-chip__label"><slot /></span>
    </button>
    <button
      v-if="removable"
      type="button"
      class="phlix-chip__remove"
      :disabled="disabled"
      :aria-label="removeLabel"
      @click="emit('remove')"
    >
      <Icon name="x" />
    </button>
  </span>
</template>

<style scoped>
.phlix-chip {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}
.phlix-chip--md { font-size: var(--text-base); }
.phlix-chip.is-selected { background: var(--accent-soft); color: var(--accent-text); border-color: var(--accent-ring); }
.phlix-chip.is-disabled { opacity: 0.5; }
.phlix-chip:not(.is-selected):not(.is-disabled):hover { color: var(--text); border-color: var(--border-strong); }

.phlix-chip__main {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.35em 0.8em;
  border-radius: var(--radius-full);
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.phlix-chip__main:disabled { cursor: not-allowed; }
.phlix-chip__main:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); }
.phlix-chip__icon { font-size: 1.05em; }

.phlix-chip__remove {
  display: inline-grid;
  place-items: center;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.3em;
  border-radius: 50%;
  color: inherit;
  opacity: 0.75;
  font-size: 0.85em;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out);
}
.phlix-chip__remove:hover { opacity: 1; background: color-mix(in srgb, currentColor 18%, transparent); }
.phlix-chip__remove:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); }
@media (prefers-reduced-motion: reduce) {
  .phlix-chip, .phlix-chip__remove { transition: none; }
}
</style>
