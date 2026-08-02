/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * themeTokens (S86) — the CLIENT half of the plugin-theme contract.
 *
 * The server (S84/S85) validates every theme it serves, but this module never
 * assumes that. Two of its three inputs are attacker-reachable without touching
 * the server at all:
 *
 *   1. `GET /api/v1/themes` — trusted only as far as the server is trusted; a
 *      compromised or downgraded server, or a relay/hub proxy in the middle,
 *      can put anything in the body.
 *   2. `localStorage` — the boot cache below. Any XSS on the origin can rewrite
 *      it, and it is read BEFORE any network call on every subsequent load.
 *
 * So the key allowlist and the value grammar are re-applied here, at the DOM
 * boundary, on every path. {@link applyThemeTokens} re-checks each entry a
 * final time even though its callers already sanitised — that is deliberate
 * belt-and-braces at the single place a value becomes CSS.
 *
 * ## Why `setProperty` and not a `<style>` tag
 *
 * A plugin theme is applied with `el.style.setProperty()` (CSSOM), exactly like
 * {@link deriveAccentVars}'s accent override. CSP's `style-src` governs
 * `<style>` elements and markup `style=` attributes; programmatic CSSOM writes
 * are not subject to it. Injecting a `<style>` tag instead would force
 * `style-src 'unsafe-inline'` on every Phlix deployment — the exact relaxation
 * S84's threat model exists to avoid.
 */

/**
 * The three themes whose real values ship inside the SPA's own stylesheet
 * (`@phlix/tokens` `colors.css`, one `[data-theme=…]` block each). They are
 * applied by setting `data-theme` alone — they need no token map, no fetch and
 * no cache, which is why a signed-out or offline page still themes itself.
 *
 * Mirrors `Phlix\Theming\BuiltInThemes::IDS` /
 * `Phlix\Theming\ThemeTokenValidator::RESERVED_IDS` on the server.
 */
export const BUILT_IN_THEME_IDS = ['nocturne', 'daylight', 'midnight'] as const;

/** One of the three ids in {@link BUILT_IN_THEME_IDS}. */
export type BuiltInThemeId = (typeof BUILT_IN_THEME_IDS)[number];

/** Whether an id names a theme the shipped stylesheet already defines. */
export function isBuiltInThemeId(id: string): id is BuiltInThemeId {
  return (BUILT_IN_THEME_IDS as readonly string[]).includes(id);
}

/**
 * The closed set of CSS custom properties a server/plugin theme may set.
 *
 * Canonical source: the three `[data-theme=…]` blocks of
 * `@phlix/tokens/src/css/colors.css`. `themeTokens.allowlist.test.ts` parses
 * that stylesheet out of `node_modules` and asserts this array equals it
 * exactly, in declaration order — so this is a transcription that cannot drift
 * silently, not a hand-maintained guess. The server's
 * `Phlix\Theming\ThemeTokenAllowlist` is the same transcription of the same
 * file.
 *
 * Deliberately absent, and asserted absent by that test:
 *  - the theme-INVARIANT `--amber-*` ramp and `--accent-contrast`, which live in
 *    colors.css's standalone `:root` block (a plugin re-hues through the six
 *    semantic `--accent*` tokens instead);
 *  - every LAYOUT token (density / spacing / radius / shadow / motion), which
 *    live in sibling token files and are out of scope for S86 precisely so a
 *    plugin theme can colour the UI but never move it.
 */
export const THEME_TOKEN_ALLOWLIST = [
  // Accent ramp, expressed semantically.
  '--accent',
  '--accent-hover',
  '--accent-active',
  '--accent-soft',
  '--accent-ring',
  '--accent-text',
  // Page background + the elevation stack, including the two glass layers.
  '--bg',
  '--surface',
  '--surface-2',
  '--surface-3',
  '--surface-glass',
  '--surface-glass-strong',
  // Foreground text ramp + the ink used on an accent fill.
  '--text',
  '--text-muted',
  '--text-subtle',
  '--text-faint',
  '--text-on-accent',
  // Divider / outline ramp.
  '--border',
  '--border-subtle',
  '--border-strong',
  // Status colours and their tinted backgrounds.
  '--error',
  '--error-bg',
  '--success',
  '--success-bg',
  '--warning',
  '--warning-bg',
  '--info',
  '--info-bg',
  // Atmosphere hooks (`--grain-opacity` is a bare number).
  '--grain-opacity',
  '--vignette',
  '--ambient',
  // Legacy `--color-*` aliases, re-declared per theme block for un-migrated
  // components; a theme that omitted them would leave those components on the
  // previous theme's colours.
  '--color-bg',
  '--color-surface',
  '--color-surface-hover',
  '--color-surface-elevated',
  '--color-surface-active',
  '--color-text',
  '--color-text-secondary',
  '--color-text-muted',
  '--color-text-subtle',
  '--color-primary',
  '--color-primary-hover',
  '--color-primary-active',
  '--color-border',
  '--color-border-subtle',
  '--color-error',
  '--color-error-bg',
  '--color-success',
  '--color-success-bg',
  '--color-warning',
  '--color-warning-bg',
  '--color-info',
  '--color-info-bg',
] as const;

const ALLOWED_TOKENS: ReadonlySet<string> = new Set<string>(THEME_TOKEN_ALLOWLIST);

/**
 * Whether a custom-property name may be set by a server/plugin theme.
 *
 * Exact, case-SENSITIVE membership: CSS custom properties are case-sensitive,
 * so `--BG` is a different property from `--bg` and must never be folded into
 * it. Everything unknown is rejected by *not matching* — there is no substring
 * blocklist anywhere in this module.
 */
export function isAllowedThemeToken(name: string): boolean {
  return ALLOWED_TOKENS.has(name);
}

/** Longest accepted token value — mirrors `ThemeTokenValidator::MAX_VALUE_LENGTH`. */
const MAX_VALUE_LENGTH = 128;

/** `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`. */
const HEX_PATTERN = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

/** A bare number: `0`, `1`, `0.05`, `.5`, `-0.2` (used by `--grain-opacity`). */
const NUMBER_PATTERN = /^[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/;

/** One numeric argument of a colour function, optionally `%`- or `deg`-suffixed. */
const ARGUMENT = '[+-]?(?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)(?:%|deg)?';

/** `rgb()` / `rgba()` / `hsl()` / `hsla()` over 3–4 numeric arguments. */
const FUNCTION_PATTERN = new RegExp(
  `^(?:rgba?|hsla?)\\((?: *)${ARGUMENT}(?:(?: *)[,/](?: *)${ARGUMENT}){2,3}(?: *)\\)$`,
  'i',
);

/** Bare keywords accepted as a colour, compared lowercased. */
const KEYWORDS = ['transparent', 'currentcolor'];

/**
 * Whether a token VALUE is safe to hand to `setProperty`.
 *
 * A port of `Phlix\Theming\ThemeTokenValidator::isSafeValue()`: the value must
 * match ONE of four narrow grammars in full — hex colour, `rgb()/rgba()/hsl()/
 * hsla()` over numeric arguments only, a bare number, or `transparent` /
 * `currentColor`. Everything else — `url(…)` in any spelling, `expression()`,
 * `var()`, `attr()`, `image-set()`, `!important`, a `;` or `}`, an embedded
 * newline — is refused by simply having no production in the grammar. That is
 * the point of a grammar over a blocklist: the spellings nobody enumerated are
 * rejected too.
 *
 * Anchoring is what does the work. Both anchors are load-bearing: without `^`
 * or `$` a value like `#fff}body{background:url(…)` matches on a substring.
 * (JavaScript's `$`, unlike PCRE's, is a true end-of-input assertion outside
 * `m` mode, so no `\z` equivalent is needed — but the value is trimmed first
 * regardless, and interior spacing is a literal space, never `\s`, so an
 * accepted value can never carry a newline or tab.)
 */
export function isSafeThemeTokenValue(value: string): boolean {
  const trimmed = value.trim();

  if (trimmed === '' || trimmed.length > MAX_VALUE_LENGTH) return false;
  if (KEYWORDS.includes(trimmed.toLowerCase())) return true;

  return HEX_PATTERN.test(trimmed) || FUNCTION_PATTERN.test(trimmed) || NUMBER_PATTERN.test(trimmed);
}

/**
 * Keep only the entries that pass BOTH halves of the check, trimmed.
 *
 * Deliberately drop-invalid rather than reject-the-whole-theme (the server's
 * `ThemeSourceRegistry::register()` is all-or-nothing, and that asymmetry is
 * intentional): the server is the trust boundary that must REFUSE a bad theme,
 * whereas the client's job is to render safely. Dropping cannot produce an
 * unreadable half-theme, because a plugin theme is always applied on top of a
 * complete built-in base (`data-theme`) — a dropped token falls back to the
 * base theme's value through the cascade, never to nothing. Rejecting outright
 * would also mean an SPA one release behind a server that learned a new value
 * syntax would blank the whole theme instead of applying the parts it does
 * understand.
 */
export function sanitizeThemeTokens(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return out;

  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!isAllowedThemeToken(key)) continue;
    if (typeof value !== 'string' || !isSafeThemeTokenValue(value)) continue;
    out[key] = value.trim();
  }
  return out;
}

/** A theme as `GET /api/v1/themes` serves it, after normalisation. */
export interface ServerTheme {
  /** Stable lowercase slug. */
  id: string;
  /** Human-readable label rendered in the picker. */
  name: string;
  /** Whether the theme is dark (picks the fallback base when `extends` is null). */
  dark: boolean;
  /** Id of a base theme this one layers over, or null when standalone. */
  extends: string | null;
  /** The theme's OWN declared tokens — already allowlist- and grammar-checked. */
  tokens: Record<string, string>;
  /** Canonical plugin source name, or null for a host built-in. */
  source: string | null;
  /** True for `nocturne`/`daylight`/`midnight`, which need no token application. */
  builtIn: boolean;
}

/** Theme / base-theme identifier — mirrors `ThemeTokenValidator::ID_PATTERN`. */
const ID_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;

/** Longest accepted human-readable theme name — mirrors the server's cap. */
const MAX_NAME_LENGTH = 64;

/**
 * C0 controls + DEL. Written with escapes rather than a literal range so the
 * source file stays plain ASCII text (a literal NUL makes it a binary blob to
 * `grep`, `diff` and every review tool).
 */
// eslint-disable-next-line no-control-regex
const CONTROL_CHAR_PATTERN = new RegExp('[\\u0000-\\u001f\\u007f]');

/**
 * Narrow one entry of the `{"themes":[…]}` body into a {@link ServerTheme}, or
 * null when it is not one.
 *
 * Every field is re-checked rather than cast: an `id` that is not a slug would
 * end up in a `data-theme` attribute and in `localStorage`, and a `name` with
 * control characters would be rendered in the picker.
 */
export function normalizeServerTheme(raw: unknown): ServerTheme | null {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;

  const id = typeof r.id === 'string' ? r.id : '';
  if (!ID_PATTERN.test(id)) return null;

  const name = typeof r.name === 'string' ? r.name.trim() : '';
  // Control characters would be rendered verbatim in the picker label.
  if (name === '' || name.length > MAX_NAME_LENGTH || CONTROL_CHAR_PATTERN.test(name)) return null;

  const extendsId = typeof r.extends === 'string' && ID_PATTERN.test(r.extends) && r.extends !== id
    ? r.extends
    : null;

  return {
    id,
    name,
    dark: r.dark === true,
    extends: extendsId,
    tokens: sanitizeThemeTokens(r.tokens),
    source: typeof r.source === 'string' && r.source !== '' ? r.source : null,
    // `builtIn` is authoritative from the server, but an id in the reserved set
    // is a built-in whatever the flag says — the SPA ships those three itself.
    builtIn: r.builtIn === true || isBuiltInThemeId(id),
  };
}

/**
 * Hard ceiling on the `extends` chain walked by {@link resolveThemeTokens} —
 * mirrors `ThemeSourceRegistry::MAX_EXTENDS_DEPTH`.
 */
export const MAX_EXTENDS_DEPTH = 8;

/**
 * Walk a theme's `extends` chain, nearest-first, bounded and cycle-safe.
 *
 * Returns the NON-built-in chain from the requested theme outwards. The walk
 * stops on a revisit, at {@link MAX_EXTENDS_DEPTH}, at an id this server does
 * not serve — and, deliberately, **at a built-in**.
 *
 * ## Why a built-in ends the walk instead of contributing tokens
 *
 * `GET /api/v1/themes` DOES ship a 53-token map for each of the three built-ins
 * (`Phlix\Theming\BuiltInThemes`, a hand transcription of colors.css kept on the
 * server so non-CSS clients — Roku, console, Tizen — can use it). Merging that
 * map in here would be actively wrong for the SPA, which already has the real
 * stylesheet:
 *
 *  1. It would inline-`setProperty` all 53 base values on `<html>`, so the
 *     rendered page would follow the server's TRANSCRIPTION rather than the
 *     `colors.css` the rest of the bundle is built against. The two live in
 *     different repositories with no automated diff between them, so that turns
 *     a documented "stale value shows a wrong preview swatch" into "stale value
 *     renders the whole app wrong".
 *  2. It would defeat the cascade fallback a plugin theme relies on. `sample-dusk`
 *     deliberately sets no status colours precisely so `--error`/`--success`/…
 *     come from its base block; pre-flattening the base makes "inherited from
 *     the base" and "explicitly overridden" indistinguishable.
 *
 * The base is applied through `data-theme` instead — see {@link resolveThemeBase}.
 */
function extendsChain(id: string, themes: readonly ServerTheme[]): ServerTheme[] {
  const byId = new Map(themes.map((t) => [t.id, t]));
  const chain: ServerTheme[] = [];
  const visited = new Set<string>();
  let cursor: string | null = id;

  for (let depth = 0; depth < MAX_EXTENDS_DEPTH && cursor !== null; depth++) {
    if (visited.has(cursor)) break;
    // A built-in base ends the walk — its values come from the stylesheet.
    if (isBuiltInThemeId(cursor)) break;
    const theme: ServerTheme | undefined = byId.get(cursor);
    if (theme === undefined) break;
    visited.add(cursor);
    chain.push(theme);
    cursor = theme.extends;
  }
  return chain;
}

/**
 * A theme's tokens with its `extends` chain flattened underneath it — nearer
 * themes win.
 *
 * ## Why this runs CLIENT-side (the S85 carry-out, decided)
 *
 * S85 left open whether `/themes/{id}` should return server-FLATTENED tokens
 * via `ThemeSourceRegistry::resolveTokens()`. It should not, and this function
 * is why:
 *
 *  - The overwhelmingly common `extends` target is a BUILT-IN (`nocturne` /
 *    `daylight` / `midnight`), and `ThemeSourceRegistry::resolveTokens()` cannot
 *    flatten one: it walks the plugin REGISTRY, which by construction never
 *    contains a built-in (`ThemeTokenValidator` reserves those three ids against
 *    plugins), so its walk ends on an unresolvable id. Server-side flattening is
 *    therefore structurally incapable of making the detail endpoint
 *    self-sufficient for the common case.
 *  - Even where the server COULD supply a built-in's values —
 *    `BuiltInThemes` holds a hand transcription of colors.css for non-CSS
 *    clients — the SPA must not consume it, because that transcription lives in
 *    a different repository from the stylesheet the bundle actually renders
 *    with. The SPA resolves the base for free and without drift by pointing
 *    `data-theme` at it and letting the cascade supply everything the plugin did
 *    not override — see {@link resolveThemeBase} and {@link extendsChain}.
 *  - For a plugin-extends-plugin chain, the LIST response already contains
 *    every registered theme, so the client has everything it needs. The SPA
 *    therefore reads `GET /api/v1/themes` only and never `/themes/{id}`, which
 *    makes the "detail endpoint is not self-sufficient" carry-out moot rather
 *    than merely unaddressed.
 *  - Serving a second, derived token map alongside each theme's own would give
 *    clients two sources of truth for one theme.
 *
 * `resolveTokens()` therefore stays production-unconsumed on purpose. Removing
 * it is a separate change, exactly like the `ThemeRegistry` island.
 */
export function resolveThemeTokens(id: string, themes: readonly ServerTheme[]): Record<string, string> {
  let resolved: Record<string, string> = {};
  // Base-first, so nearer themes overwrite further ones.
  for (const theme of extendsChain(id, themes).reverse()) {
    resolved = { ...resolved, ...theme.tokens };
  }
  return resolved;
}

/**
 * Which built-in stylesheet block a theme should be layered on top of.
 *
 * The first built-in reachable along the `extends` chain wins, so
 * `sample-dusk-high-contrast → sample-dusk → midnight` lands on `midnight`.
 * Because {@link extendsChain} stops AT a built-in rather than emitting it, the
 * built-in is found by reading the last hop's `extends` rather than the chain
 * entry itself.
 *
 * A chain that names no built-in falls back on the requested theme's own `dark`
 * flag, so a standalone plugin theme still lands on a base of the right
 * polarity — and an id nothing serves (a theme uninstalled since it was chosen)
 * degrades to the SPA default rather than to an unstyled page.
 */
export function resolveThemeBase(id: string, themes: readonly ServerTheme[]): BuiltInThemeId {
  if (isBuiltInThemeId(id)) return id;

  const chain = extendsChain(id, themes);
  for (const theme of chain) {
    if (theme.extends !== null && isBuiltInThemeId(theme.extends)) return theme.extends;
  }
  return chain[0]?.dark === false ? 'daylight' : 'nocturne';
}

/**
 * Everything `<html>` needs to render a non-built-in theme, in the exact shape
 * cached in `localStorage` for the next boot.
 */
export interface ActiveThemeStyle {
  /** The chosen theme's id (what `prefs.theme` holds). */
  id: string;
  /** The built-in block to layer on top of, via `data-theme`. */
  base: BuiltInThemeId;
  /** Flattened, sanitised token map. */
  tokens: Record<string, string>;
}

/**
 * Build the applicable style for a chosen theme id, or null when the id is a
 * built-in (nothing to apply — `data-theme` alone does it) or unknown.
 */
export function activeThemeStyle(id: string, themes: readonly ServerTheme[]): ActiveThemeStyle | null {
  if (isBuiltInThemeId(id)) return null;
  const theme = themes.find((t) => t.id === id);
  if (theme === undefined) return null;

  return {
    id,
    base: resolveThemeBase(id, themes),
    tokens: resolveThemeTokens(id, themes),
  };
}

/**
 * Set a theme's tokens on an element via CSSOM.
 *
 * Re-checks both halves of every entry even though callers already sanitised.
 * This is the single place a plugin-supplied string becomes CSS, so it is the
 * one place worth being redundant: any future caller that forgets to sanitise
 * still cannot set a property outside {@link THEME_TOKEN_ALLOWLIST}.
 */
export function applyThemeTokens(el: HTMLElement, tokens: Record<string, string>): void {
  for (const [key, value] of Object.entries(tokens)) {
    if (!isAllowedThemeToken(key)) continue;
    if (!isSafeThemeTokenValue(value)) continue;
    el.style.setProperty(key, value);
  }
}

/**
 * Remove every allowlisted custom property from an element's inline style.
 *
 * Called before each (re)apply so switching from a plugin theme back to a
 * built-in — or between two plugin themes with different token sets — cannot
 * leave a stale override behind. Removing a property that was never set is a
 * CSSOM no-op, so this is safe on a `<html>` that only ever ran built-ins:
 * that is what keeps nocturne/daylight/midnight byte-for-byte unaffected.
 */
export function clearThemeTokens(el: HTMLElement): void {
  for (const key of THEME_TOKEN_ALLOWLIST) el.style.removeProperty(key);
}

/**
 * localStorage key holding the ACTIVE non-built-in theme's resolved style.
 *
 * Separate from `phlix.prefs` on purpose: it is a derived cache of server data,
 * not a user preference, and it must be readable (and clearable) without
 * parsing or rewriting the whole preferences blob.
 */
export const THEME_CACHE_KEY = 'phlix.theme.active';

/**
 * Read the cached active-theme style, re-validating it from scratch.
 *
 * This is the no-FOUC path: it runs synchronously, before mount, on every load,
 * so a plugin theme paints on the first frame instead of after an authenticated
 * round-trip. It is also the reason every check in this module is repeated on
 * read — `localStorage` is attacker-writable under XSS, so the cache is treated
 * as hostile input, never as something the server already vetted.
 *
 * Returns null (and the caller falls back to a built-in) on absent, unparseable,
 * malformed or non-built-in-base data.
 */
export function readCachedTheme(): ActiveThemeStyle | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(THEME_CACHE_KEY);
    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    const p = parsed as Record<string, unknown>;

    const id = typeof p.id === 'string' ? p.id : '';
    if (!ID_PATTERN.test(id) || isBuiltInThemeId(id)) return null;

    const base = typeof p.base === 'string' && isBuiltInThemeId(p.base) ? p.base : null;
    if (base === null) return null;

    return { id, base, tokens: sanitizeThemeTokens(p.tokens) };
  } catch {
    return null;
  }
}

/**
 * Persist (or clear, with null) the active-theme style for the next boot.
 *
 * Bounded by construction: exactly one entry, for the one active theme —
 * choosing a different theme overwrites it, choosing a built-in removes it.
 * Quota/private-mode failures are swallowed; the cost is a one-frame flash on
 * the next load, never a broken app.
 */
export function writeCachedTheme(style: ActiveThemeStyle | null): void {
  if (typeof localStorage === 'undefined') return;
  try {
    if (style === null) localStorage.removeItem(THEME_CACHE_KEY);
    else localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(style));
  } catch {
    /* quota / private mode — a cache miss next boot is the only consequence */
  }
}
