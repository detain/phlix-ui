/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * S232 — read the SHIPPED stylesheet, not the SFC source text.
 *
 * Why this exists: every CSS assertion S34 added was a regex over the raw `.vue`
 * text via `readFileSync`. That is blind to the entire build. Measured on
 * master @ `087755e5`: `Player.vue` and `PlayerPage.vue` both declared the
 * theater height fallback as a duplicate-property pair —
 *
 *     height: 100vh;      <- fallback for engines without `dvh`
 *     height: 100dvh;
 *
 * — which is correct, correctly ordered CSS, and three green vitest assertions
 * said so. But Vite 8 minifies CSS with **lightningcss**, which COLLAPSES
 * duplicate declarations: `dist/style.css` (and the served
 * `phlix-server/public/assets/app/…/index-*.css`) carried only
 * `height:100dvh;max-height:100dvh`, with `100vh` absent from both artifacts. On
 * an engine without `dvh` the theater rule released `aspect-ratio` and then
 * supplied no height at all — the opposite of the stated intent.
 *
 * The fallback is now expressed as `@supports not (height: 100dvh) { … }`, which
 * the minifier cannot erase, and it is asserted HERE against the built output so
 * a future minifier/target change that deletes it again turns a test red.
 *
 * `dist/` is committed and CI's `dist:check` fails any PR whose `src/` changed
 * without a rebuild (see `dist-build-gate.test.ts`), so reading it is reading the
 * bytes consumers actually install.
 */
const distDir = resolve(__dirname, '../../dist');

/**
 * The two built stylesheets this repo publishes.
 *
 * - `style.css` — the whole library (`@phlix/ui/style.css`), what phlix-server's
 *   and phlix-hub's `web-ui` load.
 * - `ui.css` — emitted by the separate `vite.player.config.ts` player build, so
 *   it carries `Player.vue`'s CSS but not `PlayerPage.vue`'s.
 */
export type BuiltStylesheet = 'style.css' | 'ui.css';

export function readBuiltCss(name: BuiltStylesheet): string {
    return readFileSync(resolve(distDir, name), 'utf8');
}

/**
 * Return the bodies of every `@supports <condition>` block in `css` whose text
 * contains `needle`.
 *
 * Brace-walks rather than regex-matches: a minified at-rule body contains nested
 * `{}` pairs, which a non-greedy regex truncates at the first inner `}` and a
 * greedy one runs past the end of the block.
 *
 * `condition` is matched against the MINIFIED spelling (lightningcss drops the
 * space after the colon, e.g. `not (height:100dvh)`), so pass it exactly as it
 * appears in the artifact.
 */
export function supportsBlockBodies(css: string, condition: string, needle: string): string[] {
    const found: string[] = [];
    const opener = `@supports ${condition}{`;
    let from = 0;
    for (;;) {
        const at = css.indexOf(opener, from);
        if (at === -1) break;
        const bodyStart = at + opener.length;
        let depth = 1;
        let i = bodyStart;
        while (i < css.length && depth > 0) {
            if (css[i] === '{') depth++;
            else if (css[i] === '}') depth--;
            i++;
        }
        const body = css.slice(bodyStart, i - 1);
        if (body.includes(needle)) found.push(body);
        from = i;
    }
    return found;
}

/**
 * S221/S222 — return the declaration bodies of every rule in `css` whose
 * selector list contains EXACTLY `selector` plus a `<style scoped>` attribute
 * (`.foo[data-v-1a2b3c4d]`), at any at-rule nesting depth.
 *
 * Why "exactly", and why this is not a substring search:
 *
 * - `.media-row` is a literal prefix of `.media-row__head`, so `includes()`
 *   answers questions about the wrong box. The selector must terminate at the
 *   scope attribute.
 * - `.media-row__rail[data-v-x]::-webkit-scrollbar` is a DIFFERENT rule from
 *   `.media-row__rail[data-v-x]`. Asking "does the rail declare containment"
 *   must not be answered by a scrollbar pseudo-element's body.
 * - lightningcss groups selectors (`.a[data-v-x],.b[data-v-x]{…}`) and nests
 *   rules inside `@media`/`@supports`, so both the comma list and the at-rule
 *   bodies have to be walked.
 *
 * Returns one entry per matching rule (a selector may legitimately be declared
 * more than once — e.g. a base rule plus a `@media` override), so a caller
 * asserting "this property appears NOWHERE on this selector" must check every
 * body, not just the first.
 */
export function scopedRuleBodies(css: string, selector: string): string[] {
    const scoped = new RegExp(`^${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\[data-v-[0-9a-f]+\\]$`);
    const found: string[] = [];

    const walk = (text: string): void => {
        let i = 0;
        let preludeStart = 0;
        while (i < text.length) {
            const ch = text[i];
            if (ch === '{') {
                const prelude = text.slice(preludeStart, i).trim();
                let depth = 1;
                let j = i + 1;
                while (j < text.length && depth > 0) {
                    if (text[j] === '{') depth++;
                    else if (text[j] === '}') depth--;
                    j++;
                }
                const body = text.slice(i + 1, j - 1);
                if (prelude.startsWith('@')) {
                    // Conditional group rule (@media/@supports/@layer): recurse.
                    walk(body);
                } else if (prelude.split(',').some((s) => scoped.test(s.trim()))) {
                    found.push(body);
                }
                i = j;
                preludeStart = i;
                continue;
            }
            if (ch === '}' || ch === ';') preludeStart = i + 1;
            i++;
        }
    };

    walk(css);
    return found;
}
