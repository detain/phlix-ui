<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin LogsPage (RA.1) — view & tail the server log files, ported from the
 * deleted React `LogsPage` onto the `@phlix/ui` primitives. Lists `.log` files,
 * tails the selected one (or all merged), and can auto-refresh every 5s. Errors
 * surface as toasts; the view pins to the newest lines; timers clear on unmount.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { AdminLogsApi, ALL_LOGS, type LogFile } from '../../api/admin/logs';
import { useToastStore } from '../../stores/useToastStore';
import { plural } from '../../utils/plural';
import { errMessage } from '../../api/errors';
import Select from '../../components/ui/Select.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';
import Switch from '../../components/ui/Switch.vue';
import Button from '../../components/ui/Button.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

const LINE_OPTIONS = [200, 500, 1000, 2000];
const AUTO_REFRESH_MS = 5000;

// ---------------------------------------------------------------------------
// Log levels — the full Monolog/PSR-3 set. Some collapse onto a shared badge
// "tone" (colour) since we only carry five badge palettes.
type LogLevel =
  | 'debug'
  | 'info'
  | 'notice'
  | 'warning'
  | 'error'
  | 'critical'
  | 'alert'
  | 'emergency';

type LevelTone = 'debug' | 'info' | 'warning' | 'error' | 'critical';

/** Map each Monolog level onto one of the five badge colour tones. */
const LEVEL_TONE: Record<LogLevel, LevelTone> = {
  debug: 'debug',
  info: 'info',
  notice: 'info',
  warning: 'warning',
  error: 'error',
  critical: 'critical',
  alert: 'critical',
  emergency: 'critical',
};

// Fallback keyword detection (severity-descending) for lines we can't parse
// structurally — e.g. bare stack-trace continuations without a Monolog header.
const LOG_LEVEL_PATTERNS: ReadonlyArray<readonly [LogLevel, RegExp]> = [
  ['critical', /\b(critical|crit|alert|emerg)\b/i],
  ['error', /\b(error|err)\b/i],
  ['warning', /\b(warning|warn)\b/i],
  ['notice', /\bnotice\b/i],
  ['info', /\binfo\b/i],
  ['debug', /\bdebug\b/i],
];

/**
 * Strip the rotation date suffix from a log filename.
 * Monolog rotates with a HYPHEN separator (`app-2026-07-18.log`); older files
 * used a dot (`app.2026-07-18.log`). Accept both → "app".
 */
function stripDateFromFilename(filename: string): string {
  return filename.replace(/[.-]\d{4}-\d{2}-\d{2}\.log$/, '');
}

/**
 * Detect syslog log level from a log line.
 * Only searches the syslog prefix (first 100 chars) to avoid false matches
 * when the message content happens to contain level keywords.
 */
function detectLogLevel(line: string): LogLevel | null {
  const prefix = line.slice(0, 100);
  for (const [level, pattern] of LOG_LEVEL_PATTERNS) {
    if (pattern.test(prefix)) {
      return level;
    }
  }
  return null;
}

/**
 * Remove trailing empty JSON array " []" from a line.
 */
function stripEmptyJson(line: string): string {
  return line.replace(/\s+\[\]$/, '');
}

/**
 * Apply basic JSON syntax highlighting to text.
 * Returns HTML string with <span> elements wrapping highlighted tokens.
 *
 * CU-102 (ui__secaudit #2): this pass used to escape ONLY `< > &` inline and
 * interpolate the captured fragments into the span markup as-is — `"` and `'`
 * rode straight through, a hand-rolled copy of the escaping law that the
 * file's own complete 5-entity {@link escapeHtml} already enforces (UI-m19).
 * The walk now runs over the RAW text and every fragment — the inter-match
 * text and each captured key/value — goes through escapeHtml. The sink is
 * v-html (:557): with a whole-fragment escape there is no character from the
 * log line that can open a tag or land inside a markup quote; the span
 * classes stay fixed strings. Visual text is unchanged (`&quot;` renders as a
 * quote), the span taxonomy (json-key/json-string/json-boolean/json-null/
 * json-number) is preserved, and `formatLine` keeps feeding the raw message.
 */
function highlightJson(text: string): string {
  // Match JSON-like segments: "key": value patterns (over the raw text — the
  // escaping moved from a pre-pass into every emitted fragment).
  const pattern = /("([^"]+)":\s*)("(?:[^"\\]|\\.)*"|\d+\.?\d*|true|false|null)/g;
  let out = '';
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    out += escapeHtml(text.slice(last, m.index));
    // keyPart (m[1]) includes the quoted key and colon.
    let highlightedValue: string;
    if (m[3].startsWith('"')) {
      // String value
      highlightedValue = `<span class="json-string">${escapeHtml(m[3])}</span>`;
    } else if (m[3] === 'true' || m[3] === 'false') {
      highlightedValue = `<span class="json-boolean">${escapeHtml(m[3])}</span>`;
    } else if (m[3] === 'null') {
      highlightedValue = `<span class="json-null">${escapeHtml(m[3])}</span>`;
    } else {
      // The value alternation leaves only numbers here (was: !isNaN branch).
      highlightedValue = `<span class="json-number">${escapeHtml(m[3])}</span>`;
    }
    out += `<span class="json-key">${escapeHtml(m[1])}</span>` + highlightedValue;
    last = m.index + m[0].length;
  }
  out += escapeHtml(text.slice(last));
  return out;
}

export interface ProcessedLine {
  level: LogLevel | null;
  content: string;
}

interface RawLine {
  /** The original, untouched log line (useful for tooltips/debugging). */
  raw: string;
  /** Epoch milliseconds parsed from the ISO timestamp; NaN when absent/unparseable. */
  timestamp: number;
  /** Formatted local time string for display. */
  localTime: string;
  /** Source log file, date-stripped (from the tail-all column or the selection). */
  source: string;
  /** Monolog channel (e.g. "http"), rendered as its own badge. */
  channel: string;
  level: LogLevel | null;
  /** The message body, with timestamp/channel/level/inline-prefix removed. */
  message: string;
}

/**
 * Escape HTML special characters. Both quote families are covered because the
 * output is concatenated into HTML strings fed to `v-html`: text position is
 * safe without them, single-quoted attribute interpolation would not be
 * (UI-m19; enforced repo-wide by `__tests__/escape-html-quotes.test.ts`).
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Level badge HTML. `level` is a controlled enum, but we escape defensively.
 * The colour comes from the mapped tone; the text shows the true level.
 */
function getLevelBadgeHtml(level: LogLevel): string {
  const tone = LEVEL_TONE[level] ?? 'debug';
  return `<span class="log-badge log-badge--${tone}">${escapeHtml(level.toUpperCase())}</span>`;
}

/**
 * Channel badge HTML. The channel is derived from raw log text, so it MUST be
 * HTML-escaped before it reaches `v-html`.
 */
function getChannelBadgeHtml(channel: string): string {
  return `<span class="log-badge log-badge--channel">${escapeHtml(channel)}</span>`;
}

/**
 * Format an ISO timestamp for display in the viewer's LOCAL timezone.
 *
 * Format: `h:mm:ss.<micros>AM/PM` (12-hour). When the entry's local date is not
 * today, a compact `YYYY-MM-DD ` prefix is prepended. Sub-second precision is
 * preserved from the RAW ISO string (JS `Date` truncates to milliseconds, so we
 * splice the original micro-/nanoseconds back in). This is deliberately the one
 * place that owns the wall-clock format, so it is easy to tweak.
 *
 * @param d   the already-parsed Date (its offset came from the raw string).
 * @param iso the raw ISO string, used only to recover fractional seconds.
 * @param now injectable "today" reference (defaults to real now).
 */
function formatLocalTimestamp(d: Date, iso: string, now: Date = new Date()): string {
  if (isNaN(d.getTime())) return iso;

  // Recover the full fractional seconds from the raw string (Date loses them).
  const fracMatch = iso.match(/T\d{2}:\d{2}:\d{2}\.(\d+)/);
  const frac = fracMatch ? `.${fracMatch[1]}` : '';

  const period = d.getHours() >= 12 ? 'PM' : 'AM';
  const hour12 = d.getHours() % 12 || 12;
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  const time = `${hour12}:${mm}:${ss}${frac}${period}`;

  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  if (sameDay) return time;

  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
  return `${date} ${time}`;
}

/** Inline `[LEVEL] YYYY-MM-DD HH:MM:SS(.mmm) ` prefix some legacy lines carry. */
const INLINE_LEVEL_PREFIX =
  /^\[(?:DEBUG|INFO|WARNING|ERROR|CRITICAL|NOTICE|ALERT|EMERGENCY)\]\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?\s+/i;

/**
 * Parse a single log line into a structured {@link RawLine}.
 *
 * Handles both shapes identically:
 *  - single-file:  `[2026-07-18T07:09:44.079957+00:00] http.DEBUG: msg [ctx]`
 *  - tail-all:     `app-2026-07-18.log     [2026-07-18T…] http.DEBUG: msg [ctx]`
 *    (the server glues a `sprintf('%-22s %s', file, line)` filename column on).
 *
 * @param fallbackSource used as the source when no filename column is present
 *   (i.e. the single-file view's selected file), so `source` is populated in
 *   both shapes.
 */
function processLine(line: string, fallbackSource = '', isCombined = false): RawLine {
  const raw = line;
  let cleaned = stripEmptyJson(line);

  // 1. Peel off the tail-all filename column. In the combined "All logs" view the
  //    server prepends a padded `sprintf('%-22s %s', file, line)` filename to
  //    EVERY line — INCLUDING bracket-less continuation lines (stack traces that
  //    inherit the previous entry's timestamp). Strip the leading `\S+\.log`
  //    token unconditionally in combined mode — NOT gated on a following `[` — so
  //    the column is consumed for continuation lines too and never leaks into the
  //    message. Single-file lines carry no column, so we never strip there.
  let source = fallbackSource;
  if (isCombined) {
    const fileMatch = cleaned.match(/^(\S+\.log)\s+/i);
    if (fileMatch) {
      source = stripDateFromFilename(fileMatch[1]);
      cleaned = cleaned.slice(fileMatch[0].length);
    }
  }

  // 2. Fully consume the ISO timestamp bracket (offset/fraction included).
  //    Lines with no parseable timestamp keep NaN so they can never chain-merge
  //    with each other (see the |Δts| ≤ 1000ms combine check below).
  let timestamp = NaN;
  let localTime = '';
  const tsMatch = cleaned.match(/^\[([^\]]+)\]\s*/);
  if (tsMatch) {
    const iso = tsMatch[1];
    // The raw string already carries its offset (e.g. +00:00) — do NOT add 'Z'.
    const d = new Date(iso);
    if (!isNaN(d.getTime())) {
      timestamp = d.getTime();
      localTime = formatLocalTimestamp(d, iso);
    } else {
      localTime = iso;
    }
    cleaned = cleaned.slice(tsMatch[0].length);
  }

  // 3. Split `channel.LEVEL:` into a channel + level, stripping it from the msg.
  let channel = '';
  let level: LogLevel | null = null;
  const clMatch = cleaned.match(
    /^([^.\s]+)\.(DEBUG|INFO|NOTICE|WARNING|ERROR|CRITICAL|ALERT|EMERGENCY):\s*/i,
  );
  if (clMatch) {
    channel = clMatch[1];
    level = clMatch[2].toLowerCase() as LogLevel;
    cleaned = cleaned.slice(clMatch[0].length);
  }

  // 4. Defensively strip a redundant inline `[LEVEL] datetime ` message prefix.
  cleaned = cleaned.replace(INLINE_LEVEL_PREFIX, '');

  // 5. Only fall back to keyword sniffing for lines we couldn't parse.
  if (level === null && channel === '') {
    level = detectLogLevel(cleaned);
  }

  return { raw, timestamp, localTime, source, channel, level, message: cleaned.trim() };
}

/**
 * Build the display HTML for a processed line.
 *
 * Layout: `source  localTime  [channel] [LEVEL]: message`, where `channel` and
 * `LEVEL` are separate badges (never duplicated as plain text). Every fragment
 * derived from raw log text is HTML-escaped before it reaches `v-html`:
 * `source`/`channel` via {@link escapeHtml}, the message via {@link highlightJson}
 * (which escapes every fragment through {@link escapeHtml}). This is the XSS
 * boundary for log content.
 *
 * @param combinedSources overrides `info.source` when several files' identical
 *   lines were merged into one row (comma-joined source list).
 */
function formatLine(info: RawLine, combinedSources?: string): string {
  const sourceStr = combinedSources ?? info.source;
  const sourceHtml = sourceStr ? `${escapeHtml(sourceStr)} ` : '';
  const timeHtml = info.localTime ? `${escapeHtml(info.localTime)} ` : '';
  const channelHtml = info.channel ? `${getChannelBadgeHtml(info.channel)} ` : '';
  const levelHtml = info.level ? `${getLevelBadgeHtml(info.level)}: ` : '';
  // highlightJson escapes every fragment itself (CU-102) — pass the raw
  // message (no double-escape).
  const messageHtml = info.message ? highlightJson(info.message) : '';
  return `${sourceHtml}${timeHtml}${channelHtml}${levelHtml}${messageHtml}`;
}

const props = defineProps<{
  /** Inject a pre-built API for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminLogsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value }),
);
const toasts = useToastStore();

const files = ref<LogFile[]>([]);
const selected = ref<string>('');
const lineCount = ref<number>(200);
const lines = ref<string[]>([]);
const truncated = ref(false);
const loading = ref(false);
const listLoading = ref(true);
const listError = ref<string | null>(null);
const contentError = ref<string | null>(null);

const preEl = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setInterval> | null = null;

const fileOptions = computed<SelectOptionInput[]>(() => {
  if (files.value.length === 0) return [{ value: '', label: '(no log files)' }];
  return [
    { value: ALL_LOGS, label: 'All logs (combined)' },
    ...files.value.map((f) => ({ value: f.name, label: stripDateFromFilename(f.name) })),
  ];
});

/** Computed processed log lines with deduplication and level badges */
const processedLines = computed<ProcessedLine[]>(() => {
  // In the single-file view the lines carry no filename column, so seed the
  // source from the selected file; the combined view leaves it to the column.
  const isCombined = selected.value === ALL_LOGS;
  const fallbackSource =
    selected.value && selected.value !== ALL_LOGS ? stripDateFromFilename(selected.value) : '';
  const rawLines = lines.value.map((l) => processLine(l, fallbackSource, isCombined));
  const result: ProcessedLine[] = [];
  let i = 0;
  while (i < rawLines.length) {
    const line = rawLines[i];
    if (Number.isNaN(line.timestamp) && line.source === '') {
      result.push({ level: line.level, content: formatLine(line) });
      i++;
      continue;
    }
    const group: RawLine[] = [line];
    const groupSources = new Set<string>([line.source]);
    let lastTs = line.timestamp;
    let j = i + 1;
    while (j < rawLines.length) {
      const next = rawLines[j];
      if (
        Math.abs(next.timestamp - lastTs) <= 1000 &&
        next.message === line.message &&
        !groupSources.has(next.source)
      ) {
        group.push(next);
        groupSources.add(next.source);
        lastTs = next.timestamp;
        j++;
      } else {
        break;
      }
    }
    if (group.length === 1) {
      result.push({ level: line.level, content: formatLine(line) });
    } else {
      const sources = [...new Set(group.map((l) => l.source))].sort().join(', ');
      result.push({ level: line.level, content: formatLine(line, sources) });
    }
    i = j;
  }
  return result;
});
const lineOptions = computed<SelectOptionInput[]>(() => LINE_OPTIONS.map((n) => ({ value: n, label: String(n) })));

async function loadList(): Promise<void> {
  listLoading.value = true;
  listError.value = null;
  try {
    const list = await api.list();
    files.value = list;
    if (list.length > 0 && selected.value === '') selected.value = ALL_LOGS;
  } catch (e) {
    listError.value = errMessage(e, 'Failed to list logs.');
    toasts.error(listError.value);
  } finally {
    listLoading.value = false;
  }
}

/** CU-116: timestamp label of the most recent failed read (null = healthy). */
const pollFailedAt = ref<string | null>(null);
/** CU-116: consecutive-failure counter — only the 0→1 transition toasts. */
let failureStreak = 0;
/** CU-116 (webux #12): delta announcement replacing the <pre>-wide aria-live. */
const updateNote = ref('');

/**
 * CU-116 (review ui__webux #11/#12) — the background-poll discipline:
 *   • a failed tick NEVER blanks what is already on screen: last-good lines
 *     stay, a small timestamped toolbar note says the update failed, and the
 *     full-pane EmptyState is reserved for the honest case (nothing loaded).
 *   • toasts fire for interactive attempts (`manual` — the Refresh/Retry
 *     buttons) or the FIRST failure of a background streak. A 5s auto-refresh
 *     failure used to toast every tick forever; the UI-M18 stack cap only hid
 *     the stream behind eviction, it did not stop it.
 *   • success clears the failure state and announces the DELTA (count of
 *     lines new since the previous read) through the small status element —
 *     the blanket `aria-live` on the <pre> used to re-announce every visible
 *     byte on every tick (webux #12).
 */
async function refresh(manual = false): Promise<void> {
  const file = selected.value;
  if (file === '') return;
  loading.value = true;
  try {
    const res = file === ALL_LOGS ? await api.tailAll(lineCount.value) : await api.tail(file, lineCount.value);
    const prev = new Set(lines.value);
    let arrived = 0;
    for (const l of res.lines) if (!prev.has(l)) arrived++;
    lines.value = res.lines;
    truncated.value = res.truncated;
    contentError.value = null;
    pollFailedAt.value = null;
    failureStreak = 0;
    // The FIRST fill of an empty pane is not an arrival — there is nothing to
    // have missed. Only re-reads over existing content announce a delta.
    updateNote.value = arrived > 0 && prev.size > 0
      ? `${arrived} new ${plural(arrived, { one: 'line', other: 'lines' })}`
      : '';
    void nextTick(() => {
      if (preEl.value) preEl.value.scrollTop = preEl.value.scrollHeight;
    });
  } catch (e) {
    const msg = errMessage(e, 'Failed to read log.');
    if (lines.value.length === 0) {
      // Nothing to preserve — the pane-level error state is the honest view.
      contentError.value = msg;
    }
    pollFailedAt.value = new Date().toLocaleTimeString();
    if (manual || failureStreak === 0) {
      toasts.error(msg);
    }
    failureStreak++;
  } finally {
    loading.value = false;
  }
}


function stopTimer(): void {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function syncTimer(): void {
  stopTimer();
  if (autoRefresh.value && selected.value !== '') {
    timer = setInterval(() => void refresh(), AUTO_REFRESH_MS);
  }
}

// ---------------------------------------------------------------------------
// Visibility-aware polling: pause auto-refresh when the tab is hidden and
// resume it when the tab becomes visible again (if conditions still met).
// ---------------------------------------------------------------------------

function handleVisibilityChange(): void {
  if (document.hidden) {
    stopTimer();
  } else {
    // Restart timer if auto-refresh is still enabled and a file is selected
    if (autoRefresh.value && selected.value !== '') {
      timer = setInterval(() => void refresh(), AUTO_REFRESH_MS);
    }
  }
}

const autoRefresh = ref(false);

watch([selected, lineCount], () => void refresh());
watch([autoRefresh, selected, lineCount], syncTimer);

onMounted(() => {
  loadList();
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
});

onBeforeUnmount(() => {
  stopTimer();
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }
});
</script>

<template>
  <section class="admin-logs" aria-labelledby="logs-heading">
    <header class="admin-logs__head">
      <h1 id="logs-heading" class="admin-logs__title">Logs</h1>
    </header>

    <PageHint :links="adminPageHelp.logs.links" :details="adminPageHelp.logs.details">
      Read the server's log files to troubleshoot problems. Pick a file with the
      <strong>File</strong> menu (or <strong>All logs</strong> to merge them), set how many recent
      lines to show with <strong>Lines</strong>, and press <strong>Refresh</strong> to reload.
      Turn on <strong>Auto-refresh</strong> to keep the newest entries streaming in every few
      seconds.
    </PageHint>

    <div class="admin-logs__controls">
      <label class="admin-logs__field">
        <span class="admin-logs__label">File</span>
        <Select v-model="selected" :options="fileOptions" label="Log file" />
      </label>
      <label class="admin-logs__field">
        <span class="admin-logs__label">Lines</span>
        <Select
          :model-value="lineCount"
          :options="lineOptions"
          label="Line count"
          @update:model-value="(v) => (lineCount = Number(v))"
        />
      </label>
      <Button variant="outline" size="sm" :loading="loading" :disabled="selected === ''" @click="() => void refresh(true)">
        Refresh
      </Button>
      <Switch v-model="autoRefresh" label="Auto-refresh (5s)" class="admin-logs__toggle" />
    </div>

    <!-- CU-116 (webux #11): failed background ticks leave the visible tail alone
         and mark themselves here instead of blanking the pane and toasting. -->
    <p v-if="pollFailedAt" class="admin-logs__poll-error" role="status">
      Last update failed at {{ pollFailedAt }} — showing the most recent successful read.
    </p>
    <!-- CU-116 (webux #12): the compact announcement channel — a line COUNT,
         not the log body. -->
    <p v-if="updateNote" class="admin-logs__update" role="status" data-testid="logs-update-note">
      {{ updateNote }}
    </p>

    <p v-if="truncated" class="admin-logs__truncated" role="note">
      Showing the most recent {{ lineCount }} lines
      ({{ selected === ALL_LOGS ? 'more lines available across files' : 'file is larger' }}).
    </p>

    <div v-if="(listLoading || loading) && lines.length === 0" class="admin-logs__loading" aria-hidden="true">
      <Skeleton variant="text" :lines="8" />
    </div>
    <EmptyState
      v-else-if="listError"
      icon="alert"
      title="Couldn’t load log files"
      :description="listError"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadList">Retry</Button>
      </template>
    </EmptyState>
    <EmptyState
      v-else-if="contentError"
      icon="alert"
      title="Couldn’t read log"
      :description="contentError"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="() => void refresh(true)">Retry</Button>
      </template>
    </EmptyState>
    <!-- CU-116 (webux #12): the WHOLE tail used to carry aria-live="polite",
       so every 5s tick re-announced every visible byte. The delta note below is
       the announcement channel now. -->
    <pre v-else ref="preEl" class="admin-logs__output" data-testid="logs-output"><template v-if="processedLines.length === 0">(no output)</template><template v-else v-for="(line, i) in processedLines" :key="i"><span v-html="line.content"></span>&#10;</template></pre>
  </section>
</template>

<style scoped>
.admin-logs {
  /* Use (almost) the full available width so long log lines wrap far less than
     at the old fixed 1100px document width. */
  max-width: 100%;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-logs__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-4);
}
.admin-logs__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}
.admin-logs__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-logs__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-logs__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.admin-logs__poll-error {
  margin: 0 0 var(--space-2);
  color: var(--warning);
  font-size: var(--text-xs);
}
.admin-logs__update {
  margin: 0 0 var(--space-2);
  color: var(--text-faint);
  font-size: var(--text-2xs);
}
.admin-logs__truncated {
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin-bottom: var(--space-2);
}
.admin-logs__output {
  max-height: 60vh;
  overflow: auto;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--text-muted);
  /* Don't wrap long log lines — scroll horizontally instead, so each entry stays
     on one line and is far easier to scan (the container is now full-width). */
  white-space: pre;
  overflow-x: auto;
}

/* Log level badges — :deep needed because badge HTML is injected via v-html */
:deep(.log-badge) {
  display: inline-block;
  padding: 0.1em 0.4em;
  border-radius: 3px;
  font-size: 0.85em;
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  vertical-align: middle;
}
:deep(.log-badge--info) {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
:deep(.log-badge--debug) {
  background: rgba(107, 114, 128, 0.15);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.3);
}
:deep(.log-badge--warning) {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}
:deep(.log-badge--error) {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
:deep(.log-badge--critical) {
  background: rgba(153, 27, 27, 0.2);
  color: #991b1b;
  border: 1px solid rgba(153, 27, 27, 0.4);
  font-weight: var(--font-bold);
}
/* Channel badge — distinct from level tones; keep the channel's own casing. */
:deep(.log-badge--channel) {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
  border: 1px solid rgba(139, 92, 246, 0.3);
  text-transform: none;
  letter-spacing: 0;
}

/* JSON syntax highlighting */
:deep(.json-key) {
  color: #60a5fa;
}
:deep(.json-string) {
  color: #34d399;
}
:deep(.json-number) {
  color: #fbbf24;
}
:deep(.json-boolean) {
  color: #f472b6;
}
:deep(.json-null) {
  color: #a78bfa;
}
</style>
