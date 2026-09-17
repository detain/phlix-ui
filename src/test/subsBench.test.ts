/**
 * W114 S533 — TN-6 subtitle budget bench: gate + logic pins.
 *
 * Honesty caveat written where it belongs: jsdom has no real compositor, no
 * media pipeline and no WASM/worker timing worth quoting. So these tests pin
 * ONLY the decision surface — capability probing, mode planning, frame-time
 * math and the ASS/VTT parsing that feeds the real runs. The frame numbers
 * themselves can only come from a browser (the run driver boots headless
 * Chromium; the Tizen legs are reported as unreachable when they are).
 *
 * Pins:
 *  1. token self-pin (this file is the token's only home);
 *  2. resolveModes enumerates all three modes and skips-with-reason what the
 *     platform cannot provide — a skipped mode never produces a number;
 *  3. summarizeFrames nearest-rank p99 + empty-run honesty;
 *  4. assTimeToMs / parseAss / extractKaraoke / stripAssTags / parseVtt on the
 *     shipped fixture;
 *  5. detectCapabilities answers with booleans in jsdom without throwing;
 *  6. AC1 zero-prod-coupling gate — the committed production bundles and the
 *     library entry contain no subsBench string, and no JASSUB dependency was
 *     added to package.json.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  assTimeToMs,
  detectCapabilities,
  extractKaraoke,
  parseAss,
  parseVtt,
  resolveModes,
  stripAssTags,
  summarizeFrames,
  type BenchCapabilities,
} from '../dev/visual/subsBench';

export const S533_PROVENANCE = 'S533SUBSBENCHX9P10';

const repoRoot = path.resolve(fileURLToPath(import.meta.url), '../../..');
const fullCaps: BenchCapabilities = {
  worker: true,
  performanceObserver: true,
  longtask: true,
  video: true,
  textTracks: true,
};

describe('S533 provenance', () => {
  it('token is minted intact on its single code home (this file)', () => {
    expect(S533_PROVENANCE).toBe('S533SUBSBENCHX9P10');
  });
});

describe('capability probing + mode planning', () => {
  it('detectCapabilities answers in booleans under jsdom without throwing', () => {
    const caps = detectCapabilities();
    for (const value of Object.values(caps)) expect(typeof value).toBe('boolean');
    expect(detectCapabilities(null)).toEqual({
      worker: false,
      performanceObserver: false,
      longtask: false,
      video: false,
      textTracks: false,
    });
  });

  it('full capabilities plan all three modes runnable', () => {
    const plans = resolveModes(fullCaps);
    expect(plans.map((p) => p.mode)).toEqual(['main', 'worker', 'ua']);
    expect(plans.every((p) => p.runnable)).toBe(true);
  });

  it('a platform without Worker skips ONLY the worker mode, with a reason', () => {
    const plans = resolveModes({ ...fullCaps, worker: false });
    const worker = plans.find((p) => p.mode === 'worker');
    expect(worker?.runnable).toBe(false);
    expect(worker?.reason).toContain('Worker');
    expect(plans.filter((p) => p.mode !== 'worker').every((p) => p.runnable)).toBe(true);
  });

  it('no TextTrack support skips the UA baseline honestly', () => {
    const plans = resolveModes({ ...fullCaps, textTracks: false });
    expect(plans.find((p) => p.mode === 'ua')?.runnable).toBe(false);
  });

  it('no video clocks out every mode — the bench refuses to run at all', () => {
    const plans = resolveModes({ ...fullCaps, video: false });
    expect(plans.every((p) => !p.runnable)).toBe(true);
    expect(plans.every((p) => p.reason.includes('video'))).toBe(true);
  });
});

describe('frame-time statistics', () => {
  it('an empty run reports zero frames rather than a flattering number', () => {
    expect(summarizeFrames([])).toEqual({ frames: 0, avgFps: 0, p99FrameMs: 0 });
  });

  it('nearest-rank p99 and average fps on a known distribution', () => {
    const metrics = summarizeFrames([10, 20, 30, 40, 50, 60, 70, 80, 90, 1000]);
    expect(metrics).toEqual({ frames: 10, avgFps: 6.9, p99FrameMs: 1000 });
  });

  it('steady 60fps deltas summarise to 60fps with a 16.67ms p99', () => {
    const metrics = summarizeFrames(Array.from({ length: 120 }, () => 1000 / 60));
    expect(metrics.avgFps).toBe(60);
    expect(metrics.p99FrameMs).toBe(16.67);
  });
});

describe('ASS parsing (fixture-backed)', () => {
  const fixture = readFileSync(path.join(repoRoot, 'src/dev/visual/subsBench.ass'), 'utf8');
  const doc = parseAss(fixture);

  it('reads resolution, the 8-style font table and its extremes', () => {
    expect(doc.playResX).toBe(1280);
    expect(doc.playResY).toBe(720);
    expect(doc.styles).toHaveLength(8);
    expect(doc.styles.map((s) => s.fontsize)).toEqual([16, 24, 32, 48, 64, 80, 96, 36]);
    const lead = doc.styles.find((s) => s.name === 'Lead48');
    expect(lead?.fontname).toBe('DejaVu Serif');
    expect(lead?.primaryColour).toBe('rgba(216,230,240,1.000)');
  });

  it('parses h:mm:ss.cs dialogue windows without NaN bounds', () => {
    expect(doc.events).toHaveLength(18);
    for (const event of doc.events) {
      expect(Number.isNaN(event.startMs)).toBe(false);
      expect(Number.isNaN(event.endMs)).toBe(false);
      expect(event.endMs).toBeGreaterThan(event.startMs);
    }
    const first = doc.events[0];
    expect(first?.startMs).toBe(500);
    expect(first?.style).toBe('Body32');
  });

  it('keeps karaoke override blocks in raw event text for the paint path', () => {
    const karaoke = doc.events.find((e) => e.style === 'Karaoke36');
    expect(karaoke?.text).toContain('{\\k35}Co');
    const syllables = extractKaraoke(karaoke?.text ?? '');
    expect(syllables.map((s) => s.text)).toEqual(['Co', 'dy', 'Ka', 'ra', 'o', 'ke', ' ', 'sweep', ' ', 'a', 'cross', 'four']);
    expect(syllables.reduce((sum, s) => sum + s.durationMs, 0)).toBe(5750);
  });

  it('time helper fails loudly on malformed stamps', () => {
    expect(assTimeToMs('0:01:02.03')).toBe(62030);
    expect(Number.isNaN(assTimeToMs('1:2:3'))).toBe(true);
  });

  it('stripAssTags drops overrides, normalises breaks and hard spaces', () => {
    expect(stripAssTags('{\\an2}a\\Nb\\hc')).toBe('a\nb c');
  });
});

describe('VTT parsing (fixture-backed)', () => {
  const fixture = readFileSync(path.join(repoRoot, 'src/dev/visual/subsBench.vtt'), 'utf8');

  it('reads cue windows with tag-stripped text and skips NOTE blocks', () => {
    const cues = parseVtt(fixture);
    expect(cues).toHaveLength(18);
    expect(cues[0]).toEqual({ startMs: 500, endMs: 3500, text: 'The quick brown fox jumps over the lazy dog' });
    for (const cue of cues) expect(cue.text).not.toMatch(/[<>]/);
  });

  it('multi-line cues keep their text and stray comment lines never parse as cues', () => {
    const cues = parseVtt(fixture);
    const stacked = cues.find((c) => c.text.startsWith('First line'));
    expect(stacked?.text).toBe('First line\nsecond stacked line\nthird for good measure');
    expect(cues.some((c) => c.text.includes('NOTE'))).toBe(false);
  });
});

describe('AC1 — zero production coupling', () => {
  function tracked(relative: string): string {
    const file = path.join(repoRoot, relative);
    if (!existsSyncCheck(file)) throw new Error(`${relative} missing — the AC1 gate needs the committed bundle to exist`);
    return readFileSync(file, 'utf8');
  }
  function existsSyncCheck(file: string): boolean {
    try {
      readFileSync(file);
      return true;
    } catch {
      return false;
    }
  }

  it('library entry and EVERY committed production bundle contain no subsBench string', () => {
    expect(tracked('src/index.ts')).not.toContain('subsBench');
    expect(tracked('dist/phlix-ui.js')).not.toContain('subsBench');
    expect(tracked('dist/player.js')).not.toContain('subsBench');
    const distDir = path.join(repoRoot, 'dist');
    const bundles = readdirSync(distDir).filter((f) => f.endsWith('.js'));
    expect(bundles.length).toBeGreaterThan(0);
    for (const bundle of bundles) {
      expect(readFileSync(path.join(distDir, bundle), 'utf8'), bundle).not.toContain('subsBench');
    }
  });

  it('no JASSUB dependency was added', () => {
    expect(tracked('package.json')).not.toMatch(/jassub/i);
  });

  it('the bench files all exist beside their siblings', () => {
    for (const file of [
      'src/dev/visual/subsBench.html',
      'src/dev/visual/subsBench-boot.ts',
      'src/dev/visual/SubsBenchHarness.vue',
      'src/dev/visual/subsBench.worker.ts',
      'src/dev/visual/run-subsbench.mjs',
    ]) {
      expect(existsSyncCheck(path.join(repoRoot, file)), file).toBe(true);
    }
  });
});
