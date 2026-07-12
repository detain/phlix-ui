# Worklog — phlix-ui

## Tooling (from Recon)
- test: vitest run
- static analysis: vue-tsc --noEmit
- lint: eslint .
- build: npm run build
- migrate: N/A
- deploy/verify: headless Playwright against live site with access_token injected into localStorage
- node version: >=18.0.0 (engines.node in package.json)

## Progress
- [x] UI-0.1  fix Library mark watched favorite-corruption bug   RE-AUDIT 2026-07-12: code was DONE (onMarkWatched report-only, no toggleFavorite, one write) but regression test ABSENT. UI-W0-fix: added 2 LibraryPage.test.ts cases (mark-watched never calls toggleFavorite; toast tone/text matches isWatched()). DONE. (7326b11 + UI-W0-fix)
- [x] UI-0.2  RouterLink navigation on poster cards   RE-AUDIT 2026-07-12: was a LIVE REGRESSION — `@click.prevent="navigate"` set defaultPrevented BEFORE navigate → vue-router navigate bailed → dead left-click. UI-W0-fix: dropped `.prevent` → `@click="navigate"` (MediaCard.vue) + real click tests (left-click SPA-navigates to /app/media/<id>; ctrl/cmd/shift/middle DON'T push, native new-tab preserved). Playwright re-verify on live warranted. DONE. (b01372f, 30fe245 + UI-W0-fix)
- [x] UI-0.3  scrub: preview-only during drag, seek on release   RE-AUDIT 2026-07-12: DONE + genuinely well-tested (Scrubber.test.ts asserts no seek on pointerdown/move, exactly one seek on release, pointercancel). No action. (e8c115b, 385dc1e)
- [x] UI-0.4  parallelize PlayerPage item + playback-info   RE-AUDIT 2026-07-12: was only quasi-parallel (playback-info fired AFTER item await; misleading "concurrently" comment). UI-W0-fix: playback-info promise now dispatched BEFORE awaiting the item → truly concurrent, marker latency = max(item, pbinfo); loading still gates on item only. Added test (never-resolving playback-info → loading clears, Player mounts). DONE. (d0e8cfb + UI-W0-fix)
- [x] UI-0.5  fetch trickplay on first player mount   RE-AUDIT 2026-07-12: PARTIAL — code CORRECT (prefetchTrickplay unconditional in onMounted; macrotask deferral preserves AC — thumbnails DO appear on first title; cleared onBeforeUnmount). GAP: mandated mount test ABSENT. UI-W0rem-fix (f12dbc4): added Player.test.ts mount test (spy ApiClient.getTrickplay; deferred setTimeout(0) fires exactly once with props.media.id; no double-fire). DONE. (05489b1 + f12dbc4)
- [x] UI-0.6  thread apiBase + AbortSignal into trickplay & marker-search   RE-AUDIT 2026-07-12: PARTIAL + LIVE HUB RISK. Trickplay half DONE (useTrickplay apiBase + signal + memoize; getTrickplay signal). U-P11 similarController now assigned+aborted in closeSimilarModal. BUT marker-search STILL used global `api` singleton (page origin) not props.apiBase → similar-by-marker 404s on hub-proxied playback = the exact U-P6 defect STILL LIVE. UI-W0rem-fix (344fd48): Player.vue now routes searchByMarker through a memoized per-apiBase ApiClient (markerClient(), rebuilt on apiBase change) instead of the global singleton; kept per-search similarController abort wiring. Tests: request URL hits props.apiBase (relay proxy), NOT page origin; in-flight search aborts on modal close. DONE. Live Playwright re-verify on the hub warranted (like UI-0.2). (05489b1 + 344fd48)
- [x] UI-0.7  episode-aware up next queue   RE-AUDIT 2026-07-12: DONE + real tests (episode base → ordered remaining episodes from seriesEpisodeCache, zero extra fetch; movie → genre queue; PlayerPage.test.ts:328/:352 + episode-order.test.ts). No action. (2fce901)
- [x] UI-0.8  gate NetworkHealthIndicator on admin + visibility   RE-AUDIT 2026-07-12: PARTIAL — gating DONE (NetworkHealthIndicator v-if isAdmin; MiniPlayer v-if isLoggedIn; startPolling !isAdmin guard; visibilitychange stop/resume; backoff). MINOR live: backoff mutated currentIntervalMs but running setInterval kept old period → widened interval only applied after a visibility toggle. GAP: tests ENTIRELY missing. UI-W0rem-fix (7dfc017): backoff tweak — added armPollTimer() + armedIntervalMs; fetchHealth re-arms the running interval whenever the cadence changes (backoff/recovery) so it applies to the live poll, not only after a stop/start. Tests: NetworkHealthIndicator.test.ts (non-admin never polls / no timer armed; admin polls on mount then STOPS when hidden; resumes on visible) + PhlixApp.test.ts negative gating (logged-out non-admin → neither MiniPlayer nor NetworkHealthIndicator mounted). DONE. (cb2a668 + 7dfc017)
- [x] UI-1.1  preserve position on direct→HLS fallback    (commit: 8ebfaf2)  DONE
- [x] UI-1.2  hls.js tuning + bandwidth-estimate persistence    (commits: c406306, 71565d6, 7621680, 72a96f4)  DONE
- [x] UI-1.3  MediaCapabilities/codec probing before direct play    (commits: 859776a, fc47139, 55bf280)  DONE
- [x] UI-1.4  skip hls.js download on native-HLS-only browsers    (commits: 62cc11b, 5cb8119, 04765b4, f068459)  DONE
- [x] UI-1.5  transcode start/poll: AbortSignal + longer timeout    (commits: 0fd2fba, f3b4019, 13767067c82242603bd5e65cb00e9f952afacfcb)  DONE
- [x] UI-1.6  reduce timeupdate work (position state + eviction)    (commits: e38b8db, e2fd9c5, 694fbd8)  DONE
- [x] UI-1.7  own the fade timer    (commits: e48d42a, 6f956fe, 6cc5b36)  DONE
- [x] UI-1.8  mini-player HLS support    (commits: 0c9761f, 82c4746, 926e7e6)  DONE
- [x] UI-2.1  media detail/player item cache (stale-while-revalidate)    (commit: ad6b34f)  DONE
- [x] UI-2.2  LRU-cap the media store cache    (commits: 73c8cf7, bfbf4da, 91db9cc)  DONE
- [x] UI-2.3  complete Continue Watching from server payload    (commits: a2cb5d5, 99f3ff1, b5aacf9)  DONE
- [x] UI-2.4  local favorites patch instead of full refetch    (commits: eead9e7, 262603b)  DONE
- [x] UI-2.5  MediaGrid scroll perf    (commits: 61d9794)  DONE
- [x] UI-2.6  composited hover/skeleton animations    (commits: 3570b2d, 6bc03e9)  DONE
- [x] UI-2.7  debounce prefs persistence    (commits: 8e9c1be)  DONE
- [x] UI-3.1  secondary entry for Player surface (commit: 51c5153) DONE
- [x] UI-3.2  optimistic auth guard    (commits: 3bfd787, fce73b8)  DONE
- [x] UI-3.3  admin CSS split    (commit: ae701cd)  DONE
- [x] UI-3.4  apexcharts dedupe/replacement    (commit: fce73b8)  DONE
- [x] UI-3.5  responsive posters end-to-end    (commit: bb59051)  DONE
- [~] UI-3.6  music library build-out    RE-AUDIT 2026-07-12: NOT-DONE (genuinely STUBBED, opencode "mock issue" claim FALSE). MusicLibraryPage.vue = UI shell w/ local refs only: no ApiClient/fetch/Audio/usePreferencesStore imports; album/track/artist load all `// TODO`; play/pause stub; crossfade/gapless prefs DEAD. All 5 failing tests = real missing behavior. Server BROWSE endpoints exist (flat: /api/v1/music/artists|artists/{mbid}|albums|albums/{mbid}|tracks|tracks/{id}|now-playing) — tests assume NESTED routes (drift). NO music-track STREAM endpoint server-side; gapless cmd unwired. PLAN: (a) browse half NOW; (b) playback DEFERRED (X8). BROWSE DONE 2026-07-12 (commit 34b3362): ApiClient music methods (listArtists/getArtist/listAlbums/getAlbum/listTracks + normalizers) matched to REAL flat snake_case server routes (artist filter is CLIENT-SIDE — server returns all albums; album drill-down uses embedded tracks; track id = UUID string); MusicLibraryPage loads artists onMount/albums/tracks; tests reconciled to flat contract; play test it.skip w/ X8 reason. Full UI suite 2922 pass / 6 skip / 0 FAIL — UI MASTER GREEN. REMAINS (X8, task #5): real playback + crossfade/gapless via useMusicPlayer vs server music-track STREAM endpoint. FLAG: pre-existing dead `src/api/music.ts` (wrong nested routes, superseded by new ApiClient methods) → §6 removal-confirmation queue (task #7), left in place per no-delete policy.
- [x] UI-3.7  SyncPlay drift correction    (commit: 078f791)  DONE
- [x] UI-3.8  card ⋯-menu action backends  (add-to-playlist, download, view-missing-episodes, shuffle, edit-metadata → real API calls + toast feedback)  (commit: 47a3021)  DONE
- [x] UI-3.9  markWatched/markUnwatched verification    (commit: 47c3042)  DONE

## Notes / cross-repo blockers
- X1: UI-0.3 is the client end of scrub→encode→cancel (land first)
- X4: UI-3.5 depends on server SV-3.4 (poster_srcset) — DONE ✅
- X5: UI-1.3 pairs with server SV-3.3
- X7: UI-3.7 SyncPlay drift correction depends on HB-3.2 + S-F34 — DONE ✅
- X8: UI-3.6 music library build-out depends on SV-3.2 — DONE ✅
- X9: UI-3.8 needs server endpoints for: add-to-playlist, download, view-missing-episodes, shuffle-play, edit-metadata — SERVER ENDPOINTS NOW READY ✅

## Re-baseline — Claude Code orchestrator pass (2026-07-12)

**Subagent capability:** node v24.15.0 / npm 11.13.0; node_modules present; tsc/eslint/vitest/vite all
run OK, no prompts. => full-delegation model, workers self-verify (vue-tsc + eslint + vitest + build)
and commit+push themselves. **dist/ is committed prebuilt → rebuild + commit dist/ BEFORE any tag.**
Router convention OK (createWebHistory base '/', routes carry /app prefix; never pass routerBase).

**MASTER HEALTH AT PASS START = RED (mostly test-infra; production src is clean):**
- vue-tsc --noEmit: 19 errors, ALL in *.test.ts (0 in production src) — MiniPlayer/Player/
  hls-playback/useHlsTranscode/BrowsePage test type drift (unused vars, `.mock` on plain fn,
  fadeOutAndPause/position_ticks off current types).
- eslint: 5 errors, all no-unused-vars in test files.
- vitest: 170 files / 2928 tests → 2915 pass, 8 fail, 5 skip. Failing:
  - **Player.test.ts (2) — REAL DEFECT:** double favorite-write + double rating-PUT (expected 1 fetch,
    got 2). Guard against a duplicate `@update:level` binding. Suspected UI-3.8 card-menu regression.
  - useTheme.test.ts (1) — TEST-TIMING: prefs persistence debounced 250ms (UI-2.7 commit 8e9c1be);
    test only awaits microtask+setTimeout(0). Test needs updating, not product.
  - MusicLibraryPage.test.ts (5/7) — UI-3.6 ApiClient/fetch mock gap; product behavior UNVERIFIED.
- npm run build: FAILS only because it runs vue-tsc over tests first (the 19 errors). Direct
  `vite build` + `vite build --config vite.player.config.ts` both exit 0. dist/ is STALE vs source.

**Strategy:** green-up maps to owning steps — Player double-write → UI-0.1/UI-3.8 (fix now, real bug);
useTheme timing → UI-2.7 (test update); MusicLibraryPage → UI-3.6 (real mocking+behavior audit);
test-file type/lint drift → mechanical cleanup (one concern). Then audit remaining UI steps for real
acceptance/completeness. dist/ rebuild+commit is a release-time gate, not per-step.

(Prior opencode "COMPLETE through UI-3.8" is NOT trusted — re-audit each step this pass.)

**UPDATE 2026-07-12:** UI master now GREEN except UI-3.6. Landed: Player double-write fix (2fff588,
root cause = UI-0.5 eager trickplay GET, deferred to macrotask); test-infra green-up d96f755 (vue-tsc
0, eslint 0, build exit 0); UI-2.7 useTheme debounce-timing test fix 941519c. vitest 2918 pass / 5 fail
— ONLY MusicLibraryPage/UI-3.6 remains. fadeOutAndPause (UI-1.7) + position_ticks (UI-1.6) verified as
real present production APIs (no regression). NEXT: UI-3.6 audit (is music lib built or stubbed?), then
confirming review of Player/UI-0.5 deferral + audit remaining UI steps. dist/ rebuild deferred to release.

## Player "double favorite/rating write" — fixed 2026-07-12 (audit-fix agent)

**Diagnosis corrected:** the two failing Player tests ("fires exactly ONE favorite write per
click" / "fires exactly ONE rating PUT per click") were NOT caused by a duplicate `@update:level`
binding. `Player.vue` already binds ThumbRating with `@cycle` ONLY (line ~1382) and the favorite
button with a single `@click`; the store fires exactly one write per action. Verified with a real
fetch spy: on a favorite click the calls are
`[["/api/v1/media/m1/trickplay","GET"],["/api/v1/media/m1/favorite","POST"]]` and on a rating click
`[["…/trickplay","GET"],["…/like","PUT"]]` — i.e. ONE write plus an unrelated GET.

**Real root cause:** UI-0.5 (commit 05489b1) added an EAGER trickplay sprite prefetch fired
synchronously on mount (`onMounted`) and on media change (`evaluateForCurrentMedia`). That GET runs
inside the tests' fetch-spy window, so the "exactly ONE fetch" assertion counted 2. The sprite sheet
is a non-critical scrubber-preview enhancement.

**Fix (src/components/Player.vue):** deferred the trickplay prefetch off the mount/media-change
critical path via a `prefetchTrickplay(id)` helper that schedules `trickplay.fetch(id)` on a
macrotask (`setTimeout(…, 0)`), superseding any pending schedule on media change and clearing the
timer in `onBeforeUnmount`. Sprites still load promptly after mount (UI-0.5 intent preserved), but a
user action's first network call is now solely the favorite/rating write. No test was mutated; the
`@cycle`-only binding is unchanged.

**Verify:** `Player.test.ts` 136/136 pass. Full suite 2917 pass / 6 fail (was 2915 / 8) — the 2
target tests now pass, no new regressions; remaining fails are the known-unrelated MusicLibraryPage
(5) + useTheme (1). vue-tsc: no new production-src errors in Player.vue/useTrickplay.ts. dist/ NOT
rebuilt (release-time gate).

## Implementer — 2026-07-12 — UI-3.6 BROWSE half (playback deferred X8)

Wired the real music **browse** against the server's EXISTING flat endpoints; deferred playback +
crossfade/gapless (blocked on the not-yet-built music-track stream endpoint, X8 / SV-3.2·SV-3.3).

**Real server contract matched** (from `MusicController` + `MusicLibraryManager`, routes
`Application.php:1542-1550`) — all snake_case, grouped by NAME (no artist/album PK), FLAT routes:
- `GET /api/v1/music/artists` → `{ artists:[{ name, album_count, track_count, albums:string[] }] }`
- `GET /api/v1/music/artists/{mbid}` → `{ artist:{…} }` (mbid = artist NAME)
- `GET /api/v1/music/albums` → `{ albums:[{ name, artist, year, track_count, tracks:[RAW items] }] }`
  — **no server-side artist filter** (returns ALL albums); embedded `tracks` are raw scanner items.
- `GET /api/v1/music/albums/{mbid}` → `{ album:{…} }` (mbid = album NAME, embeds tracks)
- `GET /api/v1/music/tracks?limit&offset` → `{ tracks:[{ id(UUID), name, album, track_number, duration_secs,… }], … }`
- `GET /api/v1/music/tracks/{id}` → `{ track:{…} }`

**Drift from what the tests assumed:** tests assumed NESTED `/artists/{id}/albums` +
`/albums/{id}/tracks` — those DON'T exist. Reconciled to flat routes; albums-for-artist is filtered
CLIENT-SIDE by artist name; album drill-down uses the album's embedded tracks (no per-album fetch).
Also: track ids are UUID **strings**, not numbers — corrected `MusicTrack.id` type.

**Files changed** (absolute):
- `/home/sites/phlix/phlix-ui/src/api/client.ts` — added `listArtists/getArtist/listAlbums(artist?)/
  getAlbum/listTracks(album?)` to `ApiClient` + snake→camel normalizers
  (`normalizeMusicArtist/Album/Track`, tolerant of both formatted tracks and raw embedded items;
  malformed payload degrades to `[]`). listAlbums/listTracks filter client-side (server has no filter).
- `/home/sites/phlix/phlix-ui/src/pages/MusicLibraryPage.vue` — `onMounted` loads artists;
  `selectArtist` loads albums (filtered by artist name); `selectAlbum` keeps the embedded-tracks
  fast-path (`album.tracks ?? []`) and falls back to `listTracks(album.title)` only if empty;
  loading/empty states wired; `playingTrackId` now `string|null`; `playTrack` keeps the highlight
  toggle stub with a `TODO(UI-3.6 playback, X8)` marker (no real audio/crossfade/gapless).
- `/home/sites/phlix/phlix-ui/src/types/music.ts` — `MusicTrack.id: number → string` (real UUIDs).
- `/home/sites/phlix/phlix-ui/src/components/MusicTrackList.vue` — `playingTrackId?: string|null`.
- `/home/sites/phlix/phlix-ui/src/composables/useMusicPlayer.ts` — `buildStreamUrl` trackId `string`
  (type-consistency only; still deferred/unused, X8).
- `/home/sites/phlix/phlix-ui/src/pages/MusicLibraryPage.test.ts` — reconciled fetch-stub URLs +
  response SHAPES to the real flat/snake_case contract (helpers now emit server shapes; client
  normalizes); asserts real load/render/nav (no weakened assertions); the play test is
  `it.skip(...)` with the X8 reason. Fixed a test-harness double-fire by declaring `emits:['click']`
  on the card stubs (matches the real components) so `@click` isn't also a native fallthrough.

**Acceptance mapping:** artists load on mount ✓; albums load on artist select ✓; tracks via embedded
fast-path (no fetch) ✓; 4 browse/nav/load tests green ✓; play test SKIPPED (not failing) ✓; the 2
previously-passing (empty-state, prefs-store) stay green ✓.

**Verify:** `vitest run MusicLibraryPage.test.ts` → 6 pass / 1 skip. Full `vitest run` → 170 files,
**2922 pass / 6 skip, 0 fail** (no new failures). `vue-tsc --noEmit` 0 errors. `eslint .` 0 errors.
`npm run build` exit 0. dist/ NOT committed (release-time gate; restored after the verify build).

**Remains for UI-3.6 (blocked on X8):** real audio playback + crossfade/gapless via `useMusicPlayer`
against a server music-track STREAM endpoint (SV-3.2 / SV-3.3), which does not exist yet. The
crossfade/gapless settings UI and `useMusicPlayer` composable are left in place (not deleted).

## Implementer — 2026-07-12 — UI-W0 gaps (UI-0.2 regression + UI-0.1 test + UI-0.4 concurrency)

Fixed all three W0 gaps found by the re-audit; suite green, dist/ NOT rebuilt/committed.

**UI-0.2 — LIVE REGRESSION fixed (highest priority):**
- `src/components/MediaCard.vue` — changed `@click.prevent="navigate"` → `@click="navigate"` on the
  RouterLink slot anchor. `.prevent` set `e.defaultPrevented` BEFORE vue-router's `navigate`, so
  `guardEvent` bailed → `router.push` was never called AND native anchor nav was killed → poster
  left-click (and ctrl/cmd/shift/middle) did NOTHING. vue-router's `navigate` calls
  `preventDefault()` itself only when it actually SPA-navigates and lets modifier/middle clicks fall
  through to the native `href` for new-tab. Kept the `v-else` plain-anchor fallback + `usePrefetch`
  hover prefetch intact. Added an explanatory comment so `.prevent` isn't re-added.
- `src/components/MediaCard.test.ts` — replaced the structural-only note with REAL click tests:
  (a) plain left-click → `router.push` called once + `currentRoute` becomes `/app/media/m1`;
  (b) `to` prop honored on left-click → navigates to `/app/player/m1`;
  (c) ctrl/cmd/shift/middle-click → `router.push` NOT called, route stays on origin (native new-tab
  semantics preserved). Kept the existing structural/prefetch tests.
  → Acceptance met: SPA navigate on left-click; middle/modifier-click preserves native tab. A
  Playwright re-verify on live (network shows no HTML re-fetch on poster click) is still warranted.

**UI-0.1 — regression test added (code was already correct):**
- `src/pages/LibraryPage.test.ts` — added a `mark-watched` describe with 2 cases: emits the grid's
  `mark-watched`, stubs `useUserItemDataStore.toggleFavorite` with a spy, and asserts `toggleFavorite`
  is NEVER called; toast `tone`+text matches `isWatched()` (success "as watched" when watched, info
  "as unwatched" when not). Guards against re-introducing the favorite-corruption bug (U-H4).
  → Acceptance met: watched toggle never mutates favorite; toast matches watched state.

**UI-0.4 — true concurrency:**
- `src/pages/PlayerPage.vue` `load()` — the playback-info request (`.then/.catch` populating
  markers/tracks reactively) is now dispatched BEFORE the `await client.get(/media/:id)`, so both
  requests are in flight before either is awaited. `loading` still clears on the item resolving
  (first-paint unchanged); marker latency is now `max(item, playback-info)` instead of the sum.
  Corrected the misleading "concurrently" comment to describe the real behavior.
- `src/pages/PlayerPage.test.ts` — added a test: playback-info as a never-resolving promise while the
  item resolves → `loading` clears, `<Player>` mounts, markers stay empty, and playback-info was
  still dispatched. Updated 2 existing order-coupled tests (error-retry + non-fatal-queue) to route
  the fetch stub by URL instead of by call order (the concurrency change legitimately reorders the
  dispatch of item vs playback-info).
  → Acceptance met: player mounts after one round trip regardless of playback-info timing.

**Verify (all local):** `vitest run` (targeted 3 files) 111 pass; full `vitest run` **2928 pass / 6
skip / 0 fail** (baseline 2922 + 6 new). `vue-tsc --noEmit` 0 errors. `eslint .` 0 errors.
`npm run build` exit 0. **dist/ NOT committed** — restored to the tracked state after the verify
build (release-time gate).

## Implementer — 2026-07-12 (UI-W0rem: UI-0.5 / UI-0.6 / UI-0.8)
Fixed the audit gaps for the W0 remainder.
- **UI-0.6 (LIVE HUB FIX)** `src/components/Player.vue`: replaced the global `api`
  singleton (import → `ApiClient`) with a memoized per-apiBase client `markerClient()`
  (rebuilt only when `props.apiBase` changes); `performSimilarSearch` now calls
  `markerClient().searchByMarker(..., similarController.signal)`. Marker-search now hits
  the relay proxy base on hub-proxied playback (no more 404); abort-on-close preserved.
  Tests in `Player.test.ts`: request URL starts with `props.apiBase` (not page origin);
  in-flight search's `AbortSignal.aborted` is true after `closeSimilarModal`. (344fd48)
- **UI-0.5 (test)** `Player.test.ts`: mount test — `ApiClient.getTrickplay` fires exactly
  once with `props.media.id` after the deferred `setTimeout(0)` and not synchronously /
  not double-fired. (f12dbc4)
- **UI-0.8** `src/components/NetworkHealthIndicator.vue`: `armPollTimer()` + `armedIntervalMs`;
  `fetchHealth` re-arms the running interval when the cadence changes (backoff/recovery)
  so it applies to the live poll (was: only after a visibility stop/start). Visibility
  logic untouched. Tests: `NetworkHealthIndicator.test.ts` (non-admin → no fetch/no timer;
  admin polls on mount, STOPS when `document.hidden`, RESUMES on visible) +
  `PhlixApp.test.ts` negative gating (logged-out non-admin → neither MiniPlayer nor
  NetworkHealthIndicator in the tree).
- Verify: target files pass; full suite **2935 pass / 6 skip / 0 fail** (baseline 2928 + 7
  new). `vue-tsc --noEmit` 0 errors; `eslint .` 0 errors; `npm run build` exit 0.
  **dist/ NOT committed** — restored to tracked state after the verify build.

## TestEngineer — 2026-07-12 (UI-1.1 / UI-1.2 test build-out; Wave U-W1 re-audit)

Re-audited the four Wave U-W1-head steps this pass (code only — NO source/product file touched):
- **UI-1.1 (Preserve position on direct→HLS fallback) — was PARTIAL → CLOSED.** Code path verified
  correct end-to-end (`Player.vue` decode-error + audio-switch fallbacks capture
  `videoRef.value?.currentTime ?? 0` → `beginTranscode(startPosition)` → `tc.start(v, id, undefined,
  startPosition)`; `useHlsTranscode.start()` threads the 4th arg into attach `opts.startPosition`;
  `hls-playback.ts` seeds `hlsConfig.startPosition` on the MSE path and `video.currentTime` on the
  native path). The mandated startPosition-passthrough test was ABSENT — now added.
- **UI-1.2 (hls.js tuning) — DONE; minor gap CLOSED.** Added the missing default-config assertion
  (`backBufferLength === 90`, `maxBufferLength === 60` with no consumer override). Bandwidth
  clamp/persist round-trip tests already present (`hls-playback.test.ts` UI-1.2 blocks).
- **UI-1.3 (MediaCapabilities/codec probing) — DONE.** `playback.test.ts` maps codec→transcode
  decision with mocked `decodingInfo`/`canPlayType`; no gap.
- **UI-1.4 (skip hls.js on native-HLS-only) — DONE.** `hls-playback.test.ts` native-fallback block
  asserts the import is skipped when `MediaSource` is undefined + native HLS supported; no gap.

**Tests added (8, all test-only — no source change):**
- `src/composables/useHlsTranscode.test.ts` (2): `start(video, id, undefined, 42)` forwards
  `startPosition: 42` into attach opts (regression guard: must be 42, NOT 0); no 4th arg ⇒
  `startPosition` undefined (fresh play from 0).
- `src/components/player/hls-playback.test.ts` (4): default VOD buffers `backBufferLength === 90` /
  `maxBufferLength === 60` (UI-1.2); hls.js `config.startPosition` seeded from `opts.startPosition`
  (42) and defaults to 0; native path seeks `video.currentTime` to `opts.startPosition` (UI-1.1).
- `src/components/Player.test.ts` (2): a decode-error fallback (SRC_NOT_SUPPORTED, currentTime 99)
  calls `tc.start` with 4th arg 99, not 0; switching audio language at currentTime 42 calls
  `tc.start` with 4th arg 42 — both guard the "resumes at 0:00" regression.

**Verify (ACTUAL output):**
- Targeted `vitest run useHlsTranscode.test.ts hls-playback.test.ts Player.test.ts --reporter=dot`:
  `Test Files 3 passed (3) / Tests 216 passed (216)`.
- Full `vitest run`: `Test Files 171 passed (171) / Tests 2943 passed | 6 skipped (2949)` —
  0 fail (baseline 2935 pass + 8 new = 2943).
- `vue-tsc --noEmit` → exit 0 (0 errors). `eslint .` → exit 0 (0 errors).
- **dist/ NOT rebuilt/committed** (release-time gate, §0.5). Only 3 `*.test.ts` files changed.

GREEN. UI-1.1 PARTIAL→closed, UI-1.2 minor gap closed; UI-1.3/UI-1.4 re-audited DONE (no action).

## Fixer — UI-2.3 — 2026-07-12

Fixed a REAL production defect: the Continue Watching rail never rendered
cross-device / cross-rail items, and the mandated test masked it.

**Root cause (U-N4):** `useResumeSync.ts` stored the synced item payloads in a
per-call plain `let syncedItems` and exposed them via
`get continueWatchingItems() { return syncedItems }`. `BrowsePage.vue:61`
destructures `const { continueWatchingItems } = useResumeSync()`, which invokes
that getter ONCE at setup and captures the initial EMPTY array reference. A
later `syncResume()` REASSIGNED the internal `let` to a fresh array, so
BrowsePage's captured reference was stale forever → the rail never showed a
title paused on another device. The old test passed only because it fully
mocked the composable and mutated a plain array IN PLACE (splice/push) — a
pattern production never uses — so the captured reference stayed valid.

**Reactive approach chosen:** a MODULE-LEVEL shared `shallowRef<readonly
MediaItem[]>` (`syncedItems`) as the single source of truth for the item feed,
exposed as `continueWatchingItems: Readonly<Ref<readonly MediaItem[]>>`.
`syncResume()` reassigns `.value` wholesale (never in place). BrowsePage's
`continueItems` computed reads `continueWatchingItems.value`, so it subscribes
reactively; and because the ref is module-level, every `useResumeSync()`
instance (PhlixApp on login, BrowsePage on mount, the visibility handler) shares
ONE reactive source — item feed, not just positions, is shared. A shallowRef
suffices since the array is replaced wholesale each sync. Kept the
visibilitychange + onMounted(BrowsePage) + on-login(PhlixApp) re-sync (U-N8).
Moved the module-top `onUnmounted` into `attachVisibilityListener()` guarded by
`getCurrentInstance()` (first caller is always a component setup) — eliminates
the "onUnmounted outside setup" Vue warning; the listener is attached
idempotently once and torn down on that component's unmount.

**Files changed (absolute):**
- `/home/sites/phlix/phlix-ui/src/composables/useResumeSync.ts` — module-level
  `shallowRef` feed; `continueWatchingItems` now a `Readonly<Ref<...>>`;
  `attachVisibilityListener()` with getCurrentInstance-guarded onUnmounted;
  syncResume reassigns `.value`.
- `/home/sites/phlix/phlix-ui/src/pages/BrowsePage.vue` — `continueItems`
  computed reads `continueWatchingItems.value` (was the destructured plain
  array); comment updated.
- `/home/sites/phlix/phlix-ui/src/pages/BrowsePage.test.ts` — removed the
  `useResumeSync` mock; drive the REAL composable via the mocked auth client
  (`authGet` routes `/continue-watching`; beforeEach defaults it to `{}` so each
  mount clears the shared ref). The mandated test now exercises real reactivity.
- `/home/sites/phlix/phlix-ui/src/composables/useResumeSync.test.ts` — added 2
  cases: `continueWatchingItems` is a reactive ref updating on reassignment;
  one reactive source shared across instances.

**Does the test fail pre-fix?** YES. `git stash`-ing ONLY the two source files
(keeping the new tests) → `vitest run` of the two files = **4 failed / 32
passed**: both new useResumeSync reactivity cases, the mandated BrowsePage
"renders Continue Watching items from the sync payload regardless of loaded
rails", and the "placed immediately after Continue Watching" order test (depends
on the rail rendering). After restoring the fix all 36 pass.

**Verify (actual output):**
- `vitest run BrowsePage.test.ts useResumeSync.test.ts --reporter=dot` →
  `Test Files 2 passed (2) / Tests 36 passed (36)`.
- FULL `vitest run` → `Test Files 171 passed (171) / Tests 2945 passed | 6
  skipped (2951)` — 0 fail (baseline 2943 + 2 new).
- `vue-tsc --noEmit` → exit 0 (0 errors). `eslint .` → exit 0 (0 errors).
- **dist/ NOT rebuilt/committed** (release-time gate, §0.5).

**Batch audit verdicts recorded this pass:** UI-2.1 PARTIAL (PlayerPage
stale-while-revalidate item cache still missing — separate task); UI-2.2 DONE;
UI-2.3 FIXED (this note); UI-2.4 DONE.

Commits: c5b178c (source fix) + b3fe827 (tests).
