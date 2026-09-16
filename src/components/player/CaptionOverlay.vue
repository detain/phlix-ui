<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script lang="ts">
/**
 * W109 S504 — code-resident survival sentinel for the ResizeObserver-driven
 * subtitle lift. Exported so it is genuine shipped module surface (not a comment
 * that a future build could strip), mirroring the estate's token convention.
 */
export const S504_SUBOFFSET_TOKEN = 'S504SUBOFFSETX9P2';
</script>

<script setup lang="ts">
/**
 * CaptionOverlay (R3.5) — renders the active subtitle cues as a CUSTOM overlay
 * (not native `::cue`) so the full caption style (size/color/background/edge) can
 * be applied. The selected track is put in `mode='hidden'` (parsed, not painted)
 * and we draw its `activeCues` here. Renders nothing when captions are off, no
 * track matches, or the cue is empty. Cue text is stripped of markup and rendered
 * as TEXT (never v-html). jsdom/SSR-safe — degrades to no cues.
 *
 * Lift while the chrome is up (S504): the control cluster (`controlsRoot`, passed
 * from the Player) is measured with a ResizeObserver and the real height is bound
 * to `--phlix-sub-offset`, so the captions translate up by exactly the bar they
 * must clear — taller control rows (MarkerTimeline / quality) are now covered. This
 * REPLACES the old fixed-pixel lift (which under-shot those rows). The offset is
 * `0` while the chrome is hidden (`lifted` false), so the captions reset to their
 * resting line. ResizeObserver only — never a MutationObserver — and it is guarded
 * so jsdom/SSR (where it is undefined) simply degrades to a `0` offset. Custom
 * render path only: native `::cue` never mounts this overlay.
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
  /** The control cluster whose real height the captions must clear (S504). When
   *  present its height is measured with a ResizeObserver and bound to
   *  `--phlix-sub-offset`; null (standalone/test, or before the Player mounts its
   *  ref) simply yields a `0` offset. */
  controlsRoot?: HTMLElement | null;
}>();

const lines = ref<string[]>([]);

/** Measured height (px) of `controlsRoot` — the real bottom-bar the captions lift
 *  above. Refreshed by the ResizeObserver and re-read whenever the element swaps. */
const barHeight = ref(0);

/** The lift actually applied to the overlay: the measured bar height while the
 *  chrome is up, `0` once it hides — so the captions reset (S504 AC). */
const subOffset = computed(() => (props.lifted ? barHeight.value : 0));

const vars = computed(() => ({
  ...captionStyleVars(props.styleConfig),
  '--phlix-sub-offset': `${subOffset.value}px`,
}));

let ro: ResizeObserver | null = null;

/** Re-read the control cluster's height. Guarded for environments without a real
 *  layout box (jsdom reports `offsetHeight === 0`; the value is still settable in a
 *  test, which is exactly how the measure→offset wiring is pinned). */
function measureBar(): void {
  const el = props.controlsRoot;
  barHeight.value = el && typeof el.offsetHeight === 'number' ? el.offsetHeight : 0;
}

function disconnectBar(): void {
  ro?.disconnect();
  ro = null;
}

/** (Re)point a single ResizeObserver at the current control cluster. Re-runs when
 *  `controlsRoot` swaps (the Player's ref resolves only after it mounts). */
function observeBar(): void {
  disconnectBar();
  measureBar();
  const el = props.controlsRoot;
  if (!el || typeof ResizeObserver === 'undefined') return;
  ro = new ResizeObserver(() => measureBar());
  ro.observe(el);
}

watch(() => props.controlsRoot, observeBar, { immediate: true });
onBeforeUnmount(disconnectBar);

let boundTrack: TextTrack | null = null;
let boundTrackEl: HTMLTrackElement | null = null;
/** Handle for the one short deferred mode re-check scheduled per `rebind` (S13);
 *  cancelled by `unbind`/rebind so at most one is ever pending. */
let recheckTimer: ReturnType<typeof setTimeout> | null = null;

function onCueChange(): void {
  lines.value = readActiveCueLines(boundTrack);
}

function clearRecheck(): void {
  if (recheckTimer != null) {
    clearTimeout(recheckTimer);
    recheckTimer = null;
  }
}

/** One short, UNCONDITIONAL deferred re-assertion of the selected track's mode +
 *  active cues (S13). Runs regardless of `readyState`, closing the gap the
 *  `readyState !== 2` load-listener guard above leaves open: when a server-default
 *  track is ALREADY loaded (readyState 2) at bind but its first cue never painted
 *  — the engine does not reliably fire `cuechange` for the cue already active at
 *  load — no load listener is attached and captions stayed blank until a manual
 *  off/on toggle. Re-asserting `applyTrackModes` also re-settles the `mode` should
 *  any other owner have touched it, then we re-read the now-available cues. Only
 *  overwrites `lines` when cues are actually present, so a genuinely empty read
 *  (playhead between cues) never blanks a cue a `cuechange` painted in between. */
function scheduleModeRecheck(): void {
  clearRecheck();
  recheckTimer = setTimeout(() => {
    recheckTimer = null;
    if (!boundTrack) return;
    applyTrackModes(props.video, props.language);
    const next = readActiveCueLines(boundTrack);
    if (next.length) lines.value = next;
  }, 0);
}

function unbind(): void {
  clearRecheck();
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
    // Defense-in-depth (S13): unconditionally re-assert the track mode + re-read
    // cues on the next tick, regardless of `readyState`. The gate above skips the
    // load-listener re-read for an already-LOADED (readyState 2) server-default
    // track whose first cue never fired `cuechange`, which is exactly the blank
    // state that a manual off/on toggle used to fix.
    scheduleModeRecheck();
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
  transition: transform var(--dur-base) var(--ease-out);
}
/* Lift clear of the control bar while the chrome shows. The offset is the real,
   ResizeObserver-measured height of the control cluster (bound to
   `--phlix-sub-offset` by the component) — NOT a fixed constant — so taller rows
   (MarkerTimeline / quality) are covered. `0px` keeps the captions seated until a
   height is measured. The offset collapses to `0` when the chrome hides, so the
    captions reset. (S504 — replaced the old fixed-pixel lift constant.) */
.player__captions.is-lifted {
  transform: translateX(-50%) translateY(calc(-1 * var(--phlix-sub-offset, 0px)));
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
