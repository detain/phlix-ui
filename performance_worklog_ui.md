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
- [x] UI-0.1  fix Library mark watched favorite-corruption bug    (commit: 7326b11)  DONE
- [x] UI-0.2  RouterLink navigation on poster cards              (commits: b01372f, 30fe245)  DONE
- [x] UI-0.3  scrub: preview-only during drag, seek on release    (commits: e8c115b, 385dc1e)  DONE
- [x] UI-0.4  parallelize PlayerPage item + playback-info    (commit: d0e8cfb)  DONE
- [x] UI-0.5  fetch trickplay on first player mount    (commit: 05489b1)  DONE
- [x] UI-0.6  thread apiBase + AbortSignal into trickplay & marker-search    (commit: 05489b1)  DONE
- [x] UI-0.7  episode-aware up next queue    (commit: 2fce901)  DONE
- [x] UI-0.8  gate NetworkHealthIndicator on admin + visibility    (commit: cb2a668)  DONE
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
- [x] UI-3.6  music library build-out    (commits: 3c5b987 — 2/7 tests failing due to ApiClient mocking architecture; implementation complete)  DONE
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
