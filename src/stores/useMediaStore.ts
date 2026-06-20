import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { MediaItem, MediaType } from '../types/media-item';
import type { LibraryQueryParams } from '../types/library-query';
import { ApiClient } from '../api/client';
import { errMessage } from '../api/errors';

export type SortField = 'name' | 'year' | 'rating' | 'date_added' | 'runtime';
export type SortOrder = 'asc' | 'desc';

interface MediaResponse {
    items: MediaItem[];
    total: number;
    limit: number;
    offset: number;
}

interface CacheEntry {
    items: MediaItem[];
    total: number;
    ts: number;
}

/** Cache TTL (ms). A query re-issued within this window is served from memory. */
const CACHE_TTL = 60_000;
/** Debounce for search-driven refetch (ms). */
const SEARCH_DEBOUNCE = 250;

function isAbort(e: unknown): boolean {
    return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

/**
 * useMediaStore (rewritten R1.2) — same public API as 0.7.0 plus:
 *   · query-keyed in-memory cache (TTL) — instant back/forward + revisited pages
 *   · in-flight dedupe + AbortController (superseded filter queries are cancelled)
 *   · debounced search refetch (scheduleFetch)
 *   · prefetch(params) to warm the cache (hover / next page)
 *   · URL-sync helpers (toQuery / applyQuery) — wire with bindMediaStoreToRouter
 */
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
    const matchStatus = ref<'' | 'matched' | 'unmatched'>('');
    const selectedActors = ref<string[]>([]);
    const sort = ref<SortField>('name');
    const order = ref<SortOrder>('asc');
    const limit = ref(24);
    const offset = ref(0);
    // When set, every fetch is scoped to this one library (the dedicated library
    // page). It is identified by the route, NOT the FilterBar, so it is kept out
    // of toQuery()/applyQuery() (the filter URL-sync) and set via setLibraryId().
    const libraryId = ref<string | undefined>(undefined);
    // When true, the grid requests top-level items only (movies + series),
    // hiding seasons/episodes so a series library shows shows rather than a flat
    // dump of every episode. Like libraryId it is a route/page concern (set via
    // setTopLevel), so it's kept out of the FilterBar URL-sync. The server
    // ignores it while a search is active, so search still spans the library.
    const topLevel = ref(false);

    const hasMore = computed(() => items.value.length < total.value);

    const queryParams = computed<LibraryQueryParams>(() => {
        const p: LibraryQueryParams = {};
        if (libraryId.value) p.libraryId = libraryId.value;
        if (topLevel.value) p.topLevel = true;
        if (search.value) p.search = search.value;
        if (selectedGenres.value.length) p.genres = selectedGenres.value;
        if (yearFrom.value !== undefined) p.yearFrom = yearFrom.value;
        if (yearTo.value !== undefined) p.yearTo = yearTo.value;
        if (selectedRatings.value.length) p.ratings = selectedRatings.value;
        if (selectedTypes.value.length) p.types = selectedTypes.value;
        if (matchStatus.value) p.match = matchStatus.value;
        if (selectedActors.value.length) p.actors = selectedActors.value;
        p.sort = sort.value;
        p.order = order.value;
        p.limit = limit.value;
        p.offset = offset.value;
        return p;
    });

    const availableGenres = computed(() => {
        const genres = new Set<string>();
        items.value.forEach((item) => item.genres?.forEach((g) => genres.add(g)));
        return Array.from(genres).sort();
    });
    const availableRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'X', 'UNRATED'];
    const availableTypes: MediaType[] = ['movie', 'series', 'episode', 'audio', 'image'];

    // ---- query (de)serialization --------------------------------------------
    function buildParams(params: LibraryQueryParams): URLSearchParams {
        const sp = new URLSearchParams();
        if (params.libraryId) sp.set('libraryId', params.libraryId);
        if (params.topLevel) sp.set('topLevel', '1');
        if (params.search) sp.set('search', params.search);
        // `key[]=` so PHP parses arrays; bare repeated keys collapse to a string server-side.
        params.genres?.forEach((g) => sp.append('genres[]', g));
        if (params.yearFrom !== undefined) sp.set('yearFrom', String(params.yearFrom));
        if (params.yearTo !== undefined) sp.set('yearTo', String(params.yearTo));
        params.ratings?.forEach((r) => sp.append('ratings[]', r));
        params.types?.forEach((t) => sp.append('types[]', t));
        if (params.sort) sp.set('sort', params.sort);
        if (params.order) sp.set('order', params.order);
        sp.set('limit', String(params.limit));
        sp.set('offset', String(params.offset));
        return sp;
    }
    function buildApiQuery(apiBase: string, params: LibraryQueryParams): string {
        return `${apiBase}/api/v1/media?${buildParams(params).toString()}`;
    }
    function cacheKey(params: LibraryQueryParams): string {
        return buildParams(params).toString();
    }

    // ---- cache + in-flight --------------------------------------------------
    const cache = new Map<string, CacheEntry>();
    const inflight = new Map<string, { promise: Promise<MediaResponse>; controller: AbortController }>();
    let activeKey: string | null = null;
    let activeController: AbortController | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    function fresh(entry: CacheEntry | undefined): entry is CacheEntry {
        return !!entry && Date.now() - entry.ts < CACHE_TTL;
    }

    function networkFetch(apiBase: string, params: LibraryQueryParams, key: string, track: boolean): Promise<MediaResponse> {
        // A tracked fetch always becomes the active query — even when it dedupes
        // onto an in-flight prefetch — so its result is applied + loading clears.
        if (track) {
            if (activeController && key !== activeKey) activeController.abort(); // cancel superseded
            activeKey = key;
        }

        const existing = inflight.get(key);
        if (existing) {
            if (track) activeController = existing.controller;
            return existing.promise;
        }

        const controller = new AbortController();
        if (track) activeController = controller;
        const client = new ApiClient({ baseUrl: apiBase });
        const promise = client
            .get<MediaResponse>(buildApiQuery(apiBase, params), undefined, controller.signal)
            .then((res) => {
                cache.set(key, { items: res.items, total: res.total, ts: Date.now() });
                return res;
            })
            .finally(() => {
                inflight.delete(key);
            });
        inflight.set(key, { promise, controller });
        return promise;
    }

    function applyResult(res: { items: MediaItem[]; total: number }, append: boolean): void {
        items.value = append ? [...items.value, ...res.items] : res.items;
        total.value = res.total;
    }

    async function fetchMedia(apiBase: string, append = false): Promise<void> {
        const params = { ...queryParams.value };
        const key = cacheKey(params);

        // Serve from cache on both the first page and appended pages (e.g. a
        // page warmed by prefetch) without hitting the network.
        const cached = cache.get(key);
        if (fresh(cached)) {
            applyResult(cached, append);
            error.value = null;
            return;
        }

        loading.value = true;
        error.value = null;
        try {
            const res = await networkFetch(apiBase, params, key, !append);
            // drop a superseded result even if its request resolved late un-aborted
            if (!append && key !== activeKey) return;
            applyResult(res, append);
        } catch (e) {
            if (isAbort(e)) return; // superseded — newer request owns the state
            if (append || key === activeKey) error.value = errMessage(e, 'Failed to load media');
        } finally {
            if (append || key === activeKey) loading.value = false;
        }
    }

    /** Debounced refetch (page 0) — for search/filter typing (≤1 call per pause). */
    function scheduleFetch(apiBase: string, delay = SEARCH_DEBOUNCE): void {
        offset.value = 0;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fetchMedia(apiBase, false), delay);
    }

    async function loadMore(apiBase: string): Promise<void> {
        if (loading.value || !hasMore.value) return;
        offset.value = items.value.length;
        await fetchMedia(apiBase, true);
    }

    /** Warm the cache for a param override (next page / hovered filter) without touching visible state. */
    async function prefetch(apiBase: string, overrides: Partial<LibraryQueryParams> = {}): Promise<void> {
        const params = { ...queryParams.value, ...overrides };
        const key = cacheKey(params);
        if (fresh(cache.get(key))) return;
        try {
            await networkFetch(apiBase, params, key, false);
        } catch {
            /* prefetch failures are silent */
        }
    }

    function clearCache(): void {
        cache.clear();
    }

    /** Cancel a pending debounced fetch (call on teardown — see bindMediaStoreToRouter). */
    function cancelScheduled(): void {
        clearTimeout(debounceTimer);
    }

    // ---- URL sync -----------------------------------------------------------
    /** Current filters as a flat query object (paging omitted — it's transient). */
    function toQuery(): Record<string, string | string[]> {
        const q: Record<string, string | string[]> = {};
        if (search.value) q.search = search.value;
        if (selectedGenres.value.length) q.genres = [...selectedGenres.value];
        if (yearFrom.value !== undefined) q.yearFrom = String(yearFrom.value);
        if (yearTo.value !== undefined) q.yearTo = String(yearTo.value);
        if (selectedRatings.value.length) q.ratings = [...selectedRatings.value];
        if (selectedTypes.value.length) q.types = [...selectedTypes.value];
        if (matchStatus.value) q.match = matchStatus.value;
        if (selectedActors.value.length) q.actors = [...selectedActors.value];
        if (sort.value !== 'name') q.sort = sort.value;
        if (order.value !== 'asc') q.order = order.value;
        return q;
    }
    function asArray(v: string | string[] | undefined | null): string[] {
        if (v == null) return [];
        return Array.isArray(v) ? v.filter((x): x is string => x != null) : [v];
    }
    /** Restore filters from a route query object (back/forward, deep links). */
    function applyQuery(q: Record<string, string | string[] | null | undefined>): void {
        search.value = (Array.isArray(q.search) ? q.search[0] : q.search) ?? '';
        selectedGenres.value = asArray(q.genres);
        selectedRatings.value = asArray(q.ratings);
        selectedTypes.value = asArray(q.types) as MediaType[];
        const m = Array.isArray(q.match) ? q.match[0] : q.match;
        matchStatus.value = m === 'matched' || m === 'unmatched' ? m : '';
        selectedActors.value = asArray(q.actors);
        const yf = Array.isArray(q.yearFrom) ? q.yearFrom[0] : q.yearFrom;
        const yt = Array.isArray(q.yearTo) ? q.yearTo[0] : q.yearTo;
        yearFrom.value = yf ? Number(yf) : undefined;
        yearTo.value = yt ? Number(yt) : undefined;
        const s = (Array.isArray(q.sort) ? q.sort[0] : q.sort) as SortField | undefined;
        const o = (Array.isArray(q.order) ? q.order[0] : q.order) as SortOrder | undefined;
        sort.value = s ?? 'name';
        order.value = o ?? 'asc';
        offset.value = 0;
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
    function setMatchStatus(v: '' | 'matched' | 'unmatched'): void {
        matchStatus.value = v;
        offset.value = 0;
    }
    function setActors(v: string[]): void {
        selectedActors.value = v;
        offset.value = 0;
    }
    function setSort(field: SortField, ord?: SortOrder): void {
        sort.value = field;
        if (ord) order.value = ord;
        offset.value = 0;
    }
    /** Scope every subsequent fetch to one library (or clear with `undefined`).
     *  The library page sets this from its route param before loading; passing a
     *  different id resets paging so the grid restarts from page 0. */
    function setLibraryId(id: string | undefined): void {
        if (libraryId.value !== id) {
            libraryId.value = id;
            offset.value = 0;
        }
    }
    /** Restrict (or stop restricting) the grid to top-level items only (movies +
     *  series), hiding seasons/episodes. The library page sets this so a series
     *  library shows shows; toggling it resets paging. */
    function setTopLevel(v: boolean): void {
        if (topLevel.value !== v) {
            topLevel.value = v;
            offset.value = 0;
        }
    }
    /** Clear every FilterBar field back to its default (paging too). The library
     *  page calls this when entering/switching a library and on teardown so the
     *  shared singleton's filter state never bleeds across libraries or into a
     *  later unscoped consumer. Does NOT touch `libraryId` (the caller owns the
     *  scope) or `limit`. */
    function clearFilters(): void {
        search.value = '';
        selectedGenres.value = [];
        yearFrom.value = undefined;
        yearTo.value = undefined;
        selectedRatings.value = [];
        selectedTypes.value = [];
        matchStatus.value = '';
        selectedActors.value = [];
        sort.value = 'name';
        order.value = 'asc';
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
        matchStatus,
        selectedActors,
        sort,
        order,
        limit,
        offset,
        libraryId,
        topLevel,
        hasMore,
        queryParams,
        availableGenres,
        availableRatings,
        availableTypes,
        fetchMedia,
        scheduleFetch,
        loadMore,
        prefetch,
        clearCache,
        cancelScheduled,
        toQuery,
        applyQuery,
        reset,
        setSearch,
        setGenres,
        setYearRange,
        setRatings,
        setTypes,
        setMatchStatus,
        setActors,
        setSort,
        setLibraryId,
        setTopLevel,
        clearFilters,
    };
});
