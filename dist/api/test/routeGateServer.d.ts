/**
 * S280 — the general client route gate: a fake HTTP server that serves ONLY
 * what phlix-server actually registers, and answers a real **404** to anything
 * outside it.
 *
 * This generalises the S276 harness (`./syncplayServer.ts`, five SyncPlay
 * routes) to the FULL server surface: the 400 `[method, pathTemplate]` tuples
 * of `SERVER_ROUTE_MANIFEST` — the canonical phlix-contracts export
 * (`dist/server-route-manifest.json`, the union of the two phlix-server
 * ROUTE_MANIFEST constants), VENDORED VERBATIM, never transcribed by hand.
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
 * client happens to call and could never fail. The derivation lives
 * canonically in phlix-contracts (`scripts/generate-server-route-manifest.mjs`
 * → `src/routeManifest.generated.ts` → `dist/server-route-manifest.json`);
 * this repo consumes the EXPORT, not a second derivation of it.
 *
 * ⚠ VENDORED, not imported. `./server-route-manifest.json` is a byte-identical
 * copy of phlix-contracts `dist/server-route-manifest.json` (md5 pinned by
 * `routeGate.api.test.ts`). Vendoring is the sanctioned interim pattern: ui
 * pins `@phlix/contracts#v0.4.5`, which PREDATES this wave's provenance regen
 * (the regen itself ships untagged, s280rest doctrine), and the contracts `exports` map blocks
 * JSON subpath imports anyway. When the next contracts tag lands, switch this
 * import to the tagged package and drop the vendored copy.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 * S280GATEKEEPERX7Q9
 */
/** Provenance block of the canonical contracts export (shape pinned by the contracts generator). */
export interface ServerRouteManifestProvenance {
    serverSha: string;
    generatedAt: string;
    generator: string;
    sources: ReadonlyArray<{
        file: string;
        count: number;
    }>;
    shared: number;
    total: number;
}
/**
 * The EXACT set of `[method, pathTemplate]` tuples phlix-server registers,
 * tuple-exact — a request that matches by substring or prefix is a defect.
 * The explicit annotations below are load-bearing: they keep the JSON's
 * widened inference (string[][]) out of the emitted declarations and out of
 * any consumer's type graph. This file's only importers are
 * `src/api/test/*.test.ts` (vitest), so its manifest can never enter the app
 * bundle; the single dist artefact it can affect is this helper's own `.d.ts`,
 * which `npm run dist:check` keeps honest against the source.
 */
export declare const SERVER_ROUTE_MANIFEST: ReadonlyArray<readonly [string, string]>;
/** Provenance — the server commit + generator the vendored manifest was derived from. */
export declare const SERVER_ROUTE_MANIFEST_PROVENANCE: ServerRouteManifestProvenance;
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
export declare function makeRouteGateServer(baseUrl?: string, options?: RouteGateServerOptions): RouteGateServer;
/**
 * Tuple-exact membership test against the server manifest: `[method, template]`
 * compared as one joined string — never a substring, never a prefix.
 */
export declare function isRegisteredRoute(method: string, template: string): boolean;
/** `"METHOD /template"` keys of the requests a server observed (for diffing). */
export declare function observedRouteKeys(requests: RouteGateObservedRequest[]): string[];
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
export declare function driveGated(server: RouteGateServer, label: string, fn: () => Promise<unknown>): Promise<void>;
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
export declare function expectGateClean(server: RouteGateServer, expectedDistinct: ReadonlyArray<string>, minRequests?: number): void;
