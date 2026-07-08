<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * Button — token-driven action button (R0.4a).
 *
 * Variants: solid (accent) · ghost · outline · subtle.
 * Sizes: sm · md · lg (height from the density scale).
 * Loading shows a spinner + sets aria-busy and blocks interaction.
 * Optional leftIcon / rightIcon (Lucide names). Keyboard + :focus-visible ring,
 * reduced-motion aware.
 */
import { computed } from 'vue';
import Icon, { type IconName } from '../Icon.vue';

const props = withDefaults(
  defineProps<{
    variant?: 'solid' | 'ghost' | 'outline' | 'subtle';
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

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    :type="type"
    class="phlix-btn"
    :class="[`phlix-btn--${variant}`, `phlix-btn--${size}`, { 'phlix-btn--block': block, 'is-loading': loading }]"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
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
.phlix-btn:active:not(:disabled) { transform: scale(0.97); }
.phlix-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.phlix-btn:disabled { opacity: 0.55; cursor: not-allowed; }
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
.phlix-btn--solid:hover:not(:disabled) { background: var(--accent-hover); box-shadow: var(--glow-amber); }
.phlix-btn--solid:active:not(:disabled) { background: var(--accent-active); }

.phlix-btn--ghost { background: transparent; color: var(--text-muted); }
.phlix-btn--ghost:hover:not(:disabled) { background: var(--surface-2); color: var(--text); }

.phlix-btn--outline { background: transparent; color: var(--text); border-color: var(--border-strong); }
.phlix-btn--outline:hover:not(:disabled) { border-color: var(--accent-ring); color: var(--accent-text); }

.phlix-btn--subtle { background: var(--surface-2); color: var(--text); }
.phlix-btn--subtle:hover:not(:disabled) { background: var(--surface-3); }

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
