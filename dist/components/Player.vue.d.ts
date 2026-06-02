import type { MediaItem } from '../types/media-item';
import { type Chapter } from './player/Scrubber.vue';
type __VLS_Props = {
    media: MediaItem;
    streamUrl: string;
    /** Idle ms before the chrome hides while playing. */
    idleTimeout?: number;
    /** Chapter markers for the scrubber (server hint / VTT — optional). */
    chapters?: Chapter[];
    /** Preview-thumbnail source for a given time (VTT sprite / server hint — optional). */
    thumbnailAt?: (seconds: number) => string | null | undefined;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    back: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onBack?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
