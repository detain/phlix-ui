/**
 * ESLint rule: no raw wire URL may reach a navigation sink (M-UI-11 census law).
 *
 * **The law.** Every dynamic `:href` binding and every `window.open()` in
 * `src/**` must either
 *
 *   1. bind through `safeHref(...)` — directly in the bound expression, or
 *      through a variable whose declaration PROVES every value-producing arm
 *      routes through it (`const safe = safeHref(url)`; the download/trailer/
 *      open sites' `x ? safeHref(x) : undefined` shape), or
 *   2. carry an `EXPLICITLY TRUSTED` census comment (case-insensitive phrase)
 *      at its DEFINITION SITE: a script comment attached to the variable
 *      declaration or the call statement, or — for template-side bindings —
 *      a template HTML comment immediately preceding the bound element
 *      (`<!-- ... explicitly trusted ... -->`).
 *
 * Class 2 is the reviewer-audited trust vocabulary of `src/utils/safeHref.ts`
 * (literal-prefix `/app/...` route computeds, constant-scheme builder
 * templates, integrator API surfaces). The marker is deliberately loud: a
 * reviewer greps for it, the rule demands it, and writing it is an explicit
 * act of claiming the destination cannot carry a scheme.
 *
 * **Why the planted probe goes red.** The motivating shape —
 * `:href="p.repo"` on plugin-catalog wire data — is a MemberExpression with
 * no safeHref anywhere and no marker: reported. A bare identifier is resolved
 * through the declaration map, so `const x = wireUrl; <a :href="x">` reddens
 * too, while an aliased `const x = safeHref(u)` passes through the same map.
 * The proof is arm-strict on purpose: `const safe = cond ? safeHref(a) : b.url`
 * stays RED — one raw arm is one raw wire URL into the sink. Identifier
 * resolution recurses through declaration chains but can only terminate at a
 * real `safeHref(...)` call or a marker: a raw-rooted chain stays red, a
 * cycle fails safe (the visited set), and every hop stays greppable in
 * source — the anti-pattern the census law fears is an UNSANITIZED value
 * wearing a sanitized name, and this walk cannot be talked into seeing one.
 *
 * **Mechanism.** ESLint core does NOT traverse vue-eslint-parser's template
 * AST (its visitorKeys carry only ESTree types; V* nodes have no entries), so
 * the whole check runs as a manual walk at `Program:exit`: the script `body`
 * for `window.open` calls and the declarator map, `program.templateBody` for
 * the VAttribute `:href` sinks. Deferred resolution is what lets a template
 * binding see a declaration that appears after it in document order.
 *
 * Documented scope edges (matching the census law's declared surface):
 * static `href="..."` attributes are author-typed constants, not wire sinks;
 * `v-bind:[dynamic]="..."` with a computed attribute name is not
 * pattern-matched (none exists; adding one is as grep-visible as a marker);
 * `location.href =` assignment is the config-surface class the safeHref
 * header names separately.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

const MARKER = /EXPLICITLY TRUSTED/i;

/** The sanitizer's name. An aliased import does not satisfy the law (loud by design). */
const SANITIZER = 'safeHref';

/** Keys that are never AST children (parent back-links, token/comment ledgers, geometry). */
const SKIP_KEYS = new Set(['parent', 'tokens', 'comments', 'loc', 'range', 'start', 'end']);

/** Walk every descendant node generically — ESTree or vue template AST alike. */
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

function isDynamicHrefAttribute(node) {
  return (
    node.type === 'VAttribute' &&
    !!node.key &&
    node.key.type === 'VDirectiveKey' &&
    !!node.key.name &&
    node.key.name.name === 'bind' &&
    !!node.key.argument &&
    node.key.argument.type === 'VIdentifier' &&
    node.key.argument.name === 'href'
  );
}

function isWindowOpenCall(node) {
  const callee = node.callee;
  if (!callee || callee.type !== 'MemberExpression' || callee.computed) return false;
  if (!callee.object || callee.object.type !== 'Identifier' || callee.object.name !== 'window') return false;
  return !!callee.property && callee.property.type === 'Identifier' && callee.property.name === 'open';
}

function calleeNameIs(callee, name) {
  return (
    !!callee &&
    ((callee.type === 'Identifier' && callee.name === name) ||
      (callee.type === 'MemberExpression' &&
        !callee.computed &&
        !!callee.property &&
        callee.property.type === 'Identifier' &&
        callee.property.name === name))
  );
}

/** Human label for the reported expression (the `{{what}}` slot). */
function describe(expr) {
  if (expr.type === 'Identifier') return `bare identifier \`${expr.name}\``;
  if (expr.type === 'MemberExpression') {
    const obj = expr.object && expr.object.type === 'Identifier' ? expr.object.name : '?';
    const prop = !expr.computed && expr.property && expr.property.type === 'Identifier' ? expr.property.name : '?';
    return `raw wire expression \`${obj}.${prop}\``;
  }
  return 'a raw expression';
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'dynamic :href and window.open destinations must bind through safeHref(...) or carry an EXPLICITLY TRUSTED census comment at the definition site',
    },
    schema: [],
    messages: {
      unsafeHrefBinding:
        'Dynamic :href binds {{what}} that never passes through safeHref(). Wire-supplied URLs must be sanitized (src/utils/safeHref.ts) or the site must carry an "EXPLICITLY TRUSTED" census comment at its definition site — M-UI-11 sink census law.',
      unsafeWindowOpen:
        'window.open() destination never passes through safeHref(). Wire-supplied URLs must be sanitized (src/utils/safeHref.ts) or the call/definition site must carry an "EXPLICITLY TRUSTED" census comment — M-UI-11 sink census law.',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    function marked(node) {
      return sourceCode.getCommentsBefore(node).some((c) => MARKER.test(c.value));
    }

    return {
      'Program:exit'(program) {
        const declarations = new Map(); // name → [{ statement, declarator, init }]

        walk({ type: 'List', children: program.body }, (n) => {
          if (n.type !== 'VariableDeclaration') return;
          for (const decl of n.declarations) {
            if (!decl.id || decl.id.type !== 'Identifier') return;
            if (!declarations.has(decl.id.name)) declarations.set(decl.id.name, []);
            declarations.get(decl.id.name).push({ statement: n, declarator: decl });
          }
        });

        /**
         * Nearest preceding template HTMLComment blessing this element: the
         * last template comment ending before its start, exempting ONLY when
         * the text in between is pure whitespace — so a stale marker high in
         * the file cannot silently bless the next binding.
         */
        const templateComments = (program.templateBody && program.templateBody.comments) || [];
        function templateCommentMarked(elementNode) {
          if (!elementNode || !elementNode.range) return false;
          let best = null;
          for (const c of templateComments) {
            if (c.range[1] <= elementNode.range[0] && (!best || c.range[1] > best.range[1])) best = c;
          }
          if (!best || !MARKER.test(typeof best.value === 'string' ? best.value : '')) return false;
          return /^\s*$/.test(sourceCode.getText().slice(best.range[1], elementNode.range[0]));
        }

        /**
         * Arm-strict proof that every value this expression can produce has
         * passed through safeHref(). `trusted` is the per-node marker test the
         * caller supplies (declarator statement comments); identifier hops go
         * through the declaration map, one hop deep by design.
         */
        function provenSafe(expr, guard) {
          if (!expr) return false;
          switch (expr.type) {
            case 'CallExpression':
              // The sanitizer's arguments are untrusted BY DESIGN — that is
              // what safeHref consumes. Nothing above it may smuggle a
              // second, unsanitized arm, so a safeHref call is its own proof.
              return calleeNameIs(expr.callee, SANITIZER);
            case 'Identifier':
              if (expr.name === 'undefined' || expr.name === 'null') return true;
              if (guard.has(expr.name)) return false;
              guard.add(expr.name);
              // Same-name declarators OR together: if any declaration of this
              // name in the file vouches (marker or proven init), a sink
              // reading the name may be reading that one. AND-ing would
              // redden legitimately shadowed helpers.
              return (declarations.get(expr.name) || []).some(
                (d) => marked(d.statement) || marked(d.declarator) || provenSafe(d.declarator.init, guard),
              );
            case 'ConditionalExpression':
              return provenSafe(expr.consequent, guard) && provenSafe(expr.alternate, guard);
            case 'LogicalExpression':
              // `a ?? b` / `a || b` can yield EITHER side, so both must carry the proof.
              return provenSafe(expr.left, guard) && provenSafe(expr.right, guard);
            case 'TSAsExpression':
            case 'TSTypeAssertion':
            case 'TSNonNullExpression':
            case 'ChainExpression':
              return provenSafe(expr.expression, guard);
            default:
              return false;
          }
        }

        function isBoundSafe(expr, elementNode) {
          if (provenSafe(expr, new Set())) return true;
          if (elementNode) return templateCommentMarked(elementNode);
          // Script sinks also honour a marker attached right at the call.
          return marked(expr);
        }

        const reports = [];

        // Script sinks: window.open(...) in the <script> body (and .ts files).
        walk({ type: 'List', children: program.body }, (n) => {
          if (n.type !== 'CallExpression' || !isWindowOpenCall(n)) return;
          const arg = n.arguments[0];
          if (!arg) return; // window.open() with no argument opens nothing
          if (marked(n) || isBoundSafe(arg, null)) return;
          reports.push({ node: n, messageId: 'unsafeWindowOpen' });
        });

        // Template sinks: dynamic :href bindings in the vue AST (manual walk —
        // ESLint core never enters templateBody) and window.open inside
        // template event handlers (`@click="window.open(url)"`).
        if (program.templateBody) {
          walk(program.templateBody, (n) => {
            if (isDynamicHrefAttribute(n)) {
              const expr = n.value && n.value.expression;
              if (!expr) return; // v-bind spread / valueless form — no ES expression to judge
              const element = n.parent && n.parent.type === 'VStartTag' ? n.parent.parent : null;
              if (isBoundSafe(expr, element)) return;
              reports.push({ node: n, messageId: 'unsafeHrefBinding', data: { what: describe(expr) } });
              return;
            }
            if (n.type === 'CallExpression' && isWindowOpenCall(n)) {
              const arg = n.arguments[0];
              if (!arg || isBoundSafe(arg, n.parent && n.parent.type === 'VStartTag' ? n.parent.parent : null)) return;
              reports.push({ node: n, messageId: 'unsafeWindowOpen' });
            }
          });
        }

        for (const r of reports) context.report(r);
      },
    };
  },
};
