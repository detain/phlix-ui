<script setup lang="ts">
/**
 * Tabs (R0.4e) — accessible tabs with roving tabindex + automatic activation.
 *
 *   <Tabs v-model="tab" :tabs="[{value:'a',label:'A'},{value:'b',label:'B'}]">
 *     <template #a>Panel A</template><template #b>Panel B</template>
 *   </Tabs>
 *
 * role=tablist/tab/tabpanel; Left/Right move (skip disabled, wrap), Home/End;
 * selecting moves focus; panel is labelled by its tab.
 */
import { computed, ref, useId } from 'vue';
import Icon, { type IconName } from '../Icon.vue';
import { nextEnabledIndex } from './listbox';

export interface TabItem {
  value: string;
  label: string;
  icon?: IconName;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{ modelValue: string; tabs: readonly TabItem[]; label?: string }>(),
  {},
);
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const baseId = useId();
const listEl = ref<HTMLElement | null>(null);

const activeIndex = computed(() => props.tabs.findIndex((t) => t.value === props.modelValue));
const tabId = (v: string) => `${baseId}-tab-${v}`;
const panelId = (v: string) => `${baseId}-panel-${v}`;
// listbox helper operates on {disabled} shapes — TabItem qualifies.
const asOpts = computed(() => props.tabs.map((t) => ({ value: t.value, label: t.label, disabled: t.disabled })));

function select(v: string) {
  const t = props.tabs.find((x) => x.value === v);
  if (!t || t.disabled) return;
  if (v !== props.modelValue) emit('update:modelValue', v);
}
function focusTabAt(index: number) {
  listEl.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
}

function onKeydown(e: KeyboardEvent) {
  let to = -1;
  switch (e.key) {
    case 'ArrowRight': case 'ArrowDown': to = nextEnabledIndex(asOpts.value, activeIndex.value, 1); break;
    case 'ArrowLeft': case 'ArrowUp': to = nextEnabledIndex(asOpts.value, activeIndex.value, -1); break;
    case 'Home': to = nextEnabledIndex(asOpts.value, -1, 1); break;
    case 'End': to = nextEnabledIndex(asOpts.value, 0, -1); break;
    default: return;
  }
  if (to >= 0) {
    e.preventDefault();
    select(props.tabs[to].value);
    focusTabAt(to);
  }
}
</script>

<template>
  <div class="phlix-tabs">
    <div ref="listEl" class="phlix-tabs__list" role="tablist" :aria-label="label" @keydown="onKeydown">
      <button
        v-for="t in tabs"
        :id="tabId(t.value)"
        :key="t.value"
        type="button"
        role="tab"
        class="phlix-tabs__tab"
        :class="{ 'is-active': t.value === modelValue }"
        :aria-selected="t.value === modelValue"
        :aria-controls="panelId(t.value)"
        :tabindex="t.value === modelValue ? 0 : -1"
        :disabled="t.disabled"
        @click="select(t.value)"
      >
        <Icon v-if="t.icon" :name="t.icon" class="phlix-tabs__icon" />
        {{ t.label }}
      </button>
    </div>
    <div
      v-if="modelValue"
      :id="panelId(modelValue)"
      class="phlix-tabs__panel"
      role="tabpanel"
      :aria-labelledby="tabId(modelValue)"
      tabindex="0"
    >
      <slot :name="modelValue"><slot /></slot>
    </div>
  </div>
</template>

<style scoped>
.phlix-tabs__list {
  display: flex;
  gap: var(--space-1);
  border-bottom: 1px solid var(--border-subtle);
}
.phlix-tabs__tab {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.phlix-tabs__tab:hover:not(:disabled) { color: var(--text); }
.phlix-tabs__tab.is-active { color: var(--accent); border-bottom-color: var(--accent); }
.phlix-tabs__tab:disabled { opacity: 0.45; cursor: not-allowed; }
.phlix-tabs__tab:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); border-radius: var(--radius-sm); }
.phlix-tabs__icon { font-size: 1.1em; }
.phlix-tabs__panel { padding-top: var(--space-5); }
.phlix-tabs__panel:focus-visible { outline: none; }
@media (prefers-reduced-motion: reduce) {
  .phlix-tabs__tab { transition: none; }
}
</style>
