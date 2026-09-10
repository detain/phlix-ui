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
 * S459 — the anti-rollback layer for the sharded `test` job layout.
 *
 * S459 split the single 5.3-min `test` job into three: `static` (typecheck + lint,
 * unpinned by S176/S231), a 2-shard `test` matrix (every guard-pinned step stays
 * INSIDE `test:` on every leg), and a `coverage` job that merges the per-shard
 * Vitest blob reports and uploads the lcov to Codacy.
 *
 * The S176/S231 gate tests keep the pinned steps honest but say nothing about the
 * NEW shape, and the prototype review found a real hazard the old text pins are
 * silently sensitive to: the S231 vitest-step assertion locates the step by the
 * literal prefix `- run: npm run test:run`, so a named or `>-`-folded rewrite of
 * that step passes the gate VACUOUSLY. This file pins the shape that keeps those
 * pins non-vacuous, plus the shard/merge wiring, so a future "tidy-up" of the
 * workflow has to pass through here deliberately.
 *
 * ⚠ Same TEXT-not-YAML rationale as dist-build-gate.test.ts: the asserted strings
 * are the exact tokens a neutering edit must touch; a YAML parser dependency buys
 * nothing here.
 */
const root = resolve(__dirname, '../..');
const workflowPath = resolve(root, '.github/workflows/ui-ci.yml');

/** Lane token — single code home for the S459 shard-matrix change. */
export const S459_CI_SHARD_TOKEN = 'CS459VITESTSHARDX9V';

/** One job's block: from its two-space `  <name>:` key to the next top-level job key. */
function jobBlock(workflow: string, name: string): string {
    const start = workflow.indexOf(`\n  ${name}:`);
    expect(start, `ui-ci.yml must still define a \`${name}:\` job`).toBeGreaterThan(-1);
    const rest = workflow.slice(start + 1);
    const nextJob = rest.search(/\n {2}[a-z][a-z0-9_-]*:\n/);
    return nextJob === -1 ? rest : rest.slice(0, nextJob);
}

describe(`S459 ${S459_CI_SHARD_TOKEN} — ui-ci shard matrix wiring`, () => {
    const workflow = readFileSync(workflowPath, 'utf8');
    const testBlock = jobBlock(workflow, 'test');
    const staticBlock = jobBlock(workflow, 'static');
    const coverageBlock = jobBlock(workflow, 'coverage');

    it('runs the suite as a 2-shard matrix with fail-fast off', () => {
        expect(testBlock).toContain('shard: [1, 2]');
        expect(testBlock).toContain('fail-fast: false');
        expect(testBlock).toContain('--shard=${{ matrix.shard }}/2');
        expect(testBlock).toContain('name: test (shard ${{ matrix.shard }}/2)');
    });

    it('keeps the vitest step in the form the S231 gate can actually anchor on', () => {
        // Non-vacuity pin for theater-geometry-gate.test.ts: its vitest-step
        // assertion is `indexOf('- run: npm run test:run')`. A named step or a
        // `run: >-` fold returns -1, slice(-1) yields one stray character, and the
        // continue-on-error check silently stops checking anything.
        const anchor = testBlock.indexOf('- run: npm run test:run');
        expect(anchor, 'the vitest run must be an unnamed single-line `- run:` step').toBeGreaterThan(-1);
        const stepLine = testBlock.slice(anchor, testBlock.indexOf('\n', anchor));
        expect(stepLine).toContain('--coverage');
        expect(stepLine).toContain('--shard=');
        expect(stepLine).not.toMatch(/\|\| true|\|\| exit 0|continue-on-error/);
    });

    it('records a mergeable blob report on every shard leg', () => {
        expect(testBlock).toContain('--reporter=blob');
        expect(testBlock).toContain('--outputFile.blob=blob/shard-${{ matrix.shard }}.json');
        expect(testBlock).toContain('actions/upload-artifact@v4');
        expect(testBlock).toContain('name: coverage-blob-${{ matrix.shard }}');
    });

    it('keeps every S176/S231-pinned step inside `test:` on every leg', () => {
        // Duplicated on purpose: sharding is a rewrite of THIS job, so the new
        // layer re-asserts the old pins rather than trusting them to survive it.
        expect(testBlock).toContain('npx playwright install --with-deps chromium');
        expect(testBlock.indexOf('npm run build')).toBeLessThan(testBlock.indexOf('npm run dist:check'));
        expect(staticBlock).not.toContain('npm run dist:check');
        expect(staticBlock).not.toContain('playwright install');
    });

    it('moves typecheck + lint to a parallel static job', () => {
        expect(staticBlock).toContain('npm ci');
        expect(staticBlock).toContain('npm run typecheck');
        expect(staticBlock).toContain('npm run lint');
        expect(testBlock).not.toContain('npm run typecheck');
        expect(testBlock).not.toContain('npm run lint');
    });

    it('merges the shard blobs in a dedicated coverage job feeding Codacy', () => {
        expect(coverageBlock).toContain('needs: test');
        expect(coverageBlock).toContain('--merge-reports');
        expect(coverageBlock).toContain('merge-multiple: true');
        expect(coverageBlock).toContain('codacy/codacy-coverage-reporter-action');
        expect(coverageBlock).toContain('./coverage/lcov.info');
        // A Codacy outage must stay non-blocking (same rule as before S459).
        expect(coverageBlock).toContain('continue-on-error: true');
        // The upload lives in `coverage:` now — not silently in two shard legs.
        expect(testBlock).not.toContain('codacy');
    });

    it('keeps the shard blob output directory out of git', () => {
        // S459 review finding: `--outputFile.blob=blob/...` writes into an un-ignored
        // directory, and check-dist-clean fails on ANY untracked path — a dev running
        // the leg command verbatim would red their next local `npm run dist:check` on
        // `?? blob/shard-N.json`. CI is unaffected (dist:check runs before vitest).
        const gitignore = readFileSync(resolve(root, '.gitignore'), 'utf8');
        expect(gitignore).toMatch(/^blob\/$/m);
    });
});
