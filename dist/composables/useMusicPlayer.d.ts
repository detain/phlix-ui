/**
 * Music playback composable — gapless + crossfade, fully client-side.
 *
 * Drives two alternating `<audio>` elements whose `src` is a track's
 * server-minted **signed** `stream_url` (`/media/:id/stream?exp&sig`, the field
 * emitted by the server's `formatTrack`; see UI-3.6 / X8). No Bearer header is
 * needed — the signature authorizes the byte stream — so the URL works directly
 * as an `<audio src>`.
 *
 * Crossfade and gapless are implemented with NO server dependency:
 *   - **Gapless:** the next track's `stream_url` is pre-loaded onto the idle
 *     `<audio>` element (`preload='auto'`) so the swap at track-end is instant.
 *   - **Crossfade:** the idle element starts at `volume = 0` while the active
 *     element ramps down, stepping both volumes over `crossfadeDuration` so the
 *     two overlap-fade. The server `buildGaplessSegmentCommand` path is NOT used.
 *
 * Both settings are read live from {@link usePreferencesStore}, so the existing
 * crossfade/gapless settings UI finally takes effect.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MusicTrack } from '../types/music';
export interface MusicPlayerOptions {
    /**
     * Media API base for resolving a track's signed `stream_url` via `getTrack`
     * (relay-proxied on the hub). Called lazily, only when a track lacks its own
     * `stream_url` (e.g. album fast-path items).
     */
    apiBase: () => string;
    /**
     * Byte-stream base that prefixes the signed relative `/media/:id/stream` path
     * (mirrors `PlayerPage.streamUrlFor`: `directBase || apiBase`). On the media
     * server this is '' (same-origin); on the hub it is the selected server's own
     * public origin so audio bytes stream direct with native Range.
     */
    streamBase: () => string;
}
/**
 * useMusicPlayer — dual-`<audio>` gapless + crossfade playback.
 *
 * @param opts base resolvers ({@link MusicPlayerOptions}).
 */
export declare function useMusicPlayer(opts: MusicPlayerOptions): {
    queue: import("vue").Ref<{
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
        streamUrl: string | null;
    }[], MusicTrack[] | {
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
        streamUrl: string | null;
    }[]>;
    currentTrack: import("vue").Ref<{
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
        streamUrl: string | null;
    } | null, MusicTrack | {
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
        streamUrl: string | null;
    } | null>;
    currentIndex: import("vue").Ref<number, number>;
    playing: import("vue").Ref<boolean, boolean>;
    position: import("vue").Ref<number, number>;
    duration: import("vue").Ref<number, number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    crossfading: import("vue").Ref<boolean, boolean>;
    hasNext: import("vue").ComputedRef<boolean>;
    hasPrev: import("vue").ComputedRef<boolean>;
    loadTracks: (tracks: MusicTrack[]) => void;
    play: (track?: MusicTrack) => Promise<void>;
    pause: () => void;
    toggle: () => Promise<void>;
    stop: () => void;
    next: () => Promise<void>;
    previous: () => Promise<void>;
    seek: (seconds: number) => void;
    dispose: () => void;
};
