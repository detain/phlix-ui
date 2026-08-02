/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S06 — RECURRENCE GUARD for the anti-autofill attribute set on admin secret
 * inputs.
 *
 * The per-page rendered-DOM tests (SettingsPage / UsersPage / IntegrationsPage /
 * WebhooksPage / SyncPlayPage / PluginsPage) pin the secret inputs that exist
 * TODAY. They cannot pin a secret input that does not exist yet — a newly-added
 * `type="password"` field on any admin page would ship with no anti-autofill
 * attributes and every one of those tests would still pass.
 *
 * This spec closes that hole by scanning the admin SFC SOURCE for *every* secret
 * input and asserting the full attribute set on each one. It is a source scan on
 * purpose: it has to see fields no test mounts, including pages that have no test
 * file at all (TranscodingSettingsPage.vue, WebhookLogsPage.vue).
 *
 * The scanner itself is proved non-inert by the "detector" describe block below:
 * a detector that silently matches nothing scores a fake green forever.
 */

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ADMIN_DIRS = [
  join(dirname(fileURLToPath(import.meta.url)), '.'),
  join(dirname(fileURLToPath(import.meta.url)), '../../components/admin'),
];

/**
 * The four password-manager opt-out hints. `autocomplete` is checked separately
 * because its required VALUE differs (`new-password`, possibly inside a ternary).
 */
const IGNORE_HINTS = ['data-lpignore', 'data-1p-ignore', 'data-bwignore', 'data-form-type'] as const;

/** One `<input …>` open-tag lifted out of an SFC template, with its source file. */
interface InputTag {
  file: string;
  /** The raw `<input …>` open tag, attributes included. */
  raw: string;
}

/**
 * Extract every `<input …>` open tag from an SFC.
 *
 * Deliberately NOT a naive `/<input[^>]*>/` — a Vue attribute expression may
 * legitimately contain `>` (`v-if="count > 0"`, `:class="{ x: a >= b }"`), which
 * would truncate the tag mid-way and hide the attributes that follow it. This
 * walks the tag tracking quote state so only an UNQUOTED `>` closes it.
 */
export function extractInputTags(source: string, file = '<inline>'): InputTag[] {
  const out: InputTag[] = [];
  const open = /<input\b/g;
  let m: RegExpExecArray | null;
  while ((m = open.exec(source)) !== null) {
    let i = m.index + m[0].length;
    let quote: string | null = null;
    while (i < source.length) {
      const ch = source[i];
      if (quote) {
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === '>') {
        break;
      }
      i += 1;
    }
    out.push({ file, raw: source.slice(m.index, i + 1) });
    open.lastIndex = i + 1;
  }
  return out;
}

/**
 * True when the tag renders a secret. Covers both the static form
 * (`type="password"`) and the conditional reveal-toggle form
 * (`:type="showSecret ? 'text' : 'password'"`, `:type="descriptor.secret ? 'password' : …"`).
 */
export function isSecretInput(raw: string): boolean {
  if (/\btype\s*=\s*"password"/.test(raw) || /\btype\s*=\s*'password'/.test(raw)) return true;
  const bound = /(?::type|v-bind:type)\s*=\s*"([^"]*)"/.exec(raw);
  return bound !== null && /['"]password['"]/.test(bound[1]);
}

/** Every attribute name on the tag, with any `:`/`v-bind:` prefix stripped. */
function attrNames(raw: string): Set<string> {
  const names = new Set<string>();
  const attr = /(?:^|\s)([:@]?[A-Za-z_][\w.:-]*)(?=\s*=|\s|\/?>)/g;
  let m: RegExpExecArray | null;
  while ((m = attr.exec(raw)) !== null) {
    names.add(m[1].replace(/^v-bind:/, '').replace(/^:/, ''));
  }
  return names;
}

/**
 * Audit one tag. Returns the list of missing/incorrect requirements; empty means
 * the tag is compliant.
 */
export function auditSecretInput(raw: string): string[] {
  const problems: string[] = [];
  const names = attrNames(raw);

  if (!names.has('autocomplete')) {
    problems.push('autocomplete');
  } else {
    const value =
      /(?:^|\s)autocomplete\s*=\s*"([^"]*)"/.exec(raw)?.[1] ??
      /(?:^|\s)(?::|v-bind:)autocomplete\s*=\s*"([^"]*)"/.exec(raw)?.[1] ??
      '';
    if (!value.includes('new-password')) problems.push('autocomplete=new-password');
  }

  for (const hint of IGNORE_HINTS) {
    if (!names.has(hint)) problems.push(hint);
  }
  return problems;
}

/** Scan the admin SFC tree and return one entry per secret input found. */
export function scanAdminSecretInputs(): { file: string; raw: string; problems: string[] }[] {
  const found: { file: string; raw: string; problems: string[] }[] = [];
  for (const dir of ADMIN_DIRS) {
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.vue')) continue;
      const path = join(dir, name);
      for (const tag of extractInputTags(readFileSync(path, 'utf8'), name)) {
        if (!isSecretInput(tag.raw)) continue;
        found.push({ file: name, raw: tag.raw, problems: auditSecretInput(tag.raw) });
      }
    }
  }
  return found;
}

/**
 * Pages known to contain at least one secret input today. Listed so that a
 * scanner regression (bad glob, bad regex, wrong directory) cannot silently
 * reduce the audit to zero inputs and report success.
 */
const PAGES_WITH_SECRETS = [
  'IntegrationsPage.vue',
  'PluginsPage.vue',
  'SettingsPage.vue',
  'SyncPlayPage.vue',
  'UsersPage.vue',
  'WebhooksPage.vue',
];

describe('S06 recurrence guard — every admin secret input carries the anti-autofill set', () => {
  it('finds the known secret inputs (the scanner is not inert)', () => {
    const found = scanAdminSecretInputs();
    // 9 secret inputs today: Integrations ×2 (OIDC secret, LDAP bind pw),
    // Plugins ×1, Settings ×1, SyncPlay ×2 (create, join), Users ×2
    // (create/edit password, set PIN), Webhooks ×1.
    expect(found.length).toBeGreaterThanOrEqual(9);
    const files = [...new Set(found.map((f) => f.file))].sort();
    expect(files).toEqual(expect.arrayContaining(PAGES_WITH_SECRETS));
  });

  it('every secret input carries autocomplete=new-password + all four ignore hints', () => {
    const offenders = scanAdminSecretInputs()
      .filter((f) => f.problems.length > 0)
      .map((f) => `${f.file}: missing ${f.problems.join(', ')}\n    ${f.raw.replace(/\s+/g, ' ').slice(0, 160)}`);
    expect(offenders).toEqual([]);
  });
});

/**
 * Prove the detector actually detects. Without this, a scanner that matched
 * nothing — or a compliance check that never fails — would pass forever and the
 * guard above would be decorative.
 */
describe('S06 recurrence guard — the detector itself', () => {
  const COMPLIANT = `<input
      v-model="secret"
      type="password"
      autocomplete="new-password"
      data-lpignore="true"
      data-1p-ignore
      data-bwignore
      data-form-type="other"
    />`;

  it('accepts a compliant static secret input', () => {
    expect(isSecretInput(COMPLIANT)).toBe(true);
    expect(auditSecretInput(COMPLIANT)).toEqual([]);
  });

  it('accepts the conditional/bound form used by PluginsPage', () => {
    const raw = `<input
      :type="descriptor.secret ? 'password' : inputType(descriptor)"
      :autocomplete="descriptor.secret ? 'new-password' : 'off'"
      :data-lpignore="descriptor.secret ? 'true' : undefined"
      :data-1p-ignore="descriptor.secret ? '' : undefined"
      :data-bwignore="descriptor.secret ? '' : undefined"
      :data-form-type="descriptor.secret ? 'other' : undefined"
    />`;
    expect(isSecretInput(raw)).toBe(true);
    expect(auditSecretInput(raw)).toEqual([]);
  });

  it('accepts the reveal-toggle form used by WebhooksPage/IntegrationsPage', () => {
    const raw = `<input :type="showSecret ? 'text' : 'password'" autocomplete="new-password"
      data-lpignore="true" data-1p-ignore data-bwignore data-form-type="other" />`;
    expect(isSecretInput(raw)).toBe(true);
    expect(auditSecretInput(raw)).toEqual([]);
  });

  it('flags a brand-new secret input that forgot the attributes entirely', () => {
    const raw = '<input v-model="apiKey" type="password" class="admin-x__input" />';
    expect(isSecretInput(raw)).toBe(true);
    expect(auditSecretInput(raw)).toEqual([
      'autocomplete',
      'data-lpignore',
      'data-1p-ignore',
      'data-bwignore',
      'data-form-type',
    ]);
  });

  it('flags the pre-S06 autocomplete="off" mistake specifically', () => {
    const raw = `<input type="password" autocomplete="off" data-lpignore="true" data-1p-ignore
      data-bwignore data-form-type="other" />`;
    expect(auditSecretInput(raw)).toEqual(['autocomplete=new-password']);
  });

  it('flags each ignore hint independently (not just all-or-nothing)', () => {
    for (const hint of IGNORE_HINTS) {
      const raw = COMPLIANT.replace(new RegExp(`\\s${hint}(="[^"]*")?`), '');
      expect(raw).not.toBe(COMPLIANT); // the removal really happened
      expect(auditSecretInput(raw)).toEqual([hint]);
    }
  });

  it('ignores non-secret inputs', () => {
    expect(isSecretInput('<input v-model="name" type="text" autocomplete="off" />')).toBe(false);
    expect(isSecretInput('<input v-model="n" type="number" />')).toBe(false);
    expect(isSecretInput('<input :type="inputType(d)" />')).toBe(false);
  });

  it('does not truncate a tag at a `>` inside an attribute expression', () => {
    // A naive /<input[^>]*>/ stops at the `>` in `len > 0` and never sees the
    // attributes after it — silently passing a non-compliant secret input.
    const src = `<input v-if="len > 0" type="password" data-lpignore="true" data-1p-ignore
        data-bwignore data-form-type="other" autocomplete="new-password" />`;
    const [tag] = extractInputTags(src);
    expect(tag.raw).toContain('data-form-type');
    expect(auditSecretInput(tag.raw)).toEqual([]);
    expect(/<input[^>]*>/.exec(src)![0]).not.toContain('data-form-type'); // the naive version WOULD miss it
  });

  it('extracts every input in a multi-input template', () => {
    const src = '<div><input type="text" /><input type="password" /><input type="email" /></div>';
    expect(extractInputTags(src)).toHaveLength(3);
    expect(extractInputTags(src).filter((t) => isSecretInput(t.raw))).toHaveLength(1);
  });
});
