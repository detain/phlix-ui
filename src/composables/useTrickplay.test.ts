/**
 * useTrickplay tests.
 *
 * Wire law (phlix-server MediaItemController::getTrickplay): the endpoint answers
 * `{ sprite_url, timeline_url, trickplay_bif_url? }` with BOTH urls null on the
 * empty-success path (no artefacts); the frame timeline is a SEPARATE JSON ARRAY
 * of `{ time, x, y, generation }` entries at timeline_url — time is the frame
 * midpoint `(i + 0.5) * interval`, entries ordered by index. `thumbnailAt()`
 * resolves a playback position to sprite-sheet POSITION PARTS `{url, x, y}`
 * (CSS background-position percentages), never a full shorthand string —
 * a consumer re-wrapping a shorthand in `url()` yields invalid CSS
 * (finding phlix-ui-player-001). Settled outcomes (positive / empty / negative)
 * cache per media id and short-circuit refetches; aborts never enter the cache
 * (finding phlix-ui-player-052, audit #11).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTrickplay } from './useTrickplay';
import { ApiClient } from '../api/client';

vi.mock('../api/client');

const API_BASE = 'https://hub.example.com';
const SPRITE = 'https://cdn.example.com/trickplay/m1/sprite.jpg';
const TIMELINE_URL = '/trickplay/m1/timeline.json';

/** The client's declared getTrickplay return type predates the real server
 *  payload; wire fixtures cross that fictional boundary at the mock seam. */
function asDeclared(payload: unknown): Awaited<ReturnType<ApiClient['getTrickplay']>> {
    return payload as Awaited<ReturnType<ApiClient['getTrickplay']>>;
}

/** Server-shaped trickplay payload: sprite sheet + separate timeline resource. */
function wirePayload() {
    return asDeclared({ sprite_url: SPRITE, timeline_url: TIMELINE_URL });
}

/** Server-shaped timeline array: 10s interval, midpoint time labels, pixel x/y
 *  on the 6-column grid the server bakes (FfmpegRunner margin 2, padding 1). */
function wireTimeline(count: number) {
    return Array.from({ length: count }, (_unused, i) => ({
        time: (i + 0.5) * 10,
        x: 2 + (i % 6) * 161,
        y: 2 + Math.floor(i / 6) * 91,
        generation: 0,
    }));
}

/** The parsed timeline shape the composable stores (generation stripped). */
function parsedFrames(count: number) {
    return wireTimeline(count).map(({ time, x, y }) => ({ time, x, y }));
}

describe('useTrickplay — wire shape (finding phlix-ui-player-001)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches the timeline_url resource after the payload — the server never inlines the timeline', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        const timelineSpy = vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(13));

        const { fetch, data } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1');

        expect(payloadSpy).toHaveBeenCalledTimes(1);
        expect(timelineSpy).toHaveBeenCalledTimes(1);
        expect(timelineSpy.mock.calls[0][0]).toBe(TIMELINE_URL);
        expect(data.value).toEqual({ sprite_url: SPRITE, timeline: parsedFrames(13) });
    });

    it('caches empty-success (both urls null) without a second fetch and honours the cache', async () => {
        const payloadSpy = vi
            .spyOn(ApiClient.prototype, 'getTrickplay')
            .mockResolvedValue(asDeclared({ sprite_url: null, timeline_url: null }));
        const timelineSpy = vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue([]);

        const { fetch, data, thumbnailAt } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('media-bare');
        expect(timelineSpy).not.toHaveBeenCalled();
        expect(data.value).toEqual({ sprite_url: null, timeline: [] });
        expect(thumbnailAt(5)).toBeNull();

        await fetch('media-bare');
        expect(payloadSpy).toHaveBeenCalledTimes(1);
    });

    it('treats a payload with no url fields at all (the gate-server "{}") as empty-success', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(asDeclared({}));
        const timelineSpy = vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue([]);

        const { fetch, data } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('media-silent');

        expect(timelineSpy).not.toHaveBeenCalled();
        expect(data.value).toEqual({ sprite_url: null, timeline: [] });
        expect(payloadSpy).toHaveBeenCalledTimes(1);
    });

    it('refuses a non-string sprite_url (defensive boundary parse, no second fetch)', async () => {
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(asDeclared({ sprite_url: 42, timeline_url: TIMELINE_URL }));
        const timelineSpy = vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));

        const { fetch, data, thumbnailAt } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1');

        expect(timelineSpy).not.toHaveBeenCalled();
        expect(data.value).toEqual({ sprite_url: null, timeline: [] });
        expect(thumbnailAt(5)).toBeNull();
    });

    it('drops malformed timeline rows instead of poisoning the preview', async () => {
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue([
            { time: 5, x: 2, y: 2, generation: 0 },
            { time: 15 }, // no coordinates
            { time: '25', x: 2, y: 2 }, // non-number time
            { time: Infinity, x: 2, y: 2 }, // non-finite time
            { time: 35, x: 2, y: 93, generation: 0 },
        ]);

        const { fetch, data, thumbnailAt } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1');

        expect(data.value?.timeline).toHaveLength(2);
        // Single row survives (2 frames ≤ 6 cols): entry idx1 → col 1 → 1/5*100.
        expect(thumbnailAt(35)).toEqual({ url: SPRITE, x: 20, y: 0 });
    });

    it('treats a non-array timeline body as no trickplay (HTML error page etc.)', async () => {
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue('<html>502</html>');

        const { fetch, data, thumbnailAt } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1');

        expect(data.value).toEqual({ sprite_url: SPRITE, timeline: [] });
        expect(thumbnailAt(5)).toBeNull();
    });

    it('negative-caches a failing timeline fetch — neither leg re-hammers', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        const timelineSpy = vi.spyOn(ApiClient.prototype, 'get').mockRejectedValue(new Error('boom'));

        const { fetch, data, error } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1');
        expect(error.value).toBe('boom');
        expect(data.value).toBeNull();

        await fetch('m1');
        expect(payloadSpy).toHaveBeenCalledTimes(1);
        expect(timelineSpy).toHaveBeenCalledTimes(1);
    });
});

describe('useTrickplay — thumbnailAt position parts (6-column grid)', () => {
    /** Controller with a 13-frame (3-row) sheet loaded directly. */
    function loaded(count = 13) {
        const c = useTrickplay({ apiBase: () => API_BASE });
        c.data.value = { sprite_url: SPRITE, timeline: parsedFrames(count) };
        return c;
    }

    it('returns null when data is not loaded', () => {
        const { thumbnailAt, data } = useTrickplay({ apiBase: () => API_BASE });
        expect(data.value).toBeNull();
        expect(thumbnailAt(0)).toBeNull();
    });

    it('returns null when sprite_url is null', () => {
        const c = loaded();
        c.data.value = { sprite_url: null, timeline: parsedFrames(13) };
        expect(c.thumbnailAt(5)).toBeNull();
    });

    it('returns null when the timeline is empty', () => {
        const c = loaded(0);
        c.data.value = { sprite_url: SPRITE, timeline: [] };
        expect(c.thumbnailAt(5)).toBeNull();
    });

    it('resolves the first frame to the sheet origin', () => {
        const { thumbnailAt } = loaded();
        expect(thumbnailAt(0)).toEqual({ url: SPRITE, x: 0, y: 0 });
    });

    it('spreads columns across the 6-wide grid (server constant, not the old 10)', () => {
        const { thumbnailAt } = loaded();
        // entry idx 5 (t=55) is the LAST column of row 0 → x = 5/(6-1)*100 = 100.
        expect(thumbnailAt(55)).toEqual({ url: SPRITE, x: 100, y: 0 });
        // entry idx 3 (t=35) → col 3 → x = 60.
        expect(thumbnailAt(35)).toEqual({ url: SPRITE, x: 60, y: 0 });
    });

    it('spreads rows down the sheet over the ACTUAL row count', () => {
        const { thumbnailAt } = loaded(13); // 13 frames → ceil(13/6) = 3 rows
        // idx 6 (t=65) → col 0, row 1 → y = 1/(3-1)*100 = 50.
        expect(thumbnailAt(65)).toEqual({ url: SPRITE, x: 0, y: 50 });
        // idx 11 (t=115) → col 5, row 1 → x 100, y 50.
        expect(thumbnailAt(115)).toEqual({ url: SPRITE, x: 100, y: 50 });
        // idx 12 (t=125) → col 0, row 2 (last) → y = 100.
        expect(thumbnailAt(125)).toEqual({ url: SPRITE, x: 0, y: 100 });
    });

    it('pins a single-row sheet to y 0 (no vertical travel to distribute)', () => {
        const { thumbnailAt } = loaded(4); // 4 frames → 1 row
        expect(thumbnailAt(35)).toEqual({ url: SPRITE, x: 60, y: 0 });
    });

    it('clamps beyond the end to the last frame', () => {
        const { thumbnailAt } = loaded(13);
        expect(thumbnailAt(1000)).toEqual({ url: SPRITE, x: 0, y: 100 });
    });

    it('clamps before the start to the first frame', () => {
        const { thumbnailAt } = loaded(13);
        expect(thumbnailAt(-50)).toEqual({ url: SPRITE, x: 0, y: 0 });
    });

    it('quantizes to the NEAREST midpoint entry (no between-cell interpolation)', () => {
        const { thumbnailAt } = loaded(13);
        // t=57: closer to idx5 (t55, Δ2) than idx6 (t65, Δ8) → col 5 row 0.
        expect(thumbnailAt(57)).toEqual({ url: SPRITE, x: 100, y: 0 });
        // t=63: closer to idx6 (t65, Δ2) than idx5 (t55, Δ8) → col 0 row 1.
        expect(thumbnailAt(63)).toEqual({ url: SPRITE, x: 0, y: 50 });
    });

    it('never returns a CSS shorthand string (finding 001(b))', () => {
        const { thumbnailAt } = loaded(13);
        const result = thumbnailAt(65);
        expect(typeof result).toBe('object');
        // The old defect was the returned STRING itself being a `url(...) x% y%`
        // shorthand; assert no serialized form of the parts carries one.
        expect(JSON.stringify(result)).not.toMatch(/url\(/);
        expect(result).toEqual({ url: SPRITE, x: 0, y: 50 });
    });
});

describe('useTrickplay — fetch states', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('sets loading state while fetching', async () => {
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));

        const { fetch, loading } = useTrickplay({ apiBase: () => API_BASE });
        const promise = fetch('media-1');
        expect(loading.value).toBe(true);
        await promise;
        expect(loading.value).toBe(false);
    });

    it('caches data by media ID (positive hits refetch nothing)', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));

        const { fetch, data } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1');
        expect(payloadSpy).toHaveBeenCalledTimes(1);

        await fetch('m1');
        expect(payloadSpy).toHaveBeenCalledTimes(1);
        expect(data.value).toEqual({ sprite_url: SPRITE, timeline: parsedFrames(2) });
    });

    it('does not show loading for cache hits', async () => {
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));

        const { fetch, loading } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1');
        expect(loading.value).toBe(false);

        const promise = fetch('m1');
        expect(loading.value).toBe(false);
        await promise;
    });

    it('sets error message on failure', async () => {
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockRejectedValue(new Error('Network failure'));

        const { fetch, error } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('media-1');
        expect(error.value).toBe('Network failure');
    });
});

describe('useTrickplay — negative cache honours (finding phlix-ui-player-052)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('honours a cached negative — a failed media id is NOT refetched on every hover', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockRejectedValue(new Error('404 not found'));

        const { fetch, data } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('media-gone');
        expect(payloadSpy).toHaveBeenCalledTimes(1);
        expect(data.value).toBeNull();

        await fetch('media-gone');
        await fetch('media-gone');
        // The old guard fell through on a cached null → refetch storm per hover.
        expect(payloadSpy).toHaveBeenCalledTimes(1);
        expect(data.value).toBeNull();
    });

    it('still retries a media id whose fetch was ABORTED — cancellation is not absence (audit #11)', async () => {
        const abortErr = Object.assign(new Error('aborted'), { name: 'AbortError' });
        const spy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockRejectedValue(abortErr);

        const { fetch, data } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('media-race'); // loses a hover race → AbortError, never cached
        expect(data.value).toBeNull();

        spy.mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));
        await fetch('media-race'); // same id again — must hit the network, not a cached null
        expect(spy).toHaveBeenCalledTimes(2);
        expect(data.value).toEqual({ sprite_url: SPRITE, timeline: parsedFrames(2) });
    });
});

describe('useTrickplay — real signal merge (finding phlix-ui-player-052)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('component (opts) signal aborts a caller-initiated in-flight fetch — either source must cancel', async () => {
        const caller = new AbortController();
        const component = new AbortController();
        let captured: AbortSignal | undefined;
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockImplementation((_id, signal) => {
            captured = signal ?? undefined;
            return new Promise<never>(() => {}); // stays in-flight
        });

        const { fetch } = useTrickplay({ apiBase: () => API_BASE, signal: component.signal });
        void fetch('media-merge', caller.signal);

        expect(captured).toBeDefined();
        expect(captured?.aborted).toBe(false);
        component.abort();
        // The old `signal ?? opts.signal` passed the caller signal RAW — the
        // component signal was silently dropped whenever a caller supplied one.
        expect(captured?.aborted).toBe(true);
    });

    it('caller signal aborts the same merged request', async () => {
        const caller = new AbortController();
        const component = new AbortController();
        let captured: AbortSignal | undefined;
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockImplementation((_id, signal) => {
            captured = signal ?? undefined;
            return new Promise<never>(() => {});
        });

        const { fetch } = useTrickplay({ apiBase: () => API_BASE, signal: component.signal });
        void fetch('media-merge', caller.signal);

        expect(captured).toBeDefined();
        caller.abort();
        expect(captured?.aborted).toBe(true);
    });

    it('threads the merged signal through BOTH fetch legs', async () => {
        const caller = new AbortController();
        let captured: AbortSignal | undefined;
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockImplementation((_id, signal) => {
            captured = signal ?? undefined;
            return Promise.resolve(wirePayload());
        });
        const timelineSpy = vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));

        const { fetch } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('m1', caller.signal);

        expect(captured).toBeDefined();
        expect(timelineSpy.mock.calls[0][2]).toBe(captured);
    });

    it('short-circuits when the caller signal is already aborted', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());

        const { fetch, loading, data } = useTrickplay({ apiBase: () => API_BASE });
        const ac = new AbortController();
        ac.abort();
        await fetch('media-aborted', ac.signal);

        expect(payloadSpy).not.toHaveBeenCalled();
        expect(loading.value).toBe(false);
        expect(data.value).toBeNull();
    });

    it('short-circuits when the component signal is already aborted (no caller signal)', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        const component = new AbortController();
        component.abort();

        const { fetch, loading, data } = useTrickplay({ apiBase: () => API_BASE, signal: component.signal });
        await fetch('media-aborted-opts');

        expect(payloadSpy).not.toHaveBeenCalled();
        expect(loading.value).toBe(false);
        expect(data.value).toBeNull();
    });
});

describe('useTrickplay — reset', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('clears data, loading, and error', async () => {
        vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));

        const { fetch, reset, data, loading, error } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('media-1');
        expect(data.value).not.toBeNull();

        reset();
        expect(data.value).toBeNull();
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it('clears the cache — after reset the SAME media id refetches (positives AND negatives)', async () => {
        const payloadSpy = vi.spyOn(ApiClient.prototype, 'getTrickplay').mockResolvedValue(wirePayload());
        vi.spyOn(ApiClient.prototype, 'get').mockResolvedValue(wireTimeline(2));

        const { fetch, reset } = useTrickplay({ apiBase: () => API_BASE });
        await fetch('media-1');
        reset();
        await fetch('media-1');
        expect(payloadSpy).toHaveBeenCalledTimes(2);

        // A cached negative clears too: failed → reset → retried on the wire.
        payloadSpy.mockRejectedValueOnce(new Error('gone'));
        await fetch('media-2');
        reset();
        payloadSpy.mockResolvedValue(wirePayload());
        await fetch('media-2');
        expect(payloadSpy).toHaveBeenCalledTimes(4); // media-1 ×2 + media-2 ×2
    });
});
