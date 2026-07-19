/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import AcceptInvitePage from './AcceptInvitePage.vue';
import Button from '../components/ui/Button.vue';
import { ApiError } from '../api/errors';
import type { ApiClient } from '../api/client';

const TOKEN = 'abc123';

function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/invite/:token', name: 'accept-invite', component: { template: '<div/>' } },
      { path: '/app/login', name: 'login', component: { template: '<div/>' } },
      { path: '/app/signup', name: 'signup', component: { template: '<div/>' } },
      { path: '/app/shared-with-me', name: 'shared-with-me', component: { template: '<div/>' } },
    ],
  });
}

/** Mock the injectable API client seam (only `post` is used by the page). */
function makeClient(post = vi.fn(async () => ({}))) {
  return { client: { post } as unknown as ApiClient, post };
}

async function mountPage(opts: {
  loggedIn: boolean;
  client: ApiClient;
  router?: Router;
  token?: string;
}): Promise<{ w: VueWrapper; router: Router }> {
  // `isLoggedIn` is a token-PRESENCE computed on the auth store — seed the token
  // store BEFORE the store is created so a mounted page reads the desired state.
  if (opts.loggedIn) localStorage.setItem('access_token', 'seeded-token');
  setActivePinia(createPinia());
  const router = opts.router ?? makeRouter();
  await router.push(`/app/invite/${opts.token ?? TOKEN}`);
  await router.isReady();
  const w = mount(AcceptInvitePage, {
    props: { token: opts.token ?? TOKEN, client: opts.client },
    attachTo: document.body,
    global: { plugins: [router] },
  });
  return { w, router };
}

function findBtnByText(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('AcceptInvitePage — logged out', () => {
  it('shows Log In and Sign Up CTAs instead of the accept button', async () => {
    const { client } = makeClient();
    const { w } = await mountPage({ loggedIn: false, client });
    expect(findBtnByText(w, 'Log In')).toBeTruthy();
    expect(findBtnByText(w, 'Sign Up')).toBeTruthy();
    expect(findBtnByText(w, 'Accept Invite')).toBeFalsy();
    expect(client.post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('Log In routes to /app/login carrying ?redirect back to this invite', async () => {
    const { client } = makeClient();
    const { w, router } = await mountPage({ loggedIn: false, client });
    const push = vi.spyOn(router, 'push');
    await findBtnByText(w, 'Log In')!.trigger('click');
    expect(push).toHaveBeenCalledWith({
      path: '/app/login',
      query: { redirect: `/app/invite/${TOKEN}` },
    });
    w.unmount();
  });

  it('Sign Up routes to /app/signup carrying ?redirect back to this invite', async () => {
    const { client } = makeClient();
    const { w, router } = await mountPage({ loggedIn: false, client });
    const push = vi.spyOn(router, 'push');
    await findBtnByText(w, 'Sign Up')!.trigger('click');
    expect(push).toHaveBeenCalledWith({
      path: '/app/signup',
      query: { redirect: `/app/invite/${TOKEN}` },
    });
    w.unmount();
  });
});

describe('AcceptInvitePage — logged in (accept flow)', () => {
  it('renders the Accept Invite button and no auth CTAs', async () => {
    const { client } = makeClient();
    const { w } = await mountPage({ loggedIn: true, client });
    expect(findBtnByText(w, 'Accept Invite')).toBeTruthy();
    expect(findBtnByText(w, 'Log In')).toBeFalsy();
    w.unmount();
  });

  it('Accept → POSTs the redeem endpoint (token URL-encoded), then shows success + View Shared Libraries', async () => {
    const { client, post } = makeClient();
    const { w } = await mountPage({ loggedIn: true, client });
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith(`/api/v1/me/invite-links/${TOKEN}/redeem`);
    expect(w.text()).toContain('granted access');
    expect(findBtnByText(w, 'View Shared Libraries')).toBeTruthy();
    w.unmount();
  });

  it('URL-encodes a token containing a slash', async () => {
    const { client, post } = makeClient();
    const { w } = await mountPage({ loggedIn: true, client, token: 'a/b' });
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/me/invite-links/a%2Fb/redeem');
    w.unmount();
  });

  it('View Shared Libraries navigates to /app/shared-with-me', async () => {
    const { client } = makeClient();
    const { w, router } = await mountPage({ loggedIn: true, client });
    const push = vi.spyOn(router, 'push');
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    await findBtnByText(w, 'View Shared Libraries')!.trigger('click');
    expect(push).toHaveBeenCalledWith('/app/shared-with-me');
    w.unmount();
  });
});

describe('AcceptInvitePage — redeem error mapping', () => {
  it('401 → session-expired message AND redirects to login (carrying redirect)', async () => {
    const post = vi.fn().mockRejectedValue(new ApiError('nope', 401));
    const { client } = makeClient(post);
    const { w, router } = await mountPage({ loggedIn: true, client });
    const push = vi.spyOn(router, 'push');
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Session expired');
    expect(push).toHaveBeenCalledWith({
      path: '/app/login',
      query: { redirect: `/app/invite/${TOKEN}` },
    });
    w.unmount();
  });

  it('410 → expired/exhausted message (no redirect)', async () => {
    const post = vi.fn().mockRejectedValue(new ApiError('gone', 410));
    const { client } = makeClient(post);
    const { w, router } = await mountPage({ loggedIn: true, client });
    const push = vi.spyOn(router, 'push');
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('expired or been exhausted');
    expect(push).not.toHaveBeenCalled();
    w.unmount();
  });

  it('404 → not-found message', async () => {
    const post = vi.fn().mockRejectedValue(new ApiError('missing', 404));
    const { client } = makeClient(post);
    const { w } = await mountPage({ loggedIn: true, client });
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('was not found');
    w.unmount();
  });

  it('generic (non-ApiError) → the fallback message', async () => {
    const post = vi.fn().mockRejectedValue(new Error('boom'));
    const { client } = makeClient(post);
    const { w } = await mountPage({ loggedIn: true, client });
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('boom');
    w.unmount();
  });

  it('a 500 ApiError surfaces its server message via the generic branch', async () => {
    const post = vi.fn().mockRejectedValue(new ApiError('server exploded', 500));
    const { client } = makeClient(post);
    const { w } = await mountPage({ loggedIn: true, client });
    await findBtnByText(w, 'Accept Invite')!.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('server exploded');
    w.unmount();
  });
});
