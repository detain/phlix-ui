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
 * ⚠️ S136 — "governed by nothing global" turned out to be the HOLE, not just a
 * scoping note: see `extractWaitForBudgets` and the poller-floor suite below.
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

/** One `vi.waitFor(…)` call site and the poller ceiling it declared, if any. */
interface Poller {
  file: string;
  /** 1-based line of the `vi.waitFor(` opener. */
  line: number;
  /** Milliseconds, or `null` when the call declares none (Vitest default: 1 000 ms). */
  ms: number | null;
}

/**
 * S136 — every `vi.waitFor(…)` and the ceiling it declares.
 *
 * Deliberately a SEPARATE scan from the budget scan above, because a poller
 * ceiling is a different thing from a test budget and must not be compared
 * against `testTimeout`: it has to stay strictly BELOW the test budget, not
 * above it, or the test blows its own budget before the poller can report the
 * assertion that actually failed.
 *
 * Args are split at top-level commas with a depth counter rather than by regex, so
 * a `{ … }` or `( … )` inside the polled callback cannot be mistaken for the
 * options object; only the LAST top-level argument is inspected for `timeout:`.
 */
export function extractWaitForBudgets(source: string, file = '<inline>'): Poller[] {
  const out: Poller[] = [];
  const marker = 'vi.waitFor(';
  for (let i = source.indexOf(marker); i !== -1; i = source.indexOf(marker, i + 1)) {
    const open = i + marker.length;
    let depth = 1;
    let j = open;
    const starts = [open];
    for (; j < source.length && depth > 0; j += 1) {
      const c = source[j]!;
      if (c === '(' || c === '{' || c === '[') depth += 1;
      else if (c === ')' || c === '}' || c === ']') depth -= 1;
      else if (c === ',' && depth === 1) starts.push(j + 1);
    }
    // Walk back past a TRAILING COMMA's empty tail — `…, { timeout: 15_000 },\n)`
    // splits into three args whose last one is whitespace, which would read every
    // multi-line call in this repo as "no ceiling declared". Caught by the fixture
    // in "sees a vi.waitFor ceiling in every shape the suite actually uses".
    const args = starts.map((s, k) => source.slice(s, k + 1 < starts.length ? starts[k + 1]! - 1 : j - 1));
    let last = '';
    for (let k = args.length - 1; k >= 0; k -= 1) {
      if (args[k]!.trim() !== '') {
        last = args[k]!;
        break;
      }
    }
    // …and only read a ceiling out of that argument if it IS an options object.
    // Without this a single-argument call whose CALLBACK happens to mention
    // `timeout:` (e.g. `expect(state).toEqual({ timeout: 99 })`) would be scored as
    // "ceiling declared" and skipped — a false negative, the exact direction that
    // makes a guard worthless. The decoy in the fixture below pins it.
    const trimmed = last.trim();
    const isOptions = trimmed.startsWith('{') && trimmed.endsWith('}');
    const t = isOptions ? /\btimeout\s*:\s*([0-9_]+)/.exec(trimmed) : null;
    out.push({
      file,
      line: source.slice(0, i).split('\n').length,
      ms: t ? Number(t[1]!.replace(/_/g, '')) : null,
    });
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

function allPollers(): Poller[] {
  const out: Poller[] = [];
  for (const file of testFiles()) {
    // Skipped for the same reason as `allBudgets`: the fixtures in "the detector
    // itself" below contain `vi.waitFor(` inside string literals. Paid for by
    // `makes no vi.waitFor call of its own` in the poller suite.
    if (file === SELF) continue;
    out.push(...extractWaitForBudgets(readFileSync(join(repoRoot, file), 'utf8'), file));
  }
  return out;
}

const globals = parseGlobalBudgets(readFileSync(viteConfigPath, 'utf8'));
const budgets = allBudgets();
const pollers = allPollers();

/**
 * S136 — the headroom POLICY, as opposed to the individual overrides above.
 *
 * `vite.config.ts` carrying `testTimeout` / `hookTimeout` at all was pinned by
 * nothing: deleting BOTH lines left this file at 11/11 pass, and the suite would
 * silently fall back to Vitest's 5 000 / 10 000 ms defaults — the exact state that
 * produced S136 in the first place (`admin.test.ts`'s cold lazy import at 1 253 ms
 * against 5 000 ms, ~4x headroom, red on a busy box).
 *
 * Measured A/B on 2026-08-02, three concurrent full suites in one checkout, 48
 * cores, load average peaking at 111:
 *
 *   global budgets DELETED (5 000 / 10 000 defaults)  16 `Test timed out` failures
 *                                                     across the three runs (4/6/6)
 *   global budgets 30 000 / 30 000                    0 / 0 / 0
 *
 * So this floor is not a preference, it is the difference between a red suite and
 * a green one under the load the project actually runs at. It is a FLOOR, not an
 * equality: raising the global further is allowed, and the neutralisation check
 * below will catch it the moment it swallows one of the overrides.
 *
 * ⚠ What a 30 000 ms budget will no longer catch: a single test that regresses
 * from ~2 s to ~25 s now passes. That is accepted deliberately — Vitest prints
 * per-test durations and the slow-test list, so a real slowdown is visible there,
 * whereas an intermittent timeout is indistinguishable from a behavioural
 * regression and trains everyone to re-run.
 */
const POLICY_MIN_TEST_TIMEOUT = 30_000;
const POLICY_MIN_HOOK_TIMEOUT = 30_000;

/**
 * S136 — the floor for a `vi.waitFor` poller, which NO global governs.
 *
 * `testTimeout` does not reach a poller: `vi.waitFor(fn)` has its own ceiling and
 * defaults to **1 000 ms**, which is thinner than anything S136 or S118 ever fixed.
 * The class is not hypothetical — in the A/B above,
 * `MetricsPage.apex-registration.test.ts`'s "mounts the page with the REAL
 * (un-stubbed) VueApexCharts wrapper" went RED under concurrent load *with* the
 * 30 000 ms global in place, because its own `{ timeout: 3000 }` poller expired
 * first. It measures 578 ms solo, so 3 000 ms was ~5x headroom — the same ratio
 * that made `admin.test.ts` flaky.
 *
 * 15 000 ms is 26x the measured cost and deliberately BELOW the 30 000 ms test
 * budget, so a poller that never resolves still reports its own assertion error
 * rather than being cut off by an anonymous test timeout.
 */
const POLICY_MIN_WAITFOR_TIMEOUT = 15_000;

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

describe('S136 — the global headroom policy must stay declared, not just be true today', () => {
  it('vite.config.ts declares testTimeout / hookTimeout at or above the policy floor', () => {
    // The S118 checks above all measure overrides AGAINST these two numbers, so
    // deleting them does not redden anything there — it silently lowers every
    // unbudgeted test in the suite to Vitest's 5 000 ms default. Measured: with
    // both lines removed this whole file still passed 11/11.
    expect(
      globals.testTimeout,
      'vite.config.ts must declare test.testTimeout >= '
        + `${POLICY_MIN_TEST_TIMEOUT} ms — three concurrent full suites produced 16 `
        + '"Test timed out in 5000ms" failures without it and 0 with it',
    ).toBeGreaterThanOrEqual(POLICY_MIN_TEST_TIMEOUT);
    expect(
      globals.hookTimeout,
      `vite.config.ts must declare test.hookTimeout >= ${POLICY_MIN_HOOK_TIMEOUT} ms`,
    ).toBeGreaterThanOrEqual(POLICY_MIN_HOOK_TIMEOUT);
  });

  it('states the rationale in the config, next to the numbers', () => {
    // "Explicit and justified in-file" is half of S136's acceptance. A bare pair of
    // literals is exactly as rottable as no literals: the next person raising or
    // dropping them has nothing to weigh. This only asserts that SOME prose sits
    // with them, which is the most a test can check and still be worth having.
    const config = readFileSync(viteConfigPath, 'utf8');
    const at = config.indexOf('testTimeout:');
    expect(at).toBeGreaterThan(-1);
    const preamble = config.slice(Math.max(0, at - 600), at);
    expect(
      /^\s*\/\//m.test(preamble),
      'the testTimeout literal must be preceded by a comment explaining the budget',
    ).toBe(true);
  });
});

describe('S136 — vi.waitFor pollers, the class no global timeout reaches', () => {
  it('finds every vi.waitFor call site in the suite', () => {
    // Inventory, so a renamed file or a new call spelling cannot quietly reduce the
    // floor check below to a no-op the way an unmatched scanner would.
    expect(pollers.map((p) => p.file)).toEqual(
      expect.arrayContaining([
        'src/pages/admin/MetricsPage.apex-registration.test.ts',
        'src/pages/admin/SettingsPage.test.ts',
      ]),
    );
    expect(pollers.length).toBeGreaterThanOrEqual(3);
  });

  it('makes no vi.waitFor call of its own, which is what pays for skipping itself', () => {
    // The fixtures in "the detector itself" mention `vi.waitFor(` inside string
    // literals; a real call here would be invisible to the floor check.
    const self = readFileSync(join(repoRoot, SELF), 'utf8');
    expect(self).not.toMatch(/^\s*(?:await\s+)?vi\.waitFor\(/m);
  });

  it('gives every poller an explicit ceiling at or above the poller floor', () => {
    const thin = pollers
      .filter((p) => p.ms === null || p.ms < POLICY_MIN_WAITFOR_TIMEOUT)
      .map(
        (p) =>
          `${p.file}:${p.line} — vi.waitFor ceiling `
          + `${p.ms === null ? "UNSET (Vitest's 1000 ms default)" : `${p.ms} ms`} is below the `
          + `${POLICY_MIN_WAITFOR_TIMEOUT} ms poller floor. testTimeout does NOT govern a `
          + 'poller: it expires first and the test reads as an assertion failure, not a timeout.',
      );
    expect(thin).toEqual([]);
  });

  it('keeps every poller ceiling BELOW the test budget it runs inside', () => {
    // The ordering is the point: a poller at or above `testTimeout` gets cut off by
    // an anonymous "Test timed out" before it can report which expectation never
    // came true, which is strictly less information for the same wall time.
    const swallowed = pollers
      .filter((p) => p.ms !== null && p.ms >= globals.testTimeout)
      .map((p) => `${p.file}:${p.line} — ${p.ms} ms >= testTimeout ${globals.testTimeout} ms`);
    expect(swallowed).toEqual([]);
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

  it('sees a vi.waitFor ceiling in every shape the suite actually uses (S136)', () => {
    const src = [
      // multi-line, options object last — MetricsPage.apex-registration's shape
      '  await vi.waitFor(',
      '    async () => {',
      '      await flushPromises();',
      "      expect(w.html()).toContain('apexcharts-canvas');",
      '    },',
      '    { timeout: 15_000, interval: 25 },',
      '  );',
      // single-line, NO options at all — SettingsPage's shape, silently 1 000 ms
      '  await vi.waitFor(() => expect(banner(w).exists()).toBe(false));',
      // wrapped callback with no options, and a decoy object inside the callback
      '  await vi.waitFor(() =>',
      '    expect(store.state).toEqual({ timeout: 99 }),',
      '  );',
    ].join('\n');
    expect(extractWaitForBudgets(src, 'f.ts')).toEqual([
      { file: 'f.ts', line: 1, ms: 15000 },
      { file: 'f.ts', line: 8, ms: null },
      // The decoy proves the depth counter works: `{ timeout: 99 }` sits inside the
      // callback, not in a trailing options argument, so it is NOT a poller ceiling.
      { file: 'f.ts', line: 9, ms: null },
    ]);
  });

  it('rates an unset vi.waitFor ceiling as thinner than any declared one', () => {
    // Vitest's default is 1 000 ms — below the poller floor, so an omitted option
    // must be treated as a violation and not as "nothing to check here".
    const unset = extractWaitForBudgets('await vi.waitFor(() => expect(1).toBe(1));', 'f.ts');
    expect(unset).toEqual([{ file: 'f.ts', line: 1, ms: null }]);
    expect(unset[0]!.ms === null || unset[0]!.ms < POLICY_MIN_WAITFOR_TIMEOUT).toBe(true);
    const declared = extractWaitForBudgets('await vi.waitFor(f, { timeout: 15_000 });', 'f.ts');
    expect(declared[0]!.ms).toBe(15000);
  });
});
