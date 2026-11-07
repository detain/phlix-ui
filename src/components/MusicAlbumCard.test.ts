/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import MusicAlbumCard from './MusicAlbumCard.vue';
import type { MusicAlbum } from '../types/music';

const wrappers: VueWrapper[] = [];

function album(over: Partial<MusicAlbum> = {}): MusicAlbum {
  return {
    id: 'OK Computer',
    title: 'OK Computer',
    artist: 'Radiohead',
    albumArtUrl: null,
    year: 1997,
    totalTracks: 12,
    ...over,
  };
}

function mountCard(
  a: MusicAlbum,
  messages?: Record<string, Record<string, string>>,
  extra: { to?: Record<string, unknown>; withRouter?: boolean } = {},
): VueWrapper {
  const plugins = extra.withRouter ? [makeTestRouter()] : [];
  const w = mount(MusicAlbumCard, {
    props: { album: a, ...(extra.to ? { to: extra.to } : {}) },
    global: {
      plugins,
      provide: messages ? { phlixConfig: { messages } } : {},
      stubs: { Icon: { props: ['name'], template: '<i :data-icon="name" />' } },
    },
  });
  wrappers.push(w);
  return w;
}

function makeTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/album/:id', name: 'album', component: { template: '<div />' } },
    ],
  });
}

afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
});

// Same defect as MusicArtistCard's: `track{{ n !== 1 ? 's' : '' }}` inlined in the
// template — untranslatable, unformatted, and invisible to a grep for `=== 1 ? '…'`.
describe('MusicAlbumCard track count', () => {
  it('renders the plural form through the i18n catalog', () => {
    const w = mountCard(album({ totalTracks: 12 }));
    expect(w.find('[data-count="tracks"]').text()).toBe('12 tracks');
  });

  it('renders the singular form for exactly one track', () => {
    const w = mountCard(album({ totalTracks: 1 }));
    expect(w.find('[data-count="tracks"]').text()).toBe('1 track');
    expect(w.find('[data-count="tracks"]').text()).not.toBe('1 tracks');
  });

  it('formats thousands with separators', () => {
    const w = mountCard(album({ totalTracks: 29245 }));
    expect(w.find('[data-count="tracks"]').text()).toBe('29,245 tracks');
  });

  it('renders zero as a plural', () => {
    const w = mountCard(album({ totalTracks: 0 }));
    expect(w.find('[data-count="tracks"]').text()).toBe('0 tracks');
  });

  it('honours a consumer message override', () => {
    const w = mountCard(album({ totalTracks: 12 }), { music: { tracksTotal: '{count} Titel' } });
    expect(w.find('[data-count="tracks"]').text()).toBe('12 Titel');
  });

  it('still renders the year and emits click with the album', async () => {
    const a = album({ year: 1997 });
    const w = mountCard(a);
    expect(w.find('.album-card__year').text()).toBe('1997');
    await w.find('button').trigger('click');
    expect(w.emitted('click')).toEqual([[a]]);
  });

  // CU-115 (review ui__webux): a card WITH a route must carry a real URL.
  it('renders a stretched anchor overlay when given `to` inside a router', async () => {
    const router = makeTestRouter();
    const w = mount(MusicAlbumCard, {
      props: { album: album({ id: 'ok-computer' }), to: { name: 'album', params: { id: 'ok-computer' } } },
      global: {
        plugins: [router],
        provide: {},
        stubs: { Icon: { props: ['name'], template: '<i :data-icon="name" />' } },
      },
    });
    wrappers.push(w);
    const link = w.find('a.album-card__link');
    expect(link.exists(), 'anchor overlay').toBe(true);
    expect(link.attributes('href')).toBe('/album/ok-computer');
    expect(w.find('button').exists(), 'no button in anchor mode').toBe(false);
    await link.trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.name).toBe('album');
  });

  it('stays an honest button when there is no destination (in-page select hosts)', () => {
    // Inside a router but WITHOUT `to` — MusicLibraryPage's case: selecting an
    // album switches a view, it is not a route; fabricating an href would lie.
    const a = album();
    const w = mountCard(a, undefined, { withRouter: true });
    expect(w.find('button.album-card__link').exists()).toBe(true);
    expect(w.find('a.album-card__link').exists()).toBe(false);
    void w.find('button').trigger('click');
    expect(w.emitted('click')).toEqual([[a]]);
  });

  it('renders an em dash for a missing year', () => {
    const w = mountCard(album({ year: null }));
    expect(w.find('.album-card__year').text()).toBe('—');
  });

  // `v-if="album.albumArtUrl"` / `v-else` (MusicAlbumCard.vue:45-54). Every fixture in
  // this file's history passed `albumArtUrl: null`, so in 214 test files the `<img>` arm
  // had never rendered once: the placeholder half was covered only as a side effect and
  // the cover half not at all. BOTH arms are asserted here, and the cover URL is a value
  // the falsy arm cannot produce (it renders no `<img>` at all), so neither assertion can
  // pass for the other arm's reason. The default fixture stays `albumArtUrl: null`, so
  // every pre-existing test still exercises the placeholder arm as it always did.
  it('renders the cover when the album has art, and the placeholder when it does not', () => {
    const withArt = mountCard(album({ albumArtUrl: '/artwork/album/ok-computer.jpg' }));
    const cover = withArt.find('img.album-card__cover');
    expect(cover.exists(), 'an album WITH art must render an <img>').toBe(true);
    expect(cover.attributes('src')).toBe('/artwork/album/ok-computer.jpg');
    expect(cover.attributes('alt')).toBe('OK Computer');
    expect(cover.attributes('loading'), 'covers below the fold must stay lazy').toBe('lazy');
    expect(
      withArt.find('.album-card__placeholder').exists(),
      'an album WITH art must not ALSO carry the placeholder',
    ).toBe(false);

    const noArt = mountCard(album({ albumArtUrl: null }));
    expect(
      noArt.find('.album-card__placeholder').exists(),
      'an album with NO art must fall back to the placeholder',
    ).toBe(true);
    expect(
      noArt.find('.album-card__placeholder [data-icon="image"]').exists(),
      'the placeholder really is the icon block, not an empty div',
    ).toBe(true);
    expect(noArt.find('img.album-card__cover').exists()).toBe(false);
  });
});
