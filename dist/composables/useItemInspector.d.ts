/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type Ref } from 'vue';
import type { MediaItem } from '../types/media-item';
/**
 * useItemInspector (S15) — shared open/target state for the "Explore item data"
 * inspector modal (`ItemDataInspector.vue`).
 *
 * Every MediaCard host (Library / Browse / Explore / Recommendations) plus the
 * detail page routes the ⋯-menu `@explore-data` event to `openInspector(item)`
 * and binds `v-model="inspectorOpen"` / `:item="inspectorItem"` on the modal.
 * Centralizing the two refs + opener here avoids copy-pasting identical wiring
 * into five hosts (the inspector is purely client-side, so no per-host apply
 * logic differs — unlike the metadata-match modal).
 */
export interface ItemInspector {
    /** The item currently being inspected (null when never opened / cleared). */
    inspectorItem: Ref<MediaItem | null>;
    /** Two-way open flag for the inspector Modal. */
    inspectorOpen: Ref<boolean>;
    /** Point the inspector at `item` and open it. */
    openInspector: (item: MediaItem) => void;
}
export declare function useItemInspector(): ItemInspector;
