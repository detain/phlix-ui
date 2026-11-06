/**
 * useHlsTranscode — orchestrates the on-demand HLS transcode → playback flow.
 *
 * Given a <video> element and a media id, it asks the server to transcode the
 * file (POST /api/v1/media/:id/transcode), polls readiness
 * (GET /api/v1/transcode/:jobId/status) until the variant playlist has segments,
 * then attaches the HLS master playlist to the element via hls.js
 * ({@link attachHls}). It exposes a small reactive state machine the player uses
 * to show a "preparing" overlay, then the normal chrome once `ready` (or the
 * "can't play" notice on `error`).
 *
 * Everything external (the HTTP client, the hls attach, the inter-poll sleep) is
 * injectable so the flow can be unit-tested without a network or a real browser.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { ref, type Ref } from 'vue';
import { ApiClient, defaultTokenStore } from '../api/client';
import { usePlayerStore } from '../stores/usePlayerStore';
import { attachHls as defaultAttach, type AttachHlsOptions, type HlsAudioTrack, type HlsHandle, type HlsLevel } from '../components/player/hls-playback';
import {
  isFailedStatus,
  isPlayable,
  parseTranscodeStart,
  parseTranscodeStatus,
  resolveStreamUrl,
  transcodeStartPath,
  transcodeStatusPath,
  type SubtitleTrack,
  type Variant,
} from '../components/player/transcode';

/** State machine for the transcode-to-play flow. */
export type TranscodeState = 'idle' | 'preparing' | 'ready' | 'error';

/**
 * Suffix of the per-rung MINI-MASTER index the client loads for a pinned
 * quality — full name `media_v{id}_master.m3u8`. Contract authority:
 * phlix-server `src/Media/Transcoding/TranscodeManager.php`,
 * `writeVodPlaylists()`, which ships beside each bare `media_v{id}.m3u8` rung
 * a master-shaped index carrying the `#EXT-X-MEDIA:TYPE=AUDIO` group plus a
 * single `EXT-X-STREAM-INF` with `AUDIO="aud"` pointing at that rung.
 *
 * Why not the bare rung playlist: hls.js parses `EXT-X-MEDIA` only from
 * master-shaped playlists. Multi-audio titles have video-only (`-an`) rungs,
 * so loading the bare playlist yields ZERO audio tracks — silent playback
 * and a dormant audio menu (the 2026-11-06 incident). The id→name form here
 * is the wire contract: underscore before the suffix, never a hyphen (the
 * server's playlist-name regex `media_(v\w+|a\d+|0)\.m3u8` only admits \w).
 */
const RUNG_MINI_MASTER_SUFFIX = '_master.m3u8';

/** Minimal HTTP surface this composable needs (ApiClient-compatible). */
export interface TranscodeHttpClient {
  post<T = unknown>(endpoint: string, data?: unknown, signal?: AbortSignal): Promise<T>;
  get<T = unknown>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T>;
}

/** Options for {@link useHlsTranscode}. */
export interface UseHlsTranscodeOptions {
  /** Resolver for the API base (PlayerPage injects the app's base). */
  apiBase: () => string;
  /** Injectable HTTP client (defaults to a token-aware ApiClient). */
  client?: TranscodeHttpClient;
  /** Injectable hls attach (defaults to the real {@link attachHls}). */
  attach?: (video: HTMLVideoElement, url: string, opts?: AttachHlsOptions) => Promise<HlsHandle>;
  /** Bearer-token getter for segment requests. */
  getToken?: () => string | null;
  /** Poll interval between status checks (ms). */
  pollIntervalMs?: number;
  /** Give up after this long (ms). */
  maxWaitMs?: number;
  /** Injectable delay (defaults to setTimeout) — overridden in tests. */
  sleep?: (ms: number) => Promise<void>;
  /** Optional per-app hls.js config overrides threaded down to {@link attachHls}
   *  (e.g. a constrained TV tuning buffer lengths down to cap RAM). Merged OVER
   *  phlix-ui's defaults; never overrides the auth `xhrSetup` (see hls-playback). */
  hlsConfig?: Partial<import('hls.js').HlsConfig>;
  /** Injectable availability probe for a rung's mini-master index, used by
   *  {@link HlsTranscodeController.loadVariantPlaylist} (L1 forward-compat: a
   *  server predating the index, or a rung dir whose self-heal regeneration
   *  raced). `'absent'` (an explicit HTTP 404) is the ONLY outcome that falls
   *  back to the legacy bare rung playlist; `'available'` and `'unknown'`
   *  (5xx / network throw) load the mini-master unchanged so a transient
   *  failure can never silently degrade a working stream. Defaults to a HEAD
   *  request carrying the same bearer header hls.js uses. Overridden in tests. */
  probeRungPlaylist?: (url: string) => Promise<RungPlaylistProbe>;
}

/** Outcome of a rung-playlist availability probe — see
 *  {@link UseHlsTranscodeOptions.probeRungPlaylist}. */
export type RungPlaylistProbe = 'available' | 'absent' | 'unknown';

/**
 * A subtitle sidecar track exposed to the player, with its `url` already
 * resolved against the API base (an absolute URL ready for a `<track src>`).
 */
export type ResolvedSubtitleTrack = SubtitleTrack;

/** The reactive handle returned by {@link useHlsTranscode}. */
export interface HlsTranscodeController {
  state: Ref<TranscodeState>;
  progress: Ref<number>;
  /** Server-provided WebVTT subtitle tracks (absolute URLs). May arrive late on
   *  a status poll once extraction completes; empty for sources with no embedded
   *  text subtitles. The Player renders a `<track>` per entry. */
  subtitleTracks: Ref<ResolvedSubtitleTrack[]>;
  /** The selectable quality rungs of the attached stream, highest-first (mirrors
   *  {@link HlsHandle.levels}). Empty until the manifest is parsed, and always
   *  empty on the native-HLS (Safari) path where the browser owns ABR. */
  levels: Ref<HlsLevel[]>;
  /** The pinned level index, or `-1` when ABR ("Auto") is choosing. Reflects the
   *  user's {@link setLevel} choice and any ABR/manual switch. */
  currentLevel: Ref<number>;
  /** True while ABR ("Auto") is picking the level; stays `true` on native HLS. */
  autoEnabled: Ref<boolean>;
  /** Height (px) of whichever level is currently playing — useful for an
   *  "Auto (→720p)" label — or `null` when unknown / no levels (e.g. native HLS
   *  or before the first level switch settles). */
  activeLevelHeight: Ref<number | null>;
  /** Server-provided quality ladder ({@link Variant}[]) from the transcode
   *  start/status response. Used as fallback when hls.js levels are insufficient
   *  (e.g. manifest only has one quality) to populate the quality selector.
   *  Null on a legacy pre-ABR job. */
  variants: Ref<Variant[] | null>;
  /** The available audio tracks from the attached stream (P3B-S3 multi-audio).
   *  Mirrors {@link HlsHandle.audioTracks} live: re-read on manifest parse
   *  (including every rung reload), on each LEVEL_LOADED tick, and on settled
   *  track switches — so a playlist reload that empties or refills the group
   *  (hls.js fires only AUDIO_TRACKS_UPDATED there) can never leave stale
   *  renditions in the menu. Empty when the manifest has no
   *  #EXT-X-MEDIA:TYPE=AUDIO groups or on the native-HLS (Safari) path where
   *  audio tracks come from video.audioTracks. */
  audioTracks: Ref<HlsAudioTrack[]>;
  /** The currently selected audio track index, or `-1` when no audio track
   *  is active (e.g. native HLS path or a manifest with no audio groups). */
  currentAudioTrack: Ref<number>;
  /** True when the attached stream carries audio at all — a selectable
   *  rendition group OR audio muxed into the video segments (the rung's
   *  manifest `CODECS` declares an audio elementary stream). The
   *  player renders its single synthesized 'Original' audio track entry from
   *  this when {@link audioTracks} is empty but audio plays; a source with
   *  no audio (or the native-HLS path, where presence is unknowable here)
   *  keeps the menu hidden. Re-evaluated on manifest parse, LEVEL_LOADED
   *  (the codec reconciliation for a newly loaded level lands there), settled
   *  switches, and rung reloads. */
  hasAudio: Ref<boolean>;
  /** Pin a quality rung by level index for an IMMEDIATE switch, or pass `'auto'`
    *  to hand the choice back to ABR. Safe no-op before a stream is attached or on
    *  the native-HLS path. Updates {@link currentLevel}/{@link autoEnabled}
    *  optimistically; a later switch event reconciles the exact active level. */
  setLevel(level: number | 'auto'): void;
  /** Like {@link setLevel} but schedules the switch for the NEXT fragment load
    *  (non-flushing). Use for automatic/pref-seeded quality pins where you do
    *  NOT want to interrupt the in-flight buffer. User-initiated quality changes
    *  should still use {@link setLevel} (buffer-flushing is correct there). */
  setNextLevel(level: number | 'auto'): void;
  /** Switch to a different audio track by index (P3B-S3). Safe no-op before a
   *  stream is attached, when there are no audio tracks, or on the native-HLS
   *  path. Updates {@link currentAudioTrack} optimistically; a later
   *  AUDIO_TRACK_SWITCHED event reconciles the exact active track. */
  setAudioTrack(track: number): void;
  /** The transcode job ID, set once the start response arrives. Used to
   *  construct variant playlist URLs for non-ABR quality selection (e.g. "Original"). */
  jobId: Ref<string | null>;
  /** The master playlist URL, set once the start response arrives. Used to
   *  construct variant playlist URLs for non-ABR quality selection. */
  masterUrl: Ref<string | null>;
  /** Load a specific variant playlist directly (e.g. `media_voriginal_master.m3u8`)
   *  instead of using ABR level switching. This is used for the "Original"
   *  quality option when the original variant is not in the ABR ladder.
   *  The rung's mini-master index is probed first; only an explicit 404 falls
   *  back to the legacy bare rung playlist (L1 forward-compat — see
   *  {@link UseHlsTranscodeOptions.probeRungPlaylist}).
   *  Calling this will clear the buffer and restart playback. */
  loadVariantPlaylist(variantId: string): void;
  /** Start (or restart) the transcode-to-play flow. `profile` is OPTIONAL: when
   *  omitted the start request sends NO `?profile=` query, letting the server map
   *  the quality profile from the request's `X-Phlix-Device-Type` header (a TV
   *  identifies itself → gets >1080p). Pass an explicit profile to pin it.
   *  `startPosition` is the playback position in seconds to resume from on the
   *  transcode path (preserves position when falling back from direct play). */
  start(video: HTMLVideoElement, mediaId: string, profile?: string, startPosition?: number): Promise<void>;
  cleanup(): void;
  reset(): void;
}

export function useHlsTranscode(opts: UseHlsTranscodeOptions): HlsTranscodeController {
  const state = ref<TranscodeState>('idle');
  const progress = ref(0);
  const subtitleTracks = ref<ResolvedSubtitleTrack[]>([]);
  const levels = ref<HlsLevel[]>([]);
  const currentLevel = ref<number>(-1);
  const autoEnabled = ref<boolean>(true);
  const activeLevelHeight = ref<number | null>(null);
  const variants = ref<Variant[] | null>(null);
  const audioTracks = ref<HlsAudioTrack[]>([]);
  const currentAudioTrack = ref<number>(-1);
  /** Audio-carrying signal for the synthesized 'Original' menu entry — see
   *  {@link HlsTranscodeController.hasAudio}. Synced from the handle
   *  (`hasAudio()`), false while nothing is attached. */
  const hasAudio = ref<boolean>(false);
  /** The transcode job ID, set once the start response arrives. */
  const jobId = ref<string | null>(null);
  /** The master playlist URL, set once the start response arrives. */
  const masterUrl = ref<string | null>(null);

  /** Pull the live level getters off the attached handle into reactive state.
   *  Called on manifest-parse (`onReady`) and on every settled level switch —
   *  the two moments hls.js's live `levels`/`autoLevelEnabled` getters change.
   *  `activeIndex`, when given (from the switch event), names the level that is
   *  actually playing; otherwise we fall back to the pinned level. */
  function syncLevelState(activeIndex?: number): void {
    if (!handle) return;
    levels.value = handle.levels;
    currentLevel.value = handle.getCurrentLevel();
    autoEnabled.value = handle.autoLevelEnabled;
    const active = activeIndex ?? handle.getCurrentLevel();
    const match = active >= 0 ? levels.value.find((l) => l.index === active) : undefined;
    activeLevelHeight.value = match ? match.height : null;
  }

  /** Return the level refs to their Auto/empty defaults (no handle attached). */
  function resetLevelState(): void {
    levels.value = [];
    currentLevel.value = -1;
    autoEnabled.value = true;
    activeLevelHeight.value = null;
    variants.value = null;
  }

  /** Pull audio track state from the attached handle. Called on manifest-parse
   *  (including a rung reload's re-parse), on every LEVEL_LOADED tick, and on
   *  every settled audio track switch. hls.js's playlist reloads can clear or
   *  refill the group with only an AUDIO_TRACKS_UPDATED event (never
   *  AUDIO_TRACK_SWITCHED), so the ticks we DO subscribe to must re-read the
   *  live list — otherwise the menu serves the previous playlist's stale
   *  renditions over a stream that no longer has them. `activeIndex`, when given
   *  (from the switch event), names the track that is actually playing. */
  function syncAudioTrackState(activeIndex?: number): void {
    if (!handle) return;
    audioTracks.value = handle.audioTracks;
    currentAudioTrack.value = activeIndex ?? handle.getCurrentAudioTrack();
  }

  /** Re-read the handle's audio-presence signal (rendition group OR muxed
   *  segment audio). Called wherever the tracks/levels are re-read: the answer
   *  only changes with a (re)parsed manifest or a level load. */
  function syncAudioPresence(): void {
    if (!handle) return;
    hasAudio.value = handle.hasAudio();
  }

  /** Return the audio track refs to their defaults (no handle attached). */
  function resetAudioTrackState(): void {
    audioTracks.value = [];
    currentAudioTrack.value = -1;
    hasAudio.value = false;
  }

  /** Replace the exposed variants list. Overwrites only when non-empty so a
   *  later poll never clobbers variants the start response already surfaced. */
  function setVariants(v: Variant[] | null): void {
    if (!v || v.length === 0) return;
    variants.value = v;
  }

  /** Replace the exposed track list, resolving each sidecar URL against the API
   *  base exactly like the master playlist URL. A later poll only overwrites the
   *  list when it actually carries tracks, so an empty poll never clobbers tracks
   *  the start response already surfaced. */
  function setSubtitleTracks(tracks: SubtitleTrack[]): void {
    if (tracks.length === 0) return;
    const base = opts.apiBase();
    subtitleTracks.value = tracks.map((t) => ({ ...t, url: resolveStreamUrl(base, t.url) }));
  }

  const attach = opts.attach ?? defaultAttach;
  const pollIntervalMs = opts.pollIntervalMs ?? 1000;
  const maxWaitMs = opts.maxWaitMs ?? 120000;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const maxAttempts = Math.max(1, Math.ceil(maxWaitMs / Math.max(1, pollIntervalMs)));

  // R-UI-10: the bearer comes from the boot-registered custody store, resolved
  // at every use (segment xhrSetup fires long after boot), never a hardcoded
  // localStorage instance.
  const getToken = opts.getToken ?? safeToken;
  // The rung-index probe rides the SAME bearer custody as the playlist itself,
  // so a hub-proxied or token-gated server answers it exactly as it answers hls.
  const probeRungPlaylist =
    opts.probeRungPlaylist ?? ((url: string) => defaultProbeRungPlaylist(url, getToken));

  let handle: HlsHandle | null = null;
  let unsubscribeLevelSwitched: (() => void) | null = null;
  let unsubscribeAudioTrackSwitched: (() => void) | null = null;
  let unsubscribeLevelLoaded: (() => void) | null = null;
  let cancelled = false;
  // Per-attempt token for loadVariantPlaylist's async probe: cleanup/reset
  // (which bump `cancelled`) and superseding rung picks invalidate a probe that
  // resolved late — a stale verdict must never load a source into a session
  // that has moved on (mirrors the `runSeq` discipline in start()).
  let rungProbeSeq = 0;
  let abortController: AbortController | null = null;
  // Per-run generation token: a new start() resets `cancelled`, so the flag
  // alone cannot tell an OLD run's post-`await` guards that it has been
  // superseded — the old run would sail past `if (cancelled)` and clobber the
  // global handle/state of the newer one. Every guard checks BOTH.
  let runSeq = 0;

  function makeClient(): TranscodeHttpClient {
    return opts.client ?? new ApiClient({ baseUrl: opts.apiBase(), timeoutMs: 60000 });
  }

  async function start(video: HTMLVideoElement, mediaId: string, profile?: string, startPosition?: number): Promise<void> {
    cleanup();
    cancelled = false;
    const run = ++runSeq;
    const isStale = (): boolean => cancelled || run !== runSeq;
    abortController = new AbortController();
    state.value = 'preparing';
    progress.value = 0;
    subtitleTracks.value = [];
    resetLevelState();

    try {
      const client = makeClient();
      const startRes = parseTranscodeStart(await client.post(transcodeStartPath(mediaId, profile), undefined, abortController.signal));
      if (isStale()) return;
      if (!startRes.jobId || !startRes.masterUrl) {
        throw new Error('transcode start returned no job');
      }
      // Tracks may already be present on the start response (a reused job that
      // already finished extracting); otherwise they arrive on a later poll.
      setSubtitleTracks(startRes.subtitles);
      // Variants (the quality ladder) may also be present on the start response.
      setVariants(startRes.variants);

      // Store jobId and masterUrl for variant playlist construction (e.g. "Original").
      jobId.value = startRes.jobId;
      masterUrl.value = resolveStreamUrl(opts.apiBase(), startRes.masterUrl);

      let ready = startRes.status === 'completed';
      for (let attempt = 0; !ready && attempt < maxAttempts; attempt++) {
        const status = parseTranscodeStatus(await client.get(transcodeStatusPath(startRes.jobId), undefined, abortController.signal));
        if (isStale()) return;
        progress.value = status.progress;
        // Late-arriving tracks (extraction completes after the playlist is ready)
        // update the exposed list reactively → the Player adds the <track>s.
        setSubtitleTracks(status.subtitles);
        // Late-arriving variants update the quality ladder if the start response
        // had none (e.g. a reused job where variants arrived after initial response).
        setVariants(status.variants);
        if (isFailedStatus(status.status)) {
          throw new Error(`transcode ${status.status}`);
        }
        if (isPlayable(status)) {
          ready = true;
          break;
        }
        await sleep(pollIntervalMs);
        if (isStale()) return;
      }

      if (!ready) {
        throw new Error('transcode timed out');
      }

      const attached = await attach(video, masterUrl.value, {
        getToken,
        hlsConfig: opts.hlsConfig,
        startPosition,
        // MANIFEST_PARSED also re-fires when loadVariantPlaylist re-points the
        // SAME instance at a rung playlist — this closure is therefore the
        // per-rung refresh tick for levels, audio TRACKS and audio presence (an
        // emptied or filled group is only knowable once ITS manifest parses, and
        // hls.js's master→bare reload announces it via AUDIO_TRACKS_UPDATED
        // alone — never AUDIO_TRACK_SWITCHED — so the subscribed ticks must
        // re-read the live track list).
        onReady: () => {
          syncLevelState();
          syncAudioTrackState();
          syncAudioPresence();
        },
        onError: () => {
          if (!isStale()) {
            state.value = 'error';
          }
        },
      });
      if (isStale()) {
        // Superseded while attaching: tear down THIS handle locally — the
        // global `handle` belongs to the newer run and must not be touched.
        try {
          attached.destroy();
        } catch {
          /* already torn down */
        }
        return;
      }
      handle = attached;
      unsubscribeLevelSwitched = handle.onLevelSwitched((index) => syncLevelState(index));
      unsubscribeAudioTrackSwitched = handle.onAudioTrackSwitched((index) => syncAudioTrackState(index));
      // A MUXED-audio level's codec answer is reconciled as its playlist
      // loads — LEVEL_LOADED is the tick that turns `hasAudio` on for
      // single-audio rungs (and re-answers it after a rung switch). The track
      // list rides the same tick: an AUDIO_TRACKS_UPDATED-only transition
      // (master→bare, or bare→master) never fires AUDIO_TRACK_SWITCHED, so
      // without this the menu would keep the previous playlist's renditions.
      unsubscribeLevelLoaded = handle.onLevelLoaded(() => {
        syncAudioTrackState();
        syncAudioPresence();
      });
      // Seed from the handle now: covers the native/degraded shape (empty levels,
      // Auto) and a manifest that parsed before this point.
      syncLevelState();
      syncAudioTrackState();
      syncAudioPresence();
      // Persist the resolved HLS master URL so the mini-player can continue
      // a transcoded title when the user docks away from the full player.
      try {
        const playerStore = usePlayerStore();
        playerStore.hlsMasterUrl = masterUrl.value!;
      } catch {
        /* store not available (e.g. test environment without Pinia) — ignore */
      }
      state.value = 'ready';
    } catch {
      if (!isStale()) {
        state.value = 'error';
      }
    }
  }

  function setLevel(level: number | 'auto'): void {
    if (!handle) return;
    // Immediate (buffer-flushing) switch: a user clicking "480p" expects the
    // picture to change now, not on the next fragment. The optimistic sync below
    // updates the label instantly; the settled LEVEL_SWITCHED event reconciles it.
    handle.setCurrentLevel(level === 'auto' ? -1 : level);
    syncLevelState();
  }

  function setNextLevel(level: number | 'auto'): void {
    if (!handle) return;
    // Non-flushing switch: schedules the level change for the next fragment.
    // Safe for automatic pref-seeding where interrupting the buffer is unwanted.
    handle.setNextLevel(level === 'auto' ? -1 : level);
    syncLevelState();
  }

  function setAudioTrack(track: number): void {
    if (!handle) return;
    handle.setAudioTrack(track);
    syncAudioTrackState();
  }

  /** Load a specific rung's MINI-MASTER index directly (e.g.
   *  `media_voriginal_master.m3u8`) instead of using ABR level switching. This
   *  is used for the "Original" quality option when the original variant is
   *  not in the ABR ladder. Master-shaped on purpose: hls.js attaches the
   *  EXT-X-MEDIA audio group from it (see {@link RUNG_MINI_MASTER_SUFFIX});
   *  the bare rung playlist would play silent on multi-audio titles.
   *
   *  L1 forward-compat (2026-11-06): a server predating the index (e.g. one
   *  pinned behind a hub proxy), or a rung dir whose self-heal regeneration
   *  raced, 404s the index. PROBE it first — one HEAD per attempt — and only
   *  an explicit 'absent' loads the legacy bare rung playlist instead, exactly
   *  once, with a console.warn. That restores pre-RUNGMASTER playback instead
   *  of hard-failing (silent on multi-audio — the known shape of an old
   *  server; correct on muxed-audio). An 'unknown' probe outcome (5xx, or a
   *  throwing probe) loads the mini-master unchanged: hls.js's fatal path
   *  stays the loud failure, so a transient blip can never silently degrade a
   *  working stream. Exactly ONE `handle.loadSource` call runs per attempt —
   *  the existing session lifecycle, never a parallel half-loaded one. A
   *  cleanup/reset or a superseding rung pick while the probe is in flight
   *  discards the late verdict. Calling this clears the buffer and restarts
   *  playback. */
  function loadVariantPlaylist(variantId: string): void {
    if (!handle || !masterUrl.value) return;
    // Construct the rung's playlist URLs from the master URL: replace
    // "master.m3u8" with "media_v{variantId}_master.m3u8" (the mini-master
    // index) or "media_v{variantId}.m3u8" (the legacy bare rung) — wire
    // contract: phlix-server TranscodeManager::writeVodPlaylists().
    const stem = masterUrl.value.replace('master.m3u8', `media_v${variantId}`);
    const miniMasterUrl = `${stem}${RUNG_MINI_MASTER_SUFFIX}`;
    const legacyPlaylistUrl = `${stem}.m3u8`;
    const attempt = ++rungProbeSeq;
    void (async () => {
      let outcome: RungPlaylistProbe;
      try {
        outcome = await probeRungPlaylist(miniMasterUrl);
      } catch {
        // A throwing probe is unknowable, not absent — the loud path decides.
        outcome = 'unknown';
      }
      // The probe may resolve after cleanup()/reset() tore the session down,
      // or after a newer rung pick — a stale verdict must never load a source
      // into (or clobber the state of) the moved-on session.
      if (cancelled || attempt !== rungProbeSeq || !handle) return;
      if (outcome === 'absent') {
        console.warn(
          `[phlix-ui] rung mini-master unavailable (${miniMasterUrl}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${legacyPlaylistUrl}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`,
        );
        handle.loadSource(legacyPlaylistUrl);
      } else {
        handle.loadSource(miniMasterUrl);
      }
      // Reset level state since the variant playlist has different levels
      resetLevelState();
    })();
  }

  function cleanup(): void {
    cancelled = true;
    // Invalidate any in-flight rung probe (it checks the token before load).
    rungProbeSeq++;
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    if (unsubscribeLevelSwitched) {
      try {
        unsubscribeLevelSwitched();
      } catch {
        /* already unsubscribed */
      }
      unsubscribeLevelSwitched = null;
    }
    if (unsubscribeAudioTrackSwitched) {
      try {
        unsubscribeAudioTrackSwitched();
      } catch {
        /* already unsubscribed */
      }
      unsubscribeAudioTrackSwitched = null;
    }
    if (unsubscribeLevelLoaded) {
      try {
        unsubscribeLevelLoaded();
      } catch {
        /* already unsubscribed */
      }
      unsubscribeLevelLoaded = null;
    }
    if (handle) {
      try {
        handle.destroy();
      } catch {
        /* already torn down */
      }
      handle = null;
    }
    // Clear job tracking since this session's stream is done.
    jobId.value = null;
    masterUrl.value = null;
  }

  function reset(): void {
    cleanup();
    state.value = 'idle';
    progress.value = 0;
    subtitleTracks.value = [];
    resetLevelState();
    resetAudioTrackState();
    // The transcode session is over — drop the persisted master URL too, or the
    // mini-player keeps aiming at a dead stream (start() persists it post-attach).
    try {
      usePlayerStore().hlsMasterUrl = '';
    } catch {
      /* store not available (e.g. test environment without Pinia) — ignore */
    }
  }

  return {
    state,
    progress,
    subtitleTracks,
    levels,
    currentLevel,
    autoEnabled,
    activeLevelHeight,
    variants,
    audioTracks,
    currentAudioTrack,
    hasAudio,
    setLevel,
    setNextLevel,
    setAudioTrack,
    jobId,
    masterUrl,
    loadVariantPlaylist,
    start,
    cleanup,
    reset,
  };
}

function safeToken(): string | null {
  try {
    return defaultTokenStore().getAccessToken();
  } catch {
    return null;
  }
}

/**
 * Default rung-mini-master probe: one HEAD request carrying the SAME bearer
 * header hls.js attaches to the playlist itself. Only an explicit HTTP 404 is
 * decisive ('absent'); 2xx is 'available'; any other status or a network throw
 * is 'unknown' — which never triggers the fallback (see the law documented on
 * {@link UseHlsTranscodeOptions.probeRungPlaylist}). Exported so the shipped
 * fetch shape (HEAD / bearer / status mapping) is pinned directly, not only
 * through the injected test seam.
 */
export async function defaultProbeRungPlaylist(url: string, getToken: () => string | null): Promise<RungPlaylistProbe> {
  try {
    const token = getToken();
    const res = await fetch(url, {
      method: 'HEAD',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (res.status === 404) return 'absent';
    return res.ok ? 'available' : 'unknown';
  } catch {
    return 'unknown';
  }
}
