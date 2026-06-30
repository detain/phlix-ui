import type { MenuItem } from './ui';
import type { MediaItem } from '../types/media-item';

export interface MediaItemMenuContext {
  isAdmin: boolean;
  isWatched: boolean;
  canChoosePoster: boolean;
}

export function buildMediaItemMenu(item: MediaItem, ctx: MediaItemMenuContext): MenuItem[] {
  const items: MenuItem[] = [];

  items.push({
    label: ctx.isWatched ? 'Mark unwatched' : 'Mark watched',
  });

  if (ctx.isAdmin) {
    items.push({ label: 'Refresh/Match…' });

    if (ctx.canChoosePoster) {
      items.push({ label: 'Choose poster…' });
    }

    if ((item as MediaItem & { canDelete?: boolean }).canDelete) {
      items.push({ label: 'Remove', danger: true });
    }
  }

  return items;
}
