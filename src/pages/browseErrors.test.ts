/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { libraryLoadErrorInfo } from './browseErrors';
import { ERROR_MESSAGES, ERROR_TITLES } from '../i18n/errors';

describe('libraryLoadErrorInfo', () => {
  it('maps server.relay_unavailable to the "relay not connected" copy', () => {
    const info = libraryLoadErrorInfo('server.relay_unavailable', 'fallback');
    expect(info.title).toBe('Server relay not connected');
    expect(info.description).toContain("secure relay tunnel isn't connected");
    // ignores the fallback when a code matched
    expect(info.description).not.toContain('fallback');
  });

  it('maps server.no_tunnel to the same "relay not connected" copy', () => {
    const info = libraryLoadErrorInfo('server.no_tunnel', 'fallback');
    expect(info.title).toBe('Server relay not connected');
    expect(info.description).toContain("secure relay tunnel isn't connected");
  });

  it('maps server.offline to the offline copy', () => {
    const info = libraryLoadErrorInfo('server.offline', 'fallback');
    expect(info.title).toBe('Server offline');
    expect(info.description).toContain('offline');
    expect(info.description).not.toContain('fallback');
  });

  it('falls back to the generic title + the store message for an unknown code', () => {
    const info = libraryLoadErrorInfo('something.else', 'library list offline');
    expect(info.title).toBe("Couldn't load your libraries");
    expect(info.description).toBe('library list offline');
  });

  it('falls back to the generic title + the store message when there is no code', () => {
    const info = libraryLoadErrorInfo(null, 'library list offline');
    expect(info.title).toBe("Couldn't load your libraries");
    expect(info.description).toBe('library list offline');
  });

  // W4: the three EmptyState codes localize through the error catalog instead
  // of the English this file used to hardcode (the en values stay byte-identical).
  it('localizes title + description per locale for the relay codes', () => {
    const es = libraryLoadErrorInfo('server.no_tunnel', 'fallback', 'es');
    expect(es.title).toBe('Relé del servidor no conectado');
    expect(es.description).toContain('relay');
    expect(es.description).toBe(ERROR_MESSAGES.es['server.no_tunnel']);
    const ja = libraryLoadErrorInfo('server.offline', 'fallback', 'ja');
    expect(ja.title).toBe(ERROR_TITLES.ja['server.offline']);
    expect(ja.description).toBe(ERROR_MESSAGES.ja['server.offline']);
  });

  it('unknown codes keep the generic English chrome + store message even with a locale', () => {
    const info = libraryLoadErrorInfo('something.else', 'a falhou tudo', 'pt_BR');
    expect(info.title).toBe("Couldn't load your libraries");
    expect(info.description).toBe('a falhou tudo');
  });
});
