/**
 * SyncPlay collaborative playback types — the UI's own view-model.
 *
 * The WIRE vocabulary is NOT declared here. `@phlix/contracts` owns it
 * (S415 authority ruling: server source, live paths only) and the adapter in
 * `src/api/syncplay.ts` maps wire → the shapes below. What this file models is
 * what the components/stores actually speak: a normalized session/room/member
 * view. An earlier revision presented itself as a mirror of an older
 * contracts release (the pre-S415 v0.3.x era) and shipped seven wire DTOs the
 * server never emits — that fiction is retired (review ui__fedev, CU-095);
 * anything that mirrors the wire must
 * `import type` from the contracts package, never restate it.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Role + permission vocabularies are re-exported from @phlix/contracts (SSOT),
 * exactly like `MediaType` in ./media-item.ts — do not turn them back into
 * literal unions (law in `src/types/media-item.ts:15-18`).
 */
import type { SyncPlayRole, SyncPlayPermission } from '@phlix/contracts';
export type { SyncPlayRole, SyncPlayPermission };
export interface SyncPlaySession {
    id: string;
    roomId: string;
    createdBy: string;
    createdAt: string;
    state: 'waiting' | 'playing' | 'paused' | 'ended';
    /** Media item id the group is (or last was) playing — carried through from
     *  the wire's `current_media_id` (S298). The server emits it in
     *  `GroupState::getState()`; `null` when no media has been selected yet.
     *  The hub-relay pending_command consumer (S298) writes it into the live
     *  session, and Player.vue's load-a-new-title path consumes it. */
    currentMediaId: string | null;
    playbackPosition: number;
    playbackRate: number;
    serverTime: number;
    lastSync: string;
    activeUsers: SyncPlayUser[];
    roles: Record<string, SyncPlayRole>;
}
export interface SyncPlayUser {
    id: string;
    name: string;
    role: SyncPlayRole;
    isOnline: boolean;
    lastSeen: string;
}
export interface SyncPlayRoom {
    id: string;
    name: string;
    /**
     * Served truth, not user intent: `normalizeGroup()` derives this from the
     * snapshot row's `has_password` — the only public/private signal the server
     * keeps (S288 removed the create-time toggle that pretended otherwise).
     */
    isPublic: boolean;
    currentSession?: SyncPlaySession;
    memberCount: number;
    roomId?: string;
    serverId?: string;
    hostUserId?: string;
    createdAt?: string;
}
export interface SyncPlayStateUpdate {
    sessionId: string;
    /** Position in MILLISECONDS — the wire unit (phlix-syncplay SPEC.md:91).
     *  S293: converted from ui-internal seconds by
     *  `useSyncPlayStore.reportLocalPosition()` at the send boundary. */
    playbackPosition: number;
    playbackRate: number;
    serverTime: number;
    timestamp: string;
}
export interface SyncPlayPlaybackCommand {
    type: 'play' | 'pause' | 'seek' | 'sync';
    /** Position in SECONDS — the UI-internal unit every consumer speaks
     *  (`playbackPosition`, `driftAmount`, `video.currentTime`). The wire unit is
     *  MILLISECONDS (phlix-syncplay SPEC.md:91): outbound commands are converted
     *  by `useSyncPlayStore.sendCommand()` (S293); inbound commands are converted
     *  once at the protocol boundary in `api/syncplay.ts` (S441), so no consumer
     *  below this adapter ever does ms math. */
    position?: number;
    rate?: number;
    issuedBy: string;
    issuedAt: string;
}
