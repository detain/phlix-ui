/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

/**
 * UI-3.1 [U-H2] — code-split boot-graph guard.
 *
 * phlix-ui is a LIBRARY consumed via its prebuilt `dist/`. The main entry
 * (`@phlix/ui` → `dist/phlix-ui.js`) is loaded eagerly by every consumer, so its
 * STATIC import closure IS the boot graph shipped to every page. Two surfaces
 * must stay OUT of that boot graph:
 *
 *  1. The Player surface — extracted to the `@phlix/ui/player` secondary entry
 *     (`src/player.ts` → `dist/player.js`). Nothing in the main entry may
 *     statically pull a `Player-*` chunk back in.
 *  2. MediaDetail / FilterBar / MetadataMatchModal — used ONLY inside already-lazy
 *     route pages. They are exported from `src/index.ts` as `defineAsyncComponent`
 *     factories (not static default re-exports) so their ~56KB lands in
 *     dynamically-imported chunks, never the eager entry.
 *
 * WHY THIS TEST BUILDS FRESH (unlike dist-css-bundle.test.ts, which reads the
 * committed `dist/`): the committed `dist/` is only rebuilt at release time, so
 * between a source change and the next release it can lag `src/`. CI happens to
 * run `npm run build` before `npm run test:run`, but the local/worklog
 * verification command is a bare `vitest run`. To assert the CURRENT source's
 * split under EVERY run mode without committing `dist/` (a release-time gate), we
 * build both entries fresh into a throwaway outDir and assert against that. This
 * also doubles as the "the split still builds" check.
 *
 * The assertion is a real transitive static-closure walk (not just a grep of the
 * entry file) so a component hoisted into a *shared* chunk that the entry
 * statically imports would still be caught.
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const outDir = join(root, 'node_modules', '.cache', 'ui-3.1-split-dist');
const viteBin = join(root, 'node_modules', '.bin', 'vite');

// Surfaces that must NOT be reachable via the main entry's STATIC import graph.
// Prefixes are anchored with a trailing hyphen so `MediaDetail-*` does NOT also
// match the legitimately-lazy `MediaDetailPage-*` route chunk (and `Player-*`
// does not match `PlayerPage-*`).
const FORBIDDEN_PREFIXES = ['Player', 'MediaDetail', 'FilterBar', 'MetadataMatchModal'];

/** Matches STATIC import / re-export specifiers only — never dynamic `import(...)`. */
const STATIC_IMPORT_RE = /(?:\bfrom\s*|(?:^|[;\n])\s*import\s*)["'](\.\/[^"']+\.js)["']/g;

function staticDepsOf(chunk: string): string[] {
  const text = readFileSync(join(outDir, chunk), 'utf8');
  const deps = new Set<string>();
  let m: RegExpExecArray | null;
  STATIC_IMPORT_RE.lastIndex = 0;
  while ((m = STATIC_IMPORT_RE.exec(text)) !== null) {
    deps.add(m[1].replace(/^\.\//, ''));
  }
  return [...deps];
}

/** Transitive set of chunks reachable from `phlix-ui.js` via STATIC imports. */
function staticBootClosure(): Set<string> {
  const entry = 'phlix-ui.js';
  const seen = new Set<string>([entry]);
  const queue = [entry];
  while (queue.length) {
    const chunk = queue.pop() as string;
    for (const dep of staticDepsOf(chunk)) {
      if (!seen.has(dep) && existsSync(join(outDir, dep))) {
        seen.add(dep);
        queue.push(dep);
      }
    }
  }
  return seen;
}

describe('UI-3.1 code-split boot graph (dist/phlix-ui.js)', () => {
  beforeAll(() => {
    rmSync(outDir, { recursive: true, force: true });
    // Same two builds as `npm run build`, but to a throwaway outDir so the
    // committed dist/ is never touched. Main first (cleans + writes the entry),
    // then the player entry (emptyOutDir:false — appends player.js).
    execFileSync(viteBin, ['build', '--outDir', outDir, '--emptyOutDir'], {
      cwd: root,
      stdio: 'pipe',
    });
    execFileSync(viteBin, ['build', '--config', 'vite.player.config.ts', '--outDir', outDir], {
      cwd: root,
      stdio: 'pipe',
    });
  }, 300_000);

  afterAll(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it('builds the main entry and the Player secondary entry', () => {
    expect(existsSync(join(outDir, 'phlix-ui.js')), 'missing main entry phlix-ui.js').toBe(true);
    // The Player surface lives in its own entry, not the main bundle.
    expect(existsSync(join(outDir, 'player.js')), 'missing Player entry player.js').toBe(true);
  });

  it('does NOT statically import a Player-* chunk into the main entry (GAP 2)', () => {
    const entry = readFileSync(join(outDir, 'phlix-ui.js'), 'utf8');
    STATIC_IMPORT_RE.lastIndex = 0;
    const playerStatic = /(?:\bfrom\s*|(?:^|[;\n])\s*import\s*)["']\.\/Player-[A-Za-z0-9_-]+\.js["']/;
    expect(
      playerStatic.test(entry),
      'main entry statically imports a Player-* chunk (Player surface leaked back into the boot graph)',
    ).toBe(false);
  });

  it('keeps MediaDetail / FilterBar / MetadataMatchModal out of the static boot graph (GAP 1)', () => {
    const closure = staticBootClosure();
    const offenders = [...closure].filter((chunk) =>
      FORBIDDEN_PREFIXES.some((p) => new RegExp(`^${p}-[A-Za-z0-9_-]+\\.js$`).test(chunk)),
    );
    expect(
      offenders,
      `these deferred surfaces are statically reachable from the main entry (boot-graph leak): ${offenders.join(', ')}`,
    ).toEqual([]);
  });

  it('extracts the deferred surfaces into their own dynamically-loaded chunks (not inlined)', () => {
    // Guards the false-green where Rollup inlines a component INTO phlix-ui.js
    // (no chunk, no static import — yet still in the boot bytes). Each deferred
    // surface must exist as a standalone chunk that the entry does NOT statically
    // import (asserted above).
    const files = readdirSync(outDir);
    for (const prefix of ['MediaDetail', 'FilterBar', 'MetadataMatchModal']) {
      const chunk = files.find((f) => new RegExp(`^${prefix}-[A-Za-z0-9_-]+\\.js$`).test(f));
      expect(chunk, `expected a standalone ${prefix}-*.js chunk (surface must not be inlined into the entry)`).toBeTruthy();
    }
  });
});
