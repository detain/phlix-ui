/**
 * S298 — the hub-relay pending-command consumer (`src/api/hubRelay.ts`).
 *
 * Proves the consumer against the REAL hub protocol shapes (re-derived from the
 * hub's `SyncPlayRelayWorker` + `PendingCommandDispatcher`):
 *
 * - URL `ws://<host>:8804/syncplay/{server_id}` — the path the relay's
 *   `onWebSocketConnect()` parses the server id from.
 * - Token on the `Sec-WebSocket-Protocol: bearer, <token>` SUBPROTOCOL — the
 *   only carrier a browser WebSocket can present (S237 removed the query
 *   string; the relay accepts Authorization OR the bearer subprotocol).
 * - Only `pending_command` / `play_media` frames are consumed; every other
 *   frame the relay may send (`group_join`, `playback_play`, `room_state`, …)
 *   is ignored, and garbage yields nothing.
 *
 * Only the socket itself is faked (jsdom would otherwise dial `:8804` for
 * real); the frame parsing runs the REAL `parsePendingCommandFrame`.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  openHubRelayConnection,
  closeHubRelayConnection,
  getHubRelaySocket,
  parsePendingCommandFrame,
  buildHubRelayUrl,
  HUB_SYNC_PLAY_PORT,
  type PendingPlayMediaCommand,
} from './hubRelay';

const SERVER_ID = 'srv-abc123';

// ── the fake socket ───────────────────────────────────────────────────────────

class FakeWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSED = 3;

  static instances: FakeWebSocket[] = [];

  readyState: number = FakeWebSocket.OPEN;
  onopen: (() => void) | null = null;
  onmessage: ((e: MessageEvent) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((e: unknown) => void) | null = null;
  closeCalls = 0;

  constructor(
    readonly url: string,
    readonly protocols?: string | string[],
  ) {
    FakeWebSocket.instances.push(this);
  }

  send(): void {}

  close(): void {
    this.closeCalls++;
    this.readyState = FakeWebSocket.CLOSED;
  }

  /** Deliver one server frame as the module's `onmessage` would see it. */
  deliver(payload: unknown): void {
    this.onmessage?.({ data: JSON.stringify(payload) } as MessageEvent);
  }

  /** Deliver a raw (possibly malformed) body. */
  deliverRaw(data: string): void {
    this.onmessage?.({ data } as MessageEvent);
  }

  connect(): void {
    this.readyState = FakeWebSocket.OPEN;
    this.onopen?.();
  }
}

function socket(): FakeWebSocket {
  const s = FakeWebSocket.instances.at(-1);
  if (!s) throw new Error('no socket was constructed');
  return s;
}

function pendingCommand(over: Partial<PendingPlayMediaCommand> = {}): PendingPlayMediaCommand {
  return {
    type: 'pending_command',
    command: 'play_media',
    serverId: SERVER_ID,
    mediaId: 'media-9',
    title: 'Inception',
    issuedAt: 1_700_000_000,
    source: 'alexa',
    ...over,
  };
}

beforeEach(() => {
  FakeWebSocket.instances = [];
  globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;
});

afterEach(() => {
  // Reset the module-level singleton so the next test starts disconnected.
  closeHubRelayConnection();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// ── url construction ──────────────────────────────────────────────────────────

describe('buildHubRelayUrl — the relay URL shape', () => {
  it('dials :8804 with the /syncplay/{server_id} path the relay parses', () => {
    const url = new URL(buildHubRelayUrl(undefined, SERVER_ID));
    expect(url.port).toBe(String(HUB_SYNC_PLAY_PORT));
    expect(url.pathname).toBe(`/syncplay/${SERVER_ID}`);
    expect(url.protocol).toBe('ws:');
  });

  it('defaults the host to the app origin', () => {
    const url = buildHubRelayUrl(undefined, SERVER_ID);
    expect(url).toContain(`//${window.location.hostname}:${HUB_SYNC_PLAY_PORT}`);
  });

  it('takes the hostname from hubBaseUrl and flips ws→wss for https origins', () => {
    const http = new URL(buildHubRelayUrl('http://hub.example.com', SERVER_ID));
    expect(http.protocol).toBe('ws:');
    expect(http.hostname).toBe('hub.example.com');
    const https = new URL(buildHubRelayUrl('https://hub.example.com', SERVER_ID));
    expect(https.protocol).toBe('wss:');
    expect(https.hostname).toBe('hub.example.com');
  });

  it('keeps the RELAY port (8804), never the origin port', () => {
    const url = new URL(buildHubRelayUrl('https://hub.example.com:8443', SERVER_ID));
    expect(url.port).toBe(String(HUB_SYNC_PLAY_PORT));
  });
});

// ── lifecycle: open-whenever ──────────────────────────────────────────────────

describe('openHubRelayConnection — the open-whenever lifecycle (S298)', () => {
  it('opens a socket IMMEDIATELY — no SyncPlay room join is required', () => {
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: () => {},
    });
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('carries the token on the bearer SUBPROTOCOL — never the query string', () => {
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok+1/2',
      onPendingCommand: () => {},
    });
    const s = socket();
    expect(s.protocols).toEqual(['bearer', 'tok+1/2']);
    // S237: the query string is refused by design — the URL must be token-free.
    expect(s.url).not.toContain('token=');
    expect(s.url).not.toContain('?');
  });

  it('reports connecting → open through onStatusChange', () => {
    const statuses: string[] = [];
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: () => {},
      onStatusChange: (s) => statuses.push(s),
    });
    expect(statuses).toEqual(['connecting']);
    socket().connect();
    expect(statuses).toEqual(['connecting', 'open']);
  });

  it('stays closed (no socket, no ladder) while the token provider yields nothing', () => {
    const statuses: string[] = [];
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => null,
      onPendingCommand: () => {},
      onStatusChange: (s) => statuses.push(s),
    });
    expect(FakeWebSocket.instances).toHaveLength(0);
    expect(statuses).toEqual(['closed']);
  });

  it('is a no-op when already open for the same server', () => {
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: () => {},
    });
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-2',
      onPendingCommand: () => {},
    });
    expect(FakeWebSocket.instances).toHaveLength(1);
  });
});

// ── frame consumption ─────────────────────────────────────────────────────────

describe('openHubRelayConnection — pending_command consumption', () => {
  it('delivers a typed play_media command for the hub\'s pending_command frame', () => {
    const received: PendingPlayMediaCommand[] = [];
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: (c) => received.push(c),
    });
    // The EXACT frame PendingCommandDispatcher emits (hub src/SyncPlay/…).
    socket().deliver({
      type: 'pending_command',
      command: 'play_media',
      server_id: SERVER_ID,
      media_id: 'media-9',
      title: 'Inception',
      issued_at: 1_700_000_000,
      source: 'alexa',
    });
    expect(received).toEqual([pendingCommand()]);
  });

  it('ignores every OTHER relay vocabulary frame (group_join, playback_play, room_state)', () => {
    const received: PendingPlayMediaCommand[] = [];
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: (c) => received.push(c),
    });
    socket().deliver({ type: 'group_join', group_id: 'g1', member_id: 'm1' });
    socket().deliver({ type: 'playback_play', position: 5, group_id: 'g1' });
    socket().deliver({ type: 'room_state', room: 'r1' });
    expect(received).toHaveLength(0);
  });

  it('ignores a pending_command with an UNKNOWN command discriminator', () => {
    const received: PendingPlayMediaCommand[] = [];
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: (c) => received.push(c),
    });
    socket().deliver({
      type: 'pending_command',
      command: 'queue_next',
      server_id: SERVER_ID,
      media_id: 'media-9',
      title: 'X',
    });
    expect(received).toHaveLength(0);
  });

  it('drops malformed JSON without throwing', () => {
    const received: PendingPlayMediaCommand[] = [];
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: (c) => received.push(c),
    });
    expect(() => socket().deliverRaw('{garbage')).not.toThrow();
    expect(received).toHaveLength(0);
  });
});

// ── reconnect ladder ──────────────────────────────────────────────────────────

describe('openHubRelayConnection — reconnect ladder', () => {
  it('reconnects after a close and RE-READS the token for the new attempt', () => {
    vi.useFakeTimers();
    let token = 'tok-1';
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => token,
      onPendingCommand: () => {},
    });
    expect(FakeWebSocket.instances).toHaveLength(1);
    socket().onclose?.();
    token = 'tok-2'; // the 1h relay token expired; the provider now has a fresh one
    vi.advanceTimersByTime(1000);
    expect(FakeWebSocket.instances).toHaveLength(2);
    expect(socket().protocols).toEqual(['bearer', 'tok-2']);
  });

  it('gives up after the capped ladder and reports closed', () => {
    vi.useFakeTimers();
    const statuses: string[] = [];
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: () => {},
      onStatusChange: (s) => statuses.push(s),
    });
    for (let attempt = 1; attempt <= 5; attempt++) {
      socket().onclose?.();
      vi.advanceTimersByTime(1000 * 2 ** (attempt - 1));
    }
    // 5 reconnect attempts consumed, then give up — no 6th socket.
    expect(FakeWebSocket.instances).toHaveLength(6); // 1 initial + 5 reconnects
    socket().onclose?.();
    vi.advanceTimersByTime(64_000);
    expect(FakeWebSocket.instances).toHaveLength(6);
    expect(statuses.at(-1)).toBe('closed');
  });

  it('closeHubRelayConnection stops the ladder', () => {
    vi.useFakeTimers();
    openHubRelayConnection({
      serverId: SERVER_ID,
      tokenProvider: () => 'tok-1',
      onPendingCommand: () => {},
    });
    closeHubRelayConnection();
    vi.advanceTimersByTime(60_000);
    expect(FakeWebSocket.instances).toHaveLength(1);
    expect(getHubRelaySocket()).toBeNull();
  });
});

// ── the parse boundary ────────────────────────────────────────────────────────

describe('parsePendingCommandFrame — the parse boundary', () => {
  it('parses the hub\'s frame shape', () => {
    expect(
      parsePendingCommandFrame({
        type: 'pending_command',
        command: 'play_media',
        server_id: SERVER_ID,
        media_id: 'm-1',
        title: 'Dune',
        issued_at: 123,
        source: 'alexa',
      }),
    ).toEqual(pendingCommand({ mediaId: 'm-1', title: 'Dune', issuedAt: 123 }));
  });

  it('defaults issued_at (Unix seconds) when absent — never NaN', () => {
    const c = parsePendingCommandFrame({
      type: 'pending_command',
      command: 'play_media',
      server_id: SERVER_ID,
      media_id: 'm-1',
      title: 'Dune',
    });
    expect(c).not.toBeNull();
    expect(c!.issuedAt).toBeGreaterThan(1_700_000_000);
  });

  it.each([
    ['a non-object', 'pending_command'],
    ['null', null],
    ['wrong type', { type: 'room_state', room: 'r1' }],
    ['wrong command', { type: 'pending_command', command: 'queue_next', server_id: SERVER_ID, media_id: 'm', title: 't' }],
    ['empty media_id', { type: 'pending_command', command: 'play_media', server_id: SERVER_ID, media_id: '', title: 't' }],
    ['missing title', { type: 'pending_command', command: 'play_media', server_id: SERVER_ID, media_id: 'm' }],
    ['missing server_id', { type: 'pending_command', command: 'play_media', media_id: 'm', title: 't' }],
  ])('rejects %s', (_name, frame) => {
    expect(parsePendingCommandFrame(frame)).toBeNull();
  });
});