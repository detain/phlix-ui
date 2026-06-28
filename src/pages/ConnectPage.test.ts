import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import ConnectPage from './ConnectPage.vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import { useConnectionStore, CONNECTION_API_BASE_KEY } from '../stores/useConnectionStore';

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: stub },
      { path: '/app/login', name: 'login', component: stub },
      { path: '/app/connect', name: 'connect', component: ConnectPage },
      { path: '/:rest(.*)*', component: stub },
    ],
  });
}

const wrappers: VueWrapper[] = [];
async function mountPage(initialPath = '/app/connect') {
  const router = makeRouter();
  router.push(initialPath);
  await router.isReady();
  const w = mount(ConnectPage, {
    global: { plugins: [router], provide: { phlixConfig: { routerBase: '/app' } } },
  });
  wrappers.push(w);
  return { w, router };
}

/** Stub global fetch so probeServer() sees a reachable / unreachable server. */
function stubFetch(impl: () => Promise<Response> | Response): void {
  vi.stubGlobal('fetch', vi.fn(impl));
}
const okHealth = (): Response =>
  ({ ok: true, json: () => Promise.resolve({ status: 'ok', version: '1.0.0' }) }) as unknown as Response;

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ConnectPage', () => {
  it('renders the connect card with an address field over the atmosphere', async () => {
    const { w } = await mountPage();
    expect(w.find('.authcard').exists()).toBe(true);
    expect(w.find('input[name="server-address"]').exists()).toBe(true);
    expect(w.findComponent(AppBackdrop).exists()).toBe(true);
  });

  it('shows a required error and does not navigate when the field is empty', async () => {
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(w.text()).toContain('Enter your server address.');
    expect(push).not.toHaveBeenCalled();
    expect(useConnectionStore().apiBase).toBeNull();
  });

  it('probes, persists, and navigates home on a reachable server', async () => {
    stubFetch(okHealth);
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('192.168.1.50:8096');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    // Bare LAN host → http:// inferred, trailing-slash-free, persisted.
    expect(useConnectionStore().apiBase).toBe('http://192.168.1.50:8096');
    expect(localStorage.getItem(CONNECTION_API_BASE_KEY)).toBe('http://192.168.1.50:8096');
    expect(push).toHaveBeenCalledWith('/app');
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.50:8096/health', expect.anything());
  });

  it('navigates to the ?redirect target instead of home when present', async () => {
    stubFetch(okHealth);
    const { w, router } = await mountPage('/app/connect?redirect=/app/media/42');
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('https://srv:8096');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(push).toHaveBeenCalledWith('/app/media/42');
  });

  it('reveals "Connect anyway" on a failed probe and commits without re-probing', async () => {
    stubFetch(() => Promise.reject(new TypeError('Failed to fetch')));
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('https://srv:8096');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(w.text()).toContain("Couldn't reach a Phlix server");
    expect(useConnectionStore().apiBase).toBeNull();
    const anyway = w.find('.connect__anyway');
    expect(anyway.exists()).toBe(true);

    await anyway.trigger('click');
    await flushPromises();
    expect(useConnectionStore().apiBase).toBe('https://srv:8096');
    expect(push).toHaveBeenCalledWith('/app');
  });
});
