<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SourcePriorityEditor (Feature 3.6) — a reorderable list editor for an ordered
 * array of metadata-source names (the per-media-type `metadata.provider_priority`
 * list). The admin reorders the list with Up/Down buttons (NO drag-and-drop
 * dependency), removes a source, and adds any available source not yet in the
 * order.
 *
 * Contract:
 *   - Prop `modelValue: string[]` — the current ORDERED list of source names.
 *   - Prop `available: string[]`  — the full set of selectable source names
 *     (built-ins + plugin sources, from `GET /api/v1/admin/metadata/sources`).
 *   - Emits `update:modelValue` with the NEW ordered array on every change
 *     (reorder / add / remove). The component never mutates the incoming prop.
 *
 * Robustness: a source present in `modelValue` but ABSENT from `available`
 * still renders (it is never silently dropped) — it is shown with an "unknown"
 * marker so the admin can see and optionally remove it. Sources in `available`
 * but not yet in the order are offered in the "Add a source" dropdown.
 *
 * Accessibility: every control is a real `<button>` with an explicit
 * `aria-label`; the list is an ordered `<ol>`; Up is disabled on the first row
 * and Down on the last; the editor is fully keyboard-operable.
 */
import { computed } from 'vue';
import Icon from './Icon.vue';
import Select from './ui/Select.vue';
import type { SelectOptionInput } from './ui/listbox';

const props = withDefaults(
  defineProps<{
    /** The current ordered list of source names. */
    modelValue: string[];
    /** The full set of selectable source names (built-ins + plugin sources). */
    available?: string[];
    /** Optional accessible label describing what this list orders. */
    label?: string;
  }>(),
  { available: () => [], label: '' },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

/** Defensive copy of the current order (never mutate the prop in place). */
const order = computed<string[]>(() => (Array.isArray(props.modelValue) ? props.modelValue : []));

/** Source names that exist but are not recognised by the server registry. */
function isUnknown(name: string): boolean {
  return !props.available.includes(name);
}

/** Available sources not yet present in the order — offered in the Add dropdown. */
const addableOptions = computed<SelectOptionInput[]>(() =>
  props.available
    .filter((name) => !order.value.includes(name))
    .map((name) => ({ value: name, label: name })),
);

const canAdd = computed(() => addableOptions.value.length > 0);

function emitOrder(next: string[]): void {
  emit('update:modelValue', next);
}

/** Move the item at `index` one position earlier. */
function moveUp(index: number): void {
  if (index <= 0) return;
  const next = order.value.slice();
  [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
  emitOrder(next);
}

/** Move the item at `index` one position later. */
function moveDown(index: number): void {
  if (index >= order.value.length - 1) return;
  const next = order.value.slice();
  [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
  emitOrder(next);
}

/** Remove the item at `index`. */
function removeAt(index: number): void {
  const next = order.value.slice();
  next.splice(index, 1);
  emitOrder(next);
}

/** Append a not-yet-present source (chosen from the Add dropdown). */
function addSource(name: string | number): void {
  const value = String(name);
  if (!value || order.value.includes(value)) return;
  emitOrder([...order.value, value]);
}
</script>

<template>
  <div class="source-priority" :aria-label="label || undefined" role="group">
    <ol v-if="order.length > 0" class="source-priority__list">
      <li
        v-for="(name, index) in order"
        :key="name"
        class="source-priority__item"
      >
        <span class="source-priority__rank" aria-hidden="true">{{ index + 1 }}</span>
        <span class="source-priority__name">
          {{ name }}
          <span v-if="isUnknown(name)" class="source-priority__unknown" title="Not a known source">
            unknown
          </span>
        </span>
        <div class="source-priority__controls">
          <button
            type="button"
            class="source-priority__btn"
            :disabled="index === 0"
            :aria-label="`Move ${name} up`"
            @click="moveUp(index)"
          >
            <Icon name="arrow-up" />
          </button>
          <button
            type="button"
            class="source-priority__btn"
            :disabled="index === order.length - 1"
            :aria-label="`Move ${name} down`"
            @click="moveDown(index)"
          >
            <Icon name="arrow-down" />
          </button>
          <button
            type="button"
            class="source-priority__btn source-priority__btn--remove"
            :aria-label="`Remove ${name}`"
            @click="removeAt(index)"
          >
            <Icon name="x" />
          </button>
        </div>
      </li>
    </ol>

    <p v-else class="source-priority__empty" role="status">
      No sources — add one below.
    </p>

    <div v-if="canAdd" class="source-priority__add">
      <Select
        :model-value="null"
        :options="addableOptions"
        placeholder="Add a source…"
        :label="label ? `Add a source to ${label}` : 'Add a source'"
        @update:model-value="addSource"
      />
    </div>
  </div>
</template>

<style scoped>
.source-priority {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.source-priority__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.source-priority__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
}
.source-priority__rank {
  flex: 0 0 auto;
  min-width: 1.5rem;
  text-align: center;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text-subtle);
}
.source-priority__name {
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text);
}
.source-priority__unknown {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--error);
}
.source-priority__controls {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1, 0.25rem);
}
.source-priority__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface-2, var(--surface));
  color: var(--text);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.source-priority__btn:hover:not(:disabled) {
  border-color: var(--accent-ring);
}
.source-priority__btn:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.source-priority__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.source-priority__btn--remove:hover:not(:disabled) {
  border-color: var(--error);
  color: var(--error);
}
.source-priority__empty {
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.source-priority__add {
  max-width: 28rem;
}
@media (prefers-reduced-motion: reduce) {
  .source-priority__btn {
    transition: none;
  }
}
</style>
