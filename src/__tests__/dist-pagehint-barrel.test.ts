/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
// Compile-time half of this guard: `import type` is erased at runtime (so this
// pulls none of the barrel's ~200 components into the test's module graph) but
// `vue-tsc --noEmit` still resolves it. Delete the PageHint line from
// `src/index.ts` and `npm run typecheck` fails here, not at a consumer.
import type { PageHint } from '../index';

/**
 * LW-072 — `PageHint` must be NAMED at the package root barrel, in `dist/`.
 *
 * The component reaches `src/index.ts` only transitively, through
 * `export * from './components/ui'`, and the shipped `dist/index.d.ts` named it
 * zero times. The hub's `HubPageHint.vue` header asserted the typed import
 * fails `vue-tsc` while the wiring-ui MN2 review measured full runtime/type
 * name parity from the tarball — two repos holding opposite truths about one
 * seam (MN2: leave them asserting opposite truths and the seam drifts). The
 * cure names `PageHint` explicitly in `src/index.ts`, mirroring the
 * explicit-plus-star pattern `MenuItem` already uses at the type layer.
 *
 * ⚠️ Same shipped-dist law as the sibling `dist-music-type-exports` guard:
 * `@phlix/ui` ships by TAG TARBALL with a TRACKED, PRE-BUILT `dist/`,
 * `"files": ["dist"]`, and NO `prepare` hook. A source-only fix that never
 * rebuilds `dist/index.d.ts` typechecks inside this repo and STILL fails for
 * every consumer — strictly worse than not fixing it. This test reads the
 * SHIPPED declaration file, not the source, for exactly that reason.
 */

const distDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const indexDts = readFileSync(join(distDir, 'index.d.ts'), 'utf8');

describe('LW-072 — shipped PageHint barrel export (dist/index.d.ts)', () => {
  it('names PageHint explicitly in the root declaration file', () => {
    // The EXACT emitted re-export line — not a bare `PageHint` substring, which
    // surrounding text could satisfy vacuously.
    expect(
      indexDts.includes("export { default as PageHint } from './components/ui/PageHint.vue';"),
      'dist/index.d.ts must carry the explicit PageHint re-export — a consumer\'s ' +
        '`import { PageHint } from "@phlix/ui"` resolves against THIS file (the ' +
        'package ships files: ["dist"] with no SFC source). Red right after ' +
        'editing src/index.ts means dist/ was not rebuilt (npm run build).',
    ).toBe(true);
  });

  it('ships the module the re-export points at, with the declared props', () => {
    // A re-export line is only half the contract: the module it names must
    // exist in dist and carry the component's declared surface.
    const pageHintDts = readFileSync(join(distDir, 'components', 'ui', 'PageHint.vue.d.ts'), 'utf8');
    expect(pageHintDts).toMatch(/title\??:\s*string/);
    expect(pageHintDts).toMatch(/tone\??:\s*'info'\s*\|\s*'accent'/);
    expect(pageHintDts).toMatch(/links\??:/);
    expect(pageHintDts).toMatch(/details\??:\s*string/);
  });

  it('the named entry really is the SFC component type', () => {
    // Runtime cannot observe a type, so pin resolvability at COMPILE time: this
    // literal only typechecks while `PageHint` resolves through the ROOT barrel
    // AND its `$props` carry the component's declared surface.
    type HintProps = InstanceType<typeof PageHint>['$props'];
    const props: HintProps = {
      title: 'Sharing',
      tone: 'accent',
      details: 'How shares work',
      links: [{ text: 'Docs', url: 'https://phlix.is.cc' }],
    };
    expect([props.title, props.tone, props.links?.length]).toEqual(['Sharing', 'accent', 1]);
  });
});
