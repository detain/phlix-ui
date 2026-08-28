/**
 * S280 — the general client route gate: a fake HTTP server that serves ONLY
 * what phlix-server actually registers, and answers a real **404** to anything
 * outside it.
 *
 * This generalises the S276 harness (`./syncplayServer.ts`, five SyncPlay
 * routes) to the FULL server surface: the 389 `[method, pathTemplate]` tuples
 * of `SERVER_ROUTE_MANIFEST` (the union of the two phlix-server ROUTE_MANIFEST
 * constants, generated — never transcribed by hand).
 *
 * Why the server drives the response: the ordinary `makeFetch([...])` harness
 * replays canned responses **in call order** and therefore answers 200 to ANY
 * url — which is precisely why no test could see S264 (`/members`), S276, S279
 * or the `/rooms` drift. Here a request that does not match a registered route
 * gets a real 404, which `ApiClient` turns into a thrown `ApiError` exactly as
 * the live server would. A client that calls an unserved url therefore reds
 * the gate.
 *
 * ⚠ Tuple-exact matching only. Every manifest template compiles to an ANCHORED
 * regex in which `{param}` matches exactly ONE path segment (`[^/]+`) — the
 * server's own placeholder pattern — so `/api/v1/media/{id}` can never absorb
 * `/api/v1/media/{id}/markers` (sibling-wildcard absorption), and a
 * right-path/wrong-method request is a 404. Registration order mirrors the
 * server's router: static segments are registered before parametric ones, and
 * the first manifest match wins.
 *
 * ⚠ The manifest is read off the SERVER side only — never off the client under
 * test. A manifest derived from the client would self-adjust to whatever the
 * client happens to call and could never fail. See
 * `scripts/generate-server-route-manifest.mjs` for the derivation + provenance.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { SERVER_ROUTE_MANIFEST, SERVER_ROUTE_MANIFEST_PROVENANCE } from './serverRouteManifest.generated';
import { ApiError } from '../errors';
import { expect } from 'vitest';

export { SERVER_ROUTE_MANIFEST, SERVER_ROUTE_MANIFEST_PROVENANCE };

interface CompiledRoute {
    method: string;
    template: string;
    pattern: RegExp;
}

/**
 * `{param}` matches one path SEGMENT and nothing else — the server's
 * placeholder pattern is `[^/]+`, so `/media/{id}` can NOT absorb
 * `/media/{id}/markers`. Getting this wrong in the harness would silently
 * re-pin the exact defect class S280 exists to catch.
 */
function routeToRegExp(template: string): RegExp {
    const escaped = template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{[^}]*\\\}/g, '[^/]+');
    return new RegExp(`^${escaped}$`);
}

const COMPILED: CompiledRoute[] = SERVER_ROUTE_MANIFEST.map(([method, template]) => ({
    method,
    template,
    pattern: routeToRegExp(template),
}));

/** One observed request. */
export interface RouteGateObservedRequest {
    method: string;
    /** Concrete path as requested (no query string, no origin). */
    path: string;
    /**
     * The manifest template when the request matched a registered route; the
     * raw `path` when it did not — so an unserved url shows up in failure
     * output exactly as the client emitted it.
     */
    template: string;
    status: number;
}

export interface RouteGateServer {
    fetch: typeof fetch;
    requests: RouteGateObservedRequest[];
    /** The compiled routes currently served (after `omit` filtering). */
    served: ReadonlyArray<readonly [string, string]>;
}

export interface RouteGateServerOptions {
    /**
     * `"METHOD /template"` keys to UNREGISTER — the control seam. Every url the
     * client emits is legal by construction once the gate passes, so proving an
     * "it resolves" assertion is falsifiable needs a server that stops serving
     * a route the client legitimately calls (the S280 defect shape).
     */
    omit?: string[];
}

/**
 * Build a fetch implementation that serves ONLY `SERVER_ROUTE_MANIFEST` and
 * 404s everything else, recording every request it saw.
 *
 * @param baseUrl The origin (or proxy prefix) the client is configured with;
 *   stripped off before matching.
 */
export function makeRouteGateServer(baseUrl = '', options: RouteGateServerOptions = {}): RouteGateServer {
    const requests: RouteGateObservedRequest[] = [];
    const omit = new Set(options.omit ?? []);
    const registered = COMPILED.filter((r) => !omit.has(`${r.method} ${r.template}`));

    const impl = (input: string, init?: RequestInit): Promise<Response> => {
        const method = (init?.method ?? 'GET').toUpperCase();
        const withoutBase = baseUrl !== '' && input.startsWith(baseUrl) ? input.slice(baseUrl.length) : input;
        const path = withoutBase.split('?')[0] ?? '';

        // First registration-order match, like the server's router: a static
        // route registered before a parametric one shadows it for its literal.
        const match = registered.find((r) => r.method === method && r.pattern.test(path));
        const status = match ? 200 : 404;
        const body: unknown = match ? {} : { error: 'Not found' };

        requests.push({ method, path, template: match ? match.template : path, status });

        return Promise.resolve({
            ok: status >= 200 && status < 300,
            status,
            headers: new Headers({ 'content-type': 'application/json' }),
            json: () => Promise.resolve(body),
            text: () => Promise.resolve(JSON.stringify(body)),
        } as unknown as Response);
    };

    return { fetch: impl as unknown as typeof fetch, requests, served: registered.map((r) => [r.method, r.template]) };
}

/**
 * Tuple-exact membership test against the server manifest: `[method, template]`
 * compared as one joined string — never a substring, never a prefix.
 */
export function isRegisteredRoute(method: string, template: string): boolean {
    const key = `${method} ${template}`;
    return SERVER_ROUTE_MANIFEST.some(([m, t]) => `${m} ${t}` === key);
}

/** `"METHOD /template"` keys of the requests a server observed (for diffing). */
export function observedRouteKeys(requests: RouteGateObservedRequest[]): string[] {
    return requests.map((r) => `${r.method} ${r.template}`);
}

/**
 * Run one drive call against the gate server.
 *
 * The gate server answers every REGISTERED route with `{}`, so a client method
 * that parses a field out of the response (e.g. `.map` over an array) may throw
 * a SHAPE error. That is a harness artifact, not a route defect — the module's
 * own tests pin response shapes with fixtures. The route-defect signal is
 * unambiguous: the gate server 404s ONLY unregistered urls, and `ApiClient`
 * throws `ApiError` on any non-2xx — so an `ApiError` here IS the gate firing,
 * and it fails the test at the exact call that minted the bad url.
 */
export async function driveGated(
    server: RouteGateServer,
    label: string,
    fn: () => Promise<unknown>,
): Promise<void> {
    const before = server.requests.length;
    try {
        await fn();
    } catch (e) {
        if (e instanceof ApiError) {
            const observed = server.requests.slice(before);
            const last = observed.length > 0 ? observed[observed.length - 1]! : null;
            const at = last ? `${last.method} ${last.path}` : 'unknown url';
            throw new Error(`route gate — ${label}: request to an unregistered url (${at}) → ${e.status}`);
        }
        // Shape artifact of the `{}` bodies — recorded-request assertions below
        // remain the ground truth for route pinning.
    }
}

/**
 * The gate's core assertions over everything a module drove:
 *
 * 1. ANTI-VACUITY — the drive really issued at least `minRequests` requests.
 * 2. NO 404 — every requested url is one the server registers (the defect
 *    layer: a client calling a url that never existed reds here).
 * 3. TUPLE-EXACT — every observed `[method, template]` is a manifest member by
 *    exact equality, and the DISTINCT set is pinned exactly (`expected`): a
 *    rename absorbed by a wildcard sibling changes the set and reds.
 */
export function expectGateClean(
    server: RouteGateServer,
    expectedDistinct: ReadonlyArray<string>,
    minRequests = expectedDistinct.length,
): void {
    expect(server.requests.length).toBeGreaterThanOrEqual(minRequests);

    const notOk = server.requests.filter((r) => r.status !== 200);
    expect(notOk.map((r) => `${r.method} ${r.path} → ${r.status}`)).toEqual([]);

    for (const r of server.requests) {
        if (!isRegisteredRoute(r.method, r.template)) {
            throw new Error(`route gate — observed ${r.method} ${r.template}, not in the server manifest`);
        }
    }

    const distinct = [...new Set(observedRouteKeys(server.requests))].sort();
    expect(distinct).toEqual([...expectedDistinct].sort());
}