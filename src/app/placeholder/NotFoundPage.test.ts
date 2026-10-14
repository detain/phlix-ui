/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import NotFoundPage from './NotFoundPage.vue';
import { isRoute } from '../../test/route-match';

const stub = { template: '<div />' };

function makeRouter(withBrowse: boolean) {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      // Without 'browse' the component must fall back to the bare app root.
      ...(withBrowse
        ? [{ path: '/app', name: 'browse', component: stub }]
        : [{ path: '/', component: stub }]),
      { path: '/app/:pathMatch(.*)*', name: 'catchall', component: NotFoundPage },
    ],
  });
}

beforeEach(() => setActivePinia(createPinia()));

describe('NotFoundPage (R13-08)', () => {
  it('states the truth: the page was not found, no "loading" pretense', async () => {
    const router = makeRouter(true);
    await router.push('/app/nope/missing');
    await router.isReady();
    const w = mount(NotFoundPage, { global: { plugins: [router, createPinia()] } });
    const text = w.text();
    expect(text).toContain('Page not found');
    expect(text).toContain('does not exist or has moved');
    expect(text).not.toContain('loading');
    expect(w.find('[role="status"]').exists()).toBe(true);
  });

  it('Go home replaces to the browse route when the host registered it', async () => {
    const router = makeRouter(true);
    await router.push('/app/nope');
    await router.isReady();
    const w = mount(NotFoundPage, { global: { plugins: [router, createPinia()] } });
    const replace = vi.spyOn(router, 'replace');
    await w.find('button').trigger('click');
    expect(replace).toHaveBeenCalledWith({ name: 'browse' });
    await flushPromises();
    expect(isRoute(router.currentRoute.value.fullPath, '/app')).toBe(true);
  });

  it('Go home falls back to the app root when no browse route exists', async () => {
    const router = makeRouter(false);
    await router.push('/app/nope');
    await router.isReady();
    const w = mount(NotFoundPage, { global: { plugins: [router, createPinia()] } });
    await w.find('button').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/');
  });
});
