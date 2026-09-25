/**
 * S447 — `@phlix/contracts` dependency-pin guard.
 *
 * The estate ruling retires the stale nested/`v0.4.5` copy: ui's own
 * `package.json` must pin the contracts tag `#v0.5.2` (a TAG pin, never a bare
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
// The commit the `v0.5.2` annotated tag peels to (verified against the contracts
// repo read-only at dispatch time — this is the integrity anchor, not a hand-edit).
// SKEW LINEAGE NOTE (skew ENDED at v0.5.2): the estate release-identity precedent
// kept contracts' package.json `version` FIELD frozen at `0.4.7` through both the
// v0.5.0 and v0.5.1 tag trees (the tag NAME is the release identity; ui mirrored
// this with its own v0.99.5 tag), so `npm ci` recorded `"version": "0.4.7"` on the
// lock entry under those pins and the #421-era guard deliberately anchored only the
// TAG pin and the tag PEEL sha in `resolved`, never the version field. The v0.5.2
// release finally advanced the field to `0.5.2` — field/tag alignment — so the lock
// entry now honestly reads `0.5.2` and the version-equality assertion below holds.
// It is safe ONLY in this aligned era: if a future contracts tag re-skews its field,
// relax that assertion again — the tag-pin and peel anchors above never depend on it.
const PINNED_CONTRACTS_PEEL = '7afb6a9171c33c18a2303716516572a4dfc405d9';
const PINNED_CONTRACTS_VERSION = '0.5.2';

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
    it('declares the dependency as a v0.5.2 TAG pin (not a commit sha)', () => {
        const declared = packageJson.dependencies[CONTRACTS] as string;
        expect(declared).toMatch(/github:detain\/phlix-contracts#v0\.5\.2$/);
    });

    it('resolves @phlix/contracts exactly once — no stale nested copy', () => {
        expect(contractResolutions).toHaveLength(1);
    });

    it('resolves the single copy to the v0.5.2 tag peel', () => {
        const [, entry] = contractResolutions[0] ?? [];
        if (!entry?.resolved) {
            throw new Error('S447: @phlix/contracts lock entry has no resolved ref');
        }
        expect(entry.resolved.endsWith(`#${PINNED_CONTRACTS_PEEL}`)).toBe(true);
    });

    it('records the honest 0.5.2 version field on the lock entry (aligned since v0.5.2)', () => {
        const [, entry] = contractResolutions[0] ?? [];
        if (!entry?.version) {
            throw new Error('S447: @phlix/contracts lock entry has no version field');
        }
        // Equality-era assertion: the v0.5.2 tag tree's package.json version FIELD
        // reads `0.5.2`, matching the tag — no longer the 0.4.7 skew. See the
        // SKEW LINEAGE NOTE above before weakening this.
        expect(entry.version).toBe(PINNED_CONTRACTS_VERSION);
    });
});
