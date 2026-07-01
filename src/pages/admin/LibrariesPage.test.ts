import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import LibrariesPage from './LibrariesPage.vue';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import SourcePriorityEditor from '../../components/SourcePriorityEditor.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const lib = {
  id: 'lib-1',
  name: 'Movies',
  type: 'movie',
  paths: ['/media/movies'],
  options: {},
};

function job(overrides: Record<string, unknown> = {}) {
  return {
    id: 'job-1',
    library_id: 'lib-1',
    type: 'scan',
    status: 'running',
    items_found: 0,
    items_added: 0,
    items_updated: 0,
    items_removed: 0,
    current_path: null,
    error: null,
    queued_at: '2026-05-27T00:00:00Z',
    started_at: '2026-05-27T00:00:01Z',
    completed_at: null,
    ...overrides,
  };
}

interface Overrides {
  libraries?: unknown[];
  /** Default scan-status returned for the per-library status fetch on load. */
  scanStatus?: unknown;
  history?: unknown[];
  /** Sources returned by GET /api/v1/admin/metadata/sources. */
  sources?: string[];
}

/** Default built-in source order the metadata-sources endpoint returns. */
const DEFAULT_SOURCES = ['tmdb', 'imdb', 'tvdb', 'fanart', 'local'];

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/libraries') return { libraries: over.libraries ?? [lib] };
    if (endpoint === '/api/v1/admin/metadata/sources') {
      return { sources: over.sources ?? DEFAULT_SOURCES };
    }
    if (endpoint.endsWith('/scan-status')) return { scan_status: over.scanStatus ?? null };
    if (endpoint.endsWith('/scan-history')) return { history: over.history ?? [] };
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(
    async (_endpoint: string, _data?: unknown): Promise<Record<string, unknown>> => ({
      job_id: 'job-1',
      status: 'queued',
      message: 'Scan queued.',
    }),
  );
  const put = vi.fn(async (_endpoint: string, _data?: unknown) => ({ message: 'updated' }));
  const del = vi.fn(async () => ({ message: 'deleted' }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient, pollIntervalMs = 50): VueWrapper {
  return mount(LibrariesPage, {
    props: { client, pollIntervalMs },
    attachTo: document.body,
  });
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}
function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}
function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1];
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Admin LibrariesPage — list', () => {
  it('renders rows with name, type, path count and idle status', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/libraries');
    const text = w.text();
    expect(text).toContain('Movies');
    expect(text).toContain('movie');
    expect(text).toContain('1 paths');
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Idle');
    w.unmount();
  });

  it('shows a skeleton while loading then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn(() => new Promise((r) => { resolve = r; }));
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-libraries__skel').exists()).toBe(true);
    resolve({ libraries: [] });
    await flushPromises();
    expect(w.text()).toContain('No libraries yet');
    w.unmount();
  });

  it('shows an empty state with no libraries', async () => {
    const { client } = makeClient({ libraries: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No libraries yet');
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the list fails to load', async () => {
    const get = vi.fn().mockRejectedValue(new Error('DB down'));
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    // R5.3d.1: the load failure renders an in-body EmptyState (error + Retry)
    // instead of falling through to the misleading "No libraries yet", and still
    // fires a toast.
    const empty = w.findComponent(EmptyState);
    expect(empty.exists()).toBe(true);
    expect(empty.text()).toContain('load libraries');
    expect(w.text()).toContain('DB down');
    expect(w.text()).not.toContain('No libraries yet');
    expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'DB down')).toBe(true);
    w.unmount();
  });

  it('retries the list load from the error state', async () => {
    // Fail the FIRST /api/v1/libraries call, succeed on the retry. The mock is
    // endpoint-aware (not order-based) because the page also fetches the source
    // list on mount, which must not consume the one-shot failure.
    let libraryCall = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') {
        libraryCall += 1;
        if (libraryCall === 1) throw new Error('DB down');
        return { libraries: [lib] };
      }
      if (endpoint === '/api/v1/admin/metadata/sources') return { sources: DEFAULT_SOURCES };
      if (endpoint.endsWith('/scan-status')) return { scan_status: null };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const w = mountPage(
      { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient,
      100000,
    );
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(true);
    await w.findComponent(EmptyState).find('button').trigger('click');
    await flushPromises();
    expect(w.findComponent(EmptyState).exists()).toBe(false);
    expect(w.text()).toContain('Movies');
    w.unmount();
  });

  it('falls back to a generic message for a non-Error rejection', async () => {
    const get = vi.fn().mockRejectedValue('weird');
    const w = mountPage({ get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
    const toasts = useToastStore();
    await flushPromises();
    expect(toasts.toasts.some((t) => t.message === 'Failed to load libraries.')).toBe(true);
    w.unmount();
  });

  it('shows the error string for a failed job and a success badge for completed', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'failed', error: 'ffprobe missing' }) });
    const w = mountPage(client);
    await flushPromises();
    const badge = w.find('[data-testid="status-lib-1"]');
    expect(badge.text()).toContain('Failed');
    expect(badge.text()).toContain('ffprobe missing');
    w.unmount();
  });

  it('renders a live progress bar with percent, count and current file while running', async () => {
    const { client } = makeClient({
      scanStatus: job({
        status: 'running',
        items_found: 40,
        items_updated: 10,
        current_path: '/media/Movies/The Matrix (1999).mkv',
      }),
    });
    const w = mountPage(client);
    await flushPromises();

    const progress = w.find('[data-testid="progress-lib-1"]');
    expect(progress.exists()).toBe(true);
    // 10 / 40 = 25%
    expect(progress.text()).toContain('25%');
    expect(progress.text()).toContain('10 / 40');
    expect(progress.text()).toContain('The Matrix (1999).mkv');
    const bar = progress.find('[role="progressbar"]');
    expect(bar.attributes('aria-valuenow')).toBe('25');
    expect(progress.find('.admin-libraries__progress-fill').attributes('style')).toContain('width: 25%');
    w.unmount();
  });

  it('shows no progress bar when a running job has no counts yet', async () => {
    const { client } = makeClient({ scanStatus: job({ status: 'running', items_found: 0 }) });
    const w = mountPage(client);
    await flushPromises();
    expect(w.find('[data-testid="progress-lib-1"]').exists()).toBe(false);
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Running');
    w.unmount();
  });
});

describe('Admin LibrariesPage — create / edit / delete', () => {
  it('creates a library and POSTs the full body then refetches', async () => {
    const { client, post, get } = makeClient({ libraries: [] });
    post.mockResolvedValueOnce({ library_id: 'lib-9', message: 'Library created.' });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-libraries__input')!;
    nameInput.value = 'Shows'; nameInput.dispatchEvent(new Event('input'));
    const ta = document.querySelector<HTMLTextAreaElement>('.admin-libraries__textarea')!;
    ta.value = '/media/tv\n  '; ta.dispatchEvent(new Event('input'));
    // Pick the type via the Select (default is already movie; switch to series).
    w.findAllComponents(Select).forEach((s) => s.vm.$emit('update:modelValue', 'series'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    // The type is `series`, so the per-series-directory flag is included
    // (default off).
    expect(post).toHaveBeenCalledWith('/api/v1/libraries', {
      name: 'Shows',
      type: 'series',
      paths: ['/media/tv'],
      series_per_directory: false,
    });
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/libraries').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('requires a name', async () => {
    const { client, post } = makeClient({ libraries: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Name is required.')).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('requires at least one path', async () => {
    const { client, post } = makeClient({ libraries: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-libraries__input')!;
    nameInput.value = 'Shows'; nameInput.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('at least one path'))).toBe(true);
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when create fails', async () => {
    const { client, post } = makeClient({ libraries: [] });
    post.mockRejectedValueOnce(new Error('Invalid library type'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-libraries__input')!;
    nameInput.value = 'X'; nameInput.dispatchEvent(new Event('input'));
    const ta = document.querySelector<HTMLTextAreaElement>('.admin-libraries__textarea')!;
    ta.value = '/p'; ta.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Invalid library type')).toBe(true);
    w.unmount();
  });

  it('cancels the add form without mutating', async () => {
    const { client, post } = makeClient({ libraries: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(findBtn(w, 'Create')).toBeUndefined();
    w.unmount();
  });

  it('edit pre-fills the form, shows read-only type, and PUTs without `type`', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit Movies')!.trigger('click');
    await flushPromises();
    const panel = modalPanel();
    const nameInput = panel.querySelector<HTMLInputElement>('.admin-libraries__input')!;
    expect(nameInput.value).toBe('Movies');
    const typeInput = panel.querySelector<HTMLInputElement>('input[aria-label="Type"]')!;
    expect(typeInput.value).toBe('movie');
    expect(typeInput.hasAttribute('readonly')).toBe(true);
    const ta = panel.querySelector<HTMLTextAreaElement>('.admin-libraries__textarea')!;
    expect(ta.value).toBe('/media/movies');
    await findBtnIn(w, panel, 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/libraries/lib-1', {
      name: 'Movies',
      paths: ['/media/movies'],
    });
    const body = put.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('type');
    w.unmount();
  });

  it('toasts when an edit (PUT) fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('update boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Edit Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'update boom')).toBe(true);
    w.unmount();
  });

  it('deletes a library after confirmation', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/libraries/lib-1');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/libraries').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('toasts when deleting fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'delete boom')).toBe(true);
    w.unmount();
  });

  it('cancels the delete confirm without deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe('Admin LibrariesPage — series-per-directory toggle', () => {
  /** Find the per-series-directory Switch inside the currently open modal. */
  function seriesSwitchInModal(w: VueWrapper) {
    const panel = modalPanel();
    return w.findAllComponents(Switch).find((s) => panel.contains(s.element));
  }

  it('hides the toggle for non-series types and shows it for series', async () => {
    const { client } = makeClient({ libraries: [] });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    // Default type is `movie` → no toggle.
    expect(seriesSwitchInModal(w)).toBeUndefined();
    // Switch the type to `series` → toggle appears.
    w.findAllComponents(Select).forEach((s) => s.vm.$emit('update:modelValue', 'series'));
    await flushPromises();
    const sw = seriesSwitchInModal(w);
    expect(sw).toBeDefined();
    expect(sw!.text()).toContain('Each series is in its own folder');
    w.unmount();
  });

  it('creates a series library with the toggle ON → series_per_directory: true', async () => {
    const { client, post } = makeClient({ libraries: [] });
    post.mockResolvedValueOnce({ library_id: 'lib-9', message: 'Library created.' });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-libraries__input')!;
    nameInput.value = 'Anime'; nameInput.dispatchEvent(new Event('input'));
    const ta = document.querySelector<HTMLTextAreaElement>('.admin-libraries__textarea')!;
    ta.value = '/vault1/anime'; ta.dispatchEvent(new Event('input'));
    w.findAllComponents(Select).forEach((s) => s.vm.$emit('update:modelValue', 'series'));
    await flushPromises();
    // Flip the toggle on.
    await seriesSwitchInModal(w)!.find('button[role="switch"]').trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/libraries', {
      name: 'Anime',
      type: 'series',
      paths: ['/vault1/anime'],
      series_per_directory: true,
    });
    w.unmount();
  });

  it('edit populates the toggle from lib.options and reflects a change in the PUT', async () => {
    const seriesLib = {
      id: 'lib-2',
      name: 'TV',
      type: 'series',
      paths: ['/vault1/tv'],
      options: { series_per_directory: true },
    };
    const { client, put } = makeClient({ libraries: [seriesLib] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Edit TV')!
      .trigger('click');
    await flushPromises();
    // The toggle is pre-filled ON from options.series_per_directory.
    const sw = seriesSwitchInModal(w)!;
    expect(sw.props('modelValue')).toBe(true);
    // Turn it off, then save.
    await sw.find('button[role="switch"]').trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/libraries/lib-2', {
      name: 'TV',
      paths: ['/vault1/tv'],
      series_per_directory: false,
    });
    w.unmount();
  });

  it('coerces a string "true" option value when populating the edit toggle', async () => {
    const seriesLib = {
      id: 'lib-3',
      name: 'Shows',
      type: 'series',
      paths: ['/vault1/shows'],
      options: { series_per_directory: 'true' },
    };
    const { client } = makeClient({ libraries: [seriesLib] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Edit Shows')!
      .trigger('click');
    await flushPromises();
    expect(seriesSwitchInModal(w)!.props('modelValue')).toBe(true);
    w.unmount();
  });
});

describe('Admin LibrariesPage — scan / rescan / metadata + polling', () => {
  it('scan → 202 toast → polls running then completed and STOPS', async () => {
    vi.useFakeTimers();
    let statusCall = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      if (endpoint.endsWith('/scan-status')) {
        statusCall += 1;
        if (statusCall === 1) return { scan_status: null }; // initial load
        if (statusCall === 2) return { scan_status: job({ status: 'running' }) }; // immediate poll
        return { scan_status: job({ status: 'completed', completed_at: '2026-05-27T00:01:00Z' }) };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const post = vi.fn(async () => ({ job_id: 'job-1', status: 'queued', message: 'Scan queued.' }));
    const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mount(LibrariesPage, { props: { client, pollIntervalMs: 1000 }, attachTo: document.body });

    await vi.advanceTimersByTimeAsync(0);
    expect(w.text()).toContain('Movies');

    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Scan Movies')!.trigger('click');
    await vi.advanceTimersByTimeAsync(0);
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Running');
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/scan');

    const callsAfterRunning = get.mock.calls.length;
    await vi.advanceTimersByTimeAsync(1000);
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Completed');
    const callsAfterCompleted = get.mock.calls.length;
    expect(callsAfterCompleted).toBeGreaterThan(callsAfterRunning);

    // Further ticks must NOT poll again (interval stopped).
    await vi.advanceTimersByTimeAsync(5000);
    expect(get.mock.calls.length).toBe(callsAfterCompleted);
    w.unmount();
  });

  it('rescan → POSTs the /rescan endpoint', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client, 100000);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Rescan Movies')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/rescan');
    w.unmount();
  });

  it('match metadata → POSTs the /match-metadata endpoint', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client, 100000);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Match metadata for Movies')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/libraries/lib-1/match-metadata');
    w.unmount();
  });

  it('toasts when the scan POST fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('Worker offline'));
    const w = mountPage(client, 100000);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Scan Movies')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'Worker offline')).toBe(true);
    w.unmount();
  });

  it('resumes polling on load for a library with an in-flight job and stops a transient poll failure', async () => {
    vi.useFakeTimers();
    let statusCall = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      if (endpoint.endsWith('/scan-status')) {
        statusCall += 1;
        if (statusCall === 1) return { scan_status: job({ status: 'running' }) }; // load → start polling
        throw new Error('poll boom'); // next poll fails → stop polling
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mount(LibrariesPage, { props: { client, pollIntervalMs: 1000 }, attachTo: document.body });
    await vi.advanceTimersByTimeAsync(0);
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Running');
    await vi.advanceTimersByTimeAsync(1000); // poll throws → stopPolling
    const afterFail = get.mock.calls.length;
    await vi.advanceTimersByTimeAsync(5000);
    expect(get.mock.calls.length).toBe(afterFail);
    w.unmount();
  });

  it('clears the polling interval on unmount (no further polls)', async () => {
    vi.useFakeTimers();
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      if (endpoint.endsWith('/scan-status')) return { scan_status: job({ status: 'running' }) };
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mount(LibrariesPage, { props: { client, pollIntervalMs: 1000 }, attachTo: document.body });
    await vi.advanceTimersByTimeAsync(0);
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Running');
    w.unmount();
    const afterUnmount = get.mock.calls.length;
    await vi.advanceTimersByTimeAsync(5000);
    expect(get.mock.calls.length).toBe(afterUnmount);
  });

  it('ignores a per-library status failure on initial load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      if (endpoint.endsWith('/scan-status')) throw new Error('status boom');
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client, 100000);
    await flushPromises();
    // The list still renders; status badge falls back to Idle.
    expect(w.text()).toContain('Movies');
    expect(w.find('[data-testid="status-lib-1"]').text()).toContain('Idle');
    const toasts = useToastStore();
    expect(toasts.toasts.length).toBe(0);
    w.unmount();
  });
});

describe('Admin LibrariesPage — scan history modal', () => {
  it('loads and renders the scan history', async () => {
    const { client, get } = makeClient({
      history: [
        job({ id: 'h1', type: 'rescan', status: 'completed', completed_at: '2026-05-27T02:00:00Z' }),
        job({ id: 'h2', type: 'scan', status: 'failed', error: 'boom' }),
      ],
    });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'History for Movies')!.trigger('click');
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/libraries/lib-1/scan-history', undefined);
    const panel = modalPanel();
    expect(panel.textContent).toContain('rescan');
    expect(panel.textContent).toContain('boom');
    w.unmount();
  });

  it('shows an empty state when there are no scans', async () => {
    const { client } = makeClient({ history: [] });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'History for Movies')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('No scans yet');
    w.unmount();
  });

  it('toasts when the history GET fails', async () => {
    const { client, get } = makeClient();
    get.mockImplementation(async (endpoint: string) => {
      if (endpoint === '/api/v1/libraries') return { libraries: [lib] };
      if (endpoint.endsWith('/scan-status')) return { scan_status: null };
      throw new Error('history boom');
    });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'History for Movies')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'history boom')).toBe(true);
    w.unmount();
  });

  it('closes the history modal via Close', async () => {
    const { client } = makeClient({ history: [job({ id: 'h1' })] });
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'History for Movies')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Close')!.trigger('click');
    await flushPromises();
    expect(findBtn(w, 'Close')).toBeUndefined();
    w.unmount();
  });
});

describe('Admin LibrariesPage — per-library metadata source priority', () => {
  /** The SourcePriorityEditor inside the currently open form modal. */
  function priorityEditorInModal(w: VueWrapper) {
    const panel = modalPanel();
    return w.findAllComponents(SourcePriorityEditor).find((e) => panel.contains(e.element));
  }

  it('fetches the source list on mount', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/metadata/sources');
    w.unmount();
  });

  it('seeds the editor from the default source list when adding, and sends the reordered priority on create', async () => {
    const { client, post } = makeClient({ libraries: [] });
    post.mockResolvedValueOnce({ library_id: 'lib-9', message: 'Library created.' });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    // The editor is seeded with the default-ordered available sources.
    const editor = priorityEditorInModal(w)!;
    expect(editor.props('modelValue')).toEqual(DEFAULT_SOURCES);
    expect(editor.props('available')).toEqual(DEFAULT_SOURCES);

    const nameInput = document.querySelector<HTMLInputElement>('.admin-libraries__input')!;
    nameInput.value = 'Movies'; nameInput.dispatchEvent(new Event('input'));
    const ta = document.querySelector<HTMLTextAreaElement>('.admin-libraries__textarea')!;
    ta.value = '/media/movies'; ta.dispatchEvent(new Event('input'));
    // Reorder (as the editor would on a Down click): local first.
    editor.vm.$emit('update:modelValue', ['local', 'tmdb', 'imdb', 'tvdb', 'fanart']);
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/libraries', {
      name: 'Movies',
      type: 'movie',
      paths: ['/media/movies'],
      metadata_priority: { movie: ['local', 'tmdb', 'imdb', 'tvdb', 'fanart'] },
    });
    w.unmount();
  });

  it('does NOT include metadata_priority in the create body when the editor is untouched', async () => {
    const { client, post } = makeClient({ libraries: [] });
    post.mockResolvedValueOnce({ library_id: 'lib-9', message: 'Library created.' });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Add library')!.trigger('click');
    await flushPromises();
    const nameInput = document.querySelector<HTMLInputElement>('.admin-libraries__input')!;
    nameInput.value = 'Movies'; nameInput.dispatchEvent(new Event('input'));
    const ta = document.querySelector<HTMLTextAreaElement>('.admin-libraries__textarea')!;
    ta.value = '/media/movies'; ta.dispatchEvent(new Event('input'));
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/libraries', {
      name: 'Movies',
      type: 'movie',
      paths: ['/media/movies'],
    });
    const body = post.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('metadata_priority');
    w.unmount();
  });

  it('seeds the editor from a library’s saved options.metadata_priority when editing', async () => {
    const savedLib = {
      id: 'lib-5',
      name: 'Films',
      type: 'movie',
      paths: ['/media/films'],
      options: { metadata_priority: { movie: ['local', 'tmdb'] } },
    };
    const { client } = makeClient({ libraries: [savedLib] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Edit Films')!
      .trigger('click');
    await flushPromises();
    expect(priorityEditorInModal(w)!.props('modelValue')).toEqual(['local', 'tmdb']);
    w.unmount();
  });

  it('does NOT include metadata_priority in the update body when the editor is untouched', async () => {
    const savedLib = {
      id: 'lib-5',
      name: 'Films',
      type: 'movie',
      paths: ['/media/films'],
      options: { metadata_priority: { movie: ['local', 'tmdb'] } },
    };
    const { client, put } = makeClient({ libraries: [savedLib] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Edit Films')!
      .trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/libraries/lib-5', {
      name: 'Films',
      paths: ['/media/films'],
    });
    const body = put.mock.calls[0]![1] as Record<string, unknown>;
    expect(body).not.toHaveProperty('metadata_priority');
    w.unmount();
  });

  it('sends metadata_priority: null when the admin removes every source', async () => {
    const savedLib = {
      id: 'lib-5',
      name: 'Films',
      type: 'movie',
      paths: ['/media/films'],
      options: { metadata_priority: { movie: ['local', 'tmdb'] } },
    };
    const { client, put } = makeClient({ libraries: [savedLib] });
    const w = mountPage(client);
    await flushPromises();
    await w
      .findAllComponents(Button)
      .find((b) => b.attributes('aria-label') === 'Edit Films')!
      .trigger('click');
    await flushPromises();
    // Editor emits an empty list (admin removed every source).
    priorityEditorInModal(w)!.vm.$emit('update:modelValue', []);
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Save')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/libraries/lib-5', {
      name: 'Films',
      paths: ['/media/films'],
      metadata_priority: null,
    });
    w.unmount();
  });
});
