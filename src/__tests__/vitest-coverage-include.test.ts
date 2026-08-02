/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S139 — RECURRENCE GUARD for `vite.config.ts`'s `coverage.include`.
 *
 * S139 replaced a hand-maintained coverage allow-list with the whole-tree glob
 * `src/**\/*.{ts,vue}`. The allow-list had stopped being maintained: it named 11 of
 * the 45 files directly under `src/pages/`, matched only `*.vue` under
 * `src/pages/admin/` (so `admin/helpLinks.ts` was dropped), and had no entry at all
 * for `src/utils/`, `src/directives/` or `src/tokens/`. **38 source files that DO
 * have a colocated `*.test.ts` were being executed by the suite and then discarded
 * from the report**, including all six `src/pages/Music*.vue`.
 *
 * 🔴 The failure mode is SILENCE. An omitted `include` entry does not warn — the
 * file simply is not in the output, so "coverage looks fine" and "coverage does not
 * know this file exists" are indistinguishable. That is the same class as a test
 * that passes for the wrong reason, and it makes an allow-list the DEFAULT outcome
 * for every new file.
 *
 * The fix was true on master and pinned by NOTHING. Measured 2026-08-02: reverting
 * `coverage.include` to the exact historical allow-list (`git show
 * f739aaca:vite.config.ts`) left the full suite at **229 files / 4233 passed**.
 * Coverage is computed only under `--coverage`, so no ordinary test can notice —
 * which is precisely why the config needs a guard that reads it as DATA.
 *
 * This file asserts the PROPERTY, not the literal: every source file the suite can
 * execute must be matched by `include` and not removed by `exclude`. A future
 * `include: ['src/**\/*.{ts,vue,tsx}']` is fine; a future allow-list is not.
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '../..');
const srcRoot = join(repoRoot, 'src');
const viteConfigPath = join(repoRoot, 'vite.config.ts');

/** The exact allow-list S139 removed, kept as the detector's known-bad control. */
const HISTORICAL_ALLOW_LIST = [
  'src/components/**/*.{ts,vue}',
  'src/stores/**/*.ts',
  'src/composables/**/*.ts',
  'src/i18n/**/*.ts',
  'src/api/**/*.ts',
  'src/app/**/*.{ts,vue}',
  'src/pages/BrowsePage.vue',
  'src/pages/MediaDetailPage.vue',
  'src/pages/PlayerPage.vue',
  'src/pages/LoginPage.vue',
  'src/pages/SignupPage.vue',
  'src/pages/SettingsPage.vue',
  'src/pages/LibraryScanPage.vue',
  'src/pages/MyServersPage.vue',
  'src/pages/FederationPage.vue',
  'src/pages/ManageSharesPage.vue',
  'src/pages/AuditLogsPage.vue',
  'src/pages/admin/**/*.vue',
];

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * The subset of glob syntax `coverage.include` / `coverage.exclude` actually use:
 * `**`, `*`, `?` and brace alternation. Hand-rolled rather than pulled from
 * `picomatch` on purpose — picomatch is a TRANSITIVE dependency here, not a
 * declared one, so importing it would make this guard depend on npm hoisting. The
 * "the matcher itself" suite below is what pays for writing it by hand.
 */
export function globToRegExp(glob: string): RegExp {
  let re = '';
  for (let i = 0; i < glob.length; i += 1) {
    const c = glob[i]!;
    if (c === '*' && glob[i + 1] === '*') {
      // `**/` spans zero or more directories; a trailing `**` spans the rest.
      if (glob[i + 2] === '/') {
        re += '(?:[^/]+/)*';
        i += 2;
      } else {
        re += '.*';
        i += 1;
      }
    } else if (c === '*') {
      re += '[^/]*';
    } else if (c === '?') {
      re += '[^/]';
    } else if (c === '{') {
      const close = glob.indexOf('}', i);
      re += `(?:${glob.slice(i + 1, close).split(',').map(escapeRe).join('|')})`;
      i = close;
    } else {
      re += escapeRe(c);
    }
  }
  return new RegExp(`^${re}$`);
}

const matches = (patterns: readonly string[], file: string): boolean =>
  patterns.some((p) => globToRegExp(p).test(file));

/**
 * Pull one string array out of the `coverage: { … }` block.
 *
 * Scoped to that block with a brace counter, because `test.exclude` exists too and
 * a bare `exclude:\s*\[` would read the wrong one — the classic way a config guard
 * ends up asserting something true about a different setting.
 */
export function parseCoverageList(source: string, key: 'include' | 'exclude'): string[] {
  const at = source.indexOf('coverage: {');
  if (at === -1) return [];
  let depth = 0;
  let end = at;
  for (let i = source.indexOf('{', at); i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    else if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  // Line comments first: the exclude array is heavily annotated, and a `//` line
  // mentioning a path would otherwise be parsed as a pattern.
  const block = source.slice(at, end).replace(/^\s*\/\/.*$/gm, '');
  const arr = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`).exec(block);
  if (!arr) return [];
  return [...arr[1]!.matchAll(/['"`]([^'"`]+)['"`]/g)].map((m) => m[1]!);
}

/** Every file under `src/`, repo-relative with forward slashes, sorted. */
function srcFiles(dir = srcRoot): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...srcFiles(full));
    else out.push(relative(repoRoot, full).split('\\').join('/'));
  }
  return out.sort();
}

const configSource = readFileSync(viteConfigPath, 'utf8');
const include = parseCoverageList(configSource, 'include');
const exclude = parseCoverageList(configSource, 'exclude');
const files = srcFiles();

/** Compilable source — what v8 can instrument at all. */
const sources = files.filter((f) => f.endsWith('.ts') || f.endsWith('.vue'));
/** Source with a colocated spec: provably executed by the suite. */
const underTest = sources.filter(
  (f) => !f.endsWith('.test.ts') && files.includes(f.replace(/\.(ts|vue)$/, '.test.ts')),
);

describe('S139 — coverage.include must measure what the suite executes', () => {
  it('reads both lists out of vite.config.ts, not out of a hard-coded copy', () => {
    // Non-inertness. If the parser silently returned [] every assertion below would
    // pass vacuously — an empty include matches nothing, so `unmeasured` would be
    // the whole tree and `toEqual([])` would fail; but an empty EXCLUDE would pass
    // for the wrong reason, so both are pinned here.
    expect(include.length).toBeGreaterThan(0);
    expect(exclude.length).toBeGreaterThan(0);
  });

  it('measures every source file that has a colocated *.test.ts', () => {
    // The direct S139 criterion: no file the suite executes may be silently absent
    // from the report. 38 were, including all six src/pages/Music*.vue.
    const unmeasured = underTest.filter((f) => !matches(include, f) || matches(exclude, f));
    expect(unmeasured).toEqual([]);
    // …and the set really is populated, so the filter above is not a no-op.
    expect(underTest.length).toBeGreaterThan(100);
    expect(underTest).toEqual(expect.arrayContaining(['src/pages/MusicAlbumPage.vue']));
  });

  it('measures every shipped source file, tested or not, so 0% shows up honestly', () => {
    // Stronger than the bullet above and the real anti-rot property: an untested
    // file must appear at 0%, not vanish. (S139 found ParentalControlsPage.vue and
    // SyncPlayPage.vue at 0/260 and 0/65 lines the moment the allow-list went.)
    const missing = sources.filter(
      (f) => !f.endsWith('.test.ts') && !matches(exclude, f) && !matches(include, f),
    );
    expect(missing).toEqual([]);
  });

  it('carries no dead exclude entry', () => {
    // An exclude that matches nothing is the same rot in the other direction: it
    // reads as a deliberate carve-out while describing a path that no longer exists.
    const dead = exclude.filter((p) => !files.some((f) => globToRegExp(p).test(f)));
    expect(dead).toEqual([]);
  });

  it('excludes only test code, the dev playground, and ambient declarations', () => {
    // A whole-tree include is only honest while the exclude list stays small and
    // justified — widening `exclude` is the other way to make a file vanish in
    // silence. Anything new here must be a deliberate decision, argued in review.
    expect([...exclude].sort()).toEqual([
      '**/*.test.ts',
      'src/**/*.d.ts',
      'src/__tests__/**',
      'src/dev/**',
      'src/test/**',
    ]);
  });
});

describe('S139 — the detector itself', () => {
  it('reads the coverage block, and not the sibling test.exclude', () => {
    const src = [
      'test: {',
      "  exclude: [...configDefaults.exclude, 'e2e/**'],",
      '  coverage: {',
      "    include: ['src/**/*.{ts,vue}'],",
      '    exclude: [',
      '      // Test code and its harness.',
      "      '**/*.test.ts',",
      "      'src/dev/**',",
      '    ],',
      '  },',
      '}',
    ].join('\n');
    expect(parseCoverageList(src, 'include')).toEqual(['src/**/*.{ts,vue}']);
    // `e2e/**` belongs to test.exclude, one level up — it must NOT appear here.
    expect(parseCoverageList(src, 'exclude')).toEqual(['**/*.test.ts', 'src/dev/**']);
  });

  it('drops a path mentioned in a comment rather than treating it as a pattern', () => {
    const src = [
      'coverage: {',
      "  include: ['src/**/*.{ts,vue}'],",
      '  exclude: [',
      "    // NOTE: 'src/app/placeholder/**' used to be listed here — it IS shipped.",
      "    'src/dev/**',",
      '  ],',
      '}',
    ].join('\n');
    expect(parseCoverageList(src, 'exclude')).toEqual(['src/dev/**']);
  });

  it('matches the glob shapes these two lists actually use', () => {
    const whole = globToRegExp('src/**/*.{ts,vue}');
    expect(whole.test('src/index.ts')).toBe(true);
    expect(whole.test('src/pages/admin/helpLinks.ts')).toBe(true);
    expect(whole.test('src/pages/MusicAlbumPage.vue')).toBe(true);
    expect(whole.test('src/tokens/theme.css')).toBe(false);
    expect(whole.test('dist/index.d.ts')).toBe(false);

    expect(globToRegExp('**/*.test.ts').test('src/a/b.test.ts')).toBe(true);
    expect(globToRegExp('src/**/*.d.ts').test('src/env.d.ts')).toBe(true);
    // A trailing `**` covers the subtree — and must not spill onto a sibling whose
    // name merely starts with the directory name.
    expect(globToRegExp('src/dev/**').test('src/dev/visual/x.ts')).toBe(true);
    expect(globToRegExp('src/dev/**').test('src/devil.ts')).toBe(false);
  });

  it('FAILS the historical allow-list — the control that proves the check bites', () => {
    // The exact list S139 deleted. If this ever comes back green the property
    // assertions above have stopped discriminating and this whole file is theatre.
    const orphans = underTest.filter((f) => !matches(HISTORICAL_ALLOW_LIST, f));
    expect(orphans.length).toBeGreaterThan(30);
    expect(orphans).toEqual(
      expect.arrayContaining([
        'src/pages/MusicAlbumPage.vue',
        'src/pages/MusicArtistPage.vue',
        'src/pages/MusicArtistsPage.vue',
        'src/pages/MusicLibraryPage.vue',
        'src/pages/MusicPlayerPage.vue',
        'src/pages/MusicTracksPage.vue',
        // The `src/pages/admin/**/*.vue` rot: the one .ts under admin/ was dropped.
        'src/pages/admin/helpLinks.ts',
      ]),
    );
    // …and the same files ARE measured by the list the config carries today.
    expect(orphans.filter((f) => !matches(include, f))).toEqual([]);
  });
});
