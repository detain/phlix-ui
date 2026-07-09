<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * MarkerTimeline (P3B-S3) — marker tick bar below the scrubber.
 *
 * Shows colored tick marks for chapter/ad markers from `GET /api/v1/media/:id/markers`.
 * Marker types get distinct colors: intro=blue, outro=orange, credits=purple, ad=red.
 * Hovering shows a tooltip with the marker label and start time; clicking seeks to it.
 * Ad markers that are active (playhead in range) dim the seek bar and show an "Ad" badge.
 */
import { computed } from 'vue';
import { formatTime } from './format-time';

/** A skip marker from `GET /api/v1/media/:id/markers` (also exported by SkipControls). */
export interface Marker {
  id: string;
  type: 'intro' | 'outro' | 'credits' | 'ad';
  startMs: number;
  endMs: number;
  label: string;
}

const props = defineProps<{
  /** Current playback position, in seconds. */
  position: number;
  /** Total duration, in seconds. */
  duration: number;
  /** All available markers for the current media. */
  markers?: Marker[];
}>();

const emit = defineEmits<{
  /** Seek to the start of this marker. */
  (e: 'seek', targetSeconds: number): void;
  /** Find similar media by this marker's type and position (P3B-S8). */
  (e: 'similar', type: Marker['type'], startMs: number): void;
}>();

/** Convert milliseconds to seconds. */
function toSeconds(ms: number): number {
  return ms / 1000;
}

/** Color for each marker type — follows the spec: intro=blue, outro=orange, credits=purple, ad=red. */
const MARKER_COLORS: Record<Marker['type'], string> = {
  intro: 'var(--marker-intro, #3b82f6)',
  outro: 'var(--marker-outro, #f97316)',
  credits: 'var(--marker-credits, #a855f7)',
  ad: 'var(--marker-ad, #ef4444)',
};

/** Get CSS color variable for a marker type. */
function markerColor(type: Marker['type']): string {
  return MARKER_COLORS[type];
}

/** Ticks to render — filtered to valid on-duration positions. */
const ticks = computed(() => {
  if (props.duration <= 0 || !props.markers || props.markers.length === 0) return [];
  return props.markers
    .filter((m) => {
      const startSec = toSeconds(m.startMs);
      return startSec > 0 && startSec < props.duration;
    })
    .map((m) => ({
      ...m,
      startSec: toSeconds(m.startMs),
      endSec: toSeconds(m.endMs),
      ratio: toSeconds(m.startMs) / props.duration,
      color: markerColor(m.type),
      isAd: m.type === 'ad',
    }));
});

/** Is the playhead currently inside an ad marker range? */
const activeAdMarker = computed<Marker | null>(() => {
  if (!props.markers) return null;
  return (
    props.markers.find(
      (m) => m.type === 'ad' && props.position >= toSeconds(m.startMs) && props.position <= toSeconds(m.endMs),
    ) ?? null
  );
});

/** Whether an ad marker is currently active — dims the scrubber. */
const isAdActive = computed(() => activeAdMarker.value !== null);

/** The active ad marker label for the badge. */
const activeAdLabel = computed(() => activeAdMarker.value?.label ?? 'Ad');

function onTickClick(tick: (typeof ticks.value)[number]): void {
  emit('seek', tick.startSec);
}

/** Emit 'similar' to find media with a similar marker (P3B-S8). */
function onFindSimilar(tick: (typeof ticks.value)[number]): void {
  emit('similar', tick.type, tick.startMs);
}
</script>

<template>
  <div v-if="ticks.length > 0" class="marker-timeline" :class="{ 'is-ad-active': isAdActive }" aria-label="Marker timeline">
    <!-- "Ad" badge shown when playhead is inside an ad marker range -->
    <div v-if="isAdActive" class="marker-timeline__ad-badge" aria-live="polite">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <polygon points="5,3 19,12 5,21" />
      </svg>
      {{ activeAdLabel }}
    </div>

    <!-- Tick marks -->
    <div class="marker-timeline__ticks">
      <button
        v-for="tick in ticks"
        :key="tick.id"
        type="button"
        class="marker-timeline__tick"
        :class="{ 'is-ad': tick.isAd }"
        :style="{ left: `${tick.ratio * 100}%`, '--tick-color': tick.color }"
        :title="`${tick.label} — ${formatTime(tick.startSec)}`"
        :aria-label="`${tick.label} at ${formatTime(tick.startSec)}`"
        @click.stop="onTickClick(tick)"
      >
        <span class="marker-timeline__tooltip">
          <span class="marker-timeline__tooltip-label">{{ tick.label }}</span>
          <span class="marker-timeline__tooltip-time numeric">{{ formatTime(tick.startSec) }}</span>
          <button
            type="button"
            class="marker-timeline__similar-btn"
            @click.stop="onFindSimilar(tick)"
          >
            Find similar
          </button>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.marker-timeline {
  position: relative;
  height: 16px;
  display: flex;
  align-items: center;
  margin-top: var(--space-1);
}

/* Ad-active state — dims the parent scrubber (applied via CSS class on the timeline wrapper) */
.marker-timeline.is-ad-active {
  opacity: 0.6;
}

.marker-timeline__ad-badge {
  position: absolute;
  left: var(--space-2);
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px var(--space-2);
  font-size: var(--text-2xs);
  font-weight: var(--font-bold);
  color: #fff;
  background: var(--marker-ad, #ef4444);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  pointer-events: none;
  z-index: 1;
}

.marker-timeline__ad-badge svg {
  flex-shrink: 0;
}

.marker-timeline__ticks {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Tick button — small colored pip, centered at its ratio position */
.marker-timeline__tick {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--tick-color);
  border: 1px solid rgba(255, 255, 255, 0.35);
  cursor: pointer;
  padding: 0;
  transition:
    transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out);
  z-index: 1;
}

.marker-timeline__tick:hover,
.marker-timeline__tick:focus-visible {
  transform: translate(-50%, -50%) scale(1.4);
  box-shadow: 0 0 0 3px var(--tick-color);
  z-index: 2;
}

.marker-timeline__tick:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--tick-color), 0 0 0 5px var(--accent-ring);
}

.marker-timeline__tick.is-ad {
  /* Ad ticks are slightly larger for visibility */
  width: 12px;
  height: 12px;
}

/* Tooltip — appears above the tick on hover */
.marker-timeline__tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--space-1) var(--space-2);
  background: var(--surface-glass-strong);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-3);
  backdrop-filter: blur(8px);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease-out);
}

.marker-timeline__tick:hover .marker-timeline__tooltip,
.marker-timeline__tick:focus-visible .marker-timeline__tooltip {
  opacity: 1;
}

.marker-timeline__tooltip-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text);
}

.marker-timeline__tooltip-time {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--text-muted);
}

.marker-timeline__similar-btn {
  margin-top: var(--space-1);
  padding: 2px var(--space-2);
  font-size: var(--text-2xs);
  font-weight: var(--font-semibold);
  color: var(--accent, #f59e0b);
  background: transparent;
  border: 1px solid currentColor;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}

.marker-timeline__similar-btn:hover,
.marker-timeline__similar-btn:focus-visible {
  background: rgba(245, 158, 11, 0.12);
}

.marker-timeline__similar-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}

@media (prefers-reduced-motion: reduce) {
  .marker-timeline__tick,
  .marker-timeline__tick:hover,
  .marker-timeline__tick:focus-visible {
    transition: none;
    transform: translate(-50%, -50%);
  }
  .marker-timeline__tick:hover,
  .marker-timeline__tick:focus-visible {
    transform: translate(-50%, -50%) scale(1.4);
  }
  .marker-timeline__tooltip {
    transition: none;
  }
}
</style>
