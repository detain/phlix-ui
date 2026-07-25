/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import MusicArtistCard from './MusicArtistCard.vue';
import type { MusicArtist } from '../types/music';

const wrappers: VueWrapper[] = [];

function artist(over: Partial<MusicArtist> = {}): MusicArtist {
  return { id: 'Radiohead', name: 'Radiohead', imageUrl: null, albumCount: 9, ...over };
}

function mountCard(
  a: MusicArtist,
  messages?: Record<string, Record<string, string>>,
): VueWrapper {
  const w = mount(MusicArtistCard, {
    props: { artist: a },
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

// The album count used to be `album{{ n !== 1 ? 's' : '' }}` inlined in the template
// — untranslatable and unformatted. It is the same defect as three other music
// surfaces carried, in a syntactic form that a grep for `=== 1 ? '…'` does not find.
describe('MusicArtistCard album count', () => {
  it('renders the plural form through the i18n catalog', () => {
    const w = mountCard(artist({ albumCount: 9 }));
    expect(w.find('[data-count="albums"]').text()).toBe('9 albums');
  });

  it('renders the singular form for exactly one album', () => {
    const w = mountCard(artist({ albumCount: 1 }));
    expect(w.find('[data-count="albums"]').text()).toBe('1 album');
    expect(w.find('[data-count="albums"]').text()).not.toBe('1 albums');
  });

  it('formats thousands with separators', () => {
    const w = mountCard(artist({ albumCount: 2197 }));
    expect(w.find('[data-count="albums"]').text()).toBe('2,197 albums');
  });

  it('renders zero as a plural', () => {
    const w = mountCard(artist({ albumCount: 0 }));
    expect(w.find('[data-count="albums"]').text()).toBe('0 albums');
  });

  it('omits the count entirely when the server sent none', () => {
    const w = mountCard(artist({ albumCount: undefined }));
    expect(w.find('[data-count="albums"]').exists()).toBe(false);
  });

  it('honours a consumer message override — impossible with the old hardcoded string', () => {
    const w = mountCard(artist({ albumCount: 9 }), { music: { albumsTotal: '{count} Alben' } });
    expect(w.find('[data-count="albums"]').text()).toBe('9 Alben');
  });

  it('still emits click with the artist', async () => {
    const a = artist();
    const w = mountCard(a);
    await w.find('button').trigger('click');
    expect(w.emitted('click')).toEqual([[a]]);
  });
});
