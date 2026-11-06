/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * CU-081 (docmaint/newcomer/pm/writer, four reviewers' #1) — the README told
 * consumers `v0.99.15` while the package shipped 0.99.22: the status stamp,
 * the copy-pasteable install pin, and the equality-pin era parenthetical had
 * all drifted. That install snippet is THE first command a new consumer runs;
 * a stale pin there silently vendors an old bundle (the exact drift class this
 * repo's whole pin-economy exists to prevent).
 *
 * Four reviewers independently filed it because there was no tripwire: the
 * prose lived outside every gate. This test is the tripwire — each of the
 * three stamps must equal package.json.version, extracted by a regex that
 * FAILS LOUDLY (no match) if a future edit reshapes or removes a stamp rather
 * than letting a silent vanish pass.
 *
 * Path-via-variable law (M-UI-18 lesson): a literal
 * `new URL('<file>', import.meta.url)` is rewritten by Vite into a dev-server
 * http: URL and readFileSync throws; every path here goes through resolve().
 */
const root = resolve(__dirname, '../..');
const readme = readFileSync(resolve(root, 'README.md'), 'utf8');
const version = (JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as { version: string })
    .version;

describe('README version stamps equal package.json (CU-081)', () => {
    it('the Status stamp carries the shipped version', () => {
        const stamp = readme.match(/\*\*Status:\*\* `v([^`]+)`/);
        expect(stamp, 'no **Status:** `v…` stamp found in README.md').not.toBeNull();
        expect(stamp![1], `Status stamp is v${stamp![1]}, package.json is ${version}`).toBe(version);
    });

    it('the install snippet pins the shipped tag', () => {
        const pin = readme.match(/github:detain\/phlix-ui#v([0-9][^"`\s]*)/);
        expect(pin, 'no github:detain/phlix-ui#v… install pin found in README.md').not.toBeNull();
        expect(pin![1], `install pin is #v${pin![1]}, package.json is ${version}`).toBe(version);
    });

    it('the equality-pin parenthetical names the current era', () => {
        // The sentence records WHEN bundle↔installed equality pinning began
        // (v0.99.5 era — historical, stays) and what era we are IN now — the
        // second one rotates every release.
        const era = readme.match(/\(now `v([0-9][^`]*)`-era\)/);
        expect(era, 'no "(now `v…`-era)" parenthetical found in README.md').not.toBeNull();
        expect(era![1], `era parenthetical is v${era![1]}, package.json is ${version}`).toBe(version);
    });

    it('anti-vacuous: the README actually contains each stamp shape once', () => {
        // Two regex above are anchored on unique prose shapes; if a refactor
        // duplicates a stamp (e.g. a second Status block), a drift in either
        // copy must stay visible.
        const statusHits = readme.match(/\*\*Status:\*\* `v/g) ?? [];
        expect(statusHits.length).toBe(1);
        const pinHits = readme.match(/github:detain\/phlix-ui#v/g) ?? [];
        expect(pinHits.length).toBe(1);
    });
});
