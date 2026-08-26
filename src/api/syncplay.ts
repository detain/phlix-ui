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
import { LocalStorageTokenStore } from './tokenStore';
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
  description?: string;
  isPublic: boolean;
  /**
   * Display name to register the creator under.
   *
   * S285: `SyncPlayController::createGroup()` reads `memberName` off the body and
   * falls back to the literal `'Host'`; nothing ever sent it, so every creator was
   * called "Host" in the member list. Omitted (or empty) keeps the server default.
   *
   * ⚠ `description` and `isPublic` have NO server counterpart — `createGroup()`
   * reads only `name`, `password`, `memberId` and `memberName`. They are kept
   * because they are part of the modal's form model, but they are discarded on
   * arrival; `has_password` is the only public/private signal the server has.
   */
  memberName?: string;
}

/** Input for joining a SyncPlay group. */
export interface JoinRoomInput {
  groupId: string;
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
    playbackPosition: num(g.playback_position),
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
   * `input` is forwarded verbatim; the server picks `name`, `password`,
   * `memberId` and `memberName` out of it and ignores the rest (see
   * {@link CreateRoomInput}).
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
   */
  async joinRoom(groupId: string, memberName?: string): Promise<JoinedGroup> {
    const body = memberName !== undefined && memberName !== '' ? { memberName } : undefined;
    const res = await this.client.post<SyncPlayGroupResponse>(
      `/api/v1/syncplay/groups/${encodeURIComponent(groupId)}/join`,
      body,
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
   * List public rooms available to join.
   * GET /api/v1/syncplay/groups
   * @deprecated Use listGroups() - the server does not distinguish public/private via endpoint
   */
  async listPublicRooms(): Promise<SyncPlayRoom[]> {
    return this.listGroups();
  }
}

/** Singleton instance for app-wide use. */
let syncPlayApiInstance: SyncPlayApi | null = null;

export function getSyncPlayApi(apiBase: string): SyncPlayApi {
  if (!syncPlayApiInstance) {
    syncPlayApiInstance = new SyncPlayApi(apiBase);
  }
  return syncPlayApiInstance;
}

// ── P8: SyncPlay WebSocket connection using @phlix/syncplay ───────────────────
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
 * Build the WebSocket URL for SyncPlay.
 * Connects to port 8097 on the current host with the JWT token as a query param.
 */
function buildWsUrl(roomId: string): string {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const token = getWsToken() ?? '';
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${hostname}:8097?token=${encodeURIComponent(token)}&room=${encodeURIComponent(roomId)}`;
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
 */
function handleWsClose(): void {
  syncPlayWs = null;
  if (syncPlayClient) {
    syncPlayClient.onDisconnect();
  }
  if (syncPlayRoomId && syncPlayReconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    const delay = RECONNECT_BASE_DELAY_MS * Math.pow(2, syncPlayReconnectAttempts);
    syncPlayReconnectAttempts++;
    console.log(`[SyncPlay] WebSocket closed, reconnecting in ${delay}ms (attempt ${syncPlayReconnectAttempts})`);
    setTimeout(() => {
      // ⚠ S283: this MUST NOT re-enter `openSyncPlayConnection()`. That is the
      // caller-initiated entry point and it clears the backoff budget, so
      // routing the reconnect through it zeroed the counter this delay is
      // computed from — the ladder measured a flat 1000 ms on every rung and
      // the give-up branch below was unreachable.
      if (syncPlayRoomId) connectSyncPlaySocket(syncPlayRoomId);
    }, delay);
  } else if (syncPlayReconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.warn('[SyncPlay] Max reconnect attempts reached, giving up');
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
 */
export function openSyncPlayConnection(
  roomId: string,
  onMessage?: SyncPlayMessageHandler,
  memberId?: string,
  memberName?: string,
): void {
  // A caller-initiated connect is a new intent, so it gets the full ladder
  // again. This is one of THREE distinct events that were all previously
  // collapsed onto a single reset: "a caller asked to connect" (here), "the
  // connection actually came up" (`onopen`, below) and "a reconnect attempt is
  // starting" — which must NOT reset, and did (S283).
  syncPlayReconnectAttempts = 0;
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

  // Close any existing connection that was for a different room.
  if (syncPlayWs && syncPlayRoomId !== roomId) {
    syncPlayWs.close();
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
      // Convert to the format expected by useSyncPlayStore
      messageHandler({
        type: command.type,
        position: command.position,
        roomId: syncPlayRoomId ?? undefined,
      });
    },
    onPlaybackSync: (memberId, position, isPlaying, serverTime) => {
      if (!messageHandler) return;
      messageHandler({
        type: isPlaying ? 'play' : 'pause',
        position,
        roomId: syncPlayRoomId ?? undefined,
      });
      void memberId;
      void serverTime;
    },
    onDisconnect: () => {
      /* handled by handleWsClose */
    },
    onError: (code, message) => {
      console.error(`[SyncPlay] Error: ${code} - ${message}`);
    },
    onInfo: (message) => {
      console.log(`[SyncPlay] Info: ${message}`);
    },
  });

  const url = buildWsUrl(roomId);
  console.log(`[SyncPlay] Opening WebSocket to ${url}`);
  syncPlayWs = new WebSocket(url);

  syncPlayWs.onopen = () => {
    console.log('[SyncPlay] WebSocket connected');
    // The connection actually came up — THIS is the event that clears the
    // backoff budget, so a server that recovers on rung three does not carry
    // its three used rungs into the next outage.
    syncPlayReconnectAttempts = 0;
    // Re-join the group after reconnect
    if (syncPlayClient && syncPlayRoomId) {
      syncPlayClient.joinGroup(syncPlayRoomId);
    }
  };

  syncPlayWs.onmessage = handleWsMessage;

  syncPlayWs.onclose = handleWsClose;

  syncPlayWs.onerror = (err) => {
    console.error('[SyncPlay] WebSocket error', err);
  };
}

/**
 * Close the current SyncPlay WebSocket connection.
 */
export function closeSyncPlayConnection(): void {
  if (syncPlayWs) {
    syncPlayWs.close();
    syncPlayWs = null;
  }
  if (syncPlayClient) {
    syncPlayClient.leaveGroup();
    syncPlayClient.onDisconnect();
    syncPlayClient = null;
  }
  syncPlayRoomId = null;
  syncPlayReconnectAttempts = 0;
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
 * No-op if the WebSocket is not connected.
 *
 * @param command - The playback command to broadcast to other room members.
 */
export function sendSyncPlayCommand(command: SyncPlayPlaybackCommand): void {
  if (!syncPlayClient || !syncPlayWs || syncPlayWs.readyState !== WebSocket.OPEN) return;

  switch (command.type) {
    case 'play':
      syncPlayClient.sendPlay(command.position ?? 0);
      break;
    case 'pause':
      syncPlayClient.sendPause(command.position ?? 0);
      break;
    case 'seek':
      if (command.position !== undefined) {
        const fromPos = 0; // We don't track from position, use 0
        syncPlayClient.sendSeek(fromPos, command.position);
      }
      break;
    case 'sync':
      // Full sync - send current position
      if (command.position !== undefined) {
        syncPlayClient.reportPosition(command.position, true);
      }
      break;
  }
}
