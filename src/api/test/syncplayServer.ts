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
export const SERVER_ROUTES: ReadonlyArray<readonly [string, string]> = [
    ['GET', '/api/v1/syncplay/groups'],
    ['POST', '/api/v1/syncplay/groups'],
    ['GET', '/api/v1/syncplay/groups/{id}'],
    ['POST', '/api/v1/syncplay/groups/{id}/join'],
    ['POST', '/api/v1/syncplay/groups/{id}/leave'],
] as const;

/**
 * `{id}` matches one path SEGMENT and nothing else — the server's placeholder
 * pattern is `[^/]+`, so `/groups/{id}` can NOT absorb `/groups/x/members`.
 * Getting this wrong in the harness would silently re-pin the bug.
 */
function routeToRegExp(template: string): RegExp {
    const escaped = template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{id\\\}/g, '[^/]+');
    return new RegExp(`^${escaped}$`);
}

const COMPILED = SERVER_ROUTES.map(([method, template]) => ({
    method,
    template,
    pattern: routeToRegExp(template),
}));

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
export const REQUESTING_MEMBER_ID = 'me';

/**
 * The literal `GroupState::getState()` payload from phlix-server
 * `src/Session/SyncPlay/GroupState.php` — snake_case, `members` a DICTIONARY
 * keyed by member id, unix-SECONDS timestamps. Not a UI-shaped fixture: a test
 * that feeds the client the shape the client already wants proves nothing.
 */
export function groupStateFixture(overrides: Record<string, unknown> = {}): Record<string, unknown> {
    return {
        group_id: 'sp_abc123',
        group_name: 'Movie Night',
        member_count: 2,
        members: {
            m1: { id: 'm1', name: 'Alice', is_host: true, joined_at: 1_700_000_000 },
            m2: { id: 'm2', name: 'Bob', is_host: false, joined_at: 1_700_000_060 },
        },
        host_id: 'm1',
        current_media_id: 'media-1',
        current_media_duration: 7200,
        playback_position: 123,
        playback_state: 'playing',
        queue: [],
        created_at: 1_700_000_000,
        last_activity_at: 1_700_000_500,
        ...overrides,
    };
}

/**
 * The reduced listing row `SyncPlaySnapshotService::listGroups()` emits — note
 * it uses `id`/`name`, NOT `group_id`/`group_name`, and carries no members.
 */
export function listingRowFixture(overrides: Record<string, unknown> = {}): Record<string, unknown> {
    return {
        id: 'sp_abc123',
        name: 'Movie Night',
        member_count: 2,
        has_password: false,
        current_media: 'media-1',
        is_playing: true,
        ...overrides,
    };
}

/** Read a non-empty string field off a request body, else `undefined`. */
function stringField(body: Record<string, unknown> | null, key: string): string | undefined {
    const value = body?.[key];
    return typeof value === 'string' && value !== '' ? value : undefined;
}

/** The mutable half of the fake — one group, as `GroupState` holds it. */
interface GroupStore {
    name: string;
    hostId: string;
    members: Record<string, Record<string, unknown>>;
}

/**
 * Build the route handler set over a MUTABLE group.
 *
 * ⚠ S285: the POST routes are functions of the REQUEST BODY and they MUTATE the
 * group, because that is what the real controller is.
 * `SyncPlayController::joinGroup()` reads `memberName` and falls back to the
 * literal `'Guest'`; `createGroup()` reads it and falls back to `'Host'`;
 * `SyncPlayManager` writes that string into `GroupState`'s member record, and
 * every subsequent `getState()` — the join's own response AND the later
 * `GET /groups/{id}` the UI refreshes from — echoes it back under `members`.
 *
 * A body-blind fake would answer with a fixed member list, so a client that
 * forgot to send a name would be indistinguishable from one that sent it. A
 * STATELESS-but-body-aware fake would be worse in a subtler way: the joiner
 * would appear in the join response and then vanish on the next refresh, which
 * is not a behaviour any server has.
 */
function makeHandlers(group: GroupStore) {
    const state = (overrides: Record<string, unknown> = {}): Record<string, unknown> =>
        groupStateFixture({
            group_name: group.name,
            host_id: group.hostId,
            members: { ...group.members },
            member_count: Object.keys(group.members).length,
            ...overrides,
        });

    return (method: string, template: string, reqBody: Record<string, unknown> | null): unknown => {
        const memberId = stringField(reqBody, 'memberId') ?? REQUESTING_MEMBER_ID;

        if (method === 'GET' && template === '/api/v1/syncplay/groups') {
            return {
                groups: [
                    listingRowFixture({ name: group.name, member_count: Object.keys(group.members).length }),
                ],
            };
        }
        if (method === 'POST' && template === '/api/v1/syncplay/groups') {
            // A freshly created group holds exactly ONE member — its creator, who
            // is also the host (`SyncPlayManager::createGroup()` → `addMember()`
            // + `setHost()`). Alice and Bob are not in a room nobody made yet.
            group.name = stringField(reqBody, 'name') ?? '';
            group.hostId = memberId;
            group.members = {
                [memberId]: {
                    id: memberId,
                    name: stringField(reqBody, 'memberName') ?? 'Host',
                    is_host: true,
                    joined_at: 1_700_000_000,
                },
            };
            return {
                success: true,
                group: state({ playback_state: 'stopped', playback_position: 0, current_media_id: null }),
            };
        }
        if (method === 'GET' && template === '/api/v1/syncplay/groups/{id}') {
            return { group: state() };
        }
        if (method === 'POST' && template === '/api/v1/syncplay/groups/{id}/join') {
            group.members[memberId] = {
                id: memberId,
                name: stringField(reqBody, 'memberName') ?? 'Guest',
                is_host: group.hostId === memberId,
                joined_at: 1_700_000_120,
            };
            return { success: true, group: state() };
        }
        // POST /groups/{id}/leave — membership IS presence, so leaving removes.
        delete group.members[memberId];
        return { success: true, message: 'Left group' };
    };
}

/**
 * Fold the concrete group id back into `{id}` so an observed request can be
 * compared TUPLE-EXACT against {@link SERVER_ROUTES}. Only the segment directly
 * after `/groups` is substituted, so a trailing `/members` survives and shows up
 * as the un-matchable `/api/v1/syncplay/groups/{id}/members`.
 */
export function templatize(path: string): string {
    return path.replace(/^(\/api\/v1\/syncplay\/groups)\/[^/]+/, '$1/{id}');
}

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
export function makeSyncPlayServer(baseUrl = '', options: { omit?: string[] } = {}): FakeSyncPlayServer {
    const requests: ObservedRequest[] = [];
    const omit = new Set(options.omit ?? []);
    const registered = COMPILED.filter((r) => !omit.has(`${r.method} ${r.template}`));
    // One live group per server instance, seeded with the two members the
    // fixtures have always described. Every server is built fresh per test, so
    // the mutations below never leak between them.
    const bodyFor = makeHandlers({
        name: 'Movie Night',
        hostId: 'm1',
        members: {
            m1: { id: 'm1', name: 'Alice', is_host: true, joined_at: 1_700_000_000 },
            m2: { id: 'm2', name: 'Bob', is_host: false, joined_at: 1_700_000_060 },
        },
    });

    const impl = (input: string, init?: RequestInit): Promise<Response> => {
        const method = (init?.method ?? 'GET').toUpperCase();
        const withoutBase = baseUrl !== '' && input.startsWith(baseUrl) ? input.slice(baseUrl.length) : input;
        const path = withoutBase.split('?')[0] ?? '';

        let reqBody: Record<string, unknown> | null = null;
        if (typeof init?.body === 'string') {
            try {
                const parsed: unknown = JSON.parse(init.body);
                reqBody = parsed !== null && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;
            } catch {
                reqBody = null;
            }
        }

        const match = registered.find((r) => r.method === method && r.pattern.test(path));
        const status = match ? 200 : 404;
        const body: unknown = match ? bodyFor(match.method, match.template, reqBody) : { error: 'Not found' };

        requests.push({ method, path, template: templatize(path), status, body: reqBody });

        return Promise.resolve({
            ok: status >= 200 && status < 300,
            status,
            headers: new Headers({ 'content-type': 'application/json' }),
            json: () => Promise.resolve(body),
            text: () => Promise.resolve(JSON.stringify(body)),
        } as unknown as Response);
    };

    return { fetch: impl as unknown as typeof fetch, requests };
}
