/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import MediaBackdropRow from './MediaBackdropRow.vue';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import {
  BACKDROP_ROW_HEIGHT,
  BACKDROP_ROW_NARROW_POSTER_WIDTH,
  BACKDROP_ROW_POSTER_WIDTH,
} from './virtual-grid';

/**
 * A LIST-shaped item WITH a backdrop, exactly as the server sends it (S101):
 * `backdrop_url` is a TMDB `/w780` URL and `backdrop_srcset` has exactly two
 * candidates, `w780` + `w1280`. `/original` is deliberately absent from both — it is
 * detail-only (`backdrop_url_large`), and the strip must not read it, so this fixture
 * does not carry it either.
 */
function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    backdrop_url: 'https://img/dune-w780.jpg',
    backdrop_srcset: 'https://img/dune-w780.jpg 780w, https://img/dune-w1280.jpg 1280w',
    genres: ['Sci-Fi', 'Adventure', 'Drama', 'Action'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: 'Paul unites with the Fremen while on a warpath of revenge.',
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

/**
 * A LIST-shaped item with NO backdrop: both keys present and `null`, which is what
 * the shaper emits for the seven backdrop-less types (`track`, `music`, `album`,
 * `artist`, `photo`, `book`, `audiobook`) and for any unmatched title — and, key
 * absence aside, what EVERY row looks like against a pre-S101 server. So the guard is
 * a null check, not a key-existence check.
 */
function noBackdrop(over: Partial<MediaItem> = {}): MediaItem {
  return media({ backdrop_url: null, backdrop_srcset: null, ...over });
}

const SFC_SOURCE = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), './MediaBackdropRow.vue'),
  'utf8',
);

/**
 * A `height` / `min-height` / `max-height` DECLARATION — and deliberately not
 * `line-height` (S69 review r2, finding 3).
 *
 * The obvious `/\bheight:/` matches `line-height:` too, because the `-` in
 * `line-height` is a word boundary: adding a `line-height` to the narrow-viewport
 * title arm (a natural companion to the two-line clamp already there) would have
 * failed the "the arm must not touch the height" test spuriously. S70 copies this
 * test, so the regex is defined once, here, and pinned by its own test below.
 */
const HEIGHT_DECLARATION = /(?:^|[;{\s])(?:min-|max-)?height\s*:/m;

/**
 * The SFC's scoped stylesheet with CSS comments stripped. jsdom applies no styles, so
 * every CSS assertion here reads the source back — the same technique
 * `AppLayout.test.ts` / `PlayerPage.test.ts` use. Comments have to go first: several
 * rules explain themselves by quoting the exact values they no longer use.
 */
const STYLE_BLOCK = (/<style[^>]*>([\s\S]*?)<\/style>/.exec(SFC_SOURCE)?.[1] ?? '').replace(
  /\/\*[\s\S]*?\*\//g,
  '',
);

/** The declaration block of the FIRST rule for `selector` in that stylesheet. */
function cssRule(selector: string): string {
  const at = STYLE_BLOCK.indexOf(`${selector} {`);
  expect(at, `expected a \`${selector}\` rule in MediaBackdropRow.vue`).toBeGreaterThan(-1);
  return STYLE_BLOCK.slice(at, STYLE_BLOCK.indexOf('}', at));
}

const ambientRule = (): string => cssRule('.media-backdrop-row__ambient');

/**
 * What the VIEWER sees, not what the declaration says: `filter` applies in the
 * element's own coordinate space and `transform` scales the filtered result, so the
 * apparent blur radius is `blur × scale`.
 */
function effectiveAmbientBlurPx(): number {
  const decls = ambientRule();
  const blur = /blur\((\d+(?:\.\d+)?)px\)/.exec(decls);
  const scale = /transform:\s*scale\(\s*-?[\d.]+\s*,\s*(-?[\d.]+)\s*\)/.exec(decls);
  expect(blur, 'the ambient colour field must still be blurred').not.toBeNull();
  expect(scale, 'the ambient colour field must still be mirrored + zoomed').not.toBeNull();
  return Number(blur![1]) * Math.abs(Number(scale![1]));
}

/* ------------- the image bleed, resolved rather than pattern-matched ------------- */

/**
 * The design system's global element reset, read from the EXACT stylesheet the app
 * loads (`src/tokens/index.ts` imports `@phlix/tokens/style.css`) — because one
 * declaration in it, `img, picture, video, canvas, svg { max-width: 100% }`, decides
 * whether `.media-backdrop-row__img`'s bleed works or inverts. Same resolution
 * strategy `src/tokens/contrast.test.ts` uses for `colors.css`.
 */
const nodeRequire = createRequire(import.meta.url);
function resolveTokensStylesheet(): string {
  try {
    return nodeRequire.resolve('@phlix/tokens/style.css');
  } catch {
    return join(dirname(nodeRequire.resolve('@phlix/tokens/package.json')), 'dist/style.css');
  }
}

/**
 * `max-width`/`max-height` as they actually CASCADE onto the image — the reset and the
 * SFC's own rule both parsed, by jsdom, from their real sources. Also returns what a
 * bare `<img>` gets from the reset alone, on BOTH axes, which is the premise the
 * assertions rest on.
 *
 * The two `<style>` elements are removed again on the way out: this is the only test in
 * the file that reads computed styles, and a global reset left in the shared jsdom
 * document would be a booby trap for the next one.
 */
function cascadeImgMaxima(): {
  computedMaxima: { maxWidth: string; maxHeight: string };
  bareMaxima: { maxWidth: string; maxHeight: string };
} {
  const reset = document.createElement('style');
  reset.textContent = readFileSync(resolveTokensStylesheet(), 'utf8');
  const rule = document.createElement('style');
  rule.textContent = `${cssRule('.media-backdrop-row__img')}}`;
  document.head.append(reset, rule);
  const bare = document.createElement('img');
  const bled = document.createElement('img');
  bled.className = 'media-backdrop-row__img';
  document.body.append(bare, bled);
  try {
    const cs = getComputedStyle(bled);
    const bareCs = getComputedStyle(bare);
    return {
      computedMaxima: { maxWidth: cs.maxWidth, maxHeight: cs.maxHeight },
      bareMaxima: { maxWidth: bareCs.maxWidth, maxHeight: bareCs.maxHeight },
    };
  } finally {
    reset.remove();
    rule.remove();
    bare.remove();
    bled.remove();
  }
}

/** One declaration off a rule's text. `[;{\s]`-prefixed so `width` cannot match `max-width`. */
function imgDecl(prop: string): string {
  const m = new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;]+)`).exec(cssRule('.media-backdrop-row__img'));
  expect(m, `expected a \`${prop}\` declaration on .media-backdrop-row__img`).not.toBeNull();
  return m![1].trim();
}

/**
 * `<n>px` | unitless `0` | `100%` | `calc(100% + <n>px)` | `none`, against a known
 * containing-block size.
 *
 * The unitless `0` form is modelled deliberately (S69 review r4, finding 3): `inset: 0`
 * is the single most natural way to write the bleed away, so without it the most likely
 * regression reddens this test through "does not model the length `0`" instead of naming
 * the overhang it lost — failing closed, but sending the reader to edit the harness's
 * arithmetic when the SFC is what changed.
 */
function usedLength(value: string, cbSize: number): number {
  if (value === 'none') return Number.POSITIVE_INFINITY;
  if (/^-?0$/.test(value)) return 0;
  if (value === '100%') return cbSize;
  const calc = /^calc\(\s*100%\s*\+\s*(-?[\d.]+)px\s*\)$/.exec(value);
  if (calc) return cbSize + Number(calc[1]);
  const px = /^(-?[\d.]+)px$/.exec(value);
  expect(
    px,
    `resolveImgBox does not model the length \`${value}\` — teach it that form rather ` +
      'than dropping the assertion, or the bleed goes unguarded again',
  ).not.toBeNull();
  return Number(px![1]);
}

/**
 * The USED box of `.media-backdrop-row__img` inside a `cbWidth`×`cbHeight` strip.
 *
 * jsdom has no layout, so this is the one piece that is modelled: CSS 2.1 §10.4's
 * `max-width` clamp plus §10.3.8/§10.6.5's over-constrained rule for an absolutely
 * positioned replaced element — under `direction: ltr` (which the app is: `src/` and
 * `@phlix/tokens` declare no `rtl` anywhere) the `right`/`bottom` inset is the one that
 * gets ignored, whereas §10.3.7 ignores `left` instead under `rtl`, which would flip the
 * defect below onto the LEFT edge (S69 review r4, finding 4). Every INPUT is real — the
 * insets and sizes are read out of the SFC's own stylesheet and the maxima out of a real
 * cascade — so the model cannot quietly agree with itself. Note that the FIXED box is not
 * over-constrained at all (−3 + 1366 + −3 == 1360 is exactly satisfied), so the rule is
 * consulted only by the discriminator branch that reproduces the old defect.
 * Cross-checked against Chrome 150 at a 1360×300 strip:
 *   `max-width: none` → 1366×306, overhang  3 /  3 / 3 / 3   (intended)
 *   `max-width: 100%` → 1360×306, overhang  3 / −3 / 3 / 3   (MED-1's defect)
 */
function resolveImgBox(
  cbWidth: number,
  cbHeight: number,
  maxima: { maxWidth: string; maxHeight: string },
): { width: number; height: number; overhang: [number, number, number, number] } {
  const inset = usedLength(imgDecl('inset'), 0); // single-value shorthand = all four sides
  const width = Math.min(usedLength(imgDecl('width'), cbWidth), usedLength(maxima.maxWidth, cbWidth));
  const height = Math.min(
    usedLength(imgDecl('height'), cbHeight),
    usedLength(maxima.maxHeight, cbHeight),
  );
  return {
    width,
    height,
    overhang: [-inset, inset + width - cbWidth, -inset, inset + height - cbHeight],
  };
}

function makeRouter(): Router {
  const stub = { template: '<div />' };
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/media/:id', name: 'media', component: stub },
    ],
  });
}

function mountRow(item = media(), props: Record<string, unknown> = {}) {
  return mount(MediaBackdropRow, {
    props: { item, ...props },
    global: { plugins: [makeRouter()], provide: { phlixConfig: { app: 'server', apiBase: '' } } },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('MediaBackdropRow — rendering (S69)', () => {
  it('renders the title, the meta strip and the overview', () => {
    const w = mountRow();
    expect(w.find('.media-backdrop-row__title').text()).toBe('Dune: Part Two');
    const meta = w.find('.media-backdrop-row__meta').text();
    expect(meta).toContain('2024');
    expect(meta).toContain('PG-13');
    expect(meta).toContain('166m');
    expect(w.find('.media-backdrop-row__overview').text()).toContain('Paul unites with the Fremen');
  });

  it('caps the genre chips at three', () => {
    // the fixture carries four genres; the strip shows the first three
    const chips = mountRow().findAll('.media-backdrop-row__genre');
    expect(chips).toHaveLength(3);
    expect(chips.map((c) => c.text())).toEqual(['Sci-Fi', 'Adventure', 'Drama']);
  });

  it('falls back to a placeholder line when the item has no overview', () => {
    const w = mountRow(media({ overview: null }));
    const p = w.find('.media-backdrop-row__overview');
    expect(p.classes()).toContain('media-backdrop-row__overview--empty');
    expect(p.text()).toBe('No description yet.');
  });

  it('omits the meta parts the item does not have', () => {
    const w = mountRow(media({ year: null, rating: null, runtime: null, genres: [] }));
    expect(w.find('.media-backdrop-row__meta').text()).toBe('');
    expect(w.find('.media-backdrop-row__cert').exists()).toBe(false);
    expect(w.findAll('.media-backdrop-row__dot')).toHaveLength(0);
  });

  it('links the title to the item detail route with the title as its accessible name', () => {
    const w = mountRow(media({ id: 'abc' }));
    const link = w.find('.media-backdrop-row__link');
    // a real anchor with an href → keyboard-focusable and Enter-activatable, and
    // its visible text IS its accessible name.
    expect(link.element.tagName).toBe('A');
    expect(link.attributes('href')).toBe('/app/media/abc');
    expect(link.text()).toBe('Dune: Part Two');
  });

  it('still renders a plain title link when no router is available (standalone mount)', () => {
    const w = mount(MediaBackdropRow, {
      props: { item: media({ id: 'abc' }) },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '' } } },
    });
    expect(w.find('.media-backdrop-row__link').attributes('href')).toBe('/app/media/abc');
  });
});

/**
 * The wide-backdrop treatment itself, ported from `MediaDetail.vue`'s hero — but
 * with the source preference deliberately INVERTED for a virtualized list (a hero
 * decodes one image per page; this decodes one per rendered row), the ready-made
 * `srcset` passed through, the layer decorative, and a `sizes` hint matching the
 * strip's real rendered width rather than the hero's full-bleed `100vw`.
 */
describe('MediaBackdropRow — the backdrop wash (S69)', () => {
  /**
   * S69 review, finding 3. `MediaDetail.vue` prefers `backdrop_url_large` because it
   * paints ONE full-bleed hero per page, and that field is TMDB `/original` — a
   * 1.5–4 MB JPEG. Scrolling a 200-item library in backdrop mode mounts 200 strips,
   * each decoding its wash into a 300px-tall box, so this renderer uses the list
   * shape's `/w780` + (`w780`, `w1280`) srcset and never reads `/original` at all.
   * Copying the hero's order here is the mistake this test exists to catch.
   */
  it('uses the row-sized list backdrop and passes the two-candidate srcset through', () => {
    const img = mountRow().find('.media-backdrop-row__img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://img/dune-w780.jpg');
    expect(img.attributes('srcset')).toBe(
      'https://img/dune-w780.jpg 780w, https://img/dune-w1280.jpg 1280w',
    );
    // the ladder stops at w1280 on purpose — /original is not a candidate
    expect(img.attributes('srcset')).not.toContain('original');
  });

  /**
   * `backdrop_url_large` is detail-only and stays that way: the server does not put
   * it (or an `/original` srcset candidate) on the list shape, and this renderer must
   * not reach for it even when it happens to be present on the item it was handed —
   * one hero can afford a 1.5–4 MB decode, ~100 rows cannot.
   */
  it('IGNORES the detail-only /original backdrop, even when the item carries one', () => {
    const w = mountRow(noBackdrop({ backdrop_url_large: 'https://img/dune-original.jpg' }));
    expect(
      w.find('.media-backdrop-row__img').exists(),
      'a per-row renderer must not decode /original once per rendered row',
    ).toBe(false);
    // …and it degrades to the designed fallback rather than to nothing
    expect(w.find('.media-backdrop-row__wash').attributes('data-wash')).toBe('ambient');
  });

  it('renders the wide backdrop from either half of the pair on its own', () => {
    // srcset only: with `w` descriptors the browser selects from it and needs no src
    const srcsetOnly = mountRow(
      noBackdrop({ backdrop_srcset: 'https://img/a-w780.jpg 780w, https://img/a-w1280.jpg 1280w' }),
    ).find('.media-backdrop-row__img');
    expect(srcsetOnly.exists()).toBe(true);
    expect(srcsetOnly.attributes('src')).toBeUndefined();
    // src only: a non-TMDB backdrop passes through as stored, with no srcset
    const srcOnly = mountRow(noBackdrop({ backdrop_url: 'https://cdn/local.jpg' })).find(
      '.media-backdrop-row__img',
    );
    expect(srcOnly.attributes('src')).toBe('https://cdn/local.jpg');
    expect(srcOnly.attributes('srcset')).toBeUndefined();
  });

  /**
   * S69 review, finding 4. The strip is a grid cell inside `.shell__main`, which
   * keeps a 20px inline padding at every breakpoint (`max-width: none`), and
   * `IndexRail` is `position: fixed`. So the rendered width is the viewport minus
   * 40px. `100vw` is right for `MediaDetail`'s hero only because that one really is
   * `position: fixed; inset: 0`.
   */
  it('states the strip real rendered width in `sizes`, not the hero full-bleed 100vw', () => {
    const sizes = mountRow().find('.media-backdrop-row__img').attributes('sizes');
    expect(sizes).toBe('calc(100vw - 40px)');
    expect(sizes).not.toBe('100vw');
  });

  it('emits no srcset attribute at all when the server supplied none', () => {
    const w = mountRow(media({ backdrop_srcset: null }));
    expect(w.find('.media-backdrop-row__img').attributes('srcset')).toBeUndefined();
  });

  it('keeps the wash decorative — out of the accessibility tree', () => {
    const w = mountRow();
    expect(w.find('.media-backdrop-row__wash').attributes('aria-hidden')).toBe('true');
    // alt="" (present but empty) is what makes the <img> itself decorative
    expect(w.find('.media-backdrop-row__img').attributes('alt')).toBe('');
    expect(w.find('.media-backdrop-row__scrim').exists()).toBe(true);
  });

  // S223 INVERTED this assertion. The S35 claim it encoded ("native lazy over
  // transform-repositioned cells is a known stall trigger") was never observed in
  // a browser. A capture of THIS view measured first-paint image requests
  // 48 → 30 → 12 as the attribute was restored to the card and then to the
  // backdrop, with the in-viewport-unpainted frame count unchanged. See
  // MediaCard.vue's `lazy` prop docblock.
  it('keeps native lazy-loading on BOTH the backdrop and the card (S223)', () => {
    expect(mountRow().find('.media-backdrop-row__img').attributes('loading')).toBe('lazy');
    expect(mountRow().findComponent(MediaCard).props('lazy')).toBe(true);
  });

  it('cross-fades the backdrop in once it decodes', async () => {
    const w = mountRow();
    const img = w.find('.media-backdrop-row__img');
    expect(img.classes()).not.toContain('is-loaded');
    await img.trigger('load');
    expect(w.find('.media-backdrop-row__img').classes()).toContain('is-loaded');
  });

  it('treats an already-cached (complete) backdrop as loaded on mount', async () => {
    // Without the onMounted `complete` guard a cached image whose `load` fired
    // before the listener attached would stay at opacity 0 — an invisible backdrop.
    const spy = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    const w = mountRow();
    await nextTick();
    expect(w.find('.media-backdrop-row__img').classes()).toContain('is-loaded');
    spy.mockRestore();
  });

  it('re-arms the fade when the item behind a rendered index changes', async () => {
    // On-demand paging replaces `items`, so a mounted strip can be handed a
    // different item; the new image must fade in rather than appear instantly.
    const w = mountRow();
    await w.find('.media-backdrop-row__img').trigger('load');
    expect(w.find('.media-backdrop-row__img').classes()).toContain('is-loaded');
    await w.setProps({ item: media({ id: 'm2', backdrop_url: 'https://img/other.jpg' }) });
    expect(w.find('.media-backdrop-row__img').classes()).not.toContain('is-loaded');
  });

  it('names its wash state on the DOM so the two branches are inspectable', () => {
    expect(mountRow().find('.media-backdrop-row__wash').attributes('data-wash')).toBe('backdrop');
    expect(mountRow(noBackdrop()).find('.media-backdrop-row__wash').attributes('data-wash')).toBe(
      'ambient',
    );
  });
});

/**
 * The second supported wash state: the item has no backdrop. That is every one of the
 * seven backdrop-less types (`track`, `music`, `album`, `artist`, `photo`, `book`,
 * `audiobook`), every unmatched title, and — before the companion server step S101
 * reaches a deployed server — every row on the library surface. Both keys arrive
 * present-and-`null` rather than absent, so these tests mount `noBackdrop()`.
 */
describe('MediaBackdropRow — the no-backdrop wash (S69)', () => {
  it('takes the ambient branch for a backdrop-less item — no backdrop <img> anywhere', () => {
    const item = noBackdrop();
    // guard the premise: null, not missing — a null check is the right guard
    expect(item.backdrop_url).toBeNull();
    expect(item.backdrop_srcset).toBeNull();

    const w = mountRow(item);
    expect(w.find('.media-backdrop-row__img').exists()).toBe(false);
    const ambient = w.find('.media-backdrop-row__ambient');
    expect(ambient.exists()).toBe(true);
    // jsdom normalises the value to url("…")
    expect(ambient.attributes('style')).toContain('background-image: url("https://img/dune.jpg")');
    // the scrim still paints, so the strip text stays legible over a bright poster
    expect(w.find('.media-backdrop-row__scrim').exists()).toBe(true);
  });

  /**
   * The fallback has to look DELIBERATE, not like a failed image load: it is a
   * blurred copy of the poster sitting 20px to its left, so it is mirrored, zoomed
   * and blurred past recognisability into an abstract colour field, and the wash
   * carries an `--ambient` modifier the scrim restyles off. Reverting the layer to
   * the page-level S19 treatment (a plain `blur(40px)` at the poster's own scale and
   * orientation) fails here.
   *
   * The radius is asserted as the EFFECTIVE one — `filter` applies in the element's
   * own coordinate space and `transform` scales the result, so what the viewer sees is
   * `blur × scale` (S69 review r2, finding 4; see the cost guards below for why the
   * local radius is deliberately small).
   */
  it('renders the fallback as a DELIBERATE colour field, not a copy of the poster beside it', () => {
    const w = mountRow(noBackdrop());
    expect(w.find('.media-backdrop-row__wash').classes()).toContain(
      'media-backdrop-row__wash--ambient',
    );
    const decls = ambientRule();
    // mirrored + zoomed, so it can never read as the adjacent poster
    expect(decls).toMatch(/transform:\s*scale\(-\d/);
    // and blurred well past the page-level ambient's 40px, once the zoom is applied
    expect(
      effectiveAmbientBlurPx(),
      'the ambient must still read as an abstract colour field, not a smeared poster',
    ).toBeGreaterThan(100);
    // the scrim has an ambient-specific arm (the panel treatment)
    expect(SFC_SOURCE).toContain(
      '.media-backdrop-row__wash--ambient .media-backdrop-row__scrim {',
    );
  });

  it('renders NO wash layer at all when the item has neither image', () => {
    const w = mountRow(noBackdrop({ poster_url: null }));
    expect(w.find('.media-backdrop-row__wash').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__ambient').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__scrim').exists()).toBe(false);
    // ...and the strip still renders its content on the plain surface panel
    expect(w.find('.media-backdrop-row__title').text()).toBe('Dune: Part Two');
  });

  /**
   * A pre-S101 server sends the keys not at all; a post-S101 one sends them as null.
   * Both must reach the same fallback — otherwise the view breaks against whichever
   * server the client happens to be talking to.
   */
  it('treats absent keys and null keys identically', () => {
    const absent = media();
    delete absent.backdrop_url;
    delete absent.backdrop_srcset;
    for (const item of [absent, noBackdrop()]) {
      const w = mountRow(item);
      expect(w.find('.media-backdrop-row__img').exists()).toBe(false);
      expect(w.find('.media-backdrop-row__wash').attributes('data-wash')).toBe('ambient');
    }
  });
});

/**
 * S69 review r2, finding 4 — the wash is paid ONCE PER RENDERED ROW, and until the
 * companion server step S101 deploys, 100% of rows are in the more expensive of the
 * two states. The named visual reference (`MediaDetail`'s hero) pays the identical
 * treatment once per PAGE, so "it is what the hero does" is not on its own a
 * justification here. jsdom has no compositor and the visual suite is out of bounds,
 * so these guards pin the cost DECISIONS rather than measuring frames: no backdrop
 * readback, a small filtered source box, and no per-row layer promotion.
 */
describe('MediaBackdropRow — per-row compositing cost (S69 review r2)', () => {
  it('never asks the compositor for a backdrop readback (no backdrop-filter per row)', () => {
    expect(
      STYLE_BLOCK,
      'a `backdrop-filter` here is a snapshot + re-blur of the region behind every ' +
        'strip on screen, re-evaluated as each one moves through the viewport',
    ).not.toContain('backdrop-filter');
    // the scrim still exists, and the text contrast is still carried by its two
    // gradients — the blur was never what made the title legible
    const scrim = cssRule('.media-backdrop-row__scrim');
    expect((scrim.match(/linear-gradient\(/g) ?? []).length).toBe(2);
  });

  it('keeps the hero soft focus, but as an element filter on the image itself', () => {
    const img = cssRule('.media-backdrop-row__img');
    // same 2px blur + saturate the hero scrim applies, moved onto the only thing that
    // was ever behind that scrim
    expect(img).toMatch(/filter:\s*blur\(2px\)\s*saturate\(1\.05\)/);
    // the bleed that keeps that filter's translucent edge OUTSIDE the visible box is
    // asserted by effect, not by presence — see the next test.
  });

  /**
   * S69 review r3, MED-1. The bleed used to be guarded by `expect(img).toMatch(
   * /inset:\s*-\d+px/)` — the declaration's PRESENCE — and that guard was green while
   * the bleed did the exact opposite of what it was added for: `@phlix/tokens`' global
   * `img { max-width: 100% }` reset clamped `calc(100% + 6px)` back to the strip width,
   * the over-constrained box let `left: -3px` win over `right`, and the image ended 3px
   * INSIDE the strip on the right. So this asserts the resulting BOX instead, resolved
   * from the real cascade — a presence check cannot pin the wrong belief again.
   */
  it('bleeds the filtered image PAST the strip on all four sides, design-system reset included', () => {
    const { computedMaxima, bareMaxima } = cascadeImgMaxima();

    // The premise, pinned so this test cannot go vacuous: without the rule's own
    // override the reset really is what binds. If @phlix/tokens ever drops that reset
    // this fails — at which point `max-width: none` becomes belt-and-braces rather
    // than load-bearing, and the CSS comment explaining it needs updating, but do NOT
    // just delete the assertion below.
    expect(
      bareMaxima.maxWidth,
      'the @phlix/tokens reset no longer clamps a bare <img> — re-read the ' +
        '.media-backdrop-row__img comment before touching this test',
    ).toBe('100%');
    expect(computedMaxima.maxWidth, 'the rule must neutralize that clamp').toBe('none');

    /* The VERTICAL half of the premise, and the only guard on `max-height: none`
       (S69 review r4, finding 1). Today's reset declares no `max-height`, so the
       vertical bleed works whether or not the rule overrides it — which means an
       EFFECT assertion is structurally incapable of seeing that declaration
       disappear: an unset `max-height` computes to exactly the same `none` as a
       declared one. Deleting it therefore left all 3832 tests green.

       So this pair is deliberately shaped differently from everything else in this
       test:
         - the computed-style read is an ALARM on the reset, not on our rule. It goes
           red the day @phlix/tokens starts clamping height, which is the day
           `max-height: none` stops being future-proofing and becomes load-bearing on
           the bottom edge exactly as `max-width: none` already is on the right one.
         - the declaration read is a PRESENCE assertion. That is the anti-pattern the
           rest of this test exists to replace — and it is nevertheless the correct
           tool HERE, and only here, precisely BECAUSE the declaration is inert by
           design: there is no effect to measure until the reset changes, and by then
           the declaration must already be in place. Do not "modernise" it into an
           effect assertion, and do not delete it as redundant: without it the pair
           above is an alarm with nothing left to protect. */
    expect(
      bareMaxima.maxHeight,
      'the @phlix/tokens reset has GROWN a max-height — the vertical bleed is now ' +
        'clamped too, so `max-height: none` just became load-bearing; re-read the ' +
        '.media-backdrop-row__img comment',
    ).toBe('none');
    expect(
      imgDecl('max-height'),
      'presence, on purpose — see the comment above: this declaration has no ' +
        'observable effect until the reset clamps height, so nothing else can guard it',
    ).toBe('none');

    // …and the box that then lays out actually overhangs. 1360x300 is the strip at a
    // 1400px viewport (`.shell__main`'s 20px inline padding); the expected numbers are
    // Chrome 150 measurements, not derivations.
    const box = resolveImgBox(1360, 300, computedMaxima);
    expect([box.width, box.height]).toEqual([1366, 306]);
    expect(box.overhang, 'left / right / top / bottom overhang, px').toEqual([3, 3, 3, 3]);

    // The resolver is not a rubber stamp: fed the clamp the reset alone would impose,
    // the SAME declarations invert the right edge. That is the defect, stated as the
    // arithmetic that produces it.
    expect(resolveImgBox(1360, 300, { maxWidth: '100%', maxHeight: 'none' }).overhang).toEqual([
      3, -3, 3, 3,
    ]);
  });

  it('blurs a SMALL source box instead of the whole strip, for the same visual result', () => {
    const decls = ambientRule();
    const local = Number(/blur\((\d+(?:\.\d+)?)px\)/.exec(decls)![1]);
    expect(
      local,
      'a large kernel over the full strip area, once per rendered row, is the cost this avoids',
    ).toBeLessThanOrEqual(24);
    const inset = /inset:\s*([\d.]+)%/.exec(decls);
    expect(inset, 'the filtered source box must be a fraction of the strip, not inset: 0').not.toBeNull();
    expect(Number(inset![1])).toBeGreaterThan(0);
    // …and the rendered field is unchanged from the full-size 64px × 1.9 spelling
    expect(effectiveAmbientBlurPx()).toBeCloseTo(121.6, 5);
  });

  it('contains each row’s paint instead of promoting every row to its own layer', () => {
    expect(cssRule('.media-backdrop-row')).toContain('contain: layout paint');
    // `will-change: transform` / `translateZ(0)` would buy raster time with GPU memory
    // once per WINDOWED ROW (~15 live at a time), which is the wrong trade here.
    expect(STYLE_BLOCK).not.toContain('will-change');
    expect(STYLE_BLOCK).not.toContain('translateZ');
  });
});

describe('MediaBackdropRow — composed MediaCard poster column (S69)', () => {
  it('reuses MediaCard for the poster and suppresses its duplicate caption', () => {
    const w = mountRow();
    const card = w.findComponent(MediaCard);
    expect(card.exists()).toBe(true);
    expect(card.props('hideCaption')).toBe(true);
    // the strip body owns the title; the card must NOT print it a second time
    expect(w.find('.media-card__caption').exists()).toBe(false);
    expect(w.findAll('.media-backdrop-row__title')).toHaveLength(1);
  });

  /**
   * S68 review finding 1, carried forward. `hideCaption` drops BOTH the caption
   * under the poster and the hover overlay's own `<h3>` + meta strip — the overlay
   * is hidden by `opacity: 0` / `pointer-events: none`, neither of which removes
   * content from the accessibility tree. Without it a hero strip would emit TWO
   * headings per item: on a 200-item library a screen-reader user navigating by
   * heading gets 400 headings, every title announced twice.
   */
  it('emits exactly ONE heading for the item — the card must not duplicate it', () => {
    const w = mountRow();
    const headings = w.findAll('h1, h2, h3, h4, h5, h6');
    expect(headings, 'a backdrop strip must expose exactly one heading per item').toHaveLength(1);
    expect(headings[0].classes()).toContain('media-backdrop-row__title');
    expect(headings[0].text()).toBe('Dune: Part Two');
    // the card's overlay text block is gone, not merely invisible
    expect(w.find('.media-card__title').exists()).toBe(false);
    expect(w.find('.media-card__meta').exists()).toBe(false);
    expect(w.find('.media-card__genres').exists()).toBe(false);
    // ...so the meta values appear exactly once too
    expect(w.findAll('.media-backdrop-row__cert')).toHaveLength(1);
    expect(w.findAll('.media-card__cert')).toHaveLength(0);
  });

  /**
   * S69 review, finding 6. `MediaCard`'s root is an `<article>` too, so composing it
   * nested a second, unnamed article inside the strip and AT announced two item
   * boundaries per strip. `role="presentation"` falls through onto the card root; the
   * card's link/badges/overlay are unaffected (presentation is not inherited).
   */
  it('exposes ONE item boundary, not a nested second article from the composed card', () => {
    const w = mountRow();
    const articles = w.findAll('article');
    // both elements are still <article> tags in the DOM…
    expect(articles).toHaveLength(2);
    // …but only the strip is one to assistive tech
    expect(articles[0].classes()).toContain('media-backdrop-row');
    expect(articles[0].attributes('role')).toBeUndefined();
    expect(articles[0].attributes('aria-label')).toBe('Dune: Part Two');
    const card = w.find('.media-card');
    expect(card.attributes('role'), 'the composed card must not be a second article').toBe(
      'presentation',
    );
    // presentation is ignored on a focusable element or one with global aria-*, so
    // the card root must have neither
    expect(card.attributes('tabindex')).toBeUndefined();
    expect(
      Object.keys(card.attributes()).filter((a) => a.startsWith('aria-')),
      'an aria-* attribute on the card root would make role="presentation" inert',
    ).toEqual([]);
  });

  it('matches the GRID renderer on heading count (one per item, both modes)', () => {
    const grid = mount(MediaCard, {
      props: { item: media() },
      global: { plugins: [makeRouter()], provide: { phlixConfig: { app: 'server', apiBase: '' } } },
    });
    expect(grid.findAll('h1, h2, h3, h4, h5, h6')).toHaveLength(1);
    expect(mountRow().findAll('h1, h2, h3, h4, h5, h6')).toHaveLength(1);
  });

  /**
   * The whole reason this renderer composes `MediaCard` instead of building its own
   * hero chrome: the ⋯ menu's ~90-line dispatcher (playlist / download / missing
   * episodes / shuffle / admin metadata + images + inspector + remove) already
   * exists verbatim in `MediaCard` AND `MediaDetail`. A third copy is a defect, so
   * this asserts the strip really does inherit the live action overlay.
   */
  it('inherits the card action overlay INCLUDING the ⋯ menu (no third copy)', async () => {
    const w = mountRow();
    // the overlay row is lazy-mounted on hover, exactly as in the poster grid
    await w.find('.media-card').trigger('pointerenter');
    expect(w.find('.media-card__actions').exists()).toBe(true);
    expect(w.find('[aria-label="Play"]').exists()).toBe(true);
    expect(w.find('[aria-label="More actions"]').exists()).toBe(true);
  });

  it('tells the browser the poster column is a FIXED width (no over-fetch)', () => {
    // DEFAULT_POSTER_SIZES' desktop hint is a generic 200px; the strip states its
    // real rendered width so a responsive srcset picks the right candidate.
    expect(mountRow().findComponent(MediaCard).props('posterSizes')).toBe(
      `${BACKDROP_ROW_POSTER_WIDTH}px`,
    );
  });

  it('forwards canMatch so admins get the Match quick-action', async () => {
    const off = mountRow(media(), { canMatch: false });
    await off.find('.media-card').trigger('pointerenter');
    expect(off.find('[aria-label="Match metadata"]').exists()).toBe(false);

    const on = mountRow(media(), { canMatch: true });
    await on.find('.media-card').trigger('pointerenter');
    expect(on.findComponent(MediaCard).props('canMatch')).toBe(true);
    expect(on.find('[aria-label="Match metadata"]').exists()).toBe(true);
  });
});

/**
 * The load-bearing contract of a `#card`-slot renderer: filling that slot bypasses
 * MediaGrid's own wiring of MediaCard's ten host events, so this strip must re-emit
 * every single one or the corresponding button/menu item silently does nothing.
 * The list is enumerated from MediaCard's `defineEmits` — deleting any one of the
 * ten forwards in MediaBackdropRow.vue fails this suite.
 */
const HOST_EVENTS = [
  'play',
  'watchlist',
  'info',
  'match',
  'mark-watched',
  'refresh',
  'choose-poster',
  'remove',
  'edit-metadata',
  'explore-data',
] as const;

describe('MediaBackdropRow — host event forwarding (S69)', () => {
  it.each(HOST_EVENTS)('re-emits `%s` from the composed card with the item', (event) => {
    const item = media({ id: 'fwd1' });
    const w = mountRow(item);
    w.findComponent(MediaCard).vm.$emit(event, item);
    const emitted = w.emitted(event) as unknown[][] | undefined;
    expect(emitted, `MediaBackdropRow dropped the \`${event}\` event`).toHaveLength(1);
    expect((emitted![0][0] as MediaItem).id).toBe('fwd1');
  });

  it('forwards the WHOLE MediaCard emit surface — nothing is silently missing', () => {
    const item = media();
    const w = mountRow(item);
    const card = w.findComponent(MediaCard);
    for (const event of HOST_EVENTS) card.vm.$emit(event, item);
    // every event the card can raise arrived at the host
    expect(Object.keys(w.emitted()).sort()).toEqual([...HOST_EVENTS].sort());
  });

  it('really fires through a user click, not just a synthetic $emit', async () => {
    const item = media({ id: 'click1' });
    const w = mountRow(item);
    await w.find('.media-card').trigger('pointerenter');
    await w.find('[aria-label="Play"]').trigger('click');
    expect(w.emitted('play')).toHaveLength(1);
    expect((w.emitted('play')![0][0] as MediaItem).id).toBe('click1');
  });
});

describe('MediaBackdropRow — fixed geometry (virtualization contract, S69)', () => {
  it('pins ONLY the strip height inline — that alone is the virtualization contract', () => {
    const style = mountRow().find('.media-backdrop-row').attributes('style') ?? '';
    // MediaGrid's windowing math is fed computeFixedRowHeight(BACKDROP_ROW_HEIGHT),
    // so the rendered strip MUST be exactly BACKDROP_ROW_HEIGHT tall or
    // padTop/totalHeight drift from the layout (blank bands, wrong need-range pages).
    expect(style).toContain(`height: ${BACKDROP_ROW_HEIGHT}px`);
    // The two-track layout moved OUT of the inline style (S69 review, finding 2): an
    // inline `grid-template-columns` cannot be narrowed by a media query without
    // `!important`, which is why the strip had no narrow-viewport handling at all.
    expect(
      style,
      'grid-template-columns must live in the stylesheet so the 720px arm can win',
    ).not.toContain('grid-template-columns');
  });

  it('hands BOTH poster-column widths to the stylesheet from the shared constants', () => {
    // the breakpoint belongs in CSS; the NUMBERS still come from virtual-grid.ts, so
    // the stylesheet holds no px literal that could drift from the windowing math
    const style = mountRow().find('.media-backdrop-row').attributes('style') ?? '';
    expect(style).toContain(`--backdrop-row-poster: ${BACKDROP_ROW_POSTER_WIDTH}px`);
    expect(style).toContain(
      `--backdrop-row-poster-narrow: ${BACKDROP_ROW_NARROW_POSTER_WIDTH}px`,
    );
    expect(BACKDROP_ROW_NARROW_POSTER_WIDTH).toBeLessThan(BACKDROP_ROW_POSTER_WIDTH);
  });

  /**
   * S69 review, finding 2. At a 360px viewport `.shell__main`'s 20px gutters leave the
   * grid a 320px content box, so the WIDE 200px poster track left the strip body
   * `320 − 200 − 20 − 24` = 76px: the title ellipsised to a stub, the overview
   * unreadable. The named visual reference handles exactly this
   * (`MediaDetail.vue`'s hero → `1fr` + a 220px poster below 720px); this renderer
   * had no width media query at all. jsdom has no layout and the visual suite is out
   * of bounds, so the arm is asserted against the stylesheet source — the same
   * technique `AppLayout.test.ts` / `PlayerPage.test.ts` use.
   */
  it('narrows the poster column below 720px, the same breakpoint the hero reference uses', () => {
    const at = SFC_SOURCE.indexOf('@media (max-width: 720px)');
    expect(at, 'the strip must have a narrow-viewport arm').toBeGreaterThan(-1);
    // wide default reads the wide custom property…
    expect(SFC_SOURCE).toContain(
      `grid-template-columns: var(--backdrop-row-poster, ${BACKDROP_ROW_POSTER_WIDTH}px) minmax(0, 1fr);`,
    );
    // …and the narrow arm swaps in the narrow one
    const narrow = SFC_SOURCE.slice(at);
    expect(narrow).toContain(
      `grid-template-columns: var(--backdrop-row-poster-narrow, ${BACKDROP_ROW_NARROW_POSTER_WIDTH}px) minmax(0, 1fr);`,
    );
    // the arm must NOT touch the height: a viewport-dependent row height would
    // desync MediaGrid's windowing math, which is fed a single constant
    expect(narrow.slice(0, narrow.indexOf('@media (prefers-reduced-motion'))).not.toMatch(
      HEIGHT_DECLARATION,
    );
  });

  /**
   * S69 review r2, finding 5. `grid-template-columns: var(--x) …` with no fallback is
   * invalid at computed-value time if the custom property is ever absent, and an
   * invalid `grid-template-columns` computes to `none` — poster and body stack in one
   * column and the body text is clipped by the pinned 300px `overflow: hidden` box.
   * Unreachable today (`rowStyle` always writes both properties, asserted above), but
   * it is the one declaration in this file whose failure mode is structural rather
   * than cosmetic, and the file uses fallbacks everywhere else.
   *
   * The fallbacks are also the stylesheet's ONLY px literals, so they are pinned to
   * the constants here — otherwise "no px literal that could drift" would have become
   * false a second time.
   */
  it('gives both poster-track custom properties a fallback, pinned to the constants', () => {
    // STYLE_BLOCK, not SFC_SOURCE: the comments explain the fix by naming the
    // `grid-template-columns: none` failure mode, which is not a declaration.
    const templates = [...STYLE_BLOCK.matchAll(/grid-template-columns:\s*([^;]+);/g)].map(
      (m) => m[1],
    );
    expect(templates, 'expected the wide rule and the narrow arm').toHaveLength(2);
    for (const value of templates) {
      expect(value, `\`${value}\` must degrade to a two-track layout, not to \`none\``).toMatch(
        /var\(--backdrop-row-poster(?:-narrow)?,\s*\d+px\)/,
      );
    }
    expect(templates[0]).toContain(`, ${BACKDROP_ROW_POSTER_WIDTH}px)`);
    expect(templates[1]).toContain(`, ${BACKDROP_ROW_NARROW_POSTER_WIDTH}px)`);
  });

  it('uses a height regex that does NOT trip over line-height (S70 copies it)', () => {
    // the false positive: `\bheight:` treats the `-` as a word boundary
    expect(/\bheight:/.test('  line-height: var(--leading-snug);')).toBe(true);
    // …which this one does not
    expect(HEIGHT_DECLARATION.test('  line-height: var(--leading-snug);')).toBe(false);
    expect(HEIGHT_DECLARATION.test('line-height:1.3')).toBe(false);
    // …while still catching every spelling of a real height declaration
    expect(HEIGHT_DECLARATION.test('  height: 300px;')).toBe(true);
    expect(HEIGHT_DECLARATION.test('{height:300px}')).toBe(true);
    expect(HEIGHT_DECLARATION.test('width: 1px;height: 2px;')).toBe(true);
    expect(HEIGHT_DECLARATION.test('height: 1px;')).toBe(true);
    expect(HEIGHT_DECLARATION.test('  min-height: 10px;')).toBe(true);
    expect(HEIGHT_DECLARATION.test('  max-height: 10px;')).toBe(true);
    // and it is line-anchored, so a height on any line of a block is found
    expect(HEIGHT_DECLARATION.test('.x {\n  color: red;\n height: 4px;\n}')).toBe(true);
  });

  it('keeps that height for a long overview, no overview, and no images at all', () => {
    const height = `height: ${BACKDROP_ROW_HEIGHT}px`;
    const long = mountRow(media({ overview: 'lorem ipsum '.repeat(400) }));
    const none = mountRow(media({ overview: null }));
    const bare = mountRow(noBackdrop({ poster_url: null }));
    expect(long.find('.media-backdrop-row').attributes('style')).toContain(height);
    expect(none.find('.media-backdrop-row').attributes('style')).toContain(height);
    expect(bare.find('.media-backdrop-row').attributes('style')).toContain(height);
  });
});

/**
 * Mirrors S68's `MediaListRow` semantics rather than inventing a second pattern:
 * a NAMED `<article>` so assistive tech gets an item boundary + an accessible name.
 * `role="listitem"` is deliberately not claimed (it needs a `list`/`group`
 * ancestor, and `MediaGrid`'s container is shared with the poster grid whose cells
 * are `<article>` MediaCards) — see `MediaListRow`'s docblock for the grid-level
 * fix a later step would need for "item 12 of 200".
 */
describe('MediaBackdropRow — item semantics (a11y, S69)', () => {
  it('is a named article, so AT announces an item boundary with the title', () => {
    const row = mountRow().find('.media-backdrop-row');
    expect(row.element.tagName).toBe('ARTICLE');
    expect(row.attributes('aria-label')).toBe('Dune: Part Two');
  });

  it('does not claim list-item semantics it has no list ancestor for', () => {
    expect(mountRow().find('.media-backdrop-row').attributes('role')).toBeUndefined();
  });
});
