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
import Button from '../../components/ui/Button.vue';
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

  // CU-102 (ui__secaudit #2): highlightJson used to hand-escape only `< > &`
  // before interpolating the captured key/value into span markup — quotes rode
  // through unescaped while the file's own complete 5-entity escapeHtml sat
  // unused below. The cure routes EVERY fragment through escapeHtml. The law
  // lives on the STRING fed to v-html (the DOM re-serializes entities back to
  // characters, hiding it), so it is pinned on the function's own output —
  // the script-setup binding, reachable through the dev-mode instance proxy.
  it('JSON decoration escapes quotes through the complete helper (CU-102)', async () => {
    const w = await mountAll(['app-2026-07-18.log     {"user":"a\'b","n":5}']);
    const highlight = (w.vm as unknown as Record<string, unknown>).highlightJson as
      | ((text: string) => string)
      | undefined;
    expect(typeof highlight, 'highlightJson is exposed as a script-setup binding').toBe(
      'function',
    );

    const html = highlight!('{"user":"a\'b <i>","n":5,"ok":true,"gone":null}');
    // Decoration survives: key + all four value classes still emitted.
    expect(html).toContain('<span class="json-key">');
    expect(html).toContain('<span class="json-string">');
    expect(html).toContain('<span class="json-number">');
    expect(html).toContain('<span class="json-boolean">');
    expect(html).toContain('<span class="json-null">');
    // Every quote from the line arrives escaped — &quot; AND &#39; are the
    // two entities the old 3-entity pre-pass dropped (RED AT PARENT).
    expect(html).toContain('&quot;user&quot;');
    expect(html).toContain('&#39;');
    expect(html).toContain('&lt;i&gt;');
    expect(html).not.toMatch(/<span class="json-key">"/);
    w.unmount();
  });

  // Companion to the DOM-level "CU-102 legs" pin below, asserted on the STRING
  // fed to v-html (this file's own doctrine: the DOM re-serializes entities
  // back to characters, hiding the law). Entity-exact coverage of both non-JSON
  // legs: markup between two decorated tokens (loop leg) and an apostrophe
  // after the final token (tail leg). Mutation proof: stripping either leg's
  // escapeHtml call reddens this test and the DOM-level pin.
  it('inter-match and trailing fragments both route through escapeHtml', async () => {
    const w = await mountAll(['app-2026-07-18.log     {"a":1}']);
    const highlight = (w.vm as unknown as Record<string, unknown>).highlightJson as
      | ((text: string) => string)
      | undefined;
    expect(typeof highlight).toBe('function');

    const html = highlight!('{"a":1 <bad> "b":"x" tail\'y}');
    // Loop leg: raw text between matches arrives escaped, never as live markup.
    expect(html).toContain('&lt;bad&gt;');
    expect(html).not.toContain('<bad>');
    // Tail leg: text after the final match escapes the apostrophe entity.
    expect(html).toContain('tail&#39;y');
    expect(html).not.toContain("tail'y");
    w.unmount();
  });

  it('markup payload in a log line stays inert text (regression pin)', async () => {
    const w = await mountAll([
      'app-2026-07-18.log     {"xss":"<img src=x onerror=alert(1)>"}',
    ]);
    const pre = w.find('[data-testid="logs-output"]');
    expect(pre.element.querySelectorAll('img')).toHaveLength(0);
    expect(pre.text()).toContain('{"xss":"<img src=x onerror=alert(1)>"}');
    w.unmount();
  });

  // Banked w11L9 minor: the two escapeHtml legs that carry the PLAIN TEXT
  // between (and after) the JSON matches had zero teeth — both existing pins
  // put the payload INSIDE a matched value, so deleting either leg still
  // passed. Payloads before AND after a real JSON pair hit both legs; mutation
  // proof: stripping either leg's escapeHtml lands live markup in the sink.
  it('markup payloads in the NON-JSON legs around a match stay inert text (CU-102 legs)', async () => {
    const w = await mountAll([
      'app-2026-07-18.log     <img src=x onerror=alert(1)> {"a": 1} <img src=y onerror=alert(2)>',
    ]);
    const pre = w.find('[data-testid="logs-output"]');
    // Inter-match leg + trailing leg both escaped: no live elements from either.
    expect(pre.element.querySelectorAll('img')).toHaveLength(0);
    expect(pre.text()).toContain('<img src=x onerror=alert(1)>');
    expect(pre.text()).toContain('<img src=y onerror=alert(2)>');
    // The JSON decoration itself still rendered (this is not a "no matches"
    // vacuous pass).
    expect(pre.element.querySelector('.json-key')).not.toBeNull();
    expect(pre.element.querySelector('.json-number')).not.toBeNull();
    w.unmount();
  });
});

// ---------------------------------------------------------------------------
// CU-116 (review ui__webux #11/#12): the background-poll discipline. A failed
// tick keeps what is on screen, marks the toolbar, and toasts at most once per
// streak; the announcement channel is the delta note, not the whole log body.
// ---------------------------------------------------------------------------
describe('Admin LogsPage — background-poll discipline (CU-116)', () => {
  /** List always fine; tail-all succeeds `okRounds` times, then fails forever. */
  function makeFlakyClient(okRounds: number, linesForRound?: (n: number) => string[]) {
    let tails = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/logs') {
        return { files: [{ name: 'app.log', size: 1, modified_at: 't' }] };
      }
      if (endpoint === '/api/v1/admin/logs/tail-all') {
        tails++;
        if (tails > okRounds) throw new Error('tail down');
        return {
          files: ['app.log'],
          lines: linesForRound ? linesForRound(tails) : ['line A', 'line B'],
          truncated: false,
        };
      }
      throw new Error(`unexpected ${endpoint}`);
    });
    return { get, tailCount: () => tails };
  }
  const retarget = (w: ReturnType<typeof mountPage>, lines: number) => {
    // Any change of the Lines select re-runs the (non-manual) read path.
    w.findAllComponents(Select)[1].vm.$emit('update:modelValue', lines);
    return flushPromises();
  };

  it('a failed background re-read keeps the visible tail and marks the toolbar', async () => {
    const { get } = makeFlakyClient(1);
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    expect(w.find('[data-testid="logs-output"]').text()).toContain('line A');
    await retarget(w, 1000); // background tick → fails
    expect(w.find('[data-testid="logs-output"]').text(), 'tail preserved').toContain('line A');
    expect(w.findComponent(EmptyState).exists(), 'pane NOT blanked').toBe(false);
    expect(w.find('.admin-logs__poll-error').text()).toContain('Last update failed at');
    w.unmount();
  });

  it('toasts once per failure streak, not once per 5s tick', async () => {
    const { get } = makeFlakyClient(1);
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    const errToasts = () => toasts.toasts.filter((t) => t.message === 'tail down').length;
    expect(errToasts()).toBe(0);
    await retarget(w, 1000); // streak starts → exactly one toast
    expect(errToasts()).toBe(1);
    await retarget(w, 1500); // second tick, same streak
    await retarget(w, 2000); // third tick — the old code had toasted 3 times here
    expect(errToasts(), 'stream suppressed within the streak').toBe(1);
    w.unmount();
  });

  it('a manual Retry toasts even mid-streak, and a fresh streak re-alerts', async () => {
    const { get } = makeFlakyClient(1);
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    const errToasts = () => toasts.toasts.filter((t) => t.message === 'tail down').length;
    await retarget(w, 1000); // background → toast 1
    const refreshBtn = w.findAllComponents(Button).find((b) => b.text().includes('Refresh'));
    await refreshBtn!.trigger('click'); // manual inside the streak → toast 2
    await flushPromises();
    expect(errToasts()).toBe(2);
    w.unmount();
  });

  it('success clears the failure mark and the next streak starts alerting again', async () => {
    let failNext = false;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/logs') return { files: [{ name: 'app.log', size: 1, modified_at: 't' }] };
      if (endpoint === '/api/v1/admin/logs/tail-all') {
        if (failNext) throw new Error('tail down');
        return { files: ['app.log'], lines: ['line A'], truncated: false };
      }
      throw new Error(`unexpected ${endpoint}`);
    });
    const w = mountPage({ get } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    failNext = true;
    await retarget(w, 1000);
    expect(w.find('.admin-logs__poll-error').exists()).toBe(true);
    failNext = false;
    await retarget(w, 1500); // recovery
    expect(w.find('.admin-logs__poll-error').exists(), 'note cleared on success').toBe(false);
    failNext = true;
    await retarget(w, 2000); // NEW streak → toasts again (not muted by the old one)
    expect(toasts.toasts.filter((t) => t.message === 'tail down').length).toBe(2);
    w.unmount();
  });

  it('the log body is no longer a live region; the delta note is (CU-116 #12)', async () => {
    const { get } = makeFlakyClient(99, (n) => (n === 1 ? ['line A'] : ['line A', 'line B']));
    const w = mountPage({ get } as unknown as ApiClient);
    await flushPromises();
    const pre = w.find('[data-testid="logs-output"]');
    expect(pre.attributes('aria-live'), 'blanket live region removed').toBeUndefined();
    expect(w.find('[data-testid="logs-update-note"]').exists(), 'quiet until something arrives').toBe(false);
    await retarget(w, 1000);
    expect(w.find('[data-testid="logs-update-note"]').text()).toBe('1 new line');
    w.unmount();
  });
});
