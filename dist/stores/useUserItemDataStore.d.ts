import type { MediaDetail, MediaListItem } from '../types/media-item';
/**
 * Per-item, per-user interaction state (favorite flag, personal rating, and the
 * multi-level "love" level) cached client-side so the bookmark/heart on a card
 * can flip *immediately* on click while the write goes out in the background.
 *
 * Shape note: `like_level` (0-3) is carried in the map now so Step 10.6's
 * `cycleLove` can mutate it without a schema change, but THIS store only owns
 * favorite behavior — no like/rating API call is made here.
 */
export interface UserItemData {
    favorite: boolean;
    rating: number | null;
    like_level: number;
}
export declare const useUserItemDataStore: import("pinia").StoreDefinition<"user-item-data", Pick<{
    entries: import("vue").Ref<Map<string, {
        favorite: boolean;
        rating: number | null;
        like_level: number;
    }> & Omit<Map<string, UserItemData>, keyof Map<any, any>>, Map<string, UserItemData> | (Map<string, {
        favorite: boolean;
        rating: number | null;
        like_level: number;
    }> & Omit<Map<string, UserItemData>, keyof Map<any, any>>)>;
    isFavorite: (id: string) => boolean;
    get: (id: string) => UserItemData;
    hydrate: (item: MediaDetail | MediaListItem | null | undefined) => void;
    toggleFavorite: (id: string, apiBase: string) => Promise<void>;
    reset: () => void;
}, "entries">, Pick<{
    entries: import("vue").Ref<Map<string, {
        favorite: boolean;
        rating: number | null;
        like_level: number;
    }> & Omit<Map<string, UserItemData>, keyof Map<any, any>>, Map<string, UserItemData> | (Map<string, {
        favorite: boolean;
        rating: number | null;
        like_level: number;
    }> & Omit<Map<string, UserItemData>, keyof Map<any, any>>)>;
    isFavorite: (id: string) => boolean;
    get: (id: string) => UserItemData;
    hydrate: (item: MediaDetail | MediaListItem | null | undefined) => void;
    toggleFavorite: (id: string, apiBase: string) => Promise<void>;
    reset: () => void;
}, never>, Pick<{
    entries: import("vue").Ref<Map<string, {
        favorite: boolean;
        rating: number | null;
        like_level: number;
    }> & Omit<Map<string, UserItemData>, keyof Map<any, any>>, Map<string, UserItemData> | (Map<string, {
        favorite: boolean;
        rating: number | null;
        like_level: number;
    }> & Omit<Map<string, UserItemData>, keyof Map<any, any>>)>;
    isFavorite: (id: string) => boolean;
    get: (id: string) => UserItemData;
    hydrate: (item: MediaDetail | MediaListItem | null | undefined) => void;
    toggleFavorite: (id: string, apiBase: string) => Promise<void>;
    reset: () => void;
}, "reset" | "hydrate" | "get" | "isFavorite" | "toggleFavorite">>;
