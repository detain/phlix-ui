/**
 * useTrickplay — fetches and manages trickplay (sprite preview) data for a media item.
 *
 * Provides a `thumbnailAt` function that maps a playback position (seconds) to a
 * CSS background-position string for the sprite sheet, enabling the scrubber preview.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type Ref } from 'vue';
/** Response shape from GET /api/v1/media/{id}/trickplay. */
export interface TrickplayData {
    sprite_url: string | null;
    timeline: Array<{
        seconds: number;
        frame: number;
    }>;
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
export declare function useTrickplay(opts: UseTrickplayOptions): TrickplayController;
