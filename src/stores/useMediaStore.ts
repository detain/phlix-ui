import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { MediaItem, MediaType } from '../types/media-item';
import type { LibraryQueryParams } from '../types/library-query';
import { ApiClient } from '../api/client';

export type SortField = 'name' | 'year' | 'rating' | 'date_added' | 'runtime';
export type SortOrder = 'asc' | 'desc';

interface MediaResponse {
    items: MediaItem[];
    total: number;
    limit: number;
    offset: number;
}

export const useMediaStore = defineStore('media', () => {
    const items = ref<MediaItem[]>([]);
    const total = ref(0);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const search = ref('');
    const selectedGenres = ref<string[]>([]);
    const yearFrom = ref<number | undefined>(undefined);
    const yearTo = ref<number | undefined>(undefined);
    const selectedRatings = ref<string[]>([]);
    const selectedTypes = ref<MediaType[]>([]);
    const sort = ref<SortField>('name');
    const order = ref<SortOrder>('asc');
    const limit = ref(24);
    const offset = ref(0);

    const hasMore = computed(() => offset.value + items.value.length < total.value);

    const queryParams = computed<LibraryQueryParams>(() => {
        const p: LibraryQueryParams = {};
        if (search.value) p.search = search.value;
        if (selectedGenres.value.length) p.genres = selectedGenres.value;
        if (yearFrom.value !== undefined) p.yearFrom = yearFrom.value;
        if (yearTo.value !== undefined) p.yearTo = yearTo.value;
        if (selectedRatings.value.length) p.ratings = selectedRatings.value;
        if (selectedTypes.value.length) p.types = selectedTypes.value;
        p.sort = sort.value;
        p.order = order.value;
        p.limit = limit.value;
        p.offset = offset.value;
        return p;
    });

    const availableGenres = computed(() => {
        const genres = new Set<string>();
        items.value.forEach(item => item.genres?.forEach(g => genres.add(g)));
        return Array.from(genres).sort();
    });

    const availableRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'X', 'UNRATED'];

    const availableTypes: MediaType[] = ['movie', 'series', 'episode', 'audio', 'image'];

    function buildApiQuery(apiBase: string): string {
        const params = new URLSearchParams();
        const q = queryParams.value;
        if (q.search) params.set('search', q.search);
        q.genres?.forEach(g => params.append('genres', g));
        if (q.yearFrom !== undefined) params.set('yearFrom', String(q.yearFrom));
        if (q.yearTo !== undefined) params.set('yearTo', String(q.yearTo));
        q.ratings?.forEach(r => params.append('ratings', r));
        q.types?.forEach(t => params.append('types', t));
        if (q.sort) params.set('sort', q.sort);
        if (q.order) params.set('order', q.order);
        params.set('limit', String(q.limit));
        params.set('offset', String(q.offset));
        return `${apiBase}/api/v1/media?${params.toString()}`;
    }

    async function fetchMedia(apiBase: string, append = false): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            const client = new ApiClient({ baseUrl: apiBase });
            const url = buildApiQuery(apiBase);
            const response = await client.get<MediaResponse>(url);

            if (append) {
                items.value = [...items.value, ...response.items];
            } else {
                items.value = response.items;
            }
            total.value = response.total;
            offset.value = (response.offset ?? 0) + response.items.length;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Failed to load media';
        } finally {
            loading.value = false;
        }
    }

    async function loadMore(apiBase: string): Promise<void> {
        await fetchMedia(apiBase, true);
    }

    function reset(): void {
        items.value = [];
        total.value = 0;
        offset.value = 0;
        error.value = null;
    }

    function setSearch(v: string): void {
        search.value = v;
        offset.value = 0;
    }

    function setGenres(v: string[]): void {
        selectedGenres.value = v;
        offset.value = 0;
    }

    function setYearRange(from: number | undefined, to: number | undefined): void {
        yearFrom.value = from;
        yearTo.value = to;
        offset.value = 0;
    }

    function setRatings(v: string[]): void {
        selectedRatings.value = v;
        offset.value = 0;
    }

    function setTypes(v: MediaType[]): void {
        selectedTypes.value = v;
        offset.value = 0;
    }

    function setSort(field: SortField, ord?: SortOrder): void {
        sort.value = field;
        if (ord) order.value = ord;
        offset.value = 0;
    }

    return {
        items,
        total,
        loading,
        error,
        search,
        selectedGenres,
        yearFrom,
        yearTo,
        selectedRatings,
        selectedTypes,
        sort,
        order,
        limit,
        offset,
        hasMore,
        queryParams,
        availableGenres,
        availableRatings,
        availableTypes,
        fetchMedia,
        loadMore,
        reset,
        setSearch,
        setGenres,
        setYearRange,
        setRatings,
        setTypes,
        setSort,
    };
});
