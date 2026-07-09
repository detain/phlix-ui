/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import BackupPage from './BackupPage.vue';
import Button from '../../components/ui/Button.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import { useToastStore } from '../../stores/useToastStore';
import type { ApiClient } from '../../api/client';

const sampleBackup = {
  id: 'backup-1',
  label: 'Weekly Backup',
  file_path: '/backups/backup-1.tar.gz',
  size_bytes: 1048576, // 1 MB
  checksum_sha256: 'abc123',
  is_s3: false,
  created_at: new Date(Date.now() - 3600_000).toISOString(), // 1h ago
  expires_at: null as string | null,
};

const smallBackup = {
  ...sampleBackup,
  id: 'backup-2',
  label: 'Small Backup',
  size_bytes: 1024, // 1 KB
};

const sampleSchedule = {
  auto_backup_interval_days: 7,
  retention_count: 5,
  next_scheduled_backup: Math.floor(Date.now() / 1000) + 86400 * 3,
  next_scheduled_backup_iso: new Date(Date.now() + 86400 * 3 * 1000).toISOString(),
};

interface Overrides {
  backups?: unknown[];
  schedule?: unknown;
}

function makeClient(over: Overrides = {}) {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/backup/list') {
      return { success: true, data: over.backups ?? [sampleBackup], count: 1 };
    }
    if (endpoint === '/api/v1/admin/backup/schedule') {
      return { success: true, data: over.schedule ?? sampleSchedule };
    }
    throw new Error(`unexpected GET ${endpoint}`);
  });
  const post = vi.fn(async () => ({
    success: true,
    message: 'ok',
    data: { backup_id: 'new', file_path: '/backups/new.tar.gz', size_bytes: 4096 },
  }));
  const put = vi.fn(async () => ({
    success: true,
    message: 'ok',
    data: { auto_backup_interval_days: 14, retention_count: 10 },
  }));
  const del = vi.fn(async () => ({ message: 'deleted' }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

function mountPage(client: ApiClient): VueWrapper {
  return mount(BackupPage, { props: { client }, attachTo: document.body });
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
});

describe('Admin BackupPage — list', () => {
  it('loads and renders the backup rows', async () => {
    const { client, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/backup/list');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/backup/schedule');
    const text = w.text();
    expect(text).toContain('Weekly Backup');
    expect(text).toContain('1 MB');
    expect(text).toContain('Local');
    w.unmount();
  });

  it('formats sub-MB sizes (1024 → 1 KB)', async () => {
    const { client } = makeClient({ backups: [smallBackup] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('1 KB');
    w.unmount();
  });

  it('renders 0 B for a zero-byte backup', async () => {
    const { client } = makeClient({ backups: [{ ...sampleBackup, size_bytes: 0 }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('0 B');
    w.unmount();
  });

  it('shows the skeleton while loading then the table', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = vi.fn((endpoint: string) => {
      if (endpoint === '/api/v1/admin/backup/schedule') {
        return Promise.resolve({ success: true, data: sampleSchedule });
      }
      return new Promise((r) => {
        resolve = r;
      });
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    expect(w.find('.admin-backup__skel').exists()).toBe(true);
    resolve({ success: true, data: [sampleBackup], count: 1 });
    await flushPromises();
    expect(w.find('table').exists()).toBe(true);
    w.unmount();
  });

  it('shows the empty state when there are no backups', async () => {
    const { client } = makeClient({ backups: [] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('No backups yet');
    w.unmount();
  });

  it('renders the Unnamed placeholder for an empty label', async () => {
    const { client } = makeClient({ backups: [{ ...sampleBackup, label: '' }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Unnamed');
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the backup list fails to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/backup/schedule') return { success: true, data: sampleSchedule };
      throw new Error('list boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const toasts = useToastStore();
    // The backups section shows an in-body error EmptyState (not the empty-list one).
    expect(w.text()).toContain("Couldn't load backups");
    expect(w.text()).toContain('list boom');
    expect(w.text()).not.toContain('No backups yet');
    expect(toasts.toasts.some((t) => t.message === 'list boom')).toBe(true);
    w.unmount();
  });

  it('retries the backup list load from the error state', async () => {
    let listCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/backup/schedule') return { success: true, data: sampleSchedule };
      if (endpoint === '/api/v1/admin/backup/list') {
        listCalls += 1;
        if (listCalls === 1) throw new Error('list boom');
        return { success: true, data: [sampleBackup], count: 1 };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const errorEmpty = w.findAllComponents(EmptyState).find((e) => e.text().includes("Couldn't load backups"))!;
    expect(errorEmpty).toBeTruthy();
    await errorEmpty.find('button').trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load backups");
    expect(w.text()).toContain('Weekly Backup');
    w.unmount();
  });
});

describe('Admin BackupPage — S3 badge & upload', () => {
  it('renders an S3 badge and hides the upload button for S3 backups', async () => {
    const { client } = makeClient({ backups: [{ ...sampleBackup, is_s3: true }] });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('S3');
    expect(findBtn(w, 'Upload to S3')).toBeUndefined();
    w.unmount();
  });

  it('uploads a local backup to S3 and refetches the list', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Upload to S3')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/backup-1/upload-s3');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/backup/list').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('toasts when the S3 upload fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('s3 boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Upload to S3')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 's3 boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin BackupPage — create', () => {
  it('creates a backup with a label via the modal', async () => {
    const { client, post, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create backup')!.trigger('click');
    await flushPromises();
    const input = modalPanel().querySelector<HTMLInputElement>('.admin-backup__input')!;
    input.value = 'Nightly'; input.dispatchEvent(new Event('input'));
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/create', { label: 'Nightly' });
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/backup/list').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('creates a backup with an empty body when no label is entered', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/create', {});
    w.unmount();
  });

  it('cancels the create modal without mutating', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    expect(findBtn(w, 'Create')).toBeUndefined();
    w.unmount();
  });

  it('toasts when create fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('create boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Create backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Create')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'create boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin BackupPage — restore', () => {
  it('restores a backup after confirmation', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Restore Weekly Backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Restore')!.trigger('click');
    await flushPromises();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/backup/backup-1/restore');
    w.unmount();
  });

  it('cancels the restore confirm without restoring', async () => {
    const { client, post } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Restore Weekly Backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(post).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when the restore fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('restore boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Restore Weekly Backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Restore')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'restore boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin BackupPage — delete', () => {
  it('deletes a backup after confirmation and refetches', async () => {
    const { client, del, get } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Weekly Backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith('/api/v1/admin/backup/backup-1');
    expect(get.mock.calls.filter((c) => c[0] === '/api/v1/admin/backup/list').length).toBeGreaterThan(1);
    w.unmount();
  });

  it('cancels the delete confirm without deleting', async () => {
    const { client, del } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Weekly Backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when delete fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('delete boom'));
    const w = mountPage(client);
    await flushPromises();
    await w.findAllComponents(Button).find((b) => b.attributes('aria-label') === 'Delete Weekly Backup')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'delete boom')).toBe(true);
    w.unmount();
  });
});

describe('Admin BackupPage — schedule', () => {
  it('loads and displays the schedule with prefilled inputs', async () => {
    const { client } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Scheduled backups');
    const inputs = w.findAll('.admin-backup__input');
    expect((inputs[0].element as HTMLInputElement).value).toBe('7');
    expect((inputs[1].element as HTMLInputElement).value).toBe('5');
    w.unmount();
  });

  it('shows the "Not scheduled" label when next_scheduled_backup is null', async () => {
    const { client } = makeClient({
      schedule: {
        auto_backup_interval_days: 7,
        retention_count: 5,
        next_scheduled_backup: null,
        next_scheduled_backup_iso: null,
      },
    });
    const w = mountPage(client);
    await flushPromises();
    expect(w.text()).toContain('Not scheduled');
    w.unmount();
  });

  it('saves the schedule with parsed interval and retention', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const inputs = w.findAll('.admin-backup__input');
    await inputs[0].setValue('14');
    await inputs[1].setValue('10');
    await findBtn(w, 'Save schedule')!.trigger('click');
    await flushPromises();
    expect(put).toHaveBeenCalledWith('/api/v1/admin/backup/schedule', {
      auto_backup_interval_days: 14,
      retention_count: 10,
    });
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('saved'))).toBe(true);
    w.unmount();
  });

  it('rejects a negative interval', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const inputs = w.findAll('.admin-backup__input');
    await inputs[0].setValue('-1');
    await findBtn(w, 'Save schedule')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('non-negative'))).toBe(true);
    expect(put).not.toHaveBeenCalled();
    w.unmount();
  });

  it('rejects a retention count below 1', async () => {
    const { client, put } = makeClient();
    const w = mountPage(client);
    await flushPromises();
    const inputs = w.findAll('.admin-backup__input');
    await inputs[1].setValue('0');
    await findBtn(w, 'Save schedule')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message.includes('at least 1'))).toBe(true);
    expect(put).not.toHaveBeenCalled();
    w.unmount();
  });

  it('toasts when saving the schedule fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('schedule boom'));
    const w = mountPage(client);
    await flushPromises();
    await findBtn(w, 'Save schedule')!.trigger('click');
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'schedule boom')).toBe(true);
    w.unmount();
  });

  it('shows an in-body error state (+ toast) when the schedule fails to load', async () => {
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/backup/list') return { success: true, data: [], count: 0 };
      throw new Error('schedule load boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const toasts = useToastStore();
    expect(toasts.toasts.some((t) => t.message === 'schedule load boom')).toBe(true);
    // The schedule card is NOT rendered; an in-body error EmptyState replaces it.
    expect(w.find('.admin-backup__card').exists()).toBe(false);
    expect(w.text()).toContain("Couldn't load schedule");
    expect(w.text()).toContain('schedule load boom');
    w.unmount();
  });

  it('retries the schedule load from the error state', async () => {
    let schedCalls = 0;
    const get = vi.fn(async (endpoint: string) => {
      if (endpoint === '/api/v1/admin/backup/list') return { success: true, data: [sampleBackup], count: 1 };
      if (endpoint === '/api/v1/admin/backup/schedule') {
        schedCalls += 1;
        if (schedCalls === 1) throw new Error('schedule load boom');
        return { success: true, data: sampleSchedule };
      }
      throw new Error(`unexpected GET ${endpoint}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = mountPage(client);
    await flushPromises();
    const errorEmpty = w.findAllComponents(EmptyState).find((e) => e.text().includes("Couldn't load schedule"))!;
    expect(errorEmpty).toBeTruthy();
    await errorEmpty.find('button').trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load schedule");
    expect(w.find('.admin-backup__card').exists()).toBe(true);
    w.unmount();
  });
});
