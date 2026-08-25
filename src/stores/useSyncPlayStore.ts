/**
 * SyncPlay collaborative playback state management.
 *
 * Manages the current SyncPlay room session, member list, and playback
 * synchronization state for the local user.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { SyncPlayRoom, SyncPlaySession, SyncPlayUser, SyncPlayPlaybackCommand } from '../types/syncplay';
import type { JoinedGroup } from '../api/syncplay';
import {
  getSyncPlayApi,
  openSyncPlayConnection,
  closeSyncPlayConnection,
  sendSyncPlayCommand,
  sendSyncPlayStateUpdate,
} from '../api/syncplay';
import { useAuthStore } from './useAuthStore';

/** Drift threshold in seconds beyond which we mark out-of-sync and seek. */
export const SYNC_DRIFT_THRESHOLD_SECONDS = 2;

/**
 * How often, in milliseconds, this client reports its playback position to the
 * group over the SyncPlay WebSocket.
 *
 * ## Why 5 s, and why a fixed interval at all
 *
 * S287: `sendSyncPlayStateUpdate()` existed, worked, and had **no production
 * caller** — this client never told the group where it was. The cadence was
 * chosen against what phlix-server actually does with the frame, not invented:
 *
 * 1. **The report is a PULL, not a PUSH.** `reportPosition()` emits
 *    `syncplay_playback_sync`. `SyncPlayManager::handlePlaybackSync()`
 *    (phlix-server `src/Session/SyncPlay/SyncPlayManager.php:988`) **ignores the
 *    position on the payload entirely** — it reads `$group->getPlaybackPosition()`
 *    and broadcasts THAT. So a report can never move the group's position and
 *    therefore cannot fight the drift correction the server already applies; it
 *    asks the group to re-state where it is. Reporting faster buys only a faster
 *    re-anchor, never a more accurate group position.
 * 2. **The cost is quadratic in group size.** That handler answers with
 *    `broadcastToGroup()`, not a direct reply, so one member's report costs N
 *    outbound frames in an N-member group. At the browser's `timeupdate` rate
 *    (~4 Hz) a five-person room would generate ~100 frames/s; at 5 s it is 1/s.
 * 3. **5 s is well inside the tolerance that defines "out of sync".**
 *    `SyncPlayManager::DEFAULT_POSITION_TOLERANCE` is 2000 ms and the UI's own
 *    {@link SYNC_DRIFT_THRESHOLD_SECONDS} is the same 2 s. Between anchors the
 *    UI does not guess: `driftAmount` extrapolates from `_lastDriftCaptureMs` at
 *    the known playback rate, and the only error that accumulates over a 5 s
 *    window is clock skew — orders of magnitude below 2 s. What the anchor
 *    prevents is the extrapolation window growing without bound, which is
 *    exactly what happened with no caller at all: `_lastDriftCaptureMs` was set
 *    at join and then only on a remote seek, so after ten minutes of playback
 *    `syncStatus` was extrapolating over ten minutes and meant nothing.
 *
 * Reporting is skipped while paused — `driftAmount` is defined as 0 while paused
 * or waiting, and the group's position does not advance either, so a paused
 * report is pure fan-out with no consumer.
 *
 * ⚠ This value is asserted by name AND by literal in
 * `useSyncPlayStore.position.test.ts`; a test that only advanced timers by this
 * constant would self-adjust to any change of it.
 */
export const POSITION_REPORT_INTERVAL_MS = 5000;

/**
 * The signed-in account's display name, or `undefined` when there is no usable
 * one.
 *
 * S285: this is the whole of "every SyncPlay member renders as Anonymous". The
 * name a member appears under is decided by whoever joins — `memberName` on the
 * REST join/create body (`SyncPlayController` defaults it to the literal
 * `'Guest'`/`'Host'`) and `member_name` on the WebSocket `GROUP_JOIN` frame
 * (@phlix/syncplay, defaulted to `'Anonymous'` by `api/syncplay.ts`). Nothing
 * ever supplied either, so every member in every room was a placeholder.
 *
 * `undefined` rather than a made-up string when signed out: a caller that sends
 * nothing gets the SERVER's default, which is the honest answer for an
 * unauthenticated joiner. Emitting our own placeholder here would look like a
 * real name on the wire.
 *
 * `/auth/me` is not guaranteed to carry a `name` — it is `AuthUser`'s optional
 * field — so `username` and then `email` back it up, in decreasing order of how
 * much the user would recognise it as themselves.
 */
export function resolveMemberName(): string | undefined {
  const user = useAuthStore().user;
  if (!user) return undefined;
  for (const candidate of [user.name, user.username, user.email]) {
    if (typeof candidate === 'string' && candidate.trim() !== '') return candidate.trim();
  }
  return undefined;
}

export const useSyncPlayStore = defineStore('phlix-syncplay', () => {
  // ---- state --------------------------------------------------------------
  const currentRoom = ref<SyncPlayRoom | null>(null);
  const currentSession = ref<SyncPlaySession | null>(null);
  const members = ref<SyncPlayUser[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  /** Local playback position reported by the Player (seconds). Updated by
   *  Player.vue after each sync round so drift can be computed. */
  const localPlaybackPosition = ref(0);
  /** Monotonic capture of `Date.now()` (ms) at the moment we last received a
   *  session update from the server — used to extrapolate expected position. */
  let _lastDriftCaptureMs = 0;
  /** Handle of the periodic position report; `null` when not in a room. */
  let _positionReportTimer: ReturnType<typeof setInterval> | null = null;

  // ---- computed -----------------------------------------------------------
  const isInRoom = computed(() => currentSession.value !== null);

  const isSynced = computed(() => {
    if (!currentSession.value) return false;
    return currentSession.value.state === 'playing' || currentSession.value.state === 'paused';
  });

  const onlineMembers = computed(() => members.value.filter((m) => m.isOnline));

  /**
   * Estimated playback drift in seconds — positive means local is AHEAD of where
   * the server expects, negative means local is BEHIND. Only meaningful when
   * playback is active; returns 0 while paused.
   */
  const driftAmount = computed<number>(() => {
    const session = currentSession.value;
    if (!session) return 0;
    // Pause introduces arbitrary local position offset — cannot compute drift.
    if (session.state === 'paused' || session.state === 'waiting') return 0;

    const elapsedMs = Date.now() - _lastDriftCaptureMs;
    const elapsedSec = elapsedMs / 1000;
    // Expected server position = last known position + time elapsed × rate
    const expectedPosition =
      session.playbackPosition + elapsedSec * session.playbackRate;
    const drift = localPlaybackPosition.value - expectedPosition;
    return drift;
  });

  const syncStatus = computed<'synced' | 'outOfSync' | 're-syncing'>(() => {
    if (!currentSession.value) return 'outOfSync';
    if (currentSession.value.state === 'waiting') return 're-syncing';
    if (Math.abs(driftAmount.value) > SYNC_DRIFT_THRESHOLD_SECONDS) {
      return 'outOfSync';
    }
    return 'synced';
  });

  // ---- position reporting -------------------------------------------------
  /**
   * Report this client's playback position to the group, once.
   *
   * Self-terminating: with no session there is nobody to report to and no
   * lifecycle hook left to stop the timer, so it stops itself rather than
   * ticking forever in a long-lived tab.
   */
  function reportLocalPosition(): void {
    const session = currentSession.value;
    if (!session) {
      stopPositionReporting();
      return;
    }
    // Paused/waiting: see POSITION_REPORT_INTERVAL_MS — the group position does
    // not advance and `driftAmount` is 0 by definition, so there is nothing to
    // anchor and the broadcast would be pure noise.
    if (session.state !== 'playing') return;
    sendSyncPlayStateUpdate({
      sessionId: session.id,
      // S293: `localPlaybackPosition` is SECONDS (the ui-internal unit); the
      // wire unit is MILLISECONDS (phlix-syncplay SPEC.md:91). Convert at the
      // send boundary — Boundary #1 (periodic report → `reportPosition`).
      playbackPosition: localPlaybackPosition.value * 1000,
      // `sendSyncPlayStateUpdate()` derives the frame's `is_playing` from
      // `playbackRate > 0`. A session that reached `playing` through
      // `onRemoteStateUpdate()` has its state updated but NOT its rate, so
      // forwarding a literal 0 here would report this member as paused while it
      // is playing. 1x is the only rate the server models.
      playbackRate: session.playbackRate > 0 ? session.playbackRate : 1,
      serverTime: session.serverTime,
      timestamp: new Date().toISOString(),
    });
  }

  /** Begin (or restart) the periodic position report. */
  function startPositionReporting(): void {
    stopPositionReporting();
    _positionReportTimer = setInterval(reportLocalPosition, POSITION_REPORT_INTERVAL_MS);
  }

  /** Stop the periodic position report; safe to call when not running. */
  function stopPositionReporting(): void {
    if (_positionReportTimer !== null) {
      clearInterval(_positionReportTimer);
      _positionReportTimer = null;
    }
  }

  // ---- actions -----------------------------------------------------------
  /**
   * Adopt the group a create-or-join just returned.
   *
   * ⚠ S287: this exists because the two join-performing paths had DIVERGED.
   * `joinRoom()` opened the realtime WebSocket; `createAndJoinRoom()` did not,
   * even though it also joins — so the host, the one member guaranteed to be in
   * the room, received no remote play/pause, no sync broadcasts and no reconnect
   * ladder until they left and re-joined by bare id. It also never anchored
   * `_lastDriftCaptureMs`, leaving `driftAmount` extrapolating from epoch 0 and
   * `syncStatus` permanently `outOfSync` for the creator.
   *
   * The tail of a join is ONE behaviour, so it lives here once and both callers
   * run it; the next field added to it cannot reach only one of them.
   *
   * @param roomId     The group that was joined.
   * @param joined     Both views of the post-join group state.
   * @param memberName Display name to appear under (S285); `undefined` when
   *   signed out, which lets the server's own default win.
   */
  function adoptJoinedGroup(roomId: string, joined: JoinedGroup, memberName: string | undefined): void {
    const { room, session } = joined;
    currentSession.value = session;
    _lastDriftCaptureMs = Date.now(); // anchor for drift computation
    // S283: back-fill `currentRoom` when the caller had none. A join by bare
    // id — the modal's join tab and the `?room=<id>` join-link — never set it,
    // and `leaveRoom()`, `refreshMembers()`, `SyncPlayPage.refresh()` and the
    // room-name header are ALL guarded on `currentRoom`, so a link-joined user
    // could not leave the room they had just joined. The room is not invented:
    // it is `normalizeGroup()` of the same `{ group }` the join returned.
    // The server's view wins field by field — an existing object supplies only
    // what the group state has no counterpart for (description, participants).
    // The other spread order would be a trap: joining room B while a stale
    // room A sat in the store would leave `currentRoom.id` pointing at A, and
    // `leaveRoom()` would then leave the wrong room.
    currentRoom.value = {
      ...(currentRoom.value ?? {}),
      ...room,
      currentSession: session,
    };
    // Refresh members from session
    members.value = session.activeUsers;
    // P8: Open the WebSocket connection for real-time sync once successfully joined.
    // S285: `memberName` is passed through to the `GROUP_JOIN` frame's
    // `member_name`. The WS worker keeps its OWN member table (the REST
    // controller and the socket worker are different processes), so a name
    // supplied only on the REST body would still leave the realtime side —
    // and the snapshot `getGroup()` reads back — calling this member
    // "Anonymous". The member ID stays `undefined` on purpose: it is a tab
    // identity minted by `api/syncplay.ts`, not an account one.
    openSyncPlayConnection(
      roomId,
      (msg) => {
        onRemoteStateUpdate(msg as SyncPlayPlaybackCommand);
      },
      undefined,
      memberName,
    );
    // S287: start telling the group where we are. See POSITION_REPORT_INTERVAL_MS.
    startPositionReporting();
  }

  /**
   * Create a new SyncPlay room and join it.
   */
  async function createAndJoinRoom(
    apiBase: string,
    input: { name: string; description?: string; isPublic: boolean },
  ): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const api = getSyncPlayApi(apiBase);
      // S285: the creator is added to the group as a member by `createGroup()`
      // itself, under `memberName` — so the name has to go on the CREATE body,
      // not just the join that follows it.
      const memberName = resolveMemberName();
      const room = await api.createRoom({ ...input, memberName });
      currentRoom.value = room;
      // S287: the SAME tail as a join by bare id, socket included.
      adoptJoinedGroup(room.id, await api.joinRoom(room.id, memberName), memberName);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create room';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Join an existing SyncPlay room by ID.
   */
  async function joinRoom(apiBase: string, roomId: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const api = getSyncPlayApi(apiBase);
      // S276: there is NO pre-join member fetch. The old code awaited
      // `api.getMembers(roomId)` here, which hit an unserved
      // `/groups/{id}/members` — `ApiClient` throws on any non-ok response, so
      // every join failed before `api.joinRoom()` ran and the WebSocket never
      // opened. The value was vestigial regardless: `members.value` is
      // overwritten UNCONDITIONALLY from `session.activeUsers` a few lines
      // below, so nothing downstream could ever observe it.
      // S285: join UNDER THE ACCOUNT'S NAME. The server records whatever
      // `memberName` this body carries and echoes it straight back inside
      // `group.members`, which is what `members.value` below is built from — so
      // this one argument is the difference between the member list showing the
      // real people in the room and showing a column of `Guest`.
      const memberName = resolveMemberName();
      adoptJoinedGroup(roomId, await api.joinRoom(roomId, memberName), memberName);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to join room';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Leave the current SyncPlay room.
   */
  async function leaveRoom(apiBase: string): Promise<void> {
    if (!currentRoom.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      const api = getSyncPlayApi(apiBase);
      await api.leaveRoom(currentRoom.value.id);
      // S287: stop reporting BEFORE the socket goes, so a tick cannot land on a
      // half-torn-down connection.
      stopPositionReporting();
      // P8: Close the WebSocket connection when leaving the room.
      closeSyncPlayConnection();
      currentRoom.value = null;
      currentSession.value = null;
      members.value = [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to leave room';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Handle a remote state update from another user in the room.
   * Applies the playback command to synchronize playback.
   *
   * ⚠ S290 — every arm that carries a position must ALSO re-anchor. The
   * `play`/`pause` arms used to set `state` and nothing else, which made the
   * return leg of S287's position report lossy in a way no state assertion
   * could see. `handlePlaybackSync()` (phlix-server
   * `src/Session/SyncPlay/SyncPlayManager.php:1014`) answers each report with a
   * group-wide `syncplay_playback_sync` broadcast carrying the group's
   * AUTHORITATIVE `position`, and `api/syncplay.ts`'s `onPlaybackSync` maps that
   * frame onto `{type: is_playing ? 'play' : 'pause', position}`. So the whole
   * point of reporting — obtaining a fresh anchor every 5 s — arrived here and
   * was dropped: `_lastDriftCaptureMs` kept its join-time value, `driftAmount`
   * went on extrapolating over an ever-widening window, and `syncStatus` drifted
   * to a permanent `outOfSync`.
   *
   * `position !== undefined` rather than truthiness, matching `seek`/`sync`: a
   * broadcast of position 0 (a group at the start of a title) is a real
   * position, and a command with no position must not seek anybody to zero.
   */
  function onRemoteStateUpdate(command: SyncPlayPlaybackCommand): void {
    if (!currentSession.value) return;

    // Update session state based on command
    switch (command.type) {
      case 'play':
        if (command.position !== undefined) {
          _lastDriftCaptureMs = Date.now();
          currentSession.value = {
            ...currentSession.value,
            playbackPosition: command.position,
          };
        }
        currentSession.value = {
          ...currentSession.value,
          state: 'playing',
        };
        break;
      case 'pause':
        if (command.position !== undefined) {
          _lastDriftCaptureMs = Date.now();
          currentSession.value = {
            ...currentSession.value,
            playbackPosition: command.position,
          };
        }
        currentSession.value = {
          ...currentSession.value,
          state: 'paused',
        };
        break;
      case 'seek':
        if (command.position !== undefined) {
          _lastDriftCaptureMs = Date.now();
          currentSession.value = {
            ...currentSession.value,
            playbackPosition: command.position,
          };
        }
        break;
      case 'sync':
        // Full state sync - update all fields
        if (command.position !== undefined) {
          _lastDriftCaptureMs = Date.now();
          currentSession.value = {
            ...currentSession.value,
            playbackPosition: command.position,
          };
        }
        if (command.rate !== undefined) {
          currentSession.value = {
            ...currentSession.value,
            playbackRate: command.rate,
          };
        }
        break;
    }

    // Update members list if included
    // (Server may send updated active users in some responses)
  }

  /**
   * Send a local playback command to all room members via WebSocket.
   */
  function sendCommand(
    _apiBase: string,
    type: SyncPlayPlaybackCommand['type'],
    options?: { position?: number; rate?: number },
  ): void {
    if (!currentSession.value) return;
    const command: SyncPlayPlaybackCommand = {
      type,
      // S293: `options.position` is SECONDS (the ui-internal unit — e.g. the
      // seek position SyncPlayControls sends); the wire unit is MILLISECONDS
      // (phlix-syncplay SPEC.md:91). Convert at the send boundary — Boundary
      // #2 (command path → sendPlay/sendPause/sendSeek/reportPosition).
      // `undefined` stays `undefined` so a play/pause without a position is
      // not coerced to 0 on the wire.
      position: options?.position !== undefined ? options.position * 1000 : undefined,
      rate: options?.rate,
      issuedBy: currentSession.value.createdBy,
      issuedAt: new Date().toISOString(),
    };
    // P8: Send via WebSocket using @phlix/syncplay protocol — not REST.
    sendSyncPlayCommand(command);
  }

  /**
   * Refresh the current session state from the server.
   */
  async function refreshState(apiBase: string): Promise<void> {
    if (!currentSession.value) return;
    try {
      const api = getSyncPlayApi(apiBase);
      const session = await api.getState(currentSession.value.id);
      currentSession.value = session;
      _lastDriftCaptureMs = Date.now(); // anchor for drift computation
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to refresh state';
      throw e;
    }
  }

  /**
   * Refresh the members list from the server.
   */
  async function refreshMembers(apiBase: string): Promise<void> {
    if (!currentRoom.value) return;
    try {
      const api = getSyncPlayApi(apiBase);
      const membersList = await api.getMembers(currentRoom.value.id);
      members.value = membersList;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to refresh members';
      throw e;
    }
  }

  /**
   * Clear any error state.
   */
  function clearError(): void {
    error.value = null;
  }

  /**
   * Update the local playback position reported by the Player.
   * Called by Player.vue after each sync round so drift can be computed.
   */
  function updateLocalPosition(position: number): void {
    localPlaybackPosition.value = position;
  }

  return {
    // state
    currentRoom,
    currentSession,
    members,
    error,
    isLoading,
    // S287: exposed so the chain "player reports a position" → "that position
    // goes on the wire" is assertable at both ends rather than through a spy on
    // the setter. It is also the other input to `driftAmount`, which was already
    // public.
    localPlaybackPosition,
    // computed
    isInRoom,
    isSynced,
    onlineMembers,
    syncStatus,
    driftAmount,
    // actions
    createAndJoinRoom,
    joinRoom,
    leaveRoom,
    onRemoteStateUpdate,
    sendCommand,
    refreshState,
    refreshMembers,
    clearError,
    updateLocalPosition,
  };
});
