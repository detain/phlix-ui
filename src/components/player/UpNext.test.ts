/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UpNext from './UpNext.vue';
import { ringDashoffset, UPNEXT_RING_CIRCUMFERENCE } from './playback';
import type { MediaItem } from '../../types/media-item';

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'br',
    name: 'Blade Runner 2049',
    type: 'movie',
    poster_url: 'https://img/br.jpg',
    genres: ['Sci-Fi'],
    year: 2017,
    rating: 'R',
    runtime: 164,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  };
}

describe('UpNext', () => {
  it('renders the eyebrow, next title, and poster thumb', () => {
    const w = mount(UpNext, { props: { media: media() } });
    expect(w.find('.upnext__eyebrow').text()).toBe('Up next');
    expect(w.find('.upnext__title').text()).toBe('Blade Runner 2049');
    expect(w.find('img.upnext__thumb').attributes('src')).toBe('https://img/br.jpg');
    expect(w.find('[role="region"]').attributes('aria-label')).toBe('Up next');
  });

  it('shows the countdown text + ring while counting, with a depleting dashoffset', () => {
    const w = mount(UpNext, { props: { media: media(), remaining: 4, total: 8, counting: true } });
    expect(w.find('.upnext__cd').text()).toBe('Starts in 4s');
    const ring = w.find('svg.upnext__ring');
    expect(ring.exists()).toBe(true);
    const arc = ring.findAll('circle')[1];
    expect(arc.attributes('stroke-dasharray')).toBe(String(UPNEXT_RING_CIRCUMFERENCE));
    expect(arc.attributes('stroke-dashoffset')).toBe(String(ringDashoffset(4, 8)));
  });

  it('never shows a negative "Starts in" value', () => {
    const w = mount(UpNext, { props: { media: media(), remaining: -2, total: 8, counting: true } });
    expect(w.find('.upnext__cd').text()).toBe('Starts in 0s');
  });

  it('is static (no ring, no countdown text) when not counting (autoplay off)', () => {
    const w = mount(UpNext, { props: { media: media(), counting: false } });
    expect(w.find('.upnext__cd').exists()).toBe(false);
    expect(w.find('svg.upnext__ring').exists()).toBe(false);
    // the actions remain so the user can still start it manually
    expect(w.find('.upnext__btn--amber').exists()).toBe(true);
  });

  it('emits play-now and cancel from the action buttons', async () => {
    const w = mount(UpNext, { props: { media: media(), counting: true } });
    await w.find('.upnext__btn--amber').trigger('click');
    await w.find('.upnext__btn--ghost').trigger('click');
    expect(w.emitted('play-now')).toHaveLength(1);
    expect(w.emitted('cancel')).toHaveLength(1);
  });

  it('prefers an explicit posterUrl over the media poster, and omits the img when neither exists', () => {
    const w = mount(UpNext, { props: { media: media(), posterUrl: 'https://img/override.jpg' } });
    expect(w.find('img.upnext__thumb').attributes('src')).toBe('https://img/override.jpg');

    const w2 = mount(UpNext, { props: { media: media({ poster_url: null }) } });
    expect(w2.find('img.upnext__thumb').exists()).toBe(false);
  });

  it('renders icons (no emoji glyphs)', () => {
    const w = mount(UpNext, { props: { media: media(), counting: true } });
    expect(w.find('.phlix-icon').exists()).toBe(true);
    expect(w.html()).not.toMatch(/[🎬▶❚🔊🔇⤢⤓←↑↓]/u);
  });
});
