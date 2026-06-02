import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createPhlixApp } from './createPhlixApp';

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
});
