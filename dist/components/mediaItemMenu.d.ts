import type { MenuItem } from './ui';
import type { MediaItem } from '../types/media-item';
export interface MediaItemMenuContext {
    isAdmin: boolean;
    isWatched: boolean;
    canChoosePoster: boolean;
}
export declare function buildMediaItemMenu(item: MediaItem, ctx: MediaItemMenuContext): MenuItem[];
