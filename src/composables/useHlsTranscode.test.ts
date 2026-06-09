import { describe, it, expect, vi } from 'vitest';
import { useHlsTranscode, type TranscodeHttpClient } from './useHlsTranscode';
import type { HlsHandle } from '../components/player/hls-playback';

function fakeVideo(): HTMLVideoElement {
  return {} as HTMLVideoElement;
}

interface Harness {
  controller: ReturnType<typeof useHlsTranscode>;
  attach: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
}

/**
 * Build a controller with injected post/get/attach + a no-op sleep so the poll
 * loop runs instantly. `statuses` is the sequence of GET status payloads.
 */
function harness(opts: {
  start?: Record<string, unknown>;
  statuses?: Array<Record<string, unknown>>;
  postRejects?: boolean;
  attachRejects?: boolean;
} = {}): Harness {
  const destroy = vi.fn();
  const attach = vi.fn(async (): Promise<HlsHandle> => {
    if (opts.attachRejects) throw new Error('attach failed');
    return { destroy };
  });
  const post = vi.fn(async () => {
    if (opts.postRejects) throw new Error('post failed');
    return opts.start ?? { job_id: 'job-1', master_url: '/hls/job-1/master.m3u8', status: 'running' };
  });
  const statuses = opts.statuses ?? [{ status: 'running', playlist_ready: true, progress: 50 }];
  let i = 0;
  const get = vi.fn(async () => statuses[Math.min(i++, statuses.length - 1)]);

  const client = { post, get } as unknown as TranscodeHttpClient;
  const controller = useHlsTranscode({
    apiBase: () => 'http://h:8096',
    client,
    attach,
    getToken: () => 'tok',
    pollIntervalMs: 1,
    maxWaitMs: 50,
    sleep: async () => {},
  });
  return { controller, attach, destroy, post, get };
}

describe('useHlsTranscode', () => {
  it('starts at idle', () => {
    const { controller } = harness();
    expect(controller.state.value).toBe('idle');
    expect(controller.progress.value).toBe(0);
  });

  it('happy path: starts, polls until ready, attaches HLS, becomes ready', async () => {
    const h = harness({
      statuses: [
        { status: 'running', playlist_ready: false, progress: 10 },
        { status: 'running', playlist_ready: true, progress: 60 },
      ],
    });
    await h.controller.start(fakeVideo(), 'media-1', 'web');

    expect(h.post).toHaveBeenCalledWith('/api/v1/media/media-1/transcode?profile=web');
    expect(h.attach).toHaveBeenCalledTimes(1);
    // master URL is resolved against the API base.
    expect(h.attach.mock.calls[0][1]).toBe('http://h:8096/hls/job-1/master.m3u8');
    expect(h.controller.state.value).toBe('ready');
    expect(h.controller.progress.value).toBe(60);
  });

  it('skips polling when the job is already completed', async () => {
    const h = harness({ start: { job_id: 'j', master_url: '/hls/j/master.m3u8', status: 'completed' } });
    await h.controller.start(fakeVideo(), 'm');
    expect(h.get).not.toHaveBeenCalled();
    expect(h.attach).toHaveBeenCalled();
    expect(h.controller.state.value).toBe('ready');
  });

  it('errors when the job fails during polling', async () => {
    const h = harness({ statuses: [{ status: 'failed', playlist_ready: false }] });
    await h.controller.start(fakeVideo(), 'm');
    expect(h.attach).not.toHaveBeenCalled();
    expect(h.controller.state.value).toBe('error');
  });

  it('errors when start returns no job', async () => {
    const h = harness({ start: { status: 'running' } });
    await h.controller.start(fakeVideo(), 'm');
    expect(h.controller.state.value).toBe('error');
  });

  it('errors when the start request throws', async () => {
    const h = harness({ postRejects: true });
    await h.controller.start(fakeVideo(), 'm');
    expect(h.controller.state.value).toBe('error');
  });

  it('errors when attaching HLS throws', async () => {
    const h = harness({ attachRejects: true });
    await h.controller.start(fakeVideo(), 'm');
    expect(h.controller.state.value).toBe('error');
  });

  it('times out when readiness never arrives', async () => {
    const h = harness({ statuses: [{ status: 'running', playlist_ready: false, progress: 5 }] });
    await h.controller.start(fakeVideo(), 'm');
    expect(h.controller.state.value).toBe('error');
    // bounded by maxWaitMs/pollIntervalMs (50 attempts here), never infinite
    expect(h.get.mock.calls.length).toBeLessThanOrEqual(50);
  });

  it('cleanup destroys the hls handle and reset returns to idle', async () => {
    const h = harness();
    await h.controller.start(fakeVideo(), 'm');
    expect(h.controller.state.value).toBe('ready');
    h.controller.reset();
    expect(h.destroy).toHaveBeenCalled();
    expect(h.controller.state.value).toBe('idle');
    expect(h.controller.progress.value).toBe(0);
  });
});
