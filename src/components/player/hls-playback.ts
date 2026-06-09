/**
 * hls-playback.ts — attach an HLS (`.m3u8`) source to a <video> element.
 *
 * Browsers split two ways on HLS: Safari/iOS play it natively (set `video.src`),
 * everyone else needs Media Source Extensions driven by hls.js. {@link attachHls}
 * picks the right path and returns a handle whose `destroy()` tears the player
 * down (critical: an undestroyed hls.js instance keeps fetching segments).
 *
 * hls.js is imported dynamically so its ~100 kB only loads when a transcode is
 * actually played — direct-play sessions never pull it into the bundle.
 */

/** A live HLS attachment; call `destroy()` to stop loading and detach. */
export interface HlsHandle {
  destroy(): void;
}

/** Options for {@link attachHls}. */
export interface AttachHlsOptions {
  /** Optional bearer token to attach to segment/playlist requests. */
  getToken?: () => string | null;
  /** Called on a fatal playback error (after hls.js gives up recovering). */
  onError?: (detail: string) => void;
  /** Called once media is attached and the manifest is parsed (ready to play). */
  onReady?: () => void;
}

/** True when the browser can play HLS natively (Safari / iOS). */
export function isNativeHlsSupported(video: HTMLVideoElement): boolean {
  const t = video.canPlayType('application/vnd.apple.mpegurl');
  return t === 'probably' || t === 'maybe';
}

/**
 * Attaches an HLS playlist URL to a <video> element.
 *
 * Prefers hls.js (MSE) when supported; otherwise falls back to native HLS.
 * Throws if neither path is available so the caller can surface the
 * "can't play" notice.
 *
 * @param video The target media element.
 * @param url   Absolute master playlist URL.
 * @param opts  Token / error / ready hooks.
 *
 * @returns A handle whose `destroy()` detaches and stops loading.
 */
export async function attachHls(
  video: HTMLVideoElement,
  url: string,
  opts: AttachHlsOptions = {},
): Promise<HlsHandle> {
  // Native HLS (Safari) — set the src directly; cheapest path, no extra JS.
  // hls.js is preferred elsewhere because it gives consistent buffer/error
  // control, but where MSE is unavailable native is the only option.
  const { default: Hls } = await import('hls.js');

  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: false,
      xhrSetup: (xhr: XMLHttpRequest) => {
        const token = opts.getToken?.();
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
      },
    });

    hls.on(Hls.Events.MANIFEST_PARSED, () => opts.onReady?.());
    hls.on(Hls.Events.ERROR, (_event: unknown, data: { fatal?: boolean; details?: string }) => {
      if (data?.fatal) {
        opts.onError?.(data.details ?? 'fatal hls error');
        hls.destroy();
      }
    });

    hls.loadSource(url);
    hls.attachMedia(video);

    return {
      destroy(): void {
        try {
          hls.destroy();
        } catch {
          /* already torn down */
        }
      },
    };
  }

  if (isNativeHlsSupported(video)) {
    const onLoaded = (): void => opts.onReady?.();
    const onErr = (): void => opts.onError?.('native hls error');
    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('error', onErr);
    video.src = url;
    return {
      destroy(): void {
        video.removeEventListener('loadedmetadata', onLoaded);
        video.removeEventListener('error', onErr);
        video.removeAttribute('src');
        video.load();
      },
    };
  }

  throw new Error('HLS is not supported in this browser');
}
