/**
 * A fake SyncPlay HTTP server driven by the phlix-server ROUTE MANIFEST.
 *
 * This exists because the ordinary `makeFetch([...])` harness replays canned
 * responses **in call order** and therefore answers 200 to ANY url — which is
 * precisely why no existing test could see S276 (`GET
 * /api/v1/syncplay/groups/{id}/members` is not served, is not registered, and
 * cannot be absorbed by a wildcard, yet every mocked test stubbed it green).
 *
 * Here the response is a function of the REQUESTED ROUTE: a request that does
 * not match one of the five registered routes gets a real **404**, which
 * `ApiClient` turns into a thrown `ApiError` exactly as the live server would.
 * A client that calls an unserved url therefore reds the test.
 *
 * ⚠ {@link SERVER_ROUTES} is transcribed BY HAND from phlix-server
 * `src/Server/Core/Application.php` (the `/api/v1/syncplay` route group). It is
 * deliberately NOT derived from `src/api/syncplay.ts` — a manifest read off the
 * client would self-adjust to whatever the client happens to call and could
 * never fail.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * The EXACT set of SyncPlay routes phlix-server registers, as
 * `[method, pathTemplate]` tuples.
 *
 * Source (phlix-server `src/Server/Core/Application.php`):
 * ```php
 * $r->get('/api/v1/syncplay/groups', [$controller, 'listGroups']);
 * $r->post('/api/v1/syncplay/groups', [$controller, 'createGroup']);
 * $r->get('/api/v1/syncplay/groups/{id}', [$controller, 'getGroup']);
 * $r->post('/api/v1/syncplay/groups/{id}/join', [$controller, 'joinGroup']);
 * $r->post('/api/v1/syncplay/groups/{id}/leave', [$controller, 'leaveGroup']);
 * ```
 */
export declare const SERVER_ROUTES: ReadonlyArray<readonly [string, string]>;
/** One observed request, with the concrete id folded back into `{id}`. */
export interface ObservedRequest {
    method: string;
    /** Concrete path as requested (no query string, no origin). */
    path: string;
    /** `path` with the group-id segment replaced by `{id}`, for tuple-exact compare. */
    template: string;
    status: number;
    /** Parsed JSON request body, or `null` when the request carried none. */
    body: Record<string, unknown> | null;
}
/**
 * The member id the fake attributes an unattributed request to.
 *
 * The real controller derives it from the authenticated principal —
 * `$memberId = $body['memberId'] ?: ($userId ?: 'user_' . random)` — and the
 * client never sends one, so on a live server this is the JWT subject. The fake
 * has no auth context, so it stands in one FIXED id; that keeps assertions
 * deterministic without pretending the client chose it.
 */
export declare const REQUESTING_MEMBER_ID = "me";
/**
 * The literal `GroupState::getState()` payload from phlix-server
 * `src/Session/SyncPlay/GroupState.php` — snake_case, `members` a DICTIONARY
 * keyed by member id, unix-SECONDS timestamps. Not a UI-shaped fixture: a test
 * that feeds the client the shape the client already wants proves nothing.
 */
export declare function groupStateFixture(overrides?: Record<string, unknown>): Record<string, unknown>;
/**
 * The reduced listing row `SyncPlaySnapshotService::listGroups()` emits — note
 * it uses `id`/`name`, NOT `group_id`/`group_name`, and carries no members.
 */
export declare function listingRowFixture(overrides?: Record<string, unknown>): Record<string, unknown>;
/**
 * Fold the concrete group id back into `{id}` so an observed request can be
 * compared TUPLE-EXACT against {@link SERVER_ROUTES}. Only the segment directly
 * after `/groups` is substituted, so a trailing `/members` survives and shows up
 * as the un-matchable `/api/v1/syncplay/groups/{id}/members`.
 */
export declare function templatize(path: string): string;
export interface FakeSyncPlayServer {
    fetch: typeof fetch;
    requests: ObservedRequest[];
}
/**
 * Build a fetch implementation that serves ONLY {@link SERVER_ROUTES} and 404s
 * everything else, recording every request it saw.
 *
 * @param baseUrl The origin the client is configured with; stripped off before matching.
 * @param options.omit `"METHOD /template"` keys to UNREGISTER — the control seam.
 *   Every url the client emits is legal by construction once the bug is fixed, so
 *   proving an "it resolved" assertion is falsifiable needs a server that stops
 *   serving a route the client legitimately calls.
 */
export declare function makeSyncPlayServer(baseUrl?: string, options?: {
    omit?: string[];
}): FakeSyncPlayServer;
