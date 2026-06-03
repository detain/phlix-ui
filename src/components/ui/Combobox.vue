<script setup lang="ts">
/**
 * Combobox — accessible filterable single-select (R0.4c).
 *
 *   <Combobox v-model="genre" :options="genres" placeholder="Add a genre…" />
 *
 * Text input (role=combobox, aria-autocomplete=list, aria-expanded/controls/
 * activedescendant) over a filtered listbox. Type to filter; Up/Down move;
 * Enter selects; Esc reverts + closes; click-outside / blur closes. The query
 * reverts to the selected label when no choice is committed. Reduced-motion aware.
 */
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import Icon from '../Icon.vue';
import { normalizeOptions, nextEnabledIndex, edgeEnabledIndex, type SelectOptionInput } from './listbox';

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    options: readonly SelectOptionInput[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
  }>(),
  { placeholder: 'Search…', disabled: false },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void;
  (e: 'change', v: string | number | null): void;
}>();

const opts = computed(() => normalizeOptions(props.options));
const baseId = useId();
const open = ref(false);
const active = ref(-1);
const query = ref('');
const dirty = ref(false); // true once the user edits the query (vs. showing the selection)
const rootEl = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);
const listEl = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => opts.value.find((o) => o.value === props.modelValue)?.label ?? '');

const filtered = computed(() => {
  if (!dirty.value || query.value.trim() === '') return opts.value;
  const q = query.value.toLowerCase();
  return opts.value.filter((o) => o.label.toLowerCase().includes(q));
});
const activeId = computed(() => (active.value >= 0 ? `${baseId}-opt-${active.value}` : undefined));

watch(
  () => props.modelValue,
  () => { if (!open.value) query.value = selectedLabel.value; },
  { immediate: true },
);

function openList() {
  if (props.disabled || open.value) return;
  open.value = true;
  active.value = filtered.value.findIndex((o) => o.value === props.modelValue);
  if (active.value < 0) active.value = filtered.value.findIndex((o) => !o.disabled);
  nextTick(scrollActiveIntoView);
}
function revertAndClose() {
  query.value = selectedLabel.value;
  dirty.value = false;
  open.value = false;
}
function selectIndex(i: number) {
  const o = filtered.value[i];
  if (!o || o.disabled) return;
  if (o.value !== props.modelValue) {
    emit('update:modelValue', o.value);
    emit('change', o.value);
  }
  query.value = o.label;
  dirty.value = false;
  open.value = false;
  inputEl.value?.focus();
}
function move(dir: 1 | -1) {
  if (filtered.value.length === 0) return;
  active.value = nextEnabledIndex(filtered.value, active.value, dir);
  nextTick(scrollActiveIntoView);
}
function scrollActiveIntoView() {
  listEl.value?.querySelector<HTMLElement>('.is-active')?.scrollIntoView?.({ block: 'nearest' });
}

function onInput(e: Event) {
  query.value = (e.target as HTMLInputElement).value;
  dirty.value = true;
  open.value = true;
  active.value = edgeEnabledIndex(filtered.value, 'first');
}
function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); open.value ? move(1) : openList(); break;
    case 'ArrowUp': e.preventDefault(); open.value ? move(-1) : openList(); break;
    case 'Enter': if (open.value && active.value >= 0) { e.preventDefault(); selectIndex(active.value); } break;
    case 'Escape': if (open.value) { e.preventDefault(); revertAndClose(); } break;
    case 'Tab': if (open.value) revertAndClose(); break;
  }
}

function onDocPointer(e: PointerEvent) {
  if (open.value && rootEl.value && !rootEl.value.contains(e.target as Node)) revertAndClose();
}
watch(open, (v) => {
  if (v) document.addEventListener('pointerdown', onDocPointer, true);
  else document.removeEventListener('pointerdown', onDocPointer, true);
});
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocPointer, true));
</script>

<template>
  <div ref="rootEl" class="phlix-combobox" :class="{ 'is-open': open, 'is-disabled': disabled }">
    <div class="phlix-combobox__field">
      <Icon name="search" class="phlix-combobox__search" />
      <input
        ref="inputEl"
        class="phlix-combobox__input"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        :aria-expanded="open"
        :aria-controls="open ? `${baseId}-list` : undefined"
        :aria-activedescendant="open ? activeId : undefined"
        :aria-label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="query"
        @input="onInput"
        @focus="openList"
        @keydown="onKeydown"
      />
      <Icon name="chevron-down" class="phlix-combobox__caret" />
    </div>

    <ul
      v-show="open"
      :id="`${baseId}-list`"
      ref="listEl"
      class="phlix-combobox__list"
      role="listbox"
      :aria-label="label"
    >
      <li
        v-for="(o, i) in filtered"
        :id="`${baseId}-opt-${i}`"
        :key="o.value"
        class="phlix-combobox__option"
        :class="{ 'is-active': i === active, 'is-disabled': o.disabled }"
        role="option"
        :aria-selected="o.value === modelValue"
        :aria-disabled="o.disabled || undefined"
        @click="selectIndex(i)"
        @pointermove="!o.disabled && (active = i)"
      >
        <span class="phlix-combobox__check"><Icon v-if="o.value === modelValue" name="check" /></span>
        {{ o.label }}
      </li>
      <li v-if="filtered.length === 0" class="phlix-combobox__empty" role="presentation">No matches</li>
    </ul>
  </div>
</template>

<style scoped>
.phlix-combobox { position: relative; display: inline-block; }
.phlix-combobox.is-disabled { opacity: 0.5; }
.phlix-combobox__field { position: relative; display: flex; align-items: center; }
.phlix-combobox__search {
  position: absolute; left: var(--space-3); color: var(--text-subtle); pointer-events: none; font-size: 1.05em;
}
.phlix-combobox__input {
  width: 100%;
  height: var(--control-h);
  padding-left: calc(var(--control-pad-x) + 1.4em);
  padding-right: calc(var(--control-pad-x) + 1.4em);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  outline: none;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.phlix-combobox__input::placeholder { color: var(--text-subtle); }
.phlix-combobox__input:focus { border-color: var(--accent-ring); box-shadow: 0 0 0 3px var(--accent-soft); }
.phlix-combobox__input:disabled { cursor: not-allowed; }
.phlix-combobox__caret { position: absolute; right: var(--space-3); color: var(--text-subtle); pointer-events: none;
  transition: transform var(--dur-base) var(--ease-out); }
.phlix-combobox.is-open .phlix-combobox__caret { transform: rotate(180deg); }

.phlix-combobox__list {
  position: absolute; z-index: 50; top: calc(100% + 4px); left: 0; min-width: 100%;
  max-height: 280px; overflow-y: auto; padding: var(--space-1);
  border-radius: var(--radius-md); background: var(--surface-2);
  border: 1px solid var(--border-strong); box-shadow: var(--shadow-3);
}
.phlix-combobox__option {
  display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm);
  font-size: var(--text-sm); color: var(--text-muted); cursor: pointer;
}
.phlix-combobox__option.is-active { background: var(--surface-3); color: var(--text); }
.phlix-combobox__option[aria-selected='true'] { color: var(--accent-text); font-weight: var(--font-semibold); }
.phlix-combobox__option.is-disabled { opacity: 0.45; cursor: not-allowed; }
.phlix-combobox__check { display: inline-grid; place-items: center; width: 1em; font-size: 1.05em; }
.phlix-combobox__empty { padding: var(--space-3); font-size: var(--text-sm); color: var(--text-subtle); text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .phlix-combobox__input, .phlix-combobox__caret { transition: none; }
}
</style>
