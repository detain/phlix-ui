import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from './useAuthStore';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

/** Run a login and return the parsed JSON body the store POSTed to /auth/login. */
async function captureLoginBody(identifier: string, password: string): Promise<unknown> {
  let captured: unknown;
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string, init?: RequestInit) => {
      const path = String(url);
      if (path.includes('/api/v1/auth/login')) {
        captured = init?.body != null ? JSON.parse(String(init.body)) : null;
        return Promise.resolve(jsonResponse({ access_token: 'AT', refresh_token: 'RT' }));
      }
      if (path.includes('/api/v1/auth/me')) {
        return Promise.resolve(jsonResponse({ user: { id: 1, email: 'a@b.c', is_admin: false } }));
      }
      return Promise.resolve(jsonResponse({ message: 'not found' }, 404));
    }),
  );
  await useAuthStore().login(identifier, password);
  return captured;
}

let routes: Record<string, () => Response>;

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
  routes = {};
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      const path = String(url);
      const match = Object.keys(routes).find((k) => path.includes(k));
      return Promise.resolve(match ? routes[match]() : jsonResponse({ message: 'not found' }, 404));
    }),
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useAuthStore', () => {
  it('starts logged out', () => {
    const s = useAuthStore();
    expect(s.isLoggedIn).toBe(false);
    expect(s.isAdmin).toBe(false);
    expect(s.user).toBeNull();
  });

  it('login stores tokens, fetches the user, and flips isLoggedIn/isAdmin', async () => {
    routes['/api/v1/auth/login'] = () => jsonResponse({ access_token: 'AT', refresh_token: 'RT' });
    routes['/api/v1/auth/me'] = () => jsonResponse({ user: { id: 1, email: 'a@b.c', is_admin: true } });
    const s = useAuthStore();
    const ok = await s.login('a@b.c', 'pw');
    expect(ok).toBe(true);
    expect(localStorage.getItem('access_token')).toBe('AT');
    expect(s.isLoggedIn).toBe(true);
    expect(s.user?.email).toBe('a@b.c');
    expect(s.isAdmin).toBe(true);
    expect(s.loading).toBe(false);
    expect(s.error).toBeNull();
  });

  it('login sends a plain username as `username` only (no email key)', async () => {
    const captured = await captureLoginBody('joe_user', 'pw');
    expect(captured).toEqual({ username: 'joe_user', password: 'pw' });
  });

  it('login sends an email identifier under BOTH username and email keys', async () => {
    const captured = await captureLoginBody('a@b.c', 'pw');
    expect(captured).toEqual({ username: 'a@b.c', email: 'a@b.c', password: 'pw' });
  });

  it('login failure sets error and returns false', async () => {
    routes['/api/v1/auth/login'] = () => jsonResponse({ message: 'bad creds' }, 401);
    const s = useAuthStore();
    const ok = await s.login('a@b.c', 'wrong');
    expect(ok).toBe(false);
    expect(s.error).toBeTruthy();
    expect(s.isLoggedIn).toBe(false);
  });

  it('signup stores tokens + fetches the user', async () => {
    routes['/api/v1/auth/register'] = () => jsonResponse({ access_token: 'AT2', refresh_token: 'RT2' });
    routes['/api/v1/auth/me'] = () => jsonResponse({ user: { id: 2, email: 'n@b.c', is_admin: false } });
    const s = useAuthStore();
    const ok = await s.signup('n@b.c', 'nick', 'pw');
    expect(ok).toBe(true);
    expect(s.user?.email).toBe('n@b.c');
    expect(s.isAdmin).toBe(false);
  });

  it('signup failure sets error', async () => {
    routes['/api/v1/auth/register'] = () => jsonResponse({ message: 'taken' }, 409);
    const s = useAuthStore();
    expect(await s.signup('n@b.c', 'nick', 'pw')).toBe(false);
    expect(s.error).toBeTruthy();
  });

  it('logout clears tokens + user', async () => {
    routes['/api/v1/auth/login'] = () => jsonResponse({ access_token: 'AT', refresh_token: 'RT' });
    routes['/api/v1/auth/me'] = () => jsonResponse({ user: { id: 1, email: 'a@b.c', is_admin: false } });
    const s = useAuthStore();
    await s.login('a@b.c', 'pw');
    expect(s.isLoggedIn).toBe(true);
    s.logout();
    expect(s.isLoggedIn).toBe(false);
    expect(s.user).toBeNull();
  });

  it('fetchUser is a no-op when logged out', async () => {
    const s = useAuthStore();
    await s.fetchUser();
    expect(s.user).toBeNull();
  });

  it('fetchUser clears tokens when the session is invalid', async () => {
    localStorage.setItem('access_token', 'STALE');
    routes['/api/v1/auth/me'] = () => jsonResponse({ message: 'unauthorized' }, 401);
    routes['/api/v1/auth/refresh'] = () => jsonResponse({ message: 'nope' }, 401);
    const s = useAuthStore();
    expect(s.isLoggedIn).toBe(true);
    await s.fetchUser();
    expect(s.user).toBeNull();
    expect(s.isLoggedIn).toBe(false); // tokens cleared
  });
});
