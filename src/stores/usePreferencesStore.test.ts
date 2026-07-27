/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia, disposePinia, type Pinia } from 'pinia';
import { usePreferencesStore, readStoredPreferences, DEFAULT_PREFERENCES, DEFAULT_CAPTION_STYLE } from './usePreferencesStore';

function mockMatchMedia(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: reduce && q.includes('reduce'),
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

/**
 * Every pinia this file has activated, so it can be torn down again.
 *
 * This store PERSISTS: a deep `watch(snapshot, …)` on a 250 ms debounce, plus a
 * `pagehide` flush listener. `setActivePinia(createPinia())` only swaps which
 * instance is *active* — it does not stop the previous one, so a bare
 * `beforeEach` left every earlier store's watcher live and its pending debounce
 * scheduled. Those late-flushed a STALE snapshot into `localStorage` during a
 * LATER test (real timers survive `vi.useRealTimers()`, which only discards a
 * fake clock — that is why the obvious "reset timers" fix never worked), and a
 * dispatched `pagehide` reached N accumulated listeners at once. Symptom: the
 * debounce suite's `expect(midStored).toBeNull()` failing intermittently
 * depending on test order/timing.
 *
 * `disposePinia()` stops `pinia._e`, which stops each store's effect scope; the
 * store's `onScopeDispose` then clears its pending timer and removes its
 * `pagehide` listener. Tests that need a second pinia mid-test (to re-hydrate
 * from a seeded blob) call `freshPinia()` so that one is tracked too.
 */
let activePinia: Pinia | null = null;
function freshPinia(): Pinia {
  if (activePinia) disposePinia(activePinia);
  activePinia = createPinia();
  setActivePinia(activePinia);
  return activePinia;
}

beforeEach(() => {
  localStorage.clear();
  mockMatchMedia(false);
  freshPinia();
});

afterEach(() => {
  // Dispose BEFORE restoring timers/mocks so no watcher can schedule anything
  // during teardown, and so the last test's store cannot outlive this file.
  if (activePinia) disposePinia(activePinia);
  activePinia = null;
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('usePreferencesStore', () => {
  it('starts from defaults when storage is empty', () => {
    const s = usePreferencesStore();
    expect(s.theme).toBe(DEFAULT_PREFERENCES.theme);
    expect(s.accent).toBeNull();
    expect(s.density).toBe('comfortable');
  });

  it('persists changes to localStorage', async () => {
    vi.useFakeTimers();
    const s = usePreferencesStore();
    s.theme = 'daylight';
    s.accent = '#3366ff';
    await vi.advanceTimersByTimeAsync(0);
    await vi.runAllTimersAsync();
    const raw = JSON.parse(localStorage.getItem('phlix.prefs')!);
    expect(raw.theme).toBe('daylight');
    expect(raw.accent).toBe('#3366ff');
  });

  it('readStoredPreferences merges stored over defaults and survives bad JSON', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'midnight', cardSize: 240 }));
    const p = readStoredPreferences();
    expect(p.theme).toBe('midnight');
    expect(p.cardSize).toBe(240);
    expect(p.autoplay).toBe(DEFAULT_PREFERENCES.autoplay); // default kept
    localStorage.setItem('phlix.prefs', '{not json');
    expect(readStoredPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it('hydrates from existing storage on init', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'midnight', density: 'compact' }));
    freshPinia();
    const s = usePreferencesStore();
    expect(s.theme).toBe('midnight');
    expect(s.density).toBe('compact');
  });

  it('effectiveReducedMotion resolves auto against the OS and respects on/off override', () => {
    mockMatchMedia(true);
    freshPinia();
    const s = usePreferencesStore();
    expect(s.reducedMotion).toBe('auto');
    expect(s.effectiveReducedMotion).toBe(true); // auto + OS reduce
    s.reducedMotion = 'off';
    expect(s.effectiveReducedMotion).toBe(false); // forced off beats OS
    s.reducedMotion = 'on';
    expect(s.effectiveReducedMotion).toBe(true);
  });

  it('reset() returns to defaults', () => {
    const s = usePreferencesStore();
    s.theme = 'daylight';
    s.cardSize = 300;
    s.reset();
    expect(s.theme).toBe('nocturne');
    expect(s.cardSize).toBe(DEFAULT_PREFERENCES.cardSize);
  });

  it('no longer carries the vestigial seriesThemeAutoplay preference (U4)', () => {
    // Theme music moved from a series-only Settings pref to MediaDetail's
    // muted-autoplay-first policy (persisted via `phlix.theme.muted`), so this key
    // is gone from the defaults, the store, and the persisted snapshot.
    expect('seriesThemeAutoplay' in DEFAULT_PREFERENCES).toBe(false);
    const s = usePreferencesStore();
    expect('seriesThemeAutoplay' in s.snapshot()).toBe(false);
    expect((s as unknown as Record<string, unknown>).seriesThemeAutoplay).toBeUndefined();
    // A legacy persisted value must NOT resurrect into the snapshot the store saves.
    localStorage.setItem('phlix.prefs', JSON.stringify({ seriesThemeAutoplay: true }));
    freshPinia();
    expect('seriesThemeAutoplay' in usePreferencesStore().snapshot()).toBe(false);
  });

  describe('tv (TV mode flag)', () => {
    it('defaults to false', () => {
      expect(DEFAULT_PREFERENCES.tv).toBe(false);
      expect(usePreferencesStore().tv).toBe(false);
    });

    it('persists into the prefs blob', async () => {
      vi.useFakeTimers();
      const s = usePreferencesStore();
      s.tv = true;
      await vi.advanceTimersByTimeAsync(0);
      await vi.runAllTimersAsync();
      const raw = JSON.parse(localStorage.getItem('phlix.prefs')!);
      expect(raw.tv).toBe(true);
    });

    it('hydrates from storage', () => {
      localStorage.setItem('phlix.prefs', JSON.stringify({ tv: true }));
      freshPinia();
      const s = usePreferencesStore();
      expect(s.tv).toBe(true);
    });

    it('is included in snapshot()', () => {
      const s = usePreferencesStore();
      s.tv = true;
      expect(s.snapshot().tv).toBe(true);
    });

    it('reset() clears it back to false', () => {
      const s = usePreferencesStore();
      s.tv = true;
      s.reset();
      expect(s.tv).toBe(false);
    });
  });

  describe('viewMode (S67 — alternate section views)', () => {
    it('defaults to the poster grid', () => {
      expect(DEFAULT_PREFERENCES.viewMode).toBe('grid');
      expect(usePreferencesStore().viewMode).toBe('grid');
    });

    it('persists into the prefs blob', async () => {
      vi.useFakeTimers();
      const s = usePreferencesStore();
      s.viewMode = 'list';
      await vi.advanceTimersByTimeAsync(0);
      await vi.runAllTimersAsync();
      const raw = JSON.parse(localStorage.getItem('phlix.prefs')!);
      expect(raw.viewMode).toBe('list');
    });

    it('hydrates from storage (survives a reload)', () => {
      localStorage.setItem('phlix.prefs', JSON.stringify({ viewMode: 'table' }));
      freshPinia();
      const s = usePreferencesStore();
      expect(s.viewMode).toBe('table');
    });

    it('hydrates a pre-S67 blob (no viewMode key) to the default, not undefined', () => {
      // The persisted blob of an existing user predates the key entirely.
      localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'midnight', cardSize: 240 }));
      expect(readStoredPreferences().viewMode).toBe('grid');
      freshPinia();
      const s = usePreferencesStore();
      expect(s.viewMode).toBe('grid');
      expect(s.viewMode).not.toBeUndefined();
      expect(s.snapshot().viewMode).toBe('grid');
    });

    it('is included in snapshot()', () => {
      const s = usePreferencesStore();
      s.viewMode = 'backdrop';
      expect(s.snapshot().viewMode).toBe('backdrop');
    });

    it('reset() returns to the grid', () => {
      const s = usePreferencesStore();
      s.viewMode = 'backdrop';
      s.reset();
      expect(s.viewMode).toBe('grid');
    });
  });

  describe('subtitlePreferenceSet (U4 — explicit Off vs no-preference)', () => {
    it('defaults to false (no caption choice made yet)', () => {
      expect(DEFAULT_PREFERENCES.subtitlePreferenceSet).toBe(false);
      expect(usePreferencesStore().subtitlePreferenceSet).toBe(false);
    });

    it('is persisted into the prefs blob', async () => {
      vi.useFakeTimers();
      const s = usePreferencesStore();
      s.subtitlePreferenceSet = true;
      await vi.advanceTimersByTimeAsync(0);
      await vi.runAllTimersAsync();
      const raw = JSON.parse(localStorage.getItem('phlix.prefs')!);
      expect(raw.subtitlePreferenceSet).toBe(true);
    });

    it('hydrates from storage (an explicit Off survives a reload)', () => {
      // defaultSubtitleLang null + the flag true == an explicit Off.
      localStorage.setItem(
        'phlix.prefs',
        JSON.stringify({ defaultSubtitleLang: null, subtitlePreferenceSet: true }),
      );
      freshPinia();
      const s = usePreferencesStore();
      expect(s.defaultSubtitleLang).toBeNull();
      expect(s.subtitlePreferenceSet).toBe(true);
    });

    it('reset() clears the flag back to false', () => {
      const s = usePreferencesStore();
      s.subtitlePreferenceSet = true;
      s.reset();
      expect(s.subtitlePreferenceSet).toBe(false);
    });
  });

  describe('filter presets', () => {
    it('saves a preset, persists it, and overwrites by name (stable id)', async () => {
      vi.useFakeTimers();
      const s = usePreferencesStore();
      const p = s.saveFilterPreset('Sci-Fi Nights', { genres: ['Sci-Fi'], ratings: ['R'] });
      expect(p.id).toBe('sci-fi-nights');
      expect(s.filterPresets).toHaveLength(1);
      expect(s.filterPresets[0].query).toEqual({ genres: ['Sci-Fi'], ratings: ['R'] });

      // persisted into the prefs blob
      await vi.advanceTimersByTimeAsync(0);
      await vi.runAllTimersAsync();
      const stored = JSON.parse(localStorage.getItem('phlix.prefs') as string);
      expect(stored.filterPresets[0].name).toBe('Sci-Fi Nights');

      // re-saving the same name overwrites rather than duplicating
      s.saveFilterPreset('Sci-Fi Nights', { genres: ['Sci-Fi'] });
      expect(s.filterPresets).toHaveLength(1);
      expect(s.filterPresets[0].query).toEqual({ genres: ['Sci-Fi'] });
    });

    it('removes a preset by id', () => {
      const s = usePreferencesStore();
      s.saveFilterPreset('A', { genres: ['Action'] });
      s.saveFilterPreset('B', { genres: ['Drama'] });
      expect(s.filterPresets).toHaveLength(2);
      s.removeFilterPreset('a');
      expect(s.filterPresets.map((p) => p.name)).toEqual(['B']);
    });

    it('reset() clears saved presets', () => {
      const s = usePreferencesStore();
      s.saveFilterPreset('Keep?', { genres: ['Action'] });
      s.reset();
      expect(s.filterPresets).toEqual([]);
    });

    it('hydrates presets from storage', () => {
      localStorage.setItem(
        'phlix.prefs',
        JSON.stringify({ filterPresets: [{ id: 'x', name: 'X', query: { genres: ['Sci-Fi'] } }] }),
      );
      const fresh = readStoredPreferences();
      expect(fresh.filterPresets).toHaveLength(1);
      freshPinia();
      const s = usePreferencesStore();
      expect(s.filterPresets[0].name).toBe('X');
    });
  });

  describe('caption style (R3.5)', () => {
    it('defaults to DEFAULT_CAPTION_STYLE', () => {
      const s = usePreferencesStore();
      expect(s.captionStyle).toEqual(DEFAULT_CAPTION_STYLE);
    });

    it('persists caption-style changes to localStorage', async () => {
      vi.useFakeTimers();
      const s = usePreferencesStore();
      s.captionStyle = { ...s.captionStyle, size: 'xl', textColor: '#ffd400' };
      await vi.advanceTimersByTimeAsync(0);
      await vi.runAllTimersAsync();
      const raw = JSON.parse(localStorage.getItem('phlix.prefs') as string);
      expect(raw.captionStyle.size).toBe('xl');
      expect(raw.captionStyle.textColor).toBe('#ffd400');
    });

    it('merges a stored PARTIAL caption style over the defaults (no dropped keys)', () => {
      localStorage.setItem('phlix.prefs', JSON.stringify({ captionStyle: { size: 'lg' } }));
      freshPinia();
      const s = usePreferencesStore();
      expect(s.captionStyle.size).toBe('lg'); // stored wins
      expect(s.captionStyle.textColor).toBe(DEFAULT_CAPTION_STYLE.textColor); // default kept
      expect(s.captionStyle.background).toBe(DEFAULT_CAPTION_STYLE.background);
      expect(s.captionStyle.edge).toBe(DEFAULT_CAPTION_STYLE.edge);
    });

    it('reset() restores the default caption style', () => {
      const s = usePreferencesStore();
      s.captionStyle = { ...s.captionStyle, size: 'sm', edge: 'outline' };
      s.reset();
      expect(s.captionStyle).toEqual(DEFAULT_CAPTION_STYLE);
    });

    it('never mutates the shared DEFAULT_CAPTION_STYLE through the store', () => {
      const s = usePreferencesStore();
      s.captionStyle.size = 'xl'; // direct mutation of the ref object
      expect(DEFAULT_CAPTION_STYLE.size).toBe('md'); // shared default untouched
    });
  });

  describe('debounced persistence', () => {
    // This test COUNTS writes, and spaces its changes across ticks, because the
    // obvious way to write it does neither and passes on a store with no debounce
    // at all (S118). Two facts make the naive version vacuous:
    //
    //  1. `watch(snapshot, debouncedPersist, { deep: true })`
    //     (usePreferencesStore.ts:294) does NOT pass `flush: 'sync'`, so it uses
    //     Vue's default 'pre' flush — a microtask. Ten assignments made in one
    //     synchronous loop therefore produce ZERO watcher calls before the next
    //     `await`, so reading localStorage straight after the loop returns null
    //     whether or not persistence is debounced.
    //  2. Vue then COALESCES those ten same-tick mutations into ONE watcher call,
    //     so `debouncedPersist` runs once and the `clearTimeout` on
    //     usePreferencesStore.ts:287 — the line that does the actual coalescing —
    //     is never exercised.
    //
    // Verified by mutation: with the loop unspaced and the assertions reading
    // localStorage, this test still PASSED after (a) deleting the debounce and
    // persisting synchronously, and (b) deleting the `clearTimeout`. As written
    // below, both of those mutants fail it.
    it('debounces rapid changes — N rapid ticks results in a single localStorage write', async () => {
      vi.useFakeTimers();

      const s = usePreferencesStore();
      const setItem = vi.spyOn(Storage.prototype, 'setItem');

      try {
        // Ten changes spread across the drag rather than within one tick, so the
        // store's watcher actually fires for each. 10 ms apart keeps all ten
        // inside the single 250 ms debounce window.
        for (let i = 0; i < 10; i++) {
          s.cardSize = 100 + i;
          await vi.advanceTimersByTimeAsync(10);
        }

        // Still inside the window: the debounce must be holding every one of them.
        expect(setItem).not.toHaveBeenCalled();
        expect(localStorage.getItem('phlix.prefs')).toBeNull();

        // Advance past 250 ms — the ten changes coalesce into exactly ONE write.
        await vi.advanceTimersByTimeAsync(300);
        await vi.runAllTimersAsync();

        expect(setItem).toHaveBeenCalledTimes(1);
        const stored = JSON.parse(localStorage.getItem('phlix.prefs')!);
        // ...and it carries the LAST value, not an intermediate one.
        expect(stored.cardSize).toBe(109);
      } finally {
        setItem.mockRestore();
      }
    });

    it('each debounce window persists its own change independently', async () => {
      vi.useFakeTimers();
      const s = usePreferencesStore();

      // First change + debounce fires
      s.cardSize = 150;
      await vi.advanceTimersByTimeAsync(300);
      await vi.runAllTimersAsync();
      expect(JSON.parse(localStorage.getItem('phlix.prefs')!).cardSize).toBe(150);

      // Second, separate debounce window
      s.cardSize = 200;
      await vi.advanceTimersByTimeAsync(300);
      await vi.runAllTimersAsync();
      expect(JSON.parse(localStorage.getItem('phlix.prefs')!).cardSize).toBe(200);
    });
  });

  describe('pagehide flush', () => {
    it('flushes pending debounced writes immediately on pagehide', async () => {
      vi.useFakeTimers();
      const s = usePreferencesStore();

      // Make a change — debounce timer is pending (not yet fired)
      s.cardSize = 400;

      // Simulate pagehide — must flush synchronously without waiting 250 ms
      const event = new Event('pagehide');
      Object.defineProperty(event, 'persisted', { value: false });
      window.dispatchEvent(event);

      // Value written immediately despite pending debounce
      const stored = JSON.parse(localStorage.getItem('phlix.prefs')!);
      expect(stored.cardSize).toBe(400);
    });
  });

  /**
   * Regression guard for the cross-test flake this suite used to have (program
   * follow-up 8). The store's two long-lived pieces — the 250 ms debounce timer and
   * the `pagehide` listener — must both die with the store, or a pinia that is
   * merely REPLACED (what `setActivePinia(createPinia())` does) leaves them running
   * and a stale snapshot lands in `localStorage` in the middle of a later test.
   *
   * Deliberately driven by fake timers, so it asserts the mechanism rather than
   * racing it: `advanceTimersByTimeAsync` past the debounce window is exactly the
   * real-timer late flush, made deterministic. It fails if either half of the fix
   * is removed — the store's `onScopeDispose`, or `freshPinia()`'s `disposePinia`.
   */
  describe('disposal (test isolation)', () => {
    it('a replaced pinia’s store neither late-flushes nor answers pagehide', async () => {
      vi.useFakeTimers();
      const stale = usePreferencesStore();
      stale.cardSize = 321; // arms the 250 ms debounce
      await vi.advanceTimersByTimeAsync(0); // let the deep watcher run
      expect(localStorage.getItem('phlix.prefs')).toBeNull(); // still only pending

      freshPinia(); // exactly what beforeEach does between tests
      localStorage.clear();

      // The stale debounce window passes with nobody left to service it.
      await vi.advanceTimersByTimeAsync(1000);
      expect(
        localStorage.getItem('phlix.prefs'),
        'a disposed store late-flushed a stale snapshot into a later test',
      ).toBeNull();

      // ...and its pagehide listener was removed, so one dispatched event no
      // longer makes every store this file ever created write its own snapshot.
      window.dispatchEvent(new Event('pagehide'));
      expect(
        localStorage.getItem('phlix.prefs'),
        'a disposed store still answers pagehide',
      ).toBeNull();
    });
  });
});
