import type { MediaItem } from '../types/media-item';
import { type Chapter } from './player/Scrubber.vue';
import { type SkipMarker } from './player/SkipControls.vue';
import { type TimeMarker, type PlaybackAudioTrack } from './player/playback';
import type { SubtitleTrack } from './player/transcode';
/**
 * W109 S505 — code-resident survival sentinel for the center-cluster ±10s transport
 * (AD-14). Exported so it is a real (used) module binding — it trips neither
 * `noUnusedLocals` (vue-tsc) nor `no-unused-vars` (eslint) — pinning that this
 * Player.vue change reached the shipped artifact. Nothing consumes it at runtime.
 */
export declare const S505_CENTER_TRANSPORT_TOKEN = "S505TRANSPORT10X9P3";
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<{
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
    /** All skip markers from `GET /api/v1/media/:id/markers` — drives SkipControls. */
    markers?: SkipMarker[];
    /** Preview-thumbnail source for a given time (VTT sprite / server hint — optional). */
    thumbnailAt?: (seconds: number) => string | null | undefined;
    /** Resolve the stream URL for a queued item when auto-advancing to "up next".
     *  R3.9's PlayerPage supplies the real `/media/:id/stream` resolver; without it,
     *  advancing clears the store's stream URL rather than leaving a stale one. */
    streamUrlFor?: (media: MediaItem) => string | undefined;
    /** Resolve a hub-relay `pending_command` media id to a playable item (S298).
     *  "Alexa, play X" lands on the open hub socket with a bare media id; with
     *  this resolver the player LOADS that title (setCurrent) and starts playing
     *  it. Without it, the pending command is surfaced via the `pending-media`
     *  event for the host to route. */
    resolvePendingMedia?: (command: {
        mediaId: string;
        title: string;
    }) => Promise<MediaItem | null> | MediaItem | null;
    /** API base for the on-demand transcode endpoints. When a file can't be
     *  direct-played the player POSTs `${apiBase}/api/v1/media/:id/transcode` and
     *  plays the resulting HLS stream via hls.js. Defaults to the page origin. */
    apiBase?: string;
    /** Previous episode in the series order (U2) — drives the Prev button for
     *  series content. null/absent hides the button (movies, or the very first
     *  episode). The host (PlayerPage) resolves it across seasons + navigates. */
    prevEpisode?: MediaItem | null;
    /** Next episode in the series order (U2) — drives the Next button. null/absent
     *  hides the button (movies, or the very last episode). */
    nextEpisode?: MediaItem | null;
    /** Server playback-info `audio_tracks[]` (parsed). On DIRECT play (non-Safari,
     *  where `video.audioTracks` is unavailable) a >1 list surfaces the audio menu;
     *  picking a non-default track falls the session over to the HLS transcode and
     *  selects the matching hls.js audio track by its audio-relative `index`. */
    playbackAudioTracks?: PlaybackAudioTrack[] | null;
    /** Server playback-info `subtitle_tracks[]` (parsed). Each `url` is a SIGNED
     *  WebVTT sidecar usable directly in a `<track>` (no Bearer header needed), so
     *  DIRECT play gets the same captions pipeline as the transcode path. */
    playbackSubtitleTracks?: SubtitleTrack[] | null;
    /** Start playback automatically once the source is ready (U2). The host page
     *  enables this since the player is reached via a Play click (a user gesture),
     *  so unmuted autoplay usually works; a rejected play() falls back to a muted
     *  retry, then surfaces the existing play control. Defaults to false so the
     *  component is unchanged where a host doesn't opt in. */
    autoplay?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    captions: () => any;
    pip: () => any;
    theater: (active: boolean) => any;
    back: () => any;
    "play-next": (media: import("../types/media-item").MediaDetail) => any;
    "play-episode": (media: import("../types/media-item").MediaDetail) => any;
    "pending-media": (mediaId: string, title: string) => any;
}, string, import("vue").PublicProps, Readonly<{
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
    /** All skip markers from `GET /api/v1/media/:id/markers` — drives SkipControls. */
    markers?: SkipMarker[];
    /** Preview-thumbnail source for a given time (VTT sprite / server hint — optional). */
    thumbnailAt?: (seconds: number) => string | null | undefined;
    /** Resolve the stream URL for a queued item when auto-advancing to "up next".
     *  R3.9's PlayerPage supplies the real `/media/:id/stream` resolver; without it,
     *  advancing clears the store's stream URL rather than leaving a stale one. */
    streamUrlFor?: (media: MediaItem) => string | undefined;
    /** Resolve a hub-relay `pending_command` media id to a playable item (S298).
     *  "Alexa, play X" lands on the open hub socket with a bare media id; with
     *  this resolver the player LOADS that title (setCurrent) and starts playing
     *  it. Without it, the pending command is surfaced via the `pending-media`
     *  event for the host to route. */
    resolvePendingMedia?: (command: {
        mediaId: string;
        title: string;
    }) => Promise<MediaItem | null> | MediaItem | null;
    /** API base for the on-demand transcode endpoints. When a file can't be
     *  direct-played the player POSTs `${apiBase}/api/v1/media/:id/transcode` and
     *  plays the resulting HLS stream via hls.js. Defaults to the page origin. */
    apiBase?: string;
    /** Previous episode in the series order (U2) — drives the Prev button for
     *  series content. null/absent hides the button (movies, or the very first
     *  episode). The host (PlayerPage) resolves it across seasons + navigates. */
    prevEpisode?: MediaItem | null;
    /** Next episode in the series order (U2) — drives the Next button. null/absent
     *  hides the button (movies, or the very last episode). */
    nextEpisode?: MediaItem | null;
    /** Server playback-info `audio_tracks[]` (parsed). On DIRECT play (non-Safari,
     *  where `video.audioTracks` is unavailable) a >1 list surfaces the audio menu;
     *  picking a non-default track falls the session over to the HLS transcode and
     *  selects the matching hls.js audio track by its audio-relative `index`. */
    playbackAudioTracks?: PlaybackAudioTrack[] | null;
    /** Server playback-info `subtitle_tracks[]` (parsed). Each `url` is a SIGNED
     *  WebVTT sidecar usable directly in a `<track>` (no Bearer header needed), so
     *  DIRECT play gets the same captions pipeline as the transcode path. */
    playbackSubtitleTracks?: SubtitleTrack[] | null;
    /** Start playback automatically once the source is ready (U2). The host page
     *  enables this since the player is reached via a Play click (a user gesture),
     *  so unmuted autoplay usually works; a rejected play() falls back to a muted
     *  retry, then surfaces the existing play control. Defaults to false so the
     *  component is unchanged where a host doesn't opt in. */
    autoplay?: boolean;
}> & Readonly<{
    onCaptions?: (() => any) | undefined;
    onPip?: (() => any) | undefined;
    onTheater?: ((active: boolean) => any) | undefined;
    onBack?: (() => any) | undefined;
    "onPlay-next"?: ((media: import("../types/media-item").MediaDetail) => any) | undefined;
    "onPlay-episode"?: ((media: import("../types/media-item").MediaDetail) => any) | undefined;
    "onPending-media"?: ((mediaId: string, title: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
