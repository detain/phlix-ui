import type { MediaItem } from '../../types/media-item';
type __VLS_Props = {
    /** The next item to play. */
    media: MediaItem;
    /** Seconds left in the countdown (only shown while `counting`). */
    remaining?: number;
    /** Countdown total (drives the ring fraction). */
    total?: number;
    /** Whether a countdown is running (autoplay on). When false the card is
     *  static — no ring, no "Starts in" text — and only Play now advances. */
    counting?: boolean;
    /** Optional thumbnail override (else the media's poster). */
    posterUrl?: string | null;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    cancel: () => any;
    "play-now": () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onCancel?: (() => any) | undefined;
    "onPlay-now"?: (() => any) | undefined;
}>, {
    total: number;
    remaining: number;
    counting: boolean;
    posterUrl: string | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
