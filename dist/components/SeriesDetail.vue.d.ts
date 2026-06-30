import type { MediaItem } from '../types/media-item';
import type { SeasonGroup } from './series-grouping';
type __VLS_Props = {
    /** The series item (drives the hero). */
    item: MediaItem;
    /** Pre-grouped seasons for the grid. */
    seasons: SeasonGroup[];
    /** Seasons are still loading (shows a spinner-less skeleton-free busy region). */
    loading?: boolean;
    /** Persisted resume position (seconds) for the hero Resume action. */
    resumeSeconds?: number | null;
    /** The router base so season links carry the `/app` prefix. */
    routerBase?: string;
    /** Admin opt-in (U5): show a "Match metadata" action on the series hero. */
    canMatch?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    match: (item: import("../types/media-item").MediaDetail) => any;
    play: (item: import("../types/media-item").MediaDetail) => any;
    info: (item: import("../types/media-item").MediaDetail) => any;
    back: () => any;
    resume: (item: import("../types/media-item").MediaDetail) => any;
    refresh: (item: import("../types/media-item").MediaDetail) => any;
    remove: (item: import("../types/media-item").MediaDetail) => any;
    watchlist: (item: import("../types/media-item").MediaDetail) => any;
    "mark-watched": (item: import("../types/media-item").MediaDetail) => any;
    "choose-poster": (item: import("../types/media-item").MediaDetail) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onPlay?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onInfo?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onBack?: (() => any) | undefined;
    onResume?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRefresh?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onRemove?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onWatchlist?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onMark-watched"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    "onChoose-poster"?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
}>, {
    loading: boolean;
    canMatch: boolean;
    resumeSeconds: number | null;
    routerBase: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
