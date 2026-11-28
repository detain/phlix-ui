/**
 * design-026 part 2/2 acceptance evidence for the template-copy guard
 * (S-ui-design-22b). The rule extends catalogRouting.test.ts's hardcoded-
 * string check from the pages roster (regex, script-side) INTO swept component
 * templates, where ESLint's normal traversal never descends (the template AST
 * is parked on Program.templateBody by vue-eslint-parser).
 *
 * The shapes mirror live sites VERBATIM:
 *   (V1) routed mustache text  {{ t('detail.cast') }}            — MediaDetail h2
 *   (V2) bound attribute       :aria-label="t('series.playEpisode', { title })"
 *   (V3) bound :title          :title="t('detail.trailerFrameTitle', { name })"
 *   (V4) SINGLE-word statics are exempt exactly as in catalogRouting:
 *        title="Cast", and structural class/id/role attributes
 *   (V5) prose that is NOT catalog copy ('Completely unrelated wording here')
 *   (V6) whitespace-only and {{ }}-interpolated VText nodes
 * and the planted regressions each must report exactly once:
 *   (I1) static title="No rating"                     — the pre-routing badge
 *   (I2) static aria-label="Loading seasons"          — the pre-routing spinner
 *   (I3) VText "More like this"                       — the pre-routing rail title
 *   (I4) straight-apostrophe fold: the hint sentence typed with ' instead of ’
 *        still equals inspector.hint after folding
 *   (I5) VText "Couldn’t save rating."                — itemActions.ratingSaveError
 * A .ts file (no templateBody) must never crash or report.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { RuleTester } from 'eslint';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import noHardcodedCopy from './no-hardcoded-copy.cjs';

const vue = new RuleTester({
  languageOptions: {
    parser: vueParser as never,
    ecmaVersion: 2023,
    sourceType: 'module',
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

const rule = noHardcodedCopy as never;
const sfc = (template: string) =>
  `<script setup lang="ts">\nconst t = (k: string) => k;\n</script>\n<template>${template}</template>`;

vue.run('no-hardcoded-copy', rule, {
  valid: [
    // V1: routed text
    { code: sfc(`<h2>{{ t('detail.cast') }}</h2>`) },
    // V2/V3: bound attributes (dynamic — value invisible to the static check)
    { code: sfc(`<button :aria-label="t('series.playEpisode', { title })">x</button>`) },
    { code: sfc(`<iframe :title="t('detail.trailerFrameTitle', { name })" />`) },
    // V4: single-word catalog values are exempt (and structural attributes)
    { code: sfc(`<span title="Cast">x</span>`) },
    { code: sfc(`<div class="rating-badge__star" role="img" id="item-json">x</div>`) },
    // V5: non-catalog prose
    { code: sfc(`<p>Completely unrelated wording here</p>`) },
    // V6: whitespace + interpolated text nodes
    { code: sfc(`<span>\n   \n</span>`) },
    { code: sfc(`<p>{{ count }} items in this basket</p>`) },
  ],
  invalid: [
    // I1: the pre-routing badge label
    {
      code: sfc(`<span class="rating-badge__no-rating">No rating</span>`),
      errors: [{ messageId: 'hardcodedCopy', data: { value: 'No rating', key: 'none' } }],
    },
    // I2: the pre-routing spinner aria
    {
      code: sfc(`<div aria-label="Loading seasons">x</div>`),
      errors: [{ messageId: 'hardcodedCopy', data: { value: 'Loading seasons', key: 'loadingSeasons' } }],
    },
    // I3: the pre-routing rail heading as raw text
    {
      code: sfc(`<h2>More like this</h2>`),
      errors: [{ messageId: 'hardcodedCopy', data: { value: 'More like this', key: 'moreLikeThis' } }],
    },
    // I4: straight-quote folding still equals the typographic catalog value
    {
      code: sfc(`<p title="Read-only view of this item's stored data (no changes are saved).">x</p>`),
      errors: [
        {
          messageId: 'hardcodedCopy',
          data: { value: "Read-only view of this item's stored data (no changes are saved).", key: 'hint' },
        },
      ],
    },
    // I5: typographic toast copy planted as template text
    {
      code: sfc(`<p>Couldn’t save rating.</p>`),
      errors: [
        {
          messageId: 'hardcodedCopy',
          data: { value: 'Couldn’t save rating.', key: 'ratingSaveError' },
        },
      ],
    },
  ],
});

ts.run('no-hardcoded-copy (ts)', rule, {
  valid: [
    { code: `export const copy = 'More like this';` },
    { code: `const label = "No rating";\nconsole.log(label);` },
  ],
  invalid: [],
});
