import type { ApiClient } from '../client';

/**
 * A backup row as returned by `BackupManager::listBackups()`.
 */
export interface Backup {
  id: string;
  label: string;
  file_path: string;
  size_bytes: number;
  checksum_sha256: string;
  is_s3: boolean;
  created_at: string;
  expires_at: string | null;
}

/** Body accepted by {@link AdminBackupApi.create}. */
export interface CreateBackupInput {
  label?: string;
}

/** Result of {@link AdminBackupApi.create}. */
export interface CreateBackupResult {
  message: string;
  backup_id: string;
  file_path: string;
  size_bytes: number;
}

/** Body accepted by {@link AdminBackupApi.updateSchedule}. */
export interface UpdateScheduleInput {
  auto_backup_interval_days?: number;
  retention_count?: number;
}

/** Schedule data returned by {@link AdminBackupApi.getSchedule}. */
export interface ScheduleData {
  auto_backup_interval_days: number;
  retention_count: number;
  next_scheduled_backup: number | null;
  next_scheduled_backup_iso: string | null;
}

/** Result of {@link AdminBackupApi.updateSchedule}. */
export interface UpdateScheduleResult {
  auto_backup_interval_days: number;
  retention_count: number;
}

/**
 * AdminBackupApi (RA.7) — typed wrapper over the admin backup endpoints
 * (`/api/v1/admin/backup/*`), ported 1:1 from the deleted React `BackupApi`.
 * Covers backup create / list / delete / restore, S3 upload, and the
 * auto-backup schedule (interval + retention).
 *
 * Every method maps 1:1 to an endpoint shipped by `BackupController` and parses
 * the EXACT response envelope that controller returns. The `list()` unwrap is
 * defensively guarded so a malformed payload degrades to `[]` rather than
 * throwing; non-2xx responses surface `ApiError` via the shared client.
 *
 * Contract (traced from source):
 *  - `create()` posts `{ label?: string }` and replies
 *    `{ success, message, data: { backup_id, file_path, size_bytes } }`
 *  - `list()` replies `{ success, data: Backup[], count }`
 *  - `delete()` replies `{ message }`
 *  - `restore()` replies `{ message }`
 *  - `uploadToS3()` replies `{ message }`
 *  - `getSchedule()` replies `{ success, data: ScheduleData }`
 *  - `updateSchedule()` posts `{ auto_backup_interval_days?, retention_count? }`
 *    and replies `{ success, message, data: UpdateScheduleResult }`
 */
export class AdminBackupApi {
  constructor(private readonly client: ApiClient) {}

  /** `GET /api/v1/admin/backup/list` → unwraps `{ data }`. */
  async list(): Promise<Backup[]> {
    const response = await this.client.get<{
      success: boolean;
      data: Backup[];
      count: number;
    }>('/api/v1/admin/backup/list');
    return Array.isArray(response.data) ? response.data : [];
  }

  /** `POST /api/v1/admin/backup/create` → `{ success, message, data }`. */
  async create(input: CreateBackupInput = {}): Promise<CreateBackupResult> {
    const r = await this.client.post<{
      success: boolean;
      message: string;
      data: CreateBackupResult;
    }>('/api/v1/admin/backup/create', input);
    return {
      message: r.message,
      backup_id: r.data.backup_id,
      file_path: r.data.file_path,
      size_bytes: r.data.size_bytes,
    };
  }

  /** `DELETE /api/v1/admin/backup/{id}` → `{ message }`. */
  delete(id: string): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/admin/backup/${encodeURIComponent(id)}`,
    );
  }

  /** `POST /api/v1/admin/backup/{id}/restore` → `{ message }`. */
  restore(id: string): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `/api/v1/admin/backup/${encodeURIComponent(id)}/restore`,
    );
  }

  /** `POST /api/v1/admin/backup/{id}/upload-s3` → `{ message }`. */
  uploadToS3(id: string): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `/api/v1/admin/backup/${encodeURIComponent(id)}/upload-s3`,
    );
  }

  /** `GET /api/v1/admin/backup/schedule` → unwraps `{ data }`. */
  async getSchedule(): Promise<ScheduleData> {
    const response = await this.client.get<{
      success: boolean;
      data: ScheduleData;
    }>('/api/v1/admin/backup/schedule');
    return response.data;
  }

  /** `PUT /api/v1/admin/backup/schedule` → unwraps `{ data }`. */
  async updateSchedule(input: UpdateScheduleInput): Promise<UpdateScheduleResult> {
    const response = await this.client.put<{
      success: boolean;
      message: string;
      data: UpdateScheduleResult;
    }>('/api/v1/admin/backup/schedule', input);
    return response.data;
  }
}
