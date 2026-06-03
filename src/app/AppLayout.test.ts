import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import AppLayout from './AppLayout.vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';

const wrappers: VueWrapper[] = [];
function mountLayout() {
  const w = mount(AppLayout, {
    slots: {
      logo: '<span class="L">brand</span>',
      nav: '<a class="N" href="#">Browse</a>',
      actions: '<button class="A">act</button>',
      default: '<div class="M">page</div>',
      footer: '<span class="F">foot</span>',
    },
  });
  wrappers.push(w);
  return w;
}

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('AppLayout', () => {
  it('renders the logo / nav / actions / default / footer slots', () => {
    const w = mountLayout();
    expect(w.find('.shell__brand .L').exists()).toBe(true);
    expect(w.find('.shell__nav .N').exists()).toBe(true);
    expect(w.find('.shell__actions .A').exists()).toBe(true);
    expect(w.find('.shell__main .M').exists()).toBe(true);
    expect(w.find('.shell__footer .F').exists()).toBe(true);
  });

  it('mounts the AppBackdrop atmosphere gated on prefs.atmosphere', async () => {
    const w = mountLayout();
    const prefs = usePreferencesStore();
    expect(w.findComponent(AppBackdrop).props('enabled')).toBe(true);
    prefs.atmosphere = false;
    await flushPromises();
    expect(w.findComponent(AppBackdrop).props('enabled')).toBe(false);
  });

  it('opens a keyboard-trappable drawer from the hamburger, mirroring the nav slot', async () => {
    const w = mountLayout();
    expect(document.body.querySelector('.shell__drawer')).toBeNull(); // closed initially
    await w.get('.shell__hamburger').trigger('click');
    await flushPromises();
    const drawer = document.body.querySelector('.shell__drawer');
    expect(drawer).not.toBeNull();
    expect(drawer!.querySelector('.N')).not.toBeNull(); // same nav slot in the drawer
  });

  it('closes the drawer when a nav item inside it is clicked', async () => {
    const w = mountLayout();
    await w.get('.shell__hamburger').trigger('click');
    await flushPromises();
    const link = document.body.querySelector('.shell__drawer .N') as HTMLElement;
    expect(link).not.toBeNull();
    link.dispatchEvent(new Event('click', { bubbles: true }));
    await flushPromises();
    expect(document.body.querySelector('.shell__drawer')).toBeNull();
  });

  it('renders no footer element when no footer slot is provided', () => {
    const w = mount(AppLayout, { slots: { default: '<div />' } });
    wrappers.push(w);
    expect(w.find('.shell__footer').exists()).toBe(false);
    // no nav slot -> no hamburger
    expect(w.find('.shell__hamburger').exists()).toBe(false);
  });
});
