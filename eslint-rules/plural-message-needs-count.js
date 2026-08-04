/**
 * ESLint rule: a `t()` call on a pipe-form plural message must pass `count`.
 *
 * The message catalogue authors plurals as `'{count} member | {count} members'`.
 * `createTranslator` now selects between those parts with `Intl.PluralRules`, but
 * it can only do that if the call site supplies the quantity. A call that omits
 * it — `t('syncplay.members')` — cannot be selected and renders the raw
 * `{count}` placeholder to the user. That was a real, shipped defect
 * (`SyncPlayModal.vue:216`), invisible to every grep run over this repo, and it
 * is not a *syntactic* shape at all, so `no-hand-rolled-plural` cannot see it.
 *
 * **The key list is derived from the catalogue at lint time, not hardcoded.** The
 * rule parses `src/i18n/messages.ts` with the TypeScript parser and collects every
 * two-level `group.key` whose string value contains a `|`. Add a plural message
 * tomorrow and this rule starts guarding its call sites with no edit here — which
 * is the point: a check that carried its own copy of the list would drift from
 * the thing it checks and silently stop covering it.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from '@typescript-eslint/parser';

/** Parsed-catalogue cache, invalidated on mtime so `--fix`/watch runs stay correct. */
let cache = { path: null, mtimeMs: 0, keys: new Set() };

/**
 * Every `group.key` in the catalogue whose default English string is a pipe-form
 * plural template. Extracted from the AST — a two-level ObjectExpression — rather
 * than by matching source text, so a reformat or a change of quote style cannot
 * make the list silently go empty.
 */
function pluralKeysFrom(filePath) {
  let mtimeMs;
  try {
    mtimeMs = statSync(filePath).mtimeMs;
  } catch {
    return new Set();
  }
  if (cache.path === filePath && cache.mtimeMs === mtimeMs) return cache.keys;

  const keys = new Set();
  let ast;
  try {
    ast = parse(readFileSync(filePath, 'utf8'), { range: true, loc: false });
  } catch {
    cache = { path: filePath, mtimeMs, keys };
    return keys;
  }

  const nameOf = (prop) => {
    if (!prop || prop.type !== 'Property') return null;
    if (prop.key.type === 'Identifier') return prop.key.name;
    if (prop.key.type === 'Literal' && typeof prop.key.value === 'string') return prop.key.value;
    return null;
  };

  const visitCatalogue = (obj) => {
    if (!obj || obj.type !== 'ObjectExpression') return;
    for (const groupProp of obj.properties) {
      const group = nameOf(groupProp);
      if (!group || groupProp.value.type !== 'ObjectExpression') continue;
      for (const leafProp of groupProp.value.properties) {
        const leaf = nameOf(leafProp);
        if (!leaf) continue;
        const value = leafProp.value;
        if (value.type === 'Literal' && typeof value.value === 'string' && value.value.includes('|')) {
          keys.add(`${group}.${leaf}`);
        }
      }
    }
  };

  // `export const DEFAULT_MESSAGES = { … } satisfies …` — unwrap the wrappers the
  // catalogue actually uses rather than assuming a bare ObjectExpression.
  const unwrap = (node) => {
    let n = node;
    while (n && (n.type === 'TSSatisfiesExpression' || n.type === 'TSAsExpression')) n = n.expression;
    return n;
  };

  for (const stmt of ast.body) {
    const decl = stmt.type === 'ExportNamedDeclaration' ? stmt.declaration : stmt;
    if (!decl || decl.type !== 'VariableDeclaration') continue;
    for (const d of decl.declarations) {
      if (d.id.type === 'Identifier' && d.init) visitCatalogue(unwrap(d.init));
    }
  }

  cache = { path: filePath, mtimeMs, keys };
  return keys;
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require a `count` param when translating a pipe-form plural message.',
    },
    schema: [
      {
        type: 'object',
        properties: { catalogue: { type: 'string' } },
        additionalProperties: false,
      },
    ],
    messages: {
      missingCount:
        "t('{{key}}') is a plural message ('{{template}}'-style, with a `|`) but no `count` " +
        'was passed, so no plural form can be selected and `{count}` renders literally. ' +
        "Pass { count: n }.",
    },
  },

  create(context) {
    const cataloguePath = resolve(
      context.cwd ?? process.cwd(),
      context.options?.[0]?.catalogue ?? 'src/i18n/messages.ts',
    );
    const pluralKeys = pluralKeysFrom(cataloguePath);
    if (pluralKeys.size === 0) return {};

    const isTranslateCallee = (callee) => {
      if (!callee) return false;
      if (callee.type === 'Identifier') return callee.name === 't';
      if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
        return callee.property.name === 't';
      }
      return false;
    };

    const hasCountParam = (arg) => {
      if (!arg) return false;
      if (arg.type !== 'ObjectExpression') return true; // spread/variable — cannot prove absence
      return arg.properties.some((p) => {
        if (p.type === 'SpreadElement') return true;
        if (p.key?.type === 'Identifier') return p.key.name === 'count';
        if (p.key?.type === 'Literal') return p.key.value === 'count';
        return false;
      });
    };

    const checks = {
      CallExpression(node) {
        if (!isTranslateCallee(node.callee)) return;
        const [keyArg, paramsArg] = node.arguments;
        if (!keyArg || keyArg.type !== 'Literal' || typeof keyArg.value !== 'string') return;
        if (!pluralKeys.has(keyArg.value)) return;
        if (hasCountParam(paramsArg)) return;
        context.report({
          node,
          messageId: 'missingCount',
          data: { key: keyArg.value, template: '{count} x | {count} xs' },
        });
      },
    };

    const services = (context.sourceCode ?? context.getSourceCode()).parserServices ?? {};
    if (typeof services.defineTemplateBodyVisitor === 'function') {
      return services.defineTemplateBodyVisitor(checks, checks);
    }
    return checks;
  },
};
