/**
 * TN-6 subtitle-render budget bench — pure core (W114 S533, dev-only).
 *
 * The open question this harness exists to answer: does an entry-level Tizen
 * TV have frame budget for custom ASS subtitle rendering, or should subtitles
 * stay on the platform's native WebVTT path? The answer must come from
 * measurements, not vibes — and it must NOT presuppose a renderer choice (no
 * JASSUB, no WASM; nothing here commits or rejects AD-7).
 *
 * Everything in this file is a side-effect-free function over plain data, so
 * the parsing/decision logic is unit-testable under jsdom (the timing loop
 * itself — the frame sampler — lives in the harness component and can only
 * honestly run in a real browser; the test header says so out loud).
 *
 * `src/dev/**` is excluded from the library build and from coverage
 * (vite.config.ts); importing this module is itself inert (the mount is
 * guarded by the presence of the `#app` element, which never exists in tests).
 */

export type BenchMode = 'main' | 'worker' | 'ua';

/** What the host platform can actually do — probed, never assumed. */
export interface BenchCapabilities {
  /** `Worker` constructible — needed for the worker-side parse mode. */
  worker: boolean;
  /** `PerformanceObserver` exists — needed for long-task counting. */
  performanceObserver: boolean;
  /** The observer can watch `longtask` entries specifically. */
  longtask: boolean;
  /** `<video>` elements work — every mode needs a video clock. */
  video: boolean;
  /** `TextTrack` cues exist — needed for the native-UA-caption baseline. */
  textTracks: boolean;
}

export function detectCapabilities(
  g: (Window & typeof globalThis) | null | undefined = typeof window === 'undefined' ? undefined : window,
): BenchCapabilities {
  if (!g) return { worker: false, performanceObserver: false, longtask: false, video: false, textTracks: false };
  // Real runtimes expose the static `supportedEntryTypes` list; ancient builds
  // had the legacy getter. Read whichever exists, never assume.
  const po = (g.PerformanceObserver ?? {}) as Partial<{
    supportedEntryTypes: readonly string[];
    getSupportedEntryTypes: () => readonly string[];
  }>;
  const listed = po.supportedEntryTypes ?? (typeof po.getSupportedEntryTypes === 'function' ? po.getSupportedEntryTypes() : []);
  const longtask = typeof g.PerformanceObserver !== 'undefined' && listed.includes('longtask');
  return {
    worker: typeof g.Worker !== 'undefined',
    performanceObserver: typeof g.PerformanceObserver !== 'undefined',
    longtask,
    video: typeof g.document?.createElement === 'function' && typeof g.document.createElement('video').play === 'function',
    textTracks: typeof g.VTTCue !== 'undefined' || typeof g.TextTrackCue !== 'undefined',
  };
}

/** A mode the scheduler planned, with its runnability verdict and why. */
export interface ModePlan {
  mode: BenchMode;
  runnable: boolean;
  reason: string;
}

/**
 * Every run is a plan of all three modes. A mode that the platform cannot
 * provide is reported as skipped with a human-readable reason — the harness
 * never silently drops it and NEVER fabricates numbers for it.
 */
export function resolveModes(caps: BenchCapabilities): ModePlan[] {
  if (!caps.video) {
    return (['main', 'worker', 'ua'] as BenchMode[]).map((mode) => ({
      mode,
      runnable: false,
      reason: 'no <video> element on this platform — the bench clock cannot run',
    }));
  }
  return [
    { mode: 'main', runnable: true, reason: 'parse + paint on the main thread — the worst case we must price' },
    {
      mode: 'worker',
      runnable: caps.worker,
      reason: caps.worker
        ? 'ASS parse on a worker, paint on main — isolates parse cost from frame pacing'
        : 'Worker unavailable on this platform — mode skipped, no number invented',
    },
    {
      mode: 'ua',
      runnable: caps.textTracks,
      reason: caps.textTracks
        ? 'native ::cue rendering of the WebVTT mirror — the do-nothing baseline'
        : 'TextTrack/VTTCue unavailable — baseline skipped, no number invented',
    },
  ];
}

/** Frame-time statistics for one mode's run. */
export interface FrameMetrics {
  frames: number;
  avgFps: number;
  /** Nearest-rank 99th percentile of inter-frame deltas, ms. */
  p99FrameMs: number;
}

/**
 * Summarise inter-frame deltas. An empty run has zero frames and no
 * percentile — reported as such (0/0/0) rather than as a flattering fake.
 */
export function summarizeFrames(deltas: number[]): FrameMetrics {
  if (deltas.length === 0) return { frames: 0, avgFps: 0, p99FrameMs: 0 };
  const total = deltas.reduce((sum, d) => sum + d, 0);
  const sorted = [...deltas].sort((a, b) => a - b);
  const rank = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * 0.99) - 1));
  const avgMs = total / deltas.length;
  return {
    frames: deltas.length,
    avgFps: avgMs > 0 ? Math.round((1000 / avgMs) * 100) / 100 : 0,
    p99FrameMs: Math.round(sorted[rank] * 100) / 100,
  };
}

/* ------------------------------------------------------------------ parsers */

export interface AssStyle {
  name: string;
  fontname: string;
  fontsize: number;
  primaryColour: string;
}

export interface AssEvent {
  layer: number;
  startMs: number;
  endMs: number;
  style: string;
  name: string;
  text: string;
}

export interface AssDoc {
  playResX: number;
  playResY: number;
  styles: AssStyle[];
  events: AssEvent[];
}

/** `h:mm:ss.cs` → milliseconds. Malformed input returns NaN (fail loud upstream). */
export function assTimeToMs(value: string): number {
  const m = /^(\d+):(\d{2}):(\d{2})\.(\d{2})$/.exec(value.trim());
  if (!m) return Number.NaN;
  const [, h, min, s, cs] = m;
  return Number(h) * 3600000 + Number(min) * 60000 + Number(s) * 1000 + Number(cs) * 10;
}

function assColour(raw: string): string {
  // ASS &HAABBGGRR (alpha inverted) → css rgba for an honest on-screen colour.
  const hex = raw.trim().replace(/^&H/i, '').replace(/&$/i, '');
  if (!/^[0-9a-fA-F]{6,8}$/.test(hex)) return 'rgba(255,255,255,1)';
  const rgb = hex.slice(-6);
  const rr = parseInt(rgb.slice(4, 6), 16);
  const gg = parseInt(rgb.slice(2, 4), 16);
  const bb = parseInt(rgb.slice(0, 2), 16);
  const aa = hex.length === 8 ? 255 - parseInt(hex.slice(0, 2), 16) : 255;
  return `rgba(${rr},${gg},${bb},${(aa / 255).toFixed(3)})`;
}

/**
 * Minimal honest ASS reader — enough structure to drive the benchmark:
 * script resolution, the style table (fonts/sizes/colours) and dialogue
 * events with raw override blocks preserved (the paint path needs them).
 */
export function parseAss(src: string): AssDoc {
  const doc: AssDoc = { playResX: 384, playResY: 288, styles: [], events: [] };
  let section = '';
  let styleFields: string[] = [];
  let eventFields: string[] = [];
  for (const line of src.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('!:')) continue;
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      section = trimmed.slice(1, -1).toLowerCase();
      continue;
    }
    if (section === 'script info' && /^playresx\s*:/i.test(trimmed)) doc.playResX = Number(trimmed.split(':')[1]) || doc.playResX;
    if (section === 'script info' && /^playresy\s*:/i.test(trimmed)) doc.playResY = Number(trimmed.split(':')[1]) || doc.playResY;
    if (section === 'v4+ styles' || section === 'v4 styles') {
      if (/^Format\s*:/i.test(trimmed)) styleFields = trimmed.slice(7).split(',').map((f) => f.trim());
      else if (/^Style\s*:/i.test(trimmed)) {
        const values = trimmed.slice(6).split(',');
        const get = (key: string) => {
          const i = styleFields.findIndex((f) => f.toLowerCase() === key.toLowerCase());
          return i >= 0 ? (values[i] ?? '').trim() : '';
        };
        doc.styles.push({
          name: get('Name'),
          fontname: get('Fontname'),
          fontsize: Number(get('FontSize')) || 0,
          primaryColour: assColour(get('PrimaryColour')),
        });
      }
    }
    if (section === 'events') {
      if (/^Format\s*:/i.test(trimmed)) eventFields = trimmed.slice(7).split(',').map((f) => f.trim());
      else if (/^Dialogue\s*:/i.test(trimmed)) {
        // The last field (Text) may itself contain commas: split by hand so the
        // remainder JOINS back into the final field (split's limit would drop it).
        const fieldCount = eventFields.length > 0 ? eventFields.length : 10;
        const parts = trimmed.slice(9).split(',');
        const values =
          parts.length > fieldCount
            ? [...parts.slice(0, fieldCount - 1), parts.slice(fieldCount - 1).join(',')]
            : parts;
        const get = (key: string) => {
          const i = eventFields.findIndex((f) => f.toLowerCase() === key.toLowerCase());
          return i >= 0 ? (values[i] ?? '').trim() : '';
        };
        doc.events.push({
          layer: Number(get('Layer')) || 0,
          startMs: assTimeToMs(get('Start')),
          endMs: assTimeToMs(get('End')),
          style: get('Style'),
          name: get('Name'),
          text: (values[values.length - 1] ?? '').trim(),
        });
      }
    }
  }
  return doc;
}

export interface KaraokeSyllable {
  text: string;
  durationMs: number;
}

/**
 * Pull the karaoke timing out of an ASS event body: every `{\k123}syl` chunk
 * yields a syllable with its duration. Overrides other than `\k` are stripped.
 */
export function extractKaraoke(text: string): KaraokeSyllable[] {
  const syllables: KaraokeSyllable[] = [];
  const re = /\{\\k(\d+)\}([^{}]*)/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const word = match[2] ?? '';
    if (word) syllables.push({ text: stripAssTags(word), durationMs: Number(match[1]) * 10 });
  }
  return syllables;
}

/** Override blocks out, hard breaks normalised — what a naive paint would show. */
export function stripAssTags(text: string): string {
  return text.replace(/\{[^}]*\}/g, '').replace(/\\N/g, '\n').replace(/\\h/g, ' ');
}

export interface VttCue {
  startMs: number;
  endMs: number;
  text: string;
}

function vttTimeToMs(value: string): number {
  const m = /^(\d{1,2}:)?\d{2}:\d{2}\.\d{3}$/.exec(value.trim());
  if (!m) return Number.NaN;
  const parts = value.trim().split(':');
  const s = parts.length === 3 ? Number(parts[0]) * 3600 + Number(parts[1]) : Number(parts[0]) * 60;
  const frac = parts[parts.length - 1] ?? '0';
  const [sec, ms] = frac.split('.');
  return s * 1000 + Number(sec) * 1000 + Number(ms ?? 0);
}

/** WebVTT reader: cue timings + tag-stripped text (the UA baseline's input). */
export function parseVtt(src: string): VttCue[] {
  const cues: VttCue[] = [];
  for (const block of src.replace(/\r\n/g, '\n').split('\n\n')) {
    const timing = /^(?:WEBVTT.*\n)?(?:.*\n)?(\S+) --> (\S+)/m.exec(block);
    const withArrow = block.split('\n').find((l) => l.includes('-->'));
    if (!timing || !withArrow) continue;
    const [start, end] = withArrow.split('-->').map((t) => vttTimeToMs((t.trim().split(' ')[0] ?? t).trim()));
    const idx = block.indexOf(withArrow);
    const text = block
      .slice(idx + withArrow.length)
      .replace(/<[^>]+>/g, '')
      .trim();
    if (Number.isNaN(start) || Number.isNaN(end) || !text) continue;
    cues.push({ startMs: start, endMs: end, text });
  }
  return cues;
}
