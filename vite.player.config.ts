/**
 * Vite config for the secondary @phlix/ui/player entry.
 * Builds src/player.ts as a separate library chunk.
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [vue(), Icons({ compiler: 'vue3', scale: 1 })],
    build: {
        assetsInlineLimit: 0,
        lib: {
            entry: resolve(__dirname, 'src/player.ts'),
            name: 'PhlixUiPlayer',
            formats: ['es', 'cjs'],
            fileName: (format) => `player.${format === 'es' ? 'js' : 'umd.cjs'}`,
        },
        rollupOptions: {
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
