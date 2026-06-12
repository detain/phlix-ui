<script setup lang="ts">
/**
 * Select — accessible single-select dropdown (R0.4c), replaces native <select>.
 *
 *   <Select v-model="sort" :options="[{value:'year',label:'Year'},…]" label="Sort" />
 *
 * Button + listbox (aria-haspopup=listbox / aria-expanded / aria-activedescendant).
 * Keyboard: Up/Down move, Home/End edges, Enter/Space select-or-open, Esc close,
 * type-to-jump. Click-outside closes. Reduced-motion aware.
 */
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import Icon from '../Icon.vue';
import { normalizeOptions, nextEnabledIndex, edgeEnabledIndex, type SelectOptionInput } from './listbox';
import { useMessages } from '../../composables/useMessages';

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    options: readonly SelectOptionInput[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    /**
     * Visual tone. `default` uses the app surface tokens (opaque light surfaces).
     * `glass` (opt-in) overrides the surface/text/border tokens for a translucent
     * dark, white-text treatment that matches the transparent player chrome — used
     * by the in-player menus (SpeedMenu / QualityMenu / CaptionsMenu). The variant
     * is class-only (a scoped `is-glass` modifier) so `Select` is unchanged
     * everywhere else it's used.
     */
    tone?: 'default' | 'glass';
  }>(),
  { disabled: false, tone: 'default' },
);

const { t } = useMessages();

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number): void;
  (e: 'change', v: string | number): void;
}>();

const opts = computed(() => normalizeOptions(props.options));
const baseId = useId();
const open = ref(false);
const active = ref(-1);
const rootEl = ref<HTMLElement | null>(null);
const listEl = ref<HTMLElement | null>(null);
let typeahead = '';
let typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

const selectedIndex = computed(() => opts.value.findIndex((o) => o.value === props.modelValue));
const selectedLabel = computed(() => opts.value[selectedIndex.value]?.label ?? '');
const activeId = computed(() => (active.value >= 0 ? `${baseId}-opt-${active.value}` : undefined));

function openList() {
  if (props.disabled || open.value) return;
  open.value = true;
  active.value = selectedIndex.value >= 0 ? selectedIndex.value : edgeEnabledIndex(opts.value, 'first');
  nextTick(scrollActiveIntoView);
}
function closeList() {
  open.value = false;
}
function selectIndex(i: number) {
  const o = opts.value[i];
  if (!o || o.disabled) return;
  if (o.value !== props.modelValue) {
    emit('update:modelValue', o.value);
    emit('change', o.value);
  }
  closeList();
  rootEl.value?.querySelector<HTMLButtonElement>('.phlix-select__trigger')?.focus();
}
function move(dir: 1 | -1) {
  active.value = nextEnabledIndex(opts.value, active.value, dir);
  nextTick(scrollActiveIntoView);
}
function scrollActiveIntoView() {
  const el = listEl.value?.querySelector<HTMLElement>('.is-active');
  el?.scrollIntoView?.({ block: 'nearest' });
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); open.value ? move(1) : openList(); break;
    case 'ArrowUp': e.preventDefault(); open.value ? move(-1) : openList(); break;
    case 'Home': if (open.value) { e.preventDefault(); active.value = edgeEnabledIndex(opts.value, 'first'); nextTick(scrollActiveIntoView); } break;
    case 'End': if (open.value) { e.preventDefault(); active.value = edgeEnabledIndex(opts.value, 'last'); nextTick(scrollActiveIntoView); } break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (open.value && active.value >= 0) selectIndex(active.value);
      else openList();
      break;
    case 'Escape': if (open.value) { e.preventDefault(); closeList(); } break;
    case 'Tab': closeList(); break;
    default:
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) onTypeahead(e.key);
  }
}

function onTypeahead(ch: string) {
  if (!open.value) openList();
  typeahead += ch.toLowerCase();
  clearTimeout(typeaheadTimer);
  typeaheadTimer = setTimeout(() => (typeahead = ''), 600);
  const match = opts.value.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(typeahead));
  if (match >= 0) { active.value = match; nextTick(scrollActiveIntoView); }
}

function onDocPointer(e: PointerEvent) {
  if (open.value && rootEl.value && !rootEl.value.contains(e.target as Node)) closeList();
}
watch(open, (v) => {
  if (v) document.addEventListener('pointerdown', onDocPointer, true);
  else document.removeEventListener('pointerdown', onDocPointer, true);
});
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer, true);
  clearTimeout(typeaheadTimer);
});
</script>

<template>
  <div ref="rootEl" class="phlix-select" :class="{ 'is-open': open, 'is-disabled': disabled, 'is-glass': tone === 'glass' }">
    <button
      type="button"
      class="phlix-select__trigger"
      :aria-haspopup="'listbox'"
      :aria-expanded="open"
      :aria-controls="open ? `${baseId}-list` : undefined"
      :aria-activedescendant="open ? activeId : undefined"
      :aria-label="label"
      :disabled="disabled"
      @click="open ? closeList() : openList()"
      @keydown="onTriggerKeydown"
    >
      <span class="phlix-select__value" :class="{ 'is-placeholder': selectedIndex < 0 }">
        {{ selectedIndex >= 0 ? selectedLabel : (placeholder ?? t('common.selectPlaceholder')) }}
      </span>
      <Icon name="chevron-down" class="phlix-select__caret" />
    </button>

    <ul
      v-show="open"
      :id="`${baseId}-list`"
      ref="listEl"
      class="phlix-select__list"
      role="listbox"
      :aria-label="label"
    >
      <li
        v-for="(o, i) in opts"
        :id="`${baseId}-opt-${i}`"
        :key="o.value"
        class="phlix-select__option"
        :class="{ 'is-active': i === active, 'is-disabled': o.disabled }"
        role="option"
        :aria-selected="o.value === modelValue"
        :aria-disabled="o.disabled || undefined"
        @click="selectIndex(i)"
        @pointermove="!o.disabled && (active = i)"
      >
        <span class="phlix-select__check"><Icon v-if="o.value === modelValue" name="check" /></span>
        {{ o.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.phlix-select { position: relative; display: inline-block; }
.phlix-select.is-disabled { opacity: 0.5; }
.phlix-select__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.phlix-select__trigger:hover:not(:disabled) { border-color: var(--border-strong); }
.phlix-select__trigger:focus-visible { outline: none; border-color: var(--accent-ring); box-shadow: 0 0 0 3px var(--accent-soft); }
.phlix-select__trigger:disabled { cursor: not-allowed; }
.phlix-select__value { flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.phlix-select__value.is-placeholder { color: var(--text-subtle); }
.phlix-select__caret { color: var(--text-subtle); transition: transform var(--dur-base) var(--ease-out); }
.phlix-select.is-open .phlix-select__caret { transform: rotate(180deg); }

.phlix-select__list {
  position: absolute;
  z-index: 50;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  max-height: 280px;
  overflow-y: auto;
  padding: var(--space-1);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-3);
}
.phlix-select__option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--text-muted);
  cursor: pointer;
}
.phlix-select__option.is-active { background: var(--surface-3); color: var(--text); }
.phlix-select__option[aria-selected='true'] { color: var(--accent-text); font-weight: var(--font-semibold); }
.phlix-select__option.is-disabled { opacity: 0.45; cursor: not-allowed; }
.phlix-select__check { display: inline-grid; place-items: center; width: 1em; font-size: 1.05em; }

/* ---- glass tone (opt-in) — translucent dark + white text for the player chrome.
   Scoped to `.is-glass` so the default Select (used across the app) is untouched.
   Uses literal rgba()/#fff rather than the light surface tokens so the menus read
   correctly against the dark, transparent player. Hover/active/selected stay
   legible; the focus ring still uses the accent token. */
.phlix-select.is-glass .phlix-select__trigger {
  background: rgba(20, 20, 20, 0.55);
  color: rgba(255, 255, 255, 0.92);
  border-color: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
}
.phlix-select.is-glass .phlix-select__trigger:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(36, 36, 36, 0.7);
}
.phlix-select.is-glass .phlix-select__caret { color: rgba(255, 255, 255, 0.6); }
.phlix-select.is-glass .phlix-select__value.is-placeholder { color: rgba(255, 255, 255, 0.55); }
.phlix-select.is-glass .phlix-select__list {
  background: rgba(20, 20, 20, 0.92);
  border-color: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(16px);
}
.phlix-select.is-glass .phlix-select__option { color: rgba(255, 255, 255, 0.72); }
.phlix-select.is-glass .phlix-select__option.is-active {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}
.phlix-select.is-glass .phlix-select__option[aria-selected='true'] {
  color: var(--amber-300, var(--accent));
}

@media (prefers-reduced-motion: reduce) {
  .phlix-select__trigger, .phlix-select__caret { transition: none; }
}
</style>
