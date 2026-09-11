/**
 * S82 — Manage Profiles screen tests: three-state rendering off the real list
 * endpoint, inline rename (PUT), guarded delete (server 409 surfaced), create
 * (POST → re-list), and the "use" switch path. No local-only writes anywhere:
 * every assertion checks the request AND the server-shaped row that follows.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ProfilesPage from './ProfilesPage.vue';
import { isRoute } from '../test/route-match';
import { PROFILE_LAST_ERROR_CODE, PROFILE_LAST_ERROR_TEXT } from '../api/admin/users';

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function row(id: string, name: string, isActive: boolean) {
  return {
    id,
    user_id: 'u1',
    name,
    avatar_url: null,
    is_active: isActive,
    is_admin: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  };
}

const LIST = (u: string, m: string): boolean => m === 'GET' && isRoute(u, '/api/v1/profiles');
const CREATE = (u: string, m: string): boolean => m === 'POST' && isRoute(u, '/api/v1/profiles');
const RENAME = (id: string) => (u: string, m: string): boolean =>
  m === 'PUT' && isRoute(u, `/api/v1/profiles/${id}`);
const REMOVE = (id: string) => (u: string, m: string): boolean =>
  m === 'DELETE' && isRoute(u, `/api/v1/profiles/${id}`);
const SWITCH = (id: string) => (u: string, m: string): boolean =>
  m === 'POST' && isRoute(u, `/api/v1/profiles/${id}/switch`);

interface Route {
  match: (u: string, m: string) => boolean;
  handle: (u: string, m: string, body?: unknown) => Response | Promise<Response>;
}

function stub(routes: Route[]) {
  const calls: Array<{ url: string; method: string; body: unknown }> = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: unknown, init?: { method?: string; body?: string }) => {
      const u = String(url);
      const m = (init?.method ?? 'GET').toUpperCase();
      const body = init?.body ? JSON.parse(init.body) : undefined;
      calls.push({ url: u, method: m, body });
      for (const r of routes) if (r.match(u, m)) return r.handle(u, m, body);
      throw new Error(`unstubbed ${m} ${u}`);
    }),
  );
  return calls;
}

/** Default list over a mutable row set the mutations below share. */
function listable(initial: Array<ReturnType<typeof row>>): { rows: Array<ReturnType<typeof row>> } {
  const rows = initial;
  return { rows };
}

function mountPage() {
  return mount(ProfilesPage, { global: { plugins: [createPinia()] } });
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  localStorage.setItem('access_token', 'AT');
  localStorage.setItem('refresh_token', 'RT');
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ProfilesPage (S82)', () => {
  it('shows the loading state during the first read, rows once loaded', async () => {
    let release!: () => void;
    const listPromise = new Promise<Response>((res) => {
      release = () => res(jsonResponse({ profiles: [row('p1', 'Alice', true)] }));
    });
    stub([{ match: LIST, handle: async () => listPromise }]);
    const w = mountPage();
    await flushPromises();
    expect(w.find('[data-testid="profiles-loading"]').exists()).toBe(true);

    release();
    await flushPromises();
    expect(w.find('[data-testid="profiles-loading"]').exists()).toBe(false);
    expect(w.find('[data-testid="profile-row-p1"]').exists()).toBe(true);
  });

  it('failed read shows error + Retry; Retry re-reads', async () => {
    let fail = true;
    stub([
      {
        match: LIST,
        handle: () =>
          fail ? jsonResponse({ message: 'nope' }, false, 500) : jsonResponse({ profiles: [row('p1', 'Alice', true)] }),
      },
    ]);
    const w = mountPage();
    await flushPromises();
    expect(w.find('[data-testid="profiles-error"]').text()).toContain('nope');
    fail = false;
    await w.find('[data-testid="profiles-retry"]').trigger('click');
    await flushPromises();
    expect(w.find('[data-testid="profiles-error"]').exists()).toBe(false);
    expect(w.find('[data-testid="profile-row-p1"]').exists()).toBe(true);
  });

  it('loaded-but-empty account shows the empty state, not a broken table', async () => {
    stub([{ match: LIST, handle: () => jsonResponse({ profiles: [] }) }]);
    const w = mountPage();
    await flushPromises();
    expect(w.find('[data-testid="profiles-empty"]').exists()).toBe(true);
  });

  it('disables delete for a single-profile account and explains why', async () => {
    stub([{ match: LIST, handle: () => jsonResponse({ profiles: [row('p1', 'Alice', true)] }) }]);
    const w = mountPage();
    await flushPromises();
    const del = w.find('[data-testid="profile-delete-p1"]');
    expect((del.element as HTMLButtonElement).disabled).toBe(true);
    expect(del.attributes('title')).toBe('The last profile on an account cannot be deleted.');
  });

  it('renames via PUT and re-lists the server rows', async () => {
    const { rows } = listable([row('p1', 'Alice', true), row('p2', 'Kids', false)]);
    const calls = stub([
      { match: LIST, handle: () => jsonResponse({ profiles: rows }) },
      {
        match: RENAME('p2'),
        handle: (_u, _m, body) => {
          rows[1] = row('p2', String((body as { name?: string }).name), false);
          return jsonResponse({ message: 'ok' });
        },
      },
    ]);
    const w = mountPage();
    await flushPromises();
    await w.find('[data-testid="profile-rename-p2"]').trigger('click');
    const input = w.find('[data-testid="profile-rename-input"]');
    expect(input.exists()).toBe(true);
    await input.setValue('Kinder');
    await w.find('[data-testid="profile-rename-save"]').trigger('click');
    await flushPromises();

    const put = calls.find((c) => c.method === 'PUT');
    expect(put?.body).toEqual({ name: 'Kinder' });
    expect(w.find('[data-testid="profile-name-p2"]').text()).toBe('Kinder');
  });

  it('refuses a too-short rename client-side without a request', async () => {
    stub([{ match: LIST, handle: () => jsonResponse({ profiles: [row('p1', 'Alice', true), row('p2', 'B', false)] }) }]);
    const w = mountPage();
    await flushPromises();
    await w.find('[data-testid="profile-rename-p2"]').trigger('click');
    await w.find('[data-testid="profile-rename-input"]').setValue('ab');
    await w.find('[data-testid="profile-rename-save"]').trigger('click');
    await flushPromises();
    expect(w.find('[data-testid="profiles-mutation-error"]').text()).toContain('at least 3 characters');
    // Still in edit mode for a corrected name.
    expect(w.find('[data-testid="profile-rename-input"]').exists()).toBe(true);
  });

  it('creates via POST and shows the server-assigned row after re-list', async () => {
    const { rows } = listable([row('p1', 'Alice', true)]);
    const calls = stub([
      { match: LIST, handle: () => jsonResponse({ profiles: rows }) },
      {
        match: CREATE,
        handle: (_u, _m, body) => {
          rows.push(row('p9', String((body as { name?: string }).name), false));
          return jsonResponse({ profile_id: 'p9', message: 'created' }, true, 201);
        },
      },
    ]);
    const w = mountPage();
    await flushPromises();
    await w.find('[data-testid="profiles-add-open"]').trigger('click');
    await w.find('[data-testid="profiles-add-input"]').setValue('Teen');
    await w.find('[data-testid="profiles-add-save"]').trigger('click');
    await flushPromises();
    expect(calls.some((c) => CREATE(c.url, c.method))).toBe(true);
    expect(w.find('[data-testid="profile-row-p9"]').exists()).toBe(true);
  });

  it('surfaces the server 409 last-profile refusal and keeps the row', async () => {
    // The client-side guard hides this for a 1-profile list; this drives the
    // STALE-LIST case — the client believes two rows exist, the server still
    // refuses. The refusal must surface verbatim, never silently swallowed.
    // S465: the stub body is the real wire shape — code in `error`, human text
    // in `message` — and the page shows the CODE, proving extractError's
    // precedence (the sentence would render if only `message` existed).
    const { rows } = listable([row('p1', 'Alice', true), row('p2', 'Kids', false)]);
    stub([
      { match: LIST, handle: () => jsonResponse({ profiles: rows }) },
      {
        match: REMOVE('p2'),
        handle: () =>
          jsonResponse({ error: PROFILE_LAST_ERROR_CODE, message: PROFILE_LAST_ERROR_TEXT }, false, 409),
      },
    ]);
    const w = mountPage();
    await flushPromises();
    await w.find('[data-testid="profile-delete-p2"]').trigger('click');
    await flushPromises();
    expect(w.find('[data-testid="profiles-mutation-error"]').text()).toContain(PROFILE_LAST_ERROR_CODE);
    expect(w.find('[data-testid="profiles-mutation-error"]').text()).not.toContain(PROFILE_LAST_ERROR_TEXT);
    expect(w.find('[data-testid="profile-row-p2"]').exists()).toBe(true);
  });

  it('deleting a non-active row re-lists without it', async () => {
    const { rows } = listable([row('p1', 'Alice', true), row('p2', 'Kids', false)]);
    stub([
      { match: LIST, handle: () => jsonResponse({ profiles: rows }) },
      {
        match: REMOVE('p2'),
        handle: () => {
          rows.splice(1, 1);
          return jsonResponse({ message: 'ok' });
        },
      },
    ]);
    const w = mountPage();
    await flushPromises();
    await w.find('[data-testid="profile-delete-p2"]').trigger('click');
    await flushPromises();
    expect(w.find('[data-testid="profile-row-p2"]').exists()).toBe(false);
  });

  it('the use button hits the real switch endpoint and marks the row active', async () => {
    const { rows } = listable([row('p1', 'Alice', true), row('p2', 'Kids', false)]);
    const calls = stub([
      { match: LIST, handle: () => jsonResponse({ profiles: rows }) },
      {
        match: SWITCH('p2'),
        handle: () =>
          jsonResponse({
            access_token: 'AT2',
            refresh_token: 'RT2',
            profile_id: 'p2',
            token_type: 'Bearer',
            expires_in: 3600,
            user: { id: 'u1', is_admin: false },
          }),
      },
    ]);
    const w = mountPage();
    await flushPromises();
    await w.find('[data-testid="profile-use-p2"]').trigger('click');
    await flushPromises();
    expect(calls.some((c) => SWITCH('p2')(c.url, c.method))).toBe(true);
    expect(w.find('[data-testid="profile-use-p2"]').text()).toBe('Active');
    expect(w.find('[data-testid="profile-use-p1"]').text()).toBe('Switch to');
    expect(localStorage.getItem('access_token')).toBe('AT2');
  });
});
