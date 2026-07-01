import { describe, it, expect } from 'vitest';
import { libraryLoadErrorInfo } from './browseErrors';

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
});
