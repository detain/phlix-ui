<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Button — token-driven action button (R0.4a).
 *
 * Variants: solid (accent) · ghost · outline · subtle.
 * Sizes: sm · md · lg (height from the density scale).
 * Loading shows a spinner + sets aria-busy and blocks interaction — but NOT via
 * the native `disabled` attribute: a native-disabled button is dropped from the
 * sequential focus order, so focus on a submit-as-you-save button vanishes to
 * <body> the moment `loading` flips true (ui review webux #13, CU-117). While
 * loading the element stays focusable and announces `aria-disabled="true"`;
 * activation is blocked by the click/submit guards below. The explicit
 * `disabled` prop still maps to the native attribute (unchanged contract).
 * Optional leftIcon / rightIcon (Lucide names). Keyboard + :focus-visible ring,
 * reduced-motion aware.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Icon, { type IconName } from '../Icon.vue';

const props = withDefaults(
  defineProps<{
    variant?: 'solid' | 'ghost' | 'outline' | 'subtle' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
    leftIcon?: IconName;
    rightIcon?: IconName;
  }>(),
  { variant: 'solid', size: 'md', type: 'button', loading: false, disabled: false, block: false },
);

const rootEl = ref<HTMLButtonElement | null>(null);

/**
 * Click guard for the loading state (CU-117): the element is no longer
 * native-disabled while loading, so consumer click listeners (fallthrough
 * `@click`) would fire. This listener is bound in the component's own
 * template, so Vue attaches it before merged fallthrough listeners —
 * stopImmediatePropagation() here keeps the activation from reaching them.
 */
function onActivationGuard(event: MouseEvent): void {
  if (!props.loading) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}

/**
 * A <button type="submit" loading> must not submit its form: with the native
 * attribute gone, the browser would honor Enter/click submission. Capture-phase
 * listener on the closest owning form; only submissions this button originates
 * (SubmitEvent.submitter === us) are blocked — other controls in the same form
 * keep working.
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
    class="phlix-btn"
    :class="[`phlix-btn--${variant}`, `phlix-btn--${size}`, { 'phlix-btn--block': block, 'is-loading': loading }]"
    :disabled="disabled || undefined"
    :aria-disabled="loading || undefined"
    :aria-busy="loading || undefined"
    @click="onActivationGuard"
  >
    <span v-if="loading" class="phlix-btn__spinner"><Icon name="spinner" /></span>
    <Icon v-if="leftIcon && !loading" :name="leftIcon" class="phlix-btn__icon" />
    <span class="phlix-btn__label"><slot /></span>
    <Icon v-if="rightIcon" :name="rightIcon" class="phlix-btn__icon" />
  </button>
</template>

<style scoped>
.phlix-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-family: var(--font-sans);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-snug);
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-spring),
    box-shadow var(--dur-base) var(--ease-out);
}
.phlix-btn:active:not(:disabled):not(.is-loading) { transform: scale(0.97); }
.phlix-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.phlix-btn:disabled { opacity: 0.55; cursor: not-allowed; }
/* Loading keeps the element focusable (CU-117), so it wears the disabled
   look through the class rather than the native attribute. */
.phlix-btn.is-loading { opacity: 0.55; cursor: not-allowed; }
.phlix-btn--block { width: 100%; }

/* sizes */
.phlix-btn--sm { height: calc(var(--control-h) - 6px); font-size: var(--text-xs); padding-inline: var(--space-3); }
.phlix-btn--lg { height: calc(var(--control-h) + 6px); font-size: var(--text-base); padding-inline: var(--space-5); }

/* variants */
.phlix-btn--solid {
  background: var(--accent);
  color: var(--text-on-accent);
  box-shadow: var(--shadow-1);
}
.phlix-btn--solid:hover:not(:disabled):not(.is-loading) { background: var(--accent-hover); box-shadow: var(--glow-amber); }
.phlix-btn--solid:active:not(:disabled):not(.is-loading) { background: var(--accent-active); }

.phlix-btn--ghost { background: transparent; color: var(--text-muted); }
.phlix-btn--ghost:hover:not(:disabled):not(.is-loading) { background: var(--surface-2); color: var(--text); }

.phlix-btn--outline { background: transparent; color: var(--text); border-color: var(--border-strong); }
.phlix-btn--outline:hover:not(:disabled):not(.is-loading) { border-color: var(--accent-ring); color: var(--accent-text); }

.phlix-btn--subtle { background: var(--surface-2); color: var(--text); }
.phlix-btn--subtle:hover:not(:disabled):not(.is-loading) { background: var(--surface-3); }

.phlix-btn--danger { background: var(--danger, #dc2626); color: #fff; box-shadow: var(--shadow-1); }
.phlix-btn--danger:hover:not(:disabled):not(.is-loading) { background: var(--danger-hover, #b91c1c); }
.phlix-btn--danger:active:not(:disabled):not(.is-loading) { background: var(--danger-active, #991b1b); }

.phlix-btn__icon { font-size: 1.15em; }
.phlix-btn__spinner { display: inline-flex; font-size: 1.15em; animation: phlix-btn-spin 0.7s linear infinite; }
.phlix-btn.is-loading .phlix-btn__label { opacity: 0.85; }

@keyframes phlix-btn-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .phlix-btn { transition: none; }
  .phlix-btn:active:not(:disabled) { transform: none; }
  .phlix-btn__spinner { animation-duration: 1.4s; }
}
</style>
