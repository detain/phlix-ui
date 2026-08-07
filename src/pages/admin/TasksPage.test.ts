/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Admin TasksPage (S78).
 *
 * ## The rules this file follows, and why
 *
 * 1. **Every button asserts its endpoint with an EXACT compare.** The recorded
 *    POST path list is compared with `toEqual`, never `toContain`. Four paths
 *    share the `/api/v1/admin/maintenance/` prefix and two share `reap-`, so a
 *    substring assertion passes on the wrong endpoint — and there is no way to
 *    tell from a green run which one fired.
 * 2. **"Already running" and "fresh submission" are compared in the SAME test**,
 *    with an explicit check first that neither rendered string is a substring of
 *    the other. Proving they differ is the point; proving each renders something
 *    is not.
 * 3. **Failures assert the rendered REASON**, on exact text, not on "an error
 *    element exists". A recent bug in this repo sat inside a fully-executed
 *    region because the test only checked that an element was present.
 * 4. **No geometry assertions.** jsdom never applies an SFC's compiled scoped
 *    `<style>`, so anything measured here would be measuring nothing.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, RouterLinkStub, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import TasksPage from './TasksPage.vue';
import Button from '../../components/ui/Button.vue';
import { useToastStore } from '../../stores/useToastStore';
import { ApiError } from '../../api/errors';
import type { ApiClient } from '../../api/client';

const TASKS_PATH = '/api/v1/admin/maintenance/tasks';
const JOBS_PATH = '/api/v1/admin/maintenance/jobs';
const STORAGE_SNAPSHOT_PATH = '/api/v1/admin/maintenance/storage-snapshot';
const DEDUPE_PATH = '/api/v1/admin/maintenance/dedupe-paths';
const REAP_SCAN_PATH = '/api/v1/admin/maintenance/reap-scan-jobs';
const REAP_TRANSCODE_PATH = '/api/v1/admin/maintenance/reap-transcode-jobs';
const CLEANUP_PATH = '/api/v1/admin/maintenance/cleanup-orphaned-stats';
const BACKUP_CREATE_PATH = '/api/v1/admin/backup/create';
const UPDATE_STATUS_PATH = '/api/v1/admin/updates/status';

const catalogue = [
  { task: 'storage-snapshot', mode: 'queued', label: 'Storage snapshot', description: 'Recompute buckets.', destructive: false },
  { task: 'reap-scan-jobs', mode: 'sync', label: 'Reap stale scan jobs', description: 'Six hour floor.', destructive: false },
  { task: 'reap-transcode-jobs', mode: 'sync', label: 'Reap stale transcode jobs', description: 'Dead workers.', destructive: false },
  { task: 'cleanup-orphaned-stats', mode: 'sync', label: 'Clean up orphaned stats', description: 'Orphan rows.', destructive: true },
  { task: 'dedupe-paths', mode: 'queued', label: 'Merge duplicate paths', description: 'Same path, two rows.', destructive: true },
];

const queuedJob = {
  id: 'job-1',
  task: 'storage-snapshot',
  status: 'queued',
  params: {},
  result: null,
  error: null,
  requested_by: 'admin',
  queued_at: '2026-08-07 10:00:00',
  started_at: null,
  completed_at: null,
};

interface Over {
  tasks?: unknown;
  jobs?: unknown[];
  post?: Record<string, unknown>;
  updateStatus?: unknown;
}

function makeClient(over: Over = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === TASKS_PATH) return { success: true, data: over.tasks ?? catalogue };
    if (endpoint === JOBS_PATH) return { success: true, data: over.jobs ?? [] };
    if (endpoint === UPDATE_STATUS_PATH) {
      return {
        success: true,
        data: over.updateStatus ?? {
          currentVersion: '1.2.3',
          latestVersion: '1.2.3',
          updateAvailable: false,
          checkEnabled: true,
          lastCheckedAt: 1,
          lastError: null,
          updateCommand: 'git pull',
        },
      };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async (endpoint: string) => {
    const canned = over.post?.[endpoint];
    if (canned !== undefined) return canned;
    if (endpoint === BACKUP_CREATE_PATH) {
      return { success: true, message: 'Backup created.', data: { backup_id: 'b1', file_path: '/b', size_bytes: 1 } };
    }
    if (endpoint === STORAGE_SNAPSHOT_PATH) {
      return { success: true, created: true, data: { job: queuedJob } };
    }
    if (endpoint === DEDUPE_PATH) {
      return { success: true, created: true, data: { job: { ...queuedJob, task: 'dedupe-paths' } } };
    }
    return { success: true, data: { reaped: 0, older_than_seconds: 21600, requested_older_than_seconds: 21600, floor_applied: false, total: 0, deleted: {}, limit: 5000, truncated: false } };
  });
  const client = { get, post, put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
  return { client, get, post };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(TasksPage, {
    props: { client },
    attachTo: document.body,
    global: { stubs: { RouterLink: RouterLinkStub } },
  });
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text && root.contains(b.element));
}

function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1];
}

/** Every rendered inline result line, trimmed. Exactly one action fires per test. */
function feedback(w: VueWrapper): string[] {
  return w.findAll('.admin-tasks__feedback').map((n) => n.text().trim());
}

/** The path argument of every recorded call, in order — for `toEqual`, never `toContain`. */
function paths(spy: { mock: { calls: unknown[][] } }): unknown[] {
  return spy.mock.calls.map((c) => c[0]);
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Admin TasksPage — mount', () => {
  it('loads the task catalogue and the job list, and nothing else', async () => {
    const { client, get, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(paths(get)).toEqual([TASKS_PATH, JOBS_PATH]);
    expect(get).toHaveBeenCalledWith(JOBS_PATH, { limit: '20' }, undefined);
    // Mounting must not FIRE anything. A page whose onMounted posts a
    // maintenance task would be a very expensive bug.
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('renders the server-supplied labels and descriptions', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Same path, two rows.');
    expect(w.text()).toContain('Six hour floor.');
    w.unmount();
  });

  it('still renders every action button when the catalogue call fails', async () => {
    // The buttons run off UI-side fallbacks, so a dead metadata endpoint must
    // not empty the page — that would turn a cosmetic failure into a total one.
    const { client } = makeClient();
    (client.get as unknown as ReturnType<typeof vi.fn>).mockImplementation(async (endpoint: string) => {
      if (endpoint === TASKS_PATH) throw new Error('catalogue down');
      return { success: true, data: [] };
    });
    const w = mountPage(client);
    await flushPromises();
    for (const label of [
      'Merge duplicate paths (dry run)',
      'Take storage snapshot',
      'Clean up orphaned stats',
      'Reap stale scan jobs',
      'Reap stale transcode jobs',
      'Create backup now',
      'Check update status',
    ]) {
      expect(findBtn(w, label), `${label} is missing`).toBeTruthy();
    }
    w.unmount();
  });

  it('renders the recent-jobs table from the job list', async () => {
    const { client } = makeClient({ jobs: [{ ...queuedJob, task: 'dedupe-paths', status: 'failed', error: 'boom' }] });
    const w = mountPage(client);
    await flushPromises();
    const table = w.find('table');
    expect(table.exists()).toBe(true);
    expect(table.text()).toContain('dedupe-paths');
    expect(table.text()).toContain('failed');
    expect(table.text()).toContain('boom');
    w.unmount();
  });

  it('renders the job-list load failure with its reason', async () => {
    const { client } = makeClient();
    (client.get as unknown as ReturnType<typeof vi.fn>).mockImplementation(async (endpoint: string) => {
      if (endpoint === JOBS_PATH) throw new ApiError('jobs table is missing', 500);
      return { success: true, data: catalogue };
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('jobs table is missing');
    w.unmount();
  });
});

describe('Admin TasksPage — the reapers (sync, shared prefix)', () => {
  it('"Reap stale scan jobs" POSTs ONLY reap-scan-jobs', async () => {
    const { client, post } = makeClient({
      post: { [REAP_SCAN_PATH]: { success: true, data: { reaped: 4, older_than_seconds: 21600, requested_older_than_seconds: 21600, floor_applied: false } } },
    });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Reap stale scan jobs')!.trigger('click');
    await flushPromises();
    // Exact whole-list compare: the transcode sibling must NOT appear.
    expect(paths(post)).toEqual([REAP_SCAN_PATH]);
    expect(feedback(w)).toEqual(['Reaped 4 stale scan jobs.']);
    w.unmount();
  });

  it('surfaces the six-hour floor when the server raised the requested age', async () => {
    const { client } = makeClient({
      post: { [REAP_SCAN_PATH]: { success: true, data: { reaped: 0, older_than_seconds: 21600, requested_older_than_seconds: 60, floor_applied: true } } },
    });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Reap stale scan jobs')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual([
      'Reaped 0 stale scan jobs. The requested age of 60s was raised to the 21600s minimum.',
    ]);
    w.unmount();
  });

  it('"Reap stale transcode jobs" POSTs ONLY reap-transcode-jobs', async () => {
    const { client, post } = makeClient({
      post: { [REAP_TRANSCODE_PATH]: { success: true, data: { reaped: 2, older_than_seconds: 300 } } },
    });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Reap stale transcode jobs')!.trigger('click');
    await flushPromises();
    expect(paths(post)).toEqual([REAP_TRANSCODE_PATH]);
    expect(feedback(w)).toEqual(['Reaped 2 stale transcode jobs.']);
    w.unmount();
  });

  it('the two reapers hit DIFFERENT endpoints from the same page instance', async () => {
    // A control beside the assertion above: if both buttons were wired to one
    // handler, each test alone would still pass.
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Reap stale scan jobs')!.trigger('click');
    await flushPromises();
    await findBtn(w, 'Reap stale transcode jobs')!.trigger('click');
    await flushPromises();
    expect(paths(post)).toEqual([REAP_SCAN_PATH, REAP_TRANSCODE_PATH]);
    w.unmount();
  });

  it('renders the failure REASON from a rejected reap', async () => {
    const { client, post } = makeClient();
    (post as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new ApiError('scan_jobs is locked by another writer', 500),
    );
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Reap stale scan jobs')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual(['scan_jobs is locked by another writer']);
    expect(useToastStore().toasts.some((t) => t.message === 'scan_jobs is locked by another writer')).toBe(true);
    w.unmount();
  });
});

describe('Admin TasksPage — cleanup orphaned stats (sync, destructive)', () => {
  it('does not POST until the confirmation is accepted', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clean up orphaned stats')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('POSTs ONLY cleanup-orphaned-stats once confirmed, and reports the row count', async () => {
    const { client, post } = makeClient({
      post: {
        [CLEANUP_PATH]: { success: true, data: { deleted: { 'a.b': 7 }, total: 7, limit: 5000, truncated: false } },
      },
    });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clean up orphaned stats')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete orphaned stats')!.trigger('click');
    await flushPromises();
    expect(paths(post)).toEqual([CLEANUP_PATH]);
    expect(feedback(w)).toEqual(['Deleted 7 orphaned statistics rows.']);
    w.unmount();
  });

  it('offers a re-run when the per-table cap truncated the delete', async () => {
    const { client } = makeClient({
      post: {
        [CLEANUP_PATH]: { success: true, data: { deleted: { 'a.b': 5000 }, total: 5000, limit: 5000, truncated: true } },
      },
    });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clean up orphaned stats')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete orphaned stats')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual([
      'Deleted 5000 orphaned statistics rows. The per-table cap of 5000 was reached — run it again to continue.',
    ]);
    w.unmount();
  });

  it('renders the failure REASON', async () => {
    const { client, post } = makeClient();
    (post as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new ApiError('FK constraint blew up', 500));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Clean up orphaned stats')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete orphaned stats')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual(['FK constraint blew up']);
    w.unmount();
  });
});

describe('Admin TasksPage — storage snapshot (queued): fresh vs already-running', () => {
  it('renders the two branches DIFFERENTLY, and neither string contains the other', async () => {
    // Both cases in one test, per the S78 brief: proving each renders "something"
    // is worthless if they render the same thing.
    const fresh = { success: true, created: true, data: { job: queuedJob } };
    const existing = { success: true, created: false, data: { job: { ...queuedJob, status: 'running' } } };

    const { client, post } = makeClient({ post: { [STORAGE_SNAPSHOT_PATH]: fresh } });
    const w = mountPage(client);
    await flushPromises();

    await findBtn(w, 'Take storage snapshot')!.trigger('click');
    await flushPromises();
    expect(paths(post)).toEqual([STORAGE_SNAPSHOT_PATH]);
    const firstClick = feedback(w);
    expect(firstClick).toHaveLength(1);

    // Second click: the server replies 200 {created:false} with the SAME job.
    (post as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(async () => existing);
    await findBtn(w, 'Take storage snapshot')!.trigger('click');
    await flushPromises();
    const secondClick = feedback(w);
    expect(secondClick).toHaveLength(1);

    const a = firstClick[0];
    const b = secondClick[0];
    // The substring guard the brief asks for, BEFORE relying on the difference:
    // two messages that merely differ in length would let a `toContain`
    // assertion pass on the wrong branch.
    expect(a).not.toBe(b);
    expect(a.includes(b)).toBe(false);
    expect(b.includes(a)).toBe(false);
    // And pin the actual copy, so a mutation that swaps the two branches reds.
    expect(a).toBe('Storage snapshot: queued a new run (job job-1).');
    expect(b).toBe('Storage snapshot: already running — showing the existing job (job-1).');
    // Both clicks really went to the endpoint — the second was not suppressed.
    expect(paths(post)).toEqual([STORAGE_SNAPSHOT_PATH, STORAGE_SNAPSHOT_PATH]);
    w.unmount();
  });

  it('shows the returned job in the recent-jobs table without a refetch', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    // The list was empty on mount, so there is no table at all yet — the row
    // below can only have come from the POST response.
    expect(w.find('table').exists()).toBe(false);
    const getsBefore = paths(get).length;
    await findBtn(w, 'Take storage snapshot')!.trigger('click');
    await flushPromises();
    const rows = w.findAll('tbody tr');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('storage-snapshot');
    expect(rows[0].text()).toContain('queued');
    // The job came back in the POST body; re-listing would be a wasted round trip.
    expect(paths(get).length).toBe(getsBefore);
    w.unmount();
  });

  it('renders the failure REASON', async () => {
    const { client, post } = makeClient();
    (post as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new ApiError('vault is unmounted', 500));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Take storage snapshot')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual(['vault is unmounted']);
    w.unmount();
  });
});

describe('Admin TasksPage — dedupe-paths dry run vs apply', () => {
  it('defaults to dry run: the button says so and the POST body is apply:false', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Dry-run mode: nothing will be changed.');
    expect(w.text()).not.toContain('Apply mode is armed');
    await findBtn(w, 'Merge duplicate paths (dry run)')!.trigger('click');
    await flushPromises();
    expect(paths(post)).toEqual([DEDUPE_PATH]);
    expect(post).toHaveBeenCalledWith(DEDUPE_PATH, { apply: false });
    w.unmount();
  });

  it('a dry run fires immediately — no confirmation stands between preview and result', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Merge duplicate paths (dry run)')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledTimes(1);
    expect(feedback(w)).toEqual(['Merge duplicate paths (dry run): queued a new run (job job-1).']);
    w.unmount();
  });

  it('selecting Apply makes the armed mode VISIBLE and relabels the button', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const applyRadio = w.findAll('input[type="radio"]').find((r) => (r.element as HTMLInputElement).value === 'apply')!;
    await applyRadio.setValue();
    expect(w.text()).toContain('Apply mode is armed: this run will delete duplicate media rows.');
    expect(w.text()).not.toContain('Dry-run mode: nothing will be changed.');
    expect(findBtn(w, 'Merge duplicate paths (apply)')).toBeTruthy();
    expect(findBtn(w, 'Merge duplicate paths (dry run)')).toBeUndefined();
    w.unmount();
  });

  it('Apply requires a confirmation, then POSTs a strict boolean apply:true', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const applyRadio = w.findAll('input[type="radio"]').find((r) => (r.element as HTMLInputElement).value === 'apply')!;
    await applyRadio.setValue();
    await findBtn(w, 'Merge duplicate paths (apply)')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    await findBtnIn(w, modalPanel(), 'Merge for real')!.trigger('click');
    await flushPromises();
    expect(paths(post)).toEqual([DEDUPE_PATH]);
    expect(post).toHaveBeenCalledWith(DEDUPE_PATH, { apply: true });
    // `true`, the boolean — not the string, which PHP would read as truthy.
    const body = (post as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1] as { apply: unknown };
    expect(typeof body.apply).toBe('boolean');
    w.unmount();
  });

  it('cancelling the Apply confirmation posts nothing at all', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const applyRadio = w.findAll('input[type="radio"]').find((r) => (r.element as HTMLInputElement).value === 'apply')!;
    await applyRadio.setValue();
    await findBtn(w, 'Merge duplicate paths (apply)')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('the dry-run and apply bodies are genuinely different (control for the pair above)', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Merge duplicate paths (dry run)')!.trigger('click');
    await flushPromises();
    const applyRadio = w.findAll('input[type="radio"]').find((r) => (r.element as HTMLInputElement).value === 'apply')!;
    await applyRadio.setValue();
    await findBtn(w, 'Merge duplicate paths (apply)')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Merge for real')!.trigger('click');
    await flushPromises();
    const bodies = (post as unknown as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[1]);
    expect(bodies).toEqual([{ apply: false }, { apply: true }]);
    w.unmount();
  });

  it('renders the failure REASON', async () => {
    const { client, post } = makeClient();
    (post as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new ApiError('dedupe table is empty', 500));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Merge duplicate paths (dry run)')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual(['dedupe table is empty']);
    w.unmount();
  });
});

describe('Admin TasksPage — backup now', () => {
  it('POSTs ONLY /api/v1/admin/backup/create and echoes the server message', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create backup now')!.trigger('click');
    await flushPromises();
    expect(paths(post)).toEqual([BACKUP_CREATE_PATH]);
    expect(post).toHaveBeenCalledWith(BACKUP_CREATE_PATH, {});
    expect(feedback(w)).toEqual(['Backup created.']);
    w.unmount();
  });

  it('renders the failure REASON', async () => {
    const { client, post } = makeClient();
    (post as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new ApiError('disk is full', 507));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create backup now')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual(['disk is full']);
    w.unmount();
  });
});

describe('Admin TasksPage — update status', () => {
  it('GETs ONLY /api/v1/admin/updates/status and reports "up to date"', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    (get as unknown as ReturnType<typeof vi.fn>).mockClear();
    await findBtn(w, 'Check update status')!.trigger('click');
    await flushPromises();
    expect(paths(get)).toEqual([UPDATE_STATUS_PATH]);
    expect(feedback(w)).toEqual(['Up to date on 1.2.3.']);
    w.unmount();
  });

  it('reports an available update with both versions', async () => {
    const { client } = makeClient({
      updateStatus: {
        currentVersion: '1.2.3',
        latestVersion: '1.3.0',
        updateAvailable: true,
        checkEnabled: true,
        lastCheckedAt: 1,
        lastError: null,
        updateCommand: 'git pull',
      },
    });
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Check update status')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual(['Update available: 1.3.0 (running 1.2.3).']);
    w.unmount();
  });

  it('renders the failure REASON', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    (get as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new ApiError('update check is disabled', 400));
    await findBtn(w, 'Check update status')!.trigger('click');
    await flushPromises();
    expect(feedback(w)).toEqual(['update check is disabled']);
    w.unmount();
  });
});

describe('Admin TasksPage — refresh + links to pages that own a capability', () => {
  it('"Refresh jobs" re-GETs ONLY the jobs collection', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    (get as unknown as ReturnType<typeof vi.fn>).mockClear();
    await findBtn(w, 'Refresh jobs')!.trigger('click');
    await flushPromises();
    expect(paths(get)).toEqual([JOBS_PATH]);
    w.unmount();
  });

  it('links to Libraries, Plugins, Backup and Settings by ROUTE NAME (base-agnostic)', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const targets = w.findAllComponents(RouterLinkStub).map((l) => l.props('to'));
    expect(targets).toEqual([
      { name: 'admin-libraries' },
      { name: 'admin-backup' },
      { name: 'admin-plugins' },
      { name: 'admin-settings' },
    ]);
    w.unmount();
  });

  it('says plainly that no scan-all endpoint exists rather than shipping a button that 404s', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('There is no server endpoint that scans every library at once.');
    w.unmount();
  });
});

describe('Admin TasksPage — polling an in-flight job', () => {
  it('polls the jobs endpoint every 5s while a job is active and STOPS when it settles', async () => {
    vi.useFakeTimers();
    const { client, get } = makeClient({ jobs: [{ ...queuedJob, status: 'running' }] });
    const w = mountPage(client);
    await flushPromises();
    (get as unknown as ReturnType<typeof vi.fn>).mockClear();

    await vi.advanceTimersByTimeAsync(5000);
    await flushPromises();
    expect(paths(get)).toEqual([JOBS_PATH]);

    // The job completes → the timer must be torn down, not left ticking forever.
    (client.get as unknown as ReturnType<typeof vi.fn>).mockImplementation(async (endpoint: string) => {
      if (endpoint === JOBS_PATH) return { success: true, data: [{ ...queuedJob, status: 'completed' }] };
      return { success: true, data: catalogue };
    });
    await vi.advanceTimersByTimeAsync(5000);
    await flushPromises();
    const afterSettle = paths(get).length;
    await vi.advanceTimersByTimeAsync(30_000);
    await flushPromises();
    expect(paths(get).length).toBe(afterSettle);
    w.unmount();
  });

  it('does not poll at all when nothing is in flight', async () => {
    vi.useFakeTimers();
    const { client, get } = makeClient({ jobs: [{ ...queuedJob, status: 'completed' }] });
    const w = mountPage(client);
    await flushPromises();
    (get as unknown as ReturnType<typeof vi.fn>).mockClear();
    await vi.advanceTimersByTimeAsync(60_000);
    await flushPromises();
    expect(paths(get)).toEqual([]);
    w.unmount();
  });

  it('unmounting clears the poll timer (no work after the page is gone)', async () => {
    vi.useFakeTimers();
    const { client, get } = makeClient({ jobs: [{ ...queuedJob, status: 'running' }] });
    const w = mountPage(client);
    await flushPromises();
    (get as unknown as ReturnType<typeof vi.fn>).mockClear();
    w.unmount();
    await vi.advanceTimersByTimeAsync(60_000);
    await flushPromises();
    expect(paths(get)).toEqual([]);
  });
});
