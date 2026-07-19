<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * BookReaderPage — minimal book reader page.
 *
 * Loaded via `/app/books/:id/read` (Vue router), which is reached either from
 * the book detail page or by redirecting the legacy server-rendered
 * `/books/{id}/read` route to the SPA.
 *
 * Data: `GET /api/v1/books/{id}/read` via {@link ApiClient}.
 *
 * NOTE: This is a basic reader stub. Full EPUB rendering with paginated text
 * flow requires browser-based EPUB.js or similar libraries and is planned
 * for a future release. The current implementation shows book metadata
 * and basic reading progress tracking.
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMessages } from '../composables/useMessages';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import type { BookDetail, BookChapter, BookProgress } from '../types/book';
import Icon from '../components/Icon.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import { usePageTitle } from '../composables/usePageTitle';

const { t } = useMessages();
const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();

const currentId = computed(() => String(route.params.id ?? ''));

usePageTitle(() => book.value?.name);

const book = ref<BookDetail | null>(null);
const chapters = ref<BookChapter[]>([]);
const currentPage = ref(1);
const totalPages = ref(0);
const progress = ref<BookProgress | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const theme = ref<'light' | 'sepia' | 'dark'>('light');

// Font size control
const fontSize = ref(16);

let saveProgressTimeout: ReturnType<typeof setTimeout> | null = null;

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
        const res = await getClient().get<{
            book: BookDetail;
            chapters: BookChapter[];
            current_page: number;
            total_pages: number;
            progress: BookProgress | null;
        }>(`/api/v1/books/${currentId.value}/read`);

        book.value = res.book ?? null;
        chapters.value = res.chapters ?? [];
        currentPage.value = res.current_page ?? 1;
        totalPages.value = res.total_pages ?? 0;
        progress.value = res.progress ?? null;

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

onBeforeUnmount(() => {
    if (saveProgressTimeout) {
        clearTimeout(saveProgressTimeout);
    }
    // Save progress on unmount if there are pending changes
    if (book.value && currentPage.value > 1) {
        void saveProgress(true);
    }
});

async function saveProgress(immediate = false): Promise<void> {
    if (!book.value || !progress.value) return;

    const payload = {
        position_ms: progress.value.position_ms + (currentPage.value - 1) * 60000,
        current_page: currentPage.value,
        total_pages: totalPages.value,
        percent_complete: totalPages.value > 0
            ? (currentPage.value / totalPages.value) * 100
            : 0,
    };

    if (!immediate && saveProgressTimeout) {
        clearTimeout(saveProgressTimeout);
    }

    const doSave = async () => {
        try {
            await getClient().post(`/api/v1/books/${book.value!.id}/progress`, payload);
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

function goToPreviousPage(): void {
    if (currentPage.value > 1) {
        currentPage.value--;
        void saveProgress();
    }
}

function goToNextPage(): void {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        void saveProgress();
    }
}

function setTheme(newTheme: 'light' | 'sepia' | 'dark'): void {
    theme.value = newTheme;
}

function increaseFontSize(): void {
    if (fontSize.value < 24) {
        fontSize.value += 2;
    }
}

function decreaseFontSize(): void {
    if (fontSize.value > 12) {
        fontSize.value -= 2;
    }
}

function goBack(): void {
    if (book.value) {
        void router.push({ name: 'book-detail', params: { id: book.value.id } });
    } else {
        void router.push({ name: 'books' });
    }
}

const currentChapter = computed(() => {
    if (chapters.value.length === 0) return null;
    const idx = Math.min(currentPage.value - 1, chapters.value.length - 1);
    return chapters.value[idx] ?? null;
});
</script>

<template>
    <div class="reader-page" :class="`reader-page--theme-${theme}`">
        <!-- Toolbar -->
        <header class="reader-toolbar">
            <button type="button" class="reader-toolbar__back" @click="goBack">
                <Icon name="arrow-left" />
                <span>Back to Book</span>
            </button>
            <div class="reader-toolbar__title">
                {{ book?.name ?? '' }}
            </div>
            <div class="reader-toolbar__controls">
                <button
                    type="button"
                    class="reader-btn"
                    title="Decrease font size"
                    @click="decreaseFontSize"
                >
                    A-
                </button>
                <button
                    type="button"
                    class="reader-btn"
                    title="Increase font size"
                    @click="increaseFontSize"
                >
                    A+
                </button>
                <button
                    type="button"
                    class="reader-btn reader-btn--theme"
                    :class="{ 'reader-btn--active': theme === 'light' }"
                    title="Light mode"
                    @click="setTheme('light')"
                >
                    ☀
                </button>
                <button
                    type="button"
                    class="reader-btn reader-btn--theme"
                    :class="{ 'reader-btn--active': theme === 'sepia' }"
                    title="Sepia mode"
                    @click="setTheme('sepia')"
                >
                    📜
                </button>
                <button
                    type="button"
                    class="reader-btn reader-btn--theme"
                    :class="{ 'reader-btn--active': theme === 'dark' }"
                    title="Dark mode"
                    @click="setTheme('dark')"
                >
                    🌙
                </button>
            </div>
        </header>

        <!-- Loading -->
        <div v-if="loading" class="reader-loading">
            <Skeleton class="reader-loading__content" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="reader-error" role="alert">
            <Icon name="alert-circle" class="reader-error__icon" />
            <p>{{ error }}</p>
            <Button variant="outline" @click="loadBook">
                {{ t('common.retry') ?? 'Retry' }}
            </Button>
        </div>

        <!-- Content -->
        <div v-else-if="book" class="reader-content">
            <div class="reader-page-content" :style="{ fontSize: `${fontSize}px` }">
                <!-- Current chapter info -->
                <div v-if="currentChapter" class="reader-chapter-info">
                    <span class="reader-chapter-label">{{ currentChapter.title }}</span>
                </div>

                <!-- About this Book -->
                <h2>About this Book</h2>
                <p v-if="book.metadata?.description" class="reader-description">
                    {{ book.metadata.description }}
                </p>

                <!-- Book info -->
                <h3>Book Information</h3>
                <dl class="reader-book-info">
                    <dt>Title</dt>
                    <dd>{{ book.name }}</dd>

                    <template v-if="book.metadata?.author">
                        <dt>Author</dt>
                        <dd>{{ book.metadata.author }}</dd>
                    </template>

                    <template v-if="book.metadata?.publisher">
                        <dt>Publisher</dt>
                        <dd>{{ book.metadata.publisher }}</dd>
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

                <!-- Reader notice -->
                <div class="reader-notice">
                    <p><strong>Reader Notice:</strong> This is a basic reader that displays book metadata. Full paginated EPUB rendering with text flow is planned for a future release.</p>
                    <p>You can download the book to read it in your preferred reader application.</p>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <footer class="reader-pagination">
            <Button
                variant="outline"
                :disabled="currentPage <= 1"
                @click="goToPreviousPage"
            >
                Previous
            </Button>
            <span class="reader-pagination__indicator">
                Page {{ currentPage }}
                <template v-if="totalPages > 0"> / {{ totalPages }}</template>
            </span>
            <Button
                variant="outline"
                :disabled="currentPage >= totalPages"
                @click="goToNextPage"
            >
                Next
            </Button>
        </footer>
    </div>
</template>

<style scoped>
.reader-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: background var(--dur-normal, 0.3s) var(--ease-out, ease),
                color var(--dur-normal, 0.3s) var(--ease-out, ease);
}

/* Themes */
.reader-page--theme-light {
    --reader-bg: #faf8f5;
    --reader-text: #333;
    --reader-surface: #fff;
    --reader-border: #e5e0d8;
    --reader-muted: #666;
}
.reader-page--theme-sepia {
    --reader-bg: #f4ecd8;
    --reader-text: #5b4636;
    --reader-surface: #f9f1e1;
    --reader-border: #d9cdb8;
    --reader-muted: #7a6652;
}
.reader-page--theme-dark {
    --reader-bg: #1a1a1a;
    --reader-text: #e4e4e7;
    --reader-surface: #27272a;
    --reader-border: #3f3f46;
    --reader-muted: #a1a1aa;
}

/* Toolbar */
.reader-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    background: var(--reader-surface);
    border-bottom: 1px solid var(--reader-border);
    gap: var(--space-4, 16px);
}
.reader-toolbar__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border-radius: var(--radius-md, 8px);
    background: transparent;
    border: 1px solid var(--reader-border);
    color: var(--reader-muted);
    font-size: var(--text-sm, 0.875rem);
    cursor: pointer;
    transition: background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.reader-toolbar__back:hover {
    background: var(--reader-border);
}
.reader-toolbar__title {
    flex: 1;
    text-align: center;
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    color: var(--reader-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.reader-toolbar__controls {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
}

.reader-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md, 8px);
    background: transparent;
    border: 1px solid var(--reader-border);
    color: var(--reader-muted);
    font-size: var(--text-xs, 0.75rem);
    cursor: pointer;
    transition: background var(--dur-fast, 0.18s) var(--ease-out, ease),
                border-color var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.reader-btn:hover {
    background: var(--reader-border);
}
.reader-btn--theme {
    font-size: var(--text-sm, 0.875rem);
}
.reader-btn--active {
    background: var(--reader-border);
    border-color: var(--accent, #f5a524);
    color: var(--accent, #f5a524);
}

/* Loading */
.reader-loading {
    flex: 1;
    padding: var(--space-8, 32px);
}
.reader-loading__content {
    max-width: 600px;
    margin: 0 auto;
    height: 300px;
    border-radius: var(--radius-lg, 12px);
}

/* Error */
.reader-error {
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
.reader-error__icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
}

/* Content */
.reader-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-8, 32px) var(--space-4, 16px);
}
.reader-page-content {
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.8;
    color: var(--reader-text);
}

.reader-chapter-info {
    margin-bottom: var(--space-6, 24px);
    padding-bottom: var(--space-4, 16px);
    border-bottom: 1px solid var(--reader-border);
}
.reader-chapter-label {
    font-size: 0.85em;
    font-weight: var(--fw-medium, 500);
    color: var(--reader-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.reader-page-content h2 {
    font-family: var(--font-display, inherit);
    font-size: 1.5em;
    font-weight: var(--fw-semibold, 600);
    margin: 0 0 var(--space-4, 16px);
}
.reader-page-content h3 {
    font-size: 1.2em;
    font-weight: var(--fw-semibold, 600);
    margin: var(--space-6, 24px) 0 var(--space-3, 12px);
}
.reader-description {
    margin: 0 0 var(--space-4, 16px);
}
.reader-book-info {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-2, 8px) var(--space-4, 16px);
    margin: 0;
}
.reader-book-info dt {
    font-size: 0.9em;
    color: var(--reader-muted);
}
.reader-book-info dd {
    font-size: 0.9em;
    margin: 0;
}

.reader-notice {
    margin-top: var(--space-8, 32px);
    padding: var(--space-4, 16px);
    border-radius: var(--radius-md, 8px);
    background: var(--reader-surface);
    border: 1px solid var(--reader-border);
    font-size: 0.9em;
    color: var(--reader-muted);
}
.reader-notice p {
    margin: 0 0 var(--space-2, 8px);
}
.reader-notice p:last-child {
    margin-bottom: 0;
}

/* Pagination */
.reader-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4, 16px);
    padding: var(--space-4, 16px);
    background: var(--reader-surface);
    border-top: 1px solid var(--reader-border);
}
.reader-pagination__indicator {
    font-size: var(--text-sm, 0.875rem);
    color: var(--reader-muted);
    min-width: 100px;
    text-align: center;
}
</style>
