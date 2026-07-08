/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { MediaItem, MediaType } from '../types/media-item';
import type { LibraryQueryParams } from '../types/library-query';
import { ApiClient } from '../api/client';
import { ApiError, errMessage } from '../api/errors';
import { buildMediaQuery, buildMediaUrl } from '../api/media-query';

export type SortField = 'name' | 'year' | 'rating' | 'date_added' | 'runtime' | 'genre' | 'artist';
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

/** Facets returned by GET /api/v1/media/facets — genres are the primary seam.
 *  Additional facet dimensions can be added as the server implements them. */
export interface MediaFacets {
    genres: string[];
}

/** Cache entry for server facets. */
interface FacetsCacheEntry {
    facets: MediaFacets;
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
    /** Server-provided facets (populated by loadFacets when the endpoint exists). */
    const serverFacets = ref<MediaFacets | null>(null);

    /** Lazily-constructed, long-lived ApiClient — reused across all fetch calls.
     *  When apiBase changes between calls we call setBaseUrl() instead of
     *  allocating a fresh client, so the token store (default: localStorage) is
     *  preserved and the instance-level refresh promise stays valid. */
    let apiClient: ApiClient | null = null;

    const search = ref('');
    const selectedGenres = ref<string[]>([]);
    const yearFrom = ref<number | undefined>(undefined);
    const yearTo = ref<number | undefined>(undefined);
    const selectedRatings = ref<string[]>([]);
    const selectedTypes = ref<MediaType[]>([]);
    const matchStatus = ref<'' | 'matched' | 'unmatched'>('');
    const selectedActors = ref<string[]>([]);
    const selectedCompanies = ref<string[]>([]);
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
        if (selectedCompanies.value.length) p.companies = selectedCompanies.value;
        p.sort = sort.value;
        p.order = order.value;
        p.limit = limit.value;
        p.offset = offset.value;
        return p;
    });

    // Memoized availableGenres — only recomputes when serverFacets or items changes.
    // The Vue computed caches the result and only re-evaluates when dependencies change.
    const availableGenres = computed(() => {
        if (serverFacets.value?.genres) return [...serverFacets.value.genres].sort();
        if (!items.value || items.value.length === 0) return [];
        const genres = new Set<string>();
        items.value.forEach((item) => item.genres?.forEach((g) => genres.add(g)));
        return Array.from(genres).sort();
    });

    const availableRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'X', 'UNRATED'];
    const availableTypes: MediaType[] = ['movie', 'series', 'episode', 'audio', 'image'];

    // ---- query (de)serialization --------------------------------------------
    // Serialize via the SHARED buildMediaQuery so the store's request URL AND its
    // cache key can never drift from it. They previously did: a duplicated local
    // serializer silently dropped `match` and `actors`, so the matched/unmatched
    // and actor filters reached neither the server (the grid stayed at the full,
    // unfiltered count) nor the cache key (so a toggle re-served the cached
    // unfiltered page). One source of truth prevents that whole class of bug.
    function buildApiQuery(apiBase: string, params: LibraryQueryParams): string {
        return buildMediaUrl(apiBase, params);
    }
    function cacheKey(params: LibraryQueryParams): string {
        return buildMediaQuery(params);
    }

    // ---- cache + in-flight --------------------------------------------------
    const cache = new Map<string, CacheEntry>();
    const facetsCache = new Map<string, FacetsCacheEntry>();
    const inflight = new Map<string, { promise: Promise<MediaResponse>; controller: AbortController }>();
    let activeKey: string | null = null;
    let activeController: AbortController | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    // Bumped on every fresh (page-0) load so a late random-access page fetch from
    // a SUPERSEDED query (filters changed mid-flight) can't splice stale rows into
    // the new list. ensureRange() captures it and drops a result if it changed.
    let generation = 0;

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
        if (!apiClient) {
            apiClient = new ApiClient({ baseUrl: apiBase });
        } else {
            apiClient.setBaseUrl(apiBase);
        }
        const promise = apiClient
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
        // A fresh (replace) load starts a new generation — invalidates any
        // in-flight random-access page fetch from the previous query.
        if (!append) generation += 1;
    }

    /**
     * Splice a fetched page into `items` at its ABSOLUTE offset (random access).
     * The grid is pre-sized to `total`, so a page placed at e.g. index 5000 fills
     * those skeleton slots without disturbing the rows already loaded elsewhere.
     */
    function placePage(pageOffset: number, pageItems: MediaItem[]): void {
        if (pageItems.length === 0) return;
        const next = items.value.slice();
        for (let k = 0; k < pageItems.length; k++) next[pageOffset + k] = pageItems[k];
        items.value = next;
    }

    /**
     * Ensure every page covering the absolute index window [startIndex, endIndex)
     * is loaded into `items`. This is what makes the A-Z jump rail work: jumping
     * to "S" (offset ~5000) fetches the page AT that offset instead of only
     * appending at the end, so the skeleton slots fill with the right titles.
     * Also drives normal scrolling (the grid emits its visible window). Pages
     * already present are skipped; concurrent identical fetches dedupe via the
     * in-flight map; results from a superseded query are dropped.
     */
    async function ensureRange(apiBase: string, startIndex: number, endIndex: number): Promise<void> {
        const size = Math.max(1, limit.value);
        const cap = total.value > 0 ? total.value : Math.max(endIndex, 1);
        const first = Math.max(0, Math.floor(Math.max(0, startIndex) / size) * size);
        const lastIdx = Math.min(cap - 1, Math.max(first, endIndex - 1));
        const gen = generation;
        const jobs: Promise<void>[] = [];
        for (let off = first; off <= lastIdx; off += size) {
            if (items.value[off] !== undefined) continue; // page already loaded
            const params = { ...queryParams.value, offset: off };
            const key = cacheKey(params);
            const cached = cache.get(key);
            if (fresh(cached)) {
                if (gen === generation) placePage(off, cached.items);
                if (!total.value) total.value = cached.total;
                continue;
            }
            jobs.push(
                networkFetch(apiBase, params, key, false)
                    .then((res) => {
                        if (gen !== generation) return; // filters changed mid-flight — drop
                        placePage(off, res.items);
                        if (!total.value) total.value = res.total;
                    })
                    .catch(() => {
                        /* leave the slots as skeletons; a later window pass retries */
                    }),
            );
        }
        if (jobs.length) await Promise.all(jobs);
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

    // ---- facets -------------------------------------------------------------
    /** Build the cache key for facets (scoped by libraryId when set). */
    function facetsCacheKey(libraryId: string | undefined): string {
        return libraryId ?? '__all__';
    }

    /**
     * Load genre facets from the server.
     *
     * When the server implements `GET /api/v1/media/facets` the returned genres
     * are used for `availableGenres` — providing the complete list even under
     * sparse / random-access paging. When the endpoint is absent (404) or the
     * request fails, the store falls back to the derived set from loaded items,
     * so this call is safe on older servers and degrades gracefully.
     */
    async function loadFacets(apiBase: string): Promise<void> {
        const key = facetsCacheKey(libraryId.value);
        const cached = facetsCache.get(key);
        if (cached && Date.now() - cached.ts < CACHE_TTL) {
            serverFacets.value = cached.facets;
            return;
        }

        if (!apiClient) {
            apiClient = new ApiClient({ baseUrl: apiBase });
        } else {
            apiClient.setBaseUrl(apiBase);
        }

        try {
            const params: Record<string, string> = {};
            if (libraryId.value) params['libraryId'] = libraryId.value;
            const facets = await apiClient.get<MediaFacets>('/api/v1/media/facets', Object.keys(params).length ? params : undefined);
            serverFacets.value = facets;
            facetsCache.set(key, { facets, ts: Date.now() });
        } catch (e) {
            // 404 (absent endpoint) or any other error — fall back to derived genres.
            // Do not clobber a previously-loaded serverFacets value so the fallback
            // only kicks in when the endpoint is genuinely unavailable.
            if (e instanceof ApiError && e.status === 404) {
                serverFacets.value = null;
            }
            /* otherwise silently ignore — derived genres remain active */
        }
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
        if (selectedCompanies.value.length) q.companies = [...selectedCompanies.value];
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
        selectedCompanies.value = asArray(q.companies);
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
        // Discard the shared ApiClient so the next fetch creates (or reuses)
        // one in a clean state — particularly important when a new Pinia
        // instance (test) shares the same module-level apiClient variable.
        apiClient = null;
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
    function setCompanies(v: string[]): void {
        selectedCompanies.value = v;
        offset.value = 0;
    }
    const FIELD_DEFAULTS: Record<SortField, SortOrder> = {
        name: 'asc',
        year: 'desc',
        rating: 'desc',
        runtime: 'desc',
        date_added: 'desc',
        genre: 'asc',
        artist: 'asc',
    };

    function setSort(field: SortField, ord?: SortOrder): void {
        sort.value = field;
        order.value = ord ?? FIELD_DEFAULTS[field];
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
        selectedCompanies.value = [];
        sort.value = 'name';
        order.value = 'asc';
        offset.value = 0;
    }

    return {
        items,
        total,
        loading,
        error,
        serverFacets,
        search,
        selectedGenres,
        yearFrom,
        yearTo,
        selectedRatings,
        selectedTypes,
        matchStatus,
        selectedActors,
        selectedCompanies,
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
        ensureRange,
        prefetch,
        clearCache,
        cancelScheduled,
        loadFacets,
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
        setCompanies,
        setSort,
        setLibraryId,
        setTopLevel,
        clearFilters,
    };
});
