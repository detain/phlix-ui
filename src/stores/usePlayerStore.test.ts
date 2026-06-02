import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePlayerStore, RESUME_MIN_SECONDS } from './usePlayerStore';
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
