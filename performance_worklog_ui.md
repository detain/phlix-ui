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
- [ ] UI-1.2  hls.js tuning + bandwidth-estimate persistence
- [ ] UI-1.3  MediaCapabilities/codec probing before direct play
- [ ] UI-1.4  skip hls.js download on native-HLS-only browsers
- [ ] UI-1.5  transcode start/poll: AbortSignal + longer timeout
- [ ] UI-1.6  reduce timeupdate work (position state + eviction)
- [ ] UI-1.7  own the fade timer
- [ ] UI-1.8  mini-player HLS support
- [x] UI-2.1  media detail/player item cache (stale-while-revalidate)    (commit: ad6b34f)  DONE
- [ ] UI-2.2  LRU-cap the media store cache
- [ ] UI-2.3  complete Continue Watching from server payload
- [ ] UI-2.4  local favorites patch instead of full refetch
- [ ] UI-2.5  MediaGrid scroll perf
- [ ] UI-2.6  composited hover/skeleton animations
- [ ] UI-2.7  debounce prefs persistence
- [ ] UI-3.1  secondary entry for the Player surface
- [ ] UI-3.2  optimistic auth guard
- [ ] UI-3.3  admin CSS split
- [ ] UI-3.4  apexcharts dedupe/replacement
- [x] UI-3.1  secondary entry for Player surface (commit: 51c5153) DONE
- [ ] UI-3.2  optimistic auth guard
- [ ] UI-3.3  admin CSS split
- [ ] UI-3.4  apexcharts dedupe/replacement
- [ ] UI-3.5  responsive posters end-to-end 🔒 BLOCKED on SV-3.4
- [ ] UI-3.6  music library build-out
- [ ] UI-3.7  SyncPlay drift correction
- [ ] UI-3.8  card ⋯-menu action backends
- [ ] UI-3.9  markWatched/markUnwatched verification

## Notes / cross-repo blockers
- X1: UI-0.3 is the client end of scrub→encode→cancel (land first)
- X4: UI-3.5 depends on server SV-3.4 (poster_srcset)
- X5: UI-1.3 pairs with server SV-3.3
- X7: UI-3.7 SyncPlay drift correction depends on HB-3.2 + S-F34
