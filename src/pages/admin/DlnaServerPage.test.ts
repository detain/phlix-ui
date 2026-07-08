/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
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
  serverId: 'uuid:phlix-server-main',
  friendlyName: 'Phlix Media Server',
  port: 8200,
  baseUrl: '192.168.1.100',
};

const stoppedStatus = { ...runningStatus, running: false };

const notConfiguredStatus = {
  enabled: false,
  running: false,
  serverId: null,
  friendlyName: null,
  port: null,
  baseUrl: null,
  message: 'DLNA server not configured',
};

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

  it('renders an empty-state when the server is not configured', async () => {
    const { client } = makeClient({ status: notConfiguredStatus });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.phlix-empty').exists()).toBe(true);
    expect(w.text()).toContain('DLNA server is not configured.');
    expect(w.text()).toContain('DLNA server not configured');
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
