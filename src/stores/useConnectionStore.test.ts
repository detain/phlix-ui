/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import {
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

  it('keeps a PUBLIC host with an explicit non-standard port on https (no plaintext downgrade)', () => {
    expect(withScheme('media.example.com:8443')).toBe('https://media.example.com:8443');
    expect(withScheme('media.example.com:8096')).toBe('https://media.example.com:8096');
  });

  it('still infers http for a PRIVATE host with an explicit port', () => {
    expect(withScheme('192.168.1.5:8096')).toBe('http://192.168.1.5:8096');
    expect(withScheme('10.0.0.4:8096')).toBe('http://10.0.0.4:8096');
    expect(withScheme('172.16.5.9:8096')).toBe('http://172.16.5.9:8096');
    expect(withScheme('localhost:8096')).toBe('http://localhost:8096');
  });

  it('rejects a non-http(s) scheme outright (no host-inference fall-through)', () => {
    expect(withScheme('javascript:alert(1)')).toBe('');
    expect(withScheme('  javascript:alert(document.cookie)  ')).toBe('');
    expect(withScheme('data:text/html,<script>alert(1)</script>')).toBe('');
    expect(withScheme('file:///etc/passwd')).toBe('');
    expect(withScheme('ftp://example.com')).toBe('');
    expect(withScheme('vbscript:msgbox(1)')).toBe('');
  });

  it('returns empty for an empty value', () => {
    expect(withScheme('   ')).toBe('');
  });
});

describe('isAllowedBase', () => {
  it('is true for valid http(s) bases, false for rejected schemes / empty', () => {
    expect(isAllowedBase('https://media.example.com')).toBe(true);
    expect(isAllowedBase('localhost:8096')).toBe(true);
    expect(isAllowedBase('media.example.com:8443')).toBe(true);
    expect(isAllowedBase('javascript:alert(1)')).toBe(false);
    expect(isAllowedBase('data:text/html,x')).toBe(false);
    expect(isAllowedBase('file:///etc/passwd')).toBe(false);
    expect(isAllowedBase('   ')).toBe(false);
  });
});

describe('isPrivateHost', () => {
  it('recognises loopback / RFC1918 / CGNAT / link-local hosts', () => {
    expect(isPrivateHost('localhost')).toBe(true);
    expect(isPrivateHost('box.localhost')).toBe(true);
    expect(isPrivateHost('127.0.0.1')).toBe(true);
    expect(isPrivateHost('::1')).toBe(true);
    expect(isPrivateHost('10.1.2.3')).toBe(true);
    expect(isPrivateHost('192.168.1.50')).toBe(true);
    expect(isPrivateHost('172.16.0.1')).toBe(true);
    expect(isPrivateHost('172.31.255.255')).toBe(true);
    expect(isPrivateHost('169.254.1.1')).toBe(true);
    expect(isPrivateHost('100.64.0.1')).toBe(true);
  });

  it('treats public hosts and out-of-range IPs as NOT private', () => {
    expect(isPrivateHost('media.example.com')).toBe(false);
    expect(isPrivateHost('8.8.8.8')).toBe(false);
    expect(isPrivateHost('172.32.0.1')).toBe(false); // just past 172.16/12
    expect(isPrivateHost('172.15.0.1')).toBe(false);
    expect(isPrivateHost('100.63.0.1')).toBe(false); // just before CGNAT
    expect(isPrivateHost('100.128.0.1')).toBe(false); // just past CGNAT
  });
});

describe('isPlaintextPublic', () => {
  it('flags http to a public host', () => {
    expect(isPlaintextPublic('http://media.example.com')).toBe(true);
    expect(isPlaintextPublic('http://media.example.com:8096')).toBe(true);
  });

  it('does NOT flag https, private http, or invalid bases', () => {
    expect(isPlaintextPublic('https://media.example.com')).toBe(false);
    expect(isPlaintextPublic('http://192.168.1.5:8096')).toBe(false);
    expect(isPlaintextPublic('http://localhost:8096')).toBe(false);
    expect(isPlaintextPublic('javascript:alert(1)')).toBe(false);
    expect(isPlaintextPublic('   ')).toBe(false);
  });
});

describe('originOf', () => {
  it('returns the scheme://host[:port] origin of a resolvable base', () => {
    expect(originOf('https://media.example.com/app')).toBe('https://media.example.com');
    expect(originOf('192.168.1.5:8096')).toBe('http://192.168.1.5:8096');
    expect(originOf('media.example.com:8443')).toBe('https://media.example.com:8443');
  });

  it('returns "" for an unresolvable / rejected base', () => {
    expect(originOf('javascript:alert(1)')).toBe('');
    expect(originOf('   ')).toBe('');
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

  it('treats an origin as new until confirmed, then not after setApiBase', () => {
    const store = useConnectionStore();
    // Nothing confirmed yet — any origin is new.
    expect(store.isNewOrigin('https://srv:8096')).toBe(true);
    store.setApiBase('https://srv:8096');
    // setApiBase confirmed the origin and persisted it.
    expect(store.confirmedOrigin).toBe('https://srv:8096');
    expect(localStorage.getItem(CONNECTION_CONFIRMED_ORIGIN_KEY)).toBe('https://srv:8096');
    // Same origin (even a different path) is no longer new.
    expect(store.isNewOrigin('https://srv:8096/app')).toBe(false);
    // A different origin is still new.
    expect(store.isNewOrigin('https://other:8096')).toBe(true);
  });

  it('isNewOrigin treats an invalid base as new', () => {
    const store = useConnectionStore();
    store.confirmOrigin('https://srv:8096');
    expect(store.isNewOrigin('javascript:alert(1)')).toBe(true);
  });

  it('confirmOrigin persists without changing the apiBase', () => {
    const store = useConnectionStore();
    store.confirmOrigin('https://srv:8096');
    expect(store.confirmedOrigin).toBe('https://srv:8096');
    expect(store.apiBase).toBeNull();
    expect(localStorage.getItem(CONNECTION_CONFIRMED_ORIGIN_KEY)).toBe('https://srv:8096');
  });

  it('rehydrates a persisted confirmed origin on construction', () => {
    localStorage.setItem(CONNECTION_CONFIRMED_ORIGIN_KEY, 'https://restored:8096');
    setActivePinia(createPinia());
    const store = useConnectionStore();
    expect(store.confirmedOrigin).toBe('https://restored:8096');
    expect(store.isNewOrigin('https://restored:8096')).toBe(false);
  });

  it('clear forgets the confirmed origin too', () => {
    const store = useConnectionStore();
    store.setApiBase('https://srv:8096');
    store.clear();
    expect(store.confirmedOrigin).toBeNull();
    expect(localStorage.getItem(CONNECTION_CONFIRMED_ORIGIN_KEY)).toBeNull();
  });
});
