<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMediaStore, type SortField } from '../stores/useMediaStore';

const store = useMediaStore();

const searchInput = ref(store.search);

const sortOptions: { value: SortField; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'year', label: 'Year' },
    { value: 'rating', label: 'Rating' },
    { value: 'date_added', label: 'Date Added' },
    { value: 'runtime', label: 'Runtime' },
];

function onSearchChange() {
    store.setSearch(searchInput.value);
}

function toggleGenre(genre: string) {
    const current = store.selectedGenres;
    if (current.includes(genre)) {
        store.setGenres(current.filter(g => g !== genre));
    } else {
        store.setGenres([...current, genre]);
    }
}

function toggleRating(rating: string) {
    const current = store.selectedRatings;
    if (current.includes(rating)) {
        store.setRatings(current.filter(r => r !== rating));
    } else {
        store.setRatings([...current, rating]);
    }
}

function toggleType(type: string) {
    const current = store.selectedTypes;
    if (current.includes(type as any)) {
        store.setTypes(current.filter(t => t !== type));
    } else {
        store.setTypes([...current, type as any]);
    }
}

function onSortChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    store.setSort(target.value as SortField);
}

function onOrderChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    store.order = target.value as 'asc' | 'desc';
}

const currentYear = new Date().getFullYear();
const yearOptions = computed(() => {
    const years: number[] = [];
    for (let y = currentYear; y >= 1900; y--) {
        years.push(y);
    }
    return years;
});

function clearFilters() {
    searchInput.value = '';
    store.search = '';
    store.setGenres([]);
    store.setYearRange(undefined, undefined);
    store.setRatings([]);
    store.setTypes([]);
    store.setSort('name');
}
</script>

<template>
    <div class="filter-bar">
        <div class="filter-search">
            <input
                v-model="searchInput"
                type="search"
                placeholder="Search media..."
                class="search-input"
                @input="onSearchChange"
            />
        </div>

        <div class="filter-row">
            <div class="filter-group">
                <label class="filter-label">Sort</label>
                <select class="filter-select" :value="store.sort" @change="onSortChange">
                    <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                    </option>
                </select>
                <select class="filter-select order-select" :value="store.order" @change="onOrderChange">
                    <option value="asc">↑</option>
                    <option value="desc">↓</option>
                </select>
            </div>

            <div class="filter-group">
                <label class="filter-label">Year</label>
                <select
                    class="filter-select"
                    :value="store.yearFrom ?? ''"
                    @change="(e) => store.setYearRange(
                        (e.target as HTMLSelectElement).value ? Number((e.target as HTMLSelectElement).value) : undefined,
                        store.yearTo
                    )"
                >
                    <option value="">From</option>
                    <option v-for="y in yearOptions.slice(0, 50)" :key="y" :value="y">{{ y }}</option>
                </select>
                <select
                    class="filter-select"
                    :value="store.yearTo ?? ''"
                    @change="(e) => store.setYearRange(
                        store.yearFrom,
                        (e.target as HTMLSelectElement).value ? Number((e.target as HTMLSelectElement).value) : undefined
                    )"
                >
                    <option value="">To</option>
                    <option v-for="y in yearOptions.slice(0, 50)" :key="y" :value="y">{{ y }}</option>
                </select>
            </div>
        </div>

        <div class="filter-section">
            <span class="filter-label">Genres</span>
            <div class="filter-chips">
                <button
                    v-for="genre in store.availableGenres"
                    :key="genre"
                    class="chip"
                    :class="{ active: store.selectedGenres.includes(genre) }"
                    @click="toggleGenre(genre)"
                >
                    {{ genre }}
                </button>
            </div>
        </div>

        <div class="filter-section">
            <span class="filter-label">Rating</span>
            <div class="filter-chips">
                <button
                    v-for="rating in store.availableRatings"
                    :key="rating"
                    class="chip"
                    :class="{ active: store.selectedRatings.includes(rating) }"
                    @click="toggleRating(rating)"
                >
                    {{ rating }}
                </button>
            </div>
        </div>

        <div class="filter-section">
            <span class="filter-label">Type</span>
            <div class="filter-chips">
                <button
                    v-for="type in store.availableTypes"
                    :key="type"
                    class="chip"
                    :class="{ active: store.selectedTypes.includes(type) }"
                    @click="toggleType(type)"
                >
                    {{ type }}
                </button>
            </div>
        </div>

        <div class="filter-actions">
            <button class="clear-btn" @click="clearFilters">Clear filters</button>
            <span class="result-count">{{ store.total }} result{{ store.total !== 1 ? 's' : '' }}</span>
        </div>
    </div>
</template>

<style scoped>
.filter-bar {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    background: var(--color-surface, #141420);
    border-radius: var(--radius-lg, 12px);
    margin-bottom: 20px;
}

.filter-search {
    width: 100%;
}

.search-input {
    width: 100%;
    padding: 10px 14px;
    border-radius: var(--radius-md, 8px);
    border: 1px solid var(--color-border, #27272a);
    background: var(--color-bg, #0a0a0f);
    color: var(--color-text, #e4e4e7);
    font-size: 0.9rem;
}

.search-input::placeholder {
    color: var(--color-text-muted, #a1a1aa);
}

.filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.filter-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-muted, #a1a1aa);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    min-width: 50px;
}

.filter-select {
    padding: 6px 8px;
    border-radius: var(--radius-sm, 6px);
    border: 1px solid var(--color-border, #27272a);
    background: var(--color-bg, #0a0a0f);
    color: var(--color-text, #e4e4e7);
    font-size: 0.8rem;
    cursor: pointer;
}

.order-select {
    width: 48px;
    text-align: center;
    padding: 6px 4px;
}

.filter-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.chip {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid var(--color-border, #27272a);
    background: transparent;
    color: var(--color-text-muted, #a1a1aa);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.15s ease;
}

.chip:hover {
    border-color: var(--color-primary, #6366f1);
    color: var(--color-text, #e4e4e7);
}

.chip.active {
    background: var(--color-primary, #6366f1);
    border-color: var(--color-primary, #6366f1);
    color: #fff;
}

.filter-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid var(--color-border-subtle, #1f1f23);
}

.clear-btn {
    font-size: 0.8rem;
    color: var(--color-text-muted, #a1a1aa);
    cursor: pointer;
    text-decoration: underline;
    background: none;
    border: none;
    padding: 0;
}

.clear-btn:hover {
    color: var(--color-text, #e4e4e7);
}

.result-count {
    font-size: 0.8rem;
    color: var(--color-text-muted, #a1a1aa);
}
</style>
