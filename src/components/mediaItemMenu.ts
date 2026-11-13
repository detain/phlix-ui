/**
 * buildMediaItemMenu — the context-menu model for media cards, gated by item kind.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { MenuItem } from './ui';
import type { MediaItem } from '../types/media-item';
import { DEFAULT_MESSAGES, type Translate } from '../i18n/messages';

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
export const MENU_KEYS = {
  addToPlaylist: 'addToPlaylist',
  markWatched: 'markWatched',
  markUnwatched: 'markUnwatched',
  download: 'download',
  missingEpisodes: 'missingEpisodes',
  shuffle: 'shuffle',
  // S02: single metadata-match action (all former duplicates opened the same
  // MetadataMatchModal).
  matchMetadata: 'matchMetadata',
  editMetadata: 'editMetadata',
  editImages: 'editImages',
  exploreData: 'exploreData',
  remove: 'remove',
} as const;

export type MenuKey = (typeof MENU_KEYS)[keyof typeof MENU_KEYS];

/**
 * English reference labels (the default catalog), for tests that match rendered
 * text under the default translator. Not used for dispatch.
 */
export const MENU_LABELS = {
  addToPlaylist: DEFAULT_MESSAGES.itemActions.addToPlaylist,
  markWatched: DEFAULT_MESSAGES.itemActions.markWatched,
  markUnwatched: DEFAULT_MESSAGES.itemActions.markUnwatched,
  download: DEFAULT_MESSAGES.itemActions.download,
  missingEpisodes: DEFAULT_MESSAGES.itemActions.missingEpisodes,
  shuffle: DEFAULT_MESSAGES.player.shuffle,
  matchMetadata: DEFAULT_MESSAGES.itemActions.matchMetadata,
  editMetadata: DEFAULT_MESSAGES.itemActions.editMetadata,
  editImages: DEFAULT_MESSAGES.itemActions.editImages,
  exploreData: DEFAULT_MESSAGES.itemActions.exploreData,
  remove: DEFAULT_MESSAGES.itemActions.remove,
} as const;

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
export function buildMediaItemMenu(item: MediaItem, ctx: MediaItemMenuContext, t: Translate): MenuItem[] {
  const K = MENU_KEYS;
  const label: Record<MenuKey, string> = {
    addToPlaylist: t('itemActions.addToPlaylist'),
    markWatched: t('itemActions.markWatched'),
    markUnwatched: t('itemActions.markUnwatched'),
    download: t('itemActions.download'),
    missingEpisodes: t('itemActions.missingEpisodes'),
    shuffle: t('player.shuffle'),
    matchMetadata: t('itemActions.matchMetadata'),
    editMetadata: t('itemActions.editMetadata'),
    editImages: t('itemActions.editImages'),
    exploreData: t('itemActions.exploreData'),
    remove: t('itemActions.remove'),
  };
  const mk = (key: MenuKey, extra: Partial<MenuItem> = {}): MenuItem => ({ key, label: label[key], ...extra });
  const items: MenuItem[] = [
    mk(K.addToPlaylist),
    mk(ctx.isWatched ? K.markUnwatched : K.markWatched),
    mk(K.download),
  ];

  if (ctx.isSeriesOrSeason) {
    items.push(mk(K.missingEpisodes));
  }
  items.push(mk(K.shuffle));

  if (ctx.isAdmin) {
    items.push(mk(K.matchMetadata));
    items.push(mk(K.editMetadata));
    if (ctx.canChoosePoster) {
      items.push(mk(K.editImages));
    }
    items.push(mk(K.exploreData));

    if ((item as MediaItem & { canDelete?: boolean }).canDelete) {
      items.push(mk(K.remove, { danger: true }));
    }
  }

  return items;
}
