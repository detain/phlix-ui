import type { MediaItem } from '../types/media-item';
type __VLS_Props = {
    item: MediaItem;
    /** Persisted resume position (seconds) — shows the Resume action when set. */
    resumeSeconds?: number | null;
    /** "More like this" items. */
    similar?: MediaItem[];
    /** Similar rail is still loading. */
    similarLoading?: boolean;
    /** Show a back affordance (emits `back`). */
    showBack?: boolean;
    /** Admin opt-in (U5): render a "Match metadata" action that emits `match`. */
    canMatch?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: import("../types/media-item").MediaDetail) => any;
    play: (item: import("../types/media-item").MediaDetail) => any;
    info: (item: import("../types/media-item").MediaDetail) => any;
    back: () => any;
    resume: (item: import("../types/media-item").MediaDetail) => any;
    watchlist: (item: import("../types/media-item").MediaDetail) => any;
    refresh: (item: import("../types/media-item").MediaDetail) => any;
    actor: (name: string) => any;
    remove: (item: import("../types/media-item").MediaDetail) => any;
    "mark-watched": (item: import("../types/media-item").MediaDetail) => any;
    "choose-poster": (item: import("../types/media-item").MediaDetail) => any;
    "edit-metadata": (item: import("../types/media-item").MediaDetail) => any;
    "explore-data": (item: import("../types/media-item").MediaDetail) => any;
    genre: (name: string) => any;
    company: (name: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onPlay?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onInfo?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onBack?: (() => any) | undefined;
    onResume?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onWatchlist?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRefresh?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onActor?: ((name: string) => any) | undefined;
    onRemove?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onMark-watched"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onChoose-poster"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onEdit-metadata"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onExplore-data"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onGenre?: ((name: string) => any) | undefined;
    onCompany?: ((name: string) => any) | undefined;
}>, {
    canMatch: boolean;
    resumeSeconds: number | null;
    similar: MediaItem[];
    similarLoading: boolean;
    showBack: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
