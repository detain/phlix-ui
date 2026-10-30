/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import {
  BUILT_IN_THEME_IDS,
  THEME_TOKEN_ALLOWLIST,
  THEME_CACHE_KEY,
  MAX_EXTENDS_DEPTH,
  isBuiltInThemeId,
  isAllowedThemeToken,
  isSafeThemeTokenValue,
  sanitizeThemeTokens,
  normalizeServerTheme,
  resolveThemeTokens,
  resolveThemeBase,
  activeThemeStyle,
  applyThemeTokens,
  clearThemeTokens,
  readCachedTheme,
  writeCachedTheme,
  FOCUS_RING_MIN_CONTRAST,
  RING_GROUND_KEYS,
  parseThemeColor,
  compositedContrastOver,
  focusRingLawViolation,
  type ServerTheme,
} from './themeTokens';
import type { ThemeName } from '../stores/usePreferencesStore';

/**
 * Control characters are BUILT, never typed literally: a literal NUL/BEL in a
 * source file makes it a binary blob to `grep`, `diff` and every review tool.
 * (`themeTokens.ts` avoids the same trap in its own `CONTROL_CHAR_PATTERN`.)
 */
const NUL = String.fromCharCode(0);
const BEL = String.fromCharCode(7);

/* ------------------------------------------------------------------ *
 * The canonical allowlist source: the SHIPPED colors.css, read off disk.
 * Same resolve+read pattern as `src/tokens/contrast.test.ts`.
 * ------------------------------------------------------------------ */
const nodeRequire = createRequire(import.meta.url);
function resolveTokenCss(name: string): string {
  try {
    return nodeRequire.resolve(`@phlix/tokens/css/${name}`);
  } catch {
    return join(dirname(nodeRequire.resolve('@phlix/tokens/package.json')), 'src/css', name);
  }
}
const colorsCss = readFileSync(resolveTokenCss('colors.css'), 'utf8');

/**
 * The custom properties one `[data-theme='…']` block declares, in source order.
 *
 * `var(--x)` references are NOT matched — the pattern requires a `:` after the
 * name, which only a declaration has.
 */
function declaredTokens(themeId: string): string[] {
  const selector = `[data-theme='${themeId}']`;
  const at = colorsCss.indexOf(selector);
  if (at === -1) throw new Error(`colors.css has no ${selector} block`);
  const open = colorsCss.indexOf('{', at);
  const close = colorsCss.indexOf('}', open);
  return [...colorsCss.slice(open + 1, close).matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]);
}

/** A minimal well-formed catalogue entry. */
function theme(over: Partial<ServerTheme> & Pick<ServerTheme, 'id'>): ServerTheme {
  return {
    name: over.id,
    dark: true,
    extends: null,
    tokens: {},
    source: 'sample-theme',
    builtIn: false,
    ...over,
  };
}

/**
 * A built-in as the LIST endpoint really serves it: `builtIn: true` AND a full
 * 53-token map (the server keeps one for non-CSS clients). Several tests below
 * exist purely because that map is present and must be ignored.
 */
function builtInEntry(id: string, bg: string): ServerTheme {
  const tokens: Record<string, string> = {};
  for (const key of THEME_TOKEN_ALLOWLIST) tokens[key] = key === '--grain-opacity' ? '0.02' : '#010101';
  tokens['--bg'] = bg;
  return { id, name: id, dark: true, extends: null, tokens, source: null, builtIn: true };
}

describe('THEME_TOKEN_ALLOWLIST — a transcription of colors.css, not a guess', () => {
  it('equals the tokens the nocturne theme block declares, in declaration order', () => {
    // Asserted against the SHIPPED stylesheet, not against a copy made in this
    // file: if colors.css gains, loses or reorders a token and the allowlist is
    // not re-synced, this fails.
    expect([...THEME_TOKEN_ALLOWLIST]).toEqual(declaredTokens('nocturne'));
  });

  it('is identical across all three built-in blocks (so any base can back any theme)', () => {
    expect(declaredTokens('daylight')).toEqual(declaredTokens('nocturne'));
    expect(declaredTokens('midnight')).toEqual(declaredTokens('nocturne'));
  });

  it('is exactly 53 tokens with no duplicates', () => {
    expect(THEME_TOKEN_ALLOWLIST).toHaveLength(53);
    expect(new Set(THEME_TOKEN_ALLOWLIST).size).toBe(53);
  });

  it('excludes the theme-invariant amber ramp and --accent-contrast', () => {
    // These live in colors.css's standalone :root block. A plugin re-hues via
    // the six semantic --accent* tokens instead.
    for (const excluded of ['--amber-500', '--amber-50', '--accent-contrast']) {
      expect(isAllowedThemeToken(excluded)).toBe(false);
    }
    expect(colorsCss).toContain('--accent-contrast:'); // ...and they really do exist
    expect(colorsCss).toContain('--amber-500:');
  });

  it('excludes every LAYOUT token — S86 keeps layout stable by construction', () => {
    for (const layout of [
      '--space-4', '--radius-md', '--shadow-2', '--duration-fast',
      '--density-row-h', '--font-size-base', '--leading-normal',
    ]) {
      expect(isAllowedThemeToken(layout)).toBe(false);
    }
  });
});

describe('isAllowedThemeToken', () => {
  it('accepts every allowlisted name', () => {
    for (const key of THEME_TOKEN_ALLOWLIST) expect(isAllowedThemeToken(key)).toBe(true);
  });

  it('is case-SENSITIVE — --BG is a different property from --bg', () => {
    expect(isAllowedThemeToken('--bg')).toBe(true);
    expect(isAllowedThemeToken('--BG')).toBe(false);
    expect(isAllowedThemeToken('--Bg')).toBe(false);
  });

  it('rejects near-misses by not matching, with no substring blocklist anywhere', () => {
    for (const bad of [
      '--bg ', ' --bg', '--bg;', '--bg:', 'bg', '-bg', '--', '',
      '--background', '--bg-', 'color', 'background-image',
    ]) {
      expect(isAllowedThemeToken(bad)).toBe(false);
    }
  });
});

describe('isSafeThemeTokenValue — a grammar, not a blocklist', () => {
  it.each([
    '#fff', '#ffff', '#0b0f18', '#0b0f18cc', '#FFF', '#AaBbCcDd',
    'rgb(1,2,3)', 'rgb(1, 2, 3)', 'rgba(110, 168, 254, 0.14)',
    'hsl(210, 50%, 40%)', 'hsla(210deg, 50%, 40%, .5)', 'RGBA(1,2,3,.5)',
    'rgb(1 / 2 / 3)', '0', '1', '0.04', '.5', '-0.2', '+1.5',
    'transparent', 'currentColor', 'CURRENTCOLOR', '  #fff  ',
  ])('accepts %j', (value) => {
    expect(isSafeThemeTokenValue(value)).toBe(true);
  });

  it.each([
    // The classic CSS-injection shapes, each rejected by having no production
    // in the grammar rather than by being recognised as hostile.
    'url(evil.png)', 'URL(evil.png)', 'Url (evil.png)', "url('x')",
    'expression(alert(1))', 'var(--bg)', 'attr(href)', 'image-set(a.png)',
    '#fff !important', '#fff;', '#fff}', '#fff} body{background:red',
    '#fff\nbody', '#fff\r\nbody', '#fff\tbody', '\\75 rl(x)', '\\000075rl(x)',
    'u/**/rl(x)', 'rgb(1,2,3) url(x)', '#gggggg', '#ff', '#fffff',
    'red', 'blue', 'inherit', 'initial', 'unset', 'none',
    '', '   ', 'rgb(1,2)', 'rgb(1,2,3,4,5)', 'rgb(a,b,c)',
    'calc(1px + 2px)', 'linear-gradient(red, blue)', '10px', '1em',
  ])('rejects %j', (value) => {
    expect(isSafeThemeTokenValue(value)).toBe(false);
  });

  it('rejects a NUL smuggled into an otherwise valid colour', () => {
    // JS `trim()` strips whitespace but NOT NUL, so the anchors do this work.
    expect(isSafeThemeTokenValue('#ffffff' + NUL)).toBe(false);
    expect(isSafeThemeTokenValue(NUL + '#ffffff')).toBe(false);
    expect(isSafeThemeTokenValue('#ff' + NUL + 'ffff')).toBe(false);
    // ...while surrounding WHITESPACE is trimmed and therefore fine:
    expect(isSafeThemeTokenValue('  #ffffff  ')).toBe(true);
  });

  it('caps length at 128 characters', () => {
    // A syntactically valid number, accepted at 128 and refused at 129 — so it
    // is the cap that rejects it, not the grammar.
    expect(isSafeThemeTokenValue('0.' + '0'.repeat(126))).toBe(true);
    expect(isSafeThemeTokenValue('0.' + '0'.repeat(127))).toBe(false);
  });

  it('anchors at BOTH ends — a valid prefix or suffix is not enough', () => {
    expect(isSafeThemeTokenValue('#fff')).toBe(true);
    expect(isSafeThemeTokenValue('#fff}body{background:url(//evil)')).toBe(false);
    expect(isSafeThemeTokenValue('}body{background:url(//evil)}#fff')).toBe(false);
  });
});

describe('sanitizeThemeTokens', () => {
  it('keeps allowlisted keys with in-grammar values, trimmed', () => {
    expect(sanitizeThemeTokens({ '--bg': '  #05060a  ', '--grain-opacity': '0.04' }))
      .toEqual({ '--bg': '#05060a', '--grain-opacity': '0.04' });
  });

  it('drops a non-allowlisted key even when its value is a perfectly safe colour', () => {
    expect(sanitizeThemeTokens({ '--bg': '#000', '--evil': '#fff', background: '#fff' }))
      .toEqual({ '--bg': '#000' });
  });

  it('drops an allowlisted key whose value escapes the grammar', () => {
    expect(sanitizeThemeTokens({ '--bg': 'url(//evil)', '--text': '#fff' }))
      .toEqual({ '--text': '#fff' });
  });

  it('drops non-string values instead of coercing them', () => {
    expect(sanitizeThemeTokens({ '--bg': 1, '--text': null, '--surface': ['#fff'] })).toEqual({});
  });

  it('returns {} for every non-object input', () => {
    for (const bad of [null, undefined, 'str', 7, true, ['--bg']]) {
      expect(sanitizeThemeTokens(bad)).toEqual({});
    }
  });

  it('ignores a prototype-polluting key', () => {
    const out = sanitizeThemeTokens(JSON.parse('{"__proto__":{"polluted":true},"--bg":"#000"}'));
    expect(out).toEqual({ '--bg': '#000' });
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});

describe('normalizeServerTheme', () => {
  const wire = {
    id: 'sample-dusk', name: 'Sample Dusk', dark: true, extends: 'midnight',
    tokens: { '--bg': '#05060a' }, source: 'sample-theme', builtIn: false,
  };

  it('narrows a well-formed entry', () => {
    expect(normalizeServerTheme(wire)).toEqual({
      id: 'sample-dusk', name: 'Sample Dusk', dark: true, extends: 'midnight',
      tokens: { '--bg': '#05060a' }, source: 'sample-theme', builtIn: false,
    });
  });

  it.each([
    ['a non-object', 'nope'],
    ['an array', ['x']],
    ['null', null],
    ['a missing id', { ...wire, id: undefined }],
    ['an UPPERCASE id', { ...wire, id: 'Sample-Dusk' }],
    ['an id with a slash', { ...wire, id: 'a/b' }],
    ['an id starting with a hyphen', { ...wire, id: '-x' }],
    ['an over-long id', { ...wire, id: 'a'.repeat(65) }],
    ['an empty name', { ...wire, name: '   ' }],
    ['an over-long name', { ...wire, name: 'n'.repeat(65) }],
    ['a name with a control character', { ...wire, name: 'Ok' + BEL + 'Bell' }],
    ['a name with a newline', { ...wire, name: 'Two\nLines' }],
  ])('rejects %s', (_label, raw) => {
    expect(normalizeServerTheme(raw)).toBeNull();
  });

  it('nulls a self-referential or malformed extends rather than rejecting the theme', () => {
    expect(normalizeServerTheme({ ...wire, extends: 'sample-dusk' })?.extends).toBeNull();
    expect(normalizeServerTheme({ ...wire, extends: 'NOT A SLUG' })?.extends).toBeNull();
    expect(normalizeServerTheme({ ...wire, extends: 42 })?.extends).toBeNull();
  });

  it('re-sanitises tokens the server sent — the client never trusts the body', () => {
    const t = normalizeServerTheme({
      ...wire,
      tokens: { '--bg': 'url(//evil)', '--evil': '#fff', '--text': '#eee' },
    });
    expect(t?.tokens).toEqual({ '--text': '#eee' });
  });

  it('treats a reserved id as built-in even if the server says builtIn:false', () => {
    expect(normalizeServerTheme({ ...wire, id: 'midnight', builtIn: false })?.builtIn).toBe(true);
  });

  it('coerces dark and source strictly', () => {
    expect(normalizeServerTheme({ ...wire, dark: 'yes' })?.dark).toBe(false);
    expect(normalizeServerTheme({ ...wire, source: '' })?.source).toBeNull();
    expect(normalizeServerTheme({ ...wire, source: 7 })?.source).toBeNull();
  });
});

describe('isBuiltInThemeId', () => {
  it('matches exactly the three ids the SPA stylesheet ships', () => {
    expect([...BUILT_IN_THEME_IDS]).toEqual(['nocturne', 'daylight', 'midnight']);
    for (const id of BUILT_IN_THEME_IDS) expect(isBuiltInThemeId(id)).toBe(true);
    for (const id of ['sample-dusk', 'Nocturne', 'nocturne ', '']) expect(isBuiltInThemeId(id)).toBe(false);
  });

  it('names a block that really exists in colors.css for each id', () => {
    for (const id of BUILT_IN_THEME_IDS) expect(colorsCss).toContain(`[data-theme='${id}']`);
  });
});

describe('resolveThemeTokens / resolveThemeBase — the extends chain', () => {
  const dusk = theme({
    id: 'sample-dusk', extends: 'midnight',
    tokens: { '--bg': '#05060a', '--text': '#e6ecf5' },
  });
  const contrast = theme({
    id: 'sample-dusk-high-contrast', extends: 'sample-dusk',
    tokens: { '--text': '#ffffff' },
  });
  const catalogue = [builtInEntry('nocturne', '#0b0a08'), builtInEntry('midnight', '#000000'), dusk, contrast];

  it('layers a plugin-extends-plugin chain nearest-wins', () => {
    expect(resolveThemeTokens('sample-dusk-high-contrast', catalogue)).toEqual({
      '--bg': '#05060a', // inherited from sample-dusk
      '--text': '#ffffff', // the variant's own override wins
    });
  });

  it("NEVER merges a built-in base's server token map — the stylesheet owns those", () => {
    // The list response really does carry 53 tokens for `midnight`. Flattening
    // them here would make the SPA render from the server's transcription of
    // colors.css instead of from colors.css itself, and would erase the
    // difference between "the plugin set this" and "the base supplies this".
    const resolved = resolveThemeTokens('sample-dusk', catalogue);
    expect(resolved).toEqual({ '--bg': '#05060a', '--text': '#e6ecf5' });
    expect(Object.keys(resolved)).toHaveLength(2);
    // Proof it is the BASE being skipped, not an empty catalogue:
    expect(catalogue.find((t) => t.id === 'midnight')?.tokens['--surface']).toBe('#010101');
    expect(resolved['--surface']).toBeUndefined();
  });

  it('resolves the base built-in through a two-hop plugin chain', () => {
    expect(resolveThemeBase('sample-dusk', catalogue)).toBe('midnight');
    expect(resolveThemeBase('sample-dusk-high-contrast', catalogue)).toBe('midnight');
  });

  it('resolves the base even when the built-in is absent from the catalogue', () => {
    expect(resolveThemeBase('sample-dusk', [dusk, contrast])).toBe('midnight');
  });

  it('returns a built-in id unchanged', () => {
    for (const id of BUILT_IN_THEME_IDS) expect(resolveThemeBase(id, catalogue)).toBe(id);
  });

  it("falls back on the theme's own polarity when the chain names no built-in", () => {
    const light = theme({ id: 'standalone-light', dark: false });
    const dark = theme({ id: 'standalone-dark', dark: true });
    expect(resolveThemeBase('standalone-light', [light])).toBe('daylight');
    expect(resolveThemeBase('standalone-dark', [dark])).toBe('nocturne');
  });

  it('degrades an id nothing serves to the SPA default rather than to nothing', () => {
    expect(resolveThemeBase('uninstalled-theme', catalogue)).toBe('nocturne');
    expect(resolveThemeTokens('uninstalled-theme', catalogue)).toEqual({});
  });

  it('survives a 2-cycle without hanging', () => {
    const a = theme({ id: 'cyc-a', extends: 'cyc-b', tokens: { '--bg': '#111111' } });
    const b = theme({ id: 'cyc-b', extends: 'cyc-a', tokens: { '--bg': '#222222', '--text': '#333333' } });
    expect(resolveThemeTokens('cyc-a', [a, b])).toEqual({ '--bg': '#111111', '--text': '#333333' });
    expect(resolveThemeBase('cyc-a', [a, b])).toBe('nocturne');
  });

  it('survives a self-cycle that bypassed normalizeServerTheme', () => {
    const self = theme({ id: 'cyc-self', extends: 'cyc-self', tokens: { '--bg': '#111111' } });
    expect(resolveThemeTokens('cyc-self', [self])).toEqual({ '--bg': '#111111' });
  });

  describe('the MAX_EXTENDS_DEPTH bound', () => {
    /** `n` plugin themes in a chain, each contributing one distinct token. */
    const makeChain = (n: number): ServerTheme[] =>
      Array.from({ length: n }, (_, i) => theme({
        id: `link-${i}`,
        extends: i === n - 1 ? null : `link-${i + 1}`,
        tokens: { [THEME_TOKEN_ALLOWLIST[i]]: '#000000' },
      }));

    it('merges every link of a chain exactly MAX_EXTENDS_DEPTH long (positive control)', () => {
      expect(MAX_EXTENDS_DEPTH).toBe(8);
      expect(Object.keys(resolveThemeTokens('link-0', makeChain(8)))).toHaveLength(8);
    });

    it('stops at MAX_EXTENDS_DEPTH — the 9th link contributes nothing', () => {
      const nine = makeChain(9);
      const resolved = resolveThemeTokens('link-0', nine);
      expect(Object.keys(resolved)).toHaveLength(8);
      expect(resolved[THEME_TOKEN_ALLOWLIST[8]]).toBeUndefined();
      // The 9th link's token IS there to be found — the cap is what excluded it.
      expect(nine[8].tokens[THEME_TOKEN_ALLOWLIST[8]]).toBe('#000000');
    });
  });
});

describe('activeThemeStyle', () => {
  const dusk = theme({ id: 'sample-dusk', extends: 'midnight', tokens: { '--bg': '#05060a' } });
  const catalogue = [builtInEntry('midnight', '#000000'), dusk];

  it('is null for a built-in — data-theme alone renders it, nothing to apply', () => {
    for (const id of BUILT_IN_THEME_IDS) expect(activeThemeStyle(id, catalogue)).toBeNull();
  });

  it('is null for an id the catalogue does not serve', () => {
    expect(activeThemeStyle('uninstalled', catalogue)).toBeNull();
  });

  it('carries the id, the resolved base and the flattened tokens', () => {
    expect(activeThemeStyle('sample-dusk', catalogue)).toEqual({
      id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a' },
    });
  });
});

describe('applyThemeTokens — the single place a value becomes CSS', () => {
  let el: HTMLElement;
  beforeEach(() => {
    el = document.createElement('div');
  });

  it('sets an allowlisted, in-grammar token', () => {
    applyThemeTokens(el, { '--bg': '#05060a' });
    expect(el.style.getPropertyValue('--bg')).toBe('#05060a');
  });

  it('re-checks the KEY even when the caller skipped sanitising', () => {
    // The caller here is hostile/buggy: it hands over a map that never went
    // through sanitizeThemeTokens. Nothing outside the allowlist may be set.
    applyThemeTokens(el, { '--evil': '#fff', color: 'red', '--bg': '#000000' });
    expect(el.style.getPropertyValue('--evil')).toBe('');
    expect(el.style.getPropertyValue('color')).toBe('');
    expect(el.style.getPropertyValue('--bg')).toBe('#000000');
  });

  it('re-checks the VALUE even when the caller skipped sanitising', () => {
    applyThemeTokens(el, { '--bg': 'url(//evil/x.png)', '--text': '#fff}body{display:none' });
    expect(el.style.getPropertyValue('--bg')).toBe('');
    expect(el.style.getPropertyValue('--text')).toBe('');
    expect(el.getAttribute('style')).toBeNull();
  });

  it('uses CSSOM setProperty and creates no <style> element', () => {
    // The CSP posture in one assertion: token application is a CSSOM write, so
    // it needs no `style-src 'unsafe-inline'`. NOTE: jsdom does not ENFORCE
    // CSP — what is pinned here is the mechanism, not a browser's verdict.
    const spy = vi.spyOn(CSSStyleDeclaration.prototype, 'setProperty');
    const before = document.querySelectorAll('style').length;
    applyThemeTokens(el, { '--bg': '#05060a', '--text': '#e6ecf5' });
    expect(spy).toHaveBeenCalledWith('--bg', '#05060a');
    expect(spy).toHaveBeenCalledWith('--text', '#e6ecf5');
    expect(document.querySelectorAll('style').length).toBe(before);
    spy.mockRestore();
  });
});

describe('clearThemeTokens', () => {
  it('removes every allowlisted property and leaves everything else alone', () => {
    const el = document.createElement('div');
    el.style.setProperty('--bg', '#000');
    el.style.setProperty('--text', '#fff');
    el.style.setProperty('--accent-contrast', '#123456'); // NOT on the allowlist
    el.style.setProperty('color', 'red');

    clearThemeTokens(el);

    expect(el.style.getPropertyValue('--bg')).toBe('');
    expect(el.style.getPropertyValue('--text')).toBe('');
    expect(el.style.getPropertyValue('--accent-contrast')).toBe('#123456');
    expect(el.style.getPropertyValue('color')).toBe('red');
  });

  it('is a no-op on an element that never had a token set', () => {
    const el = document.createElement('div');
    clearThemeTokens(el);
    expect(el.getAttribute('style')).toBeNull();
  });
});

describe('the localStorage boot cache is treated as hostile input', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips a valid style', () => {
    writeCachedTheme({ id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a' } });
    expect(readCachedTheme()).toEqual({ id: 'sample-dusk', base: 'midnight', tokens: { '--bg': '#05060a' } });
  });

  it('writes exactly one bounded entry — a resident-memory / quota concern', () => {
    writeCachedTheme({ id: 'a-theme', base: 'midnight', tokens: {} });
    writeCachedTheme({ id: 'b-theme', base: 'nocturne', tokens: {} });
    expect(localStorage.length).toBe(1);
    expect(readCachedTheme()?.id).toBe('b-theme');
  });

  it('clears on null', () => {
    writeCachedTheme({ id: 'sample-dusk', base: 'midnight', tokens: {} });
    writeCachedTheme(null);
    expect(localStorage.getItem(THEME_CACHE_KEY)).toBeNull();
    expect(readCachedTheme()).toBeNull();
  });

  it.each([
    ['absent', null],
    ['unparseable', '{not json'],
    ['an array', '[]'],
    ['a bare string', '"nope"'],
    ['missing base', '{"id":"x-theme","tokens":{}}'],
    ['a NON-built-in base', '{"id":"x-theme","base":"evil","tokens":{}}'],
    ['a built-in id (nothing to cache)', '{"id":"midnight","base":"midnight","tokens":{}}'],
    ['a malformed id', '{"id":"NOT A SLUG","base":"midnight","tokens":{}}'],
  ])('returns null for %s cached data', (_label, raw) => {
    if (raw !== null) localStorage.setItem(THEME_CACHE_KEY, raw);
    expect(readCachedTheme()).toBeNull();
  });

  it('strips hostile tokens an XSS wrote into the cache instead of trusting them', () => {
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify({
      id: 'sample-dusk',
      base: 'midnight',
      tokens: { '--bg': 'url(//evil)', '--evil': '#fff', '--text': '#eee' },
    }));
    expect(readCachedTheme()?.tokens).toEqual({ '--text': '#eee' });
  });

  it('swallows a throwing localStorage rather than breaking boot', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(readCachedTheme()).toBeNull();
    getItem.mockRestore();

    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    expect(() => writeCachedTheme({ id: 'x-theme', base: 'midnight', tokens: {} })).not.toThrow();
    setItem.mockRestore();
  });
});

describe('ThemeName is widened to string (S86)', () => {
  it('accepts a plugin id no build-time union could enumerate', () => {
    // TYPECHECK-ONLY GUARD. If `ThemeName` is narrowed back to
    // `'nocturne' | 'daylight' | 'midnight'`, this annotation is a compile
    // error and `npm run typecheck` (vue-tsc) fails. It can NEVER fail
    // `npm run test:run`: vitest transpiles via esbuild and type-checks nothing.
    const pluginThemeId: ThemeName = 'sample-dusk-high-contrast';
    expect(pluginThemeId).toBe('sample-dusk-high-contrast');
  });
});

/* ------------------------------------------------------------------ *
 * R-UI-05 — the composited focus-ring law.
 *
 * The jade incident this generalises (review theme-jade __r1, 3b): jade
 * SHIPPED `--accent-ring: rgba(80, 200, 120, 0.45)`, which composites to
 * 2.68:1 on its `--bg` and 2.71:1 on its `--surface` — below the 3:1
 * WCAG 1.4.11 floor for the focus indicator, the ui's primary keyboard
 * affordance. Only that theme's OWN TokenContrastTest caught it; every
 * other theme repo guards its own pixels, and NOTHING guarded the seam a
 * hostile or careless theme crosses at runtime. These pins make the law
 * live on the client side of the contract, at the single place a theme
 * value becomes CSS (applyThemeTokens).
 * ------------------------------------------------------------------ */

/** jade's pre-cure ring and its three graded grounds, verbatim off the shipped map. */
const JADE_PRE_FIX = {
  ring: 'rgba(80, 200, 120, 0.45)',
  bg: '#050a07',
  surface: '#0a1410',
  surface2: '#101e18',
};

describe('focus-ring law — WCAG 1.4.11 floor and its graded grounds', () => {
  it('pins the floor at 3:1 and the grounds at the opaque elevation stack', () => {
    expect(FOCUS_RING_MIN_CONTRAST).toBe(3.0);
    expect(RING_GROUND_KEYS).toEqual(['--bg', '--surface', '--surface-2']);
  });

  it('--surface-3 is deliberately NOT graded (transient ground; static lock scopes it)', () => {
    // The src/tokens/contrast.test.ts graded set excludes surface-3 for the
    // same reason, and sample-theme's ring sits at 2.93 on ITS s3 — binding
    // s3 here would false-deny a theme that passes every real interaction
    // ground. This pin exists so the exclusion is a decision, never an omission.
    expect(RING_GROUND_KEYS).not.toContain('--surface-3');
  });
});

describe('parseThemeColor', () => {
  it('parses the 3-, 4-, 6- and 8-digit hex forms', () => {
    expect(parseThemeColor('#fff')).toEqual({ rgb: [255, 255, 255], alpha: 1 });
    expect(parseThemeColor('#fffe')).toEqual({ rgb: [255, 255, 255], alpha: 238 / 255 });
    expect(parseThemeColor('#050a07')).toEqual({ rgb: [5, 10, 7], alpha: 1 });
    expect(parseThemeColor('#050a0780')).toEqual({ rgb: [5, 10, 7], alpha: 128 / 255 });
  });

  it('parses rgb()/rgba() with comma or slash separators between arguments', () => {
    expect(parseThemeColor('rgb(80, 200, 120)')).toEqual({ rgb: [80, 200, 120], alpha: 1 });
    expect(parseThemeColor('rgba(80, 200, 120, 0.45)')).toEqual({ rgb: [80, 200, 120], alpha: 0.45 });
    // The SPACE-separated modern form is already refused by isSafeThemeTokenValue
    // (its grammar requires a comma or slash between arguments), so the parser
    // deliberately does not grow a second, looser grammar: it returns null and
    // the law treats null as unprovable — never as a violation.
    expect(parseThemeColor('rgb(80 200 120 / 0.45)')).toBeNull();
  });

  it('returns null for forms the law cannot prove (hsl, keywords, percentages)', () => {
    expect(parseThemeColor('hsl(140, 50%, 45%)')).toBeNull();
    expect(parseThemeColor('hsla(140 50% 45% / 0.45)')).toBeNull();
    expect(parseThemeColor('transparent')).toBeNull();
    expect(parseThemeColor('currentcolor')).toBeNull();
    expect(parseThemeColor('rgb(50%, 50%, 50%)')).toBeNull();
    expect(parseThemeColor('#gg0000')).toBeNull();
    expect(parseThemeColor('#12345')).toBeNull();
    expect(parseThemeColor('')).toBeNull();
  });
});

describe('compositedContrastOver — the jade math, pinned', () => {
  it('reproduces the exact figures review theme-jade __r1 measured for the pre-cure ring', () => {
    // These four toFixed(2) strings ARE the review's numbers; if the module's
    // composite or luminance math drifts, one of them moves and this test reddens.
    expect(compositedContrastOver(JADE_PRE_FIX.ring, JADE_PRE_FIX.bg)?.toFixed(2)).toBe('2.68');
    expect(compositedContrastOver(JADE_PRE_FIX.ring, JADE_PRE_FIX.surface)?.toFixed(2)).toBe('2.71');
    expect(compositedContrastOver(JADE_PRE_FIX.ring, JADE_PRE_FIX.surface2)?.toFixed(2)).toBe('2.70');
  });

  it('scores the CURED jade ring above the floor on every graded ground', () => {
    // rgba(110, 232, 154, 0.55) is --accent-hover's own value; the jade cure
    // lifted the ring to 4.42 / 4.42 / 4.28 (s3 4.03, unbound — see above).
    const cured = 'rgba(110, 232, 154, 0.55)';
    expect(compositedContrastOver(cured, JADE_PRE_FIX.bg)?.toFixed(2)).toBe('4.42');
    expect(compositedContrastOver(cured, JADE_PRE_FIX.surface)?.toFixed(2)).toBe('4.42');
    expect(compositedContrastOver(cured, JADE_PRE_FIX.surface2)?.toFixed(2)).toBe('4.28');
  });

  it('is a plain WCAG ratio when the ring is fully opaque (alpha 1 = no composite)', () => {
    // #6ee89a is the same RGB the cured ring uses at 0.55 alpha; opaque on
    // #050a07 it is 12.98, not the composited 4.42 — pinning the alpha=1 path.
    expect(compositedContrastOver('#6ee89a', JADE_PRE_FIX.bg)?.toFixed(2)).toBe('12.98');
  });

  it('returns null (unprovable, NOT a violation) on any unparsable input', () => {
    expect(compositedContrastOver('hsl(140, 50%, 45%)', JADE_PRE_FIX.bg)).toBeNull();
    expect(compositedContrastOver(JADE_PRE_FIX.ring, 'currentcolor')).toBeNull();
    expect(compositedContrastOver(JADE_PRE_FIX.ring, 'nonsense')).toBeNull();
  });

  it('returns null over a translucent ground (the composite ground is unknowable)', () => {
    expect(compositedContrastOver(JADE_PRE_FIX.ring, '#050a0780')).toBeNull();
    expect(compositedContrastOver(JADE_PRE_FIX.ring, 'rgba(5, 10, 7, 0.8)')).toBeNull();
  });
});

describe('focusRingLawViolation', () => {
  it('names the first failing ground with the measured ratio', () => {
    const violation = focusRingLawViolation({
      '--bg': JADE_PRE_FIX.bg,
      '--surface': JADE_PRE_FIX.surface,
      '--surface-2': JADE_PRE_FIX.surface2,
      '--accent-ring': JADE_PRE_FIX.ring,
    });
    expect(violation).toContain('--accent-ring rgba(80, 200, 120, 0.45) composited to 2.68:1');
    expect(violation).toContain('3:1 WCAG 1.4.11');
  });

  it('passes the cured jade map and the built-in sheets', () => {
    expect(focusRingLawViolation({
      '--bg': JADE_PRE_FIX.bg,
      '--surface': JADE_PRE_FIX.surface,
      '--surface-2': JADE_PRE_FIX.surface2,
      '--accent-ring': 'rgba(110, 232, 154, 0.55)',
    })).toBeNull();
  });

  it('is silent (null) when the map declares no ring, or no ground the law can check', () => {
    expect(focusRingLawViolation({ '--text': '#e6ecf5' })).toBeNull();
    // Ring without grounds: the cascade supplies the base theme's painted
    // ground, which the base theme's own certification covered — nothing here
    // to measure, nothing to deny.
    expect(focusRingLawViolation({ '--accent-ring': JADE_PRE_FIX.ring })).toBeNull();
    // Unparsable ring form: unprovable, and an unprovable ring is not a
    // PROVEN violation — the law denies only what it can measure failing.
    expect(focusRingLawViolation({ '--bg': JADE_PRE_FIX.bg, '--accent-ring': 'hsl(140, 50%, 45%)' })).toBeNull();
    // Translucent ground: the real painted composite is unknowable — skip.
    expect(focusRingLawViolation({ '--bg': '#050a0780', '--accent-ring': JADE_PRE_FIX.ring })).toBeNull();
  });

  it('checks every graded ground, not just the first', () => {
    // The cured ring PASSES on the dark --bg (4.42) and FAILS on a light
    // --surface (~1.4 — a bright ring on a bright ground is invisible). If the
    // loop only sampled --bg this map would sail through, so the reported
    // ground being --surface is what proves full-ground iteration.
    const violation = focusRingLawViolation({
      '--bg': JADE_PRE_FIX.bg,
      '--surface': '#fafaf7',
      '--accent-ring': 'rgba(110, 232, 154, 0.55)',
    });
    expect(violation).not.toBeNull();
    expect(violation).toContain('on --surface (#fafaf7)');
  });
});

describe('applyThemeTokens — the focus-ring law at the single CSS boundary', () => {
  let el: HTMLElement;
  let warn: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    el = document.createElement('div');
    warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => {
    // Re-spying WITHOUT restoring accumulates one shared mock in this vitest
    // config — call counts would leak across these five tests.
    warn.mockRestore();
  });

  it('drops the pre-cure jade ring, sets every other token, and warns once with the measured ratio', () => {
    applyThemeTokens(el, {
      '--bg': JADE_PRE_FIX.bg,
      '--surface': JADE_PRE_FIX.surface,
      '--accent-ring': JADE_PRE_FIX.ring,
      '--text': '#e6ecf5',
    });
    expect(el.style.getPropertyValue('--accent-ring')).toBe('');
    expect(el.style.getPropertyValue('--bg')).toBe(JADE_PRE_FIX.bg);
    expect(el.style.getPropertyValue('--text')).toBe('#e6ecf5');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toContain('2.68');
    expect(warn.mock.calls[0]?.[0]).toContain("falling back to the base theme's ring");
  });

  it('applies the cured jade ring untouched and stays silent', () => {
    applyThemeTokens(el, {
      '--bg': JADE_PRE_FIX.bg,
      '--surface': JADE_PRE_FIX.surface,
      '--surface-2': JADE_PRE_FIX.surface2,
      '--accent-ring': 'rgba(110, 232, 154, 0.55)',
    });
    expect(el.style.getPropertyValue('--accent-ring')).toBe('rgba(110, 232, 154, 0.55)');
    expect(warn).not.toHaveBeenCalled();
  });

  it('applies a ring whose map declares no checkable ground (cascade fallback is certified)', () => {
    applyThemeTokens(el, { '--accent-ring': JADE_PRE_FIX.ring });
    expect(el.style.getPropertyValue('--accent-ring')).toBe(JADE_PRE_FIX.ring);
    expect(warn).not.toHaveBeenCalled();
  });

  it('applies an hsl ring it cannot measure — unprovable is not proven-failing', () => {
    applyThemeTokens(el, { '--bg': JADE_PRE_FIX.bg, '--accent-ring': 'hsl(140, 50%, 45%)' });
    expect(el.style.getPropertyValue('--accent-ring')).toBe('hsl(140, 50%, 45%)');
    expect(warn).not.toHaveBeenCalled();
  });

  it('warns the SAME law for a hostile localStorage cache replay (readCachedTheme path)', () => {
    // applyThemeTokens is the shared choke point for the boot-cache path too
    // (useTheme feeds readCachedTheme().tokens through it); the law lives in
    // the loop, so the replay path is covered by construction. Pinned:
    applyThemeTokens(el, sanitizeThemeTokens({
      '--bg': JADE_PRE_FIX.bg,
      '--accent-ring': JADE_PRE_FIX.ring,
    }));
    expect(el.style.getPropertyValue('--accent-ring')).toBe('');
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
