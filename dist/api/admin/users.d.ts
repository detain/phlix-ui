import type { ApiClient } from '../client';
/**
 * A server user row as returned by `AdminUserController`.
 *
 * `is_admin` is TINYINT(1) on the DB — the wire value is `0` or `1`, never a
 * JSON boolean — so the typed interface reflects that.
 */
export interface User {
    id: number;
    username: string;
    email: string;
    is_admin: 0 | 1;
    created_at: string;
    updated_at: string;
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
export declare const RATING_LABELS: Record<number, string>;
/** Rating options for select elements. */
export declare const RATING_OPTIONS: ReadonlyArray<{
    value: number;
    label: string;
}>;
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
export declare class AdminUsersApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/users` → unwraps `{ users }`. */
    list(): Promise<User[]>;
    /** `GET /api/v1/admin/users/{id}` → unwraps `{ user }`. */
    get(id: number): Promise<User>;
    /** `POST /api/v1/admin/users` → `201 { user_id, message }`. */
    create(input: CreateUserInput): Promise<{
        user_id: number;
        message: string;
    }>;
    /** `PUT /api/v1/admin/users/{id}` → `{ message }`. */
    update(id: number, input: UpdateUserInput): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/admin/users/{id}` → `{ message }`. */
    remove(id: number): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/users/{id}/set-admin` → `{ message }`.
     * Sends `{ is_admin: boolean }` (real boolean, not 0/1).
     */
    setAdmin(id: number, isAdmin: boolean): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/users/{id}/reset-password` → `{ message, new_password }`.
     * The plaintext password is only available in this response.
     */
    resetPassword(id: number): Promise<{
        message: string;
        new_password: string;
    }>;
    /** `GET /api/v1/admin/users/{userId}/profiles` → unwraps `{ profiles }`. */
    listProfiles(userId: number): Promise<Profile[]>;
    /** `POST /api/v1/admin/users/{userId}/profiles` → `201 { profile_id, message }`. */
    createProfile(userId: number, input: CreateProfileInput): Promise<{
        profile_id: number;
        message: string;
    }>;
    /** `PUT /api/v1/admin/profiles/{id}` → `{ message }`. */
    updateProfile(id: number, input: UpdateProfileInput): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/admin/profiles/{id}` → `{ message }`. */
    removeProfile(id: number): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/profiles/{id}/pin` → `{ message }`.
     * Body: `{ pin: "1234" }` — a 4 or 6 digit PIN.
     */
    setPin(id: number, pin: string): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/admin/profiles/{id}/pin` → `{ message }`. */
    clearPin(id: number): Promise<{
        message: string;
    }>;
}
