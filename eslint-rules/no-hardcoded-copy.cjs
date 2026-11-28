/**
 * no-hardcoded-copy — design-026 lint leg: the catalogRouting hardcoded-string
 * check, extended INTO Vue <template> bodies.
 *
 * The law: once a surface is swept through the i18n catalog, its TEMPLATE must
 * not reintroduce a user-facing English literal that the catalog already owns.
 * catalogRouting.test.ts enforces this for the src/pages/ roster by regex; the
 * swept COMPONENT surfaces (design-026 parts 1/2) had no equivalent mechanical
 * gate — static `title="…"`, `placeholder="…"`, `aria-label="…"` attributes and
 * plain text nodes are invisible to ESLint's normal traversal because
 * vue-eslint-parser parks the template AST on `Program.templateBody`.
 *
 * Mechanism: at Program:exit, manually walk program.templateBody (the same walk
 * no-raw-wire-href uses — ESLint core does not traverse it), collecting
 *   (a) STATIC attributes (key.type VIdentifier, value VLiteral) whose raw value
 *       is multi-word and byte-equals a DEFAULT_MESSAGES value (quote-normalised), and
 *   (b) VText nodes (skipping pure-whitespace and anything containing {{ }} —
 *       interpolation is already catalog-driven) trimmed the same way.
 * Single-word literals are exempt exactly as in catalogRouting.test.ts (they are
 * overwhelmingly class names / structural), and the whole rule is scoped by the
 * eslint.config.js `files:` roster so unswept surfaces stay untouched until
 * their own sweep appends them.
 *
 * Catalog values are re-read from src/i18n/messages.ts at module load (the rule
 * is CJS and cannot import the TS catalog); a stale checkout self-heals because
 * the flat config re-imports per ESLint run.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/* eslint-disable @typescript-eslint/no-require-imports -- this file is CommonJS by
 * design (.cjs): require() is its ONLY import mechanism, and it must stay CJS so the
 * flat config and ESLint's rule loader can consume it without a TS build step. */
const fs = require('node:fs');
const path = require('node:path');

const SKIP_KEYS = new Set(['parent', 'tokens', 'comments', 'loc', 'range', 'start', 'end']);

/** typographic ↔ straight folding, so 'item’s' also catches "item's". */
const fold = (s) => s.replace(/[’]/g, "'").replace(/[“”]/g, '"');

function catalogValues() {
  const file = path.resolve(__dirname, '..', 'src', 'i18n', 'messages.ts');
  const src = fs.readFileSync(file, 'utf8');
  const start = src.indexOf('export const DEFAULT_MESSAGES');
  const end = src.indexOf('} satisfies', start);
  const region = src.slice(start, end);
  const out = new Map();
  const re = /([A-Za-z0-9_.]+):\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(region)) !== null) {
    const value = m[2];
    if (/\s/.test(value)) out.set(fold(value), m[1]);
  }
  return out;
}

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') visit(node);
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key)) continue;
    const value = node[key];
    if (Array.isArray(value)) {
      for (const child of value) {
        if (child && typeof child === 'object' && typeof child.type === 'string') walk(child, visit);
      }
    } else if (value && typeof value === 'object' && typeof value.type === 'string') {
      walk(value, visit);
    }
  }
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'swept components must pull template copy from the i18n catalog, not hardcode catalog-owned strings',
    },
    schema: [],
    messages: {
      hardcodedCopy:
        '“{{value}}” is already catalog copy ({{key}}) — route this template string through t() instead of hardcoding it.',
    },
  },
  create(context) {
    const values = catalogValues();
    if (values.size === 0) {
      throw new Error('no-hardcoded-copy: could not read catalog values from src/i18n/messages.ts');
    }
    return {
      'Program:exit'(program) {
        const template = program.templateBody;
        if (!template) return;
        walk(template, (node) => {
          if (node.type === 'VAttribute' && node.value && node.value.type === 'VLiteral' && node.key && node.key.type === 'VIdentifier') {
            const raw = node.value.value;
            const trimmed = raw.trim();
            if (trimmed && /\s/.test(trimmed) && values.has(fold(trimmed))) {
              context.report({ node, messageId: 'hardcodedCopy', data: { value: trimmed, key: values.get(fold(trimmed)) } });
            }
          }
          if (node.type === 'VText') {
            const trimmed = node.value.trim();
            if (!trimmed || trimmed.includes('{{')) return;
            if (/\s/.test(trimmed) && values.has(fold(trimmed))) {
              context.report({ node, messageId: 'hardcodedCopy', data: { value: trimmed, key: values.get(fold(trimmed)) } });
            }
          }
        });
      },
    };
  },
};
