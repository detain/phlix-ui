import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createRouter, createMemoryHistory, type RouteLocationNormalized } from 'vue-router';
import { buildRoutes, resolveRouteTitle } from './createPhlixApp';
import { createTranslator } from '../i18n/messages';
import { setAppName, setPageTitle } from '../composables/usePageTitle';

beforeEach(() => {
  localStorage.clear();
  document.title = '';
  setAppName('Phlix');
});
afterEach(() => {
  setAppName('Phlix');
  vi.unstubAllGlobals();
});

describe('resolveRouteTitle (U1)', () => {
  const t = createTranslator();
  function route(name: string, meta: Record<string, unknown> = {}): RouteLocationNormalized {
    return { name, meta } as unknown as RouteLocationNormalized;
  }

  it('resolves a static meta.title that is an i18n message key', () => {
    expect(resolveRouteTitle(route('browse', { title: 'shell.browse' }), t)).toBe('Browse');
    expect(resolveRouteTitle(route('settings', { title: 'settings.title' }), t)).toBe('Settings');
    expect(resolveRouteTitle(route('login', { title: 'auth.loginTitle' }), t)).toBe('Welcome back');
  });

  it('echoes a literal (non-key) meta.title unchanged', () => {
    expect(resolveRouteTitle(route('x', { title: 'Literal Title' }), t)).toBe('Literal Title');
  });

  it('honours an i18n override for a static title', () => {
    const tOverride = createTranslator({ shell: { browse: 'Discover' } });
    expect(resolveRouteTitle(route('browse', { title: 'shell.browse' }), tOverride)).toBe('Discover');
  });

  it('derives "Admin · <label>" from the admin route name when there is no meta.title', () => {
    expect(resolveRouteTitle(route('admin-users'), t)).toBe('Admin · Users');
    expect(resolveRouteTitle(route('admin-settings'), t)).toBe('Admin · Settings');
    expect(resolveRouteTitle(route('admin-audit-logs'), t)).toBe('Admin · Audit Logs');
  });

  it('returns null for a data-driven / unknown route (page sets its own title)', () => {
    expect(resolveRouteTitle(route('media'), t)).toBeNull();
    expect(resolveRouteTitle(route('library'), t)).toBeNull();
    expect(resolveRouteTitle(route('player'), t)).toBeNull();
    expect(resolveRouteTitle(route('catchall'), t)).toBeNull();
  });
});

describe('buildRoutes attaches static meta.title (U1)', () => {
  it('the built-in static routes carry their i18n title keys', () => {
    const routes = buildRoutes({
      app: 'server',
      apiBase: '',
      routerBase: '/app',
      menu: [],
      extraRoutes: [],
      features: {},
    });
    const byName = (n: string) => routes.find((r) => r.name === n);
    expect(byName('browse')?.meta?.title).toBe('shell.browse');
    expect(byName('login')?.meta?.title).toBe('auth.loginTitle');
    expect(byName('signup')?.meta?.title).toBe('auth.signupTitle');
    expect(byName('settings')?.meta?.title).toBe('settings.title');
    // Data-driven routes carry no static title.
    expect(byName('media')?.meta?.title).toBeUndefined();
    expect(byName('library')?.meta?.title).toBeUndefined();
    expect(byName('player')?.meta?.title).toBeUndefined();
  });
});

describe('router.afterEach sets the document title (U1)', () => {
  // Drive the exact afterEach hook logic (resolveRouteTitle → setPageTitle) over a
  // real router built from the production route table, using memory history so the
  // navigation resolves deterministically (no auth-guard async / DOM mount needed).
  function makeRouter() {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: buildRoutes({
        app: 'server',
        apiBase: '',
        routerBase: '/app',
        menu: [],
        extraRoutes: [],
        features: {},
      }),
    });
    const t = createTranslator();
    router.afterEach((to) => setPageTitle(resolveRouteTitle(to, t)));
    return router;
  }

  it('sets the default title for a static route on navigation', async () => {
    const router = makeRouter();
    await router.push({ name: 'browse' });
    expect(document.title).toBe('Browse · Phlix');

    await router.push({ name: 'settings' });
    expect(document.title).toBe('Settings · Phlix');

    await router.push({ name: 'login' });
    expect(document.title).toBe('Welcome back · Phlix');
  });

  it('falls back to the bare app name for a data-driven route (page sets its own title)', async () => {
    const router = makeRouter();
    await router.push({ name: 'media', params: { id: '42' } });
    expect(document.title).toBe('Phlix');
  });

  it('uses the configured wordmark as the title suffix', async () => {
    setAppName('MyCinema');
    const router = makeRouter();
    await router.push({ name: 'browse' });
    expect(document.title).toBe('Browse · MyCinema');
  });
});
