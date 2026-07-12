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
- [x] UI-2.1  media detail/player item cache (stale-while-revalidate)    RE-AUDIT/COMPLETE 2026-07-12: was PARTIAL — MediaDetailPage's "module-level" cache actually lived INSIDE <script setup> (per-instance → cached NOTHING across navs) and PlayerPage had NO cache; dead guard `controller !== controller`; test absent. FIXED: extracted a genuine singleton `src/composables/useMediaItemCache.ts`, both pages use it, guard wired to `myController !== controller`, 11-case cache test added. DONE. (commits: d0615d7 source + e20c27d tests; supersedes opencode ad6b34f)
- [x] UI-2.2  LRU-cap the media store cache    (commits: 73c8cf7, bfbf4da, 91db9cc)  DONE
- [x] UI-2.3  complete Continue Watching from server payload    (commits: a2cb5d5, 99f3ff1, b5aacf9)  DONE
- [x] UI-2.4  local favorites patch instead of full refetch    (commits: eead9e7, 262603b)  DONE
- [x] UI-2.5  MediaGrid scroll perf + lazy overlay [U-R2]    (commits: 61d9794 scroll half; 0233d3a+13cef09 overlay lazy-mount half, a11y-preserving)  DONE
- [x] UI-2.6  composited hover/skeleton animations    (commits: 3570b2d, 6bc03e9)  DONE
- [x] UI-2.7  debounce prefs persistence    (commits: 8e9c1be)  DONE
- [x] UI-3.1  secondary entry for Player surface (commit: 51c5153; completed 2026-07-12 — see note below) DONE
- [x] UI-3.2  optimistic auth guard    (commits: 3bfd787, fce73b8)  DONE
- [x] UI-3.3  admin CSS split    (commit: ae701cd)  DONE
- [x] UI-3.4  apexcharts dedupe/replacement    (commit: fce73b8)  DONE
- [x] UI-3.5  responsive posters end-to-end    (commit: bb59051)  DONE
- [~] UI-3.6  music library build-out    RE-AUDIT 2026-07-12: NOT-DONE (genuinely STUBBED, opencode "mock issue" claim FALSE). MusicLibraryPage.vue = UI shell w/ local refs only: no ApiClient/fetch/Audio/usePreferencesStore imports; album/track/artist load all `// TODO`; play/pause stub; crossfade/gapless prefs DEAD. All 5 failing tests = real missing behavior. Server BROWSE endpoints exist (flat: /api/v1/music/artists|artists/{mbid}|albums|albums/{mbid}|tracks|tracks/{id}|now-playing) — tests assume NESTED routes (drift). NO music-track STREAM endpoint server-side; gapless cmd unwired. PLAN: (a) browse half NOW; (b) playback DEFERRED (X8). BROWSE DONE 2026-07-12 (commit 34b3362): ApiClient music methods (listArtists/getArtist/listAlbums/getAlbum/listTracks + normalizers) matched to REAL flat snake_case server routes (artist filter is CLIENT-SIDE — server returns all albums; album drill-down uses embedded tracks; track id = UUID string); MusicLibraryPage loads artists onMount/albums/tracks; tests reconciled to flat contract; play test it.skip w/ X8 reason. Full UI suite 2922 pass / 6 skip / 0 FAIL — UI MASTER GREEN. REMAINS (X8, task #5): real playback + crossfade/gapless via useMusicPlayer vs server music-track STREAM endpoint. FLAG: pre-existing dead `src/api/music.ts` (wrong nested routes, superseded by new ApiClient methods) → §6 removal-confirmation queue (task #7), left in place per no-delete policy.
- [x] UI-3.7  SyncPlay drift correction    (commit: 078f791; tests hardened 2026-07-12 — see TestEngineer note below)  DONE
- [x] UI-3.8  card ⋯-menu action backends  (add-to-playlist, download, view-missing-episodes, shuffle, edit-metadata, explore-item-data → real API calls / host emits + toast feedback; all 6 actions real + per-action tested)  (commit: 47a3021 + Fixer 2026-07-12)  DONE
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

## Implementer — UI-2.1 — 2026-07-12

Closed the UI-2.1 gaps flagged by the Fixer/UI-2.3 audit (PARTIAL): PlayerPage
had no SWR item cache (half the AC), the mandated cache test was absent, and
MediaDetailPage carried a dead guard. Also uncovered — and fixed — a REAL latent
defect: the SWR cache was NEVER effective in production.

**Root defect found (why the cache did nothing):** MediaDetailPage declared its
`mediaItemCache = new Map()` / `MEDIA_CACHE_TTL_MS` / `CachedMediaItem` at the top
of `<script setup>`. Vue compiles `<script setup>` bodies into the component's
`setup()` function, so those `const`s are RECREATED on every mount — the cache was
per-instance, not module-level. Every route navigation remounts the page with a
fresh EMPTY map, so `browse→detail→back→detail` refetched every time (the exact
U-N2 finding the step was meant to fix). A probe test confirmed a second mount of
the same id within the TTL still issued the by-id fetch. Only `import` statements
are hoisted to module scope from `<script setup>`; a true singleton must live in a
separate module.

**How the cache is now shared (new module):**
`src/composables/useMediaItemCache.ts` — a genuine module-level singleton
`Map<id,{item,ts}>` with `MEDIA_CACHE_TTL_MS = 60_000` and a small API:
`getMediaItemCacheEntry`, `isMediaItemCacheFresh(entry, now?)`,
`cacheMediaItem(id,item,ts?)`, `clearMediaItemCache()`. BOTH `MediaDetailPage.vue`
and `PlayerPage.vue` import it, so `browse→detail→player→back` all hit ONE cache.
The docblock warns against re-inlining it into `<script setup>`.

**PlayerPage SWR (the missing AC half)** — `PlayerPage.vue:load()`: after the
UI-0.4 concurrent playback-info dispatch (unchanged), it now checks the shared
cache before the by-id fetch. A fresh hit mounts `<Player>` instantly with NO
`/media/:id` round trip (playback-info still fetched fresh for markers), via a new
`applyItem(client, item)` helper (hydrate → streamUrl → clear loading → queue +
episode-neighbour lookups). A stale/absent entry falls through to fetch + re-cache;
a transient refresh failure serves the stale entry. A hard access block (403/429
`AccessSchedule`/`StreamLimitExceeded`) still takes precedence and is NOT masked by
the cache. `seriesEpisodeCache` and the UI-0.4 parallel dispatch are untouched.

**Dead-guard resolution** — `MediaDetailPage.vue:161` had
`if (disposed || controller !== controller)` (always false). Pinned
`const myController = controller;` at the start of `load()` and changed the guard
to `disposed || myController !== controller`, matching the real staleness pattern
already used by `loadSimilar`/`loadSeasons`. (It rode in the source commit because
it sits inside the same `load()` hunk as the cache-lookup rename; splitting it into
its own commit would have produced a non-compiling intermediate.)

**Tests added** — `src/pages/media-item-cache.test.ts` (11 cases):
- shared module: store/get + TTL freshness boundaries + `clearMediaItemCache` +
  one importer populates the singleton another reads;
- MediaDetailPage: 2nd visit within TTL renders from cache with 0 by-id fetches;
  a stale entry triggers a background refresh (and re-stamps fresh); a fetch
  failure serves the stale cache (no error state);
- PlayerPage: same three (cache-hit skips by-id, mounts `<Player>` from cache;
  stale → by-id refresh; fetch failure → stale cache played) + a hard access block
  is NOT masked by the stale cache;
- cross-page: a detail visit primes the cache the player then reuses with 0 by-id
  fetches.
Also added `clearMediaItemCache()` to the `beforeEach` of `MediaDetailPage.test.ts`
and `PlayerPage.test.ts` — now that the cache is a real persisted singleton, their
by-id fetch/call-order assertions need a cold cache each test.

**Files changed (absolute):**
- `/home/sites/phlix/phlix-ui/src/composables/useMediaItemCache.ts` (new)
- `/home/sites/phlix/phlix-ui/src/pages/MediaDetailPage.vue`
- `/home/sites/phlix/phlix-ui/src/pages/PlayerPage.vue`
- `/home/sites/phlix/phlix-ui/src/pages/media-item-cache.test.ts` (new)
- `/home/sites/phlix/phlix-ui/src/pages/MediaDetailPage.test.ts`
- `/home/sites/phlix/phlix-ui/src/pages/PlayerPage.test.ts`

**Verify (ACTUAL output):**
- `vitest run MediaDetailPage.test.ts PlayerPage.test.ts media-item-cache.test.ts
  --reporter=dot` → `Test Files 3 passed (3) / Tests 77 passed (77)`.
- FULL `vitest run` → `Test Files 172 passed (172) / Tests 2956 passed | 6 skipped
  (2962)` — 0 fail (baseline 2945 + 11 new).
- `vue-tsc --noEmit` → exit 0 (0 errors). `eslint .` → exit 0 (0 errors).
- **dist/ NOT rebuilt/committed** (release-time gate, §0.5).

Commits: d0615d7 (source: module + both pages + dead-guard) + e20c27d (tests).
Pushed to master (`2cab33d..e20c27d`).

## Reviewer — UI-2.1 + UI-2.3 (post-deps verify) — 2026-07-12

Combined VERIFY + confirming-REVIEW after the pause-window external commits landed
(HEAD `859695c` @phlix/contracts→v0.3.11; `f87afa0` git pins repointed after upstream
history rewrite). This repo IS `@phlix/ui`; its own `package.json` version is **0.79.0**,
coherent with the server/hub bump to @phlix/ui v0.79.0.

### Job A — MASTER GREEN: YES (no new red from the deps bump)
- `npm install` → `up to date, audited 352 packages ... found 0 vulnerabilities` (the
  contracts v0.3.11 bump + repointed git pins needed no reinstall churn).
- `npx vue-tsc --noEmit` → **exit 0, 0 errors** (a contracts type change would have surfaced
  here — item / continue-watching payload shapes still type-align; no drift).
- `npx eslint .` → **exit 0, 0 errors**.
- `npm run build` → **exit 0** (vite build + vite build --config vite.player.config.ts both
  ok). **dist/ restored to tracked state, untracked build artifacts cleaned — NOT committed.**
- `npx vitest run` (full) → first pass showed `2955 pass / 1 fail / 6 skip`: the single
  failure was `MediaGrid.test.ts` UI-2.5 "does NOT call getBoundingClientRect during scroll"
  **timing out at 5000ms** — a CPU-contention flake from my running vue-tsc concurrently with
  vitest (note the pathological 475s import / 289s transform in that run). Re-run in isolation:
  `npx vitest run src/components/MediaGrid.test.ts` → **15 passed / 5 skipped, 0 fail** in 8.6s.
  So the effective suite is **2956 pass / 6 skip / 0 fail** — matches the pre-deps baseline
  exactly. NO new failure attributable to @phlix/contracts v0.3.11.
- Targeted re-run of the UI-2.1 + UI-2.3 files
  (`media-item-cache MediaDetailPage PlayerPage BrowsePage useResumeSync`) →
  **Test Files 5 passed / Tests 113 passed**.

### Job B — confirming review

**UI-2.1 (shared SWR item cache) — CONFIRMED.**
- `src/composables/useMediaItemCache.ts` is a genuine module-level singleton
  (`const mediaItemCache = new Map()` at module scope, NOT inside `<script setup>`); docblock
  explicitly warns against re-inlining — the latent per-instance bug the fix found is closed.
- Both `MediaDetailPage.vue` (imports at :44-47) and `PlayerPage.vue` (:52-55) consume it;
  cross-page reuse verified by the `media-item-cache.test.ts` cross-page case.
- SWR semantics correct: fresh hit (<60s TTL) renders with NO by-id fetch and returns early
  (MediaDetailPage:159-175, PlayerPage:381-386); stale/absent → fetch + `cacheMediaItem`
  re-stamp (MediaDetailPage:192, PlayerPage:438); transient refresh failure serves the stale
  entry (PlayerPage:414-419 + falsy-item guard :428-432); a hard 403/429
  `AccessSchedule`/`StreamLimitExceeded` block wins over the cache and is surfaced, NOT masked
  (PlayerPage:400-413).
- The dead `controller !== controller` guard is now the intended staleness check
  `myController !== controller` in both pages (pinned at MediaDetailPage:141/:161,
  PlayerPage:201-202); matches the loadSimilar/loadSeasons pattern.
- UI-0.4 parallel dispatch preserved: playback-info promise is dispatched BEFORE the cache
  check (PlayerPage:375), so even a fresh cache hit doesn't skip markers; `seriesEpisodeCache`
  / up-next / episode-neighbour lookups untouched (applyItem:449+).
- Tests genuinely assert cache-hit-no-refetch, stale-refresh, failure-serves-stale,
  hard-access-block-not-masked, and cross-page reuse.

**UI-2.3 (Continue Watching reactivity) — CONFIRMED.**
- `useResumeSync.ts` uses a module-level shared `shallowRef<readonly MediaItem[]>`
  (`syncedItems`, :45) reassigned WHOLESALE (`syncedItems.value = validItems`, :120), never
  mutated in place — the wholesale reassignment is what propagates to consumers.
- `BrowsePage.vue` `continueItems` computed reads `continueWatchingItems.value` reactively
  (:124-130) — no stale destructured plain-array capture (the exact U-N4 defect); sorted by
  `player.resumeMap`, sliced to 12.
- `onUnmounted` moved into `attachVisibilityListener()` guarded by `getCurrentInstance()`
  (:61-76) — the "onUnmounted outside setup" warning is gone; listener attached idempotently.
- Fixer note documents the rewritten test FAILS pre-fix (git-stash of the two source files →
  4 failed / 32 passed), and it drives the REAL composable (mock removed).
- Full continue-watching item payloads retained (not just id/position); positions re-sync on
  `visibilitychange` + BrowsePage mount + login.

Neither fix regressed against @phlix/contracts v0.3.11 (vue-tsc 0 errors confirms the
MediaItem / continue-watching shapes still align).

### Findings
NO FINDINGS

## Implementer — UI-2.5 — 2026-07-12 (missing overlay-gating half; scroll-perf half untouched)

The MediaGrid scroll-perf half (commit 61d9794) was already DONE + well-tested — NOT touched.
Closed the still-open `[U-R2]` half: the overlay action row was mounted for EVERY card and only
CSS-hidden, so a 40-card windowed grid eagerly mounted ~400 invisible Play/ThumbRating/Favorite/
Watched/Info/⋯-Menu/Match instances. (`menuItems` was already correctly lazy `[]`-when-closed.)

**How the overlay is gated:** added reactive `hovered`/`focused` refs on `MediaCard.vue`;
`@pointerenter`→`onPointerEnter` (sets hovered + keeps prefetch), `@pointerleave`→hovered=false,
`@focusin`→`onFocusIn` (sets focused + keeps prefetch), `@focusout`→`onFocusOut`. The action-row
`v-if` is now `actionsVisible = !hideActions && (hovered || focused || coarsePointer)`, so the whole
row (and all its component instances) is UNMOUNTED until the card is actually reached, and freed
again on leave/blur.

**Keyboard a11y PRESERVED (no compromise):** the card's stretched `.media-card__link` anchor is a
real focusable entry point (href, not tabindex=-1). Tabbing onto the card fires `focusin` on the
`<article>` → the row mounts BEFORE the user can Tab into the buttons — no keyboard dead-end.
`onFocusOut` only collapses when focus truly LEFT the card (`relatedTarget` not contained), so moving
focus link→Play (relatedTarget is a descendant) keeps the row mounted; only leaving the card entirely
collapses it. No new tabindex was needed.

**Touch preserved:** `coarsePointer` (matchMedia `'(hover: none)'`, guarded for jsdom) keeps the
actions mounted on touch devices, matching the existing `@media (hover: none)` CSS that reveals the
overlay permanently there — single-tap-to-Play still works. In jsdom (no matchMedia) coarsePointer is
false, so tests gate purely on hover/focus.

**Tests (MediaCard.test.ts):**
- New "overlay action row lazy-mount" suite: buttons are NOT in the DOM at mount, ARE after
  `pointerenter`, gone again after `pointerleave`; a11y case — `focusin` reveals, `focusout` to an
  in-card `relatedTarget` KEEPS the row, `focusout` leaving the card collapses it; plus a
  focusable-entry-point assertion (link has href, not tabindex=-1).
- Replaced the shallow menuItems test: `buildMediaItemMenu` is now spied via `vi.mock` (delegating to
  the real impl) and asserted NOT called while idle OR hovered-but-closed, then called exactly once
  (and the built menu is non-empty, `[role="menuitem"]` present) on first ⋯ open — the real lazy
  `[]`-when-closed contract.
- ~20 existing action-button tests now reveal the row first via a shared `async reveal(w)` helper.
- Cross-file: `SeriesDetail.test.ts` (2) + `MediaDetailPage.test.ts` (2) reveal each card's overlay
  before clicking its Play button (season/similar grids embed MediaCard).

**Verify (ACTUAL output, vitest run ALONE first, then vue-tsc/eslint):**
- `vitest run MediaCard MediaGrid SeriesDetail MediaDetailPage --reporter=dot` →
  `Test Files 4 passed (4) / Tests 121 passed | 5 skipped (126)` (MediaGrid scroll test green, no
  flake this run).
- FULL `vitest run` → `Test Files 172 passed (172) / Tests 2958 passed | 6 skipped (2964)` — 0 fail
  (baseline 2956 + 2 net new; replaced 2 shallow menu tests with 4).
- `vue-tsc --noEmit` → exit 0 (0 errors). `eslint .` → exit 0 (0 errors).
- **dist/ NOT rebuilt/committed** (release-time gate, §0.5).

Files changed (absolute): `/home/sites/phlix/phlix-ui/src/components/MediaCard.vue`,
`/home/sites/phlix/phlix-ui/src/components/MediaCard.test.ts`,
`/home/sites/phlix/phlix-ui/src/components/SeriesDetail.test.ts`,
`/home/sites/phlix/phlix-ui/src/pages/MediaDetailPage.test.ts`.
Commits: 0233d3a (source) + 13cef09 (tests). Pushed `45b2ce0..13cef09` to master. UI-2.5 fully DONE.

## TestEngineer — UI-3.2 — 2026-07-12

Optimistic auth guard `[U-B1]` — the mandated test existed but was INERT: it only called the
pure `authGuard(route('settings'), true, false, {name:'browse'})` helper and asserted `toBe(true)`,
duplicating coverage at authGuard:313-314. It drove NOTHING through `router.beforeEach`, asserted no
timing, and had no admin-await assertion despite its title. Source is correct and untouched
(`createPhlixApp.ts:409-440`, `useAuthStore.ts:135-145`) — TEST-ONLY change.

**Replaced** the inert `it` (was `createPhlixApp.test.ts:345`) with a new suite
`describe('router.beforeEach — optimistic auth guard (UI-3.2 / U-B1)')` that drives the REAL guard
installed by `createPhlixApp` (grabbed via `app.config.globalProperties.$router`), stubs
`globalThis.fetch` BEFORE app creation (the auth `ApiClient` binds fetch at construction), and uses a
deferred so `/auth/me` settles on demand. Kept all pure-helper `authGuard` unit tests.

Real behaviors now asserted (would FAIL if the guard awaited `/auth/me` for non-admin):
1. **Optimistic non-admin** — with a present token and `/auth/me` held PENDING (deferred never
   settled until cleanup), `await router.push('/app/settings')` resolves to the `settings` route; the
   `/auth/me` fetch spy WAS called (background validation kicked off) yet `meSettled === false`. If the
   guard awaited the pending `/auth/me`, this push would hang forever → vitest timeout → test FAILS.
   That hang-on-await is the load-bearing negative assertion.
2. **Admin still awaits** — `router.push('/app/admin/users')` (extraRoute `meta.requiresAdmin`) does
   NOT resolve while `/auth/me` is pending (`navResolved===false`, currentRoute not `admin-users`);
   after resolving `is_admin:false` it bounces to home (`browse`); a sibling test resolving
   `is_admin:true` lands ON `admin-users`.
3. **Bad token redirects** — present-but-stale token renders `settings` optimistically first
   (token still in storage), then `/auth/me`→401 (no refresh_token, so no retry) makes `fetchUser`
   clear the token; the NEXT nav to `/app/parental` is corrected to `login` with
   `query.redirect === '/app/parental'`.

**Verify (ACTUAL output — vitest ALONE first, then vue-tsc/eslint separately):**
- `npx vitest run src/app/createPhlixApp.test.ts --reporter=dot` → `Test Files 1 passed (1) / Tests
  47 passed (47)` (was 44: −1 inert removed, +4 new driven tests).
- FULL `npx vitest run` → `Test Files 172 passed (172) / Tests 2961 passed | 6 skipped (2967)` — 0
  fail (baseline 2958 pass → +3 net: −1 inert, +4 new). No MediaGrid flake (vitest run alone).
- `npx vue-tsc --noEmit` → exit 0 (0 errors). `npx eslint .` → exit 0 (0 errors).
- dist/ NOT rebuilt/committed (release-time gate).

New-code coverage: the 4 driven tests exercise every branch of the installed `router.beforeEach`
optimistic path (admin strict-await, non-admin fire-and-forget optimistic, no-token await, bad-token
clear-then-redirect). GREEN.

File changed (absolute): `/home/sites/phlix/phlix-ui/src/app/createPhlixApp.test.ts`.

## Investigator/Fixer — UI-3.3 — 2026-07-12

**VERDICT (b): admin WAS broken in production — and far worse than admin-only.** The UI-3.3
`cssCodeSplit: true` split orphaned ~248 KB of CSS (admin AND every lazy page) into inert chunks
that NOTHING loads. The whole app (browse, media cards, player, login, admin) ships UNSTYLED in the
prebuilt `dist/` the consumers deploy.

### Evidence (consumer import lines + build output)
- Both production consumers import EXACTLY ONE stylesheet and bundle the PREBUILT dist (no
  `@phlix/ui` source alias in their `vite.config.ts` — plain `plugins:[vue()]`):
  - `phlix-server/web-ui/src/main.ts:1-2`: `import { createPhlixApp, buildAdminRoutes, ... } from '@phlix/ui';`
    then `import '@phlix/ui/style.css';` (+ `fonts.css`). No `admin.css`, no per-page CSS import.
  - `phlix-hub/web-ui/src/main.ts:1-2`: same shape (`import '@phlix/ui/style.css';`).
  - `@phlix/ui` resolves via `package.json` `exports["."]` → `dist/phlix-ui.js`; `@phlix/ui/style.css`
    → `dist/style.css`. (`exports` has NO `admin.css` entry.)
- The shipped dist proved the CSS inert:
  - `dist/style.css` = 35,105 B and contained ZERO of `media-card / browse / admin / player /
    media-grid / .btn / login / modal / sidebar`. 248,239 B of CSS sat across 70 orphaned `*.css`
    chunk files (`admin.css` 1,878 B, `PlayerPage.css` 38 KB, `MediaCard.css` 9.7 KB, …).
  - The lazy dist JS chunks carry inert markers and DON'T inject CSS: `dist/AdminLayout-*.js` head =
    `import{...}from"./Icon-*.js"; /* empty css */ ...`; `grep -rl MediaCard.css dist/*.js` → EMPTY.
  - History: `dist/style.css` was 282,868 B at every commit before UI-3.3 (`e70e41a`) and dropped to
    35,105 B at it. Finding U-B2 itself notes "Vite lib builds aggregate all SFC CSS regardless of JS
    chunking" — UI-3.3 broke exactly that invariant by forcing `cssCodeSplit`.

### Fix (revert the split → single aggregated style.css; §0.1 no-delete honored)
A reliable split is NOT achievable for these consumers (they bundle prebuilt dist JS with no CSS
injection runtime and import only `style.css`), so per the task guidance a correct-but-unsplit result
beats an unstyled regression. Reverted ONLY the UI-3.3 CSS-split (left UI-3.4's `external: apexcharts`
untouched):
- `vite.config.ts`: `cssCodeSplit: true` → `false`; removed the `rollupOptions.input` multi-entry
  (`{style, admin}`); dropped the now-wrong `cssFileName` comment. Added an explanatory comment so the
  split isn't re-introduced.
- `src/app/AdminLayout.vue`: kept the `import '../admin/admin.css'` side-effect (with `cssCodeSplit:false`
  it aggregates into `style.css`); rewrote the two stale "separate chunk / lazy-loaded" comments to
  state it now merges into the single `style.css`.

**Secondary build-correctness fix (needed to rebuild+commit a coherent dist):** `npm run build` runs
`vite build` (main) THEN `vite build --config vite.player.config.ts` (player). The player build's
`emptyOutDir` defaulted to true (dist is inside root), so it WIPED the main entry — `npm run build`
was producing a dist with ONLY `player.js`/`ui.css` and NO `phlix-ui.js`/`style.css`. That is also why
the committed dist had lost `player.js` (a prior UI-3.1/U-W3 dist regression). Added
`emptyOutDir: false` to `vite.player.config.ts` so the player build appends without wiping. Consumers
do NOT import `@phlix/ui/player` (grep empty) and `phlix-ui.js` doesn't reference it, so the missing
player entry wasn't actively breaking them — but the wipe made the whole package un-rebuildable.

### Build-output guard test (audit's smaller ask)
`src/__tests__/dist-css-bundle.test.ts` (6 cases): style.css exists; is a monolith (>150 KB, guards
the shrink); contains admin (`admin__sidebar`, `admin-dash`) + core/lazy-page selectors
(`media-card/media-grid/browse/modal/login/metrics/webhook/admin-livetv`); emits NO orphaned per-page
CSS chunks (guards re-enabling `cssCodeSplit`); and ships a complete build (`phlix-ui.js` +
`phlix-ui.umd.cjs` + `style.css` all survive the player build). No dead-CSS trim done — over-trimming
is risky and the aggregate is the correct, pre-regression state.

### dist REBUILT + COMMITTED (yes — this is a build-artifact correctness fix)
Ran `npm run build` (exit 0). Result: `dist/style.css` **283,286 B** (was 35,105), **0** orphaned CSS
chunks (all 70 merged, `admin.css` gone/merged — `admin-dash` ×42, `admin__sidebar`, `media-card`,
`player`, `live-tv`, `metrics`, `webhook` all present in style.css), `phlix-ui.js` + `player.js` both
present. ~700 dist files changed (chunk hashes shifted since CSS imports were stripped from the JS
chunks; orphan `.css` deleted; player entry restored). Committed dist for this step.

### Verify (ACTUAL)
- `npm run build` → exit 0. `dist/style.css` 283,286 B; orphan css chunks 0; `phlix-ui.js` yes;
  `player.js` yes; `admin-dash` in style.css ×42.
- `npx vitest run` (ALONE) → `Test Files 173 passed (173) / Tests 2967 passed | 6 skipped (2973)` —
  0 fail (baseline 2961 + 6 new build-output tests).
- `npx vue-tsc --noEmit` → exit 0. `npx eslint .` → exit 0.

Files changed (absolute): `/home/sites/phlix/phlix-ui/vite.config.ts`,
`/home/sites/phlix/phlix-ui/vite.player.config.ts`,
`/home/sites/phlix/phlix-ui/src/app/AdminLayout.vue`,
`/home/sites/phlix/phlix-ui/src/__tests__/dist-css-bundle.test.ts`, and the rebuilt `dist/`.

## Fixer — UI-3.8 — 2026-07-12

Re-audit of the 6 card ⋯-menu actions confirmed the audit's two defects and the
missing per-action tests. 4 of 6 were real (add-to-playlist, download, shuffle,
edit-metadata); missing-episodes was green-but-wrong; explore-item-data was a
dead default-case toast. All 6 are now real + tested.

**(1) REAL BUG — missing-episodes broken contract (fixed).** The client typed
`getMissingEpisodes` as a BARE ARRAY and `MediaCard.vue` did `episodes.length`,
but the server (`MediaItemController::getMissingEpisodes` :599-602) returns an
ENVELOPE `{ total_expected, total_existing, missing_episodes: [{ episode_number }] }`
(the degraded branches at :575/:580 return only `{ missing_episodes: [] }`). So
`.length` was read off the envelope OBJECT → `undefined` → the toast read
"undefined episodes missing" and the zero-missing branch never fired.
- `src/api/client.ts` — retyped `getMissingEpisodes(id)` to the real envelope
  (`total_expected?`, `total_existing?` optional to cover the degraded branches;
  `missing_episodes: Array<{ episode_number: number }>`), with a docblock pinning
  the snake_case server shape and noting `missing_episodes.length` is the
  canonical count.
- `src/components/MediaCard.vue` + `src/components/MediaDetail.vue` (shares the
  same `onMenuSelect`) — both now read `report.missing_episodes.length` for the
  count. Chose `.length` over `total_expected - total_existing` because the latter
  under-counts when a series has extra episodes beyond `episode_count`. The count
  is now correct and the zero-missing branch fires. (MediaDetail HAD to be fixed
  too — the retyped client made its old `episodes.length` a vue-tsc error.)

**(2) STUB — explore-item-data now real (host emit, not a toast).** No
data-inspector modal/component exists in the codebase and no host currently
handles it, so — consistent with the sibling `edit-metadata` action
(`emit('edit-metadata', item)`, host-wired) — "Explore item data" now
`emit('explore-data', props.item)` for the host's admin data-inspector to handle
(the full `MediaItem` is already client-side). Added the typed `explore-data`
emit + a JSDoc'd handler case in BOTH `MediaCard.vue` and `MediaDetail.vue`;
removed it from the dead default-case `"isn't available yet"` toast.

**(3) Per-action tests added** (`src/components/MediaCard.test.ts`, new describe
"MediaCard — ⋯ menu action backends (UI-3.8)"). Each opens the menu the way a
user does (reveal overlay → click ⋯ → click the teleported `[role=menuitem]`) via
a `selectMenuItem` helper (throws listing present items if a label is missing, so
a menu-model regression fails loudly). A scoped `beforeEach(vi.clearAllMocks)`
resets the `api` module-singleton spies' call history between cases.
- add-to-playlist → `api.createPlaylist('Faves','m1')` + success toast (prompt
  spied); + a cancelled-prompt case asserting `createPlaylist` is NOT called.
- download → `api.getDownloadUrl('m1')`, `window.open(url,'_blank','noopener')`,
  success toast.
- shuffle → `api.shufflePlay('m1')` + success toast.
- edit-metadata (admin) → emits `edit-metadata` with the item.
- explore-item-data (admin) → emits `explore-data` with the item AND asserts the
  old `"isn't available yet"` info toast did NOT fire.
- view-missing-episodes → 4 cases guarding the fixed envelope contract:
  plural ("2 episodes missing"), singular ("1 episode missing"), zero
  ("No missing episodes" — the branch that never fired pre-fix), and a degraded
  envelope (only `missing_episodes`, no totals). Item is `type:'series'` so the
  menu includes the item.

**Verify (ACTUAL output; vitest run ALONE first, then vue-tsc/eslint separately):**
- `npx vitest run src/components/MediaCard.test.ts --reporter=dot` →
  `Test Files 1 passed (1) / Tests 70 passed (70)`.
- FULL `npx vitest run` → `Test Files 173 passed (173) / Tests 2977 passed |
  6 skipped (2983)` — 0 fail (baseline 2967 + 10 net new).
- `npx vue-tsc --noEmit` → exit 0 (0 errors). `npx eslint .` → exit 0 (0 errors).
- **dist/ NOT rebuilt/committed** (release-time gate, §0.5).

Files changed (absolute): `/home/sites/phlix/phlix-ui/src/api/client.ts`,
`/home/sites/phlix/phlix-ui/src/components/MediaCard.vue`,
`/home/sites/phlix/phlix-ui/src/components/MediaDetail.vue`,
`/home/sites/phlix/phlix-ui/src/components/MediaCard.test.ts`. UI-3.8: all 6
actions real + per-action tested → marked [x].

## TestEngineer — UI-3.7 — 2026-07-12

RE-AUDIT confirmed the impl is REAL and correct (no source change made):
- `src/stores/useSyncPlayStore.ts:48-61` genuinely computes
  `drift = localPlaybackPosition − (playbackPosition + elapsedSec × playbackRate)`,
  guards paused/waiting → 0, and `syncStatus` (`:63-70`) returns `outOfSync` when
  `|drift| > 2`, else `synced` (and `re-syncing`/`outOfSync` for waiting/null).
- `src/components/Player.vue:1200-1217` session watcher applies play/pause AND
  `if (Math.abs(syncPlay.driftAmount) > SYNC_DRIFT_THRESHOLD_SECONDS) seekTo(session.playbackPosition)`.

The existing tests were SHALLOW (only zero/guard cases) — real drift math and the
seek-on-drift behavior were untested. Strengthened, test-only:

**`src/stores/useSyncPlayStore.test.ts` — real drift math (deterministic clock).**
`Date.now()` stubbed via `vi.spyOn(Date,'now').mockImplementation(() => nowMs)`; the
private `_lastDriftCaptureMs` is anchored through `onRemoteStateUpdate('seek')` (which
stamps it to the frozen clock), then the clock is advanced by exactly 10s so
`elapsedSec` is exact. Added 5 cases:
- POSITIVE drift: server anchored 100s rate 1×, +10s → expected 110; local 113 →
  `driftAmount ≈ 3` (asserted `toBeCloseTo(3)`) and `syncStatus === 'outOfSync'`.
- NEGATIVE drift: local 107 → `driftAmount ≈ −3`, `outOfSync`.
- rate ≠ 1: 1.5× → expected 115; local 115 → 0/`synced`, local 120 → 5/`outOfSync`.
- within threshold: local 111.5 → 1.5/`synced`.
- BOUNDARY: 112.001 → 2.001/`outOfSync`; 111.999 → 1.999/`synced`;
  112 → exactly 2/`synced` (impl uses strict `> 2`).
These assert a NONZERO, sign-correct numeric value — a hardwired `driftAmount === 0`
(or dropping the `elapsedSec × rate` term) fails every one.

**`src/components/Player.test.ts` — seek-on-drift (real store + component watcher).**
New `describe('Player — SyncPlay drift correction (U-I1)')`; `vi.useFakeTimers()` +
`vi.setSystemTime(T0)` freeze the clock, local `<video>` position parked via a
`timeupdate` event, session anchored PLAYING at `T0` (elapsed 0) so drift == local−server:
- drift > threshold (local 500 vs server 200 → +300): asserts
  `state.currentTime === 200` (video SEEKED to `session.playbackPosition`) and
  `video.play` called. Would FAIL if no seek were issued (currentTime would stay 500)
  or if driftAmount were always 0 (`|0| > 2` false → no seek).
- drift ≤ threshold (local 201 vs server 200 → +1): asserts `state.currentTime === 201`
  (UNTOUCHED — no correction).
- remote PAUSE (divergent local 500, paused): `driftAmount === 0`, `video.pause` called,
  `state.currentTime === 500` (no seek).

**Verify (ACTUAL output; vitest ALONE, then vue-tsc/eslint separately):**
- `npx vitest run src/stores/useSyncPlayStore.test.ts src/components/Player.test.ts --reporter=dot`
  → `Test Files 2 passed (2) / Tests 155 passed (155)`.
- FULL `npx vitest run` → `Test Files 173 passed (173) / Tests 2985 passed | 6 skipped (2991)`
  — 0 fail (baseline 2977 + 8 net new: 5 store + 3 Player).
- `npx vue-tsc --noEmit` → exit 0 (0 errors). `npx eslint .` → exit 0 (0 errors).
- **dist/ NOT rebuilt/committed** (release-time gate, §0.5). No source change.

Files changed (absolute): `/home/sites/phlix/phlix-ui/src/stores/useSyncPlayStore.test.ts`,
`/home/sites/phlix/phlix-ui/src/components/Player.test.ts`. UI-3.7 impl confirmed real → stays [x].

## Implementer — UI-3.1 — 2026-07-12 (audit PARTIAL → closed: build-assertion + boot-graph defer)

Closed the two audit gaps. The Player split itself was already real (src/player.ts →
@phlix/ui/player, absent from dist/phlix-ui.js) — kept as-is.

**GAP 2 (REQUIRED) — build-output assertion added.** New `src/__tests__/dist-player-split.test.ts`.
Unlike `dist-css-bundle.test.ts` (reads the COMMITTED dist), this test BUILDS both entries fresh into
a throwaway outDir (`node_modules/.cache/ui-3.1-split-dist`) in `beforeAll` and asserts against that.
Rationale: per-step workers must NOT commit dist/, so the committed dist lags src/ between releases;
CI runs `npm run build` before `test:run` but the local/worklog verify command is a bare `vitest run`.
Building fresh keeps the assertion green under EVERY run mode without committing dist, and doubles as
the "split still builds" check. Assertions: (1) main entry + `player.js` both build; (2) main entry has
NO static `import … "./Player-*.js"` (GAP 2); (3) a real TRANSITIVE static-import closure walk from
phlix-ui.js contains none of Player-/MediaDetail-/FilterBar-/MetadataMatchModal- (catches shared-chunk
leaks); (4) the three deferred surfaces exist as standalone chunks (guards the Rollup-inlines-into-entry
false-green). Prefixes anchored with a trailing hyphen so `MediaDetail-*` ≠ `MediaDetailPage-*` and
`Player-*` ≠ `PlayerPage-*`.

**GAP 1 (consumer-risk gate PASSED → applied) — defer MediaDetail/FilterBar/MetadataMatchModal.**
Consumer check FIRST: grepped `phlix-server/web-ui/src` and `phlix-hub/web-ui/src` — NEITHER consumer
imports MediaDetail, FilterBar, or MetadataMatchModal at all (server imports createPhlixApp/
buildAdminRoutes/LibraryScanPage; hub imports createPhlixApp/MyServersPage/FederationPage/
ManageSharesPage/buildHubAdminRoutes). So converting the three static default re-exports in
`src/index.ts:52-54` to `defineAsyncComponent(() => import('./components/X.vue'))` factories (same named
exports) is SAFE — no consumer usage to break. Verified with a fresh build: the three chunks were
STATICALLY imported by phlix-ui.js before (in the boot graph); after the change the entry's static
closure no longer reaches them (they're dynamically-imported chunks), no INEFFECTIVE_DYNAMIC_IMPORT
warning, and each is a standalone chunk (not inlined). ~56KB removed from the eager entry.

**⚠️ Release-time dist rebuild NEEDED to realize GAP 1 on consumers.** dist/ was NOT committed
(release-time gate, §0.5). The committed dist/phlix-ui.js still statically imports the three chunks;
consumers only get the smaller boot graph once dist/ is rebuilt+committed at the next release/tag.

**Verify (actual):** `vue-tsc --noEmit` exit 0 (0 errors); `eslint .` exit 0 (0 errors);
`vitest run src/__tests__/dist-player-split.test.ts` → 4 passed; FULL `vitest run` → 174 files, 2989
pass / 6 skip / 0 fail; `vite build` main exit 0 + `vite build --config vite.player.config.ts` exit 0.
dist/ restored to committed state (git checkout) — NOT committed.

Files: `/home/sites/phlix/phlix-ui/src/index.ts` (defineAsyncComponent factories + import),
`/home/sites/phlix/phlix-ui/src/__tests__/dist-player-split.test.ts` (new).

## Reviewer — UI-3.1 (commit 8664f9f, parent 204b7a0) — 2026-07-12

Confirming review of the two audit-gap closures. READ-ONLY (no source touched).

**AC — MET.** Player surface already code-split to the `@phlix/ui/player` secondary entry
(`src/player.ts`); this commit locks it + defers the three components.
- **defineAsyncComponent conversion correct + safe.** `src/index.ts:63-67` converts the three
  static default re-exports to `defineAsyncComponent(() => import('./components/X.vue'))` keeping the
  SAME named exports. Consumer claim RE-VERIFIED myself: grep of `phlix-server/web-ui/src` and
  `phlix-hub/web-ui/src` shows NEITHER consumer imports MediaDetail/FilterBar/MetadataMatchModal
  (server imports createPhlixApp/buildAdminRoutes/LibraryScanPage; hub imports createPhlixApp/
  MyServersPage/FederationPage/ManageSharesPage/buildHubAdminRoutes). Internal callers
  (MediaDetailPage/BrowsePage/LibraryPage/DetailHarness) import the `.vue` files DIRECTLY, never via
  the barrel — so the async wrap can't break any synchronous options-object/`.props`/`.name` usage;
  there is none. All three are used purely as template components. No router-base/SPA-contract impact.
- **Build-assertion test is REAL** (`src/__tests__/dist-player-split.test.ts`). The transitive
  static-import closure walk from `phlix-ui.js` + the trailing-hyphen anchoring
  (`^MediaDetail-[A-Za-z0-9_-]+\.js$` does NOT match the legitimately-lazy `MediaDetailPage-*`;
  `Player-*` ≠ `PlayerPage-*`) are correct. `STATIC_IMPORT_RE` matches static `from"./x.js"`/bare
  `import"./x.js"` re-export forms and NOT dynamic `import("./x.js")` (the `(` after `import` blocks
  the import-branch; no `from`). Would FAIL pre-fix by construction: static re-exports force Rollup
  either to (a) emit a shared `MediaDetail-*` chunk statically imported by the entry → closure test
  (GAP 1) red, or (b) inline the component into the entry → standalone-chunk test red. Not a grep-only
  false-green. Test builds fresh into a throwaway `node_modules/.cache/ui-3.1-split-dist`
  (cleaned in afterAll — verified gone) so it never touches committed dist/ and is deterministic under
  bare `vitest run`; the fresh-build deviation from dist-css-bundle.test.ts is sound and documented.
- **dist/ correctly NOT committed** — commit 8664f9f touches exactly 3 files (src/index.ts, the new
  test, worklog); no dist/ paths. §0.5 release-time gate honored.

**Verify (ACTUAL, this box):** `npx vue-tsc --noEmit` exit 0; `npx eslint .` exit 0;
`npx vitest run src/__tests__/dist-player-split.test.ts` → 4 passed; FULL `npx vitest run` →
174 files, **2989 pass / 6 skip / 0 fail** (matches baseline). `git status` clean afterward.

**Observations (non-blocking, not findings):**
- The companion U-B3 broad export surface (the ~30 admin API classes + long-tail pages
  MyServersPage/FederationPage/etc. still statically exported from index.ts) is NOT reduced here — but
  that is outside this step's actionable "Do" list (Player/MediaDetail/MetadataMatchModal/FilterBar/
  player/*), and those long-tail pages ARE imported directly by the hub consumer so they can't be
  async-wrapped without breaking it. Correctly left alone.
- The ~56KB win only reaches consumers after a release-time dist/ rebuild+commit (committed
  dist/phlix-ui.js still statically imports the three chunks). Already flagged in the implementer note;
  the coordinator must ensure `npm run build` + commit dist/ happens at the next tag.

### Findings
NO FINDINGS

## Implementer — UI-3.4 [U-B4] apexcharts dedupe — 2026-07-12

Closed the audit PARTIAL: the prior `external: ['apexcharts']` (fce73b8) was INEFFECTIVE +
consumer-risky. It only removed the tiny static `import "apexcharts/core"` from the vue3-apexcharts
wrapper while the **626 KB dynamic SSR chunk** (`apexcharts.ssr.esm-fe46cd2d-*.js`) still fully
bundled → apex double-shipped, AND it created a live consumer dependency surviving only via npm
transitive hoisting (breaks under pnpm/isolated node_modules).

**Root cause confirmed in node_modules (not guessed):**
- `vue3-apexcharts@1.11.1` `exports["."]` → `dist/vue3-apexcharts.js`, which has a **dynamic**
  `import("./apexcharts.ssr.esm-fe46cd2d.js")` (749,989 B raw self-contained SSR apex copy) that
  Rollup always emits as a chunk. `exports["./core"]` → `dist/vue3-apexcharts-core.js` (4,902 B) which
  instead statically `import x from "apexcharts/core"` and has **NO** SSR dynamic import.
- `apexcharts@5.16.0` `exports["./core"]` → `dist/core.esm.js` (804 KB raw) — a self-contained BROWSER
  build that inlines all chart types (verified: `area`/`line`/`bar` + all others present) and only
  lazy-loads tiny internal Dimensions/Graphics/Tooltip modules. Covers MetricsPage's 4 charts
  (area/line/line at :464/:500/:539).

**UI-3.4a (the real win) — DONE.** `src/pages/admin/MetricsPage.vue:44`
`import('vue3-apexcharts')` → `import('vue3-apexcharts/core')`. The `/core` wrapper hard-imports
`apexcharts/core` itself, so no separate register/import of ApexCharts was needed — the wrapper's
component API (props `options`/`series`/`type`/`width`/`height`, default export) is identical, so the
template `<VueApexCharts>` usage is unchanged. Docblock + inline comment explain why `/core`.

**UI-3.4b — DONE.** `vite.config.ts` `build.rollupOptions.external`:
`['vue','vue-router','pinia','apexcharts']` → `['vue','vue-router','pinia']`. The ONE apex browser
copy now bundles INSIDE dist (self-contained). apexcharts stays in `dependencies` (^5.15.2), NOT
peerDependencies. Restores the UI-3.3-safe invariant: **consumers no longer need to provide
apexcharts**. Added a comment so it isn't re-externalized.

**UI-3.4c — DONE.** New `src/__tests__/dist-apex-dedupe.test.ts` (mirrors the UI-3.1
dist-player-split fresh-build-into-throwaway-dir pattern): builds the main entry fresh into
`node_modules/.cache/ui-3.4-apex-dist`, then asserts (1) NO `apexcharts.ssr.esm-*` chunk exists,
(2) exactly ONE `.js` chunk contains the apex library marker `apexcharts-canvas` (one bundled copy;
scoped to `.js` since lib emits es+cjs), (3) that chunk < the old 626,615 B SSR copy. 3 cases green.

**SKIPPED UI-3.4d** (uPlot replacement) — out of scope for a dedupe step.

**Before → after (throwaway + real build output):**
- BEFORE (committed dist, fce73b8): `apexcharts.ssr.esm-fe46cd2d-BhujGxHE.js` = **626,615 B** (raw)
  bundled DEAD + apexcharts externalized (a SECOND browser copy provided by the consumer). Double-ship.
- AFTER: NO ssr chunk; ONE `vue3-apexcharts-core-*.js` = **457,826 B** raw / gzip **112.51 kB**
  (.cjs 370,417 B / gzip 101.70 kB). MetricsPage chunk 27,372 B → 26,385/26,390 B. Net apex payload
  dropped by >½ AND the second (consumer-provided) copy is eliminated.

**Verify (ACTUAL output):**
- `npx vitest run src/__tests__/dist-apex-dedupe.test.ts` → Test Files 1 passed / Tests 3 passed.
- `npx vue-tsc --noEmit` → exit 0 (0 errors). `npx eslint .` → exit 0 (0 errors).
- FULL `npx vitest run` → 175 files, **2992 pass / 6 skip / 0 fail** (baseline 2989 + 3 new).
- `npx vite build` exit 0 + `npx vite build --config vite.player.config.ts` exit 0; dist confirmed to
  contain the single apex chunk and NO `apexcharts.ssr.esm` chunk.
- **dist/ NOT committed** — `git checkout -- dist/ && git clean -fdq dist/` restored it to tracked
  state after the verify build (§0.5 release-time gate). A release-time `dist/` rebuild+commit is
  required for consumers to actually receive the dedupe.

Files changed (absolute): `/home/sites/phlix/phlix-ui/src/pages/admin/MetricsPage.vue`,
`/home/sites/phlix/phlix-ui/vite.config.ts`,
`/home/sites/phlix/phlix-ui/src/__tests__/dist-apex-dedupe.test.ts` (new).

## Fixer — UI-3.4 — 2026-07-12 (BLOCKING review finding: charts un-registered at runtime)

**The finding (CRITICAL/BLOCKING):** the dedupe commit (918ee81) switched MetricsPage to
`vue3-apexcharts/core`, whose wrapper statically imports `apexcharts/core` — the browser build that
ships with ZERO chart types registered. MetricsPage renders `type="area"` (bandwidth) and `type="line"`
(latency + request-rate) charts, so at first render ApexCharts throws
`chart type "area" is not registered. Import it via ApexCharts.use()`. The build-only dedupe test never
renders, and the existing MetricsPage.test.ts STUBS `VueApexCharts` with a `<div>`, so neither caught it.

**Root-cause verification (from node_modules, not guesswork):**
- `apexcharts@5.16.0/dist/core.esm.js` — the registry is `globalThis['__apexcharts_registry__']`;
  `getChartClass(type)` (exported as `__apex_ChartFactory_getChartClass`) reads it and throws the exact
  "is not registered" error when a type is absent (core registers NONE).
- `apexcharts/dist/line.esm.js` ends with `_core__default.use({ line, area, scatter, bubble, rangeArea })`
  where `_core__default` is `apexcharts/core`'s default export — i.e. importing `apexcharts/line` for its
  side effect registers BOTH types MetricsPage uses (area + line) onto the SAME `apexcharts/core`
  singleton the `vue3-apexcharts/core` wrapper imports.
- `apexcharts` `package.json` `sideEffects` includes `./dist/*.esm.js`, so a bare `import 'apexcharts/line'`
  is NOT tree-shaken by Rollup/vite.

**Fix (registration form chosen + WHY):** added `import 'apexcharts/line';` (static side-effect import)
to `src/pages/admin/MetricsPage.vue`. Chosen over `ApexCharts.use({line, area})` because the wrapper
exposes no `ApexCharts` handle to the page (it hard-imports core internally); the `/line` subpath entry
already calls `.use()` on that same core singleton, registers line+area (+scatter/bubble/rangeArea) in
one import, and — critically — re-imports `apexcharts/core` rather than pulling a second copy, so the
single-chunk dedupe is preserved. MetricsPage is a lazy admin route, so apex still never touches the boot
bundle. Added a docblock explaining the registration + the sideEffects/tree-shake guarantee.

**Single-apex-chunk dedupe RE-VERIFIED (holds):** `src/__tests__/dist-apex-dedupe.test.ts` (fresh
`vite build`) — all 3 assertions green WITH the fix: "emits NO apexcharts.ssr.esm-* chunk" ✓, "ships
exactly ONE apex chunk (a single self-contained browser copy)" ✓, "single apex chunk < old 626 KB SSR
copy" ✓. Confirmed on the REAL committed-dist build path too: `npm run build` → exactly one chunk with
the `apexcharts-canvas` marker (`dist/core.esm-*.js`), zero `apexcharts.ssr.esm` chunks. So
`apexcharts/line` re-importing core added NO second copy.

**Regression test added (what the build-only test can't do) —**
`src/pages/admin/MetricsPage.apex-registration.test.ts` (4 cases). Importing MetricsPage runs its
`import 'apexcharts/line'` side effect; the test then asserts `getChartClass('area')`/`('line')` (the
exact registry lookup ApexCharts performs at render) do NOT throw. Also mounts MetricsPage with the REAL
(un-stubbed) `vue3-apexcharts/core` wrapper + mock history and asserts `apexcharts-canvas` renders.
**Diagnostic note baked into the test:** a plain jsdom "renders without throwing" mount does NOT catch
the bug — ApexCharts short-circuits before drawing the series when the container has no layout, so the
throw is unreachable in jsdom and nothing reaches the app errorHandler/console. The registry assertion is
the only deterministic guard. **Red-without / green-with proven:** with `import 'apexcharts/line'`
temporarily disabled → **3 of 4 fail** with `chart type "area" is not registered`; restored →
**4/4 pass**.

**Verify (ACTUAL output):**
- `npx vitest run src/__tests__/dist-apex-dedupe.test.ts src/pages/admin/MetricsPage.apex-registration.test.ts src/pages/admin/MetricsPage.test.ts` → Test Files 3 passed / Tests 14 passed.
- FULL `npx vitest run` → **176 files, 2996 pass / 6 skip / 0 fail** (baseline 2992 + 4 new).
- `npx vue-tsc --noEmit` → exit 0 (0 errors). `npx eslint .` → exit 0 (0 errors).
- `npm run build` → exit 0; dist confirmed single apex chunk + no SSR chunk, then reverted
  (`git checkout -- dist/ && git clean -fdq dist/`). **dist/ NOT committed** (§0.5 release-time gate).

**⚠️ Release-time dist rebuild still owed** (out of scope here): consumers only receive this fix after
`npm run build` (both vite entries) + committing `dist/` at the next tag.

Files changed (absolute): `/home/sites/phlix/phlix-ui/src/pages/admin/MetricsPage.vue`,
`/home/sites/phlix/phlix-ui/src/pages/admin/MetricsPage.apex-registration.test.ts` (new).

## Reviewer (re-review) — UI-3.4 fix — 2026-07-12

Re-reviewed commit **6b9679e** (range `918ee81..6b9679e`) — the fix for the BLOCKING
"charts un-registered at runtime" finding. **VERDICT: NO FINDINGS.**

1. **Runtime bug genuinely closed.** `node_modules/apexcharts/dist/line.esm.js` opens with
   `import _core__default from "apexcharts/core";` — the SAME bare specifier the wrapper
   `vue3-apexcharts-core.js` imports (`import x from "apexcharts/core";`) → one shared singleton →
   Rollup dedupes to one chunk. Its tail calls `_core__default.use({ line: Line, area: Line,
   scatter: Line, bubble: Line, rangeArea: Line })`, registering both types MetricsPage draws.
   `apexcharts` `package.json` `sideEffects` includes `./dist/*.esm.js`, so the bare
   `import 'apexcharts/line'` is preserved (not tree-shaken). Confirmed against node_modules, not
   guesswork.
2. **COMPLETENESS — all used chart types registered.** `grep -rn` of the whole `src/` confirms
   **MetricsPage.vue is the ONLY apexcharts consumer in the app** (only file importing
   vue3-apexcharts / rendering `<VueApexCharts>`). Chart types used: `area` (`type="area"` :490,
   `chart.type:'area'` :494) and `line` (:526/:530 latency, :565/:569 request-rate). Both are
   covered by `apexcharts/line`'s `use({line, area, scatter, bubble, rangeArea})`. No bar / column /
   pie / donut / radialBar / heatmap / candlestick usage anywhere → no additional
   `apexcharts/<type>` import needed.
3. **Single-apex-chunk dedupe invariant holds.** `src/__tests__/dist-apex-dedupe.test.ts` green
   (fresh-build assertions). Confirmed on the real committed-dist path too: `npm run build` (exit 0)
   emits ZERO `apexcharts.ssr.esm-*` chunks and exactly ONE `.js` chunk carrying the
   `apexcharts-canvas` marker (`dist/core.esm-*.js`; the sibling `.cjs` is the lib's CJS emit of the
   same single copy). `apexcharts/line` re-importing core added no second copy.
4. **Regression test genuine (not a tautology) — independently proven.** A throwaway test importing
   ONLY `apexcharts/core` (no `apexcharts/line`) has `getChartClass('area')` and `('line')` THROW
   `/is not registered/`; MetricsPage.apex-registration.test.ts passes only because importing
   MetricsPage.vue runs its `import 'apexcharts/line'` side effect. Remove the import → test goes red.
   Real render-time registry guard, confirming vitest per-file module isolation (green isn't leaking
   from another file).
5. **dist/ NOT committed (§0.5).** The fix commit touched only `performance_worklog_ui.md`,
   `src/pages/admin/MetricsPage.vue`, and the new
   `src/pages/admin/MetricsPage.apex-registration.test.ts`. No `dist/` files. My verify build's dist
   output was restored (`git checkout -- dist/ && git clean -fdq dist/`) — tree left clean.
6. **No collateral.** MetricsPage.vue change is limited to the `import 'apexcharts/line'` +
   explanatory comment; nothing else altered. Gates: `vitest run` (dedupe + registration +
   MetricsPage = 14 pass), `vue-tsc --noEmit` exit 0, `eslint` exit 0, `npm run build` exit 0.

BLOCKING finding CLEARED. ⚠️ Still owed (out of scope here, already tracked): the release-time
`dist/` rebuild+commit — consumers receive this fix only after `npm run build` (both vite entries) +
committing `dist/` at the next tag.
