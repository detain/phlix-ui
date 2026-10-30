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
 * M-UI-27 — S440-style anti-neutering guard for the dependency-audit gate.
 *
 * phlix-ui is a supply-chain amplifier: its committed dist is vendored into
 * phlix-server, phlix-hub, tizen, windows, console and roku hosts. The estate
 * standard (server/hub, the 8 plugins, the 9 themes) is "an audit step whose
 * exact run-line a test pins"; this file is the ui leg of that pattern, written
 * against the same TEXT-not-YAML doctrine as ci-shard-gate.test.ts — the
 * asserted strings are the exact tokens a neutering edit must touch.
 *
 * Pinned shape:
 *  - package.json carries `"audit": "npm audit --audit-level=low"` — byte-exact,
 *    because `--audit-level=critical` masquerading as "we have an audit gate"
 *    is the failure mode this gate exists to prevent.
 *  - the `static` job runs `npm run audit` (so CI and the local script can
 *    never diverge in strictness).
 *  - the audit slice carries no `continue-on-error` and no `|| true`.
 */
const root = resolve(__dirname, '../..');
const workflow = readFileSync(resolve(root, '.github/workflows/ui-ci.yml'), 'utf8');
const scripts = (JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
    scripts: Record<string, string>;
}).scripts;

/** Lane token — single code home for the M-UI-27 audit-gate change. */
export const MUI27_AUDIT_GATE_TOKEN = 'MUI27NPMAUDITGATEW2K';

/** One job's block: from its two-space `  <name>:` key to the next top-level job key. */
function jobBlock(name: string): string {
    const start = workflow.indexOf(`\n  ${name}:`);
    if (start === -1) {
        throw new Error(`job "${name}" not found`);
    }
    const rest = workflow.slice(start + 1);
    const next = rest.slice(1).search(/\n {0,2}\w[\w-]*:\n/);
    return next === -1 ? rest : rest.slice(0, next + 1);
}

describe('dependency audit gate (M-UI-27)', () => {
    it('the audit script is byte-exact at the strictest level', () => {
        expect(scripts.audit).toBe('npm audit --audit-level=low');
    });

    it('the static job runs the script — via npm run, so strictness cannot fork', () => {
        const block = jobBlock('static');
        expect(block).toContain('run: npm run audit');
    });

    it('the audit job is not neutered', () => {
        const block = jobBlock('static');
        // Slice from the audit step's name line to the job end: the only shapes
        // that could soften it without touching the pinned run-line.
        const auditSlice = block.slice(block.indexOf('- name: Dependency audit'));
        expect(auditSlice).not.toContain('continue-on-error');
        expect(auditSlice).not.toContain('|| true');
        expect(auditSlice).not.toMatch(/\bif:\s/);
    });
});
