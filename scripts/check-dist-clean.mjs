/**
 * Fail if the committed `dist/` is not what the current `src/` builds.
 *
 * WHY THIS EXISTS (S176)
 * ---------------------------------------------------------------------------
 * `@phlix/ui` commits a prebuilt `dist/` and ships **by GitHub tag** with
 * `files: ["dist"]` and **no `prepare` script**. npm therefore never builds on
 * install: every consumer gets *whatever `dist/` is committed*. Four in-estate
 * consumers pin by tag on two different syntaxes
 * (`phlix-server/web-ui` + `phlix-hub/web-ui` + `phlix-windows-client` on
 * `…/archive/refs/tags/vX.tar.gz`, `phlix-tizen-client` on
 * `github:detain/phlix-ui#vX`), so stale output is shipped code, not a
 * cosmetic diff.
 *
 * Measured on master @ 2b636e71: a clean-tree `npm run build` left **55** dirty
 * entries under tracked `dist/` (23 new / 20 deleted / 12 modified). The drift
 * included the **type contract** — `dist/index.d.ts` was missing the 15 runtime
 * exports + 3 types of the S84-86 theming API, and three declaration files
 * (`dist/api/themes.d.ts`, `dist/composables/themeTokens.d.ts`,
 * `dist/stores/useThemesStore.d.ts`) had never been published at all. A
 * consumer could type-check against a contract the library no longer had.
 *
 * Run it as `npm run dist:check`, immediately AFTER `npm run build`.
 *
 * ⚠ A COMMENT INSIDE A SCOPED SFC IS NOT FREE.
 * ---------------------------------------------------------------------------
 * Do not expect "I only added a docblock" to be a no-op. Measured during S13:
 * adding a docblock to a function in `CaptionOverlay.vue` rehashed that file's
 * `data-v-` scope id and changed **three additional** artefacts (`player.js`,
 * `player.umd.cjs`, `ui.css`), taking 55 dirty entries to 58. Any edit inside a
 * `<style scoped>` SFC — comments included — is a **bundle-affecting change**.
 * If this gate reds after a comment-only SFC edit, that is CORRECT: rebuild and
 * commit `dist/`.
 *
 * DETERMINISM (measured 2026-08-03, node v24.15.0, npm 11.13.0, linux x64)
 * ---------------------------------------------------------------------------
 * Comparing raw `git status` is only safe because the build is byte-reproducible.
 * Verified before this gate was wired: two builds from a byte-identical starting
 * tree (restored with `git archive HEAD dist | tar -x`, all 782 files md5-checked)
 * produced 785 files with `diff -r --brief` exit 0 and no output; a third build
 * on the rebuilt commit left the tree clean. Nothing machine-specific is
 * embedded — zero occurrences of `/home/` anywhere in `dist/`, sourcemap
 * `sources` are all relative (`../src/...`), and no build timestamps. Codegen is
 * rolldown's lockfile-pinned native binary (`@rolldown/binding-linux-x64-gnu`),
 * the same arch `ubuntu-latest` resolves, so `npm ci` gives CI the same
 * generator this was built with.
 *
 * NOT proven: reproducibility across a *different* machine or node minor. If
 * this gate ever reds on a PR that genuinely did rebuild `dist/`, suspect that
 * first, and fix it by comparing something stable (declaration files + the file
 * name manifest) rather than by deleting the gate.
 *
 * FAIL-CLOSED BY DESIGN
 * ---------------------------------------------------------------------------
 * A gate that cannot fail is the original defect one level up, so this script
 * refuses to exit 0 unless it can prove it actually checked something:
 *
 *   1. `dist/` must be TRACKED by git and NOT gitignored. `.gitignore` ships a
 *      commented-out `# dist/` line; uncommenting it hides every NEW/renamed
 *      dist file from `git status` (measured: 0 entries even with
 *      --untracked-files=all), which is 23 of the 55 entries seen on master.
 *      Modified tracked files DO still show, so that vector alone is a PARTIAL
 *      blinding — total only when paired with `git rm -r --cached dist`. Both
 *      halves are checked: `git check-ignore --no-index` (ignore rules) and a
 *      non-zero `git ls-files dist` count (untracked entirely).
 *   2. Every entry point published via package.json (`main`, `module`, `types`
 *      and each `exports` target) must exist on disk, so the gate cannot pass
 *      because the build silently produced nothing.
 *   3. Every check in REQUIRED_CHECKS must have recorded that it ran. Deleting
 *      any single check *call* makes this script exit 1, not 0.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Every check that MUST run before this script is allowed to exit 0.
 * Removing a `ran()` call, or the check that makes it, fails the accounting
 * assertion at the bottom — the gate cannot be quietly hollowed out.
 */
const REQUIRED_CHECKS = ['git-available', 'dist-tracked', 'dist-not-ignored', 'published-entrypoints', 'worktree-clean'];
const completed = new Set();
const ran = (name) => completed.add(name);

function fail(headline, detail = '') {
    console.error(`\n[31m✖ dist:check FAILED[0m — ${headline}`);
    if (detail) console.error(detail);
    process.exit(1);
}

function git(args) {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8' });
}

// ── 1. git must be usable, or we cannot conclude anything ────────────────────
try {
    git(['rev-parse', '--is-inside-work-tree']);
    ran('git-available');
} catch (err) {
    fail('git is not usable here, so dist/ drift cannot be determined.', String(err));
}

// ── 2. dist/ must be tracked (catches `git rm --cached dist`) ────────────────
const trackedDist = git(['ls-files', 'dist']).split('\n').filter(Boolean).length;
if (trackedDist === 0) {
    fail(
        'dist/ is not tracked by git, so this gate can never observe drift.',
        'The published package is the committed dist/. Re-track it (`git add dist`) or this check is decoration.',
    );
}
ran('dist-tracked');

// ── 3. dist/ must not be gitignored (catches uncommenting `# dist/`) ─────────
let distIgnored = false;
try {
    // `--no-index` is MANDATORY here, not a stylistic flag. By default
    // `git check-ignore` refuses to report a TRACKED path as ignored, and every
    // file in dist/ is tracked — so plain `check-ignore -q dist` answers "not
    // ignored" even when .gitignore literally says `dist/`, and this whole check
    // silently does nothing. Measured 2026-08-03: with `dist/` uncommented in
    // .gitignore, `-q dist` exits 1 ("not ignored") while `--no-index -q dist`
    // exits 0 ("ignored"). --no-index evaluates the ignore RULES, which is the
    // question being asked. It does not false-positive: with `# dist/` commented
    // it correctly reports not-ignored.
    // Exit 0 = the path IS ignored. execFileSync throws on the exit-1 "not ignored" case.
    git(['check-ignore', '--no-index', '-q', 'dist']);
    distIgnored = true;
} catch {
    distIgnored = false;
}
if (distIgnored) {
    fail(
        'dist/ is gitignored, which hides part of the drift this gate exists to catch.',
        'Measured 2026-08-03, so the scope of the blinding is stated exactly rather than guessed:\n' +
            '  • a NEW/renamed dist file becomes INVISIBLE — `git status --porcelain -- dist` returns 0\n' +
            '    entries even with --untracked-files=all. That is the dominant drift shape here: 23 of\n' +
            "    the 55 entries on master @ 2b636e71 were untracked content-hash renames ('??').\n" +
            '  • a MODIFIED tracked file DOES still show (gitignore never hides tracked-file changes),\n' +
            '    so the blinding is PARTIAL, not total. Combined with `git rm -r --cached dist` it\n' +
            '    becomes total — which the dist-tracked check above covers.\n' +
            'A .gitignore entry for dist/ therefore degrades this gate without touching it. Remove that\n' +
            'entry — this package publishes its committed dist/, so dist/ must stay tracked and visible.',
    );
}
ran('dist-not-ignored');

// ── 4. the published surface must actually exist after the build ─────────────
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const published = new Set();
for (const field of ['main', 'module', 'types']) {
    if (typeof pkg[field] === 'string') published.add(pkg[field]);
}
const collectExports = (node) => {
    if (typeof node === 'string') {
        // Skip wildcard passthroughs like "./dist/*": "./dist/*".
        if (!node.includes('*')) published.add(node);
        return;
    }
    if (node && typeof node === 'object') Object.values(node).forEach(collectExports);
};
collectExports(pkg.exports);

const missing = [...published].filter((rel) => !existsSync(join(root, rel)));
if (missing.length > 0) {
    fail(
        `${missing.length} published entry point(s) are missing from dist/ — did \`npm run build\` actually run?`,
        missing.map((m) => `  missing: ${m}`).join('\n'),
    );
}
ran('published-entrypoints');

// ── 5. the real check: the build must have changed nothing ───────────────────
// Whole tree, not just dist/: the acceptance criterion is "the working tree is
// clean after a build", and a narrower detector than its own rule fakes a zero.
// CI runs this on a pristine `actions/checkout` + `npm ci`, so the only thing
// that can dirty the tree there is the build itself. `-uall` lists new files
// individually instead of collapsing a new directory into one entry.
const porcelain = git(['status', '--porcelain', '--untracked-files=all']).split('\n').filter(Boolean);
ran('worktree-clean');

if (porcelain.length > 0) {
    const distEntries = porcelain.filter((l) => l.slice(3).startsWith('dist/'));
    const otherEntries = porcelain.filter((l) => !l.slice(3).startsWith('dist/'));
    const bucket = (entries, code) => entries.filter((l) => l.slice(0, 2).trim() === code);
    const added = bucket(distEntries, '??');
    const deleted = bucket(distEntries, 'D');
    const modified = bucket(distEntries, 'M');
    const declarations = distEntries.filter((l) => l.endsWith('.d.ts'));

    const lines = [];
    lines.push(
        `dist/ drift: ${distEntries.length} entr${distEntries.length === 1 ? 'y' : 'ies'} ` +
            `(${added.length} new / ${deleted.length} deleted / ${modified.length} modified)`,
    );
    if (declarations.length > 0) {
        lines.push(
            `\n[33m${declarations.length} DECLARATION file(s) drifted — this is the consumer type contract:[0m`,
        );
        lines.push(declarations.map((l) => `  ${l}`).join('\n'));
    }
    if (otherEntries.length > 0) {
        lines.push(`\n${otherEntries.length} dirty path(s) OUTSIDE dist/:`);
        lines.push(otherEntries.map((l) => `  ${l}`).join('\n'));
    }
    lines.push('\nAll dirty paths:');
    lines.push(porcelain.map((l) => `  ${l}`).join('\n'));
    lines.push(
        '\nFIX: run `npm run build` and commit dist/ (`git add dist`) in the same PR as your src/ change.\n' +
            'Consumers install the COMMITTED dist/ — there is no `prepare` script, so npm never builds\n' +
            'on install and whatever is committed here is what ships.\n' +
            'Reminder: editing an SFC — even adding only a comment — rehashes its `data-v-` scope id and\n' +
            'IS bundle-affecting. A comment-only SFC edit still requires a rebuild.',
    );

    fail('the working tree is not clean after `npm run build`.', lines.join('\n'));
}

// ── 6. prove every check ran, so a deleted check cannot pass as a green ──────
const skipped = REQUIRED_CHECKS.filter((c) => !completed.has(c));
if (skipped.length > 0) {
    fail(
        `${skipped.length} required check(s) did not run — this gate has been hollowed out.`,
        `Did not run: ${skipped.join(', ')}\nRefusing to report success on an incomplete verification.`,
    );
}

console.log(
    `✔ dist:check passed — committed dist/ matches source ` +
        `(${trackedDist} tracked files, ${published.size} published entry points, ` +
        `${REQUIRED_CHECKS.length}/${REQUIRED_CHECKS.length} checks ran).`,
);
