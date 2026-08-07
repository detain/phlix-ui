/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import Player from '../components/Player.vue';
import SubtitleSearch from '../components/player/SubtitleSearch.vue';
import type { MediaItem } from '../types/media-item';
import type { SubtitleTrack } from '../components/player/transcode';
import * as hlsTranscodeMod from '../composables/useHlsTranscode';

/**
 * S242 acceptance — a relayed WebVTT `<track>` forms a URL the relay serves.
 *
 * Mounts the REAL `Player.vue` and reads the `src` attribute the browser would
 * fetch off the rendered `<track>` element. Never asserts that a helper was
 * called: a no-op resolver fails the direct-play and on-demand cases, and a
 * resolver applied to ALL THREE sources fails the transcode CONTROL.
 *
 * The three sources, and why they differ (each verified in code, 2026-08-06):
 *
 *  (a) TRANSCODE `tc.subtitleTracks` — ALREADY based. `useHlsTranscode.ts:211`
 *      maps every sidecar through `resolveStreamUrl(opts.apiBase(), url)` with
 *      the very base this component is handed. Re-prefixing doubles it.
 *  (b) DIRECT PLAY `props.playbackSubtitleTracks` — root-relative + signed,
 *      straight off playback-info (`PlayerPage.vue:428`
 *      `parseSubtitleTracks(info?.subtitle_tracks)`; server side
 *      `StreamTrackShaper::subtitleTracks()` → `SignedUrl::mint()`), resolved
 *      NOWHERE upstream. This is the defect.
 *  (c) ON-DEMAND `downloadedSubtitleTracks` — the download response is shaped by
 *      the SAME server helper as (b) (`SubtitleFetchService::attachedTrack()`),
 *      so it is root-relative for the same reason.
 *
 * The relayed URL these assert —
 *   `/api/v1/servers/srv-7/proxy/api/v1/media/m1/subtitles/0?exp=…&sig=…`
 * — is a path phlix-hub's `ServerProxyController` forwards today: `/api/v1/media`
 * is a GET prefix in `BROWSE_SCOPE_ALLOWLIST`, and only
 * `POST …/subtitles/download` is pinned in `SCOPE_DENY_PATTERNS`. No hub change
 * was needed and none was made.
 */

// The real useHlsTranscode hits the network + hls.js; mock it so the transcode
// path's track list can be driven by hand (same technique as Player.test.ts).
vi.mock('../composables/useHlsTranscode', async () => {
  const { ref } = await import('vue');
  const ctrl = {
    state: ref('idle'),
    progress: ref(0),
    subtitleTracks: ref<unknown[]>([]),
    levels: ref<unknown[]>([]),
    currentLevel: ref(-1),
    autoEnabled: ref(true),
    activeLevelHeight: ref<number | null>(null),
    variants: ref<unknown[] | null>(null),
    audioTracks: ref<unknown[]>([]),
    currentAudioTrack: ref(-1),
    setLevel: vi.fn(),
    setNextLevel: vi.fn(),
    setAudioTrack: vi.fn(),
    loadVariantPlaylist: vi.fn(),
    start: vi.fn(),
    cleanup: vi.fn(),
    reset: vi.fn(),
  };
  return { useHlsTranscode: () => ctrl, __ctrl: ctrl };
});

/** The relay-proxy base `useMediaApiBase()` yields on the hub for server srv-7. */
const RELAY = '/api/v1/servers/srv-7/proxy';
/** An embedded text track exactly as the server mints it: root-relative + signed. */
const SIGNED = '/api/v1/media/m1/subtitles/0?exp=1785000000&sig=deadbeefcafe';
/** A downloaded sidecar, addressed by media_streams row id. */
const SIGNED_EXTERNAL = '/api/v1/media/m1/subtitles/external/st-9?exp=1785000000&sig=abc123';

interface MockCtrl {
  state: { value: string };
  subtitleTracks: { value: SubtitleTrack[] };
}
function tc(): MockCtrl {
  return (hlsTranscodeMod as unknown as { __ctrl: MockCtrl }).__ctrl;
}

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: 'https://img/dune.jpg',
    genres: [],
    year: 2024,
    rating: null,
    runtime: null,
    overview: null,
    actors: [],
    director: null,
    created_at: null,
    updated_at: null,
    ...over,
  } as MediaItem;
}

function subtitle(over: Partial<SubtitleTrack> = {}): SubtitleTrack {
  return { index: 0, language: 'eng', label: 'English', default: false, url: SIGNED, ...over };
}

const wrappers: VueWrapper[] = [];

async function mountPlayer(props: Record<string, unknown>): Promise<VueWrapper> {
  const w = mount(Player, {
    props: { media: media(), streamUrl: 'http://x/Dune.mp4', ...props },
    attachTo: document.body,
  }) as VueWrapper;
  wrappers.push(w);
  await flushPromises();
  return w;
}

/** The `src` attribute values the browser would actually fetch. */
function trackSrcs(w: VueWrapper): string[] {
  return w.findAll('track').map((t) => t.attributes('src') ?? '');
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  const ctrl = tc();
  ctrl.state.value = 'idle';
  ctrl.subtitleTracks.value = [];
});

afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('S242 (b) — the DIRECT-PLAY sidecar resolves against the relay base', () => {
  it('renders the relayed URL on the hub', async () => {
    const w = await mountPlayer({ apiBase: RELAY, playbackSubtitleTracks: [subtitle()] });
    expect(trackSrcs(w)).toEqual([
      '/api/v1/servers/srv-7/proxy/api/v1/media/m1/subtitles/0?exp=1785000000&sig=deadbeefcafe',
    ]);
  });

  it('carries the signed query through byte-for-byte', async () => {
    // Deliberately NOT a `URLSearchParams` fixed point (see subtitleSrc.test.ts):
    // `%2f`/`%20`/`%7E` all change under a decode/re-encode round trip, so this
    // assertion kills a `new URL(...)`-style rewrite rather than tolerating it.
    const escaped = '/api/v1/media/m1/subtitles/0?exp=1785000000&sig=Ab%2fC%20d%7Ee';
    const w = await mountPlayer({ apiBase: RELAY, playbackSubtitleTracks: [subtitle({ url: escaped })] });
    const src = trackSrcs(w)[0];
    expect(src).toBe(RELAY + escaped);
    expect(src.slice(src.indexOf('?'))).toBe('?exp=1785000000&sig=Ab%2fC%20d%7Ee');
    expect(src.split('?')).toHaveLength(2); // exactly one `?` — nothing re-encoded
  });

  it('CONTROL — on the media server (no base) the URL is unchanged', async () => {
    const w = await mountPlayer({ apiBase: '', playbackSubtitleTracks: [subtitle()] });
    expect(trackSrcs(w)).toEqual([SIGNED]);
  });

  it('CONTROL — with no apiBase prop at all the URL is unchanged', async () => {
    const w = await mountPlayer({ playbackSubtitleTracks: [subtitle()] });
    expect(trackSrcs(w)).toEqual([SIGNED]);
  });

  it('CONTROL — an absolute sidecar URL is never rewritten', async () => {
    const abs = 'https://cdn.example/subs/en.vtt';
    const w = await mountPlayer({ apiBase: RELAY, playbackSubtitleTracks: [subtitle({ url: abs })] });
    expect(trackSrcs(w)).toEqual([abs]);
  });
});

describe('S242 (a) — the TRANSCODE sidecar is ALREADY based and must not be touched', () => {
  it('CONTROL — a composable-resolved sidecar is rendered verbatim (no double prefix)', async () => {
    // Exactly what useHlsTranscode publishes on the hub: base + '/hls/…'.
    const alreadyBased = `${RELAY}/hls/job-42/sub-0.vtt`;
    const w = await mountPlayer({
      apiBase: RELAY,
      streamUrl: 'http://x/Dune.mkv', // forces the transcode branch
      playbackSubtitleTracks: [],
    });
    tc().subtitleTracks.value = [subtitle({ url: alreadyBased })];
    await flushPromises();

    const srcs = trackSrcs(w);
    expect(srcs).toEqual([alreadyBased]);
    // The failure this control exists to catch, named explicitly.
    expect(srcs[0]).not.toContain(`${RELAY}${RELAY}`);
  });
});

describe('S242 (c) — an ON-DEMAND downloaded sidecar resolves against the same base', () => {
  async function addDownloaded(w: VueWrapper, url: string): Promise<void> {
    const search = w.findComponent(SubtitleSearch);
    expect(search.exists()).toBe(true);
    search.vm.$emit('added', subtitle({ index: 9, language: 'fra', label: 'French', url }));
    await flushPromises();
  }

  it('renders the relayed URL on the hub', async () => {
    const w = await mountPlayer({ apiBase: RELAY, playbackSubtitleTracks: [] });
    await addDownloaded(w, SIGNED_EXTERNAL);
    expect(trackSrcs(w)).toEqual([
      '/api/v1/servers/srv-7/proxy/api/v1/media/m1/subtitles/external/st-9?exp=1785000000&sig=abc123',
    ]);
  });

  it('CONTROL — on the media server (no base) the URL is unchanged', async () => {
    const w = await mountPlayer({ apiBase: '', playbackSubtitleTracks: [] });
    await addDownloaded(w, SIGNED_EXTERNAL);
    expect(trackSrcs(w)).toEqual([SIGNED_EXTERNAL]);
  });

  it('stableKey() still de-dupes a downloaded track against a RE-MINTED playback-info one', async () => {
    // The server issues fresh exp/sig for the same sidecar on every
    // playback-info call. Both sides are prefixed identically and prefixing adds
    // no `?`, so the query-stripped key still collapses them to ONE <track>.
    const reMinted = '/api/v1/media/m1/subtitles/external/st-9?exp=1785009999&sig=zzz999';
    const w = await mountPlayer({
      apiBase: RELAY,
      playbackSubtitleTracks: [subtitle({ index: 9, url: reMinted })],
    });
    await addDownloaded(w, SIGNED_EXTERNAL);

    const srcs = trackSrcs(w);
    expect(srcs).toHaveLength(1);
    // The playback-info spelling wins (it is the `base` list), relayed.
    expect(srcs[0]).toBe(`${RELAY}${reMinted}`);
  });

  it('a genuinely different sidecar is NOT swallowed by the de-dupe', async () => {
    // The non-vacuity partner of the test above: if `stableKey` collapsed
    // everything, this would also render one track.
    const w = await mountPlayer({ apiBase: RELAY, playbackSubtitleTracks: [subtitle()] });
    await addDownloaded(w, SIGNED_EXTERNAL);
    expect(trackSrcs(w)).toEqual([
      `${RELAY}${SIGNED}`,
      `${RELAY}${SIGNED_EXTERNAL}`,
    ]);
  });
});

describe('S242 — the base is reactive', () => {
  it('re-renders every sidecar against a NEW base when the selected server changes', async () => {
    const w = await mountPlayer({ apiBase: RELAY, playbackSubtitleTracks: [subtitle()] });
    expect(trackSrcs(w)).toEqual([`${RELAY}${SIGNED}`]);
    await w.setProps({ apiBase: '/api/v1/servers/srv-9/proxy' });
    await flushPromises();
    expect(trackSrcs(w)).toEqual([`/api/v1/servers/srv-9/proxy${SIGNED}`]);
  });
});
