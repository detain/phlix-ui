<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * SkipControls (R3.10) — the upcoming skip-markers row.
 *
 * Shows skip buttons for `intro`, `outro`, and `credits` markers that are
 * approaching within the next 30 seconds of playback. Buttons appear 5 seconds
 * before each marker starts and auto-hide after the marker passes.
 *
 * This is distinct from SkipButton.vue which shows a single "in-range" skip
 * button while the playhead is INSIDE an intro/outro marker. SkipControls shows
 * buttons BEFORE the playhead reaches the marker.
 */
import { computed } from 'vue';
import Icon from '../Icon.vue';
import { useMessages } from '../../composables/useMessages';

/** A skip marker from `GET /api/v1/media/{id}/markers`. */
export interface SkipMarker {
  id: string;
  type: 'intro' | 'outro' | 'credits' | 'ad';
  startMs: number;
  endMs: number;
  label: string;
}

const props = defineProps<{
  /** Current playback position, in seconds. */
  position: number;
  /** All available skip markers for the current media. */
  markers?: SkipMarker[];
}>();

const emit = defineEmits<{
  /** Seek to the start of this marker. */
  (e: 'skip', targetSeconds: number): void;
}>();

const { t } = useMessages();

/** Window in seconds before a marker that triggers button appearance. */
const PRE_SHOW_SECONDS = 5;
/** Window in seconds after a marker start to keep showing the button. */
const SHOW_WINDOW_SECONDS = 30;

/** Convert milliseconds to seconds. */
function toSeconds(ms: number): number {
  return ms / 1000;
}

/** Is the playhead inside or past this marker? */
function isPassed(marker: SkipMarker, pos: number): boolean {
  const endSec = toSeconds(marker.endMs);
  return pos >= endSec;
}

/** Should this marker's skip button be visible given the current position? */
function isVisible(marker: SkipMarker, pos: number): boolean {
  if (isPassed(marker, pos)) return false;
  const startSec = toSeconds(marker.startMs);
  const showFrom = startSec - PRE_SHOW_SECONDS;
  const showUntil = startSec + SHOW_WINDOW_SECONDS;
  return pos >= showFrom && pos < showUntil;
}

/** Skip marker types that are user-skipable (excludes 'ad'). */
const SKIP_TYPES = ['intro', 'outro', 'credits'] as const;
type SkipType = (typeof SKIP_TYPES)[number];

/** Get the display label for a marker type. */
function labelFor(type: SkipMarker['type']): string {
  switch (type) {
    case 'intro':
      return t('player.skipLabelIntro');
    case 'outro':
      return t('player.skipLabelCredits');
    case 'credits':
      return t('player.skipLabelCredits');
    case 'ad':
      return t('player.skipLabelSkipCredits');
  }
}

/** The markers that should currently be shown, sorted by start time. */
const visibleMarkers = computed<SkipMarker[]>(() => {
  if (!props.markers || props.markers.length === 0) return [];
  return props.markers
    .filter((m) => SKIP_TYPES.includes(m.type as SkipType) && isVisible(m, props.position))
    .sort((a, b) => a.startMs - b.startMs);
});

function onSkip(marker: SkipMarker): void {
  emit('skip', toSeconds(marker.startMs));
}
</script>

<template>
  <div v-if="visibleMarkers.length > 0" class="skip-controls" aria-label="Skip controls">
    <button
      v-for="marker in visibleMarkers"
      :key="marker.id"
      type="button"
      class="skip-controls__btn"
      :aria-label="`Skip ${labelFor(marker.type)}`"
      @click.stop="onSkip(marker)"
    >
      <span class="skip-controls__label">{{ labelFor(marker.type) }}</span>
      <Icon name="skip-forward" />
    </button>
  </div>
</template>

<style scoped>
.skip-controls {
  position: absolute;
  z-index: 6;
  right: var(--space-6);
  bottom: 100px;
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.skip-controls__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--accent-contrast, #1a1206);
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-2);
  cursor: pointer;
  transition:
    filter var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
}

.skip-controls__btn :deep(svg) {
  width: 14px;
  height: 14px;
}

.skip-controls__btn:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.skip-controls__btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-2), 0 0 0 3px var(--accent-ring);
}

.skip-controls__label {
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .skip-controls__btn,
  .skip-controls__btn:hover {
    transition: none;
    transform: none;
  }
}
</style>
