## Unreleased

## 0.98.37 - 2026-08-05

### Added
- **The admin console now surfaces core-update status, in both the server and the hub (plan_updates.md — S76).** New `UpdateAvailableBanner.vue`, mounted once in `AdminLayout.vue`, plus a small `src/api/admin/updates.ts` parser for `GET /api/v1/admin/updates/status`. This completes the S74 (server) / S75 (hub) / S76 (UI) trio.

  ⚠ **The step text said "consuming both status endpoints" from one mount, and that is not implementable — the banner does NOT fan out to two back ends.** The hub's only route to a paired server is the relay proxy, and `ServerProxyController` rejects every `/api/v1/admin/**` path with `403 proxy.scope_denied` *before* forwarding; the hub also stores no server version anywhere, and phlix-server exposes no hub-status endpoint. What S74 actually recorded as the intent is one **parser**, not one fetch. It works because `AdminLayout.vue` is mounted by `buildAdminRoutes()` and, by delegation, `buildHubAdminRoutes()` — so one component serves both consoles, each calling its own back end. Both DTOs emit the same seven camelCase keys (`currentVersion`, `latestVersion`, `updateAvailable`, `checkEnabled`, `lastCheckedAt`, `lastError`, `updateCommand`), verified byte-for-byte. No speculative `sources[]` prop was added: no consumer could supply a second source, so a multi-source predicate would have been production-unreachable code.

  **An error is not "no update."** Three distinct states render — update banner, warning banner (`data-variant="warning"`), or nothing — because silently collapsing a failed check into "you're up to date" is how this feature would become quietly useless. A warning shows when the service reports `lastError` **or** the request itself fails. Deliberately suppressed: **404** (the back end predates S74/S75, and `@phlix/ui` is repinned independently of back ends, so a permanent red banner there would get the feature deleted), **401/403**, and `checkEnabled === false` — which suppresses only the *warning*, never a found update. 5xx, timeouts and network errors do warn.

  Parser defaults are deliberately asymmetric: `updateAvailable === true` (strict — an unrecognised value must never imply an update) but `checkEnabled !== false` (defaults true).

## 0.98.36 - 2026-08-05

### Added
- **The `table` view mode now has a renderer, and it is virtualized (plan_updates.md — S70).** `ViewMode` has declared `'table'` since S67 and `FilterBar` has offered the button ever since, but no renderer existed: `LibraryPage`'s `#card` chain was three arms (`MediaListRow` / `MediaBackdropRow` / `MediaCard v-else`), so selecting `table` persisted the preference and changed nothing on screen. Confirmed live by the product owner — *"clicking it does nothing"*. The option was **not** normalised back to `'grid'`; it was written, persisted and hydrated verbatim, and the control was simply inert.

  New `MediaTableRow.vue` is the fourth arm. The `#card` slot renders one **detached cell per item** inside `MediaGrid`'s `display: grid` container, so it structurally cannot emit a semantic `<table>/<thead>/<tr>` hierarchy — this is therefore a compact ROW variant using `role="table"`/`row`/`cell` on divs, with the header rendered **outside** the grid. Header and body both derive `grid-template-columns` from the single `TABLE_COLUMNS` constant, so the two cannot be edited apart. `MediaGrid` gains a `gridRole` prop: it carried no ARIA-role prop at all, so the `role="rowgroup"` these semantics need did not exist, and its wrapper divs had to be flattened out from between the table and its rows.

  **Virtualized, per the acceptance criterion** — the arm feeds `columns: 1` + `computeFixedRowHeight(TABLE_ROW_HEIGHT)`, the same numbers the windowing math consumes; 4,000 items at `rowHeight: 204` in an 800px viewport put 9 rows in the DOM. The non-virtualized fallback the spec once offered was withdrawn and not taken.

  ⚠ **`TABLE_ROW_HEIGHT === LIST_ROW_HEIGHT` (both 180) is deliberate, not copy-paste.** Composing a full-action `MediaCard` pins a 120px poster floor, so this view's density comes from aligned columns, not a shorter row. A test names this so it is not "corrected" later.

  **Two test holes were found by mutation and closed rather than papered over.** (1) Nothing pinned that the mode comparison stays `===` — replacing it with `.includes()` was a **silent no-op across all 4,835 tests**, because no test had ever mounted a mode that is a *superstring* of a real one; both existing garbage modes were disjoint from the real values, and disjointness is precisely what makes the two operators indistinguishable. Closed with `'listicle'`/`'backdrop-hero'`/`'not-a-table'` arms asserted at **four** consumers of `tableMode`, not just the renderer. (2) Every geometry assertion was exact but **derived from the constant under test**, so changing `TABLE_ROW_HEIGHT` itself produced only one red. Closed with literal pins.

  A recorded and accepted ARIA wart: `MediaGrid`'s `loadingMore` `role="status"` and the back-to-top button transiently re-parent onto the `role="table"`. This is an `aria-required-children` validator violation, not an AT breakage — nothing becomes unreachable, and `aria-rowindex`/`aria-rowcount` are published explicitly so row navigation does not depend on DOM child counting. The permanent no-items case is gated, and unloaded placeholder cells inside the rowgroup during paging are `aria-hidden="true"`.

### Fixed
- **An A-Z jump landed ~25px off after switching between list and table view (S70 review, finding 1).** `MediaGrid` caches the sizer's **position** but its ResizeObserver only ever observes a **size**. Every transition that moves the sizer had always also resized it, so the observer was sufficient by accident — until this release introduced the first mode pair where it isn't. List and table both pass `columns: 1` and the same row height, so `totalHeight` and the sizer's own box are byte-identical across the flip and the element never remounts; nothing fires, yet the table's column-header row has just appeared above the sizer and pushed it down by its height. `throttledMeasure` then overstates `scrollTop` (sub-visual — overscan absorbs it and `padTop` stays consistent with `startIndex`, so there is no shear) and `scrollToIndex` lands the A-Z jump short.

  Fixed with one watcher keyed on `gridRole` **alone** — `columns`/`rowHeight` are inert across exactly this transition by construction, and a mutation re-keying the watcher to them leaves the new tests red, which is what pins the fix to the correct dependency rather than to the mere existence of a watcher. This was a latent `MediaGrid` limitation, not a regression: S70 was simply the first thing to reach it.

### Changed
- **The table view's `Rating` column is now labelled `Cert` (S70 review, finding 2).** It renders `item.rating`, typed `'G'|'PG'|'PG-13'|…|'TV-MA'` — the parental certificate, not a score. `src/types/media-item.ts` warns twice never to conflate `rating` with `user_data.rating`, and `Cert` is what every sibling already calls it (`.media-card__cert`, `.media-list-row__cert`, `.media-backdrop-row__cert`). A discriminating test now carries **both** `rating: 'PG-13'` and `user_data.rating: 9`; no fixture previously carried both, so a renderer that silently switched to the score would have rendered an em-dash and stayed green.

## 0.98.35 - 2026-08-04

### Added
- **The Next Up home rail's endpoint contract and error state: the two halves its tests never pinned (plan_updates.md — S37, AC audit 2026-08-03).** **S37 SHIPPED on 2026-07-23** as `9d0e883b` (#268) and is an ancestor of `master`; the rail is live in `BrowsePage.vue` (Continue Watching → **Next Up** → My List → Recommended → Most Watched), fed by `src/api/nextUp.ts`. This entry adds **no behaviour**: it is test-only, **not one byte of bundled source changes**, so `dist/` is untouched and `npm run dist:check` passes on the committed output (785 tracked files, 8 published entry points, 5/5 checks ran). The rail was re-verified against the **actual** S36 server route (`WebPortalRouter::getNextUp` + `WatchHistory::shapeNextEpisode`, `phlix-server` `3e3fe1fb` #544) and the client matches it exactly: path `GET /api/v1/users/me/next-up`, auth-required (401 without a userId), a **bare `{ items: [...] }` envelope — not `{success, data}`** — `limit` defaulting to 20, snake_case `MediaItemShaper` rows carrying `series_id`/`series_name` and `position_ticks`/`duration_ticks` = 0, and **no `user_data` key**, which is what makes the rail's `remember()`-not-`hydrate()` choice correct rather than incidental.

  **Two of the four shipped S37 assertions pinned nothing, each proven by a mutation the suite stayed green on.** (1) **The endpoint path was unpinned against a suffix append.** Both the `stubFetch` matcher and the "it hit the endpoint" assertion used `.includes('/api/v1/users/me/next-up')`, and `'…/next-up-MUTATED'.includes('…/next-up')` is `true` — so changing the production path in `api/nextUp.ts` to `/api/v1/users/me/next-up-MUTATED` left all 43 tests **green**, with the stub cheerfully serving items to a route that would 404 in production. Both sides now go through a shared `NEXT_UP_PATH` + `isNextUpUrl()`, which strips the query and requires the pathname to **END WITH** the exact path; that mutation is now red on 5 tests. A control confirms the old assertion was not wholly inert — a substring-*breaking* change (`/next-up` → `/nextup`) was already red.

  ⚠ **`endsWith`, not `===`.** Exact equality was tried first and is **wrong**: on the hub `useMediaApiBase` resolves to the relay-proxy base and the real request is `/api/v1/servers/{id}/proxy/api/v1/users/me/next-up`, so an equality matcher silently stops matching the moment a base is set, falls through to the empty default payload, and hides the rail *for the wrong reason*. Every pre-existing test mounts with base `''`, so not one of them could have caught it — the new reload test (which uses a non-empty base) is what exposed it.

  (2) **The error branch was guarded by nothing, and the obvious test for it is a false positive.** Deleting `!nextUpError.value` from `showNextUp` left the whole suite **green**. A first-load-failure test does *not* fix that: on a first failure `nextUpItems` is still `[]`, so the `length > 0` term hides the rail on its own and the error term stays redundant — that test passes with and without the mutation, and is kept only as a containment check (the rest of the page still renders), explicitly labelled as not pinning the error term. The terms diverge only on a **reload**: `loadNextUp` never clears `nextUpItems` on failure, so after a success followed by a failure the items are non-empty **and** the error is set, and the error term is the only thing keeping stale picks off screen. The new reload test drives BrowsePage's `watch(apiBase, load)` by flipping a ref-backed `apiBase` computed, asserts the reload actually re-hit the endpoint (so it cannot pass by nothing happening), and then asserts the rail is absent. It reds on the mutation.

  ⚠ **A second `stubFetch()` mid-test cannot reach an already-constructed client.** `ApiClient` binds `globalThis.fetch` **once, in its constructor** (`client.ts:499`), and BrowsePage memoizes `nextUpClient` — so re-stubbing the global fetch to inject a reload failure leaves the client calling the *first* stub, and the "failed reload" never fails. `stubFetch`'s `nextUpError` therefore accepts a **thunk**, evaluated per request, so one stub can succeed and then fail.

  **The other two S37 criteria were already genuinely guarded**, confirmed by mutations that do red master: removing the rail from the template (3 tests), swapping it after My List so it is no longer `Continue Watching + 1` (1 test, the ordering AC), dropping the `length > 0` empty guard (1 test, plus a Favorites ordering test that depends on the hide), and adding an `items.forEach(userItemData.hydrate)` to `loadNextUp` (1 test, the S32 state-wipe regression). Empty list and fetch error both resolve to **rail absent**, never an empty shell. Net suite: 4478 → 4480 passing, 239 files, 10 skipped.
- **The media-detail button hierarchy, the no-backdrop ambient scrim and the poster-action tooltips: the guards their acceptance criteria never got (plan_updates.md — S18 + S19 + S20, AC audit 2026-08-03).** **All three steps SHIPPED long ago** — S18 `6109f896` (#255), S19 `7a7e1865` (#256), S20 `e1106a0a` (#257) — and this entry adds **no behaviour**: it is test-only, **not one byte of bundled source changes**, so `dist/` is untouched and `npm run dist:check` passes on the committed output (0 drift entries, 785 tracked files, 5/5 checks ran). Every in-scope bullet of all three steps was re-verified against the current files and each one holds. What was missing is that all three acceptance criteria were written as a *manual per-theme visual check across Nocturne/Daylight/Midnight*, which cannot be discharged here — `test:visual` is not part of the deterministic gate, and vitest runs with `css` disabled (`vite.config.ts`), so **a scoped `<style>` block is never injected into jsdom** and `getComputedStyle` reads `''` for every rule these steps added.

  **Method: 25 mutations, each run against the FULL suite, with both sides recorded.** This branch changes no pre-existing test (the only removed line in the whole diff is an `import`), so one full-suite run per mutation says both things at once: a failing test that exists on `origin/master` means the criterion was **already guarded** and the new assertion is redundant for it; a failing test that is new here means it was **guarded by nothing**. Only the second supports a claim. The classifier itself carries a positive control (a master-only title), an escaped-apostrophe control (`thumb\'s`, which a naïve `grep` misses and reports as "new") and a negative control (a title only on this branch) — the first run of it was thrown away precisely because its corpus had failed to extract and it therefore reported every title as new.

  **S18 was the healthiest of the three: 5 of 7 hierarchy reversions were already caught on master.** Play `solid → outline`, **Match metadata `outline → ghost`** (the exact inconsistency updates.md #18 reported), the ⋯ trigger back to a raw `<button>`, the theme-mute `IconButton` to `solid`, and ThumbRating's `var(--text)` back to the hardcoded `rgba(255, 255, 255, 0.92)` each red a master test. Three real gaps closed, each proven by a mutation master stays green on: `Back` must stay `ghost` and Play must be the only solid button in the **whole component** (`Back → solid`: master green, 1 new test red); **no raw `<button>` may survive in the hero action row** — every one must carry `phlix-btn` / `phlix-iconbtn` / `thumb-rating__btn`, with the fully-populated row's 6/3/2 composition pinned (adding a hand-rolled `<button class="media-detail__share">`: master green); and every icon-only hero control must stay on the `ghost` tier with no `.phlix-iconbtn--solid` in the row — master scanned `.phlix-btn--solid` and never its icon-button twin, so adding an `<IconButton variant="solid">` to the row was invisible to all 4,464 tests.

  **S19's CSS half was guarded by nothing at all.** The three shipped S19 tests assert only that the scrim ELEMENT renders — deleting the element is red on master, but **deleting the entire `.media-detail__ambient-scrim` rule is not**, and neither is deleting just its `background`: a scrim div that paints nothing, i.e. exactly the pre-S19 state the step exists to fix, with the whole suite green. The same was true of every hero `text-shadow`. Now asserted from the SFC source: the ambient scrim mirrors `.media-detail__backdrop-scrim`'s `background` and both spellings of `backdrop-filter` (the step's wording is "the same scrim treatment the backdrop already has", so the assertion is *equality with the backdrop scrim*, never a hard-coded gradient literal), it matches the wash's `inset`/`height`/`z-index`/`mask-image`, it is `pointer-events: none`, and — since both layers sit at `z-index: 0` — the DOM order that makes it paint *above* the wash. Title, meta and overview must each declare a real black-halo `text-shadow` with a non-zero blur and at most a 1px offset (soft, not embossed). Five mutations, master green on every one: delete the rule, delete the `background`, `height: 60vh → 40vh`, swap the two divs, and the three shadows (title deleted / meta `none` / overview `blur: 0px`). The parser strips comments and every at-rule block first, so a declaration that exists only inside `@media (…)` can never satisfy an assertion about the unconditional rule.

  **S20's hover reveal was guarded by nothing either, and the reason is instructive: the primitive *was* tested, in a file named after a different component.** `Tooltip.vue`'s only tests are a `describe('Tooltip')` block inside `src/components/ui/Modal.test.ts`. They are not worthless — deleting `@focusin="show"` reds one of them, so "appears on focus" was already guarded at the primitive level — but both pass an explicit `delay` (200 / 0) on a synthetic `<button class="trg">`, so **the 300ms default was asserted nowhere and the hover path was asserted nowhere**: deleting `@mouseenter="show"` from `Tooltip.vue`, and changing the `delay: 300` default to `500`, each left all 239 files / 4,464 tests **green**. Both now fail — the first on 2 new tests, the second on 6. The reveal is asserted at the 299 ms/300 ms boundary on a `MediaCard` action *and* a `ThumbRating` thumb, on hover and on focus (hover is dispatched on the wrap, because `mouseenter` does not bubble; focus is dispatched on the BUTTON, which is what a Tab press hits, and reaches the wrap because `focusin` does), with the `aria-describedby` wiring and its release on leave/blur, and `delay === 300 && disabled === false` on all 8 tips. A per-card `:delay="0"` on Play or on the Like thumb is red; on master it was not.

  **The other half of S20's criterion — "the card action-row width math is unaffected" — is NOT measurable in jsdom and is not claimed to be.** `getBoundingClientRect`, `offsetWidth` and `offsetHeight` all report **0** (not `undefined`, so a `?? default` never fires), and no CSS is applied, so nothing here can show four 32px buttons fitting a 140px row. What is pinned is everything that math depends on: the row has exactly **7 flex items**, every one a `.phlix-tooltip-wrap` / `.thumb-rating` / `.phlix-menu` (an extra `<span>` around one button is red), plus the `max-width: calc(4 * 32px + 3 * var(--space-1))` and `:deep(.phlix-tooltip-wrap) { flex: 0 0 auto }` declarations — three mutations, master green on all three. The step's *conditional* `placement="bottom"` suggestion resolves to keeping the default `top`, and that decision is now pinned together with the two CSS facts behind it (`.media-card__poster { overflow: hidden }` + `.media-card__overlay { justify-content: flex-end }`), so flipping one without the other cannot pass silently. **Residual, and honestly unverifiable here:** a long tip ("Remove from favorites") is `white-space: nowrap` and centred on a 32px button inside that clipping poster, so on the narrow rail cards it can still be clipped *horizontally* — `placement` cannot fix that, and jsdom's zero-width measurements cannot demonstrate it either way.

  **What remains UNVERIFIED, stated rather than substituted.** Whether the three themes *look* consistent, and whether the hero text is legible over a light-poster vs a dark-poster ambient, are visual/contrast judgements that no jsdom assertion reaches; they need the visual gate or a human. One property is worth recording rather than changing: on the light (Daylight) theme both scrims paint a dark gradient under dark text — inherited from the pre-existing backdrop path, and S19 explicitly puts luminance-adaptive text colour out of scope.

- **A repo-wide test teardown, and coverage for the 0%-covered component the package publicly exports (plan_updates.md — S178 + S177, 2026-08-02).** Test/infra only — **not one byte of bundled source changes**, deliberately: a comment inside a *scoped* SFC rehashes its `data-v-` scope id and moves build artefacts, and `dist/` is separately stale on master (S176), so nothing here touches a bundled file.

  **S178 — no test file had auto-unmount, so components leaked DOM between tests.** `src/test/setup.ts` called only `vi.useRealTimers()`. `mount()` roots live in a detached div and are harmless, but teleported content is not: `Modal.vue:66` is `<Teleport to="body">` and `ItemDataInspector.vue:64` renders through it, so a component a test mounted and never unmounted left an open pane in `document.body` for every later test **in the same file** — and a later `document.body.querySelector(...)` could read a pane a *different* test opened and pass for the wrong reason. Measured, not hypothetical: during the S15 audit a 0-panes non-inertness control failed on its first run with `expected 2 to be +0`, because two earlier `LibraryPage.test.ts` tests opened the inspector and never unmounted. The whole 4,429-test suite was green throughout. `enableAutoUnmount(afterEach)` now lives in the shared setup.

  **The raw fallout was 1 failed suite and 0 failed assertions**, recorded before any fixing. `FilterBar.test.ts:90` already called `enableAutoUnmount` itself and VTU throws `cannot be called more than once`, so that file failed at **collection** time and its 30 tests never ran (4406 passed vs the 4434 baseline). The duplicate local call and its import were removed; the teardown was **not** weakened. Nothing else failed — so no test in 236 files was propped up by leaked DOM, and S178 was a latent *class* of bug with two live instances (both already fixed at source in the S15 audit) rather than a suite living on leaks. Moving the call did not weaken S118 either: `FilterBar.test.ts`'s own leak guard now pins the **shared** line, going red with `expected [ [Function onScroll], …(22) ] to have a length of +0 but got 23`.

  `src/test/auto-unmount.test.ts` is the recurrence guard and it is two-sided: a probe teleports into `<body>` and deliberately never unmounts, then the next test asserts both that a teardown **ran** (`probeTeardowns === 1`) and that the pane is gone, so it cannot pass vacuously if the probe ever stops teleporting. Both halves were proven red *before* the fix — `expected +0 to be 1` and `expected <div …(1)></div> to have a length of +0 but got 1` — and deleting the `setup.ts` line turns it red again alongside the FilterBar guard.

  **S177 — `HelpPopover.vue` measured `LF:47 LH:0`: 47 lines, zero ever executed, with no test file. DECISION: KEEP + TEST; the export stays.** It is on the public entry surface (`src/index.ts` → `export * from './components/ui'` → `components/ui/index.ts:36`) and ships as `dist/components/ui/HelpPopover.vue.d.ts`, so removing it would be a breaking API change rather than a cleanup — and **external non-use could not be established**, so per the step's own instruction the honest outcome is to keep it and cover it. `@phlix/ui` is **not on the npm registry** (404), so there are no download statistics, and `repos/detain/phlix-ui/dependency-graph/dependents` is 404 — a tarball or `github:` URL dependency is never recorded in a dependency graph anyway. Decisively, **the in-estate consumer list itself was wrong**: the step named two consumers, there are **four**, and they pin with two *different* syntaxes — `phlix-server/web-ui` and `phlix-hub/web-ui` on `…/archive/refs/tags/v0.98.34.tar.gz`, `phlix-windows-client` on the same form at **v0.81.0**, and `phlix-tizen-client` on `github:detain/phlix-ui#v0.98.33`. A public code search for the tarball form returned 8 hits and missed tizen entirely; searching the `github:` form surfaced tizen only in its docs, never its `package.json`. A method that misses a **known** consumer cannot establish the absence of an unknown one. This also matches this file's own precedent: the `canDecodeHevcInMp4` removal was justified as "not breaking for any pinning repo" *because* it was never on the public entry surface, and public symbols with no known consumer (`music.of`, the retained settings message keys) have been **deprecated rather than deleted**.

  So the 0% coverage was the defect, and 19 tests close it: trigger a11y state (collapsed `aria-expanded`, *absent* `aria-controls`, `Help` vs `Help for <field>`), open/close via click, close button, Escape and outside `pointerdown`, the `openPopover` early exit, focus into the panel and back to the trigger, link rendering through `HelpText`, listener teardown, and all four `updatePosition()` branches (below, flip-above, no-flip-when-above-is-worse, right-edge clamp). Seventeen mutations, each with a named killer. **Three of them survived the first draft and are the interesting ones:** deleting `if (open.value) return;` was invisible to a panel-count assertion (`open.value = true` is idempotent by itself), so the test now pins the `nextTick` block the guard skips — an unguarded re-open yanks focus from a panel link back to the close button. Deleting `closePopover()`'s `triggerEl.value?.focus()` was invisible **twice**: in the normal path `useFocusTrap.deactivate()` restores `prevFocus`, which *is* the trigger after a real click, and on a programmatic open the deactivate runs **last** and wins anyway — the line only decides when `prevFocus` has left the DOM (`document.contains(prevFocus)` false), which is the state the test now creates. And deleting `onBeforeUnmount`'s `removeEventListener` was invisible because Vue nulls template refs on unmount, so the stale `onDocPointer` still fires but bails at `triggerEl.value &&`; the handler is nonetheless attached for the life of the process, so the test now tracks live `pointerdown` subscriptions in a `Set` keyed by handler (the `FilterBar.test.ts` technique, because `watch(open)` also removes and a ±1 counter can be driven negative) and unmounts while still **open**, the one path where `onBeforeUnmount` is the only cleanup. Red on the broken tree with **8** abandoned `onDocPointer` handlers.

  Every positioning test stubs `getBoundingClientRect`/`offsetWidth`/`offsetHeight`, because jsdom returns **0** for all of them — and `0` is not `undefined`, so `panelEl.value?.offsetWidth ?? 320` never takes its default and the flip/clamp branches are otherwise **unreachable**. Raw `dispatchEvent` throughout, since the listeners are capture-phase on `document` where VTU's `trigger()` cannot reach them.

- **The subtitle default-track acceptance sentence, which nothing asserted, and the measurement that says which half of it a test can reach at all (plan_updates.md — S13, AC audit 2026-08-02).** Test-only — **not one byte of bundled source changes**, deliberately (see the `dist/` note below). S13 landed in `b702aee8` and **both of its production changes hold under mutation**: restoring `:default="st.default"` on the server-subtitle `<track>` is red on *renders a `<track>` per server subtitle track … (no native default attr)* (`expected '' to be undefined`), and removing `scheduleModeRecheck()` from `CaptionOverlay.rebind()` is red on three tests. Deleting the deferred `applyTrackModes` call, dropping the `if (next.length)` overwrite guard, dropping `clearRecheck()` from `unbind()` and dropping the `el.readyState !== 2` half of the load-listener gate are each red on exactly one test. `renderTextTracksNatively: false` — the reason hls.js is not a third owner of the track `mode` — is separately pinned (`false → true` is red on *keeps the phlix-ui defaults when no hlsConfig is given*).

  **What was not pinned is the step's own sentence.** S13's acceptance reads *"a manual load of a title with a server-flagged default subtitle shows captions without a manual toggle"*. `Player.test.ts` proved the **selection** half (`subtitleLang === 'jpn'` + `Captions (on)`) and `CaptionOverlay.test.ts` proved the **paint** half against a bare overlay; nothing joined them for the server-default path, so no single test said the sentence. Two Player-level tests now do, with zero user interaction — no click, no keypress, no `store.setSubtitle()`, only a `loadedmetadata` event. The second runs under **real timers** and models the failure the step exists to fix: a third owner stamps on the track mode *after* the overlay bound (`'showing'` from the native `default` attribute S13 removed, or `'disabled'` from hls.js's subtitle-track controller) while the cue that is already active fires no `cuechange`. It kills `scheduleModeRecheck()` and its inner `applyTrackModes` at integration level, which the existing fake-timer unit tests do not — a different SHAPE, not another count. The first is honestly a restatement rather than a unique killer: removing `player.setSubtitle` from `maybeApplyServerDefault` turns it red alongside three siblings.

  **A guard half that was covered by accident.** `rebind()`'s load-listener block is gated on two independent conditions — `!lines.value.length` **and** `el.readyState !== 2` — and the single test covering it held **both** false at once, so deleting `!lines.value.length` left all 4 423 tests green. It is now isolated at `readyState 1` with a cue already present, with the existing readyState-1/no-cues test standing as the non-vacuity control (same fixture, no cues, listener **does** attach).

  **The reachability claim is now a measurement, not folklore.** On **jsdom 29.1.1** a real `<video>` reports `readyState === 0` forever and `textTracks.length === 0` *even with `<track>` children*, and a real `HTMLTrackElement` reports `readyState === 0` (never 1/2) and `track === undefined`. So `trackElementFor`'s identity match (`el.track === track`) can only ever succeed against a double, and the whole `<track>` `load` branch — its `readyState !== 2` guard included — is **unreachable from any real-DOM mount**; every test that exercises it supplies a hand-rolled `fakeTrackEl`. `src/components/player/captions-jsdom-reachability.test.ts` pins those four numbers so the day jsdom implements the surface it goes red, which is the signal to revisit the warning now carried on `trackElementFor` and convert the doubles to real-DOM tests. **The browser half of S13's acceptance stays UNVERIFIED and cannot be closed from vitest** — jsdom never loads media, so nothing here can show a sidecar VTT painting on load; the manual steps are in `plan_updates_worklog.md`.

  **Why the warning above lives in the test file and not on `trackElementFor` itself.** It was written there first, then moved. A comment inside a *scoped* SFC rehashes that component's `data-v-` scope id, and the rebuild that follows changed `dist/player.js`, `dist/player.umd.cjs` and `dist/ui.css` — measured, not assumed: building this branch's source produced **58** `git status` entries under `dist/` against **55** for master's own source, the extra three being exactly those files. Since `@phlix/ui` ships a tracked pre-built `dist/`, a docblock is not free here; the knowledge went to `CaptionOverlay.test.ts` (never bundled) instead. **Separately, and pre-existing: those 55 entries mean the committed `dist/` is already stale against master's own source** — 20 tracked chunks deleted and rehashed (`MusicAlbumCard`, `MusicLibraryPage`, `PlayerPage`, `SecuritySettingsPage`, `SettingsPage`) plus modified `dist/index.d.ts`, `dist/composables/useTheme.d.ts`, `dist/stores/usePreferencesStore.d.ts`, `dist/phlix-ui.js` and `dist/style.css`. Declaration drift is the consumer-visible half of that. Not fixed here — rebuilding `dist/` inside a test-only audit would sweep five unrelated pages' output into this commit — and filed as a follow-up.

- **The two S118 fixes that nothing was guarding, and the machine that finds the next one (plan_updates.md — S118, AC audit 2026-08-02).** Test-only; no shipped code is touched. S118's stated acceptance — *"20 consecutive `npm run test:run` invocations pass on an unmodified tree"* — was **re-measured on master and holds: 20/20 PASS**, 38.1–44.1 s, median ~41 s, `228 files / 4 210 passed | 10 skipped` every run. Its second half — *"the tests still fail if the behaviour they cover regresses"* — also holds: breaking `FilterBar.vue`'s `stuck.value = window.scrollY > 24`, `admin.ts`'s `redirect: { name: pages[0].name }` and `usePreferencesStore`'s debounce `clearTimeout` turns 1 / 4 / 1 tests red respectively. **What was not true is that either result was protected by anything.**

  **`enableAutoUnmount(afterEach)` — S118's whole fix-at-cause — could be deleted with the entire 4 220-test suite still GREEN.** A leak costs *time*, not correctness, so nothing failed: `FilterBar.vue:322` subscribes to window `scroll` in `onMounted` and unsubscribes only in `onBeforeUnmount`, and with the line removed **23 abandoned FilterBar instances** are still subscribed by the last describe. Measured on the same box under the identical full parallel suite, from the JSON reporter: the sticky test goes **128 ms → 3 030 ms (23.7×)** and the whole file **7 229 ms → 9 836 ms**. 3 030 ms is 61 % of the 5 000 ms default the flake originally blew. `FilterBar.test.ts` now tracks live `scroll` subscriptions in a `Set` keyed by handler and asserts the set is empty in a final describe — a `Set`, not a counter, because `onBeforeUnmount` calls `removeEventListener` *unconditionally*, so a `sticky: false` instance that never subscribed drives a naive ±1 counter negative and hides the very leak it is meant to catch. It ships with the two-sided companion (`scrollSubscriptionsEverSeen > 1`) so it cannot go vacuous if FilterBar ever stops subscribing. Red on the broken tree: `expected [ [Function onScroll], …(22) ] to have a length of +0 but got 23`.

  **`src/__tests__/vitest-timeout-budgets.test.ts` — the recurrence guard for the hazard that already bit twice.** A global default raised to an override's own value silently deletes that override, and the only two times it has been caught it was caught by hand, weeks apart. Re-mutating `vite.config.ts`'s `testTimeout: 30000 → 120000` — which neutralises `MusicLibraryPage.test.ts`'s 120 000 ms test budget, its 60 000 ms describe floor, `dist-player-split.test.ts`'s 120 000 ms `afterAll` and both `admin.test.ts` describes at once — left the suite **green, exit 0**. So did adding `retry: 3` to the vitest config, i.e. the one fix S118's in-scope section explicitly forbids. The new spec reads the globals out of `vite.config.ts` (never a hard-coded copy), scans every `src/**/*.test.ts` for both spellings of an explicit budget — the options-object form `describe('…', { timeout: N }, …)` and the trailing-argument form `it('…', fn, 120_000)` / `beforeAll(fn, 300_000)` — routes each to the right global (`testTimeout` for tests, `hookTimeout` for hooks) and fails on any budget that is not **strictly greater** than it. The trailing form is anchored **forward from the opener** rather than backward from the `}, N);` line, because a backward scan cannot tell an `it`'s budget from the second argument of a nested `setTimeout(() => { … }, 3000)`, whose closing line is textually identical. The detector is proved non-inert by a *"the detector itself"* block: it must extract both forms, must distinguish a hook budget from a test budget, must **not** report `vi.waitFor(fn, { timeout: 3000, interval: 25 })` (a real occurrence at `MetricsPage.apex-registration.test.ts:150`) or a nested `setTimeout`, and it carries an inventory of the eight known budget sites keyed by file/owner/value so a change that makes a budget *invisible* to the scan fails here instead of quietly reducing the file to a no-op. It skips only itself — its fixtures are deliberately neutralised examples — and pays for that skip with an assertion that it declares no budget of its own. Red on each broken tree: 6 neutralised budgets listed under the global raise, and `expected … not to match /\bretry\s*:/` under the retry.

- **Regression guards for six Phase-0 quick wins whose acceptance criteria shipped TRUE but UNPINNED (plan_updates.md — S02, S04, S06, S08, S09; S03 and S07 audited and found already pinned).** Test-only; no shipped code is touched by any of it. The operating rule for the audit was *a criterion that is true today but has no test that would catch its removal is NOT MET* — "it works" and "it is pinned" are different claims and only the second survives the next refactor. Every verdict below was reached by mutating the production line and naming the command that goes red; nothing was closed on the strength of a commit message or a plausible-looking diff.

  **S08 + S09 were the worst: all five spacing decisions could be reverted at once and the full 4,207-test suite stayed GREEN.** `.library-page`/`.browse-page` `padding: 0` → `var(--space-6)`, `.library-header` `margin-bottom` `--space-3` → `--space-4`, `.media-row` `margin-block` `--space-6` → `--space-8`, and deleting `.filterbar`'s `margin-bottom` — i.e. the entire pre-S08/S09 state restored, with no red test. Both steps are pure CSS and jsdom never applies an SFC's compiled `<style>`, so no mounted-component test could ever have seen them. The new guards read the raw SFC (the `AppLayout.test.ts` / `Modal.test.ts` convention) and each one ships with the complement that makes it non-vacuous rather than a bare literal: the pages must declare a **literal** `padding: 0` *and* must not smuggle the gutter back as a margin or a one-sided padding; neither page may carry a `.shell__main` **selector** (S09's out-of-scope line requires the fix be page-scoped so Settings/Admin/Music/Search do not move — comments are stripped first, because both SFCs legitimately *name* `.shell__main` in prose and matching that would fail the assertion for the *right* code); the FilterBar gap must be `margin-bottom` and not the grid's `margin-top`, since a following sibling's `margin-top` collapses under a sticky bar; `is-stuck` must stay a strictly heavier `--shadow-3` against the resting bar's `--shadow-2`, or the pre-existing class-toggle test pins a class that changes nothing (that is the *"`is-stuck` still renders correctly"* half of S08's AC); and `.media-row`'s spacing must remain a **margin, never padding** — not a style preference, but because margins sit outside the `contain-intrinsic-size` box and padding sits inside it, so the swap silently falsifies S09's *"no first-paint jump"* claim. Thirteen mutations, one per assertion, all red.

  **S06's acceptance criterion says *every* secret input, and it could not have held.** The attributes were in fact all present in source (9 secret inputs across 6 admin pages), but three pages had nothing pinning them (`WebhooksPage` HMAC signing secret, `SyncPlayPage` create + join passwords) or only half (`PluginsPage` asserted `autocomplete` and not one of the four `data-*` hints), and `UsersPage`'s profile Set-PIN — the page's *second* secret input, two clicks deep — was never reached. Those are now guarded per page, each with a negative case so the hints are not blanket-applied to the non-secret field beside them. The load-bearing addition is `src/pages/admin/adminSecretInputs.test.ts`, the recurrence guard the AC actually needs: per-page tests can only pin fields that exist *today*, so a newly-added `type="password"` on any admin page would ship bare and every one of them would still pass. It scans the admin SFC source for every secret input — including pages with **no test file at all** (`TranscodingSettingsPage.vue`, `WebhookLogsPage.vue`) — and asserts `autocomplete="new-password"` plus all four password-manager opt-outs on each. Proven by adding exactly that: a bare `<input type="password">` on `TranscodingSettingsPage.vue` is caught by **one** test in the whole 4,203-test suite, and that test did not exist before this change. The scanner is itself proved non-inert rather than assumed — it asserts it found the 9 known inputs across the 6 known files, and a *"the detector itself"* block feeds it fixtures (bare input, the pre-S06 `autocomplete="off"`, each hint removed one at a time) and asserts it reports exactly the right violation. Its tag extractor is quote-aware on purpose: a naive `/<input[^>]*>/` truncates at the `>` in `v-if="len > 0"` and silently passes every attribute after it.

  **S02 was met for movies and completely unpinned for series.** A series renders `SeriesDetail`, not `MediaDetail`, so the merged metadata-match action has a second, independent copy of every binding — and three mutations survived green: `SeriesDetail.vue`'s `@refresh` re-emit, and both `@refresh="onMatch"` and `@match="onMatch"` on the page's `SeriesDetail`. The series ⋯-menu "Match metadata" entry and the series hero button could each stop opening the match modal with no red test. Their siblings `@edit-metadata`/`@explore-data` were pinned by S15; the S02 pair was skipped. The movie half *was* genuinely pinned (both bindings red under the same mutation), as was "one menu entry remains" (re-adding `{ label: 'Refresh metadata' }` and duplicating the single `matchMetadata` entry are both red).

  **S04's second AC bullet — *"existing `[open]` CSS applies correctly"* — was unpinned** while its first was fine. Deleting the whole `.admin-libraries__help[open] .admin-libraries__help-summary { margin-bottom: var(--space-3) }` rule left 4,205 tests green. That rule is precisely what S04 made load-bearing: before S04 the panel shipped collapsed so `[open]` was the exception, and S04 made it the default rendering on every page load. Guarded with its complement — the base summary rule must *not* carry the same margin, or the `[open]` rule is a no-op and "applies correctly" is vacuously true.

  **S03 and S07 needed no change and got none.** S03: re-adding `{ label: 'Like' }` to the builder is red, re-adding the `MENU_LABELS.like`/`.dislike` *keys* alone is separately red (both halves of the guard mutate), and unhooking `ThumbRating`'s `@cycle` from `setLike` is red in both `MediaDetail` and `MediaCard` — so "menu no longer offers Like/Dislike" and "thumb widget behavior unchanged" are each genuinely pinned; `UserRatingPicker.vue`/`RatingBadge.vue` still have zero importers, so the deferred-dead-code note remains accurate. S07: reverting the rail title to `"Favorites"` turns six `BrowsePage` tests red.

- **`MusicArtist`, `MusicAlbum` and `MusicTrack` are now named type exports of the package root (plan_updates.md — S144).** The barrel already re-exported every book row type (`BookDetail`, `BookListItem`, …) and every audiobook row type, but for music it carried only the four page envelopes (`MusicPageParams`, `MusicArtistsResult`, `MusicAlbumsResult`, `MusicTracksResult`) — so `import type { BookDetail } from '@phlix/ui'` worked while `import type { MusicAlbum } from '@phlix/ui'` failed with `TS2305: Module has no exported member`, and the README had to instruct readers to name a music row structurally as `MusicAlbumsResult['albums'][number]`. No type's shape changed; this is purely a widening of the exported surface to bring music to parity with the other two media families. The README paragraph that documented the old restriction has been corrected.

  **`dist/` was rebuilt in the same commit, and that is the load-bearing half.** `@phlix/ui` ships by tag tarball with `"files": ["dist"]`, a **tracked** pre-built `dist/`, and **no `prepare` hook** — so a consumer's `import type { MusicAlbum } from '@phlix/ui'` resolves against `dist/index.d.ts`, never against `src/index.ts`. An export added to source and not rebuilt typechecks inside this repo and still fails for every consumer, which is strictly worse than not adding it. `src/__tests__/dist-music-type-exports.test.ts` now reads the shipped declaration file and fails if the two ever drift apart again; it was written **before** the fix and was red against the then-current `dist/` (`expected [] to include 'MusicArtist'`), alongside the source-side `vue-tsc` failure the consumer would have seen.

  Two unrelated `dist/` deltas came along with that rebuild and are noted so nobody hunts them: `dist/style.css` is byte-for-byte the same length with the same 3 114 rules and differs **only** in `MediaBackdropRow.vue`'s scope id (`data-v-1cd4d615` → `data-v-d60cebf8`), and the `LibraryPage` chunk rehashed (`LibraryPage-BAZHzkdn` → `LibraryPage-COsOylYd`). Both are the committed `dist/` catching up with the 6-line `MediaBackdropRow.vue` change that landed in `dbc4cadc`/`61db3784` without a rebuild.

- **A `test:coverage` script (plan_updates.md — S139, the one in-scope item that release left unshipped).** S139's core — replacing the rotting `coverage.include` allow-list with a whole-tree `src/**/*.{ts,vue}` glob — shipped in 0.98.34's cycle as `96528ba0`. What did not ship was the script that makes the measurement reproducible without hand-typing flags, which is precisely how the Music pages came to be unmeasured for so long. Verified by execution rather than by reading the config: reproducing the **pre**-S139 allow-list verbatim and running the six `src/pages/Music*` test files gives 120 passing tests, **219 files in the report and zero `src/pages/Music*` among them** — silence, not an error; on the shipped glob, **272 files are measured** and every Music page carries real numbers (`MusicArtistPage.vue` 62/62 lines = 100 %, 36/39 branches = 92.31 %; `MusicLibraryPage.vue` 132/140 = 94.29 %; `MusicPlayerPage.vue` 38/60 = 63.33 %). No explicit `--testTimeout` is set on the script: the global `testTimeout` is already 30 s, which covers the ~10× instrumentation multiplier that otherwise makes vitest 4 suppress the entire coverage report when a single test times out.

### Fixed
- **The parental-controls page could not be opened for any real profile, because the client typed a `CHAR(36)` UUID as a `number` (plan_updates.md — S209, 2026-08-04).** `ParentalControlsPage.vue` gated the entire screen on `if (queryProfileId && !isNaN(Number(queryProfileId)))`. A profile id is a UUID — `user_profiles.id CHAR(36) PRIMARY KEY` (`phlix-server/migrations/002_user_profiles_and_parental_controls.sql:6`) — and `Number('a3f2c1d4-…')` is `NaN`, so the gate was `false` for every id that exists and `true` only for a bare integer, which no profile has ever had. The page rendered "No profile selected" and issued no request at all. The failure direction was **closed**, not unsafe: the screen was inert. The gate now checks **presence only** — one non-empty, non-array value.

  **The client must not re-derive a format rule, and the server proves why.** The three endpoints behind this page disagree with each other about what a profile id looks like: `AdminProfileController::get` accepts any string and 404s an unknown one, `ProfileTagController::parseProfileId` requires only a non-empty string, while `AccessScheduleController::parseProfileId` and `StreamLimitController::parseProfileId` both demand a canonical UUID via regex. A client stricter than the **loosest** of those would refuse ids the server would serve, which is the same mistake in a new spelling. A malformed id is therefore carried to the server and comes back as a named 404/400, which S203's "Unidentified profile #\<id\>" badge already renders with the reason — strictly more informative than the blank empty state the numeric gate produced, and still closed, since every write path re-validates server-side.

  ⚠ **The existing tests pinned the bug as the contract, and the FIXTURE is what made that survivable.** The S160 suite asserted "nothing is loaded without a valid **numeric** `?profile=<id>`" and listed `?profile=abc` and `?profile=7abc` among the inputs that must fail closed — but a UUID *is* a non-numeric id, so those rows asserted the exact rejection that broke the page. `?profile=0` passed for a reason unrelated to `0` being unreal: `Number('0')` is falsy, and the same accident rejected every UUID. Underneath all of it sat a single `const PROFILE = 7`, the one shape the broken gate accepted, so no assertion in 1,600 lines could see the defect. `PROFILE` is now a genuine 36-character UUID, which re-points the **whole file** at the real shape rather than adding one UUID test beside forty numeric ones: reinstating the numeric gate now fails **103 of 113** tests in the file, where before it would have failed none.

  **Each half of the new gate was mutated separately, and one half was found to be pinned by nothing.** Deleting the array guard reds 2 tests (a repeated `?profile=a&profile=b` arrives from vue-router as an array; there is no defensible way to pick one of two ids on an access-control screen). Deleting `&& queryProfileId.trim() !== ''` initially left **all 111 tests green** — `?profile=` sets the id to `''`, which is falsy, so every downstream `if (!profileId)` and `v-if="!selectedProfileId"` behaves exactly as if it were `null` and nothing on screen differs. The check is invisible, not useless: it holds the invariant that the id is `null` or a non-empty trimmed string, never `''`, and the value's job is to be interpolated into a URL — `getProfile('')` would request `/api/v1/admin/profiles/`, the **collection** rather than a member. It is now asserted on the state directly, the only way to reach a guard with no rendered consequence, and reds on that mutation.

  **The id shapes in `api/admin/users.ts` are MIXED, and each field was checked against its own migration rather than made consistent.** Corrected to `string`: `Profile.id` / `Profile.user_id` (migration 002:6-7), `AccessSchedule.profile_id` (061:9), `ProfileTag.profile_id` (062:10), and `User.id` (server `001_initial_schema.sql:5`, hub `001_users.sql:8` — the same column `UserBandwidth.user_id` has always typed as `string`). Deliberately left `number`: `AccessSchedule.id` (`INT UNSIGNED AUTO_INCREMENT`, 061:8), `ProfileTag.id` (062:9), and both `ProfileStreamLimit` fields (`INT UNSIGNED`, 063:8-9). Migrations 061/062/063 each carry a standing note that `profile_id` was *already once* corrected from `INT UNSIGNED` to `CHAR(36)`; the sibling `id` columns were not, and "tidying" them into agreement would have been worse than the bug. Every id-taking API method widened to `string | number` — a pure widening, so no caller breaks.

  **`User.id` carried no runtime defect and is corrected for a different reason.** Unlike the profile id it is only ever interpolated into a URL — never coerced, compared numerically or sorted — so nothing mangled it; the typecheck fallout was 5 lines in one local helper. It is fixed because it feeds `createProfile()` and `listProfiles()`, and leaving the owner id typed `number` while `Profile.user_id` is `string` would leave the next reader the same false clue that produced this gate. That claim is checked rather than asserted: a new `UsersPage` test drives the profiles modal with real UUIDs on **both** the user and the profile and asserts each URL whole, and reds when `listProfiles(userId)` is mutated to `listProfiles(Number(userId))`. The shared mock's own `\d+` route matchers were widened to `[^/]+`, since a harness that only matches digits would have thrown `unexpected GET` for a real id — the test double was encoding the same assumption as the code.

  Suite: 4760 → 4766 passing, 245 files, 10 skipped. **Two server-side defects found while verifying and NOT fixed here** (they belong in `phlix-server`): `AdminProfileController::createForUser` returns `'profile_id' => (int) $newId` where `UserProfileManager::create()` is typed `: string` and returns a UUID, so the create response ships `0` (`(int)` of a UUID) — inert only because no caller reads it, and the reason `createProfile`'s return is typed `string | number` rather than `string`; and the tag endpoints drift on both the id key and the body field (server returns `{ tag_id }` / `{ schedule_id }` where the client declares `{ id }`, and reads `type` where the client sends `tag_type`).
- **The up-next queue stranded `type:"episode"` rows that carry no parsed `episode_number` on the genre-similar queue, and the test guarding S12's race fix sampled the race with a timer instead of forcing it (plan_updates.md — S12, AC audit 2026-08-02).** S12's production fix itself is intact and now proven: `applyItem()` awaits `loadEpisodeNeighbours()` first and returns early once a next episode resolves, so the genre fallback never races it.

  **The residual is a predicate split that S12 created.** `loadEpisodeNeighbours()` — like `series-grouping.episodesOf()` — calls an item an episode when `type === 'episode' || episode_number != null`, but `applyItem()` tested `episode_number` **alone**. The server really produces the difference: `MediaItemShaper.php:279` shapes `episode_number` out of `metadata.episode` and emits **null** whenever the scanner or provider parsed no episode number, while `type` comes from the DB enum independently — and such a row **is** in the ordered playback list (`compareEpisodes` sorts a missing number last within its season). Before S12 the gap was masked, because `loadQueue()` carried its own `type === 'episode'` cache lookup; S12 deleted that lookup as redundant, which it was for every row the two predicates agreed on and was not for these. The effect was a silent downgrade: no Previous/Next buttons and an up-next queue of unrelated genre matches instead of the next episode. Both call sites now share one `isEpisodeItem()` helper. Narrowing it back is red on `treats a type:"episode" row with NO parsed episode_number as an episode`.

  **The race test could not have failed for the reason it claimed.** It delayed the genre response by `setTimeout(…, 40)` and re-read the queue after `setTimeout(…, 80)` — a timing window, i.e. a sample of the race rather than the race itself, and the estate has already recorded a race test going 15/15 green against known-broken code. It is now driven by a **deferred promise the test resolves itself**, so "the slow genre response lands *after* the episode-ordered write" is forced rather than hoped for. Its negative assertion is backed by a `CONTROL` case that runs the identical gate and URL matcher against a **movie**, where `loadQueue` is the rightful writer: the request is issued, the queue stays empty while the gate is held, and releasing it writes the genre rows through — so a mis-routed mock or a dead gate cannot produce a vacuous pass. Against the pre-S12 two-writer ordering the rewritten test fails with `expected [ 'q-g1', 'q-g2' ] to deeply equal [ 'q-e2', 'q-e3' ]`; the old timer-based one is the thing being replaced.

  **`loadQueue`'s deleted duplicate cache lookup is dead by measurement, not by assumption.** Restoring it verbatim leaves all 4 423 tests green, which on its own only says no test noticed. Restoring it *instrumented* — a `console.error` on branch entry and on each of its two outcomes — logs **zero hits across the whole 235-file suite**, and the same instrumentation under the pre-S12 ordering fires (`branch-entered`, `setQueue-taken`), so the detector is live rather than broken. That matches the structure: `applyNeighbours()` derives `nextEp` and the seeded remainder from the same array and index, so `nextEp` is truthy exactly when the remainder is non-empty, and the only way to reach `loadQueue` from an episode is with an empty remainder. Deleting `applyNeighbours()`'s own seeding line turns the race, binge-cache-hit and no-episode-number tests red together — that line, not the removed lookup, is what feeds the queue.

- **`admin.test.ts`'s two `{ timeout: 30_000 }` describes were literals granting nothing; restored to real budgets (plan_updates.md — S118, AC audit 2026-08-02).** Both were left alone by S118's completion pass as an *observation* — measured 4 558 ms against ~6.6× headroom, so changing them then would have been over-generalising a fix proven only for the site that failed. The audit closes them for a different reason: they are exactly equal to the global `testTimeout` that `39092c5d` raised to 30 000 ms, so the literals read as deliberate and grant **zero**. That the option is real was verified rather than assumed — dropping the same describe to `{ timeout: 1 }` times out all three of its tests — and the slowest test in it measures **2 227 ms** under the full parallel suite (`buildHubAdminRoutes`: 527 ms). Raised to `60_000`, twice the global and 27× the measurement, and both are now covered by the new budget guard: reverting either one to `30_000` is red.

- **A global `testTimeout` raise had silently deleted three deliberate per-site overrides, and one of them was already thin (plan_updates.md — S118, completion).** Test-only change; no shipped code is touched. S118's acceptance is *"20 consecutive `npm run test:run` invocations pass on an unmodified tree"*, and it did not hold: **18/20**, with two reds, both in `src/pages/MusicLibraryPage.test.ts > paging the library (S110)` and both `Test timed out in 30000ms`, on the two slowest runs of the twenty (77 s and 82 s against a 37 s median).

  **The cause generalises beyond this test.** `vite.config.ts`'s global `testTimeout` went 5 000 → 30 000 ms in `39092c5d` (2026-08-01) — *after* S118 (`9c646fa7`, 2026-07-27) had granted three specific sites an explicit `30_000`. A global default raised to an override's own value **deletes that override**: the literal still reads as deliberate in the source and grants exactly nothing. `MusicLibraryPage.test.ts:819` was one of the three, and its own comment still said *"a longer budget than the 5 s default"*.

  **Measured, not reasoned.** A full-suite `--reporter=verbose` run that **passed** put the heavy test at **19 960 ms of its 30 000 ms budget — 1.50× headroom**, thinner than anything S118 originally fixed. Its two casualties are different in kind: that test is genuinely ~20 s of work (97 real drill-downs, each re-rendering the 97-card grid), while the other red — *"an album request abandoned by a view change…"*, which measures **117 ms** — was collateral, because vitest runs a file's tests serially in one worker and the 20 s sibling starves whatever is executing when the clock expires. So the describe gets a **60 000 ms floor** and the one heavy test gets **120 000 ms**.

  **A/B at reproducible width**, 24 CPU spinners held across both arms — control = master's `30000`, treatment = the new budgets:

  | | control (30 000) | treatment (120 000 + 60 000 floor) |
  |---|---|---|
  | run 1 | **RED — 30 306 ms** | green — 19 745 ms |
  | run 2 | green — 20 574 ms | green — **50 748 ms** |
  | run 3 | green — 18 069 ms | green — **31 525 ms** |
  | run 4 | — | green — **47 912 ms** |

  The control crossed its budget by 306 ms. **Three of the four treatment runs exceeded 30 000 ms** and passed only because of this change; the worst observed cost is 50 748 ms, so 120 000 sits 2.36× above the worst measurement and 6.0× above the typical one, and matches the budget S118 itself chose for the same "the work is genuinely this expensive" class at `src/__tests__/dist-player-split.test.ts:113`. **Deliberately not generalised:** `src/app/admin.test.ts:134` and `:164` carry the identical neutralised `{ timeout: 30_000 }`, but their subject measures 4 558 ms under the full suite (~6.6× headroom) and neither went red in any of the 27 full-suite runs recorded for this change, so they are left alone and recorded as an observation.

- **`SeriesSeasons.test.ts`'s "opens every season when `openFirstOnly` is false" could not fail (plan_updates.md — S135).** Test-only change; no shipped code is touched. The assertion was `findAll('details').forEach((d) => expect(d.attributes('open')).toBeDefined())` — an aggregate over a collection that can be empty, so with no seasons the loop body simply never ran. Proven vacuous rather than argued: mounting the same test with `seasons: []` left the file at **17/17 pass**. It now pins the cardinality (`expect(details).toHaveLength(3)`) *before* the loop, and the identical mutation is red — `expected [] to have a length of 3 but got +0`. Mutating the component instead (`SeriesSeasons.vue:102` → `return index === 0`) is also red, so the loop half still gates the behaviour in the test's title. The pin is a literal `3` and not `seasons.length` deliberately: comparing the render against the same fixture would go vacuous again in lockstep if the fixture emptied.

## 0.98.34 - 2026-07-28

### Fixed
- **On a browser that cannot decode HEVC, every `.mp4` and `.m4v` the capability probe examined whose video and audio the browser could actually decode — 13,020 of the 16,731 `mp4`/`m4v` items in the current production library — was misclassified as needing a transcode and then hung on the "Preparing…" overlay instead of direct-playing.** (Whether the probe examined a given item at all was itself race-dependent on v0.98.33 — see *Changed*. HEVC capability scopes only the `.mp4` half: the 112 `.m4v` items in that 13,020 were misclassified on **every** browser, for the container-MIME reason below. The other **3,711** were flagged **correctly**: 368 real HEVC, 3,340 AC-3, 2 MP3, 1 MPEG-4 Part 2. They hung on the same overlay for the reason in the next bullet.) The R3.8 direct-play guard asked exactly one question — can this browser decode HEVC-in-MP4 (`canDecodeHevcInMp4()`) — and applied the answer to the **whole container**: `needsTranscodeWithCapabilities()` ran that probe for `ext === 'mp4' || ext === 'm4v'` and returned "transcode" on a negative, with **no reference at all to the codec actually inside the file**, so a plain H.264 mp4 the browser plays natively was judged by whether the browser can play HEVC. `.m4v` carried a second, independent copy of the same shape: the container MIME was built by concatenation (`video/${ext}`), and `video/m4v` / `video/ogv` are MIME types no browser knows, so every probe against them — including the audio probe, which runs first — answers `''` / `supported: false` for *every* codec and reads as "undecodable" (measured, Chrome 150 / Linux: `video/m4v; codecs="mp4a.40.2"` → `''` against `video/mp4; codecs="mp4a.40.2"` → `'probably'`).

  **Scope, stated honestly:** only the **HEVC half** of the guard was browser-conditional. It fired where the browser genuinely cannot decode HEVC — Chrome/Chromium/Firefox on Linux, Windows without the HEVC extension — and on Safari and on HEVC-capable Chrome that same probe answered "can decode" and it did not fire. **The other two halves fired regardless of HEVC support.** `video/m4v` is a MIME type *no* browser knows, so the audio probe — which runs first — read "undecodable" for all 117 prod `.m4v` items on every browser, HEVC-capable or not; and the audio veto is orthogonal to HEVC decode support, so on Chrome the 3,340 AC-3 and 2 MP3 `mp4` items were flagged whether or not that Chrome carried the HEVC extension. And *not* the root cause, recorded only so the next reader does not chase it: the bare `video/mp4` `decodingInfo()` call resolves `{ supported: false }` rather than throwing on an incomplete `VideoConfiguration`, but `canDecodeHevcInMp4()` was `if (result.supported) return true;` inside a `try` and otherwise **fell through to a `canPlayType` ladder** over four real HEVC codec strings — so a `{ supported: false }` resolve and a spec-compliant `TypeError` yield the identical verdict. The `decodingInfo` behaviour is immaterial to this regression; applying an HEVC answer to a container is the defect.

  **The misclassification did not produce a transcode — it produced nothing.** The capability path set `transcodeNeeded.value = true` and started no job (see the next bullet), while `videoSrc` computes to `undefined` the moment that flag flips, so direct play was torn down and `showPreparing` went true with `tc.state === 'idle'`: a permanent "Preparing…" overlay over a file the browser could have played natively.

  The guard is now a **decodable-codec allowlist keyed on the source's real video codec** (`videoCodecPolicy()`, reading the `stream_type === 'video'` row of the `streams[]` array that `GET /api/v1/media/{id}` carries) rather than a question about the container: an **unknown/absent** codec and **`h264`** (with its `avc` / `avc1` / `x264` spellings) resolve to `direct` with no probe at all; **`hevc` / `av1` / `vp9` / `vp8` / `theora`** are capability-probed with a real RFC 6381 codec string against the container's **true** MIME type (`containerMimeForExtension()` — never `video/${ext}`, because `video/m4v` and `video/ogv` are MIME types no browser knows and probe as undecodable for *every* codec, which was a second copy of the same bug); and **any other reported codec transcodes** without a probe. That last rule closes a silent-black-screen class rather than merely restoring direct play: measured on Chrome 150/Linux, an mp4 whose video stream is undecodable but whose audio stream is fine fires **no `error` event at all** — `video.error` stays `null`, `readyState` reaches 4, `canplay`/`playing` fire and the audio plays while `videoWidth` is 0 — so `isFatalMediaError()` / `onVideoError` never see it and there is no reactive recovery. A codec that cannot be positively cleared (MPEG-4 Part 2, MS-MPEG4, MPEG-1, MJPEG) must therefore be caught up front. **Net effect on the current production library: 13,020 items change playback path** — 12,908 `mp4`+`h264`+AAC and 112 `m4v`+`h264`+AAC items go from **stuck "Preparing…" overlay → direct play**. That total is the figure on a browser that cannot decode HEVC; on an HEVC-capable one the 12,908 `mp4` items already direct-played and only the 112 `.m4v` items change, because the `.m4v` half never asked an HEVC question in the first place. (16,362 items carry `h264` *video*, but that is a different population and not the direct-play gain: the audio veto runs after the video policy and is unchanged by this release, so the 3,340 `mp4`+`h264`+AC-3 and 2 `mp4`+`h264`+MP3 items among them transcoded before and transcode now — see the next bullet.) The only prod item that the "anything else transcodes" rule newly classifies `transcode` is a single `mp4` carrying MPEG-4 Part 2, and that is an improvement in both directions: on a browser without HEVC decode it was already being flagged (and hanging), while on an HEVC-capable browser it direct-played into exactly the silent black screen described above. The audio veto (E-AC-3 / AC-3 / DTS) is unchanged and still runs on every path that has not already decided to transcode, and `.mov` still does not newly direct-play in Chrome. **`unknown → direct play` is a deliberate, bounded risk rather than a safe default — see *Notes*.**

- **Anything the capability probe flagged never got a transcode job started, so it sat on "Preparing…" forever — the probe now starts the job.** This is the half that actually ends the stuck overlay, and it is not confined to the misclassified files above: a genuinely undecodable source — real HEVC video, or an E-AC-3 / AC-3 / DTS (or MP3-in-MP4) primary audio track — reached the same dead end. On the current production library that is the other **3,711** `mp4`/`m4v` items, the ones the guard flagged **correctly**: **3,342** whose primary audio the browser cannot decode (3,340 AC-3 + 2 MP3), 368 real HEVC, and the single MPEG-4 Part 2. The 3,342 are untouched by the video-policy change above — the audio veto is unchanged, so they were flagged on v0.98.33 and are still flagged now; what changes is that the job actually starts, so they transcode and play instead of hanging. The two synchronous starts (`onMounted` and `evaluateForCurrentMedia`) have both already run by the time an async probe resolves, and nothing watches `transcodeNeeded`, so the flag was terminal: direct play gone (`videoSrc` → `undefined`), the preparing overlay up, and no job in flight. The only other route to a job was a fatal `<video>` error, which — measured — never fires for an undecodable video stream alongside decodable audio. `evaluateTranscodeWithCapabilities()` now calls `beginTranscode(videoRef.value?.currentTime ?? 0)` itself.

- **Two tests no longer fail intermittently against Vitest's 5 s default `testTimeout` (plan_updates.md — S118).** Test-only change; no shipped code is touched. Both had been observed within a few hundred ms of the limit under the full 214-file parallel run, and `npm run test:run` has gated every push and PR since the `test` job was enabled on 2026-07-26 (`.github/workflows/ui-ci.yml:20-23`, `:44`), so an intermittent red there trains reviewers to re-run until green.

  **`FilterBar.test.ts` — fixed at the cause, not with a bigger budget.** `FilterBar.vue:322` subscribes to `window`'s `scroll` in `onMounted` and unsubscribes only in `onBeforeUnmount` (`FilterBar.vue:328`), and the file called `mount` 26 times against 2 `unmount()` calls — so by the last describe roughly 24 abandoned FilterBar instances were still subscribed. The single `window.dispatchEvent(new Event('scroll'))` in *"adds is-stuck once the window scrolls past the threshold"* woke all of them, and awaiting the flush re-rendered every one: 1506 ms of that test's 1585 ms in a solo run, and **4174 ms of the 5000 ms budget** under the full suite. The cost was **not** timer-related, which is worth recording because the obvious reading of the code says otherwise — `vi.getTimerCount()` returned **0** both before and after `vi.runAllTimersAsync()`, and replacing that call with a bare `nextTick()` moved the same ~1.3 s along with it. `enableAutoUnmount(afterEach)` leaves only the test's own instance subscribed: **3259 ms → 119 ms** under the full parallel suite, with all 25 tests in the file still passing.

  **`admin.test.ts` — a longer, explicit budget, because the work is real.** `router.push` makes vue-router resolve the matched records' lazy components, and `admin.ts:63` is a genuine `() => import('../pages/admin/DashboardPage.vue')` (733 lines) beneath `AdminLayout.vue`, transformed on first use. Measured: the first navigating test spent **1223 ms of its 1245 ms inside `push`**, while a second `push` through a freshly built router took **2 ms** — the entire cost is the one-time module load, so there is no timer to fake and no wall-clock wait to shorten. Under the full suite that first push was seen at **4558 ms**, leaving 442 ms of headroom. The two describes containing real navigations now carry `{ timeout: 30_000 }` (per-describe, so a newly added navigating test inherits it), matching the existing precedent at `MusicLibraryPage.test.ts:819`, which already sets `30000` for the same reason.

  **`dist-player-split.test.ts` — a third flake, found by the 20× loop and not named in S118.** One of 20 consecutive `npm run test:run` invocations went red with **all 3987 tests passing**: the failure was `Error: Hook timed out in 10000ms` in the `afterAll` at `src/__tests__/dist-player-split.test.ts:102`, which `rmSync`s a whole throwaway Vite build output. The `beforeAll` that produces that output already carried an explicit `300_000` (line 100); the teardown was simply left on Vitest's default 10 s `hookTimeout`, even though it deletes a tree the size of the committed `dist/` (28 MB over 782 files, most of it `.map` — `vite.config.ts` sets `sourcemap: true`) while the other 213 files still contend for the disk. It now carries `120_000`.

  **`usePreferencesStore > debounces rapid changes` — not slow, but it was vacuous.** The third test S118 names needed no timeout at all: it measured **3–29 ms** across full-suite runs. Mutation testing it (S118 requires proving each test still gates its subject) showed something worse than slowness — it passed with the debounce **deleted** and the store persisting synchronously, and passed again with the `clearTimeout` on `usePreferencesStore.ts:287` deleted, i.e. it verified neither half of the behaviour in its own title. Two facts made it vacuous: `watch(snapshot, debouncedPersist, { deep: true })` (`usePreferencesStore.ts:294`) does not pass `flush: 'sync'`, so ten assignments in one synchronous loop produce **zero** watcher calls before the next `await` and the mid-loop `localStorage` read returns `null` regardless of any debounce; and Vue then **coalesces** those same-tick mutations into one watcher call, so the `clearTimeout` that does the real coalescing never ran. The test now spies on `Storage.prototype.setItem` and asserts the count, and spaces its ten changes 10 ms apart (still inside the one 250 ms window) so the watcher fires for each. Both mutants now fail it — "expected setItem to not be called at all, but actually been called 10 times" and "expected setItem to be called 1 times, but got 10 times".

### Changed
- **The capability probe now runs unconditionally, which makes the verdict on 368 production HEVC items deterministic where before the probe might not have run at all.** The watch that drives it went `{ immediate: false }` → `{ immediate: true }`, both `tracks.length === 0` early returns in `Player.vue` are gone (the watch callback's and `evaluateTranscodeWithCapabilities()`'s), and inside `needsTranscodeWithCapabilities()` the `playbackAudioTracks.length > 0` condition that used to gate the **whole** probe block now gates only the audio probe — so the video decision is taken from the detail response's `streams[]` alone, before and independently of any audio-track data. It has to be: the old watch fired only if `playbackAudioTracks` **changed after mount**, and `PlayerPage` dispatches the detail and playback-info requests concurrently, so whenever playback-info won that race the tracks were already populated when `<Player>` mounted, the watch never fired, and the guard never ran at all. The verdict used to be conditional on that race in **both** directions. Visible consequence: on a browser that cannot decode HEVC the **368** prod `hevc` mp4/m4v items (363 `mp4` + 5 `m4v`) now take the transcode branch every time, where before they could slip past the guard entirely and direct-play into the measured black-screen-with-audio; where the browser *can* decode HEVC the probe clears them and they direct-play, as they should. That is the desirable direction, but it is a real behaviour change on HEVC content, not a no-op.

- **Three user-facing strings in the playback-failure notice were reworded so it no longer blames the file.** The heading is now **“Can’t start playback right now”** (was “Can’t play this file here”), and the body copy matches on both branches: `transcodeBodyTitled` reads *“We couldn’t start playback for “{title}” right now. Please try again later.”* and `transcodeBodyUntitled` reads *“We couldn’t start playback for this title right now. Please try again later.”* (the two were *“We couldn’t prepare a playable version of “{title}” right now. Please try again later.”* and *“We couldn’t prepare a playable version of this title right now. Please try again later.”*). The old copy asserted something about the container or the codecs, but `TranscodeNotice` is shown whenever the on-demand transcode **request** failed — including when the server refused it for a reason that says nothing about the media, e.g. a parental-control block answering 404 — so the heading actively misled the viewer. The message **keys are unchanged** (`player.transcodeHeading` / `player.transcodeBodyTitled` / `player.transcodeBodyUntitled`), so a consumer that overrides them keeps its own copy; none of the four pinning consumers overrides any of the three today, so the reword lands as soon as this tag is picked up.

### Removed
- **`canDecodeHevcInMp4()` is deleted** — the container-level HEVC-in-MP4 probe described under *Fixed* above, superseded by the internal `canDecodeVideoCodec(codec, containerMime)` (which builds a real RFC 6381 codec string) plus `videoCodecPolicy()`. **This is not a breaking change for any pinning repo:** `canDecodeHevcInMp4` was a module-level export of `src/components/player/playback.ts` but was **never part of the public entry surface** — neither `src/player.ts` nor `src/index.ts` re-exported it (both use explicit named lists, and the only two `export *` in the tree reach neither playback nor any player module), it appears in **no shipped runtime bundle** (0 occurrences in all four — `dist/player.js`, `dist/phlix-ui.js`, `dist/player.umd.cjs`, `dist/phlix-ui.umd.cjs` — it survived only as a `.d.ts` declaration and inside source maps), and it has **zero consumers estate-wide**: 0 hits for `canDecodeHevcInMp4` (and for the partials `canDecodeHevc` / `HevcInMp4`, which would catch an aliased re-export) across all nine sibling repos, including the four that pin `@phlix/ui` — `phlix-server/web-ui`, `phlix-hub/web-ui`, `phlix-tizen-client`, `phlix-windows-client` — none of whose source imports the `@phlix/ui/player` entry (or any `@phlix/ui/dist` deep path) at all. Hence the **patch** bump, per the `0.x` policy in `README.md` and the same-shape precedent in 0.93.0's Removed entry. Note for anyone grepping this file: `canDecodeHevcInMp4()` is also named in the 0.80.1 entry that introduced it (*"MediaCapabilities codec probing before direct play (UI-1.3)"*); that entry is accurate as history and is deliberately left as written — **this** entry is the one that records the removal. Its six tests were retargeted onto `canDecodeVideoCodec('hevc', 'video/mp4')` rather than dropped, so the regression assertion that the probe must carry a real RFC 6381 HEVC codec string is still enforced.

### Notes
- **Two start-once guards inside `evaluateTranscodeWithCapabilities()` — a hazard created *and* closed inside this unreleased branch, which is why it is recorded here and not under *Fixed*.** It could not happen on v0.98.33: the capability path started no job there, so there was no first job to double. Now that the probe does start the job, two orderings could double-start one session — a probe opened for one item resolving after the host had swapped in another (applying the verdict to the wrong source), and a probe resolving after `onVideoError` had already flipped `transcodeNeeded` and begun a job. The function carries an **invalidation token** bumped on every entry, so a superseded probe drops its verdict instead of applying it, **and** re-checks `transcodeNeeded` *after* the await, so the job starts exactly once. The two guards cannot cover for each other (in the stale-verdict ordering `transcodeNeeded` is still `false`; `onVideoError` does not bump the token), so each is pinned by its own test that suspends a probe in flight across the state change: removing either guard reddens exactly one test across the full 214-file suite.
- **`unknown → direct play` is a deliberate, imperfect choice, and it is the one residual black-screen class left in this change.** An item whose `streams[]` arrives empty resolves to an unknown codec and, if its audio also clears the veto, direct-plays; if that item really is HEVC the viewer gets a black screen with sound and — measured — no `error` event, so there is no reactive recovery. The full account is at `playback.ts:296-322`. No prod item reaches the policy with an unknown codec from **stored** data (the 18 NULL-codec video rows sit on 14 items, every one of which also carries a codec-bearing video row at `stream_index 0` — `hevc` 10, `h264` 3, `mpeg4` 1 — and mp4/m4v items with no codec-bearing video row number **0** of 16,731), so the live exposure is a first-play race: the server's `StreamProbeBackfill` runs on the playback-info request and **replaces** an item's stream rows (delete, then re-insert one at a time) while `PlayerPage` reads the detail concurrently, so a detail read landing inside that window sees `streams: []`. That is once per item for the **79,218 of 116,325** items whose `streams_probed_at IS NULL`. The alternative — unknown → transcode — would reinstate the bug this release fixes for every item that loses the race, so closing the window belongs on the server.

## 0.98.33 - 2026-07-27

### Fixed
- **A music library's `/app/library/{id}` no longer renders the generic grid — it goes to `/app/music` (plan_updates.md — S97).** The generic library grid was the wrong surface for music: it rendered a flat dump of `artist` + `album` + `track` rows sorted by a `metadata_json` path that is **NULL on every one of them**, because the music hierarchy lives in the server's `music_*` tables and not in `media_items`. S97 settled that those tables are authoritative (`media_items.parent_id` is never written for music), which makes `/app/music` — the paged UI shipped in 0.98.32 — the only surface that reads the real hierarchy. Sending music libraries there was chosen over teaching the library grid to list artists precisely because the alternative would leave **two music browse surfaces to keep in sync**, which is the duplication S97 exists to remove.

  The redirect is a `router.beforeEach` gate, not an in-page bounce, so `LibraryPage` never mounts for a music library and the wrong grid is never painted. It runs **after** the auth decision, so it can never bypass a login bounce or a `requiresAdmin` denial — an unauthenticated deep link still lands on login with the original `/app/library/{id}` preserved. Because a library's `type` is not known synchronously on a deep link, the gate awaits the (idempotent, in-flight-deduped) libraries store: **one** round trip per session on the success path, and every failure path — no id, failed load, unknown library, no registered music route — falls through to the existing generic grid rather than to a blank page. Loop safety is explicit rather than incidental: the redirect returns `null` both for its own destination and for any route that is not `library`.

  Scoping note: there is exactly **one** music library on the reference deployment, so redirecting to the global `/app/music` loses no scoping today; per-library music scoping is deliberately not built, and the code says so rather than claiming a second library is impossible.

## 0.98.32 - 2026-07-25

### Fixed
- **The Music library showed only the first 100 of 2,197 artists, and 77 of those 100 drilled down to an empty album list (plan_updates.md — S110).** Both halves are now closed, on **every** music surface rather than only the routed page. **Paging:** `MusicLibraryPage` (the `/app/music` drill-down) fired one unparameterised `listArtists()` and rendered a bare `v-for`, so a 2,197-artist library was indistinguishable from a 100-artist one — the music endpoints serve *bounded* pages (`?limit=` is clamped server-side to `MUSIC_PAGE_SIZE` = 100) and return the true row `total`, and neither was being used. Both of that page's listings are now offset-paged with the new shared `MusicPager`, and the header count renders the endpoint's `total` ("2,197 artists"), never `artists.length`. The same 100-row cap was fixed in the **exported** pages, which any consumer mounting them would otherwise re-create: `MusicArtistsPage` (whole-library artists grid), `MusicArtistPage` (per-artist albums — three artists on the reference library hold 142 / 109 / 104 albums, so that listing needs its own pager for those albums to be reachable at all), and `MusicTracksPage`, which hand-rolled both its request (a raw `client.get` with a duplicate track normaliser) and a bare prev/next readout and so had no random access to the 293 pages of a 29,245-track library. A pager with **first / prev / page-jump `<select>` / next / last** was chosen over infinite scroll on purpose: it matches the in-repo precedent, holds exactly one page of albums in memory (an album row embeds its tracks), and puts any of 22 artist pages **one interaction** away instead of 21 sequential loads. **Drill-down:** the album list was fetched as page 1 of `/albums` and filtered *in the browser*. `/albums` is ordered globally by artist then title, so page 1 spans only ~23 of 2,197 artists — which is why 77 of the 100 visible artists drilled into nothing. `listAlbums()` now sends **`?artist=`** and lets the server filter (exact, case-insensitive, trimmed; also ~140× cheaper — 0.95 ms vs 134 ms measured on the reference library, because it resolves through `music_albums.idx_artist`), and `MusicArtistPage` does the same. `listTracks()`'s equally-broken client-side `album` filter is **gone** (the endpoint has no album filter, so it returned nothing for any album outside page 1); the "album row carried no usable track list" fallback now goes through the album **detail** route, which is exempt from the list route's per-album embed cap and is the only way to see every track of an album that exceeds it — driven by the new `tracksTruncated` flag rather than by `tracks.length`. `getAlbum()` now passes the artist too, because album titles are shared between artists (2,622 of 5,091 on the reference library) while none repeat *within* an artist, so title alone silently resolved to a different artist's album. Regression tests pin the outcome against a fake server that reimplements the endpoints' documented contract (paging, `?artist=`, global album ordering, `total`, the per-row track cap): *"walks every artist page and covers all 2,197 artists exactly once"* walks all **22** pages and asserts 2,197 distinct artists in exactly 22 requests (offsets tiling with no gap and no overlap); *"every artist on the LAST page drills down to its own, correct albums"* performs **97 real drill-downs** and asserts none came back empty, each returned exactly its own albums, and all 97 requests carried `artist=`; *"page 1 of `/albums` spans a handful of artists — so client-side filtering CANNOT work"* pins the mechanism; and *"asks for one page and shows the DB total, not the page length"* pins the count line.
- **A failed page no longer became a dead end — a hazard the new pager itself introduced.** Discarding the rows on a failed page also zeroed `total`, which **removed the pager**, so an I/O blip on page 7 of 22 left an empty grid, no pager, and a false "No artists" with no way back. All four listings now share one policy: a failed page keeps its rows, its `total` **and** its `offset` and shows a banner above the listing, so the user stays exactly where they were and can retry or page away. A *first*-load failure is deliberately **not** uniform (three shapes, because each surface owns a different amount of the screen — a banner over a blank listing area on `MusicLibraryPage`/`MusicTracksPage`; the error *inside* the listing area with its own message on `MusicArtistsPage`, which is a whole route rather than one panel; and a whole-page replacement on `MusicArtistPage`, via a second ref so that an album-page blip stays a banner); the canonical note lives on `MusicLibraryPage.loadArtists` and the others point at it. In every shape the empty state yields to the error, so a failure never renders as "No artists" — a lie about the library.
- **A page the user navigated away from no longer writes its result into the view they moved to.** `MusicLibraryPage` clears the error banner synchronously on every view change, but a rejected request's `catch` runs *later*, so an album page still in flight when the user clicked Back re-armed the `role="alert"` banner over the healthy artists grid — and a late album-detail resolve could repopulate the track list of an album the user had already left. A per-instance navigation generation (bumped in the one function every navigator goes through) is captured before each `await` and re-checked before each write, so an abandoned load drops both its rows and its error. `loading` is deliberately left **unguarded** in the `finally` blocks — returning to the artists grid does not re-fetch, so a guarded reset would strand the skeleton there forever — which is safe because at most one load is ever in flight; that asymmetry is pinned by a test so a future "consistency" cleanup reddens instead of stranding a skeleton.
- **`MusicTracksPage`'s search count no longer reads like a library total.** That search box filters the **loaded page** (100 of 29,245 rows), not the library, but the count rendered "N tracks" — the same phrasing as the library total — so a 12-match page of a library holding hundreds of matches read as the whole answer. While a query is active it now says **"12 tracks on this page"** (new `music.tracksOnPage` / `music.tracksOnPageOne` keys); library-wide search remains `/app/search`.
- **Four music surfaces stopped inlining their own untranslatable pluralisation.** `MusicArtistCard`, `MusicAlbumCard`, `MusicArtistsPage` and `MusicArtistPage` each carried a variant of `album{{ n !== 1 ? 's' : '' }}` — untranslatable and unformatted. All four now go through the i18n catalog with thousands separators. (Other, non-music sites of the same pattern are untouched and tracked separately.)
- **`Icon.test.ts`'s "renders every registered icon" check was iterating a hand-copied list that had drifted.** 24 of the 79 registered names — including the two new pager chevrons — were never rendered by it, so the test's own title had been false long before this work touched the file. The name→component registry moved to a new `src/components/icon-registry.ts` (internal) and the test now derives from its `ICON_NAMES`, so a newly registered icon is covered the moment it is registered, with no second list to update. `Icon.vue` still re-exports `IconName`, so nothing importing it changes.

### Added
- **`MUSIC_PAGE_SIZE`** (100) is exported from the package index, so a consumer can size its own pager to the same clamp the server applies. Its docblock records why raising it is the *wrong* lever for reaching the rest of the library: the server embeds each album's tracks in its list row and mints one HMAC-signed `stream_url` per embedded track, so a whole-library album page would carry 29,245 of them.
- **Music page-envelope types** `MusicPageParams`, `MusicArtistsResult`, `MusicAlbumsResult`, `MusicTracksResult` are exported. They carry the rows plus `total` and the `limit`/`offset` the server actually **applied** (it clamps), and — on albums — an `artist` echo of the applied filter, which is how a client can tell a filtering server from one that silently ignored the parameter. Named `…Result` rather than `…Page` because `MusicArtistsPage` / `MusicTracksPage` are page **components** this barrel already exports.
- **`MusicAlbum.tracksTruncated`** — true when an album list row's embedded `tracks` is only a prefix (the server caps the tracks it embeds per row and flags the cap). Consumers must branch on this flag, not on `tracks.length`, and fetch `getAlbum()` for the whole list. **`MusicArtist.trackCount`** is also now typed, and `albumCount` / `totalTracks` carry docblocks marking them TRUE counts rather than the length of any embedded list.
- **18 new `music.*` i18n keys** for the paged listings: `artistsTotal[One]`, `albumsTotal[One]`, `tracksTotal[One]`, `tracksOnPage[One]`, `showingRange`, `pageOf`, `firstPage`, `prevPage`, `nextPage`, `lastPage`, `jumpToPage`, `pageLoadFailed`, `pagination`, `paginationOf`. Singular and plural are **separate keys** because the message resolver interpolates but does not pluralize.
- **Two Lucide icons**, `chevrons-left` / `chevrons-right`, for the pager's first/last controls.

### Changed
- **Signature change on three exported `ApiClient` methods.** `listArtists()`, `listAlbums()` and `listTracks()` now take an options object (`{ limit, offset }`, plus `{ artist }` on `listAlbums`) and return a page **envelope** instead of a bare array; `getAlbum(title, artist?)` gained the disambiguating artist; and `listTracks()`'s `album` argument was **removed** rather than deprecated, so the broken client-side filter cannot be reused. There were no callers outside this repo when this landed (checked against `phlix-server/web-ui` and `phlix-hub/web-ui`), but it is a breaking change in an exported class — pin an exact tag and read this entry before upgrading.
- **`music.of` is deprecated** (marked in the catalog, not removed): it existed for `MusicTracksPage`'s hand-rolled "N – M of TOTAL" readout, which the shared pager's `music.showingRange` / `music.pageOf` replaced. Overriding it now changes nothing; it is kept so an existing consumer override does not become a typecheck error.

### Notes
- **What is *not* verified.** The 2,197 / 5,091 / 29,245 / 142 / 2,622 figures are exercised against a **fake server that reimplements the endpoints' documented contract**, not against production or any real database — this is a browser package, and the reference library was mid-rescan. That is a strong contract test and a weak integration test: if the real server's `?artist=` or `total` behaviour differs from the documented contract, these tests will not notice. A click-through on `/app/music` after deploying the server-side half remains the only end-to-end confirmation.
- **The native clients are unaffected and still show the first 100 rows.** `phlix-tizen-client`'s music store calls `/api/v1/music/artists` and `/api/v1/music/albums` through its own raw `client.get` with no `limit`/`offset` and never reads `total`, so it does not consume these helpers and no tag can fix it for free; that is tracked as its own work item.
- **One known, deliberately unpinned guard:** `MusicPager`'s `if (props.disabled) return;` is not covered by any test, because Vue Test Utils' `trigger()` short-circuits on a `disabled` element — no test can deliver the click the guard exists to reject. In a browser the gate is the HTML `disabled` attribute anyway, so the JS guard is defence-in-depth; it is left uncovered rather than faked with an assertion that would pass for the wrong reason.

## 0.98.31 - 2026-07-25

### Added
- **Alternate library views: a full-width list row and a wide-backdrop hero strip (updates.md — S68, S69).** These are the first two `viewMode` renderers filling the seam S67 left in `LibraryPage`'s single `MediaGrid` mount. **Both keep exactly one `MediaGrid` mount** — pagination, virtualization and `need-range` are unchanged, and the windowing math is parameterized rather than overridden in CSS.
  - **`MediaListRow.vue` (S68)** — a full-width row: poster column left, title + meta strip (year · cert · runtime · genres) + clamped overview right. The poster column **composes a real `MediaCard`** (via a new `hideCaption` prop) so the row inherits the blur-up poster, badges, resume bar, stretched link and the whole hover action overlay (Play, rating, favorite, watched, info, ⋯ menu, admin Match) with no duplicated logic, and re-emits all ten `MediaCard` host events — necessary because filling `MediaGrid`'s `#card` slot bypasses its own wiring. `virtual-grid.ts` gains `computeFixedRowHeight()` + `LIST_ROW_POSTER_WIDTH` / `LIST_ROW_HEIGHT`, because a list row is **not** a 2:3 poster: `computeRowHeight()` applies `POSTER_RATIO` to the card width, which for a one-column row reserves a row ~10× too tall and desyncs `padTop` / `totalHeight` / `need-range`. `MediaGrid.vue` gains `columns` / `rowHeight` props that parameterize the windowing math **and** the inline grid template together, and a pinned row height also pins not-yet-loaded placeholder cells so a skeleton cannot outgrow its reserved row. `LibraryPage.vue`'s `v-else` `MediaCard` branch stays **unconditional** on purpose: `viewMode` is deliberately unsanitized, so it is the only branch that still renders items for an out-of-union persisted value.
  - **`MediaBackdropRow.vue` (S69)** — a horizontally-scrolling strip of wide backdrop cards with a caption overlay, an ambient wash sampled from the artwork, a narrow-viewport arm, and honest empty / loading / no-backdrop states (no fabricated placeholder that reads as real content). Backdrops are sourced at **row size** rather than reusing the full-size hero image, using the **endpoint-scoped** shape from S101's list contract (`MediaItemShaper`'s row-sized backdrop + srcset) rather than assuming the detail-view shape.

### Fixed
- **The S69 ambient bleed was silently clamped by the design system's own image reset.** `@phlix/tokens`' global `img { max-width: 100% }` made the strip's `calc(100% + 6px)` collapse back to the container width, so `left: -3px` won over `right` and the image ended **3px inside** the strip — the exact inverse of the intent, and invisible because the guard asserted only that the declaration was *present*. Fixed with `max-width: none; max-height: none;` on the filtered image, scoped to `.media-backdrop-row__img[data-v-hash]` (specificity 0,2,0), which matches **exactly one** element in the package — a decorative `alt=""` backdrop whose job is to exceed its box. Verified in Chrome 150: as-shipped `1366×306`, overhang `3/3/3/3`; with the fix reverted `1360×306`, overhang `3/−3/3/3`. The replacement guard asserts the **measured effect on all four sides** and is pinned by a cascade alarm that fires if `@phlix/tokens` ever starts clamping height.

## 0.98.30 - 2026-07-23

### Added
- **The admin Users page gains a per-user relay bandwidth-throttle + monthly-quota control (updates.md #50 — S41 deferred UI follow-up).** The S41/S42/S43 backend shipped the enforcement + the admin endpoints (`GET /api/v1/admin/users/{id}/bandwidth`, `PUT …/quota`, `PUT …/throttle`) but there was **no** UI to drive them — quota/throttle were API-only. `pages/admin/UsersPage.vue` now adds a **"Relay"** row action that opens a **Relay limits** modal. This surface is **hub-only**: the shared `UsersPage` is a `commonAdminPage` rendered in BOTH the media-server and hub admin consoles, but only the hub serves the relay quota/throttle sub-routes (the media server's `AdminUserController` serves `/api/v1/admin/users*` without them), so the Relay action renders **only when `phlixConfig.app === 'hub'`** — the same backend-capability seam `mediaApiBaseFor()` uses, not a branding branch. Opening the modal loads the user's current rollup from `GET …/bandwidth` and preselects: the **bandwidth throttle** (a dropdown of the allow-listed levels — **Unlimited / 1 / 3 / 5 / 10 / 20 / 50 Mbps**, default 3 Mbps, wired to `PUT …/throttle`) and the **monthly quota** (download + upload byte caps entered in GiB, and a max-concurrent-streams cap; `0` = unlimited, wired to `PUT …/quota`), plus a read-only view of the bytes streamed this period. Client-side validation mirrors the hub's `UserQuotaController` bounds (byte caps ≤ 1 PiB, streams ≤ 1000) so out-of-range input is rejected before it round-trips to a 400, and — because the throttle and the quota are **independent** hub endpoints/stores — **Save PUTs only the endpoint(s) that actually changed** (no spurious `user.quota.set` / `user.throttle.set` audit entries), toasting a friendly message on any admin-gated 4xx. Change detection compares each input **string** against the value seeded when the modal opened (not re-parsed GiB→bytes vs the loaded bytes), so a quota byte cap set **outside** this UI that isn't exactly GiB-representable is never mistaken for an edit on a no-op Save (which would otherwise fire a spurious drifted `PUT …/quota`). `api/admin/users.ts` gains the typed wrappers `AdminUsersApi.getBandwidth()` / `setThrottle()` / `setQuota()` (each normalizing the rollup so a string/partial wire payload can't leak `NaN`), the `UserBandwidth` / `SetQuotaInput` types, and the `DEFAULT_THROTTLE_BPS` / `THROTTLE_BPS_OPTIONS` / `THROTTLE_BPS_LEVELS` constants (mirroring `UserQuotaController::ALLOWED_THROTTLE_BPS`), all re-exported from the package index. Regression tests assert the Relay action is **absent on the media server** and present in the hub, that opening it loads + preselects the current throttle/quota, that Save PUTs the changed throttle-only / quota-only / both (and PUTs nothing when unchanged), that out-of-range quota / stream input is rejected without a PUT, and that load / save failures surface a toast.

## 0.98.29 - 2026-07-23

### Changed
- **The admin Remote Access "Relay Tunnel" controls now reflect the REAL tunnel instead of a fake `{success:true}` (updates.md #39 — S39, @phlix/ui half).** The S39 server-half (phlix-server PR #549) replaced the dead in-HTTP-worker relay object — whose Enable/Disable/Ping were no-ops that always returned `{success:true}` while the real tunnel ran in a separate fork with no live control channel — with honest endpoints that read the relay fork's PERSISTED state file and toggle a boot-time kill-switch. `pages/admin/RemoteAccessPage.vue` is reframed to consume those honest shapes. **Status:** the Relay Tunnel panel now surfaces the real `connected` / `active` state PLUS the two levers that actually govern the tunnel — **Enrolled** (a paired hub is required to connect) and **Kill-switch** (`disabled`, the effective operator-OR-`PHLIX_RELAY_DISABLED` state) — and, when the tunnel is down, the **persisted "why it's down" reason** the server now records (`lastConnectError` + `lastConnectErrorAt`), so an operator can see e.g. a TLS-handshake-to-a-plaintext-port failure without shelling into fork logs. The collapsed summary reads `Connected` / `Disconnected` / `Disabled` / `Not paired` honestly rather than always claiming a connection. **Enable / Disable:** these are now "takes effect on reload" levers, not an instant start/stop — the panel carries an always-visible notice saying so, the Enable/Disable button is chosen by the **kill-switch** state (not the transient `connected` flag), and each action surfaces the server's own `message` (including the honest case where **Enable cannot clear an env-forced `PHLIX_RELAY_DISABLED`**, shown as a **warning** toast that says the tunnel stays disabled until the env var is removed) instead of implying the tunnel is now running. **Ping:** shows the last **persisted** round-trip `latencyMs` with its `latencySource` context, and **handles `latencyMs === null` gracefully** ("Not measured yet") — it stays null until the S40 heartbeat writes land — and handles the **409 not-connected** response by surfacing the server message + last-connect error (and refetching status) rather than a generic failure. The `api/admin/remoteAccess.ts` types are widened to the honest contract: `RelayStatus` gains `reconnectAttempts` / `activeSessions` / `lastDisconnectTime` / `lastConnectError` / `lastConnectErrorAt` / `disabled` / `enrolled` / `updatedAt` (keeping `endpoint` / `establishedAt` for back-compat), a new `RelayControlResponse` (`{ success, disabled, enrolled, takesEffectOnReload, message }`) types Enable/Disable, `RelayPingResponse` becomes `{ success, connected, active, latencyMs: number | null, lastHeartbeatAt?, latencySource? }`, and a new `RelayPingNotConnected` types the 409 body. The **Network Health** panel is unchanged (it is fed by the separate S40 backend). Regression tests assert the reframed status fields render, the reload notice is shown, Enable/Disable surface the server message (and the env-forced warning), Ping renders a real latency, degrades gracefully on `null` latency, and handles the 409 not-connected path with its persisted reason.

## 0.98.28 - 2026-07-23

### Added
- **A "Next Up" home rail now surfaces the next unwatched episode for every series you've started, positioned immediately after Continue Watching (updates.md #43 — S37).** `pages/BrowsePage.vue` gains a **Next Up** `MediaRow` fed by the **`GET /api/v1/users/me/next-up`** endpoint shipped in **S36** — a **per-user** list scoped to the active profile that, for each series with an in-progress or recently-completed episode (on the `playback_state`-only watched signal), resolves the NEXT unwatched episode in `(season, episode)` order, most-recently-touched series first. The server already shapes each row through `MediaItemShaper::shape()` — the response is a **superset of the Continue Watching item shape** (adds `series_id` / `series_name`, with `position_ticks` / `duration_ticks` = 0 because a Next-Up pick is a fresh episode) — so the payload arrives already in the `MediaItem` shape and needs **no** client-side field remapping. The new shared **`api/nextUp.ts`** helper (`fetchNextUp(client, { limit })`) simply unwraps the `{ items }` envelope and defends a malformed payload to `[]`, mirroring the `api/mostWatched.ts` / `api/recommendations.ts` convention. The rail is modelled exactly on the sibling **Recommended** / **Most Watched** rails: its own `nextUpItems` / `nextUpLoading` / `nextUpError` refs, a memoized `ApiClient` (`nextUpClientFor`), a `loadNextUp()` loader wired into both `onMounted` and the `apiBase` `watch`, and a `showNextUp` computed that keeps the rail **hidden when empty / while loading / on error** (`v-if` + `hideWhenEmpty`) exactly like the siblings. It is positioned **immediately after Continue Watching** — its natural sibling (CW resumes the in-progress episode, Next Up queues the next fresh one): Continue Watching → **Next Up** → My List → Recommended → Most Watched → configured shelves → per-library rails. **Critically, the shaped rows carry NO per-user `user_data` block** (`shapeNextEpisode()` passes no `user_data` key to the shaper), so — exactly as the Most Watched / Recommended rails do, and per the S32 state-wipe lesson — `loadNextUp()` calls **`remember()` only** (registry push for admin metadata-match / poster-pick reconciliation) and **never `userItemData.hydrate()`**: hydrate would REPLACE existing store entries with all-false defaults, racing the Favorites / Continue-Watching loaders and transiently wiping favorite/watched/rating badges for an item that is both a favorite (or watched/rated) AND a next-up pick. It carries the same card-action handlers as the other rails. Regression tests assert the rail renders items from `GET /api/v1/users/me/next-up` (and actually hits that endpoint), sits directly after Continue Watching and before My List, hides when there's nothing to watch next, and does NOT overwrite existing `useUserItemDataStore` entries (no state-wipe race — asserts `remember()`, not `hydrate()`, on the pre-shaped rows).

## 0.98.27 - 2026-07-23

### Fixed
- **Posters past the first ~24 no longer stay stuck as gray skeletons until you scroll (updates.md #34 — S35).** Per the plan's repro-first mandate, a new integration test (mounting `MediaGrid` wired to a real `useMediaStore` exactly like `LibraryPage.vue`) pinned the actual mechanism — which turned out to be neither pure timing nor the native lazy attribute, but a **stale window cache** in `MediaGrid.vue`. `visibleItems` memoised its rendered slice keyed only on `startIndex`/`endIndex`, but on-demand paging fills skeleton slots by **replacing `items` with a new array WITHOUT moving the scroll window** (`useMediaStore.placePage`); a cache hit then kept returning the previously-computed slice — still holding `null` for the just-loaded indices — so those posters rendered as skeletons until a scroll incidentally shifted the band and busted the cache (exactly the reported "stuck until you scroll"). The computed now reads `props.items` up-front so it **always tracks the array as a reactive dependency** (even on a cache hit) and adds the array identity to the cache key, so a fill re-slices immediately while a pure scroll tick (same array, same band) still skips the work. Two secondary hardening changes ship alongside the root-cause fix: (a) **`MediaCard` gains a `lazy` prop (default `true`)** and `MediaGrid` passes **`:lazy="false"`**, dropping the redundant native `loading="lazy"` on grid posters (the JS windowing already gates rendering, and native lazy over `transform`-repositioned cards is a known browser-timing stall trigger) — every other host keeps native lazy-loading; and (b) **`useMediaStore.ensureRange`'s failed page fetch is no longer silently swallowed** — it now retries a small **bounded** number of times (3 attempts, short backoff, never an infinite loop) and, only once every attempt is exhausted, surfaces a **single** toast (re-armed after any later success) instead of stranding the slots as skeletons forever. Regression tests assert: `need-range` fires on mount and `ensureRange` fills posters past #24 with **zero** scroll events (and the grid reactively renders them); grid posters carry no `loading` attribute while standalone cards keep `loading="lazy"`; and the bounded retry recovers a transient failure, caps at 3 attempts, and toasts exactly once.

## 0.98.26 - 2026-07-23

### Changed
- **The in-window (non-native-fullscreen) player can now go chrome-less and fill the whole viewport — an in-app "theater mode" (updates.md #34 — S34).** Three coordinated, strictly-gated layout changes let the player own the browser window without touching native OS fullscreen (which already works) or any playback logic. (1) **Route flag:** the built-in `player` route (`app/createPhlixApp.ts`) gains **`meta: { fullBleed: true }`** — a route-level opt-out of the shell chrome. (2) **Shell mapping (theater-gated):** `PhlixApp.vue` computes **`isFullBleed = route.meta?.fullBleed === true && playerUi.theaterActive`** — the chrome removal is gated on BOTH the player route (the `meta.fullBleed` scoping guard) AND the shared theater-active state (the SAME trigger as the 100dvh stage growth), read from a tiny new **`usePlayerUiStore`** — and binds **`:class="{ 'shell--flush': isFullBleed }"`** onto `<AppLayout>` (the class falls through to the shell root `.shell`). The player's existing **`@theater`** toggle stays the single source of truth: `PlayerPage.vue` mirrors it into `usePlayerUiStore().theaterActive` and **resets it to false on unmount / route-leave** (so a later non-theater visit can't inherit a stale `true`; it persists across binge/up-next navigation, which reuses the page instance). (3) **Chrome removal:** `AppLayout.vue` adds a **NON-scoped** `<style>` block whose every selector is anchored under **`.shell.shell--flush`** — `.shell.shell--flush .shell__bar { display: none }` and `.shell.shell--flush .shell__main { padding: 0 }`. The non-scoped block is required because `.shell--flush` is a fallthrough class and the rules must reach the shell chrome; the `.shell.shell--flush` prefix (three classes) also outranks the scoped `.shell__bar[data-v]` / `.shell__main[data-v]` selectors regardless of source order. Because `meta.fullBleed` lives ONLY on the player route, `.shell--flush` is **impossible on any other route** (no leak); and because it is AND-ed with the theater state, it is **absent on the default (non-theater) player view too** — that view keeps its shell header + normal padding exactly like before — so the rules are **inert everywhere else** and the default shell layout is byte-identical. Entering theater removes the chrome AND grows the stage to 100dvh **together**; leaving theater restores both. Fixed-position overlays (**MiniPlayer**, **CommandPalette**) live outside the `.shell__main` flow, so hiding the bar / zeroing the padding never hides or shifts them. Separately, the in-player **"theater" toggle** (the existing `@theater` control, unchanged trigger) now actually fills the viewport: `Player.vue`'s `.player.is-theater` releases the default **`aspect-ratio: 16 / 9` + `max-height: 90vh`** lock and grows to **`height: 100dvh`** (with a `100vh` fallback for engines without `dvh`), and `PlayerPage.vue`'s `.player-page.is-theater .player-page__stage` grows to the same. `object-fit: contain` on `.player__video` is preserved, so the frame is letterboxed — never cropped or stretched. The **default (non-theater) player still shows at 16:9 / 90vh**; only the theater toggle grows it. Regression tests assert the shell gains `shell--flush` on the `fullBleed` player route and NOT on a normal route (no leak), that the flush CSS hides the bar + zeroes the main padding while the default shell keeps both, that MiniPlayer/CommandPalette still mount under `shell--flush`, and that the theater CSS uses 100dvh full-bleed sizing while the default keeps the 16:9/90vh cap.

## 0.98.25 - 2026-07-23

### Added
- **Admins can now toggle TMDB box-set auto-collection generation on/off per library from the library edit UI (updates.md #33 — S33, @phlix/ui half).** `pages/admin/LibrariesPage.vue` gains an **"Automatically generate collections from TMDB box sets"** `Switch` in the add/edit library form, shown **only for `movie` libraries** (mirroring how the `series_per_directory` toggle is gated to `series` libraries — TMDB box sets are a movie concept, and the server's scanner only syncs collections for movie items). This is a **zero-new-endpoint** change: the flag rides the EXISTING create/update payload. It reads from the effective **`auto_collections.enabled`** block the server-half (PR #545) now surfaces on every library row via `LibraryRow::toArray()`, and — matching the server's default-when-absent = **enabled** (`LibraryRow::autoCollectionsEnabled()`) — the toggle shows **checked by default** for libraries that never stored the flag (an absent block is treated as `true`). On save it sends a bare boolean **`autoCollections`** at the body top level (which `LibraryController::applyAutoCollections()` accepts and persists as the canonical `{ enabled: bool }`, merged so unrelated option keys survive). Persistence is **dirty-gated** exactly like the artwork-type / metadata-priority editors: the flag is included in the POST/PUT body **only when the admin actually flips it**, so an untouched form never rewrites the stored value. The `Library`, `CreateLibraryInput`, and `UpdateLibraryInput` types in `api/admin/libraries.ts` gain the `auto_collections` read block and the `autoCollections` write field. Regression tests assert the toggle is movie-only, seeds checked when the payload has no `auto_collections` block, reflects an explicit `auto_collections.enabled=false`, sends `autoCollections: false` / `true` when flipped off / back on, and is omitted from the update body when untouched.

## 0.98.24 - 2026-07-23

### Added
- **A "Most Watched" home rail now surfaces the existing server-wide most-watched aggregate on the Browse page (updates.md #32 — S32).** `pages/BrowsePage.vue` gains a **Most Watched** `MediaRow` fed by the existing **`GET /api/v1/media/most-watched`** endpoint (shipped in S31) — a **GLOBAL, all-time trending** list (the media items most-watched across the WHOLE server, from `StatsCollector::getTopMedia`; the SAME cross-user list the admin Top Media report reads), **NOT** a per-user history — so this is a **zero-backend-change** reuse of the existing endpoint, not a new API. The server already shapes each row through `MediaItemShaper::shape()` exactly like `GET /api/v1/media` (poster/artwork signed URLs re-minted at response time), so the payload arrives already in the `MediaItem` shape and needs **no** client-side field remapping — the new shared **`api/mostWatched.ts`** helper (`fetchMostWatched(client, { limit })`) simply unwraps the `{ items, total, limit, offset }` envelope and defends a malformed payload to `[]`, mirroring the `api/recommendations.ts` convention (S26). The rail is modelled exactly on the sibling **Recommended** / **Favorites** rails: its own `mostWatchedItems` / `mostWatchedLoading` / `mostWatchedError` refs, a memoized `ApiClient` (`mostWatchedClientFor`), a `loadMostWatched()` loader wired into both `onMounted` and the `apiBase` `watch`, and a `showMostWatched` computed that keeps the rail **hidden when empty / while loading / on error** (`v-if` + `hideWhenEmpty`) exactly like the siblings. It is positioned immediately after "Recommended" (Continue Watching → My List → Recommended → **Most Watched** → configured shelves → per-library rails), carries the same card-action handlers as the other rails, and its items are hydrated into `useUserItemDataStore` and pushed into the shared `registry` so admin metadata-match / poster-pick reconciliation covers it too. NOTE: the rail may look sparse or empty until playback stats warm up (post-S30/S31) — the hide-when-empty guard handles the empty case gracefully. Regression tests assert the rail renders items from `GET /api/v1/media/most-watched` (and actually hits that endpoint) and hides when nothing has been watched yet.

## 0.98.23 - 2026-07-23

### Added
- **A "Recommended" home rail now surfaces the existing because-you-watched engine on the Browse page (updates.md #26 — S26).** `pages/BrowsePage.vue` gains a **Recommended** `MediaRow` fed by the existing **`GET /api/v1/me/recommendations`** endpoint — the SAME endpoint the standalone `RecommendationsPage.vue` already uses — so this is a **zero-backend-change** reuse of the recommendations engine, not a new API. To avoid duplicating the fetch, the recommendation fetch + `MediaItem` mapping were extracted from `RecommendationsPage.vue` into a shared **`api/recommendations.ts`** helper (`UserRecommendation` type, `recommendationToMediaItem()`, and `fetchRecommendations(client, { limit })` which unwraps the `{ recommendations }` envelope and defends a malformed payload to `[]`); both the standalone page and the new rail call it, and the page's own UX is unchanged. The rail is modelled exactly on the existing **Favorites/"My List"** rail: its own `recommendedItems` / `recommendationsLoading` / `recommendationsError` refs, a memoized `ApiClient` (`recClient`), a `loadRecommendations()` loader wired into both `onMounted` and the `apiBase` `watch`, and a `showRecommended` computed that keeps the rail **hidden when empty** (`v-if` + `hideWhenEmpty`) exactly like the sibling rails. It is positioned immediately after "My List" (Continue Watching → My List → **Recommended** → configured shelves → per-library rails), carries the same card-action handlers as the other rails, and its items are pushed into the shared `registry` so admin metadata-match / poster-pick reconciliation covers it too. Regression tests assert the rail renders items from `GET /api/v1/me/recommendations` (and actually hit that endpoint) and hides when the engine returns nothing.

## 0.98.22 - 2026-07-23

### Added
- **Nav entries can now be hidden when no library of a required type exists (updates.md #25 — S25, @phlix/ui half).** The `MenuItem` type (`app/types.ts`) gains an optional **`requiresLibraryType?: LibrarySummary['type'] | LibrarySummary['type'][]`** field, mirroring the existing `requiresAdmin` shape/handling. In `PhlixApp.vue` the `menu` computed now also drops any item carrying `requiresLibraryType` unless the viewer's loaded library list contains at least one library whose `type` matches (a single value, or ANY of an array) — evaluated by a new `hasMatchingLibrary()` helper alongside the existing `requiresAdmin` predicate. The filter is **fail-closed**: while the library list is still loading (or a load failed) `libraries.loaded` is false, so a `requiresLibraryType` entry stays hidden rather than flashing then disappearing. To give the filter data, the library-load trigger was broadened from "a `libraryLinks` item is present" to "a `libraryLinks` **or** `requiresLibraryType` item is present" (read off the RAW config menu, so a hidden `requiresLibraryType` entry still triggers the load that reveals it — no chicken-and-egg deadlock); `useLibrariesStore.load()` dedupes/caches so this never double-loads and shares the Browse page's fetch. The hub sets neither field, so it still never calls the server-only `/api/v1/libraries` (which 404s there). This is the mechanism the media server's consumer (`phlix-server/web-ui/src/main.ts`, Half B) will use to hide the **Books / Audiobooks / Photos / Music** nav entries when no matching library exists — those specific menu entries live in the consumer's `main.ts`, not in @phlix/ui's own default menu. Regression tests assert a `requiresLibraryType` entry is hidden when no matching library exists, hidden while the list is unresolved and then revealed on a match (fail-closed), and shown when any of an array of types matches — including that the load fires off a `requiresLibraryType` filter with no `libraryLinks` item present.

## 0.98.21 - 2026-07-23

### Changed
- **On the admin Settings page, a tab whose fields are ALL advanced-only now looks muted (dimmed) instead of normal while Advanced mode is off — but stays fully clickable and keyboard-operable, NOT disabled (updates.md #24).** `admin/SettingsPage.vue` gains an `isAllAdvancedGroup(group)` helper that returns true only when every field in a group is advanced-tier (it reuses the existing `isAdvanced()` tier classification — no second source of truth — and treats an empty group as not-all-advanced), and each tab is now built with `muted: !advancedMode && isAllAdvancedGroup(group)` off the existing `useSettingsPrefs` advanced-mode flag. The `TabItem` type in `components/ui/Tabs.vue` gained a **purely-visual** `muted?: boolean` field: when set the tab button gets an `is-muted` class whose CSS adds **only `opacity: 0.5`** — deliberately **no** `pointer-events` change, **no** `disabled`/`aria-disabled` attribute, and **no** tabindex change — so the tab remains fully clickable and reachable by roving keyboard nav. Crucially `Tabs.vue`'s `asOpts` (fed to `listbox.ts`'s `nextEnabledIndex`) still maps only `{value,label,disabled}`, so `muted` never reaches the nav helper and a muted-but-not-disabled tab stays reachable by Arrow/Home/End. Tests assert a muted tab has the `is-muted` class + `opacity: 0.5` styling but no `disabled` attr / no `pointer-events:none` and is still selectable by click and keyboard; that `nextEnabledIndex` still lands on a muted (non-disabled) option; and that `isAllAdvancedGroup` mutes the all-advanced `Matching` tab (not the mixed `Transcoding` tab) only while Advanced mode is off.

## 0.98.20 - 2026-07-23

### Fixed
- **The admin Settings/Services pages no longer double-pad, and the settings tab row no longer pushes the Advanced switch off-screen (updates.md #23).** Four scoped layout fixes: (1) A **dead `:deep(*)` rule** was removed from `admin/admin.css`. `admin.css` is a plain stylesheet pulled into `AdminLayout.vue` via a side-effect import, **not** a `<style scoped>` block, so Vue's SFC compiler never transforms it — `:deep()` is therefore an unknown/invalid functional pseudo-class in raw CSS, which makes the whole `.admin .admin__content > :deep(*)` selector invalid so the browser drops the entire rule. It set `max-width: none; margin-inline: 0; padding-inline: var(--space-4)` that never applied, so deleting the no-op cannot change rendering. (2) `SettingsPage.vue` and `ServicesPage.vue` **dropped their outer `max-width: 900px; margin: 0 auto` box** (they keep their own `padding: var(--space-6)`, which stays the outer gutter so content is never edge-to-edge), moving the 900px reading-width constraint onto the **inner** `.admin-settings__form` / `.admin-services__section` — removing the redundant centred box that stacked with the page padding. (3) `.phlix-tabs__list` in `Tabs.vue` gained **`flex-wrap: wrap`** so a wide tab row wraps to a second row instead of overflowing horizontally. (4) The Settings header row (`.admin-settings__header-row`) gained **`flex-wrap: wrap`** and the Standard/**Advanced** toggle (`.settings-advanced-toggle`) gained **`flex-shrink: 0`**, so the switch keeps its size and wraps onto its own line rather than being pushed off-screen when the tab row is wide. Regression tests assert the dead `:deep(*)` rule is absent from `admin.css`, that the two page roots no longer set `max-width`/`margin: 0 auto` while the inner form/section carry the max-width, that `.phlix-tabs__list` declares `flex-wrap: wrap`, and that the advanced toggle is `flex-shrink: 0` inside a wrapping header row.

## 0.98.19 - 2026-07-23

### Changed
- **The admin Libraries table's Actions column no longer wraps to a second row (updates.md #22).** In `pages/admin/LibrariesPage.vue` the low-frequency **Rescan** and **Delete** actions were moved out of the always-visible Actions cell and into the existing **More actions** (⋯) overflow menu, leaving only the primary controls inline (Edit, Scan, Match metadata, More, History). This is a pure relocation — the click handlers are unchanged: **Rescan** still queues the `rescan` op via `runOp(lib, 'rescan')`, and **Delete** still opens the existing delete-confirm modal (via the shared `deleting` ref) so its confirmation flow is preserved. Rescan sits at the top of the menu with the other scan/maintenance ops and Delete is last, flagged `danger`, alongside "Delete all items". To keep the remaining inline actions on one line the Actions column now reserves `min-width: 300px`, and the actions flex container uses `flex-wrap: nowrap` with `overflow-x: auto` so any residual overflow scrolls horizontally instead of wrapping. The page's overflow-menu and delete/rescan tests were updated to drive Rescan/Delete through the menu (asserting the delete-confirm gate still fires), and the menu-contents test now asserts the full seven-item ordering including the two relocated actions.

## 0.98.18 - 2026-07-23

### Added
- **Home media rows now have prev/next scroll arrows on pointer devices (updates.md #21).** `MediaRow.vue` gains two overlay arrow buttons that page the poster rail left/right by ~90% of the visible width via `railEl.scrollBy({ left, behavior })`. The arrows are rendered as **siblings** of the `.media-row__rail` `<ul>` inside a new, un-contained `.media-row__viewport` wrapper — deliberately **not** nested in the rail — because the rail is a horizontally-scrolling grid and its ancestor `.media-row` sets `content-visibility: auto` (layout/paint containment); positioning the arrows in the plain wrapper keeps them from scrolling with the content or being clipped. A `scroll` listener on the rail plus a `ResizeObserver` and a `window` `resize` listener track `atStart` / `atEnd` / overflow, so the **prev** arrow hides at the left edge and the **next** arrow hides at the right edge. The whole affordance is suppressed when the rail does not overflow (`scrollWidth <= clientWidth`), when `prefers-reduced-motion: reduce` is set, or on coarse-pointer / no-hover (touch) devices (`matchMedia('(pointer: coarse), (hover: none)')`) where native swipe is better. `scrollBy` uses `behavior: 'smooth'` normally and `'auto'` under reduced-motion (the arrows are hidden then anyway — this only guards a mid-click preference flip). Each button carries an `aria-label` ("Scroll left" / "Scroll right"). All matchMedia change listeners, the ResizeObserver, and the window resize listener are cleaned up on unmount. Overflow reads are guarded so the pre-layout 0×0 geometry in jsdom/SSR is a harmless no-op. Regression tests cover the no-overflow / coarse-pointer / reduced-motion hidden paths and the edge-flag behaviour (prev shown once scrolled off the start, next hidden at the end) when overflow is simulated.

## 0.98.17 - 2026-07-23

### Added
- **The icon-only quick-action buttons on poster cards now show a hover/focus tooltip naming what they do (updates.md #20).** Each glyph-only control in the `MediaCard.vue` poster action row — **Play**, **Add to / Remove from favorites**, **Mark as watched / unwatched**, **More info**, **More actions** (the ⋯ menu trigger), and the admin **Match metadata** — plus the **Like** / **Dislike** thumbs in `ThumbRating.vue`, is now wrapped in the existing `<Tooltip>` (`components/ui/Tooltip.vue`). The tooltip reuses the **exact same string** already on each button's `aria-label` (no new copy), and `:text` is bound to the dynamic label for the stateful favorite/watched toggles so the tip tracks the current state. Tooltips appear on **hover and keyboard focus** and honour `Tooltip.vue`'s built-in 300 ms open delay (not overridden). The buttons keep their own `aria-label` (the accessible name); `Tooltip` only adds an `aria-describedby` description on show, so accessibility is preserved. The default **top** placement is used because the action row sits at the bottom edge of the `overflow: hidden` poster (`.media-card__overlay` is `justify-content: flex-end`) — a top tooltip opens upward into visible poster space, whereas `placement="bottom"` would render past the bottom edge and clip. To keep the row's four-across layout exact, each `<Tooltip>` root (`.phlix-tooltip-wrap`, `display: inline-flex`) is pinned to `flex: 0 0 auto` inside `.media-card__actions` — mirroring the existing `.thumb-rating` treatment — so the `max-width: calc(4 * 32px + 3 * var(--space-1))` math is unaffected. No handler, behaviour, or button styling changed.

## 0.98.16 - 2026-07-22

### Fixed
- **The media-detail hero text now stays legible on a title that has a poster-derived ambient background but NO backdrop image (updates.md #19).** `MediaDetail.vue` renders a faint, heavily-blurred poster wash (`.media-detail__ambient`) behind the hero, but only the full-bleed `.media-detail__backdrop` path had a darkening scrim — so a backdrop-less title with a bright poster could wash out the light hero title/meta/overview. The backdrop-less ambient now gets the **same scrim treatment** as the backdrop: a new sibling `.media-detail__ambient-scrim` layer mirrors `.media-detail__backdrop-scrim`'s gradient verbatim (`top→bottom` dark bias `rgba(0,0,0,.55)→.35→var(--bg)`, plus a `left→right` `rgba(0,0,0,.55)→0` fade and a 2px backdrop blur), sized and bottom-masked to the ambient's 60vh band. It is a *sibling* rather than a child/pseudo because `.media-detail__ambient` carries `opacity:0.18` + `filter:blur(60px)`, which would crush any nested scrim to nothing. The ambient scrim is painted **only when there is no backdrop** (it is gated on the same `backdrop_url_large || backdrop_url` source the backdrop layer uses): when a backdrop is present its own `.media-detail__backdrop-scrim` already darkens the hero, so stacking the ambient scrim on top would double-darken it. As belt-and-suspenders, the hero **title**, **meta**, and **overview** gained a subtle soft-blur `text-shadow` (`0 1px 3px / 2px rgba(0,0,0,.4–.5)`) — a defined dark halo that boosts light text over a bright ambient in the dark themes (Nocturne/Midnight) and is a visual no-op behind the dark text of the light Daylight theme. Luminance-adaptive text colour was deliberately **not** implemented (overkill); this is a CSS-only legibility change with no behavioural effect. Regression tests assert the ambient scrim renders (and is `aria-hidden`) alongside the ambient for a backdrop-less title, is **absent when a backdrop is present** (so the hero is not double-darkened), and is absent when there is no poster.

## 0.98.15 - 2026-07-22

### Changed
- **The media-detail hero action buttons now follow one consistent solid / outline / ghost hierarchy, and the icon-only controls use the shared `<IconButton>` (updates.md #18).** `MediaDetail.vue`'s hero cluster previously mixed variants and hand-rolled `<button>`s. The variants are now assigned by importance: **`solid`** is reserved for the single primary action **Play**; **`outline`** marks the secondary actions **Resume**, **Play Trailer**, and **Match metadata** (Match metadata was previously `ghost`, now promoted to `outline`); and **`ghost`** is used for the tertiary toggles **Watchlist** and **Watched**. The three remaining raw `<button>`s — the ⋯ **menu trigger** and the theme-music **mute/unmute** and **stop** controls — were replaced with the shared `<IconButton variant="ghost">` component, so every hero control is now token-driven and consistent (focus ring, hover, sizing, reduced-motion) with the rest of the app. All behaviour is preserved: click handlers, disabled states, and accessibility (`aria-label`, `aria-haspopup`, and the mute toggle's `aria-pressed` via IconButton's `pressed` prop) are unchanged; the now-redundant `.media-detail__menu-btn` / `.media-detail__theme-btn` CSS was removed since `<IconButton>` supplies that styling.
- **`ThumbRating` now uses the theme foreground token for its resting wireframe glyph so it inverts correctly per theme.** The base `.thumb-rating__btn` colour was a hardcoded near-white `rgba(255, 255, 255, 0.92)`, which rendered invisibly-light on the Daylight theme; it is now `var(--text)`, matching the already-tokenised filled state and inverting correctly across Nocturne / Daylight / Midnight. Unit tests assert the hero variant hierarchy (Play=solid, Resume/Trailer/Match=outline, Watchlist/Watched=ghost), that the menu trigger and theme controls render the shared `<IconButton>` (not raw `<button>`s) with the `ghost` variant, and that `ThumbRating` no longer hardcodes the near-white rgba.

## 0.98.14 - 2026-07-22

### Changed
- **Admin settings help text is now shown inline instead of hidden behind a click-to-open popover (updates.md #16).** Every settings field in `SettingsPage.vue` that previously exposed its guidance through a `(?)` `HelpPopover` trigger now renders the same help text (and any reference links) inline beneath the control via the existing `HelpText` component, mirroring the always-visible pattern already used in `PluginsPage.vue`. All six per-field-type call sites (bool switch, int/float, enum select, JSON textarea, secret, and plain string) were converted, and the now-unused `HelpPopover` import was dropped from `SettingsPage.vue`. Admins no longer have to click each `(?)` to discover what a setting does — the explanation and its "Learn more" links are visible at a glance. `HelpPopover.vue` itself is left in place (its removal, pending a check for other usages, is tracked separately). The help-affordance unit tests were updated to assert the inline `.phlix-help-text` rendering (text + external link attributes, and its absence when a key has neither help text nor links) instead of clicking the old popover trigger.

## 0.98.13 - 2026-07-22

### Added
- **Web playback now sends an explicit "finished" signal when a title reaches its end, so completed items leave Continue Watching (updates.md #30, UI half).** When the `<video>` fires `ended`, `Player.vue::onEnded()` now calls a new `finish()` method on the shell-mounted resume reporter, which `POST`s `{ media_item_id, reached_end: true }` to `POST /api/v1/sessions/{id}/complete` (the S30 server endpoint). The server marks the item watched (flips playback state to stopped/position 0, runs the finalize/stats path), so a movie or the last episode you watch to the end no longer lingers in the Continue Watching rail. Previously only throttled `/progress` checkpoints were sent, which could leave a fully-watched title stuck near 100% in Continue Watching.
  - **Reuses the existing session — no new client, no re-auth.** `finish()` lives in `useResumeReporter` and reuses the SAME lazily-created session id and authenticated api client that the `/progress` reporter already holds. `PhlixApp` now `provide()`s its single reporter instance so the Player calls `finish()` on that exact instance (the one with the live session), rather than spawning a second reporter.
  - **Safe by construction.** `finish()` is a best-effort no-op when logged out, when there is no current media, or when playback never crossed the resume threshold (so no session was ever created — a barely-watched title is left untouched), and it swallows request failures so a finish error can never crash the player. In `onEnded()` the finish signal is guarded to fire at most once per playback-end (reset per source in `evaluateForCurrentMedia`), and it is additive — the S12 auto-play-next / up-next behaviour is unchanged. Native clients (Roku/mobile/tizen/windows) are a tracked follow-up, not part of this step. Regression tests cover `finish()` (POST shape on an active session, no-op with no session / logged out, swallowed rejection) and the Player (`finish()` invoked exactly once on `ended` with the up-next surface intact, re-armed on a media change so the next episode/replay finishes again, and no crash when no reporter is provided).
  - **The persistent mini-player also sends the finish signal.** A title watched to its end in the docked `MiniPlayer` (rather than the full Player) now fires `finish()` too. `MiniPlayer` `inject()`s the SAME shell-provided reporter instance (it is a child of `PhlixApp` below the `provide`), so it reuses the one live session — no second reporter, no competing session. Its `<video>` gained an `@ended` handler guarded by its own single-fire latch that re-arms when the docked item changes. Previously a movie or last episode finished in the mini-player could linger in Continue Watching. Regression tests cover the mini-player finish (POST path via the shared reporter, single-fire, re-arm on item change, and no crash without a reporter).

## 0.98.12 - 2026-07-22

### Added
- **The admin item ⋯-menu "Edit metadata" and "Explore item data" actions are now wired end-to-end (updates.md #15).** Both entries previously rendered in the media-item ⋯ menu but did nothing when selected. They now work on the media detail page (movie **and** series) and on all four `MediaCard` hosts — Library, Browse, Explore, and Recommendations:
  - **Edit metadata** now opens the existing `MetadataMatchModal` (via each host's `onMatch`). Post-S02 there is no separate metadata-editing API surface, so "Edit metadata" and "Match metadata" are deliberately **functionally identical** — both auto-search TMDB for the item and apply the chosen match. This known redundancy is out of scope for S15 and left as-is.
  - **Explore item data** opens a new read-only `ItemDataInspector` modal that pretty-prints the item's in-memory `MediaItem` as indented JSON with a **Copy JSON** button. It is **purely client-side** — it makes no network call and changes nothing — so it is a safe inspector reusable by every host. The clipboard copy gracefully no-ops when `navigator.clipboard` is unavailable (insecure context / jsdom). New files: `src/components/ItemDataInspector.vue` and the shared `src/composables/useItemInspector.ts`, which centralizes the open/target state so the five hosts share identical wiring. Both actions remain admin-only. Documented in phlix-docs `admin/library-management.md` ("The item ⋯ menu metadata actions"). Regression tests cover the inspector render/copy/empty states and, per host, that selecting each menu action opens the correct modal.

## 0.98.11 - 2026-07-22

### Fixed
- **A server-flagged default subtitle now shows on load without requiring a manual off/on toggle (updates.md #13).** Two owners were fighting over each subtitle `<track>`'s `mode`: the native `:default="st.default"` binding on the server-subtitle `<track>` in `Player.vue` set the track to `showing`, while the JS path (`maybeApplyServerDefault` → `player.setSubtitle` → `CaptionOverlay.rebind()` → `applyTrackModes`) set it to `hidden` for the custom overlay to paint. When the native default won the race — or when the track was already loaded at bind time and its active-at-load cue never fired `cuechange` — a server-flagged default subtitle stayed blank until the user manually toggled captions off then on to force a re-read. The native `:default` binding is now removed so the JS path is the sole owner of track `mode` (the `st.default` data field is still consumed by `maybeApplyServerDefault`, only the DOM attribute was dropped), eliminating the `showing`↔`hidden` fight. As defense-in-depth, `CaptionOverlay.rebind()` now schedules an unconditional `setTimeout(0)` re-check (`scheduleModeRecheck()`) that re-asserts `applyTrackModes` and re-reads the active cues — covering the already-loaded / no-`cuechange` case that the previous `readyState !== 2` load-listener guard skipped. The re-check only overwrites the rendered lines when cues are actually present (never blanks an already-painted cue) and is cancelled via `clearRecheck()` on unbind/unmount, so at most one timer is ever pending. Regression tests assert the tracks carry no native `default` attribute, the JS path selects the server default on load (`Captions (on)`), and the deferred re-check re-settles a competing owner and paints the first cue without a toggle.

## 0.98.10 - 2026-07-22

### Fixed
- **The in-player up-next queue now deterministically resolves to the next episode instead of racing the genre-similar fallback (updates.md #12).** When you started an episode, `PlayerPage`'s `applyItem()` fired two unawaited writers into the player queue — the episode-ordered `loadEpisodeNeighbours()` and the genre-similar `loadQueue()` — and whichever `player.setQueue()` resolved last won. A slow `/api/v1/media` genre query could therefore clobber the authoritative next-episode order, so an episode would non-deterministically fail to advance to the correct next episode. `applyItem()` now awaits `loadEpisodeNeighbours()` first for an episode and returns early once a next neighbour resolves, so the genre-similar `loadQueue()` never fires on that path and can no longer overwrite the queue. To keep the single-writer guarantee, `applyNeighbours()` is now the sole queue seeder for both the fresh series-tree fetch and the binge cache-hit path (previously the cache-hit branch set only prev/next and leaned on the racy `loadQueue` to seed the queue), and the now-redundant duplicate `seriesEpisodeCache` lookup inside `loadQueue()`'s episode branch was removed — `loadQueue()` is purely the genre fallback for movies, last episodes, and cache misses. The binge-navigation cache-hit fast path (sibling nav reseeds the queue from cache with no series-tree re-walk) is preserved. Regression tests model the race (episode with a real genre, genre fetch delayed past the immediate series-tree fetches) and prove the episode-ordered queue survives and the genre endpoint is never requested, plus binge cache-hit reseed and last-episode genre fall-through coverage.

## 0.98.9 - 2026-07-22

### Added
- **The admin Plugins page now has a catalog release-channel control (Stable / Dev), with Dev clearly marked opt-in / advanced (updates.md #27).** A `<Select>` above the plugin catalog on `PluginsPage` lets an admin switch the OFFICIAL catalog between two channels: **Stable** (the default — tracks the audited, pinned catalog) and **Dev** (an opt-in channel that tracks the moving `master` branch). Whenever the selected option carries the server's `advanced` flag (i.e. Dev), a `tone="warning"` **"Opt-in · advanced"** Badge and an amber, alert-icon warning line render beneath the control. The channel concept, its safety semantics, and the `ref`+`artifactSha256` per-entry install verification that gates every install regardless of channel are documented server-side (phlix-docs `plugins/plugin-catalog.md`); this UI half surfaces and persists the choice.
  - **Server metadata is the single source of truth for the warning.** The Badge label comes from the app, but the descriptive warning text (e.g. "tracks the moving `master` branch", "Opt-in / advanced") is the server-authored `description` rendered verbatim — no per-channel copy is hard-coded in the SPA, so the opt-in messaging cannot drift from the backend.
  - New typed client methods on `AdminPluginsApi`: `getChannel()` (`GET /api/v1/admin/plugins/catalog/channel`) and `setChannel(channel)` (`PUT` `{ channel: 'stable' | 'dev' }`), each returning `CatalogChannelInfo` (`{ channel, options: CatalogChannelOption[] }`), mirroring the existing `getAutoUpdate`/`setAutoUpdate` pair. A defensive, exported `normaliseChannelInfo()` degrades a malformed or older-server response to the safe `stable` default with `[]` options (dropping value-less options and strictly coercing `advanced`), and `CatalogResponse` gained an optional `channel?: CatalogChannelInfo` (the catalog listing embeds the same shape).
  - **Fail-safe and non-fatal:** `loadChannel()` runs on mount but a failure is swallowed — an older server with no channel endpoint simply leaves the rest of the page fully functional and the control hidden. `onSelectChannel()` optimistically applies the choice, binds to the server-confirmed value, refetches the catalog (the channel selects which `plugins.json` is fetched), and **reverts the optimistic selection on failure** with an error toast; the `<Select>` is locked (`channelSaving`) while a change is in flight. Accessibility: the channel wrapper is a labelled `role="group"` so the visible label satisfies WCAG label-in-name, and the success toast is derived from the server-provided channel label.
  - Regression tests cover the `getChannel`/`setChannel` client wiring, `normaliseChannelInfo()` degradation, the `catalog()` channel passthrough, and the page behaviour: defaults to Stable and renders Dev, selecting Dev PUTs `{ channel: 'dev' }` and shows the "Opt-in · advanced" Badge + master-branch warning + success toast, a persisted-Dev load reflects the advanced warning, and a PUT failure reverts the selection with an error toast.

## 0.98.8 - 2026-07-22

### Changed
- **The Library and Browse/home pages now reach closer to the shell gutter — the duplicated page-level padding that double-counted the app shell's own gutter is removed (updates.md #8, #9).** Every routed page renders inside `AppLayout`'s `.shell__main`, which already supplies the standard page gutter (`padding: var(--space-6) var(--space-5)` = 24px block / 20px inline). `.library-page` and `.browse-page` each *additionally* set `padding: var(--space-6)`, so the visible gutter was the sum — 48px top / 44px inline on those two pages — the "too much empty space" that was reported. Both page-level paddings are now `0`, leaving `.shell__main` as the single gutter.
  - **S08 (Library, updates.md #8):** `.library-page` padding `var(--space-6)` → `0`; `.library-header` margin-bottom `var(--space-4)` (16px) → `var(--space-3)` (12px) so the title sits nearer the `FilterBar`; and `FilterBar` gains an explicit `margin-bottom: var(--space-4, 16px)` — the single controlled gap between `<FilterBar>` and the grid (previously flush/0). The gap is placed on the bar's bottom (not the grid's top) so rows never collide with the sticky bar while it is stuck. The sticky `is-stuck` shadow is scroll-driven (`window.scrollY > 24`), not layout-derived, so the added margin cannot change when it toggles; `FilterBar` is consumed only by `LibraryPage`, so the new margin has no other blast radius.
  - **S09 (Browse/home, updates.md #9):** `.browse-page` padding `var(--space-6)` → `0`; `.media-row` `margin-block` `var(--space-8)` (32px) → `var(--space-6)` (24px), tightening the inter-rail gap and the first rail's top offset. `MediaRow`'s `content-visibility: auto` + `contain-intrinsic-size` are left unchanged — CSS margins sit outside the contain box, so the reserved off-screen height is unchanged and no first-paint layout shift is introduced.
  - **Scoped deliberately:** `AppLayout`'s `.shell__main` gutter is untouched, so the other shell pages that add their own root padding on top of it — Settings, Admin, Music, Search — are visually unaffected. The change is confined to `LibraryPage.vue`, `FilterBar.vue`, `BrowsePage.vue` and `MediaRow.vue`.

## 0.98.7 - 2026-07-22

### Changed
- **The Browse/home "Favorites" rail is now titled "My List" (updates.md #7).** On `BrowsePage`, the favorites `<MediaRow>` `title` prop changed from `"Favorites"` to `"My List"`. Because `MediaRow` derives its `<h2>` heading and both the `<section>` and `<ul>` `aria-label`s from that single `title` prop, the visible heading and both screen-reader labels rename together — no separate aria edits were needed. This is a display-label rename only: the underlying favorites concept is untouched — the favorites store, the `listFavorites()` client method, the `/api/v1/users/me/favorites` endpoint, and the add/remove (`onWatchlist`) toggle logic are all unchanged, and no internal `favorites`/`favoriteItems`/`showFavorites` identifiers were renamed. The rail stays `hide-when-empty` (renders only when the user has favorites), so no empty-state string is involved. The global favorite-toggle toasts ("Added/Removed … to/from your favorites") are shared feedback bound to every rail's `@watchlist` handler, not this rail's title, and were deliberately left as-is. Regression coverage: `BrowsePage.test.ts` locates the rail by its displayed title (now `"My List"`), so the render, ordering, hide-when-empty, and in-place toggle assertions all exercise the renamed rail.

## 0.98.6 - 2026-07-22

### Fixed
- **Browser and password-manager autofill can no longer silently overwrite admin secret fields (updates.md #6).** Every secret/credential input across the admin UI — 9 inputs over 6 pages: the schema-driven secret settings box on `SettingsPage`, the secret plugin-setting field on `PluginsPage`, the SyncPlay create/join-group passwords, the Users set-password and set-PIN inputs, the Webhooks HMAC signing secret, and the Integrations OIDC client-secret and LDAP bind-password — now carries the full anti-autofill hint set: `autocomplete="new-password"` plus `data-lpignore="true"`, `data-1p-ignore`, `data-bwignore`, and `data-form-type="other"`. Previously a browser or LastPass/1Password/Bitwarden autofill offer could inject a stored credential over an existing API key/token/secret, corrupting it on the next save. On `PluginsPage` the four `data-*` hints are applied conditionally (`descriptor.secret`) so non-secret plugin fields keep normal autofill; user-facing login/signup password fields are deliberately left autofillable. Purely additive attributes — no `v-model`, `type`, show/hide toggle, `inputmode`, `required`, or placeholder behavior changed. Regression tests assert the full hint set is present on secret inputs and absent on representative non-secret fields (username, OIDC `client_id`, Trakt `redirect_uri`).

## 0.98.5 - 2026-07-22

### Changed
- **The admin plugin Configure modal is now visibly wider (updates.md #5).** `Modal` gained a fourth `size` option, `xl` (`max-width: min(90vw, 72rem)`), one step above `lg` (48rem) on the existing `sm` 24rem / `md` 32rem / `lg` 48rem scale. The plugin Configure modal on `PluginsPage` — which packs a schema-driven settings form and was cramped at `lg` — switched from `size="lg"` to `size="xl"`. Purely additive: the `size` prop default (`md`) and the `sm`/`md`/`lg` rules are unchanged, internal body scroll still derives from `.phlix-modal__body { overflow-y: auto }` + the panel `max-height`, and every other `Modal` consumer (including the other three PluginsPage modals) is untouched. A parametrized regression test asserts each size — including `xl` — maps to its exclusive `phlix-modal__panel--<size>` modifier class.

## 0.98.4 - 2026-07-22

### Changed
- **The admin Libraries "What do these operations do?" help panel now renders expanded by default (updates.md #4).** The disclosure `<details>` on `LibrariesPage` (wrapping the Scan / Match metadata / Reset / Delete-all `<dl>`) previously started collapsed, hiding the per-operation guidance behind a click. It now carries the native `open` boolean attribute, so the help text is visible on first load. Purely a default-state change: no persistence of a user collapse choice was added (out of scope), the existing `.admin-libraries__help[open] .admin-libraries__help-summary` styling applies as intended, and this is the sole `<details>` on the page so nothing else is affected. A regression test guards that the attribute stays present.

## 0.98.3 - 2026-07-22

### Changed
- **The item ⋯ menu no longer offers "Like"/"Dislike" — the `ThumbRating` widget is the single like/dislike control (updates.md #3).** The ⋯ menu carried redundant "Like"/"Dislike" aliases (`MENU_LABELS.like`/`dislike`) that duplicated, less capably, what the thumbs-up/down `ThumbRating` widget already did (both routed to `useUserItemDataStore.setLike`). Those two labels and their `buildMediaItemMenu` entries are removed, along with the matching `case L.like:`/`case L.dislike:` branches in both `MediaDetail.vue` and `MediaCard.vue`. No functionality is lost: `ThumbRating`'s `@cycle`→`onLove`→`setLike` wiring is unchanged and remains the like/dislike control on both cards and the detail hero. A regression guard asserts the built menu never re-introduces Like/Dislike.

## 0.98.2 - 2026-07-22

### Changed
- **The item ⋯ menu now offers a single "Match metadata" action instead of the two duplicate entries "Refresh metadata" and "Identify from beginning" (updates.md #2).** All three admin affordances — those two ⋯-menu entries plus the detail-page hero **Match metadata** button — always opened the same metadata-match modal, so the ⋯ menu collapses to one **Match metadata** entry (`MENU_LABELS.matchMetadata`) shared by both the card and detail menus. On `MediaDetailPage` the separate `onMatch`/`onRefresh` handlers merged into one `onMatch(m?)`. No behavior is lost: the collapsed menu entry deliberately still emits `refresh` so the Library/Browse pages' existing `onRefresh` handling is unchanged, and the modal, its TMDB search/apply flow, and the admin-only gating are identical to before.

## 0.98.1 - 2026-07-22

### Fixed
- **Player subtitle tracks now de-dupe on a stable key (Wave 3 review follow-up).** On-demand-downloaded sidecars were merged into `serverSubtitleTracks` de-duped by the FULL signed URL. But the server re-mints a fresh signed URL (new `exp`/`sig` query params) on every playback-info refresh, so the same external subtitle arrived with two different URLs and rendered twice. Dedup now keys on the URL path with the query string stripped, so a downloaded track and its later playback-info refresh collapse to one rendered `<track>`.
- **Dead i18n key wired in for a11y.** `player.subtitleRating` was defined but unused; it is now the `aria-label` on the candidate rating stat in `SubtitleSearch` (e.g. "Rating 8.5"), so screen readers announce the rating rather than a bare star icon + number.

## 0.98.0 - 2026-07-22

### Added
- **On-demand subtitle search & download in the player (Wave 3 F3).** The captions menu gains an "Add subtitles…" action that opens a focus-trapped modal (`SubtitleSearch`): a multi-language picker (pre-seeded with the user's preferred subtitle/audio language, the browser/UI language, then English), a Search action, and a ranked candidate list (sorted by provider rating then download count) showing provider, release name, a language badge, an SDH badge, rating, download count and fps.
  - New typed client methods on `ApiClient`: `searchSubtitles(mediaId, langs)` → `SubtitleCandidate[]` (`GET /api/v1/media/{id}/subtitles/search?lang=…`, empty registry/no matches ⇒ `[]`) and `downloadSubtitle(mediaId, payload)` → `{ track }` (`POST /api/v1/media/{id}/subtitles/download`). Both send the standard Bearer auth; candidate payloads are normalized from camel/snake case.
  - Each candidate's Add action downloads + attaches the track; on `200` the returned track is parsed and merged into the player's `subtitle_tracks` (de-duped by url) so it renders as a native `<track>` and becomes selectable immediately, plus a success toast. `429` shows a quota message including `downloadsRemaining`/`resetTimeUtc` when present; `404` a "no longer available" error; other failures a friendly error toast. The Add button spins + disables while in flight (double-submit guarded) and shows a check once added.
  - Accessible: keyboard-navigable list inside the shared Modal, aria-labelled Add buttons + language chips; all strings routed through the i18n catalog (`player.*`).

### Fixed
- **Federation SPA status vocabulary aligned with the hub DB enums.** The federation surfaces used a status vocabulary that did not match the values the hub actually stores/returns, so states rendered incorrectly. The SPA now speaks the same status enum the hub DB persists.

## 0.96.0 - 2026-07-21

### Added
- **Per-page help on the 8 user-facing hub management pages (plan_settings.md Phase 9 extension).** The admin section was done in 0.95.0; this extends the same infrastructure to My Servers, Server Detail, Federation, Federation Shares, Manage Shares, Shared With Me, Invite Links and Requests. Both `PageHint` slots — `links` and `details` — are populated on every one.
  - Content lives in one module, `src/pages/hubHelpLinks.ts`, mirroring the admin corpus. These pages are routed from OUTSIDE this library (the `phlix-hub`/`phlix-server` `web-ui` trees), so they get their own corpus and guard rather than joining `admin/helpLinks.ts`, whose test walks the admin route table.
  - `hubHelpLinks.test.ts` pins: every target page has an entry, **every entry is actually bound by its page** (a class-(g) render check), URL shape, and an opt-in `PHLIX_NETWORK_TESTS=1` liveness probe that asserts its own discrimination (a fake docs URL must 404). It uses `node:https`, not the stubbed `fetch`.
  - Every one of the 8 documentation URLs was probed 200 against the live docs site with fake sibling controls probed 404 alongside. **Federation and Federation Shares ship `links: []` deliberately** — no user-facing federation documentation exists, only the operator-level `hub-admin/federation-policy` page, and an invented link is worse than none. The omission is pinned by a test.

### Fixed
- **`SharedWithMePage` showed every active share as "Access revoked by owner".** The page's `HubIncomingShare` interface expected `id`/`owner_email`/`status`/`created_at`, but the hub returns `SharedLibraryDto` keys `share_id`/`owner_name`/`permission_level`/`created_at` and has **no** `status` field — `getSharedWithMe()` only ever returns active shares. So `share.status` was `undefined`, the "Revoked" branch always rendered, "Shared by" was blank and the date was "Invalid Date". The interface now matches the real payload; the fabricated status badge and revoked branch are gone; the "Browse Library" button (which pointed at a `/browse/:server/:library` route that does not exist) is replaced by an "Open Server" link to `access_urls[0]`, disabled when empty.
- **`InviteLinksPage`'s server dropdown was always empty.** `invite-links.ts` typed the servers response as `{id, server_name}`, but the hub returns camelCase `serverId`/`serverName` (`ServerInfoDto`). Every option resolved to `{value: undefined, label: undefined}` and New Invite always failed with "Please select a server." The consumer now reads the camelCase fields, matching `MyServersPage`.

### Notes
- The two fixes above pair with a `phlix-hub` change adding `created_at` to `SharedLibraryDto`.
## 0.95.0 - 2026-07-21

### Added
- **Per-page help on all 22 routed admin pages (plan_settings.md Phase 9).** Every admin page already carried a `PageHint` describing what it does, but the component's other two slots were unused everywhere: **no page had ever populated a `PageHint`'s `links`**, and nothing used `details`. The plan's recorded "2 of 23 pages populate links" was counting `HelpText` — the per-field overlay at `PluginsPage.vue:1393` — not `PageHint`, so the real gap was 22 of 22.
  - Content lives in one module, `src/pages/admin/helpLinks.ts`, rather than inline per page. The plan lists "no owner for the 80+ help links going stale" as an unaddressed gap and two in-tree Trakt links had already 404'd; centralising them gives the corpus exactly one owner and makes it mechanically checkable.
  - `helpLinks.test.ts` guards four things: every routed admin page has an entry, **every entry is actually bound by its page** (an entry nothing renders is the "resolvable but not consumed" failure this codebase keeps hitting), URLs are well-formed, and — opt-in via `PHLIX_NETWORK_TESTS=1` — they still resolve. All 40 URLs were verified 200 against the live docs site, with a deliberately fake URL probed alongside to confirm the check discriminates.
  - The liveness probe uses `node:https`, **not** `fetch`: `src/test/setup.ts:10` stubs `globalThis.fetch`, so a fetch-based probe measures the stub and reports every URL as dead. The test asserts its own discrimination so that false result cannot recur.

### Fixed
- **The Settings page described the `custom` badge backwards.** It said the badge "marks values overridden by your environment or config file". `isOverridden` is driven by the server's `overridden` list, which comes from `SettingsRepository::getAllOverrides()` — a read of the `server_settings` table. The badge means *you saved this value here*, overriding the built-in default. The hint now says that, and the new help panel adds the non-obvious corollary: a saved value beats an environment variable, which is the opposite of what most tools do.
- **The Live TV page promised automatic series recording that does not happen.** The hint said Series Rules "auto-records a show every time it airs". `SeriesRuleManager::matchAndSchedule()` — the method that would turn a rule into scheduled recordings — has **zero callers anywhere in the repo**, not even a test; the manager is reached only by `AdminLiveTvController`'s CRUD paths. Rules are stored and managed and never acted upon. The hint and help panel now say so and point at Schedule Recording.
- **`npm run lint` was red on master** (verified by linting `HEAD~1`'s copy): `SettingsPage.vue` imported `SETTINGS_SECRET_MASK` but referenced it only from docblock `{@link}` tags, which `no-unused-vars` does not count. The runtime import is gone and both references remain as code spans.
- **`HubDashboardPage`'s "omits the offline badge" test scanned the whole page for the bare word "offline"**, so it collided with any prose using the word. It now matches the badge's rendered form (`/\d+\s+offline/`), mirroring the positive test — re-verified by mutation to confirm narrowing did not weaken it.

### Notes
- **`WebhookLogsPage.vue` is deliberately undocumented and is asserted absent from the corpus.** Its only reference in `src/` is its own docblock, nothing routes it, and all three of its API calls (`/api/v1/admin/webhooks/logs`, `.../retry`, `DELETE .../{id}`) target endpoints the server does not implement — `grep "webhooks/logs"` in `phlix-server` returns zero hits. Giving it help text would document a page no one can reach.
- **Cast Devices ships `links: []` on purpose.** There is no user-facing casting document, and `developers/discovery.md` is developer-level and documents a Roku service string (`_ roku-ecnp._tcp.local.`) that cannot work. An invented link is worse than none. Both this and the `WebhookLogsPage` exclusion are pinned by tests so a later pass does not "helpfully" undo them.
- 22 of 59 drafted factual claims were checked against source and found wrong before shipping — including the transcoding panel, which originally said encoding-setting changes leave cached titles alone. The opposite is true: the encode fingerprint is folded into the transcode job key, so changing preset/CRF/audio-bitrate re-encodes already-watched titles on next play, and reverting every value to its default restores the original key and reuses the existing cache.

## 0.94.0 - 2026-07-21

### Fixed
- **`LIBRARY_TYPES` offered five of the seven `libraries.type` ENUM members, so a book or audiobook library could not be created from the admin UI.** The constant carried a comment asserting `book` was "intentionally absent … because a `book` insert would 500 at the DB ENUM". That was true when written and false since **migration 035**, which added `book` AND `audiobook`. Verified against the production column — `enum('movie','series','music','photo','video','book','audiobook')` — and against `LibraryController::create()`'s `$validTypes`, which are the same seven. The server accepted both kinds the whole time; only the picker refused to offer them.
  - The existing test asserted the five-member list **and** `expect(LIBRARY_TYPES).not.toContain('book')` explicitly, so it was a lock on the defect rather than a guard against it. It now asserts all seven, and separately asserts that the library-kind vocabulary stays distinct from `media_items.type` — the two overlap (`movie`, `series`, `music`, `photo`, `video`) and merging them is the obvious wrong turn.
- **`WatchHistoryPage` drew a film icon for tracks, books, photos and audiobooks.** Its fallback icon used `type === 'series' ? 'tv' : 'film'`, bypassing `utils/mediaTypeIcon`, which is exhaustive over all 13 `media_items.type` members via a `Record` (so adding an ENUM member is a typecheck error there rather than a silent fallthrough). That helper exists precisely because this ternary had been copy-pasted around — and both earlier copies keyed on `image`, a value the server never emits.

### Changed
- **`@phlix/contracts` repinned `v0.3.11` → `v0.3.12`.** v0.3.11's `MediaType` was still the old six-member union *including* the bogus `image`; v0.3.12 (contracts `f5d8962`) replaced it with the full 13-member `media_items.type` ENUM and dropped `image`, which is a scanner-side label for a file-extension set rather than a type the server ever emits. This is compile-time only — nothing validates `type` at runtime — but the stale union both accepted a value the server never sends and rejected eight that it does.
  - This release exists mainly to propagate that repin. `phlix-server/web-ui` and `phlix-hub/web-ui` consume contracts *transitively* through `@phlix/ui`, and both were resolving `0.3.11` under the `v0.93.0` tag; the repin landed on master after that tag, so it needed a release to reach them.

## 0.93.0 - 2026-07-20

### Removed
- **`src/pages/admin/PluginConfigPage.vue` is deleted; its Configure surface is merged into `PluginsPage`'s Configure modal.** Two sidebar entries — "Plugins" and "Plugin Config" — both rendered a plugin's manifest `settings_schema`, from two independent reimplementations that had already drifted (secret-status handling, dirty tracking, `Default:` hints, `Switch`-vs-checkbox), so every future secret or schema fix had to be made twice. `PluginsPage` survives: it is the only surface carrying the plugin lifecycle (catalog, install, uninstall, update, auto-update, enable/disable), it has been reachable in production since 0.39.0, and it already had the better save semantics. The `admin-plugin-config` route, its `<base>/admin/plugin-config` URL and its three page-set registrations are removed; the server admin sidebar goes from 21 entries back to 20. `PluginConfigPage` was never exported from `src/index.ts` and is referenced by neither `phlix-server/web-ui` nor `phlix-hub/web-ui`, so there is no consumer-facing API change. No redirect was added: the route existed for one day (0.92.0, 2026-07-20), so there are no meaningful bookmarks.
  - **Correction to the 0.92.0 entry below.** It justified routing the page on the grounds that it "is the only surface carrying the Standard/Advanced tier toggle." That toggle gates nothing for plugins and never did: `SettingsMasker::schema()` builds each descriptor from an explicit allow-list that excludes `tier`, `PluginFieldHelp::OVERLAY_KEYS` is only `[label, description, link, link_text]`, and no shipped manifest declares a `tier`. `isAdvanced()` was therefore always `false`, and the page's 8 tier tests passed only because they injected synthetic descriptors. The tier scaffolding was **deliberately not ported** rather than carried over as UI that implies a control is doing something it isn't; making `tier` real is server-first work spanning `SettingsMasker`, `PluginFieldHelp` and the plugin manifests.

### Added
- **feat(plugins): the "Test credentials" button is restored in the Configure modal.** `POST /api/v1/admin/plugins/{name}/test` is now routed in `phlix-server`'s `AdminRoutes.php`, so the control that was held back as a guaranteed 404 works. It submits the settings the admin has **typed**, without saving them, and reuses the existing `AdminPluginsApi.testCredentials()` client rather than a second one.
  - **The payload is `buildChangedSettings()` — the same map a save sends**, deliberately, so the two can never disagree about what "the current settings" are. A newly-typed secret is included; an untouched one is **omitted** rather than sent as the `***` mask sentinel, which the plugin would otherwise authenticate with as a literal credential and report as invalid. Omission is also sufficient: `PluginLoader::getEntryInstance()` applies the plugin's *persisted* settings before `testCredentials()` is called, so an omitted secret is still the one under test and testing without editing anything tests what is stored.
  - **A `501 plugin.test_not_supported` reads as "Not supported", not as a failure.** That status means the plugin ships no `testCredentials()` method at all, so nothing was tested; presenting it as a failed test would tell an admin their working API key is bad. It gets its own neutral tone and no error toast. A plugin whose own test throws is mapped server-side to a normal `200 {success:false}`, so a rejected request always means the request itself failed and is shown as a failure with the server's reason.
  - **The result never outlives the values it describes** (audit §6.2 #18): it is cleared when any field is edited, when a secret is armed for or disarmed from removal, and when a different plugin is configured — so a green "Credentials are valid." can never sit beside a freshly mistyped key.
  - **Security.** The server scrubs every submitted credential out of the response message (`PluginAdminController::redactSubmittedSecrets()`), because a plugin's exception text routinely embeds a request URI carrying the API key. The client honours that: the response is not logged, the message is rendered only in the result line, and nothing echoes it to a toast or the console.
  - The button carries an accessible name identifying the plugin ("Test the credentials for anidb"), and the result is announced through the modal body's **existing** `aria-live="polite"` region rather than a second, competing one. It is offered only for plugins that expose a settings schema.
- **feat(plugins): the OAuth redirect URL is shown in the Configure modal, with a copy button.** `PluginAdminController::serializeDetail()` has emitted `redirect_url` all along and `PluginConfigPage` was the only surface that rendered it — so deleting that page without this port would have left admins with no way to discover it at all. Scrobbler-style plugins (Trakt, Last.fm) cannot be authorised until that exact string is pasted into the provider's own application settings. It renders verbatim in a `<code>` block above the settings form, and renders even for a plugin with an empty `settings_schema` (an OAuth plugin configured entirely at the provider still needs its callback URL). The Copy button has an accessible name that identifies the plugin ("Copy the redirect URL for trakt") and announces the outcome in a visually-hidden `role="status"` region as well as by toast; a clipboard rejection tells the admin to copy manually and leaves the URL on screen to do so.
- **feat(plugins): a secret whose status the server did not report now says so.** The Configure modal rendered a flat "Not set." whenever `secret_status[key]` was falsy — which includes a server too old to emit the map at all. That asserted a credential was absent when one may well have been stored, inviting an admin to overwrite a working secret. The cue is now three-state: **Configured** (with the stored character count), **Not set**, or **Unknown** ("This server did not report whether a value is stored"). The placeholder text follows the same three states. Both pages already kept the Remove control available under unknown status, so this was a misleading label rather than data loss.
- **feat(a11y, plugins): the Configure modal's form is properly wired for assistive tech.** Each control gains a real `<label for="plugin-setting-{key}">` ↔ `:id` association (clicking a label now focuses its input; previously only an `aria-label` was set, so the label text was inert), each secret input is linked to its status line via `aria-describedby`, and the modal body is an `aria-live="polite"` region. Existing properties are unchanged — `aria-invalid` on failing inputs, `rel="noopener noreferrer"` on external links, the modal's focus trap and Escape-to-close.
- **feat(plugins): a save failure is bannered inside the modal, not only toasted.** A validation failure shows "Please fix the errors below and try again." above the form and a non-validation failure shows the server's own reason; the per-field errors were already rendered, but in a long schema the offending field can sit well below the fold and a toast is gone before it is found. The banner is `role="alert"` and is cleared when the modal is reopened.
- **feat(plugins): `array` and `object` settings round-trip as JSON.** They have no dedicated control, so they edit as JSON in a text box. Previously the stored value was rendered raw (an object stringified to `[object Object]`) and sent back as a raw string. The value is now serialised on seed and parsed on save, falling back to the raw string when the JSON is malformed so the server's validation error surfaces rather than the slip being swallowed client-side.
- **feat(plugins): clearing an optional setting sends `null` rather than `''`.** Only `null` expresses "unset" to the server; the empty string is a value in its own right and was being stored as one. Booleans, numbers and secrets are unaffected.

### Changed
- **Per-field descriptions and help links in the Configure modal now render through the shared `HelpText` component**, matching `SettingsPage` and the deleted page. The link-anchor fallback for a `link` that arrives without `link_text` remains `PluginsPage`'s "Where to get this" (rather than the deleted page's "Learn more"), which is the more useful phrasing for a credential field. The secret status cue gains semantic `Badge` tones (success / neutral / warning) alongside the existing length-proportional bullet dots.

### Fixed
- **docs: the README no longer claims "16 admin pages".** The count was wrong in two places and had been for a while (the real figure was 21, then 20 once `PluginConfigPage` was deleted). Both the prose and the code sample now avoid carrying a number that rots: the pages are enumerated by their actual sidebar labels, and `defaultAdminPages` in `src/app/admin.ts` is named as the source of truth for the list and its order.
- **test(settings): the fixtures no longer name a setting key that does not exist.** `SettingsPage.test.ts` referenced `hwaccel.probe_timeout` in seven places; that key was deleted from the shared schema (it was consumerless, and wiring it would have created an admin-reachable worker hang). The tests were fixture-only and passed against their own synthetic data — the page is meta-driven and nothing in production referenced the key — but they described a server that no longer exists. Replaced with `ffmpeg.transcode_timeout`, a real key in the same `transcoding` group with the shape the fixtures exercise (integer, `tier: advanced`, `restart: true`, `minimum`/`maximum` copied verbatim: 60–86400, default 7200). The fixture doc comment's stale "43 keys / 14 groups" is corrected to the current 41 keys / 13 groups and now points at the schema file rather than a version number.
- **test(plugins): `PluginsPage.test.ts` no longer leaks modals between tests.** Modals teleport to `<body>` and a test that failed before its `unmount()` left its panel behind; because the `modalPanel()` helper reads the *last* panel, one real regression cascaded into a spread of misleading failures in unrelated tests. `afterEach` now clears `document.body`.

### Notes
- The two defects found in the deleted page were checked against `PluginsPage` and are **not present** there: its post-save path closes the modal and calls `refreshAll()` rather than re-entering a toggle-off guard, and `buildChangedSettings()` has always diffed against `pristineValues` so an untouched field never enters the PUT. `PluginsPage` also already used `EmptyState`'s real `description` prop, so it never had the deleted page's four dropped-error-text call sites.
- Test coverage for the merged surface: `PluginsPage.test.ts` goes from 45 to 83 `it()` blocks (71 for the merge itself, plus 12 for the restored Test-credentials button — payload contract including the untouched-secret omission, the 501 presentation, stale-result clearing on edit / secret-removal / plugin switch, and the live-region wiring), absorbing the deleted spec's secret-contract and help-link assertions (mask-never-in-DOM, server-regression containment, password-type, `aria-describedby`, cue-flip on an identical schema, link-without-`link_text`) and adding coverage for every port above. The 8 tier tests were not migrated — see the tier note in Removed.

## 0.92.0 - 2026-07-20

### Added
- **feat(admin): `PluginConfigPage` is wired into the admin router.** The page existed since U6 but was imported by nothing except its own test file — no route, no export, and it had never appeared in a built `dist/` in any commit, so the fixes it received in 0.91.0 reached no users. It is now registered in `src/app/admin.ts` as `admin-plugin-config` at `<base>/admin/plugin-config` ("Plugin Config", `key` icon), placed after Plugins in the server page set, and ships as its own lazy chunk. The server admin sidebar goes from 20 entries to 21.
  - It overlaps `PluginsPage`'s configure modal, but is the settings-only view (no catalog browsing or installation) and is the only surface carrying the Standard/Advanced tier toggle. If that overlap is unwanted, the alternative is deleting the page rather than routing it — this change makes it reachable so that call can be made against something an admin can actually see.

## 0.91.0 - 2026-07-20

### Fixed
- **fix(plugins): a masked plugin secret was indistinguishable from an unset one.** `PluginConfigPage` seeded its form with `String(value ?? '')` straight from `detail.settings`, whose `secret: true` entries the server has already replaced with `PLUGIN_SECRET_MASK` (`***`) — so a configured plugin credential and an empty one both rendered the literal `***`, with only a static "Secret" badge to go on. The page now starts secret inputs **empty**, renders them as `type="password"`, and shows a **Configured** badge with the stored character count (or **Not set**) driven by the `secret_status` map the detail endpoint already published, wired to the input via `aria-describedby`. The blanking is unconditional on `secret: true`, so a server that failed to mask still could not put the value in the DOM. This brings the page in line with the treatment `SettingsPage` (0.90.0) and `PluginsPage` already had; no server change was required, since `PluginAdminController::serializeDetail()` has emitted `secret_status` all along.
- **fix(plugins): an untouched plugin secret can no longer be wiped by a save.** With the prefill removed, `buildSettingsPayload()` gated only on the `secretTouched` map, so typing into a secret and then clearing it sent `''` and silently deleted the stored credential. A blank secret is now omitted from the payload whether or not it was touched — "keep" is the only thing a blank field can mean, and deletion is an explicit action (see below).
- **fix(plugins): `secret_status` is parsed defensively.** `AdminPluginsApi.get()` passed the raw map through after a shallow `typeof === 'object'` check. It now normalises per entry, mirroring `normaliseSecretStatus` in `settings.ts`: `set` requires a literal `true` (a malformed payload degrades to "not configured" rather than falsely claiming a credential is stored) and a non-finite `length` falls back to 0.

### Added
- **feat(settings, plugins): a "Remove stored value" control for secrets.** Because secret inputs start blank and a blank field means "keep the stored value", clearing the box could not express "delete this" — leaving no way at all to unset a credential from the UI. All three configure surfaces (`SettingsPage`, `PluginsPage`, `PluginConfigPage`) now offer a **Remove** button on secret fields, which arms the field (input disabled and cleared, status line switches to a "Will be removed" warning) and sends `''` on the next save — the value both `AdminSettingsController::update()` and `PluginAdminController::updateSettings()` persist as an empty secret, since each skips a secret only when the submitted value is the mask sentinel. **Undo** disarms it. Arming also drops any half-typed replacement, so "replace it" and "delete it" stay mutually exclusive. The control is offered unless the server *positively* reports the secret as unset; where no status was sent at all (an older server) unknown is not treated as unset, so those admins keep the ability to clear. **Note:** of the three, only `SettingsPage` and `PluginsPage` are reachable in the shipped bundle — `PluginConfigPage.vue` is currently imported by nothing but its own test file (no route, no export, and it has never appeared in `dist/`), so its copy of this work is source-only until that page is wired up.
- **fix(settings): a pending secret removal now enables Save.** `hasAnyChanges` was computed purely from the `dirty` map, but an armed removal is not dirty — the field is blank, which is already its baseline — so arming one alone left Save disabled and the intent unsendable. Pending removals now count as changes, and are cleared alongside the dirty state once a save or reload lands so they cannot fire twice.
- **test(plugins): secret handling asserted by consequence, not by flag.** New coverage across the three pages proves the mask sentinel and any plaintext never reach rendered output (including when the server fails to mask), that an untouched secret is absent from the save payload while a typed one is present, that a typed-then-cleared secret is omitted rather than wiping the stored value, that the Configured/Not set cue follows `secret_status` rather than the schema, and that Remove sends `''` while Undo sends nothing. `AdminPluginsApi.get()` gains cases for malformed and non-record `secret_status` payloads.

## 0.90.0 - 2026-07-20

### Fixed
- **fix(settings): a masked secret was indistinguishable from an unset one.** The server replaces every `secret: true` value with the sentinel `***` before responding (`AdminSettingsController::maskSecrets()`), so the page was rendering that literal string into a password box with a Show button — an admin could not tell a configured credential from an empty one, and Show revealed only `***`. The page now reads the `secretStatus` map the same response already published and renders a **Configured** badge with the stored character count, or **Not set**, next to each secret. Affects all five `secret: true` keys (`tmdb.api_key`, `lastfm.api_key`, `lastfm.shared_secret`, `trakt.client_id`, `trakt.client_secret`) via the existing meta-driven path — no per-key code.
- **fix(settings): secret inputs no longer render any stored value.** A secret field now starts **empty** rather than pre-filled with the sentinel, with a placeholder ("Leave blank to keep the stored value" / "Enter <label>") and the status line wired via `aria-describedby`. Because the empty string is also the field's dirty baseline, an untouched secret is never dirty and is therefore **absent from the PUT payload entirely** — the stored credential cannot be clobbered by a save that did not touch it. The blanking is unconditional on `secret: true`, so a server that failed to mask still could not put the value in the DOM. A revealed field is re-hidden and re-emptied after a successful save.
- **fix(settings): the Show toggle on secret fields is gated behind an edit.** It is rendered only once the admin has typed a new value, so it reveals *their* input (useful for checking a pasted API key) instead of the meaningless sentinel it used to expose.
- **fix(settings): the restart banner was inverted.** `needsRestart` was computed from the *dirty* map, so the banner appeared while the admin was still typing and vanished the moment the save that actually required a restart succeeded — taking its Restart button with it. It is now driven by the keys that were **successfully saved** and carry `restart: true`, is persisted to `localStorage` (per API base) so it survives navigation and a page reload, and clears only after a confirmed restart or an explicit **Dismiss**.
- **fix(settings): `json` settings rendered as `[object Object]`.** The server projects schema `array` and `object` properties to the internal type `json`, but the control chain had no `json` branch, so those keys fell through to a text input seeded with `String(value)`. Two live keys were affected — `metadata.provider_priority` (standard tier, so it rendered unconditionally) and `matching.noise_suffixes`. They now render in a JSON textarea with parse-on-input, an inline parse error, `aria-invalid`, and a save-gate that refuses to PUT while any dirty JSON field is unparseable. Dirty comparison is on the canonical JSON, so reformatting alone does not enable Save.
- **fix(settings): a server that sends no `meta` no longer yields a blank page.** Tabs and fields were derived solely from `meta`, so an older server paired with this UI produced an empty tab bar and "No settings in this group." while `settings`/`types` sat fully populated and ignored. The page now falls back to rendering every key in `types` under an "Other" tab with labels derived from the full key, and shows a notice explaining that help, grouping and tiers are unavailable.
- **fix(settings): tab captions are humanised.** Tabs were labelled with the raw group key, so admins saw `port-forward` and `subsystem`. Captions are now derived client-side (`port-forward` → "Port Forward"); an optional `groupLabel` on `SettingMeta` is honoured when present so the server can take over later without a UI change.
- **fix(settings): `restartServer()` no longer drops the page into its error state on a slow restart.** The fixed 3s sleep followed by an unguarded reload meant a systemd restart that took longer showed "Couldn't load settings". It now polls with a linear backoff (capped at 3× the base interval) inside a 60s budget, keeps the previously loaded settings on screen throughout, and reports a clear timeout message if the budget is exhausted.
- **fix(plugins): a field-help overlay entry with a `link` but no `link_text` silently dropped the link.** `link` and `link_text` are independently optional; the guard required both. A link-only entry now renders with a "Learn more" anchor.
- **fix(a11y): `HelpPopover` no longer labels every trigger "Help".** A new `fieldLabel` prop produces "Help for <field>", and the admin settings page passes both `fieldLabel` and `title` at every call site, so a tab with a dozen fields no longer presents a dozen identical buttons to a screen reader. The popover's DOM id now comes from Vue's `useId()` instead of `Math.random()` in a `computed`, and the always-true `v-if` on its header is gone. All existing security/accessibility properties are unchanged (`:href` binding, `target="_blank"` + `rel="noopener noreferrer"`, native button, `aria-expanded`/`aria-controls`, ESC via focus trap, click-outside, focus return, listener cleanup).
- **test(settings): the suite is green again.** `SettingsPage.test.ts` fixtures carried no `meta` block, so zero tabs rendered and 26 of its tests failed; `settings.test.ts` had two assertions predating the `meta` field. Both are rebuilt against the real contract, and the schema-driven path now has real coverage (json controls, tier gating, per-option help, restart-banner lifecycle including reload, and the no-`meta` fallback).

### Added
- **feat(api): `secretStatus` on the admin settings contract.** `SettingsResponse` gains `secretStatus: Record<string, SecretStatus>` where `SecretStatus` is `{ set: boolean; length: number }`, keyed by secret key only, parsed defensively — a malformed entry degrades to "not configured" rather than falsely claiming a credential is stored, and a server too old to emit the map yields `{}`, which the UI renders as "did not report" rather than "Not set". `SETTINGS_SECRET_MASK` (`'***'`, mirroring the server's `SettingsMasker::MASK`) and the `SecretStatus` type are exported from the package root. A parity test pins `SETTINGS_SECRET_MASK` to `PLUGIN_SECRET_MASK` and to the server literal so the two copies cannot drift.
- **feat(settings): the configured cue survives a save.** The PUT response carries no `secretStatus`, so the page reconciles it from what it just persisted — a newly saved secret flips to **Configured** immediately instead of showing a stale **Not set** until the next full load.
- **test(settings): secret handling is asserted by consequence, not by flag.** New coverage proves a plaintext secret never reaches rendered output (including when the server fails to mask), that an untouched secret is absent from the PUT payload under *any* value, that a modified secret is present as the typed plaintext and never as the sentinel, and that the Configured/Not set indicator follows `secretStatus` rather than `meta`. Page fixtures are rebuilt against the real `phlix-shared` v0.25.0 contract — 43 keys, the `scrobblers` group, all five `secret: true` keys with masked values, and a `secretStatus` map mixing set and unset.
- **feat(settings): per-field "requires a server restart" note.** Plan §3.35 asks for both a per-field note and the banner; only the banner existed, and none of the `restart: true` keys were marked. Every such field now carries the note.
- **feat(settings): per-option help is rendered.** The server emits `optionHelp` for every enum key and nothing displayed it. Enum controls now render a definition list of option → help beneath the Select, captioned with the option's `enumLabels` entry.
- **feat(plugins): Standard/Advanced toggle on the plugin config page** (plan §3.3). `PluginSettingDescriptor` gains an optional `tier`; a manifest or overlay entry without one is treated as standard. Advanced fields render greyed + disabled with an "Advanced" badge until the toggle is on, and disabled advanced keys are omitted from the save payload so a Standard-mode save is a genuine partial update. The toggle shares the existing `useSettingsPrefs` store with the server settings page.
- **test(plugins): first test coverage for `PluginConfigPage.vue`** (tier gating, save-payload filtering, and overlay link rendering).

### Removed
- **`SettingsForm.vue` and its public export are deleted, along with the "Server" tab of the user-facing Settings page.** The component rendered a hand-maintained map of 18 server-settings keys (of 40) across 9 groups (of 13) against `GET/PUT /api/v1/users/me/settings` — the **per-user** endpoint, which returns `{ settings: { max_streams, max_bitrate, preferred_audio_language, preferred_subtitle_language, subtitle_mode } }` and carries none of those keys. Every field therefore displayed a coerced default and every save wrote server-setting keys into the user's settings row. It was also the last surviving copy of the triplicated hardcoded metadata the schema-driven rewrite set out to retire. Server configuration lives solely on the admin-gated `pages/admin/SettingsPage.vue`. The `settings.tabServer` / `unsaved` / `saveGroup` / `groupSaved` / `groupSaveError` / `loadFailed` / `loadErrorTitle` message keys are retained but marked deprecated so consumer i18n overrides do not break.
- **`ServerSettings` and `SettingGroup` are removed from `src/types/server-settings.ts`** (and from the public export). They were hand-maintained duplicates of the schema that had drifted to 20 of 40 keys and 9 of 13 groups. The two value-shape aliases that describe setting *values* rather than the key set — `ProviderPriority` and `GenresMode` — remain exported.
- **The `metadata.genres_mode` special case is gone.** It had its own state ref, sync function, setter, `syncFormValues` skip, `handleSubmit` branch and template branch, and its `<Select>` was the only control in the file missing `:disabled` — so it would have stayed editable in Standard mode had its tier ever changed. It is a plain enum and now flows through the generic enum path.

### Changed
- **The settings `PageHint` no longer enumerates the tabs.** It hardcoded a 10-tab list that was already stale against the schema's 13 groups and would drift with every schema addition. The prose now describes the stable behaviour (save-what-changed, the `custom` badge, the Advanced switch) instead.
- Dropped the no-op `_order` sort in `tabKeys` (the server never emits `_order`, so the comparator was a constant `0` and both `as any` casts were dead) and the matching `_`-prefixed key filter in `syncFormValues`. Field order is schema declaration order, which is what already happened.
- `package-lock.json` self-reported `0.87.0` while the package was `0.89.0` — the 0.88.0 and 0.89.0 bumps edited `package.json` without the lock. Reconciled. (`v0.89.0` was tagged with the stale lock; the diff is the two self-referential `version` strings only — no dependency, resolution or integrity drift.)

## [0.89.0] (2026-07-20)

### Changes
- Phase 8: restart button wired to POST /api/v1/admin/restart (commit 0f43e0b)
- Phase 9: PageHint added to RequestsPage (commit dfc2bd6)

## [0.88.0] (2026-07-20)

### Changes
- feat(settings): **Phase 1 schema-driven settings UI** — fully revamps the settings surface to consume server-provided setting metadata and render adaptively:
  - New `HelpText.vue` and `HelpPopover.vue` components for per-field contextual help (inline text callouts and popover overlays respectively)
  - New `useSettingsPrefs.ts` Pinia store tracking Advanced mode toggle state
  - `PageHint.vue` enhanced with `links` (optional outbound link list) and `details` (collapsible detail section) props
  - `SettingsPage.vue` (admin) now renders from the server's `meta` block: the control is chosen from the `types` map (`bool` → Switch, `int`/`float` → number input, enum → Select, `secret` → password input) and every label, help text, tab, tier and numeric bound comes from `meta`. The six hardcoded maps (`TAB_KEYS`, `FIELD_LABELS`, `FIELD_HELP`, `NUMERIC_CONSTRAINTS`, `SELECT_OPTIONS`, `PASSWORD_FIELDS`) are deleted. `HelpPopover` renders per field from `meta.helpText` + `meta.helpLinks`
  - `src/api/admin/settings.ts` gains a `SettingMeta` type and a `meta` field on the settings response. Its 13 fields are exactly what the server emits: `label`, `helpText`, `helpLinks`, `tier` (`standard`|`advanced`), `group`, `enum`, `enumLabels`, `optionHelp`, `minimum`, `maximum`, `default`, `secret`, `restart`
  - `PluginConfigPage.vue` now renders the plugin field-help overlay's link via `HelpText`, from the descriptor's `link` / `link_text` fields
  - KNOWN ISSUES in this release, fixed in the next one: the `json` control type was missing, the restart banner was derived from unsaved edits rather than from what was saved, there was no fallback when a server sends no `meta`, `optionHelp` was never rendered, and the touched test files were not updated (the suite shipped red). See the Unreleased section.
- feat(invite): new `AcceptInvitePage.vue` — the PUBLIC invite-acceptance surface reached at `/app/invite/:token`. Consumed by the hub (which redirects its public `GET /invite/{token}` link here) to restore the invite-accept flow the retired Smarty `accept-invite.tpl` provided: unauthenticated visitors get Log In / Sign Up buttons that carry a safe `?redirect` hop back to the invite; authenticated visitors get an **Accept Invite** button that calls `POST /api/v1/me/invite-links/{token}/redeem` and, on success, a **View Shared Libraries** link to `/app/shared-with-me`. Route is `meta.public` so the auth guard lets unauthenticated invitees through.
- feat(auth): new `safeRedirect(value)` util (`src/utils/safeRedirect.ts`) — an open-redirect guard that only honours same-origin `?redirect=` values under the SPA root `/app/` (rejecting absolute URLs, protocol-relative `//host`, and `/\host` backslash tricks). `LoginForm`/`SignupForm` now honour a validated internal `?redirect` so a post-login/signup hop returns the user to where they started (e.g. the invite page).
- feat(settings): new **Security** tab in `SettingsPage.vue` surfacing WebAuthn/passkey management (register/list/remove passkeys), replacing the standalone Smarty `settings/security` page.
- fix(reader): fix a crash-on-mount in `BookDetailPage`, `BookReaderPage`, `AudiobookDetailPage`, and `AudiobookPlayerPage` — `usePageTitle()` was called before the reactive title ref was declared, tripping a temporal-dead-zone `ReferenceError` on mount. These pages now mount cleanly (they are the media surfaces the server now registers under `/app`).
- test(pages): add Vitest specs covering the previously-untested SPA pages now reachable under `/app` — `AcceptInvitePage`, `safeRedirect`, and the Books/Audiobooks/Photo/Search/Music sub-pages plus the Settings Security tab (~15 new specs).
- chore(cleanup): remove the dead `src/api/music.ts` module (zero importers; `fetchArtists`/`fetchAlbumsByArtist`/`fetchTracksByAlbum` were superseded by the `ApiClient` music methods). Never bundled, so no `dist/` rebuild — internal source cleanup only.


## v0.82.0 (2026-07-18)

### Changes
- feat(admin/logs): overhaul the log renderer — emit separate **channel** and **level** badges (the full Monolog/PSR-3 level set mapped onto five colour tones), no more duplicated level text
- feat(admin/logs): show timestamps in the viewer's **local time** as `h:mm:ss.<micros>AM/PM` (12-hour), splicing sub-second precision back from the raw ISO (JS `Date` truncates to ms) and dropping the date when the entry is from today
- feat(admin/logs): strip the `-YYYY-MM-DD.log` rotation suffix from filenames (accepts both the Monolog hyphen separator and the legacy dot separator)
- feat(admin/logs): **cross-file line combine** now fires — the parser populates source/timestamp/message so identical lines across multiple files merge into a single row with a comma-joined source list
- fix(admin/logs): defensively strip a redundant legacy inline `[LEVEL] datetime ` prefix from message bodies
- fix(admin/logs): fix message **double-escape** (`highlightJson` already escapes `& < >`, so the message is no longer escaped twice) and HTML-escape the channel/source fragments before `v-html` (the XSS boundary for raw log content)
- test(player): refresh stale QualityMenu/quality/shortcuts specs left behind by earlier feature commits (closest-level-≥-source contract, the q/Q quality shortcut, and the variant-id emit); only a stale docstring changes in product code


## v0.81.0 (2026-07-18)

### Changes
- feat(detail): "Play Trailer" button with in-app YouTube embed modal (validated key/URL)
- feat(detail): title-logo hero overlay (falls back to text title; handles local PNG or remote SVG)
- feat(admin/profiles): content-rating cap picker expanded with TV ratings (0–12 age scale)
- feat(admin/libraries): expose Recheck-all-metadata / Prune / Clear-metadata / Clear-artwork / Delete-all ops (destructive ops confirm-gated)
- feat(admin/libraries): greatly expanded help text documenting each operation and when to use it


## v0.80.9 (2026-07-17)

### Changes
- fix(ui): syncplay API and Select component updates


## v0.80.8 (2026-07-14)

### Changes
- feat(player): Q-key quality shortcut, direct-stream badge, Select.toggleMenu()


## v0.80.7 (2026-07-14)

### Changes
- fix(NetworkHealthIndicator): treat relay disconnect as degraded, not offline
- fix(admin/logs): inline level badge + proper deduplication of repeated log lines


## v0.80.6 (2026-07-14)

### Changes
- fix(parseVariants): handle LadderResult.toArray() format
- fix(logs): deduplicate repeated log entries
- fix(admin/logs): inline level badge instead of badge + text


## v0.80.5 (2026-07-14)

### Changes
- fix(player): show quality dropdown when hls.js has limited levels
- feat(admin/logs): add log level badges, JSON highlighting, and filename cleanup


## v0.80.4 (2026-07-14)

### Fixes
- fix(player): make thumbs up/down buttons visible like other player buttons
- fix(player): show quality dropdown when variants are available


## v0.80.3 (2026-07-14)

### Fixes
- fix(player): properly select Original variant playlist instead of falling back to ladder rung


## v0.80.2 (2026-07-14)

### Fixes
- fix(player): select closest quality >= source height instead of flooring


# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.80.1] - 2026-07-14

### Added

- **Music playback in the web player — client-side crossfade + gapless (UI-3.6)** — the music library page now actually plays tracks. `useMusicPlayer` drives two alternating `<audio>` elements whose source is each track's server-minted **signed** `stream_url` (`/media/:id/stream?exp&sig`), so no `Authorization` header is needed and the byte stream is served with native HTTP Range. **Crossfade** (an overlap-fade between the two elements) and **gapless** (pre-buffering the next track onto the idle element) are performed entirely client-side and honour the user's **Settings → Playback** crossfade-duration / gapless preferences live — no server-side DSP. A now-playing transport bar (previous / play-pause / next / seek slider / elapsed-time, plus loading and stream-error states) is shown while a track plays. Tracks reached via the album fast-path (which carry no `stream_url`) resolve one lazily through `getTrack(id)`. `ApiClient` gains `getTrack(id)` and a `stream_url → streamUrl` normalizer.
- **Test credentials button and redirect URL display** — adds a test credentials button and redirect URL display functionality.

### Changed

- **Player surface split further; MediaDetail/FilterBar/MetadataMatchModal deferred (UI-3.1)** — the `Player` surface is served from the secondary `@phlix/ui/player` entry, and `MediaDetail`, `FilterBar`, and `MetadataMatchModal` are now `defineAsyncComponent` factories rather than static re-exports, removing ~56 KB from the eager boot graph (neither production consumer imports these three directly, so the async wrap is safe). Guarded by a fresh-build import-closure assertion. **Note:** reaches consumers only after a release-time `dist/` rebuild (see [Notes](#notes)).
- **Shared stale-while-revalidate media-item cache (UI-2.1)** — a new module-level singleton cache (`useMediaItemCache`, 60 s TTL) is shared by the media-detail and player pages, so `browse → detail → player → back` reuses a cached item and mounts instantly with no `GET /media/:id` round trip; a stale entry refreshes in the background and a failed refresh serves the stale copy. A hard access block (403/429 access-schedule / stream-limit) always takes precedence and is never masked by the cache. (Previously the "cache" was declared inside `<script setup>`, so it was recreated per mount and cached nothing.)
- **Responsive posters end-to-end (UI-3.5)** — poster images now emit a `srcset`/`sizes` derived from the server's `poster_srcset` field, so the browser downloads a poster sized for the card/viewport (and device pixel ratio) instead of one fixed-width image. Falls back to the single `poster_url` on servers that don't provide `poster_srcset`.
- **SyncPlay drift auto-correction in the web player (UI-3.7)** — during a SyncPlay session the player continuously computes its drift from the host's extrapolated position (`local − (hostPosition + elapsed × rate)`) and, when it exceeds the 2 s threshold, seeks to the host position; play/pause always follow the host. Small drifts within the threshold are left alone to avoid needless seeks.
- **Card ⋯-menu action backends wired for real (UI-3.8)** — the poster/detail ⋯-menu actions now do real work instead of only acknowledging the click: *Add to playlist* (prompt → `createPlaylist`), *Download* (opens the signed download URL), *Shuffle* (`shufflePlay`), and *View missing episodes* (reads the server's `{ total_expected, total_existing, missing_episodes }` envelope and reports the correct count — previously it read `.length` off the envelope object and toasted "undefined episodes missing"), plus host emits for *Edit metadata* and *Explore item data*.
- **Favorite toggles patch state locally instead of refetching (UI-2.4)** — toggling a favorite updates the in-memory store and the Browse "Favorites" rail in place rather than refetching the whole favorites list.
- **Episode-aware Up Next (UI-0.7)** — when an episode is playing, the Up Next queue is built from the series' remaining episodes in playback order using the already-loaded episode cache (no extra fetch); movies fall back to a genre-based queue.
- **Trickplay prefetch deferred off the mount critical path (UI-0.5)** — the scrubber's sprite-sheet prefetch is scheduled on a macrotask after mount / media change (cancelled on unmount, superseded on media change), so a user's first network call after opening the player is the favorite/rating write rather than the non-critical trickplay GET. Sprites still load promptly.
- **`NetworkHealthIndicator` gated to admins + tab visibility (UI-0.8)** — the network-health poller only mounts for admins and pauses while the tab is hidden, resuming (and re-arming the live timer at the current backoff cadence) when it returns to the foreground; the mini-player only mounts when logged in.
- **Watched-state toggles verified via `markWatched`/`markUnwatched` (UI-3.9)** — the card/detail/menu watched control persists through `markWatched`/`markUnwatched` with an optimistic update and rollback-on-error, independent of the favorite axis.
- **MediaGrid scroll performance (UI-2.5)** — replaces `getBoundingClientRect()` per scroll tick with cached `window.scrollY`; `menuItems` lazily computed on menu open; ResizeObserver invalidates cached `sizerTop`; window cache prevents redundant array re-slicing.
- **Composited hover/skeleton animations on compositor thread (UI-2.6)** — card shadow hover now uses `opacity` on pseudo-element (compositor-only); skeleton shimmer uses `transform: translateX()` on pseudo-elements; `animation-play-state: paused` available when many skeletons visible.
- **Debounced preferences persistence (UI-2.7)** — localStorage writes from the deep-watch preferences persist are now debounced at 250ms trailing edge; `pagehide` event triggers immediate flush so no writes are lost on tab close.
- **Optimistic auth guard (UI-3.2)** — non-admin routes resolve immediately on token presence (no blocking `/auth/me` round trip); `auth.init()` runs fire-and-forget in background; admin routes still strictly await validation.
- **Single aggregated `style.css` retained — admin CSS-split experiment reverted (UI-3.3)** — an earlier attempt to split admin styles into a separate `admin.css` chunk (via `cssCodeSplit: true`) was reverted. Both production consumers (`phlix-server/web-ui`, `phlix-hub/web-ui`) bundle the prebuilt `dist/` and import only `@phlix/ui/style.css`, so the split orphaned ~248 KB of CSS into chunks nothing loads — shipping the entire app (browse, cards, player, login, admin) **unstyled**. `dist/style.css` is once again a single aggregated bundle (~283 KB) containing every component's styles; a new `dist-css-bundle` build-output test guards against re-introducing the split. Also fixed the player-entry build wiping the main entry (`emptyOutDir: false` on `vite.player.config.ts`).
- **apexcharts dedupe (UI-3.4)** — the admin `MetricsPage` now imports the browser-only `vue3-apexcharts/core` wrapper plus `import 'apexcharts/line'` (which registers the `area`/`line` chart types the page draws) instead of the full `vue3-apexcharts`, which bundled a redundant 626 KB server-side-rendering copy of apexcharts. apexcharts was also removed from Vite's `external` list, so it is now **bundled inside `dist/`** and consumers no longer need to provide their own copy. Net result: one self-contained ~458 KB apexcharts browser chunk (was a 626 KB SSR copy *plus* an externalized second copy), loaded lazily only on the admin metrics route. Guarded by a `dist-apex-dedupe` build test and a chart-type-registration regression test. **Note:** the source change reaches consumers only after a release-time `dist/` rebuild (see [Notes](#notes)).

- **Continue Watching driven by full MediaItem payloads from server (UI-2.3)** — `useResumeSync` now stores complete `MediaItem` objects from `GET /users/me/continue-watching` in `syncedItems`, replacing the previous rail-only summary. A `continueWatchingItems` getter exposes them for `BrowsePage`. A `visibilitychange` handler re-syncs with a 100ms debounce so the rail stays fresh when the tab returns to the foreground. `BrowsePage` consumes `continueWatchingItems` directly, eliminating the separate rail data-fetch step.

- **Media store cache LRU-capped at 100 entries (UI-2.2)** — `CACHE_MAX = 100` constant added; `networkFetch()` now evicts the least-recently-used entry when the cache exceeds the cap, preventing unbounded memory growth during extended browsing sessions.

- **Mini-player HLS support (UI-1.8)** — `hlsMasterUrl` added to `usePlayerStore` as a persisted ref, populated by `useHlsTranscode` after successful HLS attach and cleared in `closePlayer()`. `MiniPlayer.vue` now calls `attachHls(videoRef, player.hlsMasterUrl, ...)` when `hlsMasterUrl` is set, enabling transcoded sessions to play in the mini-player; direct-play sessions fall back to the raw `<video :src>` path.

- **Fade timer ownership prevents premature garbage collection (UI-1.7)** — `fadeTimer` is stored at module/component scope rather than as a local variable, ensuring it cannot be garbage collected mid-fade. `onBeforeUnmount` clears the timer if the component unmounts while a fade is in progress. `fadeOutAndPause` clears any existing timer before starting a new one, making it idempotent and preventing duplicate timer accumulation.

- **`timeupdate` no longer drives position state or resume eviction (UI-1.6)** — `setPositionState` is removed from the `timeupdate` handler and is now only called on genuine state-change events (`seeked`, `ratechange`, `durationchange`, `play`, `pause`). `saveResume` now calls `evictToCapacity` only when the media id is new to the resume map, not on every position update — eliminating continuous eviction scans during playback.

- **AbortSignal + 60s timeout for transcode start/poll (UI-1.5)** — `start()` now creates an `AbortController` whose signal is threaded through to both the `post()` call (transcode start) and the `get()` call (poll). `cleanup()` aborts the controller and nulls it, cancelling any in-flight transcode initiation. The transcode client is constructed with `timeoutMs: 60000` (60 seconds, up from 15 seconds) to accommodate slower encodes. `api/client.ts` threads the signal through to the fetch layer so the entire start/poll cycle is abortable end-to-end.

- **Skip hls.js download on native-HLS-only browsers (UI-1.4)** — `attachHls()` now checks for native HLS support and the absence of MSE before triggering the `import('hls.js')` dynamic import. On Safari/iOS where `MediaSource === 'undefined'` but `isNativeHlsSupported(video)` is true, the function returns the native HLS handle immediately — skipping the 641 KB hls.js chunk download entirely.

- **MediaCapabilities codec probing before direct play (UI-1.3)** — the player now probes the browser's codec support *before* deciding whether to direct-play or transcode, preventing "Can't play this file here" errors on unsupported codecs (AC-3/E-AC-3/DTS/HEVC). New `canDecodeAudioCodec(audioCodec, containerMime)` uses `mediaCapabilities.decodingInfo()` with `canPlayType` fallback; `canDecodeHevcInMp4()` probes HEVC-in-MP4 support the same way. `needsTranscodeWithCapabilities(sources, playbackAudioTracks)` combines the extension-based check with this codec probing. `Player.vue` gains an `evaluateTranscodeWithCapabilities()` async watch that flips `transcodeNeeded` the moment an unsupported codec is detected. A new `AUDIO_CODEC_MAP` constant maps server codec names to RFC 6381 codec strings, and `buildAudioCodecString()` composes the full MIME type string passed to the browser. Direct-play on Safari/iOS (which uses `<video>` natively) is unaffected since those browsers don't surface `mediaCapabilities`.

- **hls.js buffer tuning + bandwidth-estimate persistence (UI-1.2)** — `backBufferLength: 90` and `maxBufferLength: 60` added to the hls.js config for improved buffer health on long sessions. Bandwidth estimate is now persisted to `localStorage` with a `clampBandwidth` guard (100 Kbps–100 Mbps) so ABR resumes at the user's actual throughput after a reload. `abrEwmaDefaultEstimate` is seeded from the persisted value on init. Persistence runs every 30 s and on `destroy`. `useHlsTranscode` gains a non-flushing `setNextLevel(level)` for pre-buffering a quality switch that takes effect on the next fragment without clearing the current buffer. `Player.vue`'s pref-seeded quality pin (the `defaultQuality` setting applied on first load) now calls `setNextLevel` instead of `setLevel` to avoid an unnecessary buffer flush when the player is still loading the initial track.

- **PlayerPage: parallelize item + playback-info fetch (UI-0.4)** — `GET /media/:id` and `GET /media/:id/playback-info` now fire concurrently; `loading` clears immediately after the item resolves so the player mounts after one round trip rather than two serial ones. Markers and tracks populate reactively when playback-info arrives (Player.vue:692-698 already handles late `serverSubtitleTracks` via a watch). Playback-info is fire-and-forget: errors degrade to empty markers with no user-visible error.

- **Scrubber: seek fires once on release, not during drag (UI-0.3)** — `onPointerDown` and `onPointerMove` no longer emit `seek`; only `endDrag` emits exactly one seek with the final drag position. This removes the per-pointermove seek storm at the source before the server (SV-4.2) and hub (HB-4.9) implement the scrub→encode→cancel chain backend. Preview (time bubble / thumbnail) still updates live from `dragRatio` via compositor-only `scaleX` transforms.

- **MediaCard poster uses `<RouterLink custom>` for SPA navigation (UI-0.2)** — the poster's stretched link is now `<RouterLink :to="href" custom v-slot="{ navigate }">` wrapping a raw `<a :href>`. Left-click navigates via the Vue router (~100ms SPA transition) instead of causing a full-page reload; middle-click, right-click "Open in new tab", and copy-link still work because the raw `href` is preserved on the inner anchor. Falls back to a plain `<a :href>` when no router is injected (standalone mounts).

### Fixed

- **Resume position preserved on a direct→HLS fallback (UI-1.1)** — when a direct-play `<video>` fails (an unsupported-codec decode error, or an audio-track language switch) and the player falls back to an on-demand HLS transcode, playback now resumes at the current position instead of restarting at 0:00. The captured `currentTime` is threaded through `useHlsTranscode.start()` into the hls.js `startPosition` (MSE path) or `video.currentTime` (native-HLS path).
- **Similar-by-marker search reaches the relay proxy on hub playback (UI-0.6)** — the player's marker / "more like this" search used the global page-origin API client instead of the injected `apiBase`, so on hub-proxied playback it hit the hub origin and 404'd. It now routes through a memoized per-`apiBase` client (rebuilt when `apiBase` changes), and the in-flight search is aborted when the modal closes. Trickplay fetches were similarly threaded through `apiBase` + an `AbortSignal`.
- **LibraryPage `onMarkWatched` no longer corrupts favorite state** — the handler was incorrectly calling `toggleFavorite` and branching on `isFavorite`, which had no connection to the watched axis that the card/menu already persisted before firing `mark-watched`. It now matches the `BrowsePage`/`MediaDetailPage` pattern: reads `isWatched` and reports the resulting state via toast only. (UI-0.1)

### Notes

- **Release-time `dist/` rebuild owed for UI-3.1, UI-3.4, and UI-3.6.** These three steps change source only; per repo convention the prebuilt `dist/` is rebuilt and committed at tag time, so consumers receive the Player/MediaDetail deferral (UI-3.1), the apexcharts dedupe (UI-3.4), and the music-playback wiring (UI-3.6) only after the next `npm run build` (both Vite entries) + `dist/` commit. The other Unreleased UI changes are already in the committed `dist/` (rebuilt during the UI-3.3 fix).
- **`src/api/music.ts` is dead code** — superseded by the `ApiClient` music methods and pointing at non-existent nested routes (`/artists/{id}/albums`, `/albums/{id}/tracks`); it is retained pending a separate removal cleanup.

## [Unreleased]

## [0.79.0] - 2026-07-10

### Added
- **Admin → Plugins: enable/disable/update/uninstall failures now show a persistent banner** carrying the server's real reason (e.g. "OMDb API key not configured", a plugin `onEnable()` error, or an unresolvable entry class), not just a fleeting toast — so a plugin that refuses to enable tells you *why*.
- **Configure form: secret fields now show whether a value is stored.** Secret inputs start EMPTY (the value/mask is never prefilled or echoed back); a status line shows "Currently set (N characters)" with a length-appropriate row of dots, or "Not set." Leaving the box blank keeps the stored secret; typing replaces it. This removes the old `***` ambiguity where a set and an unset secret looked identical and you couldn't tell a save had taken.
- **Configure form: richer field help.** Each field renders a "where to get this value" link (`↗`), a `Default: …` hint, and an "optional" marker (alongside the existing `*` for required), sourced from the manifest schema and the server's field-help overlay.

### Changed
- The plugin settings API type (`PluginSettingDescriptor`) gains optional `link`/`link_text`; `PluginDetail` gains `secret_status` (`{ key: { set, length } }`), passed through by `AdminPluginsApi.get()`.

## [0.76.3] - 2026-07-10

Release: phlix-ui v0.76.3

## [0.74.0] - 2026-07-07

Headline: **manual stream-quality selection in the player.** This release lands the
`@phlix/ui` side of the multi-track Stream Quality/ABR program (server Track A shipped the
multi-variant HLS pipeline): a new consumer-facing quality menu that reads the live hls.js
level ladder and lets the viewer pin a rung or hand the choice back to ABR. E1/E2 added the
internal `HlsHandle`/`useHlsTranscode` level API, E3 wired it into the player control bar and
made it user-visible, and E4 refreshed the player visual baselines and added the `quality-menu`
a11y surface. Also folds in a `Select` combobox-role a11y fix (found via E4) and the
separately-landed media-detail company/genre chip a11y fixes.

### Added

- **`attachHls`'s returned `HlsHandle` gains an hls.js level/ABR API (Stream Quality/ABR step E1) — internal groundwork only; no UI wiring yet.** This is the first `@phlix/ui` step of the multi-track Stream Quality/ABR program (server Track A shipped the multi-variant HLS pipeline in A1–A7); it lands the primitive the player will build a quality menu on top of in later steps, but nothing user-visible changes here.
  - **`levels: HlsLevel[]`** — a live getter over `hls.levels`, mapped to the new `HlsLevel` shape (`{index, height, width, bitrate, name}`), highest-first as the master playlist lists them. It's empty until hls.js's `MANIFEST_PARSED` fires (asynchronous, after `attachHls` resolves) — callers read it again from `onReady` or an `onLevelSwitched` callback to get the populated ladder.
  - **`getCurrentLevel()` / `setCurrentLevel(index)`** — read/pin the active level by index (`-1` = Auto/ABR); setting it assigns `hls.currentLevel`, which flushes the buffer for an immediate switch.
  - **`setNextLevel(index)`** — assigns `hls.nextLevel` for a switch that takes effect on the next fragment without a buffer flush, for a smoother (if less immediate) quality change.
  - **`autoLevelEnabled: boolean`** and **`bandwidthEstimate: number`** — live getters mirroring hls.js's ABR state and rolling bandwidth estimate (bits/sec).
  - **`onLevelSwitched(callback): () => void`** — subscribes to `Hls.Events.LEVEL_SWITCHED`; returns an unsubscribe function.
  - New `HlsLevel` type, barrel-exported alongside `HlsHandle`/`AttachHlsOptions` from the package root.
  - **Native-HLS (Safari/iOS) path degrades gracefully, never throws**: `levels: []`, `getCurrentLevel()` → `-1`, `setCurrentLevel`/`setNextLevel` are no-ops, `autoLevelEnabled` is always `true`, `bandwidthEstimate` is `0`, `onLevelSwitched` is a no-op subscribe/unsubscribe — the browser owns ABR there and exposes no level API, so callers can use the same `HlsHandle` shape unconditionally regardless of playback path.
  - `destroy()`, `renderTextTracksNatively: false`, the tuned `fragLoadPolicy` (30s TTFB), and the `xhrSetup` bearer-token injection are all unchanged — this step is purely additive on top of the existing transcode-playback fixes.
  - **Not yet wired to any UI** — `QualityMenu`/`PlayerPage` don't consume this API yet; that lands in later steps of the same program (menu UI, then the release that makes manual quality selection user-visible).

- **`useHlsTranscode` exposes the E1 level/ABR API as reactive state (Stream Quality/ABR step E2)** — internal groundwork only; still no UI wiring. The transcode-to-play composable now lifts `HlsHandle`'s level getters into refs the player will bind a quality menu to:
  - **`levels: Ref<HlsLevel[]>`** and **`currentLevel: Ref<number>`** (`-1` = Auto) mirror the attached `HlsHandle`, refreshed on `MANIFEST_PARSED` (via `attach`'s `onReady`) and on every `Hls.Events.LEVEL_SWITCHED`.
  - **`autoEnabled: Ref<boolean>`** is the reliable "is Auto" signal — prefer it over `currentLevel` right after calling `setLevel('auto')`, since `currentLevel` can briefly lag until the switch settles (matches real hls.js semantics).
  - **`activeLevelHeight: Ref<number | null>`** — the height of whichever level is actually playing, for an "Auto (→720p)"-style label; `null` when unknown (native-HLS path, or before the first switch settles).
  - **`setLevel(level: number | 'auto')`** — pins a rung for an immediate (buffer-flushing) switch, or hands the choice back to ABR; a safe no-op before a stream is attached or on the native-HLS path.
  - The rest of the composable's return shape (`state`, `progress`, `subtitleTracks`, `start`, `cleanup`, `reset`) is unchanged.

- **Manual stream-quality selection in the player (Stream Quality/ABR step E3) — the feature is now user-visible.** Building on E1/E2's internal plumbing, the control bar's quality menu is wired to the live hls.js ladder and actually switches the playing stream:
  - **`QualityMenu`** now renders `Auto` (labelled live, e.g. "Auto (720p)", to reflect whatever height ABR is currently playing) plus one discrete rung per distinct resolution the current stream offers, highest-first. It only appears once there's a real choice (≥2 rungs); a single-quality stream or the native-HLS/Safari path (where the browser owns ABR and exposes no level list) hides it entirely rather than showing a broken control.
  - Picking a rung pins that hls.js level for an immediate switch; picking `Auto` hands the choice back to ABR. The choice persists as a stable resolution id (`'auto'` / `'240p'`…`'2160p'`) to `defaultQuality` in Settings, so it survives a reload and applies again — once the new stream's ladder is known — the next time you play something.
  - New `src/components/player/quality.ts` supplies the pure mapping between hls.js levels and these stable rung ids; the id vocabulary mirrors `@phlix/contracts`' `RenditionId` rungs (that package isn't a dependency yet — still untagged — but the ids are forward-compatible) so a value written today keeps meaning the same thing later. Resolution-to-rung mapping is floor-based, not nearest-snap: an off-standard encode height never gets rounded up to a rung it doesn't actually meet.
  - **Fixed:** Settings' "Default quality" control previously saved 4K as `'4k'`, which never matched the menu's `'2160p'` rung id, so a 4K default silently never took effect in either direction; it now saves `'2160p'` and the dropdown also gained `'1440p'`/`'360p'`/`'240p'` options to match the full rung set.

- **Player visual baselines regenerated + `QualityMenu` a11y coverage added (Stream Quality/ABR step E4).** The committed `player-{daylight,midnight,nocturne}` Playwright screenshots predated the E1–E3 control-bar changes (SpeedMenu/captions/like-dislike/volume/PiP/fullscreen reflow); all six are refreshed to match the current chrome. Because the menu only renders with ≥2 real hls.js levels — which the offline direct-play `Player` harness can never produce — a new dedicated **`quality-menu`** visual + axe surface (`src/dev/visual/QualityMenuHarness.vue`, dev-only, not shipped) mounts `QualityMenu` on its own with a deterministic 4-rung ladder and the listbox forced open, so the fully-expanded menu is captured (and axe-scanned) across all 3 themes × desktop/mobile. `QualityMenu.vue` also gains 6 new vitest a11y tests covering its combobox trigger, listbox/option roles, `aria-selected`, and keyboard operability (Arrow/Enter/Escape).

### Fixed

- **`Select`'s trigger is missing `role="combobox"`, tripping axe's `aria-allowed-attr` (critical) whenever it's open** — found while building E4's `quality-menu` a11y surface (the first surface to axe-scan an *open* `Select`; every other surface only ever scanned it closed). The trigger button sets `aria-activedescendant`/`aria-controls` when open, both of which are only valid ARIA attributes on a combobox-role element, not on a plain (implicit) `button` role. `Select` — the shared primitive behind `SpeedMenu`, `QualityMenu`, sort/filter dropdowns, and every other app dropdown — now sets `role="combobox"` on the trigger (the WAI-ARIA APG "select-only combobox" pattern), an AT-only attribute with zero visual/behavioral change; the closed-state render and every other axe-clean surface are unaffected.

- **`MediaDetail`'s genre and studio (company) chips no longer nest a button inside a button** — the genre filter and the "Studios" list each rendered a `<button>` wrapping a `<Chip>`, which itself renders an internal `<button>`, an interactive-inside-interactive that axe flags as `nested-interactive` (serious, WCAG 2.0/2.1 A). Both now use `Chip` directly as the single interactive control, forwarding the "Show {genre}/{company} titles" label via a new `Chip` `ariaLabel` prop, and drop the redundant wrapper CSS. The media-detail visual/a11y harness previously never rendered the studios section (its `HERO` mock had no `production_companies`); the mock now includes two companies (one with an offline SVG logo, one text-only) so the a11y suite exercises that section. (Landed on master separately from E1–E4 but released here.)

## [0.73.1] - 2026-07-07

### Fixed

- **Seeking a transcoded video no longer intermittently fails with "Can't play this file here"** — Phlix serves on-demand HLS by transcoding each segment on request and sending the first byte only once the whole segment is encoded, so a fragment's time-to-first-byte equals its encode time. hls.js's stock 10s first-byte budget abandoned any segment that was merely slow under load and re-requested it, which (combined with the server having no per-segment dedup/cap) piled on duplicate encodes and cascaded into the fatal "We couldn't prepare a playable version" overlay. `attachHls` now sets a `fragLoadPolicy` with a generous 30s first-byte budget so a legitimately slow encode completes instead of being abandoned; retry counts match hls.js defaults and a consumer can still override the whole policy via `hlsConfig`. (Paired with the server-side segment dedup + concurrency cap in phlix-server.)

## [0.73.0] - 2026-07-06

### Fixed

- **Admin pages stop polling in background tabs** — MetricsPage, DashboardPage, LibrariesPage, and LogsPage now listen for the Page Visibility API and pause their `setInterval` refresh timers while the tab is hidden, resuming them (from a clean state, no double-firing) when it becomes visible again. Previously all four kept polling their endpoints every few seconds indefinitely, even when the tab was backgrounded, wasting client CPU/bandwidth and server load.
- **MediaGrid scroll handler no longer drops the final scroll position** — the scroll listener is now throttled to at most one `measure()` per ~16ms instead of running on every `scroll` event (which can fire hundreds of times per second and call `getBoundingClientRect()` each time). The throttle also schedules a trailing-edge measurement so the last scroll position inside a throttle window is still captured — a naive leading-edge-only throttle would silently swallow that final event and could leave the virtualized window frozen at a stale position once scrolling stops.
- **`availableGenres` guards against an empty/undefined item list** in `useMediaStore`, avoiding an unnecessary `Set` build when there's nothing to derive genres from.

### Notes

- This release also merges the phase-9 documentation update (README "Async Patterns" section) from master.

### Fixed

- **Subtitles that start enabled now actually render** (the real fix; supersedes the v0.71.0 attempt) — on the transcode path, hls.js drives the `<video>` and, with native text-track rendering left on (its default), its subtitle-track controller reacts to every `textTracks` change and _disables_ any subtitle track it doesn't own. Our WebVTT subtitles are external `<track>` sidecars owned by `CaptionOverlay`, so the instant we put one in `mode='hidden'` hls.js flipped it back to `disabled` (no active cues, no `cuechange`) and captions stayed blank until toggled off/on. `attachHls` now sets `renderTextTracksNatively: false`, so hls.js leaves `video.textTracks` alone and our overlay fully controls the sidecars.
- **Next-episode no longer starts partway in** — the `<video>` element is reused across episode navigation (the player has no per-item `:key`), and on the transcode path `videoSrc` stays undefined (hls.js drives the element via MSE), so the browser never reset `currentTime` between episodes — hls.js re-attached at the _previous_ episode's position (75% into one → the next started 75% in). The player now zeroes the element's `currentTime` when the media changes, so a new episode begins at the start (a genuine resume is still applied afterwards).

## [0.71.0] - 2026-07-06

### Fixed

- **Subtitles that start enabled now paint right away** — when a video opened with captions already on (a server-default subtitle track), the cues stayed blank until you toggled captions off and back on. The custom caption overlay reads the selected track's active cues synchronously the moment it's selected, but a server subtitle sidecar (WebVTT) loads its cues asynchronously — so that first read came back empty and the browser didn't reliably fire `cuechange` for the cue already active at load. The overlay now also re-reads once the `<track>` finishes loading, so the first cue appears without the manual toggle.

## [0.66.0] - 2026-07-01

### Fixed

- **Card & detail ⋯ menu now opens on click** — clicking the ⋯ (more actions) button on a poster/card or on a detail page did nothing. The trigger button used `@click.stop.prevent` with no handler; `.stop` swallowed the click before it reached the `Menu` wrapper's own toggle, so the menu never opened. The trigger is now bound to the `Menu`'s `toggle` (exposed via its default slot) and carries `aria-haspopup`/`aria-expanded`.
- **`Menu` dropdown positions at its trigger** — the list is teleported to `<body>` and is `position: fixed`, so its old `top: 100%` resolved to 100vh and rendered off-screen. `Menu` now measures the trigger rect and sets an explicit `top`/`left` (clamped to the viewport, flipping above the trigger when there's no room below), so the popup appears right at the button everywhere `Menu` is used.

## [0.65.0] - 2026-07-01

### Fixed

- **Jump rail reveals full labels on hover/focus** — rail entries were clipped to ~2 characters ("2026"→"20", "Drama"→"Dr"). Entries now fit short labels (letters, years, ratings) fully and reveal the complete label in a pill that slides out on hover/focus for longer ones (genres, runtime ranges).

### Added

- **Artist sort for music libraries** — a `music` library now defaults to sorting by artist (grouping tracks by artist) and the FilterBar shows an "Artist" sort option there; the jump rail becomes an A–Z artist index (paired with the server-side artist index/sort). Non-music libraries never keep the artist sort left over from a previously-viewed music library.

### Notes

- The year/rating/runtime/genre rails are driven by the server index; this release pairs with the server fix that makes those rails use the correct data (year = release year with ~25 sampled labels; rating/runtime no longer error).

## [0.64.0] - 2026-07-01

### Added

- **Expanded card/detail ⋯ menu** — the action menu now offers Add to playlist, Like, Dislike, Mark played/unplayed, Download, View missing episodes (series/season only), Shuffle, and (admin) Refresh metadata, Identify from beginning, Edit metadata, Edit images, Explore item data, Remove. Like/Dislike/Mark-played/Refresh/Edit-images/Remove are wired to existing backends; the remaining items are surfaced and acknowledge the click (backends pending).
- **Genre as a sort option** — the FilterBar sort adds "Genre"; the jump rail shows genre buckets when selected (requires the server genre index).
- **Episode rows show description + air date + runtime** — `SeriesSeasons` episode rows now render the first paragraph of the episode description (clamped, readable) plus an air-date · runtime meta line (new optional `air_date` field on the media item).

### Changed

- **Sort-aware jump rail actually updates on sort change** — `fetchIndexBuckets` was cached by `libraryId` only, so switching the sort (name → year → rating → runtime → genre) returned the previously-cached buckets and the rail never changed. The cache key now includes the field, order, and active filters.
- **Music libraries hide imdb/tmdb/tvdb metadata sources** — the per-library source-priority editor filters out the video-only providers for `music` libraries.
- **Wider admin logs** — the Logs and Audit Logs pages use the full available width (was a fixed 1100px), and log lines scroll horizontally instead of wrapping.

### Fixed

- **Removed the fake center "play" glyph from the dev/mock posters** so mock screenshots match production (real posters never drew one); the single hover Play button is unchanged.

## [0.63.0] - 2026-07-01

### Added

- **Watched (eye) toggle on cards + detail** — every `MediaCard` action row and the `MediaDetail` hero gain a watched control: an **open eye** when the item is watched, a **closed (slashed) eye** when not; clicking flips the per-user watched state. Backed by a new `watched` field in `useUserItemDataStore` (`isWatched` getter + `toggleWatched(id, apiBase)` — optimistic + rollback, calling `markWatched`/`markUnwatched`) seeded from the server `user_data.watched` block. The `⋯` menu's Mark watched/unwatched item now drives the same real state (previously it was aliased to *favorite*). Host `onMarkWatched` handlers now only toast the resulting state (mirroring `watchlist`).
- **Metadata-provider links on detail** — `MediaDetail` renders a **Links** section of outbound links (TMDB / IMDb / TheTVDB / AniDB / TVmaze / Trakt) built from a new detail-only `external_ids` map, opening each provider's page in a new tab (TMDB uses the movie vs. tv path by item type).

### Changed

- **Poster overlay actions are visible on every theme + never clip** — the card hover action row now uses fixed white icons with a drop-shadow (was `var(--text)`, invisible on the daylight theme over the dark overlay) and `flex-wrap` + non-shrinking controls, so Play / Rating / Favorite / Watched / Info / Menu / Match all stay legible and on-card instead of shrinking to slivers or clipping past the poster edge on narrow cards.
- **Series season cards reuse `MediaCard`** — the season grid on the series page renders the shared library card (new `hideActions` + `subtitle` props on `MediaCard`) instead of a bespoke smaller card, so seasons match the listings visually and track the card-size preference.
- **Cast/crew are poster-shaped card tiles** — `MediaDetail` credits render as 2:3 poster cards in a grid at the library card size (was small circular avatars).
- **Detail `⋯` menu button is icon-only** — dropped the opaque `surface-glass-strong` background/border that read as a white box on the daylight theme; it's now a transparent foreground glyph like the other ghost actions.
- **Bigger default poster cards** — the default `cardSize` preference is `200` (was `180`).

### Fixed

- **Episode rows open an episode detail page** — clicking an episode row in `SeriesSeasons` now navigates to that episode's detail/info page (a movie-style `MediaDetail`) via a new `open` event, instead of jumping straight into playback; the row's explicit play button still plays.

## [0.62.0] - 2026-07-01

### Added

- **Signed thumbs rating + restyled poster overlay (9-item build, item 1)** — new `ThumbRating.vue` replaces `LoveButton` with a signed thumbs up/down scale (−2..2: strongly-dislike / dislike / not-set / like / love; level 0 = both white wireframes, ±1 = one filled, ±2 = solid blue and slightly larger; click-again resets). `useMediaStore.setLike(id, level, apiBase)` + `client.setLikeLevel` send `{ level }` over −2..2. Poster overlay + play buttons are now transparent-bg / no-border with white wireframe icons (play icon amber). `ApiClient.handleResponse` is 204/205-safe so uninstall-style refreshes don't throw.
- **Reusable admin help callout (item 6)** — new `PageHint.vue` (props `title?`, `tone: info|accent`; exported from the ui barrel) renders a plain-English help callout, added to all 20 admin pages.
- **All-users watch history + clickable media (items 7, 8)** — `DashboardPage` Top-Media rows are now `RouterLink`s to `/app/media/:id`. The admin `HistoryPage` repoints from the current-user `recently-watched` endpoint to the new all-users `GET /api/v1/admin/watch-history`, gaining **user** and **time** columns with each title linking to the media detail (read-only oversight view). `AdminHistoryApi.getAllWatchHistory()` + `AdminWatchHistoryItem` added.
- **Per-library metadata-source priority (item 5)** — the source-priority editor moved out of the global Settings → Metadata tab into the per-library add/edit modal; seeded from `options.metadata_priority[type]` (falling back to the default source order) and persisted via the library create/update `metadata_priority` field.
- **Relay-aware My-Servers Browse (item 9)** — `MyServersPage` Browse is gated on `relayActive` (not just `status`), with a "Relay connecting" state when a server is online but its relay tunnel isn't connected. `BrowsePage` maps the hub proxy's relay 503 codes (`server.relay_unavailable` / `server.no_tunnel` / `server.offline`) to actionable messages; `useLibrariesStore` additively exposes `errorCode`.

### Added (earlier, unreleased)

- **Responsive avatar sizing (Feature 2)** — `.media-detail__avatar` is now `clamp(3.75rem,6vw,5rem)` (up from fixed `3.25rem`) and `.media-detail__person` is `clamp(5.5rem,8vw,7rem)`; initials font is bumped one step. Avatars remain circular with `object-fit:cover` and the change is gated behind `[data-reduced-motion]`.
- **Backdrop image layer on detail (Feature 4)** — `MediaDetail` now surfaces `backdrop_url?: string | null` (from `metadata.backdrop_url`) and renders a full-bleed blurred/darkened backdrop layer behind the detail hero with a gradient scrim. Falls back to poster ambient when `backdrop_url` is absent. All URLs pass through `safeUrl()`; the backdrop is `pointer-events:none`/`aria-hidden` and gated behind reduced-data/motion preferences.
- **Theme audio autoplay with preference toggle (Feature 5)** — series detail resolves a per-series `theme_audio_url?: string | null` (a signed URL pointing to a gated theme-stream route) via `ThemeMediaFinder`; the signed URL replaces the previous unsigned/ungated path. `usePreferencesStore` gains a `seriesThemeAutoplay` toggle (default `false`) persisted to settings; the series detail hero mounts a `<audio>` element that plays the theme only when autoplay is enabled, respects `prefers-reduced-motion`, and tears down cleanly on unmount/route-change.
- **Files section for admin users (Feature 6)** — `MediaDetail` now surfaces a `files` block (`[{path?, filename, container?, size_bytes?, codec?, resolution?}]`) on the detail response. Admin users see full `path` + `size_bytes`; non-admin users see only `filename`, `container`, `codec`, and `resolution` with `path`/`size_bytes` redacted to `null`. The `SeriesDetail` hero delegates to `MediaDetail` so both series and movie detail pages gain the section; `SeriesSeasons` shows minimal container/resolution inline for episodes. No `stat()` is performed for non-admin requests.
- **Immediate series/season Play (Feature 9)** — series/season Play now resolves to the first playable episode (respecting resume-in-progress and the playback-order sequence), instead of navigating to the series/season container. Added `useResolvePlayable` composable (`resolvePlayable`/`pickPlayableEpisode`) and wired it into BrowsePage, LibraryPage, and MediaDetailPage. Movie/episode/audio/image Play is unchanged (no fetch, returns item directly). A stale-guard pattern (AbortController per call) ensures a rapid second Play supersedes an in-flight resolve.
- **Menu dropdown primitive (Feature 11.1)** — new `Menu.vue` reusable accessible dropdown: teleport-to-body, viewport-flip, roving tabindex keyboard nav (ArrowUp/Down/Home/End/Enter/Space/Tab), full ARIA menu semantics, reduced-motion safe. Exported as `Menu` and `MenuItem` from `src/components/ui`.
- **Media item action menu (Features 11.2–11.5)** — `buildMediaItemMenu(item, ctx)` pure function produces `MenuItem[]` with "Mark watched/unwatched" (always), "Refresh/Match…" / "Choose poster…" / "Remove" (admin only, gated by server capability flags). Wired into `MediaCard` and `MediaDetail` action rows via the new `Menu` primitive; event forwarding chain built through `MediaRow`/`HomeRow`/`MediaGrid` into BrowsePage/LibraryPage/MediaDetailPage. `ApiClient` gains `markWatched`/`markUnwatched`/`deleteMediaItem`.
- **PosterPicker component (Feature 15)** — new poster picker dialog for choosing media item artwork. Integrated into the media item action menu and detail pages.

## [0.57.0] - 2026-06-30

### Added

- **Favorites wiring (Feature 17)** — end-to-end favorites support against the existing server backend. The detail-only `user_data` field (`{ favorite: boolean; rating: number | null; like_level?: number }`) is added to `MediaDetail`. `ApiClient` gains `addFavorite`/`removeFavorite`/`setRating`/`listFavorites` (mapped to `POST/DELETE /api/v1/media/{id}/favorite`, `PUT /api/v1/media/{id}/rating`, `GET /api/v1/users/me/favorites`) plus an exported `FavoritesResult`. A new Pinia store `useUserItemDataStore` holds a reactive per-item cache with an optimistic `toggleFavorite(id, apiBase)` (synchronous flip, rollback + error toast on failure), `hydrate(item)`, `isFavorite(id)`, and `reset()`. `MediaCard` now renders a wired favorite/bookmark quick-action (active/`aria-pressed` state, filled-amber when favorited) and establishes the canonical action-row order `[Play] [Love] [Favorite] [Info] [⋯] [Match]`. Browse and detail pages persist the toggle and hydrate `user_data` on load (the detail hero favorite button toggles + persists through the store), and a "Favorites" row appears on Browse immediately after Continue Watching, sourced from `listFavorites()` and hidden when empty.
- **Multi-level Love (Feature 10)** — a new `LoveButton.vue` 4-state control (cycles through love levels) bound to the `like_level` axis on `user_data`. `ApiClient` gains `setLikeLevel` and `useUserItemDataStore` gains `cycleLove`; `like_level` is carried and persisted on `user_data`. The Love button is rendered on both `MediaCard` and the media detail view, in the canonical action-row slot reserved in Feature 17.
- **Player favorite + Love controls (Feature 16)** — `Player.vue` integrates the favorite toggle and the `LoveButton`; the `MiniPlayer` dock gains a compact single favorite toggle bound to the current item; and `PlayerPage` hydrates `user_data` after fetching the item so the player controls pre-fill for favorited/loved items.

## [0.56.0] - 2026-06-30

### Added

- **Admin Duplicates page (Feature 1.7)** — new server-admin page (`admin-duplicates`, `/app/admin/duplicates`) that lists the duplicate series/movie groups the server's `DuplicateFinder` finds per library and merges each group's duplicates into its primary. Pick a library, review each group (canonical key + type, primary pre-selected as the keep target, duplicates individually checkable, child counts shown per row), and "Merge selected" calls the `AdminMergeController` apply endpoint then refreshes the list. Adds `AdminDuplicatesApi` (`src/api/admin/duplicates.ts`) wrapping `GET /api/v1/admin/libraries/{id}/duplicates` and `POST /api/v1/admin/media/merge`. _The `@phlix/ui` version bump + consumer re-pin/bundle rebuild are deferred to the W0.BUMP step._
- **Metadata source-priority editor (Feature 3.6)** — new `SourcePriorityEditor` component (`src/components/SourcePriorityEditor.vue`): a dependency-free, keyboard-accessible reorderable list (up/down/remove + add-from-available) for an ordered array of metadata-source names. Props `modelValue: string[]` + `available: string[]`; emits `update:modelValue` with the new order. Sources present in the order but absent from `available` still render (marked "unknown", never dropped). The admin `SettingsPage` "Metadata" tab now renders one editor per media type bound to the `metadata.provider_priority` setting, plus a `metadata.genres_mode` (first/union) select; the available source names come from the new `GET /api/v1/admin/metadata/sources` endpoint (`AdminMetadataSourcesApi`, fetched lazily on first Metadata-tab entry). Both keys persist through the existing settings PUT path. Adds `ProviderPriority`/`GenresMode` types to `server-settings.ts`. _The `@phlix/ui` version bump + consumer re-pin/bundle rebuild are deferred to the W0.BUMP step._

## [0.55.0] - 2026-06-29

### Fixed

- **TokenStore interface deduplicated** — single source of truth in `tokenStore.ts`; `client.ts` re-exports from there. Eliminates the duplicate `TokenStore` interface that existed in both files.
- **MediaItem split into MediaListItem + MediaDetail** — formalises the detail-only vs list-only field distinction with a `MediaDetail extends MediaListItem` hierarchy and an `isMediaDetail()` type guard. `MediaItem` retained as a back-compat alias for all consumers.
- **B3: single-flight token refresh** — `ApiClient.refreshToken()` now de-duplicates concurrent refresh calls; multiple 401s no longer trigger N refresh POSTs.
- **B1/Q2: `is_admin` normalised to boolean** — `AdminUsersApi.list()`/`get()` now normalise any wire value (0/1/"0"/"1"/true/false) to a strict boolean; UsersPage comparisons fixed.
- **B2/P2: bounded resume map** — `usePlayerStore` now evicts the least-recently-touched entries when the map exceeds 200 entries, with a quota-exceeded retry pass.
- **P1: reuse single ApiClient in useMediaStore** — `networkFetch()` now reuses a lazy client instead of allocating a new one per fetch; calls `setBaseUrl()` on API base change.
- **B4/P3: server-side genre facets with graceful fallback** — `loadFacets(apiBase)` fetches `GET /api/v1/media/facets`; `availableGenres` uses server facets when available, falls back to the derived set on 404/absent.

### Changed

- **S2/B7: scheme allow-list on Connect screen** — `withScheme()` now rejects non-http(s) schemes (javascript:, data:, file:) and fixes the `:port → http://` downgrade for public hosts; plaintext-public address shows a warning before token send.
- **S4/B5: logout() redirect respects configurable loginPath** — `ApiClient.logout()` now uses `this.loginPath` (default `/login`) instead of hard-coded `/login`, fixing hub 404 on logout.

### Security

- **S1/F1 token-store seam** — `InMemoryAccessTokenStore` introduced as a seam (access token in memory, refresh token from httpOnly cookie). `LocalStorageTokenStore` retained as default. This ships only the seam; the default flip is deferred until the server cookie contract lands.

_Post-release changes land here._

## [0.54.0] - 2026-06-27

### Added

- **First-run Connect screen for native clients** — a new public `connect` route
  (`ConnectPage.vue`) lets a native client with no baked-in server origin
  (Windows/Tizen/…) ask the user which Phlix server (or hub) to talk to, instead
  of silently defaulting to `localhost` and showing a login form that
  authenticates against nothing. The user enters an address; the page infers a
  scheme (LAN/IP/port → `http`, public host → `https`), probes the server's
  public `/health`, and on success persists the choice — with a non-blocking
  "Connect anyway" fallback for back ends that don't expose `/health`
  cross-origin.
- **`useConnectionStore`** — holds the runtime-chosen API base (persisted to
  `localStorage` under `phlix.connection.apiBase`), with `configure()` to notify
  the host shell, plus exported helpers `normalizeBase`, `withScheme`, and
  `probeServer`.
- **`PhlixAppConfig.requireConnection`** — when true, any route visited with no
  resolved base redirects to `connect` (and `auth.init()` is skipped until a base
  exists). **`PhlixAppConfig.onConnectionChange`** — callback fired when the
  chosen base is set/cleared, so a native shell can mirror it into its own
  durable store (e.g. the Electron client's `setServerUrl`).
- **`connectGuard`** — pure navigation guard for the connect-gate, unit-tested
  alongside `authGuard`.

### Changed

- **`apiBase` is now provided as a reactive `ComputedRef`** (the runtime
  connection if set, else the seeded config base) rather than a static string, so
  a native client's connection choice re-points every API consumer reactively.
  `useApiBase` and the admin pages already accept `string | ComputedRef`;
  `useAuthStore` now resolves the base via `useApiBase` and re-points its
  long-lived client in place via the new **`ApiClient.setBaseUrl()`**.

## [0.53.0] - 2026-06-26

### Added

- **`PhlixAppConfig.playerHlsConfig`** — per-app hls.js overrides
  (`Partial<HlsConfig>`) merged over phlix-ui's defaults, threaded through
  `Player.vue` → `useHlsTranscode` → `attachHls`. Lets a constrained TV
  consumer (Tizen) pass RAM-bounding buffer config (`maxBufferLength`,
  `backBufferLength`, `capLevelToPlayerSize`, …). The token-attaching
  `xhrSetup` is spread last and is NOT overridable, so auth can't be dropped.

### Changed

- **Transcode no longer hard-codes `?profile=web`.** `transcodeStartPath` /
  `useHlsTranscode.start` now take an OPTIONAL profile; when omitted the
  `?profile=` query is left off so the server maps the quality profile from the
  `X-Phlix-Device-Type` header (TV → `tv-4k`, etc.). Non-device clients
  (browser web-ui) are unchanged — the server still defaults to `web`.

### Fixed

- **`structuredClone` guard** in `SettingsForm` — falls back to a JSON clone
  when `structuredClone` is absent (older Tizen / Chrome <98 webviews), so the
  settings form doesn't throw on TV.

## [0.52.0] - 2026-06-26

### Added

- **TV mode** — a `data-tv` boolean flag on `<html>` (orthogonal to theme &
  density, modeled like `data-reduced-motion`) that turns on 10-foot sizing
  (larger control vars) and a high-contrast focus ring shown on plain `:focus`
  (TVs have no pointer / `:focus-visible` heuristic). Surfaced as a `tv`
  preference (persisted), a "TV mode" toggle in Appearance settings, a
  `PhlixAppConfig.defaultTv` first-run default, and `src/tokens/tv.css` (fully
  scoped under `[data-tv]` — zero effect for desktop users). `createPhlixApp`
  now also registers the `v-focusable` directive globally.
- **TV / remote spatial-focus engine** (opt-in; a no-op on desktop) for 10-foot
  / D-pad navigation:
  - `useSpatialNav(opts)` — arrow/D-pad directional focus movement. The keydown
    listener only acts while `enabled` (default **false**) and bails on typing
    targets, modifier chords, and an active `[data-focus-trap]` modal; a miss
    never `preventDefault`s (page scroll + the player's own Arrow shortcuts
    survive). Reactive `enabled`, `onEdge` callback, `move`/`focus`/`focusFirst`.
  - `v-focusable` directive (+ `installFocusable(app)`, `focusableRegistry`) —
    registers elements for the engine; `{ disabled, group, order }` options.
  - Pure, exported geometry: `bestCandidate` / `rectCenter` (+ `Dir`/`Rect`/
    `Candidate` types). `useFocusTrap` now tags its container `data-focus-trap`
    so spatial-nav yields to modals.
- **External player command / SEEK seam** — a command bus on `usePlayerStore`
  lets a host outside the Vue tree (Electron tray / media keys, TV remotes)
  drive the player's transport without holding a component ref:
  - `seekTo(seconds)` / `seekBy(delta)` — absolute / relative seek; the live
    media component (`Player`/`MiniPlayer`) watches `lastCommand` and applies it
    to the real `<video>` (honoring pre-metadata seeks via the existing
    `pendingSeek` defer path). A monotonic `seq` ensures two identical
    successive commands still fire.
  - `playLocalFile(url, meta?)` — load an arbitrary local/served URL into the
    player (for the Windows "Open File" path); reuses `setCurrent` + clears the
    queue.
  - New exported `PlayerCommand` type. Purely additive — `play`/`pause`/
    `closePlayer`/`updateProgress`/`setCurrent` are unchanged.

## [0.51.0] - 2026-06-26

### Added

- **Custom request headers through the shared `ApiClient`** — so the native
  clients (Windows/Tizen, built on `createPhlixApp`) can identify as devices by
  sending `X-Phlix-Device-ID` / `X-Phlix-Device-Name` / `X-Phlix-Device-Type` /
  `X-Phlix-Session-ID` on every API request.
  - `setDefaultApiHeaders(headers)` / `getDefaultApiHeaders()` — a module-level
    default-headers registry merged into EVERY `ApiClient` request (set once at
    boot, before any client is constructed); no change needed at the ~30
    `new ApiClient(...)` sites.
  - `ApiClientOptions.headers` — per-instance extra headers.
  - `PhlixAppConfig.deviceHeaders` — `createPhlixApp` registers these into the
    default-headers registry early at boot (before the first client / `auth.init()`).
  - Precedence: `Content-Type` and `Authorization` always win over default/instance
    headers; a falsy/empty header value (e.g. an empty session id) is omitted rather
    than sent as a broken empty header.

## [0.50.0] - 2026-06-26

### Changed

- **Tokens now sourced from `@phlix/tokens` (single source of truth);** the local
  `src/tokens/*.css` files were removed so they can't drift. `src/tokens/index.ts`
  now side-effect-imports `@phlix/tokens/style.css` (bundled into `dist/style.css`
  at build time, exactly as before). No visual change — the CSS is byte-identical.

### Added

- **ESLint is now an installed dev dependency with a working flat config**
  (`eslint.config.js`): js + typescript-eslint recommended + `eslint-plugin-vue`
  essential, tuned for a component library (single-word component names allowed,
  `_`-prefixed unused vars, short-circuit/ternary statements). `npm run lint`
  (report) and `npm run lint:fix` now function — previously the script referenced
  an uninstalled `eslint` with a deprecated `--ext` flag.

## [0.49.1] - 2026-06-23

### Fixed

- **My Servers showed "—" for Libraries even when the server was online.** The
  page now reads `libraryCount` from the hub's server payload
  (`ServerInfoDto.libraryCount`, hub-side fix) and renders the real count;
  still "—" on older hubs that don't report it. ("Last seen" is fixed on the
  hub side in the same release — the SPA already rendered `lastSeenAt`.)

## [0.49.0] - 2026-06-23

### Added

- **Cast & crew with profile photos on the detail page.** Cast and key crew
  (incl. director) now render as avatar cards — a circular profile photo (from
  the server's new `cast[].profile_url` / `crew[].profile_url`), or an initials
  fallback when no photo — with the person's name and their role/job. Falls back
  to the flat `actors`/`director` names on older servers. Clicking a person
  still filters the library by that name.
- **Clickable production companies / studios.** The detail page shows a Studios
  section (from `production_companies[]` with logos, or the single `studio`
  string) whose chips are clickable and filter the owning library by company
  (new `companies[]` media filter, end-to-end through `useMediaStore` and
  `buildMediaQuery`).

### Changed

- **Genre chips are now clickable** — each navigates to the owning library's
  grid filtered by that genre (`?genres=`). `LibraryPage` reads `genres` and
  `companies` deep-link query params alongside the existing `actors`/`match`.
- **Player scrubber starts at the true total length.** `usePlayerStore` seeds
  `duration` from the server's probed `media.duration` (seconds) in
  `setCurrent`, and `updateProgress` never shrinks below a known total (only
  adopts a larger element duration). The scrubber/seek bar shows the full length
  immediately instead of growing as a transcode/HLS stream loads, so seeking is
  accurate from the start.
## [0.48.3] - 2026-06-23

### Fixed

- **Poster "Play" button fell through to the info page on touch / first tap.**
  The quick-action row is `pointer-events: none` until the card is hovered, so
  on touch devices (no hover) — and on any tap before hover registered — a tap
  on Play passed straight through to the stretched whole-card info link
  (`/app/media/:id`) instead of starting playback. On coarse-pointer devices
  (`@media (hover: none)`) the overlay now reveals and the quick-actions are
  armed, so a single tap on Play starts playback. The action buttons also now
  `@click.stop.prevent`, so a Play/watchlist/info/match click is consumed by the
  button and can never also trigger the card's navigate-to-info default.
  (Hover-capable pointers are unchanged: Play has always emitted `play` →
  player route with autoplay.)

### Fixed

- **Mini-player was unreadable on the Daylight theme.** The docked mini-player
  hardcoded a white title (`#fff`) and white control icons while pulling its
  background from the theme token `--surface-glass-strong` — which is a dark
  glass on Nocturne/Midnight but **off-white** on Daylight. The result was white
  text + white icons on a near-white dock (invisible), with only the close
  button appearing, and only on hover. The title now uses `--text`, the control
  icons use `--text-muted` (→ `--text` on hover), and the progress track uses
  `--border-strong`, so the dock is legible on every theme.

## [0.48.1] - 2026-06-23

### Fixed

- **Hub media browse showed empty rails / "Not found" (relay-proxy double-prefix).**
  The media helpers (`buildMediaUrl`) bake the API base INTO the URL, and that URL
  was then fetched through an `ApiClient` whose `baseUrl` was the same base — so
  the base was applied twice. Invisible on the media server (base is `''`), but on
  the hub the base is the relay-proxy path, so every Browse rail / library grid /
  similar / season fetch hit `…/proxy/api/v1/servers/{id}/proxy/api/v1/media` → 404
  (the libraries names still loaded, but no content). Fixed centrally in
  `ApiClient`: a non-empty `baseUrl` is no longer prepended to an endpoint that
  already starts with it. This corrects all media call sites (Browse `HomeRow`,
  `useMediaStore` grid, `MediaDetailPage`, `PlayerPage`, `useSeriesSeasons`) at once.

## [0.48.0] - 2026-06-23

### Added

- **Hub media playback over the relay (P3).** A paired server's media now plays
  from the hub. The player streams the bytes DIRECTLY from the paired server's own
  public origin (native HTTP Range, multi-GB safe) — the relay proxy intentionally
  does not route the `/media/:id/stream` byte endpoint; it carries only JSON/browse
  traffic and small HLS segments. When the direct origin is unreachable, or the
  file needs transcoding (MKV/HEVC), the player falls back to an on-demand HLS
  transcode served THROUGH the proxy (same-origin, so hls.js segment fetches work
  without CORS). New pieces:
  - `useServerStore` now persists `currentServerUrl` (the paired server's own
    public origin, its first advertised hostname candidate) under
    `phlix.currentServerUrl`; `setCurrent(id, name?, url?)` accepts it and My
    Servers' Browse button passes it.
  - `mediaDirectBaseFor(app, currentServerUrl)` + the `useMediaDirectBase()`
    composable + a `mediaDirectBase` provide (computed over `useServerStore`):
    resolve the server's own origin on the hub (else `''`).
  - `PlayerPage.streamUrlFor` resolves a signed `/media/:id/stream` path against
    that direct base on the hub (the server's origin), falling back to the
    media-api base; transcode/HLS still go over the proxy (`mediaApiBase`).
  - `Player.onVideoError` now also flips to the transcode-over-proxy fallback on a
    `<video>` network error (`MEDIA_ERR_NETWORK`) before any playback progress, so
    a paired server with no reachable public origin still plays via HLS.
  - `isNetworkMediaError()` helper in `player/playback.ts`.

## [0.47.0] - 2026-06-23

### Added

- **Hub inline media browsing (P2).** The hub's SPA can now browse a paired
  server's libraries/media/detail INLINE by routing every media API call through
  the relay proxy (`/api/v1/servers/{id}/proxy/…`), instead of redirecting to the
  server. New pieces:
  - `useServerStore` — the hub's "current server" selection, persisted to
    `localStorage` (`phlix.currentServerId` / `phlix.currentServerName`) so a
    reload / deep link keeps browsing the same server.
  - `useApiBase()` / `useMediaApiBase()` composables. `useMediaApiBase()` is the
    base for media browsing: on the hub with a server selected it is that server's
    relay-proxy base; otherwise it equals the app's own base. The media pages
    (Browse / Library / MediaDetail / Season / Player) now use it.
  - `createPhlixApp` provides a reactive `mediaApiBase` computed (from
    `useServerStore`) alongside the unchanged `apiBase` (kept for auth / `/me` /
    admin, which must never be proxied). Exported pure helper `mediaApiBaseFor()`.
  - My Servers gains a **Browse** action per online server: it selects that
    server and navigates to the Browse home, where the rails load over the tunnel.

### Changed

- `authGuard` takes an optional `home` argument (default: the `browse` route) for
  the logged-in-non-admin bounce. `createPhlixApp` passes `config.home`, so on the
  hub a non-admin denied an admin route lands on `/app/servers` rather than the
  media-server Browse page (which 404s server-only endpoints on the hub).

## [0.46.0] - 2026-06-23

### Added

- `PhlixAppConfig.home` — the path login/signup land on and the brand link target.
  Defaults to `routerBase`. Lets the hub land on its servers list instead of the
  media-server Browse page.
- `features.resumeSync` flag gating the shell's cross-device continue-watching fetch
  (`GET /api/v1/users/me/continue-watching`). Defaults on for `app: 'server'`, off
  for `app: 'hub'` (the endpoint is a media-server surface and 404s on the hub).

### Fixed

- The hub no longer renders the media-server Browse page on login (which fired
  `/api/v1/libraries` + continue-watching against the hub and 404'd). It now lands on
  its configured `home` and skips the server-only resume sync.

## [0.45.0] - 2026-06-22

### Added

- **My Servers: the per-row "Manage" button now works.** It opens that server's own web UI — the first hostname candidate the server advertised to the hub at pairing time — in a new tab (`window.open(url, '_blank', 'noopener,noreferrer')`). When the server reported no reachable URL, the button is disabled with an explanatory tooltip. (Previously an inert placeholder.) Pairs with the phlix-server change that advertises the server's configured public URL during pairing.

## [0.44.0] - 2026-06-21

### Security
- **The player now uses the server's signed, short-lived direct-play URL — required by the server's new signed-URL gate on `/media/:id/stream`.** That route is no longer world-readable, and a `<video src>` can't attach a `Bearer` header (the SPA holds a `localStorage` token, not a session cookie), so a bare `/media/:id/stream` would `401`. `PlayerPage.streamUrlFor()` now prefers the `stream_url` field the gated detail endpoint (`GET /api/v1/media/:id`) mints (`/media/:id/stream?exp&sig`), prefixing the API base for cross-origin hosts, and falls back to the bare path only for list/up-next rows that don't carry one (those re-fetch the detail — and a fresh signed URL — when they actually play, because advancing navigates the route). `MediaItem` gains an optional `stream_url`. The hls.js transcode path is unchanged: it already attaches the Bearer token to every segment XHR via `xhrSetup`, and the server now also signs the master-playlist + subtitle URLs it returns. No bare media URL is constructed anywhere in the SPA anymore.

## [0.43.0] - 2026-06-21

### Fixed
- **Virtualized library grid now tracks the scroll position immediately — fixes the same titles "staying" on screen while scrolling.** The grid measured the scroll offset on a `requestAnimationFrame`-deferred path; under scroll load that measurement stalls (rAF is throttled aggressively during scrolling, notably on Firefox), freezing the rendered window so the same rows stayed on screen as you scrolled. The scroll handler now calls `measure()` **synchronously** (one cheap layout read; Vue batches the re-render), so the window follows every scroll event and can't be frozen by rAF throttling. Resize stays rAF-coalesced. Regression test asserts the window advances on scroll even when rAF never fires.

## [0.42.0] - 2026-06-21

### Fixed
- **A-Z jump rail now loads the titles at the letter you jump to (were empty skeleton boxes).** The pre-sized grid only paged **sequentially** — `load-more` appended the next page from the end (`items.length`) — so jumping to "S" (offset ~5000) scrolled to slots whose page was never fetched, and the only loading that happened was 24 more items appended back at the top. Paging is now **random-access**: `MediaGrid` emits the visible absolute-index window (`need-range`, debounced), and `useMediaStore.ensureRange()` fetches the page(s) covering it and splices them in **at their absolute index** (sparse placement) — so a jumped-to letter's slots fill with the right titles. Pages already loaded are skipped; a page fetch from a superseded query (filters changed mid-flight) is dropped (generation guard); jumps are now **instant** (a smooth scroll across thousands of rows was janky and fetched every page flown past). `LibraryPage` drives the grid via `need-range`; the store keeps `loadMore` for other consumers.

## [0.41.0] - 2026-06-21

### Fixed
- **The SPA now sends the logged-in user's Bearer token by default**, fixing the hub's **My Servers** and **Federation** pages showing "unauthorized" with a Retry button that never cleared. Those pages (and the media list / A-Z `letter-index` requests) used `ApiClient` instances whose default token store was a **no-op**, so no `Authorization` header was ever sent — the hub's auth middleware correctly returned 401, and Retry just repeated the token-less request. `ApiClient`'s default token store now reads the session token from `localStorage` in the browser (a no-op only under SSR), so every client sends the token unless one is explicitly overridden. `fetchLetterIndex` was also switched from a raw `fetch` to `ApiClient` so it sends the token too.

### Added
- **"Add server" now works on My Servers.** The previously-placeholder button opens a modal to paste the claim code shown on your media server; it POSTs to the hub's `POST /api/v1/server-claims/claim` (with the `Accept-Phlix-Protocol: v1` header the endpoint requires), then refreshes the list. Friendly, specific errors for an unknown / expired / already-claimed code. New `claimServer()` API helper + `ClaimError`.

### Security
- Sending the token by default is also what lets **phlix-server gate its media-listing endpoints** behind authentication (companion server change): previously `GET /api/v1/media` (and friends) were world-readable; the SPA now authenticates those requests so the server can require a logged-in user without breaking browsing.

## [0.40.0] - 2026-06-21

### Added
- **Article-aware title sorting helper (`stripLeadingArticle` / `compareByStrippedTitle` / `SORT_TITLE_ARTICLES`).** Mirrors the server's `SortTitle` so listings file "The Plot" under **P** (not T) while the title still displays in full. Ignores a leading **the/a/an** + **el/la/le/les/los/las/die/der/das** (whole word, case-insensitive, accent-sensitive). Exposed from the package root for hosts that sort/group lists locally.
- **`MediaItem.sort_title`** — optional article-stripped sort key the server now returns alongside `name` (the server already orders the media grid + A-Z rail by it; the field lets any client-side sort agree). Optional, so older servers keep working.

### Changed
- **Library Browse rails now ignore a leading article in their name tiebreak.** `sortLibraries` sorts by the article-stripped name, so a "The …"-named library files under its real letter — consistent with how the server sorts media listings. (Ordering is unchanged for the typical "Movies"/"TV"/"Music" names.)

## [0.39.0] - 2026-06-21

### Added
- **Plugin update management in the admin Plugins section.** A **Check for updates** button compares each installed plugin against the latest version in its catalog repo and surfaces an "Update available → vX" badge plus an **Update** button on the plugin's catalog card and its "Other installed plugins" row; an **Update all (N)** button appears when any are outdated. An **Auto-update** switch toggles the server's opt-in background auto-updater. New `AdminPluginsApi.checkUpdates()` / `updatePlugin()` / `updateAll()` / `getAutoUpdate()` / `setAutoUpdate()` wrappers + `PluginUpdate`/`UpdateCheckResponse`/`UpdateAllResult` types over the server's `GET /plugins/updates`, `POST /plugins/{name}/update`, `POST /plugins/updates/apply`, and `GET`/`PUT /plugins/auto-update`.

## [0.38.3] - 2026-06-21

### Fixed
- **Matched/unmatched metadata filter and actor filter now actually filter.** The library grid's count stayed at the full total no matter what was selected. Root cause: `useMediaStore` serialized its requests (and cache keys) with a duplicated local builder that had drifted from the shared `buildMediaQuery` and silently dropped the `match` and `actors` params — so neither reached the server (full, unfiltered result) nor the cache key (a toggle re-served the cached unfiltered page). The store now uses the shared `buildMediaQuery`/`buildMediaUrl` as the single source of truth, so both filters reach the request and each filter state gets its own cache entry. Regression tests assert the params appear in the request URL and that matched vs. unmatched refetch distinctly.

## [0.38.2] - 2026-06-20

### Fixed
- **Plugin install failures now show a clear, persistent reason.** A failed install previously returned to the Install button with no message; it now shows the server's actual error (e.g. "Cannot create plugins base directory … re-run install.sh --update") as both a toast and a dismissible inline banner, instead of a generic "couldn't download" string. Covers both the catalog Install and the single-URL install.

### Tested
- **Locked in the matched/unmatched metadata filter.** Added a FilterBar regression test proving that toggling Matched/Unmatched sets the store, emits `change` (reloading the grid), and serializes `?match=` — with **no search text required** — so the filter can't silently regress.

## [0.38.1] - 2026-06-20

### Fixed
- **End-of-video chrome no longer hides until you move the mouse.** When a video ends, browsers don't reliably fire a `pause` event (Safari notably doesn't), so the player's play-state stayed `playing` and the idle auto-hide blanked the end-of-video controls and the bottom-right **Up next** card until a pointer move. `Player.onEnded()` now explicitly cancels the pending auto-hide and pins the chrome open, so the up-next card and controls appear immediately on all browsers.

## [0.38.0] - 2026-06-20

### Added
- **Live scan / rescan / match-metadata progress bar.** The admin Libraries page now renders a real percentage bar (plus `processed / total` count and the current file) while a job runs, replacing the lifecycle-only badge. Driven by the server now streaming `items_found` (total) / `items_updated` (processed) + `current_path` onto the job row for scan and rescan (metadata-match already did), surfaced through the existing `scan-status` polling. `ScanJob` progress fields are documented as live; new `hasProgress()` / `progressPercent()` / `progressCount()` / `progressFile()` helpers.

### Changed
- **Clearer scan vs. rescan vs. match-metadata explanation.** The Libraries page hint now explains that **Scan** adds/updates (keeping existing items), **Rescan** clears and rebuilds, and **Match metadata** re-fetches posters/details — so operators pick the right action.

## [0.37.0] - 2026-06-20

### Added
- **Plugin catalog browser in the admin Plugins section.** The Plugins page now seeds itself from one or more *catalog* repositories (`plugins.json`, default `detain/phlix-plugins`) fetched server-side, instead of only accepting a single repo URL. Each catalog entry renders as a card with its title, type, summary and tags; a not-installed entry shows **Install** (by the catalog `repo` URL), an installed one shows an enable/disable switch plus **Configure** and **Uninstall**. A sources bar lists every catalog and lets the admin **Add catalog** or remove an extra one (the default is not removable). The single-repo **Install from URL** path remains, and any plugin installed that way but not listed in a catalog appears under "Other installed plugins" so it stays manageable. New `AdminPluginsApi.catalog()` / `addCatalogSource()` / `removeCatalogSource()` wrappers + `CatalogResponse`/`CatalogPlugin` types over the server's `GET /plugins/catalog` and `POST`/`DELETE /plugins/catalog/sources`.

## [0.36.0] - 2026-06-20

### Added
- **A-Z jump rail on long library listings.** A vertical A-Z (+`#`) rail pinned to the right edge of a library grid: clicking a letter scrolls the pre-sized grid straight to that letter's first title (on-demand paging loads the destination). Backed by the server `letter-index` (absolute item offsets honoring the active filters); empty letters render disabled, so the alphabet stays a stable map. `MediaGrid` exposes `scrollToIndex()`; `LibraryPage` fetches the index — only for the default name-ascending sort, refetched on filter change — and renders the new `LetterRail`. New `fetchLetterIndex()` API helper + `LetterRail.vue`.

## [0.35.0] - 2026-06-20

### Changed
- **The listing grid is pre-sized to the full result count and pages in on demand.** `MediaGrid` now sizes its scroll height from the server `total` up front, so a long library's page length — and the scrollbar — are the final length immediately rather than growing as you scroll. Rows past the loaded set render as skeletons until scrolled into view, and the grid requests the next page when the rendered window reaches the loaded edge (the bottom sentinel can't drive paging once the sizer is the full height). New pure, unit-tested helpers `effectiveItemCount()` + `shouldLoadMore()` in `virtual-grid.ts`; `LibraryPage` passes `:total`. Memory stays flat — still only a windowful of DOM regardless of library size.

## [0.34.0] - 2026-06-20

### Added
- **Matched / unmatched metadata filter.** The FilterBar advanced panel gains a "Metadata" group (Matched / Unmatched, single-select) that sends `?match=` to `GET /api/v1/media`, with an active-filter pill and a contribution to the advanced-count badge. `useMediaStore` tracks `matchStatus` (queryParams / toQuery / applyQuery), and `buildMediaQuery` serializes it.
- **Clickable cast → actor-filtered listing.** On a detail page each cast name is now a button: `MediaDetail` emits `actor`, `MediaDetailPage` opens that title's library filtered to the actor (`/app/library/:id?actors=<name>`), and `LibraryPage` seeds the FilterBar from `?actors=` / `?match=` deep-link query params (so the grid lands already filtered, with a removable actor pill). `useMediaStore` tracks `selectedActors`; the single-item `MediaItem` shape now carries `library_id`.

## [0.33.0] - 2026-06-20

### Changed
- **Clicking a media card's poster opens its info/detail page by default — for every type, including movies and episodes.** Previously a movie/episode poster linked straight to the player (`/app/player/:id`) and only a series opened its detail page, so browsing from home or a listing could start playback by surprise. `MediaCard`'s default route is now `/app/media/:id` for all types; direct playback is the overlay **Play** button's job (it emits `play`), and an explicit `to` / `cardTo` prop still overrides the route. Both the home rails (`MediaRow`) and the browse/library grids (`MediaGrid`) use the default, so both now land on the info page.
- **Full-width layout.** The app shell (`AppLayout` header + main), the browse and library listings, the media detail view and the player stage no longer cap their width at centered 1100–1400px columns — they now fill the window width (`max-width: none`, existing padding kept as gutters). Theater mode is unchanged.

## [0.32.0] - 2026-06-12

### Changed
- **Admin Services: Last.fm connect uses the in-app OAuth redirect and is gated
  on the API key.** The "Connect Last.fm" button now redirects to the server's
  `GET /api/v1/oauth/lastfm` endpoint (authorize → 302 to Last.fm) instead of the
  legacy `/admin/lastfm` SSR page. The button is disabled (with an
  "Add a Last.fm API key first" tooltip) when `api_key_set === false`, mirroring
  the Trakt gating, and a setup hint (register an API account at
  `last.fm/api/account/create`, then add the key + secret in Settings or via
  `LASTFM_API_KEY` / `LASTFM_API_SECRET`) renders when disconnected and
  unconfigured. On mount the page reads the `?lastfm=connected|error|not_configured`
  (and `?trakt=…`) redirect-result query param, surfaces a success/error toast,
  refreshes the service status, and strips the param from the URL so it doesn't
  re-fire on refresh.

## [0.31.0] - 2026-06-12

### Added
- **Admin Libraries: per-series-directory toggle for series libraries (U8).**
  The add/edit library Modal now shows a "Each series is in its own folder"
  Switch (with a help line: "Use each top-level folder name as the series title
  to improve metadata matching.") whenever the selected type is `series`. The
  toggle populates from the library's stored `options.series_per_directory`
  option (coercing bool / `1` / `"1"` / `"true"` / `"yes"` / `"on"`) on edit and
  is sent as a top-level `series_per_directory` boolean in both the create and
  update payloads (the server, per S2/S3, accepts it at the body top level and
  persists it canonically inside `options` for series libraries only).
  `CreateLibraryInput`/`UpdateLibraryInput` gain an optional
  `series_per_directory?: boolean`.

## [0.30.0] - 2026-06-12

### Added
- **Admin signup-mode control + pending-user approval queue (U7).** Surfaces the
  S1 server approval gate in the admin UI:
  - **Settings → Access tab:** `auth.signup_mode` now renders as a proper
    Select with three options — "Open — anyone can sign up", "Require admin
    approval" and "Disabled — no new signups" — with a descriptive help line,
    instead of a raw text input. (The enum-Select pattern reuses the existing
    `SELECT_OPTIONS` map, so a `string`-typed key with known options renders a
    dropdown; the value round-trips through the standard save/PUT flow and
    reflects the overridden "custom" badge.) "Access" is now the first/default
    Settings tab.
  - **Users page:** every user row shows a status Badge (Pending / Active /
    Disabled; a missing status degrades to Active). A prominent **Pending
    approval** queue is shown above the table whenever there are pending
    signups, with per-user **Approve** and **Reject** actions. In the main
    table, pending users get **Approve** + **Reject**, active users get
    **Disable** (confirmed), and disabled users get **Enable** (→ active).
    Reject and Disable are confirmed via a Modal; each action refreshes the
    list and surfaces errors as toasts.
  - `AdminUsersApi` gains `list({ status? })` (appends `?status=`),
    `approve(id)`, `disable(id)` and `reject(id)` hitting the S1 endpoints; the
    `User` type now carries an optional `status` field, plus a new `UserStatus`
    type and `USER_STATUSES` constant.

## [0.29.0] - 2026-06-12

### Added
- **Admin Plugins management page (U6).** A new admin section page ("Plugins",
  mounted after Libraries in `serverAdminPages`/the server admin set) that lists
  installed plugins (name, version, type, enabled state) and lets an admin:
  - **Install** a plugin by URL via a Modal (`POST /api/v1/admin/plugins/install`),
    surfacing the server's install error `code` as a clearer message.
  - **Enable / Disable** a plugin from a per-row toggle
    (`POST .../{name}/enable` | `/disable`).
  - **Uninstall** behind a confirm Modal (`DELETE .../{name}`).
  - **Configure** via a schema-driven Modal: it GETs the plugin detail
    (`GET .../{name}`) and builds one form control per settings-schema key by
    type (string→text, int→number, bool→Switch), showing labels, descriptions and
    required markers. Secret fields render as password inputs prefilled with the
    `***` mask and are only submitted when the admin actually types a new value,
    so an unchanged secret is preserved server-side. Per-field validation errors
    from a `400 plugin.settings.validation_failed` render under the offending field.
  - `AdminPluginsApi` wraps the S6 endpoints with typed `Plugin` / `PluginDetail`
    (incl. `settings_schema` + masked `settings`) interfaces; new exported helpers
    `pluginErrorCode()` and `pluginValidationErrors()` and the `PLUGIN_SECRET_MASK`
    sentinel.

## [0.28.0] - 2026-06-12

### Added
- **Interactive per-item metadata matching for admins (U5).** An admin can now
  fix a wrong or unmatched title directly from any media card or the
  detail/series page: a "Match" quick-action opens a modal
  (`MetadataMatchModal`) that auto-searches TMDB from the item's own title/year,
  lets the admin refine the query + optional year and re-search, and applies a
  chosen result to that single item. On a successful apply the affected view
  refreshes in place (the detail page swaps in the server's re-shaped item and
  re-pulls a series' season tree; listing pages reload/replace the card).
  - `ApiClient.matchSearch(id, { query?, year?, type? })` and
    `ApiClient.matchApply(id, { tmdb_id, type? })` wrap the S5 endpoints
    (`GET /api/v1/media/{id}/match/search`, `POST .../match/apply`). New exported
    types `MatchCandidate` / `MatchSearchResult` / `MatchSearchParams` /
    `MatchApplyInput` / `MatchApplyResult`, plus `isTmdbUnconfigured(err)` +
    `TMDB_UNCONFIGURED_CODE` so the UI surfaces the server's
    `422 metadata.tmdb_unconfigured` as a clear "configure a TMDB API key in
    admin settings" message instead of a generic failure.
  - The modal reuses the shared `Modal` (focus-trap, Esc + backdrop close) and
    handles loading / empty / error / unconfigured states with per-result
    apply-in-progress feedback.
  - The trigger is gated on `useAuthStore().isAdmin` everywhere it appears
    (`MediaCard`/`MediaRow`/`MediaGrid`/`HomeRow` gained an opt-in `canMatch`
    prop + `match` event; `MediaDetail`/`SeriesDetail` gained a `canMatch` prop +
    "Match metadata" hero action) so non-admins never see it — defense in depth
    on top of the admin-gated API.

## [0.27.0] - 2026-06-12

### Added
- **Selectable embedded subtitle tracks in the player.** When a source is
  transcoded on demand, the server (S4) extracts its embedded text subtitles to
  WebVTT sidecars and returns them on the transcode start/status responses as
  `{ index, language, label, default, url }`. The transcode composable
  (`useHlsTranscode`) now captures that list into a reactive `subtitleTracks`
  ref — resolving each sidecar `url` against the API base exactly like the HLS
  master-playlist URL, and updating reactively when tracks arrive late on a
  status poll. The player renders one native `<track kind="subtitles">` per
  track into the `<video>`, so the existing caption enumeration + custom cue
  overlay pick them up automatically (track selection, the CaptionsMenu list,
  and the "Off" option all work unchanged). If a track is flagged `default` it
  becomes the initially-selected caption — but only when the user has no
  persisted caption preference; an explicit stored choice (a language or "off")
  is never overridden. Direct-play sources have no sidecars and render no
  `<track>`s, so direct-play is unaffected.

## [0.26.0] - 2026-06-12

### Added
- **Per-season pages with a series season grid.** A series' detail page
  (`/app/media/:id`) no longer dumps the whole season/episode tree inline.
  Instead it shows the series info (poster, overview, genres, year, rating) plus
  a GRID OF SEASON CARDS — one card per season (season poster, falling back to the
  series poster; "Season N" / "Specials"; the episode count) that links to its
  own per-season page. A new route `/app/media/:id/season/:season` (name
  `season`, `:season` = the season number, Specials = 0) renders that season:
  a header (season poster/name/overview + a back-link to the series) and the
  season's episode list (reusing the SeriesSeasons episode rows), with Play per
  episode navigating to `/app/player/:id`. An invalid/missing season number shows
  a "season not found" empty state. Movie/episode detail is unchanged. New
  `SeriesDetail`/`SeasonPage` components, a shared `loadSeriesSeasons` fetch
  routine, and `seasonRouteParam`/`findSeasonByParam` season-grouping helpers
  (groups now carry the season poster/overview); page titles set to the series
  name and `<Series> · Season N`.

## [0.25.0] - 2026-06-12

### Added
- **Autoplay on load.** The player now starts playback automatically once the
  source is ready (`canplay`) instead of waiting for a press of Play. Since the
  player is reached by clicking Play (a user gesture), unmuted autoplay usually
  succeeds; if the browser rejects it (`NotAllowedError` — the gesture didn't
  carry through navigation) the player retries muted, and if even that is blocked
  it leaves the existing play control as a "tap to play" affordance — no unhandled
  rejection. Autoplay is opt-in per host (`<Player :autoplay="true">`, set by
  PlayerPage), applies after a resume prompt is resolved (no double-trigger), and
  re-arms when the media changes.
- **Previous / Next episode buttons.** For series content (the playing item is an
  episode) the control bar now flanks play/pause with Prev and Next buttons that
  span the WHOLE series: episodes are ordered by `(season_number, episode_number)`
  so the last episode of a season is followed by the first of the next, with the
  Specials bucket last. The buttons navigate to the adjacent episode's
  `/app/player/:id` route (the id watch re-initialises the player); Prev hides on
  the very first episode and Next on the very last, and neither shows for movies.
  Ordering reuses the series `groupEpisodesBySeason` grouping via a new pure
  `episode-order` helper (`orderEpisodes` / `previousEpisode` / `nextEpisode`).

### Changed
- **Player dropdown styling.** The in-player `Select`-based menus (SpeedMenu,
  QualityMenu) no longer render with an opaque light background / black text that
  clashed with the transparent, white-text player chrome. `Select` gains an
  opt-in `tone="glass"` variant — a scoped `is-glass` class that overrides the
  trigger / list / option surfaces with a translucent dark, white-text treatment
  (legible hover/active/selected states, subtle light border, accent-tinted
  selection) — applied only by those player menus. `Select` is visually unchanged
  everywhere else it's used (default tone); keyboard navigation and a11y are
  untouched.

## [0.24.0] - 2026-06-12

### Added
- **Per-route page titles.** Every navigation now updates `document.title` to a
  `"<page> · Phlix"` string (just `"Phlix"` when there's no page-specific part),
  so browser tabs, history, and bookmarks are meaningful instead of all reading
  the same thing.
  - New `usePageTitle` composable: `setPageTitle(title)` formats and writes the
    document title (centralizing the ` · ` separator + app-name suffix);
    `usePageTitle(source)` watches a ref/getter and keeps the title in sync while
    a component is mounted; `setAppName(wordmark)` overrides the suffix (set from
    `branding.wordmark` at boot); `formatPageTitle()` is the pure formatter. All
    `document` access is SSR-guarded.
  - A `router.afterEach` hook in `createPhlixApp` sets each route's default title
    from `meta.title`. Static routes carry one — `browse` (`shell.browse`),
    `login` (`auth.loginTitle`), `signup` (`auth.signupTitle`), and `settings`
    (`settings.title`), resolved through the i18n catalog so overrides apply —
    and admin routes derive `Admin · <label>` from the canonical admin page
    labels (new `adminPageLabel` helper).
  - Data-driven pages set their own title once content loads: MediaDetailPage /
    PlayerPage use the item/series name (e.g. `Assassination Classroom · Phlix`),
    LibraryPage uses the library name. Leaving such a page resets to the next
    route's default (no stale title lingers).

## [0.23.0] - 2026-06-09

### Added
- **On-demand HLS playback for non-direct-playable files.** When a title is in a
  container/codec the browser can't play directly (MKV, HEVC, …), the player now
  asks the server to transcode it to HLS and plays the result via **hls.js**
  (with native HLS on Safari/iOS) instead of dead-ending at a "can't play"
  notice. A "Preparing your stream…" overlay (with progress) shows while the
  server warms up the job, then the normal player chrome takes over.
  - New `useHlsTranscode` composable orchestrates start → poll readiness → attach.
  - New `transcode.ts` helpers (`transcodeStartPath`/`transcodeStatusPath`,
    payload parsers, `resolveStreamUrl`) and `hls-playback.ts` (`attachHls`,
    `isNativeHlsSupported`) — hls.js is dynamically imported so it only loads
    (separate ~157 kB gzip chunk) when a transcode is actually played.
  - New `TranscodePreparing` overlay; `TranscodeNotice` reworded to a genuine
    failure message (it now only appears if the transcode itself fails).
  - `Player` gains an `apiBase` prop (defaults to the page origin) and triggers a
    transcode both proactively (by extension) and reactively (on a fatal decode
    error), including on up-next item changes.

### Dependencies
- Added `hls.js` ^1.6.16.

## [0.22.1] - 2026-06-09

### Fixed
- **Series card "Play" no longer routes to the unplayable player.** On the Browse
  rails and the library grid, the hover **Play** action on a *series* card now
  opens that series' detail page (the season/episode tree) instead of navigating
  to `/app/player/<seriesId>` — a series itself has no stream. Movies and episodes
  are unchanged (they still play directly). Matches the series card's main click,
  which already opened the detail page.

## [0.22.0] - 2026-06-09

### Added
- **Series drill-down.** A series no longer appears as a flat dump of every season and episode.
  Series libraries (and their Browse rails) now list **shows**; opening a series goes to its detail
  page, which renders a **Season / Specials → episodes** tree (collapsible sections, episodes ordered
  by number, Specials last). Episodes play; "Play" on the series hero starts the first episode.
- `MediaItem` gains the optional hierarchy fields `parent_id`, `season_number`, `episode_number`, and
  `episode_title` (all from the browse API), and the `MediaType` union gains `season`.
- `LibraryQuery`/`LibraryQueryParams` gain `parentId` (fetch a series' direct children — its
  seasons/episodes) and `topLevel` (return only parent-less items: movies + series). `buildMediaQuery`
  serializes them (`parentId=…`, `topLevel=1`).
- `useMediaStore` gains a `topLevel` scope (`setTopLevel`) alongside `libraryId`, kept out of the
  FilterBar URL-sync (it is a page/route concern). The dedicated library page and the Browse library
  rails set it so series libraries show shows.
- New components/util: `SeriesSeasons.vue` (the season→episode tree) and `series-grouping`
  (`groupEpisodesBySeason`, `hasSeasonRows`, `firstEpisode`) — pure helpers that build the ordered
  season tree from a series' flat child list (grouping by `season_number`, Specials = season 0 / null).

### Changed
- `MediaCard` links a **series** card to its detail page (`/app/media/:id`) instead of the player — a
  series itself isn't directly playable. Movies and episodes still link straight to the player.
- The series detail page fetches children via `?parentId=` and, when the server models seasons as their
  own `type: 'season'` rows, flattens them to episodes so grouping is uniformly by `season_number`.
  A series shows its episode tree instead of the genre "More like this" rail.

### Compatibility
- Requires a server exposing the hierarchy fields + `parentId`/`topLevel` params (phlix-server with the
  series-hierarchy media-api change; detain/phlix-shared ≥ 0.9.0). All fields are optional, so flat
  (movie) libraries and older servers keep working unchanged.

## [0.21.0] - 2026-06-08

### Added
- **Each library is its own section on the Browse surface.** Browse no longer renders one flat
  all-libraries grid. It now shows a "Continue Watching" rail, the app's configured home rows, then
  **one rail per library** ("Movies", "TV", "Anime", …) sourced from `GET /api/v1/libraries` (sorted by
  `display_order`, then name). Each rail's **See all** opens that library's dedicated page.
- **Dedicated per-library page** at the new built-in route `/app/library/:id` (`name: 'library'`) — the
  full, filterable, paginated grid scoped to a single library. The shared `useMediaStore` gains a
  `libraryId` scope (`setLibraryId`) that serializes to `?libraryId=` on `GET /api/v1/media`; a consumer's
  literal `/app/library/scan` route still wins over the `:id` param (static segments rank higher).
- **Optional per-library nav links.** A `MenuItem` may set `libraryLinks: true`; the shell then expands it
  into one nav link per library (to `/app/library/:id`). Opt-in and config-driven, so the media server's
  "Browse" entry can enable it while the hub (no libraries) never does.
- New public API: `useLibrariesStore`, `fetchLibraries`, `sortLibraries`, and the `LibrarySummary` type;
  `LibraryQuery`/`LibraryQueryParams` gain an optional `libraryId`.

### Changed
- The flat global "Browse all" grid + `FilterBar` moved off the Browse home and into the per-library page.
  Cross-library discovery remains available via search / the command palette.

## [0.20.0] - 2026-06-05

### Security
- **Validate the session on boot and gate admin routes client-side (broken access control).** The router
  guard treated a token's mere *presence* in `localStorage` as "logged in" (`isLoggedIn = accessToken !== null`)
  and never validated it, and it applied **no admin-role check** — so after a reload (e.g. following a deploy,
  or once the access token expired) a stale/invalid token still satisfied the guard and the SPA rendered every
  protected route, **including the entire `/app/admin/*` console** (sidebar, forms, actions), for an
  unvalidated session or a non-admin user. `user` was also never rehydrated on boot, so the account badge fell
  back to a generic "A". (The back end still authorized every data call, so this was a client-side
  broken-access-control / improper-session-validation defect, not data exfiltration — but the admin UI must not
  render for an invalid session or a non-admin.) Fixed by:
  - `useAuthStore.init()` — a memoised, one-shot boot check the router guard awaits before the first protected
    route resolves: a restored token is validated once via `/auth/me`, which rehydrates `user` (so `isAdmin`
    and the account badge are correct after a reload) or, on failure, clears the token so the guard treats the
    visit as logged-out and redirects to login.
  - The admin section's parent route now carries `meta: { requiresAdmin: true }` (inherited by every
    `/app/admin/*` child), and `authGuard(to, isLoggedIn, isAdmin)` redirects a logged-in **non-admin** away
    from admin routes (to `browse`, not `login`, to avoid a re-auth loop). The nav-link filter remains
    progressive disclosure only; this is the real client-side gate.

  No consumer code change is required — bump `@phlix/ui` and rebuild the SPA bundle. `authGuard` gains an
  optional third argument (`isAdmin`, default `false`), so existing two-argument calls remain valid.

## [0.19.0] - 2026-06-04

### Added
- **Composable admin page groups.** The shared admin shell is now mountable per-app as page-group
  registries rather than a single fixed 16-page set. New `AdminPage` interface + exported registries
  `commonAdminPages` (Users, Logs, Settings), `serverAdminPages` (the 13 media-server pages), and
  `hubAdminPages` (Hub Dashboard, Audit Logs). `buildAdminRoutes(base, pages?)` and `adminMenu(base, pages?)`
  are parameterized; `buildServerAdminRoutes(base)` is the explicit synonym for the default and
  `buildHubAdminRoutes(base)` mounts the hub set. The bare `<base>/admin` index now redirects to the first
  page in the mounted set (the dashboard for both shipped apps).
- **`HubDashboardPage` + `AdminHubDashboardApi`.** A hub-scoped admin landing page rendering server-fleet
  health (total / online / offline), active relay sessions, pending requests, the user count, and a recent
  audit-event feed. Backed by a new defensive API client over `/api/v1/admin/dashboard/{summary,activity}`
  (unwraps `{ success, data }`, normalises camelCase/snake_case, degrades to zeros / `[]`).
- **`AdminLayout` `pages` prop.** The admin sidebar is now built from the exact page list the consumer
  mounted (dropping the fixed `adminMenu(base)[0]` assumption), so the server and hub render their own
  page groups with no shared-code branching.

### Changed
- **Server admin console is byte-identical.** `buildAdminRoutes()` with no arguments still yields the
  historical 16 server routes — same names, same `/app/admin/<segment>` URLs, same sidebar order, same
  Dashboard landing — so the server is unaffected by the refactor.
- **`AuditLogsPage` is no longer a static export.** It is now a lazy chunk owned by the hub admin registry
  (`hubAdminPages`, mounted via `buildHubAdminRoutes`), restoring its code-split (it had become a
  Rollup `INEFFECTIVE_DYNAMIC_IMPORT`). The hub mounts it through the admin section instead of importing
  the page directly.

## [0.18.0] - 2026-06-04

### Added
- **Skip intro / outro buttons — `SkipButton.vue` + Player markers.** The player now consumes the
  server's intro/outro markers (`GET /api/v1/media/:id/playback-info`): while the playhead is inside a
  marker's `[start, end)` range, a "Skip intro" / "Skip outro" button appears (outside the auto-hiding
  chrome, the convention users expect) and seeks to the marker's end on click — skipping the intro jumps
  into the show; skipping the outro/credits jumps to the end so the up-next card can advance. New
  `SkipButton` component (position-driven, stateless, emits the seek target); new `introMarker` /
  `outroMarker` props on `<Player>`; new `TimeMarker` type + `player.skipIntro` / `player.skipOutro` i18n keys.
- **Chapter ticks from the server.** `PlayerPage` now maps the playback-info `chapters`
  (`start_seconds` → `start`) onto the Scrubber, so chapter ticks render for real titles.

### Fixed
- **Player/Detail `{ item }` contract drift.** `MediaDetailPage` (and the `PlayerPage` by-id read) were
  treating `GET /api/v1/media/:id` as if it returned a bare `MediaItem`, but the server wraps it as
  `{ item }` — detail pages would have rendered blank against the real backend. Both now unwrap
  `response.item`.
- **Dead playback-info `url` read.** `PlayerPage` read a non-existent `info.url` field from playback-info
  to resolve the stream; playback-info never carried a url. The stream is now always the deterministic
  `/media/:id/stream` direct endpoint (`streamUrlFor`), and playback-info is used only for its real payload
  (markers + chapters). Markers/chapters are best-effort — an absent / 404 playback-info just disables the
  skip buttons + chapter ticks without blocking playback.

### Changed
- **Repo hygiene:** untracked a broken `node_modules` symlink that had been committed into the tree (it
  pointed at its own absolute path — a self-referential loop that broke `node_modules` resolution for
  anyone checking the package out). It is `.gitignore`d as intended now.

## [0.17.0] - 2026-06-03

### Added
- **Cross-device resume (write path) — `useResumeReporter`.** Completes the resume sync started in v0.16.0
  (which only read server positions): the web player now REPORTS its own playback position to the server,
  so a title paused on the web resumes on the TV. `useResumeReporter()` lazily creates a per-browser
  session (`POST /api/v1/sessions`, idempotent per a stable `phlix.deviceId` it generates + persists) and
  reports progress to it (`POST /api/v1/sessions/{id}/progress`, position in 100-ns ticks) — the same
  channel Roku/mobile use, so playback aggregates into the user's `continue-watching`. Throttled (15 s
  checkpoints, plus an immediate one on each play/pause transition) and gated to meaningful, signed-in,
  past-the-30s-floor progress; every step is best-effort (logged-out / sub-threshold / failed reports are
  silent no-ops, with the local resume map as the fallback). Mounted once in the shell, watching the
  shared player store (so it covers both the full player and the mini-player). Exports `useResumeReporter`
  + `UseResumeReporter`. **Requires the server's `POST /api/v1/sessions` create endpoint (phlix-server).**

## [0.16.0] - 2026-06-03

### Added
- **Cross-device resume (read path) — `useResumeSync` + `usePlayerStore.mergeServerResume`.** The web
  player's resume map was localStorage-only, so a title paused on another device (Roku/mobile, which
  report progress through their playback sessions) never surfaced on the web. The new `useResumeSync()`
  composable pulls the user's server-side resume positions from the existing
  `GET /api/v1/users/me/continue-watching` (already aggregated per-user across sessions), converts the
  100-ns `position_ticks` to seconds, and merges them via `usePlayerStore.mergeServerResume()` — which
  uses a **fill-gaps** policy (a local position from this device always wins; server positions only seed
  ids the local map doesn't track, since the local map has no per-id timestamps to reconcile against).
  The shell runs it on sign-in (best-effort; failures leave the local map untouched). The merged map
  feeds both the player's resume prompt and the Browse "Continue Watching" rail. Exports `useResumeSync`,
  `UseResumeSync`, and the `TICKS_PER_SECOND` constant.
  - **Out of scope (follow-up):** the web player reporting its OWN progress back to the server (the write
    path) needs the web player to participate in the session model — deferred so resume isn't fragmented
    across two stores.

## [0.15.0] - 2026-06-03

### Added
- **i18n: the rest of the Settings surface adopts the `useMessages()` seam.** `SettingsPage` (page
  heading + eyebrow + the Appearance/Playback/Server tab strip and its aria-label) and `SettingsForm`'s
  chrome (the `Unsaved` badge, the `Save {group}` button, the load-error EmptyState + Retry, and the
  save/load toasts) now resolve through `t('settings.…')`, extending the `settings` catalog group from
  v0.14.0. Consumer-overridable via `PhlixAppConfig.messages.settings`; omitting it is byte-for-byte
  English. The **technical server-config labels stay inline-English** by design — the 9 SettingsForm
  group names and the per-key labels (e.g. `TMDB API Key`, `Trakt client ID`, `Enable UPnP`) are
  operator-facing config terms (many proper nouns), matching the R6.5c decision to keep enum + admin
  copy English. With this the user-facing Settings chrome is fully i18n-ready; Browse + the admin pages
  remain as the next increments.

## [0.14.0] - 2026-06-03

### Added
- **i18n: the Settings appearance/playback surface adopts the `useMessages()` seam.**
  `AppearanceSettings` now resolves its section titles, control labels, switch + Select aria-labels,
  and the reset control + its toast through `t('settings.…')`, backed by a new `settings` group in the
  message catalog. A consumer can override any of these via `PhlixAppConfig.messages.settings`; omitting
  it renders the byte-for-byte English default. The option *enum* labels
  (theme/accent/density/grid/motion/quality/subtitle-language names) deliberately stay inline-English,
  matching the R6.5c decision for the shortcuts/captions enum labels. Incremental — SettingsForm,
  SettingsPage, Browse, and the admin pages can adopt the same seam next.

## [0.13.0] - 2026-06-03

Reconciles the four hub admin pages with the hub's REAL API. They were built against a guessed
contract (mock-tested) and 404'd against the live hub on every call. Each now hits the correct
`/api/v1/me/*` endpoint and normalizes the hub's real response shape. Pairs with phlix-hub adding
friendly-name fields (`actor`, `collaborator_name`, `shared_library_count`).

### Fixed
- **MyServersPage** → `GET /api/v1/me/servers` (was `/api/v1/servers`). Maps the camelCase
  `ServerInfoDto` (`serverId`/`serverName`/`hostnameCandidates[0]`/`lastSeenAt`); "owner" is the
  signed-in user (servers are user-scoped); library count shows `—` (the hub doesn't track it — it
  lives on the media server).
- **AuditLogsPage** → `GET /api/v1/me/audit-logs` (was `/api/v1/audit-logs`). Switches pagination
  from `page` to the hub's `limit`/`offset` and derives page/total-pages from `total`. Maps fields
  (`event`/`action`, `resource`→target, `reason`→details); `actor` is the hub-enriched name, falling
  back to the user id.
- **ManageSharesPage** → `GET /api/v1/me/shares/` + `DELETE /api/v1/me/shares/{id}` (was
  `/api/v1/shares`). Reads the `{ outgoing }` envelope, maps `permission_level` read|readwrite →
  read|write, converts UNIX-second dates, and shows the enriched `collaborator_name` (falling back to
  the collaborator id).
- **FederationPage** → `GET /api/v1/me/federation/peers`; add-peer now POSTs the hub's `createPeer`
  body (`url` + `name` + `public_key`, all required — the form gained Name + Public key fields); the
  per-row action is **Remove** = `DELETE /api/v1/me/federation/peers/{id}` (works for any status, was
  a connected-only POST `.../disconnect`). Shows the enriched `shared_library_count`; `last_sync` maps
  from `last_connected_at`.

### Added
- `src/api/normalize.ts` — `unixToIso()` helper for the hub's UNIX-second timestamps.

## [0.12.0] - 2026-06-03

Closes the auth holes that surfaced once the SPA became the front door: an unauthenticated visitor
could land on app pages anyway (no route guard), and token refresh hit the wrong URL.

### Added
- **Auth route guard.** `createPhlixApp` installs a `router.beforeEach` that redirects an
  unauthenticated visitor to `login` for every non-public route (public = `login`, `signup`, or any
  route with `meta: { public: true }`), preserving the intended path as `?redirect=`. This stops a
  failed/absent login from "falling through" to the app shell — most visible on the hub, whose
  `/` -> `/app/servers` landing now bounces logged-out users to login. Exported `authGuard` (pure) and
  `PUBLIC_ROUTE_NAMES` for testing/consumers.

### Fixed
- **Token refresh 404'd on both apps.** `ApiClient.refreshToken` POSTed to `/auth/refresh`, but both
  back ends serve `/api/v1/auth/refresh`, so a 401-triggered refresh always failed (silent logout on
  access-token expiry). Now posts to `/api/v1/auth/refresh`.
- **`login`/`signup` no longer report a phantom success.** They now return `isLoggedIn` after
  `fetchUser()` — a back end that accepts the password but fails `/api/v1/auth/me` (which clears the
  tokens) is treated as a failed login, so the form surfaces the error instead of navigating.

## [0.11.0] - 2026-06-03

Fixes the SPA auth/navigation flow that was broken in every host app: route URLs doubled to `/app/app/*`,
the landing at `/app` rendered empty, a successful sign-up crashed with a vue-router "too much recursion"
error, and login failed with "missing required fields: username, password".

### Fixed
- **Router base applied twice → `/app/app/login`, empty `/app`, and a redirect-loop crash.** Every route
  path and nav link already carries the full `routerBase` prefix, yet the router *also* passed
  `routerBase` to `createWebHistory()`, so vue-router prepended `/app` a second time. The history base is
  now `/` (the prefix lives only in the records/links), so URLs resolve once: `login` → `/app/login`,
  browse → `/app`. The self-referential `{ path: '/app/', redirect: '/app' }` record — which ping-ponged
  with the `/app` browse record under non-strict matching and blew the stack on `router.push('/app')`
  (e.g. the post-sign-up redirect) — has been removed; `/app/` still lands on browse via non-strict
  matching. This also un-breaks the never-loaded `/app/admin/*` (server) and `/app/...` (hub) routes.
- **Login now accepts a username OR an email.** `useAuthStore.login(identifier, password)` sends the
  identifier under **both** `username` and `email` keys, so it satisfies `phlix-server` (reads `username`)
  and `phlix-hub` (reads `username` then `email`) regardless of what the user typed. `LoginForm` relabels
  its first field "Username or email" and drops the email-format gate (a bare username is valid).

### Changed
- New i18n keys `auth.usernameOrEmail`, `auth.usernameOrEmailPlaceholder`, `auth.identifierRequired`
  (additive; English defaults, overridable via `PhlixAppConfig.messages`).

## [0.10.0] - 2026-06-03

Mounts the redesigned Vue admin as a navigable **Admin sidebar section** — a new `AdminLayout` plus a
nested `buildAdminRoutes()` — with an admin-gated menu seam (`MenuItem.requiresAdmin`). Additive `0.x`
minor: the only behavior change is `buildAdminRoutes()`'s record shape (16 flat routes → one nested
parent), which no consumer had mounted and which preserves every route name and resolved
`/app/admin/<segment>` URL. `phlix-server` and `phlix-hub` stay on the same MAJOR.

### Added
- **Admin section shell (`AdminLayout`) — mountable Vue admin.** A new `AdminLayout` renders a glass
  sidebar of the admin pages (derived from `adminMenu()`) beside a `<RouterView>`, giving the ported
  admin pages their own navigation chrome. It is the parent route produced by `buildAdminRoutes()`, so a
  consumer that spreads `buildAdminRoutes()` into `extraRoutes` now gets a fully navigable
  `/app/admin/*` section. Lazy-loaded (own chunk); a11y: labelled `nav` landmark, `aria-current` active
  link, `--accent-ring` focus rings, reduced-motion-safe, responsive (the rail becomes a horizontal
  scroller on narrow screens).
- **`MenuItem.requiresAdmin`.** A menu item flagged `requiresAdmin: true` is rendered by the shell only
  for an authenticated admin (`useAuthStore().isAdmin`) — best-effort progressive disclosure for an
  "Admin" entry. The server API stays the real authorization boundary (admin endpoints are gated
  server-side regardless).

### Changed
- **`buildAdminRoutes()` now returns one nested parent route** (rendering `AdminLayout`) with the 16
  admin pages as its children, instead of 16 flat routes. **Every route name and every resolved
  `<base>/admin/<segment>` URL is unchanged**; a bare `<base>/admin` now redirects to the dashboard. No
  consumer mounted the previous flat shape, so this is non-breaking in practice.

## [0.9.0] - 2026-06-03

The **UI Redo** ships as a single aligned release: `@phlix/ui` is rebuilt as a 3-theme "Nocturne"
design system + application shell that both `phlix-server` and `phlix-hub` mount. This is the first tag
the consumers adopt since `v0.7.0` (the interim `v0.8.0` was tagged but never consumed), so it folds in
everything from R0 (design system) through R6 (code-splitting, image/runtime perf, visual + interaction
regression suites, and the a11y/contrast/i18n sweep). A new `README.md` ships with this release.

**Why `0.9.0`, not `1.0.0`:** the package is still pre-1.0. The only API removals (below) are the
internal lazy route-page / `CommandPalette` exports from R6.1 — consumers mount via `createPhlixApp` +
the exported building blocks, so they are unaffected. Under SemVer a `0.x` minor may carry such changes,
and declaring `1.0.0` would be a premature public-API stability commitment immediately after a sweeping
redo (the i18n seam is an explicitly partial, still-expanding adoption). `0.9.0` signals "near-final";
`phlix-server` and `phlix-hub` stay on the same MAJOR.

### Added
- **R6.5c — i18n-readiness seam (`useMessages()` + `PhlixAppConfig.messages`):** an additive, dependency-free,
  SSR-safe way to override the package's user-facing English copy. A new `useMessages()` composable returns
  `t(key, params?)` which resolves a dotted `group.key` (e.g. `t('player.play')`, `t('player.resumeFrom', { time })`)
  against the English `DEFAULT_MESSAGES` catalog overlaid with the consumer's optional **`PhlixAppConfig.messages`**
  (a deep-partial map — override only the strings you want). `{param}` placeholders interpolate; an unknown key
  echoes itself; **omitting `messages` renders the current English UI byte-for-byte.** Adopted across the
  highest-value end-user chrome: the shared primitives' built-in copy (`Spinner` loading label, `Modal`/`ToastHost`
  close + dismiss, `Combobox`/`Select` placeholders + "No matches", toast region label), the app shell
  (skip-link, nav, hamburger, theme toggle, user menu), the command palette + its built-in commands, the auth
  forms incl. validation messages and the password reveal toggle, and the whole Player surface (transport/chrome
  aria-labels, scrubber, volume/speed/quality/captions menus, resume prompt, up-next, transcode notice,
  mini-player, shortcuts overlay). Exports `useMessages`, `UseMessages`, `DEFAULT_MESSAGES`, `createTranslator`,
  `mergeMessages`, and the `PhlixMessages`/`PhlixMessagesConfig`/`MessageGroup`/`MessageKey`/`TranslateParams`/
  `Translate` types. **Scope:** a partial-adoption seam, not a full localization — the lower-traffic
  settings/Browse copy, the operator-facing admin pages, and the shared `shortcuts.ts`/`captions.ts` enum labels
  keep their English defaults and can adopt the same resolver incrementally later. **Additive** (a new optional
  config field + new exports; zero behavior change when `messages` is omitted) → v0.9.0-compatible. The catalog +
  resolver are shell-resident, so the entry bundle is `dist/phlix-ui.js` 56.15 → 56.89 kB (gzip 15.45 → 15.63).
- **R6.2c — `usePreconnect()` + `imageOrigin` config:** a new SSR-safe composable that injects
  `<link rel="preconnect">` + `<link rel="dns-prefetch">` into `document.head` for cross-origin asset hosts
  (`usePreconnect(input, { crossOrigin? })`), so the connection to a poster CDN / image proxy is warmed before
  the first poster is requested. Deduped (within a call and against any host already linked, including a
  consumer's static `<link>`), same-origin / invalid / non-http(s) hosts skipped, and self-cleaning on scope
  dispose. `PhlixAppConfig` gained an optional `imageOrigin` (the poster image origin when it differs from the
  app origin — a CDN/proxy); the shell preconnects it, falling back to the `apiBase` host when `imageOrigin`
  is omitted. Exported from the package (with `UsePreconnectOptions`). The preconnect carries **no**
  `crossorigin` by default — posters are plain no-cors `<img>`, so a CORS preconnect would warm an unusable
  second connection; `crossOrigin: true` is an opt-in for genuine CORS origins (fonts/`fetch`).
- **R6.2b — responsive poster `srcset`/`sizes` (opt-in):** `MediaCard` gained `posterSrcset` and `posterSizes`
  props and now tolerates an optional `poster_srcset` field on `MediaItem` (new `PosterSource` /
  `PosterSrcsetInput` types). Supply a ready-made `srcset` string or an array of sized candidates
  (`{ url, width }` or `{ url, density }`) and the poster `<img>` renders them responsively; with none supplied
  the card is byte-identical to before (the single `poster_url`). It degrades gracefully until an image proxy
  emits sized URLs (the optional server hook §Optional#6, not built).
- **R6.1c — `usePrefetch()`:** a composable returning `prefetch(to)` that warms a route's lazy `() => import()`
  chunk(s) without navigating — call it on a link's `pointerenter`/`focus` so the destination code is already
  in the module cache by click time. Best-effort + idempotent (each loader warmed once; resolve/import failures
  swallowed) and a no-op when no router is installed. `MediaCard` now calls it on hover/focus, warming its
  target route (the Player chunk by default). Exported from the package.
- **R6.1b — `useCommandPaletteHotkey()`:** a tiny always-on composable that owns the global ⌘K / Ctrl-K
  command-palette hotkey (Cmd/Ctrl + K, no Alt → toggle). Exported from the package; mounted once by the shell.
  It keeps the keystroke that opens the palette instant while the palette UI itself becomes a lazy chunk.

### Accessibility
- **R6.5a.2 — admin-surface a11y semantics (the deferred R6.5a follow-up):** the operator-facing admin pages
  now carry the same keyboard/contrast treatment as the end-user chrome. The 9-group admin **Settings** tabs
  adopt the shared `ui/Tabs` primitive (roving tabindex + `aria-selected`/`aria-controls`/`aria-labelledby` +
  the canonical `--accent-ring` focus ring + the `--accent-text` active underline). **Cast Devices** and
  **Live TV** keep their bespoke tablists but gain roving tabindex + arrow/Home/End keyboard navigation +
  `aria-controls`↔`aria-labelledby` tab/panel wiring, with new `--accent-ring` focus rings on the device-type
  tabs, the device cards, the recording-filter tabs, and the EPG program cards. The Live TV EPG program cards
  change from `role="listitem"` to `role="button"` + `aria-pressed` (a selection toggle), and the recording
  filter's results region becomes a labelled `role="tabpanel"`. Admin amber-as-foreground / active-indicator
  sites (the Services hint link, the Live TV section icons, the Settings/Cast tab underlines, the selected
  device-card outline) move from `--accent` to `--accent-text` so projector-amber clears WCAG AA on the light
  Daylight surface; amber **fills** stay `--accent`. Presentation/semantic only — no admin API or behavior
  change — and not user-visible until the admin app mounts the redesigned package at R6.6.
- **R6.5 — accessibility acceptance verified (axe-clean + keyboard walkthrough) → R6.5 COMPLETE:** with the
  R6.5a focus/structure, R6.5b contrast, and R6.5c strings all landed, the phase's acceptance criteria were
  confirmed end-to-end. **Axe-clean:** a new on-demand `npm run test:a11y` suite reports **0 WCAG 2.0/2.1 A+AA
  violations** across every end-user surface × all three themes × desktop+mobile (see Tooling). **Keyboard-only
  walkthrough** (verified live in real Chromium): skip-link reveals and jumps focus to `<main>`; focus order is
  logical on every surface; every interactive control shows a visible focus ring (the daylight `--accent-ring`
  amber-800@.85 on light surfaces, amber-500 on the player's `#000` stage, slider rings on the track/thumb);
  overlays trap focus and restore it on Escape (the user menu, the ShortcutsHelp dialog opened via the `?`
  keymap); the scrubber `role=slider` arrow-seeks (with `aria-valuetext`) and the Appearance radiogroups
  arrow-navigate via roving tabindex; no keyboard traps. (Operator-facing admin a11y semantics remain the
  tracked R6.5a.2 follow-up, landing before R6.6.)
- **R6.5b — WCAG AA color contrast across the three themes:** the label/caption tier (`--text-subtle`) is
  retuned in all three themes so it clears 4.5:1 against `--bg`, `--surface`, and the elevated `--surface-2`
  (where MediaCard meta captions rest); a new **`--accent-text`** token (amber-500 in the dark themes,
  amber-800 in Daylight) carries amber-as-foreground-text — adopted at ~21 end-user / shared-primitive sites
  (shell nav, auth links, command palette, see-all/retry, chips, tabs, selects, toasts, the mini-player close,
  the captions menu) so projector-amber text meets 4.5:1 on the light Daylight surface without changing the
  amber **fill** identity; the Daylight status tones (`--success`/`--warning`/`--error`/`--info`) are darkened
  so badge text clears 4.5:1 on its own translucent `*-bg` tile; and the Daylight focus ring (`--accent-ring`)
  becomes amber-800 @ .85 so the rings added in R6.5a meet the 3:1 non-text-UI bar. Locked by a new static
  WCAG-ratio unit test over the parsed token table (text 4.5 / status incl. tiles 4.5 / ring 3.0 / on-accent
  ink) and verified in real Chromium across the surfaces × themes (computed-contrast pass, 0 failures). The
  dark themes were already compliant for body/secondary text and status tones (unchanged). **Additive** (a new
  CSS token; the dark themes are visually unchanged) → v0.9.0-compatible; the entry bundle is byte-identical
  (`dist/phlix-ui.js` 56.15 kB) and the R6.4 visual baselines stay 42/42. (Admin-page accent-as-text is tracked
  with the R6.5a.2 admin a11y follow-up.)
- **R6.5a — focus rings + landmarks across the end-user chrome:** every hand-rolled control that previously
  showed only a hover state now paints the canonical keyboard focus ring (`box-shadow: 0 0 0 3px
  var(--accent-ring)`) on `:focus-visible` — the player control bar / center play / back button, the persistent
  mini-player, the Up-Next and Resume prompts (composing the amber glow with the ring), the "can't play this
  file" notice, the Browse `FilterBar` chrome (clear-search / sort-order / filters toggle / preset save / clear),
  the row "Retry"/"See all" actions, and the grid "Back to top" button. The app shell gained a **skip-to-content
  link** (revealed on focus, jumps to a focusable `<main id="main">`) and the player scrubber now exposes
  `aria-orientation="horizontal"`. The destructive "Reset preferences" two-click confirm is mirrored into a
  polite `aria-live` region so screen readers announce the armed state. Active navigation links already carry
  `aria-current="page"` (via Vue Router) — now covered by a regression test. No public API change. (Admin-page
  tablist/roving semantics are tracked as a follow-up.)
- **R6.3 — composited scrubber fills + flat-memory scroll proof:** the player's progress + buffered bars now
  animate via a compositor `transform: scaleX()` (origin left) instead of `width`, so the per-frame
  `timeupdate` / drag updates skip layout + paint. The other R6.3 targets were already in place from earlier
  phases (verified, not re-done): the virtual `MediaGrid` windows to a fixed slice + rAF-coalesces scroll
  (R2.2), R3.6's ambient samples on a ~4 Hz-throttled `requestVideoFrameCallback`, player chrome transitions
  are opacity/transform, and `will-change` is dropped to `auto` after the only entrance animation (`Reveal`).
  Verified in real Chromium on a 5000-item harness: the scrubber fill computes `transform: matrix(0.25, …)`
  with no `width`; the grid keeps only ~54–66 cards in the DOM at any scroll position (≈300 k px virtual
  height); the scroll path costs ~0.017 ms/scroll (≈1000× under the 60fps frame budget); CLS 0.00. No public
  API change; the entry bundle is byte-identical (`dist/phlix-ui.js` 56.03 kB).
- **R6.2c — preconnect to the poster image origin:** when posters are served cross-origin (a CDN/image proxy
  via `imageOrigin`, or an absolute `apiBase` host), the shell now preconnects + dns-prefetches that origin at
  startup so the first poster skips the DNS + TCP + TLS handshake latency. A same-origin host is a no-op
  (nothing to warm). This adds a small, justified amount to the entry bundle (the composable is shell-resident
  and a connection hint must run early, so it can't be lazy-loaded): `dist/phlix-ui.js` **54.55 → 56.03 kB**
  (gzip 14.92 → 15.45). Still **0** `INEFFECTIVE_DYNAMIC_IMPORT`.
- **R6.2b — responsive posters fetch the right-sized image:** when sized poster URLs are supplied (via the new
  `posterSrcset` prop or a `poster_srcset` item field), `MediaCard` emits a `srcset` so the browser downloads
  the resolution that fits the device/DPR instead of one fixed poster. For width-descriptor srcsets it also
  emits a safe-by-default `sizes` (the poster's real rendered width, `(max-width: 600px) 45vw, 200px`,
  overridable via `posterSizes`) — so a width-described `srcset` never falls back to the browser's `100vw`
  assumption and over-fetches the largest candidate. `sizes` is never manufactured for density (`x`) srcsets or
  when no responsive sources exist, so the no-sources markup is unchanged (no new attributes, no CLS — the
  `aspect-ratio` box + `loading="lazy"` + `decoding="async"` are retained). The poster `src` stays `poster_url`
  as the non-`srcset` fallback. Pure helper `media-poster.ts`; the entry bundle is unchanged (54.55 kB).
- **R6.2a — off-screen render-skipping for home rails:** the `MediaRow` rail now sets `content-visibility:
  auto` + `contain-intrinsic-size: auto 380px`, so the browser skips rendering and layout for rails scrolled
  off-screen. The Browse home page stacks many rails (`HomeRow`→`MediaRow`); paint/layout work now scales with
  what's near the viewport instead of the rail count. The intrinsic-size reservation keeps the scrollbar and
  scroll position stable (no CLS / scroll-anchor jump), and the `auto` keyword lets the browser substitute each
  rail's real measured height after first render. `auto` (not `hidden`) keeps the content in the accessibility
  tree and find-in-page; containment applies only while a rail is off-screen, so the cards' on-screen hover
  lift/shadow are unaffected. (The library `MediaGrid` is already virtualized — off-screen rows aren't in the
  DOM — so the stacked rails are the right target.) Overridable per consumer via `--media-row-intrinsic-h`.
- **R6.1c — prefetch-on-hover:** hovering or focusing a `MediaCard` now warms its destination route's lazy
  chunk (e.g. the ~41 kB Player chunk) via `usePrefetch`, so the navigation that follows a poster hover is
  instant — recovering the latency that route-level splitting (R6.1a) would otherwise add on first visit.
- **R6.1b — lazy command palette:** `CommandPalette` is now mounted by the shell (`PhlixApp`) via
  `defineAsyncComponent` and only fetched/mounted on first open (the ⌘K hotkey lives in the always-on
  `useCommandPaletteHotkey`). It split into its own ~8 kB on-demand chunk; the main `dist/phlix-ui.js` shrank a
  further **64.85 kB → 54.52 kB** (gzip 17.81 → **14.92 kB**). Combined with R6.1a the initial entry is down
  **202.60 kB → 54.52 kB** (gzip 52.45 → 14.92, **~73% smaller**). Still **0** `INEFFECTIVE_DYNAMIC_IMPORT`.
- **R6.1a — route-level code-splitting:** the 6 built-in route pages (Browse, Media detail, Player, Login,
  Signup, Settings) are now mounted by `createPhlixApp` as lazy `() => import()` route chunks instead of being
  statically bundled into the entry. The main `dist/phlix-ui.js` shrank from **202.60 kB → 64.85 kB** (gzip
  52.45 → **17.81 kB**, ~68% smaller); the entire Player surface (~41 kB) now loads on demand only when the
  player route mounts, and each page is its own chunk. Build emits **0** `INEFFECTIVE_DYNAMIC_IMPORT` warnings.

### Tooling
- **R6.4a — Playwright visual-regression suite (primitive Gallery):** added `@playwright/test` plus a
  `playwright.config.ts` + `e2e/visual.spec.ts` that screenshots the design-system primitive Gallery across all
  three built-in themes (Nocturne / Daylight / Midnight) at desktop (1280) + mobile (390) widths, with committed,
  platform-tagged baselines under `e2e/__screenshots__/`. New `npm run test:visual` / `test:visual:update`
  scripts. It is an **on-demand** suite (deliberately not part of the blocking `build`/`vitest` gate, since PNG
  baselines are environment-fragile and no CI runner is wired yet); a ready-to-enable `.github/workflows/ui-ci.yml`
  artifact (dormant `workflow_dispatch`-only) ships the future gate. Determinism is enforced via
  `reducedMotion: 'reduce'` + `animations: 'disabled'` + a version-pinned Chromium (the v1223 build bundled by
  `@playwright/test@1.60`). Dev-only — no change to the shipped bundle. (Per-surface harnesses + the
  mockup-acceptance sweep are R6.4b; the interaction-regression matrix is R6.4c.)
- **R6.4b — per-surface visual harnesses + baselines:** new dev-only `src/dev/visual/*` harness pages that
  mount the REAL shipped SFCs — Browse (`MediaRow` rail + virtualized `MediaGrid`), `MediaDetail`, `Player`
  chrome, Auth (`LoginForm`/`AuthCard`), Settings (`AppearanceSettings`), and the app shell (`AppLayout` +
  `ThemeToggle`/`UserMenu`) — with deterministic OFFLINE mock data (inline SVG data-URI posters; a tiny
  ffmpeg-built `sample.mp4` so the player `<video>` loads without tripping the transcode guard) and a
  `?theme=` switch, with atmosphere (film-grain/ambient) + motion forced off for stable captures. Wired into
  `e2e/visual.spec.ts` (each surface × 3 themes × desktop/mobile) → **36 committed baselines**; verified
  reproducible (`npm run test:visual` 42/42) and eyeball-accepted in real Chromium against the locked
  `src/dev/mockups/*.html` art direction. Dev-only — the shipped bundle is byte-identical (`dist/phlix-ui.js`
  56.03 kB) and the vitest suite is unchanged (1653). (The interaction-regression matrix is R6.4c.)
- **R6.4c — interaction-regression matrix + gap-fill (→ R6.4 COMPLETE):** audited the four named interaction
  surfaces — player keyboard, filter↔URL sync, theme switch + persistence, command palette — and documented a
  full coverage matrix (in the worklog). The audit confirmed they were already strongly covered; it surfaced
  three genuine, otherwise-untested cross-cutting regressions, each now locked by a **gating** vitest test
  (verified mutation-sensitive): (1) a mounted `Player` ignores **modifier-chord** keys (`⌘K`/Ctrl/Alt) so the
  global command-palette hotkey + OS shortcuts pass through without hijacking playback — the
  `useKeyboardShortcuts` guard was previously tested nowhere; (2) the `Player` **unbinds** its global `keydown`
  listener on unmount (no leaked document listener after a route-leave); (3) a **theme persists across a
  reload** end-to-end — a live `useTheme` change is persisted and re-applied by a fresh `applyStoredThemeEarly`,
  locking that the write-path and read-path agree. Also strengthened the `useMediaUrlSync` teardown test to
  assert both watchers detach. Tests-only — no shipped-source/public-API change; the bundle is byte-identical
  (`dist/phlix-ui.js` 56.03 kB); vitest **1653 → 1656**.
- **R6.5 — axe accessibility suite + keyboard-walkthrough closeout (→ R6.5 COMPLETE):** a new on-demand
  `npm run test:a11y` Playwright suite (`e2e/a11y.spec.ts`, `@axe-core/playwright`) runs axe-core against the
  real shipped SFCs — the R6.4b per-surface harnesses (Browse / MediaDetail / Player / Auth / Settings / shell)
  plus the primitive Gallery — across all three themes × desktop+mobile, asserting **zero WCAG 2.0/2.1 A+AA
  violations** (48 checks). Sequenced last in R6.5 so axe runs against the final R6.5a focus structure, R6.5b
  colors, and R6.5c strings. Like the visual suite it is on-demand (not in the blocking gate) and reuses the
  Vite dev-harness server via Playwright's `webServer`; `settle()` waits for `Reveal` entrances to reach
  `opacity:1` so axe never samples a mid-fade color (a verified animation artifact, not a defect — the badge is
  ~7.6:1 at rest). The one full-page surface (the shell) is additionally asserted clean under axe's
  page-structure landmark best-practice rules (`region` / `landmark-one-main` / `page-has-heading-one` /
  `heading-order`). `test:visual` / `test:visual:update` were narrowed to `playwright test visual` so the two
  on-demand suites stay separate. Dev/tooling-only — no shipped-source change; `dist/phlix-ui.js` byte-identical
  (56.89 kB); vitest unchanged (1711). (Also a dev-only fidelity fix: the `ShellHarness` harness now mirrors
  PhlixApp's canonical `.nav-link:focus-visible` ring it had previously omitted.)

### Removed
- **R6.1b (API surface change — feeds the R6.6 MAJOR decision):** the `CommandPalette` component is **no longer
  re-exported** from the package entry — the shell lazy-loads it via `defineAsyncComponent` (a static re-export
  would re-merge it into the main chunk). The store-level API (`useCommandStore`, `fuzzyScore`, `matchCommand`,
  the `Command` type) and the new `useCommandPaletteHotkey` stay exported; consumers mount the palette via
  `createPhlixApp`, so they are unaffected.
- **R6.1a (API surface change — feeds the R6.6 MAJOR decision):** the built-in route-page components
  `BrowsePage`, `MediaDetailPage`, `PlayerPage`, `LoginPage`, `SignupPage`, and `SettingsPage` are **no longer
  re-exported** from the package entry — they are internal lazy route targets mounted by `createPhlixApp`
  (a static re-export would re-merge them into the main chunk and defeat the split). The reusable building
  blocks they compose (`MediaCard`/`MediaGrid`/`MediaRow`/`MediaHomeRow`/`MediaDetail`/`FilterBar`, `Player`
  + all `player/*` parts, and `LoginForm`/`SignupForm`/`SettingsForm`) plus the 5 long-tail consumer pages
  (`LibraryScanPage`/`MyServersPage`/`FederationPage`/`ManageSharesPage`/`AuditLogsPage`) all remain exported.
  Consumers import only `createPhlixApp` + the long-tail pages, so they are unaffected.

### Fixed
- **Federation "Add peer" form never sent the URL (R5.2c):** the original add-peer `<input>` had no `v-model`
  and the form hardcoded `connectPeer('')`, so connecting a peer always POSTed an empty `url`. The input is now
  bound, so `POST /api/v1/federation/connect` carries the typed URL (same endpoint + `{ url }` payload), with a
  non-empty guard + disabled-until-typed Connect button.
- **Library scan status never rendered (R5.2a):** the live server returns the scan job under `scan_status`
  (not `job`), so the scan-only `LibraryScanPage` always showed an "Idle" badge in production. `loadScanStatus`
  now reads `scan_status ?? job`, accepting both wire shapes per the SPA-layer contract-drift convention, so the
  status badge (and the running/queued Scan-disable) work against the real backend.
- **Player queue — stale stream URL on advance (R3.8):** `usePlayerStore.next()` now accepts an optional
  stream-URL resolver and threads it into `setCurrent`, so advancing to the next queued item no longer
  leaves the previous item's `streamUrl` behind (it resolves a fresh one, or clears it to `''` when
  unresolved — the mini-player gates on `streamUrl`, so it hides rather than playing the wrong media).
- **Media filter wire format:** `useMediaStore` and `buildMediaQuery` now serialize array filters as
  `genres[]=`/`ratings[]=`/`types[]=`/`actors[]=` instead of bare repeated keys. PHP collapses
  `genres=A&genres=B` to the last value (a string) and the server's `is_array()` check drops it, so genre/
  rating/actor filtering silently matched nothing end-to-end (gap report #3b; the server-side `$.genres`
  JSON path + Smarty client were fixed in phlix-server).

### Changed
- **In-body error states for the multi-section admin pages — R5.3 COMPLETE (R5.3d.3):** `DashboardPage`
  (5 sections), `LiveTvPage` (4 lazy sections), and the `ServicesPage` wording/`errMessage` nit. Each section
  now renders an in-body `EmptyState` (alert icon + "Couldn't load X" + the error message + a Retry that re-runs
  that section's loader) on a load failure, before the empty state. `DashboardPage` adopts the shared
  `errMessage` (replacing its raw-string toasts) — its activity load-more failure keeps the already-loaded list
  (toast only) and its 30s now-playing refresh clears the section error on a successful poll; `ServicesPage`
  adopts `errMessage` (replacing 4 inline `e instanceof Error ? …` ternaries) and its Trakt/Last.fm error cards
  gain the "Couldn't load X" title + the error detail + a Retry. This is the final R5.3d batch: **all 16 admin
  pages now have skeleton + empty + an in-body error on every async surface, with no bare "Failed/Unable to
  load" string used as the error UX — R5.3 (empty/loading/error system pass) is COMPLETE.**
- **In-body error states for the single-list/status admin pages (R5.3d.2):** `HistoryPage`, `SyncPlayPage`,
  `BackupPage`, `CastDevicesPage`, and `DlnaServerPage` previously fell through to their empty/empty-list
  `EmptyState` (a misleading "nothing here") + a toast when a load FAILED. Each load now renders an in-body
  `EmptyState` (alert icon + "Couldn't load X" + the error message + a Retry that re-runs that loader) before
  the empty state, matching R5.3c/R5.3d.1. `BackupPage` gets independent error states for both its backups list
  and its schedule section (a schedule load failure used to render nothing at all); `CastDevicesPage` gets a
  per-tab error state (Chromecast / AirPlay independently) via a `currentError` computed; and `DlnaServerPage`
  also adopts the shared `errMessage` (replacing its three inline `e instanceof Error ? … : …` ternaries).
  Second batch of the R5.3d admin-port error-state retrofit.
- **In-body error states for the single-list admin pages (R5.3d.1):** `LibrariesPage`, `UsersPage`,
  `CollectionsPage`, and `WebhooksPage` previously fell through to their empty-list `EmptyState` (a misleading
  "nothing here") + a toast when the main list load FAILED. Each now renders an in-body `EmptyState` (alert
  icon + "Couldn't load X" + the error message + a Retry) before the empty-list state, matching R5.3c. First
  batch of the R5.3d admin-port error-state retrofit.
- **In-body section error states across the multi-section admin pages (R5.3c):** the admin `SettingsPage`,
  `IntegrationsPage`, `LogsPage`, and `RemoteAccessPage` previously surfaced a *section* load failure
  toast-only — leaving the body blank (Settings rendered an empty/broken tab form), silently rendering as if
  loaded (Integrations auth-providers showed every provider "Disabled"; Logs showed a misleading "(no log
  files)" / "(no output)"), or showing a static "Unable to load" line with no recovery. Each async surface now
  has a skeleton + empty + an in-body `EmptyState` (alert icon + "Couldn't load X" + the error message + a
  Retry that re-runs that section's loader), consistent with the R5.2 pages; `LogsPage` also adopts the shared
  `errMessage` (replacing its inline ternaries + raw strings) and gains a file-list loading skeleton. Completes
  the R5.3 empty/loading/error system pass for the admin surface.
- **Shared `errMessage` adopted package-wide (R5.3b):** the 16 page-local `errMessage` copies (the 5 top-level
  hub/server pages + the 11 admin pages) and `useMediaStore` now import the single `errMessage` from
  `src/api/errors.ts` (added in R5.3a) instead of each carrying a byte-identical private copy — one
  error-formatting vocabulary across the app, and the network-aware `NetworkError`/`TimeoutError` messages now
  reach every page for free. `useMediaStore`'s old inline (`e instanceof Error ? e.message : 'Failed to load
  media'`) lacked the empty-message guard, so an `Error` with a blank message used to set a silent empty error
  string; it now falls back to the friendly "Failed to load media". (Out-of-scope inline ternaries that were
  never a named `errMessage` copy — e.g. `useAuthStore`, `SettingsForm`, a few admin/detail pages — are left
  for a later sweep.)
- **Browse error surface → canonical `EmptyState` (R5.3b):** `BrowsePage`'s bespoke `.browse-error` div +
  `.browse-retry` button are replaced by the shared `EmptyState` (alert icon, "Couldn't load titles", the error
  message as the description, and a Retry `Button` that re-runs the grid load), matching the
  loading/empty/error pattern the R5.2 pages already use. Part of the R5.3 empty/loading/error consistency pass.

### Added
- **Network resilience + a shared error vocabulary (R5.3a):** `ApiClient` now enforces a per-request
  **timeout** (`ApiClientOptions.timeoutMs`, default 15 s) and maps low-level failures to friendly, typed
  errors — a dropped/refused connection (or `navigator.onLine === false`) becomes a `NetworkError`
  ("You appear to be offline…") and an exceeded timeout becomes a `TimeoutError` ("The request timed out…"),
  instead of leaking an opaque `TypeError: Failed to fetch`. A caller-initiated `AbortSignal` cancellation is
  still surfaced as an `AbortError` (so `useMediaStore`'s supersede logic is unchanged), and `ApiError` (non-2xx)
  passes through with its status untouched. New `src/api/errors.ts` exports `NetworkError`, `TimeoutError`, a
  shared `errMessage(e, fallback?)` (the helper previously copy-pasted into ~16 pages — adopted package-wide in
  R5.3b) and `isOffline()`; a new `useOnline()` composable exposes a reactive, SSR-safe `navigator.onLine`.
  `ApiError` moved into `errors.ts` but is still re-exported from `./api/client`, so deep imports are unchanged.
- **`AuditLogsPage` re-skin (R5.2e):** the hub's paginated audit-log viewer `src/pages/AuditLogsPage.vue` is
  rebuilt on the Nocturne tokens + `@phlix/ui` primitives (presentation-only — its `GET /api/v1/audit-logs?page=N`
  → `{ logs, total, page, total_pages }` flow + pagination are unchanged). Logs render in a tokenized table
  (Action / Actor / Target / Details / IP / Time) with a `Skeleton` loading state, `EmptyState` for the empty
  list + a load error (with Retry), `Button` pagination (Previous / Next with chevron icons, disabled at the
  ends), and `useToastStore` feedback on load failure. The action is now a category-toned `Badge` (create →
  success / delete → error / update → info / login → accent / else → neutral), **replacing the old raw-hex
  coloured square with an ASCII-glyph (`+`/`-`/`~`/`@`/`#`) icon**. A `client?: ApiClient` test seam is added.
  **This completes R5.2 — all five long-tail app pages are now on the redo surfaces and counted in coverage.**
- **`ManageSharesPage` re-skin (R5.2d):** the hub's library-shares page `src/pages/ManageSharesPage.vue` is
  rebuilt on the Nocturne tokens + `@phlix/ui` primitives (presentation-only — its `GET /api/v1/shares` and
  `DELETE /api/v1/shares/:id` flows are unchanged). Shares render in a tokenized table (Library / Shared with /
  Permissions / Created / Expires / Actions) with a `Skeleton` loading state, `EmptyState` for the empty list +
  a load error (with Retry), a `Badge` permission tone (read → info / write → success) and an error `Badge` for
  expired shares — replacing the old raw-hex permission/expired/danger colors — plus `useToastStore` feedback on
  revoke + load. Revoke updates the table in place (no skeleton flash). A `client?: ApiClient` test seam is added.
- **`FederationPage` re-skin (R5.2c):** the hub's peer-federation page `src/pages/FederationPage.vue` is
  rebuilt on the Nocturne tokens + `@phlix/ui` primitives (presentation-only — its `GET /api/v1/federation/peers`,
  `POST …/connect` and `POST …/peers/:id/disconnect` flows are unchanged). Peers render in a tokenized table
  (Peer + url / Shared libraries / Last sync / Status / Actions) with a `Skeleton` loading state, `EmptyState`
  for the empty list (the add-peer form still shows) and a load error (with Retry), a `Badge` connection-status
  tone (connected → success / disconnected → error / pending → warning) replacing the old raw-hex status dot,
  and `useToastStore` feedback on connect / disconnect / load. Disconnect is offered only for connected peers
  (faithful to the original); action-triggered reloads update in place instead of flashing the skeleton. A
  `client?: ApiClient` test seam is added.
- **`MyServersPage` re-skin (R5.2b):** the hub's connected-media-servers page `src/pages/MyServersPage.vue`
  is rebuilt on the Nocturne tokens + `@phlix/ui` primitives (presentation-only — its `GET /api/v1/servers`
  flow is unchanged). Servers now render in a tokenized table (Server + url / Owner / Libraries / Last seen /
  Status / Actions) with a `Skeleton` loading state, an `EmptyState` for both the empty list (with an Add-server
  action) and a load error (with Retry), a `Badge` connection-status tone (online → success / offline → error /
  connecting → warning) replacing the old raw-hex status dot, and `useToastStore` feedback on load failure. The
  per-row "Manage" and "Add server" buttons remain pre-existing placeholders (no endpoint/route yet). A
  `client?: ApiClient` test seam is added (defaults to the shared `api` singleton).
- **`LibraryScanPage` re-skin (R5.2a):** the server app's standalone scan page `src/pages/LibraryScanPage.vue`
  is rebuilt on the Nocturne tokens + `@phlix/ui` primitives (presentation-only — its `GET /api/v1/libraries`,
  `…/scan-status`, `POST …/scan`, `POST …/rescan` flows are unchanged). Libraries now render in a tokenized
  table (Library + paths / Type / Items / Last scan / Status / Actions) with a `Skeleton` loading state, an
  `EmptyState` for both the empty list and a load error (with Retry), `Badge` status tones (replacing the old
  ⏳🔄✅❌ emoji), `Button` Scan/Rescan actions disabled while a scan is running/queued, and `useToastStore`
  feedback on scan/rescan success + failure. A `client?: ApiClient` prop is added purely as a test seam
  (defaults to the shared `api` singleton — production behavior is identical).
- **Cross-app shell redesign (R5.1):** `AppLayout.vue` — the last `--color-*`-bearing shell file — is rebuilt
  into the redesigned **glass marquee top bar** over the Nocturne atmosphere. It now mounts `AppBackdrop` once
  for every in-shell page (gated on `prefs.atmosphere`), exposes `#logo` / `#nav` / `#actions` / `#footer`
  slots, and below a 720px breakpoint collapses the nav behind a hamburger into the focus-trapped `Sheet`
  drawer (the same `#nav` slot rendered in both the bar and the drawer). New `src/app/ThemeToggle.vue` cycles
  the theme (nocturne → daylight → midnight) live, and new `src/app/UserMenu.vue` is a focus-trapped account
  popover (signed in: name + Settings + Sign out via `useAuthStore.logout`; signed out: Sign in) with
  `routerBase`-aware links. `PhlixApp.vue` composes the brand (wordmark + amber dot) + nav (from `config.menu`
  only, `safeHref`-sanitized) + the actions cluster (⌘K launcher + theme toggle + user menu) into the shell.
  All from config — never `if (app === …)`. Not mounted in the live consumers until R6.6.
- **Settings + Appearance redesign (R4.2):** the settings surface is rebuilt on the Nocturne tokens +
  a11y primitives and now exposes the full customization. New `src/components/AppearanceSettings.vue`
  surfaces `usePreferencesStore` as **live, persisted** controls across two panels — *Appearance* (a theme
  gallery whose swatches re-scope `[data-theme]` to preview each theme live, an accent picker driving
  `deriveAccentVars`, density / grid-density / card-size / atmosphere / reduced-motion) and *Playback*
  (autoplay, default volume / quality / subtitle language, and the R3.5 caption style). Every control writes
  straight to the store, which persists to localStorage and reflects theme/accent/density onto `<html>`
  instantly (no Save button). The theme + accent radiogroups use roving-tabindex + arrow-key navigation, and
  "Reset all preferences" is a deliberate two-step confirm. `SettingsForm` (the schema-driven server
  settings, `GET/PUT /api/v1/users/me/settings`) is rebuilt on `Switch` / token inputs / `Skeleton` /
  `EmptyState` with **per-section dirty + save** — each group saves just its own keys and toasts
  success/failure (fixing a latent bug where four groups whose key prefix differs from the group name —
  transcoding/metadata/markers/scrobblers — would have rendered empty + unsaveable). `SettingsPage` hosts
  the three panels under the `Tabs` primitive (Appearance / Playback / Server). Not mounted in the live
  consumers until R6.6.
- **Auth surface redesign (R4.1):** `LoginForm`/`SignupForm` + `LoginPage`/`SignupPage` rebuilt on the
  Nocturne design tokens + a11y primitives, replacing the legacy `--color-*` aliases and the last 🙈/👁
  password-toggle emoji. A cinematic glass "ticket-stub" card (`src/components/auth/AuthCard.vue`) — projector-
  beam top hairline + film-sprocket rail signatures, a branded wordmark lockup sourced from
  `phlixConfig.branding`, reduced-motion-aware load — hosts accessible fields (`src/components/auth/AuthField.vue`:
  labelled inputs, `aria-invalid`/`aria-describedby`/`aria-live` validation, and an in-field `eye`/`eye-off`
  reveal toggle as a real `aria-pressed` button). Client-side validation (email format, username ≥ 3,
  password ≥ 8, password match) blocks submit; failures raise both an inline `role="alert"` banner and an error
  **toast**. A config-driven `#oauth` slot renders an "or continue with" SSO region only when a consumer
  provides it (forwarded `LoginPage`/`SignupPage` → form). The pages mount the `AppBackdrop` atmosphere +
  a static amber "booth" glow (gated on `prefs.atmosphere`) and center the card. The `useAuthStore.login`/
  `signup` flow is unchanged; the success redirect + cross-links are `routerBase`-aware. Not mounted in the
  live consumers until R6.6.
- **Player page — full integration (R3.9):** the `/app/player/:id` route now drives the redesigned player
  end-to-end. `src/pages/PlayerPage.vue` (rebuilt from the legacy skeleton onto the redo surfaces + design
  tokens) fetches the title and resolves the playable URL — preferring a `GET /api/v1/media/:id/playback-info`
  `{url}` hint, falling back to the direct `/media/:id/stream` endpoint (the hint is best-effort; a slow or
  absent one never blocks playback). It supplies `<Player>` a synchronous **`streamUrlFor`** resolver so the
  R3.8 up-next auto-advance threads a fresh stream URL, and builds a genre-scoped **up-next queue**
  (`usePlayerStore.setQueue`) so the up-next card + autoplay have something to advance to. **Play-next**
  navigates the route to the next id (the URL stays correct; the page re-loads the title + a fresh queue).
  **Mini-player handoff** — leaving the player route hands playback to the persistent `MiniPlayer`
  (`onBeforeRouteLeave` → `usePlayerStore.showMiniPlayer()`); entering/expanding reclaims it
  (`hideMiniPlayer()`), so audio/video continues across navigation (param changes between player items keep
  the full player). Adds a poster-derived **ambient backdrop** (the `url()` value escaped against
  CSS-injection, like the scrubber's thumbnail), plus loading-skeleton, error (Retry/Back) and theater
  states, and an AbortController + `disposed` fetch lifecycle (re-fetches on route-id change). Resume restores
  on open via the R3.8 prompt. **→ R3 (Player) phase COMPLETE.**
- **Player — Resume + Up-Next + autoplay + "needs transcode" notice (R3.8):** the player's three closing
  moments. **Resume on open** — when the persisted resume map holds an in-band position (30s–95%) for the
  current media, a `ResumePrompt` (`src/components/player/ResumePrompt.vue`) offers **Resume** (seeks to the
  stored second + plays; deferred to `loadedmetadata` when the duration isn't known yet) or **Start over**
  (seeks 0, clears the resume, plays); it auto-dismisses once playback begins. **End-of-video Up-Next** —
  on the `<video>` `ended` event with a queued item, an `UpNext` card (`src/components/player/UpNext.vue`,
  a port of the locked mockup: glass card, poster thumb, amber depleting countdown ring) appears; when
  `usePreferencesStore.autoplay` is on it counts down from 8s and auto-advances via
  `usePlayerStore.next(...)`, when off it's a static card with a manual **Play now** (plus **Cancel**). A
  new `Player.vue` emit **`play-next(media)`** + optional prop **`streamUrlFor`** let the host resolve the
  next item's stream (R3.9). **Direct-play guard** — a `TranscodeNotice`
  (`src/components/player/TranscodeNotice.vue`) replaces the silent black frame when a file can't be played
  in the browser, detected proactively by container extension (mkv/avi/wmv/ts/… on the stream URL **or** the
  library path) and reactively on a fatal `<video>` error (decode / src-not-supported); the center play +
  controls are suppressed under it. New pure, DOM-free helpers **`src/components/player/playback.ts`**
  (`extensionOf`, `needsTranscode`, `isFatalMediaError`, `ringDashoffset` + the up-next / ring constants).
  `ResumePrompt`, `UpNext`, `TranscodeNotice`, and the `playback` helpers are exported.
- **Player — Picture-in-Picture + Media Session + persistent mini-player (R3.7):** wires the (previously
  present-but-unused) `usePlayerStore` Media-Session / mini-player seam. `Player.vue` gains a real
  **Picture-in-Picture** toggle on its `<video>` (`requestPictureInPicture`/`exitPictureInPicture`,
  rejection-swallowed) with a control-bar PiP button that is **hidden where PiP is unsupported**
  (`document.pictureInPictureEnabled`), `enterpictureinpicture`/`leavepictureinpicture` tracked into the
  button state, and the `i` shortcut routed to it (still `emit('pip')` for host hooks). **Media Session** is
  bound on mount (`usePlayerStore.bindMediaSession` → OS/lock-screen play/pause/seek drive the element, torn
  down on unmount) and **position state** is pushed to the OS scrubber on `loadedmetadata`/`timeupdate` via a
  new **`usePlayerStore.setMediaPositionState()`**. New **`MiniPlayer`** (`src/components/MiniPlayer.vue`) is a
  persistent docked mini-player driven entirely by the store: mounted once in the app shell
  (`PhlixApp.vue`, sibling of `<RouterView>`) so it **survives route changes**, it plays its own `<video>`
  from the stored position (resuming exactly where the full player left off), mirrors play/pause with the
  store both ways, shows a thin progress bar + title, and offers play/pause · expand (navigates to the full
  player) · close (`closePlayer`). The store gains a **`streamUrl`** ref (set via `setCurrent(media, {
  streamUrl })`, cleared by `closePlayer`) so the mini-player continues the exact stream. `MiniPlayer` is
  exported. (The route-leave → `showMiniPlayer()` trigger + real stream-URL resolution land with the
  PlayerPage integration, R3.9.)
- **Player — Ambient ("Ambilight") + theater/fullscreen modes (R3.6):** the player now renders a live,
  poster/frame-derived ambient glow behind the video. New **`AmbientCanvas`**
  (`src/components/player/AmbientCanvas.vue`) samples a heavily-downscaled copy of the current frame
  (32×18) on a throttled `requestVideoFrameCallback` loop (~4 Hz; a `setInterval` fallback while playing
  when rVFC is absent) and paints a layered radial-gradient glow that spills beyond the framed video box.
  It is **fully disable-able** — off when `usePreferencesStore.atmosphere` is false, under reduced-motion,
  or under a best-effort battery-saver heuristic (`navigator.getBattery()`, discharging ≤ 20%) — and
  degrades to a static fallback glow (with NO loop) under jsdom / SSR / no-canvas / tainted cross-origin
  frames. New pure helpers **`src/components/player/ambient.ts`** (`averageRegion`, `sampleAmbient`,
  `ambientGradient`, `rgbString`/`rgbaString`, `isBatterySaving` + the sample-size / cadence constants).
  **Theater mode** is now wired: the **`t` shortcut** and a new control-bar theater button (`aria-pressed`)
  toggle a widened, edge-to-edge layout with a brighter ambient surround and emit `theater(active: boolean)`
  so the host page can widen its column + dim the surroundings (PlayerPage, R3.9). True fullscreen is
  unchanged. `Player.vue`'s root was restructured into a non-clipping positioning wrapper with the framed
  video in a `.player__stage` so the glow can extend past the frame. `AmbientCanvas` + the ambient helpers
  are exported.
- **Player — Captions / subtitles UX (R3.5):** captions are now a first-class, customizable surface.
  New **`CaptionOverlay`** (`src/components/player/CaptionOverlay.vue`) renders the active track's WebVTT
  cues in a CUSTOM overlay (the selected track is set to `mode='hidden'` — parsed, not natively painted —
  and we draw the cues) so the full caption style applies; cue text is markup-stripped + entity-decoded and
  rendered as TEXT (never `v-html`), and it lifts above the control bar while the chrome shows. New
  **`CaptionsMenu`** (`src/components/player/CaptionsMenu.vue`) is the control-bar **CC button** (icon
  reflects on/off) opening a focus-trapped popover (`role=dialog`, Esc / outside-click close, returns focus):
  a subtitle-track radio list (Off + each track, roving tabindex + arrow-key nav) that drives
  `usePlayerStore.subtitleLang` and persists `usePreferencesStore.defaultSubtitleLang`, a best-effort
  audio-track radio list (shown only when the browser exposes >1 `audioTracks`), and four caption-style
  `Select`s. New pure helpers **`src/components/player/captions.ts`** (track enumeration, `resolveTextTrack`/
  `hasActiveCaptions`, `applyTrackModes`, `applyAudioTrack`/`activeAudioIndex`, `cleanCueText`/
  `readActiveCueLines`, `captionStyleVars`/`edgeShadow` + the menu option lists). `Player.vue` wires the
  overlay + menu, enumerates text/audio tracks on `loadedmetadata` + `addtrack`/`removetrack`, makes the
  **`c` shortcut** a real on/off session toggle (restoring the last language), and suppresses the global key
  map while the menu is open. Caption appearance (size / color / background / edge) persists via a new
  **`CaptionStyle`** preference (`usePreferencesStore.captionStyle` + `DEFAULT_CAPTION_STYLE`); captions are
  **off by default unless `defaultSubtitleLang` matches an available track**. All new symbols exported.
- **Admin port — Settings (RA.16):** new **`AdminSettingsPage`** (`src/pages/admin/SettingsPage.vue`) — the
  ADMIN server-settings page: 9 group tabs (~19 keys) with per-key type-driven editors (bool→Switch,
  int/float→number, password→masked with show/hide, string→text/select), dirty tracking + save-only-changed,
  per-field 400 validation errors, and a "custom" override badge. Backed by **`AdminSettingsApi`**
  (`src/api/admin/settings.ts`, `/api/v1/admin/settings`). This restores the admin server settings surface
  (gap #2's admin half). Exported; wired into the admin route/menu seam.
- **Admin port — Libraries (RA.15):** new **`AdminLibrariesPage`** (`src/pages/admin/LibrariesPage.vue`) —
  full libraries CRUD (create with name + type + paths, edit [type read-only], delete confirm) plus scan /
  rescan / match-metadata with live scan-status polling and a scan-history modal. Supersedes the scan-only
  LibraryScanPage. Backed by **`AdminLibrariesApi`** (`src/api/admin/libraries.ts`, `/api/v1/libraries*`)
  with `LIBRARY_TYPES`. Paths are entered one-per-line (the React filesystem PathPicker is not ported).
  Exported; wired into the admin route/menu seam.
- **Admin port — SyncPlay (RA.14):** new **`AdminSyncPlayPage`** (`src/pages/admin/SyncPlayPage.vue`) —
  SyncPlay groups list (members, playing/idle status, password badge), create group + join/leave actions.
  Backed by **`AdminSyncPlayApi`** (`src/api/admin/syncPlay.ts`, `/api/v1/syncplay/groups*`). Exported;
  wired into the admin route/menu seam.
- **Admin port — Watch history (RA.13):** new **`AdminHistoryPage`** (`src/pages/admin/HistoryPage.vue`) —
  recently-watched list (thumbnail/title/type/progress + relative time), a Continue action (emits `continue`
  with the media id for the host to route), per-item remove, and clear-all (confirm). Backed by
  **`AdminHistoryApi`** (`src/api/admin/history.ts`, `/api/v1/users/me/recently-watched` + `/history*`).
  Exported; wired into the admin route/menu seam.
- **Admin port — Collections (RA.12):** new **`AdminCollectionsPage`** (`src/pages/admin/CollectionsPage.vue`)
  — collections table, create/edit/delete (`Modal`), an items modal (membership list, remove item, bulk-add
  by query), and per-row refresh. Backed by **`AdminCollectionsApi`** (`src/api/admin/collections.ts`,
  `/api/v1/collections*`). Exported (its `MediaItem` re-exported as `CollectionMediaItem` to avoid clashing
  with the core media type); wired into the admin route/menu seam. (The smart-playlist CRUD that the React
  page also embedded is deferred — it needs its own `smartPlaylists` API + a `RuleBuilder` primitive.)
- **Admin port — Live TV / DVR (RA.11):** new **`AdminLiveTvPage`** (`src/pages/admin/LiveTvPage.vue`) —
  four sections: Tuners (list/scan/enable-disable/delete), Guide/EPG (day switch + programme expand),
  Recordings (list/schedule/delete with tabs), and Series Rules (list/create/delete). Backed by
  **`AdminLiveTvApi`** (`src/api/admin/liveTv.ts`) porting all 19 React LiveTvApi methods
  (`/api/v1/admin/livetv/*`). Exported; wired into the admin route/menu seam.
- **Admin port — Remote access (RA.10):** new **`AdminRemoteAccessPage`** (`src/pages/admin/RemoteAccessPage.vue`)
  — four remote-access sections: Hub enrollment (status + pairing modal: claim-code → poll → complete →
  unenroll), subdomain claim/release, relay enable/disable/ping, and port-forward status/candidates/toggle.
  Backed by **`AdminRemoteAccessApi`** (`src/api/admin/remoteAccess.ts`) covering all 16 `/api/v1/admin/*`
  remote-access endpoints. Exported; wired into the admin route/menu seam.
- **Admin port — DLNA server (RA.9):** new **`AdminDlnaServerPage`** (`src/pages/admin/DlnaServerPage.vue`)
  — DLNA media-server status (running/stopped/not-configured) with a start/stop toggle. Backed by
  **`AdminDlnaServerApi`** (`src/api/admin/dlnaServer.ts`, `/api/v1/admin/dlna/*`). Exported; wired into the
  admin route/menu seam.
- **Admin port — Cast devices (RA.8):** new **`AdminCastDevicesPage`** (`src/pages/admin/CastDevicesPage.vue`)
  — Chromecast + AirPlay device tabs: device list + selection, playback-state display, and transport
  controls (play/pause/stop; seek on Chromecast only). Backed by **`AdminCastApi`**
  (`src/api/admin/cast.ts`) consolidating the deleted React `cast` + `airplay` modules (`/api/v1/cast/*`,
  `/api/v1/airplay/*`; `airPlayPlay`→`/resume`, `castSeek` posts `{position_ms}`). Exported; wired into the
  admin route/menu seam. (Roku/DLNA tabs from the React page are out of scope here — DLNA is RA.9; Roku has
  no admin surface in the RA inventory.)
- **Admin port — Backup (RA.7):** new **`AdminBackupPage`** (`src/pages/admin/BackupPage.vue`) — backup
  list (size/date/storage location), create with optional label, delete + restore (both behind confirm
  modals), optional upload-to-S3, and a schedule config form (interval/retention with next-run display).
  Backed by **`AdminBackupApi`** (`src/api/admin/backup.ts`, `/api/v1/admin/backup/*`). Exported; wired
  into the admin route/menu seam.
- **Admin port — Integrations (RA.6):** new **`AdminIntegrationsPage`** (`src/pages/admin/IntegrationsPage.vue`)
  — Arr-sync (TRaSH-Guides) status + manual trigger (30s timeout toast) + auto-sync toggle, plus OIDC and
  LDAP auth-provider enable/disable and config modals (OIDC provider URL/client; LDAP host/port/SSL/base-DN/
  bind-DN/bind-password with masking + omit-blank-to-keep, and a test-connection action). Backed by
  **`AdminIntegrationsApi`** (`src/api/admin/integrations.ts`) consolidating the deleted React `arrSync` +
  `authProviders` (OIDC/LDAP) modules (`/api/v1/admin/arr-sync*`, `/api/v1/admin/auth-providers*`). Exported;
  wired into the admin route/menu seam.
- **Admin port — Services (RA.5):** new **`AdminServicesPage`** (`src/pages/admin/ServicesPage.vue`) —
  Trakt.tv + Last.fm connect/disconnect cards (connected state + username, disconnect with confirm/refetch,
  connect via full-page redirect to the server OAuth/connect URLs). Backed by **`AdminServicesApi`**
  (`src/api/admin/services.ts`) consolidating the deleted React `TraktApi` + `LastfmApi`
  (`/api/v1/admin/{trakt,lastfm}/*`). Exported; wired into the admin route/menu seam.
- **Admin port — Webhooks (RA.4):** new **`AdminWebhooksPage`** (`src/pages/admin/WebhooksPage.vue`) —
  webhook subscription admin: list, create/edit/delete (`Modal`), per-category event selection with
  client-side validation, masked secret with show/hide (omitted from the update body when left blank so
  the server keeps the existing one), and a per-webhook test-fire showing success/failure counts. Backed
  by **`AdminWebhooksApi`** (`src/api/admin/webhooks.ts`, `/api/v1/admin/webhooks*` CRUD + `/test`) with
  the `WEBHOOK_EVENT_CATEGORIES`/`SUBSCRIBABLE_EVENTS` catalog. Exported; wired into the admin route/menu seam.
- **Admin port — Users/Profiles (RA.3):** new **`AdminUsersPage`** (`src/pages/admin/UsersPage.vue`) —
  user table with create/edit/delete (`Modal`), admin promote/demote, reset-password (reveals the
  generated value + copy), and per-user **profiles** management (add/edit/delete, ≤5-profile limit, PIN
  set/clear with 4-or-6-digit validation, parental rating). Backed by **`AdminUsersApi`**
  (`src/api/admin/users.ts`, `/api/v1/admin/users*` + `/profiles*`). Exported; wired into the admin
  route/menu seam.
- **Admin port — Dashboard (RA.2):** new **`AdminDashboardPage`** (`src/pages/admin/DashboardPage.vue`) —
  Now Playing (live sessions + progress), Top Users (30d), Top Media, Storage breakdown, and an Activity
  feed with load-more; a 7/30/90-day range selector and 30s now-playing auto-refresh. Backed by
  **`AdminDashboardApi`** (`src/api/admin/dashboard.ts`, `/api/v1/admin/dashboard/*`) which carries the
  React admin's server→SPA field-drift normalisers (accepts both `username`/`user_name`,
  `title`/`media_title`, `stream_id`/`session_id`, … so it survives the known dashboard contract drift).
  Wired into the admin route/menu seam; exported.
- **Admin port — Logs + scaffolding (RA.1):** begins restoring the admin surfaces orphaned when the React
  `admin-ui/` was deleted. New **`AdminLogsPage`** (`src/pages/admin/LogsPage.vue`) — list + tail server
  logs (incl. an "All logs" merged view), line-count + 5s auto-refresh, on the a11y primitives; backed by
  **`AdminLogsApi`** (`src/api/admin/logs.ts`, `GET /api/v1/admin/logs*`). New **`buildAdminRoutes(base?)`**
  + **`adminMenu(base?)`** mount seam (`src/app/admin.ts`) so a consumer spreads admin routes/menu via
  `extraRoutes`/`menu` (no `if (app === …)`); lazily-imported chunks. Exported from the package root.
- **Volume + speed + quality controls (R3.4):** three control-bar pieces on the a11y primitives —
  **`VolumeControl.vue`** (mute toggle + `Slider` with **mute memory**: muting keeps the stored volume and
  the slider shows 0, unmute restores; dragging to 0 mutes; volume persists to
  `usePreferencesStore.defaultVolume`), **`SpeedMenu.vue`** (`Select` 0.25–2× → `usePlayerStore.rate`,
  in sync with the `<`/`>` shortcuts), and **`QualityMenu.vue`** (`Select` of server-supplied quality
  variants — **renders nothing when none are provided**; selection persists to `defaultQuality`). All
  keyboard-navigable; selections survive reload. `Player.vue` gains a `qualities` prop and wires the three
  into the control row. (Audio/subtitle track pickers land with captions in R3.5.) a full player key map — Space/`k` play-pause, `←/→` ±5s,
  `j/l` ±10s, `,`/`.` frame-step (paused), `↑/↓` volume, `m` mute, `f` fullscreen, `c` captions, `t`
  theater, `i` PiP, `0–9` seek-to-%, `<`/`>` speed, `?` help. Lives in `src/components/player/shortcuts.ts`
  (`PLAYER_SHORTCUTS` single source of truth, pure `handleShortcut`, `useKeyboardShortcuts` composable)
  and **suppresses shortcuts while typing in inputs** and ignores Ctrl/Meta/Alt chords; Space defers to a
  focused button. New **`ShortcutsHelp.vue`** dialog (toggled by `?` or a control-bar button) lists every
  binding, focus-trapped (`useFocusTrap`), Esc/backdrop/close dismiss, and renders arrow keys as **SVG
  arrow icons** (never glyphs). `Icon` gains `arrow-right`. Player shortcuts are suppressed while the help
  modal is open. Captions/theater/PiP keys emit events for the later steps that implement them. new **`Scrubber.vue`** (`src/components/player/`) — a buffered range behind the
  played fill, a draggable head, **chapter ticks**, and a hover/drag **scrub preview** (a thumbnail when
  the host supplies a `thumbnailAt(seconds)` source, else a formatted timestamp bubble). Pointer-events
  based so mouse + touch drag identically (`touch-action:none`); emits `seek` (absolute seconds) live
  during a drag plus `scrub-start`/`scrub-end` (the Player suspends chrome auto-hide while scrubbing). The
  slider owns its keyboard contract (arrows ±step, Home/End) with full `role=slider` ARIA. Thumbnail URLs
  are quoted+escaped against CSS `url()` injection; the preview bubble is edge-clamped. Exports a
  `Chapter` interface. Shared **`formatTime`** util extracted (used by both Player and Scrubber). `Player.vue`
  now renders `<Scrubber>` and passes optional `chapters`/`thumbnailAt` props.
- **Player shell + chrome (R3.1):** `Player.vue` rebuilt from the legacy emoji-laden player into the redo
  shell, driven by **`usePlayerStore`** and the icon primitives (ports the locked R0
  `player-chrome.html`). Two-way `<video>` ↔ store sync (play/pause/timeupdate/loadedmetadata/progress/
  volumechange/ratechange → store; volume/muted/rate mirrored back onto the element), gradient scrims, a
  "Now playing" metadata overlay (title + year · cert · runtime · genre, back affordance), a big animated
  center play/pause, and a basic bottom control bar — a click-to-seek progress track (buffered + played +
  head, with arrow/Home/End keyboard seeking), mono timecode, mute toggle, and fullscreen toggle.
  **Auto-hiding chrome** (shown while paused / on pointer-move / focus / tap; hides after an idle timeout
  while playing; `cursor:none` when hidden). Control clicks never trigger play/pause (no click-eats-seek).
  Reduced-motion safe; **all emoji removed** — the player was the last emoji-bearing file, so the whole
  package is now icon-only. (The rich scrubber, keyboard map, volume/speed/track menus, captions,
  ambient/theater, PiP/mini-player, resume/up-next and PlayerPage wiring follow in R3.2–R3.9.)
- **Detail view (R2.5):** new **`MediaDetail.vue`** + **`MediaDetailPage.vue`** and the
  **`/app/media/:id`** route (`name: 'media'`, added to `buildRoutes`). The detail surface renders a
  poster-derived **ambient glow** behind a hero (blur-up poster, title, meta [year · cert · runtime ·
  type], genre chips, overview, director + cast chips) with **Play / Resume / +Watchlist** actions and a
  **"More like this"** rail (reuses `MediaRow`). The page container fetches the title by id
  (`GET /api/v1/media/:id`) plus a genre-scoped similar list (excludes self, capped, non-fatal on
  failure), resolves the resume position from `usePlayerStore`, re-fetches when the route id changes, and
  guards every fetch with a per-load `AbortController` torn down on unmount. Loading → `Skeleton`, error →
  `EmptyState` + retry; **degrades gracefully** when metadata is sparse (missing poster/overview/cast…).
  `MediaDetail`/`MediaDetailPage` exported from the package root. `MediaCard`'s default `to` already
  targets this route, and `BrowsePage`'s Info action now navigates here when present.
  - **Coverage now counts the rebuilt redo surfaces** — `MediaCard`/`MediaGrid`/`FilterBar` and the
    `BrowsePage`/`MediaDetailPage` pages are no longer excluded (only `Player.vue` + the R4/R5
    auth/settings/app pages remain out until they're rebuilt).
- **BrowsePage + Home rows (R2.4):** `BrowsePage.vue` rebuilt into the full Browse surface — a
  **Continue Watching** rail derived from `usePlayerStore.resumeMap` (resolved against an in-page
  registry fed by the grid + home-row fetches, **no extra API**, ordered by resume seconds desc, capped),
  the app's configured **home rows** (one per `config.homeRows` entry) that **lazy-load on scroll**, and
  the filtered, virtualized library grid below. Card actions route to the player (and the detail view
  once R2.5 ships; an interim "coming soon" toast otherwise); home-row "See all" applies the row's query
  to `useMediaStore` and scrolls to the grid. Empty/loading/error states use `EmptyState`/`Skeleton`/toast;
  the `#toolbar-extra` slot is kept; reduced-motion safe; fully tokenized.
  - New presentational **`MediaRow.vue`** (exported) — a scroll-snapping rail of `MediaCard`s with a
    title/count + `#action` slot, skeleton loading, inline error+retry, `EmptyState` empty, a
    `hideWhenEmpty` collapse, a `cardTo` link override, and forwarded `play`/`watchlist`/`info`.
  - New container **`HomeRow.vue`** (exported as **`MediaHomeRow`** — the `HomeRow` name is the public
    config type) — lazy-loads via `IntersectionObserver` (eager under SSR/jsdom), fetches its query
    through `ApiClient` with a per-load `AbortController` (torn down on unmount), owns its loading/error/
    empty state, toasts on failure, and emits `items-loaded`/`see-all`.
  - New pure, unit-tested **`buildMediaQuery(params)` / `buildMediaUrl(apiBase, params)`** helpers
    (exported) for query-scoped media fetches independent of the singleton store.
- **FilterBar redesign (R2.3):** `FilterBar.vue` rebuilt on the a11y primitive layer (no native
  `<select>`s) — a glassy **sticky** bar (condenses on scroll) with a **debounced** search, an
  **expand/collapse advanced panel** (genres via the searchable `Combobox`, rating/type `Chip` toggles,
  a year range, sort + order), a row of removable **active-filter pills** with a live **result count**
  (persistent `aria-live` region) and "clear all", and **saved filter presets** (save current / apply /
  remove) persisted through `usePreferencesStore`. Filters mutate `useMediaStore`, so the existing
  `bindMediaStoreToRouter` URL-sync picks them up. Keyboard-operable, reduced-motion safe, fully tokenized
  (legacy `--color-*` fallbacks replaced with Nocturne `--surface`/`--text`/`--accent`).
  - `usePreferencesStore` gains a persisted **`filterPresets`** list with `saveFilterPreset(name, query)`
    (stable name-slug id; re-saving a name overwrites) and `removeFilterPreset(id)`; new `FilterPreset`
    type exported from the package root.
- **MediaGrid virtualization (R2.2):** `MediaGrid.vue` rebuilt as a **windowed virtual scroller** — only
  the rows intersecting the viewport (plus an overscan band) are ever in the DOM, so a library of
  thousands of items stays at 60fps. Responsive **auto-fit columns** are driven by the user's `cardSize`
  preference (with a `cardSize` prop override), reusing the locked R0 grid rhythm (24/20px gaps, 2:3
  posters). **Skeleton rows** on the initial load match the final layout (no shift) and are announced
  (`role="status"`/`aria-busy`); the empty state is also announced. **Infinite scroll** via an
  `IntersectionObserver` sentinel emits `load-more` (wired in `BrowsePage` to `store.loadMore`), and a
  **"back to top"** affordance appears once scrolled past the fold. Windowing arithmetic lives in a pure,
  unit-tested `virtual-grid.ts` (`computeColumns`/`computeCardWidth`/`computeRowHeight`/`computeWindow`);
  all DOM measurement is guarded, so it **degrades to rendering every item** under SSR/jsdom/zero-width.
  New `#card` (item + index) and `#empty` slots; `play`/`watchlist`/`info` are forwarded from the cards.
- **MediaCard redesign (R2.1):** `MediaCard.vue` rebuilt from the locked R0 art direction — a 2:3
  **blur-up** poster (LQIP gradient under a fade-in image that also handles already-cached/`complete`
  images; `aspect-ratio` reserved so there's **no CLS**; `loading="lazy"`), a **real `<Icon>`** placeholder
  for missing posters (never emoji), a top **badge stack** (NEW from `created_at` recency · optional
  `quality` prop), a **resume-progress bar** sourced from `usePlayerStore.resumePositionFor(id) ÷ runtime`
  (hidden while the overlay is open; `role="progressbar"`), and a cinematic **hover/focus overlay**
  (title · year/cert/runtime · genre chips · amber **Play / +Watchlist / Info** quick-actions emitting
  `play`/`watchlist`/`info`). Keyboard-activatable via a stretched link (Enter navigates; quick-actions
  layered above it and only pointer-active while the overlay is shown), `:focus-within` reveals the overlay,
  reduced-motion safe (media query + `[data-reduced-motion]`), `#badges`/`#actions` slots for app adornment.

## [0.8.0] — 2026-06-02 — UI Redo ("Nocturne"): foundations + theming

First tag of the UI Redo (R0→R6), which re-skins every surface on a tokenized, multi-theme,
customizable design system. This release ships **R0** (the Nocturne design system: tokens, fonts,
icons, 19 a11y primitives, atmosphere) and **R1** (theming + store architecture: preferences,
media, player and command stores, plus the config/slot extensibility seam). Additive +
back-compatible — consumers are not bumped yet (that happens at R6.6).

### Added
- **Config/slot extensibility (R1.5):** `PhlixAppConfig` extended so server vs hub diverge purely by
  config + named slots — never `if (app === 'hub')` in shared code. New `branding` (`wordmark`/`logoSrc`/
  `logoAlt`/`tagline`) drives the shell's `#logo` slot; `menu` (`MenuItem[]`, icons typed `IconName`, with
  `target`/`rel`-safe external `href`s via a `javascript:`/`data:`/`vbscript:`-scheme guard) drives the
  `#nav` slot (with a built-in ⌘K trigger; falls back to Browse/Settings + the "Phlix" wordmark when
  unset); `defaultTheme` seeds a per-app initial theme for first-time visitors (a stored user choice always
  wins, applied pre-mount so there's no flash or snap-back); `homeRows` (`HomeRow[]`) is established as the
  config seam the R2 Browse surface will render. `createPhlixApp` provides the resolved config under
  `phlixConfig`. New exported `hasStoredPreferences()`; `applyStoredThemeEarly(defaultTheme?)` gained the
  seed param. Exported types: `MenuItem`, `BrandingConfig`, `HomeRow`.
- **Command palette (R1.4):** `useCommandStore` (Pinia) — a fuzzy-ranked command **registry**
  (`register`/`unregister` with a disposer, dedupe by id), palette state (`open`/`query`,
  `open/close/togglePalette`), and a persisted **recent-actions** list (`localStorage('phlix.cmd.recents')`,
  capped at 8, surfaced first when the query is empty). `runId` records-recent → closes → runs. Exported
  pure helpers `fuzzyScore`/`matchCommand`. New `CommandPalette.vue` — a Teleported **⌘K / Ctrl-K** overlay
  (built on `useFocusTrap` for scroll-lock + Esc + focus-restore) implementing the WAI-ARIA combobox/listbox
  pattern (input owns `aria-activedescendant`, full keyboard nav: Up/Down/Home/End/Enter, Esc + backdrop to
  close) with grouped sections (Recent + per-group) and a synthetic "Search library" fallback that routes to
  Browse with `?search=`. Ships built-in commands (navigation, theme switch, density/motion/atmosphere
  toggles, reset) and registers **app-injected commands** via the new `PhlixAppConfig.commands` (provided
  under the `phlixCommands` key by `createPhlixApp`; the palette is mounted once in the app shell). Exported:
  `useCommandStore`, `CommandPalette`, `Command`, `fuzzyScore`, `matchCommand`.
- **Player store (R1.3):** `usePlayerStore` (Pinia singleton) — current media + queue/up-next, transport
  state (position/duration/buffered), user selections (volume/muted/rate/quality/subtitle, seeded from
  prefs), a persisted + throttled **resume map** (records positions in the 30s–95% band; resume offered on
  reopen), **mini-player** visibility for cross-route playback, and **Media Session** metadata + transport
  handlers (`bindMediaSession`). Exported with `RESUME_MIN_SECONDS`/`RESUME_MAX_RATIO`/`MediaSessionHandlers`.
- **Preferences + theming (R1.1):** `usePreferencesStore` (Pinia) — theme, accent, density, card size,
  grid density, reduced-motion (auto/on/off), autoplay, default volume/quality/subtitle, atmosphere —
  persisted to `localStorage('phlix.prefs')`. `useTheme()` composable reflects it live onto `<html>`
  (`data-theme`/`data-density`/`data-reduced-motion` + accent CSS-var override via `deriveAccentVars`);
  `applyStoredThemeEarly()` runs pre-mount to avoid a theme flash. A `[data-reduced-motion]` global lets
  a user force the reduced-motion path over the OS setting. Exported: `usePreferencesStore`,
  `readStoredPreferences`, `DEFAULT_PREFERENCES`, `useTheme`, `applyStoredThemeEarly`, `deriveAccentVars`.
- **Faster media store (R1.2):** `useMediaStore` rewritten (public API preserved) with a query-keyed
  in-memory **cache** (TTL — instant back/forward + revisited/prefetched pages), in-flight **dedupe** +
  **AbortController** (superseded filter queries cancelled; stale results never clobber newer ones),
  **debounced** refetch (`scheduleFetch`), **`prefetch`**, and URL-sync (`toQuery`/`applyQuery` +
  `bindMediaStoreToRouter` for shareable/bookmarkable filtered views). `ApiClient.request`/`get` gained an
  optional `AbortSignal` (additive).

### Changed (R1.2)
- `useMediaStore.hasMore` now derives from `items.length < total` (paging tracked via the accumulated list).

### Tooling / dependencies
- **Upgraded the whole toolchain to latest:** Vite 5→**8** (lib CSS pinned to `style.css` via
  `lib.cssFileName`), Vitest 1→**4** (+ `@vitest/coverage-v8`), TypeScript 5→**6** & vue-tsc 2→**3**
  (`tsconfig` `lib` bumped to ES2022; declaration build given an explicit `rootDir`),
  `@vitejs/plugin-vue` 5→**6**, `@vue/tsconfig` 0.5→**0.9**, `@types/node` 20→**25**. Runtime deps
  **pinia 2→3** and **vue-router 4→5** (peerDependencies updated to `pinia ^3 / vue-router ^5 / vue ^3.5`;
  consumers align at R6.6). All gates green on the new stack.
- **Test coverage** configured (v8) and raised to **~92% statements / 96% lines** with 166 tests; added
  suites for `useAuthStore`, `bindMediaStoreToRouter`, `createPhlixApp`, and many primitive branch cases.

### Fixed
- `useAuthStore.isLoggedIn` was a `computed` over non-reactive `localStorage`, so it went stale after
  login/logout — now backed by a reactive token ref that updates on login/signup/logout/expiry.

- **Design system "Nocturne" (R0.0):** art-direction mockups + a distilled design spec under
  `src/dev/mockups/` (poster card, browse grid + filter bar, player chrome; nocturne/daylight/midnight).
  Cinema-after-dark aesthetic — projector-amber accent, Fraunces/Hanken Grotesk/JetBrains Mono,
  film-grain + vignette + poster-ambient atmosphere. Dev-only reference artifacts (not bundled).
- **Token system (R0.1):** semantic, `[data-theme]`-scoped tokens with three built-in themes —
  `nocturne` (default dark), `daylight` (warm light), `midnight` (OLED true-black).
  - Amber accent ramp `--amber-50…950` + `--accent`/`-hover`/`-active`/`-soft`/`-ring`/`--accent-contrast`.
  - Surface ladder (`--bg`, `--surface`, `--surface-2`, `--surface-3`, `--surface-glass`,
    `--surface-glass-strong`), text ramp (`--text`/`-muted`/`-subtle`/`-faint`/`--text-on-accent`),
    borders (`--border`/`-subtle`/`-strong`), state colors (+`-bg`).
  - Atmosphere hooks: `--grain-opacity`, `--vignette`, `--ambient`.
  - Elevation (`--shadow-1…4`, `--glow-amber`), motion scale (`--ease-*`, `--dur-*`),
    density scale (`[data-density=comfortable|compact]` → `--control-h`, `--control-pad-x`, …).
  - `src/dev/swatches.html` validates every token across all three themes.
- **Typography (R0.2):** self-hosted, no CDN. Three OFL latin-subset **variable** woff2 (~133 kB):
  Fraunces (display, opsz 9–144 / wght 100–900), Hanken Grotesk (UI/body, wght 100–900), JetBrains Mono
  (timecode/numerals, wght 400–800). Family tokens `--font-display`/`--font-sans`/`--font-mono`, a fluid
  `clamp()` type scale (`--text-2xs…hero`), tracking/leading tokens, `.numeric` (tabular-nums) + `.eyebrow`.
  Each face has a metric-matched fallback `@font-face` (size-adjust + ascent/descent overrides from real
  font metrics) for CLS≈0 swap. Shipped as a **separate** `@phlix/ui/fonts.css` + `dist/fonts/*.woff2`
  (kept out of the bundled `style.css` so the woff2 stay cacheable; copied by `scripts/copy-fonts.mjs`).
  New package exports: `./fonts.css`, `./style.css`, `./dist/*`. Consumers wire the imports in R6.6.
- **Icon system (R0.3):** one `<Icon name="…" />` SVG component (`src/components/Icon.vue`) backed by
  **Lucide** via `unplugin-icons` (tree-shaken `~icons/lucide/*` — only the ~55 registered icons bundle,
  not the full pack). Icons inherit `currentColor` + `em` sizing; `size` prop (number→px / string),
  optional `strokeWidth`; a11y-correct (decorative `aria-hidden` by default, `role="img"` + `aria-label`
  when `label` is set). Registry covers every legacy emoji (🎬→film, ▶→play, ❚❚→pause, 🔊/🔇→volume/mute,
  ←/↑/↓→arrows, ⤢/⤓→fullscreen) plus the full player/browse control vocabulary. Exported as `Icon` +
  `IconName` type. Emoji removal from existing components happens in their later phases (R2/R3).
- **Primitive layer (R0.4) — `src/components/ui/`:** token-driven, a11y, theme- & reduced-motion-aware.
  - _R0.4a:_ `Button` (variants solid/ghost/outline/subtle · sizes · loading spinner · left/right icon ·
    `:focus-visible` ring), `IconButton` (square, required `label`, `aria-pressed` toggle support),
    `Badge` (tones neutral/accent/success/warning/error/info · `mono` for `4K · HDR`/counts · optional icon).
    Exported from `@phlix/ui`.
  - _R0.4b:_ `Slider` (accessible `role=slider`, full keyboard + pointer drag, v-model, `change` on commit —
    base for volume/card-size/scrubber), `Switch` (native-button `role=switch` toggle, `aria-labelledby`),
    `Chip` (toggle via `:selected`→aria-pressed and/or `removable`→✕ with its own label; optional icon).
  - _R0.4c:_ `Select` (accessible single-select dropdown replacing native `<select>` — `aria-haspopup`/
    `aria-expanded`/`aria-activedescendant`, keyboard nav + type-to-jump + click-outside) and `Combobox`
    (filterable single-select, `role=combobox` + `aria-autocomplete`, query reverts on Esc/blur). Shared
    `listbox.ts` helpers + `SelectOption`/`SelectOptionInput` types.
  - _R0.4d:_ `Modal` (centered dialog) + `Sheet` (edge drawer: right/left/bottom) sharing `useFocusTrap`
    (focus-trap, refcounted scroll-lock for stacking, Esc, return-focus, Teleport, `role=dialog`/`aria-modal`/
    `aria-labelledby`, backdrop-click + `dismissible`), and `Tooltip` (hover/focus, delay, `role=tooltip`,
    wires `aria-describedby` onto the trigger). `useFocusTrap` exported.
  - _R0.4e:_ `useToastStore` (Pinia) + `ToastHost` (aria-live region, tone icons, action + dismiss,
    mount-once guard), `Skeleton` (text/rect/circle, shimmer), `Spinner` (`role=status`), `EmptyState`
    (icon/title/description/actions), `Tabs` (`role=tablist` roving-tabindex + arrow/Home/End), `Kbd`.
    Completes the R0.4 primitive layer (17 components).
  - _R0.5:_ transition primitives `Reveal` (fade-rise entrance on mount or scroll-into-view via
    IntersectionObserver; stagger via `delay`; drops `will-change` after settle) and `PageTransition`
    (route-level fade/slide `Transition`, `out-in`). Both fully disabled under `prefers-reduced-motion`.
    (Motion *tokens* `--ease-*`/`--dur-*` shipped earlier in R0.1.)
- **Atmosphere layer (R0.6):** `AppBackdrop` — GPU-cheap film-grain (SVG turbulence, overlay blend) +
  vignette + optional poster-derived radial **ambient glow** (color or blurred image; `ambientImage`
  URL is sanitized against CSS injection). `enabled` prop; auto-off under `prefers-reduced-motion` /
  `prefers-reduced-data`; decorative (`aria-hidden`); `contain: layout paint`. Exported as `AppBackdrop`.
- **Barrel + Gallery (R0.7):** all primitives/composables/stores exported from `@phlix/ui`. Dev-only
  `src/dev/Gallery.vue` (+ `gallery.html`/`gallery.ts`, served by `vite`) showcases every primitive ×
  every theme for visual QA + Playwright snapshots — not part of the published bundle. **Completes R0.**

### Changed
- **Bumped `vue` floor to `^3.5.0`** (dependency + peerDependency) to use `useId()`. Every install
  (package + both consumers) already resolves to vue 3.5.x, so this is non-breaking in practice;
  consumers' own `vue` devDep is aligned to `^3.5.0` at R6.6.

### Changed
- Accent is now **projector-amber `#f5a524`** (was indigo `#6366f1`). Radius scale softened
  (sm 6 / md 10 / lg 14 / xl 20 / 2xl 28). `:root` defaults to the Nocturne theme.

### Deprecated
- Legacy `--color-*` and `--shadow-*` token names are retained as **aliases** that map onto the new
  tokens (in every theme scope) for back-compat; prefer the new semantic names going forward.

## [0.7.0] - 2026-06-01

### Added
- LibraryScanPage for server library scanning (`/app/library/scan`)
- MyServersPage for hub server management (`/app/servers`)
- FederationPage for federated server connections (`/app/federation`)
- ManageSharesPage for library sharing (`/app/shares`)
- AuditLogsPage for audit trail (`/app/audit-logs`)

## [0.6.0] - 2026-06-01

### Added
- `SettingsForm.vue` - schema-driven settings form from `server-settings.schema.json`
- `SettingsPage.vue` - settings page component

### Changed
- Flip Admin link to `/app/settings` behind `PHLIX_VUE_AUTH` flag

## [0.5.0] - 2026-06-01

### Added
- Auth surface: `LoginForm.vue`, `LoginPage.vue`, `SignupForm`, `SignupPage`
- `useAuthStore` for authentication state management

## [0.4.0] - 2026-06-01

### Added
- Player surface: `Player.vue` and `PlayerPage.vue` (`/app/player/:id`)

## [0.3.0] - 2026-06-01

### Added
- Browse surface: `MediaCard.vue`, `MediaGrid.vue`, `FilterBar.vue`, `BrowsePage.vue`
- `useMediaStore` for filter/sort/search/pagination

## [0.1.0] - 2026-06-01

### Added
- Initial release
- Repository skeleton with Vue 3 + TypeScript + Vite
- Package structure with barrel exports (`index.ts`)
- `ApiClient` + `LocalStorageTokenStore` (ported from `admin-ui`)
- `TokenStore` + `AuthUser` TypeScript types
- `MediaItem`, `LibraryQuery`, `LibraryQueryParams` types (from Phase-B schemas)
- `ServerSettings` type (from `server-settings.schema.json`)
- Design tokens: `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadow.css`, `index.css`
- `createPhlixApp(config)` factory with Pinia + Vue Router + `window.__PHLIX__` reader
- `PhlixApp.vue` root component with `AppLayout.vue` shell
- `PhlixAppConfig` type: `app`, `apiBase`, `routerBase`, `menu`, `extraRoutes`, `features`
- Placeholder page routing `/app/*` via `browse` + catchall route
- 21 unit tests for `ApiClient` + `tokenStore`
