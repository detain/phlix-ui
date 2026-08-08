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
}

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

/** The response body the real controller returns for each registered route. */
function bodyFor(method: string, template: string): unknown {
    if (method === 'GET' && template === '/api/v1/syncplay/groups') {
        return { groups: [listingRowFixture()] };
    }
    if (method === 'POST' && template === '/api/v1/syncplay/groups') {
        return { success: true, group: groupStateFixture() };
    }
    if (method === 'GET' && template === '/api/v1/syncplay/groups/{id}') {
        return { group: groupStateFixture() };
    }
    if (method === 'POST' && template === '/api/v1/syncplay/groups/{id}/join') {
        return { success: true, group: groupStateFixture() };
    }
    return { success: true, message: 'Left group' };
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

    const impl = (input: string, init?: RequestInit): Promise<Response> => {
        const method = (init?.method ?? 'GET').toUpperCase();
        const withoutBase = baseUrl !== '' && input.startsWith(baseUrl) ? input.slice(baseUrl.length) : input;
        const path = withoutBase.split('?')[0] ?? '';

        const match = registered.find((r) => r.method === method && r.pattern.test(path));
        const status = match ? 200 : 404;
        const body: unknown = match ? bodyFor(match.method, match.template) : { error: 'Not found' };

        requests.push({ method, path, template: templatize(path), status });

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
