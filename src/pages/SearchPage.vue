<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SearchPage (`/app/search`) — full search surface replacing the legacy Smarty
 * `/search` page (D-SRV-1). Renders a search input (auto-focused, pre-filled from
 * `?q=` URL param on mount), a virtualized results grid, loading skeleton on
 * initial search, and an empty state when no results are found.
 */
import { onMounted, watch, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaApiBase } from '../composables/useApiBase';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import MediaGrid from '../components/MediaGrid.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Button from '../components/ui/Button.vue';
import Spinner from '../components/ui/Spinner.vue';
import { ApiClient } from '../api/client';
import type { MediaItem } from '../types/media-item';

const route = useRoute();
const router = useRouter();
const apiBase = useMediaApiBase();
const userItemData = useUserItemDataStore();

// --- search state -------------------------------------------------------
const query = ref<string>('');
const items = ref<MediaItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const hasSearched = ref(false);

// Debounce timer so we don't hammer the API on every keystroke
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSearch(): void {
    if (debounceTimer !== null) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        // Update the URL with the new query without full navigation
        if (query.value.trim() === '') {
            router.replace({ query: {} });
        } else {
            router.replace({ query: { q: query.value.trim() } });
        }
        void doSearch();
    }, 300);
}

async function doSearch(): Promise<void> {
    const q = query.value.trim();

    // Reset when query is cleared
    if (q === '') {
        items.value = [];
        hasSearched.value = false;
        error.value = null;
        return;
    }

    hasSearched.value = true;
    loading.value = true;
    error.value = null;

    try {
        const client = new ApiClient({ baseUrl: apiBase.value });
        const result = await client.get<{ items: MediaItem[]; query: string; total: number }>(
            '/api/v1/media/search',
            { q },
        );
        items.value = result.items ?? [];
        // Hydrate user item data so cards show favorite/watched state
        items.value.forEach((item) => userItemData.hydrate(item));
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Search failed';
        items.value = [];
    } finally {
        loading.value = false;
    }
}

// Auto-focus the input on mount
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
    // Pre-fill query from ?q= URL param
    const q = (route.query.q as string | undefined) ?? '';
    query.value = q;
    inputRef.value?.focus();
    if (q.trim() !== '') {
        void doSearch();
    }
});

// Re-run search when URL query changes (e.g. browser back/forward)
watch(
    () => route.query.q,
    (newQ) => {
        const q = (newQ as string | undefined) ?? '';
        if (q !== query.value) {
            query.value = q;
            if (q.trim() !== '') {
                void doSearch();
            } else {
                items.value = [];
                hasSearched.value = false;
            }
        }
    },
);

// Track if we should show the empty "no results" state vs. the prompt to search
const showNoResults = computed(
    () => hasSearched.value && !loading.value && items.value.length === 0 && error.value === null,
);
const showResults = computed(
    () => hasSearched.value && !loading.value && items.value.length > 0,
);
const showPrompt = computed(() => !hasSearched.value && query.value.trim() === '');
const showError = computed(() => hasSearched.value && error.value !== null);
</script>

<template>
    <div class="search-page">
        <header class="search-header">
            <h1 class="search-title">Search</h1>
            <form
                class="search-form"
                @submit.prevent="scheduleSearch"
            >
                <input
                    ref="inputRef"
                    v-model="query"
                    type="search"
                    name="q"
                    placeholder="Search movies, shows, music, books..."
                    class="search-input"
                    autocomplete="off"
                    autofocus
                    @input="scheduleSearch"
                >
                <Button type="submit" variant="solid">
                    Search
                </Button>
            </form>
        </header>

        <!-- Loading skeleton -->
        <div v-if="loading" class="search-loading">
            <Spinner label="Searching…" />
        </div>

        <!-- Error state -->
        <EmptyState
            v-else-if="showError"
            icon="alert"
            title="Search failed"
            :description="error ?? undefined"
        >
            <template #actions>
                <Button variant="solid" size="sm" @click="doSearch">Retry</Button>
            </template>
        </EmptyState>

        <!-- No query yet — prompt the user -->
        <EmptyState
            v-else-if="showPrompt"
            icon="search"
            title="Search your library"
            description="Enter a query above to find movies, shows, music, books, and more."
        />

        <!-- No results found -->
        <EmptyState
            v-else-if="showNoResults"
            icon="film"
            :title="`No results for &quot;${query}&quot;`"
            description="Try a different spelling or fewer words."
        />

        <!-- Results grid -->
        <MediaGrid
            v-else-if="showResults"
            :items="items"
            :total="items.length"
        />
    </div>
</template>

<style scoped>
.search-page {
    padding: var(--space-6);
    max-width: var(--content-max-width, 1400px);
    margin: 0 auto;
}

.search-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
}

.search-title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text);
    margin: 0;
}

.search-form {
    display: flex;
    gap: var(--space-3);
    align-items: center;
}

.search-input {
    flex: 1;
    height: 2.75rem;
    padding: 0 var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-1);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
}

.search-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-alpha);
}

.search-input::placeholder {
    color: var(--text-muted);
}

/* Hide the native search clear button */
.search-input::-webkit-search-cancel-button {
    -webkit-appearance: none;
}

.search-loading {
    display: flex;
    justify-content: center;
    padding: var(--space-12) 0;
}
</style>
