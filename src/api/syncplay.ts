/**
 * SyncPlay collaborative playback API client.
 *
 * Provides methods for creating/joining SyncPlay groups, managing sessions,
 * and synchronizing playback state across multiple users.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';
import { ApiError } from './errors';
import { LocalStorageTokenStore } from './tokenStore';
import { readSocketHint } from './socketHint';
import type {
  SyncPlayRoom,
  SyncPlaySession,
  SyncPlayUser,
  SyncPlayStateUpdate,
  SyncPlayPlaybackCommand,
} from '../types/syncplay';
import { SyncPlayClient, serializeMessage } from '@phlix/syncplay';

/** Input for creating a new SyncPlay group. */
export interface CreateRoomInput {
  name: string;
  /**
   * M-UI-14: the group gate. `SyncPlayController::createGroup()` reads
   * `password` off the body and the server stores its SHA-256 hex digest, so
   * a room created here can now BE locked — the claim that motivated its
   * removal in S288 ("no server counterpart") was true of `description`/
   * `isPublic` only; `password` has always had one. The REST rail accepts
   * the PLAINTEXT arm only (there is no `password_hash` parse on this route),
   * and the value rides TLS-or-lan body like the account password on login —
   * never logged, never stored (see the custody law in the store).
   */
  password?: string;
  /**
   * Display name to register the creator under.
   *
   * S285: `SyncPlayController::createGroup()` reads `memberName` off the body and
   * falls back to the literal `'Host'`; nothing ever sent it, so every creator was
   * called "Host" in the member list. Omitted (or empty) keeps the server default.
   *
   * S288: `description` and `isPublic` used to live here too. They had NO server
   * counterpart — `createGroup()` reads only `name`, `password`, `memberId` and
   * `memberName` — so every create silently discarded them. They are gone rather
   * than documented: the type now states exactly what the wire accepts.
   * `has_password` (set via `password`, offered by the modal since M-UI-14) is
   * the only public/private signal the server has.
   */
  memberName?: string;
}

/** Input for joining a SyncPlay group. */
export interface JoinRoomInput {
  groupId: string;
  /**
   * M-UI-14: plaintext gate credential for a password-protected group. The
   * REST join rail accepts the `password` arm only (no `password_hash`
   * parse), and a wrong/missing one on a locked group answers 400
   * `{"error":"Invalid password"}` — see {@link isSyncPlayInvalidPassword}.
   */
  password?: string;
}

/**
 * One group as the server actually puts it on the wire.
 *
 * This is `GroupState::getState()` (phlix-server
 * `src/Session/SyncPlay/GroupState.php`) verbatim — snake_case, `members` as a
 * DICTIONARY keyed by member id — plus the reduced row shape
 * `SyncPlaySnapshotService::listGroups()` emits for the listing (`id`/`name`
 * instead of `group_id`/`group_name`, no `members` at all). Every field is
 * optional because the two shapes overlap only partially and the
 * `getRawSnapshot()` fallback path drops `members` entirely.
 *
 * ⚠ There is no `session` envelope and no camelCase anywhere in the SyncPlay
 * REST contract. Modelling the response as the UI's own `SyncPlaySession` is
 * what made `joinRoom()` read `res.session` (always `undefined`) — so the raw
 * shape is named honestly here and mapped by {@link groupToSession}.
 */
export interface RawSyncPlayGroup {
  group_id?: string;
  group_name?: string;
  /** Listing rows use the short spelling. */
  id?: string;
  name?: string;
  member_count?: number;
  /** Dict keyed by member id from `getState()`; `[]` from the raw-snapshot fallback. */
  members?: Record<string, RawSyncPlayMember> | RawSyncPlayMember[];
  host_id?: string | null;
  has_password?: boolean;
  current_media_id?: string | null;
  current_media_duration?: number;
  playback_position?: number;
  /** `playing` | `paused` | `buffering` | `stopped` (GroupState::STATE_*). */
  playback_state?: string;
  is_playing?: boolean;
  queue?: unknown[];
  /** Unix seconds. */
  created_at?: number;
  /** Unix seconds. */
  last_activity_at?: number;
}

/** One member inside {@link RawSyncPlayGroup.members}. */
export interface RawSyncPlayMember {
  id?: string;
  name?: string;
  is_host?: boolean;
  /** Unix seconds. */
  joined_at?: number;
}

/** `{ group }` — returned by create / get / join. */
export interface SyncPlayGroupResponse {
  group?: RawSyncPlayGroup;
}

/** `{ groups }` — returned by the group listing. */
export interface SyncPlayGroupsResponse {
  groups?: RawSyncPlayGroup[];
}

/**
 * Both views of the group a join returned.
 *
 * The join response is `{ success, group }` and that `group` is the FULL
 * `GroupState::getState()` payload, so it answers both "which room am I in"
 * (`SyncPlayRoom` — the name, the member count, the host) and "what is playing"
 * (`SyncPlaySession`). Returning only the session threw the room half away, and
 * every caller then had a null `currentRoom` after a successful join: leaving,
 * refreshing and the room-name header are all guarded on it.
 */
export interface JoinedGroup {
  room: SyncPlayRoom;
  session: SyncPlaySession;
}

/** Coerce an unknown to a finite number, else `fallback`. */
function num(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return fallback;
}

/**
 * S441 — the protocol boundary's ONE scale decode: wire MILLISECONDS →
 * UI-internal SECONDS.
 *
 * The syncplay wire carries every position in ms (SPEC.md:91; S293 moved both
 * send boundaries to ×1000), while every UI consumer — `session.playbackPosition`,
 * `driftAmount`, `video.currentTime` — is typed in seconds. Inbound frames
 * landed raw, so a host's 300 000 ms re-anchor arrived as 300 000 SECONDS
 * (finish-S293 audit32, sites 1-3). Decoding here, once, keeps every
 * downstream site unit-honest with no math of its own.
 */
function wireMsToSeconds(positionMs: number): number {
  return positionMs / 1000;
}

/** Unix SECONDS (the server's unit) → ISO 8601. */
function isoFromUnixSeconds(seconds: unknown): string {
  const s = num(seconds, 0);
  return new Date((s > 0 ? s : Date.now() / 1000) * 1000).toISOString();
}

/** The group id under either spelling (`group_id` from state, `id` from a listing row). */
function groupId(raw: RawSyncPlayGroup): string {
  return raw.group_id ?? raw.id ?? '';
}

/**
 * Normalize the server's `members` — a dict keyed by member id from
 * `GroupState::getState()`, or `[]` from the raw-snapshot fallback — into the
 * UI's `SyncPlayUser[]`.
 *
 * The server carries no per-member online flag (membership IS presence: a
 * disconnected member is removed from the group), so `isOnline` is `true` for
 * every returned member, and `profileId` has no server counterpart at all.
 */
export function normalizeMembers(raw: RawSyncPlayGroup | undefined): SyncPlayUser[] {
  const members = raw?.members;
  if (!members) return [];
  const list: RawSyncPlayMember[] = Array.isArray(members)
    ? members
    : Object.entries(members).map(([key, value]) => ({ id: key, ...value }));
  return list.map((m) => ({
    id: m.id ?? '',
    name: m.name ?? 'Unknown',
    profileId: 0,
    role: m.is_host === true ? 'owner' : 'contributor',
    isOnline: true,
    lastSeen: isoFromUnixSeconds(m.joined_at),
  }));
}

/** Map `playback_state` onto the UI's session state. */
function sessionState(raw: RawSyncPlayGroup): SyncPlaySession['state'] {
  switch (raw.playback_state) {
    case 'playing':
      return 'playing';
    case 'paused':
      return 'paused';
    // `buffering` and `stopped` are both "not yet in sync" from the UI's side;
    // `ended` is deliberately unused because the server never reports it.
    default:
      return raw.is_playing === true ? 'playing' : 'waiting';
  }
}

/**
 * Map a raw server group onto the UI's `SyncPlayRoom`.
 *
 * `isPublic` is derived from `has_password` (the only public/private signal the
 * server emits, and only on the listing rows); a group state with no password
 * field reads as public, which matches the listing default.
 */
export function normalizeGroup(raw: RawSyncPlayGroup | undefined): SyncPlayRoom {
  const g = raw ?? {};
  const id = groupId(g);
  return {
    id,
    name: g.group_name ?? g.name ?? '',
    isPublic: g.has_password !== true,
    memberCount: num(g.member_count, normalizeMembers(g).length),
    roomId: id,
    hostUserId: g.host_id ?? undefined,
    createdAt: isoFromUnixSeconds(g.created_at),
  };
}

/**
 * Map a raw server group onto the UI's `SyncPlaySession`.
 *
 * The server has no separate session entity — the GROUP is the session — so the
 * session id IS the group id. `playbackRate` has no server field either; a
 * playing group is 1× and anything else is 0, which is what `driftAmount`'s
 * extrapolation needs (a paused group must not extrapolate).
 */
export function groupToSession(raw: RawSyncPlayGroup | undefined): SyncPlaySession {
  const g = raw ?? {};
  const id = groupId(g);
  const state = sessionState(g);
  return {
    id,
    roomId: id,
    serverId: '',
    createdBy: g.host_id ?? '',
    createdAt: isoFromUnixSeconds(g.created_at),
    state,
    currentMediaId: g.current_media_id ?? null,
    playbackPosition: wireMsToSeconds(num(g.playback_position)),
    playbackRate: state === 'playing' ? 1 : 0,
    serverTime: num(g.last_activity_at, Math.floor(Date.now() / 1000)),
    lastSync: isoFromUnixSeconds(g.last_activity_at),
    activeUsers: normalizeMembers(g),
    roles: Object.fromEntries(normalizeMembers(g).map((m) => [m.id, m.role])),
    permissions: {},
  };
}

/**
 * SyncPlay API client for collaborative playback sessions.
 *
 * Hits the server's SyncPlay endpoints — and ONLY these, which are the exact
 * five `SyncPlayController` routes registered in phlix-server
 * `src/Server/Core/Application.php`:
 *   - GET  /api/v1/syncplay/groups — list all groups
 *   - POST /api/v1/syncplay/groups — create a group
 *   - GET  /api/v1/syncplay/groups/{id} — get group state (INCLUDING members)
 *   - POST /api/v1/syncplay/groups/{id}/join — join a group
 *   - POST /api/v1/syncplay/groups/{id}/leave — leave a group
 *
 * ⚠ `GET /api/v1/syncplay/groups/{id}/members` does NOT exist and never did —
 * there is no controller action and no wildcard that could absorb it. Because
 * `ApiClient` throws on any non-ok response, calling it made every join fail
 * before it started (S276). The member list comes from the group state.
 *
 * ⚠ This class carries NO playback-transport methods, deliberately. It used to
 * expose `sendStateUpdate()` and `sendCommand()` as `async` bodies that did
 * nothing at all and resolved — a caller could not tell "sent" from "discarded",
 * which is the worst shape a stub can take. There is no REST route to wire them
 * to (the manifest above is the whole SyncPlay HTTP surface), and inventing one
 * is exactly the S276 defect, so they were REMOVED rather than kept (S285).
 * Playback transport is the WebSocket's job and is already implemented for real
 * by the module-level {@link sendSyncPlayCommand} / {@link sendSyncPlayStateUpdate},
 * which emit @phlix/syncplay frames on the `:8097` socket.
 */
export class SyncPlayApi {
  private client: ApiClient;

  constructor(apiBase: string) {
    this.client = new ApiClient({
      baseUrl: apiBase,
      tokenStore: typeof window !== 'undefined' ? new LocalStorageTokenStore() : undefined,
    });
  }

  /**
   * Create a new SyncPlay group.
   * POST /api/v1/syncplay/groups
   *
   * `input` is forwarded verbatim and now matches what the endpoint accepts:
   * `SyncPlayController::createGroup()` reads `name`, `password`, `memberId` and
   * `memberName` off the body, and {@link CreateRoomInput} offers
   * `name`/`password`/`memberName` (S288 removed the fields the server threw
   * away; M-UI-14 offers the `password` the server always read).
   */
  async createRoom(input: CreateRoomInput): Promise<SyncPlayRoom> {
    const res = await this.client.post<SyncPlayGroupResponse>('/api/v1/syncplay/groups', input);
    return normalizeGroup(res.group);
  }

  /**
   * Join an existing SyncPlay group.
   * POST /api/v1/syncplay/groups/:id/join
   *
   * The server answers `{ success, group }` (the post-join group state), NOT a
   * `session` envelope — the group IS the session.
   *
   * Returns BOTH views of that one payload; see {@link JoinedGroup}.
   *
   * @param groupId    The group to join.
   * @param memberName Display name to join under. `SyncPlayController::joinGroup()`
   *   reads `memberName` from the body and falls back to the literal `'Guest'`, so
   *   omitting it is what made every member render as an anonymous placeholder
   *   (S285). The joined member appears under this name in the `group.members`
   *   dictionary the same response carries back.
   * @param password   M-UI-14: plaintext gate credential. A group with
   *   `has_password` refuses the join (400 `{"error":"Invalid password"}`)
   *   unless the body carries the matching `password`; the server hashes it
   *   and compares digests. An already-a-member re-join bypasses the gate.
   */
  async joinRoom(groupId: string, memberName?: string, password?: string): Promise<JoinedGroup> {
    const body: { memberName?: string; password?: string } = {};
    if (memberName !== undefined && memberName !== '') body.memberName = memberName;
    if (password !== undefined && password !== '') body.password = password;
    const res = await this.client.post<SyncPlayGroupResponse>(
      `/api/v1/syncplay/groups/${encodeURIComponent(groupId)}/join`,
      Object.keys(body).length > 0 ? body : undefined,
    );
    return { room: normalizeGroup(res.group), session: groupToSession(res.group) };
  }

  /**
   * Leave the current SyncPlay group.
   * POST /api/v1/syncplay/groups/:id/leave
   */
  async leaveRoom(groupId: string): Promise<void> {
    await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(groupId)}/leave`);
  }

  /**
   * Get the current session state.
   * GET /api/v1/syncplay/groups/:id
   */
  async getState(groupId: string): Promise<SyncPlaySession> {
    const res = await this.client.get<SyncPlayGroupResponse>(
      `/api/v1/syncplay/groups/${encodeURIComponent(groupId)}`,
    );
    return groupToSession(res.group);
  }

  /**
   * Get the list of members in a group.
   * GET /api/v1/syncplay/groups/:id
   *
   * ⚠ Reads the SAME served route as {@link getState}. There is no
   * `/groups/{id}/members` endpoint; the members dictionary is a field of the
   * group state (`GroupState::getState()['members']`), so that is where the
   * list is read from.
   */
  async getMembers(groupId: string): Promise<SyncPlayUser[]> {
    const res = await this.client.get<SyncPlayGroupResponse>(
      `/api/v1/syncplay/groups/${encodeURIComponent(groupId)}`,
    );
    return normalizeMembers(res.group);
  }

  /**
   * List all available groups.
   * GET /api/v1/syncplay/groups
   */
  async listGroups(): Promise<SyncPlayRoom[]> {
    const res = await this.client.get<SyncPlayGroupsResponse>('/api/v1/syncplay/groups');
    return Array.isArray(res.groups) ? res.groups.map(normalizeGroup) : [];
  }

  /**
   * List the rooms a user can join WITHOUT A CREDENTIAL: those the server
   * reports as password-free.
   * GET /api/v1/syncplay/groups, filtered client-side.
   *
   * S288 introduced this filter when the modal had no password prompt — at
   * the time a password-protected room listed here really could never be
   * joined from there, so hiding it was honesty, not a filter the server
   * owes us. M-UI-14 gave the modal a prompt, so the MODAL now lists the
   * unfiltered {@link listGroups} and marks locked rows instead. This method
   * stays exported: it remains the truthful answer to "rooms I can enter
   * right now", and its `isPublic: !has_password` basis is the authoritative
   * snapshot signal (`SyncPlaySnapshotService::listGroups()`), unchanged.
   */
  async listPublicRooms(): Promise<SyncPlayRoom[]> {
    const rooms = await this.listGroups();
    return rooms.filter((room) => room.isPublic);
  }
}

/**
 * Does this thrown error mean "the REST join was refused because the group
 * is password-locked and the credential was absent or wrong"?
 *
 * M-UI-14's classification seam, shaped exactly like the estate precedent
 * `isTmdbUnconfigured` (client.ts): the caller never re-parses wire JSON and
 * never renders a server string — the REST join rail answers gate refusals
 * with 400 `{"error":"Invalid password"}` (`SyncPlayController::joinGroup()`
 * passing `SyncPlayManager`'s message; NO `code` field on the REST rail, so
 * classification is status + the fixed refusal string, and the localized
 * copy comes from `src/i18n/errors.ts`'s registered
 * `syncplay.invalid_password`, never from the body).
 */
export function isSyncPlayInvalidPassword(e: unknown): boolean {
  if (!(e instanceof ApiError) || e.status !== 400) return false;
  const body: unknown = e.body;
  return (
    body !== null &&
    typeof body === 'object' &&
    (body as { error?: unknown }).error === 'Invalid password'
  );
}

/** Singleton instance for app-wide use. */
let syncPlayApiInstance: SyncPlayApi | null = null;

/** The base the current singleton was built for — a later, different base
 *  (server switch without a reload) must re-create it, not be ignored. */
let syncPlayApiBase: string | null = null;

export function getSyncPlayApi(apiBase: string): SyncPlayApi {
  if (!syncPlayApiInstance || syncPlayApiBase !== apiBase) {
    syncPlayApiInstance = new SyncPlayApi(apiBase);
    syncPlayApiBase = apiBase;
  }
  return syncPlayApiInstance;
}

// ── P8: SyncPlay WebSocket connection using @phlix/syncplay ───────────────────

/**
 * R12-07 — the socket's lifecycle voice. This module ships inside a library
 * consumed by hosts (server SPA, hub SPA, Tizen widget, Electron shell) whose
 * consoles are not ours to spam, so every lifecycle line routes through an
 * INJECTABLE logger — same options/callback pattern as `onMessage` above.
 * The default is silent: a host that wants the play-by-play calls
 * {@link setSyncPlayLogger} (its own console included, via
 * `setSyncPlayLogger(console)`).
 */
export interface SyncPlayLogger {
  log(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

const NOOP_LOGGER: SyncPlayLogger = { log: () => {}, warn: () => {}, error: () => {} };

let syncPlayLogger: SyncPlayLogger = NOOP_LOGGER;

/** Install (or, with `null`/`undefined`, remove) the lifecycle logger. */
export function setSyncPlayLogger(logger: SyncPlayLogger | null | undefined): void {
  syncPlayLogger = logger ?? NOOP_LOGGER;
}

/**
 * M-UI-12 — the socket's REJECTION voice.
 *
 * The server answers a refused command (or any wire-level failure) with a
 * `syncplay_error` frame — SPEC.md:306: `error_code` first, `code` second,
 * plus English debug `message`. The vendored `@phlix/syncplay` client already
 * parses that frame and hands it to its `onError(code, message)` option; until
 * M-UI-12 the only thing this module did with it was write the lifecycle
 * logger (silent by default, R12-07) — so a command the GROUP REFUSED was as
 * invisible as one that never left the device.
 *
 * Same injectable-slot shape as {@link setSyncPlayLogger} on purpose: the
 * module has no business knowing what a toast is. The consumer that owns a
 * user surface (`SyncPlayControls.vue`) installs a listener for as long as it
 * lives and removes it on teardown; with no listener installed the behavior
 * is exactly the old one (log-only), so no host regresses.
 */
export type SyncPlayWireErrorListener = (code: string, message: string) => void;

let syncPlayWireErrorListener: SyncPlayWireErrorListener | null = null;

/** Install (or, with `null`, remove) the `syncplay_error` consumer. */
export function setSyncPlayWireErrorListener(listener: SyncPlayWireErrorListener | null): void {
  syncPlayWireErrorListener = listener;
}

/** Active WebSocket connection for SyncPlay real-time sync. */
let syncPlayWs: WebSocket | null = null;

/** Current room ID for the active connection. */
let syncPlayRoomId: string | null = null;

/** Reconnect attempt count for exponential backoff. */
let syncPlayReconnectAttempts = 0;

/** Maximum reconnect attempts before giving up. */
const MAX_RECONNECT_ATTEMPTS = 5;

/** Base delay in ms for exponential backoff. */
const RECONNECT_BASE_DELAY_MS = 1000;

/** @phlix/syncplay SyncPlayClient instance for protocol handling. */
let syncPlayClient: SyncPlayClient | null = null;

/**
 * This browsing context's SyncPlay member id.
 *
 * ⚠ Deliberately NOT cleared by {@link closeSyncPlayConnection} — it is a TAB
 * identity, not a session one. Nothing in the app ever supplies a member id
 * (`useSyncPlayStore.joinRoom()` calls `openSyncPlayConnection(roomId, handler)`
 * with two arguments), so this only ever holds the `member_<ms>_<rand>` value
 * generated below, derived from no account and no session. Clearing it on close
 * would mint a fresh id on every leave-and-rejoin and the server would count the
 * returning user as a new member; keeping it is what makes a reconnect look like
 * the same member coming back. Pinned by `syncplay.ws.test.ts` — "REUSES the
 * remembered member id on a later call that omits one".
 */
let syncPlayMemberId: string | null = null;

/**
 * This browsing context's SyncPlay display name. Same lifetime as
 * {@link syncPlayMemberId}.
 *
 * S285: `useSyncPlayStore.joinRoom()` now supplies the signed-in account's
 * display name here, so the `member_name` field of the `GROUP_JOIN` frame
 * @phlix/syncplay puts on the wire carries a real name. Until then no caller
 * passed one and the `'Anonymous'` fallback below always won — every member in
 * the room rendered as an identical placeholder. The fallback is retained for
 * the genuinely signed-out case.
 */
let syncPlayMemberName: string | null = null;

/**
 * This browsing context's SyncPlay group-gate credential (M-UI-14): the
 * SPEC §4 `password_hash` — UNSALTED SHA-256 lowercase hex of the room
 * password, never the plaintext, which exists only inside the modal's form
 * ref for the milliseconds before the store digests it.
 *
 * Lifetime is SESSION-scoped, the opposite of {@link syncPlayMemberId}'s TAB
 * scope: it authenticates an intent to be in ONE room, so
 * `openSyncPlayConnection` overwrites it per caller intent (an omitted
 * argument means "this join carries no credential" — `null`, not "keep the
 * last room's"), {@link closeSyncPlayConnection} clears it, and the reconnect
 * ladder alone (which never re-enters the public entry point — S283) reuses
 * the stored digest so a blip does not demote the member to a locked-out
 * stranger who must retype. It is never persisted: not localStorage, not the
 * store, not a log line, not a URL.
 */
let syncPlayPasswordHash: string | null = null;

/** Callback invoked when the server sends a SyncPlay message over the WebSocket. */
type SyncPlayMessageHandler = (msg: { type: string; position?: number; roomId?: string }) => void;

/** Message handler registered by the consumer (useSyncPlayStore). */
let messageHandler: SyncPlayMessageHandler | null = null;

/**
 * Get the JWT token for WebSocket authentication.
 * Returns null if no token is available (e.g., SSR context).
 */
function getWsToken(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    const store = new LocalStorageTokenStore();
    return store.getAccessToken();
  } catch {
    return null;
  }
}

/**
 * Build the WebSocket URL for SyncPlay — CREDENTIAL-FREE by construction.
 * Connects to port 8097 on the current host; the JWT does NOT ride this URL
 * (estate policy `WEBSOCKET_URL_QUERY_REFUSED`). The credential travels in the
 * two-entry bearer subprotocol built by {@link buildWsProtocols} — or, signed
 * out, no subprotocol is offered at all (that function returns `undefined`;
 * the WHATWG constructor throws on an empty protocol entry) — the carrier
 * law phlix-server `424c14d0` shipped for `:8097` as a transitional
 * dual-carrier (`SyncPlayAuthMiddleware::resolveHandshakeToken()` is the SSOT;
 * server-side doc: phlix-server `docs/dev/WEBSOCKET_AUTH_CARRIERS.md`).
 * A client that offers `bearer` and passes the gate gets exactly
 * `Sec-WebSocket-Protocol: bearer` back on the 101 — the marker only, never the
 * token. That echo is what makes the flip safe in a browser: a socket offered
 * subprotocols and answered with none fails outright (measured 1006), which is
 * why this client waited on the server rather than flipping earlier.
 *
 * The TODO that lived here is retired: the server-side dependency it named is
 * met at 424c14d0 (hub `:8804` ships the identical law — S237 extraction,
 * S355 echo).
 *
 * `room` stays in the URL as a NON-credential query param: the server never
 * reads it (the `:8097` worker ignores the request path and query apart from
 * the transitional `token`, and the room is carried on the wire by the
 * `syncplay_group_join` frame — see `syncPlayClient.joinGroup` in
 * {@link connectSyncPlaySocket}'s `onopen`). It is kept for byte-compatibility
 * of the dial shape the surrounding tests and access-log forensics already
 * know.
 *
 * R12-02 — operator seam: a valid `__PHLIX__.wsUrl` (+ optional `wsPath`)
 * overrides the host:port wholesale; absent/null/invalid ⇒ the legacy
 * same-origin `:8097` derivation ships unchanged (see `./socketHint.ts` for
 * the grammar and the per-shell contract). The hint is per PAGE: on a hub
 * shell it describes the hub RELAY socket — hub operators setting
 * `HUB_WS_URL` while serving watch-parties from the page host's own `:8097`
 * should account for both dials consuming the hint (logged as a coordination
 * item in the lane report).
 *
 * HTTPS without a seam: the derivation below escalates `https:` pages to
 * `wss://host:8097`. Against a plaintext-only listener the browser reports
 * the refused handshake as close-code 1006 and the ladder retries — the
 * failure surfaces through `onStatusChange`/`onDisconnect` and, when a host
 * installs one, {@link setSyncPlayLogger}; this module never writes the host
 * console by default (R12-07).
 */
function buildWsUrl(roomId: string): string {
  const hint = readSocketHint();
  if (hint.wsUrl !== null) {
    return `${hint.wsUrl}${hint.wsPath ?? ''}?room=${encodeURIComponent(roomId)}`;
  }
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${hostname}:8097?room=${encodeURIComponent(roomId)}`;
}

/**
 * The `protocols` argument for the `:8097` handshake — the bearer carrier.
 *
 * TWO-ENTRY form `['bearer', <jwt>]` (scheme marker + separate credential
 * entry), which the browser serializes as `Sec-WebSocket-Protocol: bearer,
 * <jwt>`. It is NOT the single dotted `['bearer.<jwt>']` shape. Mirrors the
 * shipped hub-relay carrier (`hubRelay.ts:233`) exactly — one estate law, one
 * wire vocabulary (phlix-server 424c14d0 `SyncPlayAuthMiddleware::
 * BEARER_SUBPROTOCOL` / phlix-hub S237 `SyncPlayRelayWorker`).
 *
 * With no stored token this returns `undefined` — NO protocols argument at
 * all — never a `['bearer', '']` shape. The earlier formulation rested on a
 * false reading of the platform: the WHATWG constructor does NOT drop empty
 * protocol entries, it THROWS `SyntaxError` when any entry is the empty
 * string, a duplicate, or outside the RFC 6455 `token` production (spec §3.1
 * step 9, verified against Chrome 153 and undici). An unguarded throw from
 * inside the ladder's `setTimeout` killed reconnection outright — no socket
 * object ever exists, so no `onclose` fires to arm the next rung — and broke
 * the signed-out join mid-adoption.
 *
 * The no-argument dial offers no subprotocol header at all; the server reads
 * `carrier absent` — rejected pre-101 under the secret-configured law, allowed
 * anonymously under the dev (no-secret) law. Identical server consequence to
 * the legacy empty `?token=` value, and identical to what the dropped-empty-
 * entry myth believed the `['bearer','']` offer achieved.
 */
function buildWsProtocols(): string[] | undefined {
  const token = getWsToken();
  return token ? ['bearer', token] : undefined;
}

/**
 * Handle an incoming WebSocket message from the server.
 * Uses @phlix/syncplay decodeMessage for proper protocol handling.
 */
function handleWsMessage(event: MessageEvent): void {
  if (!syncPlayClient) return;
  try {
    const raw = JSON.parse(event.data as string);
    syncPlayClient.handleIncoming(raw);
  } catch {
    /* malformed JSON — ignore */
  }
}

/**
 * Handle WebSocket close event with exponential backoff reconnect.
 *
 * Guarded by socket identity (`hubRelay.ts` house pattern): a close delivered by
 * a socket we have already replaced — the room-switch path in
 * {@link connectSyncPlaySocket} — must not null the NEW `syncPlayWs`, fire
 * `onDisconnect()` for it, or arm a duplicate reconnect ladder. The event arg is
 * optional so synthetic no-arg closes (tests, manual teardown) keep working: with
 * no event there is nothing to identity-check.
 */
function handleWsClose(event?: { target?: unknown }): void {
  if (event && event.target !== syncPlayWs) return;
  syncPlayWs = null;
  if (syncPlayClient) {
    syncPlayClient.onDisconnect();
  }
  if (syncPlayRoomId && syncPlayReconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    const delay = RECONNECT_BASE_DELAY_MS * Math.pow(2, syncPlayReconnectAttempts);
    syncPlayReconnectAttempts++;
    syncPlayLogger.log(`[SyncPlay] WebSocket closed, reconnecting in ${delay}ms (attempt ${syncPlayReconnectAttempts})`);
    setTimeout(() => {
      // ⚠ S283: this MUST NOT re-enter `openSyncPlayConnection()`. That is the
      // caller-initiated entry point and it clears the backoff budget, so
      // routing the reconnect through it zeroed the counter this delay is
      // computed from — the ladder measured a flat 1000 ms on every rung and
      // the give-up branch below was unreachable.
      if (syncPlayRoomId) connectSyncPlaySocket(syncPlayRoomId);
    }, delay);
  } else if (syncPlayReconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    syncPlayLogger.warn('[SyncPlay] Max reconnect attempts reached, giving up');
    syncPlayRoomId = null;
    syncPlayReconnectAttempts = 0;
    syncPlayClient = null;
  }
}

/**
 * Open a WebSocket connection to the SyncPlay server for the given room.
 * If a connection is already open for a different room, it is closed first.
 *
 * This is the CALLER-INITIATED entry point — a user joining, re-joining or
 * switching rooms — and it therefore starts a fresh reconnect budget. The
 * automatic reconnect deliberately does not come through here; see
 * {@link connectSyncPlaySocket}.
 *
 * @param roomId - The SyncPlay room/group ID to connect to.
 * @param onMessage - Callback invoked for each server-to-client SyncPlay message.
 * @param memberId - The member ID for this client.
 * @param memberName - The member name for this client.
 * @param passwordHash - M-UI-14: SPEC §4 `password_hash` digest for a locked
 *   group, or `undefined` for an unlocked one. An explicit `undefined` here
 *   RESETS the stored credential (new intent wins); the reconnect ladder
 *   reuses whatever it holds without coming through this door.
 */
export function openSyncPlayConnection(
  roomId: string,
  onMessage?: SyncPlayMessageHandler,
  memberId?: string,
  memberName?: string,
  passwordHash?: string,
): void {
  // A caller-initiated connect is a new intent, so it gets the full ladder
  // again. This is one of THREE distinct events that were all previously
  // collapsed onto a single reset: "a caller asked to connect" (here), "the
  // connection actually came up" (`onopen`, below) and "a reconnect attempt is
  // starting" — which must NOT reset, and did (S283).
  syncPlayReconnectAttempts = 0;
  // M-UI-14: same "new intent" law for the gate credential — this assignment,
  // not a parameter, is what every `joinGroup` below reads, so a room switch
  // can never carry the previous room's digest forward.
  syncPlayPasswordHash = passwordHash ?? null;
  connectSyncPlaySocket(roomId, onMessage, memberId, memberName);
}

/**
 * Build the socket for `roomId` without touching the reconnect budget.
 *
 * Shared by {@link openSyncPlayConnection} and by the reconnect timer in
 * `handleWsClose()`. Splitting the two is the whole of the S283 fix: the timer
 * needs everything this function does and none of the budget reset its caller
 * does, because `syncPlayReconnectAttempts` is the input to the very delay that
 * scheduled it.
 */
function connectSyncPlaySocket(
  roomId: string,
  onMessage?: SyncPlayMessageHandler,
  memberId?: string,
  memberName?: string,
): void {
  // Register or update the message handler.
  if (onMessage) messageHandler = onMessage;

  // Close any existing connection that was for a different room. Detach its
  // handlers BEFORE closing: the close event of the OLD socket would otherwise
  // land in the shared `handleWsClose`, null the socket we are about to build,
  // fire onDisconnect for it and arm a duplicate reconnect ladder.
  if (syncPlayWs && syncPlayRoomId !== roomId) {
    const stale = syncPlayWs;
    stale.onopen = null;
    stale.onmessage = null;
    stale.onclose = null;
    stale.onerror = null;
    stale.close();
    syncPlayWs = null;
    syncPlayRoomId = null;
    syncPlayClient = null;
  }

  // If already connected to this room, nothing to do.
  if (syncPlayWs && syncPlayRoomId === roomId) return;

  syncPlayRoomId = roomId;

  // Generate member ID if not provided
  const mid = memberId ?? syncPlayMemberId ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const mname = memberName ?? syncPlayMemberName ?? 'Anonymous';
  syncPlayMemberId = mid;
  syncPlayMemberName = mname;

  // Create SyncPlayClient with proper protocol handling
  syncPlayClient = new SyncPlayClient({
    send: (message) => {
      if (syncPlayWs && syncPlayWs.readyState === WebSocket.OPEN) {
        syncPlayWs.send(serializeMessage(message));
      }
    },
    now: () => Date.now(),
    memberId: mid,
    memberName: mname,
    onPlaybackCommand: (command) => {
      if (!messageHandler) return;
      // Convert to the format expected by useSyncPlayStore — the wire's ms
      // position becomes the store's seconds HERE, at the boundary (S441).
      messageHandler({
        type: command.type,
        position: wireMsToSeconds(command.position),
        roomId: syncPlayRoomId ?? undefined,
      });
    },
    onPlaybackSync: (memberId, position, isPlaying, serverTime) => {
      if (!messageHandler) return;
      messageHandler({
        type: isPlaying ? 'play' : 'pause',
        position: wireMsToSeconds(position),
        roomId: syncPlayRoomId ?? undefined,
      });
      void memberId;
      void serverTime;
    },
    onDisconnect: () => {
      /* handled by handleWsClose */
    },
    onError: (code, message) => {
      syncPlayLogger.error(`[SyncPlay] Error: ${code} - ${message}`);
      // M-UI-12: the server's refusal must reach the user surface, not just
      // the (host-silent by default) lifecycle log.
      syncPlayWireErrorListener?.(code, message);
    },
    onInfo: (message) => {
      syncPlayLogger.log(`[SyncPlay] Info: ${message}`);
    },
  });

  const url = buildWsUrl(roomId);
  syncPlayLogger.log(`[SyncPlay] Opening WebSocket to ${url}`);
  // The second argument may be `undefined` (signed out): WebIDL optional-
  // argument semantics make an explicitly-passed `undefined` identical to
  // OMITTING the argument — no `Sec-WebSocket-Protocol` header is offered and
  // the constructor cannot throw on the offer. A token whose value falls
  // outside the RFC 6455 `token` production (corrupt storage can hand us
  // anything) still throws `SyntaxError` synchronously here, before any socket
  // exists — so, exactly like `hubRelay.ts:229-237`, the construction is
  // guarded and the failure routed into the reconnect ladder. Without the
  // guard the throw escapes into the ladder's `setTimeout` callback (or into
  // the caller's join), killing the chain with no `onclose` ever armed.
  let socket: WebSocket;
  try {
    socket = new WebSocket(url, buildWsProtocols());
  } catch (error) {
    syncPlayLogger.error('[SyncPlay] WebSocket constructor refused the handshake', error);
    // Reuse the close path wholesale: it tears down the fresh client, then —
    // room still set, budget intact — arms the next rung. Calling with no
    // event skips the socket-identity guard, which is correct: no socket was
    // ever born to compare against.
    handleWsClose();
    return;
  }
  syncPlayWs = socket;

  socket.onopen = () => {
    syncPlayLogger.log('[SyncPlay] WebSocket connected');
    // The connection actually came up — THIS is the event that clears the
    // backoff budget, so a server that recovers on rung three does not carry
    // its three used rungs into the next outage.
    syncPlayReconnectAttempts = 0;
    // Re-join the group after reconnect
    if (syncPlayClient && syncPlayRoomId) {
      // M-UI-14: a locked group refuses an uncredentialed join, so the digest
      // the caller supplied at connect time rides every `GROUP_JOIN` — the
      // first one and every reconnect rung's. `null` (unlocked or explicitly
      // credential-less) keeps the payload free of the field entirely:
      // `SyncPlayClient.joinGroup` omits `password_hash` when the argument is
      // `undefined`, and the server's gate parser must never see an empty
      // string it would read as a set-but-wrong gate.
      syncPlayClient.joinGroup(syncPlayRoomId, syncPlayPasswordHash ?? undefined);
    }
  };

  socket.onmessage = handleWsMessage;

  socket.onclose = handleWsClose;

  socket.onerror = (err) => {
    syncPlayLogger.error('[SyncPlay] WebSocket error', err);
  };
}

/**
 * Close the current SyncPlay WebSocket connection.
 */
export function closeSyncPlayConnection(): void {
  if (syncPlayWs) {
    // Detach first — an intentional close must not schedule a reconnect when the
    // close event arrives (or after this module's state is already reset).
    const closing = syncPlayWs;
    closing.onopen = null;
    closing.onmessage = null;
    closing.onclose = null;
    closing.onerror = null;
    closing.close();
    syncPlayWs = null;
  }
  if (syncPlayClient) {
    syncPlayClient.leaveGroup();
    syncPlayClient.onDisconnect();
    syncPlayClient = null;
  }
  syncPlayRoomId = null;
  syncPlayReconnectAttempts = 0;
  // M-UI-14: an explicit close ends the credential's session scope — it is
  // room-intent state, not tab identity (contrast {@link syncPlayMemberId},
  // which deliberately survives this exact line).
  syncPlayPasswordHash = null;
}

/**
 * Send a playback state update over the SyncPlay WebSocket using @phlix/syncplay protocol.
 * No-op if the WebSocket is not connected.
 *
 * @param state - The current playback state to broadcast to other room members.
 */
export function sendSyncPlayStateUpdate(state: SyncPlayStateUpdate): void {
  if (!syncPlayClient || !syncPlayWs || syncPlayWs.readyState !== WebSocket.OPEN) return;
  syncPlayClient.reportPosition(state.playbackPosition, state.playbackRate > 0);
}

/**
 * Send a playback command (play/pause/seek/sync) over the SyncPlay WebSocket
 * using @phlix/syncplay protocol.
 *
 * M-UI-12 — this function used to be a silent `void`: every not-ready guard
 * just `return`ed and the caller could not tell a delivered command from a
 * dropped one. It now REPORTS delivery honestly:
 *
 * - `false` — no frame reached the wire (no client, no socket, socket not
 *   OPEN, or a seek/sync with no position to put in the frame). The exact
 *   conditions the old guards covered, unchanged behavior, now observable.
 * - `true` — the protocol client handed a serialized frame to an OPEN socket.
 *   A `WebSocket.send()` that THROWS (the `InvalidStateError` race) still
 *   propagates to the caller — an exception in flight outranks a return
 *   value. `true` is "on the wire", NOT "the group accepted it": acceptance
 *   is answered asynchronously by the server's own broadcasts or a
 *   `syncplay_error` frame, surfaced via {@link setSyncPlayWireErrorListener}.
 *
 * @param command - The playback command to broadcast to other room members.
 */
export function sendSyncPlayCommand(command: SyncPlayPlaybackCommand): boolean {
  if (!syncPlayClient || !syncPlayWs || syncPlayWs.readyState !== WebSocket.OPEN) return false;

  switch (command.type) {
    case 'play':
      syncPlayClient.sendPlay(command.position ?? 0);
      return true;
    case 'pause':
      syncPlayClient.sendPause(command.position ?? 0);
      return true;
    case 'seek':
      if (command.position !== undefined) {
        const fromPos = 0; // We don't track from position, use 0
        syncPlayClient.sendSeek(fromPos, command.position);
        return true;
      }
      return false;
    case 'sync':
      // Full sync - send current position
      if (command.position !== undefined) {
        syncPlayClient.reportPosition(command.position, true);
        return true;
      }
      return false;
  }
}
