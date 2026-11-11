/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import DeviceSessionsPage from './DeviceSessionsPage.vue';
import { useToastStore } from '../stores/useToastStore';
import { isRoute } from '../test/route-match';

/**
 * DeviceSessionsPage — Settings > Sessions, the D-1a auth-token family
 * surface. Routes are phlix-server 413765b6's exact pair (hub twin c0ed2c28
 * serves the same wire); there is NO server-side "others" endpoint, so the
 * bulk button is pinned here as a CLIENT-side sequential fan-out over the
 * non-current rows — stop-at-first-failure, always reload.
 *
 * S193 harness law (from SecuritySettingsPage.test.ts): URLs match through
 * {@link isRoute} (pathname ENDS WITH the route), never substring — a
 * substring match would let the collection GET answer per-session DELETEs.
 */

const LIST_PATH = '/api/v1/auth/sessions';
const sessionPath = (id: string): string => `${LIST_PATH}/${encodeURIComponent(id)}`;

interface WireRow {
  id: string;
  current: boolean;
  created_at: string | null;
  last_used_at: string | null;
  device_type: string | null;
  device_name: string | null;
}

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function noContent(): Response {
  return {
    ok: true,
    status: 204,
    headers: { get: () => null } as unknown as Headers,
    json: async () => {
      throw new Error('204 body must never be parsed');
    },
    text: async () => '',
  } as unknown as Response;
}

function session(over: Partial<WireRow> = {}): WireRow {
  return {
    id: 'sess-tv',
    current: false,
    created_at: '2026-11-01 08:15:22',
    last_used_at: '2026-11-10 22:04:07',
    device_type: 'tv',
    device_name: 'Living Room TV',
    ...over,
  };
}

/** The trio every list-render test seeds: this device + two revokable ones. */
function trio(): WireRow[] {
  return [
    session(),
    session({ id: 'sess-unk', device_type: null, device_name: null }),
    session({ id: 'sess-cur', current: true, device_type: 'desktop', device_name: 'Studio Display' }),
  ];
}

interface StubOpts {
  sessions?: WireRow[];
  /** GET fails with a real wire envelope. */
  listErrorBody?: { status: number; body: unknown };
  /** DELETE fails (uniform 404 envelope) for exactly these ids. */
  deleteFailIds?: ReadonlySet<string>;
  /** DELETE responses stay PENDING until the test calls release(). */
  holdDeletes?: boolean;
}

interface StubHandle {
  fn: Mock;
  release: () => void;
}

function stubFetchImpl(opts: StubOpts): StubHandle {
  const rows = opts.sessions ?? [];
  let releaseDeletes: () => void = () => {};
  const fn = vi.fn((url: unknown, init?: RequestInit) => {
    const u = typeof url === 'string' ? url : '';
    const method = (init?.method ?? 'GET').toUpperCase();
    const target = rows.find((s) => isRoute(u, sessionPath(s.id)));
    if (method === 'DELETE' && target) {
      if (opts.deleteFailIds?.has(target.id)) {
        return Promise.resolve(jsonResponse({ error: 'Session not found' }, 404));
      }
      if (opts.holdDeletes) {
        return new Promise<Response>((resolve) => {
          const prev = releaseDeletes;
          releaseDeletes = () => {
            prev();
            resolve(noContent());
          };
        });
      }
      return Promise.resolve(noContent());
    }
    if (method === 'GET' && isRoute(u, LIST_PATH)) {
      if (opts.listErrorBody) {
        return Promise.resolve(jsonResponse(opts.listErrorBody.body, opts.listErrorBody.status));
      }
      return Promise.resolve(jsonResponse({ sessions: rows }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return { fn, release: () => releaseDeletes() };
}

function stubFetch(opts: StubOpts = {}): StubHandle {
  return stubFetchImpl(opts);
}

function mountPage(): VueWrapper {
  return mount(DeviceSessionsPage, {
    global: {
      plugins: [createPinia()],
      provide: { apiBase: '' },
      stubs: {
        Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' },
        Spinner: { template: '<span class="spinner" />' },
      },
    },
  });
}

/**
 * The shared ConfirmDialog (R13-05) renders inside a `<Modal>`, which teleports
 * to `document.body` — its footer buttons must be reached through the DOM
 * directly (same helper shape as SecuritySettingsPage.test.ts).
 */
function dialogButton(affirmative: boolean): HTMLButtonElement {
  const buttons = Array.from(
    document.body.querySelectorAll<HTMLButtonElement>('.phlix-modal__footer button'),
  );
  const btn = affirmative
    ? buttons.find((b) => b.dataset.testid === 'confirm-dialog-affirmative')
    : buttons.find((b) => b.dataset.testid !== 'confirm-dialog-affirmative');
  if (!btn) throw new Error(`ConfirmDialog ${affirmative ? 'affirmative' : 'cancel'} button not found`);
  return btn;
}

async function clickDialogButton(affirmative: boolean): Promise<void> {
  dialogButton(affirmative).click();
  await flushPromises();
}

/** The DELETE URLs the stub actually received, in arrival order. */
function deleteUrls(fn: ReturnType<typeof stubFetch>['fn']): string[] {
  return fn.mock.calls
    .filter(([, init]) => (init as RequestInit | undefined)?.method === 'DELETE')
    .map(([url]) => String(url));
}

beforeEach(() => {
  setActivePinia(createPinia());
  localStorage.clear();
  document.body.innerHTML = '';
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('DeviceSessionsPage', () => {
  it('lists sessions with icons, the current-device badge and unknown fallback', async () => {
    const { fn } = stubFetch({ sessions: trio() });
    const w = mountPage();
    expect(w.find('.spinner').exists()).toBe(true);
    await flushPromises();

    expect(isRoute(fn.mock.calls[0][0], LIST_PATH)).toBe(true);
    const items = w.findAll('.session-item');
    expect(items).toHaveLength(3);
    // tv glyph for the literal 'tv'; monitor for everything else (untrusted
    // free-text device_type earns nothing fancier than the generic glyph).
    expect(items[0]!.find('.session-item__icon .icon').attributes('data-icon')).toBe('tv');
    expect(items[1]!.find('.session-item__icon .icon').attributes('data-icon')).toBe('monitor');
    expect(items[1]!.text()).toContain('Unknown device');
    // The CURRENT row carries the badge and NO revoke control — the UI never
    // offers to sign the caller out of their own session.
    expect(items[2]!.find('[data-testid="session-current-badge"]').exists()).toBe(true);
    expect(items[2]!.find('button').exists()).toBe(false);
    expect(items[0]!.find('button').exists()).toBe(true);
    // Count label plural-resolves for 3 and the header hides it while loading.
    expect(w.find('.device-sessions-page__count').text()).toContain('3 active sessions');
    w.unmount();
  });

  it('renders server dates as absolute calendar days without fabricating a zone', async () => {
    stubFetch({ sessions: [session()] });
    const w = mountPage();
    await flushPromises();
    // Same numeric-part parse the component performs — the assertion proves
    // the date survived as the SERVER WROTE it (Nov 1 / Nov 10 2026), never
    // a browser-shifted instant.
    const created = new Date(2026, 10, 1).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const lastUsed = new Date(2026, 10, 10).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const meta = w.find('.session-item__meta').text();
    expect(meta).toContain(`Signed in ${created}`);
    expect(meta).toContain(`Last used ${lastUsed}`);
    w.unmount();
  });

  it('hides the bulk action when the caller is the only session', async () => {
    stubFetch({ sessions: [session({ id: 'sess-cur', current: true })] });
    const w = mountPage();
    await flushPromises();
    expect(w.find('[data-testid="sessions-revoke-others"]').exists()).toBe(false);
    w.unmount();
  });

  it('shows the empty state for a fresh account', async () => {
    stubFetch({ sessions: [] });
    const w = mountPage();
    await flushPromises();
    expect(w.text()).toContain('No active sessions');
    expect(w.text()).toContain('No devices are signed in to this account.');
    w.unmount();
  });

  it('shows the load-error card and Retry re-issues the GET', async () => {
    const { fn } = stubFetch({ listErrorBody: { status: 500, body: { error: 'db down' } } });
    const w = mountPage();
    await flushPromises();
    expect(w.text()).toContain('Couldn’t load sessions');
    // Wire-error survivor law: the raw server text NEVER renders — unregistered
    // codes keep the generic catalog line.
    expect(w.text()).toContain('Couldn’t load your sessions. Check your connection and try again.');
    expect(w.text()).not.toContain('db down');

    await w.find('[data-testid="sessions-retry"]').trigger('click');
    await flushPromises();
    expect(fn).toHaveBeenCalledTimes(2);
    w.unmount();
  });

  it('revokes one session through the confirm dialog, toasts and reloads', async () => {
    const { fn } = stubFetch({ sessions: trio() });
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const success = vi.spyOn(toasts, 'success');

    await w.find('[data-testid="session-revoke-sess-tv"]').trigger('click');
    await flushPromises();
    // Nothing leaves the browser until the user affirms (R13-05 law).
    expect(deleteUrls(fn)).toEqual([]);

    await clickDialogButton(true);
    expect(deleteUrls(fn)).toEqual([sessionPath('sess-tv')]);
    expect(success).toHaveBeenCalledWith('Signed out of that device.');
    // The reload after a revoke is the honest reconciler.
    expect(fn.mock.calls.filter(([u, init]) => ((init as RequestInit | undefined)?.method ?? 'GET') === 'GET' && isRoute(u, LIST_PATH))).toHaveLength(2);
    w.unmount();
  });

  it('cancel on the confirm sends nothing and re-arms cleanly', async () => {
    const { fn } = stubFetch({ sessions: trio() });
    const w = mountPage();
    await flushPromises();

    await w.find('[data-testid="session-revoke-sess-tv"]').trigger('click');
    await flushPromises();
    await clickDialogButton(false);
    expect(deleteUrls(fn)).toEqual([]);

    // A second arm still works (pending was cleared on dismiss, not on open).
    await w.find('[data-testid="session-revoke-sess-tv"]').trigger('click');
    await flushPromises();
    await clickDialogButton(true);
    expect(deleteUrls(fn)).toEqual([sessionPath('sess-tv')]);
    w.unmount();
  });

  it('revoke-all signs out every NON-current session, sequentially, then reloads', async () => {
    const { fn } = stubFetch({ sessions: trio() });
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const success = vi.spyOn(toasts, 'success');

    await w.find('[data-testid="sessions-revoke-others"]').trigger('click');
    await flushPromises();
    await clickDialogButton(true);

    // Both other sessions, in LIST order — and NEVER the current one.
    expect(deleteUrls(fn)).toEqual([sessionPath('sess-tv'), sessionPath('sess-unk')]);
    expect(deleteUrls(fn).some((u) => u.includes('sess-cur'))).toBe(false);
    expect(success).toHaveBeenCalledWith('Other sessions signed out.');
    w.unmount();
  });

  it('bulk stop-at-first-failure: the failing DELETE ends the fan-out and the error toast survives', async () => {
    const { fn } = stubFetch({ sessions: trio(), deleteFailIds: new Set(['sess-tv']) });
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const error = vi.spyOn(toasts, 'error');

    await w.find('[data-testid="sessions-revoke-others"]').trigger('click');
    await flushPromises();
    await clickDialogButton(true);

    // tv failed → unk was never attempted; partial state reconciled by reload.
    expect(deleteUrls(fn)).toEqual([sessionPath('sess-tv')]);
    expect(error).toHaveBeenCalledWith('Couldn’t finish signing out the other sessions.');
    expect(fn.mock.calls.filter(([, init]) => ((init as RequestInit | undefined)?.method ?? 'GET') === 'GET')).toHaveLength(2);
    w.unmount();
  });

  it('reentrancy: every control is disabled while a revoke is in flight', async () => {
    const held = stubFetch({ sessions: trio(), holdDeletes: true });
    const w = mountPage();
    await flushPromises();

    await w.find('[data-testid="session-revoke-sess-tv"]').trigger('click');
    await flushPromises();
    await clickDialogButton(true);
    // DELETE is pending — no reload, no second burst possible.
    expect(deleteUrls(held.fn)).toEqual([sessionPath('sess-tv')]);
    expect(w.find('[data-testid="session-revoke-sess-tv"]').attributes('disabled')).toBeDefined();
    expect(w.find('[data-testid="session-revoke-sess-unk"]').attributes('disabled')).toBeDefined();
    expect(w.find('[data-testid="sessions-revoke-others"]').attributes('disabled')).toBeDefined();
    expect(w.find('[data-testid="sessions-refresh"]').attributes('disabled')).toBeDefined();

    held.release();
    await flushPromises();
    // Exactly ONE DELETE total — the in-flight arm cannot be re-entered.
    expect(deleteUrls(held.fn)).toEqual([sessionPath('sess-tv')]);
    w.unmount();
  });

  it('a failed single revoke toasts the error and STILL reloads', async () => {
    const { fn } = stubFetch({ sessions: trio(), deleteFailIds: new Set(['sess-tv']) });
    const w = mountPage();
    await flushPromises();
    const toasts = useToastStore();
    const error = vi.spyOn(toasts, 'error');

    await w.find('[data-testid="session-revoke-sess-tv"]').trigger('click');
    await flushPromises();
    await clickDialogButton(true);

    expect(error).toHaveBeenCalledWith('Couldn’t sign out that session.');
    expect(fn.mock.calls.filter(([, init]) => ((init as RequestInit | undefined)?.method ?? 'GET') === 'GET')).toHaveLength(2);
    w.unmount();
  });
});
