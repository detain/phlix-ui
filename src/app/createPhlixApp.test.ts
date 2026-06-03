import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createPhlixApp, buildRoutes } from './createPhlixApp';

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
  const BUILTIN_PAGES = ['browse', 'media', 'player', 'login', 'signup', 'settings'] as const;

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
  });

  it('defaults routerBase to /app when omitted', () => {
    const routes = buildRoutes({ app: 'server', apiBase: '' });
    expect(routes.find((r) => r.name === 'browse')?.path).toBe('/app');
    expect(routes.find((r) => r.name === 'settings')?.path).toBe('/app/settings');
  });
});
