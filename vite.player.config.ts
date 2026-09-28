/**
 * Vite config for the secondary @phlix/ui/player entry.
 * Builds src/player.ts as a separate library chunk.
 *
 * DUAL-ENTRY MODULE-STATE CAVEAT (audit finding 8, 2026-09):
 * `@phlix/ui` is declared external below, but NO file under src/ actually does
 * `import … from '@phlix/ui'`, so the external NEVER MATCHES at bundle time.
 * Consequence: every shared module in the player graph (ApiClient,
 * usePlayerStore, …) is INLINED a second time into dist/player.js. A future
 * consumer that imports BOTH entries gets two copies of those modules — two
 * ApiClient classes, two store definitions. Before any estate consumer adopts
 * ./player, either rewrite the shared-module imports to go via '@phlix/ui'
 * (making the external real) or retire this entry. See src/player.ts header.
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [vue(), Icons({ compiler: 'vue3', scale: 1 })],
    build: {
        assetsInlineLimit: 0,
        // This is the SECOND build in `npm run build` (main `vite build` runs
        // first). dist/ is inside root, so Vite's emptyOutDir defaults to true —
        // which would WIPE the main build's phlix-ui.js + style.css, leaving the
        // package with only the player entry. Keep the main output by NOT emptying
        // here; the main build already cleaned dist/ before writing.
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'src/player.ts'),
            name: 'PhlixUiPlayer',
            formats: ['es', 'cjs'],
            fileName: (format) => `player.${format === 'es' ? 'js' : 'umd.cjs'}`,
            // Vite 8 names lib CSS after the package ("ui.css") by default — an
            // artifact nothing referenced (lib-mode JS never imports its sidecar
            // CSS) and package.json exports could not reach. Pin it to
            // `player.css` and publish it as `@phlix/ui/player.css`: the player
            // component graph carries 454 selectors (verified 2026-09-28 — a
            // strict subset of style.css, zero unique ones). Consumers that
            // already load `@phlix/ui/style.css` do NOT need this file; it
            // exists for a future player-surface-only consumer.
            cssFileName: 'player',
        },
        rollupOptions: {
            // NOTE: '@phlix/ui' here is ASPIRATIONAL — see DUAL-ENTRY caveat at
            // the top of this file; no src/ module imports it, so it never matches.
            external: ['vue', 'vue-router', 'pinia', '@phlix/ui'],
            output: {
                globals: {
                    vue: 'Vue',
                    '@phlix/ui': 'PhlixUi',
                },
            },
        },
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
