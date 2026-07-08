/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

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

  it('probes, then confirms the new origin before persisting + navigating home', async () => {
    stubFetch(okHealth);
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('192.168.1.50:8096');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    // First-time origin → the probe ran, but a token-send confirm is now pending;
    // nothing is persisted and we have NOT navigated yet.
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.50:8096/health', expect.anything());
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();
    const confirm = w.find('.connect__confirm');
    expect(confirm.exists()).toBe(true);
    expect(confirm.text()).toContain('http://192.168.1.50:8096');

    // Confirm → bare LAN host → http:// inferred, trailing-slash-free, persisted.
    await confirm.findAll('button')[0]?.trigger('click');
    await flushPromises();
    expect(useConnectionStore().apiBase).toBe('http://192.168.1.50:8096');
    expect(localStorage.getItem(CONNECTION_API_BASE_KEY)).toBe('http://192.168.1.50:8096');
    expect(push).toHaveBeenCalledWith('/app');
  });

  it('does NOT re-prompt the origin confirm for an already-confirmed origin', async () => {
    localStorage.setItem(CONNECTION_API_BASE_KEY, 'https://srv:8096');
    localStorage.setItem('phlix.connection.confirmedOrigin', 'https://srv:8096');
    setActivePinia(createPinia());
    stubFetch(okHealth);
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('https://srv:8096');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    // Same (confirmed) origin → commits straight through, no pending confirm.
    expect(w.find('.connect__confirm').exists()).toBe(false);
    expect(push).toHaveBeenCalledWith('/app');
  });

  it('cancelling the origin confirm leaves the connection unset', async () => {
    stubFetch(okHealth);
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('https://srv:8096');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    const confirm = w.find('.connect__confirm');
    expect(confirm.exists()).toBe(true);
    // Second button = Cancel.
    await confirm.findAll('button')[1]?.trigger('click');
    await flushPromises();
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();
    expect(w.find('.connect__confirm').exists()).toBe(false);
  });

  it('navigates to the ?redirect target instead of home when present', async () => {
    stubFetch(okHealth);
    const { w, router } = await mountPage('/app/connect?redirect=/app/media/42');
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('https://srv:8096');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    // Confirm the new origin, then it routes to the redirect target.
    await w.find('.connect__confirm').findAll('button')[0]?.trigger('click');
    await flushPromises();
    expect(push).toHaveBeenCalledWith('/app/media/42');
  });

  it('rejects a non-http(s) address with an invalid-address error and no commit', async () => {
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('javascript:alert(1)');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(w.text()).toContain('Enter a valid http:// or https:// server address.');
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();
    expect(w.find('.connect__confirm').exists()).toBe(false);
  });

  it('warns before persisting a plaintext PUBLIC address and only commits after confirms', async () => {
    stubFetch(okHealth);
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');
    await w.find('input[name="server-address"]').setValue('http://media.example.com');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();

    // Up-front plaintext warning; nothing probed/persisted yet.
    expect(w.find('.connect__warning').exists()).toBe(true);
    expect(w.text()).toContain('This server is unencrypted');
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();

    // "Connect" again = acknowledge the warning → probe → new-origin confirm.
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(fetch).toHaveBeenCalledWith('http://media.example.com/health', expect.anything());
    expect(useConnectionStore().apiBase).toBeNull(); // origin confirm still pending
    const confirm = w.find('.connect__confirm');
    expect(confirm.exists()).toBe(true);
    await confirm.findAll('button')[0]?.trigger('click');
    await flushPromises();
    expect(useConnectionStore().apiBase).toBe('http://media.example.com');
    expect(push).toHaveBeenCalledWith('/app');
  });

  it('re-warns for a DIFFERENT plaintext host after acknowledging the first (no stale ack)', async () => {
    stubFetch(okHealth);
    const { w, router } = await mountPage();
    const push = vi.spyOn(router, 'push');

    // Acknowledge the plaintext warning for host A (up-front warning → ack).
    await w.find('input[name="server-address"]').setValue('http://attacker-a.com');
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(w.find('.connect__warning').exists()).toBe(true);
    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    // Host A acknowledged → probed → its own new-origin confirm pending.
    expect(fetch).toHaveBeenCalledWith('http://attacker-a.com/health', expect.anything());
    expect(w.find('.connect__confirm').exists()).toBe(true);

    // Edit the field to a DIFFERENT public-http host B. The stale ack (and the
    // host-A pending confirm) must not carry over.
    await w.find('input[name="server-address"]').setValue('http://attacker-b.com');
    await flushPromises();
    expect(w.find('.connect__confirm').exists()).toBe(false);

    await w.find('form').trigger('submit.prevent');
    await flushPromises();
    // Host B gets its OWN plaintext warning — not waved through by host A's ack.
    expect(w.find('.connect__warning').exists()).toBe(true);
    expect(fetch).not.toHaveBeenCalledWith('http://attacker-b.com/health', expect.anything());
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();
  });

  it('reveals "Connect anyway" on a failed probe and commits via the origin confirm', async () => {
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
    // Connect-anyway routes through the same new-origin guard.
    const confirm = w.find('.connect__confirm');
    expect(confirm.exists()).toBe(true);
    await confirm.findAll('button')[0]?.trigger('click');
    await flushPromises();
    expect(useConnectionStore().apiBase).toBe('https://srv:8096');
    expect(push).toHaveBeenCalledWith('/app');
  });
});
