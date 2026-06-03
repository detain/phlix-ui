import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SettingsPage from './SettingsPage.vue';
import AppearanceSettings from '../components/AppearanceSettings.vue';
import SettingsForm from '../components/SettingsForm.vue';
import { useAuthStore } from '../stores/useAuthStore';

const wrappers: VueWrapper[] = [];
function mountPage() {
  const auth = useAuthStore();
  // SettingsForm fetches on mount when the Server tab activates — keep it inert.
  vi.spyOn(auth.client, 'get').mockResolvedValue({} as never);
  const w = mount(SettingsPage);
  wrappers.push(w);
  return w;
}
const tabByLabel = (w: VueWrapper, label: string) =>
  w.findAll('[role="tab"]').find((t) => t.text().includes(label))!;

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount();
  vi.restoreAllMocks();
});

describe('SettingsPage', () => {
  it('renders Appearance / Playback / Server tabs', () => {
    const w = mountPage();
    const labels = w.findAll('[role="tab"]').map((t) => t.text());
    expect(labels.some((l) => l.includes('Appearance'))).toBe(true);
    expect(labels.some((l) => l.includes('Playback'))).toBe(true);
    expect(labels.some((l) => l.includes('Server'))).toBe(true);
  });

  it('defaults to the Appearance panel', () => {
    const w = mountPage();
    const aps = w.findComponent(AppearanceSettings);
    expect(aps.exists()).toBe(true);
    expect(aps.props('panel')).toBe('appearance');
    expect(w.findComponent(SettingsForm).exists()).toBe(false);
  });

  it('switches to the Playback panel', async () => {
    const w = mountPage();
    await tabByLabel(w, 'Playback').trigger('click');
    expect(w.findComponent(AppearanceSettings).props('panel')).toBe('playback');
  });

  it('switches to the Server panel (SettingsForm)', async () => {
    const w = mountPage();
    await tabByLabel(w, 'Server').trigger('click');
    await flushPromises();
    expect(w.findComponent(SettingsForm).exists()).toBe(true);
    expect(w.findComponent(AppearanceSettings).exists()).toBe(false);
  });

  it('renders consumer settings i18n overrides for the page chrome + tabs', () => {
    const auth = useAuthStore();
    vi.spyOn(auth.client, 'get').mockResolvedValue({} as never);
    const w = mount(SettingsPage, {
      global: { provide: { phlixConfig: { messages: { settings: { title: 'Ajustes', tabServer: 'Servidor' } } } } },
    });
    wrappers.push(w);
    expect(w.find('.settings-page__title').text()).toBe('Ajustes'); // overridden heading
    const tabs = w.findAll('[role="tab"]').map((t) => t.text());
    expect(tabs.some((l) => l.includes('Servidor'))).toBe(true); // overridden tab
    expect(tabs.some((l) => l.includes('Appearance'))).toBe(true); // un-overridden tab still English
  });
});
