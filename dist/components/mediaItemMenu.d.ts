/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MenuItem } from './ui';
import type { MediaItem } from '../types/media-item';
export interface MediaItemMenuContext {
    isAdmin: boolean;
    isWatched: boolean;
    /** True for series/season cards — gates the "View missing episodes" item. */
    isSeriesOrSeason: boolean;
    canChoosePoster: boolean;
}
/**
 * Menu labels used across the card / detail ⋯ menu. Exported so the components
 * that dispatch on the label and the tests stay in lockstep with this builder
 * (a typo here would silently no-op the action).
 */
export declare const MENU_LABELS: {
    readonly addToPlaylist: "Add to playlist";
    readonly markPlayed: "Mark played";
    readonly markUnplayed: "Mark unplayed";
    readonly download: "Download";
    readonly missingEpisodes: "View missing episodes";
    readonly shuffle: "Shuffle";
    readonly matchMetadata: "Match metadata";
    readonly editMetadata: "Edit metadata";
    readonly editImages: "Edit images";
    readonly exploreData: "Explore item data";
    readonly remove: "Remove";
};
/**
 * Build the ⋯ action menu for a media item. Everyone gets the playback/library
 * actions (playlist, played, download, shuffle, and — for series/season cards —
 * missing episodes); admins additionally get the metadata / image / debug /
 * remove actions.
 *
 * S03: Like/Dislike are deliberately NOT in this menu — the `ThumbRating` widget
 * is the single like/dislike control. The redundant, less-capable menu aliases
 * were removed.
 */
export declare function buildMediaItemMenu(item: MediaItem, ctx: MediaItemMenuContext): MenuItem[];
