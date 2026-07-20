/**
 * Icon name for a media item's `type` — the single mapping from the
 * `media_items.type` ENUM to the `Icon` component's registry.
 *
 * This previously lived as a copy-pasted ternary in both `MediaCard.vue` and
 * `MediaDetail.vue`, and both copies keyed on `'image'` — a value the server
 * never emits (the photo kind is `photo`; `image` is a scanner-side label for
 * the file-extension set). So real photo rows fell through to the generic film
 * icon, as did every book/audiobook/track/album/artist row, none of which the
 * ternaries handled at all.
 *
 * Exhaustive over `MediaType` via a `Record`, so adding a member to the ENUM is
 * a typecheck error here rather than a silent fallthrough to `film`.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { MediaType } from '../types/media-item';
import type { IconName } from '../components/Icon.vue';

const ICON_BY_TYPE: Record<MediaType, IconName> = {
    // video hierarchy
    movie: 'film',
    series: 'tv',
    season: 'tv',
    episode: 'tv',
    video: 'video',
    // music hierarchy
    track: 'music',
    music: 'music',
    album: 'disc',
    artist: 'mic',
    audio: 'music',
    // standalone kinds
    book: 'book',
    audiobook: 'headphones',
    photo: 'image',
};

/**
 * Map a media `type` to an `Icon` name, falling back to `film` for anything
 * unrecognized (e.g. a server newer than this client).
 */
export function mediaTypeIcon(type: string | null | undefined): IconName {
    if (!type) return 'film';
    return ICON_BY_TYPE[type as MediaType] ?? 'film';
}
