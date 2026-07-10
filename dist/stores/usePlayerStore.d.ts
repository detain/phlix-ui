/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MediaItem } from '../types/media-item';
/** Resume is offered only when progress is past this many seconds… */
export declare const RESUME_MIN_SECONDS = 30;
/** …and before this fraction of the runtime (else it's effectively finished). */
export declare const RESUME_MAX_RATIO = 0.95;
/** Hard cap on the number of distinct ids the persisted resume map may hold. Beyond
 *  this, the least-recently-touched entries are evicted before each persist so the
 *  map can never grow unbounded across a user's lifetime of watching. */
export declare const RESUME_MAX_ENTRIES = 200;
/** 100-nanosecond ticks per second — the server reports playback position in these
 *  (Jellyfin-style) ticks; the local resume map is in whole seconds. */
export declare const TICKS_PER_SECOND = 10000000;
/**
 * A transport command pushed onto the store's command bus by a host OUTSIDE the
 * Vue tree (Electron tray / media keys, TV remotes). The live media component
 * (Player.vue or MiniPlayer.vue) watches `lastCommand` and applies it to its REAL
 * `<video>` element — mirroring the `bindMediaSession` pattern: the store records
 * an intent, the element owner enacts it. `seq` is bumped on every dispatch so two
 * identical successive commands still re-trigger the watcher.
 */
export interface PlayerCommand {
    type: 'seekTo' | 'seekBy';
    /** seconds (seekTo = absolute) or delta seconds (seekBy = relative). */
    value: number;
    /** bump id so two identical successive commands still trigger the watcher. */
    seq: number;
}
export interface MediaSessionHandlers {
    onPlay?: () => void;
    onPause?: () => void;
    onSeek?: (to: number) => void;
    onNext?: () => void;
    onPrevious?: () => void;
}
/**
 * usePlayerStore (R1.3) — singleton playback state shared across routes so a
 * mini-player can keep playing during navigation and "resume" / "up-next" work.
 *
 * Holds the current media + queue, transport state (position/duration/buffered),
 * and user selections (volume/muted/rate/quality/subtitle) seeded from prefs. A
 * persisted, throttled resume map records per-media positions in the 30s–95% band.
 * Media Session metadata + handlers are wired via bindMediaSession().
 */
export declare const usePlayerStore: import("pinia").StoreDefinition<"phlix-player", Pick<{
    current: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    } | null, import("../types/media-item").MediaDetail | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    } | null>;
    streamUrl: import("vue").Ref<string, string>;
    queue: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[], import("../types/media-item").MediaDetail[] | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[]>;
    playing: import("vue").Ref<boolean, boolean>;
    position: import("vue").Ref<number, number>;
    duration: import("vue").Ref<number, number>;
    buffered: import("vue").Ref<number, number>;
    volume: import("vue").Ref<number, number>;
    muted: import("vue").Ref<boolean, boolean>;
    rate: import("vue").Ref<number, number>;
    quality: import("vue").Ref<string, string>;
    subtitleLang: import("vue").Ref<string | null, string | null>;
    miniPlayer: import("vue").Ref<boolean, boolean>;
    resumeMap: import("vue").Ref<Record<string, number>, Record<string, number>>;
    lastCommand: import("vue").Ref<{
        type: "seekTo" | "seekBy";
        value: number;
        seq: number;
    } | null, PlayerCommand | {
        type: "seekTo" | "seekBy";
        value: number;
        seq: number;
    } | null>;
    progress: import("vue").ComputedRef<number>;
    upNext: import("vue").ComputedRef<import("../types/media-item").MediaDetail | null>;
    inResumeBand: (pos: number, dur: number) => boolean;
    saveResume: (id: string, pos: number, dur: number) => void;
    resumePositionFor: (id: string | null | undefined) => number | null;
    clearResume: (id: string) => void;
    mergeServerResume: (positions: Record<string, number>) => void;
    setCurrent: (media: MediaItem, opts?: {
        resetPosition?: boolean;
        streamUrl?: string;
    }) => void;
    updateProgress: (pos: number, dur?: number, buf?: number) => void;
    seekTo: (seconds: number) => void;
    seekBy: (delta: number) => void;
    playLocalFile: (url: string, meta?: Partial<MediaItem>) => void;
    play: () => void;
    pause: () => void;
    setVolume: (v: number) => void;
    toggleMute: () => void;
    setRate: (r: number) => void;
    setQuality: (q: string) => void;
    setSubtitle: (lang: string | null) => void;
    setQueue: (items: MediaItem[]) => void;
    enqueue: (item: MediaItem) => void;
    next: (resolveStreamUrl?: (m: MediaItem) => string | undefined) => MediaItem | null;
    showMiniPlayer: () => void;
    hideMiniPlayer: () => void;
    closePlayer: () => void;
    setMediaSessionMetadata: (media: MediaItem) => void;
    setMediaPositionState: () => void;
    bindMediaSession: (handlers: MediaSessionHandlers) => () => void;
    seedFromPreferences: () => void;
}, "volume" | "playing" | "duration" | "miniPlayer" | "quality" | "current" | "position" | "streamUrl" | "queue" | "buffered" | "muted" | "rate" | "subtitleLang" | "resumeMap" | "lastCommand">, Pick<{
    current: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    } | null, import("../types/media-item").MediaDetail | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    } | null>;
    streamUrl: import("vue").Ref<string, string>;
    queue: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[], import("../types/media-item").MediaDetail[] | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[]>;
    playing: import("vue").Ref<boolean, boolean>;
    position: import("vue").Ref<number, number>;
    duration: import("vue").Ref<number, number>;
    buffered: import("vue").Ref<number, number>;
    volume: import("vue").Ref<number, number>;
    muted: import("vue").Ref<boolean, boolean>;
    rate: import("vue").Ref<number, number>;
    quality: import("vue").Ref<string, string>;
    subtitleLang: import("vue").Ref<string | null, string | null>;
    miniPlayer: import("vue").Ref<boolean, boolean>;
    resumeMap: import("vue").Ref<Record<string, number>, Record<string, number>>;
    lastCommand: import("vue").Ref<{
        type: "seekTo" | "seekBy";
        value: number;
        seq: number;
    } | null, PlayerCommand | {
        type: "seekTo" | "seekBy";
        value: number;
        seq: number;
    } | null>;
    progress: import("vue").ComputedRef<number>;
    upNext: import("vue").ComputedRef<import("../types/media-item").MediaDetail | null>;
    inResumeBand: (pos: number, dur: number) => boolean;
    saveResume: (id: string, pos: number, dur: number) => void;
    resumePositionFor: (id: string | null | undefined) => number | null;
    clearResume: (id: string) => void;
    mergeServerResume: (positions: Record<string, number>) => void;
    setCurrent: (media: MediaItem, opts?: {
        resetPosition?: boolean;
        streamUrl?: string;
    }) => void;
    updateProgress: (pos: number, dur?: number, buf?: number) => void;
    seekTo: (seconds: number) => void;
    seekBy: (delta: number) => void;
    playLocalFile: (url: string, meta?: Partial<MediaItem>) => void;
    play: () => void;
    pause: () => void;
    setVolume: (v: number) => void;
    toggleMute: () => void;
    setRate: (r: number) => void;
    setQuality: (q: string) => void;
    setSubtitle: (lang: string | null) => void;
    setQueue: (items: MediaItem[]) => void;
    enqueue: (item: MediaItem) => void;
    next: (resolveStreamUrl?: (m: MediaItem) => string | undefined) => MediaItem | null;
    showMiniPlayer: () => void;
    hideMiniPlayer: () => void;
    closePlayer: () => void;
    setMediaSessionMetadata: (media: MediaItem) => void;
    setMediaPositionState: () => void;
    bindMediaSession: (handlers: MediaSessionHandlers) => () => void;
    seedFromPreferences: () => void;
}, "progress" | "upNext">, Pick<{
    current: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    } | null, import("../types/media-item").MediaDetail | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    } | null>;
    streamUrl: import("vue").Ref<string, string>;
    queue: import("vue").Ref<{
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[], import("../types/media-item").MediaDetail[] | {
        stream_url?: string | null | undefined;
        duration?: number | null | undefined;
        cast?: {
            name: string;
            role?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        crew?: {
            name: string;
            job?: string | null | undefined;
            profile_url?: string | null | undefined;
        }[] | undefined;
        production_companies?: {
            name: string;
            logo_url?: string | null | undefined;
            origin_country?: string | null | undefined;
        }[] | undefined;
        studio?: string | null | undefined;
        library_id?: string | null | undefined;
        backdrop_url?: string | null | undefined;
        backdrop_url_large?: string | null | undefined;
        backdrop_srcset?: string | null | undefined;
        theme_audio_url?: string | null | undefined;
        user_data?: {
            favorite: boolean;
            rating: number | null;
            like_level?: number | undefined;
            watched?: boolean | undefined;
        } | null | undefined;
        external_ids?: (Record<string, string> | null) | undefined;
        files?: {
            path: string;
            size_bytes: number;
            container?: string | null | undefined;
            codec?: string | null | undefined;
            resolution?: string | null | undefined;
        }[] | undefined;
        id: string;
        name: string;
        sort_title?: string | null | undefined;
        type: import("../types/media-item").MediaType;
        path?: string | undefined;
        poster_url: string | null;
        poster_srcset?: string | (string | {
            url: string;
            width?: number | undefined;
            density?: number | undefined;
        })[] | null | undefined;
        genres: string[];
        year: number | null;
        rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | "X" | "UNRATED" | null;
        runtime: number | null;
        overview: string | null;
        actors: string[];
        director: string | null;
        created_at: string | null;
        updated_at: string | null;
        parent_id?: string | null | undefined;
        season_number?: number | null | undefined;
        episode_number?: number | null | undefined;
        episode_title?: string | null | undefined;
        air_date?: string | null | undefined;
    }[]>;
    playing: import("vue").Ref<boolean, boolean>;
    position: import("vue").Ref<number, number>;
    duration: import("vue").Ref<number, number>;
    buffered: import("vue").Ref<number, number>;
    volume: import("vue").Ref<number, number>;
    muted: import("vue").Ref<boolean, boolean>;
    rate: import("vue").Ref<number, number>;
    quality: import("vue").Ref<string, string>;
    subtitleLang: import("vue").Ref<string | null, string | null>;
    miniPlayer: import("vue").Ref<boolean, boolean>;
    resumeMap: import("vue").Ref<Record<string, number>, Record<string, number>>;
    lastCommand: import("vue").Ref<{
        type: "seekTo" | "seekBy";
        value: number;
        seq: number;
    } | null, PlayerCommand | {
        type: "seekTo" | "seekBy";
        value: number;
        seq: number;
    } | null>;
    progress: import("vue").ComputedRef<number>;
    upNext: import("vue").ComputedRef<import("../types/media-item").MediaDetail | null>;
    inResumeBand: (pos: number, dur: number) => boolean;
    saveResume: (id: string, pos: number, dur: number) => void;
    resumePositionFor: (id: string | null | undefined) => number | null;
    clearResume: (id: string) => void;
    mergeServerResume: (positions: Record<string, number>) => void;
    setCurrent: (media: MediaItem, opts?: {
        resetPosition?: boolean;
        streamUrl?: string;
    }) => void;
    updateProgress: (pos: number, dur?: number, buf?: number) => void;
    seekTo: (seconds: number) => void;
    seekBy: (delta: number) => void;
    playLocalFile: (url: string, meta?: Partial<MediaItem>) => void;
    play: () => void;
    pause: () => void;
    setVolume: (v: number) => void;
    toggleMute: () => void;
    setRate: (r: number) => void;
    setQuality: (q: string) => void;
    setSubtitle: (lang: string | null) => void;
    setQueue: (items: MediaItem[]) => void;
    enqueue: (item: MediaItem) => void;
    next: (resolveStreamUrl?: (m: MediaItem) => string | undefined) => MediaItem | null;
    showMiniPlayer: () => void;
    hideMiniPlayer: () => void;
    closePlayer: () => void;
    setMediaSessionMetadata: (media: MediaItem) => void;
    setMediaPositionState: () => void;
    bindMediaSession: (handlers: MediaSessionHandlers) => () => void;
    seedFromPreferences: () => void;
}, "play" | "pause" | "closePlayer" | "next" | "seekTo" | "seekBy" | "inResumeBand" | "saveResume" | "resumePositionFor" | "clearResume" | "mergeServerResume" | "setCurrent" | "updateProgress" | "playLocalFile" | "setVolume" | "toggleMute" | "setRate" | "setQuality" | "setSubtitle" | "setQueue" | "enqueue" | "showMiniPlayer" | "hideMiniPlayer" | "setMediaSessionMetadata" | "setMediaPositionState" | "bindMediaSession" | "seedFromPreferences">>;
