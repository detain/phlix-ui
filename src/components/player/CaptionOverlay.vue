<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * CaptionOverlay (R3.5) — renders the active subtitle cues as a CUSTOM overlay
 * (not native `::cue`) so the full caption style (size/color/background/edge) can
 * be applied. The selected track is put in `mode='hidden'` (parsed, not painted)
 * and we draw its `activeCues` here. Renders nothing when captions are off, no
 * track matches, or the cue is empty. Cue text is stripped of markup and rendered
 * as TEXT (never v-html). jsdom/SSR-safe — degrades to no cues.
 */
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import type { CaptionStyle } from '../../stores/usePreferencesStore';
import { applyTrackModes, resolveTextTrack, readActiveCueLines, captionStyleVars } from './captions';

const props = defineProps<{
  /** The `<video>` whose text tracks are read (may be null before mount). */
  video: HTMLVideoElement | null;
  /** Active subtitle language key (from the player store); null = off. */
  language: string | null;
  /** Persisted caption appearance. */
  styleConfig: CaptionStyle;
  /** Raise the captions above the control bar while the chrome is visible. */
  lifted?: boolean;
}>();

const lines = ref<string[]>([]);

const vars = computed(() => captionStyleVars(props.styleConfig));

let boundTrack: TextTrack | null = null;
let boundTrackEl: HTMLTrackElement | null = null;
function onCueChange(): void {
  lines.value = readActiveCueLines(boundTrack);
}

function unbind(): void {
  boundTrack?.removeEventListener('cuechange', onCueChange);
  boundTrackEl?.removeEventListener('load', onCueChange);
  boundTrack = null;
  boundTrackEl = null;
}

/** The `<track>` element backing a resolved TextTrack (matched by identity), or
 *  null when the video isn't a real DOM element (jsdom/tests) or has no `<track>`
 *  children. Used by `rebind` to re-read the cues once the sidecar VTT loads. */
function trackElementFor(video: HTMLVideoElement | null, track: TextTrack): HTMLTrackElement | null {
  const els = video?.querySelectorAll?.('track');
  if (!els) return null;
  for (let i = 0; i < els.length; i++) {
    const el = els[i] as HTMLTrackElement;
    if (el.track === track) return el;
  }
  return null;
}

/** Re-point the cuechange listener at the currently-selected track. */
function rebind(): void {
  unbind();
  applyTrackModes(props.video, props.language);
  const track = resolveTextTrack(props.video, props.language);
  if (track) {
    boundTrack = track;
    track.addEventListener('cuechange', onCueChange);
    lines.value = readActiveCueLines(track); // catch already-active cues
    // Server subtitle sidecars (VTT) load their cues asynchronously the moment
    // the track flips to `hidden` above. When captions START enabled (a server
    // default), that fetch races this synchronous read — `activeCues` is still
    // empty here, and the engine does NOT reliably fire `cuechange` for the cue
    // that is already active at load time. Captions then stay blank until the
    // user toggles them off/on (which re-reads a now-loaded track). Re-read on
    // the `<track>`'s own `load` so that first cue paints without the toggle.
    if (!lines.value.length) {
      const el = trackElementFor(props.video, track);
      if (el && el.readyState !== 2 /* HTMLTrackElement.LOADED */) {
        boundTrackEl = el;
        el.addEventListener('load', onCueChange);
      }
    }
  } else {
    lines.value = [];
  }
}

watch(() => [props.video, props.language] as const, rebind, { immediate: true });

onBeforeUnmount(unbind);

defineExpose({ lines });
</script>

<template>
  <div v-if="lines.length" class="player__captions" :class="{ 'is-lifted': lifted }" :style="vars">
    <p v-for="(line, i) in lines" :key="i" class="player__caption-line">{{ line }}</p>
  </div>
</template>

<style scoped>
.player__captions {
  position: absolute;
  z-index: 4;
  left: 50%;
  bottom: var(--space-6);
  transform: translateX(-50%);
  width: max-content;
  max-width: min(90%, 56ch);
  text-align: center;
  pointer-events: none;
  transition: bottom var(--dur-base) var(--ease-out);
}
/* lift clear of the control bar (scrubber + button row) when the chrome shows */
.player__captions.is-lifted {
  bottom: calc(var(--space-6) + 88px);
}
.player__caption-line {
  display: inline-block;
  margin: 2px 0;
  font-family: var(--font-ui, inherit);
  font-weight: var(--font-semibold);
  font-size: calc(var(--cap-scale, 1) * clamp(0.95rem, 2.4vw, 2rem));
  line-height: 1.3;
  color: var(--cap-color, #fff);
  background: var(--cap-bg, transparent);
  padding: var(--cap-pad, 0);
  border-radius: 4px;
  text-shadow: var(--cap-shadow, 0 2px 6px rgba(0, 0, 0, 0.85));
  white-space: pre-wrap;
}
@media (prefers-reduced-motion: reduce) {
  .player__captions {
    transition: none;
  }
}
</style>
