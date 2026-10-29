/**
 * SyncPlay collaborative playback API client.
 *
 * Provides methods for creating/joining SyncPlay groups, managing sessions,
 * and synchronizing playback state across multiple users.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { SyncPlayRoom, SyncPlaySession, SyncPlayUser, SyncPlayStateUpdate, SyncPlayPlaybackCommand } from '../types/syncplay';
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
/**
 * Normalize the server's `members` — a dict keyed by member id from
 * `GroupState::getState()`, or `[]` from the raw-snapshot fallback — into the
 * UI's `SyncPlayUser[]`.
 *
 * The server carries no per-member online flag (membership IS presence: a
 * disconnected member is removed from the group), so `isOnline` is `true` for
 * every returned member, and `profileId` has no server counterpart at all.
 */
export declare function normalizeMembers(raw: RawSyncPlayGroup | undefined): SyncPlayUser[];
/**
 * Map a raw server group onto the UI's `SyncPlayRoom`.
 *
 * `isPublic` is derived from `has_password` (the only public/private signal the
 * server emits, and only on the listing rows); a group state with no password
 * field reads as public, which matches the listing default.
 */
export declare function normalizeGroup(raw: RawSyncPlayGroup | undefined): SyncPlayRoom;
/**
 * Map a raw server group onto the UI's `SyncPlaySession`.
 *
 * The server has no separate session entity — the GROUP is the session — so the
 * session id IS the group id. `playbackRate` has no server field either; a
 * playing group is 1× and anything else is 0, which is what `driftAmount`'s
 * extrapolation needs (a paused group must not extrapolate).
 */
export declare function groupToSession(raw: RawSyncPlayGroup | undefined): SyncPlaySession;
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
export declare class SyncPlayApi {
    private client;
    constructor(apiBase: string);
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
    createRoom(input: CreateRoomInput): Promise<SyncPlayRoom>;
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
    joinRoom(groupId: string, memberName?: string, password?: string): Promise<JoinedGroup>;
    /**
     * Leave the current SyncPlay group.
     * POST /api/v1/syncplay/groups/:id/leave
     */
    leaveRoom(groupId: string): Promise<void>;
    /**
     * Get the current session state.
     * GET /api/v1/syncplay/groups/:id
     */
    getState(groupId: string): Promise<SyncPlaySession>;
    /**
     * Get the list of members in a group.
     * GET /api/v1/syncplay/groups/:id
     *
     * ⚠ Reads the SAME served route as {@link getState}. There is no
     * `/groups/{id}/members` endpoint; the members dictionary is a field of the
     * group state (`GroupState::getState()['members']`), so that is where the
     * list is read from.
     */
    getMembers(groupId: string): Promise<SyncPlayUser[]>;
    /**
     * List all available groups.
     * GET /api/v1/syncplay/groups
     */
    listGroups(): Promise<SyncPlayRoom[]>;
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
    listPublicRooms(): Promise<SyncPlayRoom[]>;
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
export declare function isSyncPlayInvalidPassword(e: unknown): boolean;
export declare function getSyncPlayApi(apiBase: string): SyncPlayApi;
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
/** Install (or, with `null`/`undefined`, remove) the lifecycle logger. */
export declare function setSyncPlayLogger(logger: SyncPlayLogger | null | undefined): void;
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
/** Install (or, with `null`, remove) the `syncplay_error` consumer. */
export declare function setSyncPlayWireErrorListener(listener: SyncPlayWireErrorListener | null): void;
/** Callback invoked when the server sends a SyncPlay message over the WebSocket. */
type SyncPlayMessageHandler = (msg: {
    type: string;
    position?: number;
    roomId?: string;
}) => void;
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
export declare function openSyncPlayConnection(roomId: string, onMessage?: SyncPlayMessageHandler, memberId?: string, memberName?: string, passwordHash?: string): void;
/**
 * Close the current SyncPlay WebSocket connection.
 */
export declare function closeSyncPlayConnection(): void;
/**
 * Send a playback state update over the SyncPlay WebSocket using @phlix/syncplay protocol.
 * No-op if the WebSocket is not connected.
 *
 * @param state - The current playback state to broadcast to other room members.
 */
export declare function sendSyncPlayStateUpdate(state: SyncPlayStateUpdate): void;
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
export declare function sendSyncPlayCommand(command: SyncPlayPlaybackCommand): boolean;
export {};
