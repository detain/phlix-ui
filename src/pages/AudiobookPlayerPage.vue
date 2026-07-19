<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * AudiobookPlayerPage — audiobook player with chapters, playback controls, and progress tracking.
 *
 * Loaded via `/app/audiobooks/:id/read` (Vue router), which is reached either from the
 * audiobook detail page or by redirecting the legacy server-rendered `/audiobooks/{id}/read` route to the SPA.
 *
 * Data: `GET /api/v1/audiobooks/{id}/read` via {@link ApiClient}.
 * Progress: `POST /api/v1/audiobooks/{id}/progress` via {@link ApiClient}.
 */
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase, useMediaDirectBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import type { AudiobookDetail, AudiobookChapter, AudiobookProgress, SaveAudiobookProgressInput } from '../types/audiobook';
import Icon from '../components/Icon.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();
const directBase = useMediaDirectBase();

const currentId = computed(() => String(route.params.id ?? ''));

const audiobook = ref<AudiobookDetail | null>(null);
const progress = ref<AudiobookProgress | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Declared AFTER `audiobook` so the immediate title watcher does not read the
// ref in its temporal dead zone.
usePageTitle(() => audiobook.value?.name);

// Audio element ref
const audioRef = ref<HTMLAudioElement | null>(null);

// Playback state
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const playbackSpeed = ref(1);
const currentChapterIndex = ref(0);

// Available playback speeds
const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

let saveProgressTimeout: ReturnType<typeof setTimeout> | null = null;

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

function getStreamUrl(): string {
    // Use direct base if available, otherwise fall back to API base
    const base = directBase.value || apiBase.value;
    if (!audiobook.value?.stream_url) return '';
    const url = audiobook.value.stream_url;
    if (/^https?:\/\//.test(url)) return url;
    return `${base}${url}`;
}

async function loadAudiobook(): Promise<void> {
    if (!currentId.value) {
        error.value = 'Invalid audiobook ID';
        loading.value = false;
        return;
    }

    loading.value = true;
    error.value = null;
    try {
        const res = await getClient().get<{
            audiobook: AudiobookDetail;
            progress: AudiobookProgress | null;
        }>(`/api/v1/audiobooks/${currentId.value}/read`);

        audiobook.value = res.audiobook ?? null;
        progress.value = res.progress ?? null;

        if (!audiobook.value) {
            error.value = 'Audiobook not found';
            return;
        }

        // Initialize to saved progress position
        if (progress.value) {
            currentChapterIndex.value = progress.value.current_chapter_index ?? 0;
            // Position will be set once audio loads
        }
    } catch {
        error.value = 'Could not load audiobook';
        audiobook.value = null;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    void loadAudiobook();
});

onBeforeUnmount(() => {
    if (saveProgressTimeout) {
        clearTimeout(saveProgressTimeout);
    }
    // Save progress on unmount
    if (audiobook.value && currentTime.value > 0) {
        void saveProgress(true);
    }
});

// Watch for audio element and set initial position
watch(audioRef, (audio) => {
    if (audio && progress.value) {
        // Seek to saved position
        audio.currentTime = progress.value.position_ms / 1000;
    }
});

function onLoadedMetadata(): void {
    if (!audioRef.value) return;
    duration.value = audioRef.value.duration;
    // Apply saved playback speed
    audioRef.value.playbackRate = playbackSpeed.value;
}

function onTimeUpdate(): void {
    if (!audioRef.value) return;
    currentTime.value = audioRef.value.currentTime;

    // Update current chapter based on position
    updateCurrentChapter();

    // Debounced save
    scheduleProgressSave();
}

function onEnded(): void {
    playing.value = false;
    // Save final progress
    void saveProgress(true);
}

function updateCurrentChapter(): void {
    if (!audiobook.value?.chapters?.length) return;
    const timeMs = currentTime.value * 1000;
    for (let i = 0; i < audiobook.value.chapters.length; i++) {
        const chapter = audiobook.value.chapters[i];
        if (chapter.start_ms <= timeMs && timeMs < chapter.end_ms) {
            currentChapterIndex.value = i;
            return;
        }
    }
}

function scheduleProgressSave(): void {
    if (saveProgressTimeout) {
        clearTimeout(saveProgressTimeout);
    }
    saveProgressTimeout = setTimeout(() => {
        void saveProgress(false);
    }, 2000);
}

async function saveProgress(immediate = false): Promise<void> {
    if (!audiobook.value) return;

    const completedChapters: number[] = [];
    if (progress.value?.completed_chapters?.length) {
        completedChapters.push(...progress.value.completed_chapters);
    }

    // Mark current chapter as in progress (not necessarily complete)
    const percentComplete = duration.value > 0
        ? (currentTime.value / duration.value) * 100
        : 0;

    const payload: SaveAudiobookProgressInput = {
        position_ms: Math.floor(currentTime.value * 1000),
        current_chapter_index: currentChapterIndex.value,
        completed_chapters: completedChapters,
        percent_complete: Math.min(100, Math.max(0, percentComplete)),
    };

    const doSave = async () => {
        try {
            await getClient().post(`/api/v1/audiobooks/${audiobook.value!.id}/progress`, payload);
        } catch {
            // Silently fail progress saves - non-critical
        }
    };

    if (immediate) {
        await doSave();
    } else {
        saveProgressTimeout = setTimeout(doSave, 2000);
    }
}

function togglePlay(): void {
    if (!audioRef.value) return;
    if (playing.value) {
        audioRef.value.pause();
        playing.value = false;
    } else {
        audioRef.value.play().then(() => {
            playing.value = true;
        }).catch(() => {
            playing.value = false;
        });
    }
}

function skip(seconds: number): void {
    if (!audioRef.value) return;
    audioRef.value.currentTime = Math.max(0, Math.min(duration.value, audioRef.value.currentTime + seconds));
}

function seek(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (!audioRef.value) return;
    audioRef.value.currentTime = value;
    currentTime.value = value;
}

function onVolumeChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value) / 100;
    volume.value = Math.max(0, Math.min(1, value));
    if (audioRef.value) {
        audioRef.value.volume = volume.value;
    }
}

function cyclePlaybackSpeed(): void {
    const currentIndex = playbackSpeeds.indexOf(playbackSpeed.value);
    const nextIndex = (currentIndex + 1) % playbackSpeeds.length;
    playbackSpeed.value = playbackSpeeds[nextIndex];
    if (audioRef.value) {
        audioRef.value.playbackRate = playbackSpeed.value;
    }
}

function selectChapter(index: number): void {
    if (!audiobook.value?.chapters?.[index]) return;
    const chapter = audiobook.value.chapters[index];
    currentChapterIndex.value = index;
    if (audioRef.value) {
        audioRef.value.currentTime = chapter.start_ms / 1000;
    }
}

function goToDetail(): void {
    if (audiobook.value) {
        void router.push({ name: 'audiobook-detail', params: { id: audiobook.value.id } });
    } else {
        void router.push({ name: 'audiobooks' });
    }
}

/**
 * Format time in seconds to human-readable string.
 */
function formatTime(secs: number): string {
    if (!isFinite(secs) || secs < 0) return '0:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Get current chapter info.
 */
const currentChapter = computed((): AudiobookChapter | null => {
    if (!audiobook.value?.chapters?.length) return null;
    return audiobook.value.chapters[currentChapterIndex.value] ?? null;
});

/**
 * Calculate progress percentage.
 */
const progressPercent = computed(() => {
    if (duration.value <= 0) return 0;
    return (currentTime.value / duration.value) * 100;
});
</script>

<template>
    <div class="player-page">
        <!-- Audio element -->
        <audio
            v-if="audiobook?.stream_url"
            ref="audioRef"
            :src="getStreamUrl()"
            preload="metadata"
            @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate"
            @ended="onEnded"
        />

        <!-- Back button -->
        <header class="player-header">
            <button type="button" class="player-header__back" @click="goToDetail">
                <Icon name="arrow-left" />
                <span>Back to Audiobook</span>
            </button>
            <div class="player-header__title">
                {{ audiobook?.name ?? '' }}
            </div>
        </header>

        <!-- Loading state -->
        <div v-if="loading" class="player-loading">
            <Skeleton class="player-loading__cover" />
            <div class="player-loading__info">
                <Skeleton class="player-loading__title" />
                <Skeleton class="player-loading__author" />
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="player-error" role="alert">
            <Icon name="alert-circle" class="player-error__icon" />
            <p>{{ error }}</p>
        </div>

        <!-- Player content -->
        <div v-else-if="audiobook" class="player-content">
            <div class="player-layout">
                <!-- Main player area -->
                <main class="player-main">
                    <!-- Cover art -->
                    <div class="player-artwork">
                        <img
                            v-if="audiobook.cover_url"
                            :src="audiobook.cover_url"
                            :alt="audiobook.name"
                            class="player-artwork__img"
                        >
                        <div v-else class="player-artwork__placeholder">
                            <Icon name="bookmark" class="player-artwork__placeholder-icon" />
                        </div>
                    </div>

                    <!-- Title and author -->
                    <div class="player-info">
                        <h1 class="player-title">{{ audiobook.name }}</h1>
                        <p v-if="audiobook.metadata?.author" class="player-author">
                            by {{ audiobook.metadata.author }}
                        </p>
                        <p v-if="currentChapter" class="player-chapter">
                            {{ currentChapter.title || `Chapter ${currentChapterIndex + 1}` }}
                        </p>
                    </div>

                    <!-- Progress bar -->
                    <div class="player-progress">
                        <div class="progress-bar">
                            <div
                                class="progress-fill"
                                :style="{ width: `${progressPercent}%` }"
                            />
                            <input
                                type="range"
                                class="progress-seek"
                                min="0"
                                :max="duration || 0"
                                :value="currentTime"
                                aria-label="Seek"
                                @input="seek"
                            >
                        </div>
                        <div class="progress-times">
                            <span>{{ formatTime(currentTime) }}</span>
                            <span>{{ formatTime(duration) }}</span>
                        </div>
                    </div>

                    <!-- Controls -->
                    <div class="player-controls">
                        <button
                            type="button"
                            class="control-btn"
                            title="Skip back 30 seconds"
                            @click="skip(-30)"
                        >
                            <Icon name="rewind" class="control-btn__icon" />
                            <span class="control-btn__label">-30</span>
                        </button>

                        <button
                            type="button"
                            class="control-btn control-btn--play"
                            :aria-label="playing ? 'Pause' : 'Play'"
                            @click="togglePlay"
                        >
                            <Icon :name="playing ? 'pause' : 'play'" class="control-btn__icon control-btn__icon--lg" />
                        </button>

                        <button
                            type="button"
                            class="control-btn"
                            title="Skip forward 30 seconds"
                            @click="skip(30)"
                        >
                            <Icon name="forward" class="control-btn__icon" />
                            <span class="control-btn__label">+30</span>
                        </button>
                    </div>

                    <!-- Extra controls -->
                    <div class="player-extras">
                        <!-- Playback speed -->
                        <button
                            type="button"
                            class="extra-btn"
                            :aria-label="`Playback speed: ${playbackSpeed}x`"
                            @click="cyclePlaybackSpeed"
                        >
                            {{ playbackSpeed }}x
                        </button>

                        <!-- Volume -->
                        <div class="volume-control">
                            <Icon name="volume" class="volume-icon" />
                            <input
                                type="range"
                                class="volume-slider"
                                min="0"
                                max="100"
                                :value="volume * 100"
                                aria-label="Volume"
                                @input="onVolumeChange"
                            >
                        </div>
                    </div>
                </main>

                <!-- Chapter sidebar -->
                <aside class="player-chapters">
                    <h3 class="player-chapters__title">Chapters</h3>
                    <div class="chapter-list">
                        <button
                            v-for="(chapter, index) in audiobook.chapters"
                            :key="chapter.index"
                            type="button"
                            class="chapter-item"
                            :class="{ 'is-active': index === currentChapterIndex }"
                            @click="selectChapter(index)"
                        >
                            <span class="chapter-index">{{ index + 1 }}</span>
                            <span class="chapter-title">{{ chapter.title || `Chapter ${index + 1}` }}</span>
                            <span class="chapter-duration">
                                {{ formatTime((chapter.end_ms - chapter.start_ms) / 1000) }}
                            </span>
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<style scoped>
.player-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--surface-1, #1a1a1a);
}

/* Header */
.player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    background: var(--surface-2, #27272a);
    border-bottom: 1px solid var(--border, #3f3f46);
}
.player-header__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border-radius: var(--radius-md, 8px);
    background: transparent;
    border: 1px solid var(--border, #3f3f46);
    color: var(--text-muted, #a1a1aa);
    font-size: var(--text-sm, 0.875rem);
    cursor: pointer;
    transition: background var(--dur-fast, 0.18s) var(--ease-out, ease),
                border-color var(--dur-fast, 0.18s) var(--ease-out, ease),
                color var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.player-header__back:hover {
    background: var(--surface-3, #3f3f46);
    border-color: var(--accent, #f5a524);
    color: var(--text, #e4e4e7);
}
.player-header__title {
    flex: 1;
    text-align: center;
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    color: var(--text, #e4e4e7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 var(--space-4, 16px);
}

/* Loading */
.player-loading {
    flex: 1;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: var(--space-8, 32px);
    padding: var(--space-8, 32px);
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
}
.player-loading__cover {
    aspect-ratio: 1 / 1;
    width: 240px;
    border-radius: var(--radius-lg, 12px);
}
.player-loading__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-4, 16px);
    padding-top: var(--space-4, 16px);
}
.player-loading__title {
    height: 2rem;
    width: 60%;
    border-radius: var(--radius-md, 8px);
}
.player-loading__author {
    height: 1.25rem;
    width: 40%;
    border-radius: var(--radius-md, 8px);
}

/* Error */
.player-error {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4, 16px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.player-error__icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
}

/* Content */
.player-content {
    flex: 1;
    padding: var(--space-6, 24px) var(--space-4, 16px);
}

.player-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: var(--space-6, 24px);
    max-width: 1000px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .player-layout {
        grid-template-columns: 1fr;
    }
    .player-chapters {
        display: none;
    }
}

/* Main player area */
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

/* Artwork */
.player-artwork {
    width: 240px;
    height: 240px;
    border-radius: var(--radius-lg, 12px);
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
.player-artwork__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.player-artwork__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-3, #3f3f46);
}
.player-artwork__placeholder-icon {
    width: 64px;
    height: 64px;
    opacity: 0.5;
}

/* Info */
.player-info {
    text-align: center;
}
.player-title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-xl, 1.25rem);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-1, 4px);
}
.player-author {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0 0 var(--space-1, 4px);
}
.player-chapter {
    font-size: var(--text-sm, 0.875rem);
    color: var(--accent, #f5a524);
    margin: 0;
}

/* Progress */
.player-progress {
    width: 100%;
    max-width: 400px;
}
.progress-bar {
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
    margin: 0;
    padding: 8px 0;
    box-sizing: border-box;
}
.progress-times {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-2, 8px);
    font-size: var(--text-xs, 0.75rem);
    font-family: var(--font-mono, monospace);
    color: var(--text-muted, #a1a1aa);
}

/* Controls */
.player-controls {
    display: flex;
    align-items: center;
    gap: var(--space-4, 16px);
}
.control-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1, 4px);
    padding: var(--space-3, 12px);
    border-radius: var(--radius-full, 999px);
    background: var(--surface-3, #3f3f46);
    border: 1px solid var(--border, #3f3f46);
    color: var(--text, #e4e4e7);
    cursor: pointer;
    transition: background var(--dur-fast, 0.18s), transform var(--dur-fast, 0.18s);
}
.control-btn:hover {
    background: var(--surface-4, #52525b);
}
.control-btn:active {
    transform: scale(0.95);
}
.control-btn__icon {
    width: 18px;
    height: 18px;
}
.control-btn__label {
    font-size: 10px;
    font-family: var(--font-mono, monospace);
}
.control-btn__icon--lg {
    width: 24px;
    height: 24px;
}
.control-btn--play {
    width: 64px;
    height: 64px;
    background: var(--accent, #f5a524);
    color: var(--accent-contrast, #1a1205);
    border-color: transparent;
}
.control-btn--play:hover {
    background: var(--accent-hover, #e09000);
}

/* Extras */
.player-extras {
    display: flex;
    align-items: center;
    gap: var(--space-6, 24px);
}
.extra-btn {
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border-radius: var(--radius-md, 8px);
    background: var(--surface-3, #3f3f46);
    border: 1px solid var(--border, #3f3f46);
    color: var(--text, #e4e4e7);
    font-size: var(--text-sm, 0.875rem);
    font-family: var(--font-mono, monospace);
    cursor: pointer;
    transition: background var(--dur-fast, 0.18s) var(--ease-out, ease),
                border-color var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.extra-btn:hover {
    background: var(--surface-4, #52525b);
    border-color: var(--accent, #f5a524);
}
.volume-control {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
}
.volume-icon {
    width: 18px;
    height: 18px;
    color: var(--text-muted, #a1a1aa);
}
.volume-slider {
    width: 100px;
    height: 4px;
    accent-color: var(--accent, #f5a524);
    cursor: pointer;
}

/* Chapter sidebar */
.player-chapters {
    display: flex;
    flex-direction: column;
    background: var(--surface-2, #27272a);
    border-radius: var(--radius-xl, 16px);
    border: 1px solid var(--border, #3f3f46);
    overflow: hidden;
}
.player-chapters__title {
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text, #e4e4e7);
    padding: var(--space-4, 16px);
    margin: 0;
    border-bottom: 1px solid var(--border, #3f3f46);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.chapter-list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    flex: 1;
}
.chapter-item {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: var(--space-2, 8px);
    align-items: center;
    width: 100%;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border: none;
    border-bottom: 1px solid var(--border, #3f3f46);
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition: background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.chapter-item:last-child {
    border-bottom: none;
}
.chapter-item:hover {
    background: var(--surface-3, #3f3f46);
}
.chapter-item.is-active {
    background: var(--surface-3, #3f3f46);
}
.chapter-item.is-active .chapter-title {
    color: var(--accent, #f5a524);
}
.chapter-index {
    font-size: var(--text-xs, 0.75rem);
    color: var(--text-muted, #a1a1aa);
    text-align: center;
}
.chapter-title {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text, #e4e4e7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.chapter-duration {
    font-size: var(--text-xs, 0.75rem);
    font-family: var(--font-mono, monospace);
    color: var(--text-muted, #a1a1aa);
}
</style>
