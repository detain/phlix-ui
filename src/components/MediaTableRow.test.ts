/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import MediaTableRow from './MediaTableRow.vue';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import {
  TABLE_COLUMNS,
  TABLE_ROW_HEIGHT,
  TABLE_ROW_POSTER_WIDTH,
  TABLE_ROW_TEMPLATE_COLUMNS,
} from './virtual-grid';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
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
  return mount(MediaTableRow, {
    props: { item, ...props },
    global: { plugins: [makeRouter()], provide: { phlixConfig: { app: 'server', apiBase: '' } } },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('MediaTableRow — columns (S70)', () => {
  it('renders exactly one cell per declared column, in the declared order', () => {
    // TABLE_COLUMNS is the SINGLE source for both this row and LibraryPage's
    // header row (two separate CSS grids). Adding a column there without adding
    // its cell here shears every row against the header — this is what catches it.
    const cells = mountRow().findAll('[role="cell"]');
    expect(cells).toHaveLength(TABLE_COLUMNS.length);
    // A literal too, so the assertion above cannot self-adjust to a reshaped set.
    expect(cells).toHaveLength(6);
    expect(cells.map((c) => c.classes().find((k) => k.includes('--')))).toEqual([
      'media-table-row__cell--poster',
      'media-table-row__cell--title',
      'media-table-row__cell--year',
      'media-table-row__cell--rating',
      'media-table-row__cell--runtime',
      'media-table-row__cell--genres',
    ]);
  });

  it('prints the scalar values in their own columns', () => {
    const w = mountRow();
    expect(w.find('.media-table-row__title').text()).toBe('Dune: Part Two');
    expect(w.find('.media-table-row__cell--year').text()).toBe('2024');
    expect(w.find('.media-table-row__cell--rating').text()).toBe('PG-13');
    expect(w.find('.media-table-row__cell--runtime').text()).toBe('166m');
  });

  /**
   * S70 review, finding 2 — the certificate column shows the CERTIFICATE.
   *
   * `types/media-item.ts` warns twice, on both fields, never to conflate the
   * list-level `rating` (the content/parental certificate) with the per-user 1-10
   * `user_data.rating` score. Nothing in this suite discriminated them: every
   * fixture had only the certificate, so a renderer that switched to the score
   * would simply have shown "—". This item carries BOTH, so the two are separable,
   * and the header its value sits under is asserted in the same test — the label
   * and the field it names cannot drift apart.
   */
  it('the Cert column renders the parental certificate, never the per-user score', () => {
    const w = mountRow(media({ rating: 'PG-13', user_data: { favorite: false, rating: 9 } }));
    const cell = w.find('.media-table-row__cell--rating');
    expect(cell.text()).toBe('PG-13');
    expect(cell.text()).not.toContain('9');
    // ...and the column header over it says so. Literal on both sides: deriving the
    // label from TABLE_COLUMNS would self-adjust to a renamed column.
    expect(TABLE_COLUMNS[3].label).toBe('Cert');
    expect(TABLE_COLUMNS.map((c) => c.label)).not.toContain('Rating');
  });

  it('caps the genre chips at three', () => {
    const chips = mountRow().findAll('.media-table-row__genre');
    expect(chips).toHaveLength(3);
    expect(chips.map((c) => c.text())).toEqual(['Sci-Fi', 'Adventure', 'Drama']);
  });

  it('renders a placeholder — never an empty cell — for a missing value', () => {
    // A collapsed cell is not a rendering nicety here: every row must present the
    // same cell count or the ARIA table's column relationships break, and the
    // shared grid tracks would let a blank column look like a shear.
    const w = mountRow(media({ year: null, rating: null, runtime: null, genres: [] }));
    expect(w.findAll('[role="cell"]')).toHaveLength(TABLE_COLUMNS.length);
    expect(w.find('.media-table-row__cell--year').text()).toBe('—');
    expect(w.find('.media-table-row__cell--rating').text()).toBe('—');
    expect(w.find('.media-table-row__cell--runtime').text()).toBe('—');
    expect(w.find('.media-table-row__cell--genres').text()).toBe('—');
    expect(w.find('.media-table-row__cert').exists()).toBe(false);
  });

  it('links the title to the item detail route with the title as its accessible name', () => {
    const w = mountRow(media({ id: 'abc' }));
    const link = w.find('.media-table-row__link');
    expect(link.element.tagName).toBe('A');
    expect(link.attributes('href')).toBe('/app/media/abc');
    expect(link.text()).toBe('Dune: Part Two');
  });

  it('still renders a plain title link when no router is available (standalone mount)', () => {
    const w = mount(MediaTableRow, {
      props: { item: media({ id: 'abc' }) },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '' } } },
    });
    expect(w.find('.media-table-row__link').attributes('href')).toBe('/app/media/abc');
  });
});

/**
 * The a11y half of S70. `MediaGrid`'s `#card` slot renders one DETACHED cell per
 * item inside a `display: grid` container, and only a virtualized window of them
 * exists at a time, so a semantic `<table>/<tbody>/<tr>` hierarchy is impossible —
 * the semantics are roles on divs, and the row index has to be published explicitly
 * because a windowed rowgroup would otherwise make AT count "row 3 of 7".
 */
describe('MediaTableRow — ARIA row semantics (S70)', () => {
  it('is a NAMED row (S68’s accessible-name pattern, expressed as a table row)', () => {
    const row = mountRow().find('.media-table-row');
    expect(row.attributes('role')).toBe('row');
    expect(row.attributes('aria-label')).toBe('Dune: Part Two');
    // NOT an <article>: inside a `table` the ROW is the item boundary, so a nested
    // article would announce a second, unnamed one (the S69 finding-6 defect).
    expect(row.element.tagName).not.toBe('ARTICLE');
  });

  it('publishes an ABSOLUTE aria-rowindex, offset past the header row', () => {
    // The header LibraryPage renders outside the grid is row 1, so item index 0 is
    // row 2 and item index 41 is row 43 — the numbers a virtualized window cannot
    // be counted for.
    expect(mountRow(media(), { index: 0 }).find('.media-table-row').attributes('aria-rowindex')).toBe(
      '2',
    );
    expect(
      mountRow(media(), { index: 41 }).find('.media-table-row').attributes('aria-rowindex'),
    ).toBe('43');
    expect(
      mountRow(media(), { index: 3999 }).find('.media-table-row').attributes('aria-rowindex'),
    ).toBe('4001');
  });

  it('never claims the header’s own row index for a garbage index', () => {
    for (const index of [-1, -400, 0.7]) {
      const idx = mountRow(media(), { index }).find('.media-table-row').attributes('aria-rowindex');
      expect(Number(idx), `index=${index} must not reach the header row`).toBeGreaterThanOrEqual(2);
    }
  });

  it('does not label its cells (the column header supplies the meaning)', () => {
    // Labelling each cell would double-announce it: "Year, Year 2024".
    for (const cell of mountRow().findAll('[role="cell"]')) {
      expect(cell.attributes('aria-label')).toBeUndefined();
    }
  });
});

describe('MediaTableRow — composed MediaCard poster column (S70)', () => {
  it('reuses MediaCard for the poster and suppresses its duplicate caption', () => {
    const w = mountRow();
    const card = w.findComponent(MediaCard);
    expect(card.exists()).toBe(true);
    expect(card.props('hideCaption')).toBe(true);
    expect(w.find('.media-card__caption').exists()).toBe(false);
  });

  it('marks the composed card presentational so the row is the ONLY item boundary', () => {
    // MediaCard's root is itself an <article>; without this the row announces two
    // boundaries per item (S69 review, finding 6).
    expect(mountRow().find('.media-card').attributes('role')).toBe('presentation');
  });

  it('emits exactly ONE heading for the item — the card must not duplicate it', () => {
    const w = mountRow();
    const headings = w.findAll('h1, h2, h3, h4, h5, h6');
    expect(headings, 'a table row must expose exactly one heading per item').toHaveLength(1);
    expect(headings[0].classes()).toContain('media-table-row__title');
    // the card's overlay text block is gone, not merely invisible (opacity:0 does
    // NOT remove content from the accessibility tree)
    expect(w.find('.media-card__title').exists()).toBe(false);
    expect(w.find('.media-card__meta').exists()).toBe(false);
    expect(w.find('.media-card__genres').exists()).toBe(false);
  });

  it('keeps the card action overlay — this row inherits every quick-action', async () => {
    // This is WHY the row cannot be shorter than the composed card's poster: the
    // overlay lives inside `.media-card__poster` (overflow:hidden) and its wrapped
    // action rows need the full 180px. See TABLE_ROW_POSTER_WIDTH.
    const w = mountRow();
    await w.find('.media-card').trigger('pointerenter');
    expect(w.find('.media-card__actions').exists()).toBe(true);
    expect(w.find('[aria-label="Play"]').exists()).toBe(true);
    expect(w.find('[aria-label="More actions"]').exists()).toBe(true);
  });

  it('opts out of native lazy-loading like MediaGrid does (S35)', () => {
    const w = mountRow();
    expect(w.findComponent(MediaCard).props('lazy')).toBe(false);
    expect(w.find('.media-card__img').attributes('loading')).toBeUndefined();
  });

  it('pins the poster `sizes` hint to the column’s real width, not the 200px default', () => {
    expect(mountRow().findComponent(MediaCard).props('posterSizes')).toBe(
      `${TABLE_ROW_POSTER_WIDTH}px`,
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
 * MediaGrid's own wiring of MediaCard's ten host events, so this row must re-emit
 * every single one or the corresponding button/menu item silently does nothing.
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

describe('MediaTableRow — host event forwarding (S70)', () => {
  it.each(HOST_EVENTS)('re-emits `%s` from the composed card with the item', (event) => {
    const item = media({ id: 'fwd1' });
    const w = mountRow(item);
    w.findComponent(MediaCard).vm.$emit(event, item);
    const emitted = w.emitted(event) as unknown[][] | undefined;
    expect(emitted, `MediaTableRow dropped the \`${event}\` event`).toHaveLength(1);
    expect((emitted![0][0] as MediaItem).id).toBe('fwd1');
  });

  it('forwards the WHOLE MediaCard emit surface — nothing is silently missing', () => {
    const item = media();
    const w = mountRow(item);
    const card = w.findComponent(MediaCard);
    for (const event of HOST_EVENTS) card.vm.$emit(event, item);
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

describe('MediaTableRow — fixed geometry (virtualization contract, S70)', () => {
  it('pins the row height and the shared column tracks inline, from the constants', () => {
    const style = mountRow().find('.media-table-row').attributes('style') ?? '';
    // MediaGrid's windowing math is fed computeFixedRowHeight(TABLE_ROW_HEIGHT), so
    // the rendered row MUST be exactly TABLE_ROW_HEIGHT tall or padTop/totalHeight
    // drift from the layout (blank bands, wrong need-range pages).
    expect(style).toContain(`height: ${TABLE_ROW_HEIGHT}px`);
    // ...and the LITERAL, because the line above computes its expectation from the
    // very constant it is checking and therefore self-adjusts if that constant's
    // VALUE changes (mutation-verified: `TABLE_ROW_HEIGHT + 40` left this whole
    // file green). `virtual-grid.test.ts` pins the constant itself; this pins the
    // number that actually reaches the DOM.
    expect(style).toContain('height: 180px');
    // ...and the tracks must be the SAME string LibraryPage's header writes, or the
    // two separate grids shear against each other.
    expect(style).toContain(TABLE_ROW_TEMPLATE_COLUMNS);
    expect(style).toContain(`${TABLE_ROW_POSTER_WIDTH}px`);
    expect(style).toContain('120px minmax(0, 3fr) 80px 88px 88px minmax(0, 2fr)');
  });

  it('keeps that height for an absurdly long title and for an empty row', () => {
    const long = mountRow(media({ name: 'Lorem ipsum dolor '.repeat(200) }));
    const bare = mountRow(media({ year: null, rating: null, runtime: null, genres: [] }));
    const height = `height: ${TABLE_ROW_HEIGHT}px`;
    expect(long.find('.media-table-row').attributes('style')).toContain(height);
    expect(bare.find('.media-table-row').attributes('style')).toContain(height);
  });
});
