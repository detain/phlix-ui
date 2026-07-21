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
