import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import CastDevicesPage from './CastDevicesPage.vue';
import Button from '../../components/ui/Button.vue';
import Slider from '../../components/ui/Slider.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const castDevice = {
  device_id: 'cast-1',
  name: 'Living Room TV',
  host: '192.168.1.100',
  port: 8009,
  model: 'Chromecast Ultra',
  address: 'aa:bb',
};
const airplayDevice = {
  device_id: 'ap-1',
  name: 'Kitchen',
  host: '192.168.1.101',
  port: 7000,
  model: 'Apple TV',
  address: 'cc:dd',
};

interface Overrides {
  cast?: unknown[];
  airplay?: unknown[];
  castStatus?: Record<string, unknown>;
  airplayStatus?: Record<string, unknown>;
  post?: ReturnType<typeof vi.fn>;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/cast/devices') return { devices: over.cast ?? [castDevice] };
    if (endpoint === '/api/v1/airplay/devices') return { devices: over.airplay ?? [airplayDevice] };
    if (/\/api\/v1\/cast\/devices\/.+\/status$/.test(endpoint)) {
      return (
        over.castStatus ?? {
          device_id: 'cast-1',
          state: 'PLAYING',
          media_status: { media_title: 'Movie', position_seconds: 30, duration_seconds: 120 },
        }
      );
    }
    if (/\/api\/v1\/airplay\/devices\/.+\/status$/.test(endpoint)) {
      return over.airplayStatus ?? { device_id: 'ap-1', media_title: 'Song', state: 'PAUSED' };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = over.post ?? vi.fn(async () => ({ success: true }));
  const client = { get, post } as unknown as ApiClient;
  return { client, get, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(CastDevicesPage, { props: { client }, attachTo: document.body });
}

function findBtn(w: VueWrapper, label: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === label)!;
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('Admin CastDevicesPage', () => {
  it('loads both device lists on mount and shows the Chromecast tab first', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/cast/devices');
    expect(get).toHaveBeenCalledWith('/api/v1/airplay/devices');
    expect(w.text()).toContain('Chromecast Devices');
    expect(w.text()).toContain('Living Room TV');
  });

  it('switches to the AirPlay tab and lists its devices', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const airplayTab = w.findAll('[role="tab"]')[1];
    await airplayTab.trigger('click');
    await flushPromises();
    expect(w.text()).toContain('AirPlay Devices');
    expect(w.text()).toContain('Kitchen');
  });

  it('shows an EmptyState when no devices are discovered', async () => {
    const { client } = makeClient({ cast: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    expect(w.findComponent(EmptyState).props('title')).toContain('No Chromecast devices');
  });

  it('selects a Cast device and loads its transport state with a seek bar', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/status');
    expect(w.text()).toContain('Playback Controls');
    expect(w.text()).toContain('Movie');
    expect(w.findComponent(Slider).exists()).toBe(true);
    // Playing => Pause enabled, Play disabled
    expect(findBtn(w, 'Play').props('disabled')).toBe(true);
    expect(findBtn(w, 'Pause').props('disabled')).toBe(false);
  });

  it('pauses then plays a Cast device, posting to the right endpoints', async () => {
    const post = vi.fn(async () => ({ success: true }));
    const { client } = makeClient({ post });
    const w = mountPage(client);
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Pause').trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/pause');
    // now paused → Play enabled
    await findBtn(w, 'Play').trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/play');
  });

  it('stops a Cast device', async () => {
    const post = vi.fn(async () => ({ success: true }));
    const { client } = makeClient({ post });
    const w = mountPage(client);
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Stop').trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/stop');
  });

  it('seeks a Cast device via the Slider change event', async () => {
    const post = vi.fn(async () => ({ success: true }));
    const { client } = makeClient({ post });
    const w = mountPage(client);
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    w.findComponent(Slider).vm.$emit('change', 60);
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/cast/devices/cast-1/seek', { position_ms: 60000 });
  });

  it('toasts when a transport action reports success:false', async () => {
    const post = vi.fn(async () => ({ success: false, message: 'nope' }));
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Stop').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'nope')).toBe(true);
  });

  it('toasts when a transport action throws', async () => {
    const post = vi.fn().mockRejectedValue(new Error('cast down'));
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Stop').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'cast down')).toBe(true);
  });

  it('selects an AirPlay device (paused, no seek bar) and resumes via /resume', async () => {
    const post = vi.fn(async () => ({ success: true }));
    const { client } = makeClient({ post });
    const w = mountPage(client);
    await flushPromises();
    await w.findAll('[role="tab"]')[1].trigger('click');
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    expect(w.findComponent(Slider).exists()).toBe(false);
    expect(w.text()).toContain('Song');
    await findBtn(w, 'Play').trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/airplay/devices/ap-1/resume');
  });

  it('clears the selection and panel when switching tabs', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Playback Controls');
    await w.findAll('[role="tab"]')[1].trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain('Playback Controls');
  });

  it('shows an in-body error state (+ toast) when the device list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('disk gone'));
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.props('title')).toContain("Couldn't load Chromecast devices");
    expect(w.text()).toContain('disk gone');
    expect(w.text()).not.toContain('No Chromecast devices');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'disk gone')).toBe(true);
    w.unmount();
  });

  it('retries the Chromecast device list from the error state', async () => {
    let castCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/cast/devices') {
        castCalls += 1;
        if (castCalls === 1) throw new Error('disk gone');
        return { devices: [castDevice] };
      }
      if (endpoint === '/api/v1/airplay/devices') return { devices: [] };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.props('title')).toContain("Couldn't load Chromecast devices");
    await empty.find('button').trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Living Room TV');
    expect(w.text()).not.toContain("Couldn't load Chromecast devices");
    w.unmount();
  });

  it('shows a per-tab error state for the AirPlay tab independently of Chromecast', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/cast/devices') return { devices: [castDevice] };
      if (endpoint === '/api/v1/airplay/devices') throw new Error('airplay gone');
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage({ get, post: vi.fn() } as unknown as ApiClient);
    await flushPromises();
    // Chromecast loaded fine → no error on the active tab.
    expect(w.text()).toContain('Living Room TV');
    expect(w.text()).not.toContain("Couldn't load");
    // Switch to AirPlay → its own error state shows.
    await w.findAll('[role="tab"]')[1].trigger('click');
    await flushPromises();
    const empty = w.findComponent(EmptyState);
    expect(empty.props('title')).toContain("Couldn't load AirPlay devices");
    expect(w.text()).toContain('airplay gone');
    w.unmount();
  });

  it('toasts when the transport status fails to load', async () => {
    const { client, get } = makeClient();
    get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/cast/devices') return { devices: [castDevice] };
      if (endpoint === '/api/v1/airplay/devices') return { devices: [] };
      throw new Error('status boom');
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'status boom')).toBe(true);
  });

  it('renders durations >= 1h in H:MM:SS form (formatTime hour branch)', async () => {
    // duration 3661s -> "1:01:01"; position 3600s -> "1:00:00".
    const { client } = makeClient({
      castStatus: {
        device_id: 'cast-1',
        state: 'PLAYING',
        media_status: { media_title: 'Long Movie', position_seconds: 3600, duration_seconds: 3661 },
      },
    });
    const w = mountPage(client);
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    const text = w.text();
    expect(text).toContain('1:00:00');
    expect(text).toContain('1:01:01');
  });

  it('does not refetch when clicking the already-active tab (handleTabChange early-return)', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const callsAfterMount = get.mock.calls.length;
    // The Chromecast tab is already active; clicking it must early-return.
    await w.findAll('[role="tab"]')[0].trigger('click');
    await flushPromises();
    expect(get.mock.calls.length).toBe(callsAfterMount);
    // Selecting then re-clicking the active tab must not clear the selection.
    await w.find('.device-card').trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Playback Controls');
    await w.findAll('[role="tab"]')[0].trigger('click');
    await flushPromises();
    expect(w.text()).toContain('Playback Controls');
  });

  it('toasts when Play reports success:false', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/play')) return { success: false, message: 'play nope' };
      return { success: true };
    });
    const { client } = makeClient({
      post,
      castStatus: {
        device_id: 'cast-1',
        state: 'PAUSED',
        media_status: { media_title: 'Movie', position_seconds: 0, duration_seconds: 120 },
      },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Play').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'play nope')).toBe(true);
  });

  it('toasts when Play throws (catch branch)', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/play')) throw new Error('play down');
      return { success: true };
    });
    const { client } = makeClient({
      post,
      castStatus: {
        device_id: 'cast-1',
        state: 'PAUSED',
        media_status: { media_title: 'Movie', position_seconds: 0, duration_seconds: 120 },
      },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Play').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'play down')).toBe(true);
  });

  it('toasts the fallback message when Play rejects with a non-Error', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/play')) throw 'oops';
      return { success: true };
    });
    const { client } = makeClient({
      post,
      castStatus: {
        device_id: 'cast-1',
        state: 'PAUSED',
        media_status: { media_title: 'Movie', position_seconds: 0, duration_seconds: 120 },
      },
    });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Play').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'Play failed.')).toBe(true);
  });

  it('toasts when Pause reports success:false', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/pause')) return { success: false, message: 'pause nope' };
      return { success: true };
    });
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Pause').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'pause nope')).toBe(true);
  });

  it('toasts when Pause throws (catch branch)', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/pause')) throw new Error('pause down');
      return { success: true };
    });
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    await findBtn(w, 'Pause').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'pause down')).toBe(true);
  });

  it('toasts when Seek reports success:false', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/seek')) return { success: false, message: 'seek nope' };
      return { success: true };
    });
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    w.findComponent(Slider).vm.$emit('change', 60);
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'seek nope')).toBe(true);
  });

  it('toasts when Seek throws (catch branch)', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/seek')) throw new Error('seek down');
      return { success: true };
    });
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    w.findComponent(Slider).vm.$emit('change', 60);
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'seek down')).toBe(true);
  });

  it('uses the default "Seek failed." message when success:false carries no message', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/seek')) return { success: false };
      return { success: true };
    });
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    w.findComponent(Slider).vm.$emit('change', 90);
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'Seek failed.')).toBe(true);
  });

  it('pauses then stops an AirPlay device (airPlayPause / airPlayStop branches)', async () => {
    const post = vi.fn(async () => ({ success: true }));
    const { client } = makeClient({
      post,
      // AirPlay device reports PLAYING so Pause is enabled.
      airplayStatus: { device_id: 'ap-1', media_title: 'Song', state: 'PLAYING' },
    });
    const w = mountPage(client);
    await flushPromises();
    await w.findAll('[role="tab"]')[1].trigger('click');
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    // No seek bar on AirPlay.
    expect(w.findComponent(Slider).exists()).toBe(false);
    await findBtn(w, 'Pause').trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/airplay/devices/ap-1/pause');
    await findBtn(w, 'Stop').trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/airplay/devices/ap-1/stop');
  });

  it('toasts when an AirPlay action throws (airPlayPlay catch)', async () => {
    const post = vi.fn(async (endpoint: string) => {
      if (endpoint.endsWith('/resume')) throw new Error('airplay down');
      return { success: true };
    });
    const { client } = makeClient({ post });
    const w = mountPage(client);
    const toasts = useToastStore();
    await flushPromises();
    await w.findAll('[role="tab"]')[1].trigger('click');
    await flushPromises();
    await w.find('.device-card').trigger('click');
    await flushPromises();
    // AirPlay status defaults to PAUSED → Play (resume) enabled.
    await findBtn(w, 'Play').trigger('click');
    await flushPromises();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'airplay down')).toBe(true);
  });

  it('reads apiBase from a string provide without breaking (string branch of computed)', async () => {
    // Cover the `typeof injectedApiBase === 'string'` branch of the apiBase
    // computed while still injecting the mock client so no real ApiClient is hit.
    const { client, get } = makeClient();
    const w = mount(CastDevicesPage, {
      props: { client },
      global: { provide: { apiBase: 'http://example.test' } },
      attachTo: document.body,
    });
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/cast/devices');
    expect(w.text()).toContain('Living Room TV');
    w.unmount();
  });
});
