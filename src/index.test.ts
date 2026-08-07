/**
 * `src/index.ts` — the library entry's three lazy component exports.
 *
 * The barrel is almost entirely `export { … } from` re-exports, which v8 does not
 * instrument. Its only executable lines are the three `defineAsyncComponent`
 * LOADER ARROWS at lines 117-121, and they were measured at `LF:4 LH:0` on
 * 2026-08-07 (S182 re-enumeration) — nothing in the suite had ever resolved one.
 *
 * 🔴 That gap is not cosmetic. UI-3.1/U-H2 deliberately converted `MediaDetail`,
 * `MetadataMatchModal` and `FilterBar` from static default re-exports into async
 * factories to keep ~56 KB out of every consumer's eager boot bundle. A typo in a
 * path, or a chunk the build fails to emit, produces a module that imports and
 * type-checks cleanly and then throws at RUNTIME the first time a consumer renders
 * the component. Executing each loader is the only thing that catches it.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { MediaDetail, MetadataMatchModal, FilterBar } from './index';

/** The loader arrow `defineAsyncComponent` stashes on the wrapper it returns. */
function loaderOf(c: unknown): () => Promise<unknown> {
  const loader = (c as { __asyncLoader?: () => Promise<unknown> }).__asyncLoader;
  if (typeof loader !== 'function') {
    throw new Error('not an async component wrapper — the export is no longer lazy');
  }
  return loader;
}

const LAZY: ReadonlyArray<[string, unknown, string]> = [
  ['MediaDetail', MediaDetail, 'MediaDetail'],
  ['MetadataMatchModal', MetadataMatchModal, 'MetadataMatchModal'],
  ['FilterBar', FilterBar, 'FilterBar'],
];

describe('src/index.ts — the lazy component exports', () => {
  it.each(LAZY)('%s is an ASYNC wrapper, not a static component', (_name, comp) => {
    // The property that keeps the 56 KB out of the eager bundle. A revert to
    // `export { default as X } from './components/X.vue'` reds this — and that
    // revert is invisible to every other gate, because the named export survives.
    expect(typeof comp).toBe('object');
    expect(loaderOf(comp)).toBeTypeOf('function');
  });

  it.each(LAZY)('%s\'s loader RESOLVES to the real SFC', async (_name, comp, expected) => {
    // Executes the arrow itself — the four uncovered lines. A wrong path rejects
    // here rather than at a consumer's first render.
    const mod = (await loaderOf(comp)()) as { default?: { __name?: string } } | { __name?: string };
    const sfc = (mod as { default?: { __name?: string } }).default ?? (mod as { __name?: string });
    expect(sfc).toBeTruthy();
    // Exact name compare, not a substring: `MetadataMatchModal` contains neither
    // of the others, but `MediaDetail` IS a prefix of nothing here only by luck.
    expect(sfc.__name).toBe(expected);
  });

  it('the three loaders resolve to three DISTINCT components', async () => {
    // Anti-vacuity for the loop above: a mutation that points all three factories
    // at the same module would satisfy "each resolves to something truthy".
    const mods = await Promise.all(LAZY.map(([, c]) => loaderOf(c)()));
    const names = mods.map(
      (m) => ((m as { default?: { __name?: string } }).default ?? (m as { __name?: string })).__name,
    );
    expect(new Set(names).size).toBe(3);
    expect(names).toEqual(['MediaDetail', 'MetadataMatchModal', 'FilterBar']);
  });
});
