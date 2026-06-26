import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import globals from 'globals';

// Flat config for phlix-ui (Vue 3 + TS). Pragmatic baseline: catch real bugs
// (js + ts recommended, vue essential) without enforcing stylistic churn across
// the existing codebase. Tighten over time.
export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      '**/*.snap',
      'src/dev/**', // dev-only harness/mockups
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript (and vue-tsc) already resolve identifiers/types, and `no-undef`
      // misfires on DOM lib type globals used in type positions (e.g.
      // FrameRequestCallback). Off, per typescript-eslint guidance.
      'no-undef': 'off',
      // Unused vars: allow intentional _-prefixed args/vars (project convention).
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // `cond ? a() : b()` / `cond && a()` as statements are an intentional,
      // readable pattern in the keyboard handlers.
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      // `any` is discouraged but not yet eradicated across the codebase.
      '@typescript-eslint/no-explicit-any': 'warn',
      // This is a component LIBRARY — single-word names (Button, Modal, Tabs,
      // Switch, Spinner…) are intentional and the public API.
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    // Tests + node scripts may use a few more escape hatches.
    files: ['**/*.test.ts', '**/*.spec.ts', 'scripts/**', '*.config.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // Tests deliberately include emoji (with variation selectors) in regex
      // assertions verifying that NO emoji glyphs render.
      'no-misleading-character-class': 'off',
    },
  },
);
