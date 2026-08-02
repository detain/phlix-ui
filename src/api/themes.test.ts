/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/// <reference types="node" />
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { fetchThemes } from './themes';
import { activeThemeStyle, resolveThemeBase, resolveThemeTokens } from '../composables/themeTokens';

/**
 * The GOLDEN body — the exact `GET /api/v1/themes` response phlix-server emits
 * with the shipped sample theme plugin enabled.
 *
 * This file is committed BYTE-IDENTICALLY in both repositories:
 *   phlix-ui/src/test/fixtures/themes-with-sample-plugin.golden.json   (here)
 *   phlix-server/tests/Fixtures/Theming/themes-with-sample-plugin.golden.json
 *
 * phlix-server's `SampleThemePluginTest` asserts the SAME md5 and that its real
 * `ThemesController` produces this body. So the two assertions together are a
 * cross-repo contract: this suite cannot pass against a shape the server does
 * not emit, and that suite cannot pass against a shape this SPA was not written
 * for. Changing the sample plugin fails LOUDLY on both sides.
 */
const here = dirname(fileURLToPath(import.meta.url));
const GOLDEN_PATH = join(here, '../test/fixtures/themes-with-sample-plugin.golden.json');
const goldenText = readFileSync(GOLDEN_PATH, 'utf8');
const GOLDEN_MD5 = '84656d05d42b6d11a92ac88e2b2a8791';

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/** Stub `fetch` with the parsed golden body. */
function stubGolden(): ReturnType<typeof vi.fn> {
  const f = vi.fn().mockResolvedValue(jsonResponse(JSON.parse(goldenText)));
  vi.stubGlobal('fetch', f);
  return f;
}

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('the golden body is the cross-repo contract', () => {
  it('has the md5 phlix-server\'s SampleThemePluginTest asserts', () => {
    expect(createHash('md5').update(goldenText).digest('hex')).toBe(GOLDEN_MD5);
  });

  it('carries the three built-ins first, then the two sample-plugin themes', () => {
    const parsed = JSON.parse(goldenText) as { themes: { id: string; builtIn: boolean; source: string | null }[] };
    expect(parsed.themes.map((t) => t.id))
      .toEqual(['nocturne', 'daylight', 'midnight', 'sample-dusk', 'sample-dusk-high-contrast']);
    expect(parsed.themes.map((t) => t.builtIn)).toEqual([true, true, true, false, false]);
    expect(parsed.themes.map((t) => t.source))
      .toEqual([null, null, null, 'sample-theme', 'sample-theme']);
  });
});

describe('fetchThemes', () => {
  it('calls GET /api/v1/themes on the supplied base', async () => {
    const f = stubGolden();
    await fetchThemes('https://media.example');
    expect(f).toHaveBeenCalledTimes(1);
    expect(String(f.mock.calls[0][0])).toBe('https://media.example/api/v1/themes');
  });

  it('normalises every entry of the real server body', async () => {
    stubGolden();
    const themes = await fetchThemes('');
    expect(themes.map((t) => t.id))
      .toEqual(['nocturne', 'daylight', 'midnight', 'sample-dusk', 'sample-dusk-high-contrast']);
    expect(themes.map((t) => t.builtIn)).toEqual([true, true, true, false, false]);
    expect(themes[3]).toMatchObject({
      id: 'sample-dusk', name: 'Sample Dusk', dark: true, extends: 'midnight', source: 'sample-theme',
    });
  });

  it('keeps every token the shipped sample plugin declares (nothing is dropped)', async () => {
    stubGolden();
    const themes = await fetchThemes('');
    const raw = (JSON.parse(goldenText) as { themes: { id: string; tokens: Record<string, string> }[] }).themes;

    for (const theme of themes) {
      const sent = raw.find((r) => r.id === theme.id)!;
      // Every id in the golden survives normalisation with its full token map:
      // if the SPA's allowlist/grammar ever diverged from the server's, some
      // token would silently vanish here.
      expect(Object.keys(theme.tokens)).toEqual(Object.keys(sent.tokens));
    }
    expect(themes.find((t) => t.id === 'sample-dusk')!.tokens['--bg']).toBe('#05060a');
  });

  it('DROPS a malformed entry rather than losing the whole picker', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({
      themes: [
        { id: 'good-theme', name: 'Good', dark: true, extends: null, tokens: { '--bg': '#000' }, source: 's', builtIn: false },
        { id: 'BAD ID', name: 'Bad', dark: true, extends: null, tokens: {}, source: 's', builtIn: false },
        'not-an-object',
      ],
    })));
    const themes = await fetchThemes('');
    expect(themes.map((t) => t.id)).toEqual(['good-theme']);
  });

  it('returns [] when the body has no themes array', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ themes: 'nope' })));
    expect(await fetchThemes('')).toEqual([]);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({})));
    expect(await fetchThemes('')).toEqual([]);
  });

  it('PROPAGATES a transport/auth failure instead of swallowing it', async () => {
    // The endpoint is inside the auth group; a signed-out fetch 401s. The store
    // records that — the api layer must not hide it.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ error: 'Unauthorized' }, 401)));
    await expect(fetchThemes('')).rejects.toBeTruthy();
  });
});

describe('end-to-end: the shipped sample plugin renders through the SPA pipeline', () => {
  it('layers sample-dusk over the midnight BUILT-IN, with no built-in tokens flattened in', async () => {
    stubGolden();
    const themes = await fetchThemes('');
    const style = activeThemeStyle('sample-dusk', themes);

    expect(style).not.toBeNull();
    expect(style!.base).toBe('midnight');
    // Exactly the plugin's own 37 tokens — NOT midnight's 53. The base is
    // applied through `data-theme`, so the stylesheet (not the server's
    // transcription of it) supplies everything the plugin left alone.
    expect(Object.keys(style!.tokens)).toHaveLength(37);
    expect(style!.tokens['--bg']).toBe('#05060a');
    // The status colours the sample deliberately does NOT set must be absent,
    // so they fall through the cascade to the midnight block.
    for (const inherited of ['--error', '--success', '--warning', '--info']) {
      expect(style!.tokens[inherited]).toBeUndefined();
      // ...and the server really did offer a value for them on the base:
      expect(themes.find((t) => t.id === 'midnight')!.tokens[inherited]).toBeTruthy();
    }
  });

  it('resolves the plugin-extends-PLUGIN chain from the LIST response alone', async () => {
    stubGolden();
    const themes = await fetchThemes('');
    const style = activeThemeStyle('sample-dusk-high-contrast', themes);

    expect(style!.base).toBe('midnight'); // two hops away
    // The variant declares only 8 ink/border tokens and no background. That it
    // has one at all is proof the chain was flattened client-side — this is the
    // exact case `GET /api/v1/themes/{id}` could not answer on its own.
    const variantOwn = (JSON.parse(goldenText) as { themes: { id: string; tokens: Record<string, string> }[] })
      .themes.find((t) => t.id === 'sample-dusk-high-contrast')!.tokens;
    expect(Object.keys(variantOwn)).toHaveLength(8);
    expect(variantOwn['--bg']).toBeUndefined();

    expect(style!.tokens['--bg']).toBe('#05060a'); // inherited from sample-dusk
    expect(style!.tokens['--text']).toBe('#ffffff'); // the variant's own override wins
    expect(Object.keys(style!.tokens)).toHaveLength(37); // 37 base + 8 overrides, 8 overlapping
  });

  it('leaves every BUILT-IN with nothing to apply', async () => {
    stubGolden();
    const themes = await fetchThemes('');
    for (const id of ['nocturne', 'daylight', 'midnight']) {
      expect(activeThemeStyle(id, themes)).toBeNull();
      expect(resolveThemeBase(id, themes)).toBe(id);
      expect(resolveThemeTokens(id, themes)).toEqual({});
    }
  });
});
