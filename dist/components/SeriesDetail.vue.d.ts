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
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    play: (item: MediaItem) => any;
    info: (item: MediaItem) => any;
    back: () => any;
    resume: (item: MediaItem) => any;
    watchlist: (item: MediaItem) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPlay?: ((item: MediaItem) => any) | undefined;
    onInfo?: ((item: MediaItem) => any) | undefined;
    onBack?: (() => any) | undefined;
    onResume?: ((item: MediaItem) => any) | undefined;
    onWatchlist?: ((item: MediaItem) => any) | undefined;
}>, {
    loading: boolean;
    resumeSeconds: number | null;
    routerBase: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
