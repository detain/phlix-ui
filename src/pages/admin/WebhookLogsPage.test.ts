/**
 * WebhookLogsPage — count pluralisation (S134).
 *
 * This page shipped with NO test file at all, which is why both of its plural
 * sites survived every count and why, once migrated, swapping the plural helper's
 * singular/plural arguments left the whole 244-file suite green. This file exists
 * to pin the two counts it renders — the total-entries badge and the per-row retry
 * badge — on both sides of one.
 *
 * S182 extension (2026-08-07). The S134 block above raised the page off zero
 * LINES but left it at `FNF:29 FNH:11` / `BRF:88 BRH:42` — it never fired the
 * filter watcher, the pager, retry, delete, row expansion or the error path, so
 * 18 of the page's 29 functions were still unexecuted. Everything from
 * `describe('WebhookLogsPage — filters …')` down is that gap, and each block names
 * the production line whose mutation it kills.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { computed } from 'vue';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import WebhookLogsPage from './WebhookLogsPage.vue';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Select from '../../components/ui/Select.vue';
import { ApiError } from '../../api/errors';
import { useToastStore } from '../../stores/useToastStore';
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

// ═══════════════════════════════════════════════════════════════════════════════
// S182 — the 18 functions the S134 block never reached.
// ═══════════════════════════════════════════════════════════════════════════════

/** Full-control client: every call is observable and independently failable. */
function makeRichClient(
  opts: {
    logs?: WebhookDeliveryLog[];
    total?: number;
    page?: number;
    perPage?: number;
    webhooks?: Array<{ id: string; name: string }>;
    listWebhooksError?: unknown;
    listLogsError?: unknown;
    retryResult?: { success: boolean; message: string };
    retryError?: unknown;
    deleteError?: unknown;
  } = {},
) {
  const logs = opts.logs ?? [logRow()];
  const logUrls: string[] = [];

  const get = vi.fn(async (url: string) => {
    if (url.startsWith('/api/v1/admin/webhooks/logs')) {
      logUrls.push(url);
      if (opts.listLogsError) throw opts.listLogsError;
      return {
        logs,
        total: opts.total ?? logs.length,
        page: opts.page ?? 1,
        per_page: opts.perPage ?? 50,
      };
    }
    if (url === '/api/v1/admin/webhooks') {
      if (opts.listWebhooksError) throw opts.listWebhooksError;
      return { webhooks: opts.webhooks ?? [] };
    }
    throw new Error(`unexpected GET ${url}`);
  });

  const post = vi.fn(async () => {
    if (opts.retryError) throw opts.retryError;
    return opts.retryResult ?? { success: true, message: 'queued' };
  });
  const del = vi.fn(async () => {
    if (opts.deleteError) throw opts.deleteError;
    return { message: 'gone' };
  });

  const client = {
    get,
    post,
    put: vi.fn(),
    patch: vi.fn(),
    delete: del,
  } as unknown as ApiClient;

  return { client, get, post, del, logUrls };
}

/** Alias so the S134 helper above stays untouched. */
function logRow(over: Partial<WebhookDeliveryLog> = {}): WebhookDeliveryLog {
  return log(over);
}

async function mountRich(client: ApiClient): Promise<VueWrapper> {
  const w = mount(WebhookLogsPage, { props: { client }, attachTo: document.body });
  await flushPromises();
  return w;
}

/** Every Button component rendered inside a row's actions cell, in DOM order. */
function rowButtons(w: VueWrapper, rowIndex: number) {
  const cell = w.findAll('.admin-webhook-logs__cell--actions')[rowIndex].element;
  return w.findAllComponents(Button).filter((b) => cell.contains(b.element));
}

/** The named action Button inside a row (`Retry` / `Delete`). */
function rowButton(w: VueWrapper, rowIndex: number, label: string) {
  const all = rowButtons(w, rowIndex);
  const btn = all.find((b) => b.text() === label);
  if (!btn) {
    throw new Error(
      `no "${label}" button in row ${rowIndex}; found: ` + all.map((b) => b.text()).join(', '),
    );
  }
  return btn;
}

describe('WebhookLogsPage — filters drive the request', () => {
  it('sends page + per_page and NO filter params on the first load', async () => {
    const { client, logUrls } = makeRichClient();
    await mountRich(client);
    expect(logUrls).toEqual(['/api/v1/admin/webhooks/logs?page=1&per_page=50']);
  });

  it('adds webhook_id when a webhook is picked, and resets to page 1', async () => {
    const { client, logUrls } = makeRichClient({ total: 500, page: 3 });
    const w = await mountRich(client);
    // The page reported page 3 back, so `page` is now 3 — a mutation that drops
    // `page.value = 1` from onFilterChange leaves `page=3` in the next URL.
    expect(w.find('.admin-webhook-logs__pagination-info').text()).toBe('Page 3 of 10');

    const webhookSelect = w.findAllComponents(Select)[0];
    await webhookSelect.vm.$emit('update:modelValue', 'wh-42');
    await flushPromises();

    expect(logUrls.at(-1)).toBe(
      '/api/v1/admin/webhooks/logs?webhook_id=wh-42&page=1&per_page=50',
    );
  });

  it('adds status when a status is picked', async () => {
    const { client, logUrls } = makeRichClient();
    const w = await mountRich(client);
    await w.findAllComponents(Select)[1].vm.$emit('update:modelValue', 'failed');
    await flushPromises();
    expect(logUrls.at(-1)).toBe('/api/v1/admin/webhooks/logs?status=failed&page=1&per_page=50');
  });

  it('combines BOTH filters, and clearing one drops only that param', async () => {
    const { client, logUrls } = makeRichClient();
    const w = await mountRich(client);
    await w.findAllComponents(Select)[0].vm.$emit('update:modelValue', 'wh-1');
    await w.findAllComponents(Select)[1].vm.$emit('update:modelValue', 'retry');
    await flushPromises();
    expect(logUrls.at(-1)).toBe(
      '/api/v1/admin/webhooks/logs?webhook_id=wh-1&status=retry&page=1&per_page=50',
    );

    // '' is the "All statuses" sentinel; `if (selectedStatus.value)` must treat it
    // as absent. Changing `if (x)` to `if (x !== undefined)` reds this.
    await w.findAllComponents(Select)[1].vm.$emit('update:modelValue', '');
    await flushPromises();
    expect(logUrls.at(-1)).toBe('/api/v1/admin/webhooks/logs?webhook_id=wh-1&page=1&per_page=50');
  });

  it('offers the five documented status options with "All statuses" first', async () => {
    const { client } = makeRichClient();
    const w = await mountRich(client);
    const options = w.findAllComponents(Select)[1].props('options') as ReadonlyArray<{
      value: string;
      label: string;
    }>;
    expect(options.map((o) => o.value)).toEqual(['', 'success', 'failed', 'pending', 'retry']);
    expect(options[0].label).toBe('All statuses');
  });

  it('builds the webhook dropdown from the webhook list, prefixed by "All webhooks"', async () => {
    const { client } = makeRichClient({
      webhooks: [
        { id: 'wh-1', name: 'Alert Hook' },
        { id: 'wh-2', name: 'Archive Hook' },
      ],
    });
    const w = await mountRich(client);
    const options = w.findAllComponents(Select)[0].props('options') as ReadonlyArray<{
      value: string;
      label: string;
    }>;
    expect(options).toEqual([
      { value: '', label: 'All webhooks' },
      { value: 'wh-1', label: 'Alert Hook' },
      { value: 'wh-2', label: 'Archive Hook' },
    ]);
  });

  it('degrades to an empty webhook dropdown — but still loads LOGS — when the webhook list 500s', async () => {
    // loadWebhooks() swallows its error on purpose ("non-critical"). The point of
    // this test is that the swallow does not also swallow the log load: deleting
    // the try/catch there aborts onMounted before loadLogs() and reds this.
    const { client, logUrls } = makeRichClient({ listWebhooksError: new ApiError('boom', 500) });
    const w = await mountRich(client);
    expect(w.findAllComponents(Select)[0].props('options')).toEqual([
      { value: '', label: 'All webhooks' },
    ]);
    expect(logUrls).toHaveLength(1);
    expect(w.findAll('.admin-webhook-logs__row')).toHaveLength(1);
    // …and it stays silent: a swallowed non-critical failure must not toast.
    expect(useToastStore().toasts).toHaveLength(0);
  });
});

describe('WebhookLogsPage — pagination', () => {
  it('renders "Page p of ceil(total/perPage)"', async () => {
    const { client } = makeRichClient({ total: 101, perPage: 50, page: 2 });
    const w = await mountRich(client);
    expect(w.find('.admin-webhook-logs__pagination-info').text()).toBe('Page 2 of 3');
  });

  it('shows "of 1" — not "of 0" — when there are no pages at all', async () => {
    // `Math.ceil(0/50) || 1`. Replacing `|| 1` with `?? 1` renders "Page 1 of 0"
    // because 0 is not nullish; that is the S177 `0`-is-not-`undefined` trap.
    const { client } = makeRichClient({ logs: [logRow()], total: 0, perPage: 50 });
    const w = await mountRich(client);
    expect(w.find('.admin-webhook-logs__pagination-info').text()).toBe('Page 1 of 1');
  });

  it('DISABLES Previous on page 1 and Next on the last page', async () => {
    // ⚠ Attribute assertions, not trigger()-and-observe-nothing: VTU no-ops on a
    // disabled element, so a click-based test would pass with both guards deleted.
    const { client } = makeRichClient({ total: 50, perPage: 50, page: 1 });
    const w = await mountRich(client);
    const [prev, next] = w.findAll('.admin-webhook-logs__pagination-btns button');
    expect(prev.attributes('disabled')).toBe('');
    expect(next.attributes('disabled')).toBe('');
  });

  it('ENABLES both on a middle page — the control proving the assertion above can fail', async () => {
    const { client } = makeRichClient({ total: 150, perPage: 50, page: 2 });
    const w = await mountRich(client);
    const [prev, next] = w.findAll('.admin-webhook-logs__pagination-btns button');
    expect(prev.attributes('disabled')).toBeUndefined();
    expect(next.attributes('disabled')).toBeUndefined();
  });

  it('Next requests page+1 and Previous requests page-1', async () => {
    const { client, logUrls } = makeRichClient({ total: 150, perPage: 50, page: 2 });
    const w = await mountRich(client);
    const [prev, next] = w.findAll('.admin-webhook-logs__pagination-btns button');

    await next.trigger('click');
    await flushPromises();
    expect(logUrls.at(-1)).toBe('/api/v1/admin/webhooks/logs?page=3&per_page=50');

    await prev.trigger('click');
    await flushPromises();
    // The stub always replies `page: 2`, so Previous is computed from 2 → 1.
    expect(logUrls.at(-1)).toBe('/api/v1/admin/webhooks/logs?page=1&per_page=50');
  });

  it('carries the active filters into a page change', async () => {
    const { client, logUrls } = makeRichClient({ total: 150, perPage: 50, page: 2 });
    const w = await mountRich(client);
    await w.findAllComponents(Select)[1].vm.$emit('update:modelValue', 'failed');
    await flushPromises();

    await w.findAll('.admin-webhook-logs__pagination-btns button')[1].trigger('click');
    await flushPromises();
    expect(logUrls.at(-1)).toBe(
      '/api/v1/admin/webhooks/logs?status=failed&page=3&per_page=50',
    );
  });
});

describe('WebhookLogsPage — status badge tone', () => {
  it('maps each status to its own tone, and anything else to neutral', async () => {
    const { client } = makeRichClient({
      logs: [
        logRow({ id: 'a', status: 'success' }),
        logRow({ id: 'b', status: 'failed' }),
        logRow({ id: 'c', status: 'retry' }),
        logRow({ id: 'd', status: 'pending' }),
      ],
    });
    const w = await mountRich(client);
    const tones = w
      .findAll('.admin-webhook-logs__cell--status')
      .map((c) => c.findComponent(Badge).props('tone'));
    // Exact ordered compare: a swapped `failed`/`retry` arm is invisible to a
    // set-membership or `toContain` check.
    expect(tones).toEqual(['success', 'error', 'warning', 'neutral']);
  });

  it('renders the raw status word in the badge', async () => {
    const { client } = makeRichClient({ logs: [logRow({ status: 'pending' })] });
    const w = await mountRich(client);
    expect(w.find('.admin-webhook-logs__cell--status .phlix-badge').text()).toBe('pending');
  });

  it('renders an em-dash placeholder when status_code is null, and the code otherwise', async () => {
    const { client } = makeRichClient({
      logs: [logRow({ id: 'a', status_code: null }), logRow({ id: 'b', status_code: 502 })],
    });
    const w = await mountRich(client);
    const cells = w.findAll('.admin-webhook-logs__cell--code');
    expect(cells[0].find('.admin-webhook-logs__no-code').text()).toBe('—');
    expect(cells[1].find('.admin-webhook-logs__no-code').exists()).toBe(false);
    expect(cells[1].text()).toBe('502');
  });

  it('renders status_code 0 as the code, not as the placeholder', async () => {
    // `log.status_code !== null` must not decay to a truthiness test: 0 is a real
    // (if odd) code and `v-if="log.status_code"` would hide it.
    const { client } = makeRichClient({ logs: [logRow({ status_code: 0 })] });
    const w = await mountRich(client);
    expect(w.find('.admin-webhook-logs__cell--code').text()).toBe('0');
  });
});

describe('WebhookLogsPage — row expansion', () => {
  it('is collapsed initially and opens the detail row on a row click', async () => {
    const { client } = makeRichClient({ logs: [logRow({ id: 'log-x', webhook_id: 'wh-9' })] });
    const w = await mountRich(client);
    expect(w.find('.admin-webhook-logs__detail-row').exists()).toBe(false);

    await w.find('.admin-webhook-logs__row').trigger('click');
    const detail = w.find('.admin-webhook-logs__detail-row');
    expect(detail.exists()).toBe(true);
    expect(w.find('.admin-webhook-logs__row').classes()).toContain(
      'admin-webhook-logs__row--expanded',
    );

    const codes = detail.findAll('code.admin-webhook-logs__detail-value').map((c) => c.text());
    expect(codes).toEqual(['log-x', 'wh-9']);
  });

  it('toggles CLOSED on a second click of the same row', async () => {
    const { client } = makeRichClient();
    const w = await mountRich(client);
    await w.find('.admin-webhook-logs__row').trigger('click');
    expect(w.find('.admin-webhook-logs__detail-row').exists()).toBe(true);
    await w.find('.admin-webhook-logs__row').trigger('click');
    // `expandedId === id ? null : id` — dropping the ternary's null arm reds here.
    expect(w.find('.admin-webhook-logs__detail-row').exists()).toBe(false);
  });

  it('opens only ONE row at a time — clicking a second row closes the first', async () => {
    const { client } = makeRichClient({ logs: [logRow({ id: 'a' }), logRow({ id: 'b' })] });
    const w = await mountRich(client);
    await w.findAll('.admin-webhook-logs__row')[0].trigger('click');
    await w.findAll('.admin-webhook-logs__row')[1].trigger('click');

    const details = w.findAll('.admin-webhook-logs__detail-row');
    expect(details).toHaveLength(1);
    expect(details[0].find('code').text()).toBe('b');
  });

  it('omits the optional detail fields when the log carries none', async () => {
    const { client } = makeRichClient({
      logs: [logRow({ next_retry_at: null, error_message: null, response_body: null })],
    });
    const w = await mountRich(client);
    await w.find('.admin-webhook-logs__row').trigger('click');
    const detail = w.find('.admin-webhook-logs__detail-row');
    expect(detail.findAll('.admin-webhook-logs__detail-item')).toHaveLength(2);
    expect(detail.find('.admin-webhook-logs__detail-value--error').exists()).toBe(false);
    expect(detail.find('.admin-webhook-logs__detail-value--pre').exists()).toBe(false);
  });

  it('shows the error message and the response body when present', async () => {
    const { client } = makeRichClient({
      logs: [
        logRow({
          status: 'failed',
          next_retry_at: 1700003600,
          error_message: 'connect ETIMEDOUT',
          response_body: '{"err":"gateway"}',
        }),
      ],
    });
    const w = await mountRich(client);
    await w.find('.admin-webhook-logs__row').trigger('click');
    const detail = w.find('.admin-webhook-logs__detail-row');
    expect(detail.find('.admin-webhook-logs__detail-value--error').text()).toBe(
      'connect ETIMEDOUT',
    );
    expect(detail.find('.admin-webhook-logs__detail-value--pre').text()).toBe(
      '{"err":"gateway"}',
    );
    // next_retry_at renders through the same formatter as attempted_at.
    expect(detail.findAll('.admin-webhook-logs__detail-item')).toHaveLength(5);
    expect(detail.findAll('.admin-webhook-logs__detail-label').map((l) => l.text())).toContain(
      'Next retry',
    );
  });

  it('does NOT expand when the click lands on the actions cell (@click.stop)', async () => {
    const { client } = makeRichClient();
    const w = await mountRich(client);
    await w.find('.admin-webhook-logs__cell--actions').trigger('click');
    // Removing `@click.stop` lets the click bubble to the row handler and expand it.
    expect(w.find('.admin-webhook-logs__detail-row').exists()).toBe(false);
  });

  it('formats attempted_at from SECONDS, not milliseconds', async () => {
    const { client } = makeRichClient({ logs: [logRow({ attempted_at: 1700000000 })] });
    const w = await mountRich(client);
    expect(w.find('.admin-webhook-logs__cell--time').text()).toBe(
      new Date(1700000000 * 1000).toLocaleString(),
    );
    // Dropping the `* 1000` yields 1970; assert that specific wrong answer is absent.
    expect(w.find('.admin-webhook-logs__cell--time').text()).not.toBe(
      new Date(1700000000).toLocaleString(),
    );
  });
});

describe('WebhookLogsPage — retry action', () => {
  it('offers Retry ONLY on a failed delivery; Delete is always offered', async () => {
    const { client } = makeRichClient({
      logs: [logRow({ id: 'a', status: 'failed' }), logRow({ id: 'b', status: 'success' })],
    });
    const w = await mountRich(client);
    const labels = [rowButtons(w, 0), rowButtons(w, 1)].map((bs) => bs.map((b) => b.text()));
    expect(labels).toEqual([['Retry', 'Delete'], ['Delete']]);
  });

  it('POSTs the retry, toasts success and RELOADS the list', async () => {
    const { client, post, logUrls } = makeRichClient({
      logs: [logRow({ id: 'log-77', status: 'failed' })],
    });
    const w = await mountRich(client);
    expect(logUrls).toHaveLength(1);

    await rowButton(w, 0, 'Retry').trigger('click');
    await flushPromises();

    expect(post).toHaveBeenCalledWith('/api/v1/admin/webhooks/logs/log-77/retry');
    expect(logUrls).toHaveLength(2);
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['success', 'Delivery re-queued successfully.'],
    ]);
  });

  it('toasts the server MESSAGE when the retry replies success:false', async () => {
    const { client } = makeRichClient({
      logs: [logRow({ status: 'failed' })],
      retryResult: { success: false, message: 'endpoint still unreachable' },
    });
    const w = await mountRich(client);
    await rowButton(w, 0, 'Retry').trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'endpoint still unreachable'],
    ]);
  });

  it('falls back to generic copy when success:false carries an EMPTY message', async () => {
    // `result.message || 'Failed to re-queue delivery.'` — `??` would toast ''.
    const { client } = makeRichClient({
      logs: [logRow({ status: 'failed' })],
      retryResult: { success: false, message: '' },
    });
    const w = await mountRich(client);
    await rowButton(w, 0, 'Retry').trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.map((t) => t.message)).toEqual([
      'Failed to re-queue delivery.',
    ]);
  });

  it('toasts the THROWN message and does NOT reload when the retry rejects', async () => {
    const { client, logUrls } = makeRichClient({
      logs: [logRow({ status: 'failed' })],
      retryError: new ApiError('409 already queued', 409),
    });
    const w = await mountRich(client);
    await rowButton(w, 0, 'Retry').trigger('click');
    await flushPromises();

    expect(logUrls).toHaveLength(1);
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', '409 already queued'],
    ]);
  });

  it('re-enables the row after a retry, because `retryingId` is cleared in finally', async () => {
    const { client, post } = makeRichClient({ logs: [logRow({ status: 'failed' })] });
    const w = await mountRich(client);
    await rowButton(w, 0, 'Retry').trigger('click');
    await flushPromises();
    expect(rowButton(w, 0, 'Retry').props('loading')).toBe(false);

    // A second retry must actually fire: a leaked `retryingId` makes the
    // `if (retryingId.value !== null) return;` re-entrancy guard permanent.
    await rowButton(w, 0, 'Retry').trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledTimes(2);
  });

  it('the re-entrancy guard stops a SECOND concurrent retry', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => {
      release = r;
    });
    const post = vi.fn(async () => {
      await gate;
      return { success: true, message: 'ok' };
    });
    const get = vi.fn(async (url: string) => {
      if (url.startsWith('/api/v1/admin/webhooks/logs')) {
        return {
          logs: [logRow({ id: 'a', status: 'failed' }), logRow({ id: 'b', status: 'failed' })],
          total: 2,
          page: 1,
          per_page: 50,
        };
      }
      return { webhooks: [] };
    });
    const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;

    const w = await mountRich(client);
    await rowButton(w, 0, 'Retry').trigger('click');
    await rowButton(w, 1, 'Retry').trigger('click');
    // Deleting the guard lets the second click through → 2 POSTs.
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/webhooks/logs/a/retry');

    release();
    await flushPromises();
  });
});

describe('WebhookLogsPage — delete action', () => {
  it('DELETEs the log, toasts and reloads', async () => {
    const { client, del, logUrls } = makeRichClient({ logs: [logRow({ id: 'log 9/9' })] });
    const w = await mountRich(client);
    await rowButton(w, 0, 'Delete').trigger('click');
    await flushPromises();

    // The id is percent-encoded by the API layer; assert the encoded form.
    expect(del).toHaveBeenCalledWith('/api/v1/admin/webhooks/logs/log%209%2F9');
    expect(logUrls).toHaveLength(2);
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['success', 'Log entry deleted.'],
    ]);
  });

  it('toasts the THROWN message and does not reload when the delete rejects', async () => {
    const { client, logUrls } = makeRichClient({
      deleteError: new ApiError('log is pinned', 423),
    });
    const w = await mountRich(client);
    await rowButton(w, 0, 'Delete').trigger('click');
    await flushPromises();
    expect(logUrls).toHaveLength(1);
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'log is pinned'],
    ]);
  });

  it('uses the FALLBACK copy when the thrown value carries no message', async () => {
    const { client } = makeRichClient({ deleteError: { code: 'ENOTANERROR' } });
    const w = await mountRich(client);
    await rowButton(w, 0, 'Delete').trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.map((t) => t.message)).toEqual([
      'Failed to delete log entry.',
    ]);
  });

  it('clears `deletingId` in finally so a second delete can fire', async () => {
    const { client, del } = makeRichClient();
    const w = await mountRich(client);
    await rowButton(w, 0, 'Delete').trigger('click');
    await flushPromises();
    await rowButton(w, 0, 'Delete').trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledTimes(2);
  });
});

describe('WebhookLogsPage — list states', () => {
  it('shows the skeleton before the first load resolves, then the table', async () => {
    const { client } = makeRichClient();
    const w = mount(WebhookLogsPage, { props: { client }, attachTo: document.body });
    expect(w.find('.admin-webhook-logs__skel').exists()).toBe(true);
    expect(w.find('.admin-webhook-logs__table').exists()).toBe(false);
    await flushPromises();
    expect(w.find('.admin-webhook-logs__skel').exists()).toBe(false);
    expect(w.find('.admin-webhook-logs__table').exists()).toBe(true);
  });

  it('shows the empty state — not the error state — for a successful EMPTY page', async () => {
    const { client } = makeRichClient({ logs: [], total: 0 });
    const w = await mountRich(client);
    // A succeeding control beside the error case below: same component, different
    // title, so "an EmptyState exists" can never stand in for "the right one".
    expect(w.findComponent(EmptyState).props('title')).toBe('No webhook logs yet');
    expect(w.find('.admin-webhook-logs__table').exists()).toBe(false);
    expect(useToastStore().toasts).toHaveLength(0);
  });

  it('shows the ERROR state, toasts, and empties the table when the list rejects', async () => {
    const { client } = makeRichClient({ listLogsError: new ApiError('logs table locked', 503) });
    const w = await mountRich(client);
    expect(w.findComponent(EmptyState).props('title')).toBe("Couldn't load webhook logs");
    expect(w.find('.admin-webhook-logs__table').exists()).toBe(false);
    expect(useToastStore().toasts.map((t) => [t.tone, t.message])).toEqual([
      ['error', 'logs table locked'],
    ]);
  });

  it('uses the FALLBACK copy when the list rejects with no message', async () => {
    const { client } = makeRichClient({ listLogsError: { status: 500 } });
    await mountRich(client);
    expect(useToastStore().toasts.map((t) => t.message)).toEqual([
      'Failed to load webhook logs.',
    ]);
  });

  it('the error-state Retry button reloads and recovers the table', async () => {
    let fail = true;
    const get = vi.fn(async (url: string) => {
      if (url.startsWith('/api/v1/admin/webhooks/logs')) {
        if (fail) throw new ApiError('down', 503);
        return { logs: [logRow()], total: 1, page: 1, per_page: 50 };
      }
      return { webhooks: [] };
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;

    const w = await mountRich(client);
    expect(w.findComponent(EmptyState).props('title')).toBe("Couldn't load webhook logs");

    fail = false;
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();

    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.findAll('.admin-webhook-logs__row')).toHaveLength(1);
  });

  it('DROPS the stale row set from state when a later load fails', async () => {
    // ⚠ This assertion is on component STATE, not on the DOM, and the reason is
    // measured rather than stylistic. `logs.value = []` in loadLogs()'s catch is
    // NOT observable through the template: `v-else-if="error"` wins over both the
    // empty state and the table for as long as `error` is set, and `error` is only
    // cleared at the top of the next loadLogs() — which immediately sets
    // `loading = true` and then overwrites `logs` on success. A DOM-level version
    // of this test SURVIVED the mutation that deletes the line (verified 2026-08-07,
    // S182 mutation run W5) because the error state renders no rows either way.
    // Reading the ref pins the line the template cannot reach.
    let fail = false;
    const get = vi.fn(async (url: string) => {
      if (url.startsWith('/api/v1/admin/webhooks/logs')) {
        if (fail) throw new ApiError('down', 503);
        return { logs: [logRow()], total: 7, page: 1, per_page: 50 };
      }
      return { webhooks: [] };
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;

    const w = await mountRich(client);
    const vm = w.vm as unknown as { logs: WebhookDeliveryLog[]; total: number };
    // Control: the array really is populated, so the assertion below can fail.
    expect(vm.logs).toHaveLength(1);

    fail = true;
    await w.findAllComponents(Select)[1].vm.$emit('update:modelValue', 'failed');
    await flushPromises();

    expect(vm.logs).toEqual([]);
    // …and only `logs` is reset. `total` is deliberately left alone, so a mutation
    // that "fixes" this by clearing everything in the catch reds here.
    expect(vm.total).toBe(7);
    expect(w.findComponent(EmptyState).props('title')).toBe("Couldn't load webhook logs");
  });

  it('renders the table header columns in the documented order', async () => {
    const { client } = makeRichClient();
    const w = await mountRich(client);
    expect(w.findAll('th').map((h) => h.text())).toEqual([
      'Webhook',
      'Event',
      'Status',
      'Time',
      'Code',
      'Actions',
    ]);
  });

  it('renders the webhook name and event verbatim per row', async () => {
    const { client } = makeRichClient({
      logs: [logRow({ webhook_name: 'Archive Hook', event: 'media.removed' })],
    });
    const w = await mountRich(client);
    expect(w.find('.admin-webhook-logs__cell--webhook').text()).toBe('Archive Hook');
    expect(w.find('.admin-webhook-logs__cell--event').text()).toBe('media.removed');
  });
});

describe('WebhookLogsPage — the `apiBase` injection seam', () => {
  // With no `client` prop the page builds TWO ApiClients (one per API wrapper)
  // from the injected `apiBase`, which may be a plain string OR a ComputedRef.
  // `baseUrl` is private, so both arms are observed through the fetch URL.
  function captureFetchUrls(): string[] {
    const urls: string[] = [];
    vi.mocked(globalThis.fetch).mockImplementation(async (input: RequestInfo | URL) => {
      urls.push(String(input));
      throw new TypeError('network down');
    });
    return urls;
  }

  it('prefixes BOTH wrappers with a ComputedRef apiBase (the non-string arm)', async () => {
    const urls = captureFetchUrls();
    const w = mount(WebhookLogsPage, {
      global: { provide: { apiBase: computed(() => 'https://relay.example/s/4') } },
      attachTo: document.body,
    });
    await flushPromises();

    expect(urls).toContain('https://relay.example/s/4/api/v1/admin/webhooks');
    expect(urls).toContain(
      'https://relay.example/s/4/api/v1/admin/webhooks/logs?page=1&per_page=50',
    );
    expect(w.findComponent(EmptyState).props('title')).toBe("Couldn't load webhook logs");
  });

  it('prefixes requests with a plain-string apiBase (the string arm)', async () => {
    const urls = captureFetchUrls();
    mount(WebhookLogsPage, {
      global: { provide: { apiBase: 'https://direct.example' } },
      attachTo: document.body,
    });
    await flushPromises();

    expect(urls).toContain('https://direct.example/api/v1/admin/webhooks/logs?page=1&per_page=50');
    // Control against the ComputedRef case: a mutation that always reads `.value`
    // makes every URL start with "undefined" here.
    expect(urls.some((u) => u.startsWith('undefined'))).toBe(false);
  });
});
