<script setup lang="ts">
/**
 * UpNext (R3.8) — the end-of-video "Up next" card.
 *
 * A port of the locked R0 mockup (`src/dev/mockups/player-chrome.html:184-197`):
 * a glass card with the next title's poster, an "Up next" eyebrow, the title, a
 * "Starts in Ns" countdown, Play now / Cancel actions, and the amber depleting
 * countdown ring. The countdown itself is owned by the parent <Player> (which
 * also decides, from the `autoplay` pref, whether to count down at all) — this
 * component is presentational: it renders `remaining`/`total` and emits intent.
 */
import { computed } from 'vue';
import type { MediaItem } from '../../types/media-item';
import Icon from '../Icon.vue';
import { ringDashoffset, UPNEXT_RING_CIRCUMFERENCE, UPNEXT_RING_RADIUS } from './playback';

const props = withDefaults(
  defineProps<{
    /** The next item to play. */
    media: MediaItem;
    /** Seconds left in the countdown (only shown while `counting`). */
    remaining?: number;
    /** Countdown total (drives the ring fraction). */
    total?: number;
    /** Whether a countdown is running (autoplay on). When false the card is
     *  static — no ring, no "Starts in" text — and only Play now advances. */
    counting?: boolean;
    /** Optional thumbnail override (else the media's poster). */
    posterUrl?: string | null;
  }>(),
  { remaining: 0, total: 0, counting: false, posterUrl: undefined },
);

const emit = defineEmits<{ (e: 'play-now'): void; (e: 'cancel'): void }>();

const thumb = computed(() => props.posterUrl ?? props.media.poster_url ?? null);
const dashOffset = computed(() => ringDashoffset(props.remaining, props.total));
</script>

<template>
  <aside class="upnext" role="region" aria-label="Up next">
    <img v-if="thumb" class="upnext__thumb" :src="thumb" alt="" loading="lazy" />
    <div class="upnext__body">
      <p class="upnext__eyebrow">Up next</p>
      <h4 class="upnext__title">{{ media.name }}</h4>
      <p v-if="counting" class="upnext__cd numeric">Starts in {{ Math.max(0, remaining) }}s</p>
      <div class="upnext__actions">
        <button type="button" class="upnext__btn upnext__btn--amber" @click="emit('play-now')">
          <Icon name="play" />
          <span>Play now</span>
        </button>
        <button type="button" class="upnext__btn upnext__btn--ghost" @click="emit('cancel')">Cancel</button>
      </div>
    </div>

    <svg v-if="counting" class="upnext__ring" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" :r="UPNEXT_RING_RADIUS" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="3" />
      <circle
        cx="18"
        cy="18"
        :r="UPNEXT_RING_RADIUS"
        fill="none"
        stroke="var(--accent)"
        stroke-width="3"
        stroke-linecap="round"
        :stroke-dasharray="UPNEXT_RING_CIRCUMFERENCE"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 18 18)"
      />
    </svg>
  </aside>
</template>

<style scoped>
.upnext {
  position: absolute;
  z-index: 6;
  right: var(--space-8);
  bottom: 92px;
  width: 320px;
  max-width: calc(100% - 2 * var(--space-6));
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--surface-glass-strong, rgba(20, 20, 20, 0.7));
  border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.12));
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-3);
}

.upnext__thumb {
  width: 96px;
  aspect-ratio: 16 / 9;
  flex: none;
  border-radius: var(--radius-md);
  object-fit: cover;
  background: #000;
}

.upnext__body {
  min-width: 0;
  flex: 1;
}
.upnext__eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--amber-300, var(--accent));
}
.upnext__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  color: #fff;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.upnext__cd {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.6);
  margin-top: var(--space-1);
  font-variant-numeric: tabular-nums;
}

.upnext__actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
.upnext__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: filter var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.upnext__btn :deep(svg) {
  width: 14px;
  height: 14px;
}
.upnext__btn--amber {
  background: var(--accent);
  color: var(--accent-contrast, #1a1206);
  box-shadow: var(--glow-amber, none);
}
.upnext__btn--amber:hover {
  filter: brightness(1.08);
}
.upnext__btn--ghost {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.upnext__btn--ghost:hover {
  background: rgba(255, 255, 255, 0.18);
}

.upnext__ring {
  position: absolute;
  right: var(--space-3);
  top: var(--space-3);
  width: 26px;
  height: 26px;
}
.upnext__ring circle:last-child {
  transition: stroke-dashoffset var(--dur-base) linear;
}

@media (prefers-reduced-motion: reduce) {
  .upnext__btn,
  .upnext__ring circle:last-child {
    transition: none;
  }
}
</style>
