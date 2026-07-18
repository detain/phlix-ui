/**
 * Federation Library Shares types.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** An incoming library share offer from another peer to the current user. */
export interface IncomingOffer {
    id: string;
    peer_id: string;
    library_id: string;
    library_name: string;
    permission: 'read' | 'readwrite';
    status: 'pending' | 'accepted' | 'rejected';
    offered_at: string;
    responded_at: string | null;
    accepted_by: string | null;
}
/** A library share the current user sent to a peer. */
export interface OutgoingShare {
    id: string;
    library_id: string;
    library_name: string;
    peer_id: string;
    permission: 'read' | 'readwrite';
    status: 'pending' | 'accepted' | 'rejected';
    shared_at: string;
    revoked_at: string | null;
}
/** Raw incoming offer shape from the API (snake_case). */
export interface HubIncomingOffer {
    id?: string;
    peer_id?: string;
    library_id?: string;
    library_name?: string;
    permission?: string;
    status?: string;
    offered_at?: string;
    responded_at?: string | null;
    accepted_by?: string | null;
}
/** Raw outgoing share shape from the API (snake_case). */
export interface HubOutgoingShare {
    id?: string;
    library_id?: string;
    library_name?: string;
    peer_id?: string;
    permission?: string;
    status?: string;
    shared_at?: string;
    revoked_at?: string | null;
}
