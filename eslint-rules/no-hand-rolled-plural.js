/**
 * ESLint rule: every plural noun must go through `src/utils/plural.ts`.
 *
 * **Why this is not a grep.** The inventory that produced this rule was counted
 * four separate times and came back low every time, because each count grepped
 * for a syntactic shape and the next shape found was invisible to it. A rule
 * written as "match these known shapes" would repeat that failure exactly: it
 * would be derived from the inventory it checks, so it could only ever confirm
 * what was already known. This rule therefore keys on the *semantics* —
 *
 *   1. a conditional that picks between STRINGS,
 *   2. driven by a QUANTITY,
 *
 * — which is what "hand-rolled plural" actually means, independent of how it is
 * spelled. `n === 1 ? a : b`, `n !== 1 ? b : a`, `n > 1 ? b : a`, `n <= 1 ? a : b`,
 * `if (n === 1) …`, a ternary nested inside a template literal, a ternary inside a
 * Vue `{{ }}` interpolation and an index expression `[a, b][n === 1 ? 0 : 1]` are
 * all the same node shape to this rule, and none of them had to be anticipated.
 *
 * The three secondary checks (`morphological`, `parenS`, `hardcoded`) exist
 * because two shapes found during the migration are NOT conditionals at all and
 * so cannot be caught by the primary check at any level of generality:
 * `` `${n} photos` `` with no singular branch, and the `photo(s)` dodge.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/** LDML plural morphemes used by the morphological check. Deliberately small. */
const PLURAL_SUFFIXES = ['s', 'es', 'ies', 'en'];

/**
 * Words that merely END in `s`. Only used to keep the `hardcoded` check quiet;
 * a miss here costs a false negative, never a false positive on real prose.
 */
const NOT_PLURAL_NOUNS = new Set([
  'is', 'was', 'has', 'this', 'its', 'less', 'plus', 'status', 'https', 'gps', 'os',
  'address', 'progress', 'success', 'access', 'process', 'across', 'previous', 'various',
  'always', 'yes', 'as', 'us', 'js', 'css', 'ms', 'bps', 'kbps', 'mbps', 'fps', 'hls', 'dns',
  'series', 'aliases', 'miss', 'pass', 'class', 'gross', 'loss', 'press', 'cross', 'does',
  'declares', 'repeats', 'contains', 'expires', 'remains', 'exists', 'https', 'ws', 'wss',
]);

/** `http(s)` / `ws(s)` are scheme alternations, not plurals. */
const SCHEME_PAREN_S = /(?:https?|ftps?|wss?)\(s\)/i;

/** Is this expression capable of producing a string? */
function isStringish(node, depth = 0) {
  if (!node || depth > 4) return false;
  if (node.type === 'Literal' && typeof node.value === 'string') return true;
  if (node.type === 'TemplateLiteral') return true;
  if (node.type === 'BinaryExpression' && node.operator === '+') {
    return isStringish(node.left, depth + 1) || isStringish(node.right, depth + 1);
  }
  if (node.type === 'ConditionalExpression') {
    return isStringish(node.consequent, depth + 1) || isStringish(node.alternate, depth + 1);
  }
  if (node.type === 'TSAsExpression' || node.type === 'TSNonNullExpression') {
    return isStringish(node.expression, depth + 1);
  }
  return false;
}

/** Walk every descendant node, ignoring parent back-links. */
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') visit(node);
  for (const key of Object.keys(node)) {
    if (key === 'parent') continue;
    const value = node[key];
    if (Array.isArray(value)) {
      for (const child of value) {
        if (child && typeof child === 'object' && typeof child.type === 'string') {
          walk(child, visit);
        }
      }
    } else if (value && typeof value === 'object' && typeof value.type === 'string') {
      walk(value, visit);
    }
  }
}

/**
 * `['album', 'albums'][n === 1 ? 0 : 1]` — the ternary yields NUMBERS, so the
 * branches are not string-producing and the primary check would miss it. What
 * makes it a plural is where the number goes: it indexes a literal array of
 * strings. Found by this rule's own test suite while probing unanticipated
 * shapes, which is the argument for keeping that suite adversarial.
 */
function selectsFromStringArray(node) {
  const parent = node.parent;
  if (!parent || parent.type !== 'MemberExpression') return false;
  if (!parent.computed || parent.property !== node) return false;
  const object = parent.object;
  if (!object || object.type !== 'ArrayExpression') return false;
  return object.elements.some((el) => el && isStringish(el));
}

const COMPARISONS = new Set(['===', '!==', '==', '!=', '>', '>=', '<', '<=']);

/**
 * Does this test compare something against the literal `1`?
 *
 * Comparing a quantity to 1 IS the singular/plural distinction — that is the
 * whole semantic content of the check, and it is why thresholds (`> 0`,
 * `>= 2160`, `< 0.5`, `>= 12`) are not flagged: those are not cardinality tests.
 * Measured on this repo the signal is exact: every `vs 1` comparison with a
 * string branch was a plural, and no threshold comparison was.
 */
function comparesToOne(test) {
  let found = false;
  walk(test, (n) => {
    if (found) return;
    if (n.type !== 'BinaryExpression' || !COMPARISONS.has(n.operator)) return;
    for (const side of [n.left, n.right]) {
      if (side && side.type === 'Literal' && side.value === 1) found = true;
    }
  });
  return found;
}

/** Is this identifier/member expression plausibly a COUNT rather than a name? */
function isQuantityName(name) {
  return /count|total|^n$|^num|qty|^len$/i.test(name);
}

/**
 * Is this test driven by a quantity at all? Used to stop the morphological check
 * firing on boolean predicates (`isPrivateHost(h) ? 'http' : 'https'`,
 * `disconnecting ? 'Disconnecting' : 'Disconnect'`), which are not plurals.
 */
function isQuantityDriven(test) {
  let found = false;
  walk(test, (n) => {
    if (found) return;
    if (n.type === 'Literal' && typeof n.value === 'number') found = true;
    if (n.type === 'MemberExpression' && n.property && n.property.type === 'Identifier') {
      if (n.property.name === 'length' || n.property.name === 'size') found = true;
      if (isQuantityName(n.property.name)) found = true;
    }
    if (n.type === 'Identifier' && isQuantityName(n.name)) found = true;
  });
  return found;
}

/** Is this expression plausibly a count (used for the `${n} nouns` check)? */
function isQuantityExpression(node) {
  if (!node) return false;
  if (node.type === 'Identifier') return isQuantityName(node.name);
  if (node.type === 'MemberExpression' && node.property && node.property.type === 'Identifier') {
    return (
      node.property.name === 'length' ||
      node.property.name === 'size' ||
      isQuantityName(node.property.name)
    );
  }
  if (node.type === 'CallExpression') return isQuantityExpression(node.callee);
  if (node.type === 'TSNonNullExpression' || node.type === 'TSAsExpression') {
    return isQuantityExpression(node.expression);
  }
  return false;
}

function quasiText(quasi) {
  return quasi.value.cooked ?? quasi.value.raw ?? '';
}

/** Static text of a string-ish node, with `${…}` holes collapsed to a space. */
function staticText(node) {
  if (!node) return null;
  if (node.type === 'Literal' && typeof node.value === 'string') return node.value;
  if (node.type === 'TemplateLiteral') {
    let out = '';
    node.quasis.forEach((q, i) => {
      out += quasiText(q);
      if (i < node.expressions.length) out += ' ';
    });
    return out;
  }
  return null;
}

/** Trailing alphabetic word of a string, or `null`. */
function lastWord(text) {
  const match = /([A-Za-z]+)[^A-Za-z]*$/.exec(text);
  return match ? match[1].toLowerCase() : null;
}

function suffixDiffers(a, b) {
  if (a === b) return false;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  if (!long.startsWith(short)) return false;
  return PLURAL_SUFFIXES.includes(long.slice(short.length).toLowerCase());
}

/**
 * Do these two strings look like the same noun in two number forms?
 *
 * NOTE the deliberate weakness: this only recognises SUFFIXING plurals, so
 * `entry`/`entries` and `person`/`people` are invisible to it. That is precisely
 * why it is only ever used as a SECONDARY signal — the primary check
 * (`comparesToOne` + a string branch) needs no morphology at all and catches the
 * irregulars. Anything gated on this function trades recall for precision on
 * purpose; see the `IfStatement` handler.
 */
function pluralRelated(a, b) {
  const sa = staticText(a);
  const sb = staticText(b);
  if (sa === null || sb === null || sa === sb) return false;
  if (suffixDiffers(sa, sb)) return true;
  const wa = lastWord(sa);
  const wb = lastWord(sb);
  return wa !== null && wb !== null && suffixDiffers(wa, wb);
}

/** Every string-producing node directly yielded by a branch (return/assign/expression). */
function branchStrings(branch) {
  const out = [];
  walk(branch, (n) => {
    if (n.type === 'Literal' && typeof n.value === 'string') out.push(n);
    else if (n.type === 'TemplateLiteral') out.push(n);
  });
  return out;
}

const HELPER_HINT =
  'Use the plural helper (src/utils/plural.ts): plural() / pluralize() / pluralCount() / selectPluralTemplate().';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow hand-rolled pluralisation; route every plural through src/utils/plural.ts.',
    },
    schema: [],
    messages: {
      cardinalConditional:
        'Hand-rolled plural: a conditional compares a quantity against 1 to choose between strings. ' +
        HELPER_HINT,
      cardinalIf:
        'Hand-rolled plural: an if/else compares a quantity against 1 to choose between strings. ' +
        HELPER_HINT,
      morphological:
        'Hand-rolled plural: a quantity-driven conditional picks between "{{a}}" and "{{b}}", ' +
        'which differ only by a plural ending. ' + HELPER_HINT,
      parenS:
        'Unresolved plural: "{{word}}(s)" leaves the plural for the reader to work out. ' +
        HELPER_HINT,
      hardcoded:
        'Hard-coded plural: `${{{expr}}}` is a count but "{{word}}" has no singular form, ' +
        'so a count of 1 renders "1 {{word}}". ' + HELPER_HINT,
    },
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    const checks = {
      ConditionalExpression(node) {
        const stringBranch =
          isStringish(node.consequent) ||
          isStringish(node.alternate) ||
          selectsFromStringArray(node);
        if (stringBranch && comparesToOne(node.test)) {
          context.report({ node, messageId: 'cardinalConditional' });
          return;
        }
        if (isQuantityDriven(node.test) && pluralRelated(node.consequent, node.alternate)) {
          context.report({
            node,
            messageId: 'morphological',
            data: { a: staticText(node.consequent), b: staticText(node.alternate) },
          });
        }
      },

      /**
       * The if/else spelling of the same defect.
       *
       * This handler is deliberately the MIRROR IMAGE of the conditional one.
       * `if (x === 1)` is overwhelmingly control flow in this repo — sequencing a
       * mock's call count, dispatching on a group's cardinality, counting mounted
       * hosts — and a check keyed only on "compares to 1 and a string is nearby"
       * measured 29 hits here, every single one of them a false positive. A rule
       * that cries wolf 29 times gets switched off, so this one additionally
       * requires the two branches to yield strings that ARE the same noun in two
       * number forms. It buys precision with recall: an irregular if/else plural
       * (`entry`/`entries`) slips past. The conditional check above carries the
       * recall, and this one is a bonus net rather than the safety line.
       */
      IfStatement(node) {
        if (!node.alternate || !comparesToOne(node.test)) return;
        const left = branchStrings(node.consequent);
        const right = branchStrings(node.alternate);
        for (const a of left) {
          for (const b of right) {
            if (pluralRelated(a, b)) {
              context.report({ node: node.test, messageId: 'cardinalIf' });
              return;
            }
          }
        }
      },

      Literal(node) {
        if (typeof node.value !== 'string') return;
        const match = /([A-Za-z]+)\(s\)/.exec(node.value);
        if (match && !SCHEME_PAREN_S.test(node.value)) {
          context.report({ node, messageId: 'parenS', data: { word: match[1] } });
        }
      },

      TemplateLiteral(node) {
        // The `(s)` dodge inside a template literal.
        for (const quasi of node.quasis) {
          const text = quasiText(quasi);
          const match = /([A-Za-z]+)\(s\)/.exec(text);
          if (match && !SCHEME_PAREN_S.test(text)) {
            context.report({ node: quasi, messageId: 'parenS', data: { word: match[1] } });
          }
        }
        // A count hole immediately followed by a plural noun and no singular form.
        for (let i = 0; i < node.expressions.length; i++) {
          const expr = node.expressions[i];
          if (!isQuantityExpression(expr)) continue;
          const after = quasiText(node.quasis[i + 1]);
          const match = /^\s+([A-Za-z]+)/.exec(after);
          if (!match) continue;
          const word = match[1];
          if (word.length < 4) continue;
          if (NOT_PLURAL_NOUNS.has(word.toLowerCase())) continue;
          if (!PLURAL_SUFFIXES.some((sfx) => word.toLowerCase().endsWith(sfx))) continue;
          context.report({
            node,
            messageId: 'hardcoded',
            data: { expr: sourceCode.getText(expr), word },
          });
        }
      },
    };

    // Vue SFCs park the template in a second AST that a plain visitor never
    // reaches. Half this repo's plural sites live there — the first pass of this
    // very rule reported 32 sites without it and 49 with it, so omitting it would
    // have shipped a rule that reported a confident, wrong zero.
    const services = sourceCode.parserServices ?? {};
    if (typeof services.defineTemplateBodyVisitor === 'function') {
      return services.defineTemplateBodyVisitor(checks, checks);
    }
    return checks;
  },
};
