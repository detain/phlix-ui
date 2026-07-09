/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import LogsPage from './LogsPage.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { ALL_LOGS } from '../../api/admin/logs';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

function makeClient(over: Partial<Record<string, unknown>> = {}) {
  const get = vi.fn(async (endpoint: string, params?: Record<string, string>) => {
    if (endpoint === '/api/v1/admin/logs') {
      return over.list ?? { files: [{ name: 'app.log', size: 1, modified_at: 't' }, { name: 'err.log', size: 2, modified_at: 't' }] };
    }
    if (endpoint === '/api/v1/admin/logs/tail') {
      return { file: params?.file, lines: [`tail of ${params?.file} @ ${params?.lines}`], truncated: false };
    }
    if (endpoint === '/api/v1/admin/logs/tail-all') {
      return { files: ['app.log', 'err.log'], lines: ['merged line'], truncated: true };
    }
    throw new Error(`unexpected ${endpoint}`);
  });
  return { client: { get } as unknown as ApiClient, get };
}

function mountPage(client: ApiClient) {
  return mount(LogsPage, { props: { client }, attachTo: document.body });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Admin LogsPage', () => {
  it('lists files, defaults to the first, and tails it', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // file + line-count selects present; file options include the combined view
    const selects = w.findAllComponents(Select);
    const fileOpts = selects[0].props('options') as { value: string; label: string }[];
    expect(fileOpts[0]).toEqual({ value: ALL_LOGS, label: 'All logs (combined)' });
    expect(fileOpts.map((o) => o.value)).toContain('app.log');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/logs/tail', { file: 'app.log', lines: '200' });
    expect(w.find('[data-testid="logs-output"]').text()).toContain('tail of app.log @ 200');
  });

  it('re-tails when the selected file changes', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    w.findAllComponents(Select)[0].vm.$emit('update:modelValue', 'err.log');
    await flushPromises();
    expect(w.find('[data-testid="logs-output"]').text()).toContain('tail of err.log');
  });

  it('re-tails with a new line count', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    w.findAllComponents(Select)[1].vm.$emit('update:modelValue', 1000);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/logs/tail', { file: 'app.log', lines: '1000' });
  });

  it('tails all files merged and shows the truncated note', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    w.findAllComponents(Select)[0].vm.$emit('update:modelValue', ALL_LOGS);
    await flushPromises();
    expect(w.find('[data-testid="logs-output"]').text()).toContain('merged line');
    expect(w.find('.admin-logs__truncated').text()).toContain('more lines available across files');
  });

  it('polls on a 5s interval while auto-refresh is on, and stops on unmount', async () => {
    vi.useFakeTimers();
    const { client, get } = makeClient();
    const w = mountPage(client);
    await vi.advanceTimersByTimeAsync(0); // flush mount
    const tailCalls = () => get.mock.calls.filter((c) => c[0] === '/api/v1/admin/logs/tail').length;
    const before = tailCalls();
    w.findComponent(Switch).vm.$emit('update:modelValue', true);
    await vi.advanceTimersByTimeAsync(5000);
    expect(tailCalls()).toBeGreaterThan(before);
    const afterOne = tailCalls();
    w.unmount();
    await vi.advanceTimersByTimeAsync(10000);
    expect(tailCalls()).toBe(afterOne); // no polling after unmount
  });

  it('shows an in-body EmptyState error (+ toast) when listing fails', async () => {
    const get = vi.fn().mockRejectedValue(new Error('disk gone'));
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
    // R5.3c: the file-list failure now renders an in-body EmptyState instead of a
    // misleading "(no log files)" dropdown option.
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    expect(w.text()).toContain('disk gone');
    expect(w.text()).toContain('load log files');
    w.unmount();
  });

  it('retries the file-list load from the error state', async () => {
    let listCalls = 0;
    const get = vi.fn(async (endpoint: string, params?: Record<string, string>) => {
      if (endpoint === '/api/v1/admin/logs') {
        listCalls++;
        if (listCalls === 1) throw new Error('disk gone');
        return { files: [{ name: 'app.log', size: 1, modified_at: 't' }] };
      }
      if (endpoint === '/api/v1/admin/logs/tail') {
        return { file: params?.file, lines: ['recovered line'], truncated: false };
      }
      throw new Error(`unexpected ${endpoint}`);
    });
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.find('[data-testid="logs-output"]').text()).toContain('recovered line');
    w.unmount();
  });

  it('shows an EmptyState error when reading the log content fails', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/logs') return { files: [{ name: 'app.log', size: 1, modified_at: 't' }] };
      if (endpoint === '/api/v1/admin/logs/tail') throw new Error('read fail');
      throw new Error(`unexpected ${endpoint}`);
    });
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(toasts.toasts.some((t) => t.message === 'read fail')).toBe(true);
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    expect(w.text()).toContain('read fail');
    expect(w.text()).toContain('read log');
    w.unmount();
  });
});
