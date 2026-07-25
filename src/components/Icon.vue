<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Icon — the single SVG icon component for @phlix/ui (R0.3).
 *
 * Usage:  <Icon name="play" />            (decorative — aria-hidden)
 *         <Icon name="play" label="Play" /> (meaningful — role=img + aria-label)
 *         <Icon name="search" :size="20" /> (px) · <Icon name="x" size="1.25rem" />
 *
 * Icons are Lucide, resolved via unplugin-icons' `~icons/lucide/*` virtual modules
 * — each compiles to an inline SVG and only the registered names are bundled
 * (tree-shaken). Icons inherit `currentColor` and size in `em` of the surrounding
 * text by default, so they tint + scale with their context.
 *
 * The name→component registry lives in `./icon-registry` so a test can iterate it
 * (see `ICON_NAMES`); `IconName` is re-exported here because ~30 modules already
 * import it from this file.
 */
import { computed } from 'vue';
import { icons, type IconName } from './icon-registry';

export type { IconName };

const props = withDefaults(
  defineProps<{
    /** Icon name from the Lucide registry. */
    name: IconName;
    /** Optional CSS length (number → px). Omit to inherit 1em of the text. */
    size?: number | string;
    /** Accessible label. When set the icon is exposed as role="img"; otherwise it is aria-hidden. */
    label?: string;
    /** Stroke width override (Lucide default 2). */
    strokeWidth?: number | string;
  }>(),
  { size: undefined, label: undefined, strokeWidth: undefined },
);

const component = computed(() => icons[props.name]);

const sizeValue = computed(() =>
  props.size === undefined ? undefined : typeof props.size === 'number' ? `${props.size}px` : props.size,
);
</script>

<template>
  <component
    :is="component"
    class="phlix-icon"
    :style="sizeValue ? { fontSize: sizeValue } : undefined"
    :stroke-width="strokeWidth"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  />
</template>

<style>
.phlix-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  color: inherit;
  vertical-align: -0.125em;
}
</style>
