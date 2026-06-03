<script setup lang="ts">
/**
 * Scrubber (R3.2) — the player's rich seek bar.
 *
 * Ports the locked R0 art direction (`player-chrome.html`): a buffered range
 * behind the played fill, a draggable head, chapter ticks, and a hover/drag
 * **scrub preview** (a thumbnail when the host supplies one, else a formatted
 * timestamp bubble). Pointer-events based so mouse + touch drag identically.
 *
 * Driven purely by props (position/duration/buffered/chapters/thumbnailAt) and
 * emits `seek` (seconds) live during a drag plus `scrub-start`/`scrub-end` so the
 * host can suspend chrome auto-hide. The slider owns its own keyboard contract
 * (arrows ±5s, Home/End); the global player shortcut map is R3.3.
 */
import { ref, computed } from 'vue';
import { formatTime } from './format-time';

export interface Chapter {
  /** Chapter start, in seconds. */
  start: number;
  title?: string;
}

const props = withDefaults(
  defineProps<{
    position: number;
    duration: number;
    buffered?: number;
    /** Chapter markers — rendered as ticks when present. */
    chapters?: Chapter[];
    /** Optional preview-thumbnail source for a given time (VTT sprite / server hint). */
    thumbnailAt?: (seconds: number) => string | null | undefined;
    /** Seconds the arrow keys nudge by. */
    step?: number;
  }>(),
  { buffered: 0, chapters: () => [], step: 5 },
);

const emit = defineEmits<{
  (e: 'seek', seconds: number): void;
  (e: 'scrub-start'): void;
  (e: 'scrub-end'): void;
}>();

const trackEl = ref<HTMLElement | null>(null);
const dragging = ref(false);
const hovering = ref(false);
const dragRatio = ref(0);
const hoverRatio = ref(0);

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const playedRatio = computed(() =>
  dragging.value
    ? dragRatio.value
    : props.duration > 0
      ? clamp01(props.position / props.duration)
      : 0,
);
const bufferedRatio = computed(() => (props.duration > 0 ? clamp01(props.buffered / props.duration) : 0));

const previewActive = computed(() => (dragging.value || hovering.value) && props.duration > 0);
const previewRatio = computed(() => (dragging.value ? dragRatio.value : hoverRatio.value));
const previewTime = computed(() => previewRatio.value * props.duration);
const previewThumb = computed(() => (previewActive.value ? props.thumbnailAt?.(previewTime.value) ?? null : null));
/** Quote + escape a (possibly server-supplied) thumbnail URL so it can't break
 *  out of the CSS `url()` declaration. */
const previewThumbCss = computed(() =>
  previewThumb.value ? `url("${previewThumb.value.replace(/[\\"]/g, '\\$&').replace(/[\r\n]/g, '')}")` : 'none',
);
/** Keep the bubble within the track so the 152px thumb doesn't overflow the ends. */
const previewLeft = computed(() => `${Math.min(96, Math.max(4, previewRatio.value * 100))}%`);

const ticks = computed(() =>
  props.duration > 0
    ? props.chapters.filter((c) => c.start > 0 && c.start < props.duration).map((c) => ({ ...c, ratio: c.start / props.duration }))
    : [],
);

function ratioFromEvent(e: PointerEvent): number {
  const el = trackEl.value;
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0) return 0;
  return clamp01((e.clientX - rect.left) / rect.width);
}

function onPointerDown(e: PointerEvent): void {
  if (props.duration <= 0) return;
  dragging.value = true;
  try {
    trackEl.value?.setPointerCapture?.(e.pointerId);
  } catch {
    /* jsdom / unsupported — ignore */
  }
  const r = ratioFromEvent(e);
  dragRatio.value = r;
  emit('scrub-start');
  emit('seek', r * props.duration);
  e.preventDefault();
}
function onPointerMove(e: PointerEvent): void {
  const r = ratioFromEvent(e);
  hoverRatio.value = r;
  if (dragging.value) {
    dragRatio.value = r;
    emit('seek', r * props.duration);
  }
}
function endDrag(e: PointerEvent): void {
  if (!dragging.value) return;
  dragging.value = false;
  try {
    trackEl.value?.releasePointerCapture?.(e.pointerId);
  } catch {
    /* ignore */
  }
  emit('scrub-end');
}
function onPointerEnter(): void {
  hovering.value = true;
}
function onPointerLeave(): void {
  hovering.value = false;
}

function onKeydown(e: KeyboardEvent): void {
  const dur = props.duration;
  if (dur <= 0) return;
  let next: number | null = null;
  switch (e.key) {
    case 'ArrowLeft':
      next = Math.max(0, props.position - props.step);
      break;
    case 'ArrowRight':
      next = Math.min(dur, props.position + props.step);
      break;
    case 'Home':
      next = 0;
      break;
    case 'End':
      next = dur;
      break;
    default:
      return;
  }
  emit('seek', next);
  e.preventDefault();
}

defineExpose({ playedRatio, previewActive });
</script>

<template>
  <div
    ref="trackEl"
    class="scrubber"
    role="slider"
    tabindex="0"
    :aria-valuemin="0"
    :aria-valuemax="Math.round(duration)"
    :aria-valuenow="Math.round(position)"
    :aria-valuetext="formatTime(position)"
    aria-label="Seek"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endDrag"
    @pointercancel="endDrag"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @keydown="onKeydown"
  >
    <div class="scrubber__track">
      <!-- Fills are driven by a compositor-only `transform: scaleX()` (origin left)
           rather than `width`, so the per-frame playback/drag updates don't trigger
           layout/paint (R6.3). The 14px head keeps a position binding (a single
           out-of-flow element — isolated, negligible layout). -->
      <div class="scrubber__buffered" :style="{ transform: `scaleX(${bufferedRatio})` }" />
      <div class="scrubber__played" :style="{ transform: `scaleX(${playedRatio})` }" />
      <span
        v-for="(t, i) in ticks"
        :key="i"
        class="scrubber__tick"
        :style="{ left: `${t.ratio * 100}%` }"
        :title="t.title"
      />
      <div class="scrubber__head" :class="{ 'is-dragging': dragging }" :style="{ left: `${playedRatio * 100}%` }" />
    </div>

    <div
      v-if="previewActive"
      class="scrubber__preview"
      :style="{ left: previewLeft }"
      aria-hidden="true"
    >
      <div v-if="previewThumb" class="scrubber__thumb" :style="{ backgroundImage: previewThumbCss }" />
      <span class="scrubber__time numeric">{{ formatTime(previewTime) }}</span>
    </div>
  </div>
</template>

<style scoped>
.scrubber {
  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  touch-action: none;
}
.scrubber:focus-visible {
  outline: none;
}
.scrubber:focus-visible .scrubber__track {
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.scrubber__track {
  position: relative;
  width: 100%;
  height: 5px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.22);
}
/* Fills span the full track (inset:0) and are scaled horizontally from the left
   edge — `transform: scaleX(ratio)` composites, so per-frame timeupdate/drag
   updates skip layout + paint (R6.3). */
.scrubber__buffered {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.34);
  transform-origin: left center;
}
.scrubber__played {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  transform-origin: left center;
}
.scrubber__tick {
  position: absolute;
  top: 50%;
  width: 2px;
  height: 9px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1px;
}
.scrubber__head {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 4px rgba(245, 165, 36, 0.3), var(--shadow-2);
  transition: transform var(--dur-fast) var(--ease-out);
}
.scrubber__head.is-dragging {
  transform: translate(-50%, -50%) scale(1.2);
}

/* hover / drag preview bubble */
.scrubber__preview {
  position: absolute;
  bottom: 26px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  pointer-events: none;
}
.scrubber__thumb {
  width: 152px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: var(--shadow-3);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.scrubber__time {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  .scrubber__head {
    transition: none;
  }
}
</style>
