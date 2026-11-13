/**
 * buildMediaItemMenu — the context-menu model for media cards, gated by item kind.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MenuItem } from './ui';
import type { MediaItem } from '../types/media-item';
import { type Translate } from '../i18n/messages';
export interface MediaItemMenuContext {
    isAdmin: boolean;
    isWatched: boolean;
    /** True for series/season cards — gates the "View missing episodes" item. */
    isSeriesOrSeason: boolean;
    canChoosePoster: boolean;
}
/**
 * Stable action ids for the ⋯ menu. Consumers dispatch on `MenuItem.key` (never
 * on the rendered label), so translating the labels can never silently no-op an
 * action (browseErrors.ts precedent). Each id is also the `itemActions.<id>`
 * catalog key except `shuffle` (catalog `player.shuffle`).
 */
export declare const MENU_KEYS: {
    readonly addToPlaylist: "addToPlaylist";
    readonly markWatched: "markWatched";
    readonly markUnwatched: "markUnwatched";
    readonly download: "download";
    readonly missingEpisodes: "missingEpisodes";
    readonly shuffle: "shuffle";
    readonly matchMetadata: "matchMetadata";
    readonly editMetadata: "editMetadata";
    readonly editImages: "editImages";
    readonly exploreData: "exploreData";
    readonly remove: "remove";
};
export type MenuKey = (typeof MENU_KEYS)[keyof typeof MENU_KEYS];
/**
 * English reference labels (the default catalog), for tests that match rendered
 * text under the default translator. Not used for dispatch.
 */
export declare const MENU_LABELS: {
    readonly addToPlaylist: string;
    readonly markWatched: string;
    readonly markUnwatched: string;
    readonly download: string;
    readonly missingEpisodes: string;
    readonly shuffle: string;
    readonly matchMetadata: string;
    readonly editMetadata: string;
    readonly editImages: string;
    readonly exploreData: string;
    readonly remove: string;
};
/**
 * Build the ⋯ action menu for a media item. Everyone gets the playback/library
 * actions (playlist, watched, download, shuffle, and — for series/season cards —
 * missing episodes); admins additionally get the metadata / image / debug /
 * remove actions.
 *
 * S03: Like/Dislike are deliberately NOT in this menu — the `ThumbRating` widget
 * is the single like/dislike control. The redundant, less-capable menu aliases
 * were removed.
 */
export declare function buildMediaItemMenu(item: MediaItem, ctx: MediaItemMenuContext, t: Translate): MenuItem[];
