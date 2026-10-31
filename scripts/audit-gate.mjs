/**
 * audit-gate — npm-audit wrapper with an explicit, justified advisory allow-list.
 *
 * Lane token (single code home): UIREGREENAUDITGATEK9T — carried by
 * src/test/ci-audit-gate.test.ts.
 *
 * WHY THIS EXISTS:
 * The `npm audit --audit-level=low` step this replaces turned the `static` job
 * red on master purely from registry-side advisory waterline drift — no commit
 * touched dependencies and the lock stayed byte-identical to the last green
 * run (b663310a, run 41145382221). Both advisories published 2026-10-30T23:09Z
 * (gh api /advisories), severity medium:
 *   * glob      GHSA-3g3m-2fjr-6pw4 — reds runs 41158854334 / 41160835182 /
 *               41162674204 (sole failed step "Dependency audit" in every one,
 *               origin-verified).
 *   * minimatch GHSA-g3hv-75wg-m249 — same runs.
 * The lock-only `npm update` path was EXHAUSTED with measured evidence at pin
 * ee40a516 (npm@11 update across every flagged axis + re-audit): the only
 * movable resolution, typescript-eslint 8.65.0→8.72.1, still declares
 * minimatch ^10.2.2 (10.2.6 = top of the 10.x line, flagged) and the re-audit
 * reported the SAME 16 package keys / 2 advisory ids. Every patched release is
 * cross-major from its parents' declarations (proofs per entry below), so the
 * sanctioned vehicle is a DOCUMENTED ALLOW-LIST, ported from phlix-website
 * scripts/audit-gate.mjs (d096ab9a/a4858d87 lineage, itself from
 * phlix-windows-client 74fc744/bb9276d): the audit passes only while the
 * reported advisory-id set is a subset of ALLOWED_ADVISORIES below, and turns
 * red the moment ANY other advisory appears — at any severity. package.json's
 * audit script and package-lock.json itself stay untouched apart from this
 * script's one-line invocation swap.
 *
 * REACH: phlix-ui is a supply-chain AMPLIFIER — its committed dist/ is vendored
 * estate-wide (server, hub, tizen, windows, console, roku). That is exactly why
 * the flagged set must be provably dist-inert: all three vulnerable packages
 * (glob, minimatch, and the editorconfig/js-beautify hosts that pull them) are
 * devTooling-reachable ONLY (eslint config-array globbing, typescript-eslint's
 * project parsing, @vue/test-utils' warning formatter) — none is imported by
 * any bundle entry, and `npm run build` + `npm run dist:check` pass with a
 * byte-identical dist/ at this pin (the CI `test` job re-proves it on every
 * push). npm's human output counts affected PACKAGES (16 at pin 2026-10-31);
 * this gate dedupes by advisory id via the JSON parse below (16 keys → 2 ids).
 *
 * ANTI-NEUTERING LAW:
 * A silent gate is worse than no gate. The script distinguishes "audit clean"
 * from "audit broken": unparseable JSON, an unrecognized report shape, a failed
 * spawn, or a nonzero npm exit that reports ZERO advisories all exit with
 * EXIT_STRUCTURE_ERROR (2) — never 0. Unknown advisories exit EXIT_VIOLATION (1).
 * The spawn argv is a fixed constant and keeps the strictest `--audit-level=low`
 * of the bare step it replaces; src/test/ci-audit-gate.test.ts text-pins all of
 * it (keep strings in sync), the same doctrine as the S440 plugin/theme guards.
 *
 * Exit codes: 0 pass (clean or allowed-only) · 1 allow-list violation ·
 * 2 audit itself failed (structural — the verdict is unusable, not "clean").
 */

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const EXIT_OK = 0;
export const EXIT_VIOLATION = 1;
export const EXIT_STRUCTURE_ERROR = 2;

// Exact GHSA ids the gate tolerates, each with the justification CI prints on
// every run. Subset semantics: ANY advisory id missing here reddens the gate.
// The EXACT set (no more, no less) is pinned by src/test/ci-audit-gate.test.ts,
// and its anti-rot cross-check reddens if a flagged package version ever moves
// PAST the patched line — a cleared advisory must not linger as shelter.
export const ALLOWED_ADVISORIES = new Map([
  [
    'GHSA-3g3m-2fjr-6pw4',
    {
      package: 'glob',
      firstPatchedBelow: '14.0.2',
      justification:
        'dev-chain-only: the single vulnerable install at pin is glob@10.5.0, pulled by ' +
        '@vue/test-utils@2.4.11 -> js-beautify@1.15.4 -> glob ^10.4.2 — and 10.5.0 is the ' +
        'newest 10.x EVER published (registry version list verified 2026-10-31). The flaw is ' +
        'an AbortSignal cancellation bypass letting a timed-out glob walk keep touching the ' +
        'filesystem; every walk here traverses this repo\'s own checked-out tree with this ' +
        'repo\'s own patterns (test-utils warnings), never hostile input, and glob is not ' +
        'imported by any bundle entry (dist stays byte-ident). NO in-range fix exists: the ' +
        'advisory band is >=9.0.0 <=14.0.1 with first_patched_version 14.0.2 and no backports ' +
        '(gh api /advisories/GHSA-3g3m-2fjr-6pw4 verified 2026-10-31), so EVERY version any ' +
        'parent can declare is flagged — even raising @vue/test-utils to its newest 2.5.1 ' +
        '(in-range of the declared ^2.4.10) lands js-beautify ^2.0.0 -> glob ^13.0.6, whose ' +
        '13.0.6 is the top of the 13.x line and still inside the band; this was measured, not ' +
        'inferred (npm@11 update probe + re-audit at pin: same 16 keys / same 2 ids). A ' +
        'cross-major override to 14.0.2+ is rejected: S430 estate discipline (never force a ' +
        'major across an unaudited API boundary) and this repo\'s own doctrine — the ' +
        'toolchain that builds the estate-vendored dist is upgraded as a reviewed act. ' +
        'UPSTREAM WATCH (the removal plan): the moment a 10.x/13.x backport ships, or ' +
        'js-beautify majors to a glob declaration that exits the band, `npm update` clears it ' +
        'lockfile-only — then REMOVE this entry, its justification, the 3g3m fixtures in ' +
        'src/test/ci-audit-gate.test.ts and its ALLOWED_ADVISORIES row. Re-verify advisory ' +
        'status by 2027-01-03: https://github.com/advisories/GHSA-3g3m-2fjr-6pw4',
    },
  ],
  [
    'GHSA-g3hv-75wg-m249',
    {
      package: 'minimatch',
      firstPatchedBelow: '11.0.1',
      justification:
        'dev-chain-only: three vulnerable resolutions at pin — minimatch@3.1.5 hoisted under ' +
        'eslint@9.39.5, @eslint/config-array@0.21.2 and @eslint/eslintrc@3.3.6 (all declare ' +
        '^3.1.5); 9.0.9 twice nested (editorconfig@1.0.7 declares ^9.0.1; glob@10.5.0 declares ' +
        '^9.0.4); 10.2.6 under @typescript-eslint/typescript-estree@8.65.0 (declares ^10.2.2). ' +
        'The DoS is pattern amplification at optimizationLevel>=2 driven by a HOSTILE glob ' +
        'pattern; every pattern in these chains comes from this repo\'s own eslint config and ' +
        'package declarations, never untrusted input, and none of it reaches the bundles ' +
        '(dist byte-ident). NO in-range fix exists on ANY axis: the advisory range is <11.0.1 ' +
        'with first_patched_version 11.0.1 only and no backports (gh api ' +
        '/advisories/GHSA-g3hv-75wg-m249 verified 2026-10-31), while 3.1.5, 9.0.9 and 10.2.6 ' +
        'are each the newest of their 3.x, 9.x and 10.x lines EVER published (registry version ' +
        'lists verified 2026-10-31) — every installable version under the parents\' ranges stays ' +
        'flagged, so `npm update` cannot clear it; measured at pin (npm@11 update to the newest ' +
        'reachable graph — typescript-eslint 8.72.1 — re-audits the same 16 keys / same 2 ids). ' +
        'Even the eslint-major cascade this repo deliberately does not ride is no escape: ' +
        'eslint 10.14.0, the newest eslint (verified 2026-10-31), STILL declares minimatch ' +
        '^10.2.6. A global cross-major override to 11.0.1+ is rejected under S430 discipline ' +
        '(never force majors under eslint/glob/ts-estree, which declare ^3/^9/^10). ' +
        'UPSTREAM WATCH (the removal plan): if 3.1.6/9.0.10/10.2.7 backports ship, `npm update ' +
        'minimatch` clears them inside the existing declarations; when eslint/config-array ship ' +
        'majors declaring minimatch ^11, a reviewed eslint-major cascade closes this one too — ' +
        'either way REMOVE this entry, its justification, the g3hv fixtures in ' +
        'src/test/ci-audit-gate.test.ts and its ALLOWED_ADVISORIES row. Re-verify advisory ' +
        'status by 2027-01-03: https://github.com/advisories/GHSA-g3hv-75wg-m249',
    },
  ],
]);

// The bare step this replaced was `npm audit --audit-level=low` — the STRICTEST
// level. --audit-level only positions npm's own exit code (the JSON report
// carries every advisory regardless of level and decide() reddens on ANY
// un-allowlisted id, so the gate is strictly stronger than the step it
// replaces), but the flag value itself is pinned by src/test/ci-audit-gate.test.ts
// exactly like before: downgrading it toward "critical masquerading as an audit
// gate" is the failure mode that pin exists to prevent.
const AUDIT_ARGS = ['audit', '--json', '--audit-level=low'];
const MAX_BUFFER_BYTES = 64 * 1024 * 1024;

export class AuditGateError extends Error {}

/** Run the real `npm audit --json` the same way the replaced CI step did. */
export function runAudit() {
  // CI is linux-only, but the win32 branch is kept for parity with the
  // phlix-windows-client template this gate is ported through phlix-website:
  // npm there is npm.cmd, which Node refuses to spawn without a shell since the
  // CVE-2024-27980 hardening, and local Windows dev is a supported venue for
  // this repo. The argv is a fixed constant — no interpolation, no injection
  // surface.
  const result = spawnSync('npm', AUDIT_ARGS, {
    encoding: 'utf8',
    maxBuffer: MAX_BUFFER_BYTES,
    shell: process.platform === 'win32',
  });
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    spawnError: result.error ?? null,
  };
}

// GHSA ids are case-insensitive by spec. Extraction preserves the reported
// case for display; ALLOW-LIST MATCHING IS CASE-INSENSITIVE (decide() below
// lowercases both sides), so authoring a key as GHSA-… or ghsa-… both work.
function ghsaFromUrl(url) {
  const match = typeof url === 'string' ? /\/(GHSA-[0-9a-z]+(-[0-9a-z]+){2,3})$/i.exec(url) : null;
  return match ? match[1] : null;
}

function advisoryIdOf(via) {
  const fromUrl = ghsaFromUrl(via.url);
  if (fromUrl) return fromUrl;
  if (typeof via.github_advisory_id === 'string' && /^GHSA-/i.test(via.github_advisory_id)) {
    return via.github_advisory_id;
  }
  throw new AuditGateError(
    `advisory entry carries no resolvable GHSA id (url=${JSON.stringify(via.url ?? null)}); ` +
      `refusing to certify an unnamed advisory — ${JSON.stringify(via).slice(0, 200)}`,
  );
}

/** Parse npm audit JSON (report v3 `vulnerabilities`, legacy v2 `advisories`) into a Set of GHSA ids. */
export function collectAdvisoryIds(stdout) {
  let report;
  try {
    report = JSON.parse(stdout);
  } catch {
    throw new AuditGateError(
      `npm audit --json produced unparseable output: ${JSON.stringify(String(stdout).slice(0, 300))}`,
    );
  }
  if (report === null || typeof report !== 'object') {
    throw new AuditGateError(
      `npm audit --json produced a non-object report: ${JSON.stringify(report).slice(0, 200)}`,
    );
  }

  const ids = new Set();
  if (report.vulnerabilities && typeof report.vulnerabilities === 'object') {
    for (const node of Object.values(report.vulnerabilities)) {
      for (const via of node?.via ?? []) {
        // v3 (and npm 12's `auditReportVersion: 2` variant that still carries
        // a `vulnerabilities` map): `via` strings name affected dependents;
        // objects ARE the advisories.
        if (typeof via === 'object' && via !== null) ids.add(advisoryIdOf(via));
      }
    }
    return ids;
  }
  if (report.advisories && typeof report.advisories === 'object') {
    for (const advisory of Object.values(report.advisories)) {
      if (advisory && typeof advisory === 'object') ids.add(advisoryIdOf(advisory));
    }
    return ids;
  }
  throw new AuditGateError(
    'unrecognized npm audit JSON shape (no `vulnerabilities`/`advisories` key) — ' +
      `refusing to guess at an audit we cannot read: keys=[${Object.keys(report).join(',')}]`,
  );
}

/**
 * Pure decision: audit-run facts in, gate verdict out.
 * Returns { code, clean, allowed[], unknown[], problems[] }.
 */
export function decide({ exitCode, stdout, spawnError = null }) {
  if (spawnError) {
    return {
      code: EXIT_STRUCTURE_ERROR,
      clean: false,
      allowed: [],
      unknown: [],
      problems: [`npm audit could not be executed: ${spawnError.message}`],
    };
  }

  let ids;
  try {
    ids = collectAdvisoryIds(stdout);
  } catch (error) {
    return {
      code: EXIT_STRUCTURE_ERROR,
      clean: false,
      allowed: [],
      unknown: [],
      problems: [
        error instanceof AuditGateError ? error.message : `audit parse failed: ${error.message}`,
      ],
    };
  }

  const canonicalKeyByLowerId = new Map(
    [...ALLOWED_ADVISORIES.keys()].map((key) => [key.toLowerCase(), key]),
  );
  const allowed = [...ids]
    .filter((id) => canonicalKeyByLowerId.has(id.toLowerCase()))
    .map((id) => canonicalKeyByLowerId.get(id.toLowerCase()))
    .sort();
  const unknown = [...ids].filter((id) => !canonicalKeyByLowerId.has(id.toLowerCase())).sort();
  const problems = [];
  if (unknown.length > 0) {
    problems.push(
      `${unknown.length} advisory id(s) are NOT on the allow-list: ${unknown.join(', ')} — ` +
        'fix the dependency (preferred) or justify a deliberate, reviewed ALLOWED_ADVISORIES entry.',
    );
  }
  // Anti-neutering: nonzero exit with nothing allow-listable means the audit
  // command itself failed — an unread verdict is never a green verdict.
  if (exitCode !== 0 && ids.size === 0) {
    problems.push(
      `npm audit exited ${exitCode} while reporting ZERO advisories — the audit command failed; ` +
        'refusing to treat a broken audit as a clean one.',
    );
  }
  if (problems.length > 0) {
    return {
      code: unknown.length > 0 ? EXIT_VIOLATION : EXIT_STRUCTURE_ERROR,
      clean: false,
      allowed,
      unknown,
      problems,
    };
  }
  return { code: EXIT_OK, clean: exitCode === 0 && ids.size === 0, allowed, unknown, problems };
}

export function main() {
  const audit = runAudit();
  const verdict = decide(audit);

  for (const id of verdict.allowed) {
    const entry = ALLOWED_ADVISORIES.get(id);
    console.log(`audit-gate: ALLOWED ${id} (${entry.package}) — ${entry.justification}`);
  }
  for (const problem of verdict.problems) {
    console.error(`audit-gate: ${problem}`);
  }
  if (verdict.code === EXIT_OK) {
    console.log(
      verdict.clean
        ? 'audit-gate: PASS — npm audit clean (0 advisories, exit 0)'
        : `audit-gate: PASS — ${verdict.allowed.length} advisory id(s) reported, every one allow-listed (npm audit exit ${audit.exitCode})`,
    );
  }
  return verdict.code;
}

// Main guard: importing this module (src/test/ci-audit-gate.test.ts does) never
// execs an audit — only `node scripts/audit-gate.mjs` does.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exitCode = main();
}
