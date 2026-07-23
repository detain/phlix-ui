/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, computed } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import MediaDetail from './MediaDetail.vue';
import MediaRow from './MediaRow.vue';
import Chip from './ui/Chip.vue';
import Button from './ui/Button.vue';
import IconButton from './ui/IconButton.vue';
import { useUserItemDataStore } from '../stores/useUserItemDataStore';
import { useAuthStore } from '../stores/useAuthStore';
import { MENU_LABELS } from './mediaItemMenu';
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

describe('MediaDetail — ⋯ menu metadata-match action (S02)', () => {
  it('the single "Match metadata" entry emits exactly one `refresh` with the item', async () => {
    // Admin gates the metadata-match menu item (buildMediaItemMenu reads auth.isAdmin).
    useAuthStore().user = { id: 'admin1', is_admin: true };
    const w = mount(MediaDetail, { props: { item: media() }, attachTo: document.body });

    // Open the ⋯ menu; the Menu teleports its list to <body>.
    await w.find('[aria-label="More actions"]').trigger('click');
    await nextTick();
    const items = Array.from(document.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const target = items.find((el) => el.textContent?.trim() === MENU_LABELS.matchMetadata);
    // exactly one such entry (the S02 collapse), and no retired labels
    expect(items.filter((el) => el.textContent?.trim() === MENU_LABELS.matchMetadata)).toHaveLength(1);
    expect(items.map((i) => i.textContent?.trim())).not.toContain('Refresh metadata');
    expect(items.map((i) => i.textContent?.trim())).not.toContain('Identify from beginning');
    expect(target, `present: ${items.map((i) => i.textContent?.trim()).join(', ')}`).toBeTruthy();

    target!.click();
    await nextTick();

    // The collapsed entry still emits `refresh` (host routes @match + @refresh → onMatch).
    expect(w.emitted('refresh')).toBeTruthy();
    expect(w.emitted('refresh')).toHaveLength(1);
    expect(w.emitted('refresh')?.[0]).toEqual([media()]);
    w.unmount();
  });
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
    const genreChips = w.findAll('.media-detail__genre');
    expect(genreChips.length).toBe(2);
    await genreChips[0].find('button').trigger('click');
    expect(w.emitted('genre')?.[0]).toEqual(['Sci-Fi']);
  });

  it('renders each genre chip as a single interactive control (no nested button)', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const genreChip = w.findAll('.media-detail__genre')[0];
    expect(genreChip.element.tagName).not.toBe('BUTTON');
    expect(genreChip.findAll('button').length).toBe(1);
    expect(genreChip.find('button').attributes('aria-label')).toBe('Show Sci-Fi titles');
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
    // S19: the ambient scrim shares the poster condition — no poster, no scrim.
    expect(w.find('.media-detail__ambient-scrim').exists()).toBe(false);
  });
});

describe('MediaDetail — ambient scrim (S19)', () => {
  it('pairs the poster-derived ambient with a sibling scrim for hero legibility', () => {
    // A title with a poster (so an ambient wash) but no backdrop image: the
    // ambient scrim is what keeps the hero text readable over a bright poster.
    const w = mount(MediaDetail, { props: { item: media({ backdrop_url: null }) } });
    expect(w.find('.media-detail__ambient').exists()).toBe(true);
    expect(w.find('.media-detail__ambient-scrim').exists()).toBe(true);
    // decorative overlay — hidden from assistive tech, like the backdrop scrim.
    expect(w.find('.media-detail__ambient-scrim').attributes('aria-hidden')).toBe('true');
  });
});

describe('MediaDetail — backdrop (U3)', () => {
  it('renders the fixed backdrop layer with a lazy img when backdrop_url is set', () => {
    const w = mount(MediaDetail, { props: { item: media({ backdrop_url: 'https://img/dune-backdrop.jpg' }) } });
    const backdrop = w.find('.media-detail__backdrop');
    expect(backdrop.exists()).toBe(true);
    const img = w.find('.media-detail__backdrop-img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://img/dune-backdrop.jpg');
    // lazy-loaded so it never blocks the content
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('decoding')).toBe('async');
    // decorative — empty alt + aria-hidden layer
    expect(img.attributes('alt')).toBe('');
    expect(backdrop.attributes('aria-hidden')).toBe('true');
    // a scrim overlay preserves foreground text contrast
    expect(w.find('.media-detail__backdrop-scrim').exists()).toBe(true);
  });

  it('prefers backdrop_url_large over backdrop_url for the full-bleed background', () => {
    const w = mount(MediaDetail, {
      props: { item: media({ backdrop_url: 'https://img/w500.jpg', backdrop_url_large: 'https://img/original.jpg' }) },
    });
    expect(w.find('.media-detail__backdrop-img').attributes('src')).toBe('https://img/original.jpg');
  });

  it('passes backdrop_srcset through to the img srcset when present', () => {
    const srcset = 'https://img/w780.jpg 780w, https://img/w1280.jpg 1280w, https://img/original.jpg';
    const w = mount(MediaDetail, {
      props: { item: media({ backdrop_url: 'https://img/w500.jpg', backdrop_srcset: srcset }) },
    });
    const img = w.find('.media-detail__backdrop-img');
    expect(img.attributes('srcset')).toBe(srcset);
    expect(img.attributes('sizes')).toBe('100vw');
  });

  it('omits the srcset attribute when backdrop_srcset is absent', () => {
    const w = mount(MediaDetail, { props: { item: media({ backdrop_url: 'https://img/w500.jpg' }) } });
    expect(w.find('.media-detail__backdrop-img').attributes('srcset')).toBeUndefined();
  });

  it('fades the backdrop in on the img load event', async () => {
    const w = mount(MediaDetail, { props: { item: media({ backdrop_url: 'https://img/b.jpg' }) } });
    const img = w.find('.media-detail__backdrop-img');
    expect(img.classes()).not.toContain('is-loaded');
    await img.trigger('load');
    expect(w.find('.media-detail__backdrop-img').classes()).toContain('is-loaded');
  });

  it('does not render the backdrop layer when the item has no backdrop', () => {
    const w = mount(MediaDetail, { props: { item: media({ backdrop_url: null, backdrop_url_large: null }) } });
    expect(w.find('.media-detail__backdrop').exists()).toBe(false);
    expect(w.find('.media-detail__backdrop-img').exists()).toBe(false);
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
    await chips[0].find('button').trigger('click');
    expect(w.emitted('company')?.[0]).toEqual(['Legendary']);
  });

  it('renders each company chip as a single interactive control (no nested button)', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          production_companies: [{ name: 'Legendary', logo_url: 'https://img/leg.png', origin_country: 'US' }],
        }),
      },
    });
    const chip = w.findAll('.media-detail__company')[0];
    expect(chip.element.tagName).not.toBe('BUTTON');
    expect(chip.findAll('button').length).toBe(1);
    expect(chip.find('button').attributes('aria-label')).toBe('Show Legendary titles');
  });

  it('falls back to a single studio chip when only item.studio is set', async () => {
    const w = mount(MediaDetail, {
      props: { item: media({ production_companies: undefined, studio: 'A24' }) },
    });
    const chips = w.findAll('.media-detail__company');
    expect(chips).toHaveLength(1);
    expect(chips[0].text()).toContain('A24');
    await chips[0].find('button').trigger('click');
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

describe('MediaDetail — hero button hierarchy (S18)', () => {
  /** The shared <Button> whose label text matches exactly. */
  function buttonByText(w: ReturnType<typeof mount>, text: string) {
    return w.findAllComponents(Button).find((b) => b.text().trim() === text);
  }

  it('Play is the sole solid (primary) action', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    expect(buttonByText(w, 'Play')?.props('variant')).toBe('solid');
    // no other hero Button is solid
    const solids = w
      .findAll('.media-detail__actions .phlix-btn--solid')
      .map((b) => b.text().trim());
    expect(solids).toEqual(['Play']);
  });

  it('Resume, Play Trailer and Match metadata are outline (secondary) actions', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({ trailer_url: 'https://youtu.be/abc', trailer_site: 'YouTube', trailer_key: 'abc' }),
        resumeSeconds: 90,
        canMatch: true,
      },
    });
    const resume = w.findAllComponents(Button).find((b) => b.text().trim().startsWith('Resume'));
    expect(resume?.props('variant')).toBe('outline');
    expect(buttonByText(w, 'Play Trailer')?.props('variant')).toBe('outline');
    expect(buttonByText(w, 'Match metadata')?.props('variant')).toBe('outline');
  });

  it('Watchlist and Watched are ghost (tertiary) actions', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const watchlist = w.findAllComponents(Button).find((b) => b.classes().includes('media-detail__favorite'));
    const watched = w.findAllComponents(Button).find((b) => b.classes().includes('media-detail__watched'));
    expect(watchlist?.props('variant')).toBe('ghost');
    expect(watched?.props('variant')).toBe('ghost');
  });

  it('the ⋯ menu trigger is a shared ghost IconButton (not a raw <button>)', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    const trigger = w.findAllComponents(IconButton).find((b) => b.props('label') === 'More actions');
    expect(trigger, 'menu trigger renders <IconButton>').toBeTruthy();
    expect(trigger?.props('variant')).toBe('ghost');
    // still carries the popup semantics for a11y
    expect(trigger?.attributes('aria-haspopup')).toBe('menu');
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

  describe('hero ThumbRating (thumbs up/down)', () => {
    function thumbRating(w: ReturnType<typeof mount>) {
      return w.find('.media-detail__actions .thumb-rating');
    }

    it('renders a ThumbRating in the hero action cluster', () => {
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });
      expect(thumbRating(w).exists()).toBe(true);
    });

    it('reflects the store like_level', () => {
      const store = useUserItemDataStore();
      store.entries.set('m1', { favorite: false, rating: null, like_level: 2, watched: false });
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });
      expect(thumbRating(w).attributes('data-level')).toBe('2');
    });

    it('clicking thumbs-up calls setLike(id, 1, apiBase) exactly ONCE per click (single PUT)', async () => {
      const store = useUserItemDataStore();
      const setLike = vi.spyOn(store, 'setLike').mockResolvedValue();
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });

      await w.find('.media-detail__actions .thumb-rating__btn--up').trigger('click');

      // `@cycle` is bound, `@update:level` is NOT → exactly one write/PUT per click.
      expect(setLike).toHaveBeenCalledTimes(1);
      expect(setLike).toHaveBeenCalledWith('m1', 1, '');
    });

    it('clicking thumbs-down calls setLike(id, -1, apiBase)', async () => {
      const store = useUserItemDataStore();
      const setLike = vi.spyOn(store, 'setLike').mockResolvedValue();
      const w = mount(MediaDetail, { props: { item: media({ id: 'm1' }) } });

      await w.find('.media-detail__actions .thumb-rating__btn--down').trigger('click');

      expect(setLike).toHaveBeenCalledTimes(1);
      expect(setLike).toHaveBeenCalledWith('m1', -1, '');
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

describe('MediaDetail — provider links', () => {
  it('renders outbound links for each matched provider with correct URLs', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          type: 'movie',
          external_ids: { tmdb: '693134', imdb: 'tt15239678', tvdb: '', anidb: '17835' },
        }),
      },
    });
    const links = w.findAll('.media-detail__link');
    const byText = new Map(links.map((a) => [a.text().trim(), a.attributes('href')]));
    // tvdb is empty → no link; tmdb (movie), imdb, anidb render.
    expect(byText.has('TheTVDB')).toBe(false);
    expect(byText.get('TMDB')).toBe('https://www.themoviedb.org/movie/693134');
    expect(byText.get('IMDb')).toBe('https://www.imdb.com/title/tt15239678/');
    expect(byText.get('AniDB')).toBe('https://anidb.net/anime/17835');
    // outbound links open in a new tab, safely
    expect(links[0].attributes('target')).toBe('_blank');
    expect(links[0].attributes('rel')).toContain('noopener');
  });

  it('uses the /tv/ TMDB path for series items', () => {
    const w = mount(MediaDetail, { props: { item: media({ type: 'series', external_ids: { tmdb: '1396' } }) } });
    expect(w.find('.media-detail__link').attributes('href')).toBe('https://www.themoviedb.org/tv/1396');
  });

  it('renders no Links section when there are no external ids', () => {
    expect(mount(MediaDetail, { props: { item: media() } }).find('.media-detail__links').exists()).toBe(false);
    expect(
      mount(MediaDetail, { props: { item: media({ external_ids: {} }) } }).find('.media-detail__links').exists(),
    ).toBe(false);
  });
});

describe('MediaDetail — watched (eye) button', () => {
  it('toggles watched via the store and emits mark-watched, with label + icon reflecting state', async () => {
    const store = useUserItemDataStore();
    const toggle = vi.spyOn(store, 'toggleWatched').mockResolvedValue(undefined);
    const w = mount(MediaDetail, {
      props: { item: media() },
      global: { provide: { phlixConfig: { app: 'server', apiBase: '/api-host' } } },
    });
    const btn = w.find('[aria-label="Mark as watched"]');
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toContain('Mark watched');
    await btn.trigger('click');
    expect(toggle).toHaveBeenCalledWith('m1', '/api-host');
    expect(w.emitted('mark-watched')).toHaveLength(1);

    store.entries.set('m1', { favorite: false, rating: null, like_level: 0, watched: true });
    await nextTick();
    const on = w.find('[aria-label="Mark as unwatched"]');
    expect(on.exists()).toBe(true);
    expect(on.text()).toContain('Watched');
  });
});

describe('MediaDetail — theme music (U4)', () => {
  const THEME_URL = 'https://media.example.com/api/v1/media/m1/theme-audio?sig=abc';

  beforeEach(() => {
    // JSDOM's HTMLMediaElement has no real playback; stub play/pause/load so the
    // control logic runs without "Not implemented" noise or rejections.
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined as unknown as void);
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  });

  it('renders NOTHING (no control, no audio) when there is no theme_audio_url', () => {
    const w = mount(MediaDetail, { props: { item: media({ theme_audio_url: undefined }) } });
    expect(w.find('audio').exists()).toBe(false);
    expect(w.find('.media-detail__theme').exists()).toBe(false);
  });

  it('renders a looping, inert audio element and a mute/stop control when a theme is present', () => {
    const w = mount(MediaDetail, { props: { item: media({ theme_audio_url: THEME_URL }) } });
    const audio = w.find('audio');
    expect(audio.exists()).toBe(true);
    expect(audio.attributes('src')).toBe(THEME_URL); // absolute URL passes through
    expect(audio.attributes('loop')).not.toBe(undefined);
    expect(audio.attributes('aria-hidden')).toBe('true');
    expect(audio.attributes('tabindex')).toBe('-1');
    // control: mute toggle has an aria-label; a stop button tears it down
    expect(w.find('[aria-label="Unmute theme music"]').exists()).toBe(true);
    expect(w.find('[aria-label="Stop theme music"]').exists()).toBe(true);
  });

  it('renders the mute + stop controls as shared ghost IconButtons (not raw <button>)', () => {
    const w = mount(MediaDetail, { props: { item: media({ theme_audio_url: THEME_URL }) } });
    const mute = w.findAllComponents(IconButton).find((b) => b.props('label') === 'Unmute theme music');
    const stop = w.findAllComponents(IconButton).find((b) => b.props('label') === 'Stop theme music');
    expect(mute, 'mute toggle renders <IconButton>').toBeTruthy();
    expect(stop, 'stop control renders <IconButton>').toBeTruthy();
    expect(mute?.props('variant')).toBe('ghost');
    expect(stop?.props('variant')).toBe('ghost');
    // the mute toggle stays a real toggle (aria-pressed via the pressed prop)
    expect(mute?.attributes('aria-pressed')).toBe('false');
  });

  it('starts muted by default (autoplay policy) with an aria-pressed=false toggle', () => {
    const w = mount(MediaDetail, { props: { item: media({ theme_audio_url: THEME_URL }) } });
    const toggle = w.find('.media-detail__theme-btn');
    expect(toggle.attributes('aria-pressed')).toBe('false');
    expect(toggle.attributes('aria-label')).toBe('Unmute theme music');
  });

  it('persists the mute preference to localStorage and reflects it across mounts', async () => {
    const w = mount(MediaDetail, { props: { item: media({ theme_audio_url: THEME_URL }) } });
    // unmute → persists "false", raises gentle volume, aria updates
    await w.find('.media-detail__theme-btn').trigger('click');
    expect(localStorage.getItem('phlix.theme.muted')).toBe('false');
    expect(w.find('.media-detail__theme-btn').attributes('aria-label')).toBe('Mute theme music');
    expect(w.find('.media-detail__theme-btn').attributes('aria-pressed')).toBe('true');

    // a fresh mount remembers the unmuted preference
    const w2 = mount(MediaDetail, { props: { item: media({ theme_audio_url: THEME_URL }) } });
    expect(w2.find('.media-detail__theme-btn').attributes('aria-pressed')).toBe('true');
  });

  it('stops + hides the control when the stop button is clicked', async () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const w = mount(MediaDetail, { props: { item: media({ theme_audio_url: THEME_URL }) } });
    await w.find('[aria-label="Stop theme music"]').trigger('click');
    expect(pause).toHaveBeenCalled();
    expect(w.find('.media-detail__theme').exists()).toBe(false);
  });

  it('resolves a relative theme_audio_url against the media base', () => {
    const w = mount(MediaDetail, {
      props: { item: media({ theme_audio_url: '/api/v1/media/m1/theme-audio?sig=abc' }) },
      global: { provide: { mediaApiBase: computed(() => 'https://server.test') } },
    });
    expect(w.find('audio').attributes('src')).toBe('https://server.test/api/v1/media/m1/theme-audio?sig=abc');
  });

  it('tears down the audio on unmount so themes never leak between items', async () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const host = document.createElement('div');
    document.body.appendChild(host);
    const w = mount(MediaDetail, {
      props: { item: media({ theme_audio_url: THEME_URL }) },
      attachTo: host,
    });
    expect(document.querySelector('.media-detail__theme-audio')).not.toBeNull();
    w.unmount();
    await nextTick();
    expect(pause).toHaveBeenCalled();
    expect(document.querySelector('.media-detail__theme-audio')).toBeNull();
    host.remove();
  });

  it('re-arms the theme when navigating to a different item (id/url change)', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play');
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const w = mount(MediaDetail, { props: { item: media({ id: 'm1', theme_audio_url: THEME_URL }) } });
    play.mockClear();
    pause.mockClear();
    await w.setProps({
      item: media({ id: 'm2', theme_audio_url: 'https://media.example.com/api/v1/media/m2/theme-audio?sig=xyz' }),
    });
    await nextTick();
    expect(pause).toHaveBeenCalled(); // old theme stopped
    expect(play).toHaveBeenCalled(); // new theme started
  });
});

describe('cast/crew card sizing', () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  function getSfcCss(): string {
    const path = resolve(__dirname, './MediaDetail.vue');
    const content = readFileSync(path, 'utf8');
    const match = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    return match ? match[1] : '';
  }

  function cssRuleExists(selector: string, property: string, value: string): boolean {
    const css = getSfcCss();
    const propRe = new RegExp(selectorReplacement(selector) + '[\\s\\S]*?' + property + ':\\s*' + escapeRe(value));
    return propRe.test(css);
  }

  function escapeRe(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function selectorReplacement(selector: string): string {
    return selector.replace('.', '\\.');
  }

  it('renders cast/crew as poster-shaped (2:3) card tiles like the listings', () => {
    mount(MediaDetail, { props: { item: media() } });
    expect(cssRuleExists('.media-detail__avatar', 'aspect-ratio', '2 / 3')).toBe(true);
    expect(cssRuleExists('.media-detail__avatar', 'width', '100%')).toBe(true);
  });

  it('lays cast/crew out in a poster-card grid (matching the library card size)', () => {
    mount(MediaDetail, { props: { item: media() } });
    expect(
      cssRuleExists('.media-detail__people', 'grid-template-columns', 'repeat(auto-fill, minmax(140px, 1fr))'),
    ).toBe(true);
    expect(cssRuleExists('.media-detail__person', 'width', '100%')).toBe(true);
  });
});

describe('MediaDetail — files', () => {
  it('renders a Files section when item.files is present and non-empty', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          files: [{ path: '/data/movies/dune.mp4', size_bytes: 25600000000, container: 'mp4', codec: 'h264', resolution: '1920x1080' }],
        }),
      },
    });
    expect(w.find('.media-detail__files').exists()).toBe(true);
    expect(w.find('.media-detail__files-heading').text()).toBe('Files');
  });

  it('does not render a Files section when item.files is absent', () => {
    const w = mount(MediaDetail, { props: { item: media() } });
    expect(w.find('.media-detail__files').exists()).toBe(false);
  });

  it('does not render a Files section when item.files is empty', () => {
    const w = mount(MediaDetail, { props: { item: media({ files: [] }) } });
    expect(w.find('.media-detail__files').exists()).toBe(false);
  });

  it('shows the file path and formatted size', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          files: [{ path: '/data/movies/dune.mp4', size_bytes: 25600000000, container: 'mp4', codec: 'h264', resolution: '1920x1080' }],
        }),
      },
    });
    expect(w.find('.media-detail__file-path').text()).toBe('/data/movies/dune.mp4');
    expect(w.find('.media-detail__file-size').text()).toBe('23.8 GB');
  });

  it('shows container and resolution when present', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          files: [{ path: '/data/movies/dune.mkv', size_bytes: 5000000000, container: 'mkv', codec: 'h265', resolution: '3840x2160' }],
        }),
      },
    });
    expect(w.find('.media-detail__file-container').text()).toBe('mkv');
    expect(w.find('.media-detail__file-resolution').text()).toBe('3840x2160');
    expect(w.find('.media-detail__file-size').text()).toBe('4.7 GB');
  });

  it('renders multiple files in the list', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          files: [
            { path: '/data/movies/dune.mp4', size_bytes: 25600000000, container: 'mp4', codec: 'h264', resolution: '1920x1080' },
            { path: '/data/movies/dune.en.srt', size_bytes: 50000, container: null, codec: null, resolution: null },
          ],
        }),
      },
    });
    const files = w.findAll('.media-detail__file');
    expect(files).toHaveLength(2);
    expect(files[0].find('.media-detail__file-path').text()).toBe('/data/movies/dune.mp4');
    expect(files[1].find('.media-detail__file-path').text()).toBe('/data/movies/dune.en.srt');
    expect(files[1].find('.media-detail__file-size').text()).toBe('48.8 KB');
  });

  it('omits container and resolution chips when null', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({
          files: [{ path: '/data/movies/dune.txt', size_bytes: 1000, container: null, codec: null, resolution: null }],
        }),
      },
    });
    expect(w.find('.media-detail__file-container').exists()).toBe(false);
    expect(w.find('.media-detail__file-resolution').exists()).toBe(false);
    expect(w.find('.media-detail__file-size').text()).toBe('1 KB');
  });
});

describe('MediaDetail — Play Trailer', () => {
  it('shows the Play Trailer button when trailer_url is present', () => {
    const w = mount(MediaDetail, {
      props: {
        item: media({ trailer_url: 'https://youtu.be/abc123', trailer_site: 'YouTube', trailer_key: 'abc123' }),
      },
    });
    const btn = w.find('.media-detail__trailer-btn');
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toContain('Play Trailer');
  });

  it('hides the Play Trailer button when there is no trailer_url', () => {
    const w = mount(MediaDetail, { props: { item: media({ trailer_url: null }) } });
    expect(w.find('.media-detail__trailer-btn').exists()).toBe(false);
  });

  it('opens an in-app modal with a correct YouTube embed src for a valid key', async () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const w = mount(MediaDetail, {
      props: {
        item: media({ trailer_url: 'https://youtu.be/dQw4w9WgXcQ', trailer_site: 'YouTube', trailer_key: 'dQw4w9WgXcQ' }),
      },
      attachTo: host,
    });
    // No modal / iframe until the button is clicked.
    expect(document.querySelector('.media-detail__trailer-iframe')).toBeNull();
    await w.find('.media-detail__trailer-btn').trigger('click');
    await nextTick();
    const iframe = document.querySelector<HTMLIFrameElement>('.media-detail__trailer-iframe');
    expect(iframe).not.toBeNull();
    expect(iframe!.getAttribute('src')).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    w.unmount();
    host.remove();
  });

  it('rejects a bad trailer_key and falls back to opening the URL in a new tab', async () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const host = document.createElement('div');
    document.body.appendChild(host);
    const w = mount(MediaDetail, {
      props: {
        item: media({
          trailer_url: 'https://example.com/trailer',
          trailer_site: 'YouTube',
          // Contains characters outside /^[A-Za-z0-9_-]{1,20}$/ — must be rejected.
          trailer_key: 'evil"/><script>',
        }),
      },
      attachTo: host,
    });
    await w.find('.media-detail__trailer-btn').trigger('click');
    await nextTick();
    // No embed built for a bad key; opened the raw URL safely instead.
    expect(document.querySelector('.media-detail__trailer-iframe')).toBeNull();
    expect(openSpy).toHaveBeenCalledWith('https://example.com/trailer', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
    w.unmount();
    host.remove();
  });

  it('opens a non-YouTube trailer in a new tab (no embed modal)', async () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const w = mount(MediaDetail, {
      props: { item: media({ trailer_url: 'https://vimeo.com/12345', trailer_site: 'Vimeo', trailer_key: '12345' }) },
    });
    await w.find('.media-detail__trailer-btn').trigger('click');
    expect(document.querySelector('.media-detail__trailer-iframe')).toBeNull();
    expect(openSpy).toHaveBeenCalledWith('https://vimeo.com/12345', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });
});

describe('MediaDetail — title logo overlay', () => {
  it('renders the logo image in place of the text title when logo_url is present', () => {
    const w = mount(MediaDetail, {
      props: { item: media({ logo_url: 'https://img/logo.png' }) },
    });
    const logo = w.find('.media-detail__logo');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toBe('https://img/logo.png');
    expect(logo.attributes('alt')).toBe('Dune: Part Two');
    // The plain text <h1> title is not rendered while the logo is shown.
    expect(w.find('.media-detail__title').exists()).toBe(false);
  });

  it('renders a remote SVG logo via a plain img', () => {
    const w = mount(MediaDetail, {
      props: { item: media({ logo_url: 'https://image.tmdb.org/t/p/original/logo.svg' }) },
    });
    expect(w.find('.media-detail__logo').attributes('src')).toBe('https://image.tmdb.org/t/p/original/logo.svg');
  });

  it('falls back to the text title when logo_url is absent', () => {
    const w = mount(MediaDetail, { props: { item: media({ logo_url: null }) } });
    expect(w.find('.media-detail__logo').exists()).toBe(false);
    expect(w.find('.media-detail__title').text()).toBe('Dune: Part Two');
  });

  it('falls back to the text title when the logo image fails to load', async () => {
    const w = mount(MediaDetail, {
      props: { item: media({ logo_url: 'https://img/broken.png' }) },
    });
    expect(w.find('.media-detail__logo').exists()).toBe(true);
    await w.find('.media-detail__logo').trigger('error');
    await nextTick();
    expect(w.find('.media-detail__logo').exists()).toBe(false);
    expect(w.find('.media-detail__title').text()).toBe('Dune: Part Two');
  });
});
