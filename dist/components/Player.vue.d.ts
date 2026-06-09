import type { MediaItem } from '../types/media-item';
import { type Chapter } from './player/Scrubber.vue';
import { type TimeMarker } from './player/playback';
import type { SelectOptionInput } from './ui/listbox';
type __VLS_Props = {
    media: MediaItem;
    streamUrl: string;
    /** Idle ms before the chrome hides while playing. */
    idleTimeout?: number;
    /** Chapter markers for the scrubber (server hint / VTT — optional). */
    chapters?: Chapter[];
    /** Intro range (server playback-info) — shows a "Skip intro" button while in-range. */
    introMarker?: TimeMarker | null;
    /** Outro range (server playback-info) — shows a "Skip outro" button while in-range. */
    outroMarker?: TimeMarker | null;
    /** Preview-thumbnail source for a given time (VTT sprite / server hint — optional). */
    thumbnailAt?: (seconds: number) => string | null | undefined;
    /** Server-supplied stream-quality variants (optional; the menu hides when empty). */
    qualities?: SelectOptionInput[];
    /** Resolve the stream URL for a queued item when auto-advancing to "up next".
     *  R3.9's PlayerPage supplies the real `/media/:id/stream` resolver; without it,
     *  advancing clears the store's stream URL rather than leaving a stale one. */
    streamUrlFor?: (media: MediaItem) => string | undefined;
    /** API base for the on-demand transcode endpoints. When a file can't be
     *  direct-played the player POSTs `${apiBase}/api/v1/media/:id/transcode` and
     *  plays the resulting HLS stream via hls.js. Defaults to the page origin. */
    apiBase?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    captions: () => any;
    pip: () => any;
    theater: (active: boolean) => any;
    back: () => any;
    "play-next": (media: MediaItem) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onCaptions?: (() => any) | undefined;
    onPip?: (() => any) | undefined;
    onTheater?: ((active: boolean) => any) | undefined;
    onBack?: (() => any) | undefined;
    "onPlay-next"?: ((media: MediaItem) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
