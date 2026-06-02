import { describe, it, expect, vi } from 'vitest';
import { AdminServicesApi } from './services';
import type { ApiClient } from '../client';

function clientWith(
  parts: { get?: ReturnType<typeof vi.fn>; post?: ReturnType<typeof vi.fn> } = {},
): ApiClient {
  return { get: parts.get ?? vi.fn(), post: parts.post ?? vi.fn() } as unknown as ApiClient;
}

describe('AdminServicesApi — Trakt', () => {
  it('gets Trakt status, normalising connected/username/configured', async () => {
    const get = vi.fn().mockResolvedValue({ connected: true, username: 'traktuser', configured: true });
    const api = new AdminServicesApi(clientWith({ get }));
    const status = await api.getTraktStatus();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/services/trakt/status');
    expect(status).toEqual({ connected: true, username: 'traktuser', configured: true });
  });

  it('omits configured when the server does not send a boolean', async () => {
    const get = vi.fn().mockResolvedValue({ connected: false, username: null });
    const api = new AdminServicesApi(clientWith({ get }));
    const status = await api.getTraktStatus();
    expect(status).toEqual({ connected: false, username: null });
    expect('configured' in status).toBe(false);
  });

  it('preserves configured:false from the server', async () => {
    const get = vi.fn().mockResolvedValue({ connected: false, username: null, configured: false });
    const api = new AdminServicesApi(clientWith({ get }));
    const status = await api.getTraktStatus();
    expect(status.configured).toBe(false);
  });

  it('degrades a malformed Trakt status payload to safe defaults', async () => {
    const get = vi.fn().mockResolvedValue({});
    const api = new AdminServicesApi(clientWith({ get }));
    const status = await api.getTraktStatus();
    expect(status).toEqual({ connected: false, username: null });
  });

  it('disconnects Trakt, unwrapping { message }', async () => {
    const post = vi.fn().mockResolvedValue({ message: 'Disconnected' });
    const api = new AdminServicesApi(clientWith({ post }));
    const res = await api.disconnectTrakt();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/services/trakt/disconnect');
    expect(res).toEqual({ message: 'Disconnected' });
  });

  it('defends Trakt disconnect against a missing message', async () => {
    const post = vi.fn().mockResolvedValue({});
    const api = new AdminServicesApi(clientWith({ post }));
    expect(await api.disconnectTrakt()).toEqual({ message: '' });
  });

  it('navigates the browser to the Trakt OAuth URL', () => {
    const original = window.location.href;
    const setHref = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { set href(v: string) { setHref(v); } },
    });
    const api = new AdminServicesApi(clientWith());
    api.navigateToTraktAuthorize();
    expect(setHref).toHaveBeenCalledWith('/api/v1/oauth/trakt');
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: original },
    });
  });
});

describe('AdminServicesApi — Last.fm', () => {
  it('gets Last.fm status, normalising connected/username/api_key_set', async () => {
    const get = vi.fn().mockResolvedValue({ connected: true, username: 'lastfmuser', api_key_set: true });
    const api = new AdminServicesApi(clientWith({ get }));
    const status = await api.getLastfmStatus();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/services/lastfm/status');
    expect(status).toEqual({ connected: true, username: 'lastfmuser', api_key_set: true });
  });

  it('degrades a malformed Last.fm status payload to safe defaults', async () => {
    const get = vi.fn().mockResolvedValue({});
    const api = new AdminServicesApi(clientWith({ get }));
    expect(await api.getLastfmStatus()).toEqual({ connected: false, username: null, api_key_set: false });
  });

  it('disconnects Last.fm, unwrapping { message }', async () => {
    const post = vi.fn().mockResolvedValue({ message: 'Gone' });
    const api = new AdminServicesApi(clientWith({ post }));
    const res = await api.disconnectLastfm();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/services/lastfm/disconnect');
    expect(res).toEqual({ message: 'Gone' });
  });

  it('defends Last.fm disconnect against a missing message', async () => {
    const post = vi.fn().mockResolvedValue({});
    const api = new AdminServicesApi(clientWith({ post }));
    expect(await api.disconnectLastfm()).toEqual({ message: '' });
  });

  it('navigates the browser to the Last.fm connect page', () => {
    const original = window.location.href;
    const setHref = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { set href(v: string) { setHref(v); } },
    });
    const api = new AdminServicesApi(clientWith());
    api.navigateToLastfmConnect();
    expect(setHref).toHaveBeenCalledWith('/admin/lastfm');
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: original },
    });
  });
});
