<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ItemDataInspector (S15) — a read-only "Explore item data" panel.
 *
 * The admin ⋯-menu action "Explore item data" opens this modal for one item. It
 * is purely CLIENT-SIDE: the host already holds the full `MediaItem` (all its
 * metadata is in memory from the listing/detail fetch), so this never makes a
 * network call — it just pretty-prints the object the host passes in. That keeps
 * it a safe, dependency-free inspector reusable by every MediaCard host.
 *
 * Built on the shared `Modal` (focus-trap + Esc + backdrop close come for free).
 * A "Copy JSON" button copies the serialized item to the clipboard when the
 * platform exposes `navigator.clipboard` (gracefully no-ops otherwise).
 */
import { computed, ref, watch } from 'vue';
import type { MediaItem } from '../types/media-item';
import Modal from './ui/Modal.vue';
import Button from './ui/Button.vue';
import { useMessages } from '../composables/useMessages';

const props = defineProps<{
  /** Two-way open state (drives the underlying Modal). */
  modelValue: boolean;
  /** The item to inspect. Null renders an empty placeholder. */
  item: MediaItem | null;
}>();

const { t } = useMessages();

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
}>();

/** The item serialized as indented, human-readable JSON (empty when no item). */
const json = computed(() =>
  props.item ? JSON.stringify(props.item, null, 2) : '',
);

/** Transient "Copied" affordance; reset whenever the modal (re)opens. */
const copied = ref(false);
watch(
  () => props.modelValue,
  (open) => {
    if (open) copied.value = false;
  },
);

async function copyJson(): Promise<void> {
  if (!json.value) return;
  try {
    await navigator.clipboard.writeText(json.value);
    copied.value = true;
  } catch {
    // Clipboard unavailable (insecure context / jsdom) — silently ignore; the
    // JSON is already visible on screen to copy manually.
    copied.value = false;
  }
}
</script>

<template>
  <Modal
    :model-value="modelValue"
    size="lg"
    :title="item ? t('inspector.titled', { name: item.name }) : t('inspector.title')"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div v-if="item" class="item-inspector">
      <p class="item-inspector__hint">{{ t('inspector.hint') }}</p>
      <pre class="item-inspector__json" data-test="item-json">{{ json }}</pre>
    </div>
    <p v-else class="item-inspector__empty">{{ t('inspector.noItem') }}</p>

    <template #footer>
      <span v-if="copied" class="item-inspector__copied" role="status">{{ t('inspector.copied') }}</span>
      <Button variant="ghost" :disabled="!item" @click="copyJson">{{ t('inspector.copyJson') }}</Button>
      <Button variant="solid" @click="emit('update:modelValue', false)">{{ t('common.close') }}</Button>
    </template>
  </Modal>
</template>

<style scoped>
.item-inspector {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.item-inspector__hint {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.item-inspector__json {
  margin: 0;
  padding: var(--space-4);
  max-height: 60vh;
  overflow: auto;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--text);
  white-space: pre;
  tab-size: 2;
}
.item-inspector__empty {
  margin: 0;
  color: var(--text-muted);
}
.item-inspector__copied {
  align-self: center;
  margin-right: auto;
  font-size: var(--text-sm);
  color: var(--text-muted);
}
</style>
