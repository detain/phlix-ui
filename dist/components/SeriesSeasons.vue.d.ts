import type { SeasonGroup } from './series-grouping';
type __VLS_Props = {
    seasons: SeasonGroup[];
    /** Open only the first season by default (others collapsed). */
    openFirstOnly?: boolean;
    /** API base URL for fetching episode detail (files are detail-only). */
    apiBase?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    play: (item: import("../types/media-item").MediaDetail) => any;
    open: (item: import("../types/media-item").MediaDetail) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPlay?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
    onOpen?: ((item: import("../types/media-item").MediaDetail) => any) | undefined;
}>, {
    apiBase: string;
    openFirstOnly: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
