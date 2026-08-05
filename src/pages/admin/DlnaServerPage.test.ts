/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import DlnaServerPage from './DlnaServerPage.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const runningStatus = {
  enabled: true,
  running: true,
  reloadPending: false,
  serverId: 'uuid:phlix-server-main',
  friendlyName: 'Phlix Media Server',
  port: 8200,
  baseUrl: '192.168.1.100',
};

/**
 * A genuinely STOPPED server — and the stock-install state.
 *
 * ⚠ S214: this fixture used to be `{ ...runningStatus, running: false }`, i.e.
 * `enabled: true, running: false`. Under the S28 contract that is not "stopped"
 * at all — it is "the operator asked for DLNA and the workers have not reloaded
 * yet", the one state in which `POST /start` returns 409. A fixture is a claim
 * about what the server sends; that one described a state the page then handled
 * wrongly, so the suite could not see the bug. `enabled: false` is what a fresh
 * install actually reports.
 */
const stoppedStatus = { ...runningStatus, enabled: false, running: false };

/** Enabled but not yet applied by the worker that answered (S28's reload window). */
const applyingStatus = { ...runningStatus, enabled: true, running: false, reloadPending: true };

function makeClient(over: {
  status?: unknown;
  statusQueue?: unknown[];
  start?: unknown;
  stop?: unknown;
  startReject?: Error;
} = {}) {
  const queue = Array.isArray(over.statusQueue) ? [...over.statusQueue] : null;
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/dlna/status') {
      if (queue && queue.length > 0) return queue.shift();
      return over.status ?? runningStatus;
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/dlna/start') {
      if (over.startReject) throw over.startReject;
      return over.start ?? { success: true };
    }
    if (endpoint === '/api/v1/admin/dlna/stop') {
      return over.stop ?? { success: true };
    }
    throw new Error(`unexpected POST ${endpoint}`);
  });
  return { client: { get, post } as unknown as ApiClient, get, post };
}

function mountPage(client: ApiClient) {
  return mount(DlnaServerPage, { props: { client }, attachTo: document.body });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Admin DlnaServerPage', () => {
  it('shows a loading skeleton before the status resolves', () => {
    const { client } = makeClient();
    const w = mountPage(client);
    expect(w.find('.admin-dlna__loading').exists()).toBe(true);
    w.unmount();
  });

  it('renders the running status with a success badge and details', async () => {
    const { client, get } = makeClient({ status: runningStatus });
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/dlna/status');
    expect(w.text()).toContain('Running');
    expect(w.find('.phlix-badge--success').exists()).toBe(true);
    expect(w.text()).toContain('Phlix Media Server');
    expect(w.text()).toContain('uuid:phlix-server-main');
    expect(w.text()).toContain('8200');
    expect(w.text()).toContain('192.168.1.100');
    w.unmount();
  });

  it('renders the stopped status with a neutral badge and a Start button', async () => {
    const { client } = makeClient({ status: stoppedStatus });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Stopped');
    expect(w.find('.phlix-badge--neutral').exists()).toBe(true);
    expect(w.text()).toContain('Start Server');
    expect(w.text()).not.toContain('Stop Server');
    w.unmount();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // S214 — the stock install must be able to START DLNA from this page.
  //
  // ⚠ REPLACED A DEFECT-PINNING TEST. The test that used to live here,
  // `renders an empty-state when the server is not configured`, asserted the bug
  // as intended behaviour: it fed `enabled: false` (the stock install) and
  // required the page to render "DLNA server is not configured." — the branch
  // that SKIPS the Start/Stop buttons entirely. It was written against S28's
  // predecessor, where `enabled` meant "a CdsServer is wired". After S28 made
  // `enabled` the persisted intent (default false), that assertion pinned an
  // unreachable Start control. It is replaced, not deleted: the same input now
  // asserts the opposite, correct outcome.
  // ───────────────────────────────────────────────────────────────────────────
  it('offers a WORKING Start control on a stock install (enabled=false) — S214', async () => {
    const { client, post } = makeClient({ status: stoppedStatus });
    const w = mountPage(client);
    await flushPromises();

    // The dead-end empty state is gone.
    expect(w.find('.phlix-empty').exists()).toBe(false);
    expect(w.text()).not.toContain('DLNA server is not configured.');

    // ⚠ Deliberately NOT `wrapper.trigger('click')`: VTU's trigger() dispatches
    // through the component and can "click" a control the browser would refuse
    // to activate, so it cannot tell a live button from an inert one. Assert
    // non-inertness on the real element, then dispatch a real DOM event.
    const btn = w.find('.admin-dlna__actions button').element as HTMLButtonElement;
    expect(btn.textContent).toContain('Start Server');
    expect(btn.disabled, 'the Start button must be genuinely operable').toBe(false);
    expect(btn.getAttribute('aria-busy')).toBeNull();

    btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await flushPromises();

    expect(post).toHaveBeenCalledWith('/api/v1/admin/dlna/start');
    w.unmount();
  });

  it('offers Stop (never Start) while a start is still applying — enabled=true, running=false', async () => {
    // `POST /start` 409s when the setting is already true, so a Start button here
    // could only ever fail. The old page keyed the buttons off `running` and
    // showed exactly that.
    const { client } = makeClient({ status: applyingStatus });
    const w = mountPage(client);
    await flushPromises();
    const btn = w.find('.admin-dlna__actions button').element as HTMLButtonElement;
    expect(btn.textContent).toContain('Stop Server');
    expect(w.text()).not.toContain('Start Server');
    w.unmount();
  });

  it('surfaces the server-computed reloadPending as an applying state (S214)', async () => {
    const { client } = makeClient({ status: applyingStatus });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-dlna__pending').exists()).toBe(true);
    expect(w.find('.admin-dlna__pending').text()).toContain('workers are reloading');
    expect(w.find('.phlix-badge--warning').text()).toContain('Starting…');
    w.unmount();
  });

  it('reads reloadPending off the payload rather than recomputing enabled !== running (S214)', async () => {
    // enabled === running here, so any client-side re-derivation answers false.
    const { client } = makeClient({ status: { ...runningStatus, reloadPending: true } });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-dlna__pending').exists()).toBe(true);
    w.unmount();
  });

  it('shows no applying state when the server reports reloadPending: false', async () => {
    const { client } = makeClient({ status: runningStatus });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-dlna__pending').exists()).toBe(false);
    expect(w.find('.phlix-badge--warning').exists()).toBe(false);
    w.unmount();
  });

  it('starts the server, toasts success, and refetches the status', async () => {
    const { client, post, get } = makeClient({
      statusQueue: [stoppedStatus, runningStatus],
      start: { success: true },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/dlna/start');
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message === 'DLNA server started.')).toBe(true);
    // initial load + post-action refetch
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/dlna/status').length).toBe(2);
    expect(w.text()).toContain('Running');
    w.unmount();
  });

  it('stops the server, toasts success, and refetches the status', async () => {
    const { client, post } = makeClient({
      statusQueue: [runningStatus, stoppedStatus],
      stop: { success: true },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/dlna/stop');
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message === 'DLNA server stopped.')).toBe(true);
    expect(w.text()).toContain('Stopped');
    w.unmount();
  });

  it('shows the server’s success message VERBATIM instead of a hard-coded toast (S214)', async () => {
    const message = 'DLNA content directory enabled; workers are reloading to apply it.';
    const { client } = makeClient({
      statusQueue: [stoppedStatus, applyingStatus],
      start: { success: true, enabled: true, reloadScheduled: true, message },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message === message)).toBe(true);
    // The hard-coded string must NOT be what the operator reads.
    expect(toasts.toasts.some((t) => t.message === 'DLNA server started.')).toBe(false);
    w.unmount();
  });

  it('warns (not "success") when the server could not schedule the reload — S214', async () => {
    // AdminDlnaServerController::applyMessage() — the setting is persisted but
    // INERT until a restart. The page used to answer "DLNA server started."
    const message =
      'DLNA content directory enabled; restart the server to apply it (automatic reload unavailable).';
    const { client } = makeClient({
      statusQueue: [stoppedStatus, applyingStatus],
      start: { success: true, enabled: true, reloadScheduled: false, message },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    const toast = toasts.toasts.find((t) => t.message === message);
    expect(toast, 'the server message must reach the operator').toBeDefined();
    expect(toast!.tone).toBe('warning');
    expect(toasts.toasts.some((t) => t.tone === 'success')).toBe(false);
    w.unmount();
  });

  it('shows the server’s stop message verbatim too (S214)', async () => {
    const message = 'DLNA content directory disabled; workers are reloading to apply it.';
    const { client } = makeClient({
      statusQueue: [runningStatus, stoppedStatus],
      stop: { success: true, enabled: false, reloadScheduled: true, message },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'success' && t.message === message)).toBe(true);
    expect(toasts.toasts.some((t) => t.message === 'DLNA server stopped.')).toBe(false);
    w.unmount();
  });

  it('toasts the failure message when start returns success:false (no refetch)', async () => {
    const { client, get } = makeClient({ status: stoppedStatus, start: { success: false, message: 'already running' } });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'already running')).toBe(true);
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/dlna/status').length).toBe(1);
    w.unmount();
  });

  it('falls back to a default message when stop returns success:false without a message', async () => {
    const { client } = makeClient({ status: runningStatus, stop: { success: false } });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'Failed to stop DLNA server.')).toBe(true);
    w.unmount();
  });

  it('toasts an error when the start request rejects', async () => {
    const { client } = makeClient({ status: stoppedStatus, startReject: new Error('network down') });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findComponent(Button).trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'network down')).toBe(true);
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the initial status load rejects', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    // R5.3d.2: a load failure renders an in-body error EmptyState instead of the
    // misleading "DLNA server is not configured." empty state (status stays null).
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain("Couldn't load DLNA server status");
    expect(w.text()).toContain('boom');
    expect(w.text()).not.toContain('DLNA server is not configured.');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'boom')).toBe(true);
    w.unmount();
  });

  it('retries the status load from the error state', async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValue(runningStatus);
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.text()).toContain('Running');
    w.unmount();
  });

  it('falls back to a generic message for a non-Error status rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(toasts.toasts.some((t) => t.message === 'Failed to load DLNA server status.')).toBe(true);
    w.unmount();
  });

  it('renders the info note', async () => {
    const { client } = makeClient({ status: stoppedStatus });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-dlna__note').text()).toContain('UPnP MediaServer');
    w.unmount();
  });
});
