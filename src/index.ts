/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineAsyncComponent } from 'vue';

export { createPhlixApp } from './app/createPhlixApp';
// S243 — the hub's MCP token manager. The PAGE is deliberately not re-exported
// (it is a lazy route chunk `buildRoutes` mounts for every `app: 'hub'` consumer,
// same reason as the other built-in pages); what a host needs is the nav entry,
// because menus in this library are entirely consumer-supplied.
export { mcpTokensMenuItem, MCP_TOKENS_ROUTE_NAME, MCP_TOKENS_ROUTE_PATH } from './app/createPhlixApp';
export type { PhlixAppConfig, MenuItem, BrandingConfig, HomeRow } from './app/types';

export { default as PhlixApp } from './app/PhlixApp.vue';
export { default as AppLayout } from './app/AppLayout.vue';

export {
  ApiClient,
  isTmdbUnconfigured,
  TMDB_UNCONFIGURED_CODE,
  setDefaultApiHeaders,
  getDefaultApiHeaders,
  // The music page size this client requests and the server clamps to
  // (`PageLimit::MAX`). Exported so a consumer can size its own pager identically.
  MUSIC_PAGE_SIZE,
} from './api/client';
export { LocalStorageTokenStore } from './api/tokenStore';
export type { TokenStore, AuthUser } from './api/client';
export type {
  MatchType,
  MatchCandidate,
  MatchSearchResult,
  MatchSearchParams,
  MatchApplyInput,
  MatchApplyResult,
  FavoritesResult,
  MatchContext,
  SubtitleCandidate,
  SubtitleDownloadPayload,
  SubtitleDownloadResult,
  // Music listing page envelopes (S110). Named `…Result` rather than `…Page`
  // because `MusicArtistsPage`/`MusicTracksPage` below are page COMPONENTS this
  // barrel already exports; those are established public API, so the new types
  // took the suffix instead (matching `FavoritesResult`, the same shape).
  MusicPageParams,
  MusicArtistsResult,
  MusicAlbumsResult,
  MusicTracksResult,
} from './api/client';
export { ApiError, NetworkError, TimeoutError, errMessage, isOffline } from './api/errors';

export type { MediaItem } from './types/media-item';
export type {
    BookProgress,
    BookChapter,
    BookMetadata,
    BookListItem,
    BookDetail,
    BooksResponse,
    BookResponse,
    BookReaderResponse,
    BookProgressResponse,
    SaveBookProgressInput,
} from './types/book';
export type {
    AudiobookChapter,
    AudiobookMetadata,
    AudiobookListItem,
    AudiobookDetail,
    AudiobookProgress,
    AudiobooksResponse,
    AudiobookResponse,
    AudiobookReaderResponse,
    AudiobookProgressResponse,
    SaveAudiobookProgressInput,
} from './types/audiobook';
// S144 — music row types, at parity with book and audiobook above. The four
// music PAGE ENVELOPES (`MusicPageParams` / `Music*Result`) come from
// `./api/client` further up; these are the ROW types inside them. Without the
// line below, `import type { MusicAlbum } from '@phlix/ui'` failed for a
// consumer while the book/audiobook equivalents worked, and the only way to
// name a music row was structurally (`MusicAlbumsResult['albums'][number]`).
// ⚠️ Adding a name here is not enough to ship it: `dist/index.d.ts` is TRACKED
// and is what a consumer resolves against, so `dist/` must be rebuilt before
// the tag that ships this. `src/__tests__/dist-music-type-exports.test.ts`
// enforces that.
export type { MusicArtist, MusicAlbum, MusicTrack } from './types/music';
export type { LibraryQuery, LibraryQueryParams } from './types/library-query';
export type { ProviderPriority, GenresMode } from './types/server-settings';

export { default as Icon } from './components/Icon.vue';
export type { IconName } from './components/Icon.vue';

export { default as AppBackdrop } from './components/AppBackdrop.vue';

// Primitive component layer (R0.4)
export * from './components/ui';

export { default as MediaCard } from './components/MediaCard.vue';
export { default as ThumbRating } from './components/ThumbRating.vue';
// S263 — the 0-10 STAR rating pair, exported for the first time. `ThumbRating`
// above is the like/dislike widget the built-in pages use; these two are the
// separate star surface (`RatingBadge` displays, `UserRatingPicker` submits to
// `POST /api/v1/media/{id}/ratings`). They shipped in P1-S7 but were never added
// to this barrel and had no importer anywhere, so they were tree-shaken out of
// every published bundle — `rating-badge` / `user-rating-picker` appeared ZERO
// times in dist/phlix-ui.js, dist/ui.css and dist/style.css. No consumer could
// reach them even by deep path, because `files: ["dist"]` ships no SFC source.
// They are kept, not deleted: `phlix-docs/docs/libraries.md` documents
// `<RatingBadge>` as a public @phlix/ui component, and four native clients have
// each hand-rolled a clone (phlix-tizen-client/src/components/RatingBadge.vue +
// UserRatingPicker.vue, phlix-mobile-client/src/components/*.tsx,
// phlix-roku-client/components/RatingBadge.brs, phlix-console-client/src/Ui/*.php).
// Exporting is purely ADDITIVE — nothing could have been importing them.
// Pinned by `src/index.test.ts` → "S263 — the newly exported components".
export { default as RatingBadge } from './components/RatingBadge.vue';
export { default as UserRatingPicker } from './components/UserRatingPicker.vue';
export { default as MediaGrid } from './components/MediaGrid.vue';
export { default as MediaRow } from './components/MediaRow.vue';
export { default as MediaHomeRow } from './components/HomeRow.vue';
// Deferred out of the boot graph (UI-3.1 / U-H2): MediaDetail, MetadataMatchModal
// and FilterBar are consumed ONLY inside already-lazy route pages
// (MediaDetailPage / LibraryPage / BrowsePage). Static default re-exports here
// forced Rollup to hoist all three (~56KB) into the eager `@phlix/ui` entry
// bundle every consumer boots. Exposing them as `defineAsyncComponent` factories
// keeps the SAME named exports working (consumers use them purely as template
// components) while moving the component code into dynamically-imported chunks
// OUT of the main entry's static boot graph — mirroring the CommandPalette /
// AuditLogsPage lazy precedent noted below.
export const MediaDetail = defineAsyncComponent(() => import('./components/MediaDetail.vue'));
export const MetadataMatchModal = defineAsyncComponent(
  () => import('./components/MetadataMatchModal.vue'),
);
export const FilterBar = defineAsyncComponent(() => import('./components/FilterBar.vue'));
export { default as SourcePriorityEditor } from './components/SourcePriorityEditor.vue';
// NOTE (R6.1a): the built-in route PAGES — BrowsePage, MediaDetailPage, PlayerPage,
// LoginPage, SignupPage, SettingsPage — are intentionally NOT re-exported. `createPhlixApp`
// mounts them as lazy `() => import()` route chunks; a static re-export here would re-merge
// them into the main bundle (Rollup INEFFECTIVE_DYNAMIC_IMPORT) and defeat the code-split.
// The reusable *building blocks* (MediaCard/MediaGrid/MediaRow/MediaHomeRow/MediaDetail/
// FilterBar above; Player + player/* parts and LoginForm/SignupForm below) ARE
// exported — consumers compose pages from those, not from the page shells.
//
// NOTE (S68/S69): the per-view-mode `#card`-slot renderers — `MediaListRow`,
// `MediaBackdropRow`, and the table renderer S70 adds — are also NOT re-exported,
// but NOT for bundle-size reasons: `MediaCard` (which they compose) is already an
// eager static export above, so exporting a renderer would add only its own few KB.
// They are omitted because they are internals of `LibraryPage`'s view-mode seam
// with no meaning outside it (they only make sense inside a `MediaGrid` whose
// `columns`/`rowHeight` match them), exactly like the `Music*` internals. Keep new
// renderers out of this file.

// Admin port (RA) — server admin surfaces + their mount seam. NOTE: the admin
// PAGE components are intentionally NOT re-exported here — they are lazy-loaded
// chunks via `buildAdminRoutes()` (below), so re-exporting them statically would
// pull all 16 into the main bundle and defeat the code-splitting (Rollup's
// INEFFECTIVE_DYNAMIC_IMPORT warning). Consumers mount admin via buildAdminRoutes.
export { AdminLogsApi, ALL_LOGS } from './api/admin/logs';
export type { LogFile, LogTail, LogTailAll } from './api/admin/logs';
export { AdminDashboardApi } from './api/admin/dashboard';
export type {
  NowPlayingItem,
  TopUser,
  TopMedia,
  StorageSummary,
  ActivityEvent,
} from './api/admin/dashboard';
export {
  AdminUsersApi,
  RATING_LABELS,
  RATING_MAX,
  RATING_OPTIONS,
  DEFAULT_THROTTLE_BPS,
  THROTTLE_BPS_OPTIONS,
  THROTTLE_BPS_LEVELS,
} from './api/admin/users';
export type {
  User,
  CreateUserInput,
  UpdateUserInput,
  Profile,
  CreateProfileInput,
  UpdateProfileInput,
  UserBandwidth,
  SetQuotaInput,
} from './api/admin/users';
export { AdminWebhooksApi, WEBHOOK_EVENT_CATEGORIES, SUBSCRIBABLE_EVENTS } from './api/admin/webhooks';
export type { Webhook, CreateWebhookInput, UpdateWebhookInput, TestResult } from './api/admin/webhooks';
export { AdminServicesApi } from './api/admin/services';
export type {
  TraktStatus,
  TraktDisconnectResult,
  LastfmStatus,
  LastfmDisconnectResult,
} from './api/admin/services';
export { AdminIntegrationsApi } from './api/admin/integrations';
export type {
  ArrSyncStatus,
  ArrSyncTriggerResult,
  ArrSyncEnableResult,
  AuthProvider,
  EnableProviderResult,
  DisableProviderResult,
  OidcSettings,
  SaveOidcInput,
  LdapSettings,
  SaveLdapInput,
  LdapTestResult,
} from './api/admin/integrations';
export { AdminBackupApi } from './api/admin/backup';
export type {
  Backup,
  CreateBackupInput,
  CreateBackupResult,
  UpdateScheduleInput,
  ScheduleData,
  UpdateScheduleResult,
} from './api/admin/backup';
export { AdminCastApi } from './api/admin/cast';
export type {
  CastDevice,
  CastPlaybackState,
  AirPlayDevice,
  AirPlayPlaybackState,
  CastActionResult,
} from './api/admin/cast';
export { AdminDlnaServerApi } from './api/admin/dlnaServer';
export type { DlnaServerStatus, DlnaServerActionResult } from './api/admin/dlnaServer';
export { AdminRemoteAccessApi } from './api/admin/remoteAccess';
export type {
  HubStatus,
  HubPairResponse,
  HubPollResponse,
  HubHeartbeatResponse,
  SubdomainStatus,
  SubdomainClaimResponse,
  RelayStatus,
  RelayPingResponse,
  PortForwardStatus,
  HostnameCandidate,
  PortForwardCandidatesResponse,
  RemoteAccessAck,
} from './api/admin/remoteAccess';
export { AdminLiveTvApi } from './api/admin/liveTv';
export type {
  Tuner,
  Channel,
  Program,
  Recording,
  SeriesRule,
  TunerUpdate,
  GuideParams,
  CreateRecordingInput,
  CreateSeriesRuleInput,
} from './api/admin/liveTv';
export { AdminCollectionsApi } from './api/admin/collections';
export type {
  Collection,
  MediaItem as CollectionMediaItem,
  CreateCollectionInput,
  UpdateCollectionInput,
} from './api/admin/collections';
export { AdminHistoryApi } from './api/admin/history';
export type { RecentlyWatchedItem, RecentlyWatchedResponse } from './api/admin/history';
export { AdminSyncPlayApi } from './api/admin/syncPlay';
export type {
  SyncPlayGroup,
  SyncPlayMember,
  SyncPlayPlaybackState,
  SyncPlayQueueItem,
  SyncPlayGroupState,
  CreateGroupInput,
  JoinGroupInput,
} from './api/admin/syncPlay';
export { AdminLibrariesApi, LIBRARY_TYPES, SCAN_JOB_TYPES } from './api/admin/libraries';
export type {
  Library,
  LibraryType,
  ScanJob,
  ScanJobType,
  CreateLibraryInput,
  UpdateLibraryInput,
  CreateLibraryResult,
  ScanQueuedResult,
} from './api/admin/libraries';
export { AdminSettingsApi, SETTINGS_SECRET_MASK } from './api/admin/settings';
export type { SecretStatus, SettingsResponse, SettingsSaveResponse } from './api/admin/settings';
export { AdminMetadataSourcesApi } from './api/admin/metadata-sources';
export {
  AdminPluginsApi,
  PLUGIN_SECRET_MASK,
  pluginErrorCode,
  pluginValidationErrors,
} from './api/admin/plugins';
export type {
  Plugin,
  PluginDetail,
  PluginSettings,
  PluginSettingsSchema,
  PluginSettingDescriptor,
} from './api/admin/plugins';
export { AdminMaintenanceApi, MAINTENANCE_ENDPOINTS, MAINTENANCE_TASK_NAMES } from './api/admin/maintenance';
export type {
  MaintenanceTask,
  MaintenanceTaskName,
  MaintenanceTaskMode,
  MaintenanceJob,
  MaintenanceJobStatus,
  QueuedTaskResult,
  SyncTaskResult,
  ReapScanJobsData,
  ReapTranscodeJobsData,
  CleanupOrphanedStatsData,
  DedupePathsInput,
} from './api/admin/maintenance';
export { AdminHubDashboardApi } from './api/admin/hubDashboard';
export type { HubSummary, HubServersSummary, HubAuditEvent } from './api/admin/hubDashboard';
// Admin page-group composability (H0): the page registries + per-app builders.
// `buildAdminRoutes()` with no args is the byte-identical server set; the hub
// mounts `buildHubAdminRoutes()`. HubDashboardPage stays an unexported lazy chunk
// inside the registry (re-exporting it statically would defeat code-splitting).
export {
  buildAdminRoutes,
  adminMenu,
  buildServerAdminRoutes,
  buildHubAdminRoutes,
  commonAdminPages,
  serverAdminPages,
  hubAdminPages,
} from './app/admin';
export type { AdminPage } from './app/admin';
export { buildMediaQuery, buildMediaUrl } from './api/media-query';
// Player surface exports moved to @phlix/ui/player secondary entry
export { default as LoginForm } from './components/LoginForm.vue';
export { default as SignupForm } from './components/SignupForm.vue';
// S263 — avatar management, exported for the first time. This is the ONLY caller
// in src/ of `useAuthStore().uploadAvatar()` / `.deleteAvatar()`, which in turn
// are the only callers of `ApiClient.uploadAvatar()` / `.deleteAvatar()`. The
// component, the store methods and the client methods form one complete, fully
// covered vertical slice with no UI entry point — deleting the component would
// have orphaned the two layers beneath it, which is why this is unshipped work
// rather than dead code. Nothing else in src/ renders an avatar editor.
// Pinned by `src/index.test.ts` → "S263 — the newly exported components".
export { default as ProfileImageSettings } from './components/ProfileImageSettings.vue';
// NOTE (R6.1a): PlayerPage / LoginPage / SignupPage / SettingsPage are lazy route chunks
// mounted by `createPhlixApp` (see the built-in-pages note near MediaDetail) — not
// re-exported. The long-tail consumer pages below ARE still exported because the
// server/hub consumers import them directly for `extraRoutes`; those move behind a
// dynamic-import builder seam at R6.6.
// NOTE (H0): AuditLogsPage is intentionally NOT re-exported here — it is now a lazy
// chunk owned by the hub admin registry (`hubAdminPages` in app/admin.ts, mounted
// via `buildHubAdminRoutes`). A static re-export here would re-merge it into the
// main bundle (Rollup INEFFECTIVE_DYNAMIC_IMPORT) and defeat the code-split.
export { default as LibraryScanPage } from './pages/LibraryScanPage.vue';
export { default as MyServersPage } from './pages/MyServersPage.vue';
export { default as ServerDetailPage } from './pages/ServerDetailPage.vue';
export { default as FederationPage } from './pages/FederationPage.vue';
export { default as FederationSharesPage } from './pages/FederationSharesPage.vue';
export { default as ManageSharesPage } from './pages/ManageSharesPage.vue';
export { default as SharedWithMePage } from './pages/SharedWithMePage.vue';
export { default as RequestsPage } from './pages/RequestsPage.vue';
export { default as InviteLinksPage } from './pages/InviteLinksPage.vue';
export { default as AcceptInvitePage } from './pages/AcceptInvitePage.vue';
// S324: SearchPage is the ONE long-tail page that statically imports a deferred
// surface (MetadataMatchModal — the ⋯-menu "Edit metadata" host action this step
// wired). As a STATIC default re-export it pulled that ~56 KB chunk back into the
// eager entry (GAP 1 in dist-player-split.test.ts). Exporting it as a lazy factory
// keeps the same named export the server/hub consumers import for their /app/search
// extraRoute, moves the page (and the modal) into dynamically-loaded chunks, and
// matches the R6.1a built-in-pages precedent noted above.
export const SearchPage = defineAsyncComponent(() => import('./pages/SearchPage.vue'));
export { default as SecuritySettingsPage } from './pages/SecuritySettingsPage.vue';
export { default as MusicAlbumPage } from './pages/MusicAlbumPage.vue';
export { default as MusicArtistsPage } from './pages/MusicArtistsPage.vue';
export { default as MusicArtistPage } from './pages/MusicArtistPage.vue';
export { default as MusicTracksPage } from './pages/MusicTracksPage.vue';
export { default as MusicPlayerPage } from './pages/MusicPlayerPage.vue';
export { default as BooksPage } from './pages/BooksPage.vue';
export { default as BookDetailPage } from './pages/BookDetailPage.vue';
export { default as BookReaderPage } from './pages/BookReaderPage.vue';
export { default as AudiobooksPage } from './pages/AudiobooksPage.vue';
export { default as AudiobookDetailPage } from './pages/AudiobookDetailPage.vue';
export { default as AudiobookPlayerPage } from './pages/AudiobookPlayerPage.vue';
export { default as PhotoAlbumsPage } from './pages/PhotoAlbumsPage.vue';
export { default as PhotoAlbumPage } from './pages/PhotoAlbumPage.vue';
export { default as PhotoViewPage } from './pages/PhotoViewPage.vue';
export { default as PhotoSlideshowPage } from './pages/PhotoSlideshowPage.vue';

export { useAuthStore } from './stores/useAuthStore';

export { useMediaStore } from './stores/useMediaStore';
export type { SortField, SortOrder } from './stores/useMediaStore';
export { bindMediaStoreToRouter } from './composables/useMediaUrlSync';

export { useUserItemDataStore } from './stores/useUserItemDataStore';
export type { UserItemData } from './stores/useUserItemDataStore';

export { useLibrariesStore } from './stores/useLibrariesStore';
export { fetchLibraries, sortLibraries } from './api/libraries';
export type { LibrarySummary } from './api/libraries';

// Hub "current server" selection + the media-base resolution that points media
// browsing at the relay proxy for that server. `useApiBase` resolves the host's
// own base; `useMediaApiBase` resolves the (possibly proxied) media base.
export { useServerStore, CURRENT_SERVER_ID_KEY, CURRENT_SERVER_NAME_KEY } from './stores/useServerStore';
export {
    useConnectionStore,
    CONNECTION_API_BASE_KEY,
    CONNECTION_CONFIRMED_ORIGIN_KEY,
    normalizeBase,
    withScheme,
    isAllowedBase,
    isPrivateHost,
    isPlaintextPublic,
    originOf,
    probeServer,
} from './stores/useConnectionStore';
export { useApiBase, useMediaApiBase } from './composables/useApiBase';

// S241 — image URLs arrive inside JSON payloads as ROOT-RELATIVE server paths
// (`/api/v1/artwork/{id}?size=…&exp=…&sig=…`). Bound verbatim into `:src` they
// resolve against the DOCUMENT origin, which is right on the media server and
// wrong on the hub, where the payload came over the relay proxy for the selected
// server. Exposed so a host app resolves its own image bindings the same way the
// components do. Absolute CDN URLs pass through byte-for-byte.
export { useImageSrc } from './composables/useImageSrc';
export type { ImageSrcResolvers } from './composables/useImageSrc';
export { resolveImageSrc, resolveImageSrcset, isRewritableImagePath } from './utils/imageSrc';

// Article-aware title sorting (mirror of the server's SortTitle): file "The Plot"
// under P. Exposed so hosts can sort/group local lists the same way the server does.
export {
  stripLeadingArticle,
  compareByStrippedTitle,
  SORT_TITLE_ARTICLES,
} from './utils/sortTitle';

// Pluralisation (S134). ONE Intl.PluralRules-backed mechanism for every plural
// noun; exposed so a host app pluralises the same way the components do, and so a
// consumer supplying `PhlixAppConfig.messages` in another language can reuse the
// same category model rather than re-deriving it.
export {
  plural,
  pluralize,
  pluralCount,
  pluralCategory,
  selectPluralTemplate,
  isPluralTemplate,
  PLURAL_CATEGORIES,
} from './utils/plural';
export type { PluralCategory, PluralForms, PluralOptions } from './utils/plural';

export { useToastStore } from './stores/useToastStore';
export type { Toast, ToastInput, ToastTone, ToastAction } from './stores/useToastStore';

export { usePreferencesStore, readStoredPreferences, hasStoredPreferences, DEFAULT_PREFERENCES, DEFAULT_CAPTION_STYLE } from './stores/usePreferencesStore';
export type { Preferences, ThemeName, Density, MotionPref, ViewMode, FilterPreset, CaptionStyle, CaptionSize, CaptionBackground, CaptionEdge } from './stores/usePreferencesStore';
export { useSettingsPrefsStore } from './stores/useSettingsPrefs';
export type { SettingsPrefsState } from './stores/useSettingsPrefs';
export { usePlayerStore, RESUME_MIN_SECONDS, RESUME_MAX_RATIO } from './stores/usePlayerStore';
export type { MediaSessionHandlers, PlayerCommand } from './stores/usePlayerStore';

// TV / remote spatial-focus engine (opt-in; no-op on desktop).
export { useSpatialNav } from './composables/useSpatialNav';
export type { SpatialNavOptions, SpatialNavHandle } from './composables/useSpatialNav';
export { bestCandidate, rectCenter } from './composables/spatial-nav';
export type { Dir, Rect, Candidate } from './composables/spatial-nav';
export { focusable, installFocusable, focusableRegistry } from './directives/focusable';
export type { FocusableOptions } from './directives/focusable';
export { useCommandStore, fuzzyScore, matchCommand } from './stores/useCommandStore';
export type { Command } from './stores/useCommandStore';
// NOTE (R6.1b): CommandPalette is NOT re-exported — the shell (`PhlixApp`) lazy-loads it
// via `defineAsyncComponent` on first open so its chunk stays out of the initial bundle;
// a static re-export would re-merge it into the main chunk (INEFFECTIVE_DYNAMIC_IMPORT).
// The always-on ⌘K hotkey that opens it is the exported `useCommandPaletteHotkey`.
export { useCommandPaletteHotkey } from './composables/useCommandPaletteHotkey';
export { useTheme, applyStoredThemeEarly } from './composables/useTheme';
// Server/plugin themes (S86). The allowlist + value grammar are exported so a
// host app (or a native client) can apply a theme through the SAME checks the
// SPA uses, rather than reimplementing them looser.
export {
  BUILT_IN_THEME_IDS,
  THEME_TOKEN_ALLOWLIST,
  THEME_CACHE_KEY,
  MAX_EXTENDS_DEPTH,
  isBuiltInThemeId,
  isAllowedThemeToken,
  isSafeThemeTokenValue,
  sanitizeThemeTokens,
  normalizeServerTheme,
  resolveThemeTokens,
  resolveThemeBase,
  activeThemeStyle,
  applyThemeTokens,
  clearThemeTokens,
  readCachedTheme,
  writeCachedTheme,
} from './composables/themeTokens';
export type { BuiltInThemeId, ServerTheme, ActiveThemeStyle } from './composables/themeTokens';
export { useThemesStore } from './stores/useThemesStore';
export { fetchThemes } from './api/themes';
export { useOnline } from './composables/useOnline';
export { usePrefetch } from './composables/usePrefetch';
export { usePreconnect } from './composables/usePreconnect';
export type { UsePreconnectOptions } from './composables/usePreconnect';
export { useResumeSync } from './composables/useResumeSync';
export type { UseResumeSync } from './composables/useResumeSync';
export { useResumeReporter } from './composables/useResumeReporter';
export type { UseResumeReporter } from './composables/useResumeReporter';
export { deriveAccentVars } from './composables/color';
// Per-route page titles (U1) — `setPageTitle`/`usePageTitle` write the canonical
// `"<title> · Phlix"` document title; `setAppName`/`formatPageTitle` are exposed
// for hosts that set a custom wordmark and for inspection/tests.
export {
  usePageTitle,
  setPageTitle,
  setAppName,
  formatPageTitle,
} from './composables/usePageTitle';

// i18n-readiness seam (R6.5c) — English defaults + a deep-partial override map.
// Consumers translate via `useMessages().t('group.key')`; override strings through
// `PhlixAppConfig.messages`. `createTranslator`/`mergeMessages`/`DEFAULT_MESSAGES`
// are exposed for non-component contexts and inspection.
export { useMessages } from './composables/useMessages';
export type { UseMessages } from './composables/useMessages';
export { DEFAULT_MESSAGES, createTranslator, mergeMessages } from './i18n/messages';
export type {
  PhlixMessages,
  PhlixMessagesConfig,
  MessageGroup,
  MessageKey,
  TranslateParams,
  Translate,
} from './i18n/messages';

export * from './tokens';
