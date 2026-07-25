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
import MediaListRow from './MediaListRow.vue';
import MediaCard from './MediaCard.vue';
import type { MediaItem } from '../types/media-item';
import { LIST_ROW_HEIGHT, LIST_ROW_POSTER_WIDTH } from './virtual-grid';

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
  return mount(MediaListRow, {
    props: { item, ...props },
    global: { plugins: [makeRouter()], provide: { phlixConfig: { app: 'server', apiBase: '' } } },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('MediaListRow — rendering (S68)', () => {
  it('renders the title, the meta strip and the overview', () => {
    const w = mountRow();
    expect(w.find('.media-list-row__title').text()).toBe('Dune: Part Two');
    const meta = w.find('.media-list-row__meta').text();
    expect(meta).toContain('2024');
    expect(meta).toContain('PG-13');
    expect(meta).toContain('166m');
    expect(w.find('.media-list-row__overview').text()).toContain('Paul unites with the Fremen');
  });

  it('caps the genre chips at three', () => {
    // the fixture carries four genres; the row shows the first three
    const chips = mountRow().findAll('.media-list-row__genre');
    expect(chips).toHaveLength(3);
    expect(chips.map((c) => c.text())).toEqual(['Sci-Fi', 'Adventure', 'Drama']);
  });

  it('falls back to a placeholder line when the item has no overview', () => {
    const w = mountRow(media({ overview: null }));
    const p = w.find('.media-list-row__overview');
    expect(p.classes()).toContain('media-list-row__overview--empty');
    expect(p.text()).toBe('No description yet.');
  });

  it('omits the meta parts the item does not have', () => {
    const w = mountRow(media({ year: null, rating: null, runtime: null, genres: [] }));
    expect(w.find('.media-list-row__meta').text()).toBe('');
    expect(w.find('.media-list-row__cert').exists()).toBe(false);
    expect(w.findAll('.media-list-row__dot')).toHaveLength(0);
  });

  it('links the title to the item detail route with the title as its accessible name', () => {
    const w = mountRow(media({ id: 'abc' }));
    const link = w.find('.media-list-row__link');
    // a real anchor with an href → keyboard-focusable and Enter-activatable, and
    // its visible text IS its accessible name.
    expect(link.element.tagName).toBe('A');
    expect(link.attributes('href')).toBe('/app/media/abc');
    expect(link.text()).toBe('Dune: Part Two');
  });

  it('still renders a plain title link when no router is available (standalone mount)', () => {
    const w = mount(MediaListRow, {
      props: { item: media({ id: 'abc' }) },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '' } } },
    });
    const link = w.find('.media-list-row__link');
    expect(link.attributes('href')).toBe('/app/media/abc');
  });
});

describe('MediaListRow — composed MediaCard poster column (S68)', () => {
  it('reuses MediaCard for the poster and suppresses its duplicate caption', () => {
    const w = mountRow();
    const card = w.findComponent(MediaCard);
    expect(card.exists()).toBe(true);
    expect(card.props('hideCaption')).toBe(true);
    // the row body owns the title; the card must NOT print it a second time
    expect(w.find('.media-card__caption').exists()).toBe(false);
    expect(w.findAll('.media-list-row__title')).toHaveLength(1);
  });

  it('keeps the card action overlay (the row inherits every quick-action)', async () => {
    const w = mountRow();
    // the overlay row is lazy-mounted on hover, exactly as in the poster grid
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
 * The list is enumerated from MediaCard's `defineEmits` — deleting any one of the
 * ten forwards in MediaListRow.vue fails this suite.
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

describe('MediaListRow — host event forwarding (S68)', () => {
  it.each(HOST_EVENTS)('re-emits `%s` from the composed card with the item', (event) => {
    const item = media({ id: 'fwd1' });
    const w = mountRow(item);
    w.findComponent(MediaCard).vm.$emit(event, item);
    const emitted = w.emitted(event) as unknown[][] | undefined;
    expect(emitted, `MediaListRow dropped the \`${event}\` event`).toHaveLength(1);
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

describe('MediaListRow — fixed geometry (virtualization contract, S68)', () => {
  it('pins the row height and the poster column inline, from the shared constants', () => {
    const style = mountRow().find('.media-list-row').attributes('style') ?? '';
    // MediaGrid's windowing math is fed computeFixedRowHeight(LIST_ROW_HEIGHT), so
    // the rendered row MUST be exactly LIST_ROW_HEIGHT tall or padTop/totalHeight
    // drift from the layout (blank bands, wrong need-range pages).
    expect(style).toContain(`height: ${LIST_ROW_HEIGHT}px`);
    expect(style).toContain(`${LIST_ROW_POSTER_WIDTH}px minmax(0, 1fr)`);
  });

  it('keeps that height for a long overview and for no overview at all', () => {
    const long = mountRow(media({ overview: 'lorem ipsum '.repeat(400) }));
    const none = mountRow(media({ overview: null }));
    const height = `height: ${LIST_ROW_HEIGHT}px`;
    expect(long.find('.media-list-row').attributes('style')).toContain(height);
    expect(none.find('.media-list-row').attributes('style')).toContain(height);
  });
});
