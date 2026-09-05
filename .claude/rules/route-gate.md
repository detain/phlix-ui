---
description: The client route gate — driving src/api clients through a fake server that serves ONLY the vendored phlix-server route manifest, and how to re-vendor that manifest.
paths:
  - src/api/test/routeGateServer.ts
  - src/api/test/server-route-manifest.json
  - src/api/test/routeGate.api.test.ts
  - src/api/test/routeGate.admin.test.ts
  - src/api/test/routeGate.app.test.ts
  - src/api/test/routeGate.enumeration.test.ts
  - src/api/test/routeGate.harness.test.ts
---

# Client route gate

- `makeRouteGateServer(baseUrl, options?)` in `src/api/test/routeGateServer.ts` serves ONLY the 400
  `[method, pathTemplate]` tuples of `SERVER_ROUTE_MANIFEST` and answers a real **404** to anything
  else, which `ApiClient` turns into a thrown `ApiError` exactly as the live server would. Use it —
  not `makeFetch([...])` — whenever the claim is "the client calls a url phlix-server registers":
  `makeFetch` replays canned responses in call order and therefore 200s ANY url.
- Matching is TUPLE-EXACT. Every `{param}` compiles to `[^/]+` (one path segment), so
  `/api/v1/media/{id}` can never absorb `/api/v1/media/{id}/markers`, and a right-path/wrong-method
  request is a 404.
- Each module's gate pins three things, via `driveGated` + `expectGateClean(server, EXPECTED, n)`:
  anti-vacuity (the drive really issued ≥N requests), no 404, and the exact DISTINCT
  `[method, template]` set. The set layer is load-bearing — the 404 layer alone cannot see a rename
  that a `{id}` sibling absorbs (`most-watched-MUTATED` still dispatches to `GET /api/v1/media/{id}`).
- `src/api/test/server-route-manifest.json` is the canonical phlix-contracts export
  (`dist/server-route-manifest.json`) VENDORED VERBATIM. Never hand-edit it and never re-derive it
  from the client under test — a client-derived manifest self-adjusts to whatever the client calls
  and can never fail. Re-vendoring = copy the new bytes, then move BOTH pins in
  `routeGate.api.test.ts` (`VENDORED_MANIFEST_MD5` = byte identity,
  `VENDORED_MANIFEST_SERVER_SHA` = server currency) and the tuple count if it moved.
- Prove the harness discriminates before trusting it: `routeGate.harness.test.ts` pairs every 404
  assertion with a SUCCEEDING control on a registered sibling, never with a second 404.
- Hub-addressed modules (`claimServer`, invite-links, mcp-tokens) are enumerated and asserted NOT to
  be server routes — their gate is the hub's contract.
- The manifest is imported only by `src/api/test/*.test.ts`, so it can never reach the app bundle;
  the one dist artefact it touches is `dist/api/test/routeGateServer.d.ts`, kept honest by
  `npm run dist:check`.
