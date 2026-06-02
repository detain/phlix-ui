# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_R2+ of the UI Redo (Browse, Player, Auth + Settings, app pages + shell, perf + rollout) lands here.
Consumers (`phlix-server`/`phlix-hub`) bump to the aligned `@phlix/ui` tag at R6.6._

### Fixed
- **Media filter wire format:** `useMediaStore` and `buildMediaQuery` now serialize array filters as
  `genres[]=`/`ratings[]=`/`types[]=`/`actors[]=` instead of bare repeated keys. PHP collapses
  `genres=A&genres=B` to the last value (a string) and the server's `is_array()` check drops it, so genre/
  rating/actor filtering silently matched nothing end-to-end (gap report #3b; the server-side `$.genres`
  JSON path + Smarty client were fixed in phlix-server).

### Added
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
