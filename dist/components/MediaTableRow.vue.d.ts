import type { MediaItem } from '../types/media-item';
type __VLS_Props = {
    item: MediaItem;
    /**
     * The item's ABSOLUTE index in the full result set, straight from
     * `MediaGrid`'s `#card` slot — NOT its position in the rendered window. Drives
     * `aria-rowindex`; see the virtualization note in the docblock.
     */
    index?: number;
    /** Admin opt-in (U5) — forwarded to the card's "Match" quick-action. */
    canMatch?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: import("../types/media-item").MediaDetail) => any;
    play: (item: import("../types/media-item").MediaDetail) => any;
    info: (item: import("../types/media-item").MediaDetail) => any;
    refresh: (item: import("../types/media-item").MediaDetail) => any;
    watchlist: (item: import("../types/media-item").MediaDetail) => any;
    remove: (item: import("../types/media-item").MediaDetail) => any;
    "mark-watched": (item: import("../types/media-item").MediaDetail) => any;
    "choose-poster": (item: import("../types/media-item").MediaDetail) => any;
    "edit-metadata": (item: import("../types/media-item").MediaDetail) => any;
    "explore-data": (item: import("../types/media-item").MediaDetail) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onPlay?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onInfo?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRefresh?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onWatchlist?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRemove?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onMark-watched"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onChoose-poster"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onEdit-metadata"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onExplore-data"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
}>, {
    index: number;
    canMatch: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
