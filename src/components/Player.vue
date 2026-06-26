<script setup lang="ts">
/**
 * Player (R3.1 — shell + chrome) — the redo player surface.
 *
 * Rebuilt on `usePlayerStore` (R1.3) and the icon primitives, porting the locked
 * R0 art direction (`src/dev/mockups/player-chrome.html`): gradient scrims, a
 * "Now playing" metadata overlay, a big animated center play/pause, and a basic
 * bottom control bar (click-to-seek progress + time + mute + fullscreen). The
 * `<video>` and the store stay in sync both ways. Chrome auto-hides while playing
 * and reappears on pointer move / focus / tap (always shown while paused).
 *
 * Later steps layered on the rich scrubber (R3.2), keyboard map (R3.3),
 * volume/speed/track menus (R3.4), captions (R3.5), ambient/theater (R3.6),
 * PiP/mini-player (R3.7), and resume/up-next/autoplay + the "needs transcode"
 * guard (R3.8). PlayerPage integration (real stream-URL resolution + the
 * route-leave mini-player toggle) is R3.9.
 */
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import type { MediaItem } from '../types/media-item';
import { usePlayerStore } from '../stores/usePlayerStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import Icon from './Icon.vue';
import Scrubber, { type Chapter } from './player/Scrubber.vue';
import { formatTime } from './player/format-time';
import { useMessages } from '../composables/useMessages';
import { useHlsTranscode } from '../composables/useHlsTranscode';
import ShortcutsHelp from './player/ShortcutsHelp.vue';
import VolumeControl from './player/VolumeControl.vue';
import SpeedMenu from './player/SpeedMenu.vue';
import QualityMenu from './player/QualityMenu.vue';
import CaptionOverlay from './player/CaptionOverlay.vue';
import CaptionsMenu from './player/CaptionsMenu.vue';
import AmbientCanvas from './player/AmbientCanvas.vue';
import ResumePrompt from './player/ResumePrompt.vue';
import UpNext from './player/UpNext.vue';
import TranscodeNotice from './player/TranscodeNotice.vue';
import TranscodePreparing from './player/TranscodePreparing.vue';
import SkipButton from './player/SkipButton.vue';
import {
  needsTranscode,
  isFatalMediaError,
  isNetworkMediaError,
  UPNEXT_COUNTDOWN_SECONDS,
  type TimeMarker,
} from './player/playback';
import type { SubtitleTrack } from './player/transcode';
import {
  listSubtitleTracks,
  listAudioTracks,
  activeAudioIndex,
  applyAudioTrack,
  type TextTrackInfo,
} from './player/captions';
import { useKeyboardShortcuts, type ShortcutActions } from './player/shortcuts';
import type { SelectOptionInput } from './ui/listbox';

const props = defineProps<{
  media: MediaItem;
  streamUrl: string;
  /** Idle ms before the chrome hides while playing. */
  idleTimeout?: number;
  /** Chapter markers for the scrubber (server hint / VTT — optional). */
  chapters?: Chapter[];
  /** Intro range (server playback-info) — shows a "Skip intro" button while in-range. */
  introMarker?: TimeMarker | null;
  /** Outro range (server playback-info) — shows a "Skip outro" button while in-range. */
  outroMarker?: TimeMarker | null;
  /** Preview-thumbnail source for a given time (VTT sprite / server hint — optional). */
  thumbnailAt?: (seconds: number) => string | null | undefined;
  /** Server-supplied stream-quality variants (optional; the menu hides when empty). */
  qualities?: SelectOptionInput[];
  /** Resolve the stream URL for a queued item when auto-advancing to "up next".
   *  R3.9's PlayerPage supplies the real `/media/:id/stream` resolver; without it,
   *  advancing clears the store's stream URL rather than leaving a stale one. */
  streamUrlFor?: (media: MediaItem) => string | undefined;
  /** API base for the on-demand transcode endpoints. When a file can't be
   *  direct-played the player POSTs `${apiBase}/api/v1/media/:id/transcode` and
   *  plays the resulting HLS stream via hls.js. Defaults to the page origin. */
  apiBase?: string;
  /** Previous episode in the series order (U2) — drives the Prev button for
   *  series content. null/absent hides the button (movies, or the very first
   *  episode). The host (PlayerPage) resolves it across seasons + navigates. */
  prevEpisode?: MediaItem | null;
  /** Next episode in the series order (U2) — drives the Next button. null/absent
   *  hides the button (movies, or the very last episode). */
  nextEpisode?: MediaItem | null;
  /** Start playback automatically once the source is ready (U2). The host page
   *  enables this since the player is reached via a Play click (a user gesture),
   *  so unmuted autoplay usually works; a rejected play() falls back to a muted
   *  retry, then surfaces the existing play control. Defaults to false so the
   *  component is unchanged where a host doesn't opt in. */
  autoplay?: boolean;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  /** Captions toggle (wired in R3.5). */
  (e: 'captions'): void;
  /** Theater-mode toggle (R3.6) — payload is the new on/off state so the host
   *  page (PlayerPage, R3.9) can widen its column + dim the surroundings. */
  (e: 'theater', active: boolean): void;
  /** Picture-in-picture toggle (wired in R3.7). */
  (e: 'pip'): void;
  /** Advanced to the next queued item (up-next countdown elapsed or "Play now").
   *  Payload is the new current item so the host can navigate / swap the source. */
  (e: 'play-next', media: MediaItem): void;
  /** Prev/Next episode button pressed (U2, series content). Payload is the target
   *  episode; the host navigates to its player route. */
  (e: 'play-episode', media: MediaItem): void;
}>();

const player = usePlayerStore();
const prefs = usePreferencesStore();
const { t } = useMessages();

/** Playback-speed ladder for the `<`/`>` shortcuts. */
const SPEED_LADDER = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const videoRef = ref<HTMLVideoElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const showChrome = ref(true);
const fullscreen = ref(false);
const scrubbing = ref(false);
const showHelp = ref(false);
const theater = ref(false);
const inPip = ref(false);
/** Whether the browser supports Picture-in-Picture (the button hides if not). */
const pipSupported = ref(false);

/** Ambient glow brightens in theater mode (the "dim surroundings" cinema feel). */
const ambientIntensity = computed(() => (theater.value ? 1.35 : 1));

// ---- resume / up-next / transcode (R3.8) ------------------------------------
/** True when the current file can't be direct-played (mkv/hevc/… by extension, or
 *  a fatal media error). Instead of dead-ending at a notice, this kicks off an
 *  on-demand server transcode and plays the resulting HLS stream (see `tc`); the
 *  notice now only appears if that transcode itself fails. The extension check is
 *  synchronous so the preparing overlay paints on the first frame (no black
 *  flash); a fatal <video> error flips it at runtime. */
const transcodeNeeded = ref(needsTranscode(props.streamUrl, props.media.path));

/** HLS transcode-to-play controller: starts the server job, polls readiness, and
 *  attaches the resulting playlist to <video> via hls.js. `apiBase` falls back to
 *  the page origin (the SPA is served by phlix-server) when the host omits it. */
const tc = useHlsTranscode({ apiBase: () => props.apiBase ?? '' });

/** Direct-play source for the <video>. Cleared while transcoding so hls.js owns
 *  the element's source instead of a (now-incompatible) direct URL binding. */
const videoSrc = computed(() => (transcodeNeeded.value ? undefined : props.streamUrl));

/** While a transcode is needed and not yet playing, the normal chrome is hidden
 *  behind the preparing/notice overlay. Once HLS is attached (`ready`) the full
 *  player chrome returns and plays the transcoded stream. */
const transcodeBlocking = computed(() => transcodeNeeded.value && tc.state.value !== 'ready');
/** Show the "preparing your stream" overlay while the job spins up. */
const showPreparing = computed(
  () => transcodeNeeded.value && (tc.state.value === 'preparing' || tc.state.value === 'idle'),
);
/** Show the "can't play" notice only when the transcode genuinely failed. */
const showTranscodeNotice = computed(() => transcodeNeeded.value && tc.state.value === 'error');

/** Kick off (or restart) the transcode-to-play flow for the current media. */
function beginTranscode(): void {
  const v = videoRef.value;
  if (v) void tc.start(v, props.media.id);
}

const resumeSeconds = ref(player.resumePositionFor(props.media.id) ?? 0);
/** Resume prompt — shown on open when an in-band position is stored (the store
 *  only ever persists in-band positions, so a stored value is in-band already). */
const showResume = ref(!transcodeNeeded.value && resumeSeconds.value > 0);
/** A resume seek requested before metadata loaded — applied on loadedmetadata. */
let pendingSeek: number | null = null;

const upNextActive = ref(false);
const upNextRemaining = ref(UPNEXT_COUNTDOWN_SECONDS);
let upNextTimer: ReturnType<typeof setInterval> | undefined;

/** The next queued item, if any (drives the up-next card). */
const nextItem = computed(() => player.upNext);

/** Recompute the per-media surfaces (transcode guard + resume prompt) and reset
 *  any in-flight up-next — used when the media prop changes. */
function evaluateForCurrentMedia(): void {
  transcodeNeeded.value = needsTranscode(props.streamUrl, props.media.path);
  resumeSeconds.value = player.resumePositionFor(props.media.id) ?? 0;
  showResume.value = !transcodeNeeded.value && resumeSeconds.value > 0;
  pendingSeek = null;
  autoplayAttempted = false; // a fresh source may autoplay again (U2)
  serverDefaultApplied = false; // re-evaluate the server default for the new source (U4)
  stopUpNextCountdown();
  upNextActive.value = false;
  // Tear down any previous HLS session; start a fresh one if the new item needs it.
  tc.reset();
  if (transcodeNeeded.value) beginTranscode();
}

// resume ----------------------------------------------------------------------
function seekTo(seconds: number): void {
  const v = videoRef.value;
  if (!v) return;
  if (v.duration && v.duration > 0) v.currentTime = Math.min(v.duration, Math.max(0, seconds));
  else pendingSeek = Math.max(0, seconds); // duration unknown — defer to loadedmetadata
}
function resumePlayback(): void {
  seekTo(resumeSeconds.value);
  showResume.value = false;
  void videoRef.value?.play()?.catch(() => {});
}
function startOver(): void {
  pendingSeek = null;
  seekTo(0);
  player.clearResume(props.media.id);
  showResume.value = false;
  void videoRef.value?.play()?.catch(() => {});
}

// up-next ---------------------------------------------------------------------
function stopUpNextCountdown(): void {
  if (upNextTimer) {
    clearInterval(upNextTimer);
    upNextTimer = undefined;
  }
}
function startUpNextCountdown(): void {
  upNextRemaining.value = UPNEXT_COUNTDOWN_SECONDS;
  stopUpNextCountdown();
  upNextTimer = setInterval(() => {
    upNextRemaining.value -= 1;
    if (upNextRemaining.value <= 0) {
      stopUpNextCountdown();
      playNext();
    }
  }, 1000);
}
/** End of playback — surface the chrome + up-next card (and count down when autoplay is on). */
function onEnded(): void {
  // Pin the chrome open explicitly: browsers do NOT reliably fire `pause` on
  // `ended` (Safari notably does not), so the play-state watcher that normally
  // reveals the chrome on stop may never run. Without this, the end-of-video
  // surface (controls + the up-next card, both bottom-right) stays hidden
  // behind the idle auto-hide until the user moves the mouse — the reported
  // "box shows nothing until mouseover" bug. clearIdle() also cancels any
  // pending hide scheduled during playback.
  clearIdle();
  showChrome.value = true;
  if (!player.upNext) return; // nothing queued — just surface the chrome and stop
  upNextActive.value = true;
  if (prefs.autoplay) startUpNextCountdown();
}
function playNext(): void {
  stopUpNextCountdown();
  upNextActive.value = false;
  const n = player.next(props.streamUrlFor); // threads a fresh stream URL (R3.9)
  if (n) emit('play-next', n);
}
function cancelUpNext(): void {
  stopUpNextCountdown();
  upNextActive.value = false;
}

// transcode guard -------------------------------------------------------------
function onVideoError(): void {
  // Ignore errors once we're already on HLS — hls.js reports its own fatal errors
  // via tc.onError.
  if (transcodeNeeded.value) return;
  const v = videoRef.value;
  // Flip to the transcode path (which streams HLS over the relay proxy on the hub)
  // when either:
  //   - a fatal decode/format error on the DIRECT source (e.g. HEVC in an mp4 the
  //     extension check passed), OR
  //   - the direct source host was unreachable (network error) before any playback
  //     progress — e.g. a paired server with no reachable public origin on the hub.
  //     Gated on currentTime === 0 so a mid-playback network blip doesn't tear a
  //     healthy session down.
  const unreachableDirect = isNetworkMediaError(v) && (v?.currentTime ?? 0) === 0;
  if (isFatalMediaError(v) || unreachableDirect) {
    transcodeNeeded.value = true;
    beginTranscode();
  }
}

// ---- captions / tracks (R3.5) -----------------------------------------------
const textTracks = ref<TextTrackInfo[]>([]);
const audioTracks = ref<TextTrackInfo[]>([]);
const activeAudio = ref(-1);
const captionsMenuOpen = ref(false);
/** Last on-language, so the `c` key can restore it after toggling off. */
let lastSubtitleLang: string | null = player.subtitleLang;

// ---- server subtitle sidecars (U4) ------------------------------------------
/** WebVTT subtitle tracks the server extracted for a transcoded source (S4).
 *  Rendered as native `<track>` elements into the `<video>` so the existing
 *  captions.ts enumeration + overlay pick them up automatically. Their `url`s
 *  are already resolved against the API base by the transcode composable, the
 *  same way the master-playlist URL is. Empty for direct-play (no job → no
 *  sidecars), which simply renders no `<track>`s. */
const serverSubtitleTracks = computed<SubtitleTrack[]>(() => tc.subtitleTracks.value);

/** One-shot guard so the server default is adopted at most once per source (reset
 *  per source in `evaluateForCurrentMedia`). The user-choice signal
 *  (`prefs.subtitlePreferenceSet`) takes precedence over this: once the user has
 *  chosen a caption state we never auto-apply, on this source or any later poll. */
let serverDefaultApplied = false;

/** Apply the server's default subtitle track once the `<track>`s are enumerated,
 *  unless the user has already made an explicit caption choice. The precedence
 *  signal is `prefs.subtitlePreferenceSet` — set to `true` by CaptionsMenu /
 *  Settings on ANY user selection, INCLUDING "Off" — so an explicit Off (which is
 *  stored as the same `defaultSubtitleLang === null` as the unset state) is no
 *  longer overridden by a late-arriving track poll or an episode switch. This is
 *  persisted, so the user's choice (incl. Off) carries across episodes/sessions;
 *  a fresh source still adopts ITS server default only while the user hasn't
 *  chosen. */
function maybeApplyServerDefault(): void {
  if (serverDefaultApplied) return;
  // The user has explicitly chosen a caption state (a language OR Off) — never
  // override it, neither now nor on any later poll for this or another source.
  if (prefs.subtitlePreferenceSet) {
    serverDefaultApplied = true;
    return;
  }
  const def = serverSubtitleTracks.value.find((s) => s.default);
  if (!def) return; // no server default → leave captions off
  // Match the enumerated native track key (== its language/label) so selection
  // round-trips through captions.ts.
  const match = textTracks.value.find((t) => t.language === (def.language || def.label));
  if (match) {
    player.setSubtitle(match.language);
    lastSubtitleLang = match.language;
    serverDefaultApplied = true;
  }
}

/** Captions are "on" only when the selected language resolves to a real track. */
const captionsOn = computed(() => textTracks.value.some((t) => t.language === player.subtitleLang));

function refreshTracks(): void {
  const v = videoRef.value;
  textTracks.value = listSubtitleTracks(v);
  audioTracks.value = listAudioTracks(v);
  activeAudio.value = activeAudioIndex(v);
  maybeApplyServerDefault();
}

/** `c` shortcut — quick session toggle of captions on/off (the menu persists the
 *  cross-session default). Restores the last language, else the first track. */
function toggleCaptions(): void {
  if (captionsOn.value) {
    lastSubtitleLang = player.subtitleLang;
    player.setSubtitle(null);
  } else {
    const restore =
      lastSubtitleLang && textTracks.value.some((t) => t.language === lastSubtitleLang)
        ? lastSubtitleLang
        : (textTracks.value[0]?.language ?? null);
    player.setSubtitle(restore);
  }
  emit('captions'); // host hook (e.g. PlayerPage, R3.9)
}

function onSelectAudio(index: number): void {
  applyAudioTrack(videoRef.value, index);
  activeAudio.value = index;
}

// When the server subtitle sidecars change (initial list, or a late arrival on a
// status poll), Vue renders/removes the `<track>` elements; re-enumerate on the
// next tick so the menu + overlay see them (belt-and-braces alongside the
// addtrack/removetrack listeners, which jsdom doesn't always fire).
watch(
  serverSubtitleTracks,
  () => {
    void nextTick(() => refreshTracks());
  },
  { deep: true },
);

let trackList: TextTrackList | null = null;

let idleTimer: ReturnType<typeof setTimeout> | undefined;

// Ordered meta segments — year, cert, runtime, first genre (matches the locked
// mockup: a dot precedes every segment except the cert, which hugs the year).
const metaSegments = computed(() => {
  const segs: { text: string; cert?: boolean }[] = [];
  if (props.media.year) segs.push({ text: String(props.media.year) });
  if (props.media.rating) segs.push({ text: props.media.rating, cert: true });
  if (props.media.runtime) segs.push({ text: `${props.media.runtime}m` });
  const g = props.media.genres?.[0];
  if (g) segs.push({ text: g });
  return segs;
});

// ---- autoplay on load (U2) --------------------------------------------------
/** Guard so the autoplay attempt fires at most once per loaded source (a media
 *  change resets it). Avoids re-triggering on every `canplay`/`loadeddata`. */
let autoplayAttempted = false;

/** Try to start playback once the source is ready. Honours the browser autoplay
 *  policy: an unmuted `play()` usually succeeds (the player is reached via a Play
 *  click), but if it rejects with NotAllowedError we retry MUTED (the policy
 *  always permits muted autoplay); if even that rejects we leave the existing
 *  play control / center button as the "tap to play" affordance. Never throws an
 *  unhandled rejection. Skipped while a resume prompt is showing (autoplay applies
 *  after the user resolves resume) or while transcoding (HLS owns readiness). */
function attemptAutoplay(): void {
  if (!props.autoplay || autoplayAttempted) return;
  if (showResume.value || transcodeBlocking.value) return;
  const v = videoRef.value;
  if (!v || !v.paused) return;
  autoplayAttempted = true;
  const p = v.play();
  if (p && typeof p.then === 'function') {
    p.catch((err: unknown) => {
      // Gesture not carried through navigation → retry muted (always allowed).
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        v.muted = true;
        player.muted = true;
        void v.play()?.catch(() => {
          /* still blocked — the play control stays as the tap-to-play affordance */
        });
      }
      // Any other rejection: leave the play control visible; do not rethrow.
    });
  }
}

/** Source is ready to play (canplay) — try autoplay once. */
function onCanPlay(): void {
  attemptAutoplay();
}

// ---- prev/next episode (U2) -------------------------------------------------
function playPrevEpisode(): void {
  if (props.prevEpisode) emit('play-episode', props.prevEpisode);
}
function playNextEpisode(): void {
  if (props.nextEpisode) emit('play-episode', props.nextEpisode);
}

// ---- transport (video → store and store → video) ----------------------------
function togglePlay(): void {
  const v = videoRef.value;
  if (!v) return;
  if (v.paused) void v.play()?.catch(() => {});
  else v.pause();
}

function bufferedEnd(v: HTMLVideoElement): number {
  try {
    return v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0;
  } catch {
    return 0;
  }
}

function onPlay(): void {
  player.play();
}
function onPause(): void {
  player.pause();
}
function onTimeUpdate(): void {
  const v = videoRef.value;
  if (v) {
    player.updateProgress(v.currentTime, v.duration, bufferedEnd(v));
    player.setMediaPositionState(); // keep the OS scrubber in sync
  }
}
function onLoadedMetadata(): void {
  const v = videoRef.value;
  if (!v) return;
  // push the store's selections onto the freshly-loaded element
  v.volume = player.volume;
  v.muted = player.muted;
  v.playbackRate = player.rate;
  // apply a resume seek requested before the duration was known
  if (pendingSeek !== null) {
    v.currentTime = v.duration ? Math.min(v.duration, pendingSeek) : pendingSeek;
    pendingSeek = null;
  }
  player.updateProgress(v.currentTime, v.duration, bufferedEnd(v));
  player.setMediaPositionState();
  refreshTracks(); // text/audio tracks are known once metadata is in
}
function onProgress(): void {
  const v = videoRef.value;
  if (v) player.updateProgress(v.currentTime, v.duration, bufferedEnd(v));
}
function onVolumeChange(): void {
  const v = videoRef.value;
  if (!v) return;
  // volume first (the store unmutes when volume > 0), then mute — so an explicit
  // mute reported in the same event still wins.
  if (Math.abs(v.volume - player.volume) > 0.001) player.setVolume(v.volume);
  if (v.muted !== player.muted) player.toggleMute();
}
function onRateChange(): void {
  const v = videoRef.value;
  if (v && v.playbackRate !== player.rate) player.setRate(v.playbackRate);
}

/** Seek to an absolute time (seconds) — driven by the Scrubber. */
function onSeek(seconds: number): void {
  const v = videoRef.value;
  if (v && player.duration > 0) v.currentTime = Math.min(player.duration, Math.max(0, seconds));
}
function onScrubStart(): void {
  scrubbing.value = true;
  revealChrome();
}
function onScrubEnd(): void {
  scrubbing.value = false;
  revealChrome();
}

// ---- keyboard shortcuts (R3.3) ----------------------------------------------
function speedStep(direction: 1 | -1): void {
  const i = SPEED_LADDER.reduce(
    (best, r, idx) => (Math.abs(r - player.rate) < Math.abs(SPEED_LADDER[best] - player.rate) ? idx : best),
    0,
  );
  const next = SPEED_LADDER[Math.min(SPEED_LADDER.length - 1, Math.max(0, i + direction))];
  player.setRate(next); // the rate watch mirrors it onto the element
}

const shortcutActions: ShortcutActions = {
  playPause: togglePlay,
  seekBy: (delta) => onSeek(player.position + delta),
  frameStep: (dir) => {
    if (!player.playing) onSeek(player.position + dir / 30);
  },
  volumeBy: (delta) => player.setVolume(player.volume + delta),
  toggleMute,
  toggleFullscreen,
  toggleCaptions,
  toggleTheater,
  togglePip,
  seekToPercent: (frac) => onSeek(frac * player.duration),
  speedStep,
  toggleHelp: () => {
    showHelp.value = !showHelp.value;
  },
};
// Suppress player shortcuts while the help modal or captions menu is open (their
// own Esc/close + the inner Select's arrow keys win, no double-fire).
useKeyboardShortcuts(shortcutActions, { enabled: () => !showHelp.value && !captionsMenuOpen.value });

function toggleMute(): void {
  // Drive the store; the `player.muted` watch mirrors it onto the element (which,
  // in a real browser, then fires volumechange — a no-op since they now agree).
  player.toggleMute();
}

/** Theater mode (R3.6) — widen + brighten the ambient surround in-component, and
 *  emit the new state so the host page can widen its column + dim the page. */
function toggleTheater(): void {
  theater.value = !theater.value;
  emit('theater', theater.value);
}

// reflect store selections (e.g. set elsewhere) back onto the element
watch(
  () => player.muted,
  (m) => {
    const v = videoRef.value;
    if (v && v.muted !== m) v.muted = m;
  },
);
watch(
  () => player.volume,
  (vol) => {
    const v = videoRef.value;
    if (v && Math.abs(v.volume - vol) > 0.001) v.volume = vol;
  },
);
watch(
  () => player.rate,
  (r) => {
    const v = videoRef.value;
    if (v && v.playbackRate !== r) v.playbackRate = r;
  },
);

// External transport command bus (R-player-seam) — a host outside the Vue tree
// (Electron tray / media keys, TV remotes) pushes a seek intent onto the store;
// the live element owner applies it here via the internal `seekTo`, which defers
// through `pendingSeek` when duration isn't known yet (seek-before-metadata). The
// element move then drives `updateProgress` via its own events, exactly like the
// user's scrubber seek — so external + user seeks behave identically.
watch(
  () => player.lastCommand,
  (cmd) => {
    if (!cmd) return;
    if (cmd.type === 'seekTo') seekTo(cmd.value);
    else if (cmd.type === 'seekBy') seekTo(player.position + cmd.value);
  },
);

// ---- fullscreen -------------------------------------------------------------
function toggleFullscreen(): void {
  if (typeof document === 'undefined') return;
  const el = containerRef.value;
  if (!el) return;
  if (!document.fullscreenElement) void el.requestFullscreen?.().catch(() => {});
  else void document.exitFullscreen?.().catch(() => {});
}
function onFullscreenChange(): void {
  fullscreen.value = typeof document !== 'undefined' && !!document.fullscreenElement;
}

// ---- picture-in-picture (R3.7) ----------------------------------------------
async function togglePip(): Promise<void> {
  const v = videoRef.value;
  if (typeof document !== 'undefined' && v) {
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else if (typeof v.requestPictureInPicture === 'function') await v.requestPictureInPicture();
    } catch {
      /* no user gesture / disabled / unsupported — ignore */
    }
  }
  emit('pip'); // host hook (e.g. PlayerPage, R3.9)
}
function onEnterPip(): void {
  inPip.value = true;
}
function onLeavePip(): void {
  inPip.value = false;
}

// ---- chrome auto-hide -------------------------------------------------------
function clearIdle(): void {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = undefined;
  }
}
function scheduleHide(): void {
  clearIdle();
  if (!player.playing || scrubbing.value) return; // never hide while paused or scrubbing
  idleTimer = setTimeout(() => {
    if (player.playing && !scrubbing.value) showChrome.value = false;
  }, props.idleTimeout ?? 3000);
}
function revealChrome(): void {
  showChrome.value = true;
  scheduleHide();
}

watch(
  () => player.playing,
  (playing) => {
    if (!playing) {
      clearIdle();
      showChrome.value = true; // always visible when paused
    } else {
      // playback (re)started: a resume choice + a lingering up-next are both moot
      // (e.g. the user replays the just-ended video instead of picking Play now /
      // Cancel — don't let the countdown advance the queue mid-replay).
      showResume.value = false;
      cancelUpNext();
      scheduleHide();
    }
  },
);

// ---- Media Session (R3.7) — OS / lock-screen transport ----------------------
let mediaSessionTeardown: (() => void) | null = null;

// ---- lifecycle --------------------------------------------------------------
onMounted(() => {
  player.setCurrent(props.media, { resetPosition: false, streamUrl: props.streamUrl });
  if (typeof document !== 'undefined') {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    pipSupported.value = document.pictureInPictureEnabled === true;
  }
  // OS media keys drive the element; the store's metadata is set by setCurrent.
  mediaSessionTeardown = player.bindMediaSession({
    onPlay: () => void videoRef.value?.play()?.catch(() => {}),
    onPause: () => videoRef.value?.pause(),
    onSeek: (to) => onSeek(to),
  });
  // Re-enumerate when the host adds/removes <track>s (sidecar VTT, R3.9).
  trackList = videoRef.value?.textTracks ?? null;
  trackList?.addEventListener?.('addtrack', refreshTracks);
  trackList?.addEventListener?.('removetrack', refreshTracks);
  refreshTracks();
  // A file flagged as non-direct-playable by extension transcodes from the start.
  if (transcodeNeeded.value) beginTranscode();
});
watch(
  () => props.media,
  (m) => {
    player.setCurrent(m, { resetPosition: false, streamUrl: props.streamUrl });
    evaluateForCurrentMedia();
  },
);
onBeforeUnmount(() => {
  clearIdle();
  stopUpNextCountdown();
  tc.cleanup();
  if (typeof document !== 'undefined') document.removeEventListener('fullscreenchange', onFullscreenChange);
  mediaSessionTeardown?.();
  trackList?.removeEventListener?.('addtrack', refreshTracks);
  trackList?.removeEventListener?.('removetrack', refreshTracks);
});
</script>

<template>
  <div
    ref="containerRef"
    class="player"
    :class="{ 'is-chrome-hidden': !showChrome, 'is-theater': theater }"
    @pointermove="revealChrome"
    @pointerdown="revealChrome"
    @focusin="revealChrome"
  >
    <!-- ambient ("Ambilight") glow — behind the stage, spills beyond the frame -->
    <AmbientCanvas
      :video="videoRef"
      :enabled="prefs.atmosphere"
      :playing="player.playing"
      :reduced-motion="prefs.effectiveReducedMotion"
      :intensity="ambientIntensity"
    />

    <!-- the framed video box (clips its own chrome; the ambient halo is outside it) -->
    <div class="player__stage">
      <video
        ref="videoRef"
        class="player__video"
        :src="videoSrc"
        :poster="media.poster_url ?? undefined"
        preload="metadata"
        playsinline
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onLoadedMetadata"
        @canplay="onCanPlay"
        @progress="onProgress"
        @volumechange="onVolumeChange"
        @ratechange="onRateChange"
        @ended="onEnded"
        @error="onVideoError"
        @enterpictureinpicture="onEnterPip"
        @leavepictureinpicture="onLeavePip"
        @click="togglePlay"
      >
        <!-- Server-extracted WebVTT subtitle sidecars (U4). Native <track>s so the
             existing captions.ts enumeration + custom overlay pick them up. Keyed
             on the sidecar URL so a late-arriving list updates reactively. -->
        <track
          v-for="st in serverSubtitleTracks"
          :key="st.url"
          kind="subtitles"
          :src="st.url"
          :srclang="st.language || undefined"
          :label="st.label || undefined"
          :default="st.default"
        />
      </video>

      <div class="player__scrim player__scrim--top" aria-hidden="true" />
      <div class="player__scrim player__scrim--bottom" aria-hidden="true" />

      <!-- metadata -->
      <div class="player__meta">
        <button type="button" class="player__iconbtn player__back" :aria-label="t('player.back')" @click.stop="emit('back')">
          <Icon name="arrow-left" />
        </button>
        <div class="player__meta-text">
          <p class="player__eyebrow">{{ t('player.nowPlaying') }}</p>
          <h2 class="player__title">{{ media.name }}</h2>
          <div class="player__sub numeric">
            <template v-for="(seg, i) in metaSegments" :key="i">
              <span v-if="i > 0 && !seg.cert" class="player__dot" aria-hidden="true">·</span>
              <span :class="{ 'player__cert': seg.cert }">{{ seg.text }}</span>
            </template>
          </div>
        </div>
      </div>

      <!-- center play/pause (hidden behind the transcode notice) -->
      <div v-if="!transcodeBlocking" class="player__center">
        <button
          type="button"
          class="player__bigplay"
          :class="{ 'is-playing': player.playing }"
          :aria-label="player.playing ? t('player.pause') : t('player.play')"
          @click.stop="togglePlay"
        >
          <Icon :name="player.playing ? 'pause' : 'play'" />
        </button>
      </div>

      <!-- captions (custom overlay, lifts above the controls while chrome shows) -->
      <CaptionOverlay
        :video="videoRef"
        :language="player.subtitleLang"
        :style-config="prefs.captionStyle"
        :lifted="showChrome"
      />

      <!-- controls (hidden when the file can't be direct-played) -->
      <div v-if="!transcodeBlocking" class="player__controls" @click.stop>
        <Scrubber
          :position="player.position"
          :duration="player.duration"
          :buffered="player.buffered"
          :chapters="chapters"
          :thumbnail-at="thumbnailAt"
          @seek="onSeek"
          @scrub-start="onScrubStart"
          @scrub-end="onScrubEnd"
        />

        <div class="player__btnrow">
          <button
            v-if="prevEpisode"
            type="button"
            class="player__iconbtn"
            :aria-label="t('player.previousEpisode')"
            @click="playPrevEpisode"
          >
            <Icon name="skip-back" />
          </button>

          <button
            type="button"
            class="player__iconbtn player__iconbtn--lg"
            :aria-label="player.playing ? t('player.pause') : t('player.play')"
            @click="togglePlay"
          >
            <Icon :name="player.playing ? 'pause' : 'play'" />
          </button>

          <button
            v-if="nextEpisode"
            type="button"
            class="player__iconbtn"
            :aria-label="t('player.nextEpisode')"
            @click="playNextEpisode"
          >
            <Icon name="skip-forward" />
          </button>

          <span class="player__time numeric">
            {{ formatTime(player.position) }}<span class="player__sep"> / </span>{{ formatTime(player.duration) }}
          </span>

          <span class="player__grow" />

          <VolumeControl />
          <SpeedMenu />
          <QualityMenu :qualities="qualities" />
          <CaptionsMenu
            v-model:open="captionsMenuOpen"
            :tracks="textTracks"
            :audio-tracks="audioTracks"
            :active-audio="activeAudio"
            @select-audio="onSelectAudio"
          />

          <button
            type="button"
            class="player__iconbtn"
            :aria-label="t('player.keyboardShortcuts')"
            aria-haspopup="dialog"
            @click="showHelp = true"
          >
            <Icon name="info" />
          </button>

          <button
            v-if="pipSupported"
            type="button"
            class="player__iconbtn"
            :class="{ 'is-on': inPip }"
            :aria-label="inPip ? t('player.exitPip') : t('player.pip')"
            :aria-pressed="inPip"
            @click="togglePip"
          >
            <Icon name="pip" />
          </button>

          <button
            type="button"
            class="player__iconbtn"
            :class="{ 'is-on': theater }"
            :aria-label="theater ? t('player.exitTheater') : t('player.theater')"
            :aria-pressed="theater"
            @click="toggleTheater"
          >
            <Icon name="theater" />
          </button>

          <button
            type="button"
            class="player__iconbtn"
            :aria-label="fullscreen ? t('player.exitFullscreen') : t('player.fullscreen')"
            @click="toggleFullscreen"
          >
            <Icon :name="fullscreen ? 'fullscreen-exit' : 'fullscreen'" />
          </button>
        </div>
      </div>

      <!-- skip intro/outro (R3.10) — above the controls, stays visible while chrome hides -->
      <SkipButton
        v-if="!transcodeBlocking"
        :position="player.position"
        :intro-marker="introMarker"
        :outro-marker="outroMarker"
        @skip="onSeek"
      />

      <!-- resume prompt on open (R3.8) -->
      <ResumePrompt
        v-if="showResume && !transcodeBlocking"
        :seconds="resumeSeconds"
        @resume="resumePlayback"
        @restart="startOver"
      />

      <!-- end-of-video up-next card (R3.8) -->
      <UpNext
        v-if="upNextActive && nextItem && !transcodeBlocking"
        :media="nextItem"
        :remaining="upNextRemaining"
        :total="UPNEXT_COUNTDOWN_SECONDS"
        :counting="prefs.autoplay"
        @play-now="playNext"
        @cancel="cancelUpNext"
      />

      <!-- transcode preparing: spinner+progress while the server warms up the HLS job -->
      <TranscodePreparing v-if="showPreparing" :title="media.name" :progress="tc.progress.value" @back="emit('back')" />

      <!-- direct-play guard: opaque notice shown only when the transcode itself failed -->
      <TranscodeNotice v-if="showTranscodeNotice" :title="media.name" @back="emit('back')" />

      <ShortcutsHelp :open="showHelp" @close="showHelp = false" />
    </div>
  </div>
</template>

<style scoped>
.player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 90vh;
  margin: 0 auto;
  isolation: isolate;
  transition: max-height var(--dur-base) var(--ease-out);
}
.player.is-chrome-hidden {
  cursor: none;
}

/* The framed video box. Clips its own chrome (overflow hidden); the ambient
   halo (z 0) sits BEHIND it and is allowed to spill beyond the frame, so the
   root is NOT overflow-hidden. */
.player__stage {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-4);
  border: 1px solid var(--border-subtle);
  transition: border-radius var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}

/* Theater mode — widen + go edge-to-edge in-component; the host page dims and
   widens around it (R3.9). The ambient glow also brightens (ambientIntensity). */
.player.is-theater {
  max-height: 100vh;
}
.player.is-theater .player__stage {
  border-radius: 0;
  border-color: transparent;
}

.player__video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

/* scrims */
.player__scrim {
  position: absolute;
  inset-inline: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 1;
  transition: opacity var(--dur-base) var(--ease-out);
}
.player__scrim--top {
  top: 0;
  height: 35%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent);
}
.player__scrim--bottom {
  bottom: 0;
  height: 55%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.88), transparent);
}

/* metadata */
.player__meta {
  position: absolute;
  z-index: 4;
  top: var(--space-5);
  inset-inline: var(--space-6);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.player__eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--amber-300, var(--accent));
}
.player__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight, 1.1);
  color: #fff;
  margin-top: 2px;
}
.player__sub {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.72);
}
.player__cert {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  padding: 0 4px;
  margin-right: var(--space-1);
}
.player__dot {
  margin-inline: var(--space-1);
}

/* center play */
.player__center {
  position: absolute;
  z-index: 4;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.player__bigplay {
  pointer-events: auto;
  width: 84px;
  height: 84px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--surface-glass-strong, rgba(20, 20, 20, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-3);
  color: #fff;
  transition: transform var(--dur-base) var(--ease-spring), opacity var(--dur-base) var(--ease-out);
}
.player__bigplay :deep(svg) {
  width: 36px;
  height: 36px;
}
.player__bigplay:hover {
  transform: scale(1.06);
}
.player__bigplay:focus-visible {
  outline: none;
  box-shadow: var(--shadow-3), 0 0 0 3px var(--accent-ring);
}
/* while playing the center button fades unless the chrome is up */
.player__bigplay.is-playing {
  opacity: 0.85;
}

/* controls */
.player__controls {
  position: absolute;
  z-index: 5;
  inset-inline: var(--space-6);
  bottom: var(--space-5);
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}

.player__btnrow {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-2);
}
.player__iconbtn {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.92);
  transition: background var(--dur-fast) var(--ease-out);
}
.player__iconbtn:hover {
  background: rgba(255, 255, 255, 0.12);
}
.player__iconbtn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
/* active toggle (theater on) — amber tint */
.player__iconbtn.is-on {
  color: var(--accent);
}
.player__iconbtn :deep(svg) {
  width: 21px;
  height: 21px;
}
.player__iconbtn--lg :deep(svg) {
  width: 25px;
  height: 25px;
}
.player__back {
  margin-top: 2px;
}
.player__time {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.85);
  margin-inline: var(--space-2);
  font-variant-numeric: tabular-nums;
}
.player__sep {
  color: rgba(255, 255, 255, 0.5);
}
.player__grow {
  flex: 1;
}

/* chrome hide */
.player.is-chrome-hidden .player__scrim,
.player.is-chrome-hidden .player__meta,
.player.is-chrome-hidden .player__controls {
  opacity: 0;
  pointer-events: none;
}
.player.is-chrome-hidden .player__meta {
  transform: translateY(-8px);
}
.player.is-chrome-hidden .player__controls {
  transform: translateY(8px);
}
.player.is-chrome-hidden .player__bigplay {
  opacity: 0;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .player,
  .player__stage,
  .player__scrim,
  .player__meta,
  .player__controls,
  .player__bigplay {
    transition: none;
  }
}
</style>
