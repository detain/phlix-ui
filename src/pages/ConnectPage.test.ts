/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import ConnectPage from './ConnectPage.vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import { useConnectionStore, CONNECTION_API_BASE_KEY } from '../stores/useConnectionStore';

/** S532 provenance — single code home for the wave token (survives comment-stripping). */
export const S532_PROVENANCE = 'S532CONNSCANX9P10';

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
async function mountPage(initialPath = '/app/connect', config: Record<string, unknown> = {}) {
  const router = makeRouter();
  router.push(initialPath);
  await router.isReady();
  const w = mount(ConnectPage, {
    global: { plugins: [router], provide: { phlixConfig: { routerBase: '/app', ...config } } },
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

describe('S532 — host-injected connect scan', () => {
  it('holds the wave token on this single code line', () => {
    expect(S532_PROVENANCE).toBe('S532CONNSCANX9P10');
  });

  it('hides the entire scan affordance when the host injects no scanner', async () => {
    const { w } = await mountPage();
    expect(w.find('.connect__scan').exists()).toBe(false);
    expect(w.find('.connect__scan-row').exists()).toBe(false);
  });

  it('renders the host-provided candidates as-is after a scan', async () => {
    const connectScan = vi.fn(async () => [
      { url: 'http://192.168.1.50:8096', label: 'Studio NAS' },
      { url: 'https://phlix.home.arpa' },
    ]);
    const { w } = await mountPage('/app/connect', { connectScan });
    await w.find('.connect__scan .phlix-btn').trigger('click');
    await flushPromises();
    expect(connectScan).toHaveBeenCalledTimes(1);
    const rows = w.findAll('.connect__scan-row');
    expect(rows).toHaveLength(2);
    expect(rows[0]?.text()).toContain('http://192.168.1.50:8096');
    expect(rows[0]?.text()).toContain('Studio NAS');
    expect(rows[1]?.find('.connect__scan-label').exists()).toBe(false);
  });

  it('commits a picked candidate through the new-origin confirm WITHOUT re-probing', async () => {
    // The host already probed what it yielded; any /health fetch here is a bug,
    // so the fetch double LOUDLY throws instead of returning an ok response.
    stubFetch(() => {
      throw new Error('the scan path must not re-run probeServer');
    });
    const connectScan = async () => [{ url: 'http://192.168.1.50:8096', label: 'Studio NAS' }];
    const { w, router } = await mountPage('/app/connect', { connectScan });
    const push = vi.spyOn(router, 'push');
    await w.find('.connect__scan .phlix-btn').trigger('click');
    await flushPromises();
    await w.find('.connect__scan-row').trigger('click');
    await flushPromises();
    // Picked URL is prefilled into the field, and the token-send confirm gates
    // the commit — nothing persists until it is answered.
    expect(w.find<HTMLInputElement>('input[name="server-address"]').element.value).toBe(
      'http://192.168.1.50:8096',
    );
    const confirm = w.find('.connect__confirm');
    expect(confirm.exists()).toBe(true);
    expect(confirm.text()).toContain('http://192.168.1.50:8096');
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();

    await confirm.findAll('button')[0]?.trigger('click');
    await flushPromises();
    expect(useConnectionStore().apiBase).toBe('http://192.168.1.50:8096');
    expect(localStorage.getItem(CONNECTION_API_BASE_KEY)).toBe('http://192.168.1.50:8096');
    expect(push).toHaveBeenCalledWith('/app');
  });

  it('commits an already-confirmed candidate straight through (no re-prompt)', async () => {
    localStorage.setItem(CONNECTION_API_BASE_KEY, 'http://192.168.1.50:8096');
    localStorage.setItem('phlix.connection.confirmedOrigin', 'http://192.168.1.50:8096');
    setActivePinia(createPinia());
    stubFetch(() => {
      throw new Error('the scan path must not re-run probeServer');
    });
    const connectScan = async () => [{ url: 'http://192.168.1.50:8096' }];
    const { w, router } = await mountPage('/app/connect', { connectScan });
    const push = vi.spyOn(router, 'push');
    await w.find('.connect__scan .phlix-btn').trigger('click');
    await flushPromises();
    await w.find('.connect__scan-row').trigger('click');
    await flushPromises();
    expect(w.find('.connect__confirm').exists()).toBe(false);
    expect(useConnectionStore().apiBase).toBe('http://192.168.1.50:8096');
    expect(push).toHaveBeenCalledWith('/app');
  });

  it('shows an honest failure note when the host scan rejects', async () => {
    const connectScan = () => Promise.reject(new Error('scan blew up'));
    const { w, router } = await mountPage('/app/connect', { connectScan });
    const push = vi.spyOn(router, 'push');
    await w.find('.connect__scan .phlix-btn').trigger('click');
    await flushPromises();
    expect(w.find('.connect__scan-note').text()).toContain("Couldn't scan your network");
    expect(w.findAll('.connect__scan-row')).toHaveLength(0);
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();
  });

  it('shows the empty note when the host yields no candidates', async () => {
    const connectScan = async () => [];
    const { w } = await mountPage('/app/connect', { connectScan });
    await w.find('.connect__scan .phlix-btn').trigger('click');
    await flushPromises();
    expect(w.find('.connect__scan-note').text()).toContain('No Phlix servers found');
    expect(w.findAll('.connect__scan-row')).toHaveLength(0);
  });

  it('refuses a malformed candidate URL at the boundary and never commits it', async () => {
    const connectScan = async () => [{ url: 'javascript:alert(1)' }];
    const { w, router } = await mountPage('/app/connect', { connectScan });
    const push = vi.spyOn(router, 'push');
    await w.find('.connect__scan .phlix-btn').trigger('click');
    await flushPromises();
    await w.find('.connect__scan-row').trigger('click');
    await flushPromises();
    // The host may yield anything; withScheme still owns the scheme law.
    expect(w.text()).toContain('Enter a valid http:// or https:// server address.');
    expect(w.find('.connect__confirm').exists()).toBe(false);
    expect(useConnectionStore().apiBase).toBeNull();
    expect(push).not.toHaveBeenCalled();
  });

  it('source-lock: the page rides the existing seams and never re-implements discovery', () => {
    const raw = readFileSync(path.join(path.resolve(fileURLToPath(import.meta.url), '..'), 'ConnectPage.vue'), 'utf8');
    const source = raw
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '');
    // No second scan engine, no probe construction, no vendor coupling.
    for (const banned of [
      '/health',
      'lanDiscovery',
      'sameSubnetCandidates',
      'discoverServers',
      'buildConnectSuggestions',
      'tizen',
      'subnet',
    ]) {
      expect(source, `ConnectPage.vue must not contain "${banned}"`).not.toContain(banned);
    }
    // The single implementations it DOES ride stay wired through.
    expect(source).toContain('probeServer');
    expect(source).toContain('commitWithGuards');
    expect(source).toContain('connectScan');
  });
});
