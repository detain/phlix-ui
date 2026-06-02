import type { ApiClient } from '../client';
/**
 * A collection row as returned by the API.
 */
export interface Collection {
    id: string;
    name: string;
    library_id: string;
    item_count?: number;
    created_at?: string;
    [k: string]: unknown;
}
/** A media item within a collection. */
export interface MediaItem {
    id: string;
    title?: string;
    [k: string]: unknown;
}
/** Body accepted by {@link AdminCollectionsApi.create}. */
export interface CreateCollectionInput {
    name: string;
    library_id: string;
}
/** Body accepted by {@link AdminCollectionsApi.update}. */
export interface UpdateCollectionInput {
    name: string;
}
/**
 * AdminCollectionsApi (RA.12) — typed wrapper over the collection CRUD + item
 * membership endpoints (`/api/v1/collections/*`), ported 1:1 from the deleted
 * React `CollectionsApi`. Each method maps to an endpoint shipped by
 * `CollectionController` and unwraps the single-key envelopes (`{ collections }`,
 * `{ collection }`, `{ items }`, `{ message }`) so callers receive the bare
 * domain object. List unwraps are `Array.isArray`-guarded so a malformed payload
 * degrades to `[]` rather than throwing. Non-2xx responses throw via the client.
 */
export declare class AdminCollectionsApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/collections` → unwraps `{ collections }`. */
    list(): Promise<Collection[]>;
    /** `GET /api/v1/collections/{id}` → unwraps `{ collection, items }`. */
    get(id: string): Promise<{
        collection: Collection;
        items: MediaItem[];
    }>;
    /** `POST /api/v1/collections` → `{ collection }`. */
    create(input: CreateCollectionInput): Promise<{
        collection: Collection;
    }>;
    /** `PUT /api/v1/collections/{id}` → `{ collection }`. */
    update(id: string, input: UpdateCollectionInput): Promise<{
        collection: Collection;
    }>;
    /** `DELETE /api/v1/collections/{id}` → `{ message }`. */
    remove(id: string): Promise<{
        message: string;
    }>;
    /** `POST /api/v1/collections/{id}/items/{mediaItemId}` → `{ message }`. */
    addItem(collectionId: string, mediaItemId: string): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/collections/{id}/items/{mediaItemId}` → `{ message }`. */
    removeItem(collectionId: string, mediaItemId: string): Promise<{
        message: string;
    }>;
    /** `POST /api/v1/collections/{id}/bulk-add` → `{ message }`. */
    bulkAdd(collectionId: string, query: string): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/collections/{id}/refresh` → `{ message }`.
     * Refreshes a smart collection's items based on its rules.
     */
    refresh(collectionId: string): Promise<{
        message: string;
    }>;
}
