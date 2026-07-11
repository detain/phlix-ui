/**
 * useTrickplay — fetches and manages trickplay (sprite preview) data for a media item.
 *
 * Provides a `thumbnailAt` function that maps a playback position (seconds) to a
 * CSS background-position string for the sprite sheet, enabling the scrubber preview.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { ref, type Ref } from 'vue';
import { ApiClient } from '../api/client';

/** Sprite grid dimensions — 10 columns × 6 rows = 60 frames per sprite. */
const SPRITE_COLS = 10;
const SPRITE_ROWS = 6;

/** Response shape from GET /api/v1/media/{id}/trickplay. */
export interface TrickplayData {
    sprite_url: string | null;
    timeline: Array<{ seconds: number; frame: number }>;
}

/** A single timeline entry mapping seconds to a frame index. */
interface TimelineEntry {
    seconds: number;
    frame: number;
}

/** Options for {@link useTrickplay}. */
export interface UseTrickplayOptions {
    /** Resolver for the API base (PlayerPage injects the app's relay proxy base). */
    apiBase: () => string;
    /** Optional AbortSignal to cancel in-flight requests. */
    signal?: AbortSignal;
}

/** Return type of the useTrickplay composable. */
export interface TrickplayController {
    /** The trickplay data once loaded, or null if not yet loaded / unavailable. */
    data: Ref<TrickplayData | null>;
    /** True while the initial fetch is in flight. */
    loading: Ref<boolean>;
    /** Error message if the fetch failed. */
    error: Ref<string | null>;
    /**
     * Maps a playback position (seconds) to a CSS background-position string
     * for the sprite sheet, or null if trickplay is unavailable.
     */
    thumbnailAt: (seconds: number) => string | null;
    /** Fetch trickplay data for a given media ID. */
    fetch: (mediaId: string, signal?: AbortSignal) => Promise<void>;
    /** Clear the cached data (e.g., when media changes). */
    reset: () => void;
}

/**
 * Composable for managing trickplay (sprite preview) data.
 *
 * Fetches trickplay data from the server and provides a `thumbnailAt` function
 * that maps playback position to a CSS background-position string for the sprite.
 *
 * @param opts - Configuration options
 * @param opts.apiBase - Resolver for the API base URL (e.g., the relay proxy on hub)
 * @param opts.signal - Optional AbortSignal to cancel in-flight requests on unmount
 */
export function useTrickplay(opts: UseTrickplayOptions): TrickplayController {
    const data = ref<TrickplayData | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    /** Per-media-id cache so repeated fetches for the same ID are no-ops. */
    const cache = new Map<string, TrickplayData | null>();

    /** Build a client wired to the caller's apiBase. */
    function clientForBase(): ApiClient {
        return new ApiClient({
            baseUrl: opts.apiBase(),
        });
    }

    /** Find the timeline entry for the given second, using linear interpolation. */
    function findTimelineEntry(seconds: number, timeline: TimelineEntry[]): TimelineEntry | null {
        if (!timeline || timeline.length === 0) return null;

        // Clamp to the last entry if beyond the end.
        if (seconds >= timeline[timeline.length - 1].seconds) {
            return timeline[timeline.length - 1];
        }

        // Clamp to the first entry if before the start.
        if (seconds <= timeline[0].seconds) {
            return timeline[0];
        }

        // Binary search for the closest entry.
        let left = 0;
        let right = timeline.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (timeline[mid].seconds < seconds) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // At this point, left is the index of the first entry with seconds >= target.
        // Check if we should use this entry or the previous one (for smoother interpolation).
        if (left > 0 && timeline[left].seconds > seconds) {
            const prev = timeline[left - 1];
            const curr = timeline[left];
            // Linear interpolation between the two entries.
            const range = curr.seconds - prev.seconds;
            if (range > 0) {
                const fraction = (seconds - prev.seconds) / range;
                const interpolatedFrame = prev.frame + fraction * (curr.frame - prev.frame);
                return {
                    seconds,
                    frame: Math.round(interpolatedFrame),
                };
            }
            return prev;
        }

        return timeline[left];
    }

    /**
     * Maps a playback position (seconds) to a CSS background-position string
     * for the sprite sheet, or null if trickplay is unavailable.
     */
    function thumbnailAt(seconds: number): string | null {
        const d = data.value;
        if (!d || !d.sprite_url || !d.timeline || d.timeline.length === 0) {
            return null;
        }

        const entry = findTimelineEntry(seconds, d.timeline);
        if (entry === null) return null;

        const frame = entry.frame;
        // Calculate column and row in the sprite grid (0-indexed).
        const col = frame % SPRITE_COLS;
        const row = Math.floor(frame / SPRITE_COLS);

        // Convert to CSS background-position percentages.
        // Each frame occupies 1/SPRITE_COLS of the sprite width and 1/SPRITE_ROWS of the height.
        const xPercent = (col / (SPRITE_COLS - 1)) * 100;
        const yPercent = (row / (SPRITE_ROWS - 1)) * 100;

        return `url("${d.sprite_url}") ${xPercent}% ${yPercent}% / cover no-repeat`;
    }

    async function fetch(mediaId: string, signal?: AbortSignal): Promise<void> {
        // Return cached data immediately without refetching.
        if (cache.has(mediaId)) {
            data.value = cache.get(mediaId) ?? null;
            // If we have cached data, don't show loading state for cache hits.
            if (data.value !== null) return;
        }

        loading.value = true;
        error.value = null;
        try {
            // Merge provided signal with any component-level signal.
            const composedSignal = signal ?? opts.signal;
            const client = clientForBase();
            const result = await client.getTrickplay(mediaId, composedSignal);
            cache.set(mediaId, result);
            data.value = result;
        } catch (e) {
            // Cache negative results so we don't repeatedly hammer a missing resource.
            cache.set(mediaId, null);
            error.value = e instanceof Error ? e.message : 'Failed to load trickplay data';
            data.value = null;
        } finally {
            loading.value = false;
        }
    }

    function reset(): void {
        data.value = null;
        loading.value = false;
        error.value = null;
        cache.clear();
    }

    return {
        data,
        loading,
        error,
        thumbnailAt,
        fetch,
        reset,
    };
}
