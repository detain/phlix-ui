import type { MediaDetail, MediaListItem } from '../types/media-item';
/**
 * Per-item, per-user interaction state (favorite flag, personal rating, and the
 * thumbs up/down rating level) cached client-side so the bookmark/thumbs on a
 * card can flip *immediately* on click while the write goes out in the background.
 *
 * Shape note: `like_level` (−2..2) is carried in the map — the thumbs axis
 * (−2 strongly dislike … 0 not set … 2 love). `setLike` writes it directly with
 * the same optimistic+rollback pattern as the favorite toggle.
 */
export interface UserItemData {
    favorite: boolean;
    rating: number | null;
    /** Thumbs rating on the −2..2 axis (0 = not set). */
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
    likeLevel: (id: string) => number;
    get: (id: string) => UserItemData;
    hydrate: (item: MediaDetail | MediaListItem | null | undefined) => void;
    toggleFavorite: (id: string, apiBase: string) => Promise<void>;
    setLike: (id: string, level: number, apiBase: string) => Promise<void>;
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
    likeLevel: (id: string) => number;
    get: (id: string) => UserItemData;
    hydrate: (item: MediaDetail | MediaListItem | null | undefined) => void;
    toggleFavorite: (id: string, apiBase: string) => Promise<void>;
    setLike: (id: string, level: number, apiBase: string) => Promise<void>;
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
    likeLevel: (id: string) => number;
    get: (id: string) => UserItemData;
    hydrate: (item: MediaDetail | MediaListItem | null | undefined) => void;
    toggleFavorite: (id: string, apiBase: string) => Promise<void>;
    setLike: (id: string, level: number, apiBase: string) => Promise<void>;
    reset: () => void;
}, "reset" | "hydrate" | "get" | "isFavorite" | "likeLevel" | "toggleFavorite" | "setLike">>;
