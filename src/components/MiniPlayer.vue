<script setup lang="ts">
/**
 * MiniPlayer (R3.7) — the persistent docked mini-player.
 *
 * Mounted ONCE at the app shell (sibling of <RouterView>) so it survives route
 * changes. Driven entirely by the singleton `usePlayerStore`: it shows only when
 * `miniPlayer` is on and there is a current media + streamUrl, plays its OWN
 * <video> from the stored position (so playback continues across navigation),
 * mirrors play/pause with the store both ways, and offers play/pause · expand ·
 * close. Expand emits the media id for the host to navigate to the full player;
 * close stops + clears via `store.closePlayer()`.
 *
 * The route-leave trigger that calls `store.showMiniPlayer()` lives in the
 * PlayerPage integration (R3.9); this component just renders the dock when asked.
 */
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import Icon from './Icon.vue';

const emit = defineEmits<{ (e: 'expand', id: string): void }>();

const player = usePlayerStore();
const videoRef = ref<HTMLVideoElement | null>(null);

const visible = computed(() => player.miniPlayer && !!player.current && !!player.streamUrl);
const title = computed(() => player.current?.name ?? '');
const progressPct = computed(() => Math.max(0, Math.min(1, player.progress)));

function onLoadedMetadata(): void {
  const v = videoRef.value;
  if (!v) return;
  v.volume = player.volume;
  v.muted = player.muted;
  v.playbackRate = player.rate;
  // resume the same spot the full player left off
  if (player.position > 0 && (!v.duration || player.position < v.duration)) v.currentTime = player.position;
  if (player.playing) void v.play()?.catch(() => {});
}
function onPlay(): void {
  player.play();
}
function onPause(): void {
  player.pause();
}
function onTimeUpdate(): void {
  const v = videoRef.value;
  if (v) player.updateProgress(v.currentTime, v.duration);
}
function togglePlay(): void {
  const v = videoRef.value;
  if (!v) return;
  if (v.paused) void v.play()?.catch(() => {});
  else v.pause();
}
function expand(): void {
  if (player.current) emit('expand', player.current.id);
}
function close(): void {
  player.closePlayer();
}

// reflect a store play/pause (e.g. from OS media keys) onto the mini element
watch(
  () => player.playing,
  (p) => {
    const v = videoRef.value;
    if (!v) return;
    if (p && v.paused) void v.play()?.catch(() => {});
    else if (!p && !v.paused) v.pause();
  },
);

// pause our element if the dock is torn down while still playing
onBeforeUnmount(() => {
  videoRef.value?.pause?.();
});
</script>

<template>
  <Transition name="mini">
    <div v-if="visible" class="mini" role="region" aria-label="Mini player">
      <video
        ref="videoRef"
        class="mini__video"
        :src="player.streamUrl"
        :poster="player.current?.poster_url ?? undefined"
        preload="metadata"
        playsinline
        @loadedmetadata="onLoadedMetadata"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
        @click="expand"
      />

      <div class="mini__body">
        <p class="mini__title">{{ title }}</p>
        <div class="mini__controls">
          <button type="button" class="mini__btn" :aria-label="player.playing ? 'Pause' : 'Play'" @click="togglePlay">
            <Icon :name="player.playing ? 'pause' : 'play'" />
          </button>
          <button type="button" class="mini__btn" aria-label="Expand to full player" @click="expand">
            <Icon name="expand" />
          </button>
          <button type="button" class="mini__btn mini__btn--close" aria-label="Close player" @click="close">
            <Icon name="x" />
          </button>
        </div>
      </div>

      <div class="mini__progress" aria-hidden="true">
        <div class="mini__progress-fill" :style="{ transform: `scaleX(${progressPct})` }" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mini {
  position: fixed;
  right: var(--space-5);
  bottom: var(--space-5);
  z-index: var(--z-overlay, 60);
  width: 340px;
  max-width: calc(100vw - 2 * var(--space-5));
  display: flex;
  gap: var(--space-3);
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  background: var(--surface-glass-strong, rgba(20, 20, 20, 0.7));
  border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.12));
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-3);
  isolation: isolate;
}

.mini__video {
  width: 112px;
  aspect-ratio: 16 / 9;
  flex: none;
  border-radius: var(--radius-md);
  background: #000;
  object-fit: cover;
  cursor: pointer;
}

.mini__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-1);
  min-width: 0;
  flex: 1;
}
.mini__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini__controls {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.mini__btn {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.92);
  transition: background var(--dur-fast) var(--ease-out);
}
.mini__btn:hover {
  background: rgba(255, 255, 255, 0.12);
}
.mini__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.mini__btn :deep(svg) {
  width: 18px;
  height: 18px;
}
.mini__btn--close:hover {
  color: var(--accent-text);
}

/* progress bar pinned to the bottom edge */
.mini__progress {
  position: absolute;
  left: var(--space-2);
  right: var(--space-2);
  bottom: 4px;
  height: 3px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
}
.mini__progress-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transform-origin: left center;
  transition: transform var(--dur-fast) linear;
}

/* enter/leave */
.mini-enter-active,
.mini-leave-active {
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.mini-enter-from,
.mini-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .mini-enter-active,
  .mini-leave-active,
  .mini__progress-fill {
    transition: none;
  }
}
</style>
