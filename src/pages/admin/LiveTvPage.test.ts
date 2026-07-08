/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { computed } from 'vue';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import LiveTvPage from './LiveTvPage.vue';
import Button from '../../components/ui/Button.vue';
import Switch from '../../components/ui/Switch.vue';
import Modal from '../../components/ui/Modal.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const tunerA = {
  tuner_id: 'tuner-1',
  type: 'HDHomeRun',
  name: 'Front Room',
  host: '192.168.1.100',
  port: 5004,
  device_id: 'dev-1',
  enabled: true,
  status: 'active',
  last_seen: '2026-05-27T00:00:00Z',
};
const tunerB = {
  tuner_id: 'tuner-2',
  type: 'IPTV',
  name: 'Bedroom',
  host: '192.168.1.101',
  port: 5004,
  enabled: false,
};
const channelA = { id: 'ch-1', name: 'BBC One', number: '1', enabled: true };
const channelB = { id: 'ch-2', name: 'ITV', number: '3', enabled: true };
const programA = {
  id: 'prog-1',
  title: 'Evening News',
  description: 'A'.repeat(150),
  start_time: 1700000000,
  end_time: 1700003600,
  rating: 'PG',
  season: 2,
  episode: 5,
  year: 2024,
};
const recordingA = {
  id: 'rec-1',
  channel_id: 'ch-1',
  channel_name: 'BBC One',
  program_title: 'The Movie',
  start_time: 1700000000,
  end_time: 1700007200,
  status: 'completed',
  size: 2 * 1024 * 1024,
};
const ruleA = {
  id: 'rule-1',
  title_pattern: 'News%',
  channel_id: 'ch-1',
  priority: 3,
  keep_until: 'space',
  enabled: true,
};

interface Overrides {
  tuners?: unknown[];
  channels?: unknown[];
  programs?: unknown[];
  recordings?: unknown[];
  rules?: unknown[];
  failTuners?: boolean;
  failGuide?: boolean;
  failRecordings?: boolean;
  failRules?: boolean;
  failChannels?: boolean;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/livetv/tuners') {
      if (over.failTuners) throw new Error('tuner boom');
      return { tuners: over.tuners ?? [tunerA, tunerB] };
    }
    if (endpoint === '/api/v1/admin/livetv/channels') {
      if (over.failChannels) throw new Error('channel boom');
      return { channels: over.channels ?? [channelA, channelB] };
    }
    if (endpoint === '/api/v1/admin/livetv/guide') {
      if (over.failGuide) throw new Error('guide boom');
      return { programs: over.programs ?? [programA] };
    }
    if (endpoint === '/api/v1/admin/livetv/recordings') {
      if (over.failRecordings) throw new Error('rec boom');
      return { recordings: over.recordings ?? [recordingA] };
    }
    if (endpoint === '/api/v1/admin/livetv/series-rules') {
      if (over.failRules) throw new Error('rule boom');
      return { rules: over.rules ?? [ruleA] };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/livetv/tuners/scan') return { tuners: [tunerA] };
    if (endpoint === '/api/v1/admin/livetv/guide/refresh') return { programs: 7 };
    if (endpoint === '/api/v1/admin/livetv/recordings') {
      return { recording: { ...recordingA, id: 'rec-new', program_title: 'Scheduled' } };
    }
    if (endpoint === '/api/v1/admin/livetv/series-rules') {
      return { rule: { ...ruleA, id: 'rule-new', title_pattern: 'Sport%' } };
    }
    throw new Error(`unexpected POST ${endpoint}`);
  });
  const put = vi.fn(async () => ({ tuner: { ...tunerA, enabled: false } }));
  const del = vi.fn(async () => ({ success: true }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(LiveTvPage, { props: { client }, attachTo: document.body });
}

/** Click the header button for a section by its visible heading text. */
async function expandSection(w: VueWrapper, heading: string): Promise<void> {
  const headerBtn = w
    .findAll('.admin-livetv__section-header')
    .find((b) => b.text().includes(heading));
  if (!headerBtn) throw new Error(`no section header for ${heading}`);
  await headerBtn.trigger('click');
  await flushPromises();
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1] as HTMLElement;
}

function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('LiveTvPage — scaffolding', () => {
  it('renders the heading and all four section headers', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('#livetv-heading').text()).toBe('Live TV / DVR');
    const headers = w.findAll('.admin-livetv__section-header');
    expect(headers).toHaveLength(4);
    const text = w.text();
    expect(text).toContain('Tuners');
    expect(text).toContain('Guide / EPG');
    expect(text).toContain('Recordings');
    expect(text).toContain('Series Rules');
  });

  it('eagerly loads tuners on mount (Tuners expanded by default)', async () => {
    const { client, get } = makeClient();
    mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners');
  });
});

describe('LiveTvPage — Tuners', () => {
  it('renders tuner cards with host:port', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Front Room');
    expect(w.text()).toContain('HDHomeRun');
    expect(w.text()).toContain('192.168.1.100:5004');
  });

  it('shows an empty state when no tuners exist', async () => {
    const { client } = makeClient({ tuners: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No tuners found');
  });

  it('shows an in-body error state (+ toast) on a tuner load failure', async () => {
    const { client } = makeClient({ failTuners: true });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load tuners");
    expect(w.text()).toContain('tuner boom');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });

  it('retries the tuner load from the error state', async () => {
    let calls = 0;
    const { client, get } = makeClient();
    get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/livetv/tuners') {
        calls += 1;
        if (calls === 1) throw new Error('tuner boom');
        return { tuners: [tunerA] };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain("Couldn't load tuners");
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load tuners");
    expect(w.text()).toContain('Front Room');
  });

  it('scans for tuners and replaces the list with a success toast', async () => {
    const { client, post } = makeClient({ tuners: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Scan for Tuners')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/scan');
    expect(w.text()).toContain('Front Room');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'success')).toBe(true);
  });

  it('toggling a tuner Switch PUTs the inverted enabled flag', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const sw = w.findAllComponents(Switch)[0]!;
    await sw.find('button').trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/tuner-1', { enabled: false });
  });

  it('deletes a tuner via the confirm modal', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Remove')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/tuner-1');
    expect(w.text()).not.toContain('Front Room');
  });

  it('cancelling the delete-tuner modal keeps the tuner', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(w.text()).toContain('Front Room');
  });
});

describe('LiveTvPage — Guide', () => {
  it('lazy-loads the guide on first expand', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).not.toHaveBeenCalledWith('/api/v1/admin/livetv/guide', expect.anything());
    await expandSection(w, 'Guide / EPG');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/guide', expect.any(Object));
    expect(w.text()).toContain('Evening News');
  });

  it('shows an empty state when no programmes', async () => {
    const { client } = makeClient({ programs: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    expect(w.text()).toContain('No programmes');
  });

  it('expands a programme to reveal its full description + meta on click', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    const prog = w.find('.admin-livetv__program');
    await prog.trigger('click');
    expect(w.find('.admin-livetv__program-expanded').exists()).toBe(true);
    expect(w.text()).toContain('S02E05');
    expect(w.text()).toContain('PG');
  });

  it('selecting a guide day refetches the guide', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    const guideCallsBefore = get.mock.calls.filter((c) => c[0] === '/api/v1/admin/livetv/guide').length;
    const dayBtns = w.findAll('.admin-livetv__segmented .admin-livetv__seg-btn');
    await dayBtns[1]!.trigger('click');
    await flushPromises();
    const guideCallsAfter = get.mock.calls.filter((c) => c[0] === '/api/v1/admin/livetv/guide').length;
    expect(guideCallsAfter).toBe(guideCallsBefore + 1);
  });

  it('refreshes the guide and surfaces a success toast', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    await findBtn(w, 'Refresh Guide')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/livetv/guide/refresh', undefined);
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'success')).toBe(true);
  });

  it('shows an in-body error state (+ toast) on a guide load failure', async () => {
    const { client } = makeClient({ failGuide: true });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    expect(w.text()).toContain("Couldn't load guide");
    expect(w.text()).toContain('guide boom');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });

  it('retries the guide load from the error state', async () => {
    let calls = 0;
    const { client, get } = makeClient();
    get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/livetv/tuners') return { tuners: [tunerA] };
      if (endpoint === '/api/v1/admin/livetv/guide') {
        calls += 1;
        if (calls === 1) throw new Error('guide boom');
        return { programs: [programA] };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    expect(w.text()).toContain("Couldn't load guide");
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load guide");
    expect(w.text()).toContain('Evening News');
  });
});

describe('LiveTvPage — Recordings', () => {
  it('lazy-loads recordings on first expand and renders cards', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', {});
    expect(w.text()).toContain('The Movie');
    expect(w.text()).toContain('BBC One');
  });

  it('shows the empty state with tab-specific copy', async () => {
    const { client } = makeClient({ recordings: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    expect(w.text()).toContain('No recordings yet.');
    const tabs = w.findAll('[role="tab"]');
    await tabs[1]!.trigger('click');
    expect(w.text()).toContain('No upcoming recordings.');
  });

  it('deletes a recording via the confirm modal', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings/rec-1');
    expect(w.text()).not.toContain('The Movie');
  });

  it('opens the schedule modal (loading channels) and validates required fields', async () => {
    const { client, get, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Schedule Recording')!.trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/channels');
    const panel = modalPanel();
    // submit with no title/dates -> validation toast, no POST
    await findBtnIn(w, panel, 'Schedule Recording')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', expect.anything());
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });

  it('schedules a recording with a valid form', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Schedule Recording')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    const inputs = panel.querySelectorAll<HTMLInputElement>('input');
    // [0]=title [1]=startDate [2]=startTime [3]=endDate [4]=endTime
    const setInput = async (el: HTMLInputElement, val: string) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      await flushPromises();
    };
    await setInput(inputs[0]!, 'News at Six');
    await setInput(inputs[1]!, '2026-06-02');
    await setInput(inputs[2]!, '18:00');
    await setInput(inputs[3]!, '2026-06-02');
    await setInput(inputs[4]!, '18:30');
    await findBtnIn(w, modalPanel(), 'Schedule Recording')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith(
      '/api/v1/admin/livetv/recordings',
      expect.objectContaining({ channel_id: 'ch-1', title: 'News at Six' }),
    );
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'success')).toBe(true);
  });

  it('rejects a schedule where end is not after start', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Schedule Recording')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    const inputs = panel.querySelectorAll<HTMLInputElement>('input');
    const setInput = async (el: HTMLInputElement, val: string) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      await flushPromises();
    };
    await setInput(inputs[0]!, 'Bad');
    await setInput(inputs[1]!, '2026-06-02');
    await setInput(inputs[2]!, '18:00');
    await setInput(inputs[3]!, '2026-06-02');
    await setInput(inputs[4]!, '17:00');
    await findBtnIn(w, modalPanel(), 'Schedule Recording')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', expect.anything());
  });

  it('shows an in-body error state (+ toast) on a recordings load failure', async () => {
    const { client } = makeClient({ failRecordings: true });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    expect(w.text()).toContain("Couldn't load recordings");
    expect(w.text()).toContain('rec boom');
    expect(w.text()).not.toContain('No recordings yet.');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });

  it('retries the recordings load from the error state', async () => {
    let calls = 0;
    const { client, get } = makeClient();
    get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/livetv/tuners') return { tuners: [tunerA] };
      if (endpoint === '/api/v1/admin/livetv/recordings') {
        calls += 1;
        if (calls === 1) throw new Error('rec boom');
        return { recordings: [recordingA] };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    expect(w.text()).toContain("Couldn't load recordings");
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load recordings");
    expect(w.text()).toContain('The Movie');
  });
});

describe('LiveTvPage — Series Rules', () => {
  it('lazy-loads rules + channels on first expand and renders rows', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/channels');
    expect(w.text()).toContain('News%');
    // channel resolved from id
    expect(w.text()).toContain('BBC One (1)');
  });

  it('shows the empty state when no rules', async () => {
    const { client } = makeClient({ rules: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    expect(w.text()).toContain('No series rules');
  });

  it('creates a rule with a valid form', async () => {
    const { client, post } = makeClient({ rules: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Add Rule')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    const pattern = panel.querySelector<HTMLInputElement>('input[type="text"]')!;
    pattern.value = 'Sport%';
    pattern.dispatchEvent(new Event('input', { bubbles: true }));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Add Rule')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith(
      '/api/v1/admin/livetv/series-rules',
      expect.objectContaining({ channel_id: 'ch-1', title: 'Sport%', priority: 3, keep_until: 'space' }),
    );
    expect(w.text()).toContain('Sport%');
  });

  it('rejects an empty title pattern', async () => {
    const { client, post } = makeClient({ rules: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Add Rule')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Add Rule')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules', expect.anything());
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });

  it('deletes a rule via the confirm modal', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    await findBtnIn(w, panel, 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules/rule-1');
    expect(w.text()).not.toContain('News%');
  });

  it('shows an in-body error state (+ toast) on a rules load failure', async () => {
    const { client } = makeClient({ failRules: true });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    expect(w.text()).toContain("Couldn't load series rules");
    expect(w.text()).toContain('rule boom');
    expect(w.text()).not.toContain('No series rules');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
  });

  it('retries the rules load from the error state', async () => {
    let calls = 0;
    const { client, get } = makeClient();
    get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/livetv/tuners') return { tuners: [tunerA] };
      if (endpoint === '/api/v1/admin/livetv/channels') return { channels: [channelA, channelB] };
      if (endpoint === '/api/v1/admin/livetv/series-rules') {
        calls += 1;
        if (calls === 1) throw new Error('rule boom');
        return { rules: [ruleA] };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    expect(w.text()).toContain("Couldn't load series rules");
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load series rules");
    expect(w.text()).toContain('News%');
  });

  it('falls back to the raw channel id when no channel matches', async () => {
    const { client } = makeClient({
      rules: [{ id: 'r9', title_pattern: 'Any%', channel_id: 'ghost-ch', enabled: true }],
      channels: [],
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    expect(w.text()).toContain('ghost-ch');
  });
});

describe('LiveTvPage — section collapse', () => {
  it('collapses Tuners when its header is clicked again', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('#livetv-tuners-body').exists()).toBe(true);
    await expandSection(w, 'Tuners');
    expect(w.find('#livetv-tuners-body').exists()).toBe(false);
  });
});

// ── apiBase injection (no client prop) ─────────────────────────────────────────
describe('LiveTvPage — apiBase injection fallback', () => {
  it('builds its own ApiClient from an injected ComputedRef apiBase when no client prop', async () => {
    // No `client` prop -> the page constructs a real ApiClient, reading
    // apiBase.value (the non-string ComputedRef branch). Stub fetch so the
    // eager tuners load just rejects into a toast.
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('network down'));
    const w = mount(LiveTvPage, {
      props: {},
      global: { provide: { apiBase: computed(() => 'https://api.example.test') } },
      attachTo: document.body,
    });
    await flushPromises();
    // The eager tuner load attempted a real fetch against the injected base.
    expect(fetchSpy).toHaveBeenCalled();
    const url = String(fetchSpy.mock.calls[0]?.[0] ?? '');
    expect(url).toContain('https://api.example.test');
    expect(url).toContain('/api/v1/admin/livetv/tuners');
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error')).toBe(true);
    w.unmount();
    fetchSpy.mockRestore();
  });
});

// ── Format / label helpers via rendered output ─────────────────────────────────
describe('LiveTvPage — formatting helpers', () => {
  it('formats a sub-hour recording duration as minutes only', async () => {
    // 30-minute recording exercises the `mins < 60` branch of formatDuration.
    const { client } = makeClient({
      recordings: [
        {
          id: 'rec-short',
          channel_id: 'ch-1',
          channel_name: 'BBC One',
          program_title: 'Short Show',
          start_time: 1700000000,
          end_time: 1700000000 + 30 * 60,
          status: 'completed',
        },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    expect(w.text()).toContain('30m');
  });

  it('formats an exact-hour recording duration without trailing minutes', async () => {
    // 2h0m exercises the `m > 0` false branch (`${h}h`).
    const { client } = makeClient({
      recordings: [
        {
          id: 'rec-2h',
          channel_id: 'ch-1',
          channel_name: 'BBC One',
          program_title: 'Two Hour Movie',
          start_time: 1700000000,
          end_time: 1700000000 + 2 * 3600,
          status: 'completed',
        },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    expect(w.text()).toContain('2h');
    expect(w.text()).not.toContain('2h 0m');
  });

  it('renders an episode code from a programme with a season but no episode', async () => {
    // season set, episode undefined -> episodeCode uses the `?? 0` fallback.
    const { client } = makeClient({
      programs: [
        {
          id: 'prog-noep',
          title: 'Season Premiere',
          description: 'desc',
          start_time: 1700000000,
          end_time: 1700003600,
          season: 3,
        },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    await w.find('.admin-livetv__program').trigger('click');
    expect(w.text()).toContain('S03E00');
  });
});

// ── Recording status tones ─────────────────────────────────────────────────────
describe('LiveTvPage — recording status tone', () => {
  it('renders failed and in-progress recordings (warning + neutral tones)', async () => {
    const { client } = makeClient({
      recordings: [
        {
          id: 'rec-failed',
          channel_id: 'ch-1',
          channel_name: 'BBC One',
          program_title: 'Failed Capture',
          start_time: 1700000000,
          end_time: 1700003600,
          status: 'failed',
        },
        {
          id: 'rec-recording',
          channel_id: 'ch-1',
          channel_name: 'ITV',
          program_title: 'Live Capture',
          start_time: 1700000000,
          end_time: 1700003600,
          status: 'recording',
        },
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    expect(w.text()).toContain('failed');
    expect(w.text()).toContain('recording');
  });

  it('uses the by-series empty-state copy', async () => {
    const { client } = makeClient({ recordings: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    const tabs = w.findAll('[role="tab"]');
    await tabs[2]!.trigger('click');
    expect(w.text()).toContain('No series recordings.');
  });
});

// ── Mutation failure (catch) branches ──────────────────────────────────────────
describe('LiveTvPage — mutation failure toasts', () => {
  it('toasts when a tuner scan fails', async () => {
    const { client, post } = makeClient({ tuners: [] });
    (post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('scan exploded'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Scan for Tuners')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'scan exploded')).toBe(true);
  });

  it('toasts when toggling a tuner fails', async () => {
    const { client, put } = makeClient();
    (put as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('toggle exploded'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Switch)[0]!.find('button').trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'toggle exploded')).toBe(true);
  });

  it('toasts (with fallback copy) when deleting a tuner fails', async () => {
    const { client, del } = makeClient();
    // Reject with a non-Error so the fallback message branch of errMessage runs.
    (del as ReturnType<typeof vi.fn>).mockRejectedValueOnce('nope');
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Remove')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'Failed to delete tuner.')).toBe(true);
    // The confirm modal is dismissed (deletingTuner reset to null) on failure too.
    expect(w.text()).toContain('Front Room');
  });

  it('toasts when refreshing the guide fails', async () => {
    const { client, post } = makeClient();
    (post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('refresh exploded'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    await findBtn(w, 'Refresh Guide')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'refresh exploded')).toBe(true);
  });

  it('toasts when deleting a recording fails', async () => {
    const { client, del } = makeClient();
    (del as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('rec delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'rec delete boom')).toBe(true);
    expect(w.text()).toContain('The Movie');
  });

  it('toasts when scheduling a recording fails', async () => {
    const { client, post } = makeClient();
    (post as ReturnType<typeof vi.fn>).mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/livetv/recordings') throw new Error('schedule boom');
      throw new Error(`unexpected POST ${endpoint}`);
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Schedule Recording')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('input');
    const setInput = async (el: HTMLInputElement, val: string) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      await flushPromises();
    };
    await setInput(inputs[0]!, 'News at Six');
    await setInput(inputs[1]!, '2026-06-02');
    await setInput(inputs[2]!, '18:00');
    await setInput(inputs[3]!, '2026-06-02');
    await setInput(inputs[4]!, '18:30');
    await findBtnIn(w, modalPanel(), 'Schedule Recording')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'schedule boom')).toBe(true);
  });

  it('toasts when deleting a series rule fails', async () => {
    const { client, del } = makeClient();
    (del as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('rule delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'rule delete boom')).toBe(true);
    expect(w.text()).toContain('News%');
  });

  it('toasts when creating a series rule fails', async () => {
    const { client, post } = makeClient({ rules: [] });
    (post as ReturnType<typeof vi.fn>).mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/livetv/series-rules') throw new Error('create rule boom');
      throw new Error(`unexpected POST ${endpoint}`);
    });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Add Rule')!.trigger('click');
    await flushPromises();
    const pattern = modalPanel().querySelector<HTMLInputElement>('input[type="text"]')!;
    pattern.value = 'Sport%';
    pattern.dispatchEvent(new Event('input', { bubbles: true }));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Add Rule')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'create rule boom')).toBe(true);
  });
});

// ── Validation guards ──────────────────────────────────────────────────────────
describe('LiveTvPage — form validation guards', () => {
  it('rejects a schedule when no channel is selected', async () => {
    // No channels -> schedChannelId stays '' -> the channel-required guard fires.
    const { client, post } = makeClient({ channels: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Schedule Recording')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Schedule Recording')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', expect.anything());
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'Channel is required.')).toBe(true);
  });

  it('rejects a schedule with a channel + title but missing dates/times', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Schedule Recording')!.trigger('click');
    await flushPromises();
    const titleInput = modalPanel().querySelector<HTMLInputElement>('input[type="text"]')!;
    titleInput.value = 'Only a title';
    titleInput.dispatchEvent(new Event('input', { bubbles: true }));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Schedule Recording')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', expect.anything());
    const toasts = useToastStore();
    expect(
      toasts.toasts.some((t) => t.tone === 'error' && t.message === 'Start and end date/time are required.'),
    ).toBe(true);
  });

  it('rejects a rule with a title pattern but no channel', async () => {
    // No channels -> ruleChannelId stays '' -> the channel-required guard fires
    // after the title-pattern check passes.
    const { client, post } = makeClient({ rules: [], channels: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Add Rule')!.trigger('click');
    await flushPromises();
    const pattern = modalPanel().querySelector<HTMLInputElement>('input[type="text"]')!;
    pattern.value = 'News%';
    pattern.dispatchEvent(new Event('input', { bubbles: true }));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Add Rule')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules', expect.anything());
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'Channel is required.')).toBe(true);
  });
});

// ── Keyboard interaction + priority input ───────────────────────────────────────
describe('LiveTvPage — keyboard + numeric inputs', () => {
  it('toggles a programme open via the Enter key and closed via Space', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    const prog = w.find('.admin-livetv__program');
    await prog.trigger('keydown.enter');
    expect(w.find('.admin-livetv__program-expanded').exists()).toBe(true);
    await prog.trigger('keydown.space');
    expect(w.find('.admin-livetv__program-expanded').exists()).toBe(false);
  });

  it('updates the rule priority from the number input', async () => {
    const { client, post } = makeClient({ rules: [] });
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Add Rule')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    const pattern = panel.querySelector<HTMLInputElement>('input[type="text"]')!;
    pattern.value = 'Sport%';
    pattern.dispatchEvent(new Event('input', { bubbles: true }));
    const priority = panel.querySelector<HTMLInputElement>('input[type="number"]')!;
    priority.value = '5';
    priority.dispatchEvent(new Event('input', { bubbles: true }));
    await flushPromises();
    expect(priority.value).toBe('5');
    await findBtnIn(w, modalPanel(), 'Add Rule')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith(
      '/api/v1/admin/livetv/series-rules',
      expect.objectContaining({ priority: 5 }),
    );
  });
});

// ── Confirm-modal dismissal (update:model-value -> null) ────────────────────────
describe('LiveTvPage — confirm modal dismissal via backdrop/close', () => {
  it('resets the deleting tuner when the confirm modal emits update:modelValue', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    // The page binds @update:model-value="deletingTuner = null" on the confirm Modal.
    const tunerModal = w
      .findAllComponents(Modal)
      .find((m) => m.props('title') === 'Remove tuner');
    tunerModal!.vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(document.querySelector('.phlix-modal__panel')).toBeNull();
    expect(w.text()).toContain('Front Room');
  });

  it('resets the deleting recording when the confirm modal Cancel is clicked', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    // Footer Cancel button on the recording-delete modal.
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(document.querySelector('.phlix-modal__panel')).toBeNull();
    expect(w.text()).toContain('The Movie');
  });

  it('resets the deleting recording when the confirm modal emits update:modelValue', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    // The recording-delete Modal binds @update:model-value="deletingRecording = null".
    const recModal = w
      .findAllComponents(Modal)
      .find((m) => m.props('title') === 'Delete recording');
    recModal!.vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(document.querySelector('.phlix-modal__panel')).toBeNull();
    expect(w.text()).toContain('The Movie');
  });

  it('resets the deleting series rule when the confirm modal emits update:modelValue', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Series Rules');
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    const ruleModal = w
      .findAllComponents(Modal)
      .find((m) => m.props('title') === 'Delete series rule');
    ruleModal!.vm.$emit('update:modelValue', false);
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(document.querySelector('.phlix-modal__panel')).toBeNull();
    expect(w.text()).toContain('News%');
  });
});

describe('Admin LiveTvPage — a11y semantics (R6.5a.2)', () => {
  it('renders guide programmes as toggle buttons (role=button + aria-pressed)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Guide / EPG');
    const card = w.find('.admin-livetv__program');
    expect(card.attributes('role')).toBe('button');
    expect(card.attributes('aria-pressed')).toBe('false');
    // The grid container is no longer role=list — its children are buttons now.
    expect(w.find('.admin-livetv__guide-grid').attributes('role')).toBeUndefined();
    await card.trigger('click');
    expect(w.find('.admin-livetv__program').attributes('aria-pressed')).toBe('true');
    w.unmount();
  });

  it('exposes the Recordings filter as a roving tablist controlling a labelled tabpanel', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    const tabs = w.findAll('[role="tab"]');
    expect(tabs[0]!.attributes('tabindex')).toBe('0');
    expect(tabs[1]!.attributes('tabindex')).toBe('-1');
    const active = tabs.find((t) => t.attributes('aria-selected') === 'true')!;
    const panel = w.find('[role="tabpanel"]');
    expect(panel.exists()).toBe(true);
    expect(active.attributes('aria-controls')).toBe(panel.attributes('id'));
    expect(panel.attributes('aria-labelledby')).toBe(active.attributes('id'));
    w.unmount();
  });

  it('ArrowRight moves + focuses the next recording tab', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    const list = w.find('.admin-livetv__segmented[role="tablist"]');
    await list.trigger('keydown', { key: 'ArrowRight' });
    await flushPromises();
    const tabs = w.findAll('[role="tab"]');
    expect(tabs[1]!.attributes('aria-selected')).toBe('true');
    expect(tabs[1]!.attributes('tabindex')).toBe('0');
    expect(document.activeElement).toBe(tabs[1]!.element);
    w.unmount();
  });

  it('ArrowLeft wraps, Home/End jump, and other keys are ignored (recording tabs)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await expandSection(w, 'Recordings');
    const list = w.find('.admin-livetv__segmented[role="tablist"]');
    // ArrowLeft from the first tab wraps to the last of the 3 filters.
    await list.trigger('keydown', { key: 'ArrowLeft' });
    await flushPromises();
    expect(w.findAll('[role="tab"]')[2]!.attributes('aria-selected')).toBe('true');
    // Home → first, End → last.
    await list.trigger('keydown', { key: 'Home' });
    await flushPromises();
    expect(w.findAll('[role="tab"]')[0]!.attributes('aria-selected')).toBe('true');
    await list.trigger('keydown', { key: 'End' });
    await flushPromises();
    expect(w.findAll('[role="tab"]')[2]!.attributes('aria-selected')).toBe('true');
    // A non-navigation key changes nothing.
    await list.trigger('keydown', { key: 'x' });
    await flushPromises();
    expect(w.findAll('[role="tab"]')[2]!.attributes('aria-selected')).toBe('true');
    w.unmount();
  });
});
