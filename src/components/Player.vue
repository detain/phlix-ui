<script setup lang="ts">
/**
 * Player (R3.1 — shell + chrome) — the redo player surface.
 *
 * Rebuilt on `usePlayerStore` (R1.3) and the icon primitives, porting the locked
 * R0 art direction (`src/dev/mockups/player-chrome.html`): gradient scrims, a
 * "Now playing" metadata overlay, a big animated center play/pause, and a basic
 * bottom control bar (click-to-seek progress + time + mute + fullscreen). The
 * `<video>` and the store stay in sync both ways. Chrome auto-hides while playing
 * and reappears on pointer move / focus / tap (always shown while paused).
 *
 * The rich scrubber (R3.2), keyboard map (R3.3), volume/speed/track menus (R3.4),
 * captions (R3.5), ambient/theater (R3.6), PiP/mini-player (R3.7) and
 * resume/up-next/transcode notice (R3.8) build on this shell in later steps.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import type { MediaItem } from '../types/media-item';
import { usePlayerStore } from '../stores/usePlayerStore';
import Icon from './Icon.vue';
import Scrubber, { type Chapter } from './player/Scrubber.vue';
import { formatTime } from './player/format-time';
import ShortcutsHelp from './player/ShortcutsHelp.vue';
import { useKeyboardShortcuts, type ShortcutActions } from './player/shortcuts';

const props = defineProps<{
  media: MediaItem;
  streamUrl: string;
  /** Idle ms before the chrome hides while playing. */
  idleTimeout?: number;
  /** Chapter markers for the scrubber (server hint / VTT — optional). */
  chapters?: Chapter[];
  /** Preview-thumbnail source for a given time (VTT sprite / server hint — optional). */
  thumbnailAt?: (seconds: number) => string | null | undefined;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  /** Captions toggle (wired in R3.5). */
  (e: 'captions'): void;
  /** Theater-mode toggle (wired in R3.6). */
  (e: 'theater'): void;
  /** Picture-in-picture toggle (wired in R3.7). */
  (e: 'pip'): void;
}>();

const player = usePlayerStore();

/** Playback-speed ladder for the `<`/`>` shortcuts. */
const SPEED_LADDER = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const videoRef = ref<HTMLVideoElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const showChrome = ref(true);
const fullscreen = ref(false);
const scrubbing = ref(false);
const showHelp = ref(false);

let idleTimer: ReturnType<typeof setTimeout> | undefined;

// Ordered meta segments — year, cert, runtime, first genre (matches the locked
// mockup: a dot precedes every segment except the cert, which hugs the year).
const metaSegments = computed(() => {
  const segs: { text: string; cert?: boolean }[] = [];
  if (props.media.year) segs.push({ text: String(props.media.year) });
  if (props.media.rating) segs.push({ text: props.media.rating, cert: true });
  if (props.media.runtime) segs.push({ text: `${props.media.runtime}m` });
  const g = props.media.genres?.[0];
  if (g) segs.push({ text: g });
  return segs;
});

// ---- transport (video → store and store → video) ----------------------------
function togglePlay(): void {
  const v = videoRef.value;
  if (!v) return;
  if (v.paused) void v.play()?.catch(() => {});
  else v.pause();
}

function bufferedEnd(v: HTMLVideoElement): number {
  try {
    return v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0;
  } catch {
    return 0;
  }
}

function onPlay(): void {
  player.play();
}
function onPause(): void {
  player.pause();
}
function onTimeUpdate(): void {
  const v = videoRef.value;
  if (v) player.updateProgress(v.currentTime, v.duration, bufferedEnd(v));
}
function onLoadedMetadata(): void {
  const v = videoRef.value;
  if (!v) return;
  // push the store's selections onto the freshly-loaded element
  v.volume = player.volume;
  v.muted = player.muted;
  v.playbackRate = player.rate;
  player.updateProgress(v.currentTime, v.duration, bufferedEnd(v));
}
function onProgress(): void {
  const v = videoRef.value;
  if (v) player.updateProgress(v.currentTime, v.duration, bufferedEnd(v));
}
function onVolumeChange(): void {
  const v = videoRef.value;
  if (!v) return;
  // volume first (the store unmutes when volume > 0), then mute — so an explicit
  // mute reported in the same event still wins.
  if (Math.abs(v.volume - player.volume) > 0.001) player.setVolume(v.volume);
  if (v.muted !== player.muted) player.toggleMute();
}
function onRateChange(): void {
  const v = videoRef.value;
  if (v && v.playbackRate !== player.rate) player.setRate(v.playbackRate);
}

/** Seek to an absolute time (seconds) — driven by the Scrubber. */
function onSeek(seconds: number): void {
  const v = videoRef.value;
  if (v && player.duration > 0) v.currentTime = Math.min(player.duration, Math.max(0, seconds));
}
function onScrubStart(): void {
  scrubbing.value = true;
  revealChrome();
}
function onScrubEnd(): void {
  scrubbing.value = false;
  revealChrome();
}

// ---- keyboard shortcuts (R3.3) ----------------------------------------------
function speedStep(direction: 1 | -1): void {
  const i = SPEED_LADDER.reduce(
    (best, r, idx) => (Math.abs(r - player.rate) < Math.abs(SPEED_LADDER[best] - player.rate) ? idx : best),
    0,
  );
  const next = SPEED_LADDER[Math.min(SPEED_LADDER.length - 1, Math.max(0, i + direction))];
  player.setRate(next); // the rate watch mirrors it onto the element
}

const shortcutActions: ShortcutActions = {
  playPause: togglePlay,
  seekBy: (delta) => onSeek(player.position + delta),
  frameStep: (dir) => {
    if (!player.playing) onSeek(player.position + dir / 30);
  },
  volumeBy: (delta) => player.setVolume(player.volume + delta),
  toggleMute,
  toggleFullscreen,
  toggleCaptions: () => emit('captions'),
  toggleTheater: () => emit('theater'),
  togglePip: () => emit('pip'),
  seekToPercent: (frac) => onSeek(frac * player.duration),
  speedStep,
  toggleHelp: () => {
    showHelp.value = !showHelp.value;
  },
};
// Suppress player shortcuts while the help modal is open (its own Esc/close win).
useKeyboardShortcuts(shortcutActions, { enabled: () => !showHelp.value });

function toggleMute(): void {
  // Drive the store; the `player.muted` watch mirrors it onto the element (which,
  // in a real browser, then fires volumechange — a no-op since they now agree).
  player.toggleMute();
}

// reflect store selections (e.g. set elsewhere) back onto the element
watch(
  () => player.muted,
  (m) => {
    const v = videoRef.value;
    if (v && v.muted !== m) v.muted = m;
  },
);
watch(
  () => player.volume,
  (vol) => {
    const v = videoRef.value;
    if (v && Math.abs(v.volume - vol) > 0.001) v.volume = vol;
  },
);
watch(
  () => player.rate,
  (r) => {
    const v = videoRef.value;
    if (v && v.playbackRate !== r) v.playbackRate = r;
  },
);

// ---- fullscreen -------------------------------------------------------------
function toggleFullscreen(): void {
  if (typeof document === 'undefined') return;
  const el = containerRef.value;
  if (!el) return;
  if (!document.fullscreenElement) void el.requestFullscreen?.().catch(() => {});
  else void document.exitFullscreen?.().catch(() => {});
}
function onFullscreenChange(): void {
  fullscreen.value = typeof document !== 'undefined' && !!document.fullscreenElement;
}

// ---- chrome auto-hide -------------------------------------------------------
function clearIdle(): void {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = undefined;
  }
}
function scheduleHide(): void {
  clearIdle();
  if (!player.playing || scrubbing.value) return; // never hide while paused or scrubbing
  idleTimer = setTimeout(() => {
    if (player.playing && !scrubbing.value) showChrome.value = false;
  }, props.idleTimeout ?? 3000);
}
function revealChrome(): void {
  showChrome.value = true;
  scheduleHide();
}

watch(
  () => player.playing,
  (playing) => {
    if (!playing) {
      clearIdle();
      showChrome.value = true; // always visible when paused
    } else {
      scheduleHide();
    }
  },
);

// ---- lifecycle --------------------------------------------------------------
onMounted(() => {
  player.setCurrent(props.media, { resetPosition: false });
  if (typeof document !== 'undefined') document.addEventListener('fullscreenchange', onFullscreenChange);
});
watch(
  () => props.media,
  (m) => player.setCurrent(m, { resetPosition: false }),
);
onBeforeUnmount(() => {
  clearIdle();
  if (typeof document !== 'undefined') document.removeEventListener('fullscreenchange', onFullscreenChange);
});
</script>

<template>
  <div
    ref="containerRef"
    class="player"
    :class="{ 'is-chrome-hidden': !showChrome }"
    @pointermove="revealChrome"
    @pointerdown="revealChrome"
    @focusin="revealChrome"
  >
    <video
      ref="videoRef"
      class="player__video"
      :src="streamUrl"
      :poster="media.poster_url ?? undefined"
      preload="metadata"
      playsinline
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @progress="onProgress"
      @volumechange="onVolumeChange"
      @ratechange="onRateChange"
      @click="togglePlay"
    />

    <div class="player__scrim player__scrim--top" aria-hidden="true" />
    <div class="player__scrim player__scrim--bottom" aria-hidden="true" />

    <!-- metadata -->
    <div class="player__meta">
      <button type="button" class="player__iconbtn player__back" aria-label="Back" @click.stop="emit('back')">
        <Icon name="arrow-left" />
      </button>
      <div class="player__meta-text">
        <p class="player__eyebrow">Now playing</p>
        <h2 class="player__title">{{ media.name }}</h2>
        <div class="player__sub numeric">
          <template v-for="(seg, i) in metaSegments" :key="i">
            <span v-if="i > 0 && !seg.cert" class="player__dot" aria-hidden="true">·</span>
            <span :class="{ 'player__cert': seg.cert }">{{ seg.text }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- center play/pause -->
    <div class="player__center">
      <button
        type="button"
        class="player__bigplay"
        :class="{ 'is-playing': player.playing }"
        :aria-label="player.playing ? 'Pause' : 'Play'"
        @click.stop="togglePlay"
      >
        <Icon :name="player.playing ? 'pause' : 'play'" />
      </button>
    </div>

    <!-- controls -->
    <div class="player__controls" @click.stop>
      <Scrubber
        :position="player.position"
        :duration="player.duration"
        :buffered="player.buffered"
        :chapters="chapters"
        :thumbnail-at="thumbnailAt"
        @seek="onSeek"
        @scrub-start="onScrubStart"
        @scrub-end="onScrubEnd"
      />

      <div class="player__btnrow">
        <button
          type="button"
          class="player__iconbtn player__iconbtn--lg"
          :aria-label="player.playing ? 'Pause' : 'Play'"
          @click="togglePlay"
        >
          <Icon :name="player.playing ? 'pause' : 'play'" />
        </button>

        <span class="player__time numeric">
          {{ formatTime(player.position) }}<span class="player__sep"> / </span>{{ formatTime(player.duration) }}
        </span>

        <span class="player__grow" />

        <button
          type="button"
          class="player__iconbtn"
          :aria-label="player.muted ? 'Unmute' : 'Mute'"
          @click="toggleMute"
        >
          <Icon :name="player.muted ? 'mute' : 'volume'" />
        </button>

        <button
          type="button"
          class="player__iconbtn"
          aria-label="Keyboard shortcuts"
          aria-haspopup="dialog"
          @click="showHelp = true"
        >
          <Icon name="info" />
        </button>

        <button
          type="button"
          class="player__iconbtn"
          :aria-label="fullscreen ? 'Exit fullscreen' : 'Fullscreen'"
          @click="toggleFullscreen"
        >
          <Icon :name="fullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </button>
      </div>
    </div>

    <ShortcutsHelp :open="showHelp" @close="showHelp = false" />
  </div>
</template>

<style scoped>
.player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 90vh;
  margin: 0 auto;
  background: #000;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-4);
  border: 1px solid var(--border-subtle);
  isolation: isolate;
}
.player.is-chrome-hidden {
  cursor: none;
}

.player__video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

/* scrims */
.player__scrim {
  position: absolute;
  inset-inline: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 1;
  transition: opacity var(--dur-base) var(--ease-out);
}
.player__scrim--top {
  top: 0;
  height: 35%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent);
}
.player__scrim--bottom {
  bottom: 0;
  height: 55%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.88), transparent);
}

/* metadata */
.player__meta {
  position: absolute;
  z-index: 4;
  top: var(--space-5);
  inset-inline: var(--space-6);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.player__eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--amber-300, var(--accent));
}
.player__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight, 1.1);
  color: #fff;
  margin-top: 2px;
}
.player__sub {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.72);
}
.player__cert {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  padding: 0 4px;
  margin-right: var(--space-1);
}
.player__dot {
  margin-inline: var(--space-1);
}

/* center play */
.player__center {
  position: absolute;
  z-index: 4;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.player__bigplay {
  pointer-events: auto;
  width: 84px;
  height: 84px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--surface-glass-strong, rgba(20, 20, 20, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-3);
  color: #fff;
  transition: transform var(--dur-base) var(--ease-spring), opacity var(--dur-base) var(--ease-out);
}
.player__bigplay :deep(svg) {
  width: 36px;
  height: 36px;
}
.player__bigplay:hover {
  transform: scale(1.06);
}
/* while playing the center button fades unless the chrome is up */
.player__bigplay.is-playing {
  opacity: 0.85;
}

/* controls */
.player__controls {
  position: absolute;
  z-index: 5;
  inset-inline: var(--space-6);
  bottom: var(--space-5);
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}

.player__btnrow {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-2);
}
.player__iconbtn {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.92);
  transition: background var(--dur-fast) var(--ease-out);
}
.player__iconbtn:hover {
  background: rgba(255, 255, 255, 0.12);
}
.player__iconbtn :deep(svg) {
  width: 21px;
  height: 21px;
}
.player__iconbtn--lg :deep(svg) {
  width: 25px;
  height: 25px;
}
.player__back {
  margin-top: 2px;
}
.player__time {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.85);
  margin-inline: var(--space-2);
  font-variant-numeric: tabular-nums;
}
.player__sep {
  color: rgba(255, 255, 255, 0.5);
}
.player__grow {
  flex: 1;
}

/* chrome hide */
.player.is-chrome-hidden .player__scrim,
.player.is-chrome-hidden .player__meta,
.player.is-chrome-hidden .player__controls {
  opacity: 0;
  pointer-events: none;
}
.player.is-chrome-hidden .player__meta {
  transform: translateY(-8px);
}
.player.is-chrome-hidden .player__controls {
  transform: translateY(8px);
}
.player.is-chrome-hidden .player__bigplay {
  opacity: 0;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .player__scrim,
  .player__meta,
  .player__controls,
  .player__bigplay {
    transition: none;
  }
}
</style>
