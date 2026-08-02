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
// `vue-tsc --noEmit` still resolves it. Delete the music line from
// `src/index.ts` and `npm run typecheck` fails here, not at a consumer.
import type { MusicArtist, MusicAlbum, MusicTrack } from '../index';

/**
 * S144 — the barrel's exported TYPE surface must be consistent across media
 * families, and `dist/` must carry it.
 *
 * `src/index.ts` exported every book and audiobook row type but, for music,
 * only the four page envelopes (`MusicPageParams` / `Music{Artists,Albums,
 * Tracks}Result`). So `import type { MusicAlbum } from '@phlix/ui'` failed for
 * a consumer while `import type { BookDetail }` worked, and the README had to
 * tell readers to name a music row structurally
 * (`MusicAlbumsResult['albums'][number]`) instead.
 *
 * ⚠️ The half that actually bites: `@phlix/ui` ships by TAG TARBALL with a
 * TRACKED, PRE-BUILT `dist/` and `"files": ["dist"]`, and there is NO `prepare`
 * hook. An export added to `src/index.ts` and not rebuilt into
 * `dist/index.d.ts` typechecks inside this repo and STILL fails for every
 * consumer — strictly worse than not adding it, because the repo now says the
 * import is available. This test reads the SHIPPED declaration file, not the
 * source, for exactly that reason (same rationale as the sibling
 * `dist-css-bundle` / `dist-player-split` / `dist-apex-dedupe` guards).
 */

const distDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const indexDts = readFileSync(join(distDir, 'index.d.ts'), 'utf8');

/** `export type { … } from './types/<mod>';` — the barrel's re-export form. */
function reexportedRowTypes(mod: string): string[] {
  const m = new RegExp(`export type \\{([^}]*)\\} from '\\./types/${mod}';`).exec(indexDts);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

describe('S144 — shipped music row types (dist/index.d.ts)', () => {
  it('re-exports the three music row types from the package root', () => {
    const exported = reexportedRowTypes('music');
    for (const name of ['MusicArtist', 'MusicAlbum', 'MusicTrack']) {
      expect(
        exported,
        `dist/index.d.ts must re-export ${name} — a consumer's ` +
          `\`import type { ${name} } from '@phlix/ui'\` resolves against THIS file, ` +
          'not against src/index.ts. If this is red after editing src/index.ts, ' +
          'dist/ has not been rebuilt (npm run build).',
      ).toContain(name);
    }
  });

  it('keeps the music row surface at parity with book and audiobook', () => {
    // Book and audiobook both re-export their row types; music must not be the
    // one family a consumer has to name structurally. Asserted as an EXACT set
    // rather than a `length > 0` lower bound — a one-sided bound is one of the
    // vacuous shapes S135 exists to remove, and it would also stay green if
    // this line were re-exporting the wrong three names.
    expect(reexportedRowTypes('book')).toContain('BookDetail');
    expect(reexportedRowTypes('audiobook')).toContain('AudiobookDetail');
    expect(reexportedRowTypes('music')).toEqual(['MusicArtist', 'MusicAlbum', 'MusicTrack']);
  });

  it('ships the module the re-export points at', () => {
    // A re-export line is only half the contract: `./types/music` must exist in
    // dist and declare the three interfaces it hands out.
    const musicDts = readFileSync(join(distDir, 'types', 'music.d.ts'), 'utf8');
    expect(musicDts).toMatch(/interface MusicArtist\b/);
    expect(musicDts).toMatch(/interface MusicAlbum\b/);
    expect(musicDts).toMatch(/interface MusicTrack\b/);
  });

  it('the re-exported names really are the source interfaces', () => {
    // Runtime cannot observe a type, so pin the shape at COMPILE time: these
    // objects only typecheck if the barrel's `MusicArtist`/`MusicAlbum`/
    // `MusicTrack` are the interfaces from `src/types/music.ts`.
    const artist: MusicArtist = { id: 'a', name: 'Radiohead', imageUrl: null };
    const track: MusicTrack = { id: 't', title: 'Airbag', durationSecs: 284, trackNumber: 1, streamUrl: null };
    const album: MusicAlbum = {
      id: 'ok', title: 'OK Computer', albumArtUrl: null, year: 1997, totalTracks: 12, tracks: [track],
    };
    expect([artist.name, album.title, track.title]).toEqual(['Radiohead', 'OK Computer', 'Airbag']);
  });
});
