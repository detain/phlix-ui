/**
 * Local ESLint plugin: the semantic pluralisation inventory.
 *
 * `plan_updates.md` S134 required "0 hand-rolled plural ternaries by an AST/lint
 * check, not a grep", because four successive greps of this repo each returned a
 * confident undercount. These two rules are that check.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import noHandRolledPlural from './no-hand-rolled-plural.js';
import pluralMessageNeedsCount from './plural-message-needs-count.js';

export default {
  meta: { name: 'eslint-plugin-phlix-plural', version: '1.0.0' },
  rules: {
    'no-hand-rolled-plural': noHandRolledPlural,
    'plural-message-needs-count': pluralMessageNeedsCount,
  },
};
