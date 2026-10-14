<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ConfirmDialog (R13-05) — the shared yes/no gate for destructive or
 * consequential actions, replacing scattered `window.confirm()` calls.
 *
 * Built on the same `<Modal>` every other dialog in this library uses, so it
 * inherits focus trapping, backdrop dismissal, ESC handling and the house
 * look. Unlike `window.confirm` it is non-blocking (no frozen event loop),
 * styleable, and testable.
 *
 * Generic chrome copy (title fallback, the two button captions) is t()-driven
 * from the `confirm.*` message keys; the SCENARIO copy — what is about to
 * happen and what it costs — is the caller's job via `message`, because only
 * the caller knows it. Pass `danger` when the action cannot be undone, so the
 * affirmative button wears the danger treatment.
 *
 * Usage:
 *   <ConfirmDialog
 *     v-model:open="askOpen"
 *     :message="`Remove “${item.name}” from the library? This cannot be undone.`"
 *     confirm-label="Remove"
 *     danger
 *     @confirm="doRemove"
 *   />
 */
import { computed } from 'vue';
import Modal from './Modal.vue';
import Button from './Button.vue';
import { useMessages } from '../../composables/useMessages';

const props = withDefaults(
  defineProps<{
    /** Dialog visibility (v-model:open). */
    open: boolean;
    /** Dialog title; defaults to the generic "Are you sure?" caption. */
    title?: string;
    /** The scenario text — REQUIRED: a confirm with nothing to confirm is theater. */
    message: string;
    /** Affirmative caption; defaults to "Confirm". */
    confirmLabel?: string;
    /** Style the affirmative button as destructive (R13-13 pairs this with truth). */
    danger?: boolean;
  }>(),
  { title: undefined, confirmLabel: undefined, danger: false },
);

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const { t } = useMessages();

const resolvedTitle = computed(() => props.title ?? t('confirm.title'));
const resolvedConfirm = computed(() => props.confirmLabel ?? t('confirm.confirm'));
const cancelLabel = computed(() => t('confirm.cancel'));

function onDismiss(): void {
  emit('update:open', false);
  emit('cancel');
}

function onConfirm(): void {
  // Order is load-bearing: callers snapshot the armed target inside @confirm,
  // so the update:open (which pages commonly use to clear that target) must
  // fire LAST — a confirm handler that runs after the close would see nothing.
  emit('confirm');
  emit('update:open', false);
}
</script>

<template>
  <Modal
    :model-value="open"
    :title="resolvedTitle"
    @update:model-value="(v: boolean) => { if (!v) onDismiss(); }"
  >
    <p class="phlix-confirm__message">{{ message }}</p>
    <template #footer>
      <Button variant="ghost" size="sm" @click="onDismiss">{{ cancelLabel }}</Button>
      <Button
        :variant="danger ? 'danger' : 'solid'"
        size="sm"
        data-testid="confirm-dialog-affirmative"
        @click="onConfirm"
      >
        {{ resolvedConfirm }}
      </Button>
    </template>
  </Modal>
</template>

<style scoped>
.phlix-confirm__message {
  margin: 0;
  line-height: var(--leading-normal, 1.5);
  max-width: 42rem;
}
</style>
