/**
 * Hub relay pending-command consumer (S298).
 *
 * The ONLY Phlix surface that can receive "Alexa, play X" is the hub's SyncPlay
 * relay WebSocket (`ws://<hub>:8804/syncplay/{server_id}`). Before S298 no
 * client connected there at all: every live socket pointed at the server's
 * `:8097`, spoke a different (`syncplay_`-prefixed) vocabulary, and carried its
 * token in the query string — which the relay refuses by design (S237). The hub
 * half (S93) therefore measured a delivered count of 0 and the Alexa skill spoke
 * its honest "no open app" answer.
 *
 * This module is the missing consumer. It connects to the REAL relay with the
 * REAL handshake:
 *
 * - **URL** — `ws(s)://<hub-host>:8804/syncplay/<server_id>` (the path the
 *   relay's `onWebSocketConnect()` parses the server id from).
 * - **Token carrier** — the `Sec-WebSocket-Protocol: bearer, <token>`
 *   subprotocol. The relay accepts `Authorization: Bearer` OR the bearer
 *   subprotocol (S237); a browser WebSocket cannot set request headers, so the
 *   subprotocol is the ONLY carrier a web client can use. Query-string tokens
 *   are refused by design — this module never puts one there.
 * - **Vocabulary** — the relay's own JSON frames (`group_join`, `playback_*`,
 *   `room_state`, `pending_command`, …). ONLY `pending_command` /
 *   `play_media` is consumed here (S93's frame, dispatched by
 *   `PendingCommandDispatcher`); everything else is ignored. The frame is
 *   parsed at this boundary (parse-don't-validate): a typed command comes out,
 *   garbage yields `null` and is dropped.
 * - **Lifecycle** — the socket opens WHENEVER the app is open, not inside a
 *   room join. The hub's `deliverToUser()` deliberately matches on
 *   (user, server) at connect time and does NOT require room membership — the
 *   primary case is a user with no room. Reconnects re-read the token every
 *   attempt because relay tokens expire (1h default); the ladder is capped and
 *   self-terminating.
 *
 * The module holds its connection in module-level state, mirroring
 * `src/api/syncplay.ts`, so the app boots it once via
 * `openHubRelayConnection()` and the store/player react to delivered commands.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** The hub relay's SyncPlay WebSocket port (SyncPlayRelayWorker::DEFAULT_PORT). */
export declare const HUB_SYNC_PLAY_PORT = 8804;
/** Connection states surfaced via `onStatusChange`. */
export type HubRelayStatus = 'connecting' | 'open' | 'reconnecting' | 'closed';
/**
 * One delivered `pending_command` / `play_media` frame (S93's shape, emitted by
 * the hub's `PendingCommandDispatcher`). All fields are already coerced and
 * validated at the parse boundary; `issuedAt` is Unix seconds.
 */
export interface PendingPlayMediaCommand {
    type: 'pending_command';
    command: 'play_media';
    /** Hub server id the media id belongs to (the socket is bound to it). */
    serverId: string;
    /** Media item id to start playing. */
    mediaId: string;
    /** Human-readable title ("Alexa, play X" → X). */
    title: string;
    /** Unix seconds — when the hub dispatched the frame. */
    issuedAt: number;
    /** Frame origin, e.g. `alexa`. */
    source: string;
}
export interface HubRelayConfig {
    /** Server the hub relay socket is bound to (the `/syncplay/{server_id}` path
     *  AND the token's server scope). The media ids in delivered commands belong
     *  to this server. */
    serverId: string;
    /**
     * Returns the hub relay token to present on this (re)connect attempt.
     *
     * Re-read on EVERY attempt because relay tokens are short-lived (1h default);
     * a stale module-level token would fail validation the moment it expires.
     * Returning `null` keeps the socket closed.
     */
    tokenProvider: () => string | null;
    /**
     * Hub base origin, e.g. `https://hub.example.com`. The relay listens on port
     * 8804 regardless of this origin's own port. Defaults to the app's own origin
     * (the common self-hosted layout where the hub shares the host).
     */
    hubBaseUrl?: string;
    /** Called once per delivered `pending_command` / `play_media` frame. */
    onPendingCommand: (command: PendingPlayMediaCommand) => void;
    /** Optional lifecycle visibility (e.g. a "connected to hub" indicator). */
    onStatusChange?: (status: HubRelayStatus) => void;
}
/**
 * Coerce one raw relay frame into a typed play-media command.
 *
 * The parse boundary: the hub's `PendingCommandDispatcher` emits
 * `{type:'pending_command', command:'play_media', server_id, media_id, title,
 * issued_at, source}` — this validates that shape and coerces numbers at the
 * edge; anything else (unknown frame types, malformed bodies) returns `null`
 * and is dropped. Exported for tests and for consumers that want to parse a
 * frame without opening a socket.
 */
export declare function parsePendingCommandFrame(raw: unknown): PendingPlayMediaCommand | null;
/**
 * Build the relay URL: `ws(s)://<host>:8804/syncplay/<server_id>`.
 *
 * The scheme follows `hubBaseUrl` (`https:` → `wss:`); the port is the relay's
 * own 8804, never the origin's. Exported for tests.
 */
export declare function buildHubRelayUrl(hubBaseUrl: string | undefined, serverId: string): string;
/**
 * Open the hub relay socket (or return the open one).
 *
 * The "open-whenever" lifecycle: this is NOT gated on a SyncPlay room join —
 * the hub delivers `pending_command` to an authenticated (user, server) socket
 * regardless of room membership, and the primary "Alexa, play X" case has no
 * room at all. Call once at app boot (see `createPhlixApp`); the socket stays
 * open with a capped reconnect ladder until {@link closeHubRelayConnection}.
 *
 * If the token provider yields nothing, the socket stays closed (`closed`
 * status) and no reconnect ladder is armed — the caller re-invokes after hub
 * auth is available.
 */
export declare function openHubRelayConnection(config: HubRelayConfig): void;
/**
 * Close the hub relay socket and stop the reconnect ladder.
 */
export declare function closeHubRelayConnection(): void;
/** The open socket, or null. Exported for the app's status UI / tests. */
export declare function getHubRelaySocket(): WebSocket | null;
