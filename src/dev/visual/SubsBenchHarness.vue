<script setup lang="ts">
/**
 * TN-6 subtitle budget bench harness (W114 S533, dev-only — `src/dev/**`
 * never enters the library build).
 *
 * Runs the same 60-second scripted playback (with D-pad-style seek stress)
 * through three render paths and reports honest frame statistics:
 *   1. main   — ASS parse + karaoke paint on the main thread (worst case),
 *   2. worker — ASS parse off-thread, same paint (isolates parse cost),
 *   3. ua     — the WebVTT mirror on the platform's native ::cue path (baseline).
 *
 * Modes the platform cannot provide are reported skipped with a reason.
 * The numbers below are measurements for the TN-6 record, not a renderer
 * decision — AD-7 stays open either way.
 */
import { computed, onBeforeUnmount, ref } from 'vue';
import {
  detectCapabilities,
  parseAss,
  resolveModes,
  stripAssTags,
  summarizeFrames,
  type AssDoc,
  type BenchMode,
  type FrameMetrics,
  type ModePlan,
} from './subsBench';
import assSource from './subsBench.ass?raw';
import vttSource from './subsBench.vtt?raw';

interface ModeResult {
  mode: BenchMode;
  status: 'done' | 'skipped' | 'failed';
  reason?: string;
  metrics?: FrameMetrics;
  longTasks?: number | null;
  parseMs?: number | null;
}

interface PaintSpan {
  text: string;
  fontSize: number;
  color: string;
  karaoke: boolean;
  progress: number;
}

const sampleSrc = new URL('./sample.mp4', import.meta.url).href;
const vttBlobUrl = URL.createObjectURL(new Blob([vttSource], { type: 'text/vtt' }));

const params = new URLSearchParams(window.location.search);
const runDurationMs = Math.max(2000, Number(params.get('duration')) * 1000 || 60000);

const videoEl = ref<HTMLVideoElement | null>(null);
const trackEl = ref<HTMLTrackElement | null>(null);
const running = ref(false);
const currentLabel = ref('');
const plans = ref<ModePlan[]>([]);
const results = ref<ModeResult[]>([]);
const spans = ref<PaintSpan[]>([]);

const caps = detectCapabilities();

const meta = {
  bench: 'tn6-subsbench',
  machine: { userAgent: window.navigator.userAgent, hardwareConcurrency: window.navigator.hardwareConcurrency ?? null },
  runDurationMs,
  capabilities: caps,
};

function setTrackMode(mode: 'showing' | 'hidden'): void {
  if (trackEl.value?.track) trackEl.value.track.mode = mode;
}

function styleOf(doc: AssDoc, name: string) {
  return doc.styles.find((style) => style.name === name);
}

function paintAt(doc: AssDoc, timeMs: number): void {
  const active: PaintSpan[] = [];
  for (const event of doc.events) {
    if (event.startMs > timeMs || event.endMs <= timeMs) continue;
    const style = styleOf(doc, event.style);
    const isKaraoke = /\{\\k/i.test(event.text);
    active.push({
      text: stripAssTags(event.text),
      fontSize: style ? style.fontsize : 24,
      color: style ? style.primaryColour : 'rgba(255,255,255,1)',
      karaoke: isKaraoke,
      progress: isKaraoke ? (timeMs - event.startMs) / (event.endMs - event.startMs) : 1,
    });
  }
  spans.value = active;
}

function runWorkerParse(): Promise<{ doc: AssDoc; parseMs: number }> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./subsBench.worker.ts', import.meta.url), { type: 'module' });
    const startedAt = performance.now();
    const timer = window.setTimeout(() => {
      worker.terminate();
      reject(new Error('worker parse timed out after 10s'));
    }, 10000);
    worker.onmessage = (event: MessageEvent<{ doc: AssDoc }>) => {
      window.clearTimeout(timer);
      resolve({ doc: event.data.doc, parseMs: performance.now() - startedAt });
      worker.terminate();
    };
    worker.onerror = (event) => {
      window.clearTimeout(timer);
      reject(new Error(`worker failed: ${event.message}`));
    };
    worker.postMessage({ ass: assSource });
  });
}

async function runMode(mode: BenchMode): Promise<ModeResult> {
  const video = videoEl.value;
  if (!video) throw new Error('video element missing before run');

  spans.value = [];
  setTrackMode('hidden');
  let doc: AssDoc | null = null;
  let parseMs: number | null = null;

  if (mode === 'main') {
    const startedAt = performance.now();
    doc = parseAss(assSource);
    parseMs = performance.now() - startedAt;
  } else if (mode === 'worker') {
    const parsed = await runWorkerParse();
    doc = parsed.doc;
    parseMs = parsed.parseMs;
  } else {
    setTrackMode('showing');
  }

  video.currentTime = 0;
  await video.play();

  const deltas: number[] = [];
  let longTasks = 0;
  const observer =
    caps.performanceObserver && caps.longtask ? new PerformanceObserver((list) => (longTasks += list.getEntries().length)) : null;
  observer?.observe({ entryTypes: ['longtask'] });

  const startedAt = performance.now();
  let lastFrame = startedAt;
  let lastSeek = 0;
  try {
    await new Promise<void>((resolve) => {
      const step = (now: number) => {
        deltas.push(now - lastFrame);
        lastFrame = now;
        const elapsed = now - startedAt;
        if (elapsed >= runDurationMs) {
          resolve();
          return;
        }
        if (doc) paintAt(doc, video.currentTime * 1000);
        if (elapsed - lastSeek >= 2000) {
          lastSeek = elapsed;
          video.currentTime = Math.max(0, video.currentTime - 0.5);
        }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  } finally {
    observer?.disconnect();
    video.pause();
  }

  return {
    mode,
    status: 'done',
    metrics: summarizeFrames(deltas.slice(1)),
    longTasks: observer ? longTasks : null,
    parseMs: parseMs === null ? null : Math.round(parseMs * 100) / 100,
  };
}

async function runBench(): Promise<void> {
  if (running.value) return;
  running.value = true;
  results.value = [];
  plans.value = resolveModes(caps);
  try {
    for (const plan of plans.value) {
      currentLabel.value = plan.mode;
      if (!plan.runnable) {
        results.value.push({ mode: plan.mode, status: 'skipped', reason: plan.reason });
        continue;
      }
      try {
        results.value.push(await runMode(plan.mode));
      } catch (error) {
        results.value.push({ mode: plan.mode, status: 'failed', reason: String(error) });
      }
      await new Promise((sleep) => window.setTimeout(sleep, 1000));
    }
  } finally {
    currentLabel.value = '';
    running.value = false;
    (window as unknown as Record<string, unknown>).__SUBSBENCH_RESULTS__ = {
      done: true,
      meta,
      plans: plans.value,
      results: results.value,
      finishedAt: new Date().toISOString(),
    };
  }
}

const done = computed(() => !running.value && results.value.length > 0);

onBeforeUnmount(() => videoEl.value?.pause());
</script>

<template>
  <section class="subsbench">
    <header class="subsbench__head">
      <h1 class="subsbench__title">TN-6 subtitle render budget</h1>
      <p class="subsbench__lede">
        Same {{ Math.round(runDurationMs / 1000) }}s scripted run (seek stress every 2s) through three paint paths. Measurements only —
        this harness decides nothing about JASSUB or AD-7.
      </p>
      <button id="run-bench" class="subsbench__run" :disabled="running" type="button" @click="runBench">
        {{ running ? `Running: ${currentLabel}` : 'Run benchmark' }}
      </button>
    </header>

    <div class="subsbench__stage">
      <video ref="videoEl" class="subsbench__video" :src="sampleSrc" muted loop playsinline preload="auto">
        <track ref="trackEl" kind="subtitles" srclang="en" label="baseline" :src="vttBlobUrl" />
      </video>
      <div class="subsbench__overlay" aria-hidden="true">
        <p
          v-for="(span, index) in spans"
          :key="index"
          class="subsbench__cue"
          :class="{ 'subsbench__cue--karaoke': span.karaoke }"
          :style="{ fontSize: `${span.fontSize / 3}px`, color: span.color }"
        >
          <span
            v-if="span.karaoke"
            class="subsbench__cue-swept"
            :style="{ clipPath: `inset(0 ${Math.round((1 - span.progress) * 100)}% 0 0)` }"
            >{{ span.text }}</span
          ><span>{{ span.text }}</span>
        </p>
      </div>
    </div>

    <table v-if="done" class="subsbench__table">
      <thead>
        <tr>
          <th>mode</th>
          <th>status</th>
          <th>frames</th>
          <th>avg fps</th>
          <th>p99 frame ms</th>
          <th>long tasks</th>
          <th>parse ms</th>
          <th>note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.mode">
          <td>{{ result.mode }}</td>
          <td>{{ result.status }}</td>
          <td>{{ result.metrics ? result.metrics.frames : '—' }}</td>
          <td>{{ result.metrics ? result.metrics.avgFps : '—' }}</td>
          <td>{{ result.metrics ? result.metrics.p99FrameMs : '—' }}</td>
          <td>{{ result.longTasks === null ? 'unobserved' : (result.longTasks ?? '—') }}</td>
          <td>{{ result.parseMs ?? '—' }}</td>
          <td>{{ result.reason ?? '' }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.subsbench {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6);
  max-width: 60rem;
  margin: 0 auto;
}
.subsbench__title {
  font-size: var(--text-2xl);
  margin: 0;
}
.subsbench__lede {
  color: var(--text-muted);
  font-size: var(--text-sm);
  margin: var(--space-2) 0 var(--space-4);
}
.subsbench__run {
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-md);
  border: 1px solid var(--accent-text);
  background: transparent;
  color: var(--accent-text);
  font: inherit;
  cursor: pointer;
}
.subsbench__run:disabled {
  opacity: 0.6;
  cursor: progress;
}
.subsbench__stage {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.subsbench__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.subsbench__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-1);
  padding-bottom: var(--space-8);
  pointer-events: none;
}
.subsbench__cue {
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 1px 2px #000;
  white-space: pre-line;
}
.subsbench__cue--karaoke {
  position: relative;
}
.subsbench__cue-swept {
  position: absolute;
  inset: 0;
  color: #ffd75e;
}
.subsbench__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.subsbench__table th,
.subsbench__table td {
  text-align: left;
  padding: var(--space-1) var(--space-2);
  border-bottom: 1px solid var(--border-subtle);
}
</style>
