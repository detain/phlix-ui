#!/usr/bin/env node
/**
 * S280 — regenerate `src/api/test/serverRouteManifest.generated.ts` from the
 * phlix-server ROUTE_MANIFEST constants.
 *
 * The gate exists to pin what the CLIENT requests against what the SERVER
 * registers. The expected set therefore MUST be read off the server side and
 * never off the client under test — a manifest derived from the client would
 * self-adjust to whatever the client happens to call and could never fail.
 *
 * The authoritative source is the two route tables phlix-server registers:
 *
 * - `tests/Unit/Server/Core/ApplicationRouterWirePathGuardTest.php`
 *   (`ApplicationRouterWirePathGuardTest::ROUTE_MANIFEST`, 353 rails)
 * - `tests/Unit/Server/WebPortal/WebPortalRouterWirePathGuardTest.php`
 *   (`WebPortalRouterWirePathGuardTest::ROUTE_MANIFEST`, 47 rails)
 *
 * The ui calls both routers (Application routes plus the WebPortal surface:
 * `/api/v1/themes`, `/api/v1/users/me/next-up`, `/api/v1/media/facets`, …), so
 * the gate's expected set is the UNION of the two constants. Both files pin
 * their entries as exact `VERB path` strings with NO substring matching — the
 * same tuple-exact discipline this gate inherits.
 *
 * Usage:
 *
 *     node scripts/generate-server-route-manifest.mjs \
 *       /path/to/phlix-server-checkout \
 *       [--out src/api/test/serverRouteManifest.generated.ts]
 *
 * The phlix-server path is an ARGUMENT, never hardcoded — the generator is a
 * committed, reproducible tool; the checkout it reads is whatever the operator
 * points it at (typically a read-only origin/master checkout).
 *
 * Regenerate when phlix-server changes either ROUTE_MANIFEST: the generated
 * file records the exact server commit sha it was derived from, so a stale
 * manifest is visible at a glance.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const MANIFEST_SOURCES = [
    {
        file: 'tests/Unit/Server/Core/ApplicationRouterWirePathGuardTest.php',
        label: 'ApplicationRouterWirePathGuardTest::ROUTE_MANIFEST (the Application router — 353 rails)',
    },
    {
        file: 'tests/Unit/Server/WebPortal/WebPortalRouterWirePathGuardTest.php',
        label: 'WebPortalRouterWirePathGuardTest::ROUTE_MANIFEST (the WebPortal router — 47 rails)',
    },
];

/**
 * Extract one `private const ROUTE_MANIFEST = [ ... ];` block.
 *
 * Entries are PHP string-literal expressions, possibly concatenated across
 * lines (`'a' . ' -> B::c [D]'`), terminated by `,`. Doc comments and `//`
 * lines inside the block are skipped.
 *
 * @returns {Array<[string, string]>} `[VERB, path]` tuples in manifest order.
 */
function extractManifest(phpSource, fileLabel) {
    const start = phpSource.indexOf('private const ROUTE_MANIFEST = [');
    if (start === -1) {
        throw new Error(`${fileLabel}: ROUTE_MANIFEST constant not found`);
    }
    const blockStart = phpSource.indexOf('[', start) + 1;
    const blockEnd = phpSource.indexOf('];', blockStart);
    if (blockStart === 0 || blockEnd === -1) {
        throw new Error(`${fileLabel}: could not delimit the ROUTE_MANIFEST block`);
    }

    const entries = [];
    let buffer = '';
    let inBlockComment = false;
    for (const rawLine of phpSource.slice(blockStart, blockEnd).split('\n')) {
        const line = rawLine.trim();
        if (line === '') continue;
        if (inBlockComment) {
            if (line.includes('*/')) inBlockComment = false;
            continue;
        }
        if (line.startsWith('//')) continue;
        if (line.startsWith('/*')) {
            if (!line.includes('*/')) inBlockComment = true;
            continue;
        }
        if (line.startsWith('*')) continue;

        const literal = line.match(/^(?:\.\s*)?'((?:[^'\\]|\\.)*)'/);
        if (!literal) {
            throw new Error(`${fileLabel}: unparseable manifest line: ${line}`);
        }
        buffer += literal[1];
        if (line.endsWith(',')) {
            entries.push(buffer);
            buffer = '';
        }
    }
    if (buffer !== '') {
        throw new Error(`${fileLabel}: unterminated manifest entry: ${buffer}`);
    }

    return entries.map((entry) => {
        const match = entry.match(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS) (\S+)/);
        if (!match) {
            throw new Error(`${fileLabel}: unparseable manifest entry: ${entry}`);
        }
        return [match[1], match[2]];
    });
}

function gitSha(repoPath) {
    try {
        return execFileSync('git', ['-C', repoPath, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    } catch {
        throw new Error(`could not read the phlix-server commit sha at ${repoPath}`);
    }
}

const args = process.argv.slice(2);
const serverPath = args.find((a) => !a.startsWith('--'));
const outFlag = args.indexOf('--out');
const outPath = outFlag !== -1 ? args[outFlag + 1] : undefined;
if (!serverPath) {
    console.error('usage: node scripts/generate-server-route-manifest.mjs <phlix-server-checkout> [--out <path>]');
    process.exit(2);
}

// ── extract both manifests ────────────────────────────────────────────────────
const union = new Map(); // "VERB path" -> [verb, path]; first occurrence wins
const perSource = [];
for (const { file, label } of MANIFEST_SOURCES) {
    const fullPath = path.join(serverPath, file);
    const tuples = extractManifest(readFileSync(fullPath, 'utf8'), label);
    perSource.push({ label, file, count: tuples.length });
    for (const [verb, route] of tuples) {
        const key = `${verb} ${route}`;
        if (!union.has(key)) union.set(key, [verb, route]);
    }
}

// Deterministic output: verb-major, then path — same order every run.
const tuples = [...union.values()].sort((a, b) =>
    a[0] === b[0]
        ? a[1] === b[1]
            ? 0
            : a[1] < b[1]
              ? -1
              : 1
        : a[0] < b[0]
          ? -1
          : 1,
);

const serverSha = gitSha(serverPath);
const generatedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
const generator = 'scripts/generate-server-route-manifest.mjs';
const selfPath = fileURLToPath(import.meta.url);
// Repo-root-relative generator path for the regeneration note in the output.
const generatorFromRoot = path.join('scripts', path.basename(selfPath));

const lines = [
    '/**',
    ' * GENERATED FILE — DO NOT EDIT BY HAND.',
    ' *',
    ' * S280 — the phlix-server ROUTE_MANIFEST union, as `[method, pathTemplate]`',
    ' * tuples. This is the AUTHORITATIVE expected set for the client route gate:',
    ' * every URL phlix-ui issues must be tuple-exact against one of these entries.',
    ' *',
    ' * Sources (phlix-server, read-only, at commit `' + serverSha + '`):',
    ...perSource.map((s) => ` * - \`${s.file}\` — ${s.label} (${s.count} entries)`),
    ' *',
    ' * Derivation: the UNION of the two ROUTE_MANIFEST constants — the ui calls',
    ' * both routers (the Application router AND the WebPortal surface). 11 rails',
    ' * are registered by both routers and counted once.',
    ' *',
    ' * Generated by `' + generator + '` at ' + generatedAt + '.',
    ' * Regenerate: `node ' + generatorFromRoot + ' <phlix-server-checkout>`.',
    ' * The checkout path is an argument; point it at a read-only origin/master',
    ' * checkout of phlix-server.',
    ' *',
    ' * @copyright 2026 Joe Huss <detain@interserver.net>',
    ' * @license MIT',
    ' */',
    '',
    '/**',
    ' * The EXACT set of `[method, pathTemplate]` tuples phlix-server registers,',
    ' * tuple-exact — a request that matches by substring or prefix is a defect.',
    ' */',
    'export const SERVER_ROUTE_MANIFEST: ReadonlyArray<readonly [string, string]> = [',
    ...tuples.map(([verb, route]) => `    ['${verb}', '${route}'],`),
    '] as const;',
    '',
    '/** Provenance — the server commit + generator this manifest was derived from. */',
    'export const SERVER_ROUTE_MANIFEST_PROVENANCE = {',
    `    serverSha: '${serverSha}',`,
    `    generatedAt: '${generatedAt}',`,
    `    generator: '${generator}',`,
    `    sources: [`,
    ...perSource.map((s) => `        { file: '${s.file}', count: ${s.count} },`),
    '    ],',
    `    total: ${tuples.length},`,
    '} as const;',
    '',
];

const target = outPath ?? path.join(path.dirname(selfPath), '..', 'src', 'api', 'test', 'serverRouteManifest.generated.ts');
writeFileSync(target, lines.join('\n'));
console.log(`wrote ${target}: ${tuples.length} tuples (union of ${perSource.map((s) => s.count).join(' + ')}), server ${serverSha}`);