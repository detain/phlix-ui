export { createPhlixApp } from './app/createPhlixApp';
export type { PhlixAppConfig, MenuItem, BrandingConfig, HomeRow } from './app/types';

export { default as PhlixApp } from './app/PhlixApp.vue';
export { default as AppLayout } from './app/AppLayout.vue';

export { ApiClient, isTmdbUnconfigured, TMDB_UNCONFIGURED_CODE } from './api/client';
export { LocalStorageTokenStore } from './api/tokenStore';
export type { TokenStore, AuthUser } from './api/client';
export type {
  MatchType,
  MatchCandidate,
  MatchSearchResult,
  MatchSearchParams,
  MatchApplyInput,
  MatchApplyResult,
} from './api/client';
export { ApiError, NetworkError, TimeoutError, errMessage, isOffline } from './api/errors';

export type { MediaItem } from './types/media-item';
export type { LibraryQuery, LibraryQueryParams } from './types/library-query';
export type { ServerSettings } from './types/server-settings';

export { default as Icon } from './components/Icon.vue';
export type { IconName } from './components/Icon.vue';

export { default as AppBackdrop } from './components/AppBackdrop.vue';

// Primitive component layer (R0.4)
export * from './components/ui';

export { default as MediaCard } from './components/MediaCard.vue';
export { default as MediaGrid } from './components/MediaGrid.vue';
export { default as MediaRow } from './components/MediaRow.vue';
export { default as MediaHomeRow } from './components/HomeRow.vue';
export { default as MediaDetail } from './components/MediaDetail.vue';
export { default as MetadataMatchModal } from './components/MetadataMatchModal.vue';
export { default as FilterBar } from './components/FilterBar.vue';
// NOTE (R6.1a): the built-in route PAGES — BrowsePage, MediaDetailPage, PlayerPage,
// LoginPage, SignupPage, SettingsPage — are intentionally NOT re-exported. `createPhlixApp`
// mounts them as lazy `() => import()` route chunks; a static re-export here would re-merge
// them into the main bundle (Rollup INEFFECTIVE_DYNAMIC_IMPORT) and defeat the code-split.
// The reusable *building blocks* (MediaCard/MediaGrid/MediaRow/MediaHomeRow/MediaDetail/
// FilterBar above; Player + player/* parts and LoginForm/SignupForm/SettingsForm below) ARE
// exported — consumers compose pages from those, not from the page shells.

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
export { AdminUsersApi, RATING_LABELS, RATING_OPTIONS } from './api/admin/users';
export type {
  User,
  CreateUserInput,
  UpdateUserInput,
  Profile,
  CreateProfileInput,
  UpdateProfileInput,
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
export { AdminLibrariesApi, LIBRARY_TYPES } from './api/admin/libraries';
export type {
  Library,
  LibraryType,
  ScanJob,
  CreateLibraryInput,
  UpdateLibraryInput,
  CreateLibraryResult,
  ScanQueuedResult,
} from './api/admin/libraries';
export { AdminSettingsApi } from './api/admin/settings';
export type { SettingsResponse, SettingsSaveResponse } from './api/admin/settings';
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
export { default as Player } from './components/Player.vue';
export { default as MiniPlayer } from './components/MiniPlayer.vue';
export { default as Scrubber } from './components/player/Scrubber.vue';
export type { Chapter } from './components/player/Scrubber.vue';
export { default as ShortcutsHelp } from './components/player/ShortcutsHelp.vue';
export { default as VolumeControl } from './components/player/VolumeControl.vue';
export { default as SpeedMenu } from './components/player/SpeedMenu.vue';
export { default as QualityMenu } from './components/player/QualityMenu.vue';
export { default as CaptionOverlay } from './components/player/CaptionOverlay.vue';
export { default as CaptionsMenu } from './components/player/CaptionsMenu.vue';
export { default as AmbientCanvas } from './components/player/AmbientCanvas.vue';
export { default as ResumePrompt } from './components/player/ResumePrompt.vue';
export { default as UpNext } from './components/player/UpNext.vue';
export { default as TranscodeNotice } from './components/player/TranscodeNotice.vue';
export { default as TranscodePreparing } from './components/player/TranscodePreparing.vue';
export { default as SkipButton } from './components/player/SkipButton.vue';
export {
  transcodeStartPath,
  transcodeStatusPath,
  parseTranscodeStart,
  parseTranscodeStatus,
  parseSubtitleTracks,
  isPlayable,
  isFailedStatus,
  resolveStreamUrl,
} from './components/player/transcode';
export type { TranscodeStart, TranscodeStatus, SubtitleTrack } from './components/player/transcode';
export { attachHls, isNativeHlsSupported } from './components/player/hls-playback';
export type { HlsHandle, AttachHlsOptions } from './components/player/hls-playback';
export { useHlsTranscode } from './composables/useHlsTranscode';
export type {
  TranscodeState,
  TranscodeHttpClient,
  HlsTranscodeController,
  UseHlsTranscodeOptions,
  ResolvedSubtitleTrack,
} from './composables/useHlsTranscode';
export {
  needsTranscode,
  extensionOf,
  isFatalMediaError,
  ringDashoffset,
  DIRECT_PLAY_EXTENSIONS,
  TRANSCODE_EXTENSIONS,
  UPNEXT_COUNTDOWN_SECONDS,
  UPNEXT_RING_RADIUS,
  UPNEXT_RING_CIRCUMFERENCE,
} from './components/player/playback';
export type { TimeMarker } from './components/player/playback';
export {
  averageRegion,
  sampleAmbient,
  ambientGradient,
  rgbString,
  rgbaString,
  isBatterySaving,
  AMBIENT_SAMPLE_W,
  AMBIENT_SAMPLE_H,
  AMBIENT_SAMPLE_INTERVAL_MS,
} from './components/player/ambient';
export type { Rgb, AmbientSample, BatteryLike } from './components/player/ambient';
export {
  listSubtitleTracks,
  listAudioTracks,
  resolveTextTrack,
  hasActiveCaptions,
  applyTrackModes,
  applyAudioTrack,
  activeAudioIndex,
  readActiveCueLines,
  cleanCueText,
  edgeShadow,
  captionStyleVars,
  CAPTION_SIZE_SCALE,
  CAPTION_SIZE_OPTIONS,
  CAPTION_COLOR_OPTIONS,
  CAPTION_BACKGROUND_OPTIONS,
  CAPTION_EDGE_OPTIONS,
} from './components/player/captions';
export type { TextTrackInfo } from './components/player/captions';
export { formatTime } from './components/player/format-time';
export { PLAYER_SHORTCUTS, ARROW_ICONS, ARROW_LABELS, useKeyboardShortcuts, handleShortcut, isTypingTarget } from './components/player/shortcuts';
export type { ShortcutRow, ShortcutActions } from './components/player/shortcuts';
export { default as LoginForm } from './components/LoginForm.vue';
export { default as SignupForm } from './components/SignupForm.vue';
export { default as SettingsForm } from './components/SettingsForm.vue';
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
export { default as FederationPage } from './pages/FederationPage.vue';
export { default as ManageSharesPage } from './pages/ManageSharesPage.vue';

export { useAuthStore } from './stores/useAuthStore';

export { useMediaStore } from './stores/useMediaStore';
export type { SortField, SortOrder } from './stores/useMediaStore';
export { bindMediaStoreToRouter } from './composables/useMediaUrlSync';

export { useLibrariesStore } from './stores/useLibrariesStore';
export { fetchLibraries, sortLibraries } from './api/libraries';
export type { LibrarySummary } from './api/libraries';

// Article-aware title sorting (mirror of the server's SortTitle): file "The Plot"
// under P. Exposed so hosts can sort/group local lists the same way the server does.
export {
  stripLeadingArticle,
  compareByStrippedTitle,
  SORT_TITLE_ARTICLES,
} from './utils/sortTitle';

export { useToastStore } from './stores/useToastStore';
export type { Toast, ToastInput, ToastTone, ToastAction } from './stores/useToastStore';

export { usePreferencesStore, readStoredPreferences, hasStoredPreferences, DEFAULT_PREFERENCES, DEFAULT_CAPTION_STYLE } from './stores/usePreferencesStore';
export type { Preferences, ThemeName, Density, MotionPref, FilterPreset, CaptionStyle, CaptionSize, CaptionBackground, CaptionEdge } from './stores/usePreferencesStore';
export { usePlayerStore, RESUME_MIN_SECONDS, RESUME_MAX_RATIO } from './stores/usePlayerStore';
export type { MediaSessionHandlers } from './stores/usePlayerStore';
export { useCommandStore, fuzzyScore, matchCommand } from './stores/useCommandStore';
export type { Command } from './stores/useCommandStore';
// NOTE (R6.1b): CommandPalette is NOT re-exported — the shell (`PhlixApp`) lazy-loads it
// via `defineAsyncComponent` on first open so its chunk stays out of the initial bundle;
// a static re-export would re-merge it into the main chunk (INEFFECTIVE_DYNAMIC_IMPORT).
// The always-on ⌘K hotkey that opens it is the exported `useCommandPaletteHotkey`.
export { useCommandPaletteHotkey } from './composables/useCommandPaletteHotkey';
export { useTheme, applyStoredThemeEarly } from './composables/useTheme';
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
