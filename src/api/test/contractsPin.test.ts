/**
 * S447 — `@phlix/contracts` dependency-pin guard.
 *
 * The estate ruling retires the stale nested/`v0.4.5` copy: ui's own
 * `package.json` must pin the contracts tag `#v0.5.0` (a TAG pin, never a bare
 * commit sha), and `package-lock.json` must resolve `@phlix/contracts` to the
 * commit that tag peels to — pinned below as `PINNED_CONTRACTS_PEEL`, the single
 * source of that literal — with EXACTLY ONE such resolution in the whole tree.
 * A second (nested) copy, a sha-pinned dependency string, or a
 * re-pinned stale peel all red here before a consumer can read old types.
 *
 * The vendored server route-manifest and its md5 are deliberately NOT asserted
 * here: those bytes track the cs-cascade, not this npm pin (see the plan ruling).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const S447_GUARD_TOKEN = 'S447CONTRACTSPINX8B4';

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..');
const lockfile = JSON.parse(readFileSync(path.join(REPO_ROOT, 'package-lock.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8'));

const CONTRACTS = '@phlix/contracts';
// The commit the `v0.5.0` annotated tag peels to (verified against the contracts
// repo read-only at dispatch time — this is the integrity anchor, not a hand-edit).
// SKEW NOTE: the v0.5.0 tag tree's package.json `version` FIELD still reads
// `0.4.7` (deliberate estate precedent, mirroring ui's own v0.99.5 tag; the tag
// NAME is the release identity). `npm ci` therefore records `"version": "0.4.7"`
// on the lock entry — this guard anchors the TAG pin and the tag PEEL sha in
// `resolved`, never the version field, so the skew cannot desync this test.
const PINNED_CONTRACTS_PEEL = '8ef65d30be42623765c29ced34fc86d8ab3c51b5';

// S491 survival token — the peel-cite/identifier honesty pass on this guard; used at RUNTIME below.
const S491_PEEL_TOKEN = 'S491UIPEELFIXX9R6';

// A lockfile package location is `node_modules/<name>` or, for a nested copy,
// `<…>/node_modules/<name>`; a scoped name spans two path segments, so match the
// trailing `/@phlix/contracts` rather than the basename (which is only `contracts`).
const contractResolutions = Object.entries<{ resolved?: string; version?: string }>(
    lockfile.packages,
).filter(
    ([location]) =>
        location === `node_modules/${CONTRACTS}` ||
        location.endsWith(`/node_modules/${CONTRACTS}`),
);

describe(`@phlix/contracts pin guard [${S447_GUARD_TOKEN}] [${S491_PEEL_TOKEN}]`, () => {
    it('declares the dependency as a v0.5.0 TAG pin (not a commit sha)', () => {
        const declared = packageJson.dependencies[CONTRACTS] as string;
        expect(declared).toMatch(/github:detain\/phlix-contracts#v0\.5\.0$/);
    });

    it('resolves @phlix/contracts exactly once — no stale nested copy', () => {
        expect(contractResolutions).toHaveLength(1);
    });

    it('resolves the single copy to the v0.5.0 tag peel', () => {
        const [, entry] = contractResolutions[0] ?? [];
        if (!entry?.resolved) {
            throw new Error('S447: @phlix/contracts lock entry has no resolved ref');
        }
        expect(entry.resolved.endsWith(`#${PINNED_CONTRACTS_PEEL}`)).toBe(true);
    });
});
