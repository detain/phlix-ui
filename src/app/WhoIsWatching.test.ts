/**
 * S82 — Who's-watching screen tests: three-state rendering off the REAL list
 * endpoint, tile choice hitting the REAL switch endpoint, busy/disabled
 * in-flight behavior, and the gate-closing contract (AC-1 / AC-3 / AC-4).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import WhoIsWatching from './WhoIsWatching.vue';
import { useProfileStore } from '../stores/useProfileStore';
import { isRoute } from '../test/route-match';

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function row(id: string, name: string, isActive: boolean, avatarUrl: string | null = null) {
  return {
    id,
    user_id: 'u1',
    name,
    avatar_url: avatarUrl,
    is_active: isActive,
    is_admin: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  };
}

function switchBody(profileId: string | null, token: string) {
  return {
    access_token: token,
    refresh_token: `r-${token}`,
    profile_id: profileId,
    token_type: 'Bearer',
    expires_in: 3600,
    user: { id: 'u1', email: 'a@b.c', is_admin: false },
  };
}

const LIST = (u: string, m: string): boolean => m === 'GET' && isRoute(u, '/api/v1/profiles');
const SWITCH = (id: string) => (u: string, m: string): boolean =>
  m === 'POST' && isRoute(u, `/api/v1/profiles/${id}/switch`);

function stub(routes: Array<{ match: (u: string, m: string) => boolean; handle: () => Response | Promise<Response> }>) {  const calls: Array<{ url: string; method: string }> = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: unknown, init?: { method?: string }) => {
      const u = String(url);
      const m = (init?.method ?? 'GET').toUpperCase();
      calls.push({ url: u, method: m });
      for (const r of routes) if (r.match(u, m)) return r.handle();
      throw new Error(`unstubbed ${m} ${u}`);
    }),
  );
  return calls;
}

function mountScreen() {
  return mount(WhoIsWatching, { global: { plugins: [createPinia()] } });
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

describe('WhoIsWatching (S82)', () => {
  it('shows the loading state while the first list read is in flight', async () => {
    let release!: () => void;
    stub([
      {
        match: LIST,
        handle: () =>
          new Promise<Response>((res) => {
            release = () => res(jsonResponse({ profiles: [row('p1', 'Alice', true), row('p2', 'Kids', false)] }));
          }),
      },
    ]);
    const w = mountScreen();
    await flushPromises();
    expect(w.find('[data-testid="whos-loading"]').exists()).toBe(true);
    expect(w.find('.whos__grid').exists()).toBe(false);

    release();
    await flushPromises();
    expect(w.find('[data-testid="whos-loading"]').exists()).toBe(false);
    expect(w.findAll('.whos__tile')).toHaveLength(2);
  });

  it('renders error + Retry when the list fails, and Retry re-reads into tiles', async () => {
    let fail = true;
    stub([
      {
        match: LIST,
        handle: () =>
          fail
            ? jsonResponse({ message: 'profiles offline' }, false, 500)
            : jsonResponse({ profiles: [row('p1', 'Alice', true), row('p2', 'Kids', false)] }),
      },
    ]);
    const w = mountScreen();
    await flushPromises();
    const err = w.find('[data-testid="whos-error"]');
    expect(err.exists()).toBe(true);
    expect(err.text()).toContain('profiles offline');

    fail = false;
    await err.find('button').trigger('click');
    await flushPromises();
    expect(w.find('[data-testid="whos-error"]').exists()).toBe(false);
    expect(w.findAll('.whos__tile')).toHaveLength(2);
  });

  it('renders one tile per profile from the real list with the active badge on the server-active row', async () => {
    stub([
      {
        match: LIST,
        handle: () => jsonResponse({ profiles: [row('p2', 'Kids', false), row('p1', 'Alice', true)] }),
      },
    ]);
    const w = mountScreen();
    await flushPromises();
    expect(w.find('[data-testid="whos-tile-p2"]').text()).toContain('Kids');
    expect(w.find('[data-testid="whos-tile-p1"]').text()).toContain('Alice');
    expect(w.find('[data-testid="whos-tile-p1"] .whos__active-badge').exists()).toBe(true);
    expect(w.find('[data-testid="whos-tile-p2"] .whos__active-badge').exists()).toBe(false);
    // Initials fallback for avatar-less rows (design pillar: nothing renders blank).
    expect(w.find('[data-testid="whos-tile-p1"] .whos__avatar-initials').text()).toBe('AL');
  });

  it('choosing a tile POSTs the real switch endpoint, adopts the token, and closes the gate', async () => {
    const calls = stub([
      { match: LIST, handle: () => jsonResponse({ profiles: [row('p1', 'Alice', true), row('p2', 'Kids', false)] }) },
      { match: SWITCH('p2'), handle: () => jsonResponse(switchBody('p2', 'AT-KIDS')) },
    ]);
    const w = mountScreen();
    await flushPromises();
    const store = useProfileStore();
    expect(store.gateOpen).toBe(true); // multi-profile, no choice yet

    await w.find('[data-testid="whos-tile-p2"]').trigger('click');
    await flushPromises();

    expect(calls.some((c) => SWITCH('p2')(c.url, c.method))).toBe(true);
    expect(localStorage.getItem('access_token')).toBe('AT-KIDS');
    expect(store.activeProfileId).toBe('p2');
    expect(store.gateOpen).toBe(false); // a server-confirmed switch closes the screen
  });

  it('a failed switch keeps the screen open and surfaces the server error', async () => {
    stub([
      { match: LIST, handle: () => jsonResponse({ profiles: [row('p1', 'Alice', true), row('p2', 'Kids', false)] }) },
      { match: SWITCH('p2'), handle: () => jsonResponse({ message: 'that profile is gone' }, false, 404) },
    ]);
    const w = mountScreen();
    await flushPromises();
    const store = useProfileStore();
    await w.find('[data-testid="whos-tile-p2"]').trigger('click');
    await flushPromises();
    expect(w.find('.whos__inline-error').text()).toContain('that profile is gone');
    expect(store.gateOpen).toBe(true); // never closes on a lie
    expect(localStorage.getItem('access_token')).toBe('AT'); // old token kept
  });

  it('all tiles are disabled while a switch is in flight (no double-pick)', async () => {
    let release!: () => void;
    stub([
      { match: LIST, handle: () => jsonResponse({ profiles: [row('p1', 'Alice', true), row('p2', 'Kids', false)] }) },
      {
        match: SWITCH('p2'),
        handle: () =>
          new Promise<Response>((res) => {
            release = () => res(jsonResponse(switchBody('p2', 'AT2')));
          }),
      },
    ]);
    const w = mountScreen();
    await flushPromises();
    await w.find('[data-testid="whos-tile-p2"]').trigger('click');
    await flushPromises();
    expect((w.find('[data-testid="whos-tile-p1"]').element as HTMLButtonElement).disabled).toBe(true);
    expect((w.find('[data-testid="whos-tile-p2"]').element as HTMLButtonElement).disabled).toBe(true);
    release();
    await flushPromises();
    expect((w.find('[data-testid="whos-tile-p1"]').element as HTMLButtonElement).disabled).toBe(false);
  });

  it('exposes itself as a modal dialog labelled by the screen title', async () => {
    stub([{ match: LIST, handle: () => jsonResponse({ profiles: [row('p1', 'A', true), row('p2', 'B', false)] }) }]);
    const w = mountScreen();
    await flushPromises();
    const dialog = w.find('[role="dialog"]');
    expect(dialog.exists()).toBe(true);
    expect(dialog.attributes('aria-modal')).toBe('true');
    expect(dialog.attributes('aria-label')).toBe("Who's watching?");
  });
});
