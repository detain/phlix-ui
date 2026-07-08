/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCommandStore, fuzzyScore, matchCommand, type Command } from './useCommandStore';

function cmd(id: string, over: Partial<Command> = {}): Command {
  return { id, title: id, run: vi.fn(), ...over };
}

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('fuzzyScore', () => {
  it('returns 0 for an empty query (neutral match)', () => {
    expect(fuzzyScore('', 'anything')).toBe(0);
  });

  it('returns -1 when not a subsequence', () => {
    expect(fuzzyScore('xyz', 'browse')).toBe(-1);
    expect(fuzzyScore('zb', 'browse')).toBe(-1); // order matters
  });

  it('returns -1 when the query is longer than the text', () => {
    expect(fuzzyScore('browser', 'brow')).toBe(-1);
  });

  it('is case-insensitive', () => {
    expect(fuzzyScore('BR', 'browse')).toBeGreaterThan(0);
    expect(fuzzyScore('br', 'BROWSE')).toBeGreaterThan(0);
  });

  it('scores a consecutive run higher than a scattered subsequence', () => {
    const consecutive = fuzzyScore('set', 'settings');
    const scattered = fuzzyScore('set', 'sweetener'); // s..e..t spread out
    expect(consecutive).toBeGreaterThan(scattered);
  });

  it('rewards a whole-prefix match', () => {
    const prefix = fuzzyScore('the', 'theme: nocturne');
    const mid = fuzzyScore('the', 'soothe');
    expect(prefix).toBeGreaterThan(mid);
  });

  it('rewards a word-boundary start', () => {
    const boundary = fuzzyScore('n', 'theme: nocturne'); // after a space
    const inner = fuzzyScore('h', 'theme'); // mid-word
    expect(boundary).toBeGreaterThan(inner);
  });
});

describe('matchCommand', () => {
  it('matches against the title', () => {
    expect(matchCommand('brow', cmd('x', { title: 'Go to Browse' }))).toBeGreaterThanOrEqual(0);
  });

  it('matches against keywords when the title does not', () => {
    const c = cmd('x', { title: 'Go to Browse', keywords: ['library'] });
    expect(matchCommand('libr', c)).toBeGreaterThanOrEqual(0);
  });

  it('matches against the group', () => {
    const c = cmd('x', { title: 'Nocturne', group: 'Theme' });
    expect(matchCommand('them', c)).toBeGreaterThanOrEqual(0);
  });

  it('returns -1 when nothing matches', () => {
    expect(matchCommand('zzz', cmd('x', { title: 'Browse', keywords: ['library'] }))).toBe(-1);
  });

  it('ranks a title match above an equal keyword-only match', () => {
    const titleHit = cmd('a', { title: 'reset' });
    const keywordHit = cmd('b', { title: 'something', keywords: ['reset'] });
    expect(matchCommand('reset', titleHit)).toBeGreaterThan(matchCommand('reset', keywordHit));
  });

  it('returns 0 for an empty/whitespace query', () => {
    expect(matchCommand('   ', cmd('x', { title: 'Anything' }))).toBe(0);
  });
});

describe('useCommandStore — registry', () => {
  it('registers and exposes commands via all', () => {
    const s = useCommandStore();
    s.register([cmd('a'), cmd('b')]);
    expect(s.all.map((c) => c.id)).toEqual(['a', 'b']);
  });

  it('dedupes by id (later registration wins)', () => {
    const s = useCommandStore();
    s.register(cmd('a', { title: 'First' }));
    s.register(cmd('a', { title: 'Second' }));
    expect(s.all).toHaveLength(1);
    expect(s.all[0].title).toBe('Second');
  });

  it('register returns a disposer that removes exactly its ids', () => {
    const s = useCommandStore();
    s.register(cmd('keep'));
    const dispose = s.register([cmd('x'), cmd('y')]);
    expect(s.all).toHaveLength(3);
    dispose();
    expect(s.all.map((c) => c.id)).toEqual(['keep']);
  });

  it('unregister accepts a single id or an array', () => {
    const s = useCommandStore();
    s.register([cmd('a'), cmd('b'), cmd('c')]);
    s.unregister('b');
    expect(s.all.map((c) => c.id)).toEqual(['a', 'c']);
    s.unregister(['a', 'c']);
    expect(s.all).toHaveLength(0);
  });
});

describe('useCommandStore — results', () => {
  it('with no query lists registered commands sorted by priority then title', () => {
    const s = useCommandStore();
    s.register([
      cmd('z', { title: 'Zeta', priority: 0 }),
      cmd('a', { title: 'Alpha', priority: 1 }),
      cmd('m', { title: 'Mu', priority: 0 }),
    ]);
    expect(s.results.map((c) => c.id)).toEqual(['m', 'z', 'a']); // pri 0 (Mu,Zeta) then pri 1 (Alpha)
  });

  it('with a query returns only fuzzy matches, best score first', () => {
    const s = useCommandStore();
    s.register([
      cmd('browse', { title: 'Go to Browse' }),
      cmd('settings', { title: 'Go to Settings' }),
      cmd('nocturne', { title: 'Theme: Nocturne' }),
    ]);
    s.setQuery('set');
    const ids = s.results.map((c) => c.id);
    expect(ids).toContain('settings');
    expect(ids).not.toContain('browse');
    expect(ids[0]).toBe('settings');
  });

  it('surfaces recents first when the query is empty', () => {
    const s = useCommandStore();
    s.register([cmd('a', { title: 'Alpha' }), cmd('b', { title: 'Bravo' }), cmd('c', { title: 'Charlie' })]);
    s.pushRecent('c');
    expect(s.results[0].id).toBe('c');
  });

  it('ignores recents while a query is active', () => {
    const s = useCommandStore();
    s.register([cmd('alpha', { title: 'Alpha' }), cmd('bravo', { title: 'Bravo' })]);
    s.pushRecent('bravo');
    s.setQuery('alp');
    expect(s.results.map((c) => c.id)).toEqual(['alpha']);
  });
});

describe('useCommandStore — recents', () => {
  it('pushRecent prepends and de-duplicates', () => {
    const s = useCommandStore();
    s.pushRecent('a');
    s.pushRecent('b');
    s.pushRecent('a');
    expect(s.recentIds).toEqual(['a', 'b']);
  });

  it('caps recents at 8', () => {
    const s = useCommandStore();
    for (let i = 0; i < 12; i++) s.pushRecent(`c${i}`);
    expect(s.recentIds).toHaveLength(8);
    expect(s.recentIds[0]).toBe('c11');
  });

  it('persists recents to localStorage', async () => {
    const s = useCommandStore();
    s.pushRecent('a');
    await Promise.resolve();
    expect(JSON.parse(localStorage.getItem('phlix.cmd.recents')!)).toEqual(['a']);
  });

  it('reads persisted recents on init', () => {
    localStorage.setItem('phlix.cmd.recents', JSON.stringify(['x', 'y']));
    setActivePinia(createPinia());
    const s = useCommandStore();
    expect(s.recentIds).toEqual(['x', 'y']);
  });

  it('survives corrupt persisted recents', () => {
    localStorage.setItem('phlix.cmd.recents', '{not json');
    setActivePinia(createPinia());
    const s = useCommandStore();
    expect(s.recentIds).toEqual([]);
  });

  it('clearRecents empties the list', () => {
    const s = useCommandStore();
    s.pushRecent('a');
    s.clearRecents();
    expect(s.recentIds).toEqual([]);
  });
});

describe('useCommandStore — palette state + runId', () => {
  it('open/close/toggle drive the open flag and reset the query', () => {
    const s = useCommandStore();
    s.setQuery('stale');
    s.openPalette();
    expect(s.open).toBe(true);
    expect(s.query).toBe('');
    s.closePalette();
    expect(s.open).toBe(false);
    s.togglePalette();
    expect(s.open).toBe(true);
    s.togglePalette();
    expect(s.open).toBe(false);
  });

  it('runId runs the command, records it recent, and closes the palette', async () => {
    const s = useCommandStore();
    const run = vi.fn();
    s.register(cmd('go', { run }));
    s.openPalette();
    await s.runId('go');
    expect(run).toHaveBeenCalledOnce();
    expect(s.recentIds[0]).toBe('go');
    expect(s.open).toBe(false);
  });

  it('runId is a no-op for an unknown id', async () => {
    const s = useCommandStore();
    await s.runId('nope');
    expect(s.recentIds).toEqual([]);
  });

  it('awaits an async command run', async () => {
    const s = useCommandStore();
    let resolved = false;
    s.register(cmd('async', { run: () => Promise.resolve().then(() => { resolved = true; }) }));
    await s.runId('async');
    expect(resolved).toBe(true);
  });
});
