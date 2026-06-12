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
 */
import { ref, type Ref } from 'vue';
import { ApiClient } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';
import { attachHls as defaultAttach, type AttachHlsOptions, type HlsHandle } from '../components/player/hls-playback';
import {
  isFailedStatus,
  isPlayable,
  parseTranscodeStart,
  parseTranscodeStatus,
  resolveStreamUrl,
  transcodeStartPath,
  transcodeStatusPath,
  type SubtitleTrack,
} from '../components/player/transcode';

/** State machine for the transcode-to-play flow. */
export type TranscodeState = 'idle' | 'preparing' | 'ready' | 'error';

/** Minimal HTTP surface this composable needs (ApiClient-compatible). */
export interface TranscodeHttpClient {
  post<T = unknown>(endpoint: string, data?: unknown): Promise<T>;
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
}

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
  start(video: HTMLVideoElement, mediaId: string, profile?: string): Promise<void>;
  cleanup(): void;
  reset(): void;
}

export function useHlsTranscode(opts: UseHlsTranscodeOptions): HlsTranscodeController {
  const state = ref<TranscodeState>('idle');
  const progress = ref(0);
  const subtitleTracks = ref<ResolvedSubtitleTrack[]>([]);

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

  const tokenStore = createTokenStore();
  const getToken = opts.getToken ?? (() => safeToken(tokenStore));

  let handle: HlsHandle | null = null;
  let cancelled = false;

  function makeClient(): TranscodeHttpClient {
    return opts.client ?? new ApiClient({ baseUrl: opts.apiBase(), tokenStore: tokenStore ?? undefined });
  }

  async function start(video: HTMLVideoElement, mediaId: string, profile = 'web'): Promise<void> {
    cleanup();
    cancelled = false;
    state.value = 'preparing';
    progress.value = 0;
    subtitleTracks.value = [];

    try {
      const client = makeClient();
      const startRes = parseTranscodeStart(await client.post(transcodeStartPath(mediaId, profile)));
      if (cancelled) return;
      if (!startRes.jobId || !startRes.masterUrl) {
        throw new Error('transcode start returned no job');
      }
      // Tracks may already be present on the start response (a reused job that
      // already finished extracting); otherwise they arrive on a later poll.
      setSubtitleTracks(startRes.subtitles);

      const masterUrl = resolveStreamUrl(opts.apiBase(), startRes.masterUrl);

      let ready = startRes.status === 'completed';
      for (let attempt = 0; !ready && attempt < maxAttempts; attempt++) {
        const status = parseTranscodeStatus(await client.get(transcodeStatusPath(startRes.jobId)));
        if (cancelled) return;
        progress.value = status.progress;
        // Late-arriving tracks (extraction completes after the playlist is ready)
        // update the exposed list reactively → the Player adds the <track>s.
        setSubtitleTracks(status.subtitles);
        if (isFailedStatus(status.status)) {
          throw new Error(`transcode ${status.status}`);
        }
        if (isPlayable(status)) {
          ready = true;
          break;
        }
        await sleep(pollIntervalMs);
        if (cancelled) return;
      }

      if (!ready) {
        throw new Error('transcode timed out');
      }

      handle = await attach(video, masterUrl, {
        getToken,
        onError: () => {
          if (!cancelled) {
            state.value = 'error';
          }
        },
      });
      if (cancelled) {
        handle.destroy();
        handle = null;
        return;
      }
      state.value = 'ready';
    } catch {
      if (!cancelled) {
        state.value = 'error';
      }
    }
  }

  function cleanup(): void {
    cancelled = true;
    if (handle) {
      try {
        handle.destroy();
      } catch {
        /* already torn down */
      }
      handle = null;
    }
  }

  function reset(): void {
    cleanup();
    state.value = 'idle';
    progress.value = 0;
    subtitleTracks.value = [];
  }

  return { state, progress, subtitleTracks, start, cleanup, reset };
}

function createTokenStore(): LocalStorageTokenStore | null {
  try {
    return new LocalStorageTokenStore();
  } catch {
    return null;
  }
}

function safeToken(store: LocalStorageTokenStore | null): string | null {
  try {
    return store?.getAccessToken() ?? null;
  } catch {
    return null;
  }
}
