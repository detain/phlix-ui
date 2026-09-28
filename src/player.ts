/**
 * Secondary entry — Player surface.
 *
 * Exports the Player component and all player-specific composables / utilities
 * behind a dedicated `@phlix/ui/player` entry so they are NOT bundled into the
 * main `@phlix/ui` bundle. Consumers who need the Player surface import from
 * this entry instead.
 *
 * ⚠ DUPPLICATION REALITY (audit finding 8, 2026-09): this entry does NOT
 * import from `@phlix/ui` — every shared module (ApiClient, usePlayerStore,
 * …) reached through this graph is INLINED again into dist/player.js, so the
 * package ships two independent copies of that code. Importing both entries
 * in one app yields two module identities (the `'@phlix/ui'` external in
 * vite.player.config.ts is aspirational, never matched). Zero estate
 * consumers of `@phlix/ui/player` exist today; before the first one lands,
 * rewrite shared-module imports to route via `'@phlix/ui'` or retire this
 * entry. Styles: the player graph's CSS is published as
 * `@phlix/ui/player.css` — a strict subset of `@phlix/ui/style.css`; load one,
 * not both.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

// Player surface
export { default as Player } from './components/Player.vue';
export { default as MiniPlayer } from './components/MiniPlayer.vue';

// Player sub-components
export { default as Scrubber } from './components/player/Scrubber.vue';
export type { Chapter } from './components/player/Scrubber.vue';
export { default as ShortcutsHelp } from './components/player/ShortcutsHelp.vue';
export { default as VolumeControl } from './components/player/VolumeControl.vue';
export { default as SpeedMenu } from './components/player/SpeedMenu.vue';
export { default as QualityMenu } from './components/player/QualityMenu.vue';
export { default as CaptionOverlay } from './components/player/CaptionOverlay.vue';
export { default as CaptionsMenu } from './components/player/CaptionsMenu.vue';
export { default as SubtitleSearch } from './components/player/SubtitleSearch.vue';
export { default as AmbientCanvas } from './components/player/AmbientCanvas.vue';
export { default as ResumePrompt } from './components/player/ResumePrompt.vue';
export { default as UpNext } from './components/player/UpNext.vue';
export { default as TranscodeNotice } from './components/player/TranscodeNotice.vue';
export { default as TranscodePreparing } from './components/player/TranscodePreparing.vue';
export { default as SkipButton } from './components/player/SkipButton.vue';

// Player utilities
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
export type { HlsHandle, HlsLevel, AttachHlsOptions } from './components/player/hls-playback';

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

export {
    PLAYER_SHORTCUTS,
    ARROW_ICONS,
    ARROW_LABELS,
    useKeyboardShortcuts,
    handleShortcut,
    isTypingTarget,
} from './components/player/shortcuts';
export type { ShortcutRow, ShortcutActions } from './components/player/shortcuts';

// Player store — still needed by consumers who import from this entry
export { usePlayerStore, RESUME_MIN_SECONDS, RESUME_MAX_RATIO } from './stores/usePlayerStore';
export type { MediaSessionHandlers, PlayerCommand } from './stores/usePlayerStore';
