/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S118 — RECURRENCE GUARD for the vitest budget contract.
 *
 * S118's acceptance is "20 consecutive `npm run test:run` invocations pass on an
 * unmodified tree", and its in-scope instruction is "raise `testTimeout` for these
 * three (or globally, with justification), or make them deterministic — **do not**
 * simply retry them". Both halves are load-bearing and neither was pinned by any
 * test, so both were free to rot. They already did once:
 *
 *   `vite.config.ts`'s global `testTimeout` was raised 5 000 → 30 000 ms by
 *   39092c5d on 2026-08-01, which is AFTER S118 (9c646fa7) had granted three
 *   specific sites an explicit `30_000`. **A global default raised to an
 *   override's own value silently DELETES that override** — the literal still
 *   reads as deliberate and grants exactly nothing. `MusicLibraryPage.test.ts`'s
 *   heavy drill-down test was one of them, it was measured at 19 960 ms of its
 *   30 000 ms budget (1.50x headroom) on a run that PASSED, and it then went red
 *   on 2 of 20 consecutive `npm run test:run` invocations.
 *
 * That failure was found by hand, twice, months apart. This file is the machine
 * that finds it. It asserts:
 *
 *   1. every explicit per-test / per-describe budget is STRICTLY GREATER than
 *      `vite.config.ts`'s global `testTimeout`, and every explicit per-hook budget
 *      is strictly greater than its `hookTimeout` — so a future global raise that
 *      swallows an override fails HERE rather than as an intermittent red run
 *      three weeks later;
 *   2. the suite carries no `retry` / `repeats`, in the config or in any spec —
 *      the one fix S118 explicitly forbids, and the one that would make every
 *      other assertion in this file meaningless.
 *
 * The scanners are proved non-inert by the "the detector itself" describe below —
 * a detector that silently matches nothing scores a fake green forever (the
 * `adminSecretInputs.test.ts` precedent).
 */

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '../..');
const srcRoot = join(repoRoot, 'src');
const viteConfigPath = join(repoRoot, 'vite.config.ts');

/** Vitest's own defaults, used when `vite.config.ts` declares neither. */
const VITEST_DEFAULT_TEST_TIMEOUT = 5000;
const VITEST_DEFAULT_HOOK_TIMEOUT = 10000;

/** Which global default governs a given budget. */
type BudgetKind = 'test' | 'hook';

interface Budget {
  /** Repo-relative path. */
  file: string;
  /** 1-based line of the budget literal. */
  line: number;
  /** Milliseconds, underscores stripped. */
  ms: number;
  /** `describe` / `it` / `beforeAll` / … — the call the budget is attached to. */
  owner: string;
  kind: BudgetKind;
}

const TEST_OPENERS = ['describe', 'it', 'test'];
const HOOK_OPENERS = ['beforeAll', 'afterAll', 'beforeEach', 'afterEach'];
const ALL_OPENERS = [...TEST_OPENERS, ...HOOK_OPENERS];

function kindOf(owner: string): BudgetKind {
  return HOOK_OPENERS.includes(owner) ? 'hook' : 'test';
}

/** Read `testTimeout` / `hookTimeout` out of the vitest `test` block. */
export function parseGlobalBudgets(source: string): { testTimeout: number; hookTimeout: number } {
  const read = (key: string, fallback: number): number => {
    const m = new RegExp(`^\\s*${key}:\\s*([0-9_]+)\\s*,`, 'm').exec(source);
    return m ? Number(m[1]!.replace(/_/g, '')) : fallback;
  };
  return {
    testTimeout: read('testTimeout', VITEST_DEFAULT_TEST_TIMEOUT),
    hookTimeout: read('hookTimeout', VITEST_DEFAULT_HOOK_TIMEOUT),
  };
}

/**
 * `describe('…', { timeout: N }, fn)` / `it('…', { timeout: N }, fn)`.
 *
 * The name string is REQUIRED by the pattern, which is what keeps
 * `vi.waitFor(fn, { timeout: 3000, interval: 25 })` — a real occurrence at
 * `MetricsPage.apex-registration.test.ts:150` — out of the results: that timeout
 * belongs to a poller, not to a test budget, and is governed by nothing global.
 */
export function extractOptionBudgets(source: string, file = '<inline>'): Budget[] {
  const out: Budget[] = [];
  const re = new RegExp(
    `\\b(${TEST_OPENERS.join('|')})(?:\\.[A-Za-z]+)*\\s*\\(\\s*(['"\`])(?:\\\\.|(?!\\2)[^\\\\])*\\2\\s*,\\s*\\{([^{}]*)\\}`,
    'g',
  );
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    const t = /\btimeout\s*:\s*([0-9_]+)/.exec(m[3]!);
    if (!t) continue;
    out.push({
      file,
      line: source.slice(0, m.index).split('\n').length,
      ms: Number(t[1]!.replace(/_/g, '')),
      owner: m[1]!,
      kind: kindOf(m[1]!),
    });
  }
  return out;
}

/**
 * The trailing-argument form — `it('…', async () => { … }, 120_000);` and the
 * hook twin `beforeAll(() => { … }, 300_000);`.
 *
 * Anchored FORWARD from the opener rather than backward from the `}, N);` line:
 * a bare backward scan cannot tell an `it`'s budget from the second argument of a
 * nested `setTimeout(() => { … }, 3000)`, whose closing line has the identical
 * shape. Starting at the opener and taking the FIRST line that closes a block at
 * the opener's own indent makes the association structural instead of textual.
 */
export function extractTrailingBudgets(source: string, file = '<inline>'): Budget[] {
  const out: Budget[] = [];
  const lines = source.split('\n');
  const openRe = new RegExp(`^(\\s*)(${ALL_OPENERS.join('|')})(?:\\.[A-Za-z]+)*\\s*\\(`);
  const closeRe = /^\s*\},\s*(\d[\d_]*)\s*\)\s*;?\s*$/;
  for (let i = 0; i < lines.length; i += 1) {
    const open = openRe.exec(lines[i]!);
    if (!open) continue;
    const closer = `${open[1]!}}`;
    for (let j = i + 1; j < lines.length; j += 1) {
      if (!lines[j]!.startsWith(closer)) continue;
      const c = closeRe.exec(lines[j]!);
      if (c) {
        out.push({
          file,
          line: j + 1,
          ms: Number(c[1]!.replace(/_/g, '')),
          owner: open[2]!,
          kind: kindOf(open[2]!),
        });
      }
      break;
    }
  }
  return out;
}

/** Every `*.test.ts` under `src/`, repo-relative, sorted. */
function testFiles(dir = srcRoot): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...testFiles(full));
    else if (entry.name.endsWith('.test.ts')) out.push(relative(repoRoot, full));
  }
  return out.sort();
}

/**
 * This file, repo-relative. It is the one spec the budget scan must SKIP: the
 * "the detector itself" fixtures below are deliberately written as neutralised
 * examples (`{ timeout: 30_000 }` against a global 30 000), so scanning them
 * would make this guard permanently red at itself. The skip is paid for by
 * `declares no budget of its own` below, which asserts this file really has
 * nothing for the scan to miss.
 */
const SELF = relative(repoRoot, fileURLToPath(import.meta.url));

function allBudgets(): Budget[] {
  const out: Budget[] = [];
  for (const file of testFiles()) {
    if (file === SELF) continue;
    const source = readFileSync(join(repoRoot, file), 'utf8');
    out.push(...extractOptionBudgets(source, file), ...extractTrailingBudgets(source, file));
  }
  return out;
}

const globals = parseGlobalBudgets(readFileSync(viteConfigPath, 'utf8'));
const budgets = allBudgets();

describe('S118 — no explicit vitest budget may be neutralised by a global default', () => {
  it('reads the global budgets out of vite.config.ts, not out of a hard-coded copy', () => {
    // Non-inertness: if the config stops declaring these the fallbacks are
    // Vitest's own defaults, and every override below is measured against those.
    expect(globals.testTimeout).toBeGreaterThan(0);
    expect(globals.hookTimeout).toBeGreaterThan(0);
  });

  it('finds every explicit budget in the suite — both spellings, both kinds', () => {
    // An inventory, not a total: it may grow. It exists so a change that makes a
    // budget INVISIBLE to the scanner (a new call spelling, a renamed file) fails
    // here instead of quietly reducing this file to a no-op. Keyed by
    // file/owner/value rather than by line so that editing a spec above one of
    // them does not turn this into a line-number chore.
    const sites = budgets.map((b) => `${b.file} ${b.owner} ${b.ms}`);
    expect(sites).toEqual(
      expect.arrayContaining([
        // hook budgets — governed by `hookTimeout`
        'src/__tests__/dist-apex-dedupe.test.ts beforeAll 300000',
        'src/__tests__/dist-player-split.test.ts beforeAll 300000',
        'src/__tests__/dist-player-split.test.ts afterAll 120000',
        // test budgets — governed by `testTimeout`; both spellings represented
        'src/app/admin.test.ts describe 60000',
        'src/pages/MusicLibraryPage.test.ts describe 60000',
        'src/pages/MusicLibraryPage.test.ts it 120000',
        'src/pages/admin/helpLinks.test.ts it 60000',
        'src/pages/hubHelpLinks.test.ts it 60000',
      ]),
    );
    expect(budgets.filter((b) => b.kind === 'hook').length).toBeGreaterThanOrEqual(3);
    expect(budgets.filter((b) => b.kind === 'test').length).toBeGreaterThanOrEqual(5);
  });

  it('declares no budget of its own, which is what pays for skipping itself', () => {
    // Real suites/tests in THIS file are declared at column 0 / two-space indent
    // with no options object and no trailing number. If that ever stops being
    // true the skip above starts hiding something and this fails first.
    const self = readFileSync(join(repoRoot, SELF), 'utf8');
    expect(self).not.toMatch(/^describe\([^\n]*\{[^\n]*\btimeout\s*:/m);
    expect(self).not.toMatch(/^ {2}it\([^\n]*\{[^\n]*\btimeout\s*:/m);
    expect(self).not.toMatch(/^ {0,2}\},\s*\d[\d_]*\s*\)\s*;?\s*$/m);
  });

  it('grants every override real headroom over the global default', () => {
    const neutralised = budgets
      .filter((b) => b.ms <= (b.kind === 'hook' ? globals.hookTimeout : globals.testTimeout))
      .map(
        (b) =>
          `${b.file}:${b.line} — ${b.owner} budget ${b.ms} ms is not above the global `
          + `${b.kind}Timeout ${b.kind === 'hook' ? globals.hookTimeout : globals.testTimeout} ms, `
          + 'so the literal grants nothing',
      );
    expect(neutralised).toEqual([]);
  });
});

describe('S118 — the suite must not paper over a flake with a retry', () => {
  const configSource = readFileSync(viteConfigPath, 'utf8');

  it('vite.config.ts declares no retry / repeats', () => {
    expect(configSource).not.toMatch(/\bretry\s*:/);
    expect(configSource).not.toMatch(/\brepeats\s*:/);
  });

  it('no spec sets a retry on itself', () => {
    // Narrow on purpose: "retry" is a legitimate UI noun all over this suite
    // ("shows an error state with retry"), so only the vitest spellings count.
    const offenders = testFiles().filter((f) =>
      /\bretry\s*:\s*\d|\.retry\s*\(|\brepeats\s*:\s*\d/.test(readFileSync(join(repoRoot, f), 'utf8')),
    );
    expect(offenders).toEqual([]);
  });
});

describe('S118 — the detector itself', () => {
  it('reads both global budgets, and falls back to Vitest defaults when absent', () => {
    expect(parseGlobalBudgets('  test: {\n    testTimeout: 30000,\n    hookTimeout: 45_000,\n  }')).toEqual({
      testTimeout: 30000,
      hookTimeout: 45000,
    });
    expect(parseGlobalBudgets('export default {}')).toEqual({
      testTimeout: VITEST_DEFAULT_TEST_TIMEOUT,
      hookTimeout: VITEST_DEFAULT_HOOK_TIMEOUT,
    });
  });

  it('sees the options-object form on describe and on it', () => {
    const src = [
      "describe('a suite', { timeout: 60_000 }, () => {",
      "  it('a test', { timeout: 45000 }, () => {});",
      '});',
    ].join('\n');
    expect(extractOptionBudgets(src, 'f.ts')).toEqual([
      { file: 'f.ts', line: 1, ms: 60000, owner: 'describe', kind: 'test' },
      { file: 'f.ts', line: 2, ms: 45000, owner: 'it', kind: 'test' },
    ]);
  });

  it('sees the trailing-argument form, and tells a test budget from a hook budget', () => {
    const src = [
      "describe('s', () => {",
      '  beforeAll(() => {',
      '    build();',
      '  }, 300_000);',
      '',
      "  it('t', async () => {",
      '    await work();',
      '  }, 120_000);',
      '});',
    ].join('\n');
    expect(extractTrailingBudgets(src, 'f.ts')).toEqual([
      { file: 'f.ts', line: 4, ms: 300000, owner: 'beforeAll', kind: 'hook' },
      { file: 'f.ts', line: 8, ms: 120000, owner: 'it', kind: 'test' },
    ]);
  });

  it('does NOT mistake a vi.waitFor poller or a nested setTimeout for a budget', () => {
    const src = [
      "it('t', async () => {",
      '  await vi.waitFor(',
      '    () => {',
      '      expect(x).toBe(1);',
      '    },',
      '    { timeout: 3000, interval: 25 },',
      '  );',
      '  setTimeout(() => {',
      '    tick();',
      '  }, 3000);',
      '});',
    ].join('\n');
    expect(extractOptionBudgets(src, 'f.ts')).toEqual([]);
    expect(extractTrailingBudgets(src, 'f.ts')).toEqual([]);
  });

  it('flags a neutralised override — the exact 39092c5d shape', () => {
    const src = "describe('s', { timeout: 30_000 }, () => {});";
    const found = extractOptionBudgets(src, 'f.ts');
    expect(found).toHaveLength(1);
    // 30_000 against a global 30000: present in the source, worth nothing.
    expect(found[0]!.ms > 30000).toBe(false);
    // …and worth something again the moment the global is lower.
    expect(found[0]!.ms > 5000).toBe(true);
  });
});
