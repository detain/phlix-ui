---
description: How to test the src/api clients — the shared wire-level fetch harness vs. a fake ApiClient seam, and the typecheck traps.
paths:
  - src/api/test/memoryTokenStore.ts
  - src/api/admin/servers.test.ts
  - src/api/admin/transcoding.test.ts
  - src/api/admin/networkHealth.test.ts
  - src/api/syncplay.test.ts
---

# API client tests

- Two harnesses — pick by what you are proving:
  - **Wire level** (URL, method, envelope unwrapping): build a real `ApiClient` with
    `new ApiClient({ baseUrl, tokenStore: new MemoryTokenStore({ access: 'tok-1' }), fetchImpl })`,
    where `fetchImpl` comes from `makeFetch([...])` in `src/api/test/memoryTokenStore.ts`. Assert on
    `calls[0]!.url` / `calls[0]!.init!.method`. See `src/api/admin/servers.test.ts` and
    `src/api/admin/transcoding.test.ts`.
  - **Seam level** (branch per endpoint): pass a `vi.fn()` fake in place of the `ApiClient` — see
    `src/api/admin/networkHealth.test.ts`.
- `makeFetch(scenarios)` replays `scenarios` **in call order**, one per `fetch`, then falls back to
  `{ status: 500, body: {} }` once exhausted — a client that makes N calls needs N entries. Pass
  `json: false` on a scenario to serve `text/plain` instead of `application/json`.
- `ApiClient.get()` resolves `{ data: T }`, **not** a bare `T`. A fake that resolves the payload
  directly still passes — against the wrong shape.
- A `vi.fn` async mock returning DIFFERENT object shapes per branch makes `vue-tsc` infer an
  over-narrow union (members become `never[]`). Widen it:
  `vi.fn(async (url: string): Promise<Record<string, unknown>> => { ... })`. `vitest` is green either
  way — only `npx vue-tsc --noEmit` catches it, so run both.
- Pin normalizers **as written**, not as intended: `src/api/admin/servers.test.ts` asserts
  `asBool(false, true) === true`. If that is wrong, fix the helper and the test together.
- Not everything is mockable: `SyncPlayApi` constructs its own `ApiClient` internally, so
  `src/api/syncplay.test.ts` covers only construction / singleton / type surface and leaves the
  WebSocket paths to the `useSyncPlayStore` integration tests.
- Vitest allows 30 s per test and per hook (`testTimeout` / `hookTimeout` in `vite.config.ts`) —
  accumulated jsdom state in a full-suite run blows the 5 s default. Don't lower it to mask a slow
  suite.
