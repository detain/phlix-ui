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
    match: (item: MediaItem) => any;
    play: (item: MediaItem) => any;
    info: (item: MediaItem) => any;
    back: () => any;
    resume: (item: MediaItem) => any;
    actor: (name: string) => any;
    watchlist: (item: MediaItem) => any;
    genre: (name: string) => any;
    company: (name: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onMatch?: ((item: MediaItem) => any) | undefined;
    onPlay?: ((item: MediaItem) => any) | undefined;
    onInfo?: ((item: MediaItem) => any) | undefined;
    onBack?: (() => any) | undefined;
    onResume?: ((item: MediaItem) => any) | undefined;
    onActor?: ((name: string) => any) | undefined;
    onWatchlist?: ((item: MediaItem) => any) | undefined;
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
