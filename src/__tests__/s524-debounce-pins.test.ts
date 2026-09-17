/**
 * S524 — pre-migration timing pins for the two remaining hand-rolled
 * `clearTimeout`/`setTimeout` debounce pairs (`SearchPage.vue`, `FilterBar.vue`).
 *
 * These tests capture the CURRENT semantics at the pre-migration tip so the
 * migration onto `src/utils/debounce.ts` can be proven drift-free: every pin
 * here is green at tip and must stay green after the change. Behavior drift
 * shows up as a RED pin — never by re-pinning to match new behavior.
 *
 * Captured facts (re-derived from code at tip):
 *  - SearchPage: fixed 300 ms trailing debounce; `@input` and `@submit` share
 *    ONE timer; the timer is NOT cancelled on unmount (no unmount hook exists).
 *  - FilterBar: trailing debounce with delay read from the `searchDebounce`
 *    prop AT INPUT TIME (default 250 ms); `onBeforeUnmount` cancels the pending
 *    fire; `clearSearch()` commits immediately but does NOT cancel an
 *    in-flight debounced fire, which then re-commits the cleared (empty) text.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import SearchPage from '../pages/SearchPage.vue';
import FilterBar from '../components/FilterBar.vue';
import { useMediaStore } from '../stores/useMediaStore';
import { isRoute } from '../test/route-match';

/** S524 survival sentinel — code line (not prose) so it survives the merge-gate
 *  comment-strip defense; must stay in this one file (see the plan step). */
export const S524_DEBOUNCE_MIGRATION_TOKEN = 'S524DEBMIGRX9P8';

// ---------------------------------------------------------------------------
// SearchPage harness (mirrors src/pages/SearchPage.test.ts)
// ---------------------------------------------------------------------------

const SEARCH_PATH = '/api/v1/media/search';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function stubFetch() {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (isRoute(u, SEARCH_PATH)) {
      return Promise.resolve(jsonResponse({ items: [], query: 'q', total: 0 }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/search', name: 'search', component: stub },
      { path: '/app/media/:id', name: 'media', component: stub },
      { path: '/app/player/:id', name: 'player', component: stub },
    ],
  });
}

async function mountAtRouter(router: Router): Promise<VueWrapper> {
  await router.push({ path: '/app/search', query: {} });
  await router.isReady();
  return mount(SearchPage, {
    global: {
      plugins: [router],
      provide: { apiBase: '' },
    },
  });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('S524 pins — SearchPage debounce timing (captured at tip)', () => {
  it('fires exactly at the 300 ms boundary — 299 ms is not enough', async () => {
    vi.useFakeTimers();
    const router = makeRouter();
    const fetchFn = stubFetch();
    const replace = vi.spyOn(router, 'replace');
    const w = await mountAtRouter(router);
    await flushPromises();

    await w.find('input[type="search"]').setValue('pin');
    expect(fetchFn).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(299);
    expect(fetchFn).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await flushPromises();

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(String(fetchFn.mock.calls[0][0])).toContain('q=pin');
    expect(replace).toHaveBeenCalledWith({ query: { q: 'pin' } });
    w.unmount();
  });

  it('a burst of keystrokes collapses to ONE trailing fire with the latest query', async () => {
    vi.useFakeTimers();
    const router = makeRouter();
    const fetchFn = stubFetch();
    const replace = vi.spyOn(router, 'replace');
    const w = await mountAtRouter(router);
    await flushPromises();

    const input = w.find('input[type="search"]');
    await input.setValue('d');
    await vi.advanceTimersByTimeAsync(100);
    await input.setValue('du');
    await vi.advanceTimersByTimeAsync(100);
    await input.setValue('dun');
    // 300 ms have elapsed in total but only 100 ms since the LAST keystroke —
    // still nothing, because every call supersedes the previous timer.
    await vi.advanceTimersByTimeAsync(100);
    expect(fetchFn).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(200);
    await flushPromises();

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(String(fetchFn.mock.calls[0][0])).toContain('q=dun');
    expect(replace).toHaveBeenCalledWith({ query: { q: 'dun' } });
    w.unmount();
  });

  it('@submit re-arms the SAME timer as @input (one timer source, not two)', async () => {
    vi.useFakeTimers();
    const router = makeRouter();
    const fetchFn = stubFetch();
    const w = await mountAtRouter(router);
    await flushPromises();

    await w.find('input[type="search"]').setValue('solo');
    await vi.advanceTimersByTimeAsync(250);
    expect(fetchFn).not.toHaveBeenCalled();
    // Submit at t=250 clears the @input timer and arms a fresh 300 ms one.
    await w.find('form.search-form').trigger('submit');
    await vi.advanceTimersByTimeAsync(299);
    expect(fetchFn).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await flushPromises();

    expect(fetchFn).toHaveBeenCalledTimes(1);
    w.unmount();
  });

  it('the pending fire SURVIVES unmount — no cancel-on-unmount exists at tip (status quo)', async () => {
    // Captured deliberately: SearchPage.vue has NO unmount hook for this timer
    // today. S524 is a zero-drift migration, so the primitive must reproduce
    // the status quo EXACTLY — adding a cancel() here would be a behavior
    // change and would (correctly) turn this pin red.
    //
    // `replace` is stubbed to a recorded no-op ONLY here: unmounting the test
    // app resets vue-router's current location to START ("/"), so the REAL
    // replace after unmount would reject with "No match … while being at /" —
    // a harness artifact of VTU app teardown, not app behavior. The pin is
    // about the TIMER surviving unmount; the call recording proves exactly that.
    vi.useFakeTimers();
    const router = makeRouter();
    const fetchFn = stubFetch();
    const replace = vi.spyOn(router, 'replace').mockResolvedValue(undefined);
    const w = await mountAtRouter(router);
    await flushPromises();

    await w.find('input[type="search"]').setValue('ghost');
    w.unmount();
    await vi.advanceTimersByTimeAsync(300);
    await flushPromises();

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith({ query: { q: 'ghost' } });
  });
});

// ---------------------------------------------------------------------------
// FilterBar — search debounce timing
// ---------------------------------------------------------------------------

describe('S524 pins — FilterBar debounce timing (captured at tip)', () => {
  it('commits exactly at the default 250 ms boundary — 249 ms is not enough', async () => {
    vi.useFakeTimers();
    const w = mount(FilterBar);
    const store = useMediaStore();

    await w.find('.filterbar__search-input').setValue('dune');
    vi.advanceTimersByTime(249);
    expect(store.search).toBe('');
    expect(w.emitted('change')).toBeUndefined();
    vi.advanceTimersByTime(1);
    expect(store.search).toBe('dune');
    expect(w.emitted('change')).toHaveLength(1);
  });

  it('honours an explicit searchDebounce prop (400 ms) instead of the default', async () => {
    vi.useFakeTimers();
    const w = mount(FilterBar, { props: { searchDebounce: 400 } });
    const store = useMediaStore();

    await w.find('.filterbar__search-input').setValue('dune');
    vi.advanceTimersByTime(250);
    expect(store.search).toBe('');
    vi.advanceTimersByTime(150);
    expect(store.search).toBe('dune');
  });

  it('re-reads searchDebounce on EVERY input — a prop change applies immediately', async () => {
    // The subtle one: the hand-rolled pair reads props.searchDebounce INSIDE
    // onSearchInput, so a prop change takes effect on the very next keystroke.
    // The wrapper must not capture the delay once at setup.
    vi.useFakeTimers();
    const w = mount(FilterBar);
    const store = useMediaStore();

    await w.find('.filterbar__search-input').setValue('a');
    vi.advanceTimersByTime(250);
    expect(store.search).toBe('a');

    await w.setProps({ searchDebounce: 400 });
    await w.find('.filterbar__search-input').setValue('ab');
    vi.advanceTimersByTime(260);
    expect(store.search).toBe('a');
    vi.advanceTimersByTime(140);
    expect(store.search).toBe('ab');
  });

  it('unmount cancels the pending fire: no commit AND no change-emit afterwards', async () => {
    vi.useFakeTimers();
    const w = mount(FilterBar);
    const store = useMediaStore();

    await w.find('.filterbar__search-input').setValue('matrix');
    w.unmount();
    vi.advanceTimersByTime(400);
    expect(store.search).toBe('');
    expect(w.emitted('change')).toBeUndefined();
  });

  it('clearSearch commits instantly; an in-flight debounced fire still re-fires on the cleared value', async () => {
    // Captured quirk (status quo, not endorsement): the pending timer is NOT
    // cancelled by the clear button, so `change` fires twice — once from the
    // clear, once from the trailing timer — while the final committed value
    // stays '' because the callback reads the ref at fire time. The shared
    // primitive reproduces this exactly (callback body untouched).
    vi.useFakeTimers();
    const w = mount(FilterBar);
    const store = useMediaStore();

    await w.find('.filterbar__search-input').setValue('du');
    await nextTick();
    await w.find('.filterbar__search-clear').trigger('click');
    expect(store.search).toBe('');
    expect(w.emitted('change')).toHaveLength(1);
    vi.advanceTimersByTime(250);
    expect(store.search).toBe('');
    expect(w.emitted('change')).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// S524 migration locks — these assert the POST-migration state (shared
// primitive owns every timer at both sites). They join the tip-era captures
// above only in the migration commit, where both halves are green together.
// ---------------------------------------------------------------------------

describe('S524 locks — both sites route through src/utils/debounce.ts', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const sources = {
    'SearchPage.vue': readFileSync(join(here, '../pages/SearchPage.vue'), 'utf8'),
    'FilterBar.vue': readFileSync(join(here, '../components/FilterBar.vue'), 'utf8'),
  } as const;

  for (const [name, src] of Object.entries(sources)) {
    it(`${name} keeps zero hand-rolled setTimeout/clearTimeout sources`, () => {
      expect(src).not.toMatch(/\bsetTimeout\(/);
      expect(src).not.toMatch(/\bclearTimeout\(/);
    });

    it(`${name} imports the shared debounce primitive`, () => {
      expect(src).toMatch(/from '\.\.\/utils\/debounce'/);
    });
  }
});
