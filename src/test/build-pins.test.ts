/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { phlixUiVersion } from '../version';

/**
 * M-UI-22/M-UI-23 — the two build pins this repo deliberately froze:
 *
 * 1. `build.target: 'es2021'` in BOTH Vite configs. Without the pin, the
 *    committed bundle's syntax floor silently tracks Vite's rolling default
 *    (`baseline-widely-available`), and a Vite minor-bump moves the floor with
 *    zero diff in THIS repo — the S459 lesson on the build side. The pin must
 *    stay in both config files as literal text: a rewrite into a computed
 *    expression re-opens the drift hole the pin exists to close.
 * 2. The `__PHLIX_UI_VERSION__` define feeding src/version.ts from package.json.
 *
 * ⚠ Text-not-YAML doctrine (same rationale as ci-shard-gate.test.ts): the
 * asserted strings are the exact tokens a future edit must consciously touch.
 */
const root = resolve(__dirname, '../..');
const mainConfig = readFileSync(resolve(root, 'vite.config.ts'), 'utf8');
const playerConfig = readFileSync(resolve(root, 'vite.player.config.ts'), 'utf8');
const pkgVersion = (JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as { version: string })
    .version;

/** Lane token — single code home for the M-UI-22/23 build-pin change. */
export const MUI22_BUILD_PIN_TOKEN = 'MUI22BUILDPINSENT4Q';

describe('build.target pin (M-UI-22)', () => {
    it('is pinned to es2021 by literal text in BOTH configs, exactly once each', () => {
        // Byte-exact: quotes + trailing comma. An unquoted/hoisted variant
        // would not be this statement, and the config comment promises exactly
        // this shape to src/test consumers reading the guard.
        expect(mainConfig.split("target: 'es2021',").length - 1).toBe(1);
        expect(playerConfig.split("target: 'es2021',").length - 1).toBe(1);
    });
});

describe('version stamp (M-UI-23)', () => {
    it('is defined from package.json in BOTH configs', () => {
        expect(mainConfig).toContain('__PHLIX_UI_VERSION__: JSON.stringify(PHLIX_UI_PKG_VERSION),');
        expect(playerConfig).toContain('__PHLIX_UI_VERSION__: JSON.stringify(PHLIX_UI_PKG_VERSION),');
    });

    it('resolves to the exact package.json version under the vitest build (define is live here)', () => {
        // vitest shares vite.config.ts, so this exercises the same substitution
        // mechanism the shipped bundle gets.
        expect(phlixUiVersion).toBe(pkgVersion);
    });
});
