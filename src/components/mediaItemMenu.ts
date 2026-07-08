/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
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
export const MENU_LABELS = {
  addToPlaylist: 'Add to playlist',
  like: 'Like',
  dislike: 'Dislike',
  markPlayed: 'Mark played',
  markUnplayed: 'Mark unplayed',
  download: 'Download',
  missingEpisodes: 'View missing episodes',
  shuffle: 'Shuffle',
  refreshMetadata: 'Refresh metadata',
  identify: 'Identify from beginning',
  editMetadata: 'Edit metadata',
  editImages: 'Edit images',
  exploreData: 'Explore item data',
  remove: 'Remove',
} as const;

/**
 * Build the ⋯ action menu for a media item. Everyone gets the playback/library
 * actions (playlist, like/dislike, played, download, shuffle, and — for
 * series/season cards — missing episodes); admins additionally get the metadata
 * / image / debug / remove actions.
 */
export function buildMediaItemMenu(item: MediaItem, ctx: MediaItemMenuContext): MenuItem[] {
  const L = MENU_LABELS;
  const items: MenuItem[] = [
    { label: L.addToPlaylist },
    { label: L.like },
    { label: L.dislike },
    { label: ctx.isWatched ? L.markUnplayed : L.markPlayed },
    { label: L.download },
  ];

  if (ctx.isSeriesOrSeason) {
    items.push({ label: L.missingEpisodes });
  }
  items.push({ label: L.shuffle });

  if (ctx.isAdmin) {
    items.push({ label: L.refreshMetadata });
    items.push({ label: L.identify });
    items.push({ label: L.editMetadata });
    if (ctx.canChoosePoster) {
      items.push({ label: L.editImages });
    }
    items.push({ label: L.exploreData });

    if ((item as MediaItem & { canDelete?: boolean }).canDelete) {
      items.push({ label: L.remove, danger: true });
    }
  }

  return items;
}
