/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

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
 * Era 2 (ui-regreen): the bare `npm audit --audit-level=low` step reddened on
 * pure registry-side advisory drift (glob GHSA-3g3m-2fjr-6pw4 + minimatch
 * GHSA-g3hv-75wg-m249, both published 2026-10-30; origin runs 41158854334 /
 * 41160835182 / 41162674204 red on the SAME sole step at zero lock change).
 * The sanctioned vehicle is now scripts/audit-gate.mjs — the phlix-website
 * design (d096ab9a/a4858d87, from windows 74fc744/bb9276d): the same strict
 * `npm audit --json --audit-level=low` spawn, but the verdict is an EXACT-SET
 * documented allow-list instead of npm's bare exit code. That is strictly
 * stronger than the step it replaces: unknown ids at ANY severity, or a
 * structurally broken audit, exit nonzero where the bare step could only see a
 * threshold. What must NEVER move is the strictness floor and the
 * fail-loud semantics — every pin below guards one face of that.
 *
 * Pinned shape:
 *  - package.json carries `"audit": "node scripts/audit-gate.mjs"` byte-exact,
 *    and the gate spawns `'--audit-level=low'` byte-exact — because
 *    `--audit-level=critical` masquerading as "we have an audit gate" is the
 *    failure mode this gate exists to prevent, wherever the flag lives.
 *  - the `static` job runs `npm run audit` (CI and the local script can never
 *    diverge in strictness).
 *  - the audit slice carries no `continue-on-error` and no `|| true`.
 *  - ALLOWED_ADVISORIES is the exact measured set {GHSA-3g3m-…, GHSA-g3hv-…}
 *    with full per-entry justification teeth (no-patch/cross-major proofs,
 *    UPSTREAM WATCH removal plan, 2027-01-03 re-verify).
 *  - decide()/collectAdvisoryIds() behavior matrix incl. the measured 16-key
 *    at-pin report clearing with exactly the 2 allowed ids.
 *  - anti-rot: every allowed id's package is cross-checked against the LIVE
 *    package-lock — an advisory whose installed resolutions have all moved
 *    PAST the patched line must not linger as shelter.
 */
const root = resolve(__dirname, '../..');
const workflow = readFileSync(resolve(root, '.github/workflows/ui-ci.yml'), 'utf8');
const gateSource = readFileSync(resolve(root, 'scripts', 'audit-gate.mjs'), 'utf8');
const lock = JSON.parse(readFileSync(resolve(root, 'package-lock.json'), 'utf8')) as {
    packages: Record<string, { version?: string }>;
};
const scripts = (JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
    scripts: Record<string, string>;
}).scripts;

/** Lane token — single code home for the M-UI-27 audit-gate change (era 1). */
export const MUI27_AUDIT_GATE_TOKEN = 'MUI27NPMAUDITGATEW2K';
/** Lane token — ui-regreen era-2 allow-list gate (carried by scripts/audit-gate.mjs). */
export const UI_REGREEN_GATE_TOKEN = 'UIREGREENAUDITGATEK9T';

/** The exact allow-list this pin measures — rotate ONLY from a measured audit. */
const EXPECTED_ALLOWED_IDS = ['GHSA-3g3m-2fjr-6pw4', 'GHSA-g3hv-75wg-m249'];

interface GateEntry {
    package: string;
    firstPatchedBelow: string;
    justification: string;
}

interface GateVerdict {
    code: number;
    clean: boolean;
    allowed: string[];
    unknown: string[];
    problems: string[];
}

interface AuditGateModule {
    EXIT_OK: number;
    EXIT_VIOLATION: number;
    EXIT_STRUCTURE_ERROR: number;
    ALLOWED_ADVISORIES: Map<string, GateEntry>;
    collectAdvisoryIds: (stdout: string) => Set<string>;
    decide: (input: { exitCode: number; stdout: string; spawnError?: unknown }) => GateVerdict;
}

/**
 * Imported through a variable specifier so TS/vue-tsc cannot statically
 * resolve (or type-stub) the .mjs — the structural AuditGateModule interface
 * above IS the typing contract, and the pinning stays honest either way.
 */
const gateSpecifier = pathToFileURL(resolve(root, 'scripts', 'audit-gate.mjs')).href;
const gate = (await import(gateSpecifier)) as AuditGateModule;

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

function countStringLiteralsEqualTo(source: string, needle: string): number {
    // Occurrences inside single- or double-quoted literals ONLY (backtick prose
    // in comments/docblocks deliberately does not count) — identifiers named
    // similarly cannot inflate the count of the SPAWN constant.
    const pattern = new RegExp(`(['"])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
    return (source.match(pattern) ?? []).length;
}

/** Numeric semver-ish compare: -1 a<b, 0 equal, 1 a>b. Build is only for dotted ints. */
function compareVersions(a: string, b: string): number {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const x = pa[i] ?? 0;
        const y = pb[i] ?? 0;
        if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
}

/** Every installed version of `pkg` in the lock (exact node_modules/<pkg> and nested). */
function installedVersionsOf(pkg: string): string[] {
    return Object.entries(lock.packages)
        .filter(([path]) => path === `node_modules/${pkg}` || path.endsWith(`/node_modules/${pkg}`))
        .map(([, entry]) => entry.version)
        .filter((v): v is string => typeof v === 'string');
}

/** The measured npm-audit JSON report (v3 shape) at pin ee40a516, condensed. */
function atPinReport(): string {
    // 16 package keys measured 2026-10-31 (`npm audit --json` → vulnerabilities):
    // 14 dependents flagged via their vulnerable deps, glob + minimatch carrying
    // the advisory objects themselves. The advisory-bearing nodes use `url`
    // exactly as npm emits it; dependents reference by package name (v3 spec).
    const dependents = [
        '@eslint-community/eslint-utils',
        '@eslint/config-array',
        '@eslint/eslintrc',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@typescript-eslint/type-utils',
        '@typescript-eslint/typescript-estree',
        '@typescript-eslint/utils',
        'editorconfig',
        'eslint',
        'eslint-plugin-vue',
        'js-beautify',
        'typescript-eslint',
        'vue-eslint-parser',
    ];
    const vulnerabilities: Record<string, { via: unknown[] }> = {};
    for (const name of dependents) {
        vulnerabilities[name] = { via: name === 'js-beautify' ? ['editorconfig', 'glob'] : ['minimatch'] };
    }
    vulnerabilities['glob'] = {
        via: [
            {
                source: 'glob',
                name: 'glob',
                dependency: 'glob',
                title: 'Glob: AbortSignal cancellation bypass allows post-timeout filesystem traversal',
                url: 'https://github.com/advisories/GHSA-3g3m-2fjr-6pw4',
                severity: 'moderate',
                range: '>=9.0.0 <=14.0.1',
            },
            'minimatch',
        ],
    };
    vulnerabilities['minimatch'] = {
        via: [
            {
                source: 'minimatch',
                name: 'minimatch',
                dependency: 'minimatch',
                title: 'minimatch has potential denial of service via globparts amplification',
                url: 'https://github.com/advisories/GHSA-g3hv-75wg-m249',
                severity: 'moderate',
                range: '<11.0.1',
            },
        ],
    };
    return JSON.stringify({ auditReportVersion: 3, vulnerabilities });
}

describe('dependency audit gate (M-UI-27, era 2 allow-list)', () => {
    it('the audit script is byte-exact — the gate is the only vehicle', () => {
        expect(scripts.audit).toBe('node scripts/audit-gate.mjs');
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

    it('the gate spawns the strictest level, exactly once', () => {
        // The flag survived the move from package.json into the gate — and the
        // level it carries is still `low`. A second looser constant (or a
        // renamed-down value) must not be able to hide here uncounted.
        expect(gateSource).toContain("'--audit-level=low'");
        expect(gateSource).not.toMatch(/--audit-level=(moderate|high|critical)/);
        expect(countStringLiteralsEqualTo(gateSource, '--audit-level=low')).toBe(1);
        expect(gateSource).not.toContain('|| true');
    });

    it('the lane token pairs the gate script to this guard', () => {
        expect(gateSource).toContain(UI_REGREEN_GATE_TOKEN);
    });

    it('the allow-list is the exact measured set', () => {
        expect([...gate.ALLOWED_ADVISORIES.keys()].sort()).toEqual(EXPECTED_ALLOWED_IDS);
    });

    it('each entry names its package and patched line', () => {
        expect(gate.ALLOWED_ADVISORIES.get('GHSA-3g3m-2fjr-6pw4')?.package).toBe('glob');
        expect(gate.ALLOWED_ADVISORIES.get('GHSA-3g3m-2fjr-6pw4')?.firstPatchedBelow).toBe('14.0.2');
        expect(gate.ALLOWED_ADVISORIES.get('GHSA-g3hv-75wg-m249')?.package).toBe('minimatch');
        expect(gate.ALLOWED_ADVISORIES.get('GHSA-g3hv-75wg-m249')?.firstPatchedBelow).toBe('11.0.1');
    });

    it('every justification carries the full proof apparatus', () => {
        for (const [id, entry] of gate.ALLOWED_ADVISORIES) {
            const j = entry.justification;
            expect(j, id).toContain('dev-chain-only');
            expect(j, id).toContain(`gh api /advisories/${id} verified 2026-10-31`);
            expect(j, id).toMatch(/first_patched_version/);
            expect(j, id).toMatch(/registry version lists? verified 2026-10-31/);
            expect(j, id).toContain('UPSTREAM WATCH');
            expect(j, id).toContain('REMOVE this entry');
            expect(j, id).toContain('Re-verify advisory status by 2027-01-03');
            expect(j, id).toContain(`https://github.com/advisories/${id}`);
        }
    });

    it('anti-rot: the live lock still resolves every allowed package INSIDE its vulnerable band', () => {
        // If a future legitimate update moves ALL installed copies of a flagged
        // package past first_patched, the advisory is no longer reported — the
        // entry becomes shelter for nothing and this test reddens telling the
        // next lane to DELETE it (website's withdrawn-vfj7 lesson, executable).
        for (const [id, entry] of gate.ALLOWED_ADVISORIES) {
            const installed = installedVersionsOf(entry.package);
            expect(installed.length, `${id}: ${entry.package} absent from the lock`).toBeGreaterThan(0);
            const stillVulnerable = installed.some((v) => compareVersions(v, entry.firstPatchedBelow) < 0);
            expect(
                stillVulnerable,
                `${entry.package} has NO installed version < ${entry.firstPatchedBelow} ` +
                    `(installed: ${installed.join(', ')}) — advisory ${id} is cleared; REMOVE its ` +
                    'ALLOWED_ADVISORIES entry, justification and fixtures in this file.',
            ).toBe(true);
            // And the justification must not lie about the versions it cites.
            for (const v of installed) {
                if (compareVersions(v, entry.firstPatchedBelow) < 0) {
                    expect(entry.justification, `${id} justification missing installed ${entry.package}@${v}`).toContain(v);
                }
            }
        }
    });

    describe('decide() behavior matrix (imported real code, zero network)', () => {
        it('the measured at-pin report clears with exactly the two allowed ids', () => {
            const ids = gate.collectAdvisoryIds(atPinReport());
            expect([...ids].sort()).toEqual(EXPECTED_ALLOWED_IDS);
            const verdict = gate.decide({ exitCode: 1, stdout: atPinReport() });
            expect(verdict.code).toBe(gate.EXIT_OK);
            expect(verdict.clean).toBe(false);
            expect(verdict.allowed).toEqual(EXPECTED_ALLOWED_IDS);
            expect(verdict.unknown).toEqual([]);
        });

        it('the fixture is the measured 16 package keys', () => {
            const report = JSON.parse(atPinReport()) as { vulnerabilities: Record<string, unknown> };
            expect(Object.keys(report.vulnerabilities)).toHaveLength(16);
        });

        it('a genuinely clean audit passes as clean', () => {
            const verdict = gate.decide({ exitCode: 0, stdout: JSON.stringify({ auditReportVersion: 3, vulnerabilities: {} }) });
            expect(verdict.code).toBe(gate.EXIT_OK);
            expect(verdict.clean).toBe(true);
        });

        it('ANY unknown id reddens the gate and is named', () => {
            const planted = JSON.stringify({
                vulnerabilities: {
                    minimatch: { via: ['minimatch'], url: 'https://github.com/advisories/GHSA-dead-beef-cafe' },
                    evil: { via: [{ url: 'https://github.com/advisories/GHSA-dead-beef-cafe' }] },
                },
            });
            const verdict = gate.decide({ exitCode: 1, stdout: planted });
            expect(verdict.code).toBe(gate.EXIT_VIOLATION);
            expect(verdict.unknown).toEqual(['GHSA-dead-beef-cafe']);
            expect(verdict.problems.join(' ')).toContain('GHSA-dead-beef-cafe');
        });

        it('case-insensitive id matching (report side lowercase)', () => {
            const lowered = JSON.stringify({
                vulnerabilities: { minimatch: { via: [{ url: 'https://github.com/advisories/ghsa-g3hv-75wg-m249' }] } },
            });
            expect(gate.decide({ exitCode: 1, stdout: lowered }).allowed).toEqual(['GHSA-g3hv-75wg-m249']);
        });

        it('legacy v2 `advisories` shape still yields ids', () => {
            const legacy = JSON.stringify({
                advisories: {
                    1: { github_advisory_id: 'GHSA-3g3m-2fjr-6pw4', url: 'https://github.com/advisories/GHSA-3g3m-2fjr-6pw4' },
                    2: { github_advisory_id: 'GHSA-g3hv-75wg-m249', url: 'https://github.com/advisories/GHSA-g3hv-75wg-m249' },
                },
            });
            expect([...gate.collectAdvisoryIds(legacy)].sort()).toEqual(EXPECTED_ALLOWED_IDS);
        });

        it('a broken audit is NEVER a green verdict', () => {
            expect(gate.decide({ exitCode: 1, stdout: 'not json at all' }).code).toBe(gate.EXIT_STRUCTURE_ERROR);
            expect(gate.decide({ exitCode: 2, stdout: JSON.stringify({ vulnerabilities: {} }) }).code).toBe(
                gate.EXIT_STRUCTURE_ERROR,
            );
            expect(gate.decide({ exitCode: 1, stdout: JSON.stringify({ nonsense: true }) }).code).toBe(
                gate.EXIT_STRUCTURE_ERROR,
            );
            expect(
                gate.decide({ exitCode: -1, stdout: '', spawnError: new Error('ENOENT npm') }).code,
            ).toBe(gate.EXIT_STRUCTURE_ERROR);
        });

        it('an unnamed advisory throws fail-loud, decide maps it to structure error', () => {
            const nameless = JSON.stringify({
                vulnerabilities: { mystery: { via: [{ title: 'no id anywhere' }] } },
            });
            expect(() => gate.collectAdvisoryIds(nameless)).toThrow(/refusing to certify an unnamed advisory/);
            expect(gate.decide({ exitCode: 1, stdout: nameless }).code).toBe(gate.EXIT_STRUCTURE_ERROR);
        });

        it('importing the module never execs an audit (main guard)', () => {
            // If this file's top-level import had run npm, these tests would be
            // slow and network-bound; the guard also means EXIT constants prove
            // the module was LOADED, not shelled.
            expect(gateSource).toContain('process.argv[1] === fileURLToPath(import.meta.url)');
        });
    });
});
