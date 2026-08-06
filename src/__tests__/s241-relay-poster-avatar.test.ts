/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { computed, ref, nextTick } from 'vue';
import MediaCard from '../components/MediaCard.vue';
import UserMenu from '../app/UserMenu.vue';
import { useAuthStore } from '../stores/useAuthStore';
import type { MediaItem } from '../types/media-item';

/**
 * S241 acceptance — a POSTER and an AVATAR form a URL the relay actually serves.
 *
 * These mount the REAL production components (not a fixture host) and read the
 * `src` the browser would fetch. Every expectation is the resolved string; a
 * no-op `imgSrc` fails all of them.
 *
 * The relayed URL these assert
 *   `https://hub.example/api/v1/servers/srv-7/proxy/api/v1/artwork/m1?size=w500&exp=…&sig=…`
 * is the shape phlix-hub's `ServerProxyController` routes
 * (`/api/v1/servers/{id}/proxy/{path:.*}`) and forwards to phlix-server as
 * `/api/v1/artwork/m1?size=w500&exp=…&sig=…` — exactly the string
 * `HttpHandler::serveArtwork()` rebuilds and verifies `exp`/`sig` against.
 */

const HUB = 'https://hub.example';
const RELAY = `${HUB}/api/v1/servers/srv-7/proxy`;
/** A poster as phlix-server actually emits it: root-relative + signed. */
const SIGNED_POSTER = '/api/v1/artwork/m1?size=w500&exp=1785000000&sig=deadbeefcafe';
/** An un-cached item's poster: a TMDB CDN link. The control. */
const CDN_POSTER = 'https://image.tmdb.org/t/p/w500/aBcDeF.jpg';
/** An avatar as `AvatarStorage::url()` emits it. */
const AVATAR = '/api/v1/users/u-1/avatar';

const wrappers: VueWrapper[] = [];

function media(over: Partial<MediaItem> = {}): MediaItem {
  return {
    id: 'm1',
    name: 'Dune: Part Two',
    type: 'movie',
    poster_url: SIGNED_POSTER,
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

function makeRouter(): Router {
  const stub = { template: '<div />' };
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/app', component: stub }, { path: '/:rest(.*)*', component: stub }],
  });
}

/** Mount a card as it renders on the hub with `srv-7` selected. */
function mountCard(item: MediaItem, mediaApiBase: unknown = RELAY): VueWrapper {
  const w = mount(MediaCard, {
    props: { item },
    global: { provide: { apiBase: HUB, mediaApiBase } },
  });
  wrappers.push(w);
  return w;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('S241 — a poster renders through the relay proxy', () => {
  it('MediaCard forms the relayed artwork URL, signature intact', () => {
    const src = mountCard(media()).get('.media-card__img').attributes('src');
    expect(src).toBe(`${RELAY}${SIGNED_POSTER}`);
    // The signed query is byte-identical to what the server minted.
    expect(src?.endsWith('?size=w500&exp=1785000000&sig=deadbeefcafe')).toBe(true);
    // …and the path the hub will forward is the one serveArtwork() verifies.
    expect(src?.slice(RELAY.length)).toBe(SIGNED_POSTER);
  });

  it('THE CONTROL: an absolute TMDB poster is byte-identical under the same base', () => {
    const src = mountCard(media({ poster_url: CDN_POSTER })).get('.media-card__img').attributes('src');
    expect(src).toBe(CDN_POSTER);
  });

  it('on the media server (no relay base) the poster path is left alone', () => {
    const w = mount(MediaCard, {
      props: { item: media() },
      global: { provide: { apiBase: '' } },
    });
    wrappers.push(w);
    expect(w.get('.media-card__img').attributes('src')).toBe(SIGNED_POSTER);
  });

  it('the srcset candidates are relayed too, each descriptor preserved', () => {
    const item = media({
      poster_srcset: '/api/v1/artwork/m1?size=w200 200w, /api/v1/artwork/m1?size=w500 500w',
    } as Partial<MediaItem>);
    const srcset = mountCard(item).get('.media-card__img').attributes('srcset');
    expect(srcset).toBe(
      `${RELAY}/api/v1/artwork/m1?size=w200 200w, ${RELAY}/api/v1/artwork/m1?size=w500 500w`,
    );
  });

  it('switching the selected server re-points the poster at the new relay base', async () => {
    const serverId = ref('srv-1');
    const base = computed(() => `${HUB}/api/v1/servers/${serverId.value}/proxy`);
    const w = mountCard(media(), base);
    expect(w.get('.media-card__img').attributes('src')).toBe(
      `${HUB}/api/v1/servers/srv-1/proxy${SIGNED_POSTER}`,
    );
    serverId.value = 'srv-9';
    await nextTick();
    expect(w.get('.media-card__img').attributes('src')).toBe(
      `${HUB}/api/v1/servers/srv-9/proxy${SIGNED_POSTER}`,
    );
  });
});

describe('S241 — an avatar renders through the relay proxy', () => {
  function mountMenu(
    avatarUrl: string,
    provide: Record<string, unknown> = { apiBase: HUB, mediaApiBase: RELAY },
  ): VueWrapper {
    localStorage.setItem('access_token', 'TOKEN');
    const auth = useAuthStore();
    auth.user = { id: 'u-1', username: 'Ada', avatar_url: avatarUrl } as never;
    const w = mount(UserMenu, {
      global: {
        plugins: [makeRouter()],
        provide: { phlixConfig: { routerBase: '/app' }, ...provide },
      },
    });
    wrappers.push(w);
    return w;
  }

  it('UserMenu forms the relayed avatar URL', () => {
    const img = mountMenu(AVATAR).find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(`${RELAY}${AVATAR}`);
  });

  it('THE CONTROL: an absolute avatar (gravatar/CDN) is byte-identical', () => {
    const abs = 'https://cdn.example.com/avatars/u-1.png';
    expect(mountMenu(abs).find('img').attributes('src')).toBe(abs);
  });

  it('on the media server the avatar path is left alone', () => {
    // On the media server BOTH bases are the app's own, normally '' (same origin);
    // `useMediaApiBase` falls back to `apiBase`, so nothing is prefixed.
    expect(mountMenu(AVATAR, { apiBase: '' }).find('img').attributes('src')).toBe(AVATAR);
  });
});
