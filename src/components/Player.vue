<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import type { MediaItem } from '../types/media-item';

defineProps<{
    media: MediaItem;
    streamUrl: string;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const muted = ref(false);
const playbackRate = ref(1);
const fullscreen = ref(false);
const showControls = ref(true);

let controlsTimer: ReturnType<typeof setTimeout> | null = null;

const progress = computed(() =>
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
);

function formatTime(secs: number): string {
    if (!isFinite(secs) || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function togglePlay() {
    if (!videoRef.value) return;
    if (playing.value) {
        videoRef.value.pause();
    } else {
        videoRef.value.play();
    }
}

function onTimeUpdate() {
    if (videoRef.value) currentTime.value = videoRef.value.currentTime;
}

function onLoadedMetadata() {
    if (videoRef.value) duration.value = videoRef.value.duration;
}

function seek(e: MouseEvent) {
    const bar = e.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (videoRef.value) videoRef.value.currentTime = ratio * duration.value;
}

function onVolumeChange(e: Event) {
    const val = parseFloat((e.target as HTMLInputElement).value);
    volume.value = val;
    if (videoRef.value) videoRef.value.volume = val;
    muted.value = val === 0;
}

function toggleMute() {
    muted.value = !muted.value;
    if (videoRef.value) videoRef.value.muted = muted.value;
}

function setRate(rate: number) {
    playbackRate.value = rate;
    if (videoRef.value) videoRef.value.playbackRate = rate;
}

function toggleFullscreen() {
    const el = videoRef.value?.closest('.player-container') as HTMLElement | null;
    if (!el) return;
    if (!document.fullscreenElement) {
        el.requestFullscreen();
        fullscreen.value = true;
    } else {
        document.exitFullscreen();
        fullscreen.value = false;
    }
}

function showControlsTemporarily() {
    showControls.value = true;
    if (controlsTimer) clearTimeout(controlsTimer);
    controlsTimer = setTimeout(() => {
        if (playing.value) showControls.value = false;
    }, 3000);
}

onUnmounted(() => {
    if (controlsTimer) clearTimeout(controlsTimer);
});
</script>

<template>
    <div
        class="player-container"
        :class="{ 'controls-hidden': !showControls && playing }"
        @mousemove="showControlsTemporarily"
        @click="togglePlay"
    >
        <div class="player-overlay" />

        <video
            ref="videoRef"
            class="player-video"
            :src="streamUrl"
            :poster="media.poster_url ?? undefined"
            preload="metadata"
            @play="playing = true"
            @pause="playing = false"
            @timeupdate="onTimeUpdate"
            @loadedmetadata="onLoadedMetadata"
            @click.stop="togglePlay"
        />

        <div class="player-controls" @click.stop>
            <div class="controls-top">
                <button class="ctrl-btn back-btn" @click="$router.back()">
                    ← Back
                </button>
                <span class="media-title">{{ media.name }}</span>
                <span v-if="media.year" class="media-year">{{ media.year }}</span>
            </div>

            <div class="controls-center">
                <button class="play-btn" @click="togglePlay">
                    {{ playing ? '❚❚' : '▶' }}
                </button>
            </div>

            <div class="controls-bottom">
                <div class="progress-bar" @click="seek">
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: progress + '%' }" />
                    </div>
                </div>

                <div class="controls-row">
                    <span class="time-display">{{ formatTime(currentTime) }}</span>

                    <div class="volume-control">
                        <button class="ctrl-btn" @click="toggleMute">
                            {{ muted || volume === 0 ? '🔇' : '🔊' }}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            :value="muted ? 0 : volume"
                            class="volume-slider"
                            @input="onVolumeChange"
                        />
                    </div>

                    <div class="speed-control">
                        <select class="speed-select" :value="playbackRate" @change="(e) => setRate(Number((e.target as HTMLSelectElement).value))">
                            <option value="0.5">0.5×</option>
                            <option value="0.75">0.75×</option>
                            <option value="1">1×</option>
                            <option value="1.25">1.25×</option>
                            <option value="1.5">1.5×</option>
                            <option value="2">2×</option>
                        </select>
                    </div>

                    <span class="time-display">{{ formatTime(duration) }}</span>

                    <button class="ctrl-btn" @click="toggleFullscreen">
                        {{ fullscreen ? '⤓' : '⤢' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.player-container {
    position: relative;
    width: 100%;
    background: #000;
    aspect-ratio: 16/9;
    max-height: 90vh;
    overflow: hidden;
    cursor: pointer;
}

.player-container.controls-hidden {
    cursor: none;
}

.player-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
}

.player-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.player-controls {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7) 0%,
        transparent 30%,
        transparent 70%,
        rgba(0, 0, 0, 0.7) 100%
    );
    padding: 16px;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.controls-hidden .player-controls {
    opacity: 0;
}

.player-controls:hover {
    opacity: 1;
}

.controls-top {
    display: flex;
    align-items: center;
    gap: 12px;
}

.media-title {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
}

.media-year {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
}

.controls-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-btn {
    font-size: 2.5rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: 50%;
    width: 72px;
    height: 72px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
}

.play-btn:hover {
    background: rgba(99, 102, 241, 0.7);
}

.controls-bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.progress-bar {
    width: 100%;
    padding: 4px 0;
    cursor: pointer;
}

.progress-track {
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--color-primary, #6366f1);
    border-radius: 2px;
    transition: width 0.1s linear;
}

.controls-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.time-display {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
    font-variant-numeric: tabular-nums;
    min-width: 40px;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 4px;
}

.volume-slider {
    width: 60px;
    accent-color: var(--color-primary, #6366f1);
}

.speed-select {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.75rem;
    padding: 2px 4px;
    border-radius: 4px;
    cursor: pointer;
}

.ctrl-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 0.15s ease;
}

.ctrl-btn:hover {
    background: rgba(255, 255, 255, 0.15);
}

.back-btn {
    font-size: 0.8rem;
}
</style>
