/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { normalizeBool, type ApiClient } from '../client';

/**
 * A user's account status (S1 approval gate). `pending` accounts cannot log in
 * until an admin approves them; `disabled` accounts are blocked; `active` is the
 * normal full-access state. Returned per-row in the admin user list and in
 * `/auth/me`.
 */
export type UserStatus = 'pending' | 'active' | 'disabled';

/** The three statuses in display order (pending first — the approval queue). */
export const USER_STATUSES: readonly UserStatus[] = ['pending', 'active', 'disabled'];

/**
 * A server user row as returned by `AdminUserController`.
 *
 * `is_admin` is TINYINT(1) on the DB, so the wire value may arrive as `0`/`1`,
 * `"0"`/`"1"`, or a JSON boolean depending on the driver/transport. Every row
 * returned by {@link AdminUsersApi.list} / {@link AdminUsersApi.get} is run
 * through {@link normalizeBool} so consumers always read a single shape:
 * `is_admin: boolean`. This avoids the latent bug where a `0 | 1` row was
 * compared against a boolean toggle target and never matched.
 *
 * `status` (S1) is the account-approval state. It is optional here so older
 * payloads (and pre-migration rows) degrade gracefully — the UI treats a missing
 * status as `active`.
 */
export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  status?: UserStatus;
  created_at: string;
  updated_at: string;
}

/**
 * Coerce a raw user row's `is_admin` to a real boolean via {@link normalizeBool}
 * so wire shapes `0 | 1 | "0" | "1" | true | false` all collapse to one type.
 * Other fields are passed through unchanged.
 */
function normalizeUser(row: User): User {
  return { ...row, is_admin: normalizeBool(row.is_admin) };
}

/** Body accepted by {@link AdminUsersApi.create}. */
export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  /** Defaults to false when omitted. */
  is_admin?: boolean;
}

/** Body accepted by {@link AdminUsersApi.update}. */
export interface UpdateUserInput {
  username?: string;
  email?: string;
  /** Optional — omit to keep the current password. */
  password?: string;
}

// ── Relay bandwidth: quota + throttle (hub-only, S41/S42/S43) ────────────────────

/**
 * The per-user relay bandwidth rollup returned by the hub's `UserQuotaController`
 * (`GET /api/v1/admin/users/{id}/bandwidth`, and echoed by both the quota + the
 * throttle PUTs). All values are byte/bps integers; `0` on a cap means
 * "unlimited". This surface is **hub-only** — the media server does not serve the
 * relay quota/throttle endpoints, so the admin Users page shows the Relay control
 * only when running in the hub app (`phlixConfig.app === 'hub'`).
 *
 * - `bytes_in` / `bytes_out` — real streamed bytes metered this calendar month.
 * - `quota_bytes_in` / `quota_bytes_out` — monthly download/upload byte caps
 *   (`0` = unlimited), period-scoped in `relay_user_quotas`.
 * - `max_concurrent_streams` — max simultaneous relay streams (`0` = unlimited).
 * - `throttle_bps` — durable per-user relay rate cap in bits/sec (`0` = Unlimited,
 *   default `3000000` = 3 Mbps), stored in `relay_user_settings` — NOT reset each
 *   month, distinct from the byte-cap quota.
 */
export interface UserBandwidth {
  user_id: string;
  bytes_in: number;
  bytes_out: number;
  quota_bytes_in: number;
  quota_bytes_out: number;
  max_concurrent_streams: number;
  throttle_bps: number;
}

/** Body accepted by {@link AdminUsersApi.setQuota} (`PUT …/quota`). */
export interface SetQuotaInput {
  /** Monthly download byte cap; `0` = unlimited; ≤ 1 PiB. */
  quota_bytes_in: number;
  /** Monthly upload byte cap; `0` = unlimited; ≤ 1 PiB. */
  quota_bytes_out: number;
  /** Max simultaneous relay streams; `0` = unlimited; ≤ 1000. */
  max_concurrent_streams: number;
}

/**
 * The relay bandwidth throttle default (3 Mbps in bps). Every user starts here
 * until an admin changes it; `0` = Unlimited turns the throttle off entirely.
 * Mirrors the hub's `UserQuotaController::ALLOWED_THROTTLE_BPS` default.
 */
export const DEFAULT_THROTTLE_BPS = 3000000;

/**
 * The fixed, allow-listed relay throttle levels in bits/sec, in dropdown order:
 * Unlimited (`0`) then 1/3/5/10/20/50 Mbps. The hub rejects any value NOT in this
 * set with a `400 invalid_throttle`, so the admin control is a dropdown of exactly
 * these levels. Mirrors `UserQuotaController::ALLOWED_THROTTLE_BPS`.
 */
export const THROTTLE_BPS_OPTIONS: ReadonlyArray<{ value: number; label: string }> = [
  { value: 0, label: 'Unlimited' },
  { value: 1000000, label: '1 Mbps' },
  { value: 3000000, label: '3 Mbps' },
  { value: 5000000, label: '5 Mbps' },
  { value: 10000000, label: '10 Mbps' },
  { value: 20000000, label: '20 Mbps' },
  { value: 50000000, label: '50 Mbps' },
];

/** The allow-listed throttle levels (bps) — the {@link THROTTLE_BPS_OPTIONS} values. */
export const THROTTLE_BPS_LEVELS: readonly number[] = THROTTLE_BPS_OPTIONS.map((o) => o.value);

/** Coerce a wire value (int, numeric string, or absent) to a finite non-negative int, else 0. */
function bwInt(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return 0;
}

/**
 * Normalize a raw `UserQuotaController` bandwidth payload to a fully-typed
 * {@link UserBandwidth} — every numeric field coerced through {@link bwInt} so a
 * driver that returns strings (or a partial payload) can't leak `NaN`/`undefined`
 * into the UI.
 */
function normalizeBandwidth(raw: Record<string, unknown>): UserBandwidth {
  return {
    user_id: typeof raw['user_id'] === 'string' ? raw['user_id'] : String(raw['user_id'] ?? ''),
    bytes_in: bwInt(raw['bytes_in']),
    bytes_out: bwInt(raw['bytes_out']),
    quota_bytes_in: bwInt(raw['quota_bytes_in']),
    quota_bytes_out: bwInt(raw['quota_bytes_out']),
    max_concurrent_streams: bwInt(raw['max_concurrent_streams']),
    throttle_bps: bwInt(raw['throttle_bps']),
  };
}

/**
 * A user profile row as returned by `AdminProfileController`.
 * `pin_hash` is always `null` in GET responses — PIN is write-only from the
 * UI's perspective.
 */
export interface Profile {
  id: number;
  user_id: number;
  name: string;
  /** Always null in GET responses — PIN is write-only. */
  pin_hash: null;
  /**
   * Parental content-rating cap on the expanded 0–12 age scale that interleaves
   * the MPAA movie ratings with the US TV vocabulary (see {@link RATING_LABELS}).
   */
  rating: number;
  created_at: string;
}

/**
 * Rating display labels for the parental content-rating cap on the expanded
 * 0–12 age scale. The scale interleaves the MPAA movie ratings with the US TV
 * vocabulary in ascending age/maturity order so a single numeric cap gates both
 * movies and TV consistently:
 *
 *   0 G · 1 TV-Y · 2 TV-G · 3 TV-Y7 · 4 PG · 5 TV-PG · 6 PG-13 · 7 TV-14 ·
 *   8 R · 9 TV-MA · 10 NC-17 · 11 X · 12 UNRATED
 *
 * Matches the server's expanded content-rating vocabulary. Values are stable
 * indices; the label text carries a "(Movies)"/"(TV)" hint so the two families
 * are distinguishable in flat pickers.
 */
export const RATING_LABELS: Record<number, string> = {
  0: 'G — General Audiences (Movies)',
  1: 'TV-Y — All Children (TV)',
  2: 'TV-G — General Audience (TV)',
  3: 'TV-Y7 — Older Children (TV)',
  4: 'PG — Parental Guidance (Movies)',
  5: 'TV-PG — Parental Guidance (TV)',
  6: 'PG-13 — Parents Strongly Cautioned (Movies)',
  7: 'TV-14 — Parents Strongly Cautioned (TV)',
  8: 'R — Restricted (Movies)',
  9: 'TV-MA — Mature Audience (TV)',
  10: 'NC-17 — No One 17 & Under (Movies)',
  11: 'X — Adult (Movies)',
  12: 'UNRATED — Unrated Content',
};

/** Highest cap index (UNRATED) — the safe fallback when a value is unknown. */
export const RATING_MAX = 12;

/** Rating options for select elements (age-ordered, 0–12). */
export const RATING_OPTIONS: ReadonlyArray<{ value: number; label: string }> =
  Object.entries(RATING_LABELS).map(([value, label]) => ({
    value: Number(value),
    label,
  }));

/** Body accepted by {@link AdminUsersApi.createProfile}. */
export interface CreateProfileInput {
  name: string;
  /** Content-rating cap on the 0–12 age scale (0=G … 12=UNRATED). */
  rating: number;
}

/** Body accepted by {@link AdminUsersApi.updateProfile}. */
export interface UpdateProfileInput {
  name?: string;
  rating?: number;
}

// ── Parental control types ─────────────────────────────────────────────────────

/**
 * Access schedule entry for a profile.
 * Days of week are mon|tue|wed|thu|fri|sat|sun.
 */
export interface AccessSchedule {
  id: number;
  profile_id: number;
  name: string;
  start_time: string;
  end_time: string;
  days_of_week: string[];
  is_active: boolean;
}

/** Profile content tag (block or allow). */
export interface ProfileTag {
  id: number;
  profile_id: number;
  tag: string;
  tag_type: 'blocked' | 'allowed';
}

/** Stream limit settings for a profile. */
export interface ProfileStreamLimit {
  max_concurrent_streams: number;
  max_total_bandwidth_kbps: number | null;
}

/**
 * AdminUsersApi (RA.3) — typed wrapper over the admin user + profile endpoints
 * (`/api/v1/admin/users/*` and `/api/v1/admin/profiles/*`), ported from the
 * deleted React `UsersApi` + `ProfilesApi`. Covers user CRUD, set-admin and
 * reset-password, plus per-user profile CRUD and PIN management.
 *
 * Every method maps 1:1 to an endpoint shipped by `AdminUserController` /
 * `AdminProfileController` and unwraps the single-key envelopes those
 * controllers return (`{ users }`, `{ user }`, `{ profiles }`, `{ profile }`,
 * …). Defensively guards the list unwraps so a malformed payload degrades to
 * `[]` rather than throwing; non-2xx responses surface `ApiError` via the
 * shared client.
 *
 * Contract notes (traced from source, not assumed):
 *  - `POST /{id}/set-admin` sends `{ is_admin: boolean }` (a real boolean, not
 *    0/1); the controller casts it server-side.
 *  - `resetPassword()` returns `{ message, new_password }` — the plaintext
 *    password is only available in that response.
 *  - `rating` is an integer 0-12 (see {@link RATING_LABELS}).
 *  - `POST /profiles/{id}/pin` accepts `{ pin: "1234" }` — 4 or 6 digits.
 *  - Max 5 profiles per user is enforced server-side.
 */
export class AdminUsersApi {
  constructor(private readonly client: ApiClient) {}

  // ── Users ────────────────────────────────────────────────────────────────

  /**
   * `GET /api/v1/admin/users` → unwraps `{ users }`.
   *
   * Optionally filters by account {@link UserStatus} (S1): when `status` is
   * provided it is appended as `?status=` and the server returns only matching
   * rows (e.g. the pending-approval queue). Omitting it lists every user.
   */
  async list(params?: { status?: UserStatus }): Promise<User[]> {
    const query = params?.status ? `?status=${encodeURIComponent(params.status)}` : '';
    const { users } = await this.client.get<{ users: User[] }>(`/api/v1/admin/users${query}`);
    return Array.isArray(users) ? users.map(normalizeUser) : [];
  }

  /**
   * `POST /api/v1/admin/users/{id}/approve` → `{ message }`. Sets the account
   * status to `active` (approves a pending user / re-enables a disabled one).
   */
  approve(id: number): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/approve`,
    );
  }

  /**
   * `POST /api/v1/admin/users/{id}/disable` → `{ message }`. Sets the account
   * status to `disabled` (server refuses self + last-admin).
   */
  disable(id: number): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/disable`,
    );
  }

  /**
   * `POST /api/v1/admin/users/{id}/reject` → `{ message }`. Removes / disables a
   * still-pending signup (declines the approval request).
   */
  reject(id: number): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/reject`,
    );
  }

  /** `GET /api/v1/admin/users/{id}` → unwraps `{ user }`. */
  async get(id: number): Promise<User> {
    const { user } = await this.client.get<{ user: User }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}`,
    );
    return normalizeUser(user);
  }

  /** `POST /api/v1/admin/users` → `201 { user_id, message }`. */
  create(input: CreateUserInput): Promise<{ user_id: number; message: string }> {
    return this.client.post<{ user_id: number; message: string }>('/api/v1/admin/users', input);
  }

  /** `PUT /api/v1/admin/users/{id}` → `{ message }`. */
  update(id: number, input: UpdateUserInput): Promise<{ message: string }> {
    return this.client.put<{ message: string }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}`,
      input,
    );
  }

  /** `DELETE /api/v1/admin/users/{id}` → `{ message }`. */
  remove(id: number): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}`,
    );
  }

  /**
   * `POST /api/v1/admin/users/{id}/set-admin` → `{ message }`.
   * Sends `{ is_admin: boolean }` (real boolean, not 0/1).
   */
  setAdmin(id: number, isAdmin: boolean): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/set-admin`,
      { is_admin: isAdmin },
    );
  }

  /**
   * `POST /api/v1/admin/users/{id}/reset-password` → `{ message, new_password }`.
   * The plaintext password is only available in this response.
   */
  resetPassword(id: number): Promise<{ message: string; new_password: string }> {
    return this.client.post<{ message: string; new_password: string }>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/reset-password`,
    );
  }

  // ── Relay bandwidth: quota + throttle (hub-only, S41/S42/S43) ────────────────

  /**
   * `GET /api/v1/admin/users/{id}/bandwidth` → the user's current-period relay
   * usage + configured caps ({@link UserBandwidth}). A user with no row yet reads
   * back as zeroed usage + unlimited caps (a real payload, not a 404). Hub-only.
   */
  async getBandwidth(id: number): Promise<UserBandwidth> {
    const raw = await this.client.get<Record<string, unknown>>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/bandwidth`,
    );
    return normalizeBandwidth(raw ?? {});
  }

  /**
   * `PUT /api/v1/admin/users/{id}/throttle` → set the user's durable relay
   * bandwidth throttle. Body `{ throttle_bps }` MUST be one of
   * {@link THROTTLE_BPS_LEVELS} (`0` = Unlimited, or 1/3/5/10/20/50 Mbps in bps) —
   * any other value is a `400 invalid_throttle`. Returns the updated
   * {@link UserBandwidth} rollup. Hub-only.
   */
  async setThrottle(id: number, throttleBps: number): Promise<UserBandwidth> {
    const raw = await this.client.put<Record<string, unknown>>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/throttle`,
      { throttle_bps: throttleBps },
    );
    return normalizeBandwidth(raw ?? {});
  }

  /**
   * `PUT /api/v1/admin/users/{id}/quota` → set the user's monthly download/upload
   * byte caps + concurrent-stream cap. Every value is a non-negative integer
   * (`0` = unlimited); byte caps ≤ 1 PiB, streams ≤ 1000 — out-of-range values are
   * a `400 invalid_quota`. Returns the updated {@link UserBandwidth}. Hub-only.
   */
  async setQuota(id: number, input: SetQuotaInput): Promise<UserBandwidth> {
    const raw = await this.client.put<Record<string, unknown>>(
      `/api/v1/admin/users/${encodeURIComponent(id)}/quota`,
      input,
    );
    return normalizeBandwidth(raw ?? {});
  }

  // ── Profiles ───────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/users/{userId}/profiles` → unwraps `{ profiles }`. */
  async listProfiles(userId: number): Promise<Profile[]> {
    const { profiles } = await this.client.get<{ profiles: Profile[] }>(
      `/api/v1/admin/users/${encodeURIComponent(userId)}/profiles`,
    );
    return Array.isArray(profiles) ? profiles : [];
  }

  /** `POST /api/v1/admin/users/{userId}/profiles` → `201 { profile_id, message }`. */
  createProfile(
    userId: number,
    input: CreateProfileInput,
  ): Promise<{ profile_id: number; message: string }> {
    return this.client.post<{ profile_id: number; message: string }>(
      `/api/v1/admin/users/${encodeURIComponent(userId)}/profiles`,
      input,
    );
  }

  /** `PUT /api/v1/admin/profiles/{id}` → `{ message }`. */
  updateProfile(id: number, input: UpdateProfileInput): Promise<{ message: string }> {
    return this.client.put<{ message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(id)}`,
      input,
    );
  }

  /** `DELETE /api/v1/admin/profiles/{id}` → `{ message }`. */
  removeProfile(id: number): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(id)}`,
    );
  }

  /**
   * `POST /api/v1/admin/profiles/{id}/pin` → `{ message }`.
   * Body: `{ pin: "1234" }` — a 4 or 6 digit PIN.
   */
  setPin(id: number, pin: string): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(id)}/pin`,
      { pin },
    );
  }

  /** `DELETE /api/v1/admin/profiles/{id}/pin` → `{ message }`. */
  clearPin(id: number): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(id)}/pin`,
    );
  }

  // ── Parental controls ─────────────────────────────────────────────────────────

  /**
   * `GET /api/v1/admin/profiles/{id}/schedules` → list of access schedules.
   */
  async profileSchedules(profileId: number): Promise<AccessSchedule[]> {
    const { schedules } = await this.client.get<{ schedules: AccessSchedule[] }>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/schedules`,
    );
    return Array.isArray(schedules) ? schedules : [];
  }

  /**
   * `POST /api/v1/admin/profiles/{id}/schedules` → `{ id, message }`.
   */
  createProfileSchedule(
    profileId: number,
    name: string,
    startTime: string,
    endTime: string,
    daysOfWeek: string[],
    isActive: boolean,
  ): Promise<{ id: number; message: string }> {
    return this.client.post<{ id: number; message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/schedules`,
      {
        name,
        start_time: startTime,
        end_time: endTime,
        days_of_week: daysOfWeek,
        is_active: isActive,
      },
    );
  }

  /**
   * `DELETE /api/v1/admin/profiles/{id}/schedules/{scheduleId}` → `{ message }`.
   */
  deleteProfileSchedule(profileId: number, scheduleId: number): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/schedules/${encodeURIComponent(scheduleId)}`,
    );
  }

  /**
   * `GET /api/v1/admin/profiles/{id}/tags` → list of profile tags.
   */
  async profileTags(profileId: number): Promise<ProfileTag[]> {
    const { tags } = await this.client.get<{ tags: ProfileTag[] }>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/tags`,
    );
    return Array.isArray(tags) ? tags : [];
  }

  /**
   * `POST /api/v1/admin/profiles/{id}/tags` → `{ id, message }`.
   */
  addProfileTag(
    profileId: number,
    tag: string,
    tagType: 'blocked' | 'allowed',
  ): Promise<{ id: number; message: string }> {
    return this.client.post<{ id: number; message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/tags`,
      { tag, tag_type: tagType },
    );
  }

  /**
   * `DELETE /api/v1/admin/profiles/{id}/tags/{tagId}` → `{ message }`.
   */
  deleteProfileTag(profileId: number, tagId: number): Promise<{ message: string }> {
    return this.client.delete<{ message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/tags/${encodeURIComponent(tagId)}`,
    );
  }

  /**
   * `GET /api/v1/admin/profiles/{id}/stream-limits` → stream limit settings.
   */
  async profileStreamLimits(profileId: number): Promise<ProfileStreamLimit> {
    return this.client.get<ProfileStreamLimit>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/stream-limits`,
    );
  }

  /**
   * `PUT /api/v1/admin/profiles/{id}/stream-limits` → `{ message }`.
   */
  updateProfileStreamLimits(
    profileId: number,
    maxConcurrentStreams: number,
    maxTotalBandwidthKbps: number | null,
  ): Promise<{ message: string }> {
    return this.client.put<{ message: string }>(
      `/api/v1/admin/profiles/${encodeURIComponent(profileId)}/stream-limits`,
      {
        max_concurrent_streams: maxConcurrentStreams,
        max_total_bandwidth_kbps: maxTotalBandwidthKbps,
      },
    );
  }
}
