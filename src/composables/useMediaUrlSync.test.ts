/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { defineComponent } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import { bindMediaStoreToRouter } from './useMediaUrlSync';
import { useMediaStore } from '../stores/useMediaStore';

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
}

function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/app', name: 'browse', component: { template: '<div />' } }],
  });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  setActivePinia(createPinia());
  fetchMock = vi.fn(() => Promise.resolve(jsonResponse({ items: [], total: 0, limit: 24, offset: 0 })));
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('bindMediaStoreToRouter', () => {
  it('hydrates store filters from the initial URL and fetches', async () => {
    const router = makeRouter();
    await router.push({ path: '/app', query: { search: 'dune', genres: ['Sci-Fi', 'Drama'] } });
    await router.isReady();

    let stop = () => {};
    const Host = defineComponent({
      setup() {
        stop = bindMediaStoreToRouter(router, '');
        return () => null;
      },
    });
    mount(Host, { global: { plugins: [router] } });
    await flushPromises();

    const store = useMediaStore();
    expect(store.search).toBe('dune');
    expect(store.selectedGenres).toEqual(['Sci-Fi', 'Drama']);
    expect(fetchMock).toHaveBeenCalled();
    stop();
  });

  it('pushes filter changes into the URL', async () => {
    const router = makeRouter();
    await router.push('/app');
    await router.isReady();

    let stop = () => {};
    const Host = defineComponent({
      setup() {
        stop = bindMediaStoreToRouter(router, '');
        return () => null;
      },
    });
    mount(Host, { global: { plugins: [router] } });
    const store = useMediaStore();

    store.setSearch('blade');
    await flushPromises();
    expect(router.currentRoute.value.query.search).toBe('blade');
    stop();
  });

  it('applies external route changes (back/forward) onto the store', async () => {
    const router = makeRouter();
    await router.push('/app');
    await router.isReady();

    let stop = () => {};
    const Host = defineComponent({
      setup() {
        stop = bindMediaStoreToRouter(router, '');
        return () => null;
      },
    });
    mount(Host, { global: { plugins: [router] } });
    const store = useMediaStore();

    await router.push({ path: '/app', query: { ratings: 'R' } });
    await flushPromises();
    expect(store.selectedRatings).toEqual(['R']);
    stop();
  });

  it('the returned teardown stops syncing in both directions', async () => {
    const router = makeRouter();
    await router.push('/app');
    await router.isReady();

    let stop = () => {};
    const Host = defineComponent({
      setup() {
        stop = bindMediaStoreToRouter(router, '');
        return () => null;
      },
    });
    mount(Host, { global: { plugins: [router] } });
    const store = useMediaStore();
    stop();

    // store → URL watcher is detached: a filter change no longer pushes to the URL
    store.setSearch('after-stop');
    await flushPromises();
    expect(router.currentRoute.value.query.search).toBeUndefined();

    // R6.4c (matrix B4): URL → store watcher is detached too — an external route change (back/forward,
    // deep link) after stop() must no longer mutate the store, else a watcher leaks onto a navigated-away
    // page. `stopRoute()` in the returned teardown is what prevents it.
    await router.push({ path: '/app', query: { ratings: 'R' } });
    await flushPromises();
    expect(store.selectedRatings).toEqual([]); // unchanged — the route watcher was detached
  });
});
