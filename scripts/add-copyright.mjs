#!/usr/bin/env node
/**
 * add-copyright.mjs - Idempotent copyright-header injector for phlix-ui.
 * Re-run produces zero diff when all files already have the header.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const COPYRIGHT = ' * @copyright 2026 Joe Huss <detain@interserver.net>';

const EXCLUDE_DIRS = new Set(['vendor', '.git', 'node_modules', 'dist', 'generated', '.github']);
const EXCLUDE_FILES = new Set([]);
const TS_EXTS = new Set(['.ts', '.tsx', '.vue', '.js', '.jsx', '.mjs']);

function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) walk(full, exts, files);
    } else {
      const ext = extname(entry.name);
      const base = basename(entry.name);
      if (exts.has(ext) && !EXCLUDE_FILES.has(base)) {
        files.push(full);
      }
    }
  }
  return files;
}

function isShebang(line) {
  return line.startsWith('#!');
}

// Find the line index (0-based) where a TS/JS docblock ends (contains star-slash)
function findDocblockEnd(lines, start) {
  for (let i = start; i < lines.length; i++) {
    if (lines[i].includes('*/')) return i;
  }
  return -1;
}

// Inject copyright into an existing TS/JS docblock /** ... */
// Returns null if no top-level docblock OR copyright already present.
// Only considers /** at the very start of the file (after optional shebang)
// to avoid misinterpreting TypeScript type expressions like `TokenTarget & { */ }`.
function injectTsDocblock(content) {
  const lines = content.split('\n');

  let offset = 0;
  if (lines.length > 0 && isShebang(lines[0])) offset = 1;

  // Only consider /** that appears at the very start of the file (after shebang)
  if (lines.length <= offset || !lines[offset].includes('/**')) return null;

  const docStart = offset;
  const docEnd = findDocblockEnd(lines, docStart);
  if (docEnd === -1) return null;

  const block = lines.slice(docStart, docEnd + 1).join('\n');
  if (block.includes('detain@interserver.net')) return null;

  // Single-line docblock: /** description */ — insert before the closing */
  if (docStart === docEnd) {
    const out = [...lines];
    // Split the single-line docblock to inject the copyright before */
    const line = out[docStart];
    const starIdx = line.indexOf('*/');
    const before = line.slice(0, starIdx).trimEnd();
    out.splice(docStart, 1, before, COPYRIGHT, ' */');
    return out.join('\n');
  }

  // Multi-line docblock: find the best insertion point
  let insertAfter = docStart + 1;
  for (let i = docStart + 1; i < docEnd; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '' || trimmed === '*/' || trimmed.startsWith('* @')) break;
    insertAfter = i;
  }

  const out = [...lines];
  out.splice(insertAfter + 1, 0, COPYRIGHT);
  return out.join('\n');
}

// Prepend a new TS/JS docblock at the top (after any shebang).
function prependTsDocblock(content) {
  const lines = content.split('\n');
  let offset = 0;
  if (lines.length > 0 && isShebang(lines[0])) offset = 1;

  const docblock = [
    '/**',
    ' * Source file.',
    ' *',
    COPYRIGHT,
    ' */',
    '',
  ];

  return [...lines.slice(0, offset), ...docblock, ...lines.slice(offset)].join('\n');
}

// Vue files: prepend a HTML comment at the top of the file.
function prependVueComment(content) {
  const lines = content.split('\n');
  let offset = 0;
  if (lines.length > 0 && isShebang(lines[0])) offset = 1;

  const comment = [
    `<!--`,
    ` * @copyright 2026 Joe Huss <detain@interserver.net>`,
    `-->`,
    '',
  ];

  return [...lines.slice(0, offset), ...comment, ...lines.slice(offset)].join('\n');
}

function processFile(filepath) {
  const content = readFileSync(filepath, 'utf8');
  const ext = extname(filepath);

  if (content.includes('detain@interserver.net')) return null;

  if (ext === '.vue') {
    // For Vue files, prepend an HTML comment if no docblock injection applies
    return injectTsDocblock(content) ?? prependVueComment(content);
  }

  // TS/JS files
  return injectTsDocblock(content) ?? prependTsDocblock(content);
}

// ---- Main ----
const tsFiles = walk('src', TS_EXTS);

let changed = 0;
let skipped = 0;
const touched = [];

for (const file of tsFiles) {
  const newContent = processFile(file);

  if (newContent !== null) {
    writeFileSync(file, newContent, 'utf8');
    changed++;
    touched.push(file);
    console.log('ADDED: ' + file);
  } else {
    skipped++;
    console.log('SKIP:  ' + file);
  }
}

console.log(`\n${changed} file(s) updated, ${skipped} skipped.`);
if (touched.length > 0) {
  console.log('\nTouched:');
  for (const f of touched) console.log('  ' + f);
}
