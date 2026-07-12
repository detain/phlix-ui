/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export interface IndexBucket {
    key: string;
    label: string;
    offset: number;
    count: number;
    ariaLabel?: string;
}
export interface MediaIndexResponse {
    field: string;
    buckets: IndexBucket[];
    total: number;
}
interface CacheEntry {
    data: {
        field: string;
        buckets: IndexBucket[];
        total: number;
    };
    ts: number;
}
declare const CACHE_TTL = 300000;
export { CACHE_TTL };
declare const cache: Map<string, CacheEntry>;
export { cache };
export declare function fetchIndexBuckets(apiBase: string, params: {
    field: string;
    order?: string;
    libraryId?: string;
    query?: string;
    genres?: string[];
    yearMin?: number;
    yearMax?: number;
    ratings?: number[];
    actors?: string[];
    studios?: string[];
    match?: string;
    topLevel?: boolean;
}, signal?: AbortSignal): Promise<{
    field: string;
    buckets: IndexBucket[];
    total: number;
}>;
