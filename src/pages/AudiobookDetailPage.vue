<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * AudiobookDetailPage — audiobook detail page with metadata and play action.
 *
 * Loaded via `/app/audiobooks/:id` (Vue router), which is reached either from the
 * audiobooks listing or by redirecting the legacy server-rendered `/audiobooks/{id}` route to the SPA.
 *
 * Data: `GET /api/v1/audiobooks/{id}` via {@link ApiClient}.
 */
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import type { AudiobookDetail, AudiobookChapter } from '../types/audiobook';
import Icon from '../components/Icon.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

const { t } = useMessages();
const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();

const currentId = computed(() => String(route.params.id ?? ''));

const audiobook = ref<AudiobookDetail | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Page title reflects the audiobook name once it loads. Declared AFTER
// `audiobook` so the immediate title watcher does not read the ref in its
// temporal dead zone.
usePageTitle(() => audiobook.value?.name);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
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
        const res = await getClient().get<{ audiobook: AudiobookDetail }>(`/api/v1/audiobooks/${currentId.value}`);
        audiobook.value = res.audiobook ?? null;
        if (!audiobook.value) {
            error.value = 'Audiobook not found';
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

function goToPlayer(): void {
    if (audiobook.value) {
        void router.push({ name: 'audiobook-player', params: { id: audiobook.value.id } });
    }
}

function goBack(): void {
    void router.push({ name: 'audiobooks' });
}

/**
 * Format duration from milliseconds to human-readable string.
 */
function formatDuration(ms: number | undefined): string {
    if (!ms || ms <= 0) return '—';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get chapter duration string.
 */
function getChapterDuration(chapter: AudiobookChapter): string {
    if (!chapter.start_ms || !chapter.end_ms) return '';
    const durationMs = chapter.end_ms - chapter.start_ms;
    return formatDuration(durationMs);
}
</script>

<template>
    <div class="audiobook-detail-page">
        <!-- Back button -->
        <button type="button" class="audiobook-detail-page__back" @click="goBack">
            <Icon name="arrow-left" />
            <span>Back to Library</span>
        </button>

        <!-- Loading state -->
        <div v-if="loading" class="audiobook-detail-page__loading">
            <div class="audiobook-detail-loading">
                <Skeleton class="audiobook-detail-loading__cover" />
                <div class="audiobook-detail-loading__info">
                    <Skeleton class="audiobook-detail-loading__title" />
                    <Skeleton class="audiobook-detail-loading__author" />
                    <Skeleton class="audiobook-detail-loading__meta" />
                    <Skeleton class="audiobook-detail-loading__desc" />
                    <Skeleton class="audiobook-detail-loading__desc" />
                </div>
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="audiobook-detail-page__error" role="alert">
            <Icon name="alert-circle" class="audiobook-detail-page__error-icon" />
            <p>{{ error }}</p>
            <Button variant="outline" @click="loadAudiobook">
                {{ t('common.retry') ?? 'Retry' }}
            </Button>
        </div>

        <!-- Audiobook detail -->
        <div v-else-if="audiobook" class="audiobook-detail">
            <div class="audiobook-detail__container">
                <!-- Cover section -->
                <div class="audiobook-detail__cover-section">
                    <div class="audiobook-cover-large">
                        <img
                            v-if="audiobook.cover_url"
                            :src="audiobook.cover_url"
                            :alt="audiobook.name"
                            class="audiobook-cover-large__img"
                        >
                        <div v-else class="audiobook-cover-large__placeholder">
                            <Icon name="bookmark" class="audiobook-cover-large__placeholder-icon" />
                        </div>
                    </div>
                </div>

                <!-- Info section -->
                <div class="audiobook-detail__info-section">
                    <h1 class="audiobook-title">{{ audiobook.name }}</h1>

                    <p v-if="audiobook.metadata?.author" class="audiobook-author">
                        by {{ audiobook.metadata.author }}
                    </p>

                    <p v-if="audiobook.metadata?.narrator" class="audiobook-narrator">
                        Narrated by {{ audiobook.metadata.narrator }}
                    </p>

                    <p v-if="audiobook.metadata?.series" class="audiobook-series">
                        Part of: {{ audiobook.metadata.series }}
                        <span v-if="audiobook.metadata?.series_position">
                            (#{{ audiobook.metadata.series_position }})
                        </span>
                    </p>

                    <!-- Metadata list -->
                    <dl class="audiobook-metadata">
                        <template v-if="audiobook.metadata?.duration_ms">
                            <dt>Duration</dt>
                            <dd>{{ formatDuration(audiobook.metadata.duration_ms) }}</dd>
                        </template>
                        <template v-if="audiobook.metadata?.language">
                            <dt>Language</dt>
                            <dd>{{ audiobook.metadata.language }}</dd>
                        </template>
                        <template v-if="audiobook.chapters?.length">
                            <dt>Chapters</dt>
                            <dd>{{ audiobook.chapters.length }}</dd>
                        </template>
                    </dl>

                    <!-- Description -->
                    <div v-if="audiobook.metadata?.description" class="audiobook-description">
                        <h3>Description</h3>
                        <p>{{ audiobook.metadata.description }}</p>
                    </div>

                    <!-- Listening progress -->
                    <div v-if="audiobook.progress" class="audiobook-progress">
                        <h3>Listening Progress</h3>
                        <div class="audiobook-progress__bar">
                            <div
                                class="audiobook-progress__fill"
                                :style="{ width: `${audiobook.progress.percent_complete}%` }"
                            />
                        </div>
                        <p class="audiobook-progress__text">
                            {{ audiobook.progress.percent_complete.toFixed(0) }}% complete
                            <span v-if="audiobook.progress.current_chapter_index > 0">
                                (Chapter {{ audiobook.progress.current_chapter_index + 1 }})
                            </span>
                        </p>
                    </div>

                    <!-- Action buttons -->
                    <div class="audiobook-actions">
                        <Button variant="solid" @click="goToPlayer">
                            <Icon name="play" />
                            {{ audiobook.progress?.percent_complete && audiobook.progress.percent_complete > 0
                                ? 'Continue Listening'
                                : 'Play' }}
                        </Button>
                    </div>
                </div>
            </div>

            <!-- Chapters section -->
            <div v-if="audiobook.chapters?.length" class="audiobook-chapters-section">
                <h2>Chapters</h2>
                <div class="chapter-list">
                    <div
                        v-for="(chapter, index) in audiobook.chapters"
                        :key="chapter.index"
                        class="chapter-item"
                    >
                        <span class="chapter-index">{{ index + 1 }}</span>
                        <span class="chapter-title">{{ chapter.title || `Chapter ${index + 1}` }}</span>
                        <span class="chapter-duration">{{ getChapterDuration(chapter) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.audiobook-detail-page {
    padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
    max-width: 1000px;
    margin: 0 auto;
}

/* Back button */
.audiobook-detail-page__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    padding: var(--space-2, 8px) var(--space-3, 12px);
    margin-bottom: var(--space-6, 24px);
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
.audiobook-detail-page__back:hover {
    background: var(--surface-2, #27272a);
    border-color: var(--accent, #f5a524);
    color: var(--text, #e4e4e7);
}

/* Loading */
.audiobook-detail-loading {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: var(--space-8, 32px);
}
.audiobook-detail-loading__cover {
    aspect-ratio: 1 / 1;
    width: 240px;
    border-radius: var(--radius-lg, 12px);
}
.audiobook-detail-loading__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
}
.audiobook-detail-loading__title {
    height: 2.5rem;
    width: 60%;
    border-radius: var(--radius-md, 8px);
}
.audiobook-detail-loading__author {
    height: 1.25rem;
    width: 30%;
    border-radius: var(--radius-md, 8px);
}
.audiobook-detail-loading__meta {
    height: 1rem;
    width: 80%;
    border-radius: var(--radius-sm, 6px);
}
.audiobook-detail-loading__desc {
    height: 1rem;
    width: 100%;
    border-radius: var(--radius-sm, 6px);
}

/* Error */
.audiobook-detail-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4, 16px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.audiobook-detail-page__error-icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
}

/* Detail layout */
.audiobook-detail__container {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: var(--space-8, 32px);
}

@media (max-width: 640px) {
    .audiobook-detail__container {
        grid-template-columns: 1fr;
    }
}

/* Cover */
.audiobook-cover-large {
    width: 240px;
    border-radius: var(--radius-lg, 12px);
    overflow: hidden;
    background: var(--surface-2, #27272a);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
.audiobook-cover-large__img {
    width: 100%;
    height: auto;
    display: block;
}
.audiobook-cover-large__placeholder {
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-3, #3f3f46);
}
.audiobook-cover-large__placeholder-icon {
    width: 64px;
    height: 64px;
    opacity: 0.5;
}

/* Info */
.audiobook-detail__info-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-4, 16px);
}
.audiobook-title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-3xl, 1.875rem);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text, #e4e4e7);
    margin: 0;
}
.audiobook-author {
    font-size: var(--text-lg, 1.125rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}
.audiobook-narrator {
    font-size: var(--text-base, 1rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
    font-style: italic;
}
.audiobook-series {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}

/* Metadata */
.audiobook-metadata {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-2, 8px) var(--space-4, 16px);
    margin: 0;
}
.audiobook-metadata dt {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
}
.audiobook-metadata dd {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text, #e4e4e7);
    margin: 0;
}

/* Description */
.audiobook-description {
    margin-top: var(--space-4, 16px);
}
.audiobook-description h3 {
    font-size: var(--text-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-2, 8px);
}
.audiobook-description p {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    line-height: 1.6;
    margin: 0;
}

/* Progress */
.audiobook-progress {
    margin-top: var(--space-4, 16px);
}
.audiobook-progress h3 {
    font-size: var(--text-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-2, 8px);
}
.audiobook-progress__bar {
    height: 8px;
    border-radius: 4px;
    background: var(--surface-3, #3f3f46);
    overflow: hidden;
}
.audiobook-progress__fill {
    height: 100%;
    border-radius: 4px;
    background: var(--accent, #f5a524);
    transition: width var(--dur-normal, 0.3s) var(--ease-out, ease);
}
.audiobook-progress__text {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: var(--space-2, 8px) 0 0;
}

/* Actions */
.audiobook-actions {
    display: flex;
    gap: var(--space-3, 12px);
    margin-top: var(--space-6, 24px);
    flex-wrap: wrap;
}

/* Chapters section */
.audiobook-chapters-section {
    margin-top: var(--space-8, 32px);
}
.audiobook-chapters-section h2 {
    font-size: var(--text-xl, 1.25rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-4, 16px);
}
.chapter-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 4px);
    background: var(--surface-2, #27272a);
    border-radius: var(--radius-lg, 12px);
    border: 1px solid var(--border, #3f3f46);
    overflow: hidden;
}
.chapter-item {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: var(--space-3, 12px);
    align-items: center;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-bottom: 1px solid var(--border, #3f3f46);
    transition: background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.chapter-item:last-child {
    border-bottom: none;
}
.chapter-item:hover {
    background: var(--surface-3, #3f3f46);
}
.chapter-index {
    font-size: var(--text-sm, 0.875rem);
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
