import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createRouter, createMemoryHistory, type Router, type RouteRecordRaw } from 'vue-router';
import { usePrefetch } from './usePrefetch';

let prefetch: ((to: unknown) => void) | null = null;

const Host = defineComponent({
  setup() {
    prefetch = usePrefetch().prefetch as (to: unknown) => void;
    return () => null;
  },
});

function makeRouter(routes: RouteRecordRaw[]): Router {
  return createRouter({ history: createMemoryHistory(), routes });
}

async function mountWithRouter(routes: RouteRecordRaw[]): Promise<Router> {
  const router = makeRouter(routes);
  mount(Host, { global: { plugins: [router] } });
  await router.isReady();
  return router;
}

beforeEach(() => {
  prefetch = null;
});

describe('usePrefetch', () => {
  it('invokes a lazy route component loader to warm its chunk', async () => {
    const loader = vi.fn(() => Promise.resolve({ default: { template: '<div/>' } }));
    await mountWithRouter([
      { path: '/', name: 'home', component: { template: '<div/>' } },
      { path: '/app/player/:id', name: 'player', component: loader },
    ]);
    expect(loader).not.toHaveBeenCalled(); // not warmed until prefetched
    prefetch!({ name: 'player', params: { id: 'm1' } });
    expect(loader).toHaveBeenCalledTimes(1);
    await flushPromises();
  });

  it('warms each loader at most once (deduped by identity across targets)', async () => {
    const loader = vi.fn(() => Promise.resolve({ default: { template: '<div/>' } }));
    await mountWithRouter([{ path: '/app/player/:id', name: 'player', component: loader }]);
    prefetch!({ name: 'player', params: { id: 'm1' } });
    prefetch!({ name: 'player', params: { id: 'm2' } }); // same loader, different path
    prefetch!('/app/player/m3');
    expect(loader).toHaveBeenCalledTimes(1);
    await flushPromises();
  });

  it('skips a static (already-resolved) component without throwing', async () => {
    await mountWithRouter([{ path: '/', name: 'home', component: { template: '<div/>' } }]);
    expect(() => prefetch!({ name: 'home' })).not.toThrow();
  });

  it('swallows an unknown/invalid target (resolve throws)', async () => {
    await mountWithRouter([{ path: '/', name: 'home', component: { template: '<div/>' } }]);
    expect(() => prefetch!({ name: 'does-not-exist' })).not.toThrow();
  });

  it('swallows a rejected import (best-effort)', async () => {
    const loader = vi.fn(() => Promise.reject(new Error('chunk load failed')));
    await mountWithRouter([{ path: '/x', name: 'x', component: loader }]);
    expect(() => prefetch!({ name: 'x' })).not.toThrow();
    expect(loader).toHaveBeenCalledTimes(1);
    await flushPromises(); // the rejection is caught internally → no unhandled rejection
  });

  it('no-ops without a router — no throw and no Vue injection warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount(Host); // no router plugin → router injection absent (uses the null default)
    expect(typeof prefetch).toBe('function');
    expect(() => prefetch!({ name: 'player', params: { id: 'x' } })).not.toThrow();
    // The `inject(routerKey, null)` default means no "[Vue warn]: injection … not found".
    const warnings = warn.mock.calls.flat().join(' ');
    expect(warnings).not.toMatch(/injection|not found/i);
    warn.mockRestore();
  });
});
