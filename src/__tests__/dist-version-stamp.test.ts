/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * M-UI-23 — the version stamp must exist PHYSICALLY in the shipped bundles,
 * not just in src. This repo's failure class is a vendored copy drifting from
 * its claimed tag; a stamp that silently fell out of the emit (a define typo,
 * a tree-shake accident, a chunking change moving the literal off the searched
 * file) would restore exactly that blindness. `dist:` is committed, so these
 * reads run in the same test job that builds nothing — they verify the bytes
 * consumers vendor.
 *
 * ⚠ Path-via-variable law (M-UI-18 lesson): a literal
 * `new URL('dist/...', import.meta.url)` is rewritten by Vite into a dev-server
 * http: URL and readFileSync throws; every path here goes through resolve().
 */
const root = resolve(__dirname, '../..');
const distDir = resolve(root, 'dist');
const version = (JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as { version: string })
    .version;

function distJsFiles(dir: string): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
            out.push(...distJsFiles(full));
        } else if (entry.endsWith('.js')) {
            out.push(full);
        }
    }
    return out;
}

const jsFiles = distJsFiles(distDir);
const jsBlobs = new Map(jsFiles.map((f) => [f, readFileSync(f, 'utf8')]));

describe('dist carries the build version stamp (M-UI-23)', () => {
    it('the package.json version appears as a string literal somewhere in the shipped JS', () => {
        const needle = JSON.stringify(version); // e.g. "0.99.11" WITH quotes
        const hit = jsFiles.some((f) => jsBlobs.get(f)!.includes(needle));
        expect(hit, `no ${needle} literal found across ${jsFiles.length} dist/*.js files`).toBe(true);
    });

    it('the window stamp property survives minification in the main entry graph', () => {
        // Property names are never mangled, but the whole boot call could be
        // shaken away — if `createPhlixApp` ever stops referencing the stamp,
        // this fails and the field-observability promise must be re-earned.
        const hit = jsFiles.some((f) => jsBlobs.get(f)!.includes('__PHLIX_UI_VERSION__'));
        expect(hit).toBe(true);
    });

    it('dist/player.js (the second vendored entry) carries the stamp too', () => {
        const player = readFileSync(resolve(distDir, 'player.js'), 'utf8');
        expect(player).toContain(JSON.stringify(version));
    });
});
