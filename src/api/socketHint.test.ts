/**
 * R12-02 tests — the `__PHLIX__.wsUrl`/`wsPath` socket seam.
 *
 * Three layers, one file: the parser grammar, then each of the two socket
 * builders' precedence (seam wins; absent/null/invalid ⇒ legacy byte-ident).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { parseSocketHint, readSocketHint } from './socketHint';
import { buildHubRelayUrl, HUB_SYNC_PLAY_PORT } from './hubRelay';
import { openSyncPlayConnection, closeSyncPlayConnection } from './syncplay';

// ── parser grammar ────────────────────────────────────────────────────────────

describe('parseSocketHint — wsUrl grammar', () => {
  it('absent payload ⇒ full null (legacy path)', () => {
    expect(parseSocketHint(undefined)).toEqual({ wsUrl: null, wsPath: null });
    expect(parseSocketHint(null)).toEqual({ wsUrl: null, wsPath: null });
    expect(parseSocketHint('nonsense')).toEqual({ wsUrl: null, wsPath: null });
  });

  it('null / empty / non-string wsUrl ⇒ null', () => {
    for (const bad of [null, '', 42, {}, []]) {
      expect(parseSocketHint({ wsUrl: bad }).wsUrl).toBeNull();
    }
  });

  it('rejects anything that is not scheme+authority', () => {
    for (const bad of [
      'http://hub.example.com', // wrong scheme
      'https://hub.example.com',
      'ws://hub.example.com/syncplay', // path smuggled into wsUrl
      'ws://hub.example.com?x=1', // query
      'ws://hub.example.com#f', // fragment
      'ws://user@hub.example.com', // userinfo
      'hub.example.com:8804', // no scheme
      '//hub.example.com', // scheme-relative
    ]) {
      expect(parseSocketHint({ wsUrl: bad }).wsUrl).toBeNull();
    }
  });

  it('accepts ws/wss authorities, any host and port', () => {
    for (const good of [
      'ws://localhost:8804',
      'wss://hub.example.com',
      'wss://hub.example.com:9443',
      'ws://10.0.0.5:8097',
      'WS://HUB.EXAMPLE.COM',
    ]) {
      expect(parseSocketHint({ wsUrl: good }).wsUrl).toBe(good);
    }
  });

  it('wsPath only refines a PRESENT valid wsUrl; its own grammar is strict', () => {
    // No wsUrl ⇒ the path is meaningless (cannot move a port) ⇒ dropped.
    expect(parseSocketHint({ wsPath: '/syncplay' })).toEqual({ wsUrl: null, wsPath: null });
    const base = { wsUrl: 'ws://hub:8804' };
    expect(parseSocketHint({ ...base, wsPath: null }).wsPath).toBeNull();
    expect(parseSocketHint({ ...base, wsPath: '' }).wsPath).toBeNull();
    expect(parseSocketHint({ ...base, wsPath: 'syncplay' }).wsPath).toBeNull(); // not absolute
    expect(parseSocketHint({ ...base, wsPath: '/sync?a=1' }).wsPath).toBeNull(); // query smuggled
    expect(parseSocketHint({ ...base, wsPath: '/syncplay' }).wsPath).toBe('/syncplay');
    // Trailing slashes are trimmed so `${path}/${segment}` cannot double up.
    expect(parseSocketHint({ ...base, wsPath: '/syncplay/' }).wsPath).toBe('/syncplay');
  });
});

describe('readSocketHint — window plumbing', () => {
  afterEach(() => {
    delete (window as { __PHLIX__?: unknown }).__PHLIX__;
  });

  it('reads window.__PHLIX__ when present', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = {
      wsUrl: 'wss://hub.example.com:9443',
      wsPath: '/syncplay',
    };
    expect(readSocketHint()).toEqual({ wsUrl: 'wss://hub.example.com:9443', wsPath: '/syncplay' });
  });

  it('absent __PHLIX__ (or a payload without the fields) ⇒ null/null', () => {
    delete (window as { __PHLIX__?: unknown }).__PHLIX__;
    expect(readSocketHint()).toEqual({ wsUrl: null, wsPath: null });
    (window as { __PHLIX__?: unknown }).__PHLIX__ = { apiBase: '/api' };
    expect(readSocketHint()).toEqual({ wsUrl: null, wsPath: null });
  });
});

// ── hubRelay precedence ───────────────────────────────────────────────────────

describe('buildHubRelayUrl — seam precedence (R12-02)', () => {
  afterEach(() => {
    delete (window as { __PHLIX__?: unknown }).__PHLIX__;
  });

  it('no seam ⇒ legacy ws://<page-host>:8804/syncplay/<id>', () => {
    const url = buildHubRelayUrl(undefined, 'srv 1');
    expect(url).toBe(`ws://${window.location.hostname}:${HUB_SYNC_PLAY_PORT}/syncplay/srv%201`);
  });

  it('wsUrl alone overrides host:port, keeps the /syncplay path', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = { wsUrl: 'wss://relay.example.com:9443' };
    expect(buildHubRelayUrl('https://hub.example.com', 'srv-1')).toBe(
      'wss://relay.example.com:9443/syncplay/srv-1',
    );
  });

  it('wsUrl + wsPath overrides the path prefix too', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = {
      wsUrl: 'wss://behind-proxy.example.com',
      wsPath: '/hub-syncplay',
    };
    expect(buildHubRelayUrl(undefined, 'srv-1')).toBe(
      'wss://behind-proxy.example.com/hub-syncplay/srv-1',
    );
  });

  it('INVALID seam falls back to the legacy derivation (fail-soft)', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = { wsUrl: 'http://nope/path' };
    const url = buildHubRelayUrl('https://hub.example.com:8443', 'srv-1');
    expect(url).toBe('wss://hub.example.com:8804/syncplay/srv-1');
  });
});

// ── syncplay :8097 precedence (via the constructed socket URL) ────────────────

/** Minimal dial-recorder: the socket URL is the unit under test here. */
class RecordingWebSocket {
  static instances: RecordingWebSocket[] = [];
  url: string;
  protocols: string[] | undefined;
  readyState = 0;
  onopen: (() => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  send(): void {}
  close(): void {}
  static OPEN = 1;
  constructor(url: string, protocols?: string | string[]) {
    this.url = url;
    this.protocols = protocols === undefined ? undefined : typeof protocols === 'string' ? [protocols] : protocols;
    RecordingWebSocket.instances.push(this);
  }
}

function socket(): RecordingWebSocket {
  const s = RecordingWebSocket.instances.at(-1);
  if (!s) throw new Error('no socket was constructed');
  return s;
}

describe('buildWsUrl (:8097) — seam precedence (R12-02)', () => {
  afterEach(() => {
    closeSyncPlayConnection();
    delete (window as { __PHLIX__?: unknown }).__PHLIX__;
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  function dial(roomId: string): string {
    RecordingWebSocket.instances = [];
    vi.stubGlobal('WebSocket', RecordingWebSocket as unknown as typeof WebSocket);
    openSyncPlayConnection(roomId);
    return socket().url;
  }

  it('no seam ⇒ legacy ws://<page-host>:8097?room=<id> (query-only, credentials never ride the URL)', () => {
    expect(dial('sp_1')).toBe(`ws://${window.location.hostname}:8097?room=sp_1`);
  });

  it('wsUrl overrides host:port; the path-less direct dial keeps its room query', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = { wsUrl: 'wss://sync.example.com:9097' };
    const url = dial('sp 2');
    expect(url).toBe('wss://sync.example.com:9097?room=sp%202');
    expect(url).not.toContain('token');
  });

  it('wsPath is appended when the operator pins one', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = {
      wsUrl: 'wss://sync.example.com',
      wsPath: '/ws/syncplay',
    };
    expect(dial('sp_3')).toBe('wss://sync.example.com/ws/syncplay?room=sp_3');
  });

  it('INVALID seam ⇒ legacy derivation', () => {
    (window as { __PHLIX__?: unknown }).__PHLIX__ = { wsUrl: 'wss://bad/path/here' };
    expect(dial('sp_4')).toBe(`ws://${window.location.hostname}:8097?room=sp_4`);
  });
});
