<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * AppBackdrop (R0.6) — the Nocturne atmosphere layer.
 *
 * Renders up to three GPU-cheap, pointer-events:none layers:
 *   · ambient  — poster-derived radial glow ("Ambilight"), BEHIND content (low z)
 *   · vignette — edge darkening, OVER content (high z)
 *   · grain    — film-grain noise, OVER content (high z), mix-blend overlay
 *
 * Mount once near the app root. App content should sit at z-index 1 (above the
 * ambient layer, below the overlay). Honors `enabled` (driven by the prefs store
 * in R1) and auto-disables under prefers-reduced-motion / prefers-reduced-data.
 * A "flat" theme can simply set --grain-opacity/--ambient to 0.
 *
 * Stacking is configurable via --backdrop-z (ambient, default 0) and
 * --backdrop-overlay-z (vignette+grain, default 40).
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    enabled?: boolean;
    grain?: boolean;
    vignette?: boolean;
    ambient?: boolean;
    /** CSS color for the ambient glow (e.g. a poster's dominant color). */
    ambientColor?: string;
    /** Poster URL — a blurred, scaled copy becomes the ambient glow. */
    ambientImage?: string;
    /** 0–1 multiplier over the theme grain/ambient intensity. */
    intensity?: number;
  }>(),
  { enabled: true, grain: true, vignette: true, ambient: false, intensity: 1 },
);

const reduced = ref(false);
let mq: MediaQueryList | null = null;
let mqData: MediaQueryList | null = null;
const onChange = () => (reduced.value = !!(mq?.matches || mqData?.matches));

onMounted(() => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
  mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mqData = window.matchMedia('(prefers-reduced-data: reduce)');
  onChange();
  mq.addEventListener?.('change', onChange);
  mqData.addEventListener?.('change', onChange);
});
onBeforeUnmount(() => {
  mq?.removeEventListener?.('change', onChange);
  mqData?.removeEventListener?.('change', onChange);
});

const active = computed(() => props.enabled && !reduced.value);
const showAmbient = computed(() => active.value && props.ambient && !!(props.ambientColor || props.ambientImage));
/* Percent-encode anything that could break out of url(...) — defends against CSS
   injection from an untrusted poster URL (quotes, parens, whitespace). */
function safeUrl(u: string): string {
  return encodeURI(u).replace(/["'()\s]/g, (c) => `%${c.charCodeAt(0).toString(16)}`);
}

const ambientStyle = computed(() => {
  if (props.ambientImage) {
    return { backgroundImage: `url("${safeUrl(props.ambientImage)}")`, opacity: String(0.55 * props.intensity) };
  }
  // If ambientColor is invalid the whole `background` is dropped and the scoped
  // CSS fallback (built from --ambient) shows instead — never a blank glow.
  return {
    background: `radial-gradient(60% 60% at 25% 12%, ${props.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${props.ambientColor} 55%, transparent), transparent 70%)`,
    opacity: String(0.85 * props.intensity),
  };
});
const grainStyle = computed(() => ({ opacity: `calc(var(--grain-opacity) * ${props.intensity})` }));
</script>

<template>
  <!-- multiple roots: no wrapper box, and aria-hidden sits on each real layer
       (a display:contents wrapper would not reliably hide its descendants). -->
  <div
    v-if="showAmbient"
    class="phlix-backdrop__ambient"
    :class="{ 'is-image': !!ambientImage }"
    :style="ambientStyle"
    aria-hidden="true"
  />
  <div v-if="active && vignette" class="phlix-backdrop__vignette" aria-hidden="true" />
  <div v-if="active && grain" class="phlix-backdrop__grain" :style="grainStyle" aria-hidden="true" />
</template>

<style scoped>
.phlix-backdrop__ambient,
.phlix-backdrop__vignette,
.phlix-backdrop__grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  /* layout+paint containment (NOT `strict` — size containment can collapse a
     fixed inset:0 box to 0 on some engines). */
  contain: layout paint;
}

/* Ambient glow — behind app content. The full-viewport blur is the heaviest
   part of the atmosphere; it is static (steady-state cheap) and fully gated by
   `enabled` / reduced-motion / reduced-data. */
.phlix-backdrop__ambient {
  z-index: var(--backdrop-z, 0);
  /* fallback when an invalid ambientColor drops the inline background */
  background: radial-gradient(60% 60% at 25% 12%, var(--ambient), transparent 70%);
  filter: blur(50px);
  transform: translateZ(0); /* own layer; cheap to composite */
  transition: opacity var(--dur-slower) var(--ease-out);
}
.phlix-backdrop__ambient.is-image {
  background-size: cover;
  background-position: center 20%;
  filter: blur(70px) saturate(1.3);
}

/* Vignette — over content. */
.phlix-backdrop__vignette {
  z-index: var(--backdrop-overlay-z, 40);
  background: radial-gradient(ellipse 120% 90% at 50% 42%, transparent 52%, var(--vignette) 100%);
}

/* Film grain — over content, blended. Static SVG turbulence; no animation. */
.phlix-backdrop__grain {
  z-index: calc(var(--backdrop-overlay-z, 40) + 1);
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
  .phlix-backdrop__ambient { transition: none; }
}
</style>
