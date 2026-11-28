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
import { ref, type Ref } from 'vue';
import { ApiClient } from '../api/client';

/**
 * Columns in the server-baked sprite grid. FfmpegRunner::TRICKPLAY_SPRITE_COLUMNS
 * bakes exactly six (and refuses partial rows); the payload does not yet
 * advertise the grid, so this constant mirrors the generator until it does.
 */
export const TRICKPLAY_SPRITE_COLUMNS = 6;

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
 * Parse the payload boundary as unknown: both urls must be non-empty STRINGS or
 * the item has no trickplay artefacts (the server's empty-success path). A
 * present-but-garbage field (e.g. a numeric sprite_url) is treated as absent,
 * never passed through to CSS composition downstream.
 */
function parseDescriptor(raw: unknown): { spriteUrl: string | null; timelineUrl: string | null } {
    if (typeof raw !== 'object' || raw === null) {
        return { spriteUrl: null, timelineUrl: null };
    }
    const rec = raw as Record<string, unknown>;
    const spriteUrl = typeof rec.sprite_url === 'string' && rec.sprite_url !== '' ? rec.sprite_url : null;
    const timelineUrl = typeof rec.timeline_url === 'string' && rec.timeline_url !== '' ? rec.timeline_url : null;
    return { spriteUrl, timelineUrl };
}

/**
 * Parse the timeline JSON: an ARRAY of rows carrying finite numeric time/x/y.
 * Non-array bodies (HTML error pages from a broken origin) and malformed rows
 * are dropped — one bad row must not poison the whole preview.
 */
function parseTimeline(raw: unknown): TimelineFrame[] {
    if (!Array.isArray(raw)) {
        return [];
    }
    const frames: TimelineFrame[] = [];
    for (const row of raw) {
        if (typeof row !== 'object' || row === null) {
            continue;
        }
        const rec = row as Record<string, unknown>;
        const { time, x, y } = rec;
        if (typeof time !== 'number' || !Number.isFinite(time)) {
            continue;
        }
        if (typeof x !== 'number' || !Number.isFinite(x)) {
            continue;
        }
        if (typeof y !== 'number' || !Number.isFinite(y)) {
            continue;
        }
        frames.push({ time, x, y });
    }
    // The server orders entries by index/time; sorting is a cheap defence
    // against a hand-rolled or merged payload arriving out of order.
    frames.sort((a, b) => a.time - b.time);
    return frames;
}

/**
 * Index of the entry NEAREST to `seconds` (entries sorted by time, clamped at
 * both ends). Trickplay cells are discrete snapshots — no between-cell
 * interpolation is attempted (the frames are the truth).
 */
function nearestEntryIndex(frames: TimelineFrame[], seconds: number): number {
    let lo = 0;
    let hi = frames.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        if (frames[mid].time < seconds) {
            lo = mid + 1;
        } else if (frames[mid].time > seconds) {
            hi = mid - 1;
        } else {
            return mid;
        }
    }
    // `lo` is the insertion point; choose whichever neighbour is closer.
    if (lo >= frames.length) {
        return frames.length - 1;
    }
    if (lo === 0) {
        return 0;
    }
    const before = seconds - frames[lo - 1].time;
    const after = frames[lo].time - seconds;
    return before <= after ? lo - 1 : lo;
}

/**
 * Map a timeline entry index to CSS background-position percentages within the
 * sprite sheet. With the sheet drawn `TRICKPLAY_SPRITE_COLUMNS * 100`% wide
 * (one cell box per view), column c sits at c/(COLUMNS-1)·100% horizontally and
 * row r at r/(rows-1)·100% vertically; a single-row sheet has no vertical travel
 * to distribute, so y pins to 0.
 */
function cellParts(spriteUrl: string, index: number, total: number): TrickplayParts {
    const col = index % TRICKPLAY_SPRITE_COLUMNS;
    const row = Math.floor(index / TRICKPLAY_SPRITE_COLUMNS);
    const rows = Math.ceil(total / TRICKPLAY_SPRITE_COLUMNS);
    return {
        url: spriteUrl,
        x: (col / (TRICKPLAY_SPRITE_COLUMNS - 1)) * 100,
        y: rows > 1 ? (row / (rows - 1)) * 100 : 0,
    };
}

/**
 * Real signal merge (finding 052): EITHER source aborting must abort the
 * in-flight request. A lone source passes through VERBATIM (identity preserved);
 * no sources yields undefined (unaborted fetch).
 */
function mergeSignals(caller: AbortSignal | undefined, component: AbortSignal | undefined): AbortSignal | undefined {
    if (caller !== undefined && component !== undefined) {
        return AbortSignal.any([caller, component]);
    }
    return caller ?? component;
}

/** Cancellation detection that survives DOMException and Error alike. */
function isAbortError(e: unknown): boolean {
    return typeof e === 'object' && e !== null && (e as { name?: string }).name === 'AbortError';
}

/**
 * Composable for managing trickplay (sprite preview) data.
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

    /**
     * Maps a playback position (seconds) to sprite-sheet position parts
     * `{ url, x, y }`, or null if trickplay is unavailable.
     */
    function thumbnailAt(seconds: number): TrickplayParts | null {
        const current = data.value;
        if (!current || current.sprite_url === null || current.timeline.length === 0) {
            return null;
        }
        return cellParts(current.sprite_url, nearestEntryIndex(current.timeline, seconds), current.timeline.length);
    }

    async function fetch(mediaId: string, signal?: AbortSignal): Promise<void> {
        // Every settled outcome — positive OR negative — short-circuits here.
        // The old guard returned only on a cached positive and fell through on a
        // cached null, hammering a known-missing resource on every hover (052).
        if (cache.has(mediaId)) {
            data.value = cache.get(mediaId) ?? null;
            // Cached states resolve without touching the loading flag.
            return;
        }

        // Merge provided signal with the component-level signal BEFORE touching
        // state: an already-aborted source (component unmounted mid-queue) must
        // not strand `loading` on a fetch that can never settle into the UI.
        const merged = mergeSignals(signal, opts.signal);
        if (merged?.aborted) return;

        loading.value = true;
        error.value = null;
        try {
            const client = clientForBase();
            const descriptor = parseDescriptor(await client.getTrickplay(mediaId, merged));
            if (descriptor.spriteUrl === null || descriptor.timelineUrl === null) {
                // Empty-success (no artefacts): cache the emptiness, skip the
                // second leg entirely — there is no timeline resource to fetch.
                const empty: TrickplayData = { sprite_url: null, timeline: [] };
                cache.set(mediaId, empty);
                data.value = empty;
                return;
            }
            // Second leg: the frame timeline lives at its own resource; the
            // server never inlines it into the payload (finding 001(a)).
            const frames = parseTimeline(await client.get(descriptor.timelineUrl, undefined, merged));
            const parsed: TrickplayData = { sprite_url: descriptor.spriteUrl, timeline: frames };
            cache.set(mediaId, parsed);
            data.value = parsed;
        } catch (e) {
            if (isAbortError(e)) {
                // Cancellation is not absence — never negative-cache an abort, or
                // a re-fetch after remount would silently return null forever.
                return;
            }
            // Cache negative results so we don't repeatedly hammer a missing
            // resource — the honouring short-circuit lives at the top of fetch().
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
