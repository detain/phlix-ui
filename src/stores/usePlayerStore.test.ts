/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePlayerStore, RESUME_MIN_SECONDS, RESUME_MAX_ENTRIES } from './usePlayerStore';
import { usePreferencesStore } from './usePreferencesStore';
import type { MediaItem } from '../types/media-item';

function media(id: string, over: Partial<MediaItem> = {}): MediaItem {
  return {
    id,
    name: `Movie ${id}`,
    type: 'movie',
    poster_url: `https://x/${id}.jpg`,
    genres: ['Sci-Fi'],
    year: 2024,
    rating: 'PG-13',
    runtime: 120,
    overview: null,
    actors: [],
    director: 'D',
    created_at: null,
    updated_at: null,
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('matchMedia', vi.fn((q: string) => ({
    matches: false, media: q, addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  })));
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('usePlayerStore — transport + seeding', () => {
  it('seeds volume/quality/subtitle from preferences', () => {
    const prefs = usePreferencesStore();
    prefs.defaultVolume = 0.4;
    prefs.defaultQuality = '1080p';
    prefs.defaultSubtitleLang = 'en';
    const p = usePlayerStore();
    p.seedFromPreferences();
    expect(p.volume).toBe(0.4);
    expect(p.quality).toBe('1080p');
    expect(p.subtitleLang).toBe('en');
  });

  it('setCurrent resets transport + setVolume clamps and unmutes', () => {
    const p = usePlayerStore();
    p.position = 50; p.duration = 100;
    p.setCurrent(media('a'));
    expect(p.current?.id).toBe('a');
    expect(p.position).toBe(0);
    p.muted = true;
    p.setVolume(1.5);
    expect(p.volume).toBe(1);
    expect(p.muted).toBe(false);
    p.setVolume(-1);
    expect(p.volume).toBe(0);
    p.toggleMute();
    expect(p.muted).toBe(true);
  });

  it('setCurrent seeds duration from the server-probed media.duration (seconds)', () => {
    const p = usePlayerStore();
    p.setCurrent(media('seed', { duration: 7200 }));
    expect(p.duration).toBe(7200);
  });

  it('setCurrent resets duration to 0 when media.duration is absent/invalid', () => {
    const p = usePlayerStore();
    p.duration = 999;
    p.setCurrent(media('a', { duration: null }));
    expect(p.duration).toBe(0);
    p.duration = 999;
    p.setCurrent(media('b', { duration: 0 }));
    expect(p.duration).toBe(0);
    p.duration = 999;
    p.setCurrent(media('c', { duration: Infinity }));
    expect(p.duration).toBe(0);
  });

  it('updateProgress never shrinks a seeded duration but adopts a larger element duration', () => {
    const p = usePlayerStore();
    p.setCurrent(media('seed', { duration: 7200 }));
    // a small/growing element duration (transcode/HLS still loading) must not shrink it
    p.updateProgress(10, 30);
    expect(p.duration).toBe(7200);
    // an element duration LARGER than the seed is adopted (probe was an underestimate)
    p.updateProgress(20, 7300);
    expect(p.duration).toBe(7300);
    // a non-finite element duration is ignored
    p.updateProgress(30, Infinity);
    expect(p.duration).toBe(7300);
  });

  it('updateProgress without a seed adopts the first element duration (no shrink below 0)', () => {
    const p = usePlayerStore();
    p.setCurrent(media('noseed', { duration: null }));
    expect(p.duration).toBe(0);
    // with no seed the FIRST element duration is adopted as-is (original behavior)
    p.updateProgress(5, 30);
    expect(p.duration).toBe(30);
    // thereafter a known length is never shrunk by a smaller element duration
    // (the same no-shrink guard now protects an element-derived total too)
    p.updateProgress(6, 25);
    expect(p.duration).toBe(30);
    // but a larger element duration is still adopted
    p.updateProgress(7, 35);
    expect(p.duration).toBe(35);
  });

  it('progress + play/pause flags', () => {
    const p = usePlayerStore();
    p.updateProgress(30, 120);
    expect(p.progress).toBeCloseTo(0.25);
    p.play();
    expect(p.playing).toBe(true);
    p.pause();
    expect(p.playing).toBe(false);
  });
});

describe('usePlayerStore — command bus (external transport seam)', () => {
  it('seekTo records an absolute seekTo command with a fresh seq', () => {
    const p = usePlayerStore();
    expect(p.lastCommand).toBeNull();
    p.seekTo(30);
    expect(p.lastCommand).toEqual({ type: 'seekTo', value: 30, seq: expect.any(Number) });
    expect(p.lastCommand?.type).toBe('seekTo');
    expect(p.lastCommand?.value).toBe(30);
  });

  it('seekBy records a relative seekBy command', () => {
    const p = usePlayerStore();
    p.seekBy(10);
    expect(p.lastCommand?.type).toBe('seekBy');
    expect(p.lastCommand?.value).toBe(10);
  });

  it('seq strictly increments across calls (identical successive commands differ)', () => {
    const p = usePlayerStore();
    p.seekBy(10);
    const first = p.lastCommand!.seq;
    p.seekBy(10); // same type+value, must still re-trigger
    const second = p.lastCommand!.seq;
    expect(second).toBeGreaterThan(first);
    p.seekTo(5);
    expect(p.lastCommand!.seq).toBeGreaterThan(second);
  });

  it('playLocalFile sets current + streamUrl and clears the queue', () => {
    const p = usePlayerStore();
    p.setQueue([media('q1'), media('q2')]);
    p.playLocalFile('file:///movies/My%20Film.mkv');
    expect(p.current?.id).toBe('local');
    expect(p.current?.name).toBe('My Film.mkv'); // url basename, decoded
    expect(p.current?.type).toBe('movie');
    expect(p.streamUrl).toBe('file:///movies/My%20Film.mkv');
    expect(p.position).toBe(0);
    expect(p.queue).toEqual([]);
  });

  it('playLocalFile honours a provided title/meta override', () => {
    const p = usePlayerStore();
    p.playLocalFile('http://x/clip.mp4', { name: 'Custom Title' });
    expect(p.current?.name).toBe('Custom Title');
    expect(p.streamUrl).toBe('http://x/clip.mp4');
  });
});

describe('usePlayerStore — resume map', () => {
  it('saves a resume position only inside the 30s–95% band', () => {
    const p = usePlayerStore();
    p.saveResume('a', RESUME_MIN_SECONDS - 1, 120); // too early
    expect(p.resumePositionFor('a')).toBeNull();
    p.saveResume('a', 60, 120); // in band
    expect(p.resumePositionFor('a')).toBe(60);
    p.saveResume('a', 119, 120); // > 95% → finished, cleared
    expect(p.resumePositionFor('a')).toBeNull();
  });

  it('inResumeBand boundary logic', () => {
    const p = usePlayerStore();
    expect(p.inResumeBand(31, 120)).toBe(true);
    expect(p.inResumeBand(30, 120)).toBe(false); // not strictly >30
    expect(p.inResumeBand(114, 120)).toBe(false); // == 95%
    expect(p.inResumeBand(50, 0)).toBe(false); // unknown duration
  });

  it('updateProgress records resume for the current media; clearResume removes it', () => {
    const p = usePlayerStore();
    p.setCurrent(media('b'));
    p.updateProgress(70, 120);
    expect(p.resumePositionFor('b')).toBe(70);
    p.clearResume('b');
    expect(p.resumePositionFor('b')).toBeNull();
  });

  it('persists the resume map (throttled) and reloads it', () => {
    vi.useFakeTimers();
    const p = usePlayerStore();
    p.setCurrent(media('c'));
    p.updateProgress(80, 120); // first write is immediate (lastPersist=0)
    expect(JSON.parse(localStorage.getItem('phlix.resume')!).c).toBe(80);
    // a fresh store reloads from storage
    setActivePinia(createPinia());
    const p2 = usePlayerStore();
    expect(p2.resumePositionFor('c')).toBe(80);
  });

  it('pause forces an immediate persist', () => {
    const p = usePlayerStore();
    p.setCurrent(media('d'));
    p.position = 65; p.duration = 120;
    p.pause();
    expect(JSON.parse(localStorage.getItem('phlix.resume')!).d).toBe(65);
  });
});

describe('usePlayerStore — queue + mini-player', () => {
  it('setQueue/enqueue/upNext/next advance the queue', () => {
    const p = usePlayerStore();
    p.setQueue([media('q1'), media('q2')]);
    expect(p.upNext?.id).toBe('q1');
    const n = p.next();
    expect(n?.id).toBe('q1');
    expect(p.current?.id).toBe('q1');
    expect(p.upNext?.id).toBe('q2');
    p.enqueue(media('q3'));
    expect(p.queue.map((m) => m.id)).toEqual(['q2', 'q3']);
    p.next(); p.next();
    expect(p.next()).toBeNull(); // empty
  });

  it('mini-player show/hide + closePlayer clears + persists resume', () => {
    const p = usePlayerStore();
    p.setCurrent(media('e'));
    p.updateProgress(50, 120);
    p.showMiniPlayer();
    expect(p.miniPlayer).toBe(true);
    p.hideMiniPlayer();
    expect(p.miniPlayer).toBe(false);
    p.closePlayer();
    expect(p.current).toBeNull();
    expect(p.playing).toBe(false);
    expect(JSON.parse(localStorage.getItem('phlix.resume')!).e).toBe(50);
  });

  it('setCurrent stores the streamUrl (so a mini-player can continue it) and closePlayer clears it', () => {
    const p = usePlayerStore();
    p.setCurrent(media('e'), { streamUrl: 'http://x/e/stream' });
    expect(p.streamUrl).toBe('http://x/e/stream');
    // a setCurrent without a streamUrl leaves the existing one untouched
    p.setCurrent(media('e'), { resetPosition: false });
    expect(p.streamUrl).toBe('http://x/e/stream');
    p.closePlayer();
    expect(p.streamUrl).toBe('');
  });

  it('next(resolver) threads a fresh stream URL for the advanced item and resets position', () => {
    const p = usePlayerStore();
    p.setCurrent(media('q1'), { streamUrl: 'http://x/q1/stream' });
    p.updateProgress(40, 120);
    p.setQueue([media('q2')]);
    const n = p.next((m) => `http://x/${m.id}/stream`);
    expect(n?.id).toBe('q2');
    expect(p.streamUrl).toBe('http://x/q2/stream');
    expect(p.position).toBe(0); // setCurrent resets for the new item
  });

  it('next() without a resolver CLEARS the stream URL (never leaves a stale one)', () => {
    const p = usePlayerStore();
    p.setCurrent(media('q1'), { streamUrl: 'http://x/q1/stream' });
    p.setQueue([media('q2')]);
    p.next(); // no resolver
    expect(p.current?.id).toBe('q2');
    expect(p.streamUrl).toBe(''); // not the stale q1 URL
  });

  it('next() on an empty queue returns null and leaves current + streamUrl intact', () => {
    const p = usePlayerStore();
    p.setCurrent(media('q1'), { streamUrl: 'http://x/q1/stream' });
    expect(p.next()).toBeNull();
    expect(p.current?.id).toBe('q1');
    expect(p.streamUrl).toBe('http://x/q1/stream');
  });
});

describe('usePlayerStore — Media Session', () => {
  it('no-ops gracefully when mediaSession is unavailable', () => {
    const p = usePlayerStore();
    expect(() => p.setMediaSessionMetadata(media('a'))).not.toThrow();
    const teardown = p.bindMediaSession({ onPlay: vi.fn() });
    expect(typeof teardown).toBe('function');
    expect(() => teardown()).not.toThrow();
  });

  it('sets metadata + wires handlers when mediaSession exists', () => {
    const setActionHandler = vi.fn();
    const ms: { metadata: unknown; playbackState: string; setActionHandler: typeof setActionHandler } = {
      metadata: null,
      playbackState: 'none',
      setActionHandler,
    };
    vi.stubGlobal('navigator', { mediaSession: ms });
    class MM {
      constructor(public init: unknown) {}
    }
    vi.stubGlobal('MediaMetadata', MM);
    const p = usePlayerStore();
    p.setCurrent(media('a', { name: 'Dune' }));
    expect(ms.metadata).toBeInstanceOf(MM);
    const onPlay = vi.fn();
    const onNext = vi.fn();
    p.bindMediaSession({ onPlay, onNext, onSeek: vi.fn() });
    const actions = setActionHandler.mock.calls.map((c) => c[0]);
    expect(actions).toContain('play');
    expect(actions).toContain('nexttrack');
    expect(actions).toContain('seekto');
    p.play();
    expect(ms.playbackState).toBe('playing');
    p.pause();
    expect(ms.playbackState).toBe('paused');
  });

  it('setMediaPositionState pushes duration/position/rate to the OS scrubber', () => {
    const setPositionState = vi.fn();
    vi.stubGlobal('navigator', {
      mediaSession: { metadata: null, playbackState: 'none', setActionHandler: vi.fn(), setPositionState },
    });
    const p = usePlayerStore();
    p.updateProgress(40, 200);
    p.setRate(1.5);
    p.setMediaPositionState();
    expect(setPositionState).toHaveBeenCalledWith({ duration: 200, position: 40, playbackRate: 1.5 });
  });

  it('setMediaPositionState no-ops when the duration is unknown', () => {
    const setPositionState = vi.fn();
    vi.stubGlobal('navigator', {
      mediaSession: { metadata: null, playbackState: 'none', setActionHandler: vi.fn(), setPositionState },
    });
    const p = usePlayerStore();
    p.updateProgress(10, 0); // duration 0 → nothing to report
    p.setMediaPositionState();
    expect(setPositionState).not.toHaveBeenCalled();
  });
});

describe('usePlayerStore — mergeServerResume (cross-device read sync)', () => {
  it('fills gaps from the server map but never overwrites a local position', () => {
    const p = usePlayerStore();
    p.saveResume('local-1', 120, 600); // a local position from this device
    expect(p.resumePositionFor('local-1')).toBe(120);

    p.mergeServerResume({ 'local-1': 999, 'server-1': 300 });

    expect(p.resumePositionFor('local-1')).toBe(120); // local wins
    expect(p.resumePositionFor('server-1')).toBe(300); // server fills the gap
  });

  it('ignores non-positive server positions', () => {
    const p = usePlayerStore();
    p.mergeServerResume({ a: 0, b: -5, c: 42 });
    expect(p.resumePositionFor('a')).toBeNull();
    expect(p.resumePositionFor('b')).toBeNull();
    expect(p.resumePositionFor('c')).toBe(42);
  });

  it('persists the merged positions to localStorage', () => {
    const p = usePlayerStore();
    p.mergeServerResume({ x: 77 });
    expect(JSON.parse(localStorage.getItem('phlix.resume') ?? '{}')).toEqual({ x: 77 });
  });
});

describe('usePlayerStore — bounded resume map (LRU + quota retry)', () => {
  // saveResume uses Date.now() to stamp last-touched; advance a fake clock so each
  // write has a strictly increasing timestamp (and thus a deterministic LRU order).
  function saveSequential(p: ReturnType<typeof usePlayerStore>, ids: string[]): void {
    vi.useFakeTimers();
    let t = 1_700_000_000_000;
    for (const id of ids) {
      vi.setSystemTime(t);
      p.saveResume(id, 60, 120); // in-band → recorded + touched
      t += 1000;
    }
    // saveResume persists THROTTLED; flush the pending write so storage reflects the
    // final bounded map (a forced clearResume of an absent id triggers persist(true)).
    p.clearResume('__flush__');
    vi.useRealTimers();
  }

  it('caps the resume map at RESUME_MAX_ENTRIES, retaining the most-recently-touched ids', () => {
    const p = usePlayerStore();
    const total = RESUME_MAX_ENTRIES + 5; // write 5 over the cap
    const ids = Array.from({ length: total }, (_, i) => `m${i}`);
    saveSequential(p, ids);

    expect(Object.keys(p.resumeMap).length).toBe(RESUME_MAX_ENTRIES);
    // the 5 OLDEST ids (m0..m4) are evicted
    for (let i = 0; i < 5; i++) expect(p.resumePositionFor(`m${i}`)).toBeNull();
    // the cap most-recently-touched ids survive (m5..m{total-1})
    for (let i = 5; i < total; i++) expect(p.resumePositionFor(`m${i}`)).toBe(60);
  });

  it('persists exactly the cap most-recently-touched ids (a fresh store reloads them)', () => {
    const p = usePlayerStore();
    const total = RESUME_MAX_ENTRIES + 3;
    const ids = Array.from({ length: total }, (_, i) => `k${i}`);
    saveSequential(p, ids);

    const persisted = JSON.parse(localStorage.getItem('phlix.resume')!) as Record<string, number>;
    expect(Object.keys(persisted).length).toBe(RESUME_MAX_ENTRIES);
    expect(persisted.k0).toBeUndefined(); // oldest evicted from storage too

    setActivePinia(createPinia());
    const p2 = usePlayerStore();
    expect(Object.keys(p2.resumeMap).length).toBe(RESUME_MAX_ENTRIES);
    expect(p2.resumePositionFor('k0')).toBeNull();
    expect(p2.resumePositionFor(`k${total - 1}`)).toBe(60);
  });

  it('re-touching an old id keeps it from being evicted at the cap', () => {
    const p = usePlayerStore();
    vi.useFakeTimers();
    let t = 1_700_000_000_000;
    // Fill exactly to the cap.
    for (let i = 0; i < RESUME_MAX_ENTRIES; i++) {
      vi.setSystemTime(t);
      p.saveResume(`f${i}`, 60, 120);
      t += 1000;
    }
    // Re-touch the OLDEST (f0) so it becomes the most-recently-touched.
    vi.setSystemTime(t);
    p.saveResume('f0', 90, 120);
    t += 1000;
    // One new id pushes over the cap — f1 (now the oldest) should be evicted, NOT f0.
    vi.setSystemTime(t);
    p.saveResume('new', 60, 120);
    vi.useRealTimers();

    expect(Object.keys(p.resumeMap).length).toBe(RESUME_MAX_ENTRIES);
    expect(p.resumePositionFor('f0')).toBe(90); // survived (re-touched)
    expect(p.resumePositionFor('f1')).toBeNull(); // evicted (now oldest)
    expect(p.resumePositionFor('new')).toBe(60);
  });

  it('mergeServerResume respects the cap (evicting oldest local entries)', () => {
    const p = usePlayerStore();
    // Seed the cap with local entries first.
    const ids = Array.from({ length: RESUME_MAX_ENTRIES }, (_, i) => `g${i}`);
    saveSequential(p, ids);
    expect(Object.keys(p.resumeMap).length).toBe(RESUME_MAX_ENTRIES);

    // Merge 3 new server ids — total would be cap+3, must evict back to the cap.
    p.mergeServerResume({ s0: 100, s1: 200, s2: 300 });

    expect(Object.keys(p.resumeMap).length).toBe(RESUME_MAX_ENTRIES);
    // the 3 freshly-merged (most-recently-touched) ids are retained …
    expect(p.resumePositionFor('s0')).toBe(100);
    expect(p.resumePositionFor('s1')).toBe(200);
    expect(p.resumePositionFor('s2')).toBe(300);
    // … at the expense of the 3 oldest local entries (g0..g2)
    expect(p.resumePositionFor('g0')).toBeNull();
    expect(p.resumePositionFor('g1')).toBeNull();
    expect(p.resumePositionFor('g2')).toBeNull();
  });

  it('persists a companion phlix.resume.touched map and reloads it (LRU survives reload)', () => {
    const p = usePlayerStore();
    saveSequential(p, ['t-old', 't-new']);
    const touched = JSON.parse(localStorage.getItem('phlix.resume.touched')!) as Record<string, number>;
    expect(touched['t-old']).toBeLessThan(touched['t-new']);

    // After reload + filling to the cap, the previously-OLDER id evicts first.
    setActivePinia(createPinia());
    const p2 = usePlayerStore();
    vi.useFakeTimers();
    let t = 1_700_000_500_000;
    for (let i = 0; i < RESUME_MAX_ENTRIES - 1; i++) {
      vi.setSystemTime(t);
      p2.saveResume(`r${i}`, 60, 120); // pushes total to cap+1 → one eviction
      t += 1000;
    }
    vi.useRealTimers();
    expect(Object.keys(p2.resumeMap).length).toBe(RESUME_MAX_ENTRIES);
    expect(p2.resumePositionFor('t-old')).toBeNull(); // evicted first (older touch)
    expect(p2.resumePositionFor('t-new')).toBe(60); // survived
  });

  it('a QuotaExceededError on persist triggers eviction + retry and never throws', () => {
    const p = usePlayerStore();
    // Fill the map (well under the cap so the cap-eviction path is NOT the trigger).
    vi.useFakeTimers();
    let t = 1_700_000_000_000;
    for (let i = 0; i < 50; i++) {
      vi.setSystemTime(t);
      p.saveResume(`q${i}`, 60, 120);
      t += 1000;
    }
    vi.useRealTimers();
    expect(Object.keys(p.resumeMap).length).toBe(50);

    // Make setItem throw once (quota), then succeed on the retry write.
    const real = Storage.prototype.setItem;
    let calls = 0;
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (
      this: Storage,
      key: string,
      value: string,
    ) {
      calls += 1;
      if (calls === 1) {
        const err = new DOMException('quota', 'QuotaExceededError');
        throw err;
      }
      return real.call(this, key, value);
    });

    // A forced persist (via clearResume of an absent id → persistResume(true)).
    expect(() => p.clearResume('absent')).not.toThrow();

    // Eviction dropped the oldest ~25% (50 → 37) and the retry persisted them.
    expect(Object.keys(p.resumeMap).length).toBe(37);
    expect(p.resumePositionFor('q0')).toBeNull(); // oldest dropped by quota eviction
    expect(p.resumePositionFor('q49')).toBe(60); // newest retained
    const persisted = JSON.parse(localStorage.getItem('phlix.resume')!) as Record<string, number>;
    expect(Object.keys(persisted).length).toBe(37);
    expect(calls).toBeGreaterThanOrEqual(2); // initial failed write + retry

    spy.mockRestore();
  });

  it('a persistent QuotaExceededError is swallowed (retry also fails, no throw)', () => {
    const p = usePlayerStore();
    p.saveResume('z', 60, 120);
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError');
    });
    expect(() => p.clearResume('z')).not.toThrow();
    spy.mockRestore();
  });
});
