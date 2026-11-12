<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * IconButton — square, icon-only button (R0.4a).
 *
 * Requires an accessible `label` (becomes aria-label + tooltip title). Variants
 * mirror Button; sizes sm/md/lg. Pressed state via `pressed` (renders
 * aria-pressed for toggles). Keyboard + :focus-visible, reduced-motion aware.
 *
 * Loading follows Button's CU-117 contract (ui review webux #13): the spinner
 * + aria-busy + `aria-disabled="true"` arm blocks activation WITHOUT the
 * native `disabled` attribute, because a native-disabled button drops out of
 * the focus order and a focused confirm-then-busy control (Settings > Sessions
 * revoke, UI-12/UI-13) would dump focus to <body> the instant it went busy.
 * Activation is blocked by the click/submit guards below; the explicit
 * `disabled` prop still maps to the native attribute (unchanged contract).
 */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Icon, { type IconName } from '../Icon.vue';

const props = withDefaults(
  defineProps<{
    name: IconName;
    label: string;
    variant?: 'solid' | 'ghost' | 'outline' | 'subtle';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    disabled?: boolean;
    /** Toggle state — when defined, exposes aria-pressed. */
    pressed?: boolean;
  }>(),
  { variant: 'ghost', size: 'md', type: 'button', loading: false, disabled: false, pressed: undefined },
);

const rootEl = ref<HTMLButtonElement | null>(null);

/**
 * Click guard for the loading state (CU-117, Button.vue twin): bound in this
 * template, so Vue attaches it before merged fallthrough `@click` listeners —
 * stopImmediatePropagation() keeps the activation from reaching them.
 */
function onActivationGuard(event: MouseEvent): void {
  if (!props.loading) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}

/**
 * A `type="submit"` icon button that is loading must not submit its form
 * (the native attribute no longer blocks it). Only submissions this button
 * originates are blocked — Button.vue's capture-phase twin.
 */
function onFormSubmitGuard(event: Event): void {
  if (!props.loading) return;
  if ((event as SubmitEvent).submitter !== rootEl.value) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}

let boundForm: HTMLFormElement | null = null;

onMounted(() => {
  const form = rootEl.value?.closest('form');
  if (!form) return;
  form.addEventListener('submit', onFormSubmitGuard, true);
  boundForm = form;
});

onBeforeUnmount(() => {
  boundForm?.removeEventListener('submit', onFormSubmitGuard, true);
  boundForm = null;
});
</script>

<template>
  <button
    ref="rootEl"
    :type="type"
    class="phlix-iconbtn"
    :class="[`phlix-iconbtn--${variant}`, `phlix-iconbtn--${size}`, { 'is-pressed': pressed, 'is-loading': loading }]"
    :disabled="disabled || undefined"
    :aria-disabled="loading || undefined"
    :aria-label="label"
    :title="label"
    :aria-pressed="pressed === undefined ? undefined : pressed"
    :aria-busy="loading || undefined"
    @click="onActivationGuard"
  >
    <Icon :name="loading ? 'spinner' : name" :class="{ 'phlix-iconbtn__spin': loading }" />
  </button>
</template>

<style scoped>
.phlix-iconbtn {
  display: inline-grid;
  place-items: center;
  width: var(--control-h);
  height: var(--control-h);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  color: var(--text-muted);
  font-size: 1.2em;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-spring),
    box-shadow var(--dur-base) var(--ease-out);
}
.phlix-iconbtn:hover:not(:disabled):not(.is-loading) { color: var(--text); transform: scale(1.08); }
.phlix-iconbtn:active:not(:disabled):not(.is-loading) { transform: scale(0.94); }
.phlix-iconbtn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); }
.phlix-iconbtn:disabled { opacity: 0.5; cursor: not-allowed; }
/* Loading keeps the element focusable (CU-117), so it wears the disabled
   look through the class rather than the native attribute. */
.phlix-iconbtn.is-loading { opacity: 0.5; cursor: not-allowed; }
.phlix-iconbtn.is-pressed { color: var(--accent-text); background: var(--accent-soft); }

.phlix-iconbtn--sm { width: calc(var(--control-h) - 6px); height: calc(var(--control-h) - 6px); font-size: 1.05em; }
.phlix-iconbtn--lg { width: calc(var(--control-h) + 8px); height: calc(var(--control-h) + 8px); font-size: 1.35em; }

.phlix-iconbtn--solid { background: var(--accent); color: var(--text-on-accent); box-shadow: var(--shadow-1); }
.phlix-iconbtn--solid:hover:not(:disabled):not(.is-loading) { background: var(--accent-hover); color: var(--text-on-accent); box-shadow: var(--glow-amber); }
.phlix-iconbtn--outline { border-color: var(--border-strong); color: var(--text); }
.phlix-iconbtn--outline:hover:not(:disabled):not(.is-loading) { border-color: var(--accent-ring); color: var(--accent-text); }
.phlix-iconbtn--subtle { background: var(--surface-2); color: var(--text); }
.phlix-iconbtn--subtle:hover:not(:disabled):not(.is-loading) { background: var(--surface-3); }

.phlix-iconbtn__spin { animation: phlix-iconbtn-spin 0.7s linear infinite; }
@keyframes phlix-iconbtn-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .phlix-iconbtn { transition: none; }
  .phlix-iconbtn:hover:not(:disabled), .phlix-iconbtn:active:not(:disabled) { transform: none; }
  .phlix-iconbtn__spin { animation-duration: 1.4s; }
}
</style>
