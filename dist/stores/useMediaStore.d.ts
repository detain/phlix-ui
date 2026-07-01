import type { MediaType } from '../types/media-item';
import type { LibraryQueryParams } from '../types/library-query';
export type SortField = 'name' | 'year' | 'rating' | 'date_added' | 'runtime' | 'genre';
export type SortOrder = 'asc' | 'desc';
/** Facets returned by GET /api/v1/media/facets — genres are the primary seam.
 *  Additional facet dimensions can be added as the server implements them. */
export interface MediaFacets {
    genres: string[];
}
/**
 * useMediaStore (rewritten R1.2) — same public API as 0.7.0 plus:
 *   · query-keyed in-memory cache (TTL) — instant back/forward + revisited pages
 *   · in-flight dedupe + AbortController (superseded filter queries are cancelled)
 *   · debounced search refetch (scheduleFetch)
 *   · prefetch(params) to warm the cache (hover / next page)
 *   · URL-sync helpers (toQuery / applyQuery) — wire with bindMediaStoreToRouter
 */
export declare const useMediaStore: import("pinia").StoreDefinition<"media", Pick<{
    items: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[], import("../types/media-item").MediaDetail[] | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[]>;
    total: import("vue").Ref<number, number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    serverFacets: import("vue").Ref<{
        genres: string[];
    } | null, MediaFacets | {
        genres: string[];
    } | null>;
    search: import("vue").Ref<string, string>;
    selectedGenres: import("vue").Ref<string[], string[]>;
    yearFrom: import("vue").Ref<number | undefined, number | undefined>;
    yearTo: import("vue").Ref<number | undefined, number | undefined>;
    selectedRatings: import("vue").Ref<string[], string[]>;
    selectedTypes: import("vue").Ref<MediaType[], MediaType[]>;
    matchStatus: import("vue").Ref<"" | "matched" | "unmatched", "" | "matched" | "unmatched">;
    selectedActors: import("vue").Ref<string[], string[]>;
    selectedCompanies: import("vue").Ref<string[], string[]>;
    sort: import("vue").Ref<SortField, SortField>;
    order: import("vue").Ref<SortOrder, SortOrder>;
    limit: import("vue").Ref<number, number>;
    offset: import("vue").Ref<number, number>;
    libraryId: import("vue").Ref<string | undefined, string | undefined>;
    topLevel: import("vue").Ref<boolean, boolean>;
    hasMore: import("vue").ComputedRef<boolean>;
    queryParams: import("vue").ComputedRef<LibraryQueryParams>;
    availableGenres: import("vue").ComputedRef<string[]>;
    availableRatings: string[];
    availableTypes: MediaType[];
    fetchMedia: (apiBase: string, append?: boolean) => Promise<void>;
    scheduleFetch: (apiBase: string, delay?: number) => void;
    loadMore: (apiBase: string) => Promise<void>;
    ensureRange: (apiBase: string, startIndex: number, endIndex: number) => Promise<void>;
    prefetch: (apiBase: string, overrides?: Partial<LibraryQueryParams>) => Promise<void>;
    clearCache: () => void;
    cancelScheduled: () => void;
    loadFacets: (apiBase: string) => Promise<void>;
    toQuery: () => Record<string, string | string[]>;
    applyQuery: (q: Record<string, string | string[] | null | undefined>) => void;
    reset: () => void;
    setSearch: (v: string) => void;
    setGenres: (v: string[]) => void;
    setYearRange: (from: number | undefined, to: number | undefined) => void;
    setRatings: (v: string[]) => void;
    setTypes: (v: MediaType[]) => void;
    setMatchStatus: (v: "" | "matched" | "unmatched") => void;
    setActors: (v: string[]) => void;
    setCompanies: (v: string[]) => void;
    setSort: (field: SortField, ord?: SortOrder) => void;
    setLibraryId: (id: string | undefined) => void;
    setTopLevel: (v: boolean) => void;
    clearFilters: () => void;
}, "search" | "sort" | "error" | "loading" | "order" | "yearFrom" | "yearTo" | "limit" | "offset" | "libraryId" | "topLevel" | "items" | "total" | "serverFacets" | "selectedGenres" | "selectedRatings" | "selectedTypes" | "matchStatus" | "selectedActors" | "selectedCompanies" | "availableRatings" | "availableTypes">, Pick<{
    items: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[], import("../types/media-item").MediaDetail[] | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[]>;
    total: import("vue").Ref<number, number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    serverFacets: import("vue").Ref<{
        genres: string[];
    } | null, MediaFacets | {
        genres: string[];
    } | null>;
    search: import("vue").Ref<string, string>;
    selectedGenres: import("vue").Ref<string[], string[]>;
    yearFrom: import("vue").Ref<number | undefined, number | undefined>;
    yearTo: import("vue").Ref<number | undefined, number | undefined>;
    selectedRatings: import("vue").Ref<string[], string[]>;
    selectedTypes: import("vue").Ref<MediaType[], MediaType[]>;
    matchStatus: import("vue").Ref<"" | "matched" | "unmatched", "" | "matched" | "unmatched">;
    selectedActors: import("vue").Ref<string[], string[]>;
    selectedCompanies: import("vue").Ref<string[], string[]>;
    sort: import("vue").Ref<SortField, SortField>;
    order: import("vue").Ref<SortOrder, SortOrder>;
    limit: import("vue").Ref<number, number>;
    offset: import("vue").Ref<number, number>;
    libraryId: import("vue").Ref<string | undefined, string | undefined>;
    topLevel: import("vue").Ref<boolean, boolean>;
    hasMore: import("vue").ComputedRef<boolean>;
    queryParams: import("vue").ComputedRef<LibraryQueryParams>;
    availableGenres: import("vue").ComputedRef<string[]>;
    availableRatings: string[];
    availableTypes: MediaType[];
    fetchMedia: (apiBase: string, append?: boolean) => Promise<void>;
    scheduleFetch: (apiBase: string, delay?: number) => void;
    loadMore: (apiBase: string) => Promise<void>;
    ensureRange: (apiBase: string, startIndex: number, endIndex: number) => Promise<void>;
    prefetch: (apiBase: string, overrides?: Partial<LibraryQueryParams>) => Promise<void>;
    clearCache: () => void;
    cancelScheduled: () => void;
    loadFacets: (apiBase: string) => Promise<void>;
    toQuery: () => Record<string, string | string[]>;
    applyQuery: (q: Record<string, string | string[] | null | undefined>) => void;
    reset: () => void;
    setSearch: (v: string) => void;
    setGenres: (v: string[]) => void;
    setYearRange: (from: number | undefined, to: number | undefined) => void;
    setRatings: (v: string[]) => void;
    setTypes: (v: MediaType[]) => void;
    setMatchStatus: (v: "" | "matched" | "unmatched") => void;
    setActors: (v: string[]) => void;
    setCompanies: (v: string[]) => void;
    setSort: (field: SortField, ord?: SortOrder) => void;
    setLibraryId: (id: string | undefined) => void;
    setTopLevel: (v: boolean) => void;
    clearFilters: () => void;
}, "hasMore" | "queryParams" | "availableGenres">, Pick<{
    items: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[], import("../types/media-item").MediaDetail[] | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[]>;
    total: import("vue").Ref<number, number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    serverFacets: import("vue").Ref<{
        genres: string[];
    } | null, MediaFacets | {
        genres: string[];
    } | null>;
    search: import("vue").Ref<string, string>;
    selectedGenres: import("vue").Ref<string[], string[]>;
    yearFrom: import("vue").Ref<number | undefined, number | undefined>;
    yearTo: import("vue").Ref<number | undefined, number | undefined>;
    selectedRatings: import("vue").Ref<string[], string[]>;
    selectedTypes: import("vue").Ref<MediaType[], MediaType[]>;
    matchStatus: import("vue").Ref<"" | "matched" | "unmatched", "" | "matched" | "unmatched">;
    selectedActors: import("vue").Ref<string[], string[]>;
    selectedCompanies: import("vue").Ref<string[], string[]>;
    sort: import("vue").Ref<SortField, SortField>;
    order: import("vue").Ref<SortOrder, SortOrder>;
    limit: import("vue").Ref<number, number>;
    offset: import("vue").Ref<number, number>;
    libraryId: import("vue").Ref<string | undefined, string | undefined>;
    topLevel: import("vue").Ref<boolean, boolean>;
    hasMore: import("vue").ComputedRef<boolean>;
    queryParams: import("vue").ComputedRef<LibraryQueryParams>;
    availableGenres: import("vue").ComputedRef<string[]>;
    availableRatings: string[];
    availableTypes: MediaType[];
    fetchMedia: (apiBase: string, append?: boolean) => Promise<void>;
    scheduleFetch: (apiBase: string, delay?: number) => void;
    loadMore: (apiBase: string) => Promise<void>;
    ensureRange: (apiBase: string, startIndex: number, endIndex: number) => Promise<void>;
    prefetch: (apiBase: string, overrides?: Partial<LibraryQueryParams>) => Promise<void>;
    clearCache: () => void;
    cancelScheduled: () => void;
    loadFacets: (apiBase: string) => Promise<void>;
    toQuery: () => Record<string, string | string[]>;
    applyQuery: (q: Record<string, string | string[] | null | undefined>) => void;
    reset: () => void;
    setSearch: (v: string) => void;
    setGenres: (v: string[]) => void;
    setYearRange: (from: number | undefined, to: number | undefined) => void;
    setRatings: (v: string[]) => void;
    setTypes: (v: MediaType[]) => void;
    setMatchStatus: (v: "" | "matched" | "unmatched") => void;
    setActors: (v: string[]) => void;
    setCompanies: (v: string[]) => void;
    setSort: (field: SortField, ord?: SortOrder) => void;
    setLibraryId: (id: string | undefined) => void;
    setTopLevel: (v: boolean) => void;
    clearFilters: () => void;
}, "reset" | "prefetch" | "fetchMedia" | "scheduleFetch" | "loadMore" | "ensureRange" | "clearCache" | "cancelScheduled" | "loadFacets" | "toQuery" | "applyQuery" | "setSearch" | "setGenres" | "setYearRange" | "setRatings" | "setTypes" | "setMatchStatus" | "setActors" | "setCompanies" | "setSort" | "setLibraryId" | "setTopLevel" | "clearFilters">>;
