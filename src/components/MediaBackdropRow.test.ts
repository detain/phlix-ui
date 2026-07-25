/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import MediaBackdropRow from './MediaBackdropRow.vue';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import { BACKDROP_ROW_HEIGHT, BACKDROP_ROW_POSTER_WIDTH } from './virtual-grid';

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
 * The wide-backdrop treatment itself, ported from `MediaDetail.vue`'s hero: the
 * full-res source wins, the ready-made `srcset` is passed through, the layer is
 * decorative, and an item with no backdrop falls back to the S19 poster-derived
 * ambient wash rather than an empty layer.
 */
describe('MediaBackdropRow — the backdrop wash (S69)', () => {
  it('prefers the full-res backdrop and passes the server srcset through', () => {
    const img = mountRow().find('.media-backdrop-row__img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://img/dune-original.jpg');
    expect(img.attributes('srcset')).toBe(
      'https://img/dune-w780.jpg 780w, https://img/dune-w1280.jpg 1280w',
    );
    expect(img.attributes('sizes')).toBe('100vw');
  });

  it('falls back to the w500 backdrop when there is no full-res one', () => {
    const w = mountRow(media({ backdrop_url_large: null }));
    expect(w.find('.media-backdrop-row__img').attributes('src')).toBe('https://img/dune-w500.jpg');
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
    await w.setProps({ item: media({ id: 'm2', backdrop_url_large: 'https://img/other.jpg' }) });
    expect(w.find('.media-backdrop-row__img').classes()).not.toContain('is-loaded');
  });

  it('falls back to the blurred-poster ambient wash when the item has no backdrop', () => {
    const w = mountRow(media({ backdrop_url: null, backdrop_url_large: null }));
    expect(w.find('.media-backdrop-row__img').exists()).toBe(false);
    const ambient = w.find('.media-backdrop-row__ambient');
    expect(ambient.exists()).toBe(true);
    // jsdom normalises the value to url("…")
    expect(ambient.attributes('style')).toContain('background-image: url("https://img/dune.jpg")');
    // the scrim still paints, so the strip text stays legible over a bright poster
    expect(w.find('.media-backdrop-row__scrim').exists()).toBe(true);
  });

  it('renders NO wash layer at all when the item has neither image', () => {
    const w = mountRow(media({ backdrop_url: null, backdrop_url_large: null, poster_url: null }));
    expect(w.find('.media-backdrop-row__wash').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__ambient').exists()).toBe(false);
    expect(w.find('.media-backdrop-row__scrim').exists()).toBe(false);
    // ...and the strip still renders its content
    expect(w.find('.media-backdrop-row__title').text()).toBe('Dune: Part Two');
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
  it('pins the strip height and the poster column inline, from the shared constants', () => {
    const style = mountRow().find('.media-backdrop-row').attributes('style') ?? '';
    // MediaGrid's windowing math is fed computeFixedRowHeight(BACKDROP_ROW_HEIGHT),
    // so the rendered strip MUST be exactly BACKDROP_ROW_HEIGHT tall or
    // padTop/totalHeight drift from the layout (blank bands, wrong need-range pages).
    expect(style).toContain(`height: ${BACKDROP_ROW_HEIGHT}px`);
    expect(style).toContain(`${BACKDROP_ROW_POSTER_WIDTH}px minmax(0, 1fr)`);
  });

  it('keeps that height for a long overview, no overview, and no images at all', () => {
    const height = `height: ${BACKDROP_ROW_HEIGHT}px`;
    const long = mountRow(media({ overview: 'lorem ipsum '.repeat(400) }));
    const none = mountRow(media({ overview: null }));
    const bare = mountRow(
      media({ backdrop_url: null, backdrop_url_large: null, poster_url: null }),
    );
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
