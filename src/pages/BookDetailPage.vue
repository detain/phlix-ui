<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * BookDetailPage — book detail page with metadata and reading actions.
 *
 * Loaded via `/app/books/:id` (Vue router), which is reached either from the
 * books listing or by redirecting the legacy server-rendered `/books/{id}` route to the SPA.
 *
 * Data: `GET /api/v1/books/{id}` via {@link ApiClient}.
 */
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import type { BookDetail } from '../types/book';
import Icon from '../components/Icon.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

const { t } = useMessages();
const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();

const currentId = computed(() => String(route.params.id ?? ''));

// Page title reflects the book name once it loads
usePageTitle(() => book.value?.name);

const book = ref<BookDetail | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

async function loadBook(): Promise<void> {
    if (!currentId.value) {
        error.value = 'Invalid book ID';
        loading.value = false;
        return;
    }

    loading.value = true;
    error.value = null;
    try {
        const res = await getClient().get<{ book: BookDetail }>(`/api/v1/books/${currentId.value}`);
        book.value = res.book ?? null;
        if (!book.value) {
            error.value = 'Book not found';
        }
    } catch {
        error.value = 'Could not load book';
        book.value = null;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    void loadBook();
});

function goToReader(): void {
    if (book.value) {
        void router.push({ name: 'book-reader', params: { id: book.value.id } });
    }
}

function downloadBook(): void {
    if (book.value?.download_url) {
        window.open(book.value.download_url, '_blank');
    }
}

function goBack(): void {
    void router.push({ name: 'books' });
}
</script>

<template>
    <div class="book-detail-page">
        <!-- Back button -->
        <button type="button" class="book-detail-page__back" @click="goBack">
            <Icon name="arrow-left" />
            <span>Back to Library</span>
        </button>

        <!-- Loading state -->
        <div v-if="loading" class="book-detail-page__loading">
            <div class="book-detail-loading">
                <Skeleton class="book-detail-loading__cover" />
                <div class="book-detail-loading__info">
                    <Skeleton class="book-detail-loading__title" />
                    <Skeleton class="book-detail-loading__author" />
                    <Skeleton class="book-detail-loading__meta" />
                    <Skeleton class="book-detail-loading__desc" />
                    <Skeleton class="book-detail-loading__desc" />
                </div>
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="book-detail-page__error" role="alert">
            <Icon name="alert-circle" class="book-detail-page__error-icon" />
            <p>{{ error }}</p>
            <Button variant="outline" @click="loadBook">
                {{ t('common.retry') ?? 'Retry' }}
            </Button>
        </div>

        <!-- Book detail -->
        <div v-else-if="book" class="book-detail">
            <div class="book-detail__container">
                <!-- Cover section -->
                <div class="book-detail__cover-section">
                    <div class="book-cover-large">
                        <img
                            v-if="book.cover_url"
                            :src="book.cover_url"
                            :alt="book.name"
                            class="book-cover-large__img"
                        >
                        <div v-else class="book-cover-large__placeholder">
                            <Icon name="bookmark" class="book-cover-large__placeholder-icon" />
                        </div>
                    </div>
                </div>

                <!-- Info section -->
                <div class="book-detail__info-section">
                    <h1 class="book-title">{{ book.name }}</h1>

                    <p v-if="book.metadata?.author" class="book-author">
                        by {{ book.metadata.author }}
                    </p>

                    <!-- Metadata list -->
                    <dl class="book-metadata">
                        <template v-if="book.metadata?.publisher">
                            <dt>Publisher</dt>
                            <dd>{{ book.metadata.publisher }}</dd>
                        </template>
                        <template v-if="book.metadata?.language">
                            <dt>Language</dt>
                            <dd>{{ book.metadata.language }}</dd>
                        </template>
                        <template v-if="book.metadata?.pub_date">
                            <dt>Published</dt>
                            <dd>{{ book.metadata.pub_date }}</dd>
                        </template>
                        <template v-if="book.metadata?.page_count">
                            <dt>Pages</dt>
                            <dd>{{ book.metadata.page_count }}</dd>
                        </template>
                        <template v-if="book.metadata?.isbn">
                            <dt>ISBN</dt>
                            <dd>{{ book.metadata.isbn }}</dd>
                        </template>
                    </dl>

                    <!-- Description -->
                    <div v-if="book.metadata?.description" class="book-description">
                        <h3>Description</h3>
                        <p>{{ book.metadata.description }}</p>
                    </div>

                    <!-- Reading progress -->
                    <div v-if="book.progress" class="book-progress">
                        <h3>Reading Progress</h3>
                        <div class="book-progress__bar">
                            <div
                                class="book-progress__fill"
                                :style="{ width: `${book.progress.percent_complete}%` }"
                            />
                        </div>
                        <p class="book-progress__text">
                            {{ book.progress.percent_complete.toFixed(0) }}% complete
                            ({{ book.progress.current_page }} / {{ book.progress.total_pages }} pages)
                        </p>
                    </div>

                    <!-- Action buttons -->
                    <div class="book-actions">
                        <Button variant="solid" @click="goToReader">
                            <Icon name="film" />
                            {{ book.progress?.current_page && book.progress.current_page > 1
                                ? 'Continue Reading'
                                : 'Start Reading' }}
                        </Button>
                        <Button variant="outline" @click="downloadBook">
                            <Icon name="arrow-down" />
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.book-detail-page {
    padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
    max-width: 1000px;
    margin: 0 auto;
}

/* Back button */
.book-detail-page__back {
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
.book-detail-page__back:hover {
    background: var(--surface-2, #27272a);
    border-color: var(--accent, #f5a524);
    color: var(--text, #e4e4e7);
}

/* Loading */
.book-detail-loading {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-8, 32px);
}
.book-detail-loading__cover {
    aspect-ratio: 2 / 3;
    width: 200px;
    border-radius: var(--radius-lg, 12px);
}
.book-detail-loading__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
}
.book-detail-loading__title {
    height: 2.5rem;
    width: 60%;
    border-radius: var(--radius-md, 8px);
}
.book-detail-loading__author {
    height: 1.25rem;
    width: 30%;
    border-radius: var(--radius-md, 8px);
}
.book-detail-loading__meta {
    height: 1rem;
    width: 80%;
    border-radius: var(--radius-sm, 6px);
}
.book-detail-loading__desc {
    height: 1rem;
    width: 100%;
    border-radius: var(--radius-sm, 6px);
}

/* Error */
.book-detail-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4, 16px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.book-detail-page__error-icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
}

/* Detail layout */
.book-detail__container {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-8, 32px);
}

@media (max-width: 640px) {
    .book-detail__container {
        grid-template-columns: 1fr;
    }
}

/* Cover */
.book-cover-large {
    width: 200px;
    border-radius: var(--radius-lg, 12px);
    overflow: hidden;
    background: var(--surface-2, #27272a);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
.book-cover-large__img {
    width: 100%;
    height: auto;
    display: block;
}
.book-cover-large__placeholder {
    aspect-ratio: 2 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-3, #3f3f46);
}
.book-cover-large__placeholder-icon {
    width: 48px;
    height: 48px;
    opacity: 0.5;
}

/* Info */
.book-detail__info-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-4, 16px);
}
.book-title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-3xl, 1.875rem);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text, #e4e4e7);
    margin: 0;
}
.book-author {
    font-size: var(--text-lg, 1.125rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}

/* Metadata */
.book-metadata {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-2, 8px) var(--space-4, 16px);
    margin: 0;
}
.book-metadata dt {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
}
.book-metadata dd {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text, #e4e4e7);
    margin: 0;
}

/* Description */
.book-description {
    margin-top: var(--space-4, 16px);
}
.book-description h3 {
    font-size: var(--text-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-2, 8px);
}
.book-description p {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    line-height: 1.6;
    margin: 0;
}

/* Progress */
.book-progress {
    margin-top: var(--space-4, 16px);
}
.book-progress h3 {
    font-size: var(--text-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-2, 8px);
}
.book-progress__bar {
    height: 8px;
    border-radius: 4px;
    background: var(--surface-3, #3f3f46);
    overflow: hidden;
}
.book-progress__fill {
    height: 100%;
    border-radius: 4px;
    background: var(--accent, #f5a524);
    transition: width var(--dur-normal, 0.3s) var(--ease-out, ease);
}
.book-progress__text {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: var(--space-2, 8px) 0 0;
}

/* Actions */
.book-actions {
    display: flex;
    gap: var(--space-3, 12px);
    margin-top: var(--space-6, 24px);
    flex-wrap: wrap;
}
</style>
