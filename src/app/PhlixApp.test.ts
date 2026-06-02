import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia, type Pinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import PhlixApp from './PhlixApp.vue';
import MiniPlayer from '../components/MiniPlayer.vue';
import { useCommandStore } from '../stores/useCommandStore';
import type { PhlixAppConfig } from './types';

function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', name: 'browse', component: { template: '<div class="browse" />' } },
      { path: '/app/settings', name: 'settings', component: { template: '<div />' } },
      { path: '/app/movies', name: 'movies', component: { template: '<div />' } },
      { path: '/app/player/:id', name: 'player', component: { template: '<div class="player-route" />' } },
    ],
  });
}

let pinia: Pinia;
let router: Router;
let wrapper: VueWrapper | null = null;

async function mountApp(config: Partial<PhlixAppConfig> | null) {
  const w = mount(PhlixApp, {
    global: {
      plugins: [pinia, router],
      provide: {
        phlixConfig: config,
        phlixCommands: [],
        apiBase: '',
      },
    },
  });
  await router.isReady();
  await flushPromises();
  return w;
}

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
  pinia = createPinia();
  setActivePinia(pinia);
  router = makeRouter();
  void router.push('/app');
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
  wrapper?.unmount();
  wrapper = null;
  vi.unstubAllGlobals();
});

describe('PhlixApp — branding from config', () => {
  it('renders the default "Phlix" wordmark when no branding is configured', async () => {
    wrapper = await mountApp({ app: 'server', apiBase: '', routerBase: '/app' });
    expect(wrapper.find('.brand-wordmark').text()).toBe('Phlix');
    expect(wrapper.find('.brand-logo').exists()).toBe(false);
    expect(wrapper.find('.brand-tagline').exists()).toBe(false);
  });

  it('renders a custom wordmark, tagline and logo from branding config', async () => {
    wrapper = await mountApp({
      app: 'hub',
      apiBase: '',
      routerBase: '/app',
      branding: { wordmark: 'Phlix Hub', tagline: 'your servers', logoSrc: '/logo.svg', logoAlt: 'Hub logo' },
    });
    expect(wrapper.find('.brand-wordmark').text()).toBe('Phlix Hub');
    expect(wrapper.find('.brand-tagline').text()).toBe('your servers');
    const logo = wrapper.find('.brand-logo');
    expect(logo.attributes('src')).toBe('/logo.svg');
    expect(logo.attributes('alt')).toBe('Hub logo');
  });
});

describe('PhlixApp — menu from config', () => {
  it('renders configured menu items (router links and external hrefs)', async () => {
    wrapper = await mountApp({
      app: 'server',
      apiBase: '',
      routerBase: '/app',
      menu: [
        { id: 'movies', label: 'Movies', to: '/app/movies', icon: 'film' },
        { id: 'docs', label: 'Docs', href: 'https://example.com/docs' },
      ],
    });
    const links = wrapper.findAll('.nav-link');
    const labels = links.map((l) => l.text());
    expect(labels).toContain('Movies');
    expect(labels).toContain('Docs');
    const external = links.find((l) => l.text() === 'Docs')!;
    expect(external.attributes('href')).toBe('https://example.com/docs');
    // the icon for Movies rendered (real SVG, not emoji)
    expect(wrapper.find('.nav-link-icon').exists()).toBe(true);
  });

  it('sanitizes a script-scheme href and wires rel for new-tab links', async () => {
    wrapper = await mountApp({
      app: 'server',
      apiBase: '',
      routerBase: '/app',
      // eslint-disable-next-line no-script-url
      menu: [
        { id: 'bad', label: 'Bad', href: 'javascript:alert(1)' },
        { id: 'ext', label: 'External', href: 'https://example.com', target: '_blank' },
      ],
    });
    const links = wrapper.findAll('.nav-link');
    const bad = links.find((l) => l.text() === 'Bad')!;
    expect(bad.attributes('href')).toBeUndefined(); // script scheme dropped
    const ext = links.find((l) => l.text() === 'External')!;
    expect(ext.attributes('href')).toBe('https://example.com');
    expect(ext.attributes('target')).toBe('_blank');
    expect(ext.attributes('rel')).toBe('noopener noreferrer');
  });

  it('falls back to Browse/Settings when no menu is configured', async () => {
    wrapper = await mountApp({ app: 'server', apiBase: '', routerBase: '/app' });
    const labels = wrapper.findAll('.nav-link').map((l) => l.text());
    expect(labels).toEqual(['Browse', 'Settings']);
  });

  it('tolerates a missing config injection', async () => {
    wrapper = await mountApp(null);
    expect(wrapper.find('.brand-wordmark').text()).toBe('Phlix');
    expect(wrapper.findAll('.nav-link').map((l) => l.text())).toEqual(['Browse', 'Settings']);
  });
});

describe('PhlixApp — command palette trigger', () => {
  it('the ⌘K button opens the command palette', async () => {
    wrapper = await mountApp({ app: 'server', apiBase: '', routerBase: '/app' });
    const store = useCommandStore();
    expect(store.open).toBe(false);
    await wrapper.find('.nav-cmdk').trigger('click');
    expect(store.open).toBe(true);
  });
});

describe('PhlixApp — persistent mini-player', () => {
  it('mounts the mini-player in the shell and expand navigates to the player route', async () => {
    wrapper = await mountApp({ app: 'server', apiBase: '', routerBase: '/app' });
    const mini = wrapper.findComponent(MiniPlayer);
    expect(mini.exists()).toBe(true); // lives at the shell level, surviving route changes
    mini.vm.$emit('expand', 'm1');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/app/player/m1');
  });
});
