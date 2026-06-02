<script setup lang="ts">
/**
 * IconButton — square, icon-only button (R0.4a).
 *
 * Requires an accessible `label` (becomes aria-label + tooltip title). Variants
 * mirror Button; sizes sm/md/lg. Pressed state via `pressed` (renders
 * aria-pressed for toggles). Keyboard + :focus-visible, reduced-motion aware.
 */
import { computed } from 'vue';
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

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    :type="type"
    class="phlix-iconbtn"
    :class="[`phlix-iconbtn--${variant}`, `phlix-iconbtn--${size}`, { 'is-pressed': pressed }]"
    :disabled="isDisabled"
    :aria-label="label"
    :title="label"
    :aria-pressed="pressed === undefined ? undefined : pressed"
    :aria-busy="loading || undefined"
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
.phlix-iconbtn:hover:not(:disabled) { color: var(--text); transform: scale(1.08); }
.phlix-iconbtn:active:not(:disabled) { transform: scale(0.94); }
.phlix-iconbtn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); }
.phlix-iconbtn:disabled { opacity: 0.5; cursor: not-allowed; }
.phlix-iconbtn.is-pressed { color: var(--accent); background: var(--accent-soft); }

.phlix-iconbtn--sm { width: calc(var(--control-h) - 6px); height: calc(var(--control-h) - 6px); font-size: 1.05em; }
.phlix-iconbtn--lg { width: calc(var(--control-h) + 8px); height: calc(var(--control-h) + 8px); font-size: 1.35em; }

.phlix-iconbtn--solid { background: var(--accent); color: var(--text-on-accent); box-shadow: var(--shadow-1); }
.phlix-iconbtn--solid:hover:not(:disabled) { background: var(--accent-hover); color: var(--text-on-accent); box-shadow: var(--glow-amber); }
.phlix-iconbtn--outline { border-color: var(--border-strong); color: var(--text); }
.phlix-iconbtn--outline:hover:not(:disabled) { border-color: var(--accent-ring); color: var(--accent); }
.phlix-iconbtn--subtle { background: var(--surface-2); color: var(--text); }
.phlix-iconbtn--subtle:hover:not(:disabled) { background: var(--surface-3); }

.phlix-iconbtn__spin { animation: phlix-iconbtn-spin 0.7s linear infinite; }
@keyframes phlix-iconbtn-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .phlix-iconbtn { transition: none; }
  .phlix-iconbtn:hover:not(:disabled), .phlix-iconbtn:active:not(:disabled) { transform: none; }
  .phlix-iconbtn__spin { animation-duration: 1.4s; }
}
</style>
