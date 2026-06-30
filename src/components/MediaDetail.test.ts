import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import MediaDetail from './MediaDetail.vue';
import MediaRow from './MediaRow.vue';
import Chip from './ui/Chip.vue';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import type { MediaItem } from '../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: ['Sci-Fi', 'Adventure'],
    year: 2024,
    rating: 'PG-13',
    runtime: 166,
    overview: 'Paul unites with the Fremen.',
    actors: ['Timothée Chalamet', 'Zendaya'],
    director: 'Denis Villeneuve',
    created_at: null,
    updated_at: null,
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('MediaDetail — rendering', () => {
  it('renders title, meta, overview, genres, director and cast', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    expect(w.find('.media-detail__title').text()).toBe('Dune: Part Two');
    const meta = w.find('.media-detail__meta').text();
    expect(meta).toContain('2024');
    expect(meta).toContain('166m');
    expect(w.find('.media-detail__cert').text()).toBe('PG-13');
    expect(w.find('.media-detail__overview').text()).toBe('Paul unites with the Fremen.');
    // genre chips
    const chipTexts = w.findAllComponents(Chip).map((c) => c.text());
    expect(chipTexts).toContain('Sci-Fi');
    // cast + crew render as people (avatar layout)
    const people = w.findAll('.media-detail__person-name').map((n) => n.text());
    expect(people).toContain('Zendaya');
    expect(people).toContain('Denis Villeneuve');
  });

  it('emits `actor` with the name when a cast member is clicked', async () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const people = w.findAll('.media-detail__person');
    expect(people.length).toBeGreaterThan(0);
    // crew (Director) renders first, then cast — click the first cast person
    const names = w.findAll('.media-detail__person-name').map((n) => n.text());
    const idx = names.indexOf('Timothée Chalamet');
    expect(idx).toBeGreaterThanOrEqual(0);
    await people[idx].trigger('click');
    expect(w.emitted('actor')?.[0]).toEqual(['Timothée Chalamet']);
  });

  it('emits `genre` with the name when a genre chip is clicked', async () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const genreButtons = w.findAll('.media-detail__genre');
    expect(genreButtons.length).toBe(2);
    await genreButtons[0].trigger('click');
    expect(w.emitted('genre')?.[0]).toEqual(['Sci-Fi']);
  });

  it('emits `actor` with the person name when a crew member is clicked', async () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const names = w.findAll('.media-detail__person-name').map((n) => n.text());
    const idx = names.indexOf('Denis Villeneuve');
    expect(idx).toBeGreaterThanOrEqual(0);
    await w.findAll('.media-detail__person')[idx].trigger('click');
    expect(w.emitted('actor')?.[0]).toEqual(['Denis Villeneuve']);
  });

  it('renders the poster image with the title as alt', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const img = w.find('.media-detail__img');
    expect(img.attributes('src')).toBe('https://img/dune.jpg');
    expect(img.attributes('alt')).toBe('Dune: Part Two');
  });

  it('fades the poster in on the load event', async () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const img = w.find('.media-detail__img');
    expect(img.classes()).not.toContain('is-loaded');
    await img.trigger('load');
    expect(w.find('.media-detail__img').classes()).toContain('is-loaded');
  });

  it('treats an already-cached (complete) poster as loaded on mount', async () => {
    const spy = vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    const w = mount(MediaDetail, { props: { item: media() } });
    await nextTick();
    expect(w.find('.media-detail__img').classes()).toContain('is-loaded');
    spy.mockRestore();
  });
});

describe('MediaDetail — sparse metadata (degrades)', () => {
  it('shows an icon fallback when there is no poster', () => {
    const w = mount(MediaDetail, { props: { item: media({ poster_url: null }) } });
    expect(w.find('.media-detail__img').exists()).toBe(false);
    expect(w.find('.media-detail__fallback').exists()).toBe(true);
  });

  it('shows a fallback line when there is no overview', () => {
    const w = mount(MediaDetail, { props: { item: media({ overview: null }) } });
    expect(w.find('.media-detail__overview').text()).toBe('No overview available.');
  });

  it('omits genres / credits sections when absent', () => {
    const w = mount(MediaDetail, { props: { item: media({ genres: [], actors: [], director: null }) } });
    expect(w.find('.media-detail__genres').exists()).toBe(false);
    expect(w.find('.media-detail__credits').exists()).toBe(false);
  });

  it('does not render an ambient layer without a poster', () => {
    const w = mount(MediaDetail, { props: { item: media({ poster_url: null }) } });
    expect(w.find('.media-detail__ambient').exists()).toBe(false);
  });
});

describe('MediaDetail — rich cast / crew / companies', () => {
  it('renders a cast avatar img when profile_url is present and initials when null', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          actors: [],
          director: null,
          cast: [
            { name: 'Timothée Chalamet', role: 'Paul', profile_url: 'https://img/tc.jpg' },
            { name: 'Zendaya', role: 'Chani', profile_url: null },
          ],
        }),
      },
    });
    const imgs = w.findAll('.media-detail__avatar-img');
    expect(imgs).toHaveLength(1);
    expect(imgs[0].attributes('src')).toBe('https://img/tc.jpg');
    expect(imgs[0].attributes('loading')).toBe('lazy');
    // the photo-less person falls back to initials
    const initials = w.findAll('.media-detail__avatar-initials').map((n) => n.text());
    expect(initials).toContain('ZE'); // single-word name → first 1–2 letters
    // sub-label shows the character role
    const subs = w.findAll('.media-detail__person-sub').map((n) => n.text());
    expect(subs).toContain('Paul');
    expect(subs).toContain('Chani');
  });

  it('renders crew (incl. director) with job sub-labels from item.crew', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          director: null,
          crew: [
            { name: 'Denis Villeneuve', job: 'Director', profile_url: 'https://img/dv.jpg' },
            { name: 'Hans Zimmer', job: 'Composer', profile_url: null },
          ],
        }),
      },
    });
    const names = w.findAll('.media-detail__person-name').map((n) => n.text());
    expect(names).toContain('Denis Villeneuve');
    expect(names).toContain('Hans Zimmer');
    const subs = w.findAll('.media-detail__person-sub').map((n) => n.text());
    expect(subs).toContain('Director');
    expect(subs).toContain('Composer');
  });

  it('falls back to flat actors when cast objects are absent', () => {
    const w = mount(MediaDetail, { props: { item: media({ cast: undefined, actors: ['Florence Pugh'] }) } });
    const names = w.findAll('.media-detail__person-name').map((n) => n.text());
    expect(names).toContain('Florence Pugh');
    // no photos → initials fallback (FP → multi-word? single word → "FL")
    expect(w.findAll('.media-detail__avatar-img')).toHaveLength(0);
  });

  it('renders clickable company chips with logos and emits `company`', async () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          production_companies: [
            { name: 'Legendary', logo_url: 'https://img/leg.png', origin_country: 'US' },
            { name: 'Warner Bros', logo_url: null, origin_country: 'US' },
          ],
        }),
      },
    });
    const chips = w.findAll('.media-detail__company');
    expect(chips).toHaveLength(2);
    const logo = w.find('.media-detail__company-logo');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toBe('https://img/leg.png');
    await chips[0].trigger('click');
    expect(w.emitted('company')?.[0]).toEqual(['Legendary']);
  });

  it('falls back to a single studio chip when only item.studio is set', async () => {
    const w = mount(MediaDetail, {
      props: { item: media({ production_companies: undefined, studio: 'A24' }) },
    });
    const chips = w.findAll('.media-detail__company');
    expect(chips).toHaveLength(1);
    expect(chips[0].text()).toContain('A24');
    await chips[0].trigger('click');
    expect(w.emitted('company')?.[0]).toEqual(['A24']);
  });

  it('omits the studios section when no companies or studio', () => {
    const w = mount(MediaDetail, {
      props: { item: media({ production_companies: undefined, studio: null }) },
    });
    expect(w.find('.media-detail__companies').exists()).toBe(false);
  });
});

describe('MediaDetail — resume', () => {
  it('hides the Resume action when there is no resume position', () => {
    const w = mount(MediaDetail, { props: { item: media(), resumeSeconds: null } });
    expect(w.text()).not.toContain('Resume');
  });

  it('shows Resume with a formatted timecode (m:ss)', () => {
    const w = mount(MediaDetail, { props: { item: media(), resumeSeconds: 90 } });
    const resumeAt = w.find('.media-detail__resume-at');
    expect(resumeAt.exists()).toBe(true);
    expect(resumeAt.text()).toBe('1:30');
  });

  it('formats hours for long resume positions (h:mm:ss)', () => {
    const w = mount(MediaDetail, { props: { item: media(), resumeSeconds: 3700 } });
    expect(w.find('.media-detail__resume-at').text()).toBe('1:01:40');
  });
});

describe('MediaDetail — actions & similar', () => {
  it('emits play / resume / watchlist from the hero actions', async () => {
    const item = media();
    const w = mount(MediaDetail, { props: { item, resumeSeconds: 120 } });
    // The favorite/Watchlist button now toggles the store as part of `onFavorite`;
    // stub it so this generic emit test never hits the network.
    const store = useUserItemDataStore();
    vi.spyOn(store, 'toggleFavorite').mockResolvedValue();
    const buttons = w.findAll('.media-detail__actions button');
    await buttons[0].trigger('click'); // Play
    await buttons[1].trigger('click'); // Resume
    await buttons[2].trigger('click'); // Watchlist (favorite)
    expect(w.emitted('play')?.[0]).toEqual([item]);
    expect(w.emitted('resume')?.[0]).toEqual([item]);
    expect(w.emitted('watchlist')?.[0]).toEqual([item]);
  });

  describe('hero favorite button (Feature 17.4)', () => {
    function favButton(w: ReturnType<typeof mount>) {
      return w.find('.media-detail__favorite');
    }

    it('persists by toggling the store ONCE then re-emits watchlist (non-favorited → add)', async () => {
      const item = media({ id: 'm1' });
      const w = mount(MediaDetail, { props: { item } });
      const store = useUserItemDataStore();
      const toggle = vi.spyOn(store, 'toggleFavorite').mockResolvedValue();
      const btn = favButton(w);
      expect(btn.attributes('aria-pressed')).toBe('false');
      expect(btn.attributes('aria-label')).toBe('Add to favorites');
      await btn.trigger('click');
      // exactly one toggle + one persist, with the item id + injected apiBase ('' in test)
      expect(toggle).toHaveBeenCalledTimes(1);
      expect(toggle).toHaveBeenCalledWith('m1', '');
      // back-compat emit still fires for the host page's state-aware toast
      expect(w.emitted('watchlist')?.[0]).toEqual([item]);
    });

    it('reflects favorited state from the store (aria-pressed + active class + filled icon)', async () => {
      const store = useUserItemDataStore();
      store.hydrate(media({ id: 'm1', user_data: { favorite: true, rating: null } }));
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });
      const btn = favButton(w);
      expect(btn.attributes('aria-pressed')).toBe('true');
      expect(btn.attributes('aria-label')).toBe('Remove from favorites');
      expect(btn.classes()).toContain('is-active');
      expect(btn.text()).toContain('In favorites');
    });

    it('toggles exactly once per click on an already-favorited item (favorited → remove)', async () => {
      const store = useUserItemDataStore();
      store.hydrate(media({ id: 'm1', user_data: { favorite: true, rating: null } }));
      const toggle = vi.spyOn(store, 'toggleFavorite').mockResolvedValue();
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });
      await favButton(w).trigger('click');
      expect(toggle).toHaveBeenCalledTimes(1);
      expect(toggle).toHaveBeenCalledWith('m1', '');
      expect(w.emitted('watchlist')?.[0]).toEqual([media({ id: 'm1' })]);
    });

    it('aria-pressed flips after the optimistic store mutation', async () => {
      const item = media({ id: 'm1' });
      const w = mount(MediaDetail, { props: { item } });
      const store = useUserItemDataStore();
      // toggleFavorite flips synchronously (optimistic) before the network await;
      // stub the network half so no fetch is attempted but keep the optimistic flip.
      vi.spyOn(store, 'toggleFavorite').mockImplementation((id) => {
        store.hydrate(media({ id, user_data: { favorite: true, rating: null } }));
        return Promise.resolve();
      });
      const btn = favButton(w);
      expect(btn.attributes('aria-pressed')).toBe('false');
      await btn.trigger('click');
      await nextTick();
      expect(w.find('.media-detail__favorite').attributes('aria-pressed')).toBe('true');
    });
  });

  describe('hero Love button (Feature 10.6)', () => {
    function loveButton(w: ReturnType<typeof mount>) {
      return w.find('.media-detail__actions .love-button');
    }

    it('renders a LoveButton in the hero action cluster', () => {
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });
      expect(loveButton(w).exists()).toBe(true);
    });

    it('reflects the store like_level', () => {
      const store = useUserItemDataStore();
      store.entries.set('m1', { favorite: false, rating: null, like_level: 3 });
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });
      expect(loveButton(w).attributes('data-level')).toBe('3');
    });

    it('clicking Love calls cycleLove(id, apiBase) exactly ONCE per click (single PUT)', async () => {
      const store = useUserItemDataStore();
      const cycle = vi.spyOn(store, 'cycleLove').mockResolvedValue();
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });

      await loveButton(w).trigger('click');

      // `@cycle` is bound, `@update:level` is NOT → exactly one cycle/PUT per click.
      expect(cycle).toHaveBeenCalledTimes(1);
      expect(cycle).toHaveBeenCalledWith('m1', '');
    });
  });

  it('emits back from the back affordance, hidden when showBack=false', async () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    await w.find('.media-detail__bar button').trigger('click');
    expect(w.emitted('back')).toHaveLength(1);

    const w2 = mount(MediaDetail, { props: { item: media(), showBack: false } });
    expect(w2.find('.media-detail__bar button').exists()).toBe(false);
  });

  it('renders the "More like this" rail and forwards its card events', () => {
    const similar = [media({ id: 's1' }), media({ id: 's2' })];
    const w = mount(MediaDetail, { props: { item: media(), similar } });
    const row = w.findComponent(MediaRow);
    expect(row.exists()).toBe(true);
    expect(row.props('title')).toBe('More like this');
    row.vm.$emit('play', similar[0]);
    row.vm.$emit('watchlist', similar[1]);
    row.vm.$emit('info', similar[0]);
    expect(w.emitted('play')?.[0]).toEqual([similar[0]]);
    expect(w.emitted('watchlist')?.[0]).toEqual([similar[1]]);
    expect(w.emitted('info')?.[0]).toEqual([similar[0]]);
  });

  it('shows the similar rail while it is loading even with no items yet', () => {
    const w = mount(MediaDetail, { props: { item: media(), similar: [], similarLoading: true } });
    expect(w.findComponent(MediaRow).exists()).toBe(true);
  });
});
