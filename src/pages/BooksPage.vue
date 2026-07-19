<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
  -->

<script setup lang="ts">
/**
 * BooksPage — books library grid listing.
 *
 * Loaded via `/app/books` (Vue router), which is reached either from the
 * navigation or by redirecting the legacy server-rendered `/books` route to the SPA.
 *
 * Data: `GET /api/v1/books` via {@link ApiClient}.
 */
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import type { BookListItem } from '../types/book';
import Icon from '../components/Icon.vue';

const router = useRouter();
const apiBase = useMediaApiBase();

// --- data ---
const books = ref<BookListItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: apiBase.value });
}

async function loadBooks(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
        const res = await getClient().get<{ books: BookListItem[] }>('/api/v1/books');
        books.value = res.books ?? [];
    } catch {
        error.value = 'Could not load books';
        books.value = [];
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    void loadBooks();
});

function goToBook(book: BookListItem): void {
    void router.push({ name: 'book-detail', params: { id: book.id } });
}
</script>

<template>
    <div class="books-page">
        <!-- Page header -->
        <header class="books-page__header">
            <h1 class="books-page__title">Books</h1>
            <p class="books-page__description">Your book library</p>
        </header>

        <!-- Loading skeleton -->
        <div v-if="loading" class="books-page__loading" role="status" aria-busy="true">
            <div v-for="n in 12" :key="n" class="book-skel">
                <div class="book-skel__cover" />
                <div class="book-skel__title" />
                <div class="book-skel__author" />
            </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="books-page__error" role="alert">
            <Icon name="alert-circle" class="books-page__error-icon" />
            <p>{{ error }}</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="books.length === 0" class="books-page__empty" role="status">
            <Icon name="bookmark" class="books-page__empty-icon" />
            <p>No books found in your library.</p>
            <p class="books-page__empty-hint">
                Add a book library to start browsing your collection.
            </p>
        </div>

        <!-- Books grid -->
        <div v-else class="books-page__grid">
            <button
                v-for="book in books"
                :key="book.id"
                type="button"
                class="book-card"
                @click="goToBook(book)"
            >
                <div class="book-card__cover">
                    <img
                        v-if="book.cover_url"
                        :src="book.cover_url"
                        :alt="book.name"
                        class="book-card__img"
                        loading="lazy"
                    >
                    <div v-else class="book-card__placeholder">
                        <Icon name="bookmark" class="book-card__placeholder-icon" />
                    </div>
                </div>
                <div class="book-card__info">
                    <h3 class="book-card__title">{{ book.name }}</h3>
                    <span v-if="book.metadata?.author" class="book-card__author">
                        {{ book.metadata.author }}
                    </span>
                    <span v-if="book.metadata?.page_count" class="book-card__pages">
                        {{ book.metadata.page_count }} pages
                    </span>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.books-page {
    padding: var(--space-6, 24px) var(--space-4, 16px) var(--space-16, 64px);
    max-width: 1200px;
    margin: 0 auto;
}

/* Header */
.books-page__header {
    margin-bottom: var(--space-8, 32px);
}
.books-page__title {
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-3xl, 1.875rem);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text, #e4e4e7);
    margin: 0 0 var(--space-2, 8px);
}
.books-page__description {
    font-size: var(--text-sm, 0.875rem);
    color: var(--text-muted, #a1a1aa);
    margin: 0;
}

/* Grid */
.books-page__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5, 20px);
}

/* Book card */
.book-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 12px);
    background: var(--surface-2, #27272a);
    border: 1px solid var(--border, #3f3f46);
    cursor: pointer;
    text-align: left;
    transition: transform var(--dur-fast, 0.18s) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
                border-color var(--dur-fast, 0.18s) var(--ease-out, ease),
                background var(--dur-fast, 0.18s) var(--ease-out, ease);
}
.book-card:hover {
    transform: scale(1.03);
    border-color: var(--accent, #f5a524);
    background: var(--surface-3, #3f3f46);
}
.book-card:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-ring, rgba(245, 165, 36, 0.4));
}
.book-card__cover {
    aspect-ratio: 2 / 3;
    border-radius: var(--radius-md, 8px);
    overflow: hidden;
    background: var(--surface-3, #3f3f46);
}
.book-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.book-card__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-3, #3f3f46);
}
.book-card__placeholder-icon {
    width: 40px;
    height: 40px;
    opacity: 0.5;
}
.book-card__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 4px);
}
.book-card__title {
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    color: var(--text, #e4e4e7);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.book-card__author {
    font-size: var(--text-xs, 0.75rem);
    color: var(--text-muted, #a1a1aa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.book-card__pages {
    font-size: var(--text-xs, 0.75rem);
    color: var(--text-muted, #a1a1aa);
}

/* Loading skeleton */
.books-page__loading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5, 20px);
}
.book-skel {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 12px);
    background: var(--surface-2, #27272a);
    border: 1px solid var(--border, #3f3f46);
}
.book-skel__cover {
    aspect-ratio: 2 / 3;
    border-radius: var(--radius-md, 8px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.book-skel__title {
    height: 0.85em;
    width: 75%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}
.book-skel__author {
    height: 0.7em;
    width: 50%;
    border-radius: var(--radius-sm, 6px);
    background: linear-gradient(90deg, var(--surface-2, #27272a) 25%, var(--surface-3, #3f3f46) 37%, var(--surface-2, #27272a) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
}

/* Error state */
.books-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--danger, #f87171);
    text-align: center;
}
.books-page__error-icon {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    margin-bottom: var(--space-2, 8px);
}

/* Empty state */
.books-page__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-16, 64px) var(--space-4, 16px);
    color: var(--text-muted, #a1a1aa);
    text-align: center;
}
.books-page__empty-icon {
    width: 40px;
    height: 40px;
    opacity: 0.5;
    margin-bottom: var(--space-2, 8px);
}
.books-page__empty-hint {
    font-size: var(--text-sm, 0.875rem);
}

@keyframes shimmer {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
    .book-skel__cover,
    .book-skel__title,
    .book-skel__author {
        animation: none;
    }
}
</style>
