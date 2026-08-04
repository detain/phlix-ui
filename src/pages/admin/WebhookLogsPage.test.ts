/**
 * WebhookLogsPage — count pluralisation (S134).
 *
 * This page shipped with NO test file at all, which is why both of its plural
 * sites survived every count and why, once migrated, swapping the plural helper's
 * singular/plural arguments left the whole 244-file suite green. This file exists
 * to pin the two counts it renders — the total-entries badge and the per-row retry
 * badge — on both sides of one.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import WebhookLogsPage from './WebhookLogsPage.vue';
import type { ApiClient } from '../../api/client';
import type { WebhookDeliveryLog } from '../../api/admin/webhooks';

function log(over: Partial<WebhookDeliveryLog> = {}): WebhookDeliveryLog {
  return {
    id: 'log-1',
    webhook_id: 'wh-1',
    webhook_name: 'Alert Hook',
    event: 'media.added',
    status: 'success',
    attempted_at: 1700000000,
    status_code: 200,
    response_body: null,
    error_message: null,
    retry_count: 0,
    next_retry_at: null,
    ...over,
  };
}

function makeClient(opts: { logs?: WebhookDeliveryLog[]; total?: number } = {}) {
  const logs = opts.logs ?? [log()];
  const get = vi.fn(async (url: string) => {
    if (url.startsWith('/api/v1/admin/webhooks/logs')) {
      return { logs, total: opts.total ?? logs.length, page: 1, per_page: 50 };
    }
    if (url.startsWith('/api/v1/admin/webhooks')) return { webhooks: [] };
    throw new Error(`unexpected GET ${url}`);
  });
  const client = {
    get,
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  } as unknown as ApiClient;
  return { client, get };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(WebhookLogsPage, { props: { client }, attachTo: document.body });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('WebhookLogsPage — entry-count pluralisation (S134)', () => {
  it('renders the SINGULAR noun for exactly one entry', async () => {
    const { client } = makeClient({ total: 1 });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-webhook-logs__count').text()).toBe('1 entry');
    w.unmount();
  });

  it('renders the PLURAL noun for many entries and for zero', async () => {
    const many = makeClient({ total: 42 });
    const w = mountPage(many.client);
    await flushPromises();
    expect(w.find('.admin-webhook-logs__count').text()).toBe('42 entries');
    w.unmount();

    const none = makeClient({ logs: [], total: 0 });
    const w2 = mountPage(none.client);
    await flushPromises();
    expect(w2.find('.admin-webhook-logs__count').text()).toBe('0 entries');
    w2.unmount();
  });

  it('uses the IRREGULAR plural (entry/entries), which a suffix rule would get wrong', async () => {
    const { client } = makeClient({ total: 2 });
    const w = mountPage(client);
    await flushPromises();
    const text = w.find('.admin-webhook-logs__count').text();
    expect(text).toBe('2 entries');
    expect(text).not.toContain('entrys');
    w.unmount();
  });
});

describe('WebhookLogsPage — retry-count pluralisation (S134)', () => {
  it('renders the SINGULAR noun for exactly one retry', async () => {
    const { client } = makeClient({ logs: [log({ retry_count: 1, status: 'retry' })] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-webhook-logs__retry-badge').text()).toBe('1 retry');
    w.unmount();
  });

  it('renders the PLURAL noun for more than one retry', async () => {
    const { client } = makeClient({ logs: [log({ retry_count: 3, status: 'retry' })] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-webhook-logs__retry-badge').text()).toBe('3 retries');
    w.unmount();
  });

  it('hides the retry badge entirely at zero (no "0 retries" row)', async () => {
    const { client } = makeClient({ logs: [log({ retry_count: 0 })] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('.admin-webhook-logs__retry-badge').exists()).toBe(false);
    w.unmount();
  });
});
