/**
 * M-UI-11 acceptance evidence for the sink-census guard (r1 review, Issue 1).
 *
 * The r1 verdict proved the law was only greppable BY A HUMAN: planting
 * `:href="p.repo"` (raw plugin-catalog wire data, no trust comment) in
 * PluginsPage left `npx eslint` at exit 0. This file pins the opposite:
 * that exact shape is an INVALID case here, the sanitizer-bound and
 * marker-blessed shapes of the committed census are VALID, and the trust
 * classes the reviewer audited (literal-prefix route computeds, ternary
 * `? safeHref(x) : undefined` declarations, constant-scheme builders behind an
 * `EXPLICITLY TRUSTED` comment, WatchHistory's template HTML comment) each
 * reddens the moment its marker or its proof is removed — an unmarked look-
 * alike, not an accident of leniency.
 *
 * The shapes mirror live sites VERBATIM:
 *   (V1) `:href="safeHref(p.repo)"`                — PluginsPage repo-link
 *   (V2) `item.href ? safeHref(item.href) : undefined` — PhlixApp config menu
 *   (V3) `:href="safeHref(imgSrc(photo.full_url))"` — PhotoViewPage (double guard)
 *   (V4) route computed + EXPLICITLY TRUSTED block comment — MediaCard/rows
 *   (V5) template HTML comment + `/app/media/${id}` literal-prefix — WatchHistory
 *   (V6) `const safe = safeHref(url); window.open(safe)` — download sites
 *   (V7) `x ? safeHref(x) : undefined` arm-strict declarator — MediaDetail trailer
 *   (V8) marker on the call statement, constant-scheme builder — the class the
 *        census header names for builder templates
 *   (V9) alias chain whose ROOT is the sanitizer (grep-visible hops)
 *   (V10) template INLINE handler `@click="window.open(safeHref(…))"` — the
 *        r3 review's live-probe cure shape, pinning the template-handler
 *        walk (cjs:246-250) from the PASS side
 * and the planted-hostile ones: the reviewer probe, marker deletion,
 * HTML-comment deletion, a raw declarator, a RAW-ARM TERNARY (the
 * `? safeHref(a) : b.url` smuggle), an alias CHAIN rooted in raw data (the
 * two-name talk-past), a bare undeclared identifier, an ALIASED IMPORT
 * (`sh`), and a raw template INLINE `@click="window.open(wire.url)"` handler
 * (the r3 review's planted probe, N2) — each must report exactly once.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { RuleTester } from 'eslint';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import noRawWireHref from './no-raw-wire-href.cjs';

const vue = new RuleTester({
  languageOptions: {
    parser: vueParser as never,
    ecmaVersion: 2023,
    sourceType: 'module',
    parserOptions: { parser: tsParser, extraFileExtensions: ['.vue'] },
  },
});

const ts = new RuleTester({
  languageOptions: {
    parser: tsParser as never,
    ecmaVersion: 2023,
    sourceType: 'module',
  },
});

/** A `.vue` SFC wrapper so template expressions are parsed as a template. */
const sfc = (template: string, script = '') =>
  `<script setup lang="ts">${script}</script>\n<template>${template}</template>`;

/**
 * The trusted census vocabulary, verbatim-analogue shapes from the live tree
 * (Issue-1 fix expectation: valid = safeHref-bound + trusted-comment sites).
 * Spread into the RuleTester `valid` inventory AND length-guarded below, so
 * deleting a shape fails loudly instead of silently shrinking the surface —
 * the S346 pattern.
 */
const CENSUS_TRUSTED_SHAPES = [
  // (V4) MediaCard/MediaBackdropRow/MediaListRow/MediaTableRow: the blessed
  // route computed. Deleting the marker comment from the file below reddens
  // the companion invalid case `Unblessed.vue`, never this one.
  {
    filename: 'Blessed.vue',
    code: sfc(
      '<a :href="href">x</a>',
      '/* M-UI-11 sink census — EXPLICITLY TRUSTED: the literal `/app/media/` prefix pins the scheme. */\nconst href = computed(() => `/app/media/${props.item.id}`);',
    ),
  },
  // (V5) WatchHistoryPage: template HTML comment + literal-prefix template.
  {
    filename: 'History.vue',
    code: sfc(
      '<!-- M-UI-11 sink census: the literal `/app/media/` prefix pins the scheme — explicitly trusted. -->\n<a :href="`/app/media/${historyItem.media.id}`">x</a>',
    ),
  },
  // (V6) MediaCard/MediaDetail/SharedWithMe/MyServers download+open sites.
  {
    filename: 'Dl.vue',
    code: sfc(
      '<button @click="go">x</button>',
      'function go(url: string): void { const safe = safeHref(url); if (!safe) return; window.open(safe, "_blank"); }',
    ),
  },
  // (V7) MediaDetail trailer: the ternary whose non-safeHref arm is only `undefined`.
  {
    filename: 'Trailer.vue',
    code: sfc(
      '<button @click="go">x</button>',
      'function go(): void { const url = props.item.trailer_url ? safeHref(props.item.trailer_url) : undefined; if (url) window.open(url, "_blank"); }',
    ),
  },
  // (V8) constant-scheme builder behind a marker on the call statement.
  {
    filename: 'Builder.vue',
    code: sfc(
      '<button @click="go">x</button>',
      'function go(id: string): void {\n  // M-UI-11 sink census — EXPLICITLY TRUSTED: constant https prefix, id is encodeURIComponent-ed.\n  window.open(`https://img.example/${encodeURIComponent(id)}`, "_blank");\n}',
    ),
  },
  // (V9) an alias chain whose ROOT is the sanitizer resolves to a proof —
  // every hop is greppable; only chains rooted in raw data are the dodge.
  {
    filename: 'SanitizedAlias.vue',
    code: sfc(
      '<button @click="go">x</button>',
      'function go(u: string): void { const inner = safeHref(u); const outer = inner; if (outer) window.open(outer, "_blank"); }',
    ),
  },
  // (V10) template INLINE event handler bound through the sanitizer — the
  // r3 review's live-probe cure shape. Until R-UI-09 every window.open case
  // in this file bound through SCRIPT scope, leaving the template-handler
  // walk (cjs:246-250) live-working but unpinned; this is its PASS side.
  {
    filename: 'TemplateOpenSafe.vue',
    code: sfc('<button @click="window.open(safeHref(link.url))">x</button>'),
  },
];

/**
 * The planted-hostile inventory: (H1) is the r1 reviewer's exact probe. The
 * rest are the unmarked / marker-deleted / smuggle-shaped look-alikes of the
 * trusted classes. Each reports exactly once.
 */
const CENSUS_HOSTILE_SHAPES = [
  // (H1) the r1 verdict's planted probe — raw plugin-catalog wire data.
  {
    filename: 'Probe.vue',
    code: sfc('<a :href="p.repo" target="_blank">Repo ↗</a>', 'const p = { repo: "javascript:alert(1)" };'),
    errors: [{ messageId: 'unsafeHrefBinding' }],
  },
  // (H2) V4 with its marker comment deleted — the blessing IS the trust.
  {
    filename: 'Unblessed.vue',
    code: sfc(
      '<a :href="href">x</a>',
      'const href = computed(() => `/app/media/${props.item.id}`);',
    ),
    errors: [{ messageId: 'unsafeHrefBinding' }],
  },
  // (H3) V5 without the HTML comment — a literal-prefix template must be
  // blessed at its site, not waved through by prefix shape alone.
  {
    filename: 'UnmarkedHistory.vue',
    code: sfc('<a :href="`/app/media/${historyItem.media.id}`">x</a>'),
    errors: [{ messageId: 'unsafeHrefBinding' }],
  },
  // (H4) a raw declarator: `const url = props.item.link` (wire data, no guard).
  {
    filename: 'RawDecl.vue',
    code: sfc(
      '<button @click="go">x</button>',
      'function go(): void { const url = props.item.link; window.open(url, "_blank"); }',
    ),
    errors: [{ messageId: 'unsafeWindowOpen' }],
  },
  // (H5) the RAW-ARM TERNARY smuggle: one branch bypasses the sanitizer.
  {
    filename: 'Smuggle.vue',
    code: sfc(
      '<button @click="go">x</button>',
      'function go(cond: boolean, a: string, b: { url: string }): void { const safe = cond ? safeHref(a) : b.url; window.open(safe, "_blank"); }',
    ),
    errors: [{ messageId: 'unsafeWindowOpen' }],
  },
  // (H6) the ALIAS CHAIN rooted in RAW data: transitive resolution must end
  // at a safeHref call or a marker — wearing a sanitized-looking name two
  // hops away from `props` is exactly the talk-past this guard refuses.
  {
    filename: 'Alias.vue',
    code: sfc(
      '<button @click="go">x</button>',
      'function go(u: string): void { const first = props.link; const second = first; window.open(second, "_blank"); }',
    ),
    errors: [{ messageId: 'unsafeWindowOpen' }],
  },
  // (H7) a bare undeclared identifier bound straight in.
  {
    filename: 'Bare.vue',
    code: sfc('<a :href="wireUrl">x</a>', 'declare const wireUrl: string;'),
    errors: [{ messageId: 'unsafeHrefBinding' }],
  },
  // (H8) the ALIASED IMPORT: `import { safeHref as sh }` does not satisfy the
  // name law — the sink must say `safeHref`, keeping it greppable.
  {
    filename: 'AliasedImport.vue',
    code: sfc(
      '<a :href="sh(p.repo)">x</a>',
      'import { safeHref as sh } from "../utils/safeHref"; const p = { repo: "x" };',
    ),
    errors: [{ messageId: 'unsafeHrefBinding' }],
  },
  // (H9) the r3 review's planted template probe (N2): a raw wire URL handed
  // straight to window.open in an INLINE `@click` handler — the cjs:246-250
  // walk's REPORT side, proven live-working on disk but unpinned here until
  // R-UI-09. Companion to (V10); stripping the arm reddens exactly this case.
  {
    filename: 'TemplateOpenRaw.vue',
    code: sfc('<button @click="window.open(props.link.url)">x</button>'),
    errors: [{ messageId: 'unsafeWindowOpen' }],
  },
];

// ───────────────────────────────────────────────────────────────────────────────
// Vue SFC surface — the :href bindings (where the whole law lives)
// ───────────────────────────────────────────────────────────────────────────────

vue.run('no-raw-wire-href / template :href', noRawWireHref as never, {
  valid: [
    // (V1) the reviewer probe, FIXED: exactly the 2d53754e PluginsPage line.
    {
      filename: 'PluginsPage.vue',
      code: sfc('<a :href="safeHref(p.repo)" target="_blank">Repo ↗</a>'),
    },
    // (V2) PhlixApp config-menu conditional.
    {
      filename: 'Menu.vue',
      code: sfc('<a v-for="item in menu" :href="item.href ? safeHref(item.href) : undefined">{{ item.label }}</a>'),
    },
    // (V3) PhotoViewPage sanitizer-over-image-src double guard.
    {
      filename: 'Photo.vue',
      code: sfc('<a :href="safeHref(imgSrc(photo.full_url))">x</a>'),
    },
    // v-bind: full spelling matches too (same VDirectiveKey shape).
    { filename: 'VB.vue', code: sfc('<a v-bind:href="safeHref(link.url)">x</a>') },
    // Static attributes are author-typed constants — out of the law's scope
    // (AppLayout `#main`, ServicesPage docs links at :231/:306).
    { filename: 'Static.vue', code: sfc('<a href="#main">skip</a><a href="https://trakt.tv/oauth/applications">t</a>') },
    // window.open() with no destination opens nothing.
    { filename: 'Blank.vue', code: sfc('<button @click="w()">x</button>', 'function w(): void { window.open(); }') },
    // A non-href v-bind on an <a> (vue-router's :to) is a different surface.
    { filename: 'To.vue', code: sfc('<RouterLink :to="href">x</RouterLink>') },
    ...CENSUS_TRUSTED_SHAPES,
  ],
  invalid: [...CENSUS_HOSTILE_SHAPES],
});

// ───────────────────────────────────────────────────────────────────────────────
// Plain-script surface — window.open in .ts files (config/composables side)
// ───────────────────────────────────────────────────────────────────────────────

ts.run('no-raw-wire-href / window.open in .ts', noRawWireHref as never, {
  valid: [
    // BookDetailPage/SharedWithMePage/MyServersPage shape: guard, then open.
    "function go(u: string): void { const safe = safeHref(u); if (!safe) return; window.open(safe, '_blank', 'noopener,noreferrer'); }",
    // Direct inline call.
    "window.open(safeHref(u), '_blank');",
    // The marker at the call statement (constant-scheme builder class).
    "// M-UI-11 sink census — EXPLICITLY TRUSTED: constant prefix.\nwindow.open(builder(id), '_blank');",
    // No-argument open.
    'window.open();',
  ],
  invalid: [
    // Raw wire straight into the sink.
    { code: "window.open(props.item.link, '_blank');", errors: [{ messageId: 'unsafeWindowOpen' }] },
    // Aliased-import sanitizer does not satisfy the name law here either.
    {
      code: "import { safeHref as sh } from './utils/safeHref'; window.open(sh(u));",
      errors: [{ messageId: 'unsafeWindowOpen' }],
    },
    // Raw-arm ternary declarator, .ts spelling.
    {
      code: "function f(c: boolean, a: string, b: { url: string }): void { const safe = c ? safeHref(a) : b.url; window.open(safe); }",
      errors: [{ messageId: 'unsafeWindowOpen' }],
    },
  ],
});

// ───────────────────────────────────────────────────────────────────────────────
// Inventory guard (S346 pattern): the trusted and hostile inventories are the
// rule's acceptance surface. A deletion shrinks a lint gate silently, so the
// lengths are pinned here — they move only together with a new audited shape.
// ───────────────────────────────────────────────────────────────────────────────

describe('M-UI-11 census inventory guard', () => {
  it('still pins every trusted census shape', () => {
    expect(CENSUS_TRUSTED_SHAPES).toHaveLength(7);
  });
  it('still plants every hostile shape', () => {
    expect(CENSUS_HOSTILE_SHAPES).toHaveLength(9);
  });
  it('the rule ships the two messageIds the inventory asserts', () => {
    expect(Object.keys(noRawWireHref.meta.messages).sort()).toEqual(['unsafeHrefBinding', 'unsafeWindowOpen']);
  });
});
