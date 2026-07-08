<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * Badge — small status / metadata label (R0.4a).
 *
 * Tones: neutral · accent · success · warning · error · info.
 * `mono` renders the label in tabular JetBrains Mono (e.g. "4K · HDR", counts).
 * Decorative by default; pass `label` for an accessible name when the badge is
 * the only conveyor of meaning. Optional leading icon.
 */
import Icon, { type IconName } from '../Icon.vue';

withDefaults(
  defineProps<{
    tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
    mono?: boolean;
    icon?: IconName;
    label?: string;
  }>(),
  { tone: 'neutral', size: 'sm', mono: false },
);
</script>

<template>
  <span
    class="phlix-badge"
    :class="[`phlix-badge--${tone}`, `phlix-badge--${size}`, { 'phlix-badge--mono': mono }]"
    :role="label ? 'img' : undefined"
    :aria-label="label"
  >
    <Icon v-if="icon" :name="icon" class="phlix-badge__icon" />
    <slot />
  </span>
</template>

<style scoped>
.phlix-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.2em 0.55em;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-2xs);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  line-height: 1.4;
  border: 1px solid transparent;
  white-space: nowrap;
}
.phlix-badge--md { font-size: var(--text-xs); padding: 0.25em 0.6em; }
.phlix-badge--mono {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  text-transform: none;
  letter-spacing: 0;
}
.phlix-badge__icon { font-size: 1.1em; }

.phlix-badge--neutral { background: var(--surface-glass-strong); color: var(--text); border-color: var(--border-strong); }
.phlix-badge--accent  { background: var(--accent); color: var(--text-on-accent); }
.phlix-badge--success { background: var(--success-bg); color: var(--success); border-color: color-mix(in srgb, var(--success) 35%, transparent); }
.phlix-badge--warning { background: var(--warning-bg); color: var(--warning); border-color: color-mix(in srgb, var(--warning) 35%, transparent); }
.phlix-badge--error   { background: var(--error-bg); color: var(--error); border-color: color-mix(in srgb, var(--error) 35%, transparent); }
.phlix-badge--info    { background: var(--info-bg); color: var(--info); border-color: color-mix(in srgb, var(--info) 35%, transparent); }
</style>
