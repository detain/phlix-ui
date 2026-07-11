<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

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
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { PhlixAppConfig } from '../app/types';
import Icon from './Icon.vue';
import { useMessages } from '../composables/useMessages';
import { attachHls } from './player/hls-playback';
import type { HlsHandle } from './player/hls-playback';

const emit = defineEmits<{ (e: 'expand', id: string): void }>();

const player = usePlayerStore();
const { t } = useMessages();
const videoRef = ref<HTMLVideoElement | null>(null);
const hlsHandle = ref<HlsHandle | null>(null);

// Per-user favorite state (Feature 16.2). A SINGLE compact favorite toggle in the
// dock (NOT the ThumbRating widget — the dock stays compact) bound to the current
// item. The store keeps no global apiBase, so each call is threaded `apiBase` from
// the app config via the same `inject('phlixConfig')` source MediaCard/Player use.
//
// No hydrate here: the item shown in the dock is the one the full Player/PlayerPage
// already set + hydrated into the store (Player.vue onMounted/watch + PlayerPage),
// so reading `store.isFavorite(id)` reflects that without a redundant double-fetch.
const userItemData = useUserItemDataStore();
const phlixConfig = inject<PhlixAppConfig | null>('phlixConfig', null);

/** Favorited state of the current dock item per the store (false when unknown). */
const isFavorited = computed(() => (player.current ? userItemData.isFavorite(player.current.id) : false));

/** Flip the favorite for the current item (optimistic + rollback + one write in the store). */
function toggleFavorite(): void {
  const id = player.current?.id;
  if (!id) return;
  void userItemData.toggleFavorite(id, phlixConfig?.apiBase ?? '');
}

const visible = computed(() => player.miniPlayer && !!player.current && (!!player.streamUrl || !!player.hlsMasterUrl));
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

/** Set up HLS playback via hls.js when hlsMasterUrl is persisted from a transcoded session. */
async function setupHls(): Promise<void> {
  const v = videoRef.value;
  if (!v || !player.hlsMasterUrl) return;
  // Destroy any previous handle before creating a new one.
  hlsHandle.value?.destroy();
  hlsHandle.value = null;
  hlsHandle.value = await attachHls(v, player.hlsMasterUrl, {
    startPosition: player.position,
    onReady: () => {
      const video = videoRef.value;
      if (!video) return;
      video.volume = player.volume;
      video.muted = player.muted;
      video.playbackRate = player.rate;
      if (player.playing) void video.play()?.catch(() => {});
    },
  });
}

/** Watch visible to attach HLS when the dock becomes active with a transcoded session. */
watch(
  () => visible.value,
  async (v) => {
    if (!v) {
      // Tear down HLS when hiding — the handle keeps fetching segments if left alive.
      hlsHandle.value?.destroy();
      hlsHandle.value = null;
      return;
    }
    // Only use HLS when streamUrl is absent but hlsMasterUrl is present (transcoded session).
    if (!player.hlsMasterUrl || !!player.streamUrl) return;
    await setupHls();
  },
);

// Also try to attach HLS on mount in case visible was already true (e.g. store state restored).
onMounted(async () => {
  if (visible.value && player.hlsMasterUrl && !player.streamUrl) {
    await setupHls();
  }
});

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

// External transport command bus (R-player-seam) — a host outside the Vue tree
// (Electron tray / media keys, TV remotes) pushes a seek intent onto the store.
// When the mini-player is the live element owner, apply it to OUR element clamped
// to [0, duration] and push the new position into the store (mirroring how
// onTimeUpdate keeps the store in sync), so seek works whether the full player or
// the dock is on screen.
watch(
  () => player.lastCommand,
  (cmd) => {
    const v = videoRef.value;
    if (!cmd || !v) return;
    const target = cmd.type === 'seekTo' ? cmd.value : player.position + cmd.value;
    const dur = v.duration && v.duration > 0 ? v.duration : player.duration;
    const clamped = dur > 0 ? Math.min(dur, Math.max(0, target)) : Math.max(0, target);
    v.currentTime = clamped;
    player.updateProgress(clamped, v.duration || undefined);
  },
);

// pause our element if the dock is torn down while still playing
onBeforeUnmount(() => {
  hlsHandle.value?.destroy();
  hlsHandle.value = null;
  videoRef.value?.pause?.();
});
</script>

<template>
  <Transition name="mini">
    <div v-if="visible" class="mini" role="region" :aria-label="t('player.miniPlayer')">
      <video
        ref="videoRef"
        class="mini__video"
        :src="player.hlsMasterUrl ? '' : player.streamUrl"
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
          <button type="button" class="mini__btn" :aria-label="player.playing ? t('player.pause') : t('player.play')" @click="togglePlay">
            <Icon :name="player.playing ? 'pause' : 'play'" />
          </button>
          <button
            v-if="player.current"
            type="button"
            class="mini__btn mini__btn--favorite"
            :class="{ 'is-on': isFavorited }"
            :aria-label="isFavorited ? 'Remove from favorites' : 'Add to favorites'"
            :aria-pressed="isFavorited ? 'true' : 'false'"
            @click="toggleFavorite"
          >
            <Icon :name="isFavorited ? 'bookmark' : 'bookmark-plus'" />
          </button>
          <button type="button" class="mini__btn" :aria-label="t('player.expand')" @click="expand">
            <Icon name="expand" />
          </button>
          <button type="button" class="mini__btn mini__btn--close" :aria-label="t('player.closePlayer')" @click="close">
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
  /* Theme-aware: the dock background is `--surface-glass-strong`, which is a
     dark glass in Nocturne/Midnight but off-white in Daylight. A hardcoded
     white title vanished on the light theme — use the semantic text token. */
  color: var(--text);
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
  /* Theme-aware icon colour — a hardcoded white was invisible on the Daylight
     theme's off-white dock (only the close button showed, and only on hover). */
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.mini__btn:hover {
  background: var(--surface-3);
  color: var(--text);
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
/* Favorited reads filled + amber (like MediaCard/Player), scoped to the favorite
   button so it does NOT fill the play/expand/close glyphs. */
.mini__btn--favorite.is-on {
  color: var(--accent);
}
.mini__btn--favorite.is-on :deep(svg) {
  fill: currentColor;
}

/* progress bar pinned to the bottom edge */
.mini__progress {
  position: absolute;
  left: var(--space-2);
  right: var(--space-2);
  bottom: 4px;
  height: 3px;
  border-radius: var(--radius-full);
  background: var(--border-strong);
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
