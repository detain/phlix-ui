<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * MusicPlayerPage — full-page music player with queue, transport controls,
 * volume, and progress seeking.
 *
 * Uses the shared {@link useMusicPlayer} composable for playback state.
 * When no track is loaded, shows an empty-player state with instructions.
 */
import { ref, computed, onUnmounted } from 'vue';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase, useMediaDirectBase } from '../composables/useApiBase';
import { useMusicPlayer } from '../composables/useMusicPlayer';
import Icon, { type IconName } from '../components/Icon.vue';

const { t } = useMessages();
const apiBase = useMediaApiBase();
const directBase = useMediaDirectBase();

const player = useMusicPlayer({
  apiBase: () => apiBase.value,
  streamBase: () => directBase.value || apiBase.value,
});
onUnmounted(() => player.dispose());

// --- playback controls ---
const shuffleOn = ref(false);
const repeatMode = ref<'off' | 'all' | 'one'>('off');

function toggleShuffle(): void {
  shuffleOn.value = !shuffleOn.value;
  // Shuffle is handled client-side by reordering the queue
  if (shuffleOn.value) {
    const current = player.currentTrack.value;
    const rest = player.queue.value.filter((t) => t.id !== current?.id);
    // Fisher-Yates shuffle
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    if (current) {
      player.loadTracks([current, ...rest]);
    }
  }
}

function toggleRepeat(): void {
  if (repeatMode.value === 'off') {
    repeatMode.value = 'all';
  } else if (repeatMode.value === 'all') {
    repeatMode.value = 'one';
  } else {
    repeatMode.value = 'off';
  }
}

// --- formatting ---
function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function onSeek(event: Event): void {
  const value = Number((event.target as HTMLInputElement).value);
  player.seek(value);
}

function onVolumeChange(event: Event): void {
  const value = Number((event.target as HTMLInputElement).value) / 100;
  // Volume is controlled via the audio elements directly
  const audioEl = document.querySelector('audio');
  if (audioEl) {
    audioEl.volume = Math.max(0, Math.min(1, value));
  }
}

const repeatIcon = computed(() => {
  if (repeatMode.value === 'one') return 'repeat-1';
  if (repeatMode.value === 'all') return 'repeat';
  return 'repeat';
});

const volumeIcon = computed<IconName>(() => {
  // Volume state would need to be tracked separately
  return 'volume';
});
</script>

<template>
  <div class="player-page">
    <div class="player-layout">
      <!-- Main player area -->
      <main class="player-main">
        <!-- Album art -->
        <div class="player-artwork">
          <svg viewBox="0 0 100 100" class="album-icon">
            <rect x="10" y="10" width="80" height="80" rx="5" fill="#3b2d5c"/>
            <rect x="25" y="25" width="50" height="50" rx="3" fill="#6b4d8a"/>
            <circle cx="50" cy="50" r="12" fill="#3b2d5c"/>
            <circle cx="50" cy="50" r="4" fill="#6b4d8a"/>
          </svg>
        </div>

        <!-- Track info -->
        <div class="player-info">
          <h2 class="player-track-name">
            {{ player.currentTrack.value?.title ?? t('player.selectTrack') }}
          </h2>
          <p class="player-artist-name">—</p>
          <p class="player-album-name">—</p>
        </div>

        <!-- Error state -->
        <div v-if="player.error.value" class="player-error" role="alert">
          <Icon name="alert-circle" class="player-error__icon" />
          <span>{{ t('music.streamError') }}</span>
        </div>

        <!-- Progress bar -->
        <div class="player-progress">
          <span class="progress-time">{{ formatTime(player.position.value) }}</span>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: player.duration.value > 0 ? `${(player.position.value / player.duration.value) * 100}%` : '0%' }"
            />
            <input
              type="range"
              class="progress-seek"
              min="0"
              :max="player.duration.value || 0"
              :value="player.position.value"
              :aria-label="t('music.seek')"
              @input="onSeek"
            >
          </div>
          <span class="progress-time">{{ formatTime(player.duration.value) }}</span>
        </div>

        <!-- Controls -->
        <div class="player-controls">
          <button
            type="button"
            class="control-btn"
            :class="{ 'is-active': shuffleOn }"
            :aria-label="t('player.shuffle')"
            :title="t('player.shuffle')"
            @click="toggleShuffle"
          >
            <Icon name="shuffle" class="control-btn__icon" />
          </button>

          <button
            type="button"
            class="control-btn"
            :disabled="!player.hasPrev.value"
            :aria-label="t('music.previous')"
            @click="player.previous()"
          >
            <Icon name="skip-back" class="control-btn__icon" />
          </button>

          <button
            type="button"
            class="control-btn control-btn--play"
            :aria-label="player.playing.value ? t('music.pause') : t('music.play')"
            @click="player.toggle()"
          >
            <Icon :name="player.playing.value ? 'pause' : 'play'" class="control-btn__icon control-btn__icon--lg" />
          </button>

          <button
            type="button"
            class="control-btn"
            :disabled="!player.hasNext.value"
            :aria-label="t('music.next')"
            @click="player.next()"
          >
            <Icon name="skip-forward" class="control-btn__icon" />
          </button>

          <button
            type="button"
            class="control-btn"
            :class="{ 'is-active': repeatMode !== 'off' }"
            :aria-label="t('player.repeat')"
            :title="t('player.repeat')"
            @click="toggleRepeat"
          >
            <Icon :name="repeatIcon" class="control-btn__icon" />
          </button>
        </div>

        <!-- Volume -->
        <div class="player-volume">
          <button
            type="button"
            class="volume-btn"
            :aria-label="t('player.volume')"
            @click="() => {}"
          >
            <Icon :name="volumeIcon" class="volume-btn__icon" />
          </button>
          <input
            type="range"
            class="volume-slider"
            min="0"
            max="100"
            value="80"
            :aria-label="t('player.volume')"
            @input="onVolumeChange"
          >
        </div>
      </main>

      <!-- Queue sidebar -->
      <aside class="player-queue">
        <h3 class="player-queue__title">{{ t('player.queue') }}</h3>

        <div v-if="player.queue.value.length === 0" class="player-queue__empty">
          <Icon name="list-music" class="player-queue__empty-icon" />
          <p>{{ t('player.queueEmpty') }}</p>
        </div>

        <ul v-else class="queue-list" role="list">
          <li
            v-for="(track, index) in player.queue.value"
            :key="track.id"
            class="queue-item"
            :class="{
              'is-current': player.currentIndex.value === index,
              'is-playing': player.currentIndex.value === index && player.playing.value,
            }"
            role="listitem"
          >
            <span class="queue-item__num">
              <template v-if="player.currentIndex.value !== index">
                {{ index + 1 }}
              </template>
              <Icon v-else-if="player.playing.value" name="play" class="queue-item__playing-icon" />
              <Icon v-else name="pause" class="queue-item__playing-icon" />
            </span>
            <span class="queue-item__title">{{ track.title }}</span>
            <span class="queue-item__duration">{{ formatTime(track.durationSecs) }}</span>
            <button
              type="button"
              class="queue-item__remove"
              :aria-label="t('player.removeFromQueue')"
              @click="() => {}"
            >
              <Icon name="x" class="queue-item__remove-icon" />
            </button>
          </li>
        </ul>
      </aside>
    </div>

    <!-- Loading overlay -->
    <div v-if="player.loading.value" class="player-loading" role="status" aria-live="polite">
      <div class="player-loading__spinner" />
      <span class="sr-only">{{ t('music.loading') }}</span>
    </div>
  </div>
</template>

<style scoped>
.player-page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--space-16, 64px));
  padding: var(--space-4, 16px);
  position: relative;
}

.player-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-6, 24px);
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
}

@media (max-width: 768px) {
  .player-layout {
    grid-template-columns: 1fr;
  }
  .player-queue {
    display: none;
  }
}

/* Main player */
.player-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6, 24px);
  padding: var(--space-8, 32px) var(--space-4, 16px);
  background: var(--surface-2, #27272a);
  border-radius: var(--radius-xl, 16px);
  border: 1px solid var(--border, #3f3f46);
}

/* Album artwork */
.player-artwork {
  width: 240px;
  height: 240px;
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
.album-icon {
  width: 100%;
  height: 100%;
}

/* Track info */
.player-info {
  text-align: center;
}
.player-track-name {
  font-family: var(--font-display, inherit);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-xl, 1.25rem);
  color: var(--text, #e4e4e7);
  margin: 0 0 var(--space-1, 4px);
}
.player-artist-name,
.player-album-name {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text-muted, #a1a1aa);
  margin: 0;
}

/* Error */
.player-error {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--space-2, 8px) var(--space-3, 12px);
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid var(--danger, #f87171);
  border-radius: var(--radius-md, 8px);
  color: var(--danger, #f87171);
  font-size: var(--text-sm, 0.875rem);
}
.player-error__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Progress bar */
.player-progress {
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: var(--space-3, 12px);
}
.progress-time {
  font-size: var(--text-xs, 0.75rem);
  font-family: var(--font-mono, monospace);
  color: var(--text-muted, #a1a1aa);
  min-width: 3ch;
  text-align: center;
}
.progress-bar {
  flex: 1;
  position: relative;
  height: 4px;
  background: var(--surface-4, #52525b);
  border-radius: 2px;
}
.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--accent, #f5a524);
  border-radius: 2px;
  pointer-events: none;
}
.progress-seek {
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: 20px;
  opacity: 0;
  cursor: pointer;
  /* Expand hit area */
  margin: 0;
  padding: 8px 0;
  box-sizing: border-box;
}
/* Show fill handle on hover */
.progress-bar:hover .progress-fill::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent, #f5a524);
}

/* Controls */
.player-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3, 12px);
}
.control-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full, 999px);
  background: var(--surface-3, #3f3f46);
  border: 1px solid var(--border, #3f3f46);
  color: var(--text, #e4e4e7);
  cursor: pointer;
  transition: background var(--dur-fast, 0.18s), transform var(--dur-fast, 0.18s);
}
.control-btn:hover:not(:disabled) {
  background: var(--surface-4, #52525b);
}
.control-btn:active:not(:disabled) {
  transform: scale(0.95);
}
.control-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.control-btn.is-active {
  color: var(--accent, #f5a524);
}
.control-btn--play {
  width: 56px;
  height: 56px;
  background: var(--accent, #f5a524);
  color: var(--accent-contrast, #1a1205);
  border-color: transparent;
}
.control-btn--play:hover:not(:disabled) {
  background: var(--accent-hover, #e09000);
}
.control-btn__icon {
  width: 18px;
  height: 18px;
}
.control-btn__icon--lg {
  width: 24px;
  height: 24px;
}
.control-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}

/* Volume */
.player-volume {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  width: 100%;
  max-width: 200px;
}
.volume-btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md, 8px);
  background: transparent;
  border: none;
  color: var(--text-muted, #a1a1aa);
  cursor: pointer;
}
.volume-btn__icon {
  width: 18px;
  height: 18px;
}
.volume-slider {
  flex: 1;
  height: 4px;
  accent-color: var(--accent, #f5a524);
  cursor: pointer;
}

/* Queue sidebar */
.player-queue {
  display: flex;
  flex-direction: column;
  background: var(--surface-2, #27272a);
  border-radius: var(--radius-xl, 16px);
  border: 1px solid var(--border, #3f3f46);
  overflow: hidden;
}
.player-queue__title {
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--fw-semibold, 600);
  color: var(--text, #e4e4e7);
  padding: var(--space-4, 16px);
  margin: 0;
  border-bottom: 1px solid var(--border, #3f3f46);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.player-queue__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8, 32px) var(--space-4, 16px);
  color: var(--text-muted, #a1a1aa);
  text-align: center;
  gap: var(--space-2, 8px);
}
.player-queue__empty-icon {
  width: 32px;
  height: 32px;
  opacity: 0.5;
}
.player-queue__empty p {
  margin: 0;
  font-size: var(--text-sm, 0.875rem);
}

.queue-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.queue-item {
  display: grid;
  grid-template-columns: 32px 1fr auto 28px;
  gap: var(--space-2, 8px);
  align-items: center;
  padding: var(--space-2, 8px) var(--space-3, 12px);
  border-bottom: 1px solid var(--border, #3f3f46);
  transition: background var(--dur-fast, 0.18s);
}
.queue-item:last-child {
  border-bottom: none;
}
.queue-item:hover {
  background: var(--surface-3, #3f3f46);
}
.queue-item.is-current {
  background: var(--surface-3, #3f3f46);
}
.queue-item.is-playing .queue-item__title {
  color: var(--accent, #f5a524);
}

.queue-item__num {
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted, #a1a1aa);
  text-align: center;
}
.queue-item__playing-icon {
  width: 12px;
  height: 12px;
  color: var(--accent, #f5a524);
}
.queue-item__title {
  font-size: var(--text-sm, 0.875rem);
  color: var(--text, #e4e4e7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.queue-item__duration {
  font-size: var(--text-xs, 0.75rem);
  font-family: var(--font-mono, monospace);
  color: var(--text-muted, #a1a1aa);
}
.queue-item__remove {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm, 6px);
  background: transparent;
  border: none;
  color: var(--text-muted, #a1a1aa);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--dur-fast, 0.18s), background var(--dur-fast, 0.18s);
}
.queue-item:hover .queue-item__remove {
  opacity: 1;
}
.queue-item__remove:hover {
  background: var(--surface-4, #52525b);
  color: var(--text, #e4e4e7);
}
.queue-item__remove-icon {
  width: 14px;
  height: 14px;
}

/* Loading overlay */
.player-loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10;
}
.player-loading__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--surface-3, #3f3f46);
  border-top-color: var(--accent, #f5a524);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
