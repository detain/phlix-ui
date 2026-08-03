/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

/**
 * S176 — the anti-neutering layer for the committed-`dist/` gate.
 *
 * Why this file exists: the gate itself lives in CI
 * (`.github/workflows/ui-ci.yml` → `npm run dist:check`), and a CI step is
 * trivially removable by the same PR it would have blocked. Nothing in the repo
 * would notice. This estate has already been bitten by a runtime guard that sat
 * **one deletable line** away from passing silently with exit 0, so the gate is
 * deliberately two-layered:
 *
 *   layer 1 — `scripts/check-dist-clean.mjs` fails closed. It refuses to exit 0
 *             unless `dist/` is tracked AND not gitignored AND every published
 *             entry point exists AND all five of its REQUIRED_CHECKS recorded
 *             that they ran.
 *   layer 2 — this test file, which fails if layer 1 is unwired, skipped,
 *             softened with `continue-on-error`/`|| true`, or hollowed out.
 *
 * The stakes: `@phlix/ui` ships by GitHub tag with `files: ["dist"]` and no
 * `prepare` script, so npm never builds on install and consumers install exactly
 * the committed `dist/`. On master @ 2b636e71 that output was 55 `git status`
 * entries behind its own source, and the drift included `dist/index.d.ts` — the
 * public type contract. Four in-estate consumers pin by tag.
 *
 * ⚠ These assertions read the workflow as TEXT rather than parsed YAML on
 * purpose: adding a YAML parser dependency to assert on CI wiring is a worse
 * trade than a handful of literal matches, and the strings asserted here
 * (`npm run dist:check`, `continue-on-error`) are the exact tokens a neutering
 * edit would have to touch.
 */
const root = resolve(__dirname, '../..');
const workflowPath = resolve(root, '.github/workflows/ui-ci.yml');
const scriptPath = resolve(root, 'scripts/check-dist-clean.mjs');

/** The `test:` job block only — so a match inside `visual:` cannot satisfy these. */
function testJobBlock(): string {
    const workflow = readFileSync(workflowPath, 'utf8');
    const start = workflow.indexOf('\n  test:');
    expect(start, 'ui-ci.yml must still define a `test:` job').toBeGreaterThan(-1);
    // The next top-level job key (two-space indent, not a step's `- `).
    const rest = workflow.slice(start + 1);
    const nextJob = rest.search(/\n {2}[a-z][a-z0-9_-]*:\n/);
    return nextJob === -1 ? rest : rest.slice(0, nextJob);
}

describe('S176 dist build gate — wiring', () => {
    it('runs the dist check in the deterministic `test` job', () => {
        expect(testJobBlock()).toContain('npm run dist:check');
    });

    it('runs the dist check AFTER the build, so it observes the build output', () => {
        const job = testJobBlock();
        const buildAt = job.indexOf('npm run build');
        const checkAt = job.indexOf('npm run dist:check');
        expect(buildAt, '`npm run build` must still run in the test job').toBeGreaterThan(-1);
        expect(checkAt, '`npm run dist:check` must still run in the test job').toBeGreaterThan(-1);
        // A check that runs BEFORE the build inspects the pristine checkout and
        // is guaranteed to pass — green, and completely vacuous.
        expect(checkAt).toBeGreaterThan(buildAt);
    });

    it('keeps the dist check able to fail the job', () => {
        const job = testJobBlock();
        // Scoped to the dist-check STEP, not the whole job: the Codacy upload
        // step legitimately carries `continue-on-error: true` (a Codacy outage
        // must not turn CI red), so a job-wide assertion would false-red.
        const stepStart = job.indexOf('- name: Verify committed dist/ matches source');
        expect(stepStart, 'the dist check step must keep its name').toBeGreaterThan(-1);
        const step = job.slice(stepStart, stepStart + 200);
        expect(step).not.toContain('continue-on-error');
        expect(step).not.toContain('|| true');
        expect(step).not.toContain('|| exit 0');
        expect(step).not.toContain('if:');
    });

    it('exposes the check as an npm script pointing at the real gate', () => {
        const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
        expect(pkg.scripts['dist:check']).toBe('node scripts/check-dist-clean.mjs');
        expect(existsSync(scriptPath), 'scripts/check-dist-clean.mjs must exist').toBe(true);
    });

    it('still publishes the committed dist/, which is what makes the gate load-bearing', () => {
        const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
        expect(pkg.files).toContain('dist');
    });
});

describe('S176 dist build gate — cannot be hollowed out', () => {
    it('keeps all five fail-closed checks, each actually invoked', () => {
        const script = readFileSync(scriptPath, 'utf8');
        const required = ['git-available', 'dist-tracked', 'dist-not-ignored', 'published-entrypoints', 'worktree-clean'];
        for (const name of required) {
            // Declared in REQUIRED_CHECKS *and* recorded by a live ran() call.
            expect(script, `REQUIRED_CHECKS must still list ${name}`).toContain(`'${name}'`);
            expect(script, `${name} must still call ran('${name}')`).toContain(`ran('${name}')`);
        }
        // The accounting assertion is what makes a deleted ran() call fatal.
        expect(script).toContain('REQUIRED_CHECKS.filter((c) => !completed.has(c))');
    });

    it('keeps the comparison at whole-tree scope and not narrowed to a subset', () => {
        const script = readFileSync(scriptPath, 'utf8');
        // A detector narrower than its own rule ("the working tree is clean
        // after a build") fakes a zero. `-uall` matters too: the default
        // collapses a wholly-new directory into one entry.
        expect(script).toContain("git(['status', '--porcelain', '--untracked-files=all'])");
    });

    it('still detects the gitignore neutering vector', () => {
        // `.gitignore` ships a commented-out `# dist/`. Uncommenting it makes
        // `git status -- dist` return EMPTY, so a naive gate would pass green
        // forever while shipping stale output. The script must check for it.
        const script = readFileSync(scriptPath, 'utf8');
        // `--no-index` is load-bearing: without it `check-ignore` will not report
        // a TRACKED path as ignored, so the check would answer "not ignored" even
        // with `dist/` in .gitignore and do nothing at all. Asserted explicitly
        // so the flag cannot be "tidied away".
        expect(script).toContain("git(['check-ignore', '--no-index', '-q', 'dist'])");

        // And the vector must not be live right now.
        const gitignore = readFileSync(resolve(root, '.gitignore'), 'utf8');
        const ignoresDist = gitignore
            .split('\n')
            .map((l) => l.trim())
            .some((l) => l === 'dist' || l === 'dist/' || l === '/dist' || l === '/dist/');
        expect(ignoresDist, 'dist/ must stay tracked — an uncommented `dist/` in .gitignore neuters the gate').toBe(
            false,
        );
    });

    it('keeps dist/ tracked in git', () => {
        // Independent of .gitignore: `git rm -r --cached dist` would also make
        // the gate blind while leaving .gitignore untouched. Ask git directly.
        const tracked = execFileSync('git', ['ls-files', 'dist'], { cwd: root, encoding: 'utf8' })
            .split('\n')
            .filter(Boolean);
        expect(tracked.length, 'dist/ must be tracked or the gate can never observe drift').toBeGreaterThan(0);
        expect(tracked, 'the published type contract must be tracked').toContain('dist/index.d.ts');
    });
});
