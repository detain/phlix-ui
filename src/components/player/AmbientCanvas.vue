<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * AmbientCanvas (R3.6) — the live "Ambilight" glow behind the video.
 *
 * Samples a heavily-downscaled copy of the current video frame (32x18) on a
 * throttled requestVideoFrameCallback loop (~4 Hz; rVFC only fires while the
 * video actually paints, so a paused video stops sampling for free) and paints
 * a layered radial-gradient glow (see player/ambient.ts) onto a blurred layer
 * that spills beyond the framed video box — the locked R0 art direction, live.
 *
 * Fully disable-able: `active` = enabled (host passes prefs.atmosphere) &&
 * !reducedMotion && !batterySaving. When inactive — or when there is no usable
 * 2D canvas context (jsdom / SSR / tainted cross-origin frame) — it renders the
 * static fallback glow and runs NO loop, so it is cheap and safe everywhere.
 * Decorative: pointer-events:none + aria-hidden.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  AMBIENT_SAMPLE_H,
  AMBIENT_SAMPLE_INTERVAL_MS,
  AMBIENT_SAMPLE_W,
  ambientGradient,
  isBatterySaving,
  sampleAmbient,
  type BatteryLike,
} from './ambient';

const props = withDefaults(
  defineProps<{
    /** The <video> to sample (null until mounted / between media). */
    video?: HTMLVideoElement | null;
    /** Master on/off — the host passes prefs.atmosphere. */
    enabled?: boolean;
    /** Whether playback is running (drives the loop + the interval fallback). */
    playing?: boolean;
    /** Resolved (OS-aware) reduced-motion preference — disables sampling. */
    reducedMotion?: boolean;
    /** Glow brightness multiplier (theater mode boosts it). */
    intensity?: number;
  }>(),
  { video: null, enabled: true, playing: false, reducedMotion: false, intensity: 1 },
);

// ---- battery saver (best-effort; API absent in Firefox/Safari) --------------
type BatteryManagerLike = BatteryLike & {
  addEventListener?: (type: string, fn: () => void) => void;
  removeEventListener?: (type: string, fn: () => void) => void;
};
const batterySaving = ref(false);
let battery: BatteryManagerLike | null = null;
function onBatteryChange(): void {
  batterySaving.value = isBatterySaving(battery);
}

const active = computed(() => props.enabled && !props.reducedMotion && !batterySaving.value);
const glowOpacity = computed(() => Math.min(1, 0.85 * Math.max(0, props.intensity)));

// ---- live gradient ----------------------------------------------------------
/** null until the first successful sample → the static CSS glow shows through. */
const liveBackground = ref<string | null>(null);

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let ctxReady = false;
let ctxUnavailable = false; // jsdom / SSR / tainted — never retry

function ensureCtx(): CanvasRenderingContext2D | null {
  if (ctxReady) return ctx;
  if (ctxUnavailable || typeof document === 'undefined') {
    ctxUnavailable = true;
    return null;
  }
  canvas = document.createElement('canvas');
  canvas.width = AMBIENT_SAMPLE_W;
  canvas.height = AMBIENT_SAMPLE_H;
  try {
    ctx = canvas.getContext('2d', { willReadFrequently: true });
  } catch {
    ctx = null;
  }
  if (!ctx) {
    ctxUnavailable = true;
    return null;
  }
  ctxReady = true;
  return ctx;
}

/** Sample the current video frame once and update the live gradient. */
function sampleNow(): void {
  const v = props.video;
  if (!active.value || !v) return;
  if (!v.videoWidth || !v.videoHeight) return; // no frame data yet
  const c = ensureCtx();
  if (!c) return;
  try {
    c.drawImage(v, 0, 0, AMBIENT_SAMPLE_W, AMBIENT_SAMPLE_H);
    const { data } = c.getImageData(0, 0, AMBIENT_SAMPLE_W, AMBIENT_SAMPLE_H);
    liveBackground.value = ambientGradient(sampleAmbient(data, AMBIENT_SAMPLE_W, AMBIENT_SAMPLE_H));
  } catch {
    // tainted canvas (cross-origin frame without CORS) etc. — stop, keep static
    ctxUnavailable = true;
    liveBackground.value = null;
  }
}

// ---- throttled sample loop --------------------------------------------------
type RvfcVideo = HTMLVideoElement & {
  requestVideoFrameCallback: (cb: (now: number) => void) => number;
  cancelVideoFrameCallback: (handle: number) => void;
};
function hasRvfc(v: HTMLVideoElement | null | undefined): v is RvfcVideo {
  return !!v && typeof (v as Partial<RvfcVideo>).requestVideoFrameCallback === 'function';
}

let rvfcHandle: number | null = null;
let rvfcVideo: RvfcVideo | null = null; // the element rvfcHandle was issued by
let intervalId: ReturnType<typeof setInterval> | null = null;
let lastSample = 0;
let looping = false;

function scheduleRvfc(v: RvfcVideo): void {
  rvfcVideo = v;
  rvfcHandle = v.requestVideoFrameCallback(onRvfc);
}

function onRvfc(now: number): void {
  if (!looping) return;
  if (now - lastSample >= AMBIENT_SAMPLE_INTERVAL_MS) {
    lastSample = now;
    sampleNow();
  }
  const v = props.video;
  if (hasRvfc(v)) scheduleRvfc(v);
}

function startLoop(): void {
  if (looping || !active.value || !props.video) return;
  const v = props.video;
  if (hasRvfc(v)) {
    looping = true;
    lastSample = 0;
    scheduleRvfc(v);
    return;
  }
  // no rVFC — sample once now; only keep a timer if a 2D context is usable
  sampleNow();
  if (ctxUnavailable) return; // jsdom / SSR / tainted — static glow, no loop
  looping = true;
  intervalId = setInterval(sampleNow, AMBIENT_SAMPLE_INTERVAL_MS);
}

function stopLoop(): void {
  looping = false;
  // cancel against the element the handle was issued by (not the current prop,
  // which may already point at a swapped-in video).
  if (rvfcHandle != null && rvfcVideo) rvfcVideo.cancelVideoFrameCallback(rvfcHandle);
  rvfcHandle = null;
  rvfcVideo = null;
  if (intervalId != null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Run the loop only while active AND playing; keep the last glow when paused.
// Always stop first so a video swap (or any dependency change) restarts cleanly
// — no orphaned rVFC chain on the previous element.
watch(
  () => [active.value, props.playing, props.video] as const,
  ([isActive, isPlaying]) => {
    stopLoop();
    if (isActive && isPlaying) startLoop();
  },
  { immediate: true },
);

// ---- lifecycle --------------------------------------------------------------
onMounted(() => {
  const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { getBattery?: () => Promise<BatteryManagerLike> }) : null;
  if (nav && typeof nav.getBattery === 'function') {
    nav
      .getBattery()
      .then((b) => {
        battery = b;
        onBatteryChange();
        battery.addEventListener?.('chargingchange', onBatteryChange);
        battery.addEventListener?.('levelchange', onBatteryChange);
      })
      .catch(() => {
        /* unsupported / blocked — treat as not saving */
      });
  }
});
onBeforeUnmount(() => {
  stopLoop();
  battery?.removeEventListener?.('chargingchange', onBatteryChange);
  battery?.removeEventListener?.('levelchange', onBatteryChange);
});

const glowStyle = computed(() => {
  const style: Record<string, string> = { opacity: String(glowOpacity.value) };
  if (liveBackground.value) style.background = liveBackground.value;
  return style;
});

defineExpose({ sampleNow });
</script>

<template>
  <div class="player__ambient" :class="{ 'is-active': active }" :style="active ? glowStyle : undefined" aria-hidden="true" />
</template>

<style scoped>
.player__ambient {
  position: absolute;
  inset: -7% -6%;
  z-index: 0;
  pointer-events: none;
  border-radius: 40px;
  filter: blur(60px);
  opacity: 0;
  /* Static fallback glow (the locked mockup's amber/blue radials) until — and if —
     a live frame is sampled; an inline `background` from sampleNow() overrides it. */
  background:
    radial-gradient(40% 60% at 12% 30%, rgba(217, 130, 9, 0.55), transparent 70%),
    radial-gradient(45% 55% at 88% 70%, rgba(90, 120, 180, 0.45), transparent 70%),
    radial-gradient(50% 50% at 50% 50%, rgba(245, 165, 36, 0.25), transparent 75%);
  transition: opacity var(--dur-slower) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .player__ambient {
    transition: none;
  }
}
</style>
