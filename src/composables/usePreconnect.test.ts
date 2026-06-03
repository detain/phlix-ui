import { describe, expect, it, vi, beforeEach } from 'vitest';
import { effectScope } from 'vue';
import { resolveImageOrigin, usePreconnect } from './usePreconnect';

const SELF = window.location.origin; // jsdom document origin

function linksFor(rel: string): HTMLLinkElement[] {
  return Array.from(document.head.querySelectorAll<HTMLLinkElement>(`link[rel~="${rel}"]`));
}
function originsFor(rel: string): string[] {
  return linksFor(rel).map((l) => new URL(l.href).origin);
}

beforeEach(() => {
  // Isolate each test from head links left by a previous one.
  for (const l of [...linksFor('preconnect'), ...linksFor('dns-prefetch')]) l.remove();
});

describe('resolveImageOrigin (R6.2c)', () => {
  const DOC = 'https://app.example.com';

  it('prefers imageOrigin over apiBase', () => {
    expect(
      resolveImageOrigin({
        imageOrigin: 'https://cdn.example.com',
        apiBase: 'https://api.example.com',
        documentOrigin: DOC,
      }),
    ).toBe('https://cdn.example.com');
  });

  it('falls back to the apiBase host when imageOrigin is absent or blank', () => {
    expect(resolveImageOrigin({ apiBase: 'https://api.example.com', documentOrigin: DOC })).toBe(
      'https://api.example.com',
    );
    expect(
      resolveImageOrigin({ imageOrigin: '   ', apiBase: 'https://api.example.com', documentOrigin: DOC }),
    ).toBe('https://api.example.com');
  });

  it('strips any path/query to the bare origin', () => {
    expect(
      resolveImageOrigin({ imageOrigin: 'https://cdn.example.com/img/v2/?q=1', documentOrigin: DOC }),
    ).toBe('https://cdn.example.com');
  });

  it('returns null when nothing is configured', () => {
    expect(resolveImageOrigin({ documentOrigin: DOC })).toBeNull();
    expect(resolveImageOrigin({ imageOrigin: '', apiBase: '', documentOrigin: DOC })).toBeNull();
  });

  it('returns null for a relative apiBase (resolves to the same origin)', () => {
    expect(resolveImageOrigin({ apiBase: '/api/v1', documentOrigin: DOC })).toBeNull();
  });

  it('returns null when the resolved host equals the document origin', () => {
    expect(resolveImageOrigin({ imageOrigin: DOC, documentOrigin: DOC })).toBeNull();
    expect(resolveImageOrigin({ imageOrigin: `${DOC}/cdn/`, documentOrigin: DOC })).toBeNull();
  });

  it('returns null for an invalid or non-http(s) candidate', () => {
    expect(resolveImageOrigin({ imageOrigin: 'not a url', documentOrigin: DOC })).toBeNull();
    expect(resolveImageOrigin({ imageOrigin: 'ftp://files.example.com', documentOrigin: DOC })).toBeNull();
    expect(resolveImageOrigin({ imageOrigin: 'data:image/png;base64,AAAA', documentOrigin: DOC })).toBeNull();
  });

  it('resolves an absolute candidate even with no document origin', () => {
    expect(resolveImageOrigin({ imageOrigin: 'https://cdn.example.com/x' })).toBe('https://cdn.example.com');
  });

  it('treats a relative candidate as null when no document origin is given', () => {
    expect(resolveImageOrigin({ apiBase: '/api' })).toBeNull();
  });

  it('ignores an invalid document origin (no same-origin skip applied)', () => {
    expect(resolveImageOrigin({ imageOrigin: 'https://cdn.example.com', documentOrigin: 'nonsense' })).toBe(
      'https://cdn.example.com',
    );
  });

  it('trims whitespace around the candidate', () => {
    expect(
      resolveImageOrigin({ imageOrigin: '  https://cdn.example.com  ', documentOrigin: DOC }),
    ).toBe('https://cdn.example.com');
  });
});

describe('usePreconnect (R6.2c)', () => {
  it('injects a preconnect + dns-prefetch link for a cross-origin host', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect('https://cdn.example.com'));
      expect(originsFor('preconnect')).toContain('https://cdn.example.com');
      expect(originsFor('dns-prefetch')).toContain('https://cdn.example.com');
    } finally {
      scope.stop();
    }
  });

  it('omits crossorigin by default (posters are no-cors <img>)', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect('https://cdn.example.com'));
      const pc = linksFor('preconnect').find((l) => new URL(l.href).origin === 'https://cdn.example.com')!;
      expect(pc.getAttribute('crossorigin')).toBeNull();
    } finally {
      scope.stop();
    }
  });

  it('adds crossorigin="anonymous" to preconnect (only) when crossOrigin: true', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect('https://fonts.example.com', { crossOrigin: true }));
      const pc = linksFor('preconnect').find((l) => new URL(l.href).origin === 'https://fonts.example.com')!;
      const dns = linksFor('dns-prefetch').find(
        (l) => new URL(l.href).origin === 'https://fonts.example.com',
      )!;
      expect(pc.getAttribute('crossorigin')).toBe('anonymous');
      expect(dns.getAttribute('crossorigin')).toBeNull(); // dns-prefetch never gets crossorigin
    } finally {
      scope.stop();
    }
  });

  it('uses the bare origin as the href (drops the path)', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect('https://cdn.example.com/a/b/c.jpg?x=1'));
      const pc = linksFor('preconnect').find((l) => new URL(l.href).origin === 'https://cdn.example.com')!;
      expect(pc.getAttribute('href')).toBe('https://cdn.example.com');
      expect(new URL(pc.href).pathname).toBe('/');
    } finally {
      scope.stop();
    }
  });

  it('skips a same-origin host (already warm)', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect([SELF, `${SELF}/api/posters`]));
      expect(originsFor('preconnect')).not.toContain(SELF);
      expect(linksFor('preconnect').length).toBe(0);
    } finally {
      scope.stop();
    }
  });

  it('skips invalid and non-http(s) candidates', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect(['not a url', 'ftp://x.example.com', 'data:image/png;base64,AAAA', '']));
      expect(linksFor('preconnect').length).toBe(0);
      expect(linksFor('dns-prefetch').length).toBe(0);
    } finally {
      scope.stop();
    }
  });

  it('dedupes repeats (and same-origin variants) within one call', () => {
    const scope = effectScope();
    try {
      scope.run(() =>
        usePreconnect([
          'https://cdn.example.com',
          'https://cdn.example.com/other/path',
          'https://cdn.example.com',
        ]),
      );
      expect(originsFor('preconnect').filter((o) => o === 'https://cdn.example.com')).toHaveLength(1);
    } finally {
      scope.stop();
    }
  });

  it('handles an array of distinct origins', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect(['https://cdn.example.com', 'https://img.example.net']));
      expect(originsFor('preconnect')).toEqual(
        expect.arrayContaining(['https://cdn.example.com', 'https://img.example.net']),
      );
      expect(originsFor('dns-prefetch')).toEqual(
        expect.arrayContaining(['https://cdn.example.com', 'https://img.example.net']),
      );
    } finally {
      scope.stop();
    }
  });

  it('is a no-op for null / undefined input', () => {
    const scope = effectScope();
    try {
      scope.run(() => usePreconnect(null));
      scope.run(() => usePreconnect(undefined));
      expect(linksFor('preconnect').length).toBe(0);
    } finally {
      scope.stop();
    }
  });

  it('does not duplicate a host already linked (e.g. a consumer static link)', () => {
    const pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://cdn.example.com/'; // trailing slash → origin compare still matches
    document.head.appendChild(pre);

    const scope = effectScope();
    try {
      scope.run(() => usePreconnect('https://cdn.example.com'));
      // exactly one preconnect for that origin (the pre-existing one), no duplicate
      expect(originsFor('preconnect').filter((o) => o === 'https://cdn.example.com')).toHaveLength(1);
      // but the dns-prefetch hint (not present before) was added
      expect(originsFor('dns-prefetch')).toContain('https://cdn.example.com');
    } finally {
      scope.stop();
      pre.remove();
    }
  });

  it('removes the links it created when the scope is disposed', () => {
    const scope = effectScope();
    scope.run(() => usePreconnect('https://cdn.example.com'));
    expect(originsFor('preconnect')).toContain('https://cdn.example.com');
    expect(originsFor('dns-prefetch')).toContain('https://cdn.example.com');
    scope.stop();
    expect(originsFor('preconnect')).not.toContain('https://cdn.example.com');
    expect(originsFor('dns-prefetch')).not.toContain('https://cdn.example.com');
  });

  it('leaves a pre-existing link intact on dispose (only removes what it created)', () => {
    const pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://cdn.example.com';
    document.head.appendChild(pre);

    const scope = effectScope();
    scope.run(() => usePreconnect('https://cdn.example.com')); // skips preconnect, adds dns-prefetch
    scope.stop();

    // the consumer's preconnect survives; the dns-prefetch we created is gone
    expect(originsFor('preconnect')).toContain('https://cdn.example.com');
    expect(originsFor('dns-prefetch')).not.toContain('https://cdn.example.com');
    pre.remove();
  });

  it('is SSR-safe — no document/window means a clean no-op, no throw', () => {
    vi.stubGlobal('document', undefined);
    vi.stubGlobal('window', undefined);
    const scope = effectScope();
    try {
      expect(() => scope.run(() => usePreconnect('https://cdn.example.com'))).not.toThrow();
    } finally {
      scope.stop();
      vi.unstubAllGlobals();
    }
  });
});
