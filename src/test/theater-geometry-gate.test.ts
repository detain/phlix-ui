/**
 * S231 — the anti-neutering layer for the theater-geometry gate.
 *
 * `src/test/theater-geometry.browser.test.ts` is the only assertion in the repo that
 * can observe S34's third acceptance criterion ("theater mode fills the viewport"),
 * because the claim is about rendered layout and jsdom has none. Its value depends
 * entirely on WHERE it runs: the `visual` job is `workflow_dispatch`-only AND
 * `continue-on-error: true`, so an assertion parked there can never fail a PR — that
 * is precisely the defect S231 exists to close, and re-creating it would be silent.
 *
 * So this file pins the wiring the browser test cannot pin about itself:
 *   1. the browser test still exists and is executed by `vitest run` (not parked
 *      under `e2e/`, which `vite.config.ts` excludes from the vitest run);
 *   2. it is not skipped/todo'd — a skip counts as SUCCESS on every CI surface;
 *   3. the BLOCKING `test` job installs the browser it needs, with no
 *      `continue-on-error` / `if:` / `|| true` escape hatch on that step.
 *
 * ⚠ The `.skip` detector below strips comments before matching, because this
 * file's own prose (and the browser test's) discusses skipping — a detector that
 * fires on its own documentation is vacuous.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '../..');
const workflowPath = resolve(root, '.github/workflows/ui-ci.yml');
const browserTestPath = resolve(root, 'src/test/theater-geometry.browser.test.ts');
const harnessPath = resolve(root, 'src/dev/visual/theater.ts');

/** The `test:` job block only — so a match inside `visual:` cannot satisfy these. */
function testJobBlock(): string {
    const workflow = readFileSync(workflowPath, 'utf8');
    const start = workflow.indexOf('\n  test:');
    expect(start, 'ui-ci.yml must still define a `test:` job').toBeGreaterThan(-1);
    const rest = workflow.slice(start + 1);
    const nextJob = rest.search(/\n {2}[a-z][a-z0-9_-]*:\n/);
    return nextJob === -1 ? rest : rest.slice(0, nextJob);
}

/** Source with block and line comments removed, so prose cannot satisfy a match. */
function stripComments(src: string): string {
    return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

describe('S231 theater-geometry gate — the measurement exists and runs', () => {
    it('keeps the browser measurement test in the vitest tree', () => {
        expect(existsSync(browserTestPath), 'src/test/theater-geometry.browser.test.ts must exist').toBe(true);
        expect(existsSync(harnessPath), 'its harness src/dev/visual/theater.ts must exist').toBe(true);
    });

    it('keeps it OUT of e2e/, which vitest excludes from the run', () => {
        // vite.config.ts: `exclude: [...configDefaults.exclude, 'e2e/**']`. A geometry
        // spec moved under e2e/ would stop running in the blocking job entirely while
        // still looking like a committed test.
        const config = readFileSync(resolve(root, 'vite.config.ts'), 'utf8');
        expect(config).toContain("'e2e/**'");
        expect(existsSync(resolve(root, 'e2e/theater-geometry.browser.test.ts'))).toBe(false);
    });

    it('does not skip or todo any of its assertions', () => {
        const code = stripComments(readFileSync(browserTestPath, 'utf8'));
        expect(code).not.toMatch(/\b(?:it|test|describe)\s*\.\s*(?:skip|todo|skipIf|runIf)\b/);
        // Non-vacuity: the detector must be looking at a file that really does
        // contain live `it(...)` blocks.
        const liveTests = code.match(/\bit\s*\(/g) ?? [];
        expect(liveTests.length, 'the browser test must still contain live it() blocks').toBeGreaterThanOrEqual(4);
    });

    it('measures against the viewport rather than only asserting class names', () => {
        // The whole point of S231 is a NUMERIC dimension check. A future edit that
        // reduces this file to jsdom-grade class assertions would reproduce the
        // blindness, so require the layout-box call to still be there.
        const code = stripComments(readFileSync(browserTestPath, 'utf8'));
        expect(code).toContain('boundingBox()');
        expect(code).toContain('window.innerHeight');
    });
});

describe('S231 theater-geometry gate — it runs in the BLOCKING job', () => {
    it('installs the browser inside the `test` job, not only the manual `visual` job', () => {
        expect(testJobBlock()).toContain('npx playwright install --with-deps chromium');
    });

    it('installs it BEFORE the vitest run, or the measurement could never launch', () => {
        const job = testJobBlock();
        const installAt = job.indexOf('npx playwright install --with-deps chromium');
        const testAt = job.indexOf('npm run test:run');
        expect(installAt, 'the chromium install step must still exist in the test job').toBeGreaterThan(-1);
        expect(testAt, '`npm run test:run` must still run in the test job').toBeGreaterThan(-1);
        expect(installAt).toBeLessThan(testAt);
    });

    it('keeps the install step able to fail the job', () => {
        const job = testJobBlock();
        const stepStart = job.indexOf('- name: Install chromium for the in-suite browser test');
        expect(stepStart, 'the chromium install step must keep its name').toBeGreaterThan(-1);
        const step = job.slice(stepStart, stepStart + 200);
        expect(step).not.toContain('continue-on-error');
        expect(step).not.toContain('|| true');
        expect(step).not.toContain('|| exit 0');
        expect(step).not.toContain('if:');
    });

    it('keeps the `test` job itself running on pull requests', () => {
        // The gate is only worth anything if the job carrying it is triggered by a PR.
        const workflow = readFileSync(workflowPath, 'utf8');
        expect(workflow).toContain('pull_request:');
        // …and the job must not have acquired a workflow_dispatch-only guard like
        // the `visual` job's.
        expect(testJobBlock()).not.toContain("github.event_name == 'workflow_dispatch'");
        // NOTE: deliberately NOT asserting the job is free of `continue-on-error` —
        // the Codacy upload step legitimately carries it (an outage must not turn CI
        // red). The scoped per-step assertions above are what matter.
        const vitestStep = testJobBlock().slice(testJobBlock().indexOf('- run: npm run test:run'));
        expect(vitestStep.slice(0, 120)).not.toContain('continue-on-error');
    });
});
