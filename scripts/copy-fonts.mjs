/**
 * Copy self-hosted fonts (woff2 + fonts.css) into dist/fonts/ after the Vite
 * build. Vite lib mode base64-inlines any asset referenced from the bundled CSS
 * graph, so the @font-face stylesheet is kept OUT of that graph and shipped
 * verbatim here instead — keeping dist/style.css lean and the woff2 cacheable.
 *
 * Runs in the package build script (see package.json). Node-only, no deps.
 */
import { mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src', 'assets', 'fonts');
const dest = join(root, 'dist', 'fonts');

mkdirSync(dest, { recursive: true });

const files = readdirSync(src).filter((f) => f.endsWith('.woff2') || f.endsWith('.css'));
for (const f of files) {
  copyFileSync(join(src, f), join(dest, f));
}

console.log(`[copy-fonts] copied ${files.length} file(s) to dist/fonts/: ${files.join(', ')}`);
