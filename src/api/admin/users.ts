/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
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
  /** 0=G, 1=PG, 2=PG-13, 3=R, 4=NC-17, 5=X, 6=UNRATED */
  rating: number;
  created_at: string;
}

/** Rating display labels (parental-rating scale, 0-6). */
export const RATING_LABELS: Record<number, string> = {
  0: 'G — General Audiences',
  1: 'PG — Parental Guidance',
  2: 'PG-13 — Parents Strongly Cautioned',
  3: 'R — Restricted',
  4: 'NC-17 — No One 17 & Under',
  5: 'X — Adult',
  6: 'UNRATED — Unrated Content',
};

/** Rating options for select elements. */
export const RATING_OPTIONS: ReadonlyArray<{ value: number; label: string }> =
  Object.entries(RATING_LABELS).map(([value, label]) => ({
    value: Number(value),
    label,
  }));

/** Body accepted by {@link AdminUsersApi.createProfile}. */
export interface CreateProfileInput {
  name: string;
  /** 0=G … 6=UNRATED */
  rating: number;
}

/** Body accepted by {@link AdminUsersApi.updateProfile}. */
export interface UpdateProfileInput {
  name?: string;
  rating?: number;
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
 *  - `rating` is an integer 0-6 (see {@link RATING_LABELS}).
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
}
