import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'node:path';

export default defineConfig({
    // unplugin-icons resolves the `~icons/lucide/*` virtual modules that Icon.vue
    // imports, compiling each to an inline Vue SFC. Only the icons actually
    // imported get bundled (tree-shaken); no runtime icon font/sprite.
    plugins: [vue(), Icons({ compiler: 'vue3', scale: 1 })],
    build: {
        // Emit fonts (and other binary assets) as separate hashed files in
        // dist/assets/ rather than base64-inlining them into style.css — keeps
        // CSS small and lets the self-hosted woff2 be cached + font-display:swap.
        assetsInlineLimit: 0,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PhlixUi',
            formats: ['es', 'cjs'],
            fileName: (format) => `phlix-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
        },
        rollupOptions: {
            external: ['vue', 'vue-router', 'pinia'],
            output: {
                globals: {
                    vue: 'Vue',
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
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
    },
});
