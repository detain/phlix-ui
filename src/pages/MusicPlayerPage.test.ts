/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import MusicPlayerPage from './MusicPlayerPage.vue';
import type { MusicTrack } from '../types/music';

// The full-page player is a pure consumer of the shared useMusicPlayer store,
// so mock the composable and drive the page from a fake player instance.
const holder = vi.hoisted(() => ({ player: null as unknown }));
vi.mock('../composables/useMusicPlayer', () => ({
  useMusicPlayer: () => holder.player,
}));

function track(id: string, title: string): MusicTrack {
  return { id, title, durationSecs: 200, trackNumber: 1, streamUrl: null };
}

function makeFakePlayer(over: Record<string, unknown> = {}) {
  return {
    queue: ref<MusicTrack[]>([]),
    currentTrack: ref<MusicTrack | null>(null),
    currentIndex: ref(-1),
    playing: ref(false),
    position: ref(0),
    duration: ref(0),
    loading: ref(false),
    error: ref<string | null>(null),
    crossfading: ref(false),
    hasNext: ref(false),
    hasPrev: ref(false),
    loadTracks: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    toggle: vi.fn(),
    stop: vi.fn(),
    next: vi.fn(),
    previous: vi.fn(),
    seek: vi.fn(),
    dispose: vi.fn(),
    ...over,
  };
}

function mountPage(): VueWrapper {
  return mount(MusicPlayerPage, {
    global: {
      provide: { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

beforeEach(() => {
  holder.player = makeFakePlayer();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('MusicPlayerPage', () => {
  it('shows the empty-queue state and a select-track prompt when nothing is loaded', () => {
    const w = mountPage();
    expect(w.find('.player-queue__empty').exists()).toBe(true);
    expect(w.find('.player-track-name').text().length).toBeGreaterThan(0);
    w.unmount();
  });

  it('renders the now-playing track title and the queue list', () => {
    holder.player = makeFakePlayer({
      currentTrack: ref(track('t1', 'Karma Police')),
      currentIndex: ref(0),
      playing: ref(true),
      queue: ref([track('t1', 'Karma Police'), track('t2', 'No Surprises')]),
    });
    const w = mountPage();
    expect(w.find('.player-track-name').text()).toBe('Karma Police');
    const items = w.findAll('.queue-item');
    expect(items).toHaveLength(2);
    expect(items[0].classes()).toContain('is-current');
    expect(items[0].classes()).toContain('is-playing');
    w.unmount();
  });

  it('toggles playback via the primary transport button', async () => {
    const w = mountPage();
    await w.find('.control-btn--play').trigger('click');
    const player = holder.player as ReturnType<typeof makeFakePlayer>;
    expect(player.toggle).toHaveBeenCalledTimes(1);
    w.unmount();
  });

  it('drives next/previous through the player', async () => {
    holder.player = makeFakePlayer({ hasNext: ref(true), hasPrev: ref(true) });
    const w = mountPage();
    const player = holder.player as ReturnType<typeof makeFakePlayer>;

    // Controls order: shuffle, prev, play, next, repeat.
    const btns = w.findAll('.player-controls .control-btn');
    await btns[1].trigger('click');
    expect(player.previous).toHaveBeenCalledTimes(1);
    await btns[3].trigger('click');
    expect(player.next).toHaveBeenCalledTimes(1);
    w.unmount();
  });

  it('reflects the play/pause icon from the player playing state', () => {
    holder.player = makeFakePlayer({ playing: ref(true) });
    const w = mountPage();
    expect(w.find('.control-btn--play .icon').attributes('data-icon')).toBe('pause');
    w.unmount();
  });

  it('surfaces the stream error banner when the player reports an error', () => {
    holder.player = makeFakePlayer({ error: ref('stream-unavailable') });
    const w = mountPage();
    expect(w.find('.player-error').exists()).toBe(true);
    w.unmount();
  });

  it('shows the loading overlay while the player is loading', () => {
    holder.player = makeFakePlayer({ loading: ref(true) });
    const w = mountPage();
    expect(w.find('.player-loading').exists()).toBe(true);
    w.unmount();
  });
});
