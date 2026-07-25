/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
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
): VueWrapper {
  const w = mount(MusicAlbumCard, {
    props: { album: a },
    global: {
      provide: messages ? { phlixConfig: { messages } } : {},
      stubs: { Icon: { props: ['name'], template: '<i :data-icon="name" />' } },
    },
  });
  wrappers.push(w);
  return w;
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

  it('renders an em dash for a missing year', () => {
    const w = mountCard(album({ year: null }));
    expect(w.find('.album-card__year').text()).toBe('—');
  });
});
