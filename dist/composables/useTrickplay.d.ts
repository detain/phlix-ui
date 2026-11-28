/**
 * useTrickplay — fetches and manages trickplay (sprite preview) data for a media item.
 *
 * Server wire law (phlix-server MediaItemController::getTrickplay): the endpoint
 * answers `{ sprite_url, timeline_url, trickplay_bif_url? }` with BOTH urls null
 * on the empty-success path (no artefacts) — the frame timeline is a SEPARATE
 * JSON ARRAY resource fetched at timeline_url, its entries
 * `{ time, x, y, generation }` written by FfmpegRunner::writeTrickplayTimeline
 * (`time` is the frame midpoint `(i + 0.5) * interval`, `x`/`y` are pixel offsets
 * on a sheet `TRICKPLAY_SPRITE_COLUMNS` cells wide). The declared client type
 * (src/api/client.ts `getTrickplay`) predates that research and is fictional, so
 * the raw wire is parsed defensively here as `unknown` (finding phlix-ui-player-001).
 *
 * `thumbnailAt()` resolves a playback position to sprite-sheet POSITION PARTS
 * `{ url, x, y }` — CSS background-position percentages across the real sheet —
 * so the consumer composes valid CSS itself. The old full-shorthand string was
 * re-wrapped in `url()` by Scrubber, yielding invalid CSS (finding 001(b)), and
 * the old 10-column grid fiction scattered frames to wrong cells (001(c)).
 *
 * Caching (finding 052): every SETTLED outcome — positive / empty / negative —
 * caches per media id and short-circuits refetches completely. The old guard
 * fell through on a cached null, turning each hover into a refetch storm against
 * a known-missing resource. Aborts never enter the cache: cancellation is not
 * absence (audit #11). Signals merge for real via `AbortSignal.any` — the old
 * `signal ?? opts.signal` silently dropped the component-level signal whenever a
 * caller supplied one, so unmount could not cancel caller-initiated fetches.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type Ref } from 'vue';
/**
 * Columns in the server-baked sprite grid. FfmpegRunner::TRICKPLAY_SPRITE_COLUMNS
 * bakes exactly six (and refuses partial rows); the payload does not yet
 * advertise the grid, so this constant mirrors the generator until it does.
 */
export declare const TRICKPLAY_SPRITE_COLUMNS = 6;
/** One sprite-sheet cell from the timeline resource (generation stripped). */
export interface TimelineFrame {
    /** Frame midpoint label in seconds as written by the server. */
    time: number;
    /** Pixel x-offset of the cell inside the sprite sheet. */
    x: number;
    /** Pixel y-offset of the cell inside the sprite sheet. */
    y: number;
}
/**
 * Sprite-sheet position parts for a preview cell: the consumer composes
 * `background-image: url(parts.url)`, `background-position: x% y%` and a
 * `(TRICKPLAY_SPRITE_COLUMNS * 100)% auto` background-size from these.
 */
export interface TrickplayParts {
    /** URL of the sprite sheet. */
    url: string;
    /** CSS background-position X as a percentage across the sheet (0–100). */
    x: number;
    /** CSS background-position Y as a percentage down the sheet (0–100). */
    y: number;
}
/** Response shape of GET /api/v1/media/{id}/trickplay after parsing. */
export interface TrickplayData {
    sprite_url: string | null;
    timeline: TimelineFrame[];
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
    /** True while a fetch is in flight. */
    loading: Ref<boolean>;
    /** Error message if the fetch failed. */
    error: Ref<string | null>;
    /**
     * Maps a playback position (seconds) to sprite-sheet position parts
     * `{ url, x, y }`, or null if trickplay is unavailable. Never a CSS
     * shorthand string (finding 001(b)).
     */
    thumbnailAt: (seconds: number) => TrickplayParts | null;
    /** Fetch trickplay data for a given media ID. */
    fetch: (mediaId: string, signal?: AbortSignal) => Promise<void>;
    /** Clear the cached data (e.g., when media changes). */
    reset: () => void;
}
/**
 * Composable for managing trickplay (sprite preview) data.
 *
 * @param opts - Configuration options
 * @param opts.apiBase - Resolver for the API base URL (e.g., the relay proxy on hub)
 * @param opts.signal - Optional AbortSignal to cancel in-flight requests on unmount
 */
export declare function useTrickplay(opts: UseTrickplayOptions): TrickplayController;
