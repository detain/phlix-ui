/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { IconName } from '../components/Icon.vue';

/**
 * A single command surfaced in the ⌘K palette. `run` is invoked when the command
 * is chosen; everything else is presentation / matching metadata.
 */
export interface Command {
  /** Stable unique id (used for dedupe + recents). */
  id: string;
  /** Primary label shown in the palette. */
  title: string;
  /** Optional secondary line (e.g. a hint or current value). */
  subtitle?: string;
  /** Icon name from the @phlix/ui registry. */
  icon?: IconName;
  /** Section header the command groups under (default "Commands"). */
  group?: string;
  /** Extra terms to fuzzy-match against (synonyms, related words). */
  keywords?: string[];
  /** Keyboard-shortcut hint to render (e.g. ['⌘', 'K']). Display only. */
  shortcut?: string[];
  /** Lower sorts earlier among equal fuzzy scores / ungrouped lists. */
  priority?: number;
  /** Executed when the command is chosen. */
  run: () => void | Promise<void>;
}

const RECENTS_KEY = 'phlix.cmd.recents';
const RECENTS_MAX = 8;

/**
 * Fuzzy subsequence score of `query` against `text` (case-insensitive).
 * Returns a non-negative score (higher = better) or -1 when `query` is not a
 * subsequence of `text`. Rewards consecutive runs, word-boundary starts and
 * whole-prefix matches; penalises skipped gaps. An empty query scores 0 (neutral).
 */
export function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (q.length === 0) return 0;
  if (q.length > t.length) return -1;

  let score = 0;
  let ti = 0;
  let prevMatch = -2;
  let consecutive = 0;

  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi];
    let found = -1;
    for (let j = ti; j < t.length; j++) {
      if (t[j] === ch) {
        found = j;
        break;
      }
    }
    if (found === -1) return -1;

    score += 1;
    if (found === prevMatch + 1) {
      consecutive++;
      score += 5 + consecutive * 2; // reward longer consecutive runs
    } else {
      consecutive = 0;
    }
    const before = found === 0 ? '' : t[found - 1];
    if (found === 0 || before === ' ' || before === '-' || before === '/' || before === ':') {
      score += 8; // word-boundary bonus
    }
    if (prevMatch >= 0) {
      const gap = found - prevMatch - 1;
      if (gap > 0) score -= Math.min(gap, 4); // gap penalty (capped)
    }
    prevMatch = found;
    ti = found + 1;
  }

  if (t.startsWith(q)) score += 15; // strong whole-prefix bonus
  return score;
}

/**
 * Best fuzzy score of `query` across a command's title/keywords/group. Title
 * matches get a small boost so they outrank an equal keyword match. Empty query
 * scores 0 (every command matches).
 */
export function matchCommand(query: string, cmd: Command): number {
  if (!query.trim()) return 0;
  const titleScore = fuzzyScore(query, cmd.title);
  let best = titleScore >= 0 ? titleScore + 3 : -1;
  for (const k of cmd.keywords ?? []) {
    best = Math.max(best, fuzzyScore(query, k));
  }
  if (cmd.group) best = Math.max(best, fuzzyScore(query, cmd.group));
  return best;
}

function readRecents(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === 'string').slice(0, RECENTS_MAX);
  } catch {
    return [];
  }
}

/**
 * useCommandStore (R1.4) — backs the ⌘K command palette. A pure registry +
 * palette state + recents list; all live wiring (router/prefs, ⌘K listener, the
 * overlay UI) lives in `CommandPalette.vue`. `results` is the fuzzy-ranked,
 * recents-first view the palette renders.
 */
export const useCommandStore = defineStore('phlix-commands', () => {
  const registry = ref(new Map<string, Command>());
  const open = ref(false);
  const query = ref('');
  const recentIds = ref<string[]>(readRecents());

  const all = computed<Command[]>(() => Array.from(registry.value.values()));

  const results = computed<Command[]>(() => {
    const q = query.value.trim();
    const cmds = all.value;
    if (q) {
      return cmds
        .map((c) => ({ c, s: matchCommand(q, c) }))
        .filter((x) => x.s >= 0)
        .sort(
          (a, b) =>
            b.s - a.s ||
            (a.c.priority ?? 0) - (b.c.priority ?? 0) ||
            a.c.title.localeCompare(b.c.title),
        )
        .map((x) => x.c);
    }
    // No query: still-registered recents first (in recency order), then the rest.
    const recent = recentIds.value
      .map((id) => registry.value.get(id))
      .filter((c): c is Command => !!c);
    const recentSet = new Set(recent.map((c) => c.id));
    const rest = cmds
      .filter((c) => !recentSet.has(c.id))
      .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0) || a.title.localeCompare(b.title));
    return [...recent, ...rest];
  });

  /** Register one or more commands (dedupes by id). Returns a disposer that
   *  unregisters exactly the ids it added. */
  function register(cmd: Command | Command[]): () => void {
    const list = Array.isArray(cmd) ? cmd : [cmd];
    const m = new Map(registry.value);
    for (const c of list) m.set(c.id, c);
    registry.value = m;
    return () => unregister(list.map((c) => c.id));
  }

  function unregister(id: string | string[]): void {
    const ids = Array.isArray(id) ? id : [id];
    const m = new Map(registry.value);
    for (const i of ids) m.delete(i);
    registry.value = m;
  }

  function isRecent(id: string): boolean {
    return recentIds.value.includes(id);
  }

  function pushRecent(id: string): void {
    recentIds.value = [id, ...recentIds.value.filter((x) => x !== id)].slice(0, RECENTS_MAX);
  }

  function clearRecents(): void {
    recentIds.value = [];
  }

  function setQuery(v: string): void {
    query.value = v;
  }

  function openPalette(): void {
    query.value = '';
    open.value = true;
  }

  function closePalette(): void {
    open.value = false;
  }

  function togglePalette(): void {
    if (open.value) closePalette();
    else openPalette();
  }

  /** Resolve a registered command by id, record it as recent, close the palette,
   *  then run it. Unknown ids are a no-op. */
  async function runId(id: string): Promise<void> {
    const cmd = registry.value.get(id);
    if (!cmd) return;
    pushRecent(id);
    closePalette();
    await cmd.run();
  }

  watch(
    recentIds,
    (v) => {
      if (typeof localStorage === 'undefined') return;
      try {
        localStorage.setItem(RECENTS_KEY, JSON.stringify(v));
      } catch {
        /* quota / private mode — ignore */
      }
    },
    { deep: true },
  );

  return {
    registry,
    open,
    query,
    recentIds,
    all,
    results,
    register,
    unregister,
    isRecent,
    pushRecent,
    clearRecents,
    setQuery,
    openPalette,
    closePalette,
    togglePalette,
    runId,
  };
});
