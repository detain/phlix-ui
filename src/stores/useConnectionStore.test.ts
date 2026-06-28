import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import {
  useConnectionStore,
  CONNECTION_API_BASE_KEY,
  normalizeBase,
  withScheme,
  probeServer,
} from './useConnectionStore';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('normalizeBase', () => {
  it('trims whitespace and strips trailing slashes', () => {
    expect(normalizeBase('  https://srv:8096/  ')).toBe('https://srv:8096');
    expect(normalizeBase('https://srv:8096///')).toBe('https://srv:8096');
    expect(normalizeBase('https://srv:8096')).toBe('https://srv:8096');
  });
});

describe('withScheme', () => {
  it('leaves an explicit scheme untouched', () => {
    expect(withScheme('http://localhost:8096')).toBe('http://localhost:8096');
    expect(withScheme('https://media.example.com')).toBe('https://media.example.com');
    expect(withScheme('HTTPS://Example.com')).toBe('HTTPS://Example.com');
  });

  it('defaults local / IP / port-bearing hosts to http', () => {
    expect(withScheme('localhost:8096')).toBe('http://localhost:8096');
    expect(withScheme('127.0.0.1:8096')).toBe('http://127.0.0.1:8096');
    expect(withScheme('192.168.1.50:8096')).toBe('http://192.168.1.50:8096');
    expect(withScheme('media.lan:8096')).toBe('http://media.lan:8096');
  });

  it('defaults a bare public hostname to https', () => {
    expect(withScheme('media.example.com')).toBe('https://media.example.com');
  });

  it('returns empty for an empty value', () => {
    expect(withScheme('   ')).toBe('');
  });
});

describe('probeServer', () => {
  function fakeFetch(impl: () => Promise<Response> | Response): typeof fetch {
    return vi.fn(impl) as unknown as typeof fetch;
  }
  const okResponse = (body: unknown): Response =>
    ({ ok: true, json: () => Promise.resolve(body) }) as unknown as Response;

  it('resolves true for a Phlix-shaped /health response', async () => {
    const f = fakeFetch(() => okResponse({ status: 'ok', version: '1.0.0' }));
    expect(await probeServer('https://srv:8096', f)).toBe(true);
    expect(f).toHaveBeenCalledWith('https://srv:8096/health', expect.anything());
  });

  it('strips a trailing slash before appending /health', async () => {
    const f = fakeFetch(() => okResponse({ status: 'ok' }));
    await probeServer('https://srv:8096/', f);
    expect(f).toHaveBeenCalledWith('https://srv:8096/health', expect.anything());
  });

  it('resolves false on a non-OK status', async () => {
    const f = fakeFetch(() => ({ ok: false }) as Response);
    expect(await probeServer('https://srv:8096', f)).toBe(false);
  });

  it('resolves false when the body is not Phlix-shaped', async () => {
    const f = fakeFetch(() => okResponse({ hello: 'world' }));
    expect(await probeServer('https://srv:8096', f)).toBe(false);
  });

  it('resolves false on a network / CORS rejection', async () => {
    const f = fakeFetch(() => Promise.reject(new TypeError('Failed to fetch')));
    expect(await probeServer('https://srv:8096', f)).toBe(false);
  });

  it('resolves false for an empty base without fetching', async () => {
    const f = fakeFetch(() => okResponse({ status: 'ok' }));
    expect(await probeServer('   ', f)).toBe(false);
    expect(f).not.toHaveBeenCalled();
  });
});

describe('useConnectionStore', () => {
  it('starts disconnected when nothing is persisted', () => {
    const store = useConnectionStore();
    expect(store.apiBase).toBeNull();
    expect(store.isConnected).toBe(false);
  });

  it('setApiBase normalises, persists, and flips isConnected', () => {
    const store = useConnectionStore();
    store.setApiBase('https://srv:8096/');
    expect(store.apiBase).toBe('https://srv:8096');
    expect(store.isConnected).toBe(true);
    expect(localStorage.getItem(CONNECTION_API_BASE_KEY)).toBe('https://srv:8096');
  });

  it('rehydrates a persisted connection on construction', () => {
    localStorage.setItem(CONNECTION_API_BASE_KEY, 'https://restored:8096');
    setActivePinia(createPinia());
    const store = useConnectionStore();
    expect(store.apiBase).toBe('https://restored:8096');
    expect(store.isConnected).toBe(true);
  });

  it('clear forgets the connection and removes it from localStorage', () => {
    const store = useConnectionStore();
    store.setApiBase('https://srv:8096');
    store.clear();
    expect(store.apiBase).toBeNull();
    expect(store.isConnected).toBe(false);
    expect(localStorage.getItem(CONNECTION_API_BASE_KEY)).toBeNull();
  });

  it('notifies the configured host callback on set and clear', () => {
    const store = useConnectionStore();
    const onChange = vi.fn();
    store.configure(onChange);
    store.setApiBase('https://srv:8096');
    expect(onChange).toHaveBeenCalledWith('https://srv:8096');
    store.clear();
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
