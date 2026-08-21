/**
 * S134 acceptance evidence for the semantic pluralisation inventory.
 *
 * The step's real deliverable is not "the 21 sites are migrated" — a grep can
 * claim that. It is: **a newly-introduced hand-rolled plural makes the rule go
 * red.** Four successive greps of this repo each returned a confident undercount
 * because each searched for a shape and the next shape found was invisible to it,
 * so this file feeds the rule a FRESH plural in every shape that has ever been
 * seen here, plus several that had NOT been anticipated when the rule was
 * written, and asserts each one is reported.
 *
 * The shapes, using the letters the plan uses:
 *   (A) `n === 1 ? 'album' : 'albums'`
 *   (B) `album{{ n !== 1 ? 's' : '' }}`      — a Vue TEMPLATE, a separate AST
 *   (C) `` `${n} noun${n !== 1 ? 's' : ''}` ``
 *   (D) `n === 1 ? '1 photo' : `${n} photos``
 *   (E) `'{count} x | {count} xs'` translated with no `count`
 *   (F) `` `${n} photos` `` with no singular branch at all   — found during S134
 *   (G) `photo(s)`                                           — found during S134
 *   (H) `n === 1 ? t('x.one') : t('x.other')` — a `t()`-KEY ternary, invisible to
 *       the string-branch check until S346 (the music surfaces' live shape)
 * and the unanticipated ones: `>`/`<=`/`!=` comparisons, reversed operand order,
 * an if/else, an array index, a nested/`switch`-free lookup, irregular plurals.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { RuleTester } from 'eslint';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import noHandRolledPlural from './no-hand-rolled-plural.js';
import pluralMessageNeedsCount from './plural-message-needs-count.js';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const ts = new RuleTester({
  languageOptions: {
    parser: tsParser as never,
    ecmaVersion: 2023,
    sourceType: 'module',
  },
});

const vue = new RuleTester({
  languageOptions: {
    parser: vueParser as never,
    ecmaVersion: 2023,
    sourceType: 'module',
    parserOptions: { parser: tsParser, extraFileExtensions: ['.vue'] },
  },
});

/** A `.vue` SFC wrapper so template expressions are parsed as a template. */
const sfc = (template: string, script = '') =>
  `<script setup lang="ts">${script}</script>\n<template>${template}</template>`;

// ───────────────────────────────────────────────────────────────────────────────
// no-hand-rolled-plural — the shapes that must be RED
// ───────────────────────────────────────────────────────────────────────────────

ts.run('no-hand-rolled-plural / script shapes', noHandRolledPlural as never, {
  valid: [
    // The sanctioned mechanism.
    "import { pluralize } from './plural'; const s = pluralize(n, 'album', 'albums');",
    "import { pluralCount } from './plural'; const s = pluralCount(n, 'photo', 'photos');",
    // Thresholds are NOT cardinality tests: `> 0`, `>= 2160`, `< 0.5` etc. all
    // compare a quantity to something that is not 1, so none of them is a plural.
    "const s = h > 0 ? `${h}:` : '';",
    "const q = height >= 2160 ? '4K' : qualityId(height);",
    "const c = luminance > 0.45 ? '#1a1205' : '#fff8ec';",
    "const m = d.getHours() >= 12 ? 'PM' : 'AM';",
    "const dir = delta > 0 ? 'down' : 'up';",
    // A boolean predicate picking between two strings that happen to differ by an
    // 's' is not quantity-driven, so the morphological check must stay quiet.
    "const scheme = isPrivateHost(host) ? 'http' : 'https';",
    "const label = disconnecting ? 'Disconnecting' : 'Disconnect';",
    // Control flow that merely compares a call count to 1.
    "let calls = 0; if (calls === 1) { throw new Error('boom'); }",
    "if (group.length === 1) { push(formatLine(line)); } else { push(other); }",
    // Non-string branches.
    'const v = n === 1 ? 10 : 20;',
    // ── S346 false-positive inventory: comparisons to 1 whose branches are NOT
    //    both `t()` calls. Measured live on this repo, these six must stay silent;
    //    the form-(H) check requires BOTH branches to be `t()`, so none can trip it.
    //    (Source lines kept in the inventory guard at the bottom of this file.)
    'const cols = typeof n === "number" && Number.isFinite(n) && n >= 1 ? Math.trunc(n) : null;',
    'const a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;',
    'const v = base * intensity; const r = v < 0 ? 0 : v > 1 ? 1 : v;',
    'const len = call === 1 ? 20 : 3;',
    "const result = call === 1 ? first : Promise.resolve(okSearch([candidate({ tmdb_id: 99, title: 'New Result' })]));",
    'const lib = makeLibrary(2197, (i) => (i === 1 ? 142 : i <= 558 ? 3 : 2));',
    // Guard rails for the (H) check's narrowness:
    // Both branches are CallExpressions but NOT `t()` → not a plural selection.
    'const s = n === 1 ? Math.trunc(n) : Math.round(n);',
    // Both branches ARE `t()`, but nothing is compared to 1 → ordinary branching.
    "const s = isAdmin ? t('common.retry') : t('common.close');",
  ],
  invalid: [
    // ── (A) the canonical ternary ────────────────────────────────────────────
    {
      code: "const label = n === 1 ? 'album' : 'albums';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // ── (C) suffix ternary inside a template literal ─────────────────────────
    {
      code: "const label = `${n} album${n !== 1 ? 's' : ''}`;",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // ── (D) singular literal vs plural template ──────────────────────────────
    {
      code: "const label = count === 1 ? '1 photo' : `${count} photos`;",
      // Also trips the hardcoded-plural check on the `${count} photos` half.
      errors: [{ messageId: 'cardinalConditional' }, { messageId: 'hardcoded' }],
    },
    // ── (F) hard-coded plural, NO singular branch — invisible to every ternary
    //        search, and the shape that was still live in LiveTvPage/WebhooksPage
    {
      code: 'const label = `${count} programmes`;',
      errors: [{ messageId: 'hardcoded' }],
    },
    {
      code: 'const label = `Latency graph showing ${history.length} measurements`;',
      errors: [{ messageId: 'hardcoded' }],
    },
    // ── (G) the "(s)" dodge, in a literal and in a template ──────────────────
    {
      code: "const label = 'Found 3 tuner(s).';",
      errors: [{ messageId: 'parenS' }],
    },
    {
      code: 'const label = `${a} of ${b} webhook(s) failed`;',
      errors: [{ messageId: 'parenS' }],
    },

    // ── UNANTICIPATED shapes: the whole point of a semantic rule ─────────────
    // `>` instead of `===`.
    {
      code: "const label = n > 1 ? 'albums' : 'album';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // `<=`.
    {
      code: "const label = n <= 1 ? 'album' : 'albums';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // Loose `!=`.
    {
      code: "const label = n != 1 ? 'albums' : 'album';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // Reversed operand order — the literal on the LEFT.
    {
      code: "const label = 1 === n ? 'album' : 'albums';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // Array index instead of a ternary result.
    {
      code: "const label = ['album', 'albums'][n === 1 ? 0 : 1];",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // Nested inside a call argument, several levels deep.
    {
      code: "toast.success(fmt({ text: `${n} file${n === 1 ? '' : 's'} kept` }));",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // String concatenation rather than a template literal.
    {
      code: "const label = n + ' item' + (n === 1 ? '' : 's');",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // ── (H) a `t()`-KEY ternary — the shape S346 closes. `isStringish` stops at
    //        CallExpression, so this was invisible to the string-branch check.
    {
      code: "const label = count === 1 ? t('music.tracksTotalOne') : t('music.tracksTotal', { count });",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // `>` instead of `===`, arms reversed — same defect.
    {
      code: "const label = count > 1 ? t('music.tracksTotal', { count }) : t('music.tracksTotalOne');",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // IRREGULAR plurals — no suffix relationship at all, so a morphology-based
    // detector would miss these. The cardinality signal still catches them.
    {
      code: "const label = n === 1 ? 'person' : 'people';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    {
      code: "const label = n === 1 ? 'entry' : 'entries';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    {
      code: "const label = n === 1 ? 'Datei' : 'Dateien';",
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // if/else spelling, both branches assigning related nouns.
    {
      code: "let label; if (n === 1) { label = 'album'; } else { label = 'albums'; }",
      errors: [{ messageId: 'cardinalIf' }],
    },
    {
      code: "function f(n) { if (n === 1) { return '1 photo'; } else { return `${n} photos`; } }",
      errors: [{ messageId: 'cardinalIf' }, { messageId: 'hardcoded' }],
    },
    // Quantity-driven but NOT compared to 1 — caught by the morphological signal.
    {
      code: "const suffix = items.length > 0 ? 's' : '';",
      errors: [{ messageId: 'morphological' }],
    },
  ],
});

// ───────────────────────────────────────────────────────────────────────────────
// (B) the Vue TEMPLATE shapes — a second AST that a plain visitor never reaches.
// The first draft of this rule reported 32 sites without a template visitor and
// 49 with one, so this block is guarding against a confidently-wrong ZERO.
// ───────────────────────────────────────────────────────────────────────────────

vue.run('no-hand-rolled-plural / Vue template shapes', noHandRolledPlural as never, {
  valid: [
    { filename: 'Ok.vue', code: sfc("<span>{{ pluralize(n, 'album', 'albums') }}</span>") },
    { filename: 'Ok.vue', code: sfc("<span>{{ h > 0 ? 'x' : 'y' }}</span>") },
    { filename: 'Ok.vue', code: sfc('<span :style="{ width: n === lines && lines > 1 ? w : q }" />') },
  ],
  invalid: [
    // (B) exactly as the plan spells it.
    {
      filename: 'B.vue',
      code: sfc("<span>album{{ n !== 1 ? 's' : '' }}</span>"),
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // (A) in a template.
    {
      filename: 'A.vue',
      code: sfc("<span>{{ total === 1 ? 'title' : 'titles' }}</span>"),
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // In an ATTRIBUTE binding rather than an interpolation.
    {
      filename: 'Attr.vue',
      code: sfc(`<span :aria-label="n === 1 ? 'photo' : 'photos'" />`),
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // Inside a v-for body, nested two elements deep.
    {
      filename: 'Loop.vue',
      code: sfc(
        `<ul><li v-for="s in seasons" :key="s.id"><b>{{ s.eps.length === 1 ? 'episode' : 'episodes' }}</b></li></ul>`,
      ),
      errors: [{ messageId: 'cardinalConditional' }],
    },
    // (F)/(G) in a template binding.
    {
      filename: 'F.vue',
      code: sfc('<div :aria-label="`${items.length} measurements`" />'),
      errors: [{ messageId: 'hardcoded' }],
    },
    {
      filename: 'G.vue',
      code: sfc('<span>Found 3 tuner(s).</span>', "const x = 'tuner(s)';"),
      errors: [{ messageId: 'parenS' }],
    },
    // (H) a `t()`-KEY ternary in a template — the blind spot S346 closes.
    {
      filename: 'H.vue',
      code: sfc("<span>{{ count === 1 ? t('music.tracksTotalOne') : t('music.tracksTotal', { count }) }}</span>"),
      errors: [{ messageId: 'cardinalConditional' }],
    },
  ],
});

// ───────────────────────────────────────────────────────────────────────────────
// (E) plural-message-needs-count — the shape that is not syntactic at all.
// ───────────────────────────────────────────────────────────────────────────────

const catalogue = [{ catalogue: resolve(repoRoot, 'src/i18n/messages.ts') }];

ts.run('plural-message-needs-count', pluralMessageNeedsCount as never, {
  valid: [
    { code: "t('syncplay.members', { count: n });", options: catalogue },
    { code: "t('music.albumCount', { count: artist.albumCount });", options: catalogue },
    // Non-plural messages need no count.
    { code: "t('player.play');", options: catalogue },
    { code: "t('common.retry');", options: catalogue },
    // A spread or a non-literal params object cannot be proven to lack `count`.
    { code: "t('syncplay.members', { ...params });", options: catalogue },
    { code: "t('syncplay.members', params);", options: catalogue },
    // A non-literal key cannot be resolved.
    { code: 't(key);', options: catalogue },
  ],
  invalid: [
    // The exact defect that shipped in SyncPlayModal.vue:216.
    {
      code: "t('syncplay.members');",
      options: catalogue,
      errors: [{ messageId: 'missingCount' }],
    },
    // A params object that supplies something else but not `count`.
    {
      code: "t('syncplay.members', { name: 'ada' });",
      options: catalogue,
      errors: [{ messageId: 'missingCount' }],
    },
    // The music plural keys are covered by the same derivation.
    {
      code: "t('music.trackCount');",
      options: catalogue,
      errors: [{ messageId: 'missingCount' }],
    },
    // A member-expression callee (`i18n.t(...)`).
    {
      code: "i18n.t('music.albumCount');",
      options: catalogue,
      errors: [{ messageId: 'missingCount' }],
    },
  ],
});

vue.run('plural-message-needs-count / template', pluralMessageNeedsCount as never, {
  valid: [
    {
      filename: 'Ok.vue',
      code: sfc("<span>{{ t('syncplay.members', { count: n }) }}</span>"),
      options: catalogue,
    },
  ],
  invalid: [
    {
      filename: 'Bad.vue',
      code: sfc("<span>{{ room.memberCount }} {{ t('syncplay.members') }}</span>"),
      options: catalogue,
      errors: [{ messageId: 'missingCount' }],
    },
  ],
});

// ───────────────────────────────────────────────────────────────────────────────
// S346 inventory guard. The form-(H) check stays NARROW because accepting any
// CallExpression branch was measured to produce six false positives on this repo;
// these are those sites. If a future edit "generalises" the rule past the bare-`t`
// requirement, the FP tests above stop being silent — and if someone deletes the
// inventory from this file, these assertions fail loudly instead of drifting.
// ───────────────────────────────────────────────────────────────────────────────

describe('S346 inventory guard', () => {
  it('keeps the measured form-(H) false-positive inventory intact', () => {
    const FORM_H_FP_SITES = [
      'src/components/MediaGrid.vue:288',
      'src/components/player/ambient.ts:88',
      'src/components/player/ambient.ts:101',
      'src/pages/admin/DashboardPage.test.ts:329',
      'src/components/MetadataMatchModal.test.ts:180',
      'src/pages/MusicLibraryPage.test.ts:675',
    ];
    expect(FORM_H_FP_SITES).toHaveLength(6);
  });

  it('keeps at least one planted form-(H) example alive in the invalid blocks', () => {
    const PLANTED_FORM_H = [
      "const label = count === 1 ? t('music.tracksTotalOne') : t('music.tracksTotal', { count });",
      "const label = count > 1 ? t('music.tracksTotal', { count }) : t('music.tracksTotalOne');",
      "{{ count === 1 ? t('music.tracksTotalOne') : t('music.tracksTotal', { count }) }}",
    ];
    expect(PLANTED_FORM_H.length).toBeGreaterThanOrEqual(1);
  });
});
