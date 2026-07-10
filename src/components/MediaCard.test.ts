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
import MediaCard from './MediaCard.vue';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { MediaItem } from '../types/media-item';

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
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('MediaCard — rendering', () => {
  it('renders the poster image lazily with an aspect-ratio box (no CLS)', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    const img = w.find('.media-card__img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('src')).toBe('https://img/dune.jpg');
    // the poster reserves a 2:3 box regardless of load state
    expect(w.find('.media-card__poster').exists()).toBe(true);
  });

  it('renders title, meta and up to three genres in the overlay', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    expect(w.find('.media-card__title').text()).toBe('Dune: Part Two');
    expect(w.find('.media-card__cert').text()).toBe('PG-13');
    expect(w.find('.media-card__meta').text()).toContain('2024');
    expect(w.find('.media-card__meta').text()).toContain('166m');
    const genres = w.findAll('.media-card__genres span');
    expect(genres).toHaveLength(3); // capped at 3 of 4
  });

  it('links the poster to the info/detail route by default and honors `to`', () => {
    const def = mount(MediaCard, { props: { item: media() } });
    expect(def.find('.media-card__link').attributes('href')).toBe('/app/media/m1');
    const custom = mount(MediaCard, { props: { item: media(), to: '/app/player/m1' } });
    expect(custom.find('.media-card__link').attributes('href')).toBe('/app/player/m1');
  });

  it('links a SERIES card to its detail page (the season tree)', () => {
    const w = mount(MediaCard, { props: { item: media({ id: 's1', type: 'series' }) } });
    expect(w.find('.media-card__link').attributes('href')).toBe('/app/media/s1');
  });

  it('links an episode to its info page by default (playback is the Play button)', () => {
    const w = mount(MediaCard, { props: { item: media({ id: 'e1', type: 'episode' }) } });
    expect(w.find('.media-card__link').attributes('href')).toBe('/app/media/e1');
  });

  it('falls back to a real SVG icon (never emoji) when no poster', () => {
    const w = mount(MediaCard, { props: { item: media({ poster_url: null, type: 'series' }) } });
    expect(w.find('.media-card__img').exists()).toBe(false);
    const fallback = w.find('.media-card__fallback');
    expect(fallback.exists()).toBe(true);
    expect(fallback.find('svg').exists()).toBe(true);
    expect(w.html()).not.toMatch(/🎬|🎵|🖼/);
  });

  it('marks the image loaded on the load event (fade-in)', async () => {
    const w = mount(MediaCard, { props: { item: media() } });
    const img = w.find('.media-card__img');
    expect(img.classes()).not.toContain('is-loaded');
    await img.trigger('load');
    expect(w.find('.media-card__img').classes()).toContain('is-loaded');
  });

  it('treats an already-cached (complete) image as loaded on mount (no hidden poster)', async () => {
    const spy = vi
      .spyOn(HTMLImageElement.prototype, 'complete', 'get')
      .mockReturnValue(true);
    const w = mount(MediaCard, { props: { item: media() } });
    await nextTick(); // onMounted sets loaded → flush the reactive class
    expect(w.find('.media-card__img').classes()).toContain('is-loaded');
    spy.mockRestore();
  });
});

describe('MediaCard — responsive poster (R6.2b)', () => {
  it('emits no srcset/sizes by default (byte-identical single-src markup)', () => {
    const img = mount(MediaCard, { props: { item: media() } }).find('.media-card__img');
    expect(img.attributes('src')).toBe('https://img/dune.jpg');
    expect(img.attributes('srcset')).toBeUndefined();
    expect(img.attributes('sizes')).toBeUndefined();
  });

  it('renders a width-descriptor srcset from the posterSrcset prop with a default sizes', () => {
    const w = mount(MediaCard, {
      props: {
        item: media(),
        posterSrcset: [
          { url: 'https://img/dune-200.jpg', width: 200 },
          { url: 'https://img/dune-400.jpg', width: 400 },
        ],
      },
    });
    const img = w.find('.media-card__img');
    expect(img.attributes('srcset')).toBe(
      'https://img/dune-200.jpg 200w, https://img/dune-400.jpg 400w',
    );
    expect(img.attributes('sizes')).toBe('(max-width: 600px) 45vw, 200px');
    // the single src stays as the fallback for non-srcset browsers
    expect(img.attributes('src')).toBe('https://img/dune.jpg');
  });

  it('honors an explicit posterSizes over the default', () => {
    const img = mount(MediaCard, {
      props: { item: media(), posterSrcset: 'a.jpg 200w', posterSizes: '300px' },
    }).find('.media-card__img');
    expect(img.attributes('srcset')).toBe('a.jpg 200w');
    expect(img.attributes('sizes')).toBe('300px');
  });

  it('reads poster_srcset off the item when no prop is given', () => {
    const img = mount(MediaCard, {
      props: { item: media({ poster_srcset: 'a.jpg 320w' }) },
    }).find('.media-card__img');
    expect(img.attributes('srcset')).toBe('a.jpg 320w');
    expect(img.attributes('sizes')).toBe('(max-width: 600px) 45vw, 200px');
  });

  it('prefers the posterSrcset prop over the item field', () => {
    const img = mount(MediaCard, {
      props: { item: media({ poster_srcset: 'item.jpg 100w' }), posterSrcset: 'prop.jpg 500w' },
    }).find('.media-card__img');
    expect(img.attributes('srcset')).toBe('prop.jpg 500w');
  });

  it('omits sizes for a density-only srcset', () => {
    const img = mount(MediaCard, {
      props: { item: media(), posterSrcset: 'a.jpg 1x, a@2x.jpg 2x' },
    }).find('.media-card__img');
    expect(img.attributes('srcset')).toBe('a.jpg 1x, a@2x.jpg 2x');
    expect(img.attributes('sizes')).toBeUndefined();
  });
});

describe('MediaCard — badges', () => {
  it('shows the NEW badge for a recently-added item', () => {
    const recent = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const w = mount(MediaCard, { props: { item: media({ created_at: recent }) } });
    expect(w.find('.media-card__badge--new').exists()).toBe(true);
  });

  it('hides the NEW badge for an old item or unparseable date', () => {
    const old = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
    expect(mount(MediaCard, { props: { item: media({ created_at: old }) } }).find('.media-card__badge--new').exists()).toBe(false);
    expect(mount(MediaCard, { props: { item: media({ created_at: 'not-a-date' }) } }).find('.media-card__badge--new').exists()).toBe(false);
    expect(mount(MediaCard, { props: { item: media({ created_at: null }) } }).find('.media-card__badge--new').exists()).toBe(false);
  });

  it('renders a quality badge only when the prop is given', () => {
    expect(mount(MediaCard, { props: { item: media() } }).find('.media-card__badge--quality').exists()).toBe(false);
    const w = mount(MediaCard, { props: { item: media(), quality: '4K · HDR' } });
    expect(w.find('.media-card__badge--quality').text()).toBe('4K · HDR');
  });
});

describe('MediaCard — resume progress', () => {
  it('renders a progressbar at resumePosition ÷ runtime', () => {
    const player = usePlayerStore();
    player.resumeMap['m1'] = 83 * 60; // half of 166m, in seconds
    const w = mount(MediaCard, { props: { item: media() } });
    const bar = w.find('.media-card__progress');
    expect(bar.exists()).toBe(true);
    expect(bar.attributes('aria-valuenow')).toBe('50');
    expect((bar.find('i').element as HTMLElement).style.width).toBe('50%');
  });

  it('shows no progressbar without a resume position', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    expect(w.find('.media-card__progress').exists()).toBe(false);
  });

  it('clamps the ratio to 1 when resume exceeds runtime', () => {
    const player = usePlayerStore();
    player.resumeMap['m1'] = 999 * 60;
    const w = mount(MediaCard, { props: { item: media() } });
    expect(w.find('.media-card__progress').attributes('aria-valuenow')).toBe('100');
  });

  it('shows no progressbar when runtime is missing', () => {
    const player = usePlayerStore();
    player.resumeMap['m1'] = 600;
    const w = mount(MediaCard, { props: { item: media({ runtime: null }) } });
    expect(w.find('.media-card__progress').exists()).toBe(false);
  });
});

describe('MediaCard — quick actions + slots', () => {
  it('emits play/watchlist/info from the quick-action buttons', async () => {
    const w = mount(MediaCard, { props: { item: media() } });
    await w.find('.media-card__iconbtn--play').trigger('click');
    // The favorite button keeps emitting `watchlist` for back-compat (the store
    // wiring is additive) — it is the canonical favorite/bookmark slot.
    await w.find('[aria-label="Add to favorites"]').trigger('click');
    await w.find('[aria-label="More info"]').trigger('click');
    expect(w.emitted('play')![0][0]).toMatchObject({ id: 'm1' });
    expect(w.emitted('watchlist')).toHaveLength(1);
    expect(w.emitted('watchlist')![0][0]).toMatchObject({ id: 'm1' });
    expect(w.emitted('info')).toHaveLength(1);
  });

  it('Play stops the click from bubbling to the card so it never falls through to the info link', async () => {
    // The whole-card info link sits behind the overlay; a quick-action click
    // must be consumed by the button (@click.stop) so playback starts and the
    // tap can never also trigger the card's default navigate-to-info.
    const onCardClick = vi.fn();
    const w = mount(MediaCard, {
      props: { item: media() },
      attrs: { onClick: onCardClick },
    });
    await w.find('.media-card__iconbtn--play').trigger('click');
    expect(w.emitted('play')).toHaveLength(1);
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it('renders #badges and #actions slot content with the item', () => {
    const w = mount(MediaCard, {
      props: { item: media() },
      slots: {
        badges: '<span class="app-badge">HUB</span>',
        actions: '<button class="app-action">x</button>',
      },
    });
    expect(w.find('.app-badge').text()).toBe('HUB');
    expect(w.find('.app-action').exists()).toBe(true);
  });

  it('hides the Match action by default and shows + emits it when canMatch (admin only)', async () => {
    const off = mount(MediaCard, { props: { item: media() } });
    expect(off.find('[aria-label="Match metadata"]').exists()).toBe(false);

    const on = mount(MediaCard, { props: { item: media(), canMatch: true } });
    const btn = on.find('[aria-label="Match metadata"]');
    expect(btn.exists()).toBe(true);
    await btn.trigger('click');
    expect(on.emitted('match')![0][0]).toMatchObject({ id: 'm1' });
  });
});

describe('MediaCard — favorite/bookmark wiring (Feature 17)', () => {
  it('reflects the store: outline + aria-pressed=false when not favorited', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    const btn = w.find('[aria-label="Add to favorites"]');
    expect(btn.exists()).toBe(true);
    expect(btn.attributes('aria-pressed')).toBe('false');
    expect(btn.classes()).not.toContain('is-active');
    // outline bookmark icon when not favorited
    expect(w.find('[aria-label="Add to favorites"] svg').exists()).toBe(true);
  });

  it('reflects the store: filled + aria-pressed=true when the item is favorited', () => {
    const store = useUserItemDataStore();
    store.entries.set('m1', { favorite: true, rating: null, like_level: 0, watched: false });
    const w = mount(MediaCard, { props: { item: media() } });
    const btn = w.find('[aria-label="Remove from favorites"]');
    expect(btn.exists()).toBe(true);
    expect(btn.attributes('aria-pressed')).toBe('true');
    expect(btn.classes()).toContain('is-active');
  });

  it('clicking calls toggleFavorite(id, apiBase) and flips aria-pressed', async () => {
    const store = useUserItemDataStore();
    // Stub the store action so no network call is attempted; it still flips the
    // optimistic flag synchronously so the component re-renders the new state.
    const toggle = vi
      .spyOn(store, 'toggleFavorite')
      .mockImplementation(async (id: string) => {
        store.entries.set(id, { favorite: true, rating: null, like_level: 0, watched: false });
      });
    const w = mount(MediaCard, {
      props: { item: media() },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '/api-host' } } },
    });
    expect(w.find('[aria-label="Add to favorites"]').attributes('aria-pressed')).toBe('false');

    await w.find('[aria-label="Add to favorites"]').trigger('click');

    expect(toggle).toHaveBeenCalledTimes(1);
    expect(toggle).toHaveBeenCalledWith('m1', '/api-host');
    await nextTick();
    // visual now reflects the store's favorited state
    const on = w.find('[aria-label="Remove from favorites"]');
    expect(on.exists()).toBe(true);
    expect(on.attributes('aria-pressed')).toBe('true');
  });

  it('still emits `watchlist` on favorite click (back-compat) and stops propagation', async () => {
    const store = useUserItemDataStore();
    vi.spyOn(store, 'toggleFavorite').mockResolvedValue(undefined);
    const onCardClick = vi.fn();
    const w = mount(MediaCard, {
      props: { item: media() },
      attrs: { onClick: onCardClick },
    });
    await w.find('[aria-label="Add to favorites"]').trigger('click');
    expect(w.emitted('watchlist')).toHaveLength(1);
    expect(w.emitted('watchlist')![0][0]).toMatchObject({ id: 'm1' });
    // @click.stop.prevent: the click never reaches the card / stretched info link
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it('passes an empty apiBase when no phlixConfig is provided (standalone mount)', async () => {
    const store = useUserItemDataStore();
    const toggle = vi.spyOn(store, 'toggleFavorite').mockResolvedValue(undefined);
    const w = mount(MediaCard, { props: { item: media() } });
    await w.find('[aria-label="Add to favorites"]').trigger('click');
    expect(toggle).toHaveBeenCalledWith('m1', '');
  });

  it('lays out the action row in the canonical order [Play][Love][Favorite][Watched][Info][⋯][Match]', () => {
    const w = mount(MediaCard, { props: { item: media(), canMatch: true } });
    const labels = w
      .findAll('.media-card__actions .media-card__iconbtn')
      .map((b) => b.attributes('aria-label'));
    expect(labels).toEqual(['Play', 'Add to favorites', 'Mark as watched', 'More info', 'More actions', 'Match metadata']);
  });

  it('keeps the canonical order without the admin Match button', () => {
    const w = mount(MediaCard, { props: { item: media() } });
    const labels = w
      .findAll('.media-card__actions .media-card__iconbtn')
      .map((b) => b.attributes('aria-label'));
    expect(labels).toEqual(['Play', 'Add to favorites', 'Mark as watched', 'More info', 'More actions']);
  });
});

describe('MediaCard — watched (eye) toggle', () => {
  it('shows a closed (eye-off) icon when not watched and an open (eye) icon when watched', async () => {
    const store = useUserItemDataStore();
    const w = mount(MediaCard, { props: { item: media() } });
    // Not watched → "Mark as watched" affordance.
    const off = w.find('[aria-label="Mark as watched"]');
    expect(off.exists()).toBe(true);
    expect(off.attributes('aria-pressed')).toBe('false');

    store.entries.set('m1', { favorite: false, rating: null, like_level: 0, watched: true });
    await nextTick();
    const on = w.find('[aria-label="Mark as unwatched"]');
    expect(on.exists()).toBe(true);
    expect(on.attributes('aria-pressed')).toBe('true');
  });

  it('clicking calls toggleWatched(id, apiBase), emits mark-watched, and stops propagation', async () => {
    const store = useUserItemDataStore();
    const toggle = vi.spyOn(store, 'toggleWatched').mockResolvedValue(undefined);
    const onCardClick = vi.fn();
    const w = mount(MediaCard, {
      props: { item: media() },
      attrs: { onClick: onCardClick },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '/api-host' } } },
    });
    await w.find('[aria-label="Mark as watched"]').trigger('click');
    expect(toggle).toHaveBeenCalledTimes(1);
    expect(toggle).toHaveBeenCalledWith('m1', '/api-host');
    expect(w.emitted('mark-watched')).toHaveLength(1);
    expect(w.emitted('mark-watched')![0][0]).toMatchObject({ id: 'm1' });
    // @click.stop.prevent: never falls through to the stretched info link.
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it('hides the action row entirely when hideActions is set (navigational season card)', () => {
    const w = mount(MediaCard, { props: { item: media(), hideActions: true } });
    expect(w.find('.media-card__actions').exists()).toBe(false);
    // caption is still the library-card caption
    expect(w.find('.media-card__caption-title').exists()).toBe(true);
  });

  it('renders ONLY the Play action in playOnly mode (season card)', () => {
    const w = mount(MediaCard, {
      props: { item: media({ id: 'sea1', type: 'season' }), playOnly: true, canMatch: true },
    });
    const row = w.find('.media-card__actions');
    expect(row.exists()).toBe(true);
    // exactly one button — Play — no thumbs/favorite/watched/info/menu/match
    const buttons = w.findAll('.media-card__actions button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].attributes('aria-label')).toBe('Play');
    expect(w.find('.thumb-rating').exists()).toBe(false);
    expect(w.find('[aria-label="Add to favorites"]').exists()).toBe(false);
    expect(w.find('[aria-label="More actions"]').exists()).toBe(false);
  });

  it('playOnly Play emits play with the item and never falls through to the link', async () => {
    const onCardClick = vi.fn();
    const w = mount(MediaCard, {
      props: { item: media({ id: 'sea1', type: 'season' }), playOnly: true },
      attrs: { onClick: onCardClick },
    });
    await w.find('.media-card__iconbtn--play').trigger('click');
    expect(w.emitted('play')![0][0]).toMatchObject({ id: 'sea1' });
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it('hideActions still wins over playOnly (no action row at all)', () => {
    const w = mount(MediaCard, { props: { item: media(), hideActions: true, playOnly: true } });
    expect(w.find('.media-card__actions').exists()).toBe(false);
  });

  it('renders the subtitle override in the caption sub-line', () => {
    const w = mount(MediaCard, { props: { item: media(), subtitle: '12 episodes' } });
    expect(w.find('.media-card__caption-sub').text()).toContain('12 episodes');
  });

  it('opens the ⋯ menu when its trigger is clicked (regression: .stop swallowed the toggle)', async () => {
    const w = mount(MediaCard, { props: { item: media() }, attachTo: document.body });
    expect(document.querySelector('[role="menu"]')).toBeNull();
    await w.find('[aria-label="More actions"]').trigger('click');
    // The Menu teleports its list to <body>; it must actually be open now.
    expect(document.querySelector('[role="menu"]')).not.toBeNull();
    w.unmount();
  });
});

describe('MediaCard — ThumbRating (thumbs up/down)', () => {
  it('renders the ThumbRating in the canonical slot between Play and Favorite', () => {
    const w = mount(MediaCard, { props: { item: media(), canMatch: true } });
    // EVERY button in the action row, in DOM order. The rating widget is the
    // .thumb-rating (its own component, two buttons at level 0); Play/Favorite/
    // Info/Match are iconbtns.
    const all = w.findAll('.media-card__actions button');
    const order = all.map((b) => {
      if (b.classes().includes('thumb-rating__btn--up')) return 'Like';
      if (b.classes().includes('thumb-rating__btn--down')) return 'Dislike';
      return b.attributes('aria-label') ?? '';
    });
    expect(order).toEqual([
      'Play',
      'Like',
      'Dislike',
      'Add to favorites',
      'Mark as watched',
      'More info',
      'More actions',
      'Match metadata',
    ]);
  });

  it('reflects the store like_level on the ThumbRating', () => {
    const store = useUserItemDataStore();
    store.entries.set('m1', { favorite: false, rating: null, like_level: 2, watched: false });
    const w = mount(MediaCard, { props: { item: media() } });
    const rating = w.find('.media-card__actions .thumb-rating');
    expect(rating.exists()).toBe(true);
    expect(rating.attributes('data-level')).toBe('2');
    // At level 2 only the up thumb is shown.
    expect(w.find('.thumb-rating__btn--up').exists()).toBe(true);
    expect(w.find('.thumb-rating__btn--down').exists()).toBe(false);
  });

  it('clicking thumbs-up calls setLike(id, 1, apiBase) exactly ONCE per click (single PUT)', async () => {
    const store = useUserItemDataStore();
    const setLike = vi.spyOn(store, 'setLike').mockResolvedValue(undefined);
    const w = mount(MediaCard, {
      props: { item: media() },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '/api-host' } } },
    });

    await w.find('.media-card__actions .thumb-rating__btn--up').trigger('click');

    // ONE write per click — `@cycle` is bound, `@update:level` is NOT, so the
    // widget emitting BOTH does not double-write.
    expect(setLike).toHaveBeenCalledTimes(1);
    expect(setLike).toHaveBeenCalledWith('m1', 1, '/api-host');
  });

  it('clicking thumbs-down calls setLike(id, -1, apiBase)', async () => {
    const store = useUserItemDataStore();
    const setLike = vi.spyOn(store, 'setLike').mockResolvedValue(undefined);
    const w = mount(MediaCard, {
      props: { item: media() },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '/api-host' } } },
    });

    await w.find('.media-card__actions .thumb-rating__btn--down').trigger('click');

    expect(setLike).toHaveBeenCalledTimes(1);
    expect(setLike).toHaveBeenCalledWith('m1', -1, '/api-host');
  });

  it('thumb click stops propagation (never reaches the card / stretched info link)', async () => {
    const store = useUserItemDataStore();
    vi.spyOn(store, 'setLike').mockResolvedValue(undefined);
    const onCardClick = vi.fn();
    const w = mount(MediaCard, {
      props: { item: media() },
      attrs: { onClick: onCardClick },
    });
    await w.find('.media-card__actions .thumb-rating__btn--up').trigger('click');
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it('passes an empty apiBase when no phlixConfig is provided (standalone mount)', async () => {
    const store = useUserItemDataStore();
    const setLike = vi.spyOn(store, 'setLike').mockResolvedValue(undefined);
    const w = mount(MediaCard, { props: { item: media() } });
    await w.find('.media-card__actions .thumb-rating__btn--up').trigger('click');
    expect(setLike).toHaveBeenCalledWith('m1', 1, '');
  });
});

describe('MediaCard — prefetch on hover/focus (R6.1c)', () => {
  function lazyRouter(loader: () => Promise<unknown>): Router {
    return createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div/>' } },
        { path: '/app/player/:id', name: 'player', component: loader },
        { path: '/app/media/:id', name: 'media', component: loader },
      ],
    });
  }

  it('warms the destination route chunk on pointerenter', async () => {
    const loader = vi.fn(() => Promise.resolve({ default: { template: '<div/>' } }));
    const router = lazyRouter(loader);
    const w = mount(MediaCard, { props: { item: media() }, global: { plugins: [router] } });
    await router.isReady();
    expect(loader).not.toHaveBeenCalled(); // nothing warmed until hovered
    await w.find('.media-card').trigger('pointerenter');
    expect(loader).toHaveBeenCalledTimes(1); // default href is the info/detail route
  });

  it('warms the configured `to` route on focusin (keyboard)', async () => {
    const loader = vi.fn(() => Promise.resolve({ default: { template: '<div/>' } }));
    const router = lazyRouter(loader);
    const w = mount(MediaCard, {
      props: { item: media(), to: '/app/media/m1' },
      global: { plugins: [router] },
    });
    await router.isReady();
    await w.find('.media-card').trigger('focusin');
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('hovers safely with no router installed (prefetch no-ops)', async () => {
    const w = mount(MediaCard, { props: { item: media() } }); // no router plugin
    await w.find('.media-card').trigger('pointerenter'); // useRouter() undefined → no-op, no throw
    expect(w.find('.media-card').exists()).toBe(true);
  });
});
