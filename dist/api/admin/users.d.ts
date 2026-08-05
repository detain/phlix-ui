/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type ApiClient } from '../client';
/**
 * A user's account status (S1 approval gate). `pending` accounts cannot log in
 * until an admin approves them; `disabled` accounts are blocked; `active` is the
 * normal full-access state. Returned per-row in the admin user list and in
 * `/auth/me`.
 */
export type UserStatus = 'pending' | 'active' | 'disabled';
/** The three statuses in display order (pending first — the approval queue). */
export declare const USER_STATUSES: readonly UserStatus[];
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
 *
 * `id` is a **UUID**, not an integer — `users.id CHAR(36) PRIMARY KEY` in BOTH
 * apps this client serves (`phlix-server/migrations/001_initial_schema.sql:5`
 * and `phlix-hub/migrations/001_users.sql:8`). It was declared `number` until
 * S209. That was already contradicted inside this very file by
 * {@link UserBandwidth.user_id}, which has always been `string`, and by
 * {@link Profile.user_id}, which is the same column by foreign key
 * (`migrations/002_user_profiles_and_parental_controls.sql:14`).
 *
 * Unlike the profile id this one caused no *runtime* defect: every user id is
 * passed straight into a URL and never coerced, compared numerically or sorted,
 * so nothing arithmetically mangled it. It is corrected because it feeds
 * {@link AdminUsersApi.createProfile} and {@link AdminUsersApi.listProfiles},
 * and leaving the owner id typed `number` while `Profile.user_id` is `string`
 * would leave the next reader the same false clue that produced S209's gate.
 */
export interface User {
    /** `users.id CHAR(36)` — a UUID (server migration 001:5, hub migration 001:8). */
    id: string;
    username: string;
    email: string;
    is_admin: boolean;
    status?: UserStatus;
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
export declare const DEFAULT_THROTTLE_BPS = 3000000;
/**
 * The fixed, allow-listed relay throttle levels in bits/sec, in dropdown order:
 * Unlimited (`0`) then 1/3/5/10/20/50 Mbps. The hub rejects any value NOT in this
 * set with a `400 invalid_throttle`, so the admin control is a dropdown of exactly
 * these levels. Mirrors `UserQuotaController::ALLOWED_THROTTLE_BPS`.
 */
export declare const THROTTLE_BPS_OPTIONS: ReadonlyArray<{
    value: number;
    label: string;
}>;
/** The allow-listed throttle levels (bps) — the {@link THROTTLE_BPS_OPTIONS} values. */
export declare const THROTTLE_BPS_LEVELS: readonly number[];
/**
 * A user profile row as returned by `AdminProfileController`.
 * `pin_hash` is always `null` in GET responses — PIN is write-only from the
 * UI's perspective.
 *
 * ## Why `id` and `user_id` are strings (S209)
 *
 * Both are **UUIDs**, not integers — checked against the schema rather than
 * inferred from a sample payload:
 *
 *   - `migrations/002_user_profiles_and_parental_controls.sql:6` —
 *     `user_profiles.id CHAR(36) PRIMARY KEY`
 *   - `migrations/002_user_profiles_and_parental_controls.sql:7` —
 *     `user_profiles.user_id CHAR(36) NOT NULL`
 *
 * They were declared `number` here until S209, and that lie had teeth: the
 * parental-controls page gated itself on `!isNaN(Number(id))`, which is `false`
 * for every genuine UUID, so the page never opened for a real profile. The
 * declared type is the thing that made that gate look reasonable, so it is
 * corrected here and not only at the call site.
 *
 * Note the id shapes in this file are **mixed** and must stay that way — the
 * sub-resource ids ({@link AccessSchedule.id}, {@link ProfileTag.id}) really are
 * `INT UNSIGNED AUTO_INCREMENT`. See each field's own note.
 */
export interface Profile {
    /** `user_profiles.id CHAR(36)` — a UUID (migration 002:6), never an integer. */
    id: string;
    /** `user_profiles.user_id CHAR(36)` — the owning user's UUID (migration 002:7). */
    user_id: string;
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
export declare const RATING_LABELS: Record<number, string>;
/** Highest cap index (UNRATED) — the safe fallback when a value is unknown. */
export declare const RATING_MAX = 12;
/** Rating options for select elements (age-ordered, 0–12). */
export declare const RATING_OPTIONS: ReadonlyArray<{
    value: number;
    label: string;
}>;
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
/**
 * Access schedule entry for a profile.
 * Days of week are mon|tue|wed|thu|fri|sat|sun.
 *
 * ⚠ The two ids here are **different shapes**, and that is deliberate rather
 * than an oversight — `migrations/061_access_schedules.sql` declares
 * `id INT UNSIGNED AUTO_INCREMENT` at `:8` but `profile_id CHAR(36)` at `:9`,
 * and carries the standing note at `:5` that `profile_id` was *changed* from
 * `INT UNSIGNED` to `CHAR(36)` to match `user_profiles.id`. Do not "tidy" the
 * two into agreement in either direction.
 */
export interface AccessSchedule {
    /** `access_schedules.id INT UNSIGNED AUTO_INCREMENT` (migration 061:8) — a real integer. */
    id: number;
    /** `access_schedules.profile_id CHAR(36)` (migration 061:9) — a UUID. */
    profile_id: string;
    name: string;
    start_time: string;
    end_time: string;
    days_of_week: string[];
    is_active: boolean;
}
/**
 * Profile content tag (block or allow).
 *
 * Same mixed shape as {@link AccessSchedule}: `migrations/062_profile_tags.sql`
 * declares `id INT UNSIGNED AUTO_INCREMENT` at `:9` and `profile_id CHAR(36)` at
 * `:10`, with the same "changed from INT UNSIGNED to CHAR(36)" note at `:6`.
 */
export interface ProfileTag {
    /** `profile_tags.id INT UNSIGNED AUTO_INCREMENT` (migration 062:9) — a real integer. */
    id: number;
    /** `profile_tags.profile_id CHAR(36)` (migration 062:10) — a UUID. */
    profile_id: string;
    tag: string;
    tag_type: 'blocked' | 'allowed';
}
/**
 * Stream limit settings for a profile.
 *
 * Carries no id of its own on the wire — `profile_stream_limits` is keyed by
 * `profile_id CHAR(36) PRIMARY KEY` (`migrations/063_device_stream_limits.sql:7`),
 * which the client supplies in the URL rather than reading back. Both remaining
 * fields are `INT UNSIGNED` (`:8`, `:9`) and correctly stay numbers.
 */
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
export declare class AdminUsersApi {
    private readonly client;
    constructor(client: ApiClient);
    /**
     * `GET /api/v1/admin/users` → unwraps `{ users }`.
     *
     * Optionally filters by account {@link UserStatus} (S1): when `status` is
     * provided it is appended as `?status=` and the server returns only matching
     * rows (e.g. the pending-approval queue). Omitting it lists every user.
     */
    list(params?: {
        status?: UserStatus;
    }): Promise<User[]>;
    /**
     * `POST /api/v1/admin/users/{id}/approve` → `{ message }`. Sets the account
     * status to `active` (approves a pending user / re-enables a disabled one).
     */
    approve(id: string | number): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/users/{id}/disable` → `{ message }`. Sets the account
     * status to `disabled` (server refuses self + last-admin).
     */
    disable(id: string | number): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/users/{id}/reject` → `{ message }`. Removes / disables a
     * still-pending signup (declines the approval request).
     */
    reject(id: string | number): Promise<{
        message: string;
    }>;
    /** `GET /api/v1/admin/users/{id}` → unwraps `{ user }`. */
    get(id: string | number): Promise<User>;
    /** `POST /api/v1/admin/users` → `201 { user_id, message }`. */
    /**
     * `POST /api/v1/admin/users` → `201 { user_id, message }`.
     *
     * `user_id` is the new user's UUID: `UserRepository::create()` is typed
     * `: string` and returns `generateUuid()`, and `AdminUserController::create()`
     * passes it through uncast. (Its docblock still claims `int` — the docblock is
     * wrong, the code is right.) Contrast {@link createProfile}, whose controller
     * *does* apply a `(int)` cast to the same kind of value; that asymmetry is what
     * makes the profile one a defect rather than a convention.
     */
    create(input: CreateUserInput): Promise<{
        user_id: string;
        message: string;
    }>;
    /** `PUT /api/v1/admin/users/{id}` → `{ message }`. */
    update(id: string | number, input: UpdateUserInput): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/admin/users/{id}` → `{ message }`. */
    remove(id: string | number): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/users/{id}/set-admin` → `{ message }`.
     * Sends `{ is_admin: boolean }` (real boolean, not 0/1).
     */
    setAdmin(id: string | number, isAdmin: boolean): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/users/{id}/reset-password` → `{ message, new_password }`.
     * The plaintext password is only available in this response.
     */
    resetPassword(id: string | number): Promise<{
        message: string;
        new_password: string;
    }>;
    /**
     * `GET /api/v1/admin/users/{id}/bandwidth` → the user's current-period relay
     * usage + configured caps ({@link UserBandwidth}). A user with no row yet reads
     * back as zeroed usage + unlimited caps (a real payload, not a 404). Hub-only.
     */
    getBandwidth(id: string | number): Promise<UserBandwidth>;
    /**
     * `PUT /api/v1/admin/users/{id}/throttle` → set the user's durable relay
     * bandwidth throttle. Body `{ throttle_bps }` MUST be one of
     * {@link THROTTLE_BPS_LEVELS} (`0` = Unlimited, or 1/3/5/10/20/50 Mbps in bps) —
     * any other value is a `400 invalid_throttle`. Returns the updated
     * {@link UserBandwidth} rollup. Hub-only.
     */
    setThrottle(id: string | number, throttleBps: number): Promise<UserBandwidth>;
    /**
     * `PUT /api/v1/admin/users/{id}/quota` → set the user's monthly download/upload
     * byte caps + concurrent-stream cap. Every value is a non-negative integer
     * (`0` = unlimited); byte caps ≤ 1 PiB, streams ≤ 1000 — out-of-range values are
     * a `400 invalid_quota`. Returns the updated {@link UserBandwidth}. Hub-only.
     */
    setQuota(id: string | number, input: SetQuotaInput): Promise<UserBandwidth>;
    /** `GET /api/v1/admin/users/{userId}/profiles` → unwraps `{ profiles }`. */
    listProfiles(userId: string | number): Promise<Profile[]>;
    /**
     * `POST /api/v1/admin/users/{userId}/profiles` → `201 { profile_id, message }`.
     *
     * ⚠ `profile_id` is declared `string | number` because the server is currently
     * inconsistent with itself, not because the id is genuinely either shape.
     * `UserProfileManager::create()` is typed `: string` and returns a generated
     * UUID, but `AdminProfileController::createForUser()` serialises it as
     * `'profile_id' => (int) $newId`, and `(int)` of a UUID is `0` (or the leading
     * digits, if the UUID happens to start with one). So the wire value today is a
     * meaningless integer while the contract calls for a UUID string. No caller
     * reads this field — `UsersPage.vue` discards the result and re-lists — so it
     * is inert, but narrowing it to `string` here would declare a value the server
     * does not yet send. Tracked separately; fixing it belongs in phlix-server.
     */
    createProfile(userId: string | number, input: CreateProfileInput): Promise<{
        profile_id: string | number;
        message: string;
    }>;
    /**
     * `GET /api/v1/admin/profiles/{id}` → unwraps `{ profile }`.
     *
     * Fetches ONE profile by id, which is what an id-keyed screen needs — the
     * per-user {@link listProfiles} is keyed by `userId` and is unusable when all
     * you hold is the profile id itself (as on the parental-controls page, which is
     * routed by `?profile=<id>`).
     *
     * Served by `AdminProfileController::get` (`AdminRoutes.php:264`), which 404s
     * with `{ error: 'Profile not found' }` for an unknown id.
     */
    getProfile(id: number | string): Promise<Profile>;
    /** `PUT /api/v1/admin/profiles/{id}` → `{ message }`. */
    updateProfile(id: string | number, input: UpdateProfileInput): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/admin/profiles/{id}` → `{ message }`. */
    removeProfile(id: string | number): Promise<{
        message: string;
    }>;
    /**
     * `POST /api/v1/admin/profiles/{id}/pin` → `{ message }`.
     * Body: `{ pin: "1234" }` — a 4 or 6 digit PIN.
     */
    setPin(id: string | number, pin: string): Promise<{
        message: string;
    }>;
    /** `DELETE /api/v1/admin/profiles/{id}/pin` → `{ message }`. */
    clearPin(id: string | number): Promise<{
        message: string;
    }>;
    /**
     * `GET /api/v1/admin/profiles/{id}/schedules` → list of access schedules.
     */
    profileSchedules(profileId: string | number): Promise<AccessSchedule[]>;
    /**
     * `POST /api/v1/admin/profiles/{id}/schedules` → `{ id, message }`.
     */
    createProfileSchedule(profileId: string | number, name: string, startTime: string, endTime: string, daysOfWeek: string[], isActive: boolean): Promise<{
        id: number;
        message: string;
    }>;
    /**
     * `PUT /api/v1/admin/profiles/{id}/schedules/{scheduleId}` → `{ schedule, message }`.
     *
     * Edits ONE schedule in place (S202). Before this existed the page implemented
     * "edit" as DELETE-then-CREATE, so a create that failed after the delete had
     * already committed left the profile with **no time restriction at all** — an
     * access-control surface failing in the OPEN direction. There was never a need
     * for that: `PUT /profiles/{profileId}/schedules/{scheduleId}` has been
     * registered all along (`phlix-server/src/Server/Http/Routes/AdminRoutes.php:308`
     * for this admin-prefixed form, and `Application.php:1346` for the un-prefixed
     * one the mobile/Roku clients use), handled by
     * `AccessScheduleController::updateSchedule` (`:217`).
     *
     * ── The wire contract, read off the handler rather than assumed ──────────────
     *
     * Every key is **snake_case**, exactly as the create path takes them: the
     * handler reads `name`, `start_time`, `end_time`, `days_of_week` and
     * `is_active` (`AccessScheduleController.php:243-269`). It reads NOTHING in
     * camelCase, so a camelCase body would be silently discarded and — because
     * every field is individually optional — collapse to `No valid fields to
     * update` / **400** with no clue as to why. That is S234, live today in the
     * mobile and Roku clients; it is not repeated here.
     *
     * All five fields are sent on every call even though the handler treats each as
     * optional. The form is a whole-object editor with every field populated, so a
     * partial body could only ever be produced by omitting a field the user CAN
     * see, and a field the user cleared must be able to travel as its new value.
     *
     * ⚠ `schedule` is not guaranteed to be a schedule OBJECT. The handler
     * serialises `$updated?->toArray() ?? []` (`:282`), and PHP encodes an empty
     * array as a JSON `[]`, so a row that disappeared between the UPDATE and the
     * re-read arrives as an empty ARRAY. It is typed as such deliberately, so no
     * caller can read a field off it without narrowing first. The page ignores this
     * payload entirely and re-lists.
     */
    updateProfileSchedule(profileId: string | number, scheduleId: number, name: string, startTime: string, endTime: string, daysOfWeek: string[], isActive: boolean): Promise<{
        schedule: AccessSchedule | never[];
        message: string;
    }>;
    /**
     * `DELETE /api/v1/admin/profiles/{id}/schedules/{scheduleId}` → `{ message }`.
     */
    deleteProfileSchedule(profileId: string | number, scheduleId: number): Promise<{
        message: string;
    }>;
    /**
     * `GET /api/v1/admin/profiles/{id}/tags` → list of profile tags.
     */
    profileTags(profileId: string | number): Promise<ProfileTag[]>;
    /**
     * `POST /api/v1/admin/profiles/{id}/tags` → `{ id, message }`.
     */
    addProfileTag(profileId: string | number, tag: string, tagType: 'blocked' | 'allowed'): Promise<{
        id: number;
        message: string;
    }>;
    /**
     * `DELETE /api/v1/admin/profiles/{id}/tags/{tagId}` → `{ message }`.
     */
    deleteProfileTag(profileId: string | number, tagId: number): Promise<{
        message: string;
    }>;
    /**
     * `GET /api/v1/admin/profiles/{id}/stream-limits` → stream limit settings.
     */
    profileStreamLimits(profileId: string | number): Promise<ProfileStreamLimit>;
    /**
     * `PUT /api/v1/admin/profiles/{id}/stream-limits` → `{ message }`.
     */
    updateProfileStreamLimits(profileId: string | number, maxConcurrentStreams: number, maxTotalBandwidthKbps: number | null): Promise<{
        message: string;
    }>;
}
