/**
 * Music playback composable with gapless/crossfade support.
 *
 * Uses Web Audio API with two audio elements (primary + secondary) and
 * GainNode for crossfade curves. Reads crossfade/gapless settings from
 * usePreferencesStore so the existing settings UI actually takes effect.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MusicTrack } from '../types/music';
/**
 * useMusicPlayer — gapless + crossfade audio playback composable.
 *
 * Uses two HTMLAudioElement nodes (primary / secondary) wired through a
 * shared AudioContext + GainNode so crossfade curves can be applied via the
 * Web Audio API.  The "active" element is the one currently audible; the
 * "idle" element is pre-loaded with the next track for gapless transitions.
 *
 * Call `loadTracks()` to set the current album's track list, then
 * `play(track)` to start playback of a specific track.
 */
export declare function useMusicPlayer(apiBase: () => string): {
    queue: import("vue").Ref<{
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
    }[], MusicTrack[] | {
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
    }[]>;
    currentTrack: import("vue").Ref<{
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
    } | null, MusicTrack | {
        id: string;
        title: string;
        durationSecs: number;
        trackNumber: number | null;
    } | null>;
    currentIndex: import("vue").Ref<number, number>;
    playing: import("vue").Ref<boolean, boolean>;
    position: import("vue").Ref<number, number>;
    duration: import("vue").Ref<number, number>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    hasNext: import("vue").ComputedRef<boolean>;
    hasPrev: import("vue").ComputedRef<boolean>;
    loadTracks: (tracks: MusicTrack[]) => void;
    play: (track?: MusicTrack) => Promise<void>;
    pause: () => void;
    stop: () => void;
    next: () => void;
    previous: () => void;
    seek: (seconds: number) => void;
    bindActiveElement: () => () => void;
};
