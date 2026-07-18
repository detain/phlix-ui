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
  it('lists files, defaults to the combined "All logs" view, and tails all', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // file + line-count selects present; file options include the combined view
    const selects = w.findAllComponents(Select);
    const fileOpts = selects[0].props('options') as { value: string; label: string }[];
    expect(fileOpts[0]).toEqual({ value: ALL_LOGS, label: 'All logs (combined)' });
    expect(fileOpts.map((o) => o.value)).toContain('app.log');
    // The default selection is the combined view, so it tails every file (not one).
    expect(selects[0].props('modelValue')).toBe(ALL_LOGS);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/logs/tail-all', { lines: '200' });
    expect(get).not.toHaveBeenCalledWith(
      '/api/v1/admin/logs/tail',
      expect.objectContaining({ file: 'app.log' }),
    );
    expect(w.find('[data-testid="logs-output"]').text()).toContain('merged line');
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
    // Combined view is the default, so the line-count change re-tails every file.
    expect(get).toHaveBeenCalledWith('/api/v1/admin/logs/tail-all', { lines: '1000' });
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
    // Default selection is the combined view, so polling re-tails via tail-all.
    const tailCalls = () => get.mock.calls.filter((c) => c[0] === '/api/v1/admin/logs/tail-all').length;
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
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/logs') {
        listCalls++;
        if (listCalls === 1) throw new Error('disk gone');
        return { files: [{ name: 'app.log', size: 1, modified_at: 't' }] };
      }
      // The default combined view reads content via tail-all after recovery.
      if (endpoint === '/api/v1/admin/logs/tail-all') {
        return { files: ['app.log'], lines: ['recovered line'], truncated: false };
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
      // The default combined view reads content via tail-all.
      if (endpoint === '/api/v1/admin/logs/tail-all') throw new Error('read fail');
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

// ---------------------------------------------------------------------------
// Renderer overhaul (U1–U6): parse-model, level+channel badges, local time,
// filename strip, cross-file combine. These exercise the actual parser with
// REAL Monolog-shaped lines and tail-all `%-22s`-prefixed lines.
// ---------------------------------------------------------------------------

type FakeFiles = { name: string; size: number; modified_at: string }[];

function makeRenderClient(opts: { files?: FakeFiles; tail?: string[]; tailAll?: string[] }) {
  const files: FakeFiles = opts.files ?? [{ name: 'app-2026-07-18.log', size: 1, modified_at: 't' }];
  const get = vi.fn(async (endpoint: string, params?: Record<string, string>) => {
    if (endpoint === '/api/v1/admin/logs') return { files };
    if (endpoint === '/api/v1/admin/logs/tail') {
      return { file: params?.file, lines: opts.tail ?? [], truncated: false };
    }
    if (endpoint === '/api/v1/admin/logs/tail-all') {
      return { files: files.map((f) => f.name), lines: opts.tailAll ?? [], truncated: false };
    }
    throw new Error(`unexpected ${endpoint}`);
  });
  return { client: { get } as unknown as ApiClient, get };
}

/** Mount and stay in the combined "All logs" view (the default selection). */
async function mountAll(tailAll: string[], files?: FakeFiles) {
  const { client } = makeRenderClient({ files, tailAll });
  const w = mountPage(client);
  await flushPromises();
  return w;
}

/** Mount and switch to a single file so its `tail` lines render. */
async function mountSingle(tail: string[], name = 'app-2026-07-18.log') {
  const { client } = makeRenderClient({ files: [{ name, size: 1, modified_at: 't' }], tail });
  const w = mountPage(client);
  await flushPromises();
  w.findAllComponents(Select)[0].vm.$emit('update:modelValue', name);
  await flushPromises();
  return w;
}

function outText(w: ReturnType<typeof mountPage>): string {
  return w.find('[data-testid="logs-output"]').text();
}
/** Direct-child <span>s of the <pre> = one per rendered (post-combine) row. */
function rowCount(w: ReturnType<typeof mountPage>): number {
  return w.find('[data-testid="logs-output"]').element.querySelectorAll(':scope > span').length;
}
function occurrences(hay: string, needle: string): number {
  return hay.split(needle).length - 1;
}

const REAL_LINE =
  '[2026-07-18T07:09:44.079957+00:00] http.DEBUG: HttpHandler.__invoke Application::dispatch [uid=52b7c64c9e95984e] {"channel":"http"}';

describe('Admin LogsPage — renderer overhaul', () => {
  it('emits exactly one level badge and one channel badge (no duplicate DEBUG)', async () => {
    const w = await mountSingle([REAL_LINE]);
    expect(w.findAll('.log-badge--debug')).toHaveLength(1);
    expect(w.findAll('.log-badge--channel')).toHaveLength(1);
    expect(w.find('.log-badge--debug').text()).toBe('DEBUG');
    expect(w.find('.log-badge--channel').text()).toBe('http');
    const text = outText(w);
    expect(text).not.toContain('http.DEBUG'); // the combined channel.LEVEL token is gone
    expect(occurrences(text, 'DEBUG')).toBe(1); // only the badge — no stray level text
    w.unmount();
  });

  it('keeps the message + context but strips the trailing empty %extra% []', async () => {
    const w = await mountSingle([`${REAL_LINE} []`]);
    const text = outText(w);
    expect(text).toContain('HttpHandler.__invoke Application::dispatch');
    expect(text).toContain('{"channel":"http"}');
    expect(text).not.toMatch(/\[\]\s*$/);
    w.unmount();
  });

  it('splits the tail-all %-22s filename column and strips it from the message', async () => {
    const w = await mountAll([`app-2026-07-18.log     ${REAL_LINE}`]);
    const text = outText(w);
    expect(text).not.toContain('app-2026-07-18.log'); // padded column consumed
    expect(text).not.toContain('.log'); // no filename token leaks into the row
    expect(text.trimStart().startsWith('app ')).toBe(true); // date-stripped source column
    expect(w.findAll('.log-badge--debug')).toHaveLength(1);
    expect(w.findAll('.log-badge--channel')).toHaveLength(1);
    w.unmount();
  });

  it('strips the filename column from bracket-less continuation lines (combined view)', async () => {
    // A normal entry followed by a continuation line (a stack frame) that carries
    // NO `[timestamp]` bracket. The server still prepends the padded filename
    // column to EVERY line, so that column must be consumed on the continuation
    // line too — not rendered verbatim as part of the message.
    const w = await mountAll([
      'app-2026-07-18.log     [2026-07-18T07:09:44.079957+00:00] http.ERROR: Uncaught RuntimeException',
      'app-2026-07-18.log     #0 /var/www/app/Http.php(42): dispatch()',
    ]);
    const rows = w
      .find('[data-testid="logs-output"]')
      .element.querySelectorAll(':scope > span');
    // The NaN-timestamp continuation never chain-merges with the entry above it.
    expect(rows).toHaveLength(2);
    const contText = rows[1].textContent ?? '';
    // The padded filename column is consumed — no filename token leaks through.
    expect(contText).not.toContain('app-2026-07-18.log');
    expect(contText).not.toContain('.log');
    // …yet the source column is still attributed to its file (date-stripped).
    expect(contText.trimStart().startsWith('app ')).toBe(true);
    expect(contText).toContain('#0 /var/www/app/Http.php(42)');
    w.unmount();
  });

  it('renders local 12-hour time with micros and OMITS today\'s date', async () => {
    const iso = new Date().toISOString().replace('Z', '+00:00');
    const w = await mountSingle([`[${iso}] http.INFO: today happened`]);
    const text = outText(w);
    expect(text).toMatch(/\d{1,2}:\d{2}:\d{2}\.\d+(AM|PM)/); // h:mm:ss.micros AM/PM
    expect(text).not.toMatch(/\d{4}-\d{2}-\d{2}/); // today's YYYY-MM-DD is dropped
    w.unmount();
  });

  it('includes a compact date for non-today entries and preserves full microseconds', async () => {
    const w = await mountSingle(['[2000-06-15T12:00:00.123456+00:00] http.INFO: long ago']);
    const text = outText(w);
    expect(text).toMatch(/\d{4}-\d{2}-\d{2}/); // date shown for a non-today entry
    expect(text).toContain('2000');
    expect(text).toContain('.123456'); // full sub-second precision retained (beyond ms)
    expect(text).toMatch(/(AM|PM)/);
    w.unmount();
  });

  it('strips the rotation date from filenames in the file dropdown (hyphen separator)', async () => {
    const { client } = makeRenderClient({
      files: [{ name: 'app-2026-07-18.log', size: 1, modified_at: 't' }],
    });
    const w = mountPage(client);
    await flushPromises();
    const opts = w.findAllComponents(Select)[0].props('options') as { value: string; label: string }[];
    expect(opts).toContainEqual({ value: 'app-2026-07-18.log', label: 'app' });
    w.unmount();
  });

  it('defensively strips an inline [LEVEL] datetime prefix from the message body', async () => {
    const legacy =
      '[2026-07-18T07:09:44.079957+00:00] http.DEBUG: [DEBUG] 2026-07-18 07:09:44.000 HttpHandler dispatch';
    const w = await mountSingle([legacy]);
    const text = outText(w);
    expect(text).not.toContain('[DEBUG] 2026-07-18'); // redundant inline prefix removed
    expect(text).toContain('HttpHandler dispatch');
    expect(occurrences(text, 'DEBUG')).toBe(1); // just the badge, no inline duplicate
    w.unmount();
  });

  it('combines identical concurrent lines across files into one row', async () => {
    const tail = '[2026-07-18T07:09:44.079957+00:00] http.DEBUG: same message here {"channel":"http"}';
    const w = await mountAll([
      `app-2026-07-18.log     ${tail}`,
      `events-2026-07-18.log  ${tail}`,
      `plugins-2026-07-18.log ${tail}`,
    ]);
    expect(rowCount(w)).toBe(1); // three files → a single merged row
    const text = outText(w);
    expect(text).toContain('app, events, plugins'); // comma-joined, sorted source list
    expect(w.findAll('.log-badge--debug')).toHaveLength(1); // not one badge per file
    expect(w.findAll('.log-badge--channel')).toHaveLength(1);
    w.unmount();
  });
});
