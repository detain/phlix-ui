/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

/**
 * S241 — the COVERAGE gate.
 *
 * Coverage, not correctness, is the failure mode of this step: a resolution
 * helper applied to 3 of 46 image bindings looks exactly like a shipped fix.
 * `imageSrc.test.ts` / `useImageSrc.test.ts` prove the helper resolves the right
 * string; this file proves it is actually WIRED at every image binding, and that
 * every exception is a deliberate, named one.
 *
 * The detector enumerates every `:src` / `:poster` / `:srcset` binding in every
 * `.vue` file under `src/` and requires each to either
 *   (a) route its value through `imgSrc(...)` / `imgSrcset(...)`, or
 *   (b) appear in {@link CLASSIFIED_EXCEPTIONS} with the reason it must not.
 *
 * Adding a new `<img :src="item.poster_url">` anywhere reds this test.
 *
 * Anti-vacuity: comments are stripped before matching (so the detector cannot
 * score its own docs), the corpus size is asserted, and the exception list is
 * asserted to be fully consumed — a stale entry is a failure, not a free pass.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, '..');

/** Every `.vue` file under `src/`, as a `/`-separated path relative to `src/`. */
function vueFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      vueFiles(full, out);
    } else if (entry.endsWith('.vue')) {
      out.push(relative(SRC, full).split(sep).join('/'));
    }
  }
  return out;
}

/** Strip HTML comments and JS block/line comments so the detector never scores prose. */
function stripComments(source: string): string {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

interface Binding {
  /** `src/`-relative file path. */
  file: string;
  /** `src` | `poster` | `srcset`. */
  attr: string;
  /** The raw bound expression. */
  expr: string;
}

const BINDING_RE = /(?::|v-bind:)(src|poster|srcset)="([^"]*)"/g;

function collectBindings(): Binding[] {
  const found: Binding[] = [];
  for (const file of vueFiles(SRC)) {
    const body = stripComments(readFileSync(join(SRC, file), 'utf8'));
    for (const m of body.matchAll(BINDING_RE)) {
      found.push({ file, attr: m[1], expr: m[2] });
    }
  }
  return found;
}

/**
 * Bindings that deliberately do NOT go through the seam, keyed by
 * `file::expression`, each with the reason it is out of scope.
 *
 * A binding qualifies here only when its value is NOT a media-API image URL:
 * host-supplied branding, a literal absolute URL, a media BYTE stream (which
 * resolves against `mediaDirectBase`, not the relay proxy), or a non-image
 * resource.
 */
const CLASSIFIED_EXCEPTIONS: Record<string, string> = {
  // Host branding from `PhlixAppConfig.branding` — a shell-supplied asset URL,
  // never a media-server payload. Resolving it against the relay proxy would
  // point the hub's own wordmark at a paired server.
  'app/PhlixApp.vue::branding.logoSrc': 'host branding config, not a media-API image',
  'components/auth/AuthCard.vue::branding.logoSrc': 'host branding config, not a media-API image',

  // Media BYTES, not images. These already resolve through the player's own
  // base logic (`mediaDirectBase` first — the relay proxy deliberately does not
  // route the byte-stream endpoint), so routing them through the image seam
  // would send a stream at the proxy that cannot serve it.
  'components/Player.vue::videoSrc': 'video byte stream (props.streamUrl), host-resolved',
  'components/MiniPlayer.vue::player.hlsMasterUrl ? \'\' : player.streamUrl':
    'video byte stream from the player store, host-resolved',
  'pages/AudiobookPlayerPage.vue::getStreamUrl()':
    'audiobook byte stream; the function already joins mediaDirectBase || mediaApiBase',
  'components/MediaDetail.vue::themeAudioUrl':
    'theme audio byte stream; the computed already joins mediaDirectBase || mediaApiBase',

  // Not an image, and not this step's subsystem.
  'components/Player.vue::st.url':
    'subtitle VTT <track>, not an image — same defect class, different subsystem (out of S241 scope)',
  'components/MediaDetail.vue::youtubeEmbedUrl':
    'literal https://www.youtube.com/embed/{key} iframe, always absolute',
};

describe('S241 — every image binding is base-aware', () => {
  const bindings = collectBindings();

  it('the detector actually found the binding corpus (non-vacuity)', () => {
    // The measured corpus at the time of the fix: 41 `:src`, 2 `:poster`,
    // 3 `:srcset` = 46. Asserted as a floor so the detector cannot silently
    // degrade to inspecting zero files.
    expect(bindings.length).toBeGreaterThanOrEqual(46);
    expect(bindings.filter((b) => b.attr === 'src').length).toBeGreaterThanOrEqual(41);
    expect(bindings.filter((b) => b.attr === 'poster').length).toBeGreaterThanOrEqual(2);
    expect(bindings.filter((b) => b.attr === 'srcset').length).toBeGreaterThanOrEqual(3);
    // And it really is reading files (a typo'd root would yield an empty list).
    expect(vueFiles(SRC).length).toBeGreaterThan(50);
  });

  it('every binding either uses the seam or is a classified exception', () => {
    const unhandled = bindings
      .filter((b) => !/\bimgSrc\s*\(|\bimgSrcset\s*\(/.test(b.expr))
      .filter((b) => !(`${b.file}::${b.expr}` in CLASSIFIED_EXCEPTIONS))
      .map((b) => `${b.file}:${b.attr}="${b.expr}"`);
    expect(unhandled).toEqual([]);
  });

  it('the seam is wired at the sites the acceptance criteria name', () => {
    const has = (file: string, attr: string, needle: string): boolean =>
      bindings.some((b) => b.file === file && b.attr === attr && b.expr.includes(needle));
    // Poster (the AC's poster) …
    expect(has('components/MediaCard.vue', 'src', 'imgSrc(item.poster_url)')).toBe(true);
    expect(has('components/MediaCard.vue', 'srcset', 'imgSrcset(posterSources.srcset)')).toBe(true);
    expect(has('components/MediaDetail.vue', 'src', 'imgSrc(item.poster_url)')).toBe(true);
    // … and the avatar (the AC's avatar).
    expect(has('app/UserMenu.vue', 'src', 'imgSrc(auth.user.avatar_url)')).toBe(true);
    expect(has('components/ProfileImageSettings.vue', 'src', 'imgSrc(displayAvatarUrl)')).toBe(true);
  });

  it('no classified exception is stale', () => {
    const live = new Set(bindings.map((b) => `${b.file}::${b.expr}`));
    const stale = Object.keys(CLASSIFIED_EXCEPTIONS).filter((k) => !live.has(k));
    expect(stale).toEqual([]);
  });

  it('CSS url() image layers go through the seam too', () => {
    // `background-image: url(...)` is an image fetch the `:src` grep never sees.
    const css: Array<[string, string]> = [
      ['components/MediaDetail.vue', 'url(${imgSrc(item.poster_url)})'],
      ['components/MediaBackdropRow.vue', 'url(${imgSrc(ambientSrc.value)})'],
      ['pages/PlayerPage.vue', 'imgSrc(item.value?.poster_url)'],
    ];
    for (const [file, needle] of css) {
      expect(stripComments(readFileSync(join(SRC, file), 'utf8'))).toContain(needle);
    }
  });
});
