/**
 * Review 2026-11-04 ui__copywriter F3 — the mechanical catalog-routing gate.
 *
 * The copy/docs lane (ui__copywriter m4) recommended 'a grep-gate pinning
 * catalog-backed sentences appear only via t()'; no enforcement shipped and it
 * landed in neither the fixed nor skipped ledger. F1's residue — four pages
 * routing 'Nothing to play yet.' while two kept the raw literal — is exactly
 * what an unenforced sweep leaves behind. This is that gate.
 *
 * WHAT IT CHECKS, for each scoped file:
 *  1. no string literal (or static <h1> text) duplicates a multi-word
 *     DEFAULT_MESSAGES value — the sentence must render through its key;
 *  2. the routed call-sites this batch established are still there: the listed
 *     t('key') invocations occur at least the pinned number of times, so a
 *     silent re-inline (or a deleted branch) reddens the count.
 *
 * LIMITS — deliberately honest (this is a tripwire, NOT a whole-repo i18n law):
 *  - scope is the reviewed surfaces below; other pages may legitimately hold
 *    inline copy until they get their own sweep;
 *  - only EXACT copies of multi-word catalog values are caught. Near-misses
 *    ('Couldn't' vs 'Could not') and the documented ~200 errMessage(e, 'Failed
 *    to …') trust-model fallbacks (copywriter M4 skip — the 'Failed to' voice
 *    is banned from the catalog by the 76990b04 law, so they can never collide
 *    with a value match) sail through by design;
 *  - single-word values ('Play', 'Menu') are excluded: too collision-prone
 *    with route names, props and CSS class parts to flag without noise;
 *  - template literals containing ${…} are skipped — interpolated prose is a
 *    different (documented-skip) class.
 *  - ALLOW-LIST below is explicit and reasoned; an exception is a line here,
 *    never a silent hole.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_MESSAGES } from './messages';

const HERE = dirname(fileURLToPath(import.meta.url));
const PAGES = join(HERE, '..', 'pages');

/** The reviewed surfaces whose catalog sentences this gate owns. */
const SCOPED_FILES = [
  'BrowsePage.vue',
  'MediaDetailPage.vue',
  'WatchHistoryPage.vue',
  'LibraryPage.vue',
  'ExplorePage.vue',
  'RecommendationsPage.vue',
  'FederationSharesPage.vue',
  'SettingsPage.vue',
];

/** {file, value, reason} exceptions — each must earn its place. */
const ALLOW_LIST: Array<{ file: string; value: string; reason: string }> = [
  {
    file: 'RecommendationsPage.vue',
    value: 'For you',
    reason:
      "static <h1> pinned verbatim by pageTitles.test.ts (copywriter m9 'one surface, one name' law); routing the heading through t() is a separate design decision (cf. ParentalControlsPage's M13 option A), not a copy defect",
  },
  {
    file: 'WatchHistoryPage.vue',
    value: 'Watch history',
    reason:
      "same static-<h1> class as the entry above: the heading is owned by pageTitles.test.ts's sentence-case law (it lists 'Watch history' as its passing exemplar); per-page t()-routing is M13 option-A territory, not this tripwire's mandate",
  },
];

/**
 * Routed call-sites the copy/docs lane + the F1 cure established, per page:
 * key → minimum expected t('key') invocations. Re-inlining any site drops the
 * count and reddens the pin.
 */
const ROUTING_PINS: Record<string, Array<[string, number]>> = {
  'BrowsePage.vue': [['library.nothingToPlay', 2], ['common.detailsUnavailable', 1]],
  'MediaDetailPage.vue': [['library.nothingToPlay', 2]],
  'WatchHistoryPage.vue': [['library.nothingToPlay', 2], ['common.detailsUnavailable', 1]],
  'LibraryPage.vue': [['library.nothingToPlay', 2]],
  'ExplorePage.vue': [['library.nothingToPlay', 2], ['common.detailsUnavailable', 1]],
  'RecommendationsPage.vue': [['library.nothingToPlay', 2], ['common.detailsUnavailable', 1]],
};

/** Every multi-word DEFAULT_MESSAGES value, keyed by the exact string. */
function collectSentenceValues(node: unknown, out = new Map<string, string>()): Map<string, string> {
  if (typeof node === 'string') {
    if (/\s/.test(node.trim()) && !node.includes('${')) out.set(node, node);
    return out;
  }
  if (node && typeof node === 'object') {
    for (const child of Object.values(node as Record<string, unknown>)) collectSentenceValues(child, out);
  }
  return out;
}
const SENTENCES = collectSentenceValues(DEFAULT_MESSAGES);

/** Strip comments (HTML + JS block + whole-line //) so prose ABOUT a sentence
 *  never trips the gate that forbids COPYING one. */
function stripComments(src: string): string {
  return src
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

/** Quoted string literals (single/double/backtick-without-interpolation). */
function stringLiterals(src: string): string[] {
  const found: string[] = [];
  for (const m of src.matchAll(/'((?:[^'\\\n]|\\.)+)'|"((?:[^"\\\n]|\\.)+)"|`([^`$\n]+)`/g)) {
    const lit = m[1] ?? m[2] ?? m[3];
    if (lit && !lit.includes('${')) found.push(lit);
  }
  return found;
}

/** Static <h1> heading text (the same capture class as pageTitles.test.ts). */
function h1Texts(src: string): string[] {
  return [...src.matchAll(/<h1[^>]*>([^<>{}]+)<\/h1>/g)].map((m) => m[1].trim());
}

describe('catalog routing gate (review ui__copywriter F3)', () => {
  it('the value census is non-trivial (gate has something to bite on)', () => {
    expect(SENTENCES.size).toBeGreaterThan(300);
  });

  for (const file of SCOPED_FILES) {
    it(`${file} duplicates no catalog sentence`, () => {
      const src = stripComments(readFileSync(join(PAGES, file), 'utf8'));
      const allowed = new Set(ALLOW_LIST.filter((a) => a.file === file).map((a) => a.value));
      const offenders = [...stringLiterals(src), ...h1Texts(src)].filter(
        (lit) => SENTENCES.has(lit) && !allowed.has(lit),
      );
      expect(offenders, `inline copies of catalog sentences in ${file}: ${JSON.stringify(offenders)}`).toEqual([]);
    });

    for (const [key, min] of ROUTING_PINS[file] ?? []) {
      it(`${file} keeps routing through t('${key}') (call-site minimum ${min})`, () => {
        const src = readFileSync(join(PAGES, file), 'utf8');
        const routed = src.split(`t('${key}'`).length - 1;
        expect(routed).toBeGreaterThanOrEqual(min);
      });
    }
  }

  it('the allow-list itself stays reasoned and collision-free', () => {
    // Every exception must name a real scoped file, a REAL catalog sentence,
    // and carry a reason — a blanketed or stale exemption is itself a finding.
    for (const a of ALLOW_LIST) {
      expect(SCOPED_FILES).toContain(a.file);
      expect(SENTENCES.has(a.value), `${a.value} is no longer a catalog value`).toBe(true);
      expect(a.reason.length).toBeGreaterThan(30);
    }
  });
});
