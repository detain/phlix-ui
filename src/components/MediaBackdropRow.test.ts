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
 * The REFERENCE payload: an item that carries backdrop data. NOTE this is the
 * detail shape — `GET /api/v1/media` (the only surface that mounts this renderer)
 * does not emit any of the three backdrop keys today, so a fixture like this proves
 * the wide-backdrop branch works, NOT that it is what production renders. Use
 * `listShaped()` below for that half, and see `LibraryPage.test.ts` for the
 * page-level branch discrimination.
 */
function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    backdrop_url: 'https://img/dune-w500.jpg',
    backdrop_url_large: 'https://img/dune-original.jpg',
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
 * The payload the LIST endpoint actually returns: no `backdrop_url`, no
 * `backdrop_url_large`, no `backdrop_srcset` (`MediaItemShaper::shape()` emits none
 * of them; they exist only in `shapeDetail()`). This is the shape every strip on the
 * library surface is rendered from today, so the ambient-state tests use it rather
 * than a hand-nulled reference fixture.
 */
function listShaped(over: Partial<MediaItem> = {}): MediaItem {
  const item = media();
  // deleted, not nulled — the list shape does not contain these keys at all, and the
  // overrides are applied AFTER so a test can add one back (i.e. simulate S101)
  delete item.backdrop_url;
  delete item.backdrop_url_large;
  delete item.backdrop_srcset;
  return { ...item, ...over };
}

const SFC_SOURCE = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), './MediaBackdropRow.vue'),
  'utf8',
);

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
   * paints ONE full-bleed hero per page, and `BackdropSrcset::largeUrl()` is TMDB
   * `/original` (≥1920px). Scrolling a 200-item library in backdrop mode mounts 200
   * strips, each decoding its wash into a 300px-tall box, so this renderer takes the
   * smallest usable candidate and keeps `/original` as a last resort. Copying the
   * hero's order here is the mistake this test exists to catch.
   */
  it('prefers the ROW-SIZED backdrop over the full-res original, and passes the srcset through', () => {
    const img = mountRow().find('.media-backdrop-row__img');
    expect(img.exists()).toBe(true);
    expect(
      img.attributes('src'),
      'a strip must not decode the /original backdrop once per rendered row',
    ).toBe('https://img/dune-w500.jpg');
    expect(img.attributes('srcset')).toBe(
      'https://img/dune-w780.jpg 780w, https://img/dune-w1280.jpg 1280w',
    );
  });

  it('uses the full-res original ONLY when there is no row-sized url', () => {
    // an item carrying just the /original still renders a real backdrop rather than
    // silently dropping to the ambient wash
    const w = mountRow(media({ backdrop_url: null }));
    expect(w.find('.media-backdrop-row__img').attributes('src')).toBe(
      'https://img/dune-original.jpg',
    );
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

  it('opts out of native lazy-loading, exactly as MediaGrid does for its cards (S35)', () => {
    // MediaGrid's JS windowing already keeps only near-viewport rows in the DOM;
    // native lazy-load over transform-repositioned cells is a known stall trigger.
    expect(mountRow().find('.media-backdrop-row__img').attributes('loading')).toBeUndefined();
    expect(mountRow().findComponent(MediaCard).props('lazy')).toBe(false);
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
    expect(mountRow(listShaped()).find('.media-backdrop-row__wash').attributes('data-wash')).toBe(
      'ambient',
    );
  });
});

/**
 * The second supported wash state, and — until the list endpoint carries backdrop
 * data (companion server step S101) — the ONLY one the library surface renders.
 * `MediaItemShaper::shape()` emits no backdrop keys; they exist only in
 * `shapeDetail()`. So these tests deliberately mount `listShaped()`, the real list
 * payload, not a reference fixture with the fields nulled out.
 */
describe('MediaBackdropRow — the no-backdrop wash, i.e. what the list payload renders (S69)', () => {
  it('takes the ambient branch for a LIST-shaped item — no backdrop <img> anywhere', () => {
    const item = listShaped();
    // guard the premise: the list shape has none of the three backdrop keys
    expect(item.backdrop_url ?? null).toBeNull();
    expect(item.backdrop_url_large ?? null).toBeNull();
    expect(item.backdrop_srcset ?? null).toBeNull();

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
   */
  it('renders the fallback as a DELIBERATE colour field, not a copy of the poster beside it', () => {
    const w = mountRow(listShaped());
    expect(w.find('.media-backdrop-row__wash').classes()).toContain(
      'media-backdrop-row__wash--ambient',
    );
    const ambient = SFC_SOURCE.slice(SFC_SOURCE.indexOf('.media-backdrop-row__ambient {'));
    expect(SFC_SOURCE.indexOf('.media-backdrop-row__ambient {')).toBeGreaterThan(-1);
    const decls = ambient.slice(0, ambient.indexOf('}'));
    // mirrored + zoomed, so it can never read as the adjacent poster
    expect(decls).toMatch(/transform:\s*scale\(-\d/);
    // and blurred well past the page-level ambient's 40px
    const blur = /blur\((\d+)px\)/.exec(decls);
    expect(blur, 'the ambient colour field must still be blurred').not.toBeNull();
    expect(Number(blur![1])).toBeGreaterThan(40);
    // the scrim has an ambient-specific arm (the panel treatment)
    expect(SFC_SOURCE).toContain(
      '.media-backdrop-row__wash--ambient .media-backdrop-row__scrim {',
    );
  });

  it('renders NO wash layer at all when the item has neither image', () => {
    const w = mountRow(listShaped({ poster_url: null }));
    expect(w.find('.media-backdrop-row__wash').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__ambient').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__scrim').exists()).toBe(false);
    // ...and the strip still renders its content on the plain surface panel
    expect(w.find('.media-backdrop-row__title').text()).toBe('Dune: Part Two');
  });

  /**
   * The three shapes the companion server step could plausibly emit. This renderer
   * must take the wide-backdrop branch for ALL of them without assuming which key
   * arrives, so S101 cannot land and leave the view still on the fallback.
   */
  it.each([
    ['a row-sized url only', { backdrop_url: 'https://img/row.jpg' }],
    ['a srcset only', { backdrop_srcset: 'https://img/a.jpg 780w' }],
    ['an /original only', { backdrop_url_large: 'https://img/orig.jpg' }],
  ])('switches to the wide backdrop when the list payload gains %s', (_label, over) => {
    const w = mountRow(listShaped(over as Partial<MediaItem>));
    expect(w.find('.media-backdrop-row__ambient').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__img').exists()).toBe(true);
    expect(w.find('.media-backdrop-row__wash').attributes('data-wash')).toBe('backdrop');
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
      'grid-template-columns: var(--backdrop-row-poster) minmax(0, 1fr);',
    );
    // …and the narrow arm swaps in the narrow one
    const narrow = SFC_SOURCE.slice(at);
    expect(narrow).toContain(
      'grid-template-columns: var(--backdrop-row-poster-narrow) minmax(0, 1fr);',
    );
    // the arm must NOT touch the height: a viewport-dependent row height would
    // desync MediaGrid's windowing math, which is fed a single constant
    expect(narrow.slice(0, narrow.indexOf('@media (prefers-reduced-motion'))).not.toMatch(
      /\bheight:/,
    );
  });

  it('keeps that height for a long overview, no overview, and no images at all', () => {
    const height = `height: ${BACKDROP_ROW_HEIGHT}px`;
    const long = mountRow(media({ overview: 'lorem ipsum '.repeat(400) }));
    const none = mountRow(media({ overview: null }));
    const bare = mountRow(listShaped({ poster_url: null }));
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
