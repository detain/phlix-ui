import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import { createPhlixApp, buildRoutes, authGuard, PUBLIC_ROUTE_NAMES } from './createPhlixApp';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.removeAttribute('data-density');
  delete (window as { __PHLIX__?: unknown }).__PHLIX__;
  vi.stubGlobal(
    'matchMedia',
    vi.fn((q: string) => ({
      matches: false,
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('createPhlixApp', () => {
  it('returns a mountable Vue app', () => {
    const app = createPhlixApp({ app: 'server', apiBase: '', routerBase: '/app' });
    expect(typeof app.mount).toBe('function');
    expect(typeof app.unmount).toBe('function');
  });

  it('applies the persisted theme to <html> before mount (no flash)', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'midnight', density: 'compact' }));
    createPhlixApp({ apiBase: '' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('midnight');
    expect(document.documentElement.getAttribute('data-density')).toBe('compact');
  });

  it('mounts the browse route and the extra routes from config', async () => {
    const Extra = { template: '<div class="extra-page">extra</div>' };
    const host = document.createElement('div');
    document.body.appendChild(host);
    const app = createPhlixApp({
      apiBase: '',
      routerBase: '/app',
      extraRoutes: [{ path: '/app/extra', name: 'extra', component: Extra }],
    });
    app.mount(host);
    await new Promise((r) => setTimeout(r, 0));
    // app mounted without throwing; the router + pinia are installed
    expect(host.querySelector('*')).not.toBeNull();
    app.unmount();
  });

  it('reads window.__PHLIX__ when no config is passed', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = { app: 'hub', apiBase: '/hubapi', routerBase: '/app' };
    const app = createPhlixApp();
    expect(typeof app.mount).toBe('function');
    app.unmount?.();
  });

  it('seeds the per-app defaultTheme onto <html> for first-time visitors, and keeps it after mount (R1.5)', async () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const app = createPhlixApp({ apiBase: '', routerBase: '/app', defaultTheme: 'midnight' });
    // applied pre-mount (no flash)…
    expect(document.documentElement.getAttribute('data-theme')).toBe('midnight');
    app.mount(host);
    await new Promise((r) => setTimeout(r, 0));
    // …and the store was seeded too, so the reactive theme does not snap back to the nocturne default.
    expect(document.documentElement.getAttribute('data-theme')).toBe('midnight');
    app.unmount();
  });

  it('does not let defaultTheme override a stored user preference (R1.5)', () => {
    localStorage.setItem('phlix.prefs', JSON.stringify({ theme: 'daylight' }));
    createPhlixApp({ apiBase: '', defaultTheme: 'midnight' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('daylight');
  });
});

describe('buildRoutes — R6.1a lazy route chunks', () => {
  const BUILTIN_PAGES = ['browse', 'media', 'library', 'player', 'login', 'signup', 'settings'] as const;

  /** Pull a route's `component` field across the RouteRecordRaw union (redirect
   *  records have no `component`). A lazy `() => import()` loader is a function;
   *  a static SFC import would be a plain component object. */
  function componentOf(routes: unknown[], name: string): unknown {
    const route = routes.find((r) => (r as { name?: string }).name === name) as
      | { component?: unknown }
      | undefined;
    return route?.component;
  }

  it('mounts the 6 built-in pages as lazy () => import() chunks, not static components', () => {
    const routes = buildRoutes({ app: 'server', apiBase: '', routerBase: '/app' });
    for (const name of BUILTIN_PAGES) {
      expect(typeof componentOf(routes, name), `route "${name}" is a lazy loader`).toBe('function');
    }
  });

  it('each built-in lazy loader resolves to a real SFC module (default export)', async () => {
    const routes = buildRoutes({ app: 'server', apiBase: '', routerBase: '/app' });
    for (const name of BUILTIN_PAGES) {
      const loader = componentOf(routes, name) as () => Promise<{ default?: unknown }>;
      const mod = await loader();
      expect(mod.default, `route "${name}" resolves to an SFC default export`).toBeTruthy();
    }
  });

  it('honours routerBase, appends extraRoutes, and keeps the catch-all last', () => {
    const Extra = { template: '<div class="x" />' };
    const routes = buildRoutes({
      app: 'hub',
      apiBase: '',
      routerBase: '/app',
      extraRoutes: [{ path: '/app/extra', name: 'extra', component: Extra }],
    });
    expect(routes.some((r) => r.name === 'extra')).toBe(true);
    // catch-all is appended AFTER extraRoutes so a consumer route can override it.
    expect(routes[routes.length - 1].name).toBe('catchall');
    expect(routes.find((r) => r.name === 'browse')?.path).toBe('/app');
    expect(routes.find((r) => r.name === 'player')?.path).toBe('/app/player/:id');
    expect(routes.find((r) => r.name === 'library')?.path).toBe('/app/library/:id');
  });

  it('defaults routerBase to /app when omitted', () => {
    const routes = buildRoutes({ app: 'server', apiBase: '' });
    expect(routes.find((r) => r.name === 'browse')?.path).toBe('/app');
    expect(routes.find((r) => r.name === 'settings')?.path).toBe('/app/settings');
  });

  it('no longer emits the self-referential trailing-slash redirect (recursion source)', () => {
    const routes = buildRoutes({ app: 'server', apiBase: '', routerBase: '/app' });
    // The old `{ path: '/app/', redirect: '/app' }` record ping-ponged with the
    // '/app' browse record under non-strict matching → "too much recursion".
    expect(routes.some((r) => 'redirect' in r && r.path === '/app/')).toBe(false);
  });
});

/**
 * Regression suite for the base-doubling + redirect-recursion bug. The route
 * records carry the full `/app` prefix AND the history base is '/', so a link to
 * `login` must resolve to `/app/login` — never `/app/app/login` — and resolving
 * the base must not loop. We build the router exactly as createPhlixApp does.
 */
describe('router base handling (regression: /app/app doubling + redirect loop)', () => {
  function makeRouter(routerBase = '/app') {
    return createRouter({
      history: createWebHistory(),
      routes: buildRoutes({ app: 'server', apiBase: '', routerBase }),
    });
  }

  it('resolves the base path to browse — no empty landing at /app', () => {
    const r = makeRouter();
    expect(r.resolve('/app').name).toBe('browse');
    // Trailing slash still lands on browse without the old redirect record.
    expect(r.resolve('/app/').name).toBe('browse');
  });

  it('generates single-prefix hrefs — never /app/app/* (the doubling bug)', () => {
    const r = makeRouter();
    expect(r.resolve({ name: 'browse' }).href).toBe('/app');
    expect(r.resolve({ name: 'login' }).href).toBe('/app/login');
    expect(r.resolve({ name: 'settings' }).href).toBe('/app/settings');
    expect(r.resolve({ name: 'login' }).href).not.toContain('/app/app');
  });

  it('resolving the base does not blow the stack (redirect-loop regression)', () => {
    const r = makeRouter();
    expect(() => r.resolve('/app')).not.toThrow();
    expect(r.resolve('/app').redirectedFrom).toBeUndefined();
  });

  it('honours a non-/app routerBase consistently (hub)', () => {
    const r = makeRouter('/hub');
    expect(r.resolve('/hub').name).toBe('browse');
    expect(r.resolve({ name: 'login' }).href).toBe('/hub/login');
  });
});

describe('authGuard', () => {
  function route(
    name: string,
    opts: { meta?: Record<string, unknown>; fullPath?: string } = {},
  ): RouteLocationNormalized {
    return {
      name,
      meta: opts.meta ?? {},
      fullPath: opts.fullPath ?? `/app/${name}`,
    } as unknown as RouteLocationNormalized;
  }

  it('redirects an unauthenticated visit to a protected route to login (with redirect query)', () => {
    expect(authGuard(route('settings'), false)).toMatchObject({
      name: 'login',
      query: { redirect: '/app/settings' },
    });
  });

  it('lets an authenticated user through to a protected route', () => {
    expect(authGuard(route('settings'), true)).toBe(true);
  });

  it.each([...PUBLIC_ROUTE_NAMES])('lets an unauthenticated user reach the public route "%s"', (name) => {
    expect(authGuard(route(name), false)).toBe(true);
  });

  it('honours meta.public to allow an unauthenticated visit', () => {
    expect(authGuard(route('browse', { meta: { public: true } }), false)).toBe(true);
  });

  it('still gates a protected route even when logged out and meta.public is false', () => {
    expect(authGuard(route('my-servers', { meta: { public: false } }), false)).toMatchObject({
      name: 'login',
    });
  });

  // --- admin-only routes (meta.requiresAdmin) ---

  it('redirects a logged-in NON-admin away from a requiresAdmin route to browse (NOT login → no re-auth loop)', () => {
    expect(authGuard(route('admin-users', { meta: { requiresAdmin: true } }), true, false)).toEqual({
      name: 'browse',
    });
  });

  it('lets a logged-in admin through to a requiresAdmin route', () => {
    expect(authGuard(route('admin-users', { meta: { requiresAdmin: true } }), true, true)).toBe(true);
  });

  it('sends an unauthenticated visitor on a requiresAdmin route to login (auth check precedes the admin check)', () => {
    expect(authGuard(route('admin-users', { meta: { requiresAdmin: true } }), false, false)).toMatchObject({
      name: 'login',
      query: { redirect: '/app/admin-users' },
    });
  });

  it('does not block a logged-in non-admin from a normal (non-admin) protected route', () => {
    // Regression: the new isAdmin arg must only gate requiresAdmin routes.
    expect(authGuard(route('settings'), true, false)).toBe(true);
  });
});
